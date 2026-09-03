import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "tree-traversals",
    track: "dsa",
    category: "Trees",
    title: "Tree Traversals",
    summary:
      "Preorder, inorder, postorder, and level order. Recursive templates plus the explicit-stack and Morris variants you should be able to write.",
    depth: "core",
    whyItMatters:
      "Traversal is how every other tree problem starts. Inorder of a BST is sorted order. Preorder plus inorder rebuilds a binary tree. Postorder deletes a tree bottom-up or evaluates an expression. Level order is BFS and the shape of zigzag / right-side view. If your traversal is buggy, every follow-up is buggy. Interviewers will ask you to write at least one of them iteratively.",
    theory: [
      "Preorder: visit, left, right. Inorder: left, visit, right. Postorder: left, right, visit. These are DFS. Level order is BFS with a queue, recording by depth. On a BST, inorder yields keys in sorted order — that is why kth-smallest and validate-BST so often walk inorder.",
      "Iterative inorder: stack, walk left, pop-visit, go right. Iterative preorder: stack, pop-visit, push right then left (so left is processed first). Iterative postorder is the awkward one: two stacks, or a one-stack method that records the last visited child. Learn the two-stack version (preorder-like but push left then right, then reverse) for interviews.",
      "N-ary trees generalize the same orders: visit then children, or children then visit. Morris traversal eliminates the stack by temporarily threading a predecessor's right pointer to the current node — O(1) extra space, more code, advanced follow-up.",
    ],
    howItWorks: [
      "Recursive: write the three-line template and collect into an array if needed.",
      "Iterative inorder: while node or stack: while node, push node, node = node.left; node = pop; visit; node = node.right.",
      "Level order: queue with a size snapshot per level so you know where a level ends.",
      "Always null-check leaves. Empty tree returns [].",
    ],
    whenToUse: [
      "Any walk of a binary or N-ary tree.",
      "BST problems that become array problems after inorder.",
      "Serialize / reconstruct (preorder + null markers, or level order).",
    ],
    whenNotToUse: [
      "You only need a local property of a node and its children — write a DFS that returns a pair, do not build a full traversal list.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(h) stack or O(w) queue; O(1) extra for Morris",
    },
    interviewTips: [
      "If they say 'iterative,' do not fight for recursion. Write the stack loop.",
      "Right-side view = last node in each level-order level (or a DFS that prefers right and records the first visit per depth).",
    ],
    pitfalls: [
      "Pushing left then right in preorder and getting a mirrored tree.",
      "Level order without a level-size snapshot, so zigzag grouping is wrong.",
      "Mutating child pointers during traversal and then continuing as if the tree were intact (unless you are Morris and you restore).",
    ],
    practiceIdeas: [
      "All four traversals recursively and iteratively.",
      "Binary Tree Zigzag Level Order; Right Side View.",
      "N-ary preorder.",
    ],
    related: [
      "bfs-dfs-iterative",
      "morris-traversal",
      "serialize-tree",
      "validate-bst",
      "kth-smallest-bst",
    ],
  },
  {
    slug: "tree-height-diameter",
    track: "dsa",
    category: "Trees",
    title: "Height and Diameter",
    summary:
      "Height is the longest root-to-leaf edge count (or node count — agree on the convention). Diameter is the longest path between any two nodes, computable in one DFS.",
    depth: "core",
    whyItMatters:
      "Height is the warmup; diameter is the real question. The naive 'diameter = max height(left)+height(right) at every node, each height is a separate DFS' is O(n²). The expected solution returns height from a single postorder and updates a global (or boxed) diameter along the way. Balanced-tree checks are the same postorder returning height or -1 on imbalance.",
    theory: [
      "Define height(leaf) = 0 or 1 depending on whether you count nodes or edges — pick one and stay consistent with the prompt. height(node) = 1 + max(height(left), height(right)) with null = -1 if you count edges from a leaf as 0.",
      "The longest path through a node uses one chain in the left subtree and one in the right: heightL + heightR (+ 2 if those are edge heights). The diameter is the max of that quantity over all nodes. It may not pass through the root — that is why a root-only sum of heights is wrong.",
      "On undirected trees (graphs that are trees), diameter is often two BFS: BFS from any node to a farthest u, BFS from u to a farthest v; u–v is a diameter. That is the graph view. On binary trees with parent-missing nodes, the postorder DFS is more natural.",
    ],
    howItWorks: [
      "dfs(node): if null return -1 (edge height). lh = dfs(left); rh = dfs(right). diameter = max(diameter, lh+rh+2). return 1+max(lh,rh).",
      "For balanced: if |lh-rh| > 1 or either side returned 'unbalanced,' propagate unbalanced.",
      "On an undirected tree: BFS to farthest, BFS again.",
    ],
    whenToUse: [
      "Any 'longest path in a tree,' balanced check, or subtree height.",
    ],
    whenNotToUse: [
      "Graphs with cycles — diameter of a general graph is APSP, not this.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(h)",
    },
    interviewTips: [
      "Ask whether height is in nodes or edges. Then write the null base case to match.",
      "Do not compute height in a separate function called from every node.",
    ],
    pitfalls: [
      "Returning only the through-root path.",
      "Integer overflow is rare; off-by-one on +1/+2 is common.",
      "On a single node, diameter is 0 — check the spec.",
    ],
    practiceIdeas: [
      "Maximum Depth of Binary Tree; Balanced Binary Tree.",
      "Diameter of Binary Tree.",
      "Diameter of an undirected N-ary tree via two BFS.",
    ],
    related: [
      "tree-traversals",
      "lca",
      "max-path-sum",
      "bfs",
    ],
  },
  {
    slug: "lca",
    track: "dsa",
    category: "Trees",
    title: "Lowest Common Ancestor",
    summary:
      "The deepest node that has both targets in its subtree. Binary tree: postorder report. BST: walk from the root using key order. Deep trees: binary lifting.",
    depth: "core",
    whyItMatters:
      "LCA is a core tree interview and a primitive for path queries (distance(u,v) = depth[u]+depth[v]-2depth[lca]). The binary-tree version tests recursion that returns a node or null. The BST version tests whether you use the search property. Advanced follow-ups (many queries) want preprocessing: Euler tour + RMQ, or binary lifting.",
    theory: [
      "In a general binary tree, dfs(node): if node is null or is p or q, return node. left = dfs(left), right = dfs(right). If both are non-null, node is the LCA. Else return the non-null side (the other target is deeper in that side, or neither is here). This assumes p and q exist in the tree — if they might not, you need extra flags.",
      "In a BST, start at root. If both keys are < root, go left. Both > root, go right. Else root is the split — that is the LCA. O(h), no extra stack beyond the walk.",
      "Binary lifting: preprocess parent[k][u] = 2^k-th ancestor in O(n log n). To lift u and v to the same depth, then lift them together until their parents match. Each query is O(log n). Euler-tour + sparse table on first-seen depths is O(1) query after O(n log n) RMQ build.",
    ],
    howItWorks: [
      "General tree: the postorder both-non-null rule above.",
      "BST: while node: if p.val < node.val && q.val < node.val, node = node.left; else if both greater, go right; else return node.",
      "With parent pointers: walk p to the root marking a set, walk q until you hit the set. Or equalize depths and walk up together.",
    ],
    whenToUse: [
      "Path intersection, distance in a tree, subtree queries that need the join node.",
    ],
    whenNotToUse: [
      "Graphs with multiple paths — LCA is for trees (or DAGs with a defined ancestor poset, which is rarer).",
    ],
    complexity: {
      time: "O(n) single query on a binary tree; O(h) on a BST; O(n log n) preprocess + O(log n) or O(1) per query with lifting/RMQ",
      space: "O(h) or O(n log n) preprocess",
    },
    interviewTips: [
      "Ask if it is a BST and if both nodes are guaranteed present.",
      "If they ask many queries, do not rerun a full DFS each time — mention lifting.",
    ],
    pitfalls: [
      "Returning root always because you only checked 'are both in the tree.'",
      "BST walk that compares nodes by identity instead of keys.",
      "The recursive solution returning p when p is an ancestor of q — that is correct; some people special-case it and break.",
    ],
    practiceIdeas: [
      "LCA of a binary tree; LCA of a BST.",
      "Distance between two nodes via LCA.",
      "Binary lifting template on a rooted tree.",
    ],
    related: [
      "tree-height-diameter",
      "validate-bst",
      "sparse-table",
      "tree-traversals",
    ],
  },
  {
    slug: "validate-bst",
    track: "dsa",
    category: "Trees",
    title: "Validate BST",
    summary:
      "Every node must lie in (low, high) inherited from ancestors, or inorder must be strictly increasing. Checking only 'left < node < right' is not enough.",
    depth: "core",
    whyItMatters:
      "This is the classic trap. A node can be greater than its parent and still violate a grandparent bound. Interviewers put a 5 under a 10 that sits on the left of a 6 and watch you return true. The fix is a range, or an inorder walk that remembers the previous value.",
    theory: [
      "A BST requires every node in the left subtree < node and every node in the right subtree > node (or ≤, if duplicates are allowed — ask). Local three-node checks miss distant violations. Thread a (low, high) interval: the root is (-∞, +∞). A left child gets (low, node.val); a right child gets (node.val, high). Fail if the node is outside.",
      "Inorder of a BST is sorted. Walk inorder and insist each value is > previous. This is clean and O(n). Watch integer overflow if you seed previous with MIN_SAFE and the tree contains that value — use a 'hasPrev' flag.",
      "Duplicates: if the problem says unique, use strict inequalities. If equals are allowed, they usually go to one side only; pick a convention and apply it in both the range and the inorder tests.",
    ],
    howItWorks: [
      "dfs(node, low, high): if !node return true. If node.val <= low or node.val >= high return false. Return dfs(left, low, node.val) && dfs(right, node.val, high).",
      "Or iterative inorder: if prev !== null && node.val <= prev.val return false; prev = node.val.",
    ],
    whenToUse: [
      "Verify the BST property after inserts, or as a gate before running a BST algorithm.",
    ],
    whenNotToUse: [
      "The tree is a general binary tree and they asked something else (e.g. max path) — do not validate unless asked.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(h)",
    },
    interviewTips: [
      "Draw the 10 / 5 / 15 / 6 / 20 counterexample if they wonder why a local check fails.",
      "Use null bounds, not 32-bit min/max, if values can be INT_MIN.",
    ],
    pitfalls: [
      "Only comparing a node to its children.",
      "Using >= when the tree forbids duplicates.",
      "Integer min/max collision with a real node value.",
    ],
    practiceIdeas: [
      "Validate Binary Search Tree.",
      "Recover a BST with two swapped nodes (inorder almost sorted).",
      "Insert into a BST, then validate.",
    ],
    related: [
      "kth-smallest-bst",
      "tree-traversals",
      "lca",
      "morris-traversal",
    ],
  },
  {
    slug: "kth-smallest-bst",
    track: "dsa",
    category: "Trees",
    title: "Kth Smallest in a BST",
    summary:
      "Inorder is sorted, so the k-th visit is the answer. Stop early. With subtree sizes you can walk down in O(h).",
    depth: "next",
    whyItMatters:
      "This is the standard 'use the BST property' follow-up after validate/inorder. The naive flatten-to-array is O(n) memory. The expected interview code is iterative inorder that decrements k and returns when k hits 0. The augmentation follow-up (each node stores subtree size) is how order-statistic trees work.",
    theory: [
      "Inorder visits keys in ascending order. Walk iteratively with a stack; each pop is the next smallest. After k pops, return that node's value. You never visit more than k + h nodes in the left spines you expand.",
      "If nodes know size(left)+1+size(right), compare k to leftSize+1: equal → this node; k smaller → go left; else go right with k -= leftSize+1. That is O(h) per query after O(n) to compute sizes (or maintain sizes on insert).",
      "kth largest is kth smallest on the reversed order (reverse inorder) or (n-k+1)-th smallest.",
    ],
    howItWorks: [
      "stack empty, cur = root. while true: while cur, push cur, cur = cur.left. cur = pop. k--; if k === 0 return cur.val. cur = cur.right.",
      "Size-augmented: while node: L = size(node.left). if k === L+1 return node. if k <= L node = node.left; else k -= L+1; node = node.right.",
    ],
    whenToUse: [
      "Order-statistic queries on a BST.",
    ],
    whenNotToUse: [
      "A general binary tree — inorder is not sorted; you would need a heap or a flatten+sort.",
    ],
    complexity: {
      time: "O(h + k) inorder; O(h) with sizes",
      space: "O(h) or O(1) Morris",
    },
    interviewTips: [
      "Write iterative inorder. If they ask to do many queries, add sizes.",
      "Follow-up: delete the kth, or streaming inserts — then a balanced BST / policy-based tree / two heaps depending on the API.",
    ],
    pitfalls: [
      "Recursing the whole tree and indexing [k-1] — works, wastes time and space, and they may forbid it.",
      "Off-by-one: k is 1-based in most prompts.",
    ],
    practiceIdeas: [
      "Kth Smallest Element in a BST.",
      "Kth largest with reverse inorder.",
      "Add size fields and implement order-statistic find.",
    ],
    related: [
      "validate-bst",
      "tree-traversals",
      "morris-traversal",
      "ordered-set",
    ],
  },
  {
    slug: "serialize-tree",
    track: "dsa",
    category: "Trees",
    title: "Serialize and Deserialize a Tree",
    summary:
      "Encode the shape and values into a string (preorder with null markers, or level order) and parse it back. The markers are what make the reconstruction unique.",
    depth: "next",
    whyItMatters:
      "This is a design-plus-recursion interview (LeetCode 297). You must pick a format, write both directions, and handle nulls, negatives, and multi-digit values. It is also how you think about persisting trees and about why preorder without nulls is not enough (many trees share a preorder).",
    theory: [
      "Preorder with explicit nulls: '1,2,#,#,3,4,#,#,5,#,#'. Deserialize consumes tokens with an index: read val, if # return null, else new node, recurse left, recurse right. The stream position is shared. This is unique and simple.",
      "Level order with trailing-null trimming is what leetcode's judge uses in its UI. It is also fine. BST serialization can omit nulls if you store a sorted preorder or postorder and rebuild with bounds (deserialize BST is a nicer variant).",
      "Pick a separator that cannot appear in values, or length-prefix values. Comma + integer parse is enough for interview integers. Do not use JSON.stringify on a cyclic-looking structure; trees have no parent pointers in the usual problem, so a custom codec is the point.",
    ],
    howItWorks: [
      "serialize: dfs preorder, push val or '#', join with commas.",
      "deserialize: split to tokens, i = 0. build(): token = tokens[i++]; if token === '#' return null; node = new(val); node.left = build(); node.right = build(); return node.",
      "For BST: serialize as preorder without nulls; deserialize by consuming values while they lie in (low, high).",
    ],
    whenToUse: [
      "Persist a tree, send it over the wire, or clone via a codec.",
      "Problems that ask you to encode/decode an N-ary tree (add child counts).",
    ],
    whenNotToUse: [
      "You only need a traversal list for an in-memory algorithm — do not stringify.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(n) for the string and the recursion",
    },
    interviewTips: [
      "Agree on the format in one sentence, then implement serialize fully before deserialize.",
      "Handle the empty tree: serialize as '#' or ''.",
    ],
    pitfalls: [
      "Preorder without nulls, then guessing the shape.",
      "Splitting on empty strings or not handling negative numbers.",
      "Sharing a global index incorrectly across test cases (reset it).",
    ],
    practiceIdeas: [
      "Serialize and Deserialize Binary Tree.",
      "Serialize and Deserialize BST (bounds).",
      "Codec for an N-ary tree.",
    ],
    related: [
      "tree-traversals",
      "validate-bst",
      "bfs",
    ],
  },
  {
    slug: "path-sum",
    track: "dsa",
    category: "Trees",
    title: "Path Sum",
    summary:
      "Root-to-leaf (or any downward path) whose values add to a target. DFS with a remaining sum, or prefix sums plus a hashmap for 'any path.'",
    depth: "core",
    whyItMatters:
      "Path Sum I is a warmup. Path Sum II collects the paths. Path Sum III (any downward path, not necessarily from the root) is the one that filters people: nested DFS is O(n²), prefix+hashmap is O(n). Interviewers use this to see if you transfer the subarray-sum-equals-k trick onto a tree.",
    theory: [
      "Root-to-leaf existence: dfs(node, remaining). If leaf and remaining === node.val, true. Else recurse left/right with remaining - node.val. Watch the spec: some problems allow any node as the end, not only leaves.",
      "Root-to-leaf listing: push node into a path, recurse, pop. Record a copy when a leaf hits zero remaining. Same backtracking discipline as subsets.",
      "Any downward path (Path Sum III): maintain prefix sum from the root to here. If prefix - target was seen as an ancestor prefix, there is a path ending here. A hashmap of prefix frequencies, increment before children, decrement after (so parallel subtrees do not see each other). This is the tree version of prefix-hashmap.",
    ],
    howItWorks: [
      "I: return dfs(root, target) with the leaf check.",
      "II: backtrack path + remaining.",
      "III: map {0:1}. dfs(node, prefix): prefix += node.val; ans += map[prefix-target]; map[prefix]++; dfs children; map[prefix]--.",
    ],
    whenToUse: [
      "Target sums along tree paths, with various start/end constraints.",
    ],
    whenNotToUse: [
      "Paths that may go up and then down (true tree paths through LCA) — reduce via LCA + prefix on parent chains, or reroot DP.",
    ],
    complexity: {
      time: "O(n) for I/III with hashmap; O(n²) worst to list all paths if you must output them",
      space: "O(h) plus the map",
    },
    interviewTips: [
      "Clarify start and end constraints before coding. Draw a 3-node example for III.",
      "The hashmap must be backtracked; a global map without decrement double-counts across subtrees.",
    ],
    pitfalls: [
      "Counting a non-leaf as a finish in Path Sum I.",
      "Integer overflow on sums; use the language's number type consciously.",
      "Forgetting map[0] = 1, so paths that start at the root are missed.",
    ],
    practiceIdeas: [
      "Path Sum I, II, III.",
      "Maximum path sum as the next problem (different: the path may bend).",
      "Path sum in a binary tree to a linked-list-like chain (only one child) as a warmup.",
    ],
    related: [
      "max-path-sum",
      "prefix-hashmap",
      "tree-dp",
      "subsets",
    ],
  },
  {
    slug: "max-path-sum",
    track: "dsa",
    category: "Trees",
    title: "Binary Tree Maximum Path Sum",
    summary:
      "A path can bend at a node (left + node + right). A DFS returns the best downward gain to its parent and updates a global best bend.",
    depth: "next",
    whyItMatters:
      "This is the hard sibling of diameter. Values can be negative, so you may drop a child (gain 0) and you may choose a single node. People who return the bend as the value to the parent double-count and break the chain. The split between 'what I report upward' and 'what I record globally' is the whole problem.",
    theory: [
      "At node u, the best path that uses u as the highest point (the bend) is u.val + max(0, bestDown(left)) + max(0, bestDown(right)). Update a global answer with that. What u reports to its parent is u.val + max(0, bestDown(left), bestDown(right)) — one chain, not two. Negative children are ignored via the max(0, ·).",
      "This is tree DP: two quantities per node, written as one return plus one global. If the problem forbids the global, return a pair {bestDown, bestInSubtree}.",
      "Diameter is the same shape with all weights 1 and a length instead of a sum. Seeing them as one template is useful.",
    ],
    howItWorks: [
      "best = -∞. dfs(node): if null return 0. L = max(0, dfs(left)); R = max(0, dfs(right)). best = max(best, node.val+L+R). return node.val + max(L, R).",
      "Return best after dfs(root).",
    ],
    whenToUse: [
      "Maximum-sum path in a binary tree with possibly negative weights, any endpoints.",
    ],
    whenNotToUse: [
      "Root-to-leaf only — that is a simpler remaining-sum or a different DP.",
      "Graphs with cycles — not a tree path.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(h)",
    },
    interviewTips: [
      "Say the two numbers: 'upward gain vs bend.' Then code.",
      "Single-node trees and all-negative trees are the tests that catch missing max(0,·) or a 0-initialized best.",
    ],
    pitfalls: [
      "Returning L+node+R to the parent.",
      "Initializing the answer at 0 so an all-negative tree returns 0.",
      "Not allowing a path to be a single node.",
    ],
    practiceIdeas: [
      "Binary Tree Maximum Path Sum.",
      "Diameter as the unweighted analog.",
      "Maximum path sum from leaf to leaf only (a common variant).",
    ],
    related: [
      "path-sum",
      "tree-height-diameter",
      "tree-dp",
      "kadane",
    ],
  },
  {
    slug: "invert-tree",
    track: "dsa",
    category: "Trees",
    title: "Invert / Flatten a Binary Tree",
    summary:
      "Invert swaps left and right at every node (mirror). Flatten rewires the tree into a preorder linked list using right pointers, in place.",
    depth: "core",
    whyItMatters:
      "Invert is the internet's favorite easy tree problem and still appears as a warmup. Flatten (LeetCode 114) is the real pointer-rewiring follow-up: you must produce a preorder list without extra node allocations, which means you need the right subtree saved before you overwrite it. Together they test whether you can mutate a tree safely.",
    theory: [
      "Invert: swap children, recurse both sides (or recurse then swap). BFS/queue works too: for each node, swap children and enqueue them. The result is the mirror image. Symmetric-tree is 'is this tree equal to its invert' without building the invert — compare left/right mirrors.",
      "Flatten to a linked list in preorder: after flattening left and right, you need node.right to become the old left, and the tail of that left chain to point at the old right. Recursive: flatten left, flatten right, then splice. Morris-like: if left exists, find the rightmost of the left subtree (predecessor) and attach the old right there, then move left to right, null out left. That is O(1) extra and O(n).",
      "Invert does not preserve BST order (it reverses it). Flatten of a BST is not 'sort the tree'; it is preorder, which for a BST is not inorder.",
    ],
    howItWorks: [
      "Invert: if node, swap left/right, invert both children, return node.",
      "Flatten (splice): flatten(left); flatten(right); const r = node.right; node.right = node.left; node.left = null; walk to the end of the new right; attach r.",
      "Flatten (predecessor): while node: if node.left, pred = rightmost(node.left); pred.right = node.right; node.right = node.left; node.left = null; node = node.right.",
    ],
    whenToUse: [
      "Mirror a tree; test symmetry; flatten to a list for serialization-like in-place rewrite.",
    ],
    whenNotToUse: [
      "You need a sorted list from a BST — inorder flatten / Morris inorder, not preorder flatten.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(h) recursive invert/flatten; O(1) predecessor flatten",
    },
    interviewTips: [
      "For flatten, draw a 3-node tree and splice once on paper. Then code.",
      "Symmetric tree: do not invert and compare; write a two-node mirror DFS.",
    ],
    pitfalls: [
      "Losing the right subtree by overwriting node.right before saving it.",
      "Forgetting to null node.left after flatten (the judge checks left is null).",
      "Inverting only the first level.",
    ],
    practiceIdeas: [
      "Invert Binary Tree; Symmetric Tree.",
      "Flatten Binary Tree to Linked List.",
      "Mirror a tree and then flatten — predict the list order.",
    ],
    related: [
      "morris-traversal",
      "reverse-linked-list",
      "tree-traversals",
      "serialize-tree",
    ],
  },
  {
    slug: "flatten-binary-tree",
    track: "dsa",
    category: "Trees",
    title: "Flatten Binary Tree to Linked List",
    summary:
      "Rewrite the tree in place so it becomes a right-linked preorder list. Save the right child, attach the flattened left, then append the old right.",
    depth: "next",
    whyItMatters:
      "Listed separately because interviews often ask flatten on its own after invert. The predecessor (Morris-style) solution is O(1) extra space and is a strong finish. Recursion that returns the tail of the flattened subtree is also clean and easier to get right than walking to the tail after the fact.",
    theory: [
      "Preorder of the original tree must equal the right-spine of the result, and every left must be null. That specification decides the algorithm. If you collect preorder into an array and relink, you use O(n) memory — mention it, then do better.",
      "Returning tails: flatten returns the last node of the chain. You flatten left (getting leftTail), flatten right (rightTail), then node.right = leftHead, leftTail.right = rightHead, node.left = null, return rightTail or leftTail or node. The pointer algebra is local.",
      "The Morris-style version threads the old right onto the predecessor and rotates left to right. It visits some nodes twice but stays linear.",
    ],
    howItWorks: [
      "Recursive tail: see theory. Handle null children so the returned tail is never null unless the node is null.",
      "Predecessor loop: while node: if left exists, find pred, pred.right = node.right, rotate left onto right, clear left. Then node = node.right.",
    ],
    whenToUse: [
      "In-place preorder list rewrite.",
    ],
    whenNotToUse: [
      "You are allowed O(n) extra and they want simple code — collect then relink.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(h) or O(1)",
    },
    interviewTips: [
      "Ask whether the list should be preorder (yes, in the standard problem).",
      "Unit-test a right-only chain (already flat) and a left-only chain (the nasty case).",
    ],
    pitfalls: [
      "Connecting tails incorrectly and dropping the right subtree.",
      "Infinite loop if pred.right = node instead of node.right.",
    ],
    practiceIdeas: [
      "LeetCode 114.",
      "Flatten to a doubly linked list in inorder (convert BST to DLL) — related rewiring.",
    ],
    related: [
      "invert-tree",
      "morris-traversal",
      "reverse-linked-list",
      "tree-traversals",
    ],
  },
  {
    slug: "morris-traversal",
    track: "dsa",
    category: "Trees",
    title: "Morris Traversal",
    summary:
      "Thread a temporary link from a node's inorder predecessor to itself so you can walk the tree with O(1) extra memory, then unthread.",
    depth: "advanced",
    whyItMatters:
      "Morris is the 'do it in O(1) space' follow-up to inorder / flatten / recover-BST. You should be able to explain the predecessor thread even if you need a minute to write it. It shows you understand that extra space in traversals is usually the stack of parent pointers, which you can encode in unused right links of leaves.",
    theory: [
      "In a binary tree, the inorder predecessor of node is the rightmost node in its left subtree. That predecessor's right child is normally null. Morris sets pred.right = node as a 'return ticket,' then walks left. When you later arrive at node via that ticket (pred.right already points at node), you know the left subtree is done: visit node, clear the thread, go right.",
      "If there is no left child, visit and go right — same as ordinary inorder. Every edge is walked a constant number of times, so O(n). The tree is restored by the time you finish, which is required if callers still own it.",
      "Preorder Morris visits the node the first time you create the thread (before going left) instead of the second time. Flatten's predecessor trick is Morris's cousin: you keep the thread as the new structure instead of unthreading.",
    ],
    howItWorks: [
      "cur = root. while cur: if !cur.left, visit cur, cur = cur.right.",
      "Else pred = cur.left; while pred.right && pred.right !== cur, pred = pred.right.",
      "If pred.right is null: pred.right = cur; cur = cur.left. (preorder: visit cur here instead)",
      "Else: pred.right = null; visit cur; cur = cur.right.",
    ],
    whenToUse: [
      "Inorder or preorder with O(1) extra space and a mutable tree you will restore.",
      "Recover BST / flatten follow-ups.",
    ],
    whenNotToUse: [
      "You may use O(h) stack — write the normal iterative traversal. It is clearer and safer.",
      "Concurrent readers of the tree — threading is not thread-safe.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1) extra",
    },
    interviewTips: [
      "Name predecessor threading first. If time is short, write iterative stack and say Morris is the O(1) version.",
      "They may only want the idea, not a bug-free Morris in 10 minutes — still try if you know it.",
    ],
    pitfalls: [
      "Forgetting to unthread — the tree stays cyclic and later DFS infinite-loops.",
      "Stopping the predecessor walk incorrectly so you thread a non-predecessor.",
      "Visiting on the wrong pass (preorder vs inorder mix-up).",
    ],
    practiceIdeas: [
      "Inorder via Morris and compare to the stack version.",
      "Recover Binary Search Tree using Morris to find the two inversions.",
      "Flatten as a Morris variant that does not unthread.",
    ],
    related: [
      "tree-traversals",
      "flatten-binary-tree",
      "validate-bst",
      "kth-smallest-bst",
    ],
  },
  {
    slug: "trie",
    track: "dsa",
    category: "Trees",
    title: "Trie (Prefix Tree)",
    summary:
      "A tree of characters where each root-to-node path is a prefix. Insert, search, and startsWith are O(length), independent of how many words are stored — until the alphabet fans out.",
    depth: "core",
    whyItMatters:
      "Tries are the data-structure interview for strings: autocomplete, Word Search II, replace words, longest common prefix, XOR maximum pair (bit trie). If you only know hash sets, you cannot answer 'find all words with this prefix' without scanning everything. Implementing insert/search/startsWith (LeetCode 208) is the expected baseline.",
    theory: [
      "Each node has an array or map of children (size 26 for lowercase, or a hashmap for general) and a boolean isWord (or a count). Insert walks/creates one node per character and marks the last as a word. Search walks and requires isWord. startsWith walks and only requires the node exists.",
      "Space is O(total characters) in the worst case (no shared prefixes) and much less when words share prefixes — that sharing is the point. A hashmap of whole words uses less pointer overhead sometimes; the trie wins on prefix queries and on bit-by-bit numeric queries.",
      "Variants: compressed (radix / Patricia) tries merge unary chains; bit tries store 32-bit numbers MSB-first for max XOR and for bitwise prefix counts. Aho–Corasick adds failure links to a trie of patterns. Do not build those unless asked; mention them as the next layer.",
    ],
    howItWorks: [
      "Node: children[26] or Map, isWord flag, optional count.",
      "insert(word): cur = root; for ch of word, create child if missing, cur = child; cur.isWord = true.",
      "search / startsWith: walk; fail on missing child; search also checks isWord.",
      "erase (if needed): decrement counts and delete nodes with count 0, or lazy-unmark isWord.",
    ],
    whenToUse: [
      "Prefix queries, autocomplete, dictionary search on a grid, bitwise XOR tries.",
      "Many pattern prefix checks against one stream (then consider Aho–Corasick).",
    ],
    whenNotToUse: [
      "Exact lookups only — a hash set is simpler and usually faster.",
      "Huge alphabet with no prefix sharing — memory dies on maps of maps.",
    ],
    complexity: {
      time: "O(L) per insert/search for word length L",
      space: "O(total characters × alphabet pointer cost)",
    },
    interviewTips: [
      "Implement Implement Trie first if they ask for a trie problem. Then add whatever the problem needs (counts, parent links, failure links).",
      "Word Search II: trie of words, DFS the board, prune when no child, mark word used to avoid dups.",
    ],
    pitfalls: [
      "Using isWord incorrectly so prefixes of words are reported as words (or the reverse).",
      "26-slot arrays for unicode; use a map.",
      "Deleting a word by only clearing isWord but leaving the question 'empty node cleanup' half-done if they asked to free memory.",
    ],
    practiceIdeas: [
      "Implement Trie (Prefix Tree).",
      "Replace Words; Longest Word in Dictionary.",
      "Word Search II; Maximum XOR of Two Numbers in an Array (bit trie).",
    ],
    related: [
      "trie-search",
      "word-search",
      "aho-corasick",
      "xor-tricks",
    ],
  },
];
