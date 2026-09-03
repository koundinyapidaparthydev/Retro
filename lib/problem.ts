import { EXAMPLES } from "@/content/examples";
import { CORE_PROBLEMS } from "@/content/problems/core";
import { PACK as PACK_A } from "@/content/problems/pack-a";
import { PACK as PACK_B } from "@/content/problems/pack-b";
import { PACK as PACK_C } from "@/content/problems/pack-c";
import { PACK as PACK_D } from "@/content/problems/pack-d";
import { PACK as PACK_HLD } from "@/content/problems/pack-hld";
import { PACK as PACK_AI } from "@/content/problems/pack-ai";
import { PACK as PACK_LLD } from "@/content/problems/pack-lld";
import { PACK as PACK_NC75 } from "@/content/problems/pack-nc75";
import { PACK as PACK_NC150 } from "@/content/problems/pack-nc150";
import type { ProblemCard } from "@/content/problems/types";
import type { Topic } from "@/content/schema";

function prefix(track: string, pack: Record<string, ProblemCard>) {
  const out: Record<string, ProblemCard> = {};
  for (const [slug, card] of Object.entries(pack)) {
    out[`${track}:${slug}`] = card;
  }
  return out;
}

function allProblems(): Record<string, ProblemCard> {
  return Object.assign(
    {},
    prefix("dsa", PACK_A),
    prefix("dsa", PACK_B),
    prefix("dsa", PACK_C),
    prefix("dsa", PACK_D),
    prefix("hld", PACK_HLD),
    prefix("lld", PACK_LLD),
    prefix("ai", PACK_AI),
    prefix("dsa", PACK_NC150),
    prefix("dsa", PACK_NC75),
    prefix("dsa", CORE_PROBLEMS),
  );
}

export function problemFor(topic: Topic): ProblemCard {
  const found = allProblems()[`${topic.track}:${topic.slug}`];
  if (found) return found;
  return fallbackProblem(topic);
}

function fallbackProblem(topic: Topic): ProblemCard {
  const ex = EXAMPLES[`${topic.track}:${topic.slug}`];
  const example = ex
    ? [ex.input ?? ex.setup, ex.result].filter(Boolean).join(" → ")
    : (topic.practiceIdeas[1] ?? topic.practiceIdeas[0] ?? "");

  if (topic.track === "ai") {
    return {
      given: stripName(topic.summary, topic.title),
      find: topic.whenToUse[0] ?? topic.practiceIdeas[0] ?? "Solve the situation. Do not start from the paper name.",
      example,
      askedAs: askedFrom(topic, [
        topic.practiceIdeas[0],
        topic.interviewTips[0],
        topic.pitfalls[0],
      ]),
    };
  }

  if (topic.track === "dsa") {
    return {
      given: stripName(topic.summary, topic.title),
      find: topic.whenToUse[0] ?? topic.practiceIdeas[0] ?? "Return the answer for this input.",
      example,
      askedAs: askedFrom(topic, [
        topic.practiceIdeas[0],
        topic.practiceIdeas[1],
        topic.interviewTips[0],
      ]),
    };
  }

  if (topic.track === "hld") {
    const name = topic.title.replace(/^Design (a |an |the )?/i, "").replace(/\s+\(.*\)$/, "").trim();
    const design = /design/i.test(topic.category) || /shortener|feed|chat|uber|netflix|dropbox|zoom|youtube|cache|limiter|crawler|wallet|checkout/i.test(topic.slug);
    return {
      given: design
        ? `A product owner wants ${name}. They have not named a stack.`
        : `A live system is hurting. Someone asks whether ${name} is the right fix.`,
      find: design
        ? `Sketch v1: who uses it, read vs write, the jobs that must not fail.`
        : `Say the problem this idea solves, when you would add it, and the cheaper alternative.`,
      example: topic.whenToUse[0] ?? topic.practiceIdeas[0] ?? example,
      askedAs: askedFrom(topic, [
        design ? `Design ${name}. Start from the user.` : `We're in pain — would you introduce ${name}?`,
        topic.practiceIdeas[0],
        topic.interviewTips[0],
      ]),
    };
  }

  const name = topic.title.replace(/^Design (a |an |the )?/i, "").replace(/\s+\(.*\)$/, "").trim();
  const design = topic.category === "Designs" || topic.slug.includes("method");
  return {
    given: design
      ? `Build ${name} in classes. No Kubernetes. They will add a new type after you finish.`
      : `A codebase is getting messy around ${name.toLowerCase()}.`,
    find: design
      ? `v1 verbs, nouns, one invariant, then the seam for the next variant.`
      : `What problem this idea solves, the three types, and when a function is enough.`,
    example: topic.practiceIdeas[0] ?? topic.whenToUse[0] ?? example,
    askedAs: askedFrom(topic, [
      design ? `Design ${name}. Classes, then I add a variant.` : `When would you use this — without naming the pattern first?`,
      topic.practiceIdeas[0],
      topic.interviewTips[0],
    ]),
  };
}

function stripName(summary: string, title: string) {
  const short = title.replace(/'s Algorithm/i, "").replace(/ Algorithm$/i, "").replace(/ Pattern$/i, "").trim();
  return summary
    .replace(new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig"), "this")
    .replace(new RegExp(short.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig"), "this")
    .replace(/\s+/g, " ")
    .trim();
}

function askedFrom(topic: Topic, lines: (string | undefined)[]) {
  const out = lines.map((line) => line?.replace(/\s+/g, " ").trim()).filter((line): line is string => Boolean(line));
  if (out.length >= 2) return out.slice(0, 4);
  return [...out, topic.pitfalls[0] ? `What goes wrong if ${topic.pitfalls[0].toLowerCase()}` : "Empty input, n=1 — what happens?"].slice(0, 4);
}
