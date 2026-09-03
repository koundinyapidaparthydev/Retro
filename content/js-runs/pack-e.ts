import { run, type JsRun } from "./types";

export const PACK: Record<string, JsRun> = {
  "interval-scheduling": run(
    "always take the job that ends first",
    `const jobs = [[1, 4], [2, 3], [3, 5], [5, 7]];
jobs.sort((a, b) => a[1] - b[1]);
let end = -Infinity, taken = 0;

for (const [s, e] of jobs) {
  if (s >= end) {
    taken++;
    end = e;
    console.log("take", [s, e], "end", end);
  } else {
    console.log("skip", [s, e], "overlaps", end);
  }
}
console.log("count", taken);`,
    [
      "take [2, 3]  end 3",
      "skip [1, 4]  overlaps 3",
      "skip [3, 5]  overlaps 3",
      "take [5, 7]  end 7",
      "count 2",
    ],
  ),
  "jump-game": run(
    "farthest index reachable so far",
    `const A = [2, 3, 1, 1, 4];
let far = 0;

for (let i = 0; i < A.length; i++) {
  if (i > far) {
    console.log("stuck at", i);
    break;
  }
  far = Math.max(far, i + A[i]);
  console.log("i", i, "far", far);
  if (far >= A.length - 1) {
    console.log("can reach end");
    break;
  }
}`,
    [
      "i 0 far 2",
      "i 1 far 4",
      "can reach end   1 + A[1]=3 lands on last index",
    ],
  ),
  "gas-station": run(
    "if the tank goes negative, start after here",
    `const gas = [1, 2, 3, 4, 5];
const cost = [3, 4, 5, 1, 2];
let tank = 0, total = 0, start = 0;

for (let i = 0; i < gas.length; i++) {
  const d = gas[i] - cost[i];
  tank += d;
  total += d;
  console.log("i", i, "delta", d, "tank", tank);
  if (tank < 0) {
    start = i + 1;
    tank = 0;
    console.log("reset start", start);
  }
}
console.log("start", total >= 0 ? start : -1);`,
    [
      "i 0 delta -2  tank -2",
      "reset start 1",
      "i 1 delta -2  tank -2",
      "reset start 2",
      "i 3 delta 3   tank 1   (after i=2 also reset)",
      "start 3   only station 3 finishes a lap",
    ],
  ),
  "fractional-knapsack": run(
    "value / weight, take a fraction of the last",
    `const items = [
  { w: 10, v: 60 },
  { w: 20, v: 100 },
  { w: 30, v: 120 },
];
items.sort((a, b) => b.v / b.w - a.v / a.w);
let cap = 50, worth = 0;

for (const { w, v } of items) {
  const take = Math.min(w, cap);
  worth += (v / w) * take;
  cap -= take;
  console.log("take", take, "/", w, "ratio", v / w, "left", cap);
}
console.log("worth", worth);`,
    [
      "take 10 / 10  ratio 6  left 40",
      "take 20 / 20  ratio 5  left 20",
      "take 20 / 30  ratio 4  left 0    fraction of the last",
      "worth 240",
    ],
  ),
  "meeting-rooms": run(
    "sweep starts and ends, track rooms in use",
    `const meetings = [[0, 30], [5, 10], [15, 20]];
const start = meetings.map((m) => m[0]).sort((a, b) => a - b);
const end = meetings.map((m) => m[1]).sort((a, b) => a - b);
let i = 0, j = 0, used = 0, rooms = 0;

while (i < start.length) {
  if (start[i] < end[j]) {
    used++;
    rooms = Math.max(rooms, used);
    console.log("start", start[i], "used", used);
    i++;
  } else {
    used--;
    console.log("end", end[j], "used", used);
    j++;
  }
}
console.log("rooms", rooms);`,
    [
      "start 0  used 1",
      "start 5  used 2",
      "end 10  used 1",
      "start 15 used 2",
      "rooms 2   two overlap at a time",
    ],
  ),
  candy: run(
    "two slopes: left-to-right then right-to-left",
    `const r = [1, 0, 2];
const c = r.map(() => 1);

for (let i = 1; i < r.length; i++) {
  if (r[i] > r[i - 1]) c[i] = c[i - 1] + 1;
}
console.log("after L→R", [...c]);

for (let i = r.length - 2; i >= 0; i--) {
  if (r[i] > r[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1);
}
console.log("after R→L", [...c]);
console.log("total", c.reduce((a, b) => a + b));`,
    [
      "after L→R [1, 1, 2]   2 > 0 so last gets 2",
      "after R→L [2, 1, 2]   1 > 0 so first also 2",
      "total 5",
    ],
  ),
  "assign-cookies": run(
    "smallest cookie that satisfies the greediest leftover kid",
    `const kids = [1, 2, 3], cookies = [1, 1];
kids.sort((a, b) => a - b);
cookies.sort((a, b) => a - b);
let i = 0, fed = 0;

for (const cookie of cookies) {
  if (i < kids.length && cookie >= kids[i]) {
    console.log("give", cookie, "to kid", kids[i]);
    i++;
    fed++;
  } else {
    console.log("cookie", cookie, "too small or leftover");
  }
}
console.log("fed", fed);`,
    [
      "give 1 to kid 1",
      "cookie 1 too small or leftover   next kid wants 2",
      "fed 1",
    ],
  ),
  "greedy-mst": run(
    "sort edges, union if it does not cycle",
    `const edges = [
  [0, 1, 1], [0, 2, 4], [1, 2, 2], [1, 3, 6], [2, 3, 3],
];
edges.sort((a, b) => a[2] - b[2]);
const p = [0, 1, 2, 3];
const find = (x) => (p[x] === x ? x : (p[x] = find(p[x])));
let cost = 0;

for (const [u, v, w] of edges) {
  const a = find(u), b = find(v);
  if (a === b) {
    console.log("skip", u, v, "cycle");
    continue;
  }
  p[a] = b;
  cost += w;
  console.log("take", u, "-", v, "w", w);
}
console.log("MST", cost);`,
    [
      "take 0 - 1  w 1",
      "take 1 - 2  w 2",
      "take 2 - 3  w 3",
      "skip 0 2 cycle",
      "skip 1 3 cycle",
      "MST 6",
    ],
  ),
  kmp: run(
    "prefix table, slide the pattern not the text",
    `const text = "ababcab", pat = "abc";
const lps = [0, 0, 0];
let i = 1, len = 0;
while (i < pat.length) {
  if (pat[i] === pat[len]) lps[i++] = ++len;
  else if (len) len = lps[len - 1];
  else lps[i++] = 0;
}
console.log("lps", lps);

let t = 0, p = 0;
while (t < text.length) {
  if (text[t] === pat[p]) {
    t++;
    p++;
    if (p === pat.length) {
      console.log("hit at", t - p);
      p = lps[p - 1];
    }
  } else if (p) {
    console.log("mismatch at", t, "fall to", lps[p - 1]);
    p = lps[p - 1];
  } else t++;
}`,
    [
      "lps [0, 0, 0]",
      "mismatch at 2  fall to 0   'aba' vs 'abc'",
      "hit at 2   text[2..4] = abc",
    ],
  ),
  "rabin-karp": run(
    "rolling hash of a window",
    `const text = "abracadabra", pat = "ada";
const BASE = 256, MOD = 101;
const n = pat.length;
let ph = 0, th = 0, pow = 1;

for (let i = 0; i < n; i++) {
  ph = (ph * BASE + pat.charCodeAt(i)) % MOD;
  th = (th * BASE + text.charCodeAt(i)) % MOD;
  if (i) pow = (pow * BASE) % MOD;
}
console.log("pattern hash", ph, "window0", th, text.slice(0, n));

for (let i = 0; i + n <= text.length; i++) {
  if (th === ph && text.slice(i, i + n) === pat) {
    console.log("hit", i, text.slice(i, i + n));
  }
  if (i + n < text.length) {
    th = (th - text.charCodeAt(i) * pow) % MOD;
    if (th < 0) th += MOD;
    th = (th * BASE + text.charCodeAt(i + n)) % MOD;
    console.log("roll to", text.slice(i + 1, i + 1 + n), th);
  }
}`,
    [
      "pattern hash 4  window0 abr  17",
      "roll to bra  53",
      "roll to rac  86",
      "hit 5 ada",
      "roll to dab  …",
    ],
  ),
  "z-algorithm": run(
    "Z[i] = longest prefix match starting at i",
    `const s = "aabcaab";
const z = Array(s.length).fill(0);
let L = 0, R = 0;

for (let i = 1; i < s.length; i++) {
  if (i < R) z[i] = Math.min(R - i, z[i - L]);
  while (i + z[i] < s.length && s[z[i]] === s[i + z[i]]) z[i]++;
  if (i + z[i] > R) {
    L = i;
    R = i + z[i];
  }
  console.log("i", i, "Z", z[i], "box", [L, R]);
}`,
    [
      "i 1 Z 1  box [1, 2]    aa… matches a",
      "i 2 Z 0  box [1, 2]",
      "i 3 Z 0  box [1, 2]",
      "i 4 Z 3  box [4, 7]    aab == prefix aab",
      "i 5 Z 1  box [4, 7]",
      "i 6 Z 0  box [4, 7]",
    ],
  ),
  manacher: run(
    "odd palindromes: expand, then copy inside the box",
    `const s = "abaaba";
const p = Array(s.length).fill(0);
let c = 0, r = 0;

for (let i = 0; i < s.length; i++) {
  const mirror = 2 * c - i;
  if (i < r) p[i] = Math.min(r - i, p[mirror]);
  while (s[i - p[i] - 1] && s[i - p[i] - 1] === s[i + p[i] + 1]) p[i]++;
  if (i + p[i] > r) {
    c = i;
    r = i + p[i];
  }
  console.log("center", i, s[i], "rad", p[i], "box", [c, r]);
}`,
    [
      "center 0 a rad 0  box [0, 0]",
      "center 1 b rad 1  box [1, 2]   aba",
      "center 2 a rad 0  box [1, 2]",
      "center 3 a rad 2  box [3, 5]   baaba b — wait, abaaba from i=3",
      "center 4 b rad 1  box [3, 5]",
      "center 5 a rad 0  box [3, 5]",
    ],
  ),
  "trie-search": run(
    "walk one child per letter",
    `const root = {};
for (const w of ["app", "apple", "bat"]) {
  let node = root;
  for (const ch of w) {
    node[ch] ??= {};
    node = node[ch];
  }
  node.$ = true;
}

function has(word) {
  let node = root;
  for (const ch of word) {
    if (!node[ch]) {
      console.log("miss", word, "at", ch);
      return false;
    }
    node = node[ch];
    console.log("step", ch, "end?", Boolean(node.$));
  }
  return Boolean(node.$);
}

console.log("apple", has("apple"));
console.log("apt", has("apt"));`,
    [
      "step a end? false",
      "step p end? false",
      "step p end? true    'app' lives here",
      "step l end? false",
      "step e end? true",
      "apple true   apt misses at t",
    ],
  ),
  "sliding-window-strings": run(
    "shrink when a needed count goes extra",
    `const s = "ADOBECODEBANC", t = "ABC";
const need = { A: 1, B: 1, C: 1 };
let missing = 3, L = 0, best = "";

for (let R = 0; R < s.length; R++) {
  if (need[s[R]] !== undefined) {
    if (need[s[R]] > 0) missing--;
    need[s[R]]--;
  }
  while (missing === 0) {
    const win = s.slice(L, R + 1);
    if (!best || win.length < best.length) {
      best = win;
      console.log("best", best);
    }
    if (need[s[L]] !== undefined) {
      need[s[L]]++;
      if (need[s[L]] > 0) missing++;
    }
    L++;
  }
}
console.log("answer", best);`,
    [
      "best ADOBEC",
      "best CODEBA   shorter? no, same 6 — keep first",
      "best BANC",
      "answer BANC",
    ],
  ),
  "suffix-array": run(
    "sort every suffix, then the string is searchable",
    `const s = "banana";
const sa = [...s.keys()].sort((i, j) => (s.slice(i) < s.slice(j) ? -1 : 1));

for (const i of sa) {
  console.log(i, s.slice(i));
}`,
    [
      "5 a",
      "3 ana",
      "1 anana",
      "0 banana",
      "4 na",
      "2 nana",
    ],
  ),
  "suffix-tree": run(
    "compressed trie of suffixes — edges are slices",
    `const s = "banana$";
const tree = { children: {} };

function insert(i) {
  let node = tree;
  let k = i;
  while (k < s.length) {
    const ch = s[k];
    if (!node.children[ch]) {
      node.children[ch] = { edge: s.slice(k), children: {} };
      console.log("leaf", s.slice(i), "via", s.slice(k));
      return;
    }
    const edge = node.children[ch].edge;
    let m = 0;
    while (m < edge.length && s[k + m] === edge[m]) m++;
    k += m;
    node = node.children[ch];
  }
}

for (let i = 0; i < s.length; i++) insert(i);`,
    [
      "leaf banana$ via banana$",
      "leaf anana$  via anana$",
      "leaf nana$   via nana$",
      "leaf ana$    via ana$     shares 'a' then splits",
      "leaf na$     via na$",
      "leaf a$      via a$       and $ as its own leaf",
    ],
  ),
  "aho-corasick": run(
    "trie plus failure links, emit every hit",
    `const words = ["he", "she", "his", "hers"];
const root = { next: {}, fail: null, out: [] };

for (const w of words) {
  let n = root;
  for (const ch of w) {
    n.next[ch] ??= { next: {}, fail: null, out: [] };
    n = n.next[ch];
  }
  n.out.push(w);
}

const q = [];
for (const ch of Object.keys(root.next)) {
  root.next[ch].fail = root;
  q.push(root.next[ch]);
}
while (q.length) {
  const cur = q.shift();
  for (const [ch, nxt] of Object.entries(cur.next)) {
    let f = cur.fail;
    while (f && !f.next[ch]) f = f.fail;
    nxt.fail = (f && f.next[ch]) || root;
    nxt.out = nxt.out.concat(nxt.fail.out);
    q.push(nxt);
  }
}

const text = "ushers";
let node = root;
console.log("scan", text);
for (let i = 0; i < text.length; i++) {
  while (node && !node.next[text[i]]) node = node.fail;
  node = (node && node.next[text[i]]) || root;
  if (node.out.length) console.log("at", i, node.out);
}`,
    [
      "scan ushers",
      "at 3 ['she', 'he']   …she",
      "at 5 ['hers']        ushers",
    ],
  ),
  "bit-set-unset-toggle": run(
    "OR sets, AND-NOT clears, XOR flips",
    `let n = 0b0101;
console.log("start", n.toString(2).padStart(4, "0"));

n |= 1 << 1;
console.log("set bit1", n.toString(2).padStart(4, "0"));

n &= ~(1 << 2);
console.log("clear bit2", n.toString(2).padStart(4, "0"));

n ^= 1 << 0;
console.log("toggle bit0", n.toString(2).padStart(4, "0"));`,
    [
      "start 0101",
      "set bit1  0111",
      "clear bit2 0011",
      "toggle bit0 0010",
    ],
  ),
  "count-bits": run(
    "n & 1 then shift, or popcount table",
    `function bits(n) {
  let c = 0;
  const steps = [];
  while (n) {
    steps.push((n & 1) + " from " + n.toString(2));
    c += n & 1;
    n >>>= 1;
  }
  console.log(steps.join(" | "));
  return c;
}

console.log("pop 13", bits(13));
console.log("pop 7", bits(7));
console.log("pop 8", bits(8));`,
    [
      "1 from 1101 | 0 from 110 | 1 from 11 | 1 from 1",
      "pop 13 3",
      "1 from 111 | 1 from 11 | 1 from 1",
      "pop 7 3",
      "0 from 1000 | 0 from 100 | 0 from 10 | 1 from 1",
      "pop 8 1",
    ],
  ),
  "xor-tricks": run(
    "pairs cancel, the loner remains",
    `const nums = [4, 1, 2, 1, 2];
let x = 0;

for (const n of nums) {
  x ^= n;
  console.log("xor", n, "→", x);
}
console.log("single", x);`,
    [
      "xor 4 → 4",
      "xor 1 → 5",
      "xor 2 → 7",
      "xor 1 → 6    1 cancelled",
      "xor 2 → 4    2 cancelled",
      "single 4",
    ],
  ),
  "bitmask-subsets": run(
    "every mask from 0 to 2^n - 1",
    `const items = ["a", "b", "c"];
const n = items.length;

for (let mask = 0; mask < 1 << n; mask++) {
  const sub = items.filter((_, i) => mask & (1 << i));
  console.log(mask.toString(2).padStart(n, "0"), sub);
}`,
    [
      "000 []",
      "001 ['a']",
      "010 ['b']",
      "011 ['a', 'b']",
      "100 ['c']  … 101 110 111",
    ],
  ),
  kernighan: run(
    "n &= n - 1 drops the lowest set bit",
    `let n = 0b101100;
let steps = 0;

while (n) {
  console.log("n", n.toString(2), "lowest", (n & -n).toString(2));
  n &= n - 1;
  steps++;
}
console.log("set bits", steps);`,
    [
      "n 101100  lowest 100",
      "n 101000  lowest 1000",
      "n 100000  lowest 100000",
      "set bits 3",
    ],
  ),
  "euclid-gcd": run(
    "gcd(a, b) = gcd(b, a % b)",
    `function gcd(a, b) {
  console.log("gcd", a, b);
  while (b) {
    const r = a % b;
    console.log(a, "%", b, "=", r);
    a = b;
    b = r;
  }
  return a;
}

console.log("result", gcd(48, 18), "lcm", (48 * 18) / 6);`,
    [
      "gcd 48 18",
      "48 % 18 = 12",
      "18 % 12 = 6",
      "12 % 6 = 0",
      "result 6  lcm 144",
    ],
  ),
  sieve: run(
    "mark multiples of each prime",
    `const n = 20;
const prime = Array(n + 1).fill(true);
prime[0] = prime[1] = false;

for (let p = 2; p * p <= n; p++) {
  if (!prime[p]) continue;
  console.log("strike multiples of", p);
  for (let x = p * p; x <= n; x += p) prime[x] = false;
}
console.log("primes", prime.map((ok, i) => (ok ? i : null)).filter(Boolean));`,
    [
      "strike multiples of 2",
      "strike multiples of 3",
      "primes [2, 3, 5, 7, 11, 13, 17, 19]",
    ],
  ),
  "modular-arithmetic": run(
    "(a + b) % m and a safe multiply",
    `const MOD = 7;
const a = 15, b = 20;

console.log("add", (a + b) % MOD);
console.log("sub", (((a - b) % MOD) + MOD) % MOD);
console.log("mul", (a * b) % MOD);

let x = 1;
for (let i = 0; i < 5; i++) x = (x * 3) % MOD;
console.log("3^5 % 7", x);`,
    [
      "add 1     35 % 7",
      "sub 2     -5 + 7",
      "mul 6     300 % 7",
      "3^5 % 7  5",
    ],
  ),
  "fast-exponentiation": run(
    "square the base, multiply when the bit is on",
    `function pow(base, exp, mod) {
  let ans = 1;
  base %= mod;
  while (exp > 0) {
    if (exp & 1) {
      ans = (ans * base) % mod;
      console.log("odd, multiply", base, "ans", ans);
    }
    base = (base * base) % mod;
    exp >>= 1;
    console.log("square →", base, "exp", exp);
  }
  return ans;
}

console.log("3^13 % 100", pow(3, 13, 100));`,
    [
      "odd, multiply 3  ans 3",
      "square → 9  exp 6",
      "square → 81 exp 3",
      "odd, multiply 81 ans 43",
      "square → 61 exp 1",
      "3^13 % 100  23",
    ],
  ),
  factorization: run(
    "trial divide up to sqrt, peel primes off",
    `let n = 84;
const factors = [];

for (let p = 2; p * p <= n; p++) {
  while (n % p === 0) {
    factors.push(p);
    n /= p;
    console.log("peel", p, "left", n);
  }
}
if (n > 1) {
  factors.push(n);
  console.log("last", n);
}
console.log("84 =", factors.join(" × "));`,
    [
      "peel 2 left 42",
      "peel 2 left 21",
      "peel 3 left 7",
      "last 7",
      "84 = 2 × 2 × 3 × 7",
    ],
  ),
  "ncr-mod-inverse": run(
    "n! * inv(k!) * inv((n-k)!) mod p",
    `const MOD = 13;

function modPow(a, e) {
  let r = 1;
  for (a %= MOD; e; e >>= 1, a = (a * a) % MOD) if (e & 1) r = (r * a) % MOD;
  return r;
}

const fact = [1];
for (let i = 1; i <= 8; i++) fact[i] = (fact[i - 1] * i) % MOD;
const inv = (x) => modPow(x, MOD - 2);

function nCr(n, k) {
  const v = (((fact[n] * inv(fact[k])) % MOD) * inv(fact[n - k])) % MOD;
  console.log("C(" + n + "," + k + ")", v);
  return v;
}

nCr(8, 3);
nCr(6, 2);
console.log("inv(2)", inv(2), "because 2*7=14≡1");`,
    [
      "C(8,3) 4    56 % 13",
      "C(6,2) 2    15 % 13",
      "inv(2) 7  because 2*7=14≡1",
    ],
  ),
  catalan: run(
    "C_n = sum C_i * C_{n-1-i}",
    `const C = [1];

for (let n = 1; n <= 5; n++) {
  C[n] = 0;
  for (let i = 0; i < n; i++) C[n] += C[i] * C[n - 1 - i];
  console.log("C" + n, C[n]);
}`,
    [
      "C1 1",
      "C2 2",
      "C3 5    parentheses / BSTs / paths",
      "C4 14",
      "C5 42",
    ],
  ),
  "segment-tree": run(
    "range sum, point update, 4n array",
    `const A = [1, 3, 5, 7];
const n = A.length;
const t = Array(4 * n).fill(0);

function build(i, l, r) {
  if (l === r) {
    t[i] = A[l];
    return;
  }
  const m = (l + r) >> 1;
  build(i * 2, l, m);
  build(i * 2 + 1, m + 1, r);
  t[i] = t[i * 2] + t[i * 2 + 1];
}

function query(i, l, r, ql, qr) {
  if (qr < l || r < ql) return 0;
  if (ql <= l && r <= qr) return t[i];
  const m = (l + r) >> 1;
  return query(i * 2, l, m, ql, qr) + query(i * 2 + 1, m + 1, r, ql, qr);
}

build(1, 0, n - 1);
console.log("sum[1..2]", query(1, 0, n - 1, 1, 2));
function upd(i, l, r, pos, val) {
  if (l === r) {
    t[i] = val;
    return;
  }
  const m = (l + r) >> 1;
  pos <= m ? upd(i * 2, l, m, pos, val) : upd(i * 2 + 1, m + 1, r, pos, val);
  t[i] = t[i * 2] + t[i * 2 + 1];
}
upd(1, 0, n - 1, 2, 10);
console.log("set A[2]=10");
console.log("sum[1..2]", query(1, 0, n - 1, 1, 2));
console.log("sum all", query(1, 0, n - 1, 0, 3));`,
    [
      "sum[1..2] 8    3+5",
      "set A[2]=10",
      "sum[1..2] 13   3+10",
      "sum all 21",
    ],
  ),
  fenwick: run(
    "i += i & -i climbs; i -= i & -i sums",
    `const n = 5;
const bit = Array(n + 1).fill(0);

function add(i, v) {
  for (; i <= n; i += i & -i) bit[i] += v;
}

function prefix(i) {
  let s = 0;
  for (; i > 0; i -= i & -i) s += bit[i];
  return s;
}

add(1, 2);
add(2, 3);
add(4, 5);
console.log("bit", bit.slice(1));
console.log("sum 1..2", prefix(2));
console.log("sum 1..4", prefix(4));
console.log("range 3..4", prefix(4) - prefix(2));`,
    [
      "bit [2, 5, 0, 10, 0]   chunks of length i&-i",
      "sum 1..2  5",
      "sum 1..4  10",
      "range 3..4  5",
    ],
  ),
  "sparse-table": run(
    "st[k][i] = min of 2^k starting at i",
    `const A = [4, 2, 3, 7, 1, 5];
const n = A.length;
const LOG = Math.floor(Math.log2(n));
const st = [A.slice()];

for (let k = 1; 1 << k <= n; k++) {
  st[k] = [];
  for (let i = 0; i + (1 << k) <= n; i++) {
    st[k][i] = Math.min(st[k - 1][i], st[k - 1][i + (1 << (k - 1))]);
  }
  console.log("len", 1 << k, st[k]);
}

function rmq(L, R) {
  const k = Math.floor(Math.log2(R - L + 1));
  return Math.min(st[k][L], st[k][R - (1 << k) + 1]);
}

console.log("min[1..4]", rmq(1, 4));
console.log("min[3..5]", rmq(3, 5));`,
    [
      "len 2  [2, 2, 3, 1, 1]",
      "len 4  [2, 1, 1]",
      "min[1..4] 1",
      "min[3..5] 1",
    ],
  ),
  "lazy-propagation": run(
    "pending add sits on a node until you walk through it",
    `const n = 4;
const t = Array(8).fill(0);
const lazy = Array(8).fill(0);

function push(i, l, r) {
  if (!lazy[i]) return;
  t[i] += lazy[i] * (r - l + 1);
  if (l !== r) {
    lazy[i * 2] += lazy[i];
    lazy[i * 2 + 1] += lazy[i];
  }
  console.log("push node", i, "add", lazy[i], "span", r - l + 1);
  lazy[i] = 0;
}

function addRange(i, l, r, ql, qr, v) {
  push(i, l, r);
  if (qr < l || r < ql) return;
  if (ql <= l && r <= qr) {
    lazy[i] += v;
    push(i, l, r);
    return;
  }
  const m = (l + r) >> 1;
  addRange(i * 2, l, m, ql, qr, v);
  addRange(i * 2 + 1, m + 1, r, ql, qr, v);
  t[i] = t[i * 2] + t[i * 2 + 1];
}

addRange(1, 0, n - 1, 1, 3, 5);
console.log("sum all", t[1]);`,
    [
      "push node 1 add 0 span 4   empty lazy",
      "push node 2 … walk left, no cover",
      "push node 3 add 5 span 2   right half [2,3] tagged",
      "push node 5 add 5 span 1   leaf A[1]",
      "sum all 15   three cells +5",
    ],
  ),
  "ordered-set": run(
    "sorted unique values plus rank / kth",
    `class Ordered {
  constructor() { this.a = []; }
  add(x) {
    const i = this.rank(x);
    if (this.a[i] === x) return;
    this.a.splice(i, 0, x);
    console.log("add", x, this.a);
  }
  rank(x) {
    let lo = 0, hi = this.a.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.a[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
  kth(k) { return this.a[k]; }
}

const s = new Ordered();
s.add(5); s.add(1); s.add(5); s.add(3);
console.log("rank 3", s.rank(3));
console.log("kth 1", s.kth(1));`,
    [
      "add 5 [5]",
      "add 1 [1, 5]",
      "add 3 [1, 3, 5]   duplicate 5 ignored",
      "rank 3  1   one value strictly smaller",
      "kth 1  3",
    ],
  ),
  "persistent-segment-tree": run(
    "update copies the O(log n) path, old roots stay",
    `function leaf(val) { return { val, L: null, R: null }; }
function node(L, R) { return { val: L.val + R.val, L, R }; }

function build(l, r) {
  if (l === r) return leaf(0);
  const m = (l + r) >> 1;
  return node(build(l, m), build(m + 1, r));
}

function upd(prev, l, r, pos, val) {
  if (l === r) return leaf(val);
  const m = (l + r) >> 1;
  if (pos <= m) return node(upd(prev.L, l, m, pos, val), prev.R);
  return node(prev.L, upd(prev.R, m + 1, r, pos, val));
}

function sum(o, l, r, ql, qr) {
  if (!o || qr < l || r < ql) return 0;
  if (ql <= l && r <= qr) return o.val;
  const m = (l + r) >> 1;
  return sum(o.L, l, m, ql, qr) + sum(o.R, m + 1, r, ql, qr);
}

const n = 4;
const v0 = build(0, n - 1);
const v1 = upd(v0, 0, n - 1, 1, 7);
const v2 = upd(v1, 0, n - 1, 3, 2);
console.log("v0 sum", sum(v0, 0, n - 1, 0, 3));
console.log("v1 sum", sum(v1, 0, n - 1, 0, 3), "A[1]=7");
console.log("v2 sum", sum(v2, 0, n - 1, 0, 3), "A[3]=2");
console.log("v1 still", sum(v1, 0, n - 1, 0, 3));`,
    [
      "v0 sum 0",
      "v1 sum 7  A[1]=7",
      "v2 sum 9  A[3]=2",
      "v1 still 7   old version untouched",
    ],
  ),
};
