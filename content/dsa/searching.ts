import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "linear-search",
    track: "dsa",
    category: "Searching",
    title: "Linear Search",
    summary:
      "Scan every element in order until you find the target or exhaust the collection. The baseline every other search is measured against.",
    depth: "core",
    whyItMatters:
      "Linear search is the algorithm you already do by eye: start at the front, check each item. Interviews rarely ask you to code it alone, but they expect you to know when it is the right tool — unsorted data, one-shot lookups, or streams you cannot index. More importantly, it is the mental default you must beat. If a problem looks like 'find X in a list,' your first question is whether the input is sorted or structured enough to do better than O(n).",
    theory: [
      "Given an array A of n elements and a target t, linear search examines A[0], A[1], … until A[i] === t or i reaches n. The algorithm makes no assumptions about order, uniqueness, or element type beyond equality. That lack of assumptions is its strength: it works on linked lists, generators, and unsorted arrays alike.",
      "Best case is the target at index 0 (one comparison). Worst case is a miss or a hit at the last index (n comparisons). Average case on a uniformly random present target is n/2 comparisons. Those constants matter when you compare it to binary search: for n = 16, linear search is often faster in practice because of branch prediction and cache locality. For n = 10^6, it is not.",
      "Variants show up constantly. You may return the first match, the last match, every index, or a count. You may search for a predicate ('first even number') instead of a value. Sentinel search places t at the end so the loop only checks equality, not bounds — a micro-optimization, not an interview win, but it illustrates how you trade a write for fewer branches.",
    ],
    howItWorks: [
      "Walk index i from 0 to n - 1.",
      "If A[i] equals the target (or satisfies the predicate), return i immediately.",
      "If the loop finishes, return a miss sentinel such as -1.",
      "For 'last occurrence,' keep scanning and remember the latest hit instead of returning early.",
      "For streams or iterators, replace the index with a sequential consume — same algorithm, no random access.",
    ],
    whenToUse: [
      "The collection is unsorted and you will not search it again.",
      "n is tiny (dozens of elements) and a sort or tree would cost more.",
      "You only have sequential access: linked lists, files, network streams.",
      "You need the first element matching a predicate with no better index.",
    ],
    whenNotToUse: [
      "The array is sorted — binary search is the default.",
      "You will query many times; build a hash set or tree once.",
      "You need sublinear time and can afford preprocessing.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1)",
      notes: "Average n/2 comparisons when the target is present and uniformly placed.",
    },
    tradeoffs: [
      "Zero preprocessing and zero extra memory versus no asymptotic speedup.",
      "Works on any equality-comparable sequence; cannot exploit order.",
    ],
    interviewTips: [
      "State the assumption: 'If this is unsorted I scan; if it is sorted I binary search.' That sentence is half the question.",
      "Ask whether you need the first, last, or any occurrence — the loop changes.",
      "If they then say 'do it faster,' they want binary search, a hash, or a prebuilt index — not a cleverer scan.",
    ],
    pitfalls: [
      "Off-by-one on empty arrays: the loop should simply not run and return miss.",
      "Returning the first match when the problem asked for the last (or vice versa).",
      "Scanning a linked list with an index mental model and then asking for A[i] — you do not have random access.",
    ],
    practiceIdeas: [
      "Find the first even number in an unsorted array; return -1 if none.",
      "Count occurrences of a value without extra space.",
      "Search a singly linked list for a node by value and return the previous pointer (needed for deletion).",
    ],
    related: [
      "binary-search",
      "interpolation-search",
      "exponential-search",
      "two-pointers",
    ],
  },
  {
    slug: "binary-search",
    track: "dsa",
    category: "Searching",
    title: "Binary Search",
    summary:
      "Halve a sorted search space each step until you land on the target. The interview primitive behind almost every 'log n' answer.",
    depth: "core",
    whyItMatters:
      "Binary search is the most common 'can you actually code' interview question that looks trivial and then eats twenty minutes. Interviewers are not testing whether you remember the name. They are testing whether you can keep an invariant, pick the right mid, and not infinite-loop when the window shrinks to one element. Once you own the template, a huge family of problems — first/last occurrence, rotated arrays, capacity problems, 'minimum k such that P(k)' — become the same loop with a different predicate.",
    theory: [
      "The invariant is the entire algorithm: everything you want lives in the half-open or closed range you still consider. For a classic closed range [lo, hi] on a non-decreasing array, if A[mid] < t then the answer (if it exists) is in [mid + 1, hi]. If A[mid] > t it is in [lo, mid - 1]. If equal, you found it. Each step throws away half the remaining indices, so you get floor(log2 n) + 1 comparisons.",
      "The algorithm is only correct if the search space is monotonic with respect to your test. Sorted arrays are the obvious case: 'is A[i] >= t?' flips from false to true once and stays true. That same idea generalizes. If you can define a boolean P(x) that is false for a prefix of the domain and true afterward (or the reverse), you can binary search the domain of x even when x is not an array index — it might be a speed, a cutoff, or a number of days.",
      "Implementation details are where people fail. Mid should be lo + ((hi - lo) >> 1) to avoid overflow in languages with fixed integers (Java/C++). In JavaScript/TypeScript the overflow is not the issue; the infinite loop is. If you write hi = mid and also lo = mid when the window is two elements, mid can stay equal to lo forever. The rule is: at least one bound must move past mid on every iteration, and your exit condition must match the invariant you chose.",
      "Recursive binary search is pedagogically clean and uses O(log n) stack space. Iterative is what you should write in an interview unless the problem is naturally recursive. Both share the same invariant; only the call stack changes.",
    ],
    howItWorks: [
      "Confirm the array is sorted (or that your predicate is monotonic). State this out loud.",
      "Set lo = 0, hi = n - 1 (closed range) or hi = n (half-open). Pick one style and stick to it.",
      "While the window is non-empty, compute mid = lo + Math.floor((hi - lo) / 2).",
      "Compare A[mid] to the target. Shrink to the half that can still contain the answer, moving a bound past mid.",
      "When the loop ends, either you returned a hit inside the loop, or lo/hi points at the insertion position — know which.",
    ],
    whenToUse: [
      "Random-access sorted data and you need a single lookup in O(log n).",
      "You can define a monotonic predicate over a numeric range (binary search on answer).",
      "The cost of one comparison or one feasibility check is high, so fewer checks matter.",
    ],
    whenNotToUse: [
      "The data is unsorted and you cannot sort it (sorting is O(n log n) plus you lose original indices unless you pair them).",
      "You need many inserts and lookups; a balanced BST or hash table is the data structure, not a one-shot search.",
      "n is tiny and linear search is simpler and cache-friendlier.",
    ],
    complexity: {
      time: "O(log n)",
      space: "O(1) iterative, O(log n) recursive",
      notes: "Requires random access. Linked lists make binary search O(n) because mid is expensive.",
    },
    tradeoffs: [
      "Logarithmic probes versus the strict requirement of sorted (or monotonic) input.",
      "Iterative O(1) extra space versus recursive clarity.",
    ],
    interviewTips: [
      "Write the invariant in a comment: 'A[0..lo) < t and A[hi+1..n) >= t' — then the loop writes itself.",
      "Dry-run n = 1, n = 2, target smaller than all, target larger than all, and a duplicate run. Those five cases catch most bugs.",
      "If they ask 'what if the array is rotated?' do not invent a new algorithm from scratch — see search-rotated-array.",
    ],
    pitfalls: [
      "Infinite loop from lo = mid when mid === lo on a two-element window.",
      "Using (lo + hi) >> 1 in languages where lo + hi overflows.",
      "Assuming uniqueness; classic binary search returns any match, not the first.",
      "Binary searching a list that is 'almost sorted' without proving monotonicity — wrong answers look confident.",
    ],
    practiceIdeas: [
      "Implement lower_bound and upper_bound on a sorted number array.",
      "Search a sorted array of unknown length (you only have a get(i) that throws past the end) — combine exponential search then binary search.",
      "Count how many times a value appears in a sorted array in O(log n).",
    ],
    related: [
      "linear-search",
      "binary-search-bounds",
      "search-rotated-array",
      "binary-search-on-answer",
      "peak-finding",
      "ternary-search",
    ],
  },
  {
    slug: "binary-search-bounds",
    track: "dsa",
    category: "Searching",
    title: "First and Last Occurrence",
    summary:
      "Two binary searches (lower and upper bound) that pin the leftmost and rightmost index of a target in a sorted array with duplicates.",
    depth: "next",
    whyItMatters:
      "The first follow-up after vanilla binary search is almost always 'the array has duplicates — find the first / last / count.' If your loop returns the first mid that equals the target, you have a random occurrence, not a bound. Interviewers use this to see whether you can bias the search left or right without breaking the invariant. The same template is lower_bound / upper_bound in C++ and the backbone of 'number of elements in [L, R].'",
    theory: [
      "Lower bound is the first index i where A[i] >= t. Upper bound is the first index i where A[i] > t. The last occurrence of t is then upper_bound - 1, provided that index still equals t. Count of t is upper_bound - lower_bound. You do not need a third scan.",
      "To bias left (first occurrence), when A[mid] === t you do not return. You treat it as 'too far right' and set hi = mid - 1 (closed) or hi = mid (half-open), but you record mid as a candidate. To bias right, set lo = mid + 1 and record mid. The search continues until the window collapses; the last recorded candidate is the extreme index.",
      "A cleaner mental model: do not special-case equality at all. Search for the boundary between false and true of a predicate. First occurrence of t is the first index where A[i] >= t, then check A[i] === t. Last occurrence is the last index where A[i] <= t. One predicate, one loop shape, two call sites.",
    ],
    howItWorks: [
      "Write a lowerBound(t): while lo < hi, mid = floor((lo+hi)/2); if A[mid] < t then lo = mid + 1 else hi = mid. Return lo.",
      "Write an upperBound(t): same loop but the test is A[mid] <= t then lo = mid + 1 else hi = mid.",
      "First index is lowerBound(t); accept it only if it is in range and A[i] === t.",
      "Last index is upperBound(t) - 1; same validation.",
      "Count is upperBound(t) - lowerBound(t), which is 0 on a miss.",
    ],
    whenToUse: [
      "Sorted arrays with duplicates where you need a range, not a single hit.",
      "Counting elements in [L, R] on a sorted array in O(log n).",
      "Finding insertion points so a later insert keeps the array sorted.",
    ],
    whenNotToUse: [
      "Unsorted data — bounds are meaningless without order.",
      "You only need any occurrence; vanilla binary search is enough.",
    ],
    complexity: {
      time: "O(log n)",
      space: "O(1)",
      notes: "Two independent binary searches, still logarithmic.",
    },
    interviewTips: [
      "Name the functions lowerBound and upperBound in the interview. It signals you know the standard library, not a one-off hack.",
      "If they ask for both ends, run two searches — do not try to find one hit and then linear-scan outward (that is O(n) on an array of all duplicates).",
    ],
    pitfalls: [
      "Returning mid on equality and calling it 'first occurrence.'",
      "Forgetting to validate that the bound actually equals t (lower_bound of 5 in [1,2,3] is 3, which is not a hit).",
      "Off-by-one on last index: upper_bound - 1 can be -1 when t is smaller than every element.",
    ],
    practiceIdeas: [
      "LeetCode-style 'Find First and Last Position of Element in Sorted Array.'",
      "Count elements <= x after each online query on a static sorted array.",
      "Given a sorted array of start times, how many meetings started in [L, R]?",
    ],
    related: [
      "binary-search",
      "search-rotated-array",
      "binary-search-on-answer",
      "prefix-sum",
    ],
  },
  {
    slug: "peak-finding",
    track: "dsa",
    category: "Searching",
    title: "Peak Finding",
    summary:
      "Binary-search a bitonic or unsorted array for an index that is greater than its neighbors. The comparison at mid tells you which side still has a peak.",
    depth: "next",
    whyItMatters:
      "Peak finding is the interviewer's favorite 'binary search without a sorted array' problem. It trains you to binary search a guarantee, not a sort. Any array of numbers has at least one peak if you treat ends as lower than their one neighbor. That existence proof is what lets you discard half the array: if mid is on an uphill slope, a peak exists to the right; downhill, to the left.",
    theory: [
      "A peak is an index i with A[i] >= A[i-1] and A[i] >= A[i+1] (or only one neighbor at the ends). In a strictly bitonic array that rises then falls, the peak is unique and is the maximum. In a general array there may be many peaks; the problem usually accepts any one.",
      "Why binary search works without global sortedness: consider mid. If A[mid] < A[mid+1], the sequence is locally increasing. Walk right from mid and you either keep increasing until the end (the last element is a peak) or you eventually go down (the last ascent is a peak). So a peak exists in [mid+1, n). The decreasing case is symmetric. You never claim mid is the global max — only that the remaining half still contains some peak.",
      "2D peak finding (a cell greater than its four neighbors) uses a similar discard: pick the global max of the middle column, look left/right at its horizontal neighbors, and recurse into the half that has a larger neighbor. That is O(n log n) on an n×n grid and is a common follow-up for strong candidates.",
    ],
    howItWorks: [
      "Handle n = 1 (index 0) and check the two ends if you want an early return.",
      "While lo < hi, set mid = floor((lo+hi)/2).",
      "If A[mid] < A[mid+1], set lo = mid + 1 (a peak exists on the rising side).",
      "Else set hi = mid (mid itself may be a peak, so do not skip it).",
      "Return lo (or hi); they meet at a peak.",
    ],
    whenToUse: [
      "Bitonic arrays: find the maximum in O(log n).",
      "Unsorted arrays when any local maximum is acceptable.",
      "2D 'find a peak element' follow-ups.",
    ],
    whenNotToUse: [
      "You need the global maximum of an arbitrary unsorted array — that is still a linear scan.",
      "The comparator is not a simple neighbor comparison (e.g. you need a value equal to a target).",
    ],
    complexity: {
      time: "O(log n) in 1D, O(n log n) typical 2D",
      space: "O(1) iterative 1D",
    },
    interviewTips: [
      "Draw a 5-element up-down array and narrate why the slope at mid discards a half. That picture is the interview.",
      "Ask whether any peak is fine or they want the global max. Those are different problems.",
    ],
    pitfalls: [
      "Comparing A[mid] to the target instead of to A[mid+1]. There is no target.",
      "Setting hi = mid - 1 when A[mid] > A[mid+1], which can throw away the only peak.",
      "Forgetting end-of-array neighbors: define A[-1] and A[n] as -∞ if the problem uses that convention.",
    ],
    practiceIdeas: [
      "Find a peak in a 1D array (LeetCode 162).",
      "Find the peak of a bitonic array, then binary-search left (asc) or right (desc) for a target.",
      "2D peak on a matrix.",
    ],
    related: [
      "binary-search",
      "binary-search-on-answer",
      "ternary-search",
      "search-rotated-array",
    ],
  },
  {
    slug: "search-rotated-array",
    track: "dsa",
    category: "Searching",
    title: "Search in Rotated Sorted Array",
    summary:
      "One binary search on an array that was sorted then rotated. At every mid, exactly one half is still strictly sorted — search there or discard it.",
    depth: "core",
    whyItMatters:
      "This is a staple FAANG medium. It checks whether you can maintain a binary-search invariant when the array is only piecewise sorted. People who memorize 'find the pivot then search' often fumble the pivot. The cleaner interview solution never finds the pivot explicitly: each step identifies the sorted half in O(1) and decides whether the target lives there.",
    theory: [
      "A rotation of a sorted array looks like [4,5,6,7,0,1,2]. There is one descending 'seam.' For any mid, either A[lo..mid] is sorted or A[mid..hi] is sorted (or both, if there is no rotation). Compare A[lo] and A[mid] (or A[mid] and A[hi]) to learn which half is contiguous and increasing.",
      "If the left half is sorted and t is in [A[lo], A[mid]], shrink to the left; otherwise shrink to the right. Symmetric for a sorted right half. Equality to A[mid] is a hit. This is still O(log n) because you always discard a half.",
      "Duplicates (the hard follow-up) break the test: A[lo] === A[mid] === A[hi] tells you nothing about which half is sorted. The safe move is to increment lo or decrement hi by one and continue, which degrades to O(n) in the worst case (all equal except one). State that tradeoff; do not pretend you still have a log n guarantee.",
    ],
    howItWorks: [
      "lo = 0, hi = n - 1. While lo <= hi, mid = floor((lo+hi)/2).",
      "If A[mid] === t, return mid.",
      "If A[lo] <= A[mid], the left half is sorted. If A[lo] <= t && t < A[mid], hi = mid - 1; else lo = mid + 1.",
      "Otherwise the right half is sorted. If A[mid] < t && t <= A[hi], lo = mid + 1; else hi = mid - 1.",
      "With duplicates, when A[lo] === A[mid], do lo++ (or the symmetric hi--) and continue.",
    ],
    whenToUse: [
      "Sorted arrays that were rotated (circularly shifted) any number of times.",
      "Finding the rotation index / minimum in a rotated array — same idea, no target.",
    ],
    whenNotToUse: [
      "Fully unsorted arrays.",
      "Arrays rotated and then mutated; the piecewise-sorted property is gone.",
    ],
    complexity: {
      time: "O(log n) distinct elements; O(n) with adversarial duplicates",
      space: "O(1)",
    },
    tradeoffs: [
      "One-pass binary search versus two-pass (find min, then vanilla binary search on the correct side). Same complexity; one-pass is fewer moving parts if you get the conditions right.",
    ],
    interviewTips: [
      "Say 'one of the two halves is sorted' before you write a line. Then write the four-branch decision.",
      "The minimum-in-rotated-array problem is the same loop without a target: always go into the unsorted half (that is where the seam is).",
      "If they add duplicates, immediately mention the O(n) worst case.",
    ],
    pitfalls: [
      "Using < instead of <= when deciding whether the left half is sorted — fails when mid === lo.",
      "Forgetting t can equal A[lo] or A[hi]; the inclusive bounds on the sorted half matter.",
      "Finding the pivot with a buggy loop, then binary searching the wrong slice.",
    ],
    practiceIdeas: [
      "Search a rotated array with distinct values.",
      "Search a rotated array with duplicates (return boolean).",
      "Find the minimum in a rotated sorted array, with and without duplicates.",
    ],
    related: [
      "binary-search",
      "binary-search-bounds",
      "peak-finding",
      "binary-search-on-answer",
    ],
  },
  {
    slug: "binary-search-on-answer",
    track: "dsa",
    category: "Searching",
    title: "Binary Search on the Answer",
    summary:
      "Binary search the value of the answer itself when feasibility is monotonic: if k works, k+1 also works (or the reverse).",
    depth: "next",
    whyItMatters:
      "This is the pattern that turns 'greedy simulation' problems into log × check solutions. Koko eating bananas, split array largest sum, capacity to ship packages, minimize max distance to gas stations — they all share one shape. Interviewers love it because you must prove monotonicity, pick a numeric range, and write a correct feasibility predicate. Candidates who only know array binary search freeze when there is no array to index.",
    theory: [
      "You are looking for the smallest k in [lo, hi] such that P(k) is true, and you know P is monotonic: false, false, …, true, true. Binary search finds the first true. If you need the largest k where P(k) is true, search the last true. The array disappeared; the domain is the possible answers.",
      "The work is in P. P(k) usually simulates the constraint: 'can we finish in h hours if the eat speed is k?' or 'can we split into m subarrays each summing to at most k?' P must be O(n) or better or the whole algorithm misses the complexity target. P must also be careful with off-by-ones — using k versus k-1 is the usual bug.",
      "Choosing [lo, hi] is part of the proof. lo is the minimum conceivable answer (often max(single item) or 1). hi is a trivial feasible answer (sum of all, or max × n). If your range excludes the real answer, the search is wrong no matter how pretty the loop is.",
      "This is not ternary search. You are not optimizing a unimodal real function by comparing two mids. You have a boolean cutoff. Do not introduce a second mid.",
    ],
    howItWorks: [
      "Identify the quantity you would binary search — usually 'minimum max' or 'maximum min.'",
      "Prove: if a candidate k is feasible, every k' > k is feasible (or the opposite). If you cannot prove this, stop.",
      "Set lo to the smallest possible answer, hi to a known feasible (or infeasible) extreme.",
      "While lo < hi, mid = floor((lo+hi)/2). If P(mid) then hi = mid else lo = mid + 1.",
      "Return lo. Dry-run a tiny example to confirm you landed on the first feasible k.",
    ],
    whenToUse: [
      "Minimize the maximum load, time, or distance subject to a count constraint.",
      "Maximize the minimum gap or allocation.",
      "The naive search over k is linear in a huge numeric range (10^9) but each check is cheap.",
    ],
    whenNotToUse: [
      "P is not monotonic — a medium k fails while a smaller k succeeds. Then this search is incorrect, not just slow.",
      "The answer lives in a combinatorial space you cannot linearly order.",
    ],
    complexity: {
      time: "O(T log R) where T is the feasibility check and R is the numeric range",
      space: "O(1) plus whatever P uses",
      notes: "R is often 10^9, so log R ≈ 30. The check dominates.",
    },
    tradeoffs: [
      "Simple loop plus a simulation versus a custom greedy or DP that might be O(n) but harder to invent.",
      "Integer domains are exact; real-valued answers need an epsilon and a fixed iteration count.",
    ],
    interviewTips: [
      "Write P first and test it on a fixed k. Then wrap the binary search. Interviewers can follow that.",
      "Say the monotonic sentence out loud: 'If I can ship with capacity 10 I can ship with 11.'",
      "For real numbers, iterate 60–80 times or while hi - lo > 1e-6; do not depend on exact equality.",
    ],
    pitfalls: [
      "Using lo + 1 < hi and then returning the wrong of lo/hi.",
      "A P that uses mid as exclusive when the problem is inclusive, shifting the cutoff by one.",
      "Setting hi too small (sum overflow, or max instead of sum) so the true answer is outside the range.",
    ],
    practiceIdeas: [
      "Koko Eating Bananas / capacity to ship packages within D days.",
      "Split array largest sum (minimize the max subarray sum given m cuts).",
      "Aggressive cows / magnetic force between balls (maximize minimum distance).",
    ],
    related: [
      "binary-search",
      "ternary-search",
      "jump-game",
      "interval-scheduling",
    ],
  },
  {
    slug: "ternary-search",
    track: "dsa",
    category: "Searching",
    title: "Ternary Search",
    summary:
      "Trisect a unimodal function and discard a third each time. Use it for finding a min or max on a mountain-shaped real or discrete domain.",
    depth: "advanced",
    whyItMatters:
      "Ternary search shows up in competitive programming and in the occasional interview that wants a unimodal optimization, not a boolean cutoff. If you try binary search on a function that goes down then up, there is no single predicate P that stays false then true. Ternary search is the tool for 'find the integer k that minimizes cost(k) when cost decreases then increases.' Knowing when not to use it — most interview 'search' problems are binary — is as important as coding it.",
    theory: [
      "A function f is unimodal if there is a single peak (or valley): it strictly increases then strictly decreases, or the reverse. Pick two mids, m1 and m2, that split [lo, hi] into three parts. If you seek a maximum and f(m1) < f(m2), the peak cannot lie in [lo, m1] because the function is still rising at m1 relative to m2, so you can set lo = m1. The symmetric argument discards [m2, hi] when f(m1) > f(m2).",
      "On integers the loop must shrink the range by at least one each step and stop when hi - lo is small (0, 1, or 2), then brute the remaining points. On reals you iterate a fixed number of times (≈80) or until hi - lo < ε. Comparing floating f values needs care; prefer more iterations over a tight epsilon if the function is cheap.",
      "Ternary search is not faster than binary search in the comparison model for arrays: you still spend Θ(log n) probes, and binary search with a derivative or slope often uses fewer. Its value is the unimodal setting where a boolean predicate does not exist. If f is not unimodal, ternary search can converge to a local extremum or miss entirely.",
    ],
    howItWorks: [
      "Confirm unimodality — draw f or argue from the problem (e.g. abs-linear cost, or a sum of distances on a line).",
      "While hi - lo > 2 (discrete), set m1 = lo + floor((hi-lo)/3), m2 = hi - floor((hi-lo)/3).",
      "If seeking a minimum: if f(m1) > f(m2) then lo = m1; else hi = m2. (Do not discard m1/m2 if they might be the min — keep them in range or evaluate at the end.)",
      "When the window is tiny, compute f at every remaining integer and return the best.",
      "For reals, repeat a fixed iteration count and return (lo+hi)/2.",
    ],
    whenToUse: [
      "Unimodal cost over an integer or real parameter (optimal meeting point on a line, ternary over a bitonic array).",
      "Problems that ask for an argmin k of a convex-looking discrete function you can evaluate.",
    ],
    whenNotToUse: [
      "Monotonic predicates — use binary search on the answer. It is simpler and less error-prone.",
      "Functions with multiple local minima; ternary search has no global guarantee.",
      "Sorted array lookup. That is binary search.",
    ],
    complexity: {
      time: "O(log n) evaluations of f (log base 3/2, same class as binary)",
      space: "O(1)",
    },
    tradeoffs: [
      "Handles unimodal optimization that binary search cannot, at the cost of two evaluations per step and a fiddlier discrete ending.",
    ],
    interviewTips: [
      "If the interviewer says 'the error first decreases then increases,' propose ternary search and sketch the discard.",
      "On integer domains, say you will ternary down to a handful of points and scan them. That avoids off-by-one fights.",
    ],
    pitfalls: [
      "Using ternary search on a monotonic boolean — it works but is the wrong abstraction and confuses the interviewer.",
      "Discarding m1 when f(m1) could still be the unique minimum.",
      "Assuming unimodality because the sample looks mountain-shaped. One counterexample kills correctness.",
    ],
    practiceIdeas: [
      "Minimize sum of distances to points on a line (median is better — use that to discuss when ternary is unnecessary).",
      "Find the maximum of a bitonic array via ternary search and compare to peak-finding.",
      "Discrete convex cost: choose an integer production quantity that minimizes a given cost(k).",
    ],
    related: [
      "binary-search",
      "binary-search-on-answer",
      "peak-finding",
      "interpolation-search",
    ],
  },
  {
    slug: "interpolation-search",
    track: "dsa",
    category: "Searching",
    title: "Interpolation Search",
    summary:
      "Guess the probe index by assuming values are uniform between lo and hi, like looking up a name in a phone book by its first letter.",
    depth: "advanced",
    whyItMatters:
      "Interpolation search is the 'how would you search a phone book' answer taken literally. Interviews almost never require you to implement it, but they do ask how binary search can be improved when values are uniformly distributed. The answer is: estimate the position with a linear interpolation instead of always picking mid. You should also know the failure mode — adversarial or skewed data makes it O(n).",
    theory: [
      "Binary search always probes the middle index. If A is sorted and values are roughly uniform, the target t is probably closer to lo when t is close to A[lo]. The probe is pos = lo + (t - A[lo]) * (hi - lo) / (A[hi] - A[lo]). That is the linear interpolant of the index as a function of value.",
      "On uniformly distributed sorted data the expected comparisons drop to O(log log n), which is why databases and some interpolation-friendly indexes mention it. The algorithm still requires random access and a sorted numeric (or otherwise interpolable) key.",
      "Worst case is linear. If the array is exponentially increasing (1, 2, 4, …, 2^n) and you always search for a value near the high end, the interpolated position hugs lo and you creep forward like a broken linear search. Production code therefore falls back to binary search after a few unhelpful probes, or uses interpolation only as a first guess.",
    ],
    howItWorks: [
      "Require a sorted array of numeric keys. Set lo = 0, hi = n - 1.",
      "While lo <= hi and t is between A[lo] and A[hi], compute pos by interpolation. Clamp pos into [lo, hi].",
      "If A[pos] === t return pos. If A[pos] < t set lo = pos + 1; else hi = pos - 1.",
      "If A[hi] === A[lo], interpolation divides by zero — handle as a single-value range.",
      "If the window stops shrinking, switch to binary or linear search.",
    ],
    whenToUse: [
      "Large, uniformly distributed, sorted numeric keys with random access.",
      "Explaining a possible optimization over binary search when the interviewer asks about distribution.",
    ],
    whenNotToUse: [
      "Skewed, exponential, or adversarial key distributions.",
      "Non-numeric keys you cannot interpolate (strings need an order-preserving map).",
      "Tiny n, where the interpolation arithmetic costs more than a scan.",
    ],
    complexity: {
      time: "O(log log n) expected on uniform data; O(n) worst case",
      space: "O(1)",
    },
    tradeoffs: [
      "Faster expected probes on uniform data versus a fragile worst case and extra arithmetic.",
    ],
    interviewTips: [
      "Lead with the phone-book analogy, write the interpolation formula, then immediately state the O(n) worst case.",
      "If they want a guaranteed log n, stay with binary search.",
    ],
    pitfalls: [
      "Division by zero when A[hi] === A[lo].",
      "pos computed as a float and then used without clamping — out-of-range probes.",
      "Applying interpolation to unsorted data. The formula assumes order.",
    ],
    practiceIdeas: [
      "Implement interpolation search and compare probe counts to binary search on uniform random sorted arrays.",
      "Build an adversarial increasing array that forces near-linear probes.",
      "Combine with exponential search: interpolate inside a bounded window you already found.",
    ],
    related: [
      "binary-search",
      "exponential-search",
      "linear-search",
      "ternary-search",
    ],
  },
  {
    slug: "exponential-search",
    track: "dsa",
    category: "Searching",
    title: "Exponential Search",
    summary:
      "Jump 1, 2, 4, … until you pass the target, then binary search the last doubling window. Ideal for unbounded or infinite sorted streams.",
    depth: "advanced",
    whyItMatters:
      "Exponential search (also called doubling or galloping search) is the right answer when the array is sorted but you do not know n — or n is huge and the target is near the front. Interview variants: 'sorted array of unknown size,' 'API get(i) throws if i is out of range,' and galloping in Timsort's merge. You demonstrate that you can find a bounding window in O(log p) where p is the answer index, then finish with ordinary binary search.",
    theory: [
      "Start at index 1 (or 0). While the index is in range and A[i] < t, double i. When you stop, the target — if present — lies in (i/2, i]. Binary search that slice. If the target's true index is p, you doubled O(log p) times and then binary searched a window of size O(p), which is another O(log p). Total O(log p), which is better than O(log n) when p ≪ n.",
      "On a finite array you clamp i to n - 1 and treat an out-of-range probe as 'too big.' That is how you search a sorted list whose length is hidden behind an exception-throwing getter.",
      "Galloping merge in Timsort uses the same idea: when one run keeps winning, you exponentially search the other run for the next insertion point instead of comparing element-by-element. That is why understanding exponential search pays off beyond the one interview question.",
    ],
    howItWorks: [
      "If the first element equals t, return 0. If the array is empty, miss.",
      "Set bound = 1. While bound < n and A[bound] < t, set bound *= 2.",
      "Binary search t in A[floor(bound/2) .. min(bound, n-1)].",
      "If get(i) can throw, wrap the probe in a try/catch or a length oracle and treat throw as 'past the end.'",
      "Return the binary-search result; it is a miss if t is absent from that window (and hence the whole array).",
    ],
    whenToUse: [
      "Sorted arrays of unknown or unbounded length.",
      "Targets expected to be near the start of a huge sorted array.",
      "Galloping through already-sorted runs during a merge.",
    ],
    whenNotToUse: [
      "You already know n and the target is uniformly anywhere — plain binary search is simpler and as good.",
      "Unsorted data.",
    ],
    complexity: {
      time: "O(log p) where p is the target index (O(log n) worst case)",
      space: "O(1)",
    },
    tradeoffs: [
      "Faster when the hit is early versus a more complex two-phase algorithm.",
    ],
    interviewTips: [
      "The 'unbounded sorted array' prompt is exponential search. Name it, then implement doubling + binary search.",
      "Handle the getter-throws-on-OOB API explicitly; that is usually the point of the question.",
    ],
    pitfalls: [
      "Forgetting to clamp the last bound to n - 1 and reading off the end.",
      "Binary searching [0, bound] instead of [bound/2, bound], wasting the information you already have.",
      "Integer overflow when doubling bound in fixed-width integers — cap at n.",
    ],
    practiceIdeas: [
      "Search a sorted array without using A.length; only a safeGet(i) that returns a sentinel past the end.",
      "Compare comparisons: exponential vs binary vs linear on targets at index 10, n/2, and n-1.",
      "Implement a galloping merge of two sorted runs.",
    ],
    related: [
      "binary-search",
      "interpolation-search",
      "linear-search",
      "merge-sort",
    ],
  },
];
