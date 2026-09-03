export type TrackId = "dsa" | "hld" | "lld";

export type Depth = "core" | "next" | "advanced";

export type Topic = {
  slug: string;
  track: TrackId;
  category: string;
  title: string;
  summary: string;
  depth: Depth;
  whyItMatters: string;
  theory: string[];
  howItWorks: string[];
  whenToUse: string[];
  whenNotToUse?: string[];
  complexity?: {
    time: string;
    space: string;
    notes?: string;
  };
  tradeoffs?: string[];
  interviewTips: string[];
  pitfalls: string[];
  practiceIdeas: string[];
  related: string[];
};

export const TRACKS: Record<
  TrackId,
  { id: TrackId; label: string; full: string; blurb: string }
> = {
  dsa: {
    id: "dsa",
    label: "DSA",
    full: "Data Structures & Algorithms",
    blurb: "Search, sort, graphs, DP, and the patterns interviews actually test.",
  },
  hld: {
    id: "hld",
    label: "HLD",
    full: "High-Level Design",
    blurb: "How systems scale: caches, queues, shards, and the tradeoffs behind them.",
  },
  lld: {
    id: "lld",
    label: "LLD",
    full: "Low-Level Design",
    blurb: "Classes, SOLID, patterns, and designs you can extend without a rewrite.",
  },
};

export const DEPTH_LABEL: Record<Depth, string> = {
  core: "CORE",
  next: "NEXT",
  advanced: "ADV",
};
