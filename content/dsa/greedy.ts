import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "interval-scheduling",
    track: "dsa",
    category: "Greedy",
    title: "Interval Scheduling",
    summary:
      "To pick the maximum number of non-overlapping intervals, always take the one that finishes first among those that start after the last you accepted.",
    depth: "core",
    whyItMatters:
      "Earliest-finish is the greedy proof everyone should own. Interviews disguise it as 'non-overlapping intervals,' 'maximum events you can attend,' and 'video stitching.' If you sort by start time and grab, you can pick a long interval that blocks two short ones. The exchange argument — swap a later-finishing pick for the earliest-finish — is the template for other greedy proofs.",
    theory: [
      "Sort intervals by end time. Scan: if the next interval starts at or after the last chosen end, take it and update the end. That set is a maximum-cardinality compatible set. Proof sketch: among maximum solutions, pick one that agrees with the greedy prefix as long as possible; the first disagreement can be swapped for the greedy (earlier) finish without losing feasibility or size.",
      "The complementary problem 'minimum intervals to remove to make the rest non-overlapping' is n minus that maximum. The complementary 'minimum number of groups so intervals in a group do not overlap' is the max number of intervals covering any point (sweep) — meeting rooms.",
      "Weighted interval scheduling (max value, not count) is DP after sorting by end: for each interval, binary-search the last compatible and take max(skip, value+dp[that]). Greedy fails once weights appear.",
    ],
    howItWorks: [
      "Sort by end ascending.",
      "end = -∞, ans = 0. for [s,e] of intervals: if s >= end, ans++, end = e.",
      "Return ans (or n-ans if they asked for removals).",
    ],
    whenToUse: [
      "Maximum number of non-overlapping jobs; min removals to clear overlaps.",
    ],
    whenNotToUse: [
      "Weighted jobs — DP.",
      "You must cover a timeline (jump game / video stitch) — a different greedy.",
    ],
    complexity: {
      time: "O(n log n) from the sort",
      space: "O(1) besides the sort",
    },
    interviewTips: [
      "Ask if touching endpoints count as overlap. Then sort by end.",
      "If they add values, switch to DP and say why greedy died.",
    ],
    pitfalls: [
      "Sorting by start and taking the shortest — still wrong on some instances.",
      "Using > instead of >= when touching is allowed.",
    ],
    practiceIdeas: [
      "Non-overlapping Intervals (min removals).",
      "Maximum Length Chain of Pairs.",
      "Weighted interval scheduling with binary search.",
    ],
    related: [
      "meeting-rooms",
      "jump-game",
      "binary-search-on-answer",
      "greedy-mst",
    ],
  },
  {
    slug: "jump-game",
    track: "dsa",
    category: "Greedy",
    title: "Jump Game",
    summary:
      "Track the farthest index reachable so far. You can reach i only if i ≤ farthest; then extend farthest by i + A[i]. Jump Game II counts greedy windows of a BFS layer.",
    depth: "core",
    whyItMatters:
      "Jump Game is the linear greedy that beats the obvious DP. Interviewers start with reachability (I), then minimum jumps (II), then jump game III (teleports / BFS). If you write O(n²) DP on I they will ask you to go linear. The farthest-reach invariant is the whole proof.",
    theory: [
      "Let R be the farthest index you can reach using a jump from some index ≤ current scan position. As you walk i from 0 to R, you may extend R to i+A[i]. If you ever see i > R, you are stuck. If R eventually ≥ n-1, you can reach the end. This is O(n) and correct because an optimal path never needs a jump from an index you skipped — those indices were already inside some earlier reach.",
      "Jump Game II (min jumps): treat the current reach as a BFS layer. While you scan the layer [L, R], compute the nextR = max i+A[i]. Then jumps++, L=R+1, R=nextR. That is BFS on the implicit jump graph without a queue.",
      "DP dp[i] = min jumps to i is O(n²) and the wrong complexity for II unless n is tiny.",
    ],
    howItWorks: [
      "I: R=0. for i in 0..n-1: if i>R return false; R=max(R, i+A[i]). return true.",
      "II: jumps=0, R=0, nextR=0. for i in 0..n-2: nextR=max(nextR, i+A[i]); if i==R: jumps++, R=nextR.",
    ],
    whenToUse: [
      "Reachability or min jumps on an array of jump lengths.",
    ],
    whenNotToUse: [
      "Jumps that can go backward to unseen states — may need BFS/visited (Jump Game III).",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1)",
    },
    interviewTips: [
      "For II, say 'each jump is a BFS layer' so they do not think you are hand-waving.",
      "Video Stitching / Gas Station are cousins: extend the farthest cover.",
    ],
    pitfalls: [
      "Returning false when R == n-1 (you made it).",
      "II looping to n-1 and adding a phantom jump.",
      "A[i]=0 in the middle with R stuck at i — correctly impossible.",
    ],
    practiceIdeas: [
      "Jump Game I and II.",
      "Jump Game III (BFS). Video Stitching.",
    ],
    related: [
      "gas-station",
      "interval-scheduling",
      "bfs",
      "climbing-stairs",
    ],
  },
  {
    slug: "gas-station",
    track: "dsa",
    category: "Greedy",
    title: "Gas Station",
    summary:
      "If total gas ≥ total cost, a circuit exists. The unique start (when unique) is the index after the worst prefix deficit. One pass, O(1) extra.",
    depth: "core",
    whyItMatters:
      "Gas Station looks like a simulation from every start (O(n²)) and is actually a one-pass greedy. The argument: if you fail to reach y from x, no station in (x, y] can reach y either (you arrived at those stations with leftover ≥ 0). So you jump the start to y+1. Combined with a total-sum check, that is the algorithm.",
    theory: [
      "Let diff[i] = gas[i]-cost[i]. A circuit exists iff sum(diff) ≥ 0. The start is the first index after the minimum prefix sum of diff (or the reset index in the linear scan). Intuition: you want to start right after the deepest valley so you never go negative in a prefix of the circuit.",
      "Implementation scan: tank += diff[i]; if tank < 0, start = i+1, tank = 0. After one pass, if the global sum ≥ 0, return start else -1. You do not need a second verification pass if the math is in place — but a second pass is fine if n is small and you want to be sure.",
      "This is the same 'cannot start inside a failed window' idea as jump game / video stitch.",
    ],
    howItWorks: [
      "total=0, tank=0, start=0.",
      "for i: total += gas[i]-cost[i]; tank += gas[i]-cost[i]; if tank<0: start=i+1; tank=0.",
      "return total>=0 ? start : -1.",
    ],
    whenToUse: [
      "Circular tour with net gains, unique start when one exists.",
    ],
    whenNotToUse: [
      "You may refill arbitrarily or stations have capacities — different model.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1)",
    },
    interviewTips: [
      "Lead with the O(n²) try-every-start, then the failed-window skip, then the total-sum check.",
    ],
    pitfalls: [
      "Returning start without checking total < 0.",
      "Resetting start but not tank.",
      "Assuming a start always exists.",
    ],
    practiceIdeas: [
      "Gas Station (LeetCode 134).",
      "Complete circuit with a printout of the tank vs prefix sums.",
    ],
    related: [
      "jump-game",
      "kadane",
      "prefix-sum",
    ],
  },
  {
    slug: "fractional-knapsack",
    track: "dsa",
    category: "Greedy",
    title: "Fractional Knapsack",
    summary:
      "Take items in decreasing value/weight ratio; the last item may be split. Greedy is optimal here and illegal in 0/1 knapsack.",
    depth: "core",
    whyItMatters:
      "This is the contrast case that makes 0/1 knapsack make sense. Interviews (and some LLD/estimation talks) use 'you may take a fraction of an item' — gold dust, liquids, remaining capacity. If you apply the same ratio greedy to 0/1, they will hand you a counterexample. Knowing when the greedy is legal is the skill.",
    theory: [
      "Sort by value/weight descending. Fill the bag: take whole items while they fit, then take a fraction of the next. Proof: any optimal solution that inverts two ratio-ordered items can be improved by swapping mass toward the higher ratio. Fractions make the swap always possible.",
      "In 0/1 you cannot take a fraction, so a slightly-less-dense item that fills the bag can beat a denser leftover. Example: capacity 10, items (v=6,w=6) and (v=5,w=5)×2 — ratio greedy vs optimal depends on the numbers; classic textbook pairs exist. Do not use this greedy for 0/1.",
      "Huffman is another legal greedy (different proof). MST is another. Collect these 'greedy-safe' problems so you do not treat greedy as a vibe.",
    ],
    howItWorks: [
      "Sort items by v/w desc.",
      "ans=0. for item: if w <= cap, take all, cap -= w, ans += v; else ans += v * (cap/w), break.",
      "Return ans as a float.",
    ],
    whenToUse: [
      "Divisible items, maximize value under a weight cap.",
    ],
    whenNotToUse: [
      "0/1 or integer copies — DP.",
    ],
    complexity: {
      time: "O(n log n)",
      space: "O(1) besides sort",
    },
    interviewTips: [
      "Ask 'may I break an item?' If no, knapsack DP. If yes, this.",
    ],
    pitfalls: [
      "Integer division on the last fraction.",
      "Sorting by value alone or weight alone.",
      "Using this on 0/1 and defending it.",
    ],
    practiceIdeas: [
      "Textbook fractional knapsack.",
      "Build a 0/1 counterexample where ratio greedy fails.",
    ],
    related: [
      "knapsack-01",
      "huffman",
      "greedy-mst",
    ],
  },
  {
    slug: "meeting-rooms",
    track: "dsa",
    category: "Greedy",
    title: "Meeting Rooms",
    summary:
      "Can one person attend all? Sort by start and check adjacent ends. How many rooms? Sweep start/end events or a min-heap of end times — the max depth of the sweep is the answer.",
    depth: "core",
    whyItMatters:
      "Meeting Rooms I is a sort-and-scan. Meeting Rooms II is the first 'sweep line / heap of endings' interview and it generalizes to 'minimum platforms,' 'minimum number of arrows,' and CPU interval scheduling. If you allocate a room array and nest, you are O(n²). The heap of current end times is O(n log n) and the story interviewers want.",
    theory: [
      "I: sort by start (or by end); if any meeting starts before the previous one ends, conflict. One room ⇔ no overlaps.",
      "II: sort meetings by start. A min-heap stores end times of rooms in use. For each meeting, if the earliest room frees in time (heap.peek ≤ start), pop and reuse; else you need a new room. Push the new end. Heap size at the end (or the max size seen) is the number of rooms.",
      "Equivalent sweep: +1 at each start, −1 at each end, sort events (ends before starts if they tie and you allow back-to-back), scan a counter, track the max. Same answer, no heap. Both are greedy / sweep, not DP.",
    ],
    howItWorks: [
      "I: sort by start; for i=1..n-1 if starts[i] < ends[i-1] return false.",
      "II heap: sort by start; for each [s,e]: if heap.size && heap.peek<=s pop; push e; ans=max(ans, heap.size).",
      "II sweep: events (s,+1), (e,-1); sort by time then by −1 first; scan.",
    ],
    whenToUse: [
      "Interval overlap tests; min resource count to cover all intervals.",
    ],
    whenNotToUse: [
      "Max number of meetings one room can take — that is interval scheduling (earliest finish).",
    ],
    complexity: {
      time: "O(n log n)",
      space: "O(n)",
    },
    interviewTips: [
      "Clarify back-to-back (end == start). Usually allowed; sort ends first in the sweep.",
      "Minimum Number of Arrows to Burst Balloons is interval-points greedy, close cousin.",
    ],
    pitfalls: [
      "Comparing unsorted adjacent meetings.",
      "Using a max-heap of ends.",
      "Counting total meetings as rooms.",
    ],
    practiceIdeas: [
      "Meeting Rooms I and II.",
      "Minimum platforms; Car Pooling (sweep on capacity).",
    ],
    related: [
      "interval-scheduling",
      "heap-insert-extract",
      "greedy-mst",
    ],
  },
  {
    slug: "candy",
    track: "dsa",
    category: "Greedy",
    title: "Candy Distribution",
    summary:
      "Give children candies so neighbors with a higher rating get more. Two passes (up the slopes, then down) or a one-array peak-and-valley fill. Greedy local slopes are enough.",
    depth: "next",
    whyItMatters:
      "Candy is the two-pass greedy that people try to solve with a single forward scan and fail on a decreasing slope. The rating constraint is local (only neighbors) but the global min assignment needs both directions. Interviewers like it because the proof is 'satisfy left constraints, then right, take max.' Assign cookies is the easier sibling.",
    theory: [
      "Give everyone 1. Left-to-right: if ratings[i] > ratings[i-1], candies[i] = max(candies[i], candies[i-1]+1). Right-to-left: if ratings[i] > ratings[i+1], candies[i] = max(candies[i], candies[i+1]+1). The max merge satisfies both neighbor inequalities with the minimum possible at each child (for this constraint family).",
      "A decreasing run of length L needs L, L-1, …, 1 on that run; an increasing run needs 1,2,… . Peaks take the max of the two run requirements. Equal ratings have no constraint between them — they may share a count.",
      "This is not 'sort and assign.' Sorting loses neighbor relationships, which are the entire constraint.",
    ],
    howItWorks: [
      "c[i]=1 for all i.",
      "for i=1..n-1: if r[i]>r[i-1] c[i]=c[i-1]+1.",
      "for i=n-2..0: if r[i]>r[i+1] c[i]=max(c[i], c[i+1]+1).",
      "return sum(c).",
    ],
    whenToUse: [
      "Neighbor inequality assignments on a line; rating/candy, similar 'strictly more than neighbor' problems.",
    ],
    whenNotToUse: [
      "Global ranking (kth gets more than everyone below) — just sort.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(n)",
    },
    interviewTips: [
      "Draw 1,3,2 and show why one forward pass assigns 1,2,1 and then the backward pass lifts the peak to 2 — wait, 1,2,1 already works. Use 1,2,87,1 or 1,3,2,2 to show the backward lift.",
    ],
    pitfalls: [
      "Using = instead of max on the backward pass and wrecking the left constraint.",
      "Treating equal ratings as needing a strict difference.",
    ],
    practiceIdeas: [
      "Candy (LeetCode 135).",
      "Trapping rain as a two-pass contrast (different problem, same two-direction vibe).",
    ],
    related: [
      "assign-cookies",
      "two-pointers",
      "jump-game",
    ],
  },
  {
    slug: "assign-cookies",
    track: "dsa",
    category: "Greedy",
    title: "Assign Cookies",
    summary:
      "Sort children by greed and cookies by size. Walk two pointers: give the smallest cookie that satisfies the next child. That maximizes the number of content children.",
    depth: "core",
    whyItMatters:
      "This is the easy greedy pairing interview and the warmup for more serious assignment problems. The proof is exchange: wasting a large cookie on a low-greed child cannot help more children than using the smallest adequate cookie. If you assign largest-to-largest you also get an optimal count here, but the two-pointer smallest-fit is the usual write-up.",
    theory: [
      "Sort g (greed) and s (sizes). i = j = 0. While both remain: if s[j] >= g[i], pair them, i++. Always j++. i is the number of content children. Each cookie is considered once; you never hold a cookie back for a greedier child because a leftover bigger cookie can still serve them later.",
      "This is a special case of assigning sorted tasks to sorted workers. If cookies could be split, you would be in a different problem. If each child had a value, you might need DP or a different greedy.",
    ],
    howItWorks: [
      "Sort both arrays. i=0. for cookie of s: if i<g.length && cookie>=g[i] i++.",
      "Return i.",
    ],
    whenToUse: [
      "1–1 assignment maximizing count under a 'resource ≥ demand' rule.",
    ],
    whenNotToUse: [
      "Maximize sum of values — may need a heap or DP.",
    ],
    complexity: {
      time: "O(n log n)",
      space: "O(1) besides sort",
    },
    interviewTips: [
      "After this they may go to 'assign cookies with k types' or to meeting rooms. Stay calm; the sort+pointer is enough here.",
    ],
    pitfalls: [
      "Matching without sorting.",
      "Using a cookie smaller than greed and incrementing the child anyway.",
    ],
    practiceIdeas: [
      "Assign Cookies (LeetCode 455).",
      "Boats to Save People (two pointers, related pairing).",
    ],
    related: [
      "candy",
      "two-pointers",
      "interval-scheduling",
    ],
  },
  {
    slug: "greedy-mst",
    track: "dsa",
    category: "Greedy",
    title: "Kruskal and Prim as Greedy",
    summary:
      "Both MST algorithms are the cut property in action: the cheapest edge across a cut is safe. Kruskal picks globally cheapest safe edges; Prim grows one tree by the cheapest leaving edge.",
    depth: "next",
    whyItMatters:
      "This topic is the greedy view of algorithms you already implement in the graphs chapter. Interviewers ask 'why is Kruskal correct?' more often than they ask you to type Union-Find again. The cut property and the cycle property (the heaviest edge on a cycle is not needed) are the answers. Huffman sits in the same 'prove the greedy choice' family.",
    theory: [
      "Cut property: for any partition of vertices, the minimum-weight edge with one end on each side belongs to some MST. Kruskal only adds an edge when its ends are in different components — that edge is a cheapest crossing of that cut (because cheaper edges were already considered and would have merged those sides if they crossed). Prim always adds a cheapest leaving edge of the current set — same property.",
      "Cycle property: the heaviest edge on any cycle is not in some MST (you can swap it out). That is why Kruskal can skip edges that close a cycle — they are never the unique lightest connector.",
      "Greedy fails for shortest paths with negatives (Dijkstra's greedy finalize) and for 0/1 knapsack. MST is the poster child of a greedy that has a proof, not a hope.",
    ],
    howItWorks: [
      "Kruskal: sort edges, UF-accept if they connect different components, stop at V-1.",
      "Prim: from a node, heap-expand the cheapest edge out of the tree, skip vertices already in.",
      "If you cannot add V-1 edges, the graph is disconnected — return a forest or fail per spec.",
    ],
    whenToUse: [
      "Undirected min-cost connectivity; explaining why the MST greedy is legal.",
    ],
    whenNotToUse: [
      "Directed min arborescence — not Kruskal.",
      "Shortest paths — different greedy (Dijkstra) with a different proof and a non-negative assumption.",
    ],
    complexity: {
      time: "Kruskal O(E log E); Prim O(E log V) or O(V²)",
      space: "O(V)",
    },
    interviewTips: [
      "If they ask 'Prim or Kruskal?' pick based on input: edge list → Kruskal; adjacency matrix → Prim O(V²).",
      "Connect-all-points is an MST, not n Dijkstras.",
    ],
    pitfalls: [
      "Using Dijkstra and summing path weights as if that were an MST.",
      "Directed edges fed into Kruskal.",
    ],
    practiceIdeas: [
      "Implement both and match total weight on a small graph.",
      "Prove the cut property on a 4-node example.",
    ],
    related: [
      "kruskal",
      "prim",
      "union-find",
      "huffman",
      "dijkstra",
      "fractional-knapsack",
    ],
  },
];
