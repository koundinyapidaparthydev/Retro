import { problem, type ProblemCard } from "./types";

export const PACK: Record<string, ProblemCard> = {
  "nc-valid-sudoku": problem(
    "A 9×9 board of digits and '.' empty cells.",
    "Is the board a valid Sudoku so far — no repeats in any row, column, or 3×3 box?",
    "Two 5s in one row → false. A legal partial fill → true.",
    [
      "Validate the board (do not solve).",
      "How do you index the 3×3 boxes?",
      "What about empty cells?",
    ],
  ),
  "nc-two-sum-ii-input-array-is-sorted": problem(
    "A 1-indexed array sorted non-decreasing, and a target.",
    "Two 1-based indices whose values add to the target. Prefer O(1) extra space.",
    "[2,7,11,15], target 9 → [1,2].",
    [
      "Two Sum on a sorted array.",
      "May I use two pointers?",
      "Indices 1-based?",
    ],
  ),
  "nc-trapping-rain-water": problem(
    "Elevation map height[i] — bars of width 1.",
    "How many units of water sit after it rains?",
    "[0,1,0,2,1,0,1,3,2,1,2,1] → 6.",
    [
      "Trap rain water between bars.",
      "Two pointers or prefix max?",
      "Strictly decreasing skyline?",
    ],
  ),
  "nc-permutation-in-string": problem(
    "Two strings s1 and s2.",
    "Does s2 contain a contiguous permutation of s1?",
    "s1=ab, s2=eidbaooo → true (ba). s2=eidboaoo → false.",
    [
      "Permutation as a substring?",
      "Fixed window of length |s1|?",
      "Only lowercase?",
    ],
  ),
  "nc-sliding-window-maximum": problem(
    "Integer array nums and window length k.",
    "The maximum value in every contiguous window of length k.",
    "nums=[1,3,-1,-3,5,3,6,7], k=3 → [3,3,5,5,6,7].",
    [
      "Sliding window maximum.",
      "Can you do O(n)?",
      "What if k=1?",
    ],
  ),
  "nc-min-stack": problem(
    "Implement a stack ADT.",
    "push, pop, top, and getMin all in O(1).",
    "push 3, push 5, push 2 → getMin() is 2; pop → getMin() is 3.",
    [
      "Min stack in O(1).",
      "How do you handle duplicate minima?",
      "May I store pairs?",
    ],
  ),
  "nc-evaluate-reverse-polish-notation": problem(
    "String tokens of an RPN expression (ints and + - * /).",
    "The integer value of the expression. Division truncates toward zero.",
    "[\"2\",\"1\",\"+\",\"3\",\"*\"] → 9.",
    [
      "Evaluate reverse Polish notation.",
      "Order of operands for minus?",
      "Truncation of division?",
    ],
  ),
  "nc-generate-parentheses": problem(
    "Integer n — number of pairs of parentheses.",
    "Every valid string with exactly n '(' and n ')'.",
    "n=3 → [\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"].",
    [
      "Generate all valid parentheses.",
      "When may I place a closer?",
      "How many are there?",
    ],
  ),
  "nc-daily-temperatures": problem(
    "Array temperatures[i] for each day.",
    "For each day, days until a strictly warmer day (0 if none).",
    "[73,74,75,71,69,72,76,73] → [1,1,4,2,1,1,0,0].",
    [
      "Days until warmer.",
      "Monotonic stack?",
      "What if temperatures are equal?",
    ],
  ),
  "nc-car-fleet": problem(
    "target miles away; position[] and speed[] for n cars on one lane.",
    "How many fleets arrive at target?",
    "target=12, pos=[10,8,0,5,3], speed=[2,4,1,1,3] → 3.",
    [
      "Count car fleets.",
      "Sort by position?",
      "When does a car catch another?",
    ],
  ),
  "nc-largest-rectangle-in-histogram": problem(
    "Array heights of histogram bars (width 1 each).",
    "Largest rectangular area inside the histogram.",
    "[2,1,5,6,2,3] → 10 (the 5×2 block).",
    [
      "Largest rectangle in histogram.",
      "Monotonic stack?",
      "What is the width when you pop?",
    ],
  ),
  "nc-binary-search": problem(
    "Sorted ascending array of distinct integers, and a target.",
    "Index of target, or -1.",
    "nums=[-1,0,3,5,9,12], target=9 → 4.",
    [
      "Binary search for target.",
      "How do you pick mid?",
      "Missing target?",
    ],
  ),
  "nc-search-a-2d-matrix": problem(
    "m×n matrix, rows sorted; each row starts after previous row ends. Target integer.",
    "Whether target appears. Aim for O(log(mn)).",
    "[[1,3,5,7],[10,11,16,20],[23,30,34,60]], target=3 → true.",
    [
      "Search sorted matrix.",
      "Map mid to row/col?",
      "Differs from LC 240 how?",
    ],
  ),
  "nc-koko-eating-bananas": problem(
    "piles of bananas and hour limit h.",
    "Minimum integer eating speed k to finish by hour h.",
    "piles=[3,6,7,11], h=8 → 4.",
    [
      "Min speed to finish in h hours.",
      "Binary search on k?",
      "How do you compute hours for a speed?",
    ],
  ),
  "nc-time-based-key-value-store": problem(
    "set(key,value,timestamp) and get(key,timestamp) API. Sets for a key come in increasing time.",
    "get returns value at the largest time ≤ timestamp, else \"\".",
    "set(\"foo\",\"bar\",1); get(\"foo\",1)→\"bar\"; get(\"foo\",3)→\"bar\"; set(\"foo\",\"bar2\",4); get(\"foo\",4)→\"bar2\".",
    [
      "Time-based KV store.",
      "Binary search on timestamps?",
      "What if get time is before any set?",
    ],
  ),
  "nc-median-of-two-sorted-arrays": problem(
    "Two sorted arrays nums1 and nums2 (may differ in length).",
    "Median of the merged sorted order in O(log(m+n)).",
    "[1,3] and [2] → 2.0. [1,2] and [3,4] → 2.5.",
    [
      "Median of two sorted arrays.",
      "Without merging?",
      "Odd vs even length?",
    ],
  ),
  "nc-copy-list-with-random-pointer": problem(
    "Linked list nodes with next and random pointers.",
    "A deep copy with the same next/random shape.",
    "Node 1→2→3 with 1.random=3, 2.random=1 → clone mirrors those links.",
    [
      "Copy list with random pointer.",
      "HashMap old→new?",
      "O(1) space follow-up?",
    ],
  ),
  "nc-add-two-numbers": problem(
    "Two linked lists of digits in reverse order.",
    "A list representing their sum, also reverse order.",
    "(2→4→3) + (5→6→4) = 7→0→8  (342+465=807).",
    [
      "Add two numbers as lists.",
      "What about a leftover carry?",
      "Different lengths?",
    ],
  ),
  "nc-find-the-duplicate-number": problem(
    "nums has n+1 integers in [1,n]; one value duplicated.",
    "The duplicate. O(1) space, do not mutate nums.",
    "[1,3,4,2,2] → 2.",
    [
      "Find the duplicate.",
      "Floyd cycle?",
      "May I use a set?",
    ],
  ),
  "nc-lru-cache": problem(
    "Capacity and a stream of get/put on keys.",
    "O(1) get/put with LRU eviction when full.",
    "cap=2; put(1,1), put(2,2), get(1)→1, put(3,3) evicts key 2.",
    [
      "Design LRU cache.",
      "HashMap + DLL?",
      "What is evicted?",
    ],
  ),
  "nc-reverse-nodes-in-k-group": problem(
    "Singly linked list and integer k.",
    "List with every full group of k nodes reversed; leftover short group unchanged.",
    "1→2→3→4→5, k=2 → 2→1→4→3→5. k=3 → 3→2→1→4→5.",
    [
      "Reverse nodes in k-group.",
      "What about the leftover?",
      "O(1) space?",
    ],
  ),
  "nc-diameter-of-binary-tree": problem(
    "A binary tree.",
    "Diameter — number of edges on the longest node-to-node path.",
    "Tree [1,2,3,4,5] → 3 (4-2-1-3 or 5-2-1-3).",
    [
      "Diameter of the tree.",
      "Must it pass through the root?",
      "Edges or nodes?",
    ],
  ),
  "nc-balanced-binary-tree": problem(
    "A binary tree.",
    "True iff every node has subtree heights differing by at most 1.",
    "[3,9,20,null,null,15,7] → true. [1,2,2,3,3,null,null,4,4] → false.",
    [
      "Is the tree balanced?",
      "One DFS or many heights?",
      "What do you return for null?",
    ],
  ),
  "nc-binary-tree-right-side-view": problem(
    "A binary tree.",
    "Values visible from the right side, top to bottom.",
    "[1,2,3,null,5,null,4] → [1,3,4].",
    [
      "Right side view.",
      "BFS or DFS?",
      "What if a level has only a left child?",
    ],
  ),
  "nc-count-good-nodes-in-binary-tree": problem(
    "A binary tree of integers.",
    "How many nodes are ≥ every ancestor on the path from the root?",
    "[3,1,4,3,null,1,5] → 4 (3,3,4,5).",
    [
      "Count good nodes.",
      "What is the path max?",
      "Is equal allowed?",
    ],
  ),
  "nc-k-closest-points-to-origin": problem(
    "Array of [x,y] points and integer k.",
    "The k points closest to the origin.",
    "points=[[1,3],[-2,2]], k=1 → [[-2,2]].",
    [
      "K closest to origin.",
      "Max-heap of size k?",
      "Squared distance?",
    ],
  ),
  "nc-last-stone-weight": problem(
    "Array of stone weights.",
    "Weight of the last stone after smashing heaviest pairs (0 if none).",
    "[2,7,4,1,8,1] → 1.",
    [
      "Last stone weight.",
      "Max-heap?",
      "Equal stones?",
    ],
  ),
  "nc-kth-largest-element-in-a-stream": problem(
    "k and an initial integer stream; then many add(val) calls.",
    "After each add, the kth largest value in the stream.",
    "KthLargest(3,[4,5,8,2]); add(3)→4; add(5)→5; add(10)→5.",
    [
      "Kth largest in a stream.",
      "Why a min-heap of size k?",
      "What does peek return?",
    ],
  ),
  "nc-kth-largest-element-in-an-array": problem(
    "Unsorted integer array and k.",
    "The kth largest element (duplicates count separately).",
    "[3,2,1,5,6,4], k=2 → 5.",
    [
      "Kth largest in an array.",
      "Heap or quickselect?",
      "kth distinct or not?",
    ],
  ),
  "nc-task-scheduler": problem(
    "Tasks as chars and cooldown n between two equal tasks.",
    "Minimum intervals (including idles) to finish all tasks.",
    "tasks=[A,A,A,B,B,B], n=2 → 8 (A B idle A B idle A B).",
    [
      "Task scheduler with cooldown.",
      "Formula or heap?",
      "Why max with tasks.length?",
    ],
  ),
  "nc-design-twitter": problem(
    "Users who post tweets and follow each other.",
    "Implement post, follow/unfollow, and 10-tweet news feed (newest first).",
    "user1 posts 5; user2 follows user1 → feed shows 5.",
    [
      "Design Twitter.",
      "How do you merge feeds?",
      "Include my own tweets?",
    ],
  ),
  "nc-subsets": problem(
    "Array of distinct integers.",
    "All possible subsets (power set).",
    "[1,2,3] → [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]].",
    [
      "Generate all subsets.",
      "Include/exclude?",
      "Empty subset?",
    ],
  ),
  "nc-permutations": problem(
    "Array of distinct integers.",
    "Every permutation of the array.",
    "[1,2,3] → all 6 orderings.",
    [
      "Generate permutations.",
      "used[] or swaps?",
      "n! growth?",
    ],
  ),
  "nc-subsets-ii": problem(
    "Integer array that may contain duplicates.",
    "All unique subsets.",
    "[1,2,2] → [[],[1],[1,2],[1,2,2],[2],[2,2]].",
    [
      "Subsets with duplicates.",
      "Where do you skip?",
      "Why sort?",
    ],
  ),
  "nc-combination-sum-ii": problem(
    "Candidates with possible duplicates, and a target. Each index used at most once.",
    "All unique combinations that sum to target.",
    "candidates=[10,1,2,7,6,1,5], target=8 → [[1,1,6],[1,2,5],[1,7],[2,6]].",
    [
      "Combination sum, no reuse.",
      "How do you dedupe?",
      "Pruning?",
    ],
  ),
  "nc-palindrome-partitioning": problem(
    "A string s.",
    "Every way to split s into palindromic contiguous pieces.",
    "s=\"aab\" → [[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]].",
    [
      "Palindrome partitions.",
      "How do you check a piece?",
      "Where do you cut?",
    ],
  ),
  "nc-letter-combinations-of-a-phone-number": problem(
    "A string of digits from 2–9.",
    "All keypad letter combinations those digits can make.",
    "digits=\"23\" → [\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"].",
    [
      "Phone letter combinations.",
      "Empty digits?",
      "Backtracking skeleton?",
    ],
  ),
  "nc-n-queens": problem(
    "Integer n.",
    "All ways to place n queens with no attacks; boards as string lists.",
    "n=4 → two solutions, including [\".Q..\",\"...Q\",\"Q...\",\"..Q.\"].",
    [
      "N-Queens.",
      "How do you track diagonals?",
      "One queen per row?",
    ],
  ),
  "nc-max-area-of-island": problem(
    "m×n grid of 0s and 1s.",
    "Area of the largest island (4-connected), or 0.",
    "A ring of land around water — compute the connected 1s max.",
    [
      "Max island area.",
      "DFS or BFS?",
      "May I mutate the grid?",
    ],
  ),
  "nc-walls-and-gates": problem(
    "Grid with walls (-1), gates (0), and empty rooms (INF).",
    "Fill each empty room with distance to the nearest gate (in place).",
    "Gates at corners fill rooms with increasing Manhattan steps around walls.",
    [
      "Walls and gates.",
      "Why multi-source BFS?",
      "What about unreachable rooms?",
    ],
  ),
  "nc-rotting-oranges": problem(
    "Grid of empty, fresh, and rotten oranges.",
    "Minutes until all fresh rot, or -1 if impossible.",
    "[[2,1,1],[1,1,0],[0,1,1]] → 4.",
    [
      "Rotting oranges minutes.",
      "Multi-source BFS?",
      "No fresh oranges?",
    ],
  ),
  "nc-surrounded-regions": problem(
    "2D board of 'X' and 'O'.",
    "Flip surrounded 'O' regions to 'X' (border-connected 'O's stay).",
    "Interior OOO ringed by X becomes XXX; edge O stays.",
    [
      "Surrounded regions.",
      "Why start at the border?",
      "How do you mark safe O's?",
    ],
  ),
  "nc-course-schedule-ii": problem(
    "numCourses and prereq pairs [course, needFirst].",
    "One valid order to finish all courses, or [] if impossible.",
    "n=4, [[1,0],[2,0],[3,1],[3,2]] → [0,2,1,3] (or [0,1,2,3]).",
    [
      "Course order.",
      "Kahn's algorithm?",
      "What if there is a cycle?",
    ],
  ),
  "nc-redundant-connection": problem(
    "List of undirected edges on n nodes forming a tree plus one extra edge.",
    "The redundant edge that can be removed to make a tree (last that forms a cycle in input order).",
    "[[1,2],[1,3],[2,3]] → [2,3].",
    [
      "Redundant connection.",
      "Union-Find?",
      "Why process in order?",
    ],
  ),
  "nc-word-ladder": problem(
    "beginWord, endWord, and a dictionary of words of equal length.",
    "Length of shortest one-letter-at-a-time transform sequence, or 0.",
    "begin=hit, end=cog, list=[hot,dot,dog,lot,log,cog] → 5.",
    [
      "Word ladder length.",
      "Why BFS?",
      "How do you generate neighbors?",
    ],
  ),
  "nc-reconstruct-itinerary": problem(
    "List of [from,to] tickets; start at JFK.",
    "The lexical-smallest itinerary that uses every ticket exactly once.",
    "[[\"MUC\",\"LHR\"],[\"JFK\",\"MUC\"],[\"SFO\",\"SJC\"],[\"LHR\",\"SFO\"]] → JFK,MUC,LHR,SFO,SJC.",
    [
      "Reconstruct itinerary.",
      "Eulerian path?",
      "Why PriorityQueue?",
    ],
  ),
  "nc-min-cost-to-connect-all-points": problem(
    "Array of [x,y] points.",
    "Minimum Manhattan cost to connect all points (MST).",
    "[[0,0],[2,2],[3,10],[5,2],[7,0]] → 20.",
    [
      "Min cost connect all points.",
      "Prim or Kruskal?",
      "Manhattan distance?",
    ],
  ),
  "nc-network-delay-time": problem(
    "n nodes, directed edges with travel times, start node k.",
    "Time for all nodes to receive the signal, or -1.",
    "n=4, times=[[2,1,1],[2,3,1],[3,4,1]], k=2 → 2.",
    [
      "Network delay time.",
      "Dijkstra?",
      "What if a node is unreachable?",
    ],
  ),
  "nc-swim-in-rising-water": problem(
    "n×n grid of distinct heights; you can step on cells ≤ t at time t.",
    "Minimum t to swim from top-left to bottom-right.",
    "[[0,2],[1,3]] → 3.",
    [
      "Swim in rising water.",
      "Minimize the max height?",
      "Dijkstra or binary search?",
    ],
  ),
  "nc-cheapest-flights-within-k-stops": problem(
    "Flights with prices, src, dst, and max stops k.",
    "Cheapest cost from src to dst with ≤ k stops, or -1.",
    "n=4, flights=[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src=0,dst=3,k=1 → 700.",
    [
      "Cheapest flights within k stops.",
      "Bellman-Ford rounds?",
      "Stops vs edges?",
    ],
  ),
  "nc-min-cost-climbing-stairs": problem(
    "cost[i] to step on stair i; moves of +1 or +2.",
    "Minimum cost to reach the top (past the last stair).",
    "[10,15,20] → 15. [1,100,1,1,1,100,1,1,100,1] → 6.",
    [
      "Min cost climbing stairs.",
      "Start on 0 or 1 free?",
      "O(1) space?",
    ],
  ),
  "nc-partition-equal-subset-sum": problem(
    "Array of positive integers.",
    "True iff it can be partitioned into two subsets with equal sum.",
    "[1,5,11,5] → true (11 vs 1+5+5). [1,2,3,5] → false.",
    [
      "Equal subset sum partition?",
      "Subset sum DP?",
      "Odd total?",
    ],
  ),
  "nc-best-time-to-buy-and-sell-stock-with-cooldown": problem(
    "Daily stock prices; after selling you must skip a day before buying.",
    "Maximum profit with as many transactions as you want under cooldown.",
    "[1,2,3,0,2] → 3.",
    [
      "Stock with cooldown.",
      "What are your DP states?",
      "Buy next day after sell?",
    ],
  ),
  "nc-coin-change-ii": problem(
    "Coin denominations and an amount.",
    "Number of combinations that sum to amount (order irrelevant).",
    "amount=5, coins=[1,2,5] → 4.",
    [
      "Coin change combinations.",
      "Why coins-outer loop?",
      "dp[0]?",
    ],
  ),
  "nc-target-sum": problem(
    "nums and a target. Put + or - before each number.",
    "How many expressions evaluate to target?",
    "nums=[1,1,1,1,1], target=3 → 5.",
    [
      "Target sum ways.",
      "Reduce to subset sum?",
      "Odd sum+target?",
    ],
  ),
  "nc-interleaving-string": problem(
    "Strings s1, s2, s3.",
    "Is s3 an interleaving of s1 and s2 (orders preserved)?",
    "s1=aabcc, s2=dbbca, s3=aadbbcbcac → true.",
    [
      "Interleaving string?",
      "DP state?",
      "Length condition?",
    ],
  ),
  "nc-longest-increasing-path-in-a-matrix": problem(
    "m×n integer matrix.",
    "Length of the longest 4-direction strictly increasing path.",
    "[[9,9,4],[6,6,8],[2,1,1]] → 4 (1→2→6→9).",
    [
      "Longest increasing path.",
      "Why DFS+memo?",
      "Are cycles possible?",
    ],
  ),
  "nc-distinct-subsequences": problem(
    "Strings s and t.",
    "Number of distinct subsequences of s that equal t.",
    "s=\"rabbbit\", t=\"rabbit\" → 3.",
    [
      "Distinct subsequences count.",
      "DP transition on match?",
      "Overflow?",
    ],
  ),
  "nc-edit-distance": problem(
    "Two words word1 and word2.",
    "Minimum insert/delete/replace ops to turn word1 into word2.",
    "\"horse\" → \"ros\" = 3.",
    [
      "Edit distance.",
      "Three transitions?",
      "Base row/column?",
    ],
  ),
  "nc-burst-balloons": problem(
    "Array nums of balloon values; bursting i scores product with current neighbors.",
    "Maximum coins from bursting every balloon (ends act as 1).",
    "[3,1,5,8] → 167.",
    [
      "Burst balloons max coins.",
      "Why last burst?",
      "Sentinel 1s?",
    ],
  ),
  "nc-partition-to-k-equal-sum-subsets": problem(
    "nums and integer k.",
    "True iff nums can be partitioned into k subsets with equal sum.",
    "nums=[4,3,2,3,5,2,1], k=4 → true.",
    [
      "Partition to k equal sums.",
      "Backtracking buckets?",
      "When is bitmask better?",
    ],
  ),
  "nc-jump-game-ii": problem(
    "nums[i] = max jump length from i; last index is reachable.",
    "Minimum jumps to reach the last index.",
    "[2,3,1,1,4] → 2.",
    [
      "Min jumps.",
      "Greedy farthest?",
      "Why stop at n-2?",
    ],
  ),
  "nc-gas-station": problem(
    "Circular gas[] and cost[] of the same length.",
    "Starting station index to complete the circuit, or -1.",
    "gas=[1,2,3,4,5], cost=[3,4,5,1,2] → 3.",
    [
      "Gas station circuit.",
      "Why reset start after tank < 0?",
      "Total gas check?",
    ],
  ),
  "nc-hand-of-straights": problem(
    "hand[] values and groupSize.",
    "True iff cards can form groups of groupSize consecutive values.",
    "hand=[1,2,3,6,2,3,4,7,8], groupSize=3 → true.",
    [
      "Hand of straights.",
      "Why start from smallest?",
      "TreeMap?",
    ],
  ),
  "nc-merge-triplets-to-form-target-triplet": problem(
    "List of triplets and a target triplet. Merge = component-wise max.",
    "True iff you can form the target by merges.",
    "triplets=[[2,5,3],[1,8,4],[1,7,5]], target=[2,7,5] → true.",
    [
      "Merge triplets to target.",
      "Which triplets can you keep?",
      "Do you need one triplet to match all?",
    ],
  ),
  "nc-partition-labels": problem(
    "A lowercase string s.",
    "Sizes of the parts in a max-parts partition where each letter appears in only one part.",
    "\"ababcbacadefegdehijhklij\" → [9,7,8].",
    [
      "Partition labels.",
      "Why track last index?",
      "When do you cut?",
    ],
  ),
  "nc-valid-parenthesis-string": problem(
    "String of '(', ')', and '*'.",
    "True iff some replacement of '*' yields valid parentheses.",
    "\"(*)\" → true. \"(*)\" → true. \"(*))\" → true.",
    [
      "Valid parenthesis string with *.",
      "What do lo and hi mean?",
      "End condition?",
    ],
  ),
  "nc-minimum-interval-to-include-each-query": problem(
    "Intervals [L,R] and an array of query points.",
    "For each query, length of the smallest interval covering it, or -1.",
    "intervals=[[1,4],[2,4],[3,6],[4,4]], queries=[2,3,4,5] → [3,3,1,4].",
    [
      "Min interval covering each query.",
      "Why sort queries?",
      "What is in the heap?",
    ],
  ),
  "nc-happy-number": problem(
    "A positive integer n.",
    "True iff repeatedly replacing with sum of squared digits reaches 1.",
    "19 → true (1+81=82 → … → 1). 2 → false.",
    [
      "Happy number?",
      "How do you detect the cycle?",
      "Floyd or HashSet?",
    ],
  ),
  "nc-plus-one": problem(
    "Array of digits representing a nonnegative integer (MSD first).",
    "The digit array after adding one.",
    "[1,2,3] → [1,2,4]. [9,9] → [1,0,0].",
    [
      "Plus one on digits.",
      "What about 999?",
      "May I use BigInteger?",
    ],
  ),
  "nc-powx-n": problem(
    "Double x and integer n (may be negative).",
    "x raised to n.",
    "x=2.0, n=10 → 1024.0. x=2.0, n=-2 → 0.25.",
    [
      "Pow(x,n).",
      "Binary exponentiation?",
      "n = -2^31?",
    ],
  ),
  "nc-multiply-strings": problem(
    "Two nonnegative integers as decimal strings.",
    "Their product as a string (no BigInteger).",
    "\"123\" * \"456\" → \"56088\".",
    [
      "Multiply strings.",
      "Where does digit i*j land?",
      "Leading zeros?",
    ],
  ),
  "nc-detect-squares": problem(
    "Stream of add([x,y]) points and count([x,y]) queries.",
    "On count, how many axis-aligned squares include the query point as a vertex (with multiplicities).",
    "add (1,1),(2,2),(1,2); count(2,1) → 1.",
    [
      "Detect squares.",
      "Which points are diagonals?",
      "How do multiplicities work?",
    ],
  ),
  "nc-single-number": problem(
    "Array where every value appears twice except one.",
    "The value that appears once. Prefer O(1) space.",
    "[4,1,2,1,2] → 4.",
    [
      "Single number.",
      "Why XOR?",
      "What if triples?",
    ],
  ),
  "nc-reverse-integer": problem(
    "A 32-bit signed integer x.",
    "x with digits reversed, or 0 on overflow.",
    "123 → 321. -123 → -321. 1534236469 → 0.",
    [
      "Reverse integer.",
      "How do you detect overflow?",
      "Negative numbers?",
    ],
  ),
};
