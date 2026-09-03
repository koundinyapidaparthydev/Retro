import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "bubble-sort",
    track: "dsa",
    category: "Sorting",
    title: "Bubble Sort",
    summary:
      "Repeatedly swap adjacent out-of-order pairs so the largest remaining element 'bubbles' to the end each pass.",
    depth: "core",
    whyItMatters:
      "Nobody ships bubble sort, but interviewers still use it as a warmup to see whether you can reason about adjacent swaps, loop invariants, and early exit. It is also the simplest place to prove that a swap-based sort is at best O(n²) if you only look at neighbors. Once you can explain why the last i elements are already finished after pass i, you are ready for insertion and selection.",
    theory: [
      "Each outer pass walks the unsorted prefix and swaps A[j] and A[j+1] whenever they are out of order. After the first pass the maximum is at index n-1. After the second pass the second maximum is at n-2. The invariant: A[n-i..n) is the i largest elements in final order. That lets you shorten the inner loop each time.",
      "A flag that tracks whether any swap occurred turns the best case into O(n): an already-sorted array makes one pass and stops. Without the flag, bubble sort always does n(n-1)/2 comparisons. That flag is the one implementation detail worth mentioning; it does not change the average or worst case.",
      "Cocktail shaker sort (bidirectional bubble) is a curiosity, not an interview target. What is worth knowing: adjacent-swap sorts perform a bubble-sort number of swaps equal to the number of inversions. That connects bubble sort to inversion counting and to why insertion sort is faster on nearly sorted data (it also pays per inversion, but with less data movement in practice).",
    ],
    howItWorks: [
      "For i from 0 to n-2, treat the end of the unsorted region as n-1-i.",
      "For j from 0 to n-2-i, if A[j] > A[j+1], swap them and mark that a swap happened.",
      "If a pass does zero swaps, the array is sorted — return.",
      "After i passes, do not touch the last i elements; they are already home.",
    ],
    whenToUse: [
      "Teaching adjacent swaps and loop invariants.",
      "Tiny nearly-sorted arrays where you want an in-place O(n) best case and no extra memory.",
    ],
    whenNotToUse: [
      "Any production n beyond a few dozen elements.",
      "When you need a guaranteed n log n sort — use merge, heap, or a library introsort.",
    ],
    complexity: {
      time: "O(n²) average and worst; O(n) best with a swap flag",
      space: "O(1)",
      notes: "Stable if you only swap on a strict greater-than.",
    },
    tradeoffs: [
      "Trivial and in-place versus quadratic comparisons and swaps.",
      "Stable and adaptive (with flag) versus being dominated by insertion sort on the same inputs.",
    ],
    interviewTips: [
      "Write the swap flag and state the invariant. That is the signal you understand it, not just the nested loops.",
      "If they ask you to count swaps, that count is the inversion count.",
    ],
    pitfalls: [
      "Inner loop running to n-1 after elements have already bubbled to the end — wasted work, still correct.",
      "Using >= and destroying stability (equal elements swap).",
      "Forgetting the early-exit flag and then claiming O(n) best case.",
    ],
    practiceIdeas: [
      "Sort and return the number of swaps (inversions).",
      "Implement cocktail shaker sort and compare pass counts on a reversed array.",
      "Prove on paper that after k passes the last k items are sorted.",
    ],
    related: [
      "selection-sort",
      "insertion-sort",
      "merge-sort",
      "cycle-sort",
    ],
  },
  {
    slug: "selection-sort",
    track: "dsa",
    category: "Sorting",
    title: "Selection Sort",
    summary:
      "For each index i, find the minimum of the suffix A[i..] and swap it into place. n swaps, always quadratic comparisons.",
    depth: "core",
    whyItMatters:
      "Selection sort is the algorithm people invent when they sort cards: 'find the smallest, put it first.' Interviews use it to check that you can maintain a growing sorted prefix and that you understand why fewer swaps do not mean a faster sort. It is also the contrast case for heap sort: heap sort is selection sort with a heap accelerating the 'find min' step from O(n) to O(log n).",
    theory: [
      "After i steps, A[0..i) holds the i smallest elements in sorted order. Step i scans A[i..n) for the minimum and swaps it with A[i]. The scan is Θ(n-i), so total comparisons are always n(n-1)/2. There is no best-case shortcut: you cannot know the min of a suffix without looking at all of it (in the comparison model, without extra structure).",
      "The algorithm does at most n-1 swaps. That is its only practical selling point — useful when writes are expensive (flash, EEPROM, some partial-order settings). Cycle sort pushes that idea further and is write-optimal.",
      "Selection sort is not stable in the usual swap implementation: the min swap can jump over equal keys. You can make it stable by inserting the min (shifting) instead of swapping, at which point you have reinvented a worse insertion sort.",
    ],
    howItWorks: [
      "For i from 0 to n-2:",
      "Set minIdx = i. For j from i+1 to n-1, if A[j] < A[minIdx], update minIdx.",
      "Swap A[i] and A[minIdx] if they differ.",
      "A[0..i] is now the final sorted prefix.",
    ],
    whenToUse: [
      "When writes are far more expensive than reads and n is small.",
      "As a conceptual stepping stone to heap sort.",
    ],
    whenNotToUse: [
      "General-purpose sorting. Insertion sort wins on small or nearly sorted data; n log n sorts win otherwise.",
      "When you need stability.",
    ],
    complexity: {
      time: "Θ(n²) comparisons always; O(n) swaps",
      space: "O(1)",
    },
    tradeoffs: [
      "Minimal writes versus no adaptivity and no stability.",
    ],
    interviewTips: [
      "Contrast with insertion sort: selection always scans the whole suffix; insertion stops when the hole finds its place.",
      "Say 'heap sort is this algorithm with a heap' if they ask how to speed up the min-find.",
    ],
    pitfalls: [
      "Starting the min scan at 0 instead of i and destroying the sorted prefix.",
      "Claiming O(n) time because there are O(n) swaps.",
      "Unstable swaps of equal keys when the problem required stability.",
    ],
    practiceIdeas: [
      "Count comparisons versus insertion sort on a sorted array and a reversed array.",
      "Implement a stable selection sort by shifting instead of swapping; measure extra writes.",
      "Sort an array of objects by a key and show a stability failure.",
    ],
    related: [
      "bubble-sort",
      "insertion-sort",
      "heap-sort",
      "cycle-sort",
    ],
  },
  {
    slug: "insertion-sort",
    track: "dsa",
    category: "Sorting",
    title: "Insertion Sort",
    summary:
      "Grow a sorted prefix by inserting A[i] leftward into its place. Fast on small and nearly sorted arrays; the inner loop of production sorts.",
    depth: "core",
    whyItMatters:
      "Insertion sort is the quadratic sort you should actually remember. Library sorts (Timsort, introsort) switch to it for small partitions because the constants crush merge and quick at n ≲ 32. Interviews ask you to sort a nearly-sorted stream, to insert into a sorted list, or to explain why adaptive sorts win. The inversion-count view also connects it to 'how far from sorted is this array?'",
    theory: [
      "Invariant: before step i, A[0..i) is sorted. Take key = A[i] and shift larger elements in the prefix one slot right until you find the hole where key belongs. The number of shifts for that key equals the number of inversions it participates in. Total time is O(n + I) where I is the inversion count — O(n) when the array is already sorted, O(n²) when it is reversed.",
      "Binary insertion sort binary-searches the insertion index in the prefix (O(log i)) but still shifts O(i) elements. Comparisons drop; moves do not. That is worthwhile only when comparisons are expensive (big objects, wide keys).",
      "On linked lists, insertion sort becomes a real candidate: splicing a node into a sorted prefix is O(1) once you found the spot, and you already paid O(n) to walk. For arrays, the shifts dominate.",
    ],
    howItWorks: [
      "For i from 1 to n-1, set key = A[i] and j = i - 1.",
      "While j >= 0 and A[j] > key, set A[j+1] = A[j] and j--.",
      "Write key into A[j+1].",
      "The prefix A[0..i] is now sorted.",
    ],
    whenToUse: [
      "n small (the cutoff inside Timsort / introsort).",
      "Nearly sorted data or online insertion into a short sorted buffer.",
      "Stable in-place sort when n is modest.",
    ],
    whenNotToUse: [
      "Large reversed or random arrays — use merge/quick/heap.",
      "When you need guaranteed n log n and cannot accept a quadratic worst case.",
    ],
    complexity: {
      time: "O(n + I) ≈ O(n) best, O(n²) average/worst",
      space: "O(1)",
      notes: "Stable. Adaptive.",
    },
    tradeoffs: [
      "Excellent constants and adaptivity versus quadratic worst case.",
      "Stable and in-place versus no way to exploit random access beyond shifting.",
    ],
    interviewTips: [
      "If the prompt says 'almost sorted' or 'k-sorted' (each element at most k from home), insertion sort is O(nk) and a heap of size k is O(n log k).",
      "Mention that production sorts use this as a base case. It shows you have seen real implementations.",
    ],
    pitfalls: [
      "Copying A[j] to A[j+1] without saving key, then losing A[i].",
      "Using >= in the shift condition and breaking stability.",
      "Binary-searching the hole and forgetting the shifts still cost O(n²).",
    ],
    practiceIdeas: [
      "Sort a k-sorted array and compare insertion sort vs a size-k min-heap.",
      "Count inversions by instrumenting the shift loop.",
      "Implement insertion sort on a singly linked list.",
    ],
    related: [
      "bubble-sort",
      "selection-sort",
      "merge-sort",
      "quick-sort",
      "cycle-sort",
    ],
  },
  {
    slug: "merge-sort",
    track: "dsa",
    category: "Sorting",
    title: "Merge Sort",
    summary:
      "Divide the array in half, sort each half, merge two sorted runs in linear time. Stable, guaranteed n log n, the interview divide-and-conquer sort.",
    depth: "core",
    whyItMatters:
      "Merge sort is the sorting algorithm interviews actually want you to write when they say 'sort this' and then follow up with 'now sort a linked list' or 'count inversions.' It is also the template for a family of divide-and-conquer problems: merge k lists, sort a stream with external memory, and any 'combine two sorted answers' recurrence. You must be fluent in both the recursive structure and the linear merge.",
    theory: [
      "T(n) = 2T(n/2) + Θ(n) solves to Θ(n log n) comparisons in every case. There is no worst-case surprise. The extra Θ(n) is the merge: walk two sorted runs with two pointers and emit the smaller head each time, then copy leftovers. That merge is stable if you take from the left run on ties.",
      "The algorithm is naturally stable and naturally suited to linked lists (no extra array; splice nodes) and to external sorting (runs on disk, k-way merge). The price on arrays is O(n) auxiliary memory. You can merge in place, but the in-place linear merge is not simple and is not an interview expectation.",
      "Bottom-up merge sort iterates width = 1, 2, 4, … and merges adjacent runs. Same complexity, no recursion stack, and it is what Timsort builds on (Timsort adds run detection, galloping, and insertion-sort base cases). If an interviewer asks for an iterative merge sort, this is it.",
    ],
    howItWorks: [
      "If the slice has 0 or 1 elements, it is sorted — return.",
      "Recursively sort A[lo..mid) and A[mid..hi).",
      "Allocate a temp buffer (or use a shared scratch array of length n).",
      "Two-pointer merge: take the smaller of the two heads; on equality take the left head for stability.",
      "Copy the merged run back into A[lo..hi), or merge directly into scratch and swap roles.",
    ],
    whenToUse: [
      "You need a stable guaranteed O(n log n) sort.",
      "Linked lists or external/streaming data where merge is the natural combine.",
      "Inversion counting, 'count of smaller elements after self,' and similar merge-time aggregates.",
    ],
    whenNotToUse: [
      "Tight memory: heap sort or in-place quicksort use O(1)/O(log n) extra space.",
      "Tiny n: insertion sort is faster.",
    ],
    complexity: {
      time: "Θ(n log n)",
      space: "O(n) array scratch; O(log n) recursion (O(1) extra for linked lists besides recursion)",
      notes: "Stable. Not adaptive unless you add run detection.",
    },
    tradeoffs: [
      "Predictable time and stability versus linear extra memory on arrays.",
      "Excellent sequential access (cache-friendly merge) versus more movement than a good quicksort on random data.",
    ],
    interviewTips: [
      "Allocate one scratch array of size n at the top and pass it down. Allocating inside every call is a common slow / messy version.",
      "If they ask to count inversions, add a counter when you take an element from the right run — each such take is a split inversion.",
      "For linked lists, do not convert to an array. Split with fast/slow pointers, recurse, merge with pointer rewiring.",
    ],
    pitfalls: [
      "Mid calculation and empty-half bugs when lo/hi are indices versus lengths.",
      "Forgetting leftover tails in the merge.",
      "Merging in the wrong order and losing stability.",
      "O(n) extra stack from a bad split (0 / n) — always split in half.",
    ],
    practiceIdeas: [
      "Count inversions while merging.",
      "Sort a singly linked list in O(n log n) time and O(1) extra memory besides the stack.",
      "Bottom-up merge sort with no recursion.",
    ],
    related: [
      "quick-sort",
      "heap-sort",
      "divide-and-conquer",
      "merge-two-lists",
      "merge-k-lists",
      "exponential-search",
    ],
  },
  {
    slug: "quick-sort",
    track: "dsa",
    category: "Sorting",
    title: "Quick Sort",
    summary:
      "Pick a pivot, partition into lesser and greater, recurse on both sides. Fast average case, fragile worst case, the default in-place comparison sort.",
    depth: "core",
    whyItMatters:
      "Quicksort is the comparison sort you must be able to write on a whiteboard, including the partition. Interviewers use it to test in-place reasoning, two-pointer technique, and whether you understand average versus worst case. Follow-ups are almost automatic: 'what if the array is already sorted?', 'randomize the pivot,' 'three-way partition for duplicates,' 'why does Java use introsort?'",
    theory: [
      "The partition step is the algorithm. Hoare partition uses two pointers that walk inward, swapping inversions across the pivot. Lomuto partition grows a '≤ pivot' prefix with a single scan — easier to code, more swaps, slightly worse constants. After partition, the pivot is in its final index p, and you recurse on [lo, p) and (p, hi].",
      "Average time is Θ(n log n) if pivots land reasonably near the middle. The recurrence is T(n) = T(i) + T(n-1-i) + Θ(n) for a random split i. Worst case is Θ(n²): a sorted array with the first (or last) element as pivot produces partitions of size 0 and n-1 every time. That is why a fixed 'first element' pivot is a bug in disguise.",
      "Quicksort is not stable in the usual in-place form. Extra memory can make it stable, at which point you have given up its main advantage over merge sort. Tail-recursion elimination and recursing on the smaller side first keep stack depth O(log n) in the average case.",
    ],
    howItWorks: [
      "If hi - lo <= 1, return. For small slices, switch to insertion sort in a real implementation.",
      "Choose a pivot (median-of-three, random index, or last element) and move it to a known place.",
      "Partition: all elements < pivot on the left, > pivot on the right, pivot at index p.",
      "Recurse on A[lo..p) and A[p+1..hi]. Do not include p; it is finished.",
      "Prefer recursing on the smaller side and looping on the larger to bound the stack.",
    ],
    whenToUse: [
      "In-place, cache-friendly sorting of arrays in memory when average speed matters.",
      "Interview 'implement a sort' unless they asked for stability or a guaranteed bound.",
    ],
    whenNotToUse: [
      "You need a worst-case n log n guarantee (use heap sort or introsort, or merge sort).",
      "You need stability (use merge sort).",
      "The comparator is expensive and the data is linked — merge sort is more natural.",
    ],
    complexity: {
      time: "Θ(n log n) average; Θ(n²) worst",
      space: "O(log n) stack average; O(n) stack if you recurse on the large side first every time",
      notes: "In-place. Not stable.",
    },
    tradeoffs: [
      "Best practical constants among comparison sorts versus a quadratic cliff and no stability.",
      "Lomuto is easier to get right; Hoare is faster and uglier.",
    ],
    interviewTips: [
      "Ask which partition they prefer. Implement Lomuto if you want fewer bugs; mention Hoare.",
      "Immediately volunteer randomized pivot or median-of-three when they ask about worst case.",
      "Introsort = quicksort + heap sort fallback when depth exceeds 2 log n. That is the production answer.",
    ],
    pitfalls: [
      "Recursing on a slice that still includes the pivot and infinite-looping.",
      "Off-by-one in Hoare's crossing pointers — the standard bug.",
      "Picking A[0] as pivot and then demoing on a sorted array.",
      "Claiming O(1) extra space while ignoring the call stack.",
    ],
    practiceIdeas: [
      "Implement both Lomuto and Hoare; count swaps on random data.",
      "Sort and then handle the 'kth largest' follow-up with the same partition (quickselect).",
      "Add an insertion-sort cutoff for slices of length ≤ 16.",
    ],
    related: [
      "randomized-quicksort",
      "three-way-quicksort",
      "merge-sort",
      "heap-sort",
      "dutch-flag",
      "two-pointers",
    ],
  },
  {
    slug: "randomized-quicksort",
    track: "dsa",
    category: "Sorting",
    title: "Randomized Quicksort",
    summary:
      "Choose the pivot uniformly at random (or shuffle first) so the n² worst case is vanishingly unlikely instead of input-dependent.",
    depth: "next",
    whyItMatters:
      "The follow-up to 'quicksort is O(n²) on sorted data' is 'so fix it.' Randomization is the theoretically clean fix: expected time is O(n log n) on every input, including adversarial ones, because the adversary no longer knows your pivot. Interviews use this to see if you distinguish randomized expected time from average-case time over random inputs.",
    theory: [
      "Two equivalent implementations: (1) at each partition, swap a random index in [lo, hi] with the pivot slot, then partition as usual; (2) Fisher–Yates shuffle the array once, then run deterministic quicksort. Per-call random pivot is simpler to analyze incrementally and does not require a full shuffle.",
      "Expected comparisons are at most 2n ln n + O(n). The proof: the probability that the i-th and j-th order statistics are compared is 2 / (|j-i|+1), because they are compared iff one of them is the first pivot chosen in that interval. Summing those probabilities gives the bound. High-probability bounds also exist: the chance of a much-worse tree is exponentially small.",
      "Randomization does not change the worst-case existence — a pathological pivot sequence can still happen — it only makes that sequence independent of the input and extremely rare. If you need a hard cap, introsort still wins: randomize, and if the recursion depth exceeds ~2 log n, switch to heap sort.",
    ],
    howItWorks: [
      "In partition(lo, hi), pick k uniformly from lo..hi inclusive.",
      "Swap A[k] with A[hi] (Lomuto) or with your Hoare pivot slot.",
      "Run the usual partition and recurse.",
      "Use an integer RNG that can produce the full range; a biased modulo is fine for interviews, not for crypto.",
    ],
    whenToUse: [
      "Any in-place quicksort that might see sorted, reversed, or adversarial input.",
      "Quickselect for kth element — same randomization, expected linear time.",
    ],
    whenNotToUse: [
      "Environments without a usable RNG where you still need a worst-case bound — use heap sort or median-of-medians.",
      "When a deterministic guarantee is a spec requirement (real-time systems).",
    ],
    complexity: {
      time: "O(n log n) expected; O(n²) with negligible probability",
      space: "O(log n) expected stack",
    },
    tradeoffs: [
      "Input-independent expected time versus a remaining (tiny) chance of a bad pivot tree.",
      "RNG cost is noise next to element comparisons for any realistic n.",
    ],
    interviewTips: [
      "Say 'expected O(n log n) for every input, not average over random arrays.' That distinction is the point.",
      "If they want deterministic worst-case linear-time select, that is median-of-medians, not randomized quickselect.",
    ],
    pitfalls: [
      "Picking a random pivot but then still partitioning around A[0].",
      "Seeding the RNG with a constant in a submission environment and accidentally making it deterministic on their tests — usually fine, but know your platform.",
      "Calling this 'O(n log n) worst case.' It is not.",
    ],
    practiceIdeas: [
      "Compare recursion depth of first-element pivot vs random pivot on a sorted array of 10^5.",
      "Implement randomized quickselect for kth largest.",
      "Add an introsort depth cap on top of random pivots.",
    ],
    related: [
      "quick-sort",
      "three-way-quicksort",
      "heap-sort",
      "dutch-flag",
    ],
  },
  {
    slug: "three-way-quicksort",
    track: "dsa",
    category: "Sorting",
    title: "3-Way Quicksort",
    summary:
      "Dijkstra's Dutch-national-flag partition: split into < pivot, == pivot, > pivot so duplicate keys are finished in one pass.",
    depth: "next",
    whyItMatters:
      "Classic two-way quicksort degrades when the array has few distinct keys — think 'sort 10 million records with a boolean or a status enum.' Every equal key still gets re-partitioned. 3-way quicksort (Bentley–McIlroy / Dijkstra) puts all equals in the middle and does not recurse there. It is the same idea as the Dutch national flag problem, which is itself a common interview.",
    theory: [
      "Maintain three regions while scanning: A[lo..lt) < pivot, A[lt..i) == pivot, A[i..gt] unknown, A[gt+1..hi] > pivot. When A[i] < pivot, swap with lt and advance both. When A[i] > pivot, swap with gt and decrement gt (do not advance i; the swapped-in value is unknown). When equal, just i++. At the end, recurse only on the two strict sides.",
      "With all keys equal the algorithm is Θ(n): one partition, two empty recursive calls. With a constant number of distinct keys it stays close to linear. With all distinct keys it behaves like ordinary quicksort plus a bit more bookkeeping.",
      "This is not counting sort. You still compare through a pivot; you just treat equality as a third bucket. For a tiny key universe, counting or radix sort can be faster. For general comparable keys with many ties, 3-way is the right comparison sort.",
    ],
    howItWorks: [
      "Choose a pivot (random index is still wise). Set lt = lo, i = lo, gt = hi.",
      "While i <= gt: if A[i] < pivot, swap(i, lt), i++, lt++. If A[i] > pivot, swap(i, gt), gt--. Else i++.",
      "Recurse on [lo, lt) and (gt, hi]. The closed interval [lt, gt] is already equal and done.",
      "For objects, compare on the sort key only; keep the three-way structure.",
    ],
    whenToUse: [
      "Arrays with many duplicate keys.",
      "Sorting by a low-cardinality field (status, grade, country code) when you still want a comparison sort.",
    ],
    whenNotToUse: [
      "Keys are unique — extra pointers buy nothing over Hoare/Lomuto.",
      "Keys are integers in a tiny range — counting sort is simpler and linear.",
    ],
    complexity: {
      time: "O(n log n) typical; O(n) when all keys equal",
      space: "O(log n) stack",
      notes: "In-place. Not stable.",
    },
    interviewTips: [
      "If they give you an array of 0/1/2, they want Dutch flag, not a full sort. Do it in one pass.",
      "Connect the two: '3-way quicksort is Dutch flag at every pivot.'",
    ],
    pitfalls: [
      "Advancing i after a swap with gt — the new A[i] has not been classified.",
      "Recursing into the equal range and wasting the whole point of the algorithm.",
      "Off-by-one on lt/gt so one equal key is left on a side and re-processed forever.",
    ],
    practiceIdeas: [
      "Sort an array that is 90% zeros with a few other integers; compare two-way vs three-way times.",
      "Dutch national flag as a standalone problem.",
      "Sort strings by a shared prefix using 3-way string quicksort (Sedgewick) — advanced follow-up.",
    ],
    related: [
      "quick-sort",
      "randomized-quicksort",
      "dutch-flag",
      "counting-sort",
    ],
  },
  {
    slug: "heap-sort",
    track: "dsa",
    category: "Sorting",
    title: "Heap Sort",
    summary:
      "Build a max-heap in linear time, then repeatedly extract the maximum into the shrinking suffix. Guaranteed n log n, in-place, not stable.",
    depth: "core",
    whyItMatters:
      "Heap sort is the answer to 'in-place sort with a hard O(n log n) bound.' It is how you show you understand heaps beyond 'I used a PriorityQueue.' Interviews will ask you to heapify an array in place, explain why build-heap is O(n) not O(n log n), and then extract n times. It is also the fallback inside introsort when quicksort goes too deep.",
    theory: [
      "A max-heap stored in an array satisfies A[i] >= A[2i+1] and A[i] >= A[2i+2]. heapify(i) sinks A[i] until the heap property holds in its subtree. Building the heap by sinking from the last parent (index floor(n/2)-1) down to 0 is O(n): most nodes are near the leaves and sink a constant distance. The naive 'insert each element into an empty heap' is O(n log n) and is the wrong build.",
      "Sorting: after the heap is built, A[0] is the maximum. Swap it with A[n-1], reduce heap size by one, and sink index 0. Repeat. The growing suffix A[i..n) is the finished sorted tail. No second array is required.",
      "Heap sort is not stable and is not particularly cache-friendly: sink walks jump to 2i+1. In practice quicksort and Timsort usually win on speed. Heap sort wins on the worst-case guarantee plus O(1) extra memory (ignoring the log n implicit in a recursive sink; write sink iteratively).",
    ],
    howItWorks: [
      "Build: for i from floor(n/2)-1 down to 0, sink(i, n).",
      "For end from n-1 down to 1: swap A[0] and A[end]; sink(0, end).",
      "sink(i, size): while a child exists, pick the larger child; if it is bigger than A[i], swap and continue from that child; else stop.",
    ],
    whenToUse: [
      "In-place guaranteed O(n log n) with no worst-case cliff.",
      "Introsort's overflow path.",
      "When you already have a binary heap and want to emit a sorted array.",
    ],
    whenNotToUse: [
      "You need stability.",
      "You want the fastest in-memory sort on random data — tuned quicksort/Timsort usually win.",
    ],
    complexity: {
      time: "O(n log n) worst case; O(n) to build the heap",
      space: "O(1)",
      notes: "Not stable. Not adaptive.",
    },
    tradeoffs: [
      "Hard n log n and in-place versus poor cache behavior and no stability.",
    ],
    interviewTips: [
      "Write iterative sink. Recursive sink is fine if you mention O(1) extra is for the iterative version.",
      "Be ready to prove build-heap is O(n): sum k/2^{k+1} over heights.",
      "Do not use a library heap and extract into a new array if they asked for heap sort — that is O(n) extra space.",
    ],
    pitfalls: [
      "Building the heap by n inserts (O(n log n)) and calling it linear.",
      "Off-by-one children: left = 2i+1, right = 2i+2 for 0-based arrays.",
      "Forgetting to shrink the heap size after each extract so sink walks into the sorted suffix.",
    ],
    practiceIdeas: [
      "In-place heap sort, then check it is a permutation of the input.",
      "Instrument sink lengths during build-heap vs during the n extracts.",
      "Heapsort the array, then implement top-k as a bounded heap on a stream (related but different).",
    ],
    related: [
      "heapify",
      "heap-insert-extract",
      "selection-sort",
      "quick-sort",
      "merge-sort",
    ],
  },
  {
    slug: "counting-sort",
    track: "dsa",
    category: "Sorting",
    title: "Counting Sort",
    summary:
      "Tally how many times each key in a small integer range appears, then write the output by walking the counts. Linear in n + range.",
    depth: "next",
    whyItMatters:
      "Counting sort is the first sort you meet that beats n log n — by refusing to compare. Interviews use it as the engine inside radix sort, as the way to sort by a grade or a byte, and as a test of whether you can produce a stable linear sort. If you only remember 'make a frequency array,' you will fail the follow-up that asks for original order of ties.",
    theory: [
      "Keys must be integers (or map to integers) in a range of size k, typically shifted so they lie in [0, k). Allocate count[0..k). One pass increments count[A[i]]. A prefix-sum pass turns counts into ending positions: count[x] becomes the number of keys ≤ x. A reverse pass over A writes each element into output[--count[key]] so equal keys keep their original order — that reverse pass is what makes it stable.",
      "Time is Θ(n + k). If k is O(n), this is linear. If keys are arbitrary 64-bit integers, k is 2^64 and the algorithm is unusable. That is the whole restriction. Negative keys are fine after a shift by the minimum.",
      "You do not have to produce the objects themselves if you only need sorted keys; writing the key x, count[x] times, is enough and simpler. Stability only matters when payloads ride along with keys.",
    ],
    howItWorks: [
      "Find min and max (or take them as given). k = max - min + 1. Allocate count[k] and output[n].",
      "For each element, count[key - min]++.",
      "Prefix-sum count so count[i] = number of elements with key ≤ i + min.",
      "For i from n-1 down to 0: place A[i] at output[--count[A[i]-min]].",
      "Copy output back to A if you need in-array result.",
    ],
    whenToUse: [
      "Integer keys in a range k that is O(n) or otherwise acceptable.",
      "As the stable digit sort inside radix sort.",
      "Histograms that already need the counts for something else.",
    ],
    whenNotToUse: [
      "Huge or sparse key ranges (k ≫ n) — you pay in memory and time.",
      "General comparable objects with no integer key.",
    ],
    complexity: {
      time: "O(n + k)",
      space: "O(n + k)",
      notes: "Stable if you scatter from the back using prefix positions.",
    },
    tradeoffs: [
      "Linear time versus a key-range assumption and extra memory.",
      "Stable output versus a two-array dance that is easy to get backwards.",
    ],
    interviewTips: [
      "If they say 'sort this array of ages' or 'sort characters,' counting sort is the intended answer, not quicksort.",
      "Write the stable version. The unstable 'emit x, count[x] times' version is only OK when there is no satellite data.",
    ],
    pitfalls: [
      "Prefix-sum off-by-one so the last bucket overflows.",
      "Forward scatter, which reverses equal keys and silently loses stability.",
      "Forgetting to shift negatives, then indexing count[-3].",
    ],
    practiceIdeas: [
      "Stable-sort an array of {score, name} by score in O(n + 101).",
      "Sort a string's characters and return the sorted string.",
      "Use counting sort as a digit subroutine for radix sort on 32-bit integers.",
    ],
    related: [
      "radix-sort",
      "bucket-sort",
      "three-way-quicksort",
      "prefix-sum",
    ],
  },
  {
    slug: "radix-sort",
    track: "dsa",
    category: "Sorting",
    title: "Radix Sort",
    summary:
      "Stable-sort integers (or fixed-length strings) digit by digit. LSD walks least-significant digit first; MSD walks from the high digit and buckets recursively.",
    depth: "next",
    whyItMatters:
      "Radix sort is how you sort 32-bit integers in linear time in n and the number of digits, and how interviewers check that you understand why the digit sort must be stable. It shows up when someone says 'can you sort faster than n log n?' and the keys are integers or strings. You should know LSD vs MSD and why LSD is the one you implement first.",
    theory: [
      "Treat each key as a sequence of digits in base b (often 256, a byte). LSD radix sort: for digit position d from least significant to most, stably counting-sort the array by that digit. Stability is mandatory: after sorting by the 1s place, a stable 10s pass keeps the 1s order among equals, so two-digit order is correct. After all w digits, the array is sorted.",
      "Time is O(w(n + b)). For 32-bit keys and b = 256, w = 4, so this is O(n). For arbitrary-length strings, w is the max length and you may prefer MSD: partition by the first character, then recurse inside each bucket. MSD can skip a lot of work on diverse prefixes but is more code (and needs a fallback for tiny buckets).",
      "Radix sort is not comparison-based, so the Ω(n log n) lower bound does not apply. It does require a digit decomposition. Signed integers need a bias or a special pass on the sign bit so negatives precede positives.",
    ],
    howItWorks: [
      "Choose a base b (256 for bytes is standard). w = number of digits.",
      "For d = 0 to w-1 (LSD): extract digit = floor(key / b^d) % b.",
      "Stable counting-sort the current array by that digit into a buffer, then swap buffers.",
      "After the last digit, the buffer is fully sorted. Handle sign with an offset or a final partition.",
    ],
    whenToUse: [
      "Fixed-width integer keys, IPv4 addresses, credit-card-like numeric IDs.",
      "Equal-length strings (or padded keys) when w is small.",
    ],
    whenNotToUse: [
      "Already-comparable objects with no cheap digit view.",
      "Keys so wide that w(n+b) loses to n log n (huge strings, big integers).",
      "Tiny n, where a comparison sort's constants win.",
    ],
    complexity: {
      time: "O(w(n + b))",
      space: "O(n + b)",
      notes: "LSD is stable. MSD can be made stable with care.",
    },
    tradeoffs: [
      "Linear in n for short keys versus extra memory and a digit-width factor.",
      "LSD is simple and always scans all digits; MSD can early-out but is harder.",
    ],
    interviewTips: [
      "Say 'stable counting sort per digit, LSD first' in one sentence, then write counting sort as a helper.",
      "If they ask about strings of different lengths, discuss padding (LSD) vs MSD recursion.",
    ],
    pitfalls: [
      "Unstable digit sort — the whole algorithm is wrong, not just ties.",
      "MSD without a base case, so length-0 suffixes recurse forever.",
      "Treating signed ints as unsigned and putting -1 after 0.",
    ],
    practiceIdeas: [
      "LSD radix sort 32-bit integers with byte digits.",
      "Sort an array of equal-length hex strings.",
      "Compare wall time to quicksort for n = 1e6 random ints.",
    ],
    related: [
      "counting-sort",
      "bucket-sort",
      "merge-sort",
    ],
  },
  {
    slug: "bucket-sort",
    track: "dsa",
    category: "Sorting",
    title: "Bucket Sort",
    summary:
      "Scatter elements into buckets by value range, sort each bucket, concatenate. Average linear when keys are uniformly spread.",
    depth: "next",
    whyItMatters:
      "Bucket sort is the floating-point cousin of counting sort. Interviews mention it when keys are uniformly distributed in [0, 1) or when you need to explain hash-table-like scatter for sorting. It is also a good place to discuss expected versus worst case: one overloaded bucket and you are back to n² if you insertion-sort that bucket.",
    theory: [
      "Pick b buckets that partition the key range (for uniform [0, 1), bucket i owns [i/b, (i+1)/b)). Place each key in its bucket (O(1) index arithmetic), sort each bucket (insertion sort if you expect a few items), and concatenate. If keys are uniform and b = Θ(n), each bucket has O(1) expected size and total expected time is O(n).",
      "Worst case is all keys in one bucket: you pay the inner sort's worst case, typically O(n²) with insertion sort. Using a stronger inner sort gives O(n log n) worst case but loses the 'simple linear expected' story. Hash-sort / scatter-gather variants in engineering are this idea with a hash instead of a range map.",
      "Counting sort is bucket sort with one bucket per key and no inner sort. Radix sort is a hierarchical bucket sort on digits. Seeing the three as a family is more useful than memorizing them as unrelated tricks.",
    ],
    howItWorks: [
      "Choose b (often n). Allocate b empty lists.",
      "For each key x, append it to bucket floor((x - min) / range * b), clamping the max into the last bucket.",
      "Sort each bucket (insertion sort for expected-small buckets).",
      "Concatenate buckets in order into the output.",
    ],
    whenToUse: [
      "Uniform real keys in a known interval.",
      "Explaining expected-linear sorts and as a conceptual parent of counting/radix.",
    ],
    whenNotToUse: [
      "Highly skewed data (power-law keys all land in one bucket).",
      "Need a guaranteed n log n bound without a strong inner sort.",
    ],
    complexity: {
      time: "O(n) expected on uniform keys with b = Θ(n); O(n²) worst with insertion sort",
      space: "O(n + b)",
    },
    tradeoffs: [
      "Expected linear time versus a distribution assumption and extra lists.",
    ],
    interviewTips: [
      "State the uniform assumption out loud. Without it you cannot claim O(n).",
      "If they give integers in a small range, prefer counting sort — buckets of size 1.",
    ],
    pitfalls: [
      "Index formula that maps the maximum to bucket b (out of range). Clamp.",
      "Forgetting to sort inside buckets and concatenating unsorted lists.",
      "Using too few buckets so every 'linear' sort is secretly insertion sort on n/2 items.",
    ],
    practiceIdeas: [
      "Sort uniform random floats in [0, 1) and plot bucket occupancies.",
      "Feed a skewed distribution (many values near 0) and watch the runtime collapse.",
      "Implement counting sort as bucket sort with k singleton buckets.",
    ],
    related: [
      "counting-sort",
      "radix-sort",
      "insertion-sort",
    ],
  },
  {
    slug: "cycle-sort",
    track: "dsa",
    category: "Sorting",
    title: "Cycle Sort",
    summary:
      "Write each element directly to its final index by walking cycles of the permutation. Minimizes writes; useful when memory writes are costly.",
    depth: "advanced",
    whyItMatters:
      "Cycle sort is the rare sort whose headline is writes, not comparisons. You will not implement it as a general library sort. You will use the cycle idea in interview problems: 'find the missing number,' 'find all duplicates in 1..n,' 'first missing positive.' Those problems are cycle sort wearing a disguise — each value v belongs at index v-1, and you rotate cycles until every seat is correct.",
    theory: [
      "If the sorted order is a permutation π of the current positions, the array is a set of cycles. Cycle sort: for each index, compute the destination of the current item by counting how many elements are strictly smaller (its sorted rank). Swap it into that destination, then repeat with the displaced item until you return to the start. Each element is written at most once to its final home (plus a constant of extras for the cycle bookkeeping).",
      "The algorithm is Θ(n²) comparisons because ranking each item is a scan unless you already know the destination from the value itself. When values are a permutation of 1..n, the destination of v is v-1 and the 'sort' becomes the famous O(n) / O(1) extra-space swap-into-place pattern.",
      "That special case is the interview one. To find the missing number in 1..n with one duplicate, or all numbers that appear twice, put each A[i] into index A[i]-1 by swapping until the cycle closes, then scan for mismatches. People who try extra hash sets solve it but miss the point.",
    ],
    howItWorks: [
      "General cycle sort: for start in 0..n-2, compute the rank of A[start] among all items; skip if it is already home; otherwise rotate the cycle, writing each value once into its rank index (skipping duplicates carefully).",
      "Permutation-of-1..n variant: while A[i] is in 1..n and A[A[i]-1] !== A[i], swap A[i] with A[A[i]-1].",
      "After every cycle is placed, a linear scan finds missing / duplicate / first-missing-positive answers from positions where A[i] !== i+1.",
    ],
    whenToUse: [
      "Write-limited memory; you need a write-optimal rearrangement.",
      "Arrays that should be a permutation of 1..n — missing number, duplicates, first missing positive.",
    ],
    whenNotToUse: [
      "General-purpose sorting; n² comparisons and a delicate implementation.",
      "When you may use O(n) extra memory — a hash set is simpler for many of the same problems.",
    ],
    complexity: {
      time: "O(n²) general ranking; O(n) for 1..n destination mapping",
      space: "O(1)",
      notes: "Write-optimal: each item is written at most once to its final position (plus cycle temps).",
    },
    interviewTips: [
      "When you see 'array of n integers, each in 1..n,' think cycle placement before hashing.",
      "First Missing Positive is cycle sort plus a final scan; negatives and zeros are skipped, not placed.",
    ],
    pitfalls: [
      "Infinite swap loops when duplicates exist: stop if the destination already holds the same value.",
      "Placing a number that is out of range (≤0 or > n) and writing off the end.",
      "Forgetting the final mismatch scan and returning the array instead of the missing value.",
    ],
    practiceIdeas: [
      "Find the missing number in 0..n or 1..n in-place.",
      "Find all duplicates in 1..n.",
      "First Missing Positive (LeetCode 41) with O(1) extra space.",
    ],
    related: [
      "selection-sort",
      "insertion-sort",
      "heap-sort",
      "dutch-flag",
    ],
  },
];
