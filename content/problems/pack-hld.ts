import { problem, type ProblemCard } from "./types";

export const PACK: Record<string, ProblemCard> = {
  "hld-interview-method": problem(
    "You have 45 minutes and a blank board. The interviewer said “design it” and is already looking at the clock.",
    "Lead the room: lock v1, estimate, contract, sketch, dive, wrap — not twenty boxes first.",
    "URL shortener or newsfeed. They will interrupt at minute 12.",
    [
      "How do you spend the 45 minutes?",
      "They say skip estimates and talk multi-region. What do you drop?",
      "You never wrote consistency on the write. What fails in the last five minutes?",
    ],
  ),

  "url-shortener": problem(
    "People need to paste long links into SMS and tweets.",
    "v1: mint a unique short code and redirect fast. Custom aliases and full analytics are later.",
    "Hundreds of writes/s, 50k redirect QPS. A viral code must not melt the primary.",
    [
      "Design bit.ly.",
      "301 or 302 — and why stats break.",
      "Someone scrapes sequential codes.",
    ],
  ),
  pastebin: problem(
    "Engineers want to dump a log or a 40 MB file and send a link.",
    "v1: upload, get an unguessable URL, download. Bytes and metadata are different stores.",
    "10M creates/day, 50 KB average, one gist goes viral at 20k download QPS.",
    [
      "Design Pastebin.",
      "The file is 2 GB. Does it go through the API box?",
      "Unlisted vs private — what if the id is autoincrement?",
    ],
  ),
  "rate-limiter-system": problem(
    "A public API is getting hammered by one customer and a botnet.",
    "v1: cap requests per key without adding 50ms to every call.",
    "80k QPS at the edge, 100 keys are hot, Redis in one AZ dies.",
    [
      "Design a rate limiter.",
      "Token bucket or sliding window — pick one and say why.",
      "The limiter itself is down. Do we fail open or shut the door?",
    ],
  ),
  "key-value-store": problem(
    "You need get/put with a TTL, not a SQL schema.",
    "v1: a distributed KV that survives a node death and still looks fast.",
    "200k tiny gets/s, 5k puts/s, 50 nodes, one rack goes dark.",
    [
      "Design Dynamo / a key-value store.",
      "Where do you put a key, and who owns the replica set?",
      "A put returns 200, then that node dies before flush.",
    ],
  ),
  "unique-id-generator": problem(
    "Every tweet, payment, and short link needs an id that will not collide across machines.",
    "v1: mint unique, roughly time-ordered ids at write QPS without a single global lock.",
    "50k ids/s across 20 boxes. Two data centers, clocks drift 200ms.",
    [
      "Design Twitter Snowflake.",
      "UUID vs ticket server vs Snowflake — pick for this write path.",
      "A machine reboots and reuses the same worker id.",
    ],
  ),
  "web-crawler": problem(
    "You want a fresh copy of the public web without knocking sites over.",
    "v1: frontier, politeness, fetch, store. Ranking is later.",
    "10k URLs/s, robots.txt per host, one domain is 80% of the queue.",
    [
      "Design a web crawler.",
      "How do you stay polite per host and still use the fleet?",
      "A poison URL redirects to itself forever.",
    ],
  ),
  newsfeed: problem(
    "I follow 200 people. I open the app and want new posts now.",
    "v1: deliver a home timeline. Ranking models are later.",
    "Reads dwarf writes. One celebrity has 50M followers.",
    [
      "Design Twitter / Facebook home feed.",
      "Fan-out on write or on read — who gets which?",
      "I follow someone and the feed looks empty.",
    ],
  ),
  instagram: problem(
    "People post photos and scroll a home grid plus a profile.",
    "v1: upload, store media, serve a follow feed. Stories and Reels are later.",
    "10M photo uploads/day, 1 MB each, feed reads 100:1 vs writes.",
    [
      "Design Instagram.",
      "Where do bytes live vs the post row?",
      "A celebrity posts and fan-out explodes.",
    ],
  ),
  notifications: problem(
    "An event happens — like, comment, ship — and the user should hear about it on phone, email, or in-app.",
    "v1: ingest events, fan-out to devices, respect quiet hours. No ML ranking.",
    "2M push/min at a concert drop. One user has 4 devices and muted the sender.",
    [
      "Design a notification system.",
      "Push vs email vs in-app — who decides the channel?",
      "The provider 429s. Do we drop, retry, or DLQ?",
    ],
  ),
  autocomplete: problem(
    "The search box must suggest as they type, not after they hit enter.",
    "v1: prefix matches in tens of milliseconds. Personalized ranking is later.",
    "Typeahead at 8k QPS, prefixes of 1–3 letters are huge, p99 under 50ms.",
    [
      "Design Google typeahead.",
      "Trie in memory vs inverted index — what is v1?",
      "A misspelled prefix and a hot prefix that stampedes.",
    ],
  ),
  "trending-topics": problem(
    "Millions of posts a minute, and the homepage wants “what is exploding right now.”",
    "v1: count recent mentions and surface a top list that is not just bots.",
    "200k events/s, 10-minute windows, one celebrity name is 30% of traffic.",
    [
      "Design Twitter trending topics.",
      "How do you decay old counts without a full recount?",
      "A coordinated hashtag attack — what do you filter?",
    ],
  ),
  chat: problem(
    "Two people (and later a group) need to send messages that survive going offline.",
    "v1: 1:1 + small groups, delivery ticks, history. Video is later.",
    "Many idle sockets, groups of 256, media later. A group of 10k is the trap.",
    [
      "Design WhatsApp.",
      "WebSocket vs poll — and where does the message persist?",
      "Sent / delivered / read ticks across two phones.",
    ],
  ),
  "presence-service": problem(
    "The app wants a green dot and “last seen” without polling every friend every second.",
    "v1: online / last-seen that is allowed to be a few seconds stale.",
    "50M users, 10% online, heartbeats every 20s, friend lists of 500.",
    [
      "Design a presence service.",
      "Heartbeat TTL vs a live socket map.",
      "A gateway dies — how many people look offline?",
    ],
  ),
  "live-comments": problem(
    "A World Cup goal drops and 200k people comment on the same video at once.",
    "v1: append-only comments that other viewers see within a second or two.",
    "One video is 90% of write QPS. History is a cursor, not a refresh.",
    [
      "Design live comments on a stream.",
      "Fan-out to viewers without N² connections.",
      "The celebrity video shard is on fire.",
    ],
  ),
  youtube: problem(
    "Creators upload long video; viewers hit play and expect it to start fast on a bad network.",
    "v1: upload, transcode, store renditions, play via CDN. Comments are later.",
    "Hours of 4K a day, ABR on 3G, a premiere spikes one origin.",
    [
      "Design YouTube.",
      "Where do original bytes vs renditions live?",
      "Play starts in Mumbai while the origin is in Iowa.",
    ],
  ),
  zoom: problem(
    "Twelve people join a call and need to hear each other with lip-sync that does not feel broken.",
    "v1: media path, SFU vs MCU, join/leave. Recording is a follow-up.",
    "A 50-person all-hands, one user on 3G, an SFU in one region dies.",
    [
      "Design Zoom.",
      "Who mixes audio — every client or a server?",
      "Someone's uplink dies. Do you freeze, mute, or drop them?",
    ],
  ),
  ticketmaster: problem(
    "Taylor Swift onsale. A million people want the same 20k seats.",
    "v1: hold a seat, pay, issue a ticket — without selling the same seat twice.",
    "200k QPS at open, holds expire in 10 minutes, payment is slower than browse.",
    [
      "Design Ticketmaster.",
      "How do you hold a seat so two carts cannot win?",
      "Payment succeeds after the hold expired.",
    ],
  ),
  uber: problem(
    "A rider opens the app. Nearby drivers are moving. Someone has to be offered the trip.",
    "v1: ping location, request a ride, match one driver. Pricing is later.",
    "Location updates dwarf match QPS. Two riders grab the last driver downtown.",
    [
      "Design Uber matching.",
      "How do you find nearby supply without scanning the table?",
      "The driver ignores the offer. What happens to the trip?",
    ],
  ),
  "payments-wallet": problem(
    "Money moves between wallets and vendors. Double-credit is worse than being briefly down.",
    "v1: ledger append, hold/capture, idempotent deposits. Card network details later.",
    "5k money-moves/s, two regions, a retry after a 502.",
    [
      "Design a payments wallet.",
      "Where is the source of truth — balance cell or ledger?",
      "The same Idempotency-Key arrives twice, 8 seconds apart.",
    ],
  ),
  "inventory-checkout": problem(
    "A flash sale has 300 units and 30k carts. Oversell means angry refunds.",
    "v1: reserve stock, check out, release on abandon. Recommendations are later.",
    "One SKU is the hot key. Checkout p99 300ms, cart TTL 15 minutes.",
    [
      "Design inventory and checkout.",
      "When is stock decremented — add-to-cart or pay?",
      "Two checkouts pass the read, then both write.",
    ],
  ),
  dropbox: problem(
    "A file saved on the laptop should show up on the phone, including edits to the middle of a 2 GB video.",
    "v1: chunk, sync, conflict on two writers. Full office suite is later.",
    "Millions of tiny metadata ops, large objects in blob store, two devices edit offline.",
    [
      "Design Dropbox.",
      "Why chunks + a block list, not one blob per save?",
      "Laptop and phone both edited while offline.",
    ],
  ),
  netflix: problem(
    "A catalog of titles must start playback worldwide, on a living-room TV and a phone.",
    "v1: catalog, entitlement, CDN + ABR. Social features later.",
    "Friday 8pm, one new episode, 40% of traffic in one country, origin must not see every byte.",
    [
      "Design Netflix.",
      "What lives at the CDN vs the origin?",
      "License lapses in one region mid-stream.",
    ],
  ),
  "maps-nearby": problem(
    "The user wants coffee within 1 km, ranked by walking time, not a table scan of Earth.",
    "v1: index points, query a radius, return a page. Turn-by-turn is later.",
    "50k nearby queries/s, downtown is dense, desert cells are empty.",
    [
      "Design Google Maps nearby search.",
      "Geo hash / S2 vs a lat-long BETWEEN.",
      "The cell is empty — how do you expand without drowning?",
    ],
  ),
  "ad-click-aggregator": problem(
    "Clicks and impressions arrive as a firehose. Finance wants counts that match the invoice.",
    "v1: ingest, dedupe, aggregate by campaign. Real-time bidding is later.",
    "2M events/s, late events by 20 minutes, one campaign is a hot key.",
    [
      "Design an ad click aggregator.",
      "Exactly-once or at-least-once plus idempotent keys?",
      "A retry reprints yesterday's bill.",
    ],
  ),
  "metrics-pipeline": problem(
    "Every box emits counters. Dashboards and alerts need them within a minute, not tomorrow.",
    "v1: ingest, roll up, store cheaply. Full APM traces later.",
    "5M points/s, 15-month retention, a misconfigured agent 100×s one metric.",
    [
      "Design a metrics pipeline.",
      "Push vs pull scrape — what is v1?",
      "Cardinality explodes: user_id on every label.",
    ],
  ),
  "distributed-cache": problem(
    "The DB cannot take the read QPS. You want a fleet that looks like one giant Redis.",
    "v1: get/set, TTL, add/remove nodes without dumping the whole working set.",
    "400k gets/s, 60 nodes, one node dies, a celebrity key is 20% of traffic.",
    [
      "Design a distributed cache.",
      "Consistent hashing vs a directory — who moves keys?",
      "Cache miss stampede on a hot key.",
    ],
  ),
  "distributed-lock-scheduler": problem(
    "A cron job must run once, not once per box, and a worker may die holding the lock.",
    "v1: lock with TTL + fencing, and a scheduler that does not double-fire.",
    "5k jobs/min, 30 workers, clocks skew, a lock holder GC-pauses for 12s.",
    [
      "Design a distributed lock and job scheduler.",
      "Redis SET NX vs ZooKeeper / etcd — what do you trust?",
      "The lock expires while the work is still running.",
    ],
  ),
  "public-api-platform": problem(
    "Third parties will call your API with keys, quotas, and webhooks they expect to trust.",
    "v1: auth, rate limits, versioning, audit. A marketplace of apps is later.",
    "20k partner QPS, one partner is 40% of traffic, a leaked key at 3am.",
    [
      "Design a public API platform.",
      "API key vs OAuth — who is the caller?",
      "You ship a breaking change. How do old clients live?",
    ],
  ),

  "least-privilege-secrets": problem(
    "The API image has a prod DB password in an env file, and the analytics job can DROP TABLES.",
    "Decide who can do what, and where secrets live so a leak is rotatable.",
    "CI can deploy prod. A laptop clone of .env hits GitHub.",
    [
      "The DB password is in the repo. Walk the fix.",
      "One role per service or a shared app user?",
      "The secret leaked. Rotate without a full outage.",
    ],
  ),
  encryption: problem(
    "Laptops get stolen and packets cross the public internet. Customer data is in the payload.",
    "Pick what is encrypted in transit vs at rest, and who holds the keys.",
    "TLS to the LB, HTTP inside the VPC today. A disk snapshot leaks.",
    [
      "Where do you terminate TLS, and is that enough?",
      "Envelope encryption vs one KMS key for the whole DB.",
      "A region is seized. Are the backups still readable?",
    ],
  ),
  "pii-gdpr": problem(
    "A user in the EU hits “delete my account.” Copies of their email live in logs, backups, and a warehouse.",
    "Decide what is PII, where it lives, and how delete or export actually completes.",
    "30-day log retention, 90-day backups, a replica in the US.",
    [
      "Right to be forgotten — what do you erase?",
      "Can support still see the last four of a card?",
      "Delete succeeds in SQL but the object store and CDN still have the photo.",
    ],
  ),
  "ddos-waf": problem(
    "Traffic jumped 40× and most of it is not human. The origin is falling over.",
    "Decide what dies at the edge vs what the app still has to handle.",
    "SYN flood + layer-7 scrape on /search. Good users are in the same /24 as bots.",
    [
      "We're being DDoS'd. What sits in front?",
      "WAF rules vs rate limits vs CAPTCHA — order them.",
      "A partner's NAT looks like a botnet.",
    ],
  ),
  "audit-logs": problem(
    "Finance changed a payout routing number. Legal will ask who did it, from where, six months later.",
    "Design an append-only trail that app logs cannot silently rewrite.",
    "Admins in two regions, 2 years retention, a compromised admin token.",
    [
      "Who changed this row, and can they erase the evidence?",
      "What goes in the audit event vs the app log?",
      "The writer is down. Do we block the money move?",
    ],
  ),
  "sli-slo-sla": problem(
    "Leadership wants “four nines.” On-call is already drowning in 500s from a single bad client.",
    "Pick the user-visible indicator, a target, and what happens when the error budget burns.",
    "Checkout success 99.9%, p99 300ms. A deploy burns the month's budget by Tuesday.",
    [
      "What is the SLO for checkout — not 'pods are Running'?",
      "SLO vs SLA — who pays if we miss?",
      "Error budget is gone. Do we freeze deploys?",
    ],
  ),
  "alerting-vs-dashboards": problem(
    "The dashboard is pretty. Nobody woke up, and users were down for 40 minutes.",
    "Decide what pages a human at 3am vs what is only a chart.",
    "p99 crept from 80ms to 400ms over an hour. CPU looks fine.",
    [
      "What do you page on vs what do you graph?",
      "Symptom alerts or cause alerts?",
      "A flapping check pages every 4 minutes.",
    ],
  ),
  "capacity-planning": problem(
    "Launch is in six weeks. Today’s primary is at 60% CPU on a normal Tuesday.",
    "Turn a growth story into headroom, and say what you buy vs what you redesign.",
    "3× traffic on day one, 10× in a year, disk fills 40 days before CPU.",
    [
      "Will this primary survive launch Friday?",
      "What do you scale first — boxes, shards, or cache?",
      "The forecast was wrong by 5×. What is the escape hatch?",
    ],
  ),
  cost: problem(
    "The bill is mostly egress and a fleet of huge boxes that idle at night.",
    "Treat cost as a design constraint: what you store, where you compute, what leaves the region.",
    "10 TB/day video, multi-AZ replication, a chatty chatty microservice mesh.",
    [
      "This design is correct and too expensive. Cut 40%.",
      "CDN vs more origin, or compress vs store less?",
      "A debug log line at 2M QPS — what did it cost?",
    ],
  ),
  "retention-deletion": problem(
    "Events have piled up for five years. Legal wants some gone; product wants “we never lose history.”",
    "Pick retention per store and a delete path that actually reaches replicas and backups.",
    "Hot clicks 30 days, raw logs 13 months, warehouse 5 years, a GDPR delete tomorrow.",
    [
      "How long do we keep clicks, and where?",
      "Soft delete vs purge — when is it really gone?",
      "The replica and the lake still have the row.",
    ],
  ),

  "block-file-object": problem(
    "A database wants a disk, a laptop wants a filesystem, and a video wants a bucket.",
    "Pick block vs file vs object for each blob of data on the board.",
    "Postgres data dir, NFS home dirs, 4K video renditions, 50 TB/year growth.",
    [
      "Where do these bytes live — EBS, NFS, or S3?",
      "Can the app treat S3 like a disk?",
      "Random 4 KB writes vs a 2 GB immutable object.",
    ],
  ),
  "cdn-origin": problem(
    "Viewers worldwide request the same MP4. The origin is in one region and the NIC is melting.",
    "Design the edge cache and what still has to hit origin.",
    "80% cacheable, 20% personalized manifests, a bad deploy cached for 24h.",
    [
      "What do you put on the CDN vs the origin?",
      "Cache-Control vs purge vs origin shield.",
      "A private photo URL leaked and is cached at the edge.",
    ],
  ),
  "chunked-resumable-upload": problem(
    "A creator is on hotel Wi-Fi uploading a 4 GB video. The connection dies at 90%.",
    "Design an upload that can resume without starting over, and without blowing API RAM.",
    "Chunk 8 MB, 10k concurrent uploads, a retry of chunk 3 arrives twice.",
    [
      "How do you upload a 4 GB file on a flaky network?",
      "Presigned PUTs vs streaming through the API.",
      "Two clients finish the same upload id.",
    ],
  ),
  "image-video-pipelines": problem(
    "A raw upload is useless until you have thumbnails, a poster, and three bitrates.",
    "Design the async pipeline so play does not wait on transcode of the original.",
    "1M images/day plus 20k videos, a poison file that crashes ffmpeg, users refresh immediately.",
    [
      "What happens after they tap Upload?",
      "Sync thumbnail vs queued renditions — what blocks the UI?",
      "Transcode fails on the last rendition. Is the post live?",
    ],
  ),
  "long-poll-ws-sse": problem(
    "The UI needs new data without the user hitting refresh. You have HTTP, and you have sockets.",
    "Pick long poll, WebSocket, or SSE for this product, and say who holds the connection.",
    "200k idle clients, a chat vs a sports score vs an invoice status.",
    [
      "Push updates to the client. Which pipe?",
      "Why not WebSocket for a one-way feed?",
      "LBs idle-timeout the socket every 60s.",
    ],
  ),
  presence: problem(
    "Friend lists show “online” but the truth is a heartbeat that can lie after a crash.",
    "Decide how presence is stored, expired, and fan-out without N² polls.",
    "Heartbeats every 15s, 5M online, a phone backgrounds and the socket dies quietly.",
    [
      "How do you know they are online?",
      "Last-seen vs live — what is allowed to be stale?",
      "Split-brain: two gateways both think they own the session.",
    ],
  ),
  "fan-out-write-vs-read": problem(
    "One post must reach a million timelines. Writing a million rows at post time will not finish.",
    "Pick push, pull, or hybrid per class of user.",
    "Normal user 200 followers, celebrity 50M, read QPS 100× write.",
    [
      "Fan-out on write or on read?",
      "What do you do for the celebrity?",
      "I follow someone — when does their last week appear?",
    ],
  ),
  "unique-ids": problem(
    "Ids are minted on 40 boxes. Some must sort by time; none may collide; some must not be guessable.",
    "Pick UUID, Snowflake, or a ticket server for this write — and name the failure.",
    "80k ids/s, two regions, NTP is 400ms off on one host.",
    [
      "How do you mint ids without a global lock?",
      "Why not autoincrement if we shard later?",
      "Clock jumps backward on a Snowflake worker.",
    ],
  ),

  "sql-vs-nosql": problem(
    "You have joins, money, and a unique email today. Marketing wants a 50 KB flexible profile tomorrow.",
    "Pick the store from the access pattern, not from a slogan.",
    "Checkout 3k writes/s that must not lose a unique constraint; feed 80k reads/s of denormalized cards.",
    [
      "Postgres or Dynamo for this table — why?",
      "What query must stay a transaction?",
      "You outgrow one primary. Do you move product or just this table?",
    ],
  ),
  replication: problem(
    "The primary just died. Replicas are 1.5s behind. Reads are still coming.",
    "Decide sync vs async, failover, and what clients are allowed to see.",
    "One region, two replicas, RPO of a few seconds is OK for posts, not for payments.",
    [
      "Primary is gone. Who takes writes?",
      "Read-your-write after the user posts.",
      "Replica lag is 12s during a backfill.",
    ],
  ),
  sharding: problem(
    "One primary cannot take the writes. A single tenant is 20% of the table.",
    "Pick a shard key and a way to split later without an overnight outage.",
    "2 TB, 8k writes/s, user_id vs created_at vs tenant_id as the key.",
    [
      "How do you split this table?",
      "Range, hash, or directory — pick one.",
      "The whale tenant lands on one shard.",
    ],
  ),
  "consistent-hashing": problem(
    "You added four cache nodes and suddenly 80% of keys missed. The DB lit up.",
    "Place keys so adding or losing a node moves only a slice, not the world.",
    "32 cache nodes, one dies, virtual nodes uneven, a hot key still pins one box.",
    [
      "A cache node died. How many keys move?",
      "Why virtual nodes?",
      "Hash ring vs a lookup table in ZooKeeper.",
    ],
  ),
  indexes: problem(
    "The query that was fine at 1M rows now scans 400M. Writes are slower every time you “just add an index.”",
    "Pick which indexes exist from the real WHERE/ORDER BY, and what you refuse to index.",
    "orders(user_id, created_at, status), 20k writes/s, a dashboard filters 12 columns.",
    [
      "This query is slow. What index do you add?",
      "Covering index or a bigger scan — tradeoff.",
      "Five indexes later, checkout write p99 doubled.",
    ],
  ),
  "normalize-vs-denormalize": problem(
    "The feed join is five tables and 80ms. Product wants the card in 10ms.",
    "Decide what stays normalized for writes and what you copy for reads.",
    "Post + author + like count on every card, 100:1 reads, author changes their name.",
    [
      "Do you join at read or copy into the feed row?",
      "What happens when the source field changes?",
      "Two copies disagree after a partial write.",
    ],
  ),
  cqrs: problem(
    "The write model is a careful ledger. The read model is a dashboard that wants six aggregations.",
    "Split the write path from the read model only if the shapes truly disagree.",
    "Payments 2k writes/s, analytics 200 QPS of scans, replica lag 3s is OK on the dashboard.",
    [
      "Should checkout and the admin dashboard share one schema?",
      "How does the read model stay close enough?",
      "User just paid and the read side still says unpaid.",
    ],
  ),
  "event-sourcing": problem(
    "Support needs “show me every change to this order,” not just the latest row.",
    "Decide whether the log is the source of truth — or you just need an audit table.",
    "Order state machine, 5k transitions/s, a bug shipped and you must rebuild projections.",
    [
      "Do we store events or the current order row?",
      "How do you answer 'current balance' fast?",
      "A bad event was appended. Do you rewrite history?",
    ],
  ),
  "cache-patterns": problem(
    "You put Redis in front of SQL. After a deploy, the site is either stale or the DB is on fire.",
    "Pick aside vs through vs behind, and how a miss does not stampede.",
    "80k reads/s, 5% miss, TTL 30s, one key is a celebrity profile.",
    [
      "Cache-aside or write-through for this read?",
      "Who invalidates, and when?",
      "TTL expires on a hot key — thundering herd.",
    ],
  ),
  "redis-vs-memcached": problem(
    "You need a cache. Someone said Redis, someone said Memcached, and the use case is not the same.",
    "Pick the tool from the data structure and the failure story, not the logo.",
    "Session blobs vs leaderboards vs locks vs pub/sub, 200k ops/s, eviction under pressure.",
    [
      "Redis or Memcached here?",
      "What do you lose if the box restarts?",
      "You used Redis as the only copy of the cart.",
    ],
  ),
  "object-storage": problem(
    "The OLTP database is 80% video bytes and backups take all night.",
    "Move opaque bytes to object storage and keep pointers in the DB.",
    "20 TB/month new objects, range reads for video, a delete must also purge CDN.",
    [
      "Why isn't this blob a column?",
      "Presigned URL vs proxying bytes through the API.",
      "Overwrite vs immutable keys when they replace a photo.",
    ],
  ),
  "search-inverted-index": problem(
    "SQL LIKE '%shoe%' is 900ms and still ranks badly. Users type three words and expect relevance.",
    "Design search as its own index, and say how it lags the source of truth.",
    "50M documents, 8k queries/s, a new listing must appear within ~10s.",
    [
      "How do you find 'red running shoes'?",
      "What is an inverted index here?",
      "The document was deleted in SQL and still ranks #1.",
    ],
  ),
  "specialized-stores": problem(
    "Metrics, a friend graph, and a finance warehouse are all being forced into one Postgres.",
    "Pick time-series, graph, or columnar only when the access pattern is that shape.",
    "Metrics 2M writes/s, 4-hop “friends of friends,” year-long SUM by region.",
    [
      "Is this still a relational table?",
      "When do you bring in TSDB / graph / column store?",
      "You queried a graph like a join of six tables.",
    ],
  ),
  "oltp-vs-olap": problem(
    "The CFO’s Monday dashboard scans checkout in production and checkout p99 triples.",
    "Split operational writes from analytical scans, and pick warehouse vs lake for the copy.",
    "OLTP 4k tx/s, a 2-year aggregation, ETL every 15 minutes.",
    [
      "Why can't finance query the primary?",
      "Warehouse or data lake for this report?",
      "The dashboard is 40 minutes stale on earnings day.",
    ],
  ),

  "health-checks": problem(
    "The LB still sends traffic to a box that is shutting down, and another box is “up” but cannot reach the DB.",
    "Design liveness vs readiness and a drain that does not drop in-flight work.",
    "Rolling deploy, 30s shutdown, in-flight uploads of 20s, a deadlocked thread pool.",
    [
      "What does /health mean — process alive or ready to take traffic?",
      "How do you drain connections?",
      "Readiness flaps and the LB thrashes the instance.",
    ],
  ),
  "bulkhead-circuit-breaker": problem(
    "Recommendations is slow. Checkout shares the thread pool and is now timing out too.",
    "Isolate the blast radius and stop calling a sick dependency every millisecond.",
    "One downstream p99 is 8s, 40% of threads blocked, retries make it worse.",
    [
      "Recommendations is on fire. Why is pay broken?",
      "Circuit breaker, timeout, retry + jitter — order them.",
      "The breaker is open. What does the user see?",
    ],
  ),
  "hedged-requests": problem(
    "p99 is awful because 1% of replica reads stall. p50 is fine.",
    "Decide whether a second hedged call is worth the extra load.",
    "Read QPS 30k, one replica hiccups at 2s, hedging would add 10% QPS.",
    [
      "p99 is 2s, p50 is 20ms. What do you try?",
      "When is hedging a bad idea?",
      "Both hedges hit the same sick shard.",
    ],
  ),
  "fallback-degradation": problem(
    "The personalization service is down. The homepage is blank instead of a boring but working catalog.",
    "Decide what you serve when a non-critical dependency dies, and how you turn features off.",
    "Homepage 15k QPS, recs timeout 200ms, a flag to skip recs already exists unused.",
    [
      "Recs is down. What does home render?",
      "Cached stale vs default list vs error page.",
      "A bad feature flag leaves 10% of users on the broken path.",
    ],
  ),
  "chaos-engineering": problem(
    "The runbook says multi-AZ. Nobody has ever pulled the plug on an AZ on a Tuesday.",
    "Name what you would break first and what signal proves the design, not the slide.",
    "Two AZs, a single Redis primary, on-call has never seen a real failover.",
    [
      "What do you kill first to test this design?",
      "Game day vs poking prod at random.",
      "Failover worked in staging and hung in prod for 20 minutes.",
    ],
  ),
  "blue-green-canary": problem(
    "The last “big bang” deploy took checkout down globally for 12 minutes.",
    "Pick rolling, canary, or blue-green for this change, and how you abort.",
    "200 instances, a bad migration, 1% of users see errors for 8 minutes before anyone notices.",
    [
      "How do you ship this without a global outage?",
      "Canary vs blue-green for a schema change.",
      "The canary looks healthy and the metric you picked is the wrong one.",
    ],
  ),
  "multi-az-multi-region": problem(
    "An AZ lost power. Leadership now wants “never down,” including a region-sized flood.",
    "Pick multi-AZ vs multi-region from RPO/RTO and the write story, not from a map.",
    "Sync replica next door is 2ms; the other coast is 70ms. Payments vs image CDN.",
    [
      "AZ down vs region down — which did you design for?",
      "What is the RPO if we stay single-region?",
      "Cross-region sync writes just blew the p99.",
    ],
  ),
  "active-active-passive": problem(
    "You have two regions. Product wants both to take writes. Finance wants one truth.",
    "Choose active-passive vs active-active and say how conflicts die.",
    "US and EU, users roam, a cart edited in both regions during a partition.",
    [
      "Both regions take writes, or only one?",
      "What is the failover story for active-passive?",
      "Split-brain: two primaries accepted the same order id.",
    ],
  ),

  "queues-pubsub-streams": problem(
    "After checkout you must email, bill, and update search. Doing it all in the request is 4s and loses the email on timeout.",
    "Pick a work queue, a broadcast, or a replayable log — not “add Kafka.”",
    "3k checkouts/s, email can be 30s late, search must rewind yesterday after a bug.",
    [
      "This work cannot stay on the request path. Which async shape?",
      "Queue vs pub/sub vs stream for email + search?",
      "A consumer acked and then crashed mid-side-effect.",
    ],
  ),
  "kafka-sqs-rabbit": problem(
    "You need async. One team already has SQS, another wants Kafka “for scale,” and the job is send-email.",
    "Pick the mental model: competing tasks, broker routing, or a partitioned log.",
    "Email 2k/s, no replay needed; clickstream 1M/s, must replay 7 days.",
    [
      "Kafka, SQS, or Rabbit for this arrow?",
      "Do we need rewind, or just at-least-once delivery?",
      "You put 10 KB emails on a 7-day Kafka topic.",
    ],
  ),
  outbox: problem(
    "The API committed the order and then failed to publish “order_created.” Warehouse never shipped.",
    "Make the DB write and the “tell others” message the same transaction story.",
    "5k orders/s, Kafka blip of 90s, a dual-write that looks fine in happy path.",
    [
      "DB committed, Kafka publish failed. Now what?",
      "Transactional outbox vs dual write.",
      "The poller publishes twice. Is the consumer ready?",
    ],
  ),
  sagas: problem(
    "Booking a trip writes to flights, hotels, and payments. The hotel call fails after the flight is held.",
    "Design a multi-service workflow that can compensate, not a cross-DB transaction.",
    "Three services, 800 bookings/s, payment captured, hotel 500s.",
    [
      "The hotel reserve failed. How do you unbook the flight?",
      "Choreography vs orchestrator — pick one.",
      "Compensation itself fails. Where does a human look?",
    ],
  ),
  dlq: problem(
    "One poison message crashes the consumer. The queue stops, and 200k good messages wait behind it.",
    "Decide retry budget, isolation of bad messages, and who gets paged.",
    "Workers 50, a bad payload 0.01%, retry storm every 2s, business cannot lose money events.",
    [
      "A message crashes the worker forever. What happens?",
      "How many retries, then where?",
      "DLQ is full and nobody looks at it for a week.",
    ],
  ),
  cdc: problem(
    "Search, cache, and the warehouse all need “what just changed in orders” without the API remembering to tell them.",
    "Tap the database log, and say what you do about schema changes and deletes.",
    "Primary WAL 80 MB/s, three consumers, a DROP COLUMN on Tuesday.",
    [
      "How do other systems learn the row changed?",
      "CDC vs the app emitting events.",
      "A delete in SQL — does the search doc die?",
    ],
  ),
  "webhooks-vs-polling": problem(
    "Partners need to know when a payout completes. They will either hammer GET or give you a URL to POST.",
    "Pick push vs pull, and design retries, signatures, and a portal to replay.",
    "2k partners, 30% endpoints are down at any time, a webhook they must not forge.",
    [
      "Webhook or polling for payout status?",
      "How do they know the POST is really you?",
      "Their endpoint 500s for an hour. What do we store?",
    ],
  ),
  "batch-vs-stream": problem(
    "Fraud wants a signal in seconds. Finance wants a correct daily rollup. Both are “processing events.”",
    "Split what must be streaming from what is cheaper and safer as a batch.",
    "Clicks 1M/s, fraud window 10s, invoice job 02:00 UTC, late events exist.",
    [
      "Is this a stream job or a nightly batch?",
      "What is allowed to be 24 hours late?",
      "A stream bug undercounted; can batch be the source of truth?",
    ],
  ),

  "monolith-vs-microservices": problem(
    "The deploy is one repo and 40 people step on each other. Someone wants 30 services by Friday.",
    "Pick monolith, modular monolith, or services from team and failure boundaries — not fashion.",
    "12 engineers, checkout + recs + admin, recs can die without taking pay.",
    [
      "Do we split this into services?",
      "What is the first seam if we stay a modular monolith?",
      "You split and now a page is 12 timeouts.",
    ],
  ),
  "sync-vs-async-apis": problem(
    "The client clicked Pay and is staring at a spinner while you email, score fraud, and write search.",
    "Decide which calls stay request/response and which return 202 and finish later.",
    "Pay p99 budget 300ms, fraud model 900ms, email 2s, user will refresh.",
    [
      "What is sync on this button, and what is async?",
      "202 + poll vs webhook back to the client.",
      "The user retries the spinner and you charge twice.",
    ],
  ),
  "rest-graphql-grpc": problem(
    "Mobile wants one round trip with nested data. Internal services want typed, fast RPC. A partner wants a boring HTTP API.",
    "Pick REST, GraphQL, gRPC, WebSocket, or SSE per client — not one religion.",
    "Public third parties, a mobile homepage of 12 resources, 40 internal RPCs/s per page.",
    [
      "REST, GraphQL, or gRPC for this surface?",
      "Why not GraphQL for the partner API?",
      "A chatty GraphQL query fans out to 30 services.",
    ],
  ),
  "service-discovery": problem(
    "IPs change every deploy. Hard-coded hosts in config are already wrong.",
    "Decide how callers find healthy instances after a scale event.",
    "Kubernetes pods churn, a DNS TTL of 60s, a client cache that never expires.",
    [
      "How does checkout find the payments pods?",
      "DNS vs sidecar vs a client library.",
      "Discovery says up, the instance is not ready.",
    ],
  ),
  "stateless-sticky-sessions": problem(
    "You added four API boxes but half the users still pin to one because sessions live in process memory.",
    "Move state off the box, and only keep stickiness if you can name why.",
    "WebSocket chat vs a REST cart, 20 instances, one instance deploy evicts 25% of users.",
    [
      "Why is one box at 90% CPU and the others idle?",
      "Where does the session live?",
      "Sticky sockets vs a shared session map in Redis.",
    ],
  ),
  "service-mesh": problem(
    "Every language reimplemented retries, mTLS, and timeouts differently. Outages look like “the client library.”",
    "Decide whether a mesh is worth the ops tax, or a gateway + libraries is enough.",
    "35 services, 4 languages, you do not have a platform team of 12.",
    [
      "Do we need a service mesh?",
      "What belongs in the sidecar vs the app?",
      "The mesh is down and now no service can talk.",
    ],
  ),
  "multi-tenant": problem(
    "A whale customer wants isolation. Everyone else wants a cheap pooled cluster.",
    "Pick silo vs pooled per tenant class, and how one noisy neighbor cannot take the fleet.",
    "2k tenants, one tenant is 25% of QPS, a delete must not scan everyone else’s rows.",
    [
      "Silo or pooled for this SaaS?",
      "How is tenant_id on every query and every shard?",
      "The whale’s report job wrecks shared CPU.",
    ],
  ),

  "dns-anycast-geo": problem(
    "Users type a hostname. Half the planet is still landing in Virginia after a region died.",
    "Steer them with DNS / geo / anycast, and pick a TTL you can actually live with.",
    "TTL 1 hour, EU region down, ISPs cache past your TTL.",
    [
      "How does a user in Tokyo get a nearby IP?",
      "Low TTL vs query load.",
      "Failover is done but clients still hit the dead VIP for 40 minutes.",
    ],
  ),
  cdn: problem(
    "The same CSS, images, and a few API GETs are fetched from one origin by the whole planet.",
    "Put cacheable bytes at the edge and say what must stay dynamic.",
    "Static 95% hit, HTML personalized, a versioned asset vs /latest.",
    [
      "What belongs on a CDN?",
      "How do you ship a new JS bundle without users on the old one forever?",
      "You cached an authenticated HTML page.",
    ],
  ),
  "load-balancers": problem(
    "Twenty app boxes sit behind one VIP. Some connections are huge uploads; some are tiny GETs.",
    "Pick L4 vs L7, the algorithm, and what health means.",
    "50k conns, HTTP/2, one box has a stuck connection pool, WebSockets in the mix.",
    [
      "L4 or L7 in front of this app?",
      "Round-robin vs least-conn vs consistent hash.",
      "The LB marks a box healthy and it still 500s.",
    ],
  ),
  "api-gateway": problem(
    "Every client hits a different origin, duplicates auth, and there is no one place to cut off a bad key.",
    "Put a front door on auth, rate limits, routing, and TLS — without turning it into a god service.",
    "Mobile + web + partners, 30 backends, a 10 MB upload, a WebSocket.",
    [
      "What lives on the API gateway vs the service?",
      "Reverse proxy vs “all business logic in the gateway.”",
      "The gateway is the single point of death.",
    ],
  ),
  "tls-mtls": problem(
    "Traffic is HTTPS at the edge and plaintext between services. A packet capture inside the VPC is enough.",
    "Decide where TLS terminates and whether service-to-service needs mTLS.",
    "LB terminates TLS, 40 hops inside, a sidecar cert expires Sunday night.",
    [
      "Where do you terminate TLS?",
      "When is mTLS worth it?",
      "A leaked service cert still works from a laptop on the mesh.",
    ],
  ),
  "rate-limiting": problem(
    "One API key is 70% of QPS. Good customers are getting 429s too because the limit is global.",
    "Pick token bucket, leaky bucket, or sliding window — and the key you limit on.",
    "Edge 100k QPS, per-key and per-IP, a NAT shared by a whole university.",
    [
      "How do you rate-limit this API?",
      "Token bucket vs sliding window.",
      "Distributed limiters disagree by 2× under load.",
    ],
  ),
  "auth-sessions-jwt": problem(
    "Users log in on web and mobile. A third-party app wants access. Someone pasted a JWT in a URL.",
    "Pick sessions, JWT, OAuth/OIDC, or API keys per client, and how you revoke.",
    "Session in Redis vs 24h JWT, a stolen laptop, logout must work now.",
    [
      "Session cookie or JWT for this app?",
      "How does logout work if the JWT is already issued?",
      "OAuth for the partner, API key for the cron.",
    ],
  ),
  "rbac-abac": problem(
    "Support can see every user’s PII. A contractor should only see tickets in their region.",
    "Pick roles vs attributes, and enforce on the server, not the UI hide.",
    "12 roles already, a “god” role, a doc the user shared then unshared.",
    [
      "Who is allowed to see this row?",
      "RBAC or ABAC for sharing a document?",
      "The UI hid the button; the API still returns the data.",
    ],
  ),

  "cap-theorem": problem(
    "The replica across the ocean is unreachable. Clients are still hitting both sides.",
    "For each write: refuse until you agree, or accept locally and repair later.",
    "Two AZs, 80ms apart. Checkout must not double-charge; likes can be stale.",
    [
      "SQL is down across the ocean. What do you do?",
      "Why can't chat receipts be consistent and always available?",
      "Your 200ms timeout — did you just invent a partition?",
    ],
  ),
  pacelc: problem(
    "The network is fine, but a read that waits for three replicas is 70ms and the product wanted 10ms.",
    "When healthy, pick extra RTT for a fresher answer vs a local stale one.",
    "Same-region quorum +20ms, cross-region sync +90ms, feed vs ledger.",
    [
      "No partition right now. Why is the write still slow?",
      "Read local or wait for quorum?",
      "You chose low latency. How stale can the like count be?",
    ],
  ),
  "consistency-models": problem(
    "The user posts and immediately refreshes on another phone. The post is missing. They think we lost it.",
    "Name the promise: linearizable, causal, read-your-writes, eventual — per API.",
    "Mobile + web, two regions, a like vs a password change.",
    [
      "What consistency does this read need?",
      "Read-your-writes after create.",
      "Eventual is fine until two devices fork the draft.",
    ],
  ),
  "isolation-levels": problem(
    "Two checkouts read 1 item in stock and both succeed. Finance also sees a report mid-transaction.",
    "Pick an isolation level for the money path and say what anomaly you still accept.",
    "Inventory row, two writers, a long analytics transaction on the same table.",
    [
      "Why did we sell the last item twice?",
      "Read committed vs serializable for this update.",
      "A report ran for 30s and saw a half-checkout.",
    ],
  ),
  "acid-vs-base": problem(
    "The ledger team wants a transaction. The like-counter team wants to stay up during a blip.",
    "Say which writes are ACID and which are BASE with a repair story.",
    "Transfer $20 vs increment a view count, replica unavailable for 8s.",
    [
      "Is this write a transaction or an eventually reconciled counter?",
      "What do you lose if you skip the transaction?",
      "BASE like-count drifted by 4% — is that OK?",
    ],
  ),
  "consensus-raft-paxos": problem(
    "Three nodes must agree who is leader and what the next log entry is, even if one is drunk and slow.",
    "Use consensus for a small, critical log — not for every user read.",
    "5-node Raft, one node partitioned, a leader pause of 3s, config change mid-outage.",
    [
      "Who is allowed to take this write?",
      "What does Raft actually agree on?",
      "Two nodes think they are leader.",
    ],
  ),
  "quorum-nwr": problem(
    "You have 3 replicas. A write that waits for all 3 dies when one disk is sick. A write to 1 replica vanishes.",
    "Pick N, W, R so the product’s reads meet the writes they care about.",
    "N=3, W=2, R=2 vs W=1 R=1, a node down during a Black Friday write spike.",
    [
      "How many replicas must ack this put?",
      "When does W+R > N save you?",
      "Sloppy quorum accepted a write the home nodes never saw.",
    ],
  ),
  "leader-vs-leaderless": problem(
    "A single primary serializes writes and is a hotspot. Leaderless accepts everywhere and argues later.",
    "Pick a leader for this key range or accept conflict resolution.",
    "Hot partition on user_id=1, multi-AZ, a 2s leader election vs concurrent writes.",
    [
      "Single writer or any replica takes the put?",
      "What happens while a new leader is elected?",
      "Two leaderless writes last-writer-wins a counter.",
    ],
  ),
  "failure-modes": problem(
    "The box did not crash. It paused. The network lied. Clocks jumped. Two primaries exist.",
    "Name the failure you are designing for — crash, partition, split-brain, or skew — and the client-visible result.",
    "GC pause 12s, clocks 400ms apart, a fencing token ignored.",
    [
      "The node is slow, not dead. What does the caller do?",
      "How do you notice split-brain?",
      "A lock expired because the clock jumped.",
    ],
  ),
  "idempotency-delivery": problem(
    "The client retried a 502. The queue redelivered. The user was charged twice.",
    "Pick at-most / at-least / exactly-once-enough and put an idempotency key on the effect.",
    "Pay endpoint, 8s timeout, SQS at-least-once, a webhook partner retries for 24h.",
    [
      "The same pay request arrived twice.",
      "At-least-once plus what on the consumer?",
      "Exactly-once across two databases — what do you actually promise?",
    ],
  ),
  "backpressure-retries": problem(
    "A downstream is sick. Callers retry immediately. The queue grows without bound and healthy traffic dies.",
    "Bound the work: timeouts, jittered retries, queues with limits, and a breaker.",
    "p99 80ms normally, 5s when sick, 3 retries with no jitter, 20k QPS offered.",
    [
      "The dependency is slow. Do you retry?",
      "Where does backpressure show up to the user?",
      "Retry storms after a 10-second outage.",
    ],
  ),

  "back-of-envelope": problem(
    "They said 100 million users and then waited. The next box you draw depends on the math.",
    "Turn DAU into peak QPS, storage/year, and NIC — loudly, to an order of magnitude.",
    "100M users, 20% DAU, 10 reads/day, 1 KB, 3× replication, peak 4×.",
    [
      "How many QPS is that, roughly?",
      "What is storage in year one?",
      "Which number picks SQL vs object store vs CDN?",
    ],
  ),
  "fan-out-read-write-ratio": problem(
    "One tweet and one page view are not one write and one read. Hidden multipliers will melt you.",
    "Write the read/write ratio and the fan-out on the board before you pick caches or queues.",
    "Post × 1M followers, a page that calls 12 services, cache miss stampede × 1k.",
    [
      "Is this product read-heavy or write-heavy?",
      "What is the fan-out of this one click?",
      "A celebrity breaks your write-time fan-out.",
    ],
  ),
  percentiles: problem(
    "Average latency is 40ms so the dashboard is green. Users on the slow 1% are raging.",
    "Size the system on p95/p99 of the user action, not the mean of a single hop.",
    "p50 20ms, p99 1.8s, a scatter-gather to 32 shards, SLO on “video started.”",
    [
      "Why is average a lie here?",
      "Which percentile is the SLO?",
      "The slow shard is 2% of queries and owns p99.",
    ],
  ),
  "hot-keys-partitions": problem(
    "One celebrity, one SKU, one cache key. The fleet is fine; one shard is at 100%.",
    "Find the hot key and split, cache, or isolate it — more boxes will not help.",
    "user_id of a celebrity, Black Friday SKU, a thundering herd on expiry.",
    [
      "One partition is on fire. Why?",
      "How do you split a hot key?",
      "A herd stampedes the DB when the TTL hits zero.",
    ],
  ),

  scalability: problem(
    "Tuesday traffic will be 10× by launch, then 100× in a year. The primary is already the quiet bottleneck.",
    "Say what you scale — CPU, disk, writes — and whether you grow the box or add boxes.",
    "Stateless API vs a single-writer DB, 10x / 100x / 1000x checkpoints.",
    [
      "Vertical or horizontal for this hop?",
      "What is the unit of scale — user, tenant, shard key?",
      "You scaled pods. The hot Redis key did not notice.",
    ],
  ),
  "availability-vs-reliability": problem(
    "The site is up and charging people twice. Leadership still cites four nines.",
    "Split “can I reach it” from “does it keep the promise,” and pick an SLO that matches money vs likes.",
    "99.9% uptime, double-charge rate 0.2%, MTTR 45 minutes last quarter.",
    [
      "Are we available, reliable, both, or neither?",
      "What user event is the SLO?",
      "Always-on and wrong — what do you fix first?",
    ],
  ),
  "latency-vs-throughput": problem(
    "Batch ingest wants a million writes a minute. The user tap wants 80ms. Same team, same cluster.",
    "Separate the interactive path from the bulk path so you do not optimize the wrong number.",
    "Interactive p99 80ms at 5k QPS vs a 2M/s pipeline that can wait 30s.",
    [
      "Are we optimizing latency or throughput?",
      "Why did batching help ingest and hurt the tap?",
      "You raised concurrency and p99 exploded.",
    ],
  ),
  "consistency-vs-durability": problem(
    "The put returned 200. The box then died. Another replica has an older value. The user refreshed.",
    "Say whether you need a correct latest or a write that survives the disk — they are not the same.",
    "fsync every write vs ack in memory, replica ack 1 vs 2, a power loss.",
    [
      "Did we lose the write, or just show a stale read?",
      "Ack after memory or after disk + replica?",
      "Likes can vanish; a payment cannot. Mark both on the board.",
    ],
  ),
  "fault-tolerance-dr": problem(
    "An AZ is gone. Tomorrow it could be the region. Backups exist; nobody timed a restore.",
    "Set RPO and RTO, and say what redundancy vs what is actually a disaster-recovery drill.",
    "Multi-AZ sync, nightly backup, region RTO 4h, last restore test was 14 months ago.",
    [
      "What is RPO and RTO for checkout?",
      "Failover vs restore-from-backup — which did you buy?",
      "The backup is encrypted with a key in the dead region.",
    ],
  ),
  observability: problem(
    "Users say it is slow. You have 12 dashboards and no trace that ties a request across four services.",
    "Put logs, metrics, and traces on the user action, not on “CPU looks fine.”",
    "RED on the checkout route, a trace id from mobile to ledger, a missing span on the queue hop.",
    [
      "How do you find why this one request was 3s?",
      "What is the SLI metric vs a debug log?",
      "A worker ate the message and there is no trace after the queue.",
    ],
  ),
};
