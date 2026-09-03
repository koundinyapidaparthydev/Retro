"use client";

import { useEffect, useState } from "react";
import {
  getProgress,
  setProgress,
  type ProgressState,
} from "@/lib/progress";

const OPTIONS: { id: ProgressState; label: string }[] = [
  { id: "unread", label: "Unread" },
  { id: "learning", label: "Learning" },
  { id: "known", label: "Known" },
];

export function ProgressToggle({ track, slug }: { track: string; slug: string }) {
  const [state, setState] = useState<ProgressState>("unread");

  useEffect(() => {
    setState(getProgress(track, slug));
    const sync = () => setState(getProgress(track, slug));
    window.addEventListener("retro-progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("retro-progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, [track, slug]);

  return (
    <div className="flex flex-wrap gap-1 font-mono text-[11px] uppercase tracking-[0.14em]">
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => {
            setProgress(track, slug, option.id);
            setState(option.id);
          }}
          className={`border px-2 py-1 ${
            state === option.id
              ? option.id === "known"
                ? "border-mint bg-mint text-bg"
                : option.id === "learning"
                  ? "border-amber bg-amber text-bg"
                  : "border-line bg-bg-elev text-ink"
              : "border-line text-muted hover:text-ink"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
