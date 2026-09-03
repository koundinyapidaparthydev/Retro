import { run, type JsRun } from "./types";

export const AI_RUNS: Record<string, JsRun> = {
  tokens: run(
    "count pieces, not words",
    `const text = "unbelievable password reset";
const pieces = text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
console.log("words", text.split(" ").length);
console.log("pieces (stand-in)", pieces.length, pieces);
console.log("real tokenizers split 'unbelievable' further");`,
    ["words  3", "pieces (stand-in)  3  [unbelievable, password, reset]", "real tokenizers split 'unbelievable' further"],
  ),
  "cosine-similarity": run(
    "which list points the same way",
    `function cos(a, b) {
  const dot = a.reduce((s, x, i) => s + x * b[i], 0);
  const na = Math.hypot(...a);
  const nb = Math.hypot(...b);
  return dot / (na * nb);
}
const q = [1, 0];
console.log("reset-ish", cos(q, [0.9, 0.1]).toFixed(2));
console.log("pizza", cos(q, [0, 1]).toFixed(2));`,
    ["reset-ish  0.99", "pizza  0.00"],
  ),
  "retrieve-then-read": run(
    "find pages, then answer",
    `const chunks = [
  { id: 1, text: "Garage open 8 to 20." },
  { id: 2, text: "Refunds take 5 days." },
  { id: 3, text: "EV spots on floor 2." },
];
const q = "when is the garage open";
const hit = chunks.find((c) => c.text.toLowerCase().includes("garage"));
console.log("retrieved", hit.id, hit.text);
console.log("answer", "Open 8–20. [1]");
console.log("refunds question → UNKNOWN (no hit)");`,
    ["retrieved  1  Garage open 8 to 20.", "answer  Open 8–20. [1]", "refunds question → UNKNOWN (no hit)"],
  ),
  "golden-eval": run(
    "ten rows, pass or fail",
    `const evals = [
  { q: "garage hours", got: "8-20 [1]", pass: true },
  { q: "refunds", got: "UNKNOWN", pass: true },
  { q: "refunds", got: "we refund in 3 days", pass: false },
];
for (const row of evals) console.log(row.q, row.got, row.pass ? "PASS" : "FAIL");`,
    ["garage hours  8-20 [1]  PASS", "refunds  UNKNOWN  PASS", "refunds  we refund in 3 days  FAIL"],
  ),
  "text-to-sql": run(
    "english in, then check",
    `const sql = "SELECT game, SUM(revenue) FROM plays WHERE day = '2026-09-01' GROUP BY game";
const bad = "DROP TABLE plays";
function allow(s) {
  const u = s.trim().toUpperCase();
  return u.startsWith("SELECT") && u.includes("WHERE");
}
console.log("ok", allow(sql));
console.log("drop", allow(bad));`,
    ["ok  true", "drop  false"],
  ),
};
