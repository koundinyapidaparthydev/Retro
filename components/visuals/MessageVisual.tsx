"use client";

import { usePlayback } from "./usePlayback";

const FRAMES = [
  { from: "Caller", to: "Service", note: "A use-case starts on the service, not on a raw entity." },
  { from: "Service", to: "Entity", note: "The entity keeps the invariant (occupy, pay, validate)." },
  { from: "Service", to: "Policy", note: "The part that changes (fee, pay, rank) is a swappable policy." },
  { from: "Policy", to: "Caller", note: "Result goes back out. Adding a variant means a new policy class." },
];

export function MessageVisual() {
  const { index, playing, toggle } = usePlayback(FRAMES.length, 1800);
  const frame = FRAMES[index];
  const names = ["Caller", "Service", "Entity", "Policy"];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="eyebrow">Who talks to whom</p>
        <button type="button" onClick={toggle} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {names.map((name) => {
          const hot = name === frame.from || name === frame.to;
          return (
            <div
              key={name}
              className={`min-w-24 rounded-2xl border px-4 py-3 text-center text-sm font-medium transition-all duration-500 ${
                hot ? "border-accent bg-accent text-white" : "border-line bg-white text-slate"
              }`}
            >
              {name}
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-center text-sm text-ink-soft">
        <span className="font-medium text-ink">{frame.from}</span>
        {" → "}
        <span className="font-medium text-ink">{frame.to}</span>
        {" · "}
        {frame.note}
      </p>
    </div>
  );
}
