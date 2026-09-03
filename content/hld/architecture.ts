import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "monolith-vs-microservices",
    track: "hld",
    category: "Architecture",
    title: "Monolith vs modular vs microservices vs SOA",
    summary:
      "Where you draw process boundaries — one deployable, modular monolith, service-oriented, or independently deployed microservices — and what that costs in ops and data.",
    depth: "core",
    whyItMatters:
      "Junior designs explode into twenty services on slide one. Senior designs start with a modular monolith (or a few coarse services) and split when a team, scale axis, or failure domain demands it. Interviews want the criteria, not a fashion choice.",
    theory: [
      "A monolith is one deployable that handles many domains. A modular monolith is the same process with hard module boundaries and no cross-module table raids — you can extract later. SOA (service-oriented architecture) is coarser, often ESB-mediated enterprise services. Microservices are independently deployable, independently scalable units with their own data. The unit of scale and the unit of failure follow the unit of deployment.",
      "Microservices buy team autonomy, independent scale (video transcode vs billing), and isolated failures — if you have platform (CI, mesh, tracing, on-call). They cost distributed transactions, versioned APIs, and 'who owns this user join?' A distributed monolith (eight repos, one database, lockstep deploys) is the worst of both worlds.",
      "Split along change rate, data ownership, and scale axes — not along every noun. Payments, notifications, and media pipelines are common first extracts. User profile + settings can stay together for years. SOA's reusable 'customer service' can become a bottleneck team; prefer product-aligned services with clear APIs.",
    ],
    howItWorks: [
      "Start modular: packages/modules with their own tables and public functions.",
      "Extract a service when it needs different scale, language, or team cadence — and take its data with it.",
      "Define APIs and events first; no shared DB across extractees.",
      "Add platform as you split: gateway, tracing, CI, on-call, SLOs.",
      "Keep a thin BFF or gateway so clients do not depend on every internal name.",
    ],
    whenToUse: [
      "Monolith/modular: small teams, unclear domains, early products.",
      "Microservices: multiple teams, distinct scale or compliance boundaries.",
      "SOA-style coarse services: enterprise integration with many consumers.",
    ],
    whenNotToUse: [
      "Do not start a two-engineer product as twelve repos.",
      "Do not split services that still share one Postgres and one transaction.",
    ],
    tradeoffs: [
      "Monolith: simple txns and debug, coupled scale and release risk.",
      "Microservices: independent scale and deploys, network + data consistency tax.",
      "Modular monolith: most of the design benefit, fewer ops until you must split.",
    ],
    interviewTips: [
      "Say 'modular monolith first; extract X because of scale/team' — that is a senior line.",
      "If they insist on microservices, show data ownership and a saga for the cross-service write.",
    ],
    pitfalls: [
      "Chatty sync calls that recreate in-process function calls over HTTP.",
      "Shared database 'just for now' that lasts forever.",
      "A microservice per database table.",
    ],
    practiceIdeas: [
      "Take a monolith e-commerce and propose three extract candidates with data ownership.",
      "Draw the same product as modular monolith vs five services and list the extra failure modes.",
    ],
    related: [
      "sync-vs-async-apis",
      "sagas",
      "service-discovery",
      "cqrs",
      "service-mesh",
      "hld-interview-method",
    ],
  },
  {
    slug: "sync-vs-async-apis",
    track: "hld",
    category: "Architecture",
    title: "Synchronous vs asynchronous APIs",
    summary:
      "Wait for the answer now (request/response) versus accept work and finish later (jobs, events, 202 Accepted).",
    depth: "core",
    whyItMatters:
      "The biggest latency and reliability lever in HLD is 'does the user wait for this?' Email, transcode, fan-out, and partner calls should almost never sit on the request thread. Interviews listen for 202 + poll/webhook versus a 30s HTTP.",
    theory: [
      "Synchronous APIs couple caller and callee in time: HTTP/gRPC request, response, error. They are simple, cacheable, and right for reads and fast writes (under your p99 budget). They fail together: if B is down, A is down unless you add timeouts and fallbacks. Fan-out of sync calls is how pages get 2s p99.",
      "Asynchronous APIs decouple: enqueue, return 202 with a job id, notify later (webhook, push, email). The user-facing contract becomes 'accepted' plus a status resource. This is how you absorb spikes, retry safely, and run multi-step sagas. The cost is UX (pending states), observability (trace across the queue), and at-least-once handlers.",
      "Hybrid is normal: sync validate + persist, async notify and project. GraphQL/REST can still kick a job. Do not hide a 2-minute workflow behind a sync gateway timeout. Conversely, do not make 'get user by id' async — that is ceremony.",
    ],
    howItWorks: [
      "If p99 work > ~200–500ms or calls a flaky partner, make it async.",
      "Return 202 + Location/status; or an optimistic UI with a pending row.",
      "Put the work on a queue/stream with idempotency keys.",
      "Complete via poll, websocket, or webhook — pick based on client type.",
      "Keep a sync path for the invariant (reserve stock) and async for the side effects.",
    ],
    whenToUse: [
      "Sync: reads, login, small CRUD, anything in the latency budget.",
      "Async: media, feeds, notifications, reports, webhooks out, ML.",
      "Sync reserve + async pay/capture in checkout.",
    ],
    whenNotToUse: [
      "Do not block HTTP on sending 1M fan-out writes.",
      "Do not async a uniqueness check the UI needs before the next click unless you handle conflicts.",
    ],
    tradeoffs: [
      "Sync: simple UX and errors, tight coupling and tail latency.",
      "Async: scale and retries, eventual UX and more states to design.",
      "Long-poll/WS status: nicer UX than email, more connection state.",
    ],
    interviewTips: [
      "For each write, say sync or async and what the user sees on timeout.",
      "Mention idempotency on both the HTTP accept and the worker.",
    ],
    pitfalls: [
      "Gateway timeout 60s wrapping a 90s transcode.",
      "Fire-and-forget with no status and no DLQ.",
      "Calling the pattern 'event-driven' while still waiting on five RPCs.",
    ],
    practiceIdeas: [
      "Redesign 'share to followers' from sync HTTP to 202 + worker; list new failure states.",
      "Pick five Instagram actions and label sync vs async.",
    ],
    related: [
      "queues-pubsub-streams",
      "webhooks-vs-polling",
      "sagas",
      "rest-graphql-grpc",
      "long-poll-ws-sse",
      "notifications",
    ],
  },
  {
    slug: "rest-graphql-grpc",
    track: "hld",
    category: "Architecture",
    title: "REST, GraphQL, gRPC, WebSockets, and SSE",
    summary:
      "Pick a contract style: resource HTTP, client-shaped queries, binary RPC, or a long-lived stream — each with a different chattiness and caching story.",
    depth: "core",
    whyItMatters:
      "Protocol choice is an HLD decision, not a framework default. Mobile chat vs public CRUD vs internal mesh vs live prices all want different shapes. You should know cacheability, streaming, and codegen — and when mixing is correct.",
    theory: [
      "REST (HTTP + resources) maps verbs to documents. It caches at CDN/browser (GET), uses standard status codes, and is easy for partners. Chatty pages (N resources) need aggregation or the client pays RTT. Versioning (URL or headers) is a social problem as much as a technical one.",
      "GraphQL lets the client ask for a graph in one round trip. Great for mobile and many UI variants; weak at HTTP caching, easy to create expensive queries (deep nests, N+1 resolvers). You need persisted queries, depth limits, and a DataLoader-like batch. Subscriptions are a GraphQL skin on WS/SSE.",
      "gRPC is HTTP/2 (or HTTP/3) + protobuf: codegen, strict contracts, streaming, low overhead — the default for service-to-service. Browsers need grpc-web or a gateway. WebSockets are a bidirectional pipe after HTTP upgrade — chat, games, collaborative cursors. SSE is one-way server→client over HTTP — simpler through proxies, auto-reconnect, good for notifications and live comments. Long poll is the ugly portable fallback.",
    ],
    howItWorks: [
      "Public CRUD and partner APIs: REST with pagination and idempotency keys.",
      "Complex mobile screens: GraphQL or a BFF that aggregates REST.",
      "Internal sync: gRPC with deadlines and retries on idempotent RPCs.",
      "Live duplex: WebSockets behind an LB that supports idle timeouts + pubsub.",
      "Live one-way: SSE or WS; document fallback to poll.",
    ],
    whenToUse: [
      "REST for resources you can name and cache.",
      "gRPC for internal throughput and streaming uploads/downloads.",
      "WS/SSE for presence, chat, prices, live comments.",
    ],
    whenNotToUse: [
      "Do not expose raw gRPC to third-party browsers.",
      "Do not use GraphQL as a pass-through to unbounded SQL.",
      "Do not hold WS on a sticky box without a fan-out bus.",
    ],
    tradeoffs: [
      "REST: cache and ops simplicity, chattiness.",
      "GraphQL: one request, harder cache/authz/cost control.",
      "gRPC: performance and types, poorer ad-hoc debug than curl JSON.",
      "WS vs SSE: duplex vs simple one-way and proxy friendliness.",
    ],
    interviewTips: [
      "Pick REST for URL shortener; gRPC internal; WS for chat — show you can mix.",
      "Mention pagination, filtering, and rate limits as part of the API, not afterthoughts.",
    ],
    pitfalls: [
      "Unbounded GraphQL queries as a public DoS.",
      "REST N+1 from the mobile client on a slow network.",
      "Forgetting WS auth on upgrade and authz on each event.",
    ],
    practiceIdeas: [
      "Design the same newsfeed as REST vs GraphQL and compare round trips.",
      "Write when you would pick SSE over WS for live comments.",
    ],
    related: [
      "sync-vs-async-apis",
      "long-poll-ws-sse",
      "api-gateway",
      "chat",
      "live-comments",
      "service-mesh",
    ],
  },
  {
    slug: "service-discovery",
    track: "hld",
    category: "Architecture",
    title: "Service discovery",
    summary:
      "How clients find healthy instances as IPs change — DNS, registries, and mesh endpoints — without hardcoding boxes.",
    depth: "next",
    whyItMatters:
      "Horizontal scale implies churn. If you skip discovery you get stale IPs, split traffic during deploys, and heroic config files. In the cloud the LB often is discovery; in a mesh or on-prem you must say the registry name.",
    theory: [
      "Client-side discovery: the client queries a registry (Consul, etcd, Eureka, Kubernetes endpoints) and load-balances itself. Server-side: the client calls a logical name (DNS, mesh, ELB) and the infrastructure picks a target. Kubernetes Services + kube-proxy/IPVS/CoreDNS are server-side. gRPC often does client-side with a resolver.",
      "The hard parts are freshness and health. A registry that lists dead pods is worse than DNS. Combine registration heartbeats with LB health checks. DNS TTL again: too high and you hammer drained pods; too low and you flood CoreDNS. Service meshes move discovery into the sidecar so apps use stable local ports.",
      "Do not confuse discovery with config: feature flags and credentials are not A records. Do not use the discovery store as a general database. Multi-cluster discovery (global load balancing) is a second problem on top of in-cluster names.",
    ],
    howItWorks: [
      "Give every service a stable DNS name; never ship instance IPs in app config.",
      "Register on start, deregister on SIGTERM after drain.",
      "Prefer platform primitives (K8s Service, cloud LB) unless you need custom client policies.",
      "If client-side, cache endpoints and watch, do not poll every request.",
      "Trace and metric the resolver so 'no instances' is visible.",
    ],
    whenToUse: [
      "Any microservice or worker fleet with rolling deploys.",
      "gRPC client-side LB with locality (same-AZ first).",
      "Consul/etcd when you are not on Kubernetes.",
    ],
    whenNotToUse: [
      "A single-node app — a config host is enough.",
      "Putting per-request user data in Consul because it is 'the registry.'",
    ],
    tradeoffs: [
      "DNS + LB: simple, coarser control, TTL lag.",
      "Client-side registry: smarter LB (least-request, hedging), more library complexity.",
      "Mesh: uniform policy, extra hop and platform dependency.",
    ],
    interviewTips: [
      "On AWS/K8s drawings, say 'Service/ALB is discovery; we drain on deploy.'",
      "If you mention etcd/Consul, keep it for names and leadership, not payloads.",
    ],
    pitfalls: [
      "Stale client caches after a scale-in.",
      "Health = process up, while the DB pool is exhausted.",
      "Cross-cluster calls via public IPs by accident.",
    ],
    practiceIdeas: [
      "Compare kube DNS vs gRPC resolver vs Envoy EDS for the same service.",
      "Design deregister + drain so in-flight RPCs finish.",
    ],
    related: [
      "load-balancers",
      "service-mesh",
      "health-checks",
      "consensus-raft-paxos",
      "dns-anycast-geo",
      "stateless-sticky-sessions",
    ],
  },
  {
    slug: "stateless-sticky-sessions",
    track: "hld",
    category: "Architecture",
    title: "Stateless services and sticky sessions",
    summary:
      "Keep request-handling boxes disposable. If you need affinity, know why — and what you will do when that box dies.",
    depth: "core",
    whyItMatters:
      "Horizontal scale only works if any replica can handle the next request. Sticky sessions paper over in-memory user state and then fail at deploy time. Interviews want Redis (or a JWT) for sessions and a clear exception list (WS, upload chunks).",
    theory: [
      "A stateless app process holds no unique user data: sessions live in Redis/DB, files in object storage, caches are shared or discardable. Any instance can die. Autoscaling and rolling deploys become boring. This is the default target for HTTP APIs.",
      "Sticky sessions (cookie or IP affinity) pin a user to an instance. They exist because of in-memory sessions, local upload temp files, or WebSocket processes that own a connection. Affinity is a cache hint, not a durability plan. When the instance dies, users log out or reconnect. At scale, stickiness creates hot instances (one enterprise NAT, one whale).",
      "Exceptions you can defend: (1) connection-oriented protocols where the socket is the state — then store routing (conn id → node) in Redis and fan-out via pubsub; (2) consistent-hash caches where stickiness raises hit rate — still must miss-and-fill; (3) short-lived upload to local disk then promote to S3. Do not defend 'we stuck because the monolith used HttpSession.'",
    ],
    howItWorks: [
      "Move session and CSRF tokens to a shared store; keep apps empty.",
      "Store uploads and exports in object storage, not /tmp on one pod.",
      "For WS, accept stickiness of the socket plus a bus for cross-instance fan-out.",
      "If the LB must hash, hash on a stable id and plan rebalance on scale.",
      "On deploy, drain: stop new stickies, wait, then kill.",
    ],
    whenToUse: [
      "Stateless: almost all HTTP APIs and workers.",
      "Sticky: live connections, or a temporary migration off in-memory sessions.",
      "Consistent-hash affinity for cache nodes, not for user login state.",
    ],
    whenNotToUse: [
      "Do not scale a sticky-session monolith to 50 nodes and call it cloud-native.",
      "Do not pin payment flows to one box as a 'consistency' hack.",
    ],
    tradeoffs: [
      "Shared session store: extra hop, you can drain and scale.",
      "Sticky memory: zero extra hop, painful deploys and hot nodes.",
      "JWT-only session: no lookup, harder revoke.",
    ],
    interviewTips: [
      "Say 'stateless app + Redis session + S3 files' as the default three-liner.",
      "If they push WS, draw pubsub so two users on two boxes still chat.",
    ],
    pitfalls: [
      "Local disk as the source of truth.",
      "IP stickiness behind CGNAT — a whole city on one pod.",
      "Session store without TTL — Redis as a landfill.",
    ],
    practiceIdeas: [
      "Migrate an in-memory cart to Redis and list what deploys become safe.",
      "Design WS routing: sticky LB vs any node + Redis pubsub.",
    ],
    related: [
      "load-balancers",
      "auth-sessions-jwt",
      "chat",
      "consistent-hashing",
      "chunked-resumable-upload",
      "service-discovery",
    ],
  },
  {
    slug: "service-mesh",
    track: "hld",
    category: "Architecture",
    title: "Service mesh (concept)",
    summary:
      "Sidecars or a shared proxy layer that give you mTLS, retries, discovery, and telemetry without rewriting every app.",
    depth: "advanced",
    whyItMatters:
      "Meshes show up when the interviewer asks how 80 services get consistent timeouts and identity. You should explain the data plane vs control plane and not promise a mesh as a substitute for good APIs.",
    theory: [
      "A service mesh splits a data plane (Envoy sidecars, or per-node proxies, or incoming eBPF) from a control plane (Istio, Linkerd, Consul) that pushes certs, routes, and policies. Apps talk to localhost; the proxy does mTLS, least-request LB, retries, timeouts, and emits metrics/traces. You buy uniformity.",
      "Cost: extra hop (or extra CPU with sidecarless), complexity, and a new failure domain (control plane push). Meshes shine after you already have many services. They do not fix a shared database or a bad domain split. Ambient/sidecarless modes reduce resource tax; the concept stays: policy and identity outside the business code.",
      "Overlap with API gateways: gateway is north-south (clients in); mesh is east-west (service to service). You often want both. Do not double-retry at mesh and in-app. Pick one place for the default retry policy.",
    ],
    howItWorks: [
      "Deploy proxies; issue workload identities; default deny + allow by identity.",
      "Set timeouts, retries (idempotent only), and outlier ejection as mesh policy.",
      "Export golden metrics from the proxy so every service has RED without custom code.",
      "Use traffic shifting (10% canary) at the mesh or gateway, not in app ifs.",
      "Keep app-level retries off unless they know something the mesh does not.",
    ],
    whenToUse: [
      "Many services, many languages, need for mTLS and uniform telemetry.",
      "Canaries and locality-aware LB across a large fleet.",
      "Zero-trust-ish intra-cluster networking.",
    ],
    whenNotToUse: [
      "A modular monolith or three services — start with a library and a gateway.",
      "As a rewrite strategy for a ball-of-mud domain model.",
    ],
    tradeoffs: [
      "Uniform security/telemetry vs platform cost and latency.",
      "Sidecar: isolation and features; CPU/RAM per pod.",
      "Mesh retries: better tails, duplicate-risk if apps are not idempotent.",
    ],
    interviewTips: [
      "Describe mesh in two sentences, then say you would not start there for a URL shortener.",
      "If the prompt is 50 microservices, mention mesh mTLS + tracing as the ops story.",
    ],
    pitfalls: [
      "Retry storms from mesh + app + LB all retrying.",
      "Control plane outage freezing config (understand fail-open vs fail-closed).",
      "Treating the mesh as business orchestration (that is a workflow engine).",
    ],
    practiceIdeas: [
      "List policies you would move from app code to mesh for a 20-service shop.",
      "Compare sidecar vs gateway-only vs library for mTLS.",
    ],
    related: [
      "tls-mtls",
      "service-discovery",
      "load-balancers",
      "bulkhead-circuit-breaker",
      "observability",
      "monolith-vs-microservices",
    ],
  },
  {
    slug: "multi-tenant",
    track: "hld",
    category: "Architecture",
    title: "Multi-tenant: silo vs pooled",
    summary:
      "Silo gives each tenant their own stack. Pooled shares infrastructure with tenant keys everywhere. Most SaaS is pooled with silo for whales or compliance.",
    depth: "next",
    whyItMatters:
      "Tenant isolation is a security, noisy-neighbor, and cost problem. Designs that forget tenant_id leak data. Designs that silo everyone cannot afford the product. Interviews expect a hybrid and a shard-by-tenant story.",
    theory: [
      "Silo (dedicated): separate DB, sometimes separate cluster or even region, per tenant. Isolation and compliance (data residency, noisy neighbor) are excellent. Cost and ops scale with tenant count. Used for enterprise tiers and regulated customers.",
      "Pooled (shared): one fleet, tenant_id on every row, object prefix, and metric. Cheap and simple to ship. Risks: IDOR, one tenant's query plan ruining the DB, one tenant's volume hitting a hot shard, and backup/restore that cannot delete one customer cleanly. Row-level security, quotas, and per-tenant rate limits are mandatory.",
      "Hybrid: pool the many, silo the few (or silo only the database). Shard by tenant_id so a whale is movable to a dedicated shard. Bridge-model schemas (shared app, separate schemas) sit in the middle. GDPR deletion is easier if you can drop a silo or a partition than if you scrub a billion-row heap.",
    ],
    howItWorks: [
      "Put tenant_id in the primary key or as a mandatory filter (RLS).",
      "Authorize every request against the tenant in the token, not the URL alone.",
      "Quota CPU, QPS, storage, and expensive APIs per tenant.",
      "Plan a move path: export/import or live replication off a pooled shard onto a silo.",
      "Encrypt and backup with tenant-aware restore and deletion.",
    ],
    whenToUse: [
      "Pooled: standard SaaS, consumer apps with 'accounts.'",
      "Silo: enterprise, residency laws, extreme noisy-neighbor risk.",
      "Hybrid as soon as you have a power-law tenant size.",
    ],
    whenNotToUse: [
      "Do not silo thousands of tiny tenants on thousands of Postgres instances on day one.",
      "Do not pool healthcare records without RLS, audit, and a deletion story.",
    ],
    tradeoffs: [
      "Pooled: cost and velocity, isolation engineering.",
      "Silo: isolation and custom versions, ops and idle capacity.",
      "Shard-by-tenant: clean placement, cross-tenant analytics gets harder.",
    ],
    interviewTips: [
      "Say pooled + tenant_id + quotas, with silo as an enterprise SKU.",
      "Call out the whale tenant as a hot-key/partition problem.",
    ],
    pitfalls: [
      "Missing tenant filter on a new endpoint (IDOR).",
      "Global unique indexes that should have been unique-per-tenant.",
      "One tenant's report job locking shared tables.",
    ],
    practiceIdeas: [
      "Design a billing SaaS: pooled schema, per-tenant keys, and a silo migration for a bank.",
      "Write the deletion plan for GDPR in pooled vs silo.",
    ],
    related: [
      "rbac-abac",
      "sharding",
      "hot-keys-partitions",
      "pii-gdpr",
      "rate-limiting",
      "retention-deletion",
    ],
  },
];
