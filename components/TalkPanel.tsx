"use client";

import { useEffect, useRef, useState } from "react";
import type { Topic } from "@/content/schema";
import { problemFor } from "@/lib/problem";
import { geminiPrompt, localAnswer, topicPromptBlob } from "@/lib/tutor";

type Line = { who: "you" | "tutor"; text: string };

type SpeechRec = {
  lang: string;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
};

const CHIPS = [
  "What is the problem?",
  "Give me the tiny example.",
  "How do I approach it?",
  "How would they ask this?",
  "Show it in JavaScript.",
];

function openerFor(topic: Topic) {
  const problem = problemFor(topic);
  return `They will not say “${topic.title}.” The problem: ${problem.given} Find: ${problem.find} Example: ${problem.example}`;
}

export function TalkPanel({ topic }: { topic: Topic }) {
  const [lines, setLines] = useState<Line[]>([{ who: "tutor", text: openerFor(topic) }]);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(true);
  const [copied, setCopied] = useState(false);
  const [live, setLive] = useState(false);
  const speakingRef = useRef(true);
  const recRef = useRef<SpeechRec | null>(null);

  useEffect(() => {
    speakingRef.current = speaking;
  }, [speaking]);

  useEffect(() => {
    setLive(true);
    return () => {
      try {
        window.speechSynthesis?.cancel();
        recRef.current?.stop();
      } catch {
        /* ignore */
      }
    };
  }, []);

  function speak(message: string) {
    if (!speakingRef.current || typeof window === "undefined" || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 1.02;
      window.speechSynthesis.speak(utterance);
    } catch {
      /* some browsers block speak until a click */
    }
  }

  async function ask(question: string) {
    const q = question.trim();
    if (!q) return;
    setText("");
    setLines((prev) => [...prev, { who: "you", text: q }]);
    try {
      const reply =
        (await Promise.race([
          tryBuiltIn(topic, q),
          new Promise<null>((resolve) => window.setTimeout(() => resolve(null), 400)),
        ])) ?? localAnswer(topic, q);
      setLines((prev) => [...prev, { who: "tutor", text: reply }]);
      speak(reply);
    } catch {
      const reply = localAnswer(topic, q);
      setLines((prev) => [...prev, { who: "tutor", text: reply }]);
    }
  }

  function toggleMic() {
    if (listening) {
      recRef.current?.stop();
      setListening(false);
      return;
    }
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRec;
      webkitSpeechRecognition?: new () => SpeechRec;
    };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) {
      setLines((prev) => [
        ...prev,
        { who: "tutor", text: "This browser has no mic API. Type below, or tap Ask Gemini and paste." },
      ]);
      return;
    }
    const rec = new Ctor();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.onresult = (event) => {
      const said = event.results[0]?.[0]?.transcript;
      if (said) void ask(said);
    };
    rec.onend = () => setListening(false);
    recRef.current = rec;
    setListening(true);
    rec.start();
  }

  async function copyGemini(open: boolean) {
    const lastYou =
      [...lines].reverse().find((line) => line.who === "you")?.text ??
      "Explain the problem like I am new. Then quiz me with whiteboard prompts only — do not name the algorithm until I ask.";
    const prompt = geminiPrompt(topic, lastYou);
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
    if (open) window.open("https://gemini.google.com/app", "_blank", "noreferrer");
  }

  return (
    <div className="sky-card border-accent/20 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Talk this through</p>
          <p className="mt-1 text-sm text-slate">
            Free. Tap a chip or the mic — I talk back. Or copy a prompt into Gemini.
            {live ? " Ready." : ""}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              const next = !speaking;
              setSpeaking(next);
              speakingRef.current = next;
              if (!next) window.speechSynthesis?.cancel();
            }}
            className="rounded-full border border-line px-3 py-1 text-xs"
          >
            {speaking ? "Voice on" : "Voice off"}
          </button>
          <button
            type="button"
            onClick={() => void copyGemini(false)}
            className="rounded-full border border-line px-3 py-1 text-xs"
          >
            {copied ? "Copied" : "Copy prompt"}
          </button>
          <button
            type="button"
            onClick={() => void copyGemini(true)}
            className="rounded-full bg-ink px-3 py-1 text-xs text-white"
          >
            Ask Gemini
          </button>
        </div>
      </div>

      <div
        role="log"
        aria-live="polite"
        className="mt-4 max-h-72 space-y-2 overflow-y-auto rounded-xl bg-sky-wash/60 p-3"
      >
        {lines.map((line, i) => (
          <p key={`${line.who}-${i}`} className={line.who === "you" ? "text-sm text-accent-deep" : "text-sm text-ink"}>
            <strong>{line.who === "you" ? "You · " : "Tutor · "}</strong>
            {line.text}
          </p>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => void ask(chip)}
            className="rounded-full border border-line bg-white px-3 py-1 text-xs text-ink hover:border-accent"
          >
            {chip}
          </button>
        ))}
      </div>

      <form
        action="#"
        className="mt-3 flex flex-wrap gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          void ask(text);
        }}
      >
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Ask out loud or type: what is the problem?"
          className="min-w-[200px] flex-1 rounded-full border border-line bg-white px-4 py-2 text-sm outline-none focus:border-accent"
        />
        <button
          type="button"
          onClick={toggleMic}
          className={`rounded-full px-3 py-2 text-sm ${listening ? "bg-accent text-white" : "border border-line"}`}
        >
          {listening ? "Stop" : "Mic"}
        </button>
        <button
          type="button"
          onClick={() => void ask(text)}
          className="rounded-full bg-accent px-4 py-2 text-sm text-white"
        >
          Ask
        </button>
      </form>
      <p className="mt-2 text-[11px] text-fog">
        Answers stay on this page — no paid API. Ask Gemini copies the same problem context so you can keep talking there for free.
      </p>
    </div>
  );
}

async function tryBuiltIn(topic: Topic, question: string): Promise<string | null> {
  const LM = (globalThis as { LanguageModel?: ChromeLanguageModel }).LanguageModel;
  if (!LM?.availability || !LM.create) return null;
  try {
    const status = await LM.availability();
    if (status === "unavailable") return null;
    const session = await LM.create({
      initialPrompts: [{ role: "system", content: topicPromptBlob(topic) }],
    });
    const out = await session.prompt(question);
    return typeof out === "string" ? out : null;
  } catch {
    return null;
  }
}

type ChromeLanguageModel = {
  availability: () => Promise<string>;
  create: (opts: { initialPrompts: { role: string; content: string }[] }) => Promise<{ prompt: (q: string) => Promise<string> }>;
};
