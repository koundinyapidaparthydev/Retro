import type { Topic } from "@/content/schema";
import { easyDefinition } from "./explain";

function firstSentence(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  const cut = clean.split(/(?<=[.!?])\s/)[0] ?? clean;
  return cut.length > 160 ? `${cut.slice(0, 150).trim()}…` : cut;
}

export function lesson(topic: Topic) {
  return {
    definition: easyDefinition(topic),
    why: firstSentence(topic.whyItMatters),
    approach: topic.howItWorks.slice(0, 3).map((step) => firstSentence(step)),
  };
}
