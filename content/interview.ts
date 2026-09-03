export type InterviewGuide = {
  askedAs: string[];
  theyWant: string[];
  opening: string;
  answerSteps: { label: string; say: string }[];
  followUps: { q: string; a: string }[];
};

export const GUIDES: Record<string, InterviewGuide> = {
  "hld:url-shortener": {
    askedAs: [
      `"Design bit.ly."`,
      `"We need short links for SMS. Whiteboard it."`,
      `"Don't worry about the UI. How does redirect work at 50k QPS?"`,
    ],
    theyWant: [
      "Read-heavy path, unique codes, cache, not 12 microservices.",
      "301 vs 302 and why stats break.",
      "How you stop guessable codes and duplicate POSTs.",
    ],
    opening:
      "v1 is mint a unique code and 302 fast. Custom aliases, QR, and teams are v2. Redirects dwarf writes.",
    answerSteps: [
      { label: "Clarify", say: "Shorten, redirect, optional TTL and click count. No full analytics in v1." },
      { label: "Estimate", say: "Writes hundreds/s. Redirects 10k–100k/s. Rows are tiny — storage is not the boss." },
      { label: "API", say: "POST /urls → {code}. GET /{code} → 302. Idempotency-Key on POST." },
      { label: "Data", say: "urls(code PK, long_url, expires_at). Redis code→url. Counters async." },
      { label: "Sketch", say: "DNS → LB → stateless redirectors → Redis → SQL. Writes to primary only." },
      { label: "Dive", say: "IDs: Snowflake→base62. Collision retry. Viral codes: replicate the cache entry." },
      { label: "Wrap", say: "301 caches in the browser (cheap, bad stats). Shard by code hash at 10x." },
    ],
    followUps: [
      { q: "Custom aliases?", a: "Unique index. That's a CP write. Rate-limit and auth it." },
      { q: "Someone scrapes sequential codes.", a: "Don't use incrementing IDs. Base62 of a wide snowflake. Bloom for 404s." },
      { q: "Can we put this only in Redis?", a: "No if links must survive a flush. Redis is the cache, SQL/KV is source of truth." },
    ],
  },
  "hld:newsfeed": {
    askedAs: [
      `"Design Twitter / Facebook home feed."`,
      `"I follow 200 people. How do I see new posts quickly?"`,
    ],
    theyWant: ["Fan-out on write vs read.", "Celebrity / hot-key problem.", "Ranking is v2 — delivery is v1."],
    opening:
      "The hard part is fan-out, not the tweet table. I'd pick fan-out-on-write for normal users and fan-out-on-read for celebrities.",
    answerSteps: [
      { label: "Clarify", say: "Home timeline, post, follow. Not search, not DMs. Freshness vs ranking." },
      { label: "Estimate", say: "Reads >> writes. One post × 1k followers = 1k cache writes. Celebrities break that." },
      { label: "API", say: "POST /posts. GET /feed?cursor. POST /follow." },
      { label: "Data", say: "posts by id. follow graph. precomputed feed lists in Redis/Cassandra per user." },
      { label: "Sketch", say: "Write: API → post DB → fan-out workers → follower feed caches. Read: API → my feed cache." },
      { label: "Dive", say: "Hybrid: push to normal followers, pull celebrities at read time and merge." },
      { label: "Wrap", say: "If they ask ranking, add a lightweight score on merge — don't start with ML." },
    ],
    followUps: [
      { q: "Someone has 50M followers.", a: "Do not write 50M feed entries. Pull at read. Cache their recent posts." },
      { q: "Feed looks empty after a follow.", a: "Backfill recent posts of the followee into my precomputed list, async." },
    ],
  },
  "hld:chat": {
    askedAs: [
      `"Design WhatsApp."`,
      `"1:1 and group chat, online, ticks. No video in v1."`,
    ],
    theyWant: ["WebSocket vs poll.", "Message durability vs fan-out to devices.", "Group chat is not N² connections."],
    opening:
      "Connections are WebSockets to a gateway. Messages persist first, then push to online devices. Groups fan-out through the server, not peer-to-peer.",
    answerSteps: [
      { label: "Clarify", say: "1:1 + groups, delivery ticks, media later. Which consistency on ticks?" },
      { label: "Estimate", say: "Many idle sockets. Messages smaller than media. Groups of 256, not 50k, in v1." },
      { label: "API", say: "WS events: send, ack, presence. REST for history and media URLs." },
      { label: "Data", say: "messages by chat_id + seq. inbox per user-device. object store for media." },
      { label: "Sketch", say: "Client → WS gateway → chat service → Kafka → Cassandra / store. Presence in Redis." },
      { label: "Dive", say: "Persist then ack. Offline: store and push on connect. Don't await every device." },
      { label: "Wrap", say: "Gateways are sticky or the session map is in Redis so any gateway can find the socket." },
    ],
    followUps: [
      { q: "How do ticks work?", a: "Sent = persisted. Delivered = device ack. Read = receipt event. They can be eventual." },
      { q: "Group of 10k?", a: "Don't open 10k sockets from the sender. Publish once, consumers fan-out." },
    ],
  },
  "hld:uber": {
    askedAs: [
      `"Design Uber matching."`,
      `"Rider opens the app. How do we pick a driver?"`,
    ],
    theyWant: ["Location stream.", "Geo index, not a table scan.", "Matching is a race — locking / offer."],
    opening:
      "Two loops: drivers ping location, riders request a trip. Matching queries nearby supply and offers one driver at a time.",
    answerSteps: [
      { label: "Clarify", say: "Request ride, match, track. Pricing and multi-stop are v2 unless they insist." },
      { label: "Estimate", say: "Location updates are the QPS hog. Match QPS is much smaller." },
      { label: "API", say: "POST /trips. WS/SSE for driver location. POST /drivers/location." },
      { label: "Data", say: "trips. drivers. Redis GEO or S2 cells for nearby. Trip state machine." },
      { label: "Sketch", say: "Rider API → matching → geo index → offer to driver app. Location ingest separate." },
      { label: "Dive", say: "Offer with TTL. If ignored, next driver. Lock the trip so two drivers don't win." },
      { label: "Wrap", say: "Surge is a read of density, not a rewrite of matching." },
    ],
    followUps: [
      { q: "Two riders grab the last driver.", a: "Conditional update on driver state. Loser re-queries." },
      { q: "How big is a geo cell?", a: "Start ~1km. Too empty: expand ring. Too full: rank by ETA, not all of downtown." },
    ],
  },
  "hld:cap-theorem": {
    askedAs: [
      `"SQL is down across the ocean. What does CAP say?"`,
      `"Why can't we have consistent and available chat receipts?"`,
    ],
    theyWant: ["You pick during a partition.", "You name the product pain.", "PACELC if they go deeper."],
    opening:
      "If the network splits I must choose: stop taking writes (CP) or take writes that may conflict (AP). I pick from the requirement we wrote, not from a slogan.",
    answerSteps: [
      { label: "Define", say: "Partition happens. Then Consistency and Availability fight. You already have P." },
      { label: "CP example", say: "Unique short alias, seat hold, ledger append — refuse if we can't agree." },
      { label: "AP example", say: "Likes, typing indicators, read ticks — serve stale, repair later." },
      { label: "Say the pick", say: "Point at the write on the board: 'this one is CP, that one is AP.'" },
    ],
    followUps: [
      { q: "We have no partition right now.", a: "PACELC: even then you trade latency vs consistency (sync replica vs async)." },
    ],
  },
  "lld:parking-lot": {
    askedAs: [
      `"Design a parking lot. Classes please."`,
      `"Cars, bikes, EV. Then I'll add weekend pricing."`,
    ],
    theyWant: ["Lot as aggregate.", "Spot occupy is the invariant.", "FeePolicy is the variant seam."],
    opening:
      "v1 verbs: park and unpark. The lot owns floors and spots. A ticket records the stay. Fees are a policy, not a switch in unpark.",
    answerSteps: [
      { label: "Scope", say: "park(vehicle) → ticket. unpark(ticket) → fee. Multi-floor. Payment port optional." },
      { label: "Nouns", say: "ParkingLot, Floor, Spot, Vehicle, Ticket, FeePolicy, ParkingService." },
      { label: "Invariant", say: "A spot is FREE or has exactly one vehicle. occupy() enforces it." },
      { label: "Classes", say: "Lot.findSpot + occupy atomically. FeePolicy.quote(ticket, now)." },
      { label: "Sequence", say: "park → find → occupy → ticket. unpark → quote → pay → free." },
      { label: "Code", say: "Write occupy/free and the service. Fake the clock." },
      { label: "Variant", say: "EV spots = type + finder. Weekend rates = new FeePolicy. Do not touch park()." },
    ],
    followUps: [
      { q: "Add EV charging.", a: "New spot type and a finder preference. Same park()." },
      { q: "Two cars, one last spot.", a: "Lock the lot or the floor around find+occupy. Idempotent park with a key." },
    ],
  },
  "lld:elevator": {
    askedAs: [
      `"Design an elevator system."`,
      `"Two shafts, ten floors. Then I'll add express cars."`,
    ],
    theyWant: ["State machine per car.", "Scheduler is a strategy.", "Requests vs assignments."],
    opening:
      "Each car is a state machine (idle, moving, door). A scheduler picks a car for a hall call. I would not hard-code SCAN in the car.",
    answerSteps: [
      { label: "Scope", say: "Hall call, car call, open/close. Safety limits. No pretty UI." },
      { label: "Nouns", say: "ElevatorCar, FloorRequest, Scheduler, Door, ElevatorService." },
      { label: "Invariant", say: "A car has one direction or idle. Door open only when stopped." },
      { label: "Classes", say: "Scheduler.assign(request) → carId. Car.step(now) advances state." },
      { label: "Sequence", say: "Hall call → scheduler → car queue → step → arrive → door." },
      { label: "Code", say: "Code Car.step and one scheduler. Tick with a fake clock." },
      { label: "Variant", say: "Express / peak hours = new Scheduler. Don't edit Car." },
    ],
    followUps: [
      { q: "Three cars, how do you pick?", a: "Closest idle, or SCAN that will pass the floor. Interface, two impls." },
      { q: "Someone spams every floor.", a: "Dedupe requests in the car queue. Don't grow unbounded." },
    ],
  },
  "lld:splitwise": {
    askedAs: [
      `"Design Splitwise."`,
      `"A pays for dinner. How do balances update?"`,
    ],
    theyWant: ["Ledger, not a single balance cell.", "Simplify is optional.", "Group vs pairwise."],
    opening:
      "I'd store expenses and splits as a ledger. Balances are projections. Simplify is a separate algorithm on the graph of debts.",
    answerSteps: [
      { label: "Scope", say: "addExpense, balances, settle. Groups. Currency later." },
      { label: "Nouns", say: "User, Group, Expense, Split, LedgerService, SimplifyPolicy." },
      { label: "Invariant", say: "Splits on an expense sum to the total. No silent remainder." },
      { label: "Classes", say: "Ledger.apply(expense). BalanceBook is derived." },
      { label: "Sequence", say: "addExpense → validate splits → append → recompute balances." },
      { label: "Code", say: "Write apply + balance query. Tests on a 3-person dinner." },
      { label: "Variant", say: "Simplify debts = min-cash-flow on the graph, not a rewrite of apply." },
    ],
    followUps: [
      { q: "Someone deletes an expense.", a: "Append a reversing entry. Don't mutate history if you can avoid it." },
      { q: "Unequal splits.", a: "Split strategy: equal, exact, percent. Same expense, different SplitPolicy." },
    ],
  },
  "lld:strategy-pattern": {
    askedAs: [
      `"Payment can be card or UPI. Don't use a switch."`,
      `"When do you use Strategy?"`,
    ],
    theyWant: ["Problem first.", "Interface + concretes + client.", "OCP without a speech."],
    opening:
      "The algorithm varies, the caller shouldn't. Checkout calls payment.charge. Card and UPI are two classes.",
    answerSteps: [
      { label: "Problem", say: "A growing if/else on how we do one step." },
      { label: "Shape", say: "Policy interface, two impls, client holds the interface." },
      { label: "Use", say: "Fees, payment, ranking, elevator scheduling." },
      { label: "Don't", say: "One algorithm forever — a function is enough." },
    ],
    followUps: [
      { q: "That's just an interface.", a: "Yes. Strategy is the name for 'swap the brain.' Don't overdraw it." },
    ],
  },
};
