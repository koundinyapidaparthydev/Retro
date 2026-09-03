"use client";

import { usePlayback } from "./usePlayback";

const VALUES = [1, 2, 4, 7, 11];

const TWO: { left: number; right: number; note: string }[] = [
  { left: 0, right: 4, note: "1 + 11 = 12 — too big. Move the right finger left." },
  { left: 0, right: 3, note: "1 + 7 = 8 — too small. Move the left finger right." },
  { left: 1, right: 3, note: "2 + 7 = 9 — still small. Move left again." },
  { left: 2, right: 3, note: "4 + 7 = 11 — close. One more adjust and you either hit the sum or stop." },
];

const WINDOW: { start: number; end: number; note: string }[] = [
  { start: 0, end: 2, note: "Window [2, 1, 5] sums to 8." },
  { start: 1, end: 3, note: "Slide: drop 2, add 1 → 7." },
  { start: 2, end: 4, note: "Slide: drop 1, add 3 → 9. Best so far." },
];

const WINDOW_VALUES = [2, 1, 5, 1, 3];

export function PointerVisual({ mode }: { mode: "two-pointers" | "sliding-window" }) {
  const frames = mode === "two-pointers" ? TWO : WINDOW;
  const values = mode === "two-pointers" ? VALUES : WINDOW_VALUES;
  const { index, playing, toggle } = usePlayback(frames.length, 1700);
  const frame = frames[index];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="eyebrow">{mode === "two-pointers" ? "Two fingers" : "The moving box"}</p>
        <button type="button" onClick={toggle} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {values.map((value, i) => {
          const active =
            mode === "two-pointers"
              ? i === (frame as (typeof TWO)[0]).left || i === (frame as (typeof TWO)[0]).right
              : i >= (frame as (typeof WINDOW)[0]).start && i <= (frame as (typeof WINDOW)[0]).end;
          const label =
            mode === "two-pointers"
              ? i === (frame as (typeof TWO)[0]).left
                ? "L"
                : i === (frame as (typeof TWO)[0]).right
                  ? "R"
                  : ""
              : "";
          return (
            <div
              key={`${value}-${i}`}
              className={`flex h-14 w-14 flex-col items-center justify-center rounded-xl border text-sm font-medium transition-all duration-500 ${
                active ? "border-accent bg-accent text-white" : "border-line bg-white text-ink"
              }`}
            >
              {value}
              <span className="text-[10px]">{label}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-center text-sm leading-6 text-ink-soft">{frame.note}</p>
    </div>
  );
}
