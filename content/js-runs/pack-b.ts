import { run, type JsRun } from "./types";

export const PACK: Record<string, JsRun> = {
  "bubble-sort": run(
    "adjacent swaps, last i already home",
    `const a = [4, 2, 5, 1];
for (let end = a.length - 1; end > 0; end--) {
  let swapped = false;
  for (let i = 0; i < end; i++) {
    if (a[i] > a[i + 1]) {
      [a[i], a[i + 1]] = [a[i + 1], a[i]];
      swapped = true;
    }
  }
  console.log("pass", a.slice());
  if (!swapped) break;
}`,
    [
      "pass [2, 4, 1, 5]   5 bubbled to the end",
      "pass [2, 1, 4, 5]   4 is home",
      "pass [1, 2, 4, 5]   sorted — next pass would swap nothing",
    ],
  ),

  "selection-sort": run(
    "min of the suffix, swap into place",
    `const a = [4, 2, 5, 1];
for (let i = 0; i < a.length - 1; i++) {
  let min = i;
  for (let j = i + 1; j < a.length; j++) if (a[j] < a[min]) min = j;
  [a[i], a[min]] = [a[min], a[i]];
  console.log("put", a[i], "at", i, a.slice());
}`,
    [
      "put 1 at 0  [1, 2, 5, 4]",
      "put 2 at 1  [1, 2, 5, 4]  already there",
      "put 4 at 2  [1, 2, 4, 5]  n-1 swaps, always n² compares",
    ],
  ),

  "insertion-sort": run(
    "slide the hole left, drop the card in",
    `const a = [4, 2, 5, 1];
for (let i = 1; i < a.length; i++) {
  const x = a[i];
  let j = i - 1;
  while (j >= 0 && a[j] > x) { a[j + 1] = a[j]; j--; }
  a[j + 1] = x;
  console.log("insert", x, "→", a.slice());
}`,
    [
      "insert 2 → [2, 4, 5, 1]",
      "insert 5 → [2, 4, 5, 1]  already in order",
      "insert 1 → [1, 2, 4, 5]  pays per inversion",
    ],
  ),

  "merge-sort": run(
    "split in half, merge the sorted runs",
    `function merge(L, R) {
  const out = [];
  let i = 0, j = 0;
  while (i < L.length && j < R.length)
    out.push(L[i] <= R[j] ? L[i++] : R[j++]);
  return out.concat(L.slice(i), R.slice(j));
}
function sort(a) {
  if (a.length < 2) return a;
  const m = a.length >> 1;
  const out = merge(sort(a.slice(0, m)), sort(a.slice(m)));
  console.log("merge", out);
  return out;
}
sort([4, 2, 5, 1]);`,
    [
      "merge [2, 4]     left half",
      "merge [1, 5]     right half",
      "merge [1, 2, 4, 5]  stable: take left on ties",
    ],
  ),

  "quick-sort": run(
    "Lomuto partition, pivot sits at p",
    `const a = [3, 7, 1, 4, 2];
function partition(lo, hi) {
  const pivot = a[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (a[j] < pivot) { [a[i], a[j]] = [a[j], a[i]]; i++; }
  }
  [a[i], a[hi]] = [a[hi], a[i]];
  console.log("pivot", pivot, "at", i, a.slice());
  return i;
}
function qs(lo, hi) {
  if (lo >= hi) return;
  const p = partition(lo, hi);
  qs(lo, p - 1);
  qs(p + 1, hi);
}
qs(0, a.length - 1);`,
    [
      "pivot 2 at 1  [1, 2, 3, 4, 7]  2 is finished",
      "pivot 7 at 4  [1, 2, 3, 4, 7]",
      "pivot 4 at 3  [1, 2, 3, 4, 7]",
      "sorted. last-element pivot hates already-sorted input",
    ],
  ),

  "randomized-quicksort": run(
    "swap a random index into the pivot slot",
    `const a = [1, 2, 3, 4, 5];
function partition(lo, hi) {
  const r = lo + ((hi - lo) >> 1); // stand-in for a random index in [lo, hi]
  [a[r], a[hi]] = [a[hi], a[r]];
  const pivot = a[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (a[j] < pivot) { [a[i], a[j]] = [a[j], a[i]]; i++; }
  }
  [a[i], a[hi]] = [a[hi], a[i]];
  console.log("rolled", r, "pivot", pivot, "at", i, a.slice());
  return i;
}
function qs(lo, hi) {
  if (lo >= hi) return;
  const p = partition(lo, hi);
  qs(lo, p - 1);
  qs(p + 1, hi);
}
qs(0, a.length - 1);`,
    [
      "rolled 2  pivot 3 at 2  [1, 2, 3, 4, 5]  sorted input, mid pivot",
      "left of 3 is already < 3 — tiny work",
      "right of 3 same story",
      "expected n log n on every input, including this one",
    ],
  ),

  "three-way-quicksort": run(
    "Dutch flag: < p | == p | > p",
    `const a = [2, 1, 2, 0, 2, 1, 0];
function qsort(lo, hi) {
  if (lo >= hi) return;
  let lt = lo, i = lo, gt = hi;
  const p = a[lo];
  while (i <= gt) {
    if (a[i] < p) { [a[lt], a[i]] = [a[i], a[lt]]; lt++; i++; }
    else if (a[i] > p) { [a[i], a[gt]] = [a[gt], a[i]]; gt--; }
    else i++;
  }
  console.log("pivot", p, "eq", [lt, gt], a.slice());
  qsort(lo, lt - 1);
  qsort(gt + 1, hi);
}
qsort(0, a.length - 1);`,
    [
      "pivot 2  eq [4, 6]  [1, 0, 1, 0, 2, 2, 2]  all 2s done",
      "pivot 1  eq [2, 3]  [0, 0, 1, 1, 2, 2, 2]",
      "pivot 0  eq [0, 1]  equals stay in the middle — never re-compared",
    ],
  ),

  "heap-sort": run(
    "max-heap, then swap root to the end",
    `const a = [3, 9, 2, 1, 4];
function down(i, n) {
  for (;;) {
    let l = i * 2 + 1, r = l + 1, m = i;
    if (l < n && a[l] > a[m]) m = l;
    if (r < n && a[r] > a[m]) m = r;
    if (m === i) break;
    [a[i], a[m]] = [a[m], a[i]];
    i = m;
  }
}
for (let i = (a.length >> 1) - 1; i >= 0; i--) down(i, a.length);
console.log("heap", a.slice());
for (let n = a.length - 1; n > 0; n--) {
  [a[0], a[n]] = [a[n], a[0]];
  down(0, n);
  console.log("pop", a[n], a.slice(0, n));
}`,
    [
      "heap [9, 4, 2, 1, 3]  build is O(n)",
      "pop 9  [4, 3, 2, 1]",
      "pop 4  [3, 1, 2]",
      "pop 3  [2, 1]",
      "pop 2  [1]   array is now [1, 2, 3, 4, 9]",
    ],
  ),

  "counting-sort": run(
    "tally, then write values back in order",
    `const a = [2, 5, 3, 0, 2, 3];
const count = Array(6).fill(0);
for (const x of a) count[x]++;
console.log("count", count);
const out = [];
count.forEach((c, v) => { while (c--) out.push(v); });
console.log("out", out);`,
    [
      "count [1, 0, 2, 2, 0, 1]  index = value",
      "out [0, 2, 2, 3, 3, 5]",
      "O(n + k) — only when keys are small ints",
      "stable if you walk count backward into a dest array",
    ],
  ),

  "radix-sort": run(
    "LSD: counting-sort each digit, 1s then 10s",
    `let a = [170, 45, 75, 90, 2];
for (let exp = 1; exp <= 100; exp *= 10) {
  const buckets = Array.from({ length: 10 }, () => []);
  for (const x of a) buckets[Math.floor(x / exp) % 10].push(x);
  a = buckets.flat();
  console.log("exp", exp, a);
}`,
    [
      "exp 1    [170, 90, 2, 45, 75]   ones: 0,0,2,5,5",
      "exp 10   [2, 170, 45, 75, 90]   tens",
      "exp 100  [2, 45, 75, 90, 170]   hundreds — done",
      "d passes of stable counting sort",
    ],
  ),

  "bucket-sort": run(
    "scatter into n buckets, sort each, concat",
    `const a = [0.42, 0.32, 0.23, 0.52, 0.25];
const n = a.length;
const buckets = Array.from({ length: n }, () => []);
for (const x of a) buckets[Math.floor(x * n)].push(x);
console.log("scatter", buckets);
for (const b of buckets) b.sort((x, y) => x - y);
const out = buckets.flat();
console.log("out", out);`,
    [
      "scatter  [[], [0.32, 0.23, 0.25], [0.42, 0.52], [], []]",
      "sort buckets → [[], [0.23, 0.25, 0.32], [0.42, 0.52], [], []]",
      "out [0.23, 0.25, 0.32, 0.42, 0.52]",
      "uniform floats → ~O(n); insertion per bucket is the usual",
    ],
  ),

  "cycle-sort": run(
    "write each value to its dest, chase the cycle",
    `const a = [4, 3, 2, 1];
let writes = 0;
for (let i = 0; i < a.length; ) {
  const dest = a[i] - 1;
  if (a[i] !== a[dest]) {
    [a[i], a[dest]] = [a[dest], a[i]];
    writes++;
    console.log("write", a[dest], "→", dest, a.slice());
  } else i++;
}
console.log("writes", writes);`,
    [
      "write 4 → 3  [1, 3, 2, 4]  4 went home, 1 arrived at 0",
      "write 3 → 2  [1, 2, 3, 4]",
      "writes 2   each item written at most once — write-optimal",
    ],
  ),

  "next-greater-element": run(
    "decreasing stack of indices; i pops losers",
    `const a = [2, 1, 2, 4, 3];
const ans = Array(a.length).fill(-1);
const st = [];
for (let i = 0; i < a.length; i++) {
  while (st.length && a[st[st.length - 1]] < a[i]) {
    const j = st.pop();
    ans[j] = a[i];
    console.log(a[j], "→", a[i]);
  }
  st.push(i);
}
console.log("ans", ans);`,
    [
      "1 → 2    index 1 popped by the second 2",
      "2 → 4    index 2 popped",
      "2 → 4    index 0 popped — each index push+pop once",
      "ans [4, 2, 4, -1, -1]",
    ],
  ),

  "valid-parentheses": run(
    "push openers; closer must match the top",
    `const s = "([{}])";
const pair = { ")": "(", "]": "[", "}": "{" };
const st = [];
for (const ch of s) {
  if (!pair[ch]) { st.push(ch); console.log("push", ch, st.slice()); }
  else {
    const ok = st.pop() === pair[ch];
    console.log("pop for", ch, ok ? "match" : "fail", st.slice());
    if (!ok) break;
  }
}
console.log("valid", st.length === 0);`,
    [
      "push (   ['(']",
      "push [   ['(', '[']",
      "push {   ['(', '[', '{']",
      "pop for }  match  ['(', '[']",
      "pop for ]  match  ['(']   then ) empties it",
      "valid true",
    ],
  ),

  "min-stack": run(
    "second array caches the min after every push",
    `const st = [], mins = [];
function push(x) {
  st.push(x);
  mins.push(mins.length ? Math.min(x, mins[mins.length - 1]) : x);
  console.log("push", x, "min", mins[mins.length - 1]);
}
function pop() {
  st.pop();
  mins.pop();
  console.log("pop  min", mins[mins.length - 1]);
}
push(3); push(1); push(2); pop(); pop();`,
    [
      "push 3  min 3",
      "push 1  min 1",
      "push 2  min 1   2 is not smaller",
      "pop  min 1",
      "pop  min 3   old min 1 left with its push",
    ],
  ),

  "monotonic-stack": run(
    "increasing stack → previous smaller on the left",
    `const a = [2, 5, 1, 4];
const st = [];
const prev = Array(a.length).fill(-1);
for (let i = 0; i < a.length; i++) {
  while (st.length && a[st[st.length - 1]] >= a[i]) st.pop();
  if (st.length) prev[i] = st[st.length - 1];
  st.push(i);
  console.log("i", i, "prev", prev[i], "stack", st.slice());
}`,
    [
      "i 0  prev -1  stack [0]",
      "i 1  prev 0   stack [0, 1]  2 is left-smaller of 5",
      "i 2  prev -1  stack [2]      1 pops 5 and 2",
      "i 3  prev 2   stack [2, 3]   1 is left-smaller of 4",
    ],
  ),

  "monotonic-queue": run(
    "decreasing deque; front is the window max",
    `const a = [1, 3, -1, -3, 5];
const k = 3;
const dq = [];
for (let i = 0; i < a.length; i++) {
  while (dq.length && a[dq[dq.length - 1]] <= a[i]) dq.pop();
  dq.push(i);
  if (dq[0] <= i - k) dq.shift();
  if (i >= k - 1) console.log("window", a.slice(i - k + 1, i + 1), "max", a[dq[0]]);
}`,
    [
      "window [1, 3, -1]  max 3",
      "window [3, -1, -3] max 3   3 still in window",
      "window [-1, -3, 5] max 5   3 aged out, 5 evicted the rest",
    ],
  ),

  "largest-rectangle-histogram": run(
    "nearest shorter walls; width = R - L - 1",
    `const h = [2, 1, 5, 6, 2, 3];
const n = h.length;
const st = [-1];
let best = 0;
for (let i = 0; i <= n; i++) {
  const cur = i === n ? 0 : h[i];
  while (st.length > 1 && cur < h[st[st.length - 1]]) {
    const j = st.pop();
    const width = i - st[st.length - 1] - 1;
    const area = h[j] * width;
    best = Math.max(best, area);
    console.log("bar", h[j], "w", width, "area", area);
  }
  st.push(i);
}
console.log("best", best);`,
    [
      "bar 2  w 1  area 2    first bar, right wall is 1",
      "bar 6  w 1  area 6",
      "bar 5  w 2  area 10   bars 5,6 as height 5",
      "bar 3  w 1  area 3",
      "bar 2  w 4  area 8    [5,6,2,3] capped at 2",
      "best 10",
    ],
  ),

  "sliding-window-max": run(
    "same decreasing deque, emit from i = k-1",
    `const a = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3, dq = [], out = [];
for (let i = 0; i < a.length; i++) {
  while (dq.length && a[dq[dq.length - 1]] <= a[i]) dq.pop();
  dq.push(i);
  if (dq[0] <= i - k) dq.shift();
  if (i >= k - 1) out.push(a[dq[0]]);
}
console.log(out);`,
    [
      "[3, 3, 5, 5, 6, 7]",
      "i=2 window [1,3,-1] → 3",
      "i=4 window [-1,-3,5] → 5   3 left the window",
      "i=7 window [3,6,7] → 7",
      "n-k+1 answers, each index enters/leaves the deque once",
    ],
  ),

  "bfs-dfs-iterative": run(
    "same graph: queue is BFS, stack is DFS",
    `const g = { A: ["B", "C"], B: ["D"], C: ["E"], D: [], E: [] };

const q = ["A"], seenQ = new Set(["A"]);
while (q.length) {
  const u = q.shift();
  for (const v of g[u]) if (!seenQ.has(v)) { seenQ.add(v); q.push(v); }
}
console.log("bfs", [...seenQ]);

const st = ["A"], seenS = new Set();
while (st.length) {
  const u = st.pop();
  if (seenS.has(u)) continue;
  seenS.add(u);
  for (const v of [...g[u]].reverse()) st.push(v);
}
console.log("dfs", [...seenS]);`,
    [
      "bfs ['A', 'B', 'C', 'D', 'E']  level order — A then kids then grandkids",
      "dfs ['A', 'B', 'D', 'C', 'E']  deep first — B's chain before C",
      "queue = shortest hops; stack = explicit recursion",
      "mark BFS on enqueue or the queue explodes",
    ],
  ),

  "circular-queue": run(
    "head/tail modulo cap, size tells full vs empty",
    `const cap = 3, buf = Array(cap);
let head = 0, tail = 0, size = 0;
function enq(x) {
  if (size === cap) return console.log("full");
  buf[tail] = x;
  tail = (tail + 1) % cap;
  size++;
  console.log("enq", x, "buf", buf.slice(), { head, tail, size });
}
function deq() {
  const x = buf[head];
  head = (head + 1) % cap;
  size--;
  console.log("deq", x, { head, tail, size });
}
enq(1); enq(2); enq(3); deq(); enq(4);`,
    [
      "enq 1  buf [1, empty, empty]  { head: 0, tail: 1, size: 1 }",
      "enq 2  buf [1, 2, empty]      tail 2",
      "enq 3  buf [1, 2, 3]          size 3 — full",
      "deq 1  { head: 1, tail: 0, size: 2 }",
      "enq 4  buf [4, 2, 3]          4 wrapped into slot 0",
    ],
  ),

  "deque": run(
    "push/pop both ends — JS array can fake it",
    `const dq = [];
dq.push(2);        // back
dq.unshift(1);     // front
dq.push(3);
console.log("dq", dq.slice());
console.log("popFront", dq.shift(), "left", dq.slice());
console.log("popBack", dq.pop(), "left", dq.slice());
console.log("0-1 BFS: weight 0 unshift, weight 1 push");`,
    [
      "dq [1, 2, 3]",
      "popFront 1  left [2, 3]",
      "popBack 3   left [2]",
      "0-1 BFS: weight 0 unshift, weight 1 push",
      "shift/unshift are O(n) on a JS array — ring buffer in production",
    ],
  ),

  "heapify": run(
    "siftDown from the last parent — build is O(n)",
    `const a = [3, 9, 2, 1, 4, 5];
function down(i) {
  for (;;) {
    let l = i * 2 + 1, r = l + 1, m = i;
    if (l < a.length && a[l] > a[m]) m = l;
    if (r < a.length && a[r] > a[m]) m = r;
    if (m === i) break;
    [a[i], a[m]] = [a[m], a[i]];
    i = m;
  }
}
console.log("last parent", (a.length >> 1) - 1);
for (let i = (a.length >> 1) - 1; i >= 0; i--) {
  down(i);
  console.log("sift", i, a.slice());
}`,
    [
      "last parent 2   kids of 2 are indices 5 and 6",
      "sift 2  [3, 9, 5, 1, 4, 2]  2 swapped with 5",
      "sift 1  [3, 9, 5, 1, 4, 2]  9 already bigger than 1,4",
      "sift 0  [9, 4, 5, 1, 3, 2]  3 sank; heap property holds",
    ],
  ),

  "heap-insert-extract": run(
    "push + siftUp; swap root with last + siftDown",
    `const h = [];
function up(i) {
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (h[p] <= h[i]) break;
    [h[p], h[i]] = [h[i], h[p]];
    i = p;
  }
}
function down(i) {
  for (;;) {
    let l = i * 2 + 1, r = l + 1, m = i;
    if (l < h.length && h[l] < h[m]) m = l;
    if (r < h.length && h[r] < h[m]) m = r;
    if (m === i) break;
    [h[i], h[m]] = [h[m], h[i]];
    i = m;
  }
}
function push(x) { h.push(x); up(h.length - 1); console.log("push", x, h.slice()); }
function pop() {
  const top = h[0];
  h[0] = h.pop();
  if (h.length) down(0);
  console.log("pop", top, h.slice());
  return top;
}
push(5); push(2); push(4); pop();`,
    [
      "push 5  [5]",
      "push 2  [2, 5]     2 sifted over 5",
      "push 4  [2, 5, 4]",
      "pop 2   [4, 5]     last leaf became root, then sank",
    ],
  ),

  "top-k": run(
    "min-heap of size k — root is the kth largest",
    `const nums = [3, 1, 5, 12, 2, 11], k = 3;
const h = [];
function up(i) {
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (h[p] <= h[i]) break;
    [h[p], h[i]] = [h[i], h[p]];
    i = p;
  }
}
function down(i) {
  for (;;) {
    let l = i * 2 + 1, r = l + 1, m = i;
    if (l < h.length && h[l] < h[m]) m = l;
    if (r < h.length && h[r] < h[m]) m = r;
    if (m === i) break;
    [h[i], h[m]] = [h[m], h[i]];
    i = m;
  }
}
for (const x of nums) {
  h.push(x); up(h.length - 1);
  if (h.length > k) { h[0] = h.pop(); down(0); }
  console.log("see", x, "heap", h.slice());
}
console.log("kth", h[0]);`,
    [
      "see 3   heap [3]",
      "see 5   heap [1, 3, 5]   size hit k",
      "see 12  heap [3, 12, 5]  1 evicted — weakest winner leaves",
      "see 11  heap [5, 11, 12]",
      "kth 5   the 3 largest are 5,11,12",
    ],
  ),

  "median-stream": run(
    "max-heap low + min-heap high, sizes off by ≤ 1",
    `const low = [];  // max-heap of the lower half
const high = []; // min-heap of the upper half
const push = (h, x, max) => {
  h.push(x);
  h.sort(max ? (a, b) => b - a : (a, b) => a - b);
};
const pop = (h) => h.shift();
function add(x) {
  if (!low.length || x <= low[0]) push(low, x, true);
  else push(high, x, false);
  if (low.length > high.length + 1) push(high, pop(low), false);
  if (high.length > low.length) push(low, pop(high), true);
  const med = low.length > high.length ? low[0] : (low[0] + high[0]) / 2;
  console.log("add", x, "low", low.slice(), "high", high.slice(), "med", med);
}
add(1); add(2); add(3); add(0);`,
    [
      "add 1  low [1] high []         med 1",
      "add 2  low [1] high [2]        med 1.5",
      "add 3  low [2, 1] high [3]     med 2   2 moved down",
      "add 0  low [1, 0] high [2, 3]  med 1.5",
    ],
  ),

  "dijkstra-heap": run(
    "min-heap of [node, dist]; skip stale pops",
    `const g = { A: [["B", 2], ["C", 5]], B: [["C", 1]], C: [] };
const dist = { A: 0, B: Infinity, C: Infinity };
const heap = [["A", 0]];
while (heap.length) {
  heap.sort((x, y) => x[1] - y[1]);
  const [u, d] = heap.shift();
  if (d !== dist[u]) { console.log("stale", u, d); continue; }
  console.log("settle", u, d);
  for (const [v, w] of g[u]) {
    if (dist[u] + w < dist[v]) {
      dist[v] = dist[u] + w;
      heap.push([v, dist[v]]);
      console.log("relax", v, dist[v]);
    }
  }
}`,
    [
      "settle A 0",
      "relax B 2",
      "relax C 5",
      "settle B 2",
      "relax C 3    A→B→C beats A→C",
      "settle C 3   first pop of C is final (no negatives)",
    ],
  ),

  "huffman": run(
    "min-heap of freqs; merge the two smallest",
    `const heap = [
  { ch: "a", f: 3 }, { ch: "b", f: 4 },
  { ch: "c", f: 5 }, { ch: "d", f: 6 },
];
const byF = (x, y) => x.f - y.f;
while (heap.length > 1) {
  heap.sort(byF);
  const x = heap.shift(), y = heap.shift();
  const p = { ch: x.ch + y.ch, f: x.f + y.f, L: x, R: y };
  heap.push(p);
  console.log("merge", x.ch, "+", y.ch, "=", p.f);
}
console.log("root", heap[0].f);`,
    [
      "merge a + b = 7    rarest two become siblings",
      "merge c + d = 11",
      "merge ab + cd = 18",
      "root 18  cost = sum freq * depth; same algo as merge-files",
    ],
  ),

  "reverse-linked-list": run(
    "prev / curr / nxt — flip next, slide the window",
    `const n = (val, next = null) => ({ val, next });
let curr = n(1, n(2, n(3, n(4))));
let prev = null;
while (curr) {
  const nxt = curr.next;
  curr.next = prev;
  prev = curr;
  curr = nxt;
  console.log("head so far", prev.val, "rest", curr && curr.val);
}
const walk = [];
for (let p = prev; p; p = p.next) walk.push(p.val);
console.log("list", walk);`,
    [
      "head so far 1  rest 2",
      "head so far 2  rest 3   2 now points at 1",
      "head so far 3  rest 4",
      "head so far 4  rest null",
      "list [4, 3, 2, 1]",
    ],
  ),

  "floyd-cycle": run(
    "fast gains one per step; reset to find the entrance",
    `const n = (val) => ({ val, next: null });
const a = n(1), b = n(2), c = n(3), d = n(4);
a.next = b; b.next = c; c.next = d; d.next = b; // cycle at 2
let slow = a, fast = a;
do {
  slow = slow.next;
  fast = fast.next.next;
  console.log("step", slow.val, fast.val);
} while (slow !== fast);
let p = a;
while (p !== slow) {
  p = p.next;
  slow = slow.next;
}
console.log("entrance", p.val);`,
    [
      "step 2 3",
      "step 3 2",
      "step 4 4   they meet inside the cycle",
      "entrance 2  one pointer back at head, same speed",
    ],
  ),

  "merge-two-lists": run(
    "dummy tail; always attach the smaller head",
    `const n = (val, next = null) => ({ val, next });
const vals = (h) => { const a = []; while (h) { a.push(h.val); h = h.next; } return a; };
let a = n(1, n(3, n(5)));
let b = n(2, n(4));
const dummy = n(0);
let tail = dummy;
while (a && b) {
  if (a.val <= b.val) { tail.next = a; a = a.next; }
  else { tail.next = b; b = b.next; }
  tail = tail.next;
  console.log("took", tail.val);
}
tail.next = a || b;
console.log("merged", vals(dummy.next));`,
    [
      "took 1",
      "took 2",
      "took 3",
      "took 4   then leftover [5] spliced on",
      "merged [1, 2, 3, 4, 5]",
    ],
  ),

  "merge-k-lists": run(
    "min-heap of current heads, then push the successor",
    `const n = (val, next = null) => ({ val, next });
const vals = (h) => { const a = []; while (h) { a.push(h.val); h = h.next; } return a; };
const lists = [n(1, n(4)), n(2, n(3)), n(5)];
const heap = lists.filter(Boolean);
const dummy = n(0);
let tail = dummy;
while (heap.length) {
  heap.sort((x, y) => x.val - y.val);
  const node = heap.shift();
  tail.next = node;
  tail = node;
  if (node.next) heap.push(node.next);
  console.log("pop", node.val, "heads", heap.map((h) => h.val));
}
console.log("merged", vals(dummy.next));`,
    [
      "pop 1  heads [2, 5, 4]",
      "pop 2  heads [5, 4, 3]",
      "pop 3  heads [5, 4]",
      "pop 4  heads [5]",
      "pop 5  heads []",
      "merged [1, 2, 3, 4, 5]   N log k, not Nk",
    ],
  ),

  "middle-of-list": run(
    "fast walks 2x; when it ends, slow is mid",
    `const n = (val, next = null) => ({ val, next });
const head = n(1, n(2, n(3, n(4, n(5)))));
let slow = head, fast = head;
while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
  console.log("slow", slow.val, "fast", fast && fast.val);
}
console.log("middle", slow.val);`,
    [
      "slow 2  fast 3",
      "slow 3  fast 5   fast.next is null — stop",
      "middle 3   odd length → exact center",
      "even n: this loop lands on the second middle",
    ],
  ),

  "nth-from-end": run(
    "lead walks n ahead; trail lands on the victim",
    `const n = (val, next = null) => ({ val, next });
const vals = (h) => { const a = []; while (h) { a.push(h.val); h = h.next; } return a; };
const dummy = n(0, n(1, n(2, n(3, n(4, n(5))))));
const k = 2;
let lead = dummy, trail = dummy;
for (let i = 0; i <= k; i++) lead = lead.next;
console.log("gap set, lead", lead.val);
while (lead) {
  lead = lead.next;
  trail = trail.next;
}
console.log("delete", trail.next.val);
trail.next = trail.next.next;
console.log("list", vals(dummy.next));`,
    [
      "gap set, lead 3   dummy + n+1 steps so trail.next is the victim",
      "delete 4          trail.next is 2nd from the end",
      "list [1, 2, 3, 5]",
      "dummy saves the 'delete the real head' case",
    ],
  ),

  "list-intersection": run(
    "each pointer walks A then B; they meet on the shared node",
    `const n = (val, next = null) => ({ val, next });
const shared = n(8, n(9));
const A = n(1, n(2, shared));
const B = n(3, shared);
let p = A, q = B;
while (p !== q) {
  console.log(p ? p.val : "→B", q ? q.val : "→A");
  p = p ? p.next : B;
  q = q ? q.next : A;
}
console.log("intersect", p.val);`,
    [
      "1  3",
      "2  8",
      "8  9",
      "9  →A    q finished B, switches to A",
      "3  2     p switched onto B — the two stems cancel",
      "intersect 8   same reference, not the value",
    ],
  ),
};
