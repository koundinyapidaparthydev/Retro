export type Likelihood = "hot" | "often" | "sometimes";

export type CompanyAsk = {
  company: string;
  likelihood: Likelihood;
};

export type AskInfo = {
  companies: CompanyAsk[];
  why: string;
};

const G = "Google";
const M = "Meta";
const A = "Amazon";
const U = "Uber";
const N = "Netflix";
const Ms = "Microsoft";
const Ap = "Apple";

function ask(why: string, ...pairs: [string, Likelihood][]): AskInfo {
  return { why, companies: pairs.map(([company, likelihood]) => ({ company, likelihood })) };
}

export const ASKS: Record<string, AskInfo> = {
  "dsa:bfs": ask("Shortest hops, islands, word ladder.", [G, "hot"], [M, "hot"], [A, "often"], [U, "hot"]),
  "dsa:dfs": ask("Connected components, path exists, backtracking.", [G, "hot"], [M, "often"], [A, "often"]),
  "dsa:dijkstra": ask("Weighted shortest path, maps.", [G, "often"], [U, "hot"], [M, "sometimes"]),
  "dsa:union-find": ask("Dynamic connectivity, Kruskal, accounts merge.", [G, "hot"], [M, "often"], [A, "sometimes"]),
  "dsa:topo-sort-kahn": ask("Course schedule, build order.", [G, "often"], [M, "often"], [A, "often"], [Ms, "often"]),
  "dsa:islands": ask("Grid BFS/DFS — Meta and Amazon staple.", [M, "hot"], [A, "hot"], [G, "often"]),
  "dsa:two-pointers": ask("Sorted pair sum, container water.", [A, "hot"], [M, "hot"], [G, "often"], [Ap, "often"]),
  "dsa:sliding-window-fixed": ask("Max of k, averages.", [A, "hot"], [M, "often"], [Ms, "often"]),
  "dsa:sliding-window-variable": ask("Longest substring without repeat.", [M, "hot"], [A, "hot"], [G, "often"]),
  "dsa:binary-search": ask("Every 'log n' follow-up.", [G, "hot"], [M, "hot"], [A, "hot"], [Ms, "hot"]),
  "dsa:search-rotated-array": ask("Rotated array — classic Google/Amazon.", [G, "hot"], [A, "hot"]),
  "dsa:knapsack-01": ask("The DP template they expect you to name.", [G, "often"], [A, "often"], [Ms, "often"]),
  "dsa:lcs": ask("Edit distance family.", [G, "often"], [Ms, "often"]),
  "dsa:lis": ask("Patience / n log n follow-up.", [G, "often"], [M, "sometimes"]),
  "dsa:coin-change": ask("Unbounded knapsack in disguise.", [A, "often"], [G, "often"]),
  "dsa:kadane": ask("Max subarray — Amazon favorite.", [A, "hot"], [M, "often"]),
  "dsa:two-sum": ask("Warm-up everywhere.", [A, "hot"], [M, "hot"], [G, "often"], [Ap, "often"]),
  "dsa:lru-cache": ask("Design + hashmap + list.", [A, "hot"], [G, "often"], [M, "often"], [Ms, "often"]),
  "dsa:top-k": ask("Heap / quickselect.", [G, "often"], [M, "often"], [A, "often"], [U, "often"]),
  "dsa:trie": ask("Autocomplete, word search.", [G, "hot"], [M, "often"]),
  "dsa:tree-traversals": ask("Every tree follow-up.", [G, "hot"], [M, "hot"], [A, "hot"]),
  "dsa:lca": ask("Tree interview closer.", [G, "hot"], [M, "often"]),
  "dsa:reverse-linked-list": ask("List fluency check.", [A, "hot"], [M, "often"], [Ms, "often"]),
  "dsa:fast-slow-pointers": ask("Cycle in a list.", [A, "hot"], [M, "often"]),
  "dsa:merge-sort": ask("Stable n log n + inversion count.", [G, "often"], [A, "sometimes"]),
  "dsa:heapify": ask("Priority queue internals.", [G, "sometimes"], [U, "often"]),
  "dsa:kmp": ask("Rare as named KMP; shows up as 'efficient find'.", [G, "sometimes"], [Ms, "sometimes"]),

  "hld:url-shortener": ask("The standard first HLD.", [A, "hot"], [G, "often"], [M, "often"], [Ms, "often"]),
  "hld:newsfeed": ask("Meta's home-field. Fan-out is the test.", [M, "hot"], [G, "sometimes"]),
  "hld:chat": ask("WhatsApp / Messenger / Teams.", [M, "hot"], [Ms, "hot"], [A, "sometimes"]),
  "hld:uber": ask("Geo + matching. Uber and Lyft loops.", [U, "hot"], [G, "sometimes"]),
  "hld:rate-limiting": ask("API platform / gateway.", [A, "hot"], [G, "hot"], [Ms, "often"], [N, "often"]),
  "hld:notifications": ask("Push + fan-out + quiet hours.", [M, "hot"], [A, "often"], [G, "often"]),
  "hld:instagram": ask("Media + feed. Meta.", [M, "hot"]),
  "hld:youtube": ask("Netflix / YouTube loop.", [N, "hot"], [G, "hot"]),
  "hld:netflix": ask("Catalog + CDN + ABR.", [N, "hot"], [G, "sometimes"]),
  "hld:dropbox": ask("File sync + chunks.", [G, "often"], [Ms, "often"], [A, "sometimes"]),
  "hld:ticketmaster": ask("Inventory + oversell.", [A, "often"], [U, "sometimes"]),
  "hld:unique-id-generator": ask("Snowflake. Google/Twitter lore.", [G, "hot"], [A, "often"]),
  "hld:autocomplete": ask("Prefix search at type speed.", [G, "hot"], [M, "hot"]),
  "hld:web-crawler": ask("Politeness + frontier. Google classic.", [G, "hot"]),
  "hld:maps-nearby": ask("Geo index. Uber + Google.", [U, "hot"], [G, "hot"]),
  "hld:payments-wallet": ask("Ledger. Amazon/fintech.", [A, "hot"], [Ms, "sometimes"]),
  "hld:cap-theorem": ask("They poke this on every store pick.", [G, "hot"], [A, "often"], [M, "often"]),
  "hld:consistent-hashing": ask("Cache cluster / Dynamo.", [A, "hot"], [G, "often"], [N, "often"]),
  "hld:load-balancers": ask("Every design's front door.", [A, "hot"], [G, "often"], [Ms, "often"]),
  "hld:cache-patterns": ask("Stampede and TTL.", [A, "hot"], [M, "often"], [N, "often"]),
  "hld:sharding": ask("Hot partition follow-up.", [A, "hot"], [M, "hot"], [G, "often"]),
  "hld:replication": ask("Primary die. Always.", [A, "hot"], [G, "often"], [M, "often"]),
  "hld:kafka-sqs-rabbit": ask("Async path. Amazon loves SQS.", [A, "hot"], [N, "often"], [U, "often"]),

  "lld:parking-lot": ask("The LLD everyone starts with.", [A, "hot"], [U, "often"], [Ms, "often"]),
  "lld:elevator": ask("State machine LLD.", [A, "often"], [Ms, "often"]),
  "lld:strategy-pattern": ask("Fee / pay / rank swap.", [A, "hot"], [Ms, "often"]),
  "lld:observer-pattern": ask("Notify listeners.", [A, "often"], [Ms, "often"]),
  "lld:lru-cache": ask("Same as DSA, as a class design.", [A, "hot"], [G, "often"], [Ms, "often"]),
  "lld:splitwise": ask("Balances + settle.", [A, "sometimes"], [U, "sometimes"]),
  "lld:bookmyshow": ask("Seats + hold.", [A, "often"]),
  "lld:mini-uber": ask("Trip state. Uber + Amazon.", [U, "hot"], [A, "often"]),
};

export function topicAsks(track: string, slug: string): AskInfo | undefined {
  return ASKS[`${track}:${slug}`];
}

export const COMPANIES = [G, M, A, U, N, Ms, Ap] as const;

export function heatmapRows(track: "dsa" | "hld" | "lld") {
  return Object.entries(ASKS)
    .filter(([key]) => key.startsWith(`${track}:`))
    .map(([key, info]) => ({
      key,
      slug: key.split(":")[1],
      info,
      score: info.companies.reduce((sum, row) => sum + (row.likelihood === "hot" ? 3 : row.likelihood === "often" ? 2 : 1), 0),
    }))
    .sort((a, b) => b.score - a.score);
}
