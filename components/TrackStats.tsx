"use client";

import { useEffect, useState } from "react";
import { countProgress } from "@/lib/progress";

export function TrackStats({
  track,
  total,
}: {
  track?: string;
  total: number;
}) {
  const [counts, setCounts] = useState({ learning: 0, known: 0 });

  useEffect(() => {
    const sync = () => setCounts(countProgress(track));
    sync();
    window.addEventListener("retro-progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("retro-progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, [track]);

  return (
    <p className="text-sm text-slate">
      {total} topics · {counts.learning} learning · {counts.known} known
    </p>
  );
}
