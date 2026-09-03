import { problem, type ProblemCard } from "./types";

export const PACK: Record<string, ProblemCard> = {
  encapsulation: problem(
    "ParkingSpot has public occupied and vehicle. Callers set them separately and the two fields disagree.",
    "Hide the fields. One verb must keep occupied iff a vehicle is present.",
    "occupy(car) succeeds; setOccupied(true) does not exist. A later thread-safety ask locks that one method.",
    [
      "This spot can be occupied and empty. Fix the API.",
      "Now a handicap-only rule — who enforces it?",
      "Make occupy safe when two cars arrive at once.",
    ],
  ),
  abstraction: problem(
    "Trip switches on RideType to price. Next week they add pooling and surge.",
    "Name the capability checkout may depend on, and keep vendor math out of the signature.",
    "FareCalculator.quote(trip) — add AirportFlat by adding a class, not an else-if.",
    [
      "Checkout should not know how UPI works. Draw the type.",
      "A second fare rule appears. What stays untouched?",
      "Tests must run with no payment gateway.",
    ],
  ),
  inheritance: problem(
    "Someone drew Penguin extends Bird with fly() that throws. Payroll has Manager extends Employee just to reuse name.",
    "Which relationships are really is-a? Where does a collaborator belong instead?",
    "FlyingBehavior on birds that fly. Manager has a Role, not a parent class.",
    [
      "Is ElectricCar a Car? What must Car still guarantee?",
      "They push Square extends Rectangle. What breaks?",
      "Rewrite the bird tree so fly is not on the base type.",
    ],
  ),
  polymorphism: problem(
    "Chess validator is five instanceof chains. A sixth piece will miss a branch.",
    "One operation on a shared contract. Construct the concrete at the edge.",
    "Piece.legalMoves(board). Adding Knight is a class. The factory may still switch once.",
    [
      "Now support motorcycles. Point at what you add.",
      "Keep the type switch in one factory — domain talks to the interface.",
      "Notification dispatcher only knows Channel.send.",
    ],
  ),
  "composition-over-inheritance": problem(
    "They want LoggedRetryUpiGateway extends UpiGateway, then PeakHourDestinationElevator.",
    "Assemble pricing, locking, and retry as fields you inject. Do not subclass each mix.",
    "CoffeeMachine has Recipe, Inventory, Payment. Add logging by wrapping the gateway, not a new child.",
    [
      "Elevator has a SchedulingPolicy — it is not PeakHourElevator.",
      "Retry plus metrics plus the real rail. How many new types?",
      "Admin is a User with a Role, not a subclass.",
    ],
  ),
  "interfaces-vs-abstract-classes": problem(
    "The board has both IPaymentMethod and AbstractPayment with no shared steps. Vehicle is an empty abstract class.",
    "Decide capability vs partial implementation. Depend on the contract, not the base.",
    "PaymentMethod is an interface. Add AbstractRetryablePayment only after two gateways share a retry skeleton.",
    [
      "Should Vehicle be abstract or an interface? Why?",
      "A class can implement many roles but extend one parent — what does that imply?",
      "Template-method parsers vs strategy AI players — which construct?",
    ],
  ),
  "coupling-cohesion": problem(
    "TicketService prices, writes SQL, formats HTML, and texts SMS. Checkout calls order.getUser().getWallet().debit().",
    "One sentence per class. Depend on small neighbors, not guts.",
    "Split pricing, reservation, notify. wallet.debit(order.total()) — Checkout does not walk the graph.",
    [
      "Why another class? Order should not know GST slabs.",
      "That getter chain — where does the method go?",
      "A Utils helper imports the world. What do you cut?",
    ],
  ),
  immutability: problem(
    "Money has setAmount. Two threads share a Config map and one reloads keys in place. Undo stores live objects.",
    "Values that never change after construction. Swap a whole snapshot when config reloads.",
    "Money.plus returns new Money. Config is built, then AtomicReference.set. Undo stores copies.",
    [
      "Make Money and IDs immutable without being asked.",
      "Thread-safe fee table — lock readers or swap a snapshot?",
      "Undo that cannot corrupt the live buffer.",
    ],
  ),
  "identity-vs-value-objects": problem(
    "User.equals compares every field, so a changed email drops them from a Set. Money has an id column.",
    "What stays itself when fields change? What is equal when data matches?",
    "Order is an entity by id. Money(100, INR) equals any other 100 INR. Email validates in its constructor.",
    [
      "Mark entities with id and values without on the diagram.",
      "Where does email-format validation live?",
      "Never put a mutable User in a HashMap key.",
    ],
  ),
  "has-a-is-a-uses-a": problem(
    "Library extends ArrayList<Book>. User has-a SmtpClient. Every arrow on the diagram is inheritance.",
    "Pick is-a, has-a, or uses-a, plus multiplicity and who dies with whom.",
    "Lot has floors, floor has spots, spot has optional vehicle. ParkingService uses PaymentPort — Spot does not own it.",
    [
      "Talk while you draw: has-a / is-a / uses-a and the numbers.",
      "Aggregation vs composition — one lifetime sentence.",
      "Employee is-a Address became has-a Address.",
    ],
  ),

  "solid-srp": problem(
    "ParkingLotManager occupies spots, computes fees, writes SQL, prints tickets, and sends SMS.",
    "Split so each type has one reason to change. The service may orchestrate; it must not hoard math.",
    "They add SMS on park. You add a notifier. Lot.occupy does not open.",
    [
      "Finance and ops both edit Order. How do you cut?",
      "Now print a different ticket format — which file changes?",
      "Split a 150-line Library into catalog, loan policy, notifier.",
    ],
  ),
  "solid-ocp": problem(
    "Adding ElectricVehicle means editing FeeCalculator, Ticket, and the nightly report — each has the same switch.",
    "Keep the park path closed. A new type or wrapper extends behavior.",
    "FeePolicy interface. Weekend rates are a class. Lot.park is untouched.",
    [
      "If you add another vehicle I will add a class, not edit the lot.",
      "Point at the extension point.",
      "The same switch still lives in three classes — is that open/closed?",
    ],
  ),
  "solid-lsp": problem(
    "Callers write if (bird instanceof Penguin). Square overrides setWidth and silently changes height. ReadOnlyFile extends File and write() throws.",
    "Every child must honor the parent contract. If it cannot, the parent is wrong.",
    "Shape.area() on immutable values. fly() is not on Bird. No UnsupportedOperationException overrides.",
    [
      "Square extends Rectangle — what does a setter caller assume?",
      "The caller should not branch on subtype. Remove the branch.",
      "A List.add that throws on an immutable list — what broke?",
    ],
  ),
  "solid-isp": problem(
    "Device has print, fax, staple, recharge. Printer implements three no-ops. Query handlers depend on a 12-method Repository.",
    "Role-sized interfaces so a client is not compiled against methods it never calls.",
    "Workable vs Feedable. OrderQueries for the read side. Printer does not implement recharge.",
    [
      "Robot should not implement eat. Split the interface.",
      "A read-only admin screen — extract a query port.",
      "Plugin SPI is 20 methods. Shrink it.",
    ],
  ),
  "solid-dip": problem(
    "BookingService does new MySqlBookingDao() and imports Stripe. Tests need a database to confirm a booking rule.",
    "High-level policy names a port. SQL and HTTP implement it and are injected at the edge.",
    "PaymentPort.charge. In-memory repo in the demo. Composition root news StripeAdapter.",
    [
      "Draw the arrow from adapter to port, not service to SqlDao.",
      "Swap MySQL for a HashMap without editing the use case.",
      "Clock port so a loan test can freeze due dates.",
    ],
  ),
  dry: problem(
    "SUV pays 20 in park(), unpark(), and the nightly report. Someone extracted process(isCancel) because two methods shared four lines.",
    "One home for the same knowledge. Leave look-alike code alone if it will change for different reasons.",
    "FeeSchedule used by park and report. Booking and cancel stay two methods — no boolean flag.",
    [
      "The fee table is written twice. Where does it go?",
      "They ask you to reuse a method that almost fits. Do you?",
      "Undo an extraction that forced a flag.",
    ],
  ),
  kiss: problem(
    "The vending-machine sketch has Kafka, a plugin bus, and six patterns. Twenty minutes left and no coin path.",
    "Fewest types that meet the stated verbs plus one named extension. Trace the happy path in one breath.",
    "Three classes and one payment seam. In-memory inventory. Say how a card rail would plug in — do not build it yet.",
    [
      "I'll keep this in-memory and extract a repository if we persist.",
      "You are adding a seventh pattern. What can die?",
      "Code the happy path first. Complexity later looks like judgment.",
    ],
  ),
  yagni: problem(
    "Tic-tac-toe has an SPI, a connection pool, and four unused payment rails. The board still allows X to play twice.",
    "Build the starred requirements. A seam for the likely follow-up; not a framework for an imaginary product.",
    "One concrete FeePolicy and a spoken 'I would extract here.' Auth, disk, multi-region stay on a not-today list.",
    [
      "List what you will not build in the first two minutes.",
      "They add a second scheduler — now extract, not before.",
      "Connection pool for a library catalog they never asked for.",
    ],
  ),
  "law-of-demeter": problem(
    "Checkout does order.getCustomer().getWallet().debit(x). A zip change breaks three services.",
    "Talk only to immediate friends. Put the verb on the object that owns the data.",
    "customer.charge(order) or wallet.debit(order.total()). Hotel rooms only via Reservation.",
    [
      "Rewrite that getter chain. Who owns debit?",
      "Outsiders talk to the aggregate root, not LineItem.",
      "cart.getUser().getAddress().getZip() — where does shipping policy sit?",
    ],
  ),
  "tell-dont-ask": problem(
    "if (spot.isFree()) spot.setVehicle(v). ATM gets balance, subtracts, sets balance. Traffic light controller writes the enum.",
    "Command the object. The rule that protects it lives inside the method.",
    "spot.park(v) may refuse. account.withdraw(amount). light.tick(now). Queries stay for UI, not for mutation.",
    [
      "Replace setStatus with confirm, cancel, expire.",
      "The service is a script of tells, not gets.",
      "if (canPark) park has a race — make park atomic.",
    ],
  ),
  "fail-fast": problem(
    "A booking with guestCount -1 dies at payment. Config missing PORT boots and crashes on first request. Money.of silently clamps negatives to 0.",
    "Reject bad shape at the boundary and broken invariants in the constructor. Do not store half-valid objects.",
    "Money rejects non-positive amounts. park validates before occupy. Missing collaborator fails startup.",
    [
      "Show a constructor that throws on empty plate.",
      "Validate, reserve, charge, confirm — fail before charge when you can.",
      "Legacy rows vs new commands — where are you strict?",
    ],
  ),
  "separation-of-concerns": problem(
    "One ATM file does System.out, HashMap, PIN checks, and cash math. A UI copy change breaks fee tests.",
    "UI, use case, domain rules, and IO in different types. Arrows point toward the domain.",
    "Controller → AtmService → Account + Dispenser. Logging is a wrapper, not a field on Wallet.",
    [
      "Three boxes: API, application, domain — infra off to the side.",
      "Can you test the fee with no IO?",
      "Add logging without touching the gateway.",
    ],
  ),
  "program-to-an-interface": problem(
    "Checkout holds StripeClient. NotificationSender holds SmtpClient. Fields are typed ArrayList.",
    "Type collaborators as roles so a fake or a second vendor drops in without editing the policy.",
    "PaymentMethod, OrderRepository, Clock, List. new the concretes in main.",
    [
      "Type the fields as interfaces on the diagram.",
      "Second algorithm arrives — what already compiles?",
      "IUserService that clones UserService 1:1 with no fake — keep it?",
    ],
  ),

  "class-diagrams": problem(
    "The board is 30 Manager boxes, no methods, no multiplicity. Controllers occupy Spot. Every DTO is drawn.",
    "A dozen implementable types: verbs with types, ownership, and 1 / 0..1 / *.",
    "Lot → Floor → Spot; park(Vehicle): Ticket. FeePolicy as an interface with space for a second box.",
    [
      "Draw the lot in eight boxes with methods and numbers.",
      "park() with no types is a wish — write the signature.",
      "They add weekend fees. Where is the empty interface?",
    ],
  ),
  "sequence-diagrams": problem(
    "Classes look fine. Charge runs before reserve. Notify fires before commit. Nobody drew order.",
    "One happy path and one failure: who calls whom, what returns, where it stops.",
    "User → ParkingService.park → Lot.findSpot → Spot.occupy → Ticket. Alt: lot full, no charge.",
    [
      "Walk park from button to ticket. Then payment declined.",
      "Reserve then charge then confirm — show the fail alt that releases.",
      "Two threads on the last seat — where is the lock on the picture?",
    ],
  ),
  "use-case-state-diagrams": problem(
    "Order has isPaid, isCancelled, isPending — all true. Elevator is booleans. The prompt listed statuses you never drew.",
    "Actors and five goals. For each long-lived thing, legal arrows and the method that fires them.",
    "PENDING → PAID → FULFILLED; CANCELLED from PENDING or PAID. Vending: Idle / Collecting / Dispensing.",
    [
      "Who parks, who adds floors, what is out of scope?",
      "This command is invalid in this state — return an error.",
      "They add no-show. Node and method, not a new boolean.",
    ],
  ),
  "nouns-to-classes": problem(
    "The hotel story became TicketPaper, ParkingFee, Amount, Name, Count. Checkout has no home because verbs were ignored.",
    "Underline nouns and verbs. Keep identity, invariants, or behavior. Collapse synonyms.",
    "Spot is an entity, fee is a value, printer is a port you skip unless asked. park lives on the lot.",
    [
      "Tag each noun entity / value / service / field out loud.",
      "They add EV charger. Collaborator, not a rewrite.",
      "BookMyShow noun table before any boxes.",
    ],
  ),
  "entities-vs-values-vs-services": problem(
    "Email has a surrogate id. User.charge() is static. PaymentGateway got a fake primary key so it could 'be an entity'.",
    "Identity over time, data equality, or behavior with no id. Repositories only for the first.",
    "Order #1001 stays itself after items change. Money is interchangeable. FareCalculator has no table.",
    [
      "Annotate the diagram (E) (V) (S).",
      "GST calculation — User method or policy?",
      "You persist entities and embed values.",
    ],
  ),
  aggregates: problem(
    "Controllers call spot.occupy. LineItem has its own repository. Room nights oversell because Floor and Lot both decrement.",
    "One root per cluster. Outsiders change parts only through it. Cross-roots by id.",
    "ParkingLot.park is the only mutator of spots. Order.addItem keeps total == sum(lines). Customer is an id on Order.",
    [
      "ParkingLot is the root; spots are internal.",
      "Two lots — each a root; Mall coordinates.",
      "Splitwise: Expense is a root; balances are projections.",
    ],
  ),
  "factory-vs-constructor": problem(
    "Checkout news Car, Bike, Truck, Clock, and a 12-argument Ticket. The same type switch lives in three methods.",
    "Constructor for one simple valid object. Factory when you choose, assemble, or hide collaborators.",
    "new Money(cents, INR). Vehicle.create(type, plate) is the only switch. SearchFilter uses a builder.",
    [
      "Car, bike, truck — where does new live?",
      "A 12-argument constructor vs builder / fixture.",
      "Public constructor plus factory so callers bypass rules.",
    ],
  ),
  invariants: problem(
    "You drew tables and setters. A spot is occupied with no vehicle. Order.total disagrees with lines after removeItem.",
    "Rules that stay true after every constructor and mutator. Name the owner and the failure.",
    "occupiedCount == occupied spots. DateRange.start ≤ end. Write two sentences on the board before methods.",
    [
      "A spot is never occupied without a vehicle. Which method?",
      "They add a rule — invariant first, then a method.",
      "Which invariant does the lot lock protect?",
    ],
  ),
  ownership: problem(
    "Floor and Lot both write freeCount. getSpots() returns the live list. A static Map is the store with no owner.",
    "One writer per mutable thing. Everyone else gets an id, a copy, or a view.",
    "Lot owns spots; the controller never keeps a Spot. Pool owns sockets; clients call release. Cache owns eviction.",
    [
      "Lot owns spots. park lives only on Lot.",
      "They add threads — name the owner of each map first.",
      "API that returned List<Spot> now returns ids or snapshots.",
    ],
  ),

  "singleton-pattern": problem(
    "ParkingLot.getInstance() holds bookings. Tests share a cache and flake. Logger.getInstance() is called from the domain.",
    "If you truly need one instance, say how it is published — and prefer constructing it once in main.",
    "Eager or holder-class logger. Then inject Logger. Lots are not singletons — a mall has many.",
    [
      "Write a safe one-instance logger, then refuse it in the domain.",
      "Lazy plus threads — what must be true of the field?",
      "Two tests share a singleton cache. How do you unshare?",
    ],
  ),
  "factory-method": problem(
    "DealHand, exportReport, and park each contain new Car() / new Bike() / new Truck(). The workflow is otherwise stable.",
    "The algorithm talks to a product role. Creation is a method or small object you can stub.",
    "Notification.create(channel) returns Email or Sms. Adding boat is a product plus a factory branch, not a new park().",
    [
      "Car, bike, truck — one create, not three news in the lot.",
      "They add boat. What do you add?",
      "Tests must inject a fake product without mocking new.",
    ],
  ),
  "abstract-factory": problem(
    "UI builds DarkButton next to LightScrollBar. SQL repo is paired with an in-memory lock by accident.",
    "One factory per family so products that must match are born together.",
    "ThemeFactory.createButton + createMenu. WinFactory vs MacFactory. Client never news a widget.",
    [
      "Light/Dark widgets that must match. Who creates them?",
      "They add a new widget role — what breaks?",
      "One create method named AbstractFactory — did you overname?",
    ],
  ),
  "builder-pattern": problem(
    "HttpRequest has a 12-argument constructor. Two timestamps got swapped. Coffee is new Coffee(true, false, true, 2).",
    "Name each optional part, mutate a builder, freeze a valid product at build().",
    "url required, headers optional. build() rejects inverted dates. Vehicle(plate, type) stays a constructor.",
    [
      "Pizza / coffee / search filter with add-ons.",
      "Immutable product, private constructor, validate at build.",
      "Reusable builder that leaks last week's toppings.",
    ],
  ),
  "prototype-pattern": problem(
    "Duplicate document re-runs a 40-step setup. Clone() copies the list field by reference. Two 'copies' share listeners.",
    "Clone a template, then tweak. Say deep vs shallow, and give entities a new id.",
    "Chess board deep-copies pieces for lookahead. Resume templates issue a new id. Do not clone a singleton.",
    [
      "Duplicate this document — copy and new id.",
      "Named presets orc/elf — a registry of templates.",
      "Shallow copy of a mutable list. What corrupts?",
    ],
  ),

  "adapter-pattern": problem(
    "Checkout calls stripe.paymentIntents.create. They want PayPal next week. Domain types are Money; the SDK wants cents.",
    "A thin wrapper that satisfies the port you already speak. Translate names, types, and errors. No fee math.",
    "PaypalAdapter implements PaymentMethod. Checkout unchanged. SDK exceptions become domain errors.",
    [
      "Integrate PayPal too. What do you add?",
      "Wrap a cents-as-int library so the app passes Money.",
      "Fee logic started landing in the adapter — move it.",
    ],
  ),
  "decorator-pattern": problem(
    "They asked for retry and metrics on the same gateway. Someone started LoggedRetryUpiGateway extends UpiGateway.",
    "Wrappers that share the interface and stack. Order matters. Core class stays one.",
    "Retry(Log(Real)) logs each attempt. Add metrics by wrapping again at main. Do not edit the gateway.",
    [
      "Add retry and metrics. How many new types?",
      "Remove logging without touching the core.",
      "A giant UberDecorator with five flags — split it.",
    ],
  ),
  "facade-pattern": problem(
    "The controller talks to inventory, tax, payment, and mail in the wrong order. Callers keep charging before reserve.",
    "One verb API that sequences the noisy parts. Rules stay on aggregates; the facade tells them.",
    "ParkingService.park. HomeTheater.watchMovie() turns on amp, projector, lights. Do not leak five internals.",
    [
      "Name the application service the controller calls.",
      "They want a lower-level step. New use case or a leak?",
      "placeOrder so step 3 cannot run before step 1.",
    ],
  ),
  "proxy-pattern": problem(
    "Image.draw() always loads 20MB. Document.open() has no ACL check. ORM code walks order.getLines() and you cannot see the queries.",
    "A stand-in with the same interface that controls access, lazy create, or remotes — not a stack of extra features.",
    "Virtual image loads on first draw. Protection proxy allows write only for owners. Say first call may hit disk.",
    [
      "Lazy image or ACL on open — who sits in front?",
      "List orders then lines — why did we fire 1+N queries?",
      "A remote stub in a loop — what did we pretend?",
    ],
  ),
  "composite-pattern": problem(
    "File size is if (isFolder) recurse else length, copied in ls, zip, and search. Clients cannot treat a bundle like a SKU.",
    "One component operation on leaf and tree. Children live on the composite. Forbid cycles.",
    "File and Folder share size() and ls(indent). Product bundle price is the sum of children.",
    [
      "In-memory file system — draw leaf / composite / component.",
      "How does size() recurse? Safe add() or add on leaves?",
      "Permissions that inherit down the tree.",
    ],
  ),
  "bridge-pattern": problem(
    "EmailUrgent, SmsUrgent, EmailSilent, SmsSilent. CircleVector, CircleRaster, SquareVector… the grid grows both ways.",
    "Two hierarchies that compose: client-facing abstraction holds a primitive implementor.",
    "Notification (Alert/Digest) holds Channel (Email/Sms). Shape holds Renderer. No CircleVector class.",
    [
      "Message types and send channels — two axes.",
      "New remote and new device independently.",
      "Only vehicle types vary — do you still split twice?",
    ],
  ),
  "flyweight-pattern": problem(
    "A document allocates a glyph object per character, each holding the same 'A' bitmap. A 1000×1000 map news a Tree mesh per cell.",
    "Share immutable intrinsic data. Keep position and owner outside. Intern via a factory.",
    "26 glyph flyweights plus an array of (char, x, y). Tile types shared across the grid. Do not flyweight User.",
    [
      "Text editor with millions of characters — what is shared?",
      "One tree turning autumn turned every tree.",
      "Chess has 32 pieces. Do you intern?",
    ],
  ),

  "strategy-pattern": problem(
    "Lot.unpark switches on vehicle type for fees. Elevator.assign is a nest of ifs for peak hour. Checkout will grow UPI next.",
    "One algorithm interface. Context delegates. A factory may pick; the flow does not switch.",
    "Hourly / Daily / Weekend as FeePolicy. Swap SCAN in at 5pm. Adding a coupon is a class.",
    [
      "Weekend price — where do you cut?",
      "Second elevator policy. What stays closed?",
      "Sort by price vs popularity without editing the list screen.",
    ],
  ),
  "observer-pattern": problem(
    "ParkingLot.sendSms() sits next to occupy. They want analytics and email too. A slow send blocks park.",
    "Subject notifies subscribers it does not import. Keep listeners tiny or hand them a queue.",
    "orderPlaced → Emailer and Analytics. Copy the listener list. Unsubscribe on teardown.",
    [
      "Also send SMS. Do you open ParkingLot?",
      "A listener mutates the subject and you loop forever.",
      "They want reliable delivery — queue behind the same subscribe idea.",
    ],
  ),
  "command-pattern": problem(
    "The editor undoes with boolean flags. Job 'send report' is a string in a switch. Remote buttons call Light.on() directly and cannot macro.",
    "The request is an object: receiver plus args, execute, optional undo. Invoker stores history.",
    "InsertCommand / DeleteCommand on a buffer. Queue the same object for retries. Party-mode is a composite command.",
    [
      "Text editor undo. What does the command remember?",
      "Macro 'party mode' — one execute, one undo.",
      "Queued charges without ids — what double-fires?",
    ],
  ),
  "state-pattern": problem(
    "VendingMachine.select is a 80-line switch. Order allows paid-and-cancelled. Elevator opens the door while moving.",
    "One type per status implements the events. Illegal events fail. Shared data stays on the context.",
    "Idle ignores select. Collecting + select with enough credit goes Dispensing. Draw the machine first.",
    [
      "Vending / traffic light / order — states then two transitions.",
      "Show an illegal event failing.",
      "Fee types as State classes — wrong cut. What instead?",
    ],
  ),
  "template-method": problem(
    "PdfMiner and CsvMiner copy open → extract → parse → analyze → close. Subclasses started overriding the whole run() to skip a step.",
    "A fixed skeleton in the base. Hooks for the parts that vary. Do not let children reorder the spine.",
    "DataMiner.run is final. PdfMiner implements extract. A second axis (destination) becomes a strategy, not another hook.",
    [
      "All reports export the same way but write different files.",
      "They add a second variation axis — migrate a hook.",
      "Twelve hooks on the base — simplify or compose.",
    ],
  ),
  "iterator-pattern": problem(
    "Callers take Floor.spots, the live array. You cannot change to a map. Someone parks while a report walks and skips a stall.",
    "A cursor over hidden storage. Say fail-fast vs snapshot if the collection mutates.",
    "lot.spots() yields without exposing Floor[]. File tree DFS iterator. Iterator.remove, not list.remove, mid-walk.",
    [
      "Iterate spots. Do not return the list.",
      "Someone parks mid-report. What does the cursor do?",
      "Pagination as a cursor token — same idea?",
    ],
  ),
  "chain-of-responsibility": problem(
    "Auth, validation, rate-limit, and the use case are one method. ATM cash is a nest of ifs for 2000/500/100. Adding a handler edits every path.",
    "A line of handlers with next. Order is the product. Unhandled must not vanish.",
    "Auth → Role → RateLimit → Controller. Hopper chain fails $30 if only 50s remain. A list of Rule in a loop is the same idea.",
    [
      "ATM notes and HTTP middleware. Who builds the chain?",
      "Nobody handles — error or swallow?",
      "Validators as a list without next pointers. Acceptable?",
    ],
  ),
  "mediator-pattern": problem(
    "Every widget calls every other widget. Landing planes hold Runway references. Adding a colleague edits eight classes.",
    "Colleagues talk only to a hub that routes. Domain rules stay on the colleagues.",
    "FormMediator enables OK when checkbox and field agree. ChatRoom routes between Users. Tower assigns runways.",
    [
      "Control tower or chat server — who knows whom?",
      "Mediator vs a fan-out listener — which owns policy?",
      "Do not hub a parking lot. The aggregate is enough.",
    ],
  ),
  "visitor-pattern": problem(
    "File and Folder keep growing methods: size, search, virus-scan, zip. You do not own Node and cannot add export.",
    "Stable structure, growing operations. accept/visit so a new report is a new type — and a new node edits every visitor.",
    "SizeVisitor and SearchVisitor on a file tree. Expression EvalVisitor vs PrintVisitor. Parking lot is not this.",
    [
      "Virus-scan and zip-size without editing File much.",
      "Double dispatch in one sentence.",
      "The hierarchy still grows every sprint — keep Visitor?",
    ],
  ),
  "memento-pattern": problem(
    "Undo pokes editor.privateChars from the history stack. Snapshots alias the live buffer. History is unbounded.",
    "Originator exports an opaque snapshot. Caretaker stores tokens it cannot read. Restore rebuilds invariants.",
    "createMemento / restore. Caretaker is two stacks. Cap history. Store a copy, not a reference.",
    [
      "Editor undo without leaking fields.",
      "Command for the verb, snapshot if inverse is messy.",
      "Unlimited undo in 40 minutes — what do you bound?",
    ],
  ),
  "null-object": problem(
    "if (logger != null) logger.info in six places. Discount is null and NPE at checkout. Missing strategy is a crash.",
    "A do-nothing implementer of the same interface for optional behavior. Required ports still fail at wiring.",
    "NullLogger. NoDiscount returns 0. Empty iterator. Never NullPayment that pretends a charge succeeded.",
    [
      "Logging is optional. What do you inject?",
      "Missing price is not $0 — fail instead.",
      "Empty cart as empty collection, not null.",
    ],
  ),

  "producer-consumer": problem(
    "Each email does new Thread. The ingest side is bursty; SMTP is slow. The list between them has no cap.",
    "A bounded queue, a full-queue policy, and consumers that keep pulling after a failed item.",
    "Queue of 100, reject or block. Immutable messages. Poison pill or close() to drain.",
    [
      "Name the bound and what happens when it is full.",
      "A pool of consumers, not a thread per park().",
      "Logger that enqueues; one writer thread.",
    ],
  ),
  "thread-pool": problem(
    "park() starts a thread per car. Under load the machine dies. Cached pools grow without a cap. Rejection is silent discard on bookings.",
    "N workers on a bounded task queue. Submit, reject policy, shutdown. The pool does not fix shared inventory.",
    "CPU-bound ≈ cores. Abort or caller-runs on overflow. Future if the caller needs a receipt.",
    [
      "Never spawn a thread per park(). What instead?",
      "Traffic spikes — rejection policy?",
      "Same pool for 30s SMTP — split IO vs CPU?",
    ],
  ),
  "future-promise": problem(
    "charge() starts work and the caller spins on a boolean. get() with no timeout on a pool thread deadlocks. Errors become null.",
    "A read handle for a result that is not here yet. Complete once. Timeout and cancel are part of the contract.",
    "Future<Receipt> charge(card). Use-case get(2s). Cancel is a product question about the money.",
    [
      "Async pay — what does the caller hold?",
      "Timeout in the use case, not forever.",
      "Payment then email — compose or nest get()?",
    ],
  ),
  "actor-model": problem(
    "Elevator cars share a mutable stop set with the bank. Lock order across cars is getting scary. Debit is called on account from many threads.",
    "Private state, a mailbox, one message at a time. Others tell(); they do not poke fields.",
    "One actor per car plus a dispatcher. BankAccount handles Debit/Credit. Messages immutable; mailbox bounded.",
    [
      "Thread-safe elevator bank — one actor per car.",
      "ask() from inside the loop waiting on another actor.",
      "A single global actor is just one thread. Enough for the lot?",
    ],
  ),
  "rw-lock": problem(
    "Every catalog get() takes the same mutex as add(). Gets dominate. Someone upgrades read→write and two threads deadlock.",
    "Many readers or one writer. Release read before write and re-check. Or swap an immutable snapshot.",
    "get under readLock, put/evict under writeLock. Config reload prefers atomic swap if the map is small.",
    [
      "Thread-safe cache — not synchronize everything.",
      "Writer starvation. Fair lock or write preference?",
      "Upgrade deadlock. How do you take the write?",
    ],
  ),
  "double-checked-locking": problem(
    "if (instance == null) { synchronized { if (instance == null) instance = new X(); } } without a safe field. A thread sees a half-built object.",
    "Lazy shared init needs a publication barrier — or a holder / inject and skip the idiom.",
    "volatile instance, second check under the lock. Prefer a static holder. Failed init must not publish a broken instance.",
    [
      "Write it correctly, then say you would not ship it.",
      "They forbid volatile. What is left?",
      "Do not DCL a parking lot.",
    ],
  ),
  "immutable-sharing": problem(
    "Fee table is a mutable map. Reload writes keys while park() reads. Events on the queue are reused and mutated.",
    "Publish a finished value. Readers load the reference once. Writers clone, then atomically swap.",
    "New Config built off-thread, AtomicReference.set. Messages immutable. Readers may see version n-1 — say if that is OK.",
    [
      "Reload fees under the lot without locking readers.",
      "Bank balances via stale snapshots — acceptable?",
      "Shell immutable, list field still mutable — a lie.",
    ],
  ),
  "race-deadlock-livelock": problem(
    "if (!map.contains) map.put loses an insert. transfer(a,b) and transfer(b,a) lock opposite orders. wait() uses if, not while.",
    "Name the shared data, the lock order, and the retry/backoff. Check-and-act must be one step.",
    "computeIfAbsent. Lock accounts by sorted id. while (!ready) wait(). tryLock with timeout. Jitter on retries.",
    [
      "Make it thread-safe. First name the maps.",
      "transfer(a,b) — lock order.",
      "wait/notify — say the while loop out loud.",
    ],
  ),
  "thread-safe-cache-counter-inventory": problem(
    "likes++ is not atomic. LRU get moves a node with no lock. if (count > 0) count-- sells the last seat twice. Retries debit again.",
    "Counter, cache, and reserve each need a single atomic story — plus an idempotency key when clients retry.",
    "AtomicLong for likes. Mutex around LRU unlink. reserve(sku, qty, requestId). Last item, two threads, one winner.",
    [
      "Last seat. Write the reserve method.",
      "LRU plus threads — what do you lock?",
      "Double-click checkout — same reservation id.",
    ],
  ),

  "public-surface": problem(
    "Library has twelve public setters and rebalanceInternalHeap(). Tests call them. Controllers setOccupied.",
    "A small verb API from the use cases. Internals stay hidden. Changing a public method is a break.",
    "borrow, return, search. park / unpark / pay. Snapshot DTO instead of a debug getter.",
    [
      "Three public methods on the service, not fifteen.",
      "They want a getter for debugging. Package or snapshot?",
      "Name methods park/unpark, not setOccupied.",
    ],
  ),
  signatures: problem(
    "park(Object o). process(boolean, boolean, boolean). transfer(from, to, amount) as raw ints so currency swaps.",
    "Domain types, no flag soup, a result that distinguishes lot-full from a bug.",
    "park(Vehicle): Result<Ticket, Full|Banned>. Clock passed in. Split update(user, admin, notify) into named methods.",
    [
      "Write park(Vehicle) with a Result on the board.",
      "Third boolean appeared. Split or a policy object?",
      "Do not pass HttpRequest into the domain.",
    ],
  ),
  "errors-vs-results": problem(
    "Lot full throws RuntimeException. Card declined is null. catch (Exception) return null. Charge already happened when you throw.",
    "Expected outcomes in the signature. Bugs throw. Map at the edge. No half-mutated aggregate.",
    "park → Result. Declined is domain; timeout is infra and maybe retry. Partial batch gets its own type.",
    [
      "Lot full is a Result, not an exception.",
      "They prefer exceptions — closed domain types, not throw new RuntimeException(\"no\").",
      "You already charged, then throw. What instead?",
    ],
  ),
  "boundary-validation": problem(
    "Controller passes a raw map into ParkingLot. plate == null is checked inside occupy and again in billing. UI-only validation.",
    "Parse and build values at the edge. Domain methods take Email and Money, not strings.",
    "ParkRequest → ParkCommand.of (rejects blank plates) → ParkingService. Auth is a separate 403 step.",
    [
      "API → validate → command → service. Strings die on the left.",
      "Time is short — checks in value constructors.",
      "Other services' payloads are a boundary too.",
    ],
  ),
  "idempotent-ops": problem(
    "Mobile retries park() and two tickets issue. Charge $20 twice because the key was amount+time. Cancel-already-cancelled errors.",
    "Same command, same key, one side effect. Store key plus result under the same lock as the mutation.",
    "Wallet.debit(key, money) returns the first receipt. unpark() twice is success. Compare payload; conflict if it differs.",
    [
      "Double-click park. Add requestId now.",
      "Payment intent id stored with the charge.",
      "Key generated server-side after the retry — why is that useless?",
    ],
  ),
  "pagination-in-service-apis": problem(
    "listBookings() returns the whole table. Page 3 skips rows when inserts land. Sort is by name only and twins swap pages.",
    "limit plus a stable cursor (or honest offset). Clamp size. Do not load then slice.",
    "list(filter, cursor, limit) → items + nextCursor. Opaque cursor. Autocomplete is a tiny page. Chess pieces are a snapshot, not a list API.",
    [
      "Show all bookings — put pagination in the signature first.",
      "Movies paginate; one screen of seats is a snapshot.",
      "Page size 0, negative, or sort without a unique tie-break.",
    ],
  ),
  "schema-vs-objects": problem(
    "They pasted the bookings table into a class and called it design. Overlap rules have no home because they are not a column. API is Map<String,Object>.",
    "Schema at the wire or store. Objects for operations. Map on purpose.",
    "Reservation computes overlap. The row cannot. URL shortener schema is tiny; uniqueness and expiry live on the object.",
    [
      "They drew a table first. Objects first, then a table that can store them.",
      "Board as a string in storage; Board.legalMoves in memory.",
      "Anemic Hibernate fields with no methods.",
    ],
  ),
  "orm-n-plus-one": problem(
    "listOrders() then each order.getLines() fires a query. GraphQL resolvers do the same. Open-session-in-view hides it until prod.",
    "Name the graph the use case needs. Load it in one or two queries. Lists use a DTO, not a lazy aggregate.",
    "Page of orders, then lines where order_id in (…). Do not lazy-load every seat when listing movies.",
    [
      "JPA list plus children — how many queries?",
      "Connect that to proxies.",
      "Join-fetch two bags and the row count explodes.",
    ],
  ),
  "transactions-per-use-case": problem(
    "inventory.save() commits, then charge fails. park() writes spot and ticket in two saves. The Stripe call sits inside an open DB transaction.",
    "One intention, one unit of work — or reserve / charge / confirm with compensate. The service opens it, not the entity.",
    "ParkingService.park: find + occupy + ticket together. Checkout releases inventory if pay fails. Idempotency key in the same commit.",
    [
      "park is the transaction. Say it.",
      "Reserve, charge, confirm — charge fails.",
      "Do not save() in a loop, each a transaction.",
    ],
  ),
  "repository-dao": problem(
    "BookingService calls jdbc.query. Tests need Postgres. One repository per table, including LineItem, so outsiders mutate lines.",
    "A collection of aggregates at the domain edge. DAOs hide inside adapters. In-memory map is a real implementer.",
    "IParkingLotRepository + HashMap impl. SQL later. No fee math in the repository. No EntityManager in the domain.",
    [
      "Draw the repo interface and a map impl.",
      "Hibernate still sits behind the same port.",
      "Repository that returns column maps.",
    ],
  ),
  "dto-vs-domain-vs-persistence": problem(
    "One User class has JSON annotations, Hibernate annotations, and charge(). Create API requires a persistence id. Hibernate proxies went over the wire.",
    "DTOs travel, domain objects rule, rows store. Map; do not wear three hats unless the app is trivial.",
    "ParkRequest, Ticket, TicketRow. Lists can skip domain. In a 30-minute kata, request + domain is enough.",
    [
      "Three hats in one sentence. Use two if time is short.",
      "Never return the aggregate's private list as the API.",
      "Movie list DTO is not the Movie aggregate.",
    ],
  ),
  mapping: problem(
    "setFoo(dto.getFoo()) lives in the controller and the repository. Timezones convert in three places. Missing money silently becomes 0.",
    "One boring translator per boundary. It may construct values and fail. It does not price or load.",
    "TicketDto.from(ticket). Stripe payload → PaymentResult in one mapper. Do not toDto() on the entity if that couples API versions.",
    [
      "A field is added. Where is the checklist?",
      "Mapper that calls repositories — move the IO.",
      "Centralize User row ↔ entity and delete the copies.",
    ],
  ),

  "layered-architecture": problem(
    "The HTTP handler writes SQL and computes fees. Domain imports Spring annotations. Every class is a *Service in one folder.",
    "UI → application → domain → infra. Writes go through use cases. No upward types.",
    "API, ParkingService, Lot+policies, repos on the side. Three boxes, not eight. Rules not in the controller.",
    [
      "Three boxes is enough. Place the types.",
      "They say clean architecture — invert the persistence arrow.",
      "Illegal import: domain → SQL. Invert it.",
    ],
  ),
  "hexagonal-architecture": problem(
    "They want to swap Stripe for PayPal and test booking without a database. The core already imports Express and new Date().",
    "Domain in the middle. Driving adapters call inbound ports. Driven adapters implement outbound ports. Dependencies point in.",
    "Checkout vs PaymentPort and InventoryPort. Fake both in a unit test. Clock is a port for bookings.",
    [
      "Ports and adapters — one inbound, two outbound.",
      "InMemoryRepository as the driven adapter for the demo.",
      "Ports named StripeService — you inverted nothing.",
    ],
  ),
  "mvc-mvvm": problem(
    "JButton action runs SQL and prices tickets. The board model imports React. View-Model is a second domain with fee math.",
    "Input in a controller or view-model. Rules in a model or use case. View only renders. Seat map observes bookings.",
    "Tic-tac-toe: Board model, VM with cells[], view binds clicks to place(i). Selected tab is view state, not domain.",
    [
      "Design a client for the garage. View / VM / model.",
      "Backend-only? Controller is a driving adapter — move on.",
      "Seat map refreshes when someone books.",
    ],
  ),
  "clean-architecture": problem(
    "They asked for clean architecture. Someone drew four rings, renamed services Interactors, and left JPA on the entities.",
    "Source points inward. Use cases depend on entities and ports they declare. Frameworks are plugins. A test can run the use case with fakes.",
    "Entities + PlaceOrder + controller + repo adapter. No Spring on the use case. Skip InputBoundary theater in 40 minutes.",
    [
      "Dependency rule: inward only. Two rings, then code.",
      "Can I test the use case with fakes and no Spring?",
      "Circles with no ports — you drew a layer cake.",
    ],
  ),
  "plugin-strategy-engines": problem(
    "Checkout edits a switch to add tax, then discount, then a new rail. Third parties cannot ship a rule without a core release.",
    "Closed engine, open registry. Tiny hook interfaces. Config chooses who runs.",
    "validate → quote → authorize → capture. TaxPlugin and DiscountPlugin lists. Add a rail by registering, not editing the engine.",
    [
      "Support a new payment later — registry plus factory.",
      "Engine.run → hooks → each plugin. Draw it.",
      "Engine still switches on plugin name. Undo that.",
    ],
  ),
  "testing-as-design": problem(
    "'How would you test this?' — they would mock the database, but the DAO is a static singleton. Clock is Date.now() inside the entity.",
    "The first client is a test with fakes. Hidden new, time, and god classes become ports.",
    "ParkingService + in-memory lot + fixed clock. Tests: happy, full, banned, double park, last spot. Do not mock the entity.",
    [
      "I'd unit-test the service with an in-memory lot and a fixed clock.",
      "Name two tests: happy path and last-seat or declined card.",
      "Everything public so we can test it — no.",
    ],
  ),
  "dependency-injection": problem(
    "Checkout news StripeClient. OrderService news SmtpClient. Twelve services in one constructor. Domain calls Context.getBean.",
    "Pass collaborators in. Composition root knows concretes. A fat constructor is a cohesion smell, not a DI smell.",
    "new ParkingService(lot, clock, payments) in main. Tests are another root. Values like Money are still new-ed per call.",
    [
      "Constructor with three ports. Who news this?",
      "Refuse getInstance for the repository.",
      "Spring annotations at the edge, not on entities.",
    ],
  ),
  "fakes-vs-mocks": problem(
    "Tests expect charge() once in this order and miss an oversell. The repo mock returns mocks. Nobody implemented the uniqueness the DB has.",
    "A working stand-in that honors the contract. Mock only a tiny vendor. Assert domain outcomes.",
    "InMemoryBookingRepository with the same unique rule. FakePayment declines on a flag. Fake mailbox list vs a mock send().",
    [
      "Lead with fake repository and fake payment.",
      "Verify email sent — spy mailbox, not a mockist script.",
      "A Clock you can set is a five-line fake.",
    ],
  ),

  "parking-lot": problem(
    "A mall garage takes cars and bikes on several floors. Drivers get a ticket and pay on the way out. Spots have types.",
    "Lot owns floors and spots. park/unpark atomically. Fees are a policy, not a switch on the spot.",
    "Weekend rates and EV stalls. Last stall, two cars — one ticket. Do not rewrite park.",
    [
      "Design a parking garage. Classes, then I add a vehicle type.",
      "EV spots and surge pricing without editing Lot.park.",
      "Make park safe when two cars want the last stall.",
    ],
  ),
  elevator: problem(
    "A building has several cars. Hall buttons ask for a direction. Cars must not open while moving. Peak hour will change dispatch.",
    "Car as a state machine. Bank assigns hall calls through a scheduler you can swap.",
    "Nearest-idle first, then SCAN. One actor per car. Maintenance rejects new stops.",
    [
      "Design the elevators. States, then a scheduler seam.",
      "Now destination-dispatch or peak-hour parking.",
      "Many cars moving at once — who owns each stop set?",
    ],
  ),
  "hotel-booking": problem(
    "Guests search rooms by type and dates, hold, pay, check in, cancel. Two guests must not get the same room-night.",
    "DateRange as a value. Reservation status that occupies inventory. Search vs book as query vs command.",
    "Overlapping deluxe stays — second fails. 15-minute PENDING hold that expires. Clock is a port.",
    [
      "Design hotel reservations. Overlap is the invariant.",
      "Assign room at booking or at check-in — pick one.",
      "Last room-night, two books at once.",
    ],
  ),
  library: problem(
    "Members borrow physical copies, not ISBNs. Due dates and fines depend on student vs faculty. Search is by title.",
    "Title vs Copy. Loan record plus a policy for limits and dues. Clock for fines.",
    "Borrow/return/fine with a fixed clock. Reservation queue assigns the next returned copy.",
    [
      "Design a library. You loan a copy, not a title.",
      "Faculty may keep books longer. Where is that number?",
      "Two members cannot take the same barcode.",
    ],
  ),
  restaurant: problem(
    "A dining room seats parties and takes orders. Kitchen needs tickets. Menu prices change while a check is open.",
    "Seating and Order are two aggregates. Snapshot line prices. Order has a real lifecycle.",
    "Add/remove line, send, pay. Menu edit does not change open checks. No-show frees a reserved table.",
    [
      "Design restaurant seating and orders. Two boundaries.",
      "Online orders — same Order aggregate?",
      "Split checks or one order per table?",
    ],
  ),
  atm: problem(
    "A walk-up machine reads a card, checks a PIN, and pays cash. The tray may not be able to make the amount even if the bank says yes.",
    "Machine states, a bank port, and a hopper chain. Authorize, payout, capture or reverse. Never store PIN.",
    "$30 requested, only 50s left — refuse and do not debit. Fake bank declines; hoppers do not move.",
    [
      "Design an ATM. Hardware, bank port, cash.",
      "Bank says no vs tray cannot make $70.",
      "Session timeout and card eaten after N PIN fails.",
    ],
  ),
  "vending-machine": problem(
    "People insert coins, pick a SKU, get a can and change. Selecting with no credit must fail. Stock and the coin box can both be short.",
    "State machine plus inventory plus change-making. Decrement stock in the same commit as the sale.",
    "Two products and change. Card payment as a second payment method — do not explode the states. Exact-change mode when the box is short.",
    [
      "Design a vending machine. Idle cannot select.",
      "Add card without rewriting every state.",
      "Last can, two buyers.",
    ],
  ),
  "traffic-signal": problem(
    "A four-way intersection must never show two conflicting greens. Yellow and all-red exist. Later they want sensors or a fire truck.",
    "Phases as data. Controller is the only mutator. Policy picks the next legal phase. Clock for ticks.",
    "N-S / E-W with 30/3/2 timings under a fake clock. Pedestrian phase. Fault → flashing red.",
    [
      "Design the intersection. Conflicting greens never happen.",
      "Actuated or emergency preemption — new policy.",
      "A sensor dies. What is fail-safe?",
    ],
  ),
  chess: problem(
    "Two players move pieces on 8×8. A move that leaves you in check is illegal. They will ask about castling or a weak AI later.",
    "Piece.legalMoves. Game.apply is the only mutator. Clone or try/revert for self-check. Scope specials.",
    "Rook, bishop, knight movement + apply + check. Undo via history. No 400-line switch in Game.",
    [
      "Design chess. Movement and check; castling later.",
      "Do not switch on piece type in Game.",
      "AI lookahead — clone the board.",
    ],
  ),
  "tic-tac-toe": problem(
    "A 3×3 game, two marks, win or draw. X must not play twice. They may want a computer player.",
    "Board owns cells. Game owns turn and result. AI is a strategy. Finish it.",
    "Win on a row. Reject occupied. Random AI behind nextMove(board, mark). Undo is a later stack.",
    [
      "Design tic-tac-toe and finish the game.",
      "Then add an AI strategy.",
      "Larger board, N-in-a-row.",
    ],
  ),
  "snake-and-ladder": problem(
    "Players take turns on a numbered board. Snakes and ladders jump. Winning may require an exact landing. Tests need a known dice sequence.",
    "Board as a jump map. Dice is a port. Game.turn applies bounce-or-skip and extra-turn policy.",
    "FakeDice [6,3,2] to a known winner. Reject a board with a cycle. Size N, not hardcoded 100.",
    [
      "Design snake and ladder. Dice is injected.",
      "Exact land vs overshoot — a policy.",
      "Load the board from config.",
    ],
  ),
  splitwise: problem(
    "Friends log dinners. Equal, exact, or percent splits. Someone wants a simplify button. Money must not drift.",
    "Expense plus a split strategy. Ledger stays balanced. Simplify suggests payments and does not rewrite history.",
    "Equal and exact on four users. Percent that is not 100 fails. Leftover cents assigned on purpose. No floats.",
    [
      "Design a bill-split app. Shares must sum to total.",
      "Simplify does not mutate the ledger.",
      "Retry addExpense with the same request id.",
    ],
  ),
  "coffee-machine": problem(
    "The first sketch is Latte extends Espresso extends Beverage. Drinks are recipes over milk and espresso. Last milk can race.",
    "Recipe data, inventory consume, payment port. Add-ons as extras or a wrapper. No drink class tree.",
    "Three recipes plus a mocha extra. New drink is a map. Two orders, last milk — one fails.",
    [
      "Design a coffee machine. Composition, not a beverage tree.",
      "Show a recipe map for Mocha.",
      "Last milk, two threads.",
    ],
  ),
  "car-rental": problem(
    "A fleet sits at stations. Customers book a type or a VIN for dates, pick up, and sometimes return elsewhere.",
    "Hotel booking plus location and vehicle lifecycle. Overlaps on a VIN are forbidden. Maintenance hides a car from search.",
    "Two overlapping bookings fail. One-way return moves the car; search at the new station finds it.",
    [
      "Design car rental. Dates, stations, vehicle status.",
      "One-way return — pricing and location.",
      "Last compact at a station, two books.",
    ],
  ),
  "cart-checkout": problem(
    "Shoppers add SKUs, apply a coupon, and pay. Double-click checkout charges twice. Catalog price changes should not rewrite yesterday's order.",
    "Cart is disposable lines with snapshots. Checkout reserves, charges, creates an Order, compensates on fail.",
    "FakePayment declines — inventory released. Two checkouts, last SKU, one winner. Coupon is a pricing plugin.",
    [
      "Design cart and checkout. Reserve then charge then confirm.",
      "Coupon without an if in Cart.",
      "Double-click — idempotency key.",
    ],
  ),
  "cards-poker": problem(
    "A table deals cards, runs betting, and ranks hands. Ranking ifs leaked into Table.showdown. Tests cannot force a flush.",
    "Card as a value, Deck with a Random port, Ranker strategy, Table as the round loop. Scope side pots.",
    "Five-card ranker: flush beats pair. Fake Random deals a known winner. One betting round + showdown.",
    [
      "Design cards and a holdem-lite table. Scope hard.",
      "Ranker tests, not ifs in the table.",
      "All-in side pots — mention, implement later.",
    ],
  ),
  "producer-consumer-queue": problem(
    "You must code a bounded in-memory queue. Producers block when full. close() must let consumers drain. if (full) wait already bit someone.",
    "Circular buffer, mutex, two conditions, while loops. Immutable items. Put after close rejects.",
    "Four producers, four consumers. Capacity 1 is the tight test. drop-oldest vs block as a policy.",
    [
      "Implement a bounded queue. while, not if.",
      "close() that lets consumers drain.",
      "Language already has BlockingQueue — implement wait/notify anyway.",
    ],
  ),
  "rate-limiter": problem(
    "An API must allow N calls per user per second, with a burst. Date.now() is sprinkled. One lock guards every key.",
    "Token bucket or sliding window behind allow(key). Clock is a port. Stripe locks per key. Decorator on the handler.",
    "5/s burst 10 with a fake clock. Deny returns retry-after. Second policy is a strategy.",
    [
      "Design a rate limiter. Per user? Burst?",
      "Wrap a payment port with a limit decorator.",
      "Distributed later — same interface, Redis adapter.",
    ],
  ),
  "lru-cache": problem(
    "A cache of size k. get and put must be fast. When full, the coldest key leaves. They will ask LFU or threads.",
    "Hash map plus a doubly linked list (or freq lists). get updates recency. Evict tail. Lock if threaded.",
    "Capacity 2: put 1, put 2, get 1, put 3 → 2 is gone. Then LFU. Then a mutex around structural changes.",
    [
      "Design get and put in O(1). Which key leaves?",
      "Now LFU.",
      "Now two threads get and put.",
    ],
  ),
  "thread-safe-logger": problem(
    "200 threads synchronized on one file. Callers stall. Events are reused. The queue of lines has no bound.",
    "Immutable LogEvent, bounded queue, one writer, pluggable appenders. Level check before format.",
    "Async logger, FileAppender, drop-on-full. MetricsAppender added without editing Logger. Inject, do not require getInstance.",
    [
      "Design a logger that does not stall the app.",
      "Bound and drop policy.",
      "Add an appender without opening Logger.",
    ],
  ),
  "bounded-buffer": problem(
    "Implement a fixed-size buffer. Producers and consumers are threads. They will watch for if (full) wait and a single condition.",
    "Monitor: array, count, mutex, notFull, notEmpty. Signal the opposite side. Capacity-1 test.",
    "put/take plus close() that unblocks waiters. notify vs notifyAll — defend it. Lock-free only if they push.",
    [
      "Implement a bounded buffer. Write the while loops first.",
      "Capacity 1, many threads.",
      "They say lock-free — offer the monitor first.",
    ],
  ),
  "job-scheduler": problem(
    "Holds expire, digest emails go out, a report runs at T. A busy loop polls every 10ms. Handlers run on the scheduler thread and delay everything.",
    "Delay queue plus id map. Dispatcher thread, worker pool. Handlers by type. Clock you can advance.",
    "FakeClock fires two jobs in order. Failing handler retries three times then FAILED. Persist port if they need restart.",
    [
      "Design an in-process scheduler. Clock and a heap.",
      "Jobs survive restart? Add a store.",
      "New job type 'send report' is a handler class.",
    ],
  ),
  "connection-pool": problem(
    "Each request opens a new DB socket. Clients call close on the raw connection. A third waiter hangs forever. Double release corrupts the idle list.",
    "Pool owns connections. Acquire with timeout. Proxy close returns to the pool. Validate before lend. Only the pool really closes.",
    "Max 2, third acquire times out. Killed connection is not re-queued. shutdown is idempotent.",
    [
      "Design a connection pool. Only the pool closes sockets.",
      "PooledConnection is a proxy.",
      "Acquire timeout is part of the API.",
    ],
  ),
  "in-process-pubsub": problem(
    "Modules should react to OrderPlaced without importing each other. A slow email stalls publish. One handler throws and the rest never run.",
    "Broker, typed topics, snapshot the list, isolate errors. Sync vs per-subscriber queues. Unsubscribe token.",
    "Two subscribers; one throws; the other still runs. Async mode with a bounded per-sub queue. No Kafka.",
    [
      "Design in-process pub/sub. Observer plus optional queues.",
      "Snapshot the list. Catch per handler.",
      "At-least-once? That needs a store — say so.",
    ],
  ),
  bookmyshow: problem(
    "People pick a show and seats, hold them, then pay. Holds must die. Two groups want the last pair.",
    "Show owns the seat map. Hold with TTL, then checkout. All-or-none multi-seat. Search is a read model.",
    "Two threads, same seat — one error. FakeClock expires a hold; seat is FREE. Idempotent checkout.",
    [
      "Design a ticket booth. Hold then pay.",
      "Last two seats, two users each want both.",
      "Clock and an expiry job.",
    ],
  ),
  "mini-uber": problem(
    "Riders request a ride. Idle drivers sit on a map. Two drivers tap accept. Surge will land later. They do not want a maps HLD.",
    "Trip state machine, grid location index, matcher strategy, pricing at the end. First CAS wins the trip.",
    "Two idle drivers; nearest wins. Double accept — one fails. Surge is a pricing strategy.",
    [
      "Design a mini ride-hail. Matching, trip, price — in memory.",
      "Double-accept on the same trip.",
      "Pool vs XL as matcher/pricing variants.",
    ],
  ),
  "notification-dispatcher": problem(
    "OrderService talks SMTP and checkout dies when mail is down. Users who opted out of SMS still get texts. Retries loop forever.",
    "Dispatcher, channel adapters, preferences, bounded queue, idempotent send per notification+channel.",
    "Email + SMS; user disables SMS. Fake failing channel retries then dead-letters. Add Push as a class.",
    [
      "Design a notifier. OrderService only tells the dispatcher.",
      "Add push without editing the core.",
      "At-least-once queue — same id does not double-send.",
    ],
  ),
  "payment-wallet": problem(
    "User.balance += from six places. Retry credits twice. transfer(a,b) deadlocks. Amounts are floats.",
    "Wallet aggregate, ledger, Money, idempotent debit/credit. Ordered locks on transfer. Cards are a port.",
    "10 balance, 100 threads debit 1 — ten successes, end at 0. A↔B opposite transfers do not deadlock.",
    [
      "Design a wallet. Last cent and retries.",
      "Transfer lock order.",
      "Top-up: charge card then credit — compensate if needed.",
    ],
  ),
  "url-shortener": problem(
    "Product wants short links, optional alias, expiry, and click counts. Someone started drawing Dynamo and a CDN.",
    "ShortUrl entity, code generator, uniqueness retry, URL validation, repository. Stay in classes.",
    "Custom alias conflict. FakeClock expiry → resolve fails. Bounded regenerate on collision. Reject javascript: URLs.",
    [
      "Design a URL shortener in classes, not a cache tier.",
      "Collision handling.",
      "If this were distributed — a footnote, then stop.",
    ],
  ),
  autocomplete: problem(
    "Typeahead scans the whole dictionary each keystroke. N will grow. They want top-k and later live updates.",
    "Trie or an honest list if N is tiny. suggest(prefix, k). Optional node-level top-k cache.",
    "Insert a corpus; suggest('ca', 3). Clamp k. Concurrent add is a later lock or writer thread.",
    [
      "Design in-memory autocomplete.",
      "YAGNI a list, then upgrade to a trie.",
      "Hot updates — caches on nodes.",
    ],
  ),
  "in-memory-file-system": problem(
    "mkdir, write, read, ls, rm on paths. A file in the middle of a path must fail. Callers mutate the children map. Move can cycle.",
    "Composite tree, Path value, FileSystem facade. resolve() is the shared walk. Snapshots from ls.",
    "mkdir/write/read/ls/rm tests. size() recurses. Permissions later as checks or a proxy. No live map return.",
    [
      "Design an in-memory file system. File / Directory / resolve.",
      "Find *.md — visitor or a walk.",
      "mv into a descendant — forbid the cycle.",
    ],
  ),
  "amazon-locker": problem(
    "Couriers drop packages into sized lockers. Buyers pick up with a code before a deadline. An M box must not enter an S slot.",
    "Site assigns a FREE locker that fits. Code plus TTL. Pickup and expire free the slot. Smallest-fit is a strategy.",
    "Smallest-fit, pickup, expire. Last small locker, two S packages — one fails. Return-to-warehouse port on expiry.",
    [
      "Design package lockers. Parking lot for boxes, plus a code.",
      "Last small locker, two drop-offs.",
      "Assignment: smallest fit vs near the door.",
    ],
  ),
  "calendar-scheduler": problem(
    "Find a 30-minute slot for three people in a window. Working hours exist. Two books can race the same gap. Recurrence is a trap.",
    "Busy ranges merge, invert inside working hours, book re-checks. Store UTC. One Event or per-calendar copies — pick.",
    "Three users, propose a 30m slot. Concurrent books of that slot — one fails. Skip RRULE in v1.",
    [
      "Design a meeting finder. Merge intervals are the core.",
      "Time zones — store UTC.",
      "Race on the same slot.",
    ],
  ),
  "browser-history": problem(
    "Visit, back, forward. Visit after back must drop the forward stack. Tabs should not share history. They may want a size cap.",
    "Two stacks plus current. Encapsulate. Optional append-only log for the history UI.",
    "A→B→C, back, visit D; forward empty. Max-size evicts oldest back. Reopen-closed-tab is a stack on Browser.",
    [
      "Design browser history. Finish in fifteen minutes.",
      "Show visit clears forward.",
      "Then tabs or persist.",
    ],
  ),
  "text-editor": problem(
    "Key handlers call buffer.insert and undo is a pile of flags. Deleted text cannot come back. Snapshots fire every character with no bound.",
    "Buffer API, commands that store inverses, editor stacks. Memento when inverse is messy. Cap history.",
    "Insert, delete, undo, redo. Macro types a snippet as one undo. UI must go through the invoker.",
    [
      "Design a small editor. Command, buffer, stacks.",
      "Replay is the undo stack reversed.",
      "Plugin commands — interface plus registry.",
    ],
  ),
  "hashmap-internals": problem(
    "Design a map. Keys can be mutated after put. == used instead of equals. Resize forgot to rehash. They may ask about threads.",
    "Buckets, hash & mask, chain, load-factor resize. State the equals/hashCode contract. This impl is not concurrent.",
    "Tiny chained map with resize tests. Broken mutable-key demo. ConcurrentHashMap or a lock if they add threads.",
    [
      "Design a hashmap. hash, walk, resize.",
      "Mutable keys — what happens?",
      "Now concurrent — do not just synchronize without comment.",
    ],
  ),
  logger: problem(
    "Domain classes call console.log. Tests cannot silence it. Level INFO still concatenates huge strings. PIN is in the line.",
    "Logger port, levels, appenders, formatters. Guarded logging. Null logger for tests. Inject, do not require a global.",
    "Console + file appenders, level INFO. NullLogger in a unit test. Graduate to the async design if logging is the round.",
    [
      "A logger port plus a console appender.",
      "If logging is the problem, go async.",
      "NullLogger in tests.",
    ],
  ),
  "config-loader": problem(
    "Settings live in a global mutable map. Missing PORT boots anyway. Reload applies half the keys. Secrets print on load.",
    "Overlay sources, validate, publish an immutable snapshot. Atomic swap on reload. Fail boot on required keys.",
    "JSON plus env; fail if PORT missing. Corrupt reload keeps the old snapshot. Fee table as config for the garage.",
    [
      "Design config load. Immutable snapshot, atomic swap.",
      "Missing required key at boot.",
      "Readers never see a half-applied reload.",
    ],
  ),
  "plugin-system": problem(
    "A document host switches on plugin.id. The SPI has twenty methods. Plugins reach into private host fields. Disabling one needs a recompile.",
    "Tiny hooks, registry, engine that does not import concretes. Config enables. Isolate failures. Loader may be hardcoded.",
    "SpellCheck and Uppercase plugins. Disable one via config; engine path unchanged. Demo: add a class, register, host untouched.",
    [
      "Design a plugin host. SPI stability is the product.",
      "Add a plugin class; engine unchanged.",
      "Fat Plugin interface — segregate.",
    ],
  ),
  "event-bus": problem(
    "A stringly-typed bus holds Map payloads. Rules live inside the bus. Publish happens under a lock the handler also needs. Email must send if the order saved — nobody said when.",
    "Typed immutable events, stupid bus, handlers registered in main. Isolate errors. Prefer after-commit if you have a unit of work.",
    "OrderPlaced → email + inventory projection; one throws, the other runs. After-commit flush. Request/reply is a smell.",
    [
      "Design a typed event bus. Keep it boring.",
      "Email must send if order saved — outbox.",
      "This is a hub or a fan-out — say which you mean.",
    ],
  ),

  "lld-interview-method": problem(
    "Forty minutes left. Someone spent twenty-five on nouns, has no park() signature, and is coding a printer. The interviewer cannot interrupt because they went silent.",
    "Speak a 7-step loop: scope, verbs, nouns, invariants, diagram, one sequence, code the heart. Time-box. Leave five minutes for tests and a variant.",
    "Parking garage in 40 using only the steps. Elevator in 25: states, scheduler interface, one car coded.",
    [
      "Tell me your plan in fifteen seconds, then start.",
      "They rush you to code — keep the invariant and the main signature.",
      "Fifteen minutes left, no code. Jump to the heart with a smaller diagram.",
    ],
  ),
  "add-a-variant": problem(
    "The first design works. They add EV, weekend price, a second thread, or undo. You now edit five switches. Kafka for the vending machine is on the board.",
    "Predict one axis, leave a seam, implement one concrete. When the variant arrives, add a type and re-walk the sequence. Push back on HLD-scale extras.",
    "Parking: EV + weekend fee without editing Lot.park. Vending: card via a payment method. Concurrency: name the owner before the locks.",
    [
      "I will add a class here if you add another X.",
      "This is the open/closed point — add the class live.",
      "They add Kafka to a vending machine. Renegotiate scope.",
    ],
  ),

  "pattern-cheatsheet": problem(
    "The prompt says weekend price, also SMS, undo that, last seat, test without SQL. Someone reaches for Visitor on the garage.",
    "Map the product sentence to one seam. One pattern, one interface, one concrete. Prefer the smaller fit.",
    "New fee rule → policy object. Also SMS → listener. Undo → command or snapshot. Last seat → atomic reserve. No SQL → port + fake.",
    [
      "Weekend price. Also SMS. Undo. Which seams?",
      "Two axes or one? Bridge vs a single policy.",
      "Three patterns on a vending machine — delete extras.",
    ],
  ),
  "pattern-lookalikes": problem(
    "They ask 'is that not just a decorator?' You drew a wrapper. Strategy and State both have a field. Factory Method and Abstract Factory are both named Factory.",
    "Distinguish on intent, not on whether there is a wrapper field. Say the sentence, then keep coding.",
    "Retry stack is extra behavior; ACL stand-in is access. Stripe→port is shape; park() is a simpler API over many types. One product vs a matching family. Fan-out vs a named hub.",
    [
      "Is that not just X? Compare intent, not the wrapper field.",
      "Fee types as State — wrong. How I price vs what I am.",
      "Undo: inverse command vs opaque snapshot. Which and why?",
    ],
  ),
};