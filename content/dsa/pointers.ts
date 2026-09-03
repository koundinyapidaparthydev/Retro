import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "two-pointers",
    track: "dsa",
    category: "Pointers",
    title: "Two Pointers",
    summary:
      "Walk two indices through a sequence — from both ends, or as a chase — so a nested O(n²) scan becomes O(n) after a sort or on an already-ordered structure.",
    depth: "core",
    whyItMatters:
      "Two pointers is the first pattern that turns 'I would brute force pairs' into a linear pass. Pair-sum in a sorted array, removing duplicates in place, container-with-most-water, merging two sorted lists, partitioning around a pivot — they are the same idea with different move rules. Interviewers listen for whether you can say why a pointer only ever moves one way, because that is the proof you do not miss a pair.",
    theory: [
      "The opposite-ends flavor starts i at 0 and j at n-1 on a sorted array. If A[i] + A[j] is too small, i must increase (a smaller left end cannot help). If the sum is too big, j must decrease. Each step discards an index forever, so you get O(n) after the O(n log n) sort. The monotonicity of the sorted order is what makes the discard legal.",
      "The same-direction flavor is a slow writer and a fast reader: read with j, write with i. In-place duplicate removal, stable partition, and 'move zeros to the end' are this. The invariant is A[0..i) is the prefix you have already decided, and j scans the unknown suffix. You never go backward.",
      "Two pointers on two arrays (merge, intersection of sorted lists) is the same discard logic across sequences. On a linked list you hold two node references instead of indices; the algorithm does not change, the operations do (no A[i-1] without a prev pointer).",
      "If the move rule is wrong, you silently drop answers. Classic failure: on an unsorted pair-sum, moving the ends is meaningless. Sort first, or use a hash set. Two pointers are not a substitute for the right precondition.",
    ],
    howItWorks: [
      "Name the invariant: what is true about A[0..i] and A[j..n), or about the two sequences.",
      "At each step, look at A[i] and A[j] (or the two heads) and decide exactly one move that cannot throw away a remaining answer.",
      "Advance that pointer; record a hit if the pair/window is valid.",
      "Stop when the pointers cross or a list is exhausted.",
      "If you sorted, map answers back to original indices if the problem needs them (store pairs of {value, index}).",
    ],
    whenToUse: [
      "Sorted arrays: 2-sum, 3-sum (fix one, two-pointer the rest), closest pair sum.",
      "In-place rewrites: dedup, partition, compress runs.",
      "Merging or intersecting two sorted sequences.",
    ],
    whenNotToUse: [
      "Unsorted pair queries where you cannot sort (need original positions and O(n) time) — use a hash map.",
      "Need all pairs, not a yes/no or a single best pair — output size may be n² anyway.",
    ],
    complexity: {
      time: "O(n) on already-sorted data; O(n log n) if you must sort",
      space: "O(1) besides the sort",
    },
    tradeoffs: [
      "Linear scan and O(1) extra space versus the need for order (or a rewrite invariant).",
      "Sorting first is simpler than a hash when you may mutate and only care about values.",
    ],
    interviewTips: [
      "For 3-sum: sort, fix k, two-pointer i/j on the suffix, skip duplicates at all three roles. That is the expected solution.",
      "Say the discard sentence: 'If the sum is too small I will never want this i again.'",
      "Container with most water: move the shorter side. Moving the taller one cannot increase height and only shrinks width.",
    ],
    pitfalls: [
      "Moving both pointers at once and skipping the pair that would have worked.",
      "Forgetting to skip duplicate values when the problem wants unique triplets.",
      "Using two pointers on an unsorted array for 2-sum and getting lucky on the sample.",
    ],
    practiceIdeas: [
      "Two Sum II (sorted input), 3Sum, 3Sum closest.",
      "Container With Most Water; Trapping Rain Water (two pointers or stack).",
      "Remove duplicates in place; merge two sorted arrays from the back.",
    ],
    related: [
      "sliding-window-fixed",
      "sliding-window-variable",
      "dutch-flag",
      "quick-sort",
      "merge-two-lists",
      "two-sum",
    ],
  },
  {
    slug: "sliding-window-fixed",
    track: "dsa",
    category: "Pointers",
    title: "Fixed Sliding Window",
    summary:
      "Maintain the aggregate of a contiguous block of length k as it slides by one. Add the entering element, drop the leaving one — O(n) instead of O(nk).",
    depth: "core",
    whyItMatters:
      "Fixed windows are the interview version of a moving average. Maximum sum of k consecutive cards, number of anagrams of a length-p pattern, average temperature over a week — if you recompute each window from scratch you are leaving a log of performance on the table and a signal that you missed the pattern. The skill is identifying that every window has the same size so the enter/leave updates are O(1) (or O(1) amortized with a deque for maxima).",
    theory: [
      "A window is a contiguous subarray A[i..i+k). The next window is A[i+1..i+k+1). The symmetric difference is two elements: A[i] leaves, A[i+k] enters. Any aggregate you can update from those two changes — sum, frequency map of an alphabet, XOR, a running product with care for zeros — moves in O(1) (or O(Σ) for a small alphabet).",
      "Max/min of a window is not O(1) with just a variable: the leaving element might have been the unique max. A monotonic deque stores candidates in decreasing order of value and increasing index, so the front is always the window max. That is the sliding-window-maximum problem and a standard hard-medium.",
      "When k is part of the input and can be n, state O(n) clearly. When k is huge and the aggregate is 'just sum,' prefix sums also work: sum[i..i+k) = P[i+k] - P[i]. Prefix sums are simpler if you do not need to stream; the sliding update is simpler if you already have the previous answer.",
    ],
    howItWorks: [
      "Compute the aggregate for A[0..k). Record it as the best if needed.",
      "For i from k to n-1: add A[i], remove A[i-k], update the best.",
      "For frequency problems, increment the incoming character, decrement the outgoing, and compare the map to the target signature.",
      "For window maxima, push i into a decreasing deque, pop the front if it is ≤ i-k, read the front as the max.",
    ],
    whenToUse: [
      "Every query is 'exactly k consecutive elements.'",
      "Streaming data where you cannot store prefix arrays of the whole history.",
      "Anagram / same-composition checks against a pattern of length k.",
    ],
    whenNotToUse: [
      "The window size is variable and defined by a constraint (sum ≤ S, at most k distinct). Use a variable window.",
      "Subarrays that are not contiguous — that is a different problem (subsequences).",
    ],
    complexity: {
      time: "O(n) for O(1) updates; O(n) with a deque for min/max",
      space: "O(1) for sums; O(k) or O(Σ) for deques and maps",
    },
    interviewTips: [
      "If they say 'subarray of length k,' do not write a nested loop. Write enter/leave.",
      "For max in each window, name the monotonic deque. Do not sort each window.",
    ],
    pitfalls: [
      "Removing A[i] instead of A[i-k] — off-by-one that fails only on later windows.",
      "Not handling n < k (zero windows or one partial, depending on the spec).",
      "Using a heap for window max and forgetting to lazy-delete stale indices (works, but deque is cleaner).",
    ],
    practiceIdeas: [
      "Maximum sum of any k consecutive elements.",
      "Find all anagrams of p in s (fixed window of length p.length).",
      "Sliding window maximum (LeetCode 239).",
    ],
    related: [
      "sliding-window-variable",
      "sliding-window-max",
      "monotonic-queue",
      "prefix-sum",
      "two-pointers",
    ],
  },
  {
    slug: "sliding-window-variable",
    track: "dsa",
    category: "Pointers",
    title: "Variable Sliding Window",
    summary:
      "Grow a right pointer to include more, shrink a left pointer until the window is valid (or invalid). The two pointers bound the best contiguous segment under a constraint.",
    depth: "core",
    whyItMatters:
      "Variable windows are everywhere in string and array interviews: longest substring without repeating characters, smallest subarray with sum ≥ S, at most k distinct, longest ones after flipping k zeros. The trick is a monotonic constraint: as you extend right, the window only gets 'worse' on the constraint (more distinct chars, larger sum, more zeros), so left only needs to move forward. If that monotonicity fails, the pattern does not apply.",
    theory: [
      "Maintain [L, R] as the current window, R scanning 0..n-1. After including A[R], while the window violates the constraint, advance L and undo A[L]'s contribution. Every index enters and leaves at most once, so the whole pass is O(n) times the update cost. The answer is usually the max R-L+1 you saw while valid, or the min R-L+1 you saw when valid, depending on the problem.",
      "Two twin templates: (1) longest window with at most K (grow R, shrink until at most K, record length); (2) shortest window with at least K (grow R, shrink while still at least K, record length). Mixing them up produces off-by-one answers that look almost right.",
      "The hidden assumption is that if [L, R] is invalid, then [L-1, R] is also invalid (for 'at most' problems you shrink from a valid-breaking state; for 'at least' you only shrink while remaining valid). If validity is not nested along the array — for example 'subarray whose XOR is exactly T' — a window may skip a valid interior and you need prefix XOR plus a hash map instead.",
    ],
    howItWorks: [
      "Initialize L = 0 and an empty aggregate (count map, sum, zero-count).",
      "For R from 0 to n-1, include A[R] in the aggregate.",
      "While the window is invalid (or, for shortest-valid, while it is still valid and can shrink), exclude A[L] and L++.",
      "Update the answer from the current [L, R] according to the template (max length if valid, min length if you just finished shrinking a valid window).",
      "Return 0 or -1 if no window ever satisfied the constraint.",
    ],
    whenToUse: [
      "Contiguous subarray/substring with a monotonic constraint: at most / at least k distinct, sum, replacements, zeros.",
      "You want the longest or shortest such segment in O(n).",
    ],
    whenNotToUse: [
      "The constraint is an exact match that is not monotonic (exact sum T on arrays with negatives — use prefix + hashmap).",
      "Subsequences, not subarrays.",
      "Non-nested validity: shrinking can skip the only good window.",
    ],
    complexity: {
      time: "O(n) when each index enters/leaves once",
      space: "O(Σ) for frequency maps, else O(1)",
    },
    tradeoffs: [
      "Linear time and simple pointers versus a hard requirement that the constraint be monotonic in window size.",
    ],
    interviewTips: [
      "Classify the problem as 'longest at most' vs 'shortest at least' before coding. Write that on the board.",
      "Minimum window substring (every char of t must appear) is a 'shortest at least' with a debt counter — the standard hard.",
      "If the array has negatives and they ask for exact sum, refuse the window and go to prefix-hashmap.",
    ],
    pitfalls: [
      "Updating the answer while the window is invalid.",
      "Shrinking with `if` instead of `while`, so one oversized window slips through.",
      "Forgetting to decrement the frequency of the leaving char and poisoning later checks.",
    ],
    practiceIdeas: [
      "Longest substring without repeating characters.",
      "Minimum size subarray sum ≥ S (positives only).",
      "Longest ones after deleting/flipping at most k zeros; minimum window substring.",
    ],
    related: [
      "sliding-window-fixed",
      "two-pointers",
      "sliding-window-strings",
      "prefix-hashmap",
      "frequency-map",
    ],
  },
  {
    slug: "fast-slow-pointers",
    track: "dsa",
    category: "Pointers",
    title: "Fast and Slow Pointers",
    summary:
      "Advance one pointer twice as fast as the other on a linked structure. They meet on a cycle; the slow pointer is at the middle when the fast hits the end.",
    depth: "core",
    whyItMatters:
      "The Floyd cycle algorithm and 'middle of the list' are the two linked-list interviews you will get. Fast-slow (tortoise and hare) solves both without a length counter or extra memory. Interviewers like it because the code is short and the proof is not obvious: why they meet, why resetting one pointer to the head finds the cycle entrance, why slow is at the middle. If you only memorize the snippet, the follow-up will catch you.",
    theory: [
      "On a list, slow moves one step, fast moves two. If there is no cycle, fast hits null first. If there is a cycle, fast laps slow inside the ring. Treat the cycle as a clock: the gap between them decreases by one each step, so they meet. That is cycle detection in O(n) time and O(1) space — better than a visited set when you cannot mark nodes.",
      "Cycle entrance: after they meet, put one pointer back at the head and walk both at speed one. They meet at the start of the cycle. Proof sketch: if the head-to-cycle distance is μ and they met at offset k inside a cycle of length λ, the meeting time satisfies a linear congruence that makes μ ≡ remaining distance to the entrance. You do not need to recite the algebra, but you should be able to draw μ and λ.",
      "Middle node: when fast reaches the end, slow is at n/2. For even n, the problem statement chooses the first or second middle — whether you check `fast` or `fast.next` in the loop condition flips which one you get. nth-from-end is the same idea with a k-gap: advance fast k steps, then walk both until fast ends; slow is the answer (or its predecessor if you need to delete).",
    ],
    howItWorks: [
      "Detection: init slow = fast = head. While fast and fast.next exist, slow = slow.next, fast = fast.next.next. If they become equal, there is a cycle.",
      "Entrance: after a meet, set ptr = head. While ptr !== slow, ptr = ptr.next, slow = slow.next. Return ptr.",
      "Middle: while fast && fast.next, advance both. Return slow.",
      "nth from end: walk fast n steps (handle shorter lists). Then walk both until fast is null.",
    ],
    whenToUse: [
      "Cycle detection / entrance in a linked list or a functional graph (each node has outdegree 1, e.g. happy number).",
      "Middle of a list, palindrome list (reverse second half from the middle).",
      "nth node from the end without a first length pass if you like one-pass style.",
    ],
    whenNotToUse: [
      "You may mark nodes or use O(n) memory and the problem is not about O(1) space.",
      "Graphs with branching — fast-slow assumes a single next pointer (or a function f(x)).",
      "Arrays where you already have indices; just use i and n-1-i or a midpoint formula.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1)",
      notes: "On a cycle of length λ with stem μ, detection is O(μ + λ).",
    },
    interviewTips: [
      "For happy number, the 'next' function is sum of squares of digits. Same algorithm, no list.",
      "Palindrome linked list: find middle, reverse the second half, compare, optionally restore.",
      "Draw a 3-node cycle with a 2-node stem if they ask why the entrance trick works.",
    ],
    pitfalls: [
      "Not checking fast.next before fast.next.next — null pointer on even lists.",
      "Starting fast one step ahead and then using the wrong meet condition for the entrance phase.",
      "On even-length lists, returning the wrong middle relative to the spec.",
    ],
    practiceIdeas: [
      "Linked List Cycle I and II (entrance).",
      "Middle of the linked list; delete nth from end in one pass.",
      "Happy Number; find the duplicate number in 1..n (cycle in a functional graph).",
    ],
    related: [
      "floyd-cycle",
      "middle-of-list",
      "nth-from-end",
      "reverse-linked-list",
      "bfs",
    ],
  },
];
