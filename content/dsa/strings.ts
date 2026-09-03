import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "kmp",
    track: "dsa",
    category: "Strings",
    title: "KMP (Knuth–Morris–Pratt)",
    summary:
      "Build the longest proper prefix-suffix table (lps/pi) of the pattern, then match in one pass without rewinding the text. O(n+m) string search.",
    depth: "core",
    whyItMatters:
      "KMP is the linear-time pattern search you should be able to explain and code. Naive search is O(nm). Interviewers use 'implement strStr' and 'shortest palindrome' / 'repeated substring pattern' as LPS applications. If you only remember 'the pi array,' they will ask what pi[i] means when a mismatch happens — that sentence is the algorithm.",
    theory: [
      "lps[i] (also π[i]) is the longest proper prefix of pat[0..i] that is also a suffix of pat[0..i]. When you mismatch at pattern index j, you do not restart: you set j = lps[j-1] and try again, because that many characters are already known to match. The text index i never decreases.",
      "Building lps is KMP of the pattern against itself: i walks, j is the current border length. On match, j++, lps[i]=j. On mismatch, j = lps[j-1] until j=0. That is O(m).",
      "The same table detects 'is the string a repeat of a substring' (n % (n-lps[n-1]) === 0 and lps[n-1]>0) and helps shortest palindrome (KMP on s + # + reverse(s)). These follow-ups are more common than coding a full searcher from scratch.",
    ],
    howItWorks: [
      "Build lps of the pattern (length m).",
      "i=0 (text), j=0 (pattern). while i<n: if text[i]==pat[j], i++, j++, and if j==m record a hit and j=lps[j-1].",
      "Else if j>0, j=lps[j-1]; else i++.",
    ],
    whenToUse: [
      "Single pattern search in a long text; LPS-based string properties.",
    ],
    whenNotToUse: [
      "Many patterns — Aho–Corasick.",
      "Need the first hit in a tiny string — naive is fine.",
    ],
    complexity: {
      time: "O(n + m)",
      space: "O(m)",
    },
    interviewTips: [
      "Define lps[i] in words, then write the builder, then the search. Do not start in the middle.",
      "Repeated Substring Pattern is a two-line LPS check after you have the table.",
    ],
    pitfalls: [
      "Rewinding i on mismatch (that is naive, or a buggy KMP).",
      "lps of length m but indexed wrong on j===0.",
      "Using lps[j] instead of lps[j-1] after a hit.",
    ],
    practiceIdeas: [
      "Implement strStr / find all occurrences.",
      "Repeated Substring Pattern; Shortest Palindrome.",
      "Build lps for 'ababaca' by hand.",
    ],
    related: [
      "z-algorithm",
      "rabin-karp",
      "aho-corasick",
      "sliding-window-strings",
    ],
  },
  {
    slug: "rabin-karp",
    track: "dsa",
    category: "Strings",
    title: "Rabin–Karp",
    summary:
      "Rolling hash the pattern and every text window of the same length. Equal hashes are candidate matches you verify. Average linear, worst-case quadratic if you skip verification on a bad hash.",
    depth: "next",
    whyItMatters:
      "Rabin–Karp is the hashing approach to string search and the engine of 'repeated DNA,' 'longest duplicate substring,' and plagiarism-style window equality. Interviewers want the rolling update (subtract outgoing * base^{m-1}, multiply, add incoming) and a collision story. Two moduli make collisions astronomically rare; one modulus plus verify is the interview default.",
    theory: [
      "Treat a string as a base-B polynomial modulo M. A window hash updates in O(1): h = (h - out * B^{m-1}) * B + in, all mod M. If h equals the pattern hash, compare the raw strings (or accept the risk). With a random M and B, expected collisions per window are ~1/M.",
      "Double hashing (two (B,M) pairs) is what you use when n is 10^5 and verification of every hit would be too much if you had many false hits — or when you cannot afford a false positive at all and verification is awkward (hashes of huge windows used as map keys).",
      "Worst case is O(nm) if every window collides and you verify, or if you refuse to verify and you are wrong. Do not claim O(n) worst-case like KMP unless you use a deterministic string hash (rare in interviews).",
    ],
    howItWorks: [
      "Pick B=911382323, M=10^9+7 (or two pairs). Compute B^{m-1} % M.",
      "Hash the pattern and the first text window.",
      "For each i: if hashes equal, verify slice equality and record. Then roll to the next window.",
    ],
    whenToUse: [
      "Window equality, duplicate substrings, multi-pattern of equal length.",
      "Binary search on length + hash set for longest duplicate substring.",
    ],
    whenNotToUse: [
      "Need worst-case linear guaranteed — KMP / Z / Aho.",
      "Tiny alphabet bitwise tricks might be simpler.",
    ],
    complexity: {
      time: "O(n + m) expected; O(nm) worst with collisions + verify",
      space: "O(1) extra for one search",
    },
    interviewTips: [
      "Longest Duplicate Substring: binary search the length, rolling-hash a set of window hashes.",
      "Say you will verify on hash hit unless you use two 64-bit hashes and accept the risk.",
    ],
    pitfalls: [
      "Negative modulo after subtraction — add M before %.",
      "Overflow if you do not use bigint / modular mul.",
      "Using M=2^64 implicitly via unsigned overflow without thinking about attacks (not an interview issue, but know it).",
    ],
    practiceIdeas: [
      "strStr via Rabin–Karp.",
      "Repeated DNA Sequences (10-mers).",
      "Longest Duplicate Substring.",
    ],
    related: [
      "kmp",
      "z-algorithm",
      "binary-search-on-answer",
      "design-hashmap",
    ],
  },
  {
    slug: "z-algorithm",
    track: "dsa",
    category: "Strings",
    title: "Z-Algorithm",
    summary:
      "Z[i] is the longest substring starting at i that matches the prefix of the string. A linear scan with a maintained [L,R] match window computes the whole Z-box.",
    depth: "next",
    whyItMatters:
      "Z is KMP's sibling: linear prefix information, different layout. Pattern search is Z of (pattern + '#' + text); hits are Z[i] === m. Some people find Z more natural than LPS. Interviewers may ask you to construct Z and then use it for the same 'repeated prefix' family as KMP. Know one of KMP/Z cold and the other by idea.",
    theory: [
      "Maintain the rightmost window [L,R] that matches the prefix. For i inside the window, Z[i] is at least min(R-i+1, Z[i-L]) — you copy from the corresponding prefix position. If that value reaches R, you compare characters beyond R and extend. Each comparison that matches extends R, so total extra compares are O(n).",
      "Z[0] is often left 0 or n by convention; do not use it as a match. The separator character in pattern#text must not appear in either string (or be a char you know is unique).",
      "Z and prefix-function are interconvertible in linear time. String matching, period finding, and 'how many times does the prefix occur' are the usual tasks.",
    ],
    howItWorks: [
      "Z = zeros(n), L=R=0.",
      "for i=1..n-1: if i<=R Z[i]=min(R-i+1, Z[i-L]). while i+Z[i]<n and s[Z[i]]==s[i+Z[i]] Z[i]++. if i+Z[i]-1>R: L=i, R=i+Z[i]-1.",
      "Search: build Z(p+'#'+t); any i with Z[i]==p.length is a hit (in the text part).",
    ],
    whenToUse: [
      "Prefix-match lengths at every position; alternative to KMP search.",
    ],
    whenNotToUse: [
      "You already have KMP written and the problem is a single search — either is fine.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(n)",
    },
    interviewTips: [
      "If they say 'Z-array,' draw the [L,R] box and the copy from Z[i-L].",
      "Do not confuse Z[i] with lps[i]; they answer different questions.",
    ],
    pitfalls: [
      "Forgetting the min with R-i+1 and reading past the window.",
      "No unique separator, so the pattern eats into the text in the combined string.",
    ],
    practiceIdeas: [
      "Compute Z for 'aabxaayaab' by hand.",
      "Pattern search via Z.",
      "Minimum characters to add in front to make a palindrome (Z or KMP).",
    ],
    related: [
      "kmp",
      "manacher",
      "rabin-karp",
    ],
  },
  {
    slug: "manacher",
    track: "dsa",
    category: "Strings",
    title: "Manacher's Algorithm",
    summary:
      "Longest palindromic substring in O(n). Mirror radii inside a current palindrome window, then expand only when the mirror does not pin the answer.",
    depth: "advanced",
    whyItMatters:
      "Manacher is the 'do LPS in linear time' flex. Expand-around-center is O(n²) and enough for most interviews. If they forbid quadratic, or you are in a contest with n=10^6, this is the algorithm. The odd/even unification via separators (insert '#' between letters) is half the implementation.",
    theory: [
      "Build t = '^#a#b#a#$' so every palindrome in t is odd-length around a center. p[i] is the radius of the palindrome at i. Maintain the rightmost palindrome [center, right]. For i < right, p[i] starts as min(right-i, p[mirror]). Then expand while t[i-p-1]==t[i+p+1]. Update center/right if you went past right.",
      "Each expansion that succeeds moves right, so total expansions are O(n). The longest p[i] maps back to a substring of the original string by stripping '#' and the sentinels.",
      "You can get palindromic substring counts by summing radii (with care about '#'). Palindromic tree (Eertree) is the next structure; not an interview default.",
    ],
    howItWorks: [
      "Build the separated string t.",
      "p array, c=0, r=0. for i in 1..t.length-2: mirror=2c-i; if i<r p[i]=min(r-i, p[mirror]). while t[i-p[i]-1]==t[i+p[i]+1] p[i]++. if i+p[i]>r: c=i, r=i+p[i].",
      "Map the max radius back to s.",
    ],
    whenToUse: [
      "Longest palindromic substring in linear time; count palindromic substrings in linear time.",
    ],
    whenNotToUse: [
      "n is small — expand-around-center is clearer.",
      "You need subsequence palindromes — DP, not Manacher.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(n)",
    },
    interviewTips: [
      "Offer expand-around-center first. Mention Manacher if they ask for linear.",
      "The separator trick is the usual 'how do you handle even lengths?' answer.",
    ],
    pitfalls: [
      "Off-by-one mapping from t's center/radius back to s.",
      "Missing sentinels and expanding off the ends.",
      "Using Manacher for longest palindromic subsequence.",
    ],
    practiceIdeas: [
      "Longest Palindromic Substring via Manacher vs expand.",
      "Count palindromic substrings in O(n).",
    ],
    related: [
      "palindrome-dp",
      "z-algorithm",
      "kmp",
    ],
  },
  {
    slug: "trie-search",
    track: "dsa",
    category: "Strings",
    title: "Trie-Based Search",
    summary:
      "Walk a trie to answer prefix queries, autocomplete, and grid word search. The tree turns a dictionary into a state machine of prefixes.",
    depth: "core",
    whyItMatters:
      "Once you can implement a trie, the applications are the interviews: Replace Words, Implement Magic Dictionary, Word Search II, autocomplete systems. Searching a hash set cannot tell you 'no word starts with this prefix' without a scan. A trie node with no child for the next character is an immediate prune.",
    theory: [
      "search(word) is a walk that requires isWord at the end. startsWith is the same walk without that flag. Autocomplete is 'walk the prefix, then DFS/BFS the subtree collecting words,' optionally with a heap of top-k by frequency stored at nodes.",
      "Word Search II: insert all words, DFS the board, follow children, add a word when you hit isWord, and optionally unlink the word (or mark it used) to avoid duplicates. Prune empty subtrees after a word is found to speed up later starts.",
      "A bit trie (binary, MSB first) searches for the max XOR partner by preferring the opposite bit at each step. Same walk, binary alphabet. Do not allocate 26 children for that.",
    ],
    howItWorks: [
      "Build the trie from the dictionary.",
      "For a query, walk; abort on a missing child.",
      "For grid search, DFS with the current node pointer; mark board cells; restore.",
    ],
    whenToUse: [
      "Prefix queries, many-word grid search, XOR tries, autocomplete.",
    ],
    whenNotToUse: [
      "Exact membership only — hash set.",
      "Suffix queries — you want a suffix array / reversed trie / suffix tree.",
    ],
    complexity: {
      time: "O(L) per query after O(total chars) build",
      space: "O(total chars × pointers)",
    },
    interviewTips: [
      "Word Search II without a trie (run Word Search I per word) is the TLE they expect you to beat.",
      "Store the full word at the terminal node so you do not rebuild it from the path.",
    ],
    pitfalls: [
      "Forgetting to mark words used and returning duplicates.",
      "Not pruning the trie after a find, then TLE on dense boards (sometimes).",
    ],
    practiceIdeas: [
      "Implement Trie; Replace Words.",
      "Word Search II; Max XOR pair via bit trie.",
    ],
    related: [
      "trie",
      "word-search",
      "aho-corasick",
      "xor-tricks",
    ],
  },
  {
    slug: "sliding-window-strings",
    track: "dsa",
    category: "Strings",
    title: "Sliding Window on Strings",
    summary:
      "Variable or fixed windows with a char-count debt. Minimum window substring, longest without repeats, and find-all-anagrams are the same two-pointer plus a map.",
    depth: "core",
    whyItMatters:
      "This is the string form of the sliding-window chapter and one of the highest-frequency interview clusters. Minimum Window Substring is the hard template: a 'need' map and a 'missing' counter. If you can write that, longest substring with at most k distinct and permutation-in-string are easier special cases.",
    theory: [
      "Fixed window: window length equals the pattern length (anagrams, permutation). Slide, update counts, compare to the target signature in O(1) if you keep a 'matches' counter of how many letters currently have the right count.",
      "Variable window, shortest covering: grow r until the window is valid (missing==0), then shrink l while it stays valid, record the min, then shrink one more and continue. Variable window, longest valid: grow r, shrink until valid, record the max.",
      "The constraint must be monotonic in window size for this to work. 'Contains all chars of t (with multiplicity)' is monotonic. 'Equals t as a permutation' is a fixed-length special case. 'Is a palindrome' is not monotonic — do not window that.",
    ],
    howItWorks: [
      "Build need counts from t. missing = number of distinct required chars (or total units).",
      "For r in 0..n-1: include s[r] into have; if have hits need, missing--.",
      "While missing==0: record, exclude s[l], if have falls below need missing++, l++.",
    ],
    whenToUse: [
      "Contiguous substring constraints on character counts.",
    ],
    whenNotToUse: [
      "Subsequences (not contiguous). Non-monotonic predicates.",
    ],
    complexity: {
      time: "O(n) for a fixed alphabet",
      space: "O(Σ)",
    },
    interviewTips: [
      "Minimum Window Substring: write the missing counter, not a full map-equality each step.",
      "Longest substring without repeating: set + l, or last-seen index and jump l.",
    ],
    pitfalls: [
      "Updating the answer when the window is invalid.",
      "Decrementing a count you never incremented (characters not in t).",
      "Using `if` instead of `while` to shrink.",
    ],
    practiceIdeas: [
      "Minimum Window Substring; Longest Substring Without Repeating Characters.",
      "Find All Anagrams; Longest Repeating Character Replacement.",
    ],
    related: [
      "sliding-window-variable",
      "sliding-window-fixed",
      "frequency-map",
      "group-anagrams",
    ],
  },
  {
    slug: "suffix-array",
    track: "dsa",
    category: "Strings",
    title: "Suffix Array",
    summary:
      "The sorted list of all suffixes of s, usually stored as starting indices. With LCP (Kasai), you get longest repeated substring and many comparison queries in log time after n log n build.",
    depth: "advanced",
    whyItMatters:
      "Suffix arrays are the practical suffix structure in interviews/contests that will not ask you to build a suffix tree. Longest duplicate substring can be 'binary search + Rabin–Karp' or 'suffix array + max LCP.' If a strong interviewer asks how a search engine finds all occurrences of a pattern in a static text, this is a correct answer: binary search the suffix array.",
    theory: [
      "Naive: put all suffixes in an array and sort — O(n² log n) string compares. Doubling (prefix-doubling / Manber–Myers): rank suffixes by their first 2^k chars using previous ranks, O(n log² n). SA-IS is O(n) and not an interview implementation.",
      "LCP[i] = longest common prefix of the suffixes at SA[i] and SA[i-1]. Kasai computes LCP in O(n) given SA. The longest repeated substring is the max LCP. The number of distinct substrings is n(n+1)/2 - sum LCP.",
      "Pattern search: the suffixes that start with P form a range in SA. Two binary searches (lower/upper bound with string compare) find that range in O(|P| log n).",
    ],
    howItWorks: [
      "Build SA (naive sort is OK for n ≤ a few thousand in an interview; mention doubling).",
      "Optional Kasai LCP.",
      "Queries: binary search SA, or read max LCP.",
    ],
    whenToUse: [
      "Static text, many pattern queries; longest repeated substring; distinct substring count.",
    ],
    whenNotToUse: [
      "Single short search — KMP.",
      "You need the full suffix-tree topology (suffix links) — suffix tree or SAM.",
    ],
    complexity: {
      time: "O(n log n) typical build; O(|P| log n) search",
      space: "O(n)",
    },
    interviewTips: [
      "For longest duplicate, prefer binary search + rolling hash unless they named suffix arrays.",
      "Define SA[i] as an index, not a copied string — copying suffixes is O(n²) memory.",
    ],
    pitfalls: [
      "Storing suffix strings instead of indices.",
      "Off-by-one in Kasai's inverse SA.",
    ],
    practiceIdeas: [
      "Build SA naively and binary-search a pattern.",
      "Longest repeated substring via max LCP.",
    ],
    related: [
      "suffix-tree",
      "rabin-karp",
      "kmp",
      "z-algorithm",
    ],
  },
  {
    slug: "suffix-tree",
    track: "dsa",
    category: "Strings",
    title: "Suffix Tree",
    summary:
      "A compressed trie of all suffixes. Ukkonen's algorithm builds it in O(n). Powerful, rarely coded in interviews; know what queries it answers in O(|P|).",
    depth: "advanced",
    whyItMatters:
      "Suffix trees are the theoretical endgame of string matching: after O(n) build, a pattern is found in O(|P|), LCS of two strings is a longest common path in a generalized tree, and repeated substrings sit at deep internal nodes. You will almost never implement Ukkonen on a whiteboard. You should know the structure, that a suffix array + LCP is the lightweight substitute, and that a suffix automaton is another linear option.",
    theory: [
      "Start from a trie of all suffixes (O(n²) nodes worst case) and compress unary paths into labeled edges. Internal nodes correspond to repeated prefixes of suffixes — i.e. repeated substrings. A leaf represents one suffix (often identified by its start index).",
      "Ukkonen builds this online in O(n) using suffix links (from the node for string xa to the node for a). The details are a paper, not a 20-minute interview. Generalized suffix trees concatenate two strings with unique sentinels so LCS becomes the deepest node with leaves from both strings.",
      "In practice, suffix arrays + RMQ on LCP simulate most suffix-tree queries with better constants and simpler code.",
    ],
    howItWorks: [
      "Conceptual build: insert every suffix into a compressed trie (too slow; only for teaching n≈10).",
      "Query: walk the pattern along unique edge labels; stop on mismatch (absent) or at a node/edge (present). Occurrences = number of leaves in that subtree.",
      "Prefer SA+LCP in code unless a library exists.",
    ],
    whenToUse: [
      "Explaining linear-time 'all substring' indexes; LCS of two long strings in theory.",
    ],
    whenNotToUse: [
      "Whiteboard implementations — use SA, Z, KMP, or rolling hash.",
    ],
    complexity: {
      time: "O(n) build (Ukkonen), O(|P|) search",
      space: "O(n) nodes/edges with careful implementation",
    },
    interviewTips: [
      "If they ask 'how would Google index a document for substring search?' say suffix array/tree, then offer SA as what you would code.",
      "Do not start writing Ukkonen unless they insist and you have time.",
    ],
    pitfalls: [
      "Confusing suffix tree with a trie of words (different purpose).",
      "Claiming you will implement it in O(n) in the next ten minutes.",
    ],
    practiceIdeas: [
      "Draw the suffix tree of 'banana$' by hand.",
      "Solve longest common substring of two strings with a generalized SA instead.",
    ],
    related: [
      "suffix-array",
      "trie",
      "aho-corasick",
      "z-algorithm",
    ],
  },
  {
    slug: "aho-corasick",
    track: "dsa",
    category: "Strings",
    title: "Aho–Corasick",
    summary:
      "A trie of all patterns plus failure links (KMP on the trie). One scan of the text reports every occurrence of every pattern in O(n + hits + build).",
    depth: "advanced",
    whyItMatters:
      "When you have many patterns (a dictionary) and one text, running KMP per pattern is O(n · Σ|p|). Aho–Corasick builds an automaton once and streams the text. Word-break-like dictionary matching, virus-signature scanners, and 'replace all keywords' are the story. Interviews rarely require a full implementation; they do require you to name it when Word Search II or multi-pattern comes up at scale.",
    theory: [
      "Build a trie of patterns, terminals marked with pattern ids. Failure link of a node is the longest proper suffix of its string that is still a prefix in the trie — BFS from the root, like KMP's lps but on nodes. Output links chain terminals so you can report overlapping hits without walking the whole fail chain every time.",
      "Matching: start at root, for each text char follow the child or fail until you can, then follow output links. Each character amortizes to O(1) or O(Σ) depending on the child representation.",
      "This is the multi-pattern upgrade of KMP and the automaton view of a dictionary. Suffix automata and AC automata are different machines; do not mix the names.",
    ],
    howItWorks: [
      "Insert all patterns into a trie.",
      "BFS: for each node, set fail to fail(parent)'s corresponding child (or root). Merge output lists.",
      "Walk the text; at each node emit all outputs on the output chain.",
    ],
    whenToUse: [
      "Many patterns, one text; dictionary matching; streaming keyword detection.",
    ],
    whenNotToUse: [
      "One pattern — KMP.",
      "Grid paths — trie + DFS (Word Search II), not AC, unless the 'text' is a path set you flatten.",
    ],
    complexity: {
      time: "O(total pattern chars × Σ + n + number of matches)",
      space: "O(total pattern chars × Σ)",
    },
    interviewTips: [
      "If they say 'a million keywords in a stream,' Aho–Corasick is the namedrop. Then discuss build vs scan.",
      "For a coding interview with < 20 words, a trie plus linear search of the text at each index may be enough.",
    ],
    pitfalls: [
      "Not following failure links on a missing child — you drop later patterns that start mid-window.",
      "Reporting only the terminal at the current node and missing a shorter pattern that ends there (need output links).",
    ],
    practiceIdeas: [
      "Multi-pattern search on a short text by hand (fail links drawn).",
      "Implement AC for lowercase words and test overlapping hits ('he', 'she', 'his', 'hers').",
    ],
    related: [
      "kmp",
      "trie",
      "trie-search",
      "word-search",
    ],
  },
];
