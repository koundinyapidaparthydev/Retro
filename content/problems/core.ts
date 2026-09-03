import { problem, type ProblemCard } from "./types";

export const CORE_PROBLEMS: Record<string, ProblemCard> = {
  kadane: problem(
    "You get a list of numbers. Some can be negative. You must pick one continuous stretch — no skipping cells in the middle.",
    "Which stretch adds up to the biggest total? Return that total (and later, the start and end index).",
    "[-2, 1, -3, 4, -1, 2, 1] → pick [4, -1, 2, 1] = 6. Not [1] and [4,…] separately — they are not one stretch.",
    [
      "Find the maximum sum of any contiguous subarray.",
      "The array can be all negative. What do you return?",
      "Now also return the start and end index of that stretch.",
    ],
  ),
  "two-pointers": problem(
    "A sorted array of numbers, and a target sum.",
    "Are there two different positions whose values add to the target? Do it in one pass, not every pair.",
    "[1, 2, 4, 7, 11], target 11 → 4 + 7. You do not try 1+2, 1+4, 1+7…",
    [
      "Two numbers in a sorted array that add to target.",
      "Do it in O(n) time and O(1) extra space.",
      "Same idea, but three numbers (3-sum).",
    ],
  ),
  "binary-search": problem(
    "A sorted array. You may jump to any index in O(1).",
    "Does this number exist? If yes, at which index? Faster than checking every cell.",
    "[1, 3, 5, 7, 9, 11, 13], find 9 → index 4 after three mid checks, not seven scans.",
    [
      "Find a target in a sorted array in O(log n).",
      "Return the first index of the target if it repeats.",
      "The array is sorted, then rotated. Still log n.",
    ],
  ),
  bfs: problem(
    "A graph or grid. Every step costs the same (one hop).",
    "Fewest hops from start to target. Not a weighted fastest path — just hop count.",
    "A→B, A→C, B→D. Start A, find D. Answer is 2 (A-B-D), not a deep walk.",
    [
      "Shortest path in a maze. Walls are #.",
      "Word ladder: change one letter at a time.",
      "Rotting oranges: many starts at once.",
    ],
  ),
  "two-sum": problem(
    "An unsorted array and a target. You may use extra memory.",
    "Two indices whose values add to the target.",
    "[2, 7, 11, 15], target 9 → [0, 1]. The array is not sorted, so you cannot use two fingers.",
    [
      "Return the two indices that add to target.",
      "What if the array is sorted? (then two pointers, no Map)",
    ],
  ),
  "prefix-sum": problem(
    "An array of numbers. You will be asked many range sums: “what is A[L] + … + A[R]?”",
    "Answer each range in O(1) after a short setup. Do not rescan the slice every time.",
    "[2, 1, 3, 4], range [1, 3] → 1+3+4 = 8. If prefix is [0,2,3,6,10], answer is prefix[4]−prefix[1].",
    [
      "How many range-sum queries can you answer after one pass?",
      "Subarray sum equals k — how does a prefix map help?",
    ],
  ),
  "sliding-window-fixed": problem(
    "An array and a window size k. The window must stay contiguous.",
    "The best score of any k neighbors — usually max sum — without rebuilding the window from scratch.",
    "[2, 1, 5, 1, 3, 2], k=3 → [5,1,3]=9 is best. Slide: drop the left, add the right.",
    [
      "Maximum sum of any k consecutive numbers.",
      "Average of each window of size k.",
    ],
  ),
  "sliding-window-variable": problem(
    "An array (or string) and a budget — longest stretch that still obeys a rule.",
    "The longest (or shortest) contiguous window that stays valid. The window grows and shrinks.",
    "Longest substring with at most 2 distinct letters: “eceba” → “ece” length 3.",
    [
      "Longest substring with at most k distinct characters.",
      "Smallest subarray whose sum is at least S.",
    ],
  ),
  dfs: problem(
    "A graph or maze. You may dive down one path before trying the next.",
    "Does a path exist? Visit every node? Not “fewest hops” — that is a different question.",
    "A→B→D dead end, back to A→C. Order might be A, B, D, C.",
    [
      "Is there a path from start to exit?",
      "Number of islands — flood one land mass at a time.",
    ],
  ),
  dijkstra: problem(
    "A graph where each road has a different cost. No negative costs.",
    "Cheapest total cost from start to every node (or to a target). Not hop count.",
    "A-B=1, A-C=4, B-C=1. Start A. Best to C is A-B-C = 2, not the direct 4.",
    [
      "Shortest time on a weighted map. Edges are positive.",
      "Why can't you use a plain queue here?",
    ],
  ),
  "lru-cache": problem(
    "A cache that can hold only k keys. Gets and puts must be fast.",
    "When it is full, throw out the key that has not been touched for the longest time.",
    "Capacity 2: put(1), put(2), get(1), put(3) → 2 is gone. 1 was touched, so it stayed.",
    [
      "Design get and put in O(1).",
      "Which key leaves when the backpack is full?",
    ],
  ),
  "knapsack-01": problem(
    "Items with a weight and a value. A bag with a weight cap. Each item at most once.",
    "The best total value that still fits.",
    "Weights [1,2,3], values [6,10,12], cap 5 → take 2 and 3 = 22, not all three.",
    [
      "Max value with a weight cap, each item once.",
      "Can we split this array into two equal sums?",
    ],
  ),
  "merge-sort": problem(
    "An unsorted array. You may use extra memory.",
    "Sort it by splitting in half, sorting each half, then merging two sorted lists.",
    "[4, 1, 3, 2] → [1,4] and [2,3] → merge to [1,2,3,4]. Always n log n.",
    [
      "Sort this array. What if they ask for a stable sort?",
      "Count inversions while you sort.",
    ],
  ),
  "valid-parentheses": problem(
    "A string of brackets: ( ) [ ] { }.",
    "Is every opener closed by the right type, in the right order?",
    "([{}]) is good. ([)] is not — they cross. (() is not — one left open.",
    [
      "Is this bracket string valid?",
      "Longest valid parentheses substring.",
    ],
  ),
  "interval-scheduling": problem(
    "A list of meetings, each with a start and end. One room.",
    "The largest set of meetings that do not overlap.",
    "[(1,4),(2,3),(3,5)] → pick (2,3) and maybe (3,5), not (1,4) plus (2,3).",
    [
      "Maximum number of non-overlapping intervals.",
      "Minimum rooms so nobody waits (that's a different question).",
    ],
  ),
};
