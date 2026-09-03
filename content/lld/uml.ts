import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "class-diagrams",
    track: "lld",
    category: "UML & Modeling",
    title: "Class diagrams",
    summary:
      "A class diagram is the map of types, fields, methods, and relationships you will actually code — not a poster of every noun in the problem.",
    depth: "core",
    whyItMatters:
      "Interviewers read your class diagram to judge whether you understand ownership, multiplicity, and APIs. A good diagram is a contract for the next 30 minutes of coding; a bad one is a pile of Manager boxes.",
    theory: [
      "Show the types that hold invariants and the types that vary. Each box needs a short name, the fields that matter, and the public methods you will implement. Skip getters unless they are the API. Visibility (+ public, − private, # protected) is worth marking on the few fields that must stay hidden.",
      "Relationships carry the design: inheritance (hollow triangle), implementation (dashed triangle), composition (filled diamond), aggregation (hollow diamond), and directed association (arrow). Multiplicity (1, 0..1, *) belongs on the association ends. If you cannot write multiplicity, you do not know the data structure yet.",
      "Do not model every DTO and every enum unless they affect behavior. Do model the ports (interfaces) the domain depends on. A diagram with only concrete SQL classes tells the interviewer you did not invert dependencies.",
      "Keep the diagram at one level of zoom. If you need to show a state machine or a call order, that is a different picture. The class diagram answers 'what exists and how it is tied together'.",
    ],
    howItWorks: [
      "List candidate types from nouns, then drop the ones that are just fields or synonyms.",
      "For each keeper, write 2–5 methods that are verbs, not setX.",
      "Draw has-a / is-a / uses-a with multiplicity. Pick an owner for every bidirectional link.",
      "Mark interfaces and which class implements them.",
      "Walk one use case on the diagram. If a needed type is missing, add it; if a type is never touched, delete it.",
    ],
    whenToUse: [
      "The first artifact in an LLD interview after requirements.",
      "When a teammate needs to see ownership before a refactor.",
      "When you are about to write a lot of classes and need a checklist.",
    ],
    whenNotToUse: [
      "As a substitute for a sequence diagram when the question is about call order or locking.",
      "Generating 40 boxes from a noun list without methods.",
    ],
    tradeoffs: [
      "Too much detail freezes you; too little leaves APIs vague. Aim for implementable, not encyclopedic.",
      "Composition vs aggregation diamonds: if you hesitate, write 'owns' or 'refs' and move on.",
    ],
    interviewTips: [
      "Talk while drawing. Silence plus a huge diagram looks like stalling.",
      "Write method signatures with argument types — `park(Vehicle): Ticket` is a design, `park()` is a wish.",
      "Leave room to add a strategy interface; you will need the space when they add a variant.",
    ],
    pitfalls: [
      "Every class named *Manager or *Helper.",
      "Missing multiplicity — then you cannot choose List vs optional vs Map.",
      "Bidirectional arrows everywhere and no owner.",
    ],
    practiceIdeas: [
      "Draw parking lot in eight boxes with methods and multiplicities, then code from only that picture.",
      "Redline a messy diagram: delete any class that has no method and no relationship that matters.",
    ],
    related: [
      "has-a-is-a-uses-a",
      "sequence-diagrams",
      "nouns-to-classes",
      "public-surface",
      "lld-interview-method",
    ],
  },
  {
    slug: "sequence-diagrams",
    track: "lld",
    category: "UML & Modeling",
    title: "Sequence diagrams",
    summary:
      "Show objects across the top and time downward so a use case's calls, returns, and created objects are obvious.",
    depth: "core",
    whyItMatters:
      "Class diagrams hide order. Most interview bugs — charge before reserve, notify before commit, lock in the wrong place — are sequence bugs. Drawing the happy path (and one failure) proves the API works.",
    theory: [
      "Each vertical line is a lifeline: an object or actor. Arrows are messages. A filled arrow is a synchronous call; a dashed return is the result. Activation bars show when an object is busy. Create messages show `new`. Self-calls show a method using its own helper.",
      "You do not need perfect UML. You need the objects that participate, the order of verbs, and what is returned. Alt/if boxes are worth it for payment failure or a full lot. Loops are worth it for 'assign next spot'.",
      "A sequence diagram is also an API review. If A needs five getters from B to do one job, the diagram will look like a staircase of asks — that is your cue to apply tell-don't-ask.",
      "For concurrency, you can show two lifelines and a note on the lock, or a queue between producer and consumer. Do not pretend a sequence diagram is a timing proof; it is a story.",
    ],
    howItWorks: [
      "Pick one use case (park a car, place an order, request an elevator).",
      "Put the actor and the application service first, then the entities and ports they touch.",
      "Draw the happy path with return values (Ticket, error).",
      "Add one failure alt: payment declined, no spot, door timeout.",
      "Adjust class methods until the diagram has short verbs and no getter chains.",
    ],
    whenToUse: [
      "After the class diagram, before you code the main feature.",
      "Any flow with three or more objects or a side effect (pay, persist, notify).",
      "Explaining lock order or two-phase reserve-then-confirm.",
    ],
    whenNotToUse: [
      "A single-object state change — a state diagram is clearer.",
      "Trying to show the entire application in one sequence.",
    ],
    tradeoffs: [
      "Time to draw vs bugs you catch before coding. One happy path is cheap; five is a stall.",
      "Formal UML fragments vs informal numbered steps — both are fine if complete.",
    ],
    interviewTips: [
      "Narrate: 'User → ParkingService.park → Lot.findSpot → Spot.occupy → TicketFactory.' They can interrupt with a variant on a specific arrow.",
      "If you skip the diagram, at least number the steps in comments. Silent coding of a four-object dance fails often.",
      "Show where you would add a retry or a compensation (refund) as a note, not as a second full diagram, unless asked.",
    ],
    pitfalls: [
      "Lifelines that are classes, not instances — you hide multiplicity (which spot?).",
      "Missing returns so nobody knows what the caller got.",
      "A sequence that creates objects it never uses — leftover from an older design.",
    ],
    practiceIdeas: [
      "Sequence a checkout: validate, reserve inventory, charge, commit, email. Add a payment-fail alt that releases inventory.",
      "Sequence an elevator request from button press to door open, including scheduler choice.",
    ],
    related: [
      "class-diagrams",
      "tell-dont-ask",
      "lld-interview-method",
      "transactions-per-use-case",
      "use-case-state-diagrams",
    ],
  },
  {
    slug: "use-case-state-diagrams",
    track: "lld",
    category: "UML & Modeling",
    title: "Use-case and state diagrams",
    summary:
      "Use cases capture who can do what; state diagrams capture which statuses are legal and which events move them.",
    depth: "next",
    whyItMatters:
      "Many LLD problems are state machines in costume: elevator, traffic light, booking, order, ATM. If you only draw classes, you will allow Booked → Parked without paying. State diagrams make illegal transitions visible.",
    theory: [
      "A use-case diagram is an actor–goal map: Driver parks, Admin adds floors, System expires reservations. In interviews, a bullet list of actors and use cases is enough. The value is scoping — you do not design 'the whole mall' when the actor only parks and pays.",
      "A state diagram has states (rounded boxes) and events/guards on arrows. An Order might be PENDING → PAID → FULFILLED, with CANCELLED from PENDING or PAID, and a guard `if refunded`. Nested states handle 'PAID while also being packed'.",
      "States should be mutually exclusive unless you have orthogonal regions (door open + moving is usually illegal; model it as forbidden, not as two independent flags). If two flags can combine freely, you may have two machines.",
      "Use cases tell you the API; states tell you the entity methods and what they may reject. Together they replace a lot of prose.",
    ],
    howItWorks: [
      "List actors and their goals. Cross out goals out of scope.",
      "For each long-lived entity, list statuses the problem mentioned.",
      "Draw legal arrows. Name the method that fires each arrow.",
      "Write the illegal ones as rejected commands (fail fast).",
      "Implement with an explicit status enum and a transition table or State pattern — not with booleans that overlap.",
    ],
    whenToUse: [
      "Bookings, tickets, machines, games, workflows, locks, sessions.",
      "When the interviewer lists statuses or 'cannot X after Y'.",
      "Scoping a large prompt (BookMyShow, Uber) down to a few use cases.",
    ],
    whenNotToUse: [
      "CRUD with no lifecycle — a class diagram is enough.",
      "A use-case diagram as decoration with no scoping effect.",
    ],
    tradeoffs: [
      "State pattern vs a transition table: tables are simpler until behavior per state grows large.",
      "Use-case lists can become waterfall scope documents — keep them to five goals.",
    ],
    interviewTips: [
      "For elevator or traffic light, draw the state machine first. Classes fall out of the events.",
      "Say 'this command is invalid in this state' and throw/return error — that is product thinking.",
      "If they add a status, you add a node and a method, not a new boolean.",
    ],
    pitfalls: [
      "Boolean pairs (isPaid, isCancelled) that allow paid-and-cancelled-and-pending.",
      "Hidden states stored in null fields ('vehicle == null means free') without naming the state.",
      "Use cases that are actually implementation steps ('insert into DB').",
    ],
    practiceIdeas: [
      "Draw vending machine states: Idle, CollectingCoins, Dispensing, OutOfStock, Refunding.",
      "Map hotel reservation states including no-show and expiry; name each command.",
    ],
    related: [
      "state-pattern",
      "invariants",
      "fail-fast",
      "sequence-diagrams",
      "elevator",
    ],
  },
  {
    slug: "nouns-to-classes",
    track: "lld",
    category: "UML & Modeling",
    title: "Nouns-to-classes modeling",
    summary:
      "Start from nouns in the prompt, then keep only those that have identity, invariants, or behavior — the rest become fields or values.",
    depth: "core",
    whyItMatters:
      "This is the standard first modeling move. Done naively it produces a class per word (TicketPaper, ParkingFee, Amount). Done well it produces a tight vocabulary you can defend.",
    theory: [
      "Underline nouns: lot, floor, spot, vehicle, ticket, rate. Verbs become methods: park, unpark, pay. Adjectives often become subtypes or strategies: handicap spot, peak-hour rate. That is the raw material, not the design.",
      "Filter with questions. Does it have an identity (this spot vs that spot)? Entity. Is it defined by fields (₹40, 2 hours)? Value. Is it only a number of something? A field. Is it a process (checkout)? An application service. Is it an external system? A port.",
      "Synonyms collapse: 'car' and 'vehicle' may be one type with a kind. Homonyms split: 'ticket' the receipt vs 'ticket' the support case. The prompt's language is a clue, not a schema.",
      "After the filter, check verbs. If a noun has no verb and no invariant, it should not be a class. If a verb has no home, you are missing a type (often a service or a policy).",
    ],
    howItWorks: [
      "Extract nouns and verbs from the problem statement in two columns.",
      "Tag each noun: entity, value, service/port, field, or drop.",
      "Assign each verb to a type. Orphan verbs invent types.",
      "Draw the class diagram from the surviving nouns only.",
      "Re-read the prompt to catch a noun you dropped that had a rule (capacity, hours).",
    ],
    whenToUse: [
      "The first five minutes of any object-design interview.",
      "When a prompt is a long story (hotel, cinema, Uber).",
      "When you feel lost and need a checklist.",
    ],
    whenNotToUse: [
      "Pure algorithm LLDs (LRU, hashmap internals) — start from operations and complexity, not nouns.",
      "Treating the noun list as final; it is a draft.",
    ],
    tradeoffs: [
      "Fast coverage vs over-generation of types. The filter step is mandatory.",
      "Prompt language may be sloppy; you are allowed to rename.",
    ],
    interviewTips: [
      "Do this out loud: 'Spot is an entity, fee is a value, printer is a port I will skip unless asked.'",
      "They will add a noun later (EV charger). Show how it becomes a collaborator, not a rewrite.",
      "Keep the noun/verb list on the side of the board as a requirements checklist.",
    ],
    pitfalls: [
      "Class `Data`, class `Info`, class `ObjectManager`.",
      "Turning every attribute into a class (Name, Age, Count).",
      "Ignoring verbs so you get a static data model with no API.",
    ],
    practiceIdeas: [
      "Take a BookMyShow prompt and produce a tagged noun table before any boxes.",
      "Compare two people independently tagging the same parking-lot text; discuss disagreements.",
    ],
    related: [
      "entities-vs-values-vs-services",
      "class-diagrams",
      "identity-vs-value-objects",
      "lld-interview-method",
      "parking-lot",
    ],
  },
  {
    slug: "entities-vs-values-vs-services",
    track: "lld",
    category: "UML & Modeling",
    title: "Entities vs values vs services",
    summary:
      "Split the model into things with identity, values defined by data, and stateless (or injected) services that perform work.",
    depth: "next",
    whyItMatters:
      "This DDD-lite split keeps you from giving Email an id and from stuffing charge() onto User as a static. Interviewers may not say 'DDD', but they notice when ids and equals are sane.",
    theory: [
      "Entities have a thread of identity: Order #1001 is itself after items change. You persist them, load them, and protect their invariants. Equality is by id. Lifecycle methods live here.",
      "Values are interchangeable when fields match: Money, Email, DateRange, Coordinate. Immutable, validated at construction, no repository of their own. They appear as fields on entities and as arguments on services.",
      "Services hold operations that do not naturally sit on one entity: charging a card, matching a driver, computing a route, sending email. Domain services are pure-ish policy; application services orchestrate; infrastructure services talk to the world. None of them need an id.",
      "Mis-classification is expensive. An entity modeled as a value loses updates. A value modeled as an entity gets a table and a lifecycle it does not deserve. A service modeled as an entity becomes a singleton with fake state.",
    ],
    howItWorks: [
      "For each type, apply the copy test and the verb test.",
      "Put ids and repositories only on entities (and aggregate roots).",
      "Put format/range checks on values.",
      "Put multi-entity or IO operations on services, injected at the edge.",
      "Keep entities from importing infrastructure services — pass results in, or orchestrate outside.",
    ],
    whenToUse: [
      "Any domain model with both data and operations.",
      "When deciding what gets a primary key.",
      "When deciding where a method goes.",
    ],
    whenNotToUse: [
      "Tiny katas with one struct — do not force three stereotypes.",
      "Calling every class a service because it has a method.",
    ],
    tradeoffs: [
      "Clear stereotypes vs extra vocabulary. In interviews, 'entity / value / service' is enough; skip bounded-context talk unless they go there.",
      "Rich entities vs application services: keep invariants on entities, workflows on services.",
    ],
    interviewTips: [
      "Annotate the diagram: (E), (V), (S). It makes your thinking visible.",
      "If they ask where to put GST calculation, that is a domain service or a policy value, not a User method.",
      "Mention you would persist entities and embed values.",
    ],
    pitfalls: [
      "Anemic entities and a 1000-line XxxService.",
      "Services that store business state in static maps.",
      "Values with setters and ids.",
    ],
    practiceIdeas: [
      "Classify every type in a hotel design. Move methods that landed on the wrong stereotype.",
      "Replace String email on User with an Email value that validates.",
    ],
    related: [
      "identity-vs-value-objects",
      "aggregates",
      "repository-dao",
      "solid-srp",
      "nouns-to-classes",
    ],
  },
  {
    slug: "aggregates",
    track: "lld",
    category: "UML & Modeling",
    title: "Aggregates (DDD-lite)",
    summary:
      "An aggregate is a cluster of entities with one root. Outsiders change the cluster only through the root so invariants that span parts stay true.",
    depth: "advanced",
    whyItMatters:
      "Without aggregates, every class is public and every service pokes LineItems and Spots directly. That is how you oversell a room or double-book a seat. The root is the transaction and consistency boundary in an LLD.",
    theory: [
      "The aggregate root is the only object others may hold a long-lived reference to. Inner entities (LineItem, Spot) are reached through the root (`order.addItem`, `lot.park`). The root loads and saves as one unit. Invariants like 'sum(items) == order.total' or 'occupied spots ≤ capacity' are checked there.",
      "References across aggregates should be by id, not by pointer. An Order holds customerId, not a live Customer graph. That keeps transactions small and avoids loading the world. If a rule needs both, an application service loads both roots and tells each.",
      "Pick roots by invariant, not by ER comfort. If a Spot's occupancy must stay consistent with a Floor's count, they are probably in the same Lot aggregate — or you accept eventual count via events. In an interview, one or two roots is usual (Lot, or Catalog + Loan).",
      "This is DDD-lite: you do not need bounded contexts and event storms on a whiteboard. You need a sentence: 'nothing mutates a spot except ParkingLot' (or Floor, if you chose that).",
    ],
    howItWorks: [
      "List invariants that mention two objects.",
      "Place those objects under one root, or accept a cross-aggregate workflow with explicit steps.",
      "Hide inner constructors. Create inners through the root.",
      "Expose only the root from repositories.",
      "Hold foreign aggregates as ids. Load them in the use case if needed.",
    ],
    whenToUse: [
      "Orders, lots, boards, carts, reservations — any cluster with a count or total.",
      "When you are about to make Spot public to the whole app.",
      "When discussing transactions: one aggregate per transaction is the default.",
    ],
    whenNotToUse: [
      "A single entity with no children — it is already a root.",
      "Giant 'Company' aggregates that include every table. Split by invariant.",
    ],
    tradeoffs: [
      "Smaller aggregates scale and lock better but push some rules into application services.",
      "Larger aggregates make invariants easy and contention high (one lot lock for all parks).",
    ],
    interviewTips: [
      "Say 'ParkingLot is the aggregate root; spots are internal.' Then do not let the controller call spot.occupy.",
      "If they ask about two lots, each is an aggregate; a Mall service coordinates.",
      "For Splitwise, Expense is a good root; User is another; balances are projections.",
    ],
    pitfalls: [
      "Repositories for every inner entity — outsiders will mutate them.",
      "Lazy-loading an entire company through the root.",
      "Circular roots that each own the other.",
    ],
    practiceIdeas: [
      "Forbid any public Spot constructor; only Lot.createSpot / Lot.park.",
      "Model Order so LineItem cannot be persisted or updated alone.",
    ],
    related: [
      "invariants",
      "ownership",
      "entities-vs-values-vs-services",
      "transactions-per-use-case",
      "repository-dao",
    ],
  },
  {
    slug: "factory-vs-constructor",
    track: "lld",
    category: "UML & Modeling",
    title: "Factory vs constructor",
    summary:
      "Constructors create one concrete type simply; factories choose, assemble, or hide creation when that job is itself a rule.",
    depth: "next",
    whyItMatters:
      "New-ing a web of objects inside a use case couples you to every concrete class and hides invariants. Knowing when to add a factory is a standard LLD judgment call.",
    theory: [
      "A constructor is the right default: `new Money(cents, currency)`, `new Ticket(id, spot, issuedAt)`. It should establish invariants and stay short. Many overloads or boolean flags on a constructor are a sign you need a factory or a builder.",
      "A factory (method, class, or abstract factory) is for: picking a subtype (`Vehicle.from(type)`), assembling a graph (`ParkingLotFactory.defaultMall()`), creating with an id generator or clock, or sharing instances (interning, flyweight). The caller depends on the product interface, not the concretes.",
      "Static factory methods (`Spot.free(id)`, `Result.ok(value)`) name the origin and can return subtypes or cached instances. They are still simple. Full Factory Method / Abstract Factory patterns are for families that grow.",
      "Builders shine when there are many optional parts and you want a valid object only at `build()`. Do not use a builder for two required fields.",
    ],
    howItWorks: [
      "If creation is `new` plus two arguments and a check, use a constructor (or a named static factory).",
      "If creation needs a switch on type, put that switch in one factory only.",
      "If creation needs collaborators (clock, id, repo), inject those into a factory class.",
      "If creation has many optionals, use a builder that validates at the end.",
      "Keep use cases calling the factory, not a stack of news.",
    ],
    whenToUse: [
      "Constructor: values and simple entities.",
      "Factory: vehicle types, notification channels, parser families, test vs prod graphs.",
      "Builder: search queries, HTTP requests, complex immutable configs.",
    ],
    whenNotToUse: [
      "Abstract Factory for a single product.",
      "A factory that is just `return new X()` with no rule — you added a hop.",
    ],
    tradeoffs: [
      "Factories hide concretes (good for OCP) and hide what was created (worse for reading).",
      "Constructors are honest but cannot return a cached instance or a subtype.",
    ],
    interviewTips: [
      "Put `Vehicle.create(type, plate)` on the board when they list car/bike/truck. That is your closed switch.",
      "For lots of setup, say 'I'd use a builder / test fixture' rather than a 12-argument constructor.",
      "Mention you never put business workflows in a factory — only creation.",
    ],
    pitfalls: [
      "God factory that also parks cars and sends email.",
      "Public constructors plus a factory, so callers bypass rules.",
      "Factories with global static state.",
    ],
    practiceIdeas: [
      "Replace `if type` inside three methods with one VehicleFactory.",
      "Build an immutable SearchFilter with a builder that rejects inverted date ranges.",
    ],
    related: [
      "factory-method",
      "abstract-factory",
      "builder-pattern",
      "invariants",
      "fail-fast",
    ],
  },
  {
    slug: "invariants",
    track: "lld",
    category: "UML & Modeling",
    title: "Invariants",
    summary:
      "An invariant is a rule that must be true for every instance, every moment after construction — the heart of encapsulation.",
    depth: "core",
    whyItMatters:
      "If you cannot name the invariants, you are drawing a database, not a design. Interviewers listen for 'a spot is never occupied without a vehicle' and then look for the method that protects it.",
    theory: [
      "Class invariants mention the object's own fields. Aggregate invariants mention several objects in the cluster. Pre- and postconditions are about a single method. You need all three: the object starts valid, each method leaves it valid, and callers see a clear failure when they ask for the impossible.",
      "Examples: Money.amount ≥ 0 and currency is ISO; DateRange.start ≤ end; ParkingLot.occupiedCount == number of occupied spots; Order.total == sum(line totals); a reservation cannot overlap another for the same room if status is ACTIVE.",
      "Invariants are not the same as validation of a DTO. DTO validation is 'the request is well-shaped'. Invariants are 'the domain cannot represent nonsense'. Reconstructing an entity from a DB row should also re-check or trust a clean store — be explicit.",
      "Concurrency is invariant preservation under interleaving. The lock, the transaction, or the actor mailbox exists so two parks cannot break capacity.",
    ],
    howItWorks: [
      "Write invariants in one-line English on the class or aggregate.",
      "Enforce them in constructors and every mutator. Prefer private helpers like `assertInvariant()`.",
      "Choose the owner: the smallest type that contains all mentioned fields.",
      "Decide failure: throw domain error or return Result — but do not leave the object broken.",
      "For multi-object rules, put them on the aggregate root or in a transaction that updates both roots deliberately.",
    ],
    whenToUse: [
      "Every entity and value you create.",
      "When adding a method — ask which invariant it could break.",
      "When explaining why a field is private.",
    ],
    whenNotToUse: [
      "Do not encode UI copy or transient display rules as invariants.",
      "Do not keep an invariant you no longer believe — delete the check.",
    ],
    tradeoffs: [
      "Checks cost a few cycles and some code; they save corrupt state.",
      "Very expensive invariants (scan all bookings) may be enforced by a store constraint or an index, with the aggregate checking what it can locally.",
    ],
    interviewTips: [
      "Write two invariants on the board before methods. It looks like you know what 'design' means.",
      "When they add a rule, add an invariant, then a method. That order is the interview.",
      "For thread safety, say which invariant the lock protects.",
    ],
    pitfalls: [
      "Invariants only in comments.",
      "Checks in the UI but not in the entity.",
      "Updating one field of a pair and checking later 'somewhere'.",
    ],
    practiceIdeas: [
      "List five invariants for a library loan system and the method that guards each.",
      "Add assertInvariant to an Order after addItem/removeItem and write a test that would fail without it.",
    ],
    related: [
      "encapsulation",
      "fail-fast",
      "aggregates",
      "ownership",
      "boundary-validation",
    ],
  },
  {
    slug: "ownership",
    track: "lld",
    category: "UML & Modeling",
    title: "Ownership",
    summary:
      "Every piece of mutable state needs one owner who may change it; everyone else holds a copy, an id, or a read view.",
    depth: "next",
    whyItMatters:
      "Double mutation is the quiet bug: Floor and Lot both decrement freeCount; a cache and a map both hold the same user. Ownership is how you explain composition, aggregates, and thread safety without waving at 'just synchronize'.",
    theory: [
      "Owner means: this object decides lifetime and writes. A ParkingLot owns Floors and Spots. A connection pool owns live connections. A parent widget owns children. When the owner dies, owned parts die (composition) or are released (pool).",
      "Shared mutable ownership is the hard case. Prefer: one writer (actor, aggregate, event loop) and many readers of snapshots; or a concurrency primitive that makes the shared object the owner of its own lock. Two writers without a protocol is a race.",
      "In APIs, ownership shows up as who closes a resource, who commits a transaction, and who stores the canonical entity. Repositories own persistence; they do not own domain rules. Callers must not keep a stale entity and write it back blindly — version or reload.",
      "Languages with move semantics make ownership explicit. In Java/TS interviews, you simulate it with unmodifiable views, private collections, and 'do not cache this entity across use cases'.",
    ],
    howItWorks: [
      "For each mutable field or collection, write the owner type on the diagram.",
      "If two types both write it, pick one or extract a new owner.",
      "Publish ids or immutable snapshots to non-owners.",
      "At boundaries, document who closes/commits (try-with-resources, use-case transaction).",
      "In threads, the owner is the lock holder or the actor; do not leak the mutable object.",
    ],
    whenToUse: [
      "Composition decisions, caches, pools, graphs of entities.",
      "Any concurrency design.",
      "When you see two services updating the same map.",
    ],
    whenNotToUse: [
      "Immutable values — everyone can 'own' a copy.",
      "Read-only reference data loaded once.",
    ],
    tradeoffs: [
      "Single owner simplifies reasoning and can become a bottleneck (one lot lock).",
      "Shared ownership needs versions, locks, or CRDTs — say which.",
    ],
    interviewTips: [
      "Sentence: 'Lot owns spots; the controller never keeps a Spot.' Then show park() only on Lot.",
      "For caches, say who owns eviction: the cache object, not the callers.",
      "If they add threads, first name the owner of each mutable map.",
    ],
    pitfalls: [
      "Returning the live list of spots.",
      "Two aggregates pointing at each other and both updating the link.",
      "A static Map used as a 'convenient' store with no owner.",
    ],
    practiceIdeas: [
      "Audit a connection pool: only the pool calls close on idle connections; clients call release.",
      "Change an API that returns List<Spot> to return unmodifiable snapshots or ids.",
    ],
    related: [
      "aggregates",
      "has-a-is-a-uses-a",
      "encapsulation",
      "immutability",
      "race-deadlock-livelock",
    ],
  },
];
