import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "heapify",
    track: "dsa",
    category: "Heaps",
    title: "Heapify and the Heap Property",
    summary:
      "A binary heap is an almost-complete binary tree stored in an array. Sift-down from the last parent builds it in O(n); sift-up after an append is O(log n).",
    depth: "core",
    whyItMatters:
      "If you treat a heap as 'I imported PriorityQueue,' you cannot answer 'why is build O(n)?' or implement heap sort. Interviewers want the array indexing, the sift-down loop, and the linear-time build. This is also the difference between n inserts (n log n) and heapify (n) when you already have all the elements.",
    theory: [
      "Index i has parent floor((i-1)/2), left 2i+1, right 2i+2 (0-based). The heap property: for a max-heap, A[parent] >= A[child] everywhere. The shape property: fill level by level, left to right — that is why the array has no holes and why the last parent is at floor(n/2)-1.",
      "siftDown(i): swap i with its larger child if that child is bigger, and repeat. Height of i is O(log n) in the worst case, but during build most nodes are close to the leaves. Summing k·(n/2^{k+1}) over levels k gives O(n). siftUp(i): swap with parent while the property fails — used after push at the end.",
      "A heap is not sorted. The only guaranteed order is the root vs everyone. The k-th level is not the k-th largest set. If you need sorted order, you extract n times (heap sort) or you picked the wrong structure.",
    ],
    howItWorks: [
      "build: for i = floor(n/2)-1 down to 0, siftDown(i).",
      "siftDown(i): while true, pick the extreme child in range; if it should swap with i, swap and i = child; else break.",
      "Do not build by n times push unless the data arrives online.",
    ],
    whenToUse: [
      "You already have n elements and need a heap (heap sort, heap-based selection).",
      "Explaining the O(n) build vs O(n log n) inserts.",
    ],
    whenNotToUse: [
      "You need a full sort in the array besides heap sort — use a real sort.",
      "You need decrease-key on arbitrary elements without handles — a binary heap is painful; think Dijkstra with a better heap or lazy inserts.",
    ],
    complexity: {
      time: "O(n) build; O(log n) sift",
      space: "O(1) extra for iterative sift",
    },
    interviewTips: [
      "Write indices on a 7-element array and circle the last parent. Then write the downward loop.",
      "If they ask why not n inserts: most nodes sink O(1).",
    ],
    pitfalls: [
      "siftDown using the wrong child (min vs max heap mix-up).",
      "Building from 0 upward (that is n siftUps = n log n, and is not the linear algorithm).",
      "Off-by-one last parent index.",
    ],
    practiceIdeas: [
      "Implement build-max-heap and assert the heap property.",
      "Compare timings: n pushes vs heapify on 1e6 random ints.",
      "Heap sort using this build.",
    ],
    related: [
      "heap-insert-extract",
      "heap-sort",
      "top-k",
      "dijkstra",
    ],
  },
  {
    slug: "heap-insert-extract",
    track: "dsa",
    category: "Heaps",
    title: "Heap Insert and Extract",
    summary:
      "push appends and sifts up. pop swaps the root with the last element, shrinks, and sifts down. peek is A[0]. All the priority-queue operations.",
    depth: "core",
    whyItMatters:
      "Every 'top k,' 'merge k,' 'median stream,' and Dijkstra implementation is these two operations. You should be able to write them without a library, and you should know that extract-min is O(log n), not O(1). Decrease-key is O(log n) only if you have an index handle; otherwise people insert a duplicate and lazily skip stale pops.",
    theory: [
      "insert(x): A.push(x); siftUp(n-1). The new leaf climbs until its parent is in order. extract(): swap A[0] and A[n-1], pop, siftDown(0). The hole at the root falls until both children are in order (or it is a leaf).",
      "Priority queues are heaps with a comparator. For pairs {dist, node}, compare dist, break ties if you care about stability (you usually do not). In JS you must implement the heap yourself or use a library; do not sort an array on every insert.",
      "Lazy deletion: to delete an arbitrary value, push a tombstone or just insert a fresher pair and ignore old ones when they pop. That is the standard Dijkstra-in-interview trick when you cannot decrease-key.",
    ],
    howItWorks: [
      "push: append, siftUp.",
      "pop: if empty, error. If one element, pop it. Else swap 0 and last, pop last, siftDown(0), return the old root.",
      "peek: A[0]. size: A.length.",
    ],
    whenToUse: [
      "Repeated 'give me the current min/max and insert new keys.'",
      "Event simulation, greedy 'always take the next best.'",
    ],
    whenNotToUse: [
      "You need min and max at once — use two heaps or a balanced BST.",
      "You need sorted iteration of all keys often — use a tree map.",
    ],
    complexity: {
      time: "O(log n) push/pop; O(1) peek",
      space: "O(n)",
    },
    interviewTips: [
      "If the language has a heap, use it after stating the comparator. If not, write a small Heap class once and reuse it.",
      "Always say what happens on ties and on empty pop.",
    ],
    pitfalls: [
      "Forgetting to shrink the array after extract — siftDown sees a ghost last element.",
      "Comparator inverted (min-heap vs max-heap) so top-k is wrong.",
      "Using an unsorted list and scanning for min — that is O(n) extract, not a heap.",
    ],
    practiceIdeas: [
      "Implement a min-heap and test with a random sequence of push/pop vs a sorted array oracle.",
      "Last Stone Weight; Kth Largest Element in a Stream.",
      "Lazy Dijkstra on a small graph.",
    ],
    related: [
      "heapify",
      "top-k",
      "median-stream",
      "dijkstra",
      "merge-k-lists",
    ],
  },
  {
    slug: "top-k",
    track: "dsa",
    category: "Heaps",
    title: "Top-K with a Heap",
    summary:
      "A size-k heap of the opposite polarity keeps the k best seen so far in O(n log k). Quickselect is average O(n) if you only need the unordered k.",
    depth: "core",
    whyItMatters:
      "Top-k is the most common heap interview: kth largest, k most frequent, k closest points. The pattern is a min-heap of size k for the k largest (the root is the weakest of the winners). People who sort O(n log n) pass, then get asked to do better when k ≪ n. People who use a max-heap of everything waste memory.",
    theory: [
      "k largest: min-heap. Push each number; if size > k, pop. At the end the heap holds the k largest and the root is the kth largest. k smallest is a max-heap of size k. Frequency variants: heap of {count, key} after a hashmap pass.",
      "Quickselect partitions like quicksort and only recurses into the side that contains index n-k. Average O(n), worst O(n²) unless you randomize or use median-of-medians. It does not give the k items in sorted order; an extra O(k log k) sort can.",
      "If you need the k items online as a stream, the bounded heap is the right structure. If you need them fully sorted at the end, you can heap-sort the k survivors or have used a size-n heap (worse).",
    ],
    howItWorks: [
      "Create a min-heap. For each x in nums: push x; if heap.size > k, pop.",
      "For kth largest, return peek. For the set, drain the heap.",
      "For k frequent: count map, then the same heap on pairs (count, key) — be careful with the comparator (count first, then key if they asked for ties).",
    ],
    whenToUse: [
      "k ≪ n, streaming or static.",
      "k closest / k frequent / kth largest.",
    ],
    whenNotToUse: [
      "k = n — just sort or find min/max.",
      "You need exact order statistics many times — augment a BST.",
    ],
    complexity: {
      time: "O(n log k) heap; O(n) average quickselect",
      space: "O(k)",
    },
    tradeoffs: [
      "Heap is simple, worst-case n log k, streaming-friendly.",
      "Quickselect is faster on average, mutates the array, not streaming.",
    ],
    interviewTips: [
      "Say 'min-heap of size k for k largest' in one breath. Invert that sentence and you have k smallest.",
      "Bucket sort on frequencies when the count range is 1..n (top-k frequent) is O(n) and a common upgrade.",
    ],
    pitfalls: [
      "Max-heap of size n then pop k times — O(n + k log n) and O(n) memory.",
      "Off-by-one: kth vs k items; 1-based k.",
      "Comparator that compares objects as strings and '10' < '2'.",
    ],
    practiceIdeas: [
      "Kth Largest Element in an Array (heap and quickselect).",
      "Top K Frequent Elements.",
      "K Closest Points to Origin.",
    ],
    related: [
      "heap-insert-extract",
      "quick-sort",
      "median-stream",
      "merge-k-lists",
      "frequency-map",
    ],
  },
  {
    slug: "median-stream",
    track: "dsa",
    category: "Heaps",
    title: "Median of a Stream",
    summary:
      "Two heaps: a max-heap of the lower half and a min-heap of the upper half. Rebalance so sizes differ by at most one; the median is one of the roots or their average.",
    depth: "next",
    whyItMatters:
      "This is the two-heap design interview. A sorted list is O(n) insert. A balanced BST of all elements also works (and a follow-up if they allow it). The two-heap solution is the one they expect you to invent: lower half's maximum and upper half's minimum sit at the split. It generalizes to two heaps plus a lazy index for sliding-window medians.",
    theory: [
      "Invariant: every value in low (max-heap) ≤ every value in high (min-heap), and size(low) is size(high) or one larger (or the reverse convention). insert: push into low if x <= low.peek (or high is empty logic), else into high; then while sizes violate the invariant, move the root across.",
      "findMedian: if sizes equal, average the two roots (watch integer division). If low is larger, low.peek. All operations O(log n) insert, O(1) median.",
      "Sliding window median adds deletions. Binary heaps cannot delete an arbitrary old value in O(log n) without a handle, so you lazy-delete (a map of doomed values, skip when they appear at a root) or use a balanced tree / policy-based data structure. Mention this if they add a window.",
    ],
    howItWorks: [
      "low = max-heap, high = min-heap.",
      "add(x): if low is empty or x <= low.peek, low.push(x); else high.push(x).",
      "if low.size > high.size + 1, high.push(low.pop()). if high.size > low.size, low.push(high.pop()).",
      "median: low.size > high.size ? low.peek : (low.peek + high.peek) / 2.",
    ],
    whenToUse: [
      "Running median of a stream.",
      "Any running order statistic near the middle.",
    ],
    whenNotToUse: [
      "You need every percentile — a histogram or a tree with sizes is better.",
      "n is tiny — sort the copy each time and move on.",
    ],
    complexity: {
      time: "O(log n) add; O(1) median",
      space: "O(n)",
    },
    interviewTips: [
      "Draw the two piles and the split. Then implement rebalance as its own function.",
      "Ask whether the average should be a float. In integer-only languages this is a trap.",
    ],
    pitfalls: [
      "Both heaps min-heaps because the language defaulted — invert one comparator.",
      "Not rebalancing after every insert, so the roots are not the middle.",
      "Integer overflow when summing two roots (use a wider type or divide first).",
    ],
    practiceIdeas: [
      "Find Median from Data Stream.",
      "Sliding Window Median (lazy heap or two trees).",
      "Running IQR with more heaps / fenwick of compressed values.",
    ],
    related: [
      "top-k",
      "heap-insert-extract",
      "ordered-set",
      "sliding-window-max",
    ],
  },
  {
    slug: "dijkstra-heap",
    track: "dsa",
    category: "Heaps",
    title: "Dijkstra as a Heap Algorithm",
    summary:
      "Dijkstra is BFS with a min-heap of (distance, node) instead of a queue. The heap always expands the closest unsettled node. This topic is the heap view; the graph topic covers the full algorithm.",
    depth: "next",
    whyItMatters:
      "Interviewers ask 'why a heap?' because the next-closest node is a priority-queue extract-min. If you use a linear scan for the closest node, Dijkstra is O(V²), which is fine on dense graphs and bad on sparse ones. The heap makes it O((V+E) log V) with binary heaps (lazy version). Seeing Dijkstra as 'heap + relaxation' ties this chapter to graphs.",
    theory: [
      "Each relaxation may discover a better dist[v] = dist[u] + w(u,v). You need to process nodes in increasing dist order so the first time you pop a node with its best dist, it is final (non-negative weights). The heap is the structure that gives you that next node.",
      "Without decrease-key, push a new (dist, v) pair every time v improves. When you pop a pair whose dist is stale (greater than the recorded best), skip it. Extra heap entries are at most E, so O(E log E). With a real decrease-key heap (Fibonacci, or an index heap), you keep one entry per node.",
      "Negative weights break the 'first pop is final' theorem — that is Bellman-Ford, not a heap bug. 0-1 weights should use a deque, not a heap (0-1 BFS).",
    ],
    howItWorks: [
      "dist = ∞, dist[s] = 0. heap.push({0, s}).",
      "While heap: pop {d, u}. if d !== dist[u] continue. for each edge u→v, if dist[u]+w < dist[v], update and push {dist[v], v}.",
      "The heap comparator is on d. Store v so you know which node.",
    ],
    whenToUse: [
      "Non-negative weighted shortest paths; the implementation vehicle is a min-heap.",
    ],
    whenNotToUse: [
      "Unweighted — BFS. 0-1 weights — deque. Negative weights — Bellman-Ford.",
    ],
    complexity: {
      time: "O((V + E) log V) lazy binary heap",
      space: "O(V + E)",
    },
    interviewTips: [
      "If they ask you to implement Dijkstra, this loop is the answer. Talk about stale heap entries.",
      "A* is the same heap with f = g + h. Mention it if the graph is a grid with a heuristic.",
    ],
    pitfalls: [
      "Using a max-heap. Using BFS on weighted edges.",
      "Not skipping stale pops, so you 'finalize' a node twice with a worse dist — wasted work, usually still correct if you only relax on improvement.",
    ],
    practiceIdeas: [
      "Network Delay Time; Path with Minimum Effort (a Dijkstra variant).",
      "Implement both O(V²) and heap Dijkstra and compare on sparse graphs.",
    ],
    related: [
      "dijkstra",
      "heap-insert-extract",
      "bfs",
      "a-star",
      "zero-one-bfs",
    ],
  },
  {
    slug: "huffman",
    track: "dsa",
    category: "Heaps",
    title: "Huffman Coding",
    summary:
      "Greedy: repeatedly merge the two rarest symbols into a new parent whose frequency is the sum. A min-heap of trees builds an optimal prefix code.",
    depth: "next",
    whyItMatters:
      "Huffman is the heap-meets-greedy interview. You prove a prefix code is optimal by always combining the two smallest frequencies. It shows up as 'minimum cost to merge files / ropes' (the same algorithm) and as the classic compression story. If you sort once and then merge linearly, you get it wrong when new parents should interleave — that is why the heap stays.",
    theory: [
      "A prefix code can be drawn as a full binary tree; the code of a symbol is the path. The total cost is sum freq[c] * depth(c). Huffman: put each symbol in a single-node tree in a min-heap keyed by frequency. Pop two, make a parent with freq = a+b, push the parent. The last tree is the code tree.",
      "Why greedy is optimal: there exists an optimal tree where the two rarest symbols are siblings at the deepest level. Replace them by their parent and induct. That is the exchange argument you should be able to sketch.",
      "The same process gives the minimum cost of combining n ropes / files where combining a and b costs a+b. People try DP (matrix-chain style) when the greedy heap is enough because any two can be merged, not only adjacent ones. Adjacent-only is matrix chain; unrestricted is Huffman.",
    ],
    howItWorks: [
      "Count frequencies. Push all {freq, node} into a min-heap.",
      "While heap.size > 1: a = pop(); b = pop(); parent = {freq: a.freq+b.freq, left: a, right: b}; push(parent).",
      "The remaining node is the root. DFS to assign 0/1 codes, or just compute the weighted external path length if they only want the cost.",
    ],
    whenToUse: [
      "Optimal prefix codes; minimum cost to merge files when any pair may merge.",
      "Teaching greedy + heap.",
    ],
    whenNotToUse: [
      "Symbols must keep a linear order (optimal BST, matrix chain) — that is DP.",
      "You need a code that is not prefix-free in a different model.",
    ],
    complexity: {
      time: "O(n log n)",
      space: "O(n)",
    },
    interviewTips: [
      "If they say 'connect n ropes with min cost,' this is it. Heap, not DP.",
      "Ask whether they want the actual bit strings or only the total cost.",
    ],
    pitfalls: [
      "Merging in sorted order without reinserting the parent — wrong when 1,1,100 becomes (1+1)+100 vs something else; actually that one is fine, but 1,3,3,4 is the usual counterexample for 'always sequential.'",
      "Using a max-heap and building an anti-Huffman tree.",
      "Forgetting n = 1 (cost 0, no merge).",
    ],
    practiceIdeas: [
      "Minimum cost to connect sticks.",
      "Build Huffman codes and encode/decode a short string.",
      "Contrast with matrix-chain DP on adjacent merges only.",
    ],
    related: [
      "heap-insert-extract",
      "fractional-knapsack",
      "greedy-mst",
      "matrix-chain",
    ],
  },
];
