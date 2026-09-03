import { problem, type ProblemCard } from "./types";

export const PACK: Record<string, ProblemCard> = {
  kadane: problem(
    "You get a list of numbers. Some can be negative. You must pick one continuous stretch — no skipping cells.",
    "Which stretch adds up to the biggest total? Return that total.",
    "[-2, 1, -3, 4, -1, 2, 1] → pick [4, -1, 2, 1] = 6. Not [1] and [4,…] separately — they are not one stretch.",
    [
      "Find the maximum sum of any contiguous subarray.",
      "The array can be all negative. What do you return?",
      "Now also return the start and end index of that stretch.",
    ],
  ),
  "prefix-sum": problem(
    "An array of numbers. You will be asked many questions of the form “what is A[L] + … + A[R]?”",
    "Answer each range in constant time after a short setup. Do not rescan the slice every query.",
    "[2, 1, 3, 4], range [1, 3] → 1+3+4 = 8. After a setup of [0, 2, 3, 6, 10], that is 10 − 2.",
    [
      "Answer many range-sum queries after one pass.",
      "Find an index where the left-hand sum equals the right-hand sum.",
      "How many contiguous stretches add to exactly k?",
    ],
  ),
  "difference-array": problem(
    "An array starts as zeros (or given values). You get many updates: “add v to every cell from L through R.”",
    "After all updates, produce the final array. Do not walk each range on every update.",
    "n = 5. Add 2 on [1, 3], then add 3 on [2, 4] → [0, 2, 5, 5, 3].",
    [
      "Apply many range increments, then print the array.",
      "Bookings add seats on flights [from, to]. How many seats does each flight need?",
      "Each car trip adds one passenger from start to end. Does the road ever exceed capacity?",
    ],
  ),
  "prefix-2d": problem(
    "A grid of numbers. You will be asked many rectangle totals: the block from (r1, c1) to (r2, c2).",
    "Answer each rectangle in constant time after a short setup. Do not loop the block every query.",
    "[[1, 2], [3, 4]]. Whole grid sums to 10. The top-left cell alone is 1. The bottom-right 2×1 is 2+4 = 6.",
    [
      "Many rectangle sums on a static matrix.",
      "How many sub-rectangles add to a given target?",
      "You only have one query. Do you still precompute?",
    ],
  ),
  "rotate-array": problem(
    "An array of n numbers and an integer k. k may be larger than n.",
    "Move every value k steps to the right, wrapping the overflow to the front. Prefer little extra memory.",
    "[1, 2, 3, 4, 5, 6, 7], k = 3 → [5, 6, 7, 1, 2, 3, 4].",
    [
      "Rotate the array right by k in place.",
      "What if k is a billion?",
      "Now rotate a square image 90° clockwise.",
    ],
  ),
  "spiral-matrix": problem(
    "An m-by-n grid of numbers.",
    "List every cell once, walking the outer frame right, down, left, up, then the next inner frame.",
    "[[1, 2, 3], [4, 5, 6], [7, 8, 9]] → [1, 2, 3, 6, 9, 8, 7, 4, 5].",
    [
      "Read the matrix in spiral order.",
      "Fill 1 through n² into an n-by-n grid in the same walk.",
      "What about a single row, a single column, or a 1-by-1?",
    ],
  ),
  "set-matrix-zeroes": problem(
    "A grid of numbers. If any cell is 0, its whole row and its whole column must become 0.",
    "Do this in place. A 0 you just wrote must not wipe extra rows that were never originally zero.",
    "[[1, 1, 1], [1, 0, 1], [1, 1, 1]] → [[1, 0, 1], [0, 0, 0], [1, 0, 1]].",
    [
      "Zero every row and column that contains a 0.",
      "Can you do it with only a few extra variables?",
      "What goes wrong if you zero a row the moment you see a 0?",
    ],
  ),
  "dutch-flag": problem(
    "An array whose values are only 0, 1, and 2, in any order.",
    "Rearrange so all 0s come first, then 1s, then 2s. Prefer one pass and constant extra space.",
    "[2, 0, 2, 1, 1, 0] → [0, 0, 1, 1, 2, 2].",
    [
      "Sort an array of three colors in one pass.",
      "After you swap a 2 in, do you still look at the value that landed there?",
      "They need the original relative order of equal values. Does your answer still work?",
    ],
  ),
  "boyer-moore-majority": problem(
    "An array of n values. One value may appear more than n/2 times.",
    "Return that majority value using only a few extra variables, not a frequency table. If a majority is not promised, say so.",
    "[2, 2, 1, 1, 1, 2, 2] → 2 (it appears 4 times out of 7).",
    [
      "Find the value that appears more than half the time.",
      "A majority is not guaranteed. What do you return?",
      "Now find every value that appears more than n/3 times.",
    ],
  ),
  "frequency-map": problem(
    "A list of values, or two strings. You care how often each value appears.",
    "Use those counts to answer “duplicate? anagram? can I build this from that bag of letters?”",
    "“anagram” and “nagaram” match (same letter counts). “rat” and “car” do not.",
    [
      "Can the magazine letters build the ransom note?",
      "Are these two words anagrams?",
      "What are the k most common values?",
    ],
  ),
  "two-sum": problem(
    "An unsorted array and a target. You may use extra memory.",
    "Two different indices whose values add to the target.",
    "[2, 7, 11, 15], target 9 → [0, 1]. The array is not sorted.",
    [
      "Return the two indices that add to target.",
      "The array is already sorted and you cannot use extra memory.",
      "Now find all unique triplets that add to 0.",
    ],
  ),
  "prefix-hashmap": problem(
    "An array that may contain negatives, and a target k. You want contiguous stretches.",
    "How many subarrays add to exactly k? A window that only shrinks from the left will miss answers here.",
    "[1, 2, 3], k = 3 → two stretches: [1, 2] and [3].",
    [
      "Count contiguous stretches whose sum is k.",
      "Longest stretch with equally many zeros and ones.",
      "Same question, but the stretch’s XOR equals k.",
    ],
  ),
  "group-anagrams": problem(
    "A list of words.",
    "Bucket together the words that are rearrangements of the same letters. Return the groups.",
    "[\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"] → [[\"eat\", \"tea\", \"ate\"], [\"tan\", \"nat\"], [\"bat\"]].",
    [
      "Group words that use the same letters.",
      "Your grouping key must not put “aba” and “aad” in the same bucket.",
      "Now group strings that are letter-shifts of each other (abc with bcd).",
    ],
  ),
  "longest-consecutive": problem(
    "An unsorted list of integers. Order in the list does not matter. Duplicates do not extend a run.",
    "The length of the longest run of values that differ by 1 (like 1, 2, 3, 4). Faster than sorting if you can.",
    "[100, 4, 200, 1, 3, 2] → 4, because 1, 2, 3, 4 all appear.",
    [
      "Longest consecutive value run, ignoring array order.",
      "You may not use extra memory. What is the honest bound?",
      "Why is walking forward from every number too slow?",
    ],
  ),
  "design-hashmap": problem(
    "You may not use the language’s map. Keys are integers. Collisions will happen.",
    "Support put, get, and remove so typical calls stay fast even when two keys land in the same slot.",
    "put(1, 10), put(2, 20), get(1) → 10. remove(2), get(2) → miss.",
    [
      "Design put, get, and remove without a built-in map.",
      "Two keys land in the same slot. What happens?",
      "The table is getting full. What do you do next?",
    ],
  ),
  "two-pointers": problem(
    "A sorted array of numbers, and a target sum.",
    "Are there two different positions whose values add to the target? Do it in one pass, not every pair.",
    "[1, 2, 4, 7, 11], target 11 → 4 + 7. You do not try 1+2, 1+4, 1+7…",
    [
      "Two numbers in a sorted array that add to target.",
      "Linear time and constant extra space.",
      "Same idea, but three numbers that add to 0.",
    ],
  ),
  "sliding-window-fixed": problem(
    "An array and a window size k. The window must stay contiguous.",
    "The best score of any k neighbors — usually the max sum — without rebuilding each window from scratch.",
    "[2, 1, 5, 1, 3, 2], k = 3 → [5, 1, 3] = 9 is best. Slide: drop the left, add the right.",
    [
      "Maximum sum of any k consecutive numbers.",
      "The average of each window of size k.",
      "The maximum value in every window of size k.",
    ],
  ),
  "sliding-window-variable": problem(
    "An array or string and a rule the stretch must obey — at most k distinct letters, sum at least S, and the like.",
    "The longest (or shortest) contiguous window that stays valid. The window grows on the right and shrinks on the left.",
    "Longest substring with at most 2 distinct letters: “eceba” → “ece”, length 3.",
    [
      "Longest substring with at most k distinct characters.",
      "Smallest subarray whose sum is at least S (all positives).",
      "Longest run of ones if you may flip at most k zeros.",
    ],
  ),
  "fast-slow-pointers": problem(
    "A singly linked list. You may not count the length first, and you get only a few extra pointers.",
    "Does the list loop back on itself? If so, where does the loop start? Or: which node is in the middle?",
    "1→2→3→4→5, and 5 points back to 3. There is a cycle; it starts at 3. Middle of 1→2→3→4→5 is 3.",
    [
      "Does this linked list contain a cycle?",
      "Return the node where the cycle begins.",
      "Find the middle node, or the nth from the end, in one pass.",
    ],
  ),
  "linear-search": problem(
    "An unsorted list, or a stream you can only read forward. A target value, or a yes/no test.",
    "The first index that matches, or a miss. You cannot jump to the middle.",
    "[4, 9, 1, 7, 2], find 7 → index 3. Find 8 → not found.",
    [
      "Find the first even number; return -1 if none.",
      "Return the last occurrence, not the first.",
      "The data is a linked list — you have no random index.",
    ],
  ),
  "binary-search": problem(
    "A sorted array. You may jump to any index instantly.",
    "Does this number exist? If yes, at which index? Faster than checking every cell.",
    "[1, 3, 5, 7, 9, 11, 13], find 9 → index 4 after a few mid checks, not seven scans.",
    [
      "Find a target in a sorted array faster than a full scan.",
      "Return the first index if the target repeats.",
      "The array is sorted, then rotated. Still faster than linear.",
    ],
  ),
  "binary-search-bounds": problem(
    "A sorted array that may contain duplicates, and a target t.",
    "The leftmost and rightmost index of t, or a miss. Do not walk outward from a random hit — a long run of t would be linear.",
    "[5, 7, 7, 8, 8, 10], t = 8 → first index 3, last index 4. t = 6 → not found.",
    [
      "First and last position of a target in a sorted array.",
      "How many times does t appear?",
      "How many values fall in [L, R]?",
    ],
  ),
  "peak-finding": problem(
    "An array of numbers. A peak is a cell ≥ its neighbors; the two ends have one neighbor each.",
    "Any peak index. You do not need the global max. Faster than scanning every cell.",
    "[1, 2, 3, 1] → index 2 (value 3). [1, 2, 1, 3, 5, 6, 4] → index 2 or 5 are both fine.",
    [
      "Find any index that is higher than its neighbors.",
      "The array rises then falls. Find the top.",
      "Same question on a grid: a cell greater than its four neighbors.",
    ],
  ),
  "search-rotated-array": problem(
    "An array that was sorted increasing, then rotated at some unknown pivot. A target t.",
    "The index of t, or a miss, faster than a full scan.",
    "[4, 5, 6, 7, 0, 1, 2], t = 0 → index 4. t = 3 → not found.",
    [
      "Find a target in a sorted array that was rotated.",
      "Find the smallest value — the rotation seam.",
      "Values can repeat. Do you still have a log n guarantee?",
    ],
  ),
  "binary-search-on-answer": problem(
    "You need the smallest (or largest) number k that makes a check succeed. If k works, every larger k also works — or the reverse.",
    "That boundary k. You may not try every possible k; the range can be up to a billion.",
    "Piles [3, 6, 7, 11], 8 hours. Slowest eat speed that still finishes: 4. Speed 3 is too slow; 4 is just enough.",
    [
      "Minimum eating speed to finish all piles in h hours.",
      "Split the array into m pieces; minimize the largest piece sum.",
      "Place cows in stalls so the closest pair is as far apart as possible.",
    ],
  ),
  "ternary-search": problem(
    "A cost that depends on an integer k. The cost falls, then rises — one valley. You can evaluate cost(k).",
    "The k that minimizes the cost. There is no simple yes/no cutoff that stays false and then stays true.",
    "cost(1)=10, cost(2)=6, cost(3)=5, cost(4)=7, cost(5)=12 → best k is 3 (cost 5).",
    [
      "Find the integer k that minimizes this down-then-up cost.",
      "Pick a meeting point on a line that minimizes total travel.",
      "The sample looks mountain-shaped. What if there are two valleys?",
    ],
  ),
  "interpolation-search": problem(
    "A sorted array of numbers spread roughly evenly from first to last. A target t.",
    "The index of t. You may guess nearer the front when t is close to the first value, instead of always jumping to the middle.",
    "[10, 20, 30, 40, 50, 60, 70], find 60. A uniform guess lands near index 5, not the middle 3.",
    [
      "Find a target in a uniformly spaced sorted list with fewer probes than always taking mid.",
      "What if the values grow as 1, 2, 4, 8, …?",
      "The keys are strings. Can you still guess an index?",
    ],
  ),
  "exponential-search": problem(
    "A sorted list whose length you do not know — or get(i) fails past the end. A target t.",
    "The index of t. First find a window that must contain it, then search only that window.",
    "Sorted values 1, 2, 3, … Find 13. You check indices 1, 2, 4, 8, 16, then search only 8..16.",
    [
      "Find a target in a sorted array of unknown size.",
      "get(i) throws if i is past the end. Still find t.",
      "The target is near the front of a huge sorted array.",
    ],
  ),
};
