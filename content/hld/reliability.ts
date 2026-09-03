import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "health-checks",
    track: "hld",
    category: "Reliability",
    title: "Health checks and graceful shutdown",
    summary:
      "Liveness vs readiness, drain, and SIGTERM — how you leave the load balancer without cutting in-flight work.",
    depth: "core",
    whyItMatters:
      "Deploys and autoscaling cause more outages than cosmic rays. A /health that only checks the process is a lie. Graceful shutdown is the difference between 5xx storms and boring rollouts.",
    theory: [
      "Liveness answers 'should the orchestrator kill me?' — deadlock, stuck event loop. A failing liveness restarts the container. Keep it cheap and do not depend on a downstream that is merely slow, or you will restart-loop during a DB blip. Readiness answers 'should I receive traffic?' — warmed caches, migrated schema, DB pool, and 'I am not draining.' Failing readiness removes you from the LB.",
      "Startup probes delay the others so slow boots do not flap. Health checks should exercise a shallow dependency (SELECT 1, ping Redis) on readiness, not a full user journey (that belongs in synthetics). Fail-slow nodes pass TCP and fail the real path — add saturation: if the event loop is 2s behind, go not-ready.",
      "Graceful shutdown: stop announcing ready → wait LB/deregister (propagation + health interval) → stop accepting new work → finish in-flight (timeout) → close pools → exit. Kubernetes: preStop + terminationGracePeriodSeconds longer than drain. SIGKILL after the grace window is a hard cut; size it from p99 request time, not hope.",
    ],
    howItWorks: [
      "Split /live and /ready; only /ready is on the LB.",
      "On SIGTERM: ready=false, sleep for LB interval, drain, then exit.",
      "Make in-flight work abortable with a deadline.",
      "Do not let readiness depend on a non-critical third party (email).",
      "Synthetic checks from outside the cluster for the user path.",
    ],
    whenToUse: [
      "Every horizontally scaled service and worker.",
      "Before you add fancy canaries — boring drain first.",
      "Queue consumers: stop taking messages, finish the current one, nack the rest.",
    ],
    whenNotToUse: [
      "Do not restart on a failing deep check that is actually 'dependency down' — that is readiness or an alert.",
      "Do not set a 1s grace period on a 30s upload handler.",
    ],
    tradeoffs: [
      "Deep health checks: truer signal, coupled failures and extra load.",
      "Long drain: safer, slower deploys and scale-in.",
      "Fail-closed ready: fewer bad requests, more capacity loss during blips.",
    ],
    interviewTips: [
      "When you mention Kubernetes or rolling deploys, add drain + readiness in one sentence.",
      "Workers need the same story as HTTP — visibility timeout vs shutdown.",
    ],
    pitfalls: [
      "One /health used for both live and ready.",
      "LB health interval 30s with TTL-like delays → traffic to dead pods.",
      "Ignoring in-flight WebSockets on shutdown.",
    ],
    practiceIdeas: [
      "Write a shutdown sequence for an HTTP+SQS process with timings.",
      "Design a readiness check that detects a full DB pool without SELECT-ing user tables.",
    ],
    related: [
      "blue-green-canary",
      "load-balancers",
      "service-discovery",
      "failure-modes",
      "bulkhead-circuit-breaker",
      "sli-slo-sla",
    ],
  },
  {
    slug: "bulkhead-circuit-breaker",
    track: "hld",
    category: "Reliability",
    title: "Bulkheads, circuit breakers, retries, and jitter",
    summary:
      "Isolate failure domains (pools, queues, threads) and fail fast when a dependency is sick — with retries that do not synchronize.",
    depth: "core",
    whyItMatters:
      "One slow payment vendor should not exhaust every API thread. This is the practical toolkit that sits next to backpressure theory. Interviewers listen for isolation + jitter, not just the words 'circuit breaker.'",
    theory: [
      "A bulkhead (ship compartment) limits how much of your process a dependency can consume: separate thread/connection pools, separate queues, separate thread pools per tenant, or separate clusters. When payments is stuck, search still runs. Kubernetes namespaces and separate node pools are bulkheads at infra level.",
      "Circuit breakers track recent errors/latency and open the circuit: fail immediately (or fallback) instead of queueing. Half-open lets a probe through. They need hysteresis so they do not flap. Combined with timeouts they bound the blast of a gray failure. They are not a substitute for fixing capacity.",
      "Retries recover from transient errors. Without jitter, everyone retries on the same cadence after an outage (herd). Exponential backoff + full jitter, retry budgets (max extra QPS), and idempotency make retries safe. Retry only when it can help (idempotent, or same key).",
    ],
    howItWorks: [
      "One pool/queue per dependency or per tenant class.",
      "Timeout < caller budget; circuit on error rate or p99.",
      "Retry with full jitter; cap attempts and total extra load.",
      "When open, serve fallback or a fast error — do not pile on.",
      "Dashboard: pool utilization, breaker state, retry rate.",
    ],
    whenToUse: [
      "Any outbound call to a service you do not control.",
      "Multi-tenant isolation of expensive APIs.",
      "Fan-out pages where one widget must not block the shell.",
    ],
    whenNotToUse: [
      "Do not retry non-idempotent charges.",
      "Do not share one 10k-thread pool across all dependencies 'for simplicity.'",
    ],
    tradeoffs: [
      "More bulkheads: isolation, more unused capacity and config.",
      "Aggressive breakers: protect you, more user-visible errors.",
      "Retries: higher success, higher load when the system is weakest.",
    ],
    interviewTips: [
      "Draw two pools on the API box: 'checkout vs recommendations.'",
      "Quote the retry-amplification math once; it sticks.",
    ],
    pitfalls: [
      "Breaker on 5xx including your own bugs — you hide deploys.",
      "Jitterless cron and retry alignment at :00.",
      "Circuit that never half-opens (stuck open forever).",
    ],
    practiceIdeas: [
      "Add bulkheads to a BFF that calls 6 services; pick pool sizes from QPS × latency.",
      "Simulate an outage and a synchronized retry vs jittered retry.",
    ],
    related: [
      "backpressure-retries",
      "hedged-requests",
      "fallback-degradation",
      "rate-limiting",
      "service-mesh",
      "hot-keys-partitions",
    ],
  },
  {
    slug: "hedged-requests",
    track: "hld",
    category: "Reliability",
    title: "Hedged requests",
    summary:
      "Send a backup request after a delay (or in parallel) to beat tail latency — and pay extra QPS for it.",
    depth: "advanced",
    whyItMatters:
      "Tail latency is often a lucky-slow replica, not a permanently slow cluster. Hedging (Tail at Scale) is a senior technique. Used blindly on writes it doubles mutations. Used well on idempotent reads it slashes p99.",
    theory: [
      "A hedged request starts a second copy if the first has not finished by a percentile threshold (e.g. p95). You take the first success and cancel the other. Google’s 'The Tail at Scale' popularized this for search. Cross-AZ or cross-replica hedges avoid a single slow disk. The extra load is small if you hedge only the tail, huge if you always dual-send.",
      "Hedging is a cousin of speculative retries and of quorum reads (you already wait on R). It works when slowness is uncorrelated. If the whole region is saturated, hedges make it worse — pair with load shedding and admission control. Never hedge non-idempotent writes without keys; you just invented duplicates.",
      "Tied requests send both at once (more load, better tails). Adaptive hedging uses outstanding-request counts. Envoy and gRPC support hedging/retry policies — still your job to mark methods safe.",
    ],
    howItWorks: [
      "Enable only on safe GETs or idempotent RPCs.",
      "Hedge after p95, not at t=0, unless QPS is tiny.",
      "Cancel losers; bound extra outstanding per backend.",
      "Disable automatically when the cluster is saturated (retry budget).",
      "Measure p99 improvement vs extra QPS — keep the graph.",
    ],
    whenToUse: [
      "Fan-out reads (search, multi-get) where one slow shard ruins the page.",
      "Cross-replica reads of immutable or versioned data.",
      "Mobile clients on flaky networks for idempotent fetches (carefully).",
    ],
    whenNotToUse: [
      "POSTs that create orders, unless the same idempotency key is guaranteed.",
      "When the backend is already at the red line.",
    ],
    tradeoffs: [
      "Better p99 vs more load and more duplicate work.",
      "Aggressive hedge delay: less extra QPS, smaller tail win.",
      "Cross-region hedges: huge latency win possible, huge cost and consistency risk.",
    ],
    interviewTips: [
      "Mention hedging when talking p99 of scatter-gather search.",
      "Immediately add 'idempotent + retry budget' so you do not sound reckless.",
    ],
    pitfalls: [
      "Hedging writes.",
      "No cancel — both results apply side effects.",
      "Hedging into the same overloaded replica set without outlier ejection.",
    ],
    practiceIdeas: [
      "For a 32-shard search, estimate page p99 with and without a p95 hedge.",
      "Design a retry budget: max 5% extra QPS fleet-wide.",
    ],
    related: [
      "percentiles",
      "backpressure-retries",
      "bulkhead-circuit-breaker",
      "search-inverted-index",
      "latency-vs-throughput",
      "idempotency-delivery",
    ],
  },
  {
    slug: "fallback-degradation",
    track: "hld",
    category: "Reliability",
    title: "Fallbacks, graceful degradation, and feature flags",
    summary:
      "Serve a worse but useful answer when a dependency fails — stale cache, hide a widget, or flip a flag — instead of a white page.",
    depth: "core",
    whyItMatters:
      "Availability is often 'degraded mode,' not 'all features up.' Interviewers like a homepage that still renders when recommendations are down. Flags are how you ship and how you turn off a burning feature without a rollback of everything.",
    theory: [
      "A fallback is a substitute response: last-known cache, default list, static config, or skip the panel. It must be correct enough (do not show another user's data) and obviously optional when it is. Timeouts trigger fallbacks; you should metric fallback rate as an SLO of the dependency, not hide it.",
      "Graceful degradation is a product plan: read-only mode, disable live comments, lower video bitrate, serve stale search. You decide priority of features before the incident. Load shedding drops low-priority traffic to save checkout. Both are better than equal-opportunity 500s.",
      "Feature flags (LaunchDarkly, home-grown) decouple deploy from release and provide a kill switch. Keep flag evaluation local/fast (cached). Flags in the hot path need a local default if the flag service dies — fail toward last-known or safe-off. Too many flags become a combinatorial test nightmare; expire them.",
    ],
    howItWorks: [
      "Rank features: must, should, nice; only 'must' blocks the page.",
      "On dependency failure, serve stale/empty/default and increment a metric.",
      "Ship risky features behind flags with a kill switch and an owner.",
      "Document read-only and 'sell queue only' modes for commerce.",
      "Test the fallback path — it is production code.",
    ],
    whenToUse: [
      "Homepages, feeds, search, recommendations, ads, non-critical personalization.",
      "Incident kill switches and ramped rollouts.",
      "Read-only mode during datastore failover.",
    ],
    whenNotToUse: [
      "Do not fallback a payment authorization to 'assume paid.'",
      "Do not leave permanent flags that nobody understands.",
    ],
    tradeoffs: [
      "Stale fallback: higher availability, consistency/UX risk.",
      "Hide widget: honest UX, looks 'broken' if overused.",
      "Flags: speed and safety, complexity and leftover debt.",
    ],
    interviewTips: [
      "For any social/media design, name one degraded mode (unpersonalized feed, no recs).",
      "Tie flags to canaries: 1% flag, not only 1% pods.",
    ],
    pitfalls: [
      "Fallback that leaks cache keys across users.",
      "Flag service outage taking down the app because evaluation is sync and fail-closed on the critical path.",
      "No metric — you never knew 40% of pages were fallback.",
    ],
    practiceIdeas: [
      "Design Instagram home if the ranking service dies.",
      "Write a flag policy: default, owner, expiry, and fail mode.",
    ],
    related: [
      "availability-vs-reliability",
      "blue-green-canary",
      "cache-patterns",
      "newsfeed",
      "bulkhead-circuit-breaker",
      "sli-slo-sla",
    ],
  },
  {
    slug: "chaos-engineering",
    track: "hld",
    category: "Reliability",
    title: "Chaos thinking",
    summary:
      "Deliberately inject failure (and latency) to verify that the design you drew actually survives — in staging first, then with a blast radius in prod.",
    depth: "advanced",
    whyItMatters:
      "HLD interviews sometimes ask 'how would you gain confidence?' Chaos is the answer beyond unit tests: kill an AZ, add 2s latency, expire certs. You are testing hypotheses about blast radius, not breaking things for sport.",
    theory: [
      "Chaos engineering (Netflix lineage) states a steady-state hypothesis (SLO holds), injects a fault, and measures. Start in staging or on a small % of prod with kill switches. Faults: instance death, AZ loss, packet loss, clock skew, dependency 500s, full disks, expired certs, poison messages. Game days add humans and runbooks.",
      "You cannot chaos a system with no SLOs or no rollback. Observability is a prerequisite. The value is finding the undocumented single points: a forgotten single-AZ Redis, a DNS TTL, a sync call you swore was async. Formalize results as tickets, not folklore.",
      "In an interview you will not run Gremlin. You will say which experiments match your failure modes and what you expect (read-only mode, hedge, fallback). That is 'chaos thinking' without the brand.",
    ],
    howItWorks: [
      "Write the hypothesis: 'if we kill one AZ, p99 stays < 300ms and error rate < 0.1%.'",
      "Inject one fault with a small blast radius and a hard stop.",
      "Watch SLOs, queues, and error budgets; abort if you are wrong.",
      "Fix the design or the runbook; re-run.",
      "Schedule game days for region failover, not only process kill.",
    ],
    whenToUse: [
      "After you have SLOs, deploys, and multi-AZ — to verify them.",
      "Before a launch that claims multi-region.",
      "To train on-call on the actual failure, not a wiki.",
    ],
    whenNotToUse: [
      "Do not chaos prod on a Friday with no abort and no error budget.",
      "Do not inject faults you have no mitigation for 'to see what happens' as the first experiment.",
    ],
    tradeoffs: [
      "Prod chaos: real confidence, real risk.",
      "Staging-only: safe, misses prod traffic shapes and data size.",
      "More experiments: more learning, more engineering time.",
    ],
    interviewTips: [
      "When they ask about multi-AZ, add 'we would game-day a failed AZ and measure RTO.'",
      "Name two experiments specific to your design (poison Kafka, clock jump on ID generators).",
    ],
    pitfalls: [
      "No abort switch.",
      "Chaos without dashboards — you only know because Twitter told you.",
      "Punishing teams for failed experiments instead of rewarding findings.",
    ],
    practiceIdeas: [
      "List five chaos experiments for a chat system and the expected mitigation.",
      "Plan an AZ-down game day with comms, abort, and success metrics.",
    ],
    related: [
      "failure-modes",
      "fault-tolerance-dr",
      "sli-slo-sla",
      "multi-az-multi-region",
      "observability",
      "unique-ids",
    ],
  },
  {
    slug: "blue-green-canary",
    track: "hld",
    category: "Reliability",
    title: "Blue-green, canary, and rolling deploys",
    summary:
      "How you ship new bits without a big-bang outage — two environments, a small slice of traffic, or instance-by-instance replacement.",
    depth: "core",
    whyItMatters:
      "Change is the top reliability killer. Your HLD should include a deploy story: migrations, compatible APIs, and how you halt a bad release before 100% of users eat it.",
    theory: [
      "Rolling: replace a fraction of instances at a time (K8s maxUnavailable/maxSurge). Cheap, uses one environment. Mid-roll you run two versions — APIs and schemas must be compatible. Drain each instance. Slow rolls reduce risk; fast rolls save time.",
      "Blue-green: two full environments. Flip the LB (or DNS) from blue to green after smoke tests. Instant rollback is flip back. Cost is 2× capacity during the switch. Session state and in-flight jobs must not be tied to a color. Good for coarse stacks and databases that can be switched with care.",
      "Canary: send 1–5% of traffic (or one region, or one tenant) to the new version, compare SLOs/errors/business metrics, then ramp. Best signal-to-risk. Needs traffic splitting (L7, mesh, flags) and automated abort. Combine with feature flags for even smaller blast (code is deployed dark).",
    ],
    howItWorks: [
      "Expand/contract schema: add columns nullable first, dual-write if needed, then switch reads.",
      "Keep N and N-1 API compatibility during the roll.",
      "Split traffic; watch error budget and key business KPIs; abort automatically.",
      "Run smoke and synthetic checks on the new version before the flip.",
      "Document rollback: flip, revert flag, or roll back the chart — practiced.",
    ],
    whenToUse: [
      "Rolling: default for stateless services on Kubernetes.",
      "Canary: high-QPS user-facing APIs and risky changes.",
      "Blue-green: infrequent, large, or hard-to-roll systems (some monoliths, edge).",
    ],
    whenNotToUse: [
      "Do not blue-green a stateful primary without a data plan — you will split writes.",
      "Do not canary a migration that only the new code understands without expand/contract.",
    ],
    tradeoffs: [
      "Rolling: cheap, mixed versions for longer.",
      "Blue-green: fast rollback, 2× infra.",
      "Canary: best safety, needs good metrics and split infra.",
    ],
    interviewTips: [
      "Mention expand/contract when you add a field to the user table.",
      "For mobile, canary is also staged rollouts in the app stores — different clock.",
    ],
    pitfalls: [
      "Breaking API in the same release as the last old client.",
      "Canary that is not statistically meaningful (10 requests).",
      "Migrations that lock the table during peak.",
    ],
    practiceIdeas: [
      "Write an expand/contract plan for renaming a column used by two services.",
      "Design a 1% → 10% → 50% → 100% canary with abort SLOs.",
    ],
    related: [
      "health-checks",
      "fallback-degradation",
      "load-balancers",
      "sli-slo-sla",
      "cdc",
      "service-mesh",
    ],
  },
  {
    slug: "multi-az-multi-region",
    track: "hld",
    category: "Reliability",
    title: "Multi-AZ vs multi-region",
    summary:
      "Availability zones are independent failure domains in one region. Regions are farther, legally distinct, and much harder for data. Do not confuse them.",
    depth: "core",
    whyItMatters:
      "Every serious design is multi-AZ. Multi-region is a product and consistency decision, not a checkbox. Interviews punish 'we deploy to three regions' with no data story, and punish single-AZ Redis in an otherwise HA drawing.",
    theory: [
      "An AZ is a building (or set) with independent power/network inside a cloud region, connected by cheap, low-latency links (sub-ms to low-ms). Multi-AZ: run LBs, app replicas, and the DB's sync standby across AZs. This is how you survive the common 'AZ blip' and still keep strong-ish consistency. Cross-AZ data transfer is not free but is the normal tax.",
      "A region is a geography (and often a legal boundary). RTT is tens to hundreds of ms. Sync commit across regions hurts writes. Async replication means RPO > 0. Multi-region is for user latency, disaster recovery, and residency (EU data stays in-region). You need geo-DNS, a conflict story, and a rehearseable failover.",
      "Typical pattern: active-active stateless compute in many regions, data active-passive or partitioned by user home region, caches local. Global tables (DynamoDB, Cockroach, Spanner) hide some pain and still have conflict/latency knobs. Do not put the only Kafka cluster or the only Redis in one AZ.",
    ],
    howItWorks: [
      "Default: 3 AZs for quorum stores and 2+ for apps.",
      "Pin a user's data to a home region when you can; serve reads locally from replicas/caches.",
      "Use sync replication inside the region; async or consensus-aware globally.",
      "Test AZ loss quarterly; treat region loss as a named DR plan with RPO/RTO.",
      "Watch cross-AZ and cross-region bytes — they show up on the bill and on p99.",
    ],
    whenToUse: [
      "Multi-AZ: all production user systems.",
      "Multi-region: global latency, residency, or contractual DR.",
      "Read replicas in a second region before you try active-active writes.",
    ],
    whenNotToUse: [
      "Do not 'multi-region' a tightly consistent inventory without naming conflicts.",
      "Do not call two AZs in one region 'geo-redundant DR.'",
    ],
    tradeoffs: [
      "Multi-AZ: small latency tax, large availability win.",
      "Multi-region active-passive: simpler data, minutes of RTO if you practice.",
      "Multi-region active-active: low RTO and latency, conflict and cost.",
    ],
    interviewTips: [
      "Draw two AZs minimum on every stateful box.",
      "Ask if users are global before you add regions — maybe one region + CDN is enough.",
    ],
    pitfalls: [
      "Single-AZ NAT, Redis, or Kafka.",
      "DNS TTL vs region failover.",
      "Assuming S3 is 'multi-region' when it is multi-AZ in one region (unless you replicate).",
    ],
    practiceIdeas: [
      "Redesign a single-AZ stack to multi-AZ and list the hidden singletons.",
      "Pick a data strategy for a EU+US SaaS with residency constraints.",
    ],
    related: [
      "active-active-passive",
      "fault-tolerance-dr",
      "dns-anycast-geo",
      "replication",
      "cap-theorem",
      "cost",
    ],
  },
  {
    slug: "active-active-passive",
    track: "hld",
    category: "Reliability",
    title: "Active-active vs active-passive",
    summary:
      "Whether both sites take writes, or only one does while the other stands by — the operational heart of multi-region.",
    depth: "next",
    whyItMatters:
      "Active-passive is how most teams actually survive a region loss. Active-active is how global products feel local. Mixing them up (two writers, no merge) is split-brain. You must pick a write topology and a failback plan.",
    theory: [
      "Active-passive (hot/warm/cold standby): all writes go to the primary region. The secondary replicates async (or is a nightly backup). Failover promotes the secondary, updates DNS/geo, and fences the old primary. RPO is replica lag; RTO is promotion + DNS + cache fill. Failback is a second migration — practice it or you will dual-write on the way home.",
      "Active-active: both sites accept writes. Options: (1) partition users by home region (no conflict if they stay home), (2) CRDTs/LWW for mergeable data, (3) a global consensus layer (expensive). Reads are local; conflicts are the product. Session stickiness to a region helps RYW. This is not the same as active-active HTTP frontends in front of a single primary DB — that is still one writer.",
      "Warm vs cold: warm runs the app stack and a replica; cold is backups and a restore runbook. Cost vs RTO. Many companies are active-active at the edge (CDN, auth) and active-passive at the ledger.",
    ],
    howItWorks: [
      "State the write topology on the board: one writer or many.",
      "If passive: replication mode, promotion steps, fencing, DNS.",
      "If active: conflict rule per datatype and a home-region for users.",
      "Keep a break-glass to go read-only globally.",
      "Rehearse failback, not only failover.",
    ],
    whenToUse: [
      "Active-passive: money, inventory, most B2B, first DR step.",
      "Active-active compute + passive data: common global SaaS.",
      "Active-active data: presence, profiles, mergeable social graphs — with rules.",
    ],
    whenNotToUse: [
      "Do not run two writable primaries for a ledger.",
      "Do not failover without fencing — split-brain is worse than downtime.",
    ],
    tradeoffs: [
      "Passive: simpler invariants, unused capacity and higher RTO.",
      "Active-active: latency and RTO, conflict and 2× write paths.",
      "Home-region pinning: few conflicts, worse UX for travelers unless you migrate.",
    ],
    interviewTips: [
      "Default line: 'active-active stateless, active-passive primary DB, async replica in DR region.'",
      "If they push global writes, shard by user home region first — it is still a clean story.",
    ],
    pitfalls: [
      "Asymmetric schemas between regions.",
      "Caches serving the old region's data after failover.",
      "No fence — old primary accepts writes after DNS flips.",
    ],
    practiceIdeas: [
      "Write a failover/failback runbook for a URL shortener with Redis + SQL.",
      "Design WhatsApp-like messaging active-active with per-user home and federation.",
    ],
    related: [
      "multi-az-multi-region",
      "fault-tolerance-dr",
      "leader-vs-leaderless",
      "replication",
      "failure-modes",
      "presence",
    ],
  },
];
