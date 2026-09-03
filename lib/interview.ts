import type { Topic } from "@/content/schema";
import { GUIDES, type InterviewGuide } from "@/content/interview";

const HLD_ANSWER = [
  {
    label: "1. Clarify",
    say: "Restate the product in one sentence. Write functional vs non-functional. Ask who the users are, read vs write, and what is v2.",
  },
  {
    label: "2. Estimate",
    say: "Turn DAU into peak QPS, storage, and bandwidth. Split reads and writes. Guess a hot key. Those numbers pick the stores.",
  },
  {
    label: "3. API",
    say: "Name the 3–6 endpoints or events. Auth, pagination, idempotency, error shape. No floating boxes without a contract.",
  },
  {
    label: "4. Data",
    say: "Entities, primary key, shard key, TTL. Pick SQL / KV / object / search / stream by access pattern, not fashion.",
  },
  {
    label: "5. Sketch",
    say: "Draw one write and one read: DNS → LB → app → cache → DB → queue. Six to ten boxes. Talk failures on the hops.",
  },
  {
    label: "6. Deep dive",
    say: "Pick two hard parts this prompt implies. Give two options and a pick with a tradeoff. Follow their interrupt.",
  },
  {
    label: "7. Wrap",
    say: "10x growth, one AZ down, SLOs, one security note, known limits. Sit down before the last frantic box.",
  },
];

const LLD_ANSWER = [
  {
    label: "1. Scope",
    say: "Actors, five v1 verbs max, and what is out of scope. Ask: concurrent? persistent?",
  },
  {
    label: "2. Nouns",
    say: "Tag entity / value / service / port. Collapse synonyms. Pick the aggregate root.",
  },
  {
    label: "3. Invariants",
    say: "Write two rules that must always stay true. Those become the methods you protect, not setters.",
  },
  {
    label: "4. Classes",
    say: "A dozen types. Interfaces on the axis that will change (fee, scheduler, payment). Public signatures with types.",
  },
  {
    label: "5. Sequence",
    say: "Walk one happy path and one failure. Shorten getter chains into tells.",
  },
  {
    label: "6. Code the heart",
    say: "Implement the method that guards the invariant. Talk while you type.",
  },
  {
    label: "7. Variant",
    say: "Name the seam: 'new type = new class here.' Tests you would write. Do not rewrite five switches.",
  },
];

function productName(topic: Topic) {
  return topic.title
    .replace(/^Design (a |an |the )?/i, "")
    .replace(/\s+\(.*\)$/, "")
    .trim();
}

function fallback(topic: Topic): InterviewGuide {
  const name = productName(topic);
  const design = topic.category.toLowerCase().includes("design");

  if (topic.track === "hld") {
    if (design || topic.slug === "hld-interview-method") {
      return {
        askedAs: [
          `"Design ${name}." (no code, 45 minutes, whiteboard.)`,
          `"How would ${name} work for 10 million users?"`,
          `"Start from the user. I will interrupt."`,
        ],
        theyWant: [
          "You lock requirements before drawing Kafka.",
          "A coarse path, then one deep dive they care about.",
          "A tradeoff you would actually ship — not a component dump.",
        ],
        opening: `I'd treat this as a 45-minute HLD. First I lock v1 of ${name}: who uses it, read vs write, latency, and what we can defer.`,
        answerSteps: HLD_ANSWER,
        followUps: [
          {
            q: "QPS is 10× what you estimated.",
            a: "Cache the read path, shard the hot key, move writes off the request (queue + worker). Say which hop dies first.",
          },
          {
            q: "The primary database is down.",
            a: "Reads from replicas if they can be stale; writes fail or go to a queue. Multi-AZ first, then multi-region if they ask.",
          },
          {
            q: "Do we need strong consistency?",
            a: "Ask which write cannot be wrong (pay, seat, unique alias). Everything else can be eventual with a repair story.",
          },
        ],
      };
    }

    return {
      askedAs: [
        `"Explain ${topic.title} like I have to pick it today."`,
        `"We are seeing X — would you introduce this?"`,
        `"What's the alternative, and when does it win?"`,
      ],
      theyWant: [
        "A one-line definition, then a tradeoff, then a pick tied to an NFR.",
        "Not a textbook recitation of CAP or Kafka internals.",
        "You can place this box on a real diagram.",
      ],
      opening: `${topic.summary} I'd only add it if a requirement we wrote down actually needs it.`,
      answerSteps: [
        { label: "Define", say: topic.summary },
        {
          label: "When it shows up",
          say: topic.whenToUse[0] ?? "It shows up when a constraint (scale, consistency, fan-out) forces it.",
        },
        {
          label: "Tradeoff",
          say: topic.tradeoffs?.[0] ?? topic.whenNotToUse?.[0] ?? "Name what you give up by picking it.",
        },
        {
          label: "Put it on the board",
          say: "Point at the hop: client, edge, app, cache, DB, or async. Say who owns failure.",
        },
        {
          label: "Follow-up ready",
          say: topic.interviewTips[0] ?? "If they poke, return to the NFR you wrote — latency, consistency, or cost.",
        },
      ],
      followUps: [
        {
          q: "Why not the simpler thing?",
          a: topic.whenNotToUse?.[0] ?? "Say when the simpler thing is enough. Seniors skip boxes.",
        },
        {
          q: "Where does this fail?",
          a: topic.pitfalls[0] ?? "Name the failure mode (split brain, stampede, poison message) and the mitigation.",
        },
      ],
    };
  }

  if (topic.track === "lld") {
    if (design || topic.slug === "lld-interview-method" || topic.slug === "add-a-variant") {
      return {
        askedAs: [
          `"Design ${name} in code. Classes, not Kubernetes."`,
          `"Here's a parking-lot / elevator / Splitwise style prompt. You have 40 minutes."`,
          `"When you're done I'm going to add a new type / fee / thread-safety."`,
        ],
        theyWant: [
          "A small working core, not 30 empty boxes.",
          "Invariants you can point at in occupy() / book() / split().",
          "A seam so the variant is a new class, not a rewrite.",
        ],
        opening: `I'd keep this in-process. v1 verbs for ${name}, then nouns, invariants, one sequence, then I code the heart.`,
        answerSteps: LLD_ANSWER,
        followUps: [
          {
            q: "Add a new type (EV, surge, weekend price, undo).",
            a: "Point at the interface you left. Add a class. Wire it in the factory. Same sequence.",
          },
          {
            q: "Now two threads call the same method.",
            a: "Name the shared map. Lock the aggregate (or the floor), or make the operation idempotent. Do not lock the world.",
          },
          {
            q: "How do you test it?",
            a: "Invariant tests + one happy sequence + the variant. Fake the clock and the payment port.",
          },
        ],
      };
    }

    return {
      askedAs: [
        `"When would you use ${topic.title}?"`,
        `"Our class is growing a switch — what do you do?"`,
        `"Draw it. Then tell me when you would not use it."`,
      ],
      theyWant: [
        "Problem first, pattern second.",
        "A tiny structure (3 types), not a GoF dump.",
        "When the pattern is a smell (Singleton, Visitor).",
      ],
      opening: `I wouldn't name the pattern first. I'd say the problem ${topic.title.toLowerCase()} solves, then the three types.`,
      answerSteps: [
        { label: "Problem", say: topic.summary },
        {
          label: "Shape",
          say: topic.howItWorks[0] ?? "Interface + two concretes + a client that does not switch.",
        },
        {
          label: "Use it",
          say: topic.whenToUse[0] ?? "When one axis of change should not rewrite the caller.",
        },
        {
          label: "Don't",
          say: topic.whenNotToUse?.[0] ?? "If there is only one behavior, a function is enough.",
        },
        {
          label: "Variant",
          say: "The follow-up is always 'add another kind.' That should be a new class.",
        },
      ],
      followUps: [
        {
          q: "Isn't this overkill?",
          a: topic.whenNotToUse?.[0] ?? "Yes, if there is one variant. YAGNI until the second algorithm appears.",
        },
        {
          q: "Show it in the parking-lot / checkout design.",
          a: "Drop the interface on the changing axis (FeePolicy, Payment, Scheduler) and keep the service thin.",
        },
      ],
    };
  }

  return {
    askedAs: [
      `"Here's an array / graph / string. What do you do?"`,
      `"Can you do better than O(n²)?"`,
      `"Walk me through an example, then code."`,
    ],
    theyWant: [
      "A brute force, then the insight, then complexity.",
      "An invariant you can say before the loop.",
      "Edge cases: empty, n=1, already sorted, duplicates.",
    ],
    opening: `I'd restate the goal, try a tiny example, then say the pattern: ${topic.title.toLowerCase()}.`,
    answerSteps: [
      { label: "Restate", say: topic.summary },
      { label: "Example", say: "Dry-run a 5-element case out loud before typing." },
      { label: "Approach", say: topic.howItWorks[0] ?? "Name the pattern and the invariant." },
      {
        label: "Complexity",
        say: topic.complexity
          ? `Time ${topic.complexity.time}, space ${topic.complexity.space}.`
          : "State time and space before they ask.",
      },
      { label: "Tests", say: topic.pitfalls[0] ?? "Empty, n=1, and the case that infinite-loops." },
    ],
    followUps: [
      {
        q: "Can you do it with less memory / faster?",
        a: topic.tradeoffs?.[0] ?? "Name the next structure: two pointers, heap, or binary search on the answer.",
      },
    ],
  };
}

export function interviewGuide(topic: Topic): InterviewGuide {
  return GUIDES[`${topic.track}:${topic.slug}`] ?? GUIDES[topic.slug] ?? fallback(topic);
}

export function isDesignTrack(topic: Topic) {
  return topic.track === "hld" || topic.track === "lld";
}
