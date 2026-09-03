import { run, type CodeRun } from "./types";

export const CORE_RUNS: Record<string, CodeRun> = {
  "two-pointers": run(
    "pair sum in a sorted array",
    `int[] nums = {1, 2, 4, 7, 11};
int target = 11;
int L = 0, R = nums.length - 1;
while (L < R) {
  int sum = nums[L] + nums[R];
  System.out.println(nums[L] + " + " + nums[R] + " = " + sum);
  if (sum == target) break;
  if (sum > target) R--;
  else L++;
}`,
    [
      "1 + 11 = 12  → too big, R--",
      "1 + 7 = 8   → too small, L++",
      "2 + 7 = 9   → too small, L++",
      "4 + 7 = 11  → hit. return [2, 3]",
    ],
  ),
  "binary-search": run(
    "find 9 in a sorted array",
    `int[] nums = {1, 3, 5, 7, 9, 11, 13};
int target = 9;
int lo = 0, hi = nums.length - 1;
while (lo <= hi) {
  int mid = lo + (hi - lo) / 2;
  System.out.println("lo=" + lo + " mid=" + mid + " hi=" + hi + " v=" + nums[mid]);
  if (nums[mid] == target) break;
  if (nums[mid] < target) lo = mid + 1;
  else hi = mid - 1;
}`,
    [
      "lo=0 mid=3 hi=6 v=7  7 < 9 → lo = 4",
      "lo=4 mid=5 hi=6 v=11 11 > 9 → hi = 4",
      "lo=4 mid=4 hi=4 v=9  found at index 4",
    ],
  ),
  kadane: run(
    "max subarray with one pass",
    `int[] a = {-2, 1, -3, 4, -1, 2, 1};
int cur = a[0], ans = a[0];
System.out.println("start cur=" + cur);
for (int i = 1; i < a.length; i++) {
  cur = Math.max(a[i], cur + a[i]);
  ans = Math.max(ans, cur);
  System.out.println("i=" + i + " a=" + a[i] + " cur=" + cur + " ans=" + ans);
}`,
    [
      "start cur=-2",
      "i=1 a=1 cur=1 ans=1",
      "i=2 a=-3 cur=-2 ans=1",
      "i=3 a=4 cur=4 ans=4",
      "i=4 a=-1 cur=3 ans=4",
      "i=5 a=2 cur=5 ans=5",
      "i=6 a=1 cur=6 ans=6",
    ],
  ),
  "two-sum": run(
    "two indices with a HashMap",
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
  bfs: run(
    "shortest hops with a queue",
    `Map<String, List<String>> g = Map.of(
  "A", List.of("B", "C"),
  "B", List.of("D"),
  "C", List.of("E"),
  "D", List.of(),
  "E", List.of()
);
Queue<String> q = new ArrayDeque<>();
Set<String> seen = new HashSet<>();
q.add("A"); seen.add("A");
while (!q.isEmpty()) {
  String node = q.poll();
  System.out.println("visit " + node);
  for (String nxt : g.get(node)) {
    if (seen.add(nxt)) q.add(nxt);
  }
}`,
    ["visit A", "visit B", "visit C", "visit D", "visit E"],
  ),
};
