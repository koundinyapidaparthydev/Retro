import { run, type JsRun } from "./types";

export const PACK: Record<string, JsRun> = {
  "linear-search": run(
    "scan until 7 shows up",
    `const nums = [4, 9, 1, 7, 3];
const target = 7;

for (let i = 0; i < nums.length; i++) {
  console.log("check", i, nums[i]);
  if (nums[i] === target) {
    console.log("found at", i);
    break;
  }
}`,
    [
      "check 0 4",
      "check 1 9",
      "check 2 1",
      "check 3 7",
      "found at 3",
    ],
  ),

  "binary-search-bounds": run(
    "first and last 2",
    `const nums = [1, 2, 2, 2, 5];
const t = 2;

function bound(wantLeft) {
  let lo = 0, hi = nums.length - 1, ans = -1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === t) {
      ans = mid;
      console.log(wantLeft ? "first" : "last", mid);
      if (wantLeft) hi = mid - 1;
      else lo = mid + 1;
    } else if (nums[mid] < t) lo = mid + 1;
    else hi = mid - 1;
  }
  return ans;
}

console.log({ first: bound(true), last: bound(false) });`,
    [
      "first 2   mid hit, keep going left",
      "first 1   tighter left edge",
      "last 2    mid hit, keep going right",
      "last 3    last = 3",
      "{ first: 1, last: 3 }",
    ],
  ),

  "peak-finding": run(
    "climb a bitonic array",
    `const nums = [1, 3, 8, 12, 4, 2];
let lo = 0, hi = nums.length - 1;

while (lo < hi) {
  const mid = Math.floor((lo + hi) / 2);
  console.log({ mid, v: nums[mid], next: nums[mid + 1] });
  if (nums[mid] < nums[mid + 1]) lo = mid + 1;
  else hi = mid;
}
console.log("peak", lo, nums[lo]);`,
    [
      "{ mid: 2, v: 8, next: 12 }  still climbing → lo = 3",
      "{ mid: 4, v: 4, next: 2 }   slope down → hi = 4",
      "{ mid: 3, v: 12, next: 4 }  12 is bigger",
      "peak 3 12",
    ],
  ),

  "search-rotated-array": run(
    "find 0 after a rotate",
    `const nums = [4, 5, 6, 7, 0, 1, 2];
const t = 0;
let lo = 0, hi = nums.length - 1;

while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);
  console.log({ lo, mid, hi, v: nums[mid] });
  if (nums[mid] === t) break;
  if (nums[lo] <= nums[mid]) {
    if (t >= nums[lo] && t < nums[mid]) hi = mid - 1;
    else lo = mid + 1;
  } else {
    if (t > nums[mid] && t <= nums[hi]) lo = mid + 1;
    else hi = mid - 1;
  }
}`,
    [
      "{ lo: 0, mid: 3, hi: 6, v: 7 }  left half sorted, 0 not in it → lo = 4",
      "{ lo: 4, mid: 5, hi: 6, v: 1 }  0 lives in [0, 1] → hi = 4",
      "{ lo: 4, mid: 4, hi: 4, v: 0 }  found",
    ],
  ),

  "binary-search-on-answer": run(
    "min eat speed for 8 hours",
    `const piles = [3, 6, 7, 11];
const hours = 8;

function ok(speed) {
  let h = 0;
  for (const p of piles) h += Math.ceil(p / speed);
  return h <= hours;
}

let lo = 1, hi = 11, ans = 11;
while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);
  const good = ok(mid);
  console.log("speed", mid, good ? "fits" : "too slow");
  if (good) { ans = mid; hi = mid - 1; }
  else lo = mid + 1;
}
console.log("min speed", ans);`,
    [
      "speed 6 fits      1+1+2+2 = 6h, try slower",
      "speed 3 too slow  1+2+3+4 = 10h",
      "speed 4 fits      1+2+2+3 = 8h on the nose",
      "min speed 4",
    ],
  ),

  "ternary-search": run(
    "max of a bitonic array",
    `const a = [1, 3, 8, 12, 9, 4, 2];
let lo = 0, hi = a.length - 1;

while (hi - lo > 2) {
  const t = Math.floor((hi - lo) / 3);
  const m1 = lo + t, m2 = hi - t;
  console.log({ m1, v1: a[m1], m2, v2: a[m2] });
  if (a[m1] < a[m2]) lo = m1;
  else hi = m2;
}
let p = lo;
for (let i = lo; i <= hi; i++) if (a[i] > a[p]) p = i;
console.log("peak", p, a[p]);`,
    [
      "{ m1: 2, v1: 8, m2: 4, v2: 9 }   8 < 9 → climb, lo = 2",
      "{ m1: 3, v1: 12, m2: 5, v2: 4 }  12 wins → hi = 5",
      "{ m1: 3, v1: 12, m2: 4, v2: 9 }  still 12 → hi = 4",
      "peak 3 12",
    ],
  ),

  "interpolation-search": run(
    "probe where 18 should sit",
    `const nums = [10, 12, 16, 18, 22, 24, 33, 35, 42, 47];
const t = 18;
let lo = 0, hi = nums.length - 1;

while (lo <= hi && t >= nums[lo] && t <= nums[hi]) {
  const span = nums[hi] - nums[lo];
  const pos = lo + Math.floor(((t - nums[lo]) * (hi - lo)) / span);
  console.log({ lo, pos, hi, v: nums[pos] });
  if (nums[pos] === t) break;
  if (nums[pos] < t) lo = pos + 1;
  else hi = pos - 1;
}`,
    [
      "{ lo: 0, pos: 1, hi: 9, v: 12 }  estimate short → lo = 2",
      "{ lo: 2, pos: 2, hi: 9, v: 16 }  still short → lo = 3",
      "{ lo: 3, pos: 3, hi: 9, v: 18 }  landed",
    ],
  ),

  "exponential-search": run(
    "double the bound, then binary",
    `const nums = [1, 2, 3, 4, 8, 16, 32, 64];
const t = 16;
let bound = 1;

while (bound < nums.length && nums[bound] < t) {
  console.log("bound", bound, nums[bound]);
  bound *= 2;
}
let lo = Math.floor(bound / 2);
let hi = Math.min(bound, nums.length - 1);
console.log("window", lo, hi);

while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);
  console.log("mid", mid, nums[mid]);
  if (nums[mid] === t) break;
  if (nums[mid] < t) lo = mid + 1;
  else hi = mid - 1;
}`,
    [
      "bound 1 2",
      "bound 2 3",
      "bound 4 8",
      "window 4 7",
      "mid 5 16  found",
    ],
  ),

  "sliding-window-variable": run(
    "shortest subarray summing to ≥ 7",
    `const nums = [2, 3, 1, 2, 4, 3];
const need = 7;
let L = 0, sum = 0, best = Infinity;

for (let R = 0; R < nums.length; R++) {
  sum += nums[R];
  while (sum >= need) {
    best = Math.min(best, R - L + 1);
    console.log(nums.slice(L, R + 1), sum, "len", R - L + 1);
    sum -= nums[L++];
  }
}
console.log("best", best);`,
    [
      "[2, 3, 1, 2] 8  len 4",
      "[3, 1, 2, 4] 10 len 4",
      "[1, 2, 4] 7     len 3",
      "[2, 4, 3] 9     len 3",
      "[4, 3] 7        len 2",
      "best 2",
    ],
  ),

  "fast-slow-pointers": run(
    "Floyd cycle in a next[] list",
    `const next = [1, 2, 3, 4, 2];
let slow = 0, fast = 0;

do {
  slow = next[slow];
  fast = next[next[fast]];
  console.log({ slow, fast });
} while (slow !== fast);

console.log("cycle meet at", slow);`,
    [
      "{ slow: 1, fast: 2 }",
      "{ slow: 2, fast: 4 }",
      "{ slow: 3, fast: 3 }  meet",
      "cycle meet at 3",
    ],
  ),

  "frequency-map": run(
    "count as you walk",
    `const nums = [4, 1, 4, 2, 4];
const freq = new Map();

for (const n of nums) {
  freq.set(n, (freq.get(n) ?? 0) + 1);
  console.log(n, "→", freq.get(n));
}
console.log("4 appears", freq.get(4));`,
    [
      "4 → 1",
      "1 → 1",
      "4 → 2",
      "2 → 1",
      "4 → 3",
      "4 appears 3",
    ],
  ),

  "prefix-hashmap": run(
    "how many subarrays sum to 3",
    `const nums = [1, 2, 3, -2, 5];
const k = 3;
const seen = new Map([[0, 1]]);
let pref = 0, hits = 0;

for (const n of nums) {
  pref += n;
  hits += seen.get(pref - k) ?? 0;
  seen.set(pref, (seen.get(pref) ?? 0) + 1);
  console.log({ n, pref, hits });
}`,
    [
      "{ n: 1, pref: 1, hits: 0 }",
      "{ n: 2, pref: 3, hits: 1 }  [1, 2]",
      "{ n: 3, pref: 6, hits: 2 }  [3]",
      "{ n: -2, pref: 4, hits: 3 } [2, 3, -2]",
      "{ n: 5, pref: 9, hits: 4 }  [-2, 5]",
    ],
  ),

  "group-anagrams": run(
    "sort letters as the Map key",
    `const words = ["eat", "tea", "tan", "ate"];
const groups = new Map();

for (const w of words) {
  const key = [...w].sort().join("");
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(w);
  console.log(key, groups.get(key));
}
console.log([...groups.values()]);`,
    [
      "aet [ 'eat' ]",
      "aet [ 'eat', 'tea' ]",
      "ant [ 'tan' ]",
      "aet [ 'eat', 'tea', 'ate' ]",
      "[ [ 'eat', 'tea', 'ate' ], [ 'tan' ] ]",
    ],
  ),

  "longest-consecutive": run(
    "only start a run at the left edge",
    `const nums = [100, 4, 200, 1, 3, 2];
const set = new Set(nums);
let best = 0;

for (const n of set) {
  if (set.has(n - 1)) continue;
  let len = 1;
  while (set.has(n + len)) len++;
  best = Math.max(best, len);
  console.log("start", n, "len", len);
}
console.log("best", best);`,
    [
      "start 100 len 1",
      "start 200 len 1",
      "start 1 len 4     1-2-3-4",
      "best 4",
    ],
  ),

  "design-hashmap": run(
    "array of buckets, k % 4",
    `const buckets = [[], [], [], []];

function put(k, v) {
  const i = k % 4;
  const row = buckets[i].find((p) => p[0] === k);
  if (row) row[1] = v;
  else buckets[i].push([k, v]);
  console.log("bucket", i, buckets[i]);
}

put(1, "a");
put(5, "b");
put(2, "c");
console.log("get 5 →", buckets[5 % 4].find((p) => p[0] === 5)[1]);`,
    [
      "bucket 1 [ [ 1, 'a' ] ]",
      "bucket 1 [ [ 1, 'a' ], [ 5, 'b' ] ]  collision on 1 % 4",
      "bucket 2 [ [ 2, 'c' ] ]",
      "get 5 → b",
    ],
  ),

  "prefix-sum": run(
    "build pref, then range queries",
    `const nums = [2, 1, 3, 4];
const pref = [0];
for (const n of nums) pref.push(pref[pref.length - 1] + n);
console.log("pref", pref);

function range(L, R) {
  const sum = pref[R + 1] - pref[L];
  console.log("[" + L + "," + R + "]", sum);
}
range(0, 2);
range(1, 3);
range(2, 2);`,
    [
      "pref [ 0, 2, 3, 6, 10 ]",
      "[0,2] 6   2+1+3",
      "[1,3] 8   1+3+4",
      "[2,2] 3",
    ],
  ),

  "difference-array": run(
    "range += in O(1), rebuild after",
    `const n = 5;
const diff = Array(n + 1).fill(0);

function add(L, R, v) {
  diff[L] += v;
  diff[R + 1] -= v;
  console.log("add", L, R, "+" + v, diff.slice(0, n));
}
add(1, 3, 2);
add(0, 2, 1);

const nums = [];
let run = 0;
for (let i = 0; i < n; i++) {
  run += diff[i];
  nums.push(run);
}
console.log("nums", nums);`,
    [
      "add 1 3 +2 [ 0, 2, 0, 0, -2 ]",
      "add 0 2 +1 [ 1, 2, 0, -1, -2 ]",
      "nums [ 1, 3, 3, 2, 0 ]",
    ],
  ),

  "prefix-2d": run(
    "inclusion-exclusion on a 2×3",
    `const g = [
  [1, 2, 3],
  [4, 5, 6],
];
const p = Array.from({ length: 3 }, () => Array(4).fill(0));

for (let r = 0; r < 2; r++) {
  for (let c = 0; c < 3; c++) {
    p[r + 1][c + 1] = g[r][c] + p[r][c + 1] + p[r + 1][c] - p[r][c];
  }
}
console.log(p[1]);
console.log(p[2]);

function sum(r1, c1, r2, c2) {
  return p[r2 + 1][c2 + 1] - p[r1][c2 + 1] - p[r2 + 1][c1] + p[r1][c1];
}
console.log("box (0,1)-(1,2)", sum(0, 1, 1, 2));
console.log("box (0,0)-(0,1)", sum(0, 0, 0, 1));`,
    [
      "[ 0, 1, 3, 6 ]",
      "[ 0, 5, 12, 21 ]",
      "box (0,1)-(1,2) 16   2+3+5+6",
      "box (0,0)-(0,1) 3    1+2",
    ],
  ),

  "rotate-array": run(
    "right-rotate 7 by 3 via reverses",
    `const nums = [1, 2, 3, 4, 5, 6, 7];
const k = 3;

function rev(a, i, j) {
  while (i < j) {
    [a[i], a[j]] = [a[j], a[i]];
    i++; j--;
  }
}

rev(nums, 0, nums.length - 1);
console.log("flip all", [...nums]);
rev(nums, 0, k - 1);
console.log("flip head", [...nums]);
rev(nums, k, nums.length - 1);
console.log("flip tail", [...nums]);`,
    [
      "flip all [ 7, 6, 5, 4, 3, 2, 1 ]",
      "flip head [ 5, 6, 7, 4, 3, 2, 1 ]",
      "flip tail [ 5, 6, 7, 1, 2, 3, 4 ]",
    ],
  ),

  "spiral-matrix": run(
    "peel a 3×3 layer by layer",
    `const g = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const out = [];
let top = 0, bot = 2, L = 0, R = 2;

for (let c = L; c <= R; c++) out.push(g[top][c]);
console.log("right", [...out]);
top++;
for (let r = top; r <= bot; r++) out.push(g[r][R]);
console.log("down", [...out]);
R--;
for (let c = R; c >= L; c--) out.push(g[bot][c]);
console.log("left", [...out]);
bot--;
for (let r = bot; r >= top; r--) out.push(g[r][L]);
console.log("up", [...out]);
out.push(g[1][1]);
console.log("center", [...out]);`,
    [
      "right [ 1, 2, 3 ]",
      "down [ 1, 2, 3, 6, 9 ]",
      "left [ 1, 2, 3, 6, 9, 8, 7 ]",
      "up [ 1, 2, 3, 6, 9, 8, 7, 4 ]",
      "center [ 1, 2, 3, 6, 9, 8, 7, 4, 5 ]",
    ],
  ),

  "set-matrix-zeroes": run(
    "mark the zero row and col",
    `const g = [[1, 2, 3], [4, 0, 6], [7, 8, 9]];
const zeroR = new Set(), zeroC = new Set();

for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 3; c++) {
    if (g[r][c] === 0) { zeroR.add(r); zeroC.add(c); }
  }
}
console.log("rows", [...zeroR], "cols", [...zeroC]);

for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 3; c++) {
    if (zeroR.has(r) || zeroC.has(c)) g[r][c] = 0;
  }
}
console.log(g[0]);
console.log(g[1]);
console.log(g[2]);`,
    [
      "rows [ 1 ] cols [ 1 ]",
      "[ 1, 0, 3 ]",
      "[ 0, 0, 0 ]",
      "[ 7, 0, 9 ]",
    ],
  ),

  "dutch-flag": run(
    "3-way partition 0 / 1 / 2",
    `const a = [2, 0, 2, 1, 1, 0];
let lo = 0, mid = 0, hi = a.length - 1;

while (mid <= hi) {
  if (a[mid] === 0) {
    [a[lo], a[mid]] = [a[mid], a[lo]];
    lo++; mid++;
  } else if (a[mid] === 2) {
    [a[mid], a[hi]] = [a[hi], a[mid]];
    hi--;
  } else mid++;
  console.log([...a], { lo, mid, hi });
}`,
    [
      "[ 0, 0, 2, 1, 1, 2 ] { lo: 0, mid: 0, hi: 4 }  swap 2 to the end",
      "[ 0, 0, 2, 1, 1, 2 ] { lo: 1, mid: 1, hi: 4 }  0 stays, lo++",
      "[ 0, 0, 2, 1, 1, 2 ] { lo: 2, mid: 2, hi: 4 }",
      "[ 0, 0, 1, 1, 2, 2 ] { lo: 2, mid: 2, hi: 3 }  swap 2 right",
      "[ 0, 0, 1, 1, 2, 2 ] { lo: 2, mid: 3, hi: 3 }  1, mid++",
      "[ 0, 0, 1, 1, 2, 2 ] { lo: 2, mid: 4, hi: 3 }  done",
    ],
  ),

  "boyer-moore-majority": run(
    "one candidate, running vote",
    `const nums = [3, 3, 4, 2, 3];
let cand = null, votes = 0;

for (const n of nums) {
  if (votes === 0) cand = n;
  votes += n === cand ? 1 : -1;
  console.log(n, "→ cand", cand, "votes", votes);
}
console.log("majority", cand);`,
    [
      "3 → cand 3 votes 1",
      "3 → cand 3 votes 2",
      "4 → cand 3 votes 1",
      "2 → cand 3 votes 0   cancelled",
      "3 → cand 3 votes 1",
      "majority 3",
    ],
  ),
};
