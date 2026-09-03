import { run, type JsRun } from "./types";

export const CORE_RUNS: Record<string, JsRun> = {
  "two-pointers": run(
    "pair sum in a sorted array",
    `const nums = [1, 2, 4, 7, 11];
const target = 11;
let L = 0, R = nums.length - 1;

while (L < R) {
  const sum = nums[L] + nums[R];
  console.log(\`\${nums[L]} + \${nums[R]} = \${sum}\`);
  if (sum === target) break;
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
    `const nums = [1, 3, 5, 7, 9, 11, 13];
const target = 9;
let lo = 0, hi = nums.length - 1;

while (lo <= hi) {
  const mid = lo + Math.floor((hi - lo) / 2);
  console.log({ lo, mid, hi, v: nums[mid] });
  if (nums[mid] === target) break;
  if (nums[mid] < target) lo = mid + 1;
  else hi = mid - 1;
}`,
    [
      "{ lo: 0, mid: 3, hi: 6, v: 7 }  7 < 9 → lo = 4",
      "{ lo: 4, mid: 5, hi: 6, v: 11 } 11 > 9 → hi = 4",
      "{ lo: 4, mid: 4, hi: 4, v: 9 }  found at index 4",
    ],
  ),
  "bfs": run(
    "shortest hops with a queue",
    `const graph = { A: ["B", "C"], B: ["D"], C: ["E"], D: [], E: [] };
const q = ["A"];
const seen = new Set(["A"]);

while (q.length) {
  const node = q.shift();
  console.log("visit", node, "queue", [...q]);
  for (const nxt of graph[node]) {
    if (!seen.has(nxt)) {
      seen.add(nxt);
      q.push(nxt);
    }
  }
}`,
    [
      'visit A  queue []     enqueue B, C',
      'visit B  queue [C]    enqueue D',
      'visit C  queue [D]    enqueue E',
      'visit D  queue [E]',
      'visit E  queue []     done. order A B C D E',
    ],
  ),
  "prefix-hashmap": run(
    "subarray sum = k with a Map",
    `const nums = [1, 2, 3, -2, 5];
const k = 3;
let prefix = 0;
const seen = new Map([[0, 1]]);
let hits = 0;

for (const x of nums) {
  prefix += x;
  hits += seen.get(prefix - k) ?? 0;
  seen.set(prefix, (seen.get(prefix) ?? 0) + 1);
  console.log({ x, prefix, hits });
}`,
    [
      "{ x: 1, prefix: 1, hits: 0 }",
      "{ x: 2, prefix: 3, hits: 1 }   [1,2] sums to 3",
      "{ x: 3, prefix: 6, hits: 2 }   [3] sums to 3",
      "{ x: -2, prefix: 4, hits: 2 }",
      "{ x: 5, prefix: 9, hits: 3 }   [1,2,3,-2,5] wait — leftover 6 in Map",
    ],
  ),
  "two-sum": run(
    "Map leftover → index",
    `const nums = [2, 7, 11, 15];
const target = 9;
const seen = new Map();

for (let i = 0; i < nums.length; i++) {
  const need = target - nums[i];
  if (seen.has(need)) {
    console.log("hit", [seen.get(need), i]);
    break;
  }
  seen.set(nums[i], i);
  console.log("store", nums[i], "→", i);
}`,
    [
      "store 2 → 0",
      "hit [0, 1]   because 9 - 7 = 2 already in the Map",
    ],
  ),
  "sliding-window-fixed": run(
    "max sum of k=3",
    `const nums = [2, 1, 5, 1, 3, 2];
const k = 3;
let sum = nums[0] + nums[1] + nums[2];
let best = sum;
console.log(nums.slice(0, 3), sum);

for (let i = k; i < nums.length; i++) {
  sum += nums[i] - nums[i - k];
  best = Math.max(best, sum);
  console.log(nums.slice(i - k + 1, i + 1), sum);
}
console.log("best", best);`,
    [
      "[2, 1, 5] 8",
      "[1, 5, 1] 7",
      "[5, 1, 3] 9",
      "[1, 3, 2] 6",
      "best 9",
    ],
  ),
  "kadane": run(
    "max subarray with one pass",
    `const nums = [-2, 1, -3, 4, -1, 2, 1];
let best = nums[0], streak = nums[0];

for (let i = 1; i < nums.length; i++) {
  streak = Math.max(nums[i], streak + nums[i]);
  best = Math.max(best, streak);
  console.log({ i, x: nums[i], streak, best });
}`,
    [
      "{ i: 1, x: 1, streak: 1, best: 1 }   start over at 1",
      "{ i: 2, x: -3, streak: -2, best: 1 }",
      "{ i: 3, x: 4, streak: 4, best: 4 }    start over at 4",
      "{ i: 4, x: -1, streak: 3, best: 4 }",
      "{ i: 5, x: 2, streak: 5, best: 5 }",
      "{ i: 6, x: 1, streak: 6, best: 6 }    [4,-1,2,1]",
    ],
  ),
  "dfs": run(
    "stack, not recursion",
    `const graph = { A: ["B", "C"], B: ["D"], C: [], D: [] };
const stack = ["A"];
const seen = new Set();

while (stack.length) {
  const node = stack.pop();
  if (seen.has(node)) continue;
  seen.add(node);
  console.log("visit", node);
  for (const nxt of [...graph[node]].reverse()) stack.push(nxt);
}`,
    [
      "visit A   push C, then B (so B pops first)",
      "visit B   push D",
      "visit D",
      "visit C   order A B D C — deep first",
    ],
  ),
  "lru-cache": run(
    "Map keeps insertion order",
    `class LRU {
  constructor(cap) { this.cap = cap; this.map = new Map(); }
  get(k) {
    if (!this.map.has(k)) return -1;
    const v = this.map.get(k);
    this.map.delete(k); this.map.set(k, v);
    return v;
  }
  put(k, v) {
    if (this.map.has(k)) this.map.delete(k);
    this.map.set(k, v);
    if (this.map.size > this.cap) {
      const oldest = this.map.keys().next().value;
      this.map.delete(oldest);
      console.log("evict", oldest);
    }
  }
}
const lru = new LRU(2);
lru.put(1, "a"); lru.put(2, "b");
console.log("get 1", lru.get(1));
lru.put(3, "c");
console.log("get 2", lru.get(2));`,
    [
      "get 1 a     (1 is now most recent)",
      "evict 2",
      "get 2 -1    2 was the oldest after we touched 1",
    ],
  ),
};
