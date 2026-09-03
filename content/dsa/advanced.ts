import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "segment-tree",
    track: "dsa",
    category: "Advanced Data Structures",
    title: "Segment Tree",
    summary:
      "A binary tree over array ranges. Each node stores an aggregate of [l,r]. Point update and range query are O(log n) by walking O(1) nodes per level.",
    depth: "advanced",
    whyItMatters:
      "Segment trees are the default 'I have range queries and updates' answer in contests and in harder interviews (Range Sum Query Mutable, range min, count of inversions with values compressed). If the array is static, a prefix or a sparse table is simpler. If you only add at prefixes, a Fenwick is less code. The segment tree is the one that generalizes to any mergeable monoid (sum, min, gcd, pair of top-two).",
    theory: [
      "A node owns [l,r]. If l==r it stores A[l]. Else it merges left [l,mid] and right [mid+1,r]. A query [L,R] walks down and returns the merge of O(log n) disjoint node ranges that exactly cover [L,R]. A point update climbs from the leaf to the root, recomputing merges.",
      "Store the tree in an array of size 4n (safe) with node i, left 2i, right 2i+1 (1-based). Recursion on (idx,l,r) is the clear write-up. Iterative bottom-up trees exist and are faster; not required in interviews.",
      "The merge must be associative. If you need range updates (add v on [L,R]), you add lazy propagation — a separate topic. Without lazy, a range update is O(n) if you update each point, or O((R-L) log n) pointwise — usually too slow.",
    ],
    howItWorks: [
      "build(idx,l,r): if l==r tree[idx]=A[l]; else build children, tree[idx]=merge(left,right).",
      "query(idx,l,r,L,R): if no overlap return identity (0 for sum, +∞ for min); if fully covered return tree[idx]; else merge the two recursive queries.",
      "update(idx,l,r,pos,val): descend to the leaf, set, merge on the way up.",
    ],
    whenToUse: [
      "Range queries + point updates on an associative merge; more general than Fenwick.",
    ],
    whenNotToUse: [
      "Static range sum — prefix. Static range min — sparse table O(1).",
      "Only prefix sums + point add — Fenwick is shorter.",
    ],
    complexity: {
      time: "O(n) build; O(log n) update/query",
      space: "O(n)",
    },
    interviewTips: [
      "Ask what the merge is and whether updates are points or ranges.",
      "Count of smaller after self: Fenwick/segment tree on compressed values, iterate right-to-left.",
    ],
    pitfalls: [
      "Identity of merge wrong (0 for min).",
      "Off-by-one l,r inclusive vs exclusive, so a query misses a leaf.",
      "Array of size 2n instead of 4n and overflowing children.",
    ],
    practiceIdeas: [
      "Range Sum / Range Min Query mutable.",
      "Count of Smaller Numbers After Self.",
      "Inversion count with a segment tree.",
    ],
    related: [
      "fenwick",
      "lazy-propagation",
      "sparse-table",
      "persistent-segment-tree",
    ],
  },
  {
    slug: "fenwick",
    track: "dsa",
    category: "Advanced Data Structures",
    title: "Fenwick Tree (Binary Indexed Tree)",
    summary:
      "An array where index i stores a prefix chunk of length i&-i. Prefix sums and point adds in O(log n) with two tiny loops. Less general than a segment tree, much less code.",
    depth: "advanced",
    whyItMatters:
      "Fenwick is the structure you actually type in a timed interview for range-sum + point-update. The i & -i jump is Kernighan's lowest-set-bit. Range add + point query is a Fenwick on a difference array. 2-D Fenwick appears in 'range sum query 2D mutable.' If you can write add and sumPrefix in six lines, you look fluent.",
    theory: [
      "1-based indexing is conventional. add(i,v): while i<=n: bit[i]+=v; i += i&-i. sumPrefix(i): s=0; while i>0: s+=bit[i]; i -= i&-i. Range [l,r] is sumPrefix(r)-sumPrefix(l-1).",
      "Why it works: each index is responsible for a power-of-two-aligned segment ending at i. The bits of i tell you which chunks to add to make [1,i]. Updates climb to every chunk that contains i.",
      "Fenwick natively does prefix aggregates of invertible operations (sum, XOR). Min/max are not invertible, so a Fenwick cannot drop a value out of a prefix min without extra tricks. Use a segment tree for those.",
    ],
    howItWorks: [
      "bit = zeros(n+1).",
      "add(i,v) and sumPrefix(i) as above (i is 1-based).",
      "Build: for i,x of A: add(i+1, x), or the linear build by pushing to i+=i&-i once per i.",
    ],
    whenToUse: [
      "Prefix / range sums with point updates; frequency tables on compressed coordinates; inversion counts.",
    ],
    whenNotToUse: [
      "Range min/gcd — segment tree.",
      "Need to store arbitrary structs — segment tree.",
    ],
    complexity: {
      time: "O(n) build, O(log n) add/prefix",
      space: "O(n)",
    },
    interviewTips: [
      "Write the two loops from memory. Mention 1-based.",
      "Range-add point-query: add(l,v); add(r+1,-v); query is sumPrefix(i).",
    ],
    pitfalls: [
      "0-based i and i&-i never moving (infinite loop on 0).",
      "sum(r)-sum(l) instead of sum(l-1).",
      "Using Fenwick for range min.",
    ],
    practiceIdeas: [
      "Range Sum Query Mutable via Fenwick.",
      "Count inversions / Count of Smaller After Self.",
      "Range add then point queries via difference Fenwick.",
    ],
    related: [
      "segment-tree",
      "kernighan",
      "prefix-sum",
      "difference-array",
    ],
  },
  {
    slug: "sparse-table",
    track: "dsa",
    category: "Advanced Data Structures",
    title: "Sparse Table",
    summary:
      "st[k][i] = combine of 2^k elements starting at i. Idempotent range queries (min, max, gcd) become O(1) after O(n log n) build. No updates.",
    depth: "advanced",
    whyItMatters:
      "When the array never changes and you need range min (RMQ) in O(1), a sparse table beats a segment tree on query time and is easier than a Cartesian tree. LCA reduces to RMQ on an Euler tour — that is why this structure appears next to trees. If you need updates, this table is the wrong tool.",
    theory: [
      "Build: st[0][i]=A[i]; st[k][i] = min(st[k-1][i], st[k-1][i+2^{k-1}]). Query [L,R] (inclusive): k = floor(log2(R-L+1)); return min(st[k][L], st[k][R-2^k+1]). The two windows overlap; that is fine because min is idempotent (min(x,x)=x).",
      "Sum is not idempotent: overlapping windows double-count. Do not use this O(1) trick for sums — prefixes exist. Overlap-friendly ops: min, max, gcd, AND, OR. Not: sum, XOR (XOR of overlapping windows is wrong).",
      "log2 can be precomputed in O(n) as lg[i]=lg[i>>1]+1. Never use floating log in a tight loop if you care about precision; for i up to 10^6 it is usually OK.",
    ],
    howItWorks: [
      "Precompute lg[]. Build st as above for k=1..LOG, i=0..n-2^k.",
      "query(L,R): k=lg[R-L+1]; return combine(st[k][L], st[k][R-(1<<k)+1]).",
    ],
    whenToUse: [
      "Static RMQ / range gcd; LCA via Euler tour + RMQ.",
    ],
    whenNotToUse: [
      "Updates. Range sums (use prefix). Non-idempotent merges with the O(1) overlap query.",
    ],
    complexity: {
      time: "O(n log n) build, O(1) query",
      space: "O(n log n)",
    },
    interviewTips: [
      "If they say immutable range min and many queries, name sparse table. If they later add updates, switch to a segment tree.",
    ],
    pitfalls: [
      "Using the O(1) overlap query for sum.",
      "k = log(R-L) off-by-one so the windows miss the middle.",
      "Building k on the inner loop in the wrong order (need smaller k first).",
    ],
    practiceIdeas: [
      "Static Range Minimum Query.",
      "Range GCD queries on a static array.",
      "LCA with Euler tour + sparse table.",
    ],
    related: [
      "segment-tree",
      "lca",
      "prefix-sum",
    ],
  },
  {
    slug: "lazy-propagation",
    track: "dsa",
    category: "Advanced Data Structures",
    title: "Lazy Propagation",
    summary:
      "Defer a range update on a segment-tree node by storing it in a lazy tag. Push the tag to children only when you must go down. Range update and range query stay O(log n).",
    depth: "advanced",
    whyItMatters:
      "Without lazy, a range add is O(n). With lazy, Range Update / Range Sum (and range assign) become interview/contest-standard. The discipline is push and pull: before you split a node, apply its tag to the children and clear it; after children update, recompute the node. Mixing tags (add vs assign) needs a clear composition rule.",
    theory: [
      "A tag on node u means 'this update applies to the whole of u's segment and has not been pushed.' The node's stored aggregate already reflects the tag (you apply it when you set the tag). Children do not yet know. When a query or update only partially covers u, you must push so the children are accurate, then recurse.",
      "For range add v on a sum tree: node.sum += v * length, node.lazy += v. Push: child.lazy += v, child.sum += v * child.length, parent.lazy = 0. For range assign, the new assign overrides an old add — compose tags in the right order or store both.",
      "Lazy is not a Fenwick feature in the simple form (you can lazy-simulate some range updates with difference Fenwicks). Segment trees are the natural home.",
    ],
    howItWorks: [
      "apply(idx, tag): update tree[idx] and compose into lazy[idx].",
      "push(idx): apply(left, lazy[idx]); apply(right, lazy[idx]); lazy[idx]=identity.",
      "rangeUpdate: if no overlap return; if full cover apply and return; else push, recurse, pull (tree[idx]=merge(children)).",
      "rangeQuery: same descent, return identity / node / merge of children, and push before splitting.",
    ],
    whenToUse: [
      "Range updates + range queries on a mergeable aggregate.",
    ],
    whenNotToUse: [
      "Point updates only — a plain segment tree or Fenwick.",
      "A single range add then many point reads — difference array.",
    ],
    complexity: {
      time: "O(log n) per range update/query",
      space: "O(n)",
    },
    interviewTips: [
      "Write apply/push/pull as helpers before the recurse. Interviewers follow that.",
      "State the tag composition: 'add composes by +; assign replaces.'",
    ],
    pitfalls: [
      "Forgetting to apply the tag to the node's own sum when setting lazy.",
      "Not pushing before a partial recurse — children stale, answers wrong.",
      "Wrong length multiply (r-l+1 vs mid splits).",
    ],
    practiceIdeas: [
      "Range add + range sum.",
      "Range assign + range min.",
      "Compare with difference Fenwick on range-add point-query.",
    ],
    related: [
      "segment-tree",
      "fenwick",
      "difference-array",
      "persistent-segment-tree",
    ],
  },
  {
    slug: "ordered-set",
    track: "dsa",
    category: "Advanced Data Structures",
    title: "Ordered Set / Policy-Based Tree",
    summary:
      "A balanced BST that also supports order-statistic queries: find-by-rank and rank-of-key in O(log n). C++ pbds, Java TreeSet plus Fenwick, or a size-augmented treap/splay.",
    depth: "advanced",
    whyItMatters:
      "Sliding-window median, 'count of smaller on the left,' and online kth are awkward with a heap (no delete-by-value) and easy with an ordered set that has ranks. Interviews in Java/JS often simulate this with a Fenwick of compressed frequencies or a TreeMap of counts. In C++ you may use __gnu_pbds indexed_set. Knowing the operations is more important than coding a red-black tree from scratch.",
    theory: [
      "A size-augmented BST stores subtree sizes. rank(x) is the number of keys < x (walk left/right adding left sizes). find_by_order(k) walks down comparing k to left size. Insert/erase are normal BST updates plus size fixes — O(log n) if balanced.",
      "Duplicates: store {value, unique id} or a count at the node. Fenwick/segment-tree frequency tables on compressed values give the same rank API when the value universe is known and compressible.",
      "Two heaps (median stream) beat an ordered set on constants for the single-median case. Ordered sets win when you need arbitrary k, deletes in the middle, or predecessor queries together.",
    ],
    howItWorks: [
      "Compress values if you use a Fenwick: rank is prefix sum of frequencies; kth is binary search on the Fenwick.",
      "Or maintain a balanced tree with sizes (language library / pbds / TreeMap of counts + a Fenwick of those counts).",
      "API: insert, erase, rank, kth, prev/next.",
    ],
    whenToUse: [
      "Online order statistics, sliding-window kth, count-smaller online.",
    ],
    whenNotToUse: [
      "Only min/max — a heap. Only membership — a hash set.",
    ],
    complexity: {
      time: "O(log n) per op (or O(log U) on a Fenwick of universe U)",
      space: "O(n)",
    },
    interviewTips: [
      "In JS/Python interviews, say 'I'll use a Fenwick of compressed frequencies as an ordered multiset.' Then write that.",
      "Sliding Window Median: two heaps + lazy delete, or this structure.",
    ],
    pitfalls: [
      "TreeSet in Java does not have rank; you cannot get kth in O(log n) without pbds / Fenwick / a custom tree.",
      "Forgetting compression so Fenwick indices are 10^9.",
    ],
    practiceIdeas: [
      "Count of Smaller Numbers After Self via Fenwick ranks.",
      "Sliding Window Median.",
      "Online kth in a stream with inserts and deletes.",
    ],
    related: [
      "fenwick",
      "segment-tree",
      "median-stream",
      "kth-smallest-bst",
    ],
  },
  {
    slug: "persistent-segment-tree",
    track: "dsa",
    category: "Advanced Data Structures",
    title: "Persistent Segment Tree",
    summary:
      "Each update allocates O(log n) new nodes along the path and reuses the rest. You keep a root per version and query any historical snapshot in O(log n).",
    depth: "advanced",
    whyItMatters:
      "Persistence is how you answer 'kth smallest on subarray [L,R]' (a classic hard): build a persistent frequency tree, adding A[i] as version i, then walk version R vs version L-1 for the kth. Interviewers at strong companies and CP rounds expect the idea even if they accept a merge-sort tree. You should not start this from zero on a 30-minute easy screen.",
    theory: [
      "A normal update mutates the path to a leaf. A persistent update copies that path, pointing the new nodes at the old unchanged children. Old roots remain valid. Memory is O((n+q) log n) nodes. Time per update/query is still O(log n).",
      "For kth in range: the segment tree is over the compressed value domain. Version i is the frequency tree of the prefix A[1..i]. The difference of two versions' node values is the frequency in (L..R]. Walk like an order-statistic tree on those differences.",
      "Fully persistent vs partially persistent (only the latest version updates) matters in theory; interview problems are usually a chain of versions, one per prefix. Merge-sort trees (store a sorted vector per node) are an alternative using O(n log n) memory and O(log² n) queries.",
    ],
    howItWorks: [
      "Node {left, right, sum}. update(old, l, r, pos): create node; if leaf set sum; else recurse one side, copy the other child pointer; sum = children.",
      "roots[0] = empty tree. roots[i] = update(roots[i-1], A[i]).",
      "kth(L,R,k): walk(roots[R], roots[L-1], domain, k) choosing the side by left-frequency difference.",
    ],
    whenToUse: [
      "Queries on historical versions; kth in subarray; persistent frequency maps.",
    ],
    whenNotToUse: [
      "No versioning needed — ordinary segment tree / Fenwick.",
      "n and q so large that (n+q) log n nodes do not fit — need a different method.",
    ],
    complexity: {
      time: "O(n log n) build of n versions; O(log n) query",
      space: "O(n log n)",
    },
    interviewTips: [
      "Kth in [L,R]: name persistent Fenwick/segment tree or merge-sort tree. Sketch versions as prefixes.",
      "Do not implement this unless they confirmed they want it and n is ≤ 1e5.",
    ],
    pitfalls: [
      "Mutating an old node instead of copying — versions corrupt each other.",
      "Walking kth on a single version instead of the difference of two prefixes.",
      "Memory blow-up from copying whole trees (must share children).",
    ],
    practiceIdeas: [
      "Kth smallest in subarray [L,R] online.",
      "Count of values ≤ X in [L,R] via two versions.",
      "Contrast with merge-sort tree on the same queries.",
    ],
    related: [
      "segment-tree",
      "fenwick",
      "ordered-set",
      "lazy-propagation",
    ],
  },
];
