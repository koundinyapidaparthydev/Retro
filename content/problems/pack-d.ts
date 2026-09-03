import { problem, type ProblemCard } from "./types";

export const PACK: Record<string, ProblemCard> = {
  kmp: problem(
    "A long text and a shorter pattern.",
    "Every index where the pattern starts. After a mismatch, do not rewind the text.",
    `"ababcabc" / "abc" → starts at 2 and 5.`,
    [
      "Find the first or every occurrence of a pattern.",
      "Is the string a repeat of one substring?",
      "Fewest characters to add in front to make a palindrome.",
    ],
  ),
  "rabin-karp": problem(
    "A text and a pattern of the same window length (or many equal-length windows).",
    "Which windows match? Compare a rolling hash, then verify the raw slice.",
    `"abcabc" / "cab" → match at index 2.`,
    [
      "Does this pattern appear in the text?",
      "All 10-letter DNA snippets that show up more than once.",
      "Longest substring that appears at least twice.",
    ],
  ),
  "z-algorithm": problem(
    "A string s.",
    "At every index i, how far s[i..] matches the prefix of s. Use that to search a pattern.",
    `"aabxaayaab" — the final "aab" matches the prefix for length 3.`,
    [
      "How long does the prefix match at each starting index?",
      "Find a pattern from those prefix-match lengths.",
      "How many times does the prefix occur as a substring?",
    ],
  ),
  manacher: problem(
    "A string.",
    "The longest contiguous palindrome — or the count of palindromic substrings.",
    `"babad" → "bab" or "aba". "cbbd" → "bb".`,
    [
      "Longest palindromic substring.",
      "How many palindromic substrings are there?",
      "n is huge — faster than expanding around every center.",
    ],
  ),
  "trie-search": problem(
    "A dictionary of words, then prefix queries or a letter grid.",
    "Does this word exist? What starts with this prefix? Which dictionary words sit on the board?",
    `dict {app, apple, apply}; prefix "app" → all three. A board with A,P,P,L,E can yield "apple".`,
    [
      "Autocomplete every word that starts with this prefix.",
      "Replace each word with the shortest dictionary root.",
      "Find every dictionary word on a letter grid.",
    ],
  ),
  "sliding-window-strings": problem(
    "A string s, and sometimes a target string t.",
    "The shortest window that covers t, or the longest window with no repeats / at most k distinct letters.",
    `s="ADOBECODEBANC", t="ABC" → "BANC". "abcabcbb" with no repeats → "abc".`,
    [
      "Smallest window that contains every character of t.",
      "Longest substring without repeating characters.",
      "Find every anagram of a word inside a longer string.",
    ],
  ),
  "suffix-array": problem(
    "A fixed text you will query many times, or one string looking for repeats.",
    "All suffixes in sorted order (as start indices). Then find a pattern or the longest repeated substring.",
    `"banana" — longest substring that appears twice is "ana".`,
    [
      "Find every occurrence of a pattern in a fixed document.",
      "Longest substring that appears at least twice.",
      "How many distinct substrings does this string have?",
    ],
  ),
  "suffix-tree": problem(
    "A text (or two texts) you will query for substrings.",
    "Does this pattern appear? How many times? What is the longest shared stretch of two strings?",
    `"banana$" / "ana" → present twice (starts 1 and 3).`,
    [
      "Does this pattern appear, in time proportional to the pattern only?",
      "Longest common substring of two long strings.",
      "Where do all repeats of a substring sit?",
    ],
  ),
  "aho-corasick": problem(
    "Many keywords and one stream of text.",
    "Every place any keyword appears, in a single pass over the text.",
    `keywords {he, she, his, hers}, text "ushers" → she, he, hers.`,
    [
      "Highlight every dictionary word in a long article.",
      "A character stream — report each keyword the moment it ends.",
      "Many signatures, one file — report every hit.",
    ],
  ),
  "bit-set-unset-toggle": problem(
    "An integer n and a bit index k (LSB is 0).",
    "Turn bit k on, off, or flip it, without touching the other bits.",
    "n=5 (101), k=1 → set 7 (111), clear 5 (101), toggle 7 (111).",
    [
      "Set, clear, or flip bit k.",
      "Is bit k on?",
      "Pack a handful of flags into one word.",
    ],
  ),
  "count-bits": problem(
    "An integer n, or every integer from 0 to n.",
    "How many 1-bits each number has.",
    "13 is 1101 → 3 ones. For 0..5 the counts are [0,1,1,2,1,2].",
    [
      "Number of 1 bits in n.",
      "Hamming distance between two integers.",
      "The 1-bit count for every number from 0 to n.",
    ],
  ),
  "xor-tricks": problem(
    "An array where every value appears twice except one (or two), or 0..n with one missing.",
    "The leftover unique value(s), in linear time and constant extra space.",
    "[4,1,2,1,2] → 4. [0,1,3] missing in 0..3 → 2.",
    [
      "Every number appears twice except one — find it without a hash set.",
      "Two numbers appear once; the rest twice. Find both.",
      "Find the missing number in 0..n.",
    ],
  ),
  "bitmask-subsets": problem(
    "A set of n items, n small (about 15–20).",
    "Visit every subset — or every split of a subset — as an integer mask.",
    "{a,b,c} → 8 masks; 0b101 is {a,c}.",
    [
      "List every subset of n items.",
      "Split a chosen set into two groups — visit every split.",
      "From a used-mask, try adding one unused item.",
    ],
  ),
  kernighan: problem(
    "An integer n.",
    "Drop or isolate the lowest 1-bit so you can count ones or walk only the bits that are on.",
    "0b10110 → drop lowest 1 → 0b10100; isolate it → 0b00010. 8 is a power of two; 12 is not.",
    [
      "Is n a power of two?",
      "Count the 1-bits without scanning all 32 positions.",
      "Walk only the bits that are set.",
    ],
  ),
  "euclid-gcd": problem(
    "Two integers a and b.",
    "Their greatest common divisor and LCM. Optionally integers x, y with ax + by = gcd.",
    "gcd(48, 18) = 6, lcm = 144. Jugs of 3 and 5 can measure 4 because gcd = 1.",
    [
      "GCD and LCM of two numbers.",
      "Can these two jugs measure exactly z liters?",
      "Find x and y so that ax + by equals the gcd.",
    ],
  ),
  sieve: problem(
    "An integer n (often up to 10^6).",
    "Every prime ≤ n, or the smallest prime factor of every number ≤ n.",
    "n=10 → 2, 3, 5, 7. 1 is not prime.",
    [
      "How many primes are there ≤ n?",
      "List all primes up to n.",
      "Smallest prime factor of every number from 2 to n.",
    ],
  ),
  "modular-arithmetic": problem(
    "Huge counts that must come back modulo m (often 10^9+7).",
    "Add, subtract, multiply, and divide in that ring — divide means multiply by an inverse.",
    "(5 − 8) mod 7 = 4, not −3. 6/2 mod 7 = 3. You cannot integer-divide after reducing.",
    [
      "Return the answer modulo 10^9+7.",
      "How do you divide by 2 when the answer is a residue?",
      "A subtraction goes negative before the mod — what do you return?",
    ],
  ),
  "fast-exponentiation": problem(
    "A base a and a huge exponent e (maybe 10^18), optionally a modulus.",
    "a^e (mod m) with far fewer than e multiplications.",
    "3^13 = 3^8 · 3^4 · 3^1 — a few squares, not thirteen multiplies.",
    [
      "Compute x^n when n is a 32-bit integer, including negative n.",
      "a^e mod m for e up to 10^18.",
      "The nth Fibonacci number in logarithmic time.",
    ],
  ),
  factorization: problem(
    "One integer n, or many n up to a cap.",
    "The prime factors — then divisor count, the full divisor list, or φ(n).",
    "60 = 2² · 3 · 5. Divisors of 12: 1, 2, 3, 4, 6, 12.",
    [
      "Factor n and list all of its divisors.",
      "How many divisors does n have?",
      "Factor every number from 1 to N.",
    ],
  ),
  "ncr-mod-inverse": problem(
    "Many queries “n choose r”, n up to 10^6, answers modulo a prime.",
    "C(n, r) mod p without overflowing or using integer division.",
    "C(5, 2) = 10. C(5, 2) mod 7 = 3. C(n, r) = 0 when r > n.",
    [
      "n choose r modulo 10^9+7, many queries.",
      "Number of paths on an empty grid.",
      "C(2n, n) / (n+1) modulo a prime.",
    ],
  ),
  catalan: problem(
    "n pairs of parentheses, n labeled keys, or a convex polygon.",
    "How many valid structures — matched parentheses, unique BSTs, triangulations.",
    "3 pairs → 5 strings. 3 BST keys → 5 trees.",
    [
      "How many valid parentheses strings of n pairs?",
      "How many unique BSTs on n keys?",
      "Ways to triangulate a convex (n+2)-gon.",
    ],
  ),
  "segment-tree": problem(
    "An array. You change single cells and ask range sums, mins, or gcds.",
    "Each update and each range answer in logarithmic time.",
    "[1, 3, 5, 7], sum of [1, 2] = 8; set index 1 to 4; that sum becomes 9.",
    [
      "Range sum or min after point updates.",
      "Count of smaller numbers after self.",
      "How many inversions?",
    ],
  ),
  fenwick: problem(
    "An array. Point adds and prefix or range sums.",
    "Add to one index and read a prefix fast. Range [l, r] is prefix(r) − prefix(l−1).",
    "[1, 2, 3, 4], add +5 at index 2 → [1, 7, 3, 4]; sum of [2, 4] = 14.",
    [
      "Point add, then range sum.",
      "Count inversions with a frequency table.",
      "Range add, then point reads.",
    ],
  ),
  "sparse-table": problem(
    "An array that never changes. Many range-min (or max, gcd) queries.",
    "Each query in constant time after a one-time build.",
    "[2, 5, 1, 4, 3], min of indices 1..3 → min(5, 1, 4) = 1.",
    [
      "Static range minimum.",
      "Range gcd on an immutable array.",
      "Lowest common ancestor after an Euler tour — min of a static list.",
    ],
  ),
  "lazy-propagation": problem(
    "An array. You add (or assign) a value on a whole range, then ask range sums or mins.",
    "Range update and range query, both logarithmic — do not walk every cell.",
    "[1, 2, 3, 4], add 5 to [2, 4] → [1, 7, 8, 9]; sum of [2, 3] = 15.",
    [
      "Add v to every index in [L, R], then sum a range.",
      "Assign every index in [L, R] to v, then ask the min.",
      "Why is updating cell by cell too slow here?",
    ],
  ),
  "ordered-set": problem(
    "A live set of numbers: inserts, deletes, and rank questions.",
    "What is the k-th smallest? How many values are < x? Both in logarithmic time.",
    "{3, 1, 7, 5}: two values are < 5; 2nd smallest is 3. Delete 1 → 2nd is 5.",
    [
      "k-th smallest while numbers arrive and leave.",
      "How many values to the left are smaller?",
      "Median of a sliding window.",
    ],
  ),
  "persistent-segment-tree": problem(
    "An array and queries on historical prefixes — k-th smallest in A[L..R].",
    "Answer as if every past version of the structure were still around.",
    "A=[2, 1, 3, 1], 2nd smallest in [2, 4] (values 1, 3, 1) → 1.",
    [
      "k-th smallest value in subarray [L, R].",
      "How many values in [L, R] are ≤ X?",
      "Query an older snapshot after later updates.",
    ],
  ),
};
