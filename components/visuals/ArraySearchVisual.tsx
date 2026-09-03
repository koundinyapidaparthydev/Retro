"use client";

import { usePlayback } from "./usePlayback";

type Frame = { lo: number; hi: number; mid: number; note: string; found?: boolean };

const BINARY_FRAMES: Frame[] = [
  { lo: 0, hi: 6, mid: 3, note: "Middle is 7. Target 9 is bigger — drop the left half." },
  { lo: 4, hi: 6, mid: 5, note: "Middle is 11. 9 is smaller — drop the right half." },
  { lo: 4, hi: 4, mid: 4, note: "Only 9 left. Found it.", found: true },
];

const LINEAR_FRAMES: Frame[] = [
  { lo: 0, hi: 6, mid: 0, note: "Check 1. Not 9." },
  { lo: 0, hi: 6, mid: 1, note: "Check 3. Not 9." },
  { lo: 0, hi: 6, mid: 2, note: "Check 5. Not 9." },
  { lo: 0, hi: 6, mid: 3, note: "Check 7. Not 9." },
  { lo: 0, hi: 6, mid: 4, note: "Check 9. Found it.", found: true },
];

const VALUES = [1, 3, 5, 7, 9, 11, 13];

export function ArraySearchVisual({ mode }: { mode: "binary-search" | "linear-search" }) {
  const frames = mode === "linear-search" ? LINEAR_FRAMES : BINARY_FRAMES;
  const { index, playing, toggle } = usePlayback(frames.length, 1500);
  const frame = frames[index];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="eyebrow">{mode === "linear-search" ? "Watch the scan" : "Watch the halves drop"}</p>
        <button type="button" onClick={toggle} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {VALUES.map((value, i) => {
          const inRange = i >= frame.lo && i <= frame.hi;
          const isMid = i === frame.mid;
          return (
            <div
              key={value}
              className={`flex h-14 w-14 flex-col items-center justify-center rounded-xl border text-sm font-medium transition-all duration-500 ${
                isMid
                  ? frame.found
                    ? "scale-110 border-mint bg-mint text-white"
                    : "scale-110 border-accent bg-accent text-white"
                  : inRange
                    ? "border-accent/40 bg-sky-wash text-ink"
                    : "border-line bg-white text-fog opacity-40"
              }`}
            >
              {value}
              <span className="text-[10px] font-normal opacity-80">
                {isMid ? "mid" : i === frame.lo ? "lo" : i === frame.hi ? "hi" : ""}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-center text-sm leading-6 text-ink-soft">{frame.note}</p>
    </div>
  );
}
