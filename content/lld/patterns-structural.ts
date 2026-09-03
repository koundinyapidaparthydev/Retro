import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "adapter-pattern",
    track: "lld",
    category: "Structural Patterns",
    title: "Adapter",
    summary:
      "Wrap an existing type so it satisfies the interface your code already speaks — the plug converter of object design.",
    depth: "core",
    whyItMatters:
      "You rarely own every API. Stripe, a legacy XML service, a third-party maze solver — they do not implement your `PaymentPort`. Adapter is how you keep the domain clean without rewriting the vendor.",
    theory: [
      "An Adapter implements the target interface your clients use and holds (object adapter) or extends (class adapter) the adaptee. Each method translates calls and data: your `charge(Money)` becomes `stripe.paymentIntents.create(...)`. The client never sees the vendor type.",
      "Object adapters (composition) are the default: they wrap any adaptee, including final classes. Class adapters (inheritance) are rarer and couple you to one parent. Prefer composition.",
      "Adapters are not Facades. A facade simplifies a subsystem for a new client. An adapter makes an existing type look like a different existing interface. If you invented both sides, you may just need to rename, not adapt.",
      "Hexagonal 'driven adapters' are this pattern at architecture scale: the port is the target, the vendor SDK is the adaptee. Mention that link in interviews.",
    ],
    howItWorks: [
      "Write the target interface the domain already wants.",
      "Hold the vendor/legacy object as a field.",
      "Translate method names, types, and errors at the boundary.",
      "Map vendor errors into your domain errors. Do not leak SDK exceptions.",
      "Keep the adapter thin — no business rules beyond translation.",
    ],
    whenToUse: [
      "Third-party SDKs, legacy classes, libraries you cannot change.",
      "Making a collection or stream look like your iterator/port.",
      "Testing: a test adapter that stands in for a vendor.",
    ],
    whenNotToUse: [
      "You own both interfaces and can change one.",
      "You are actually hiding a whole subsystem (Facade) or adding behavior (Decorator).",
    ],
    tradeoffs: [
      "An extra hop and mapping code vs a domain that stays vendor-free.",
      "One adapter per vendor vs a clever generic mapper that nobody can debug.",
    ],
    interviewTips: [
      "When they say 'integrate PayPal too', add PaypalAdapter implementing PaymentMethod. Do not touch Checkout.",
      "Say 'object adapter' and draw composition. That is enough UML.",
      "If you start putting fee logic in the adapter, they will catch it — keep it translation-only.",
    ],
    pitfalls: [
      "Leaky adapter that returns vendor types.",
      "God adapter that talks to five systems.",
      "Adapter that silently swallows errors.",
    ],
    practiceIdeas: [
      "Wrap a library that uses cents-as-int so your app can pass Money.",
      "Adapt a legacy Iterator-like API to a modern Iterable.",
    ],
    related: [
      "facade-pattern",
      "decorator-pattern",
      "hexagonal-architecture",
      "solid-dip",
      "payment-wallet",
    ],
  },
  {
    slug: "decorator-pattern",
    track: "lld",
    category: "Structural Patterns",
    title: "Decorator",
    summary:
      "Wrap an object with the same interface to add behavior (logging, retry, compression) without subclassing the core.",
    depth: "core",
    whyItMatters:
      "Decorators are how you mix features: a payment that is logged and retried, a stream that is buffered and compressed. Inheritance would need a class per combination; wrapping stacks them.",
    theory: [
      "Decorator implements the same interface as the component it wraps and delegates, adding work before/after. Clients hold the interface and cannot tell they have a stack. That is OCP for orthogonal behaviors.",
      "Order matters. `Retry(Log(Real))` logs each attempt; `Log(Retry(Real))` logs one call. Discuss order in interviews. Constructors typically take the inner component so you build from the inside out.",
      "Decorators should be focused (one concern) and should not change the core meaning of the method. If you change the contract, you may want Proxy or Adapter. If you change the structure of a tree, you want Composite.",
      "Language features (middleware, annotations, TS decorators) are often this pattern. On a whiteboard, explicit wrapper classes are clearer.",
    ],
    howItWorks: [
      "Keep a Component interface with the operations you will wrap.",
      "Implement the real core once.",
      "Write one decorator class per extra concern; each holds a Component.",
      "Stack them at the composition root.",
      "Preserve the interface: same arguments, compatible results and errors.",
    ],
    whenToUse: [
      "Logging, metrics, retry, caching, auth checks, compression, encryption around a port.",
      "I/O streams and readers.",
      "Feature mix-ins you want to toggle independently.",
    ],
    whenNotToUse: [
      "You need to add a method that is not on the interface — you cannot decorate what is not there.",
      "The 'extra' behavior is the business rule itself — put it in a strategy or the entity.",
    ],
    tradeoffs: [
      "Flexible stacks vs harder debugging (deep call stacks, identity of the object changes).",
      "Many small classes vs a single options object with flags — flags become a combinatorial mess.",
    ],
    interviewTips: [
      "For 'add retry and metrics', draw two decorators around the gateway. Instant composition-over-inheritance credit.",
      "Mention identity: do not rely on `==` the inner object after wrapping.",
      "If they want to remove a concern, you unwrap or rebuild the stack — you do not edit the core.",
    ],
    pitfalls: [
      "Decorator that breaks Liskov (changes return meaning).",
      "Forgetting to delegate every method, leaving a half-dead wrapper.",
      "Giant 'UberDecorator' with five flags.",
    ],
    practiceIdeas: [
      "Wrap a Repository with a CachingDecorator and a LoggingDecorator.",
      "Implement retry with exponential backoff as a decorator on PaymentMethod.",
    ],
    related: [
      "proxy-pattern",
      "composition-over-inheritance",
      "solid-ocp",
      "adapter-pattern",
      "plugin-strategy-engines",
    ],
  },
  {
    slug: "facade-pattern",
    track: "lld",
    category: "Structural Patterns",
    title: "Facade",
    summary:
      "Give clients a short, intention-revealing API in front of a noisy subsystem so they do not need to know the moving parts.",
    depth: "core",
    whyItMatters:
      "A checkout that must talk to inventory, pricing, tax, payment, and email is a facade (or an application service). Facades keep controllers thin and hide order-of-operations so callers cannot call step 3 before step 1.",
    theory: [
      "A Facade is a coarse-grained object that sequences several collaborators. It does not usually implement the same interface as those collaborators (unlike Decorator/Proxy). It defines a new, simpler interface: `placeOrder(cmd)`, `startMovie()`, `park(vehicle)`.",
      "Application services in clean architecture are facades over the domain and ports. A library's `Files` or `JdbcTemplate` is a facade over many types. The pattern is 'make the common path obvious'.",
      "Facades can become god classes if they grow every feature. Split by use case when a facade's methods stop sharing collaborators or invariants. A facade is allowed to be a bit wide; it is not allowed to contain every rule inline — it should tell aggregates and policies.",
      "Do not confuse with Adapter: you are not making an old type look like an existing target; you are inventing a simpler API for a cluster of types.",
    ],
    howItWorks: [
      "Identify the subsystem types a typical client must touch.",
      "Write one method per use case on the facade.",
      "Sequence the tells inside: validate, reserve, charge, record.",
      "Hide types the client should not see (internal parsers, connection objects).",
      "Keep the facade injectable and thin; push rules down.",
    ],
    whenToUse: [
      "Entry points: controllers calling many services, SDKs wrapping internals, 'start game' buttons.",
      "When callers keep getting the order of operations wrong.",
      "As the public surface of a package.",
    ],
    whenNotToUse: [
      "A subsystem of one class — just use the class.",
      "When you only needed to translate one type (Adapter).",
    ],
    tradeoffs: [
      "Easier clients vs another layer that can hide too much (harder to do unusual sequences).",
      "One facade vs several use-case classes — split when cohesion drops.",
    ],
    interviewTips: [
      "Name your application service a clear verb facade: `ParkingService`, `BookingService`. That is the facade.",
      "If they ask for a lower-level operation, expose it carefully or add a new use case — do not leak five internals.",
      "Draw the facade box in front of 4–5 collaborators. Classic picture.",
    ],
    pitfalls: [
      "Facade that duplicates all internal methods (no simplification).",
      "Business-heavy facade that never calls an entity method.",
      "Static facade with hidden singletons.",
    ],
    practiceIdeas: [
      "Write a HomeTheater.watchMovie() that turns on amp, projector, and lights in order.",
      "Turn a controller that calls 6 repositories into one PlaceOrderService.",
    ],
    related: [
      "adapter-pattern",
      "public-surface",
      "layered-architecture",
      "solid-srp",
      "cart-checkout",
    ],
  },
  {
    slug: "proxy-pattern",
    track: "lld",
    category: "Structural Patterns",
    title: "Proxy",
    summary:
      "Stand in for another object to control access: lazy load, protect, remote, or cache — same interface, different reason than Decorator.",
    depth: "next",
    whyItMatters:
      "Proxies appear as virtual images, security wrappers, remote stubs, and smart references. Interviewers want you to distinguish them from decorators: proxy controls access to the same core; decorator adds responsibilities.",
    theory: [
      "A Proxy implements the subject's interface and holds a reference to the real subject (or how to get it). Before delegating, it may create the real object (virtual), check permissions (protection), send a network call (remote), or intercept for lazy init / copy-on-write (smart reference).",
      "The client thinks it has the real object. That is why ORMs hand you proxies: accessing `order.getLines()` may trigger a query. That is also why proxies surprise you with hidden IO and N+1 problems.",
      "Decorator vs Proxy: both wrap and share an interface. If you can stack many wrappers to add features, you are decorating. If there is one stand-in whose job is access control or location transparency, you are proxying. A caching proxy sits on the line — name the intent.",
      "Remote proxies hide latency and failure modes. Do not pretend they are local: timeouts, idempotency, and partial failure belong in the conversation.",
    ],
    howItWorks: [
      "Match the Subject interface exactly.",
      "Decide the control: lazy create, auth check, remote RPC, cache lookup.",
      "On each call, run the control, then forward.",
      "Document hidden costs (first call may hit disk/network).",
      "Do not add unrelated features — that turns it into a decorator pile.",
    ],
    whenToUse: [
      "Lazy-loading expensive objects (images, big documents).",
      "Access control around a sensitive service.",
      "Remote API stubs, virtual proxies in ORMs, rate-limited access.",
    ],
    whenNotToUse: [
      "You only wanted to add logging — Decorator is the clearer name.",
      "You wanted a simpler API — Facade.",
    ],
    tradeoffs: [
      "Location/access transparency vs hidden latency and harder debugging.",
      "ORM proxies vs explicit load methods — explicit is often kinder.",
    ],
    interviewTips: [
      "If they mention lazy image loading or access control, say Proxy and the flavor (virtual/protection).",
      "For ORM N+1, blame lazy proxies and offer fetch-join or explicit queries.",
      "Security proxy: 'the client still calls Document.open(); the proxy checks ACL first.'",
    ],
    pitfalls: [
      "Proxy that is not substitutable (leaks extra methods you must cast to).",
      "Infinite recursion if the proxy stores the subject in a way that re-enters.",
      "Treating a remote proxy like an in-memory call in a loop.",
    ],
    practiceIdeas: [
      "Implement a virtual proxy for a high-res image that loads on first draw.",
      "Write a protection proxy that allows read for all and write only for owners.",
    ],
    related: [
      "decorator-pattern",
      "orm-n-plus-one",
      "adapter-pattern",
      "solid-lsp",
      "rate-limiter",
    ],
  },
  {
    slug: "composite-pattern",
    track: "lld",
    category: "Structural Patterns",
    title: "Composite",
    summary:
      "Treat a single object and a tree of objects uniformly: folders, UI widgets, org charts, and menu items all answer the same operation.",
    depth: "core",
    whyItMatters:
      "File systems, UI trees, and company hierarchies are composite problems. If you write `if (isFolder)` everywhere, you missed the pattern. One `size()` or `draw()` on the component interface is the design.",
    theory: [
      "A Component interface declares operations that apply to both leaves and composites (`draw`, `size`, `price`). Leaf implements them directly. Composite holds children and implements the operation by delegating (sum, foreach). Clients ignore the difference.",
      "The hard API choice is: do leaves have `add(child)`? Transparent composite puts add/remove on Component (leaves throw or no-op — LSP risk). Safe composite puts child management only on Composite (clients must know the type to build the tree). Mention both; prefer safe unless the client must treat everything identically including construction.",
      "Operations that are not naturally recursive (find by id, pretty-print with indent) still live on Component; composites pass context downward. Visitor is an alternative when you add operations often and the hierarchy is stable.",
      "Identity and ownership: the tree should have a single parent per child unless you truly have a DAG. Cycles break recursion — guard or forbid.",
    ],
    howItWorks: [
      "Define Component with the shared operations.",
      "Implement Leaf with no children.",
      "Implement Composite with a list of Component and recursive methods.",
      "Choose safe vs transparent child management.",
      "Forbid cycles; decide whether a node can move between parents.",
    ],
    whenToUse: [
      "File trees, UI widget trees, menus, org charts, BOM (parts made of parts), nested comments.",
      "When clients should run one operation over a whole subtree.",
    ],
    whenNotToUse: [
      "A flat list — Composite is overhead.",
      "A graph with many-to-many links and no tree invariant.",
    ],
    complexity: {
      time: "O(n) to walk a tree of n nodes for a full-tree operation",
      space: "O(h) recursion depth, or O(n) if you queue a traversal",
      notes: "Watch stack depth on degenerate trees; use explicit stacks if needed.",
    },
    tradeoffs: [
      "Uniform client code vs awkward add() on leaves.",
      "Recursive simplicity vs the need for Visitor when operations explode.",
    ],
    interviewTips: [
      "For in-memory file system or org chart, Composite is the expected answer. Draw Leaf/Composite/Component.",
      "Say how size() or ls() recurses. That is the main sequence.",
      "If they add permissions per folder, the check can recurse or inherit — discuss it as an extension.",
    ],
    pitfalls: [
      "Leaves that silently ignore add().",
      "Sharing a mutable child between two parents without meaning to.",
      "Doing the recursion in the client instead of in Composite.",
    ],
    practiceIdeas: [
      "Implement File and Folder with size() and ls(indent).",
      "Model a product bundle whose price is the sum of children, with a leaf SKU.",
    ],
    related: [
      "in-memory-file-system",
      "visitor-pattern",
      "decorator-pattern",
      "ownership",
      "iterator-pattern",
    ],
  },
  {
    slug: "bridge-pattern",
    track: "lld",
    category: "Structural Patterns",
    title: "Bridge",
    summary:
      "Split a type into an abstraction and an independent implementation hierarchy so they can vary without an N×M subclass explosion.",
    depth: "advanced",
    whyItMatters:
      "RemoteControl × TV-brand, Shape × Renderer, Notification × Channel — if you inherit both axes you get EmailUrgent, SmsUrgent, EmailSilent, SmsSilent. Bridge makes two hierarchies that compose.",
    theory: [
      "The Abstraction (Remote, Shape, Notification) holds a reference to an Implementor (Device, Renderer, Channel) and delegates primitive work. Refined abstractions (RadioRemote, Circle) add higher-level operations. Concrete implementors (SonyTv, VectorRenderer) do the platform work.",
      "This is composition of two taxonomies. It looks like Strategy; the difference is intent and scale. Strategy swaps one algorithm. Bridge is an architectural split you expect both sides to grow: new remotes and new devices independently.",
      "The implementor interface should be primitive and stable (`turnOn`, `setVolume`). The abstraction builds the language clients want (`watch(channel)`, `mute()`). That is why it is a bridge: two APIs, one composition link.",
      "If only one side varies, you wanted Strategy or a simple port. Bridge is for two axes.",
    ],
    howItWorks: [
      "Name the two change axes.",
      "Put the more primitive axis behind Implementor.",
      "Put the client-facing axis on Abstraction, holding an Implementor.",
      "Add refined abstractions and concrete implementors independently.",
      "Wire them at the edge (a Sony TV with an advanced remote).",
    ],
    whenToUse: [
      "Platform vs feature: UI toolkit vs OS, notification urgency vs channel, shape vs draw API.",
      "When you already have an N×M subclass grid and it hurts.",
    ],
    whenNotToUse: [
      "Only one axis varies — Strategy or a port is enough.",
      "A one-off adapter to a single vendor.",
    ],
    tradeoffs: [
      "Two hierarchies to understand vs no combinatorial subclasses.",
      "Indirection on every primitive call.",
    ],
    interviewTips: [
      "If they ask 'message types and send channels', Bridge or Strategy+Channel both work — say the two-axis reason if you pick Bridge.",
      "A short picture: Abstraction diamond-arrow to Implementor, two trees.",
      "Do not use Bridge for parking-lot vehicle types. That is one axis.",
    ],
    pitfalls: [
      "Naming it Bridge when you have one interface and one impl — that is just DIP.",
      "Putting business rules in the implementor and platform calls in the abstraction (swap them).",
      "Making the implementor as fat as the abstraction, so nothing is primitive.",
    ],
    practiceIdeas: [
      "Shape (Circle/Square) + Renderer (Vector/Raster) without CircleVector classes.",
      "Notification (Alert/Digest) + Channel (Email/Sms) composed at send time.",
    ],
    related: [
      "strategy-pattern",
      "composition-over-inheritance",
      "abstract-factory",
      "notification-dispatcher",
      "solid-ocp",
    ],
  },
  {
    slug: "flyweight-pattern",
    track: "lld",
    category: "Structural Patterns",
    title: "Flyweight",
    summary:
      "Share the immutable, intrinsic parts of many similar objects so you can afford millions of them.",
    depth: "advanced",
    whyItMatters:
      "Text editors (a glyph per character), game maps (a tree type vs tree instances), and boards with repeated pieces hit memory walls. Flyweight splits shared data from per-instance data.",
    theory: [
      "Intrinsic state is independent of context and can be shared: the bitmap for the letter 'A', the mesh of an orc, the rules of a pawn. Extrinsic state is context: position, selected, owner. Store intrinsic data once in a flyweight; store extrinsic data outside (in the client, or in a thin handle).",
      "A FlyweightFactory interns instances by key (character code, terrain type). Clients ask the factory, never `new` a heavy object per cell. Flyweights must be immutable (or otherwise thread-safe and unowned) because they are shared.",
      "This is related to interned strings, caches, and prototype registries. The specific intent is memory: many logical objects, few physical ones.",
      "Do not flyweight entities with identity and lifecycle. A User is not a flyweight. A glyph style is.",
    ],
    howItWorks: [
      "Split fields into intrinsic vs extrinsic.",
      "Put intrinsic fields on an immutable flyweight.",
      "Key the factory (char → Glyph, type → PieceStyle).",
      "Keep extrinsic state in the client structure (array of positions, board cells).",
      "Never mutate a flyweight after publication.",
    ],
    whenToUse: [
      "Huge numbers of similar objects that share most data.",
      "Characters in a document, particles with a few sprites, map tiles.",
    ],
    whenNotToUse: [
      "Hundreds of objects — the factory is not worth it.",
      "When almost all state is extrinsic; sharing saves nothing.",
    ],
    complexity: {
      time: "O(1) factory lookup after intern; first miss pays construction",
      space: "O(unique types) instead of O(instances) for the heavy data",
      notes: "You still pay O(instances) for extrinsic arrays.",
    },
    tradeoffs: [
      "Memory vs more awkward APIs (pass position into `draw(x,y)` every time).",
      "Sharing vs the inability to give one instance a unique mutable tweak without copy-on-write.",
    ],
    interviewTips: [
      "For a text editor or a huge forest, mention Flyweight. For chess (32 pieces), skip it unless they ask about a game with thousands of units.",
      "Say immutable + factory. That is the implementation.",
      "Connect to HashMap intern pools if they know caches.",
    ],
    pitfalls: [
      "Mutable flyweights — one tree turning autumn turns all trees.",
      "Putting extrinsic state inside the shared object.",
      "Using Flyweight as a synonym for object pool (pools reuse mutable instances over time; flyweights share immutable data).",
    ],
    practiceIdeas: [
      "Render a 10k-character document with 26 glyph flyweights and an array of (char, x, y).",
      "Map tile types shared across a 1000×1000 grid.",
    ],
    related: [
      "immutability",
      "prototype-pattern",
      "hashmap-internals",
      "text-editor",
      "connection-pool",
    ],
  },
];
