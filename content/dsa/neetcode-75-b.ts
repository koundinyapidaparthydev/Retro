import type { Topic } from "../schema";

/**
 * NeetCode 75 — second half (indices 38..74).
 * Rich topic pack; merge with topics from neetcode-75.ts as needed.
 */
export const topicsB: Topic[] = [
  {
    slug: "nc-number-of-islands",
    track: "dsa",
    category: "NeetCode 75",
    title: "Number of Islands",
    summary:
      "Given a 2-D grid of '1' land and '0' water, count connected land components (4-directional). Each DFS/BFS flood from an unvisited '1' is one island.",
    depth: "next",
    whyItMatters:
      "This is the grid flood-fill interview. They care that you mark visited as you go (mutate the cell or a boolean[][]), that you only walk 4 directions unless they say 8, and that you loop every cell as a start. Same skeleton unlocks max-area island, surrounded regions, and pacific-atlantic.",
    theory: [
      "Treat each land cell as a graph vertex; edges go to in-bounds orthogonal neighbors that are also land. An island is a connected component. DFS or BFS from a fresh '1' paints the whole component; bump the answer once per start.",
      "In-place mark: set grid[r][c] = '0' (or '2') when you visit so you never need a separate visited matrix. Union-Find also works: union land with land neighbors, then count roots — useful when the grid streams updates.",
      "Complexity is linear in cells. Recursion depth can hit m·n on a snake of land — mention iterative Stack/Deque if the stack limit worries you.",
    ],
    howItWorks: [
      "Scan every cell; when grid[r][c] == '1', increment islands and flood from (r, c).",
      "Flood: ArrayDeque of int[] {r,c} (or recurse). Mark cell '0', then push/visit up/down/left/right if in bounds and still '1'.",
      "When the queue/stack empties, that component is done; continue the outer scan.",
    ],
    whenToUse: [
      "Count or measure connected regions on a grid.",
      "Any 'paint the blob of matching cells' problem.",
    ],
    whenNotToUse: [
      "Shortest path between two cells — BFS with distance, not just flood count.",
    ],
    complexity: { time: "O(m·n)", space: "O(m·n) worst-case stack/queue" },
    interviewTips: [
      "Ask 4 vs 8 neighbors before coding.",
      "Say you mutate the grid to mark visited unless they forbid it.",
    ],
    pitfalls: [
      "Forgetting bounds checks and walking off the array.",
      "Counting every '1' instead of once per component.",
      "Using a HashSet of strings for visited when a boolean[][] or in-place mark is enough.",
    ],
    practiceIdeas: [
      "LeetCode 200: Number of Islands — dry-run a 3×3 with two blobs.",
      "Max Area of Island; Surrounded Regions (flip O's).",
    ],
    related: ["nc-pacific-atlantic-water-flow", "nc-clone-graph", "bfs", "dfs"],
  },
  {
    slug: "nc-clone-graph",
    track: "dsa",
    category: "NeetCode 75",
    title: "Clone Graph",
    summary:
      "Deep-copy a connected undirected graph of Node{val, neighbors}. Return a new graph with the same structure and no shared node objects.",
    depth: "next",
    whyItMatters:
      "Classic 'copy with cycles' problem. The HashMap from old node → new node is both the memo and the visited set. Without it you loop forever on undirected edges. Interviewers reuse this map pattern for copy list with random pointer.",
    theory: [
      "DFS or BFS: when you first see an old node, create its clone and put old→clone in a HashMap. Then iterate neighbors: if a neighbor is not in the map, clone it recursively (or enqueue); always add map.get(neighbor) to clone.neighbors.",
      "The map guarantees each original node is allocated once. Undirected edges become two directed neighbor entries in the list representation — cloning both directions is automatic if you process every neighbor list.",
      "Null input returns null. A single node with empty neighbors returns a lone clone. Values may not be unique — key by object identity (the Node reference), not val.",
    ],
    howItWorks: [
      "HashMap<Node, Node> map. If node == null return null.",
      "DFS: if map.containsKey(node) return map.get(node); create copy = new Node(node.val); map.put(node, copy); for each nei, copy.neighbors.add(dfs(nei)).",
      "Or BFS: seed queue with start, map.put(start, new Node(start.val)); while queue, wire each neighbor via map.getOrDefault / create-and-enqueue.",
    ],
    whenToUse: [
      "Deep-copy a graph or any structure with cross/back references.",
    ],
    whenNotToUse: [
      "Tree clone without shared children — plain recursion, no map needed if no DAG sharing.",
    ],
    complexity: { time: "O(V + E)", space: "O(V) for the map" },
    interviewTips: [
      "Draw a triangle of three nodes and show the map filling before code.",
      "Say explicitly: 'the map is visited so undirected edges do not recurse forever.'",
    ],
    pitfalls: [
      "Keying the map by val when vals can collide.",
      "Creating a new Node for a neighbor every time instead of looking it up.",
      "Forgetting the null graph.",
    ],
    practiceIdeas: [
      "LeetCode 133: Clone Graph.",
      "Copy List with Random Pointer — same map idea.",
    ],
    related: ["nc-number-of-islands", "dfs", "bfs"],
  },
  {
    slug: "nc-pacific-atlantic-water-flow",
    track: "dsa",
    category: "NeetCode 75",
    title: "Pacific Atlantic Water Flow",
    summary:
      "Heights matrix touches Pacific (top/left) and Atlantic (bottom/right). Return cells that can flow to both oceans by walking to equal-or-lower neighbors.",
    depth: "next",
    whyItMatters:
      "Multi-source reverse BFS/DFS: instead of flowing downhill from every cell (too slow), start from ocean borders and walk uphill (to ≥ height). Intersection of the two reachable sets is the answer. Teaches 'reverse the edges' thinking.",
    theory: [
      "Water can leave a cell to a neighbor if neighbor.height ≤ cell.height. Reachability to an ocean is expensive from the interior. Flip: from every Pacific-border cell, DFS/BFS to neighbors with height ≥ current — those cells can drain to Pacific.",
      "Do the same from Atlantic borders. A cell in both boolean[][] (or HashSet of packed indices) can reach both oceans.",
      "Borders: row 0 and col 0 for Pacific; row m-1 and col n-1 for Atlantic. Corner cells belong to both and seed both searches.",
    ],
    howItWorks: [
      "boolean[][] pac = new boolean[m][n], atl = new boolean[m][n]. Seed ArrayDeque with all Pacific-edge cells; BFS marking pac while climbing to ≥ height.",
      "Repeat for Atlantic edges into atl.",
      "Collect List<List<Integer>> where pac[i][j] && atl[i][j]; return it.",
    ],
    whenToUse: [
      "Grid reachability from multiple borders; 'can reach A and B.'",
    ],
    whenNotToUse: [
      "Single-source shortest path — plain BFS with distance.",
    ],
    complexity: { time: "O(m·n)", space: "O(m·n)" },
    interviewTips: [
      "State the reverse insight out loud before coding.",
      "Use int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}}.",
    ],
    pitfalls: [
      "Flowing downhill from every cell — TLE / messy visited.",
      "Strict < instead of ≤ (plateaus must pass).",
      "Forgetting to seed an entire edge, not just corners.",
    ],
    practiceIdeas: [
      "LeetCode 417: Pacific Atlantic Water Flow.",
      "Tiny 2×2 dry-run with increasing heights.",
    ],
    related: ["nc-number-of-islands", "bfs", "dfs"],
  },
  {
    slug: "nc-course-schedule",
    track: "dsa",
    category: "NeetCode 75",
    title: "Course Schedule",
    summary:
      "numCourses and prerequisites [a,b] meaning b → a (take b before a). Return true iff you can finish all — the directed graph has no cycle.",
    depth: "next",
    whyItMatters:
      "Topological sort / cycle detection in a digraph. Kahn (indegree + queue) or DFS 3-color are both interview standards. Course Schedule II asks for the order; this one only asks possibility.",
    theory: [
      "Build adjacency List<List<Integer>> and indegree[]. Edge b→a means a depends on b. Kahn: enqueue all indegree 0; pop, reduce neighbors' indegrees, enqueue zeros. If you process all courses, DAG; else cycle.",
      "DFS: white/gray/black. Visiting a gray node is a back edge → cycle. Finish all starts so disconnected parts are covered.",
      "Self-loop [0,0] is a cycle. Empty prereqs → true. numCourses can exceed nodes that appear in edges — still count isolates as finishable.",
    ],
    howItWorks: [
      "Build List<Integer>[] adj and int[] indegree from each [course, prereq] as edge prereq → course.",
      "ArrayDeque<Integer> q; for i in 0..n-1 if indegree[i]==0 q.offer(i). int taken=0; while !q.isEmpty(): u=q.poll(); taken++; for v in adj[u]: if (--indegree[v]==0) q.offer(v).",
      "return taken == numCourses.",
    ],
    whenToUse: [
      "Scheduling with dependencies; detect cycles in a digraph.",
    ],
    whenNotToUse: [
      "Undirected cycle check — different parent-edge rule / Union-Find.",
    ],
    complexity: { time: "O(V + E)", space: "O(V + E)" },
    interviewTips: [
      "Clarify edge direction: 'prereq points to course' before building the list.",
      "Name Kahn and DFS cycle as two valid approaches.",
    ],
    pitfalls: [
      "Reversing the edge (course → prereq) and getting a wrong topo.",
      "Not counting nodes that never appear in prerequisites.",
      "DFS without gray state — missing back edges.",
    ],
    practiceIdeas: [
      "LeetCode 207: Course Schedule.",
      "Course Schedule II — emit the order from the same Kahn loop.",
    ],
    related: ["nc-alien-dictionary", "nc-graph-valid-tree", "topo-sort-dfs"],
  },
  {
    slug: "nc-graph-valid-tree",
    track: "dsa",
    category: "NeetCode 75",
    title: "Graph Valid Tree",
    summary:
      "n nodes labeled 0..n-1 and undirected edges. Return true iff the graph is a tree: connected and acyclic (equivalently: connected with exactly n-1 edges).",
    depth: "next",
    whyItMatters:
      "Trees are exactly connected acyclic undirected graphs. Interviewers want either Union-Find (reject edge if same parent) plus one component, or DFS connectivity + edge count. Premium LC 261 — still a NeetCode staple.",
    theory: [
      "A tree on n nodes has n-1 edges. If edges.length != n-1 you can reject early (too few → disconnected or empty; too many → cycle or multi-edge).",
      "Union-Find: for each edge, if find(u)==find(v) cycle; else union. At end all nodes share one root (or you tracked component count → 1).",
      "DFS/BFS from 0: if you visit a seen neighbor that is not parent → cycle; if visited count < n → disconnected. Need adjacency lists for undirected edges (add both ways).",
    ],
    howItWorks: [
      "If edges.length != n - 1 return false (handle n==1).",
      "Build adj List<List<Integer>>; DFS/BFS from 0 with parent, HashSet or boolean[] visited; abort on non-parent revisit.",
      "return visitedCount == n. Or Union-Find with the same early edge-count check.",
    ],
    whenToUse: [
      "Validate a tree; detect undirected cycles while requiring connectivity.",
    ],
    whenNotToUse: [
      "Directed 'tree' / arborescence — different rules.",
    ],
    complexity: { time: "O(n + e)", space: "O(n + e)" },
    interviewTips: [
      "Lead with 'tree ⇔ connected + n-1 edges' then prove no cycle.",
      "n=1, edges=[] is a valid tree.",
    ],
    pitfalls: [
      "Only checking n-1 edges without connectivity (two components + an extra edge elsewhere).",
      "Treating parent as a cycle in undirected DFS.",
      "Forgetting to add both directions in adj.",
    ],
    practiceIdeas: [
      "LeetCode 261: Graph Valid Tree.",
      "Redundant Connection — find the edge that creates the cycle.",
    ],
    related: [
      "nc-number-of-connected-components-in-an-undirected-graph",
      "nc-course-schedule",
      "union-find",
    ],
  },
  {
    slug: "nc-number-of-connected-components-in-an-undirected-graph",
    track: "dsa",
    category: "NeetCode 75",
    title: "Number of Connected Components",
    summary:
      "n nodes and undirected edges. Return how many connected components (islands in an abstract graph).",
    depth: "next",
    whyItMatters:
      "Same idea as number of islands without the grid. DFS/BFS from each unvisited node, or Union-Find counting roots. Foundation for Kruskal's early-stop and account-merge style problems.",
    theory: [
      "Build undirected adjacency lists. components = 0; for each node if not visited, components++, DFS/BFS mark the whole component.",
      "Union-Find: start with n components; each successful union decrements. Ignore edges that do not merge.",
      "Isolated nodes are their own components. Duplicate edges should not double-count (UF no-ops; adj can use lists fine).",
    ],
    howItWorks: [
      "List<List<Integer>> adj = new ArrayList<>(); for i in 0..n-1 adj.add(new ArrayList<>()); add both directions for each edge.",
      "boolean[] seen = new boolean[n]; int comps = 0; for i: if !seen[i]: comps++; dfs/bfs with ArrayDeque marking seen.",
      "return comps.",
    ],
    whenToUse: [
      "Count pieces of an undirected graph; prep for spanning-tree / UF problems.",
    ],
    whenNotToUse: [
      "Strongly connected components in a digraph — Kosaraju/Tarjan.",
    ],
    complexity: { time: "O(n + e)", space: "O(n + e)" },
    interviewTips: [
      "Mention UF vs DFS and pick one; both are fine.",
      "Clarify 0-indexed nodes 0..n-1.",
    ],
    pitfalls: [
      "Only iterating nodes that appear in edges — isolates must count.",
      "Directed interpretation of undirected edges.",
    ],
    practiceIdeas: [
      "LeetCode 323: Number of Connected Components in an Undirected Graph.",
      "Number of Provinces (isConnected matrix).",
    ],
    related: ["nc-graph-valid-tree", "nc-number-of-islands", "union-find"],
  },
  {
    slug: "nc-alien-dictionary",
    track: "dsa",
    category: "NeetCode 75",
    title: "Alien Dictionary",
    summary:
      "Sorted list of alien words. Derive a valid character order from consecutive pairwise prefix differences; return one topological string or \"\" if invalid.",
    depth: "advanced",
    whyItMatters:
      "Hard graph interview: build a digraph of letter precedence from sorted words, then topo-sort. Invalid if cycle or if a longer word is a prefix of a shorter earlier word (like ['abc','ab']).",
    theory: [
      "Compare each adjacent pair words[i], words[i+1]. Find first differing index c; add edge words[i][c] → words[i+1][c] (earlier letter before later). If no difference and words[i].length() > words[i+1].length(), order is impossible.",
      "Collect the alphabet as all chars that appear. Kahn or DFS topo on this digraph. Multiple valid orders exist — any one is OK unless they ask lexicographically smallest (then PriorityQueue for zero-indegree).",
      "Chars with no edges still appear in the answer. Duplicate edges are fine; use a Set in adj or HashMap<Character, Set<Character>>.",
    ],
    howItWorks: [
      "HashMap<Character, Set<Character>> adj; HashMap<Character, Integer> indegree — init every seen char to 0.",
      "For each adjacent word pair, add one precedence edge and bump indegree once per unique edge; abort on illegal prefix.",
      "ArrayDeque (or PriorityQueue) Kahn; append chars to StringBuilder; if builder length < alphabet size return \"\".",
    ],
    whenToUse: [
      "Infer total/partial order from sorted sequences.",
    ],
    whenNotToUse: [
      "You already have an explicit edge list — plain Course Schedule.",
    ],
    complexity: { time: "O(C + E) over total chars/edges", space: "O(C + E)" },
    interviewTips: [
      "Dry-run ['wrt','wrf','er','ett','rftt'] and show edges t→f, w→e, r→t, e→r.",
      "Call out the prefix rule early — many people miss it.",
    ],
    pitfalls: [
      "Comparing every pair of words instead of adjacent (wasteful; adjacent is enough if the list is sorted).",
      "Missing cycle → returning a partial order.",
      "Only including letters that appear in edges.",
    ],
    practiceIdeas: [
      "LeetCode 269: Alien Dictionary.",
      "Force \"\" with a cycle and with ['abc','ab'].",
    ],
    related: ["nc-course-schedule", "topo-sort-dfs"],
  },
  {
    slug: "nc-climbing-stairs",
    track: "dsa",
    category: "NeetCode 75",
    title: "Climbing Stairs",
    summary:
      "n steps; each move climbs 1 or 2. Return the number of distinct ways to reach the top — Fibonacci in disguise.",
    depth: "core",
    whyItMatters:
      "First DP interview. They want the recurrence from the last step, then O(1) rolling variables, then follow-ups (min cost, k-width jumps).",
    theory: [
      "dp[i] = ways to stand on step i. Last step was +1 from i-1 or +2 from i-2 → dp[i] = dp[i-1] + dp[i-2]. Base: dp[1]=1, dp[2]=2 (or dp[0]=1, dp[1]=1).",
      "Order matters: 1+2 and 2+1 are different. Naive recursion is exponential; memo or bottom-up is linear.",
      "Only two prior values matter → keep a,b ints and walk to n.",
    ],
    howItWorks: [
      "If n <= 2 return n. int a = 1, b = 2;",
      "for (int i = 3; i <= n; i++) { int c = a + b; a = b; b = c; }",
      "return b;",
    ],
    whenToUse: [
      "Linear 'number of ways' with fixed step sizes.",
    ],
    whenNotToUse: [
      "Jumps with weights/capacity — knapsack-style DP.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    interviewTips: [
      "Speak the last-step sentence before writing indices.",
      "Ask about modulo if n is huge.",
    ],
    pitfalls: [
      "Off-by-one bases (dp[0]=0 kills everything).",
      "Recursion without memo on large n.",
    ],
    practiceIdeas: [
      "LeetCode 70: Climbing Stairs.",
      "Min Cost Climbing Stairs; jumps of size 1..k.",
    ],
    related: ["nc-house-robber", "nc-decode-ways", "fibonacci-dp"],
  },
  {
    slug: "nc-house-robber",
    track: "dsa",
    category: "NeetCode 75",
    title: "House Robber",
    summary:
      "Linear street of houses with money nums[i]; cannot rob adjacent houses. Maximize total loot.",
    depth: "next",
    whyItMatters:
      "Classic take/skip DP. Same shape as climbing stairs but with max and values. Interviewers escalate to circular (House Robber II) and tree (III).",
    theory: [
      "dp[i] = best using houses 0..i. At i: rob it → nums[i] + dp[i-2], or skip → dp[i-1]. dp[i] = max of those.",
      "Bases: dp[0]=nums[0]; dp[1]=max(nums[0], nums[1]). Roll with two ints prev2, prev1.",
      "Empty array → 0; single house → that value.",
    ],
    howItWorks: [
      "Handle n==0 / n==1. int prev2 = nums[0], prev1 = Math.max(nums[0], nums[1]);",
      "for i from 2..n-1: int cur = Math.max(prev1, prev2 + nums[i]); prev2 = prev1; prev1 = cur;",
      "return prev1;",
    ],
    whenToUse: [
      "Max sum with no two adjacent picks on a line.",
    ],
    whenNotToUse: [
      "Circle or tree constraints — need House Robber II / III variants.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    interviewTips: [
      "Write the decision at house i in words first.",
      "Offer the O(n) array then compress space.",
    ],
    pitfalls: [
      "Using dp[i-1]+nums[i] (adjacent allowed — wrong).",
      "Not handling n=1.",
    ],
    practiceIdeas: [
      "LeetCode 198: House Robber.",
      "Dry-run [2,7,9,3,1] → 12.",
    ],
    related: ["nc-house-robber-ii", "nc-climbing-stairs", "nc-maximum-subarray"],
  },
  {
    slug: "nc-house-robber-ii",
    track: "dsa",
    category: "NeetCode 75",
    title: "House Robber II",
    summary:
      "Houses in a circle: first and last are adjacent. Max loot without robbing neighbors — including wrapping around.",
    depth: "next",
    whyItMatters:
      "Shows how to break circular dependency: either skip house 0 or skip house n-1, reuse linear House Robber on both ranges, take max.",
    theory: [
      "In a circle you cannot take both nums[0] and nums[n-1]. So answer = max(robLinear(0..n-2), robLinear(1..n-1)). n=1 is a special case.",
      "robLinear is exactly House Robber I on a subarray (use indices, do not copy arrays if you can).",
      "Same O(1) rolling vars inside the helper.",
    ],
    howItWorks: [
      "if (n == 1) return nums[0];",
      "Write helper rob(int[] a, int lo, int hi) with the linear rolling DP on inclusive range.",
      "return Math.max(rob(nums, 0, n-2), rob(nums, 1, n-1));",
    ],
    whenToUse: [
      "Adjacent constraint wraps (circular arrangement).",
    ],
    whenNotToUse: [
      "Open line of houses — plain House Robber.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    interviewTips: [
      "State the two cases (include first vs include last) explicitly.",
      "Handle n=1 before the two-range call.",
    ],
    pitfalls: [
      "Running linear DP on the whole array (allows first+last).",
      "Off-by-one in lo/hi of the helper.",
    ],
    practiceIdeas: [
      "LeetCode 213: House Robber II.",
      "Compare [2,3,2] → 3 vs linear wrongly giving 4.",
    ],
    related: ["nc-house-robber", "nc-jump-game"],
  },
  {
    slug: "nc-longest-palindromic-substring",
    track: "dsa",
    category: "NeetCode 75",
    title: "Longest Palindromic Substring",
    summary:
      "Return any longest palindromic substring of s. Expand-around-center is the usual interview solution; DP table is the teaching alternative.",
    depth: "next",
    whyItMatters:
      "Palindrome centers (n odd + n-1 even) beat O(n²) DP constant factors and are easy to code. Manacher is O(n) but rarely required. Follow-up: count palindromic substrings (647).",
    theory: [
      "Every palindrome mirrors around a center. For each index i, expand while s[L]==s[R] for odd (L=R=i) and even (L=i, R=i+1). Track best start/len.",
      "DP: dp[i][j] true if s[i]==s[j] and (j-i<2 or dp[i+1][j-1]). Fill by increasing length. Heavier O(n²) space.",
      "Empty / single char are palindromes. Multiple answers — any longest is fine.",
    ],
    howItWorks: [
      "int bestL = 0, bestLen = 1. Method expand(i,j) while in bounds and equal, then update best if j-i+1 larger.",
      "for i in 0..n-1: expand(i,i); expand(i,i+1);",
      "return s.substring(bestL, bestL + bestLen);",
    ],
    whenToUse: [
      "Find or measure longest palindrome substring.",
    ],
    whenNotToUse: [
      "Longest palindromic subsequence — different DP (keep non-contiguous).",
    ],
    complexity: { time: "O(n²)", space: "O(1) expand; O(n²) DP" },
    interviewTips: [
      "Code one expand helper used twice per center.",
      "Mention Manacher only if they ask for better than n².",
    ],
    pitfalls: [
      "Forgetting even-length centers.",
      "Off-by-one in substring end index.",
    ],
    practiceIdeas: [
      "LeetCode 5: Longest Palindromic Substring.",
      "Dry-run 'cbbd' → 'bb'.",
    ],
    related: ["nc-palindromic-substrings", "nc-longest-common-subsequence"],
  },
  {
    slug: "nc-palindromic-substrings",
    track: "dsa",
    category: "NeetCode 75",
    title: "Palindromic Substrings",
    summary:
      "Count how many substrings of s are palindromes (single letters count). Same expand-around-center as LC 5, but tally every successful expand.",
    depth: "next",
    whyItMatters:
      "Shows the expand technique without tracking a best window. Each expansion step that still matches adds one palindrome. Clean twin of longest palindromic substring.",
    theory: [
      "Odd and even centers again. While L>=0, R<n, s.charAt(L)==s.charAt(R): count++, L--, R++.",
      "DP boolean table also works: every true dp[i][j] increments count.",
      "Total substrings n(n+1)/2 upper bound; answer ≤ that.",
    ],
    howItWorks: [
      "int count = 0; helper expand(L,R) { while (...) { count++; L--; R++; } }",
      "for i: expand(i,i); expand(i,i+1);",
      "return count;",
    ],
    whenToUse: [
      "Count palindromic substrings / similar center expansions.",
    ],
    whenNotToUse: [
      "Distinct palindromes only — need a set of strings or smarter dedup.",
    ],
    complexity: { time: "O(n²)", space: "O(1)" },
    interviewTips: [
      "Reuse the helper from LC 5; change 'update best' to 'count++'.",
    ],
    pitfalls: [
      "Counting only maximal palindromes (misses nested 'aaa' pieces).",
      "Skipping even centers.",
    ],
    practiceIdeas: [
      "LeetCode 647: Palindromic Substrings — 'aaa' → 6.",
      "Compare with DP fill for the same string.",
    ],
    related: ["nc-longest-palindromic-substring"],
  },
  {
    slug: "nc-decode-ways",
    track: "dsa",
    category: "NeetCode 75",
    title: "Decode Ways",
    summary:
      "Digits string maps A=1..Z=26. Return number of ways to decode. Leading zeros are invalid.",
    depth: "next",
    whyItMatters:
      "Fibonacci with validity gates. Tests careful base cases: '0', '10', '26', '27', '01'. One wrong zero check fails half the cases.",
    theory: [
      "dp[i] = ways to decode the prefix of length i. If s[i-1] is '1'..'9', add dp[i-1]. If two-digit s[i-2..i-1] is 10..26, add dp[i-2].",
      "dp[0]=1 (empty). If s[0]=='0' answer is 0. Roll with two ints.",
      "This is Climbing Stairs where some steps are blocked.",
    ],
    howItWorks: [
      "if s.isEmpty() || s.charAt(0)=='0' return 0. int prev2=1, prev1=1;",
      "for i=1..n-1: int cur=0; if s.charAt(i)!='0' cur+=prev1; int two=Integer.parseInt(s.substring(i-1,i+1)); if two>=10 && two<=26 cur+=prev2; prev2=prev1; prev1=cur;",
      "return prev1; (or abort early if cur stays 0 mid-way when forced).",
    ],
    whenToUse: [
      "Number of ways to parse under local digit rules.",
    ],
    whenNotToUse: [
      "Word Break with a dictionary — set membership DP.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    interviewTips: [
      "Walk '12' → 2, '226' → 3, '06' → 0 on the whiteboard.",
      "Prefer char arithmetic over repeated parseInt if you want speed.",
    ],
    pitfalls: [
      "Allowing '0' as a single digit.",
      "Treating '30' as valid two-digit.",
      "Forgetting dp[0]=1.",
    ],
    practiceIdeas: [
      "LeetCode 91: Decode Ways.",
      "Decode Ways II if they escalate (* wildcards).",
    ],
    related: ["nc-climbing-stairs", "nc-word-break"],
  },
  {
    slug: "nc-coin-change",
    track: "dsa",
    category: "NeetCode 75",
    title: "Coin Change",
    summary:
      "Unlimited coins of given denominations. Return fewest coins to make amount, or -1 if impossible — unbounded knapsack / BFS on remainders.",
    depth: "next",
    whyItMatters:
      "Canonical min-coin DP. Interviewers distinguish it from Coin Change II (number of combinations). Greedy fails on many coin systems — say that.",
    theory: [
      "dp[x] = min coins to make x. dp[0]=0; dp[1..amount]=∞. For each coin, for x=coin..amount: dp[x]=min(dp[x], dp[x-coin]+1).",
      "Order: coins outer or amount outer both work for min (unlike combination count). BFS from 0 adding coins finds min count as levels.",
      "If dp[amount] still ∞ return -1.",
    ],
    howItWorks: [
      "int[] dp = new int[amount+1]; Arrays.fill(dp, amount+1); dp[0]=0;",
      "for (int c : coins) for (int x=c; x<=amount; x++) dp[x]=Math.min(dp[x], dp[x-c]+1);",
      "return dp[amount] > amount ? -1 : dp[amount];",
    ],
    whenToUse: [
      "Min count with unlimited item reuse to hit a target sum.",
    ],
    whenNotToUse: [
      "0/1 knapsack (each coin once) — different loop bounds.",
      "Count combinations — Coin Change II loop order matters.",
    ],
    complexity: { time: "O(amount · |coins|)", space: "O(amount)" },
    interviewTips: [
      "Give a greedy counterexample (coins 1,3,4, amount 6 → greedy 4+1+1 vs optimal 3+3).",
      "Use amount+1 as sentinel instead of Integer.MAX_VALUE to avoid overflow on +1.",
    ],
    pitfalls: [
      "MAX_VALUE + 1 overflow.",
      "Assuming canonical coin systems where greedy works.",
    ],
    practiceIdeas: [
      "LeetCode 322: Coin Change.",
      "Coin Change II (518) — contrast combination DP.",
    ],
    related: ["nc-word-break", "nc-combination-sum", "unbounded-knapsack"],
  },
  {
    slug: "nc-maximum-product-subarray",
    track: "dsa",
    category: "NeetCode 75",
    title: "Maximum Product Subarray",
    summary:
      "Contiguous subarray with maximum product. Negatives flip min/max — track both running min and max.",
    depth: "next",
    whyItMatters:
      "Kadane's cousin. A negative can turn the smallest product into the largest. Zeros reset the streak. Easy to get wrong with a single max variable.",
    theory: [
      "At index i, the best product ending here is max(nums[i], nums[i]*prevMax, nums[i]*prevMin). Worst (most negative) similarly with min.",
      "When nums[i] < 0, swap roles of prevMax/prevMin before multiplying, or compute both candidates without swap.",
      "Global answer is the max of all best-ending-here values.",
    ],
    howItWorks: [
      "int maxEnd = nums[0], minEnd = nums[0], ans = nums[0];",
      "for i=1..n-1: int x=nums[i]; int candidates max/min of (x, maxEnd*x, minEnd*x); update maxEnd, minEnd;",
      "ans = Math.max(ans, maxEnd); return ans;",
    ],
    whenToUse: [
      "Max product contiguous segment with possible negatives/zeros.",
    ],
    whenNotToUse: [
      "Max sum subarray — classic Kadane (LC 53).",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    interviewTips: [
      "Say 'I keep max and min ending here because of sign flips.'",
      "Dry-run [-2,3,-4] → 24.",
    ],
    pitfalls: [
      "Only tracking max — fails when two negatives multiply.",
      "Integer overflow on large products (mention long if needed).",
    ],
    practiceIdeas: [
      "LeetCode 152: Maximum Product Subarray.",
      "Compare with Maximum Subarray on the same arrays.",
    ],
    related: ["nc-maximum-subarray", "kadane"],
  },
  {
    slug: "nc-word-break",
    track: "dsa",
    category: "NeetCode 75",
    title: "Word Break",
    summary:
      "Can s be segmented into a space-separated sequence of dictionary words (reuse allowed)? Boolean DP on prefixes.",
    depth: "next",
    whyItMatters:
      "Shows DP + HashSet dictionary. Follow-ups: return any/all segmentations (backtracking + memo). Interviewers watch whether you bound inner loops by max word length.",
    theory: [
      "dp[i] = true if s[0..i) can be segmented. dp[0]=true. For each i, try breaks j < i where dp[j] && wordDict contains s[j..i).",
      "Put dict in HashSet<String> for O(1) average lookups. Cap j by i - maxLen to speed up.",
      "Greedy left-to-right fails (need DP/BFS). BFS on break positions also works.",
    ],
    howItWorks: [
      "HashSet<String> set = new HashSet<>(wordDict); boolean[] dp = new boolean[n+1]; dp[0]=true;",
      "for i=1..n for j=0..i-1: if dp[j] && set.contains(s.substring(j,i)) { dp[i]=true; break; }",
      "return dp[n];",
    ],
    whenToUse: [
      "Segment a string against a dictionary; path existence in a word DAG.",
    ],
    whenNotToUse: [
      "Only one valid segmentation required under unique constraints — still DP usually.",
    ],
    complexity: {
      time: "O(n² · L) with substring; better with trie",
      space: "O(n + dict)",
    },
    interviewTips: [
      "Mention Word Break II as memoized backtracking on the same dp idea.",
      "Put words in HashSet before the loops.",
    ],
    pitfalls: [
      "List.contains in the hot loop (O(dict) each time).",
      "Forgetting dp[0]=true.",
    ],
    practiceIdeas: [
      "LeetCode 139: Word Break — 'leetcode' / ['leet','code'].",
      "Word Break II for all sentences.",
    ],
    related: ["nc-coin-change", "nc-decode-ways", "nc-word-search"],
  },
  {
    slug: "nc-longest-increasing-subsequence",
    track: "dsa",
    category: "NeetCode 75",
    title: "Longest Increasing Subsequence",
    summary:
      "Length of the longest strictly increasing subsequence (not necessarily contiguous). O(n²) DP or O(n log n) patience/tails binary search.",
    depth: "next",
    whyItMatters:
      "Core subsequence DP. The n log n 'tails' array is a frequent follow-up. Do not confuse with longest increasing subarray (contiguous).",
    theory: [
      "dp[i] = LIS ending at i. dp[i] = 1 + max(dp[j] for j<i with nums[j]<nums[i]), else 1. Answer = max dp. O(n²).",
      "Patience sorting: tails[len] = smallest tail of all IS of length len+1. Binary search lower_bound for nums[i]; replace or append. Length of tails is LIS length (not the subsequence itself without parent pointers).",
      "Strict vs non-decreasing changes the comparison and lower vs upper bound.",
    ],
    howItWorks: [
      "O(n log n): ArrayList<Integer> tails = new ArrayList<>();",
      "for (int x : nums) { int i = Collections.binarySearch(tails, x); if (i<0) i=-(i+1); if (i==tails.size()) tails.add(x); else tails.set(i,x); }",
      "return tails.size(); (binarySearch on strict increase; adjust for duplicates).",
    ],
    whenToUse: [
      "Longest increasing/decreasing subsequence length or reconstruction.",
    ],
    whenNotToUse: [
      "Contiguous run — single scan for subarray.",
    ],
    complexity: { time: "O(n log n) tails; O(n²) DP", space: "O(n)" },
    interviewTips: [
      "Start with n² DP explanation, then upgrade to tails if they want better.",
      "Clarify strict vs non-decreasing.",
    ],
    pitfalls: [
      "Thinking tails is the LIS sequence (it is not always a valid subsequence).",
      "Using wrong binary-search insertion for duplicates.",
    ],
    practiceIdeas: [
      "LeetCode 300: Longest Increasing Subsequence.",
      "Russian Doll Envelopes — LIS on sorted pairs.",
    ],
    related: ["nc-longest-common-subsequence", "binary-search"],
  },
  {
    slug: "nc-combination-sum",
    track: "dsa",
    category: "NeetCode 75",
    title: "Combination Sum",
    summary:
      "Distinct candidates; unlimited reuse. Return all unique combinations that sum to target. Backtracking with ordered picks avoids duplicates.",
    depth: "next",
    whyItMatters:
      "Template for combination backtracking. Index-based reuse (start stays) vs Combination Sum II (start advances, skip duplicates). Same skeleton as subsets/permutations with a remaining-sum prune.",
    theory: [
      "Sort optional but helps prune when candidates[i] > remain. Recurse with start index: from i..end, choose candidates[i], recurse with same i (reuse), then backtrack remove.",
      "When remain==0, deep-copy path into answer (new ArrayList<>(path)). When remain<0 return.",
      "Uniqueness comes from non-decreasing index order — [2,3] and [3,2] are not both generated.",
    ],
    howItWorks: [
      "List<List<Integer>> ans = new ArrayList<>(); void bt(int start, int remain, List<Integer> path).",
      "if remain==0: ans.add(new ArrayList<>(path)); return; for i=start..n-1: if candidates[i]>remain break (if sorted); path.add(...); bt(i, remain-candidates[i], path); path.remove(path.size()-1);",
      "bt(0, target, new ArrayList<>()); return ans;",
    ],
    whenToUse: [
      "All combinations with unlimited reuse hitting a target.",
    ],
    whenNotToUse: [
      "Only count / min size — DP (coin change family).",
      "Each number once — Combination Sum II / subsets II.",
    ],
    complexity: {
      time: "exponential in target/min(coin)",
      space: "O(target/min) recursion depth",
    },
    interviewTips: [
      "Draw the tree for [2,3,6,7], target 7.",
      "Stress the deep copy into ans.",
    ],
    pitfalls: [
      "bt(i+1) instead of bt(i) — forbids reuse.",
      "Adding path by reference so later mutations corrupt ans.",
    ],
    practiceIdeas: [
      "LeetCode 39: Combination Sum.",
      "Combination Sum II; III; IV as variants.",
    ],
    related: ["nc-word-search", "nc-coin-change", "backtracking"],
  },
  {
    slug: "nc-word-search",
    track: "dsa",
    category: "NeetCode 75",
    title: "Word Search",
    summary:
      "m×n board of letters; return true if word exists as a path of adjacent (4-dir) cells without reusing a cell.",
    depth: "next",
    whyItMatters:
      "Grid backtracking. Mark/unmark cells (or use a visited[][]) around the recursion. Word Search II adds a Trie for many words — still NeetCode-famous.",
    theory: [
      "From every cell matching word[0], DFS with index k. At k==word.length() success. Try four dirs; skip out of bounds, mismatch, or visited.",
      "In-place: save board[r][c], set to '#', recurse, restore. That avoids a parallel boolean matrix.",
      "Prune early if remaining length cannot fit — optional. Worst case explores almost all paths.",
    ],
    howItWorks: [
      "for each r,c: if dfs(r,c,0) return true. dfs: if k==word.length() return true; bounds/char checks; char tmp=board[r][c]; board[r][c]='#';",
      "for each dir: if dfs(nr,nc,k+1) { board[r][c]=tmp; return true; }",
      "board[r][c]=tmp; return false;",
    ],
    whenToUse: [
      "Path existence spelling a word on a grid.",
    ],
    whenNotToUse: [
      "Many words at once — Trie + prune (Word Search II).",
    ],
    complexity: {
      time: "O(m·n·4^L) worst",
      space: "O(L) recursion",
    },
    interviewTips: [
      "Show mark and restore on the board.",
      "Ask whether diagonals count (usually no).",
    ],
    pitfalls: [
      "Forgetting to unmark (false negatives later).",
      "Allowing revisits.",
      "Comparing with word.charAt(k) after advancing k wrong.",
    ],
    practiceIdeas: [
      "LeetCode 79: Word Search.",
      "Word Search II (212) with a Trie.",
    ],
    related: ["nc-combination-sum", "nc-number-of-islands", "backtracking"],
  },
  {
    slug: "nc-unique-paths",
    track: "dsa",
    category: "NeetCode 75",
    title: "Unique Paths",
    summary:
      "Robot at (0,0) on m×n grid goes only right or down to (m-1,n-1). Count paths — combinatorics or 2-D DP.",
    depth: "next",
    whyItMatters:
      "Intro 2-D DP / lattice paths. Answer is C(m+n-2, m-1). Obstacles variant (Unique Paths II) forces DP. Rolling 1-D array is a nice space follow-up.",
    theory: [
      "dp[i][j] = dp[i-1][j] + dp[i][j-1]; first row/col = 1. Or compute binomial carefully to avoid overflow (use long, multiply-divide in order).",
      "With obstacles, zero out blocked cells and skip adding through them.",
      "Only right/down ⇒ DAG; no visited set needed.",
    ],
    howItWorks: [
      "int[] row = new int[n]; Arrays.fill(row, 1);",
      "for (int i=1; i<m; i++) for (int j=1; j<n; j++) row[j] += row[j-1];",
      "return row[n-1]; (or Math combinatorics).",
    ],
    whenToUse: [
      "Count monotone paths on a grid.",
    ],
    whenNotToUse: [
      "4-direction free movement with obstacles — different graph search.",
    ],
    complexity: { time: "O(m·n) DP; O(min(m,n)) combinatorics", space: "O(n)" },
    interviewTips: [
      "Name both DP and C(m+n-2, m-1).",
      "Watch overflow if they want a raw int for large grids.",
    ],
    pitfalls: [
      "Off-by-one in binomial (choose m vs m-1).",
      "Initializing only dp[0][0]=1 and forgetting edges.",
    ],
    practiceIdeas: [
      "LeetCode 62: Unique Paths.",
      "Unique Paths II with obstacles.",
    ],
    related: ["nc-longest-common-subsequence", "nc-jump-game"],
  },
  {
    slug: "nc-longest-common-subsequence",
    track: "dsa",
    category: "NeetCode 75",
    title: "Longest Common Subsequence",
    summary:
      "Length of the longest subsequence common to text1 and text2 (not necessarily contiguous). Classic 2-D DP.",
    depth: "next",
    whyItMatters:
      "The template behind diff tools and edit-distance relatives. Must distinguish subsequence vs substring. Space can roll to O(min(n,m)).",
    theory: [
      "dp[i][j] = LCS of prefixes text1[0..i), text2[0..j). If chars equal, 1+dp[i-1][j-1]; else max(dp[i-1][j], dp[i][j-1]).",
      "dp[0][*]=dp[*][0]=0. Answer dp[m][n]. Reconstruct by walking pointers when you need the string.",
      "Substring would reset on mismatch differently — do not reuse this table blindly.",
    ],
    howItWorks: [
      "int m=text1.length(), n=text2.length(); int[][] dp = new int[m+1][n+1];",
      "for i=1..m for j=1..n: if text1.charAt(i-1)==text2.charAt(j-1) dp[i][j]=dp[i-1][j-1]+1; else dp[i][j]=Math.max(dp[i-1][j], dp[i][j-1]);",
      "return dp[m][n];",
    ],
    whenToUse: [
      "LCS length/string; similarity of two sequences.",
    ],
    whenNotToUse: [
      "Longest common substring — contiguous, different DP/reset.",
    ],
    complexity: { time: "O(m·n)", space: "O(m·n) or O(min)" },
    interviewTips: [
      "Draw the small DP table for 'ace' / 'abcde'.",
      "Mention edit distance as a sibling recurrence.",
    ],
    pitfalls: [
      "Confusing subsequence with substring.",
      "1-based vs 0-based charAt mistakes.",
    ],
    practiceIdeas: [
      "LeetCode 1143: Longest Common Subsequence.",
      "Delete Distance / Edit Distance next.",
    ],
    related: ["nc-longest-increasing-subsequence", "nc-unique-paths", "edit-distance"],
  },
  {
    slug: "nc-jump-game",
    track: "dsa",
    category: "NeetCode 75",
    title: "Jump Game",
    summary:
      "nums[i] is max jump length from i. Return true if you can reach the last index — greedy farthest reach.",
    depth: "next",
    whyItMatters:
      "Greedy over DP. Maintain the farthest index reachable so far; if you ever stand past it you fail. Jump Game II asks min jumps — different greedy.",
    theory: [
      "Scan left to right. At i, if i > far return false. far = max(far, i + nums[i]). If far >= n-1 return true.",
      "DP boolean reachable works but is slower O(n²) if naive. Greedy is O(n).",
      "zeros create walls unless you already jumped over them.",
    ],
    howItWorks: [
      "int far = 0;",
      "for (int i = 0; i < n; i++) { if (i > far) return false; far = Math.max(far, i + nums[i]); if (far >= n-1) return true; }",
      "return true;",
    ],
    whenToUse: [
      "Reachability with variable jump lengths on a line.",
    ],
    whenNotToUse: [
      "Min number of jumps — Jump Game II level/greedy.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    interviewTips: [
      "State invariant: 'far is the rightmost index I can stand on.'",
      "Dry-run [3,2,1,0,4] → false.",
    ],
    pitfalls: [
      "Updating far after checking i>far incorrectly.",
      "Assuming you must jump exactly nums[i].",
    ],
    practiceIdeas: [
      "LeetCode 55: Jump Game.",
      "Jump Game II for min jumps.",
    ],
    related: ["nc-maximum-subarray", "nc-house-robber", "greedy"],
  },
  {
    slug: "nc-maximum-subarray",
    track: "dsa",
    category: "NeetCode 75",
    title: "Maximum Subarray",
    summary:
      "Contiguous subarray with largest sum (Kadane). Return that sum. Classic greedy/DP one-liner scan.",
    depth: "next",
    whyItMatters:
      "Must-know linear scan. Interviewers ask to also return indices, handle all-negative arrays, and contrast with max product. Divide-and-conquer is the textbook alternate.",
    theory: [
      "maxEndingHere = max(nums[i], maxEndingHere + nums[i]). best = max(best, maxEndingHere). Drop a negative prefix because it cannot help.",
      "All-negative: answer is the largest (least negative) element — Kadane handles it if you start from nums[0], not from 0.",
      "Prefix sums + min prefix also work: max over i of pref[i]-min_{j<i} pref[j].",
    ],
    howItWorks: [
      "int best = nums[0], cur = nums[0];",
      "for i=1..n-1: cur = Math.max(nums[i], cur + nums[i]); best = Math.max(best, cur);",
      "return best;",
    ],
    whenToUse: [
      "Max sum contiguous segment.",
    ],
    whenNotToUse: [
      "Non-contiguous max sum — just sum positives (with care).",
      "Max product — track min too.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    interviewTips: [
      "Name Kadane and the 'discard negative prefix' intuition.",
      "Offer index tracking: reset start when cur becomes nums[i].",
    ],
    pitfalls: [
      "Initializing best=0 so all-negative cases fail.",
      "Empty subarray allowed when problem wants at least one element.",
    ],
    practiceIdeas: [
      "LeetCode 53: Maximum Subarray — [-2,1,-3,4,-1,2,1,-5,4] → 6.",
      "Return the bounds of the winning window.",
    ],
    related: ["nc-maximum-product-subarray", "nc-jump-game", "kadane"],
  },
  {
    slug: "nc-insert-interval",
    track: "dsa",
    category: "NeetCode 75",
    title: "Insert Interval",
    summary:
      "Non-overlapping sorted intervals plus a new interval. Insert and merge overlaps; return the new sorted list.",
    depth: "next",
    whyItMatters:
      "Three-pass interval pattern: push all before, merge overlapping into the new interval, push all after. Cleaner than full merge-sort restating.",
    theory: [
      "Because intervals are sorted by start, walk while intervals[i].end < new.start → add as-is. Then while intervals overlap new (start ≤ new.end), expand new.start/end. Then append the rest.",
      "Overlap test: not (a.end < b.start || b.end < a.start). For sorted insert, start ≤ new.end is enough once you passed the before region.",
      "Empty list → just the new interval.",
    ],
    howItWorks: [
      "List<int[]> out = new ArrayList<>(); int i=0, n=intervals.length;",
      "while i<n && intervals[i][1] < newInterval[0]: out.add(intervals[i++]); while i<n && intervals[i][0] <= newInterval[1]: newInterval[0]=Math.min(...); newInterval[1]=Math.max(...); i++; out.add(newInterval);",
      "while i<n: out.add(intervals[i++]); return out.toArray(new int[out.size()][]);",
    ],
    whenToUse: [
      "Insert one interval into a sorted disjoint list.",
    ],
    whenNotToUse: [
      "Unsorted many merges — sort then Merge Intervals.",
    ],
    complexity: { time: "O(n)", space: "O(n)" },
    interviewTips: [
      "Narrate the three phases: before / merge / after.",
      "Draw [1,2],[3,5],[6,7],[8,10],[12,16] insert [4,8].",
    ],
    pitfalls: [
      "Using < instead of <= on overlap and leaving a touch-merge undone (problem usually merges touches).",
      "Mutating the input array unexpectedly.",
    ],
    practiceIdeas: [
      "LeetCode 57: Insert Interval.",
      "Merge Intervals (56) as the unsorted cousin.",
    ],
    related: ["nc-merge-intervals", "nc-non-overlapping-intervals"],
  },
  {
    slug: "nc-merge-intervals",
    track: "dsa",
    category: "NeetCode 75",
    title: "Merge Intervals",
    summary:
      "List of intervals (possibly overlapping). Merge all overlaps into a disjoint set sorted by start.",
    depth: "next",
    whyItMatters:
      "Sort-by-start then linear sweep is the interval bread and butter. Used in calendars, IP ranges, and video overlays.",
    theory: [
      "Sort intervals by start (Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]))). Seed cur with the first. For each next, if next.start ≤ cur.end, cur.end = max(cur.end, next.end); else emit cur and cur=next.",
      "Touching endpoints: problem statement usually merges [1,4][4,5] → [1,5].",
      "Empty input → empty output.",
    ],
    howItWorks: [
      "if (intervals.length == 0) return intervals; Arrays.sort by start;",
      "List<int[]> merged = new ArrayList<>(); int[] cur = intervals[0].clone(); for each later iv: if iv[0] <= cur[1] cur[1]=Math.max(cur[1], iv[1]); else { merged.add(cur); cur=iv.clone(); }",
      "merged.add(cur); return merged.toArray(new int[0][]);",
    ],
    whenToUse: [
      "Collapse overlapping ranges.",
    ],
    whenNotToUse: [
      "Need count of overlaps at a point — sweep line with +1/-1 events.",
    ],
    complexity: { time: "O(n log n)", space: "O(n)" },
    interviewTips: [
      "Always sort first unless already sorted.",
      "Clone or copy when storing cur so later mutations do not corrupt.",
    ],
    pitfalls: [
      "Forgetting to sort.",
      "Strict < so touching intervals stay split when they should merge.",
    ],
    practiceIdeas: [
      "LeetCode 56: Merge Intervals.",
      "Insert Interval as a sorted special case.",
    ],
    related: ["nc-insert-interval", "nc-meeting-rooms-ii", "nc-non-overlapping-intervals"],
  },
  {
    slug: "nc-non-overlapping-intervals",
    track: "dsa",
    category: "NeetCode 75",
    title: "Non-overlapping Intervals",
    summary:
      "Erase the minimum number of intervals so the rest are non-overlapping. Equivalent to keeping a max non-overlapping set — greedy by end time.",
    depth: "next",
    whyItMatters:
      "Interval scheduling classic: sort by end, take next that starts ≥ last end. Removals = n - kept. Confusing this with merge is a common mistake.",
    theory: [
      "Activity selection: earliest-finishing interval leaves the most room. Sort by end ascending. Iterate: if start >= prevEnd, keep and prevEnd=end; else count a removal.",
      "Overlaps that nest or chain — always discard the one that ends later when conflict (already encoded by sort).",
      "Touching at an endpoint is usually OK (non-overlapping).",
    ],
    howItWorks: [
      "Arrays.sort(intervals, Comparator.comparingInt(a -> a[1]));",
      "int kept=0, prevEnd=Integer.MIN_VALUE; for (int[] iv : intervals) if (iv[0] >= prevEnd) { kept++; prevEnd=iv[1]; }",
      "return intervals.length - kept; (or increment remove counter on else).",
    ],
    whenToUse: [
      "Min removals / max non-overlapping intervals.",
    ],
    whenNotToUse: [
      "Merge into unions — Merge Intervals.",
    ],
    complexity: { time: "O(n log n)", space: "O(1) besides sort" },
    interviewTips: [
      "Say 'this is activity selection' and sort by end, not start.",
      "Contrast with sorting by start (wrong for this greedy).",
    ],
    pitfalls: [
      "Sorting by start and greedily keeping — suboptimal.",
      "Treating touching intervals as overlapping.",
    ],
    practiceIdeas: [
      "LeetCode 435: Non-overlapping Intervals.",
      "Meeting Rooms — detect any overlap without counting removals.",
    ],
    related: ["nc-merge-intervals", "nc-meeting-rooms", "greedy"],
  },
  {
    slug: "nc-meeting-rooms",
    track: "dsa",
    category: "NeetCode 75",
    title: "Meeting Rooms",
    summary:
      "Given meeting time intervals, return true if a person can attend all (no overlaps). Sort by start and check adjacent pairs.",
    depth: "core",
    whyItMatters:
      "Warmup for Meeting Rooms II. Premium LC 252. Teaches interval overlap checks cleanly before heap sweep.",
    theory: [
      "Sort by start. For each consecutive pair, if intervals[i].start < intervals[i-1].end → conflict (adjust equality if end==start is allowed — usually OK to attend both).",
      "Equivalent: max non-overlapping count == n, but adjacent check after sort is enough.",
      "Empty / single meeting → true.",
    ],
    howItWorks: [
      "Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));",
      "for (int i=1; i<n; i++) if (intervals[i][0] < intervals[i-1][1]) return false;",
      "return true;",
    ],
    whenToUse: [
      "Detect any overlap in a set of intervals.",
    ],
    whenNotToUse: [
      "Need how many rooms — Meeting Rooms II.",
    ],
    complexity: { time: "O(n log n)", space: "O(1) besides sort" },
    interviewTips: [
      "Clarify whether end == next start conflicts.",
      "Mention sorting key before coding.",
    ],
    pitfalls: [
      "Using <= when touching should be allowed.",
      "Comparing unsorted intervals.",
    ],
    practiceIdeas: [
      "LeetCode 252: Meeting Rooms.",
      "Escalate to Meeting Rooms II.",
    ],
    related: ["nc-meeting-rooms-ii", "nc-non-overlapping-intervals"],
  },
  {
    slug: "nc-meeting-rooms-ii",
    track: "dsa",
    category: "NeetCode 75",
    title: "Meeting Rooms II",
    summary:
      "Min number of conference rooms so all meetings can proceed. Sweep line or min-heap of end times.",
    depth: "next",
    whyItMatters:
      "Classic heap + intervals interview. Track ongoing meetings; when a meeting starts before the earliest end, you need a new room.",
    theory: [
      "Sort meetings by start. PriorityQueue<Integer> of end times (min-heap). For each meeting: if pq.peek() <= start, poll (reuse room). Offer this end. Max pq.size() or final size is rooms needed (size after each offer works).",
      "Sweep: +1 at start, -1 at end; sort events (ends before starts on ties if touching frees a room); scan running count max.",
      "Meeting Rooms I is the special case asking whether max concurrent ≤ 1.",
    ],
    howItWorks: [
      "Arrays.sort by start; PriorityQueue<Integer> ends = new PriorityQueue<>();",
      "for each meeting: if (!ends.isEmpty() && ends.peek() <= meeting[0]) ends.poll(); ends.offer(meeting[1]);",
      "return ends.size();",
    ],
    whenToUse: [
      "Min resources for overlapping intervals; max concurrent count.",
    ],
    whenNotToUse: [
      "Only yes/no attend-all — Meeting Rooms I.",
    ],
    complexity: { time: "O(n log n)", space: "O(n)" },
    interviewTips: [
      "Dry-run [[0,30],[5,10],[15,20]] → 2.",
      "Explain peek≤start as 'a room freed.'",
    ],
    pitfalls: [
      "Max-heap by mistake.",
      "Sorting by end instead of start for the heap approach.",
      "Wrong tie-breaking on sweep events.",
    ],
    practiceIdeas: [
      "LeetCode 253: Meeting Rooms II.",
      "Implement both heap and +1/-1 sweep.",
    ],
    related: ["nc-meeting-rooms", "nc-merge-intervals", "heap"],
  },
  {
    slug: "nc-rotate-image",
    track: "dsa",
    category: "NeetCode 75",
    title: "Rotate Image",
    summary:
      "Rotate an n×n matrix 90° clockwise in place. Transpose then reverse each row (or layer cycles).",
    depth: "next",
    whyItMatters:
      "In-place matrix manipulation without a second buffer. Interviewers want the transpose+reverse insight or the four-cell cycle.",
    theory: [
      "Clockwise 90°: index (i,j) → (j, n-1-i). Transpose (i,j)↔(j,i) then reverse each row realizes that map. Counter-clockwise: transpose then reverse columns (or reverse rows then transpose).",
      "Layer approach: for each layer, rotate four edges with a temp. Same O(n²).",
      "Problem forbids allocating another matrix — swaps only.",
    ],
    howItWorks: [
      "for i: for j=i+1..n-1: swap matrix[i][j], matrix[j][i];",
      "for each row: reverse with two pointers or Collections-style swaps on the int[]",
      "done — matrix mutated in place.",
    ],
    whenToUse: [
      "In-place square matrix rotation.",
    ],
    whenNotToUse: [
      "Rectangular non-square — rotation changes dimensions; need a new array.",
    ],
    complexity: { time: "O(n²)", space: "O(1)" },
    interviewTips: [
      "Draw a 3×3 and show transpose then row reverse.",
      "Ask clockwise vs counter-clockwise.",
    ],
    pitfalls: [
      "Transposing full j from 0 (double swap back).",
      "Off-by-one on n-1-i.",
    ],
    practiceIdeas: [
      "LeetCode 48: Rotate Image.",
      "Rotate 180° / 270° as compositions.",
    ],
    related: ["nc-spiral-matrix", "nc-set-matrix-zeroes"],
  },
  {
    slug: "nc-spiral-matrix",
    track: "dsa",
    category: "NeetCode 75",
    title: "Spiral Matrix",
    summary:
      "Return all elements of an m×n matrix in spiral order (right, down, left, up), peeling layers.",
    depth: "next",
    whyItMatters:
      "Boundary-index care. Easy to infinite-loop or double-count corners. Same boundaries pattern as Generate Spiral Matrix.",
    theory: [
      "Maintain top, bottom, left, right. Traverse top row L→R, top++; right col T→B, right--; if bounds cross break; bottom row R→L, bottom--; left col B→T, left++.",
      "Recheck top<=bottom and left<=right before the bottom/left passes — single-row or single-column leftovers.",
      "Stop when result size == m*n.",
    ],
    howItWorks: [
      "List<Integer> ans = new ArrayList<>(); int t=0,b=m-1,l=0,r=n-1;",
      "while (t<=b && l<=r): for c=l..r ans.add(matrix[t][c]); t++; for row=t..b ans.add(matrix[row][r]); r--; if (t>b||l>r) break; for c=r..l ans.add(matrix[b][c]); b--; for row=b..t ans.add(matrix[row][l]); l++;",
      "return ans;",
    ],
    whenToUse: [
      "Traverse or fill a matrix in spiral order.",
    ],
    whenNotToUse: [
      "Diagonal / zigzag — different index formulas.",
    ],
    complexity: { time: "O(m·n)", space: "O(1) besides output" },
    interviewTips: [
      "Call out the mid-loop bound check for 1×n and n×1.",
      "Dry-run a 3×3 on the board.",
    ],
    pitfalls: [
      "Duplicating corners.",
      "Missing the break when only one row remains.",
    ],
    practiceIdeas: [
      "LeetCode 54: Spiral Matrix.",
      "Spiral Matrix II — fill 1..n².",
    ],
    related: ["nc-rotate-image", "nc-set-matrix-zeroes"],
  },
  {
    slug: "nc-set-matrix-zeroes",
    track: "dsa",
    category: "NeetCode 75",
    title: "Set Matrix Zeroes",
    summary:
      "If a cell is 0, set its entire row and column to 0. Do it in place with O(1) extra space using first row/col as markers.",
    depth: "next",
    whyItMatters:
      "In-place marking interview. Naive O(mn) copy is too much space; two boolean arrays are O(m+n); constant space uses the matrix itself carefully.",
    theory: [
      "First pass: record which rows/cols need zeroing. Second pass: zero them. For O(1) space, use row0 and col0 as markers; keep a separate boolean for whether row0 / col0 themselves must zero (or use matrix[0][0] plus one flag).",
      "Order matters: zero inner cells using markers, then zero first row/col last so markers survive.",
      "Do not zero while scanning for zeros or you cascade incorrectly.",
    ],
    howItWorks: [
      "boolean firstRow=false, firstCol=false; scan row 0 / col 0 for zeros to set flags; for i=1.. for j=1.. if matrix[i][j]==0: matrix[i][0]=matrix[0][j]=0;",
      "for i=1.. for j=1.. if matrix[i][0]==0 || matrix[0][j]==0: matrix[i][j]=0;",
      "if (firstRow) zero row 0; if (firstCol) zero col 0;",
    ],
    whenToUse: [
      "Propagate zeros across rows/cols in place.",
    ],
    whenNotToUse: [
      "Allowed O(m+n) space — simpler boolean arrays are fine then.",
    ],
    complexity: { time: "O(m·n)", space: "O(1)" },
    interviewTips: [
      "Start with O(m+n) marker arrays, then optimize to first row/col.",
      "Emphasize zeroing the first row/col at the end.",
    ],
    pitfalls: [
      "Using matrix[0][0] for both row and col without a second flag.",
      "Zeroing markers too early and losing information.",
    ],
    practiceIdeas: [
      "LeetCode 73: Set Matrix Zeroes.",
      "Implement both O(m+n) and O(1) versions.",
    ],
    related: ["nc-rotate-image", "nc-spiral-matrix"],
  },
  {
    slug: "nc-number-of-1-bits",
    track: "dsa",
    category: "NeetCode 75",
    title: "Number of 1 Bits",
    summary:
      "Hamming weight: count set bits in an unsigned 32-bit integer. Kernighan n&=n-1 or Integer.bitCount.",
    depth: "core",
    whyItMatters:
      "Bit primer for interviews. Kernighan's loop runs popcount times. Also the primitive behind Hamming distance (popcount of XOR).",
    theory: [
      "n & (n-1) clears the lowest set bit. Loop until n==0, counting iterations.",
      "Shift scan: for 32 bits count n&1, n>>>=1 (logical shift for signed Java ints).",
      "Java: Integer.bitCount(n). Know both library and manual.",
    ],
    howItWorks: [
      "int c = 0; // treat n as bit pattern",
      "while (n != 0) { n &= (n - 1); c++; }",
      "return c;",
    ],
    whenToUse: [
      "Popcount, Hamming distance, sparse bit iteration.",
    ],
    whenNotToUse: [
      "Need all popcounts 0..n — Counting Bits DP.",
    ],
    complexity: { time: "O(popcount) Kernighan; O(32) scan", space: "O(1)" },
    interviewTips: [
      "Prefer >>> in Java if you shift a signed int.",
      "Name Kernighan explicitly.",
    ],
    pitfalls: [
      "Using >> and infinite-looping on negative numbers.",
      "Assuming n is non-negative when the bit pattern may set the sign bit.",
    ],
    practiceIdeas: [
      "LeetCode 191: Number of 1 Bits.",
      "Hamming Distance between two ints.",
    ],
    related: ["nc-counting-bits", "nc-reverse-bits", "count-bits"],
  },
  {
    slug: "nc-counting-bits",
    track: "dsa",
    category: "NeetCode 75",
    title: "Counting Bits",
    summary:
      "For each i in 0..n return popcount(i) as an array. DP: ans[i] = ans[i>>1] + (i&1).",
    depth: "core",
    whyItMatters:
      "Shows bit DP instead of calling bitCount n times. Elegant O(n) table. Good bridge from popcount to bitmask DP thinking.",
    theory: [
      "i>>1 drops the last bit; i&1 is that bit. So popcount(i) = popcount(i>>1) + (i&1).",
      "Alternate: ans[i] = ans[i & (i-1)] + 1 (remove lowest set bit).",
      "ans[0]=0. Linear pass fills the answer array.",
    ],
    howItWorks: [
      "int[] ans = new int[n+1];",
      "for (int i=1; i<=n; i++) ans[i] = ans[i>>1] + (i&1);",
      "return ans;",
    ],
    whenToUse: [
      "Bulk Hamming weights for a range.",
    ],
    whenNotToUse: [
      "Single integer — Number of 1 Bits.",
    ],
    complexity: { time: "O(n)", space: "O(n) output" },
    interviewTips: [
      "Derive the recurrence from binary representation aloud.",
      "Mention the Kernighan-based recurrence too.",
    ],
    pitfalls: [
      "Starting the loop at 0 and reading ans[-1].",
      "Using /2 without clarifying it is >>1 for ints.",
    ],
    practiceIdeas: [
      "LeetCode 338: Counting Bits.",
      "Verify against Integer.bitCount for 0..32.",
    ],
    related: ["nc-number-of-1-bits", "nc-reverse-bits"],
  },
  {
    slug: "nc-reverse-bits",
    track: "dsa",
    category: "NeetCode 75",
    title: "Reverse Bits",
    summary:
      "Reverse the bits of a 32-bit unsigned integer. Build result by shifting in LSBs from n, or swap bit halves.",
    depth: "core",
    whyItMatters:
      "Fixed-width bit reverse. Tests unsigned thinking in Java (use >>> and mask). Follow-up: reverse bytes; use a 8-bit lookup table.",
    theory: [
      "ans=0; for 32 iterations: ans = (ans<<1) | (n&1); n>>>=1. That peels n from the right into ans from the left.",
      "Divide-and-conquer swaps: swap adjacent bits, then 2-bit groups, 4, 8, 16 with masks — O(1) passes.",
      "Java has no unsigned int type; treat the value as a 32-bit pattern.",
    ],
    howItWorks: [
      "int ans = 0;",
      "for (int i=0; i<32; i++) { ans = (ans << 1) | (n & 1); n >>>= 1; }",
      "return ans;",
    ],
    whenToUse: [
      "Reverse bit order in a fixed-width word.",
    ],
    whenNotToUse: [
      "Reverse a decimal integer's digits — different problem.",
    ],
    complexity: { time: "O(32)", space: "O(1)" },
    interviewTips: [
      "Stress 32 iterations even if high bits are zero.",
      "Use >>> so sign extension does not pollute.",
    ],
    pitfalls: [
      "Looping while n!=0 and dropping leading zeros in the reverse.",
      "Using >> instead of >>>.",
    ],
    practiceIdeas: [
      "LeetCode 190: Reverse Bits.",
      "Reverse only the lowest 8 bits as a variant.",
    ],
    related: ["nc-number-of-1-bits", "nc-sum-of-two-integers"],
  },
  {
    slug: "nc-missing-number",
    track: "dsa",
    category: "NeetCode 75",
    title: "Missing Number",
    summary:
      "Array of n distinct numbers in [0,n] missing exactly one. Find it via XOR or sum formula — O(1) space.",
    depth: "core",
    whyItMatters:
      "XOR cancelation trick: a^a=0. Also Gauss sum n(n+1)/2 - sum(arr). Bit version avoids overflow worries on the sum.",
    theory: [
      "XOR all indices 0..n with all values; pairs cancel; leftover is the missing number. Init missing=n then missing ^= i ^ nums[i] for i in 0..n-1.",
      "Sum: expected - actual. Use long if n is large.",
      "HashSet is O(n) space — mention then reject for the follow-up.",
    ],
    howItWorks: [
      "int x = nums.length;",
      "for (int i=0; i<nums.length; i++) x ^= i ^ nums[i];",
      "return x;",
    ],
    whenToUse: [
      "Find one missing number in a known range permutation.",
    ],
    whenNotToUse: [
      "Multiple missing — need different bookkeeping.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    interviewTips: [
      "Offer sum and XOR; pick XOR if they mention overflow.",
      "Confirm range is 0..n inclusive.",
    ],
    pitfalls: [
      "Gauss formula overflow on int for large n.",
      "XORing only values and forgetting indices.",
    ],
    practiceIdeas: [
      "LeetCode 268: Missing Number.",
      "Find the duplicate number as a contrast.",
    ],
    related: ["nc-sum-of-two-integers", "nc-number-of-1-bits", "xor-tricks"],
  },
  {
    slug: "nc-sum-of-two-integers",
    track: "dsa",
    category: "NeetCode 75",
    title: "Sum of Two Integers",
    summary:
      "Add two ints without + or -. Use XOR for sum bits and AND<<1 for carry until carry is 0.",
    depth: "next",
    whyItMatters:
      "Hardware adder in software. Negatives work in two's complement with the same loop. Follow-up: subtract via add negate.",
    theory: [
      "Sum without carry is a^b. Carry bits are (a&b)<<1. Iterate: while b!=0: carry=(a&b)<<1; a=a^b; b=carry.",
      "In Java, << on int is fine; beware infinite loops if you use a language with unlimited ints and a negative carry pattern — Java ints wrap mod 2^32 so it terminates.",
      "Subtraction: a - b = add(a, ~b+1) but +1 itself uses the same adder.",
    ],
    howItWorks: [
      "while (b != 0) {",
      "  int carry = (a & b) << 1; a = a ^ b; b = carry;",
      "} return a;",
    ],
    whenToUse: [
      "Add without arithmetic operators; explain ALU carry.",
    ],
    whenNotToUse: [
      "Production math — just use +.",
    ],
    complexity: { time: "O(1) bounded by bit width", space: "O(1)" },
    interviewTips: [
      "Walk 3+1: 11 ^ 01 = 10, carry 10, then 00 with carry 100 → 4.",
      "Mention two's complement handles negatives.",
    ],
    pitfalls: [
      "Forgetting to shift the carry.",
      "Infinite loop if carry not cleared (wrong language model of ints).",
    ],
    practiceIdeas: [
      "LeetCode 371: Sum of Two Integers.",
      "Implement subtract with the same adder.",
    ],
    related: ["nc-missing-number", "nc-reverse-bits", "xor-tricks"],
  },
  {
    slug: "nc-find-median-from-data-stream",
    track: "dsa",
    category: "NeetCode 75",
    title: "Find Median from Data Stream",
    summary:
      "Online MedianFinder: addNum and findMedian. Two heaps — max-heap lower half, min-heap upper half — keep sizes balanced.",
    depth: "advanced",
    whyItMatters:
      "Hard heap design interview. Sorting each query is too slow. The two-heap invariant is the standard answer and shows up in sliding-window median variants.",
    theory: [
      "low = PriorityQueue reverseOrder (max-heap), high = PriorityQueue natural (min-heap). All in low ≤ all in high. |low.size - high.size| ≤ 1.",
      "addNum: push to low, then offer(low.poll()) to high; if high grew larger, offer(high.poll()) back to low — keeps low equal or one bigger.",
      "Median: if sizes equal, average of low.peek() and high.peek() as double; else low.peek().",
    ],
    howItWorks: [
      "PriorityQueue<Integer> low = new PriorityQueue<>(Collections.reverseOrder()); PriorityQueue<Integer> high = new PriorityQueue<>();",
      "addNum(x): low.offer(x); high.offer(low.poll()); if (high.size() > low.size()) low.offer(high.poll());",
      "findMedian: return low.size()>high.size() ? low.peek() : (low.peek()+high.peek())/2.0;",
    ],
    whenToUse: [
      "Running median; online stream statistics with comparable elements.",
    ],
    whenNotToUse: [
      "Static array median once — sort or Quickselect.",
      "Need arbitrary percentile with huge n — count-sketch / Fenwick on compressed coords.",
    ],
    complexity: {
      time: "O(log n) add; O(1) median",
      space: "O(n)",
    },
    interviewTips: [
      "State the invariant before touching PriorityQueue APIs.",
      "Watch integer overflow on sum/2 — cast to double carefully.",
    ],
    pitfalls: [
      "Both heaps min-heaps — invariant breaks.",
      "Not rebalancing after every insert.",
      "Integer division for the even case.",
    ],
    practiceIdeas: [
      "LeetCode 295: Find Median from Data Stream.",
      "Sliding Window Median as a hard follow-up.",
    ],
    related: ["heap", "nc-meeting-rooms-ii", "quickselect"],
  },
];
