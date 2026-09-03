import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "strategy-pattern",
    track: "lld",
    category: "Behavioral Patterns",
    title: "Strategy",
    summary:
      "Put a family of interchangeable algorithms behind one interface and inject the one you need — pricing, scheduling, matching, sorting.",
    depth: "core",
    whyItMatters:
      "Strategy is the interview pattern. Almost every 'now support another way to X' is a strategy. If you can extract one cleanly, you have demonstrated OCP, DIP, and composition.",
    theory: [
      "A Strategy interface declares the algorithm (`fee(ticket)`, `pick(requests)`, `compare(a,b)`). Concrete strategies implement variants. The context (Lot, Elevator, Checkout) holds a strategy and delegates. You change behavior by swapping the object, not by subclassing the context.",
      "Strategies should be stateless or hold only their own configuration (a surge multiplier). They should not reach back into the context's private fields; pass the data they need. That keeps them testable and reusable.",
      "A switch on type inside the context is the thing you are replacing. A switch inside a factory that picks the strategy is fine — one place. Runtime change is allowed: peak-hour elevator can replace its scheduler at 5pm.",
      "Related: State looks similar but the object thinks it is changing kind; Strategy is 'how I do this step'. Template Method uses inheritance for the skeleton; Strategy uses composition for the whole algorithm.",
    ],
    howItWorks: [
      "Name the varying algorithm and its inputs/outputs.",
      "Extract an interface. Move each branch to a class.",
      "Inject the strategy into the context constructor or setter.",
      "Keep the context responsible for the workflow around the call.",
      "Add a variant by adding a class and wiring it.",
    ],
    whenToUse: [
      "Multiple algorithms for one job: fares, elevator dispatch, payment, compression, sort order, AI difficulty.",
      "When you would otherwise inherit just to change one method.",
      "When tests need a deterministic algorithm (fixed clock, fake matcher).",
    ],
    whenNotToUse: [
      "There is one algorithm and no realistic second — keep a method.",
      "The 'strategies' share no interface honestly (different inputs) — you do not have a family.",
    ],
    tradeoffs: [
      "More types vs a growing switch.",
      "Context and strategy can get chatty if you pass too little data and the strategy callbacks into the context.",
    ],
    interviewTips: [
      "Default answer for policy variation. Say the word, draw the interface, implement two concretes if time.",
      "For elevator, SchedulingStrategy is the expected extension point.",
      "Do not make a strategy for every if — only for a closed family of algorithms.",
    ],
    pitfalls: [
      "Strategy that depends on a concrete context type — you have not inverted anything.",
      "God context that still has the switch and a unused strategy field.",
      "Mutable shared strategy with hidden state and races.",
    ],
    practiceIdeas: [
      "Parking fees: Hourly, Daily, Weekend — swap on the lot.",
      "Sort a product list with PriceStrategy vs PopularityStrategy.",
    ],
    related: [
      "solid-ocp",
      "program-to-an-interface",
      "state-pattern",
      "template-method",
      "pattern-cheatsheet",
    ],
  },
  {
    slug: "observer-pattern",
    track: "lld",
    category: "Behavioral Patterns",
    title: "Observer",
    summary:
      "Let dependents subscribe to events so the subject can notify many listeners without knowing who they are.",
    depth: "core",
    whyItMatters:
      "Notifications, UI updates, in-process pub/sub, and 'on order placed' side effects are Observer. It keeps the subject closed while new listeners appear — and it is how you accidentally create loops and god event buses.",
    theory: [
      "A Subject holds a list of Observers and notifies them on state change (`orderPlaced`, `spotFreed`). Observers implement `update(event)`. The subject does not import concrete listener classes. That is DIP for reactions.",
      "Push vs pull: push sends the data in the event; pull sends 'something changed' and observers query. Push is simpler if the payload is small and stable. Pull couples observers back to the subject.",
      "Synchronous observers run in the subject's thread: a slow email send blocks park(). For interviews, either keep observers tiny or hand off to a queue (which is still Observer at the edge). Order of notification is usually registration order; do not depend on it unless you say so.",
      "Unsubscription and lifetime matter. Leaked observers are leaked memory. Re-entrant notify (an observer mutates the subject) is a classic bug — copy the listener list before iterating, or queue mutations.",
    ],
    howItWorks: [
      "Define an Event type or a small set of notify methods.",
      "Subject: subscribe, unsubscribe, notify (iterate a copy of the list).",
      "Keep subject business methods calling notify at the end of a successful change.",
      "Observers do one thing; they do not become a second domain.",
      "Document sync vs async delivery.",
    ],
    whenToUse: [
      "Multiple independent reactions to one change: email, analytics, inventory projection.",
      "UI widgets observing a model.",
      "In-process event bus / domain events.",
    ],
    whenNotToUse: [
      "One caller that should just invoke a method — a function parameter is enough.",
      "When you need guaranteed transactional side effects in the same commit — maybe call the port in the use case instead of hoping an observer runs.",
    ],
    tradeoffs: [
      "Open set of listeners vs implicit flow that is hard to trace.",
      "Sync simplicity vs async scale and failure isolation.",
    ],
    interviewTips: [
      "For 'also send SMS', add an observer/listener rather than stuffing ParkingLot.",
      "Mention copying the list and not doing IO in the observer if they care about quality.",
      "If they want reliability, upgrade the story to a queue + workers — still the same subscription idea.",
    ],
    pitfalls: [
      "Observer updates the subject and retriggers forever.",
      "Forgetting unsubscribe (especially inner classes / lambdas).",
      "A global EventBus that every class publishes to — debugging fog.",
    ],
    practiceIdeas: [
      "Stock ticker with two displays subscribed.",
      "OrderService notifies Emailer and Analytics on place(); unit-test the service with a fake observer.",
    ],
    related: [
      "event-bus",
      "in-process-pubsub",
      "mediator-pattern",
      "solid-ocp",
      "notification-dispatcher",
    ],
  },
  {
    slug: "command-pattern",
    track: "lld",
    category: "Behavioral Patterns",
    title: "Command",
    summary:
      "Turn a request into an object so you can queue it, log it, undo it, or send it to someone else later.",
    depth: "core",
    whyItMatters:
      "Text editors, remote controls, job queues, and macros are Command. If they ask for undo, you almost always want commands (or events) that can invert, not a pile of boolean flags.",
    theory: [
      "A Command object binds a receiver and an action: `LightOnCommand` holds a Light and implements `execute()` / optionally `undo()`. An invoker (button, queue, toolbar) only knows Command. You can store commands, compose them (macro), and replay them.",
      "Undo needs enough state: either the command remembers previous values (Memento-like payload) or each command has a true inverse (`deposit` undoes `withdraw` only if you stored the amount). Not every command is undoable (send email).",
      "Commands are also a concurrency and reliability tool: put them on a queue, make execute idempotent, retry. That is the same object, different invoker.",
      "Do not wrap every method call in a command class. Use it when you need the request as data.",
    ],
    howItWorks: [
      "Define Command with execute() and, if needed, undo().",
      "Each concrete command holds a receiver + parameters.",
      "Invoker stores history (stack) for undo/redo.",
      "For macros, a Composite command executes children.",
      "For queues, serialize the command data, not a live receiver pointer, unless in-process.",
    ],
    whenToUse: [
      "Undo/redo, macros, wizard steps, job queues, GUI buttons, transactional scripts.",
      "When the caller should not know the receiver type.",
    ],
    whenNotToUse: [
      "A direct method call with no queue, undo, or logging need.",
      "When an event-sourced log of domain events is the clearer model (similar, but past-tense facts).",
    ],
    tradeoffs: [
      "Many small classes vs one function pointer — classes win when undo/metadata matter.",
      "History memory vs ability to rewind.",
    ],
    interviewTips: [
      "Text editor and remote control are the textbook prompts. Draw Command, Invoker, Receiver.",
      "Say what undo stores. Vague 'call undo' fails.",
      "Pair with Memento if the state is a snapshot instead of inverse operations.",
    ],
    pitfalls: [
      "Commands that contain all the business logic instead of telling the receiver.",
      "Undo that does not work after subsequent commands (you needed a stack, not one slot).",
      "Queuing non-idempotent commands without ids.",
    ],
    practiceIdeas: [
      "Editor with type, delete, and undo stack.",
      "Remote with on/off and a macro 'party mode'.",
    ],
    related: [
      "memento-pattern",
      "text-editor",
      "job-scheduler",
      "composite-pattern",
      "idempotent-ops",
    ],
  },
  {
    slug: "state-pattern",
    track: "lld",
    category: "Behavioral Patterns",
    title: "State",
    summary:
      "Replace a jungle of status flags with objects that each implement behavior for one state and decide the next state.",
    depth: "core",
    whyItMatters:
      "Vending machines, orders, TCP-like connections, and elevators are state-heavy. A switch on enum in every method duplicates transitions. State objects make illegal actions obvious.",
    theory: [
      "A Context holds a State. Each State implements the same event methods (`insertCoin`, `select`, `refund`). Legal actions do work and may `context.setState(newState)`. Illegal actions fail fast. The enum switch is distributed into types.",
      "Use State when behavior differs a lot per status. If states only change a label, an enum + a transition table is simpler. State pattern is about polymorphic behavior, not just storing a name.",
      "Who owns transitions? Either the state (this event always goes there) or a table the context consults. Keep it consistent. Shared data (balance, current floor) stays on the context; states use it through a narrow API so they do not poke fields.",
      "Combine with a diagram. If you cannot draw the machine, you cannot implement it.",
    ],
    howItWorks: [
      "Draw the state diagram first.",
      "Create a State interface with all events.",
      "Implement one class per state; illegal events throw or no-op by product rule.",
      "Context delegates events to the current state and holds shared data.",
      "Transition by replacing the state object after a successful event.",
    ],
    whenToUse: [
      "Machines, workflows, connections, game turns, document approval — when each state has different methods that work.",
      "When adding a state would force edits to every switch.",
    ],
    whenNotToUse: [
      "Two statuses with the same methods — an enum is enough.",
      "When you only need to persist a status string.",
    ],
    tradeoffs: [
      "A class per state vs a compact transition table. Tables win for many states and uniform handling; classes win for rich behavior.",
      "More types vs deleting 15 if-else chains.",
    ],
    interviewTips: [
      "For vending / traffic light / order lifecycle, draw states, then say 'State pattern or a table'. Pick one and implement two transitions.",
      "Show an illegal event failing — that is the point.",
      "Do not use State for strategy (fee types). Wrong pattern.",
    ],
    pitfalls: [
      "States that new the next state and also mutate context fields randomly.",
      "Forgetting to persist the state name if the object is saved.",
      "Boolean flags alongside State objects — two sources of truth.",
    ],
    practiceIdeas: [
      "Vending machine states with coin insert and dispense.",
      "Order: Pending/Paid/Shipped/Cancelled with illegal transitions tested.",
    ],
    related: [
      "use-case-state-diagrams",
      "strategy-pattern",
      "vending-machine",
      "traffic-signal",
      "tell-dont-ask",
    ],
  },
  {
    slug: "template-method",
    track: "lld",
    category: "Behavioral Patterns",
    title: "Template Method",
    summary:
      "Write an algorithm skeleton in a base type and let subclasses fill in the hooks — same steps, different ingredients.",
    depth: "next",
    whyItMatters:
      "Parsers, game turns, and ETL jobs often share a fixed sequence. Template Method captures that sequence once. The risk is a fragile base class; know when Strategy would be cleaner.",
    theory: [
      "The abstract class implements `run()` as `step1(); hook(); step3();` where some steps are final and some are abstract or default hooks. Subclasses implement hooks only. The order is closed; the variation is open (OCP via inheritance).",
      "This is inheritance-heavy. If hooks proliferate or subclasses need to change the order, you wanted Strategy or a pipeline of functions. Hollywood principle: 'don't call us, we'll call you' — subclasses do not call the skeleton, the skeleton calls them.",
      "Default hooks (empty `afterSave()`) are convenient and easy to ignore. Prefer abstract hooks when the subclass must decide, so you do not silently skip work.",
      "In interviews, mention it for 'same workflow, different format' and be ready to say you would compose strategies if a second axis appears.",
    ],
    howItWorks: [
      "Write the skeleton as a final/non-overridable method.",
      "Mark varying steps abstract (or small protected hooks).",
      "Keep shared invariant checks in the skeleton.",
      "Implement two subclasses to prove the hooks are enough.",
      "Do not let subclasses override the skeleton unless you really mean it.",
    ],
    whenToUse: [
      "Fixed pipelines: parse → validate → transform → emit; takeTurn → move → render.",
      "Frameworks that let users plug steps (JUnit-like setups).",
    ],
    whenNotToUse: [
      "The sequence itself varies — Strategy or a list of steps.",
      "You do not own the base or the base is in another team — prefer composition.",
    ],
    tradeoffs: [
      "Very clear order vs inheritance coupling and hook-order bugs.",
      "Fewer objects than a strategy-per-step vs harder reuse of a single hook.",
    ],
    interviewTips: [
      "Good for 'all reports export the same way but write different files'.",
      "If they add a second variation axis, migrate the hook to a Strategy.",
      "Do not use Template Method for parking fees. That is Strategy.",
    ],
    pitfalls: [
      "Subclasses calling super.super and depending on hook timing.",
      "A skeleton with twelve hooks — you have a god workflow.",
      "Protected fields instead of hook parameters.",
    ],
    practiceIdeas: [
      "DataMiner: open, extract, parse, analyze, close — PdfMiner vs CsvMiner.",
      "Turn-based game: startTurn, play, endTurn with two player types.",
    ],
    related: [
      "strategy-pattern",
      "interfaces-vs-abstract-classes",
      "inheritance",
      "solid-ocp",
      "factory-method",
    ],
  },
  {
    slug: "iterator-pattern",
    track: "lld",
    category: "Behavioral Patterns",
    title: "Iterator",
    summary:
      "Walk a collection without exposing its representation — the reason clients can for-each a list, tree, or graph the same way.",
    depth: "core",
    whyItMatters:
      "If callers know you used a 2D array of spots, you cannot change to a map. Iterator (or an Iterable view) is the abstraction. You also need it for Composite trees and for concurrent collections that snapshot.",
    theory: [
      "An Iterator holds the cursor: `hasNext()` / `next()` (or `current` + `advance`). The collection's `iterator()` returns a new cursor. Multiple iterators can walk independently. The collection's internals stay private.",
      "Fail-fast iterators detect concurrent modification (modCount) and throw. Snapshot iterators copy ids at start. Concurrent iterators have weaker consistency. In an interview, pick one and say what happens if someone parks while you iterate.",
      "For trees, DFS vs BFS is an iterator choice, not a change to the tree. For graphs, iterators must handle cycles. For maps, key/value/entry iterators are different views.",
      "Do not hand out the raw list. If you only need read, return an unmodifiable iterator or a stream. If you need to remove during iteration, use the iterator's remove, not the collection's.",
    ],
    howItWorks: [
      "Hide the storage. Expose iterator() / [Symbol.iterator] / Iterable.",
      "Implement a cursor object with hasNext/next.",
      "Decide fail-fast vs snapshot.",
      "Do not expose getInternalArray().",
      "For composites, write a tree iterator instead of leaking children lists.",
    ],
    whenToUse: [
      "Any collection you might reimplement.",
      "Trees, graphs, matrices of spots, paginated services (cursor as iterator).",
    ],
    whenNotToUse: [
      "A single value — no collection.",
      "When the client must have random access by index and you already expose a list DTO at the boundary.",
    ],
    complexity: {
      time: "Usually O(1) next() for arrays/lists; O(h) or amortized for trees",
      space: "O(1) cursor, or O(n) if you snapshot",
      notes: "State the concurrent-modification policy.",
    },
    tradeoffs: [
      "Abstraction vs slightly more code than a public array.",
      "Fail-fast safety vs snapshot memory.",
    ],
    interviewTips: [
      "When you show Floor.spots, say you iterate them, you do not return the list.",
      "For file trees, mention a DFS iterator.",
      "Pagination is an iterator with a token — connect the ideas if they ask APIs.",
    ],
    pitfalls: [
      "Returning the live list from getter.",
      "Modifying the collection while iterating without a defined policy.",
      "Iterator that skips or double-visits because next() has side effects twice.",
    ],
    practiceIdeas: [
      "Iterate a parking lot's spots without exposing Floor[].",
      "BST in-order iterator with an explicit stack.",
    ],
    related: [
      "composite-pattern",
      "encapsulation",
      "pagination-in-service-apis",
      "in-memory-file-system",
      "public-surface",
    ],
  },
  {
    slug: "chain-of-responsibility",
    track: "lld",
    category: "Behavioral Patterns",
    title: "Chain of Responsibility",
    summary:
      "Pass a request along a line of handlers until one of them handles it — filters, validators, support tiers, middleware.",
    depth: "next",
    whyItMatters:
      "Auth then validation then rate-limit then the use case is a chain. Logging levels, ATM cash dispensers, and approval workflows are chains. You add a handler without editing the others (OCP).",
    theory: [
      "Each Handler has `setNext` and `handle(request)`. It either handles, or forwards, or handles-and-forwards (middleware). The client sends the request to the head. The chain order is the product rule (auth before business, $100 bills before $20s).",
      "A handler should not know who is next beyond the link. That keeps them reusable. Building the chain is a composition-root job, sometimes from config.",
      "If exactly one handler must win, stop when handled. If all should run (filters), always forward. If none handle, fail — do not swallow.",
      "Versus switch: a switch is closed and visible; a chain is open and implicit. Versus Event bus: a chain has order and usually one path; a bus fans out.",
    ],
    howItWorks: [
      "Define a Handler interface with handle + next.",
      "Implement focused handlers.",
      "Assemble the list in the right order at startup.",
      "Send requests to the head. Define what 'unhandled' means.",
      "Keep handlers from skipping the chain with global jumps.",
    ],
    whenToUse: [
      "Middleware, validation pipelines, logging levels, support escalation, ATM dispensers, approval limits.",
      "When the set of processors will grow.",
    ],
    whenNotToUse: [
      "A fixed two-step sequence that will not grow — just call A then B.",
      "When every handler must see every event and order does not matter — Observer.",
    ],
    tradeoffs: [
      "Open to new handlers vs harder to see the full path.",
      "Debugging a miss requires tracing the chain.",
    ],
    interviewTips: [
      "ATM cash + logging filters are the usual examples. Middleware on an HTTP API is the modern one.",
      "Say who builds the chain and what happens if nobody handles.",
      "For validators, a list of `Rule` with a loop is the same pattern without the next pointer — that is fine to say.",
    ],
    pitfalls: [
      "Handlers that know the concrete next type.",
      "Forgetting a tail so requests vanish.",
      "A chain that is actually a tree of ifs inside one class.",
    ],
    practiceIdeas: [
      "Auth → Role → RateLimit → Controller as handlers.",
      "ATM dispenser chain for 2000/500/100 notes.",
    ],
    related: [
      "decorator-pattern",
      "solid-ocp",
      "atm",
      "boundary-validation",
      "mediator-pattern",
    ],
  },
  {
    slug: "mediator-pattern",
    track: "lld",
    category: "Behavioral Patterns",
    title: "Mediator",
    summary:
      "Route communication through a hub so colleagues do not each know every other colleague — air traffic control for objects.",
    depth: "next",
    whyItMatters:
      "Chat rooms, dialog boxes, and game boards become spaghetti when every widget calls every other. A mediator restores SRP: widgets emit events, the mediator decides who to tell.",
    theory: [
      "Colleagues hold a reference to a Mediator, not to each other. When something happens (`landed`, `textChanged`), they notify the mediator. The mediator calls the others (`runway.clear`, `okButton.enable`). The interaction policy lives in one place.",
      "This is the opposite of a web of observers pointing at each other. It is similar to an event bus, but a mediator is usually problem-specific and knows the types (LandingControl knows Runways and Planes). A bus is generic.",
      "God-mediator is the failure mode: all application logic migrates to the hub. Keep domain rules on colleagues; keep routing and choreography on the mediator.",
      "MVC's controller is a mediator-ish object. In-process pub/sub is a generic mediator. Name the one you mean.",
    ],
    howItWorks: [
      "List the pairwise calls you want to delete.",
      "Introduce a mediator interface those colleagues call.",
      "Implement routing in one concrete mediator.",
      "Register colleagues with the mediator.",
      "Keep colleague-to-colleague imports illegal.",
    ],
    whenToUse: [
      "UI forms with interdependent fields, chat rooms, air-traffic / tower, game piece interactions that would otherwise be N².",
      "When adding a colleague would edit every other colleague.",
    ],
    whenNotToUse: [
      "Two objects that naturally talk — a mediator is ceremony.",
      "When a simple Observer from one subject is enough.",
    ],
    tradeoffs: [
      "Decoupled colleagues vs a hub that can become a god object.",
      "Easier to add a colleague vs harder to see a single flow (use a sequence diagram).",
    ],
    interviewTips: [
      "If they mention a control tower or a chat server, Mediator is the word.",
      "For air traffic vs just Observer: mediator knows the policy (which runway); observers just fan out.",
      "Do not mediator-ize parking lot. Lot as aggregate root is enough.",
    ],
    pitfalls: [
      "Mediator that owns all state of all colleagues.",
      "Colleagues still calling each other 'just this once'.",
      "Generic EventBus used as a dumping ground with string event names and no types.",
    ],
    practiceIdeas: [
      "Dialog: checkbox enables a text field and the OK button via FormMediator.",
      "ChatRoom as mediator between Users.",
    ],
    related: [
      "observer-pattern",
      "event-bus",
      "mvc-mvvm",
      "in-process-pubsub",
      "solid-srp",
    ],
  },
  {
    slug: "visitor-pattern",
    track: "lld",
    category: "Behavioral Patterns",
    title: "Visitor",
    summary:
      "Add an operation over a stable object structure without changing the element classes — double dispatch for compilers, ASTs, and document trees.",
    depth: "advanced",
    whyItMatters:
      "Visitor is the 'I cannot keep adding methods to Node' pattern. It is also easy to misuse on a hierarchy that still changes. Interviews use it for file systems (size, search, virus-scan) and expression trees.",
    theory: [
      "Each Element has `accept(Visitor)`. The visitor has `visitConcreteA`, `visitConcreteB`. accept calls the matching visit — that is double dispatch: first on the element type, then on the visitor type. New operations become new visitors; the elements stay closed.",
      "The cost: adding a new element type changes every visitor. So use Visitor when the structure is stable and the operations are not. The opposite of OCP-on-types; it is OCP-on-operations.",
      "Visitors can carry state (a size accumulator, a string builder). They can be paired with Composite. They are overkill if you own the elements and only have one operation — just add a method.",
      "In languages with pattern matching over sealed types, a switch can replace Visitor. Mention that; still know the pattern.",
    ],
    howItWorks: [
      "Give each element accept(Visitor v) { v.visit(this); }.",
      "Visitor interface lists visit methods for every concrete element.",
      "Each operation is a Visitor implementer.",
      "Walk the structure (often from a composite root) calling accept.",
      "When you add an element, update all visitors — or do not choose this pattern.",
    ],
    whenToUse: [
      "ASTs, document object models, file trees with many reports, shape hierarchies with export/draw/area as separate ops.",
      "When element classes must stay untouched (library code).",
    ],
    whenNotToUse: [
      "The hierarchy still grows often.",
      "A single operation — a method on Component is enough.",
    ],
    tradeoffs: [
      "Easy new operations, painful new types — the inverse of adding methods on a Composite.",
      "Visitor code can sit far from the data, hurting cohesion.",
    ],
    interviewTips: [
      "If they ask to add virus-scan and zip-size without editing File/Folder much, Visitor is the textbook move. Composite methods are also acceptable — compare the two.",
      "Say 'double dispatch' once if you want the vocabulary point.",
      "Do not Visitor a parking lot.",
    ],
    pitfalls: [
      "Forgetting a visit method when adding a type.",
      "Visitor that mutates elements in surprising ways.",
      "Using Visitor because it sounds advanced.",
    ],
    practiceIdeas: [
      "File/Folder with SizeVisitor and SearchVisitor.",
      "Expression AST with EvalVisitor and PrintVisitor.",
    ],
    related: [
      "composite-pattern",
      "in-memory-file-system",
      "solid-ocp",
      "iterator-pattern",
      "pattern-cheatsheet",
    ],
  },
  {
    slug: "memento-pattern",
    track: "lld",
    category: "Behavioral Patterns",
    title: "Memento",
    summary:
      "Capture an object's internal state in an opaque snapshot so you can restore it later without breaking encapsulation.",
    depth: "next",
    whyItMatters:
      "Undo that pokes private fields from the outside is not undo — it is a leak. Memento lets the originator export a snapshot and import it, while caretakers (history stacks) only store the token.",
    theory: [
      "Three roles: Originator (the editor or machine), Memento (the snapshot), Caretaker (undo stack, checkpoint service). The memento is opaque to the caretaker — ideally a type with no getters the caretaker understands. The originator can read it because it created it (or it is a nested type).",
      "Snapshots can be full state or diffs. Full is simpler and heavier. Combine with Command: commands undo via inverses; mementos undo via restore. Editors often use both: command for the action, memento for the bytes.",
      "Immutability helps: a memento should not change after creation. Version your mementos if the originator schema evolves. Do not put live listeners or thread locks inside a snapshot.",
      "Prototype clone can produce a memento-like copy, but clone usually is not opaque and may copy too much (identity). Prefer an explicit snapshot type.",
    ],
    howItWorks: [
      "Add originator.createMemento() and restore(memento).",
      "Store only what you need to rebuild invariants.",
      "Caretaker pushes/pops mementos; it does not inspect them.",
      "On undo, restore and keep a redo stack if required.",
      "Decide max history size so memory stays bounded.",
    ],
    whenToUse: [
      "Editors, games (checkpoints), wizards, interactive machines, transactional in-memory rollback.",
      "When Command inverses would be messy (graphical state).",
    ],
    whenNotToUse: [
      "You can invert with a simple command (add 5 / subtract 5).",
      "You need a durable audit log — persist events, not opaque blobs, unless the blob is the feature.",
    ],
    complexity: {
      time: "O(s) to copy state of size s per snapshot",
      space: "O(h·s) for h history entries unless you store diffs",
      notes: "Bound h. Incremental snapshots if s is large.",
    },
    tradeoffs: [
      "Encapsulation vs memory.",
      "Opaque tokens vs the inability to preview undo without restoring.",
    ],
    interviewTips: [
      "Pair with Command for a text editor: 'command for the verb, memento if restore is easier'.",
      "Say the caretaker cannot see fields. That is the encapsulation test.",
      "For games, a checkpoint memento is enough — do not overbuild.",
    ],
    pitfalls: [
      "Memento with public fields the UI edits.",
      "Storing a reference to mutable originator state (not a copy).",
      "Unlimited undo in an interview without mentioning a bound.",
    ],
    practiceIdeas: [
      "Text buffer with snapshots every edit and undo/redo stacks.",
      "Vending machine checkpoint before a failed dispense, then restore.",
    ],
    related: [
      "command-pattern",
      "text-editor",
      "immutability",
      "encapsulation",
      "prototype-pattern",
    ],
  },
  {
    slug: "null-object",
    track: "lld",
    category: "Behavioral Patterns",
    title: "Null Object",
    summary:
      "Provide a do-nothing implementer of an interface so callers do not sprinkle null checks through the design.",
    depth: "next",
    whyItMatters:
      "Optional loggers, missing discounts, empty customers, and absent strategies produce `if (x != null)` in six places. A NullLogger or NoDiscount that implements the same interface keeps the path linear.",
    theory: [
      "A Null Object implements the collaborator interface with neutral behavior: log is a no-op, discount is 0, iterator is empty, observer ignores. Callers always have a real object. Polymorphism replaces the null test.",
      "This is not for 'error, this must exist'. Fail fast when absence is a bug (missing required PaymentMethod). Null Object is for optional behavior you are willing to skip.",
      "Be careful with null objects that return more nulls — you only moved the check. Return empty collections and zero values. Identity: there is often a single reusable instance (flyweight-ish) because it is immutable.",
      "Optional/Maybe types are the type-system alternative. In interviews, Null Object is still useful when you already have an interface and a composition root.",
    ],
    howItWorks: [
      "Identify an optional collaborator with a clear neutral behavior.",
      "Implement the interface as no-ops / zeros / empty.",
      "Always inject either the real or the null object — never null.",
      "Share one instance if immutable.",
      "Do not use it to hide missing required configuration.",
    ],
    whenToUse: [
      "Optional logging, metrics, discounts, notifications, default strategies.",
      "Empty iterators and empty composites.",
    ],
    whenNotToUse: [
      "Required dependencies — crash at wiring time.",
      "When the caller must distinguish 'missing' from 'zero' (a missing price is not $0).",
    ],
    tradeoffs: [
      "Fewer branches vs hiding the fact that nothing is configured.",
      "A class to maintain vs Optional at every call site.",
    ],
    interviewTips: [
      "If they say 'logging is optional', inject NullLogger. Cleaner than if (logger != null).",
      "For missing seats or empty carts, empty collections beat null.",
      "Mention it is a special Strategy/Observer that does nothing.",
    ],
    pitfalls: [
      "Null object that throws 'not implemented'.",
      "Using it for error handling (failed payment is not a NullPayment that pretends success).",
      "Mutable null objects with accidental state.",
    ],
    practiceIdeas: [
      "DiscountPolicy: SeasonalDiscount vs NoDiscount.",
      "Customer.notifier is EmailNotifier or NullNotifier.",
    ],
    related: [
      "strategy-pattern",
      "observer-pattern",
      "fail-fast",
      "logger",
      "program-to-an-interface",
    ],
  },
];
