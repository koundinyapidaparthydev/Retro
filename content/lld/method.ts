import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "lld-interview-method",
    track: "lld",
    category: "Interview Method",
    title: "How to structure an LLD interview (7 steps)",
    summary:
      "A repeatable 7-step loop: clarify, actors/use cases, nouns, invariants, class diagram, one sequence, then code the heart. Time-box so you finish a working core.",
    depth: "core",
    whyItMatters:
      "Most LLD failures are process failures: 25 minutes of nouns, no API, no code. A spoken structure makes you look senior and leaves room for the variant they will add.",
    theory: [
      "Steps 1–2 — Clarify scope, then lock v1 verbs. Spend 3–4 minutes on actors, must-have use cases, and explicit out-of-scope (auth, multi-region, pretty UI). Ask the two questions that change the design: concurrency? persistence? Write the answers. Then list at most five verbs (park/unpark, request/assign, book/cancel). Those verbs become public methods on a service facade. If you cannot list them, you cannot draw a sequence later. YAGNI everything else.",
      "Steps 3–4 — Filter nouns, then write invariants. Tag each noun entity / value / service / port / field and collapse synonyms so you do not invent TicketPaperClass. Next write two or three rules that must always hold and draw has-a / is-a / uses-a with multiplicity. Pick aggregate roots. If you skip this, occupy() will be a setter.",
      "Steps 5–6 — Draw implementable APIs, then one story. Put verbs and types on the methods (`park(Vehicle): Result<Ticket>`), put interfaces on variation axes (FeePolicy, Scheduler), and keep the diagram to a dozen types. Walk one happy-path sequence plus one failure (lot full, payment decline). Adjust APIs until the story is short tells, not getter chains.",
      "Step 7 — Code the heart with the time you have left. Implement the aggregate method that protects the invariant, then the service that sequences it. Talk while you type. Leave the extension point unused until they ask — that is the add-a-variant test. If 15 minutes remain and you still have no code, jump here with a smaller diagram.",
      "The method is a time-box, not a ritual. Speak the plan in 15 seconds so the interviewer can help you scope. Reserve five minutes at the end for 'how I'd test this' and the likely variant. A smaller finished core beats an encyclopedic diagram you never coded.",
    ],
    howItWorks: [
      "Start the clock with step 1 spoken aloud.",
      "Write use cases in a corner and never lose them.",
      "Do not code before a signature exists for the main verb.",
      "If 15 minutes remain and you have no code, jump to step 7 with a smaller diagram.",
      "Reserve 5 minutes for the variant and for 'how I'd test this'.",
    ],
    whenToUse: [
      "Every object-design interview, onsite or take-home sketch.",
      "When you feel yourself pattern-dumping — return to step 1.",
    ],
    whenNotToUse: [
      "A pure algorithm prompt (implement LRU only) — still name API + complexity, skip noun tagging.",
      "HLD rounds — this method is class-level, not cluster-level.",
    ],
    tradeoffs: [
      "Process overhead vs getting lost. Seven steps is a lot if you whisper them; speaking them fast is cheap.",
      "A smaller finished core beats an encyclopedic diagram.",
    ],
    interviewTips: [
      "Tell the interviewer the plan in 15 seconds. They will help you scope.",
      "If they rush you to code, keep the invariant sentence and the main signature — drop the pretty UML.",
      "End with test list + extension point even if code is incomplete.",
    ],
    pitfalls: [
      "Drawing 30 boxes and implementing none.",
      "Coding the printer and the SQL before park().",
      "Silent work — they cannot give hints.",
    ],
    practiceIdeas: [
      "Time-box parking lot to 40 minutes using only these steps; record yourself.",
      "Do elevator in 25 minutes: states + scheduler interface + one car coded.",
    ],
    related: [
      "add-a-variant",
      "nouns-to-classes",
      "class-diagrams",
      "sequence-diagrams",
      "kiss",
    ],
  },
  {
    slug: "add-a-variant",
    track: "lld",
    category: "Interview Method",
    title: "The 'add a variant' test",
    summary:
      "The real exam is the follow-up: new vehicle, new scheduler, weekend price, thread safety, undo. Your first design should absorb it by adding a type, not by editing five switches.",
    depth: "core",
    whyItMatters:
      "Interviewers decide in the variant. If FeePolicy already exists, you look prepared. If you hard-coded cars in four methods, you rewrite under pressure and leak invariants.",
    theory: [
      "Predict one or two axes from the prompt and leave a seam: a Strategy, a State, a Port, a Plugin hook. Do not implement the second family until they ask (YAGNI + OCP). Say the sentence: 'If you add another X I will add a class here.'",
      "Common variants and the seam they want: new type of thing → factory + interface; new algorithm → Strategy; new status → State or transition table; new IO → Port; now concurrent → owner/lock/actor on the shared map; now undo → Command/Memento; now persist → Repository; now notify → Observer/dispatcher.",
      "When the variant arrives, do not panic-edit. Point at the seam, add the type, wire it in the factory, run the same sequence. If you have no seam, extract it live and narrate — that is still a pass if you are clean.",
      "Some variants are traps to overbuild (Kafka for a vending machine). Push back with KISS: 'I would keep this in-process and put a queue port if we needed reliability.' Judgment is part of the test.",
    ],
    howItWorks: [
      "After the first diagram, name the likely variant and the interface that absorbs it.",
      "Implement only one concrete.",
      "When they add the variant, add a class + a factory line.",
      "Re-walk the sequence to prove the use case did not change.",
      "If the variant is concurrency, name the owner of each mutable structure before adding locks.",
    ],
    whenToUse: [
      "Every LLD after the first working path.",
      "When reviewing your own design: 'what would break if they add X?'",
    ],
    whenNotToUse: [
      "Inventing four variants yourself and implementing all of them unasked.",
      "Treating a bug fix as a variant — just fix the invariant.",
    ],
    tradeoffs: [
      "A unused interface vs a painful rewrite. One predicted seam is cheap; five is architecture astronautics.",
    ],
    interviewTips: [
      "Practice the top variants per problem (see designs). Parking: EV + weekend fee. Elevator: SCAN. Checkout: coupon + decline.",
      "Say 'this is the Open/Closed point' when you add the class.",
      "If they add a variant you cannot absorb, extract the interface in front of them — show the refactor, do not apologize for five minutes.",
    ],
    pitfalls: [
      "Switches in three classes that all need the new case.",
      "Building Abstract Factory on spec for one product.",
      "Accepting an HLD-scale variant without renegotiating scope.",
    ],
    practiceIdeas: [
      "Solve parking lot, then add EV spots and surge pricing without editing Lot.park.",
      "Solve vending, then add card payment via a PaymentMethod strategy.",
    ],
    related: [
      "lld-interview-method",
      "solid-ocp",
      "strategy-pattern",
      "yagni",
      "pattern-cheatsheet",
    ],
  },
];
