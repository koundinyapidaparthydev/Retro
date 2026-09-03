import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "layered-architecture",
    track: "lld",
    category: "Architecture",
    title: "Layered architecture",
    summary:
      "Slice the app into stacked layers (UI → application → domain → infrastructure) so each layer only talks downward and you can change a layer without a rewrite.",
    depth: "core",
    whyItMatters:
      "Layering is the first architecture most LLD interviews expect. A controller that writes SQL has no layers. You do not need four packages on the board; you need arrows that only point down — and honesty about what sits in each box.",
    theory: [
      "Classic layers: presentation (HTTP, CLI), application/service (use cases), domain (entities, policies), persistence/infrastructure (SQL, SMTP). Each layer uses the one below. The domain should not import the UI. Persistence details should not leak upward as types.",
      "Strict layering forbids skipping (UI → SQL). Relaxed layering allows a skip for queries. In interviews, relaxed is fine for reads; writes should still go through use cases so transactions and invariants have a home.",
      "Layers are technical. They do not by themselves give you a good domain. A layered app can still be a transaction script with anemic objects. Combine with SRP and a real domain if rules exist.",
      "The usual failure is the 'infrastructure leak': a SQL Exception or a ResultSet in the controller, or the domain depending on Spring annotations to work. Keep frameworks at the edges.",
    ],
    howItWorks: [
      "Draw 3–4 boxes. Place types into them.",
      "Check imports: no upward arrows.",
      "Put use-case methods on the application layer.",
      "Put invariants on the domain layer.",
      "Put SQL/HTTP clients at the bottom (or side) and only call them from application/adapters.",
    ],
    whenToUse: [
      "CRUD+rules apps, interview defaults, monoliths.",
      "When you need a simple picture before hexagonal/clean.",
    ],
    whenNotToUse: [
      "A 50-line kata — mention layers, do not create four folders.",
      "When the interesting split is by subdomain (billing vs catalog), not by technique — still layer inside each.",
    ],
    tradeoffs: [
      "Clear default vs the domain depending on a persistence interface that lives in the wrong layer (DIP fixes this — see hexagonal).",
      "Skipping layers for speed vs losing a home for transactions.",
    ],
    interviewTips: [
      "Three boxes is enough: API, ParkingService, Lot+policies, and a side box for repos.",
      "If they ask 'clean architecture?', upgrade the picture: domain in the middle, infra implements ports.",
      "Do not draw eight layers. It looks like a textbook dump.",
    ],
    pitfalls: [
      "Business rules in controllers or repositories.",
      "Every class named *Service in one layer — you just renamed the god class.",
      "Circular calls: domain → service → domain.",
    ],
    practiceIdeas: [
      "Split a single-file ATM into controller, service, domain, and map vault.",
      "List illegal imports in a sample project and invert them.",
    ],
    related: [
      "separation-of-concerns",
      "hexagonal-architecture",
      "clean-architecture",
      "solid-dip",
      "repository-dao",
    ],
  },
  {
    slug: "hexagonal-architecture",
    track: "lld",
    category: "Architecture",
    title: "Hexagonal architecture",
    summary:
      "Put the domain in the center, talk to the world through ports, and keep adapters (HTTP, SQL, SMTP) on the outside pointing inward.",
    depth: "next",
    whyItMatters:
      "Hexagonal (ports and adapters) is how DIP looks on a whiteboard. It is the right story when they ask 'how do you test this' or 'swap Stripe for PayPal'. You can sketch it in 30 seconds and then code only the hexagon plus one adapter.",
    theory: [
      "The application core contains domain objects and use cases. Driving adapters (HTTP controller, CLI, test) call inbound ports (use-case interfaces). Driven adapters (SQL repo, payment SDK, clock) implement outbound ports the core defined. All source dependencies point inward.",
      "Ports are interfaces named in domain language (`PaymentPort`, `BookingRepository`, `Clock`). Adapters are replaceable. Tests are just another driving adapter using fakes for driven ports.",
      "This is not a hexagon-shaped package ritual. Two ports and two adapters already count. If you have no IO, you do not need the picture.",
      "Compared to layers: hexagonal is explicit about inversion. The persistence interface lives in the core, not in the infrastructure layer. Infrastructure depends on core, never the reverse.",
    ],
    howItWorks: [
      "Write the use case against ports only.",
      "Define outbound ports for each IO or volatile detail (time, ids, random).",
      "Implement adapters in other files/packages.",
      "Wire in a composition root (main).",
      "Drive the use case from a test with fakes — that proves the hexagon.",
    ],
    whenToUse: [
      "Apps with IO, vendors, and tests.",
      "When you must swap a driven dependency.",
      "When teaching DIP without the word 'Spring'.",
    ],
    whenNotToUse: [
      "Algorithms and in-memory puzzles with no edge.",
      "Drawing six adapters you will not implement.",
    ],
    tradeoffs: [
      "More interfaces vs a testable core.",
      "Over-porting (interface for every function) vs under-porting (core calls `new Date()`).",
    ],
    interviewTips: [
      "Say 'ports and adapters' and draw one inbound and two outbound. Enough.",
      "Offer InMemoryRepository as the driven adapter for the demo.",
      "Clock as a port is a high-signal detail for bookings and rate limits.",
    ],
    pitfalls: [
      "Ports named after vendors.",
      "Adapters that contain the business rules.",
      "Core importing Spring or Express types.",
    ],
    practiceIdeas: [
      "Checkout core with PaymentPort and InventoryPort; fake both in a unit test.",
      "Replace `Date.now()` with a Clock port in a library loan.",
    ],
    related: [
      "solid-dip",
      "clean-architecture",
      "layered-architecture",
      "dependency-injection",
      "fakes-vs-mocks",
    ],
  },
  {
    slug: "mvc-mvvm",
    track: "lld",
    category: "Architecture",
    title: "MVC and MVVM",
    summary:
      "Separate what the user sees from application state: controllers/presenters handle input; views render; models hold rules — MVVM adds a bindable view-model.",
    depth: "next",
    whyItMatters:
      "UI-heavy LLD (or 'design a client') still shows up. If your JButton action performs SQL, you failed MVC. You do not need Android on the board; you need a place for view state vs domain state.",
    theory: [
      "MVC: View renders and forwards input; Controller interprets input and tells the Model; Model holds data/rules and notifies (Observer) the View. Variants disagree on whether the View reads the Model directly. In web MVC, the 'controller' returns a DTO and the template is the view.",
      "MVVM: the View-Model exposes bindable properties and commands for the View. The View is 'dumb' (data bindings). The View-Model talks to services/models. Good for rich clients; easy to test the VM without rendering.",
      "Neither replaces domain design. A fat controller/VM that prices tickets is still a god class. Keep the model (or a use case) in charge of rules. The UI pattern is about input/output, not about parking invariants.",
      "MVP (presenter owns the view interface) is a sibling — useful if you want the UI fully mocked. Mention only if they care.",
    ],
    howItWorks: [
      "Put domain rules in a model or use case, not in click handlers.",
      "Controller/VM: map UI events to use-case calls, map results to view state.",
      "View: render state, no SQL, no fees.",
      "Use Observer/binding so the view updates when the model changes.",
      "Keep view state (selected tab) out of the domain model.",
    ],
    whenToUse: [
      "Desktop/mobile UI, web request/response, dialog-heavy tools.",
      "When they ask to design a client for your parking/hotel system.",
    ],
    whenNotToUse: [
      "Backend-only LLD — say 'controller is a driving adapter' and move on.",
      "Over-applying MVVM bindings in a one-page CLI.",
    ],
    tradeoffs: [
      "MVC is familiar; controllers tend to bloat.",
      "MVVM tests well; bindings can hide flow.",
      "Both need discipline to keep rules out of the UI layer.",
    ],
    interviewTips: [
      "If the problem is a UI, draw View / VM-or-Controller / Model. If it is a service, do not force MVC.",
      "Connect Observer to 'the seat map refreshes when someone books'.",
      "Do not spend time on UI toolkit widgets.",
    ],
    pitfalls: [
      "Business logic in event handlers.",
      "Model that imports Swing/React.",
      "View-Model that is a second domain.",
    ],
    practiceIdeas: [
      "Tic-tac-toe: Board model, a VM with cells[], a view that binds clicks to place(i).",
      "Refactor a form onClick that computes tax into a use case + VM.",
    ],
    related: [
      "observer-pattern",
      "mediator-pattern",
      "hexagonal-architecture",
      "separation-of-concerns",
      "tic-tac-toe",
    ],
  },
  {
    slug: "clean-architecture",
    track: "lld",
    category: "Architecture",
    title: "Clean architecture",
    summary:
      "A dependency rule: source code points inward toward entities. Use cases wrap entities; interface adapters translate; frameworks are the outermost detail.",
    depth: "advanced",
    whyItMatters:
      "Clean architecture is hexagonal with Uncle Bob's concentric names. Interviewers drop the phrase; they want the dependency rule and a use-case layer, not a 20-circle tattoo.",
    theory: [
      "Entities (enterprise rules) sit in the middle. Use cases (application rules) depend on entities and on ports they declare. Interface adapters (controllers, presenters, gateways) implement those ports and convert DTOs. Frameworks and drivers (web, DB) are plugins.",
      "The dependency rule is the whole trick: an inner circle never imports an outer type. Data that crosses a boundary is simple (primitives, DTOs), not a SQL row. That is why mapping exists.",
      "You do not need four physical circles in a parking-lot interview. You need: entities + one use case + a controller + a repo adapter. If someone asks 'is this clean?', the test is 'can I test the use case with fakes and no Spring'.",
      "Clean architecture does not mean more classes than features. A use case per verb is enough; do not create InputBoundary/OutputBoundary/Interactor/Presenter for a 40-minute round unless they want the ritual.",
    ],
    howItWorks: [
      "Write entities with invariants.",
      "Write a use case that depends on entity types + ports.",
      "Implement ports in adapters.",
      "Keep framework annotations out of entities and use cases.",
      "Test the use case with fakes.",
    ],
    whenToUse: [
      "When they name it, or when the system has real enterprise rules plus IO.",
      "When you must keep a domain alive across a framework rewrite.",
    ],
    whenNotToUse: [
      "Drawing all four rings for tic-tac-toe.",
      "Renaming every class to Interactor without inverting dependencies.",
    ],
    tradeoffs: [
      "Independence from frameworks vs ceremony and mapping.",
      "Many use-case classes vs a smaller application service facade.",
    ],
    interviewTips: [
      "Say 'dependency rule: inward only' and draw two rings. Then code.",
      "If they want the full vocabulary, use Entity / UseCase / Presenter / Gateway once.",
      "Pair with testing-as-design: the first client of the use case is a test.",
    ],
    pitfalls: [
      "Entities with JPA annotations 'because clean'.",
      "Use cases that only delegate to a repository with no rule — empty ceremony.",
      "Circles with no ports — you drew a layer cake and called it clean.",
    ],
    practiceIdeas: [
      "PlaceOrder use case with no framework imports; controller and SQL live outside.",
      "Rewrite a Spring service that uses EntityManager into a use case + adapter.",
    ],
    related: [
      "hexagonal-architecture",
      "layered-architecture",
      "solid-dip",
      "testing-as-design",
      "dto-vs-domain-vs-persistence",
    ],
  },
  {
    slug: "plugin-strategy-engines",
    track: "lld",
    category: "Architecture",
    title: "Plugin and strategy engines",
    summary:
      "Make a closed core that runs a pipeline and an open set of plugins/strategies loaded from a registry so features ship without editing the engine.",
    depth: "advanced",
    whyItMatters:
      "Pricing engines, lint rules, payment rails, and chess AIs want this shape. It is OCP at system scale: the engine is closed; the catalog of plugins is open. Interview 'plugin system' designs are this plus a loader.",
    theory: [
      "The engine owns the sequence (validate → quote → authorize → capture) and calls registered plugins at explicit extension points. Each plugin implements a small interface (ISP). A registry maps name/condition → plugin. Config chooses which are active.",
      "Discovery can be hardcoded (interview default), classpath, or a config file. Sandbox and versioning are real-product concerns — mention, do not build. Fail a plugin without killing the engine unless it is on the critical path.",
      "Strategy engines are the single-hook version: one strategy per decision. Plugin engines often have many hooks and many plugins per hook (Chain of Responsibility / pipeline).",
      "Stability of the plugin interface is the product. Changing a hook signature breaks everyone — version the SPI.",
    ],
    howItWorks: [
      "Define tiny hook interfaces with documented guarantees.",
      "Engine calls hooks; it does not import plugin concretes.",
      "Registry loads and orders plugins.",
      "Isolate failures (try/catch per plugin) where the product allows.",
      "Add a plugin by registering, not by editing the engine.",
    ],
    whenToUse: [
      "Multiple rules/rails/formatters that grow independently.",
      "Products that third parties extend.",
      "Interview prompts that say 'plugin', 'rules engine', or 'extensible'.",
    ],
    whenNotToUse: [
      "Two hardcoded strategies — a constructor parameter is enough.",
      "When the sequence itself is unknown — you need a workflow engine, which is a bigger beast.",
    ],
    tradeoffs: [
      "Extensibility vs implicit behavior (which plugin ran?).",
      "Isolation vs the inability of plugins to share transactional state unless you design it.",
    ],
    interviewTips: [
      "For 'support new payment later', a registry of PaymentMethod plus a factory is the engine.",
      "Draw Engine, Hook, Registry, PluginA/B. Main sequence: engine.run → hook.list → each plugin.",
      "Mention config-driven enablement if they want ops flavor.",
    ],
    pitfalls: [
      "Engine that switches on plugin name anyway.",
      "Fat plugin interface (ISP violation).",
      "Plugins that call back into private engine guts.",
    ],
    practiceIdeas: [
      "Checkout engine with TaxPlugin and DiscountPlugin lists.",
      "A linter that loads Rule plugins and reports all findings.",
    ],
    related: [
      "plugin-system",
      "strategy-pattern",
      "solid-ocp",
      "chain-of-responsibility",
      "config-loader",
    ],
  },
  {
    slug: "testing-as-design",
    track: "lld",
    category: "Architecture",
    title: "Testing as design",
    summary:
      "If a use case is hard to test, the design is wrong: missing ports, hidden new, time bombs, or a god class. Let the first test drive the seams.",
    depth: "core",
    whyItMatters:
      "Interviewers ask 'how would you test this?' to see if you inverted dependencies. 'I would mock the database' is weak if the database is a static singleton. Testing-as-design means the test is a first-class client of the API.",
    theory: [
      "A good unit test builds a use case with fakes (in-memory repo, fixed clock, fake payment) and asserts a domain outcome. If you cannot do that without a container, your core depends on the outside. That is the design feedback.",
      "Tests also design the public surface: awkward setup means awkward constructors. A 20-parameter constructor wants a builder or a smaller type. A method that needs a full HTTP request wants a command object.",
      "Prefer testing behavior through the use case over testing private methods. If a private method is the interesting algorithm, it may want to be a Strategy you can test directly.",
      "You will not write a full suite on a whiteboard. You will name two tests: happy path and the last-seat race / declined card. That is enough to prove you thought about it.",
    ],
    howItWorks: [
      "Write (or name) a test that constructs the use case with fakes.",
      "Any `new ConcreteIo()` inside the core becomes a port.",
      "Any `now()` becomes a Clock.",
      "Assert on observable results (ticket, error), not on private fields.",
      "Add one concurrency or failure test that matches the risk.",
    ],
    whenToUse: [
      "Always, as a review question on your own diagram.",
      "When choosing between singleton and injection.",
      "When they ask about quality or maintenance.",
    ],
    whenNotToUse: [
      "Do not TDD theater for a 5-minute snippet if they want speed — but still leave seams.",
      "Do not unit-test DTOs with no behavior.",
    ],
    tradeoffs: [
      "More ports vs testability.",
      "Over-testing interactions (mocks) vs testing state (fakes) — prefer fakes for design feedback.",
    ],
    interviewTips: [
      "End with: 'I'd unit-test ParkingService with an in-memory lot and a fixed clock.'",
      "If they ask for a test case list, give happy, full lot, banned vehicle, double park, concurrent last spot.",
      "Say you would not mock the entity — mock the port.",
    ],
    pitfalls: [
      "Tests that only exercise mocks and never assert domain state.",
      "Hidden static time and random.",
      "Making everything public 'so I can test it'.",
    ],
    practiceIdeas: [
      "TDD a wallet debit with a fake clock and a fake ledger.",
      "Take an untestable class that news Stripe and extract a port so a test can decline a charge.",
    ],
    related: [
      "fakes-vs-mocks",
      "dependency-injection",
      "hexagonal-architecture",
      "public-surface",
      "solid-dip",
    ],
  },
  {
    slug: "dependency-injection",
    track: "lld",
    category: "Architecture",
    title: "Dependency injection",
    summary:
      "Pass collaborators in (usually via constructor) instead of constructing or locating them inside the class so the graph is visible and replaceable.",
    depth: "core",
    whyItMatters:
      "DI is the mechanical habit behind DIP. `new StripeClient()` in Checkout is the bug. A constructor that takes `PaymentPort` is the fix. You do not need a container in an interview; you need a composition root.",
    theory: [
      "Constructor injection is the default: required deps as arguments, stored in final fields. Setter injection is for optional or circular cases — avoid circles. Method injection is rare (pass a strategy into `park`). Service locator (`Context.get`) hides deps again; do not call it from the domain.",
      "The composition root (main, a small factory, or a framework) is the one place that knows concrete classes. Below that, types only see interfaces. Tests are alternate composition roots.",
      "Too many constructor args is a cohesion smell, not a DI smell. Split the class. A DI framework cannot fix a god object.",
      "DI is not the same as a framework. Guice/Spring are optional. In TS/JS, passing objects in is DI. In interviews, `new ParkingService(lot, clock, payments)` in main is full marks.",
    ],
    howItWorks: [
      "List collaborators. Put them on the constructor.",
      "Type them as interfaces if they are replaceable.",
      "new the concretes only in main/tests.",
      "Do not call a container from the domain.",
      "If the graph is deep, a factory method in main is fine.",
    ],
    whenToUse: [
      "Every service and policy object.",
      "When you need a test fake.",
      "When a clock, logger, or repo is involved.",
    ],
    whenNotToUse: [
      "Values and entities created per call (`new Money`) — those are not injected services.",
      "Injecting a container into a class.",
    ],
    tradeoffs: [
      "Visible constructors vs a bit more wiring.",
      "Framework magic vs explicit main — explicit wins on a whiteboard.",
    ],
    interviewTips: [
      "Write the constructor with three ports. Wire it in a main sketch if they ask 'who news this'.",
      "Refuse singleton getInstance for the repository.",
      "If they mention Spring, say 'annotations at the edge, not on entities'.",
    ],
    pitfalls: [
      "Field injection with no constructor — hard to see and hard to test without a container.",
      "Circular dependencies solved by setters instead of splitting types.",
      "Injecting 12 services into one class.",
    ],
    practiceIdeas: [
      "Refactor new SmtpClient() out of OrderService into a constructor port.",
      "Build a tiny main() that wires parking lot, clock, and a fake payer.",
    ],
    related: [
      "solid-dip",
      "program-to-an-interface",
      "fakes-vs-mocks",
      "testing-as-design",
      "hexagonal-architecture",
    ],
  },
  {
    slug: "fakes-vs-mocks",
    track: "lld",
    category: "Architecture",
    title: "Fakes vs mocks",
    summary:
      "A fake is a working stand-in (in-memory repo). A mock is an interaction assertion (expect charge() once). Prefer fakes for design; use mocks sparingly for true neighbors.",
    depth: "next",
    whyItMatters:
      "Mock-heavy tests lock you to call order and miss invariant bugs. Fakes let you design a real second implementation of a port — which is exactly what DIP asked for. Interview 'how do you test' answers should start with fakes.",
    theory: [
      "Dummy: unused argument. Stub: returns canned data. Fake: simplified real behavior (HashMap repository, in-memory clock you can set). Mock: pre-programmed expectations, fails if calls differ. Spy: records calls for later asserts. Use the weakest one that works.",
      "Fakes improve design because they must implement the whole port. If the port is unimplementable (40 methods), ISP failed. If the fake is harder than the real adapter, the port is leaking SQL ideas.",
      "Mocks are useful at a true boundary you do not want to fake (a vendor SDK with 3 methods). They are harmful when you mock the class under test's internals or every neighbor. Over-mocked tests pass while the fake-integrated path would fail.",
      "In an interview you will not write Mockito. You will say 'in-memory map implements the repo; a FakePayment that declines on a flag'.",
    ],
    howItWorks: [
      "For each port, write a fake that honors the contract (including errors).",
      "Drive use cases through fakes; assert domain outcomes.",
      "Mock only when a fake would be a second SDK.",
      "Never mock the entity under test.",
      "Share fakes with the demo composition root if they are good enough.",
    ],
    whenToUse: [
      "Fakes: repositories, clocks, id generators, feature flags, in-memory queues.",
      "Mocks: you must assert that a third-party send() was invoked with a specific id.",
    ],
    whenNotToUse: [
      "Mocks for every domain object.",
      "Fakes that ignore invariants (a repo that saves nulls) — they teach the wrong contract.",
    ],
    tradeoffs: [
      "Fakes take longer to write and stay valid longer.",
      "Mocks are quick and brittle.",
    ],
    interviewTips: [
      "Lead with 'fake repository and fake payment'. Mention mock only if they say the word.",
      "If they ask to verify email sent, a spy/fake mailbox list is cleaner than a mock.",
      "A Clock you can set is the most impressive 5-line fake.",
    ],
    pitfalls: [
      "Mocks that return mocks.",
      "Fakes with different rules than production (case sensitivity, uniqueness).",
      "Asserting exact call order when it is not part of the contract.",
    ],
    practiceIdeas: [
      "InMemoryBookingRepository with unique constraints matching the real one.",
      "Rewrite a mockist test to use a fake mailbox and assert the stored message.",
    ],
    related: [
      "testing-as-design",
      "dependency-injection",
      "repository-dao",
      "program-to-an-interface",
      "null-object",
    ],
  },
];
