import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "pattern-cheatsheet",
    track: "lld",
    category: "Pattern Cheatsheet",
    title: "Situation → pattern mapping",
    summary:
      "A working table: when you hear a situation in an LLD, which pattern or principle actually fits — and which nearby pattern you should not reach for.",
    depth: "core",
    whyItMatters:
      "Patterns are a vocabulary for variants. The skill is mapping, not reciting GoF. This topic is the lookup table you run in step 5 of the interview method and again when they add a variant.",
    theory: [
      "Creational situations: 'only one logger' → Singleton (and then prefer DI). 'I do not want new in the use case / type varies' → Factory Method or a simple factory. 'Products must match as a family (theme, platform)' → Abstract Factory. 'Many optional parts / immutable product' → Builder. 'Duplicate this template/graph' → Prototype (watch deep vs shallow).",
      "Structural situations: 'vendor API does not match our port' → Adapter. 'add retry/log/metrics around the same interface' → Decorator. 'hide a noisy subsystem behind one verb' → Facade (your application service). 'control access or lazy-load the same interface' → Proxy. 'tree of parts that share an operation (size, draw)' → Composite. 'two axes of variation would explode subclasses' → Bridge. 'millions of similar immutable glyphs' → Flyweight.",
      "Behavioral situations: 'several algorithms for one step' → Strategy. 'many listeners to a fact' → Observer / event bus. 'queue, undo, macro, job as an object' → Command. 'behavior changes with status' → State (or a transition table). 'fixed pipeline, hook steps' → Template Method. 'walk without exposing storage' → Iterator. 'middleware / first handler that can stop' → Chain of Responsibility. 'colleagues should not form an N² mesh' → Mediator. 'add operations to a stable tree' → Visitor. 'snapshot and restore without leaking fields' → Memento. 'optional collaborator should not be null' → Null Object.",
      "Concurrency and design situations that are not GoF but show up as 'which pattern': 'burst producer, slow IO' → producer-consumer + thread pool. 'no locks on this object' → actor or immutable snapshot. 'last seat / last item' → atomic reserve on an aggregate. 'retrying a charge' → idempotent command. 'test without SQL' → port + fake (DIP). If two patterns both fit, pick the smaller one (KISS).",
    ],
    howItWorks: [
      "Hear the variant in product language ('weekend price', 'also SMS', 'undo that').",
      "Map it to one row of this table — one pattern, one seam.",
      "Put an interface on the diagram; implement one concrete.",
      "If the situation is 'two axes', check Bridge; if it is 'one axis', Strategy is enough.",
      "If you are about to apply three patterns to a vending machine, stop and use State + Inventory.",
    ],
    whenToUse: [
      "Choosing a seam after the first diagram.",
      "The add-a-variant moment.",
      "Reviewing a design that already has five patterns — delete extras.",
    ],
    whenNotToUse: [
      "Starting the interview from this table instead of from use cases.",
      "Forcing a pattern when a method and an if will do (one algorithm, one status).",
    ],
    tradeoffs: [
      "A named pattern helps the interviewer follow you; a wrong name costs more than 'I'll extract an interface'.",
      "Nearby pairs are easy to mix up: Decorator vs Proxy, Strategy vs State, Facade vs Adapter, Factory Method vs Abstract Factory. When unsure, state the intent in English first.",
    ],
    interviewTips: [
      "Say the situation then the pattern: 'new fee rule → Strategy'. That sentence is the cheat sheet in use.",
      "For undo, pick Command or Memento and say why (inverse vs snapshot).",
      "For 'wrap Stripe', Adapter (shape) plus maybe Decorator (retry) — two intents, two wrappers.",
    ],
    pitfalls: [
      "Abstract Factory for one class.",
      "Visitor on a parking lot.",
      "Singleton repository you cannot test.",
      "Calling every application service a Mediator.",
    ],
    practiceIdeas: [
      "Take ten design titles in this track and write the one pattern you would leave a seam for — then compare to the design topic.",
      "In a mock, only allow yourself to introduce a pattern after the first variant is asked.",
    ],
    related: [
      "add-a-variant",
      "strategy-pattern",
      "decorator-pattern",
      "state-pattern",
      "factory-method",
    ],
  },
  {
    slug: "pattern-lookalikes",
    track: "lld",
    category: "Pattern Cheatsheet",
    title: "Pattern lookalikes",
    summary:
      "Pairs people confuse on the whiteboard: Decorator vs Proxy, Strategy vs State, Adapter vs Facade, Factory Method vs Abstract Factory, Observer vs Mediator vs Event bus.",
    depth: "next",
    whyItMatters:
      "Interviewers often ask 'is that not just X?'. Distinguishing lookalikes is how you show you understand intent, not class diagrams you memorized.",
    theory: [
      "Decorator vs Proxy: both wrap the same interface. Decorator stacks extra behavior (retry, metrics) and is meant to compose. Proxy controls access or location (lazy, security, remote) and is usually a single stand-in. A caching wrapper can be named either — pick the intent you care about.",
      "Strategy vs State: both are interchangeable objects the context delegates to. Strategy is 'how I do this step' and is often swapped by the client. State is 'what I am' and usually swaps itself after an event. FeePolicy is Strategy; Vending Collecting vs Idle is State.",
      "Adapter vs Facade: Adapter makes an existing type satisfy an existing target interface (Stripe → PaymentPort). Facade invents a simpler API over several types (ParkingService.park). If you own both sides and they mismatch, you might just rename rather than adapt.",
      "Factory Method vs Abstract Factory vs simple factory: simple factory is one function/switch that returns a product (fine in interviews). Factory Method lets a workflow defer one product. Abstract Factory returns a family of related products that must stay consistent. Builder is not a factory — it assembles one complex object stepwise.",
      "Observer vs Mediator vs Event bus: Observer is subject→many listeners, subject does not know who. Mediator is a problem-specific hub that colleagues must talk through (chat room, dialog). Event bus is a generic mediator with typed events. If handlers should not know each other and the publisher should not route, use Observer/bus. If routing is the product (which runway), use a named Mediator.",
    ],
    howItWorks: [
      "When you name a pattern, add a half-sentence of intent.",
      "If they say 'is that X?', compare on intent, not on whether there is a wrapper field.",
      "Prefer the smaller pattern when both apply (Strategy over Bridge for one axis).",
      "Do not correct the interviewer aggressively — map their word to your seam and proceed.",
    ],
    whenToUse: [
      "Any time you are about to draw two wrappers.",
      "When they challenge your pattern name.",
      "When studying, as a flashcard set.",
    ],
    whenNotToUse: [
      "Spending five minutes distinguishing diamonds in UML when the use case is uncoded.",
    ],
    tradeoffs: [
      "Precise names vs speed. Intent in English is enough if the name slips.",
    ],
    interviewTips: [
      "Memorize these five pairs. They cover most 'gotcha' questions.",
      "If you used the wrong name but the seam is right, say 'I meant decorator for retry' and move on.",
      "Command vs Memento: inverse vs snapshot — the other common pair.",
    ],
    pitfalls: [
      "Treating all wrappers as Adapter.",
      "Using State classes for fee types.",
      "An EventBus that is secretly a Mediator stuffed with domain ifs.",
    ],
    practiceIdeas: [
      "Write one sentence of intent for each pair from memory, then check this topic.",
      "In a design, label each wrapper Adapter/Decorator/Proxy before you code it.",
    ],
    related: [
      "pattern-cheatsheet",
      "decorator-pattern",
      "proxy-pattern",
      "strategy-pattern",
      "state-pattern",
    ],
  },
];
