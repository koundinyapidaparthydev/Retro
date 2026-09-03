import { problem, type ProblemCard } from "./types";

export const PACK: Record<string, ProblemCard> = {
  bfs: problem(
    "A maze or map. Every step costs one hop. Walls block you.",
    "Fewest hops from start to the exit. Return the hop count, not a scenic walk.",
    "Start S, exit E. S-open-open-E is 3 hops. A long detour that still reaches E is worse.",
    [
      "Shortest walk in a maze. Walls are #.",
      "Change one letter at a time until you spell the target word. Fewest words.",
      "Several oranges rot at minute 0. When does the last fresh one rot?",
    ],
  ),

  dfs: problem(
    "A maze or graph. You may follow one corridor all the way before trying the next.",
    "Does a path exist? Can you paint every cell of one region? Not “fewest hops.”",
    "A leads to B then a dead end, then back to A then C. A path to C exists.",
    [
      "Is there any walk from start to exit?",
      "Paint one blob of land, then the next. How many blobs?",
      "Can these courses be finished, or does a chain loop back?",
    ],
  ),

  "cycle-undirected": problem(
    "Towns linked by two-way roads. You get the road list.",
    "Is there a loop — a walk that returns home without retracing the same road as its only option?",
    "1-2, 2-3, 3-1. Yes, a triangle. 1-2, 2-3, 3-4. No loop.",
    [
      "These n towns and n roads — which extra road closes a loop?",
      "Is this a tree (connected, no loop)?",
      "A self-road 2-2. Is that a loop?",
    ],
  ),

  "cycle-directed": problem(
    "Courses with one-way “must take A before B” arrows.",
    "Is there a circular wait so nobody can start? Yes or no.",
    "A→B, B→C, C→A. Stuck. A→B, B→C. Fine — take A, then B, then C.",
    [
      "Can I finish all courses given these prereqs?",
      "Print one loop of courses if one exists.",
      "Which courses are safe — they never lead into a loop?",
    ],
  ),

  "topo-sort-kahn": problem(
    "Jobs with prerequisites. A job is ready only when every arrow into it is done.",
    "An order to run every job. If some jobs never become ready, say it is impossible.",
    "A before C, B before C. Orders A,B,C and B,A,C both work. A←C←A is impossible.",
    [
      "Give one valid course order.",
      "Give the alphabetically earliest valid order.",
      "How many jobs can start in the first wave (nothing blocking them)?",
    ],
  ),

  "topo-sort-dfs": problem(
    "Same jobs and arrows. You finish a job only after every job that depends on it is finished.",
    "List jobs in that finish order, then reverse it so sources come first. Abort if a job waits on itself.",
    "A→B→C. Finish C, then B, then A. Reverse: A, B, C.",
    [
      "Order the build so libraries appear before apps that import them.",
      "What if a leftover arrow points back to a job still in progress?",
      "The graph has two separate chains. Both must appear in the order.",
    ],
  ),

  "bfs-shortest-path": problem(
    "A map where every corridor is one hop. You need the walk, not only the length.",
    "One shortest hop-path from start to target. If none, say so.",
    "S-a-b-E and S-x-y-z-E. Return S,a,b,E (3 hops), not the longer walk.",
    [
      "Restore the path through a maze, not just the hop count.",
      "List every shortest word-ladder, not one.",
      "Several doors start open. Distance to the nearest door for every room.",
    ],
  ),

  dijkstra: problem(
    "Cities and roads. Each road has a positive toll. No negative tolls.",
    "Cheapest total toll from the start city to the target (or to every city).",
    "A–B costs 1, A–C costs 4, B–C costs 1. Start A. Best to C is A-B-C = 2, not the direct 4.",
    [
      "Shortest time on a weighted map. All times are positive.",
      "Also print the cheapest route, not only the cost.",
      "What if a road could have a rebate (negative time)?",
    ],
  ),

  "bellman-ford": problem(
    "Same map, but some roads pay you (negative cost). A loop of payments could print money.",
    "Cheapest walk from start, or report that a money-printing loop is reachable.",
    "A→B = 3, B→C = −2, C→B = −1. B-C-B loses more each lap. Flag that loop.",
    [
      "Cheapest flight with at most k stops (some fares can be a rebate).",
      "Currency rates: can you cycle exchanges and grow money?",
      "Only care about loops you can reach from the start city.",
    ],
  ),

  kruskal: problem(
    "A list of possible cables, each with a cost, that can link buildings.",
    "Cheapest set of cables so every building is linked. Skip a cable if its two ends are already linked.",
    "Cables 1-2:1, 2-3:2, 1-3:5. Take 1-2 and 2-3 (cost 3). Skip 1-3.",
    [
      "Min cost to connect all points on a plane (every pair is a possible cable).",
      "A well can be dug at each house, or houses can share pipes. Cheapest plan.",
      "If you cannot link everyone, say impossible.",
    ],
  ),

  prim: problem(
    "You already stand at one building. The rest are dark.",
    "Grow the lit campus by always attaching the cheapest cable that reaches a dark building. Total cost.",
    "Start at 1. Edges 1-2:1, 1-3:100, 2-3:2. Light 2 (cost 1), then 3 via 2 (cost 2). Total 3.",
    [
      "Same connect-all-points, but you grow from house 0.",
      "The map is a dense grid of pairwise costs. Still grow one campus.",
      "Two clusters never touch. What do you return?",
    ],
  ),

  "union-find": problem(
    "A stream of “these two people are in the same group” facts. Groups merge, they never split.",
    "After the facts, how many groups are left? Or: are Alice and Bob already in one group?",
    "Merge 1-2, merge 3-4, merge 2-3. One group of four. 5 is still alone. Answer 2 groups.",
    [
      "Number of friend circles / provinces.",
      "Merge email accounts that share an address.",
      "Which extra friendship would close a loop?",
    ],
  ),

  bipartite: problem(
    "People and “these two dislike each other” pairs. You must seat them in two rooms.",
    "Can you assign rooms so every dislike pair sits apart? If someone would sit with a dislike, fail.",
    "1-2, 2-3, 3-1. Triangle of dislikes — impossible. 1-2, 2-3. Rooms {1,3} and {2} work.",
    [
      "Split into two teams. No friends on the same team (or no enemies).",
      "The graph has several clumps. Check every clump.",
      "Equals may sit together. Only dislike edges matter.",
    ],
  ),

  "connected-components": problem(
    "An undirected friendship map (or a 0/1 matrix of “knows”).",
    "How many separate circles exist? Isolated people count as their own circle.",
    "1-2, 3-4, 5 alone. Three circles.",
    [
      "Number of provinces in an n×n “connected” matrix.",
      "Label each person with a circle id, then answer “same circle?” queries.",
      "Edges arrive over time. How many circles after each edge?",
    ],
  ),

  islands: problem(
    "A grid of land and water. Land touches land up/down/left/right.",
    "How many islands? An island is one blob of connected land.",
    "Two land cells sharing a side → 1 island. Two lands on a diagonal only → 2 islands.",
    [
      "Count islands.",
      "Area of the largest island.",
      "Flip land that does not touch the border (surrounded regions).",
    ],
  ),

  "floyd-warshall": problem(
    "A small map (dozens of cities). You need a fare between every pair, not one trip.",
    "Cheapest i→j for all i,j. A hop through another city can beat a direct flight.",
    "A-B=3, B-C=1, A-C=10. After allowing B as a stop, A to C is 4.",
    [
      "For each city, how many others are within a distance threshold?",
      "Can every city reach every other (ignore weights, only yes/no)?",
      "A city with a negative loop back to itself — report it.",
    ],
  ),

  "zero-one-bfs": problem(
    "A grid. Stepping on an empty cell is free. Breaking a wall costs 1. No other costs.",
    "Minimum walls you must break to reach the far corner.",
    "A 3×3 with one wall on the shortest empty walk. Break that one wall, or walk around for 0 if a free path exists.",
    [
      "Min obstacle removals to reach the corner.",
      "Moving forward is free; turning costs 1. Min turns.",
      "Empty is 1 and wall is 0 — same question, flipped labels.",
    ],
  ),

  "bridges-articulation": problem(
    "A two-way network of cables. Some cables are the only way between two sides.",
    "List every cable whose removal splits the network. Also: every building whose removal splits it.",
    "1-2, 2-3, 1-3, 3-4. Cable 3-4 is critical. Building 3 is critical. 1-2 is not.",
    [
      "Critical connections in a network.",
      "Which routers take the intranet down if they fail?",
      "A double cable between the same pair — is it critical?",
    ],
  ),

  "scc-kosaraju": problem(
    "One-way streets. Two intersections are in the same cluster if you can drive A→B and B→A.",
    "List the clusters. After you reverse every street, walking from late-finishing corners finds them.",
    "A↔B, A→C. Clusters {A,B} and {C}. C cannot return to A.",
    [
      "Compress each cluster to one node. What arrows remain?",
      "A variable and its opposite in the same cluster — the formula is impossible.",
      "How many clusters?",
    ],
  ),

  "scc-tarjan": problem(
    "Same one-way map and the same “can we reach each other” clusters.",
    "Find the clusters in one walk: a corner that cannot reach any ancestor starts a new cluster.",
    "A→B→A, B→C. Pop C first as its own cluster, then {A,B}.",
    [
      "Same clusters as the two-pass reverse-street version.",
      "2-SAT: unsat if x and not-x share a cluster.",
      "Clusters should come out in reverse build order.",
    ],
  ),

  "euler-path": problem(
    "Tickets (or roads) you must use. Each ticket is one flight from city A to city B.",
    "A walk that uses every ticket exactly once. Not “visit every city once” — leftover tickets fail.",
    "Tickets JFK→ATL, ATL→JFK, JFK→SFO. Walk JFK, ATL, JFK, SFO uses all three.",
    [
      "Reconstruct the itinerary. Prefer the alphabetically earliest next city.",
      "Pairs (a,b) must be chained: the next pair starts where the last ended.",
      "Two leftover unused tickets — the walk was not complete.",
    ],
  ),

  "a-star": problem(
    "A huge warehouse grid. You know a safe under-estimate of “how far is left” (no walls, straight-line hops).",
    "A cheapest path to the goal. Prefer cells that look close so you do not light up the whole floor.",
    "Start (0,0), goal (2,2), no walls. Straight-line leftover 4, then 3, … First time you stand on the goal is best.",
    [
      "Pathfind on a grid with obstacles. Remaining hops if the floor were empty is the hint.",
      "8-puzzle: tiles’ Manhattan distance to home as the leftover guess.",
      "The guess must never oversell. What if it does?",
    ],
  ),

  "recursion-memo": problem(
    "A question that asks the same leftover (index, budget, …) many times down the tree.",
    "Answer the leftover once, remember it, reuse it. Then say how many distinct leftovers you stored.",
    "Ways to climb 4 stairs with 1 or 2. “Ways for 2” is asked from both 3 and 4. Store it: 5 ways for 4.",
    [
      "Write the raw tree first, then cache on the leftover tuple.",
      "What belongs in the cache key? What happens if you drop a field?",
      "n is 10^5 and the tree is a chain — the call stack is the risk.",
    ],
  ),

  subsets: problem(
    "A list of items. For each item you may pack it or leave it.",
    "Every possible packing, including the empty bag. If values repeat, each unique packing once.",
    "[1, 2] → [], [1], [2], [1,2]. [1,1] unique → [], [1], [1,1].",
    [
      "All subsets.",
      "Unique subsets when the input has duplicates.",
      "Only count packings whose numbers add to k. Do not list them.",
    ],
  ),

  permutations: problem(
    "A list of items. You must use each item once, and order matters.",
    "Every possible lineup. If twins exist, each unique lineup once.",
    "[1, 2, 3] includes [2,1,3]. [1,1,2] unique does not list [1,1,2] twice.",
    [
      "All lineups.",
      "Unique lineups with duplicates.",
      "Only the next lineup in dictionary order — do not list n! of them.",
    ],
  ),

  combinations: problem(
    "n candidates and a size k. Order does not matter. {1,2} is the same as {2,1}.",
    "Every k-pack. Follow-up: numbers may be reused, or each used once, toward a target sum.",
    "n=4, k=2 → {1,2},{1,3},{1,4},{2,3},{2,4},{3,4}. Not {2,1}.",
    [
      "All ways to choose k of n.",
      "Pack numbers that add to a target. Unlimited copies of each.",
      "Same target, each number once, input has duplicates.",
    ],
  ),

  "n-queens": problem(
    "An n×n board. Place n queens so none share a row, column, or diagonal.",
    "Every safe board (or just how many). One queen per row is fine to assume.",
    "n=4 has 2 solutions. n=1 has 1. n=2 and n=3 have 0.",
    [
      "Return the boards as rows of Q and .",
      "Only the count, no strings.",
      "n=4 by hand, then match your program.",
    ],
  ),

  "sudoku-solver": problem(
    "A 9×9 grid, some cells filled. A digit 1–9 may appear once per row, column, and 3×3 box.",
    "Fill every empty cell legally. The puzzle has one solution.",
    "A box already has 1–8. The last hole in that box must be 9 if the row and column allow it.",
    [
      "Solve the board in place.",
      "Only validate — do not fill.",
      "Pick the hole with the fewest legal digits first if they ask for speed.",
    ],
  ),

  "word-search": problem(
    "A letter grid and a word. You walk up/down/left/right. A cell may be used once on the path.",
    "Does the word appear as a path? Yes or no.",
    "Grid AB / CD. Word ABD: A–B–D, yes. Word ABC: C sits diagonal from B, so no.",
    [
      "Does this one word sit on the board?",
      "A whole dictionary of words. Find all that sit on the board.",
      "You may not reuse a cell. Mark and unmark as you walk.",
    ],
  ),

  "generate-parentheses": problem(
    "You have n pairs of parentheses. A prefix must never have more closers than openers.",
    "Every valid string of length 2n. Do not build invalids and filter.",
    "n=2 → ()(), (()). Not )((), not (().",
    [
      "List them.",
      "Only the count (Catalan). Do not list.",
      "Two bracket types, still never close what is not open.",
    ],
  ),

  "divide-and-conquer": problem(
    "A problem that splits into two independent halves whose answers stitch cheaply.",
    "Solve the halves, combine. Quote the time from the split and the stitch, not from a guess.",
    "Count out-of-order pairs in [3,1,4,2]. Left [3,1] has 1, right [4,2] has 1, merge adds 3>2 and 1 stays. Total 3.",
    [
      "Count inversions while you sort by halves.",
      "Majority element by asking each half, then scanning.",
      "The stitch is as hard as the original — then this split did not help.",
    ],
  ),

  "closest-pair": problem(
    "Points on a plane. Checking every pair is too slow.",
    "The two closest points and their distance. After both halves, only a thin strip around the middle line can still beat the record.",
    "Points (0,0), (3,4), (1,1). Closest is (0,0)-(1,1), distance √2, not (0,0)-(3,4).",
    [
      "Return both the pair and the distance.",
      "1-D version: sort and check neighbors only.",
      "Two points sit on top of each other. Distance 0.",
    ],
  ),

  "fibonacci-dp": problem(
    "A count that depends on the last two answers: ways, rabbits, tiles.",
    "The nth value. Do not recompute the same leftover from scratch.",
    "Ways: 1,1,2,3,5. F(5)=5. Climbing 3 stairs with 1-or-2 is 3 ways: 1+1+1, 1+2, 2+1.",
    [
      "nth Fibonacci.",
      "Ways to tile a 2×n board with 1×2 tiles.",
      "n is huge; they want it modulo 10^9+7.",
    ],
  ),

  "climbing-stairs": problem(
    "A staircase of n steps. You may take 1 or 2 at a time. Order matters.",
    "How many ways to stand on step n?",
    "n=4 → 5 ways. 2+2, 2+1+1, 1+2+1, 1+1+2, 1+1+1+1.",
    [
      "Ways for n steps.",
      "Each step has a cost. Min cost to reach the top.",
      "You may jump 1..k. Some rungs are broken.",
    ],
  ),

  "house-robber": problem(
    "Houses in a line, each with a stash. Adjacent houses share an alarm.",
    "Maximum stash if you never rob two neighbors.",
    "[2, 7, 9, 3, 1] → 2+9+1 = 12, or 7+3 = 10. Best 12.",
    [
      "Houses in a line.",
      "Houses in a circle — first and last are neighbors.",
      "Houses in a binary tree — parent and child are neighbors.",
    ],
  ),

  "decode-ways": problem(
    "A digit string. Letters are 1=A … 26=Z. A lone 0 is illegal. 10 and 20 are fine; 06 is not.",
    "How many ways to read the whole string as letters?",
    "\"12\" → AB or L, 2 ways. \"10\" → J, 1 way. \"06\" → 0 ways. \"27\" → BG only, not a 27th letter.",
    [
      "Number of readings.",
      "Walk 10, 12, 27, 06, 0 before you code.",
      "* can stand for several digits. How many readings then?",
    ],
  ),

  "knapsack-01": problem(
    "Items with a weight and a value. A bag with a weight cap. Each item at most once. You may not snap an item in half.",
    "Best total value that still fits.",
    "Weights [1,2,3], values [6,10,12], cap 5 → items 2 and 3 = 22. All three weigh 6.",
    [
      "Max value under the cap, each item once.",
      "Can this list split into two groups with the same sum?",
      "You may not break an item. What if you could?",
    ],
  ),

  "unbounded-knapsack": problem(
    "Item types with weight and value. The bag still has a cap, but you may take as many copies of a type as you want.",
    "Best value that fits. Two coins 1+2 count as the same packing as 2+1 unless they ask about order.",
    "Cap 5, types (w=2,v=3) and (w=3,v=4). Two of the first = 6. One of each = 7. Best 7.",
    [
      "Rod of length n. Price for each cut length. Max money, cuts unlimited.",
      "Do they want combinations or lineups (order matters)?",
      "At most k copies of a type — not unlimited.",
    ],
  ),

  "coin-change": problem(
    "Coin values and a target amount. Unlimited coins of each value.",
    "Fewest coins that add to the amount, or −1 if impossible. Greedy largest-first can fail.",
    "Coins {1,3,4}, amount 6. Three 1s and a 3 is 4 coins; two 3s is 2. Not two 4s. Answer 2.",
    [
      "Fewest coins.",
      "Number of combinations (1+2 same as 2+1).",
      "Why largest-first fails on {1,3,4} and 6.",
    ],
  ),

  lis: problem(
    "A sequence. You may drop numbers but you must keep the leftover in the same order. They need not sit next to each other.",
    "Length of the longest leftover that strictly rises.",
    "[10, 9, 2, 5, 3, 7, 101, 18] → 2,5,7,101 (or 2,3,7,18). Length 4.",
    [
      "Length only.",
      "Print one such leftover.",
      "Envelopes (w,h): nest as many as you can after you sort.",
    ],
  ),

  lcs: problem(
    "Two strings. A common leftover keeps order in both, but letters need not be neighbors.",
    "Length of the longest shared leftover. Contiguous is a different question.",
    "ace vs abcde → ace, length 3. abc vs def → 0.",
    [
      "Length, then reconstruct one shared leftover.",
      "Min deletes so both strings match (related count).",
      "Shortest string that contains both as leftovers.",
    ],
  ),

  "edit-distance": problem(
    "Two words. You may insert a letter, delete a letter, or replace a letter. Each action costs 1.",
    "Fewest actions to turn word A into word B.",
    "horse → ros. Replace h→r, delete o, delete e? One standard answer is 3 (horse → rorse → rose → ros).",
    [
      "Min inserts, deletes, replaces.",
      "Recover one alignment, not only the number.",
      "Only delete and insert — no replace.",
    ],
  ),

  "palindrome-dp": problem(
    "A string. A palindrome reads the same forward and back.",
    "Longest palindrome that is a contiguous slice — or, if they say so, a leftover that may skip letters. Or min cuts so every piece is a palindrome.",
    "babad → bab or aba, length 3. cbbd → bb. subsequence on bbbab → bbbb.",
    [
      "Longest palindromic slice.",
      "Longest palindromic leftover (skips allowed).",
      "Min cuts so every piece is a palindrome.",
    ],
  ),

  "matrix-chain": problem(
    "A chain of matrices. (AB)C and A(BC) give the same product but different multiply counts.",
    "Minimum multiply cost. You choose where the last multiply sits.",
    "10×30, 30×5, 5×60. (AB)C costs 10·30·5 + 10·5·60 = 4500. A(BC) costs 30·5·60 + 10·30·60 = 27000. Best 4500.",
    [
      "Min cost to parenthesize the chain.",
      "Print one best parenthesization.",
      "Three matrices by hand, then code.",
    ],
  ),

  "burst-balloons": problem(
    "Balloons in a row, each with a number. Burst one: you score left × this × right (missing ends count as 1).",
    "Maximum score if you burst them all. Think of the last balloon you burst between two walls, not the first.",
    "[3, 1, 5, 8]. One optimal order scores 167.",
    [
      "Max coins.",
      "Pad both ends with 1. Do not special-case the edges.",
      "Min cost to cut a stick at given points — same last-cut idea.",
    ],
  ),

  "grid-dp": problem(
    "A grid. You may only step right or down (or only down a falling column). Cells have costs or obstacles.",
    "Number of paths, or the cheapest path sum, to the far corner.",
    "3×2 empty grid, only right/down. 3 paths. Min-sum grid [[1,3],[1,5]] → 1+1+5 = 7 or 1+3+5 = 9. Best 7.",
    [
      "Unique paths. Obstacles block a cell.",
      "Minimum path sum, right and down only.",
      "Two walkers pick cherries. They cannot double-count a cell.",
    ],
  ),

  "interval-dp": problem(
    "A segment (subarray, substring, stick). The last action splits it at some k. Smaller segments are already scored.",
    "Best score of the whole segment. Fill short segments before long ones.",
    "Cut a stick of length 7 at 1 and 3 and 5. Cost of a cut is the current piece length. Min total depends on cut order.",
    [
      "Min cost to cut a stick.",
      "Stone piles in a row: last merge of two adjacent heaps.",
      "Palindrome cuts and balloon bursts are this shape.",
    ],
  ),

  "bitmask-dp": problem(
    "n ≤ 20 people, cities, or tasks. A subset fits in an integer of n bits.",
    "Best way to handle every subset: assign jobs, or a tour that visits each city once and returns.",
    "3 cities, start 0. Distances make 0-1-2-0 cheaper than 0-2-1-0. Try both tours; n=3 is 2 leftover orders.",
    [
      "Cheapest assignment of n jobs to n workers.",
      "Shortest walk that visits every node at least once (small graph).",
      "n=40 — this subset table will not fit. Split the people in half.",
    ],
  ),

  "tree-dp": problem(
    "Houses (or cameras, or distances) sit on a tree. A node’s answer comes from its children’s answers. No cycles.",
    "Best score at the root — or the score if every node were the root.",
    "Tree 3 with children 2 and 3. Rob-the-root vs skip-root-and-rob-children. Take the better pair.",
    [
      "Max stash on a tree; parent and child cannot both be robbed.",
      "Min cameras so every node is watched.",
      "Sum of distances from every node to all others, without n walks.",
    ],
  ),

  "digit-dp": problem(
    "A range [L, R] too big to scan. You care about a digit rule: digit sum, unique digits, allowed digits.",
    "How many integers in the range obey the rule. Count up to R, subtract count up to L−1.",
    "How many numbers ≤ 25 have digits that add to 4? 4, 13, 22. Answer 3.",
    [
      "Count numbers in [L, R] whose digits sum to k.",
      "How many numbers ≤ N use only digits from a given set?",
      "Leading zeros do not count as used digits.",
    ],
  ),

  "interval-scheduling": problem(
    "Meetings, each with a start and an end. One room. Touching ends usually do not clash.",
    "The largest set of meetings that do not overlap.",
    "[(1,4),(2,3),(3,5)] → (2,3) and (3,5). Taking (1,4) blocks both shorts.",
    [
      "Maximum number of non-overlapping meetings.",
      "Min meetings to drop so the rest do not overlap.",
      "Each meeting has a value. Max value, not count.",
    ],
  ),

  "jump-game": problem(
    "From index i you may hop at most A[i] steps forward. A[i]=0 is a trap if you land there with no reach left.",
    "Can you reach the last index? Follow-up: fewest hops.",
    "[2,3,1,1,4] → yes. [3,2,1,0,4] → stuck on 0. Fewest hops on the first: 2 (0→1→4).",
    [
      "Reachable, yes or no.",
      "Minimum hops to the end.",
      "Video clips: cover [0, T] by extending the farthest clip that starts inside the lit range.",
    ],
  ),

  "gas-station": problem(
    "A circular track. Station i gives gas[i] and the drive to the next costs cost[i]. Tank cannot go negative.",
    "A start index that completes the lap, or −1. If total gas < total cost, impossible.",
    "gas [1,2,3,4,5], cost [3,4,5,1,2] → start at index 3. Tank never goes negative from there.",
    [
      "Return the unique start, or −1.",
      "Why a start inside a failed stretch cannot work.",
      "Total gas equals total cost. Is a start still guaranteed?",
    ],
  ),

  "fractional-knapsack": problem(
    "Items with value and weight. You may snap an item and take a fraction. Bag has a weight cap.",
    "Maximum value. Fill with the richest leftover (value per weight) first; the last item may be a slice.",
    "Cap 50. (60,10), (100,20), (120,30). Take the first two whole and 2/3 of the third → 240.",
    [
      "May I break an item? If yes, this. If no, the each-item-once bag.",
      "Sort by value/weight, not by value alone.",
      "Give a 0/1 counterexample where richest-first fails if you cannot snap.",
    ],
  ),

  "meeting-rooms": problem(
    "Meetings on a timeline. Back-to-back (end == next start) usually share a room.",
    "Can one person attend all? If not, how many rooms so nobody waits?",
    "[(0,30),(5,10),(15,20)] → 2 rooms. One person cannot attend all three.",
    [
      "True/false: one room is enough.",
      "Minimum rooms (or train platforms).",
      "Carpooling: the van has a seat cap; same sweep on pickups and dropoffs.",
    ],
  ),

  candy: problem(
    "Children in a line, each with a rating. A child with a strictly higher rating than a neighbor must get more candies. Everyone gets at least 1.",
    "Minimum total candies.",
    "Ratings [1,0,2] → 2,1,2. Total 5. [1,2,87,1] the peak needs more than both slopes.",
    [
      "Min candies.",
      "Equal ratings have no extra rule between them.",
      "One forward pass is not enough on a down-slope. Why?",
    ],
  ),

  "assign-cookies": problem(
    "Children with a greed factor. Cookies with sizes. A child is content if the cookie is at least their greed. One cookie per child.",
    "Maximum number of content children.",
    "Greed [1,2,3], sizes [1,1] → only one child (the 1). Sizes [1,2] → two children.",
    [
      "Max content children.",
      "Sort both, give the smallest cookie that works.",
      "Boats: two people per boat if their weights fit.",
    ],
  ),

  "greedy-mst": problem(
    "Towns and possible two-way cables with costs. You want every town reachable from every other, cheapest total cable.",
    "Why always taking a cheapest cable that links two still-separate clumps is safe — and the total that plan pays.",
    "Four towns, cheapest safe cables 1, 2, 2. Total 5. A fancy long cable of 10 is never needed.",
    [
      "Cheapest network that connects everyone.",
      "You have an edge list vs a dense cost matrix. Which plan do you run?",
      "A one-way road map — this “cheap safe cable” plan does not apply.",
    ],
  ),
};
