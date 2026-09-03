"use client";

import { usePlayback } from "./usePlayback";

export function FlowPlayer({
  steps,
}: {
  steps: { label: string; detail: string }[];
}) {
  const { index, playing, setIndex, toggle } = usePlayback(Math.max(steps.length, 1), 2000);
  if (!steps.length) return null;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="eyebrow">Animated flow</p>
        <button
          type="button"
          onClick={toggle}
          className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-white"
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      <div className="relative mb-5 h-1 overflow-hidden rounded-full bg-sky-wash">
        <div className="flow-travel absolute top-0 h-full w-1/4 rounded-full bg-accent" />
      </div>
      <div className="grid gap-2">
        {steps.map((step, i) => {
          const active = i === index;
          return (
            <button
              key={step.label + i}
              type="button"
              onClick={() => setIndex(i)}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                active
                  ? "border-accent bg-sky-wash shadow-[0_0_0_4px_rgba(73,132,253,0.12)]"
                  : "border-line bg-white text-slate"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                    active ? "flow-dot bg-accent text-white" : "bg-sky-wash text-accent-deep"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <div className="text-sm font-medium text-ink">{step.label}</div>
                  <p className="mt-0.5 text-sm leading-6 text-ink-soft">{step.detail}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
