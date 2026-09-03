import type { Topic } from "@/content/schema";
import { EXAMPLES, type WorkedExample } from "@/content/examples";

export type VisualKind =
  | "binary-search"
  | "linear-search"
  | "two-pointers"
  | "sliding-window"
  | "bfs"
  | "sort"
  | "pipeline"
  | "messages"
  | "steps";

function exampleFor(topic: Topic) {
  return (
    EXAMPLES[`${topic.track}:${topic.slug}`] ??
    EXAMPLES[`dsa:${topic.slug}`] ??
    EXAMPLES[`hld:${topic.slug}`] ??
    EXAMPLES[`lld:${topic.slug}`]
  );
}

export function easyDefinition(topic: Topic): string {
  const override = exampleFor(topic)?.easy;
  if (override) return override;

  const first = topic.summary.replace(/\s+/g, " ").trim();
  if (first.length <= 180) return first;
  const cut = first.slice(0, 170);
  const end = cut.lastIndexOf(" ");
  return `${cut.slice(0, end)}…`;
}

export function workedExample(topic: Topic): WorkedExample {
  const override = exampleFor(topic);
  if (override) {
    return {
      setup: override.setup,
      input: override.input,
      steps: override.steps,
      result: override.result,
    };
  }

  return {
    setup: `Here is a tiny version of ${topic.title.toLowerCase()} — small enough to hold in your head.`,
    input: topic.practiceIdeas[0],
    steps: topic.howItWorks.slice(0, 5),
    result:
      topic.practiceIdeas[1] ??
      "Once you can do this tiny case, the interview version is the same idea with bigger numbers.",
  };
}

export function flowSteps(topic: Topic): { label: string; detail: string }[] {
  return topic.howItWorks.map((detail, index) => ({
    label: `Step ${index + 1}`,
    detail,
  }));
}

export function visualKind(topic: Topic): VisualKind {
  const slug = topic.slug;
  if (
    slug === "binary-search" ||
    slug.includes("binary-search") ||
    slug === "search-rotated-array" ||
    slug === "peak-finding" ||
    slug === "binary-search-bounds"
  ) {
    return "binary-search";
  }
  if (slug === "linear-search") return "linear-search";
  if (slug.includes("sliding-window") || slug === "sliding-window") return "sliding-window";
  if (slug.includes("two-pointer") || slug === "two-pointers" || slug === "fast-slow-pointers") {
    return "two-pointers";
  }
  if (slug === "bfs" || slug === "dfs" || slug === "dijkstra") return "bfs";
  if (slug.includes("sort") && topic.track === "dsa") return "sort";
  if (topic.track === "hld") return "pipeline";
  if (topic.track === "lld") return "messages";
  return "steps";
}
