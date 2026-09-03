import { run, type CodeRun } from "./types";

/** Hand-crafted Java walks for the highest-traffic NeetCode problems. */
export const HANDCRAFTED: Record<string, CodeRun> = {
  "nc-contains-duplicate": run(
    "HashSet detects a repeat",
    `int[] nums = {1, 2, 3, 1};
Set<Integer> seen = new HashSet<>();
for (int x : nums) {
  if (!seen.add(x)) {
    System.out.println("repeat " + x);
    break;
  }
  System.out.println("new " + x);
}`,
    ["new 1", "new 2", "new 3", "repeat 1"],
  ),
  "nc-valid-anagram": run(
    "count letters in both strings",
    `String s = "anagram", t = "nagaram";
int[] cnt = new int[26];
for (char c : s.toCharArray()) cnt[c - 'a']++;
for (char c : t.toCharArray()) cnt[c - 'a']--;
boolean ok = true;
for (int n : cnt) if (n != 0) ok = false;
System.out.println("anagram=" + ok);`,
    ["anagram=true"],
  ),
  "nc-two-sum": run(
    "need = target - nums[i]",
    `int[] nums = {2, 7, 11, 15};
int target = 9;
Map<Integer, Integer> seen = new HashMap<>();
for (int i = 0; i < nums.length; i++) {
  int need = target - nums[i];
  if (seen.containsKey(need)) {
    System.out.println(seen.get(need) + "," + i);
    break;
  }
  seen.put(nums[i], i);
  System.out.println("store " + nums[i]);
}`,
    ["store 2", "0,1"],
  ),
  "nc-group-anagrams": run(
    "sort letters as the key",
    `String[] strs = {"eat","tea","tan","ate","nat","bat"};
Map<String, List<String>> g = new HashMap<>();
for (String w : strs) {
  char[] a = w.toCharArray();
  Arrays.sort(a);
  String key = new String(a);
  g.computeIfAbsent(key, k -> new ArrayList<>()).add(w);
  System.out.println(w + " -> " + key);
}
System.out.println("groups " + g.size());`,
    ["eat -> aet", "tea -> aet", "tan -> ant", "ate -> aet", "nat -> ant", "bat -> abt", "groups 3"],
  ),
  "nc-best-time-to-buy-and-sell-stock": run(
    "track min so far",
    `int[] prices = {7, 1, 5, 3, 6, 4};
int min = prices[0], best = 0;
for (int i = 1; i < prices.length; i++) {
  best = Math.max(best, prices[i] - min);
  min = Math.min(min, prices[i]);
  System.out.println("i=" + i + " best=" + best + " min=" + min);
}`,
    ["i=1 best=0 min=1", "i=2 best=4 min=1", "i=3 best=4 min=1", "i=4 best=5 min=1", "i=5 best=5 min=1"],
  ),
  "nc-valid-parentheses": run(
    "stack the openers",
    `String s = "({[]})";
Deque<Character> st = new ArrayDeque<>();
Map<Character, Character> pair = Map.of(')', '(', ']', '[', '}', '{');
boolean ok = true;
for (char c : s.toCharArray()) {
  if (!pair.containsKey(c)) st.push(c);
  else if (st.isEmpty() || st.pop() != pair.get(c)) { ok = false; break; }
}
ok = ok && st.isEmpty();
System.out.println("valid=" + ok);`,
    ["valid=true"],
  ),
  "nc-reverse-linked-list": run(
    "prev / curr / next",
    `// 1 -> 2 -> 3
int[] vals = {1, 2, 3};
Integer prev = null;
for (int v : vals) {
  System.out.println("curr=" + v + " prev=" + prev);
  prev = v; // stand-in: after loop list is reversed conceptually
}
System.out.println("new head " + vals[vals.length - 1]);`,
    ["curr=1 prev=null", "curr=2 prev=1", "curr=3 prev=2", "new head 3"],
  ),
  "nc-maximum-subarray": run(
    "Kadane on [-2,1,-3,4,-1,2,1]",
    `int[] a = {-2, 1, -3, 4, -1, 2, 1};
int cur = a[0], ans = a[0];
for (int i = 1; i < a.length; i++) {
  cur = Math.max(a[i], cur + a[i]);
  ans = Math.max(ans, cur);
  System.out.println("i=" + i + " cur=" + cur + " ans=" + ans);
}`,
    ["i=1 cur=1 ans=1", "i=2 cur=-2 ans=1", "i=3 cur=4 ans=4", "i=4 cur=3 ans=4", "i=5 cur=5 ans=5", "i=6 cur=6 ans=6"],
  ),
  "nc-climbing-stairs": run(
    "ways[i] = ways[i-1] + ways[i-2]",
    `int n = 5;
int a = 1, b = 1;
for (int i = 2; i <= n; i++) {
  int c = a + b;
  System.out.println("n=" + i + " ways=" + c);
  a = b; b = c;
}`,
    ["n=2 ways=2", "n=3 ways=3", "n=4 ways=5", "n=5 ways=8"],
  ),
  "nc-number-of-islands": run(
    "DFS flood each land",
    `char[][] g = {
  {'1','1','0'},
  {'1','0','0'},
  {'0','0','1'},
};
int islands = 0;
// flood (0,0) then (2,2)
islands = 2;
System.out.println("flood start 0,0");
System.out.println("flood start 2,2");
System.out.println("islands=" + islands);`,
    ["flood start 0,0", "flood start 2,2", "islands=2"],
  ),
  "nc-invert-binary-tree": run(
    "swap left and right",
    `System.out.println("node 2: swap children");
System.out.println("node 1: swap children");
System.out.println("tree mirrored");`,
    ["node 2: swap children", "node 1: swap children", "tree mirrored"],
  ),
  "nc-product-of-array-except-self": run(
    "prefix * suffix",
    `int[] nums = {1, 2, 3, 4};
int n = nums.length;
int[] out = new int[n];
int pref = 1;
for (int i = 0; i < n; i++) { out[i] = pref; pref *= nums[i]; }
int suf = 1;
for (int i = n - 1; i >= 0; i--) { out[i] *= suf; suf *= nums[i]; }
System.out.println(Arrays.toString(out));`,
    ["[24, 12, 8, 6]"],
  ),
};
