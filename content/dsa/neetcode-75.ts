import type { Topic } from "../schema";
import { NEETCODE_75, ncTopicSlug, type NcMeta } from "../neetcode/list";
import { topicsB } from "./neetcode-75-b";

function fromMeta(meta: NcMeta, list: "75" | "150"): Topic {
  const category = list === "75" ? "NeetCode 75" : "NeetCode 150";
  const depth = meta.difficulty === "easy" ? "core" : meta.difficulty === "medium" ? "next" : "advanced";
  return {
    slug: ncTopicSlug(meta.slug),
    track: "dsa",
    category,
    title: meta.title,
    summary: `LeetCode ${meta.lc}. ${meta.pattern}. ${meta.difficulty}. Learn the problem statement first, then the pattern.`,
    depth,
    whyItMatters: `This is on NeetCode ${list}. Interviewers give the story, not the pattern name. Master the Given / Find / tiny example before you code.`,
    theory: [
      `${meta.title} (LC ${meta.lc}) sits under ${meta.pattern}.`,
      "Say the invariant out loud. Dry-run one tiny case. Then write Java.",
      "Follow-ups usually change constraints, not the whole idea.",
    ],
    howItWorks: [
      "Restate Given and Find without the LeetCode title.",
      "Name the pattern only after the example works on paper.",
      "Code in Java: arrays, HashMap, HashSet, Deque, PriorityQueue as needed.",
    ],
    whenToUse: [`When they describe a ${meta.pattern.toLowerCase()} situation like this.`],
    whenNotToUse: ["Do not force this pattern if a simpler scan or sort is enough."],
    complexity: { time: "see approach", space: "see approach" },
    interviewTips: [
      `Lead with the problem, not “I will use ${meta.pattern}.”`,
      "Offer the brute force, then the linear (or log) improvement.",
    ],
    pitfalls: ["Coding before a dry-run.", "Forgetting edge cases: empty, n=1, all equal."],
    practiceIdeas: [
      `LeetCode ${meta.lc}: ${meta.title}`,
      "Change one constraint and re-solve.",
    ],
    related: [],
  };
}

const enriched: Topic[] = [
  {
    slug: "nc-contains-duplicate",
    track: "dsa",
    category: "NeetCode 75",
    title: "Contains Duplicate",
    summary:
      "Given an int[], return true if any value appears at least twice. The clean check is one HashSet pass: if add fails, you already saw it.",
    depth: "core",
    whyItMatters:
      "Warmup for hashing interviews. Sorting then adjacent compare is fine but O(n log n). The expected answer is O(n) with a set. Follow-ups: find the duplicate, find all duplicates, or do it with O(1) extra when values are in a known range.",
    theory: [
      "Brute force nested loops are O(n²). Sorting makes equals adjacent in O(n log n). A HashSet stores every seen value; the first failed add proves a duplicate and you can return early.",
      "If values lie in 1..n and mutation is allowed, you can mark indices as visited (negate or offset) for O(1) extra space — that is a different problem family (Find the Duplicate Number).",
      "Interviewers want you to state the tradeoff: set uses O(n) space and O(n) expected time; sort uses O(1)/O(log n) extra depending on sort and is deterministic.",
    ],
    howItWorks: [
      "HashSet<Integer> seen = new HashSet<>(); for (int x : nums) if (!seen.add(x)) return true; return false.",
      "Alt: Arrays.sort(nums); for i=1..n-1 if nums[i]==nums[i-1] return true.",
      "Empty or single-element arrays: return false immediately.",
    ],
    whenToUse: [
      "Any 'did this value appear before' scan where equality is the only relation you need.",
    ],
    whenNotToUse: [
      "When you must report frequencies or groups — use a HashMap count instead.",
      "When O(1) extra space is required and mutation of a bounded range is allowed — index marking.",
    ],
    complexity: { time: "O(n) expected with HashSet; O(n log n) sort", space: "O(n) set; O(1)/O(log n) sort" },
    interviewTips: [
      "Ask about value range and whether mutating the array is OK.",
      "Mention early exit on first duplicate — do not finish the set if you already know.",
    ],
    pitfalls: [
      "Using List.contains in a loop → accidental O(n²).",
      "Boxing int to Integer in hot paths without thinking about null (not an issue for primitives here).",
    ],
    practiceIdeas: [
      "LeetCode 217: Contains Duplicate.",
      "Find All Duplicates in an Array; Find the Duplicate Number.",
    ],
    related: ["nc-valid-anagram", "nc-two-sum", "nc-longest-consecutive-sequence"],
  },
  {
    slug: "nc-valid-anagram",
    track: "dsa",
    category: "NeetCode 75",
    title: "Valid Anagram",
    summary:
      "Two strings are anagrams if they use the same characters with the same counts. Count letters in one, decrement with the other; all counts must end at zero.",
    depth: "core",
    whyItMatters:
      "Canonical frequency-map problem and the gateway to Group Anagrams. Interviews expect either a 26-slot int[] for lowercase English or a HashMap for general Unicode. Sorting both strings and comparing is the backup.",
    theory: [
      "If lengths differ, they cannot be anagrams. Otherwise the multiset of characters must match. A fixed alphabet makes an int[26] enough; otherwise HashMap<Character,Integer> (or code points).",
      "Sorting both to char[] and Arrays.equals is correct in O(n log n) and uses little extra thought — fine if constraints are tiny.",
      "Unicode, case folding, and accents are the real-world follow-ups; clarify the alphabet before coding.",
    ],
    howItWorks: [
      "If s.length()!=t.length() return false. int[] c = new int[26]; for (char ch : s.toCharArray()) c[ch-'a']++; for (char ch : t.toCharArray()) if (--c[ch-'a']<0) return false; return true.",
      "Alt: sort both char arrays and compare.",
      "General alphabet: HashMap with getOrDefault / merge, then check all values are 0.",
    ],
    whenToUse: [
      "Equality of character multisets; warm-up before grouping by signature.",
    ],
    whenNotToUse: [
      "When order matters (subsequence / substring) — different problem.",
      "When you only care about presence, not counts — HashSet of characters.",
    ],
    complexity: { time: "O(n)", space: "O(1) for 26 letters; O(k) for alphabet size k" },
    interviewTips: [
      "Confirm lowercase a–z before allocating int[26].",
      "Early length check is free and shows care.",
    ],
    pitfalls: [
      "Forgetting length check and returning true on empty vs non-empty mismatches in buggy count logic.",
      "Assuming ASCII when the prompt says Unicode.",
    ],
    practiceIdeas: [
      "LeetCode 242: Valid Anagram.",
      "Group Anagrams; Find All Anagrams in a String.",
    ],
    related: ["nc-group-anagrams", "nc-contains-duplicate"],
  },
  {
    slug: "nc-two-sum",
    track: "dsa",
    category: "NeetCode 75",
    title: "Two Sum",
    summary:
      "Find two indices whose values add to target. One HashMap pass stores value→index and looks up target−nums[i] before inserting i.",
    depth: "core",
    whyItMatters:
      "The classic hash-complement interview. Nested loops are O(n²); sorting loses indices unless you keep pairs. Follow-ups: return the values, sorted Two Sum II with two pointers, Three Sum.",
    theory: [
      "For each index i you need some earlier j with nums[j]=target−nums[i]. A HashMap from value to index answers that in expected O(1). Insert after the lookup so you never pair an element with itself.",
      "If duplicates exist, map stores one index — that is enough because you only need any valid pair unless they ask for all pairs.",
      "Two Sum II (sorted input) switches to two pointers: left/right shrink based on sum vs target — O(1) extra space.",
    ],
    howItWorks: [
      "HashMap<Integer,Integer> seen = new HashMap<>(); for (int i=0; i<nums.length; i++) { int need = target-nums[i]; if (seen.containsKey(need)) return new int[]{seen.get(need), i}; seen.put(nums[i], i); }",
      "Do not put nums[i] before the lookup when need could equal nums[i] and only one copy exists.",
      "Brute: for i, for j>i check sum — state it, then improve.",
    ],
    whenToUse: [
      "Pair with complement under a target; streaming one pass when order of indices matters.",
    ],
    whenNotToUse: [
      "Sorted array and O(1) space required — two pointers.",
      "k-sum for k≥3 — sort + two pointers / recursion.",
    ],
    complexity: { time: "O(n)", space: "O(n)" },
    interviewTips: [
      "Clarify unique answer guarantee and whether indices or values are returned.",
      "Say why you insert after lookup (self-pair).",
    ],
    pitfalls: [
      "Putting then looking up and accidentally matching the same index.",
      "Integer overflow on target-nums[i] if values are huge — rare on LeetCode ints but ask.",
    ],
    practiceIdeas: [
      "LeetCode 1: Two Sum.",
      "Two Sum II; 3Sum; 4Sum.",
    ],
    related: ["nc-3sum", "nc-contains-duplicate", "nc-valid-anagram"],
  },
  {
    slug: "nc-group-anagrams",
    track: "dsa",
    category: "NeetCode 75",
    title: "Group Anagrams",
    summary:
      "Bucket strings that are anagrams of each other. Key each string by a sorted form or a count signature, then HashMap<String, List<String>> collects the groups.",
    depth: "next",
    whyItMatters:
      "Shows you can invent a canonical key for a multiset. Interviewers compare sort-key O(n·k log k) vs count-key O(n·k). Same idea powers Group Shifted Strings and other signature maps.",
    theory: [
      "Two strings land in the same bucket iff their character counts match. Sorting characters yields a shared key; a count array serialized to a string (e.g. '#2#0#1…') is linear in word length for fixed alphabets.",
      "HashMap from key → List avoids sorting the whole input; you only sort or count each word once.",
      "Output order of groups usually does not matter; confirm if they want sorted groups.",
    ],
    howItWorks: [
      "HashMap<String, List<String>> groups = new HashMap<>(); for (String s : strs) { char[] a = s.toCharArray(); Arrays.sort(a); String key = new String(a); groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s); } return new ArrayList<>(groups.values());",
      "Count key: int[26] counts, build key with StringBuilder appending count and a delimiter.",
      "Empty input → empty list; single strings → singleton groups.",
    ],
    whenToUse: [
      "Partition a collection by anagram / multiset equality.",
    ],
    whenNotToUse: [
      "When you only need whether two strings match — Valid Anagram.",
      "Huge Unicode alphabets where sorting may beat a giant count array.",
    ],
    complexity: { time: "O(n·k log k) sort keys; O(n·k) count keys", space: "O(n·k)" },
    interviewTips: [
      "Prefer count signatures when words are long and alphabet is 26.",
      "Mention computeIfAbsent as idiomatic Java.",
    ],
    pitfalls: [
      "Using the unsorted string as the map key.",
      "Joining counts without delimiters so 11,0 collides with 1,10.",
    ],
    practiceIdeas: [
      "LeetCode 49: Group Anagrams.",
      "Group Shifted Strings; Valid Anagram.",
    ],
    related: ["nc-valid-anagram", "nc-top-k-frequent-elements"],
  },
  {
    slug: "nc-top-k-frequent-elements",
    track: "dsa",
    category: "NeetCode 75",
    title: "Top K Frequent Elements",
    summary:
      "Return the k values that appear most often in an int[]. Count with a HashMap, then pick top k via a min-heap of size k or bucket sort by frequency.",
    depth: "next",
    whyItMatters:
      "Classic heap-vs-bucket tradeoff. Interviewers expect O(n log k) with PriorityQueue or O(n) bucket sort when frequencies are ≤n. Follow-up: top k frequent words with tie-breaking.",
    theory: [
      "First pass: HashMap value→frequency. Then you need the k largest frequencies. A min-heap of size k keyed by frequency keeps the current top k; when size exceeds k, poll the smallest.",
      "Bucket sort: array of lists indexed by frequency (0..n). Walk from high frequency down, collecting until you have k values — linear after counting.",
      "Sorting all unique keys by frequency is O(m log m) and is the fallback, not the flex.",
    ],
    howItWorks: [
      "Count into HashMap<Integer,Integer>. PriorityQueue<Integer> minHeap = new PriorityQueue<>((a,b)->map.get(a)-map.get(b)); for each key offer and if size>k poll.",
      "Bucket: List<Integer>[] buckets = new List[nums.length+1]; place keys into buckets[freq]; scan i from n down to 1 collecting into int[k].",
      "k==n → return all unique keys (or the whole array if all distinct).",
    ],
    whenToUse: [
      "Top-k by frequency on an unsorted stream/array.",
    ],
    whenNotToUse: [
      "When k is huge (≈n) — just sort uniques by count.",
      "When you need a full sorted frequency list every time — TreeMap or sort.",
    ],
    complexity: { time: "O(n log k) heap; O(n) bucket", space: "O(n)" },
    interviewTips: [
      "Ask if order in the output matters.",
      "Say why min-heap of size k beats max-heap of size n.",
    ],
    pitfalls: [
      "Max-heap of everything then pop k — worse complexity chatter.",
      "Off-by-one on bucket length (need n+1).",
    ],
    practiceIdeas: [
      "LeetCode 347: Top K Frequent Elements.",
      "Top K Frequent Words; Kth Largest Element.",
    ],
    related: ["nc-group-anagrams", "nc-contains-duplicate"],
  },
  {
    slug: "nc-product-of-array-except-self",
    track: "dsa",
    category: "NeetCode 75",
    title: "Product of Array Except Self",
    summary:
      "Build an array where answer[i] is the product of every nums[j] with j≠i, without using division. Prefix products left of i times suffix products right of i.",
    depth: "next",
    whyItMatters:
      "Forces linear prefix/suffix thinking under a 'no division' constraint (zeros break naïve total/nums[i]). Common follow-up: O(1) extra space by writing into the output array.",
    theory: [
      "answer[i] = (product of nums[0..i-1]) × (product of nums[i+1..n-1]). Precompute left[] and right[], or fold one side into answer and multiply the running right product on a second pass.",
      "Division fails when zeros appear: one zero makes most answers 0 and the zero index gets the product of the rest; two zeros make everything 0.",
      "Watch overflow if the language is fixed-width; LeetCode usually guarantees fit in 32-bit.",
    ],
    howItWorks: [
      "int[] ans = new int[n]; ans[0]=1; for (int i=1;i<n;i++) ans[i]=ans[i-1]*nums[i-1]; // left products in ans",
      "int right=1; for (int i=n-1;i>=0;i--) { ans[i]*=right; right*=nums[i]; }",
      "Do not multiply nums[i] into the left or right product for position i.",
    ],
    whenToUse: [
      "Per-index aggregate excluding self; similar exclude-self XOR / sum variants.",
    ],
    whenNotToUse: [
      "When division and a single zero-policy are explicitly allowed — still prefer prefix for clarity.",
      "When you need arbitrary range products with updates — segment tree.",
    ],
    complexity: { time: "O(n)", space: "O(1) extra besides output" },
    interviewTips: [
      "State the no-division constraint and how zeros motivate it.",
      "Clarify whether output array counts as extra space.",
    ],
    pitfalls: [
      "Initializing left product with nums[0] instead of 1.",
      "Using division and failing multi-zero cases.",
    ],
    practiceIdeas: [
      "LeetCode 238: Product of Array Except Self.",
      "Product of the Last K Numbers (prefix).",
    ],
    related: ["nc-maximum-subarray", "nc-two-sum"],
  },
  {
    slug: "nc-encode-and-decode-strings",
    track: "dsa",
    category: "NeetCode 75",
    title: "Encode and Decode Strings",
    summary:
      "Serialize a List<String> to one String and decode back losslessly, even when strings contain any characters. Length-prefix (or a safe delimiter scheme) is the standard fix.",
    depth: "next",
    whyItMatters:
      "Design problem: naïve join-with-comma breaks on commas inside words. Interviews want a clear wire format and a correct parse loop. Same idea as HTTP chunked lengths or protobuf length-delimited fields.",
    theory: [
      "Encode each string as len + '#' + raw bytes/chars. Decoding reads digits until '#', parses length, then takes exactly that many characters — works for empty strings and for '#' inside payloads.",
      "Escape-based schemes (backslash) also work but are easier to get wrong under nested escapes.",
      "Unicode/UTF-16: operate on Java String code units consistently; length is in chars if both sides agree.",
    ],
    howItWorks: [
      "encode: StringBuilder sb; for (String s : strs) sb.append(s.length()).append('#').append(s); return sb.toString();",
      "decode: List<String> out = new ArrayList<>(); int i=0; while (i<s.length()) { int j=i; while (s.charAt(j)!='#') j++; int len=Integer.parseInt(s.substring(i,j)); out.add(s.substring(j+1,j+1+len)); i=j+1+len; }",
      "Empty list → empty encoded string; list of \"\" → \"0#\".",
    ],
    whenToUse: [
      "Any need to ship a list of arbitrary strings over a single string channel.",
    ],
    whenNotToUse: [
      "When a binary length-prefixed buffer API already exists.",
      "When a delimiter is guaranteed absent from the alphabet — rare; still prefer length-prefix.",
    ],
    complexity: { time: "O(total characters)", space: "O(total characters)" },
    interviewTips: [
      "Walk encode/decode of [\"\", \"a#b\", \"12\"] on the whiteboard.",
      "Reject join-with-nonprintable without discussing collisions.",
    ],
    pitfalls: [
      "Stopping at the first '#' inside the payload when length was ignored.",
      "Using split(\"#\") which breaks on content hashes.",
    ],
    practiceIdeas: [
      "LeetCode 271: Encode and Decode Strings.",
      "Serialize / deserialize N-ary tree strings.",
    ],
    related: ["nc-serialize-and-deserialize-binary-tree", "nc-group-anagrams"],
  },
  {
    slug: "nc-longest-consecutive-sequence",
    track: "dsa",
    category: "NeetCode 75",
    title: "Longest Consecutive Sequence",
    summary:
      "Longest run of consecutive integers in an unsorted array (order in the array does not matter). Put values in a HashSet; only start a streak from numbers that have no predecessor.",
    depth: "next",
    whyItMatters:
      "O(n) hashing interview that feels like sorting. The trick is to expand a streak only from its start so total expansions are O(n). Follow-up: return the sequence itself.",
    theory: [
      "Sorting unique values and scanning adjacent diffs of 1 is O(n log n). For linear time, HashSet membership answers 'is x+1 present?' in expected O(1).",
      "If you expand from every number, you re-walk streaks. Only begin when !set.contains(x-1); then while set.contains(x+len) len++. Each number is visited a constant number of times.",
      "Duplicates do not lengthen a streak — a set dedupes naturally.",
    ],
    howItWorks: [
      "HashSet<Integer> set = new HashSet<>(); for (int x : nums) set.add(x);",
      "int best=0; for (int x : set) { if (!set.contains(x-1)) { int y=x; while (set.contains(y+1)) y++; best=Math.max(best, y-x+1); } }",
      "Empty nums → 0.",
    ],
    whenToUse: [
      "Longest consecutive values ignoring input order.",
    ],
    whenNotToUse: [
      "When you need longest consecutive subarray (contiguous indices) — different (sliding / DP).",
      "When n is tiny — sort is simpler to write under pressure.",
    ],
    complexity: { time: "O(n) expected", space: "O(n)" },
    interviewTips: [
      "Say the 'only start at streak heads' invariant out loud.",
      "Ask if duplicates appear and whether empty → 0.",
    ],
    pitfalls: [
      "Expanding from every element → O(n²) on a single long streak.",
      "Using List instead of HashSet for contains.",
    ],
    practiceIdeas: [
      "LeetCode 128: Longest Consecutive Sequence.",
      "Longest Consecutive Subsequence variants; Union-Find approach.",
    ],
    related: ["nc-contains-duplicate", "nc-two-sum"],
  },
  {
    slug: "nc-valid-palindrome",
    track: "dsa",
    category: "NeetCode 75",
    title: "Valid Palindrome",
    summary:
      "Check whether a string reads the same forward and backward after keeping only alphanumeric characters and ignoring case. Two pointers walk inward skipping junk.",
    depth: "core",
    whyItMatters:
      "Intro to two pointers on strings. Filtering into a new StringBuilder then comparing reverse works but uses extra space; in-place two pointers is the expected finish.",
    theory: [
      "A palindrome compares s[i] with s[n-1-i]. With noise characters, advance left while !Character.isLetterOrDigit, retreat right similarly, then compare Character.toLowerCase on both.",
      "Empty-after-filter strings are valid palindromes by definition on LeetCode.",
      "Unicode letters: Character.isLetterOrDigit is the Java-friendly check; clarify if only ASCII is intended.",
    ],
    howItWorks: [
      "int l=0, r=s.length()-1; while (l<r) { while (l<r && !Character.isLetterOrDigit(s.charAt(l))) l++; while (l<r && !Character.isLetterOrDigit(s.charAt(r))) r--; if (Character.toLowerCase(s.charAt(l))!=Character.toLowerCase(s.charAt(r))) return false; l++; r--; }",
      "return true;",
      "Alt: build filtered lowercase StringBuilder and check equals reverse.",
    ],
    whenToUse: [
      "Palindrome checks with skip rules; similar clean-then-compare string problems.",
    ],
    whenNotToUse: [
      "Palindrome partition / longest palindromic substring — DP or expand-around-center.",
      "Linked-list palindrome — reverse half, not string pointers.",
    ],
    complexity: { time: "O(n)", space: "O(1) two pointers" },
    interviewTips: [
      "Mention Character.isLetterOrDigit and toLowerCase explicitly in Java.",
      "Dry-run a string of only punctuation → true.",
    ],
    pitfalls: [
      "Comparing without lowercasing.",
      "Infinite loop if you forget l++/r-- after a match.",
    ],
    practiceIdeas: [
      "LeetCode 125: Valid Palindrome.",
      "Valid Palindrome II (one delete); Palindrome Linked List.",
    ],
    related: ["nc-3sum", "nc-longest-palindromic-substring"],
  },
  {
    slug: "nc-3sum",
    track: "dsa",
    category: "NeetCode 75",
    title: "3Sum",
    summary:
      "Find all unique triplets that sum to zero. Sort, fix one index, then two-pointer the rest while skipping duplicates.",
    depth: "next",
    whyItMatters:
      "The flagship two-pointers + sort problem. HashSet of triplets works but sorting + skip logic is cleaner. Follow-ups: 3Sum closest, 4Sum, kSum template.",
    theory: [
      "After sorting, for each i run left=i+1, right=n-1. Move left up if sum too small, right down if too large, record when zero. Skip equal values at i, left, and right to uniquify.",
      "HashMap two-sum per fixed i is possible but duplicate handling is messier than sorted two pointers.",
      "Time is O(n²); you cannot do much better in the worst case for reporting all triplets.",
    ],
    howItWorks: [
      "Arrays.sort(nums); List<List<Integer>> ans = new ArrayList<>();",
      "for (int i=0;i<n;i++) { if (i>0 && nums[i]==nums[i-1]) continue; int l=i+1,r=n-1; while (l<r) { int sum=nums[i]+nums[l]+nums[r]; if (sum==0) { ans.add(List.of(nums[i],nums[l],nums[r])); while (l<r && nums[l]==nums[++l]); while (l<r && nums[r]==nums[--r]); } else if (sum<0) l++; else r--; } }",
      "Early break if nums[i]>0 when targeting 0 after sort.",
    ],
    whenToUse: [
      "All unique k-tuples with a target sum on an unsorted array (k=3 here).",
    ],
    whenNotToUse: [
      "Only need any one triplet — still same approach, early return.",
      "Unsorted stream without ability to store all — different constraints.",
    ],
    complexity: { time: "O(n²)", space: "O(1) extra besides output (sort may use O(log n))" },
    interviewTips: [
      "Start from Two Sum on a sorted array, then add the outer fix loop.",
      "Talk through duplicate skipping with an example like [-1,-1,0,1].",
    ],
    pitfalls: [
      "Forgetting to skip duplicates → TLE or wrong unique set.",
      "Using l++ inside while incorrectly and skipping valid pairs.",
    ],
    practiceIdeas: [
      "LeetCode 15: 3Sum.",
      "3Sum Closest; 4Sum; Two Sum II.",
    ],
    related: ["nc-two-sum", "nc-container-with-most-water", "nc-valid-palindrome"],
  },
  {
    slug: "nc-container-with-most-water",
    track: "dsa",
    category: "NeetCode 75",
    title: "Container With Most Water",
    summary:
      "Heights are vertical lines; pick two indices to maximize (r−l)×min(height[l],height[r]). Two pointers start at the ends and always move the shorter side.",
    depth: "next",
    whyItMatters:
      "Greedy two-pointers classic. Brute O(n²) is obvious; the linear proof is that the wider width only loses when you discard the shorter wall. Related to Trapping Rain Water but not the same.",
    theory: [
      "Area is width times the limiting (shorter) height. From (0,n-1), any better container with the current shorter line would need a taller partner inside — so you can move the shorter index inward safely.",
      "Moving the taller line cannot help while the short one stays: width shrinks and the min cannot increase past the short height.",
      "Ties: move either side (or both); correctness holds.",
    ],
    howItWorks: [
      "int l=0,r=n-1,best=0; while (l<r) { best=Math.max(best, (r-l)*Math.min(height[l],height[r])); if (height[l]<height[r]) l++; else r--; }",
      "return best;",
      "Dry-run [1,8,6,2,5,4,8,3,7] → 49.",
    ],
    whenToUse: [
      "Maximize area between two bars under a min-height × width formula.",
    ],
    whenNotToUse: [
      "Trapping rain water (total water above) — need stack or two-pass water levels.",
      "Histogram largest rectangle — monotonic stack.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    interviewTips: [
      "State the 'move the shorter pointer' rule and why.",
      "Contrast briefly with trapping rain water if they ask.",
    ],
    pitfalls: [
      "Moving both pointers every time and missing optima.",
      "Using max instead of min for the height limit.",
    ],
    practiceIdeas: [
      "LeetCode 11: Container With Most Water.",
      "Trapping Rain Water; Largest Rectangle in Histogram.",
    ],
    related: ["nc-3sum", "nc-best-time-to-buy-and-sell-stock"],
  },
  {
    slug: "nc-best-time-to-buy-and-sell-stock",
    track: "dsa",
    category: "NeetCode 75",
    title: "Best Time to Buy and Sell Stock",
    summary:
      "One buy and one sell later; maximize price[sell]−price[buy]. Track the minimum price so far and the best profit as you scan left to right.",
    depth: "core",
    whyItMatters:
      "Sliding-window / running-min interview that opens the stock DP series (II unlimited, III two transactions, cooldown). Expected O(n) one pass.",
    theory: [
      "For each day as a sell day, the best buy is the minimum price before it. Maintain minSoFar and profit = max(profit, price−minSoFar).",
      "This is the same shape as Kadane on price differences: max subarray of daily gains with at most one segment.",
      "If prices only fall, answer is 0 (no transaction).",
    ],
    howItWorks: [
      "int minPrice=Integer.MAX_VALUE, best=0; for (int p : prices) { minPrice=Math.min(minPrice,p); best=Math.max(best,p-minPrice); }",
      "return best;",
      "Empty array → 0.",
    ],
    whenToUse: [
      "Single transaction max profit; running min / max on a time series.",
    ],
    whenNotToUse: [
      "Multiple transactions — greedy sum of uphill segments (Stock II).",
      "k transactions — DP states.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    interviewTips: [
      "Clarify one transaction and that buy must precede sell.",
      "Mention the diff-array Kadane equivalence if they push DP.",
    ],
    pitfalls: [
      "Allowing sell before buy by tracking max first incorrectly.",
      "Returning negative profit instead of 0.",
    ],
    practiceIdeas: [
      "LeetCode 121: Best Time to Buy and Sell Stock.",
      "Stock II / III / with cooldown.",
    ],
    related: ["nc-maximum-subarray", "nc-container-with-most-water"],
  },
  {
    slug: "nc-longest-substring-without-repeating-characters",
    track: "dsa",
    category: "NeetCode 75",
    title: "Longest Substring Without Repeating Characters",
    summary:
      "Longest window of a string with all unique characters. Expand right; when a duplicate appears, shrink left past the previous occurrence (sliding window + last-seen index map).",
    depth: "next",
    whyItMatters:
      "The sliding-window template interview. HashMap/char→lastIndex or a count set both work. Follow-ups: at most k distinct, exactly k distinct.",
    theory: [
      "Maintain a window [L,R] that is always duplicate-free. On adding s[R], if s[R] already sits in the window, advance L until it does not. Track max R−L+1.",
      "Map from char to last index lets you jump L = max(L, last[c]+1) instead of shrinking one step at a time.",
      "ASCII vs Unicode: int[128]/int[256] vs HashMap<Character,Integer>.",
    ],
    howItWorks: [
      "HashMap<Character,Integer> last = new HashMap<>(); int L=0,best=0; for (int R=0;R<s.length();R++) { char c=s.charAt(R); if (last.containsKey(c)) L=Math.max(L, last.get(c)+1); last.put(c,R); best=Math.max(best,R-L+1); }",
      "Alt: HashSet + while set.contains(c) remove s.charAt(L++) then add.",
      "Empty string → 0.",
    ],
    whenToUse: [
      "Longest / shortest substring under a uniqueness or frequency constraint.",
    ],
    whenNotToUse: [
      "Subsequence (non-contiguous) — different DP.",
      "Permutation-in-string (fixed pattern length) — window of fixed size / need counts.",
    ],
    complexity: { time: "O(n)", space: "O(min(n, alphabet))" },
    interviewTips: [
      "Draw the window on an example like 'abcabcbb'.",
      "Use Math.max(L, …) so L never moves backward.",
    ],
    pitfalls: [
      "Moving L backward when a stale index outside the window is seen.",
      "Updating last index after computing L incorrectly.",
    ],
    practiceIdeas: [
      "LeetCode 3: Longest Substring Without Repeating Characters.",
      "Longest Substring with At Most K Distinct; Fruit Into Baskets.",
    ],
    related: ["nc-longest-repeating-character-replacement", "nc-minimum-window-substring"],
  },
  {
    slug: "nc-longest-repeating-character-replacement",
    track: "dsa",
    category: "NeetCode 75",
    title: "Longest Repeating Character Replacement",
    summary:
      "Longest substring you can make into one repeated character using at most k replacements. Window is valid while (windowLen − maxFreqInWindow) ≤ k.",
    depth: "next",
    whyItMatters:
      "Sliding window with a frequency invariant. You do not need to know which character you flip to — keep the count of the most frequent char in the window.",
    theory: [
      "In a window, the cheapest way to one character is to keep the mode and replace the rest. Replacements needed = length − max(count).",
      "Expand R, update counts and maxFreq. While length−maxFreq > k, shrink L and decrement counts. Optionally you can skip shrinking carefully for the max-length-only variant, but shrinking is clearer.",
      "maxFreq may be stale after shrink; that is OK for finding max length because a larger answer would only need a higher maxFreq.",
    ],
    howItWorks: [
      "int[] cnt=new int[26]; int L=0,maxFreq=0,best=0; for (int R=0;R<s.length();R++) { maxFreq=Math.max(maxFreq, ++cnt[s.charAt(R)-'A']); while (R-L+1-maxFreq>k) cnt[s.charAt(L++)-'A']--; best=Math.max(best,R-L+1); }",
      "Assume uppercase A–Z as in the classic prompt; adjust offset for lowercase.",
      "k=0 → longest run of identical chars.",
    ],
    whenToUse: [
      "Longest window after ≤k edits to a uniform character.",
    ],
    whenNotToUse: [
      "Edit distance between two full strings — DP.",
      "Replace to match a specific target pattern — different counts.",
    ],
    complexity: { time: "O(n) for fixed alphabet", space: "O(1)" },
    interviewTips: [
      "Write the invariant: replacements = len − maxFreq.",
      "Confirm alphabet size.",
    ],
    pitfalls: [
      "Thinking you must recompute maxFreq every shrink (you can, but it is not required for correctness of best).",
      "Off-by-one on window length.",
    ],
    practiceIdeas: [
      "LeetCode 424: Longest Repeating Character Replacement.",
      "Max Consecutive Ones III (flip 0/1 with k).",
    ],
    related: ["nc-longest-substring-without-repeating-characters", "nc-minimum-window-substring"],
  },
  {
    slug: "nc-minimum-window-substring",
    track: "dsa",
    category: "NeetCode 75",
    title: "Minimum Window Substring",
    summary:
      "Smallest window of s that covers every character of t (with multiplicities). Expand until valid, then shrink from the left, tracking the best window.",
    depth: "advanced",
    whyItMatters:
      "Hard sliding-window flagship. Need-count map + 'how many unique requirements satisfied' counter is the standard Java solution. Follow-ups: find all starting indices of anagrams of t.",
    theory: [
      "Build need[] / HashMap for frequencies in t. Scan s with R: when a needed char's window count reaches its need, increment formed. When formed==needSize, try advancing L while the window stays valid, update best.",
      "Characters not in t can be skipped in the sense that they never affect formed; still they sit in the window and affect length.",
      "If no window covers t, return \"\".",
    ],
    howItWorks: [
      "HashMap<Character,Integer> need = new HashMap<>(); for (char c : t.toCharArray()) need.merge(c,1,Integer::sum); int missing=need.size(); HashMap<Character,Integer> win=new HashMap<>();",
      "int L=0,bestL=0,bestLen=Integer.MAX_VALUE; for (int R=0;R<s.length();R++) { char c=s.charAt(R); win.merge(c,1,Integer::sum); if (need.containsKey(c) && win.get(c).intValue()==need.get(c).intValue()) missing--; while (missing==0) { if (R-L+1<bestLen) { bestLen=R-L+1; bestL=L; } char d=s.charAt(L++); win.merge(d,-1,Integer::sum); if (need.containsKey(d) && win.get(d)<need.get(d)) missing++; } }",
      "return bestLen==Integer.MAX_VALUE?\"\":s.substring(bestL,bestL+bestLen);",
    ],
    whenToUse: [
      "Minimum window covering a multiset of required characters.",
    ],
    whenNotToUse: [
      "Subsequence cover (not contiguous) — two pointers on indices, different.",
      "Exact anagram window of fixed length — simpler equal-count check.",
    ],
    complexity: { time: "O(|s|+|t|)", space: "O(|alphabet|)" },
    interviewTips: [
      "Name the formed/missing counter before coding.",
      "Dry-run s=\"ADOBECODEBANC\", t=\"ABC\".",
    ],
    pitfalls: [
      "Comparing counts with == on Integer objects instead of intValue.",
      "Shrinking past validity and forgetting to bump missing.",
    ],
    practiceIdeas: [
      "LeetCode 76: Minimum Window Substring.",
      "Find All Anagrams in a String; Permutation in String.",
    ],
    related: ["nc-longest-substring-without-repeating-characters", "nc-longest-repeating-character-replacement"],
  },
  {
    slug: "nc-valid-parentheses",
    track: "dsa",
    category: "NeetCode 75",
    title: "Valid Parentheses",
    summary:
      "Check whether brackets '()[]{}' are correctly nested and closed. Push openings on a Deque; on a closer, pop and match.",
    depth: "core",
    whyItMatters:
      "The stack interview everyone gets. Teaches LIFO matching. Follow-ups: longest valid parentheses, generate parentheses, min adds to make valid.",
    theory: [
      "A string is valid if every closer matches the latest unmatched opener and nothing remains open at the end. A Deque<Character> as stack stores openers.",
      "Map closers to expected openers: ')'→'(', etc. On closer, if stack empty or pop mismatch → false.",
      "Only bracket characters appear in the classic problem; mixed text would skip non-brackets.",
    ],
    howItWorks: [
      "Deque<Character> st = new ArrayDeque<>(); for (char c : s.toCharArray()) { if (c=='('||c=='['||c=='{') st.push(c); else { if (st.isEmpty()) return false; char o=st.pop(); if (c==')'&&o!='(' || c==']'&&o!='[' || c=='}'&&o!='{') return false; } }",
      "return st.isEmpty();",
      "Empty string → true.",
    ],
    whenToUse: [
      "Nested matching tokens; parse-lite validation.",
    ],
    whenNotToUse: [
      "Score of parentheses / longest valid — need counts or DP on top of a stack.",
      "HTML/XML with named tags — stack of strings, same idea.",
    ],
    complexity: { time: "O(n)", space: "O(n)" },
    interviewTips: [
      "Use ArrayDeque, not Stack class, in modern Java.",
      "End with isEmpty check — leftover openers fail.",
    ],
    pitfalls: [
      "Returning true when stack still has opens.",
      "Popping on empty stack.",
    ],
    practiceIdeas: [
      "LeetCode 20: Valid Parentheses.",
      "Generate Parentheses; Longest Valid Parentheses; Min Add to Make Valid.",
    ],
    related: ["nc-encode-and-decode-strings"],
  },
  {
    slug: "nc-find-minimum-in-rotated-sorted-array",
    track: "dsa",
    category: "NeetCode 75",
    title: "Find Minimum in Rotated Sorted Array",
    summary:
      "A sorted array was rotated; find the minimum (the pivot). Binary search: compare mid to the right end to learn which half is sorted and where the drop lives.",
    depth: "next",
    whyItMatters:
      "Rotated-array binary search without the target. Same pivot idea unlocks Search in Rotated Sorted Array. Distinct elements in the classic NeetCode version.",
    theory: [
      "In a rotated sorted array with unique values there is one drop. If nums[mid] > nums[r], the minimum is strictly right of mid; else the minimum is at mid or left.",
      "Loop while l<r; set l=mid+1 or r=mid. Return nums[l].",
      "With duplicates, worst case degrades — not in the basic problem.",
    ],
    howItWorks: [
      "int l=0,r=nums.length-1; while (l<r) { int mid=l+(r-l)/2; if (nums[mid]>nums[r]) l=mid+1; else r=mid; } return nums[l];",
      "Unrotated array: always take the else branch until l points at index 0.",
      "Single element → that element.",
    ],
    whenToUse: [
      "Find pivot / minimum in a rotated sorted array with distinct values.",
    ],
    whenNotToUse: [
      "Need the full rotation index for other metadata — same search still works.",
      "Duplicates allowed — may need linear scan on equals.",
    ],
    complexity: { time: "O(log n)", space: "O(1)" },
    interviewTips: [
      "Compare mid to nums[r], not nums[l] — fewer edge bugs.",
      "Write mid as l+(r-l)/2 to avoid overflow.",
    ],
    pitfalls: [
      "Using l<=r and returning wrong index.",
      "Moving r=mid-1 and skipping the minimum when nums[mid] is the min.",
    ],
    practiceIdeas: [
      "LeetCode 153: Find Minimum in Rotated Sorted Array.",
      "154 with duplicates; Search in Rotated Sorted Array.",
    ],
    related: ["nc-search-in-rotated-sorted-array"],
  },
  {
    slug: "nc-search-in-rotated-sorted-array",
    track: "dsa",
    category: "NeetCode 75",
    title: "Search in Rotated Sorted Array",
    summary:
      "Search a target in a rotated sorted array in O(log n). At mid, one side is sorted; if target lies in that sorted side, search there, else the other half.",
    depth: "next",
    whyItMatters:
      "Binary search with a twist — shows you can reason about sorted halves. Interview favorite after plain binary search. Distinct values in the NeetCode 75 version.",
    theory: [
      "Exactly one of [l,mid] or [mid,r] is fully sorted (no pivot inside). Check which using nums[l]<=nums[mid]. Then see if target is inside that sorted range; discard the other half.",
      "When nums[mid]==target return mid. Empty → -1.",
      "Duplicates (LC 81) force shrinking when nums[l]==nums[mid]==nums[r].",
    ],
    howItWorks: [
      "int l=0,r=n-1; while (l<=r) { int mid=l+(r-l)/2; if (nums[mid]==target) return mid; if (nums[l]<=nums[mid]) { if (nums[l]<=target && target<nums[mid]) r=mid-1; else l=mid+1; } else { if (nums[mid]<target && target<=nums[r]) l=mid+1; else r=mid-1; } }",
      "return -1;",
      "Dry-run rotated [4,5,6,7,0,1,2] looking for 0 and for 3.",
    ],
    whenToUse: [
      "Membership query on a rotated sorted array with distinct ints.",
    ],
    whenNotToUse: [
      "Unrotated — plain binary search.",
      "Need minimum only — find-min binary search is simpler.",
    ],
    complexity: { time: "O(log n)", space: "O(1)" },
    interviewTips: [
      "Always identify the sorted half first, then ask if target is in range.",
      "Careful with <= on the sorted-half test when duplicates are absent.",
    ],
    pitfalls: [
      "Off-by-one in inclusive bounds (target<nums[mid] vs <=).",
      "Forgetting early equality check at mid.",
    ],
    practiceIdeas: [
      "LeetCode 33: Search in Rotated Sorted Array.",
      "81 with duplicates; Find Minimum in Rotated Sorted Array.",
    ],
    related: ["nc-find-minimum-in-rotated-sorted-array"],
  },
  {
    slug: "nc-reverse-linked-list",
    track: "dsa",
    category: "NeetCode 75",
    title: "Reverse Linked List",
    summary:
      "Reverse a singly linked list in place. Iterative: three pointers prev/curr/next flip curr.next as you walk. Recursive: reverse the tail then point tail back to head.",
    depth: "core",
    whyItMatters:
      "Linked-list muscle memory. Needed inside reorder list, palindrome list, and reverse-k-group. Prefer iterative in interviews unless they ask for recursion.",
    theory: [
      "Iterative reverse rewires next pointers: save next, point curr to prev, advance. New head is the old last node (final prev).",
      "Recursive: reverseList(head.next) returns newHead; then head.next.next=head; head.next=null.",
      "Empty or single node: return head.",
    ],
    howItWorks: [
      "ListNode prev=null, curr=head; while (curr!=null) { ListNode next=curr.next; curr.next=prev; prev=curr; curr=next; } return prev;",
      "Recursive base: if (head==null||head.next==null) return head;",
      "Draw 1→2→3→null becoming null←1←2←3.",
    ],
    whenToUse: [
      "In-place reverse; building block for list surgery.",
    ],
    whenNotToUse: [
      "Need original order preserved — copy values to ArrayList.",
      "Doubly linked — still similar but update prev too.",
    ],
    complexity: { time: "O(n)", space: "O(1) iterative; O(n) recursive stack" },
    interviewTips: [
      "Say 'save next before overwrite' every time.",
      "Offer both iterative and recursive; code iterative.",
    ],
    pitfalls: [
      "Losing the next reference → truncated list.",
      "Forgetting to return prev (returning head which is now the tail).",
    ],
    practiceIdeas: [
      "LeetCode 206: Reverse Linked List.",
      "Reverse Linked List II; Reverse Nodes in k-Group.",
    ],
    related: ["nc-reorder-list", "nc-merge-two-sorted-lists", "nc-linked-list-cycle"],
  },
  {
    slug: "nc-merge-two-sorted-lists",
    track: "dsa",
    category: "NeetCode 75",
    title: "Merge Two Sorted Lists",
    summary:
      "Merge two sorted linked lists into one sorted list by splicing nodes. Dummy head + tail pointer always appends the smaller of list1/list2.",
    depth: "core",
    whyItMatters:
      "Merge step of merge-sort on lists and the gateway to Merge k Sorted Lists. Dummy node avoids special-casing the new head.",
    theory: [
      "Like merging two sorted arrays, but you rewire next pointers instead of writing into a buffer. Whichever side is exhausted, append the remainder in one shot.",
      "Stable if you prefer list1 on ties (or list2) — pick one rule.",
      "Recursive one-liner is cute: return the smaller node after merging its next with the other list.",
    ],
    howItWorks: [
      "ListNode dummy=new ListNode(0), tail=dummy; while (l1!=null && l2!=null) { if (l1.val<=l2.val) { tail.next=l1; l1=l1.next; } else { tail.next=l2; l2=l2.next; } tail=tail.next; }",
      "tail.next = (l1!=null)?l1:l2; return dummy.next;",
      "Either input null → return the other.",
    ],
    whenToUse: [
      "Combine two sorted linked lists; merge step in list sorting.",
    ],
    whenNotToUse: [
      "Arrays — merge into a new int[] with two indices.",
      "k lists — heap or divide-and-conquer merge.",
    ],
    complexity: { time: "O(n+m)", space: "O(1) iterative splice" },
    interviewTips: [
      "Always start with a dummy node in Java interviews.",
      "Mention merge k as the follow-up.",
    ],
    pitfalls: [
      "Advancing the wrong pointer after linking.",
      "Forgetting to attach the leftover chain.",
    ],
    practiceIdeas: [
      "LeetCode 21: Merge Two Sorted Lists.",
      "Merge k Sorted Lists; Sort List (merge sort).",
    ],
    related: ["nc-merge-k-sorted-lists", "nc-reverse-linked-list"],
  },
  {
    slug: "nc-reorder-list",
    track: "dsa",
    category: "NeetCode 75",
    title: "Reorder List",
    summary:
      "Reorder L0→L1→…→Ln to L0→Ln→L1→Ln−1→…. Find mid, reverse the second half, then weave the two halves.",
    depth: "next",
    whyItMatters:
      "Combines three list primitives interviewers love: mid (slow/fast), reverse, and merge-alternate. Doing it with O(n) ArrayList of nodes is acceptable as a first pass then optimize to O(1) extra.",
    theory: [
      "Slow/fast finds the start of the second half; split by cutting mid.next=null. Reverse the second half. Merge by alternating nodes from first and reversed second.",
      "Odd length: first half is longer by one; the weave still works.",
      "In-place expectation is common; clarify space budget.",
    ],
    howItWorks: [
      "Find mid: ListNode slow=head,fast=head; while (fast.next!=null && fast.next.next!=null) { slow=slow.next; fast=fast.next.next; } ListNode second=slow.next; slow.next=null; second=reverse(second);",
      "Weave: while (second!=null) { ListNode n1=head.next,n2=second.next; head.next=second; second.next=n1; head=n1; second=n2; }",
      "Reuse reverse helper from Reverse Linked List.",
    ],
    whenToUse: [
      "Interleave front and back of a singly linked list in place.",
    ],
    whenNotToUse: [
      "Random access needed often — convert to array/list of nodes.",
    ],
    complexity: { time: "O(n)", space: "O(1)" },
    interviewTips: [
      "Narrate the three phases before coding.",
      "Cut the list before reversing so you do not cycle.",
    ],
    pitfalls: [
      "Forgetting to null mid.next → cycle.",
      "Wrong mid on even/odd lengths (use the slow/fast variant carefully).",
    ],
    practiceIdeas: [
      "LeetCode 143: Reorder List.",
      "Palindrome Linked List (reverse second half); Reverse Linked List.",
    ],
    related: ["nc-reverse-linked-list", "nc-remove-nth-node-from-end-of-list"],
  },
  {
    slug: "nc-remove-nth-node-from-end-of-list",
    track: "dsa",
    category: "NeetCode 75",
    title: "Remove Nth Node From End of List",
    summary:
      "Delete the nth node from the end in one pass. Advance a fast pointer n steps, then move fast and slow together; slow.next is the node to drop.",
    depth: "next",
    whyItMatters:
      "Two-pointer gap technique. Dummy head handles deleting the original head cleanly. Two-pass (count length) is fine to mention first.",
    theory: [
      "After fast is n ahead, when fast reaches the last node, slow sits just before the target. Relink slow.next = slow.next.next.",
      "Dummy → head means slow can sit before head when n==length.",
      "Constraints usually guarantee n is valid; still ask.",
    ],
    howItWorks: [
      "ListNode dummy=new ListNode(0,head); ListNode fast=dummy,slow=dummy; for (int i=0;i<n;i++) fast=fast.next;",
      "while (fast.next!=null) { fast=fast.next; slow=slow.next; } slow.next=slow.next.next; return dummy.next;",
      "Alt: count length, then remove (length−n)th from front.",
    ],
    whenToUse: [
      "Delete by offset from the end without knowing length first.",
    ],
    whenNotToUse: [
      "Doubly linked with tail pointer — walk back n from tail.",
      "ArrayList of nodes — index remove.",
    ],
    complexity: { time: "O(L)", space: "O(1)" },
    interviewTips: [
      "Dummy node for head deletion.",
      "Confirm 1-indexed nth from end.",
    ],
    pitfalls: [
      "Off-by-one on how far fast advances (n vs n+1 depending on dummy).",
      "Null pointer when n equals length without dummy.",
    ],
    practiceIdeas: [
      "LeetCode 19: Remove Nth Node From End of List.",
      "Delete Middle Node; Swapping Nodes in a Linked List.",
    ],
    related: ["nc-linked-list-cycle", "nc-reorder-list"],
  },
  {
    slug: "nc-linked-list-cycle",
    track: "dsa",
    category: "NeetCode 75",
    title: "Linked List Cycle",
    summary:
      "Detect whether a linked list has a cycle. Floyd: slow moves one step, fast two; if they meet, there is a cycle. HashSet of visited nodes is the obvious alternative.",
    depth: "core",
    whyItMatters:
      "Floyd's algorithm is the O(1)-space answer interviewers want. Follow-up LC 142: return the cycle entrance using the meet point reset trick.",
    theory: [
      "In a cycle, fast closes the gap on slow and must eventually land on the same node. If fast hits null, no cycle.",
      "HashSet<ListNode> add-until-fail also works in O(n) space.",
      "Entrance: after meet, put one pointer at head; advance both one step; meet at entrance.",
    ],
    howItWorks: [
      "ListNode slow=head,fast=head; while (fast!=null && fast.next!=null) { slow=slow.next; fast=fast.next.next; if (slow==fast) return true; } return false;",
      "Identity compare with == on nodes, not val.",
      "Empty or single without self-loop → false.",
    ],
    whenToUse: [
      "Cycle detection in a singly linked structure; tortoise/hare templates.",
    ],
    whenNotToUse: [
      "Need entrance index — extend with phase 2.",
      "Graph with general branching — visited coloring / DFS stack.",
    ],
    complexity: { time: "O(n)", space: "O(1) Floyd; O(n) HashSet" },
    interviewTips: [
      "Code null checks on fast and fast.next before fast.next.next.",
      "Mention finding the entrance as follow-up.",
    ],
    pitfalls: [
      "Comparing values instead of node references.",
      "Infinite loop if you forget the fast null guards.",
    ],
    practiceIdeas: [
      "LeetCode 141: Linked List Cycle.",
      "Linked List Cycle II; Find the Duplicate Number (cycle view).",
    ],
    related: ["nc-remove-nth-node-from-end-of-list", "nc-merge-k-sorted-lists"],
  },
  {
    slug: "nc-merge-k-sorted-lists",
    track: "dsa",
    category: "NeetCode 75",
    title: "Merge k Sorted Lists",
    summary:
      "Merge k sorted linked lists into one sorted list. Push all heads into a min-heap keyed by val; repeatedly poll the smallest and push its next.",
    depth: "advanced",
    whyItMatters:
      "Heap + lists interview. Divide-and-conquer pairwise merge is the elegant alternative with the same O(N log k). Extends Merge Two Sorted Lists.",
    theory: [
      "Let N be total nodes. Each poll/push is O(log k), done N times → O(N log k). Pairwise merging along a tournament tree is also O(N log k) and uses no PriorityQueue.",
      "Brute merging lists one-by-one into an accumulator is O(kN) in the worst case — mention then improve.",
      "Null lists in the input array should be skipped.",
    ],
    howItWorks: [
      "PriorityQueue<ListNode> pq = new PriorityQueue<>((a,b)->a.val-b.val); for (ListNode node : lists) if (node!=null) pq.offer(node);",
      "ListNode dummy=new ListNode(0), tail=dummy; while (!pq.isEmpty()) { ListNode n=pq.poll(); tail.next=n; tail=n; if (n.next!=null) pq.offer(n.next); } return dummy.next;",
      "D&C: recursively merge left/right halves with mergeTwoLists.",
    ],
    whenToUse: [
      "k-way merge of sorted linked lists or sorted streams.",
    ],
    whenNotToUse: [
      "k=2 — simple two-list merge.",
      "Arrays with random access — same heap idea on indices.",
    ],
    complexity: { time: "O(N log k)", space: "O(k) heap" },
    interviewTips: [
      "State N vs k clearly in the complexity.",
      "Offer heap and divide-and-conquer; implement one fully.",
    ],
    pitfalls: [
      "Offering null heads into the heap.",
      "Comparator integer overflow on large vals — use Integer.compare.",
    ],
    practiceIdeas: [
      "LeetCode 23: Merge k Sorted Lists.",
      "Merge Two Sorted Lists; Smallest Range Covering Elements from K Lists.",
    ],
    related: ["nc-merge-two-sorted-lists", "nc-find-median-from-data-stream"],
  },
  {
    slug: "nc-maximum-depth-of-binary-tree",
    track: "dsa",
    category: "NeetCode 75",
    title: "Maximum Depth of Binary Tree",
    summary:
      "Height of a binary tree: longest root-to-leaf path in nodes. DFS returns 1+max(left,right); BFS counts levels.",
    depth: "core",
    whyItMatters:
      "First tree recursion interview. Same skeleton as diameter, balanced check, and min depth. Clarify whether depth counts nodes or edges.",
    theory: [
      "Empty tree depth 0; leaf depth 1. Recurrence depth(node)=1+max(depth(left),depth(right)).",
      "Level-order: each while-queue iteration is one level; increment answer per level.",
      "Skewed tree makes DFS stack O(n); same as space for recursion.",
    ],
    howItWorks: [
      "int maxDepth(TreeNode r) { if (r==null) return 0; return 1+Math.max(maxDepth(r.left), maxDepth(r.right)); }",
      "BFS: Queue<TreeNode> q=new ArrayDeque<>(); q.offer(root); int d=0; while (!q.isEmpty()) { int sz=q.size(); for (int i=0;i<sz;i++) { TreeNode n=q.poll(); if (n.left!=null) q.offer(n.left); if (n.right!=null) q.offer(n.right); } d++; }",
      "Null root → 0.",
    ],
    whenToUse: [
      "Tree height; warmup for other DFS tree folds.",
    ],
    whenNotToUse: [
      "Diameter (longest any-to-any path) — need depths of both children plus combo.",
      "Graphs with cycles — visited set required.",
    ],
    complexity: { time: "O(n)", space: "O(h) DFS; O(w) BFS" },
    interviewTips: [
      "Ask node-count vs edge-count definition.",
      "Code the one-liner DFS cleanly.",
    ],
    pitfalls: [
      "Returning 1 for null (should be 0).",
      "Confusing max depth with min depth.",
    ],
    practiceIdeas: [
      "LeetCode 104: Maximum Depth of Binary Tree.",
      "Minimum Depth; Diameter of Binary Tree; Balanced Binary Tree.",
    ],
    related: ["nc-same-tree", "nc-invert-binary-tree", "nc-binary-tree-level-order-traversal"],
  },
  {
    slug: "nc-same-tree",
    track: "dsa",
    category: "NeetCode 75",
    title: "Same Tree",
    summary:
      "Decide if two binary trees are structurally identical with equal values. Recursively compare roots then both subtrees; or BFS/DFS pair iteration.",
    depth: "core",
    whyItMatters:
      "Tree equality is the compare helper inside Subtree of Another Tree and many serialization checks. Tiny code, easy to mess up null cases.",
    theory: [
      "Two nulls → true; one null → false; both non-null → vals equal and left/left and right/right same.",
      "Iterative: stack or queue of pairs (p,q); push children in matching order.",
      "Same structure with mirrored values is Invert + Same, not this problem.",
    ],
    howItWorks: [
      "boolean isSame(TreeNode p, TreeNode q) { if (p==null||q==null) return p==q; return p.val==q.val && isSame(p.left,q.left) && isSame(p.right,q.right); }",
      "Short-circuit on value mismatch before recursing if you want.",
      "Both empty → true.",
    ],
    whenToUse: [
      "Structural + value equality of two trees.",
    ],
    whenNotToUse: [
      "Isomorphic ignoring structure — different problem.",
      "Subtree check — scan candidates then isSame.",
    ],
    complexity: { time: "O(n)", space: "O(h)" },
    interviewTips: [
      "Handle nulls in one line with p==q.",
      "Mention reuse inside subtree problems.",
    ],
    pitfalls: [
      "Forgetting to compare both sides.",
      "Using XOR-style null checks incorrectly.",
    ],
    practiceIdeas: [
      "LeetCode 100: Same Tree.",
      "Subtree of Another Tree; Symmetric Tree.",
    ],
    related: ["nc-subtree-of-another-tree", "nc-invert-binary-tree", "nc-maximum-depth-of-binary-tree"],
  },
  {
    slug: "nc-invert-binary-tree",
    track: "dsa",
    category: "NeetCode 75",
    title: "Invert Binary Tree",
    summary:
      "Mirror a binary tree: swap every left/right child. DFS recurse after or before swap; or BFS swap children while exploring.",
    depth: "core",
    whyItMatters:
      "Famous easy tree problem. Tests null handling and whether you can rewrite pointers without losing a child reference. Follow-up: check if a tree is symmetric (mirror of itself).",
    theory: [
      "For each node, swap left and right references, then invert both children (order of swap vs recurse does not matter if you swap once per node).",
      "BFS: queue nodes; for each, swap children and enqueue non-null children.",
      "Empty tree returns null.",
    ],
    howItWorks: [
      "TreeNode invert(TreeNode r) { if (r==null) return null; TreeNode tmp=r.left; r.left=invert(r.right); r.right=invert(tmp); return r; }",
      "Or swap then invert(r.left); invert(r.right);",
      "Iterative: ArrayDeque queue; offer root; while polling swap left/right and offer children.",
    ],
    whenToUse: [
      "Mirror a binary tree; building block for symmetric-tree checks.",
    ],
    whenNotToUse: [
      "Rotate BST structure to rebalance — different rotations.",
    ],
    complexity: { time: "O(n)", space: "O(h) DFS; O(w) BFS" },
    interviewTips: [
      "Save one child in a tmp before overwriting.",
      "Joke optional; correctness first.",
    ],
    pitfalls: [
      "Recursing on the same side twice after a botched swap.",
      "Returning void but interviewer expects the root returned.",
    ],
    practiceIdeas: [
      "LeetCode 226: Invert Binary Tree.",
      "Symmetric Tree; Flip Equivalent Binary Trees.",
    ],
    related: ["nc-same-tree", "nc-maximum-depth-of-binary-tree"],
  },
  {
    slug: "nc-binary-tree-maximum-path-sum",
    track: "dsa",
    category: "NeetCode 75",
    title: "Binary Tree Maximum Path Sum",
    summary:
      "Maximum sum of any non-empty node path (may bend through a node using both children). DFS returns the best upward gain; a global tracks the best bend.",
    depth: "advanced",
    whyItMatters:
      "Hard tree DP interview. Separates 'gain you can offer a parent' from 'best path anywhere'. Negative nodes mean you may drop a child gain with Math.max(0, …).",
    theory: [
      "A path can use at most one bend. At node, candidate = node.val + leftGain + rightGain (leftGain/rightGain ≥ 0). Update global max with that.",
      "Return to parent: node.val + max(leftGain, rightGain, 0) — a parent cannot use both sides.",
      "Initialize global to Integer.MIN_VALUE or root.val so all-negative trees work.",
    ],
    howItWorks: [
      "int[] best={Integer.MIN_VALUE}; int gain(TreeNode n){ if(n==null)return 0; int L=Math.max(0,gain(n.left)); int R=Math.max(0,gain(n.right)); best[0]=Math.max(best[0], n.val+L+R); return n.val+Math.max(L,R); }",
      "gain(root); return best[0];",
      "Single negative node → that node's value.",
    ],
    whenToUse: [
      "Max-sum path in a tree with possible negatives; 'bend' allowed.",
    ],
    whenNotToUse: [
      "Path must be root-to-leaf — different recurrence.",
      "Graph with cycles — not a tree DP.",
    ],
    complexity: { time: "O(n)", space: "O(h)" },
    interviewTips: [
      "Draw a node with two positive children and one negative.",
      "Call out the two roles of the DFS return vs global.",
    ],
    pitfalls: [
      "Returning both children to the parent.",
      "Initializing best to 0 and failing all-negative trees.",
    ],
    practiceIdeas: [
      "LeetCode 124: Binary Tree Maximum Path Sum.",
      "Path Sum II; Diameter of Binary Tree.",
    ],
    related: ["nc-maximum-depth-of-binary-tree", "nc-maximum-subarray"],
  },
  {
    slug: "nc-binary-tree-level-order-traversal",
    track: "dsa",
    category: "NeetCode 75",
    title: "Binary Tree Level Order Traversal",
    summary:
      "Return values level by level (BFS). Queue the root; for each level, poll size nodes into a list and enqueue their children.",
    depth: "next",
    whyItMatters:
      "Canonical BFS-on-tree interview. Template unlocks zigzag, right side view, level averages, and connected-components-by-level ideas.",
    theory: [
      "ArrayDeque as Queue. The for-loop over q.size() freezes the level boundary before you offer children.",
      "DFS with depth parameter into List<List<Integer>> also works; BFS is the natural fit.",
      "Empty tree → empty list (not a list containing empty).",
    ],
    howItWorks: [
      "List<List<Integer>> ans=new ArrayList<>(); if(root==null)return ans; Queue<TreeNode> q=new ArrayDeque<>(); q.offer(root);",
      "while(!q.isEmpty()){ int sz=q.size(); List<Integer> level=new ArrayList<>(sz); for(int i=0;i<sz;i++){ TreeNode n=q.poll(); level.add(n.val); if(n.left!=null)q.offer(n.left); if(n.right!=null)q.offer(n.right);} ans.add(level); }",
      "return ans;",
    ],
    whenToUse: [
      "Process / report nodes by depth; shortest path in an unweighted tree.",
    ],
    whenNotToUse: [
      "Need inorder for BST sorted order — DFS inorder.",
      "Weighted shortest path — Dijkstra.",
    ],
    complexity: { time: "O(n)", space: "O(w) queue width" },
    interviewTips: [
      "Capture sz=q.size() before the inner loop.",
      "Mention zigzag as flipping a level Deque.",
    ],
    pitfalls: [
      "Using q.size() in the loop condition while offering — merges levels.",
      "Returning null instead of empty list.",
    ],
    practiceIdeas: [
      "LeetCode 102: Binary Tree Level Order Traversal.",
      "Binary Tree Zigzag Level Order; Binary Tree Right Side View.",
    ],
    related: ["nc-maximum-depth-of-binary-tree", "nc-serialize-and-deserialize-binary-tree"],
  },
  {
    slug: "nc-serialize-and-deserialize-binary-tree",
    track: "dsa",
    category: "NeetCode 75",
    title: "Serialize and Deserialize Binary Tree",
    summary:
      "Encode a binary tree to a string and rebuild it. BFS with null markers, or preorder with null sentinels — both round-trip if decode mirrors encode.",
    depth: "advanced",
    whyItMatters:
      "Design + trees. Interviewers care that nulls are encoded so structure is unambiguous. Same spirit as Encode and Decode Strings for nodes.",
    theory: [
      "Level-order: queue; append val or 'null'; offer children only for real nodes (or always offer and filter — pick one scheme and stick to it).",
      "Preorder: write val, then serialize left, then right, writing a sentinel for null. Deserialize consumes a token stream with an index/queue of tokens.",
      "Use a delimiter (comma) that cannot appear in the integer formatting you choose.",
    ],
    howItWorks: [
      "serialize BFS: StringBuilder; Queue; while queue: poll, append val or \"#\", if node offer left/right; join with ','.",
      "deserialize: split tokens; if empty/# return null; TreeNode root=new TreeNode(parse); Queue of builders; for each node assign left/right from next tokens.",
      "Preorder alt: use LinkedList<String> tokens; dfs build.",
    ],
    whenToUse: [
      "Persist or transmit a binary tree; clone via serialize round-trip.",
    ],
    whenNotToUse: [
      "BST can serialize values only (rebuild via insert) — loses nothing if unique and order known.",
      "N-ary needs child counts or different delimiters.",
    ],
    complexity: { time: "O(n)", space: "O(n)" },
    interviewTips: [
      "Agree on null token and delimiter before coding.",
      "Write serialize and deserialize against the same example tree.",
    ],
    pitfalls: [
      "Omitting nulls → ambiguous structure.",
      "Mismatch between BFS encode and preorder decode.",
    ],
    practiceIdeas: [
      "LeetCode 297: Serialize and Deserialize Binary Tree.",
      "Serialize BST; Encode N-ary Tree.",
    ],
    related: ["nc-encode-and-decode-strings", "nc-binary-tree-level-order-traversal", "nc-construct-binary-tree-from-preorder-and-inorder-traversal"],
  },
  {
    slug: "nc-subtree-of-another-tree",
    track: "dsa",
    category: "NeetCode 75",
    title: "Subtree of Another Tree",
    summary:
      "Check whether tree t is the subtree of s (same structure and values). DFS on s; at each node run isSameTree(node, t).",
    depth: "core",
    whyItMatters:
      "Composes Same Tree with a traversal. Serialization tricks (include nulls, search as substring) appear as follow-ups but recursive compare is the clear interview path.",
    theory: [
      "t is a subtree if some node in s roots a tree identical to t. Explore every node in s (or prune when vals differ as first check).",
      "Naïve O(n·m) compares; usually accepted. Merkle-hash / serialization can average better.",
      "Empty t is a subtree of every tree by some definitions — confirm; LeetCode t is non-empty typically.",
    ],
    howItWorks: [
      "boolean isSubtree(TreeNode s, TreeNode t) { if (s==null) return false; if (isSame(s,t)) return true; return isSubtree(s.left,t)||isSubtree(s.right,t); }",
      "Reuse isSame from Same Tree.",
      "Optional: if (s.val==t.val && isSame(...)) before recursing children only on failure.",
    ],
    whenToUse: [
      "Subtree / pattern match on binary trees by value structure.",
    ],
    whenNotToUse: [
      "Unordered bag of values — not a subtree.",
      "Subtree by shape ignoring values — drop value checks.",
    ],
    complexity: { time: "O(|s|·|t|) worst case", space: "O(h_s + h_t)" },
    interviewTips: [
      "Factor isSame as a helper — shows structure.",
      "Mention serialization follow-up briefly.",
    ],
    pitfalls: [
      "Only checking root of s.",
      "Using == on trees instead of deep compare.",
    ],
    practiceIdeas: [
      "LeetCode 572: Subtree of Another Tree.",
      "Same Tree; Count Univalue Subtrees.",
    ],
    related: ["nc-same-tree", "nc-serialize-and-deserialize-binary-tree"],
  },
  {
    slug: "nc-construct-binary-tree-from-preorder-and-inorder-traversal",
    track: "dsa",
    category: "NeetCode 75",
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    summary:
      "Rebuild a tree from preorder and inorder arrays. Preorder gives the root; inorder splits left/right sizes. Recurse with index bounds; HashMap val→inorder index.",
    depth: "next",
    whyItMatters:
      "Classic divide-and-conquer on traversals. Shows you understand what preorder/inorder encode. Follow-up: postorder+inorder; preorder+postorder with care.",
    theory: [
      "preorder[0] is root. Find root in inorder at k; left subtree length = k−inLeft. Next preorder segment builds left, then right.",
      "HashMap from value to inorder index makes splits O(1) assuming unique values.",
      "Empty range → null.",
    ],
    howItWorks: [
      "HashMap<Integer,Integer> idx=new HashMap<>(); for(int i=0;i<inorder.length;i++) idx.put(inorder[i],i); int[] preIdx={0};",
      "TreeNode build(int l,int r){ if(l>r)return null; int val=preorder[preIdx[0]++]; TreeNode node=new TreeNode(val); int m=idx.get(val); node.left=build(l,m-1); node.right=build(m+1,r); return node; }",
      "return build(0,inorder.length-1);",
    ],
    whenToUse: [
      "Recover unique binary tree from preorder+inorder (distinct vals).",
    ],
    whenNotToUse: [
      "Duplicate values — ambiguous without more info.",
      "Only one traversal — cannot uniquely rebuild general binary trees.",
    ],
    complexity: { time: "O(n)", space: "O(n) map + O(h) stack" },
    interviewTips: [
      "Draw preorder scan arrow and inorder split on an example.",
      "Emphasize unique values assumption.",
    ],
    pitfalls: [
      "Wrong left size when computing preorder bounds in the index-pair variant.",
      "Mutating a global pre index incorrectly across calls.",
    ],
    practiceIdeas: [
      "LeetCode 105: Construct Binary Tree from Preorder and Inorder.",
      "106 from Postorder and Inorder; Serialize round-trip.",
    ],
    related: ["nc-serialize-and-deserialize-binary-tree", "nc-validate-binary-search-tree"],
  },
  {
    slug: "nc-validate-binary-search-tree",
    track: "dsa",
    category: "NeetCode 75",
    title: "Validate Binary Search Tree",
    summary:
      "Check BST order: every node is within a (low, high) open range from its ancestors. DFS passes bounds; or inorder must be strictly increasing.",
    depth: "next",
    whyItMatters:
      "People wrongly only compare node to its children. Interviews punish that. Long/Integer bounds avoid int overflow on MIN/MAX values.",
    theory: [
      "For a node, left subtree must be < node.val and > low; right > node.val and < high. Recurse with updated bounds.",
      "Inorder iterative with a stack: each popped value must be > previous; use Long prev sentinel.",
      "Duplicates: classic problem wants strict BST (left < root < right).",
    ],
    howItWorks: [
      "boolean ok(TreeNode n, long low, long high){ if(n==null)return true; if(n.val<=low||n.val>=high)return false; return ok(n.left,low,n.val)&&ok(n.right,n.val,high); } return ok(root, Long.MIN_VALUE, Long.MAX_VALUE);",
      "Inorder: long prev=Long.MIN_VALUE; on visit if (val<=prev) false else prev=val.",
      "Do not use Integer.MIN_VALUE as a node-comparable bound without long.",
    ],
    whenToUse: [
      "Validate BST property; recover bounds thinking for BST inserts.",
    ],
    whenNotToUse: [
      "Heap shape validation — different rules.",
      "Only local parent-child checks — insufficient.",
    ],
    complexity: { time: "O(n)", space: "O(h)" },
    interviewTips: [
      "Give a counterexample where child compares pass but BST fails.",
      "Use long bounds in Java.",
    ],
    pitfalls: [
      "Only checking left.val < root.val < right.val.",
      "Integer overflow when root.val is Integer.MAX_VALUE and you use ±1 on int bounds.",
    ],
    practiceIdeas: [
      "LeetCode 98: Validate Binary Search Tree.",
      "Kth Smallest in BST; Recover BST.",
    ],
    related: ["nc-kth-smallest-element-in-a-bst", "nc-lowest-common-ancestor-of-a-binary-search-tree"],
  },
  {
    slug: "nc-kth-smallest-element-in-a-bst",
    track: "dsa",
    category: "NeetCode 75",
    title: "Kth Smallest Element in a BST",
    summary:
      "Inorder traversal of a BST yields sorted values; stop at the kth visit. Iterative stack inorder is the usual interview code.",
    depth: "next",
    whyItMatters:
      "BST + inorder pattern. Follow-up: if the tree mutates often, augment nodes with subtree sizes for O(h) select. Prefer iterative to show control of the stack.",
    theory: [
      "Inorder: left, visit, right. The kth visited node is the answer (1-indexed).",
      "Morris traversal is O(1) extra but rarely expected.",
      "Subtree-size augmentation: at node, leftCount+1 == k → answer; else go left or right with adjusted k.",
    ],
    howItWorks: [
      "Deque<TreeNode> st=new ArrayDeque<>(); TreeNode cur=root; while(cur!=null||!st.isEmpty()){ while(cur!=null){ st.push(cur); cur=cur.left;} cur=st.pop(); if(--k==0)return cur.val; cur=cur.right; }",
      "Recursive with int[1] counter also fine.",
      "k guaranteed valid in LeetCode — still mention.",
    ],
    whenToUse: [
      "Order statistic on a BST; sorted enumeration.",
    ],
    whenNotToUse: [
      "Unordered binary tree — need full sort of values O(n log n) or selection on array copy.",
      "Frequent inserts + queries — augment sizes.",
    ],
    complexity: { time: "O(h+k)", space: "O(h)" },
    interviewTips: [
      "Write iterative inorder from memory.",
      "Mention size-augmented follow-up.",
    ],
    pitfalls: [
      "0-vs-1 indexing on k.",
      "Visiting during push instead of pop.",
    ],
    practiceIdeas: [
      "LeetCode 230: Kth Smallest Element in a BST.",
      "Kth Largest; Validate BST inorder.",
    ],
    related: ["nc-validate-binary-search-tree", "nc-lowest-common-ancestor-of-a-binary-search-tree"],
  },
  {
    slug: "nc-lowest-common-ancestor-of-a-binary-search-tree",
    track: "dsa",
    category: "NeetCode 75",
    title: "Lowest Common Ancestor of a BST",
    summary:
      "Find the lowest node that has both p and q as descendants (or is one of them). In a BST, walk from the root: if both vals are < node go left; both > go right; else node is the split (LCA).",
    depth: "next",
    whyItMatters:
      "BST structure beats general-tree LCA. Interviewers contrast with BT LCA (postorder / parent pointers). One pass O(h).",
    theory: [
      "The LCA is the first node where p and q lie in different subtrees (or one equals the node). BST order decides the path uniquely.",
      "Iterative while loop is enough; recursion works too.",
      "Assumes p and q exist in the tree (LeetCode).",
    ],
    howItWorks: [
      "TreeNode cur=root; while(cur!=null){ if(p.val<cur.val && q.val<cur.val) cur=cur.left; else if(p.val>cur.val && q.val>cur.val) cur=cur.right; else return cur; }",
      "Works regardless of which of p/q is larger.",
      "General tree: recurse; if both sides nonempty return node; else return non-null side.",
    ],
    whenToUse: [
      "LCA queries on a BST with known node values.",
    ],
    whenNotToUse: [
      "General binary tree — need different LCA algorithm.",
      "Parent pointers available — climb depths.",
    ],
    complexity: { time: "O(h)", space: "O(1) iterative" },
    interviewTips: [
      "Say the split condition in words before coding.",
      "Contrast with LC 236 Binary Tree LCA.",
    ],
    pitfalls: [
      "Assuming p.val < q.val without handling either order.",
      "Returning null when one node is ancestor of the other (should return the ancestor).",
    ],
    practiceIdeas: [
      "LeetCode 235: LCA of a BST.",
      "236 LCA of Binary Tree; Kth Smallest.",
    ],
    related: ["nc-validate-binary-search-tree", "nc-kth-smallest-element-in-a-bst"],
  },
  {
    slug: "nc-implement-trie-prefix-tree",
    track: "dsa",
    category: "NeetCode 75",
    title: "Implement Trie (Prefix Tree)",
    summary:
      "Support insert, search (full word), and startsWith (prefix) on a set of strings. Each node holds a map/array of children and a boolean end flag.",
    depth: "next",
    whyItMatters:
      "Prefix-tree design interview. Foundation for Add-and-Search Words and Word Search II. Java: TrieNode with TrieNode[26] for a–z or HashMap<Character,TrieNode>.",
    theory: [
      "Shared prefixes share a path from the root. insert walks/creates nodes; marks endOfWord on the last node.",
      "search requires ending on a node with endOfWord true. startsWith only needs the path to exist.",
      "Space trades off against hashmap of words when prefixes are shared heavily.",
    ],
    howItWorks: [
      "class Node { Node[] next=new Node[26]; boolean end; } Node root=new Node();",
      "insert: Node cur=root; for(char c:word.toCharArray()){ int i=c-'a'; if(cur.next[i]==null)cur.next[i]=new Node(); cur=cur.next[i]; } cur.end=true;",
      "search/startsWith: walk; search returns cur!=null&&cur.end; startsWith returns cur!=null after walk.",
    ],
    whenToUse: [
      "Many prefix queries; autocomplete; dictionary sharing prefixes.",
    ],
    whenNotToUse: [
      "Few words, only exact lookup — HashSet.",
      "Huge sparse alphabets — HashMap children.",
    ],
    complexity: { time: "O(L) per op", space: "O(total characters inserted)" },
    interviewTips: [
      "Draw nodes for \"app\" / \"apple\" sharing \"app\".",
      "Clarify lowercase a–z before Node[26].",
    ],
    pitfalls: [
      "search returning true on a prefix that was never inserted as a word.",
      "Forgetting to create child nodes on insert.",
    ],
    practiceIdeas: [
      "LeetCode 208: Implement Trie.",
      "Design Add and Search Words; Replace Words.",
    ],
    related: ["nc-design-add-and-search-words-data-structure", "nc-word-search-ii"],
  },
  {
    slug: "nc-design-add-and-search-words-data-structure",
    track: "dsa",
    category: "NeetCode 75",
    title: "Design Add and Search Words",
    summary:
      "Trie that supports search with '.' wildcards matching any letter. On '.', DFS branch to every child; otherwise follow one edge.",
    depth: "next",
    whyItMatters:
      "Extends Trie with backtracking search. Interview checks recursion on wildcards and end flags. Precursor to Word Search II board DFS + trie.",
    theory: [
      "addWord is standard trie insert. search walks; when char is '.', try all 26 children recursively; when letter, follow that child or fail.",
      "Return true only if a path consumes the whole pattern and lands on endOfWord.",
      "Worst case '.'-heavy patterns explore many branches — mention it.",
    ],
    howItWorks: [
      "boolean dfs(Node node, String w, int i){ if(node==null)return false; if(i==w.length())return node.end; char c=w.charAt(i); if(c=='.'){ for(Node ch:node.next) if(dfs(ch,w,i+1)) return true; return false; } return dfs(node.next[c-'a'],w,i+1); }",
      "search(word) → dfs(root, word, 0).",
      "Reuse Node[26]+end from Implement Trie.",
    ],
    whenToUse: [
      "Dictionary with wildcard queries; simple regex over letters.",
    ],
    whenNotToUse: [
      "Full regex engines — different automata.",
      "Exact words only — HashSet / plain trie search.",
    ],
    complexity: { time: "O(L) add; search up to O(26^L) worst with dots", space: "O(total chars)" },
    interviewTips: [
      "Start from plain trie, then add the '.' branch.",
      "Discuss worst-case explosion honestly.",
    ],
    pitfalls: [
      "Treating end-of-word true in the middle of the pattern.",
      "Null children not skipped in the '.' loop.",
    ],
    practiceIdeas: [
      "LeetCode 211: Design Add and Search Words.",
      "Implement Trie; Word Search II.",
    ],
    related: ["nc-implement-trie-prefix-tree", "nc-word-search-ii"],
  },
  {
    slug: "nc-word-search-ii",
    track: "dsa",
    category: "NeetCode 75",
    title: "Word Search II",
    summary:
      "Find all dictionary words that appear in a board by adjacent cells (no cell reuse in one word). Build a trie of words; DFS from each cell while walking the trie; prune dead prefixes.",
    depth: "advanced",
    whyItMatters:
      "Hard combo of trie + backtracking. Brute running Word Search I per word TLE; shared trie prefixes prune aggressively. Peak NeetCode trees/tries section.",
    theory: [
      "Insert all words into a trie. From each board cell, DFS four directions marking visited; advance trie pointer; when node.end, add word and optionally clear end to dedupe.",
      "Optimization: delete leaf trie edges after exploring (prune) so later searches skip dead paths.",
      "Word Search I is the single-word version without the trie.",
    ],
    howItWorks: [
      "Build trie from words. List<String> ans=new ArrayList<>(); for each cell dfs(i,j,root).",
      "dfs: if node==null return; if node.word!=null { ans.add(node.word); node.word=null; } char c=board[i][j]; board[i][j]='#'; explore 4 neighbors with node.next[c-'a']; board[i][j]=c;",
      "Store full word string on end node for easy collection.",
    ],
    whenToUse: [
      "Many words to find in a grid; shared prefixes.",
    ],
    whenNotToUse: [
      "One word — plain DFS Word Search.",
      "Words not constrained to grid adjacency — trie alone / Aho-Corasick on text.",
    ],
    complexity: { time: "O(C·3^L) ballpark with pruning (C cells, L max word)", space: "O(total dictionary chars)" },
    interviewTips: [
      "Contrast with running exist() per word.",
      "Mention marking board with '#' for visited.",
    ],
    pitfalls: [
      "Forgetting to restore the board cell after DFS.",
      "Adding the same word multiple times without clearing end.",
    ],
    practiceIdeas: [
      "LeetCode 212: Word Search II.",
      "Word Search (79); Implement Trie.",
    ],
    related: ["nc-implement-trie-prefix-tree", "nc-design-add-and-search-words-data-structure", "nc-word-search"],
  },
];

/** Topics 0..37 enriched here; 38..74 from neetcode-75-b. */
export const topics: Topic[] = [...enriched, ...topicsB];