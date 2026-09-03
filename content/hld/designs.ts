import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "url-shortener",
    track: "hld",
    category: "Classic designs",
    title: "Design a URL shortener",
    summary:
      "The canonical first HLD: mint a short code, redirect fast, and survive read-heavy QPS with caches — plus uniqueness, expiry, and abuse.",
    depth: "core",
    whyItMatters:
      "This problem teaches the 7-step method in miniature: tiny write path, huge read path, ID generation, and a cache. If you cannot walk it cleanly, later designs will ramble.",
    theory: [
      "Requirements: shorten a long URL to a unique short code; HTTP 302/301 to the original; optional custom alias, TTL, and basic analytics (click count). NFRs: extremely read-heavy, low latency on redirect (p99 tens of ms), high availability, codes unguessable enough to avoid scraping private links. Out of scope v1: full BI, logged-in teams, QR — say so.",
      "Estimates: 100M new URLs/month ≈ 40 writes/s peak a few hundred. Redirects at 10k–100k QPS if it is a public bit.ly. Storage: 500 B/row × 100M × 5 years with 3× replication is still tens of TB — SQL or a KV is fine; not the hard part. Bandwidth is redirect QPS × small headers. Cache hit ratio should be 80–95% on popular codes.",
      "API: POST /v1/urls {long_url, ttl?, alias?} → {code, short_url}; GET /{code} → 302 Location; GET /v1/urls/{code}/stats (auth). Idempotency-Key on POST so retries do not mint extras. Validate URL scheme (no javascript:), auth for custom aliases, rate-limit anonymous minting (spam).",
      "Data: table urls(code PK, long_url, user_id, expires_at, created_at). Code from base62(Snowflake or range ticket) or a hash of the URL with collision retry. Unique index on alias. Redis cache code→long_url, TTL aligned with expiry. Analytics: incr a Redis counter, flush async — do not +1 SQL on the redirect path.",
      "Bottlenecks and evolution: cache + CDN cannot cache personalized 302s easily; cache at the app/Redis. Hot codes (viral) are the celebrity key — replicate the cache entry. Writes stay on one primary for a long time; shard by code hash if the table is huge. Custom aliases need uniqueness (CP). 301 vs 302: 301 caches in browsers (cheaper, worse stats and harder to change). Add bloom filter for missing codes to stop scans. Abuse: malware URL scanning async after create.",
    ],
    howItWorks: [
      "Generate unique code (Snowflake → base62) with a collision retry; persist; return short URL.",
      "Redirect path: Redis get → else DB → fill cache → 302. Never block on analytics.",
      "Expire via TTL job or lazy check of expires_at.",
      "Rate-limit create; validate URLs; optional malware queue.",
      "Multi-AZ Redis + SQL; DNS to L7 LB; scale-out stateless redirectors.",
    ],
    whenToUse: [
      "Interview warm-up and any product that needs compact links (SMS, tweets).",
      "As a template for read-heavy KV + cache.",
    ],
    whenNotToUse: [
      "Do not over-design Kafka and 12 microservices for this prompt.",
      "Do not store only in Redis if links must survive a flush.",
    ],
    tradeoffs: [
      "301 vs 302: client cache vs accurate counts and editable targets.",
      "Hash of URL vs new id each time: dedup vs two users' separate stats.",
      "SQL vs KV: query/admin vs raw scale — SQL wins far longer than people think.",
    ],
    interviewTips: [
      "Lead with read path latency budget and cache; ID gen is the write deep dive.",
      "Ask 301 vs 302 and whether aliases must be globally unique.",
      "Walk a missing code (404) and an expired code without a table scan.",
    ],
    pitfalls: [
      "Predictable incrementing codes → scrape.",
      "Redirect path hitting SQL + analytics synchronously.",
      "No uniqueness on custom aliases.",
    ],
    practiceIdeas: [
      "Timebox a 35-minute whiteboard using the 7-step method only.",
      "Add custom domains and per-org namespaces as a v2 twist.",
    ],
    related: [
      "hld-interview-method",
      "unique-ids",
      "cache-patterns",
      "back-of-envelope",
      "pastebin",
      "unique-id-generator",
    ],
  },
  {
    slug: "pastebin",
    track: "hld",
    category: "Classic designs",
    title: "Design Pastebin / file share",
    summary:
      "Upload text or a file, get a link, download or view — object storage for bytes, metadata in a DB, optional expiry and privacy.",
    depth: "core",
    whyItMatters:
      "This is URL shortener plus blobs. It teaches 'metadata vs bytes,' presigned upload, and public vs private links. It is the on-ramp to Dropbox.",
    theory: [
      "Requirements: create a paste (text or file), retrieve by id, optional password/unlisted, TTL, size limit, raw vs rendered view. NFRs: writes of large files must not go through app RAM; downloads via CDN; availability over strong consistency of view counts.",
      "Estimates: 10M creates/day of 50 KB average is 500 GB/day — object storage. Metadata 300 B × 10M is cheap SQL. Download QPS can dwarf creates; CDN is mandatory for popular pastes. Peak is viral gists.",
      "API: POST /pastes (metadata) → {id, upload_url}; PUT bytes to presigned object (or POST body for small text); GET /p/{id} HTML; GET /raw/{id}; DELETE. Idempotency on create. Range requests for large files.",
      "Data: pastes(id, owner, visibility, hash, size, object_key, expires_at). Bytes in S3. Redis for hot raw content under a size cap. Virus scan worker for file uploads. Unlisted ids must be unguessable (long token), not base62(autoincrement).",
      "Evolution: add syntax highlight as async HTML snapshot; add comments (another service); add team visibility (ACL). Bottleneck is egress and a hot viral file — CDN + origin shield. Abuse: size quotas, rate limits, malware. GDPR: delete object + metadata + CDN purge.",
    ],
    howItWorks: [
      "Mint unguessable id; insert metadata; presign PUT; client uploads; complete marks ready.",
      "Read: authz → CDN/signed GET or small-text cache.",
      "TTL lifecycle on the bucket and a DB sweeper.",
      "Scan files async; take down on hit.",
      "Stats via async counters like the URL shortener.",
    ],
    whenToUse: [
      "Gist-like products, ephemeral file drop, interview follow-on to URL shortener.",
      "Anytime metadata+object split is the lesson.",
    ],
    whenNotToUse: [
      "Do not put 50 MB pastes in Postgres TEXT.",
      "Do not use sequential ids for 'unlisted' pastes.",
    ],
    tradeoffs: [
      "Text in DB vs always S3: simple queries vs one path for all sizes.",
      "Public CDN vs signed URLs: speed vs leakage of the link.",
      "Render on read vs pre-render: CPU vs storage.",
    ],
    interviewTips: [
      "Call out unguessable ids and presigned upload in the first diagram.",
      "Compare to Dropbox: no sync client, no folders — keep scope tight.",
    ],
    pitfalls: [
      "XSS from rendered HTML pastes — escape or sandbox.",
      "No size limit.",
      "Caching a password-protected paste at the CDN.",
    ],
    practiceIdeas: [
      "Add password + one-time view and explain cache implications.",
      "Estimate a viral 2 GB ISO file at 50k concurrent downloads.",
    ],
    related: [
      "url-shortener",
      "object-storage",
      "chunked-resumable-upload",
      "cdn-origin",
      "dropbox",
      "unique-ids",
    ],
  },
  {
    slug: "rate-limiter-system",
    track: "hld",
    category: "Classic designs",
    title: "Design a rate limiter",
    summary:
      "A distributed service that decides allow/deny (and remaining quota) at tens or hundreds of thousands of QPS without becoming the outage.",
    depth: "core",
    whyItMatters:
      "You already know token buckets. This design is about placement (gateway vs sidecar vs service), a shared counter store, hot keys, and fail-open vs fail-closed.",
    theory: [
      "Requirements: limit by key (IP, user, API key, route), return 429 + Retry-After, support burst + sustained rate, multi-data-center, near-real-time config changes. NFR: limiter p99 ≪ API p99 (1–2ms extra), availability: usually fail-open if Redis dies (availability) except for login/OTP (fail-closed).",
      "Estimates: every API request is a limiter request. 200k QPS of INCR is a Redis cluster problem, not a single instance. Keys = active identities in a window — millions possible, so TTL on counters. Config watches are rare compared to checks.",
      "API: Check(key, cost) → {allow, remaining, reset}; or a sidecar/envoy filter. Admin: upsert rules. Optionally batch Check for several keys (user + IP + route).",
      "Data: Redis token-bucket or sliding-window counters, Lua for atomicity, key = {policy}:{id}:{window}. Rules in a replicated config (etcd, or poll). Local sliding window in memory as L1 with periodic reconcile for coarse limits; Redis for paid quotas that must be accurate.",
      "Bottlenecks: hot celebrity API keys — shard the counter or use local + async. Clock skew on windows — prefer token bucket. Multi-region: local limiters + eventual sync (may over-admit) or a regional quota. Evolution: hierarchical limits, adaptive limits from backend saturation, and a waiting-room mode for ticket drops.",
    ],
    howItWorks: [
      "Gateway extracts identity; calls limiter (or Lua on Redis) atomically.",
      "On deny, 429 without hitting the app; on allow, decrement remaining.",
      "Replicate rule config; keep a local cache of policies.",
      "Fail-open or closed per policy class; metric both.",
      "Jittered TTLs; shard hot keys; circuit-break the limiter itself.",
    ],
    whenToUse: [
      "Public APIs, login, search, multi-tenant fairness, ticket drops.",
      "As a standalone interview problem or a box inside larger designs.",
    ],
    whenNotToUse: [
      "Do not put the limiter on the far side of a 30ms remote region for every request.",
      "Do not use a SQL row lock per API call.",
    ],
    tradeoffs: [
      "Central Redis: accurate, extra hop and hotspot.",
      "Local-only: fast, over-admit by N pods.",
      "Fail-open: availability, abuse during an outage.",
    ],
    interviewTips: [
      "Pick token bucket + Redis Lua + fail-open default; call out login fail-closed.",
      "Draw where it sits (edge vs service) and why both exist.",
    ],
    pitfalls: [
      "Fixed window double-burst.",
      "Limiter as a single Redis instance in one AZ.",
      "No Retry-After — clients retry immediately.",
    ],
    practiceIdeas: [
      "Specify Lua for token bucket and list races without it.",
      "Design per-tenant + per-route + global emergency brake.",
    ],
    related: [
      "rate-limiting",
      "api-gateway",
      "hot-keys-partitions",
      "redis-vs-memcached",
      "public-api-platform",
      "ticketmaster",
    ],
  },
  {
    slug: "key-value-store",
    track: "hld",
    category: "Classic designs",
    title: "Design a key-value store",
    summary:
      "A Dynamo-style distributed KV: partition, replicate, put/get, and handle failures without a single primary for all keys.",
    depth: "advanced",
    whyItMatters:
      "This is the 'build Dynamo/Cassandra' interview. It pulls together consistent hashing, NWR, hinted handoff, and compaction. It is how you prove you understand data systems, not only boxes.",
    theory: [
      "Requirements: Put/Get/Delete by key, tunable consistency, high write availability, horizontal scale, TTL optional. NFRs: millions of keys, tens of thousands of QPS, multi-AZ, bounded staleness if R+W>N. v1 may skip range scans and SQL.",
      "Estimates: 1B keys × 2 KB × RF=3 ≈ 6 TB. 50k writes/s sequentialize per partition — you need many partitions. Memory vs disk: LSM on disk with cache, or in-memory with persistence.",
      "API: Put(k,v,w?), Get(k,r?), Delete; admin membership. Optional CAS(version). Client or coordinator applies quorum.",
      "Data: consistent hash ring + vnodes; each key on N nodes across AZs. Local engine: LSM (RocksDB) or log + index. WAL per node. Membership via gossip + a generation. Read repair and anti-entropy (Merkle) for silent drift. Leaderless or leader-per-partition — pick and defend.",
      "Bottlenecks: hot keys (split or cache), rebalance storms, compaction IO, clock skew if LWW. Evolution: secondary indexes (hard), transactions (per partition first), multi-DC LOCAL_QUORUM. Compare to 'just use Redis Cluster / DynamoDB' in a product interview — here they want the internals.",
    ],
    howItWorks: [
      "Hash key to ring; coordinator sends to N replicas; wait for W/R.",
      "On node failure, hinted handoff; later deliver home.",
      "Gossip membership; stream ranges on join/leave.",
      "LSM flush/compact in the background; cache hot blocks.",
      "Version values (vector clock or timestamp+id) for siblings.",
    ],
    whenToUse: [
      "Sessions, inboxes, huge sparse objects, interview 'design Dynamo.'",
      "When SQL is the wrong shape and you need predictable get/put.",
    ],
    whenNotToUse: [
      "Ad-hoc query, multi-key SQL joins, or a 10 GB dataset.",
      "Money ledgers that need serializable multi-key txns (unless you add them).",
    ],
    tradeoffs: [
      "Leaderless + W=1: available, conflicts.",
      "Leader per partition: simpler order, failover.",
      "LSM: write speed, read amp and compaction.",
    ],
    interviewTips: [
      "Draw the ring, N=3, W=2, R=2, then a node death.",
      "Mention Merkle trees in one sentence so they know you have read Dynamo.",
    ],
    pitfalls: [
      "hash % N with no plan to add nodes.",
      "LWW + NTP as the only versioning.",
      "Rebalancing the whole cluster at once.",
    ],
    practiceIdeas: [
      "Walk put/get during a 2-node partition with W=2 — what happens?",
      "Compare this design to Redis Cluster and DynamoDB in a table.",
    ],
    related: [
      "consistent-hashing",
      "quorum-nwr",
      "leader-vs-leaderless",
      "distributed-cache",
      "replication",
      "failure-modes",
    ],
  },
  {
    slug: "unique-id-generator",
    track: "hld",
    category: "Classic designs",
    title: "Design a unique ID generator",
    summary:
      "A service or library that hands out unique, optionally time-sortable 64-bit ids at high QPS without a single SQL sequence.",
    depth: "core",
    whyItMatters:
      "It looks small and hides clock skew, worker-id allocation, and availability. Many larger designs embed this; here it is the whole interview.",
    theory: [
      "Requirements: globally unique, ~10k–100k ids/s, roughly increasing, 64-bit preferred, low latency, works across DCs. Optional: no coordination on the hot path. Non-goals: cryptographic unpredictability (use tokens for that).",
      "Estimates: 100k/s is trivial for in-process sequences; the hard part is many machines. A single Redis INCR does 100k/s but is an AZ SPOF. Snowflake math: 41-bit ms + 10-bit worker + 12-bit seq ≈ 4096 ids/ms/worker × 1024 workers.",
      "API: GET /ids?n=128 batch, or a client library with no RPC. Batching cuts RTT if you use a ticket server.",
      "Approaches: (1) UUID v7 in-process — zero service; (2) Snowflake with worker ids from config/lease; (3) SQL/Leaf range allocator — nodes cache [lo,hi); (4) Redis INCR with HA (still weaker than you think on failover). Prefer (2) or (3) in interviews.",
      "Bottlenecks: clock rollback (wait or bump a generation), worker-id clash after a bad deploy, ticket server as a hotspot (use many logical sequences). Multi-region: independent worker-id spaces or region bits in the id. Evolution: expose a /health that fails if clock is unsynced.",
    ],
    howItWorks: [
      "Assign unique worker ids via lease (etcd) or static map.",
      "On mint: if time < last, wait or error; else increment seq or reset on new ms.",
      "Batch ranges if using tickets; persist the high-water mark.",
      "Fence leases so a paused process cannot reuse the worker id.",
      "Monitor clock offset and sequence exhaustion.",
    ],
    whenToUse: [
      "Tweets, chat messages, URL codes, any sharded insert key.",
      "When autoincrement cannot survive multiple primaries.",
    ],
    whenNotToUse: [
      "Do not add a network hop for ids if UUID v7 in-process is enough.",
      "Do not use ids as secret unguessable tokens.",
    ],
    tradeoffs: [
      "Snowflake: compact and sortable, clock/worker ops.",
      "UUID: simple, bigger and less local.",
      "Tickets: easy story, dependency on SQL/Redis.",
    ],
    interviewTips: [
      "Draw the 64-bit layout; compute capacity; then attack clocks.",
      "Say gaps are OK; duplicates are not.",
    ],
    pitfalls: [
      "Duplicate worker ids.",
      "Using NTP without a backward-clock policy.",
      "32-bit ids that overflow in a year.",
    ],
    practiceIdeas: [
      "Implement Snowflake in 40 lines and test a clock jump.",
      "Design Leaf-style ranges with crash-safe high-water marks (skip unused).",
    ],
    related: [
      "unique-ids",
      "url-shortener",
      "consensus-raft-paxos",
      "failure-modes",
      "newsfeed",
      "indexes",
    ],
  },
  {
    slug: "web-crawler",
    track: "hld",
    category: "Classic designs",
    title: "Design a web crawler",
    summary:
      "Polite, scalable fetch of the public web (or a domain set): frontier queue, politeness per host, parsers, and storage of HTML and links.",
    depth: "next",
    whyItMatters:
      "Crawlers teach URL frontier, politeness, dedup, and a firehose into storage/index. It is closer to a data platform than a user API.",
    theory: [
      "Requirements: given seed URLs, fetch pages, extract links, enqueue new URLs, store content, respect robots.txt and per-host rate, recrawl with freshness. NFR: billions of URLs, variable quality, must not DDoS a small site. Scope: not the full Google ranker in v1.",
      "Estimates: 1000 pages/s × 50 KB × 86400 ≈ 4 TB/day raw HTML. Frontier can be billions of URLs — cannot be one Redis list. DNS and TLS dominate fetch latency; throughput is connections × 1/RTT unless you pipeline.",
      "API: admin seeds, pause/resume, per-host limits; output is a stream of documents to the indexer (not a public GET).",
      "Data: URL frontier (priority queues sharded by host hash), seen/bloom + disk URL store for dedup, content store (object + hash for unchanged), robots cache, DNS cache. Parser workers are CPU. Scheduler ensures at most N outstanding per host.",
      "Bottlenecks: politeness (slow hosts stall a naive global queue — shard by host). Spider traps and infinite calendars — URL canonicalization and caps. Javascript-heavy pages need a costly renderer pool. Evolution: recrawl frequency by change rate, sitemap support, indexing pipeline (inverted index). Legal/ToS and allowlists for 'crawl this product' interviews.",
    ],
    howItWorks: [
      "Scheduler dequeues a host's next URL when its token bucket allows.",
      "Fetcher downloads; hasher; if new, store and parse links.",
      "Canonicalize and filter; enqueue unseen URLs with priority.",
      "Respect robots and crawl-delay; exponential backoff on errors.",
      "Emit documents to Kafka for indexers; recrawl via a separate calendar.",
    ],
    whenToUse: [
      "Search engines, SEO tools, site-limited crawlers, link preview fetchers (smaller).",
      "Interview variant: 'crawl 1B pages' vs 'preview unfurls' — size the politeness.",
    ],
    whenNotToUse: [
      "Do not crawl the web from one box with a list.",
      "Do not ignore robots.txt in a real product.",
    ],
    tradeoffs: [
      "Host-sharded frontier: polite and parallel, harder global priority.",
      "Render vs raw HTML: completeness vs cost.",
      "Exact seen-store vs bloom: memory, false-positive missed pages.",
    ],
    interviewTips: [
      "Lead with politeness and frontier sharding, not with Hadoop nostalgia.",
      "Ask seed set and whether JS render is in scope.",
    ],
    pitfalls: [
      "One queue mixing all hosts — one slow host or one huge host dominates.",
      "No canonicalization (http vs https, trailing slash) → infinite dupes.",
      "Storing full HTML forever with no change detection.",
    ],
    practiceIdeas: [
      "Design a 10k-host polite crawler with per-host buckets.",
      "Add a recrawl policy: news vs university pages.",
    ],
    related: [
      "queues-pubsub-streams",
      "object-storage",
      "search-inverted-index",
      "rate-limiting",
      "dlq",
      "batch-vs-stream",
    ],
  },
  {
    slug: "newsfeed",
    track: "hld",
    category: "Classic designs",
    title: "Design a newsfeed (Twitter-like)",
    summary:
      "Post once, read a ranked timeline — hybrid fan-out, caches, and a celebrity exception. The classic social HLD.",
    depth: "core",
    whyItMatters:
      "If you can explain push vs pull and a 10M-follower tweet, you can do Instagram, notifications, and live comments. This is a bar-raiser problem.",
    theory: [
      "Requirements: post a tweet, follow, home timeline (following), user timeline, likes/retweets v1 optional. NFR: read-heavy, p99 < 200ms for home, posts visible to most followers in a few seconds, 100M DAU class numbers. Ask media vs text-only.",
      "Estimates: 200M DAU × 20 home refreshes × 10 reads of items — read QPS in the 100ks. Writes: 200M × 5 posts/day / 86400 is thousands/s plus fan-out amplification. A 10M-follower push is 10M inbox writes — must be async workers, and you will not do that for every celebrity.",
      "API: POST /tweets, GET /timeline/home?cursor, GET /users/{id}/tweets, POST /follow. Auth, pagination cursors (tweet id), rate limits on post/follow.",
      "Data: tweets table (id Snowflake, author, text, ts) — source of truth. Graph: followers/followees (sharded). Home inbox: Redis/KV lists of tweet ids per user (push). Cache tweet objects. Celebrity set: skip push, mix in at read time. Search/hashtags are a separate index (defer or CDC).",
      "Bottlenecks: celebrity fan-out, cache stampede on a viral tweet object, graph DB hotspot. Evolution: ranking service (ML) on a candidate set, media via CDN, notifications async, multi-region home cache, mute/block filters at read. Consistency: author RYW; followers eventual a few seconds.",
    ],
    howItWorks: [
      "Post: write tweet → enqueue fan-out → 202/200 with tweet id.",
      "Workers push id into follower inboxes except celebrities.",
      "Home read: LRANGE inbox + pull recent celebrity tweets + hydrate objects from cache/DB + rank.",
      "Trim inboxes; persist cold timelines if you need history.",
      "Follow graph in a store that can list followers for workers (paged).",
    ],
    whenToUse: [
      "Twitter/X, LinkedIn feed, Facebook newsfeed interviews.",
      "Any 'activity from people I follow' product.",
    ],
    whenNotToUse: [
      "Do not push every tweet to 50M inboxes synchronously.",
      "Do not join follow graph to tweets on every request without caches.",
    ],
    tradeoffs: [
      "Push vs pull vs hybrid — the whole design.",
      "Pre-rank vs rank-on-read: freshness of ranking vs read CPU.",
      "Inbox in Redis vs Cassandra: speed vs longer history.",
    ],
    interviewTips: [
      "Draw hybrid fan-out within 10 minutes; spend the rest on celebrities and ranking.",
      "Give numbers for a 10M-follower tweet worker plan.",
    ],
    pitfalls: [
      "Unbounded inbox.",
      "Hydrating 200 tweets with 200 SQL queries.",
      "Ignoring mute/block until the end and having no place to put it.",
    ],
    practiceIdeas: [
      "Add 'see new tweets' with a cursor and a push hint via SSE.",
      "Design fan-out delay SLOs: p50 1s, p99 30s for huge accounts.",
    ],
    related: [
      "fan-out-write-vs-read",
      "instagram",
      "unique-ids",
      "cache-patterns",
      "notifications",
      "hld-interview-method",
    ],
  },
  {
    slug: "instagram",
    track: "hld",
    category: "Classic designs",
    title: "Design Instagram",
    summary:
      "Photo/video social: upload pipeline, follow feed, permalinks, and a CDN — newsfeed plus media, not a new planet.",
    depth: "core",
    whyItMatters:
      "This tests whether you reuse feed patterns and then spend time on upload, variants, and the read path for images. Candidates who redesign Kafka from scratch and forget S3 fail the product.",
    theory: [
      "Requirements: upload photo/video, follow, home feed, profile grid, like/comment (comment can be v2), stories optional. NFR: upload reliability on mobile, feed p99, image TTFB via CDN, eventual feed consistency. Ask if stories/reels/DMs are in scope — usually no.",
      "Estimates: 50M uploads/day × 2 MB = 100 TB/day raw plus variants (maybe 1.5–3×). Feed reads similar to Twitter but each card is a URL not text — CDN egress dominates cost. Write QPS to metadata is modest vs media bytes.",
      "API: create media (presign) → complete → create post; GET feed; GET /p/{id}; like. Auth required for upload. Rate-limit upload size/duration.",
      "Data: posts(id, author, media_keys, caption, ts); media variants in S3; feed inboxes as in newsfeed; image CDN; like counters in Redis flushed async. Search/hashtags via inverted index + CDC. Graph same as Twitter.",
      "Bottlenecks: transcode backlog, hot images (CDN), celebrity posts, comments thundering on a viral post (shard comments by post_id, cache top). Evolution: ranking, explore page (ML + approximate), multi-region media, moderation queue. Consistency: poster sees their post immediately (RYW); others eventual.",
    ],
    howItWorks: [
      "Presign upload → process pipeline → post row → fan-out workers.",
      "Feed read hydrates posts + signed/CDN URLs for the right variant.",
      "Profile grid is a user-timeline query (index author+ts) + cache.",
      "Likes: idempotent user-post pair in SQL/KV; counter async.",
      "Moderation and virus scan can hide a post without deleting bytes immediately.",
    ],
    whenToUse: [
      "Photo/video social interviews; also as a media add-on to newsfeed.",
    ],
    whenNotToUse: [
      "Do not transcode on the API process.",
      "Do not store images on the app disk.",
    ],
    tradeoffs: [
      "How many image variants vs on-the-fly.",
      "Feed push vs pull — same as Twitter.",
      "Comments on the post path vs a separate service.",
    ],
    interviewTips: [
      "Reuse your newsfeed diagram; spend deep-dive on upload+CDN and a viral post's likes/comments.",
      "Give storage math early so S3 is forced.",
    ],
    pitfalls: [
      "Serving original 12 MP JPEGs to mobile feeds.",
      "Cache personalized feed HTML at the CDN.",
      "Like table without (user, post) uniqueness → double like.",
    ],
    practiceIdeas: [
      "Add stories with 24h TTL — what expires in CDN, S3, and feed?",
      "Design explore: candidate generation vs rank, and how it misses the follow graph.",
    ],
    related: [
      "newsfeed",
      "image-video-pipelines",
      "cdn-origin",
      "chunked-resumable-upload",
      "live-comments",
      "search-inverted-index",
    ],
  },
  {
    slug: "notifications",
    track: "hld",
    category: "Classic designs",
    title: "Design a notification system",
    summary:
      "Fan-out events to in-app inbox, push, email, and SMS with preferences, batching, and at-least-once delivery you can mute.",
    depth: "core",
    whyItMatters:
      "Every product grows a notification platform. The design is an event bus, preference store, per-channel workers, and a user inbox — plus the 'do not wake them at 3am' rules.",
    theory: [
      "Requirements: trigger from product events (like, charge, message), honor per-user and per-type prefs, deliver to channels, show an in-app inbox, mark read. NFR: high fan-out, at-least-once, end-to-end latency seconds not minutes for chat pings, digest email for low priority. Ask quiet hours and unsubscribe.",
      "Estimates: 1B notifications/day is ~10k/s average, 10× peak. Push to APNs/FCM is a partner rate-limit problem. Inbox storage: 100 B × 1B/day × 30d retention is a few TB. Email is slower and costlier — batch.",
      "API: internal Publish(event); user GET /inbox, POST /read, PUT /prefs. Device token register. Webhooks not needed unless you are the platform.",
      "Data: events on Kafka/SNS; prefs in SQL/KV (user, type, channel, quiet); inbox in Cassandra/SQL sharded by user; delivery log for retries. Workers per channel with concurrency limits to APNs/FCM/SES. Template service. Dedup key (event_id + user + channel).",
      "Bottlenecks: celebrity like-storms (aggregate: '300 people liked' instead of 300 pushes), partner 429s (backoff, DLQ), preference lookup at 50k/s (cache). Evolution: ML send-time optimization, collapse keys, multi-device, locale. Never block the source product on send.",
    ],
    howItWorks: [
      "Product outbox → bus → notification service expands recipients (or receives them).",
      "Filter prefs/quiet/dedup → write inbox → enqueue channel jobs.",
      "Channel workers send; retry; DLQ; update delivery status.",
      "Aggregate bursts in a short window for the same object.",
      "User pull inbox + optional WS/SSE for live badge.",
    ],
    whenToUse: [
      "Any consumer app; also a standalone platform interview.",
    ],
    whenNotToUse: [
      "Do not send email in the request that created the like.",
      "Do not notify every follower of a celebrity like individually in real time.",
    ],
    tradeoffs: [
      "Per-event push vs digest: latency vs peace and cost.",
      "Expand recipients in the notification service vs the source (ownership).",
      "Store full body vs pointers in the inbox.",
    ],
    interviewTips: [
      "Draw channels as separate queues with partner limits.",
      "Mention aggregation and prefs before you mention Kubernetes.",
    ],
    pitfalls: [
      "No unsubscribe/quiet hours.",
      "Duplicate pushes on consumer retry.",
      "Inbox without retention — infinite growth.",
    ],
    practiceIdeas: [
      "Design 'likes on your post' aggregation windows.",
      "Add SMS for OTP vs marketing — different SLA and fail-closed limits.",
    ],
    related: [
      "fan-out-write-vs-read",
      "webhooks-vs-polling",
      "outbox",
      "dlq",
      "long-poll-ws-sse",
      "newsfeed",
    ],
  },
  {
    slug: "autocomplete",
    track: "hld",
    category: "Classic designs",
    title: "Design autocomplete / typeahead",
    summary:
      "Prefix search at keystroke QPS: tries or n-gram indexes, heavy cache, and ranking that can personalize without melting the prefix shard.",
    depth: "next",
    whyItMatters:
      "QPS is enormous (every keypress) and latency budgets are tiny (~50–100ms). This is a cache + prefix index problem, not a general search problem — though they share an inverted index cousin.",
    theory: [
      "Requirements: given a prefix, return top K completions (queries, users, products) in <100ms p99, language-aware, optional personalization. Abuse and empty prefixes must be cheap. Ask: query suggestions vs user search vs both.",
      "Estimates: 50M DAU × 20 searches × 8 keystrokes = huge QPS (tens of thousands to millions). Payload tiny. The top prefixes ('a', 'an', 'the') are extremely hot. Storage of a trie for 10M queries is memory-feasible if you keep only popular terms + a fallback index.",
      "API: GET /suggest?q=&limit=10 with auth optional; cacheable for anonymous popular prefixes. Rate-limit. Debounce is client-side; you still design for the worst client.",
      "Data: in-memory trie or finite-state transducer of popular queries (updated periodically from logs); ES completion/edge-ngram for the long tail; Redis cache for hot prefixes; ranking signals (frequency, recency, CTR) in a batch/stream job. Personalization: rerank a fetched K=50 with a small user model at the edge — do not shard the trie by user.",
      "Bottlenecks: first-character hot shards — replicate the whole hot trie to every suggest node. Updates: rebuild snapshots (minutes) plus a small real-time increment for trending. Evolution: typo tolerance (edit distance, expensive — only after prefix filter), locale, blocklists. Do not hit OLTP LIKE 'foo%' at this QPS.",
    ],
    howItWorks: [
      "Client debounces; API checks CDN/Redis; else memory trie; else search index.",
      "Return top K with display strings and types.",
      "Nightly/hourly job rebuilds popularity; stream bumps trending.",
      "Replicate read-only snapshot to all suggest pods.",
      "Filter unsafe terms; cache empty-ish prefixes carefully (DoS).",
    ],
    whenToUse: [
      "Search boxes, @mentions, maps place typeahead, command palettes at scale.",
    ],
    whenNotToUse: [
      "Do not run full ES retrieval + ML rank on every keypress without a cheap first stage.",
      "Do not store the trie only on one box.",
    ],
    tradeoffs: [
      "Memory trie: ultra fast, laggy updates and size limits.",
      "ES completion: flexible, higher p99.",
      "Personalize at rerank: better UX, cache fragmentation.",
    ],
    interviewTips: [
      "Lead with QPS and 'replicate a read-only prefix structure.'",
      "Separate popular vs tail; that split is the design.",
    ],
    pitfalls: [
      "Caching personalized suggestions at CDN under the raw prefix key.",
      "Querying the primary on each keystroke.",
      "No abuse limit on q= empty or q= emoji storms.",
    ],
    practiceIdeas: [
      "Design @mention autocomplete over 200M users (hint: not one global trie of names).",
      "Add typo-tolerance only when result set is small.",
    ],
    related: [
      "search-inverted-index",
      "hot-keys-partitions",
      "trending-topics",
      "cache-patterns",
      "percentiles",
      "maps-nearby",
    ],
  },
  {
    slug: "trending-topics",
    track: "hld",
    category: "Classic designs",
    title: "Design trending topics",
    summary:
      "Detect what is spiking now: stream counts in windows, score against a baseline, fight manipulation, and serve a tiny hot list.",
    depth: "next",
    whyItMatters:
      "Trending is a stream-processing design with a serving cache. It teaches windows, sketches, and why raw count ≠ trend (California always has more tweets than Vermont).",
    theory: [
      "Requirements: produce top N topics per geo/category every minute, update within a few minutes of a spike, resist bots and celebrities dominating. Serving p99 tiny. Ask definition of topic (hashtag, entity, query).",
      "Estimates: ingest is the tweet/event firehose (10k–100k+/s). Serving is trivial (everyone reads the same lists). State is counts per topic per window per geo — high cardinality; you need decay, top-K heaps, or count-min sketches + a heap, not a SQL GROUP BY on the primary.",
      "API: GET /trending?geo= ; internal ingest is a stream. Admin: blocklist, force-include.",
      "Data: Kafka of events → Flink/Spark streaming: window 5–60 min, score = (count_now / expected) with EWMA baseline, dampen celebrities, require unique users not just tweets. Output top N to Redis/SQL snapshot. Batch nightly to retune baselines. Fraud: device/user diversity thresholds.",
      "Bottlenecks: cardinality explosion (every typo is a topic) — canonicalize, min count threshold. Bots. Regional vs global. Evolution: personalization (rerank a global 100), news quality rank, human review for dangerous topics. Lambda: stream for now, batch for audit of what you showed.",
    ],
    howItWorks: [
      "Ingest events; extract topics; filter junk.",
      "Update windowed counts and baselines keyed by topic+geo.",
      "Every T seconds, compute scores, take top N, publish snapshot.",
      "Serve snapshot from cache; do not compute on read.",
      "Apply blocklist and diversity rules before publish.",
    ],
    whenToUse: [
      "Twitter trends, YouTube trending, news, retail 'what's hot.'",
    ],
    whenNotToUse: [
      "Do not GROUP BY hashtag on OLTP every minute.",
      "Do not trend on raw count without a baseline (always 'Taylor Swift').",
    ],
    tradeoffs: [
      "Shorter windows: faster, noisier.",
      "Sketches: memory, approximate counts (OK for trends).",
      "Human review: safer, slower and political.",
    ],
    interviewTips: [
      "Write the score formula; interviewers listen for baseline vs raw count.",
      "Serving is a cached list — spend time on the stream job.",
    ],
    pitfalls: [
      "One global counter shard for all topics.",
      "Ignoring bots and copypasta campaigns.",
      "Personalized trending that cannot be cached at all — shard by cohort, not per user, if you can.",
    ],
    practiceIdeas: [
      "Write a scoring function and attack it with a bot farm.",
      "Add geo: how you infer location and how sparse geos work.",
    ],
    related: [
      "batch-vs-stream",
      "metrics-pipeline",
      "newsfeed",
      "hot-keys-partitions",
      "ad-click-aggregator",
      "kafka-sqs-rabbit",
    ],
  },
  {
    slug: "chat",
    track: "hld",
    category: "Classic designs",
    title: "Design chat / WhatsApp",
    summary:
      "1:1 and group messaging: online fan-out over sockets, offline inbox, delivery receipts, and multi-device — with order per conversation.",
    depth: "core",
    whyItMatters:
      "Chat combines WS gateways, per-conversation order, unread, media, and presence. It is a flagship HLD. You must not store messages only in RAM on one box.",
    theory: [
      "Requirements: 1:1 and group send, history, delivery/read receipts, multi-device, media, typing optional. NFR: send p99 < 200–300ms when both online, durability of messages, order per chat, 1B users class if they say WhatsApp. Ask encryption (E2E) — if yes, server stores ciphertext and cannot search.",
      "Estimates: 50B messages/day is ~0.6M/s average, several M/s peak. Payload 100 B–1 KB plus media in S3. Online connections: hundreds of millions of sockets — dedicated gateway fleet. Storage: 50B × 200 B × 30d is ~300 TB before RF — Cassandra/HBase/SQL shards by chat_id.",
      "API: WS or persistent TCP for send/recv/ack; HTTP for history and media upload; receipts as messages. Auth on connect. Idempotency client_msg_id.",
      "Data: messages(chat_id, msg_id, sender, ts, type, body_ref, status). Inbox/queue per user for offline (or devices). Chat membership. Sequence per chat (Snowflake or per-chat counter). Pubsub topic per user or per chat for online fan-out. Media object store.",
      "Bottlenecks: large groups (do not write 10k SQL rows synchronously — fan-out to online members via pubsub, persist once per chat + per-user inbox for unread). Multi-device: each device has a cursor. Evolution: E2E (signal-style keys), channels vs groups, reactions, multi-region home for users. Consistency: sender RYW; recipients at-least-once with idempotent ids.",
    ],
    howItWorks: [
      "Client sends on WS with client_msg_id; server persists; acks with server id/seq.",
      "Fan-out to online member sockets via pubsub; push notification if all offline.",
      "Offline: store in per-user queue; drain on connect from last cursor.",
      "Receipts update status; do not block send on all receipts.",
      "Group membership changes are a small CP-ish update; message log stays append-only.",
    ],
    whenToUse: [
      "WhatsApp, Slack, Messenger, in-app support chat.",
    ],
    whenNotToUse: [
      "Do not use a single Redis pub/sub as the only persistence.",
      "Do not give a 1M-member 'group' the same path as a 1:1 without a channel design.",
    ],
    tradeoffs: [
      "Per-user inbox vs per-chat log + cursor: unread vs storage.",
      "E2E: privacy, no server-side search/moderation ease.",
      "WS vs mobile push-only when backgrounded.",
    ],
    interviewTips: [
      "Split online path vs offline inbox vs history store.",
      "Ask group size; design 1:1 first, then 256-member, then broadcast channels.",
    ],
    pitfalls: [
      "No idempotency — retry duplicates.",
      "Global message table with no shard key.",
      "Presence heartbeats written as chat messages.",
    ],
    practiceIdeas: [
      "Add Slack-like channels with 50k members: persist once, fan-out to online, index for search async.",
      "Design multi-device read receipts that do not flap.",
    ],
    related: [
      "long-poll-ws-sse",
      "presence",
      "unique-ids",
      "notifications",
      "chunked-resumable-upload",
      "presence-service",
    ],
  },
  {
    slug: "presence-service",
    track: "hld",
    category: "Classic designs",
    title: "Design a presence service",
    summary:
      "A standalone online/idle/typing service: heartbeats, TTLs, watchers, and APIs other products can subscribe to.",
    depth: "next",
    whyItMatters:
      "Extracted from chat, presence is its own scale path. This design is ephemeral KV + pubsub + a watch API, with celebrity and privacy knobs.",
    theory: [
      "Requirements: set session heartbeat, query is-online, subscribe to changes for a small watch set, last_seen, privacy (nobody/contacts). NFR: huge write QPS of heartbeats, loss-tolerant, a few seconds accuracy. Multi-device OR semantics.",
      "Estimates: 100M concurrent × 1 heartbeat/15s ≈ 6.7M/s sets — only a Redis cluster or a custom in-memory shard can do this; you must not do SQL. Transition events are 1–2 orders of magnitude fewer. Queries are cacheable briefly.",
      "API: internal Heartbeat(session), Get(users[]), Subscribe(watch_set) on WS; user setting last_seen visibility. Batch Get to avoid N calls.",
      "Data: Redis cluster hashed by user_id: hash of sessions → expiry. Pubsub on transition. Optional sampled last_seen to SQL. Watcher index: who is listening (so you do not notify the world). Privacy flags cached.",
      "Bottlenecks: heartbeat QPS (connection-local refresh, shard), celebrity watchers (cap or sample), reconnect storms (jitter heartbeats). Evolution: region-local presence with eventual cross-region, typing as a separate shorter TTL channel. Fail: if Redis dies, show unknown/offline, do not take down chat send.",
    ],
    howItWorks: [
      "WS gateway refreshes TTL on ping; first/last session emits transition.",
      "Get reads Redis; Subscribe registers watchers and pushes transitions.",
      "Honor privacy before emit.",
      "Shard and replicate within AZ; do not cross-region sync every beat.",
      "Jitter intervals; coalesce typing.",
    ],
    whenToUse: [
      "Chat, collab, gaming lobbies, 'courier is online.'",
      "When presence would otherwise pollute the message path or OLTP.",
    ],
    whenNotToUse: [
      "Do not offer 'notify 50M followers when I open the app.'",
      "Do not persist every heartbeat.",
    ],
    tradeoffs: [
      "Accuracy vs heartbeat load.",
      "Push to watchers vs poll Get — depends on UI.",
      "Global vs regional presence views.",
    ],
    interviewTips: [
      "Put heartbeat QPS on the board first; it forces Redis/memory.",
      "Separate this service from chat persistence explicitly.",
    ],
    pitfalls: [
      "SQL UPDATE last_seen every 15s × 100M.",
      "Fan-out transitions to all friends always.",
      "Coupling chat availability to presence store.",
    ],
    practiceIdeas: [
      "Design privacy: last_seen except this chat, and how caches honor it.",
      "Plan a Redis failover without marking the world offline (shared last value + grace).",
    ],
    related: [
      "presence",
      "chat",
      "redis-vs-memcached",
      "long-poll-ws-sse",
      "hot-keys-partitions",
      "fallback-degradation",
    ],
  },
  {
    slug: "live-comments",
    track: "hld",
    category: "Classic designs",
    title: "Design live comments",
    summary:
      "A high-churn comment stream on a live video or launch: recent window + subscribe, not a full Instagram comment system on every tick.",
    depth: "next",
    whyItMatters:
      "The Super Bowl stream has a write QPS that would melt a naive comments table plus a fan-out to millions of viewers. You need sampling, windows, and a pubsub, plus a durable subset for later VOD.",
    theory: [
      "Requirements: post a comment on a live event, see a live stream of comments, optional persist for replay, moderation, rate limits. NFR: writes 10k–100k/s on a hot event, reads are fan-out to millions of viewers (cannot give each every comment). Latency of a few seconds is OK; lossy display is OK; abuse is not.",
      "Estimates: 1M concurrent viewers × 0.1 comments/s = 100k writes/s if everyone typed — they will not, but design for a burst. Delivery: if you broadcast all comments to all viewers that is 100k × 1M — impossible. Viewers get a sampled or sharded firehose, or only comments they can read at human speed (~few/s on screen).",
      "API: POST /events/{id}/comments; SSE/WS GET /events/{id}/stream; GET /comments?cursor for replay. Rate-limit per user and per event.",
      "Data: Kafka (or Redis stream) per event shard; workers persist a sample or all to a store sharded by event_id for VOD; WS gateways subscribe to event topics. Moderation: sync word filter + async ML. Counters approximate.",
      "Bottlenecks: one event_id hot partition — shard the event by hash of comment id for writes, and have viewers subscribe to a merged 'display' topic that is already sampled. Evolution: top comments, reactions only, paid highlighted comments. After the event, the stream dies and VOD uses the persisted list.",
    ],
    howItWorks: [
      "Client posts; API writes Kafka + optional sync persist.",
      "Sampler/aggregator publishes a human-speed stream per event.",
      "Viewers SSE/WS the display topic; catch-up last N from Redis.",
      "Moderation can drop from display even if persisted for review.",
      "Shard gateways; do not hold 1M sockets on one box.",
    ],
    whenToUse: [
      "Live sports, product launches, live commerce, Twitch-like chat on a video.",
    ],
    whenNotToUse: [
      "Do not use the full Instagram comment schema and fan-out-on-write to all viewers.",
      "Do not persist-and-query SQL for the live path at 50k/s without a buffer.",
    ],
    tradeoffs: [
      "Show all vs sample: completeness vs feasibility.",
      "Persist all comments vs display-only: cost vs replay/moderation.",
      "SSE vs WS: one-way is usually enough.",
    ],
    interviewTips: [
      "Do the fan-out math that proves you cannot broadcast every comment to everyone.",
      "Pull last N + subscribe is the magic phrase.",
    ],
    pitfalls: [
      "One Kafka partition for the Super Bowl.",
      "No rate limit — bot flood.",
      "Trying to keep global order of all comments on all screens.",
    ],
    practiceIdeas: [
      "Design sampling that still surfaces celebrity/official comments.",
      "Add reactions as counters instead of messages to cut QPS.",
    ],
    related: [
      "fan-out-write-vs-read",
      "long-poll-ws-sse",
      "youtube",
      "hot-keys-partitions",
      "rate-limiting",
      "kafka-sqs-rabbit",
    ],
  },
  {
    slug: "youtube",
    track: "hld",
    category: "Classic designs",
    title: "Design YouTube-like streaming",
    summary:
      "Upload, transcode into an ABR ladder, package HLS/DASH, serve via CDN, plus watch history and a little metadata — not the ML recommender in v1.",
    depth: "next",
    whyItMatters:
      "Video is a pipeline + CDN + player protocol problem. Interviews go wrong when people talk only about Kafka and never about segments, bitrates, and origin.",
    theory: [
      "Requirements: upload video, process, play adaptive bitrate, thumbnails, titles, (optional) comments/likes. Live can be a v2. NFR: startup time, rebuffer rate, durability of the master, global egress. Ask max duration and 4K.",
      "Estimates: 5M uploads/day × 100 MB = 500 TB/day masters; ladders multiply storage. Watch: 50M concurrent × 3 Mbps ≈ 150 Tbps — only a CDN / ISP architecture wins. Metadata QPS is ordinary. Transcode minutes dominate compute cost.",
      "API: create video → presign multipart → complete → status poll/WS; GET playback {manifest_url}; watch heartbeat for history. Auth on upload; signed cookies on play if not public.",
      "Data: videos table (id, owner, status, duration, titles); objects: master + renditions + HLS playlists + thumbs; CDN; processing queue; watch events to a stream (not OLTP per heartbeat). Search index via CDC. Recommendations deferred — say so.",
      "Bottlenecks: transcode backlog (priority, more workers), origin on a viral video (CDN + multi-region replicate hot objects), copyright/abuse scan. Evolution: live (ingest RTMP/WHIP → packager → CDN with short segments), ads insertion (SSAI), multi-DRM. Player uses range/segment requests; never one MP4 through the API.",
    ],
    howItWorks: [
      "Multipart upload master → jobs: probe, virus, transcode ladder, thumbs, package.",
      "When a playable rendition exists, status=ready; player fetches manifest from CDN.",
      "Heartbeats go to a stream for history and metrics; sample if needed.",
      "Hot videos: prefetch/replicate to more PoPs; shield origin.",
      "Delete: metadata + lifecycle + CDN purge; keep legal hold copies if required.",
    ],
    whenToUse: [
      "VOD products, courses, UGC video, interview 'design YouTube.'",
    ],
    whenNotToUse: [
      "Do not stream the master file as the only rendition.",
      "Do not write a SQL row per playback second.",
    ],
    tradeoffs: [
      "More renditions: better ABR, more cost.",
      "Short HLS segments: lower latency, more requests and overhead.",
      "Precompute vs just-in-time transcode for rare videos.",
    ],
    interviewTips: [
      "Draw upload → pipeline → S3 → CDN → player; deep-dive ABR and a viral video.",
      "Defer recs/comments unless they ask — mention the hook.",
    ],
    pitfalls: [
      "No duration/size cap.",
      "Playback through app servers.",
      "Ignoring DRM/rights if the prompt is Netflix-like (different catalog).",
    ],
    practiceIdeas: [
      "Add live with 5s vs 2s segments and explain latency.",
      "Cost the ladder for 1M hours uploaded/month.",
    ],
    related: [
      "image-video-pipelines",
      "cdn-origin",
      "chunked-resumable-upload",
      "netflix",
      "live-comments",
      "metrics-pipeline",
    ],
  },
  {
    slug: "zoom",
    track: "hld",
    category: "Classic designs",
    title: "Design Zoom-like video calls",
    summary:
      "Realtime media: signaling, media servers (SFU), NAT traversal, and a hard latency budget — the tougher cousin of chat.",
    depth: "advanced",
    whyItMatters:
      "This is one of the hardest classic HLDs. You must separate signaling (WS) from media (UDP/WebRTC), explain why mesh dies at ~4 people, and how an SFU scales a 100-person meeting.",
    theory: [
      "Requirements: 1:1 and group meetings, audio/video, screen share, join by link, optional chat/recording. NFR: mouth-to-ear latency < 200–300ms, jitter, packet loss concealment, global users. Ask 1:1 vs webinar (1-to-many is a different fan-out, closer to live streaming).",
      "Estimates: 1 Mbps × N streams. Mesh: N(N-1) flows — dies fast. MCU mixes into one stream (CPU hell, added latency). SFU (Selective Forwarding Unit) receives each sender and forwards selected streams to others — the industry default. 100 people × 1.5 Mbps inbound to an SFU is a NIC/CPU design; you last-N-speakers to avoid sending 99 videos.",
      "API: REST create/join meeting; WS signaling (SDP/ICE); WebRTC media to SFU; TURN for nasty NATs. Auth on join. Recording is a hidden subscriber.",
      "Data: meetings and membership in SQL; ephemeral session state on SFU; TURN/STUN fleet; recordings to object storage via a recorder bot. Signaling can be regional; media should be a nearby SFU (geo-DNS). Chat uses the normal chat path.",
      "Bottlenecks: SFU CPU/NIC, last-mile loss (adapt bitrate, simulcast/SVC), NAT (TURN cost). Evolution: webinar mode (CDN or specialized fan-out), breakout rooms, global cascaded SFUs (a tree) for huge events. Security: meeting passwords, waiting rooms, encryption (WebRTC SRTP; E2E is harder with SFU). Do not send media through the same servers as the REST API.",
    ],
    howItWorks: [
      "Client signals via WS; ICE finds a path (host/srflx/relay).",
      "Media goes to a regional SFU; SFU forwards based on active speaker and layout.",
      "Simulcast: sender uploads 2–3 layers; SFU picks a layer per receiver.",
      "On failure, migrate to another SFU or drop video keep audio.",
      "Recording SFU-taps streams to a file pipeline.",
    ],
    whenToUse: [
      "Meetings, telehealth, classrooms, 'design Zoom/Meet.'",
    ],
    whenNotToUse: [
      "Do not mesh a 50-person call.",
      "Do not use TCP HLS for interactive conversations (too much latency).",
    ],
    tradeoffs: [
      "SFU vs MCU: latency/CPU vs simple downlink.",
      "TURN relay: connectivity vs cost and latency.",
      "Cascaded SFUs: scale, extra hop latency.",
    ],
    interviewTips: [
      "Say WebRTC + SFU + TURN in the first minute; then size a 100-person room.",
      "Separate webinar (broadcast) from meeting (everyone can talk).",
    ],
    pitfalls: [
      "Putting RTP on a Node HTTP cluster.",
      "One SFU in us-east for a Tokyo-only meeting.",
      "Forgetting screen share bitrate.",
    ],
    practiceIdeas: [
      "Size NIC for 50-person 720p last-5-speakers.",
      "Design webinar for 10k viewers: meeting SFU for speakers + CDN for audience.",
    ],
    related: [
      "long-poll-ws-sse",
      "youtube",
      "dns-anycast-geo",
      "latency-vs-throughput",
      "tls-mtls",
      "presence",
    ],
  },
  {
    slug: "ticketmaster",
    track: "hld",
    category: "Classic designs",
    title: "Design Ticketmaster",
    summary:
      "A flash-sale inventory problem: waiting rooms, fair-ish queues, atomic seat holds, and payments — hot keys and correctness over cute microservices.",
    depth: "advanced",
    whyItMatters:
      "This is hot-key + inventory + abuse. The on-sale minute is the design. If you treat it like a normal CRUD shop you will oversell and melt.",
    theory: [
      "Requirements: browse events, on-sale at T, select seats or GA quantity, hold, pay, issue tickets. NFRs: correctness (no double sell), fairness (bots vs humans), huge spike at T. Ask reserved seating vs GA.",
      "Estimates: 1M users at T for 20k seats. Most work is reject/queue, not checkout. Hold TTL 8–10 minutes. Payment QPS is the number of holds, not the million in the waiting room.",
      "API: join waitroom; GET status; when admitted, GET seats map (cache); POST hold (idempotent); POST checkout; webhook payment. Rate-limit everything. Waiting room tokens are signed and short-lived.",
      "Data: events and seat map (versioned). Seats: state available/held/sold with version or a Lua/SQL transaction per seat or per block. Holds in Redis with TTL + durable row. Orders ACID. Queue: shuffled tokens or fair lottery, not 'fastest bot wins' if you can help it. Cache the map read-only; never sell from cache alone.",
      "Bottlenecks: seat row hot spots (shard by section, serialize per seat). Bots (WAF, device attestation, purchase limits). Evolution: queue before the app (edge waiting room), presale codes, transfer market (separate). Payment saga: hold → pay → confirm or release on fail/timeout. Oversell is unforgivable; slightly under-admit the site is OK.",
    ],
    howItWorks: [
      "Edge waiting room issues admission tokens at a safe rate.",
      "Hold: transactional compare-and-swap on seat state with TTL.",
      "Checkout saga captures payment; marks sold; issues QR tickets in object store.",
      "Sweeper releases expired holds.",
      "Reads of the map are cached and slightly stale; holds always hit the inventory store.",
    ],
    whenToUse: [
      "Ticketing, flash drops, limited drops (sneakers), class registration.",
    ],
    whenNotToUse: [
      "Do not increment a cached 'remaining' counter as the lock.",
      "Do not let 1M users hit SQL seat rows at T+0.",
    ],
    tradeoffs: [
      "GA counter vs per-seat rows: simpler vs pick-a-seat.",
      "Fair lottery vs FCFS queue: ethics vs simplicity.",
      "Longer hold: better convert, more speculative lock-up.",
    ],
    interviewTips: [
      "Split waiting room from inventory; they have different scales.",
      "Walk double-click hold and payment timeout without double charge or lost seats.",
    ],
    pitfalls: [
      "Sold from a CDN-cached remaining=1.",
      "No hold TTL — leaked seats.",
      "Idempotency missing on pay → double capture.",
    ],
    practiceIdeas: [
      "Design section-level sharding and a 'best available' allocator.",
      "Add bot-resistant presale with purchase caps per identity.",
    ],
    related: [
      "inventory-checkout",
      "hot-keys-partitions",
      "sagas",
      "rate-limiter-system",
      "ddos-waf",
      "payments-wallet",
    ],
  },
  {
    slug: "uber",
    track: "hld",
    category: "Classic designs",
    title: "Design Uber matching",
    summary:
      "Riders request, drivers stream location, a matcher pairs them with geo indexes, then a trip lifecycle and pricing — realtime plus inventory of cars.",
    depth: "advanced",
    whyItMatters:
      "Uber is maps + matching + trip state. The deep dive is 'find nearby available drivers' at city scale without scanning the world every request.",
    theory: [
      "Requirements: request ride, match driver, track, complete, pay. Driver app sends location. NFRs: match in seconds, location freshness a few seconds, city-level scale, correctness of one driver one trip. Ask: pools/shared? v2.",
      "Estimates: 1M drivers worldwide but matching is per city. 10k drivers in a city × location every 4s = 2.5k/s location writes — memory geo index, not SQL UPDATE as the only store. Ride requests maybe 100s/s/city peak. Trip history is durable SQL.",
      "API: rider POST /trips; WS updates; driver POST /location (or UDP-like batch); driver accept/reject. Idempotent request. Auth both roles.",
      "Data: live locations in Redis/memory with geohash/S2 cells + TTL; driver status; trips in SQL (state machine); matching queue per cell/city; payments via saga; maps/ETA from a routing service (external or cached). Surge: demand/supply per cell, cached.",
      "Bottlenecks: hot downtown cells, location write QPS, matcher latency. Evolution: batching matching (more optimal than greedy), multi-hop, scheduled rides, multi-region by city (data residency and latency — natural shard). Failure: if matcher dies, trips in 'requested' retry; driver offline TTL. Do not global-lock all drivers.",
    ],
    howItWorks: [
      "Drivers heartbeat location into a cell index; expire if silent.",
      "Request: compute cells around pickup, query available drivers, rank (ETA, score), offer to top, wait accept with timeout, next candidate.",
      "On accept, CAS driver status busy; create trip; both sides subscribe to trip WS.",
      "Location during trip goes to the rider via pubsub; persist sparsely.",
      "Complete → fare → payment saga; driver free.",
    ],
    whenToUse: [
      "Rideshare, delivery, 'nearby providers' dispatch.",
    ],
    whenNotToUse: [
      "Do not SELECT * FROM drivers WHERE distance < 5km on MySQL every request.",
      "Do not run one global matcher for the planet.",
    ],
    tradeoffs: [
      "Greedy first-accept vs batched optimal matching.",
      "Offer radius vs wait time.",
      "Location frequency vs battery and write QPS.",
    ],
    interviewTips: [
      "Shard by city; geohash the live set; CAS the driver; trip state machine.",
      "Mention surge as a cached cell metric, not a join.",
    ],
    pitfalls: [
      "Two riders matching the same driver without CAS.",
      "Unbound growth of location history in OLTP.",
      "ETA service on the critical path without a timeout/fallback.",
    ],
    practiceIdeas: [
      "Design the offer timeout and skip-driver path.",
      "Add food delivery with longer match windows and restaurant prep state.",
    ],
    related: [
      "maps-nearby",
      "presence",
      "sagas",
      "inventory-checkout",
      "long-poll-ws-sse",
      "specialized-stores",
    ],
  },
  {
    slug: "payments-wallet",
    track: "hld",
    category: "Classic designs",
    title: "Design a payments wallet / ledger",
    summary:
      "A system of record for money: double-entry ledger, idempotent credits/debits, and sagas with processors — correctness first.",
    depth: "advanced",
    whyItMatters:
      "This is the ACID/idempotency exam. Fancy scale is secondary until you can not double-spend, not drop a credit, and explain reconciliation.",
    theory: [
      "Requirements: create accounts, credit/debit, transfer, list entries, connect to a card processor (optional). NFRs: durability, exactly-once effects, audit, low RPO, availability of reads; writes may be CP. Regulatory: audit logs, encryption, least privilege. Ask multi-currency and holds/authorizations.",
      "Estimates: even large consumer wallets are often thousands of writes/s, not millions — SQL shards by account_id go far. The hard parts are partners, retries, and audits. Storage of entries is append-only and grows forever (retention is legal, not TTL).",
      "API: POST /transfers {from, to, amount, idempotency_key}; GET /accounts/{id}/entries?cursor; webhooks from Stripe-like processors. All mutates idempotent.",
      "Data: accounts (balance cached + version); entries (double-entry: two lines that sum 0); idempotency table; outbox for notifications; processor payment intents. Balance update and entries in one transaction. Shard by account; transfers across shards use a saga + a clearing account or a 2PC you should avoid — prefer an internal 'settlement' step with holds.",
      "Bottlenecks: hot accounts (business whales) — serialize per account, maybe queue. Evolution: event-sourced ledger, multi-region active-passive (RPO 0 in-region), FX. Never increment balance in Redis as truth. Reconcile nightly with the processor. Chargebacks are compensating entries, not deletes.",
    ],
    howItWorks: [
      "Idempotency lock/row → insert two entries → update balances/versions → outbox → commit.",
      "Cross-account same shard: one txn. Cross-shard: hold/debit then credit with compensation.",
      "Processor: create intent → webhook → credit when captured; all keys stored.",
      "Reads from replica OK if you accept lag; balance-after-write from primary.",
      "Audit every privileged adjust; encrypt PAN in a vault you do not own if PCI.",
    ],
    whenToUse: [
      "Wallets, gift cards, marketplace escrow, in-app credits.",
    ],
    whenNotToUse: [
      "Do not put the ledger in Mongo without single-document ACID and a careful model.",
      "Do not 'exactly-once' via Kafka transactions without a ledger unique key.",
    ],
    tradeoffs: [
      "Stored balance vs fold of entries: speed vs rebuild purity (use both: snapshot + tail).",
      "Sync processor vs async credit: UX vs complexity.",
      "One global ledger DB vs shard: simple vs scale.",
    ],
    interviewTips: [
      "Write the double-entry rows on the board; show a retry with the same key.",
      "Call the system CP for writes and say why that is correct for money.",
    ],
    pitfalls: [
      "DELETE a ledger row to 'undo.'",
      "Balance in cache only.",
      "No reconciliation with the card processor.",
    ],
    practiceIdeas: [
      "Model auth/capture/void/refund as entries.",
      "Design a cross-shard transfer saga with a timeout and a support tool.",
    ],
    related: [
      "idempotency-delivery",
      "acid-vs-base",
      "event-sourcing",
      "sagas",
      "audit-logs",
      "inventory-checkout",
    ],
  },
  {
    slug: "inventory-checkout",
    track: "hld",
    category: "Classic designs",
    title: "Design inventory and checkout",
    summary:
      "Reserve stock, take payment, fulfill — a saga with a short transactional decrement and a lot of eventual side effects.",
    depth: "core",
    whyItMatters:
      "E-commerce HLD is not a shopping cart UI. It is lost-update on SKUs, holds, and payment. Ticketmaster is the flash version; this is the everyday version.",
    theory: [
      "Requirements: cart, checkout, decrement inventory, pay, order record, cancel/refund. NFR: no oversell on a SKU, p99 checkout a second or two, flash-sale optional. Ask digital vs physical (warehouses, reservations).",
      "Estimates: 10k checkout/s is a big shop; SKU table is small, the hot SKU is the problem. Catalog reads are CDN/cache. Orders grow forever (legal).",
      "API: cart CRUD; POST /checkout idempotent; payment redirect/confirm; GET /orders/{id}. Webhooks from payment. Inventory admin separate.",
      "Data: sku(id, qty, version) or a reservation table; orders; order_lines snapshot prices (denormalize); outbox. Cache catalog, not remaining qty for the sell decision (or use as a hint only). Warehouse: per-warehouse qty if you ship from many (shard/reservation by warehouse).",
      "Bottlenecks: hot SKU (serialize, queue buyers, or split qty into buckets). Evolution: OMS, WMS, tax, promotions (they lie about qty). Saga: reserve → pay → confirm; compensate release and refund. Isolation: SELECT FOR UPDATE or version CAS on qty. Do not hold the row through a 3-minute 3DS redirect — reserve with TTL instead.",
    ],
    howItWorks: [
      "Checkout creates order=pending and reservations with TTL (txn).",
      "Payment proceeds; webhook/confirm captures.",
      "Confirm: reservation → sold, order=paid, outbox email/warehouse.",
      "On fail/timeout: release qty (idempotent).",
      "Read path for PDP uses cache; 'only 2 left' can be slightly stale.",
    ],
    whenToUse: [
      "Retail, marketplaces, digital seats that are not full Ticketmaster scale.",
    ],
    whenNotToUse: [
      "Do not decrement a cached counter as the lock.",
      "Do not one-big-transaction the payment HTTP call.",
    ],
    tradeoffs: [
      "Hard qty vs oversell + compensate (airlines oversell on purpose — say if you do).",
      "Reservation TTL long vs short.",
      "Per-warehouse inventory vs global pool.",
    ],
    interviewTips: [
      "Draw the saga states; mention snapshot price on the line item.",
      "If they add a flash sale, import Ticketmaster waiting room ideas.",
    ],
    pitfalls: [
      "Lost update on qty.",
      "Price change mid-checkout without a snapshot.",
      "Double webhook confirm double-decrements — need keys.",
    ],
    practiceIdeas: [
      "Add bundles (SKU A+B) without deadlock (lock in id order).",
      "Design marketplace inventory owned by many sellers.",
    ],
    related: [
      "ticketmaster",
      "payments-wallet",
      "sagas",
      "isolation-levels",
      "idempotency-delivery",
      "normalize-vs-denormalize",
    ],
  },
  {
    slug: "dropbox",
    track: "hld",
    category: "Classic designs",
    title: "Design Dropbox",
    summary:
      "A syncing filesystem illusion: chunked content-addressed blobs, a metadata store for the tree, and clients that sync deltas.",
    depth: "advanced",
    whyItMatters:
      "Dropbox is metadata + object store + sync protocol. The interesting bugs are conflicts, rename, and 'do not re-upload the same bytes.' It is not 'S3 with a UI.'",
    theory: [
      "Requirements: upload/download, folders, share links/ACLs, sync clients, version history. NFR: dedup, resume, eventual sync across devices, strong-enough metadata (one tree per namespace). Ask collaboration (Google-docs-like) vs file sync — different products.",
      "Estimates: exabytes of blobs; metadata (files, versions, blocks) is huge but structured — sharded SQL/KV by namespace_id. Sync QPS is metadata; bytes bypass API via presigned URLs. Dedup can save a lot if many users have the same OS ISO (privacy tradeoff).",
      "API: namespace tree ops (list, commit change set); block upload/download; share/ACL; notifications of remote changes (long poll/WS). Client sends block hashes first (skip upload if server has them).",
      "Data: blocks in S3 keyed by hash; files as lists of block hashes + revisions; tree as parent/name/rev in a metadata store (the 'metaserver'). Notifications via per-namespace queues. ACLs/ReBAC for shares. Versions retained with a policy.",
      "Bottlenecks: metadata hot namespaces (whale company folder) — shard and cache; commit serialization per namespace or per folder. Evolution: smart sync (placeholders), conflict copies ('conflicted copy'), block-level delta (rsync-like), multi-region. Consistency: metadata CP per namespace; bytes immutable once stored. Do not implement the tree as S3 listings.",
    ],
    howItWorks: [
      "Client chunks file, hashes, uploads missing blocks, commits a revision (CAS parent rev).",
      "Other devices watch the namespace journal and pull new revs/blocks.",
      "Share: ACL edge; signed links for external.",
      "Conflict if two commits from the same parent: second becomes a conflict copy or merge.",
      "GC unreferenced blocks after retention.",
    ],
    whenToUse: [
      "File sync, backup clients, Drive-like products.",
    ],
    whenNotToUse: [
      "Do not store each file as one object without chunking if you need delta sync.",
      "Do not use NFS as the multi-region story.",
    ],
    tradeoffs: [
      "Content-addressed dedup: savings vs encryption-per-user (dedup dies if you encrypt client-side with different keys).",
      "Serialize commits per namespace vs finer locks.",
      "E2E encryption vs server-side features (search, preview).",
    ],
    interviewTips: [
      "Draw blocks vs metadata vs notification; walk a 4 GB file edit of 1 block.",
      "Mention CAS revision to avoid silent overwrite.",
    ],
    pitfalls: [
      "Tree in object listings.",
      "No conflict story.",
      "Re-uploading entire files on every save.",
    ],
    practiceIdeas: [
      "Design sharing a folder with a user outside the org (ACL + notify).",
      "Add preview generation pipeline for PDFs.",
    ],
    related: [
      "chunked-resumable-upload",
      "object-storage",
      "block-file-object",
      "rbac-abac",
      "cdc",
      "pastebin",
    ],
  },
  {
    slug: "netflix",
    track: "hld",
    category: "Classic designs",
    title: "Design Netflix",
    summary:
      "Catalog + subscription + VOD playback at global scale: encoding, CDN/Open Connect-style, and personalization as a separate plane.",
    depth: "next",
    whyItMatters:
      "Unlike YouTube UGC, Netflix is a smaller catalog, heavier encoding, licensed DRM, and a CDN you may own (ISP appliances). The design lesson is control of distribution and a browse experience that is not the player.",
    theory: [
      "Requirements: browse/search, play licensed titles, profiles, continue watching, subscribe/bill. NFR: start play fast, rare rebuffers, global, DRM, title availability by country. UGC upload is out of scope.",
      "Estimates: catalog tens of thousands of titles, not billions of UGC ids. Encoding is offline and expensive (many codecs/ladders/HDR). Concurrent streams tens of millions × 5–15 Mbps. Continue-watching writes are modest if you throttle heartbeats. Billing is a wallet/subscription problem.",
      "API: catalog/browse (BFF), playback license + manifest, heartbeat, profiles. Strong auth. Geo-restrictions at license time.",
      "Data: catalog in a CMS/DB + search; assets in object storage and ISP caches; playback license service (DRM keys short-lived); viewing history stream → continue watching store; recs model offline + online feature store. Subscription in billing SQL.",
      "Bottlenecks: evening peak egress (preposition titles on Open Connect / CDN), license service QPS, recs latency (fallback to popular). Evolution: live events (closer to YouTube live), downloads for offline, A/B. YouTube-like pipeline exists but is studio ingest, not user multipart. Never skip DRM if they said Netflix.",
    ],
    howItWorks: [
      "Browse hits a cached personalized row API with fallbacks.",
      "Play: authorize geo/entitlement → license → player fetches segments from nearest cache.",
      "Preposition popular titles to ISP boxes before premieres.",
      "Heartbeats update continue watching asynchronously.",
      "Billing saga for subscribe/cancel; entitlement cache with short TTL.",
    ],
    whenToUse: [
      "SVOD interviews, course platforms with DRM, 'Netflix vs YouTube' compare.",
    ],
    whenNotToUse: [
      "Do not design user uploads unless they ask.",
      "Do not treat the catalog as a social graph.",
    ],
    tradeoffs: [
      "More ladders/codecs: quality and device coverage, encode and storage cost.",
      "Owned CDN: egress savings and control, ops partnership with ISPs.",
      "Personalize every row: better UX, harder cache (cache by cohort).",
    ],
    interviewTips: [
      "Contrast with YouTube: catalog size, DRM, preposition, no UGC pipeline.",
      "Mention Open Connect or 'ISP caches' to show you know their trick.",
    ],
    pitfalls: [
      "Personalized homepage uncacheable at the edge with no cohorting.",
      "License service as a single region.",
      "Storing watch position every second in OLTP.",
    ],
    practiceIdeas: [
      "Design country catalog differences (rights) without forking the player.",
      "Plan a Friday premiere preposition list.",
    ],
    related: [
      "youtube",
      "cdn",
      "image-video-pipelines",
      "payments-wallet",
      "fallback-degradation",
      "oltp-vs-olap",
    ],
  },
  {
    slug: "maps-nearby",
    track: "hld",
    category: "Classic designs",
    title: "Design maps nearby search",
    summary:
      "Find places near a lat/lng: geo indexes (geohash, S2, R-tree), ranking, and a cache of popular tiles — plus the moving-user problem.",
    depth: "next",
    whyItMatters:
      "Geo is a specialized access pattern. Interviews want you to not scan the world table and to know cells, false neighbors, and how Uber/maps reuse the same index ideas.",
    theory: [
      "Requirements: nearby POIs (restaurants, drivers), optional text filter, rank by distance/relevance, map tiles optional. NFR: p99 < 100–200ms, worldwide POIs, freshness for drivers vs static POIs. Ask radius and result K.",
      "Estimates: 100M POIs is fine in a sharded geo index. QPS is high on popular cities. Static POIs change slowly (CDC to index). Drivers change every few seconds (memory grid).",
      "API: GET /nearby?lat&lng&r&q&type; autocomplete of place names; tiles if they want a map. Rate-limit. Cursor for 'more.'",
      "Data: each POI has S2 cell / geohash of a given resolution; inverted or filter indexes for type/text; store in ES geo or Redis GEO or a custom cell→ids map. Query: cover the radius with cells, fetch candidates, exact haversine filter (geohash neighbors can lie outside), rank. Cache tiles and popular downtown queries. Moving entities (drivers) live in an in-memory grid with TTL, not the static POI index.",
      "Bottlenecks: dense downtown cells (too many POIs — filter by type first, then distance, cap K). Cell resolution: too coarse = huge lists; too fine = many cells per query. Evolution: autocomplete of places, routing/ETA as a separate service, multi-region shards by continent. Do not SELECT the world and sort by distance in the app.",
    ],
    howItWorks: [
      "Index each POI into covering cells plus type/text fields.",
      "On query, list cells that cover the circle; fetch ids; exact-distance filter; rank; return K.",
      "Cache popular (cell, type, r) results with a short TTL.",
      "CDC static POI changes; heartbeat moving entities into a memory grid.",
      "Shard the index by coarse geo so a city lives together.",
    ],
    whenToUse: [
      "Maps, delivery, dating nearby, store locators, Uber driver search.",
    ],
    whenNotToUse: [
      "Do not scan a global SQL table with a distance formula as the only plan.",
      "Do not put 1-second driver GPS into Elasticsearch as the live path.",
    ],
    tradeoffs: [
      "Coarser cells: fewer lookups, more false candidates.",
      "ES geo vs Redis GEO vs custom: query power vs write rate for movers.",
      "Personal rank: better UX, weaker cache.",
    ],
    interviewTips: [
      "Draw cells covering a circle and say 'then exact haversine.'",
      "Split static POIs vs moving drivers — two indexes.",
    ],
    pitfalls: [
      "Forgetting geohash edge neighbors (points just outside the cell).",
      "One global hot cell for Manhattan.",
      "Returning 10k bars to the client to 'sort on device.'",
    ],
    practiceIdeas: [
      "Pick an S2 level for 1 km radius in a dense city vs rural.",
      "Add a text filter 'pizza' without killing the geo plan.",
    ],
    related: [
      "uber",
      "autocomplete",
      "search-inverted-index",
      "specialized-stores",
      "hot-keys-partitions",
      "cache-patterns",
    ],
  },
  {
    slug: "ad-click-aggregator",
    track: "hld",
    category: "Classic designs",
    title: "Design an ad click aggregator",
    summary:
      "Ingest a firehose of impressions and clicks, count them correctly enough to bill, and fight fraud — stream first, batch reconcile.",
    depth: "advanced",
    whyItMatters:
      "This is a streaming analytics + money problem. Counts must be close to real-time for pacing, and correct by the next day for invoices. Duplicates and bots are the enemies.",
    theory: [
      "Requirements: record impressions/clicks, aggregate by campaign/ad/publisher/time, expose near-real-time dashboards, produce billable totals, flag fraud. NFRs: hundreds of thousands of events/s, at-least-once ingest, idempotent counts, late events. Ask what dimension set (careful: cardinality).",
      "Estimates: 200k events/s × 200 B ≈ 40 MB/s ingest — Kafka. Serving dashboards is a tiny read of pre-aggregates. Raw retain maybe 7–30 days; rollups forever. 200k/s into SQL GROUP BY will not work.",
      "API: collect pixel/SDK POST (tiny, 204); internal query API for dashboards; billing export. Dedup key (event_id). Auth the pixel with a signed impression token so clicks cannot be invented as easily.",
      "Data: Kafka topics; stream job (Flink) updates count-min or exact windows in a KV/ClickHouse; raw events in S3/lake; nightly batch rebuilds gold tables; fraud scores async. Unique users: HyperLogLog or exact sets if the key is small. Billing reads gold, not the 10-second dashboard.",
      "Bottlenecks: cardinality of keys (campaign × creative × site × minute) — bound dimensions, roll up. Hot campaigns. Fraud bursts. Evolution: join click to impression (attribution window), multi-touch, privacy (no raw device ids in the lake). Lambda: stream for pacing, batch for money. Exactly-once stream txns help; still reconcile.",
    ],
    howItWorks: [
      "Edge collector validates and appends to Kafka with event_id.",
      "Stream aggregates tumbling/sliding windows into a serving OLAP/KV.",
      "Dashboards read serving store; alerts on spend pace.",
      "Batch job recomputes daily facts from the lake; billing uses that.",
      "Fraud service marks events; batch subtracts them from gold.",
    ],
    whenToUse: [
      "Ads, affiliate, metering, any 'count events then bill.'",
    ],
    whenNotToUse: [
      "Do not increment a Redis key per raw event as the billing system of record.",
      "Do not store unbounded raw events in the OLTP primary.",
    ],
    tradeoffs: [
      "Approximate uniques: cheap, invoice arguments.",
      "Stream vs batch as truth: speed vs auditability — use both.",
      "More dimensions: richer reports, explosion.",
    ],
    interviewTips: [
      "Say 'stream for now, lake+batch for invoices' in the first diagram.",
      "Put event_id idempotency and a fraud box on the board.",
    ],
    pitfalls: [
      "High-cardinality labels (user_id on every metric key).",
      "Billing off an at-least-once stream with no reconcile.",
      "Click endpoint that is trivial to script without tokens.",
    ],
    practiceIdeas: [
      "Design click-to-impression join with a 1-day window without a huge state store (hint: keyed by impression_id, state TTL).",
      "Write a late-event policy: update yesterday's gold or a correction table.",
    ],
    related: [
      "metrics-pipeline",
      "batch-vs-stream",
      "oltp-vs-olap",
      "kafka-sqs-rabbit",
      "idempotency-delivery",
      "trending-topics",
    ],
  },
  {
    slug: "metrics-pipeline",
    track: "hld",
    category: "Classic designs",
    title: "Design a metrics pipeline",
    summary:
      "Agents emit time series, a path aggregates and stores them, and dashboards/alerts read — cardinality is the boss fight.",
    depth: "next",
    whyItMatters:
      "Observability as a product (Datadog-like) or your internal pipeline. The design is ingest → buffer → aggregate → TSDB, plus the rule that user_id on a metric will melt you.",
    theory: [
      "Requirements: ingest metrics from apps/hosts, query by name+labels over time, alert, retain with downsample. NFRs: millions of samples/s possible, query p99 a second for dashboards, durability of recent data. Ask Prom-like pull vs push.",
      "Estimates: 100k hosts × 200 series × 1/10s = 2M samples/s. 16 B compressed × 2M × 86400 is terabytes/day before downsample. You must aggregate and expire. Query QPS is tiny vs ingest.",
      "API: remote-write / statsd / OTLP push; PromQL-like query; alert CRUD. Auth agents with keys.",
      "Data: agents → Kafka (or a write proxy) → stream aggregators (sum/avg by key) → TSDB (Prometheus HA, Victoria, M3, Cortex) with shard by metric key; object store for cold; alert manager on rules. Metadata index of metric names. Downsample 1s → 1m → 1h.",
      "Bottlenecks: cardinality (each unique label set is a series) — enforce allowlists and limits per tenant. Hot metrics. Evolution: exemplars to traces, multi-tenant quotas, recording rules. Pull (Prom scrape) is simpler in-cluster; push is how you do fleets and edge. Do not write every sample to SQL.",
    ],
    howItWorks: [
      "Agents batch samples; write proxy validates labels and shards to Kafka.",
      "Ingesters write recent blocks; compact to object storage.",
      "Queriers fan out to ingesters + store and merge.",
      "Rulers evaluate SLOs; page via alertmanager.",
      "Reject or aggregate-away banned high-cardinality labels.",
    ],
    whenToUse: [
      "Internal observability, Datadog-like interviews, product telemetry.",
    ],
    whenNotToUse: [
      "Do not use this path for business billing events (use the ad/ledger designs).",
      "Do not label metrics with raw user ids.",
    ],
    tradeoffs: [
      "Push vs pull: firewalls and scale vs simpler discovery.",
      "Long raw retention: debug, cost.",
      "Global query: convenience, scatter-gather tails.",
    ],
    interviewTips: [
      "Put cardinality on the board as the first risk.",
      "Separate ingest path from query path; they scale differently.",
    ],
    pitfalls: [
      "One Prometheus with local disk as the company store.",
      "No tenant quotas — one team creates 50M series.",
      "Alerting on raw samples with no recording rules (slow, flaky).",
    ],
    practiceIdeas: [
      "Design multi-tenant limits and a 'top offenders' report.",
      "Sketch Prom remote-write into Kafka into Cortex-like blocks.",
    ],
    related: [
      "observability",
      "specialized-stores",
      "batch-vs-stream",
      "sli-slo-sla",
      "ad-click-aggregator",
      "alerting-vs-dashboards",
    ],
  },
  {
    slug: "distributed-cache",
    track: "hld",
    category: "Classic designs",
    title: "Design a distributed cache",
    summary:
      "A Memcached/Redis-cluster-like service: partition keys, replicate if you must, evict, and survive node loss without stampeding origin.",
    depth: "advanced",
    whyItMatters:
      "This is the 'build Redis Cluster' interview, cousin of the KV store but with eviction, TTLs, and the contract that data can vanish. Clients and rebalancing are the design.",
    theory: [
      "Requirements: Get/Set/Del, TTL, LRU/LFU eviction, horizontal scale, optional replication. NFRs: sub-ms p50, high QPS, acceptable loss on node death (or replica failover). Ask persistence — many caches are memory-only.",
      "Estimates: 1 TB working set / 64 GB nodes ≈ 16+ nodes plus headroom. 200k QPS tiny gets is normal. Hot keys need special handling (replicate or local L1).",
      "API: RESP-like or gRPC Get/Set; admin membership. Client-side hash or a proxy (Twemproxy, Envoy). Pipelining for throughput.",
      "Data: consistent hash + vnodes; each key on 1 (or RF) nodes; in-memory hashtable + eviction heap/clock; optional replica. Membership via gossip or a config server. No query language. Optional persistence (AOF) blurs into KV store.",
      "Bottlenecks: hot keys, rebalance (cold misses), thundering herd to origin on a node death, big values blocking a thread. Evolution: client L1, read-through, multi-tier (local + remote), slab allocation. Contrast with 'design KV': cache may drop data and should stampede-protect; KV promises durability knobs.",
    ],
    howItWorks: [
      "Client hashes key to a node; Get miss is the caller's problem (aside) unless read-through.",
      "On node add/remove, remap a slice; optionally prefetch.",
      "Evict under memory pressure; expire TTL lazily + sweeper.",
      "Optional replica: reads from either, writes to both or to primary.",
      "Singleflight on the cache or client for hot misses.",
    ],
    whenToUse: [
      "Session/object caches, interview 'design Memcached/Redis cluster.'",
    ],
    whenNotToUse: [
      "Do not promise durability unless you add a WAL and change the product.",
      "Do not use one node for a 1 TB working set.",
    ],
    tradeoffs: [
      "Client hash vs proxy: extra hop vs simpler clients.",
      "RF=1: more memory for data, cold miss on death.",
      "RF=2: fewer stampedes, half the unique data.",
    ],
    interviewTips: [
      "Draw the ring, eviction, and what happens when a node dies (herd).",
      "Mention vnodes and hot-key replication.",
    ],
    pitfalls: [
      "hash % N.",
      "No TTL and unbounded growth.",
      "Persisting a cache and calling it the database.",
    ],
    practiceIdeas: [
      "Design a client that retries the next replica on timeout (hedge).",
      "Plan a rolling restart that does not empty the whole fleet at once.",
    ],
    related: [
      "cache-patterns",
      "consistent-hashing",
      "key-value-store",
      "redis-vs-memcached",
      "hot-keys-partitions",
      "hedged-requests",
    ],
  },
  {
    slug: "distributed-lock-scheduler",
    track: "hld",
    category: "Classic designs",
    title: "Design a distributed lock and job scheduler",
    summary:
      "Leases not locks-forever: fencing tokens, and a scheduler that runs cron-like jobs once across a fleet.",
    depth: "advanced",
    whyItMatters:
      "Every platform grows 'run this once a minute' and 'only one leader mutates X.' The interview is correctness under pause and partition — Redis SET NX is not enough if you do not fence.",
    theory: [
      "Requirements: acquire/release a lock with TTL, renew, fencing token; schedule jobs (cron, delay, one-shot) exactly-once-enough across workers. NFRs: locks are not for 20-minute DB transactions; scheduler throughput maybe thousands of jobs/min, not millions/s (that's a queue). Ask whether jobs can overlap.",
      "Estimates: lock QPS is usually low; correctness matters. Scheduler: 100k recurring jobs — a DB of next_run + workers claiming with skip-locked or a partitioned wheel. Do not poll every job every second from one thread.",
      "API: Lock(name, ttl) → {token, fencing}; Unlock/Renew; Schedule(spec); workers pull or get pushed. Idempotent job keys.",
      "Data: locks in etcd/ZooKeeper/Redis with fencing tokens (monotonic version). Scheduler: jobs table (id, spec, next_run, epoch) in SQL or a log; claim via txn; history/audit. For high scale, shard by job id; a leader per shard (Raft).",
      "Bottlenecks: thundering lock expiry (herd), zombie lock holders after GC pause (must fence: storage rejects old tokens), scheduler hotspot at :00 (jitter crons). Evolution: calendars, backfill, DAG workflows (that's Temporal — say when you graduate). Never use a lock as the only idempotency for payments — use a ledger key.",
    ],
    howItWorks: [
      "Lock: CAS create with TTL + increment fencing token; client sends token on every write.",
      "Renew heartbeat; if expired, another may acquire a higher token.",
      "Scheduler: worker claims due jobs (SKIP LOCKED or shard leader), runs, acks, sets next_run.",
      "At-least-once run + idempotent job body; DLQ failed jobs.",
      "Jitter schedules; do not align every cron on the minute without reason.",
    ],
    whenToUse: [
      "Leader election, unique periodic work, 'design a cron for 10k jobs.'",
    ],
    whenNotToUse: [
      "Do not hold a Redis lock across a user HTTP request that might last minutes.",
      "Do not use locks instead of unique constraints for inventory.",
    ],
    tradeoffs: [
      "etcd/Raft locks: safer fencing, lower throughput.",
      "Redis locks: fast, easy to get fencing wrong (Redlock debate — mention tokens).",
      "Pull workers vs push: simple vs lower latency.",
    ],
    interviewTips: [
      "Say 'lease + fencing token' before you say Redlock.",
      "Walk a GC pause: old holder wakes and must be rejected.",
    ],
    pitfalls: [
      "Lock without TTL — deadlock when a process dies.",
      "TTL shorter than the critical section without renew.",
      "All crons at 00:00:00.",
    ],
    practiceIdeas: [
      "Design fencing so a zombie primary cannot write to S3 after failover.",
      "Compare skip-locked SQL scheduler vs per-shard Raft leaders.",
    ],
    related: [
      "consensus-raft-paxos",
      "failure-modes",
      "idempotency-delivery",
      "dlq",
      "distributed-cache",
      "unique-id-generator",
    ],
  },
  {
    slug: "public-api-platform",
    track: "hld",
    category: "Classic designs",
    title: "Design a public API platform",
    summary:
      "Keys, OAuth, per-consumer quotas, versioning, webhooks, and a developer portal — the gateway as a product, not a single nginx.",
    depth: "next",
    whyItMatters:
      "Platforms (Stripe-like) are judged on the edge: auth, limits, audit, and compatibility. This design pulls traffic, reliability, and product-ops together.",
    theory: [
      "Requirements: external REST/gRPC APIs, API keys and OAuth apps, per-key and per-app quotas, versioning, logs for developers, webhooks out, docs/portal. NFRs: multi-tenant isolation, high edge QPS, change without breaking v1. Ask partner vs public anonymous.",
      "Estimates: edge QPS is the product QPS. Keys in the 10^6; most traffic from a power-law of integrators. Webhook outbound is its own job system. Logs of every request for 7–30 days is a big stream (sample bodies).",
      "API: the product APIs plus /oauth, /keys, /webhooks, /logs. Idempotency-Key on mutates (document it). Version in the URL or header. 429 with a consistent error shape.",
      "Data: consumers and keys (hash the secret) in SQL; quotas in Redis limiter; gateway config; webhook endpoints + delivery log; request logs to a stream/OLAP. RBAC which keys can which scopes. WAF + edge limits in front.",
      "Bottlenecks: hot partner keys (dedicated limiters/shards), webhook dest down (backoff, DLQ, portal replay), version sprawl. Evolution: billed usage (meter like ads), sandboxes, per-tenant silos for enterprise, GraphQL/BFF for first-party only. Compatibility: expand/contract, deprecation windows. The gateway must not own business transactions — it authenticates, limits, routes, and observes.",
    ],
    howItWorks: [
      "Edge TLS + WAF → gateway validates key/OAuth (iss/aud/exp) → quota → route to service.",
      "Attach consumer_id and request_id; services authorize scopes again.",
      "Async log the request metadata; sample bodies.",
      "Webhook worker signs and delivers with retries; portal shows attempts.",
      "Ship versioned SDKs; sunset with metrics of old versions still in use.",
    ],
    whenToUse: [
      "Stripe/Twilio-like interviews, marketplace partner APIs, internal API-as-product.",
    ],
    whenNotToUse: [
      "Do not build a full platform for a single internal app.",
      "Do not trust the gateway as the only authz on workers that consume IDs from queues.",
    ],
    tradeoffs: [
      "URL vs header versioning: clarity vs pretty URLs.",
      "Central gateway: consistency, shared fate.",
      "Verbose request logs: support, PII and cost.",
    ],
    interviewTips: [
      "Draw gateway, limiter, key store, webhook pipeline, and the actual product service.",
      "Mention hashed keys, signed webhooks, and a deprecation policy.",
    ],
    pitfalls: [
      "Plaintext API keys in the DB.",
      "No idempotency documentation — partners double-create.",
      "Breaking JSON field types in a 'minor' version.",
    ],
    practiceIdeas: [
      "Design a 12-month deprecation of v1 with traffic dashboards.",
      "Add usage-based billing: meter at the gateway, invoice from gold aggregates.",
    ],
    related: [
      "api-gateway",
      "auth-sessions-jwt",
      "rate-limiter-system",
      "webhooks-vs-polling",
      "rbac-abac",
      "least-privilege-secrets",
    ],
  },
];
