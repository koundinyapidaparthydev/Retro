import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "public-surface",
    track: "lld",
    category: "Class Design",
    title: "Public surface",
    summary:
      "The public methods of a type are the product. Keep the surface small, named in domain verbs, and stable — everything else is private until a caller must see it.",
    depth: "core",
    whyItMatters:
      "Interview diagrams that list twenty getters have no design. A tight public surface is how you leave room for a variant and how you keep encapsulation from being a slogan.",
    theory: [
      "Start from use cases, not from fields. If the actor needs to park, pay, and unpark, those are the public methods of the service. Fields like occupiedCount are queries you add only if a caller needs them. Protected is not 'public for subclasses to poke' — treat it as API too.",
      "A small surface is easier to test, mock, and document. It is also easier to keep invariant-safe because there are fewer doors. YAGNI applies: do not publish `rebalanceInternalHeap()` because a test wanted it; make the test a package-friend or assert through behavior.",
      "Package-level / module-level visibility is a tool: constructors of inner entities can be package-private so only the aggregate can create them. In TypeScript, same-file or same-module conventions play that role — say it explicitly.",
      "Changing a public method is a breaking change even in an interview: if the controller already calls `park(car)`, do not rename it silently when you add tickets — add an overload or a new type as the return.",
    ],
    howItWorks: [
      "List actors and use cases. Those verbs are candidates.",
      "Put them on the type that owns the invariant.",
      "Hide fields, helpers, and collection internals.",
      "Add queries only when a real caller needs them.",
      "Review: every public method should be explainable in one sentence.",
    ],
    whenToUse: [
      "Every class you draw.",
      "When you are tempted to generate getters/setters for all fields.",
      "When designing a library or SDK, not just an app.",
    ],
    whenNotToUse: [
      "DTOs at the wire — their 'surface' is the schema, and public fields can be fine.",
      "Throwaway scripts.",
    ],
    tradeoffs: [
      "Smaller API vs more types (you split instead of adding methods).",
      "Stability vs the need to add a parameter — use a command object when the list grows.",
    ],
    interviewTips: [
      "Write three public methods on the service, not fifteen. They can ask for more.",
      "If they want a getter for debugging, mark it package or say 'I'd expose a snapshot DTO'.",
      "Name methods as park/unpark, not setOccupied.",
    ],
    pitfalls: [
      "Public fields on entities.",
      "A Util class with 40 public statics.",
      "Returning live internal collections.",
    ],
    practiceIdeas: [
      "Take a class with 12 public methods and move 7 to package-private; see which tests break for good reasons.",
      "Design Library's public API as borrow, return, search only.",
    ],
    related: [
      "encapsulation",
      "signatures",
      "facade-pattern",
      "kiss",
      "aggregates",
    ],
  },
  {
    slug: "signatures",
    track: "lld",
    category: "Class Design",
    title: "Method signatures",
    summary:
      "A signature is a contract: names, types, preconditions, results, and errors. Design it so the compiler and the caller cannot easily do the wrong thing.",
    depth: "core",
    whyItMatters:
      "`park(Object o)` and `process(boolean, boolean, boolean)` fail interviews. Good signatures use values (Money, SpotId), avoid flag parameters, and make illegal states unrepresentable.",
    theory: [
      "Arguments should be the smallest types that carry meaning. Prefer `park(Vehicle)` over `park(String plate, String type, int wheels)` if Vehicle already exists. Prefer `from`/`to` DateRange over two raw timestamps that can invert. Flag parameters (`notify=true`) are usually two methods or a policy object.",
      "Return types tell the story: `Ticket` on success, `Optional<Ticket>` or `Result<Ticket, ParkError>` when failure is normal, exception when failure is exceptional. Do not return null for 'lot full' if you also return null for 'bug'. Consistency beats cleverness.",
      "Names are part of the signature. `cancel` vs `forceCancel` vs `expire` are different preconditions. Overloads should agree on meaning; do not overload `submit(String)` as both json and id.",
      "Keep arity small. When you pass five related things, you wanted a command/request object. When you pass a whole User to get an email, you wanted Email.",
    ],
    howItWorks: [
      "Write the method name as a verb and the args as domain types.",
      "Remove boolean flags by splitting methods or passing an enum/policy.",
      "Choose result vs exception and document it.",
      "Avoid outputting via mutable args unless the language idiom demands it.",
      "Read the signature aloud: if you need a comment to explain a parameter, rename or retype it.",
    ],
    whenToUse: [
      "Every public method, especially service APIs.",
      "When a method has grown a third boolean.",
      "When two timestamps or two ids could be swapped.",
    ],
    whenNotToUse: [
      "Do not invent a type for every argument in a private helper used once.",
      "Do not wrap a single int in a class with no rules.",
    ],
    tradeoffs: [
      "More types vs fewer mix-ups.",
      "Overloads vs explicit names — names often win for different preconditions.",
    ],
    interviewTips: [
      "Write `park(Vehicle v): Result<Ticket, Full|Banned>` on the board. That is a design.",
      "If you need a clock, pass Clock, do not call `now()` inside if tests matter.",
      "Mention you would not pass the HttpRequest into the domain.",
    ],
    pitfalls: [
      "`Object` / `Map<String,Object>` parameters.",
      "Returning null and throwing for the same class of failure.",
      "Output parameters that the caller must allocate.",
    ],
    practiceIdeas: [
      "Rewrite transfer(from, to, amount) to take AccountId and Money so currency cannot be a raw int.",
      "Split update(user, boolean admin, boolean notify) into named methods.",
    ],
    related: [
      "public-surface",
      "errors-vs-results",
      "identity-vs-value-objects",
      "fail-fast",
      "program-to-an-interface",
    ],
  },
  {
    slug: "errors-vs-results",
    track: "lld",
    category: "Class Design",
    title: "Errors vs results",
    summary:
      "Use results (or error codes) for expected outcomes the caller must handle; throw for bugs and truly exceptional breaks of the contract.",
    depth: "next",
    whyItMatters:
      "Lot full, card declined, and unknown id are not 'exceptions' in the product sense — they are outcomes. Mixing them with NullPointerException makes APIs unpredictable and try/catch into control flow.",
    theory: [
      "A Result/Either type (`Ok(ticket)` / `Err(full)`) makes success and domain failure visible in the signature. The caller must branch. That is what you want for park, pay, reserve. Exceptions skip up the stack — good for 'programmer error' or 'disk vanished' if a higher layer is the right handler.",
      "Do not do both for the same case. Do not return null and also throw. Do not throw `BusinessException` for every if and then claim you have a domain model — a Result is clearer on a whiteboard even if the language is Java and you eventually use checked exceptions or a Result library.",
      "Map at the edge: domain Result → HTTP 409/402/404; unexpected exception → 500. Keep SQL exceptions out of the domain; adapters translate them.",
      "Partial success (3 of 5 items reserved) needs an explicit type, not a thrown exception after side effects. Design the return to include what happened.",
    ],
    howItWorks: [
      "Classify each failure: expected domain vs infrastructure vs bug.",
      "Expected: Result or a dedicated error type in the signature.",
      "Infrastructure: translate in the adapter; maybe retry; then Result or exception per your app rule.",
      "Bugs (broken invariant): throw fast.",
      "Never leave a half-mutated aggregate on a domain error — fail before mutate, or roll back.",
    ],
    whenToUse: [
      "Any command that can legally fail (full, declined, conflict).",
      "APIs used by UI that must show a message.",
      "Batch operations with partial success.",
    ],
    whenNotToUse: [
      "Getters that cannot fail — return the value.",
      "Using Result for broken invariants you should have prevented in the constructor.",
    ],
    tradeoffs: [
      "Explicit branching vs the convenience of exceptions.",
      "Result types in Java are verbose; still better than boolean + out-params.",
    ],
    interviewTips: [
      "Say 'lot full is a Result, not an exception'. Then sketch the type.",
      "If they prefer exceptions, accept it but keep a closed set of domain exception types, not RuntimeException('no').",
      "For payment, distinguish declined (domain) from timeout (infra, maybe retry).",
    ],
    pitfalls: [
      "catch (Exception e) { return null; }",
      "Error codes as magic strings.",
      "Throwing after you already charged the card.",
    ],
    practiceIdeas: [
      "park() returns Result<Ticket, ParkError> with Full, Banned, InvalidVehicle.",
      "Map those errors to HTTP in a 10-line adapter.",
    ],
    related: [
      "signatures",
      "fail-fast",
      "boundary-validation",
      "transactions-per-use-case",
      "future-promise",
    ],
  },
  {
    slug: "boundary-validation",
    track: "lld",
    category: "Class Design",
    title: "Boundary validation",
    summary:
      "Validate untrusted input at the edge, then build domain values that cannot represent the bad shape — do not re-parse strings in every entity method.",
    depth: "core",
    whyItMatters:
      "Controllers that pass raw maps into the domain force every class to distrust everyone. Validate once, construct Email/Money/DateRange, and let the domain assume types are well-formed. Still keep invariants for rules the parser cannot know.",
    theory: [
      "Boundaries are HTTP, CLI, file load, message consume, UI forms. There you check presence, types, ranges, and formats. Fail with a field-level error list. You do not park a car in the controller; you build a ParkCommand.",
      "Domain invariants are different: 'this spot is handicap-only' is not a JSON schema problem. Both layers exist. Duplicating the same regex in five services is the failure mode — put format in the value constructor, called from the boundary.",
      "Never trust persistence blindly if old rows can be corrupt; decide to fail load or repair. Never trust other services' payloads — they are a boundary too.",
      "Authorization is a boundary concern adjacent to validation: 'this user may park here' is not a field format. Keep it a separate step so you do not mix 400 and 403.",
    ],
    howItWorks: [
      "Parse bytes → DTO with a schema (or manual checks).",
      "Map DTO → command with value objects (this is the second validation).",
      "Call the use case with the command.",
      "Keep entity methods free of string parsing.",
      "Return structured errors from the first two steps without touching state.",
    ],
    whenToUse: [
      "Every inbound API and message handler.",
      "Config files and plugin manifests.",
      "When you would have written `if (plate == null)` inside ParkingLot.",
    ],
    whenNotToUse: [
      "Internal calls that already pass domain types — do not re-validate formats every hop.",
      "Trusting your own immutable values you just built.",
    ],
    tradeoffs: [
      "Two layers of checks vs 'validate everywhere' sprawl.",
      "Schema-first DTOs vs hand-rolled parsers — pick one per boundary.",
    ],
    interviewTips: [
      "Draw: API → validate → ParkCommand → ParkingService. Raw strings die at the left.",
      "If time is short, put checks in value constructors and call them from the service.",
      "Mention auth as a separate step if they have users.",
    ],
    pitfalls: [
      "Validating only in the UI.",
      "Domain methods taking String email and parsing again.",
      "A 200-line validator class that also parks cars.",
    ],
    practiceIdeas: [
      "Write ParkRequest DTO + ParkCommand.of(...) that rejects blank plates.",
      "Config loader that fails boot on bad JSON rather than defaulting silently.",
    ],
    related: [
      "fail-fast",
      "schema-vs-objects",
      "identity-vs-value-objects",
      "dto-vs-domain-vs-persistence",
      "config-loader",
    ],
  },
  {
    slug: "idempotent-ops",
    track: "lld",
    category: "Class Design",
    title: "Idempotent operations",
    summary:
      "Repeating the same command with the same key does not repeat the side effect — required once clients retry, double-click, or at-least-once queues exist.",
    depth: "next",
    whyItMatters:
      "Payments, reservations, and 'create user' get retried. Without idempotency you double-charge and double-book. Interviewers love asking what happens if park() is called twice with the same request id.",
    theory: [
      "GET and PUT are often naturally idempotent; POST create is not. You make it so with an idempotency key: store the key plus the result. A second call returns the original result if the payload matches, or conflicts if it does not. In-memory, a ConcurrentHashMap of key → result under the same lock as the mutation is enough for LLD.",
      "Natural keys can work: `createUser(email)` can be unique-constrained. For 'charge $20', you need an external key because charging twice might be what they wanted. Never use 'amount + time' as a key.",
      "At-least-once consumers must treat handle(message) as idempotent. Use message id. At-most-once loses messages; exactly-once is a system property you rarely truly have in-process — you emulate it with idempotent handlers.",
      "Undo/cancel is a different command with its own key. Idempotent cancel means cancel-already-cancelled is success.",
    ],
    howItWorks: [
      "Accept an Idempotency-Key or requestId on commands with side effects.",
      "Under the aggregate lock: if key known, return stored result (or conflict).",
      "Else perform the effect, store key → result, return.",
      "Expire keys with a TTL if the store would grow forever.",
      "Make consumers key off message ids the same way.",
    ],
    whenToUse: [
      "Payments, booking, account creation, email send, anything retried.",
      "Queue consumers.",
      "APIs exposed to mobile networks.",
    ],
    whenNotToUse: [
      "Pure queries.",
      "Intentionally repeatable commands ('increment like') — then the increment is the point; still may want 'one like per user' which is a different uniqueness.",
    ],
    tradeoffs: [
      "Extra store and payload comparison vs safety under retry.",
      "TTL too short: double charge. TTL too long: storage.",
    ],
    interviewTips: [
      "When they mention retry or double-click, add requestId to the signature immediately.",
      "For payment, say 'we persist the intent id with the charge'.",
      "Unpark() twice should be safe — make it so and say the word idempotent.",
    ],
    pitfalls: [
      "Keys that include time or random values generated server-side after the retry.",
      "Storing the key after the side effect without a transaction — crash window.",
      "Treating different payloads with the same key as success.",
    ],
    practiceIdeas: [
      "Wallet.debit(key, money) returns the same receipt on retry.",
      "Notification send skips if messageId already delivered.",
    ],
    related: [
      "payment-wallet",
      "thread-safe-cache-counter-inventory",
      "command-pattern",
      "transactions-per-use-case",
      "errors-vs-results",
    ],
  },
  {
    slug: "pagination-in-service-apis",
    track: "lld",
    category: "Class Design",
    title: "Pagination in service APIs",
    summary:
      "Never return 'all rows' from a growing collection. Use limit + cursor (or page/offset) and a stable sort so callers can walk data safely.",
    depth: "next",
    whyItMatters:
      "Catalogs, feeds, bookings, and search appear in LLD as 'list X'. Unbounded lists blow memory and time. Pagination is part of the signature, not a later optimization.",
    theory: [
      "Offset/page is easy (`page=3&size=20`) and breaks when rows insert/delete (skips/duplicates). Cursor/seek (`after=id:ts`) is stable if the sort key is unique and monotonic enough. For in-memory LLD, a cursor can be an index or the last id.",
      "The API should return items plus `nextCursor` (or empty). Total counts are optional and expensive — do not promise them unless asked. Sort must be deterministic (id tie-breaker) or pages wander.",
      "Service-layer pagination is not the same as SQL LIMIT, but you will push the limit down. Loading 1M rows then slicing in memory is a fail. For in-memory maps, iterate with a cursor instead of `values()` the whole map.",
      "Filters + pagination need the same stable order. Changing sort between pages is undefined. Document it.",
    ],
    howItWorks: [
      "Add `list(filter, cursor, limit)` to the repository/service.",
      "Clamp limit (default 20, max 100).",
      "Use a unique sort key. Encode the cursor opaquely.",
      "Return items + nextCursor. Do not return the live internal list.",
      "Decide empty vs 404 for 'cursor from a deleted world' — usually empty + no next.",
    ],
    whenToUse: [
      "Any list that can grow past a few dozen: search, history, inventory admin, bookings.",
      "Autocomplete (tiny pages, prefix cursor).",
    ],
    whenNotToUse: [
      "Fixed small sets (a car's 5 seats, a chess board's 32 pieces).",
      "When the interviewer wants the whole board state — that is a snapshot, not a list API.",
    ],
    complexity: {
      time: "O(limit) to return a page if the store can seek; O(n) if you scan",
      space: "O(limit) per response, not O(n)",
      notes: "Offset is O(offset+limit) in many stores — mention it.",
    },
    tradeoffs: [
      "Offset: simple, unstable, costly on deep pages.",
      "Cursor: stable, slightly harder, cannot jump to page 100 easily.",
    ],
    interviewTips: [
      "If they say 'show all bookings', add pagination in the signature before you implement.",
      "For BookMyShow seat maps, a snapshot of one screen is OK; for 'all movies', paginate.",
      "Mention opaque cursors so you can change the sort implementation.",
    ],
    pitfalls: [
      "Returning ArrayList of everything.",
      "Page size 0 or negative unclamped.",
      "Sorting by a non-unique field only.",
    ],
    practiceIdeas: [
      "Library.search(titlePrefix, cursor, limit) over an in-memory index.",
      "Browser history list with cursor on timestamp+id.",
    ],
    related: [
      "iterator-pattern",
      "repository-dao",
      "signatures",
      "autocomplete",
      "bookmyshow",
    ],
  },
  {
    slug: "schema-vs-objects",
    track: "lld",
    category: "Class Design",
    title: "Schema vs objects",
    summary:
      "A schema describes the shape of data at rest or on the wire; an object protects behavior and invariants. Do not let JSON or tables become your domain model.",
    depth: "next",
    whyItMatters:
      "Candidates paste the DB table into a class and call it design. Then they cannot add a rule that is not a column. Keep schemas at the edge; keep objects in the middle.",
    theory: [
      "Schemas (JSON Schema, protobuf, SQL) are about compatibility, validation, and storage. They evolve with versions and migrations. Objects are about operations. A `Reservation` object may compute overlap; a reservation row cannot.",
      "When they coincide (a DTO matching a table matching a class), you get a brittle CRUD app. That is fine for admin tools. It fails for parking rules, game rules, and money. Map explicitly.",
      "Schema evolution: additive fields, optional vs required, and compatibility. Domain evolution: new methods, new states. Do not silently drop unknown fields if you must round-trip (tolerant reader vs fail-fast writer).",
      "TypeScript interfaces are schemas if they have no methods. Classes with invariants are objects. Use both; do not pretend they are the same.",
    ],
    howItWorks: [
      "Define the wire/storage schema separately from the domain type.",
      "Write a mapper in one place.",
      "Version the schema when you cannot change readers.",
      "Put rules on objects, not on 'after load if column X'.",
      "Do not generate domain methods from columns.",
    ],
    whenToUse: [
      "Any design that persists or speaks HTTP.",
      "When the interviewer draws a table first — redraw objects.",
      "Event payloads vs event behavior.",
    ],
    whenNotToUse: [
      "In-memory katas with no IO — one object model is enough.",
      "Over-inventing Avro for a hashmap cache.",
    ],
    tradeoffs: [
      "Mapping cost vs freedom to change each side.",
      "Codegen from schema vs hand-written values — codegen for wire, hand-write for domain.",
    ],
    interviewTips: [
      "If they start with tables, say 'I'll design objects first, then a table that can store them'.",
      "For URL shortener, the schema is tiny; the objects are about uniqueness and expiry.",
      "Mention mapping as a first-class type, not as setters in the controller.",
    ],
    pitfalls: [
      "Anemic 'entities' that are Hibernate tables with public fields.",
      "Changing a column and forgetting the API DTO.",
      "Using Map<String,Object> as the domain.",
    ],
    practiceIdeas: [
      "Write Order JSON schema, Order DTO, and Order domain with a mapper.",
      "Store a game board as a string schema but keep Board as an object with legalMoves.",
    ],
    related: [
      "dto-vs-domain-vs-persistence",
      "mapping",
      "boundary-validation",
      "orm-n-plus-one",
      "repository-dao",
    ],
  },
  {
    slug: "orm-n-plus-one",
    track: "lld",
    category: "Class Design",
    title: "ORM N+1",
    summary:
      "Lazy-loading a collection per parent turns one list call into 1+N queries. Design fetch plans or explicit queries so a page of data is a bounded number of reads.",
    depth: "advanced",
    whyItMatters:
      "LLD sometimes includes 'how would you load this'. N+1 is the classic ORM trap: 50 orders × a query per line items. You should know why proxies cause it and how to prevent it without loading the universe.",
    theory: [
      "You load N parents (orders). Each access to `order.getLines()` fires a query if lines were lazy. That is 1+N. Add another lazy relation and it becomes 1+N+N·M. Virtual proxies make this invisible in code — the sequence diagram would show it; the class diagram would not.",
      "Fixes: join fetch / eager load the graph you need (careful of cartesian products), batch collections (where id in (...)), two queries (all orders, then all lines for those ids) and assemble in memory, or a dedicated query DTO that is not an entity graph.",
      "The domain should not depend on lazy magic. Repositories return aggregates already complete enough for the use case, or return IDs and let the application load the next aggregate. That is also how you avoid lazy-load outside a session.",
      "Pagination plus join-fetch can explode row counts. Prefer two queries for collections: page of parents, then children by parent ids.",
    ],
    howItWorks: [
      "Name the use case and the exact graph it needs.",
      "Write a repository method that loads that graph in 1–2 queries.",
      "Do not walk lazy associations in a loop in a presenter.",
      "For lists, use a DTO/query model, not a full aggregate.",
      "Measure: log query count in tests if this is real code.",
    ],
    whenToUse: [
      "Any ORM or lazy graph (also GraphQL resolvers, which have the same shape).",
      "When you list parents that have children you will display.",
    ],
    whenNotToUse: [
      "In-memory HashMap designs with no IO — mention it only if they ask about persistence.",
      "A single aggregate load by id — one query is enough if the aggregate is small.",
    ],
    complexity: {
      time: "1+N queries vs O(1) or O(2) queries for a page",
      space: "Eager graphs can be huge — fetch only what the use case needs",
      notes: "Cartesian join of two collections on one parent is another trap.",
    },
    tradeoffs: [
      "Eager fetch over-loads vs lazy N+1.",
      "DTO queries duplicate some mapping vs safe, fast reads.",
    ],
    interviewTips: [
      "If they mention JPA/Hibernate, say N+1 and 'I'll add a query that fetches lines in batch'.",
      "Connect to Proxy pattern — they like that.",
      "For BookMyShow, do not lazy-load every seat when listing movies.",
    ],
    pitfalls: [
      "Open-session-in-view as a strategy (hides N+1 until prod).",
      "Join-fetching two bags and multiplying rows.",
      "Calling a repository inside a loop.",
    ],
    practiceIdeas: [
      "Write listOrdersWithLines as two queries and assemble a map.",
      "Find an N+1 in a codebase by counting SQL in a test.",
    ],
    related: [
      "proxy-pattern",
      "repository-dao",
      "pagination-in-service-apis",
      "dto-vs-domain-vs-persistence",
      "aggregates",
    ],
  },
  {
    slug: "transactions-per-use-case",
    track: "lld",
    category: "Class Design",
    title: "Transactions per use case",
    summary:
      "Wrap one user intention (place order, transfer money, park) in one transaction or explicit saga so invariants commit together.",
    depth: "next",
    whyItMatters:
      "If reserve inventory commits and charge fails, you have a lie. The use case is the transaction boundary in LLD. Aggregates tell you how big that boundary should be.",
    theory: [
      "A use case starts, loads aggregates, tells them to change, and commits. Success means all writes of that intention persist (or all in-memory maps update) together. Failure rolls back. The application service, not the entity, opens the transaction — entities stay persistence-ignorant.",
      "One aggregate per transaction is the DDD default. If you must update two (inventory + payment record), either enlarge the boundary (carefully) or use a saga: reserve, charge, confirm; compensate on failure. In-memory, that is try/finally release.",
      "Idempotency keys should be stored in the same transaction as the effect. Outbox events (if you mention them) go in the same commit as the state change.",
      "Long transactions that include HTTP to Stripe hold locks too long. Prefer: local reserve in a short tx, charge, local confirm in another short tx, with compensation. Say this if they add a gateway.",
    ],
    howItWorks: [
      "Name the use case and the writes it must include.",
      "Open a unit of work at the service start.",
      "Load, tell, add to outbox if needed, commit.",
      "On domain Result.err, roll back without exceptions if you can.",
      "For multi-step external IO, write the reserve/confirm/compensate sequence.",
    ],
    whenToUse: [
      "Any command that updates two fields that form an invariant.",
      "Money, seats, stock, bookings.",
      "When you would otherwise 'save' inside an entity method three times.",
    ],
    whenNotToUse: [
      "Read-only queries — no write transaction, or a read-only one.",
      "A transaction around a whole HTTP request that includes user think-time.",
    ],
    tradeoffs: [
      "Large transactions: simpler invariants, more contention.",
      "Sagas: more code, better isolation from vendor latency.",
    ],
    interviewTips: [
      "Say 'ParkingService.park is the transaction: find + occupy + ticket in one unit'.",
      "For checkout: reserve inventory, charge, confirm — compensate inventory if charge fails.",
      "Do not start a transaction in a repository method that is used as a helper — the use case owns it.",
    ],
    pitfalls: [
      "Calling save() in a loop, each a transaction, breaking the invariant mid-way.",
      "Catching errors after commit with no compensate.",
      "Holding DB transactions open during payment HTTP.",
    ],
    practiceIdeas: [
      "Implement checkout with reserve/charge/confirm and a test that charge fails.",
      "In-memory UnitOfWork that commits two maps together or neither.",
    ],
    related: [
      "aggregates",
      "idempotent-ops",
      "cart-checkout",
      "payment-wallet",
      "repository-dao",
    ],
  },
  {
    slug: "repository-dao",
    track: "lld",
    category: "Class Design",
    title: "Repository and DAO",
    summary:
      "A repository speaks in domain aggregates ('get lot by id, save lot'); a DAO speaks in tables and rows. Use repositories at the domain edge; hide DAOs inside adapters.",
    depth: "core",
    whyItMatters:
      "If BookingService calls `jdbc.query(...)`, you cannot test it and you cannot swap storage. A repository interface is the LLD port everyone expects. DAOs are an implementation detail of that port.",
    theory: [
      "Repository: collection-like interface for aggregates — `findById`, `save`, `findActiveByUser`. It returns domain objects (or options). It does not expose SQL. One repository per aggregate root, not per table.",
      "DAO: thin data access, often one per table or stored procedure. Useful inside an adapter when the store is ugly. The application should not depend on DAOs. If you only have one table and a hashmap, a repository with a map inside is enough — skip the DAO word.",
      "In-memory repositories are first-class in interviews: they prove the interface and let you run the demo. Persistence adapters implement the same interface.",
      "Do not put business rules in repositories (fee calculation). Do not put query-of-everything on the aggregate repository if it is a reporting concern — a query service / read model is cleaner.",
    ],
    howItWorks: [
      "Define a repository interface next to the domain.",
      "Methods take/return aggregates or ids, not rows.",
      "Implement InMemoryXxxRepository with a Map.",
      "Optionally implement a SQL adapter that uses DAOs internally.",
      "The use case depends only on the interface.",
    ],
    whenToUse: [
      "Any design that loads or stores entities.",
      "When you need a test fake.",
      "When tables do not match aggregates 1:1.",
    ],
    whenNotToUse: [
      "Pure algorithm objects (LRU) that are the store.",
      "A repository per DTO field.",
    ],
    tradeoffs: [
      "An extra interface vs testability and swap.",
      "Generic `Repository<T>` vs explicit methods that name queries — explicit usually reads better.",
    ],
    interviewTips: [
      "Draw IParkingLotRepository and a HashMap impl. Say 'SQL later'.",
      "If they say Hibernate, the repository still exists; the DAO/session is inside.",
      "Do not inject EntityManager into a domain service.",
    ],
    pitfalls: [
      "Repositories that return maps of columns.",
      "Save() that only updates some fields and breaks invariants.",
      "Lazy-loading through a repository result after the session closed.",
    ],
    practiceIdeas: [
      "Library with BookRepository in-memory; add a second impl that serializes to JSON.",
      "Split OrderRepository from OrderLineDao; only the adapter sees the DAO.",
    ],
    related: [
      "solid-dip",
      "aggregates",
      "dto-vs-domain-vs-persistence",
      "fakes-vs-mocks",
      "orm-n-plus-one",
    ],
  },
  {
    slug: "dto-vs-domain-vs-persistence",
    track: "lld",
    category: "Class Design",
    title: "DTO vs domain vs persistence",
    summary:
      "Three models, three jobs: DTOs travel, domain objects rule, persistence models store. Map between them; do not make one class wear all three hats unless the app is trivial.",
    depth: "next",
    whyItMatters:
      "A single `User` class with JSON annotations, Hibernate annotations, and `charge()` is how you couple a rewrite of any layer to all layers. Interviews do not need three packages, but they need you to know the hats.",
    theory: [
      "DTOs are immutable data bags shaped for a caller: API version, fewer fields, no behavior. They can be records. No invariants beyond 'schema-ish' checks.",
      "Domain objects have identity or value semantics, methods, and invariants. They do not know JSON or SQL. They are what use cases tell.",
      "Persistence models (rows, documents) match the store: extra columns, denormalized fields, surrogate keys. An adapter loads them and maps to domain. Sometimes the domain entity is simple enough to persist directly — say that you are accepting the coupling.",
      "Read models can skip domain entirely: a query DTO built from SQL for a screen. That is CQRS-lite and is fine for lists.",
    ],
    howItWorks: [
      "For a write use case: DTO → command/values → domain → persist model → store.",
      "For a read: store → persist/query → DTO. Skip domain if no rules fire.",
      "Keep mappers in the adapter layer.",
      "Do not put JsonProperty on the aggregate.",
      "Name types so the hat is obvious (ParkRequest, Ticket, TicketRow).",
    ],
    whenToUse: [
      "APIs + rules + database (or even API + rules).",
      "When the API shape will version independently of the store.",
      "When you would have sent a Hibernate proxy over the wire.",
    ],
    whenNotToUse: [
      "A 30-minute in-memory kata — domain + a request record is enough.",
      "Three models for a type with one field.",
    ],
    tradeoffs: [
      "More mapping vs independent evolution.",
      "CQRS-style read DTOs vs reuse of domain for everything (slower, leakier).",
    ],
    interviewTips: [
      "Say the three hats in one sentence, then use two in code (request + domain) if time is short.",
      "If they persist, add a row type or say the in-memory map stores the domain directly for the demo.",
      "Never return the aggregate with private lists exposed as the API.",
    ],
    pitfalls: [
      "One class, three annotation styles.",
      "Domain methods on a DTO.",
      "Persistence IDs leaking into every API as required fields on create.",
    ],
    practiceIdeas: [
      "Split UserRequest, User, UserRecord in a tiny module and write two mappers.",
      "Build a movie list DTO that is not the Movie aggregate.",
    ],
    related: [
      "mapping",
      "schema-vs-objects",
      "repository-dao",
      "boundary-validation",
      "hexagonal-architecture",
    ],
  },
  {
    slug: "mapping",
    track: "lld",
    category: "Class Design",
    title: "Mapping",
    summary:
      "Put translation between models in dedicated, boring functions or objects — not in controllers, not in entities, not in both.",
    depth: "next",
    whyItMatters:
      "Scattered `setFoo(dto.getFoo())` is how fields go missing and how timezone bugs live in three places. One mapper per boundary is DRY for knowledge of the translation.",
    theory: [
      "Mappers are adapters: they know both sides. They should not make business decisions (no fee math). They may construct values and therefore fail if the DTO cannot become a value — that is validation, and it is OK here if this is the boundary.",
      "Manual mapping is honest in interviews and for small types. Generated mapping (MapStruct) is fine in large Java apps; do not spend whiteboard time on it. Bidirectional mapping often is not symmetric — do not force a round-trip if the API omits fields.",
      "Anti-corruption mapping is when the other side is a nasty legacy model. The mapper plus the domain type protect you. Name it that if the interviewer likes DDD words.",
      "Keep mapping pure: no IO, no static clocks if you can pass them in. Test with a fixture DTO and an expected domain object.",
    ],
    howItWorks: [
      "One type (or module) per boundary: ApiMapper, RowMapper.",
      "Map fields explicitly. Do not copy a bag blindly if types differ.",
      "Construct values (Money.of) so bad data fails here.",
      "Do not map in both the controller and the repository — pick a home.",
      "When a field is added, the mapper is the checklist.",
    ],
    whenToUse: [
      "Any DTO ↔ domain or row ↔ domain translation.",
      "Integrations with vendor payloads.",
      "When you see the same five setters in two classes.",
    ],
    whenNotToUse: [
      "Identical in-memory types — identity function, no mapper class.",
      "A generic reflection mapper that hides missing fields.",
    ],
    tradeoffs: [
      "Verbose explicit maps vs magic that skips a field.",
      "A mapper per use case vs one giant mapper — split when it grows.",
    ],
    interviewTips: [
      "Write `TicketDto.from(ticket)` as a static function. That is enough ceremony.",
      "If they add a field, update the mapper in front of them — shows control.",
      "Do not map inside the entity (`toDto()`) if that couples domain to API version.",
    ],
    pitfalls: [
      "Silent defaulting of missing money to 0.",
      "Mapper that calls repositories.",
      "Bidirectional map that drops invariants on the way back.",
    ],
    practiceIdeas: [
      "Map a Stripe event payload to a PaymentResult value with tests for missing fields.",
      "Centralize User row ↔ User entity mapping and delete copies from two services.",
    ],
    related: [
      "dto-vs-domain-vs-persistence",
      "adapter-pattern",
      "dry",
      "boundary-validation",
      "schema-vs-objects",
    ],
  },
];
