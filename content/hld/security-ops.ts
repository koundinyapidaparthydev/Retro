import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "least-privilege-secrets",
    track: "hld",
    category: "Security",
    title: "Least privilege and secrets management",
    summary:
      "Every identity gets the minimum access it needs, and secrets live in a manager — not in git, images, or Slack.",
    depth: "core",
    whyItMatters:
      "Most breaches are stolen keys and over-broad IAM, not movie-plot crypto breaks. An HLD that ignores how the app gets a DB password is incomplete. Interviews reward IAM roles, short-lived creds, and rotation.",
    theory: [
      "Least privilege: human, service, and CI identities each get scoped roles. The API server can write orders, not drop tables. The analytics job can read a replica or warehouse, not prod redis. Break-glass admin is logged and temporary. Network policies shrink who can even attempt a call; IAM/authz decide if it succeeds.",
      "Secrets: database passwords, API keys, private keys, signing secrets. Store them in a manager (Vault, AWS SM, GCP SM) or inject via the platform (IRSA, workload identity) so the app never sees a long-lived static password if you can avoid it. Encrypt at rest in the manager; audit access; rotate. Sidecar or SDK fetch at start and on rotate. Never bake secrets into images or mobile apps.",
      "CI/CD is a high-value identity: it should not have prod admin forever. OIDC from GitHub Actions to cloud roles is the modern pattern. Separate prod and non-prod accounts. If a secret leaks, you need a rotation runbook that does not require a full outage.",
    ],
    howItWorks: [
      "One role per service; no shared 'app' superuser.",
      "Prefer workload identity / IAM roles over static passwords.",
      "Inject secrets at runtime; rotate on a calendar and on leak.",
      "Scan git and images; block commits of private keys.",
      "Audit GetSecretValue and admin API calls.",
    ],
    whenToUse: [
      "Every production system — this is default hygiene.",
      "Partner API keys: per-partner secrets with rotation.",
      "Human access via SSO + short roles, not a shared SSH key.",
    ],
    whenNotToUse: [
      "Do not share one DB user across 15 microservices 'until we have time.'",
      "Do not put prod secrets in the mobile binary.",
    ],
    tradeoffs: [
      "Fine-grained roles: safer, more IAM toil and debugging 'access denied.'",
      "Short-lived creds: better blast radius, more refresh machinery.",
      "Central vault: consistent audit, a critical dependency.",
    ],
    interviewTips: [
      "When you draw the DB, say 'app role with least privilege, creds from the manager.'",
      "For public API keys, hash at rest and show rotation.",
    ],
    pitfalls: [
      "Secrets in environment variables dumped to logs and crash reports.",
      "Long-lived AWS keys on a laptop.",
      "A 'readonly' warehouse user that can still export all PII to the internet.",
    ],
    practiceIdeas: [
      "Map identities in a three-service app and write their IAM in words.",
      "Write a rotation plan for JWT signing keys with overlap (two valid kids).",
    ],
    related: [
      "rbac-abac",
      "encryption",
      "tls-mtls",
      "audit-logs",
      "auth-sessions-jwt",
      "public-api-platform",
    ],
  },
  {
    slug: "encryption",
    track: "hld",
    category: "Security",
    title: "Encryption at rest and in transit",
    summary:
      "TLS on the wire, KMS-backed encryption on disks and objects, and application-level encryption when the platform admin should not see the bytes.",
    depth: "core",
    whyItMatters:
      "Compliance checklists ask this; so do interviewers. The design questions are who holds keys, what is covered (backups, replicas, logs), and whether you need envelope encryption for specific fields (SSN, card PAN).",
    theory: [
      "In transit: TLS 1.2+ everywhere that leaves a trust boundary — public internet, between services, to datastores and brokers. mTLS for service identity. This is table stakes; see the TLS topic. Watch for leftover plaintext hops after the LB.",
      "At rest: disk encryption (cloud default), object encryption, and database TDE or filesystem encryption. This protects stolen disks and some backup dumps. It does not protect against a compromised app role that is allowed to decrypt. Keys should live in KMS/HSM with rotation and IAM on Decrypt.",
      "Application-level / field encryption: the app encrypts before write (envelope: DEK encrypted by KEK in KMS). Search and indexing become hard (blind indexes, tokenize). Use for high-sensitivity fields. PCI often wants a dedicated vault for PAN. Crypto-shredding (delete the DEK) is a deletion technique for event logs.",
    ],
    howItWorks: [
      "Enable platform encryption on disks, buckets, and warehouses.",
      "KMS CMKs per environment/tenant class; IAM on kms:Decrypt.",
      "TLS to Redis/Kafka/Postgres, not only to the browser.",
      "Field-encrypt the few columns that need it; keep searchable tokens separate.",
      "Include backups, snapshots, and log archives in the story.",
    ],
    whenToUse: [
      "Platform at-rest + TLS: all production.",
      "Field encryption: government IDs, health, cards, secrets.",
      "Per-tenant keys for enterprise silos.",
    ],
    whenNotToUse: [
      "Do not roll your own block cipher mode in the app for fun.",
      "Do not encrypt fields you must query with LIKE unless you have a plan.",
    ],
    tradeoffs: [
      "Platform encryption: easy, coarse, trusts the cloud IAM.",
      "App-level: stronger isolation, painful queries and key ops.",
      "More key splits: better blast radius, more latency on KMS.",
    ],
    interviewTips: [
      "Say 'TLS everywhere + KMS-encrypted S3/DB + field encrypt PAN' as a stack.",
      "Mention backups explicitly — that is where dumps leak.",
    ],
    pitfalls: [
      "Keys in the same repo as ciphertext.",
      "Logging decrypted payloads.",
      "Forgetting replica disks and local SSD caches.",
    ],
    practiceIdeas: [
      "Design envelope encryption for a document store with per-file DEKs.",
      "List every place a photo's bytes rest (upload tmp, S3, CDN, transcode scratch).",
    ],
    related: [
      "tls-mtls",
      "least-privilege-secrets",
      "pii-gdpr",
      "object-storage",
      "payments-wallet",
      "retention-deletion",
    ],
  },
  {
    slug: "pii-gdpr",
    track: "hld",
    category: "Security",
    title: "PII and GDPR-style privacy",
    summary:
      "Minimize personal data, know where it copies, honor deletion/export, and treat logs and analytics as in-scope — not only the user table.",
    depth: "next",
    whyItMatters:
      "Privacy is an HLD constraint like latency. If you CDC users into a lake and six caches, 'DELETE FROM users' is theater. Interviewers like a data-map and a deletion workflow.",
    theory: [
      "PII is any data that identifies a person (name, email, IP, device id, location trail). Minimize: do not collect what you do not need; tokenize; aggregate. Purpose limitation: analytics does not get raw GPS if a city-level geohash would do. Access is RBAC plus need-to-know, audited.",
      "GDPR-style rights: access (export), delete (erase), restrict, portability. Deletion is a saga across OLTP, caches, search, backups (or wait for backup expiry), lakes, and vendors. Crypto-shred if you cannot rewrite event logs. Lawful basis and retention limits should appear as TTLs, not infinite tables.",
      "Residency: keep EU personal data in-region if you promised that — multi-region is not free-for-all. Children and health have extra rules. In interviews you do not need to be a lawyer; you need a data inventory and a delete path.",
    ],
    howItWorks: [
      "Maintain a data map: systems that store user_id or PII fields.",
      "Build export and delete jobs that walk the map; make them idempotent.",
      "Define retention per table (logs 14–30d, backups 30–90d, etc.).",
      "Scrub PII from logs or hash IPs; never log tokens/passwords.",
      "Gate warehouse access; tokenize join keys.",
    ],
    whenToUse: [
      "Any consumer or employee personal data — assume regulation applies.",
      "Analytics and ML features that love raw identifiers.",
      "Support tools that impersonate or view users.",
    ],
    whenNotToUse: [
      "Do not claim 'we are not in Europe' as a design for a global app.",
      "Do not delete the user row and leave email in the email vendor forever.",
    ],
    tradeoffs: [
      "More copies for product (search, recs): better UX, harder erasure.",
      "Short retention: easier compliance, worse debugging and ML.",
      "Crypto-shred: practical on logs, you lose forensic detail.",
    ],
    interviewTips: [
      "When you add CDC and lakes, add 'delete fan-out' in the same breath.",
      "For chat/Dropbox, mention export and that backups expire.",
    ],
    pitfalls: [
      "User id in URLs and screenshots as if it were secret, but also email in logs.",
      "Infinite 'deleted_at' soft delete with no hard-delete job.",
      "ML training sets that are immortal copies.",
    ],
    practiceIdeas: [
      "Write a deletion saga for a social app: SQL, Redis, ES, S3, warehouse, ESP.",
      "Design a warehouse that can join activity without storing raw email.",
    ],
    related: [
      "retention-deletion",
      "encryption",
      "audit-logs",
      "cdc",
      "multi-tenant",
      "oltp-vs-olap",
    ],
  },
  {
    slug: "ddos-waf",
    track: "hld",
    category: "Security",
    title: "DDoS protection and WAF",
    summary:
      "Absorb or drop volumetric floods at the edge, and filter application abuse (injection, bots, scrapers) before it hits origin CPU.",
    depth: "next",
    whyItMatters:
      "Public designs get asked 'what if you get hugged to death.' The answer is layers: anycast/CDN, L3/L4 scrubbing, WAF/bot rules, and app rate limits. You cannot out-scale a 1 Tbps flood from your VPC.",
    theory: [
      "Volumetric DDoS (SYN, UDP, amplification) is won at the ISP/CDN anycast layer with far more capacity than you run. Cloud LBs and Shield-like products absorb a lot. You still need to not be a cheap amplifier yourself. DNS is a target — use a resilient provider.",
      "Application-layer attacks look like users: expensive search, credential stuffing, scraping. A WAF (ModSecurity, cloud WAF) blocks known payloads and some bots. It is not perfect and will false-positive. Combine with rate limits, CAPTCHA/risk scores on login, and cache so origin is cheap. Bot management is an arms race; signed mobile attestations help a bit.",
      "Internal abuse (one tenant) is rate limits and quotas, not a WAF. Do not rely on IP blocklists as the only control (CGNAT). Fail-open vs fail-closed on WAF outage is a product choice — usually fail-open for availability with extra rate limits.",
    ],
    howItWorks: [
      "Put a CDN/L7 with DDoS and WAF in front of public HTTP.",
      "Rate-limit by key at edge and app; special-case login/search.",
      "Cache public GETs so origin is shielded.",
      "Keep origin IPs unpublished; only the edge talks in.",
      "Runbooks for raising limits and enabling 'under attack' modes.",
    ],
    whenToUse: [
      "Any public website or API.",
      "Launch events, ticket drops, and political/news properties.",
      "Login and password-reset endpoints (stuffing).",
    ],
    whenNotToUse: [
      "Do not WAF internal gRPC as your only authz.",
      "Do not expect WAF signatures to replace parameterized SQL and authn.",
    ],
    tradeoffs: [
      "Aggressive WAF: safer, more broken legitimate clients.",
      "Edge-only protection: origin still dies if cache-busting works.",
      "Fail-closed WAF: safer when WAF dies, you die with it.",
    ],
    interviewTips: [
      "For Ticketmaster/Twitter, mention edge absorption + queue + limits, not just more pods.",
      "Separate volumetric DDoS from application abuse in your answer.",
    ],
    pitfalls: [
      "Origin IP leaked via mail headers or a test CNAME.",
      "WAF in detection-only forever.",
      "Rate limit only at the app after an expensive JWT parse and DB hit.",
    ],
    practiceIdeas: [
      "Design a ticket-sale 'waiting room' plus WAF for a 1M-user drop.",
      "List expensive endpoints and a cheap 429 path in front of them.",
    ],
    related: [
      "rate-limiting",
      "cdn",
      "dns-anycast-geo",
      "ticketmaster",
      "api-gateway",
      "rate-limiter-system",
    ],
  },
  {
    slug: "audit-logs",
    track: "hld",
    category: "Security",
    title: "Audit logs",
    summary:
      "Append-only records of who did what to whom — for security, support, and compliance — separate from debug logs.",
    depth: "next",
    whyItMatters:
      "Money, admin, and privacy actions need a trail you can trust. Debug logs rotate in 7 days and get sampled. Audit logs are a product: complete, tamper-evident, retained, and searchable by actor and target.",
    theory: [
      "An audit event is {time, actor, action, resource, result, request_id, ip/device}. Write it in the same transaction as the action or via outbox — missing audits on success are a bug. Do not log secrets or raw PII you do not need; tokenized ids are better. Admins viewing a record is itself an auditable event (especially health/finance).",
      "Store in an append-only table or a WORM/object lock bucket. App users should not UPDATE audits. Detect tampering with hashes or by shipping a copy to a locked account. Query paths: by actor, by resource, by time. Volume can be large — partition by time, export to cold storage.",
      "This is different from observability logs (verbosity, sampling) and from the product activity feed (user-visible). You can derive a feed from audits but do not let users delete the security copy.",
    ],
    howItWorks: [
      "Instrument privileged and data-changing APIs with a standard audit helper.",
      "Persist via outbox; ship a copy off-box.",
      "RBAC who can read audits; reading audits is audited.",
      "Retain per policy; legal hold overrides deletion.",
      "Alert on anomalous admin patterns (mass export, mass delete).",
    ],
    whenToUse: [
      "Admin tools, payments, ACL changes, logins, deletes, exports.",
      "Healthcare, finance, enterprise SaaS — expected in diligence.",
      "Support: 'who changed this user's email?'",
    ],
    whenNotToUse: [
      "Do not treat debug stdout as the audit trail.",
      "Do not audit every cache hit — you will drown and leak.",
    ],
    tradeoffs: [
      "Sync audit in txn: stronger, slower writes.",
      "Async: scale, possible loss on crash unless outbox.",
      "Long retention: compliance, cost and PII surface.",
    ],
    interviewTips: [
      "For payments/Dropbox/admin, add an audit box with retention.",
      "Mention that support impersonation must be audited.",
    ],
    pitfalls: [
      "Mutable audit table with UPDATE permission for the app role.",
      "Logging authorization tokens.",
      "No index — audits exist but cannot answer an incident.",
    ],
    practiceIdeas: [
      "Schema an audit table and list 15 events for a wallet product.",
      "Design WORM export to a separate cloud account.",
    ],
    related: [
      "observability",
      "pii-gdpr",
      "payments-wallet",
      "rbac-abac",
      "outbox",
      "retention-deletion",
    ],
  },
  {
    slug: "sli-slo-sla",
    track: "hld",
    category: "Operations",
    title: "SLI, SLO, and SLA",
    summary:
      "SLIs are measurements, SLOs are internal targets, SLAs are contractual promises — plus error budgets that tell you when to slow down shipping.",
    depth: "core",
    whyItMatters:
      "Without an SLO, 'is it up?' is a feeling. HLD interviews want you to pick user-centric SLIs (not CPU) and nines that match the product. Error budgets connect reliability to product velocity.",
    theory: [
      "SLI: a quantitative measure of user happiness — success ratio, latency percentile, freshness, correctness sample. Measure at the edge or synthetically. Avoid vanity host metrics as the SLI. Good SLIs are ratios: good events / valid events.",
      "SLO: the target for an SLI over a window (30 days, 99.9% of checkouts < 400ms). Error budget is the remainder (0.1%). When you burn budget, you freeze risky deploys and fix reliability. Multiple SLOs (availability, latency, freshness) are normal; keep the set small.",
      "SLA: what you promise customers with credits if you miss. Always looser than the SLO so you have margin. Internal tools may have SLOs and no SLA. Do not advertise five nines if you deploy from laptops on Fridays without a budget.",
    ],
    howItWorks: [
      "Pick 2–3 user journeys; write SLIs as formulas.",
      "Set SLOs from history + business pain, not from a blog's nines.",
      "Alert on burn rate (fast and slow windows), not on single 5xx blips.",
      "Review monthly: if you never burn, the SLO is too loose; if you always burn, too tight or the system is bad.",
      "Put SLO class on APIs (gold checkout vs bronze recs).",
    ],
    whenToUse: [
      "Every production user-facing system.",
      "To decide multi-AZ spend vs feature work.",
      "Vendor selection (their SLA is not your SLO).",
    ],
    whenNotToUse: [
      "Do not SLA an experimental beta at 99.99%.",
      "Do not make 20 SLOs nobody can name.",
    ],
    tradeoffs: [
      "Tighter SLO: more engineering and cost, happier users (if you hit it).",
      "Loose SLO: velocity, more user pain.",
      "Many SLIs: coverage, alert noise and political fights.",
    ],
    interviewTips: [
      "Propose concrete SLOs: '99.9% < 200ms for redirects, 99.99% durability for the mapping table.'",
      "Mention error budgets when they ask how you prioritize reliability work.",
    ],
    pitfalls: [
      "SLI = CPU < 80%.",
      "Averaging away a bad region.",
      "SLA tighter than what you can measure.",
    ],
    practiceIdeas: [
      "Write SLIs for URL shortener, chat, and payments — notice they differ.",
      "Compute a 30-day 99.9% budget in minutes and in failed requests at 10k QPS.",
    ],
    related: [
      "availability-vs-reliability",
      "observability",
      "alerting-vs-dashboards",
      "percentiles",
      "capacity-planning",
      "hld-interview-method",
    ],
  },
  {
    slug: "alerting-vs-dashboards",
    track: "hld",
    category: "Operations",
    title: "Alerting vs dashboards",
    summary:
      "Alerts page a human for something they must do. Dashboards are for exploration and status. Mixing them is how you train people to ignore the pager.",
    depth: "core",
    whyItMatters:
      "Observability without this split is a wall of graphs and a noisy Slack. Interviews like 'we page on SLO burn and saturation, we debug on dashboards and traces.'",
    theory: [
      "A good alert is a symptom of user pain or imminent pain (disk will fill in 4 hours), with a runbook and an owner. Prefer burn-rate alerts on SLOs, plus a few resource alerts (queue oldest age, replica lag, cert expiry, disk). Symptoms over causes: page on checkout errors, then use dashboards to see if it was the DB or the payment vendor.",
      "Dashboards tell a story: RED for the service, USE for dependencies, business KPIs. They should be linked from the alert. High-cardinality exploration belongs in a query tool, not 80 permanent charts. On-call should have one 'is the sky falling' board and a path to traces.",
      "Noise kills reliability culture. If an alert fires and the action is 'look and close,' delete or demote it to a ticket. Night pages need a higher bar. Flapping alerts need hysteresis. ChatOps and incident timelines beat 15 overlapping pages.",
    ],
    howItWorks: [
      "Page: SLO burn (fast/slow), saturation that predicts SLO burn, paging-worthy freshness (payments stuck).",
      "Ticket/Slack: capacity trends, weekly error leftovers.",
      "Dashboard: per-service RED + the three dependencies you actually have.",
      "Every page has a runbook link and a silence path.",
      "Review alert dump weekly; prune.",
    ],
    whenToUse: [
      "Always, as soon as users exist.",
      "Before a launch — synthetics + a burn alert.",
      "After incidents — add the missing symptom alert, not ten cause alerts.",
    ],
    whenNotToUse: [
      "Do not page on every 5xx in a 1-request-per-minute admin app.",
      "Do not make a dashboard for each function name.",
    ],
    tradeoffs: [
      "More alerts: catch more, more fatigue.",
      "Symptom-only: fewer pages, longer debug if dashboards are weak.",
      "Auto-ticket vs page: respect people's sleep.",
    ],
    interviewTips: [
      "List 5 alerts for your design and say which one pages at 3am.",
      "Tie alerts to the SLOs you already wrote.",
    ],
    pitfalls: [
      "CPU alert at 70% forever.",
      "No owner — the alert goes to a dead Slack.",
      "Dashboard of 200 panels that cannot answer 'is checkout OK?'",
    ],
    practiceIdeas: [
      "Write a paging policy: what pages, what waits until morning.",
      "Design a single-pane board for a chat service with drill-down to traces.",
    ],
    related: [
      "observability",
      "sli-slo-sla",
      "metrics-pipeline",
      "health-checks",
      "dlq",
      "capacity-planning",
    ],
  },
  {
    slug: "capacity-planning",
    track: "hld",
    category: "Operations",
    title: "Capacity planning",
    summary:
      "Turn estimates and live utilization into a plan for when you add shards, boxes, and budget — before the p99 cliff.",
    depth: "next",
    whyItMatters:
      "Autoscaling is not a plan if the database cannot scale the same way. HLD should include headroom, lead time for reserved instances or shard splits, and the signal you watch (not just CPU).",
    theory: [
      "Capacity is the amount of work you can do while still hitting SLOs. You measure utilization and saturation (queue depth, pool wait, disk IO) and forecast from growth + launches + seasonality. Little's Law and back-of-envelope give the first cut; production histograms give the truth. Plan at the bottleneck: often DB connections, cache memory, or partition QPS, not app CPU.",
      "Headroom: run at 50–70% of the cliff so a node death and a launch fit. Autoscaling handles stateless diurnal patterns; stateful systems need earlier human or automated reshard. Lead times matter: new Kafka partitions, extra Postgres replicas, and GPU quotas are not instant.",
      "Load tests should hit p99 and failure injections, not only average QPS. Game-day the loss of one AZ of capacity. Document the 'we are out of space' runbook. Capacity is also dependencies (third-party rate limits).",
    ],
    howItWorks: [
      "Track utilization + saturation per bottleneck weekly.",
      "Forecast 3–6 months with marketing launches on the calendar.",
      "Set alerts before the cliff (disk 4h-to-full, shard QPS 70%).",
      "Autoscale stateless on queue depth or RPS with rate-limited scale-down.",
      "Schedule reshard/reindex as projects, not incidents.",
    ],
    whenToUse: [
      "Growing products, seasonal retail, ticket drops, viral media.",
      "Before you promise a big customer a dedicated rate.",
      "When adding a feature that multiplies fan-out.",
    ],
    whenNotToUse: [
      "Do not autoscale the app 10× when the primary is the wall.",
      "Do not plan only averages — plan the p99 key and the launch spike.",
    ],
    tradeoffs: [
      "More headroom: safer, more cost.",
      "Aggressive autoscale-down: cheaper, cold-start and herd risk.",
      "Early reshard: smoother, operational work you might not need yet.",
    ],
    interviewTips: [
      "After estimates, say 'we run at 50% so one AZ loss still holds SLO.'",
      "Name the first thing you would scale at 10× — be specific (shards, not 'the cloud').",
    ],
    pitfalls: [
      "Scaling on CPU while blocked on locks.",
      "No plan for the cache empty after a restart (thundering herd).",
      "Ignoring downstream quotas (SMS, payments).",
    ],
    practiceIdeas: [
      "Build a capacity sheet for a URL shortener from 1k to 1M QPS.",
      "Plan a Black Friday 20× spike: what autoscales, what you pre-warm.",
    ],
    related: [
      "back-of-envelope",
      "scalability",
      "cost",
      "hot-keys-partitions",
      "sli-slo-sla",
      "percentiles",
    ],
  },
  {
    slug: "cost",
    track: "hld",
    category: "Operations",
    title: "Cost as a design constraint",
    summary:
      "Egress, idle replicas, chatty APIs, and unpartitioned warehouses can dwarf EC2. Good HLD names the expensive lines and a cheaper alternative.",
    depth: "next",
    whyItMatters:
      "Senior designs mention money. A multi-region active-active Kafka plus 20 video renditions might be correct — or it might be a 10× bill for a 1.1× UX win. Interviewers like 'we put media on S3+CDN because egress from app boxes is insane.'",
    theory: [
      "Typical clouds bill compute, storage, and especially egress (to internet and across AZ/region). Managed queues and request-priced APIs (S3 GET, Lambda, API Gateway) surprise you at high QPS of tiny objects. Idle HA (the extra region, the unused green stack) is a reliability tax you should choose on purpose.",
      "Architecture cost levers: cache hit ratio, compression, fewer cross-AZ chats, batch writes, right-size retention, reserved/spot for batch, object lifecycle, and not running Kafka for 100 messages/minute. Fan-out-on-write stores N copies — that is a storage bill. Chatty microservices are an observability and network bill.",
      "Cost SLOs exist: cost per MAU, per encode minute. Put them next to latency SLOs for media and AI features. The cheapest design that misses the product SLO is still a failed design — cost is a constraint, not the only one.",
    ],
    howItWorks: [
      "Estimate the top 3 bill lines from QPS × size × regions.",
      "Prefer CDN and object storage for fat egress.",
      "Keep chatty traffic in one AZ when you can; batch the rest.",
      "TTL and lifecycle everything that can expire.",
      "Revisit multi-region and extra replicas against the reliability win.",
    ],
    whenToUse: [
      "Media, global apps, high-QPS APIs, warehouses, ML inference.",
      "When choosing managed vs self-hosted (ops time is also money).",
      "When a design forks into 'fancy' vs 'good enough.'",
    ],
    whenNotToUse: [
      "Do not cheap out on backups and encryption to save pennies on a bank ledger.",
      "Do not optimize AWS list prices for 20 minutes of a URL-shortener interview unless asked.",
    ],
    tradeoffs: [
      "Managed services: less ops salary, more unit cost and lock-in.",
      "More regions: user latency and DR, 2× data and egress.",
      "Aggressive compression/batching: cheaper, more latency/complexity.",
    ],
    interviewTips: [
      "Call out one expensive thing you avoided (video through app pods, cross-region sync likes).",
      "If they ask to cut 50% cost, drop a region, a variant, or a hot path's chattiness — be concrete.",
    ],
    pitfalls: [
      "NAT and cross-AZ data you never measured.",
      "Infinite log retention in the paid vendor.",
      "Lambda + API Gateway on a high-QPS JSON API without math.",
    ],
    practiceIdeas: [
      "Compare serving 1 PB/month of images from S3+CDN vs from EC2+EBS.",
      "Find three cost cuts in a naive microservices chat design.",
    ],
    related: [
      "capacity-planning",
      "cdn",
      "multi-az-multi-region",
      "image-video-pipelines",
      "oltp-vs-olap",
      "back-of-envelope",
    ],
  },
  {
    slug: "retention-deletion",
    track: "hld",
    category: "Operations",
    title: "Retention and deletion",
    summary:
      "How long each class of data lives, how it is deleted everywhere, and how you avoid infinite disks and immortal PII.",
    depth: "next",
    whyItMatters:
      "Every log, object, tombstone, and warehouse table needs a lifetime. Retention is cost, privacy, and sometimes law (keep invoices 7 years, delete GPS after 30 days). HLD tables should show TTL next to PK.",
    theory: [
      "Classify data: source of truth, cache, log, backup, derived index, ephemeral presence. Each class has a TTL or a legal minimum. Caches and presence should expire by default. OLTP rows need an explicit policy (soft delete then hard delete). Event logs need compaction or expiry. Warehouses need partition drops, not hope.",
      "Deletion is a distributed workflow: primary, replicas, backups (wait or crypto-shred), search, CDN purge, object versions, partner copies. Soft delete is a UX and undo feature, not compliance by itself. Tombstones in Cassandra/ES need to live long enough to propagate, then go. Legal hold freezes deletion for a case.",
      "Operational deletion: disk fill is an incident. Lifecycle rules on buckets, Kafka retention, Prometheus downsample, and log shipper buffers all belong on the diagram. Test that TTL jobs actually run.",
    ],
    howItWorks: [
      "Label TTL/retention on every store in the design.",
      "Automate expire (DB partitions, S3 lifecycle, Kafka retention).",
      "Implement user-delete as a saga with retries and a completion record.",
      "Align backup retention with privacy promises (or disclose the lag).",
      "Monitor bytes by class so a leak shows up as a bill/graph.",
    ],
    whenToUse: [
      "All systems — this is default design, not a GDPR-only add-on.",
      "High-volume logs, metrics, media, chat history, location.",
      "After a 'we will keep everything' product idea — push back with cost.",
    ],
    whenNotToUse: [
      "Do not TTL the ledger.",
      "Do not hard-delete the only copy of a legal invoice because a cache TTL felt good.",
    ],
    tradeoffs: [
      "Short retention: cheaper and more private, worse forensics and ML.",
      "Soft delete: undo and refs stay valid, storage and leak risk.",
      "Long tombstones: safer anti-entropy, more space.",
    ],
    interviewTips: [
      "Add a column 'TTL' on your tables in the interview — it is memorable.",
      "For chat, ask whether messages are forever or 1 year; it changes storage math.",
    ],
    pitfalls: [
      "S3 versioning on with no lifecycle — delete is a lie.",
      "Kafka compacted topic that still holds PII keys forever.",
      "TTL on Redis as the only delete of user photos.",
    ],
    practiceIdeas: [
      "Write a retention matrix for a chat app (messages, media, logs, backups, search).",
      "Design hard-delete for a user who has posts in a feed cache and CDN.",
    ],
    related: [
      "pii-gdpr",
      "object-storage",
      "cache-patterns",
      "oltp-vs-olap",
      "event-sourcing",
      "cost",
    ],
  },
];
