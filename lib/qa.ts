import { GUIDES } from "@/content/interview";
import type { SpokenAnswer, Topic } from "@/content/schema";

export type TopicQa = {
  howQuestionsCome: string[];
  howToAnswer: SpokenAnswer;
};

const OVERRIDES: Record<string, TopicQa> = {
  "dsa:binary-search": {
    howQuestionsCome: [
      `"Find a number in a sorted array faster than a scan."`,
      `"First index of target. Then the last."`,
      `"The array is rotated — still O(log n)?"`,
      `"Minimum k such that we can finish the job."`,
    ],
    howToAnswer: {
      firstMinute:
        "I'd confirm the array — or the predicate — is monotonic. Then binary search: lo, hi, mid = lo + (hi-lo)//2, throw away the half that cannot hold the answer. I say the invariant out loud: if the target exists it is still in [lo, hi].",
      deepDive:
        "Offer first/last occurrence (biased shrink), overflow-safe mid, and binary search on the answer if they switch to a feasibility check. Mention the infinite-loop when both bounds move to mid.",
    },
  },
  "dsa:bfs": {
    howQuestionsCome: [
      `"Shortest path in a maze / word ladder."`,
      `"Minimum moves to unlock this combination."`,
      `"Why not DFS?"`,
      `"What if there are several starts — rotting oranges?"`,
    ],
    howToAnswer: {
      firstMinute:
        "Unweighted shortest path is BFS. Queue, mark visited on enqueue so the frontier does not explode, store dist or parent. The first time I see the target is the hop-shortest path.",
      deepDive:
        "Offer multi-source BFS (several starts at dist 0), grid neighbors, and when I would switch to Dijkstra (weighted) or 0-1 BFS. Reconstruct the path from parent.",
    },
  },
  "dsa:knapsack-01": {
    howQuestionsCome: [
      `"Max value with a weight cap, each item once."`,
      `"Partition equal subset sum — can we split the array?"`,
      `"How is this different from coin change?"`,
      `"Can you roll it to 1-D?"`,
    ],
    howToAnswer: {
      firstMinute:
        "0/1 knapsack: each item at most once. dp[c] is best value with capacity c. For each item I walk capacity backward so I do not reuse it in the same pass. Answer is dp[W].",
      deepDive:
        "Say 'backward loop' so they know it is not unbounded. Partition equal subset is this table with boolean OR. If they allow repeats, that is unbounded / coin change — forward loop.",
    },
  },
  "dsa:two-pointers": {
    howQuestionsCome: [
      `"Two numbers that add to target in a sorted array."`,
      `"Do it in O(n) not O(n²)."`,
      `"Container with most water / three sum."`,
    ],
    howToAnswer: {
      firstMinute:
        "Sorted, so I can put a finger on each end. Too big — move right left. Too small — move left right. One pass, no nested pair loop.",
      deepDive:
        "Three sum is sort + this for each i. If they unsort the array I hash instead. Say the invariant: everything left of L is too small to try again.",
    },
  },
  "hld:url-shortener": {
    howQuestionsCome: [
      `"Design bit.ly."`,
      `"Short links for SMS. Whiteboard it."`,
      `"How does redirect work at 50k QPS?"`,
      `"301 or 302?"`,
    ],
    howToAnswer: {
      firstMinute:
        "v1 is mint a unique code and 302 fast. Redirects dwarf writes. POST /urls mints Snowflake→base62, writes SQL. GET /{code} hits Redis, then SQL, then 302. Analytics stay off the read path.",
      deepDive:
        "Offer 301 vs 302, custom aliases as a CP write, bloom for missing codes, and why the table is not only Redis if links must survive a flush.",
    },
  },
  "hld:cap-theorem": {
    howQuestionsCome: [
      `"SQL is down across the ocean. What does CAP say?"`,
      `"Why can't chat receipts be consistent and available?"`,
      `"Are we CA?"`,
    ],
    howToAnswer: {
      firstMinute:
        "When the network splits I must choose: refuse writes (CP) or take writes that may conflict (AP). I pick from the requirement, not a slogan. Unique alias is CP. Likes are AP.",
      deepDive:
        "Point at each write on the board. Offer PACELC when they say there is no partition — latency vs consistency. Quorum / Raft is how CP is implemented.",
    },
  },
  "lld:parking-lot": {
    howQuestionsCome: [
      `"Design a parking lot. Classes please."`,
      `"Cars, bikes, EV. Then weekend pricing."`,
      `"Two cars, one last spot."`,
    ],
    howToAnswer: {
      firstMinute:
        "v1 verbs: park and unpark. The lot owns floors and spots. A ticket records the stay. Fees are a FeePolicy, not a switch in unpark. occupy() enforces one vehicle per spot.",
      deepDive:
        "When they add EV, add a spot type and a finder preference. Weekend rates = new policy. Last-spot race: lock the lot or the floor around find+occupy.",
    },
  },
  "lld:strategy-pattern": {
    howQuestionsCome: [
      `"Payment can be card or UPI. Don't use a switch."`,
      `"When do you use Strategy?"`,
      `"Elevator — now add peak-hour dispatch."`,
    ],
    howToAnswer: {
      firstMinute:
        "The algorithm varies, the caller shouldn't. Checkout holds a Payment interface. Card and UPI are two classes. I would not name the pattern first — I name the varying step.",
      deepDive:
        "Show two concretes and the inject site. Adding Wallet is a new class. If there is only one algorithm forever, a function is enough — say that.",
    },
  },
};

function fromGuide(topic: Topic): TopicQa | undefined {
  const guide = GUIDES[`${topic.track}:${topic.slug}`] ?? GUIDES[topic.slug];
  if (!guide) return undefined;
  const dive = guide.answerSteps
    .filter((step) => /dive|variant|data|code|wrap|sketch/i.test(step.label))
    .map((step) => step.say)
    .join(" ");
  const follow = guide.followUps[0] ? ` If they ask “${guide.followUps[0].q}”: ${guide.followUps[0].a}` : "";
  return {
    howQuestionsCome: guide.askedAs.slice(0, 4),
    howToAnswer: {
      firstMinute: guide.opening,
      deepDive: (dive || guide.answerSteps.slice(-2).map((step) => step.say).join(" ")) + follow,
    },
  };
}

function generateQa(topic: Topic): TopicQa {
  const name = topic.title.replace(/^Design (a |an |the )?/i, "").replace(/\s+\(.*\)$/, "").trim();
  const tip = topic.interviewTips[0];
  const pit = topic.pitfalls[0];
  const trade = topic.tradeoffs?.[0] ?? topic.whenNotToUse?.[0];

  if (topic.track === "dsa") {
    return {
      howQuestionsCome: [
        `"Here's an array / graph / string. Can you use ${name}?"`,
        tip ? `"${tip}"` : `"Can you do better than the brute force?"`,
        `"Walk a tiny example, then code."`,
        pit ? `"What goes wrong if ${pit.toLowerCase()}"` : `"Empty input, n=1, already sorted — what happens?"`,
      ].slice(0, 4),
      howToAnswer: {
        firstMinute: `${topic.summary} I'd dry-run a tiny case first, then say the invariant and the complexity${topic.complexity ? ` (${topic.complexity.time} time, ${topic.complexity.space} space)` : ""}.`,
        deepDive: `Offer the next notch: ${topic.howItWorks[1] ?? topic.howItWorks[0]}. ${trade ? `Tradeoff: ${trade}` : ""} ${tip ?? ""}`.trim(),
      },
    };
  }

  if (topic.track === "hld") {
    const design = topic.category.toLowerCase().includes("design") || topic.slug.includes("method");
    if (design) {
      return {
        howQuestionsCome: [
          `"Design ${name}."`,
          `"How would ${name} work for 10 million users?"`,
          `"Start from the user. I will interrupt."`,
          pit ? `"What if ${pit.toLowerCase()}"` : `"The primary is down — now what?"`,
        ],
        howToAnswer: {
          firstMinute: `I'd treat this as a 45-minute HLD. First I lock v1 of ${name}: who uses it, read vs write, latency, what is v2. ${topic.summary}`,
          deepDive: `Then API, data, one write path and one read path. Deep dive: ${topic.howItWorks[0] ?? tip}. ${trade ?? ""}`.trim(),
        },
      };
    }
    return {
      howQuestionsCome: [
        `"Explain ${topic.title} like I have to pick it today."`,
        `"We're seeing pain — would you introduce this?"`,
        `"What's the alternative, and when does it win?"`,
        tip ? `"${tip}"` : `"Draw it on this newsfeed diagram."`,
      ],
      howToAnswer: {
        firstMinute: `${topic.summary} I'd only add it if a requirement we wrote down actually needs it. ${topic.whenToUse[0] ?? ""}`,
        deepDive: `Tradeoff: ${trade ?? topic.howItWorks[0]}. Failure mode: ${pit ?? "name the hop that dies first."} ${tip ?? ""}`.trim(),
      },
    };
  }

  const design = topic.category === "Designs" || topic.slug.includes("method") || topic.slug === "add-a-variant";
  if (design) {
    return {
      howQuestionsCome: [
        `"Design ${name} in code. Classes, not Kubernetes."`,
        `"When you're done I'm going to add a new type / fee / thread."`,
        `"What's the invariant?"`,
        tip ? `"${tip}"` : `"Two threads call the same method."`,
      ],
      howToAnswer: {
        firstMinute: `I'd keep this in-process. v1 verbs for ${name}, then nouns, invariants, one sequence, then I code the heart. ${topic.summary}`,
        deepDive: `Seam for the variant: ${topic.howItWorks[topic.howItWorks.length - 1] ?? tip}. ${trade ?? ""}`.trim(),
      },
    };
  }

  return {
    howQuestionsCome: [
      `"When would you use ${topic.title}?"`,
      `"Our class is growing a switch — what do you do?"`,
      `"Draw it. Then tell me when you would not."`,
      tip ? `"${tip}"` : `"Isn't this overkill?"`,
    ],
    howToAnswer: {
      firstMinute: `I wouldn't name the pattern first. I'd say the problem ${topic.title.toLowerCase()} solves, then the three types. ${topic.summary}`,
      deepDive: `Shape: ${topic.howItWorks[0]}. Don't: ${topic.whenNotToUse?.[0] ?? "one algorithm forever — a function is enough."} ${tip ?? ""}`.trim(),
    },
  };
}

export function topicQa(topic: Topic): TopicQa {
  if (topic.howQuestionsCome?.length && topic.howToAnswer) {
    return { howQuestionsCome: topic.howQuestionsCome, howToAnswer: topic.howToAnswer };
  }
  return OVERRIDES[`${topic.track}:${topic.slug}`] ?? OVERRIDES[topic.slug] ?? fromGuide(topic) ?? generateQa(topic);
}
