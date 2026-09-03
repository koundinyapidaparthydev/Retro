import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "bit-set-unset-toggle",
    track: "dsa",
    category: "Bit Manipulation",
    title: "Set, Unset, and Toggle Bits",
    summary:
      "OR with a shifted 1 to set, AND with its complement to clear, XOR to flip. Masks are how you treat an integer as a small set or a packed flag word.",
    depth: "core",
    whyItMatters:
      "Every later bit trick assumes you can turn a bit on, off, or over without touching neighbors. Interviews start here on 'single number' warmups and on status-flag questions. If you write `n += 1<<k` to set a bit you will corrupt already-set bits. The mask `1<<k` (or `1n<<k` for 64-bit in JS) is the primitive.",
    theory: [
      "Bit k of n is on iff n & (1<<k) !== 0. Set: n | (1<<k). Clear: n & ~(1<<k). Toggle: n ^ (1<<k). Replace a bit with a value b: clear then OR (b<<k). These are branchless and O(1).",
      "In JavaScript, bitwise operators coerce to 32-bit signed integers. 1<<31 is negative. For bits 0..31 use >>>0 when you need unsigned; for bigger sets use BigInt. In Java, 1<<31 is still fine for a sign bit but shifting by 32 is masked to 0 — know your language's shift width.",
      "A bitmask is a set: OR is insert, AND-NOT is delete, AND is membership, XOR is symmetric difference. That is why subset DP and 'used columns in N-Queens' speak this language.",
    ],
    howItWorks: [
      "Decide 0-based k from the right (LSB is 0) unless the problem says otherwise.",
      "Build mask = 1 << k (watch the type).",
      "Apply |, &, ~, ^ as required. Return the new int; integers are immutable in the usual languages so you reassign.",
    ],
    whenToUse: [
      "Flags, packed fields, small-set representations, interview 'manipulate bit k.'",
    ],
    whenNotToUse: [
      "You need an actual set of large integers — a hash set, not a 32-bit word.",
    ],
    complexity: {
      time: "O(1)",
      space: "O(1)",
    },
    interviewTips: [
      "Say 'LSB is bit 0' before shifting. Draw an 8-bit example.",
      "Prefer named helpers set/clear/toggle in longer problems so the main logic stays readable.",
    ],
    pitfalls: [
      "1<<k when k≥32 in 32-bit land.",
      "Using + or - to set/clear and failing when the bit is already on/off.",
      "~n in JS producing a negative 32-bit value you then use as a size.",
    ],
    practiceIdeas: [
      "Implement get/set/clear/toggle and test against binary strings.",
      "Reverse bits of a 32-bit word; swap two bit ranges.",
    ],
    related: [
      "count-bits",
      "xor-tricks",
      "bitmask-subsets",
      "kernighan",
    ],
  },
  {
    slug: "count-bits",
    track: "dsa",
    category: "Bit Manipulation",
    title: "Counting Set Bits",
    summary:
      "Kernighan clears one set bit per loop. Hardware popcount is O(1). The DP counting-bits problem uses dp[i] = dp[i>>1] + (i&1).",
    depth: "core",
    whyItMatters:
      "Hamming weight shows up as 'number of 1 bits,' as a loop bound (iterate only set bits), and as Counting Bits (LeetCode 338) — a DP that interviewers like because it is not a nested popcount. You should know the naive 32-step scan, the Kernighan n&(n-1) loop, and the language's built-in (bitCount, popcount, __builtin_popcount).",
    theory: [
      "The naive loop tests each of 32/64 positions. Kernighan's algorithm repeats n = n & (n-1) until n is 0; each step kills the lowest set bit, so you loop popcount(n) times. That is also how you iterate set bits: the lowest is n & -n (two's complement).",
      "For all i in 0..n, dp[i] = dp[i>>1] + (i&1) (shift drops LSB, add it back if it was 1). Equivalent: dp[i] = dp[i&(i-1)]+1. Both are O(n) to fill the array, better than O(n · 32) if they asked for the whole table.",
      "Parity (xor of bits) is popcount mod 2 and can be folded by x ^= x>>16; … ; x&1. Mention it; do not invent it under time pressure unless you know it.",
    ],
    howItWorks: [
      "Single n: c=0; while n: n&=n-1; c++. return c.",
      "Table: for i=1..n: dp[i]=dp[i>>1]+(i&1).",
      "Prefer Integer.bitCount / __builtin_popcount when allowed.",
    ],
    whenToUse: [
      "Hamming weight, Hamming distance (popcount of XOR), bulk tables of popcounts.",
    ],
    whenNotToUse: [
      "You only need 'is n a power of two' — n>0 && (n&(n-1))===0, no count.",
    ],
    complexity: {
      time: "O(popcount) Kernighan; O(1) hardware; O(n) for the 0..n table",
      space: "O(1) or O(n) for the table",
    },
    interviewTips: [
      "Hamming Distance is popcount(x^y). Counting Bits is the DP, not n calls to popcount unless n is tiny.",
    ],
    pitfalls: [
      "Infinite loop if you write n = n-1 without the AND (negatives in JS 32-bit).",
      "Forgetting n=0 is 0 bits.",
    ],
    practiceIdeas: [
      "Number of 1 Bits; Hamming Distance; Counting Bits.",
      "Iterate all set-bit indices of a mask.",
    ],
    related: [
      "kernighan",
      "xor-tricks",
      "bit-set-unset-toggle",
    ],
  },
  {
    slug: "xor-tricks",
    track: "dsa",
    category: "Bit Manipulation",
    title: "XOR Tricks",
    summary:
      "XOR is associative, commutative, and its own inverse. x^x=0, x^0=x. That is why XOR of a range finds the unique single number and why you can swap without a temp.",
    depth: "core",
    whyItMatters:
      "Single Number (every element twice except one) is the XOR interview. Single Number II/III, missing number, and 'find the extra character' are the family. If you reach for a hash set you pass, then they say O(1) space. XOR is the tool. You should also know you cannot recover two missing numbers with one XOR without a further partition on a differing bit.",
    theory: [
      "XOR-ing a list is the parity of counts per bit. Values that appear twice cancel. The leftover is the unique (or the XOR of the uniques). Missing number in 0..n is XOR of all indices and all values.",
      "Two uniques (Single Number III): XOR everything to get a^b. Find a bit where a and b differ (lowbit of a^b). Partition the array by that bit and XOR each side — the two uniques fall into different sides, pairs still cancel.",
      "Swap: a^=b; b^=a; a^=b. Cute, dangerous if a and b are the same location. Prefer a temp in real code. XOR linked lists (store prev^next) are a curiosity, not an interview target.",
    ],
    howItWorks: [
      "Single unique: acc=0; for x of a: acc^=x; return acc.",
      "Missing: acc = n; for i,x: acc ^= i^x.",
      "Two uniques: xor all, mask = xor & -xor, split XORs.",
    ],
    whenToUse: [
      "Even-count cancellations, missing/extra in a permutation, partition by a bit.",
    ],
    whenNotToUse: [
      "You need the values that appeared an odd time when there are many — a map, or a bit-count array for 'all appear 3× except one.'",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1)",
    },
    interviewTips: [
      "Single Number II (triples): count bits mod 3, or a finite-state machine on bits. Mention both.",
      "Do not XOR-swap on the whiteboard unless they ask; it looks clever and fails on aliasing.",
    ],
    pitfalls: [
      "Assuming XOR finds a duplicate (it finds a leftover parity, not a value that appeared twice).",
      "Using + for missing number and overflowing; XOR does not need a sum.",
    ],
    practiceIdeas: [
      "Single Number I, II, III.",
      "Missing Number; Find the Difference (strings).",
    ],
    related: [
      "count-bits",
      "kernighan",
      "bit-set-unset-toggle",
      "trie-search",
    ],
  },
  {
    slug: "bitmask-subsets",
    track: "dsa",
    category: "Bit Manipulation",
    title: "Bitmask Subsets",
    summary:
      "Enumerate all 2^n subsets as integers 0..(1<<n)-1. Iterate set bits, walk submasks, and build next-masks. The implementation layer under bitmask DP.",
    depth: "next",
    whyItMatters:
      "If n is 15, a mask loop is cleaner than recursion. Interviews (and contests) expect you to write `for (mask = 0; mask < (1<<n); mask++)` and then, inside, loop i where `(mask>>i)&1`. Submask enumeration (`for (sub=mask; sub; sub=(sub-1)&mask)`) is the 3^n trick for 'split this set.' This topic is how those loops work, not the DP recurrences themselves.",
    theory: [
      "Each mask is a subset. Union is |, intersection &, difference &~, complement ((1<<n)-1) ^ mask. Size is popcount. The next subset in Gray code flips one bit (useful when you want adjacent subsets to differ by one insert/delete).",
      "Submasks of mask: start at mask, then sub = (sub-1) & mask until 0. Include 0 separately. This visits each submask once. Over all masks, that is 3^n, because each bit is (in mask not sub / in both / in neither).",
      "Supersets of a small mask can be enumerated by iterating bits you OR in. For n>20, 2^n does not fit in time; stop.",
    ],
    howItWorks: [
      "for mask in 0..(1<<n)-1: handle the subset { i | mask has bit i }.",
      "for i in 0..n-1: if (mask>>i)&1, use element i.",
      "for (let sub=mask; sub>0; sub=(sub-1)&mask) { ... } then handle sub=0.",
    ],
    whenToUse: [
      "n ≤ 20 subset enumeration; transitions of bitmask DP; split a set into two labeled groups.",
    ],
    whenNotToUse: [
      "n > 22 or so for 2^n, n > 15 for 3^n — will not run.",
      "You need subsets listed as arrays for n=10 and recursion is clearer — either is fine.",
    ],
    complexity: {
      time: "O(n 2^n) to visit every element of every subset; O(3^n) all submasks of all masks",
      space: "O(1) besides output",
    },
    interviewTips: [
      "If you write a recursive subset DFS and n is 16, they may ask you to rewrite it as a mask loop.",
      "TSP-style: from mask, try add a bit j not in mask.",
    ],
    pitfalls: [
      "1<<n when n=31 sign-flips in 32-bit; use 1<<n for n≤30 or 1n<<n.",
      "Forgetting subset 0 in the (sub-1)&mask loop.",
      "Modifying mask while iterating its bits.",
    ],
    practiceIdeas: [
      "Generate all subsets of [1..n] via masks.",
      "Sum of bitwise OR of all subsets (classic bit-count per position).",
      "Submask enumeration for 'number of ways to partition into groups.'",
    ],
    related: [
      "bitmask-dp",
      "subsets",
      "count-bits",
      "bit-set-unset-toggle",
    ],
  },
  {
    slug: "kernighan",
    track: "dsa",
    category: "Bit Manipulation",
    title: "Brian Kernighan's Trick",
    summary:
      "n & (n-1) drops the lowest set bit. n & -n isolates it. Together they iterate, count, and test powers of two without scanning all 32 bits.",
    depth: "next",
    whyItMatters:
      "This one identity shows up everywhere: power-of-two tests, Fenwick index moves, iterating a mask's bits, and popcount. Interviewers use 'is power of two' and 'count ones' as the door, then Fenwick as the house. If you write a 32-iteration loop they will ask you to do better on sparse masks.",
    theory: [
      "In two's complement, -n is ~n+1. The bits of n-1 flip everything up through the lowest 1 of n. AND-ing n with n-1 clears that 1 and leaves the higher bits. Repeating until 0 visits each set bit once.",
      "n & -n equals the lowest set bit as a power of two (e.g. 0b10110 & -same = 0b00010). Fenwick trees jump i += i&-i to the next responsible index and i -= i&-i to the parent prefix. That is Kernighan as an addressing scheme.",
      "n>0 && (n&(n-1))===0 iff n is a power of two. 0 fails the test, correctly. Negative inputs are language-defined; usually the problem is unsigned / positive.",
    ],
    howItWorks: [
      "Count: while n: n&=n-1; c++.",
      "Iterate bits: while n: bit = n & -n; process(bit); n -= bit; (or n &= n-1).",
      "Fenwick: for (i+=i&-i) and for (i-=i&-i).",
    ],
    whenToUse: [
      "Sparse bit iteration, popcount, power-of-two, Fenwick tree index math.",
    ],
    whenNotToUse: [
      "You need every bit position 0..31 regardless of set — a simple shift loop is clearer.",
    ],
    complexity: {
      time: "O(number of set bits)",
      space: "O(1)",
    },
    interviewTips: [
      "Write n&(n-1) and say 'drops lowest set bit' in one breath.",
      "When they introduce Fenwick, reuse this sentence.",
    ],
    pitfalls: [
      "n & -n in languages without two's complement wrap (JS 32-bit works; BigInt needs -n too).",
      "Using the test on 0 and claiming it is a power of two.",
    ],
    practiceIdeas: [
      "Power of Two; Number of 1 Bits.",
      "Implement Fenwick add/sum using i&-i.",
    ],
    related: [
      "count-bits",
      "xor-tricks",
      "fenwick",
      "bit-set-unset-toggle",
    ],
  },
];
