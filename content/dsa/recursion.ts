import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "recursion-memo",
    track: "dsa",
    category: "Recursion",
    title: "Recursion and Memoization",
    summary:
      "Express a problem as smaller self-similar cases, cache answers by state so overlapping subproblems are solved once. The bridge from brute-force DFS to DP.",
    depth: "core",
    whyItMatters:
      "Almost every backtracking and DP interview starts as a recursive function. If you cannot write the raw recursion — arguments, base cases, what you return — you cannot memoize it or convert it to a table. Interviewers want to hear the two questions: does it have overlapping subproblems, and what is the state that uniquely identifies a subproblem? Memoization is DP with the call stack as the evaluation order.",
    theory: [
      "A recursive solution has a base case that does not recurse and an inductive case that calls the same function on a smaller instance. 'Smaller' must be well-founded (a size that hits the base case) or you stack-overflow. The call tree of naive Fibonacci is the teaching example: T(n) = T(n-1) + T(n-2) is exponential because F(n-2) is recomputed inside both branches.",
      "Memoization stores f(state) the first time you compute it. Later calls with the same state return the cache. The state must include every input that affects the answer — index i, remaining budget, a bitmask of used items, the previous choice if it is constrained. Too little state gives wrong answers; too much state blows memory and time.",
      "When every state is needed, a bottom-up table with explicit loops is usually faster and avoids stack limits. When few states are reachable, top-down memo wins because it never touches the dead region. Both are DP. Recursion without overlapping subproblems (tree DFS, permutations of distinct items) should not be memoized — there is nothing to reuse and the cache key would be huge.",
    ],
    howItWorks: [
      "Write the recursive function with clear parameters and a base case. Run it on a tiny input.",
      "Identify the state tuple. Create a map or array keyed by that tuple, initialized as 'unknown.'",
      "At the top of the function: if the state is cached, return it. Otherwise compute, store, return.",
      "Analyze |state space| × |work per state|. That is the complexity after memoization.",
      "If the stack is a risk (n ~ 10^5 linear chain), convert to bottom-up or make it iterative.",
    ],
    whenToUse: [
      "Optimal substructure plus overlapping subproblems: fib, knapsack, grid paths, digit DP.",
      "You can write the recurrence faster top-down than you can order a table.",
    ],
    whenNotToUse: [
      "No overlap (N-Queens, unique permutations) — memo does not help the exponential tree.",
      "The state space is larger than time allows even with memo (then you need pruning, meet-in-the-middle, or a different formulation).",
    ],
    complexity: {
      time: "O(|states| × work per state) once memoized",
      space: "O(|states|) plus O(depth) stack",
    },
    interviewTips: [
      "Narrate: 'brute recursion, then I'll cache on (i, remaining).' Implement in that order so they can stop you at brute if they want.",
      "For interview DP, top-down with a hashmap is acceptable; mention the equivalent table.",
    ],
    pitfalls: [
      "Caching a state that omits a parameter (e.g. forgetting 'last picked index' in LIS-style DFS).",
      "Mutating a shared object (path array, bitmask passed by reference) and caching the mutated view.",
      "Infinite recursion from a base case that is never hit (missing i === n, or going i+0).",
    ],
    practiceIdeas: [
      "Fibonacci, climbing stairs, house robber — same recurrence family.",
      "0/1 knapsack top-down on (i, remaining capacity).",
      "Decode ways with memo on index i.",
    ],
    related: [
      "fibonacci-dp",
      "knapsack-01",
      "subsets",
      "divide-and-conquer",
      "tree-dp",
    ],
  },
  {
    slug: "subsets",
    track: "dsa",
    category: "Recursion",
    title: "Subsets (Power Set)",
    summary:
      "At each element, choose include or exclude. The binary tree of decisions enumerates all 2^n subsets; handle duplicates by skipping equal neighbors.",
    depth: "core",
    whyItMatters:
      "Subsets is the canonical include/exclude backtrack. If you can write it, you can write combination-sum, knapsack decision trees, and 'generate all ways to assign a bit.' Interviewers also use the duplicate-nums follow-up (subsets II) to see whether you prune equal branches. The bit-mask loop that iterates 0..2^n-1 is the non-recursive twin; know both.",
    theory: [
      "For distinct items, each subset corresponds to a bit vector. Recursively: dfs(i) decides the fate of nums[i]. The exclude branch calls dfs(i+1) without pushing; the include branch pushes, calls dfs(i+1), then pops. When i === n, record a copy of the path. That copy is required — the path is mutated.",
      "With duplicates, sort first. After an exclude of nums[i], skip every following equal value so you do not start the same exclude/include pattern on an identical item. Equivalently, from a given index, loop over choices j ≥ i and skip j when nums[j] === nums[j-1] and j > i. Both produce each unique multiset once.",
      "Iterative construction: start with [[]]. For each number, duplicate every existing subset and add the number to the copies. For duplicates, only duplicate the subsets that were created in the previous round. Same 2^n output, different control flow.",
    ],
    howItWorks: [
      "Sort if you need unique subsets. Start dfs(0) with an empty path.",
      "Base: if i === n, push a copy of path into the answer and return.",
      "Exclude: dfs(i+1). Include: path.push(nums[i]); dfs(i+1); path.pop().",
      "For uniqueness, after exclude, while i+1 < n and nums[i+1] === nums[i], i++.",
      "Alternatively iterate mask from 0 to (1<<n)-1 and build the subset from set bits.",
    ],
    whenToUse: [
      "Enumerate all subsets or all unique subsets.",
      "Decision trees of n independent yes/no choices.",
    ],
    whenNotToUse: [
      "You only need the count of subsets with a property — DP on a sum or bitmask may be enough without listing.",
      "n > ~20 if you truly list 2^n; that will TLE.",
    ],
    complexity: {
      time: "O(n · 2^n) to list and copy every subset",
      space: "O(n) recursion plus output size",
    },
    interviewTips: [
      "Always copy the path. Interviewers look for `path.slice()` / `[...path]`.",
      "If they say unique subsets, sort and skip. Do not dump everything into a set of stringified arrays unless n is tiny.",
    ],
    pitfalls: [
      "Pushing the path reference, then watching every answer become the empty array at the end.",
      "Skipping duplicates incorrectly and dropping a valid subset that uses a later equal value.",
      "Using bitmask on n = 30 and overflowing a 32-bit int (use 64-bit or recursion).",
    ],
    practiceIdeas: [
      "Subsets I and II (duplicates).",
      "Count subsets that sum to k (then upgrade to listing).",
      "Generate all subsets via iterative doubling.",
    ],
    related: [
      "permutations",
      "combinations",
      "bitmask-subsets",
      "knapsack-01",
      "recursion-memo",
    ],
  },
  {
    slug: "permutations",
    track: "dsa",
    category: "Recursion",
    title: "Permutations",
    summary:
      "Build a permutation by trying each unused element at the next position. Swap-in-place or a used[] boolean; skip equal candidates for unique perms.",
    depth: "core",
    whyItMatters:
      "Permutations train the other half of backtracking: an ordered path that must use each item once. Next-permutation, string anagrams, and 'arrange tasks with constraints' all sit on this tree. The interview follow-up is always duplicates (permute unique) or a giant n where they actually wanted nextPermutation in O(n), not n! listing.",
    theory: [
      "dfs(path): if path is length n, record a copy. Else for each index i that is unused, mark used, push nums[i], recurse, pop, unmark. That is the clearest version. The swap version: at position i, swap i with each j in i..n-1, recurse i+1, swap back. It generates permutations in the suffix in place and needs no used array.",
      "Duplicates: sort, and at a given depth do not start a branch with the same value twice. With used[], the rule is: skip nums[i] if it equals nums[i-1] and nums[i-1] is not used — that means the previous equal was skipped at this depth, so this would duplicate that branch. Learn that one sentence; it is the usual bug.",
      "There are n! permutations of distinct items. You cannot do better if you must list them. If you only need the next permutation in lexicographic order, the standard reverse-suffix algorithm is O(n) and is a different problem.",
    ],
    howItWorks: [
      "used = array of false. dfs: if path.length === n, record copy.",
      "For i in 0..n-1: if used[i] continue; if i > 0 and nums[i] === nums[i-1] and !used[i-1] continue.",
      "used[i] = true; path.push(nums[i]); dfs(); path.pop(); used[i] = false.",
      "Swap variant: for j = i..n-1 swap(i,j), dfs(i+1), swap(i,j). Sort and extra skip if you need unique.",
    ],
    whenToUse: [
      "Generate all (unique) orderings.",
      "Search for an arrangement that satisfies constraints (with pruning).",
    ],
    whenNotToUse: [
      "You need the next perm only — use the O(n) nextPermutation algorithm.",
      "n is large; listing is impossible. Rephrase as counting or as a construction.",
    ],
    complexity: {
      time: "O(n · n!) to list all distinct-item permutations",
      space: "O(n) plus output",
    },
    interviewTips: [
      "Ask: distinct or not? list or next? That splits three problems.",
      "If they want in-place generation, use swaps. If they want clarity, use used[].",
    ],
    pitfalls: [
      "Forgetting to unmark used[i] — the rest of the tree sees a permanently taken item.",
      "The duplicate skip with the wrong used[i-1] polarity.",
      "Recording path without copying.",
    ],
    practiceIdeas: [
      "Permutations I and II.",
      "Next Permutation (in-place, O(n)).",
      "Permutation sequence (the k-th perm via factorial number system — no full listing).",
    ],
    related: [
      "subsets",
      "combinations",
      "n-queens",
      "generate-parentheses",
    ],
  },
  {
    slug: "combinations",
    track: "dsa",
    category: "Recursion",
    title: "Combinations",
    summary:
      "Choose k items from n without regard to order. Recurse with a start index so each combination is built in nondecreasing index order.",
    depth: "core",
    whyItMatters:
      "Combinations sit between subsets (all sizes) and permutations (order matters). Combination Sum I/II/III are among the most common backtracking mediums. The start-index trick is the whole algorithm: you only consider candidates at or after start, so {1,2} is generated once, not as {2,1}. Interviewers will change 'use each number once' to 'unlimited copies' and watch whether you pass i or i+1.",
    theory: [
      "C(n, k) = C(n-1, k) + C(n-1, k-1): skip n, or take n and choose k-1 from the rest. The DFS mirrors that. You prune when the remaining slots cannot be filled (start + needed > n+1) or when the partial sum already exceeds the target.",
      "Combination Sum (unlimited): after picking candidates[i], recurse with the same i so it can be reused. Combination Sum II (each number once, input has duplicates): sort, recurse with i+1, skip equal values at the same depth. Combination Sum III (k distinct 1–9): the same start-index DFS with an extra remaining-k counter.",
      "If you only need the count, C(n,k) or a DP is enough. If you need the lists, you pay O(k · C(n,k)) to copy them out.",
    ],
    howItWorks: [
      "dfs(start, path): if path.length === k, record a copy and return.",
      "For i from start to n: push i (or nums[i]), dfs(i+1), pop. Skip duplicates at this depth if required.",
      "For unlimited combination-sum: dfs(i) after picking i (not i+1), and return when sum === target or sum > target.",
      "Prune if remaining items < remaining slots.",
    ],
    whenToUse: [
      "Enumerate combinations or combination-sums.",
      "Any 'choose k without order' search.",
    ],
    whenNotToUse: [
      "Order matters — that is permutations.",
      "You only need how many — use nCr or DP.",
    ],
    complexity: {
      time: "O(k · C(n, k)) to list k-combinations",
      space: "O(k) recursion plus output",
    },
    interviewTips: [
      "The moment they say 'unlimited' vs 'each once,' write the next-index as i or i+1 and say why.",
      "Sort + skip is the unique-combo template. Do not unique the output after the fact for n that can TLE.",
    ],
    pitfalls: [
      "Passing 0 as the next start and generating permutations of the same combo.",
      "Forgetting to prune on sum > target (still correct, exponentially slower).",
      "Using a global path and not popping on every return path (early return after push).",
    ],
    practiceIdeas: [
      "Combinations (n, k).",
      "Combination Sum I, II, III.",
      "Letter combinations of a phone number (cartesian product — related backtrack).",
    ],
    related: [
      "subsets",
      "permutations",
      "ncr-mod-inverse",
      "generate-parentheses",
    ],
  },
  {
    slug: "n-queens",
    track: "dsa",
    category: "Recursion",
    title: "N-Queens",
    summary:
      "Place n queens so none share a row, column, or diagonal. Backtrack row by row, pruning with column and diagonal occupancy sets.",
    depth: "next",
    whyItMatters:
      "N-Queens is the backtracking poster child: a constraint-satisfaction search with aggressive pruning. Interviews use it to see whether you model attacks cheaply (O(1) checks via col / diag / anti-diag sets) instead of scanning the board every time. The 'return any one solution' vs 'return all boards' vs 'return the count' variants change almost no code.",
    theory: [
      "One queen per row is free: place a queen in row r at some column c, then recurse to row r+1. The constraints are columns and two diagonal families. Columns are obvious. Diagonals r-c is constant on one family (shift by n-1 to index an array); r+c is constant on the other. Three boolean arrays or bitsets replace an O(n) board scan.",
      "The search tree is at most n! but pruning cuts it hard. For n = 8 there are 92 solutions; for n = 9, 352. The counting version (N-Queens II) should not build strings; increment a counter at depth n.",
      "Bitmask N-Queens (columns and diags as bits, shift the diag masks when you go to the next row) is a common optimization and a nice crossover with bitmask DP thinking, but the set/array version is enough for interviews unless they ask for speed.",
    ],
    howItWorks: [
      "col[c], diag[r-c+n-1], anti[r+c] start false.",
      "dfs(r): if r === n, record the board (or increment count).",
      "For c in 0..n-1: if any of the three flags is true, skip. Place, set flags, write 'Q' on the board, dfs(r+1), undo.",
      "Build the answer as an array of strings only when recording, not on every partial place.",
    ],
    whenToUse: [
      "Place n non-attacking queens, or similar 'one per row + extra conflicts' problems (n-rooks is just permutation of columns).",
    ],
    whenNotToUse: [
      "You only need a closed formula — none exists that is simpler than search for general n.",
      "Tiny n where you can hardcode; still write the search, do not hardcode 92 boards.",
    ],
    complexity: {
      time: "O(n!) worst case with pruning much faster in practice",
      space: "O(n) for flags and the current board",
    },
    interviewTips: [
      "Explain the three constraints before coding. Draw a 4×4 and mark r-c and r+c.",
      "If they only want the count, do not allocate strings.",
    ],
    pitfalls: [
      "Forgetting to undo the flags — later rows see a permanently blocked column.",
      "Indexing r-c without the +n-1 offset into an array.",
      "Allowing two queens in the same column because you only checked diagonals.",
    ],
    practiceIdeas: [
      "N-Queens (boards) and N-Queens II (count).",
      "Solve for n = 4 by hand and match your program.",
      "N-Rooks / N-Kings as constraint variants.",
    ],
    related: [
      "sudoku-solver",
      "permutations",
      "bitmask-dp",
      "word-search",
    ],
  },
  {
    slug: "sudoku-solver",
    track: "dsa",
    category: "Recursion",
    title: "Sudoku Solver",
    summary:
      "Fill empty cells by trying digits 1–9 that are legal in the row, column, and 3×3 box, then backtrack. Constraint checks decide whether the search lives.",
    depth: "next",
    whyItMatters:
      "Sudoku is N-Queens with a denser constraint set and a partially filled board. It is a common 'write a solver' interview because the code is structured and the pruning is obvious. Follow-ups: validate a board, count solutions, or pick the empty cell with the fewest candidates (MRV heuristic) to go faster.",
    theory: [
      "A placement of digit d at (r, c) is legal if d is unused in row r, column c, and box (r/3)*3+(c/3). Three 9×9 boolean tables (or bitmasks) make the check and the update O(1). Scan for the next '.', try d = 1..9, place, recurse; if the recurse succeeds, return success; else undo.",
      "The search is exponential in the number of empties, but a valid Sudoku has a unique solution and heavy constraints, so it finishes instantly for 9×9. Worst-case crafted boards can be slow; MRV (choose the cell with the fewest legal digits) is the standard speedup and a strong thing to mention.",
      "Validation-only (Valid Sudoku) is a single pass with the same three occupancy structures — no backtracking. Do not solve if they only asked you to validate.",
    ],
    howItWorks: [
      "Preload occupancy from the given digits. Find the next empty cell (or collect all empties).",
      "Try each digit 1–9 that is free in row, col, box. Place it, mark occupancy, recurse.",
      "If dfs returns true, keep the board and return true. Else unmark, put '.' back, try the next digit.",
      "If no digit works, return false so the caller backtracks. If no empty cell remains, return true.",
    ],
    whenToUse: [
      "Fill or validate a constraint grid (Sudoku, KenKen-like, Latin squares).",
    ],
    whenNotToUse: [
      "The board is guaranteed filled and you only validate.",
      "You need all solutions of a huge grid — this is not a SAT lecture.",
    ],
    complexity: {
      time: "O(9^e) worst case for e empties; tiny in practice on real 9×9 puzzles",
      space: "O(1) extra besides the board and occupancy (recursion depth ≤ e)",
    },
    interviewTips: [
      "Write Valid Sudoku first as a helper. Then wrap it in the search if they want a solver — or keep occupancy incremental so you do not rescan the board.",
      "Mention MRV if they ask how to go faster.",
    ],
    pitfalls: [
      "Not undoing the box occupancy — the box index formula is the usual bug.",
      "Mutating the board and returning false without restoring '.'.",
      "Treating '0' vs '.' as empty inconsistently with the prompt.",
    ],
    practiceIdeas: [
      "Valid Sudoku, then Sudoku Solver.",
      "Count the number of solutions (undo after a success too).",
      "Implement MRV and compare node counts.",
    ],
    related: [
      "n-queens",
      "word-search",
      "recursion-memo",
    ],
  },
  {
    slug: "word-search",
    track: "dsa",
    category: "Recursion",
    title: "Word Search",
    summary:
      "DFS from each cell, walking four directions to match the next character, marking the path so you do not reuse a cell. Backtrack the mark.",
    depth: "core",
    whyItMatters:
      "Word search (and its II variant with a trie) is the grid-DFS interview. It combines recursion, in-place marking, and pruning when the prefix dies. If you forget to unmark, every path poisons the board. If you copy the board, you pass but signal the wrong instinct. Word Search II upgrades the same walk with a trie so you search all words in one traversal.",
    theory: [
      "From cell (r, c) trying word[k], you succeed if k is the last index. Otherwise try the four neighbors that are in bounds, match word[k+1], and are not already on the path. Mark board[r][c] as visited (swap in '#'), recurse, restore. Start this DFS from every cell that matches word[0].",
      "Complexity is harsh: O(m n · 4^L) in the worst case. Early mismatch pruning keeps it interview-acceptable for one word. For many words, running this per word repeats work; a trie of all words lets one DFS follow multiple words at once and prune when no child exists (Word Search II).",
      "You cannot 'visit globally' across starting points with a single visited matrix that you never reset — each path has its own used set. In-place mark/unmark is that per-path set.",
    ],
    howItWorks: [
      "For each cell, call dfs(r, c, 0).",
      "dfs: if out of bounds or board[r][c] !== word[k], return false. If k === word.length-1, return true.",
      "Save board[r][c], set it to a sentinel, try four directions with k+1. If any is true, restore and return true.",
      "Restore the cell and return false.",
    ],
    whenToUse: [
      "Find a word (or all words) as a path in a grid, no cell reuse.",
      "Any path-in-grid matching a sequence.",
    ],
    whenNotToUse: [
      "The word may use cells twice — then do not mark, or the problem is a different one.",
      "Boggle with a huge dictionary — you want a trie, not one DFS per word.",
    ],
    complexity: {
      time: "O(mn · 4^L) for one word of length L",
      space: "O(L) stack; O(1) extra if you mark in place",
    },
    interviewTips: [
      "Write mark/unmark in the same breath. If they ask about many words, pivot to a trie.",
      "Prune immediately on mismatch; do not generate the full 4-ary tree first.",
    ],
    pitfalls: [
      "Forgetting to restore the cell on both success and failure (on success you must still restore if you continue searching other words, or if the caller retries).",
      "Allowing a wrap-around or diagonal when the problem is 4-directional.",
      "Using a global visited that stays true after a failed start cell.",
    ],
    practiceIdeas: [
      "Word Search I.",
      "Word Search II with a trie.",
      "Count how many paths spell a word (not just existence).",
    ],
    related: [
      "trie",
      "trie-search",
      "dfs",
      "n-queens",
      "aho-corasick",
    ],
  },
  {
    slug: "generate-parentheses",
    track: "dsa",
    category: "Recursion",
    title: "Generate Parentheses",
    summary:
      "Build a string of n pairs by adding '(' if you still have opens left and ')' if closes would not exceed opens. Catalan-many valid strings, no invalid ones generated.",
    depth: "core",
    whyItMatters:
      "This is the cleanest 'generate all valid structures' interview. The naive generate-all-2n-bit-strings-and-filter is correct and exponential in a worse way (you build invalids). The right DFS never goes invalid: you track how many opens remain and how many closes you are still allowed. It also introduces Catalan numbers, which interviewers like as a follow-up count.",
    theory: [
      "A prefix of a valid sequence always has #open ≥ #close, and the full string has both equal to n. So the state is (built, openUsed, closeUsed) or (remainingOpen, remainingClose). You may append '(' if openUsed < n. You may append ')' if closeUsed < openUsed. When the string length is 2n, record it.",
      "The number of strings is the Catalan number C_n = (1/(n+1)) * C(2n, n). If they only want the count, return C_n (watch overflow) or DP: dp[n] += dp[i] * dp[n-1-i] for the split after the first matching pair. Generating needs the DFS (or the DP that stores lists).",
      "The same skeleton generates valid bracket strings with multiple types (see valid-parentheses) if you add a stack or a remaining-count per type, and it generates full binary trees / mountain ranges / non-crossing handshakes — all Catalan objects.",
    ],
    howItWorks: [
      "dfs(path, open, close) with open/close = number used so far.",
      "If path.length === 2n, record path and return.",
      "If open < n, append '(', dfs(open+1, close), pop.",
      "If close < open, append ')', dfs(open, close+1), pop.",
    ],
    whenToUse: [
      "Enumerate valid parentheses strings, mountain arrays of ±1, or other Catalan structures.",
    ],
    whenNotToUse: [
      "You only need to validate one string — that is a counter or a stack, not generation.",
      "n is large and they want a count modulo p — use the Catalan DP / formula, do not list.",
    ],
    complexity: {
      time: "O(n · C_n) to output all strings",
      space: "O(n) recursion plus output",
    },
    interviewTips: [
      "Do not generate invalids. Show the two guards.",
      "If they ask how many, name Catalan and write the split recurrence.",
    ],
    pitfalls: [
      "Allowing close > open in a prefix — those strings can never be finished validly, but you still waste time if you only filter at the end.",
      "Using a global string builder and forgetting to pop.",
      "Off-by-one on n pairs vs n characters.",
    ],
    practiceIdeas: [
      "Generate Parentheses (LeetCode 22).",
      "Count them via Catalan DP.",
      "Generate all valid strings with two bracket types.",
    ],
    related: [
      "valid-parentheses",
      "catalan",
      "combinations",
      "recursion-memo",
    ],
  },
  {
    slug: "divide-and-conquer",
    track: "dsa",
    category: "Recursion",
    title: "Divide and Conquer",
    summary:
      "Split the instance, solve parts independently, combine. The Master Theorem turns T(n) = a T(n/b) + f(n) into the closed form you quote in interviews.",
    depth: "core",
    whyItMatters:
      "Divide and conquer is the strategy behind merge sort, binary search, quicksort, closest pair, and many 'solve on halves then merge' problems (count inversions, majority, skyline). Interviewers want you to name the split, the combine cost, and the resulting complexity — not just recurse and hope. It is different from DP: subproblems do not overlap, so you do not memoize, you combine.",
    theory: [
      "Three pieces: divide (cheap, often mid), conquer (a recursive calls of size n/b), combine (f(n)). Merge sort is a=2, b=2, f=n → n log n. Binary search is a=1, b=2, f=1 → log n. Strassen and Karatsuba exist to make you say 'I reduced the number of subproblems to beat the naive combine.'",
      "Master Theorem (interview form): compare f(n) to n^{log_b a}. If f is polynomially smaller, T = Θ(n^{log_b a}). If they are equal (up to log^k), multiply by a log. If f is larger and regular, T = Θ(f). You do not need the full regularity proof; you need to apply the three cases to 2T(n/2)+n, 2T(n/2)+n², T(n/2)+1.",
      "Quicksort is divide and conquer with an uneven split; the Master Theorem does not apply directly — you use expected-case recurrences. Closest pair is the geometric showcase: sort, recurse on left/right halves, then a linear scan of a strip. People who skip the strip combine write an O(n²) merge and lose the point.",
    ],
    howItWorks: [
      "Define a base case small enough to solve directly (n ≤ 1, or insertion sort cutoff).",
      "Split into independent subinstances (halves, quadrants, first/second half of a list).",
      "Recurse. Combine answers in f(n) time — this is the part you design.",
      "Write the recurrence and apply Master Theorem or unroll.",
    ],
    whenToUse: [
      "The problem splits into independent similar pieces whose answers combine cheaply.",
      "You want a guaranteed n log n from a linear combine of two halves.",
    ],
    whenNotToUse: [
      "Subproblems overlap — use DP / memo, or you recompute an exponential tree.",
      "The combine is as hard as the original problem (no win).",
    ],
    complexity: {
      time: "Given by the recurrence; often Θ(n log n) or Θ(n^{log_b a})",
      space: "O(depth) stack plus whatever combine allocates",
    },
    interviewTips: [
      "For 'count inversions' or 'reverse pairs,' say merge sort and count during combine.",
      "Majority element can be D&C (majority in left or right or scan) but Boyer–Moore is better — know both.",
    ],
    pitfalls: [
      "Unbalanced splits that make T(n) = T(n-1) + n = O(n²) (bad quicksort, bad list mid).",
      "Calling it DP because you recursed. If you do not reuse overlapping answers, it is D&C.",
      "A combine that is O(n²) that you still claim is n log n.",
    ],
    practiceIdeas: [
      "Merge sort and inversion count.",
      "Maximum subarray via D&C (then admit Kadane is better).",
      "Skyline problem / closest pair as heavier combines.",
    ],
    related: [
      "merge-sort",
      "binary-search",
      "closest-pair",
      "quick-sort",
      "kadane",
    ],
  },
  {
    slug: "closest-pair",
    track: "dsa",
    category: "Recursion",
    title: "Closest Pair of Points",
    summary:
      "Divide the plane by x-median, recurse, then scan a strip of width δ around the midline. The strip has a 7-neighbor property that keeps the combine linearithmic.",
    depth: "advanced",
    whyItMatters:
      "Closest pair is the divide-and-conquer problem that is not a sort. It shows up in computational-geometry interviews and in 'beat the obvious O(n²) all-pairs' discussions. The insight you must teach: after both halves have minimum δ, any closer pair straddling the line lives in a thin strip, and inside a sorted-by-y strip each point only needs a constant number of neighbors. Miss that and your combine is quadratic.",
    theory: [
      "Sort points by x. Recurse on the left n/2 and right n/2; let δ be the min of the two answers. The only pairs not yet considered cross the vertical midline. Any such pair closer than δ must have both points in the vertical strip |x - midX| < δ.",
      "Take the strip and sort it by y (or merge the already y-sorted halves — that is the linear combine). Scan upward: for each point, compare it to the next points within δ in y. In the plane, a packing argument says at most a handful (classically 7) of other points can lie in that δ×δ rectangle, because left and right already packed their own δ-balls. So the scan is O(n).",
      "T(n) = 2T(n/2) + O(n) = O(n log n) after the initial sort. A randomized incremental algorithm also exists; the D&C is the one to write. 1D closest pair is just sort and scan adjacent — mention that contrast.",
    ],
    howItWorks: [
      "If n ≤ 3, brute-force distances and return the min pair.",
      "Split the x-sorted array at mid. Recurse left and right; δ = min(δL, δR).",
      "Collect points with |x - midX| < δ; they are already y-sortable in linear time by merging y-order.",
      "Sweep the strip by increasing y; compare each point to the next few within δ in y. Update δ.",
      "Return the best pair (and δ) to the caller.",
    ],
    whenToUse: [
      "Closest pair in 2D (or low dimension) in O(n log n).",
      "Teaching a combine step that is not a merge of sorted runs of values.",
    ],
    whenNotToUse: [
      "High dimension — the strip packing constant explodes and you use trees or hashing.",
      "n is small; O(n²) is simpler and fine.",
    ],
    complexity: {
      time: "O(n log n)",
      space: "O(n) for strip buffers and recursion",
    },
    interviewTips: [
      "Draw the midline and the strip. Say 'constant neighbors in the strip' before you code.",
      "Return both the distance and the two points if they asked for the pair.",
    ],
    pitfalls: [
      "Comparing every pair in the strip (O(n²) combine).",
      "Using ≤ δ vs < δ inconsistently and missing a pair on the boundary.",
      "Not handling coincident points (distance 0) as an immediate answer.",
    ],
    practiceIdeas: [
      "Implement closest pair and test against all-pairs on random point sets.",
      "1D closest pair via sort.",
      "Farthest pair in 2D (convex hull + rotating calipers — a different tool).",
    ],
    related: [
      "divide-and-conquer",
      "merge-sort",
      "binary-search",
    ],
  },
];
