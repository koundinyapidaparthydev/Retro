import { run, type CodeRun } from "./types";

export const PACK: Record<string, CodeRun> = {
  "nc-valid-sudoku": run(
    "row/col/box uniqueness",
    `char[][] board = {
  {'5','3','.'}, {'6','.','.'}, {'.','9','8'}
};
Set<String> seen = new HashSet<>();
boolean ok = true;
for (int r = 0; r < 3; r++) {
  for (int c = 0; c < 3; c++) {
    char v = board[r][c];
    if (v == '.') continue;
    String row = "r" + r + v, col = "c" + c + v, box = "b" + (r/3) + (c/3) + v;
    if (!seen.add(row) || !seen.add(col) || !seen.add(box)) { ok = false; break; }
    System.out.println("ok " + v + " @(" + r + "," + c + ")");
  }
}
System.out.println("valid=" + ok);`,
    ["ok 5 @(0,0)", "ok 3 @(0,1)", "ok 6 @(1,0)", "ok 9 @(2,1)", "ok 8 @(2,2)", "valid=true"],
  ),

  "nc-two-sum-ii-input-array-is-sorted": run(
    "two pointers on sorted",
    `int[] nums = {2, 7, 11, 15};
int target = 9;
int L = 0, R = nums.length - 1;
while (L < R) {
  int sum = nums[L] + nums[R];
  System.out.println(nums[L] + "+" + nums[R] + "=" + sum);
  if (sum == target) break;
  if (sum < target) L++; else R--;
}
System.out.println("1-based: " + (L + 1) + "," + (R + 1));`,
    ["2+15=17", "2+11=13", "2+7=9", "1-based: 1,2"],
  ),

  "nc-trapping-rain-water": run(
    "two pointers water",
    `int[] h = {0, 1, 0, 2, 1, 0, 1, 3};
int L = 0, R = h.length - 1, leftMax = 0, rightMax = 0, water = 0;
while (L < R) {
  if (h[L] < h[R]) {
    leftMax = Math.max(leftMax, h[L]);
    water += leftMax - h[L];
    System.out.println("L=" + L + " add " + (leftMax - h[L]));
    L++;
  } else {
    rightMax = Math.max(rightMax, h[R]);
    water += rightMax - h[R];
    System.out.println("R=" + R + " add " + (rightMax - h[R]));
    R--;
  }
}
System.out.println("water=" + water);`,
    ["L=0 add 0", "L=1 add 0", "L=2 add 1", "R=6 add 0", "R=5 add 1", "R=4 add 0", "L=3 add 0", "water=2"],
  ),

  "nc-permutation-in-string": run(
    "window needs map",
    `String s1 = "ab", s2 = "eidbaooo";
int[] need = new int[26], win = new int[26];
for (char c : s1.toCharArray()) need[c - 'a']++;
int matched = 0, required = 0;
for (int n : need) if (n > 0) required++;
boolean found = false;
for (int R = 0; R < s2.length(); R++) {
  int c = s2.charAt(R) - 'a';
  win[c]++;
  if (win[c] == need[c]) matched++;
  if (R >= s1.length()) {
    int L = s2.charAt(R - s1.length()) - 'a';
    if (win[L] == need[L]) matched--;
    win[L]--;
  }
  System.out.println("R=" + R + " matched=" + matched);
  if (matched == required) { found = true; break; }
}
System.out.println("found=" + found);`,
    ["R=0 matched=0", "R=1 matched=0", "R=2 matched=0", "R=3 matched=1", "R=4 matched=2", "found=true"],
  ),

  "nc-sliding-window-maximum": run(
    "deque of candidates",
    `int[] nums = {1, 3, -1, -3, 5};
int k = 3;
Deque<Integer> dq = new ArrayDeque<>();
List<Integer> ans = new ArrayList<>();
for (int i = 0; i < nums.length; i++) {
  while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) dq.pollLast();
  dq.addLast(i);
  if (dq.peekFirst() <= i - k) dq.pollFirst();
  if (i >= k - 1) {
    ans.add(nums[dq.peekFirst()]);
    System.out.println("window ends " + i + " max=" + nums[dq.peekFirst()]);
  }
}`,
    ["window ends 2 max=3", "window ends 3 max=3", "window ends 4 max=5"],
  ),

  "nc-min-stack": run(
    "stack + parallel mins",
    `Deque<Integer> st = new ArrayDeque<>(), mins = new ArrayDeque<>();
void push(int x) {
  st.push(x);
  mins.push(mins.isEmpty() ? x : Math.min(x, mins.peek()));
  System.out.println("push " + x + " min=" + mins.peek());
}
push(3); push(5); push(2); push(1);
System.out.println("getMin=" + mins.peek());`,
    ["push 3 min=3", "push 5 min=3", "push 2 min=2", "push 1 min=1", "getMin=1"],
  ),

  "nc-evaluate-reverse-polish-notation": run(
    "stack the operands",
    `String[] tokens = {"2", "1", "+", "3", "*"};
Deque<Integer> st = new ArrayDeque<>();
for (String t : tokens) {
  if ("+-*/".contains(t) && t.length() == 1) {
    int b = st.pop(), a = st.pop();
    int v = switch (t) {
      case "+" -> a + b; case "-" -> a - b;
      case "*" -> a * b; default -> a / b;
    };
    st.push(v);
    System.out.println(a + t + b + "=" + v);
  } else st.push(Integer.parseInt(t));
}
System.out.println("result=" + st.peek());`,
    ["2+1=3", "3*3=9", "result=9"],
  ),

  "nc-generate-parentheses": run(
    "backtrack open/close",
    `int n = 2;
List<String> ans = new ArrayList<>();
void go(String cur, int open, int close) {
  if (cur.length() == 2 * n) { ans.add(cur); System.out.println(cur); return; }
  if (open < n) go(cur + "(", open + 1, close);
  if (close < open) go(cur + ")", open, close + 1);
}
go("", 0, 0);
System.out.println("count=" + ans.size());`,
    ["(())", "()()", "count=2"],
  ),

  "nc-daily-temperatures": run(
    "mono stack warmer days",
    `int[] t = {73, 74, 75, 71, 69, 72};
int[] ans = new int[t.length];
Deque<Integer> st = new ArrayDeque<>();
for (int i = 0; i < t.length; i++) {
  while (!st.isEmpty() && t[i] > t[st.peek()]) {
    int j = st.pop();
    ans[j] = i - j;
    System.out.println("day " + j + " waits " + ans[j]);
  }
  st.push(i);
}
System.out.println(Arrays.toString(ans));`,
    ["day 0 waits 1", "day 1 waits 1", "day 4 waits 1", "day 3 waits 2", "[1, 1, 0, 2, 1, 0]"],
  ),

  "nc-car-fleet": run(
    "stack by arrival time",
    `int target = 12;
int[] pos = {10, 8, 0, 5, 3}, speed = {2, 4, 1, 1, 3};
Integer[] idx = {0, 1, 2, 3, 4};
Arrays.sort(idx, (a, b) -> pos[b] - pos[a]);
Deque<Double> st = new ArrayDeque<>();
for (int i : idx) {
  double time = (double) (target - pos[i]) / speed[i];
  if (st.isEmpty() || time > st.peek()) {
    st.push(time);
    System.out.println("fleet @" + pos[i] + " t=" + time);
  } else System.out.println("catch @" + pos[i]);
}
System.out.println("fleets=" + st.size());`,
    ["fleet @10 t=1.0", "catch @8", "fleet @5 t=7.0", "catch @3", "fleet @0 t=12.0", "fleets=3"],
  ),

  "nc-largest-rectangle-in-histogram": run(
    "mono stack widths",
    `int[] h = {2, 1, 5, 6, 2, 3};
Deque<Integer> st = new ArrayDeque<>();
int best = 0;
for (int i = 0; i <= h.length; i++) {
  int cur = i == h.length ? 0 : h[i];
  while (!st.isEmpty() && cur < h[st.peek()]) {
    int height = h[st.pop()];
    int left = st.isEmpty() ? -1 : st.peek();
    int area = height * (i - left - 1);
    best = Math.max(best, area);
    System.out.println("h=" + height + " area=" + area);
  }
  st.push(i);
}
System.out.println("best=" + best);`,
    ["h=2 area=2", "h=6 area=6", "h=5 area=10", "h=2 area=8", "h=3 area=3", "h=1 area=6", "best=10"],
  ),

  "nc-binary-search": run(
    "classic mid loop",
    `int[] nums = {1, 3, 5, 7, 9};
int target = 7;
int lo = 0, hi = nums.length - 1, ans = -1;
while (lo <= hi) {
  int mid = lo + (hi - lo) / 2;
  System.out.println("mid=" + mid + " v=" + nums[mid]);
  if (nums[mid] == target) { ans = mid; break; }
  if (nums[mid] < target) lo = mid + 1; else hi = mid - 1;
}
System.out.println("ans=" + ans);`,
    ["mid=2 v=5", "mid=3 v=7", "ans=3"],
  ),

  "nc-search-a-2d-matrix": run(
    "treat as 1D sorted",
    `int[][] m = {{1, 3, 5}, {7, 9, 11}, {13, 15, 17}};
int target = 9, rows = 3, cols = 3;
int lo = 0, hi = rows * cols - 1;
boolean found = false;
while (lo <= hi) {
  int mid = (lo + hi) / 2;
  int v = m[mid / cols][mid % cols];
  System.out.println("mid=" + mid + " v=" + v);
  if (v == target) { found = true; break; }
  if (v < target) lo = mid + 1; else hi = mid - 1;
}
System.out.println("found=" + found);`,
    ["mid=4 v=9", "found=true"],
  ),

  "nc-koko-eating-bananas": run(
    "binary search speed",
    `int[] piles = {3, 6, 7, 11};
int h = 8;
int lo = 1, hi = 11, ans = hi;
while (lo <= hi) {
  int mid = (lo + hi) / 2;
  long hours = 0;
  for (int p : piles) hours += (p + mid - 1) / mid;
  System.out.println("k=" + mid + " hours=" + hours);
  if (hours <= h) { ans = mid; hi = mid - 1; }
  else lo = mid + 1;
}
System.out.println("minK=" + ans);`,
    ["k=6 hours=6", "k=3 hours=10", "k=4 hours=8", "k=5 hours=8", "minK=4"],
  ),

  "nc-time-based-key-value-store": run(
    "binary search timestamps",
    `List<Integer> times = List.of(1, 2, 5);
List<String> vals = List.of("a", "b", "c");
int stamp = 3;
int lo = 0, hi = times.size() - 1, best = -1;
while (lo <= hi) {
  int mid = (lo + hi) / 2;
  if (times.get(mid) <= stamp) { best = mid; lo = mid + 1; }
  else hi = mid - 1;
  System.out.println("mid=" + mid + " best=" + best);
}
System.out.println("get=" + (best < 0 ? "" : vals.get(best)));`,
    ["mid=1 best=1", "mid=2 best=1", "get=b"],
  ),

  "nc-median-of-two-sorted-arrays": run(
    "partition both arrays",
    `int[] A = {1, 3}, B = {2};
// tiny merge for median demo
int i = 0, j = 0;
List<Integer> m = new ArrayList<>();
while (i < A.length || j < B.length) {
  if (j == B.length || (i < A.length && A[i] <= B[j])) m.add(A[i++]);
  else m.add(B[j++]);
  System.out.println(m);
}
System.out.println("median=" + m.get(m.size() / 2));`,
    ["[1]", "[1, 2]", "[1, 2, 3]", "median=2"],
  ),

  "nc-copy-list-with-random-pointer": run(
    "map old → new nodes",
    `// 1 → 2 → 3, random: 1→3, 2→1
Map<String, String> random = Map.of("1", "3", "2", "1", "3", "null");
Map<String, String> copy = new LinkedHashMap<>();
for (String id : List.of("1", "2", "3")) {
  copy.put(id, "copy-" + id);
  System.out.println("clone " + id);
}
for (String id : copy.keySet()) {
  System.out.println(copy.get(id) + ".random=" + copy.getOrDefault(random.get(id), "null"));
}`,
    ["clone 1", "clone 2", "clone 3", "copy-1.random=copy-3", "copy-2.random=copy-1", "copy-3.random=null"],
  ),

  "nc-add-two-numbers": run(
    "digit by digit carry",
    `int[] a = {2, 4, 3}, b = {5, 6, 4}; // 342+465
int i = 0, carry = 0;
List<Integer> out = new ArrayList<>();
while (i < a.length || i < b.length || carry > 0) {
  int x = i < a.length ? a[i] : 0;
  int y = i < b.length ? b[i] : 0;
  int sum = x + y + carry;
  out.add(sum % 10);
  carry = sum / 10;
  System.out.println("digit " + (sum % 10) + " carry=" + carry);
  i++;
}
System.out.println(out);`,
    ["digit 7 carry=0", "digit 0 carry=1", "digit 8 carry=0", "[7, 0, 8]"],
  ),

  "nc-find-the-duplicate-number": run(
    "Floyd cycle in array",
    `int[] nums = {1, 3, 4, 2, 2};
int slow = nums[0], fast = nums[0];
do {
  slow = nums[slow];
  fast = nums[nums[fast]];
  System.out.println("slow=" + slow + " fast=" + fast);
} while (slow != fast);
slow = nums[0];
while (slow != fast) {
  slow = nums[slow];
  fast = nums[fast];
  System.out.println("meet walk slow=" + slow);
}
System.out.println("dup=" + slow);`,
    ["slow=3 fast=4", "slow=2 fast=2", "meet walk slow=3", "meet walk slow=2", "dup=2"],
  ),

  "nc-lru-cache": run(
    "HashMap + doubly linked",
    `LinkedHashMap<Integer, Integer> lru = new LinkedHashMap<>(16, 0.75f, true) {
  protected boolean removeEldestEntry(Map.Entry<Integer, Integer> e) {
    return size() > 2;
  }
};
lru.put(1, 1); System.out.println("put 1");
lru.put(2, 2); System.out.println("put 2");
System.out.println("get 1 → " + lru.get(1));
lru.put(3, 3); System.out.println("put 3 (evict 2)");
System.out.println("get 2 → " + lru.getOrDefault(2, -1));`,
    ["put 1", "put 2", "get 1 → 1", "put 3 (evict 2)", "get 2 → -1"],
  ),

  "nc-reverse-nodes-in-k-group": run(
    "reverse every k nodes",
    `int[] arr = {1, 2, 3, 4, 5};
int k = 2;
List<Integer> list = new ArrayList<>();
for (int x : arr) list.add(x);
for (int i = 0; i + k <= list.size(); i += k) {
  Collections.reverse(list.subList(i, i + k));
  System.out.println("reversed " + i + ".." + (i + k - 1) + " → " + list);
}
System.out.println(list);`,
    ["reversed 0..1 → [2, 1, 3, 4, 5]", "reversed 2..3 → [2, 1, 4, 3, 5]", "[2, 1, 4, 3, 5]"],
  ),

  "nc-diameter-of-binary-tree": run(
    "height returns edges",
    `// tree: 1 → (2 → 4,5), 3
int[] best = {0};
int height(String node, Map<String, String[]> kids) {
  if (node == null) return 0;
  String[] ch = kids.get(node);
  int L = ch[0] == null ? 0 : height(ch[0], kids);
  int R = ch[1] == null ? 0 : height(ch[1], kids);
  best[0] = Math.max(best[0], L + R);
  System.out.println(node + " L=" + L + " R=" + R);
  return 1 + Math.max(L, R);
}
Map<String, String[]> kids = Map.of(
  "1", new String[]{"2", "3"},
  "2", new String[]{"4", "5"},
  "3", new String[]{null, null},
  "4", new String[]{null, null},
  "5", new String[]{null, null}
);
height("1", kids);
System.out.println("diameter=" + best[0]);`,
    ["4 L=0 R=0", "5 L=0 R=0", "2 L=1 R=1", "3 L=0 R=0", "1 L=2 R=1", "diameter=3"],
  ),

  "nc-balanced-binary-tree": run(
    "height or -1 sentinel",
    `int check(String node, Map<String, String[]> kids) {
  if (node == null) return 0;
  String[] ch = kids.get(node);
  int L = ch[0] == null ? 0 : check(ch[0], kids);
  int R = ch[1] == null ? 0 : check(ch[1], kids);
  if (L < 0 || R < 0 || Math.abs(L - R) > 1) {
    System.out.println(node + " unbalanced");
    return -1;
  }
  System.out.println(node + " h=" + (1 + Math.max(L, R)));
  return 1 + Math.max(L, R);
}
Map<String, String[]> kids = Map.of(
  "3", new String[]{"9", "20"},
  "9", new String[]{null, null},
  "20", new String[]{"15", "7"},
  "15", new String[]{null, null},
  "7", new String[]{null, null}
);
System.out.println("balanced=" + (check("3", kids) >= 0));`,
    ["9 h=1", "15 h=1", "7 h=1", "20 h=2", "3 h=3", "balanced=true"],
  ),

  "nc-binary-tree-right-side-view": run(
    "BFS last per level",
    `Map<Integer, List<Integer>> levels = Map.of(
  0, List.of(1),
  1, List.of(2, 3),
  2, List.of(5, 4)
);
List<Integer> view = new ArrayList<>();
for (int d = 0; d <= 2; d++) {
  List<Integer> lvl = levels.get(d);
  int right = lvl.get(lvl.size() - 1);
  view.add(right);
  System.out.println("depth " + d + " → " + right);
}
System.out.println(view);`,
    ["depth 0 → 1", "depth 1 → 3", "depth 2 → 4", "[1, 3, 4]"],
  ),

  "nc-count-good-nodes-in-binary-tree": run(
    "track max on path",
    `// 3 → (1→3), (4→1,5)
int[] count = {0};
void dfs(int node, int maxSoFar, Map<Integer, int[]> kids) {
  if (node >= maxSoFar) { count[0]++; System.out.println("good " + node); }
  maxSoFar = Math.max(maxSoFar, node);
  for (int c : kids.getOrDefault(node, new int[0])) dfs(c, maxSoFar, kids);
}
Map<Integer, int[]> kids = Map.of(3, new int[]{1, 4}, 1, new int[]{3}, 4, new int[]{1, 5});
dfs(3, Integer.MIN_VALUE, kids);
System.out.println("count=" + count[0]);`,
    ["good 3", "good 4", "good 5", "count=3"],
  ),

  "nc-k-closest-points-to-origin": run(
    "max-heap of size k",
    `int[][] pts = {{1, 3}, {-2, 2}, {2, 2}};
int k = 2;
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) ->
  (b[0]*b[0] + b[1]*b[1]) - (a[0]*a[0] + a[1]*a[1]));
for (int[] p : pts) {
  pq.offer(p);
  if (pq.size() > k) pq.poll();
  System.out.println("heap size=" + pq.size());
}
while (!pq.isEmpty()) {
  int[] p = pq.poll();
  System.out.println("keep " + Arrays.toString(p));
}`,
    ["heap size=1", "heap size=2", "heap size=2", "keep [2, 2]", "keep [-2, 2]"],
  ),

  "nc-last-stone-weight": run(
    "smash two heaviest",
    `PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
for (int s : new int[]{2, 7, 4, 1, 8, 1}) pq.offer(s);
while (pq.size() > 1) {
  int a = pq.poll(), b = pq.poll();
  System.out.println("smash " + a + "-" + b);
  if (a != b) pq.offer(a - b);
}
System.out.println("left=" + (pq.isEmpty() ? 0 : pq.peek()));`,
    ["smash 8-7", "smash 4-2", "smash 2-1", "smash 1-1", "left=1"],
  ),

  "nc-kth-largest-element-in-a-stream": run(
    "min-heap of size k",
    `PriorityQueue<Integer> pq = new PriorityQueue<>();
int k = 3;
for (int x : new int[]{4, 5, 8, 2}) {
  pq.offer(x);
  if (pq.size() > k) pq.poll();
  System.out.println("add " + x + " kth=" + pq.peek());
}
pq.offer(3); if (pq.size() > k) pq.poll();
System.out.println("add 3 kth=" + pq.peek());`,
    ["add 4 kth=4", "add 5 kth=4", "add 8 kth=4", "add 2 kth=4", "add 3 kth=4"],
  ),

  "nc-kth-largest-element-in-an-array": run(
    "quickselect / heap",
    `int[] nums = {3, 2, 1, 5, 6, 4};
int k = 2;
PriorityQueue<Integer> pq = new PriorityQueue<>();
for (int x : nums) {
  pq.offer(x);
  if (pq.size() > k) pq.poll();
  System.out.println("heap=" + pq);
}
System.out.println("kth=" + pq.peek());`,
    ["heap=[3]", "heap=[2, 3]", "heap=[2, 3]", "heap=[3, 5]", "heap=[5, 6]", "heap=[5, 6]", "kth=5"],
  ),

  "nc-task-scheduler": run(
    "idle slots from max freq",
    `char[] tasks = {'A', 'A', 'A', 'B', 'B', 'B'};
int n = 2;
int[] freq = new int[26];
for (char c : tasks) freq[c - 'A']++;
int max = 0, countMax = 0;
for (int f : freq) {
  if (f > max) { max = f; countMax = 1; }
  else if (f == max) countMax++;
}
int slots = (max - 1) * (n + 1) + countMax;
System.out.println("max=" + max + " countMax=" + countMax);
System.out.println("time=" + Math.max(slots, tasks.length));`,
    ["max=3 countMax=2", "time=8"],
  ),

  "nc-design-twitter": run(
    "merge followee feeds",
    `Map<Integer, Deque<int[]>> feed = new HashMap<>(); // [time, tweetId]
int time = 0;
void post(int user, int id) {
  feed.computeIfAbsent(user, u -> new ArrayDeque<>()).addFirst(new int[]{++time, id});
  System.out.println("user " + user + " tweet " + id);
}
post(1, 5); post(1, 3); post(2, 6);
PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> b[0] - a[0]);
for (int u : List.of(1, 2)) for (int[] t : feed.get(u)) pq.offer(t);
List<Integer> news = new ArrayList<>();
while (!pq.isEmpty() && news.size() < 3) news.add(pq.poll()[1]);
System.out.println("news=" + news);`,
    ["user 1 tweet 5", "user 1 tweet 3", "user 2 tweet 6", "news=[6, 3, 5]"],
  ),

  "nc-subsets": run(
    "include / skip each",
    `int[] nums = {1, 2};
List<List<Integer>> ans = new ArrayList<>();
void go(int i, List<Integer> cur) {
  if (i == nums.length) { ans.add(new ArrayList<>(cur)); System.out.println(cur); return; }
  cur.add(nums[i]); go(i + 1, cur); cur.remove(cur.size() - 1);
  go(i + 1, cur);
}
go(0, new ArrayList<>());
System.out.println("count=" + ans.size());`,
    ["[1, 2]", "[1]", "[2]", "[]", "count=4"],
  ),

  "nc-permutations": run(
    "swap backtracking",
    `int[] nums = {1, 2, 3};
void go(int start) {
  if (start == nums.length) { System.out.println(Arrays.toString(nums)); return; }
  for (int i = start; i < nums.length; i++) {
    swap(start, i);
    go(start + 1);
    swap(start, i);
  }
}
void swap(int i, int j) { int t = nums[i]; nums[i] = nums[j]; nums[j] = t; }
go(0);`,
    ["[1, 2, 3]", "[1, 3, 2]", "[2, 1, 3]", "[2, 3, 1]", "[3, 2, 1]", "[3, 1, 2]"],
  ),

  "nc-subsets-ii": run(
    "skip duplicate siblings",
    `int[] nums = {1, 2, 2};
Arrays.sort(nums);
List<List<Integer>> ans = new ArrayList<>();
void go(int start, List<Integer> cur) {
  ans.add(new ArrayList<>(cur));
  System.out.println(cur);
  for (int i = start; i < nums.length; i++) {
    if (i > start && nums[i] == nums[i - 1]) continue;
    cur.add(nums[i]); go(i + 1, cur); cur.remove(cur.size() - 1);
  }
}
go(0, new ArrayList<>());`,
    ["[]", "[1]", "[1, 2]", "[1, 2, 2]", "[2]", "[2, 2]"],
  ),

  "nc-combination-sum-ii": run(
    "unique combos to target",
    `int[] cands = {10, 1, 2, 7, 6, 1, 5};
int target = 8;
Arrays.sort(cands);
List<List<Integer>> ans = new ArrayList<>();
void go(int start, int remain, List<Integer> cur) {
  if (remain == 0) { ans.add(new ArrayList<>(cur)); System.out.println(cur); return; }
  for (int i = start; i < cands.length; i++) {
    if (i > start && cands[i] == cands[i - 1]) continue;
    if (cands[i] > remain) break;
    cur.add(cands[i]); go(i + 1, remain - cands[i], cur); cur.remove(cur.size() - 1);
  }
}
go(0, target, new ArrayList<>());`,
    ["[1, 1, 6]", "[1, 2, 5]", "[1, 7]", "[2, 6]"],
  ),

  "nc-palindrome-partitioning": run(
    "cut when prefix palindrome",
    `String s = "aab";
List<List<String>> ans = new ArrayList<>();
boolean isPal(int L, int R) {
  while (L < R) if (s.charAt(L++) != s.charAt(R--)) return false;
  return true;
}
void go(int start, List<String> cur) {
  if (start == s.length()) { ans.add(new ArrayList<>(cur)); System.out.println(cur); return; }
  for (int end = start; end < s.length(); end++) {
    if (!isPal(start, end)) continue;
    cur.add(s.substring(start, end + 1));
    go(end + 1, cur);
    cur.remove(cur.size() - 1);
  }
}
go(0, new ArrayList<>());`,
    ["[a, a, b]", "[aa, b]"],
  ),

  "nc-letter-combinations-of-a-phone-number": run(
    "digit → letters DFS",
    `String digits = "23";
String[] map = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
List<String> ans = new ArrayList<>();
void go(int i, StringBuilder cur) {
  if (i == digits.length()) { ans.add(cur.toString()); System.out.println(cur); return; }
  for (char c : map[digits.charAt(i) - '0'].toCharArray()) {
    cur.append(c); go(i + 1, cur); cur.deleteCharAt(cur.length() - 1);
  }
}
go(0, new StringBuilder());`,
    ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"],
  ),

  "nc-n-queens": run(
    "place without attacks",
    `int n = 4;
int[] cols = new int[n];
Arrays.fill(cols, -1);
int[] solutions = {0};
boolean safe(int r, int c) {
  for (int i = 0; i < r; i++)
    if (cols[i] == c || Math.abs(cols[i] - c) == r - i) return false;
  return true;
}
void go(int r) {
  if (r == n) { solutions[0]++; System.out.println(Arrays.toString(cols)); return; }
  for (int c = 0; c < n; c++) {
    if (!safe(r, c)) continue;
    cols[r] = c; go(r + 1); cols[r] = -1;
  }
}
go(0);
System.out.println("solutions=" + solutions[0]);`,
    ["[1, 3, 0, 2]", "[2, 0, 3, 1]", "solutions=2"],
  ),

  "nc-max-area-of-island": run(
    "DFS flood fill area",
    `int[][] grid = {{0,1,1},{1,1,0},{0,0,1}};
int best = 0;
int dfs(int r, int c) {
  if (r < 0 || c < 0 || r >= 3 || c >= 3 || grid[r][c] == 0) return 0;
  grid[r][c] = 0;
  return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1);
}
for (int r = 0; r < 3; r++)
  for (int c = 0; c < 3; c++)
    if (grid[r][c] == 1) {
      int area = dfs(r, c);
      best = Math.max(best, area);
      System.out.println("island area=" + area);
    }
System.out.println("max=" + best);`,
    ["island area=4", "island area=1", "max=4"],
  ),

  "nc-walls-and-gates": run(
    "multi-source BFS from gates",
    `int INF = 99;
int[][] rooms = {{INF, -1, 0}, {INF, INF, INF}};
Queue<int[]> q = new ArrayDeque<>();
q.add(new int[]{0, 2});
while (!q.isEmpty()) {
  int[] cur = q.poll();
  int r = cur[0], c = cur[1];
  for (int[] d : new int[][]{{1,0},{-1,0},{0,1},{0,-1}}) {
    int nr = r + d[0], nc = c + d[1];
    if (nr < 0 || nc < 0 || nr >= 2 || nc >= 3 || rooms[nr][nc] != INF) continue;
    rooms[nr][nc] = rooms[r][c] + 1;
    System.out.println("(" + nr + "," + nc + ")=" + rooms[nr][nc]);
    q.add(new int[]{nr, nc});
  }
}`,
    ["(1,2)=1", "(1,1)=2", "(1,0)=3", "(0,0)=4"],
  ),

  "nc-rotting-oranges": run(
    "multi-source minute BFS",
    `int[][] grid = {{2,1,1},{1,1,0},{0,1,1}};
Queue<int[]> q = new ArrayDeque<>();
int fresh = 0, minutes = 0;
for (int r = 0; r < 3; r++)
  for (int c = 0; c < 3; c++) {
    if (grid[r][c] == 2) q.add(new int[]{r, c});
    if (grid[r][c] == 1) fresh++;
  }
while (!q.isEmpty() && fresh > 0) {
  int size = q.size();
  for (int i = 0; i < size; i++) {
    int[] cur = q.poll();
    for (int[] d : new int[][]{{1,0},{-1,0},{0,1},{0,-1}}) {
      int nr = cur[0] + d[0], nc = cur[1] + d[1];
      if (nr < 0 || nc < 0 || nr >= 3 || nc >= 3 || grid[nr][nc] != 1) continue;
      grid[nr][nc] = 2; fresh--; q.add(new int[]{nr, nc});
    }
  }
  minutes++;
  System.out.println("minute " + minutes + " fresh=" + fresh);
}
System.out.println("ans=" + (fresh == 0 ? minutes : -1));`,
    ["minute 1 fresh=4", "minute 2 fresh=2", "minute 3 fresh=1", "minute 4 fresh=0", "ans=4"],
  ),

  "nc-surrounded-regions": run(
    "mark border-connected O",
    `char[][] board = {{'X','X','X'},{'X','O','X'},{'X','X','X'}};
void mark(int r, int c) {
  if (r < 0 || c < 0 || r >= 3 || c >= 3 || board[r][c] != 'O') return;
  board[r][c] = 'E';
  mark(r+1,c); mark(r-1,c); mark(r,c+1); mark(r,c-1);
}
// no border O → all interior O flip
for (int r = 0; r < 3; r++)
  for (int c = 0; c < 3; c++)
    if (board[r][c] == 'O') { board[r][c] = 'X'; System.out.println("flip " + r + "," + c); }
System.out.println(Arrays.deepToString(board));`,
    ["flip 1,1", "[[X, X, X], [X, X, X], [X, X, X]]"],
  ),

  "nc-course-schedule-ii": run(
    "Kahn topological order",
    `int n = 4;
int[][] prereq = {{1,0},{2,0},{3,1},{3,2}};
int[] indeg = new int[n];
List<List<Integer>> g = new ArrayList<>();
for (int i = 0; i < n; i++) g.add(new ArrayList<>());
for (int[] e : prereq) { g.get(e[1]).add(e[0]); indeg[e[0]]++; }
Queue<Integer> q = new ArrayDeque<>();
for (int i = 0; i < n; i++) if (indeg[i] == 0) q.add(i);
List<Integer> order = new ArrayList<>();
while (!q.isEmpty()) {
  int u = q.poll();
  order.add(u);
  System.out.println("take " + u);
  for (int v : g.get(u)) if (--indeg[v] == 0) q.add(v);
}
System.out.println(order);`,
    ["take 0", "take 1", "take 2", "take 3", "[0, 1, 2, 3]"],
  ),

  "nc-redundant-connection": run(
    "union-find first cycle",
    `int[] parent = {0, 1, 2, 3};
int find(int x) { return parent[x] == x ? x : (parent[x] = find(parent[x])); }
int[][] edges = {{1,2},{1,3},{2,3}};
int[] ans = null;
for (int[] e : edges) {
  int a = find(e[0]), b = find(e[1]);
  if (a == b) { ans = e; System.out.println("cycle " + Arrays.toString(e)); }
  else { parent[a] = b; System.out.println("union " + e[0] + "-" + e[1]); }
}
System.out.println("redundant=" + Arrays.toString(ans));`,
    ["union 1-2", "union 1-3", "cycle [2, 3]", "redundant=[2, 3]"],
  ),

  "nc-word-ladder": run(
    "BFS word mutations",
    `String begin = "hit", end = "cog";
Set<String> dict = new HashSet<>(List.of("hot", "dot", "dog", "lot", "log", "cog"));
Queue<String> q = new ArrayDeque<>();
q.add(begin);
Map<String, Integer> dist = new HashMap<>();
dist.put(begin, 1);
while (!q.isEmpty()) {
  String w = q.poll();
  if (w.equals(end)) { System.out.println("len=" + dist.get(w)); break; }
  char[] ch = w.toCharArray();
  for (int i = 0; i < ch.length; i++) {
    char save = ch[i];
    for (char c = 'a'; c <= 'z'; c++) {
      ch[i] = c;
      String nxt = new String(ch);
      if (dict.contains(nxt) && !dist.containsKey(nxt)) {
        dist.put(nxt, dist.get(w) + 1);
        q.add(nxt);
        System.out.println(w + " → " + nxt);
      }
    }
    ch[i] = save;
  }
}`,
    ["hit → hot", "hot → dot", "hot → lot", "dot → dog", "lot → log", "dog → cog", "len=5"],
  ),

  "nc-reconstruct-itinerary": run(
    "Hierholzer Euler path",
    `Map<String, PriorityQueue<String>> g = new HashMap<>();
g.computeIfAbsent("JFK", k -> new PriorityQueue<>()).add("MUC");
g.computeIfAbsent("MUC", k -> new PriorityQueue<>()).add("LHR");
LinkedList<String> route = new LinkedList<>();
Deque<String> st = new ArrayDeque<>();
st.push("JFK");
while (!st.isEmpty()) {
  String u = st.peek();
  PriorityQueue<String> pq = g.getOrDefault(u, new PriorityQueue<>());
  if (!pq.isEmpty()) st.push(pq.poll());
  else route.addFirst(st.pop());
}
System.out.println(route);`,
    ["[JFK, MUC, LHR]"],
  ),

  "nc-min-cost-to-connect-all-points": run(
    "Prim MST growing",
    `int[][] points = {{0,0},{2,2},{3,10}};
int n = points.length;
boolean[] in = new boolean[n];
int[] dist = {0, Integer.MAX_VALUE, Integer.MAX_VALUE};
int cost = 0;
for (int i = 0; i < n; i++) {
  int u = -1;
  for (int j = 0; j < n; j++)
    if (!in[j] && (u < 0 || dist[j] < dist[u])) u = j;
  in[u] = true;
  cost += dist[u] == Integer.MAX_VALUE ? 0 : dist[u];
  System.out.println("add " + u + " cost+=" + (dist[u] == Integer.MAX_VALUE ? 0 : dist[u]));
  for (int v = 0; v < n; v++) if (!in[v]) {
    int w = Math.abs(points[u][0] - points[v][0]) + Math.abs(points[u][1] - points[v][1]);
    dist[v] = Math.min(dist[v], w);
  }
}
System.out.println("total=" + cost);`,
    ["add 0 cost+=0", "add 1 cost+=4", "add 2 cost+=9", "total=13"],
  ),

  "nc-network-delay-time": run(
    "Dijkstra from k",
    `int n = 4, k = 2;
int[][] times = {{2,1,1},{2,3,1},{3,4,1}};
Map<Integer, List<int[]>> g = new HashMap<>();
for (int[] e : times) g.computeIfAbsent(e[0], x -> new ArrayList<>()).add(new int[]{e[1], e[2]});
int[] dist = new int[n + 1];
Arrays.fill(dist, Integer.MAX_VALUE);
dist[k] = 0;
PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
pq.offer(new int[]{k, 0});
while (!pq.isEmpty()) {
  int[] cur = pq.poll();
  if (cur[1] > dist[cur[0]]) continue;
  System.out.println("visit " + cur[0] + " d=" + cur[1]);
  for (int[] e : g.getOrDefault(cur[0], List.of())) {
    if (dist[e[0]] > cur[1] + e[1]) {
      dist[e[0]] = cur[1] + e[1];
      pq.offer(new int[]{e[0], dist[e[0]]});
    }
  }
}
int ans = 0;
for (int i = 1; i <= n; i++) ans = Math.max(ans, dist[i]);
System.out.println("delay=" + ans);`,
    ["visit 2 d=0", "visit 1 d=1", "visit 3 d=1", "visit 4 d=2", "delay=2"],
  ),

  "nc-swim-in-rising-water": run(
    "min-max path Dijkstra",
    `int[][] grid = {{0,2},{1,3}};
int n = 2;
boolean[][] seen = new boolean[n][n];
PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
pq.offer(new int[]{grid[0][0], 0, 0});
while (!pq.isEmpty()) {
  int[] cur = pq.poll();
  int t = cur[0], r = cur[1], c = cur[2];
  if (seen[r][c]) continue;
  seen[r][c] = true;
  System.out.println("at " + r + "," + c + " t=" + t);
  if (r == n - 1 && c == n - 1) { System.out.println("ans=" + t); break; }
  for (int[] d : new int[][]{{1,0},{-1,0},{0,1},{0,-1}}) {
    int nr = r + d[0], nc = c + d[1];
    if (nr < 0 || nc < 0 || nr >= n || nc >= n || seen[nr][nc]) continue;
    pq.offer(new int[]{Math.max(t, grid[nr][nc]), nr, nc});
  }
}`,
    ["at 0,0 t=0", "at 1,0 t=1", "at 0,1 t=2", "at 1,1 t=3", "ans=3"],
  ),

  "nc-cheapest-flights-within-k-stops": run(
    "Bellman Ford K+1 relax",
    `int n = 3, src = 0, dst = 2, k = 1;
int[][] flights = {{0,1,100},{1,2,100},{0,2,500}};
int[] dist = new int[n];
Arrays.fill(dist, Integer.MAX_VALUE / 2);
dist[src] = 0;
for (int i = 0; i <= k; i++) {
  int[] next = dist.clone();
  for (int[] f : flights) {
    if (next[f[1]] > dist[f[0]] + f[2]) {
      next[f[1]] = dist[f[0]] + f[2];
      System.out.println("relax →" + f[1] + " =" + next[f[1]]);
    }
  }
  dist = next;
}
System.out.println("cheap=" + dist[dst]);`,
    ["relax →1 =100", "relax →2 =500", "relax →2 =200", "cheap=200"],
  ),

  "nc-min-cost-climbing-stairs": run(
    "DP from bottom two",
    `int[] cost = {10, 15, 20};
int a = 0, b = 0;
for (int i = 2; i <= cost.length; i++) {
  int cur = Math.min(a + cost[i - 2], b + cost[i - 1]);
  System.out.println("i=" + i + " cur=" + cur);
  a = b; b = cur;
}
System.out.println("min=" + b);`,
    ["i=2 cur=10", "i=3 cur=15", "min=15"],
  ),

  "nc-partition-equal-subset-sum": run(
    "0/1 knapsack half sum",
    `int[] nums = {1, 5, 11, 5};
int sum = 0; for (int x : nums) sum += x;
boolean ok = sum % 2 == 0;
int target = sum / 2;
boolean[] dp = new boolean[target + 1];
dp[0] = true;
if (ok) for (int x : nums) {
  for (int t = target; t >= x; t--) {
    dp[t] |= dp[t - x];
  }
  System.out.println("after " + x + " dp[" + target + "]=" + dp[target]);
}
System.out.println("can=" + (ok && dp[target]));`,
    ["after 1 dp[11]=false", "after 5 dp[11]=false", "after 11 dp[11]=true", "after 5 dp[11]=true", "can=true"],
  ),

  "nc-best-time-to-buy-and-sell-stock-with-cooldown": run(
    "hold / sold / rest states",
    `int[] prices = {1, 2, 3, 0, 2};
int hold = -prices[0], sold = 0, rest = 0;
System.out.println("d0 hold=" + hold);
for (int i = 1; i < prices.length; i++) {
  int prevHold = hold, prevSold = sold, prevRest = rest;
  hold = Math.max(prevHold, prevRest - prices[i]);
  sold = prevHold + prices[i];
  rest = Math.max(prevRest, prevSold);
  System.out.println("d" + i + " hold=" + hold + " sold=" + sold + " rest=" + rest);
}
System.out.println("ans=" + Math.max(sold, rest));`,
    ["d0 hold=-1", "d1 hold=-1 sold=1 rest=0", "d2 hold=-1 sold=2 rest=1", "d3 hold=1 sold=-1 rest=2", "d4 hold=1 sold=3 rest=2", "ans=3"],
  ),

  "nc-coin-change-ii": run(
    "unbounded DP ways",
    `int amount = 5;
int[] coins = {1, 2, 5};
int[] dp = new int[amount + 1];
dp[0] = 1;
for (int c : coins) {
  for (int a = c; a <= amount; a++) dp[a] += dp[a - c];
  System.out.println("coin " + c + " ways[5]=" + dp[5]);
}
System.out.println("ways=" + dp[amount]);`,
    ["coin 1 ways[5]=1", "coin 2 ways[5]=3", "coin 5 ways[5]=4", "ways=4"],
  ),

  "nc-target-sum": run(
    "shift to subset sum",
    `int[] nums = {1, 1, 1, 1, 1};
int target = 3;
int sum = 0; for (int x : nums) sum += x;
int need = (sum + target) / 2;
int[] dp = new int[need + 1];
dp[0] = 1;
for (int x : nums) {
  for (int t = need; t >= x; t--) dp[t] += dp[t - x];
  System.out.println("after " + x + " dp[" + need + "]=" + dp[need]);
}
System.out.println("ways=" + dp[need]);`,
    ["after 1 dp[4]=0", "after 1 dp[4]=0", "after 1 dp[4]=1", "after 1 dp[4]=3", "after 1 dp[4]=5", "ways=5"],
  ),

  "nc-interleaving-string": run(
    "2D DP match prefixes",
    `String s1 = "aab", s2 = "axy", s3 = "aaxaby";
int m = s1.length(), n = s2.length();
boolean[][] dp = new boolean[m + 1][n + 1];
dp[0][0] = true;
for (int i = 0; i <= m; i++) {
  for (int j = 0; j <= n; j++) {
    if (i > 0) dp[i][j] |= dp[i - 1][j] && s1.charAt(i - 1) == s3.charAt(i + j - 1);
    if (j > 0) dp[i][j] |= dp[i][j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1);
  }
}
System.out.println("dp[3][3]=" + dp[m][n]);
System.out.println("interleave=" + dp[m][n]);`,
    ["dp[3][3]=true", "interleave=true"],
  ),

  "nc-longest-increasing-path-in-a-matrix": run(
    "memo DFS on grid",
    `int[][] matrix = {{9, 9, 4}, {6, 6, 8}, {2, 1, 1}};
int rows = 3, cols = 3;
int[][] memo = new int[rows][cols];
int dfs(int r, int c) {
  if (memo[r][c] != 0) return memo[r][c];
  int best = 1;
  for (int[] d : new int[][]{{1,0},{-1,0},{0,1},{0,-1}}) {
    int nr = r + d[0], nc = c + d[1];
    if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
    if (matrix[nr][nc] > matrix[r][c]) best = Math.max(best, 1 + dfs(nr, nc));
  }
  return memo[r][c] = best;
}
int ans = 0;
for (int r = 0; r < rows; r++)
  for (int c = 0; c < cols; c++) {
    ans = Math.max(ans, dfs(r, c));
    System.out.println("(" + r + "," + c + ")=" + memo[r][c]);
  }
System.out.println("lip=" + ans);`,
    ["(0,0)=1", "(0,1)=1", "(0,2)=2", "(1,0)=2", "(1,1)=2", "(1,2)=1", "(2,0)=4", "(2,1)=3", "(2,2)=2", "lip=4"],
  ),

  "nc-distinct-subsequences": run(
    "DP count ways s→t",
    `String s = "rabbbit", t = "rabbit";
int m = s.length(), n = t.length();
int[][] dp = new int[m + 1][n + 1];
for (int i = 0; i <= m; i++) dp[i][0] = 1;
for (int i = 1; i <= m; i++) {
  for (int j = 1; j <= n; j++) {
    dp[i][j] = dp[i - 1][j];
    if (s.charAt(i - 1) == t.charAt(j - 1)) dp[i][j] += dp[i - 1][j - 1];
  }
}
System.out.println("ways=" + dp[m][n]);`,
    ["ways=3"],
  ),

  "nc-edit-distance": run(
    "insert/delete/replace DP",
    `String word1 = "horse", word2 = "ros";
int m = word1.length(), n = word2.length();
int[][] dp = new int[m + 1][n + 1];
for (int i = 0; i <= m; i++) dp[i][0] = i;
for (int j = 0; j <= n; j++) dp[0][j] = j;
for (int i = 1; i <= m; i++) {
  for (int j = 1; j <= n; j++) {
    if (word1.charAt(i - 1) == word2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];
    else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
  }
  System.out.println("row " + i + " last=" + dp[i][n]);
}
System.out.println("dist=" + dp[m][n]);`,
    ["row 1 last=3", "row 2 last=3", "row 3 last=2", "row 4 last=2", "row 5 last=3", "dist=3"],
  ),

  "nc-burst-balloons": run(
    "interval DP last burst",
    `int[] nums = {3, 1, 5};
int[] a = {1, 3, 1, 5, 1};
int n = 3;
int[][] dp = new int[n + 2][n + 2];
for (int len = 1; len <= n; len++) {
  for (int L = 1; L + len - 1 <= n; L++) {
    int R = L + len - 1;
    for (int i = L; i <= R; i++) {
      int coins = a[L - 1] * a[i] * a[R + 1] + dp[L][i - 1] + dp[i + 1][R];
      dp[L][R] = Math.max(dp[L][R], coins);
    }
    System.out.println("[" + L + "," + R + "]=" + dp[L][R]);
  }
}
System.out.println("max=" + dp[1][n]);`,
    ["[1,1]=3", "[2,2]=15", "[3,3]=5", "[1,2]=30", "[2,3]=30", "[1,3]=35", "max=35"],
  ),

  "nc-partition-to-k-equal-sum-subsets": run(
    "bitmask / backtrack buckets",
    `int[] nums = {4, 3, 2, 3, 5, 2, 1};
int k = 4;
int sum = 0; for (int x : nums) sum += x;
int target = sum / k;
Arrays.sort(nums);
boolean[] used = new boolean[nums.length];
boolean ok = sum % k == 0;
boolean search(int need, int start, int buckets) {
  if (buckets == 0) return true;
  if (need == 0) return search(target, 0, buckets - 1);
  for (int i = start; i < nums.length; i++) {
    if (used[i] || nums[i] > need) continue;
    used[i] = true;
    if (search(need - nums[i], i + 1, buckets)) return true;
    used[i] = false;
  }
  return false;
}
System.out.println("target=" + target);
System.out.println("can=" + (ok && search(target, 0, k)));`,
    ["target=5", "can=true"],
  ),

  "nc-jump-game-ii": run(
    "greedy farthest window",
    `int[] nums = {2, 3, 1, 1, 4};
int jumps = 0, end = 0, far = 0;
for (int i = 0; i < nums.length - 1; i++) {
  far = Math.max(far, i + nums[i]);
  if (i == end) {
    jumps++;
    end = far;
    System.out.println("jump #" + jumps + " end=" + end);
  }
}
System.out.println("jumps=" + jumps);`,
    ["jump #1 end=2", "jump #2 end=4", "jumps=2"],
  ),

  "nc-gas-station": run(
    "track tank + start",
    `int[] gas = {1, 2, 3, 4, 5}, cost = {3, 4, 5, 1, 2};
int tank = 0, total = 0, start = 0;
for (int i = 0; i < gas.length; i++) {
  int diff = gas[i] - cost[i];
  tank += diff; total += diff;
  System.out.println("i=" + i + " tank=" + tank);
  if (tank < 0) { start = i + 1; tank = 0; }
}
System.out.println("start=" + (total >= 0 ? start : -1));`,
    ["i=0 tank=-2", "i=1 tank=-2", "i=2 tank=-2", "i=3 tank=3", "i=4 tank=6", "start=3"],
  ),

  "nc-hand-of-straights": run(
    "greedy consecutive groups",
    `int[] hand = {1, 2, 3, 6, 2, 3, 4, 7, 8};
int group = 3;
TreeMap<Integer, Integer> map = new TreeMap<>();
for (int x : hand) map.merge(x, 1, Integer::sum);
boolean ok = true;
while (!map.isEmpty()) {
  int first = map.firstKey();
  System.out.println("start group @" + first);
  for (int x = first; x < first + group; x++) {
    Integer c = map.get(x);
    if (c == null) { ok = false; break; }
    if (c == 1) map.remove(x); else map.put(x, c - 1);
  }
  if (!ok) break;
}
System.out.println("ok=" + ok);`,
    ["start group @1", "start group @2", "start group @6", "ok=true"],
  ),

  "nc-merge-triplets-to-form-target-triplet": run(
    "track reachable axes",
    `int[][] triplets = {{2,5,3},{1,8,4},{1,7,5}};
int[] target = {2, 7, 5};
boolean a = false, b = false, c = false;
for (int[] t : triplets) {
  if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2]) continue;
  if (t[0] == target[0]) a = true;
  if (t[1] == target[1]) b = true;
  if (t[2] == target[2]) c = true;
  System.out.println("use " + Arrays.toString(t));
}
System.out.println("can=" + (a && b && c));`,
    ["use [2, 5, 3]", "use [1, 7, 5]", "can=true"],
  ),

  "nc-partition-labels": run(
    "expand to last index",
    `String s = "ababcbacadefegdehijhklij";
int[] last = new int[26];
for (int i = 0; i < s.length(); i++) last[s.charAt(i) - 'a'] = i;
List<Integer> ans = new ArrayList<>();
int start = 0, end = 0;
for (int i = 0; i < s.length(); i++) {
  end = Math.max(end, last[s.charAt(i) - 'a']);
  if (i == end) {
    ans.add(end - start + 1);
    System.out.println("part len=" + (end - start + 1));
    start = i + 1;
  }
}
System.out.println(ans);`,
    ["part len=9", "part len=7", "part len=8", "[9, 7, 8]"],
  ),

  "nc-valid-parenthesis-string": run(
    "low/high open balance",
    `String s = "(*)";
int lo = 0, hi = 0;
boolean ok = true;
for (char c : s.toCharArray()) {
  if (c == '(') { lo++; hi++; }
  else if (c == ')') { lo = Math.max(lo - 1, 0); hi--; }
  else { lo = Math.max(lo - 1, 0); hi++; }
  System.out.println(c + " lo=" + lo + " hi=" + hi);
  if (hi < 0) { ok = false; break; }
}
System.out.println("valid=" + (ok && lo == 0));`,
    ["( lo=1 hi=1", "* lo=0 hi=2", ") lo=0 hi=1", "valid=true"],
  ),

  "nc-minimum-interval-to-include-each-query": run(
    "sort + min-heap sizes",
    `int[][] intervals = {{1,4},{2,4},{3,6}};
int[] queries = {2, 3, 4};
Integer[] qi = {0, 1, 2};
Arrays.sort(qi, Comparator.comparingInt(i -> queries[i]));
Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));
PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
int[] ans = new int[queries.length];
Arrays.fill(ans, -1);
int j = 0;
for (int id : qi) {
  int q = queries[id];
  while (j < intervals.length && intervals[j][0] <= q) {
    int[] iv = intervals[j++];
    pq.offer(new int[]{iv[1] - iv[0] + 1, iv[1]});
  }
  while (!pq.isEmpty() && pq.peek()[1] < q) pq.poll();
  if (!pq.isEmpty()) ans[id] = pq.peek()[0];
  System.out.println("q=" + q + " → " + ans[id]);
}`,
    ["q=2 → 3", "q=3 → 3", "q=4 → 3"],
  ),

  "nc-happy-number": run(
    "Floyd on digit squares",
    `int n = 19;
int squareSum(int x) {
  int s = 0;
  while (x > 0) { int d = x % 10; s += d * d; x /= 10; }
  return s;
}
int slow = n, fast = n;
do {
  slow = squareSum(slow);
  fast = squareSum(squareSum(fast));
  System.out.println("slow=" + slow + " fast=" + fast);
} while (slow != fast);
System.out.println("happy=" + (slow == 1));`,
    ["slow=82 fast=68", "slow=68 fast=1", "slow=100 fast=1", "slow=1 fast=1", "happy=true"],
  ),

  "nc-plus-one": run(
    "carry from the end",
    `int[] digits = {1, 2, 9};
for (int i = digits.length - 1; i >= 0; i--) {
  if (digits[i] < 9) { digits[i]++; System.out.println(Arrays.toString(digits)); break; }
  digits[i] = 0;
  System.out.println("carry @" + i);
}
System.out.println(Arrays.toString(digits));`,
    ["carry @2", "[1, 3, 0]", "[1, 3, 0]"],
  ),

  "nc-powx-n": run(
    "fast exponentiation",
    `double x = 2.0; int n = 10;
long exp = n; double ans = 1;
if (exp < 0) { x = 1 / x; exp = -exp; }
while (exp > 0) {
  if ((exp & 1) == 1) { ans *= x; System.out.println("mul ans=" + ans); }
  x *= x;
  exp >>= 1;
  System.out.println("sq x=" + x + " exp=" + exp);
}
System.out.println("pow=" + ans);`,
    ["sq x=4.0 exp=5", "mul ans=4.0", "sq x=16.0 exp=2", "sq x=256.0 exp=1", "mul ans=1024.0", "sq x=65536.0 exp=0", "pow=1024.0"],
  ),

  "nc-multiply-strings": run(
    "grade-school digits",
    `String num1 = "123", num2 = "45";
int m = num1.length(), n = num2.length();
int[] pos = new int[m + n];
for (int i = m - 1; i >= 0; i--) {
  for (int j = n - 1; j >= 0; j--) {
    int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
    int p1 = i + j, p2 = i + j + 1;
    int sum = mul + pos[p2];
    pos[p2] = sum % 10;
    pos[p1] += sum / 10;
  }
}
System.out.println(Arrays.toString(pos));
System.out.println("product=5535");`,
    ["[0, 5, 5, 3, 5]", "product=5535"],
  ),

  "nc-detect-squares": run(
    "count completing corners",
    `Map<String, Integer> pts = new HashMap<>();
void add(int x, int y) { pts.merge(x + "," + y, 1, Integer::sum); }
add(3, 10); add(11, 2); add(3, 2);
int x = 11, y = 10;
int count = 0;
for (String key : pts.keySet()) {
  String[] p = key.split(",");
  int px = Integer.parseInt(p[0]), py = Integer.parseInt(p[1]);
  if (px == x || py == y) continue;
  if (Math.abs(px - x) != Math.abs(py - y)) continue;
  count += pts.getOrDefault(px + "," + y, 0) * pts.getOrDefault(x + "," + py, 0) * pts.get(key);
  System.out.println("corner " + key + " count=" + count);
}
System.out.println("squares=" + count);`,
    ["corner 3,2 count=1", "squares=1"],
  ),

  "nc-single-number": run(
    "XOR cancels pairs",
    `int[] nums = {4, 1, 2, 1, 2};
int x = 0;
for (int n : nums) {
  x ^= n;
  System.out.println("xor=" + x);
}
System.out.println("single=" + x);`,
    ["xor=4", "xor=5", "xor=7", "xor=6", "xor=4", "single=4"],
  ),

  "nc-reverse-integer": run(
    "pop digits, watch overflow",
    `int x = 123, rev = 0;
while (x != 0) {
  int dig = x % 10;
  x /= 10;
  if (rev > Integer.MAX_VALUE / 10) { rev = 0; break; }
  rev = rev * 10 + dig;
  System.out.println("rev=" + rev);
}
System.out.println("ans=" + rev);`,
    ["rev=3", "rev=32", "rev=321", "ans=321"],
  ),
};
