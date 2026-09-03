import type { Topic } from "../schema";
import {
  NEETCODE_150_SLUGS,
  NEETCODE_75,
  ncTopicSlug,
  type NcMeta,
} from "../neetcode/list";

const TITLE: Record<string, { title: string; difficulty: NcMeta["difficulty"]; pattern: string; lc: number }> = {
  "valid-sudoku": { title: "Valid Sudoku", difficulty: "medium", pattern: "Arrays & Hashing", lc: 36 },
  "two-sum-ii-input-array-is-sorted": { title: "Two Sum II - Input Array Is Sorted", difficulty: "medium", pattern: "Two Pointers", lc: 167 },
  "trapping-rain-water": { title: "Trapping Rain Water", difficulty: "hard", pattern: "Two Pointers", lc: 42 },
  "permutation-in-string": { title: "Permutation in String", difficulty: "medium", pattern: "Sliding Window", lc: 567 },
  "sliding-window-maximum": { title: "Sliding Window Maximum", difficulty: "hard", pattern: "Sliding Window", lc: 239 },
  "min-stack": { title: "Min Stack", difficulty: "medium", pattern: "Stack", lc: 155 },
  "evaluate-reverse-polish-notation": { title: "Evaluate Reverse Polish Notation", difficulty: "medium", pattern: "Stack", lc: 150 },
  "generate-parentheses": { title: "Generate Parentheses", difficulty: "medium", pattern: "Stack", lc: 22 },
  "daily-temperatures": { title: "Daily Temperatures", difficulty: "medium", pattern: "Stack", lc: 739 },
  "car-fleet": { title: "Car Fleet", difficulty: "medium", pattern: "Stack", lc: 853 },
  "largest-rectangle-in-histogram": { title: "Largest Rectangle in Histogram", difficulty: "hard", pattern: "Stack", lc: 84 },
  "binary-search": { title: "Binary Search", difficulty: "easy", pattern: "Binary Search", lc: 704 },
  "search-a-2d-matrix": { title: "Search a 2D Matrix", difficulty: "medium", pattern: "Binary Search", lc: 74 },
  "koko-eating-bananas": { title: "Koko Eating Bananas", difficulty: "medium", pattern: "Binary Search", lc: 875 },
  "time-based-key-value-store": { title: "Time Based Key-Value Store", difficulty: "medium", pattern: "Binary Search", lc: 981 },
  "median-of-two-sorted-arrays": { title: "Median of Two Sorted Arrays", difficulty: "hard", pattern: "Binary Search", lc: 4 },
  "copy-list-with-random-pointer": { title: "Copy List with Random Pointer", difficulty: "medium", pattern: "Linked List", lc: 138 },
  "add-two-numbers": { title: "Add Two Numbers", difficulty: "medium", pattern: "Linked List", lc: 2 },
  "find-the-duplicate-number": { title: "Find the Duplicate Number", difficulty: "medium", pattern: "Linked List", lc: 287 },
  "lru-cache": { title: "LRU Cache", difficulty: "medium", pattern: "Linked List", lc: 146 },
  "reverse-nodes-in-k-group": { title: "Reverse Nodes in k-Group", difficulty: "hard", pattern: "Linked List", lc: 25 },
  "diameter-of-binary-tree": { title: "Diameter of Binary Tree", difficulty: "easy", pattern: "Trees", lc: 543 },
  "balanced-binary-tree": { title: "Balanced Binary Tree", difficulty: "easy", pattern: "Trees", lc: 110 },
  "binary-tree-right-side-view": { title: "Binary Tree Right Side View", difficulty: "medium", pattern: "Trees", lc: 199 },
  "count-good-nodes-in-binary-tree": { title: "Count Good Nodes in Binary Tree", difficulty: "medium", pattern: "Trees", lc: 1448 },
  "k-closest-points-to-origin": { title: "K Closest Points to Origin", difficulty: "medium", pattern: "Heap", lc: 973 },
  "last-stone-weight": { title: "Last Stone Weight", difficulty: "easy", pattern: "Heap", lc: 1046 },
  "kth-largest-element-in-a-stream": { title: "Kth Largest Element in a Stream", difficulty: "easy", pattern: "Heap", lc: 703 },
  "kth-largest-element-in-an-array": { title: "Kth Largest Element in an Array", difficulty: "medium", pattern: "Heap", lc: 215 },
  "task-scheduler": { title: "Task Scheduler", difficulty: "medium", pattern: "Heap", lc: 621 },
  "design-twitter": { title: "Design Twitter", difficulty: "medium", pattern: "Heap", lc: 355 },
  subsets: { title: "Subsets", difficulty: "medium", pattern: "Backtracking", lc: 78 },
  permutations: { title: "Permutations", difficulty: "medium", pattern: "Backtracking", lc: 46 },
  "subsets-ii": { title: "Subsets II", difficulty: "medium", pattern: "Backtracking", lc: 90 },
  "combination-sum-ii": { title: "Combination Sum II", difficulty: "medium", pattern: "Backtracking", lc: 40 },
  "palindrome-partitioning": { title: "Palindrome Partitioning", difficulty: "medium", pattern: "Backtracking", lc: 131 },
  "letter-combinations-of-a-phone-number": { title: "Letter Combinations of a Phone Number", difficulty: "medium", pattern: "Backtracking", lc: 17 },
  "n-queens": { title: "N-Queens", difficulty: "hard", pattern: "Backtracking", lc: 51 },
  "max-area-of-island": { title: "Max Area of Island", difficulty: "medium", pattern: "Graphs", lc: 695 },
  "walls-and-gates": { title: "Walls and Gates", difficulty: "medium", pattern: "Graphs", lc: 286 },
  "rotting-oranges": { title: "Rotting Oranges", difficulty: "medium", pattern: "Graphs", lc: 994 },
  "surrounded-regions": { title: "Surrounded Regions", difficulty: "medium", pattern: "Graphs", lc: 130 },
  "course-schedule-ii": { title: "Course Schedule II", difficulty: "medium", pattern: "Graphs", lc: 210 },
  "redundant-connection": { title: "Redundant Connection", difficulty: "medium", pattern: "Graphs", lc: 684 },
  "word-ladder": { title: "Word Ladder", difficulty: "hard", pattern: "Graphs", lc: 127 },
  "reconstruct-itinerary": { title: "Reconstruct Itinerary", difficulty: "hard", pattern: "Graphs", lc: 332 },
  "min-cost-to-connect-all-points": { title: "Min Cost to Connect All Points", difficulty: "medium", pattern: "Graphs", lc: 1584 },
  "network-delay-time": { title: "Network Delay Time", difficulty: "medium", pattern: "Graphs", lc: 743 },
  "swim-in-rising-water": { title: "Swim in Rising Water", difficulty: "hard", pattern: "Graphs", lc: 778 },
  "cheapest-flights-within-k-stops": { title: "Cheapest Flights Within K Stops", difficulty: "medium", pattern: "Graphs", lc: 787 },
  "min-cost-climbing-stairs": { title: "Min Cost Climbing Stairs", difficulty: "easy", pattern: "1-D DP", lc: 746 },
  "partition-equal-subset-sum": { title: "Partition Equal Subset Sum", difficulty: "medium", pattern: "1-D DP", lc: 416 },
  "best-time-to-buy-and-sell-stock-with-cooldown": { title: "Best Time to Buy and Sell Stock with Cooldown", difficulty: "medium", pattern: "2-D DP", lc: 309 },
  "coin-change-ii": { title: "Coin Change II", difficulty: "medium", pattern: "2-D DP", lc: 518 },
  "target-sum": { title: "Target Sum", difficulty: "medium", pattern: "2-D DP", lc: 494 },
  "interleaving-string": { title: "Interleaving String", difficulty: "medium", pattern: "2-D DP", lc: 97 },
  "longest-increasing-path-in-a-matrix": { title: "Longest Increasing Path in a Matrix", difficulty: "hard", pattern: "2-D DP", lc: 329 },
  "distinct-subsequences": { title: "Distinct Subsequences", difficulty: "hard", pattern: "2-D DP", lc: 115 },
  "edit-distance": { title: "Edit Distance", difficulty: "medium", pattern: "2-D DP", lc: 72 },
  "burst-balloons": { title: "Burst Balloons", difficulty: "hard", pattern: "2-D DP", lc: 312 },
  "partition-to-k-equal-sum-subsets": { title: "Partition to K Equal Sum Subsets", difficulty: "medium", pattern: "2-D DP", lc: 698 },
  "jump-game-ii": { title: "Jump Game II", difficulty: "medium", pattern: "Greedy", lc: 45 },
  "gas-station": { title: "Gas Station", difficulty: "medium", pattern: "Greedy", lc: 134 },
  "hand-of-straights": { title: "Hand of Straights", difficulty: "medium", pattern: "Greedy", lc: 846 },
  "merge-triplets-to-form-target-triplet": { title: "Merge Triplets to Form Target Triplet", difficulty: "medium", pattern: "Greedy", lc: 1899 },
  "partition-labels": { title: "Partition Labels", difficulty: "medium", pattern: "Greedy", lc: 763 },
  "valid-parenthesis-string": { title: "Valid Parenthesis String", difficulty: "medium", pattern: "Greedy", lc: 678 },
  "minimum-interval-to-include-each-query": { title: "Minimum Interval to Include Each Query", difficulty: "hard", pattern: "Intervals", lc: 1851 },
  "happy-number": { title: "Happy Number", difficulty: "easy", pattern: "Math & Geometry", lc: 202 },
  "plus-one": { title: "Plus One", difficulty: "easy", pattern: "Math & Geometry", lc: 66 },
  "powx-n": { title: "Pow(x, n)", difficulty: "medium", pattern: "Math & Geometry", lc: 50 },
  "multiply-strings": { title: "Multiply Strings", difficulty: "medium", pattern: "Math & Geometry", lc: 43 },
  "detect-squares": { title: "Detect Squares", difficulty: "medium", pattern: "Math & Geometry", lc: 2013 },
  "single-number": { title: "Single Number", difficulty: "easy", pattern: "Bit Manipulation", lc: 136 },
  "reverse-integer": { title: "Reverse Integer", difficulty: "medium", pattern: "Math & Geometry", lc: 7 },
};

const IN_75 = new Set(NEETCODE_75.map((p) => p.slug));

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => (w === "ii" || w === "iii" ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

function fromSlug(slug: string): Topic {
  const info = TITLE[slug] ?? {
    title: titleFromSlug(slug),
    difficulty: "medium" as const,
    pattern: "NeetCode 150",
    lc: 0,
  };
  const depth = info.difficulty === "easy" ? "core" : info.difficulty === "medium" ? "next" : "advanced";
  return {
    slug: ncTopicSlug(slug),
    track: "dsa",
    category: "NeetCode 150",
    title: info.title,
    summary: `LeetCode ${info.lc || "?"}. ${info.pattern}. Extra after NeetCode 75 — same habit: problem first, then Java.`,
    depth,
    whyItMatters:
      "NeetCode 150 adds variations on the 75. Same patterns, sharper edges. Do these after the 75 feel ordinary.",
    theory: [
      `${info.title}${info.lc ? ` (LC ${info.lc})` : ""} — ${info.pattern}.`,
      "Compare to the closest NeetCode 75 problem. Name what changed.",
      "Dry-run, then Java with the same collections you already use.",
    ],
    howItWorks: [
      "Restate Given / Find.",
      "Map to a pattern you already know from the 75.",
      "Code the twist in Java.",
    ],
    whenToUse: [`When the interview twists a ${info.pattern} problem.`],
    whenNotToUse: ["Skip until NeetCode 75 is fluent."],
    complexity: { time: "see approach", space: "see approach" },
    interviewTips: ["Say how this differs from the basic version on the 75."],
    pitfalls: ["Solving it as a brand-new pattern when it is a twist."],
    practiceIdeas: [info.lc ? `LeetCode ${info.lc}: ${info.title}` : info.title],
    related: [],
  };
}

export const topics: Topic[] = NEETCODE_150_SLUGS.filter((slug) => !IN_75.has(slug)).map(fromSlug);
