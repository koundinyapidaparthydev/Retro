import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "queues-pubsub-streams",
    track: "hld",
    category: "Async",
    title: "Queues vs pub/sub vs streams",
    summary:
      "Three ways to decouple producers and consumers: competing consumers, fan-out topics, and replayable logs.",
    depth: "core",
    whyItMatters:
      "Candidates say 'we'll add Kafka' for every async arrow. The shape matters: a job queue, a broadcast, or an ordered log you can rewind. Wrong shape gives lost broadcasts, stuck poison messages, or a $10k/day log you treat like Rabbit.",
    theory: [
      "A queue (SQS, Rabbit work queues, Sidekiq) holds tasks. Competing consumers steal messages; each message is processed by one worker. You get load leveling and retries. Ordering is per-queue or per-group at best. Once acked, the message is gone. This is the right default for 'send email' and 'generate thumbnail.'",
      "Pub/sub (SNS, Redis Pub/Sub, many MQTT brokers) fans a message to many subscriptions. Publishers do not know consumers. Classic Redis pub/sub is fire-and-forget — if you were down, you missed it. Durable pub/sub (SNS→SQS, Kafka consumers groups as 'topics') is what production needs. Use it for 'user signed up → email, analytics, CRM.'",
      "A stream/log (Kafka, Kinesis, Pulsar) appends to a partitioned, retained log. Many consumer groups independently track offsets. You replay, you build new projections, you keep order per partition key. You pay for retention and for the discipline of keys and compaction. Streams are the backbone of event-driven systems and CDC, not a prettier queue unless you need replay.",
    ],
    howItWorks: [
      "Jobs with one worker type → queue + DLQ + visibility timeout.",
      "One event, many independent side effects → pub/sub (durable).",
      "Ordered facts you will re-read or share across teams → stream with a partition key.",
      "Set retention, retry, and poison handling up front — they are the design.",
      "Do not dual-write to DB and broker without an outbox.",
    ],
    whenToUse: [
      "Queue: emails, image jobs, webhook delivery, report exports.",
      "Pub/sub: domain events to several bounded contexts.",
      "Stream: activity logs, CDC, event sourcing projections, click pipelines.",
    ],
    whenNotToUse: [
      "Do not use ephemeral pub/sub for billing events.",
      "Do not put RPC request/response through a 7-day Kafka topic without a reason.",
    ],
    tradeoffs: [
      "Queue: simple workers, no replay, weaker fan-out.",
      "Pub/sub: easy fan-out, easy to miss durability.",
      "Stream: replay and many consumers, operational weight and key design.",
    ],
    interviewTips: [
      "Name the consumer cardinality: competing vs broadcast vs independent groups.",
      "Pick a partition key when you say Kafka — 'by user_id so a user's events stay ordered.'",
    ],
    pitfalls: [
      "One giant topic with no key — random order and hot brokers.",
      "Treating Kafka like a queue and deleting as you go (you wanted SQS).",
      "Unbounded in-memory 'queues' inside the app process.",
    ],
    practiceIdeas: [
      "For notifications, compare SNS+SQS vs Kafka vs one Postgres skip-locked table.",
      "List three events in Uber and pick queue vs stream for each.",
    ],
    related: [
      "kafka-sqs-rabbit",
      "dlq",
      "outbox",
      "batch-vs-stream",
      "cdc",
      "notifications",
    ],
  },
  {
    slug: "kafka-sqs-rabbit",
    track: "hld",
    category: "Async",
    title: "Kafka, SQS, and RabbitMQ mental models",
    summary:
      "A log of partitions, a managed competing-consumer queue, and a flexible broker — when each is the boring correct choice.",
    depth: "next",
    whyItMatters:
      "Name-dropping without a mental model is a reject. You should draw Kafka's consumer group + offset, SQS visibility timeout, and Rabbit's exchange/binding — then pick one for the problem.",
    theory: [
      "Kafka: producers append to topic partitions. A consumer group assigns each partition to one consumer — that is your parallelism ceiling (plus cooperative rebalances). Offsets commit progress. Retention is time/size/compaction, not 'ack deletes the message' for all readers. Replication and the controller (KRaft/ZooKeeper) are the durability story. Use keys for order; expect at-least-once unless you invest in transactions.",
      "SQS: fully managed queue. Standard = at-least-once, best-effort order, huge scale. FIFO = per-group order and exactly-once processing *within SQS* (dedupe window), lower throughput. Visibility timeout hides a message while you work; if you crash, it reappears. DLQ after N receives. You do not replay last week's queue. Pair with SNS for pub/sub.",
      "RabbitMQ: AMQP broker with exchanges (direct, topic, fanout) bound to queues. Very good at routing and traditional work queues, ACK/NACK, prefetch (a form of backpressure). Clustering and disk durability are yours to operate (or use a cloud offering). It is not a multi-week replay log. Classic for command-style workflows and lower-volume, richer routing.",
    ],
    howItWorks: [
      "Need replay, many independent apps, or CDC-scale ingest → Kafka/Kinesis.",
      "Need a dumb durable job list with almost no ops → SQS (+ SNS).",
      "Need sophisticated routing and work queues you already run → Rabbit.",
      "Always draw: producer retry, consumer idempotency, DLQ, and lag/oldest-message age.",
      "Size parallelism: Kafka = partitions; SQS = consumers; Rabbit = prefetch × consumers.",
    ],
    whenToUse: [
      "Kafka: activity, logs, event bus, stream processing.",
      "SQS: app jobs, webhook retries, decoupling AWS services.",
      "Rabbit: existing AMQP shops, RPC-over-queue, topic routing at moderate volume.",
    ],
    whenNotToUse: [
      "Do not run Kafka for 50 emails/minute.",
      "Do not use standard SQS when you must process payments strictly in order without another sequencer.",
    ],
    tradeoffs: [
      "Kafka: powerful and heavy; ops and partition planning.",
      "SQS: almost no ops, no replay, AWS-shaped.",
      "Rabbit: flexible routing, you own HA and scale.",
    ],
    interviewTips: [
      "If the company is AWS-heavy, SQS+SNS is a credible default; mention Kafka when replay/fan-in exists.",
      "Say visibility timeout > p99 processing time or you will double-process.",
    ],
    pitfalls: [
      "Kafka consumers in the same group accidentally sharing work you wanted duplicated.",
      "SQS visibility too short → duplicates; too long → slow poison recovery.",
      "Rabbit without publisher confirms or persistent messages for money events.",
    ],
    practiceIdeas: [
      "Map a notifications pipeline onto all three and list what you lose in each.",
      "Design Kafka partition count for 20k events/s with 4 consumer instances.",
    ],
    related: [
      "queues-pubsub-streams",
      "dlq",
      "idempotency-delivery",
      "cdc",
      "metrics-pipeline",
      "backpressure-retries",
    ],
  },
  {
    slug: "outbox",
    track: "hld",
    category: "Async",
    title: "Transactional outbox",
    summary:
      "Write the business row and the 'please publish' row in one database transaction, then a relay publishes to the broker. Dual-write without the lie.",
    depth: "next",
    whyItMatters:
      "The classic bug is COMMIT user then fail to publish 'UserCreated' — or publish then rollback. Outbox is the interview-grade fix before you reach for distributed transactions. It pairs with CDC as an implementation.",
    theory: [
      "Dual-write (DB + Kafka in app code) is not atomic. Crashes and retries create lost or duplicate events. The outbox pattern inserts into `outbox(id, topic, payload, created_at)` in the same ACID transaction as the business write. A publisher polls the table or tails CDC and produces to the broker, then marks sent. Consumers stay at-least-once + idempotent.",
      "Polling outbox is simple and lags by the poll interval; index `sent=false`. CDC outbox (Debezium) scales better and avoids extra load from polling, but you operate a connector. Inbox is the consumer-side twin: store event id in the same transaction as the side effect so redelivery no-ops.",
      "Outbox does not give global order across aggregates. It gives 'this aggregate's state change and its event either both exist or neither.' For multi-aggregate workflows, use sagas on top of reliable events.",
    ],
    howItWorks: [
      "Begin txn → mutate domain tables → insert outbox row → commit.",
      "Relay publishes with the outbox id as the broker key/id.",
      "Mark published (or delete) after ack; retry on failure.",
      "Consumers upsert by event id (inbox) before side effects.",
      "Monitor oldest unpublished outbox row — that is your event RPO.",
    ],
    whenToUse: [
      "Any domain event that must not diverge from the OLTP write.",
      "Starting CQRS/event-driven without 2PC.",
      "Email/notification triggers that must not vanish after signup.",
    ],
    whenNotToUse: [
      "Do not outbox high-frequency metrics — use a metrics pipeline.",
      "Do not put huge blobs in the outbox row; store a pointer.",
    ],
    tradeoffs: [
      "Polling: simple, extra DB load and delay.",
      "CDC: efficient, connector complexity.",
      "Keep events in DB until publish: durability, table bloat if you never purge.",
    ],
    interviewTips: [
      "When you draw 'API writes DB and Kafka,' immediately say outbox.",
      "Mention inbox on the consumer if the effect is money or email.",
    ],
    pitfalls: [
      "Publishing from the app after commit 'and hoping.'",
      "Outbox table without an index or without a purge job.",
      "Non-idempotent consumers assuming outbox means exactly-once.",
    ],
    practiceIdeas: [
      "Schema an orders outbox and a worker loop with skip-locked.",
      "Compare outbox vs listen/notify vs Debezium for the same service.",
    ],
    related: [
      "cdc",
      "idempotency-delivery",
      "cqrs",
      "sagas",
      "event-sourcing",
      "acid-vs-base",
    ],
  },
  {
    slug: "sagas",
    track: "hld",
    category: "Async",
    title: "Sagas: choreography vs orchestration",
    summary:
      "Long-running workflows across services without 2PC — a sequence of local transactions plus compensations when a step fails.",
    depth: "next",
    whyItMatters:
      "Checkout, booking, and onboarding span payments, inventory, and email. Distributed 2PC is rarely the HLD answer. Sagas are — if you name compensations and who drives the state machine.",
    theory: [
      "A saga is a sequence of local ACID steps. If step k fails, you run compensations for 1..k-1 (or a repair policy). You do not lock all resources for the whole journey. The user sees intermediate states (reserved, pending payment). Idempotency on every step is mandatory because of retries.",
      "Choreography: each service listens to events and emits the next ('OrderCreated' → inventory reserves → 'InventoryReserved' → payment). Loose coupling, hard to see the whole flow, easy to create cycles and lost-in-the-middle bugs. Good for simple, stable happy paths.",
      "Orchestration: a workflow engine or orchestrator service commands each step (Temporal, Step Functions, a saga table). Visibility, timeouts, and compensation are centralized. The orchestrator can become a god object if you dump all domain logic there. Prefer orchestrators that store state durably and workers that stay specialized.",
    ],
    howItWorks: [
      "Write the happy path and a compensation for each mutating step (release seat, refund, unreserve SKU).",
      "Pick choreography for 2–3 obvious events; orchestrate when there are timeouts, branches, or humans.",
      "Persist saga state (id, step, version); never only in memory.",
      "Use idempotency keys per step; make compensations themselves idempotent.",
      "Define timeouts: expire reservation if pay does not complete.",
    ],
    whenToUse: [
      "Checkout, trip booking, KYC, multi-step money movement.",
      "Any write that touches two systems of record you do not want in one 2PC.",
      "Human-in-the-loop approvals.",
    ],
    whenNotToUse: [
      "A single-row update in one DB — just use a transaction.",
      "Trying to compensate an irreversible email by 'unsending' — design the UX instead.",
    ],
    tradeoffs: [
      "Choreography: fewer moving parts, poorer observability and control.",
      "Orchestration: clear state machine, extra service and coupling to the orchestrator.",
      "Sagas vs 2PC: availability and incremental commits vs weaker isolation (user can see reserved-not-paid).",
    ],
    interviewTips: [
      "For Ticketmaster/Uber/payments, draw the saga states on the board.",
      "Say what you cannot compensate (sent SMS) and how you handle it (support, duplicate notice).",
    ],
    pitfalls: [
      "No timeout on a reservation — leaked inventory.",
      "Compensation that is not idempotent and double-refunds.",
      "Choreography with no owner when the flow stalls.",
    ],
    practiceIdeas: [
      "Write an order saga: reserve → pay → ship, with compensations and a 15-minute timeout.",
      "Compare Step Functions vs event choreography for the same flow.",
    ],
    related: [
      "outbox",
      "isolation-levels",
      "inventory-checkout",
      "payments-wallet",
      "idempotency-delivery",
      "ticketmaster",
    ],
  },
  {
    slug: "dlq",
    track: "hld",
    category: "Async",
    title: "Dead-letter queues",
    summary:
      "Where poison messages go after retries fail — so one bad payload does not block the partition or the queue forever.",
    depth: "core",
    whyItMatters:
      "At-least-once systems will see poison JSON, missing foreign keys, and downstream 500s. Without a DLQ you either drop money events or stall the consumer. Interviews want retry policy + DLQ + replay + alert.",
    theory: [
      "A dead-letter queue (or dead-letter topic) receives messages that exceed a max receive count, fail validation, or hit a non-retryable error. The main pipeline keeps moving. Humans or a repair job inspect, fix, and replay. DLQ is not a trash can — if you never look at it, you silently lose work.",
      "Retryable vs not: 429 and 503 deserve backoff; schema errors and 401s do not. Infinite retry of a bad message in Kafka (no skip) blocks that partition for a consumer group — a famous footgun. You must seek past, park, or DLQ. SQS redrives after N visibility cycles automatically if configured.",
      "Operate DLQ like a product: metrics (depth, age), owner, runbook, and a replay tool that keeps the same idempotency keys. Retention on the DLQ must outlive your detection time. PII in payloads means the DLQ is a sensitive store.",
    ],
    howItWorks: [
      "Set max retries with jitter; classify errors.",
      "On exhaust or poison, write to DLQ with reason, stack, and original headers.",
      "Alert on DLQ depth and oldest message, not only on process crashes.",
      "Provide replay that is idempotent at the destination.",
      "Do not auto-replay blindly in a tight loop.",
    ],
    whenToUse: [
      "Every production queue/stream consumer that mutates something you care about.",
      "Webhook delivery and partner integrations.",
      "CDC consumers that can see malformed rows after a schema change.",
    ],
    whenNotToUse: [
      "Do not DLQ lossy metrics you would rather drop.",
      "Do not use DLQ as the primary retry delay mechanism (use backoff).",
    ],
    tradeoffs: [
      "Fail-fast to DLQ: pipeline health, more human work.",
      "Retry a long time: fewer false DLQs, longer stalls and duplicate risk.",
      "Per-partition parking vs a global DLQ topic: isolation vs operational simplicity.",
    ],
    interviewTips: [
      "When you draw a queue, add a DLQ box and an alert — 10 seconds of senior signal.",
      "Mention Kafka poison-pill partitions explicitly.",
    ],
    pitfalls: [
      "No owner, no dashboard, DLQ is a black hole.",
      "Replaying in a way that duplicates charges.",
      "Putting the DLQ on the same failing cluster with no extra retention.",
    ],
    practiceIdeas: [
      "Write a consumer error taxonomy: retry, DLQ, drop.",
      "Design a replay CLI that respects idempotency keys.",
    ],
    related: [
      "kafka-sqs-rabbit",
      "backpressure-retries",
      "idempotency-delivery",
      "webhooks-vs-polling",
      "alerting-vs-dashboards",
      "queues-pubsub-streams",
    ],
  },
  {
    slug: "cdc",
    track: "hld",
    category: "Async",
    title: "Change data capture",
    summary:
      "Turn the database log into a stream of row changes so search, caches, warehouses, and other services stay in sync without dual-write.",
    depth: "next",
    whyItMatters:
      "CDC is how modern platforms feed Elasticsearch, caches, and analytics without the app remembering every projection. It is also how you implement a scalable outbox. You should know log-based vs query-based and the ordering/schema problems.",
    theory: [
      "Log-based CDC (Debezium, Datastream, DMS) reads the WAL/binlog/oplog: insert/update/delete with before/after images. Low load, low latency, good fidelity — including tables the app forgot to event. You operate a slot (Postgres) that will disk-fill if the consumer stops. Query-based CDC (poll on updated_at) is simpler and misses deletes unless you soft-delete; it also races.",
      "Consumers must handle updates, deletes, snapshots (initial backfill), and schema changes. Ordering is typically per primary key or log sequence, not global across shards. You still need idempotent upserts in the sink. CDC is not a replacement for domain events when the meaning is 'UserUpgraded' rather than 'row users.plan changed' — you can derive one from the other if the schema is rich enough.",
      "Fan-out CDC to many sinks through Kafka. Keep PII controls: the log has everything. For multi-tenant, the stream includes all tenants unless you filter.",
    ],
    howItWorks: [
      "Enable WAL-level logical decoding / binlog; create a publication of needed tables.",
      "Snapshot then stream; sink upserts by PK; apply deletes.",
      "Evolve schema with compatible changes or a contract registry.",
      "Alert on connector lag and replication slot age.",
      "Use CDC as the outbox transport or as the warehouse feed (or both).",
    ],
    whenToUse: [
      "Search indexes, cache fill, OLAP, cross-service data copies.",
      "Outbox without polling.",
      "Legacy app you cannot change but must integrate.",
    ],
    whenNotToUse: [
      "Do not CDC the entire database to every microservice as a hidden shared DB.",
      "Do not use polling CDC for high-churn tables without an index on updated_at.",
    ],
    tradeoffs: [
      "Log-based: accurate and light on the source, ops-heavy (slots, connectors).",
      "Poll-based: easy, racy and delete-blind.",
      "Domain events vs CDC: intent vs complete data; many shops emit both.",
    ],
    interviewTips: [
      "For Instagram search or Netflix catalog, say 'CDC from OLTP to Elasticsearch/warehouse.'",
      "Mention initial backfill — the stream alone does not fill yesterday.",
    ],
    pitfalls: [
      "Replication slot disk exhaustion taking down the primary.",
      "Schema change that breaks the sink on a Friday.",
      "Treating CDC order as a global saga order across tables.",
    ],
    practiceIdeas: [
      "Design users+posts CDC into Elasticsearch including deletes and backfill.",
      "Compare outbox table vs raw WAL events for 'OrderPlaced' semantics.",
    ],
    related: [
      "outbox",
      "search-inverted-index",
      "oltp-vs-olap",
      "cqrs",
      "kafka-sqs-rabbit",
      "cache-patterns",
    ],
  },
  {
    slug: "webhooks-vs-polling",
    track: "hld",
    category: "Async",
    title: "Webhooks vs polling",
    summary:
      "Push callbacks when something happens versus the client asking 'any news?' — including signatures, retries, and when to offer both.",
    depth: "core",
    whyItMatters:
      "Partner integrations and 'is my job done?' UX live here. Polling is simple and wasteful. Webhooks are efficient and operationally spicy (downtime, replay, SSRF). Public API platforms are judged on this design.",
    theory: [
      "Polling: the client GETs a status or a cursor of events on an interval. Easy auth, easy to debug, easy to rate-limit. Cost is QPS × clients and latency up to the interval. Long poll holds the request until an event or timeout — fewer empty responses, more connections. Use ETags/If-None-Match or cursors so empty polls are cheap.",
      "Webhooks: you POST to a customer URL. Low latency, low idle QPS. You must sign payloads (HMAC, timestamp), retry with backoff, DLQ, and allow rotation of secrets. Verify that the URL is not an SSRF to your metadata service. Offer a delivery log the customer can see. At-least-once is guaranteed; they must be idempotent.",
      "Many products offer both: webhook for near-real-time, poll/list as the source of truth to recover missed pushes. Mobile push (APNs/FCM) is a special webhook with platform constraints. Internal services often prefer a bus over HTTP webhooks.",
    ],
    howItWorks: [
      "Define an event catalog and a stable payload version.",
      "If webhook: sign, retry, DLQ, timeout (~3–10s), and a replay API.",
      "If poll: cursor/pagination, rate limits, and a recommended interval.",
      "Store deliveries (success/fail, latency) for support.",
      "Block private IPs and require HTTPS on customer URLs.",
    ],
    whenToUse: [
      "Webhooks: Stripe-like platforms, CI callbacks, 'payment settled.'",
      "Poll: simple clients, firewalls that cannot receive, low event rates.",
      "Both for a public API you want to be loved.",
    ],
    whenNotToUse: [
      "Do not poll every 200ms from 2M mobile clients for a rare event — use push/WS.",
      "Do not fire unsigned webhooks to arbitrary URLs.",
    ],
    tradeoffs: [
      "Poll: simple and robust, waste and lag.",
      "Webhook: efficient, your reliability now includes their server.",
      "Long poll/WS: nicer UX, connection cost.",
    ],
    interviewTips: [
      "For notifications and public API, mention signed webhooks + replay + poll backup.",
      "Call out SSRF and idempotency — that is the senior webhook take.",
    ],
    pitfalls: [
      "Retries that storm a customer who is down (no backoff, no circuit).",
      "No timestamp in the signature — replay attacks.",
      "Polling without cursors and scanning the whole table.",
    ],
    practiceIdeas: [
      "Design Stripe-style webhook delivery: worker, retries, signature, portal.",
      "Compare 1M devices polling vs FCM for a chat ping.",
    ],
    related: [
      "public-api-platform",
      "notifications",
      "long-poll-ws-sse",
      "dlq",
      "idempotency-delivery",
      "sync-vs-async-apis",
    ],
  },
  {
    slug: "batch-vs-stream",
    track: "hld",
    category: "Async",
    title: "Batch vs stream processing",
    summary:
      "Nightly jobs over complete datasets versus continuous processing of events — and the hybrid (micro-batch, Kappa, lakehouse).",
    depth: "next",
    whyItMatters:
      "Analytics, billing, ML features, and 'trending last 15 minutes' sit on this axis. Stream is not always better; batch is not always obsolete. Interviews want freshness vs correctness vs cost.",
    theory: [
      "Batch (MapReduce, Spark, dbt nightly): you process a bounded dataset that is 'complete' for a time range. Easy to reason about, cheap on spot capacity, naturally exactly-once if you overwrite a partition. Freshness is hours. Late data means a reopen/backfill. Great for finance close, warehouse facts, and large joins.",
      "Stream (Flink, Kafka Streams, Spark Structured Streaming): unbounded data, low latency (seconds). You need watermarks for late events, state stores, and a story for replay. Good for fraud flags, live counters, and incremental materializations. Cost is always-on compute and operational state.",
      "Hybrids: micro-batch (Spark every minute), Kappa (stream is the source, batch is a replay), Lambda (stream + nightly corrector — operationally painful). Lakehouse streaming tables blur the line. Product rule: if the user decides in seconds, stream; if the CFO decides tomorrow, batch; if both, stream approximate + batch reconcile.",
    ],
    howItWorks: [
      "Define freshness SLO and whether late data must correct the past.",
      "Pick a time key and partitioning (day/hour) for batch; a watermark for stream.",
      "Make outputs idempotent (partition overwrite, upsert by key).",
      "For stream, plan state TTL and checkpoint storage.",
      "Reconcile: a daily job that rebuilds the truth if the stream drifted.",
    ],
    whenToUse: [
      "Batch: warehouses, billing, large ETL, ML training sets.",
      "Stream: fraud, live metrics, notifications on events, incremental search.",
      "Both: ads and trending (stream for now, batch for audit).",
    ],
    whenNotToUse: [
      "Do not stream-join two unwindowed infinite tables without a plan — you will OOM.",
      "Do not nightly-batch a 'presence' feature.",
    ],
    tradeoffs: [
      "Batch: cheap and correct-at-rest, slow.",
      "Stream: fresh, complex late data and state.",
      "Lambda: accurate and fresh, two codepaths.",
    ],
    interviewTips: [
      "For trending/ads/metrics, say stream for serving + batch for reconciliation.",
      "Ask 'how late can an event be?' before picking watermarks.",
    ],
    pitfalls: [
      "Event-time vs processing-time confusion.",
      "Unbounded state in a stream join.",
      "Two pipelines that disagree with no owner.",
    ],
    practiceIdeas: [
      "Design trending topics: 15-minute stream windows + nightly batch truth.",
      "Pick batch vs stream for six Netflix jobs (billing, recs, playback heartbeat).",
    ],
    related: [
      "metrics-pipeline",
      "ad-click-aggregator",
      "trending-topics",
      "oltp-vs-olap",
      "queues-pubsub-streams",
      "cdc",
    ],
  },
];
