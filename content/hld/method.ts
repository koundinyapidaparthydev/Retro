import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "hld-interview-method",
    track: "hld",
    category: "Method",
    title: "The 7-step HLD interview method",
    summary:
      "A repeatable structure for 45-minute system design: clarify, estimate, API, data, design, deepen, wrap — so you lead the room instead of drowning in boxes.",
    depth: "core",
    whyItMatters:
      "Interviewers grade communication and judgment as much as components. A perfect Kafka drawing that never locked requirements fails. This method keeps you on the clock, surfaces tradeoffs, and leaves time for the one deep dive they actually care about.",
    theory: [
      "Steps 1–2 (about 8–11 min). Restate the product in one sentence. Split functional (what the user can do) from non-functional (QPS, latency, consistency, availability, compliance). Ask who the users are, read vs write, and what you can defer to v2. Write 4–7 functional bullets and 4 NFRs on the board — silence is you designing the wrong system. Then convert DAU and actions into peak QPS, storage/year, and bandwidth. Separate reads and writes; call out fan-out and a hot-key guess. Round loudly. Those numbers choose SQL vs object store, one region vs two, cache vs no cache.",
      "Steps 3–4 (about 7–10 min). List the external endpoints or events: REST/gRPC methods, auth, pagination, idempotency keys, error shapes. This prevents a floating architecture with no contract. Mention web vs mobile vs workers if it changes protocol (SSE vs poll). Then the data model: entities, keys, and what is strongly consistent. Pick stores by access pattern — OLTP rows, object bytes, search documents, streams. Say primary key, shard key, and TTL. Do not normalize a social graph into twenty joins on the read path unless you explain the cache.",
      "Step 5 (8–10 min). Draw the request path: DNS/CDN, LB, app, cache, DB, queue, workers, object store. Talk through one write and one read end-to-end. Name failure hops. Keep the first diagram coarse — 6–10 boxes — then zoom. This is the skeleton they will interrupt; do not start with twenty microservices.",
      "Step 6 (10–15 min). Pick two or three hard parts the prompt implies: unique IDs, feed fan-out, rate limits, inventory consistency, multi-region, search ranking, upload pipeline. For each, give alternatives and a recommendation with a tradeoff. This is where senior signal lives. If they steer, follow — do not finish your script over their question.",
      "Step 7 (3–5 min). Show 10x growth: what you shard, what you cache, what becomes async. Mention observability (RED + traces), SLOs, deploy strategy, and one security note (authz, PII, secrets). End with known limitations and v2. A calm wrap beats a frantic extra box at 44:00.",
    ],
    howItWorks: [
      "Open with a recap and a timebox: 'I'll clarify, estimate, then sketch, then dive on X.'",
      "Write requirements where they can see them; tick them as the design covers each.",
      "Drive the diagram from a user action, not from 'we need Kafka because scale.'",
      "When interrupted, answer, then return to the next step so you do not skip estimates or data.",
      "Leave 3 minutes to recap bottlenecks and how the design evolves.",
    ],
    whenToUse: [
      "Classic 45–60 minute HLD loops: feeds, chat, URL shortener, rides, video, payments.",
      "Take-home or onsite presentations — same spine, more depth on one dive.",
      "Your own design docs: the steps map to sections reviewers expect.",
    ],
    whenNotToUse: [
      "Do not force all seven steps into a 20-minute 'design this class' LLD prompt.",
      "Do not cling to the script if the interviewer says 'skip estimates, talk multi-region.'",
    ],
    tradeoffs: [
      "More time on requirements: you build the right thing, less ink on fancy boxes.",
      "More time on deep dives: senior signal, risk of an incomplete skeleton.",
      "Generic textbook diagram: fast and shallow; product-specific constraints: slower and hireable.",
    ],
    interviewTips: [
      "Narrate tradeoffs in pairs: 'push vs pull feed,' 'SQL vs Cassandra,' 'exactly-once vs at-least-once + idempotent consumer.'",
      "If stuck, go back to the NFR you wrote: 'our p99 is 200ms, so this hop cannot be a cross-region sync write.'",
      "Ask permission to assume: 'OK to assume we can lose 1s of likes but not payments?'",
      "Draw one happy path, then one failure (timeout, duplicate, AZ down).",
    ],
    pitfalls: [
      "Jumping to microservices before the data model exists.",
      "Never stating consistency or idempotency on writes.",
      "Designing for FAANG scale when they asked for an MVP, or the reverse.",
      "Talking only technologies ('Redis, Kafka, S3') without responsibilities.",
    ],
    practiceIdeas: [
      "Timebox yourself on URL shortener and newsfeed using only this 7-step outline.",
      "Record a 45-minute mock and mark where you skipped estimates or never wrapped.",
      "For each classic design in this track, write a one-page 7-step skeleton before drawing.",
    ],
    related: [
      "back-of-envelope",
      "availability-vs-reliability",
      "cap-theorem",
      "url-shortener",
      "newsfeed",
      "observability",
      "sli-slo-sla",
    ],
  },
];
