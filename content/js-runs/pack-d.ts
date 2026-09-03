import { run, type JsRun } from "./types";

export const PACK: Record<string, JsRun> = {
  "recursion-memo": run(
    "cache fib so overlapping calls skip work",
    `const memo = new Map([[0, 0], [1, 1]]);

function fib(n) {
  if (memo.has(n)) return memo.get(n);
  console.log("miss", n);
  const v = fib(n - 1) + fib(n - 2);
  memo.set(n, v);
  return v;
}

console.log("fib(6)", fib(6));
console.log("cached keys", [...memo.keys()]);`,
    [
      "miss 6",
      "miss 5",
      "miss 4",
      "miss 3",
      "miss 2",
      "fib(6) 8   cached keys [0, 1, 2, 3, 4, 5, 6]",
    ],
  ),
  subsets: run(
    "include or skip each number",
    `const nums = [1, 2, 3];
const path = [];

function dfs(i) {
  if (i === nums.length) {
    console.log([...path]);
    return;
  }
  dfs(i + 1);
  path.push(nums[i]);
  dfs(i + 1);
  path.pop();
}

dfs(0);`,
    [
      "[]",
      "[3]",
      "[2]",
      "[2, 3]",
      "[1]  then [1,3] [1,2] [1,2,3]  — 8 = 2^3",
    ],
  ),
  permutations: run(
    "swap, recurse, swap back",
    `const a = ["A", "B", "C"];

function perm(i) {
  if (i === a.length) {
    console.log(a.join(""));
    return;
  }
  for (let j = i; j < a.length; j++) {
    [a[i], a[j]] = [a[j], a[i]];
    perm(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
}

perm(0);`,
    [
      "ABC",
      "ACB",
      "BAC",
      "BCA",
      "CBA  CAB  — 6 = 3!",
    ],
  ),
  combinations: run(
    "choose 2, only walk forward",
    `const n = 4, k = 2;
const path = [];

function dfs(start) {
  if (path.length === k) {
    console.log([...path]);
    return;
  }
  for (let x = start; x <= n; x++) {
    path.push(x);
    dfs(x + 1);
    path.pop();
  }
}

dfs(1);`,
    [
      "[1, 2]",
      "[1, 3]",
      "[1, 4]",
      "[2, 3]",
      "[2, 4]  [3, 4]  — C(4,2) = 6",
    ],
  ),
  "n-queens": run(
    "place 4 queens, one per row",
    `const n = 4;
const col = [], diag = [], anti = [];

function dfs(r) {
  if (r === n) {
    console.log("board", col.slice());
    return;
  }
  for (let c = 0; c < n; c++) {
    if (col.includes(c) || diag.includes(r - c) || anti.includes(r + c)) continue;
    col.push(c); diag.push(r - c); anti.push(r + c);
    console.log("try row", r, "col", c);
    dfs(r + 1);
    col.pop(); diag.pop(); anti.pop();
  }
}

dfs(0);`,
    [
      "try row 0 col 0  … later clashes, backtrack",
      "try row 0 col 1",
      "try row 1 col 3",
      "try row 2 col 0",
      "try row 3 col 2",
      "board [1, 3, 0, 2]   one of two solutions for n=4",
    ],
  ),
  "sudoku-solver": run(
    "try a digit, undo on clash",
    `const box = [
  [5, 3, 0],
  [6, 0, 0],
  [0, 9, 8],
];

function ok(r, c, d) {
  for (let i = 0; i < 3; i++) {
    if (box[r][i] === d || box[i][c] === d) return false;
  }
  return true;
}

function solve() {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (box[r][c] !== 0) continue;
      for (const d of [1, 2, 4, 7]) {
        if (!ok(r, c, d)) {
          console.log("skip", d, "at", r, c);
          continue;
        }
        box[r][c] = d;
        console.log("place", d, "at", r, c);
        if (solve()) return true;
        box[r][c] = 0;
      }
      return false;
    }
  }
  return true;
}

solve();
console.log("done", box.flat());`,
    [
      "skip 1 at 0 2   row already has 5,3 — try next",
      "place 4 at 0 2",
      "place 2 at 1 1",
      "place 7 at 1 2",
      "place 1 at 2 0",
      "done [5, 3, 4, 6, 2, 7, 1, 9, 8]",
    ],
  ),
  "word-search": run(
    "walk neighbors, mark the cell used",
    `const g = [
  ["A", "B"],
  ["C", "D"],
];
const word = "ABD";
const seen = new Set();

function dfs(r, c, i) {
  if (i === word.length) return true;
  const key = r + "," + c;
  if (r < 0 || r > 1 || c < 0 || c > 1 || seen.has(key) || g[r][c] !== word[i]) {
    return false;
  }
  seen.add(key);
  console.log("use", g[r][c], "at", r, c);
  const ok =
    dfs(r + 1, c, i + 1) ||
    dfs(r - 1, c, i + 1) ||
    dfs(r, c + 1, i + 1) ||
    dfs(r, c - 1, i + 1);
  if (!ok) {
    seen.delete(key);
    console.log("back", g[r][c]);
  }
  return ok;
}

console.log("found", dfs(0, 0, 0));`,
    [
      "use A at 0 0",
      "use B at 0 1",
      "use D at 1 1",
      "found true   A→B→D, C unused",
    ],
  ),
  "generate-parentheses": run(
    "open if leftover, close if it stays valid",
    `function gen(open, close, s) {
  if (open === 0 && close === 0) {
    console.log(s);
    return;
  }
  if (open > 0) gen(open - 1, close, s + "(");
  if (close > open) gen(open, close - 1, s + ")");
}

gen(3, 3, "");`,
    [
      "((()))",
      "(()())",
      "(())()",
      "()(())",
      "()()()   Catalan C_3 = 5",
    ],
  ),
  "divide-and-conquer": run(
    "split the array, merge the halves",
    `function mergeSort(a) {
  if (a.length <= 1) return a;
  const mid = Math.floor(a.length / 2);
  console.log("split", a, "→", a.slice(0, mid), a.slice(mid));
  const L = mergeSort(a.slice(0, mid));
  const R = mergeSort(a.slice(mid));
  const out = [];
  let i = 0, j = 0;
  while (i < L.length && j < R.length) {
    out.push(L[i] <= R[j] ? L[i++] : R[j++]);
  }
  const merged = out.concat(L.slice(i), R.slice(j));
  console.log("merge", L, R, "→", merged);
  return merged;
}

mergeSort([4, 1, 3, 2]);`,
    [
      "split [4, 1, 3, 2] → [4, 1] [3, 2]",
      "split [4, 1] → [4] [1]",
      "merge [4] [1] → [1, 4]",
      "split [3, 2] → [3] [2]",
      "merge [3] [2] → [2, 3]",
      "merge [1, 4] [2, 3] → [1, 2, 3, 4]",
    ],
  ),
  "closest-pair": run(
    "sort by x, check the midline strip",
    `const pts = [
  [0, 0], [1, 5], [2, 1], [3, 4], [4, 2],
];
const byX = [...pts].sort((a, b) => a[0] - b[0]);
const mid = byX[Math.floor(byX.length / 2)][0];

function dist(p, q) {
  return Math.hypot(p[0] - q[0], p[1] - q[1]);
}

let best = Infinity, pair = null;
for (let i = 0; i < byX.length; i++) {
  for (let j = i + 1; j < byX.length && byX[j][0] - byX[i][0] < best; j++) {
    const d = dist(byX[i], byX[j]);
    if (d < best) {
      best = d;
      pair = [byX[i], byX[j]];
      console.log("better", pair, d.toFixed(2));
    }
  }
}
console.log("mid x", mid, "best", pair, best.toFixed(2));`,
    [
      "better [[0, 0], [1, 5]] 5.10",
      "better [[0, 0], [2, 1]] 2.24",
      "better [[2, 1], [4, 2]] 2.24  (tie, later pair)",
      "mid x 2  best [[2, 1], [4, 2]] 2.24",
    ],
  ),
  "fibonacci-dp": run(
    "two rolling variables, no table",
    `let a = 0, b = 1;
console.log("F0", a, "F1", b);

for (let i = 2; i <= 6; i++) {
  const c = a + b;
  console.log("F" + i, c);
  a = b;
  b = c;
}`,
    [
      "F0 0  F1 1",
      "F2 1",
      "F3 2",
      "F4 3",
      "F5 5",
      "F6 8",
    ],
  ),
  "climbing-stairs": run(
    "last step is 1 or 2",
    `const n = 5;
let prev = 1, cur = 1;

for (let i = 2; i <= n; i++) {
  const next = prev + cur;
  console.log("step", i, "ways", next, "=", cur, "+", prev);
  prev = cur;
  cur = next;
}
console.log("top", cur);`,
    [
      "step 2 ways 2 = 1 + 1",
      "step 3 ways 3 = 2 + 1",
      "step 4 ways 5 = 3 + 2",
      "step 5 ways 8 = 5 + 3",
      "top 8   Fibonacci in disguise",
    ],
  ),
  "house-robber": run(
    "take this house or skip it",
    `const cash = [2, 7, 9, 3, 1];
let skip = 0, take = 0;

for (const x of cash) {
  const nextTake = skip + x;
  const nextSkip = Math.max(skip, take);
  console.log("house", x, "take", nextTake, "skip", nextSkip);
  take = nextTake;
  skip = nextSkip;
}
console.log("best", Math.max(take, skip));`,
    [
      "house 2  take 2  skip 0",
      "house 7  take 7  skip 2",
      "house 9  take 11 skip 7",
      "house 3  take 10 skip 11",
      "house 1  take 12 skip 11",
      "best 12   2+9+1",
    ],
  ),
  "decode-ways": run(
    "one digit or a valid pair",
    `const s = "226";
const dp = Array(s.length + 1).fill(0);
dp[0] = 1;

for (let i = 1; i <= s.length; i++) {
  if (s[i - 1] !== "0") dp[i] += dp[i - 1];
  if (i >= 2) {
    const two = Number(s.slice(i - 2, i));
    if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
  }
  console.log("prefix", s.slice(0, i), "ways", dp[i]);
}`,
    [
      "prefix 2   ways 1     B",
      "prefix 22  ways 2     BB or V",
      "prefix 226 ways 3     BB F, V F, B Z",
    ],
  ),
  "knapsack-01": run(
    "each item once: take or leave",
    `const w = [2, 3, 3], v = [3, 4, 5], cap = 6;
const dp = Array(cap + 1).fill(0);

for (let i = 0; i < w.length; i++) {
  for (let c = cap; c >= w[i]; c--) {
    dp[c] = Math.max(dp[c], dp[c - w[i]] + v[i]);
  }
  console.log("after item", i, "w" + w[i], "dp", [...dp]);
}
console.log("best", dp[cap]);`,
    [
      "after item 0 w2  dp [0, 0, 3, 3, 3, 3, 3]",
      "after item 1 w3  dp [0, 0, 3, 4, 4, 7, 7]",
      "after item 2 w3  dp [0, 0, 3, 5, 5, 8, 9]",
      "best 9   items 0+2 (2+3 weight, 3+5 value)",
    ],
  ),
  "unbounded-knapsack": run(
    "reuse any item, walk capacity forward",
    `const w = [2, 3], v = [4, 5], cap = 7;
const dp = Array(cap + 1).fill(0);

for (let i = 0; i < w.length; i++) {
  for (let c = w[i]; c <= cap; c++) {
    dp[c] = Math.max(dp[c], dp[c - w[i]] + v[i]);
  }
  console.log("after w" + w[i], [...dp]);
}
console.log("best", dp[cap]);`,
    [
      "after w2  [0, 0, 4, 4, 8, 8, 12, 12]",
      "after w3  [0, 0, 4, 5, 8, 9, 12, 13]",
      "best 13   three 2-weights leftover 1 unused, or 2+3+2",
    ],
  ),
  "coin-change": run(
    "fewest coins for the amount",
    `const coins = [1, 2, 5], amount = 6;
const INF = 99;
const dp = Array(amount + 1).fill(INF);
dp[0] = 0;

for (const coin of coins) {
  for (let a = coin; a <= amount; a++) {
    dp[a] = Math.min(dp[a], dp[a - coin] + 1);
  }
  console.log("after", coin, dp.slice(0, 7));
}
console.log("coins for 6", dp[6]);`,
    [
      "after 1  [0, 1, 2, 3, 4, 5, 6]",
      "after 2  [0, 1, 1, 2, 2, 3, 3]",
      "after 5  [0, 1, 1, 2, 2, 1, 2]",
      "coins for 6  2    5+1",
    ],
  ),
  lis: run(
    "tails: smallest end of each length",
    `const nums = [10, 9, 2, 5, 3, 7];
const tails = [];

for (const x of nums) {
  let lo = 0, hi = tails.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (tails[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  tails[lo] = x;
  console.log("place", x, "→", [...tails]);
}
console.log("LIS length", tails.length);`,
    [
      "place 10 → [10]",
      "place 9  → [9]",
      "place 2  → [2]",
      "place 5  → [2, 5]",
      "place 3  → [2, 3]",
      "place 7  → [2, 3, 7]   LIS length 3",
    ],
  ),
  lcs: run(
    "match a letter or drop one side",
    `const A = "ace", B = "abcde";
const m = A.length, n = B.length;
const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

for (let i = 1; i <= m; i++) {
  for (let j = 1; j <= n; j++) {
    dp[i][j] =
      A[i - 1] === B[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
  }
  console.log("after", A[i - 1], dp[i]);
}
console.log("LCS", dp[m][n]);`,
    [
      "after a  [0, 1, 1, 1, 1, 1]",
      "after c  [0, 1, 1, 2, 2, 2]",
      "after e  [0, 1, 1, 2, 2, 3]",
      "LCS 3   ace",
    ],
  ),
  "edit-distance": run(
    "insert, delete, or replace",
    `const A = "cat", B = "cut";
const m = A.length, n = B.length;
const dp = Array.from({ length: m + 1 }, (_, i) =>
  Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
);

for (let i = 1; i <= m; i++) {
  for (let j = 1; j <= n; j++) {
    if (A[i - 1] === B[j - 1]) dp[i][j] = dp[i - 1][j - 1];
    else {
      dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  console.log("row", A.slice(0, i), dp[i]);
}
console.log("edits", dp[m][n]);`,
    [
      "row c  [1, 0, 1, 2]",
      "row ca [2, 1, 1, 2]",
      "row cat [3, 2, 2, 1]",
      "edits 1   replace a→u",
    ],
  ),
  "palindrome-dp": run(
    "every substring: ends match and inside is pal",
    `const s = "abba";
const n = s.length;
const pal = Array.from({ length: n }, () => Array(n).fill(false));

for (let i = 0; i < n; i++) pal[i][i] = true;
for (let len = 2; len <= n; len++) {
  for (let i = 0; i + len - 1 < n; i++) {
    const j = i + len - 1;
    pal[i][j] = s[i] === s[j] && (len === 2 || pal[i + 1][j - 1]);
    console.log(s.slice(i, j + 1), pal[i][j]);
  }
}`,
    [
      "ab false",
      "bb true",
      "ba false",
      "abb false",
      "bba false",
      "abba true   ends match and bb inside",
    ],
  ),
  "matrix-chain": run(
    "try every last split of the chain",
    `const p = [10, 20, 30, 40];
const n = p.length - 1;
const dp = Array.from({ length: n }, () => Array(n).fill(0));

for (let len = 2; len <= n; len++) {
  for (let i = 0; i + len - 1 < n; i++) {
    const j = i + len - 1;
    dp[i][j] = Infinity;
    for (let k = i; k < j; k++) {
      const cost = dp[i][k] + dp[k + 1][j] + p[i] * p[k + 1] * p[j + 1];
      dp[i][j] = Math.min(dp[i][j], cost);
    }
    console.log("A" + i + "..A" + j, dp[i][j]);
  }
}`,
    [
      "A0..A1 6000     10×20×30",
      "A1..A2 24000    20×30×40",
      "A0..A2 18000    (A0 A1)A2 cheaper than A0(A1 A2)",
    ],
  ),
  "burst-balloons": run(
    "pick the last balloon in a range",
    `const nums = [3, 1, 5];
const a = [1, ...nums, 1];
const n = nums.length;
const dp = Array.from({ length: n }, () => Array(n).fill(0));

for (let len = 1; len <= n; len++) {
  for (let i = 0; i + len - 1 < n; i++) {
    const j = i + len - 1;
    for (let k = i; k <= j; k++) {
      const left = k > i ? dp[i][k - 1] : 0;
      const right = k < j ? dp[k + 1][j] : 0;
      const coins = a[i] * a[k + 1] * a[j + 2] + left + right;
      dp[i][j] = Math.max(dp[i][j], coins);
    }
    console.log("range", nums.slice(i, j + 1), "best", dp[i][j]);
  }
}`,
    [
      "range [3] best 3      1*3*1",
      "range [1] best 5      3*1*5 wait — neighbors are padded",
      "range [5] best 5",
      "range [3, 1] best 30",
      "range [1, 5] best 30",
      "range [3, 1, 5] best 45   burst 1 last between 3 and 5",
    ],
  ),
  "grid-dp": run(
    "only right and down",
    `const grid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
];
const h = grid.length, w = grid[0].length;
const dp = grid.map((row) => row.slice());

for (let r = 0; r < h; r++) {
  for (let c = 0; c < w; c++) {
    if (r === 0 && c === 0) continue;
    const up = r ? dp[r - 1][c] : Infinity;
    const left = c ? dp[r][c - 1] : Infinity;
    dp[r][c] += Math.min(up, left);
    console.log(r, c, "→", dp[r][c]);
  }
}`,
    [
      "0 1 → 4     1+3",
      "0 2 → 5     4+1",
      "1 0 → 2     1+1",
      "1 1 → 7     2+5",
      "1 2 → 6     5+1",
      "2 2 → 7     path 1-3-1-1-1",
    ],
  ),
  "interval-dp": run(
    "min cuts so every piece is a palindrome",
    `const s = "aab";
const n = s.length;
const pal = (i, j) => s.slice(i, j + 1) === [...s.slice(i, j + 1)].reverse().join("");
const cuts = Array(n).fill(n);

for (let i = 0; i < n; i++) {
  if (pal(0, i)) {
    cuts[i] = 0;
  } else {
    for (let j = 0; j < i; j++) {
      if (pal(j + 1, i)) cuts[i] = Math.min(cuts[i], cuts[j] + 1);
    }
  }
  console.log("prefix", s.slice(0, i + 1), "cuts", cuts[i]);
}`,
    [
      "prefix a   cuts 0    already a palindrome",
      "prefix aa  cuts 0    aa",
      "prefix aab cuts 1    aa | b",
    ],
  ),
  "bitmask-dp": run(
    "TSP: visit each city once, 4 nodes",
    `const d = [
  [0, 10, 15, 20],
  [10, 0, 35, 25],
  [15, 35, 0, 30],
  [20, 25, 30, 0],
];
const n = 4, FULL = (1 << n) - 1;
const dp = Array.from({ length: 1 << n }, () => Array(n).fill(Infinity));
dp[1][0] = 0;

for (let mask = 1; mask <= FULL; mask++) {
  for (let u = 0; u < n; u++) {
    if (!(mask & (1 << u)) || dp[mask][u] === Infinity) continue;
    for (let v = 0; v < n; v++) {
      if (mask & (1 << v)) continue;
      const nxt = mask | (1 << v);
      dp[nxt][v] = Math.min(dp[nxt][v], dp[mask][u] + d[u][v]);
    }
  }
}

for (let u = 1; u < n; u++) {
  console.log("end at", u, "tour", dp[FULL][u] + d[u][0]);
}
console.log("best", Math.min(...dp[FULL].map((c, u) => c + d[u][0])));`,
    [
      "end at 1 tour 80",
      "end at 2 tour 75",
      "end at 3 tour 80",
      "best 75   0-1-3-2-0 = 10+25+30+15",
    ],
  ),
  "tree-dp": run(
    "house-robber on a tree: take node or kids",
    `const tree = { val: 3, kids: [
  { val: 2, kids: [{ val: 3, kids: [] }] },
  { val: 3, kids: [{ val: 1, kids: [] }] },
]};

function rob(node) {
  if (!node.kids.length) {
    console.log("leaf", node.val, "take", node.val, "skip", 0);
    return [node.val, 0];
  }
  let take = node.val, skip = 0;
  for (const kid of node.kids) {
    const [t, s] = rob(kid);
    take += s;
    skip += Math.max(t, s);
  }
  console.log("node", node.val, "take", take, "skip", skip);
  return [take, skip];
}

const [t, s] = rob(tree);
console.log("best", Math.max(t, s));`,
    [
      "leaf 3 take 3 skip 0",
      "node 2 take 2 skip 3",
      "leaf 1 take 1 skip 0",
      "node 3 take 3 skip 1",
      "node 3 take 7 skip 6",
      "best 7   root + two leaves 3 and 1",
    ],
  ),
  "digit-dp": run(
    "count numbers ≤ 23 with no digit 3",
    `const digits = [2, 3];

function dfs(i, tight, started) {
  if (i === digits.length) return started ? 1 : 1;
  const cap = tight ? digits[i] : 9;
  let ways = 0;
  for (let d = 0; d <= cap; d++) {
    if (d === 3) continue;
    ways += dfs(i + 1, tight && d === cap, started || d > 0);
  }
  console.log("pos", i, "tight", tight, "cap", cap, "ways from here", ways);
  return ways;
}

console.log("count", dfs(0, true, false));`,
    [
      "pos 1 tight true  cap 3  ways from here 3   digits 0,1,2 (skip 3)",
      "pos 1 tight false cap 9  ways from here 9",
      "pos 0 tight true  cap 2  ways from here 21",
      "count 21   0..23 minus 3,13,23",
    ],
  ),
};
