import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "solid-srp",
    track: "lld",
    category: "Principles",
    title: "SOLID — Single Responsibility Principle",
    summary:
      "A class should have one reason to change: one actor, one purpose. Split when two stakeholders would edit the same file for different reasons.",
    depth: "core",
    whyItMatters:
      "SRP is how you keep a parking-lot design from becoming ParkingLotManager that prices, persists, prints tickets, and sends SMS. Interviewers add a variant; a single-purpose class absorbs it. A god class explodes.",
    theory: [
      "Uncle Bob's phrasing is about people: if the finance team and the ops team both need to change `Order`, those are two reasons. In LLD you can treat 'reason' as a change axis — pricing rules, persistence, notification, lifecycle. One class owns one axis.",
      "SRP is not 'one method' and not 'one line'. A `Reservation` that confirms, cancels, and expires is still one responsibility if all of those protect the same booking invariant. The smell is when cancel also formats an email and writes SQL.",
      "Application services (use cases) are allowed to orchestrate several collaborators. That is their one job. The failure mode is an application service that also implements pricing math and HTML. Orchestrate, do not hoard.",
      "When you split, keep the names honest. `ParkingService` parks. `FeeCalculator` prices. `TicketPrinter` prints. If you cannot name the new type, you do not yet know the responsibility.",
    ],
    howItWorks: [
      "List the actors or change axes that touch the class.",
      "If you need 'and' to describe the class, draw a cut.",
      "Move each axis behind its own type. Keep the original as the orchestrator or the entity.",
      "Give the new type the data it needs — do not leave it reaching back into a god object.",
      "Re-check invariants: they should live with the entity, not in a utility.",
    ],
    whenToUse: [
      "Any class whose comment is a list of features.",
      "When a new requirement would edit the same class as an unrelated feature.",
      "When tests for one behavior require stubbing five others.",
    ],
    whenNotToUse: [
      "Tiny types that would become three one-line classes with no independent meaning.",
      "Premature split before a second reason to change exists — YAGNI still applies.",
    ],
    tradeoffs: [
      "More types and more wiring versus a file that two teams cannot safely edit.",
      "Over-splitting creates a 'change class' for every keystroke — group by actor, not by method.",
    ],
    interviewTips: [
      "When they add SMS on park, do not open ParkingLot. Add a notifier and call it from the use case.",
      "Say 'reason to change' once so they hear the textbook, then show the split.",
      "If time is tight, keep the entity cohesive and extract services; do not extract every private method.",
    ],
    pitfalls: [
      "Anemic domain + GodService: you moved the blob, you did not apply SRP.",
      "Splitting by technical layer inside one feature until nobody can find the rule.",
      "Utils that do pricing and string join and date math.",
    ],
    practiceIdeas: [
      "Split a 150-line Library class into Catalog, LoanPolicy, and Notifier.",
      "Count reasons to change in your last service class; extract any axis that has its own tests.",
    ],
    related: [
      "separation-of-concerns",
      "coupling-cohesion",
      "solid-ocp",
      "yagni",
      "layered-architecture",
    ],
  },
  {
    slug: "solid-ocp",
    track: "lld",
    category: "Principles",
    title: "SOLID — Open/Closed Principle",
    summary:
      "Keep working code closed to modification and open to extension: add a type or a plugin, do not keep editing the same switch.",
    depth: "core",
    whyItMatters:
      "The interviewer's favorite move is 'now support X'. OCP is the difference between adding ElectricVehicle and rewriting FeeCalculator, Ticket, and Report.",
    theory: [
      "Open for extension means you can add behavior. Closed for modification means existing, tested code does not get a new `else if`. The mechanism is almost always polymorphism: a strategy, a handler in a chain, a plugin interface.",
      "OCP is not 'never touch a file'. Bug fixes and API redesigns modify. The principle targets predicted variation. If vehicle types will grow, do not hard-code them in the lot. If there will only ever be two tax rates, a condition is fine.",
      "The abstraction must be right. An `if (type)` moved into a factory is still a modification point — that can be acceptable if it is the only one. The domain flow stays closed; the registry of types stays open (or generated).",
      "Decorators and chains are OCP in the other direction: you wrap or append behavior without editing the core object. That is how you add logging, retry, and metrics to a gateway.",
    ],
    howItWorks: [
      "Name the variation (vehicle type, payment rail, elevator policy, notification channel).",
      "Put a common interface on that variation.",
      "Keep the use case talking only to the interface.",
      "Register new variants in one factory, map, or Spring/DI list.",
      "Prove it: add a variant in the interview without editing the use-case class.",
    ],
    whenToUse: [
      "Any axis the interviewer is likely to grow.",
      "Pricing, dispatch, validation rules, export formats, payment methods.",
      "When you already have two implementations and a third is coming.",
    ],
    whenNotToUse: [
      "A one-off flag that will not grow — do not invent a strategy hierarchy for `isWeekend`.",
      "When you cannot name a stable interface yet; wait for the second example.",
    ],
    tradeoffs: [
      "Indirection and more types versus a switch that every feature must remember to update.",
      "The factory/registry still changes — concentrate change there on purpose.",
    ],
    interviewTips: [
      "After the first design, say 'if you add another vehicle I will add a class, not edit the lot.' Then do it when they ask.",
      "Point at the interface as the extension point — that sentence scores.",
      "Do not claim OCP if you still have the same switch in three classes.",
    ],
    pitfalls: [
      "Interfaces that change every time you add a variant — not closed, just renamed.",
      "Config-driven `if (flag)` soup pretending to be extension.",
      "Abstracting the wrong thing (the whole Order) instead of the varying rule.",
    ],
    practiceIdeas: [
      "Add a third payment method to checkout without editing Checkout.charge.",
      "Turn a switch-based elevator scheduler into a SchedulingPolicy interface.",
    ],
    related: [
      "polymorphism",
      "strategy-pattern",
      "plugin-system",
      "solid-dip",
      "add-a-variant",
    ],
  },
  {
    slug: "solid-lsp",
    track: "lld",
    category: "Principles",
    title: "SOLID — Liskov Substitution Principle",
    summary:
      "Every subtype must honor the parent's contract: callers should not need to know which child they have.",
    depth: "core",
    whyItMatters:
      "LSP failures show up as `if (obj instanceof Penguin)` and as Squares that break Rectangle setters. Interviewers use these to see if you treat inheritance as a real contract.",
    theory: [
      "If S is a subtype of T, any program that works with T must work with S. That means: do not strengthen preconditions, do not weaken postconditions, do not throw new surprising exceptions, and do not break invariants the parent advertised.",
      "The classic Square/Rectangle problem: Rectangle lets you set width and height independently. Square cannot. If a method takes Rectangle and sets width=5, height=4, a Square will violate the caller's area expectation. Square is not a Rectangle under that contract. Model Shape with area(), or make both immutable values.",
      "Behavioral subtyping also bans no-op overrides that silently drop work (`fly()` empty on Penguin) and bans subtypes that require a wider interface (`charge` only works after you cast to `UpiPayment`).",
      "Composition sidesteps many LSP bugs: a Square has a side length; it does not pretend to be a mutable Rectangle. When you do inherit, write the parent contract first and reject children that cannot meet it.",
    ],
    howItWorks: [
      "Write the parent guarantees in words: inputs allowed, outputs promised, exceptions, invariants.",
      "For each subtype, check those four. If one fails, the hierarchy is wrong.",
      "Move the disputed method off the parent or split the parent (FlyingBird vs Bird).",
      "Prefer immutable values when mutation is what breaks substitution.",
      "Replace type tests with a richer interface or a separate strategy.",
    ],
    whenToUse: [
      "Any time you draw extends / implements.",
      "When you are tempted to throw UnsupportedOperationException in an override.",
      "When a caller starts writing instanceof to stay safe.",
    ],
    whenNotToUse: [
      "Do not force a hierarchy just to apply LSP. No inheritance, no LSP issue.",
    ],
    tradeoffs: [
      "A smaller parent interface is easier to substitute for and less convenient for callers who wanted a fat type.",
      "Immutable APIs are LSP-friendlier and less familiar to people who like setters.",
    ],
    interviewTips: [
      "If they propose Square extends Rectangle, correct it and name LSP. That is a known softball.",
      "Say 'the caller should not branch on subtype' — then remove the branch.",
      "For collections, mention that List.add on an immutable list implementation is an LSP landmine.",
    ],
    pitfalls: [
      "Overrides that ignore the argument or return null 'for now'.",
      "Children that log and swallow errors the parent would throw.",
      "Using inheritance for optional features (ReadOnlyFile extends File and disables write).",
    ],
    practiceIdeas: [
      "Redesign a bird hierarchy so fly is not on the base type.",
      "Find an UnsupportedOperationException in a codebase and replace the type split.",
    ],
    related: [
      "inheritance",
      "polymorphism",
      "has-a-is-a-uses-a",
      "interfaces-vs-abstract-classes",
      "composition-over-inheritance",
    ],
  },
  {
    slug: "solid-isp",
    track: "lld",
    category: "Principles",
    title: "SOLID — Interface Segregation Principle",
    summary:
      "Give callers small, role-shaped interfaces so implementers are not forced to stub methods they do not mean.",
    depth: "core",
    whyItMatters:
      "Fat interfaces produce fake implementers (`eat() {}` on a Robot) and force every change on every client. Segregated interfaces keep plugins honest and keep compiles narrow.",
    theory: [
      "ISP says clients should not depend on methods they do not use. A `Worker` interface with `work()` and `eat()` is wrong for a robot. Split into `Workable` and `Feedable`. The robot implements one; the human implements both.",
      "Fat interfaces also violate LSP in practice: unused methods become no-ops or exceptions. Segregation is how you keep substitution real.",
      "Role interfaces follow the caller, not the implementer. `Inventory` might be huge internally, but checkout only needs `reserve(sku, qty)` and reporting only needs `snapshot()`. Two interfaces, one class if you want.",
      "Do not explode into one-method interfaces without a caller that needs the split. ISP is driven by divergent clients, not by a method count quota.",
    ],
    howItWorks: [
      "List the clients of the interface and the methods each actually calls.",
      "If two clients use disjoint sets, split the interface along those sets.",
      "Let a concrete class implement several small interfaces.",
      "Keep default methods from re-fattening the contract.",
      "Name interfaces as roles (`Payable`, `Refundable`), not as 'IOrderManager2'.",
    ],
    whenToUse: [
      "An interface with methods some implementers leave empty.",
      "A service facade that UI, jobs, and tests each use a slice of.",
      "Plugin points: a plugin should implement a tiny contract.",
    ],
    whenNotToUse: [
      "A single client and a coherent set of methods — one interface is clearer.",
      "Splitting so finely that every call needs three types in the signature.",
    ],
    tradeoffs: [
      "More interfaces to name and document versus fewer empty methods and narrower mocks.",
      "A class implementing six roles may still be a cohesion problem — ISP does not excuse god classes.",
    ],
    interviewTips: [
      "If you draw a 12-method Repository, immediately say 'read side will only depend on OrderQueries'.",
      "When they add a read-only client, extract a query interface instead of adding flags.",
      "Pair with DIP: depend on the small interface you need.",
    ],
    pitfalls: [
      "IEverything with 40 methods and a 'Simple' implementer that throws on 30.",
      "Copy-paste interfaces that differ by one unused method.",
      "Segregating without a second client — ceremony.",
    ],
    practiceIdeas: [
      "Split a Device interface so Printer does not implement recharge().",
      "Give a repository separate read and write interfaces; point query handlers at the read one.",
    ],
    related: [
      "program-to-an-interface",
      "solid-lsp",
      "solid-dip",
      "facade-pattern",
      "plugin-system",
    ],
  },
  {
    slug: "solid-dip",
    track: "lld",
    category: "Principles",
    title: "SOLID — Dependency Inversion Principle",
    summary:
      "High-level policy should depend on abstractions; details (SQL, HTTP, SMTP) should implement those abstractions and be injected.",
    depth: "core",
    whyItMatters:
      "If BookingService constructs a MySqlBookingDao, you cannot test booking rules without a database and you cannot swap storage. DIP is what makes hexagonal/clean architecture more than a slide.",
    theory: [
      "Two rules: high-level modules should not depend on low-level modules — both depend on abstractions. Abstractions should not depend on details — details depend on abstractions. The domain names `PaymentPort.charge`; StripeAdapter implements it. The domain does not import Stripe.",
      "Inversion is about the direction of source dependencies, not about who is 'in charge' at runtime. At runtime the application service still calls the port. At compile time the service package does not see the adapter package.",
      "Constructors are the usual injection point. Factories and DI containers are how you wire the graph at the edge. Inside the domain, `new StripeClient()` is a DIP violation even if you also have an interface.",
      "Not every class needs an interface. Depend on a concrete type you own if it is stable and in-process (Money, a pure calculator). Invert at the boundaries: IO, clocks, randomness, vendors, persistence.",
    ],
    howItWorks: [
      "Find an import from domain/application into a framework or vendor package. That arrow is wrong.",
      "Define a port in the inner layer: an interface named for the capability.",
      "Implement the port in the outer layer.",
      "Construct the implementer in main / a composition root and pass it in.",
      "Tests pass a fake. Production passes the adapter. The use case file does not change.",
    ],
    whenToUse: [
      "Persistence, payments, notifications, clocks, feature flags, HTTP clients.",
      "Any design you will unit-test without IO.",
      "When you might swap MySQL for in-memory in the interview.",
    ],
    whenNotToUse: [
      "Stable in-process helpers with no IO — an interface per class is noise.",
      "One-off scripts where the 'domain' is the script.",
    ],
    tradeoffs: [
      "Extra types and a composition root versus testable, replaceable edges.",
      "Over-inversion (interface for every DTO mapper) slows reading.",
    ],
    interviewTips: [
      "Draw the arrow from adapter to port, not from service to SqlDao. Say 'dependency inversion'.",
      "Offer an in-memory repository as the first implementer so the demo runs.",
      "If they ask about frameworks, mention the composition root is the only place that knows Spring/Guice.",
    ],
    pitfalls: [
      "Interface sitting in the same file as the SQL class — the domain still depends on SQL if it imports that package.",
      "Service locator / global getBean() instead of constructor injection.",
      "Ports named after vendors (`StripeService`) — you inverted nothing.",
    ],
    practiceIdeas: [
      "Extract a Clock port so a library loan test can freeze due dates.",
      "Make ParkingLot persist through a Repository interface with a HashMap adapter.",
    ],
    related: [
      "dependency-injection",
      "hexagonal-architecture",
      "program-to-an-interface",
      "fakes-vs-mocks",
      "repository-dao",
    ],
  },
  {
    slug: "dry",
    track: "lld",
    category: "Principles",
    title: "DRY — Don't Repeat Yourself",
    summary:
      "Every piece of knowledge should have a single representation. Duplicate code is only a smell when it is the same knowledge copied.",
    depth: "core",
    whyItMatters:
      "Interview designs rot when the same fee rule lives in park(), unpark(), and report(). DRY is how a variant updates one place. Blind copy-extraction, though, couples things that only looked alike.",
    theory: [
      "Hunt's DRY is about knowledge, not keystrokes. Two loops that both iterate spots are not a violation. Two copies of 'SUV pays 20, bike pays 10' are. When the price of an SUV changes, you want one edit.",
      "The wrong DRY creates the wrong abstraction: a `process()` that takes a flag for 'booking vs cancellation' because the methods shared four lines. That function now has two reasons to change and a boolean that is really a type.",
      "Duplication is cheaper than the wrong shared type. Wait until the rules change together. Then extract a Policy, a Value, or a helper with a name that states the knowledge.",
      "In class design, DRY often means: one invariant checker, one factory, one mapping from DTO to domain — not three parallel parsers.",
    ],
    howItWorks: [
      "When you paste a rule, stop and name the knowledge.",
      "Put it in a type (Money, FeeSchedule, LoanPolicy) or a single function.",
      "Call that type from every use case that needs the rule.",
      "If two blocks look similar but change for different reasons, leave them duplicated and comment why.",
      "Delete the third copy of a mapper; generate or share one.",
    ],
    whenToUse: [
      "Business numbers, state machines, validation, and parsers that appear twice.",
      "After a variant would force you to edit the same rule in multiple methods.",
    ],
    whenNotToUse: [
      "Accidental similarity — two UIs that both have a submit button.",
      "Test code that is clearer when the setup is explicit and local.",
    ],
    tradeoffs: [
      "Shared knowledge vs coupling: every caller of the extracted type now changes together.",
      "A little duplication can keep modules independent (the rule of three).",
    ],
    interviewTips: [
      "If you write the fee table twice, catch yourself and extract FeeCalculator before they notice.",
      "If they ask you to reuse a method that almost fits, refuse and explain wrong DRY.",
      "Mention 'same knowledge' so you do not sound like a line-counter.",
    ],
    pitfalls: [
      "Utils.Common.doStuff used by unrelated features.",
      "A shared base class created only to reuse two fields.",
      "Copying class diagrams from a previous problem without re-validating rules.",
    ],
    practiceIdeas: [
      "Find a fee or tax computed in two services; extract one policy object.",
      "Undo an extraction that forced a boolean flag — split the APIs again.",
    ],
    related: [
      "kiss",
      "yagni",
      "solid-srp",
      "solid-ocp",
      "mapping",
    ],
  },
  {
    slug: "kiss",
    track: "lld",
    category: "Principles",
    title: "KISS — Keep It Simple",
    summary:
      "Choose the simplest design that meets the stated requirements and a realistic next variant — not a framework for an imaginary product.",
    depth: "core",
    whyItMatters:
      "Candidates lose LLD rounds by drawing Kafka, a plugin bus, and six design patterns for a vending machine. Simple, correct classes beat an architecture astronaut diagram you cannot code in 35 minutes.",
    theory: [
      "Simple means few concepts, obvious ownership, and a happy path you can trace on a sequence diagram in one breath. It does not mean sloppy: invariants still hold, names still mean something, and the extension point for the obvious variant is there.",
      "Complexity should be paid for by a requirement. A strategy interface is simple if they already asked for multiple fares. An event-sourced vending machine is not. KISS is the filter you run after you brainstorm patterns.",
      "The simplest concurrency story is often immutability or a single-threaded queue, not a hand-rolled lock-free ring. The simplest persistence story is a repository interface plus a map. You can say how you would grow it.",
      "KISS also applies to APIs: one method that does one thing beats a kitchen-sink `process(options)`. Simple signatures are easier to test and harder to misuse.",
    ],
    howItWorks: [
      "Restate the requirements in four bullets. Design only those plus one named extension.",
      "Prefer a list and a loop over a pattern until a second family of objects appears.",
      "Prefer a function or a strategy over a framework.",
      "Walk the main sequence aloud. If you cannot, the design is not simple enough to code.",
      "Delete any class that does not appear in that sequence or in the extension.",
    ],
    whenToUse: [
      "The first five minutes of every LLD interview.",
      "When you catch yourself adding a 7th pattern.",
      "When choosing between a lock and an immutable snapshot.",
    ],
    whenNotToUse: [
      "Do not use KISS as an excuse to skip invariants, validation, or a needed interface.",
      "Do not ignore an explicit scale/concurrency requirement to 'keep it simple'.",
    ],
    tradeoffs: [
      "A simple design may need a refactor when the third variant arrives — that is acceptable if you left a seam.",
      "Over-simple anemic classes shift complexity into procedural services.",
    ],
    interviewTips: [
      "Say 'I'll keep this in-memory and extract a repository if we persist.' That is KISS with a growth path.",
      "If they want patterns, add them when the variant appears, not in the opening diagram.",
      "Code the happy path first. Complexity in the last ten minutes looks like judgment; complexity in the first ten looks like panic.",
    ],
    pitfalls: [
      "Pattern shopping: Adapter + Facade + Proxy on one gateway.",
      "Generic 'Manager' and 'Handler' names that hide a simple verb.",
      "Building a DI container on the whiteboard.",
    ],
    practiceIdeas: [
      "Time-box a vending machine to 20 minutes with three classes and one strategy.",
      "Take an over-designed solution and delete every type that is not on the main sequence.",
    ],
    related: [
      "yagni",
      "dry",
      "lld-interview-method",
      "add-a-variant",
      "public-surface",
    ],
  },
  {
    slug: "yagni",
    track: "lld",
    category: "Principles",
    title: "YAGNI — You Aren't Gonna Need It",
    summary:
      "Do not build the distributed cache, the plugin SPI, or the fourth payment rail until the problem asks for it.",
    depth: "core",
    whyItMatters:
      "YAGNI protects interview time. You have 40 minutes. Every unused abstraction is a class you will not finish coding and a place the interviewer can poke holes.",
    theory: [
      "YAGNI comes from XP: implement what you need now. In LLD, 'now' is the requirement list you just confirmed. A seam for the likely follow-up is judgment; a microservice split for a tic-tac-toe board is not.",
      "The tension with OCP is real. OCP says leave an extension point for predicted variation. YAGNI says do not invent variation. The synthesis: if the interviewer mentioned multiple types, abstract. If they did not, write the concrete class and say where you would extract.",
      "Configuration flags for unused features, empty hook methods, and speculative thread pools are YAGNI violations. They add paths you cannot explain.",
      "Persistence, auth, and monitoring are often YAGNI in a coding LLD unless asked. Mention them in 'how this grows' instead of implementing them.",
    ],
    howItWorks: [
      "Star the requirements that are in scope. Everything else is a spoken backlog.",
      "Implement the starred items with the fewest types that keep invariants.",
      "Leave a named hook only for the follow-up you actually expect (second payment, second scheduler).",
      "When they ask 'what about scale?', answer in words, do not start drawing Kafka unless they want HLD.",
      "Delete unused parameters and interfaces before you present.",
    ],
    whenToUse: [
      "Scoping the first design pass.",
      "When a peer suggests a generic framework for a single algorithm.",
      "When you have 15 minutes left and a working happy path matters more than a cache.",
    ],
    whenNotToUse: [
      "Do not skip an invariant because it is 'future validation'.",
      "Do not ignore an explicit requirement (thread safety, undo, multiple floors).",
    ],
    tradeoffs: [
      "You may refactor live when the variant arrives — cheaper than defending unused architecture.",
      "Too much YAGNI looks unprepared; name the next extract so they see you can grow.",
    ],
    interviewTips: [
      "Keep a 'not doing today' list: auth, disk, multi-region. Say it once, they relax.",
      "If they add a variant, then apply OCP. That pairing is the round.",
      "Do not implement a connection pool for a library catalog unless they ask.",
    ],
    pitfalls: [
      "Abstract factory for one product family.",
      "Event bus in a two-class problem.",
      "Generic types with five type parameters 'for reuse'.",
    ],
    practiceIdeas: [
      "Solve parking lot twice: once over-designed, once YAGNI. Compare what the variant actually needed.",
      "In a mock interview, spend the first two minutes listing what you will not build.",
    ],
    related: [
      "kiss",
      "solid-ocp",
      "add-a-variant",
      "lld-interview-method",
      "plugin-strategy-engines",
    ],
  },
  {
    slug: "law-of-demeter",
    track: "lld",
    category: "Principles",
    title: "Law of Demeter",
    summary:
      "Talk only to your immediate friends: do not reach through getters to poke a neighbor's neighbor.",
    depth: "next",
    whyItMatters:
      "Chains like `order.getCustomer().getWallet().debit(x)` couple you to the whole object graph. When Wallet moves, half the app breaks. Demeter keeps knowledge next to the data.",
    theory: [
      "A method should only call: itself, its parameters, objects it created, and its direct fields. It should not call methods on objects returned from those calls. That is the 'only one dot' slogan — slightly wrong as a literal, right as a smell detector.",
      "The deeper point is information hiding. If Checkout knows Customer has a Wallet, Checkout owns a slice of Customer's representation. Ask Customer or Wallet to do the thing: `wallet.debit(order.total())` after you obtained the wallet from a use case that was allowed to, or `customer.charge(order)`.",
      "DTO mapping and builders will have dots. Demeter is for domain behavior, not for field projection at a boundary. Do not invent `order.customerWalletDebit` just to hide a DTO map.",
      "Law of Demeter reduces coupling and often improves cohesion: the method you add lands on the class that has the invariant.",
    ],
    howItWorks: [
      "Find getter chains in the domain. Circle them.",
      "Ask which object should own the action. Put a method there.",
      "Pass the values that method needs instead of the whole graph when possible.",
      "Keep the use case as a short script of verbs on aggregates.",
      "Allow chains in pure data mapping with a comment that this is a boundary.",
    ],
    whenToUse: [
      "Domain services that wander through entities.",
      "When a unit test needs a deep fixture to call one method.",
      "When a change to Address breaks Checkout.",
    ],
    whenNotToUse: [
      "Fluent builders (`builder.withX().withY()`) — those return this, not a stranger.",
      "Projections/serializers that must read a graph.",
    ],
    tradeoffs: [
      "More methods on entities ('Tell, don't ask') versus flatter, more procedural code.",
      "A method on Customer that only forwards to Wallet can become a middle-man — then the use case should talk to Wallet directly.",
    ],
    interviewTips: [
      "Rewrite one chain live and name Demeter. It is a quick competence signal.",
      "Combine with aggregates: external objects talk to the aggregate root, not to inner entities.",
      "If they want a one-liner, say 'don't call strangers'.",
    ],
    pitfalls: [
      "Train-wreck getters in the core use case.",
      "God methods on the root that just forward everything — you hid the dots, not the coupling.",
      "Passing entire objects 'to avoid primitives' and then chaining inside.",
    ],
    practiceIdeas: [
      "Refactor cart.getUser().getAddress().getZip() into a shipping policy that takes a Zip value.",
      "In a hotel design, forbid Room access except through Hotel or Reservation.",
    ],
    related: [
      "tell-dont-ask",
      "coupling-cohesion",
      "aggregates",
      "encapsulation",
      "ownership",
    ],
  },
  {
    slug: "tell-dont-ask",
    track: "lld",
    category: "Principles",
    title: "Tell, don't ask",
    summary:
      "Command objects to do work instead of pulling their data out and deciding for them.",
    depth: "next",
    whyItMatters:
      "Ask-style code is how invariants leak: `if (spot.isFree()) spot.setVehicle(v)`. The spot did not get a chance to refuse. Tell-style `spot.park(v)` keeps the rule inside the object.",
    theory: [
      "Asking is querying fields and branching outside. Telling is sending a command that the object interprets. Commands can still return results (`park` may return a Ticket or an error). The point is that the decision that protects the object lives with the object.",
      "This is the behavioral twin of encapsulation. Getters are not evil — reporting UIs must ask. They become a smell when the asker then writes back. That is feature envy: the logic wishes it were on the other class.",
      "Tell-don't-ask pairs with Demeter. You do not ask a chain for data; you tell the right owner. It also pairs with Command pattern when the tell is queued, logged, or undone.",
      "Over-telling produces objects that know the whole use case (`spot.parkAndChargeAndNotify`). Tell the entity its state change; let an application service sequence the rest.",
    ],
    howItWorks: [
      "Find if/get/set triplets. Fold them into a method on the data owner.",
      "Name the method as a domain verb.",
      "Return a result or throw; do not require the caller to re-check the same invariant.",
      "Keep queries (`isFull`, `balance`) for genuine questions; do not use them as the only API for change.",
      "Put multi-object orchestration in a use case, telling each entity in turn.",
    ],
    whenToUse: [
      "Any mutation that has a rule.",
      "When you see feature envy in a service class.",
      "State machines: tell the machine `onGreen()`, do not set enum fields from outside.",
    ],
    whenNotToUse: [
      "Reporting, DTOs, and views — those ask.",
      "When the decision genuinely spans two aggregates; the application service must coordinate (and still tell each root).",
    ],
    tradeoffs: [
      "Fatter entities versus fatter services. Prefer slightly fatter entities for their own invariants.",
      "Harder to do purely functional pipelines — you can still tell an immutable object to return the next value.",
    ],
    interviewTips: [
      "Replace setStatus with domain verbs on the whiteboard: confirm, cancel, expire.",
      "If they want a service layer, keep it as a script of tells, not a script of gets.",
      "Name the principle if you fix a getter/set pair — easy points.",
    ],
    pitfalls: [
      "Public setters 'and also' a park() method. Callers will use the setters.",
      "Entities that tell everyone else (Spot sends email). That is not tell-don't-ask; that is a god object.",
      "Boolean query used as a lock: `if (canPark) park` has a race — tell park() to be atomic.",
    ],
    practiceIdeas: [
      "Rewrite an ATM service that gets balance, subtracts, sets balance into account.withdraw(amount).",
      "Convert a traffic light that sets enum from the controller into light.tick(now).",
    ],
    related: [
      "law-of-demeter",
      "encapsulation",
      "command-pattern",
      "invariants",
      "state-pattern",
    ],
  },
  {
    slug: "fail-fast",
    track: "lld",
    category: "Principles",
    title: "Fail fast",
    summary:
      "Reject bad input and broken invariants at the earliest boundary so you never store or act on a half-valid object.",
    depth: "core",
    whyItMatters:
      "A booking with a negative guest count that fails at payment time is a worse design than a constructor that refused it. Fail-fast keeps the rest of the system simple because it may assume the object is legal.",
    theory: [
      "Fail-fast is a validation and invariant strategy: check preconditions at the edge (API, factory, constructor) and abort with a clear error. Inside the domain, assert invariants after each mutation. Late failure mixes bad data with good and makes rollback harder.",
      "This is the opposite of 'tolerant reader' at a distant boundary. Be tolerant when reading old persisted events you cannot change. Be strict when accepting a new command. Interviews almost always want the strict side.",
      "Fail-fast also applies to dependency wiring: if a port is null, crash at startup, not on the first request. For concurrency, fail-fast locks (tryLock + error) beat silent stalls when a timeout is a requirement.",
      "Pair with good error types. Failing fast with a thrown `RuntimeException('bad')` is worse than a `ValidationError` that names the field. The principle is when, not how sloppy.",
    ],
    howItWorks: [
      "Validate shape and ranges at the application boundary before you build domain objects.",
      "Put invariant checks in constructors and mutators; throw or return a Result immediately.",
      "Do not 'fix' bad input silently (clamping a negative quantity to 0) unless the product says so.",
      "Fail startup if required collaborators are missing.",
      "In sequences with side effects, validate everything you can before the first side effect.",
    ],
    whenToUse: [
      "Constructors of values and aggregates.",
      "APIs, config loaders, and parsers.",
      "Any operation that would otherwise leave a store inconsistent.",
    ],
    whenNotToUse: [
      "Reading legacy data you must still display — migrate or tolerate, then refuse new writes.",
      "Best-effort telemetry where dropping a bad event is correct.",
    ],
    tradeoffs: [
      "Stricter APIs vs more error handling at the edge — that is the right place to handle them.",
      "Failing before side effects may need two-phase checks (availability then charge).",
    ],
    interviewTips: [
      "Show a constructor that throws on empty plate or negative price. It takes ten seconds and looks senior.",
      "For payments, say 'validate, then reserve, then charge, then confirm' — fail before charge when you can.",
      "Distinguish validation errors from infrastructure errors in the signature.",
    ],
    pitfalls: [
      "Catching exceptions and returning null.",
      "Validating only in the UI, not in the domain.",
      "Continuing after a failed step and logging 'TODO'.",
    ],
    practiceIdeas: [
      "Write Money.of(amount, currency) that rejects non-positive amounts and blank currency.",
      "Add a config loader that refuses to boot if a required key is missing.",
    ],
    related: [
      "invariants",
      "boundary-validation",
      "errors-vs-results",
      "identity-vs-value-objects",
      "config-loader",
    ],
  },
  {
    slug: "separation-of-concerns",
    track: "lld",
    category: "Principles",
    title: "Separation of concerns",
    summary:
      "Split software along axes that change independently: UI, use cases, domain rules, and infrastructure should not share a file.",
    depth: "core",
    whyItMatters:
      "SoC is the umbrella over SRP, layers, and hexagonal ports. If you can change how you store a booking without changing how you price it, you separated concerns. Interview designs that mix System.out, HashMap, and fee math in one class have not.",
    theory: [
      "A concern is a theme of change: presentation, authorization, domain policy, persistence, messaging. Separation means each module can be reasoned about with one extra concern in your head, not five.",
      "Technical layers are one cut. Domain slices (billing vs catalog) are another. Good systems use both: a vertical feature still has an inner domain and an outer adapter. Clean/hexagonal architecture is SoC with a rule about dependency direction.",
      "Cross-cutting concerns (logging, transactions, auth) do not belong copied into every class. Use decorators, interceptors, or a thin application wrapper. Do not let them become the core of the domain object.",
      "Over-separation yields a class per line and a folder of interfaces nobody reads. Separate when two concerns have already gotten in each other's way, or when the interview explicitly includes persistence plus rules.",
    ],
    howItWorks: [
      "Name the concerns in the problem: rules, state, IO, UI, concurrency.",
      "Assign each to a type or layer. Draw arrows only inward toward the domain.",
      "Keep frameworks in adapters. Keep rules in entities and policies.",
      "Let use cases orchestrate. They may know several concerns as steps, not as implementations.",
      "Re-check: can you test the rule with no IO? If not, you have not separated.",
    ],
    whenToUse: [
      "Every design that includes both a rule and a store.",
      "When a UI change keeps breaking business tests.",
      "When you introduce logging/transactions — wrap, do not embed.",
    ],
    whenNotToUse: [
      "A 40-line kata with one class — mention the cut, do not build four packages.",
      "Splitting a cohesive invariant across layers so nobody owns it.",
    ],
    tradeoffs: [
      "More files and mapping vs independent change and tests.",
      "Use cases that become pass-throughs if you over-layer a tiny app.",
    ],
    interviewTips: [
      "Sketch three boxes: API / application / domain+policies, and infra off to the side. That is SoC in 20 seconds.",
      "If they do not ask for persistence, keep a repository interface and a map — the cut is visible, the code is short.",
      "Name SRP for classes and SoC for layers so you sound precise.",
    ],
    pitfalls: [
      "Domain objects importing SQL types.",
      "Controllers with business rules.",
      "A 'common' module that re-merges every concern.",
    ],
    practiceIdeas: [
      "Take a single-file ATM and split domain, service, and in-memory vault.",
      "Add logging as a decorator around a gateway without touching the gateway.",
    ],
    related: [
      "solid-srp",
      "layered-architecture",
      "hexagonal-architecture",
      "clean-architecture",
      "coupling-cohesion",
    ],
  },
  {
    slug: "program-to-an-interface",
    track: "lld",
    category: "Principles",
    title: "Program to an interface",
    summary:
      "Write use cases against contracts (ports, roles, collections) so you can swap implementations without editing the policy.",
    depth: "core",
    whyItMatters:
      "This is the working habit behind DIP, Strategy, and testability. If Checkout holds a `StripeClient`, you cannot fake payments. If it holds a `PaymentMethod`, you can.",
    theory: [
      "The GoF advice is: do not pin your code to a concrete class when a contract will do. The contract can be a Java interface, an abstract class, or a simple function type. What matters is that the caller cannot see fields or extra methods it should not use.",
      "Programming to an interface is not 'one interface per class'. It is choosing the type of the variable and the constructor parameter to be the role. `List` not `ArrayList` unless you need ArrayList's random-access extra. `Lock` not `ReentrantLock` unless you need its tryLock flavor at the call site.",
      "In LLD, declare fields as `FeePolicy`, `Repository`, `Clock`. Construct concretes in factories. That single habit makes OCP and testing cheap.",
      "A concrete class you own and that is stable (a value object) can be the type. Interfaces are for replaceable behavior and boundaries, not for Money.",
    ],
    howItWorks: [
      "For each collaborator, ask if a second implementation is realistic (test fake, second vendor, second algorithm).",
      "If yes, name a role interface and type the field as that role.",
      "Construct the concrete at the edge.",
      "Keep extra concrete methods off the caller's path so they do not lock you in.",
      "Use the narrowest interface the caller needs (ISP).",
    ],
    whenToUse: [
      "Injected services, policies, repositories, channels, schedulers.",
      "Collections and Java/Go standard library types.",
      "Plugin and strategy engines.",
    ],
    whenNotToUse: [
      "Values, IDs, and one-off private helpers.",
      "When the 'interface' would be a clone of a single final class you will never replace.",
    ],
    tradeoffs: [
      "A bit more indirection vs the ability to add a variant and a test fake.",
      "Discoverability: 'who implements this?' needs a good name and a factory.",
    ],
    interviewTips: [
      "Type your fields as interfaces on the diagram. Interviewers read that as seniority.",
      "When they ask for a second algorithm, you already programmed to the interface.",
      "Say you would still new ArrayList inside a method — that is fine; the variable can still be List.",
    ],
    pitfalls: [
      "IUserService matching UserService 1:1 with no other implementer and no test fake.",
      "Returning concrete types from factories so callers recouple.",
      "Interfaces in the wrong package so the domain still imports the adapter.",
    ],
    practiceIdeas: [
      "Change a service field from MySqlRepo to OrderRepository and add an in-memory impl.",
      "Rewrite a notification sender to take Channel instead of SmtpClient.",
    ],
    related: [
      "solid-dip",
      "solid-isp",
      "strategy-pattern",
      "dependency-injection",
      "fakes-vs-mocks",
    ],
  },
];
