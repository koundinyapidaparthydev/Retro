import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "parking-lot",
    track: "lld",
    category: "Designs",
    title: "Parking lot",
    summary:
      "A lot owns floors and spots; vehicles take a matching free spot; a ticket records the stay; a fee policy prices the exit. The lot is the aggregate root.",
    depth: "core",
    whyItMatters:
      "This is the canonical LLD. It tests modeling, invariants (occupied iff vehicle), OCP (new vehicle or fee), and a clean service API. If you can extend it live, you can do most object designs.",
    theory: [
      "Key classes: ParkingLot (root), Floor, Spot, Vehicle (or VehicleType + plate), Ticket, FeePolicy, ParkingService. Optional: Entrance, PaymentPort, Reservation. Spot has type (compact, large, EV, handicap) and status (FREE, OCCUPIED, RESERVED). Vehicle is an entity by plate; Ticket is an entity by id holding spot id, in-time, optional out-time.",
      "Relationships: Lot 1—* Floor 1—* Spot; Spot 0..1 Vehicle; Ticket references Spot and Vehicle ids; ParkingService uses Lot, Clock, FeePolicy, PaymentPort. Do not let controllers occupy a Spot directly.",
      "Main sequence: park(vehicle) → validate → lot.findSpot(type) → spot.occupy(vehicle) → Ticket issued. unpark(ticketId) → load ticket → feePolicy.quote(ticket, now) → pay → spot.free() → close ticket. Fail fast if no spot or ticket already closed.",
      "Extension point: FeePolicy and SpotFinder (nearest, EV-first). Add a vehicle type in the factory, not in Lot. For concurrency, lock the lot or the floor when taking the last spot; make park idempotent on a request id if they mention double-click.",
    ],
    howItWorks: [
      "Confirm types of spots/vehicles, payment, multi-floor, reservations.",
      "Draw Lot → Floor → Spot; Ticket; FeePolicy interface.",
      "Implement find+occupy atomically on the lot.",
      "Keep fee math out of Spot.",
      "Add a second FeePolicy when they ask for weekend rates.",
    ],
    whenToUse: [
      "Warm-up LLD, teaching aggregates, any 'resource assignment + billing' problem.",
    ],
    whenNotToUse: [
      "Do not turn it into a city-scale HLD unless they ask — stay in-process.",
    ],
    tradeoffs: [
      "One lock on the lot vs per-floor locks (more throughput, harder assignment across floors).",
      "Inheritance of Vehicle vs a type enum + data — enum+policy is usually enough.",
    ],
    interviewTips: [
      "Write invariants: a spot never has a vehicle when FREE. Show occupy() enforcing it.",
      "When they add EV, add a spot type and a finder preference — do not rewrite park.",
      "Skip gates and displays unless asked; mention them as ports.",
    ],
    pitfalls: [
      "Public spot list mutated by the caller.",
      "Fee switch inside unpark and also inside a report.",
      "Finding a spot and occupying it in two unsynchronized steps.",
    ],
    practiceIdeas: [
      "Code park/unpark with hourly and daily policies.",
      "Add a concurrent last-spot test.",
    ],
    related: [
      "aggregates",
      "strategy-pattern",
      "solid-ocp",
      "invariants",
      "add-a-variant",
    ],
  },
  {
    slug: "elevator",
    track: "lld",
    category: "Designs",
    title: "Elevator",
    summary:
      "Cars are state machines; a scheduler assigns hall calls; each car owns a direction and a set of stops. The extension is always the scheduling policy.",
    depth: "core",
    whyItMatters:
      "Elevator tests state, strategy, and concurrency. Interviewers add destination-dispatch or peak-hour mode to see if you left a scheduler interface.",
    theory: [
      "Key classes: ElevatorBank, ElevatorCar, Floor, HallCall (floor + direction), CarCall (destination), Door, Scheduler (strategy), ElevatorService. Car state: IDLE, MOVING_UP, MOVING_DOWN, OPENING, CLOSING, MAINTENANCE. Direction matters for SCAN/LOOK algorithms.",
      "Relationships: Bank 1—* Car; Bank has a Scheduler; Car has Door and a sorted set of stops; Service uses Bank. Hall buttons talk to the bank, not to a specific car (unless destination-dispatch).",
      "Main sequence: request(floor, dir) → scheduler.assign(call, cars) → car.addStop(floor). tick() or run loop: if stops ahead, move one floor; if current in stops, open, clear stop, close, recompute direction. CarCall from inside just adds a stop.",
      "Extension point: Scheduler — SCAN, LOOK, destination-dispatch (user picks floor in lobby), peak-hour (park cars on busy floors). Door timeout and capacity are extra policies. One actor/thread per car avoids locking the whole bank for movement.",
    ],
    howItWorks: [
      "Draw the car state machine first.",
      "Implement one car + a naive scheduler (nearest idle).",
      "Add SCAN: keep moving until no stops in that direction.",
      "Extract Scheduler when they ask for a second policy.",
      "Define tick vs event-driven movement.",
    ],
    whenToUse: [
      "State + strategy interviews, concurrency follow-ups, control systems.",
    ],
    whenNotToUse: [
      "Do not simulate physics or cable wear unless they are joking.",
    ],
    tradeoffs: [
      "Central scheduler vs per-car intelligence.",
      "Synchronous tick (easy to test) vs real timers.",
    ],
    interviewTips: [
      "Say 'I will not code the perfect SCAN in 10 minutes; here is the interface and a simple assign.'",
      "Illegal: open door while moving — state pattern or guards.",
      "For many cars, mention an actor per car.",
    ],
    pitfalls: [
      "Car that both moves and assigns all hall calls (god car).",
      "Booleans moving and direction instead of a state.",
      "No idle behavior — cars freeze with pending calls.",
    ],
    practiceIdeas: [
      "Two cars, nearest-idle, then swap in SCAN.",
      "Add maintenance state that rejects new stops.",
    ],
    related: [
      "state-pattern",
      "strategy-pattern",
      "use-case-state-diagrams",
      "actor-model",
      "add-a-variant",
    ],
  },
  {
    slug: "hotel-booking",
    track: "lld",
    category: "Designs",
    title: "Hotel booking",
    summary:
      "Rooms are inventory; a Reservation is the aggregate that holds a date range, guest, and status. Overlap is the invariant; search is a query on availability.",
    depth: "core",
    whyItMatters:
      "Hotels teach date-range values, inventory reservation, expiry, and cancellation policies — the same bones as car rental and locker systems.",
    theory: [
      "Key classes: Hotel, Room (id, type, amenities), DateRange (value), Reservation (id, roomId or roomType hold, guestId, range, status), AvailabilityService, PricingPolicy, ReservationRepository, HotelService. Status: PENDING, CONFIRMED, CHECKED_IN, CHECKED_OUT, CANCELLED, EXPIRED, NO_SHOW.",
      "Relationships: Hotel has Rooms; Reservation references Room and Guest by id; Service uses Clock, PricingPolicy, PaymentPort. Prefer reserving a room type then assigning a concrete room at check-in if they want flexibility — or lock a room id at booking if they want simplicity. Say which.",
      "Main sequence: search(type, range) → rooms/types with no overlapping ACTIVE reservation. book() → create PENDING → pay → CONFIRMED. checkIn() assigns room if needed. cancel() applies policy (refund window). A job expires PENDING holds.",
      "Extension point: PricingPolicy (weekend, season, length-of-stay), overbooking policy, room-assignment strategy at check-in. Inventory reserve must be atomic for the last room-night.",
    ],
    howItWorks: [
      "Make DateRange a value that rejects inverted dates.",
      "Define which statuses count as occupying inventory.",
      "Implement overlap check on the repository or inside a Hotel aggregate if the hotel is small.",
      "Add payment + expiry as a second pass.",
      "Do not store nights as a list of booleans on Room unless N is tiny — store reservations.",
    ],
    whenToUse: [
      "Date-inventory problems: hotels, rentals, lockers, meeting rooms.",
    ],
    whenNotToUse: [
      "A single-night inn with one room — still use the same types, just fewer.",
    ],
    tradeoffs: [
      "Assign room at booking (simple, less flexible) vs at check-in (flexible, more logic).",
      "Hotel as one aggregate vs Reservation as root + query service (better scale).",
    ],
    interviewTips: [
      "Write DateRange.overlaps. That method is the design.",
      "Ask about overbooking. Default to no; leave a policy hook.",
      "Mention a Clock port for expiry tests.",
    ],
    pitfalls: [
      "Allowing overlapping CONFIRMED reservations.",
      "Cancelling without freeing inventory.",
      "Using strings for dates.",
    ],
    practiceIdeas: [
      "Book two guests on the last deluxe room for overlapping ranges — second fails.",
      "Add a 15-minute PENDING hold that expires.",
    ],
    related: [
      "identity-vs-value-objects",
      "calendar-scheduler",
      "car-rental",
      "amazon-locker",
      "invariants",
    ],
  },
  {
    slug: "library",
    track: "lld",
    category: "Designs",
    title: "Library",
    summary:
      "Catalog of titles, copies you can loan, members, and a loan policy for due dates and fines. The copy's status and the Loan record are the source of truth.",
    depth: "core",
    whyItMatters:
      "Library is a gentle aggregate: Book (title) vs Copy (item), Loan, Member. It tests the entity/value split and a policy object for due dates.",
    theory: [
      "Key classes: Title (ISBN, metadata), Copy (barcode, titleId, status), Member, Loan (copyId, memberId, dueAt, returnedAt), Catalog, LoanPolicy, LibraryService. Status on Copy: AVAILABLE, ON_LOAN, RESERVED, LOST. Search is on Title; borrow is on Copy.",
      "Relationships: Title 1—* Copy; Loan references Copy and Member; Member may have active loan count. LibraryService uses Clock + LoanPolicy. Do not put borrow() on Title — you loan a copy.",
      "Main sequence: search → pick available copy → loanPolicy.canBorrow(member) → copy.markOnLoan() + create Loan. return → copy.available() + loan.close() + fine if late. reserve: hold a copy or a place in a queue per title.",
      "Extension point: LoanPolicy (student vs faculty, max books, loan length), FinePolicy, ReservationQueue. Notifications on due dates via Observer. Persistence via repositories for Title and Loan.",
    ],
    howItWorks: [
      "Split Title vs Copy on the diagram immediately.",
      "Implement borrow/return with a Clock.",
      "Enforce max-loans on Member via the policy, not a magic number in the service.",
      "Add reservation queue if asked.",
      "Keep search in a catalog/read model.",
    ],
    whenToUse: [
      "Teaching entity vs copy, policies, and simple search.",
    ],
    whenNotToUse: [
      "Do not design the Library of Congress classification system in 40 minutes.",
    ],
    tradeoffs: [
      "Loan as entity vs status-only on Copy — you need Loan if you care about history and fines.",
      "Per-title reservation queue vs per-copy hold.",
    ],
    interviewTips: [
      "Say ISBN is a value, Copy has identity. Easy DDD-lite points.",
      "Fine calculation uses Clock.now vs dueAt — inject Clock.",
      "Skip ISBN APIs and printers.",
    ],
    pitfalls: [
      "Borrowing a Title with no copy tracking — two members take the same physical book.",
      "Due dates computed with `new Date()` in three places.",
      "Member holding a list of Copy objects instead of loans.",
    ],
    practiceIdeas: [
      "Implement borrow/return/fine with a FixedClock.",
      "Add a reservation that assigns the next returned copy.",
    ],
    related: [
      "identity-vs-value-objects",
      "strategy-pattern",
      "repository-dao",
      "fail-fast",
      "notification-dispatcher",
    ],
  },
  {
    slug: "restaurant",
    track: "lld",
    category: "Designs",
    title: "Restaurant",
    summary:
      "Tables, a menu, orders with courses, and kitchen tickets. The Table reservation and the Order aggregate are two different consistency boundaries.",
    depth: "next",
    whyItMatters:
      "Restaurant combines seating inventory (hotel-like) with an order/kitchen workflow (state machine). It is a good 'two aggregates' design.",
    theory: [
      "Key classes: Restaurant, Table, Reservation, Menu, MenuItem, Order, OrderLine, KitchenTicket, OrderService, SeatingService. Order states: OPEN, SENT_TO_KITCHEN, PARTIALLY_SERVED, PAID, CANCELLED. Table states: FREE, RESERVED, OCCUPIED.",
      "Relationships: SeatingService owns Table/Reservation. OrderService owns Order and talks to Kitchen (port). Table does not contain the Order graph — link by tableId. MenuItem is a value/entity in catalog; OrderLine snapshots price at add time so menu edits do not rewrite open checks.",
      "Main sequence: seat(party) → pick table → create OPEN order. addItem → snapshot price. sendToKitchen → tickets. pay → PaymentPort → PAID → free table. Reservation at 7pm is a hold on a table with a no-show expiry.",
      "Extension point: seating strategy (combine tables), happy-hour PricingPolicy, kitchen routing (hot vs cold station). Do not put cooking timers in the Order unless asked.",
    ],
    howItWorks: [
      "Split seating from ordering on the board.",
      "Snapshot MenuItem price onto OrderLine.",
      "Implement addItem/send/pay on Order.",
      "Kitchen is a port (or a queue).",
      "Add reservations as a second use case.",
    ],
    whenToUse: [
      "Workflow + inventory interviews, POS-like systems.",
    ],
    whenNotToUse: [
      "A food-truck with no tables — drop SeatingService.",
    ],
    tradeoffs: [
      "One Order per table vs split checks (multiple orders per table).",
      "Kitchen as Observer vs explicit Ticket queue.",
    ],
    interviewTips: [
      "Mention price snapshot. It sounds small and is very senior.",
      "If they add online orders, they are just another source of Order — same aggregate.",
      "Keep menu editing out of the first 20 minutes.",
    ],
    pitfalls: [
      "Order holding live MenuItem references so a price change mutates the check.",
      "Table owning kitchen logic.",
      "No state on Order — you can pay before cooking or cook after cancel.",
    ],
    practiceIdeas: [
      "Implement add/remove line, send, pay, and a menu price change that does not affect open orders.",
      "No-show job frees a reserved table.",
    ],
    related: [
      "hotel-booking",
      "cart-checkout",
      "state-pattern",
      "aggregates",
      "strategy-pattern",
    ],
  },
  {
    slug: "atm",
    track: "lld",
    category: "Designs",
    title: "ATM",
    summary:
      "A session authenticates a card; an Account port performs banking operations; a CashDispenser chain pays out notes; the ATM machine has a hardware state.",
    depth: "core",
    whyItMatters:
      "ATM is hardware + domain + a chain of dispensers. It tests ports (bank network), state (card in, pin, serving), and fail-fast on insufficient cash in the tray vs insufficient funds.",
    theory: [
      "Key classes: AtmMachine (state), CardReader, PinPad, Session, BankPort, Account (remote), CashDispenser / NoteHopper (chain), ReceiptPrinter, AtmService. Machine states: IDLE, CARD_IN, AUTHENTICATED, DISPENSING, OUT_OF_SERVICE.",
      "Relationships: AtmService uses BankPort and Dispenser. Session holds card token, not PIN, after auth. Hoppers are a Chain of Responsibility ($50 then $20 then $10) plus an inventory count. Machine does not contain bank ledgers — those are on the BankPort.",
      "Main sequence: insertCard → read → requestPin → BankPort.verify → show menu. withdraw(amount) → BankPort.authorize → dispenser.canPayout(amount) → dispenser.payout → BankPort.capture. If payout fails after authorize, reverse. eject card on end or too many PIN tries.",
      "Extension point: Dispenser algorithms, multi-currency hoppers, deposit slot as another port. BankPort is the adapter to the network. Do not implement a full bank core unless asked — define the port.",
    ],
    howItWorks: [
      "Draw machine states and the BankPort methods.",
      "Implement withdraw with authorize/payout/capture/reverse.",
      "Build a hopper chain with counts.",
      "Fail if the combination of notes cannot make the amount.",
      "Keep PIN out of logs and out of Session storage.",
    ],
    whenToUse: [
      "Hardware + ports, chain of responsibility, two-phase money.",
    ],
    whenNotToUse: [
      "Do not design the entire card network (HLD).",
    ],
    tradeoffs: [
      "Authorize-then-dispense vs dispense-then-debit — pick one and compensate.",
      "Local cash inventory vs bank balance — both can fail independently.",
    ],
    interviewTips: [
      "Name the two failure modes: bank says no vs tray cannot make $70 with the notes left.",
      "Chain of Responsibility for hoppers is the expected pattern mention.",
      "Timeouts: session expires, card is eaten after N PIN fails — state + clock.",
    ],
    pitfalls: [
      "Debiting before knowing cash can be made, with no reverse.",
      "Storing PIN on the session object.",
      "One class ATM that does everything.",
    ],
    practiceIdeas: [
      "Hopper chain for 50/20/10 that fails a $30 request if only 50s remain.",
      "Fake BankPort that declines and a test that hoppers do not move.",
    ],
    related: [
      "chain-of-responsibility",
      "state-pattern",
      "payment-wallet",
      "hexagonal-architecture",
      "transactions-per-use-case",
    ],
  },
  {
    slug: "vending-machine",
    track: "lld",
    category: "Designs",
    title: "Vending machine",
    summary:
      "A state machine that collects money, selects a SKU, checks inventory, dispenses, and makes change. Inventory and coin box are the data; states are the API.",
    depth: "core",
    whyItMatters:
      "The vending machine is the State pattern mascot. It also has a small inventory and a change-making problem — keep both visible.",
    theory: [
      "Key classes: VendingMachine (context), State (Idle, Collecting, Dispensing, OutOfService), Inventory (sku → count + price), CoinBox / ChangeMaker, Product. Events: insertCoin, select, refund, serviceRestock.",
      "Relationships: Machine has current State, Inventory, CoinBox. States call back on a narrow machine API (credit, dispense). Product is a catalog entry; Inventory owns counts.",
      "Main sequence: Idle → insertCoin → Collecting (credit +=) → select → if credit < price reject; if count 0 reject; else Dispensing → inventory.decrement, changeMaker.return(credit-price), reset credit, Idle. refund from Collecting returns coins and Idle.",
      "Extension point: payment (coins vs card as a PaymentMethod strategy), ChangeMaker algorithm, 'sold out' display. Service mode is a state that allows restock. Do not implement robotics.",
    ],
    howItWorks: [
      "Draw the state diagram before classes.",
      "Implement insert/select/refund on each state.",
      "Keep inventory decrement in the same step as commit.",
      "ChangeMaker is a strategy (greedy vs DP if they want exact change only).",
      "Add a card reader as a second payment strategy if asked.",
    ],
    whenToUse: [
      "State pattern practice, small inventory + money.",
    ],
    whenNotToUse: [
      "A supermarket checkout — that is cart-checkout.",
    ],
    tradeoffs: [
      "State classes vs an enum table — either is fine if transitions are explicit.",
      "Greedy change vs exact-change-only when the box is short.",
    ],
    interviewTips: [
      "Illegal select in Idle fails. Show it.",
      "If they want card payment, do not explode the state machine — inject PaymentMethod for the 'enough money' check.",
      "Mention Memento if they want cancel-after-select restore — usually refund is enough.",
    ],
    pitfalls: [
      "Decrementing inventory before knowing change can be made.",
      "Credit stored on the UI, not the machine.",
      "One switch of 80 lines and no diagram.",
    ],
    practiceIdeas: [
      "Full state machine with two products and change.",
      "Exact-change mode when the box cannot break a bill.",
    ],
    related: [
      "state-pattern",
      "use-case-state-diagrams",
      "strategy-pattern",
      "coffee-machine",
      "memento-pattern",
    ],
  },
  {
    slug: "traffic-signal",
    track: "lld",
    category: "Designs",
    title: "Traffic signal",
    summary:
      "An intersection runs a cycle (or an actuated policy) over SignalHeads that are state machines: red/yellow/green with safety interlocks so conflicting directions are never green together.",
    depth: "next",
    whyItMatters:
      "This is a real-time state design with a hard invariant: no conflicting greens. It tests clocks, policies, and fail-safe (all-red / flashing).",
    theory: [
      "Key classes: Intersection, SignalHead (id, facing, current Color), Phase (a legal set of greens), CyclePolicy / ActuatedPolicy, PedestrianHead (optional), Controller, Clock. Color: RED, YELLOW, GREEN, FLASHING_RED.",
      "Relationships: Intersection owns heads and a Controller. A Phase lists which heads may be green. Policy picks the next phase. Invariant lives on Intersection: conflicting groups cannot be GREEN at once. Controller is the only mutator.",
      "Main sequence: tick(now) → if phase elapsed, go YELLOW for those heads → all-red clearance → next phase GREEN. Actuated: sensors extend green until a max. Emergency: preemption phase. Fault: all flashing red.",
      "Extension point: CyclePolicy vs ActuatedPolicy vs EmergencyPreemption (strategy). Pedestrian walk phases. Do not simulate cars. Safety clearance times are config, not magic numbers in ifs.",
    ],
    howItWorks: [
      "Define conflict groups (N-S vs E-W).",
      "Represent phases as data, not as copy-pasted sleeps.",
      "Implement tick with a Clock.",
      "Guard setGreen with the conflict invariant.",
      "Add a pedestrian or emergency policy as a new strategy.",
    ],
    whenToUse: [
      "Control systems, safety invariants, timed state machines.",
    ],
    whenNotToUse: [
      "City-wide traffic optimization (HLD / OR).",
    ],
    tradeoffs: [
      "Fixed cycle (simple, worse under uneven load) vs actuated (needs sensors).",
      "Central controller vs each head as an actor — central is easier to prove safety.",
    ],
    interviewTips: [
      "Write the invariant first: conflicting heads never green. Then the API that protects it.",
      "Use a Clock so tests can jump 30 seconds.",
      "Fail-safe state is a good 'what if a sensor dies' answer.",
    ],
    pitfalls: [
      "Two heads toggling independently with Thread.sleep.",
      "No yellow/all-red clearance.",
      "Policy that can pick an illegal phase.",
    ],
    practiceIdeas: [
      "Four-way intersection with 30/3/2 timings, unit-tested via FakeClock.",
      "Add a pedestrian phase without breaking the conflict table.",
    ],
    related: [
      "state-pattern",
      "strategy-pattern",
      "invariants",
      "elevator",
      "fail-fast",
    ],
  },
  {
    slug: "chess",
    track: "lld",
    category: "Designs",
    title: "Chess",
    summary:
      "A Board of Squares holds Pieces that compute legal moves; a Game owns turn, check, and history. Polymorphism lives on Piece, not in a 64×64 switch.",
    depth: "next",
    whyItMatters:
      "Chess is the polymorphism + rules interview. You will not finish a complete engine. You must show Piece.legalMoves, turn management, and an extension for special moves.",
    theory: [
      "Key classes: Game, Board, Square, Piece (abstract) with King/Queen/Rook/Bishop/Knight/Pawn, Color, Move, MoveValidator, GameState (IN_PLAY, CHECK, CHECKMATE, STALEMATE, DRAW). Optional: Clock, Player.",
      "Relationships: Game has Board + turn + history. Board is 8×8 of optional Piece. Piece.legalMoves(board, from) returns squares; Game.apply(move) checks turn, legality, self-check, then mutates. History is a list of Moves (for undo/replay) or Mementos.",
      "Main sequence: apply(from,to) → piece at from is turn color → to in legalMoves → probe board for self-check (clone or try/revert) → execute (handle capture) → switch turn → evaluate check/mate. Display is a view.",
      "Extension point: special moves (castling, en passant, promotion) as rules on Pawn/King or a SpecialMove set. AI is a Strategy on Player. Do not implement opening books. Clone board for lookahead (Prototype).",
    ],
    howItWorks: [
      "Piece interface with legalMoves and color.",
      "Board.get/set/inBounds; no game rules on Board beyond occupancy.",
      "Game.apply is the only mutator of record.",
      "Implement rook/bishop/knight fully; say pawn specials are next.",
      "Check = any opponent move attacks king square.",
    ],
    whenToUse: [
      "Polymorphism, cloning for search, undo.",
    ],
    whenNotToUse: [
      "Writing a full FIDE-complete engine in the round — scope it.",
    ],
    tradeoffs: [
      "Bitboards (fast, opaque) vs object board (clear for LLD).",
      "Try-move-revert vs immutable board copies for check tests.",
    ],
    interviewTips: [
      "Scope: 'I'll do movement + check; castling as an extension.' They will respect it.",
      "Do not switch on piece type in Game. That is the anti-design.",
      "Mention Prototype clone for AI if they ask.",
    ],
    pitfalls: [
      "Game class with a 400-line move method.",
      "Forgetting that a move is illegal if it leaves you in check.",
      "Mutable pieces shared after capture.",
    ],
    practiceIdeas: [
      "legalMoves for rook/bishop/knight + apply + self-check.",
      "Undo via move history or memento.",
    ],
    related: [
      "polymorphism",
      "prototype-pattern",
      "memento-pattern",
      "strategy-pattern",
      "tic-tac-toe",
    ],
  },
  {
    slug: "tic-tac-toe",
    track: "lld",
    category: "Designs",
    title: "Tic-tac-toe",
    summary:
      "A 3×3 Board, two Players, and a Game that validates turns and detects win/draw. Small enough to finish; rich enough to show a clean API and an AI strategy.",
    depth: "core",
    whyItMatters:
      "This is the 'can you finish' game design. Interviewers watch whether you still use types and invariants when the board is tiny.",
    theory: [
      "Key classes: Game, Board, Player (Human / AiStrategy), Mark (X,O,EMPTY), Position, GameResult. Board owns a 3×3 of Mark. Game owns turn and status.",
      "Relationships: Game has Board and two Players. Players use the Game/Board; they do not write cells directly. AI is a Strategy: nextMove(board, mark).",
      "Main sequence: play(pos) → cell empty → place mark → check rows/cols/diags → WIN or switch turn; if board full DRAW. Restart creates a new Board, not leftover cells.",
      "Extension point: AI strategy (random, minimax), larger boards (N-in-a-row), undo via history. MVC if they want a UI: Board is the model.",
    ],
    howItWorks: [
      "Board.place(pos, mark) fails if occupied.",
      "Game.play checks turn and delegates.",
      "Winner check in one method that scans 8 lines.",
      "Inject AiStrategy for player two.",
      "Keep Position as a value 0–2, 0–2.",
    ],
    whenToUse: [
      "Warm-up, testing-as-design, showing you can finish.",
    ],
    whenNotToUse: [
      "Over-patterning with Abstract Factory for marks.",
    ],
    tradeoffs: [
      "Minimax is complete and may be too much; random + interface is enough unless they ask.",
    ],
    interviewTips: [
      "Finish the game. Then add AI as a strategy.",
      "Write two tests: win on a row, reject occupied cell.",
      "Do not talk about microservices.",
    ],
    pitfalls: [
      "No turn check — X plays twice.",
      "Winner check copied in the UI.",
      "Magic numbers instead of SIZE.",
    ],
    practiceIdeas: [
      "Implement play + result + a minimax AI if time.",
      "Add undo with a move stack.",
    ],
    related: [
      "chess",
      "strategy-pattern",
      "mvc-mvvm",
      "invariants",
      "testing-as-design",
    ],
  },
  {
    slug: "snake-and-ladder",
    track: "lld",
    category: "Designs",
    title: "Snake and ladder",
    summary:
      "A Board is a map of teleports; Players have a position; a Game loop rolls a Dice port and applies moves until a winning square.",
    depth: "core",
    whyItMatters:
      "A completeable game that still has ports (dice), entities (player), and a board as data. Good for showing you will not hard-code `Math.random` in the domain.",
    theory: [
      "Key classes: Game, Board (size, snakes, ladders), Player, Dice (port), Move, GameService. Board stores start→end teleports; a snake and a ladder are the same structure (a jump). Winning square is usually size.",
      "Relationships: Game has Board, ordered Players, Dice, current index. Players have id and position. Dice is injected (fair 1–6, loaded, or fake).",
      "Main sequence: roll → next = pos+roll; if next > size, rule (bounce or skip); apply teleport if any; if exact size, win. Extra turn on 6 is a policy. Turn order is a circular list.",
      "Extension point: Dice, win rule (exact vs pass), extra-turn policy, multiple tokens per player. Board can be loaded from config. Do not simulate animation.",
    ],
    howItWorks: [
      "Board.apply(position) → after teleport.",
      "Dice.roll() port with a FakeDice in tests.",
      "Game.turn() is the unit of play.",
      "Keep snake/ladder data in a map, not 50 ifs.",
      "Decide bounce vs ignore-overshoot and write it down.",
    ],
    whenToUse: [
      "Finishable LLD, ports for randomness, config-driven boards.",
    ],
    whenNotToUse: [
      "Do not add multiplayer networking.",
    ],
    tradeoffs: [
      "Exact-land vs overshoot rules change the loop slightly — keep them in a WinPolicy.",
    ],
    interviewTips: [
      "FakeDice that returns [6,3,2] is a testing-as-design flex.",
      "Snakes and ladders as one Jump type — DRY.",
      "Scope out UI.",
    ],
    pitfalls: [
      "Math.random in Game with no port.",
      "Infinite snake loops — validate board on load (no cycles, or detect).",
      "Hard-coded 100 squares when they asked for N.",
    ],
    practiceIdeas: [
      "Load a board from a map and play with FakeDice to a known winner.",
      "Reject a board that has a cycle.",
    ],
    related: [
      "testing-as-design",
      "config-loader",
      "strategy-pattern",
      "tic-tac-toe",
      "fail-fast",
    ],
  },
  {
    slug: "splitwise",
    track: "lld",
    category: "Designs",
    title: "Splitwise",
    summary:
      "Users, Groups, and Expenses that fan out into LedgerEntries. Balances are projections; simplify is a graph-min-cash-flow problem on those balances.",
    depth: "next",
    whyItMatters:
      "Splitwise tests money values, a ledger that must stay balanced, and an algorithm (simplify debts) that is not the source of truth.",
    theory: [
      "Key classes: User, Group, Expense (id, payer, amount, split, timestamp), Split (Equal, Exact, Percent), LedgerEntry (from, to, amount) or per-user balances, BalanceBook, SimplifyService, ExpenseService. Money is a value with currency.",
      "Relationships: Group has Users and Expenses. Expense has a Split strategy that produces shares that sum to total. Ledger is updated inside the same unit of work as Expense create. Balances[user] = net. Do not treat simplify as mutating history — it produces suggested settlements.",
      "Main sequence: addExpense → validate shares sum → persist expense → update balances (payer +total, each share −). getBalances reads the projection. simplify() builds a min-transfer list (greedy two-heaps is enough). settle() records a payment expense or a Settlement entity.",
      "Extension point: Split strategies, simplify algorithm, group vs pairwise, multi-currency (do not start there). Idempotency on addExpense(requestId). The invariant: sum of all balances is 0.",
    ],
    howItWorks: [
      "Money + currency check on every expense.",
      "Split.compute(total, participants) → map user→share, sum equals total.",
      "Update BalanceBook atomically with the expense.",
      "Simplify as a pure function on a snapshot of balances.",
      "Never rewrite past expenses when simplifying.",
    ],
    whenToUse: [
      "Ledger designs, strategy for splits, graph settle-up.",
    ],
    whenNotToUse: [
      "A single dinner with two people — still use the types, skip group features.",
    ],
    complexity: {
      time: "addExpense O(p) people; simplify greedy O(n log n)",
      space: "O(users + expenses)",
      notes: "Optimal cash flow is NP-hard; greedy is the interview answer.",
    },
    tradeoffs: [
      "Store all ledger edges vs store net balances — nets are enough if you keep expenses as the log.",
      "Greedy simplify vs exact min edges — greedy is expected.",
    ],
    interviewTips: [
      "Say shares must sum to total — fail fast otherwise (rounding on percent).",
      "Simplify does not change the ledger; it suggests payments.",
      "Equal split remainder cents: assign leftover to first users — mention it.",
    ],
    pitfalls: [
      "Floats for money.",
      "Balances that do not sum to zero after an expense.",
      "Deleting an expense without reversing the ledger.",
    ],
    practiceIdeas: [
      "Equal and exact splits + simplify on 4 users.",
      "Percent split that fails if percents ≠ 100.",
    ],
    related: [
      "strategy-pattern",
      "identity-vs-value-objects",
      "invariants",
      "payment-wallet",
      "idempotent-ops",
    ],
  },
  {
    slug: "coffee-machine",
    track: "lld",
    category: "Designs",
    title: "Coffee machine",
    summary:
      "Recipes consume Ingredients from an Inventory; a Payment port collects money; the machine is a small workflow (select, pay, brew). Composition, not a Beverage inheritance tree.",
    depth: "core",
    whyItMatters:
      "The classic 'inheritance vs composition' trap: Latte extends Coffee extends Beverage. Prefer Recipe + Ingredient + optional Decorator for extras (mocha shot).",
    theory: [
      "Key classes: CoffeeMachine, Recipe (name, map of Ingredient→qty, price), Inventory, Ingredient, Order, PaymentPort, Brewer (port). Optional: Addon decorator (foam, extra shot) that wraps a Recipe or an Order.",
      "Relationships: Machine has Inventory, a catalog of Recipes, PaymentPort, Brewer. Order names a recipe plus addons. Inventory is the aggregate for stock; Recipe is a value/config. Do not make Espresso a subclass of Coffee just to share water.",
      "Main sequence: select(recipe) → inventory.canFulfill(recipe+addons) → pay → inventory.consume → brewer.brew. Fail before pay if stock is short, or reserve stock then pay then consume — say which. Restock is an admin command.",
      "Extension point: new Recipe as data (config), Addon as decorator, PaymentMethod. Template Method only if brew steps are a fixed skeleton (heat, grind, press) with hooks — composition is still clearer for drinks.",
    ],
    howItWorks: [
      "Store recipes as data, not as classes per drink.",
      "Inventory.reserve/consume atomically.",
      "Addons adjust qty/price via decorator or a list of extras.",
      "PaymentPort.charge before brew (or after reserve).",
      "Add a new drink by adding a recipe map.",
    ],
    whenToUse: [
      "Composition-over-inheritance teaching, inventory + recipe.",
    ],
    whenNotToUse: [
      "A 40-class beverage hierarchy — that is the anti-pattern this design rejects.",
    ],
    tradeoffs: [
      "Decorator addons vs a simple list of extras on Order — list is enough until pricing gets fancy.",
      "Reserve-then-pay vs check-then-pay (race on last milk).",
    ],
    interviewTips: [
      "Refuse Beverage inheritance. Say the word composition.",
      "Show a recipe JSON/map for Mocha. That is the extension demo.",
      "Mention last-milk race if they add threads.",
    ],
    pitfalls: [
      "Latte extends Espresso extends Beverage.",
      "Negative inventory.",
      "Price computed from class name switches.",
    ],
    practiceIdeas: [
      "Three recipes + inventory consume + a mocha addon.",
      "Concurrent two orders on the last milk — one fails.",
    ],
    related: [
      "composition-over-inheritance",
      "decorator-pattern",
      "builder-pattern",
      "vending-machine",
      "thread-safe-cache-counter-inventory",
    ],
  },
  {
    slug: "car-rental",
    track: "lld",
    category: "Designs",
    title: "Car rental",
    summary:
      "A fleet of Vehicles, Stations, and Reservations over DateRanges with a pricing policy and pickup/return that change vehicle status. Same bones as hotel booking, plus location.",
    depth: "next",
    whyItMatters:
      "If you already did hotel, this is the 'add location and vehicle state' variant. Interviewers use it to see whether you reuse DateRange and Reservation ideas.",
    theory: [
      "Key classes: RentalCompany, Station, Vehicle (vin, type, status, stationId), Reservation, DateRange, PricingPolicy, RentalService. Vehicle status: AVAILABLE, RESERVED, ON_RENT, MAINTENANCE. Reservation status like hotel.",
      "Relationships: Company has Stations 1—* Vehicles. Reservation holds vehicleId or vehicleType + pickup/return station + range. Returning to another station is allowed if the product says so — then vehicle.stationId updates. Pricing may include one-way fees (strategy).",
      "Main sequence: search(station, type, range) → vehicles with no overlapping ON_RENT/RESERVED. book → hold vehicle. pickup → ON_RENT. return(station) → AVAILABLE at that station, close reservation, price + extras (fuel). Maintenance takes a vehicle off search.",
      "Extension point: PricingPolicy, vehicle assignment (specific vin vs type), one-way, insurance addons. Inventory lock on the last compact at a station.",
    ],
    howItWorks: [
      "Reuse DateRange.overlaps.",
      "Decide type-hold vs vin-hold.",
      "Implement search/book/pickup/return.",
      "Update station on return if one-way.",
      "Maintenance status excludes from search.",
    ],
    whenToUse: [
      "Location + date inventory, variants of hotel.",
    ],
    whenNotToUse: [
      "Uber (that is dispatch, not date-range rental).",
    ],
    tradeoffs: [
      "Type hold vs specific car (customer chose the red convertible).",
      "Company-wide aggregate vs Station as inventory root — station is usually the right boundary for search.",
    ],
    interviewTips: [
      "Say 'this is hotel booking plus station and vehicle lifecycle'.",
      "Ask about one-way returns — it changes pricing and location.",
      "Do not design GPS tracking unless asked.",
    ],
    pitfalls: [
      "Overlapping rentals on one VIN.",
      "Return that does not update station.",
      "Search that ignores MAINTENANCE.",
    ],
    practiceIdeas: [
      "Two overlapping bookings on one car fail.",
      "One-way return moves the car; search at the new station finds it.",
    ],
    related: [
      "hotel-booking",
      "identity-vs-value-objects",
      "strategy-pattern",
      "calendar-scheduler",
      "invariants",
    ],
  },
  {
    slug: "cart-checkout",
    track: "lld",
    category: "Designs",
    title: "Cart and checkout",
    summary:
      "A Cart is a working aggregate of lines; Checkout is a use case that prices, reserves inventory, charges, and creates an Order. Snapshot prices; do not pay inside the Cart.",
    depth: "core",
    whyItMatters:
      "This is the commerce core behind restaurants, BookMyShow, and coffee. Getting cart vs order vs payment ports right is more important than a coupon visitor.",
    theory: [
      "Key classes: Cart (userId, lines), CartLine (sku, qty, unitPrice snapshot), Catalog, InventoryPort, PricingEngine (discounts, tax), PaymentPort, Order, CheckoutService. Cart is mutable and disposable; Order is the immutable-ish record of a successful checkout.",
      "Relationships: CheckoutService uses CartRepo, Inventory, Pricing, Payment. Order copies lines (again snapshot). Coupons are a Pricing strategy or a list of Discount plugins. Cart should not import Stripe.",
      "Main sequence: addItem → catalog price snapshot → cart.add. checkout → reprice (or lock snapshot) → inventory.reserve(lines, key) → payment.charge → create Order → cart.clear. On payment fail, release inventory. Idempotency key on checkout.",
      "Extension point: Discount plugins, tax, shipping as strategies; payment methods. Guest vs user cart merge. Do not start with a microservice per step.",
    ],
    howItWorks: [
      "Snapshot unit price on add; decide if checkout reprices.",
      "Reserve inventory before charge.",
      "Charge with idempotency key.",
      "Create Order in the same success path; compensate on fail.",
      "Keep Cart methods about lines, not about Stripe.",
    ],
    whenToUse: [
      "Any purchase flow, as a subsystem of larger designs.",
    ],
    whenNotToUse: [
      "A vending machine — too small for a cart aggregate.",
    ],
    tradeoffs: [
      "Reprice at checkout (fair, can surprise) vs lock prices (needs TTL).",
      "Cart in session vs persisted cart.",
    ],
    interviewTips: [
      "Draw the reserve-charge-confirm sequence. That is the interview.",
      "Mention coupon as a plugin on the pricing engine, not an if in Cart.",
      "Idempotency on checkout — they will ask about double-click.",
    ],
    pitfalls: [
      "Live catalog prices on Order so yesterday's order changes.",
      "Charge then reserve — oversell plus money taken.",
      "Cart.charge() talking to HTTP.",
    ],
    practiceIdeas: [
      "Checkout with a FakePayment decline and inventory released.",
      "Two checkouts on the last SKU — one fails.",
    ],
    related: [
      "transactions-per-use-case",
      "idempotent-ops",
      "plugin-strategy-engines",
      "payment-wallet",
      "bookmyshow",
    ],
  },
  {
    slug: "cards-poker",
    track: "lld",
    category: "Designs",
    title: "Cards and poker",
    summary:
      "Card and Deck as values/entities, Hands that rank, a Table that runs betting rounds. Compare hands with a Ranker strategy; do not write a 200-line if of suits in the table.",
    depth: "next",
    whyItMatters:
      "Card games test values (Card), a shuffle port, and a ranking algorithm you can isolate. Poker adds rounds and pots — scope hard.",
    theory: [
      "Key classes: Card (rank, suit — value), Deck, Hand, Ranker (strategy), Player, Pot, Table, BettingRound, Game. Card is immutable. Deck shuffles via a Random port. Hand is five (or N) cards plus a computed Rank (pair, flush, …).",
      "Relationships: Table has Players, Deck, Pots, current Round. Ranker.evaluate(cards) → comparable Rank. Players have chips (Money) and a status (active, folded, all-in). Table does not embed rank ifs.",
      "Main sequence (holdem-lite): deal hole → betting → flop → betting → turn → river → showdown → ranker.winner → pot.payout. Fold removes from contention. All-in creates side pots if you have time — say so.",
      "Extension point: Ranker (holdem vs five-card draw), betting rules, AI player strategy. Deck can be a shoe (multiple decks) for other games. Do not finish a casino platform.",
    ],
    howItWorks: [
      "Card as a value with compare. Deck.draw/shuffle(Random).",
      "Ranker isolated and unit-tested with fixtures.",
      "Table.loop over phases; each phase calls BettingRound.",
      "Pot pays the best remaining hand.",
      "Scope side pots as an extension.",
    ],
    whenToUse: [
      "Value objects, strategies, game rounds.",
    ],
    whenNotToUse: [
      "Implementing every poker variant in one class.",
    ],
    tradeoffs: [
      "Bitmask hand eval (fast) vs readable ranker (interview).",
      "Side pots correctness vs time — mention, implement later.",
    ],
    interviewTips: [
      "Scope: 'deck, hand ranker, one betting round, showdown.'",
      "Show Ranker tests: flush beats pair.",
      "Random as a port so you can deal a known deck.",
    ],
    pitfalls: [
      "Mutable cards that change suit.",
      "Ranking inside Table.showdown as a nest of ifs you cannot test.",
      "Forgetting to burn cards if the variant requires it — ask.",
    ],
    practiceIdeas: [
      "Five-card ranker + a table that deals and picks a winner.",
      "Fake Random that deals a royal flush to player 0.",
    ],
    related: [
      "identity-vs-value-objects",
      "strategy-pattern",
      "testing-as-design",
      "chess",
      "plugin-strategy-engines",
    ],
  },
  {
    slug: "producer-consumer-queue",
    track: "lld",
    category: "Designs",
    title: "Producer–consumer queue",
    summary:
      "A bounded in-memory queue with put/take, waiting producers/consumers, and a close protocol. This is the coded form of the producer-consumer topic.",
    depth: "core",
    whyItMatters:
      "You should be able to implement this with a mutex and conditions (or a language BlockingQueue). It is the primitive under loggers, dispatchers, and pools.",
    theory: [
      "Key classes: BoundedQueue<T>, Producer, Consumer, PoisonPill or Closed state. Internals: circular buffer or ArrayDeque, count, putIdx, takeIdx, lock, notFull, notEmpty.",
      "Relationships: many producers and consumers share one queue. They do not know each other. The queue owns the buffer. Messages should be immutable.",
      "Main sequence: put: wait while full and open; insert; signal notEmpty. take: wait while empty and open; remove; signal notFull. close: set flag, signal all; take returns optional empty after drain (or throws). Policy if put after close: reject.",
      "Extension point: drop-oldest vs block vs reject; priority queue; multiple partitions (one queue per key). Timeouts on put/take. Do not make it unbounded 'for simplicity' if they asked for bounded.",
    ],
    howItWorks: [
      "Implement circular buffer + lock + two conditions.",
      "Wait in while loops, not if.",
      "Define close/drain semantics.",
      "Write a test with 4 producers, 4 consumers, N items.",
      "Keep T immutable in the contract.",
    ],
    whenToUse: [
      "Any in-process pipeline, as a building block in larger designs.",
    ],
    whenNotToUse: [
      "A single-threaded app — a list is enough.",
    ],
    complexity: {
      time: "O(1) put/take",
      space: "O(capacity)",
      notes: "Correct waiting is the hard part, not the array.",
    },
    tradeoffs: [
      "Block vs reject when full — product choice.",
      "Fair locks vs throughput.",
    ],
    interviewTips: [
      "If the language has BlockingQueue, say you would use it, then implement wait/notify if they want guts.",
      "Say while (full) await — the classic trap.",
      "Close protocol is a common follow-up.",
    ],
    pitfalls: [
      "if (full) wait — lost wakeup.",
      "Forgetting to signal the other condition.",
      "Publishing the internal array.",
    ],
    practiceIdeas: [
      "Hand-rolled bounded queue with a close() that lets consumers drain.",
      "Compare reject vs block policies under a flood.",
    ],
    related: [
      "producer-consumer",
      "bounded-buffer",
      "race-deadlock-livelock",
      "thread-pool",
      "notification-dispatcher",
    ],
  },
  {
    slug: "rate-limiter",
    track: "lld",
    category: "Designs",
    title: "Rate limiter",
    summary:
      "Allow N events per window (or a steady rate) per key. Token bucket and sliding window are the two LLD workhorses; Clock is a port.",
    depth: "core",
    whyItMatters:
      "Rate limiting is a small concurrent design with a real algorithm. It shows up alone and as a decorator on APIs and notification senders.",
    theory: [
      "Key classes: RateLimiter, LimiterPolicy (TokenBucket, SlidingWindow, FixedWindow), Bucket (tokens, lastRefill), Clock, RateLimiterRegistry (key → bucket). allow(key) → boolean or Result with retry-after.",
      "Relationships: A facade RateLimiter uses a policy and a map of buckets. Token bucket: refill (now-last)*rate, cap at burst, decrement if ≥1. Sliding window: timestamps deque, drop older than window, allow if size < N. Fixed window is simpler and bursty at edges.",
      "Main sequence: allow(key) → lock that bucket (or use atomics) → refill/trim → accept/deny → unlock. For HTTP, a decorator/proxy calls allow before the handler. Keys are user id, IP, or api-key.",
      "Extension point: policy strategy, per-route limits, distributed (Redis) as an adapter behind the same interface. Thread safety per key. Do not start with a global lock for all keys if you can stripe.",
    ],
    howItWorks: [
      "Inject Clock.",
      "Implement token bucket for one key, then a map.",
      "Document burst vs average rate.",
      "Return retry-after on deny.",
      "Add a second policy if asked — Strategy.",
    ],
    whenToUse: [
      "APIs, login attempts, notification send, scraping clients.",
    ],
    whenNotToUse: [
      "A single-user CLI tool.",
    ],
    complexity: {
      time: "O(1) token bucket; O(k) sliding window trim",
      space: "O(keys) plus O(N) timestamps per key for sliding window",
      notes: "Distributed limiters need a shared store — mention as adapter.",
    },
    tradeoffs: [
      "Fixed window: cheap, edge bursts. Sliding: smoother, more memory. Token bucket: burst + average, the usual choice.",
    ],
    interviewTips: [
      "Ask: per user or global? burst allowed? They expect token bucket after that.",
      "Clock port — test by advancing time.",
      "Say you would put this as a decorator on the service.",
    ],
    pitfalls: [
      "Date.now() scattered, untestable.",
      "One lock for all keys.",
      "Fixed window without mentioning the burst-at-boundary issue.",
    ],
    practiceIdeas: [
      "Token bucket 5/s burst 10 with a FakeClock.",
      "Wrap a PaymentPort with a RateLimitDecorator.",
    ],
    related: [
      "strategy-pattern",
      "decorator-pattern",
      "thread-safe-cache-counter-inventory",
      "proxy-pattern",
      "notification-dispatcher",
    ],
  },
  {
    slug: "lru-cache",
    track: "lld",
    category: "Designs",
    title: "LRU and LFU cache",
    summary:
      "A map plus a recency (LRU) or frequency (LFU) structure so get/put are O(1) and eviction is defined. Thread safety is a lock or a concurrent variant around the structure.",
    depth: "core",
    whyItMatters:
      "LRU is the data-structure LLD everyone must finish. LFU is the usual variant. If you cannot draw HashMap + doubly linked list, you are not done.",
    theory: [
      "Key classes: LruCache<K,V>, Node (key, value, prev, next), HashMap<K,Node>, optional RwLock. For LFU: Node also has freq; Map<freq, LinkedHashSet<key>> or a freq list; minFreq pointer. Capacity is fixed.",
      "Relationships: Cache owns map + list. Head/tail sentinels simplify unlink. Values should be treated as immutable or copied; the cache does not own caller mutation. Eviction listener is an optional Observer.",
      "Main sequence LRU get: map lookup; if hit, move node to head; return. put: if exists, update + move; if new and full, evict tail, then insert at head. LFU get: increment freq, move key to next freq list; evict a key from minFreq when full.",
      "Extension point: LFU vs LRU as a strategy (hard to share structure — two classes is OK), TTL (expire on get), thread safety (mutex, or ConcurrentHashMap + lock on structural change), write-through vs cache-aside (policy outside). Do not claim O(1) LFU if you used a scan.",
    ],
    howItWorks: [
      "Sentinel head/tail + map.",
      "Implement unlink and insertHead.",
      "get/put in O(1).",
      "If they ask LFU, add freq structures; keep capacity eviction correct.",
      "If they ask threads, lock get/put or document a concurrent sketch.",
    ],
    whenToUse: [
      "Hot-key memory caches, interview DS+LLD hybrids.",
    ],
    whenNotToUse: [
      "A 10-item config — a map is enough.",
    ],
    complexity: {
      time: "O(1) get/put for LRU and for LFU with freq maps",
      space: "O(capacity)",
      notes: "Thread-safe LRU typically serializes writes; reads may use RW if you are careful.",
    },
    tradeoffs: [
      "LRU: simple, bad on scans. LFU: better for long-tail, more code, can stick on old hot keys (use LFU+aging).",
      "Mutex simplicity vs concurrent sophistication.",
    ],
    interviewTips: [
      "Draw the list and the map first. Then code.",
      "They will ask LFU or thread safety — treat those as add-a-variant.",
      "Do not use LinkedHashMap accessOrder unless they allow library use — then say you know the guts.",
    ],
    pitfalls: [
      "Forgetting to update the map on evict.",
      "O(n) remove from a list.",
      "get() not updating recency.",
    ],
    practiceIdeas: [
      "LRU from scratch with tests for evict order.",
      "LFU variant; then a thread-safe LRU with a mutex.",
    ],
    related: [
      "hashmap-internals",
      "thread-safe-cache-counter-inventory",
      "rw-lock",
      "flyweight-pattern",
      "add-a-variant",
    ],
  },
  {
    slug: "thread-safe-logger",
    track: "lld",
    category: "Designs",
    title: "Thread-safe logger",
    summary:
      "A Logger facade enqueues immutable LogEvents; a single writer (or a small pool) writes to Appenders. Do not lock the whole app on System.out.",
    depth: "core",
    whyItMatters:
      "The naive synchronized log() serializes callers. The better LLD is async producer-consumer with a bound, a level filter, and pluggable appenders.",
    theory: [
      "Key classes: Logger (facade), LogEvent (immutable: level, time, message, thread), Level, Appender (Console, File), Filter, AsyncLogger (queue + writer thread), Clock. LoggerPort if the domain logs through a port.",
      "Relationships: Logger has Filter + Appender list or a queue to a dispatcher. Appenders are strategies. Async wrapper is a decorator/proxy. Singleton is common and smelly — inject the logger.",
      "Main sequence: log(level, msg) → if level disabled return → build event → offer to queue (block/drop/caller-runs) → writer take → each appender.append(event). Shutdown flushes. MDC/context is optional (copy onto the event at log time).",
      "Extension point: Appenders, async vs sync decorator, sampling filter, JSON formatter. Bound the queue. Never format strings if the level is off (guarded logging).",
    ],
    howItWorks: [
      "LogEvent immutable.",
      "Sync logger for tests; async for prod.",
      "Bounded queue + one writer.",
      "Multiple appenders as a list (observer-like).",
      "Inject Clock and a writer; avoid static if you can.",
    ],
    whenToUse: [
      "Any app; as a standalone concurrency design.",
    ],
    whenNotToUse: [
      "println in a 20-line kata — do not overbuild.",
    ],
    tradeoffs: [
      "Async: fast callers, risk of lost logs on crash (flush policy).",
      "Sync: simple, stalls the app.",
    ],
    interviewTips: [
      "This is producer-consumer. Name the bound and drop policy.",
      "If they want singleton, implement it then inject appenders.",
      "Level check before string concat.",
    ],
    pitfalls: [
      "synchronized on every log to a file from 200 threads.",
      "Mutable event reused across threads.",
      "Unbounded queue of log lines.",
    ],
    practiceIdeas: [
      "Async logger with a FileAppender and a drop-on-full policy.",
      "Add a MetricsAppender without editing Logger.",
    ],
    related: [
      "logger",
      "producer-consumer",
      "singleton-pattern",
      "observer-pattern",
      "decorator-pattern",
    ],
  },
  {
    slug: "bounded-buffer",
    track: "lld",
    category: "Designs",
    title: "Bounded buffer",
    summary:
      "The classic monitor: a fixed-size buffer with wait/notify (or conditions) so producers block when full and consumers block when empty. Same machine as a blocking queue, taught as the lock protocol.",
    depth: "core",
    whyItMatters:
      "If they say 'implement a bounded buffer', they want the monitor pattern: mutex, two conditions, while-loops. It is the exam version of producer-consumer-queue.",
    theory: [
      "Key classes: BoundedBuffer<T> with put/take, internal array, count, mutex, notFull, notEmpty. Optional: timeouts, close(). Producers and consumers are just threads calling the API — you may not need those classes.",
      "Relationships: Buffer owns all shared state. Callers own the items. No caller should hold a pointer into the array.",
      "Main sequence: put waits on notFull while count==capacity, then insert, count++, signal notEmpty. take waits on notEmpty while count==0, then remove, count--, signal notFull. Spurious wakeups require while, not if.",
      "Extension point: multiple slots as a ring; tryPut with timeout; fairness; poison pill shutdown. This is not a ring-buffer lock-free design unless they ask — say the difference.",
    ],
    howItWorks: [
      "Array + count + two conditions.",
      "while (predicate) wait.",
      "Signal the opposite condition after mutate.",
      "Document whether put/take are fair.",
      "Test with many threads and capacity 1 (tightest race).",
    ],
    whenToUse: [
      "Teaching monitors, implementing a queue without using the library.",
    ],
    whenNotToUse: [
      "Production Java — use ArrayBlockingQueue unless the point is the exercise.",
    ],
    complexity: {
      time: "O(1) put/take",
      space: "O(capacity)",
      notes: "Correctness of waiting beats micro-optimizing the ring.",
    },
    tradeoffs: [
      "notify vs notifyAll — with two conditions, notify is enough if one waiter kind per condition; notifyAll is safer if mixed.",
      "Lock-free ring vs monitor — lock-free is advanced and easy to get wrong.",
    ],
    interviewTips: [
      "Write the while loops first. Then the array math.",
      "Capacity 1 test is the best demo.",
      "If they say lock-free, discuss CAS and the extra difficulty; offer the monitor first.",
    ],
    pitfalls: [
      "if (full) wait.",
      "One condition for both full and empty.",
      "Lost signals because you notify before releasing in a language that needs care — generally signal before unlock is fine.",
    ],
    practiceIdeas: [
      "Implement put/take and a close() that unblocks waiters.",
      "Compare one vs two conditions under load.",
    ],
    related: [
      "producer-consumer-queue",
      "producer-consumer",
      "race-deadlock-livelock",
      "thread-pool",
      "immutable-sharing",
    ],
  },
  {
    slug: "job-scheduler",
    track: "lld",
    category: "Designs",
    title: "Job scheduler",
    summary:
      "A Scheduler holds Jobs with trigger times (or cron), a clock, and a worker pool. Due jobs are dispatched once; retries and idempotency are first-class.",
    depth: "next",
    whyItMatters:
      "Schedulers combine a time-ordered index, concurrency, and failure policy. They appear as 'run this at T' and as the engine behind notifications and expiry jobs.",
    theory: [
      "Key classes: Scheduler, Job (id, runAt, payload, status), Trigger (once, cron, interval), JobStore, WorkerPool, Clock, JobHandler (strategy by type). Status: PENDING, RUNNING, DONE, FAILED, CANCELLED.",
      "Relationships: Scheduler has a min-heap or delay queue of next-run times plus a map by id. Handlers are a registry (plugin). Store is a port (memory or DB). Workers execute; the scheduler thread only waits until the next due job.",
      "Main sequence: schedule(job) → store + heap. loop: sleep until heap.min or new insert; pop due jobs; submit to pool; handler.handle(job). On success mark DONE; on fail retry with backoff or FAILED. cancel(id) removes from heap if PENDING.",
      "Extension point: cron trigger parser, retry policy, persist across restart (reload heap from store), exactly-once via idempotency keys on handlers. Do not build Kubernetes.",
    ],
    howItWorks: [
      "Delay queue + map by id.",
      "One dispatcher thread, N workers.",
      "Inject Clock for tests (advance and wake).",
      "Handler registry by job type.",
      "Retry with backoff as a policy object.",
    ],
    whenToUse: [
      "Expiry of holds, digest emails, cron-like in-process work.",
    ],
    whenNotToUse: [
      "A single Timer for one task — java.util.Timer / setTimeout is enough.",
    ],
    complexity: {
      time: "O(log n) schedule/cancel with a heap",
      space: "O(n) jobs",
      notes: "Polling every second is simpler and worse; sleeping until next due is the design.",
    },
    tradeoffs: [
      "In-process (lost on crash) vs persisted jobs.",
      "At-least-once dispatch (retry) vs at-most-once (can skip).",
    ],
    interviewTips: [
      "Clock + delay queue is the picture.",
      "Ask if jobs must survive restart — that adds a store port.",
      "Handlers as Strategy so adding 'send report' is a class, not a switch.",
    ],
    pitfalls: [
      "Busy loop polling.",
      "Running handlers on the scheduler thread (one slow job delays all).",
      "No idempotency when retries exist.",
    ],
    practiceIdeas: [
      "In-memory scheduler with FakeClock that fires two jobs in order.",
      "Failing handler retries three times then FAILED.",
    ],
    related: [
      "thread-pool",
      "future-promise",
      "strategy-pattern",
      "plugin-system",
      "notification-dispatcher",
    ],
  },
  {
    slug: "connection-pool",
    track: "lld",
    category: "Designs",
    title: "Connection pool",
    summary:
      "Own a bounded set of reusable connections: acquire blocks or fails when exhausted; release returns a healthy connection; the pool is the only closer.",
    depth: "next",
    whyItMatters:
      "Pools are ownership + bounded buffer + health checks. The same design covers DB connections, HTTP clients, and game sockets.",
    theory: [
      "Key classes: ConnectionPool, PooledConnection (proxy), ConnectionFactory, HealthCheck, PoolConfig (min, max, idle TTL, acquire timeout). States of a connection: IDLE, IN_USE, INVALID.",
      "Relationships: Pool owns all real connections. Clients receive a Proxy that delegates and on close() returns to the pool instead of closing the socket. Factory creates new ones up to max. Do not let clients keep the raw connection.",
      "Main sequence: acquire → if idle available, validate, hand out; else if size < max, create; else wait until timeout. use. release → if healthy, idle queue; else destroy and maybe create a replacement to keep min. shutdown closes all.",
      "Extension point: validation query, LIFO vs FIFO idle, fairness, leak detection (track checkout time). Thread safety is the pool's lock or a concurrent queue of idles plus an atomic size.",
    ],
    howItWorks: [
      "Config: min/max/timeout.",
      "Idle queue + in-use set (for leak detection).",
      "Proxy close → release.",
      "Validate before lend; destroy on fail.",
      "shutdown() is idempotent and waits or interrupts borrowers — say which.",
    ],
    whenToUse: [
      "Any scarce IO resource: DB, SMTP, SSH, game servers.",
    ],
    whenNotToUse: [
      "Cheap in-memory objects — object pools are often a premature optimization (and a Flyweight/pool confusion).",
    ],
    complexity: {
      time: "O(1) acquire/release amortized if the idle structure is",
      space: "O(max) connections",
      notes: "Creation cost dominates; min idle amortizes it.",
    },
    tradeoffs: [
      "Large max: more DB load. Small max: acquire waits.",
      "Validation on every acquire vs occasional — safety vs latency.",
    ],
    interviewTips: [
      "Ownership sentence: only the pool closes real sockets.",
      "Proxy pattern for PooledConnection.",
      "Timeout on acquire is a required part of the API.",
    ],
    pitfalls: [
      "Double release corrupting the idle queue.",
      "Clients calling close on the raw connection.",
      "Unbounded create (no max).",
    ],
    practiceIdeas: [
      "Pool of FakeConnections with max=2 and a third acquire that times out.",
      "Kill a connection under the client and ensure it is not re-queued.",
    ],
    related: [
      "proxy-pattern",
      "ownership",
      "thread-pool",
      "factory-method",
      "bounded-buffer",
    ],
  },
  {
    slug: "in-process-pubsub",
    track: "lld",
    category: "Designs",
    title: "In-process pub/sub",
    summary:
      "Publishers send typed events to a Broker; subscribers receive them synchronously or via per-subscriber queues. The broker does not own business rules.",
    depth: "next",
    whyItMatters:
      "This is Observer with topics, and the kernel of an event bus. You need delivery policy (sync/async), unsubscribe, and isolation of a throwing subscriber.",
    theory: [
      "Key classes: Broker, Topic (or event type), Subscription, Subscriber, Event (immutable), Dispatcher (sync or pool). Optional: Filter.",
      "Relationships: Broker holds topic → list of subscriptions. Publishers use Broker only. Subscribers do not know publishers. Async mode: each subscriber has a queue (or share a pool) so a slow one does not stall others — if you want that isolation.",
      "Main sequence: subscribe(topic, handler) → token. publish(topic, event) → snapshot the list → each handler (sync) or enqueue. unsubscribe(token). close() clears and wakes queues.",
      "Extension point: async dispatcher, wildcard topics, request/reply via correlation id, persist (then you left LLD). Do not let the broker import domain services — handlers live outside.",
    ],
    howItWorks: [
      "Immutable events.",
      "Copy the subscriber list before notify.",
      "Catch per-handler errors so one does not kill the rest.",
      "Return a subscription token.",
      "Choose sync (simple) vs async (pool) and say the loss/latency story.",
    ],
    whenToUse: [
      "Decoupling modules in one process: order placed → email, analytics.",
    ],
    whenNotToUse: [
      "Two objects — a method call is enough.",
      "Cross-process reliability (use a real queue).",
    ],
    tradeoffs: [
      "Sync: simple, coupled latency. Async: isolation, harder failures and ordering.",
      "Type-per-topic vs string topics — types are safer.",
    ],
    interviewTips: [
      "This is Observer + optional queue. Do not oversell Kafka.",
      "Mention snapshot-the-list and per-handler try/catch.",
      "If they want 'at least once', you need a store — say so.",
    ],
    pitfalls: [
      "Mutating the subscriber list while iterating.",
      "A handler that publishes and deadlocks the same broker lock.",
      "Stringly-typed payloads (Map) with no schema.",
    ],
    practiceIdeas: [
      "Broker with two subscribers; one throws; the other still runs.",
      "Async mode with a slow subscriber and a bounded per-sub queue.",
    ],
    related: [
      "observer-pattern",
      "event-bus",
      "mediator-pattern",
      "producer-consumer",
      "notification-dispatcher",
    ],
  },
  {
    slug: "bookmyshow",
    track: "lld",
    category: "Designs",
    title: "BookMyShow",
    summary:
      "Movies, Shows, Screens, and a SeatMap per show. Booking holds seats with a TTL, then checkout pays and confirms. The last-seat race is the design.",
    depth: "advanced",
    whyItMatters:
      "This is parking-lot plus cart-checkout plus a time-boxed hold. Interviewers push on seat locking, sold-out shows, and pricing per seat type.",
    theory: [
      "Key classes: City, Venue, Screen, Movie, Show (screen, movie, start, SeatMap), Seat (id, type), SeatStatus (FREE, HELD, SOLD), Hold (id, showId, seats, expiresAt, userId), Booking, PricingPolicy, BookingService, Clock, PaymentPort.",
      "Relationships: Show owns SeatMap (aggregate for that show). Hold and Booking reference seat ids. Search is a read model (city → shows). Do not lock seats across different shows in one aggregate.",
      "Main sequence: search → pick show → hold(seats, user) atomic if all FREE → start TTL. checkout(holdId) → if hold valid and owned → pay → mark SOLD → Booking. Job expires holds → FREE. Two users on the same seat: one hold wins.",
      "Extension point: Pricing by seat type/day, dynamic pricing strategy, group holds, cancellations with refund policy. Pagination on search. Idempotent checkout. Do not design the whole CDN for trailers.",
    ],
    howItWorks: [
      "Show as aggregate; occupy/hold/sell only through it.",
      "Hold with Clock + scheduler expiry.",
      "Reserve-all-or-none for a multi-seat request.",
      "Checkout uses payment + idempotency.",
      "Search is separate from the seat aggregate.",
    ],
    whenToUse: [
      "Seat/ticket inventory, the flagship 'booking' LLD.",
    ],
    whenNotToUse: [
      "A single theater with one bench — still use Hold if they mention timeout.",
    ],
    tradeoffs: [
      "Hold TTL too long: inventory stuck. Too short: angry users.",
      "One lock per show vs per seat — per show is easier; per seat scales.",
    ],
    interviewTips: [
      "Hold-then-pay is the sequence they want. Draw it.",
      "Last two seats, two users each want both — all-or-none.",
      "Mention a Clock and an expiry job.",
    ],
    pitfalls: [
      "Marking SOLD before pay.",
      "Holds that never expire.",
      "A global lock on all cinemas.",
    ],
    practiceIdeas: [
      "Two threads hold the same seat — one Result.err.",
      "Expire a hold with FakeClock; seat is FREE again.",
    ],
    related: [
      "cart-checkout",
      "parking-lot",
      "thread-safe-cache-counter-inventory",
      "job-scheduler",
      "idempotent-ops",
    ],
  },
  {
    slug: "mini-uber",
    track: "lld",
    category: "Designs",
    title: "Mini Uber",
    summary:
      "Riders request trips; a Matcher assigns a nearby Driver; Trip is the state machine; Pricing is a strategy. Location is a simplified grid, not Google Maps.",
    depth: "advanced",
    whyItMatters:
      "Uber-in-an-interview is matching + trip lifecycle + pricing, not a geo HLD. Keep a Location index and a Trip aggregate; leave ETAs as a port.",
    theory: [
      "Key classes: Rider, Driver (status: OFFLINE, IDLE, ENROUTE, IN_TRIP), Location, LocationIndex (grid/hash), Trip (state machine), Matcher (strategy), PricingPolicy, TripService, NotificationPort.",
      "Relationships: Trip references riderId, driverId, pickup, drop. Matcher uses LocationIndex of IDLE drivers. TripService is the facade. Drivers update location; the index is a write-through structure (not the source of truth for trip state).",
      "Main sequence: requestRide → create Trip REQUESTED → matcher.find(k) → offer to driver(s) → ACCEPT → ENROUTE → start → IN_PROGRESS → end → price → pay. Cancel from REQUESTED/ENROUTE with a policy. If no driver, expire the request.",
      "Extension point: Matcher (nearest, rated, pool), surge Pricing, multi-offer vs first-accept, ride types (pool, XL) as strategies. Geo is a grid of buckets. Do not design Kafka or maps tiles.",
    ],
    howItWorks: [
      "Trip states first.",
      "LocationIndex: cell → set of idle driver ids.",
      "Matcher.nearest on nearby cells.",
      "TripService sequences offers and timeouts (Clock + scheduler).",
      "Pricing at end from distance/time ports.",
    ],
    whenToUse: [
      "Matching markets: Uber, food delivery (same skeleton).",
    ],
    whenNotToUse: [
      "Car rental (dates, not live matching).",
    ],
    tradeoffs: [
      "Offer one driver vs broadcast — broadcast is racy (two accepts); use compare-and-set on Trip.",
      "Accurate geo vs grid — grid is the LLD.",
    ],
    interviewTips: [
      "Say you are doing LLD: in-memory index, trip state, matcher interface.",
      "Double-accept: only the first CAS from REQUESTED→ASSIGNED wins.",
      "Surge is a PricingStrategy, not a rewrite.",
    ],
    pitfalls: [
      "Trip and matching logic in Driver.",
      "No driver status — a busy driver gets new trips.",
      "HLD detour into GPS satellites.",
    ],
    practiceIdeas: [
      "Grid index + two drivers; nearest wins.",
      "Two drivers accept the same trip — one fails CAS.",
    ],
    related: [
      "state-pattern",
      "strategy-pattern",
      "bookmyshow",
      "notification-dispatcher",
      "add-a-variant",
    ],
  },
  {
    slug: "notification-dispatcher",
    track: "lld",
    category: "Designs",
    title: "Notification dispatcher",
    summary:
      "A Dispatcher takes a Notification and fans it to Channels (email, SMS, push) via a queue and retries. Templates and user preferences are strategies, not if-else in the core.",
    depth: "next",
    whyItMatters:
      "This is Observer + Strategy + producer-consumer in one useful service. Almost every larger design grows a notifier — design it once as a port plus this engine.",
    theory: [
      "Key classes: Notification (id, userId, type, payload), Channel (interface send), TemplateRenderer, PreferenceService, Dispatcher, Outbox/Queue, RetryPolicy, RateLimiter (optional). Channels: Email, Sms, Push.",
      "Relationships: App services publish to Dispatcher (or an Event). Dispatcher checks preferences, renders, enqueues per channel. Workers call Channel adapters. Idempotency on notification id + channel.",
      "Main sequence: dispatch(n) → prefs.channelsFor(user, type) → render → enqueue. Worker: send; on fail retry/backoff; on success store delivered. User opt-out is a filter before enqueue.",
      "Extension point: new Channel class, template engine, digest (batch strategy), rate limit per user. Do not put SMTP in OrderService.",
    ],
    howItWorks: [
      "Channel interface + adapters.",
      "Preferences filter.",
      "Bounded queue + workers.",
      "Idempotency key user+notif+channel.",
      "Retry policy object.",
    ],
    whenToUse: [
      "Any product that emails/SMS/pushes; as a shared subsystem.",
    ],
    whenNotToUse: [
      "A single System.out in a kata — a NullNotifier or one Channel is enough.",
    ],
    tradeoffs: [
      "Sync send in the request (simple, slow, couples failures) vs async (needs reliability story).",
      "Per-channel queues vs one queue.",
    ],
    interviewTips: [
      "OrderService.tell(dispatcher). That is SoC.",
      "Add Push by adding a class.",
      "Mention idempotency if the queue is at-least-once.",
    ],
    pitfalls: [
      "SMTP exceptions crashing checkout.",
      "No opt-out check.",
      "Unbounded retry loops.",
    ],
    practiceIdeas: [
      "Email + Sms channels, user disables SMS, only email sends.",
      "Fake failing channel retries then dead-letters.",
    ],
    related: [
      "observer-pattern",
      "strategy-pattern",
      "producer-consumer",
      "rate-limiter",
      "event-bus",
    ],
  },
  {
    slug: "payment-wallet",
    track: "lld",
    category: "Designs",
    title: "Payment and wallet",
    summary:
      "A Wallet aggregate holds a balance and a ledger; debit/credit are atomic and idempotent. External charges go through a PaymentPort with authorize/capture or a single charge plus reverse.",
    depth: "next",
    whyItMatters:
      "Money designs fail on races, retries, and missing ledgers. If you can keep sum(ledger)==balance and survive a double submit, you can do ATM, checkout, and Splitwise settlements.",
    theory: [
      "Key classes: Wallet (userId, balance, version), LedgerEntry, Money, WalletService, PaymentPort (external), PaymentIntent (id, status), IdempotencyStore. Intent status: CREATED, AUTHORIZED, CAPTURED, FAILED, REVERSED.",
      "Relationships: Wallet is the aggregate; entries are internal. Service uses a lock or actor per wallet. PaymentPort is for cards; wallet debit is in-process money. Do not mix them in one method without a use-case name (top-up: charge card then credit wallet).",
      "Main sequence debit: if key seen, return old result; if balance < amount fail; else append ledger + decrease balance. Transfer: lock wallets by sorted id, debit A, credit B, one unit of work. Top-up: PaymentPort.charge then credit; compensate if credit fails (rare) or credit first with hold — pick one.",
      "Extension point: currency (single first), holds/authorizations, bonus ledgers, daily limits as a policy. Version for optimistic concurrency if you do not lock.",
    ],
    howItWorks: [
      "Money value, no floats.",
      "Invariant balance == sum(entries) (or last snapshot + deltas).",
      "Idempotency on every mutating command.",
      "Ordered locks on transfer.",
      "PaymentPort for external; never call it while holding many locks for long.",
    ],
    whenToUse: [
      "Wallets, gift cards, in-app balances, as a port for checkout.",
    ],
    whenNotToUse: [
      "A single 'amount' field on User with += from everywhere.",
    ],
    tradeoffs: [
      "Pessimistic lock vs optimistic version — both fine if you handle conflict.",
      "Ledger-first (source of truth is entries) vs balance-first — ledger-first audits better.",
    ],
    interviewTips: [
      "Idempotency key + last-cent race are the two tests to name.",
      "Transfer lock order — they are listening for deadlock.",
      "External pay is a port; wallet is an aggregate.",
    ],
    pitfalls: [
      "Double credit on retry.",
      "Negative balance.",
      "Floats and string currency codes that do not match.",
    ],
    practiceIdeas: [
      "100 threads debit 1 from a balance of 10 — end at 0, 10 successes.",
      "Transfer A↔B in opposite directions without deadlock.",
    ],
    related: [
      "idempotent-ops",
      "race-deadlock-livelock",
      "atm",
      "cart-checkout",
      "invariants",
    ],
  },
  {
    slug: "url-shortener",
    track: "lld",
    category: "Designs",
    title: "URL shortener (classes)",
    summary:
      "A ShortUrl entity maps a generated code to a long URL with expiry and optional custom alias. The interesting LLD is unique-code generation and a repository, not the CDN.",
    depth: "core",
    whyItMatters:
      "As HLD this is hash + cache. As LLD it is: CodeGenerator, uniqueness retry, validation of URLs, and a click counter that is optionally async. Keep it a class design.",
    theory: [
      "Key classes: ShortUrl (code, longUrl, ownerId, expiresAt, createdAt), CodeGenerator (strategy: random base62, counter+hash, hash+collision retry), UrlValidator, ShortUrlRepository, ShortenerService, Clock. Optional: ClickEvent publisher.",
      "Relationships: Service uses generator + repo + validator. Code is the identity. Custom alias is a create path that fails on conflict. Repository.ensureUnique on insert.",
      "Main sequence: shorten(url, alias?) → validate → generate or use alias → save; on unique violation regenerate (bounded retries) or conflict. resolve(code) → load → if expired 410 → optionally record click → return long URL.",
      "Extension point: CodeGenerator strategy, expiry policy, per-user quota, analytics via Observer. In-memory map is the demo repo. Do not design Dynamo+Kafka unless they switch to HLD.",
    ],
    howItWorks: [
      "base62 encode of a random or monotonic id.",
      "Retry on collision; bound the loop.",
      "Validate scheme/host; reject javascript: URLs.",
      "Expiry via Clock.",
      "Click increment: atomic on the entity or async event.",
    ],
    whenToUse: [
      "Identity generation, uniqueness, a tiny domain.",
    ],
    whenNotToUse: [
      "Spending the hour on cache tiers — that is HLD.",
    ],
    complexity: {
      time: "O(1) create/resolve with a hash repo; collision retries rare at 62^7+",
      space: "O(n) urls",
      notes: "Counter-based codes avoid collision at the cost of predictability — say it.",
    },
    tradeoffs: [
      "Random codes (unpredictable, collisions) vs sequential (simple, enumerable — maybe bad).",
      "Sync click count vs async (faster resolve, eventual stats).",
    ],
    interviewTips: [
      "Ask code length and custom alias. Then draw Service + Generator + Repo.",
      "Collision handling is the follow-up — have a retry.",
      "Keep HLD in a 'if this were distributed' footnote.",
    ],
    pitfalls: [
      "Using the long URL's hash only — collisions and non-randomness.",
      "No validation.",
      "Infinite regenerate loop.",
    ],
    practiceIdeas: [
      "In-memory shortener with custom alias conflict.",
      "Expire with FakeClock; resolve fails.",
    ],
    related: [
      "strategy-pattern",
      "repository-dao",
      "hashmap-internals",
      "fail-fast",
      "idempotent-ops",
    ],
  },
  {
    slug: "autocomplete",
    track: "lld",
    category: "Designs",
    title: "In-memory autocomplete",
    summary:
      "A Trie (or prefix map) of terms with frequencies; suggest(prefix, k) returns top-k. Updates increment counts; the trie is the index, not a list scan.",
    depth: "next",
    whyItMatters:
      "Autocomplete is the 'design a DS + API' LLD. The class design is TrieNode, Dictionary, Ranker. Pagination/k and thread safety are variants.",
    theory: [
      "Key classes: TrieNode (children, isWord, freq or top-k cache), AutocompleteService, Suggestion (term, score), optional Ranker. For small N, a list + prefix filter is honest YAGNI — say when you upgrade to a trie.",
      "Relationships: Service owns the trie. Terms are inserted with a weight. Node may cache top-k of the subtree to make suggest O(prefix + k) instead of gathering all completions.",
      "Main sequence: add(term, weight) → walk/create nodes → mark word, update freq, refresh caches up the path. suggest(prefix, k) → walk prefix → collect heap of words or read cached top-k. Case-folding and Unicode are policy.",
      "Extension point: cached top-k vs scan, weighted vs recency, persistence, concurrent add (lock per node or a writer thread). Do not start with a distributed search cluster.",
    ],
    howItWorks: [
      "TrieNode map char → child.",
      "add updates freq.",
      "suggest uses a heap if no cache.",
      "Optional: store top-k on each node, update on add.",
      "Clamp k and max prefix length.",
    ],
    whenToUse: [
      "Typeahead, command palettes, in-memory dictionaries.",
    ],
    whenNotToUse: [
      "Three hardcoded commands — a list is enough.",
    ],
    complexity: {
      time: "add O(L); suggest O(L + N_subtree log k) or O(L+k) with cache",
      space: "O(total characters) plus cache",
      notes: "L is term length. Mention cache invalidation on add.",
    },
    tradeoffs: [
      "Simple gather-all vs node caches (faster reads, slower writes).",
      "Trie vs sorted array + binary search for static dictionaries.",
    ],
    interviewTips: [
      "Start with a trie picture. Offer list-scan if N is tiny (YAGNI), then upgrade.",
      "Top-k heap is the expected suggest.",
      "If they add 'hot updates', talk about cache on nodes.",
    ],
    pitfalls: [
      "Scanning the whole dictionary every keystroke without saying N is small.",
      "No bound on k.",
      "Mutable Suggestion objects shared from cache.",
    ],
    practiceIdeas: [
      "Insert a small corpus; suggest('ca', 3).",
      "Add node-level top-k cache and compare.",
    ],
    related: [
      "pagination-in-service-apis",
      "lru-cache",
      "hashmap-internals",
      "kiss",
      "strategy-pattern",
    ],
  },
  {
    slug: "in-memory-file-system",
    track: "lld",
    category: "Designs",
    title: "In-memory file system",
    summary:
      "A Composite tree of Nodes: File (bytes/string) and Directory (children map). Paths resolve from a root; operations fail fast on missing parents or type mismatches.",
    depth: "next",
    whyItMatters:
      "This is Composite + path parsing + permissions as an optional layer. It is a complete, finishable design with a clear extension (chmod, links).",
    theory: [
      "Key classes: Node (name, parent, createdAt), File (content), Directory (map name→Node), Path (value: segments), FileSystem (root, cwd optional), FileSystemService. Optional: Permission, Symlink.",
      "Relationships: Directory is a Composite; File is a Leaf. FileSystem is the facade and the only public mutator. Nodes do not expose the live children map. Path is a value that rejects empty segments and '.' / '..' rules you define.",
      "Main sequence: mkdir(path) → resolve parent → create dir. write(path, bytes) → create file or overwrite. read, ls, rm (recursive flag), mv. resolve() is the shared helper: walk segments, fail if a file is in the middle of a path.",
      "Extension point: permissions (protection proxy or checks on Node), symlink, watchers (Observer), size() as Composite op or Visitor. Do not implement inodes and journaling unless they push advanced.",
    ],
    howItWorks: [
      "Path.split and resolve from root.",
      "Directory.children private; methods add/get/remove.",
      "ls returns names or snapshots.",
      "rm recursive walks Composite.",
      "Reject creating a file where a dir exists.",
    ],
    whenToUse: [
      "Composite practice, path APIs, editor backends.",
    ],
    whenNotToUse: [
      "Wrapping the real OS — that is an adapter, not this design.",
    ],
    complexity: {
      time: "resolve O(segments); ls O(children); tree size O(n)",
      space: "O(n) nodes + content",
      notes: "Map per directory gives O(1) name lookup.",
    },
    tradeoffs: [
      "Content as string vs byte[] vs list of blocks (the last is HashMap-internals-ish).",
      "cwd vs always-absolute paths — absolute is simpler.",
    ],
    interviewTips: [
      "Draw Component/File/Directory. resolve() is the main sequence.",
      "Visitor for 'find all files matching *.md' if they add search.",
      "Permissions as a later proxy.",
    ],
    pitfalls: [
      "String paths concatenated without normalization — escaping the tree with '..' if you support it poorly.",
      "Returning the live children map.",
      "Cycles via parent pointers if you also allow move into a descendant.",
    ],
    practiceIdeas: [
      "mkdir/write/read/ls/rm with tests for file-in-the-middle paths.",
      "size() recursive on the composite.",
    ],
    related: [
      "composite-pattern",
      "visitor-pattern",
      "facade-pattern",
      "ownership",
      "fail-fast",
    ],
  },
  {
    slug: "amazon-locker",
    track: "lld",
    category: "Designs",
    title: "Amazon locker",
    summary:
      "Lockers are sized slots; a Package is assigned an open locker with a one-time code and a pickup TTL. Assignment is inventory; pickup is a state change.",
    depth: "next",
    whyItMatters:
      "Locker is hotel-booking meets vending: spatial inventory plus a code and expiry. It is a tight aggregate with a clear last-slot race.",
    theory: [
      "Key classes: LockerSite, Locker (id, size, status), Package, Allocation (lockerId, packageId, code, expiresAt), CodeGenerator, AllocationService, Clock. Status: FREE, OCCUPIED, OUT_OF_SERVICE. Size: S/M/L with a fits(package) rule.",
      "Relationships: Site owns Lockers (aggregate). Allocation is the current hold on a locker (0..1). Package references allocation. Service uses Clock + CodeGenerator. Courier and customer are actors, not necessarily classes with behavior.",
      "Main sequence: dropOff(pkg) → find FREE locker where size.fits → occupy + generate code + TTL. pickUp(code) → match allocation, not expired → free locker, close allocation. expire job frees and marks package undeliverable / return-to-warehouse (port).",
      "Extension point: assignment strategy (smallest fit vs close-to-entrance), reservations, refrigerated lockers as a type, notifications with the code. Do not design the courier routing network.",
    ],
    howItWorks: [
      "Site.assign(package) is atomic.",
      "Smallest-fit strategy as default.",
      "Code is a value; do not log it in full if you are being careful.",
      "Expiry via scheduler + Clock.",
      "Pickup is idempotent if already picked (return already-done).",
    ],
    whenToUse: [
      "Sized inventory + codes + TTL: lockers, PO boxes, airport pickup.",
    ],
    whenNotToUse: [
      "A single mailbox — still use Allocation if they want a code.",
    ],
    tradeoffs: [
      "Smallest-fit packs better; nearest-to-door is nicer UX.",
      "One site aggregate vs locker-level locks.",
    ],
    interviewTips: [
      "This is 'parking lot for packages' — say that, then add code + TTL.",
      "Last small locker, two S packages — one fails.",
      "Return-to-warehouse is a port on expiry.",
    ],
    pitfalls: [
      "Assigning an M package to an S locker.",
      "Codes that never expire.",
      "Two packages with the same open code.",
    ],
    practiceIdeas: [
      "Smallest-fit assignment + pickup + expire.",
      "Concurrent dropOff on the last locker.",
    ],
    related: [
      "parking-lot",
      "hotel-booking",
      "job-scheduler",
      "strategy-pattern",
      "invariants",
    ],
  },
  {
    slug: "calendar-scheduler",
    track: "lld",
    category: "Designs",
    title: "Calendar and meeting scheduler",
    summary:
      "Users have Calendars of Events with DateRanges; a Scheduler finds overlapping free slots across invitees and books an Event if no conflict (or with a policy).",
    depth: "next",
    whyItMatters:
      "Meetings combine value-object ranges, per-user aggregates, and a use case that reads many calendars. It is the 'two aggregates' coordination problem.",
    theory: [
      "Key classes: User, Calendar, Event (id, range, attendees, status), DateRange, WorkingHours, SchedulerService, EventRepository. Event status: TENTATIVE, CONFIRMED, CANCELLED. Recurrence is an extension (RRULE) — do not start there.",
      "Relationships: Calendar is the aggregate of a user's events (or Event is the root and calendar is a projection — pick one). SchedulerService loads calendars by id, computes intersection of free gaps, then creates events on each calendar or one Event with attendee ids.",
      "Main sequence: findSlots(attendees, duration, window) → gather busy ranges → merge → invert within working hours → return gaps ≥ duration. book(slot, attendees) → re-check conflicts (race) → create Event. cancel updates status and frees the range.",
      "Extension point: time zones (store UTC, display local), recurrence, rooms as another calendar, conflict policy (allow override). Interval merge is the algorithm; keep it in a pure function.",
    ],
    howItWorks: [
      "DateRange with overlaps/merge.",
      "Pure function freeSlots(busy[], window, duration).",
      "book re-validates before commit.",
      "WorkingHours as a value per user.",
      "Skip recurrence in v1; say how you'd add a RecurrenceRule later.",
    ],
    whenToUse: [
      "Calendars, room booking, interview-loop scheduling.",
    ],
    whenNotToUse: [
      "A single reminder — a Job scheduler is enough.",
    ],
    complexity: {
      time: "O(n log n) to sort/merge n busy intervals per user, then intersect users",
      space: "O(n)",
      notes: "Re-check at book time; suggestions can be stale.",
    },
    tradeoffs: [
      "One Event aggregate vs copies per calendar — one Event is easier to cancel consistently.",
      "Allowing conflicts vs hard fail.",
    ],
    interviewTips: [
      "Draw the merge-intervals step. That is the core.",
      "Ask time zones; store UTC.",
      "Race: two books on the same slot — first commit wins.",
    ],
    pitfalls: [
      "String times without timezone.",
      "Forgetting working hours so you propose 3am.",
      "Recurrence exploding into a million instances.",
    ],
    practiceIdeas: [
      "Three users, merge busy, propose a 30m slot.",
      "Two concurrent books of the same slot — one fails.",
    ],
    related: [
      "hotel-booking",
      "identity-vs-value-objects",
      "job-scheduler",
      "invariants",
      "transactions-per-use-case",
    ],
  },
  {
    slug: "browser-history",
    track: "lld",
    category: "Designs",
    title: "Browser history",
    summary:
      "A History object is two stacks (back, forward) plus a current URL. visit clears forward; back/forward move the pointer. Optional persist and search are ports.",
    depth: "core",
    whyItMatters:
      "Small, finishable, and a clean encapsulation test. Variants (max size, tabs, persist) show you will not overbuild the first diagram.",
    theory: [
      "Key classes: History, Page (url, title, visitedAt), Tab (has a History), Browser (tabs). Internals: backStack, current, forwardStack. Page is a value.",
      "Relationships: Tab has-a History. Browser has tabs. Do not put history in a global static. Search across history is a query on a log if you keep one — the stacks alone lose the 'full history' list; if they want that, keep an append-only log plus the stacks.",
      "Main sequence: visit(url) → push current to back, set current, clear forward. back() → push current to forward, pop back. forward() opposite. Both fail if the stack is empty (Result).",
      "Extension point: cap stack size, persist via a store port, incognito (no log), multiple tabs. Command pattern if they want undo beyond back — usually the stacks are enough.",
    ],
    howItWorks: [
      "Two stacks + current.",
      "visit clears forward.",
      "Do not expose the stacks.",
      "Optional: append-only log for the History page UI.",
      "Tab isolation.",
    ],
    whenToUse: [
      "Stack/encapsulation warm-up, tabbed UIs.",
    ],
    whenNotToUse: [
      "A full browser (rendering, cookies) — stay on history.",
    ],
    complexity: {
      time: "O(1) visit/back/forward",
      space: "O(n) pages in stacks (+ log if kept)",
      notes: "Capping n evicts oldest back entries.",
    },
    tradeoffs: [
      "Stacks only vs stacks + log (UI 'all history').",
      "Deep copy of page state vs URL only.",
    ],
    interviewTips: [
      "Finish in 15 minutes, then add tabs or persist.",
      "Show visit clears forward with a 3-step example.",
      "If they want 'reopen closed tab', that is another stack on Browser.",
    ],
    pitfalls: [
      "visit that does not clear forward.",
      "back() on empty throwing a raw index error.",
      "Shared history across tabs by accident.",
    ],
    practiceIdeas: [
      "Sequence A→B→C, back, visit D; forward is empty.",
      "Max-size eviction on the back stack.",
    ],
    related: [
      "command-pattern",
      "memento-pattern",
      "encapsulation",
      "pagination-in-service-apis",
      "kiss",
    ],
  },
  {
    slug: "text-editor",
    track: "lld",
    category: "Designs",
    title: "Text editor (command + memento)",
    summary:
      "A Buffer holds text and a cursor; Commands mutate it and undo via inverse or Memento; the Invoker keeps undo/redo stacks. Do not put undo inside every key handler ad hoc.",
    depth: "next",
    whyItMatters:
      "This is the Command + Memento showcase. Interviewers want a buffer API, insert/delete commands, and a bounded history — not a full VS Code.",
    theory: [
      "Key classes: Buffer (gap buffer or string + cursor), Position, Command (Insert, Delete, Replace), Memento (optional snapshot), Editor (invoker), Selection. Buffer methods: insert, delete, move — Commands call these.",
      "Relationships: Editor has Buffer + undo/redo stacks of Command or Memento. Commands hold enough to undo (deleted text, position). Macro is a Composite command. Selection is a value (start, end).",
      "Main sequence: type ch → InsertCommand(pos, ch).execute → push undo, clear redo. undo → pop, command.undo or restore memento, push redo. delete selection → DeleteCommand stores the text. Save is a port.",
      "Extension point: plug-in commands, syntax highlighter as Observer, gap buffer vs rope for large text (mention). Bound the undo stack. Do not implement collaborative OT unless they ask.",
    ],
    howItWorks: [
      "Buffer as the receiver with a small API.",
      "Command.execute/undo.",
      "Editor.invoke pushes history.",
      "Memento if undo-by-inverse is messy (format document).",
      "Cap history size.",
    ],
    whenToUse: [
      "Editors, drawing tools, anything with undo.",
    ],
    whenNotToUse: [
      "A single input field with OS undo — do not rebuild it.",
    ],
    complexity: {
      time: "string insert O(n) naive; gap buffer amortized better; undo O(command size)",
      space: "O(document + history)",
      notes: "Say you would switch buffer impl if they grow to MB files.",
    },
    tradeoffs: [
      "Inverse commands (small) vs full snapshots (simple, heavy).",
      "Naive string vs gap buffer / rope.",
    ],
    interviewTips: [
      "Draw Command, Buffer, Editor stacks. Implement insert/delete/undo.",
      "They may ask for replay — that is the undo stack reversed.",
      "Plugin commands = Command interface + registry.",
    ],
    pitfalls: [
      "Undo that cannot restore deleted text (you did not store it).",
      "Executing buffer.insert from the UI, bypassing the invoker — undo breaks.",
      "Unbounded snapshots every keystroke.",
    ],
    practiceIdeas: [
      "Insert/delete/undo/redo on a Buffer.",
      "A MacroCommand that types a snippet and undoes as one step.",
    ],
    related: [
      "command-pattern",
      "memento-pattern",
      "composite-pattern",
      "plugin-system",
      "flyweight-pattern",
    ],
  },
  {
    slug: "hashmap-internals",
    track: "lld",
    category: "Designs",
    title: "HashMap internals",
    summary:
      "An array of buckets, hash + mask, collision lists or trees, load-factor resize. equals/hashCode on keys is part of the contract you must state.",
    depth: "core",
    whyItMatters:
      "Almost every LLD uses a map. Knowing how it fails (mutable keys, bad hash, load factor) is how you debug and how you answer 'design a hashmap'.",
    theory: [
      "Key classes: HashMap<K,V>, Node (hash, key, value, next), optional TreeNode for long chains. Table is Node[]. Capacity is power of two; index = hash & (cap-1). Load factor 0.75 triggers resize (new table, re-place nodes).",
      "Relationships: Map owns the table. Keys must have stable hashCode/equals. Values are just stored. Iterators are fail-fast (modCount) or weakly consistent — pick one. ConcurrentHashMap is a different design (bins + CAS); mention it, do not implement unless asked.",
      "Main sequence put: hash key, find bin, walk for equal key (replace) else insert head/tail, size++, maybe resize. get: hash, walk, equals. remove: unlink. resize: new array, redistribute.",
      "Extension point: treeify bins (Java 8), open addressing (probe), custom hash, concurrency. Do not accept a mutable entity as a key. Null keys: language policy (one null or none).",
    ],
    howItWorks: [
      "State equals/hashCode contract.",
      "Implement put/get/remove with chaining.",
      "Resize at load factor.",
      "Iterator policy.",
      "If they ask threads, say this impl is not safe; use CHM or a lock.",
    ],
    whenToUse: [
      "The 'design a hashmap' prompt; explaining caches and intern pools.",
    ],
    whenNotToUse: [
      "Using HashMap from many threads without a story.",
    ],
    complexity: {
      time: "Average O(1) get/put; worst O(n) with bad hash or attacks; resize O(n)",
      space: "O(n + capacity)",
      notes: "Tree bins make worst-case O(log n) per bin.",
    },
    tradeoffs: [
      "Chaining vs open addressing (clustering, delete tombstones).",
      "0.75 load: more space, fewer collisions.",
    ],
    interviewTips: [
      "Write hash & (n-1) and the equals walk. Then resize.",
      "Mention mutable keys as a pitfall — connect to value objects.",
      "If they say concurrent, do not just synchronize the whole map without comment — discuss striping.",
    ],
    pitfalls: [
      "Using == instead of equals for keys.",
      "Forgetting to rehash on resize.",
      "Putting a mutable key and then changing it.",
    ],
    practiceIdeas: [
      "Implement a tiny chained map with resize and tests.",
      "Show a broken mutable-key example.",
    ],
    related: [
      "identity-vs-value-objects",
      "lru-cache",
      "iterator-pattern",
      "race-deadlock-livelock",
      "flyweight-pattern",
    ],
  },
  {
    slug: "logger",
    track: "lld",
    category: "Designs",
    title: "Logger",
    summary:
      "A small facade: levels, a message, and one or more Appenders. This is the API and object model; the concurrent version is thread-safe logger.",
    depth: "core",
    whyItMatters:
      "Almost every design logs. A Logger type with a Level and Appender keeps domain classes from calling console.log, and gives you a NullLogger for tests.",
    theory: [
      "Key classes: Logger, Level (ERROR, WARN, INFO, DEBUG), LogEvent, Appender, Formatter. Logger.debug/info/error methods. isEnabled(level) guards expensive messages.",
      "Relationships: Domain services depend on a Logger interface (DIP). Concrete logger holds appenders. Hierarchical loggers (name 'app.checkout') are optional. Do not make Logger a god that also metrics and traces unless asked.",
      "Main sequence: info(msg) → if level enabled → format event → each appender. Configuration chooses level and appenders at startup (Config).",
      "Extension point: JSON formatter, file appender, async decorator (see thread-safe logger), MDC. Null Object for tests. Prefer injection over Logger.getGlobal().",
    ],
    howItWorks: [
      "Logger interface in the domain.",
      "Level threshold.",
      "Appender list.",
      "Formatter separate from appender.",
      "Wire in main; inject everywhere.",
    ],
    whenToUse: [
      "Every non-trivial design's observability port.",
    ],
    whenNotToUse: [
      "Replacing exceptions with log-and-continue.",
    ],
    tradeoffs: [
      "Simple sync logger vs async (see thread-safe logger).",
      "Global singleton vs injection.",
    ],
    interviewTips: [
      "If logging is a side note, a Logger port + console appender is enough.",
      "If logging is the problem, graduate to the thread-safe design.",
      "NullLogger in tests — name the pattern.",
    ],
    pitfalls: [
      "String concat before level check.",
      "Static logger in a domain entity that you cannot fake.",
      "Logging secrets (PIN, card).",
    ],
    practiceIdeas: [
      "Logger + ConsoleAppender + FileAppender, level INFO.",
      "Swap in NullLogger in a unit test.",
    ],
    related: [
      "thread-safe-logger",
      "null-object",
      "singleton-pattern",
      "config-loader",
      "program-to-an-interface",
    ],
  },
  {
    slug: "config-loader",
    track: "lld",
    category: "Designs",
    title: "Config loader",
    summary:
      "Load, validate, and publish an immutable Config snapshot. Reload swaps the snapshot atomically. Fail fast on missing required keys at boot.",
    depth: "next",
    whyItMatters:
      "Config is a boundary: files/env are untrusted. A typed Config value plus a Loader beats a global MutableMap that anyone writes.",
    theory: [
      "Key classes: Config (immutable values), ConfigLoader, Source (file, env, remote — ports), Validator, ConfigRef (AtomicReference<Config>), Clock for reload. Required vs optional keys live in the schema/validator.",
      "Relationships: Loader uses Sources in overlay order (defaults < file < env). Validator builds Config or fails. App depends on Config or ConfigRef.get(), not on the loader. Reload thread swaps the ref.",
      "Main sequence: boot → load overlay → validate → publish. reload → same, swap if valid, keep old if invalid (or fail — policy). Watch is Observer on the file port.",
      "Extension point: new Source adapters, feature-flag subset, typed nested config. Do not hot-reload secrets into logs. Thread readers see a consistent snapshot (immutable sharing).",
    ],
    howItWorks: [
      "Define required keys and types.",
      "Overlay sources in a documented order.",
      "Validate then build immutable Config.",
      "Atomic swap on reload.",
      "Keep the previous snapshot if reload is corrupt, unless fail-fast-on-reload is the policy.",
    ],
    whenToUse: [
      "Any app with env/file settings, feature flags, fee tables.",
    ],
    whenNotToUse: [
      "Three constants — do not build a framework.",
    ],
    tradeoffs: [
      "Fail boot vs defaults for missing keys — required keys should fail.",
      "Hot reload vs restart (simpler mental model).",
    ],
    interviewTips: [
      "Immutable Config + atomic swap is the concurrency answer.",
      "Show a missing-key boot failure.",
      "Fee schedule as config for parking lot is a nice crossover.",
    ],
    pitfalls: [
      "Mutable global map.",
      "Reload that half-applies keys.",
      "Logging secret values.",
    ],
    practiceIdeas: [
      "Load JSON + env overlay; fail if PORT missing.",
      "Corrupt reload keeps the old snapshot; readers never see partial.",
    ],
    related: [
      "immutable-sharing",
      "fail-fast",
      "boundary-validation",
      "plugin-system",
      "singleton-pattern",
    ],
  },
  {
    slug: "plugin-system",
    track: "lld",
    category: "Designs",
    title: "Plugin system",
    summary:
      "A Host defines a small Plugin SPI; a Registry loads and orders plugins; the Engine calls hooks. Adding a feature is a jar/class, not an edit to the host.",
    depth: "advanced",
    whyItMatters:
      "This is the coded form of plugin/strategy engines. Payment rails, linters, and editor commands all share this skeleton.",
    theory: [
      "Key classes: Plugin (id, version, hooks), Hook interfaces (onStart, process(doc)), Registry, PluginLoader (classpath/config), Host/Engine, PluginContext (limited API the host gives plugins). Manifest describes id and deps.",
      "Relationships: Engine depends on Hook, not on plugin concretes. Loader returns Plugin instances. Context is a facade so plugins cannot grab private host state. Isolation: try/catch per plugin; optional classloader in real systems.",
      "Main sequence: boot → load manifests → topological order if deps → instantiate → onStart. request → engine runs hook chain. shutdown → onStop. Disable via config without recompile.",
      "Extension point: new hook types (version the SPI), sandboxed loaders, per-plugin config. Do not allow plugins to register arbitrary reflection on the host.",
    ],
    howItWorks: [
      "Write 1–2 tiny Hook interfaces.",
      "Registry.register + ordered list.",
      "Engine.run calls hooks.",
      "Config enables/disables by id.",
      "Loader can be hardcoded in the interview.",
    ],
    whenToUse: [
      "Extensible products, rule engines, editors, payments.",
    ],
    whenNotToUse: [
      "Two strategies known at compile time — pass them in.",
    ],
    tradeoffs: [
      "Open system vs implicit behavior and SPI freeze.",
      "In-process plugins (simple, crash the host) vs process isolation (HLD).",
    ],
    interviewTips: [
      "SPI stability is the product. Say it.",
      "Demo: add a plugin class, register, engine unchanged.",
      "Mention failure isolation.",
    ],
    pitfalls: [
      "Host switch(plugin.id).",
      "Fat Plugin interface with 20 methods.",
      "Plugins depending on Host private fields.",
    ],
    practiceIdeas: [
      "Document processor with SpellCheckPlugin and UppercasePlugin.",
      "Disable one via config; engine path unchanged.",
    ],
    related: [
      "plugin-strategy-engines",
      "solid-ocp",
      "solid-isp",
      "chain-of-responsibility",
      "config-loader",
    ],
  },
  {
    slug: "event-bus",
    track: "lld",
    category: "Designs",
    title: "Event bus",
    summary:
      "A typed in-process bus: publish(event), subscribe(type, handler). It is a generic mediator. Keep it boring; put rules in handlers, not in the bus.",
    depth: "next",
    whyItMatters:
      "Event bus is the grown-up Observer. Used well, use cases emit domain events and listeners update projections. Used poorly, it is a stringly-typed god with hidden flows.",
    theory: [
      "Key classes: EventBus, Event (base, immutable, id, occurredAt), Handler<T>, Subscription. Optional: DeadLetter, Dispatcher (sync/async). Domain events are subtypes: OrderPlaced, SeatHeld.",
      "Relationships: Publishers depend on EventBus (or an outbound port that the bus implements). Handlers are registered at composition root. The bus maps Class<T> → handlers. No handler should need the bus to complete a transaction that the publisher is still in — or you accept the re-entrancy story.",
      "Main sequence: subscribe(OrderPlaced.class, h). publish(event) → snapshot handlers → dispatch. Errors: isolate, log, maybe dead-letter. Request/reply is not the default — that is a smell (you wanted a method).",
      "Extension point: async, filters, transactional outbox (publish after commit). Cross-process is a message broker adapter behind the same port. Do not implement Kafka.",
    ],
    howItWorks: [
      "Typed subscribe/publish.",
      "Immutable events with ids.",
      "Copy handler list; isolate errors.",
      "Register in main, not in random entities.",
      "Prefer after-commit publish if you have transactions.",
    ],
    whenToUse: [
      "Several independent reactions to a domain fact.",
      "Decoupling modules that should not import each other.",
    ],
    whenNotToUse: [
      "A single follow-up action — call it.",
      "As a replacement for return values.",
    ],
    tradeoffs: [
      "Decoupling vs traceability (you need good event names and logs).",
      "In-process (lost on crash mid-dispatch) vs outbox.",
    ],
    interviewTips: [
      "If they say event bus, draw typed events and two handlers. Keep the bus stupid.",
      "Mention outbox if they care about 'email must send if order saved'.",
      "This is Mediator/Observer — say which intent you mean.",
    ],
    pitfalls: [
      "String event names and Map payloads only.",
      "Business rules inside the bus.",
      "Publish during a lock the handler also needs.",
    ],
    practiceIdeas: [
      "OrderPlaced → EmailHandler + InventoryProjection; one throws, the other still runs.",
      "Add an after-commit list on a UnitOfWork that flushes to the bus.",
    ],
    related: [
      "in-process-pubsub",
      "observer-pattern",
      "mediator-pattern",
      "notification-dispatcher",
      "transactions-per-use-case",
    ],
  },
];


