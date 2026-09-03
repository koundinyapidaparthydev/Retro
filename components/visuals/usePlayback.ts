"use client";

import { useEffect, useState } from "react";

export function usePlayback(length: number, ms = 1600) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing || length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % length);
    }, ms);
    return () => window.clearInterval(id);
  }, [playing, length, ms]);

  return {
    index,
    playing,
    setIndex,
    toggle: () => setPlaying((value) => !value),
  };
}
