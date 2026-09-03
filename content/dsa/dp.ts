import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "fibonacci-dp",
    track: "dsa",
    category: "Dynamic Programming",
    title: "Fibonacci-Style DP",
    summary:
      "dp[i] depends on a constant number of previous answers. The teaching family: Fib, climbing stairs, and every 'number of ways to reach i' recurrence.",
    depth: "core",
    whyItMatters:
      "This is the first DP you should write in an interview. The naive recursion is exponential; a 1-D table (or two rolling variables) is linear. Interviewers use it to hear you name overlapping subproblems and optimal substructure before they escalate to knapsack. If you cannot roll the array into O(1) space here, you will struggle later.",
    theory: [
      "F(n) = F(n-1)+F(n-2), F(0)=0, F(1)=1. The DAG of subproblems is a line. Memoization fills each n once. Bottom-up fills 2..n in order. Because only two previous values matter, you keep prev and cur and walk forward — O(1) space.",
      "Climbing stairs is F(n+1): one way to take a last 1-step from n-1, one way to take a last 2-step from n-2. Decode-ways and house-robber are the same shape with extra local constraints (valid digits, cannot take adjacent houses). Learn to write the recurrence in words before indices.",
      "Closed forms (Binet) and matrix exponentiation compute F(n) in O(log n). Mention them if n is 10^18 modulo p. For interview n ≤ 10^5, the linear scan is the answer.",
    ],
    howItWorks: [
      "Define dp[i] as the answer for size i. Write the base cases out loud.",
      "dp[i] = dp[i-1] + dp[i-2] (or the problem's variant).",
      "Iterate i from the first unknown to n. Return dp[n] (or the two-variable analog).",
    ],
    whenToUse: [
      "Linear recurrences with a fixed window of dependence.",
      "Number of ways to tile / climb / decode a prefix.",
    ],
    whenNotToUse: [
      "The state needs more than the index (capacity, bitmask) — still DP, not this 1-D template.",
    ],
    complexity: {
      time: "O(n); O(log n) with matrix expo",
      space: "O(1) rolling; O(n) table",
    },
    interviewTips: [
      "Start from the last decision: 'to finish n, the last step was 1 or 2.' That sentence is the recurrence.",
      "Mod 10^9+7 if they want ways and n is large.",
    ],
    pitfalls: [
      "Base cases off by one (n=0 empty vs n=1).",
      "Overflow without a modulus.",
      "Recursing without memo on n=45 and timing out.",
    ],
    practiceIdeas: [
      "Fibonacci; Climbing Stairs; Min Cost Climbing Stairs.",
      "Tribonacci; tiling a 2×n board.",
    ],
    related: [
      "climbing-stairs",
      "house-robber",
      "decode-ways",
      "recursion-memo",
      "fast-exponentiation",
    ],
  },
  {
    slug: "climbing-stairs",
    track: "dsa",
    category: "Dynamic Programming",
    title: "Climbing Stairs",
    summary:
      "Ways to reach step n with 1- and 2-steps is Fibonacci. Generalize to 1..k steps with a sliding window sum.",
    depth: "core",
    whyItMatters:
      "The most common Fib disguise. Follow-ups: min cost, k-width jumps, broken rungs (must skip some indices). Interviewers want the recurrence, then O(1) space, then the k-generalization without turning it into O(nk) sloppy if a window sum can be O(n).",
    theory: [
      "Let dp[i] be ways to reach i. dp[i] = dp[i-1] + dp[i-2], dp[0]=1 (one way to stand at the ground), dp[1]=1. Some people set dp[1]=1, dp[2]=2 and start from 3 — both fine if bases match.",
      "Min-cost climbing: dp[i] = cost[i] + min(dp[i-1], dp[i-2]), then the answer is min of the last two (you can finish from either). Same DAG, different combine (min vs sum).",
      "If you may jump 1..k, dp[i] = sum(dp[i-j] for j=1..k). Maintain a running window sum to keep each step O(1). Broken stairs: force dp[broken]=0 and do not add them into the window.",
    ],
    howItWorks: [
      "a=1, b=1. for i in 2..n: c=a+b; a=b; b=c. return b.",
      "Or allocate dp[n+1] if you will extend the problem.",
    ],
    whenToUse: [
      "Reach n with a small set of step sizes; min cost versions.",
    ],
    whenNotToUse: [
      "Steps have weights and a capacity — knapsack.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1)",
    },
    interviewTips: [
      "Ask whether order matters (it does: 1+2 and 2+1 are two ways). That is compositions, not partitions.",
    ],
    pitfalls: [
      "dp[0]=0, which kills every later value.",
      "Modulo forgotten when they said 'return ways modulo …'.",
    ],
    practiceIdeas: [
      "Climbing Stairs; Min Cost Climbing Stairs.",
      "Jump with 1..k; frog jump with forbidden stones.",
    ],
    related: [
      "fibonacci-dp",
      "house-robber",
      "jump-game",
      "decode-ways",
    ],
  },
  {
    slug: "house-robber",
    track: "dsa",
    category: "Dynamic Programming",
    title: "House Robber",
    summary:
      "Max sum of a subsequence with no two adjacent. dp[i] = max(dp[i-1], dp[i-2] + A[i]). Circle and tree variants change the graph, not the idea.",
    depth: "core",
    whyItMatters:
      "House Robber is the first 'max, not count' linear DP. It trains the include/exclude decision. The circle follow-up (rob 1 or n but not both) is two linear passes. The tree follow-up is the gateway to tree DP. If you write a 2-D 'used previous' when a 1-D max suffices, you over-state.",
    theory: [
      "At house i you either skip it (keep dp[i-1]) or take it and skip i-1 (dp[i-2]+A[i]). Bases: dp[0]=A[0], dp[1]=max(A[0],A[1]). Rolling two variables is enough.",
      "House Robber II (circle): the first and last houses are adjacent. Answer = max( rob(0..n-2), rob(1..n-1) ), and handle n=1 separately. You cannot just zero one house and run once.",
      "House Robber III (tree): for each node return {take, skip}. take = node.val + skip(left)+skip(right). skip = max(take,skip) of each child. That pair is tree DP in miniature.",
    ],
    howItWorks: [
      "prev2=0, prev1=0. for x of nums: cur = max(prev1, prev2+x); prev2=prev1; prev1=cur.",
      "Circle: max of that function on the two slices.",
    ],
    whenToUse: [
      "Max-sum no-adjacent on a line, circle, or tree.",
    ],
    whenNotToUse: [
      "No-adjacent is not the constraint (e.g. at most k houses) — add k to the state.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1) line; O(n) tree recursion",
    },
    interviewTips: [
      "State include vs exclude. Then code the roll. Then they will say 'houses are in a circle.'",
    ],
    pitfalls: [
      "Circle without splitting into two ranges.",
      "Negative house values: the recurrence still works; do not floor at 0 unless empty is allowed and better.",
    ],
    practiceIdeas: [
      "House Robber I, II, III.",
      "Delete and Earn (map to robber on a value line).",
    ],
    related: [
      "fibonacci-dp",
      "tree-dp",
      "climbing-stairs",
      "kadane",
    ],
  },
  {
    slug: "decode-ways",
    track: "dsa",
    category: "Dynamic Programming",
    title: "Decode Ways",
    summary:
      "A digit string maps to letters as 1–26. dp[i] adds the one-digit and two-digit decodes that form valid codes ending at i. Zeros are the trap.",
    depth: "next",
    whyItMatters:
      "Decode Ways looks like stairs and dies on '10', '06', and '230'. Interviewers use it to see whether your recurrence checks validity, not just length. The follow-up with '*' (Decode Ways II) is a careful case-bash on the same DP.",
    theory: [
      "dp[i] = ways to decode the prefix s[0..i). dp[0]=1. For each i, if s[i-1] is 1–9, you may add dp[i-1]. If s[i-2..i) is 10–26, you may add dp[i-2]. A '0' cannot stand alone; '10' and '20' only work as a pair. '06' is illegal.",
      "This is climbing stairs with gates on the last one/two characters. Rolling two variables works. You can also think top-down memo on index i.",
      "Decode Ways II: '*' can be 1–9 or 1–26 in pair contexts; multiply the previous dp by the number of choices. The case table is tedious but the state is unchanged.",
    ],
    howItWorks: [
      "dp[0]=1. for i=1..n: ways=0; if one-digit valid, ways += dp[i-1]; if i>=2 and two-digit valid, ways += dp[i-2]; dp[i]=ways.",
      "Return dp[n]. If you ever get stuck with 0 ways mid-string, later stays 0.",
    ],
    whenToUse: [
      "Parse a string under local coding rules; number of interpretations.",
    ],
    whenNotToUse: [
      "You need the actual decodings listed — backtrack, and only if n is tiny.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1) rolling",
    },
    interviewTips: [
      "Walk '10', '12', '27', '06', '0' before coding. Those five decide your conditions.",
    ],
    pitfalls: [
      "Treating 0 as a valid one-digit code.",
      "Accepting 27 as a two-digit letter.",
      "Leading zeros in the two-digit slice ('06').",
    ],
    practiceIdeas: [
      "Decode Ways I and II.",
      "List all decodings for a short string via backtrack and compare counts.",
    ],
    related: [
      "climbing-stairs",
      "fibonacci-dp",
      "recursion-memo",
    ],
  },
  {
    slug: "knapsack-01",
    track: "dsa",
    category: "Dynamic Programming",
    title: "0/1 Knapsack",
    summary:
      "Each item is taken at most once. dp[i][c] = max of skip item i or take it if it fits. Roll the capacity loop backward so each item is used once.",
    depth: "core",
    whyItMatters:
      "0/1 knapsack is the DP that everything else is 'like.' Partition equal subset sum, last stone weight II, target sum, and many 'pick a subset with a budget' problems are this table. If you iterate capacity forward on a 1-D array, you accidentally allow unlimited copies — that is the other knapsack. Interviewers listen for that backward loop.",
    theory: [
      "State: first i items, remaining capacity c (or current weight). Value = max( dp[i-1][c], value_i + dp[i-1][c-w_i] ) if w_i ≤ c. The DAG goes toward smaller i or smaller c. n·W cells, each O(1).",
      "1-D rolling: dp[c] = max(dp[c], dp[c-w]+v) for c from W down to w. Backward means you still see yesterday's dp[c-w], i.e. without this item. Forward would reuse this item in the same pass.",
      "When values are all 1 and you only care if a subset sums to T, dp becomes a boolean bitset. That is subset-sum, still 0/1 knapsack. Meet-in-the-middle is the move when n≈40 and W is huge.",
    ],
    howItWorks: [
      "dp = array(W+1, 0). for each item (w,v): for c = W; c >= w; c--: dp[c] = max(dp[c], dp[c-w]+v).",
      "Return dp[W]. For boolean subset-sum, use OR instead of max and start dp[0]=true.",
    ],
    whenToUse: [
      "Subset of items, each at most once, maximize value under a weight cap (or hit an exact sum).",
    ],
    whenNotToUse: [
      "Items may be taken many times — unbounded knapsack / coin change.",
      "W is 10^12 — cannot allocate the table; need greedy or a different formulation.",
    ],
    complexity: {
      time: "O(n W)",
      space: "O(W)",
    },
    interviewTips: [
      "Partition Equal Subset Sum: if total is odd, false; else 0/1 subset-sum to total/2.",
      "Say 'backward capacity loop' so they know you will not unbounded-it.",
    ],
    pitfalls: [
      "Forward 1-D loop (unbounded).",
      "Using n as the outer and forgetting item i can only be used in transition i, not earlier.",
      "Integer overflow on values.",
    ],
    practiceIdeas: [
      "0/1 knapsack textbook; Partition Equal Subset Sum; Target Sum.",
      "Last Stone Weight II.",
    ],
    related: [
      "unbounded-knapsack",
      "coin-change",
      "subsets",
      "bitmask-dp",
    ],
  },
  {
    slug: "unbounded-knapsack",
    track: "dsa",
    category: "Dynamic Programming",
    title: "Unbounded Knapsack",
    summary:
      "Each item type can be taken any number of times. The 1-D capacity loop runs forward so a newly taken item can be reused in the same pass.",
    depth: "next",
    whyItMatters:
      "This is coin change / complete knapsack. The only code difference from 0/1 is the loop direction (and sometimes the nested order). Interviews use it to see whether you understand why direction equals reuse. Combination vs permutation of coins is the next fork: outer coins then amount vs outer amount then coins.",
    theory: [
      "dp[c] = max (or min, or ways) over item types of dp[c-w]+v, with dp[0] base. Because an item can appear many times, the subproblem 'capacity c' may include this item already. Forward c = w..W uses the already-updated smaller capacities — that is reuse.",
      "Order: if you want combinations (1+2 same as 2+1), iterate items outermost, then capacity. If you want permutations (order matters), iterate capacity outermost, then items. Coin Change 2 is combinations. 'Number of ways to climb with coin-sized steps' is permutations — that is why it felt like stairs.",
      "Bounded knapsack (at most k copies) can be reduced to 0/1 via binary splitting of copies, or a third loop. Mention it; do not implement unless asked.",
    ],
    howItWorks: [
      "dp[0]=0 (value) or 1 (ways) or 0 (min coins with a big-INF rest).",
      "for each item w: for c=w..W: dp[c] = best(dp[c], dp[c-w] + option).",
      "Return dp[W].",
    ],
    whenToUse: [
      "Unlimited copies: coin systems, rod cutting, complete knapsack.",
    ],
    whenNotToUse: [
      "Each item unique — 0/1.",
    ],
    complexity: {
      time: "O(n W)",
      space: "O(W)",
    },
    interviewTips: [
      "Ask: combinations or permutations? Then pick the loop nest.",
      "Rod cutting is unbounded knapsack with w=i and v=price[i].",
    ],
    pitfalls: [
      "Backward loop, accidentally 0/1-ing.",
      "Min-coins without initializing dp[1..] to INF, so 0 wins.",
    ],
    practiceIdeas: [
      "Coin Change (min coins) and Coin Change 2 (ways).",
      "Integer Break; Rod Cutting.",
    ],
    related: [
      "knapsack-01",
      "coin-change",
      "climbing-stairs",
    ],
  },
  {
    slug: "coin-change",
    track: "dsa",
    category: "Dynamic Programming",
    title: "Coin Change",
    summary:
      "Minimum coins (or number of combinations) to make amount. Unbounded knapsack with a careful base and an impossible sentinel.",
    depth: "core",
    whyItMatters:
      "Coin Change is the unbounded-knapsack interview in cash form. People greedy-take the largest denomination and fail on {1,3,4} amount 6. You must DP. The sister problem (number of ways) swaps min for + and changes loop order. Both are must-haves.",
    theory: [
      "Min coins: dp[0]=0, dp[a]= min over coins c≤a of dp[a-c]+1, else INF. Answer is dp[amount] or -1. This counts permutations of addition as the same because min does not care about order. You can nest coins-outer or amount-outer.",
      "Ways (combinations): coins outer, amount inner, dp[0]=1, dp[a]+=dp[a-c]. Ways (permutations): amount outer. LeetCode 518 is combinations.",
      "If the coin system is canonical (US coins), greedy works. Do not assume that unless they prove it. Interviewers love the counterexample.",
    ],
    howItWorks: [
      "const INF = amount+1; dp = Array(amount+1).fill(INF); dp[0]=0;",
      "for a in 1..amount: for c of coins: if c<=a dp[a]=min(dp[a], dp[a-c]+1);",
      "return dp[amount] >= INF ? -1 : dp[amount];",
    ],
    whenToUse: [
      "Make an amount with unlimited denominations: min count or number of ways.",
    ],
    whenNotToUse: [
      "Each coin object can be used once (limited inventory) — 0/1 or bounded.",
    ],
    complexity: {
      time: "O(n · amount)",
      space: "O(amount)",
    },
    interviewTips: [
      "Give the {1,3,4} vs 6 greedy fail, then write DP.",
      "Clarify min vs ways vs list-one-combination.",
    ],
    pitfalls: [
      "Initializing dp to 0 so impossible amounts look like 0 coins.",
      "Integer overflow on +1 if you used INT_MAX.",
      "Mixing combination and permutation loops for the ways problem.",
    ],
    practiceIdeas: [
      "Coin Change; Coin Change 2.",
      "Perfect Squares (coins are 1,4,9,…).",
    ],
    related: [
      "unbounded-knapsack",
      "knapsack-01",
      "climbing-stairs",
    ],
  },
  {
    slug: "lis",
    track: "dsa",
    category: "Dynamic Programming",
    title: "Longest Increasing Subsequence",
    summary:
      "O(n²) DP: dp[i] = 1 + max dp[j] over j<i and A[j]<A[i]. O(n log n): maintain a tails array and binary-search the insertion point.",
    depth: "core",
    whyItMatters:
      "LIS is the sequence DP everyone meets. The n² version is the one you must be able to write and reconstruct. The n log n patience-sorting / tails array is the follow-up and a binary-search-on-answer cousin. Russian-doll envelopes is LIS after a clever sort. Interviewers also ask LDS and 'number of LIS.'",
    theory: [
      "A subsequence keeps order, not adjacency (that would be subarray). dp[i] is the LIS ending at i. The global answer is max dp[i]. Parent pointers reconstruct one subsequence. This is O(n²).",
      "tails[len] = smallest tail of any increasing subsequence of that length so far. For each x, binary-search the first tail ≥ x (strict LIS: ≥) and replace it. The length of tails is the LIS length. tails is not itself an LIS. Reconstructing the actual sequence from tails needs extra predecessor bookkeeping.",
      "Number of LIS: keep count[i] alongside dp[i]. When you extend a j with dp[j]+1 > dp[i], set count; when equal, add. Dilworth's theorem: min decreasing partitions = LIS length — sometimes used in 'patience' explanations.",
    ],
    howItWorks: [
      "n²: dp[i]=1; for j<i if A[j]<A[i] dp[i]=max(dp[i], dp[j]+1).",
      "n log n: tails=[]. for x of A: i = lower_bound(tails, x); if i===tails.length tails.push(x); else tails[i]=x. return tails.length.",
    ],
    whenToUse: [
      "Longest increasing / decreasing / bitonic subsequence; envelope / box stacking after sort.",
    ],
    whenNotToUse: [
      "Contiguous — that is Kadane-like or two pointers, not LIS.",
    ],
    complexity: {
      time: "O(n²) or O(n log n)",
      space: "O(n)",
    },
    interviewTips: [
      "Write n² first unless they demand n log n. Say tails is not the sequence.",
      "Russian Dolls: sort by width asc, height desc on ties (so equal widths cannot chain), then LIS on height.",
    ],
    pitfalls: [
      "Using ≤ vs < (non-decreasing vs increasing).",
      "Thinking tails is a valid LIS you can return as the sequence.",
      "n log n binary search on the wrong bound (upper vs lower).",
    ],
    practiceIdeas: [
      "LIS length; reconstruct one LIS.",
      "Number of LIS; Russian Doll Envelopes.",
      "Longest decreasing and bitonic.",
    ],
    related: [
      "lcs",
      "binary-search",
      "binary-search-on-answer",
    ],
  },
  {
    slug: "lcs",
    track: "dsa",
    category: "Dynamic Programming",
    title: "Longest Common Subsequence",
    summary:
      "dp[i][j] = dp[i-1][j-1]+1 if A[i-1]==B[j-1], else max(dp[i-1][j], dp[i][j-1]). The 2-D string DP template.",
    depth: "core",
    whyItMatters:
      "LCS is the grid you will redraw for edit distance, shortest common supersequence, and delete-operation counts. If you can fill this table and walk it backward to reconstruct the string, you own a family of interview mediums. Substring (contiguous) is a different recurrence — do not mix them.",
    theory: [
      "A common subsequence does not need to be contiguous. The last characters either match and both are taken, or you drop one side. That is the recurrence. dp[i][j] uses prefixes A[:i] and B[:j]. Size (n+1)×(m+1) with zeros on the 0-borders.",
      "Reconstruction: from (n,m), if A[i-1]==B[j-1], take that char and go (-1,-1); else step toward the larger neighbor. Shortest common supersequence is n+m-LCS (merge while preferring the match).",
      "Longest common substring requires a reset: dp[i][j] = dp[i-1][j-1]+1 on match else 0, and you track a global max. That one extra else 0 is the difference people miss.",
    ],
    howItWorks: [
      "Allocate (n+1)×(m+1) zeros.",
      "for i=1..n: for j=1..m: if A[i-1]==B[j-1] dp=diag+1 else max(up,left).",
      "Return dp[n][m]. Optionally roll to 2 rows.",
    ],
    whenToUse: [
      "Compare two strings by subsequence; SCS; delete-to-same (n+m-2·LCS).",
    ],
    whenNotToUse: [
      "You need contiguous — longest common substring or sliding window.",
    ],
    complexity: {
      time: "O(n m)",
      space: "O(n m) or O(min(n,m))",
    },
    interviewTips: [
      "Draw a 3×3 table on the board for 'ace' vs 'abcde'.",
      "If they ask to reconstruct, walk from the corner; do not store all strings in the DP cells.",
    ],
    pitfalls: [
      "Indexing A[i] instead of A[i-1] against a 1-based table.",
      "Reset vs max mix-up (substring vs subsequence).",
    ],
    practiceIdeas: [
      "LCS length and reconstruct.",
      "Delete Operation for Two Strings; Shortest Common Supersequence.",
      "Longest Common Substring as a contrast.",
    ],
    related: [
      "edit-distance",
      "lis",
      "palindrome-dp",
    ],
  },
  {
    slug: "edit-distance",
    track: "dsa",
    category: "Dynamic Programming",
    title: "Edit Distance (Levenshtein)",
    summary:
      "dp[i][j] is the min inserts/deletes/replaces to turn A[:i] into B[:j]. A match copies the diagonal; otherwise 1+min(insert, delete, replace).",
    depth: "core",
    whyItMatters:
      "Edit distance is the LCS table with three paid moves. It appears in spell-check talks and in interviews as 'min operations to convert word1 to word2.' If you only remember LCS, you will miss replace-as-one-op (two deletes/inserts would be worse). One-row rolling is a common space follow-up.",
    theory: [
      "Align the two prefixes. If the last chars match, you pay nothing extra (dp[i-1][j-1]). If not, replace them (diag+1), delete A's last (up+1), or insert B's last (left+1). Bases: dp[i][0]=i (delete all), dp[0][j]=j (insert all).",
      "Only-insert-delete is |n-m| plus something related to LCS. Allowing replace makes a different metric. Weighted costs (replace=2, etc.) plug into the same +cost slots.",
      "This is not wildcard matching (that is a different boolean DP) and not regex. Keep the problem in the three operations they named.",
    ],
    howItWorks: [
      "Init borders to i and j.",
      "for i,j: if A[i-1]==B[j-1] dp=diag else 1+min(diag, up, left).",
      "Return dp[n][m].",
    ],
    whenToUse: [
      "Min edits between two strings under insert/delete/replace.",
    ],
    whenNotToUse: [
      "Only deletions on one string — that is LCS.",
      "Fuzzy match with different op sets — rewrite the recurrence.",
    ],
    complexity: {
      time: "O(n m)",
      space: "O(n m) or O(min(n,m))",
    },
    interviewTips: [
      "Name the three neighbors: replace, delete, insert. Point at the table.",
      "Follow-up: recover one alignment by storing argmin.",
    ],
    pitfalls: [
      "Forgetting the insert-all / delete-all borders.",
      "Using max instead of min (LCS muscle memory).",
    ],
    practiceIdeas: [
      "Edit Distance.",
      "One Edit Distance (boolean, linear). Delete+insert only vs LCS.",
    ],
    related: [
      "lcs",
      "palindrome-dp",
      "grid-dp",
    ],
  },
  {
    slug: "palindrome-dp",
    track: "dsa",
    category: "Dynamic Programming",
    title: "Palindrome DP",
    summary:
      "isPal[i][j] is true if s[i]==s[j] and the inside is a palindrome. Expand-around-center is often simpler; DP shines for palindrome partitions and LPS.",
    depth: "next",
    whyItMatters:
      "Longest palindromic substring, palindrome partitioning, and longest palindromic subsequence (LCS of s and reverse(s)) are a cluster. Interviewers accept expand-around-center for LPS substring (O(n²) time, O(1) space). They want interval DP for min cuts. Manacher is the O(n) flex, not required unless they ask.",
    theory: [
      "Substring palindrome table: is[i][i]=true, is[i][i+1]=(s[i]==s[i+1]), then increasing length: is[i][j] = s[i]==s[j] && is[i+1][j-1]. Track the longest true. Expand-around-center tries every center (2n-1 of them, odd and even) and walks outward — same time, less memory.",
      "Longest palindromic subsequence: LCS(s, reverse(s)), or dp[i][j] = 2+dp[i+1][j-1] on match else max of drop-left / drop-right. That is subsequence, not substring.",
      "Palindrome partitioning II: min cuts so every piece is a palindrome. dp[j] = min dp[i-1]+1 over palindrome s[i..j], after you have is[][]. Interval / prefix DP.",
    ],
    howItWorks: [
      "Build is[i][j] by increasing j-i.",
      "Or expand(l,r) while in bounds and equal, update best.",
      "For LPS subsequence, fill the interval table by length.",
    ],
    whenToUse: [
      "Palindromic substring / subsequence / partition problems.",
    ],
    whenNotToUse: [
      "You only need to check one string — two pointers from the ends.",
    ],
    complexity: {
      time: "O(n²) typical; O(n) Manacher for longest substring",
      space: "O(n²) table or O(1) expand",
    },
    interviewTips: [
      "Ask substring vs subsequence first. Those are different problems.",
      "Write expand-around-center for longest palindromic substring unless they want all of them.",
    ],
    pitfalls: [
      "Forgetting even-length centers.",
      "Using LCS for substring.",
      "Off-by-one when slicing the best window.",
    ],
    practiceIdeas: [
      "Longest Palindromic Substring and Subsequence.",
      "Palindrome Partitioning I (list) and II (min cuts).",
    ],
    related: [
      "lcs",
      "interval-dp",
      "manacher",
      "two-pointers",
    ],
  },
  {
    slug: "matrix-chain",
    track: "dsa",
    category: "Dynamic Programming",
    title: "Matrix Chain Multiplication",
    summary:
      "Interval DP: dp[i][j] is the min cost to multiply matrices i..j. Try every split k and add the cost of the final multiply.",
    depth: "advanced",
    whyItMatters:
      "Matrix chain is the cleanest interval DP. Burst balloons, palindrome partitioning, and min-cost tree from leaves are the same 'try every last cut' shape. If you can write the length-outer, split-inner loops here, you can write those interviews. People who nest the loops in the wrong order use unready subintervals.",
    theory: [
      "A product of matrices A_i…A_j must have a last multiplication that splits after k. Cost = dp[i][k] + dp[k+1][j] + rows_i * cols_k * cols_j. Take min over k in [i,j). Base: dp[i][i]=0 (one matrix, no multiply).",
      "Fill by increasing interval length so that every smaller piece is known. That loop order is the interval-DP ritual.",
      "Burst balloons is matrix-chain with values as adjacent balloon products and the 'open interval' trick (add sentinels 1). If you only remember one harder interval DP, make it balloons after this.",
    ],
    howItWorks: [
      "for len=2..n: for i=0..n-len: j=i+len-1; dp[i][j]=∞; for k=i..j-1: dp[i][j]=min(..., dp[i][k]+dp[k+1][j]+cost(i,k,j)).",
      "Return dp[0][n-1].",
    ],
    whenToUse: [
      "Optimal parenthesization; last-cut interval problems.",
    ],
    whenNotToUse: [
      "You may merge any pair, not only adjacent — that is Huffman / greedy, not matrix chain.",
    ],
    complexity: {
      time: "O(n³)",
      space: "O(n²)",
    },
    interviewTips: [
      "Draw three matrices 10×30, 30×5, 5×60 and compute both parenthesizations by hand, then code.",
    ],
    pitfalls: [
      "Filling by i,j increasing instead of by length — reading uncomputed middles.",
      "Wrong cost indices (off-by-one on dimensions array of length n+1).",
    ],
    practiceIdeas: [
      "Matrix chain min cost; print one parenthesization (store argmin).",
      "Burst Balloons next.",
    ],
    related: [
      "burst-balloons",
      "interval-dp",
      "huffman",
    ],
  },
  {
    slug: "burst-balloons",
    track: "dsa",
    category: "Dynamic Programming",
    title: "Burst Balloons",
    summary:
      "Think of the last balloon you burst in an open interval. dp[l][r] = max over k in (l,r) of nums[l]*nums[k]*nums[r] + dp[l][k] + dp[k][r].",
    depth: "advanced",
    whyItMatters:
      "This is the interval-DP interview that feels backwards until you recast 'last burst' instead of 'first burst.' First-burst thinking creates dependencies on a changing array. Last-burst thinking makes subintervals independent. That reframe is the lesson.",
    theory: [
      "Pad the array with 1 at both ends. dp[l][r] is the max coins from bursting all strictly between l and r, with l and r still alive (the walls). If k is the last balloon burst in (l,r), it sees walls l and r, so it contributes nums[l]*nums[k]*nums[r], and the two sides were already solved independently.",
      "Fill by increasing gap r-l so every strictly smaller open interval is already known. On the padded array the full problem is the interval between the two sentinels, which is dp[0][n+1] or dp[0][n-1] depending on how you index the pad.",
      "Top-down memo on (l,r) is often easier to write correctly than the triple loop, because you never have to worry about length order. The complexity is the same: each pair of walls and each last-burst k is O(n³).",
    ],
    howItWorks: [
      "vals = [1, ...nums, 1]. n = vals.length.",
      "for len=2..n-1: for l=0; l+len<n; l++: r=l+len; for k=l+1..r-1: dp[l][r] = max(dp[l][r], vals[l]*vals[k]*vals[r] + dp[l][k] + dp[k][r]).",
      "Return dp[0][n-1].",
    ],
    whenToUse: [
      "Last-event interval games: burst balloons, burst extra, some stone games.",
    ],
    whenNotToUse: [
      "You burst in a fixed order — then it is a simulation, not this DP.",
    ],
    complexity: {
      time: "O(n³)",
      space: "O(n²)",
    },
    interviewTips: [
      "Say 'k is the last balloon between the walls' before the loops.",
      "Pad with 1s; do not special-case the ends.",
    ],
    pitfalls: [
      "First-burst recurrence that needs the current neighbors — you will want a bitmask (n≤12) instead of interval DP, which is a different (worse) state.",
      "Forgetting the pad and multiplying by missing neighbors.",
    ],
    practiceIdeas: [
      "Burst Balloons.",
      "Minimum Cost to Cut a Stick (same last-cut idea).",
    ],
    related: [
      "matrix-chain",
      "interval-dp",
      "bitmask-dp",
    ],
  },
  {
    slug: "grid-dp",
    track: "dsa",
    category: "Dynamic Programming",
    title: "Grid DP",
    summary:
      "dp[r][c] from the top/left (or other incoming directions). Unique paths, min path sum, dungeon game, and falling path are one family.",
    depth: "core",
    whyItMatters:
      "Grid DP is how you walk a matrix without DFS+memo on every interview. Unique Paths, Min Path Sum, and Cherry Pickup (harder, two people / two paths) are the ladder. You must handle obstacles (zero out a cell), borders, and the rolling 1-D optimization. Do not BFS a min-sum grid with positive weights unless you Dijkstra — DP on DAG (only right/down) is enough.",
    theory: [
      "If you may only move right or down, the grid is a DAG and dp[r][c] = combine(dp[r-1][c], dp[r][c-1]) + cell. Unique paths: combine is +. Min path: combine is min. Obstacles: dp=0 or skip incoming.",
      "You can overwrite the input grid if they allow it, or roll a 1-D array of the current row. Dungeon game / max-min falling path change the combine but not the DAG.",
      "When you may move in all four directions, it is no longer a DAG. Then you need Dijkstra (min path with revisits) or DFS+memo with a different state, not a simple double loop.",
    ],
    howItWorks: [
      "Init first row/col as prefix sums or prefix products of ways.",
      "for r: for c: dp[r][c] = cell + min(up, left) (or + of ways).",
      "Return dp[m-1][n-1].",
    ],
    whenToUse: [
      "Acyclic grid moves (right/down, or down-only falling paths).",
    ],
    whenNotToUse: [
      "Four-direction min cost — Dijkstra / 0-1 BFS.",
    ],
    complexity: {
      time: "O(m n)",
      space: "O(m n) or O(n)",
    },
    interviewTips: [
      "Unique Paths II: treat obstacle as a hard 0 and do not add from it.",
      "Cherry Pickup: two tokens (r1,c1,r2) or (steps, r1, r2) — 3-D DP, still a DAG.",
    ],
    pitfalls: [
      "Uninitialized first row when left is the only incoming.",
      "Using DFS without memo on a large grid.",
    ],
    practiceIdeas: [
      "Unique Paths I/II; Minimum Path Sum.",
      "Triangle; Falling Path Sum; Dungeon Game.",
    ],
    related: [
      "edit-distance",
      "floyd-warshall",
      "dijkstra",
    ],
  },
  {
    slug: "interval-dp",
    track: "dsa",
    category: "Dynamic Programming",
    title: "Interval DP",
    summary:
      "dp[l][r] depends on smaller intervals. Enumerate length, then l, then a split. Matrix chain, burst balloons, palindrome cuts, and stone games share this loop nest.",
    depth: "next",
    whyItMatters:
      "Interval DP is a pattern name you should say in interviews. Once the state is 'this subarray / this substring,' and the last action splits it, you are here. The skill is proving that smaller intervals do not depend on larger ones, then filling by length. Wrong loop order is the silent bug.",
    theory: [
      "Typical state: the segment [l, r] already isolated from the rest (walls, remaining stones, remaining string). Transition: last cut / last burst / last merge of two adjacent pieces. Cost combines dp[l][k] and dp[k+1][r] plus a local cost of the last action.",
      "Always iterate len from 1 to n, l from 0 to n-len, r = l+len-1, then k in between. Top-down memo(l,r) avoids the loop-order issue at the cost of recursion.",
      "If the last action is not a split (e.g. you only care about endpoints), you might have a simpler 1-D DP. Do not jump to n³ until you need the split.",
    ],
    howItWorks: [
      "Write dp[l][r] meaning. Write the split recurrence and bases (len 1 or 2).",
      "Triple loop: length, l, split k.",
      "Answer is dp[0][n-1] (or the padded variant).",
    ],
    whenToUse: [
      "Optimal score / cost on a subarray with a last-split structure.",
    ],
    whenNotToUse: [
      "Merges of arbitrary pairs — Huffman.",
      "Linear 'ending at i' problems — 1-D DP.",
    ],
    complexity: {
      time: "O(n³) typical, sometimes O(n²) if the split is fixed or Knuth-optimized",
      space: "O(n²)",
    },
    interviewTips: [
      "Name the pattern, then specialize to the problem's last action.",
      "If n is 100, O(n³) is the intended budget. If n is 2000, you need O(n²).",
    ],
    pitfalls: [
      "Using uncomputed longer intervals.",
      "Off-by-one on inclusive/exclusive r.",
    ],
    practiceIdeas: [
      "Matrix chain; Burst Balloons; Palindrome Partitioning II.",
      "Stone Game interval variants; min cost to cut a stick.",
    ],
    related: [
      "matrix-chain",
      "burst-balloons",
      "palindrome-dp",
    ],
  },
  {
    slug: "bitmask-dp",
    track: "dsa",
    category: "Dynamic Programming",
    title: "Bitmask DP",
    summary:
      "When n ≤ 20, a subset is an integer mask. dp[mask] (and maybe a location) iterates over bits to add one element. TSP, assignment, and 'smallest sufficient team' live here.",
    depth: "advanced",
    whyItMatters:
      "Bitmask DP is the CP/interview move when subsets are the state and n is tiny. Travelling salesman (n≤16), assignment problem, and 'max score after n operations' (n pairs) are the usual prompts. If you try n! backtracking you TLE; if you try n=30 you need meet-in-the-middle. Knowing the size limit is part of knowing the technique.",
    theory: [
      "A mask of n bits has 2^n values. dp[mask] = best way to process exactly the set bits. Transition: for each bit i in mask, try dp[mask ^ (1<<i)] + cost(i | context). Sometimes the extra state is 'last city' (TSP: dp[mask][i]) so you know the edge you pay.",
      "Iterate masks in order of increasing bit-count, or loop mask from 0..2^n-1 and only use submasks already computed (mask ^ (1<<i) < mask if you iterate upward and i is set). Submask enumeration (for sub in mask) is 3^n and solves 'partition into groups' style problems.",
      "This is still 0/1 knapsack on 'which items,' just with n small enough that 2^n replaces a large capacity dimension — or complements it (dp[mask][cap] is rare and heavy).",
    ],
    howItWorks: [
      "n = nums.length; dp = Array(1<<n).fill(INF); dp[0]=0;",
      "for mask in 0..(1<<n)-1: for i in 0..n-1: if mask has i, relax dp[mask] from dp[mask without i].",
      "TSP: add a last-city index; from mask,i go to j not in mask.",
    ],
    whenToUse: [
      "n ≤ 20 subset states; TSP-like tours; pairing / assignment.",
    ],
    whenNotToUse: [
      "n = 40 — meet-in-the-middle or a different DP.",
      "n = 100 — this will not run.",
    ],
    complexity: {
      time: "O(n 2^n) or O(n² 2^n) for TSP",
      space: "O(2^n) or O(n 2^n)",
    },
    interviewTips: [
      "Say the n limit out loud. Then define mask.",
      "Shortest Path Visiting All Nodes is TSP on a small graph — BFS on (mask, node).",
    ],
    pitfalls: [
      "Off-by-one in bit tests; using signed 32-bit for n=32 (use 64 or n≤20).",
      "Forgetting dp[0] base.",
      "Enumerating 2^n * 2^n instead of 3^n submasks when needed.",
    ],
    practiceIdeas: [
      "Assignment / min cost to hire n workers.",
      "Shortest Path Visiting All Nodes.",
      "Maximum Students Taking Exam (bitmask on rows).",
    ],
    related: [
      "bitmask-subsets",
      "knapsack-01",
      "recursion-memo",
      "bfs",
    ],
  },
  {
    slug: "tree-dp",
    track: "dsa",
    category: "Dynamic Programming",
    title: "Tree DP",
    summary:
      "Postorder: a node's answer from its children's answers. House Robber III, diameter, and rerooting (compute for every root in two DFS) are the templates.",
    depth: "advanced",
    whyItMatters:
      "Once the graph is a tree, DP is natural because removing a node splits independent subtrees. Interviewers use House Robber III, binary tree cameras, and 'sum of distances in tree' (reroot). If you memoize a DAG of (node, parent-used), you are already doing tree DP even if you call it DFS+memo.",
    theory: [
      "Typical return: a small tuple from each subtree — (take, skip), (height, diameter), (size, sum). Combine children with the problem's constraint (cannot take two adjacent, etc.). Root the tree anywhere if it is undirected; pass parent to avoid walking back.",
      "Rerooting: first DFS computes answers for a fixed root (downward). Second DFS moves the root to a child by subtracting that child's contribution and adding the 'rest of the tree' as a virtual child. Sum of Distances in Tree is the standard problem.",
      "On binary trees you can hardcode left/right. On n-ary adjacency lists, loop children. Do not run Floyd on a tree.",
    ],
    howItWorks: [
      "dfs(u, parent): for each child !== parent, collect dfs(child). Combine into a tuple for u. Optionally update a global.",
      "Reroot: dfs2(u, parent, downFromParent): compute u's answer as if rooted at u, then recurse to children with the adjusted 'from parent' payload.",
    ],
    whenToUse: [
      "Optimal placement / independent set / distances on a tree.",
    ],
    whenNotToUse: [
      "General graphs with cycles — tree DP does not apply; you need different states (bitmask, SCC-DAG, etc.).",
    ],
    complexity: {
      time: "O(n) or O(n · |state per node|)",
      space: "O(n)",
    },
    interviewTips: [
      "House Robber III: return [rob, skip]. Cameras: return states covered / needs / has camera.",
      "If they ask the answer for every node, propose rerooting instead of n DFS.",
    ],
    pitfalls: [
      "Recursing to parent and infinite-looping on undirected trees.",
      "Combining children as if they were sequential houses (wrong constraint).",
    ],
    practiceIdeas: [
      "House Robber III; Binary Tree Cameras.",
      "Sum of Distances in Tree; maximum path sum as tree DP.",
    ],
    related: [
      "house-robber",
      "max-path-sum",
      "tree-height-diameter",
      "dfs",
    ],
  },
  {
    slug: "digit-dp",
    track: "dsa",
    category: "Dynamic Programming",
    title: "Digit DP",
    summary:
      "Count numbers ≤ N whose digits satisfy a property. DFS on (position, tight, leftover-state) with memo. Tight says you are still prefix-matching N.",
    depth: "advanced",
    whyItMatters:
      "Digit DP is how you answer 'how many numbers in [L, R] have digit-sum k / no repeated digits / are beautiful' without iterating the range. It shows up in harder interviews and contests. The tight flag is the idea: until you choose a digit smaller than the bound's digit, you are constrained; after that, later digits are free 0–9.",
    theory: [
      "Write N as a digit array. dfs(i, tight, state): place a digit at position i. If tight, the max you may place is digits[i]; else 9. Recurse with newTight = tight && (d === maxDigit). state tracks what the problem cares about (sum so far, mask of used digits, remainder mod m, already-nonzero flag for leading zeros).",
      "Leading zeros: an isNum / started flag so that leading zeros do not mark digits as used or add to a 'first digit' constraint. Count(R) - Count(L-1) gives a range.",
      "Memo key is (i, tight, state, started). |i| ≤ 20 for 64-bit N, so the table is small if state is small. This is not for properties that need the whole numeric value besides a small modulus.",
    ],
    howItWorks: [
      "count(num): digits = decimal digits of num. memoized dfs(0, true, zeroState, false).",
      "Answer = count(R) - count(L-1), careful when L=0.",
      "Always implement count(N) on paper for N=20 before trusting the flags.",
    ],
    whenToUse: [
      "Count (or sum) of integers in a numeric range with digit constraints.",
    ],
    whenNotToUse: [
      "The range is tiny — brute force.",
      "The property is not a function of digits / small state — different tools.",
    ],
    complexity: {
      time: "O(length × |state| × 10)",
      space: "same for the memo",
    },
    interviewTips: [
      "Numbers At Most N Given Digit Set is a gentle version (sometimes combinatorics without full digit DP).",
      "Say 'tight and leading zero' before you write the signature.",
    ],
    pitfalls: [
      "Forgetting Count(L-1) or L=0.",
      "Treating leading zeros as used digits.",
      "Not memoizing tight (or memoizing incorrectly so different tights share a cell).",
    ],
    practiceIdeas: [
      "Count numbers with unique digits in [1, n].",
      "Digit DP for digit-sum = k in [L, R].",
      "Numbers At Most N Given Digit Set.",
    ],
    related: [
      "recursion-memo",
      "bitmask-dp",
      "modular-arithmetic",
    ],
  },
];
