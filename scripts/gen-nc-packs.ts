import { writeFileSync } from "fs";
import { NEETCODE_75, ncTopicSlug } from "../content/neetcode/list";
import { topics as extras } from "../content/dsa/neetcode-150";

function esc(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function card(slug: string, title: string, pattern: string) {
  const key = ncTopicSlug(slug);
  return `  "${key}": problem(
    "LeetCode-style input for ${esc(title)}. Pattern family: ${esc(pattern)}.",
    "Return the answer the problem asks for. Dry-run a tiny case before coding.",
    "Walk one official sample from ${esc(title)} on paper, then code it in Java.",
    [
      "${esc(title)} — state Given and Find without the pattern name.",
      "Brute force first, then the ${esc(pattern)} improvement.",
      "Empty / n=1 / all equal — what happens?",
    ],
  )`;
}

function javaRun(key: string, title: string) {
  return `  "${key}": run(
    "${esc(title).slice(0, 40)}",
    \`// ${esc(title)}
System.out.println("problem: ${esc(title)}");
System.out.println("1) restate Given / Find");
System.out.println("2) dry-run tiny input");
System.out.println("3) code in Java (HashMap / arrays / Deque)");\`,
    [
      "problem: ${esc(title)}",
      "1) restate Given / Find",
      "2) dry-run tiny input",
      "3) code in Java (HashMap / arrays / Deque)",
    ],
  )`;
}

const nc75 = NEETCODE_75.map((m) => card(m.slug, m.title, m.pattern)).join(",\n");
writeFileSync(
  "content/problems/pack-nc75.ts",
  `import { problem, type ProblemCard } from "./types";\n\nexport const PACK: Record<string, ProblemCard> = {\n${nc75},\n};\n`,
);

const nc150 = extras
  .map((t) => {
    const slug = t.slug.replace(/^nc-/, "");
    const pattern = t.summary.split(".")[1]?.trim() || "NeetCode 150";
    return card(slug, t.title, pattern);
  })
  .join(",\n");
writeFileSync(
  "content/problems/pack-nc150.ts",
  `import { problem, type ProblemCard } from "./types";\n\nexport const PACK: Record<string, ProblemCard> = {\n${nc150},\n};\n`,
);

const j75 = NEETCODE_75.map((m) => javaRun(ncTopicSlug(m.slug), m.title)).join(",\n");
writeFileSync(
  "content/java-runs/pack-nc75.ts",
  `import { run, type CodeRun } from "./types";\n\nexport const PACK: Record<string, CodeRun> = {\n${j75},\n};\n`,
);

const j150 = extras.map((t) => javaRun(t.slug, t.title)).join(",\n");
writeFileSync(
  "content/java-runs/pack-nc150.ts",
  `import { run, type CodeRun } from "./types";\n\nexport const PACK: Record<string, CodeRun> = {\n${j150},\n};\n`,
);

console.log("wrote", NEETCODE_75.length, extras.length);
