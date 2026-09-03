import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "frequency-map",
    track: "dsa",
    category: "Hashing",
    title: "Frequency Maps",
    summary:
      "Count occurrences in a hashmap (or an array if the alphabet is tiny). The first pass that turns 'is there a duplicate / anagram / majority' into O(n).",
    depth: "core",
    whyItMatters:
      "A huge fraction of 'easy' and 'medium' array/string problems are frequency maps in disguise: anagrams, top-k frequent, majority, isomorphic strings, hand of straights. If your instinct is sort-and-scan, you are often one map away from linear time. Interviewers also use this to see if you pick an array[256] vs a hashmap vs a sort.",
    theory: [
      "A map key → count is a histogram. Build it in one pass. Queries become O(1) average: 'have I seen this,' 'how many left to fulfill,' 'is this the mode.' When keys are characters or small integers, an array is a faster map. When keys are arbitrary, a hash map is the default; a tree map is only for ordered keys.",
      "Two histograms compare for anagrams. A sliding window of histograms compares for 'permutation of s1 in s2.' Decrementing a copy of the histogram is how you simulate consuming a multiset (ransom note, word pattern).",
      "Hash maps are average O(1) and worst-case O(n) per op if everything collides. Interviews ignore the worst case unless they ask you to design the map. Still, do not use a map when a 26-slot array will do — it shows taste.",
    ],
    howItWorks: [
      "const freq = new Map(). For each x, freq.set(x, (freq.get(x)??0)+1).",
      "For a fixed alphabet, const a = new Array(26).fill(0); a[ch.charCodeAt(0)-97]++.",
      "To consume: if !freq.has(x) fail; decrement; delete if 0 (optional cleanup).",
    ],
    whenToUse: [
      "Counts, anagrams, majority, 'can I build this from that multiset.'",
      "First step of top-k frequent before a heap.",
    ],
    whenNotToUse: [
      "You need order of first occurrence and nothing else — a set plus a list, or an ordered map.",
      "n is tiny and a sort is clearer.",
    ],
    complexity: {
      time: "O(n) expected to build",
      space: "O(distinct keys)",
    },
    interviewTips: [
      "If the alphabet is 26, use an array. Say why.",
      "For 'all anagrams,' sort each word as the key or use a 26-tuple key — both are fine.",
    ],
    pitfalls: [
      "Comparing maps by reference, not by counts.",
      "Forgetting keys with count 0 still sitting in the map and breaking 'same keys' checks — delete zeros or compare carefully.",
      "Using object {} in JS and colliding with prototype keys; prefer Map.",
    ],
    practiceIdeas: [
      "Ransom Note; Valid Anagram; Majority Element.",
      "Find All Anagrams in a String (map + fixed window).",
      "Top K Frequent (map + heap or buckets).",
    ],
    related: [
      "group-anagrams",
      "two-sum",
      "top-k",
      "sliding-window-strings",
      "boyer-moore-majority",
    ],
  },
  {
    slug: "two-sum",
    track: "dsa",
    category: "Hashing",
    title: "Two Sum and Family",
    summary:
      "For each x, ask the map whether target − x was already seen. One pass, O(n). The family includes 3-sum (sort + two pointers), 4-sum, and two-sum on BST/sorted arrays.",
    depth: "core",
    whyItMatters:
      "Two Sum is the first hashmap problem in most interview loops. The follow-ups never stop: return indices, handle duplicates, 3-sum, two-sum in a BST, two-sum in a sorted stream. The idea — complement lookup — is the same as 'have I seen prefix-k' and 'have I seen this anagram signature.' Get the one-pass vs two-pass distinction right.",
    theory: [
      "Two-pass: build value → index for all, then look for target-x with a different index. One-pass: for each i, query then insert. One-pass is required if you must not match i with itself and you want to stop early; insert-after-query also handles the case 2x = target with a single occurrence correctly.",
      "If you only need yes/no and may sort, two pointers after sort is O(n log n) and O(1) extra (besides sort). If you need original indices, store {value, index} before sorting or use the map.",
      "3-sum: sort, fix one index, two-pointer the rest, skip duplicates. Hash 3-sum exists but is messier on duplicates. 4-sum is n times 3-sum or pair-sums in a map (watch exploding pair counts).",
    ],
    howItWorks: [
      "map empty. For i, x of nums: need = target - x; if map.has(need) return [map.get(need), i]; map.set(x, i).",
      "Sorted two-pointer: i=0, j=n-1, move the side that fixes the sum.",
      "3-sum: sort; for i, skip dup i; l=i+1, r=n-1; skip dup l/r on hits.",
    ],
    whenToUse: [
      "Pair / triple sums, complements, 'two numbers add to k' in an unsorted array.",
    ],
    whenNotToUse: [
      "Sorted array and O(1) extra required — two pointers.",
      "Need all pairs and there are Θ(n²) of them — output-bound.",
    ],
    complexity: {
      time: "O(n) expected two-sum; O(n²) 3-sum after sort",
      space: "O(n) map",
    },
    interviewTips: [
      "Ask: indices or values? duplicates? mutability? Then pick map vs sort.",
      "If they escalate to 3-sum, do not nest three loops. Sort + two pointers.",
    ],
    pitfalls: [
      "Inserting before querying so x pairs with itself when it appears once.",
      "Returning values when they asked for indices (or the reverse).",
      "3-sum without skipping duplicates, flooding the output with the same triplet.",
    ],
    practiceIdeas: [
      "Two Sum; Two Sum II (sorted); Two Sum BST.",
      "3Sum; 4Sum; 4Sum II (four arrays — hashmap of pair sums).",
    ],
    related: [
      "frequency-map",
      "two-pointers",
      "prefix-hashmap",
      "group-anagrams",
    ],
  },
  {
    slug: "prefix-hashmap",
    track: "dsa",
    category: "Hashing",
    title: "Prefix Sum plus Hash Map",
    summary:
      "A subarray sum equals k iff two prefixes differ by k. Store prefix frequencies (or latest indices) in a map and look up prefix − k as you scan.",
    depth: "core",
    whyItMatters:
      "This is the pattern that defeats 'sliding window on arrays with negatives.' Subarray sum equals k, contiguous array (equal 0s and 1s), max size subarray with sum k, and path-sum III are the same idea. If you try a variable window on negatives, it is wrong. If you brute all i,j it is O(n²). Prefix + map is O(n).",
    theory: [
      "Let P[0] = 0, P[i] = A[0]+…+A[i-1]. Sum[i..j) = P[j]−P[i]. For each j, you need the number of i < j (or the smallest i, or any i) with P[i] = P[j]−k. A hashmap of P[i] → count (or index) answers that in O(1) average as you walk j from left to right, then you insert P[j].",
      "Initialize the map with {0: 1} (or index 0) so prefixes that themselves equal k are counted. For 'longest,' store the first index a prefix appeared; do not overwrite it. For 'count,' increment frequencies. For 'exists,' a set of prefixes is enough.",
      "The same idea works with XOR (subarray XOR = k), with +1/−1 encodings (equal ones and zeros), and with modulo (subarray sum divisible by k — store prefix mod k, careful with negatives).",
    ],
    howItWorks: [
      "map = {0: 1}, prefix = 0, ans = 0.",
      "For each x: prefix += x; ans += map.get(prefix - k) ?? 0; map.set(prefix, (map.get(prefix)??0)+1).",
      "For longest: map = {0: -1} of first index; if prefix-k was seen, ans = max(ans, i - firstIndex).",
    ],
    whenToUse: [
      "Contiguous subarray aggregates that are prefix-subtractable: sum, XOR, modular sum.",
      "Negatives present, so windows cannot shrink monotonically.",
    ],
    whenNotToUse: [
      "Positive-only shortest subarray sum ≥ S — variable window is simpler and O(1) extra.",
      "Subsequences, not subarrays.",
    ],
    complexity: {
      time: "O(n) expected",
      space: "O(n)",
    },
    interviewTips: [
      "Say 'I would window this if all positives; they are not, so prefix map.' That sentence scores.",
      "Path Sum III is this map on a DFS with backtracking.",
    ],
    pitfalls: [
      "Forgetting the {0:1} seed.",
      "Overwriting the first index of a prefix when you wanted the longest.",
      "Modulo of negative prefixes in languages where (-3)%5 is -3. Normalize.",
    ],
    practiceIdeas: [
      "Subarray Sum Equals K.",
      "Contiguous Array (equal 0 and 1).",
      "Subarray XOR equals k; Path Sum III.",
    ],
    related: [
      "prefix-sum",
      "sliding-window-variable",
      "two-sum",
      "path-sum",
    ],
  },
  {
    slug: "group-anagrams",
    track: "dsa",
    category: "Hashing",
    title: "Group Anagrams",
    summary:
      "Two strings are anagrams if they share a signature. Sort the characters, or count 26 letters, and group words in a map from signature to list.",
    depth: "core",
    whyItMatters:
      "Group Anagrams is the hashmap-of-lists interview. The only design choice is the key. Sorting each word is O(L log L) and easy. A count tuple is O(L) and faster for short alphabets. Interviewers will ask you which you picked and why, then maybe follow with 'group shifted strings' (another signature).",
    theory: [
      "An anagram class is the multiset of characters. Any injective encoding of that multiset is a key. sorted(word) is injective. '#'.join(counts) or a tuple of 26 integers is injective for lowercase letters. Do not use sum of char codes (aba vs aad) or XOR of codes.",
      "After grouping, the order of groups and the order inside a group are usually free. If they want input order, append as you scan. If the alphabet is huge (unicode), sorting the word is safer than a giant count array.",
      "Related signatures: sorted unique letters for 'same character set,' difference from 'a' for shifted strings (xyz and abc share 0,1,2), prime-product hashes (overflow and collision risk — do not use in interviews unless you discuss it).",
    ],
    howItWorks: [
      "map = Map<string, string[]>. For each word, key = [...word].sort().join('') (or count key).",
      "map.get(key).push(word) after ensuring the list exists.",
      "Return [...map.values()].",
    ],
    whenToUse: [
      "Group strings by anagram class or another equivalence given by a signature.",
    ],
    whenNotToUse: [
      "You only need to test one pair — sort or count both, no map of groups.",
    ],
    complexity: {
      time: "O(n L log L) with sort keys; O(n L) with counts for alphabet 26",
      space: "O(n L) to store the groups",
    },
    interviewTips: [
      "Write the sort-key version first in 90 seconds, then mention the count-key upgrade.",
      "Do not mutate the original words if the caller still needs them; sort a copy.",
    ],
    pitfalls: [
      "A weak hash (product of primes) without explaining collisions.",
      "Using the sorted word as the only stored value and dropping the originals.",
      "Locale-sensitive sort on letters — fine for a-z, dangerous for unicode.",
    ],
    practiceIdeas: [
      "Group Anagrams.",
      "Group Shifted Strings.",
      "Find all anagrams of a pattern in a long string (window, not this grouping).",
    ],
    related: [
      "frequency-map",
      "sliding-window-strings",
      "counting-sort",
      "trie",
    ],
  },
  {
    slug: "longest-consecutive",
    track: "dsa",
    category: "Hashing",
    title: "Longest Consecutive Sequence",
    summary:
      "Put all numbers in a set. Only start a streak from x when x−1 is missing, then walk x+1, x+2, … Each number is touched a constant number of times: O(n).",
    depth: "core",
    whyItMatters:
      "The O(n) constraint is the problem. Sorting is the honest O(n log n) solution and you should say so. The set-plus-start-of-run trick is what they want. It trains you to turn 'am I at the left edge of a run?' into a hash probe, which is a useful instinct for union-of-intervals style questions.",
    theory: [
      "A consecutive run is a maximal interval of values that all appear (duplicates do not help). If you start walking from every x, you re-walk the same run and blow O(n) (it becomes O(n²) on 1..n). Only start when x-1 is not in the set — x is the left endpoint. Then count how far x+1, x+2, … exist.",
      "Union-Find also works: union x with x+1 when both exist, track component sizes. It is more code for the same bound (almost). The set walk is the interview solution.",
      "You need O(n) extra memory for the set. If they forbid that, you cannot beat sort in the comparison/hashing models they usually mean — say that.",
    ],
    howItWorks: [
      "const s = new Set(nums).",
      "For each x in s: if s.has(x-1) continue. len = 1; while s.has(x+len) len++. ans = max(ans, len).",
      "Return ans (0 on empty).",
    ],
    whenToUse: [
      "Longest run of consecutive values, order in the array ignored.",
    ],
    whenNotToUse: [
      "You need the longest consecutive run in array order (that is a different, easier scan).",
      "Values are already a tiny range — a boolean array + scan is enough.",
    ],
    complexity: {
      time: "O(n) expected",
      space: "O(n)",
    },
    interviewTips: [
      "Lead with sort in O(n log n), then 'I can do O(n) expected with a set if that is required.'",
      "Iterate the set, not the original array, so duplicates do not restart work (the x-1 check also handles that).",
    ],
    pitfalls: [
      "Walking from every x without the left-edge test.",
      "Using an object and failing on negative keys or sparse huge keys.",
      "Mutating the set while iterating in a language that dislikes that.",
    ],
    practiceIdeas: [
      "Longest Consecutive Sequence.",
      "Union-Find version with size tracking.",
      "Longest consecutive in a binary tree (parent-child ±1 — a different DFS problem).",
    ],
    related: [
      "union-find",
      "frequency-map",
      "two-sum",
    ],
  },
  {
    slug: "design-hashmap",
    track: "dsa",
    category: "Hashing",
    title: "Design HashMap",
    summary:
      "An array of buckets, a hash to a bucket, and a collision strategy (chaining or open addressing). Grow and rehash when the load factor is high.",
    depth: "next",
    whyItMatters:
      "Design HashMap / HashSet is the 'do you know how the tool works' interview. You must talk about hash functions, load factor, chaining vs probing, and amortized growth. LRU then combines this with a linked list. If you implement a giant array of 10^6 slots and call it a day, they will ask about collisions and memory.",
    theory: [
      "hash(key) maps to [0, cap). Good hashes spread keys; bad hashes (identity on increasing ints with a power-of-two cap and no mix) pile into few buckets. In interviews, key % cap is fine if you then handle collisions; mention that prime caps or 32-bit mixers are what libraries use.",
      "Chaining: each bucket is a list (or tree if a bucket grows, à la Java 8). put/get/remove walk the list. Simple and deletion is easy. Open addressing: probe (linear, quadratic, double hash) until an empty slot. Faster cache behavior, messier deletes (tombstones).",
      "Load factor α = n/cap. With chaining, expected list length is α. When α > 0.75 or so, allocate 2× buckets and rehash every key — amortized O(1) per insert. Do not rehash on every insert.",
    ],
    howItWorks: [
      "Choose cap (8 or 16), buckets = array of empty lists, size = 0.",
      "idx = hash(key) % cap. Walk the list for the key; replace or append. size++. If size/cap > 0.75, rehash to 2×.",
      "get/remove: same idx, walk, return or splice out.",
      "hash: for ints, mix then modulo; for strings, polynomial rolling hash (watch overflow).",
    ],
    whenToUse: [
      "Implementing the map they forbade you to use, or explaining production hash tables.",
    ],
    whenNotToUse: [
      "A tiny key universe — a direct array is a perfect hash.",
      "You need order — use a tree map or an insertion-order list + map (LinkedHashMap).",
    ],
    complexity: {
      time: "O(1) expected get/put; O(n) worst chain; amortized O(1) with rehash",
      space: "O(n + cap)",
    },
    interviewTips: [
      "Implement chaining. Mention open addressing. Mention load factor and rehash.",
      "If keys are only integers in 0..10^6, a big array is valid — ask about the key domain.",
    ],
    pitfalls: [
      "No collision handling.",
      "Rehashing incorrectly (iterating old buckets and inserting into the new table without resetting size).",
      "Using signed modulo so idx is negative.",
    ],
    practiceIdeas: [
      "Design HashMap; Design HashSet.",
      "Add rehash and test with 10^5 inserts.",
      "Explain how Java's HashMap turns long chains into trees.",
    ],
    related: [
      "frequency-map",
      "lru-cache",
      "rabin-karp",
    ],
  },
];
