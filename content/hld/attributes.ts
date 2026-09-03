import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "scalability",
    track: "hld",
    category: "Quality attributes",
    title: "Scalability: vertical vs horizontal",
    summary:
      "How a system absorbs more load — bigger machines versus more machines — and what each choice forces on data, state, and operations.",
    depth: "core",
    whyItMatters:
      "Almost every HLD interview starts with 'this will grow.' Vertical scale buys time; horizontal scale is the design. You need to say which bottleneck you are scaling (CPU, RAM, disk, network, connections) and what becomes hard once you add machines.",
    theory: [
      "Vertical scaling (scale up) means giving one node more CPU, RAM, disk, or NIC. It is simple: no sharding, no distributed consensus, no split-brain. Databases love it because a single writer with local disk is still the easiest consistency story. The ceiling is real — cloud instance sizes, NUMA, lock contention inside one process, and a single blast radius. You also pay a nonlinear price: the next larger box is often much more expensive per unit of capacity.",
      "Horizontal scaling (scale out) means adding nodes behind a load balancer or into a cluster. Stateless compute scales almost linearly if you keep session state out of the box. Stateful systems do not: you must partition data (shards), replicate it, or both. The new failure modes are coordination — rebalancing, hot partitions, clock skew, and partial deployments. Horizontal scale is how you get past one machine, not how you avoid designing data ownership.",
      "Two other axes matter as much as node count. Read scale is often replication plus caches. Write scale is almost always partitioning plus async work. You can also scale independently by workload: isolate expensive features (search, video transcode, analytics) so the core request path stays cheap. Good designs name the unit of scale — request, user, tenant, shard key — not just 'add servers.'",
    ],
    howItWorks: [
      "Find the bottleneck with numbers: QPS, payload size, working set, connection count, and p99 — not 'it feels slow.'",
      "Scale compute first if the app is stateless: more replicas, autoscaling on CPU or queue depth, sticky sessions only if you must.",
      "Scale reads with replicas and caches; scale writes with sharding, queues, and batching.",
      "Pick a partition key that spreads load and matches query patterns. Wrong key = vertical problem on one shard.",
      "Plan rebalancing: consistent hashing or directory-based moves so growth does not mean overnight downtime.",
    ],
    whenToUse: [
      "Vertical first for early products, single-primary databases, and when operational simplicity beats peak efficiency.",
      "Horizontal for stateless APIs, cache fleets, stream consumers, and any workload that outgrows one box.",
      "Hybrid is normal: a large primary plus read replicas, or a monolith on bigger boxes with isolated worker pools.",
    ],
    whenNotToUse: [
      "Do not shard a database because the interview said 'scale' — shard when a single primary cannot take the writes or the working set.",
      "Do not horizontally scale a chatty, strongly consistent workflow without redesigning coordination.",
    ],
    tradeoffs: [
      "Vertical: simple consistency and ops; hard ceiling and bigger blast radius.",
      "Horizontal: capacity and isolation; distributed complexity, partial failure, and rebalancing cost.",
      "Autoscaling helps traffic spikes but cannot fix a hot key or a synchronous fan-out.",
    ],
    interviewTips: [
      "Say what you scale and why: 'writes hit one primary, so we shard by user_id; reads go to replicas and Redis.'",
      "Mention the unit of scale and the hot-key risk in the same breath.",
      "If they push 100x growth, evolve: cache → replicas → queue → shards, not a microservice rewrite.",
    ],
    pitfalls: [
      "Scaling pods while the database or a single Redis key is the real limiter.",
      "Sticky sessions that silently turn a fleet into N tiny vertical silos.",
      "Assuming linear scale: locks, GC, and cross-shard queries eat the gains.",
    ],
    practiceIdeas: [
      "Take a CRUD API and write the 10x / 100x / 1000x plan: what breaks first at each step.",
      "Sketch shard-key options for a multi-tenant SaaS and argue which tenants become whales.",
    ],
    related: [
      "load-balancers",
      "sharding",
      "cache-patterns",
      "stateless-sticky-sessions",
      "hot-keys-partitions",
      "capacity-planning",
    ],
  },
  {
    slug: "availability-vs-reliability",
    track: "hld",
    category: "Quality attributes",
    title: "Availability vs reliability",
    summary:
      "Availability is 'can I reach a healthy enough answer now?' Reliability is 'does the system keep its promises over time?' Interviews mix them; good answers split them.",
    depth: "core",
    whyItMatters:
      "Nine-fives are an availability target. A system can be up and still corrupt data, drop payments, or return stale results. Interviewers want you to pick an SLO that matches the business — and to know that extra nines cost replicas, multi-AZ, and operational discipline, not just a load balancer.",
    theory: [
      "Availability is the fraction of time a service can accept and usefully answer requests. The classic formula is uptime / (uptime + downtime), but production uses successful requests over valid requests in a window, excluding your own bad clients. Three nines is ~8.8 hours down per year; four nines is ~52 minutes; five nines is ~5 minutes. Those last nines force multi-AZ, no single-human deploy, and practiced failover.",
      "Reliability is broader: correctness under failure, change, and load. A payment API that is always reachable but double-charges is available and unreliable. Reliability work is idempotency, checksums, exactly-once-enough effects, backpressure, and tests that fail the build when a contract breaks. MTBF (mean time between failures) and MTTR (mean time to repair) are the old hardware pair; software adds change failure rate and time to detect.",
      "The relationship is practical. High availability without reliability just serves wrong answers faster. High reliability on a single box still dies in an AZ outage. You raise availability with redundancy and fast failover. You raise reliability with simpler failure domains, invariants, and making the common path boring.",
    ],
    howItWorks: [
      "Define the user-visible event: login succeeded, video started, money moved — not 'pod is Running.'",
      "Write an SLO (e.g. 99.9% of reads < 200ms and non-5xx) and an error budget for how much you can burn on deploys.",
      "Remove single points of failure: multi-AZ load balancers, replica promotion, queue buffering across restarts.",
      "Shorten MTTR with health checks, automated failover, and runbooks; lengthen MTBF by shrinking blast radius.",
      "Separate 'degraded but available' (stale cache, read-only mode) from 'down.'",
    ],
    whenToUse: [
      "Use availability language for SLO, failover, multi-AZ, and 'what if this AZ dies.'",
      "Use reliability language for money, identity, inventory, and any write that must not double-apply.",
      "Put both on the whiteboard when the prompt is a consumer app with payments or messaging.",
    ],
    whenNotToUse: [
      "Do not quote five nines for an internal admin tool — it signals you cannot prioritize.",
      "Do not treat 'we have replicas' as reliability; replicas can replicate corruption.",
    ],
    tradeoffs: [
      "More nines: more replicas, more regions, more cost, slower features if you fear deploys.",
      "Fail-open raises availability and can leak security or correctness; fail-closed does the opposite.",
      "Active-active availability is harder than active-passive: conflict resolution vs simpler RPO/RTO.",
    ],
    interviewTips: [
      "Pick nines with a cost: '99.9% for read path, 99.99% for checkout because refunds are expensive.'",
      "Name MTTR: health check interval + failover + DNS/cache TTL is your real downtime.",
      "Offer a degraded mode instead of pretending 100% of features stay up.",
    ],
    pitfalls: [
      "Counting infra uptime instead of user success (LB up, app returning 503).",
      "Ignoring planned downtime and deploys — they eat the error budget.",
      "Redundancy that shares a fate: same AZ, same disk, same config push.",
    ],
    practiceIdeas: [
      "Compute allowed downtime for 99.9% vs 99.99% monthly SLOs and decide which components must be multi-AZ.",
      "Write a one-page reliability story for a wallet debit: retries, idempotency keys, and what the user sees on timeout.",
    ],
    related: [
      "sli-slo-sla",
      "fault-tolerance-dr",
      "health-checks",
      "multi-az-multi-region",
      "idempotency-delivery",
      "hld-interview-method",
    ],
  },
  {
    slug: "latency-vs-throughput",
    track: "hld",
    category: "Quality attributes",
    title: "Latency vs throughput",
    summary:
      "Latency is how long one request waits. Throughput is how many the system finishes per second. Optimizing one can hurt the other — batching is the usual example.",
    depth: "core",
    whyItMatters:
      "Users feel latency. Capacity planning is throughput. If you only quote QPS you hide tail latency; if you only quote p50 you hide that the cluster is already saturated. HLD answers need both, plus percentiles.",
    theory: [
      "Latency is the time from request start to useful response: network, queues, service time, retries, and client wait. It is not just CPU. A request can be 'fast on the server' and slow for the user because of DNS, TLS, three chatty round trips, or a retry storm. Always say which hop you mean and which percentile.",
      "Throughput is completed work per unit time — QPS, messages/sec, MB/s. Little's Law ties them: concurrency ≈ throughput × latency. If each request holds a connection for 200ms and you want 10k QPS, you need on the order of 2k in-flight requests. That is why 'we will just add QPS' without connection and memory math is incomplete.",
      "The tension is structural. Batching, bufferbloat, and large queue depths raise throughput and p99. Tiny synchronous RPCs feel snappy until a dependency hiccups and every caller waits. Pipelining and async I/O raise throughput without necessarily raising per-request CPU. Hedged requests can cut tail latency while increasing load — a throughput tax for latency.",
    ],
    howItWorks: [
      "Break latency into parts: client RTT, LB, app, cache, DB, downstream fan-out. Budget each hop.",
      "Measure p50/p95/p99, not averages. Averages hide the incidents users tweet about.",
      "Raise throughput with parallelism, batching, connection pooling, and cheaper work per request (cache, denormalize).",
      "Cut latency with locality (CDN, same-AZ), fewer hops, indexes, and avoiding lock-step fan-out.",
      "Watch saturation: when queues grow, latency explodes while throughput plateaus — that is the real capacity wall.",
    ],
    whenToUse: [
      "Latency-first: interactive APIs, search-as-you-type, checkout, live video start time.",
      "Throughput-first: analytics ingest, log pipelines, transcoding, nightly billing.",
      "State both when sizing: '50k QPS at p99 < 100ms' is a real requirement; 'fast and scalable' is not.",
    ],
    whenNotToUse: [
      "Do not batch user-facing writes just to pump throughput if it adds hundreds of ms.",
      "Do not chase microsecond intra-AZ latency when the client is on mobile 4G.",
    ],
    tradeoffs: [
      "Batching and async: more throughput, higher and lumpier latency.",
      "Replication and extra caches: better read latency, more consistency delay and invalidation work.",
      "Hedged/parallel requests: better tail latency, more downstream QPS.",
    ],
    interviewTips: [
      "Write a latency budget on the board (e.g. 20ms LB+app, 10ms cache, 40ms DB).",
      "Convert QPS × payload into NIC and disk numbers so throughput is physical.",
      "Call out tail latency from GC, noisy neighbors, and slow queries — not just mean RTT.",
    ],
    pitfalls: [
      "Using average latency as the SLO.",
      "Unbounded queues that keep throughput flat while p99 goes to seconds.",
      "Synchronous sequential calls to five services when they could be parallel or cached.",
    ],
    practiceIdeas: [
      "Apply Little's Law to a 150ms p99 API at 8k QPS and size thread/connection pools.",
      "Compare a chatty REST waterfall vs one batched query for the same page.",
    ],
    related: [
      "percentiles",
      "back-of-envelope",
      "cdn",
      "cache-patterns",
      "backpressure-retries",
      "hedged-requests",
    ],
  },
  {
    slug: "consistency-vs-durability",
    track: "hld",
    category: "Quality attributes",
    title: "Consistency vs durability",
    summary:
      "Consistency is whether replicas agree on a view of the data. Durability is whether a committed write survives crashes. They are not the same knob.",
    depth: "core",
    whyItMatters:
      "Candidates say 'strong consistency' when they mean 'do not lose the write.' A replica can be consistent with a leader that has not fsynced. A durable disk can still serve a stale secondary. Interviews reward people who separate 'what did I read?' from 'will this still be there after a crash?'",
    theory: [
      "Consistency (in the distributed-data sense) is about visibility: after a write, which reads see it, in which order, on which nodes. Strong consistency / linearizability means the system behaves like one copy. Eventual consistency means replicas converge if writes stop. Causal and read-your-writes sit in between. This is a replica-and-quorum problem.",
      "Durability is about persistence: fsync, replication factor, and whether an ack means 'in memory on one box,' 'on disk on one box,' or 'on disk on a majority.' Databases expose this as commit settings (synchronous_commit, ack=all, unacknowledged Kafka produce). Losing a node after an in-memory ack is a durability failure, not a consistency-model debate.",
      "You can trade them independently. A leader that acks before fsync is consistent for readers of that leader and fragile on crash. A quorum write that waits for majority fsync is durable and slower. A cache can be inconsistent by design and still durable in the source of truth. Object stores often give durable blobs with listing/read-after-write caveats — durability of bytes, weaker metadata consistency.",
    ],
    howItWorks: [
      "Pick the ack condition: memory, local disk, majority disk, or cross-region replica.",
      "Pick the read condition: leader, quorum, any replica, or cache with TTL.",
      "Use write-ahead logs and replication so a follower can rebuild the leader's committed prefix.",
      "For 'money' writes, require quorum + fsync + idempotency; for feed likes, eventual + cached counts.",
      "State RPO: how many seconds of acknowledged writes you are willing to lose in a region failure.",
    ],
    whenToUse: [
      "Strong + durable: ledgers, inventory reservations, identity credential changes.",
      "Weaker consistency, high durability: user posts that may take a second to appear everywhere but must not vanish.",
      "Weaker durability: ephemeral presence, metrics buffers, autocomplete prefixes you can rebuild.",
    ],
    whenNotToUse: [
      "Do not use asynchronous replicas as the durability story for payments.",
      "Do not claim 'eventual consistency' as an excuse to ack writes that never hit a second disk.",
    ],
    tradeoffs: [
      "Synchronous replication: better durability and often stronger reads; higher write latency and availability coupling.",
      "Async replication: fast local acks; RPO > 0 on primary loss.",
      "fsync every commit vs group commit: durability vs write throughput.",
    ],
    interviewTips: [
      "When they say consistency, ask: read visibility or crash survival? Then name both settings.",
      "Tie to CAP/PACELC only after you have named the write-ack and read-source.",
      "Give RPO/RTO numbers instead of 'we replicate to another region.'",
    ],
    pitfalls: [
      "Acknowledging the client before the write is on a quorum of disks.",
      "Reading a replica and calling it strongly consistent.",
      "Confusing cache TTL (freshness) with database commit durability.",
    ],
    practiceIdeas: [
      "Compare Postgres synchronous_commit options and what a crash loses in each mode.",
      "Design a like-counter path (eventual, cached) vs a wallet debit (quorum, durable) on the same user action.",
    ],
    related: [
      "consistency-models",
      "replication",
      "cap-theorem",
      "quorum-nwr",
      "fault-tolerance-dr",
      "acid-vs-base",
    ],
  },
  {
    slug: "fault-tolerance-dr",
    track: "hld",
    category: "Quality attributes",
    title: "Fault tolerance, DR, RPO and RTO",
    summary:
      "Fault tolerance keeps serving through component failure. Disaster recovery is the plan when a whole site or region is gone. RPO and RTO turn that plan into numbers.",
    depth: "next",
    whyItMatters:
      "Redundancy without a recovery objective is theater. Interviewers ask 'what if us-east-1 dies?' You need blast radius, failover steps, data loss (RPO), and time-to-serve (RTO) — plus what you do not fail over because it is too expensive.",
    theory: [
      "Fault tolerance is designed-in redundancy at a component level: extra disks (RAID/EBS), extra processes, extra AZs, retries, and isolation so one bad host does not take the fleet. The goal is to mask failures that you expect every week. Health checks, automatic replacement, and multi-AZ databases are fault tolerance, not a disaster plan.",
      "Disaster recovery (DR) assumes a correlated failure: AZ fire, region network partition, bad config pushed everywhere, ransomware. DR is about a second copy of data and a way to point traffic at a surviving site. Warm standby, pilot light, and backup-restore are different cost/RTO points. Chaos and game days are how you learn the plan is a lie.",
      "RPO (recovery point objective) is the maximum acceptable data loss, measured in time: 'we can lose at most 30 seconds of writes.' That forces sync or near-sync replication vs nightly backups. RTO (recovery time objective) is how long the business can be down or degraded: DNS cutover, replica promotion, cache warmup, and human approval all count. Cheap backups often give terrible RTO; active-active gives tiny RTO and a consistency headache.",
    ],
    howItWorks: [
      "List failure domains: process, host, rack, AZ, region, identity provider, DNS.",
      "For each critical write path, set RPO and the replication mode that can hit it.",
      "For each user journey, set RTO and the failover: automatic promotion vs runbook vs stay read-only.",
      "Keep backups that are actually restorable: versioned, offsite, periodically drilled.",
      "Decide fail-over vs fail-over-and-back: failback is where people lose data the second time.",
    ],
    whenToUse: [
      "Multi-AZ fault tolerance for any production user-facing store.",
      "Cross-region DR for regulated data, large consumer apps, and anything with a contractual RTO.",
      "Backup-only DR for analytics and rebuildable derived data.",
    ],
    whenNotToUse: [
      "Do not sell active-active multi-region if the data model is a single global inventory without conflict rules.",
      "Do not set RPO=0 and then use async replica promotion as the story.",
    ],
    tradeoffs: [
      "Tighter RPO: sync replication, higher write latency, availability coupling across sites.",
      "Tighter RTO: hot standbys and duplicate capacity you pay for while idle.",
      "Automated failover: faster RTO, higher split-brain risk without fencing and quorums.",
    ],
    interviewTips: [
      "Put RPO/RTO on the board as numbers, then the mechanism (sync replica, object-store backup, DNS TTL).",
      "Split 'AZ down' (should be automatic) from 'region down' (may be degraded + human).",
      "Mention fencing: old primary must not accept writes after failover.",
    ],
    pitfalls: [
      "Backups never tested; restore takes days.",
      "DNS TTL of 1 hour vs an RTO of 5 minutes.",
      "Shared fate: replica in the same AZ, or Terraform that wipes both regions.",
    ],
    practiceIdeas: [
      "Write a DR matrix for a URL shortener: cache, DB, object store, DNS — RPO/RTO per piece.",
      "Walk a failover where the old primary comes back and try to prevent split-brain.",
    ],
    related: [
      "availability-vs-reliability",
      "multi-az-multi-region",
      "active-active-passive",
      "replication",
      "failure-modes",
      "chaos-engineering",
    ],
  },
  {
    slug: "observability",
    track: "hld",
    category: "Quality attributes",
    title: "Observability: logs, metrics, and traces",
    summary:
      "Logs tell stories, metrics tell numbers over time, traces tell a request's path. Together they answer 'why is it broken?' without SSH.",
    depth: "core",
    whyItMatters:
      "You cannot operate or defend an HLD without saying how you will see it fail. Interviewers treat 'we will add monitoring' as empty. Name the three pillars, the RED/USE signals, and how you correlate a slow checkout to a hot shard.",
    theory: [
      "Logs are timestamped events with context. They are high cardinality and expensive. Use structured logs (JSON) with request_id, user_id (careful with PII), and error codes — not free-text novels. Logs are for 'what happened to this entity' and post-incident forensics. Sampling and retention matter or the bill becomes the product.",
      "Metrics are aggregatable numbers: counters, gauges, histograms. They are cheap to alert on and bad at explaining a single user. The RED method (rate, errors, duration) fits request services; USE (utilization, saturation, errors) fits resources like CPU, disk, and pool capacity. Histograms let you SLO on p99 without storing every latency.",
      "Traces follow one request across services via a propagated context (W3C traceparent). Spans show where time went: an N+1 query, a 2s downstream, a retry. Tracing is how microservices stay debuggable. You sample — head-based or tail-based — because 100% traces at 100k QPS is a second pipeline. Exemplars stitch a metric spike to a trace id.",
    ],
    howItWorks: [
      "Propagate a correlation/trace id from the edge (API gateway) to DB and queues.",
      "Export RED metrics per endpoint and USE metrics per dependency (pool wait, replica lag, queue depth).",
      "Alert on SLOs and saturation, not on raw CPU, unless CPU is the proven limiter.",
      "Keep high-cardinality labels off metrics (no user_id on Prometheus time series).",
      "Build one 'checkout' dashboard plus a trace jump; do not make 40 dashboards nobody opens.",
    ],
    whenToUse: [
      "Metrics + SLO alerts for every production user path.",
      "Traces when you have more than one service or a mysterious p99.",
      "Logs for errors, audit, and entity-level debug with retention limits.",
    ],
    whenNotToUse: [
      "Do not log every successful request body at 50k QPS.",
      "Do not put unbounded labels on metrics — you will melt the TSDB.",
    ],
    tradeoffs: [
      "Full traces: perfect debug, huge cost; sampling: cheap, may miss the rare monster.",
      "Debug logs in prod: faster RCA, PII and cost risk.",
      "Many custom metrics: flexibility vs cardinality explosion.",
    ],
    interviewTips: [
      "For any design, list 5 signals: QPS, error rate, p99, queue lag, replica lag / cache hit rate.",
      "Say how you find a bad deploy: version label, error budget burn, trace comparison.",
      "Mention audit logs separately from debug logs when the domain is money or identity.",
    ],
    pitfalls: [
      "Alerting on CPU while the SLO is still green — pager fatigue.",
      "No trace id across async hops, so the queue is a black hole.",
      "Dashboards without owners or burn-rate alerts.",
    ],
    practiceIdeas: [
      "Instrument a three-service request: gateway → API → DB, and write the SLO + three alerts.",
      "Design a metrics pipeline sketch (agent → Kafka → TSDB) and say what you downsample.",
    ],
    related: [
      "sli-slo-sla",
      "alerting-vs-dashboards",
      "metrics-pipeline",
      "audit-logs",
      "percentiles",
      "hld-interview-method",
    ],
  },
];
