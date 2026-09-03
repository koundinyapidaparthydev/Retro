"use client";

import { useEffect, useState } from "react";
import type { CodeRun } from "@/content/java-runs/types";

export function JavaPlayground({ run }: { run: CodeRun }) {
  const [shown, setShown] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    setShown(0);
    setPlaying(true);
  }, [run.title, run.code]);

  useEffect(() => {
    if (!playing) return;
    if (shown >= run.logs.length) return;
    const id = window.setTimeout(() => setShown((n) => n + 1), 850);
    return () => window.clearTimeout(id);
  }, [playing, shown, run.logs.length]);

  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      <div className="flex items-center justify-between bg-ink px-4 py-2">
        <p className="text-xs font-medium tracking-wide text-paper">{run.title}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="rounded-full border border-white/20 px-3 py-1 text-xs text-paper"
          >
            {playing && shown < run.logs.length ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => {
              setShown(0);
              setPlaying(true);
            }}
            className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-white"
          >
            Run again
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-2">
        <pre className="overflow-x-auto bg-[#0f172a] p-4 text-[13px] leading-6 text-[#e2e8f0]">
          <code>{run.code}</code>
        </pre>
        <div className="min-h-48 bg-[#020617] p-4 font-mono text-[13px] leading-6 text-[#86efac]">
          <div className="mb-2 text-[11px] uppercase tracking-wide text-[#64748b]">Output</div>
          {run.logs.slice(0, shown).map((line, i) => (
            <div key={`${line}-${i}`} className="whitespace-pre-wrap">
              <span className="text-[#64748b]">{">"} </span>
              {line}
            </div>
          ))}
          {shown < run.logs.length ? (
            <div className="animate-pulse text-[#64748b]">▋</div>
          ) : (
            <div className="mt-2 text-[#64748b]">Process finished</div>
          )}
        </div>
      </div>
    </div>
  );
}
