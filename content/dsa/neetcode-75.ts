import type { Topic } from "../schema";
import { NEETCODE_75, ncTopicSlug, type NcMeta } from "../neetcode/list";

function fromMeta(meta: NcMeta, list: "75" | "150"): Topic {
  const category = list === "75" ? "NeetCode 75" : "NeetCode 150";
  const depth = meta.difficulty === "easy" ? "core" : meta.difficulty === "medium" ? "next" : "advanced";
  return {
    slug: ncTopicSlug(meta.slug),
    track: "dsa",
    category,
    title: meta.title,
    summary: `LeetCode ${meta.lc}. ${meta.pattern}. ${meta.difficulty}. Learn the problem statement first, then the pattern.`,
    depth,
    whyItMatters: `This is on NeetCode ${list}. Interviewers give the story, not the pattern name. Master the Given / Find / tiny example before you code.`,
    theory: [
      `${meta.title} (LC ${meta.lc}) sits under ${meta.pattern}.`,
      "Say the invariant out loud. Dry-run one tiny case. Then write Java.",
      "Follow-ups usually change constraints, not the whole idea.",
    ],
    howItWorks: [
      "Restate Given and Find without the LeetCode title.",
      "Name the pattern only after the example works on paper.",
      "Code in Java: arrays, HashMap, HashSet, Deque, PriorityQueue as needed.",
    ],
    whenToUse: [`When they describe a ${meta.pattern.toLowerCase()} situation like this.`],
    whenNotToUse: ["Do not force this pattern if a simpler scan or sort is enough."],
    complexity: { time: "see approach", space: "see approach" },
    interviewTips: [
      `Lead with the problem, not “I will use ${meta.pattern}.”`,
      "Offer the brute force, then the linear (or log) improvement.",
    ],
    pitfalls: ["Coding before a dry-run.", "Forgetting edge cases: empty, n=1, all equal."],
    practiceIdeas: [
      `LeetCode ${meta.lc}: ${meta.title}`,
      "Change one constraint and re-solve.",
    ],
    related: [],
  };
}

/** Placeholder topics — pack agents overwrite with rich explanations. */
export const topics: Topic[] = NEETCODE_75.map((meta) => fromMeta(meta, "75"));
