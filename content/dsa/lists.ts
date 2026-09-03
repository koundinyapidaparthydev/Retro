import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "reverse-linked-list",
    track: "dsa",
    category: "Linked Lists",
    title: "Reverse a Linked List",
    summary:
      "Rewire next pointers so a singly linked list runs backward. Iterative three-pointer reverse is the interview default; recursion is the follow-up.",
    depth: "core",
    whyItMatters:
      "If you cannot reverse a list you will fail every linked-list interview that follows: palindrome list, reverse-k-group, add two numbers in reverse, reorder list. The iterative version is also the cleanest demonstration of pointer rewiring — you hold prev, curr, next, and you never lose the rest of the list. Interviewers watch whether you handle empty lists, single nodes, and whether you return the new head.",
    theory: [
      "A singly linked node knows only its successor. To reverse A → B → C → null into A ← B ← C, you must save C before you point B at A, or C is unreachable. The iterative algorithm is a walk that, at each node, flips next to prev and slides the window forward. After the last node, prev is the new head.",
      "The recursive version reverses the tail first, then sets head.next.next = head and head.next = null. The new head is the old tail, bubbled up from the base case. It uses O(n) stack space and is easy to get wrong on the first node (forgetting to null its next creates a cycle). Prefer iterative in interviews unless they ask for recursive.",
      "Variants: reverse a sublist between left and right indices (dummy head + find the node before left, then reverse a count of links); reverse in groups of k (count k, reverse that slice, connect to the previous group's tail). Both are the same three-pointer flip inside a bounded range.",
    ],
    howItWorks: [
      "Set prev = null, curr = head.",
      "While curr is not null: nxt = curr.next; curr.next = prev; prev = curr; curr = nxt.",
      "Return prev.",
      "For a sublist: dummy.next = head, walk to the node before left, then run the loop right-left+1 times, reconnect the piece.",
    ],
    whenToUse: [
      "Any problem that needs the list in the opposite order or a reversed slice.",
      "Palindrome check: reverse the second half and compare.",
      "Add-two-numbers when digits are stored forward — reverse, add, reverse.",
    ],
    whenNotToUse: [
      "You may rebuild a new list from an array — correct but not what they want if they asked for O(1) extra space.",
      "Doubly linked lists can swap the head/tail and the meaning of next/prev; mention it, but code the singly case.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1) iterative; O(n) recursive stack",
    },
    interviewTips: [
      "Draw three boxes and rewrite the pointers out loud once before coding. Then type the four-line loop.",
      "Reverse-k-group is this loop plus a count. If they go there, keep a dummy and a groupPrev.",
      "Always return the new head. Mutating the old head's next to null is required, not optional.",
    ],
    pitfalls: [
      "Losing nxt, then walking curr = curr.next after you already flipped next to prev — you bounce back and loop forever.",
      "Recursive version that forgets head.next = null and creates a two-node cycle at the old head.",
      "Off-by-one when reversing a closed interval [left, right].",
    ],
    practiceIdeas: [
      "Reverse the whole list iteratively and recursively.",
      "Reverse Linked List II (sublist).",
      "Reverse Nodes in k-Group; palindrome linked list.",
    ],
    related: [
      "fast-slow-pointers",
      "middle-of-list",
      "floyd-cycle",
      "lru-cache",
    ],
  },
  {
    slug: "floyd-cycle",
    track: "dsa",
    category: "Linked Lists",
    title: "Floyd's Cycle Detection",
    summary:
      "Tortoise and hare on a linked list: they meet if and only if a cycle exists; a second same-speed walk from the head finds the entrance.",
    depth: "core",
    whyItMatters:
      "Floyd's algorithm is the O(1)-space cycle answer. The visited-set solution is correct and you should mention it, then say you can do better. Interviewers use Linked List Cycle II (return the entrance node) as the real test: detection is not enough. The same math appears in 'find the duplicate number' when the array is treated as a functional graph.",
    theory: [
      "If the list is a stem of length μ followed by a cycle of length λ, the fast pointer gains one node per step on the slow pointer once both are in the cycle. They meet after O(μ + λ) steps. If you only need a boolean, stop there.",
      "Entrance: reset one pointer to the head; move both one step at a time. They meet at the cycle start. Intuition: the meeting point is λ - (μ mod λ) into the cycle. Walking μ more steps from the meeting point, and μ steps from the head, lands on the same node — the entrance.",
      "You cannot find the entrance with a single meet without extra memory or mutation. Marking nodes (hash or a visited bit) finds it too, at the cost of O(n) space or a destroyed list. Floyd keeps the list intact.",
    ],
    howItWorks: [
      "slow = fast = head. Loop: if fast or fast.next is null, return no cycle. slow = slow.next; fast = fast.next.next. If slow === fast, break.",
      "ptr = head. While ptr !== slow: ptr = ptr.next; slow = slow.next.",
      "Return ptr as the entrance. To get cycle length, from the meet walk slow until it returns; the step count is λ.",
    ],
    whenToUse: [
      "Detect or locate a cycle in a singly linked list.",
      "Functional graphs with outdegree 1 (duplicate number, happy number).",
    ],
    whenNotToUse: [
      "You already have a visited set and O(n) space is allowed and simpler for the audience.",
      "Undirected graphs with branching — use DFS colors or Union-Find.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1)",
    },
    interviewTips: [
      "State both phases. If they only asked 'has a cycle,' still mention you know how to find the entrance.",
      "Find the Duplicate Number is Floyd: index i points to nums[i], values in 1..n guarantee a cycle because of the pigeonhole.",
    ],
    pitfalls: [
      "Starting the entrance phase from the meet without resetting one pointer to the head.",
      "Using == on nodes in a language that compares values; you need reference equality.",
      "Infinite loop if you do not check fast.next before taking two steps.",
    ],
    practiceIdeas: [
      "Linked List Cycle I (boolean) and II (entrance).",
      "Find the Duplicate Number without modifying the array.",
      "Happy Number as a cycle in a function graph.",
    ],
    related: [
      "fast-slow-pointers",
      "middle-of-list",
      "reverse-linked-list",
      "cycle-directed",
    ],
  },
  {
    slug: "merge-two-lists",
    track: "dsa",
    category: "Linked Lists",
    title: "Merge Two Sorted Lists",
    summary:
      "Walk two sorted lists with a dummy tail pointer and always attach the smaller head. The merge step of merge sort, in pointer form.",
    depth: "core",
    whyItMatters:
      "This is the linked-list analog of the merge in merge sort and the warmup for merge-k-lists. It tests dummy-head technique, tail splicing, and leftover tails. If you rebuild values into a new list you will get dinged for extra allocations when the expected solution rewires existing nodes in O(1) extra space.",
    theory: [
      "A dummy node absorbs the 'what is the head?' special case. tail starts at dummy. While both lists are non-empty, attach the smaller current node to tail.next, advance that list, and advance tail. When one list empties, attach the other in one assignment — it is already sorted. dummy.next is the merged head.",
      "The algorithm is stable if you take from list A when values are equal. That matters when you merge runs that came from a stable sort. Recursive merge (return the smaller node, whose next is merge of the rest) is pretty and uses O(n + m) stack; iterative is the interview default.",
      "Merging in-place on arrays from the front overwrites unread data; on arrays you merge from the back if there is spare room. On lists there is no overwrite problem because nodes are heap objects. Do not import the array fear here.",
    ],
    howItWorks: [
      "Create dummy and tail = dummy.",
      "While a and b are both non-null: if a.val <= b.val, tail.next = a, a = a.next; else tail.next = b, b = b.next. Then tail = tail.next.",
      "tail.next = a ?? b.",
      "Return dummy.next.",
    ],
    whenToUse: [
      "Combining two already-sorted lists.",
      "The combine step of merge-sorting a list.",
      "Merging two sorted streams you can only consume forward.",
    ],
    whenNotToUse: [
      "Unsorted lists — sort first or use a heap if you have k of them.",
      "You need random access into the merge; lists are the wrong structure.",
    ],
    complexity: {
      time: "O(n + m)",
      space: "O(1) extra iterative",
    },
    interviewTips: [
      "Use a dummy. Testing the first node with a null head is how people drop the first element.",
      "Mention stability on ties if the nodes carry satellite data.",
    ],
    pitfalls: [
      "Advancing tail before attaching, or attaching but forgetting to advance the chosen list.",
      "Forgetting the leftover tail — the merge silently drops the rest of the longer list.",
      "Creating new nodes for every value when rewiring was required.",
    ],
    practiceIdeas: [
      "Merge two sorted lists (LeetCode 21).",
      "Merge two sorted lists recursively.",
      "Sort a list by splitting with fast/slow and this merge.",
    ],
    related: [
      "merge-k-lists",
      "merge-sort",
      "two-pointers",
      "middle-of-list",
    ],
  },
  {
    slug: "merge-k-lists",
    track: "dsa",
    category: "Linked Lists",
    title: "Merge K Sorted Lists",
    summary:
      "Merge k sorted linked lists using a min-heap of current heads, or by pairwise / tournament merging. O(N log k) instead of O(Nk).",
    depth: "next",
    whyItMatters:
      "This is the standard heap-plus-lists interview and the 'k-way merge' you will reuse for sorted arrays, files, and external sort. The naive 'merge list 1 into an accumulator, then list 2, …' is O(Nk). Interviewers want the log k improvement and a clear explanation of what the heap stores.",
    theory: [
      "Let N be the total number of nodes. At all times you only care about the k current heads. A min-heap of those heads (ordered by node.val) lets you pop the global next smallest in O(log k) and push that node's successor. Each node is pushed and popped once: O(N log k).",
      "Pairwise merge: merge lists in pairs, repeat like a tournament (or recurse like merge sort over the array of lists). Each node is merged through O(log k) rounds, also O(N log k), no heap — useful if heap APIs are awkward with custom node comparators. Sequential fold (merge 1+2, then +3, …) is the O(Nk) trap.",
      "If k is huge and many lists are empty, skip them. If you may use an array, you can dump all values and sort in O(N log N), which is worse when k ≪ N and also uses extra memory for values instead of rewiring.",
    ],
    howItWorks: [
      "Push the head of every non-empty list into a min-heap keyed by val.",
      "Dummy/tail as in two-list merge. While the heap is non-empty, pop the min node, attach it to tail, and if node.next exists push node.next.",
      "Return dummy.next.",
      "Alternative: write mergeTwo, then while more than one list remains, merge them in pairs into a new array of lists.",
    ],
    whenToUse: [
      "k sorted lists, files, or streams into one sorted output.",
      "External merge sort's last phase.",
    ],
    whenNotToUse: [
      "k = 2 — just merge two lists.",
      "Lists are unsorted; heap-of-heads is meaningless.",
    ],
    complexity: {
      time: "O(N log k)",
      space: "O(k) for the heap (or O(log k) recursion for tournament merge)",
    },
    tradeoffs: [
      "Heap is simple and streaming-friendly; pairwise merge has better constants sometimes and no comparator objects.",
      "Dump-and-sort is fewer lines and worse complexity.",
    ],
    interviewTips: [
      "State N vs k. If you say O(N log N) they will ask you to do better.",
      "In languages with no heap-of-nodes, store {val, listIndex, node} tuples.",
      "This is the same pattern as 'smallest range covering elements from k lists' with a heap plus a running max.",
    ],
    pitfalls: [
      "Pushing all nodes of all lists into the heap at once — works but is O(N) memory and misses the k-head idea.",
      "Null heads crashing the comparator.",
      "Pairwise merging sequentially into one accumulator (O(Nk)).",
    ],
    practiceIdeas: [
      "Merge k sorted lists.",
      "Merge k sorted arrays with a heap of (value, arrayId, index).",
      "Smallest range covering at least one number from each of k lists.",
    ],
    related: [
      "merge-two-lists",
      "top-k",
      "heap-insert-extract",
      "merge-sort",
    ],
  },
  {
    slug: "middle-of-list",
    track: "dsa",
    category: "Linked Lists",
    title: "Middle of the List",
    summary:
      "One pass with fast and slow pointers: when fast reaches the end, slow is at the middle. No length count, no extra array.",
    depth: "core",
    whyItMatters:
      "Finding the middle is a building block, not just a toy: palindrome list, sort list (split for merge sort), reorder list (reverse second half, zipper). Interviewers expect the fast-slow one-pass. A two-pass length-then-walk is correct and you can mention it; then write the one-pass.",
    theory: [
      "fast moves twice as fast as slow. After t steps slow is at t, fast is at 2t. When 2t hits the end, t is n/2. The loop condition decides which middle you get on even n: `while (fast && fast.next)` lands slow on the second middle if you started both at head; tweaking the start or the condition gets the first middle.",
      "You cannot binary-search a list for the middle — there is no random access. Converting to an array is O(n) space and is only OK if later steps need indexing.",
    ],
    howItWorks: [
      "slow = fast = head.",
      "While fast !== null && fast.next !== null: slow = slow.next; fast = fast.next.next.",
      "Return slow.",
      "If you need the node before the middle (to split), keep prev of slow and cut prev.next.",
    ],
    whenToUse: [
      "Split a list in half for merge sort or palindrome / reorder problems.",
      "Any 'give me the midpoint in one pass' constraint.",
    ],
    whenNotToUse: [
      "You already computed the length for another reason — then walk n/2 from the head.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1)",
    },
    interviewTips: [
      "Ask which middle they want on even length. Write the loop that matches.",
      "When splitting for merge sort, if you do not cut the first half's last next, you recurse forever on the same list.",
    ],
    pitfalls: [
      "Forgetting to disconnect the two halves.",
      "Null input: return null, do not dereference.",
      "Starting fast at head.next vs head and not adjusting the even-length result.",
    ],
    practiceIdeas: [
      "Middle of the linked list (LeetCode 876).",
      "Palindrome linked list via middle + reverse.",
      "Sort list via split / merge.",
    ],
    related: [
      "fast-slow-pointers",
      "nth-from-end",
      "reverse-linked-list",
      "merge-sort",
    ],
  },
  {
    slug: "nth-from-end",
    track: "dsa",
    category: "Linked Lists",
    title: "Nth Node from the End",
    summary:
      "Advance a lead pointer n steps, then walk lead and trail together. When lead hits null, trail is n from the end — one pass, ready to delete.",
    depth: "core",
    whyItMatters:
      "Delete the nth node from the end is a top-10 linked-list question. The two-pass (count length, then walk L-n) is fine. The one-pass gap technique is what they want if they said 'one pass.' The dummy head is what saves you when n equals the length (delete the real head).",
    theory: [
      "If lead is n nodes ahead of trail, then when lead is at the end, trail is n from the end. To delete that node you actually need the node before it, so you stop when lead.next is null (or start trail at dummy so trail.next is the victim).",
      "Edge cases are the interview: n = 1 (delete tail), n = length (delete head), single-node list, invalid n. A dummy node unifies 'delete head' with every other delete: dummy.next = head, gap walk, trail.next = trail.next.next, return dummy.next.",
    ],
    howItWorks: [
      "dummy.next = head; lead = trail = dummy.",
      "Advance lead n + 1 steps so the gap is n nodes (lead is one past the eventual victim's predecessor relationship).",
      "Walk both until lead is null. Now trail.next is the nth from the end.",
      "trail.next = trail.next.next. Return dummy.next.",
    ],
    whenToUse: [
      "Read or delete the nth-from-end node in one pass.",
      "Sliding a window of width n along a list (related to fixed windows).",
    ],
    whenNotToUse: [
      "You already have a doubly linked list with a tail pointer and n = 1 — just pop the tail.",
      "Random-access arrays: the answer is index length-n.",
    ],
    complexity: {
      time: "O(L) where L is the list length",
      space: "O(1)",
    },
    interviewTips: [
      "Use a dummy. The 'delete the head' case is how most solutions fail the tests.",
      "Clarify whether n is guaranteed valid. If not, check that lead can actually move n steps.",
    ],
    pitfalls: [
      "Off-by-one on the gap: advancing n instead of n+1 when you needed the predecessor.",
      "Returning head after deleting the original head, so the caller still holds a freed/detached node.",
      "Not handling a 1-node list.",
    ],
    practiceIdeas: [
      "Remove Nth Node From End of List.",
      "Return the nth-from-end value without deleting.",
      "Remove the tail in one pass without a length (n = 1).",
    ],
    related: [
      "fast-slow-pointers",
      "middle-of-list",
      "reverse-linked-list",
      "sliding-window-fixed",
    ],
  },
  {
    slug: "list-intersection",
    track: "dsa",
    category: "Linked Lists",
    title: "Intersection of Two Lists",
    summary:
      "Find the first node shared by reference, not by value. Align the tails or use two pointers that swap lists so they meet at the intersection.",
    depth: "next",
    whyItMatters:
      "This problem is about identity, not equal values. Two lists that look like 1→2→3 and 1→2→3 may not intersect. Interviewers check whether you compare pointers, how you handle different stem lengths, and whether you use O(1) space. The elegant two-pointer switch is a favorite.",
    theory: [
      "If the lists intersect, they share a suffix — a Y shape, not an X. Once they join they cannot split in a singly linked list. So it is enough to find the first shared node.",
      "Length method: compute both lengths, advance the longer list by |n-m|, then walk together until the nodes are the same reference (or both null). Hash-set method: store one list's nodes, probe the other. Two-pointer method: pointer A walks list A then list B; pointer B walks B then A. They travel a+b nodes each and meet at the intersection (or at null if none). The extra unequal prefixes cancel.",
      "The two-pointer version does not need lengths and is O(1) space. It looks magical until you write the distances: a + c + b = b + c + a, where c is the shared suffix length.",
    ],
    howItWorks: [
      "p = headA, q = headB.",
      "While p !== q: p = p ? p.next : headB; q = q ? q.next : headA.",
      "Return p (null if no intersection).",
      "Do not compare p.val == q.val. Compare the node references.",
    ],
    whenToUse: [
      "Y-shaped list intersection by node identity.",
      "Detecting a shared suffix without mutating the lists.",
    ],
    whenNotToUse: [
      "You need the common values of two sequences — that is a set problem, not an intersection node.",
      "Lists that could cross and then diverge (not possible on singly linked lists without a cycle).",
    ],
    complexity: {
      time: "O(n + m)",
      space: "O(1) two-pointer; O(n) hash set",
    },
    interviewTips: [
      "Clarify 'same node' vs 'same value.' Draw the Y.",
      "If they allow mutation, you can temporarily cycle one list and use Floyd on the other — cute, but restore the pointer and prefer the two-pointer walk.",
    ],
    pitfalls: [
      "Comparing values.",
      "Forgetting both pointers must switch lists; switching only one desynchronizes the distances.",
      "Infinite loop if you write `p = p.next ?? headB` when p is already null the first time — use the ternary on the pointer itself so each pointer switches exactly once.",
    ],
    practiceIdeas: [
      "Intersection of Two Linked Lists (LeetCode 160).",
      "Return the intersection length (shared suffix length) as a follow-up.",
      "Detect intersection when lists may also contain cycles (much harder: find cycle entrances first).",
    ],
    related: [
      "floyd-cycle",
      "fast-slow-pointers",
      "two-pointers",
    ],
  },
  {
    slug: "lru-cache",
    track: "dsa",
    category: "Linked Lists",
    title: "LRU Cache (Pointer Rewiring)",
    summary:
      "Hash map from key to node plus a doubly linked list ordered by recency. Move-to-front on get/put is O(1) pointer rewiring; evict the tail.",
    depth: "next",
    whyItMatters:
      "LRU is the design-plus-pointers interview. People who only know HashMap + timestamp sort get O(n) evict. The expected design is a map for O(1) lookup and a doubly linked list for O(1) move-to-front and evict-least-recent. You must rewire four pointers without losing the list. This is also how real caches and LinkedHashMap access-order work.",
    theory: [
      "Each node holds key, value, prev, next. Dummy head and dummy tail sandwich the list so every real node has neighbors — no null cases on detach/attach. The map stores key → node. Recency order: head side is most recent, tail side is least recent (or the reverse; pick one and stick to it).",
      "get(key): if missing, return miss. Else detach the node from its place and attach it after the head dummy. put(key, val): if present, update value and move-to-front. If absent, create a node, attach at front, map.set. If size exceeds capacity, detach the node before the tail dummy, map.delete its key.",
      "Singly linked lists cannot detach in O(1) unless you also store the predecessor in the map. Doubly linked is the clean design. A language's OrderedDict / LinkedHashMap is this structure; in an interview, build it.",
    ],
    howItWorks: [
      "detach(node): node.prev.next = node.next; node.next.prev = node.prev.",
      "attachFront(node): splice between head dummy and head.next.",
      "get: map lookup, detach, attachFront, return value.",
      "put: update-or-insert, attachFront; while size > cap, evict tail.prev.",
    ],
    whenToUse: [
      "Fixed-capacity cache with O(1) get/put and least-recently-used eviction.",
      "Any 'move this element to the front of an order' with O(1) lookup.",
    ],
    whenNotToUse: [
      "LFU (need frequency buckets), FIFO (a simple queue), or random eviction.",
      "You only need a map and never evict.",
    ],
    complexity: {
      time: "O(1) get and put",
      space: "O(capacity)",
    },
    tradeoffs: [
      "O(1) operations versus more pointer code than a heap-by-timestamp (which is O(log n)).",
      "Doubly linked + map versus language built-ins you may not get to use.",
    ],
    interviewTips: [
      "Start with the data structure drawing: dummy head/tail, map on the side. Then write detach/attach. Then get/put.",
      "Store the key in the node so eviction can delete from the map without a reverse scan.",
      "Follow-ups: make it thread-safe (lock, or concurrent structure), or add TTL.",
    ],
    pitfalls: [
      "Singly linked detach: you do not have prev, so you scan — not O(1).",
      "Forgetting to delete the evicted key from the map (memory leak + stale hits).",
      "Updating a present key without moving it to front — that is not LRU.",
      "Null crashes at the dummy boundary because you skipped dummies.",
    ],
    practiceIdeas: [
      "Implement LRU Cache (LeetCode 146) from scratch.",
      "LFU Cache as a follow-up (freq map of lists).",
      "Trace get/put on capacity 2 until an eviction happens; check both list order and map size.",
    ],
    related: [
      "reverse-linked-list",
      "design-hashmap",
      "deque",
      "frequency-map",
    ],
  },
];
