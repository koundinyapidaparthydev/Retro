export type TrackId = "java" | "dsa" | "hld" | "lld" | "ai";

export type Depth = "core" | "next" | "advanced";

export type SpokenAnswer = {
  firstMinute: string;
  deepDive: string;
};

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
  howQuestionsCome?: string[];
  howToAnswer?: SpokenAnswer;
};

export const TRACKS: Record<
  TrackId,
  { id: TrackId; label: string; full: string; blurb: string }
> = {
  java: {
    id: "java",
    label: "Java",
    full: "Java for interviews",
    blurb: "Basics → collections → recursion — enough Java to write DSA solutions.",
  },
  dsa: {
    id: "dsa",
    label: "DSA",
    full: "Data Structures & Algorithms",
    blurb: "Search, sort, graphs, and DP — with a moving picture for each idea.",
  },
  hld: {
    id: "hld",
    label: "HLD",
    full: "High-Level Design",
    blurb: "How a request travels: caches, queues, shards, and the tradeoffs.",
  },
  lld: {
    id: "lld",
    label: "LLD",
    full: "Low-Level Design",
    blurb: "Classes and patterns you can extend without a rewrite.",
  },
  ai: {
    id: "ai",
    label: "AI",
    full: "Applied AI",
    blurb: "Tokens, retrieval, evals, and SQL — one problem at a time, in JavaScript.",
  },
};

export const DEPTH_LABEL: Record<Depth, string> = {
  core: "CORE",
  next: "NEXT",
  advanced: "ADV",
};
