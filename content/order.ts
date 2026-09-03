import type { Depth, Topic, TrackId } from "./schema";

const DEPTH_RANK: Record<Depth, number> = { core: 0, next: 1, advanced: 2 };

export const DSA_CATEGORY_ORDER = [
  "Arrays",
  "Hashing",
  "Pointers",
  "Searching",
  "Sorting",
  "Stacks",
  "Heaps",
  "Linked Lists",
  "Trees",
  "Graphs",
  "Recursion",
  "Dynamic Programming",
  "Greedy",
  "Strings",
  "Bit Manipulation",
  "Math",
  "Advanced Data Structures",
] as const;

const HLD_CATEGORY_ORDER = [
  "Method",
  "Quality attributes",
  "Distributed models",
  "Estimates",
  "Traffic",
  "Architecture",
  "Data stores",
  "Async",
  "Reliability",
  "Files",
  "Realtime",
  "Security",
  "Operations",
  "Classic designs",
] as const;

const LLD_CATEGORY_ORDER = [
  "Interview Method",
  "OOP",
  "Principles",
  "UML & Modeling",
  "Creational Patterns",
  "Structural Patterns",
  "Behavioral Patterns",
  "Concurrency",
  "Class Design",
  "Architecture",
  "Designs",
  "Pattern Cheatsheet",
] as const;

const CATEGORY_ORDER: Record<TrackId, readonly string[]> = {
  dsa: DSA_CATEGORY_ORDER,
  hld: HLD_CATEGORY_ORDER,
  lld: LLD_CATEGORY_ORDER,
};

const DSA_CATEGORY_LABEL: Record<string, string> = {
  Pointers: "Two pointers & sliding window",
  Searching: "Binary search",
  Stacks: "Stacks & queues",
  Trees: "Trees & tries",
  Recursion: "Recursion & backtracking",
  "Bit Manipulation": "Bits",
  "Advanced Data Structures": "Advanced structures",
};

const DSA_MUST_HAVES = [
  "kadane",
  "prefix-sum",
  "dutch-flag",
  "rotate-array",
  "set-matrix-zeroes",
  "spiral-matrix",
  "difference-array",
  "prefix-2d",
  "boyer-moore-majority",
  "two-sum",
  "frequency-map",
  "group-anagrams",
  "prefix-hashmap",
  "longest-consecutive",
  "design-hashmap",
  "two-pointers",
  "sliding-window-variable",
  "sliding-window-fixed",
  "fast-slow-pointers",
  "binary-search",
  "search-rotated-array",
  "binary-search-on-answer",
  "binary-search-bounds",
  "peak-finding",
  "linear-search",
  "exponential-search",
  "interpolation-search",
  "ternary-search",
  "merge-sort",
  "quick-sort",
  "heap-sort",
  "insertion-sort",
  "counting-sort",
  "radix-sort",
  "bucket-sort",
  "randomized-quicksort",
  "three-way-quicksort",
  "selection-sort",
  "bubble-sort",
  "cycle-sort",
  "valid-parentheses",
  "next-greater-element",
  "monotonic-stack",
  "min-stack",
  "largest-rectangle-histogram",
  "sliding-window-max",
  "monotonic-queue",
  "deque",
  "circular-queue",
  "bfs-dfs-iterative",
  "top-k",
  "heapify",
  "heap-insert-extract",
  "median-stream",
  "dijkstra-heap",
  "huffman",
  "reverse-linked-list",
  "floyd-cycle",
  "merge-two-lists",
  "nth-from-end",
  "middle-of-list",
  "lru-cache",
  "merge-k-lists",
  "list-intersection",
  "trie",
  "tree-traversals",
  "lca",
  "validate-bst",
  "tree-height-diameter",
  "path-sum",
  "invert-tree",
  "serialize-tree",
  "max-path-sum",
  "kth-smallest-bst",
  "flatten-binary-tree",
  "morris-traversal",
  "bfs",
  "dfs",
  "dijkstra",
  "union-find",
  "topo-sort-kahn",
  "islands",
  "connected-components",
  "bfs-shortest-path",
  "cycle-directed",
  "cycle-undirected",
  "bipartite",
  "topo-sort-dfs",
  "bellman-ford",
  "kruskal",
  "prim",
  "floyd-warshall",
  "subsets",
  "permutations",
  "combinations",
  "generate-parentheses",
  "word-search",
  "recursion-memo",
  "divide-and-conquer",
  "n-queens",
  "sudoku-solver",
  "closest-pair",
  "knapsack-01",
  "coin-change",
  "lcs",
  "lis",
  "edit-distance",
  "climbing-stairs",
  "house-robber",
  "fibonacci-dp",
  "grid-dp",
  "unbounded-knapsack",
  "decode-ways",
  "palindrome-dp",
  "interval-dp",
  "matrix-chain",
  "burst-balloons",
  "bitmask-dp",
  "tree-dp",
  "digit-dp",
  "interval-scheduling",
  "jump-game",
  "meeting-rooms",
  "gas-station",
  "fractional-knapsack",
  "assign-cookies",
  "candy",
  "greedy-mst",
  "kmp",
  "sliding-window-strings",
  "trie-search",
  "rabin-karp",
  "z-algorithm",
  "manacher",
  "suffix-array",
  "suffix-tree",
  "aho-corasick",
  "xor-tricks",
  "count-bits",
  "bit-set-unset-toggle",
  "bitmask-subsets",
  "kernighan",
  "euclid-gcd",
  "sieve",
  "fast-exponentiation",
  "modular-arithmetic",
  "factorization",
  "ncr-mod-inverse",
  "catalan",
  "segment-tree",
  "fenwick",
  "sparse-table",
  "lazy-propagation",
  "ordered-set",
  "persistent-segment-tree",
];

const HLD_MUST_HAVES = [
  "hld-interview-method",
  "url-shortener",
  "cap-theorem",
  "consistent-hashing",
  "cache-patterns",
  "sharding",
  "replication",
  "queues-pubsub-streams",
  "kafka-sqs-rabbit",
  "rate-limiting",
  "load-balancers",
  "newsfeed",
  "chat",
  "unique-ids",
];

const LLD_MUST_HAVES = [
  "lld-interview-method",
  "parking-lot",
  "elevator",
  "strategy-pattern",
  "observer-pattern",
  "solid-srp",
  "solid-ocp",
  "add-a-variant",
];

const MUST_HAVES: Record<TrackId, string[]> = {
  dsa: DSA_MUST_HAVES,
  hld: HLD_MUST_HAVES,
  lld: LLD_MUST_HAVES,
};

export function categoryLabel(track: TrackId, category: string): string {
  if (track === "dsa") return DSA_CATEGORY_LABEL[category] ?? category;
  return category;
}

export function sortTopicsForListing(topics: Topic[], track: TrackId): Topic[] {
  const must = MUST_HAVES[track] ?? [];
  const mustIndex = new Map(must.map((slug, index) => [slug, index]));
  return [...topics].sort((a, b) => {
    const depth = DEPTH_RANK[a.depth] - DEPTH_RANK[b.depth];
    if (depth) return depth;
    const mustA = mustIndex.get(a.slug) ?? 10_000;
    const mustB = mustIndex.get(b.slug) ?? 10_000;
    if (mustA !== mustB) return mustA - mustB;
    return a.title.localeCompare(b.title);
  });
}

export function orderedCategories(track: TrackId, found: string[]): string[] {
  const preferred = CATEGORY_ORDER[track] ?? [];
  const present = new Set(found);
  const head = preferred.filter((category) => present.has(category));
  const tail = found.filter((category) => !preferred.includes(category));
  return [...head, ...tail];
}

export function depthRank(depth: Depth): number {
  return DEPTH_RANK[depth];
}
