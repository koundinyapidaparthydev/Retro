import { run, type JsRun } from "./types";

export const PACK: Record<string, JsRun> = {
  "tree-traversals": run(
    "inorder: left, visit, right",
    `const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(2, n(1), n(3));
const out = [];

const walk = (node) => {
  if (!node) return;
  walk(node.left);
  out.push(node.val);
  console.log("visit", node.val);
  walk(node.right);
};

walk(root);
console.log("inorder", out);`,
    [
      "visit 1   leftmost leaf first",
      "visit 2",
      "visit 3",
      "inorder [1, 2, 3]  — BST keys come out sorted",
    ],
  ),

  "tree-height-diameter": run(
    "one postorder, height and diameter",
    `const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(1, n(2, n(4), n(5)), n(3));
let diameter = 0;

const height = (node) => {
  if (!node) return -1;
  const L = height(node.left);
  const R = height(node.right);
  diameter = Math.max(diameter, L + R + 2);
  console.log(node.val, { L, R, diameter });
  return 1 + Math.max(L, R);
};

height(root);`,
    [
      "4 { L: -1, R: -1, diameter: 0 }  leaf, edge-height 0",
      "5 { L: -1, R: -1, diameter: 0 }",
      "2 { L: 0, R: 0, diameter: 2 }   path 4-2-5",
      "3 { L: -1, R: -1, diameter: 2 }",
      "1 { L: 1, R: 0, diameter: 3 }   path 4-2-1-3, not through-root only",
    ],
  ),

  lca: run(
    "BST walk until the keys split",
    `const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(6, n(2, n(0), n(4)), n(8));
const p = 0, q = 4;
let node = root;

while (node) {
  console.log("at", node.val);
  if (p < node.val && q < node.val) node = node.left;
  else if (p > node.val && q > node.val) node = node.right;
  else break;
}
console.log("lca", node.val);`,
    [
      "at 6   both 0 and 4 < 6 → left",
      "at 2   0 < 2 < 4 → split",
      "lca 2  (2 is also an ancestor of both)",
    ],
  ),

  "validate-bst": run(
    "thread (lo, hi), not just kids",
    `const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(10, n(5), n(15, n(6), n(20)));

const ok = (node, lo = -Infinity, hi = Infinity) => {
  if (!node) return true;
  console.log(node.val, "in", [lo, hi]);
  if (node.val <= lo || node.val >= hi) return false;
  return ok(node.left, lo, node.val) && ok(node.right, node.val, hi);
};

console.log("valid?", ok(root));`,
    [
      "10 in [-Infinity, Infinity]",
      "5 in [-Infinity, 10]",
      "15 in [10, Infinity]",
      "6 in [10, 15]   6 ≤ 10 → fail (6 sits under 15, left of 10)",
      "valid? false",
    ],
  ),

  "kth-smallest-bst": run(
    "inorder with a stack, stop at k",
    `const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(5, n(3, n(2), n(4)), n(7));
const k = 3;
const stack = [];
let node = root, seen = 0;

while (node || stack.length) {
  while (node) { stack.push(node); node = node.left; }
  node = stack.pop();
  seen++;
  console.log("visit", node.val, "count", seen);
  if (seen === k) break;
  node = node.right;
}`,
    [
      "visit 2  count 1",
      "visit 3  count 2",
      "visit 4  count 3  → kth = 4  (inorder is sorted)",
    ],
  ),

  "serialize-tree": run(
    "preorder + # for nulls",
    `const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(1, n(2), n(3, n(4), n(5)));
const out = [];

const dump = (node) => {
  if (!node) { out.push("#"); return; }
  out.push(node.val);
  console.log("write", node.val);
  dump(node.left);
  dump(node.right);
};

dump(root);
console.log("wire", out.join(","));`,
    [
      "write 1",
      "write 2   then #, # for its kids",
      "write 3",
      "write 4",
      "write 5",
      "wire 1,2,#,#,3,4,#,#,5,#,#",
    ],
  ),

  "path-sum": run(
    "subtract as you walk, check a leaf",
    `const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(5, n(4, n(11, n(7), n(2))), n(8));
const target = 22;

const dfs = (node, remain) => {
  if (!node) return false;
  remain -= node.val;
  console.log("at", node.val, "remain", remain);
  if (!node.left && !node.right) return remain === 0;
  return dfs(node.left, remain) || dfs(node.right, remain);
};

console.log("hit?", dfs(root, target));`,
    [
      "at 5 remain 17",
      "at 4 remain 13",
      "at 11 remain 2",
      "at 7 remain -5   leaf miss",
      "at 2 remain 0    leaf hit  5+4+11+2",
      "hit? true",
    ],
  ),

  "max-path-sum": run(
    "gain up, best through the node",
    `const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(-10, n(9), n(20, n(15), n(7)));
let best = -Infinity;

const gain = (node) => {
  if (!node) return 0;
  const L = Math.max(0, gain(node.left));
  const R = Math.max(0, gain(node.right));
  best = Math.max(best, node.val + L + R);
  console.log(node.val, { L, R, best });
  return node.val + Math.max(L, R);
};

gain(root);`,
    [
      "9 { L: 0, R: 0, best: 9 }",
      "15 { L: 0, R: 0, best: 15 }",
      "7 { L: 0, R: 0, best: 15 }",
      "20 { L: 15, R: 7, best: 42 }   15-20-7",
      "-10 { L: 9, R: 35, best: 42 }  drop the negative root from the answer",
    ],
  ),

  "invert-tree": run(
    "swap kids, recurse",
    `const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(4, n(2, n(1), n(3)), n(7));

const invert = (node) => {
  if (!node) return null;
  [node.left, node.right] = [node.right, node.left];
  console.log("swap around", node.val);
  invert(node.left);
  invert(node.right);
  return node;
};

invert(root);
console.log("root kids", root.left.val, root.right.val);`,
    [
      "swap around 4   2 ↔ 7",
      "swap around 7   (now the left child)",
      "swap around 2   (now the right child; 1 ↔ 3)",
      "root kids 7 2",
    ],
  ),

  "flatten-binary-tree": run(
    "reverse preorder, stitch a right spine",
    `const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(1, n(2, n(3), n(4)), n(5));
let prev = null;

const flatten = (node) => {
  if (!node) return;
  flatten(node.right);
  flatten(node.left);
  node.right = prev;
  node.left = null;
  console.log("stitch", node.val, "→", prev?.val ?? null);
  prev = node;
};

flatten(root);`,
    [
      "stitch 5 → null",
      "stitch 4 → 5",
      "stitch 3 → 4",
      "stitch 2 → 3",
      "stitch 1 → 2   left pointers cleared; list is 1-2-3-4-5",
    ],
  ),

  "morris-traversal": run(
    "thread the predecessor, then unthread",
    `const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(2, n(1), n(3));
const out = [];
let cur = root;

while (cur) {
  if (!cur.left) {
    out.push(cur.val);
    console.log("visit", cur.val);
    cur = cur.right;
    continue;
  }
  let pred = cur.left;
  while (pred.right && pred.right !== cur) pred = pred.right;
  if (!pred.right) {
    pred.right = cur;
    console.log("thread", pred.val, "→", cur.val);
    cur = cur.left;
  } else {
    pred.right = null;
    out.push(cur.val);
    console.log("unthread, visit", cur.val);
    cur = cur.right;
  }
}`,
    [
      "thread 1 → 2   borrow 1.right as a return ticket",
      "visit 1",
      "unthread, visit 2   restore 1.right = null",
      "visit 3   inorder [1, 2, 3], O(1) extra space",
    ],
  ),

  trie: run(
    "nested objects, $ marks a word",
    `const root = {};

const insert = (word) => {
  let node = root;
  for (const ch of word) {
    node[ch] ??= {};
    node = node[ch];
  }
  node.$ = true;
  console.log("insert", word);
};

const has = (word) => {
  let node = root;
  for (const ch of word) {
    node = node[ch];
    if (!node) return false;
  }
  return !!node.$;
};

insert("app");
insert("apple");
console.log("app?", has("app"));
console.log("ap?", has("ap"));
console.log("apple?", has("apple"));`,
    [
      "insert app",
      "insert apple   shares the a-p-p spine",
      "app? true",
      "ap? false   prefix only, no $",
      "apple? true",
    ],
  ),

  "cycle-undirected": run(
    "DFS, skip parent, seen neighbor = cycle",
    `const g = { A: ["B", "C"], B: ["A", "C"], C: ["A", "B"] };
const seen = new Set();
let cycle = false;

const dfs = (u, parent) => {
  seen.add(u);
  for (const v of g[u]) {
    if (v === parent) continue;
    if (seen.has(v)) {
      cycle = true;
      console.log("back edge", u, "→", v);
      return;
    }
    console.log("walk", u, "→", v);
    dfs(v, u);
  }
};

dfs("A", null);
console.log("cycle?", cycle);`,
    [
      "walk A → B",
      "walk B → C",
      "back edge C → A   C already saw A as a non-parent",
      "cycle? true",
    ],
  ),

  "cycle-directed": run(
    "gray = on the stack, back edge",
    `const g = { A: ["B"], B: ["C"], C: ["A"] };
const color = {};
let cycle = false;

const dfs = (u) => {
  color[u] = 1;
  console.log("enter", u, { ...color });
  for (const v of g[u]) {
    if (color[v] === 1) { cycle = true; console.log("back to gray", v); }
    else if (!color[v]) dfs(v);
  }
  color[u] = 2;
};

dfs("A");
console.log("cycle?", cycle);`,
    [
      "enter A { A: 1 }",
      "enter B { A: 1, B: 1 }",
      "enter C { A: 1, B: 1, C: 1 }",
      "back to gray A   C → A while A is still on the stack",
      "cycle? true",
    ],
  ),

  "topo-sort-kahn": run(
    "queue the indegree-0 nodes",
    `const g = { A: ["C"], B: ["C"], C: ["D"], D: [] };
const indeg = { A: 0, B: 0, C: 0, D: 0 };
for (const u of Object.keys(g)) for (const v of g[u]) indeg[v]++;

const q = Object.keys(indeg).filter((u) => indeg[u] === 0);
const order = [];

while (q.length) {
  const u = q.shift();
  order.push(u);
  console.log("take", u, "left", { ...indeg });
  for (const v of g[u]) if (--indeg[v] === 0) q.push(v);
}
console.log("order", order);`,
    [
      "take A  left { A:0, B:0, C:2, D:1 }  C drops to 1",
      "take B  C drops to 0, enqueue C",
      "take C  D drops to 0, enqueue D",
      "take D",
      "order [A, B, C, D]",
    ],
  ),

  "topo-sort-dfs": run(
    "push on finish, then reverse",
    `const g = { A: ["C"], B: ["C"], C: ["D"], D: [] };
const seen = new Set();
const order = [];

const dfs = (u) => {
  seen.add(u);
  for (const v of g[u]) if (!seen.has(v)) dfs(v);
  order.push(u);
  console.log("done", u);
};

for (const u of Object.keys(g)) if (!seen.has(u)) dfs(u);
console.log("order", [...order].reverse());`,
    [
      "done D   sinks finish first",
      "done C",
      "done A",
      "done B",
      "order [B, A, C, D]  reverse of finish times",
    ],
  ),

  "bfs-shortest-path": run(
    "unweighted hops from A",
    `const g = { A: ["B", "C"], B: ["D"], C: ["D"], D: [] };
const dist = { A: 0 };
const q = ["A"];

while (q.length) {
  const u = q.shift();
  console.log("pop", u, "d", dist[u]);
  for (const v of g[u]) {
    if (dist[v] === undefined) {
      dist[v] = dist[u] + 1;
      q.push(v);
    }
  }
}
console.log("dist", dist);`,
    [
      "pop A d 0   enqueue B, C",
      "pop B d 1   enqueue D",
      "pop C d 1   D already settled",
      "pop D d 2",
      "dist { A: 0, B: 1, C: 1, D: 2 }",
    ],
  ),

  dijkstra: run(
    "settle the nearest unsettled node",
    `const g = {
  A: [["B", 4], ["C", 1]],
  B: [["D", 1]],
  C: [["B", 2], ["D", 5]],
  D: [],
};
const dist = { A: 0, B: Infinity, C: Infinity, D: Infinity };
const seen = new Set();

while (seen.size < 4) {
  const u = Object.keys(dist).filter((k) => !seen.has(k))
    .sort((a, b) => dist[a] - dist[b])[0];
  seen.add(u);
  console.log("settle", u, dist[u]);
  for (const [v, w] of g[u]) {
    if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
  }
}`,
    [
      "settle A 0   C = 1, B = 4",
      "settle C 1   B = 3 via C, D = 6",
      "settle B 3   D = 4 via B",
      "settle D 4",
    ],
  ),

  "bellman-ford": run(
    "relax every edge |V|-1 times",
    `const nodes = ["A", "B", "C"];
const edges = [["A", "B", 4], ["A", "C", 1], ["C", "B", -2]];
const dist = { A: 0, B: Infinity, C: Infinity };

for (let i = 0; i < nodes.length - 1; i++) {
  for (const [u, v, w] of edges) {
    if (dist[u] + w < dist[v]) {
      dist[v] = dist[u] + w;
      console.log("relax", u, "→", v, "=", dist[v]);
    }
  }
}
console.log("dist", dist);`,
    [
      "relax A → B = 4",
      "relax A → C = 1",
      "relax C → B = -1   negative edge wins on the next hop",
      "dist { A: 0, B: -1, C: 1 }",
    ],
  ),

  kruskal: run(
    "sort edges, union if they do not meet",
    `const edges = [["A", "B", 1], ["B", "C", 2], ["A", "C", 4], ["C", "D", 1]];
edges.sort((a, b) => a[2] - b[2]);
const parent = { A: "A", B: "B", C: "C", D: "D" };
const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));

for (const [u, v, w] of edges) {
  const a = find(u), b = find(v);
  if (a === b) { console.log("skip", u, v); continue; }
  parent[a] = b;
  console.log("take", u, v, w);
}`,
    [
      "take A B 1",
      "take C D 1",
      "take B C 2   now one tree A-B-C-D",
      "skip A C   already connected (cycle)",
    ],
  ),

  prim: run(
    "grow the cut from A",
    `const g = {
  A: [["B", 1], ["C", 4]],
  B: [["A", 1], ["C", 2], ["D", 5]],
  C: [["A", 4], ["B", 2], ["D", 1]],
  D: [["B", 5], ["C", 1]],
};
const inMST = new Set(["A"]);

while (inMST.size < 4) {
  let best = null;
  for (const u of inMST) {
    for (const [v, w] of g[u]) {
      if (inMST.has(v)) continue;
      if (!best || w < best[2]) best = [u, v, w];
    }
  }
  const [u, v, w] = best;
  inMST.add(v);
  console.log("grow", u, "→", v, w);
}`,
    [
      "grow A → B 1   cheapest edge out of {A}",
      "grow B → C 2   beats A → C 4",
      "grow C → D 1",
    ],
  ),

  "union-find": run(
    "parent object, path compression",
    `const parent = { A: "A", B: "B", C: "C", D: "D" };
const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));

const unite = (a, b) => {
  a = find(a); b = find(b);
  if (a === b) return;
  parent[a] = b;
  console.log("union", a, "→", b, { ...parent });
};

unite("A", "B");
unite("C", "D");
unite("B", "C");
console.log("same A D?", find("A") === find("D"));`,
    [
      "union A → B  { A: B, B: B, C: C, D: D }",
      "union C → D  { A: B, B: B, C: D, D: D }",
      "union B → D  { A: B, B: D, C: D, D: D }",
      "same A D? true   find(A) compresses A → D",
    ],
  ),

  bipartite: run(
    "BFS 2-color, clash = odd cycle",
    `const g = { A: ["B", "C"], B: ["A", "D"], C: ["A"], D: ["B"] };
const color = { A: 0 };
const q = ["A"];
let ok = true;

while (q.length && ok) {
  const u = q.shift();
  for (const v of g[u]) {
    if (color[v] === undefined) {
      color[v] = color[u] ^ 1;
      q.push(v);
      console.log(u, "→", v, "color", color[v]);
    } else if (color[v] === color[u]) {
      ok = false;
      console.log("clash at", v);
    }
  }
}
console.log("bipartite?", ok);`,
    [
      "A → B color 1",
      "A → C color 1",
      "B → D color 0",
      "bipartite? true   parts {A, D} and {B, C}",
    ],
  ),

  "connected-components": run(
    "DFS from each unseen node",
    `const g = { A: ["B"], B: ["A"], C: ["D"], D: ["C"], E: [] };
const seen = new Set();
let comps = 0;

const dfs = (u) => {
  seen.add(u);
  for (const v of g[u]) if (!seen.has(v)) dfs(v);
};

for (const u of Object.keys(g)) {
  if (seen.has(u)) continue;
  comps++;
  dfs(u);
  console.log("component", comps, "from", u);
}
console.log("count", comps);`,
    [
      "component 1 from A   A-B",
      "component 2 from C   C-D",
      "component 3 from E   singleton",
      "count 3",
    ],
  ),

  islands: run(
    "flood-fill 1s to 0",
    `const grid = [
  [1, 1, 0],
  [1, 0, 0],
  [0, 0, 1],
];

const flood = (r, c) => {
  if (r < 0 || c < 0 || r > 2 || c > 2 || !grid[r][c]) return;
  grid[r][c] = 0;
  for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) flood(r + dr, c + dc);
};

let count = 0;
for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 3; c++) {
    if (!grid[r][c]) continue;
    count++;
    flood(r, c);
    console.log("island", count, "seed", [r, c]);
  }
}
console.log("count", count);`,
    [
      "island 1 seed [0, 0]   eats the 2×2-ish block of 1s",
      "island 2 seed [2, 2]",
      "count 2",
    ],
  ),

  "floyd-warshall": run(
    "try every midpoint k",
    `const nodes = ["A", "B", "C"];
const d = {
  A: { A: 0, B: 3, C: 8 },
  B: { A: Infinity, B: 0, C: 2 },
  C: { A: 5, B: Infinity, C: 0 },
};

for (const k of nodes) {
  for (const i of nodes) {
    for (const j of nodes) {
      if (d[i][k] + d[k][j] < d[i][j]) {
        d[i][j] = d[i][k] + d[k][j];
        console.log("via", k, ":", i, "→", j, "=", d[i][j]);
      }
    }
  }
}
console.log("A→C", d.A.C, "B→A", d.B.A);`,
    [
      "via A : C → B = 8   C-A-B",
      "via B : A → C = 5   A-B-C beats the direct 8",
      "via C : B → A = 7   B-C-A",
      "A→C 5  B→A 7",
    ],
  ),

  "zero-one-bfs": run(
    "deque: 0-weight to the front",
    `const g = {
  A: [["B", 1], ["C", 0]],
  B: [["D", 0]],
  C: [["D", 1]],
  D: [],
};
const dist = { A: 0 };
const q = ["A"];

while (q.length) {
  const u = q.shift();
  for (const [v, w] of g[u]) {
    const nd = dist[u] + w;
    if (dist[v] === undefined || nd < dist[v]) {
      dist[v] = nd;
      w === 0 ? q.unshift(v) : q.push(v);
      console.log(u, "→", v, "w", w, "d", nd, "deque", [...q]);
    }
  }
}
console.log("dist", dist);`,
    [
      "A → B w 1 d 1 deque [B]     push back",
      "A → C w 0 d 0 deque [C, B]  unshift",
      "C → D w 1 d 1 deque [B, D]",
      "dist { A: 0, B: 1, C: 0, D: 1 }",
    ],
  ),

  "bridges-articulation": run(
    "bridge when low[child] > tin[u]",
    `const g = { A: ["B"], B: ["A", "C", "D"], C: ["B"], D: ["B"] };
let timer = 0;
const tin = {}, low = {}, bridges = [];

const dfs = (u, parent = null) => {
  tin[u] = low[u] = ++timer;
  for (const v of g[u]) {
    if (v === parent) continue;
    if (tin[v]) { low[u] = Math.min(low[u], tin[v]); continue; }
    dfs(v, u);
    low[u] = Math.min(low[u], low[v]);
    if (low[v] > tin[u]) bridges.push([u, v]);
    console.log(u, "kid", v, { lowV: low[v], tinU: tin[u] });
  }
};

dfs("A");
console.log("bridges", bridges);`,
    [
      "B kid C { lowV: 3, tinU: 2 }  3 > 2 → bridge B-C",
      "B kid D { lowV: 4, tinU: 2 }  bridge B-D",
      "A kid B { lowV: 2, tinU: 1 }  bridge A-B",
      "bridges [['B','C'], ['B','D'], ['A','B']]  B is the articulation",
    ],
  ),

  "scc-kosaraju": run(
    "finish order, then DFS on the reverse",
    `const g = { A: ["B"], B: ["C"], C: ["A", "D"], D: ["E"], E: ["D"] };
const rev = { A: ["C"], B: ["A"], C: ["B"], D: ["C", "E"], E: ["D"] };
const seen = new Set();
const order = [];

const dfs1 = (u) => {
  seen.add(u);
  for (const v of g[u]) if (!seen.has(v)) dfs1(v);
  order.push(u);
};
for (const u of Object.keys(g)) if (!seen.has(u)) dfs1(u);
console.log("finish", order);

seen.clear();
const sccs = [];
const dfs2 = (u, bag) => {
  seen.add(u);
  bag.push(u);
  for (const v of rev[u]) if (!seen.has(v)) dfs2(v, bag);
};
for (const u of [...order].reverse()) {
  if (seen.has(u)) continue;
  const bag = [];
  dfs2(u, bag);
  sccs.push(bag);
  console.log("scc", bag);
}`,
    [
      "finish [E, D, C, B, A]  sinks of the first DFS",
      "scc [A, C, B]  second pass on the reverse, from A",
      "scc [D, E]     the D↔E cycle",
    ],
  ),

  "scc-tarjan": run(
    "pop a component when low equals tin",
    `const g = { A: ["B"], B: ["C"], C: ["D", "A"], D: ["E"], E: ["D"] };
let timer = 0;
const tin = {}, low = {}, on = new Set(), stack = [];

const dfs = (u) => {
  tin[u] = low[u] = ++timer;
  stack.push(u);
  on.add(u);
  for (const v of g[u]) {
    if (!tin[v]) {
      dfs(v);
      low[u] = Math.min(low[u], low[v]);
    } else if (on.has(v)) {
      low[u] = Math.min(low[u], tin[v]);
      console.log("back", u, "→", v, "low", low[u]);
    }
  }
  if (low[u] === tin[u]) {
    const bag = [];
    let x;
    do { x = stack.pop(); on.delete(x); bag.push(x); } while (x !== u);
    console.log("pop scc", bag);
  }
};

for (const u of Object.keys(g)) if (!tin[u]) dfs(u);`,
    [
      "back E → D  low 4   D is still on the stack",
      "pop scc [E, D]",
      "back C → A  low 1   A is still on the stack",
      "pop scc [C, B, A]",
    ],
  ),

  "euler-path": run(
    "Hierholzer: eat unused outs, reverse finish",
    `const g = { A: ["B"], B: ["C"], C: ["A", "D"], D: [] };
const circuit = [];

const dfs = (u) => {
  const outs = g[u] ?? [];
  while (outs.length) {
    const v = outs.pop();
    console.log("take", u, "→", v);
    dfs(v);
  }
  circuit.push(u);
};

dfs("A");
console.log("path", circuit.reverse());`,
    [
      "take A → B",
      "take B → C",
      "take C → D   pop D first from [A, D]",
      "take C → A",
      "path [A, B, C, A, D]",
    ],
  ),

  "a-star": run(
    "expand lowest g+h",
    `const g = { S: ["A", "B"], A: ["GOAL"], B: ["GOAL"], GOAL: [] };
const h = { S: 2, A: 1, B: 4, GOAL: 0 };
const w = { "S|A": 1, "S|B": 1, "A|GOAL": 1, "B|GOAL": 5 };
const gScore = { S: 0 };
const open = ["S"];
const done = new Set();

while (open.length) {
  open.sort((a, b) => gScore[a] + h[a] - (gScore[b] + h[b]));
  const u = open.shift();
  if (done.has(u)) continue;
  done.add(u);
  console.log("expand", u, "g", gScore[u], "f", gScore[u] + h[u]);
  if (u === "GOAL") break;
  for (const v of g[u]) {
    const ng = gScore[u] + w[\`\${u}|\${v}\`];
    if (gScore[v] === undefined || ng < gScore[v]) {
      gScore[v] = ng;
      open.push(v);
    }
  }
}`,
    [
      "expand S g 0 f 2   enqueue A (f=2) and B (f=5)",
      "expand A g 1 f 2   better heuristic, GOAL g=2",
      "expand GOAL g 2 f 2",
      "B stays in open — never expanded",
    ],
  ),
};
