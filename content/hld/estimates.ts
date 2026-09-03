import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "back-of-envelope",
    track: "hld",
    category: "Estimates",
    title: "Back-of-envelope: QPS, storage, bandwidth",
    summary:
      "Rough math that turns '100 million users' into QPS, disk, and NIC numbers so the rest of the design has constraints.",
    depth: "core",
    whyItMatters:
      "Interviewers are not grading your arithmetic to the last byte. They want to see that you can convert a product story into capacity, pick a store that fits, and notice when a chatty design will melt a NIC. This is how you justify caches, shards, and CDNs instead of waving at boxes.",
    theory: [
      "Start from DAU (or peak concurrent), actions per user per day, and a peak-to-average ratio. QPS ≈ (DAU × actions/day) / 86,400, then multiply by 2–5× for peak, launches, and retries. Reads and writes need separate lines: a newsfeed is often 100:1, a URL shortener redirect is almost all reads, a metrics ingest is almost all writes. Always state assumptions out loud so the interviewer can correct the product, not your algebra.",
      "Storage is records × size × retention × replication. A 300-byte tweet at 200M/day is ~60 GB/day raw; 3× replication and indexes can make it 200+ GB/day. Photos and video dominate: one 1 MB image at 10M uploads/day is 10 TB/day before variants. Separate 'source of truth' from caches and derived indexes — they have different retention and rebuild stories.",
      "Bandwidth is QPS × payload on each hop: client ↔ edge, app ↔ cache, app ↔ DB, inter-AZ replication. A 50k QPS API with 5 KB responses is ~2 Gbit/s just egress, before fan-out. Cross-region replication of a write-heavy log can cost more than serving users. These numbers tell you when you need a CDN, compression, pagination, or a binary protocol.",
    ],
    howItWorks: [
      "Write the assumptions: users, DAU fraction, requests/user, peak factor, payload, retention, replicas.",
      "Compute write QPS, read QPS, then storage/day and storage/year.",
      "Compute egress and inter-service bandwidth; flag anything above a few Gbps per box.",
      "Map numbers to boxes: one Postgres primary might do low-to-mid thousands of write QPS; a cache node can do hundreds of thousands of tiny GETs.",
      "Round to orders of magnitude. 10^4 vs 10^6 changes the design; 12,347 vs 11,900 does not.",
    ],
    whenToUse: [
      "Every HLD interview, in the first 5–8 minutes after requirements.",
      "When choosing SQL vs object store vs stream, or one region vs many.",
      "When a feature looks cheap until you multiply by fan-out or video bitrate.",
    ],
    whenNotToUse: [
      "Do not spend 15 minutes on precise GB if the bottleneck is clearly consistency or a unique constraint.",
      "Do not invent six-significant-digit DAU when the prompt gave none — pick a round number and proceed.",
    ],
    complexity: {
      time: "O(1) arithmetic per resource",
      space: "A few lines on the board",
      notes: "Accuracy to an order of magnitude is the goal; wrong peak factor is worse than sloppy bytes.",
    },
    tradeoffs: [
      "Conservative peaks over-provision and hide hot-key issues; optimistic peaks look elegant and page at launch.",
      "Counting only primary storage underestimates indexes, WAL, and backups (often 2–5×).",
    ],
    interviewTips: [
      "Talk while you compute: 'I'll assume 100M users, 20% DAU, 10 reads/day… that's ~2.3k average read QPS, say 10k peak.'",
      "Keep a cheat sheet: 10^5 seconds/day, 1 KB × 1k QPS ≈ 1 MB/s, 1 TB disk, 1 Gbps NIC.",
      "Use estimates to drive the next box: '10 TB/day of video → object storage + CDN, not MySQL blobs.'",
    ],
    pitfalls: [
      "Forgetting peak, retries, and bots — production QPS is not DAU/86400.",
      "Storing media in the OLTP database because 'it's simpler.'",
      "Ignoring replication and index overhead in storage math.",
    ],
    practiceIdeas: [
      "Estimate Twitter-like posts, Instagram-like photos, and WhatsApp-like messages for 500M users.",
      "Redo a URL shortener estimate at 100× redirect QPS and see what breaks first.",
    ],
    related: [
      "fan-out-read-write-ratio",
      "percentiles",
      "capacity-planning",
      "cost",
      "hld-interview-method",
      "url-shortener",
    ],
  },
  {
    slug: "fan-out-read-write-ratio",
    track: "hld",
    category: "Estimates",
    title: "Fan-out and read/write ratio",
    summary:
      "How many downstream writes or reads one user action creates — and whether the product is read-heavy, write-heavy, or celebrity-heavy.",
    depth: "core",
    whyItMatters:
      "Read/write ratio decides caches, replicas, and CQRS. Fan-out decides whether you push work at write time (newsfeed) or pull at read time (on-demand join). Celebrities break naive fan-out-on-write. If you skip this, your boxes are fiction.",
    theory: [
      "Read/write ratio is read QPS divided by write QPS. URL redirects and product catalogs can be 100:1 to 1000:1 — caches and replicas win. Telemetry and click ingest can be 1:100 — you need streams, batching, and cheap sequential writes, not a chatty normalized OLTP path. Many social products are read-heavy in the aggregate and write-heavy at the celebrity tail.",
      "Fan-out is amplification. A tweet to 1M followers, if pushed into each follower's timeline at write time, is 1M cache/DB writes. The same tweet pulled at read time is a few lookups plus a merge of followees' recent posts. Hybrid designs fan-out-on-write for normal users and fan-out-on-read for celebrities. Notifications, presence, and live comments all have a fan-out shape.",
      "Hidden fan-out kills estimates: one page view that calls 12 microservices, a search that fans to 32 shards (scatter-gather), a cache miss that stampedes the DB, or a webhook that retries 10 partners. Write those multipliers next to QPS. Tail latency of scatter-gather is the slowest shard, not the average.",
    ],
    howItWorks: [
      "Split traffic into read APIs vs write APIs; estimate each.",
      "For each write, list fan-out targets: followers, devices, search index, cache invalidations, analytics.",
      "For each read, list fan-in: how many keys, shards, or services you touch.",
      "Choose push (write-time materialize) vs pull (read-time assemble) vs hybrid.",
      "Protect the tail: rate-limit fan-out workers, isolate celebrity paths, cache the merge.",
    ],
    whenToUse: [
      "Feeds, chat receipts, notifications, ACLs that expand to many objects.",
      "Any 'one action, many viewers' product (social, live, multiplayer).",
      "Microservice pages where you suspect an accidental N-service read.",
    ],
    whenNotToUse: [
      "Do not fan-out-on-write to millions of inboxes synchronously on the request path.",
      "Do not pull-assemble a feed that joins 5,000 followees on every scroll without a cache.",
    ],
    tradeoffs: [
      "Fan-out-on-write: fast reads, huge write amplification and storage, celebrity pain.",
      "Fan-out-on-read: cheap writes, heavier reads and more cache logic.",
      "Scatter-gather search: complete results, p99 tied to the worst shard.",
    ],
    interviewTips: [
      "Ask 'how many followers at p99?' before you commit to push vs pull.",
      "Draw two numbers on the board: user QPS and storage-QPS after fan-out.",
      "For APIs, mention BFF/aggregation so the mobile client is not the fan-out engine.",
    ],
    pitfalls: [
      "Designing Instagram as if every user has 200 followers.",
      "Synchronous notification sends inside the tweet transaction.",
      "Cache invalidation fan-out that is larger than the original write.",
    ],
    practiceIdeas: [
      "Compute write amplification for a 10M-follower celebrity vs a 200-follower user.",
      "Map a product page: list every service call and propose a join or cache to cut fan-out.",
    ],
    related: [
      "back-of-envelope",
      "fan-out-write-vs-read",
      "newsfeed",
      "notifications",
      "hot-keys-partitions",
      "cache-patterns",
    ],
  },
  {
    slug: "percentiles",
    track: "hld",
    category: "Estimates",
    title: "Percentiles: p50, p95, p99",
    summary:
      "Why averages lie, how tail latency becomes the user experience, and how percentiles should drive SLOs and capacity.",
    depth: "core",
    whyItMatters:
      "A 50ms average with a 3s p99 means many sessions feel broken. Load-test numbers quoted as means hide GC pauses, hot shards, and retry storms. HLD interviews expect you to SLO on a percentile and to know that p99 of a fan-out is not the p99 of one hop.",
    theory: [
      "A percentile pN is the latency (or size, or queue time) below which N% of samples fall. p50 is the median — typical happy path. p95 is 'most users on a bad day.' p99 and p99.9 are tails: GC, disk hiccups, lock waits, cold caches, and the one slow dependency. Averages pull toward the tail if the distribution is skewed, or hide the tail if most requests are tiny and a few are huge — either way they are the wrong SLO statistic for latency.",
      "Tails compose badly. If a page does 10 parallel calls each with p99 = 100ms, the page p99 is much worse than 100ms because someone hits a slow call. Sequential calls add. Retries multiply. This is why hedged requests, deadlines, and shrinking hop count exist. In estimates, 'the DB is 5ms' is p50 thinking; capacity is often p99 thinking plus headroom.",
      "Histograms and heat maps beat a single number. You care whether p99 is a thin spike (blip) or a fat shoulder (chronic saturation). SLO burn is usually a tail + error-rate story. For throughput systems, you may SLO on lag percentiles (Kafka consumer lag) rather than request latency.",
    ],
    howItWorks: [
      "Declare SLOs on p95 or p99 for user APIs, plus an error-rate SLI.",
      "Measure at the edge (what users see) and at each dependency (where time went).",
      "Use histograms with enough buckets; do not average averages across instances.",
      "When fan-out exists, estimate tail with 'max of N' intuition or a quick simulation, not p50 × N.",
      "Load-test until p99 breaks, not until average CPU is 70%.",
    ],
    whenToUse: [
      "Every latency budget and every user-facing SLO.",
      "Comparing caches, indexes, or a new hop ('this adds 20ms at p99, not 2ms').",
      "Queue systems: consume lag p99, not only messages/sec.",
    ],
    whenNotToUse: [
      "Do not SLO batch jobs on p99 of a single record if the business cares about job finish time.",
      "Do not treat a 60-second p99 from a webhook partner as your own API SLO — isolate it.",
    ],
    tradeoffs: [
      "Tighter p99: more over-provisioning, more caching, maybe less consistency work on the path.",
      "Alerting on p99 of low-QPS endpoints: noisy; use burn rates or longer windows.",
      "Hedging improves p99 and spends extra QPS.",
    ],
    interviewTips: [
      "Put a latency budget in percentiles: 'p99 200ms = 50 edge + 20 cache + 80 DB + 50 downstream.'",
      "If they give only average QPS, still speak p99 for the celebrity or the multi-get.",
      "Mention coordinated omission: if the tester slows down, reported latency looks better than reality.",
    ],
    pitfalls: [
      "Averaging latency across regions and calling it p99.",
      "One slow sync dependency that sets the page tail.",
      "No SLO on a critical async path — users wait on email/push and you only watch API p50.",
    ],
    practiceIdeas: [
      "Take 10 parallel 100ms-p99 calls and reason about page p99; then add a 50ms deadline.",
      "Read a histogram and explain whether you need more CPU, a better index, or a cache.",
    ],
    related: [
      "latency-vs-throughput",
      "sli-slo-sla",
      "hedged-requests",
      "observability",
      "back-of-envelope",
      "fan-out-read-write-ratio",
    ],
  },
  {
    slug: "hot-keys-partitions",
    track: "hld",
    category: "Estimates",
    title: "Hot keys, hot partitions, and thundering herds",
    summary:
      "When one key, shard, or cache entry absorbs traffic that your average-case math assumed was uniform — plus herds that stampede a backend.",
    depth: "next",
    whyItMatters:
      "Horizontal scale assumes a good partition key. Reality has celebrities, flash sales, and a single popular URL. Thundering herds turn a cache expire into a database outage. If you cannot name the hot-key plan, you have not finished the estimate.",
    theory: [
      "A hot key is a single item that gets a disproportionate share of reads or writes: a celebrity profile, a world-event hashtag, a product on the homepage, a leaderboard. Caching helps reads; it does not help a million writers incrementing one counter without sharding the counter. A hot partition is the same idea one level up: hash(user_id) still collocates a whale tenant or a popular time-range in a time-ordered shard.",
      "Thundering herd (cache stampede) is correlated demand: TTL expires, a deploy cold-starts, a dependency returns, everyone retries at once. The backend sees N times the steady QPS. Request coalescing (singleflight), probabilistic early expiration, and locking one filler are the standard mitigations. Client retries without jitter are a self-inflicted herd.",
      "Detection is part of the design: per-key QPS histograms, shard QPS imbalance, and 'top-K keys' from the cache or the LB. Fixes are local (cache the hot object on every edge node, split the counter into N stripes, isolate the tenant) or product-level (rate-limit the write, serve a slightly stale snapshot).",
    ],
    howItWorks: [
      "Assume a power-law: 1% of keys may be 50%+ of traffic. Design the p99 key, not the mean.",
      "Read-hot: multi-layer cache, replicate the key to all cache nodes, long TTL + stale-while-revalidate.",
      "Write-hot: shard the key (stripe counters), buffer in a queue, or accept approximate values.",
      "Stop herds: coalesced refresh, jittered TTLs, retry jitter, token buckets at the edge.",
      "Keep an escape hatch: static fallback, feature flag, or precomputed snapshot for events.",
    ],
    whenToUse: [
      "Social graphs, flash sales, media, trending topics, multi-tenant SaaS with whale customers.",
      "Any cache with a short TTL on a popular key.",
      "Time-partitioned logs where 'today' is one shard.",
    ],
    whenNotToUse: [
      "Do not hash only on created_at for a write-heavy event table — the current bucket is always hot.",
      "Do not put a global lock around 'load this key' without a timeout; the lock becomes the hot key.",
    ],
    tradeoffs: [
      "Replicating a hot key everywhere: great reads, painful invalidation.",
      "Counter striping: write scale, approximate or extra read merge.",
      "Long TTL: fewer herds, more staleness.",
    ],
    interviewTips: [
      "After estimates, say 'this works if load is uniform; here's the celebrity/flash-sale path.'",
      "Name one concrete mitigation per hot type (read vs write vs herd).",
      "Tie to partition key choice in sharding and consistent hashing.",
    ],
    pitfalls: [
      "Using user_id of a celebrity as the only shard key for their inbound writes.",
      "TTL aligned across millions of clients (expire-at-midnight herds).",
      "Autoscaling that adds app pods which all miss the same cold cache.",
    ],
    practiceIdeas: [
      "Design a ticket drop for 1M users on 10k seats: keys, queues, and what you cache.",
      "Add jitter + singleflight to a cache-aside snippet and describe the failure you prevented.",
    ],
    related: [
      "sharding",
      "consistent-hashing",
      "cache-patterns",
      "rate-limiting",
      "ticketmaster",
      "trending-topics",
    ],
  },
];
