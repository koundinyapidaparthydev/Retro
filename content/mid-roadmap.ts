export type RoadmapItem = {
  id: string;
  label: string;
};

export type RoadmapDomain = {
  id: string;
  title: string;
  blurb: string;
  items: RoadmapItem[];
};

/** Mid-level (3+ YOE) path from DSA vs AI — What to Learn in 2026. */
export const MID_DOMAINS: RoadmapDomain[] = [
  {
    id: "system-design",
    title: "Domain 1 — Advanced system design",
    blurb: "Reason about scale before you ship AI-generated services.",
    items: [
      { id: "m-lb", label: "Load balancing" },
      { id: "m-shard", label: "Database sharding" },
      { id: "m-lld", label: "Low-level design (LLD) practice" },
    ],
  },
  {
    id: "distributed",
    title: "Domain 2 — Distributed systems",
    blurb: "How services move data and stay reliable under failure.",
    items: [
      { id: "m-micro", label: "Microservices movement patterns" },
      { id: "m-redis", label: "Redis" },
      { id: "m-kafka", label: "Kafka" },
      { id: "m-k8s", label: "Kubernetes" },
    ],
  },
  {
    id: "agentic",
    title: "Domain 3 — Applied agentic / enterprise AI",
    blurb: "AI orchestration is the ceiling; ship real pipelines, not demos.",
    items: [
      { id: "m-rag", label: "Enterprise-grade RAG pipeline" },
      { id: "m-multi", label: "Multi-agent autonomous workflows" },
    ],
  },
  {
    id: "security",
    title: "Domain 4 — Security in the AI era",
    blurb: "Catch what models invent. You are the audit layer.",
    items: [
      { id: "m-pi", label: "Prompt injection (SQL-injection mental model)" },
      { id: "m-hall", label: "Minimize / contain hallucinations in production" },
      { id: "m-audit", label: "Audit AI-generated code for security flaws before ship" },
    ],
  },
];

export const CORE_HABITS: RoadmapItem[] = [
  {
    id: "h-vocab",
    label: "Treat DSA as vocabulary — pattern recognition, not 500-problem ritual",
  },
  {
    id: "h-audit",
    label: "Always audit AI output for Big-O, concurrency, and edge cases",
  },
  {
    id: "h-constrain",
    label: "Practice prompt + constraint design so agents don’t drift",
  },
  {
    id: "h-nav",
    label: "Practice navigating messy multi-file / AI-generated codebases",
  },
];
