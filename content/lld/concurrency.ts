import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "producer-consumer",
    track: "lld",
    category: "Concurrency",
    title: "Producer–consumer",
    summary:
      "Producers put work on a bounded queue; consumers take it. Decouple rates and isolate failures with a clear backpressure story.",
    depth: "core",
    whyItMatters:
      "This is the default concurrency design in LLD: log appenders, job workers, notification senders, crawlers. If you cannot explain the queue bound and what happens when it is full, you do not have a design — you have a thread leak.",
    theory: [
      "A buffer sits between producers and consumers. Producers wait (or fail, or drop) when the buffer is full; consumers wait when it is empty. That protocol is backpressure. An unbounded queue is a memory bomb under a fast producer.",
      "The buffer is the shared mutable state. Protect it with a blocking queue, a condition variable plus mutex, or an actor mailbox. Do not roll a linked list plus boolean flags unless they ask you to implement the queue.",
      "Multiple consumers give you parallelism; they must be able to take work safely (the queue does that). Work items should be independent or carry enough identity for idempotency if retried. Poison pills or a closed flag shut the system down.",
      "In-process this is a queue. Across processes it is Kafka/Rabbit — but the LLD is still: who produces, who consumes, what is the bound, what is the failure policy.",
    ],
    howItWorks: [
      "Define the work item (immutable message).",
      "Choose a bounded BlockingQueue (or implement wait/notify on a ring).",
      "Producers: offer/put with a policy — block, timeout, drop, reject.",
      "Consumers: take/poll in a loop; handle errors without dying silently.",
      "Shut down: stop producers, drain or discard, interrupt consumers.",
    ],
    whenToUse: [
      "Any time one side is bursty: ingest vs write, UI vs IO, requests vs emails.",
      "Fan-out to a worker pool.",
      "Smoothing load in front of a scarce resource (DB, SMTP, GPU).",
    ],
    whenNotToUse: [
      "Synchronous request/response where the caller must have the result in-line — use a Future, or just call.",
      "When you need transactional 'happens with the commit' side effects — do not hide them in an async queue without saying so.",
    ],
    complexity: {
      time: "O(1) enqueue/dequeue for a proper queue",
      space: "O(bound) for the buffer, plus in-flight work",
      notes: "Throughput is min(produce rate, consume rate, bound effects).",
    },
    tradeoffs: [
      "Decoupling vs extra latency and the need for a failure/retry policy.",
      "Bound too small: producers stall. Bound too large: latency and RAM grow.",
    ],
    interviewTips: [
      "Always name the bound and the full-queue policy. That is the senior sentence.",
      "Offer a thread pool of consumers, not an unbounded new Thread per item.",
      "If they want code, implement a bounded buffer with wait/notify or use a language queue and focus on the API.",
    ],
    pitfalls: [
      "Unbounded queues.",
      "Consumers that swallow exceptions and stop pulling.",
      "Sharing the mutable work item after enqueue — make it immutable.",
    ],
    practiceIdeas: [
      "Logger that enqueues lines; a background thread writes them.",
      "Notification dispatcher with a queue of 100 and a reject policy.",
    ],
    related: [
      "bounded-buffer",
      "thread-pool",
      "producer-consumer-queue",
      "future-promise",
      "notification-dispatcher",
    ],
  },
  {
    slug: "thread-pool",
    track: "lld",
    category: "Concurrency",
    title: "Thread pool",
    summary:
      "Reuse a fixed set of workers to run tasks so you do not create a thread per request and exhaust the machine.",
    depth: "core",
    whyItMatters:
      "Thread-per-task looks simple and dies under load. A pool caps concurrency, reuses stacks, and gives you a queue for overflow. Connection pools are the same idea for sockets.",
    theory: [
      "A pool has N workers looping on a task queue. Submit puts a task (Runnable/Callable) on the queue. A worker takes it, runs it, then loops. N is a configuration: CPU-bound ≈ cores; IO-bound can be higher. The queue bound and rejection policy are part of the pool, not an afterthought.",
      "Rejection policies: abort (throw), caller-runs (backpressure on the submitter), discard, discard-oldest. Pick one that matches the product. Silent discard is rarely right for money or bookings.",
      "Lifecycle: start, submit, shutdown (stop accepting, finish running), shutdownNow (interrupt). Tasks should be interruptible or at least not hold locks forever. Do not leak the pool as a global static if tests need isolation.",
      "A pool is not a silver bullet for shared data. Tasks that mutate the same inventory still need locks or actors. The pool only bounds compute/IO concurrency.",
    ],
    howItWorks: [
      "Choose nThreads and queue capacity.",
      "Workers block on take(); run(); repeat.",
      "submit() either enqueues or applies the rejection policy.",
      "Return a Future if the caller needs a result.",
      "Shutdown cooperatively; await termination with a timeout.",
    ],
    whenToUse: [
      "Web request handling, notifications, image processing, any burst of similar tasks.",
      "When you would have written `new Thread(task).start()` in a loop.",
    ],
    whenNotToUse: [
      "A single background thread is enough (one logger writer).",
      "You need strict ordering on one key — one actor/thread per key may be better.",
    ],
    tradeoffs: [
      "Bounded resources vs queueing delay.",
      "caller-runs couples the producer to work it did not want to do — sometimes that is the correct backpressure.",
    ],
    interviewTips: [
      "Never say 'I'll spawn a thread for each park()'. Say 'a pool of workers + queue'.",
      "Ask whether tasks are CPU or IO to justify N.",
      "Mention rejection policy when they ask 'what if traffic spikes'.",
    ],
    pitfalls: [
      "Unbounded pool (cached thread pool without a cap) under a flood.",
      "Tasks that block workers on each other → deadlock (all workers wait for a task that cannot be scheduled).",
      "Using the same CPU pool for long IO.",
    ],
    practiceIdeas: [
      "Implement a tiny pool: array of workers + bounded queue + abort policy.",
      "Compare notification sending with and without a pool under 10k submits.",
    ],
    related: [
      "producer-consumer",
      "future-promise",
      "connection-pool",
      "job-scheduler",
      "thread-safe-logger",
    ],
  },
  {
    slug: "future-promise",
    track: "lld",
    category: "Concurrency",
    title: "Future and promise",
    summary:
      "A Future is a read-only handle to a result that is not here yet; a Promise is the writable side that completes it.",
    depth: "next",
    whyItMatters:
      "Once you have a pool, callers need a way to wait, compose, and timeout. Futures are that API. Without them you invent boolean flags and missed signals.",
    theory: [
      "submit(callable) returns a Future. The caller may get(), get(timeout), cancel, or attach a callback (thenCompose). The worker calls promise.complete(value) or completeExceptionally. One completion wins; further completions are ignored or illegal — say which.",
      "Blocking get() on the caller thread can deadlock if that thread is also a pool worker needed to finish the task. Prefer callbacks or a different thread to wait. Timeouts are part of the contract, not optional polish.",
      "Composition (thenApply, allOf, anyOf) is how you avoid callback pyramids. For LLD, knowing get + timeout + exception is enough; mention composition if they chain payment then email.",
      "A Future is not a thread. Creating a Future does not run anything unless you also schedule the work. Completing a promise from the wrong thread still needs safe publication (it usually is, if you use the language primitive).",
    ],
    howItWorks: [
      "Create a pending promise/future pair when you submit work.",
      "Run the work on a worker; complete with value or error.",
      "Let callers wait with timeout or register a continuation.",
      "Define cancel: interrupt the worker, or just detach the caller.",
      "Never complete twice with different values.",
    ],
    whenToUse: [
      "Any async API: pay, geocode, download, schedule.",
      "Joining several independent calls (allOf).",
      "Hiding a thread pool behind a service method.",
    ],
    whenNotToUse: [
      "A local computation that is already done — return the value.",
      "Fire-and-forget where you truly do not care (still log failures).",
    ],
    tradeoffs: [
      "Non-blocking composition vs harder stack traces.",
      "get() simplicity vs deadlock risk on worker threads.",
    ],
    interviewTips: [
      "Signature: `Future<Receipt> charge(card)` plus a timeout in the use case.",
      "If they ask how to implement, a wait/notify latch plus a result field is enough.",
      "Mention cancellation and what happens to the money if cancelled — product question.",
    ],
    pitfalls: [
      "Calling get() with no timeout in a request thread.",
      "Swallowing ExecutionException and returning null.",
      "Completing the future before publishing related state.",
    ],
    practiceIdeas: [
      "Wrap a thread-pool upload in Future<Url> with a 2s timeout.",
      "Implement a TinyFuture with synchronized wait/notify.",
    ],
    related: [
      "thread-pool",
      "producer-consumer",
      "actor-model",
      "errors-vs-results",
      "job-scheduler",
    ],
  },
  {
    slug: "actor-model",
    track: "lld",
    category: "Concurrency",
    title: "Actor",
    summary:
      "Give each actor a mailbox and a single thread of execution so you reason about state without locks on that state.",
    depth: "advanced",
    whyItMatters:
      "Actors are the 'do not share memory, share messages' design. Elevators, players, connection sessions, and aggregates that must serialize updates map well. You trade lock complexity for message-protocol complexity.",
    theory: [
      "An actor owns private state, a queue of messages, and processes one message at a time. Other objects do not call its methods on their threads; they send messages. The runtime may multiplex many actors on a pool, but each actor is logically single-threaded.",
      "This eliminates data races on the actor's fields. You still have protocol races: two 'debit 100' messages vs a balance of 150 are sequenced; you decide the second fails. Deadlocks become 'I never got a reply' — use timeouts.",
      "Supervision and location transparency are framework extras (Akka, Erlang). In an LLD interview, a class with a BlockingQueue and a loop is a honest actor. Do not pretend you built Erlang.",
      "When to pick actors over locks: many independent objects (per-user, per-room) that should not block each other. A single global actor is just a single thread — sometimes that is enough (the lot).",
    ],
    howItWorks: [
      "Define message types (immutable).",
      "Each actor: mailbox + loop: take; match; mutate private state; maybe send.",
      "Expose only tell(message) or ask(message)→Future.",
      "Never publish internal mutable objects in a message.",
      "Bound the mailbox; define overflow.",
    ],
    whenToUse: [
      "Per-entity serialization: one actor per game table, per websocket, per account.",
      "When lock order across objects is getting scary.",
      "Chatty object graphs that would otherwise need many coordinated locks.",
    ],
    whenNotToUse: [
      "A few fields and one lock would do.",
      "Hot tight loops that cannot afford queue hops.",
    ],
    tradeoffs: [
      "No locks inside the actor vs latency and memory of mailboxes.",
      "Harder debugging of message flows vs easier local invariants.",
    ],
    interviewTips: [
      "For 'thread-safe elevator bank', one actor per car plus a dispatcher actor is a clean story.",
      "Say messages are immutable and mailboxes are bounded.",
      "If they want Java code, a single-thread executor per actor is an implementation.",
    ],
    pitfalls: [
      "Sending mutable objects in messages.",
      "Blocking in the actor loop on another actor's ask() — deadlock.",
      "Unbounded mailboxes.",
    ],
    practiceIdeas: [
      "BankAccount actor that handles Debit/Credit/GetBalance messages.",
      "Two elevator car actors and a dispatcher that sends Assign(floor).",
    ],
    related: [
      "immutable-sharing",
      "producer-consumer",
      "race-deadlock-livelock",
      "elevator",
      "in-process-pubsub",
    ],
  },
  {
    slug: "rw-lock",
    track: "lld",
    category: "Concurrency",
    title: "Read–write lock",
    summary:
      "Allow many concurrent readers or one writer so read-heavy objects (caches, catalogs) do not serialize on every get.",
    depth: "next",
    whyItMatters:
      "A single mutex on an LRU cache makes every get wait. If gets dominate and are short, a read-write lock (or a concurrent map plus careful eviction) recovers throughput. Used blindly it starves writers or deadlocks on upgrade.",
    theory: [
      "The lock has readLock and writeLock. Many threads may hold read. A writer needs exclusive access; it waits for readers to drain. Semantics vary: some prefer writers (avoid starvation), some prefer readers. Know that the policy exists.",
      "Upgrade (read → write) is dangerous: two upgraders wait on each other. Release read, then acquire write, and re-check the condition (the value may have changed). That is the same check-then-act you always needed.",
      "RW locks are heavier than mutexes. If critical sections are tiny or writes are common, a mutex wins. Immutable snapshots (copy-on-write) can beat both for mostly-read config.",
      "Do not hold a read lock while calling out to code that might want a write lock on the same object.",
    ],
    howItWorks: [
      "Document which operations are reads vs writes.",
      "get/contains take readLock; put/evict take writeLock.",
      "Keep sections short; copy what you need, then release.",
      "Never upgrade in place; release and re-check.",
      "Pick a fairness/starvation story if they ask.",
    ],
    whenToUse: [
      "Read-mostly in-memory catalogs, configs, session maps.",
      "Caches where get is far more common than put.",
    ],
    whenNotToUse: [
      "Write-heavy counters — use a mutex or atomic.",
      "Already-concurrent collections that handle this internally.",
    ],
    tradeoffs: [
      "Better read parallelism vs more complex lock and starvation risk.",
      "Versus copy-on-write: COW has no reader lock but write copies the structure.",
    ],
    interviewTips: [
      "For a thread-safe cache, mention RW lock or ConcurrentHashMap + synchronized eviction. Do not just say 'synchronize everything'.",
      "If they ask about writer starvation, name a fair lock or write preference.",
      "For config reload, prefer atomic swap of an immutable snapshot over RW lock if the map is small.",
    ],
    pitfalls: [
      "Read-to-write upgrade deadlock.",
      "Holding read lock during IO.",
      "Forgetting that iterators may need the lock too.",
    ],
    practiceIdeas: [
      "Catalog.get vs Catalog.add with ReentrantReadWriteLock.",
      "Compare throughput of mutex vs RW lock on a 99% read benchmark (even a thought experiment is fine).",
    ],
    related: [
      "lru-cache",
      "thread-safe-cache-counter-inventory",
      "immutable-sharing",
      "race-deadlock-livelock",
      "config-loader",
    ],
  },
  {
    slug: "double-checked-locking",
    track: "lld",
    category: "Concurrency",
    title: "Double-checked locking",
    summary:
      "A lazy-init idiom: check without a lock, then check again under a lock. It is easy to get memory-visibility wrong.",
    depth: "advanced",
    whyItMatters:
      "Interviewers use DCL to test whether you understand safe publication, not just synchronized. You should be able to write a correct version and also say 'I would rather use a holder class or an injected singleton'.",
    theory: [
      "Naive lazy singleton: if (instance == null) { synchronized { if (instance == null) instance = new X(); } }. The double check avoids locking after init. The bug is that `new X()` is not atomic: a thread can see a non-null reference before the constructor finishes, unless the reference is published safely.",
      "In Java, `volatile` on the instance field provides the needed store/load barrier. The initialization-on-demand holder (static inner class) or an enum singleton is simpler and correct. In C++, you need acquire/release atomics. In JS single-threaded event loop, DCL is usually pointless.",
      "DCL is for one-time lazy init of a shared reference. It is not a general pattern for maps or caches (use concurrent maps). It is not an excuse to publish half-built objects.",
      "If init can fail, define whether the next caller retries. A failed init that leaves a broken instance is worse than a lock.",
    ],
    howItWorks: [
      "Use a volatile/atomic field for the instance.",
      "First check unsynchronized; return if non-null.",
      "Lock; second check; construct; assign; unlock.",
      "Do not write other fields after publication without safe publication of those too.",
      "Prefer language-standard lazy holders when available.",
    ],
    whenToUse: [
      "Rare: expensive singleton-like resource you truly want lazy and shared.",
      "As a discussion of memory models.",
    ],
    whenNotToUse: [
      "Almost all application code — inject or use eager init.",
      "Per-key lazy maps — use computeIfAbsent on a concurrent map.",
    ],
    tradeoffs: [
      "Avoiding a lock on the hot path vs a subtle visibility bug if you forget volatile.",
      "Cleverness vs the static holder which is one line and correct.",
    ],
    interviewTips: [
      "Write volatile, explain why. Then say you would not ship this if a holder class exists.",
      "If they forbid volatile, say DCL is incorrect and use full synchronization.",
      "Do not use DCL for a parking lot.",
    ],
    pitfalls: [
      "Non-volatile instance field.",
      "Doing extra work between new and assign that another thread can observe.",
      "Copying the idiom onto a HashMap of singletons without atomics.",
    ],
    practiceIdeas: [
      "Write a correct lazy ConnectionFactory and a unit test that hammers get() from many threads.",
      "Rewrite it as a static holder and compare readability.",
    ],
    related: [
      "singleton-pattern",
      "immutable-sharing",
      "race-deadlock-livelock",
      "connection-pool",
      "config-loader",
    ],
  },
  {
    slug: "immutable-sharing",
    track: "lld",
    category: "Concurrency",
    title: "Immutable sharing",
    summary:
      "Share data that cannot change — or atomically swap a whole snapshot — so readers need no lock.",
    depth: "next",
    whyItMatters:
      "The easiest correct concurrent design is: mutate on one thread, publish an immutable value, let everyone read it. Config, price lists, routing tables, and game snapshots all work this way.",
    theory: [
      "If an object is immutable and safely published, any thread can read it forever. Safe publication means the reference is written with a barrier: volatile, synchronized, concurrent collection, or completion of a thread that the reader joins.",
      "Copy-on-write: writers clone the structure, apply the change, then atomically swap the reference (AtomicReference, volatile). Readers always see a consistent snapshot, possibly stale by one version. That is often fine for config and not fine for bank balances.",
      "This is the functional style applied to concurrency. Combine with actors (messages are immutable) and with mementos (snapshots). The cost is allocation; the win is the absence of reader locks and of torn reads.",
      "A structure with an immutable shell and a mutable inside is a lie. Defensive copies or truly immutable collections are required.",
    ],
    howItWorks: [
      "Make the shared type immutable (final fields, copied collections).",
      "Confine mutation to a builder or a single writer.",
      "Publish via atomic swap or a concurrent map put.",
      "Readers load the reference once per operation and use only that snapshot.",
      "Document staleness: readers may see version n-1.",
    ],
    whenToUse: [
      "Config, feature flags, catalogs, routing, compiled regexes, price cards.",
      "Messages between threads and actors.",
      "Undo snapshots.",
    ],
    whenNotToUse: [
      "High-frequency in-place updates of a huge array (games, image buffers) — mutate locally, snapshot if needed.",
      "When every reader must see the write immediately and the object is large — maybe a lock is cheaper than copying.",
    ],
    tradeoffs: [
      "Allocation and copy cost vs almost no coordination.",
      "Stale reads vs always-locked fresh reads.",
    ],
    interviewTips: [
      "For thread-safe config reload: build new Config, atomic swap. Beautiful one-liner design.",
      "For caches of values, store immutable values even if the map is concurrent.",
      "If they fear copies, mention structural sharing / persistent collections only if you can explain them.",
    ],
    pitfalls: [
      "Publishing a 'immutable' object that still has a mutable list field.",
      "Readers caching a snapshot forever and missing required updates.",
      "Swapping non-atomically (write two fields, readers see mixed versions).",
    ],
    practiceIdeas: [
      "Reload a fee schedule file and swap it under the lot without locking readers.",
      "Pass immutable Events on a queue between producers and consumers.",
    ],
    related: [
      "immutability",
      "config-loader",
      "actor-model",
      "rw-lock",
      "memento-pattern",
    ],
  },
  {
    slug: "race-deadlock-livelock",
    track: "lld",
    category: "Concurrency",
    title: "Races, deadlocks, and livelocks",
    summary:
      "A race is uncoordinated access to shared state; a deadlock is a wait cycle; a livelock is motion without progress. Name them and design them out.",
    depth: "core",
    whyItMatters:
      "Every thread-safety follow-up is one of these. If you can point at the shared data, the lock order, and the retry loop, you look like you have shipped concurrent code.",
    theory: [
      "A data race (narrow) is conflicting unsynchronized accesses, one a write. A race condition (broader) is a correctness bug that depends on timing — check-then-act (`if (!map.contains) map.put`) is the usual one. Fix by making the check and act atomic (lock, computeIfAbsent, DB unique constraint).",
      "Deadlock: four conditions — mutual exclusion, hold and wait, no preemption, circular wait. Break any one. In practice: lock in a global order (account ids sorted), use tryLock with timeout, avoid holding a lock while calling out, keep lock scope small. Detect with timeouts and thread dumps.",
      "Livelock: threads keep changing state in response to each other (two people stepping aside in the same direction) and never proceed. Random backoff, priority, or a coordinator fixes it. Starvation is a sibling: a thread never gets the lock because others always win — fair locks or writer preference.",
      "Lost wakeup is a condition-variable bug: signal before wait, or wait without a while(predicate) loop. Always wait in a loop on the condition.",
    ],
    howItWorks: [
      "List shared mutable locations. Each needs an owner: lock, actor, or atomic.",
      "For multi-lock operations, sort locks by a stable key.",
      "Use while (!ready) wait(); never if.",
      "Put timeouts on lock acquire and on remote calls under a lock (better: do not call remote under a lock).",
      "Add backoff/jitter to retry loops.",
    ],
    whenToUse: [
      "Any time you introduce a second thread or a thread pool.",
      "When reviewing a design that locks two aggregates.",
      "When a test 'sometimes fails'.",
    ],
    whenNotToUse: [
      "Do not add locks 'just in case' on immutable objects.",
      "Do not explain all four deadlock conditions if there is only one lock — be proportional.",
    ],
    tradeoffs: [
      "Coarse locks: fewer deadlocks, more contention.",
      "Fine locks: more parallelism, more order bugs.",
      "Lock-free: more progress guarantees, much harder proofs.",
    ],
    interviewTips: [
      "When they say 'make it thread-safe', first name the shared maps. Then pick one lock or one actor per aggregate.",
      "For transfer(a,b), sort accounts by id before locking. Classic.",
      "If you use wait/notify, say the while loop out loud.",
    ],
    pitfalls: [
      "Nested locks in opposite order in two methods.",
      "check-then-act on a concurrent map.",
      "notify instead of notifyAll when multiple predicates share a monitor.",
    ],
    practiceIdeas: [
      "Write a broken check-then-act cache, then fix it with computeIfAbsent.",
      "Implement transfer with ordered locks and a test that runs 1000 threads.",
    ],
    related: [
      "ownership",
      "thread-safe-cache-counter-inventory",
      "rw-lock",
      "actor-model",
      "bounded-buffer",
    ],
  },
  {
    slug: "thread-safe-cache-counter-inventory",
    track: "lld",
    category: "Concurrency",
    title: "Thread-safe cache, counter, and inventory",
    summary:
      "Three standard concurrent objects: a counter (atomics), a cache (map + eviction policy), and inventory (atomic reserve/release with no oversell).",
    depth: "core",
    whyItMatters:
      "These are the concrete follow-ups after 'make it thread-safe'. If you can design all three, you can handle seats, likes, and LRU in the same round.",
    theory: [
      "Counter: prefer AtomicInteger/Long or a LongAdder for hot increments. `++` on a field is not atomic. If the counter is part of a larger invariant (occupied + free == capacity), do not use a standalone atomic — lock the aggregate or update both fields together.",
      "Cache: ConcurrentHashMap gets you thread-safe get/put but not a correct LRU by itself. Eviction needs a coordinated structure (linked list + map) under a lock, or a library. Reads can use an RW lock or CHM; moving a node to head is a write. Document whether get updates recency (it usually does).",
      "Inventory / seats: reserve must be atomic with the decrement. Patterns: synchronized on the SKU, stripe locks by item id, a DB row lock, or an actor per SKU. Over-sell is the race `if (count > 0) count--`. Pair reserve with a timeout and release, and make confirm idempotent.",
      "Idempotency keys matter when clients retry. A set of processed reservation ids under the same lock/map as the count keeps double-submit from double-decrement.",
    ],
    howItWorks: [
      "Counter: atomic increment; read with get(); reset only if product allows.",
      "Cache: map for O(1) lookup; lock around evict/move-to-head; immutable values.",
      "Inventory: lock per SKU or actor; reserve returns a reservation id; confirm/release are explicit.",
      "Never update count and collection in two unsynchronized steps.",
      "Write a test with two threads on the last item — only one wins.",
    ],
    whenToUse: [
      "Likes, remaining seats, rate-limiter counts, LRU/LFU, warehouse stock.",
      "Any interview that starts sequential and then says 'now concurrent'.",
    ],
    whenNotToUse: [
      "A single-threaded game loop — atomics add noise.",
      "Distributed inventory — this LLD is in-process; say you would move the invariant to the DB or Redis.",
    ],
    complexity: {
      time: "O(1) increment; O(1) cache get/put if structures are hashed; inventory O(1) per SKU lock",
      space: "O(n) entries; plus reservation records if you track holds",
      notes: "Correctness first. Do not claim lock-free LRU unless you can implement it.",
    },
    tradeoffs: [
      "One global lock is easy and slow; per-key locks are fast and can deadlock if you lock two SKUs (kits).",
      "Lost updates vs over-reservation: pessimistic lock vs optimistic version — pick one.",
    ],
    interviewTips: [
      "For the last-seat problem, write the atomic reserve method, not a comment that says 'synchronize here'.",
      "For LRU + threads, say 'I will lock writes and eviction; I will not hand-roll ConcurrentLinkedHashMap unless asked'.",
      "Mention idempotency if they mention retries or double-clicks.",
    ],
    pitfalls: [
      "Using HashMap from multiple threads.",
      "Updating LRU order outside the lock.",
      "reserve() without release() on failure after a later step (payment) fails.",
    ],
    practiceIdeas: [
      "Inventory.reserve(sku, qty, requestId) that is safe for 100 threads on qty=1.",
      "Thread-safe LRU get/put with a mutex and a unit test.",
    ],
    related: [
      "lru-cache",
      "race-deadlock-livelock",
      "idempotent-ops",
      "rate-limiter",
      "cart-checkout",
    ],
  },
];
