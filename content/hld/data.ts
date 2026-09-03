import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "sql-vs-nosql",
    track: "hld",
    category: "Data stores",
    title: "SQL vs NoSQL",
    summary:
      "Pick the store from access patterns and invariants, not from fashion. SQL is relational + a query planner; NoSQL is a family of specialized shapes.",
    depth: "core",
    whyItMatters:
      "The first data question in every HLD is 'where does this live?' Wrong answer: 'we'll use NoSQL because we scale.' Right answer: transactions and joins vs documents, wide rows, KV, or graphs — and you can use more than one.",
    theory: [
      "SQL databases (Postgres, MySQL, the NewSQL cousins) give you schemas, constraints, declarative queries, and transactions. They shine when data is relational, invariants are sharp, and you need ad-hoc query. A single primary scales farther than Twitter-era folklore: read replicas, partitioning, and good indexes handle a lot. The ceiling is write QPS on one shard and awkward horizontal scale if you did not plan a key.",
      "NoSQL is not one thing. KV (Redis, DynamoDB) is get/put by key. Wide-column (Cassandra) is rows with flexible columns and a partition key. Document (Mongo) is JSON trees with secondary indexes. Graph (Neo4j) is traversals. Search (Elasticsearch) is inverted indexes. Each drops some SQL capability to win a pattern. 'Schema-less' still has a schema — it just lives in the application and will bite you.",
      "Polyglot persistence is normal: Postgres for orders, Redis for sessions, S3 for bytes, Kafka for events, Elasticsearch for search. The tax is sync (CDC/outbox) and more ways to be wrong. Start with one operationally boring store; add the next when a pattern is proven (search, huge write ingest, graph hops).",
    ],
    howItWorks: [
      "List entities, lookups, and invariants (unique, balance, FK-like).",
      "If you need multi-row transactions and rich queries, start SQL.",
      "If you need single-key access at huge scale, start KV/wide-column with a key design.",
      "If you need text ranking or geo, add a specialized index, not a LIKE on the primary.",
      "Plan how copies stay in sync — do not dual-write casually.",
    ],
    whenToUse: [
      "SQL: users, billing, inventory, most CRUD products.",
      "KV/wide-column: sessions, huge time-series-ish writes, inbox timelines.",
      "Document: variable records with mostly-by-id access.",
    ],
    whenNotToUse: [
      "Do not pick Cassandra for a reporting app that needs arbitrary filters.",
      "Do not pick Mongo to avoid learning transactions — you still have them, or you have bugs.",
    ],
    tradeoffs: [
      "SQL: integrity and query power, harder write scale and ops of a primary.",
      "NoSQL: targeted scale, you reinvent joins/invariants.",
      "NewSQL: SQL + shards, still not magic on hot keys and cross-shard txns.",
    ],
    interviewTips: [
      "Say 'Postgres for source of truth; Redis/S3/ES as accessories' as a default.",
      "When they say scale, shard SQL or add a KV — do not panic-swap the model.",
    ],
    pitfalls: [
      "One database for OLTP and heavy analytics queries.",
      "Storing blobs in SQL.",
      "NoSQL without a key that matches the query.",
    ],
    practiceIdeas: [
      "For each classic design, write the primary store and why in one sentence.",
      "Take a 'Mongo for everything' design and split it honestly.",
    ],
    related: [
      "sharding",
      "replication",
      "acid-vs-base",
      "specialized-stores",
      "oltp-vs-olap",
      "indexes",
    ],
  },
  {
    slug: "replication",
    track: "hld",
    category: "Data stores",
    title: "Replication",
    summary:
      "Copy data to more nodes for reads, locality, and durability — sync vs async, leader vs multi-leader, and what lag does to reads.",
    depth: "core",
    whyItMatters:
      "Replicas are how you survive a disk death and how you scale reads. They are also how you serve stale data and how you lose acknowledged writes if the ack was too eager. Every HLD store box needs a replication sentence.",
    theory: [
      "Single-leader replication: the primary takes writes, followers apply the log (streaming WAL, binlog, or Raft). Async followers mean the primary can ack before the follower has the bytes (RPO > 0 on crash). Sync or semi-sync waits for at least one (or majority) — safer, slower, more availability coupling. Read replicas scale reads and offload backups/analytics; they are not a write scale plan.",
      "Multi-leader and leaderless replication accept writes in several places. You gain region-local writes and lose a single order. Conflict resolution (LWW, vectors, CRDTs, app merge) becomes the product. See leader vs leaderless. Cascading replication (primary → hub → spokes) is an ops pattern with longer lag tails.",
      "Clients must be routed: write to primary, read from replica only if the API allows staleness or you use session guarantees (read-after-write via primary or a token). Replica lag is an SLO. Replication is not backup: a bad DELETE replicates too. You still need point-in-time recovery.",
    ],
    howItWorks: [
      "Choose sync/semi-sync inside the AZ/region for the system of record.",
      "Use async replicas for read scale and cross-region DR.",
      "Monitor lag; fail reads to primary or serve stale with a budget.",
      "Fence the old primary on failover so it cannot replicate a fork.",
      "Test restores from backups, not only failover to a replica.",
    ],
    whenToUse: [
      "Always, for production data you cannot rebuild.",
      "Read replicas when read QPS or reporting hurts the primary.",
      "Cross-region replicas when RPO/RTO or locality requires it.",
    ],
    whenNotToUse: [
      "Do not send strongly consistent reads to an async replica.",
      "Do not treat a replica in the same rack as DR.",
    ],
    tradeoffs: [
      "Sync: durability/consistency, write latency and availability coupling.",
      "Async: fast primary, data loss and stale reads.",
      "More replicas: more read QPS, more fan-out on the WAL and more lag variance.",
    ],
    interviewTips: [
      "Label each replica sync or async and who reads from it.",
      "For money, majority or sync; for feed counts, async is fine.",
    ],
    pitfalls: [
      "Replica used as the only backup.",
      "Unmonitored lag that silently grows for hours.",
      "Schema changes that break older replicas mid-upgrade.",
    ],
    practiceIdeas: [
      "Draw Postgres primary + 2 async + 1 sync standby and assign workloads.",
      "Explain a failover where the async replica is 30s behind — what users lose.",
    ],
    related: [
      "leader-vs-leaderless",
      "consistency-vs-durability",
      "quorum-nwr",
      "multi-az-multi-region",
      "cdc",
      "fault-tolerance-dr",
    ],
  },
  {
    slug: "sharding",
    track: "hld",
    category: "Data stores",
    title: "Sharding: range, hash, and directory",
    summary:
      "Split a dataset across nodes by a key — range for scans, hash for evenness, directory for flexibility — and live with cross-shard pain.",
    depth: "core",
    whyItMatters:
      "Write scale beyond one primary is almost always sharding. The key you pick is the design. Interviews fail people who shard 'by id' without saying which id, and who forget scatter-gather and resharding.",
    theory: [
      "Range sharding puts contiguous keys on a shard (user_id 1–1M, or time buckets). Range scans and time-ordered queries stay local. The current time range or a popular prefix becomes a hotspot. Splitting a hot range is the operational move (Mongo, Vitess, Bigtable).",
      "Hash sharding puts hash(key) % N (or onto a ring) so load is even if keys are even. Point lookups are local. Range queries become scatter-gather. Rehashing when N changes moves almost everything unless you use consistent hashing. Hash of created_at is still a bad key if you meant 'today's events.'",
      "Directory (lookup) sharding stores key → shard in a map (or a coarse routing table). Maximum flexibility (move one tenant), extra lookup and a control-plane dependency. Hybrids are common: hash of tenant_id, directory for whales, range inside a tenant. Cross-shard transactions are the tax — avoid them with key choice or sagas.",
    ],
    howItWorks: [
      "Pick a shard key that matches the hottest query and spreads writes.",
      "Keep transactions and unique constraints inside one shard when you can.",
      "Plan reshard: consistent hashing, range splits, or directory moves.",
      "Put a thin router (Vitess, proxy, app library) in front; do not teach every client shard math.",
      "Watch per-shard QPS — averages hide the hot one.",
    ],
    whenToUse: [
      "When one primary cannot take writes or the working set.",
      "Multi-tenant placement (one tenant one shard).",
      "Geo placement (EU shard vs US shard).",
    ],
    whenNotToUse: [
      "Do not shard a 20 GB database to look scalable.",
      "Do not shard on a low-cardinality column (country=US).",
    ],
    tradeoffs: [
      "Range: great scans, hot head/tail.",
      "Hash: even load, ugly ranges and resharding.",
      "Directory: flexible moves, extra hop and map consistency.",
    ],
    interviewTips: [
      "Propose a key, then attack it with a celebrity/whale/time hotspot and fix it.",
      "Say how a list-by-time query works after you hash-shard by user.",
    ],
    pitfalls: [
      "Global unique indexes that secretly need a gather.",
      "Joins across shards in the request path.",
      "Auto-increment ids as the only key — range hot spot on the latest shard.",
    ],
    practiceIdeas: [
      "Shard a chat app three ways (by conversation, by user, by time) and compare queries.",
      "Design a reshard that moves 5% of keys with consistent hashing.",
    ],
    related: [
      "consistent-hashing",
      "hot-keys-partitions",
      "sql-vs-nosql",
      "multi-tenant",
      "key-value-store",
      "scalability",
    ],
  },
  {
    slug: "consistent-hashing",
    track: "hld",
    category: "Data stores",
    title: "Consistent hashing and virtual nodes",
    summary:
      "A ring that moves only a fraction of keys when nodes appear or die — the standard way to place cache and KV partitions.",
    depth: "next",
    whyItMatters:
      "This is a named HLD algorithm, like Raft. You should draw the ring, explain vnodes, and say what happens on a node death (remap, rebalance, and the herd on the neighbors).",
    theory: [
      "Plain hash(key) % N remaps nearly all keys when N changes — a cache wipe or a massive data move. Consistent hashing places nodes on a hash ring; a key walks clockwise to the first node. When a node joins or leaves, only keys in the adjacent arc move. Dynamo, Cassandra, and many cache fleets use this family (or rendezvous hashing, a close cousin).",
      "Virtual nodes (vnodes): each physical server owns many positions on the ring. That evens load (one node is not stuck with a huge arc) and makes rebalance granular. Too many vnodes: big membership maps. Replication is 'next R nodes on the ring' (or racks/AZs skipped for placement). The membership map must be consistent enough; gossip + a generation number is typical.",
      "On failure, neighbors suddenly own more keys — the classic 'rebalance storm.' You mitigate with lazy move, hinted handoff, sloppy quorums, and capacity headroom. Sticky request hashing at L7 is the same idea for in-memory caches: same user → same box, until the box dies.",
    ],
    howItWorks: [
      "Hash keys and node vnodes onto a ring; store N replicas along the ring with AZ diversity.",
      "On join/leave, stream only the affected key ranges.",
      "Keep a membership version so clients do not write the wrong owner forever.",
      "Over-provision so a death does not saturate neighbors.",
      "Consider rendezvous hashing if you want simpler weighted nodes.",
    ],
    whenToUse: [
      "Distributed caches, Dynamo-style KV, partition placement.",
      "Any time you would have said hash % N and then add a node.",
      "Request affinity for cache-heavy stateless? No — for stateful cache nodes.",
    ],
    whenNotToUse: [
      "Small, stable N where a directory or range map is simpler.",
      "Workloads that need ordered range scans as the primary access — use range shards.",
    ],
    complexity: {
      time: "O(log V) to find a key's node with a sorted ring (V = vnodes)",
      space: "O(V) membership; data still O(keys × RF)",
      notes: "Only ~1/N of keys move when adding a node (better with vnodes).",
    },
    tradeoffs: [
      "More vnodes: smoother load, heavier membership and more small ranges to move.",
      "Replication along the ring: simple, can correlate failures if you ignore racks.",
      "Lazy vs eager rebalance: less storm, longer imbalance.",
    ],
    interviewTips: [
      "Draw 4 nodes, add a 5th, shade the moved arc — that picture is the point.",
      "Mention vnodes and 'neighbors get hotter on death.'",
    ],
    pitfalls: [
      "No vnodes → one node owns half the ring by unlucky hashes.",
      "Forgetting replication when you talk about 'the' owner.",
      "Rebalancing everything at once at noon.",
    ],
    practiceIdeas: [
      "Simulate 100 keys, 4 nodes, add a 5th, count moves vs % N.",
      "Design vnode count for a 50-node Redis cluster.",
    ],
    related: [
      "sharding",
      "hot-keys-partitions",
      "key-value-store",
      "distributed-cache",
      "leader-vs-leaderless",
      "load-balancers",
    ],
  },
  {
    slug: "indexes",
    track: "hld",
    category: "Data stores",
    title: "Indexes",
    summary:
      "Secondary structures that turn scans into seeks — B-trees, hashes, inverted and composite keys — and the write tax they add.",
    depth: "core",
    whyItMatters:
      "A design that says 'query by user and time' without an index is a table scan at 10^9 rows. Indexes are also why writes slow down and why disks grow 2×. You should name the index that makes the hot query cheap.",
    theory: [
      "A B-tree/B+tree index keeps keys ordered for equality and range. Hash indexes are equality-only and rare as the default. Composite indexes match leftmost prefixes: (user_id, created_at) helps 'user's recent posts' and not 'recent posts globally.' Covering indexes can satisfy a query without touching the heap. Unique indexes enforce invariants the app would get wrong.",
      "Every extra index is extra writes, extra WAL, extra cache pressure, and extra vacuum/compaction. Write-heavy tables want fewer, sharper indexes. Partial and expression indexes (Postgres) cut size. At shard scale, a global secondary index is another distributed problem (DynamoDB GSI — eventually consistent, extra RCU/WCU).",
      "Specialized indexes: inverted (search), geospatial (R-tree, S2 cells), time-series BRIN (cheap on append-only time order), columnstore for analytics. Picking SQL without the right index is still the wrong design.",
    ],
    howItWorks: [
      "Write the top 5 queries; give each a supporting index or a specialized store.",
      "Prefer composite indexes that match filter + sort.",
      "Measure write amplification; drop unused indexes.",
      "For huge append-only time data, consider BRIN or a TSDB.",
      "Treat GSIs as separate systems with their own consistency.",
    ],
    whenToUse: [
      "OLTP lookups and range lists that are not by primary key.",
      "Uniqueness (email, handle, idempotency key).",
      "Partial indexes for 'open tickets' style subsets.",
    ],
    whenNotToUse: [
      "Do not index every column 'just in case.'",
      "Do not expect an index to save a query that returns 20% of the table.",
    ],
    tradeoffs: [
      "More indexes: faster reads, slower writes and bigger storage.",
      "Wide covering indexes: index-only scans, more update churn.",
      "Global secondary indexes: new access paths, lag and extra cost.",
    ],
    interviewTips: [
      "When you write a table, write the PK and one secondary index next to it.",
      "If they ask 'how do we list a user's URLs,' the answer is an index, not a cache first.",
    ],
    pitfalls: [
      "LIKE '%foo%' on a B-tree.",
      "Random UUIDs as clustered keys causing page splits (engine-dependent).",
      "Forgotten indexes on FK columns.",
    ],
    practiceIdeas: [
      "Design indexes for a tweets table: by user+time, by id, hashtag search (hint: not SQL).",
      "Explain why (created_at, user_id) is the wrong order for 'user's tweets.'",
    ],
    related: [
      "sql-vs-nosql",
      "search-inverted-index",
      "normalize-vs-denormalize",
      "specialized-stores",
      "url-shortener",
      "oltp-vs-olap",
    ],
  },
  {
    slug: "normalize-vs-denormalize",
    track: "hld",
    category: "Data stores",
    title: "Normalize vs denormalize",
    summary:
      "Normalize to protect invariants and update-in-one-place. Denormalize to make a read cheap. The art is which copy is allowed to be stale.",
    depth: "core",
    whyItMatters:
      "Feeds, product pages, and chat previews are denormalized. Ledgers are not. Candidates either join ten tables on the read path or duplicate everything with no invalidation story. Interviews want a hybrid.",
    theory: [
      "Normalization (3NF and friends) removes update anomalies: a user's display name lives in one row. Writes are small and consistent. Reads that assemble a page become joins — fine at modest scale, fatal when you join followers × posts × media on every scroll.",
      "Denormalization copies data into the shape you read: tweet embeds author name and avatar URL; order line snapshots the price; a feed row is precomputed. You win p99 and lose 'update the name everywhere.' Tools: cache, materialized views, CQRS projections, wide documents. You must pick a refresh: sync in the write txn (limited), async via outbox (lag), or read-time join for rare fields.",
      "A useful rule: source of truth stays normalized enough to enforce money and identity; read models denormalize aggressively. Snapshot values that must not change historically (price at purchase). Reference values that should update (avatar) can be stale briefly.",
    ],
    howItWorks: [
      "Draw the read payload; decide which fields are snapshotted vs joined vs cached.",
      "Update-in-txn when the copy must not diverge (order line price).",
      "Update-async when lag is OK (display name on old posts).",
      "Avoid unbounded denormalized arrays (1M follower ids in one document).",
      "Version or hash the projection so you can rebuild.",
    ],
    whenToUse: [
      "Normalize: financials, unique constraints, slowly changing dimensions.",
      "Denormalize: feeds, product cards, search documents, mobile payloads.",
      "Materialized views when SQL is still the right engine.",
    ],
    whenNotToUse: [
      "Do not denormalize a balance onto ten tables.",
      "Do not normalize a hot feed into a 6-way join with no cache.",
    ],
    tradeoffs: [
      "Normalized: correct writes, heavier reads.",
      "Denormalized: fast reads, fan-out writes and staleness.",
      "Document embedding vs references: one read vs consistency.",
    ],
    interviewTips: [
      "For newsfeed, say 'denormalized feed rows, normalized user table, async name updates.'",
      "Call out what happens when a user changes their handle.",
    ],
    pitfalls: [
      "Unbounded nested documents.",
      "Two writers updating two copies differently.",
      "Caching a denormalized blob with no invalidation on a child edit.",
    ],
    practiceIdeas: [
      "Design a product page document vs 3NF tables + cache.",
      "Plan a display-name change that fans out to 10k recent posts.",
    ],
    related: [
      "cqrs",
      "cache-patterns",
      "newsfeed",
      "indexes",
      "event-sourcing",
      "fan-out-write-vs-read",
    ],
  },
  {
    slug: "cqrs",
    track: "hld",
    category: "Data stores",
    title: "CQRS",
    summary:
      "Command Query Responsibility Segregation: different models (and often stores) for writes vs reads so each can scale and shape independently.",
    depth: "next",
    whyItMatters:
      "When the write invariant and the read payload disagree violently (ledger vs dashboard, orders vs search), one schema becomes a compromise that serves neither. CQRS is the named pattern — not 'we added Redis' without a story.",
    theory: [
      "Commands mutate the write model with whatever isolation you need. Queries hit a read model optimized for the screen: denormalized tables, caches, search indexes. The two sync through events (outbox/CDC). Lag is explicit. You can scale the read store horizontally without touching write transactions.",
      "CQRS is a spectrum. Light: a SQL write DB plus a materialized view or cache. Heavy: separate services, event-sourced writes, multiple read stores. You do not need event sourcing to do CQRS (people conflate them). You do need an owner for 'the read model is wrong' — rebuild from events or from the write DB.",
      "The tax is dual schemas, eventual UI ('processing'), and more failure modes. Do not CQRS a simple CRUD admin tool.",
    ],
    howItWorks: [
      "Identify commands (must be correct) vs queries (must be fast).",
      "Keep a write store for invariants; publish changes.",
      "Build one read model per expensive screen or API.",
      "Expose freshness (version, updated_at) if the UI needs it.",
      "Provide a rebuild path from the source of truth.",
    ],
    whenToUse: [
      "Read/write ratio is extreme or the payloads are wildly different.",
      "Search/analytics/feeds sitting on an OLTP core.",
      "Multiple subscribers of the same writes.",
    ],
    whenNotToUse: [
      "A single small app with balanced CRUD.",
      "When you cannot tolerate any read lag and have no sync option.",
    ],
    tradeoffs: [
      "Independent scale and schemas vs sync complexity.",
      "Many read models: perfect screens, many ways to drift.",
      "Sync in-txn update of a read table: stronger, write amplification.",
    ],
    interviewTips: [
      "Use CQRS language for feed/search/analytics sitting on orders/users.",
      "Mention outbox as the glue so it does not sound like dual-write.",
    ],
    pitfalls: [
      "Two write models (that is not CQRS, that is a fight).",
      "No rebuild — a bug permanently poisons the view.",
      "Users never told the view is eventual.",
    ],
    practiceIdeas: [
      "Split an e-commerce 'place order' vs 'seller dashboard' into CQRS.",
      "List three read models fed from one order service.",
    ],
    related: [
      "event-sourcing",
      "outbox",
      "normalize-vs-denormalize",
      "cdc",
      "newsfeed",
      "oltp-vs-olap",
    ],
  },
  {
    slug: "event-sourcing",
    track: "hld",
    category: "Data stores",
    title: "Event sourcing",
    summary:
      "The write-side source of truth is an append-only log of facts; current state is a fold over those events. Powerful, easy to overuse.",
    depth: "advanced",
    whyItMatters:
      "Ledgers, collaborative editing, and audit-heavy domains sometimes want the history as the data. Event sourcing is not 'we have Kafka.' It is a persistence choice with replay, versioning, and snapshotting. Interviews reward using it only where history is the product.",
    theory: [
      "Instead of UPDATE balance = 90, you append Debited(10). State is derived. You get an audit trail, time travel, and many read models for free (CQRS). You need event versioning (upcasters), idempotent append, and snapshots so you do not replay 10 years on every request. Optimistic concurrency is 'expected version' on the stream.",
      "Event sourcing pairs naturally with a log (Kafka, EventStoreDB, or an events table). It does not replace a query store — you still project. GDPR deletion is awkward (rewrite streams, crypto-shredding). Migrating a mistaken event type is harder than ALTER TABLE. Most CRUD products should not event-source user settings.",
      "A ledger can be event-sourced without the whole company becoming event-sourced. Do not confuse CDC (derived from tables) with event sourcing (events are the tables).",
    ],
    howItWorks: [
      "One stream per aggregate (account_id); append with expected version.",
      "Snapshot every N events; load snapshot + tail to serve commands.",
      "Project to read models asynchronously; rebuild when projections change.",
      "Version events; write upcasters for old payloads.",
      "Plan erasure: crypto-shred keys or compacted PII events.",
    ],
    whenToUse: [
      "Wallets, booking histories, collaborative documents, workflows you must replay.",
      "When the business already speaks in facts ('PaymentCaptured').",
      "Audit/compliance that must reconstruct any past state.",
    ],
    whenNotToUse: [
      "Simple CRUD profiles and CMS pages.",
      "Ultra-hot counters where a fold is too expensive and a snapshot is just a counter.",
    ],
    tradeoffs: [
      "Perfect history and projections vs complexity and PII headaches.",
      "Snapshots: faster load, more code to invalidate.",
      "Long streams: rich analytics, storage and replay cost.",
    ],
    interviewTips: [
      "For payments/wallet, you can event-source the ledger and still use SQL rows as the snapshot.",
      "Say how you handle a bug in a projector (rebuild) vs a bug in an event (that's a new compensating event).",
    ],
    pitfalls: [
      "Mutable 'events' — then it is not a log.",
      "One global stream — no parallelism.",
      "PII in immortal events with no shred plan.",
    ],
    practiceIdeas: [
      "Model a wallet as events + nightly snapshot; show a disputed charge replay.",
      "Compare event sourcing vs CDC-from-tables for the same audit requirement.",
    ],
    related: [
      "cqrs",
      "payments-wallet",
      "outbox",
      "queues-pubsub-streams",
      "retention-deletion",
      "acid-vs-base",
    ],
  },
  {
    slug: "cache-patterns",
    track: "hld",
    category: "Data stores",
    title: "Cache patterns: aside, through, behind, invalidation, TTL, stampede",
    summary:
      "Where the cache sits on the read/write path, how it goes stale, and how you stop a TTL expiry from becoming a database outage.",
    depth: "core",
    whyItMatters:
      "Caches are in every passing HLD. The bar is the pattern name, the invalidation story, and stampede control. 'We'll add Redis' without that is incomplete.",
    theory: [
      "Cache-aside (lazy): app reads cache, on miss loads DB and fills. Writes update DB then delete (or update) the key. Simple, cache can die, risk of stampede on miss. Write-through: app writes cache and DB together (cache library or proxy). Read-through: cache itself loads the DB on miss (sidecar, CDN origin, read-through Redis modules). Write-behind (write-back): write cache first, flush to DB later — fast writes, durability risk, hard crash story.",
      "Freshness: TTL (simple, herds at expiry), explicit invalidation on write (precise, easy to miss a key), versioned keys (user:42:v7 — cheap bust), and stale-while-revalidate (serve stale, refresh one flyer). Multi-layer: browser → CDN → app Redis → DB. Each layer needs a key design and a bust story. Consistency with the DB is eventual unless you write-through in the same mental transaction (still not ACID across both).",
      "Stampede: many readers miss at once. Mitigate with singleflight/locks, probabilistic early expire, tiny staggered TTLs, and a hot-key replica. Negative caching (cache 'not found') stops missing-key DDoS. Thundering herds also happen on reconnect after a Redis blip — use backoff.",
    ],
    howItWorks: [
      "Default cache-aside + delete-on-write for OLTP objects.",
      "Version or namespace keys so deploys can ignore old shapes.",
      "Set TTL as a safety net even when you invalidate.",
      "Coalesce misses; jitter TTLs on hot keys.",
      "Never cache another tenant's data under a shared key.",
    ],
    whenToUse: [
      "Read-heavy objects, sessions, rendered feeds, CDN assets.",
      "Write-through for small, critical keys you always read after write.",
      "Write-behind only for loss-tolerant high-write data (some counters).",
    ],
    whenNotToUse: [
      "Do not cache-aside a write-heavy unique inventory without a lock/version.",
      "Do not write-behind payments.",
    ],
    tradeoffs: [
      "Aside: simple, stampede and stale-if-you-forget-delete.",
      "Through: tighter, extra write latency and coupling.",
      "Behind: write speed, crash = lost writes.",
      "Long TTL: hit rate, staleness.",
    ],
    interviewTips: [
      "Name aside vs through and say 'delete the key on write, TTL 5m as backup.'",
      "For celebrities, mention singleflight + replicate the hot key.",
    ],
    pitfalls: [
      "Inconsistent key hashing so you cannot delete what you wrote.",
      "Caching personalized pages at the CDN.",
      "No TTL and a leak — Redis full, evicting the useful keys.",
    ],
    practiceIdeas: [
      "Implement cache-aside with singleflight for a profile API.",
      "Design invalidation for a post edit that lives in feed, search, and CDN.",
    ],
    related: [
      "redis-vs-memcached",
      "hot-keys-partitions",
      "cdn",
      "distributed-cache",
      "consistency-models",
      "newsfeed",
    ],
  },
  {
    slug: "redis-vs-memcached",
    track: "hld",
    category: "Data stores",
    title: "Redis vs Memcached",
    summary:
      "Memcached is a simple distributed memory map. Redis is a data-structure server (and more). Pick based on structures, persistence, and ops — not vibes.",
    depth: "core",
    whyItMatters:
      "Interviewers still ask this comparison. The useful distinction is richness vs simplicity, plus what you should not use Redis for (primary source of truth for money).",
    theory: [
      "Memcached: in-memory KV, multithreaded, LRU, no fancy types, no persistence. You scale by consistent hashing on the client. It is a great dumb cache. If the process dies, the cache is empty — that is the contract.",
      "Redis: strings, hashes, lists, sets, sorted sets, streams, geo, Lua, pub/sub, optional AOF/RDB persistence, replication, Cluster. One thread (plus I/O threads in newer versions) for command execution — big values and hot keys stall everyone. Persistence does not make Redis your ledger; fsync settings and replication still lose data in some modes, and the data model is not relational constraints.",
      "Use Redis for caches, sessions, rate-limit counters, leaderboards (ZSET), locks (with care), ephemeral pub/sub, and streams at moderate scale. Use Memcached when you want a simple, CPU-friendly cache fleet and nothing else. Use both if you already have them; do not run two without a reason.",
    ],
    howItWorks: [
      "Cache-aside objects: either works; Memcached if you only need GET/SET.",
      "Counters, TTL keys, ZSET, lists: Redis.",
      "Cluster or a fleet with a client hash; watch hot keys.",
      "If you enable persistence, still define RPO — RDB snapshots are not 'durable SQL.'",
      "Separate Redis roles (cache vs queue) so eviction on the cache does not drop jobs.",
    ],
    whenToUse: [
      "Memcached: large, uniform object cache, many cores.",
      "Redis: anything with structures, TTL logic, or light coordination.",
      "Managed offerings when you do not want to be on-call for persistence.",
    ],
    whenNotToUse: [
      "Do not store the only copy of orders in Redis.",
      "Do not use one Redis for cache (allkeys-lru) and a work queue.",
    ],
    tradeoffs: [
      "Memcached: simple and fast, feature-poor.",
      "Redis: versatile, single-threaded pitfalls and 'accidental database' risk.",
      "Persistence on: better recovery, worse latency and a false sense of durability.",
    ],
    interviewTips: [
      "Default 'Redis for cache + rate limits + sessions; Postgres for truth.'",
      "If they ask Memcached vs Redis, mention multithreading vs data structures in 20 seconds.",
    ],
    pitfalls: [
      "KEYS * in production.",
      "Huge values (multi-MB) blocking Redis.",
      "Using Redis lists as an infinite queue with no trim.",
    ],
    practiceIdeas: [
      "Design a session store and a rate limiter on Redis with key prefixes and eviction policy.",
      "Explain a Redis cache stampede after a failover (empty cache).",
    ],
    related: [
      "cache-patterns",
      "distributed-cache",
      "rate-limiting",
      "distributed-lock-scheduler",
      "hot-keys-partitions",
      "consistency-vs-durability",
    ],
  },
  {
    slug: "object-storage",
    track: "hld",
    category: "Data stores",
    title: "Object storage",
    summary:
      "S3-style blobs addressed by key: durable, cheap, high latency, weak at mutation and listing-as-a-database.",
    depth: "core",
    whyItMatters:
      "Images, video, backups, data lakes, and export files belong here — not on EBS attached to an API pod and not as BYTEA in Postgres. Interviews expect bucket + CDN + metadata in a DB.",
    theory: [
      "Object stores hold immutable-ish objects (put/overwrite/delete) with strong durability (11 nines folklore via erasure coding across AZs). They are HTTP APIs, eventually consistent on some listing operations depending on the vendor/era, and optimized for throughput not 1ms GETs. There is no POSIX rename atomicity across keys the way a filesystem feels; you design with keys and versions.",
      "Metadata (owner, content-type, ACLs) lives on the object and/or in your database. Listing millions of prefixes can be slow; do not use the bucket as a query engine. Lifecycle rules tier to cold storage and expire. Versioning and object lock help ransomware and accidental delete. Multipart upload is how you send GB files.",
      "Security: private buckets, signed URLs, no public list. Encryption at rest with KMS. Cross-region replication is a DR/product choice. Cost is storage + requests + egress — a naive chatty API to S3 will surprise you.",
    ],
    howItWorks: [
      "DB row holds object key, hash, size, and owner; bytes live in the bucket.",
      "Upload via presigned PUT or multipart; virus-scan in a worker if needed.",
      "Serve via CDN in front of the bucket; signed URLs for private objects.",
      "Lifecycle: expire temps, tier cold, abort abandoned multipart.",
      "Replicate or backup buckets that are not rebuildable.",
    ],
    whenToUse: [
      "User media, artifacts, dumps, lake files, static assets.",
      "Anything bigger than a few hundred KB that is write-once/read-many.",
      "Backups of databases and logs.",
    ],
    whenNotToUse: [
      "Do not store 100-byte session blobs at 50k QPS as individual objects.",
      "Do not query-by-filter over object listings as your user search.",
    ],
    tradeoffs: [
      "Cheap durable bytes vs high TTFB and limited mutation.",
      "Many small objects: request costs and listing pain.",
      "Public bucket: simple CDN, leak risk.",
    ],
    interviewTips: [
      "For Instagram/YouTube/Dropbox, S3+CDN is the first storage sentence.",
      "Mention presigned upload so API boxes do not proxy every byte.",
    ],
    pitfalls: [
      "Public buckets with user data.",
      "No lifecycle — multipart trash and old versions forever.",
      "Using S3 as a filesystem for random small writes (that is EBS/EFS or a DB).",
    ],
    practiceIdeas: [
      "Design photo upload: presign, complete callback, thumbnail worker, CDN.",
      "Estimate request costs for 1 KB objects at 20k QPS vs batched files.",
    ],
    related: [
      "block-file-object",
      "cdn-origin",
      "chunked-resumable-upload",
      "image-video-pipelines",
      "dropbox",
      "encryption",
    ],
  },
  {
    slug: "search-inverted-index",
    track: "hld",
    category: "Data stores",
    title: "Search and inverted indexes",
    summary:
      "Map terms to posting lists so you can find documents by words, filters, and rank — a different engine than OLTP.",
    depth: "next",
    whyItMatters:
      "SQL LIKE will not do product search. Autocomplete, Instagram captions, and log search need an inverted index, ranking, and a freshness pipeline. Interviews want ES/Solr/OpenSearch or a managed equivalent plus CDC, not a sequential scan.",
    theory: [
      "An inverted index stores term → list of (doc, position, payload). Query parsing, analysis (stemming, n-grams), boolean retrieval, and ranking (BM25, learned rank) sit on top. Filters (price, geo) use doc values/bitsets. Relevance is a product, not a boolean. Shards split the corpus; a query fans out (scatter-gather) — p99 is the slow shard.",
      "Writes are not a SQL UPDATE. You index or reindex documents; near-real-time refresh makes them searchable after a delay. Deletes are markers until merge. You feed the index from the source of truth via CDC/outbox, not as the source of truth. Mapping (schema) changes can require reindex.",
      "Autocomplete uses edge n-grams, completion suggesters, or a trie prefix store. Log search is the same engine with time indexes and retention. Do not put your checkout transactions only in Elasticsearch.",
    ],
    howItWorks: [
      "OLTP owns documents; a pipeline upserts ES docs by id.",
      "Design mappings: analyzers for text, keyword for filters, geo for maps.",
      "Shard by a key that balances size; avoid one giant time shard if you can roll indexes.",
      "Budget refresh interval vs freshness SLO.",
      "Rate-limit search; it is CPU-heavy and abuse-prone.",
    ],
    whenToUse: [
      "Full-text, faceted product search, log analytics, autocomplete.",
      "Multi-field ranking you cannot express in SQL cheaply.",
      "Geo + text ('coffee near me').",
    ],
    whenNotToUse: [
      "Primary store for records that need transactions.",
      "Exact kv get-by-id — use the DB or Redis.",
    ],
    tradeoffs: [
      "Relevance and flexibility vs lag, ops, and scatter-gather tails.",
      "More shards: parallelism and overhead / hot shards.",
      "NRT refresh: fresher search, more resource use.",
    ],
    interviewTips: [
      "For autocomplete/Instagram/maps, draw DB → CDC → index → search API.",
      "Mention abuse and expensive queries (deep pagination — use search_after).",
    ],
    pitfalls: [
      "Deep from/size pagination on huge result sets.",
      "Index as source of truth.",
      "One replica in one AZ for the search cluster.",
    ],
    practiceIdeas: [
      "Design mappings for a product catalog and a CDC pipeline.",
      "Compare prefix SQL vs n-gram index for typeahead at 10M queries/day.",
    ],
    related: [
      "autocomplete",
      "cdc",
      "indexes",
      "maps-nearby",
      "hedged-requests",
      "instagram",
    ],
  },
  {
    slug: "specialized-stores",
    track: "hld",
    category: "Data stores",
    title: "Time-series, graph, and columnar stores",
    summary:
      "Engines built for append-only metrics, multi-hop relationships, and analytic scans — when a row store is the wrong shape.",
    depth: "next",
    whyItMatters:
      "Presence heartbeats, friend-of-friend, and warehouse scans each punish Postgres in different ways. Naming a TSDB, graph DB, or column store shows you match the access pattern. Using all three on a TODO app shows you do not.",
    theory: [
      "Time-series DBs (Prometheus, Timescale, Influx, VictoriaMetrics) optimize append, downsample, and query-by-time-and-tags. They compress well, expire old samples, and struggle at arbitrary relational joins. Use them for metrics, IoT, and some financial ticks — not for user profiles.",
      "Graph DBs (Neo4j, Neptune) and graph layers (edge tables + careful SQL, or Zanzibar-like) optimize traversals: friends, recommendations, authz. At huge scale, many social companies use sharded edge lists in KV/SQL rather than a single graph product. The design issue is fan-out and celebrity nodes, not Cypher syntax.",
      "Columnar stores (Parquet + warehouse, ClickHouse, Redshift, BigQuery) store values by column for huge scans, compression, and aggregates. They are OLAP. They are poor at point-update OLTP. Graph/column/TS can also appear as features inside general systems (Postgres extensions) — operational simplicity may beat a new database until volume forces the issue.",
    ],
    howItWorks: [
      "Metrics/heartbeats → TSDB or a metrics pipeline, not rows per beat in OLTP.",
      "Multi-hop social/authz → edge tables or a graph service with caching.",
      "Wide analytics → columnar warehouse/lakehouse fed by CDC/batch.",
      "Start with extensions (Timescale, pgvector) if volume is modest.",
      "Keep OLTP as the system of record unless the specialized store truly owns the domain.",
    ],
    whenToUse: [
      "TSDB: SLI metrics, device telemetry, trading ticks.",
      "Graph: fraud rings, recommendations, ReBAC.",
      "Columnar: funnels, finance rollups, ad-hoc BI.",
    ],
    whenNotToUse: [
      "Do not put checkout rows in ClickHouse as the only copy.",
      "Do not traverse 6 hops on every page view without a cache.",
    ],
    tradeoffs: [
      "Specialized speed vs another operational system and sync.",
      "Postgres extensions: fewer moving parts, earlier ceiling.",
      "Graph product vs DIY edges: query power vs known scale path.",
    ],
    interviewTips: [
      "For metrics pipeline and ads, say columnar/OLAP; for presence, TS or in-memory; for friends, edge tables.",
      "Name the query you are optimizing in one line.",
    ],
    pitfalls: [
      "High-cardinality labels in a TSDB (user_id on every metric).",
      "Graph query that explodes at a celebrity node.",
      "Point updates in a columnar table designed for batch loads.",
    ],
    practiceIdeas: [
      "Pick stores for Uber: trips OLTP, GPS traces TS, fraud graph, payouts warehouse.",
      "Estimate cardinality of a metrics label set and decide what not to tag.",
    ],
    related: [
      "oltp-vs-olap",
      "metrics-pipeline",
      "maps-nearby",
      "observability",
      "sql-vs-nosql",
      "newsfeed",
    ],
  },
  {
    slug: "oltp-vs-olap",
    track: "hld",
    category: "Data stores",
    title: "OLTP vs OLAP, warehouses, and data lakes",
    summary:
      "Operational transactions versus analytic scans — and the modern lake/warehouse/lakehouse stack that copies data out of the primary.",
    depth: "core",
    whyItMatters:
      "A CEO dashboard query on the production primary is an outage waiting to happen. HLD for any sizable product includes an analytics path: CDC or events into a warehouse/lake, not 'we'll add indexes.'",
    theory: [
      "OLTP systems run many small, consistent reads/writes (orders, users). They want indexes, rows, and transactions. OLAP systems run fewer, heavier scans and aggregations (revenue by week, funnels). They want columns, partitions, and denormalized facts/dimensions. Mixing them on one box couples a report to checkout latency.",
      "A warehouse (Snowflake, BigQuery, Redshift) is a managed OLAP database: SQL, governance, expensive storage+compute separation. A data lake is files in object storage (Parquet on S3) with a catalog; cheap and raw, easy to become a swamp. A lakehouse (Iceberg/Delta/Hudi + an engine) adds transactions and schema to files so batch and some streaming can share.",
      "The pipeline is the design: OLTP → CDC/events → stream/batch → curated tables → BI/ML. Freshness SLOs differ (1 minute vs next morning). Do not let analysts create indexes on the primary. For real-time product features (in-app analytics), you may need a serving OLAP (ClickHouse, Druid) in front of the warehouse.",
    ],
    howItWorks: [
      "Forbid heavy ad-hoc SQL on the primary; give replicas or, better, a warehouse.",
      "Land raw events/files, then build clean models (dbt-like layers).",
      "Partition by time; expire or tier old raw data.",
      "Separate PII; warehouse access is an IAM problem.",
      "For product-facing dashboards, use a serving store with an SLO, not a 40s warehouse query.",
    ],
    whenToUse: [
      "Warehouse/lake: BI, ML training, finance, audit dumps.",
      "Serving OLAP: in-app analytics, high-QPS aggregates.",
      "Keep OLTP thin and boring.",
    ],
    whenNotToUse: [
      "Do not run the daily 2TB scan on the primary 'off-hours' as the long-term plan.",
      "Do not use the lake as a system of record for money.",
    ],
    tradeoffs: [
      "Warehouse: SQL and governance, cost at scale and latency.",
      "Lake: cheap raw storage, quality and discovery problems.",
      "Lakehouse: middle path, still an engineering product.",
    ],
    interviewTips: [
      "After the OLTP sketch, add a one-line analytics path — it signals completeness.",
      "For ads/metrics, go deeper: stream serving + batch warehouse reconcile.",
    ],
    pitfalls: [
      "PII copied to a lake with no access control.",
      "No catalog — 12 copies of 'orders.'",
      "Real-time UI pointed at a 15-minute warehouse.",
    ],
    practiceIdeas: [
      "Draw a medallion (bronze/silver/gold) pipeline from checkout events.",
      "Choose warehouse vs ClickHouse for an in-app 'your week in review.'",
    ],
    related: [
      "cdc",
      "batch-vs-stream",
      "specialized-stores",
      "metrics-pipeline",
      "ad-click-aggregator",
      "pii-gdpr",
    ],
  },
];
