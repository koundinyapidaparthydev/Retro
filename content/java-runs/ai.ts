import { run, type CodeRun } from "./types";

export const AI_RUNS: Record<string, CodeRun> = {
  tokens: run(
    "count pieces, not words",
    `String text = "unbelievable password reset";
String[] pieces = text.toLowerCase().split("[^a-z0-9]+");
System.out.println("words " + text.split(" ").length);
System.out.println("pieces " + pieces.length);
System.out.println("real tokenizers split 'unbelievable' further");`,
    ["words 3", "pieces 3", "real tokenizers split 'unbelievable' further"],
  ),
  "cosine-similarity": run(
    "which list points the same way",
    `double[] q = {1, 0};
double[] a = {0.9, 0.1};
double[] b = {0, 1};
System.out.println("reset-ish " + String.format("%.2f", cos(q, a)));
System.out.println("pizza " + String.format("%.2f", cos(q, b)));
// cos = dot / (|a||b|)`,
    ["reset-ish 0.99", "pizza 0.00"],
  ),
  "retrieve-then-read": run(
    "find pages, then answer",
    `record Chunk(int id, String text) {}
Chunk[] chunks = {
  new Chunk(1, "Garage open 8 to 20."),
  new Chunk(2, "Refunds take 5 days."),
};
String q = "when is the garage open";
Chunk hit = null;
for (Chunk c : chunks) {
  if (c.text().toLowerCase().contains("garage")) { hit = c; break; }
}
System.out.println("retrieved " + hit.id() + " " + hit.text());
System.out.println("answer Open 8-20. [1]");
System.out.println("refunds → UNKNOWN");`,
    ["retrieved 1 Garage open 8 to 20.", "answer Open 8-20. [1]", "refunds → UNKNOWN"],
  ),
  "golden-eval": run(
    "ten rows, pass or fail",
    `String[][] evals = {
  {"garage hours", "8-20 [1]", "PASS"},
  {"refunds", "UNKNOWN", "PASS"},
  {"refunds", "we refund in 3 days", "FAIL"},
};
for (String[] row : evals) {
  System.out.println(row[0] + "  " + row[1] + "  " + row[2]);
}`,
    ["garage hours  8-20 [1]  PASS", "refunds  UNKNOWN  PASS", "refunds  we refund in 3 days  FAIL"],
  ),
  "text-to-sql": run(
    "english in, then check",
    `String sql = "SELECT game, SUM(revenue) FROM plays WHERE day = '2026-09-01' GROUP BY game";
String bad = "DROP TABLE plays";
System.out.println("ok " + allow(sql));
System.out.println("drop " + allow(bad));
// allow = startsWith SELECT && contains WHERE`,
    ["ok true", "drop false"],
  ),
};
