import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "encapsulation",
    track: "lld",
    category: "OOP",
    title: "Encapsulation",
    summary:
      "Hide how an object stores and changes data; expose a small, intention-revealing API so invariants stay true no matter who calls you.",
    depth: "core",
    whyItMatters:
      "Most LLD bugs are not missing classes — they are leaked fields that any caller can corrupt. Encapsulation is how you keep a ParkingSpot from going occupied-and-empty at once, and how you keep interview designs from collapsing when the interviewer adds a rule.",
    theory: [
      "Encapsulation is the pairing of state with the only operations allowed to change that state. A class is not a bag of getters. If callers can set `balance` to a negative number, you do not have a Wallet; you have a struct with extra typing. The private fields are the implementation; the public methods are the contract.",
      "The useful test is: can a caller put the object into a state the constructor would reject? If yes, encapsulation failed. Constructors establish invariants; mutators must re-establish them. That is why `occupy(vehicle)` beats `setOccupied(true)` plus `setVehicle(v)` — two setters cannot enforce 'occupied iff vehicle is present'.",
      "Access modifiers are only the language mechanism. Real encapsulation is about information hiding: callers should not need to know whether availability is a boolean, a bitset, or a reservation list. When that representation changes, the public methods stay. Interview designs that expose every field 'for simplicity' become un-extendable the moment a variant arrives.",
      "Encapsulation also sets the transaction boundary of an object. If two fields must change together, they change in one method. Spreading that update across the caller is how you get half-updated objects and race conditions later.",
    ],
    howItWorks: [
      "List the invariants the object must always satisfy (e.g. capacity ≥ occupied, status matches assigned vehicle).",
      "Put the data that those invariants mention behind private fields. Do not expose raw collections if callers could mutate them.",
      "Write constructors and factories that only produce valid instances. Reject illegal combinations immediately.",
      "Expose verbs (`park`, `unpark`, `reserve`) rather than field setters. Each verb updates every related field and re-checks the invariant.",
      "Return copies or unmodifiable views when you must expose data. Never hand out the live list of spots.",
    ],
    whenToUse: [
      "Any type that has rules: money, inventory, bookings, machine state, permissions.",
      "When two or more fields must stay consistent with each other.",
      "When you expect the interviewer to add a constraint five minutes later.",
    ],
    whenNotToUse: [
      "Pure data transfer objects that cross a process or network boundary — those are schemas, not domain objects.",
      "Throwaway scripts where the type is a row in a table and has no behavior.",
    ],
    tradeoffs: [
      "Tighter encapsulation means more methods to write up front, but far fewer 'who changed this field?' bugs.",
      "Over-hiding can force awkward visitor-like APIs; hide the representation, not every useful query.",
    ],
    interviewTips: [
      "Say the invariant out loud, then show the method that protects it. Interviewers listen for that pairing.",
      "If you draw a class with ten public setters, expect a follow-up that breaks an invariant — fix the API before they ask.",
      "When they say 'make it thread-safe', encapsulation is already half the work: there is one place to lock.",
    ],
    pitfalls: [
      "Public fields or getters that return mutable lists — callers mutate around your methods.",
      "Anemic objects: data in one class, all rules in a 'Manager'. That manager becomes a god class.",
      "Getters for every field 'just in case' — you have published an accidental API.",
    ],
    practiceIdeas: [
      "Design a BankAccount that forbids overdraft unless an OverdraftPolicy is attached — no public balance setter.",
      "Take a ParkingSpot with public `occupied` and `vehicle` and rewrite it so those fields cannot disagree.",
    ],
    related: [
      "abstraction",
      "invariants",
      "public-surface",
      "identity-vs-value-objects",
      "immutability",
    ],
  },
  {
    slug: "abstraction",
    track: "lld",
    category: "OOP",
    title: "Abstraction",
    summary:
      "Show callers a stable idea — PaymentMethod, PricingRule, ElevatorScheduler — and hide the messy variants behind it.",
    depth: "core",
    whyItMatters:
      "LLD interviews are variant machines. The first design handles cash; the follow-up adds UPI, then coupons, then surge. Abstraction is how you add those without rewriting the checkout path.",
    theory: [
      "Abstraction is not 'use an interface'. It is choosing which details a caller is allowed to depend on. A good abstraction names a capability (`charge(Money)`, `nextFloor(requests)`) and leaves algorithm, storage, and vendor APIs out of the signature.",
      "The skill is picking the right grain. Too thin (`doThing()`) and every implementer becomes a special case the caller must know. Too thick (an interface with twenty methods) and you have invented a god type that no implementer can satisfy honestly — that is how Interface Segregation gets violated.",
      "In interviews, abstraction usually appears as a strategy, a port, or a policy object. The domain flow stays in one place; the varying decision is injected. That is why `FareCalculator` is a better abstraction than a switch on `RideType` inside `Trip`.",
      "Abstraction also applies to data: a `SpotId` or `Money` type is an abstraction over primitives. It prevents mixing a user id with a spot number and lets you attach parsing and validation once.",
    ],
    howItWorks: [
      "Find the part of the design that will change independently (pricing, unlocking, dispatch, persistence).",
      "Name the capability in domain language, not in framework language.",
      "Write the smallest interface that lets the use case run. Prefer one or two methods with clear types.",
      "Keep the use-case class depending only on that interface. Construct the concrete type at the edge (main, factory, DI).",
      "Add a new variant by adding an implementer, not by editing the use case with another `if`.",
    ],
    whenToUse: [
      "Two or more algorithms for the same job: pricing, scheduling, matching, notification channels.",
      "When you need to test the flow without a real payment gateway or database.",
      "When the interviewer is clearly about to add a second kind of X.",
    ],
    whenNotToUse: [
      "There is one implementation and no realistic second one — a single concrete class is clearer.",
      "You are abstracting a language feature (List, Map) instead of a domain idea.",
    ],
    tradeoffs: [
      "Each abstraction is a new name to learn; only add one when it absorbs a real variation.",
      "Wrong abstractions are expensive — they leak and you still have switches. Prefer waiting until the second variant exists, then extract.",
    ],
    interviewTips: [
      "Narrate: 'Checkout should not know how UPI works, only that a PaymentMethod can charge.' Then draw the interface.",
      "If you only have one implementer, say so — 'I would extract this when a second fare rule appears.' That shows judgment.",
      "Pair abstraction with Open/Closed: new type, old flow untouched.",
    ],
    pitfalls: [
      "Interfaces that mirror a concrete class one-to-one — no design, just ceremony.",
      "Abstracting too early (one payment type) or too late (a 200-line switch).",
      "Leaky abstractions: callers still cast to `UpiPayment` to get work done.",
    ],
    practiceIdeas: [
      "Replace a `switch (vehicleType)` parking-fee method with a `PricingStrategy` per vehicle.",
      "Design a `NotificationChannel` so email and SMS share one dispatcher.",
    ],
    related: [
      "encapsulation",
      "program-to-an-interface",
      "solid-ocp",
      "strategy-pattern",
      "interfaces-vs-abstract-classes",
    ],
  },
  {
    slug: "inheritance",
    track: "lld",
    category: "OOP",
    title: "Inheritance",
    summary:
      "Reuse and specialize a type when the child truly is a kind of the parent — not when you just want to share a helper method.",
    depth: "core",
    whyItMatters:
      "Inheritance is the first tool juniors reach for and the first one interviewers punish. Used for true is-a taxonomies it is clean; used for reuse it produces fragile base classes and LSP violations.",
    theory: [
      "Inheritance gives you two things at once: subtype polymorphism and implementation reuse. Those should not be bought together unless both are justified. A `Bird` hierarchy that forces `Penguin.fly()` to throw is reuse that broke the contract.",
      "The Liskov question is the inheritance question: can every caller of the parent use the child without changing its expectations? If the parent promises `fly()`, every child must fly. If some birds cannot, `fly` does not belong on `Bird`.",
      "Implementation inheritance couples you to the parent's protected fields and call order. A change in `AbstractList.add` can break children that overrode `addAll`. That is the fragile base class problem. Prefer inheriting from types you own and keep the hierarchy shallow — two or three levels, not a zoo.",
      "In LLD, inheritance works for closed taxonomies with shared algorithm skeletons (Template Method) or for exception types. For 'this object uses that behavior', composition is the default.",
    ],
    howItWorks: [
      "Write the parent contract first: methods and their guarantees, not the shared fields.",
      "Ask whether every imagined subtype can honor those guarantees. If not, split the parent.",
      "Put only shared, stable algorithm steps in the parent. Leave varying steps as abstract hooks or injected strategies.",
      "Keep protected surface tiny. Children should not need to understand the parent's private timeline.",
      "Stop at a shallow tree. If you need a fourth level, you are probably modeling roles, not kinds.",
    ],
    whenToUse: [
      "A genuine is-a taxonomy with a stable contract: Exception types, AST nodes with accept(), UI widgets in a framework you control.",
      "Template Method when the steps are fixed and only a few hooks vary.",
      "When the language requires a type relationship (checked exceptions, some serialization).",
    ],
    whenNotToUse: [
      "You only want to reuse a utility — extract a helper or compose a collaborator.",
      "The child must hide or disable a parent method. That is not a subtype.",
      "The variants differ in data, not in kind (a User with roles vs Admin extends User).",
    ],
    tradeoffs: [
      "Inheritance is concise at the call site (one type) but expensive to change at the root.",
      "Composition is more wiring and more objects, but you can recombine behaviors without a taxonomy fight.",
    ],
    interviewTips: [
      "Default to composition in the interview. Use inheritance only when you can defend the is-a sentence.",
      "If you draw `ElectricCar extends Car`, immediately state what Car guarantees and that ElectricCar keeps them.",
      "Name LSP if they push a Square/Rectangle example — that is the trap they want you to catch.",
    ],
    pitfalls: [
      "Inheriting just to get a logger or a database handle.",
      "Deep trees: Vehicle → Car → Sedan → ElectricSedan → TeslaModel3.",
      "Overriding a method and weakening preconditions or strengthening exceptions.",
    ],
    practiceIdeas: [
      "Model birds without putting fly() on the base type — use a FlyingBehavior collaborator.",
      "Rewrite a Manager extends Employee payroll design so Manager has a Role or a ReportingStructure instead.",
    ],
    related: [
      "polymorphism",
      "composition-over-inheritance",
      "solid-lsp",
      "has-a-is-a-uses-a",
      "template-method",
    ],
  },
  {
    slug: "polymorphism",
    track: "lld",
    category: "OOP",
    title: "Polymorphism",
    summary:
      "Call the same operation on different types and let each type run its own implementation — the alternative to sprawling switches.",
    depth: "core",
    whyItMatters:
      "A design that switches on type in five places will miss the sixth when a new type arrives. Polymorphism moves that branch into the type system so the compiler (or your factory) forces you to handle it once.",
    theory: [
      "Subtype polymorphism means a variable of type `PaymentMethod` can hold `Card`, `Upi`, or `Wallet`, and `charge()` dispatches to the right code. The caller writes one path. That is the Open/Closed mechanism you will actually use in interviews.",
      "Parametric polymorphism (generics) is the other half: `Repository<T>` or `Result<T, E>` reuse structure without inheriting. Use it for containers, parsers, and caches. Do not invent a class hierarchy when a generic plus an interface will do.",
      "Ad-hoc polymorphism — overloads — is useful for convenience (`print(int)` vs `print(String)`) but it is resolved at compile time and does not replace a strategy. Overloading `calculate(Car)` and `calculate(Bike)` still requires the caller to know the concrete type.",
      "Polymorphism is only as good as the shared contract. If implementers need extra methods the caller then casts to, you do not have polymorphism; you have a type test in disguise.",
    ],
    howItWorks: [
      "Identify repeated `if (type == X)` or `instanceof` blocks that choose behavior.",
      "Extract a common method on an interface. Move each branch into an implementer.",
      "Construct the right implementer at the boundary (factory, parser, config), then pass the interface inward.",
      "Keep the shared method's arguments and return type honest so no implementer needs to cast.",
      "For closed sets in one module, a switch can still be fine — but keep it in one place, not five.",
    ],
    whenToUse: [
      "Multiple types share an operation: draw, price, unlock, serialize, notify.",
      "You want to add a type without editing the use-case class.",
      "Tests need a fake that honors the same contract.",
    ],
    whenNotToUse: [
      "A closed set of two cases that will never grow — a local if is clearer.",
      "The types do not share a meaningful operation; forcing a common interface creates empty methods.",
    ],
    tradeoffs: [
      "Dispatch is implicit — great for extension, harder to see the full picture than a switch table.",
      "You trade a central list of cases for a scattered set of classes; document the interface as the extension point.",
    ],
    interviewTips: [
      "When they add 'now support motorcycles', point at the interface and add one class. That is the demo.",
      "Do not pretend every switch is evil. Say 'I keep the type switch in the factory; the domain talks to the interface.'",
      "Mention double dispatch / Visitor only if they need an operation over a stable hierarchy you cannot change.",
    ],
    pitfalls: [
      "Casting after a polymorphic call — the interface was too thin or too wrong.",
      "Switching on a type enum and also having subclasses. Pick one dispatch mechanism.",
      "Giant interfaces so every type can be 'polymorphic' — see ISP.",
    ],
    practiceIdeas: [
      "Replace instanceof chains in a chess move validator with Piece.legalMoves(Board).",
      "Build a notification dispatcher that only knows Channel.send(Message).",
    ],
    related: [
      "inheritance",
      "abstraction",
      "strategy-pattern",
      "solid-ocp",
      "visitor-pattern",
    ],
  },
  {
    slug: "composition-over-inheritance",
    track: "lld",
    category: "OOP",
    title: "Composition over inheritance",
    summary:
      "Build objects by assembling collaborators you own, instead of stretching a parent class to cover every variation.",
    depth: "core",
    whyItMatters:
      "Interview variants are mix-and-match: an elevator that is both destination-dispatch and peak-hour, a payment that is both retrying and logged. Inheritance forces a class per combination. Composition lets you plug policies together.",
    theory: [
      "Composition is a has-a relationship where the outer object delegates work to inner ones it holds. A `Car` has an `Engine` and a `Lock`; it is not an `Engine`. When the lock changes from key to fob to app, Car's public API can stay.",
      "The combinatorial argument is the practical one. If you have logging × retry × pricing variants, inheritance needs a class for each pair. Composition needs three small types and a constructor that wires them. That is also how Decorator and Strategy stay useful.",
      "Delegation must be intentional. If the outer type forwards all twenty methods to the inner type, you have inherited without saying so — and you are still coupled. Compose to get a behavior, not to impersonate the whole collaborator unless you are writing a Proxy.",
      "Favor composing interfaces you define: `Lock`, `Pricer`, `Scheduler`. That keeps the outer object testable and lets you swap fakes. Composing concrete third-party classes is still better than inheriting from them.",
    ],
    howItWorks: [
      "List behaviors that vary independently (pricing, locking, scheduling, persistence).",
      "Give each behavior its own type with a small interface.",
      "Hold those types as fields. Inject them in the constructor or a factory.",
      "Delegate: the outer method names the use case; the inner method does the varying work.",
      "Add a variant by passing a different collaborator, not by subclassing the outer type.",
    ],
    whenToUse: [
      "Almost always as the default structure in an LLD interview.",
      "When behaviors mix (retry + metrics + real gateway).",
      "When you would otherwise inherit from a class you do not own.",
    ],
    whenNotToUse: [
      "A true subtype with a stable contract and shared algorithm — inheritance or Template Method can be smaller.",
      "Value objects that are just data; do not compose a graph of objects for a Money amount.",
    ],
    tradeoffs: [
      "More types and more constructor arguments — solve with factories or builders, not with a hidden `new` inside the class.",
      "Indirection: a call may hop through three objects. Keep each hop meaningful.",
    ],
    interviewTips: [
      "Say the phrase once, then show it: 'Elevator has a SchedulingPolicy, it does not subclass PeakHourElevator.'",
      "If the interviewer asks for a second policy, swap the collaborator live. That is the point of the principle.",
      "Watch for 'is-a' they actually mean 'has-a role' — Admin is a User with a Role, not User subclass.",
    ],
    pitfalls: [
      "God objects that compose twelve collaborators and still contain all the logic.",
      "Inheriting and composing the same thing — pick a story.",
      "new-ing collaborators inside the class so you cannot test or replace them.",
    ],
    practiceIdeas: [
      "Build a coffee machine where Recipe, Inventory, and Payment are fields, not parent classes.",
      "Add logging and retry to a payment gateway using decorators, not LoggedRetryUpiGateway extends UpiGateway.",
    ],
    related: [
      "inheritance",
      "has-a-is-a-uses-a",
      "strategy-pattern",
      "decorator-pattern",
      "dependency-injection",
    ],
  },
  {
    slug: "interfaces-vs-abstract-classes",
    track: "lld",
    category: "OOP",
    title: "Interfaces vs abstract classes",
    summary:
      "Use interfaces to name a capability; use abstract classes only when you own a partial implementation that every subtype should share.",
    depth: "next",
    whyItMatters:
      "Candidates dump both on the whiteboard without a reason. Interviewers want to know why PaymentMethod is an interface and why AbstractOrderParser may be a class — that choice signals whether you understand coupling.",
    theory: [
      "An interface is a contract with no (or minimal) implementation: a set of methods a type promises. It is the right default for ports, strategies, and role types because a class can implement many interfaces and you do not drag a hidden field graph along.",
      "An abstract class is a partial implementation. It can hold fields, protected helpers, and Template Method skeletons. That is useful when several types share a real algorithm and only hooks differ. It is costly because you get one parent, fragile hooks, and a temptation to stuff utilities into the base.",
      "In languages with default interface methods the line blurs. Still treat default methods as convenience, not as a place to hide stateful logic. State in an interface default is a surprise; state in an abstract class is expected but couples children to that state.",
      "A practical rule for interviews: start with an interface. Introduce an abstract class only after two implementers share a non-trivial block you would otherwise copy. That satisfies DRY without preemptive hierarchy.",
    ],
    howItWorks: [
      "Name the capability (`Payable`, `Lockable`, `Schedulable`). Write the methods and guarantees.",
      "If implementers share no code, stop at the interface.",
      "If they share a skeleton, add an abstract class that implements the interface and marks hooks abstract.",
      "Keep the rest of the system depending on the interface, not the abstract class, so tests and new families stay free.",
      "Do not mix unrelated capabilities on one abstract parent — split interfaces (ISP).",
    ],
    whenToUse: [
      "Interface: any injected collaborator, any test seam, any plugin point.",
      "Abstract class: Template Method over a family you own (parsers, game characters with a shared turn loop).",
      "Both together: interface for the world, abstract class as a convenience base for your own implementers.",
    ],
    whenNotToUse: [
      "Abstract class as a bag of static helpers — use a utility or a composed service.",
      "Interface with twenty methods 'for flexibility' — you have designed a class and called it an interface.",
    ],
    tradeoffs: [
      "Interfaces maximize replaceability; abstract classes maximize reuse of a skeleton.",
      "Changing an interface breaks all implementers; changing an abstract class can break children silently via hook order.",
    ],
    interviewTips: [
      "Say 'interface first' and only draw an abstract class when you can point at shared steps.",
      "If the language is Java/C#, mention a class can implement many interfaces but extend one class — that is why capabilities are interfaces.",
      "For 'should Vehicle be abstract?' answer: only if it has shared fields/invariants; otherwise Vehicle is an interface and Car/Bike hold their own data.",
    ],
    pitfalls: [
      "Empty abstract classes that only exist to group types — an interface or a marker is enough.",
      "Putting concrete vendor calls in the abstract class so every child is coupled to Stripe.",
      "Protected fields that children poke at, bypassing the skeleton.",
    ],
    practiceIdeas: [
      "Write PaymentMethod as an interface and AbstractRetryablePayment as an optional base for gateways that retry.",
      "Compare a BoardGame abstract class (shared turn loop) with a Strategy interface (AI players).",
    ],
    related: [
      "abstraction",
      "program-to-an-interface",
      "template-method",
      "solid-isp",
      "solid-dip",
    ],
  },
  {
    slug: "coupling-cohesion",
    track: "lld",
    category: "OOP",
    title: "Coupling and cohesion",
    summary:
      "Keep each class about one idea (high cohesion) and keep classes from knowing each other's guts (low coupling).",
    depth: "core",
    whyItMatters:
      "Every 'this design is messy' interview note is a coupling or cohesion complaint. God classes are low cohesion. A use case that new-s a SQL repository, formats HTML, and charges Stripe is high coupling. You cannot extend either.",
    theory: [
      "Cohesion asks: do the methods of this class work on the same data toward the same purpose? A `User` that validates passwords, renders profiles, and sends invoices is several classes wearing one name. Split until the name still matches every method.",
      "Coupling asks: how much does a change here force a change there? Content coupling (poking another object's fields) is worst. Common coupling (global mutable state) is close. Stamp coupling (passing a whole User when you needed an id) is the usual interview smell. Message coupling — calling a small interface — is the goal.",
      "Law of Demeter is a coupling rule: do not reach through neighbors (`order.getCustomer().getAddress().getZip()`). Ask the object that has the data. That also improves cohesion because the knowledge of address structure stays in Customer or Address.",
      "You cannot drive both metrics to extremes. A system of one-line classes is highly 'cohesive' and painfully coupled through a maze of calls. Aim for classes that can be explained in one sentence and that talk to a few well-named neighbors.",
    ],
    howItWorks: [
      "Write a one-sentence responsibility for each class. If you need 'and', split.",
      "List outgoing dependencies. If a domain class imports SQL, HTTP, and UI types, invert those dependencies.",
      "Replace fat parameter objects with the values the method actually uses, or with a dedicated command type.",
      "Hide internal collaborators; expose use-case methods instead of getter chains.",
      "When two classes change in lockstep every time, they may be one concept — merge or introduce a tighter module.",
    ],
    whenToUse: [
      "Reviewing any whiteboard design before you code.",
      "Deciding whether a Manager/Service is earning its keep or hoarding logic.",
      "Explaining why you extracted a PricingRules type from Order.",
    ],
    whenNotToUse: [
      "Do not split a 30-line class just to improve a cohesion score — wait for a second reason.",
      "Do not introduce an interface for every concrete class in a one-class program.",
    ],
    tradeoffs: [
      "Lower coupling usually means more types and more mapping (DTO ↔ domain).",
      "Higher cohesion can create more hops for a simple feature — worth it once the feature has rules.",
    ],
    interviewTips: [
      "If they ask 'why another class?', answer with cohesion: 'Order should not know GST slabs.'",
      "Point at a getter chain and offer a method on the owner — instant Law of Demeter credit.",
      "When time is short, keep cohesion in the domain and accept coupling at the edge (main, controller).",
    ],
    pitfalls: [
      "Utils and Helpers that import the world — coupling hubs.",
      "Circular package dependencies: Order → User → Order.",
      "Passing the entire application context into every constructor.",
    ],
    practiceIdeas: [
      "Take a 200-line TicketService and split pricing, reservation, and notification. Count remaining imports.",
      "Refactor order.getUser().getWallet().debit() into wallet.debit(order.total()).",
    ],
    related: [
      "solid-srp",
      "law-of-demeter",
      "separation-of-concerns",
      "encapsulation",
      "layered-architecture",
    ],
  },
  {
    slug: "immutability",
    track: "lld",
    category: "OOP",
    title: "Immutability",
    summary:
      "Prefer objects that do not change after construction so aliases, threads, and undo stacks cannot surprise you.",
    depth: "next",
    whyItMatters:
      "Mutable shared state is the root of race conditions, dirty caches, and 'I passed this object to two places and one corrupted it.' Immutable values make LLD concurrency and undo designs almost boring — which is what you want.",
    theory: [
      "An immutable object sets its fields in the constructor and never assigns them again. Any 'change' returns a new instance. Value objects (Money, DateRange, SpotId) should almost always be immutable. Entities can be mutable if their identity is stable, but even then prefer controlled mutation through methods.",
      "Immutability is a concurrency strategy: if nothing writes, readers need no lock. That is why immutable snapshots are the safest way to share a config or a price list across threads. It is also why functional updates work well for Memento and undo: each state is a value you can store.",
      "The cost is allocation and copying. For small values that is noise. For large graphs, copy-on-write, persistent data structures, or mutating in a tight private scope (builder → build immutable) are the usual compromises.",
      "Defensive copies matter at the boundary. If you accept a List in a constructor and store it, the caller can still mutate it. Copy in, copy out — or take an immutable type from the start.",
    ],
    howItWorks: [
      "Mark fields final / readonly. Provide no setters.",
      "If a field is a collection, store an unmodifiable copy.",
      "Implement 'updates' as methods that return a new instance (`withStatus(PAID)`).",
      "Use a Builder when construction has many optional parts; freeze on `build()`.",
      "Share immutable instances freely; confine mutable ones to a single owner.",
    ],
    whenToUse: [
      "Money, IDs, date ranges, addresses, messages, events, config snapshots.",
      "Keys in maps, cache entries, anything used from multiple threads.",
      "Undo/redo and event sourcing — states become values.",
    ],
    whenNotToUse: [
      "Hot inner loops that update large arrays in place — mutate locally, publish an immutable snapshot.",
      "Entities with a long life and frequent small updates (a game board) — mutate, but encapsulate.",
    ],
    complexity: {
      time: "O(k) to copy the changed parts of a value; O(1) to share an unchanged instance",
      space: "Extra copies proportional to update rate unless you use persistent/shared structure",
      notes:
        "Interviewers care more about correctness and ownership than about allocation constants.",
    },
    tradeoffs: [
      "More allocations vs fewer locks and fewer aliasing bugs.",
      "APIs become functional (`state = state.apply(event)`), which is clearer in concurrent designs and wordier in CRUD.",
    ],
    interviewTips: [
      "Make Money, Duration, and IDs immutable without being asked. It signals maturity.",
      "For a thread-safe cache, say 'immutable values plus a concurrent map' before you reach for locks.",
      "If they ask about undo, mention immutable snapshots or Memento storing values, not live objects.",
    ],
    pitfalls: [
      "Storing a caller-owned mutable list — the object is not actually immutable.",
      "Mutable static caches of 'immutable' objects that secretly get updated.",
      "Deep graphs where you copy everything on each keystroke — snapshot only the changed subtree.",
    ],
    practiceIdeas: [
      "Implement Money with plus/minus returning new Money; forbid setAmount.",
      "Build an immutable Config loaded once and swapped atomically on reload.",
    ],
    related: [
      "identity-vs-value-objects",
      "immutable-sharing",
      "memento-pattern",
      "builder-pattern",
      "race-deadlock-livelock",
    ],
  },
  {
    slug: "identity-vs-value-objects",
    track: "lld",
    category: "OOP",
    title: "Identity vs value objects",
    summary:
      "Entities are the same thing over time even if their fields change; values are equal when their data is equal and should be interchangeable.",
    depth: "next",
    whyItMatters:
      "Mixing these up produces broken equals/hashCode, duplicate bookings, and 'two User objects for one person.' DDD language helps, but the interview need is simpler: know what you compare and what you store as a key.",
    theory: [
      "An entity has an identity that outlives any particular field set. A `User` with id 42 is the same user after they change email. Equality for entities is identity (or the id). You mutate them, persist them, and talk about their lifecycle.",
      "A value object is defined by its attributes. `Money(100, INR)` equals any other `Money(100, INR)`. You do not update a Money in place; you replace it. Values are typically immutable, have no independent table row (or are embedded), and make excellent map keys and method arguments.",
      "Services are the third kind: no identity, no value equality, just behavior (`PaymentGateway`, `FareCalculator`). Do not force a service to look like an entity with a fake id.",
      "The design move is: lift primitives into values when they have rules (email format, money currency match, date ranges that cannot invert), and keep identity on the things the business names (Order, Vehicle, Booking).",
    ],
    howItWorks: [
      "For each noun, ask: if I copy all the fields, is it the same thing or a twin? Same thing → entity. Twin → value.",
      "Give entities an id. Implement equals/hashCode on that id or do not put them in sets at all — look them up by id.",
      "Give values equals/hashCode on all fields. Make them immutable.",
      "Put validation in value constructors (Email, Money, Phone).",
      "Keep services stateless where you can; inject them into entities or application services.",
    ],
    whenToUse: [
      "Anytime you are about to store an email or money as a raw string/int.",
      "When modeling bookings, users, spots — those are entities.",
      "When explaining why two Address objects with the same fields are interchangeable.",
    ],
    whenNotToUse: [
      "Do not invent an id for a price or a color.",
      "Do not make a 30-field 'value object' that is really an entity you were afraid to name.",
    ],
    tradeoffs: [
      "More types vs fewer primitive obsession bugs.",
      "Entity equality by id can surprise you if two instances are stale copies with different field values — treat one as the authority.",
    ],
    interviewTips: [
      "On the whiteboard, mark entities with id and values without. It makes the class diagram readable.",
      "If they ask 'where does validation live?', put format/range checks on values and business rules on entities/aggregates.",
      "Never put a mutable entity in a HashMap key. Use the id or an immutable value.",
    ],
    pitfalls: [
      "equals on all fields for an entity — changing email loses it in a Set.",
      "Mutable value objects used as map keys — the hash changes, the entry vanishes.",
      "Anemic entities plus a 1000-line service that owns all rules.",
    ],
    practiceIdeas: [
      "Model Order (entity) with Money and Address values; persist Order by id.",
      "Rewrite a User.equals that compares every field to compare id only.",
    ],
    related: [
      "entities-vs-values-vs-services",
      "immutability",
      "aggregates",
      "encapsulation",
      "hashmap-internals",
    ],
  },
  {
    slug: "has-a-is-a-uses-a",
    track: "lld",
    category: "OOP",
    title: "Has-a, is-a, and uses-a",
    summary:
      "Pick the relationship on purpose: is-a is subtyping, has-a is ownership or composition, uses-a is a short-lived collaboration.",
    depth: "core",
    whyItMatters:
      "Wrong relationship lines are the most common class-diagram failure. A Library that 'is-a' List of Books cannot enforce library rules. A User that 'has-a' PaymentGateway forever is equally confused. Name the line before you draw it.",
    theory: [
      "Is-a (inheritance or interface implementation) means the child is substitutable for the parent. Use it only when LSP holds. 'Car is-a Vehicle' is fine if every Vehicle method makes sense on Car. 'Square is-a Rectangle' usually is not, because a Rectangle caller may set width independently of height.",
      "Has-a is composition or aggregation. Composition: the part's lifetime is bound to the whole (an Order has LineItems that die with it). Aggregation: the part can outlive the whole (a Department has Employees who persist). In interviews, saying 'composition' for owned parts and 'reference' for shared ones is enough.",
      "Uses-a (dependency) is a method parameter, a short-lived collaborator, or a service you call but do not own. `Checkout` uses `PaymentGateway`. It should not store the gateway as if it were domain state, unless Checkout is an application service whose job is that wiring.",
      "Association multiplicity belongs on the diagram: 1, 0..1, 1..*, *. Those numbers become collection types and constructors. A ParkingLot has-many Floors; a Spot has-a optional Vehicle. Getting multiplicity wrong is how you allocate the wrong data structure.",
    ],
    howItWorks: [
      "For each pair of classes, write one sentence: A is a B / A has a B / A uses a B to do X.",
      "If the sentence needs 'sometimes is-a', it is not is-a — use a role, strategy, or flag.",
      "Decide lifetime: if destroying A must destroy B, compose B. If B is shared, hold an id or a weak reference.",
      "Decide multiplicity and pick field types (optional, list, map by id).",
      "Keep uses-a out of the entity when it is an infrastructure service — inject it into an application service instead.",
    ],
    whenToUse: [
      "Every class diagram you draw in an interview.",
      "When someone proposes inheritance for reuse — check the sentence.",
      "When deciding whether a service is a field or a parameter.",
    ],
    whenNotToUse: [
      "Do not over-annotate every temporary variable as uses-a on the diagram — show types that matter.",
    ],
    tradeoffs: [
      "Composition gives control and clearer ownership; shared references reduce copies but need identity and lifecycle rules.",
      "Is-a is the strongest coupling; earn it.",
    ],
    interviewTips: [
      "Talk while you draw: 'Lot has floors, floor has spots, spot has optional vehicle. PaymentService is used by ParkingService, not owned by Spot.'",
      "If they ask aggregation vs composition, give the lifetime test in one sentence and move on.",
      "Wrong is-a is a gift: correct it and mention LSP.",
    ],
    pitfalls: [
      "Every relationship drawn as inheritance because the arrow is easy.",
      "Bidirectional has-a both ways with no owner — updates desync. Pick an owner.",
      "Entities holding infrastructure services so a Book 'has-a' SmtpClient.",
    ],
    practiceIdeas: [
      "Redraw a hotel design labeling each edge is-a / has-a / uses-a and multiplicity.",
      "Convert Employee is-a Address into Employee has-a Address.",
    ],
    related: [
      "composition-over-inheritance",
      "inheritance",
      "solid-lsp",
      "ownership",
      "class-diagrams",
    ],
  },
];
