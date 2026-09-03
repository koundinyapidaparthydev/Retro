import { problem, type ProblemCard } from "./types";

export const PACK: Record<string, ProblemCard> = {
  "bubble-sort": problem(
    "An array of numbers. You may only swap two neighbors at a time.",
    "Put the values in non-decreasing order. After each full pass, the next-largest leftover should already sit at the end.",
    "[3, 1, 2] → swap 3 with 1 → [1, 3, 2] → swap 3 with 2 → [1, 2, 3]. Two neighbor swaps.",
    [
      "Sort by swapping adjacent out-of-order pairs.",
      "How many swaps did you do? What does that count mean?",
      "The array is already sorted. Can you stop after one pass?",
    ],
  ),
  "selection-sort": problem(
    "An array of numbers. Writes are expensive; reads are cheap.",
    "Sort it with as few writes as you can: for each index, put the right value there once.",
    "[4, 1, 3, 2] → swap 4 with 1 → [1, 4, 3, 2] → next min 2 swaps into index 1 → [1, 2, 3, 4].",
    [
      "For each seat, find the smallest remaining value and put it there.",
      "How many swaps do you need in the worst case?",
      "Equal keys get swapped past each other. Does the prompt require original order?",
    ],
  ),
  "insertion-sort": problem(
    "A short array, or one that is already almost in order. Values can be treated as arriving one by one.",
    "Keep a growing sorted prefix and slide each new value left into its hole. Return the sorted array.",
    "[3, 1, 2] → insert 1 before 3 → [1, 3, 2] → slide 2 between them → [1, 2, 3].",
    [
      "Sort this nearly-sorted list.",
      "Each item is at most k seats from home. How does the time change?",
      "Do the same on a singly linked list.",
    ],
  ),
  "merge-sort": problem(
    "An unsorted array of numbers. You may use a second array of the same length.",
    "Return the values in non-decreasing order. Equal keys must keep their original order, and a reversed input must not get slower than a random one.",
    "[4, 1, 3, 2] → [1, 2, 3, 4]. Halves [4, 1] and [3, 2] become [1, 4] and [2, 3], then one combined list.",
    [
      "Sort this array. Ties must keep their original order.",
      "Count how many pairs are out of order while you sort.",
      "Now the input is a linked list — still sort it without a second array of values.",
    ],
  ),
  "quick-sort": problem(
    "An array of numbers. You may rearrange it in place; extra memory should stay small.",
    "The values in non-decreasing order. After you pick one splitter value, everything smaller sits left of it and everything larger sits right.",
    "[3, 7, 1, 4] with splitter 3 → [1, 3, 7, 4], then each side is finished the same way → [1, 3, 4, 7].",
    [
      "Sort this array in place.",
      "The array is already sorted. What goes wrong if the splitter is always the first cell?",
      "Same splitter idea, but return only the k-th largest — not a full sort.",
    ],
  ),
  "randomized-quicksort": problem(
    "An array you will sort in place. The input might be sorted, reversed, or chosen by someone who knows your usual splitter rule.",
    "A sorted array whose runtime does not collapse just because of the input order. Every input should be fast in expectation.",
    "[1, 2, 3, 4, 5] with a random splitter, not always 1. Expected work stays about n log n, not 15 pairwise passes.",
    [
      "Sort in place so a sorted or reversed input is not a disaster.",
      "Expected n log n on every array — not 'average over random arrays.' What did you change?",
      "They want a hard cap, not a lucky splitter. What do you switch to when the tree gets too deep?",
    ],
  ),
  "three-way-quicksort": problem(
    "An array whose values are only 0, 1, and 2 — or many duplicates of a few keys.",
    "The same values grouped in order: all 0s, then 1s, then 2s. One pass, in place. Do not re-process the equals.",
    "[2, 0, 2, 1, 1, 0] → [0, 0, 1, 1, 2, 2].",
    [
      "Rearrange 0/1/2 in one pass with constant extra space.",
      "Ten million records, but the key is a status enum with three values. How do you sort?",
      "Keys are all distinct. Is the extra third bucket still worth it?",
    ],
  ),
  "heap-sort": problem(
    "An array you must sort in place. You get only a handful of extra variables, and the time must stay n log n even on a sorted or reversed input.",
    "The same numbers in non-decreasing order. After each extraction the next-largest value sits in the shrinking suffix.",
    "[3, 1, 4, 2] → [1, 2, 3, 4]. First extraction parks 4 at the end; then 3, then 2.",
    [
      "Sort in place with a hard n log n cap — no quadratic cliff.",
      "You already have the parent-beats-children layout. How do you emit the sorted array?",
      "Why is building that layout linear, not n inserts?",
    ],
  ),
  "counting-sort": problem(
    "n integers whose keys all lie in a small known range, say 0..k. Some items carry extra data (a name with a score).",
    "The items in order by that integer key. Equal keys must keep their original order.",
    "scores [2, 0, 2, 1] with names A, B, C, D → B, D, A, C. The two 2s stay A before C.",
    [
      "Sort these ages / grades / bytes. The range is tiny.",
      "Items have payloads. Equal scores must keep arrival order.",
      "Keys can be negative. How do you index the tallies?",
    ],
  ),
  "radix-sort": problem(
    "n integers, each up to 32 bits — or equal-length digit strings.",
    "The numbers in increasing order. Digit width is small, so you should beat a comparison sort.",
    "[170, 45, 75, 90] → [45, 75, 90, 170].",
    [
      "Sort these 32-bit IDs faster than n log n comparisons.",
      "Each digit pass must keep earlier digit order. What happens if a pass is unstable?",
      "The integers are signed. Where do the negatives go?",
    ],
  ),
  "bucket-sort": problem(
    "n real numbers spread fairly evenly in a known interval, such as [0, 1).",
    "The numbers in increasing order. If the spread is uniform, expected time should be linear.",
    "[0.42, 0.32, 0.23, 0.52, 0.82] → [0.23, 0.32, 0.42, 0.52, 0.82].",
    [
      "Sort uniform random floats in a known range.",
      "What if almost every value piles into one bin?",
      "The keys are integers in 0..100. Is a bin per key simpler?",
    ],
  ),
  "cycle-sort": problem(
    "An array of n integers. Each value is supposed to sit in 1..n, but one number is missing, one is duplicated — or you need the first missing positive.",
    "The missing number (or every duplicate). Use the array itself as seats: value v belongs at index v-1. No extra set.",
    "[3, 1, 3, 4] for range 1..4 → 3 sits twice, 2 is missing. Return 2.",
    [
      "Array of n values in 1..n. Find the missing one, in place.",
      "Find every value that appears twice.",
      "First missing positive. Negatives and zeros are not seats.",
    ],
  ),
  "next-greater-element": problem(
    "An array of temperatures (or prices). For each day you may look only to the right.",
    "For every index, the first later value that is strictly larger — or -1 if none exists.",
    "[2, 1, 2, 4, 3] → [4, 2, 4, -1, -1].",
    [
      "Next warmer day for each temperature. Return the wait in days.",
      "The array is circular — wrap once.",
      "Now previous greater on the left as well.",
    ],
  ),
  "valid-parentheses": problem(
    "A string of brackets: ( ) [ ] { }.",
    "Is every opener closed by the matching type, in the right nesting order?",
    "([{}]) is valid. ([)] is not — they cross. (() is not — one left open.",
    [
      "Is this bracket string valid?",
      "Longest valid parentheses substring.",
      "Delete the fewest brackets so the rest is valid.",
    ],
  ),
  "min-stack": problem(
    "A stack of integers. You must support push, pop, top, and 'what is the current minimum?'",
    "All four operations in O(1). Scanning the whole stack for the min is too slow.",
    "push 3, push 5, push 2, getMin → 2. pop, getMin → 3.",
    [
      "Design a stack with O(1) getMin.",
      "Two 2s are on the stack. You pop one. What is getMin?",
      "Same idea, but also popMax in a later follow-up.",
    ],
  ),
  "monotonic-stack": problem(
    "An array. For every index you need the nearest smaller (or larger) neighbor on the left and/or the right.",
    "Those neighbor indices for every position, in one left-to-right pass — not a nested scan.",
    "[2, 1, 5, 6, 2, 3], previous smaller indices → [-1, -1, 1, 2, 1, 4].",
    [
      "Nearest smaller to the left and right for every bar.",
      "Sum of minimums of every subarray.",
      "Remove k digits so the remaining number is the smallest possible.",
    ],
  ),
  "monotonic-queue": problem(
    "A stream of numbers and a window width k. You need the window extreme after every arrival.",
    "The max (or min) of the last k values, in total linear time — not a heap per window.",
    "[1, 3, -1, -3, 5], k=3 → window maxima 3, 3, 5.",
    [
      "Max of the last k measurements, online.",
      "Longest stretch whose max − min is at most limit.",
      "DP of the form dp[i] = A[i] + max(dp[i-k..i-1]).",
    ],
  ),
  "largest-rectangle-histogram": problem(
    "A row of bars. Bar i has height h[i] and width 1. A rectangle must sit on the baseline and stay under the bars.",
    "The largest area of any such rectangle.",
    "heights [2, 1, 5, 6, 2, 3] → 10 (the 5×2 block sitting on the 5 and the 6).",
    [
      "Largest rectangle under this histogram.",
      "A binary matrix of 0/1. Largest rectangle of 1s.",
      "What is the width for bar i once you know the nearest shorter walls?",
    ],
  ),
  "sliding-window-max": problem(
    "An array and a window size k. The window slides one step at a time and must stay contiguous.",
    "The maximum value inside each window. There are n−k+1 answers.",
    "[1, 3, -1, -3, 5, 3, 6, 7], k=3 → [3, 3, 5, 5, 6, 7].",
    [
      "Max of every window of size k, in linear time.",
      "Same question for the minimum.",
      "You only have a heap. What complexity do you get, and can you beat it?",
    ],
  ),
  "bfs-dfs-iterative": problem(
    "A graph or grid. You must walk every reachable cell. Recursion depth might be 10^5, so the call stack may explode.",
    "Visit order if you expand nearest-first (fewest hops) versus dive-deep-first. For the nearest-first walk, also the hop distance from the start.",
    "Start A with edges A→B, A→C, B→D. Nearest-first visits A, B, C, then D; hop count to D is 2. Dive-deep may go A, B, D, then C.",
    [
      "Minimum steps in a maze. Walls are #.",
      "Rewrite the recursive flood-fill with an explicit stack.",
      "Number of islands, then nearest 0 in a matrix (many starts at once).",
    ],
  ),
  "circular-queue": problem(
    "A fixed-length buffer of capacity k. Producers enqueue, consumers dequeue. You may not shift the whole array.",
    "Support enqueue, dequeue, front, rear, isEmpty, isFull — all O(1).",
    "cap 3: enq 1, enq 2, enq 3, deq → 1, enq 4. Buffer holds 2, 3, 4. The next enqueue fails (full).",
    [
      "Design a ring buffer with a fixed array.",
      "When head equals tail, is it empty or full? State the invariant.",
      "Same structure, but insert and delete at both ends.",
    ],
  ),
  "deque": problem(
    "A sequence that must accept inserts and deletes at both the front and the back.",
    "All four end operations in O(1). Popping the front of a plain dynamic array is not O(1).",
    "pushBack 1, pushFront 2, popBack → 1, popFront → 2. The sequence is empty.",
    [
      "Implement a double-ended queue.",
      "Edges weigh only 0 or 1. Where do you insert the 0-weight neighbor?",
      "Check a palindrome by eating both ends.",
    ],
  ),
  heapify: problem(
    "An array of n numbers already in memory. Index i’s children sit at 2i+1 and 2i+2. You want every parent to beat both children.",
    "Rearrange the array in place so that parent-child rule holds. Building it should be linear, not n single inserts.",
    "[3, 1, 6, 5, 2, 4] as a max-tree → [6, 5, 4, 1, 2, 3] is one valid layout. Root 6 is the max; 5 and 4 beat their children.",
    [
      "Turn this array into a parent-beats-children tree in linear time.",
      "Why is n inserts the wrong build?",
      "Write the sink loop. Where is the last parent index?",
    ],
  ),
  "heap-insert-extract": problem(
    "A bag of jobs, each with a priority. You repeatedly insert a new job or take out the current best.",
    "insert and extract-best in O(log n), peek-best in O(1).",
    "insert 4, 1, 7. peek → 7. extract → 7, then peek → 4.",
    [
      "Implement a priority bag: push, pop-best, peek.",
      "A node’s best score improved. You cannot move the old entry. What do you push, and what do you skip on pop?",
      "Empty pop — throw or return a sentinel?",
    ],
  ),
  "top-k": problem(
    "n numbers and an integer k, with k much smaller than n. The numbers may arrive as a stream.",
    "The k largest values, or the k-th largest. Do not fully sort all n if you can help it.",
    "[3, 1, 5, 12, 2, 11], k=3 → 12, 11, 5. The 3rd largest is 5.",
    [
      "k-th largest in an array. k is much smaller than n.",
      "k most frequent words after one count pass.",
      "k closest points to the origin.",
    ],
  ),
  "median-stream": problem(
    "Numbers arrive one at a time. After each arrival you may be asked for the median so far.",
    "The median after each query: the middle value if the count is odd, the average of the two middles if even. Insert must stay fast.",
    "Stream 1, then 2, then 3 → medians 1, 1.5, 2.",
    [
      "Running median of a stream.",
      "Even count: average the two middles. Integer division is a trap.",
      "Now a sliding window of size k — you must also delete the aging value.",
    ],
  ),
  "dijkstra-heap": problem(
    "A map of cities and roads. Each road has a positive travel time. You start at city S.",
    "The cheapest travel time from S to every other city. A plain hop-count walk is wrong because roads cost different amounts.",
    "S→A=1, S→B=4, A→B=1. Best to B is 2 via A, not the direct 4.",
    [
      "Shortest time on a weighted map. All edges are positive.",
      "You push a new (time, city) pair whenever a city improves. A later pop is stale — what do you do?",
      "Some roads cost 0 or 1 only. Do you still want a priority bag?",
    ],
  ),
  huffman: problem(
    "A set of symbols and how often each appears. You will encode each symbol as a bit string. No code may be a prefix of another.",
    "An encoding that minimizes total bits (frequency × code length). Same process: minimum cost to merge files when merging a and b costs a+b.",
    "a:3, b:1, c:1 → codes a=0, b=10, c=11. Total bits 3·1+1·2+1·2 = 7. Merge cost (1+1)+(2+3) = 7.",
    [
      "Minimum cost to connect n ropes / files. Any pair may merge.",
      "Build bit codes so common letters get shorter strings.",
      "Do they want the actual 0/1 strings, or only the total cost?",
    ],
  ),
  "reverse-linked-list": problem(
    "A singly linked list of nodes, each pointing only forward.",
    "The same nodes, reversed, in place. Return the new head.",
    "1→2→3→4 → 4→3→2→1. Empty list and a single node stay themselves.",
    [
      "Reverse the list. Return the new head.",
      "Reverse only the slice from position left to right.",
      "Reverse every group of k nodes.",
    ],
  ),
  "floyd-cycle": problem(
    "A singly linked list that might loop back into an earlier node. You get only a few pointers — no extra set.",
    "Does a loop exist? If yes, which node is the entrance of the loop?",
    "1→2→3→4→2. The loop starts at 2. 1→2→3→null has no loop.",
    [
      "Does this list have a cycle?",
      "Return the node where the cycle begins.",
      "Array of n values in 1..n. One duplicate. Find it without changing the array.",
    ],
  ),
  "merge-two-lists": problem(
    "Two lists whose values are already sorted, e.g. 1→4→5 and 1→2→3→6.",
    "One sorted list made by rewiring the existing nodes, not allocating new ones. On ties, take the first list first.",
    "1→2→4 and 1→3→4 → 1→1→2→3→4→4.",
    [
      "Merge two sorted lists by pointer rewiring.",
      "One list runs out first. What happens to the leftover tail?",
      "Use this as the combine step to sort one list.",
    ],
  ),
  "merge-k-lists": problem(
    "k sorted linked lists. N nodes in total.",
    "One sorted list of all N nodes. Faster than folding them one list at a time (that costs O(Nk)).",
    "[1→4→5], [1→3→4], [2→6] → 1→1→2→3→4→4→5→6.",
    [
      "Merge k sorted lists.",
      "N vs k: can you get O(N log k)?",
      "Same idea for k sorted arrays: store (value, arrayId, index).",
    ],
  ),
  "middle-of-list": problem(
    "A singly linked list. You should not need a first pass just to count the length.",
    "The middle node. If the length is even, return the second middle.",
    "1→2→3→4→5 → 3. 1→2→3→4 → 3.",
    [
      "Return the middle node in one pass.",
      "Even length: which middle do they want?",
      "Split the list in half for a later sort — cut the first half’s last next.",
    ],
  ),
  "nth-from-end": problem(
    "A singly linked list and an integer n. You may be asked to delete that node.",
    "The n-th node from the tail, in one pass. If n equals the length, that node is the head.",
    "1→2→3→4→5, n=2 → delete 4 → 1→2→3→5.",
    [
      "Delete the n-th node from the end.",
      "n equals the length — the head goes away. What do you return?",
      "n=1: remove the tail without a stored length.",
    ],
  ),
  "list-intersection": problem(
    "Two singly linked lists. They may share a suffix of the same nodes — same objects, not just equal values.",
    "The first shared node, or null if they never join.",
    "A: 1→2→3→4, B: 9→3→4, and node 3 is the same object → return that node. Two lists that both read 1,2,3 but use different nodes → null.",
    [
      "Find the intersection node by reference, not by value.",
      "Different stem lengths. Do it in O(1) extra space.",
      "No intersection: both walkers must end at null.",
    ],
  ),
  "lru-cache": problem(
    "A cache that holds at most k key-value pairs. Both read and write must be O(1).",
    "On a full write, evict the pair that has not been read or written for the longest time.",
    "cap 2: put(1,1), put(2,2), get(1), put(3,3) → key 2 is gone. get(2) misses.",
    [
      "Design get and put in O(1).",
      "Which key leaves when the backpack is full?",
      "You updated a present key. Does it become the most recent?",
    ],
  ),
  "tree-traversals": problem(
    "A binary tree with a value on each node.",
    "The visit orders: node then children, left-node-right, children then node, and level by level left to right.",
    "Tree 1 with left 2 and right 3. Node-first [1, 2, 3]. Left-node-right [2, 1, 3]. Children-first [2, 3, 1]. Levels [[1], [2, 3]].",
    [
      "Write left-node-right iteratively — no recursion.",
      "Zigzag level order. Right-side view.",
      "Same four orders on an N-ary tree.",
    ],
  ),
  "tree-height-diameter": problem(
    "A binary tree.",
    "The height (longest root-to-leaf). Also the longest path between any two nodes — it may not go through the root.",
    "1 with left 2 and right 3; 2 has left 4. Height 2 edges. Longest path 4–2–1–3 has length 3.",
    [
      "Maximum depth of the tree.",
      "Longest path between any two nodes, in one walk.",
      "Is the tree height-balanced? Return early on the first bad node.",
    ],
  ),
  lca: problem(
    "A tree and two nodes p and q that exist in it.",
    "The deepest node that is an ancestor of both. A node is an ancestor of itself.",
    "Root 3, left 5 (children 6 and 2), right 1. p=6, q=2 → 5. p=5, q=1 → 3.",
    [
      "Lowest common ancestor in a binary tree.",
      "The tree is a BST. Walk from the root using key order.",
      "Distance between p and q via that ancestor.",
    ],
  ),
  "validate-bst": problem(
    "A binary tree of numbers.",
    "Is every node in the left subtree < the node and every node on the right > the node — not just the two children?",
    "10 with left 5 and right 15, and 15 has left 6 → invalid (6 sits on the right of 10). 2 with left 1 and right 3 → valid.",
    [
      "Is this a valid binary search tree?",
      "Why is 'left child < node < right child' not enough?",
      "Two nodes are swapped. Recover the tree.",
    ],
  ),
  "kth-smallest-bst": problem(
    "A binary search tree and a 1-based integer k.",
    "The k-th smallest key. Stop once you have seen k nodes in sorted order — do not dump the whole tree.",
    "Tree 3 with left 1 (right child 2) and right 4. k=1 → 1. k=3 → 3.",
    [
      "k-th smallest key in a BST.",
      "Many queries. Each node stores its subtree size. Walk down in O(h).",
      "k-th largest — reverse the visit order.",
    ],
  ),
  "serialize-tree": problem(
    "A binary tree. You must write it to a string and later rebuild the exact same shape and values.",
    "A pair of functions encode / decode. Null children must be recorded so the shape is unique.",
    "1 with left 2 and right 3; 3 has children 4 and 5. One valid encoding: 1,2,#,#,3,4,#,#,5,#,#.",
    [
      "Encode and decode a binary tree.",
      "Empty tree. Negative values. Multi-digit values.",
      "The tree is a BST. Can you drop the null markers?",
    ],
  ),
  "path-sum": problem(
    "A binary tree of integers and a target sum.",
    "Does any root-to-leaf path add to the target? Follow-up: count every downward path (any start, any end) that adds to the target.",
    "5 with left 4 (left 11) and right 8. Target 20 → yes (5-4-11). Target 13 → yes (5-8).",
    [
      "Root-to-leaf path that sums to target?",
      "List every such root-to-leaf path.",
      "Count downward paths that sum to target — not only from the root.",
    ],
  ),
  "max-path-sum": problem(
    "A binary tree of integers. Values may be negative. A path is any node-to-node chain; it may bend and need not go through the root.",
    "The largest sum of node values on any path. A single node is a valid path.",
    "1 with left 2 and right 3 → 6 (2-1-3). Root -10 with left 9 and right 20 (children 15, 7) → 42 (15-20-7).",
    [
      "Maximum path sum in a binary tree.",
      "All values are negative. What do you return?",
      "What do you report upward to the parent versus what you record as a bend?",
    ],
  ),
  "invert-tree": problem(
    "A binary tree.",
    "The mirror image: every left child swapped with its right child. Return the root.",
    "4 with left 2 (1, 3) and right 7 (6, 9) → 4 with left 7 (9, 6) and right 2 (3, 1).",
    [
      "Mirror the tree.",
      "Is the tree symmetric — equal to its mirror — without building the mirror?",
      "After the swap, flatten it to a right-linked list in node-first order.",
    ],
  ),
  "flatten-binary-tree": problem(
    "A binary tree. You must mutate it, not allocate a new list of nodes.",
    "A chain that uses only right pointers, in the original node-first order. Every left pointer is null.",
    "1 with left 2 (3, 4) and right 5 → 1→2→3→4→5, all lefts null.",
    [
      "Flatten the tree to a right-linked list, in place.",
      "A left-only chain — the nasty case. A right-only chain is already flat.",
      "Do it with a few pointers and no recursion stack.",
    ],
  ),
  "morris-traversal": problem(
    "A binary tree. You may not use recursion or an explicit stack. You may temporarily write a child pointer if you put it back.",
    "The left-node-right visit order, using only a handful of pointers. The tree must look unchanged when you finish.",
    "1 with left 2 (4, 5) and right 3 → [4, 2, 5, 1, 3].",
    [
      "Left-node-right with O(1) extra memory.",
      "You borrowed a right pointer as a return ticket. When do you cut it?",
      "Visit on the first pass instead, and you have node-first order.",
    ],
  ),
  trie: problem(
    "A dictionary of words. Callers will ask: is this whole word in the set? Does any word start with this prefix?",
    "insert, search, and startsWith, each in time proportional to the query length — not to how many words you stored.",
    "insert 'app', insert 'apple'. search('app') → true if you marked it a word. startsWith('appl') → true. search('appl') → false.",
    [
      "Implement a prefix dictionary: insert, search, startsWith.",
      "Replace words in a sentence with their shortest root in the dictionary.",
      "A board of letters: find every stored word that can be walked on the grid.",
    ],
  ),
};
