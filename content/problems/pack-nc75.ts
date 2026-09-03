import { problem, type ProblemCard } from "./types";

export const PACK: Record<string, ProblemCard> = {
  "nc-contains-duplicate": problem(
    "An array of integers.",
    "Return true if any value appears at least twice; otherwise false.",
    "[1, 2, 3, 1] → true. [1, 2, 3, 4] → false.",
    [
      "Does this array contain any duplicate?",
      "Can every number appear at most once?",
      "What if the array is empty or has one element?",
    ],
  ),
  "nc-valid-anagram": problem(
    "Two strings s and t.",
    "Return true if t is an anagram of s — same letters with the same counts.",
    '"anagram" and "nagaram" → true. "rat" and "car" → false.',
    [
      "Are these two strings anagrams of each other?",
      "What if lengths differ?",
      "Unicode letters — still the same idea?",
    ],
  ),
  "nc-two-sum": problem(
    "An array of integers and a target number.",
    "Return the indices of two different numbers that add up to the target. Exactly one such pair exists.",
    "[2, 7, 11, 15], target 9 → [0, 1] because 2 + 7 = 9.",
    [
      "Find two numbers that add to the target and return their indices.",
      "You may not use the same element twice.",
      "Can you do it in one pass?",
    ],
  ),
  "nc-group-anagrams": problem(
    "An array of strings.",
    "Group the strings so that anagrams sit together. Order of groups does not matter.",
    '["eat", "tea", "tan", "ate", "nat", "bat"] → [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]].',
    [
      "Group all anagrams together.",
      "What key uniquely identifies an anagram family?",
      "Empty strings and single-letter words?",
    ],
  ),
  "nc-top-k-frequent-elements": problem(
    "An integer array and an integer k.",
    "Return the k values that appear most often. Order among ties is free.",
    "[1, 1, 1, 2, 2, 3], k = 2 → [1, 2].",
    [
      "Return the k most frequent numbers.",
      "What if every value appears once?",
      "Better than sorting the whole frequency map?",
    ],
  ),
  "nc-product-of-array-except-self": problem(
    "An integer array nums.",
    "For each index i, return the product of every number except nums[i]. No division. Prefer O(n) time.",
    "[1, 2, 3, 4] → [24, 12, 8, 6].",
    [
      "Build an array where each slot is the product of all other elements.",
      "You may not use division.",
      "What if a zero appears once? Twice?",
    ],
  ),
  "nc-encode-and-decode-strings": problem(
    "A list of strings that may contain any characters, including delimiters.",
    "Encode the list into one string, then decode that string back into the original list exactly.",
    '["lint", "code", "love", "you"] encodes and decodes back to the same four strings.',
    [
      "Design encode and decode for a list of strings.",
      "How do you handle empty strings and strings that contain your delimiter?",
      "Round-trip must be lossless.",
    ],
  ),
  "nc-longest-consecutive-sequence": problem(
    "An unsorted array of integers.",
    "Return the length of the longest run of consecutive numbers. Numbers need not be adjacent in the array. Prefer O(n).",
    "[100, 4, 200, 1, 3, 2] → 4 because 1, 2, 3, 4.",
    [
      "Longest consecutive sequence length in unsorted numbers.",
      "Duplicates — do they extend the run?",
      "Can you avoid sorting?",
    ],
  ),
  "nc-valid-palindrome": problem(
    "A string that may contain letters, digits, spaces, and punctuation.",
    "After keeping only alphanumeric characters and ignoring case, is it a palindrome?",
    '"A man, a plan, a canal: Panama" → true. "race a car" → false.',
    [
      "Is this string a palindrome ignoring non-alphanumerics and case?",
      "Empty after cleanup — true or false?",
      "Two pointers from both ends?",
    ],
  ),
  "nc-3sum": problem(
    "An integer array.",
    "Return all unique triplets that sum to zero. Do not repeat the same three values in different order.",
    "[-1, 0, 1, 2, -1, -4] → [[-1, -1, 2], [-1, 0, 1]].",
    [
      "Find all unique triplets that sum to zero.",
      "How do you skip duplicate values?",
      "What if the array has fewer than three elements?",
    ],
  ),
  "nc-container-with-most-water": problem(
    "An array of non-negative heights — vertical lines at each index.",
    "Choose two lines that, with the x-axis, form a container holding the most water. Return that area.",
    "[1, 8, 6, 2, 5, 4, 8, 3, 7] → 49.",
    [
      "Maximum water between two vertical lines.",
      "Why can you safely move the shorter pointer inward?",
      "Width shrinks — when does area still grow?",
    ],
  ),
  "nc-best-time-to-buy-and-sell-stock": problem(
    "Daily stock prices in order. You may buy once and sell once later.",
    "Return the maximum profit. If no profitable trade exists, return 0.",
    "[7, 1, 5, 3, 6, 4] → 5 (buy at 1, sell at 6).",
    [
      "Max profit from one buy and one later sell.",
      "Prices only go down — what do you return?",
      "Track the minimum so far while scanning.",
    ],
  ),
  "nc-longest-substring-without-repeating-characters": problem(
    "A string s.",
    "Return the length of the longest substring with all unique characters.",
    '"abcabcbb" → 3 ("abc"). "bbbbb" → 1.',
    [
      "Longest substring with no repeated characters.",
      "What if the answer is the whole string?",
      "Sliding window with a last-seen map?",
    ],
  ),
  "nc-longest-repeating-character-replacement": problem(
    "A string of uppercase letters and an integer k.",
    "You may replace up to k characters. Return the longest substring you can make all the same letter.",
    '"ABAB", k = 2 → 4. "AABABBA", k = 1 → 4.',
    [
      "Longest same-letter window after at most k replacements.",
      "Which character in the window do you keep as the majority?",
      "When do you shrink the left edge?",
    ],
  ),
  "nc-minimum-window-substring": problem(
    "Two strings s and t.",
    "Return the shortest substring of s that covers every character in t (with counts). Empty string if impossible.",
    's = "ADOBECODEBANC", t = "ABC" → "BANC".',
    [
      "Smallest window in s that covers all of t.",
      "What if t has duplicate letters?",
      "Return empty when no window works.",
    ],
  ),
  "nc-valid-parentheses": problem(
    "A string of brackets: (), {}, [].",
    "Return true if every open bracket is closed by the same type in the correct order.",
    '"()[]{}" → true. "(]" → false. "([)]" → false.',
    [
      "Are the brackets balanced and correctly nested?",
      "What if the string starts with a closing bracket?",
      "Only one type of bracket — still use a stack?",
    ],
  ),
  "nc-find-minimum-in-rotated-sorted-array": problem(
    "A sorted array of distinct integers rotated at an unknown pivot.",
    "Return the smallest value. Prefer O(log n).",
    "[3, 4, 5, 1, 2] → 1. [4, 5, 6, 7, 0, 1, 2] → 0.",
    [
      "Find the minimum in a rotated sorted array.",
      "How do you know which half still contains the min?",
      "What if the array was never rotated?",
    ],
  ),
  "nc-search-in-rotated-sorted-array": problem(
    "A rotated sorted array of distinct integers and a target.",
    "Return the index of target, or -1 if missing. Prefer O(log n).",
    "[4, 5, 6, 7, 0, 1, 2], target 0 → 4. Target 3 → -1.",
    [
      "Search a target in a rotated sorted array.",
      "Which half is sorted on each step?",
      "Target equals the middle — done?",
    ],
  ),
  "nc-reverse-linked-list": problem(
    "The head of a singly linked list.",
    "Reverse the list and return the new head.",
    "1 → 2 → 3 → 4 → 5 becomes 5 → 4 → 3 → 2 → 1.",
    [
      "Reverse a singly linked list.",
      "Iterative with three pointers, or recursive?",
      "Empty list or one node?",
    ],
  ),
  "nc-merge-two-sorted-lists": problem(
    "Two sorted singly linked lists.",
    "Merge them into one sorted list by splicing nodes. Return its head.",
    "1 → 2 → 4 and 1 → 3 → 4 → 1 → 1 → 2 → 3 → 4 → 4.",
    [
      "Merge two sorted linked lists.",
      "One list empties first — what happens to the rest?",
      "Use a dummy head?",
    ],
  ),
  "nc-reorder-list": problem(
    "A singly linked list L0 → L1 → … → Ln.",
    "Reorder in place to L0 → Ln → L1 → Ln−1 → …",
    "1 → 2 → 3 → 4 → 5 becomes 1 → 5 → 2 → 4 → 3.",
    [
      "Reorder the list as first, last, second, second-last, …",
      "Find the middle, reverse the back half, then weave.",
      "Odd length — who is the middle?",
    ],
  ),
  "nc-remove-nth-node-from-end-of-list": problem(
    "A linked list and an integer n.",
    "Remove the nth node from the end and return the head.",
    "1 → 2 → 3 → 4 → 5, n = 2 → 1 → 2 → 3 → 5.",
    [
      "Delete the nth node from the end in one pass.",
      "What if n equals the list length?",
      "Two pointers with a gap of n?",
    ],
  ),
  "nc-linked-list-cycle": problem(
    "The head of a linked list that may contain a cycle.",
    "Return true if some node is reachable again by following next; otherwise false.",
    "1 → 2 → 3 → 2… → true. 1 → 2 → 3 → null → false.",
    [
      "Does this linked list have a cycle?",
      "Floyd’s slow and fast pointers — why do they meet?",
      "Constant extra space?",
    ],
  ),
  "nc-merge-k-sorted-lists": problem(
    "k sorted linked lists.",
    "Merge them all into one sorted list and return its head.",
    "[[1, 4, 5], [1, 3, 4], [2, 6]] → 1 → 1 → 2 → 3 → 4 → 4 → 5 → 6.",
    [
      "Merge k sorted linked lists.",
      "Heap of list heads, or pairwise merge?",
      "k = 0 or all lists empty?",
    ],
  ),
  "nc-maximum-depth-of-binary-tree": problem(
    "The root of a binary tree.",
    "Return the number of nodes on the longest root-to-leaf path.",
    "Root with left child and that left has a left child → depth 3.",
    [
      "What is the maximum depth of this tree?",
      "Empty tree — 0 or 1?",
      "DFS recursion vs BFS levels?",
    ],
  ),
  "nc-same-tree": problem(
    "Roots of two binary trees p and q.",
    "Return true if both trees have the same shape and the same values at corresponding nodes.",
    "Both [1, 2, 3] → true. [1, 2] vs [1, null, 2] → false.",
    [
      "Are these two trees identical?",
      "One null and one not — false?",
      "Compare structure and values together.",
    ],
  ),
  "nc-invert-binary-tree": problem(
    "The root of a binary tree.",
    "Swap every left and right child throughout the tree. Return the root.",
    "[4, 2, 7, 1, 3, 6, 9] becomes [4, 7, 2, 9, 6, 3, 1].",
    [
      "Invert / mirror the binary tree.",
      "Recurse on children then swap, or swap then recurse?",
      "Empty root?",
    ],
  ),
  "nc-binary-tree-maximum-path-sum": problem(
    "A binary tree with integer node values (may be negative).",
    "Return the maximum sum of any non-empty path. A path may start and end at any nodes and need not pass through the root.",
    "[-10, 9, 20, null, null, 15, 7] → 42 (15 + 20 + 7).",
    [
      "Maximum path sum anywhere in the tree.",
      "A node’s contribution upward vs a path that bends at that node.",
      "Negative children — do you include them?",
    ],
  ),
  "nc-binary-tree-level-order-traversal": problem(
    "The root of a binary tree.",
    "Return node values grouped by level, top to bottom, left to right on each level.",
    "[3, 9, 20, null, null, 15, 7] → [[3], [9, 20], [15, 7]].",
    [
      "Level-order (BFS) traversal as a list of levels.",
      "How do you know when a level ends?",
      "Empty tree → []?",
    ],
  ),
  "nc-serialize-and-deserialize-binary-tree": problem(
    "A binary tree.",
    "Encode it into a string and decode that string back into the same tree.",
    "[1, 2, 3, null, null, 4, 5] round-trips through serialize / deserialize.",
    [
      "Design serialize and deserialize for a binary tree.",
      "How do you mark null children?",
      "Preorder with sentinels, or level order?",
    ],
  ),
  "nc-subtree-of-another-tree": problem(
    "Roots of two binary trees root and subRoot.",
    "Return true if root contains a subtree identical to subRoot.",
    "root = [3, 4, 5, 1, 2], subRoot = [4, 1, 2] → true.",
    [
      "Is subRoot a subtree of root?",
      "Same tree check at every candidate node.",
      "subRoot larger than root?",
    ],
  ),
  "nc-construct-binary-tree-from-preorder-and-inorder-traversal": problem(
    "Preorder and inorder traversals of a binary tree with distinct values.",
    "Rebuild the tree and return its root.",
    "preorder = [3, 9, 20, 15, 7], inorder = [9, 3, 15, 20, 7] → tree rooted at 3.",
    [
      "Build the tree from preorder and inorder.",
      "Where is the root in each array?",
      "Map inorder values to indices for speed.",
    ],
  ),
  "nc-validate-binary-search-tree": problem(
    "The root of a binary tree.",
    "Return true if it is a valid BST: every left subtree value < node < every right subtree value, recursively.",
    "[2, 1, 3] → true. [5, 1, 4, null, null, 3, 6] → false.",
    [
      "Is this tree a valid BST?",
      "Why is checking only parent vs children not enough?",
      "Pass allowed (low, high) bounds down.",
    ],
  ),
  "nc-kth-smallest-element-in-a-bst": problem(
    "The root of a BST and an integer k (1-indexed).",
    "Return the kth smallest value in the tree.",
    "[3, 1, 4, null, 2], k = 1 → 1. k = 3 → 3.",
    [
      "Find the kth smallest in a BST.",
      "Inorder traversal yields sorted order.",
      "Can you stop early after k visits?",
    ],
  ),
  "nc-lowest-common-ancestor-of-a-binary-search-tree": problem(
    "A BST and two distinct nodes p and q that exist in the tree.",
    "Return their lowest common ancestor — the deepest node that has both as descendants (a node may be a descendant of itself).",
    "root = [6, 2, 8, …], p = 2, q = 8 → 6. p = 2, q = 4 → 2.",
    [
      "LCA of two nodes in a BST.",
      "Walk left or right using BST order.",
      "One node is ancestor of the other.",
    ],
  ),
  "nc-implement-trie-prefix-tree": problem(
    "You need a prefix tree supporting insert, search for a full word, and startsWith for a prefix.",
    "Implement Trie with those three operations.",
    'insert "apple"; search "apple" → true; search "app" → false; startsWith "app" → true.',
    [
      "Implement a trie with insert, search, and startsWith.",
      "How do you mark end of word?",
      "Shared prefixes among many words.",
    ],
  ),
  "nc-design-add-and-search-words-data-structure": problem(
    "A word dictionary that supports adding words and searching.",
    "Search may include '.' which matches any single letter.",
    'add "bad", "dad", "mad"; search "pad" → false; search ".ad" → true; search "b.." → true.',
    [
      "Design addWord and search with '.' wildcards.",
      "DFS/BFS over trie children when you see a dot.",
      "Empty word edge cases.",
    ],
  ),
  "nc-word-search-ii": problem(
    "An m×n board of letters and a list of words.",
    "Return all words from the list that can be formed by adjacent (4-dir) cells without reusing a cell in one word.",
    'board with "oath" path, words ["oath","pea","eat","rain"] → ["eat","oath"].',
    [
      "Find all dictionary words on the board.",
      "Trie of the word list to prune DFS early.",
      "Mark cells visited and unmark on backtrack.",
    ],
  ),
  "nc-number-of-islands": problem(
    "A 2D grid of '1' (land) and '0' (water).",
    "Count islands — connected groups of land (4-directional).",
    '[["1","1","0"],["1","0","0"],["0","0","1"]] → 2.',
    [
      "How many islands are on this grid?",
      "Flood-fill / DFS / BFS each unvisited land cell.",
      "Do diagonals count as connected?",
    ],
  ),
  "nc-clone-graph": problem(
    "A node of a connected undirected graph; each node has a value and a list of neighbors.",
    "Return a deep copy of the entire graph.",
    "Node 1 connected to 2 and 4; clone has the same structure with new nodes.",
    [
      "Deep-clone an undirected graph.",
      "Map old node → new node to avoid infinite loops.",
      "BFS or DFS both work.",
    ],
  ),
  "nc-pacific-atlantic-water-flow": problem(
    "An m×n height map. Pacific touches top and left edges; Atlantic touches bottom and right.",
    "Return all cells from which water can flow to both oceans (downhill or flat to neighbors).",
    "A classic grid yields cells like [0,4], [1,3], [1,4], [2,2], [3,0], [3,1], [4,0].",
    [
      "Cells that can reach both Pacific and Atlantic.",
      "Flood inland from each ocean, then take the intersection.",
      "Equal heights still allow flow.",
    ],
  ),
  "nc-course-schedule": problem(
    "numCourses and a list of [course, prerequisite] pairs.",
    "Return true if you can finish all courses (no cyclic dependencies).",
    "2 courses, [[1, 0]] → true. [[1, 0], [0, 1]] → false.",
    [
      "Can you finish all courses given prerequisites?",
      "Detect a cycle in the directed graph.",
      "Topological sort / Kahn or DFS colors.",
    ],
  ),
  "nc-graph-valid-tree": problem(
    "n nodes labeled 0…n−1 and a list of undirected edges.",
    "Return true if the edges form a valid tree: connected and acyclic.",
    "n = 5, edges [[0,1],[0,2],[0,3],[1,4]] → true. Extra edge creating a cycle → false.",
    [
      "Do these edges form a valid tree?",
      "n nodes need exactly n−1 edges and one component.",
      "Union-find for cycle detection.",
    ],
  ),
  "nc-number-of-connected-components-in-an-undirected-graph": problem(
    "n nodes and a list of undirected edges.",
    "Return how many connected components the graph has.",
    "n = 5, edges [[0,1],[1,2],[3,4]] → 2.",
    [
      "Count connected components in an undirected graph.",
      "DFS/BFS from each unvisited node, or union-find.",
      "Isolated nodes each count as a component.",
    ],
  ),
  "nc-alien-dictionary": problem(
    "A list of words sorted in an alien language’s alphabetical order.",
    "Return the unique letter order string (smallest in normal lex order among valids). Empty string if invalid.",
    '["wrt","wrf","er","ett","rftt"] → "wertf".',
    [
      "Derive the alien alphabet order from sorted words.",
      "Build a graph of letter precedence from adjacent words.",
      "Prefix longer after shorter — invalid input.",
    ],
  ),
  "nc-climbing-stairs": problem(
    "You can climb 1 or 2 steps at a time. There are n steps.",
    "Return how many distinct ways you can reach the top.",
    "n = 2 → 2. n = 3 → 3.",
    [
      "Number of ways to climb n stairs taking 1 or 2 at a time.",
      "This is Fibonacci — why?",
      "DP bottom-up with two variables.",
    ],
  ),
  "nc-house-robber": problem(
    "Houses in a line, each with money. Adjacent houses have linked alarms.",
    "Return the maximum you can rob without robbing two neighbors.",
    "[1, 2, 3, 1] → 4 (1 + 3). [2, 7, 9, 3, 1] → 12.",
    [
      "Max money without robbing adjacent houses.",
      "At house i: rob it + best up to i−2, or skip it.",
      "Empty or one house?",
    ],
  ),
  "nc-house-robber-ii": problem(
    "Same as house robber, but houses form a circle — first and last are neighbors.",
    "Return the maximum without robbing two adjacent houses (including first with last).",
    "[2, 3, 2] → 3. [1, 2, 3, 1] → 4.",
    [
      "Circular house robber — first and last adjacent.",
      "Solve linear on range [0…n−2] and [1…n−1], take max.",
      "One or two houses only?",
    ],
  ),
  "nc-longest-palindromic-substring": problem(
    "A string s.",
    "Return the longest palindromic substring. Any one is fine if there are ties.",
    '"babad" → "bab" or "aba". "cbbd" → "bb".',
    [
      "Longest palindromic substring.",
      "Expand around centers (odd and even).",
      "Empty string?",
    ],
  ),
  "nc-palindromic-substrings": problem(
    "A string s.",
    "Return how many substrings are palindromes. Single letters count.",
    '"abc" → 3. "aaa" → 6.',
    [
      "Count palindromic substrings.",
      "Expand around every center.",
      "Odd-length and even-length centers.",
    ],
  ),
  "nc-decode-ways": problem(
    "A string of digits. A→1 … Z→26.",
    "Return how many ways to decode the string into letters. Leading zeros are invalid.",
    '"12" → 2 ("AB", "L"). "226" → 3. "06" → 0.',
    [
      "Number of ways to decode a digit string.",
      "When is a two-digit chunk valid?",
      "Zero alone cannot be a letter.",
    ],
  ),
  "nc-coin-change": problem(
    "Coin denominations and an amount.",
    "Return the fewest coins that sum to amount, or -1 if impossible. Unlimited supply of each coin.",
    "coins = [1, 2, 5], amount = 11 → 3 (5+5+1).",
    [
      "Minimum coins to make the amount.",
      "DP: for each sum, try each coin.",
      "Amount 0 → 0 coins.",
    ],
  ),
  "nc-maximum-product-subarray": problem(
    "An integer array (may include negatives and zeros).",
    "Return the maximum product of any contiguous subarray.",
    "[2, 3, -2, 4] → 6. [-2, 0, -1] → 0.",
    [
      "Max product of a contiguous subarray.",
      "Track both max and min ending here — why?",
      "Zeros reset the running product.",
    ],
  ),
  "nc-word-break": problem(
    "A string s and a dictionary of words.",
    "Return true if s can be segmented into a space-separated sequence of dictionary words (reuse allowed).",
    's = "leetcode", wordDict = ["leet","code"] → true.',
    [
      "Can s be built from dictionary words?",
      "DP: is prefix s[0…i) breakable?",
      "Empty dictionary or empty s?",
    ],
  ),
  "nc-longest-increasing-subsequence": problem(
    "An integer array.",
    "Return the length of the longest strictly increasing subsequence (not necessarily contiguous).",
    "[10, 9, 2, 5, 3, 7, 101, 18] → 4 (e.g. 2, 3, 7, 101).",
    [
      "Length of the longest increasing subsequence.",
      "O(n²) DP, or patience sorting O(n log n).",
      "Strictly increasing — equals break the chain.",
    ],
  ),
  "nc-combination-sum": problem(
    "Distinct positive candidates and a target.",
    "Return all unique combinations that sum to target. You may reuse a number unlimited times. Combinations are unique up to order.",
    "candidates = [2, 3, 6, 7], target = 7 → [[2, 2, 3], [7]].",
    [
      "All combinations that sum to target with reuse.",
      "Backtrack; start index avoids duplicate orderings.",
      "Prune when remaining goes negative.",
    ],
  ),
  "nc-word-search": problem(
    "An m×n board of letters and a word.",
    "Return true if the word exists on the board via adjacent (4-dir) cells without reusing a cell.",
    'board with path for "ABCCED" → true.',
    [
      "Does the word appear on the board as a path?",
      "DFS with backtracking from each start cell.",
      "Mark visited, then restore.",
    ],
  ),
  "nc-unique-paths": problem(
    "An m×n grid. You start at top-left and may only move right or down.",
    "Return how many unique paths reach the bottom-right.",
    "m = 3, n = 7 → 28. m = 3, n = 2 → 3.",
    [
      "Unique paths in a grid moving only right or down.",
      "DP: ways[i][j] = ways from above + from left.",
      "1×n or m×1 → 1 path.",
    ],
  ),
  "nc-longest-common-subsequence": problem(
    "Two strings text1 and text2.",
    "Return the length of their longest common subsequence (not necessarily contiguous).",
    '"abcde" and "ace" → 3. "abc" and "abc" → 3. "abc" and "def" → 0.',
    [
      "Length of the longest common subsequence.",
      "2D DP on prefixes of both strings.",
      "Equal last chars vs take max of skip-one.",
    ],
  ),
  "nc-jump-game": problem(
    "An array where nums[i] is the max jump length from index i. Start at 0.",
    "Return true if you can reach the last index.",
    "[2, 3, 1, 1, 4] → true. [3, 2, 1, 0, 4] → false.",
    [
      "Can you reach the last index with these jumps?",
      "Track the farthest reachable so far.",
      "If i passes farthest, you are stuck.",
    ],
  ),
  "nc-maximum-subarray": problem(
    "An integer array (may be negative).",
    "Return the largest sum of any contiguous subarray.",
    "[-2, 1, -3, 4, -1, 2, 1, -5, 4] → 6 ([4, -1, 2, 1]).",
    [
      "Maximum contiguous subarray sum.",
      "Kadane: extend or restart at each index.",
      "All-negative array — return the largest element.",
    ],
  ),
  "nc-insert-interval": problem(
    "A sorted list of non-overlapping intervals and a new interval.",
    "Insert the new interval, merging overlaps, and return the result still sorted.",
    "[[1, 3], [6, 9]], insert [2, 5] → [[1, 5], [6, 9]].",
    [
      "Insert and merge an interval into a sorted list.",
      "Add all before, merge overlaps, then add the rest.",
      "New interval at the very start or end.",
    ],
  ),
  "nc-merge-intervals": problem(
    "An array of intervals [start, end].",
    "Merge all overlapping intervals and return the non-overlapping result.",
    "[[1, 3], [2, 6], [8, 10], [15, 18]] → [[1, 6], [8, 10], [15, 18]].",
    [
      "Merge overlapping intervals.",
      "Sort by start, then extend the current end.",
      "Touching endpoints — merge or not? (usually merge if inclusive).",
    ],
  ),
  "nc-non-overlapping-intervals": problem(
    "An array of intervals.",
    "Return the minimum number of intervals to remove so the rest are non-overlapping.",
    "[[1, 2], [2, 3], [3, 4], [1, 3]] → 1.",
    [
      "Min removals to make intervals non-overlapping.",
      "Greedy: keep intervals that end earliest.",
      "Sort by end time.",
    ],
  ),
  "nc-meeting-rooms": problem(
    "An array of meeting time intervals [start, end].",
    "Return true if a person can attend all meetings (no overlaps).",
    "[[0, 30], [5, 10], [15, 20]] → false. [[7, 10], [2, 4]] → true.",
    [
      "Can one person attend all these meetings?",
      "Sort by start and check adjacent overlaps.",
      "Touching end == next start — allowed?",
    ],
  ),
  "nc-meeting-rooms-ii": problem(
    "An array of meeting time intervals.",
    "Return the minimum number of conference rooms required.",
    "[[0, 30], [5, 10], [15, 20]] → 2.",
    [
      "Minimum meeting rooms needed.",
      "Sort starts and ends; sweep line or min-heap of end times.",
      "When a meeting starts before the earliest end, need a new room.",
    ],
  ),
  "nc-rotate-image": problem(
    "An n×n matrix representing an image.",
    "Rotate the image 90° clockwise in place.",
    "[[1, 2, 3], [4, 5, 6], [7, 8, 9]] → [[7, 4, 1], [8, 5, 2], [9, 6, 3]].",
    [
      "Rotate the matrix 90° clockwise in place.",
      "Transpose then reverse each row.",
      "Layer-by-layer four-way swaps.",
    ],
  ),
  "nc-spiral-matrix": problem(
    "An m×n matrix.",
    "Return all elements in spiral order (right, down, left, up, inward).",
    "[[1, 2, 3], [4, 5, 6], [7, 8, 9]] → [1, 2, 3, 6, 9, 8, 7, 4, 5].",
    [
      "Read the matrix in spiral order.",
      "Maintain top/bottom/left/right bounds.",
      "Single row or single column.",
    ],
  ),
  "nc-set-matrix-zeroes": problem(
    "An m×n matrix. If a cell is 0, its entire row and column must become 0.",
    "Do it in place without letting newly written zeros cascade incorrectly.",
    "[[1, 1, 1], [1, 0, 1], [1, 1, 1]] → [[1, 0, 1], [0, 0, 0], [1, 0, 1]].",
    [
      "Zero rows and columns that contain a 0.",
      "Use first row/column as markers.",
      "Handle the first row and first column carefully.",
    ],
  ),
  "nc-number-of-1-bits": problem(
    "A non-negative integer (as a 32-bit value).",
    "Return how many bits are set to 1 (Hamming weight).",
    "11 (0b1011) → 3. 128 (0b10000000) → 1.",
    [
      "Count the number of 1 bits.",
      "n &= n - 1 clears the lowest set bit.",
      "Unsigned right shift vs signed.",
    ],
  ),
  "nc-counting-bits": problem(
    "A non-negative integer n.",
    "Return an array ans of length n+1 where ans[i] is the number of 1 bits in i.",
    "n = 2 → [0, 1, 1]. n = 5 → [0, 1, 1, 2, 1, 2].",
    [
      "Count 1-bits for every number from 0 to n.",
      "ans[i] = ans[i >> 1] + (i & 1).",
      "O(n) total, not O(n log n).",
    ],
  ),
  "nc-reverse-bits": problem(
    "A 32-bit unsigned integer.",
    "Return the integer obtained by reversing its bits.",
    "0b00000010100101000001111010011100 → 964176192.",
    [
      "Reverse the bits of a 32-bit integer.",
      "Build result bit by bit from LSB of n.",
      "Always process all 32 positions.",
    ],
  ),
  "nc-missing-number": problem(
    "An array containing n distinct numbers taken from 0, 1, …, n.",
    "Return the one number in that range that is missing.",
    "[3, 0, 1] → 2. [0, 1] → 2. [9, 6, 4, 2, 3, 5, 7, 0, 1] → 8.",
    [
      "Find the missing number in 0…n.",
      "XOR all indices and values, or use sum formula.",
      "O(1) extra space preferred.",
    ],
  ),
  "nc-sum-of-two-integers": problem(
    "Two integers a and b.",
    "Return their sum. You may not use the + or - operators.",
    "a = 1, b = 2 → 3. a = 2, b = 3 → 5.",
    [
      "Add two integers without + or -.",
      "XOR for sum bits, AND+shift for carry.",
      "Loop until carry is zero.",
    ],
  ),
  "nc-find-median-from-data-stream": problem(
    "A stream of integers arriving one by one.",
    "Design a structure that supports adding a number and finding the median of all numbers so far efficiently.",
    "add 1, add 2 → median 1.5; add 3 → median 2.",
    [
      "Median from a data stream — addNum and findMedian.",
      "Two heaps: max-heap for lower half, min-heap for upper.",
      "Keep the heaps balanced in size.",
    ],
  ),
};
