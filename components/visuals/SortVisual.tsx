"use client";

import { usePlayback } from "./usePlayback";

const FRAMES = [
  { values: [4, 1, 3, 2], note: "Start unsorted." },
  { values: [1, 4, 2, 3], note: "Split and sort the tiny pieces." },
  { values: [1, 2, 3, 4], note: "Zipper the sorted halves back together." },
];

export function SortVisual() {
  const { index, playing, toggle } = usePlayback(FRAMES.length, 1600);
  const frame = FRAMES[index];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="eyebrow">Split, then zipper</p>
        <button type="button" onClick={toggle} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      <div className="flex items-end justify-center gap-2">
        {frame.values.map((value, i) => (
          <div key={`${value}-${i}`} className="flex flex-col items-center gap-2">
            <div
              className="w-10 rounded-t-lg bg-accent transition-all duration-500"
              style={{ height: 18 + value * 16 }}
            />
            <span className="text-sm font-medium">{value}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-ink-soft">{frame.note}</p>
    </div>
  );
}
