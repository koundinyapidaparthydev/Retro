import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "next-greater-element",
    track: "dsa",
    category: "Stacks",
    title: "Next Greater Element",
    summary:
      "Scan left to right while a decreasing stack of indices waits. When the current value is larger, it is the next greater for every popped index.",
    depth: "core",
    whyItMatters:
      "Next greater (and next smaller, previous greater) is the monotonic-stack interview in its pure form. Daily temperatures, stock span, largest rectangle, and sliding-window extrema all reuse this loop. If you write a nested scan 'for each i, walk right until bigger,' you get O(n²) and a shrug. The stack makes each index push and pop at most once.",
    theory: [
      "Maintain a stack of indices whose values are strictly decreasing (for next greater). The stack is the candidates that have not yet seen a greater element to their right. When A[i] arrives, it is greater than A[top] for zero or more tops — those tops' answer is A[i]. Then push i. At the end, remaining indices have no next greater (fill -1).",
      "Previous greater is the same scan from the left, or a single left-to-right pass that looks at the new top after pops (the nearest left item still larger). Circular arrays (next greater II) concatenate the mental array twice, or run two passes, and only set an answer the first time an index is popped.",
      "The stack stores indices, not values, whenever you need to write into an answers array or compute a width (i - stack.top). Storing values is only enough when the output is the value itself and you do not need positions.",
    ],
    howItWorks: [
      "ans[i] = -1 for all i. stack = empty.",
      "For i in 0..n-1: while stack is nonempty and A[stack.top] < A[i], ans[stack.pop()] = A[i].",
      "Push i.",
      "For circular: wrap i over 2n with i % n, but do not push on the second pass if you only need first hits.",
    ],
    whenToUse: [
      "Next/previous greater or smaller for every index.",
      "Daily temperatures (days until a warmer day — store indices, answer is i - idx).",
    ],
    whenNotToUse: [
      "You need the next greater that is also a specific distance away — maybe a different structure.",
      "The array is unsorted and you need global max only — one scan, no stack.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(n)",
    },
    interviewTips: [
      "Say 'each index is pushed and popped once' as the complexity proof.",
      "Ask: strictly greater or ≥? Circular? Value or distance?",
    ],
    pitfalls: [
      "Using ≤ vs < incorrectly and skipping equal elements or infinite-looping on equals.",
      "Storing values then being unable to write ans[i].",
      "Forgetting -1 for indices that never pop.",
    ],
    practiceIdeas: [
      "Next Greater Element I / II (circular).",
      "Daily Temperatures.",
      "Online stock span.",
    ],
    related: [
      "monotonic-stack",
      "largest-rectangle-histogram",
      "sliding-window-max",
      "valid-parentheses",
    ],
  },
  {
    slug: "valid-parentheses",
    track: "dsa",
    category: "Stacks",
    title: "Valid Parentheses",
    summary:
      "Push opening brackets; a closer must match the stack top. The stack is the unmatched prefix. Empty at the end means valid.",
    depth: "core",
    whyItMatters:
      "Valid parentheses is the first stack problem most people see and still shows up as a warmup or as the core of min-remove-to-valid, longest valid parentheses, and score-of-parentheses. Interviewers want the map of close→open, early false on mismatch or leftover, and an empty-stack check before popping.",
    theory: [
      "A string of brackets is valid iff every prefix has #open ≥ #close for each type in a properly nested way — not just counts. Counts alone accept ([)] if you are sloppy with a single counter. The stack remembers the order. Each closer is matched to the nearest unmatched opener of the right type.",
      "One type of bracket can be solved with a counter (generate-parentheses uses this). Multiple types need the stack (or a rewrite to a single grammar). Longest valid parentheses uses a stack of indices to measure completed spans, or a DP on endings.",
      "The same stack validates HTML-ish tags, path simplification (\"..\" pops), and calculator parsing (operators wait on a stack until precedence says to pop).",
    ],
    howItWorks: [
      "Map )→(, ]→[, }→{.",
      "For each char: if it is an opener, push. If it is a closer, return false if the stack is empty or the top is not the matching opener; else pop.",
      "After the scan, return whether the stack is empty.",
      "For longest valid: stack of indices, push -1 as a base, measure i - top when a pair closes.",
    ],
    whenToUse: [
      "Check nesting of multiple bracket types.",
      "Parse matching structures (tags, function calls, path stacks).",
    ],
    whenNotToUse: [
      "Only one bracket type and you only need a boolean — a counter is enough.",
      "You need the count of valid strings — Catalan / DP, not a stack walk of one string.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(n)",
    },
    interviewTips: [
      "Check empty before pop. That single guard is the usual crash.",
      "Min Remove to Make Valid Parentheses: first pass marks extras, second builds the string — two stacks or a counter plus a stack.",
    ],
    pitfalls: [
      "Treating counts of each type as sufficient (misses crossed pairs).",
      "Not returning false on leftover openers.",
      "Comparing the closer to the opener without a map and missing one pair.",
    ],
    practiceIdeas: [
      "Valid Parentheses.",
      "Longest Valid Parentheses.",
      "Minimum remove to make valid; score of parentheses.",
    ],
    related: [
      "generate-parentheses",
      "min-stack",
      "monotonic-stack",
      "catalan",
    ],
  },
  {
    slug: "min-stack",
    track: "dsa",
    category: "Stacks",
    title: "Min Stack",
    summary:
      "A stack that returns the current minimum in O(1). Store pairs (value, minSoFar) or keep a parallel min stack that only pushes when the min changes.",
    depth: "core",
    whyItMatters:
      "Min stack is the 'augment the data structure' interview. Anyone can get-min in O(n) by scanning. O(1) getMin plus O(1) push/pop is the constraint. The idea — cache the min at each depth — reappears in max-stack, min-queue (need two stacks or a deque), and in 'design a stack with increment on the bottom k.'",
    theory: [
      "When you push x, the min of the whole stack becomes min(x, previousMin). Store that beside x. pop throws away x and its cached min; the new top already knows the min of the remaining prefix. getMin is top.min. No scan.",
      "Space-optimized: a second stack of mins that pushes only when x is ≤ current min, and pops only when the popped value equals that min. Ties need ≤ so duplicate mins each have a slot (or store a count). The pair method is easier to get right in an interview.",
      "You cannot do this with only the values and O(1) extra memory in the comparison model if you also need arbitrary pops — the cached mins are Θ(n) in the worst case. Saying that shows you understand the lower bound.",
    ],
    howItWorks: [
      "Represent each node as {val, min}.",
      "push(x): min = stack empty ? x : Math.min(x, peek().min); stack.push({val: x, min}).",
      "pop / top: standard stack. getMin: peek().min.",
      "Two-stack variant: if x <= minStack.peek(), minStack.push(x). On pop, if val === minStack.peek(), minStack.pop().",
    ],
    whenToUse: [
      "Need current min (or max) of a stack in O(1) with stack semantics.",
      "As a teaching step toward monotonic structures and min-queues.",
    ],
    whenNotToUse: [
      "You need min of a sliding window — use a monotonic deque, not a min stack.",
      "Random deletes in the middle — this is not a heap.",
    ],
    complexity: {
      time: "O(1) push, pop, top, getMin",
      space: "O(n)",
    },
    interviewTips: [
      "Write the pair version first. Mention the two-stack space trick if they ask.",
      "Follow-up: MaxStack (harder if they want O(1) popMax — then you need a list + tree/map of positions).",
    ],
    pitfalls: [
      "Using < instead of ≤ on the min stack and losing a duplicate min on pop.",
      "Computing getMin by scanning 'just this once' and then leaving it that way.",
      "Empty-stack getMin — define the contract (throw vs sentinel).",
    ],
    practiceIdeas: [
      "Min Stack (LeetCode 155).",
      "Max stack with popMax.",
      "Queue with getMin using two min-stacks (queue-via-stacks).",
    ],
    related: [
      "valid-parentheses",
      "monotonic-stack",
      "monotonic-queue",
      "heap-insert-extract",
    ],
  },
  {
    slug: "monotonic-stack",
    track: "dsa",
    category: "Stacks",
    title: "Monotonic Stack",
    summary:
      "Keep the stack strictly increasing or decreasing so the top is the nearest relevant neighbor. One pass computes nearest-greater/smaller for every index.",
    depth: "core",
    whyItMatters:
      "Once you name the pattern, a dozen 'hard' problems collapse. Next greater is one use. Histogram rectangle, trapping rain water, remove-k-digits, sum of subarray minimums, and asteroid collision are the same while-loop with a different payload. Interviewers listen for the invariant: 'the stack is decreasing, so everyone below the top is even larger / smaller.'",
    theory: [
      "A monotonic decreasing stack of indices means A[s0] > A[s1] > … > A[top]. The first index to the left that is greater than A[i] is the current top after you have popped everything ≤ A[i] (depending on strictness). You get left-neighbor information as you push, and right-neighbor information as you pop (the current i is the first breaker to the right).",
      "Strict vs non-strict matters for equal values. Sum of subarray minimums needs a consistent tie-break (e.g. next strictly smaller, previous smaller-or-equal) so each position's contribution is counted once. Say the tie rule before you code.",
      "A monotonic stack is not a min-stack: you are allowed to pop values that are not the global min; you are maintaining order, not a cached aggregate of the whole history.",
    ],
    howItWorks: [
      "Choose increasing vs decreasing and strict vs not, from the neighbor you need.",
      "For each i, while the stack is nonempty and the monotonicity would break, pop and record 'i is the right-neighbor of that index.'",
      "The new top (if any) is the left-neighbor of i. Push i.",
      "Flush the stack at the end against a sentinel (n, or 0 height) so leftover bars still get a right boundary.",
    ],
    whenToUse: [
      "Nearest greater/smaller on left or right for all i.",
      "Problems whose answer is a function of those four neighbors (widths, spans, contributions).",
    ],
    whenNotToUse: [
      "You need the k-th greater, not the nearest — that is a different query (BIT/segment tree).",
      "Sliding window max — a deque (two ends) is the right monotonic structure.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(n)",
    },
    interviewTips: [
      "Draw the stack after each index on a 6-element example. That picture is the interview.",
      "Sentinel 0 at the end of a histogram saves a flush loop.",
    ],
    pitfalls: [
      "Storing values when you need widths (must store indices).",
      "Inconsistent handling of equals, double-counting or dropping subarrays.",
      "Using a queue by accident and losing LIFO neighbor-ness.",
    ],
    practiceIdeas: [
      "Next greater / previous smaller for all i.",
      "Sum of subarray minimums.",
      "Remove k digits to form the smallest number (monotonic increasing stack).",
    ],
    related: [
      "next-greater-element",
      "largest-rectangle-histogram",
      "monotonic-queue",
      "two-pointers",
    ],
  },
  {
    slug: "monotonic-queue",
    track: "dsa",
    category: "Stacks",
    title: "Monotonic Queue",
    summary:
      "A deque kept decreasing (or increasing) so the front is the current window's max (or min). Push at the back with evictions; pop the front when it leaves the window.",
    depth: "next",
    whyItMatters:
      "Sliding window maximum is the textbook monotonic-queue problem. A heap of window values is O(n log n) and needs lazy deletion. The deque is O(n). You will also use this for DP optimizations (sliding-window maximum of dp[i-k..i-1]) that interviewers call 'monotonic queue optimization' on harder rounds.",
    theory: [
      "Store indices in a deque. The corresponding values are strictly decreasing from front to back for a max-queue. When a new i arrives, pop from the back while A[back] ≤ A[i] — those can never be the max while i is in the window, because i is later and at least as large. Then push i. Pop from the front while the index is outside [i-k+1, i]. The front is the max.",
      "This is not a FIFO queue of all window elements; most elements are discarded early. It is a queue only in the sense that the surviving candidates are in index order, so the oldest (and largest, for a max-queue) sits at the front.",
      "Min-queue is the same with ≥. Two monotonic deques give you min and max of the window at once (longest subarray with max-min ≤ limit).",
    ],
    howItWorks: [
      "deque empty. For i in 0..n-1:",
      "While deque is nonempty and A[deque.back] <= A[i], pop back.",
      "Push i. While deque.front <= i-k, pop front.",
      "If i >= k-1, record A[deque.front] as the window max.",
    ],
    whenToUse: [
      "Min or max of every window of size k.",
      "DP transitions of the form dp[i] = A[i] + max(dp[i-k..i-1]).",
      "Longest window with max - min ≤ limit.",
    ],
    whenNotToUse: [
      "You need the full sorted window — use a multiset / two heaps.",
      "Fixed aggregate like sum — a running sum is enough.",
    ],
    complexity: {
      time: "O(n) — each index enters and leaves the deque once",
      space: "O(k)",
    },
    interviewTips: [
      "Name it 'decreasing deque of indices.' Then write the three while/push lines.",
      "If they accept O(n log n), a heap with lazy delete also works; still mention the deque.",
    ],
    pitfalls: [
      "Storing values and then not knowing when the front left the window.",
      "Using < instead of ≤ and letting an older equal hide a newer one that should win on eviction.",
      "Emitting an answer before the first window is full.",
    ],
    practiceIdeas: [
      "Sliding Window Maximum.",
      "Sliding window minimum, then longest subarray with max-min ≤ limit.",
      "Jump game DP with a monotonic queue (harder follow-up).",
    ],
    related: [
      "sliding-window-max",
      "sliding-window-fixed",
      "monotonic-stack",
      "deque",
    ],
  },
  {
    slug: "largest-rectangle-histogram",
    track: "dsa",
    category: "Stacks",
    title: "Largest Rectangle in Histogram",
    summary:
      "For each bar, the largest rectangle with that bar as the shortest uses the nearest shorter bars on left and right as exclusive walls. One monotonic stack finds both.",
    depth: "next",
    whyItMatters:
      "This is the classic hard monotonic-stack problem and the engine inside 'maximal rectangle in a binary matrix' (treat each row as a histogram of consecutive ones). If you can explain the width = right[i] - left[i] - 1 picture, you own the problem. Brute force over all i,j pairs of bars is O(n²) and is the wrong finish.",
    theory: [
      "The largest rectangle has some bar as its shortest (the bottleneck height). For bar i, extend left until a strictly shorter bar, extend right until a strictly shorter bar. Area = height[i] * (R - L - 1). Take the max over i. Computing L and R with nested loops is O(n²); a monotonic increasing stack computes them in O(n).",
      "Scan left to right, stack of increasing heights. When you pop j because height[i] is smaller, i is j's right wall. The new top is j's left wall. A sentinel bar of height 0 at the end pops everyone. Be precise about strictness so equal-height bars do not double-count or leave a zero width.",
      "Maximal rectangle in a matrix: for each row r, hist[c] = hist[c]+1 if matrix[r][c] is 1 else 0. Run histogram on hist. That is O(rows * cols).",
    ],
    howItWorks: [
      "Append a 0-height sentinel. stack = [-1] as a left sentinel index.",
      "For i from 0 to n (inclusive, sentinel): while height[i] < height[stack.top], pop j, width = i - stack.top - 1, area = height[j] * width.",
      "Push i.",
      "Track the max area.",
    ],
    whenToUse: [
      "Largest rectangle under a histogram.",
      "Maximal rectangle of 1s in a binary matrix.",
    ],
    whenNotToUse: [
      "Largest square (use DP on consecutive 1s — different recurrence).",
      "3D versions — not this stack.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(n)",
    },
    interviewTips: [
      "Draw one bar and its left/right smaller walls. Then say you do that for every bar via a stack.",
      "If they give a matrix, reduce to n histogram calls.",
    ],
    pitfalls: [
      "Width = i - j instead of i - newTop - 1.",
      "Forgetting the 0 sentinel, so a rising staircase never pops.",
      "Using ≤ vs < so equal bars steal each other's width.",
    ],
    practiceIdeas: [
      "Largest Rectangle in Histogram.",
      "Maximal Rectangle in a binary matrix.",
      "Compute left-smaller and right-smaller arrays explicitly, then areas — good for debugging the one-pass.",
    ],
    related: [
      "monotonic-stack",
      "next-greater-element",
      "sliding-window-max",
    ],
  },
  {
    slug: "sliding-window-max",
    track: "dsa",
    category: "Stacks",
    title: "Sliding Window Maximum",
    summary:
      "The max of every contiguous window of size k, in O(n), using a decreasing deque of candidate indices.",
    depth: "next",
    whyItMatters:
      "This problem is how interviewers test whether you know the monotonic deque. It is also a building block: once you can emit the max stream, you can solve related window-constraint problems and some DP. Heap solutions pass small tests and fail the complexity conversation.",
    theory: [
      "Inside a window, if A[j] <= A[i] and j < i, then j can never be the max while i is still in the window. Discard j. The deque of survivors is decreasing in value and increasing in index. The front is the max. When the front index ages out of the window, pop it.",
      "Output length is n-k+1. You start emitting at i = k-1. The algorithm is online: you can stream A[i] without storing the whole array if you keep the last k values or the deque plus enough to know the values at those indices.",
    ],
    howItWorks: [
      "Use the monotonic-queue loop: evict back losers, push i, evict front out-of-window, emit front value when i >= k-1.",
      "Return the array of emitted maxima.",
    ],
    whenToUse: [
      "Every window's max or min.",
      "Streaming 'max of last k measurements.'",
    ],
    whenNotToUse: [
      "k = 1 (the array itself) or k = n (a single global max).",
      "You need the second max of each window — store more than the front, or use a multiset.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(k)",
    },
    interviewTips: [
      "If you only remember heaps, say O(n log k) first, then upgrade to the deque when they ask for linear.",
    ],
    pitfalls: [
      "Emitting n maxima instead of n-k+1.",
      "Comparing values at the front without checking the index is still inside the window.",
    ],
    practiceIdeas: [
      "LeetCode 239 Sliding Window Maximum.",
      "Sliding window median (two heaps — contrast why a deque is not enough).",
      "Max of window on a circular array (follow-up).",
    ],
    related: [
      "monotonic-queue",
      "sliding-window-fixed",
      "median-stream",
      "deque",
    ],
  },
  {
    slug: "bfs-dfs-iterative",
    track: "dsa",
    category: "Stacks",
    title: "BFS with a Queue, DFS with a Stack",
    summary:
      "The same graph walk, different frontier: a queue expands level by level; a stack (or the call stack) dives deep. Know what each visits first.",
    depth: "core",
    whyItMatters:
      "Interviews often ask you to rewrite a recursive DFS as an explicit stack, or to explain why BFS finds shortest paths in unweighted graphs and DFS does not. The data structure is the algorithm. If you use a stack and call it BFS, you will get a spanning tree, not distances.",
    theory: [
      "Both algorithms take a node from a frontier, mark it, and push unseen neighbors. Queue = FIFO = BFS = nodes in order of distance from the source (for unweighted edges). Stack = LIFO = DFS = a preorder-like walk that can go down a long path before siblings. Recursion is DFS with the language's call stack; the explicit stack is what you write when depth can be 10^5.",
      "BFS distance is settled the first time you see a node — mark on enqueue to avoid exploding the queue with duplicates. DFS finishing times and color states (white/gray/black) are what detect directed cycles and produce a topological order. Do not mix the marking conventions blindly.",
      "On trees, BFS is level order; DFS is pre/in/post depending on when you record the node. On grids, BFS is the usual shortest path in a maze; DFS is flood fill / islands. Same four-direction edges, different frontier.",
    ],
    howItWorks: [
      "BFS: queue ← source; mark source. While queue: pop front u; process u; for each unseen neighbor v, mark v, set dist[v]=dist[u]+1, push back.",
      "Iterative DFS: stack ← source. While stack: pop u; if u seen continue; mark u; push neighbors (often in reverse so the first neighbor is processed first).",
      "Recursive DFS: mark u; for each v, if unseen dfs(v).",
      "State the mark-on-push vs mark-on-pop choice; for BFS prefer mark-on-push.",
    ],
    whenToUse: [
      "BFS: shortest path on unweighted graphs, level-order, 'minimum moves.'",
      "DFS: connectivity, cycle detection, topo sort, flood fill, path existence.",
    ],
    whenNotToUse: [
      "Weighted shortest paths — BFS is wrong; use Dijkstra or 0-1 BFS.",
      "Need a specific traversal order on a BST (inorder) — use the tree-traversal stack recipe, not a generic graph DFS.",
    ],
    complexity: {
      time: "O(V + E)",
      space: "O(V) for the frontier and visited",
    },
    interviewTips: [
      "If the problem says 'minimum number of steps' on a grid or word ladder, reach for BFS before DFS + memo.",
      "If they forbid recursion, write the explicit stack and talk about mark timing.",
    ],
    pitfalls: [
      "Using a stack and claiming shortest paths.",
      "Not marking BFS nodes on enqueue → exponential queue on grids.",
      "Recursive DFS on a 10^5 chain → stack overflow; switch to iterative.",
    ],
    practiceIdeas: [
      "Level-order tree traversal (BFS) vs preorder (DFS stack).",
      "Number of islands (DFS flood) and nearest 0 in a matrix (multi-source BFS).",
      "Word ladder (BFS on implicit graph).",
    ],
    related: [
      "bfs",
      "dfs",
      "deque",
      "circular-queue",
      "tree-traversals",
    ],
  },
  {
    slug: "circular-queue",
    track: "dsa",
    category: "Stacks",
    title: "Circular Queue",
    summary:
      "A fixed array with head and tail indices modulo capacity. Enqueue/dequeue O(1) without shifting, used in buffers and BFS pools.",
    depth: "next",
    whyItMatters:
      "Design Circular Queue is a common LLD-flavored coding question. It tests modulo arithmetic, the full vs empty ambiguity (when head == tail), and whether you waste one slot or keep a size counter. Ring buffers in producers/consumers are this structure.",
    theory: [
      "Store elements in A[0..cap-1]. head is the next dequeue index, tail is the next enqueue index (or the reverse convention — pick one). Enqueue writes A[tail] and tail = (tail+1) % cap. Dequeue reads A[head] and head = (head+1) % cap.",
      "Empty is head == tail if you waste a slot, or size == 0 if you store a count. Full is (tail+1)%cap == head (wasted slot) or size == cap. The wasted-slot scheme avoids a boolean; the size scheme uses the full array. Interviews accept either if you explain the invariant.",
      "A circular deque (both ends) adds enqueueFront / dequeueRear with the same modulo, decrementing indices with (i-1+cap)%cap. That is the Design Circular Deque problem.",
    ],
    howItWorks: [
      "Pick capacity, allocate the array, head = tail = 0, size = 0.",
      "enQueue(x): if size == cap return false; A[tail] = x; tail = (tail+1)%cap; size++.",
      "deQueue(): if size == 0 return false; head = (head+1)%cap; size--.",
      "Front/Rear: peek A[head] or A[(tail-1+cap)%cap]. Empty/Full from size.",
    ],
    whenToUse: [
      "Fixed-size buffers, IO rings, bounded BFS (rarely), producer-consumer queues.",
      "Interview 'design a queue with an array.'",
    ],
    whenNotToUse: [
      "Unbounded growth — use a linked list or a growable deque.",
      "Need middle inserts — wrong structure.",
    ],
    complexity: {
      time: "O(1) all operations",
      space: "O(capacity)",
    },
    interviewTips: [
      "State the empty/full invariant in a comment before you write modulo code.",
      "Rear is not A[tail]; tail is the next write. Rear is the last written slot.",
    ],
    pitfalls: [
      "Using % without adding cap on decrement — negative modulo in some languages.",
      "Confusing full and empty when you do not store size and do not waste a slot.",
      "Returning true on enqueue into a full buffer.",
    ],
    practiceIdeas: [
      "Design Circular Queue (LeetCode 622).",
      "Design Circular Deque (641).",
      "Implement a ring buffer that overwrites the oldest on overflow (different contract — ask).",
    ],
    related: [
      "deque",
      "bfs-dfs-iterative",
      "bfs",
    ],
  },
  {
    slug: "deque",
    track: "dsa",
    category: "Stacks",
    title: "Deque (Double-Ended Queue)",
    summary:
      "Push and pop at both ends in O(1). The structure behind monotonic queues, 0-1 BFS, and sliding-window algorithms.",
    depth: "next",
    whyItMatters:
      "A deque is the data structure people mean when they say 'queue' and then pop from the back. Monotonic window maxima, 0-1 BFS (push front on weight-0 edges), and palindrome checks (pop both ends) all need it. If you only have a stack and a queue, you will fake a deque with a list and accidentally make an O(n) front pop.",
    theory: [
      "Abstractly: insertFront, insertBack, deleteFront, deleteBack, peek both ends — all amortized O(1). Implementations: doubly linked list (true O(1), poor cache), circular array (true O(1) with a cap or amortized grow), or two stacks (awkward for both-end pops).",
      "Algorithms that need a deque are not 'nice to have': 0-1 BFS is incorrect as a plain FIFO if you append 0-weight edges at the back (they should be processed before existing 1-weight ones). A monotonic max structure must evict from the back and the front. Know when the second end is required.",
      "In Java, ArrayDeque is the default queue and stack; in Python, collections.deque; in C++, std::deque. In an interview in a language without one, say you assume a deque or implement it with a doubly linked list / circular buffer.",
    ],
    howItWorks: [
      "Circular-array deque: head/tail indices modulo cap, grow by allocating 2× and laying out elements linearly when full.",
      "Linked-list deque: dummy head/tail like the LRU list; add/remove at either dummy.",
      "Use it: sliding-window max (pop back losers, pop front stale); 0-1 BFS (push front if dist shrinks by 0, push back if +1).",
    ],
    whenToUse: [
      "Need both-end access in O(1).",
      "Monotonic queues, 0-1 BFS, palindrome two-end consume, work-stealing queues.",
    ],
    whenNotToUse: [
      "Only one end — a stack or queue is a clearer type.",
      "Need random access plus both-end inserts at huge sizes — a deque array is OK; a list is not for indexing.",
    ],
    complexity: {
      time: "O(1) end operations (amortized if growing)",
      space: "O(n)",
    },
    interviewTips: [
      "If you write `shift()` on a JS array as your queue, mention it is O(n) and you would use a deque in production.",
      "For 0-1 BFS, say 'deque, not queue' so they know you know.",
    ],
    pitfalls: [
      "Using an array front-delete in a tight loop — hidden O(n²).",
      "Treating a deque as a min-heap. Order is insertion/eviction, not value order, unless you maintain monotonicity yourself.",
    ],
    practiceIdeas: [
      "Implement a deque with a circular array.",
      "Sliding window max; 0-1 BFS on a grid with two edge weights.",
      "Palindrome check by popping both ends.",
    ],
    related: [
      "circular-queue",
      "monotonic-queue",
      "zero-one-bfs",
      "lru-cache",
      "bfs",
    ],
  },
];
