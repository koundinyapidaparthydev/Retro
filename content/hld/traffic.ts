import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "dns-anycast-geo",
    track: "hld",
    category: "Traffic",
    title: "DNS, anycast, and geo-DNS",
    summary:
      "How a name becomes an IP — and how you steer users to a nearby healthy edge before they ever hit your load balancer.",
    depth: "core",
    whyItMatters:
      "Every public design starts with 'the user types a URL.' DNS TTL, geo routing, and anycast decide latency and failover more than your first app box. Get TTL wrong and your 5-minute RTO becomes an hour.",
    theory: [
      "DNS resolves names through recursive resolvers to authoritative servers. You control A/AAAA/CNAME/NS records and TTL. Low TTL (30–60s) makes failover faster and increases query load; high TTL (hours) is cheap and sticky after a bad deploy or region death. Clients and ISPs may ignore TTL. You rarely point users at a single VM — you point them at a load balancer or anycast VIP.",
      "Geo-DNS (latency or location routing) answers different IPs by resolver geography or health checks (Route 53, NS1, Cloudflare). It is approximate: the resolver is not always the user (centralized DNS, VPNs). It is still the usual way to pick a region. Weighted and failover records handle canaries and active-passive DR.",
      "Anycast announces the same IP from many PoPs via BGP. The network delivers the packet to a nearby announcement. Great for DDoS absorption and UDP/TCP services like DNS and CDNs. Failover is 'withdraw the route,' which is faster than DNS but depends on BGP convergence and can flap. Anycast is not application-aware: a PoP can be close on the map and sick on the app. Combine with health-checked DNS or Anycast + local LBs.",
    ],
    howItWorks: [
      "Put a stable name (api.example.com) on a managed DNS with health checks.",
      "Route users to a regional LB or CDN anycast IP, not to instance IPs.",
      "Set TTL against RTO: DR in 5 minutes cannot use a 1-hour TTL alone.",
      "Use geo or latency routing for multi-region; failover records for active-passive.",
      "Keep a second DNS provider or at least dual-registrar hygiene for the catastrophic case.",
    ],
    whenToUse: [
      "All public and most private services (internal DNS still matters for discovery).",
      "Multi-region entry: geo-DNS or anycast edge.",
      "Blue-green at the region level with weighted records.",
    ],
    whenNotToUse: [
      "Do not rely on DNS-only failover for a 30-second RTO.",
      "Do not geo-steer writes to two regions without a data model for that.",
    ],
    tradeoffs: [
      "Low TTL: faster cutover, more DNS QPS and cache-miss latency.",
      "Anycast: fast PoP failover, less control than app-level session affinity.",
      "Geo-DNS: simple multi-region, wrong PoP for VPN/resolver users.",
    ],
    interviewTips: [
      "Draw DNS → CDN/LB as the first two boxes; mention TTL when you talk DR.",
      "If they ask 'how do EU users get EU data,' start with geo-DNS plus a region-pinned store.",
    ],
    pitfalls: [
      "CNAME chains and extra lookups on the mobile critical path.",
      "Forgetting IPv6 (AAAA) so half the world takes a different path.",
      "Health checks that only ping ICMP while HTTPS is down.",
    ],
    practiceIdeas: [
      "Design active-passive failover with TTL 60s vs anycast withdraw; compare RTO.",
      "Explain why a user in India hitting a US resolver might land in us-east.",
    ],
    related: [
      "cdn",
      "load-balancers",
      "multi-az-multi-region",
      "fault-tolerance-dr",
      "ddos-waf",
      "service-discovery",
    ],
  },
  {
    slug: "cdn",
    track: "hld",
    category: "Traffic",
    title: "Content delivery networks",
    summary:
      "Edge caches that serve static and cacheable HTTP close to users, shield origin, and often terminate TLS.",
    depth: "core",
    whyItMatters:
      "Images, JS, video segments, and even public API GETs are cheaper and faster at the edge than in your region. A design that puts every byte on the origin will fail the bandwidth estimate. CDNs also change consistency — invalidation is the hard part.",
    theory: [
      "A CDN is a globally distributed cache plus a control plane. The user hits a nearby PoP (anycast or geo-DNS). On miss, the PoP fetches from origin (or a regional shield) and stores the object per Cache-Control, Surrogate-Control, and your purge API. Hit ratio depends on popularity, object size, and how unique the URL is (query strings, cookies, auth).",
      "Use CDNs for immutable versioned assets (app.abc123.js — long TTL), user media (with signed URLs), and some API responses (public, low personalization). Do not put private per-user HTML on a shared cache without Vary and auth. Modern CDNs add WAF, bot management, image resize, and edge compute — useful, but origin still owns consistency and writes.",
      "Shielding (collapse origin fetches through a mid-tier) protects you from herds. Purging by URL or surrogate key is how you update. If you cannot purge quickly, version the URL. For video, the CDN holds chunks; the origin holds the master and DRM licenses.",
    ],
    howItWorks: [
      "Separate static hostnames (cdn.example.com) from uncacheable APIs.",
      "Version assets; set long TTL; purge or short-TTL only when you must.",
      "Use signed URLs/cookies for private objects; never a world-readable S3 listing.",
      "Put an origin shield or request coalescing in front of object storage.",
      "Watch hit ratio, origin QPS, and time-to-first-byte by PoP.",
    ],
    whenToUse: [
      "Any user-generated media, static sites, software downloads, HLS/DASH video.",
      "Public, slowly changing API GETs (configs, catalogs) with explicit TTL.",
      "DDoS absorption at L3/L7 before your VPC.",
    ],
    whenNotToUse: [
      "Personalized, authenticated HTML that you cannot Vary correctly.",
      "Tiny, always-unique responses where the extra hop does not pay.",
    ],
    tradeoffs: [
      "Long TTL: cheap and fast, stale until purge/version.",
      "Edge logic: less origin load, harder debugging and vendor lock-in.",
      "More PoPs: better latency, more purge fan-out.",
    ],
    interviewTips: [
      "After storage math for images, say 'S3 + CDN, not the API boxes.'",
      "Mention cache key (host+path+query) and why unversioned ?v=time destroys hit rate.",
    ],
    pitfalls: [
      "Caching Set-Cookie or Authorization responses.",
      "Purge-all on every deploy.",
      "Origin in one region with no shield — every global miss slams one bucket.",
    ],
    practiceIdeas: [
      "Design Instagram photo delivery: object key, TTL, signed URL, invalidation on delete.",
      "Compare versioned assets vs purge for a SPA deploy.",
    ],
    related: [
      "cdn-origin",
      "object-storage",
      "dns-anycast-geo",
      "image-video-pipelines",
      "youtube",
      "ddos-waf",
    ],
  },
  {
    slug: "load-balancers",
    track: "hld",
    category: "Traffic",
    title: "Load balancers: L4 vs L7",
    summary:
      "L4 (TCP/UDP) sprays connections. L7 (HTTP/gRPC) understands methods, paths, headers, and can do routing, auth hooks, and graceful drains.",
    depth: "core",
    whyItMatters:
      "You always draw a box in front of N app instances. The layer you pick changes TLS termination, sticky sessions, health checks, and whether you can route /video to a different fleet. Interviews use L4 vs L7 to test whether you know the packet vs the request.",
    theory: [
      "L4 load balancing (NLB, IPVS, Maglev) maps 5-tuples to backends. It is fast, protocol-agnostic, and good for TLS passthrough, gaming, and millions of connections. It cannot route on URL. Connection draining is 'stop new tuples, wait for close.' Health checks are TCP or a shallow HTTP if the product adds it.",
      "L7 (ALB, Envoy, nginx, HAProxy HTTP mode) terminates TCP/TLS and parses HTTP/2 or gRPC. It routes on host/path/header, does canaries, WAF hooks, rate limits, and header-based stickiness. It sees retries and status codes. Cost is CPU (crypto + parsing) and it is a place to accidentally buffer huge bodies. gRPC and HTTP/2 multiplexing make connection-level L4 balancing uneven — L7 or least-request is kinder.",
      "Placement: public LB in multiple AZs, then optional internal LBs between tiers. Consistent hashing at L4/L7 helps caches and long-lived streams. The LB is a failure domain — run at least two, automate certs, and do not store state that you cannot lose.",
    ],
    howItWorks: [
      "Put a multi-AZ L7 LB in front of stateless HTTP APIs; L4 for raw TCP or TLS passthrough.",
      "Health-check a real dependency path; drain on deploy.",
      "Choose algorithm: round-robin, least-request, or consistent hash.",
      "Terminate TLS at the LB or mesh; use mTLS internally if you need identity.",
      "Export LB metrics: 5xx, target 5xx, p99, surge queue, unhealthy hosts.",
    ],
    whenToUse: [
      "Any horizontally scaled app or gateway.",
      "L7: HTTP routing, canaries, header-based experiments.",
      "L4: extreme connection count, non-HTTP, or TLS to the app.",
    ],
    whenNotToUse: [
      "Do not use cookie stickiness as a substitute for a shared session store.",
      "Do not put a single nginx VM in one AZ and call it HA.",
    ],
    tradeoffs: [
      "L4: speed and simplicity, dumb routing.",
      "L7: smart routing and observability, more CPU and HTTP-specific failure modes.",
      "TLS at LB: cheaper apps, LB sees plaintext; TLS to app: more hop cost, better end-to-end.",
    ],
    interviewTips: [
      "Say L7 in front of APIs and mention least-request + health checks.",
      "If you have WebSockets, mention idle timeouts and sticky or a shared pubsub.",
    ],
    pitfalls: [
      "HTTP/2 to one hot backend because L4 hashed the single connection.",
      "Health check / that always 200s while /ready is failing.",
      "Buffering request bodies in the LB until RAM dies.",
    ],
    practiceIdeas: [
      "Sketch blue-green at L7 with two target groups and a weighted shift.",
      "Explain Maglev/consistent hash for a cache fleet vs round-robin for stateless APIs.",
    ],
    related: [
      "api-gateway",
      "stateless-sticky-sessions",
      "tls-mtls",
      "blue-green-canary",
      "service-mesh",
      "health-checks",
    ],
  },
  {
    slug: "api-gateway",
    track: "hld",
    category: "Traffic",
    title: "API gateway and reverse proxy",
    summary:
      "The HTTP front door: routing, authn, rate limits, TLS, and request shaping so every microservice does not reinvent the edge.",
    depth: "core",
    whyItMatters:
      "Gateways are how you present one public API over many services. They are also a bottleneck and a single place to get auth wrong. Know what belongs at the edge versus in the service, and how a reverse proxy differs from a full API management product.",
    theory: [
      "A reverse proxy (nginx, Envoy, Caddy) sits in front of origins: TLS, gzip, static files, path routing, and buffering. An API gateway adds product features: API keys, OAuth/JWT validation, per-consumer quotas, request/response transform, fan-out aggregation, developer portal, and billing hooks. The line is blurry — Kong, Apigee, AWS API Gateway, and a homemade BFF all live on this spectrum.",
      "Put cross-cutting, cheap, and security-sensitive checks at the gateway: TLS, WAF, coarse rate limits, JWT signature and expiry, correlation IDs. Leave fine-grained authorization, domain validation, and transactions in the service — the gateway should not become a second monolith that deploys every field change. GraphQL or BFF gateways aggregate for mobile; they need their own caching and timeout story.",
      "Failure mode: the gateway is on the path of everything. Scale it like a stateless L7 fleet, store config in a control plane, and do not hold WebSocket state only in one process. Timeouts at the gateway must be consistent with backends or you get retry storms.",
    ],
    howItWorks: [
      "Terminate TLS, attach request_id, authenticate, then route by path or host.",
      "Apply consumer quotas and IP/WAF rules before hitting app CPU.",
      "Use a BFF or aggregation layer when mobile would otherwise chat 15 APIs.",
      "Keep gateway config declarative (routes, JWT issuer, limits) and versioned.",
      "Separate public gateway from internal service-to-service mesh/proxy.",
    ],
    whenToUse: [
      "Public APIs, partner integrations, and many microservices behind one hostname.",
      "When you need a single place for keys, quotas, and audit of the edge.",
      "Mobile/web BFF to reduce chattiness.",
    ],
    whenNotToUse: [
      "A single small app — a load balancer plus the service is enough.",
      "Business workflows encoded as gateway Lua/scripts that nobody can test.",
    ],
    tradeoffs: [
      "Central gateway: consistent security, shared fate and release coupling.",
      "Per-team gateways: autonomy, inconsistent auth and extra hops.",
      "Heavy aggregation at the edge: faster clients, harder caching and failure partials.",
    ],
    interviewTips: [
      "Draw gateway with auth + rate limit; say what it does not do (SQL, inventory).",
      "For public API platform designs, the gateway is a first-class product, not nginx-by-habit.",
    ],
    pitfalls: [
      "JWT validation without issuer/audience/clock-skew checks.",
      "Gateway timeouts longer than clients, shorter than backends — silent retries.",
      "Storing sessions in gateway memory.",
    ],
    practiceIdeas: [
      "List 10 concerns and put each in gateway vs service vs mesh.",
      "Design a partner API with keys, per-key limits, and a developer-facing 429 body.",
    ],
    related: [
      "load-balancers",
      "rate-limiting",
      "auth-sessions-jwt",
      "tls-mtls",
      "public-api-platform",
      "service-mesh",
    ],
  },
  {
    slug: "tls-mtls",
    track: "hld",
    category: "Traffic",
    title: "TLS and mTLS",
    summary:
      "Encrypt in transit, authenticate the server (and optionally the client) with certificates — including where you terminate and how identity moves east-west.",
    depth: "next",
    whyItMatters:
      "Plaintext inside the VPC is still a finding. Interviews expect TLS at the edge and a story for service identity: mesh mTLS, terminating at the LB, or app-level TLS. Certificates, rotation, and who is allowed to call whom are the real design.",
    theory: [
      "TLS (1.2/1.3) authenticates the server via a certificate chain and encrypts the bytes. HTTPS is HTTP over TLS. Termination can sit at CDN, LB, sidecar, or process. Each hop after termination is plaintext unless you re-encrypt. Modern practice is TLS everywhere public and mTLS or a service identity (SPIFFE) inside.",
      "mTLS means both sides present certificates. The server verifies the client cert against a CA or mesh control plane. This is stronger than a shared API key in a header: you get cryptographic identity for RBAC ('payments can call ledger, frontend cannot'). Meshes automate issuance and rotation; DIY mTLS dies on expired certs.",
      "Related: certificate pinning (mobile, use sparingly), mutual auth to databases, and TLS for Kafka/Redis. Clock skew breaks cert validity. For users, TLS does not replace application authz — it only names the transport peer.",
    ],
    howItWorks: [
      "Public edge: TLS 1.3, managed certs (ACM, Let’s Encrypt), HSTS, modern ciphers.",
      "Internal: mesh mTLS or platform-issued SPIFFE IDs on every RPC.",
      "Automate rotation (< 60 days) and alert on expiry.",
      "Do not log TLS keys or dump plaintext bodies of sensitive APIs.",
      "Combine with network policies: mTLS is identity, still worth limiting blast radius.",
    ],
    whenToUse: [
      "All public HTTP, all admin planes, all data-store connections that leave a host.",
      "mTLS for microservice identity and zero-trust-ish east-west.",
      "Partner webhooks: TLS plus signature, not IP allowlists alone.",
    ],
    whenNotToUse: [
      "Do not invent a company-wide private CA by hand without rotation tooling.",
      "Do not terminate TLS at the LB and then call that end-to-end encryption for PII reviews.",
    ],
    tradeoffs: [
      "Terminate at edge: cheap apps, middleboxes see traffic.",
      "End-to-end + mTLS: better confidentiality, more cert ops and harder packet debug.",
      "Pinning: stronger mobile security, painful cert changes.",
    ],
    interviewTips: [
      "Say 'TLS at CDN/LB, mTLS between services' in one breath on any security NFR.",
      "If they mention PCI or healthcare, add encryption at rest and key custody, not just HTTPS.",
    ],
    pitfalls: [
      "Expired internal certs taking down the mesh on a Monday.",
      "ClientAuth requested but not required — optional mTLS that nobody uses.",
      "Terminating TLS and forwarding X-Forwarded-Proto inconsistently (mixed cookie flags).",
    ],
    practiceIdeas: [
      "Draw trust boundaries: browser → CDN → gateway → app → DB, and mark where plaintext exists.",
      "Design cert rotation for 200 services without downtime.",
    ],
    related: [
      "encryption",
      "service-mesh",
      "api-gateway",
      "auth-sessions-jwt",
      "least-privilege-secrets",
      "pii-gdpr",
    ],
  },
  {
    slug: "rate-limiting",
    track: "hld",
    category: "Traffic",
    title: "Rate limiting: token bucket, leaky bucket, sliding window",
    summary:
      "Algorithms that cap how often a client can act — protecting backends, enforcing fairness, and shaping 429s users can understand.",
    depth: "core",
    whyItMatters:
      "Without limits, one script or a retry storm is your capacity plan. Interviews love the algorithm names and then the distributed part: a local counter on each pod is not a global quota. This topic is the building block for the rate-limiter system design.",
    theory: [
      "Token bucket: tokens refill at rate r up to burst b. Each request spends a token. Bursts are allowed; sustained rate is r. This matches APIs well (humans click in bursts). Leaky bucket: queue/outflow at constant rate — smooths traffic, delays or drops excess. Good for shaping egress; less friendly as a user-facing API limit unless you drop instead of queue.",
      "Fixed window: count per calendar interval — cheap, bursty at window edges (double rate at :00). Sliding window log: store timestamps, accurate, memory-heavy. Sliding window counter: weighted previous window + current — a common Redis compromise. GCRA and distributed algorithms (Redis INCR + PEXPIRE, or a centralized limiter service) implement these at scale.",
      "Keys matter more than the curve: IP, user id, API key, route, tenant. Combine dimensions (user + endpoint). Return 429 with Retry-After. Edge limits stop DDoS cheaply; app limits enforce product quotas; dependency limits (bulkhead) stop you from killing a partner. Consistency of the count can be eventual — over-admit a little rather than coordinating a global lock per click.",
    ],
    howItWorks: [
      "Pick identity (key), algorithm, rate, burst, and whether to queue or reject.",
      "Implement with Redis or a limiter service; avoid per-pod-only counts for paid quotas.",
      "Apply coarse limits at CDN/gateway and fine limits in the service.",
      "Emit headers: remaining, reset; log limit hits as a first-class metric.",
      "Isolate write-heavy or expensive routes (search, export) with tighter buckets.",
    ],
    whenToUse: [
      "Public APIs, login, OTP, search, scrape-prone GETs, webhook inbound.",
      "Multi-tenant fairness so one customer cannot eat the cluster.",
      "Protecting downstreams with concurrency limits as well as rate.",
    ],
    whenNotToUse: [
      "Do not rate-limit yourself into dropping health checks or deploys.",
      "Do not use a global lock in SQL as a 100k QPS limiter.",
    ],
    complexity: {
      time: "O(1) per request for token/sliding-counter; O(k) for log of timestamps",
      space: "O(number of active keys) in Redis",
      notes: "Accuracy vs QPS: local approximate limiters plus a global paid quota.",
    },
    tradeoffs: [
      "Burst (token): better UX, need headroom on backends.",
      "Strict smooth (leaky): predictable load, worse UX under burst.",
      "Central Redis: accurate quotas, extra hop and a hot key per celebrity user.",
    ],
    interviewTips: [
      "Name token bucket + Redis + key = user+route; mention edge + app layers.",
      "Discuss hot keys: shard counters or use a local + async reconcile design.",
      "Point to the full rate-limiter system design for distributed details.",
    ],
    pitfalls: [
      "Fixed windows that let 2× through at the boundary.",
      "Limiting only by IP behind a carrier NAT (punish a whole country).",
      "Silent drops without 429 — clients hammer harder.",
    ],
    practiceIdeas: [
      "Implement token bucket in Redis (Lua) and list the race conditions without Lua.",
      "Design login limits that stop credential stuffing without locking out a NAT.",
    ],
    related: [
      "rate-limiter-system",
      "api-gateway",
      "backpressure-retries",
      "ddos-waf",
      "hot-keys-partitions",
      "public-api-platform",
    ],
  },
  {
    slug: "auth-sessions-jwt",
    track: "hld",
    category: "Traffic",
    title: "Auth: sessions, JWT, OAuth2, OIDC, API keys",
    summary:
      "How you know who is calling — cookies vs tokens, delegated access vs login, and what to store on the server.",
    depth: "core",
    whyItMatters:
      "Every design has an 'auth box' that candidates skip. The choice changes logout, revocation, mobile, partners, and whether a leaked token is a forever skeleton key. Know the flows well enough to draw them.",
    theory: [
      "Session cookies: server stores a session id (Redis/DB) and sets an HttpOnly Secure SameSite cookie. Revocation is delete-the-row. Great for first-party web. Scaling is a shared session store, not sticky app memory. CSRF is the tax of cookies (SameSite lax/strict plus tokens on mutating requests).",
      "JWTs are signed (sometimes encrypted) claims. Resource servers validate signature and exp without a session lookup — handy for stateless APIs and internal SSO. The cost is revocation: you need short TTL, a blocklist, or version the user's token epoch. Never stuff secrets or PII you would not log. Access token + refresh token is the usual pair; refresh stays tighter (rotation, server-side family).",
      "OAuth2 is delegated authorization: an authorization server issues tokens so a client can call an API as a user or as itself (client credentials). OIDC adds an ID token (login identity) on top of OAuth2. Use authorization code + PKCE for web/mobile; never implicit. API keys are long-lived bearer secrets for servers and partners — hash them at rest, scope them, rotate them. They are not end-user login.",
    ],
    howItWorks: [
      "First-party web: session cookie or BFF that holds the refresh token.",
      "Mobile/SPA: OIDC code+PKCE; short-lived access JWT; rotate refresh.",
      "Service-to-service: mTLS or client-credentials JWT, not a user cookie.",
      "Partners: API keys or OAuth client credentials with per-key quotas.",
      "Validate iss, aud, exp, signature; map sub to internal user id.",
    ],
    whenToUse: [
      "Sessions for classic web apps with immediate logout.",
      "OIDC when you have a real identity provider and multiple apps.",
      "API keys for server integrations; OAuth for acting on a user's behalf.",
    ],
    whenNotToUse: [
      "Do not put a 30-day JWT in localStorage and call it stateless security.",
      "Do not invent your own encrypted token format instead of a standard IDP.",
    ],
    tradeoffs: [
      "Server sessions: easy revoke, extra lookup and store.",
      "JWT: fast validate, clumsy revoke and bigger tokens.",
      "Central IDP: consistent security, availability dependency for login.",
    ],
    interviewTips: [
      "Ask first-party vs third-party client — that picks cookie vs OAuth.",
      "Mention token theft: HTTPS, HttpOnly, rotation, and binding to device when you can.",
      "For designs with notifications or chat, say how the WS upgrade authenticates.",
    ],
    pitfalls: [
      "Storing JWT in localStorage (XSS = account take). ",
      "No audience check — any token from the IDP works on every API.",
      "API keys in Git or in query strings (logs).",
    ],
    practiceIdeas: [
      "Draw authorization-code + PKCE for a mobile chat app.",
      "Design logout-everywhere: session version in Redis vs JWT blocklist.",
    ],
    related: [
      "rbac-abac",
      "tls-mtls",
      "api-gateway",
      "least-privilege-secrets",
      "public-api-platform",
      "stateless-sticky-sessions",
    ],
  },
  {
    slug: "rbac-abac",
    track: "hld",
    category: "Traffic",
    title: "Authorization: RBAC and ABAC",
    summary:
      "Role-based vs attribute-based access control — how you decide what an authenticated principal is allowed to do.",
    depth: "next",
    whyItMatters:
      "Authentication is who; authorization is what. Multi-tenant products, admin tools, and document sharing fail here, not at JWT parsing. Interviews look for tenant isolation, least privilege, and where the check runs.",
    theory: [
      "RBAC assigns users to roles (admin, editor, viewer) and roles to permissions (invoice:write). It is simple, cacheable, and matches most SaaS org charts. It struggles with 'share this one doc with that user' and with context ('only if in the same region and the document is not legal-hold'). Role explosion (admin-us-east-billing-readonly) is the smell.",
      "ABAC evaluates attributes of the principal, resource, action, and environment (time, IP, device). Policies look like 'allow if user.team == doc.team and doc.sensitivity <= user.clearance.' ReBAC/relationship-based (Zanzibar) is the graph cousin: membership and sharing edges. You can implement ABAC on a policy engine (OPA/Cedar) or a dedicated authz service.",
      "Enforcement must be on every path: API, worker, admin script, and search index filters (or you leak via search). Cache decisions carefully — revoke and share-change are consistency problems. Tenant_id on every query is the boring ABAC check that prevents the classic IDOR.",
    ],
    howItWorks: [
      "Authenticate first; then authorize action + resource, not just 'is logged in.'",
      "Start RBAC for coarse roles; add resource ACLs or ReBAC for sharing.",
      "Always filter by tenant in the data layer, not only in the UI.",
      "Centralize policy evaluation if many services need the same rules; keep a local library for latency.",
      "Audit allow/deny on sensitive actions.",
    ],
    whenToUse: [
      "RBAC: internal tools, simple SaaS roles, service accounts.",
      "ABAC/ReBAC: Google-docs-like sharing, fine-grained cloud IAM, healthcare.",
      "Both: org role plus per-resource ACL.",
    ],
    whenNotToUse: [
      "Do not encode every sharing edge as a new role name.",
      "Do not check authz only in the gateway if workers consume IDs from a queue.",
    ],
    tradeoffs: [
      "RBAC: simple ops, coarse and explodes under edge cases.",
      "ABAC: expressive, harder to test and to explain to users.",
      "Zanzibar-style graph: powerful sharing, extra system to scale and cache.",
    ],
    interviewTips: [
      "On multi-tenant designs, say 'tenant_id in the PK or RLS' before you say Kubernetes.",
      "For Drive/Dropbox, mention ACL/ReBAC and cache invalidation on share changes.",
    ],
    pitfalls: [
      "IDOR: authorize only the route, not the object id.",
      "Stale cached 'allow' after revoke.",
      "Admin impersonation without audit.",
    ],
    practiceIdeas: [
      "Model Dropbox sharing: owner, path ACL, link-with-password, and a deny-after-revoke SLO.",
      "Write five OPA-style rules for a hospital EHR (role + ward + break-glass).",
    ],
    related: [
      "auth-sessions-jwt",
      "multi-tenant",
      "least-privilege-secrets",
      "audit-logs",
      "dropbox",
      "public-api-platform",
    ],
  },
];
