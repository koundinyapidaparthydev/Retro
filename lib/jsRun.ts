import type { Topic } from "@/content/schema";
import { AI_RUNS } from "@/content/js-runs/ai";
import { CORE_RUNS } from "@/content/js-runs/core";
import { PACK as PACK_A } from "@/content/js-runs/pack-a";
import { PACK as PACK_B } from "@/content/js-runs/pack-b";
import { PACK as PACK_C } from "@/content/js-runs/pack-c";
import { PACK as PACK_D } from "@/content/js-runs/pack-d";
import { PACK as PACK_E } from "@/content/js-runs/pack-e";
import type { JsRun } from "@/content/js-runs/types";

const ALL: Record<string, JsRun> = {
  ...PACK_A,
  ...PACK_B,
  ...PACK_C,
  ...PACK_D,
  ...PACK_E,
  ...AI_RUNS,
  ...CORE_RUNS,
};

export function jsRunFor(topic: Topic): JsRun {
  const found = ALL[topic.slug] ?? ALL[`${topic.track}:${topic.slug}`];
  if (found) return found;

  const steps = topic.howItWorks.slice(0, 5);
  return {
    title: `how ${topic.title} runs in JS`,
    code: `// ${topic.title}\n${steps
      .map((step, i) => `console.log("step ${i + 1}", ${JSON.stringify(clip(step, 70))});`)
      .join("\n")}`,
    logs: steps.map((step, i) => `step ${i + 1}  ${clip(step, 90)}`),
  };
}

function clip(text: string, n: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= n ? clean : `${clean.slice(0, n - 1)}…`;
}
