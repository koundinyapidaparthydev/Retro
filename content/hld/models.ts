import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "cap-theorem",
    track: "hld",
    category: "Distributed models",
    title: "CAP theorem",
    summary:
      "During a network partition you cannot have both linearizable consistency and perfect availability. CAP is a partition-time triangle, not a license to ignore consistency on a good day.",
    depth: "core",
    whyItMatters:
      "Interviewers still open with CAP. Weak answers pick a letter and stop. Strong answers say what is partitioned, what 'available' means (every non-failing node answers), and what consistency they actually need — then they reach for PACELC and quorums.",
    theory: [
      "CAP says that in a distributed data store, when a partition (P) occurs, you must choose: continue serving possibly stale or conflicting answers (AP) or refuse some requests until you can be consistent (CP). C here is linearizability — a single total order that looks like one copy — not 'eventual' and not ACID isolation. A is not '99.9% SLO'; it is 'the surviving nodes still take reads/writes.'",
      "There is no CA system that also tolerates partitions, because partitions happen. What people call CA is usually a single-node or single-primary database that becomes unavailable when it cannot reach a quorum or a leader. That is CP in disguise, or 'not distributed.' The useful design question is: on partition, do we fail closed (CP) or serve degraded (AP) and repair later?",
      "Most real systems are not purely AP or CP. They are CP for money and AP for likes; CP for leader election and AP for caches. Timeouts turn a slow node into a partition. If your timeout is aggressive, you chose AP (or you failover and risk split-brain). CAP does not tell you what to do when there is no partition — that is PACELC (latency vs consistency).",
    ],
    howItWorks: [
      "Name the replica set and the likely partition (AZ, region, rack).",
      "For each write type, decide: reject if majority unreachable (CP) or accept locally and reconcile (AP).",
      "Implement CP with consensus (Raft) or majority quorums; AP with hinted handoff, CRDTs, or last-writer-wins.",
      "Tell the client what they got: error, stale read, or 'accepted, may conflict.'",
      "Practice the heal: anti-entropy, read repair, or human merge for rare conflicts.",
    ],
    whenToUse: [
      "Any multi-node store discussion: caches, KV, databases, multi-region.",
      "When the interviewer asks 'what if the replica is unreachable?'",
      "To justify why a leaderful DB goes read-only instead of taking split writes.",
    ],
    whenNotToUse: [
      "Do not apply CAP to a single-process monolith with one database — there is no P.",
      "Do not use CAP to excuse lost writes; AP still needs a durability and conflict story.",
    ],
    tradeoffs: [
      "CP: safer invariants, more errors and unavailability during netsplits.",
      "AP: stays up, requires conflict resolution and user-visible lag or forks.",
      "Per-key / per-API mix is how production systems stay honest.",
    ],
    interviewTips: [
      "Say 'CAP during partition; PACELC otherwise' so you sound current.",
      "Map the product: 'checkout is CP; feed counters are AP.'",
      "If they say Dynamo, talk sloppy quorums and vector clocks, not 'it's AP so anything goes.'",
    ],
    pitfalls: [
      "Calling Mongo/Postgres 'CA.'",
      "Confusing availability with latency or with durability.",
      "Forgetting that a timeout is a partition you invented.",
    ],
    practiceIdeas: [
      "Pick three APIs in Instagram and label each CP or AP with a one-line reason.",
      "Walk a two-AZ KV store through a partition and write what each client sees.",
    ],
    related: [
      "pacelc",
      "consistency-models",
      "quorum-nwr",
      "consensus-raft-paxos",
      "failure-modes",
      "acid-vs-base",
    ],
  },
  {
    slug: "pacelc",
    track: "hld",
    category: "Distributed models",
    title: "PACELC",
    summary:
      "If there is a Partition, trade Availability vs Consistency; Else, trade Latency vs Consistency. CAP's missing half is the healthy-path tradeoff.",
    depth: "next",
    whyItMatters:
      "Most of the time there is no partition, but you still decide whether a read waits for a quorum or returns the nearest replica. PACELC is the language for 'we chose 5ms stale reads on purpose.'",
    theory: [
      "Daniel Abadi's PACELC adds the Else clause CAP omits. When the network is healthy, a system still chooses: wait for more replicas (C, higher latency) or answer from a local copy (L, weaker consistency). Dynamo-style stores are PA/EL: prefer availability on partition and low latency otherwise. A synchronously replicated Postgres or a Raft log is PC/EC: consistent on both sides, paying latency and downtime.",
      "This is why 'we use Cassandra' is not a design. Cassandra can be tuned QUORUM/QUORUM (more C) or ONE/ONE (more L/A). Spanner looks EC by using time and Paxos, paying commit latency. A CDN is almost pure EL for cached objects. Your job is to place each read/write on that spectrum with numbers: extra RTT vs stale window.",
      "PACELC also explains multi-region. Cross-region sync replication is EC with 50–150ms writes. Async replicas are EL with RPO > 0. Many products are EC in one region and EL across regions — a hybrid that you should say out loud.",
    ],
    howItWorks: [
      "For the partitioned case, reuse CAP: fail or diverge.",
      "For the healthy case, pick R/W quorums or 'read local / write leader.'",
      "Expose the choice: consistency header, session token, or separate APIs (strongGet vs eventualGet).",
      "Measure the latency tax of the consistent path and only put money on it.",
      "Document the stale bound: 'replica lag SLO 1s' is an EL contract.",
    ],
    whenToUse: [
      "Tuning quorum stores, read replicas, and multi-region routing.",
      "When the interviewer thinks CAP is the whole story.",
      "Latency-sensitive reads that can tolerate brief staleness (profiles, catalogs).",
    ],
    whenNotToUse: [
      "Do not hide a missing conflict-resolution design behind 'we picked EL.'",
      "Do not apply PACELC to CPU caches in one process — stay at distributed datastores.",
    ],
    tradeoffs: [
      "EC: simple mental model, higher p99 writes, more coordination.",
      "EL: snappy local reads, session-protection and lag monitoring become your problem.",
      "PA vs PC on partition still dominates rare but ugly incidents.",
    ],
    interviewTips: [
      "Label the system PA/EL or PC/EC, then give the concrete replica setting.",
      "Offer two APIs if the product has mixed needs — that is a PACELC design, not indecision.",
    ],
    pitfalls: [
      "Using ONE/ONE in Cassandra for inventory because it is fast.",
      "Calling a system 'strongly consistent' while reading from async replicas.",
    ],
    practiceIdeas: [
      "Configure a toy quorum table: N=3, compare W=1 R=1 vs W=2 R=2 on latency and stale reads.",
      "Design a multi-region profile service: EL globally, EC for password change.",
    ],
    related: [
      "cap-theorem",
      "quorum-nwr",
      "consistency-models",
      "latency-vs-throughput",
      "replication",
      "multi-az-multi-region",
    ],
  },
  {
    slug: "consistency-models",
    track: "hld",
    category: "Distributed models",
    title: "Consistency models",
    summary:
      "Strong, eventual, causal, read-your-writes, and monotonic reads — what users are allowed to observe as replicas and caches catch up.",
    depth: "core",
    whyItMatters:
      "Saying 'eventual consistency' is not a model; it is a shrug. Users notice going backward in time, not seeing their own edit, or friends seeing a comment in different orders. You need the named guarantees and how session stickiness or version tokens implement them.",
    theory: [
      "Linearizability (strong) says each operation appears instant at a single point between invoke and response, in a global order that respects real time. Sequential consistency is a global order that respects each client's program order but not real-time. These are the expensive models: leader, quorum, or consensus on the path. They are what people want for unique usernames and bank balances.",
      "Eventual consistency says that if writes stop, replicas converge. It says nothing about how long, or whether a client can see time go backwards. Causal consistency preserves 'happens-before': if you comment on a post, nobody sees the comment without the post. Read-your-writes (RYW) means you never miss your own updates. Monotonic reads means you never see an older version after a newer one. Monotonic writes and write-follows-reads complete the session-guarantee set.",
      "You implement session guarantees without full linearizability: sticky sessions to a replica, version vectors, 'session tokens' that raise the minimum readable timestamp (causal/RYW like Google Megastore / Cosmos DB session mode), or reading the leader after a write. Caches break RYW if you write the DB and read a stale CDN. Always ask: whose session, which device, which region?",
    ],
    howItWorks: [
      "Classify each read: must be linearizable, session-consistent, or eventually OK.",
      "After writes, return a version/token the next read must meet (RYW).",
      "Sticky routing or replay-from-leader for monotonic reads.",
      "Causal: track dependencies (vector clocks or explicit parent ids) and delay delivery until they exist.",
      "Eventual: define repair (read repair, anti-entropy) and a lag SLO.",
    ],
    whenToUse: [
      "Linearizable: uniqueness, inventory decrement, leader election, permissions revoke.",
      "RYW/monotonic: user edits, settings, 'I just posted' refresh.",
      "Causal: comments, replies, collaborative edits, inbox threads.",
      "Eventual: counters, recommendations, CDN-cached public pages.",
    ],
    whenNotToUse: [
      "Do not promise linearizability from a cache-aside read you just wrote through somewhere else.",
      "Do not use last-writer-wins on causally related updates (comments vs deletes).",
    ],
    tradeoffs: [
      "Stronger models: simpler product bugs, more coordination and latency.",
      "Session models: cheap if the user is one device; messy across phone + laptop + region failover.",
      "Eventual + CRDTs: mergeable, limited operation types and bigger values.",
    ],
    interviewTips: [
      "Pick a model per API, not per company. 'Feed is eventual; follow graph write is quorum.'",
      "Mention the user-visible glitch you are preventing (time travel, lost selfie, double spend).",
      "If they say 'strong,' ask linearizable vs serializable — different layers.",
    ],
    pitfalls: [
      "RYW on server, broken by a second device or a CDN.",
      "Assuming monotonic reads if the LB sprays you across replicas.",
      "Vector clocks on huge replica sets without pruning.",
    ],
    practiceIdeas: [
      "List Instagram actions and assign a consistency model to each.",
      "Design a session token that enforces RYW across two read replicas.",
    ],
    related: [
      "cap-theorem",
      "pacelc",
      "isolation-levels",
      "replication",
      "stateless-sticky-sessions",
      "acid-vs-base",
    ],
  },
  {
    slug: "isolation-levels",
    track: "hld",
    category: "Distributed models",
    title: "Isolation levels",
    summary:
      "Read uncommitted through serializable — which write/read anomalies you accept inside a database, and why distributed SQL still makes you choose.",
    depth: "next",
    whyItMatters:
      "HLD candidates jump to shards and forget that a single primary still has isolation. Lost updates on inventory, non-repeatable reads on a transfer, and write skew on 'only two admins' are isolation bugs. You should know what Postgres default actually gives you.",
    theory: [
      "Isolation is about concurrent transactions on one logical database, not about replica lag. The ANSI levels: read uncommitted (dirty reads), read committed (no dirty reads; still non-repeatable and phantoms), repeatable read (stable rows you already read; phantoms depend on the engine), serializable (looks like a serial order). Snapshot isolation (SI), used by Postgres repeatable read and many systems, prevents dirty/non-repeatable/phantoms of the SI kind but still allows write skew.",
      "Classic anomalies: dirty read, non-repeatable read, phantom, lost update, write skew. Lost update is two read-modify-writes clobbering each other — isolation or explicit version columns fix it. Write skew is two transactions that each pass a check that would fail if they ran serially (on-call pair both go off duty). Serializable snapshot isolation (SSI) in Postgres detects some of those at commit time.",
      "Distributed transactions (2PC, Percolator, Spanner) try to extend isolation across shards. They cost latency and availability. Most HLD designs avoid cross-shard transactions: pick a shard key so one transaction stays on one node, or use sagas. If you need serializable across shards, say why and accept the tax.",
    ],
    howItWorks: [
      "Name the engine default (Postgres: read committed; MySQL InnoDB: repeatable read).",
      "For money and inventory, use row locks, SELECT FOR UPDATE, or optimistic version checks.",
      "Raise to serializable/SSI only on the few transactions that have write-skew risk.",
      "Keep transactions short; do not hold locks while calling HTTP.",
      "If sharded, design so the invariant lives in one shard or in a saga with compensation.",
    ],
    whenToUse: [
      "Inventory, wallets, booking, unique constraints, 'exactly one winner.'",
      "When explaining why an ORM retry is safe or not.",
      "Comparing OLTP SQL to a NoSQL compare-and-swap.",
    ],
    whenNotToUse: [
      "Do not wrap a whole checkout HTTP workflow in one open transaction.",
      "Do not assume serializable is free in a multi-region Spanner-like system — it is still coordination.",
    ],
    tradeoffs: [
      "Weaker isolation: higher concurrency, subtle product bugs.",
      "Serializable: fewer anomalies, more retries and abort rates under contention.",
      "Pessimistic locks: simple correctness, hot-row stalls; optimistic: better when conflicts are rare.",
    ],
    interviewTips: [
      "For Ticketmaster/Uber/inventory, say 'lost update' and show a version number or lock.",
      "Distinguish isolation (concurrency) from durability (fsync) and from distributed consistency (replicas).",
    ],
    pitfalls: [
      "Read-modify-write on a counter without atomic increment or version.",
      "Thinking repeatable read in Postgres is ANSI serializable.",
      "Long transactions that lock a hot seat row through a payment redirect.",
    ],
    practiceIdeas: [
      "Write two concurrent 'promote to admin if count < 2' transactions and show write skew.",
      "Design checkout so stock decrement is one short transaction and payment is a saga step.",
    ],
    related: [
      "acid-vs-base",
      "consistency-models",
      "inventory-checkout",
      "payments-wallet",
      "sagas",
      "sql-vs-nosql",
    ],
  },
  {
    slug: "acid-vs-base",
    track: "hld",
    category: "Distributed models",
    title: "ACID vs BASE",
    summary:
      "ACID is a local transactional contract. BASE is an availability-first style for partitioned, eventually consistent stores. They are not religions; they are placement decisions.",
    depth: "core",
    whyItMatters:
      "Interviews still contrast SQL/ACID with NoSQL/BASE. The hireable answer is: keep ACID where invariants are sharp and the write set is small; use BASE where scale and partition tolerance dominate and you can reconcile.",
    theory: [
      "ACID: Atomicity (all or nothing), Consistency (application invariants + constraints hold after commit — overloaded word), Isolation (see isolation levels), Durability (committed stays committed). This is what OLTP databases sell. It is easiest on one primary. Distributed ACID exists (Spanner, Cockroach, FoundationDB) and costs commit protocol latency.",
      "BASE: Basically Available, Soft state, Eventual consistency. It is a slogan for AP/EL systems: serve something, let replicas drift, converge later. Soft state means caches and derived views may be reconstructed. BASE is not 'no durability' and not 'no schema.' It is a bet that stale or conflicting intermediate states are cheaper than downtime.",
      "Modern designs mix them. The order service is ACID on a shard; the activity feed is BASE. An outbox table is ACID locally and then at-least-once to a BASE consumer. Treating BASE as 'we use Mongo so we do not think about invariants' is how you double-charge cards.",
    ],
    howItWorks: [
      "List invariants that cannot be eventual (balance ≥ 0, seat unique, username unique).",
      "Put those on an ACID store or a consensus/CAS primitive.",
      "Put high-volume, mergeable, or reconstructable data on BASE stores and streams.",
      "Glue with outbox/CDC so the ACID commit is the source of truth.",
      "Show the user a pending state when BASE views lag ('processing').",
    ],
    whenToUse: [
      "ACID: billing, inventory, authz grants, unique handles.",
      "BASE: feeds, analytics, catalogs, search indexes, recommendations.",
      "Both in one product — that is the normal architecture.",
    ],
    whenNotToUse: [
      "Do not put ledger lines in an eventually consistent document DB 'for scale.'",
      "Do not force distributed 2PC across five services for a like button.",
    ],
    tradeoffs: [
      "ACID: fewer reconciliation jobs, harder horizontal write scale.",
      "BASE: scale and availability, more product states and repair tools.",
      "NewSQL: ACID with shards, still not free under cross-region and hot keys.",
    ],
    interviewTips: [
      "Never say 'NoSQL means BASE so we cannot have transactions' — many NoSQL stores have single-key atomicity.",
      "Draw the ACID core and the BASE projections as two boxes with an arrow labeled outbox.",
    ],
    pitfalls: [
      "Using the 'C' in ACID as if it were CAP consistency.",
      "Multi-document updates without a transaction and calling it fine because Mongo can shard.",
    ],
    practiceIdeas: [
      "Split an e-commerce checkout into ACID stock + BASE recommendations and define the lag.",
      "Find three BASE views you could rebuild from an ACID log (CQRS).",
    ],
    related: [
      "isolation-levels",
      "cap-theorem",
      "sql-vs-nosql",
      "cqrs",
      "outbox",
      "payments-wallet",
    ],
  },
  {
    slug: "consensus-raft-paxos",
    track: "hld",
    category: "Distributed models",
    title: "Consensus: Raft and Paxos",
    summary:
      "How a cluster agrees on one next value (leader, log entry, config) despite crashes and delayed messages — the engine under etcd, ZooKeeper, and many databases.",
    depth: "advanced",
    whyItMatters:
      "You rarely implement Paxos in an interview, but you must know when you need consensus (one leader, one config, one linearizable register) versus when a quorum KV or an RDBMS primary is enough. Wrong tool: split-brain. Right tool: a small, boring replicated log.",
    theory: [
      "Consensus means nodes agree on a sequence of decisions that never change once chosen. Paxos (Multi-Paxos) uses prepare/promise and accept/accepted phases with ballot numbers so two proposers cannot commit different values in the same slot. It is famously subtle. Raft was designed to be teachable: a strong leader, a replicated log, terms instead of ballots, and membership changes as a log entry. etcd and Consul are Raft; Chubby and Spanner's Paxos groups are the same job.",
      "Safety: two leaders in the same term must be impossible; a committed entry stays committed after failover. Liveness: you need a majority and a way to elect when the leader dies (randomized timeouts in Raft). Consensus does not solve Byzantine faults in the standard form — nodes are crash-stop or fail-recover, not malicious. Clock skew can delay elections but must not decide safety; terms/ballots do.",
      "Use consensus for metadata and control: leader election, shard maps, config, small linearizable KV (a few GB). Do not put the video bytes or the full tweet firehose through Raft. Databases often run Raft per shard (Cockroach, TiKV) so the consensus group stays small. ZooKeeper/etcd are the classic external coordination services — also a dependency and a bottleneck if you put per-request data there.",
    ],
    howItWorks: [
      "Replicate a log: clients write to the leader; followers ack; commit index advances at majority.",
      "Elect a leader with terms/timeouts; old leader is fenced by a higher term.",
      "Keep groups small (3 or 5). Five survives two failures; more nodes slow commits.",
      "Separate the consensus group (control plane) from bulk data (blob/log/partition).",
      "Backup and snapshot the log; membership changes go through the log too.",
    ],
    whenToUse: [
      "Leader election, distributed locks with a lease, shard-map source of truth.",
      "Per-shard replication of a NewSQL primary.",
      "Cluster metadata that must not split-brain (Kafka controller KRaft, etcd for Kubernetes).",
    ],
    whenNotToUse: [
      "Do not send high-volume user data through a global etcd.",
      "Do not roll your own Paxos in a 45-minute interview — name the off-the-shelf service.",
    ],
    complexity: {
      time: "Majority round-trips per commit (typically 1 RTT in the steady leader case)",
      space: "Replicated log + snapshots; keep groups small",
      notes: "Commit latency ≈ intra-quorum RTT; cross-region Raft is a product decision.",
    },
    tradeoffs: [
      "3 vs 5 nodes: cheaper vs more failure tolerance and slower writes.",
      "Strong leader (Raft): simple and fast in steady state; leader is a hotspot.",
      "External ZooKeeper vs built-in Raft: operational dependency vs coupled lifecycle.",
    ],
    interviewTips: [
      "Say 'we store the shard map in etcd/Raft' not 'we use Paxos to store tweets.'",
      "Mention fencing tokens so a dead leader cannot write after a new one is elected.",
      "If asked to compare: Raft is understandable Multi-Paxos with a leader and a log.",
    ],
    pitfalls: [
      "Even cluster sizes (2, 4) — majority math and split votes.",
      "Using wall-clock to decide commits.",
      "Putting the consensus cluster in one AZ.",
    ],
    practiceIdeas: [
      "Draw a 5-node Raft failover: who votes, what is committed, what the old leader must not do.",
      "List what belongs in etcd vs Kafka vs Postgres for a control plane + data plane app.",
    ],
    related: [
      "leader-vs-leaderless",
      "quorum-nwr",
      "failure-modes",
      "distributed-lock-scheduler",
      "service-discovery",
      "cap-theorem",
    ],
  },
  {
    slug: "quorum-nwr",
    track: "hld",
    category: "Distributed models",
    title: "Quorum reads and writes (N, W, R)",
    summary:
      "With N replicas, a write waits for W acks and a read waits for R responses. If R+W > N you overlap and can read the latest write — with caveats.",
    depth: "next",
    whyItMatters:
      "Dynamo, Cassandra, and Riak made NWR famous. It is the concrete knob behind CAP/PACELC for leaderless stores. Interviews expect you to pick N=3, W=2, R=2 for 'pretty strong' and to know when it still fails (concurrent writes, sloppy quorums, clocks).",
    theory: [
      "N is the replication factor. W is how many replicas must ack a write. R is how many you wait on for a read (then take the newest by timestamp or vector clock). R+W > N means the read set and write set intersect, so you should see the last completed write — if writes are not concurrent, if you used strict quorums, and if 'newest' is well defined. W=N, R=1 is fast reads and slow, unavailable writes. W=1, R=N is the opposite. W=1, R=1 is fast and stale.",
      "Sloppy quorums (Dynamo hinted handoff) write to any N healthy nodes, not the 'correct' N. That preserves availability and breaks the simple R+W intersection math until repair. Concurrent writes need vector clocks or CRDTs; last-writer-wins with NTP will drop data on clock skew. Read repair and anti-entropy (Merkle trees) clean the tails.",
      "Leaderful systems hide NWR: a Raft commit is majority W, and reads can be lease-based on the leader (R=1 with a lease) or quorum reads. Do not quote NWR for a single-primary MySQL unless you mean 'sync replicas before ack.'",
    ],
    howItWorks: [
      "Pick N from failure model (3 for 1 failure, 5 for 2) and storage cost.",
      "Pick W/R from the API: money W=N or majority; feed W=1; profile R=1 with cache.",
      "On read, merge R responses; if siblings, resolve or return conflict to the app.",
      "Run hinted handoff / repair so sloppy writes get home.",
      "Monitor: ack latency at W, stale-read rate, repair backlog.",
    ],
    whenToUse: [
      "Leaderless or multi-master KV/wide-column stores.",
      "Tuning Cassandra consistency levels per query.",
      "Explaining why majority write + majority read ≈ linearizable-ish for single objects.",
    ],
    whenNotToUse: [
      "Do not use W=1 for a unique inventory decrement and call it quorum-safe.",
      "Do not assume R+W>N survives concurrent writers without a merge story.",
    ],
    complexity: {
      time: "Write latency ≈ W-th replica RTT; read ≈ R-th",
      space: "N × data (+ repair metadata)",
      notes: "Tail of the slowest of W/R replicas dominates p99.",
    },
    tradeoffs: [
      "Higher W/R: stronger overlap, worse latency and availability (need more live nodes).",
      "Sloppy quorum: stays up, weaker intersection until repair.",
      "N=5: more durability, more cost and slower W=majority.",
    ],
    interviewTips: [
      "Default N=3, W=2, R=2 and say what concurrent writes do.",
      "Offer LOCAL_QUORUM in multi-DC so you do not wait on another continent.",
      "Mention hinted handoff if they ask Dynamo.",
    ],
    pitfalls: [
      "R+W>N with last-writer-wins and skewed clocks.",
      "Forgetting that a failed W still may have written some replicas (need idempotent retry).",
      "Using different N for reads vs writes by accident after a RF change.",
    ],
    practiceIdeas: [
      "Table of (W,R) pairs for N=3 and the failure they survive.",
      "Design a counter with W=1 plus later CRDT merge vs W=majority increments.",
    ],
    related: [
      "cap-theorem",
      "pacelc",
      "leader-vs-leaderless",
      "replication",
      "consistency-vs-durability",
      "failure-modes",
    ],
  },
  {
    slug: "leader-vs-leaderless",
    track: "hld",
    category: "Distributed models",
    title: "Leader vs leaderless replication",
    summary:
      "A single primary sequences writes, or every replica can take writes. The choice is latency, conflict handling, and how you fail over.",
    depth: "next",
    whyItMatters:
      "Almost every datastore is one of these two shapes. Leaderful is easier to reason about and easier to hotspot. Leaderless is how you stay available across DCs — if you can merge. Saying 'we replicate' without this split is incomplete.",
    theory: [
      "Leader (primary/secondary): all writes go to one node that assigns order; followers apply the log. Reads can be leader-only (strong) or replica (stale). Failover elects a new leader (Raft, Patroni, RDS multi-AZ). Benefits: no write-write conflicts, simpler isolation, cheap sequential commits. Costs: extra hop, leader CPU/disk as the write ceiling, failover pause, region affinity.",
      "Leaderless (Dynamo style): any coordinator can write a quorum. There is no global log order across keys. Conflicts are resolved by timestamps, vector clocks, or CRDTs. Benefits: write availability, no leader hotspot for uniform keys, multi-DC writes. Costs: siblings, hinted handoff, harder transactions, clocks.",
      "Hybrids: leader-per-shard (most NewSQL and Kafka partitions), multi-leader for a few regions with conflict rules (active-active), or 'leader for writes, anyone for reads.' Multi-leader is not leaderless — you still have conflicts on the same row from two leaders.",
    ],
    howItWorks: [
      "If invariants need a single order, pick a leader (global or per shard/key).",
      "If the workload is multi-region writes of independent keys, consider leaderless or per-key leaders.",
      "Plan failover: lease + fencing for leaderful; repair + read merge for leaderless.",
      "Route clients: write to leader, read per consistency class.",
      "Watch the hotspot: one partition leader can still melt in both models.",
    ],
    whenToUse: [
      "Leaderful: RDBMS, Raft logs, Kafka partitions, any serializable local transaction.",
      "Leaderless: large KV, session stores, multi-DC availability-first caches of mergeable data.",
      "Leader-per-shard: the default scalable compromise.",
    ],
    whenNotToUse: [
      "Do not run multi-leader on a wallet without a deterministic merge (there isn't one for money).",
      "Do not use a single global leader for a worldwide write-heavy social graph.",
    ],
    tradeoffs: [
      "Leader: simple correctness, failover and scale ceiling.",
      "Leaderless: availability and write scale, conflict tax.",
      "Per-shard leaders: scale + order, plus rebalancing and hot shards.",
    ],
    interviewTips: [
      "Say where the leader lives and what happens when it dies (RTO, fencing).",
      "For Dynamo, do not skip conflict resolution — that is the design.",
    ],
    pitfalls: [
      "Two primaries after a netsplit (split-brain) without quorum or STONITH.",
      "Clients that keep writing to the old leader after failover.",
      "Calling Cassandra 'leaderless' and then using LWT everywhere — you just added Paxos per key.",
    ],
    practiceIdeas: [
      "Compare RDS multi-AZ failover to a Cassandra LOCAL_QUORUM write for a session store.",
      "Design a per-shard leader map stored in Raft (control plane) with data on the shards.",
    ],
    related: [
      "consensus-raft-paxos",
      "quorum-nwr",
      "replication",
      "failure-modes",
      "active-active-passive",
      "key-value-store",
    ],
  },
  {
    slug: "failure-modes",
    track: "hld",
    category: "Distributed models",
    title: "Failure modes: crash, partition, split-brain, clock skew",
    summary:
      "The failures your protocol must survive — not 'the server goes down,' but the messy ones that duplicate leaders and reorder time.",
    depth: "core",
    whyItMatters:
      "Designs that only handle clean process death look fine on a whiteboard and lie in production. Partitions create two realities. Split-brain double-applies money. Clock skew breaks TTLs, tokens, and last-writer-wins. Name these modes and the fence that stops them.",
    theory: [
      "Crash-stop: a node is gone and stays gone. Crash-recovery: it returns with old disk, maybe a stale role. Fail-slow (gray failure): it responds just enough to stay in the cluster and poison p99. You detect with heartbeats and health checks, but fail-slow needs saturation signals, not just liveness.",
      "Network partition: subsets cannot talk. Each side may think it is the majority. Split-brain is two leaders or two writers for the same data. Prevention is quorum (never two majorities), fencing (STONITH, disk reservations, epoch tokens), and 'old leader must be refused by followers and storage.' DNS/LB cutover without fencing is how the zombie primary comes back.",
      "Clock skew: NTP steps, paused VMs, leap seconds. Last-writer-wins drops the 'real' latest write. Token expiry and TLS become wrong. Cassandra timestamps and 'event time' in streams mis-order. Use logical clocks (Lamport, vector, Raft terms) for safety; use time only with bounds (TrueTime, HLC) or as a hint. Timeouts plus retries without idempotency turn a partition into duplicates.",
    ],
    howItWorks: [
      "Assume every RPC can timeout with unknown result — design idempotent writes.",
      "Use majority quorum or an external lock service for exclusive roles.",
      "Issue monotonic epochs/fencing tokens on failover; storage rejects old epochs.",
      "Prefer monotonic logical time for conflict; bound physical time if you must (leases).",
      "Test partitions and clock jumps; do not only kill -9 a process.",
    ],
    whenToUse: [
      "Any leader election, unique resource, multi-AZ database, or LWW store.",
      "When the interviewer asks 'what if the network is slow, not down?'",
      "Timeouts, retries, and exactly-once discussions.",
    ],
    whenNotToUse: [
      "Do not hand-wave 'we'll use NTP' as a consistency protocol.",
      "Do not ignore fail-slow nodes that pass /health but time out on /checkout.",
    ],
    tradeoffs: [
      "Aggressive timeouts: faster failover, more false partitions and duplicate work.",
      "Quorum fencing: safer, unavailable if you lose majority.",
      "Logical clocks: safe order, harder to debug than wall clocks.",
    ],
    interviewTips: [
      "Walk one story: primary isolated, still accepting writes, then the new primary — and show fencing.",
      "Mention gray failures: 'health check must exercise the dependency, not just listen on a port.'",
    ],
    pitfalls: [
      "Even-sized clusters and two-node 'HA.'",
      "Relying on wall-clock uniqueness for IDs or LWW.",
      "Retries that create split-brain at the business layer (two charges).",
    ],
    practiceIdeas: [
      "Chaos a two-AZ app: drop traffic one way and list what split-brains.",
      "Show why Snowflake IDs need careful clocks but Raft terms do not.",
    ],
    related: [
      "consensus-raft-paxos",
      "idempotency-delivery",
      "health-checks",
      "fault-tolerance-dr",
      "unique-ids",
      "chaos-engineering",
    ],
  },
  {
    slug: "idempotency-delivery",
    track: "hld",
    category: "Distributed models",
    title: "Idempotency and delivery semantics",
    summary:
      "At-most-once, at-least-once, and exactly-once-enough: how retries and consumer offsets interact with keys so effects happen once.",
    depth: "core",
    whyItMatters:
      "Networks do not give you exactly-once. They give you retries and unknowns. Payments, inventory, and notifications are where juniors duplicate side effects. Seniors name the idempotency key, the dedupe store, and what still can happen twice.",
    theory: [
      "At-most-once: send and forget, or drop on failure — no duplicates, possible loss. At-least-once: retry until ack — no loss, possible duplicates. Exactly-once is an end-to-end illusion: a protocol can make a processed message appear once if the consumer's effect is idempotent and the broker/consumer commit is atomic (or carefully ordered). Kafka 'exactly-once' is produce-consume-produce in a transaction, not 'your HTTP webhook ran once in the universe.'",
      "Idempotency means applying the same request N times has the same effect as once. Safe tools: PUT with a resource id, database unique constraints, idempotency-key tables (Stripe style), natural keys (order_id + line), and compare-and-swap. Unsafe: 'INSERT payment' without a key, 'send email' without a sent-receipt row. Timeouts after the server committed but before the client saw 200 are the usual duplicate.",
      "Delivery is a pipeline: producer retry, broker replay, consumer retry, downstream webhook. Each hop can duplicate. You pick one authoritative dedupe point — usually the service that has the side effect — with a TTL long enough to cover retries. Outbox + inbox patterns make the DB the source of 'I already did this.'",
    ],
    howItWorks: [
      "Client sends Idempotency-Key (UUID) on every mutating retry of the same intent.",
      "Server stores key → response/status with a unique constraint; replays the stored result.",
      "Consumers commit offsets only after the effect is durable, or use an inbox table in the same transaction.",
      "Make downstream calls themselves idempotent (upsert, not increment-without-key).",
      "Choose at-least-once + idempotent consumer as the default HLD story.",
    ],
    whenToUse: [
      "Any payment, booking, notification, webhook, or 'create X' API.",
      "Queue consumers and CDC pipelines.",
      "Client retries, hedged requests, and LB retries (those are duplicates too).",
    ],
    whenNotToUse: [
      "Do not promise broker exactly-once as a substitute for a unique payment_id.",
      "Do not use a 30-second idempotency TTL if clients retry for 24 hours.",
    ],
    tradeoffs: [
      "At-most-once: simple, silent loss.",
      "At-least-once + keys: extra storage and lookup, correct money.",
      "Transactional outbox: more moving parts, fewer lost or double events.",
    ],
    interviewTips: [
      "For every write API, name the idempotency key and where it is stored.",
      "Say 'exactly once effect, at-least-once delivery' — that phrase is the bar.",
      "Mention that GET is naturally idempotent; POST is not.",
    ],
    pitfalls: [
      "LB automatic retries on POST without keys.",
      "Deduping only in memory — lost on restart, then double send.",
      "Hashing the whole body as the key when a client retries with a new timestamp field.",
    ],
    practiceIdeas: [
      "Design Stripe-like charge API keys: table schema, TTL, and concurrent retries.",
      "Write an inbox pattern for a Kafka consumer that inserts a ledger row.",
    ],
    related: [
      "outbox",
      "backpressure-retries",
      "sagas",
      "payments-wallet",
      "webhooks-vs-polling",
      "failure-modes",
    ],
  },
  {
    slug: "backpressure-retries",
    track: "hld",
    category: "Distributed models",
    title: "Backpressure, retries, timeouts, and circuit breakers",
    summary:
      "How a system says 'slow down' instead of melting, and how retries without jitter and budgets become a self-DDoS.",
    depth: "core",
    whyItMatters:
      "The first outage after your design ships is often retry amplification. Timeouts that are too long hold threads; too short multiply load. Circuit breakers and queues are the HLD tools that keep a dependency failure from becoming a fleet-wide timeout storm.",
    theory: [
      "Backpressure is the signal from a slower consumer to a faster producer: TCP windows, HTTP 429, queue depth, reactive streams, Kafka consumer lag. If you drop backpressure and buffer forever, you trade a brief slowdown for an OOM or a 30-minute lag cliff. Bounded queues plus shed-load (reject, sample, degrade) keep the system in a known state.",
      "Timeouts bound how long you wait; they turn uncertainty into an error you can handle. They must be smaller than the caller's remaining deadline (time budgets). Retries need a policy: which errors (idempotent/safe only), how many, exponential backoff, and full jitter (AWS architecture blog) so waiters do not synchronize. Hedged requests are a special retry that races — useful for tails, dangerous for writes.",
      "A circuit breaker trips when error rate or latency exceeds a threshold: fail fast locally instead of piling on a sick dependency. Half-open probes a few requests. Combined with bulkheads (separate pools per dependency), one bad payment vendor cannot exhaust your API threads. None of this replaces fixing the dependency — it buys isolation.",
    ],
    howItWorks: [
      "Set a deadline at the edge and subtract as you go; do not give every hop 30s.",
      "Retry only idempotent calls or retry with the same idempotency key.",
      "Use exponential backoff + jitter; cap retries; prefer retry-after from 429.",
      "Trip circuits on high error rate or p99; serve fallback when open.",
      "Bound every queue and thread pool; shed newest or cheapest work first.",
    ],
    whenToUse: [
      "All service-to-service calls, webhooks, and DB pools.",
      "User APIs that depend on flaky partners (email, SMS, payments).",
      "Streams: pause consume when the writer or sink is saturated.",
    ],
    whenNotToUse: [
      "Do not retry non-idempotent POSTs at the LB.",
      "Do not set a circuit breaker so sensitive it flaps on a 1% blip and never recovers.",
    ],
    tradeoffs: [
      "Short timeouts: fast failure, more false retries.",
      "Long queues: absorb spikes, hide overload until they dump.",
      "Fail-open breaker: availability vs sending traffic into a fire.",
    ],
    interviewTips: [
      "When you draw a box-to-box arrow, mention timeout, retry, and idempotency in one sentence.",
      "Quantify amplification: 50k QPS × 3 retries = 150k to a dying DB.",
      "Pair with bulkheads and fallbacks in the reliability section.",
    ],
    pitfalls: [
      "Synchronized retries after a 30s outage (thundering herd).",
      "Unlimited HTTP client connections — you are the DDoS.",
      "Timeouts longer than the caller's load balancer, which retries again.",
    ],
    practiceIdeas: [
      "Write a retry policy table: method, max, jitter, and whether a key is required.",
      "Design load-shedding for a search API: 429 vs serve stale cache.",
    ],
    related: [
      "bulkhead-circuit-breaker",
      "idempotency-delivery",
      "hedged-requests",
      "rate-limiting",
      "health-checks",
      "hot-keys-partitions",
    ],
  },
];
