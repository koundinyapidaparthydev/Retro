import type { Topic } from "@/content/schema";
import { HANDCRAFTED } from "@/content/java-runs/handcrafted-nc";
import { AI_RUNS } from "@/content/java-runs/ai";
import { CORE_RUNS } from "@/content/java-runs/core";
import { PACK as PACK_NC75 } from "@/content/java-runs/pack-nc75";
import { PACK as PACK_NC150 } from "@/content/java-runs/pack-nc150";
import type { CodeRun } from "@/content/java-runs/types";

const ALL: Record<string, CodeRun> = {
  ...PACK_NC150,
  ...PACK_NC75,
  ...AI_RUNS,
  ...CORE_RUNS,
  ...HANDCRAFTED,
};

export function registerJavaRuns(pack: Record<string, CodeRun>) {
  Object.assign(ALL, pack);
}

export function javaRunFor(topic: Topic): CodeRun {
  const found = ALL[topic.slug] ?? ALL[`${topic.track}:${topic.slug}`];
  if (found) return found;

  const steps = topic.howItWorks.slice(0, 5);
  return {
    title: `how ${topic.title} runs in Java`,
    code: `// ${topic.title}\n${steps
      .map((step, i) => `System.out.println("step ${i + 1}: " + ${JSON.stringify(clip(step, 60))});`)
      .join("\n")}`,
    logs: steps.map((step, i) => `step ${i + 1}  ${clip(step, 90)}`),
  };
}

/** @deprecated use javaRunFor */
export function jsRunFor(topic: Topic): CodeRun {
  return javaRunFor(topic);
}

function clip(text: string, n: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= n ? clean : `${clean.slice(0, n - 1)}…`;
}
