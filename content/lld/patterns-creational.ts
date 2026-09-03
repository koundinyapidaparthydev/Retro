import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "singleton-pattern",
    track: "lld",
    category: "Creational Patterns",
    title: "Singleton (and its smell)",
    summary:
      "Singleton guarantees one instance and a global access point. That is occasionally correct for a process-wide resource and often a test-hostile hidden dependency.",
    depth: "core",
    whyItMatters:
      "Interviewers still ask you to write one — and then watch whether you mention the smell. You should know a thread-safe implementation and know when to refuse the pattern in favor of DI.",
    theory: [
      "The intent is: exactly one instance of a class, lazily or eagerly created, reachable from anywhere. Classic uses are a logger, a process config, a hardware interface, or a registry. The mechanism is a private constructor plus a static accessor.",
      "The smell is global mutable state. Callers depend on a hidden name (`Logger.getInstance()`), so you cannot substitute a fake without static trickery. Parallel tests interfere. Hidden order of initialization causes bugs. A singleton that grows fields becomes a service locator god object.",
      "If the real need is 'one instance in this process', a composition root can construct one Logger and inject it. You still have one instance; you no longer have a global. Prefer that unless the environment forces a static (legacy, logging facade).",
      "If you must implement it, talk about thread safety: eager static initialization is simplest; double-checked locking is the historical pitfall; enum singletons (Java) or module-scope objects (JS/TS) are language-idiomatic. Also talk about cloning, serialization, and subclassing, which can spawn extra instances.",
    ],
    howItWorks: [
      "Make constructors private. Hold a static reference.",
      "Choose eager init (simple, thread-safe in Java static holders) or lazy init with a safe publication idiom.",
      "Block clone/serialize paths that could create another instance, if those exist in the language.",
      "Keep the singleton tiny: no business graph inside it.",
      "Prefer injecting the instance over calling getInstance() from domain code.",
    ],
    whenToUse: [
      "A genuine process-wide resource with no meaningful second instance (logging backend, native driver).",
      "When a framework already demands a static entry point.",
      "As a whiteboard exercise to discuss concurrency and smell.",
    ],
    whenNotToUse: [
      "Databases, repositories, user sessions, caches that should be scoped or mocked.",
      "Anything you need two of in tests.",
      "As a way to avoid passing dependencies.",
    ],
    tradeoffs: [
      "Convenient access vs invisible coupling and painful tests.",
      "Lazy save-a-bit-of-startup vs harder safe publication.",
    ],
    interviewTips: [
      "Write a correct version, then say 'in production I would inject this.' That is the senior move.",
      "If they ask for lazy + threads, mention the initialization-on-demand holder or a lock — and the DCL pitfalls.",
      "Do not make ParkingLot a singleton. Lots can be many.",
    ],
    pitfalls: [
      "Public constructor leftover, so `new` still works.",
      "Double-checked locking without safe publication (see that topic).",
      "Singleton holding request-scoped data.",
    ],
    practiceIdeas: [
      "Implement a thread-safe logger singleton, then refactor callers to take a Logger port.",
      "Write a test that fails because two tests share a singleton cache; fix with injection.",
    ],
    related: [
      "double-checked-locking",
      "dependency-injection",
      "logger",
      "config-loader",
      "thread-safe-logger",
    ],
  },
  {
    slug: "factory-method",
    track: "lld",
    category: "Creational Patterns",
    title: "Factory Method",
    summary:
      "Let a creator type defer which product to instantiate so subclasses or injected policies pick the concrete class.",
    depth: "core",
    whyItMatters:
      "Factory Method is the smallest 'I do not hard-code new' pattern. You will use it for vehicles, pieces, notifications, and parsers — anywhere the rest of the algorithm is stable and the type varies.",
    theory: [
      "In GoF form, an abstract Creator implements a workflow and calls `createProduct()`, which subclasses override. The client uses Creator, never `new ConcreteProduct`. In modern code the 'subclass' is often a function, a lambda, or a small factory object passed in — same idea, less hierarchy.",
      "The point is dependency inversion at the creation site. The workflow (deal a hand, build a report, load a document) stays closed; the product family extends. That is OCP for construction.",
      "A static `Vehicle.create(type)` switch is a simple factory, not full Factory Method. It is still a good interview move: one closed switch. Upgrade to Factory Method when different creators exist (LandVehicleFactory vs WaterVehicleFactory) or when you want to stub creation in tests.",
      "Do not confuse it with Abstract Factory, which builds families of related products. Factory Method builds one product role.",
    ],
    howItWorks: [
      "Identify the product interface (`Vehicle`, `Button`, `Handler`).",
      "Write the workflow against that interface.",
      "Extract the `new Concrete()` into a method or collaborator the workflow calls.",
      "Provide creators (subclasses, functions, or objects) for each variant.",
      "Keep the switch, if any, inside the factory — not in the workflow.",
    ],
    whenToUse: [
      "Frameworks that let users plug in their product type.",
      "Games and boards: PieceFactory.from(char).",
      "When tests must inject a fake product without mocking `new`.",
    ],
    whenNotToUse: [
      "A single concrete product with no variation.",
      "When you actually need a family of products (use Abstract Factory or a small module of factories).",
    ],
    tradeoffs: [
      "An extra type vs a local `new`. Worth it once there are two products or a test seam.",
      "Inheritance-based GoF form vs a function type — prefer the function in new code.",
    ],
    interviewTips: [
      "For 'car, bike, truck', a simple factory method is enough. Say the name; do not draw Creator subclasses unless they ask for multiple factory kinds.",
      "Show the workflow calling `factory.create(...)` so they see the inversion.",
      "If they add 'boat', you add a product and a factory branch — not a new park() method.",
    ],
    pitfalls: [
      "Factory that also contains domain logic (fees, parking).",
      "Returning null instead of a Null Object or error.",
      "A factory per class that just news itself — noise.",
    ],
    practiceIdeas: [
      "Write Notification.create(channel) returning Email or Sms implementers.",
      "Implement a document exporter where CsvExporter and PdfExporter override createWriter().",
    ],
    related: [
      "abstract-factory",
      "factory-vs-constructor",
      "solid-ocp",
      "null-object",
      "solid-dip",
    ],
  },
  {
    slug: "abstract-factory",
    track: "lld",
    category: "Creational Patterns",
    title: "Abstract Factory",
    summary:
      "Provide an interface for creating a family of related products so the family stays consistent (all dark-theme widgets, all SQL ports, all premium pieces).",
    depth: "next",
    whyItMatters:
      "When products must match each other, a single Factory Method is not enough — you can mix a DarkButton with a LightScrollBar. Abstract Factory is the 'theme' or 'vendor pack' pattern.",
    theory: [
      "An Abstract Factory declares create methods for each product role (`createButton`, `createMenu`). Concrete factories implement a complete family (WinFactory, MacFactory). Clients take the abstract factory and never name the concretes. Products of one family are designed to work together.",
      "The pattern is heavier than Factory Method. You pay for it when consistency across products matters: UI kits, DB dialect + lock + dialect-specific types, game factions with matching units. If there is only one product role, you wanted Factory Method.",
      "Adding a new product role changes the abstract factory and every concrete factory — that is the usual pain. Adding a new family is easy (OCP on families, not on roles). Mention this tradeoff in interviews.",
      "DI containers plus a set of bindings are often an Abstract Factory in practice. On a whiteboard, a `ThemeFactory` interface is the clear story.",
    ],
    howItWorks: [
      "List the product roles that must stay in one family.",
      "Declare an Abstract Factory with one create method per role.",
      "Implement one concrete factory per family.",
      "Pass the factory into the client that assembles the UI or the subsystem.",
      "Do not let the client `new` a product from another family.",
    ],
    whenToUse: [
      "Multiple matching products: widgets, dialect-specific SQL objects, faction units.",
      "You need to swap the whole family at startup (platform, tenant, theme).",
    ],
    whenNotToUse: [
      "One product type — Factory Method or a simple factory.",
      "Unrelated products stuffed into one factory for convenience.",
    ],
    tradeoffs: [
      "Easy new families, painful new roles.",
      "More types than a map of lambdas — sometimes a config object of functions is enough.",
    ],
    interviewTips: [
      "Use this only when they mention a matching set. Otherwise it looks like pattern dumping.",
      "A clean example: `ComponentFactory` for Light/Dark or for Desktop/Mobile.",
      "If they add a new widget type, acknowledge the interface change — honesty scores.",
    ],
    pitfalls: [
      "Abstract Factory with one method — you overnamed a Factory Method.",
      "Families that are not actually compatible (factory is just a junk drawer).",
      "Client still imports concrete products.",
    ],
    practiceIdeas: [
      "Build a UI kit with Button+Dialog in two themes, assembled only through ThemeFactory.",
      "Sketch SQL vs InMemory factories that each produce Repository + Transaction + Lock.",
    ],
    related: [
      "factory-method",
      "factory-vs-constructor",
      "solid-ocp",
      "plugin-system",
      "bridge-pattern",
    ],
  },
  {
    slug: "builder-pattern",
    track: "lld",
    category: "Creational Patterns",
    title: "Builder",
    summary:
      "Assemble a complex object step by step, then freeze a valid result — especially when there are many optional parts or a language-like construction.",
    depth: "core",
    whyItMatters:
      "Twelve-argument constructors are how you swap two parameters and ship a bug. Builders name each part, allow fluent setup, and validate once at the end. They also show up in string building, query building, and immutable configs.",
    theory: [
      "GoF Builder separates the construction steps (`setWalls`, `setRoof`) from the product. A Director can replay a standard sequence (buildCastle vs buildHut) against any Builder. In everyday Java/TS, the inner static Builder with fluent `withX()` and `build()` is the usual form — Director is optional.",
      "Builders shine for immutable products: you mutate the builder, then emit a final object. They also shine when construction is a mini-language (SQL, HTTP, UI trees). Telescoping constructors and boolean telescopes are the anti-pattern they replace.",
      "The builder must not emit an invalid product. `build()` is the invariant gate. Optional fields get defaults there. Required fields missing → fail fast.",
      "A builder is not a bag to postpone design. If you have two required fields, use a constructor. If steps have order constraints (must set table before column), encode that with staged builders or a director.",
    ],
    howItWorks: [
      "List required vs optional parts of the product.",
      "Give the builder setters/withers for each part.",
      "Hold a Director only if you have named recipes.",
      "In `build()`, validate invariants and return an immutable product (or a fully initialized mutable one).",
      "Keep the product constructor package-private / private so callers cannot skip the builder if that is the rule.",
    ],
    whenToUse: [
      "Many optional fields (search criteria, config, notification payload).",
      "Immutable objects with more than three construction inputs.",
      "Stepwise construction that may branch (a house with or without a garage).",
    ],
    whenNotToUse: [
      "Two or three required fields — constructor or static factory.",
      "When you need a family of products (that is Abstract Factory).",
    ],
    tradeoffs: [
      "Extra class and more lines vs readable call sites and one validation point.",
      "Fluent builders can hide required-field errors until build() — staged types can fix that.",
    ],
    interviewTips: [
      "For a query or a pizza/coffee order with add-ons, Builder is the expected pattern.",
      "If they want immutability, Builder + private constructor is a complete answer.",
      "Do not builder-ize Vehicle(plate, type). That looks like padding.",
    ],
    pitfalls: [
      "Reusable builder that forgets to reset and leaks parts into the next product.",
      "build() that never validates.",
      "Public setters on the product anyway.",
    ],
    practiceIdeas: [
      "Implement an immutable HttpRequest via builder (url required, headers optional).",
      "Coffee order builder: size required, extras optional, reject decaf+espresso-shot if that is a rule.",
    ],
    related: [
      "factory-vs-constructor",
      "immutability",
      "invariants",
      "coffee-machine",
      "prototype-pattern",
    ],
  },
  {
    slug: "prototype-pattern",
    track: "lld",
    category: "Creational Patterns",
    title: "Prototype",
    summary:
      "Create new objects by cloning a prototype instead of reconstructing from scratch — useful when setup is expensive or the exact class is unknown.",
    depth: "next",
    whyItMatters:
      "Prototype is the right story for document templates, game unit presets, and 'duplicate this row'. It is also a reminder that clone is hard: deep vs shallow, identity, and mutable children.",
    theory: [
      "A Prototype interface exposes `clone()`. Clients ask an existing instance (or a registry of named prototypes) for a copy, then tweak the copy. They do not know the concrete class and do not repeat a long setup sequence.",
      "Shallow clone copies the top object and shares nested references. Deep clone copies the graph. Most bugs are shallow clones of objects that own mutable lists — two 'copies' share a list and corrupt each other. You must say which you mean.",
      "Identity: clones are new entities if the type is an entity (new id). Clones of values are just equal values. A registry of prototypes should store templates, not live entities that then get mutated in place.",
      "In JS/TS, prototype inheritance is a language feature; the design pattern is still about cloning instances. Do not confuse `Object.create` with a domain clone that preserves invariants.",
    ],
    howItWorks: [
      "Add a clone method that documents deep vs shallow.",
      "Copy mutable children in a deep clone; share immutables.",
      "Assign a new id if the object is an entity.",
      "Optionally keep a PrototypeRegistry map from name → template.",
      "After clone, apply the deltas the use case needs.",
    ],
    whenToUse: [
      "Templates: resume, dungeon room, email campaign, enemy loadout.",
      "When `new` plus setup is costly (loaded textures, parsed trees) and a copy is cheaper.",
      "When the client cannot see the concrete class (plugin object).",
    ],
    whenNotToUse: [
      "Cheap immutable values — just construct them.",
      "Graphs with cycles and identity you do not want to think about — use a factory from data instead.",
    ],
    complexity: {
      time: "O(n) in the size of the cloned graph for a deep clone",
      space: "O(n) for a deep copy; O(1) extra for a shallow copy",
      notes: "Shallow is fast and usually wrong for mutable aggregates.",
    },
    tradeoffs: [
      "Clone hides construction details but duplicates hidden state you might not want (cached totals, listeners).",
      "Deep clone cost vs factory-from-DTO which can be clearer.",
    ],
    interviewTips: [
      "If they say 'duplicate a document', name Prototype and immediately say deep copy + new id.",
      "Mention the registry if they want named presets ('orc', 'elf').",
      "Do not clone a singleton.",
    ],
    pitfalls: [
      "Shallow copy of a list field.",
      "Cloning listeners/observers so events fire twice.",
      "Forgetting to reset transient state (isDirty, open sockets).",
    ],
    practiceIdeas: [
      "Clone a chess board (deep copy pieces) for AI lookahead.",
      "Build a document template registry that issues new ids on clone.",
    ],
    related: [
      "builder-pattern",
      "identity-vs-value-objects",
      "immutability",
      "memento-pattern",
      "chess",
    ],
  },
];
