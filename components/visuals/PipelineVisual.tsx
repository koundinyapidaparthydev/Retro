"use client";

import { usePlayback } from "./usePlayback";

const BOXES = ["Client", "CDN / Edge", "Load balancer", "App", "Cache", "Database"];

export function PipelineVisual() {
  const { index, playing, toggle } = usePlayback(BOXES.length, 1400);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="eyebrow">A request walking the path</p>
        <button type="button" onClick={toggle} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {BOXES.map((box, i) => (
          <div key={box} className="flex items-center gap-2">
            <div
              className={`rounded-2xl border px-3 py-2 text-sm font-medium transition-all duration-500 ${
                i === index
                  ? "border-accent bg-accent text-white"
                  : i < index
                    ? "border-accent/30 bg-sky-wash text-ink"
                    : "border-line bg-white text-slate"
              }`}
            >
              {box}
            </div>
            {i < BOXES.length - 1 ? <span className="text-fog">→</span> : null}
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-ink-soft">
        The pulse is at <span className="font-medium text-ink">{BOXES[index]}</span>. Most designs are this chain plus a queue on the write path.
      </p>
    </div>
  );
}
