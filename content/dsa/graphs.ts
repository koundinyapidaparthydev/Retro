import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "bfs",
    track: "dsa",
    category: "Graphs",
    title: "Breadth-First Search",
    summary:
      "Expand a queue level by level. The first time you reach a node is a shortest path in an unweighted graph. Mark on enqueue.",
    depth: "core",
    whyItMatters:
      "BFS is the default answer to 'minimum number of moves' on grids, word ladders, and unweighted graphs. Interviewers watch whether you mark visited when you push (so the queue does not explode) and whether you store distance or parent to reconstruct the path. If you DFS these problems you will find a path, not a shortest path.",
    theory: [
      "BFS explores in order of hop count from the source. The queue holds the frontier. When you pop u at distance d, every unseen neighbor is at distance d+1. That is why the first time you see the target, d is minimal — there is no shorter hop-path, because every closer node was already processed.",
      "Multi-source BFS starts with several nodes in the queue at distance 0 (rotting oranges, nearest 0, walls and gates). It is the same algorithm: you are computing distance to the closest source. 0-1 BFS and Dijkstra generalize the same 'expand best first' idea when edges are not all weight 1.",
      "On bipartite graphs, BFS also 2-colors. On trees, BFS is level order. The graph must be explicit or implicit (grid neighbors, word mutations). Always state the node space — implicit graphs can be huge (lock combinations, 8-puzzle).",
    ],
    howItWorks: [
      "dist[s] = 0, queue = [s], visited = {s}.",
      "While queue: u = pop front. If u is the target, return dist[u] (and optional parent chain).",
      "For each neighbor v: if not visited, visited.add(v), dist[v] = dist[u]+1, parent[v] = u, push v.",
      "If the queue empties, the target is unreachable.",
    ],
    whenToUse: [
      "Shortest path in unweighted or unit-weight graphs.",
      "Level-order properties, multi-source distance, connected-component flood with distances.",
    ],
    whenNotToUse: [
      "Positive varying weights — Dijkstra. 0/1 weights — 0-1 BFS. Negative weights — Bellman-Ford.",
      "You only need any path or a topological property — DFS may be simpler.",
    ],
    complexity: {
      time: "O(V + E)",
      space: "O(V)",
    },
    interviewTips: [
      "Word ladder, perfect squares, open-the-lock, maze shortest path: all BFS.",
      "If the interviewer says 'minimum,' ask if edges are equal weight before you Dijkstra.",
    ],
    pitfalls: [
      "Marking on dequeue so the same node enters the queue thousands of times.",
      "Using a stack and calling it BFS.",
      "Forgetting diagonal vs 4-direction on grids.",
    ],
    practiceIdeas: [
      "Binary tree level order; number of islands (or use DFS).",
      "Word Ladder; Rotting Oranges; 01 Matrix.",
      "Shortest path with parent reconstruction.",
    ],
    related: [
      "dfs",
      "bfs-shortest-path",
      "bfs-dfs-iterative",
      "dijkstra",
      "zero-one-bfs",
      "islands",
    ],
  },
  {
    slug: "dfs",
    track: "dsa",
    category: "Graphs",
    title: "Depth-First Search",
    summary:
      "Dive along one path until you cannot, then backtrack. The workhorse for connectivity, cycle detection, topological sort, and flood fill.",
    depth: "core",
    whyItMatters:
      "DFS is the graph recursion you must write in your sleep: color or mark, recurse on unseen neighbors, optionally record enter/exit times. Those finishing times are what make topological sort and Kosaraju work. Interviewers use islands, clone graph, and course-schedule as DFS tests. Recursion depth on a 10^5 chain is a real failure mode — know the iterative stack.",
    theory: [
      "Color convention: white = unseen, gray = on the stack (in progress), black = finished. A gray neighbor in a directed graph is a back edge and a cycle. In an undirected graph you must ignore the parent edge, or every edge looks like a cycle.",
      "Enter/exit times define ancestor relationships: u is an ancestor of v if enter[u] < enter[v] < exit[v] < exit[u]. Tree edges, forward edges, back edges, and cross edges are classified by these colors and times. You rarely need all four names in an interview, but you need back edges.",
      "DFS forests depend on the order of the adjacency lists. They are not unique. Do not assume DFS finds short paths. Use it for existence, structure, and ordering, not for distances (unless you memoize a DAG).",
    ],
    howItWorks: [
      "dfs(u): mark u gray. for v in adj[u]: if v is white, parent[v]=u, dfs(v); else if v is gray (and v is not parent when undirected), cycle. mark u black; push u onto a finish list.",
      "Iterate all vertices as start points so you cover disconnected graphs.",
      "On a grid, the 'adj' is the four in-bounds unvisited cells with the right value.",
    ],
    whenToUse: [
      "Connectivity, flood fill, cycle detection, topological sort, path existence, SCC pre-pass.",
    ],
    whenNotToUse: [
      "Unweighted shortest path — BFS.",
      "Deep skinny graphs in a language with a small stack — iterate.",
    ],
    complexity: {
      time: "O(V + E)",
      space: "O(V) colors plus O(V) stack worst case",
    },
    interviewTips: [
      "For 'can I finish courses,' DFS cycle detection or Kahn — name both.",
      "Clone Graph is DFS/BFS with a map from old node to new node. The map is the visited set.",
    ],
    pitfalls: [
      "Treating the parent as a back edge in an undirected graph.",
      "Not looping over all start nodes on a disconnected graph.",
      "Returning the first path and claiming it is shortest.",
    ],
    practiceIdeas: [
      "Number of Islands; Clone Graph; Course Schedule.",
      "All paths from source to target on a DAG.",
      "Iterative DFS that matches recursive preorder.",
    ],
    related: [
      "bfs",
      "cycle-directed",
      "cycle-undirected",
      "topo-sort-dfs",
      "connected-components",
      "scc-kosaraju",
    ],
  },
  {
    slug: "cycle-undirected",
    track: "dsa",
    category: "Graphs",
    title: "Cycle Detection in Undirected Graphs",
    summary:
      "DFS: a visited neighbor that is not your parent is a cycle. Union-Find: if two ends of an edge are already in the same component, that edge closes a cycle.",
    depth: "core",
    whyItMatters:
      "Undirected cycle detection is how you know a graph is a tree (connected + acyclic) and how Kruskal rejects edges. Interviews will give you an n-node n-edge graph ('redundant connection') and expect Union-Find. DFS is equally valid if you handle the parent correctly — that parent bug is the usual fail.",
    theory: [
      "In an undirected connected graph, |E| ≥ |V| implies a cycle. That is a fast global check but does not find the edge. To find one, DFS from each unseen node, passing the parent. If adj[u] contains v already visited and v !== parent[u], u–v is a back edge.",
      "Union-Find processes edges as unions. Before uniting u and v, if find(u) === find(v), u and v were already connected and this edge is extra. That is Redundant Connection. Path compression + union by rank makes this nearly O(E).",
      "A self-loop is a cycle. Parallel edges (two edges u–v) are a cycle of length 2 if the graph model allows multis. Ask about both.",
    ],
    howItWorks: [
      "DFS: for each unseen u, dfs(u, parent=-1). Inside, for each v, if !seen[v] dfs(v,u); else if v !== parent return true.",
      "UF: for each edge (u,v): if find(u)==find(v) return that edge; else union(u,v).",
    ],
    whenToUse: [
      "Is the graph a forest / tree? Which edge creates a cycle?",
      "Kruskal's reject step.",
    ],
    whenNotToUse: [
      "Directed graphs — a back edge is defined differently; use directed cycle detection.",
    ],
    complexity: {
      time: "O(V + E) DFS; O(E α(V)) Union-Find",
      space: "O(V)",
    },
    interviewTips: [
      "If the input is an edge list of a nearly-tree, start with Union-Find.",
      "State 'I ignore the parent edge' when you write DFS.",
    ],
    pitfalls: [
      "No parent argument → every undirected edge looks like a cycle.",
      "1-indexed vs 0-indexed nodes in UF parent arrays.",
    ],
    practiceIdeas: [
      "Graph Valid Tree; Redundant Connection.",
      "Detect cycle and return the vertices on it (walk parents).",
    ],
    related: [
      "cycle-directed",
      "union-find",
      "dfs",
      "kruskal",
      "connected-components",
    ],
  },
  {
    slug: "cycle-directed",
    track: "dsa",
    category: "Graphs",
    title: "Cycle Detection in Directed Graphs",
    summary:
      "A back edge to a gray node (on the current recursion stack) means a directed cycle. Kahn's algorithm: if you cannot peel all nodes, leftover nodes are in cycles.",
    depth: "core",
    whyItMatters:
      "Course schedule, deadlock, and 'is this graph a DAG?' are this problem. Visited-alone is not enough: in a directed graph you can see a black node via a cross edge without a cycle. You need the three-color or an explicit recStack. Kahn's leftover is the non-recursive alternative and pairs with topological sort.",
    theory: [
      "Three colors: white/gray/black. Gray neighbor = back edge = cycle. Black neighbor is fine (cross or forward). After DFS finishes a node it becomes black, so later starts will not treat it as on-stack.",
      "Kahn: queue all indegree-0 nodes, peel them, reduce neighbors' indegree. If the count of peeled nodes is < V, the rest live in at least one cycle. You do not immediately get the cycle vertices without more work, but you get the boolean and a partial order of the rest.",
      "Finding the actual cycle: when you see a back edge u→v, v is on the stack; walk the parent pointers from u until v. That is the cycle. State machines and functional graphs (outdegree 1) can also use Floyd.",
    ],
    howItWorks: [
      "color = white. for each u if white: if dfs(u) return true. dfs: color gray; for v: if gray return true; if white && dfs(v) return true; color black; return false.",
      "Kahn: if peeled < n, cycle exists.",
    ],
    whenToUse: [
      "DAG validation, course prerequisites, deadlock detection.",
    ],
    whenNotToUse: [
      "Undirected graphs — use the parent version or UF. A directed algorithm on undirected-as-two-arcs treats every edge as a 2-cycle.",
    ],
    complexity: {
      time: "O(V + E)",
      space: "O(V)",
    },
    interviewTips: [
      "Course Schedule I is this boolean. II is Kahn's order if peeled === n.",
      "Say 'gray means on the stack' so they know you will not use a single visited flag.",
    ],
    pitfalls: [
      "Single boolean visited — misses the gray/black distinction and both false-positives and false-negatives depending on write-up.",
      "Building the graph in the wrong direction (edge a→b meaning b depends on a vs the reverse).",
    ],
    practiceIdeas: [
      "Course Schedule I and II.",
      "Find Eventual Safe States (nodes not on any cycle / that do not reach one).",
      "Print one directed cycle.",
    ],
    related: [
      "cycle-undirected",
      "topo-sort-kahn",
      "topo-sort-dfs",
      "dfs",
      "floyd-cycle",
    ],
  },
  {
    slug: "topo-sort-kahn",
    track: "dsa",
    category: "Graphs",
    title: "Topological Sort (Kahn)",
    summary:
      "Repeatedly take indegree-0 nodes from a queue. The peel order is a topological order if and only if the graph is a DAG.",
    depth: "core",
    whyItMatters:
      "Kahn's algorithm is the interview-friendly topo sort: BFS-shaped, easy to detect cycles, easy to produce the lexicographically smallest order with a min-heap instead of a queue. Course Schedule II, alien dictionary, and 'build order' are this. If they ask for any valid order, a queue is enough.",
    theory: [
      "In a DAG there is at least one source (indegree 0). Remove it and its out-edges; the rest is still a DAG. Induction gives a full order. If at some point no source remains but nodes do, those nodes are in a cycle.",
      "The algorithm is not unique: any source can be peeled next. A min-heap of sources yields the lexicographically smallest sequence — Alien Dictionary sometimes wants that. Parallelism / course-semester problems count how many peels you can do in one 'round' (all current sources).",
      "Topo order lets you DP on DAGs: process nodes in this order so predecessors are done. Shortest/longest paths in a DAG are O(V+E) after Kahn or DFS order — no Dijkstra needed.",
    ],
    howItWorks: [
      "Compute indegree[]. Queue every node with indegree 0.",
      "While queue: u = pop; order.push(u); for v in adj[u]: indegree[v]--; if 0, push v.",
      "If order.length < n, return error (cycle). Else return order.",
    ],
    whenToUse: [
      "Ordering tasks with prerequisites; DP on DAG; unique/lex smallest order questions.",
    ],
    whenNotToUse: [
      "The graph may have cycles and they still want a partial order of the acyclic part — Kahn already gives that (the peeled prefix).",
      "Undirected graphs — topo sort is defined for directed acyclic graphs.",
    ],
    complexity: {
      time: "O(V + E); O(E + V log V) with a heap for lex-smallest",
      space: "O(V)",
    },
    interviewTips: [
      "Alien Dictionary: build a graph of letter inequalities from adjacent words, then Kahn. Handle invalid prefixes (app after apple).",
      "If they want DFS topo, say you can do finishing times; write Kahn unless they insist.",
    ],
    pitfalls: [
      "Nodes that never appear in the edge list still need to be in the order.",
      "Using the edge the wrong way so indegrees are inverted.",
      "Returning an order when peeled < n.",
    ],
    practiceIdeas: [
      "Course Schedule II.",
      "Alien Dictionary.",
      "Longest path in a DAG using topo + DP.",
    ],
    related: [
      "topo-sort-dfs",
      "cycle-directed",
      "bfs",
      "bellman-ford",
    ],
  },
  {
    slug: "topo-sort-dfs",
    track: "dsa",
    category: "Graphs",
    title: "Topological Sort (DFS)",
    summary:
      "Run DFS and append each node after its descendants finish. Reverse the finish list (or push onto a stack) to get a topo order.",
    depth: "next",
    whyItMatters:
      "DFS topo is the other textbook method and the first half of Kosaraju. Interviewers use it to check finishing times. You must still detect cycles (gray back edges); dumping a finish order on a cyclic graph is not a topo order. Prefer this when you already have a DFS going, or when you need the reverse graph later for SCCs.",
    theory: [
      "In a DAG, every out-neighbor of u finishes before u if you recurse on them first. So a postorder listing is a reverse topo order. Reverse it (or push onto a stack at finish) to print sources first.",
      "Why it fails on cycles: a back edge means some v that should come after u is already on the stack, so no linear extension exists. Checking colors is mandatory, not optional hygiene.",
      "The finish order of the original graph is also what Kosaraju uses as the order to DFS the reversed graph. Remember: first pass on G, second on G^T in decreasing finish time.",
    ],
    howItWorks: [
      "For each white node, dfs. In dfs: gray; for each white neighbor dfs; black; stack.push(u).",
      "If you ever see gray, abort (cycle).",
      "Pop the stack for the topo order.",
    ],
    whenToUse: [
      "You want topo order and already think in DFS; SCC Kosaraju's first pass.",
    ],
    whenNotToUse: [
      "You want the simplest cycle-aware interview code — Kahn is usually clearer.",
    ],
    complexity: {
      time: "O(V + E)",
      space: "O(V)",
    },
    interviewTips: [
      "Say 'postorder then reverse' and mention the gray check in the same sentence.",
    ],
    pitfalls: [
      "Preorder push — that is not topo.",
      "Forgetting disconnected starts.",
      "Reversing twice and shipping the finish order by mistake.",
    ],
    practiceIdeas: [
      "Course Schedule via DFS colors + finish stack.",
      "First pass of Kosaraju on a small graph, by hand.",
    ],
    related: [
      "topo-sort-kahn",
      "dfs",
      "scc-kosaraju",
      "cycle-directed",
    ],
  },
  {
    slug: "bfs-shortest-path",
    track: "dsa",
    category: "Graphs",
    title: "BFS Shortest Path",
    summary:
      "On unweighted edges, BFS distance is the shortest hop count. Store parents if you must reconstruct one such path.",
    depth: "core",
    whyItMatters:
      "This is BFS specialized to the path question so you practice reconstruction and multi-source. Interviewers ask for the path, not just the length, and people who only stored a visited set freeze. It is also the correctness proof you will reuse: Dijkstra is 'BFS with a better frontier' when weights vary.",
    theory: [
      "Hop distance satisfies dist[s]=0 and dist[v] = 1 + min dist[u] over edges u→v. BFS evaluates this by increasing dist. Uniqueness is not guaranteed; any parent that first discovered v is a valid shortest-path tree. To list all shortest paths, record all parents that discover v at the same best dist (word ladder II).",
      "If edges have positive weights that are all equal, BFS still works. If they differ, BFS on hops is the wrong metric. Do not 'BFS and hope.'",
    ],
    howItWorks: [
      "Standard BFS with dist and parent arrays.",
      "Reconstruct: from t, walk parent until s, reverse the list. If parent[t] never set, no path.",
      "Multi-source: initialize the queue with all sources at dist 0.",
    ],
    whenToUse: [
      "Shortest hop path; reconstruct one or all shortest paths in unweighted graphs.",
    ],
    whenNotToUse: [
      "Weighted edges.",
    ],
    complexity: {
      time: "O(V + E)",
      space: "O(V)",
    },
    interviewTips: [
      "If they want all shortest paths, do not DFS from the source; BFS first for dist, then DFS/BFS only along edges that go dist+1.",
    ],
    pitfalls: [
      "Reconstructing with a DFS that ignores dist and returns a long path.",
      "Off-by-one on including the source in the path length.",
    ],
    practiceIdeas: [
      "Shortest path in a binary matrix (8-direction).",
      "Word Ladder I (length) and II (all paths).",
      "Restore the path in a maze.",
    ],
    related: [
      "bfs",
      "dijkstra",
      "zero-one-bfs",
      "a-star",
    ],
  },
  {
    slug: "dijkstra",
    track: "dsa",
    category: "Graphs",
    title: "Dijkstra's Algorithm",
    summary:
      "Greedy shortest paths for non-negative weights: always expand the node with the smallest tentative distance, then relax its edges.",
    depth: "core",
    whyItMatters:
      "Dijkstra is the weighted-graph interview. Network delay time, cheapest flights with constraints (sometimes not Dijkstra), path with minimum effort, and map routing all sit here. You must state the non-negative assumption, implement a min-heap of pairs, and skip stale heap entries. If you cannot write the loop, you do not know it.",
    theory: [
      "Tentative dist[u] is an upper bound on the true distance. When you extract the globally smallest tentative dist, that value is final: any remaining path would have to pass through a not-yet-extracted node, which cannot be closer because weights are ≥ 0 and those nodes have larger tentatives. Negative weights destroy this argument.",
      "Relaxation: if dist[u] + w(u,v) < dist[v], set dist[v] and push into the heap. Binary-heap Dijkstra is O((V+E) log V) with lazy inserts. Dense graphs can use a simple O(V²) array scan for the next closest — still taught, rarely needed in interviews unless V is tiny and E is V².",
      "Variants: early exit when the target is extracted; k-shortest is more than Dijkstra; constraints like 'at most k stops' are often Bellman-Ford / DP, not vanilla Dijkstra.",
    ],
    howItWorks: [
      "dist = ∞, dist[s] = 0. min-heap of [dist, node]. optional parent.",
      "Pop [d,u]; continue if d > dist[u]. For each (v,w): nd = d+w; if nd < dist[v]: dist[v]=nd; push [nd,v]; parent[v]=u.",
      "Return dist[t] or the parent path. ∞ means unreachable.",
    ],
    whenToUse: [
      "Non-negative edge weights, single source (or small number of sources).",
    ],
    whenNotToUse: [
      "Negative edges — Bellman-Ford. Unweighted — BFS. 0-1 weights — 0-1 BFS.",
      "All-pairs dense — Floyd-Warshall may be simpler.",
    ],
    complexity: {
      time: "O((V + E) log V) binary heap; O(V²) array",
      space: "O(V + E)",
    },
    interviewTips: [
      "Write the stale-skip. Talk through a 3-node negative-weight counterexample if they ask why not negatives.",
      "Cheapest Flights Within K Stops is not plain Dijkstra unless you put stops in the state.",
    ],
    pitfalls: [
      "Using a queue (BFS) on weighted edges.",
      "Marking visited before relaxing, so a later better dist is ignored — only mark/finalize on extract, and even then only if you skip stales.",
      "Adding weights that can overflow; use a safe infinity.",
    ],
    practiceIdeas: [
      "Network Delay Time; Path With Minimum Effort.",
      "Dijkstra on an adjacency matrix (O(V²)).",
      "Reconstruct the cheapest path.",
    ],
    related: [
      "dijkstra-heap",
      "bellman-ford",
      "bfs",
      "a-star",
      "zero-one-bfs",
      "floyd-warshall",
    ],
  },
  {
    slug: "bellman-ford",
    track: "dsa",
    category: "Graphs",
    title: "Bellman-Ford",
    summary:
      "Relax every edge V−1 times. Handles negative weights and reports a negative cycle if the V-th pass still improves a reachable distance.",
    depth: "next",
    whyItMatters:
      "Bellman-Ford is the answer when Dijkstra's assumption fails, and the engine of 'cheapest path with at most k edges' (stop after k relax rounds). Interviewers use it for negative-cycle detection (arbitrage) and to see if you know why V−1 rounds suffice: a simple shortest path has at most V−1 edges.",
    theory: [
      "After i full relax passes, dist[u] is correct for all shortest paths that use ≤ i edges (if no negative cycle). After V−1, every simple path is covered. A further improving relax means a negative cycle is reachable from the source (or, if you care about any cycle, from somewhere — initialize all dist=0 to detect any negative cycle).",
      "SPFA is a queue-optimized Bellman-Ford that only re-relaxes nodes that improved. Average fast, worst-case still exponential on crafted graphs. Fine to mention, risky to rely on in adversarial contests.",
      "You can stop early if a whole pass does nothing. For 'at most k stops,' run min(k, V-1) passes — that is the DP view (see also 0-1 knapsack-like edge counting).",
    ],
    howItWorks: [
      "dist[s]=0, others ∞.",
      "Repeat V-1 times: for each edge u→v weight w, if dist[u]+w < dist[v], dist[v]=dist[u]+w (and parent[v]=u).",
      "One more pass: if any relax succeeds on a node you care about, report a negative cycle. To list the cycle, start from that v, walk parent V times to enter the cycle, then walk until repeat.",
    ],
    whenToUse: [
      "Negative weights, negative-cycle detection, shortest path with a bound on edge count.",
    ],
    whenNotToUse: [
      "Non-negative weights — Dijkstra is faster.",
      "Unweighted — BFS.",
    ],
    complexity: {
      time: "O(V E)",
      space: "O(V)",
    },
    interviewTips: [
      "Arbitrage: log-transform rates so a profitable cycle is a negative cycle, then Bellman-Ford.",
      "Cheapest Flights Within K Stops: relax only using a snapshot of the previous iteration's dist so you do not use more than one extra hop per pass.",
    ],
    pitfalls: [
      "Relaxing in place for the k-stop problem and accidentally allowing more than k hops in one pass.",
      "Reporting a negative cycle that is not reachable from s when the problem only cares about s.",
      "Using Dijkstra 'because the heap is faster' on negative edges.",
    ],
    practiceIdeas: [
      "Network with negative edges; detect a negative cycle.",
      "Cheapest Flights Within K Stops.",
      "Currency arbitrage via log weights.",
    ],
    related: [
      "dijkstra",
      "floyd-warshall",
      "topo-sort-kahn",
      "dijkstra",
    ],
  },
  {
    slug: "kruskal",
    track: "dsa",
    category: "Graphs",
    title: "Kruskal's MST",
    summary:
      "Sort edges by weight, add an edge when it joins two components (Union-Find). The first V−1 accepted edges are a minimum spanning tree.",
    depth: "next",
    whyItMatters:
      "Kruskal is greedy + Union-Find. Interviewers use 'min cost to connect all points' (complete graph of distances) and 'optimize water distribution' (a virtual well node). If you forget to skip edges inside a component, you build a cycle, not a tree. The cut proof is the same family as Prim.",
    theory: [
      "A spanning tree of a connected undirected graph has V−1 edges and no cycles. Kruskal considers edges in increasing weight. The cut property: the cheapest edge across any partition is safe for some MST. Union-Find tests 'is this edge across a cut (different components)?'",
      "If the graph is disconnected, you get a minimum spanning forest. If they asked for a single tree, check that you united V−1 times; otherwise impossible.",
      "Sorting dominates: O(E log E). For dense complete graphs (n points, n² edges) you may prefer Prim with a heap, or a better geometric MST, but Kruskal is still acceptable for n ≲ 1000.",
    ],
    howItWorks: [
      "Sort edges by weight. UF of V nodes. ans = 0, taken = 0.",
      "For each edge u,v,w: if find(u)!=find(v), union, ans += w, taken++.",
      "If taken === V-1 return ans else impossible.",
    ],
    whenToUse: [
      "Undirected MST / MSF, especially when you already have an edge list.",
    ],
    whenNotToUse: [
      "Directed graphs — MST is undirected; arborescences are a different algorithm (Edmonds).",
      "Dynamic MST under many updates — heavier structures.",
    ],
    complexity: {
      time: "O(E log E)",
      space: "O(V)",
    },
    interviewTips: [
      "Min Cost to Connect All Points: generate all pairs as edges, then Kruskal. Mention Prim as an alternative.",
      "A water well is a virtual node 0 connected to each house by well cost.",
    ],
    pitfalls: [
      "Not sorting.",
      "Adding an edge without the UF check.",
      "1-indexed houses vs 0-indexed UF.",
    ],
    practiceIdeas: [
      "Min Cost to Connect All Points.",
      "Optimize Water Distribution.",
      "Detect if a graph is a tree by Kruskal accepting n-1 zero-weight edges of an unweighted graph.",
    ],
    related: [
      "prim",
      "union-find",
      "greedy-mst",
      "cycle-undirected",
    ],
  },
  {
    slug: "prim",
    track: "dsa",
    category: "Graphs",
    title: "Prim's MST",
    summary:
      "Grow a tree from a start node, always adding the cheapest edge that leaves the tree. A min-heap of candidate edges (or nodes) implements the pick.",
    depth: "next",
    whyItMatters:
      "Prim is Dijkstra's cousin: same heap loop, different meaning (edge weight, not path sum). It is nicer than Kruskal on dense adjacency matrices (O(V²) without a heap). Interviews accept either MST algorithm; you should know one well and the other by name and difference (edge-sort vs grow-tree).",
    theory: [
      "Start from any node in a connected graph. The cut is 'in the tree' vs 'out.' The cheapest edge across is safe (cut property). Repeat until all nodes are in. Heap: store (weight, node) for the best known edge into each outsider; when you pop a node already in the tree, skip.",
      "O(V²) Prim: maintain dist[v] = cheapest edge from the tree to v, each step scan all outsiders for the min dist. Good when E ≈ V². Heap Prim is O(E log V).",
      "Unlike Dijkstra, you do not add weights along a path; you replace the key with the raw edge weight into the tree. Mixing the two is a common bug.",
    ],
    howItWorks: [
      "inTree = empty, heap = [(0, start)], ans = 0.",
      "While heap and tree incomplete: pop (w,u). if u in tree continue. add u, ans += w. for each (v,wuv): if v not in tree, push (wuv, v).",
      "If you never absorbed V nodes, the graph was disconnected.",
    ],
    whenToUse: [
      "MST from an adjacency list or matrix, especially dense graphs (array Prim).",
    ],
    whenNotToUse: [
      "You already have a sorted edge list and a UF handy — Kruskal is less code.",
    ],
    complexity: {
      time: "O(E log V) heap; O(V²) array",
      space: "O(V + E)",
    },
    interviewTips: [
      "Say 'like Dijkstra but the key is the edge into the tree, not a path sum.'",
      "Start from node 0; if the graph might be disconnected, loop over starts like a forest.",
    ],
    pitfalls: [
      "Using path-sum keys (writing Dijkstra by accident).",
      "Not skipping nodes already in the tree (OK for correctness with min keys, wasteful).",
    ],
    practiceIdeas: [
      "Min Cost to Connect All Points via Prim.",
      "O(V²) Prim on an adjacency matrix.",
    ],
    related: [
      "kruskal",
      "dijkstra",
      "greedy-mst",
      "heap-insert-extract",
    ],
  },
  {
    slug: "union-find",
    track: "dsa",
    category: "Graphs",
    title: "Union-Find (Disjoint Set Union)",
    summary:
      "Maintain a partition of elements under Union and Find. Path compression plus union by rank makes almost O(1) operations and powers Kruskal, components, and equality equations.",
    depth: "core",
    whyItMatters:
      "Union-Find is a must-have. Number of provinces, accounts merge, redundant connection, equations possible, and Kruskal all collapse to it. Interviewers expect you to write parent[], find with path compression, and union by rank/size without looking it up. The mental model is 'named forests of trees,' not a graph search.",
    theory: [
      "find(x) walks to the root (the representative). Path compression sets every node on that walk to the root so later finds are flat. union(a,b) hangs the smaller-rank tree under the other so the forest stays shallow. Together the amortized time is the inverse Ackermann α(n) ≈ 4 for any real n.",
      "You can store extra data on the root: component size, modulo offset (weighted UF for 'a − b = d' equations), or bipartite parity (xor of path weights). Those variants solve 'satisfiability of equality equations' and 'bipartite checks online.'",
      "UF does not naturally answer 'what is the path' or 'is this graph cyclic in a directed sense.' It is for undirected connectivity and equivalence relations.",
    ],
    howItWorks: [
      "parent[i] = i, rank[i] = 0.",
      "find(x): if parent[x] !== x, parent[x] = find(parent[x]); return parent[x].",
      "union(a,b): ra=find(a), rb=find(b); if ra===rb return false. Attach lower rank under higher; if ranks equal, increment the winner's rank. Return true (you merged).",
    ],
    whenToUse: [
      "Dynamic connectivity, MST, grouping equals, merging accounts, redundant edges.",
    ],
    whenNotToUse: [
      "Directed reachability — UF will happily merge against the arrow.",
      "You need to split a component (union is easy, split is not).",
    ],
    complexity: {
      time: "α(n) amortized per op with both optimizations",
      space: "O(n)",
    },
    interviewTips: [
      "Write find with compression even if you skip rank — still fine for n ≤ 10^5 in interviews. Rank is a plus.",
      "Accounts Merge: union emails, then group by find(email).",
    ],
    pitfalls: [
      "union without find — hanging mid-nodes and breaking representatives.",
      "Forgetting to map labels (emails, strings) to ids.",
      "1-based nodes and a parent array that is too short.",
    ],
    practiceIdeas: [
      "Number of Provinces; Redundant Connection; Accounts Merge.",
      "Satisfiability of Equality Equations.",
      "Kruskal using your UF.",
    ],
    related: [
      "kruskal",
      "connected-components",
      "cycle-undirected",
      "bipartite",
    ],
  },
  {
    slug: "bipartite",
    track: "dsa",
    category: "Graphs",
    title: "Bipartite Check",
    summary:
      "Two-color the graph with BFS or DFS. A neighbor the same color as you is an odd cycle — not bipartite.",
    depth: "core",
    whyItMatters:
      "Is Graph Bipartite is a standard medium, and many 'split into two groups / no two friends in the same team' problems are this. Bipartite graphs are exactly the graphs without odd cycles. Matching algorithms (Hopcroft–Karp) need this structure. Union-Find with parity is the online version.",
    theory: [
      "Try to color nodes 0/1 so every edge is bichromatic. BFS: paint the source 0, push, paint neighbors the opposite color. If you see a painted neighbor with the wrong color, fail. Repeat for each component.",
      "Odd cycle ⇒ not bipartite. Conversely, if coloring fails you have found an odd cycle. Even cycles are fine. Trees are always bipartite.",
      "Directed bipartite is not the usual interview; they mean the underlying undirected graph, or a directed graph you treat as undirected. Ask.",
    ],
    howItWorks: [
      "color = -1. For each unseen u: queue u, color[u]=0. While queue: x=pop; for v in adj[x]: if color[v]==-1, color[v]=1-color[x], push v; else if color[v]==color[x] return false.",
      "Return true if every component succeeds.",
    ],
    whenToUse: [
      "Two-coloring, odd-cycle detection, 'can we split into two sets with edges only across.'",
    ],
    whenNotToUse: [
      "You need a maximum matching — coloring is only the first check.",
    ],
    complexity: {
      time: "O(V + E)",
      space: "O(V)",
    },
    interviewTips: [
      "Disconnected graphs: loop all starts. One BFS from node 0 is a common fail.",
      "Possible Bipartition is the same problem with 'dislike' edges.",
    ],
    pitfalls: [
      "Not coloring a neighbor before pushing, then processing conflicting paints.",
      "Using Union-Find without parity and thinking two endpoints of an edge should be united (they should be in opposite sets).",
    ],
    practiceIdeas: [
      "Is Graph Bipartite; Possible Bipartition.",
      "UF-with-parity version.",
    ],
    related: [
      "bfs",
      "dfs",
      "union-find",
      "cycle-undirected",
    ],
  },
  {
    slug: "connected-components",
    track: "dsa",
    category: "Graphs",
    title: "Connected Components",
    summary:
      "In an undirected graph, a component is a maximal reachable set. DFS/BFS floods one; Union-Find merges them from the edge list. Count the floods or the leftover roots.",
    depth: "core",
    whyItMatters:
      "Components are the first graph-counting question: number of provinces, friend circles, connected components in a grid (islands). You should be able to do it three ways and pick based on the input format (matrix vs edge list). Directed graphs have weakly vs strongly connected components — do not mix the terms.",
    theory: [
      "Undirected: u and v are in the same component iff a path exists. Flood fill from each unseen node and increment a counter. Union-Find: union each edge, then count unique find(i) among nodes that exist.",
      "Directed weak components: ignore direction and do the above. Strong components: every pair is mutually reachable — Kosaraju or Tarjan, not a single undirected flood.",
      "On grids, a component is usually 4-connected equal cells. The algorithm is the same flood with implicit edges.",
    ],
    howItWorks: [
      "visited array. ans = 0. for u in nodes: if !visited[u], ans++, dfs/bfs flood.",
      "UF: union edges; ans = number of roots (parent[i]===i) among relevant nodes.",
    ],
    whenToUse: [
      "Count or label undirected components; preprocess queries 'are u and v connected?' (then UF or one flood + labels).",
    ],
    whenNotToUse: [
      "You need strong connectivity — SCC algorithms.",
    ],
    complexity: {
      time: "O(V + E)",
      space: "O(V)",
    },
    interviewTips: [
      "Number of Provinces is UF on an adjacency matrix or DFS on the matrix rows.",
      "If they then ask dynamic edges, UF is the one that extends.",
    ],
    pitfalls: [
      "Counting nodes instead of floods.",
      "Forgetting isolated vertices.",
    ],
    practiceIdeas: [
      "Number of Provinces; Number of Connected Components in an Undirected Graph.",
      "Label components and answer q reachability queries.",
    ],
    related: [
      "islands",
      "union-find",
      "dfs",
      "scc-kosaraju",
    ],
  },
  {
    slug: "islands",
    track: "dsa",
    category: "Graphs",
    title: "Islands and Grid Flood Fill",
    summary:
      "Treat the grid as a graph. DFS/BFS/UF from each unvisited land cell paints a whole island. Count the paints. Variants ask perimeters, max area, or surrounded regions.",
    depth: "core",
    whyItMatters:
      "Number of Islands is the grid-graph interview. If you can flood a component, you can do max-area, Pacific-Atlantic, surrounded regions, and distinct islands (normalize shapes). Interviewers care about bounds checks, marking visited (often in-place as '0'), and not double-counting.",
    theory: [
      "Each land cell has up to four (or eight) land neighbors. A flood from (r,c) marks every cell in its component. The number of times you start a flood on an unmarked land cell is the number of islands. In-place marking saves a visited matrix but destroys the input — ask.",
      "Union-Find: union a land cell with its land neighbors (map (r,c) → r*cols+c). Count roots that are land. Useful if the grid is given as a stream of additions (Number of Islands II).",
      "Surrounded regions flip O→X when the component does not touch a border: flood from borders first and protect those, then flip the rest. Pacific-Atlantic is two floods from two shores.",
    ],
    howItWorks: [
      "ans=0. for r,c if grid[r][c] is land: ans++, dfs mark all reachable land as water/visited.",
      "dfs: bounds + land check, mark, recurse 4 dirs.",
      "For max area, return 1+sum of recursive calls instead of only marking.",
    ],
    whenToUse: [
      "Any grid component problem: islands, regions, lakes, rain flow.",
    ],
    whenNotToUse: [
      "You need shortest path on the grid — BFS, not a component count.",
    ],
    complexity: {
      time: "O(rows · cols)",
      space: "O(rows · cols) worst-case stack; UF is O(rc)",
    },
    interviewTips: [
      "Ask 4- vs 8-connected. Write a dirs array. Do not copy-paste four ifs if you can loop.",
      "Islands II (add land over time) is UF with a count that increments on add and decrements on each successful union.",
    ],
    pitfalls: [
      "Recursing into water or out of bounds.",
      "Not marking before recursing and blowing the stack on a huge island (mark first).",
      "Off-by-one on rows vs cols in the linear UF id.",
    ],
    practiceIdeas: [
      "Number of Islands; Max Area of Island.",
      "Surrounded Regions; Pacific Atlantic Water Flow.",
      "Number of Distinct Islands (normalize path signature).",
    ],
    related: [
      "connected-components",
      "dfs",
      "bfs",
      "union-find",
    ],
  },
  {
    slug: "floyd-warshall",
    track: "dsa",
    category: "Graphs",
    title: "Floyd-Warshall",
    summary:
      "Triple loop: try each intermediate k, then i, j. dp[i][j] = min(dp[i][j], dp[i][k]+dp[k][j]). All-pairs shortest paths including negatives (no negative cycles).",
    depth: "next",
    whyItMatters:
      "When V is small (≤ 400) and you need every pair, Floyd is the algorithm you can write in six lines. Find the City With the Smallest Number of Neighbors, course-like reachability with weights, and transitive closure (OR instead of min-plus) are the interviews. People who launch V Dijkstras on a dense graph write more and gain little.",
    theory: [
      "After considering intermediates 0..k, dp[i][j] is the shortest i→j path whose internal nodes are in {0..k}. The recurrence is 'use k or not.' That is why k is the outer loop — if k is inner, you use a k that is not yet finalized.",
      "Initialize dp[i][i]=0, dp[i][j]=w(i,j) or ∞. After the loops, dp[i][i] < 0 means a negative cycle involving i. Reachability/transitive closure: replace min-plus with OR-AND (or boolean |=).",
      "O(V³) time and O(V²) memory. Reconstruction: next[i][j] = j initially, set next[i][j]=next[i][k] when you improve through k, then walk i, next[i][j], …",
    ],
    howItWorks: [
      "Fill dp with ∞, 0 on diagonal, edges.",
      "for k in 0..n-1: for i: for j: if dp[i][k]+dp[k][j] < dp[i][j] update.",
      "Watch ∞+x overflow; only add when both sides are finite.",
    ],
    whenToUse: [
      "All-pairs on small V, possibly negative weights, or transitive closure.",
    ],
    whenNotToUse: [
      "Single source, large sparse graph — Dijkstra / Bellman-Ford.",
      "V = 10^4 — cubic is impossible.",
    ],
    complexity: {
      time: "O(V³)",
      space: "O(V²)",
    },
    interviewTips: [
      "Say 'k is the outermost loop' before you type. That is the usual bug they look for.",
      "Find the City is Floyd then count how many j have dp[i][j] ≤ threshold.",
    ],
    pitfalls: [
      "k not outermost.",
      "Adding through ∞ and wrapping integers.",
      "Forgetting dp[i][i]=0 so paths can 'start' wrong.",
    ],
    practiceIdeas: [
      "Find the City With the Smallest Number of Neighbors at a Threshold Distance.",
      "Transitive closure of a directed graph.",
      "Detect a negative cycle via dp[i][i].",
    ],
    related: [
      "dijkstra",
      "bellman-ford",
      "grid-dp",
    ],
  },
  {
    slug: "zero-one-bfs",
    track: "dsa",
    category: "Graphs",
    title: "0-1 BFS",
    summary:
      "Edges have only weights 0 or 1. Use a deque: push_front on a 0-relax, push_back on a 1-relax. Distances come out like Dijkstra but in O(V+E).",
    depth: "advanced",
    whyItMatters:
      "0-1 BFS is the optimization interviewers (and contests) expect when every edge is 0 or 1 — min walls you must break, min deviations from a preferred direction, binary-weight mazes. A heap Dijkstra works and is slower by a log. A normal BFS is wrong because 0-edges should not increase distance.",
    theory: [
      "Dijkstra with weights in {0,1} never needs a heap: the frontier's distances are only d and d+1. A deque keeps 0-weight discoveries at the front (same d) and 1-weight at the back (d+1), so you still pop in nondecreasing dist order.",
      "If you push 0-edges at the back, you process a 1-edge too early relative to a same-layer 0-path and can settle a worse dist first. Either allow re-processing (and lose the linear feel) or use the deque correctly.",
      "This does not extend to weights {0,1,2} without more tricks (Dial's algorithm / buckets). For those, say Dijkstra or Dial.",
    ],
    howItWorks: [
      "dist = ∞, dist[s]=0. deque push s.",
      "While deque: u = pop_front. for each (v,w) in {0,1}: nd = dist[u]+w; if nd < dist[v]: dist[v]=nd; w===0 ? push_front(v) : push_back(v).",
    ],
    whenToUse: [
      "Grid graphs where a move is free or costs 1 (break a wall, change direction).",
    ],
    whenNotToUse: [
      "General weights — Dijkstra. All weights 1 — BFS.",
    ],
    complexity: {
      time: "O(V + E)",
      space: "O(V)",
    },
    interviewTips: [
      "Minimum Obstacle Removal to Reach Corner can be 0-1 BFS (obstacle = 1).",
      "Name the deque. If you write a heap they may ask you to remove the log.",
    ],
    pitfalls: [
      "Using a queue only.",
      "Not checking nd < dist[v] and infinite-looping on 0-cycles (0-cycles are fine if you only push on improvement).",
    ],
    practiceIdeas: [
      "Min obstacle removal; min cost to make at least one valid path (swap 0/1 meaning).",
      "Compare with Dijkstra on the same graph.",
    ],
    related: [
      "bfs",
      "dijkstra",
      "deque",
      "a-star",
    ],
  },
  {
    slug: "bridges-articulation",
    track: "dsa",
    category: "Graphs",
    title: "Bridges and Articulation Points",
    summary:
      "Tarjan's DFS times: a tree edge u–v is a bridge if no back edge from v's subtree climbs to u or above. Articulation points have a similar low-link test (plus a special case for the root).",
    depth: "advanced",
    whyItMatters:
      "Critical connections in a network is the interview (LeetCode 1192). You must explain tin/low and why a back edge to a visited node updates low. Naive 'delete this edge and see if components increase' is O(E(V+E)) and TLE. This is also how you find 2-edge-connected components.",
    theory: [
      "tin[u] is discovery time. low[u] is the smallest tin reachable from u's subtree including back edges. For a tree edge u→v, if low[v] > tin[u], nothing in v's subtree can reach u or above except through u–v, so that edge is a bridge.",
      "u is an articulation point if it is not a leaf in the DFS tree and some child v has low[v] ≥ tin[u] (removing u disconnects v's subtree). The root is an articulation point iff it has two or more DFS children.",
      "Ignore parent edges when considering back edges, same as undirected cycle detection. Multiple edges need care: a double edge is never a bridge.",
    ],
    howItWorks: [
      "timer=0. dfs(u, parent): tin[u]=low[u]=++timer; children=0.",
      "For each neighbor v except parent: if v is unvisited, dfs(v,u), then low[u]=min(low[u], low[v]). If low[v]>tin[u], u–v is a bridge. If low[v]>=tin[u] and u is not the root, u is an articulation point. Count DFS children of the root.",
      "If v is already visited, treat u–v as a back edge and set low[u]=min(low[u], tin[v]). After the loop, the root is an articulation point if it has two or more DFS children.",
    ],
    whenToUse: [
      "Critical edges/nodes, 2-connectivity, network vulnerability.",
    ],
    whenNotToUse: [
      "Directed graphs — bridges are defined here for undirected graphs; directed uses different notions (strong bridges).",
    ],
    complexity: {
      time: "O(V + E)",
      space: "O(V)",
    },
    interviewTips: [
      "Draw tin/low on a 6-node example with one bridge. Then code.",
      "Critical Connections is only bridges, not articulation points — do not overbuild unless asked.",
    ],
    pitfalls: [
      "Using low[v] vs tin[v] on back edges incorrectly (back edges should use tin[v]).",
      "Treating the root like a non-root for articulation.",
      "Comparing low[v] >= tin[u] for bridges (that marks more than bridges; bridges need >).",
    ],
    practiceIdeas: [
      "Critical Connections in a Network.",
      "Find articulation points on a small graph by hand and match your program.",
    ],
    related: [
      "dfs",
      "scc-tarjan",
      "cycle-undirected",
    ],
  },
  {
    slug: "scc-kosaraju",
    track: "dsa",
    category: "Graphs",
    title: "Strongly Connected Components (Kosaraju)",
    summary:
      "DFS to compute finish order, reverse every edge, DFS again in decreasing finish time. Each tree in the second forest is an SCC.",
    depth: "advanced",
    whyItMatters:
      "SCCs compress a directed graph into a DAG of components — the move behind 'eventual safe states,' 2-SAT, and condensing for DP. Kosaraju is the easiest SCC to explain: two DFS passes and a reversed graph. If you only remember one SCC algorithm for interviews, make it this one.",
    theory: [
      "Inside an SCC every pair is mutually reachable. Kosaraju's correctness: the first finish order is a topo-like order of the SCC DAG (component sources finish later). The second DFS on the transpose, started from those late nodes, cannot escape the SCC because outgoing edges in G become incoming in G^T.",
      "After you have components, build the condensation DAG (edges between different SCCs, deduplicated). Then you can topo-DP. 2-SAT: a variable and its negation in the same SCC is unsatisfiable.",
      "Tarjan finds SCCs in one DFS with a stack and low-links. Same power, more state. Mention both; implement Kosaraju unless they ask for one pass.",
    ],
    howItWorks: [
      "DFS all nodes, push on finish (postorder stack).",
      "Build the reversed adjacency list.",
      "While stack: pop u; if unseen in the reverse graph, dfs and collect that SCC.",
    ],
    whenToUse: [
      "Directed mutual reachability, 2-SAT, condensing to a DAG.",
    ],
    whenNotToUse: [
      "Undirected graphs — components are enough; every connected component is 'strong' if you treat edges as bidirectional.",
    ],
    complexity: {
      time: "O(V + E)",
      space: "O(V + E) for the reverse graph",
    },
    interviewTips: [
      "Say the three steps slowly. Draw a 2-SCC graph (A→B, B→A, A→C).",
      "If memory of reverse is an issue, mention Tarjan.",
    ],
    pitfalls: [
      "Second DFS on the original graph.",
      "First pass in preorder instead of finish order.",
      "Forgetting nodes with outdegree 0 still start components.",
    ],
    practiceIdeas: [
      "Compute SCCs and the condensation DAG.",
      "2-SAT on a tiny formula.",
      "Count SCCs (LeetCode-style 'number of provinces' but directed strong).",
    ],
    related: [
      "scc-tarjan",
      "topo-sort-dfs",
      "dfs",
      "connected-components",
    ],
  },
  {
    slug: "scc-tarjan",
    track: "dsa",
    category: "Graphs",
    title: "Tarjan's SCC",
    summary:
      "One DFS: push nodes on a stack, track low-links. When low[u] === tin[u], u is the root of an SCC — pop the stack until u.",
    depth: "advanced",
    whyItMatters:
      "Tarjan is the one-pass SCC and the same low-link family as bridges. Some interviewers (and most CP problems) prefer it because you do not store the reverse graph. If you already know tin/low from bridges, this is the directed upgrade.",
    theory: [
      "low[u] is the smallest tin reachable from u in the DFS tree plus back/cross edges to nodes still on the stack (i.e. in the current partial SCCs). When low[u] stays equal to tin[u], no ancestor is reachable, so u roots an SCC. Everything above u on the stack until u belongs to that SCC.",
      "You must only use back edges to on-stack nodes to update low. An edge to a finished (popped) node goes to another SCC and must not pull low upward across the cut.",
      "The SCCs come out in reverse topological order of the condensation — handy for some DP. Articulation/bridges use a similar low but a different pop rule and an undirected graph.",
    ],
    howItWorks: [
      "tin=low=-1, stack=[], onStack=false, timer=0.",
      "dfs(u): tin=low=++timer; push u; onStack=true. for v: if tin[v]==-1 dfs(v), low[u]=min(low[u],low[v]); else if onStack[v] low[u]=min(low[u],tin[v]).",
      "if low[u]==tin[u]: pop until u, those nodes are an SCC, mark onStack false.",
    ],
    whenToUse: [
      "SCCs without building the transpose; same applications as Kosaraju.",
    ],
    whenNotToUse: [
      "You want the simpler two-DFS story in a 20-minute interview — Kosaraju.",
    ],
    complexity: {
      time: "O(V + E)",
      space: "O(V)",
    },
    interviewTips: [
      "If you already wrote bridges, say 'same low-link idea, stack of the current path of SCCs.'",
    ],
    pitfalls: [
      "Updating low from off-stack nodes.",
      "Forgetting onStack and treating tin[v] < tin[u] as enough.",
      "Infinite recursion on graphs with no guard for already-tinned nodes.",
    ],
    practiceIdeas: [
      "Same SCC tests as Kosaraju; compare component IDs.",
      "2-SAT via Tarjan.",
    ],
    related: [
      "scc-kosaraju",
      "bridges-articulation",
      "dfs",
    ],
  },
  {
    slug: "euler-path",
    track: "dsa",
    category: "Graphs",
    title: "Euler Path and Circuit (Hierholzer)",
    summary:
      "A trail that uses every edge once. Hierholzer: DFS-consume edges and append nodes on exit (postorder). Reverse the list for the path. Check degree conditions first.",
    depth: "advanced",
    whyItMatters:
      "Reconstruct Itinerary (tickets = directed edges) is the interview. People DFS-search permutations of tickets and TLE. Hierholzer is linear in the number of edges. You must know the degree conditions (0 or 2 odd degrees undirected; at most one start/end imbalance directed) and to sort edges if the problem wants the lexicographically smallest path.",
    theory: [
      "Undirected Euler circuit: connected (ignore isolates) and every degree even. Euler path: exactly 0 or 2 odd degrees (start at an odd one). Directed circuit: weakly connected and indegree=outdegree for all. Directed path: exactly one vertex with out-in=1 (start), one with in-out=1 (end), rest equal.",
      "Hierholzer: from the start, walk unused edges (delete as you go), recurse, then push the node. Because you append after exploring, you splice detours correctly. Reverse at the end for a circuit/path. If unused edges remain, the graph was not connected enough.",
      "Multiedges and the lex-smallest requirement mean each adj list should be a multiset / min-heap / sorted vector you pop from the back after sorting descending.",
    ],
    howItWorks: [
      "Check degree conditions; choose start.",
      "Hierholzer(u): while u has unused edges: take the next edge u→v, delete it (and the reverse if undirected), Hierholzer(v). Then path.push(u).",
      "Reverse path. If path length is E+1, success.",
    ],
    whenToUse: [
      "Use every edge exactly once (itineraries, Chinese Postman on Eulerian graphs, reconstruct sequence from pairs).",
    ],
    whenNotToUse: [
      "Hamilton path (every vertex once) — NP-hard, not this linear algorithm.",
    ],
    complexity: {
      time: "O(E + V) plus sorting if lex is required",
      space: "O(E)",
    },
    interviewTips: [
      "Reconstruct Itinerary: Hierholzer on a map of min-heaps of destinations, start at JFK, reverse the postorder.",
      "Say 'this is Euler, not Hamilton' if they look confused about complexity.",
    ],
    pitfalls: [
      "Preorder push — wrong splicing.",
      "Not deleting the reverse undirected edge, so you use the edge twice conceptually.",
      "Starting at the wrong node when a path (not a circuit) exists.",
    ],
    practiceIdeas: [
      "Reconstruct Itinerary.",
      "Valid Arrangement of Pairs.",
      "Undirected Euler circuit on a small graph by hand.",
    ],
    related: [
      "dfs",
      "topo-sort-dfs",
      "connected-components",
    ],
  },
  {
    slug: "a-star",
    track: "dsa",
    category: "Graphs",
    title: "A* Search",
    summary:
      "Dijkstra with a heuristic: expand the node with the smallest f = g + h, where g is distance from start and h estimates distance to the goal. Admissible h never overestimates, so the first time you pop the goal is optimal.",
    depth: "advanced",
    whyItMatters:
      "A* is how you search a huge implicit graph (grids, puzzles) without expanding the whole Dijkstra ball. Interviews on game pathfinding or 8-puzzle expect you to name admissibility (Manhattan distance on a grid without obstacles is admissible) and to implement the same heap loop as Dijkstra with f as the key. If h = 0, A* is Dijkstra.",
    theory: [
      "g[n] is the best path cost from s to n so far. h[n] estimates n to t. f[n] = g[n] + h[n] orders the heap. If h is admissible (h ≤ true remaining) and you do not decrease-key sloppily, the first time t is dequeued, g[t] is optimal. If h is also consistent (triangle inequality), you can finalize on first pop like Dijkstra.",
      "Inconsistent but admissible heuristics may require reopening nodes. In interviews, pick a consistent h: Manhattan or Chebyshev on grids with the matching move set, 0 if you are unsure.",
      "A* can be exponentially faster than Dijkstra when h is informative, and identical when h is 0. A bad h (overestimate) can return a suboptimal path — that is weighted A* / greedier search, not A*.",
    ],
    howItWorks: [
      "g[s]=0, heap on f=g+h(s). cameFrom map.",
      "Pop n. if n is goal, reconstruct. For each neighbor: ng = g[n]+cost. if ng < g[neigh], update g, push (ng+h(neigh), neigh).",
      "Skip stale pops when the popped f does not match the recorded g+h.",
    ],
    whenToUse: [
      "Point-to-point search on large graphs with a good lower-bound heuristic.",
    ],
    whenNotToUse: [
      "No goal, or you need distances to all nodes — Dijkstra.",
      "You cannot invent an admissible h — Dijkstra / BFS.",
    ],
    complexity: {
      time: "Worst-case like Dijkstra O((V+E) log V); much less with a tight h",
      space: "O(V)",
    },
    interviewTips: [
      "State h and why it does not overestimate. Manhattan on 4-direction empty grid is the default example.",
      "8-puzzle: h = number of misplaced tiles (admissible but weak) or Manhattan of tiles (better).",
    ],
    pitfalls: [
      "Using Euclidean h with only 4-direction moves — still admissible, but be consistent with costs.",
      "Overestimating (straight-line that ignores a required detour in the cost model you used) — can be OK if the metric still lower-bounds, but 'break wall' costs need a matching h.",
      "Implementing greedy-best-first (heap on h only) and calling it A*.",
    ],
    practiceIdeas: [
      "Grid pathfinding with Manhattan A* vs Dijkstra node expansions.",
      "Shortest Path in a Grid with Obstacles Elimination — state is (r,c,k), A* with Manhattan.",
      "8-puzzle solver.",
    ],
    related: [
      "dijkstra",
      "bfs",
      "dijkstra-heap",
      "zero-one-bfs",
    ],
  },
];
