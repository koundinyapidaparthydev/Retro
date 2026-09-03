export type WorkedExample = {
  easy?: string;
  setup: string;
  input?: string;
  steps: string[];
  result: string;
};

export const EXAMPLES: Record<string, WorkedExample> = {
  "dsa:linear-search": {
    easy: "Start at the first item and check one by one until you find what you want — or run out of items.",
    setup: "You lost your keys on a messy desk. You look at object 1, then 2, then 3.",
    input: "List: [keys? no, no, yes, no]  Target: keys",
    steps: [
      "Look at index 0 — not keys.",
      "Look at index 1 — not keys.",
      "Look at index 2 — keys. Stop.",
    ],
    result: "Found at index 2. You never skipped ahead because the desk was not sorted.",
  },
  "dsa:binary-search": {
    easy: "If the list is sorted, keep asking “is the middle too small or too big?” and throw away half each time.",
    setup: "Find 9 in a sorted row of numbers. You only look at the middle, never scan left-to-right.",
    input: "Array: [1, 3, 5, 7, 9, 11, 13]   Target: 9",
    steps: [
      "Middle is 7. 9 is bigger, so forget 1–7.",
      "Now you have [9, 11, 13]. Middle is 11. 9 is smaller, forget 11–13.",
      "Only 9 is left. That is the answer.",
    ],
    result: "3 checks instead of 5. Same trick works for “first day the package arrives” if that answer only goes one way.",
  },
  "dsa:two-pointers": {
    easy: "Put one finger on the left and one on the right, then move them toward each other instead of using two nested loops.",
    setup: "Do two numbers in a sorted list add to 10?",
    input: "[1, 2, 4, 7, 11]  sum = 10",
    steps: [
      "Left=1, right=11. 1+11=12 — too big, move right left.",
      "Left=1, right=7. 1+7=8 — too small, move left right.",
      "Left=2, right=7. 2+7=9 — still small.",
      "Left=4, right=7. 4+7=11 — too big.",
      "Left=4, right=4? pointers meet — or you find 4+7 after adjusting. The idea: one pass, not n² pairs.",
    ],
    result: "You tested pairs without checking every combination.",
  },
  "dsa:sliding-window-fixed": {
    easy: "Keep a moving box over a stretch of the array. Slide it instead of rebuilding the box from scratch.",
    setup: "Max sum of any 3 neighbors.",
    input: "[2, 1, 5, 1, 3, 2]  window = 3",
    steps: [
      "First box [2,1,5] sums to 8.",
      "Slide: drop 2, add 1 → [1,5,1] = 7.",
      "Slide: drop 1, add 3 → [5,1,3] = 9.",
      "Slide: drop 5, add 2 → [1,3,2] = 6. Best was 9.",
    ],
    result: "Each slide is O(1). You never re-add the whole window.",
  },
  "dsa:bfs": {
    easy: "Explore a graph like ripples in a pond: everything 1 step away, then 2 steps, then 3. Closest things first.",
    setup: "You are at A. Friends: A–B, A–C, B–D. Who do you meet in what order?",
    input: "Start at A",
    steps: [
      "Visit A. Queue: B, C.",
      "Visit B, then C. Queue: D.",
      "Visit D. Queue empty. Done.",
    ],
    result: "Order A, B, C, D. Shortest hop-count from A is the first time you see a node.",
  },
  "dsa:dfs": {
    easy: "Go as deep as you can down one path, then back up and try the next branch — like exploring a maze with one hand on the wall.",
    setup: "Same graph as BFS, but you dive first.",
    input: "Start at A, neighbors B then C",
    steps: [
      "A → B → D (dead end).",
      "Back to B, then A.",
      "A → C. Done.",
    ],
    result: "Order might be A, B, D, C. Great for “does a path exist?” not “shortest path.”",
  },
  "dsa:dijkstra": {
    easy: "BFS, but edges have different costs. Always expand the cheapest known place next.",
    setup: "Drive from home to work. Some roads are slow.",
    input: "Home→Shop=2, Home→Park=5, Shop→Work=3",
    steps: [
      "Best so far: Home=0.",
      "Take cheapest unused: Home→Shop (2).",
      "From Shop, Work=2+3=5, better than going Home→Park first.",
      "Lock Work at 5.",
    ],
    result: "Cheapest path Home → Shop → Work costs 5.",
  },
  "dsa:merge-sort": {
    easy: "Split the list in half until pieces are tiny, sort those, then zipper two sorted halves together.",
    setup: "Sort [4, 1, 3, 2].",
    input: "[4, 1, 3, 2]",
    steps: [
      "Split → [4,1] and [3,2].",
      "Split again → [4] [1] [3] [2].",
      "Merge [4] and [1] → [1,4]. Merge [3] and [2] → [2,3].",
      "Merge [1,4] and [2,3] → [1,2,3,4].",
    ],
    result: "Always O(n log n). Extra memory for the zipper.",
  },
  "dsa:quick-sort": {
    easy: "Pick a pivot. Put smaller items left, bigger right. Repeat on each side.",
    setup: "Sort [3, 7, 1, 4] with pivot 3.",
    input: "[3, 7, 1, 4]",
    steps: [
      "Pivot 3. Left: [1]. Right: [7, 4].",
      "Right side pivot 7 → [4] and [].",
      "Glue: [1] + 3 + [4, 7].",
    ],
    result: "Fast on average. Worst case is already-sorted data if you always pick a bad pivot — randomize.",
  },
  "dsa:kadane": {
    easy: "Walk the array once. At each number decide: add it to the streak, or start a new streak here.",
    setup: "Max sum of a contiguous slice.",
    input: "[-2, 1, -3, 4, -1, 2, 1]",
    steps: [
      "At 1, start streak 1.",
      "1 + -3 = -2, worse than starting over later.",
      "Hit 4: start 4. Then 4-1+2+1 = 6. Best.",
    ],
    result: "Answer 6 from [4, -1, 2, 1]. One pass, O(1) extra space.",
  },
  "dsa:lru-cache": {
    easy: "A backpack with a max size. Newest thing you used stays on top. When full, the thing you have not touched in the longest time falls out.",
    setup: "Capacity 2. Get and put.",
    input: "put(1,a), put(2,b), get(1), put(3,c)",
    steps: [
      "Store 1 and 2.",
      "get(1) — 1 is now most recent. 2 is oldest.",
      "put(3) — backpack full, evict 2.",
    ],
    result: "Cache has 1 and 3. Hash map + linked list makes get/put O(1).",
  },
  "dsa:union-find": {
    easy: "Circles of friends. union(a,b) means they become one circle. find(a) tells you which circle a is in.",
    setup: "Are 1 and 4 in the same group after some friendships?",
    input: "union(1,2), union(2,3), union(4,5)",
    steps: [
      "1-2-3 is one circle. 4-5 is another.",
      "find(1) and find(3) match.",
      "find(1) and find(4) do not.",
    ],
    result: "Used for “are these connected?” and Kruskal’s MST. Path compression keeps it almost O(1).",
  },
  "dsa:knapsack-01": {
    easy: "A backpack that can take each item at most once. For every item you ask: take it, or skip it, and remember the best leftover capacity.",
    setup: "Capacity 5. Items (weight, value): (2,3), (3,4), (4,5).",
    input: "W=5",
    steps: [
      "Skip all → value 0.",
      "Take (2,3) + (3,4) = weight 5, value 7.",
      "Take (4,5) alone = 5. Worse than 7.",
    ],
    result: "Best is 7. DP table stores “best value at this leftover weight.”",
  },
  "hld:cap-theorem": {
    easy: "If the network splits, you must choose: keep serving maybe-stale data (Availability) or refuse until you are sure (Consistency). You cannot fully have both during a partition.",
    setup: "Two shops share one inventory. The phone line between them dies.",
    input: "One leftover T-shirt",
    steps: [
      "CP: both shops stop selling until the line is back — no double sell, unhappy customers.",
      "AP: both shops sell the shirt — customers happy now, you owe someone later.",
    ],
    result: "Say which pain you accept. PACELC adds: even without a split, latency vs consistency is still a trade.",
  },
  "hld:consistent-hashing": {
    easy: "Put servers and keys on a ring. A key belongs to the next server clockwise. Add a server and only nearby keys move — not everything.",
    setup: "3 caches, then you add a 4th.",
    input: "Keys A–Z on a circle",
    steps: [
      "Key M maps to server 2.",
      "Insert server 4 between 2 and 3.",
      "Only keys that used to land on 3 and now hit 4 move.",
    ],
    result: "Resharding stays small. Virtual nodes stop one server from owning a huge arc.",
  },
  "hld:url-shortener": {
    easy: "Turn a long link into a short code, save the pair, and when someone opens the short link, send them to the long one — fast, with a cache.",
    setup: "mint bit.ly/x7k and redirect.",
    input: "POST long URL → code. GET /x7k → 302",
    steps: [
      "Make a unique code (Snowflake → base62).",
      "Save code → long URL.",
      "On read: Redis first, then database, then redirect.",
    ],
    result: "Writes are rare. Reads are huge. Cache the redirect path.",
  },
  "hld:load-balancers": {
    easy: "A receptionist who hands each visitor to a free clerk so no one clerk is crushed.",
    setup: "10,000 requests/sec, 20 app boxes.",
    input: "L7 load balancer in front",
    steps: [
      "Health-check the boxes.",
      "Send the next request to a healthy one (least connections or round-robin).",
      "If a box dies, stop sending it work.",
    ],
    result: "Users see one URL. You scale by adding clerks, not a bigger receptionist.",
  },
  "lld:parking-lot": {
    easy: "A lot owns floors and spots. A car asks for a matching free spot, gets a ticket, and pays a fee policy when it leaves.",
    setup: "One compact car arrives.",
    input: "park(compact) → ticket. unpark(ticket) → fee",
    steps: [
      "Find a free compact (or larger) spot.",
      "Mark it occupied, issue a ticket.",
      "On leave, fee policy prices the stay, then free the spot.",
    ],
    result: "New vehicle types or weekend prices are new policies — you do not rewrite park().",
  },
  "lld:strategy-pattern": {
    easy: "Put “the thing that can change” behind a small interface. Swap the brain without rewriting the body.",
    setup: "Checkout can pay with card or wallet.",
    input: "Pay(amount, method)",
    steps: [
      "Checkout calls payment.charge(amount).",
      "CardStrategy talks to Stripe.",
      "Tomorrow you add UpiStrategy — Checkout stays the same.",
    ],
    result: "Open/Closed in one picture: add a class, do not edit a switch.",
  },
  "lld:observer-pattern": {
    easy: "One object yells “I changed.” Anyone who subscribed gets a ping. The yeller does not know their names.",
    setup: "Stock price updates a chart and a phone alert.",
    input: "price = 102",
    steps: [
      "Ticker.setPrice(102).",
      "Chart redraws.",
      "Alert checks a threshold.",
    ],
    result: "Add a logger later without editing Ticker.",
  },
  "lld:solid-srp": {
    easy: "A class should have one reason to change. Invoice math should not also send email.",
    setup: "You change email templates every week, tax rules once a year.",
    input: "Invoice vs Mailer",
    steps: [
      "Invoice computes totals.",
      "Mailer sends PDF.",
      "Template change never risks tax bugs.",
    ],
    result: "Smaller tests, safer edits.",
  },
};
