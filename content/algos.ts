export type AlgoProblem = {
  id: string;
  title: string;
  slug: string;
};

export type AlgoCategory = {
  id: string;
  title: string;
  problems: AlgoProblem[];
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function p(title: string): AlgoProblem {
  const slug = slugify(title);
  return { id: slug, title, slug };
}

/** Curated list from Algos.pdf (NeetCode-style pattern pack). */
export const ALGO_CATEGORIES: AlgoCategory[] = [
  {
    id: "arrays-hashing",
    title: "Arrays & Hashing",
    problems: [
      p("Contains Duplicate"),
      p("Valid Anagram"),
      p("Two Sum"),
      p("Group Anagrams"),
      p("Top K Frequent Elements"),
      p("Product of Array Except Self"),
      p("Valid Sudoku"),
      p("Encode and Decode Strings"),
      p("Longest Consecutive Sequence"),
    ],
  },
  {
    id: "two-pointers",
    title: "Two Pointers",
    problems: [
      p("Valid Palindrome"),
      p("Two Sum II - Input Array Is Sorted"),
      p("3Sum"),
      p("Container With Most Water"),
      p("Trapping Rain Water"),
    ],
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    problems: [
      p("Best Time to Buy and Sell Stock"),
      p("Longest Substring Without Repeating Characters"),
      p("Longest Repeating Character Replacement"),
      p("Permutation in String"),
      p("Minimum Window Substring"),
      p("Sliding Window Maximum"),
    ],
  },
  {
    id: "stack",
    title: "Stack",
    problems: [
      p("Valid Parentheses"),
      p("Min Stack"),
      p("Evaluate Reverse Polish Notation"),
      p("Generate Parentheses"),
      p("Daily Temperatures"),
      p("Car Fleet"),
      p("Largest Rectangle in Histogram"),
    ],
  },
  {
    id: "binary-search",
    title: "Binary Search",
    problems: [
      p("Binary Search"),
      p("Search a 2D Matrix"),
      p("Koko Eating Bananas"),
      p("Find Minimum in Rotated Sorted Array"),
      p("Search in Rotated Sorted Array"),
      p("Time Based Key-Value Store"),
      p("Median of Two Sorted Arrays"),
    ],
  },
  {
    id: "linked-list",
    title: "Linked List",
    problems: [
      p("Reverse Linked List"),
      p("Merge Two Sorted Lists"),
      p("Reorder List"),
      p("Remove Nth Node From End of List"),
      p("Copy List with Random Pointer"),
      p("Add Two Numbers"),
      p("Linked List Cycle"),
      p("Find the Duplicate Number"),
      p("LRU Cache"),
      p("Merge k Sorted Lists"),
      p("Reverse Nodes in k-Group"),
    ],
  },
  {
    id: "trees",
    title: "Trees",
    problems: [
      p("Invert Binary Tree"),
      p("Maximum Depth of Binary Tree"),
      p("Diameter of Binary Tree"),
      p("Balanced Binary Tree"),
      p("Same Tree"),
      p("Subtree of Another Tree"),
      p("Lowest Common Ancestor of a Binary Search Tree"),
      p("Binary Tree Level Order Traversal"),
      p("Binary Tree Right Side View"),
      p("Count Good Nodes in Binary Tree"),
      p("Validate Binary Search Tree"),
      p("Kth Smallest Element in a BST"),
      p("Construct Binary Tree from Preorder and Inorder Traversal"),
      p("Binary Tree Maximum Path Sum"),
    ],
  },
  {
    id: "tries",
    title: "Tries",
    problems: [
      p("Implement Trie (Prefix Tree)"),
      p("Design Add and Search Words Data Structure"),
      p("Word Search II"),
    ],
  },
  {
    id: "heap",
    title: "Heap / Priority Queue",
    problems: [
      p("Kth Largest Element in a Stream"),
      p("Last Stone Weight"),
      p("K Closest Points to Origin"),
      p("Kth Largest Element in an Array"),
      p("Task Scheduler"),
      p("Design Twitter"),
      p("Find Median from Data Stream"),
    ],
  },
  {
    id: "backtracking",
    title: "Backtracking",
    problems: [
      p("Subsets"),
      p("Combination Sum"),
      p("Permutations"),
      p("Subsets II"),
      p("Combination Sum II"),
      p("Word Search"),
      p("Palindrome Partitioning"),
      p("Letter Combinations of a Phone Number"),
      p("N-Queens"),
    ],
  },
  {
    id: "graphs",
    title: "Graphs",
    problems: [
      p("Number of Islands"),
      p("Max Area of Island"),
      p("Clone Graph"),
      p("Walls and Gates"),
      p("Rotting Oranges"),
      p("Pacific Atlantic Water Flow"),
      p("Surrounded Regions"),
      p("Course Schedule"),
      p("Course Schedule II"),
      p("Graph Valid Tree"),
      p("Number of Connected Components in an Undirected Graph"),
      p("Redundant Connection"),
      p("Word Ladder"),
    ],
  },
  {
    id: "advanced-graphs",
    title: "Advanced Graphs",
    problems: [
      p("Reconstruct Itinerary"),
      p("Min Cost to Connect All Points"),
      p("Network Delay Time"),
      p("Swim in Rising Water"),
      p("Alien Dictionary"),
      p("Cheapest Flights Within K Stops"),
    ],
  },
  {
    id: "dp-1d",
    title: "1-D Dynamic Programming",
    problems: [
      p("Climbing Stairs"),
      p("Min Cost Climbing Stairs"),
      p("House Robber"),
      p("House Robber II"),
      p("Longest Palindromic Substring"),
      p("Palindromic Substrings"),
      p("Decode Ways"),
      p("Coin Change"),
      p("Maximum Product Subarray"),
      p("Word Break"),
      p("Longest Increasing Subsequence"),
      p("Partition Equal Subset Sum"),
    ],
  },
  {
    id: "dp-2d",
    title: "2-D Dynamic Programming",
    problems: [
      p("Unique Paths"),
      p("Longest Common Subsequence"),
      p("Best Time to Buy and Sell Stock with Cooldown"),
      p("Coin Change II"),
      p("Target Sum"),
      p("Interleaving String"),
      p("Longest Increasing Path in a Matrix"),
      p("Distinct Subsequences"),
      p("Edit Distance"),
      p("Burst Balloons"),
      p("Regular Expression Matching"),
    ],
  },
  {
    id: "greedy",
    title: "Greedy",
    problems: [
      p("Maximum Subarray"),
      p("Jump Game"),
      p("Jump Game II"),
      p("Gas Station"),
      p("Hand of Straights"),
      p("Merge Triplets to Form Target Triplet"),
      p("Partition Labels"),
      p("Valid Parenthesis String"),
    ],
  },
  {
    id: "intervals",
    title: "Intervals",
    problems: [
      p("Insert Interval"),
      p("Merge Intervals"),
      p("Non-overlapping Intervals"),
      p("Meeting Rooms"),
      p("Meeting Rooms II"),
      p("Minimum Interval to Include Each Query"),
    ],
  },
  {
    id: "math-geometry",
    title: "Math & Geometry",
    problems: [
      p("Rotate Image"),
      p("Spiral Matrix"),
      p("Set Matrix Zeroes"),
      p("Happy Number"),
      p("Plus One"),
      p("Pow(x, n)"),
      p("Multiply Strings"),
      p("Detect Squares"),
    ],
  },
  {
    id: "bit-manipulation",
    title: "Bit Manipulation",
    problems: [
      p("Single Number"),
      p("Number of 1 Bits"),
      p("Counting Bits"),
      p("Reverse Bits"),
      p("Missing Number"),
      p("Sum of Two Integers"),
      p("Reverse Integer"),
    ],
  },
];

export const ALGO_PROBLEM_COUNT = ALGO_CATEGORIES.reduce(
  (n, c) => n + c.problems.length,
  0,
);

export function leetcodeUrl(slug: string): string {
  return `https://leetcode.com/problems/${slug}/`;
}
