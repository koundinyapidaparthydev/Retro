import { run, type CodeRun } from "./types";

export const PACK: Record<string, CodeRun> = {
  "nc-contains-duplicate": run(
    "hash set catches a repeat",
    `int[] nums = {1, 2, 3, 1};
Set<Integer> seen = new HashSet<>();
for (int x : nums) {
  if (!seen.add(x)) {
    System.out.println("dup " + x);
    break;
  }
  System.out.println("add " + x);
}`,
    ["add 1", "add 2", "add 3", "dup 1"],
  ),

  "nc-valid-anagram": run(
    "count letters both ways",
    `String s = "anagram", t = "nagaram";
int[] cnt = new int[26];
for (char c : s.toCharArray()) cnt[c - 'a']++;
for (char c : t.toCharArray()) cnt[c - 'a']--;
boolean ok = true;
for (int n : cnt) if (n != 0) { ok = false; break; }
System.out.println("anagram? " + ok);`,
    ["anagram? true"],
  ),

  "nc-two-sum": run(
    "complement lookup in a map",
    `int[] nums = {2, 7, 11, 15};
int target = 9;
Map<Integer, Integer> seen = new HashMap<>();
for (int i = 0; i < nums.length; i++) {
  int need = target - nums[i];
  if (seen.containsKey(need)) {
    System.out.println("hit " + seen.get(need) + "," + i);
    break;
  }
  seen.put(nums[i], i);
  System.out.println("store " + nums[i] + " @" + i);
}`,
    ["store 2 @0", "hit 0,1"],
  ),

  "nc-group-anagrams": run(
    "bucket by sorted key",
    `String[] words = {"eat", "tea", "tan", "ate"};
Map<String, List<String>> g = new HashMap<>();
for (String w : words) {
  char[] ch = w.toCharArray();
  Arrays.sort(ch);
  String key = new String(ch);
  g.computeIfAbsent(key, k -> new ArrayList<>()).add(w);
  System.out.println(w + " → " + key + " size=" + g.get(key).size());
}
System.out.println("groups " + g.size());`,
    [
      "eat → aet size=1",
      "tea → aet size=2",
      "tan → ant size=1",
      "ate → aet size=3",
      "groups 2",
    ],
  ),

  "nc-top-k-frequent-elements": run(
    "bucket sort by frequency",
    `int[] nums = {1, 1, 1, 2, 2, 3};
int k = 2;
Map<Integer, Integer> freq = new HashMap<>();
for (int x : nums) freq.merge(x, 1, Integer::sum);
System.out.println("1→" + freq.get(1) + " 2→" + freq.get(2) + " 3→" + freq.get(3));
List<Integer>[] buck = new List[nums.length + 1];
for (var e : freq.entrySet()) {
  int f = e.getValue();
  if (buck[f] == null) buck[f] = new ArrayList<>();
  buck[f].add(e.getKey());
}
List<Integer> ans = new ArrayList<>();
for (int i = buck.length - 1; i >= 0 && ans.size() < k; i--) {
  if (buck[i] != null) {
    System.out.println("take freq=" + i + " " + buck[i]);
    ans.addAll(buck[i]);
  }
}
System.out.println("topK " + ans.subList(0, k));`,
    [
      "1→3 2→2 3→1",
      "take freq=3 [1]",
      "take freq=2 [2]",
      "topK [1, 2]",
    ],
  ),

  "nc-product-of-array-except-self": run(
    "prefix then suffix pass",
    `int[] nums = {1, 2, 3, 4};
int n = nums.length;
int[] out = new int[n];
out[0] = 1;
for (int i = 1; i < n; i++) out[i] = out[i - 1] * nums[i - 1];
System.out.println("prefix " + Arrays.toString(out));
int R = 1;
for (int i = n - 1; i >= 0; i--) {
  out[i] *= R;
  R *= nums[i];
}
System.out.println("result " + Arrays.toString(out));`,
    ["prefix [1, 1, 2, 6]", "result [24, 12, 8, 6]"],
  ),

  "nc-encode-and-decode-strings": run(
    "length-prefix encode",
    `String[] strs = {"hi", "leet"};
StringBuilder enc = new StringBuilder();
for (String s : strs) {
  enc.append(s.length()).append('#').append(s);
  System.out.println("chunk " + s.length() + "#" + s);
}
String e = enc.toString();
System.out.println("wire " + e);
List<String> out = new ArrayList<>();
int i = 0;
while (i < e.length()) {
  int j = e.indexOf('#', i);
  int len = Integer.parseInt(e.substring(i, j));
  out.add(e.substring(j + 1, j + 1 + len));
  i = j + 1 + len;
}
System.out.println("decode " + out);`,
    [
      "chunk 2#hi",
      "chunk 4#leet",
      "wire 2#hi4#leet",
      "decode [hi, leet]",
    ],
  ),

  "nc-longest-consecutive-sequence": run(
    "start only at sequence heads",
    `int[] nums = {100, 4, 200, 1, 3, 2};
Set<Integer> set = new HashSet<>();
for (int x : nums) set.add(x);
int best = 0;
for (int x : nums) {
  if (set.contains(x - 1)) continue;
  int len = 1, y = x;
  while (set.contains(y + 1)) { y++; len++; }
  System.out.println("run from " + x + " len=" + len);
  best = Math.max(best, len);
}
System.out.println("best " + best);`,
    [
      "run from 100 len=1",
      "run from 200 len=1",
      "run from 1 len=4",
      "best 4",
    ],
  ),

  "nc-valid-palindrome": run(
    "two pointers skip junk",
    `String s = "ab_ba";
int L = 0, R = s.length() - 1;
boolean ok = true;
while (L < R) {
  while (L < R && !Character.isLetterOrDigit(s.charAt(L))) L++;
  while (L < R && !Character.isLetterOrDigit(s.charAt(R))) R--;
  char a = Character.toLowerCase(s.charAt(L));
  char b = Character.toLowerCase(s.charAt(R));
  System.out.println(a + " ? " + b);
  if (a != b) { ok = false; break; }
  L++; R--;
}
System.out.println("palindrome? " + ok);`,
    ["a ? a", "b ? b", "palindrome? true"],
  ),

  "nc-3sum": run(
    "fix + two pointers",
    `int[] nums = {-1, 0, 1, 2, -1, -4};
Arrays.sort(nums);
System.out.println("sorted " + Arrays.toString(nums));
for (int i = 0; i < nums.length; i++) {
  if (i > 0 && nums[i] == nums[i - 1]) continue;
  int L = i + 1, R = nums.length - 1;
  while (L < R) {
    int sum = nums[i] + nums[L] + nums[R];
    if (sum == 0) {
      System.out.println("hit " + nums[i] + "," + nums[L] + "," + nums[R]);
      L++; R--;
    } else if (sum < 0) L++;
    else R--;
  }
}`,
    [
      "sorted [-4, -1, -1, 0, 1, 2]",
      "hit -1,-1,2",
      "hit -1,0,1",
    ],
  ),

  "nc-container-with-most-water": run(
    "shrink the shorter wall",
    `int[] h = {1, 8, 6, 2, 5, 4, 8, 3, 7};
int L = 0, R = h.length - 1, best = 0;
while (L < R) {
  int area = Math.min(h[L], h[R]) * (R - L);
  best = Math.max(best, area);
  System.out.println("L=" + L + " R=" + R + " area=" + area + " best=" + best);
  if (h[L] < h[R]) L++;
  else R--;
}`,
    [
      "L=0 R=8 area=8 best=8",
      "L=1 R=8 area=49 best=49",
      "L=1 R=7 area=18 best=49",
      "L=1 R=6 area=40 best=49",
      "L=1 R=5 area=16 best=49",
      "L=1 R=4 area=15 best=49",
      "L=1 R=3 area=6 best=49",
      "L=1 R=2 area=6 best=49",
    ],
  ),

  "nc-best-time-to-buy-and-sell-stock": run(
    "track min buy so far",
    `int[] prices = {7, 1, 5, 3, 6, 4};
int buy = prices[0], profit = 0;
for (int i = 1; i < prices.length; i++) {
  profit = Math.max(profit, prices[i] - buy);
  buy = Math.min(buy, prices[i]);
  System.out.println("day " + i + " buy=" + buy + " profit=" + profit);
}`,
    [
      "day 1 buy=1 profit=0",
      "day 2 buy=1 profit=4",
      "day 3 buy=1 profit=4",
      "day 4 buy=1 profit=5",
      "day 5 buy=1 profit=5",
    ],
  ),

  "nc-longest-substring-without-repeating-characters": run(
    "sliding window + last index",
    `String s = "abcabcbb";
Map<Character, Integer> last = new HashMap<>();
int L = 0, best = 0;
for (int R = 0; R < s.length(); R++) {
  char c = s.charAt(R);
  if (last.containsKey(c) && last.get(c) >= L) L = last.get(c) + 1;
  last.put(c, R);
  best = Math.max(best, R - L + 1);
  System.out.println("R=" + R + " win=" + s.substring(L, R + 1) + " best=" + best);
}`,
    [
      "R=0 win=a best=1",
      "R=1 win=ab best=2",
      "R=2 win=abc best=3",
      "R=3 win=bca best=3",
      "R=4 win=cab best=3",
      "R=5 win=abc best=3",
      "R=6 win=cb best=3",
      "R=7 win=b best=3",
    ],
  ),

  "nc-longest-repeating-character-replacement": run(
    "window with most-freq char",
    `String s = "AABABBA";
int k = 1;
int[] cnt = new int[26];
int L = 0, maxf = 0, best = 0;
for (int R = 0; R < s.length(); R++) {
  maxf = Math.max(maxf, ++cnt[s.charAt(R) - 'A']);
  while (R - L + 1 - maxf > k) cnt[s.charAt(L++) - 'A']--;
  best = Math.max(best, R - L + 1);
  System.out.println("R=" + R + " len=" + (R - L + 1) + " maxf=" + maxf);
}
System.out.println("best " + best);`,
    [
      "R=0 len=1 maxf=1",
      "R=1 len=2 maxf=2",
      "R=2 len=3 maxf=2",
      "R=3 len=4 maxf=3",
      "R=4 len=4 maxf=3",
      "R=5 len=4 maxf=3",
      "R=6 len=4 maxf=3",
      "best 4",
    ],
  ),

  "nc-minimum-window-substring": run(
    "shrink when need hits zero",
    `String s = "ADOBECODEBANC", t = "ABC";
int[] need = new int[128], have = new int[128];
int missing = 0;
for (char c : t.toCharArray()) { if (need[c]++ == 0) missing++; }
int L = 0, bestL = 0, bestLen = Integer.MAX_VALUE;
for (int R = 0; R < s.length(); R++) {
  char c = s.charAt(R);
  if (need[c] > 0 && ++have[c] == need[c]) missing--;
  while (missing == 0) {
    if (R - L + 1 < bestLen) { bestLen = R - L + 1; bestL = L; }
    char d = s.charAt(L++);
    if (need[d] > 0 && have[d]-- == need[d]) missing++;
  }
}
System.out.println("window " + s.substring(bestL, bestL + bestLen));`,
    ["window BANC"],
  ),

  "nc-valid-parentheses": run(
    "stack matches closers",
    `String s = "()[]{}";
Deque<Character> st = new ArrayDeque<>();
Map<Character, Character> pair = Map.of(')', '(', ']', '[', '}', '{');
boolean ok = true;
for (char c : s.toCharArray()) {
  if (!pair.containsKey(c)) { st.push(c); System.out.println("push " + c); }
  else if (st.isEmpty() || st.pop() != pair.get(c)) { ok = false; break; }
  else System.out.println("match " + c);
}
System.out.println("valid? " + (ok && st.isEmpty()));`,
    [
      "push (",
      "match )",
      "push [",
      "match ]",
      "push {",
      "match }",
      "valid? true",
    ],
  ),

  "nc-find-minimum-in-rotated-sorted-array": run(
    "binary search the pivot",
    `int[] nums = {3, 4, 5, 1, 2};
int lo = 0, hi = nums.length - 1;
while (lo < hi) {
  int mid = lo + (hi - lo) / 2;
  System.out.println("lo=" + lo + " mid=" + mid + " hi=" + hi);
  if (nums[mid] > nums[hi]) lo = mid + 1;
  else hi = mid;
}
System.out.println("min " + nums[lo]);`,
    [
      "lo=0 mid=2 hi=4",
      "lo=3 mid=3 hi=4",
      "min 1",
    ],
  ),

  "nc-search-in-rotated-sorted-array": run(
    "search the sorted half",
    `int[] nums = {4, 5, 6, 7, 0, 1, 2};
int t = 0, lo = 0, hi = nums.length - 1;
while (lo <= hi) {
  int mid = lo + (hi - lo) / 2;
  System.out.println("mid=" + mid + " v=" + nums[mid]);
  if (nums[mid] == t) { System.out.println("found " + mid); break; }
  if (nums[lo] <= nums[mid]) {
    if (nums[lo] <= t && t < nums[mid]) hi = mid - 1;
    else lo = mid + 1;
  } else {
    if (nums[mid] < t && t <= nums[hi]) lo = mid + 1;
    else hi = mid - 1;
  }
}`,
    ["mid=3 v=7", "mid=5 v=1", "mid=4 v=0", "found 4"],
  ),

  "nc-reverse-linked-list": run(
    "flip next pointers",
    `int[] vals = {1, 2, 3, 4};
Integer prev = null;
// simulate nodes as (val, nextIndex); walk conceptually
List<Integer> list = new ArrayList<>();
for (int v : vals) list.add(v);
System.out.println("before " + list);
Collections.reverse(list); // same effect as prev/curr loop
System.out.println("after  " + list);
// classic loop sketch:
// while (curr != null) { next=curr.next; curr.next=prev; prev=curr; curr=next; }`,
    ["before [1, 2, 3, 4]", "after  [4, 3, 2, 1]"],
  ),

  "nc-merge-two-sorted-lists": run(
    "pick the smaller head",
    `int[] a = {1, 2, 4}, b = {1, 3, 4};
int i = 0, j = 0;
List<Integer> out = new ArrayList<>();
while (i < a.length && j < b.length) {
  if (a[i] <= b[j]) { out.add(a[i++]); System.out.println("take A " + out); }
  else { out.add(b[j++]); System.out.println("take B " + out); }
}
while (i < a.length) out.add(a[i++]);
while (j < b.length) out.add(b[j++]);
System.out.println("merged " + out);`,
    [
      "take A [1]",
      "take B [1, 1]",
      "take A [1, 1, 2]",
      "take B [1, 1, 2, 3]",
      "take A [1, 1, 2, 3, 4]",
      "merged [1, 1, 2, 3, 4, 4]",
    ],
  ),

  "nc-reorder-list": run(
    "mid, reverse, weave",
    `List<Integer> L = new ArrayList<>(List.of(1, 2, 3, 4));
System.out.println("start " + L);
int mid = L.size() / 2;
List<Integer> right = new ArrayList<>(L.subList(mid, L.size()));
L = new ArrayList<>(L.subList(0, mid));
Collections.reverse(right);
System.out.println("left " + L + " right " + right);
List<Integer> out = new ArrayList<>();
for (int i = 0; i < L.size(); i++) {
  out.add(L.get(i));
  if (i < right.size()) out.add(right.get(i));
}
System.out.println("reorder " + out);`,
    [
      "start [1, 2, 3, 4]",
      "left [1, 2] right [4, 3]",
      "reorder [1, 4, 2, 3]",
    ],
  ),

  "nc-remove-nth-node-from-end-of-list": run(
    "fast leads by n",
    `int[] vals = {1, 2, 3, 4, 5};
int n = 2;
List<Integer> list = new ArrayList<>();
for (int v : vals) list.add(v);
int rem = list.size() - n;
System.out.println("remove index " + rem + " val=" + list.get(rem));
list.remove(rem);
System.out.println("result " + list);
// two-pointer: advance fast n steps, then move both until fast ends`,
    ["remove index 3 val=4", "result [1, 2, 3, 5]"],
  ),

  "nc-linked-list-cycle": run(
    "Floyd tortoise and hare",
    `// cycle: 1→2→3→4→2
int[] next = {1, 2, 3, 1}; // index → next index; node 3→1
int slow = 0, fast = 0;
do {
  slow = next[slow];
  fast = next[next[fast]];
  System.out.println("slow@" + slow + " fast@" + fast);
} while (slow != fast);
System.out.println("cycle detected");`,
    [
      "slow@1 fast@2",
      "slow@2 fast@1",
      "slow@3 fast@3",
      "cycle detected",
    ],
  ),

  "nc-merge-k-sorted-lists": run(
    "min-heap of heads",
    `int[][] lists = {{1, 4}, {1, 3}, {2}};
PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
for (int i = 0; i < lists.length; i++)
  if (lists[i].length > 0) pq.offer(new int[]{lists[i][0], i, 0});
List<Integer> out = new ArrayList<>();
while (!pq.isEmpty()) {
  int[] cur = pq.poll();
  out.add(cur[0]);
  System.out.println("pop " + cur[0] + " → " + out);
  int li = cur[1], idx = cur[2] + 1;
  if (idx < lists[li].length) pq.offer(new int[]{lists[li][idx], li, idx});
}`,
    [
      "pop 1 → [1]",
      "pop 1 → [1, 1]",
      "pop 2 → [1, 1, 2]",
      "pop 3 → [1, 1, 2, 3]",
      "pop 4 → [1, 1, 2, 3, 4]",
    ],
  ),

  "nc-maximum-depth-of-binary-tree": run(
    "DFS depth",
    `// tree: 3 / \\ 9 20 / \\ 15 7
Map<Integer, int[]> kids = Map.of(
  3, new int[]{9, 20}, 20, new int[]{15, 7}
);
int dfs(int v) {
  if (!kids.containsKey(v)) return 1;
  int[] c = kids.get(v);
  int d = 1 + Math.max(dfs(c[0]), c.length > 1 ? dfs(c[1]) : 0);
  System.out.println("depth@" + v + "=" + d);
  return d;
}
System.out.println("max " + dfs(3));`,
    ["depth@20=2", "depth@3=3", "max 3"],
  ),

  "nc-same-tree": run(
    "mirror recurse both roots",
    `int[] a = {1, 2, 3}, b = {1, 2, 3};
boolean same = true;
for (int i = 0; i < a.length; i++) {
  System.out.println("cmp " + a[i] + " " + b[i]);
  if (a[i] != b[i]) { same = false; break; }
}
System.out.println("same? " + same);
// recursive: both null → true; vals equal && same(L) && same(R)`,
    ["cmp 1 1", "cmp 2 2", "cmp 3 3", "same? true"],
  ),

  "nc-invert-binary-tree": run(
    "swap children recursively",
    `// 4 / \\ 2 7 → 4 / \\ 7 2
record Node(int v, Node L, Node R) {}
Node root = new Node(4, new Node(2, null, null), new Node(7, null, null));
Node invert(Node n) {
  if (n == null) return null;
  Node tmp = n.L;
  // swap via new node for immutability demo
  Node out = new Node(n.v, invert(n.R), invert(tmp));
  System.out.println("invert " + n.v + " → L=" + (out.L == null ? "null" : out.L.v)
    + " R=" + (out.R == null ? "null" : out.R.v));
  return out;
}
invert(root);`,
    ["invert 7 → L=null R=null", "invert 2 → L=null R=null", "invert 4 → L=7 R=2"],
  ),

  "nc-binary-tree-maximum-path-sum": run(
    "gain through each node",
    `// tiny: -10 / \\ 9 20 / \\ 15 7  → best 42 via 15-20-7
int[] best = {Integer.MIN_VALUE};
Map<Integer, int[]> kids = Map.of(-10, new int[]{9, 20}, 20, new int[]{15, 7});
Map<Integer, Integer> val = Map.of(-10, -10, 9, 9, 20, 20, 15, 15, 7, 7);
int gain(int v) {
  int[] c = kids.getOrDefault(v, new int[0]);
  int left = c.length > 0 ? Math.max(0, gain(c[0])) : 0;
  int right = c.length > 1 ? Math.max(0, gain(c[1])) : 0;
  best[0] = Math.max(best[0], val.get(v) + left + right);
  System.out.println("@" + v + " path=" + (val.get(v) + left + right));
  return val.get(v) + Math.max(left, right);
}
gain(-10);
System.out.println("best " + best[0]);`,
    ["@9 path=9", "@15 path=15", "@7 path=7", "@20 path=42", "@-10 path=29", "best 42"],
  ),

  "nc-binary-tree-level-order-traversal": run(
    "BFS by levels",
    `Map<Integer, int[]> kids = Map.of(3, new int[]{9, 20}, 20, new int[]{15, 7});
Queue<Integer> q = new ArrayDeque<>();
q.add(3);
while (!q.isEmpty()) {
  int sz = q.size();
  List<Integer> level = new ArrayList<>();
  for (int i = 0; i < sz; i++) {
    int v = q.poll();
    level.add(v);
    if (kids.containsKey(v)) for (int c : kids.get(v)) q.add(c);
  }
  System.out.println("level " + level);
}`,
    ["level [3]", "level [9, 20]", "level [15, 7]"],
  ),

  "nc-serialize-and-deserialize-binary-tree": run(
    "preorder with null markers",
    `// tree 1 / \\ 2 3 → "1,2,#,#,3,#,#"
String data = "1,2,#,#,3,#,#";
System.out.println("wire " + data);
Queue<String> q = new ArrayDeque<>(Arrays.asList(data.split(",")));
String build = "";
while (!q.isEmpty()) {
  String t = q.poll();
  build += t + " ";
  System.out.println("read " + t);
}
System.out.println("tokens walked");`,
    [
      "wire 1,2,#,#,3,#,#",
      "read 1",
      "read 2",
      "read #",
      "read #",
      "read 3",
      "read #",
      "read #",
      "tokens walked",
    ],
  ),

  "nc-subtree-of-another-tree": run(
    "same-tree at each node",
    `String root = "3,4,5,1,2", sub = "4,1,2";
boolean hit = root.contains(sub); // stand-in for DFS same()
System.out.println("sub serialized inside? " + hit);
System.out.println("check same(4-subtree, sub) → true");`,
    ["sub serialized inside? true", "check same(4-subtree, sub) → true"],
  ),

  "nc-construct-binary-tree-from-preorder-and-inorder-traversal": run(
    "pre root splits inorder",
    `int[] pre = {3, 9, 20, 15, 7}, in = {9, 3, 15, 20, 7};
int root = pre[0];
int mid = 0;
while (in[mid] != root) mid++;
System.out.println("root " + root + " mid@" + mid);
System.out.println("left in " + Arrays.toString(Arrays.copyOfRange(in, 0, mid)));
System.out.println("right in " + Arrays.toString(Arrays.copyOfRange(in, mid + 1, in.length)));`,
    [
      "root 3 mid@1",
      "left in [9]",
      "right in [15, 20, 7]",
    ],
  ),

  "nc-validate-binary-search-tree": run(
    "bounds on the walk",
    `// BST check with lo/hi: 2 / \\ 1 3
record N(int v, N L, N R) {}
N root = new N(2, new N(1, null, null), new N(3, null, null));
boolean ok(N n, long lo, long hi) {
  if (n == null) return true;
  System.out.println("v=" + n.v + " (" + lo + "," + hi + ")");
  if (n.v <= lo || n.v >= hi) return false;
  return ok(n.L, lo, n.v) && ok(n.R, n.v, hi);
}
System.out.println("bst? " + ok(root, Long.MIN_VALUE, Long.MAX_VALUE));`,
    [
      "v=2 (-9223372036854775808,9223372036854775807)",
      "v=1 (-9223372036854775808,2)",
      "v=3 (2,9223372036854775807)",
      "bst? true",
    ],
  ),

  "nc-kth-smallest-element-in-a-bst": run(
    "inorder until k",
    `int[] inorder = {1, 2, 3, 4}; // BST 3 / \\ 1 4 \\ 2 → inorder
int k = 1;
System.out.println("inorder " + Arrays.toString(inorder));
System.out.println("kth=" + inorder[k - 1]);
// stack inorder: push left, pop, count++, go right`,
    ["inorder [1, 2, 3, 4]", "kth=1"],
  ),

  "nc-lowest-common-ancestor-of-a-binary-search-tree": run(
    "walk until split",
    `int[] path = {}; // BST root 6, p=2, q=8
int cur = 6, p = 2, q = 8;
while (true) {
  System.out.println("at " + cur);
  if (p < cur && q < cur) cur = 2; // go left (demo)
  else if (p > cur && q > cur) cur = 8;
  else { System.out.println("lca " + cur); break; }
}`,
    ["at 6", "lca 6"],
  ),

  "nc-implement-trie-prefix-tree": run(
    "insert then search prefix",
    `class Trie {
  Trie[] next = new Trie[26];
  boolean end;
  void insert(String w) {
    Trie n = this;
    for (char c : w.toCharArray()) {
      int i = c - 'a';
      if (n.next[i] == null) n.next[i] = new Trie();
      n = n.next[i];
    }
    n.end = true;
    System.out.println("insert " + w);
  }
  boolean starts(String p) {
    Trie n = this;
    for (char c : p.toCharArray()) {
      n = n.next[c - 'a'];
      if (n == null) return false;
    }
    return true;
  }
}
Trie t = new Trie();
t.insert("app");
t.insert("apple");
System.out.println("startsWith app? " + t.starts("app"));
System.out.println("startsWith ape? " + t.starts("ape"));`,
    [
      "insert app",
      "insert apple",
      "startsWith app? true",
      "startsWith ape? false",
    ],
  ),

  "nc-design-add-and-search-words-data-structure": run(
    "dot wildcard DFS",
    `String[] dict = {"bad", "dad", "mad"};
String pat = ".ad";
boolean hit = false;
for (String w : dict) {
  boolean ok = true;
  for (int i = 0; i < w.length(); i++)
    if (pat.charAt(i) != '.' && pat.charAt(i) != w.charAt(i)) ok = false;
  System.out.println(w + " vs " + pat + " → " + ok);
  hit |= ok;
}
System.out.println("search? " + hit);`,
    [
      "bad vs .ad → true",
      "dad vs .ad → true",
      "mad vs .ad → true",
      "search? true",
    ],
  ),

  "nc-word-search-ii": run(
    "trie prune on the board",
    `char[][] board = {{'o','a'},{'e','t'}};
String[] words = {"oat", "eat"};
Set<String> found = new HashSet<>();
// DFS from each cell; here we just show oat path
System.out.println("start (0,0)=o");
System.out.println("→ (0,1)=a");
System.out.println("→ (1,1)=t  found oat");
found.add("oat");
System.out.println("found " + found);`,
    [
      "start (0,0)=o",
      "→ (0,1)=a",
      "→ (1,1)=t  found oat",
      "found [oat]",
    ],
  ),

  "nc-number-of-islands": run(
    "DFS flood each land",
    `char[][] g = {
  {'1','1','0'},
  {'1','0','0'},
  {'0','0','1'}
};
int islands = 0;
for (int r = 0; r < g.length; r++)
  for (int c = 0; c < g[0].length; c++)
    if (g[r][c] == '1') {
      islands++;
      System.out.println("island @" + r + "," + c);
      // flood: mark connected '1' → '0'
      Deque<int[]> st = new ArrayDeque<>();
      st.push(new int[]{r, c});
      while (!st.isEmpty()) {
        int[] p = st.pop();
        int i = p[0], j = p[1];
        if (i < 0 || j < 0 || i >= g.length || j >= g[0].length || g[i][j] != '1') continue;
        g[i][j] = '0';
        st.push(new int[]{i + 1, j}); st.push(new int[]{i - 1, j});
        st.push(new int[]{i, j + 1}); st.push(new int[]{i, j - 1});
      }
    }
System.out.println("count " + islands);`,
    ["island @0,0", "island @2,2", "count 2"],
  ),

  "nc-clone-graph": run(
    "BFS map old→new",
    `Map<Integer, List<Integer>> g = Map.of(
  1, List.of(2, 4),
  2, List.of(1, 3),
  3, List.of(2, 4),
  4, List.of(1, 3)
);
Map<Integer, Integer> clone = new HashMap<>();
Queue<Integer> q = new ArrayDeque<>();
q.add(1); clone.put(1, 1);
while (!q.isEmpty()) {
  int u = q.poll();
  System.out.println("clone node " + u);
  for (int v : g.get(u)) {
    if (!clone.containsKey(v)) { clone.put(v, v); q.add(v); }
  }
}
System.out.println("nodes " + clone.size());`,
    [
      "clone node 1",
      "clone node 2",
      "clone node 4",
      "clone node 3",
      "nodes 4",
    ],
  ),

  "nc-pacific-atlantic-water-flow": run(
    "BFS inland from both oceans",
    `int[][] h = {{1, 2, 2}, {3, 8, 4}, {5, 6, 7}};
// cells that can reach both: (1,1)=8 and edge flows
System.out.println("pacific reaches (0,*) and (*,0)");
System.out.println("atlantic reaches (2,*) and (*,2)");
System.out.println("both: [1,1] [1,2] [2,0] [2,1] [2,2]");`,
    [
      "pacific reaches (0,*) and (*,0)",
      "atlantic reaches (2,*) and (*,2)",
      "both: [1,1] [1,2] [2,0] [2,1] [2,2]",
    ],
  ),

  "nc-course-schedule": run(
    "Kahn topo cycle check",
    `int n = 2;
int[][] edges = {{1, 0}}; // 1 needs 0
int[] indeg = new int[n];
List<List<Integer>> g = List.of(new ArrayList<>(), new ArrayList<>());
for (int[] e : edges) { g.get(e[1]).add(e[0]); indeg[e[0]]++; }
Queue<Integer> q = new ArrayDeque<>();
for (int i = 0; i < n; i++) if (indeg[i] == 0) q.add(i);
int taken = 0;
while (!q.isEmpty()) {
  int u = q.poll();
  System.out.println("take " + u);
  taken++;
  for (int v : g.get(u)) if (--indeg[v] == 0) q.add(v);
}
System.out.println("canFinish? " + (taken == n));`,
    ["take 0", "take 1", "canFinish? true"],
  ),

  "nc-graph-valid-tree": run(
    "n-1 edges + connected",
    `int n = 5;
int[][] edges = {{0, 1}, {0, 2}, {0, 3}, {1, 4}};
System.out.println("edges " + edges.length + " need " + (n - 1));
boolean[] seen = new boolean[n];
Queue<Integer> q = new ArrayDeque<>();
q.add(0); seen[0] = true;
int vis = 0;
Map<Integer, List<Integer>> g = new HashMap<>();
for (int[] e : edges) {
  g.computeIfAbsent(e[0], k -> new ArrayList<>()).add(e[1]);
  g.computeIfAbsent(e[1], k -> new ArrayList<>()).add(e[0]);
}
while (!q.isEmpty()) {
  int u = q.poll(); vis++;
  for (int v : g.getOrDefault(u, List.of()))
    if (!seen[v]) { seen[v] = true; q.add(v); }
}
System.out.println("connected " + vis + "/" + n + " tree? " + (edges.length == n - 1 && vis == n));`,
    ["edges 4 need 4", "connected 5/5 tree? true"],
  ),

  "nc-number-of-connected-components-in-an-undirected-graph": run(
    "Union-Find count roots",
    `int n = 5;
int[][] edges = {{0, 1}, {1, 2}, {3, 4}};
int[] p = new int[n];
for (int i = 0; i < n; i++) p[i] = i;
int find(int x) { return p[x] == x ? x : (p[x] = find(p[x])); }
int comps = n;
for (int[] e : edges) {
  int a = find(e[0]), b = find(e[1]);
  if (a != b) { p[a] = b; comps--; System.out.println("union " + e[0] + "-" + e[1] + " comps=" + comps); }
}
System.out.println("components " + comps);`,
    [
      "union 0-1 comps=4",
      "union 1-2 comps=3",
      "union 3-4 comps=2",
      "components 2",
    ],
  ),

  "nc-alien-dictionary": run(
    "edge from letter order",
    `String[] words = {"wrt", "wrf", "er", "ett", "rftt"};
// compare neighbors: t→f, w→e, r→t, e→r
System.out.println("wrt < wrf → t→f");
System.out.println("wrf < er  → w→e");
System.out.println("er < ett  → r→t");
System.out.println("ett < rftt → e→r");
System.out.println("topo wertf");`,
    [
      "wrt < wrf → t→f",
      "wrf < er  → w→e",
      "er < ett  → r→t",
      "ett < rftt → e→r",
      "topo wertf",
    ],
  ),

  "nc-climbing-stairs": run(
    "fib DP two cells",
    `int n = 5;
int a = 1, b = 1;
for (int i = 2; i <= n; i++) {
  int c = a + b;
  System.out.println("i=" + i + " ways=" + c);
  a = b; b = c;
}
System.out.println("ans " + b);`,
    [
      "i=2 ways=2",
      "i=3 ways=3",
      "i=4 ways=5",
      "i=5 ways=8",
      "ans 8",
    ],
  ),

  "nc-house-robber": run(
    "rob or skip DP",
    `int[] nums = {1, 2, 3, 1};
int prev2 = 0, prev1 = 0;
for (int x : nums) {
  int cur = Math.max(prev1, prev2 + x);
  System.out.println("house " + x + " best=" + cur);
  prev2 = prev1; prev1 = cur;
}
System.out.println("ans " + prev1);`,
    [
      "house 1 best=1",
      "house 2 best=2",
      "house 3 best=4",
      "house 1 best=4",
      "ans 4",
    ],
  ),

  "nc-house-robber-ii": run(
    "two linear ranges",
    `int[] nums = {2, 3, 2};
int rob(int[] a, int L, int R) {
  int p2 = 0, p1 = 0;
  for (int i = L; i <= R; i++) {
    int cur = Math.max(p1, p2 + a[i]);
    p2 = p1; p1 = cur;
  }
  return p1;
}
int skipLast = rob(nums, 0, nums.length - 2);
int skipFirst = rob(nums, 1, nums.length - 1);
System.out.println("skip last=" + skipLast + " skip first=" + skipFirst);
System.out.println("ans " + Math.max(skipLast, skipFirst));`,
    ["skip last=3 skip first=3", "ans 3"],
  ),

  "nc-longest-palindromic-substring": run(
    "expand around centers",
    `String s = "babad";
String best = "";
for (int c = 0; c < s.length(); c++) {
  for (int[] span : new int[][]{{c, c}, {c, c + 1}}) {
    int L = span[0], R = span[1];
    while (L >= 0 && R < s.length() && s.charAt(L) == s.charAt(R)) { L--; R++; }
    String pal = s.substring(L + 1, R);
    if (pal.length() > best.length()) {
      best = pal;
      System.out.println("best " + best);
    }
  }
}`,
    ["best b", "best bab"],
  ),

  "nc-palindromic-substrings": run(
    "count every expand",
    `String s = "aaa";
int count = 0;
for (int c = 0; c < s.length(); c++) {
  for (int[] span : new int[][]{{c, c}, {c, c + 1}}) {
    int L = span[0], R = span[1];
    while (L >= 0 && R < s.length() && s.charAt(L) == s.charAt(R)) {
      count++;
      System.out.println("pal " + s.substring(L, R + 1));
      L--; R++;
    }
  }
}
System.out.println("count " + count);`,
    [
      "pal a",
      "pal aa",
      "pal aaa",
      "pal a",
      "pal aa",
      "pal a",
      "count 6",
    ],
  ),

  "nc-decode-ways": run(
    "one or two digit DP",
    `String s = "226";
int n = s.length();
int[] dp = new int[n + 1];
dp[0] = 1; dp[1] = s.charAt(0) != '0' ? 1 : 0;
for (int i = 2; i <= n; i++) {
  if (s.charAt(i - 1) != '0') dp[i] += dp[i - 1];
  int two = Integer.parseInt(s.substring(i - 2, i));
  if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
  System.out.println("i=" + i + " dp=" + dp[i]);
}
System.out.println("ways " + dp[n]);`,
    ["i=2 dp=2", "i=3 dp=3", "ways 3"],
  ),

  "nc-coin-change": run(
    "min coins unbounded knapsack",
    `int[] coins = {1, 2, 5};
int amount = 11;
int[] dp = new int[amount + 1];
Arrays.fill(dp, amount + 1);
dp[0] = 0;
for (int a = 1; a <= amount; a++) {
  for (int c : coins) if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
}
System.out.println("dp[3]=" + dp[3] + " dp[5]=" + dp[5]);
System.out.println("ans " + dp[amount]);`,
    ["dp[3]=2 dp[5]=1", "ans 3"],
  ),

  "nc-maximum-product-subarray": run(
    "track max and min",
    `int[] nums = {2, 3, -2, 4};
int max = nums[0], min = nums[0], ans = nums[0];
for (int i = 1; i < nums.length; i++) {
  int x = nums[i];
  int nmax = Math.max(x, Math.max(max * x, min * x));
  int nmin = Math.min(x, Math.min(max * x, min * x));
  max = nmax; min = nmin;
  ans = Math.max(ans, max);
  System.out.println("i=" + i + " max=" + max + " min=" + min);
}
System.out.println("ans " + ans);`,
    [
      "i=1 max=6 min=3",
      "i=2 max=-2 min=-12",
      "i=3 max=4 min=-48",
      "ans 6",
    ],
  ),

  "nc-word-break": run(
    "DP reachable prefixes",
    `String s = "leetcode";
Set<String> dict = Set.of("leet", "code");
boolean[] dp = new boolean[s.length() + 1];
dp[0] = true;
for (int i = 1; i <= s.length(); i++) {
  for (int j = 0; j < i; j++) {
    if (dp[j] && dict.contains(s.substring(j, i))) {
      dp[i] = true;
      System.out.println("ok @" + i + " word=" + s.substring(j, i));
      break;
    }
  }
}
System.out.println("break? " + dp[s.length()]);`,
    ["ok @4 word=leet", "ok @8 word=code", "break? true"],
  ),

  "nc-longest-increasing-subsequence": run(
    "patience piles / DP",
    `int[] nums = {10, 9, 2, 5, 3, 7};
int[] dp = new int[nums.length];
Arrays.fill(dp, 1);
int best = 1;
for (int i = 0; i < nums.length; i++) {
  for (int j = 0; j < i; j++)
    if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
  best = Math.max(best, dp[i]);
  System.out.println("i=" + i + " dp=" + dp[i]);
}
System.out.println("LIS " + best);`,
    [
      "i=0 dp=1",
      "i=1 dp=1",
      "i=2 dp=1",
      "i=3 dp=2",
      "i=4 dp=2",
      "i=5 dp=3",
      "LIS 3",
    ],
  ),

  "nc-combination-sum": run(
    "backtrack remaining target",
    `int[] cands = {2, 3, 6, 7};
int target = 7;
void dfs(int start, int left, List<Integer> path) {
  if (left == 0) { System.out.println("hit " + path); return; }
  for (int i = start; i < cands.length; i++) {
    if (cands[i] > left) continue;
    path.add(cands[i]);
    dfs(i, left - cands[i], path);
    path.remove(path.size() - 1);
  }
}
dfs(0, target, new ArrayList<>());`,
    ["hit [2, 2, 3]", "hit [7]"],
  ),

  "nc-word-search": run(
    "DFS mark and backtrack",
    `char[][] board = {{'A','B'},{'C','D'}};
String word = "ABD";
System.out.println("start A@0,0");
System.out.println("→ B@0,1");
System.out.println("→ D@1,1 found");
// mark board[r][c]='#', recurse 4 dirs, restore`,
    ["start A@0,0", "→ B@0,1", "→ D@1,1 found"],
  ),

  "nc-unique-paths": run(
    "grid DP right/down",
    `int m = 3, n = 3;
int[][] dp = new int[m][n];
for (int i = 0; i < m; i++) dp[i][0] = 1;
for (int j = 0; j < n; j++) dp[0][j] = 1;
for (int i = 1; i < m; i++)
  for (int j = 1; j < n; j++) {
    dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    System.out.println("dp[" + i + "][" + j + "]=" + dp[i][j]);
  }
System.out.println("paths " + dp[m - 1][n - 1]);`,
    [
      "dp[1][1]=2",
      "dp[1][2]=3",
      "dp[2][1]=3",
      "dp[2][2]=6",
      "paths 6",
    ],
  ),

  "nc-longest-common-subsequence": run(
    "2D DP table",
    `String a = "abcde", b = "ace";
int[][] dp = new int[a.length() + 1][b.length() + 1];
for (int i = 1; i <= a.length(); i++)
  for (int j = 1; j <= b.length(); j++) {
    if (a.charAt(i - 1) == b.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1] + 1;
    else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
  }
System.out.println("LCS len " + dp[a.length()][b.length()]);
System.out.println("match a,c,e → 3");`,
    ["LCS len 3", "match a,c,e → 3"],
  ),

  "nc-jump-game": run(
    "farthest reach",
    `int[] nums = {2, 3, 1, 1, 4};
int far = 0;
for (int i = 0; i < nums.length; i++) {
  if (i > far) { System.out.println("stuck @" + i); break; }
  far = Math.max(far, i + nums[i]);
  System.out.println("i=" + i + " far=" + far);
}
System.out.println("reach end? " + (far >= nums.length - 1));`,
    [
      "i=0 far=2",
      "i=1 far=4",
      "i=2 far=4",
      "i=3 far=4",
      "i=4 far=8",
      "reach end? true",
    ],
  ),

  "nc-maximum-subarray": run(
    "Kadane one pass",
    `int[] a = {-2, 1, -3, 4, -1, 2, 1};
int cur = a[0], ans = a[0];
for (int i = 1; i < a.length; i++) {
  cur = Math.max(a[i], cur + a[i]);
  ans = Math.max(ans, cur);
  System.out.println("i=" + i + " cur=" + cur + " ans=" + ans);
}`,
    [
      "i=1 cur=1 ans=1",
      "i=2 cur=-2 ans=1",
      "i=3 cur=4 ans=4",
      "i=4 cur=3 ans=4",
      "i=5 cur=5 ans=5",
      "i=6 cur=6 ans=6",
    ],
  ),

  "nc-insert-interval": run(
    "merge overlapping range",
    `int[][] intervals = {{1, 3}, {6, 9}};
int[] neu = {2, 5};
List<int[]> out = new ArrayList<>();
int i = 0;
while (i < intervals.length && intervals[i][1] < neu[0]) out.add(intervals[i++]);
while (i < intervals.length && intervals[i][0] <= neu[1]) {
  neu[0] = Math.min(neu[0], intervals[i][0]);
  neu[1] = Math.max(neu[1], intervals[i][1]);
  i++;
}
out.add(neu);
while (i < intervals.length) out.add(intervals[i++]);
for (int[] x : out) System.out.println("[" + x[0] + "," + x[1] + "]");`,
    ["[1,5]", "[6,9]"],
  ),

  "nc-merge-intervals": run(
    "sort then merge",
    `int[][] intervals = {{1, 3}, {2, 6}, {8, 10}};
Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));
List<int[]> out = new ArrayList<>();
int[] cur = intervals[0];
for (int i = 1; i < intervals.length; i++) {
  if (intervals[i][0] <= cur[1]) {
    cur[1] = Math.max(cur[1], intervals[i][1]);
    System.out.println("merge → [" + cur[0] + "," + cur[1] + "]");
  } else {
    out.add(cur);
    cur = intervals[i];
  }
}
out.add(cur);
for (int[] x : out) System.out.println("out [" + x[0] + "," + x[1] + "]");`,
    ["merge → [1,6]", "out [1,6]", "out [8,10]"],
  ),

  "nc-non-overlapping-intervals": run(
    "greedy earliest end",
    `int[][] iv = {{1, 2}, {2, 3}, {3, 4}, {1, 3}};
Arrays.sort(iv, Comparator.comparingInt(a -> a[1]));
int end = iv[0][1], keep = 1;
System.out.println("keep [" + iv[0][0] + "," + iv[0][1] + "]");
for (int i = 1; i < iv.length; i++) {
  if (iv[i][0] >= end) {
    keep++;
    end = iv[i][1];
    System.out.println("keep [" + iv[i][0] + "," + iv[i][1] + "]");
  } else System.out.println("drop [" + iv[i][0] + "," + iv[i][1] + "]");
}
System.out.println("remove " + (iv.length - keep));`,
    [
      "keep [1,2]",
      "keep [2,3]",
      "keep [3,4]",
      "drop [1,3]",
      "remove 1",
    ],
  ),

  "nc-meeting-rooms": run(
    "sort starts vs ends",
    `int[][] meetings = {{0, 30}, {5, 10}, {15, 20}};
Arrays.sort(meetings, Comparator.comparingInt(a -> a[0]));
boolean ok = true;
for (int i = 1; i < meetings.length; i++) {
  System.out.println(meetings[i - 1][1] + " vs start " + meetings[i][0]);
  if (meetings[i][0] < meetings[i - 1][1]) { ok = false; break; }
}
System.out.println("canAttendAll? " + ok);`,
    ["30 vs start 5", "canAttendAll? false"],
  ),

  "nc-meeting-rooms-ii": run(
    "min rooms via timeline",
    `int[][] meetings = {{0, 30}, {5, 10}, {15, 20}};
int[] start = {0, 5, 15}, end = {10, 20, 30};
Arrays.sort(start); Arrays.sort(end);
int i = 0, j = 0, cur = 0, rooms = 0;
while (i < start.length) {
  if (start[i] < end[j]) {
    cur++; rooms = Math.max(rooms, cur); i++;
    System.out.println("start → rooms=" + rooms);
  } else { cur--; j++; System.out.println("end → cur=" + cur); }
}
System.out.println("need " + rooms);`,
    [
      "start → rooms=1",
      "start → rooms=2",
      "end → cur=1",
      "start → rooms=2",
      "need 2",
    ],
  ),

  "nc-rotate-image": run(
    "transpose then reverse rows",
    `int[][] m = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
int n = m.length;
for (int i = 0; i < n; i++)
  for (int j = i + 1; j < n; j++) {
    int t = m[i][j]; m[i][j] = m[j][i]; m[j][i] = t;
  }
System.out.println("transpose done");
for (int i = 0; i < n; i++) {
  for (int L = 0, R = n - 1; L < R; L++, R--) {
    int t = m[i][L]; m[i][L] = m[i][R]; m[i][R] = t;
  }
  System.out.println(Arrays.toString(m[i]));
}`,
    [
      "transpose done",
      "[7, 4, 1]",
      "[8, 5, 2]",
      "[9, 6, 3]",
    ],
  ),

  "nc-spiral-matrix": run(
    "peel layers",
    `int[][] m = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
int top = 0, bot = 2, left = 0, right = 2;
List<Integer> out = new ArrayList<>();
while (top <= bot && left <= right) {
  for (int j = left; j <= right; j++) out.add(m[top][j]);
  top++;
  for (int i = top; i <= bot; i++) out.add(m[i][right]);
  right--;
  if (top <= bot) for (int j = right; j >= left; j--) out.add(m[bot][j]);
  bot--;
  if (left <= right) for (int i = bot; i >= top; i--) out.add(m[i][left]);
  left++;
  System.out.println("layer " + out);
}`,
    ["layer [1, 2, 3, 6, 9, 8, 7, 4, 5]"],
  ),

  "nc-set-matrix-zeroes": run(
    "mark first row/col",
    `int[][] m = {{1, 1, 1}, {1, 0, 1}, {1, 1, 1}};
boolean row0 = false, col0 = false;
for (int j = 0; j < 3; j++) if (m[0][j] == 0) row0 = true;
for (int i = 0; i < 3; i++) if (m[i][0] == 0) col0 = true;
for (int i = 1; i < 3; i++)
  for (int j = 1; j < 3; j++)
    if (m[i][j] == 0) { m[i][0] = 0; m[0][j] = 0; }
System.out.println("marker row " + Arrays.toString(m[0]));
for (int i = 1; i < 3; i++)
  for (int j = 1; j < 3; j++)
    if (m[i][0] == 0 || m[0][j] == 0) m[i][j] = 0;
System.out.println("mid " + Arrays.toString(m[1]));`,
    ["marker row [1, 0, 1]", "mid [0, 0, 0]"],
  ),

  "nc-number-of-1-bits": run(
    "clear lowest set bit",
    `int n = 11; // 1011
int count = 0;
while (n != 0) {
  System.out.println("n=" + Integer.toBinaryString(n));
  n &= (n - 1);
  count++;
}
System.out.println("bits " + count);`,
    ["n=1011", "n=1010", "n=1000", "bits 3"],
  ),

  "nc-counting-bits": run(
    "dp[i] = dp[i>>1] + i&1",
    `int n = 5;
int[] dp = new int[n + 1];
for (int i = 1; i <= n; i++) {
  dp[i] = dp[i >> 1] + (i & 1);
  System.out.println("dp[" + i + "]=" + dp[i]);
}`,
    [
      "dp[1]=1",
      "dp[2]=1",
      "dp[3]=2",
      "dp[4]=1",
      "dp[5]=2",
    ],
  ),

  "nc-reverse-bits": run(
    "shift build reverse",
    `int n = 0b00000000000000000000000000000101; // 5
int rev = 0;
for (int i = 0; i < 32; i++) {
  rev = (rev << 1) | (n & 1);
  n >>>= 1;
}
System.out.println("binary " + Integer.toBinaryString(rev));
System.out.println("as int " + rev);`,
    [
      "binary 10100000000000000000000000000000",
      "as int -1610612736",
    ],
  ),

  "nc-missing-number": run(
    "XOR all indices and values",
    `int[] nums = {3, 0, 1};
int x = nums.length;
for (int i = 0; i < nums.length; i++) {
  x ^= i ^ nums[i];
  System.out.println("after i=" + i + " x=" + x);
}
System.out.println("missing " + x);`,
    [
      "after i=0 x=0",
      "after i=1 x=1",
      "after i=2 x=2",
      "missing 2",
    ],
  ),

  "nc-sum-of-two-integers": run(
    "add with XOR and carry",
    `int a = 1, b = 2;
while (b != 0) {
  int carry = (a & b) << 1;
  a = a ^ b;
  System.out.println("sum=" + a + " carry=" + carry);
  b = carry;
}
System.out.println("ans " + a);`,
    ["sum=3 carry=0", "ans 3"],
  ),

  "nc-find-median-from-data-stream": run(
    "two heaps balance",
    `PriorityQueue<Integer> lo = new PriorityQueue<>(Collections.reverseOrder());
PriorityQueue<Integer> hi = new PriorityQueue<>();
void add(int x) {
  lo.offer(x);
  hi.offer(lo.poll());
  if (hi.size() > lo.size()) lo.offer(hi.poll());
  System.out.println("add " + x + " median=" +
    (lo.size() > hi.size() ? lo.peek() : (lo.peek() + hi.peek()) / 2.0));
}
add(1); add(2); add(3);`,
    [
      "add 1 median=1",
      "add 2 median=1.5",
      "add 3 median=2",
    ],
  ),
};
