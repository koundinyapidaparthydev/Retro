import type { Topic } from "@/content/schema";
import { javaRunFor } from "./javaRun";
import { lesson } from "./lesson";
import { problemFor } from "./problem";
import { topicQa } from "./qa";

function geminiContext(topic: Topic) {
  const p = problemFor(topic);
  const l = lesson(topic);
  return [
    `You are a patient interview tutor. Topic: ${topic.title} (${topic.track}).`,
    `THE PROBLEM (they will say this, not the algorithm name):`,
    `Given: ${p.given}`,
    `Find: ${p.find}`,
    `Tiny example: ${p.example}`,
    `Definition: ${l.definition}`,
    `Why: ${l.why}`,
    `Approach: ${l.approach.join(" → ")}`,
    `They ask: ${p.askedAs.join(" | ")}`,
    `Answer first minute: ${topicQa(topic).howToAnswer.firstMinute}`,
    `Keep answers short. Start from the problem, then the Java idea (arrays, HashMap, HashSet, Queue).`,
  ].join("\n");
}

export function geminiPrompt(topic: Topic, question: string) {
  return `${geminiContext(topic)}\n\nStudent: ${question}\nTutor:`;
}

export function localAnswer(topic: Topic, question: string): string {
  const q = question.toLowerCase();
  const p = problemFor(topic);
  const l = lesson(topic);
  const qa = topicQa(topic);
  const run = javaRunFor(topic);

  if (match(q, ["problem", "given", "what do they ask", "statement", "prompt", "question", "how would they"])) {
    return `They will not say “${topic.title}.” They will say something like: ${p.askedAs[0] ?? p.find} Given: ${p.given} Find: ${p.find}`;
  }
  if (match(q, ["example", "sample", "input", "tiny"])) {
    return `Tiny example. ${p.example}`;
  }
  if (match(q, ["why", "need", "exist", "when"])) {
    return l.why;
  }
  if (match(q, ["approach", "how do i", "steps", "walk"])) {
    return `Start from the problem, not the name. ${l.approach.map((s, i) => `${i + 1}. ${s}`).join(" ")}`;
  }
  if (match(q, ["javascript", "js", "java", "code", "console", "run", "system.out"])) {
    return `In Java: ${run.title}. ${run.logs[0] ?? ""} The output panel walks the rest, one println at a time.`;
  }
  if (match(q, ["answer", "say first", "first minute", "interview"])) {
    return qa.howToAnswer.firstMinute;
  }
  if (match(q, ["whiteboard", "ask this", "phrasing"])) {
    return `Whiteboard prompts: ${p.askedAs.join(" Next: ")}`;
  }
  if (match(q, ["define", "definition", "what is", "meaning"])) {
    return `The problem first: ${p.find} The tool people later call ${topic.title}: ${l.definition}`;
  }
  return `The problem: ${p.given} Find: ${p.find} Example: ${p.example} If you want the tool name after that, it is ${topic.title}.`;
}

function match(q: string, keys: string[]) {
  return keys.some((key) => q.includes(key));
}

export function topicPromptBlob(topic: Topic) {
  return geminiContext(topic);
}
