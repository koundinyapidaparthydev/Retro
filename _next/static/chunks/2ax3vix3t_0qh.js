(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,86848,e=>{"use strict";var t=e.i(43476),a=e.i(71645);e.s(["JsPlayground",0,function({run:e}){let[s,o]=(0,a.useState)(0),[n,i]=(0,a.useState)(!0);return(0,a.useEffect)(()=>{if(!n||s>=e.logs.length)return;let t=window.setTimeout(()=>o(e=>e+1),850);return()=>window.clearTimeout(t)},[n,s,e.logs.length]),(0,t.jsxs)("div",{className:"overflow-hidden rounded-2xl border border-line",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between bg-ink px-4 py-2",children:[(0,t.jsx)("p",{className:"text-xs font-medium tracking-wide text-paper",children:e.title}),(0,t.jsx)("button",{type:"button",onClick:()=>{o(0),i(!0)},className:"rounded-full bg-accent px-3 py-1 text-xs font-medium text-white",children:"Run again"})]}),(0,t.jsxs)("div",{className:"grid lg:grid-cols-2",children:[(0,t.jsx)("pre",{className:"overflow-x-auto bg-[#0f172a] p-4 text-[13px] leading-6 text-[#e2e8f0]",children:(0,t.jsx)("code",{children:e.code})}),(0,t.jsxs)("div",{className:"min-h-48 bg-[#020617] p-4 font-mono text-[13px] leading-6 text-[#86efac]",children:[(0,t.jsx)("div",{className:"mb-2 text-[11px] uppercase tracking-wide text-[#64748b]",children:"Console"}),e.logs.slice(0,s).map((e,a)=>(0,t.jsxs)("div",{className:"whitespace-pre-wrap",children:[(0,t.jsxs)("span",{className:"text-[#64748b]",children:[">"," "]}),e]},`${e}-${a}`)),s<e.logs.length?(0,t.jsx)("div",{className:"animate-pulse text-[#64748b]",children:"▋"}):(0,t.jsx)("div",{className:"mt-2 text-[#64748b]",children:"Process finished"})]})]})]})}])},15744,e=>{"use strict";var t=e.i(43476),a=e.i(71645);let s="retro-progress-v1";function o(e,t){return`${e}:${t}`}function n(){try{let e=window.localStorage.getItem(s);return e?JSON.parse(e):{}}catch{return{}}}function i(e,t){return n()[o(e,t)]??"unread"}let r=[{id:"unread",label:"Unread"},{id:"learning",label:"Learning"},{id:"known",label:"Known"}];e.s(["ProgressToggle",0,function({track:e,slug:l}){let[c,h]=(0,a.useState)("unread");return(0,a.useEffect)(()=>{h(i(e,l));let t=()=>h(i(e,l));return window.addEventListener("retro-progress",t),window.addEventListener("storage",t),()=>{window.removeEventListener("retro-progress",t),window.removeEventListener("storage",t)}},[e,l]),(0,t.jsx)("div",{className:"flex flex-wrap gap-1.5 text-sm",children:r.map(a=>(0,t.jsx)("button",{type:"button",onClick:()=>{var t;let i;t=a.id,i=n(),"unread"===t?delete i[o(e,l)]:i[o(e,l)]=t,window.localStorage.setItem(s,JSON.stringify(i)),window.dispatchEvent(new Event("retro-progress")),h(a.id)},className:`rounded-full px-3 py-1 ${c===a.id?"known"===a.id?"bg-mint text-white":"learning"===a.id?"bg-accent text-white":"bg-ink text-white":"border border-line bg-white text-slate hover:text-ink"}`,children:a.label},a.id))})}],15744)},29480,e=>{"use strict";var t=e.i(43476),a=e.i(71645),s=e.i(47911);function o(e,t,a,s){return{given:e,find:t,example:a,askedAs:s}}let n={kadane:o("You get a list of numbers. Some can be negative. You must pick one continuous stretch — no skipping cells in the middle.","Which stretch adds up to the biggest total? Return that total (and later, the start and end index).","[-2, 1, -3, 4, -1, 2, 1] → pick [4, -1, 2, 1] = 6. Not [1] and [4,…] separately — they are not one stretch.",["Find the maximum sum of any contiguous subarray.","The array can be all negative. What do you return?","Now also return the start and end index of that stretch."]),"two-pointers":o("A sorted array of numbers, and a target sum.","Are there two different positions whose values add to the target? Do it in one pass, not every pair.","[1, 2, 4, 7, 11], target 11 → 4 + 7. You do not try 1+2, 1+4, 1+7…",["Two numbers in a sorted array that add to target.","Do it in O(n) time and O(1) extra space.","Same idea, but three numbers (3-sum)."]),"binary-search":o("A sorted array. You may jump to any index in O(1).","Does this number exist? If yes, at which index? Faster than checking every cell.","[1, 3, 5, 7, 9, 11, 13], find 9 → index 4 after three mid checks, not seven scans.",["Find a target in a sorted array in O(log n).","Return the first index of the target if it repeats.","The array is sorted, then rotated. Still log n."]),bfs:o("A graph or grid. Every step costs the same (one hop).","Fewest hops from start to target. Not a weighted fastest path — just hop count.","A→B, A→C, B→D. Start A, find D. Answer is 2 (A-B-D), not a deep walk.",["Shortest path in a maze. Walls are #.","Word ladder: change one letter at a time.","Rotting oranges: many starts at once."]),"two-sum":o("An unsorted array and a target. You may use extra memory.","Two indices whose values add to the target.","[2, 7, 11, 15], target 9 → [0, 1]. The array is not sorted, so you cannot use two fingers.",["Return the two indices that add to target.","What if the array is sorted? (then two pointers, no Map)"]),"prefix-sum":o("An array of numbers. You will be asked many range sums: “what is A[L] + … + A[R]?”","Answer each range in O(1) after a short setup. Do not rescan the slice every time.","[2, 1, 3, 4], range [1, 3] → 1+3+4 = 8. If prefix is [0,2,3,6,10], answer is prefix[4]−prefix[1].",["How many range-sum queries can you answer after one pass?","Subarray sum equals k — how does a prefix map help?"]),"sliding-window-fixed":o("An array and a window size k. The window must stay contiguous.","The best score of any k neighbors — usually max sum — without rebuilding the window from scratch.","[2, 1, 5, 1, 3, 2], k=3 → [5,1,3]=9 is best. Slide: drop the left, add the right.",["Maximum sum of any k consecutive numbers.","Average of each window of size k."]),"sliding-window-variable":o("An array (or string) and a budget — longest stretch that still obeys a rule.","The longest (or shortest) contiguous window that stays valid. The window grows and shrinks.","Longest substring with at most 2 distinct letters: “eceba” → “ece” length 3.",["Longest substring with at most k distinct characters.","Smallest subarray whose sum is at least S."]),dfs:o("A graph or maze. You may dive down one path before trying the next.","Does a path exist? Visit every node? Not “fewest hops” — that is a different question.","A→B→D dead end, back to A→C. Order might be A, B, D, C.",["Is there a path from start to exit?","Number of islands — flood one land mass at a time."]),dijkstra:o("A graph where each road has a different cost. No negative costs.","Cheapest total cost from start to every node (or to a target). Not hop count.","A-B=1, A-C=4, B-C=1. Start A. Best to C is A-B-C = 2, not the direct 4.",["Shortest time on a weighted map. Edges are positive.","Why can't you use a plain queue here?"]),"lru-cache":o("A cache that can hold only k keys. Gets and puts must be fast.","When it is full, throw out the key that has not been touched for the longest time.","Capacity 2: put(1), put(2), get(1), put(3) → 2 is gone. 1 was touched, so it stayed.",["Design get and put in O(1).","Which key leaves when the backpack is full?"]),"knapsack-01":o("Items with a weight and a value. A bag with a weight cap. Each item at most once.","The best total value that still fits.","Weights [1,2,3], values [6,10,12], cap 5 → take 2 and 3 = 22, not all three.",["Max value with a weight cap, each item once.","Can we split this array into two equal sums?"]),"merge-sort":o("An unsorted array. You may use extra memory.","Sort it by splitting in half, sorting each half, then merging two sorted lists.","[4, 1, 3, 2] → [1,4] and [2,3] → merge to [1,2,3,4]. Always n log n.",["Sort this array. What if they ask for a stable sort?","Count inversions while you sort."]),"valid-parentheses":o("A string of brackets: ( ) [ ] { }.","Is every opener closed by the right type, in the right order?","([{}]) is good. ([)] is not — they cross. (() is not — one left open.",["Is this bracket string valid?","Longest valid parentheses substring."]),"interval-scheduling":o("A list of meetings, each with a start and end. One room.","The largest set of meetings that do not overlap.","[(1,4),(2,3),(3,5)] → pick (2,3) and maybe (3,5), not (1,4) plus (2,3).",["Maximum number of non-overlapping intervals.","Minimum rooms so nobody waits (that's a different question)."])},i={kadane:o("You get a list of numbers. Some can be negative. You must pick one continuous stretch — no skipping cells.","Which stretch adds up to the biggest total? Return that total.","[-2, 1, -3, 4, -1, 2, 1] → pick [4, -1, 2, 1] = 6. Not [1] and [4,…] separately — they are not one stretch.",["Find the maximum sum of any contiguous subarray.","The array can be all negative. What do you return?","Now also return the start and end index of that stretch."]),"prefix-sum":o("An array of numbers. You will be asked many questions of the form “what is A[L] + … + A[R]?”","Answer each range in constant time after a short setup. Do not rescan the slice every query.","[2, 1, 3, 4], range [1, 3] → 1+3+4 = 8. After a setup of [0, 2, 3, 6, 10], that is 10 − 2.",["Answer many range-sum queries after one pass.","Find an index where the left-hand sum equals the right-hand sum.","How many contiguous stretches add to exactly k?"]),"difference-array":o("An array starts as zeros (or given values). You get many updates: “add v to every cell from L through R.”","After all updates, produce the final array. Do not walk each range on every update.","n = 5. Add 2 on [1, 3], then add 3 on [2, 4] → [0, 2, 5, 5, 3].",["Apply many range increments, then print the array.","Bookings add seats on flights [from, to]. How many seats does each flight need?","Each car trip adds one passenger from start to end. Does the road ever exceed capacity?"]),"prefix-2d":o("A grid of numbers. You will be asked many rectangle totals: the block from (r1, c1) to (r2, c2).","Answer each rectangle in constant time after a short setup. Do not loop the block every query.","[[1, 2], [3, 4]]. Whole grid sums to 10. The top-left cell alone is 1. The bottom-right 2×1 is 2+4 = 6.",["Many rectangle sums on a static matrix.","How many sub-rectangles add to a given target?","You only have one query. Do you still precompute?"]),"rotate-array":o("An array of n numbers and an integer k. k may be larger than n.","Move every value k steps to the right, wrapping the overflow to the front. Prefer little extra memory.","[1, 2, 3, 4, 5, 6, 7], k = 3 → [5, 6, 7, 1, 2, 3, 4].",["Rotate the array right by k in place.","What if k is a billion?","Now rotate a square image 90° clockwise."]),"spiral-matrix":o("An m-by-n grid of numbers.","List every cell once, walking the outer frame right, down, left, up, then the next inner frame.","[[1, 2, 3], [4, 5, 6], [7, 8, 9]] → [1, 2, 3, 6, 9, 8, 7, 4, 5].",["Read the matrix in spiral order.","Fill 1 through n² into an n-by-n grid in the same walk.","What about a single row, a single column, or a 1-by-1?"]),"set-matrix-zeroes":o("A grid of numbers. If any cell is 0, its whole row and its whole column must become 0.","Do this in place. A 0 you just wrote must not wipe extra rows that were never originally zero.","[[1, 1, 1], [1, 0, 1], [1, 1, 1]] → [[1, 0, 1], [0, 0, 0], [1, 0, 1]].",["Zero every row and column that contains a 0.","Can you do it with only a few extra variables?","What goes wrong if you zero a row the moment you see a 0?"]),"dutch-flag":o("An array whose values are only 0, 1, and 2, in any order.","Rearrange so all 0s come first, then 1s, then 2s. Prefer one pass and constant extra space.","[2, 0, 2, 1, 1, 0] → [0, 0, 1, 1, 2, 2].",["Sort an array of three colors in one pass.","After you swap a 2 in, do you still look at the value that landed there?","They need the original relative order of equal values. Does your answer still work?"]),"boyer-moore-majority":o("An array of n values. One value may appear more than n/2 times.","Return that majority value using only a few extra variables, not a frequency table. If a majority is not promised, say so.","[2, 2, 1, 1, 1, 2, 2] → 2 (it appears 4 times out of 7).",["Find the value that appears more than half the time.","A majority is not guaranteed. What do you return?","Now find every value that appears more than n/3 times."]),"frequency-map":o("A list of values, or two strings. You care how often each value appears.","Use those counts to answer “duplicate? anagram? can I build this from that bag of letters?”","“anagram” and “nagaram” match (same letter counts). “rat” and “car” do not.",["Can the magazine letters build the ransom note?","Are these two words anagrams?","What are the k most common values?"]),"two-sum":o("An unsorted array and a target. You may use extra memory.","Two different indices whose values add to the target.","[2, 7, 11, 15], target 9 → [0, 1]. The array is not sorted.",["Return the two indices that add to target.","The array is already sorted and you cannot use extra memory.","Now find all unique triplets that add to 0."]),"prefix-hashmap":o("An array that may contain negatives, and a target k. You want contiguous stretches.","How many subarrays add to exactly k? A window that only shrinks from the left will miss answers here.","[1, 2, 3], k = 3 → two stretches: [1, 2] and [3].",["Count contiguous stretches whose sum is k.","Longest stretch with equally many zeros and ones.","Same question, but the stretch’s XOR equals k."]),"group-anagrams":o("A list of words.","Bucket together the words that are rearrangements of the same letters. Return the groups.",'["eat", "tea", "tan", "ate", "nat", "bat"] → [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]].',["Group words that use the same letters.","Your grouping key must not put “aba” and “aad” in the same bucket.","Now group strings that are letter-shifts of each other (abc with bcd)."]),"longest-consecutive":o("An unsorted list of integers. Order in the list does not matter. Duplicates do not extend a run.","The length of the longest run of values that differ by 1 (like 1, 2, 3, 4). Faster than sorting if you can.","[100, 4, 200, 1, 3, 2] → 4, because 1, 2, 3, 4 all appear.",["Longest consecutive value run, ignoring array order.","You may not use extra memory. What is the honest bound?","Why is walking forward from every number too slow?"]),"design-hashmap":o("You may not use the language’s map. Keys are integers. Collisions will happen.","Support put, get, and remove so typical calls stay fast even when two keys land in the same slot.","put(1, 10), put(2, 20), get(1) → 10. remove(2), get(2) → miss.",["Design put, get, and remove without a built-in map.","Two keys land in the same slot. What happens?","The table is getting full. What do you do next?"]),"two-pointers":o("A sorted array of numbers, and a target sum.","Are there two different positions whose values add to the target? Do it in one pass, not every pair.","[1, 2, 4, 7, 11], target 11 → 4 + 7. You do not try 1+2, 1+4, 1+7…",["Two numbers in a sorted array that add to target.","Linear time and constant extra space.","Same idea, but three numbers that add to 0."]),"sliding-window-fixed":o("An array and a window size k. The window must stay contiguous.","The best score of any k neighbors — usually the max sum — without rebuilding each window from scratch.","[2, 1, 5, 1, 3, 2], k = 3 → [5, 1, 3] = 9 is best. Slide: drop the left, add the right.",["Maximum sum of any k consecutive numbers.","The average of each window of size k.","The maximum value in every window of size k."]),"sliding-window-variable":o("An array or string and a rule the stretch must obey — at most k distinct letters, sum at least S, and the like.","The longest (or shortest) contiguous window that stays valid. The window grows on the right and shrinks on the left.","Longest substring with at most 2 distinct letters: “eceba” → “ece”, length 3.",["Longest substring with at most k distinct characters.","Smallest subarray whose sum is at least S (all positives).","Longest run of ones if you may flip at most k zeros."]),"fast-slow-pointers":o("A singly linked list. You may not count the length first, and you get only a few extra pointers.","Does the list loop back on itself? If so, where does the loop start? Or: which node is in the middle?","1→2→3→4→5, and 5 points back to 3. There is a cycle; it starts at 3. Middle of 1→2→3→4→5 is 3.",["Does this linked list contain a cycle?","Return the node where the cycle begins.","Find the middle node, or the nth from the end, in one pass."]),"linear-search":o("An unsorted list, or a stream you can only read forward. A target value, or a yes/no test.","The first index that matches, or a miss. You cannot jump to the middle.","[4, 9, 1, 7, 2], find 7 → index 3. Find 8 → not found.",["Find the first even number; return -1 if none.","Return the last occurrence, not the first.","The data is a linked list — you have no random index."]),"binary-search":o("A sorted array. You may jump to any index instantly.","Does this number exist? If yes, at which index? Faster than checking every cell.","[1, 3, 5, 7, 9, 11, 13], find 9 → index 4 after a few mid checks, not seven scans.",["Find a target in a sorted array faster than a full scan.","Return the first index if the target repeats.","The array is sorted, then rotated. Still faster than linear."]),"binary-search-bounds":o("A sorted array that may contain duplicates, and a target t.","The leftmost and rightmost index of t, or a miss. Do not walk outward from a random hit — a long run of t would be linear.","[5, 7, 7, 8, 8, 10], t = 8 → first index 3, last index 4. t = 6 → not found.",["First and last position of a target in a sorted array.","How many times does t appear?","How many values fall in [L, R]?"]),"peak-finding":o("An array of numbers. A peak is a cell ≥ its neighbors; the two ends have one neighbor each.","Any peak index. You do not need the global max. Faster than scanning every cell.","[1, 2, 3, 1] → index 2 (value 3). [1, 2, 1, 3, 5, 6, 4] → index 2 or 5 are both fine.",["Find any index that is higher than its neighbors.","The array rises then falls. Find the top.","Same question on a grid: a cell greater than its four neighbors."]),"search-rotated-array":o("An array that was sorted increasing, then rotated at some unknown pivot. A target t.","The index of t, or a miss, faster than a full scan.","[4, 5, 6, 7, 0, 1, 2], t = 0 → index 4. t = 3 → not found.",["Find a target in a sorted array that was rotated.","Find the smallest value — the rotation seam.","Values can repeat. Do you still have a log n guarantee?"]),"binary-search-on-answer":o("You need the smallest (or largest) number k that makes a check succeed. If k works, every larger k also works — or the reverse.","That boundary k. You may not try every possible k; the range can be up to a billion.","Piles [3, 6, 7, 11], 8 hours. Slowest eat speed that still finishes: 4. Speed 3 is too slow; 4 is just enough.",["Minimum eating speed to finish all piles in h hours.","Split the array into m pieces; minimize the largest piece sum.","Place cows in stalls so the closest pair is as far apart as possible."]),"ternary-search":o("A cost that depends on an integer k. The cost falls, then rises — one valley. You can evaluate cost(k).","The k that minimizes the cost. There is no simple yes/no cutoff that stays false and then stays true.","cost(1)=10, cost(2)=6, cost(3)=5, cost(4)=7, cost(5)=12 → best k is 3 (cost 5).",["Find the integer k that minimizes this down-then-up cost.","Pick a meeting point on a line that minimizes total travel.","The sample looks mountain-shaped. What if there are two valleys?"]),"interpolation-search":o("A sorted array of numbers spread roughly evenly from first to last. A target t.","The index of t. You may guess nearer the front when t is close to the first value, instead of always jumping to the middle.","[10, 20, 30, 40, 50, 60, 70], find 60. A uniform guess lands near index 5, not the middle 3.",["Find a target in a uniformly spaced sorted list with fewer probes than always taking mid.","What if the values grow as 1, 2, 4, 8, …?","The keys are strings. Can you still guess an index?"]),"exponential-search":o("A sorted list whose length you do not know — or get(i) fails past the end. A target t.","The index of t. First find a window that must contain it, then search only that window.","Sorted values 1, 2, 3, … Find 13. You check indices 1, 2, 4, 8, 16, then search only 8..16.",["Find a target in a sorted array of unknown size.","get(i) throws if i is past the end. Still find t.","The target is near the front of a huge sorted array."])},r={"bubble-sort":o("An array of numbers. You may only swap two neighbors at a time.","Put the values in non-decreasing order. After each full pass, the next-largest leftover should already sit at the end.","[3, 1, 2] → swap 3 with 1 → [1, 3, 2] → swap 3 with 2 → [1, 2, 3]. Two neighbor swaps.",["Sort by swapping adjacent out-of-order pairs.","How many swaps did you do? What does that count mean?","The array is already sorted. Can you stop after one pass?"]),"selection-sort":o("An array of numbers. Writes are expensive; reads are cheap.","Sort it with as few writes as you can: for each index, put the right value there once.","[4, 1, 3, 2] → swap 4 with 1 → [1, 4, 3, 2] → next min 2 swaps into index 1 → [1, 2, 3, 4].",["For each seat, find the smallest remaining value and put it there.","How many swaps do you need in the worst case?","Equal keys get swapped past each other. Does the prompt require original order?"]),"insertion-sort":o("A short array, or one that is already almost in order. Values can be treated as arriving one by one.","Keep a growing sorted prefix and slide each new value left into its hole. Return the sorted array.","[3, 1, 2] → insert 1 before 3 → [1, 3, 2] → slide 2 between them → [1, 2, 3].",["Sort this nearly-sorted list.","Each item is at most k seats from home. How does the time change?","Do the same on a singly linked list."]),"merge-sort":o("An unsorted array of numbers. You may use a second array of the same length.","Return the values in non-decreasing order. Equal keys must keep their original order, and a reversed input must not get slower than a random one.","[4, 1, 3, 2] → [1, 2, 3, 4]. Halves [4, 1] and [3, 2] become [1, 4] and [2, 3], then one combined list.",["Sort this array. Ties must keep their original order.","Count how many pairs are out of order while you sort.","Now the input is a linked list — still sort it without a second array of values."]),"quick-sort":o("An array of numbers. You may rearrange it in place; extra memory should stay small.","The values in non-decreasing order. After you pick one splitter value, everything smaller sits left of it and everything larger sits right.","[3, 7, 1, 4] with splitter 3 → [1, 3, 7, 4], then each side is finished the same way → [1, 3, 4, 7].",["Sort this array in place.","The array is already sorted. What goes wrong if the splitter is always the first cell?","Same splitter idea, but return only the k-th largest — not a full sort."]),"randomized-quicksort":o("An array you will sort in place. The input might be sorted, reversed, or chosen by someone who knows your usual splitter rule.","A sorted array whose runtime does not collapse just because of the input order. Every input should be fast in expectation.","[1, 2, 3, 4, 5] with a random splitter, not always 1. Expected work stays about n log n, not 15 pairwise passes.",["Sort in place so a sorted or reversed input is not a disaster.","Expected n log n on every array — not 'average over random arrays.' What did you change?","They want a hard cap, not a lucky splitter. What do you switch to when the tree gets too deep?"]),"three-way-quicksort":o("An array whose values are only 0, 1, and 2 — or many duplicates of a few keys.","The same values grouped in order: all 0s, then 1s, then 2s. One pass, in place. Do not re-process the equals.","[2, 0, 2, 1, 1, 0] → [0, 0, 1, 1, 2, 2].",["Rearrange 0/1/2 in one pass with constant extra space.","Ten million records, but the key is a status enum with three values. How do you sort?","Keys are all distinct. Is the extra third bucket still worth it?"]),"heap-sort":o("An array you must sort in place. You get only a handful of extra variables, and the time must stay n log n even on a sorted or reversed input.","The same numbers in non-decreasing order. After each extraction the next-largest value sits in the shrinking suffix.","[3, 1, 4, 2] → [1, 2, 3, 4]. First extraction parks 4 at the end; then 3, then 2.",["Sort in place with a hard n log n cap — no quadratic cliff.","You already have the parent-beats-children layout. How do you emit the sorted array?","Why is building that layout linear, not n inserts?"]),"counting-sort":o("n integers whose keys all lie in a small known range, say 0..k. Some items carry extra data (a name with a score).","The items in order by that integer key. Equal keys must keep their original order.","scores [2, 0, 2, 1] with names A, B, C, D → B, D, A, C. The two 2s stay A before C.",["Sort these ages / grades / bytes. The range is tiny.","Items have payloads. Equal scores must keep arrival order.","Keys can be negative. How do you index the tallies?"]),"radix-sort":o("n integers, each up to 32 bits — or equal-length digit strings.","The numbers in increasing order. Digit width is small, so you should beat a comparison sort.","[170, 45, 75, 90] → [45, 75, 90, 170].",["Sort these 32-bit IDs faster than n log n comparisons.","Each digit pass must keep earlier digit order. What happens if a pass is unstable?","The integers are signed. Where do the negatives go?"]),"bucket-sort":o("n real numbers spread fairly evenly in a known interval, such as [0, 1).","The numbers in increasing order. If the spread is uniform, expected time should be linear.","[0.42, 0.32, 0.23, 0.52, 0.82] → [0.23, 0.32, 0.42, 0.52, 0.82].",["Sort uniform random floats in a known range.","What if almost every value piles into one bin?","The keys are integers in 0..100. Is a bin per key simpler?"]),"cycle-sort":o("An array of n integers. Each value is supposed to sit in 1..n, but one number is missing, one is duplicated — or you need the first missing positive.","The missing number (or every duplicate). Use the array itself as seats: value v belongs at index v-1. No extra set.","[3, 1, 3, 4] for range 1..4 → 3 sits twice, 2 is missing. Return 2.",["Array of n values in 1..n. Find the missing one, in place.","Find every value that appears twice.","First missing positive. Negatives and zeros are not seats."]),"next-greater-element":o("An array of temperatures (or prices). For each day you may look only to the right.","For every index, the first later value that is strictly larger — or -1 if none exists.","[2, 1, 2, 4, 3] → [4, 2, 4, -1, -1].",["Next warmer day for each temperature. Return the wait in days.","The array is circular — wrap once.","Now previous greater on the left as well."]),"valid-parentheses":o("A string of brackets: ( ) [ ] { }.","Is every opener closed by the matching type, in the right nesting order?","([{}]) is valid. ([)] is not — they cross. (() is not — one left open.",["Is this bracket string valid?","Longest valid parentheses substring.","Delete the fewest brackets so the rest is valid."]),"min-stack":o("A stack of integers. You must support push, pop, top, and 'what is the current minimum?'","All four operations in O(1). Scanning the whole stack for the min is too slow.","push 3, push 5, push 2, getMin → 2. pop, getMin → 3.",["Design a stack with O(1) getMin.","Two 2s are on the stack. You pop one. What is getMin?","Same idea, but also popMax in a later follow-up."]),"monotonic-stack":o("An array. For every index you need the nearest smaller (or larger) neighbor on the left and/or the right.","Those neighbor indices for every position, in one left-to-right pass — not a nested scan.","[2, 1, 5, 6, 2, 3], previous smaller indices → [-1, -1, 1, 2, 1, 4].",["Nearest smaller to the left and right for every bar.","Sum of minimums of every subarray.","Remove k digits so the remaining number is the smallest possible."]),"monotonic-queue":o("A stream of numbers and a window width k. You need the window extreme after every arrival.","The max (or min) of the last k values, in total linear time — not a heap per window.","[1, 3, -1, -3, 5], k=3 → window maxima 3, 3, 5.",["Max of the last k measurements, online.","Longest stretch whose max − min is at most limit.","DP of the form dp[i] = A[i] + max(dp[i-k..i-1])."]),"largest-rectangle-histogram":o("A row of bars. Bar i has height h[i] and width 1. A rectangle must sit on the baseline and stay under the bars.","The largest area of any such rectangle.","heights [2, 1, 5, 6, 2, 3] → 10 (the 5×2 block sitting on the 5 and the 6).",["Largest rectangle under this histogram.","A binary matrix of 0/1. Largest rectangle of 1s.","What is the width for bar i once you know the nearest shorter walls?"]),"sliding-window-max":o("An array and a window size k. The window slides one step at a time and must stay contiguous.","The maximum value inside each window. There are n−k+1 answers.","[1, 3, -1, -3, 5, 3, 6, 7], k=3 → [3, 3, 5, 5, 6, 7].",["Max of every window of size k, in linear time.","Same question for the minimum.","You only have a heap. What complexity do you get, and can you beat it?"]),"bfs-dfs-iterative":o("A graph or grid. You must walk every reachable cell. Recursion depth might be 10^5, so the call stack may explode.","Visit order if you expand nearest-first (fewest hops) versus dive-deep-first. For the nearest-first walk, also the hop distance from the start.","Start A with edges A→B, A→C, B→D. Nearest-first visits A, B, C, then D; hop count to D is 2. Dive-deep may go A, B, D, then C.",["Minimum steps in a maze. Walls are #.","Rewrite the recursive flood-fill with an explicit stack.","Number of islands, then nearest 0 in a matrix (many starts at once)."]),"circular-queue":o("A fixed-length buffer of capacity k. Producers enqueue, consumers dequeue. You may not shift the whole array.","Support enqueue, dequeue, front, rear, isEmpty, isFull — all O(1).","cap 3: enq 1, enq 2, enq 3, deq → 1, enq 4. Buffer holds 2, 3, 4. The next enqueue fails (full).",["Design a ring buffer with a fixed array.","When head equals tail, is it empty or full? State the invariant.","Same structure, but insert and delete at both ends."]),deque:o("A sequence that must accept inserts and deletes at both the front and the back.","All four end operations in O(1). Popping the front of a plain dynamic array is not O(1).","pushBack 1, pushFront 2, popBack → 1, popFront → 2. The sequence is empty.",["Implement a double-ended queue.","Edges weigh only 0 or 1. Where do you insert the 0-weight neighbor?","Check a palindrome by eating both ends."]),heapify:o("An array of n numbers already in memory. Index i’s children sit at 2i+1 and 2i+2. You want every parent to beat both children.","Rearrange the array in place so that parent-child rule holds. Building it should be linear, not n single inserts.","[3, 1, 6, 5, 2, 4] as a max-tree → [6, 5, 4, 1, 2, 3] is one valid layout. Root 6 is the max; 5 and 4 beat their children.",["Turn this array into a parent-beats-children tree in linear time.","Why is n inserts the wrong build?","Write the sink loop. Where is the last parent index?"]),"heap-insert-extract":o("A bag of jobs, each with a priority. You repeatedly insert a new job or take out the current best.","insert and extract-best in O(log n), peek-best in O(1).","insert 4, 1, 7. peek → 7. extract → 7, then peek → 4.",["Implement a priority bag: push, pop-best, peek.","A node’s best score improved. You cannot move the old entry. What do you push, and what do you skip on pop?","Empty pop — throw or return a sentinel?"]),"top-k":o("n numbers and an integer k, with k much smaller than n. The numbers may arrive as a stream.","The k largest values, or the k-th largest. Do not fully sort all n if you can help it.","[3, 1, 5, 12, 2, 11], k=3 → 12, 11, 5. The 3rd largest is 5.",["k-th largest in an array. k is much smaller than n.","k most frequent words after one count pass.","k closest points to the origin."]),"median-stream":o("Numbers arrive one at a time. After each arrival you may be asked for the median so far.","The median after each query: the middle value if the count is odd, the average of the two middles if even. Insert must stay fast.","Stream 1, then 2, then 3 → medians 1, 1.5, 2.",["Running median of a stream.","Even count: average the two middles. Integer division is a trap.","Now a sliding window of size k — you must also delete the aging value."]),"dijkstra-heap":o("A map of cities and roads. Each road has a positive travel time. You start at city S.","The cheapest travel time from S to every other city. A plain hop-count walk is wrong because roads cost different amounts.","S→A=1, S→B=4, A→B=1. Best to B is 2 via A, not the direct 4.",["Shortest time on a weighted map. All edges are positive.","You push a new (time, city) pair whenever a city improves. A later pop is stale — what do you do?","Some roads cost 0 or 1 only. Do you still want a priority bag?"]),huffman:o("A set of symbols and how often each appears. You will encode each symbol as a bit string. No code may be a prefix of another.","An encoding that minimizes total bits (frequency × code length). Same process: minimum cost to merge files when merging a and b costs a+b.","a:3, b:1, c:1 → codes a=0, b=10, c=11. Total bits 3·1+1·2+1·2 = 7. Merge cost (1+1)+(2+3) = 7.",["Minimum cost to connect n ropes / files. Any pair may merge.","Build bit codes so common letters get shorter strings.","Do they want the actual 0/1 strings, or only the total cost?"]),"reverse-linked-list":o("A singly linked list of nodes, each pointing only forward.","The same nodes, reversed, in place. Return the new head.","1→2→3→4 → 4→3→2→1. Empty list and a single node stay themselves.",["Reverse the list. Return the new head.","Reverse only the slice from position left to right.","Reverse every group of k nodes."]),"floyd-cycle":o("A singly linked list that might loop back into an earlier node. You get only a few pointers — no extra set.","Does a loop exist? If yes, which node is the entrance of the loop?","1→2→3→4→2. The loop starts at 2. 1→2→3→null has no loop.",["Does this list have a cycle?","Return the node where the cycle begins.","Array of n values in 1..n. One duplicate. Find it without changing the array."]),"merge-two-lists":o("Two lists whose values are already sorted, e.g. 1→4→5 and 1→2→3→6.","One sorted list made by rewiring the existing nodes, not allocating new ones. On ties, take the first list first.","1→2→4 and 1→3→4 → 1→1→2→3→4→4.",["Merge two sorted lists by pointer rewiring.","One list runs out first. What happens to the leftover tail?","Use this as the combine step to sort one list."]),"merge-k-lists":o("k sorted linked lists. N nodes in total.","One sorted list of all N nodes. Faster than folding them one list at a time (that costs O(Nk)).","[1→4→5], [1→3→4], [2→6] → 1→1→2→3→4→4→5→6.",["Merge k sorted lists.","N vs k: can you get O(N log k)?","Same idea for k sorted arrays: store (value, arrayId, index)."]),"middle-of-list":o("A singly linked list. You should not need a first pass just to count the length.","The middle node. If the length is even, return the second middle.","1→2→3→4→5 → 3. 1→2→3→4 → 3.",["Return the middle node in one pass.","Even length: which middle do they want?","Split the list in half for a later sort — cut the first half’s last next."]),"nth-from-end":o("A singly linked list and an integer n. You may be asked to delete that node.","The n-th node from the tail, in one pass. If n equals the length, that node is the head.","1→2→3→4→5, n=2 → delete 4 → 1→2→3→5.",["Delete the n-th node from the end.","n equals the length — the head goes away. What do you return?","n=1: remove the tail without a stored length."]),"list-intersection":o("Two singly linked lists. They may share a suffix of the same nodes — same objects, not just equal values.","The first shared node, or null if they never join.","A: 1→2→3→4, B: 9→3→4, and node 3 is the same object → return that node. Two lists that both read 1,2,3 but use different nodes → null.",["Find the intersection node by reference, not by value.","Different stem lengths. Do it in O(1) extra space.","No intersection: both walkers must end at null."]),"lru-cache":o("A cache that holds at most k key-value pairs. Both read and write must be O(1).","On a full write, evict the pair that has not been read or written for the longest time.","cap 2: put(1,1), put(2,2), get(1), put(3,3) → key 2 is gone. get(2) misses.",["Design get and put in O(1).","Which key leaves when the backpack is full?","You updated a present key. Does it become the most recent?"]),"tree-traversals":o("A binary tree with a value on each node.","The visit orders: node then children, left-node-right, children then node, and level by level left to right.","Tree 1 with left 2 and right 3. Node-first [1, 2, 3]. Left-node-right [2, 1, 3]. Children-first [2, 3, 1]. Levels [[1], [2, 3]].",["Write left-node-right iteratively — no recursion.","Zigzag level order. Right-side view.","Same four orders on an N-ary tree."]),"tree-height-diameter":o("A binary tree.","The height (longest root-to-leaf). Also the longest path between any two nodes — it may not go through the root.","1 with left 2 and right 3; 2 has left 4. Height 2 edges. Longest path 4–2–1–3 has length 3.",["Maximum depth of the tree.","Longest path between any two nodes, in one walk.","Is the tree height-balanced? Return early on the first bad node."]),lca:o("A tree and two nodes p and q that exist in it.","The deepest node that is an ancestor of both. A node is an ancestor of itself.","Root 3, left 5 (children 6 and 2), right 1. p=6, q=2 → 5. p=5, q=1 → 3.",["Lowest common ancestor in a binary tree.","The tree is a BST. Walk from the root using key order.","Distance between p and q via that ancestor."]),"validate-bst":o("A binary tree of numbers.","Is every node in the left subtree < the node and every node on the right > the node — not just the two children?","10 with left 5 and right 15, and 15 has left 6 → invalid (6 sits on the right of 10). 2 with left 1 and right 3 → valid.",["Is this a valid binary search tree?","Why is 'left child < node < right child' not enough?","Two nodes are swapped. Recover the tree."]),"kth-smallest-bst":o("A binary search tree and a 1-based integer k.","The k-th smallest key. Stop once you have seen k nodes in sorted order — do not dump the whole tree.","Tree 3 with left 1 (right child 2) and right 4. k=1 → 1. k=3 → 3.",["k-th smallest key in a BST.","Many queries. Each node stores its subtree size. Walk down in O(h).","k-th largest — reverse the visit order."]),"serialize-tree":o("A binary tree. You must write it to a string and later rebuild the exact same shape and values.","A pair of functions encode / decode. Null children must be recorded so the shape is unique.","1 with left 2 and right 3; 3 has children 4 and 5. One valid encoding: 1,2,#,#,3,4,#,#,5,#,#.",["Encode and decode a binary tree.","Empty tree. Negative values. Multi-digit values.","The tree is a BST. Can you drop the null markers?"]),"path-sum":o("A binary tree of integers and a target sum.","Does any root-to-leaf path add to the target? Follow-up: count every downward path (any start, any end) that adds to the target.","5 with left 4 (left 11) and right 8. Target 20 → yes (5-4-11). Target 13 → yes (5-8).",["Root-to-leaf path that sums to target?","List every such root-to-leaf path.","Count downward paths that sum to target — not only from the root."]),"max-path-sum":o("A binary tree of integers. Values may be negative. A path is any node-to-node chain; it may bend and need not go through the root.","The largest sum of node values on any path. A single node is a valid path.","1 with left 2 and right 3 → 6 (2-1-3). Root -10 with left 9 and right 20 (children 15, 7) → 42 (15-20-7).",["Maximum path sum in a binary tree.","All values are negative. What do you return?","What do you report upward to the parent versus what you record as a bend?"]),"invert-tree":o("A binary tree.","The mirror image: every left child swapped with its right child. Return the root.","4 with left 2 (1, 3) and right 7 (6, 9) → 4 with left 7 (9, 6) and right 2 (3, 1).",["Mirror the tree.","Is the tree symmetric — equal to its mirror — without building the mirror?","After the swap, flatten it to a right-linked list in node-first order."]),"flatten-binary-tree":o("A binary tree. You must mutate it, not allocate a new list of nodes.","A chain that uses only right pointers, in the original node-first order. Every left pointer is null.","1 with left 2 (3, 4) and right 5 → 1→2→3→4→5, all lefts null.",["Flatten the tree to a right-linked list, in place.","A left-only chain — the nasty case. A right-only chain is already flat.","Do it with a few pointers and no recursion stack."]),"morris-traversal":o("A binary tree. You may not use recursion or an explicit stack. You may temporarily write a child pointer if you put it back.","The left-node-right visit order, using only a handful of pointers. The tree must look unchanged when you finish.","1 with left 2 (4, 5) and right 3 → [4, 2, 5, 1, 3].",["Left-node-right with O(1) extra memory.","You borrowed a right pointer as a return ticket. When do you cut it?","Visit on the first pass instead, and you have node-first order."]),trie:o("A dictionary of words. Callers will ask: is this whole word in the set? Does any word start with this prefix?","insert, search, and startsWith, each in time proportional to the query length — not to how many words you stored.","insert 'app', insert 'apple'. search('app') → true if you marked it a word. startsWith('appl') → true. search('appl') → false.",["Implement a prefix dictionary: insert, search, startsWith.","Replace words in a sentence with their shortest root in the dictionary.","A board of letters: find every stored word that can be walked on the grid."])},l={bfs:o("A maze or map. Every step costs one hop. Walls block you.","Fewest hops from start to the exit. Return the hop count, not a scenic walk.","Start S, exit E. S-open-open-E is 3 hops. A long detour that still reaches E is worse.",["Shortest walk in a maze. Walls are #.","Change one letter at a time until you spell the target word. Fewest words.","Several oranges rot at minute 0. When does the last fresh one rot?"]),dfs:o("A maze or graph. You may follow one corridor all the way before trying the next.","Does a path exist? Can you paint every cell of one region? Not “fewest hops.”","A leads to B then a dead end, then back to A then C. A path to C exists.",["Is there any walk from start to exit?","Paint one blob of land, then the next. How many blobs?","Can these courses be finished, or does a chain loop back?"]),"cycle-undirected":o("Towns linked by two-way roads. You get the road list.","Is there a loop — a walk that returns home without retracing the same road as its only option?","1-2, 2-3, 3-1. Yes, a triangle. 1-2, 2-3, 3-4. No loop.",["These n towns and n roads — which extra road closes a loop?","Is this a tree (connected, no loop)?","A self-road 2-2. Is that a loop?"]),"cycle-directed":o("Courses with one-way “must take A before B” arrows.","Is there a circular wait so nobody can start? Yes or no.","A→B, B→C, C→A. Stuck. A→B, B→C. Fine — take A, then B, then C.",["Can I finish all courses given these prereqs?","Print one loop of courses if one exists.","Which courses are safe — they never lead into a loop?"]),"topo-sort-kahn":o("Jobs with prerequisites. A job is ready only when every arrow into it is done.","An order to run every job. If some jobs never become ready, say it is impossible.","A before C, B before C. Orders A,B,C and B,A,C both work. A←C←A is impossible.",["Give one valid course order.","Give the alphabetically earliest valid order.","How many jobs can start in the first wave (nothing blocking them)?"]),"topo-sort-dfs":o("Same jobs and arrows. You finish a job only after every job that depends on it is finished.","List jobs in that finish order, then reverse it so sources come first. Abort if a job waits on itself.","A→B→C. Finish C, then B, then A. Reverse: A, B, C.",["Order the build so libraries appear before apps that import them.","What if a leftover arrow points back to a job still in progress?","The graph has two separate chains. Both must appear in the order."]),"bfs-shortest-path":o("A map where every corridor is one hop. You need the walk, not only the length.","One shortest hop-path from start to target. If none, say so.","S-a-b-E and S-x-y-z-E. Return S,a,b,E (3 hops), not the longer walk.",["Restore the path through a maze, not just the hop count.","List every shortest word-ladder, not one.","Several doors start open. Distance to the nearest door for every room."]),dijkstra:o("Cities and roads. Each road has a positive toll. No negative tolls.","Cheapest total toll from the start city to the target (or to every city).","A–B costs 1, A–C costs 4, B–C costs 1. Start A. Best to C is A-B-C = 2, not the direct 4.",["Shortest time on a weighted map. All times are positive.","Also print the cheapest route, not only the cost.","What if a road could have a rebate (negative time)?"]),"bellman-ford":o("Same map, but some roads pay you (negative cost). A loop of payments could print money.","Cheapest walk from start, or report that a money-printing loop is reachable.","A→B = 3, B→C = −2, C→B = −1. B-C-B loses more each lap. Flag that loop.",["Cheapest flight with at most k stops (some fares can be a rebate).","Currency rates: can you cycle exchanges and grow money?","Only care about loops you can reach from the start city."]),kruskal:o("A list of possible cables, each with a cost, that can link buildings.","Cheapest set of cables so every building is linked. Skip a cable if its two ends are already linked.","Cables 1-2:1, 2-3:2, 1-3:5. Take 1-2 and 2-3 (cost 3). Skip 1-3.",["Min cost to connect all points on a plane (every pair is a possible cable).","A well can be dug at each house, or houses can share pipes. Cheapest plan.","If you cannot link everyone, say impossible."]),prim:o("You already stand at one building. The rest are dark.","Grow the lit campus by always attaching the cheapest cable that reaches a dark building. Total cost.","Start at 1. Edges 1-2:1, 1-3:100, 2-3:2. Light 2 (cost 1), then 3 via 2 (cost 2). Total 3.",["Same connect-all-points, but you grow from house 0.","The map is a dense grid of pairwise costs. Still grow one campus.","Two clusters never touch. What do you return?"]),"union-find":o("A stream of “these two people are in the same group” facts. Groups merge, they never split.","After the facts, how many groups are left? Or: are Alice and Bob already in one group?","Merge 1-2, merge 3-4, merge 2-3. One group of four. 5 is still alone. Answer 2 groups.",["Number of friend circles / provinces.","Merge email accounts that share an address.","Which extra friendship would close a loop?"]),bipartite:o("People and “these two dislike each other” pairs. You must seat them in two rooms.","Can you assign rooms so every dislike pair sits apart? If someone would sit with a dislike, fail.","1-2, 2-3, 3-1. Triangle of dislikes — impossible. 1-2, 2-3. Rooms {1,3} and {2} work.",["Split into two teams. No friends on the same team (or no enemies).","The graph has several clumps. Check every clump.","Equals may sit together. Only dislike edges matter."]),"connected-components":o("An undirected friendship map (or a 0/1 matrix of “knows”).","How many separate circles exist? Isolated people count as their own circle.","1-2, 3-4, 5 alone. Three circles.",["Number of provinces in an n×n “connected” matrix.","Label each person with a circle id, then answer “same circle?” queries.","Edges arrive over time. How many circles after each edge?"]),islands:o("A grid of land and water. Land touches land up/down/left/right.","How many islands? An island is one blob of connected land.","Two land cells sharing a side → 1 island. Two lands on a diagonal only → 2 islands.",["Count islands.","Area of the largest island.","Flip land that does not touch the border (surrounded regions)."]),"floyd-warshall":o("A small map (dozens of cities). You need a fare between every pair, not one trip.","Cheapest i→j for all i,j. A hop through another city can beat a direct flight.","A-B=3, B-C=1, A-C=10. After allowing B as a stop, A to C is 4.",["For each city, how many others are within a distance threshold?","Can every city reach every other (ignore weights, only yes/no)?","A city with a negative loop back to itself — report it."]),"zero-one-bfs":o("A grid. Stepping on an empty cell is free. Breaking a wall costs 1. No other costs.","Minimum walls you must break to reach the far corner.","A 3×3 with one wall on the shortest empty walk. Break that one wall, or walk around for 0 if a free path exists.",["Min obstacle removals to reach the corner.","Moving forward is free; turning costs 1. Min turns.","Empty is 1 and wall is 0 — same question, flipped labels."]),"bridges-articulation":o("A two-way network of cables. Some cables are the only way between two sides.","List every cable whose removal splits the network. Also: every building whose removal splits it.","1-2, 2-3, 1-3, 3-4. Cable 3-4 is critical. Building 3 is critical. 1-2 is not.",["Critical connections in a network.","Which routers take the intranet down if they fail?","A double cable between the same pair — is it critical?"]),"scc-kosaraju":o("One-way streets. Two intersections are in the same cluster if you can drive A→B and B→A.","List the clusters. After you reverse every street, walking from late-finishing corners finds them.","A↔B, A→C. Clusters {A,B} and {C}. C cannot return to A.",["Compress each cluster to one node. What arrows remain?","A variable and its opposite in the same cluster — the formula is impossible.","How many clusters?"]),"scc-tarjan":o("Same one-way map and the same “can we reach each other” clusters.","Find the clusters in one walk: a corner that cannot reach any ancestor starts a new cluster.","A→B→A, B→C. Pop C first as its own cluster, then {A,B}.",["Same clusters as the two-pass reverse-street version.","2-SAT: unsat if x and not-x share a cluster.","Clusters should come out in reverse build order."]),"euler-path":o("Tickets (or roads) you must use. Each ticket is one flight from city A to city B.","A walk that uses every ticket exactly once. Not “visit every city once” — leftover tickets fail.","Tickets JFK→ATL, ATL→JFK, JFK→SFO. Walk JFK, ATL, JFK, SFO uses all three.",["Reconstruct the itinerary. Prefer the alphabetically earliest next city.","Pairs (a,b) must be chained: the next pair starts where the last ended.","Two leftover unused tickets — the walk was not complete."]),"a-star":o("A huge warehouse grid. You know a safe under-estimate of “how far is left” (no walls, straight-line hops).","A cheapest path to the goal. Prefer cells that look close so you do not light up the whole floor.","Start (0,0), goal (2,2), no walls. Straight-line leftover 4, then 3, … First time you stand on the goal is best.",["Pathfind on a grid with obstacles. Remaining hops if the floor were empty is the hint.","8-puzzle: tiles’ Manhattan distance to home as the leftover guess.","The guess must never oversell. What if it does?"]),"recursion-memo":o("A question that asks the same leftover (index, budget, …) many times down the tree.","Answer the leftover once, remember it, reuse it. Then say how many distinct leftovers you stored.","Ways to climb 4 stairs with 1 or 2. “Ways for 2” is asked from both 3 and 4. Store it: 5 ways for 4.",["Write the raw tree first, then cache on the leftover tuple.","What belongs in the cache key? What happens if you drop a field?","n is 10^5 and the tree is a chain — the call stack is the risk."]),subsets:o("A list of items. For each item you may pack it or leave it.","Every possible packing, including the empty bag. If values repeat, each unique packing once.","[1, 2] → [], [1], [2], [1,2]. [1,1] unique → [], [1], [1,1].",["All subsets.","Unique subsets when the input has duplicates.","Only count packings whose numbers add to k. Do not list them."]),permutations:o("A list of items. You must use each item once, and order matters.","Every possible lineup. If twins exist, each unique lineup once.","[1, 2, 3] includes [2,1,3]. [1,1,2] unique does not list [1,1,2] twice.",["All lineups.","Unique lineups with duplicates.","Only the next lineup in dictionary order — do not list n! of them."]),combinations:o("n candidates and a size k. Order does not matter. {1,2} is the same as {2,1}.","Every k-pack. Follow-up: numbers may be reused, or each used once, toward a target sum.","n=4, k=2 → {1,2},{1,3},{1,4},{2,3},{2,4},{3,4}. Not {2,1}.",["All ways to choose k of n.","Pack numbers that add to a target. Unlimited copies of each.","Same target, each number once, input has duplicates."]),"n-queens":o("An n×n board. Place n queens so none share a row, column, or diagonal.","Every safe board (or just how many). One queen per row is fine to assume.","n=4 has 2 solutions. n=1 has 1. n=2 and n=3 have 0.",["Return the boards as rows of Q and .","Only the count, no strings.","n=4 by hand, then match your program."]),"sudoku-solver":o("A 9×9 grid, some cells filled. A digit 1–9 may appear once per row, column, and 3×3 box.","Fill every empty cell legally. The puzzle has one solution.","A box already has 1–8. The last hole in that box must be 9 if the row and column allow it.",["Solve the board in place.","Only validate — do not fill.","Pick the hole with the fewest legal digits first if they ask for speed."]),"word-search":o("A letter grid and a word. You walk up/down/left/right. A cell may be used once on the path.","Does the word appear as a path? Yes or no.","Grid AB / CD. Word ABD: A–B–D, yes. Word ABC: C sits diagonal from B, so no.",["Does this one word sit on the board?","A whole dictionary of words. Find all that sit on the board.","You may not reuse a cell. Mark and unmark as you walk."]),"generate-parentheses":o("You have n pairs of parentheses. A prefix must never have more closers than openers.","Every valid string of length 2n. Do not build invalids and filter.","n=2 → ()(), (()). Not )((), not (().",["List them.","Only the count (Catalan). Do not list.","Two bracket types, still never close what is not open."]),"divide-and-conquer":o("A problem that splits into two independent halves whose answers stitch cheaply.","Solve the halves, combine. Quote the time from the split and the stitch, not from a guess.","Count out-of-order pairs in [3,1,4,2]. Left [3,1] has 1, right [4,2] has 1, merge adds 3>2 and 1 stays. Total 3.",["Count inversions while you sort by halves.","Majority element by asking each half, then scanning.","The stitch is as hard as the original — then this split did not help."]),"closest-pair":o("Points on a plane. Checking every pair is too slow.","The two closest points and their distance. After both halves, only a thin strip around the middle line can still beat the record.","Points (0,0), (3,4), (1,1). Closest is (0,0)-(1,1), distance √2, not (0,0)-(3,4).",["Return both the pair and the distance.","1-D version: sort and check neighbors only.","Two points sit on top of each other. Distance 0."]),"fibonacci-dp":o("A count that depends on the last two answers: ways, rabbits, tiles.","The nth value. Do not recompute the same leftover from scratch.","Ways: 1,1,2,3,5. F(5)=5. Climbing 3 stairs with 1-or-2 is 3 ways: 1+1+1, 1+2, 2+1.",["nth Fibonacci.","Ways to tile a 2×n board with 1×2 tiles.","n is huge; they want it modulo 10^9+7."]),"climbing-stairs":o("A staircase of n steps. You may take 1 or 2 at a time. Order matters.","How many ways to stand on step n?","n=4 → 5 ways. 2+2, 2+1+1, 1+2+1, 1+1+2, 1+1+1+1.",["Ways for n steps.","Each step has a cost. Min cost to reach the top.","You may jump 1..k. Some rungs are broken."]),"house-robber":o("Houses in a line, each with a stash. Adjacent houses share an alarm.","Maximum stash if you never rob two neighbors.","[2, 7, 9, 3, 1] → 2+9+1 = 12, or 7+3 = 10. Best 12.",["Houses in a line.","Houses in a circle — first and last are neighbors.","Houses in a binary tree — parent and child are neighbors."]),"decode-ways":o("A digit string. Letters are 1=A … 26=Z. A lone 0 is illegal. 10 and 20 are fine; 06 is not.","How many ways to read the whole string as letters?",'"12" → AB or L, 2 ways. "10" → J, 1 way. "06" → 0 ways. "27" → BG only, not a 27th letter.',["Number of readings.","Walk 10, 12, 27, 06, 0 before you code.","* can stand for several digits. How many readings then?"]),"knapsack-01":o("Items with a weight and a value. A bag with a weight cap. Each item at most once. You may not snap an item in half.","Best total value that still fits.","Weights [1,2,3], values [6,10,12], cap 5 → items 2 and 3 = 22. All three weigh 6.",["Max value under the cap, each item once.","Can this list split into two groups with the same sum?","You may not break an item. What if you could?"]),"unbounded-knapsack":o("Item types with weight and value. The bag still has a cap, but you may take as many copies of a type as you want.","Best value that fits. Two coins 1+2 count as the same packing as 2+1 unless they ask about order.","Cap 5, types (w=2,v=3) and (w=3,v=4). Two of the first = 6. One of each = 7. Best 7.",["Rod of length n. Price for each cut length. Max money, cuts unlimited.","Do they want combinations or lineups (order matters)?","At most k copies of a type — not unlimited."]),"coin-change":o("Coin values and a target amount. Unlimited coins of each value.","Fewest coins that add to the amount, or −1 if impossible. Greedy largest-first can fail.","Coins {1,3,4}, amount 6. Three 1s and a 3 is 4 coins; two 3s is 2. Not two 4s. Answer 2.",["Fewest coins.","Number of combinations (1+2 same as 2+1).","Why largest-first fails on {1,3,4} and 6."]),lis:o("A sequence. You may drop numbers but you must keep the leftover in the same order. They need not sit next to each other.","Length of the longest leftover that strictly rises.","[10, 9, 2, 5, 3, 7, 101, 18] → 2,5,7,101 (or 2,3,7,18). Length 4.",["Length only.","Print one such leftover.","Envelopes (w,h): nest as many as you can after you sort."]),lcs:o("Two strings. A common leftover keeps order in both, but letters need not be neighbors.","Length of the longest shared leftover. Contiguous is a different question.","ace vs abcde → ace, length 3. abc vs def → 0.",["Length, then reconstruct one shared leftover.","Min deletes so both strings match (related count).","Shortest string that contains both as leftovers."]),"edit-distance":o("Two words. You may insert a letter, delete a letter, or replace a letter. Each action costs 1.","Fewest actions to turn word A into word B.","horse → ros. Replace h→r, delete o, delete e? One standard answer is 3 (horse → rorse → rose → ros).",["Min inserts, deletes, replaces.","Recover one alignment, not only the number.","Only delete and insert — no replace."]),"palindrome-dp":o("A string. A palindrome reads the same forward and back.","Longest palindrome that is a contiguous slice — or, if they say so, a leftover that may skip letters. Or min cuts so every piece is a palindrome.","babad → bab or aba, length 3. cbbd → bb. subsequence on bbbab → bbbb.",["Longest palindromic slice.","Longest palindromic leftover (skips allowed).","Min cuts so every piece is a palindrome."]),"matrix-chain":o("A chain of matrices. (AB)C and A(BC) give the same product but different multiply counts.","Minimum multiply cost. You choose where the last multiply sits.","10×30, 30×5, 5×60. (AB)C costs 10·30·5 + 10·5·60 = 4500. A(BC) costs 30·5·60 + 10·30·60 = 27000. Best 4500.",["Min cost to parenthesize the chain.","Print one best parenthesization.","Three matrices by hand, then code."]),"burst-balloons":o("Balloons in a row, each with a number. Burst one: you score left × this × right (missing ends count as 1).","Maximum score if you burst them all. Think of the last balloon you burst between two walls, not the first.","[3, 1, 5, 8]. One optimal order scores 167.",["Max coins.","Pad both ends with 1. Do not special-case the edges.","Min cost to cut a stick at given points — same last-cut idea."]),"grid-dp":o("A grid. You may only step right or down (or only down a falling column). Cells have costs or obstacles.","Number of paths, or the cheapest path sum, to the far corner.","3×2 empty grid, only right/down. 3 paths. Min-sum grid [[1,3],[1,5]] → 1+1+5 = 7 or 1+3+5 = 9. Best 7.",["Unique paths. Obstacles block a cell.","Minimum path sum, right and down only.","Two walkers pick cherries. They cannot double-count a cell."]),"interval-dp":o("A segment (subarray, substring, stick). The last action splits it at some k. Smaller segments are already scored.","Best score of the whole segment. Fill short segments before long ones.","Cut a stick of length 7 at 1 and 3 and 5. Cost of a cut is the current piece length. Min total depends on cut order.",["Min cost to cut a stick.","Stone piles in a row: last merge of two adjacent heaps.","Palindrome cuts and balloon bursts are this shape."]),"bitmask-dp":o("n ≤ 20 people, cities, or tasks. A subset fits in an integer of n bits.","Best way to handle every subset: assign jobs, or a tour that visits each city once and returns.","3 cities, start 0. Distances make 0-1-2-0 cheaper than 0-2-1-0. Try both tours; n=3 is 2 leftover orders.",["Cheapest assignment of n jobs to n workers.","Shortest walk that visits every node at least once (small graph).","n=40 — this subset table will not fit. Split the people in half."]),"tree-dp":o("Houses (or cameras, or distances) sit on a tree. A node’s answer comes from its children’s answers. No cycles.","Best score at the root — or the score if every node were the root.","Tree 3 with children 2 and 3. Rob-the-root vs skip-root-and-rob-children. Take the better pair.",["Max stash on a tree; parent and child cannot both be robbed.","Min cameras so every node is watched.","Sum of distances from every node to all others, without n walks."]),"digit-dp":o("A range [L, R] too big to scan. You care about a digit rule: digit sum, unique digits, allowed digits.","How many integers in the range obey the rule. Count up to R, subtract count up to L−1.","How many numbers ≤ 25 have digits that add to 4? 4, 13, 22. Answer 3.",["Count numbers in [L, R] whose digits sum to k.","How many numbers ≤ N use only digits from a given set?","Leading zeros do not count as used digits."]),"interval-scheduling":o("Meetings, each with a start and an end. One room. Touching ends usually do not clash.","The largest set of meetings that do not overlap.","[(1,4),(2,3),(3,5)] → (2,3) and (3,5). Taking (1,4) blocks both shorts.",["Maximum number of non-overlapping meetings.","Min meetings to drop so the rest do not overlap.","Each meeting has a value. Max value, not count."]),"jump-game":o("From index i you may hop at most A[i] steps forward. A[i]=0 is a trap if you land there with no reach left.","Can you reach the last index? Follow-up: fewest hops.","[2,3,1,1,4] → yes. [3,2,1,0,4] → stuck on 0. Fewest hops on the first: 2 (0→1→4).",["Reachable, yes or no.","Minimum hops to the end.","Video clips: cover [0, T] by extending the farthest clip that starts inside the lit range."]),"gas-station":o("A circular track. Station i gives gas[i] and the drive to the next costs cost[i]. Tank cannot go negative.","A start index that completes the lap, or −1. If total gas < total cost, impossible.","gas [1,2,3,4,5], cost [3,4,5,1,2] → start at index 3. Tank never goes negative from there.",["Return the unique start, or −1.","Why a start inside a failed stretch cannot work.","Total gas equals total cost. Is a start still guaranteed?"]),"fractional-knapsack":o("Items with value and weight. You may snap an item and take a fraction. Bag has a weight cap.","Maximum value. Fill with the richest leftover (value per weight) first; the last item may be a slice.","Cap 50. (60,10), (100,20), (120,30). Take the first two whole and 2/3 of the third → 240.",["May I break an item? If yes, this. If no, the each-item-once bag.","Sort by value/weight, not by value alone.","Give a 0/1 counterexample where richest-first fails if you cannot snap."]),"meeting-rooms":o("Meetings on a timeline. Back-to-back (end == next start) usually share a room.","Can one person attend all? If not, how many rooms so nobody waits?","[(0,30),(5,10),(15,20)] → 2 rooms. One person cannot attend all three.",["True/false: one room is enough.","Minimum rooms (or train platforms).","Carpooling: the van has a seat cap; same sweep on pickups and dropoffs."]),candy:o("Children in a line, each with a rating. A child with a strictly higher rating than a neighbor must get more candies. Everyone gets at least 1.","Minimum total candies.","Ratings [1,0,2] → 2,1,2. Total 5. [1,2,87,1] the peak needs more than both slopes.",["Min candies.","Equal ratings have no extra rule between them.","One forward pass is not enough on a down-slope. Why?"]),"assign-cookies":o("Children with a greed factor. Cookies with sizes. A child is content if the cookie is at least their greed. One cookie per child.","Maximum number of content children.","Greed [1,2,3], sizes [1,1] → only one child (the 1). Sizes [1,2] → two children.",["Max content children.","Sort both, give the smallest cookie that works.","Boats: two people per boat if their weights fit."]),"greedy-mst":o("Towns and possible two-way cables with costs. You want every town reachable from every other, cheapest total cable.","Why always taking a cheapest cable that links two still-separate clumps is safe — and the total that plan pays.","Four towns, cheapest safe cables 1, 2, 2. Total 5. A fancy long cable of 10 is never needed.",["Cheapest network that connects everyone.","You have an edge list vs a dense cost matrix. Which plan do you run?","A one-way road map — this “cheap safe cable” plan does not apply."])},c={kmp:o("A long text and a shorter pattern.","Every index where the pattern starts. After a mismatch, do not rewind the text.",'"ababcabc" / "abc" → starts at 2 and 5.',["Find the first or every occurrence of a pattern.","Is the string a repeat of one substring?","Fewest characters to add in front to make a palindrome."]),"rabin-karp":o("A text and a pattern of the same window length (or many equal-length windows).","Which windows match? Compare a rolling hash, then verify the raw slice.",'"abcabc" / "cab" → match at index 2.',["Does this pattern appear in the text?","All 10-letter DNA snippets that show up more than once.","Longest substring that appears at least twice."]),"z-algorithm":o("A string s.","At every index i, how far s[i..] matches the prefix of s. Use that to search a pattern.",'"aabxaayaab" — the final "aab" matches the prefix for length 3.',["How long does the prefix match at each starting index?","Find a pattern from those prefix-match lengths.","How many times does the prefix occur as a substring?"]),manacher:o("A string.","The longest contiguous palindrome — or the count of palindromic substrings.",'"babad" → "bab" or "aba". "cbbd" → "bb".',["Longest palindromic substring.","How many palindromic substrings are there?","n is huge — faster than expanding around every center."]),"trie-search":o("A dictionary of words, then prefix queries or a letter grid.","Does this word exist? What starts with this prefix? Which dictionary words sit on the board?",'dict {app, apple, apply}; prefix "app" → all three. A board with A,P,P,L,E can yield "apple".',["Autocomplete every word that starts with this prefix.","Replace each word with the shortest dictionary root.","Find every dictionary word on a letter grid."]),"sliding-window-strings":o("A string s, and sometimes a target string t.","The shortest window that covers t, or the longest window with no repeats / at most k distinct letters.",'s="ADOBECODEBANC", t="ABC" → "BANC". "abcabcbb" with no repeats → "abc".',["Smallest window that contains every character of t.","Longest substring without repeating characters.","Find every anagram of a word inside a longer string."]),"suffix-array":o("A fixed text you will query many times, or one string looking for repeats.","All suffixes in sorted order (as start indices). Then find a pattern or the longest repeated substring.",'"banana" — longest substring that appears twice is "ana".',["Find every occurrence of a pattern in a fixed document.","Longest substring that appears at least twice.","How many distinct substrings does this string have?"]),"suffix-tree":o("A text (or two texts) you will query for substrings.","Does this pattern appear? How many times? What is the longest shared stretch of two strings?",'"banana$" / "ana" → present twice (starts 1 and 3).',["Does this pattern appear, in time proportional to the pattern only?","Longest common substring of two long strings.","Where do all repeats of a substring sit?"]),"aho-corasick":o("Many keywords and one stream of text.","Every place any keyword appears, in a single pass over the text.",'keywords {he, she, his, hers}, text "ushers" → she, he, hers.',["Highlight every dictionary word in a long article.","A character stream — report each keyword the moment it ends.","Many signatures, one file — report every hit."]),"bit-set-unset-toggle":o("An integer n and a bit index k (LSB is 0).","Turn bit k on, off, or flip it, without touching the other bits.","n=5 (101), k=1 → set 7 (111), clear 5 (101), toggle 7 (111).",["Set, clear, or flip bit k.","Is bit k on?","Pack a handful of flags into one word."]),"count-bits":o("An integer n, or every integer from 0 to n.","How many 1-bits each number has.","13 is 1101 → 3 ones. For 0..5 the counts are [0,1,1,2,1,2].",["Number of 1 bits in n.","Hamming distance between two integers.","The 1-bit count for every number from 0 to n."]),"xor-tricks":o("An array where every value appears twice except one (or two), or 0..n with one missing.","The leftover unique value(s), in linear time and constant extra space.","[4,1,2,1,2] → 4. [0,1,3] missing in 0..3 → 2.",["Every number appears twice except one — find it without a hash set.","Two numbers appear once; the rest twice. Find both.","Find the missing number in 0..n."]),"bitmask-subsets":o("A set of n items, n small (about 15–20).","Visit every subset — or every split of a subset — as an integer mask.","{a,b,c} → 8 masks; 0b101 is {a,c}.",["List every subset of n items.","Split a chosen set into two groups — visit every split.","From a used-mask, try adding one unused item."]),kernighan:o("An integer n.","Drop or isolate the lowest 1-bit so you can count ones or walk only the bits that are on.","0b10110 → drop lowest 1 → 0b10100; isolate it → 0b00010. 8 is a power of two; 12 is not.",["Is n a power of two?","Count the 1-bits without scanning all 32 positions.","Walk only the bits that are set."]),"euclid-gcd":o("Two integers a and b.","Their greatest common divisor and LCM. Optionally integers x, y with ax + by = gcd.","gcd(48, 18) = 6, lcm = 144. Jugs of 3 and 5 can measure 4 because gcd = 1.",["GCD and LCM of two numbers.","Can these two jugs measure exactly z liters?","Find x and y so that ax + by equals the gcd."]),sieve:o("An integer n (often up to 10^6).","Every prime ≤ n, or the smallest prime factor of every number ≤ n.","n=10 → 2, 3, 5, 7. 1 is not prime.",["How many primes are there ≤ n?","List all primes up to n.","Smallest prime factor of every number from 2 to n."]),"modular-arithmetic":o("Huge counts that must come back modulo m (often 10^9+7).","Add, subtract, multiply, and divide in that ring — divide means multiply by an inverse.","(5 − 8) mod 7 = 4, not −3. 6/2 mod 7 = 3. You cannot integer-divide after reducing.",["Return the answer modulo 10^9+7.","How do you divide by 2 when the answer is a residue?","A subtraction goes negative before the mod — what do you return?"]),"fast-exponentiation":o("A base a and a huge exponent e (maybe 10^18), optionally a modulus.","a^e (mod m) with far fewer than e multiplications.","3^13 = 3^8 · 3^4 · 3^1 — a few squares, not thirteen multiplies.",["Compute x^n when n is a 32-bit integer, including negative n.","a^e mod m for e up to 10^18.","The nth Fibonacci number in logarithmic time."]),factorization:o("One integer n, or many n up to a cap.","The prime factors — then divisor count, the full divisor list, or φ(n).","60 = 2² · 3 · 5. Divisors of 12: 1, 2, 3, 4, 6, 12.",["Factor n and list all of its divisors.","How many divisors does n have?","Factor every number from 1 to N."]),"ncr-mod-inverse":o("Many queries “n choose r”, n up to 10^6, answers modulo a prime.","C(n, r) mod p without overflowing or using integer division.","C(5, 2) = 10. C(5, 2) mod 7 = 3. C(n, r) = 0 when r > n.",["n choose r modulo 10^9+7, many queries.","Number of paths on an empty grid.","C(2n, n) / (n+1) modulo a prime."]),catalan:o("n pairs of parentheses, n labeled keys, or a convex polygon.","How many valid structures — matched parentheses, unique BSTs, triangulations.","3 pairs → 5 strings. 3 BST keys → 5 trees.",["How many valid parentheses strings of n pairs?","How many unique BSTs on n keys?","Ways to triangulate a convex (n+2)-gon."]),"segment-tree":o("An array. You change single cells and ask range sums, mins, or gcds.","Each update and each range answer in logarithmic time.","[1, 3, 5, 7], sum of [1, 2] = 8; set index 1 to 4; that sum becomes 9.",["Range sum or min after point updates.","Count of smaller numbers after self.","How many inversions?"]),fenwick:o("An array. Point adds and prefix or range sums.","Add to one index and read a prefix fast. Range [l, r] is prefix(r) − prefix(l−1).","[1, 2, 3, 4], add +5 at index 2 → [1, 7, 3, 4]; sum of [2, 4] = 14.",["Point add, then range sum.","Count inversions with a frequency table.","Range add, then point reads."]),"sparse-table":o("An array that never changes. Many range-min (or max, gcd) queries.","Each query in constant time after a one-time build.","[2, 5, 1, 4, 3], min of indices 1..3 → min(5, 1, 4) = 1.",["Static range minimum.","Range gcd on an immutable array.","Lowest common ancestor after an Euler tour — min of a static list."]),"lazy-propagation":o("An array. You add (or assign) a value on a whole range, then ask range sums or mins.","Range update and range query, both logarithmic — do not walk every cell.","[1, 2, 3, 4], add 5 to [2, 4] → [1, 7, 8, 9]; sum of [2, 3] = 15.",["Add v to every index in [L, R], then sum a range.","Assign every index in [L, R] to v, then ask the min.","Why is updating cell by cell too slow here?"]),"ordered-set":o("A live set of numbers: inserts, deletes, and rank questions.","What is the k-th smallest? How many values are < x? Both in logarithmic time.","{3, 1, 7, 5}: two values are < 5; 2nd smallest is 3. Delete 1 → 2nd is 5.",["k-th smallest while numbers arrive and leave.","How many values to the left are smaller?","Median of a sliding window."]),"persistent-segment-tree":o("An array and queries on historical prefixes — k-th smallest in A[L..R].","Answer as if every past version of the structure were still around.","A=[2, 1, 3, 1], 2nd smallest in [2, 4] (values 1, 3, 1) → 1.",["k-th smallest value in subarray [L, R].","How many values in [L, R] are ≤ X?","Query an older snapshot after later updates."])},h={"hld-interview-method":o("You have 45 minutes and a blank board. The interviewer said “design it” and is already looking at the clock.","Lead the room: lock v1, estimate, contract, sketch, dive, wrap — not twenty boxes first.","URL shortener or newsfeed. They will interrupt at minute 12.",["How do you spend the 45 minutes?","They say skip estimates and talk multi-region. What do you drop?","You never wrote consistency on the write. What fails in the last five minutes?"]),"url-shortener":o("People need to paste long links into SMS and tweets.","v1: mint a unique short code and redirect fast. Custom aliases and full analytics are later.","Hundreds of writes/s, 50k redirect QPS. A viral code must not melt the primary.",["Design bit.ly.","301 or 302 — and why stats break.","Someone scrapes sequential codes."]),pastebin:o("Engineers want to dump a log or a 40 MB file and send a link.","v1: upload, get an unguessable URL, download. Bytes and metadata are different stores.","10M creates/day, 50 KB average, one gist goes viral at 20k download QPS.",["Design Pastebin.","The file is 2 GB. Does it go through the API box?","Unlisted vs private — what if the id is autoincrement?"]),"rate-limiter-system":o("A public API is getting hammered by one customer and a botnet.","v1: cap requests per key without adding 50ms to every call.","80k QPS at the edge, 100 keys are hot, Redis in one AZ dies.",["Design a rate limiter.","Token bucket or sliding window — pick one and say why.","The limiter itself is down. Do we fail open or shut the door?"]),"key-value-store":o("You need get/put with a TTL, not a SQL schema.","v1: a distributed KV that survives a node death and still looks fast.","200k tiny gets/s, 5k puts/s, 50 nodes, one rack goes dark.",["Design Dynamo / a key-value store.","Where do you put a key, and who owns the replica set?","A put returns 200, then that node dies before flush."]),"unique-id-generator":o("Every tweet, payment, and short link needs an id that will not collide across machines.","v1: mint unique, roughly time-ordered ids at write QPS without a single global lock.","50k ids/s across 20 boxes. Two data centers, clocks drift 200ms.",["Design Twitter Snowflake.","UUID vs ticket server vs Snowflake — pick for this write path.","A machine reboots and reuses the same worker id."]),"web-crawler":o("You want a fresh copy of the public web without knocking sites over.","v1: frontier, politeness, fetch, store. Ranking is later.","10k URLs/s, robots.txt per host, one domain is 80% of the queue.",["Design a web crawler.","How do you stay polite per host and still use the fleet?","A poison URL redirects to itself forever."]),newsfeed:o("I follow 200 people. I open the app and want new posts now.","v1: deliver a home timeline. Ranking models are later.","Reads dwarf writes. One celebrity has 50M followers.",["Design Twitter / Facebook home feed.","Fan-out on write or on read — who gets which?","I follow someone and the feed looks empty."]),instagram:o("People post photos and scroll a home grid plus a profile.","v1: upload, store media, serve a follow feed. Stories and Reels are later.","10M photo uploads/day, 1 MB each, feed reads 100:1 vs writes.",["Design Instagram.","Where do bytes live vs the post row?","A celebrity posts and fan-out explodes."]),notifications:o("An event happens — like, comment, ship — and the user should hear about it on phone, email, or in-app.","v1: ingest events, fan-out to devices, respect quiet hours. No ML ranking.","2M push/min at a concert drop. One user has 4 devices and muted the sender.",["Design a notification system.","Push vs email vs in-app — who decides the channel?","The provider 429s. Do we drop, retry, or DLQ?"]),autocomplete:o("The search box must suggest as they type, not after they hit enter.","v1: prefix matches in tens of milliseconds. Personalized ranking is later.","Typeahead at 8k QPS, prefixes of 1–3 letters are huge, p99 under 50ms.",["Design Google typeahead.","Trie in memory vs inverted index — what is v1?","A misspelled prefix and a hot prefix that stampedes."]),"trending-topics":o("Millions of posts a minute, and the homepage wants “what is exploding right now.”","v1: count recent mentions and surface a top list that is not just bots.","200k events/s, 10-minute windows, one celebrity name is 30% of traffic.",["Design Twitter trending topics.","How do you decay old counts without a full recount?","A coordinated hashtag attack — what do you filter?"]),chat:o("Two people (and later a group) need to send messages that survive going offline.","v1: 1:1 + small groups, delivery ticks, history. Video is later.","Many idle sockets, groups of 256, media later. A group of 10k is the trap.",["Design WhatsApp.","WebSocket vs poll — and where does the message persist?","Sent / delivered / read ticks across two phones."]),"presence-service":o("The app wants a green dot and “last seen” without polling every friend every second.","v1: online / last-seen that is allowed to be a few seconds stale.","50M users, 10% online, heartbeats every 20s, friend lists of 500.",["Design a presence service.","Heartbeat TTL vs a live socket map.","A gateway dies — how many people look offline?"]),"live-comments":o("A World Cup goal drops and 200k people comment on the same video at once.","v1: append-only comments that other viewers see within a second or two.","One video is 90% of write QPS. History is a cursor, not a refresh.",["Design live comments on a stream.","Fan-out to viewers without N² connections.","The celebrity video shard is on fire."]),youtube:o("Creators upload long video; viewers hit play and expect it to start fast on a bad network.","v1: upload, transcode, store renditions, play via CDN. Comments are later.","Hours of 4K a day, ABR on 3G, a premiere spikes one origin.",["Design YouTube.","Where do original bytes vs renditions live?","Play starts in Mumbai while the origin is in Iowa."]),zoom:o("Twelve people join a call and need to hear each other with lip-sync that does not feel broken.","v1: media path, SFU vs MCU, join/leave. Recording is a follow-up.","A 50-person all-hands, one user on 3G, an SFU in one region dies.",["Design Zoom.","Who mixes audio — every client or a server?","Someone's uplink dies. Do you freeze, mute, or drop them?"]),ticketmaster:o("Taylor Swift onsale. A million people want the same 20k seats.","v1: hold a seat, pay, issue a ticket — without selling the same seat twice.","200k QPS at open, holds expire in 10 minutes, payment is slower than browse.",["Design Ticketmaster.","How do you hold a seat so two carts cannot win?","Payment succeeds after the hold expired."]),uber:o("A rider opens the app. Nearby drivers are moving. Someone has to be offered the trip.","v1: ping location, request a ride, match one driver. Pricing is later.","Location updates dwarf match QPS. Two riders grab the last driver downtown.",["Design Uber matching.","How do you find nearby supply without scanning the table?","The driver ignores the offer. What happens to the trip?"]),"payments-wallet":o("Money moves between wallets and vendors. Double-credit is worse than being briefly down.","v1: ledger append, hold/capture, idempotent deposits. Card network details later.","5k money-moves/s, two regions, a retry after a 502.",["Design a payments wallet.","Where is the source of truth — balance cell or ledger?","The same Idempotency-Key arrives twice, 8 seconds apart."]),"inventory-checkout":o("A flash sale has 300 units and 30k carts. Oversell means angry refunds.","v1: reserve stock, check out, release on abandon. Recommendations are later.","One SKU is the hot key. Checkout p99 300ms, cart TTL 15 minutes.",["Design inventory and checkout.","When is stock decremented — add-to-cart or pay?","Two checkouts pass the read, then both write."]),dropbox:o("A file saved on the laptop should show up on the phone, including edits to the middle of a 2 GB video.","v1: chunk, sync, conflict on two writers. Full office suite is later.","Millions of tiny metadata ops, large objects in blob store, two devices edit offline.",["Design Dropbox.","Why chunks + a block list, not one blob per save?","Laptop and phone both edited while offline."]),netflix:o("A catalog of titles must start playback worldwide, on a living-room TV and a phone.","v1: catalog, entitlement, CDN + ABR. Social features later.","Friday 8pm, one new episode, 40% of traffic in one country, origin must not see every byte.",["Design Netflix.","What lives at the CDN vs the origin?","License lapses in one region mid-stream."]),"maps-nearby":o("The user wants coffee within 1 km, ranked by walking time, not a table scan of Earth.","v1: index points, query a radius, return a page. Turn-by-turn is later.","50k nearby queries/s, downtown is dense, desert cells are empty.",["Design Google Maps nearby search.","Geo hash / S2 vs a lat-long BETWEEN.","The cell is empty — how do you expand without drowning?"]),"ad-click-aggregator":o("Clicks and impressions arrive as a firehose. Finance wants counts that match the invoice.","v1: ingest, dedupe, aggregate by campaign. Real-time bidding is later.","2M events/s, late events by 20 minutes, one campaign is a hot key.",["Design an ad click aggregator.","Exactly-once or at-least-once plus idempotent keys?","A retry reprints yesterday's bill."]),"metrics-pipeline":o("Every box emits counters. Dashboards and alerts need them within a minute, not tomorrow.","v1: ingest, roll up, store cheaply. Full APM traces later.","5M points/s, 15-month retention, a misconfigured agent 100×s one metric.",["Design a metrics pipeline.","Push vs pull scrape — what is v1?","Cardinality explodes: user_id on every label."]),"distributed-cache":o("The DB cannot take the read QPS. You want a fleet that looks like one giant Redis.","v1: get/set, TTL, add/remove nodes without dumping the whole working set.","400k gets/s, 60 nodes, one node dies, a celebrity key is 20% of traffic.",["Design a distributed cache.","Consistent hashing vs a directory — who moves keys?","Cache miss stampede on a hot key."]),"distributed-lock-scheduler":o("A cron job must run once, not once per box, and a worker may die holding the lock.","v1: lock with TTL + fencing, and a scheduler that does not double-fire.","5k jobs/min, 30 workers, clocks skew, a lock holder GC-pauses for 12s.",["Design a distributed lock and job scheduler.","Redis SET NX vs ZooKeeper / etcd — what do you trust?","The lock expires while the work is still running."]),"public-api-platform":o("Third parties will call your API with keys, quotas, and webhooks they expect to trust.","v1: auth, rate limits, versioning, audit. A marketplace of apps is later.","20k partner QPS, one partner is 40% of traffic, a leaked key at 3am.",["Design a public API platform.","API key vs OAuth — who is the caller?","You ship a breaking change. How do old clients live?"]),"least-privilege-secrets":o("The API image has a prod DB password in an env file, and the analytics job can DROP TABLES.","Decide who can do what, and where secrets live so a leak is rotatable.","CI can deploy prod. A laptop clone of .env hits GitHub.",["The DB password is in the repo. Walk the fix.","One role per service or a shared app user?","The secret leaked. Rotate without a full outage."]),encryption:o("Laptops get stolen and packets cross the public internet. Customer data is in the payload.","Pick what is encrypted in transit vs at rest, and who holds the keys.","TLS to the LB, HTTP inside the VPC today. A disk snapshot leaks.",["Where do you terminate TLS, and is that enough?","Envelope encryption vs one KMS key for the whole DB.","A region is seized. Are the backups still readable?"]),"pii-gdpr":o("A user in the EU hits “delete my account.” Copies of their email live in logs, backups, and a warehouse.","Decide what is PII, where it lives, and how delete or export actually completes.","30-day log retention, 90-day backups, a replica in the US.",["Right to be forgotten — what do you erase?","Can support still see the last four of a card?","Delete succeeds in SQL but the object store and CDN still have the photo."]),"ddos-waf":o("Traffic jumped 40× and most of it is not human. The origin is falling over.","Decide what dies at the edge vs what the app still has to handle.","SYN flood + layer-7 scrape on /search. Good users are in the same /24 as bots.",["We're being DDoS'd. What sits in front?","WAF rules vs rate limits vs CAPTCHA — order them.","A partner's NAT looks like a botnet."]),"audit-logs":o("Finance changed a payout routing number. Legal will ask who did it, from where, six months later.","Design an append-only trail that app logs cannot silently rewrite.","Admins in two regions, 2 years retention, a compromised admin token.",["Who changed this row, and can they erase the evidence?","What goes in the audit event vs the app log?","The writer is down. Do we block the money move?"]),"sli-slo-sla":o("Leadership wants “four nines.” On-call is already drowning in 500s from a single bad client.","Pick the user-visible indicator, a target, and what happens when the error budget burns.","Checkout success 99.9%, p99 300ms. A deploy burns the month's budget by Tuesday.",["What is the SLO for checkout — not 'pods are Running'?","SLO vs SLA — who pays if we miss?","Error budget is gone. Do we freeze deploys?"]),"alerting-vs-dashboards":o("The dashboard is pretty. Nobody woke up, and users were down for 40 minutes.","Decide what pages a human at 3am vs what is only a chart.","p99 crept from 80ms to 400ms over an hour. CPU looks fine.",["What do you page on vs what do you graph?","Symptom alerts or cause alerts?","A flapping check pages every 4 minutes."]),"capacity-planning":o("Launch is in six weeks. Today’s primary is at 60% CPU on a normal Tuesday.","Turn a growth story into headroom, and say what you buy vs what you redesign.","3× traffic on day one, 10× in a year, disk fills 40 days before CPU.",["Will this primary survive launch Friday?","What do you scale first — boxes, shards, or cache?","The forecast was wrong by 5×. What is the escape hatch?"]),cost:o("The bill is mostly egress and a fleet of huge boxes that idle at night.","Treat cost as a design constraint: what you store, where you compute, what leaves the region.","10 TB/day video, multi-AZ replication, a chatty chatty microservice mesh.",["This design is correct and too expensive. Cut 40%.","CDN vs more origin, or compress vs store less?","A debug log line at 2M QPS — what did it cost?"]),"retention-deletion":o("Events have piled up for five years. Legal wants some gone; product wants “we never lose history.”","Pick retention per store and a delete path that actually reaches replicas and backups.","Hot clicks 30 days, raw logs 13 months, warehouse 5 years, a GDPR delete tomorrow.",["How long do we keep clicks, and where?","Soft delete vs purge — when is it really gone?","The replica and the lake still have the row."]),"block-file-object":o("A database wants a disk, a laptop wants a filesystem, and a video wants a bucket.","Pick block vs file vs object for each blob of data on the board.","Postgres data dir, NFS home dirs, 4K video renditions, 50 TB/year growth.",["Where do these bytes live — EBS, NFS, or S3?","Can the app treat S3 like a disk?","Random 4 KB writes vs a 2 GB immutable object."]),"cdn-origin":o("Viewers worldwide request the same MP4. The origin is in one region and the NIC is melting.","Design the edge cache and what still has to hit origin.","80% cacheable, 20% personalized manifests, a bad deploy cached for 24h.",["What do you put on the CDN vs the origin?","Cache-Control vs purge vs origin shield.","A private photo URL leaked and is cached at the edge."]),"chunked-resumable-upload":o("A creator is on hotel Wi-Fi uploading a 4 GB video. The connection dies at 90%.","Design an upload that can resume without starting over, and without blowing API RAM.","Chunk 8 MB, 10k concurrent uploads, a retry of chunk 3 arrives twice.",["How do you upload a 4 GB file on a flaky network?","Presigned PUTs vs streaming through the API.","Two clients finish the same upload id."]),"image-video-pipelines":o("A raw upload is useless until you have thumbnails, a poster, and three bitrates.","Design the async pipeline so play does not wait on transcode of the original.","1M images/day plus 20k videos, a poison file that crashes ffmpeg, users refresh immediately.",["What happens after they tap Upload?","Sync thumbnail vs queued renditions — what blocks the UI?","Transcode fails on the last rendition. Is the post live?"]),"long-poll-ws-sse":o("The UI needs new data without the user hitting refresh. You have HTTP, and you have sockets.","Pick long poll, WebSocket, or SSE for this product, and say who holds the connection.","200k idle clients, a chat vs a sports score vs an invoice status.",["Push updates to the client. Which pipe?","Why not WebSocket for a one-way feed?","LBs idle-timeout the socket every 60s."]),presence:o("Friend lists show “online” but the truth is a heartbeat that can lie after a crash.","Decide how presence is stored, expired, and fan-out without N² polls.","Heartbeats every 15s, 5M online, a phone backgrounds and the socket dies quietly.",["How do you know they are online?","Last-seen vs live — what is allowed to be stale?","Split-brain: two gateways both think they own the session."]),"fan-out-write-vs-read":o("One post must reach a million timelines. Writing a million rows at post time will not finish.","Pick push, pull, or hybrid per class of user.","Normal user 200 followers, celebrity 50M, read QPS 100× write.",["Fan-out on write or on read?","What do you do for the celebrity?","I follow someone — when does their last week appear?"]),"unique-ids":o("Ids are minted on 40 boxes. Some must sort by time; none may collide; some must not be guessable.","Pick UUID, Snowflake, or a ticket server for this write — and name the failure.","80k ids/s, two regions, NTP is 400ms off on one host.",["How do you mint ids without a global lock?","Why not autoincrement if we shard later?","Clock jumps backward on a Snowflake worker."]),"sql-vs-nosql":o("You have joins, money, and a unique email today. Marketing wants a 50 KB flexible profile tomorrow.","Pick the store from the access pattern, not from a slogan.","Checkout 3k writes/s that must not lose a unique constraint; feed 80k reads/s of denormalized cards.",["Postgres or Dynamo for this table — why?","What query must stay a transaction?","You outgrow one primary. Do you move product or just this table?"]),replication:o("The primary just died. Replicas are 1.5s behind. Reads are still coming.","Decide sync vs async, failover, and what clients are allowed to see.","One region, two replicas, RPO of a few seconds is OK for posts, not for payments.",["Primary is gone. Who takes writes?","Read-your-write after the user posts.","Replica lag is 12s during a backfill."]),sharding:o("One primary cannot take the writes. A single tenant is 20% of the table.","Pick a shard key and a way to split later without an overnight outage.","2 TB, 8k writes/s, user_id vs created_at vs tenant_id as the key.",["How do you split this table?","Range, hash, or directory — pick one.","The whale tenant lands on one shard."]),"consistent-hashing":o("You added four cache nodes and suddenly 80% of keys missed. The DB lit up.","Place keys so adding or losing a node moves only a slice, not the world.","32 cache nodes, one dies, virtual nodes uneven, a hot key still pins one box.",["A cache node died. How many keys move?","Why virtual nodes?","Hash ring vs a lookup table in ZooKeeper."]),indexes:o("The query that was fine at 1M rows now scans 400M. Writes are slower every time you “just add an index.”","Pick which indexes exist from the real WHERE/ORDER BY, and what you refuse to index.","orders(user_id, created_at, status), 20k writes/s, a dashboard filters 12 columns.",["This query is slow. What index do you add?","Covering index or a bigger scan — tradeoff.","Five indexes later, checkout write p99 doubled."]),"normalize-vs-denormalize":o("The feed join is five tables and 80ms. Product wants the card in 10ms.","Decide what stays normalized for writes and what you copy for reads.","Post + author + like count on every card, 100:1 reads, author changes their name.",["Do you join at read or copy into the feed row?","What happens when the source field changes?","Two copies disagree after a partial write."]),cqrs:o("The write model is a careful ledger. The read model is a dashboard that wants six aggregations.","Split the write path from the read model only if the shapes truly disagree.","Payments 2k writes/s, analytics 200 QPS of scans, replica lag 3s is OK on the dashboard.",["Should checkout and the admin dashboard share one schema?","How does the read model stay close enough?","User just paid and the read side still says unpaid."]),"event-sourcing":o("Support needs “show me every change to this order,” not just the latest row.","Decide whether the log is the source of truth — or you just need an audit table.","Order state machine, 5k transitions/s, a bug shipped and you must rebuild projections.",["Do we store events or the current order row?","How do you answer 'current balance' fast?","A bad event was appended. Do you rewrite history?"]),"cache-patterns":o("You put Redis in front of SQL. After a deploy, the site is either stale or the DB is on fire.","Pick aside vs through vs behind, and how a miss does not stampede.","80k reads/s, 5% miss, TTL 30s, one key is a celebrity profile.",["Cache-aside or write-through for this read?","Who invalidates, and when?","TTL expires on a hot key — thundering herd."]),"redis-vs-memcached":o("You need a cache. Someone said Redis, someone said Memcached, and the use case is not the same.","Pick the tool from the data structure and the failure story, not the logo.","Session blobs vs leaderboards vs locks vs pub/sub, 200k ops/s, eviction under pressure.",["Redis or Memcached here?","What do you lose if the box restarts?","You used Redis as the only copy of the cart."]),"object-storage":o("The OLTP database is 80% video bytes and backups take all night.","Move opaque bytes to object storage and keep pointers in the DB.","20 TB/month new objects, range reads for video, a delete must also purge CDN.",["Why isn't this blob a column?","Presigned URL vs proxying bytes through the API.","Overwrite vs immutable keys when they replace a photo."]),"search-inverted-index":o("SQL LIKE '%shoe%' is 900ms and still ranks badly. Users type three words and expect relevance.","Design search as its own index, and say how it lags the source of truth.","50M documents, 8k queries/s, a new listing must appear within ~10s.",["How do you find 'red running shoes'?","What is an inverted index here?","The document was deleted in SQL and still ranks #1."]),"specialized-stores":o("Metrics, a friend graph, and a finance warehouse are all being forced into one Postgres.","Pick time-series, graph, or columnar only when the access pattern is that shape.","Metrics 2M writes/s, 4-hop “friends of friends,” year-long SUM by region.",["Is this still a relational table?","When do you bring in TSDB / graph / column store?","You queried a graph like a join of six tables."]),"oltp-vs-olap":o("The CFO’s Monday dashboard scans checkout in production and checkout p99 triples.","Split operational writes from analytical scans, and pick warehouse vs lake for the copy.","OLTP 4k tx/s, a 2-year aggregation, ETL every 15 minutes.",["Why can't finance query the primary?","Warehouse or data lake for this report?","The dashboard is 40 minutes stale on earnings day."]),"health-checks":o("The LB still sends traffic to a box that is shutting down, and another box is “up” but cannot reach the DB.","Design liveness vs readiness and a drain that does not drop in-flight work.","Rolling deploy, 30s shutdown, in-flight uploads of 20s, a deadlocked thread pool.",["What does /health mean — process alive or ready to take traffic?","How do you drain connections?","Readiness flaps and the LB thrashes the instance."]),"bulkhead-circuit-breaker":o("Recommendations is slow. Checkout shares the thread pool and is now timing out too.","Isolate the blast radius and stop calling a sick dependency every millisecond.","One downstream p99 is 8s, 40% of threads blocked, retries make it worse.",["Recommendations is on fire. Why is pay broken?","Circuit breaker, timeout, retry + jitter — order them.","The breaker is open. What does the user see?"]),"hedged-requests":o("p99 is awful because 1% of replica reads stall. p50 is fine.","Decide whether a second hedged call is worth the extra load.","Read QPS 30k, one replica hiccups at 2s, hedging would add 10% QPS.",["p99 is 2s, p50 is 20ms. What do you try?","When is hedging a bad idea?","Both hedges hit the same sick shard."]),"fallback-degradation":o("The personalization service is down. The homepage is blank instead of a boring but working catalog.","Decide what you serve when a non-critical dependency dies, and how you turn features off.","Homepage 15k QPS, recs timeout 200ms, a flag to skip recs already exists unused.",["Recs is down. What does home render?","Cached stale vs default list vs error page.","A bad feature flag leaves 10% of users on the broken path."]),"chaos-engineering":o("The runbook says multi-AZ. Nobody has ever pulled the plug on an AZ on a Tuesday.","Name what you would break first and what signal proves the design, not the slide.","Two AZs, a single Redis primary, on-call has never seen a real failover.",["What do you kill first to test this design?","Game day vs poking prod at random.","Failover worked in staging and hung in prod for 20 minutes."]),"blue-green-canary":o("The last “big bang” deploy took checkout down globally for 12 minutes.","Pick rolling, canary, or blue-green for this change, and how you abort.","200 instances, a bad migration, 1% of users see errors for 8 minutes before anyone notices.",["How do you ship this without a global outage?","Canary vs blue-green for a schema change.","The canary looks healthy and the metric you picked is the wrong one."]),"multi-az-multi-region":o("An AZ lost power. Leadership now wants “never down,” including a region-sized flood.","Pick multi-AZ vs multi-region from RPO/RTO and the write story, not from a map.","Sync replica next door is 2ms; the other coast is 70ms. Payments vs image CDN.",["AZ down vs region down — which did you design for?","What is the RPO if we stay single-region?","Cross-region sync writes just blew the p99."]),"active-active-passive":o("You have two regions. Product wants both to take writes. Finance wants one truth.","Choose active-passive vs active-active and say how conflicts die.","US and EU, users roam, a cart edited in both regions during a partition.",["Both regions take writes, or only one?","What is the failover story for active-passive?","Split-brain: two primaries accepted the same order id."]),"queues-pubsub-streams":o("After checkout you must email, bill, and update search. Doing it all in the request is 4s and loses the email on timeout.","Pick a work queue, a broadcast, or a replayable log — not “add Kafka.”","3k checkouts/s, email can be 30s late, search must rewind yesterday after a bug.",["This work cannot stay on the request path. Which async shape?","Queue vs pub/sub vs stream for email + search?","A consumer acked and then crashed mid-side-effect."]),"kafka-sqs-rabbit":o("You need async. One team already has SQS, another wants Kafka “for scale,” and the job is send-email.","Pick the mental model: competing tasks, broker routing, or a partitioned log.","Email 2k/s, no replay needed; clickstream 1M/s, must replay 7 days.",["Kafka, SQS, or Rabbit for this arrow?","Do we need rewind, or just at-least-once delivery?","You put 10 KB emails on a 7-day Kafka topic."]),outbox:o("The API committed the order and then failed to publish “order_created.” Warehouse never shipped.","Make the DB write and the “tell others” message the same transaction story.","5k orders/s, Kafka blip of 90s, a dual-write that looks fine in happy path.",["DB committed, Kafka publish failed. Now what?","Transactional outbox vs dual write.","The poller publishes twice. Is the consumer ready?"]),sagas:o("Booking a trip writes to flights, hotels, and payments. The hotel call fails after the flight is held.","Design a multi-service workflow that can compensate, not a cross-DB transaction.","Three services, 800 bookings/s, payment captured, hotel 500s.",["The hotel reserve failed. How do you unbook the flight?","Choreography vs orchestrator — pick one.","Compensation itself fails. Where does a human look?"]),dlq:o("One poison message crashes the consumer. The queue stops, and 200k good messages wait behind it.","Decide retry budget, isolation of bad messages, and who gets paged.","Workers 50, a bad payload 0.01%, retry storm every 2s, business cannot lose money events.",["A message crashes the worker forever. What happens?","How many retries, then where?","DLQ is full and nobody looks at it for a week."]),cdc:o("Search, cache, and the warehouse all need “what just changed in orders” without the API remembering to tell them.","Tap the database log, and say what you do about schema changes and deletes.","Primary WAL 80 MB/s, three consumers, a DROP COLUMN on Tuesday.",["How do other systems learn the row changed?","CDC vs the app emitting events.","A delete in SQL — does the search doc die?"]),"webhooks-vs-polling":o("Partners need to know when a payout completes. They will either hammer GET or give you a URL to POST.","Pick push vs pull, and design retries, signatures, and a portal to replay.","2k partners, 30% endpoints are down at any time, a webhook they must not forge.",["Webhook or polling for payout status?","How do they know the POST is really you?","Their endpoint 500s for an hour. What do we store?"]),"batch-vs-stream":o("Fraud wants a signal in seconds. Finance wants a correct daily rollup. Both are “processing events.”","Split what must be streaming from what is cheaper and safer as a batch.","Clicks 1M/s, fraud window 10s, invoice job 02:00 UTC, late events exist.",["Is this a stream job or a nightly batch?","What is allowed to be 24 hours late?","A stream bug undercounted; can batch be the source of truth?"]),"monolith-vs-microservices":o("The deploy is one repo and 40 people step on each other. Someone wants 30 services by Friday.","Pick monolith, modular monolith, or services from team and failure boundaries — not fashion.","12 engineers, checkout + recs + admin, recs can die without taking pay.",["Do we split this into services?","What is the first seam if we stay a modular monolith?","You split and now a page is 12 timeouts."]),"sync-vs-async-apis":o("The client clicked Pay and is staring at a spinner while you email, score fraud, and write search.","Decide which calls stay request/response and which return 202 and finish later.","Pay p99 budget 300ms, fraud model 900ms, email 2s, user will refresh.",["What is sync on this button, and what is async?","202 + poll vs webhook back to the client.","The user retries the spinner and you charge twice."]),"rest-graphql-grpc":o("Mobile wants one round trip with nested data. Internal services want typed, fast RPC. A partner wants a boring HTTP API.","Pick REST, GraphQL, gRPC, WebSocket, or SSE per client — not one religion.","Public third parties, a mobile homepage of 12 resources, 40 internal RPCs/s per page.",["REST, GraphQL, or gRPC for this surface?","Why not GraphQL for the partner API?","A chatty GraphQL query fans out to 30 services."]),"service-discovery":o("IPs change every deploy. Hard-coded hosts in config are already wrong.","Decide how callers find healthy instances after a scale event.","Kubernetes pods churn, a DNS TTL of 60s, a client cache that never expires.",["How does checkout find the payments pods?","DNS vs sidecar vs a client library.","Discovery says up, the instance is not ready."]),"stateless-sticky-sessions":o("You added four API boxes but half the users still pin to one because sessions live in process memory.","Move state off the box, and only keep stickiness if you can name why.","WebSocket chat vs a REST cart, 20 instances, one instance deploy evicts 25% of users.",["Why is one box at 90% CPU and the others idle?","Where does the session live?","Sticky sockets vs a shared session map in Redis."]),"service-mesh":o("Every language reimplemented retries, mTLS, and timeouts differently. Outages look like “the client library.”","Decide whether a mesh is worth the ops tax, or a gateway + libraries is enough.","35 services, 4 languages, you do not have a platform team of 12.",["Do we need a service mesh?","What belongs in the sidecar vs the app?","The mesh is down and now no service can talk."]),"multi-tenant":o("A whale customer wants isolation. Everyone else wants a cheap pooled cluster.","Pick silo vs pooled per tenant class, and how one noisy neighbor cannot take the fleet.","2k tenants, one tenant is 25% of QPS, a delete must not scan everyone else’s rows.",["Silo or pooled for this SaaS?","How is tenant_id on every query and every shard?","The whale’s report job wrecks shared CPU."]),"dns-anycast-geo":o("Users type a hostname. Half the planet is still landing in Virginia after a region died.","Steer them with DNS / geo / anycast, and pick a TTL you can actually live with.","TTL 1 hour, EU region down, ISPs cache past your TTL.",["How does a user in Tokyo get a nearby IP?","Low TTL vs query load.","Failover is done but clients still hit the dead VIP for 40 minutes."]),cdn:o("The same CSS, images, and a few API GETs are fetched from one origin by the whole planet.","Put cacheable bytes at the edge and say what must stay dynamic.","Static 95% hit, HTML personalized, a versioned asset vs /latest.",["What belongs on a CDN?","How do you ship a new JS bundle without users on the old one forever?","You cached an authenticated HTML page."]),"load-balancers":o("Twenty app boxes sit behind one VIP. Some connections are huge uploads; some are tiny GETs.","Pick L4 vs L7, the algorithm, and what health means.","50k conns, HTTP/2, one box has a stuck connection pool, WebSockets in the mix.",["L4 or L7 in front of this app?","Round-robin vs least-conn vs consistent hash.","The LB marks a box healthy and it still 500s."]),"api-gateway":o("Every client hits a different origin, duplicates auth, and there is no one place to cut off a bad key.","Put a front door on auth, rate limits, routing, and TLS — without turning it into a god service.","Mobile + web + partners, 30 backends, a 10 MB upload, a WebSocket.",["What lives on the API gateway vs the service?","Reverse proxy vs “all business logic in the gateway.”","The gateway is the single point of death."]),"tls-mtls":o("Traffic is HTTPS at the edge and plaintext between services. A packet capture inside the VPC is enough.","Decide where TLS terminates and whether service-to-service needs mTLS.","LB terminates TLS, 40 hops inside, a sidecar cert expires Sunday night.",["Where do you terminate TLS?","When is mTLS worth it?","A leaked service cert still works from a laptop on the mesh."]),"rate-limiting":o("One API key is 70% of QPS. Good customers are getting 429s too because the limit is global.","Pick token bucket, leaky bucket, or sliding window — and the key you limit on.","Edge 100k QPS, per-key and per-IP, a NAT shared by a whole university.",["How do you rate-limit this API?","Token bucket vs sliding window.","Distributed limiters disagree by 2× under load."]),"auth-sessions-jwt":o("Users log in on web and mobile. A third-party app wants access. Someone pasted a JWT in a URL.","Pick sessions, JWT, OAuth/OIDC, or API keys per client, and how you revoke.","Session in Redis vs 24h JWT, a stolen laptop, logout must work now.",["Session cookie or JWT for this app?","How does logout work if the JWT is already issued?","OAuth for the partner, API key for the cron."]),"rbac-abac":o("Support can see every user’s PII. A contractor should only see tickets in their region.","Pick roles vs attributes, and enforce on the server, not the UI hide.","12 roles already, a “god” role, a doc the user shared then unshared.",["Who is allowed to see this row?","RBAC or ABAC for sharing a document?","The UI hid the button; the API still returns the data."]),"cap-theorem":o("The replica across the ocean is unreachable. Clients are still hitting both sides.","For each write: refuse until you agree, or accept locally and repair later.","Two AZs, 80ms apart. Checkout must not double-charge; likes can be stale.",["SQL is down across the ocean. What do you do?","Why can't chat receipts be consistent and always available?","Your 200ms timeout — did you just invent a partition?"]),pacelc:o("The network is fine, but a read that waits for three replicas is 70ms and the product wanted 10ms.","When healthy, pick extra RTT for a fresher answer vs a local stale one.","Same-region quorum +20ms, cross-region sync +90ms, feed vs ledger.",["No partition right now. Why is the write still slow?","Read local or wait for quorum?","You chose low latency. How stale can the like count be?"]),"consistency-models":o("The user posts and immediately refreshes on another phone. The post is missing. They think we lost it.","Name the promise: linearizable, causal, read-your-writes, eventual — per API.","Mobile + web, two regions, a like vs a password change.",["What consistency does this read need?","Read-your-writes after create.","Eventual is fine until two devices fork the draft."]),"isolation-levels":o("Two checkouts read 1 item in stock and both succeed. Finance also sees a report mid-transaction.","Pick an isolation level for the money path and say what anomaly you still accept.","Inventory row, two writers, a long analytics transaction on the same table.",["Why did we sell the last item twice?","Read committed vs serializable for this update.","A report ran for 30s and saw a half-checkout."]),"acid-vs-base":o("The ledger team wants a transaction. The like-counter team wants to stay up during a blip.","Say which writes are ACID and which are BASE with a repair story.","Transfer $20 vs increment a view count, replica unavailable for 8s.",["Is this write a transaction or an eventually reconciled counter?","What do you lose if you skip the transaction?","BASE like-count drifted by 4% — is that OK?"]),"consensus-raft-paxos":o("Three nodes must agree who is leader and what the next log entry is, even if one is drunk and slow.","Use consensus for a small, critical log — not for every user read.","5-node Raft, one node partitioned, a leader pause of 3s, config change mid-outage.",["Who is allowed to take this write?","What does Raft actually agree on?","Two nodes think they are leader."]),"quorum-nwr":o("You have 3 replicas. A write that waits for all 3 dies when one disk is sick. A write to 1 replica vanishes.","Pick N, W, R so the product’s reads meet the writes they care about.","N=3, W=2, R=2 vs W=1 R=1, a node down during a Black Friday write spike.",["How many replicas must ack this put?","When does W+R > N save you?","Sloppy quorum accepted a write the home nodes never saw."]),"leader-vs-leaderless":o("A single primary serializes writes and is a hotspot. Leaderless accepts everywhere and argues later.","Pick a leader for this key range or accept conflict resolution.","Hot partition on user_id=1, multi-AZ, a 2s leader election vs concurrent writes.",["Single writer or any replica takes the put?","What happens while a new leader is elected?","Two leaderless writes last-writer-wins a counter."]),"failure-modes":o("The box did not crash. It paused. The network lied. Clocks jumped. Two primaries exist.","Name the failure you are designing for — crash, partition, split-brain, or skew — and the client-visible result.","GC pause 12s, clocks 400ms apart, a fencing token ignored.",["The node is slow, not dead. What does the caller do?","How do you notice split-brain?","A lock expired because the clock jumped."]),"idempotency-delivery":o("The client retried a 502. The queue redelivered. The user was charged twice.","Pick at-most / at-least / exactly-once-enough and put an idempotency key on the effect.","Pay endpoint, 8s timeout, SQS at-least-once, a webhook partner retries for 24h.",["The same pay request arrived twice.","At-least-once plus what on the consumer?","Exactly-once across two databases — what do you actually promise?"]),"backpressure-retries":o("A downstream is sick. Callers retry immediately. The queue grows without bound and healthy traffic dies.","Bound the work: timeouts, jittered retries, queues with limits, and a breaker.","p99 80ms normally, 5s when sick, 3 retries with no jitter, 20k QPS offered.",["The dependency is slow. Do you retry?","Where does backpressure show up to the user?","Retry storms after a 10-second outage."]),"back-of-envelope":o("They said 100 million users and then waited. The next box you draw depends on the math.","Turn DAU into peak QPS, storage/year, and NIC — loudly, to an order of magnitude.","100M users, 20% DAU, 10 reads/day, 1 KB, 3× replication, peak 4×.",["How many QPS is that, roughly?","What is storage in year one?","Which number picks SQL vs object store vs CDN?"]),"fan-out-read-write-ratio":o("One tweet and one page view are not one write and one read. Hidden multipliers will melt you.","Write the read/write ratio and the fan-out on the board before you pick caches or queues.","Post × 1M followers, a page that calls 12 services, cache miss stampede × 1k.",["Is this product read-heavy or write-heavy?","What is the fan-out of this one click?","A celebrity breaks your write-time fan-out."]),percentiles:o("Average latency is 40ms so the dashboard is green. Users on the slow 1% are raging.","Size the system on p95/p99 of the user action, not the mean of a single hop.","p50 20ms, p99 1.8s, a scatter-gather to 32 shards, SLO on “video started.”",["Why is average a lie here?","Which percentile is the SLO?","The slow shard is 2% of queries and owns p99."]),"hot-keys-partitions":o("One celebrity, one SKU, one cache key. The fleet is fine; one shard is at 100%.","Find the hot key and split, cache, or isolate it — more boxes will not help.","user_id of a celebrity, Black Friday SKU, a thundering herd on expiry.",["One partition is on fire. Why?","How do you split a hot key?","A herd stampedes the DB when the TTL hits zero."]),scalability:o("Tuesday traffic will be 10× by launch, then 100× in a year. The primary is already the quiet bottleneck.","Say what you scale — CPU, disk, writes — and whether you grow the box or add boxes.","Stateless API vs a single-writer DB, 10x / 100x / 1000x checkpoints.",["Vertical or horizontal for this hop?","What is the unit of scale — user, tenant, shard key?","You scaled pods. The hot Redis key did not notice."]),"availability-vs-reliability":o("The site is up and charging people twice. Leadership still cites four nines.","Split “can I reach it” from “does it keep the promise,” and pick an SLO that matches money vs likes.","99.9% uptime, double-charge rate 0.2%, MTTR 45 minutes last quarter.",["Are we available, reliable, both, or neither?","What user event is the SLO?","Always-on and wrong — what do you fix first?"]),"latency-vs-throughput":o("Batch ingest wants a million writes a minute. The user tap wants 80ms. Same team, same cluster.","Separate the interactive path from the bulk path so you do not optimize the wrong number.","Interactive p99 80ms at 5k QPS vs a 2M/s pipeline that can wait 30s.",["Are we optimizing latency or throughput?","Why did batching help ingest and hurt the tap?","You raised concurrency and p99 exploded."]),"consistency-vs-durability":o("The put returned 200. The box then died. Another replica has an older value. The user refreshed.","Say whether you need a correct latest or a write that survives the disk — they are not the same.","fsync every write vs ack in memory, replica ack 1 vs 2, a power loss.",["Did we lose the write, or just show a stale read?","Ack after memory or after disk + replica?","Likes can vanish; a payment cannot. Mark both on the board."]),"fault-tolerance-dr":o("An AZ is gone. Tomorrow it could be the region. Backups exist; nobody timed a restore.","Set RPO and RTO, and say what redundancy vs what is actually a disaster-recovery drill.","Multi-AZ sync, nightly backup, region RTO 4h, last restore test was 14 months ago.",["What is RPO and RTO for checkout?","Failover vs restore-from-backup — which did you buy?","The backup is encrypted with a key in the dead region."]),observability:o("Users say it is slow. You have 12 dashboards and no trace that ties a request across four services.","Put logs, metrics, and traces on the user action, not on “CPU looks fine.”","RED on the checkout route, a trace id from mobile to ledger, a missing span on the queue hop.",["How do you find why this one request was 3s?","What is the SLI metric vs a debug log?","A worker ate the message and there is no trace after the queue."])},d={tokens:o("You pasted a long article into a chat box. The model bills and reads in pieces, not words.","About how many pieces is this, and will it fit?","“unbelievable” may be 3 pieces. A 2,000-word post is often 2.5–4k pieces, not 2,000.",["The model ignored the last page of my PDF. Why?","Do we count words or something else?","The system prompt is huge. Who pays?"]),"context-window":o("The model can only hold so many pieces at once: instructions, old chat, retrieved pages, and the answer.","What do you keep when the box is full?","8k box. System 1k, history 2k, retrieval 6k. You must cut. Newest question stays.",["Chat has 40 turns and starts forgetting the start.","We stuffed the whole schema in. Now retrieval does not fit.","What do you evict first?"]),"prompt-as-spec":o("The bot must answer from notes only. If the notes do not have it, it must not guess.","Write the contract: output shape and the refuse line.","Notes about parking hours. User asks about refunds. Correct output: UNKNOWN.",["Write the prompt like a spec, not a pep talk.","How do you test it?","Someone added “be helpful.” What broke?"]),temperature:o("The same extract-to-JSON prompt returns different keys each run.","Which knob do you lock, and when would you turn it up?","Temperature 0: same JSON. Temperature 1: extra fields appear. Fact path stays at 0.",["The SQL keeps changing between runs.","We need title ideas, not facts.","Can we eval at temperature 1?"]),embeddings:o("“How do I reset my password?” and “forgot login” should find the same help page. The words do not match.","Turn each sentence into a list of numbers so nearby meanings sit nearby.","reset-password and forgot-login sit close. pizza sits far. You store the lists next to the page id.",["Search that survives paraphrase.","Can I mix two embedding models in one index?","When is this worse than Ctrl+F?"]),"cosine-similarity":o("You have a question vector and many page vectors. Long pages should not win just for being long.","Which pages point the same way as the question?","Query [1, 0]. Page A [0.9, 0.1] beats page B [0, 1]. Direction, not length.",["How do you rank chunks?","Best score is 0.3. Do you still answer?","Show the formula in JS."]),"keyword-vs-vector":o("An analyst types “D7 retain.” A teammate types “players who came back after a week.”","When do you need the exact token, and when do you need meaning?","D7 retain → keyword on the glossary. The English sentence → vectors. Often both, then merge.",["Ctrl+F misses the paraphrase.","Vector search misses the metric name.","How would you combine them?"]),chunking:o("The handbook is 80 pages. The model’s box is small. You must cut it into pages you can search.","Where do you cut so a thought is not split in half?","Split on headings. A table’s header stays with its rows. Overlap a little at the edges.",["How do you split a markdown handbook?","What metadata do you store on each piece?","A table got split. What breaks?"]),"retrieve-then-read":o("Users ask questions about your notes. The notes are bigger than the window.","Pick a few pages first. Answer only from those. Cite or say you do not know.","Three chunks. Question matches chunk 2. Answer cites [2]. If none match: UNKNOWN.",["Design a bot over our wiki.","Why not dump the whole wiki in the prompt?","How do you debug a wrong answer?"]),"stale-context":o("The FAQ changed yesterday. The search index still has last month’s answer. The bot is sure.","How does a page update or delete reach the index?","Publish → delete old ids → write new chunks → embed. Or the answer must say “as of June.”",["We updated the policy. The bot still cites the old one.","Treat the index like what?","What if we cannot reindex live?"]),"function-calling":o("The user asks “what is 2+3?” You do not want the model to guess arithmetic. You have add(a, b) in JS.","The model should name the function and the args. Your code runs. Then it speaks.","Model returns add({a:2,b:3}). JS returns 5. Final sentence uses 5. It does not invent 6.",["The model needs live revenue. How?","Who is the source of truth — the model or your function?","What if the args are garbage?"]),hallucination:o("The notes are about parking. The user asks about refunds. The bot writes a fluent refund policy.","Stop the fluent lie. What should it say instead?","Correct: UNKNOWN. A citation is required when it does answer.",["It sounds sure and is wrong.","How do you test the missing-info case?","“Be helpful” broke the refuse. Why?"]),"golden-eval":o("You changed one line of the prompt. You need to know if the bot got worse before users do.","A short list of questions with the facts you will accept. Pass or fail.","10 items. Two must be UNKNOWN. A prompt that fails an old pass does not ship.",["How do you know a prompt change is safe?","What does one eval row look like?","Show me a table, not a chat screenshot."]),"text-to-sql":o("“Top game by revenue yesterday.” You have a warehouse. The model can write SQL. It can also write DROP.","Turn English into a query you would actually run — after a check.","SELECT game, SUM(revenue) … WHERE day = yesterday. Reject anything that is not SELECT. Need a date filter.",["Analysts want English over BigQuery.","Who runs the SQL — the model or your service?","What do you retrieve before you generate?"]),"cost-latency":o("The same correct answer: one call stuffed 8k of notes, another used 800. The bill and the wait changed.","What do you log, what do you cache, what do you cut?","Log tokens in, tokens out, ms. Cache the system prompt. Cap output length.",["This feature is right but too slow and too expensive.","Where is the money — input or output?","What do you cache?"]),"pii-in-prompts":o("A support ticket has an email and a phone. Someone pastes it into the model to summarize.","What do you strip before the model and before the log?","Replace the email and phone. Keep “adult user, billing issue.” The vendor is another copy.",["Can we paste tickets into the model?","What do you redact?","What do you keep in traces?"]),"analytics-qa-design":o("Analysts ask English. The warehouse is BigQuery. A wrong number can move spend.","Sketch v1: who owns the metric, how SQL is checked, when a human must approve.","v1 is one domain (revenue), a certified glossary, generate → validate → run, 10 golden questions. Not six agents.",["Design Q&A over our analytics.","What is v1 vs v2?","Two metrics disagree. What do you do?"])},u={encapsulation:o("ParkingSpot has public occupied and vehicle. Callers set them separately and the two fields disagree.","Hide the fields. One verb must keep occupied iff a vehicle is present.","occupy(car) succeeds; setOccupied(true) does not exist. A later thread-safety ask locks that one method.",["This spot can be occupied and empty. Fix the API.","Now a handicap-only rule — who enforces it?","Make occupy safe when two cars arrive at once."]),abstraction:o("Trip switches on RideType to price. Next week they add pooling and surge.","Name the capability checkout may depend on, and keep vendor math out of the signature.","FareCalculator.quote(trip) — add AirportFlat by adding a class, not an else-if.",["Checkout should not know how UPI works. Draw the type.","A second fare rule appears. What stays untouched?","Tests must run with no payment gateway."]),inheritance:o("Someone drew Penguin extends Bird with fly() that throws. Payroll has Manager extends Employee just to reuse name.","Which relationships are really is-a? Where does a collaborator belong instead?","FlyingBehavior on birds that fly. Manager has a Role, not a parent class.",["Is ElectricCar a Car? What must Car still guarantee?","They push Square extends Rectangle. What breaks?","Rewrite the bird tree so fly is not on the base type."]),polymorphism:o("Chess validator is five instanceof chains. A sixth piece will miss a branch.","One operation on a shared contract. Construct the concrete at the edge.","Piece.legalMoves(board). Adding Knight is a class. The factory may still switch once.",["Now support motorcycles. Point at what you add.","Keep the type switch in one factory — domain talks to the interface.","Notification dispatcher only knows Channel.send."]),"composition-over-inheritance":o("They want LoggedRetryUpiGateway extends UpiGateway, then PeakHourDestinationElevator.","Assemble pricing, locking, and retry as fields you inject. Do not subclass each mix.","CoffeeMachine has Recipe, Inventory, Payment. Add logging by wrapping the gateway, not a new child.",["Elevator has a SchedulingPolicy — it is not PeakHourElevator.","Retry plus metrics plus the real rail. How many new types?","Admin is a User with a Role, not a subclass."]),"interfaces-vs-abstract-classes":o("The board has both IPaymentMethod and AbstractPayment with no shared steps. Vehicle is an empty abstract class.","Decide capability vs partial implementation. Depend on the contract, not the base.","PaymentMethod is an interface. Add AbstractRetryablePayment only after two gateways share a retry skeleton.",["Should Vehicle be abstract or an interface? Why?","A class can implement many roles but extend one parent — what does that imply?","Template-method parsers vs strategy AI players — which construct?"]),"coupling-cohesion":o("TicketService prices, writes SQL, formats HTML, and texts SMS. Checkout calls order.getUser().getWallet().debit().","One sentence per class. Depend on small neighbors, not guts.","Split pricing, reservation, notify. wallet.debit(order.total()) — Checkout does not walk the graph.",["Why another class? Order should not know GST slabs.","That getter chain — where does the method go?","A Utils helper imports the world. What do you cut?"]),immutability:o("Money has setAmount. Two threads share a Config map and one reloads keys in place. Undo stores live objects.","Values that never change after construction. Swap a whole snapshot when config reloads.","Money.plus returns new Money. Config is built, then AtomicReference.set. Undo stores copies.",["Make Money and IDs immutable without being asked.","Thread-safe fee table — lock readers or swap a snapshot?","Undo that cannot corrupt the live buffer."]),"identity-vs-value-objects":o("User.equals compares every field, so a changed email drops them from a Set. Money has an id column.","What stays itself when fields change? What is equal when data matches?","Order is an entity by id. Money(100, INR) equals any other 100 INR. Email validates in its constructor.",["Mark entities with id and values without on the diagram.","Where does email-format validation live?","Never put a mutable User in a HashMap key."]),"has-a-is-a-uses-a":o("Library extends ArrayList<Book>. User has-a SmtpClient. Every arrow on the diagram is inheritance.","Pick is-a, has-a, or uses-a, plus multiplicity and who dies with whom.","Lot has floors, floor has spots, spot has optional vehicle. ParkingService uses PaymentPort — Spot does not own it.",["Talk while you draw: has-a / is-a / uses-a and the numbers.","Aggregation vs composition — one lifetime sentence.","Employee is-a Address became has-a Address."]),"solid-srp":o("ParkingLotManager occupies spots, computes fees, writes SQL, prints tickets, and sends SMS.","Split so each type has one reason to change. The service may orchestrate; it must not hoard math.","They add SMS on park. You add a notifier. Lot.occupy does not open.",["Finance and ops both edit Order. How do you cut?","Now print a different ticket format — which file changes?","Split a 150-line Library into catalog, loan policy, notifier."]),"solid-ocp":o("Adding ElectricVehicle means editing FeeCalculator, Ticket, and the nightly report — each has the same switch.","Keep the park path closed. A new type or wrapper extends behavior.","FeePolicy interface. Weekend rates are a class. Lot.park is untouched.",["If you add another vehicle I will add a class, not edit the lot.","Point at the extension point.","The same switch still lives in three classes — is that open/closed?"]),"solid-lsp":o("Callers write if (bird instanceof Penguin). Square overrides setWidth and silently changes height. ReadOnlyFile extends File and write() throws.","Every child must honor the parent contract. If it cannot, the parent is wrong.","Shape.area() on immutable values. fly() is not on Bird. No UnsupportedOperationException overrides.",["Square extends Rectangle — what does a setter caller assume?","The caller should not branch on subtype. Remove the branch.","A List.add that throws on an immutable list — what broke?"]),"solid-isp":o("Device has print, fax, staple, recharge. Printer implements three no-ops. Query handlers depend on a 12-method Repository.","Role-sized interfaces so a client is not compiled against methods it never calls.","Workable vs Feedable. OrderQueries for the read side. Printer does not implement recharge.",["Robot should not implement eat. Split the interface.","A read-only admin screen — extract a query port.","Plugin SPI is 20 methods. Shrink it."]),"solid-dip":o("BookingService does new MySqlBookingDao() and imports Stripe. Tests need a database to confirm a booking rule.","High-level policy names a port. SQL and HTTP implement it and are injected at the edge.","PaymentPort.charge. In-memory repo in the demo. Composition root news StripeAdapter.",["Draw the arrow from adapter to port, not service to SqlDao.","Swap MySQL for a HashMap without editing the use case.","Clock port so a loan test can freeze due dates."]),dry:o("SUV pays 20 in park(), unpark(), and the nightly report. Someone extracted process(isCancel) because two methods shared four lines.","One home for the same knowledge. Leave look-alike code alone if it will change for different reasons.","FeeSchedule used by park and report. Booking and cancel stay two methods — no boolean flag.",["The fee table is written twice. Where does it go?","They ask you to reuse a method that almost fits. Do you?","Undo an extraction that forced a flag."]),kiss:o("The vending-machine sketch has Kafka, a plugin bus, and six patterns. Twenty minutes left and no coin path.","Fewest types that meet the stated verbs plus one named extension. Trace the happy path in one breath.","Three classes and one payment seam. In-memory inventory. Say how a card rail would plug in — do not build it yet.",["I'll keep this in-memory and extract a repository if we persist.","You are adding a seventh pattern. What can die?","Code the happy path first. Complexity later looks like judgment."]),yagni:o("Tic-tac-toe has an SPI, a connection pool, and four unused payment rails. The board still allows X to play twice.","Build the starred requirements. A seam for the likely follow-up; not a framework for an imaginary product.","One concrete FeePolicy and a spoken 'I would extract here.' Auth, disk, multi-region stay on a not-today list.",["List what you will not build in the first two minutes.","They add a second scheduler — now extract, not before.","Connection pool for a library catalog they never asked for."]),"law-of-demeter":o("Checkout does order.getCustomer().getWallet().debit(x). A zip change breaks three services.","Talk only to immediate friends. Put the verb on the object that owns the data.","customer.charge(order) or wallet.debit(order.total()). Hotel rooms only via Reservation.",["Rewrite that getter chain. Who owns debit?","Outsiders talk to the aggregate root, not LineItem.","cart.getUser().getAddress().getZip() — where does shipping policy sit?"]),"tell-dont-ask":o("if (spot.isFree()) spot.setVehicle(v). ATM gets balance, subtracts, sets balance. Traffic light controller writes the enum.","Command the object. The rule that protects it lives inside the method.","spot.park(v) may refuse. account.withdraw(amount). light.tick(now). Queries stay for UI, not for mutation.",["Replace setStatus with confirm, cancel, expire.","The service is a script of tells, not gets.","if (canPark) park has a race — make park atomic."]),"fail-fast":o("A booking with guestCount -1 dies at payment. Config missing PORT boots and crashes on first request. Money.of silently clamps negatives to 0.","Reject bad shape at the boundary and broken invariants in the constructor. Do not store half-valid objects.","Money rejects non-positive amounts. park validates before occupy. Missing collaborator fails startup.",["Show a constructor that throws on empty plate.","Validate, reserve, charge, confirm — fail before charge when you can.","Legacy rows vs new commands — where are you strict?"]),"separation-of-concerns":o("One ATM file does System.out, HashMap, PIN checks, and cash math. A UI copy change breaks fee tests.","UI, use case, domain rules, and IO in different types. Arrows point toward the domain.","Controller → AtmService → Account + Dispenser. Logging is a wrapper, not a field on Wallet.",["Three boxes: API, application, domain — infra off to the side.","Can you test the fee with no IO?","Add logging without touching the gateway."]),"program-to-an-interface":o("Checkout holds StripeClient. NotificationSender holds SmtpClient. Fields are typed ArrayList.","Type collaborators as roles so a fake or a second vendor drops in without editing the policy.","PaymentMethod, OrderRepository, Clock, List. new the concretes in main.",["Type the fields as interfaces on the diagram.","Second algorithm arrives — what already compiles?","IUserService that clones UserService 1:1 with no fake — keep it?"]),"class-diagrams":o("The board is 30 Manager boxes, no methods, no multiplicity. Controllers occupy Spot. Every DTO is drawn.","A dozen implementable types: verbs with types, ownership, and 1 / 0..1 / *.","Lot → Floor → Spot; park(Vehicle): Ticket. FeePolicy as an interface with space for a second box.",["Draw the lot in eight boxes with methods and numbers.","park() with no types is a wish — write the signature.","They add weekend fees. Where is the empty interface?"]),"sequence-diagrams":o("Classes look fine. Charge runs before reserve. Notify fires before commit. Nobody drew order.","One happy path and one failure: who calls whom, what returns, where it stops.","User → ParkingService.park → Lot.findSpot → Spot.occupy → Ticket. Alt: lot full, no charge.",["Walk park from button to ticket. Then payment declined.","Reserve then charge then confirm — show the fail alt that releases.","Two threads on the last seat — where is the lock on the picture?"]),"use-case-state-diagrams":o("Order has isPaid, isCancelled, isPending — all true. Elevator is booleans. The prompt listed statuses you never drew.","Actors and five goals. For each long-lived thing, legal arrows and the method that fires them.","PENDING → PAID → FULFILLED; CANCELLED from PENDING or PAID. Vending: Idle / Collecting / Dispensing.",["Who parks, who adds floors, what is out of scope?","This command is invalid in this state — return an error.","They add no-show. Node and method, not a new boolean."]),"nouns-to-classes":o("The hotel story became TicketPaper, ParkingFee, Amount, Name, Count. Checkout has no home because verbs were ignored.","Underline nouns and verbs. Keep identity, invariants, or behavior. Collapse synonyms.","Spot is an entity, fee is a value, printer is a port you skip unless asked. park lives on the lot.",["Tag each noun entity / value / service / field out loud.","They add EV charger. Collaborator, not a rewrite.","BookMyShow noun table before any boxes."]),"entities-vs-values-vs-services":o("Email has a surrogate id. User.charge() is static. PaymentGateway got a fake primary key so it could 'be an entity'.","Identity over time, data equality, or behavior with no id. Repositories only for the first.","Order #1001 stays itself after items change. Money is interchangeable. FareCalculator has no table.",["Annotate the diagram (E) (V) (S).","GST calculation — User method or policy?","You persist entities and embed values."]),aggregates:o("Controllers call spot.occupy. LineItem has its own repository. Room nights oversell because Floor and Lot both decrement.","One root per cluster. Outsiders change parts only through it. Cross-roots by id.","ParkingLot.park is the only mutator of spots. Order.addItem keeps total == sum(lines). Customer is an id on Order.",["ParkingLot is the root; spots are internal.","Two lots — each a root; Mall coordinates.","Splitwise: Expense is a root; balances are projections."]),"factory-vs-constructor":o("Checkout news Car, Bike, Truck, Clock, and a 12-argument Ticket. The same type switch lives in three methods.","Constructor for one simple valid object. Factory when you choose, assemble, or hide collaborators.","new Money(cents, INR). Vehicle.create(type, plate) is the only switch. SearchFilter uses a builder.",["Car, bike, truck — where does new live?","A 12-argument constructor vs builder / fixture.","Public constructor plus factory so callers bypass rules."]),invariants:o("You drew tables and setters. A spot is occupied with no vehicle. Order.total disagrees with lines after removeItem.","Rules that stay true after every constructor and mutator. Name the owner and the failure.","occupiedCount == occupied spots. DateRange.start ≤ end. Write two sentences on the board before methods.",["A spot is never occupied without a vehicle. Which method?","They add a rule — invariant first, then a method.","Which invariant does the lot lock protect?"]),ownership:o("Floor and Lot both write freeCount. getSpots() returns the live list. A static Map is the store with no owner.","One writer per mutable thing. Everyone else gets an id, a copy, or a view.","Lot owns spots; the controller never keeps a Spot. Pool owns sockets; clients call release. Cache owns eviction.",["Lot owns spots. park lives only on Lot.","They add threads — name the owner of each map first.","API that returned List<Spot> now returns ids or snapshots."]),"singleton-pattern":o("ParkingLot.getInstance() holds bookings. Tests share a cache and flake. Logger.getInstance() is called from the domain.","If you truly need one instance, say how it is published — and prefer constructing it once in main.","Eager or holder-class logger. Then inject Logger. Lots are not singletons — a mall has many.",["Write a safe one-instance logger, then refuse it in the domain.","Lazy plus threads — what must be true of the field?","Two tests share a singleton cache. How do you unshare?"]),"factory-method":o("DealHand, exportReport, and park each contain new Car() / new Bike() / new Truck(). The workflow is otherwise stable.","The algorithm talks to a product role. Creation is a method or small object you can stub.","Notification.create(channel) returns Email or Sms. Adding boat is a product plus a factory branch, not a new park().",["Car, bike, truck — one create, not three news in the lot.","They add boat. What do you add?","Tests must inject a fake product without mocking new."]),"abstract-factory":o("UI builds DarkButton next to LightScrollBar. SQL repo is paired with an in-memory lock by accident.","One factory per family so products that must match are born together.","ThemeFactory.createButton + createMenu. WinFactory vs MacFactory. Client never news a widget.",["Light/Dark widgets that must match. Who creates them?","They add a new widget role — what breaks?","One create method named AbstractFactory — did you overname?"]),"builder-pattern":o("HttpRequest has a 12-argument constructor. Two timestamps got swapped. Coffee is new Coffee(true, false, true, 2).","Name each optional part, mutate a builder, freeze a valid product at build().","url required, headers optional. build() rejects inverted dates. Vehicle(plate, type) stays a constructor.",["Pizza / coffee / search filter with add-ons.","Immutable product, private constructor, validate at build.","Reusable builder that leaks last week's toppings."]),"prototype-pattern":o("Duplicate document re-runs a 40-step setup. Clone() copies the list field by reference. Two 'copies' share listeners.","Clone a template, then tweak. Say deep vs shallow, and give entities a new id.","Chess board deep-copies pieces for lookahead. Resume templates issue a new id. Do not clone a singleton.",["Duplicate this document — copy and new id.","Named presets orc/elf — a registry of templates.","Shallow copy of a mutable list. What corrupts?"]),"adapter-pattern":o("Checkout calls stripe.paymentIntents.create. They want PayPal next week. Domain types are Money; the SDK wants cents.","A thin wrapper that satisfies the port you already speak. Translate names, types, and errors. No fee math.","PaypalAdapter implements PaymentMethod. Checkout unchanged. SDK exceptions become domain errors.",["Integrate PayPal too. What do you add?","Wrap a cents-as-int library so the app passes Money.","Fee logic started landing in the adapter — move it."]),"decorator-pattern":o("They asked for retry and metrics on the same gateway. Someone started LoggedRetryUpiGateway extends UpiGateway.","Wrappers that share the interface and stack. Order matters. Core class stays one.","Retry(Log(Real)) logs each attempt. Add metrics by wrapping again at main. Do not edit the gateway.",["Add retry and metrics. How many new types?","Remove logging without touching the core.","A giant UberDecorator with five flags — split it."]),"facade-pattern":o("The controller talks to inventory, tax, payment, and mail in the wrong order. Callers keep charging before reserve.","One verb API that sequences the noisy parts. Rules stay on aggregates; the facade tells them.","ParkingService.park. HomeTheater.watchMovie() turns on amp, projector, lights. Do not leak five internals.",["Name the application service the controller calls.","They want a lower-level step. New use case or a leak?","placeOrder so step 3 cannot run before step 1."]),"proxy-pattern":o("Image.draw() always loads 20MB. Document.open() has no ACL check. ORM code walks order.getLines() and you cannot see the queries.","A stand-in with the same interface that controls access, lazy create, or remotes — not a stack of extra features.","Virtual image loads on first draw. Protection proxy allows write only for owners. Say first call may hit disk.",["Lazy image or ACL on open — who sits in front?","List orders then lines — why did we fire 1+N queries?","A remote stub in a loop — what did we pretend?"]),"composite-pattern":o("File size is if (isFolder) recurse else length, copied in ls, zip, and search. Clients cannot treat a bundle like a SKU.","One component operation on leaf and tree. Children live on the composite. Forbid cycles.","File and Folder share size() and ls(indent). Product bundle price is the sum of children.",["In-memory file system — draw leaf / composite / component.","How does size() recurse? Safe add() or add on leaves?","Permissions that inherit down the tree."]),"bridge-pattern":o("EmailUrgent, SmsUrgent, EmailSilent, SmsSilent. CircleVector, CircleRaster, SquareVector… the grid grows both ways.","Two hierarchies that compose: client-facing abstraction holds a primitive implementor.","Notification (Alert/Digest) holds Channel (Email/Sms). Shape holds Renderer. No CircleVector class.",["Message types and send channels — two axes.","New remote and new device independently.","Only vehicle types vary — do you still split twice?"]),"flyweight-pattern":o("A document allocates a glyph object per character, each holding the same 'A' bitmap. A 1000×1000 map news a Tree mesh per cell.","Share immutable intrinsic data. Keep position and owner outside. Intern via a factory.","26 glyph flyweights plus an array of (char, x, y). Tile types shared across the grid. Do not flyweight User.",["Text editor with millions of characters — what is shared?","One tree turning autumn turned every tree.","Chess has 32 pieces. Do you intern?"]),"strategy-pattern":o("Lot.unpark switches on vehicle type for fees. Elevator.assign is a nest of ifs for peak hour. Checkout will grow UPI next.","One algorithm interface. Context delegates. A factory may pick; the flow does not switch.","Hourly / Daily / Weekend as FeePolicy. Swap SCAN in at 5pm. Adding a coupon is a class.",["Weekend price — where do you cut?","Second elevator policy. What stays closed?","Sort by price vs popularity without editing the list screen."]),"observer-pattern":o("ParkingLot.sendSms() sits next to occupy. They want analytics and email too. A slow send blocks park.","Subject notifies subscribers it does not import. Keep listeners tiny or hand them a queue.","orderPlaced → Emailer and Analytics. Copy the listener list. Unsubscribe on teardown.",["Also send SMS. Do you open ParkingLot?","A listener mutates the subject and you loop forever.","They want reliable delivery — queue behind the same subscribe idea."]),"command-pattern":o("The editor undoes with boolean flags. Job 'send report' is a string in a switch. Remote buttons call Light.on() directly and cannot macro.","The request is an object: receiver plus args, execute, optional undo. Invoker stores history.","InsertCommand / DeleteCommand on a buffer. Queue the same object for retries. Party-mode is a composite command.",["Text editor undo. What does the command remember?","Macro 'party mode' — one execute, one undo.","Queued charges without ids — what double-fires?"]),"state-pattern":o("VendingMachine.select is a 80-line switch. Order allows paid-and-cancelled. Elevator opens the door while moving.","One type per status implements the events. Illegal events fail. Shared data stays on the context.","Idle ignores select. Collecting + select with enough credit goes Dispensing. Draw the machine first.",["Vending / traffic light / order — states then two transitions.","Show an illegal event failing.","Fee types as State classes — wrong cut. What instead?"]),"template-method":o("PdfMiner and CsvMiner copy open → extract → parse → analyze → close. Subclasses started overriding the whole run() to skip a step.","A fixed skeleton in the base. Hooks for the parts that vary. Do not let children reorder the spine.","DataMiner.run is final. PdfMiner implements extract. A second axis (destination) becomes a strategy, not another hook.",["All reports export the same way but write different files.","They add a second variation axis — migrate a hook.","Twelve hooks on the base — simplify or compose."]),"iterator-pattern":o("Callers take Floor.spots, the live array. You cannot change to a map. Someone parks while a report walks and skips a stall.","A cursor over hidden storage. Say fail-fast vs snapshot if the collection mutates.","lot.spots() yields without exposing Floor[]. File tree DFS iterator. Iterator.remove, not list.remove, mid-walk.",["Iterate spots. Do not return the list.","Someone parks mid-report. What does the cursor do?","Pagination as a cursor token — same idea?"]),"chain-of-responsibility":o("Auth, validation, rate-limit, and the use case are one method. ATM cash is a nest of ifs for 2000/500/100. Adding a handler edits every path.","A line of handlers with next. Order is the product. Unhandled must not vanish.","Auth → Role → RateLimit → Controller. Hopper chain fails $30 if only 50s remain. A list of Rule in a loop is the same idea.",["ATM notes and HTTP middleware. Who builds the chain?","Nobody handles — error or swallow?","Validators as a list without next pointers. Acceptable?"]),"mediator-pattern":o("Every widget calls every other widget. Landing planes hold Runway references. Adding a colleague edits eight classes.","Colleagues talk only to a hub that routes. Domain rules stay on the colleagues.","FormMediator enables OK when checkbox and field agree. ChatRoom routes between Users. Tower assigns runways.",["Control tower or chat server — who knows whom?","Mediator vs a fan-out listener — which owns policy?","Do not hub a parking lot. The aggregate is enough."]),"visitor-pattern":o("File and Folder keep growing methods: size, search, virus-scan, zip. You do not own Node and cannot add export.","Stable structure, growing operations. accept/visit so a new report is a new type — and a new node edits every visitor.","SizeVisitor and SearchVisitor on a file tree. Expression EvalVisitor vs PrintVisitor. Parking lot is not this.",["Virus-scan and zip-size without editing File much.","Double dispatch in one sentence.","The hierarchy still grows every sprint — keep Visitor?"]),"memento-pattern":o("Undo pokes editor.privateChars from the history stack. Snapshots alias the live buffer. History is unbounded.","Originator exports an opaque snapshot. Caretaker stores tokens it cannot read. Restore rebuilds invariants.","createMemento / restore. Caretaker is two stacks. Cap history. Store a copy, not a reference.",["Editor undo without leaking fields.","Command for the verb, snapshot if inverse is messy.","Unlimited undo in 40 minutes — what do you bound?"]),"null-object":o("if (logger != null) logger.info in six places. Discount is null and NPE at checkout. Missing strategy is a crash.","A do-nothing implementer of the same interface for optional behavior. Required ports still fail at wiring.","NullLogger. NoDiscount returns 0. Empty iterator. Never NullPayment that pretends a charge succeeded.",["Logging is optional. What do you inject?","Missing price is not $0 — fail instead.","Empty cart as empty collection, not null."]),"producer-consumer":o("Each email does new Thread. The ingest side is bursty; SMTP is slow. The list between them has no cap.","A bounded queue, a full-queue policy, and consumers that keep pulling after a failed item.","Queue of 100, reject or block. Immutable messages. Poison pill or close() to drain.",["Name the bound and what happens when it is full.","A pool of consumers, not a thread per park().","Logger that enqueues; one writer thread."]),"thread-pool":o("park() starts a thread per car. Under load the machine dies. Cached pools grow without a cap. Rejection is silent discard on bookings.","N workers on a bounded task queue. Submit, reject policy, shutdown. The pool does not fix shared inventory.","CPU-bound ≈ cores. Abort or caller-runs on overflow. Future if the caller needs a receipt.",["Never spawn a thread per park(). What instead?","Traffic spikes — rejection policy?","Same pool for 30s SMTP — split IO vs CPU?"]),"future-promise":o("charge() starts work and the caller spins on a boolean. get() with no timeout on a pool thread deadlocks. Errors become null.","A read handle for a result that is not here yet. Complete once. Timeout and cancel are part of the contract.","Future<Receipt> charge(card). Use-case get(2s). Cancel is a product question about the money.",["Async pay — what does the caller hold?","Timeout in the use case, not forever.","Payment then email — compose or nest get()?"]),"actor-model":o("Elevator cars share a mutable stop set with the bank. Lock order across cars is getting scary. Debit is called on account from many threads.","Private state, a mailbox, one message at a time. Others tell(); they do not poke fields.","One actor per car plus a dispatcher. BankAccount handles Debit/Credit. Messages immutable; mailbox bounded.",["Thread-safe elevator bank — one actor per car.","ask() from inside the loop waiting on another actor.","A single global actor is just one thread. Enough for the lot?"]),"rw-lock":o("Every catalog get() takes the same mutex as add(). Gets dominate. Someone upgrades read→write and two threads deadlock.","Many readers or one writer. Release read before write and re-check. Or swap an immutable snapshot.","get under readLock, put/evict under writeLock. Config reload prefers atomic swap if the map is small.",["Thread-safe cache — not synchronize everything.","Writer starvation. Fair lock or write preference?","Upgrade deadlock. How do you take the write?"]),"double-checked-locking":o("if (instance == null) { synchronized { if (instance == null) instance = new X(); } } without a safe field. A thread sees a half-built object.","Lazy shared init needs a publication barrier — or a holder / inject and skip the idiom.","volatile instance, second check under the lock. Prefer a static holder. Failed init must not publish a broken instance.",["Write it correctly, then say you would not ship it.","They forbid volatile. What is left?","Do not DCL a parking lot."]),"immutable-sharing":o("Fee table is a mutable map. Reload writes keys while park() reads. Events on the queue are reused and mutated.","Publish a finished value. Readers load the reference once. Writers clone, then atomically swap.","New Config built off-thread, AtomicReference.set. Messages immutable. Readers may see version n-1 — say if that is OK.",["Reload fees under the lot without locking readers.","Bank balances via stale snapshots — acceptable?","Shell immutable, list field still mutable — a lie."]),"race-deadlock-livelock":o("if (!map.contains) map.put loses an insert. transfer(a,b) and transfer(b,a) lock opposite orders. wait() uses if, not while.","Name the shared data, the lock order, and the retry/backoff. Check-and-act must be one step.","computeIfAbsent. Lock accounts by sorted id. while (!ready) wait(). tryLock with timeout. Jitter on retries.",["Make it thread-safe. First name the maps.","transfer(a,b) — lock order.","wait/notify — say the while loop out loud."]),"thread-safe-cache-counter-inventory":o("likes++ is not atomic. LRU get moves a node with no lock. if (count > 0) count-- sells the last seat twice. Retries debit again.","Counter, cache, and reserve each need a single atomic story — plus an idempotency key when clients retry.","AtomicLong for likes. Mutex around LRU unlink. reserve(sku, qty, requestId). Last item, two threads, one winner.",["Last seat. Write the reserve method.","LRU plus threads — what do you lock?","Double-click checkout — same reservation id."]),"public-surface":o("Library has twelve public setters and rebalanceInternalHeap(). Tests call them. Controllers setOccupied.","A small verb API from the use cases. Internals stay hidden. Changing a public method is a break.","borrow, return, search. park / unpark / pay. Snapshot DTO instead of a debug getter.",["Three public methods on the service, not fifteen.","They want a getter for debugging. Package or snapshot?","Name methods park/unpark, not setOccupied."]),signatures:o("park(Object o). process(boolean, boolean, boolean). transfer(from, to, amount) as raw ints so currency swaps.","Domain types, no flag soup, a result that distinguishes lot-full from a bug.","park(Vehicle): Result<Ticket, Full|Banned>. Clock passed in. Split update(user, admin, notify) into named methods.",["Write park(Vehicle) with a Result on the board.","Third boolean appeared. Split or a policy object?","Do not pass HttpRequest into the domain."]),"errors-vs-results":o("Lot full throws RuntimeException. Card declined is null. catch (Exception) return null. Charge already happened when you throw.","Expected outcomes in the signature. Bugs throw. Map at the edge. No half-mutated aggregate.","park → Result. Declined is domain; timeout is infra and maybe retry. Partial batch gets its own type.",["Lot full is a Result, not an exception.",'They prefer exceptions — closed domain types, not throw new RuntimeException("no").',"You already charged, then throw. What instead?"]),"boundary-validation":o("Controller passes a raw map into ParkingLot. plate == null is checked inside occupy and again in billing. UI-only validation.","Parse and build values at the edge. Domain methods take Email and Money, not strings.","ParkRequest → ParkCommand.of (rejects blank plates) → ParkingService. Auth is a separate 403 step.",["API → validate → command → service. Strings die on the left.","Time is short — checks in value constructors.","Other services' payloads are a boundary too."]),"idempotent-ops":o("Mobile retries park() and two tickets issue. Charge $20 twice because the key was amount+time. Cancel-already-cancelled errors.","Same command, same key, one side effect. Store key plus result under the same lock as the mutation.","Wallet.debit(key, money) returns the first receipt. unpark() twice is success. Compare payload; conflict if it differs.",["Double-click park. Add requestId now.","Payment intent id stored with the charge.","Key generated server-side after the retry — why is that useless?"]),"pagination-in-service-apis":o("listBookings() returns the whole table. Page 3 skips rows when inserts land. Sort is by name only and twins swap pages.","limit plus a stable cursor (or honest offset). Clamp size. Do not load then slice.","list(filter, cursor, limit) → items + nextCursor. Opaque cursor. Autocomplete is a tiny page. Chess pieces are a snapshot, not a list API.",["Show all bookings — put pagination in the signature first.","Movies paginate; one screen of seats is a snapshot.","Page size 0, negative, or sort without a unique tie-break."]),"schema-vs-objects":o("They pasted the bookings table into a class and called it design. Overlap rules have no home because they are not a column. API is Map<String,Object>.","Schema at the wire or store. Objects for operations. Map on purpose.","Reservation computes overlap. The row cannot. URL shortener schema is tiny; uniqueness and expiry live on the object.",["They drew a table first. Objects first, then a table that can store them.","Board as a string in storage; Board.legalMoves in memory.","Anemic Hibernate fields with no methods."]),"orm-n-plus-one":o("listOrders() then each order.getLines() fires a query. GraphQL resolvers do the same. Open-session-in-view hides it until prod.","Name the graph the use case needs. Load it in one or two queries. Lists use a DTO, not a lazy aggregate.","Page of orders, then lines where order_id in (…). Do not lazy-load every seat when listing movies.",["JPA list plus children — how many queries?","Connect that to proxies.","Join-fetch two bags and the row count explodes."]),"transactions-per-use-case":o("inventory.save() commits, then charge fails. park() writes spot and ticket in two saves. The Stripe call sits inside an open DB transaction.","One intention, one unit of work — or reserve / charge / confirm with compensate. The service opens it, not the entity.","ParkingService.park: find + occupy + ticket together. Checkout releases inventory if pay fails. Idempotency key in the same commit.",["park is the transaction. Say it.","Reserve, charge, confirm — charge fails.","Do not save() in a loop, each a transaction."]),"repository-dao":o("BookingService calls jdbc.query. Tests need Postgres. One repository per table, including LineItem, so outsiders mutate lines.","A collection of aggregates at the domain edge. DAOs hide inside adapters. In-memory map is a real implementer.","IParkingLotRepository + HashMap impl. SQL later. No fee math in the repository. No EntityManager in the domain.",["Draw the repo interface and a map impl.","Hibernate still sits behind the same port.","Repository that returns column maps."]),"dto-vs-domain-vs-persistence":o("One User class has JSON annotations, Hibernate annotations, and charge(). Create API requires a persistence id. Hibernate proxies went over the wire.","DTOs travel, domain objects rule, rows store. Map; do not wear three hats unless the app is trivial.","ParkRequest, Ticket, TicketRow. Lists can skip domain. In a 30-minute kata, request + domain is enough.",["Three hats in one sentence. Use two if time is short.","Never return the aggregate's private list as the API.","Movie list DTO is not the Movie aggregate."]),mapping:o("setFoo(dto.getFoo()) lives in the controller and the repository. Timezones convert in three places. Missing money silently becomes 0.","One boring translator per boundary. It may construct values and fail. It does not price or load.","TicketDto.from(ticket). Stripe payload → PaymentResult in one mapper. Do not toDto() on the entity if that couples API versions.",["A field is added. Where is the checklist?","Mapper that calls repositories — move the IO.","Centralize User row ↔ entity and delete the copies."]),"layered-architecture":o("The HTTP handler writes SQL and computes fees. Domain imports Spring annotations. Every class is a *Service in one folder.","UI → application → domain → infra. Writes go through use cases. No upward types.","API, ParkingService, Lot+policies, repos on the side. Three boxes, not eight. Rules not in the controller.",["Three boxes is enough. Place the types.","They say clean architecture — invert the persistence arrow.","Illegal import: domain → SQL. Invert it."]),"hexagonal-architecture":o("They want to swap Stripe for PayPal and test booking without a database. The core already imports Express and new Date().","Domain in the middle. Driving adapters call inbound ports. Driven adapters implement outbound ports. Dependencies point in.","Checkout vs PaymentPort and InventoryPort. Fake both in a unit test. Clock is a port for bookings.",["Ports and adapters — one inbound, two outbound.","InMemoryRepository as the driven adapter for the demo.","Ports named StripeService — you inverted nothing."]),"mvc-mvvm":o("JButton action runs SQL and prices tickets. The board model imports React. View-Model is a second domain with fee math.","Input in a controller or view-model. Rules in a model or use case. View only renders. Seat map observes bookings.","Tic-tac-toe: Board model, VM with cells[], view binds clicks to place(i). Selected tab is view state, not domain.",["Design a client for the garage. View / VM / model.","Backend-only? Controller is a driving adapter — move on.","Seat map refreshes when someone books."]),"clean-architecture":o("They asked for clean architecture. Someone drew four rings, renamed services Interactors, and left JPA on the entities.","Source points inward. Use cases depend on entities and ports they declare. Frameworks are plugins. A test can run the use case with fakes.","Entities + PlaceOrder + controller + repo adapter. No Spring on the use case. Skip InputBoundary theater in 40 minutes.",["Dependency rule: inward only. Two rings, then code.","Can I test the use case with fakes and no Spring?","Circles with no ports — you drew a layer cake."]),"plugin-strategy-engines":o("Checkout edits a switch to add tax, then discount, then a new rail. Third parties cannot ship a rule without a core release.","Closed engine, open registry. Tiny hook interfaces. Config chooses who runs.","validate → quote → authorize → capture. TaxPlugin and DiscountPlugin lists. Add a rail by registering, not editing the engine.",["Support a new payment later — registry plus factory.","Engine.run → hooks → each plugin. Draw it.","Engine still switches on plugin name. Undo that."]),"testing-as-design":o("'How would you test this?' — they would mock the database, but the DAO is a static singleton. Clock is Date.now() inside the entity.","The first client is a test with fakes. Hidden new, time, and god classes become ports.","ParkingService + in-memory lot + fixed clock. Tests: happy, full, banned, double park, last spot. Do not mock the entity.",["I'd unit-test the service with an in-memory lot and a fixed clock.","Name two tests: happy path and last-seat or declined card.","Everything public so we can test it — no."]),"dependency-injection":o("Checkout news StripeClient. OrderService news SmtpClient. Twelve services in one constructor. Domain calls Context.getBean.","Pass collaborators in. Composition root knows concretes. A fat constructor is a cohesion smell, not a DI smell.","new ParkingService(lot, clock, payments) in main. Tests are another root. Values like Money are still new-ed per call.",["Constructor with three ports. Who news this?","Refuse getInstance for the repository.","Spring annotations at the edge, not on entities."]),"fakes-vs-mocks":o("Tests expect charge() once in this order and miss an oversell. The repo mock returns mocks. Nobody implemented the uniqueness the DB has.","A working stand-in that honors the contract. Mock only a tiny vendor. Assert domain outcomes.","InMemoryBookingRepository with the same unique rule. FakePayment declines on a flag. Fake mailbox list vs a mock send().",["Lead with fake repository and fake payment.","Verify email sent — spy mailbox, not a mockist script.","A Clock you can set is a five-line fake."]),"parking-lot":o("A mall garage takes cars and bikes on several floors. Drivers get a ticket and pay on the way out. Spots have types.","Lot owns floors and spots. park/unpark atomically. Fees are a policy, not a switch on the spot.","Weekend rates and EV stalls. Last stall, two cars — one ticket. Do not rewrite park.",["Design a parking garage. Classes, then I add a vehicle type.","EV spots and surge pricing without editing Lot.park.","Make park safe when two cars want the last stall."]),elevator:o("A building has several cars. Hall buttons ask for a direction. Cars must not open while moving. Peak hour will change dispatch.","Car as a state machine. Bank assigns hall calls through a scheduler you can swap.","Nearest-idle first, then SCAN. One actor per car. Maintenance rejects new stops.",["Design the elevators. States, then a scheduler seam.","Now destination-dispatch or peak-hour parking.","Many cars moving at once — who owns each stop set?"]),"hotel-booking":o("Guests search rooms by type and dates, hold, pay, check in, cancel. Two guests must not get the same room-night.","DateRange as a value. Reservation status that occupies inventory. Search vs book as query vs command.","Overlapping deluxe stays — second fails. 15-minute PENDING hold that expires. Clock is a port.",["Design hotel reservations. Overlap is the invariant.","Assign room at booking or at check-in — pick one.","Last room-night, two books at once."]),library:o("Members borrow physical copies, not ISBNs. Due dates and fines depend on student vs faculty. Search is by title.","Title vs Copy. Loan record plus a policy for limits and dues. Clock for fines.","Borrow/return/fine with a fixed clock. Reservation queue assigns the next returned copy.",["Design a library. You loan a copy, not a title.","Faculty may keep books longer. Where is that number?","Two members cannot take the same barcode."]),restaurant:o("A dining room seats parties and takes orders. Kitchen needs tickets. Menu prices change while a check is open.","Seating and Order are two aggregates. Snapshot line prices. Order has a real lifecycle.","Add/remove line, send, pay. Menu edit does not change open checks. No-show frees a reserved table.",["Design restaurant seating and orders. Two boundaries.","Online orders — same Order aggregate?","Split checks or one order per table?"]),atm:o("A walk-up machine reads a card, checks a PIN, and pays cash. The tray may not be able to make the amount even if the bank says yes.","Machine states, a bank port, and a hopper chain. Authorize, payout, capture or reverse. Never store PIN.","$30 requested, only 50s left — refuse and do not debit. Fake bank declines; hoppers do not move.",["Design an ATM. Hardware, bank port, cash.","Bank says no vs tray cannot make $70.","Session timeout and card eaten after N PIN fails."]),"vending-machine":o("People insert coins, pick a SKU, get a can and change. Selecting with no credit must fail. Stock and the coin box can both be short.","State machine plus inventory plus change-making. Decrement stock in the same commit as the sale.","Two products and change. Card payment as a second payment method — do not explode the states. Exact-change mode when the box is short.",["Design a vending machine. Idle cannot select.","Add card without rewriting every state.","Last can, two buyers."]),"traffic-signal":o("A four-way intersection must never show two conflicting greens. Yellow and all-red exist. Later they want sensors or a fire truck.","Phases as data. Controller is the only mutator. Policy picks the next legal phase. Clock for ticks.","N-S / E-W with 30/3/2 timings under a fake clock. Pedestrian phase. Fault → flashing red.",["Design the intersection. Conflicting greens never happen.","Actuated or emergency preemption — new policy.","A sensor dies. What is fail-safe?"]),chess:o("Two players move pieces on 8×8. A move that leaves you in check is illegal. They will ask about castling or a weak AI later.","Piece.legalMoves. Game.apply is the only mutator. Clone or try/revert for self-check. Scope specials.","Rook, bishop, knight movement + apply + check. Undo via history. No 400-line switch in Game.",["Design chess. Movement and check; castling later.","Do not switch on piece type in Game.","AI lookahead — clone the board."]),"tic-tac-toe":o("A 3×3 game, two marks, win or draw. X must not play twice. They may want a computer player.","Board owns cells. Game owns turn and result. AI is a strategy. Finish it.","Win on a row. Reject occupied. Random AI behind nextMove(board, mark). Undo is a later stack.",["Design tic-tac-toe and finish the game.","Then add an AI strategy.","Larger board, N-in-a-row."]),"snake-and-ladder":o("Players take turns on a numbered board. Snakes and ladders jump. Winning may require an exact landing. Tests need a known dice sequence.","Board as a jump map. Dice is a port. Game.turn applies bounce-or-skip and extra-turn policy.","FakeDice [6,3,2] to a known winner. Reject a board with a cycle. Size N, not hardcoded 100.",["Design snake and ladder. Dice is injected.","Exact land vs overshoot — a policy.","Load the board from config."]),splitwise:o("Friends log dinners. Equal, exact, or percent splits. Someone wants a simplify button. Money must not drift.","Expense plus a split strategy. Ledger stays balanced. Simplify suggests payments and does not rewrite history.","Equal and exact on four users. Percent that is not 100 fails. Leftover cents assigned on purpose. No floats.",["Design a bill-split app. Shares must sum to total.","Simplify does not mutate the ledger.","Retry addExpense with the same request id."]),"coffee-machine":o("The first sketch is Latte extends Espresso extends Beverage. Drinks are recipes over milk and espresso. Last milk can race.","Recipe data, inventory consume, payment port. Add-ons as extras or a wrapper. No drink class tree.","Three recipes plus a mocha extra. New drink is a map. Two orders, last milk — one fails.",["Design a coffee machine. Composition, not a beverage tree.","Show a recipe map for Mocha.","Last milk, two threads."]),"car-rental":o("A fleet sits at stations. Customers book a type or a VIN for dates, pick up, and sometimes return elsewhere.","Hotel booking plus location and vehicle lifecycle. Overlaps on a VIN are forbidden. Maintenance hides a car from search.","Two overlapping bookings fail. One-way return moves the car; search at the new station finds it.",["Design car rental. Dates, stations, vehicle status.","One-way return — pricing and location.","Last compact at a station, two books."]),"cart-checkout":o("Shoppers add SKUs, apply a coupon, and pay. Double-click checkout charges twice. Catalog price changes should not rewrite yesterday's order.","Cart is disposable lines with snapshots. Checkout reserves, charges, creates an Order, compensates on fail.","FakePayment declines — inventory released. Two checkouts, last SKU, one winner. Coupon is a pricing plugin.",["Design cart and checkout. Reserve then charge then confirm.","Coupon without an if in Cart.","Double-click — idempotency key."]),"cards-poker":o("A table deals cards, runs betting, and ranks hands. Ranking ifs leaked into Table.showdown. Tests cannot force a flush.","Card as a value, Deck with a Random port, Ranker strategy, Table as the round loop. Scope side pots.","Five-card ranker: flush beats pair. Fake Random deals a known winner. One betting round + showdown.",["Design cards and a holdem-lite table. Scope hard.","Ranker tests, not ifs in the table.","All-in side pots — mention, implement later."]),"producer-consumer-queue":o("You must code a bounded in-memory queue. Producers block when full. close() must let consumers drain. if (full) wait already bit someone.","Circular buffer, mutex, two conditions, while loops. Immutable items. Put after close rejects.","Four producers, four consumers. Capacity 1 is the tight test. drop-oldest vs block as a policy.",["Implement a bounded queue. while, not if.","close() that lets consumers drain.","Language already has BlockingQueue — implement wait/notify anyway."]),"rate-limiter":o("An API must allow N calls per user per second, with a burst. Date.now() is sprinkled. One lock guards every key.","Token bucket or sliding window behind allow(key). Clock is a port. Stripe locks per key. Decorator on the handler.","5/s burst 10 with a fake clock. Deny returns retry-after. Second policy is a strategy.",["Design a rate limiter. Per user? Burst?","Wrap a payment port with a limit decorator.","Distributed later — same interface, Redis adapter."]),"lru-cache":o("A cache of size k. get and put must be fast. When full, the coldest key leaves. They will ask LFU or threads.","Hash map plus a doubly linked list (or freq lists). get updates recency. Evict tail. Lock if threaded.","Capacity 2: put 1, put 2, get 1, put 3 → 2 is gone. Then LFU. Then a mutex around structural changes.",["Design get and put in O(1). Which key leaves?","Now LFU.","Now two threads get and put."]),"thread-safe-logger":o("200 threads synchronized on one file. Callers stall. Events are reused. The queue of lines has no bound.","Immutable LogEvent, bounded queue, one writer, pluggable appenders. Level check before format.","Async logger, FileAppender, drop-on-full. MetricsAppender added without editing Logger. Inject, do not require getInstance.",["Design a logger that does not stall the app.","Bound and drop policy.","Add an appender without opening Logger."]),"bounded-buffer":o("Implement a fixed-size buffer. Producers and consumers are threads. They will watch for if (full) wait and a single condition.","Monitor: array, count, mutex, notFull, notEmpty. Signal the opposite side. Capacity-1 test.","put/take plus close() that unblocks waiters. notify vs notifyAll — defend it. Lock-free only if they push.",["Implement a bounded buffer. Write the while loops first.","Capacity 1, many threads.","They say lock-free — offer the monitor first."]),"job-scheduler":o("Holds expire, digest emails go out, a report runs at T. A busy loop polls every 10ms. Handlers run on the scheduler thread and delay everything.","Delay queue plus id map. Dispatcher thread, worker pool. Handlers by type. Clock you can advance.","FakeClock fires two jobs in order. Failing handler retries three times then FAILED. Persist port if they need restart.",["Design an in-process scheduler. Clock and a heap.","Jobs survive restart? Add a store.","New job type 'send report' is a handler class."]),"connection-pool":o("Each request opens a new DB socket. Clients call close on the raw connection. A third waiter hangs forever. Double release corrupts the idle list.","Pool owns connections. Acquire with timeout. Proxy close returns to the pool. Validate before lend. Only the pool really closes.","Max 2, third acquire times out. Killed connection is not re-queued. shutdown is idempotent.",["Design a connection pool. Only the pool closes sockets.","PooledConnection is a proxy.","Acquire timeout is part of the API."]),"in-process-pubsub":o("Modules should react to OrderPlaced without importing each other. A slow email stalls publish. One handler throws and the rest never run.","Broker, typed topics, snapshot the list, isolate errors. Sync vs per-subscriber queues. Unsubscribe token.","Two subscribers; one throws; the other still runs. Async mode with a bounded per-sub queue. No Kafka.",["Design in-process pub/sub. Observer plus optional queues.","Snapshot the list. Catch per handler.","At-least-once? That needs a store — say so."]),bookmyshow:o("People pick a show and seats, hold them, then pay. Holds must die. Two groups want the last pair.","Show owns the seat map. Hold with TTL, then checkout. All-or-none multi-seat. Search is a read model.","Two threads, same seat — one error. FakeClock expires a hold; seat is FREE. Idempotent checkout.",["Design a ticket booth. Hold then pay.","Last two seats, two users each want both.","Clock and an expiry job."]),"mini-uber":o("Riders request a ride. Idle drivers sit on a map. Two drivers tap accept. Surge will land later. They do not want a maps HLD.","Trip state machine, grid location index, matcher strategy, pricing at the end. First CAS wins the trip.","Two idle drivers; nearest wins. Double accept — one fails. Surge is a pricing strategy.",["Design a mini ride-hail. Matching, trip, price — in memory.","Double-accept on the same trip.","Pool vs XL as matcher/pricing variants."]),"notification-dispatcher":o("OrderService talks SMTP and checkout dies when mail is down. Users who opted out of SMS still get texts. Retries loop forever.","Dispatcher, channel adapters, preferences, bounded queue, idempotent send per notification+channel.","Email + SMS; user disables SMS. Fake failing channel retries then dead-letters. Add Push as a class.",["Design a notifier. OrderService only tells the dispatcher.","Add push without editing the core.","At-least-once queue — same id does not double-send."]),"payment-wallet":o("User.balance += from six places. Retry credits twice. transfer(a,b) deadlocks. Amounts are floats.","Wallet aggregate, ledger, Money, idempotent debit/credit. Ordered locks on transfer. Cards are a port.","10 balance, 100 threads debit 1 — ten successes, end at 0. A↔B opposite transfers do not deadlock.",["Design a wallet. Last cent and retries.","Transfer lock order.","Top-up: charge card then credit — compensate if needed."]),"url-shortener":o("Product wants short links, optional alias, expiry, and click counts. Someone started drawing Dynamo and a CDN.","ShortUrl entity, code generator, uniqueness retry, URL validation, repository. Stay in classes.","Custom alias conflict. FakeClock expiry → resolve fails. Bounded regenerate on collision. Reject javascript: URLs.",["Design a URL shortener in classes, not a cache tier.","Collision handling.","If this were distributed — a footnote, then stop."]),autocomplete:o("Typeahead scans the whole dictionary each keystroke. N will grow. They want top-k and later live updates.","Trie or an honest list if N is tiny. suggest(prefix, k). Optional node-level top-k cache.","Insert a corpus; suggest('ca', 3). Clamp k. Concurrent add is a later lock or writer thread.",["Design in-memory autocomplete.","YAGNI a list, then upgrade to a trie.","Hot updates — caches on nodes."]),"in-memory-file-system":o("mkdir, write, read, ls, rm on paths. A file in the middle of a path must fail. Callers mutate the children map. Move can cycle.","Composite tree, Path value, FileSystem facade. resolve() is the shared walk. Snapshots from ls.","mkdir/write/read/ls/rm tests. size() recurses. Permissions later as checks or a proxy. No live map return.",["Design an in-memory file system. File / Directory / resolve.","Find *.md — visitor or a walk.","mv into a descendant — forbid the cycle."]),"amazon-locker":o("Couriers drop packages into sized lockers. Buyers pick up with a code before a deadline. An M box must not enter an S slot.","Site assigns a FREE locker that fits. Code plus TTL. Pickup and expire free the slot. Smallest-fit is a strategy.","Smallest-fit, pickup, expire. Last small locker, two S packages — one fails. Return-to-warehouse port on expiry.",["Design package lockers. Parking lot for boxes, plus a code.","Last small locker, two drop-offs.","Assignment: smallest fit vs near the door."]),"calendar-scheduler":o("Find a 30-minute slot for three people in a window. Working hours exist. Two books can race the same gap. Recurrence is a trap.","Busy ranges merge, invert inside working hours, book re-checks. Store UTC. One Event or per-calendar copies — pick.","Three users, propose a 30m slot. Concurrent books of that slot — one fails. Skip RRULE in v1.",["Design a meeting finder. Merge intervals are the core.","Time zones — store UTC.","Race on the same slot."]),"browser-history":o("Visit, back, forward. Visit after back must drop the forward stack. Tabs should not share history. They may want a size cap.","Two stacks plus current. Encapsulate. Optional append-only log for the history UI.","A→B→C, back, visit D; forward empty. Max-size evicts oldest back. Reopen-closed-tab is a stack on Browser.",["Design browser history. Finish in fifteen minutes.","Show visit clears forward.","Then tabs or persist."]),"text-editor":o("Key handlers call buffer.insert and undo is a pile of flags. Deleted text cannot come back. Snapshots fire every character with no bound.","Buffer API, commands that store inverses, editor stacks. Memento when inverse is messy. Cap history.","Insert, delete, undo, redo. Macro types a snippet as one undo. UI must go through the invoker.",["Design a small editor. Command, buffer, stacks.","Replay is the undo stack reversed.","Plugin commands — interface plus registry."]),"hashmap-internals":o("Design a map. Keys can be mutated after put. == used instead of equals. Resize forgot to rehash. They may ask about threads.","Buckets, hash & mask, chain, load-factor resize. State the equals/hashCode contract. This impl is not concurrent.","Tiny chained map with resize tests. Broken mutable-key demo. ConcurrentHashMap or a lock if they add threads.",["Design a hashmap. hash, walk, resize.","Mutable keys — what happens?","Now concurrent — do not just synchronize without comment."]),logger:o("Domain classes call console.log. Tests cannot silence it. Level INFO still concatenates huge strings. PIN is in the line.","Logger port, levels, appenders, formatters. Guarded logging. Null logger for tests. Inject, do not require a global.","Console + file appenders, level INFO. NullLogger in a unit test. Graduate to the async design if logging is the round.",["A logger port plus a console appender.","If logging is the problem, go async.","NullLogger in tests."]),"config-loader":o("Settings live in a global mutable map. Missing PORT boots anyway. Reload applies half the keys. Secrets print on load.","Overlay sources, validate, publish an immutable snapshot. Atomic swap on reload. Fail boot on required keys.","JSON plus env; fail if PORT missing. Corrupt reload keeps the old snapshot. Fee table as config for the garage.",["Design config load. Immutable snapshot, atomic swap.","Missing required key at boot.","Readers never see a half-applied reload."]),"plugin-system":o("A document host switches on plugin.id. The SPI has twenty methods. Plugins reach into private host fields. Disabling one needs a recompile.","Tiny hooks, registry, engine that does not import concretes. Config enables. Isolate failures. Loader may be hardcoded.","SpellCheck and Uppercase plugins. Disable one via config; engine path unchanged. Demo: add a class, register, host untouched.",["Design a plugin host. SPI stability is the product.","Add a plugin class; engine unchanged.","Fat Plugin interface — segregate."]),"event-bus":o("A stringly-typed bus holds Map payloads. Rules live inside the bus. Publish happens under a lock the handler also needs. Email must send if the order saved — nobody said when.","Typed immutable events, stupid bus, handlers registered in main. Isolate errors. Prefer after-commit if you have a unit of work.","OrderPlaced → email + inventory projection; one throws, the other runs. After-commit flush. Request/reply is a smell.",["Design a typed event bus. Keep it boring.","Email must send if order saved — outbox.","This is a hub or a fan-out — say which you mean."]),"lld-interview-method":o("Forty minutes left. Someone spent twenty-five on nouns, has no park() signature, and is coding a printer. The interviewer cannot interrupt because they went silent.","Speak a 7-step loop: scope, verbs, nouns, invariants, diagram, one sequence, code the heart. Time-box. Leave five minutes for tests and a variant.","Parking garage in 40 using only the steps. Elevator in 25: states, scheduler interface, one car coded.",["Tell me your plan in fifteen seconds, then start.","They rush you to code — keep the invariant and the main signature.","Fifteen minutes left, no code. Jump to the heart with a smaller diagram."]),"add-a-variant":o("The first design works. They add EV, weekend price, a second thread, or undo. You now edit five switches. Kafka for the vending machine is on the board.","Predict one axis, leave a seam, implement one concrete. When the variant arrives, add a type and re-walk the sequence. Push back on HLD-scale extras.","Parking: EV + weekend fee without editing Lot.park. Vending: card via a payment method. Concurrency: name the owner before the locks.",["I will add a class here if you add another X.","This is the open/closed point — add the class live.","They add Kafka to a vending machine. Renegotiate scope."]),"pattern-cheatsheet":o("The prompt says weekend price, also SMS, undo that, last seat, test without SQL. Someone reaches for Visitor on the garage.","Map the product sentence to one seam. One pattern, one interface, one concrete. Prefer the smaller fit.","New fee rule → policy object. Also SMS → listener. Undo → command or snapshot. Last seat → atomic reserve. No SQL → port + fake.",["Weekend price. Also SMS. Undo. Which seams?","Two axes or one? Bridge vs a single policy.","Three patterns on a vending machine — delete extras."]),"pattern-lookalikes":o("They ask 'is that not just a decorator?' You drew a wrapper. Strategy and State both have a field. Factory Method and Abstract Factory are both named Factory.","Distinguish on intent, not on whether there is a wrapper field. Say the sentence, then keep coding.","Retry stack is extra behavior; ACL stand-in is access. Stripe→port is shape; park() is a simpler API over many types. One product vs a matching family. Fan-out vs a named hub.",["Is that not just X? Compare intent, not the wrapper field.","Fee types as State — wrong. How I price vs what I am.","Undo: inverse command vs opaque snapshot. Which and why?"])};function p(e,t){let a={};for(let[s,o]of Object.entries(t))a[`${e}:${s}`]=o;return a}function m(e){let t=Object.assign({},p("dsa",i),p("dsa",r),p("dsa",l),p("dsa",c),p("hld",h),p("lld",u),p("ai",d),p("dsa",n))[`${e.track}:${e.slug}`];return t||function(e){let t=s.EXAMPLES[`${e.track}:${e.slug}`],a=t?[t.input??t.setup,t.result].filter(Boolean).join(" → "):e.practiceIdeas[1]??e.practiceIdeas[0]??"";if("ai"===e.track)return{given:f(e.summary,e.title),find:e.whenToUse[0]??e.practiceIdeas[0]??"Solve the situation. Do not start from the paper name.",example:a,askedAs:g(e,[e.practiceIdeas[0],e.interviewTips[0],e.pitfalls[0]])};if("dsa"===e.track)return{given:f(e.summary,e.title),find:e.whenToUse[0]??e.practiceIdeas[0]??"Return the answer for this input.",example:a,askedAs:g(e,[e.practiceIdeas[0],e.practiceIdeas[1],e.interviewTips[0]])};if("hld"===e.track){let t=e.title.replace(/^Design (a |an |the )?/i,"").replace(/\s+\(.*\)$/,"").trim(),s=/design/i.test(e.category)||/shortener|feed|chat|uber|netflix|dropbox|zoom|youtube|cache|limiter|crawler|wallet|checkout/i.test(e.slug);return{given:s?`A product owner wants ${t}. They have not named a stack.`:`A live system is hurting. Someone asks whether ${t} is the right fix.`,find:s?"Sketch v1: who uses it, read vs write, the jobs that must not fail.":"Say the problem this idea solves, when you would add it, and the cheaper alternative.",example:e.whenToUse[0]??e.practiceIdeas[0]??a,askedAs:g(e,[s?`Design ${t}. Start from the user.`:`We're in pain — would you introduce ${t}?`,e.practiceIdeas[0],e.interviewTips[0]])}}let o=e.title.replace(/^Design (a |an |the )?/i,"").replace(/\s+\(.*\)$/,"").trim(),n="Designs"===e.category||e.slug.includes("method");return{given:n?`Build ${o} in classes. No Kubernetes. They will add a new type after you finish.`:`A codebase is getting messy around ${o.toLowerCase()}.`,find:n?"v1 verbs, nouns, one invariant, then the seam for the next variant.":"What problem this idea solves, the three types, and when a function is enough.",example:e.practiceIdeas[0]??e.whenToUse[0]??a,askedAs:g(e,[n?`Design ${o}. Classes, then I add a variant.`:"When would you use this — without naming the pattern first?",e.practiceIdeas[0],e.interviewTips[0]])}}(e)}function f(e,t){let a=t.replace(/'s Algorithm/i,"").replace(/ Algorithm$/i,"").replace(/ Pattern$/i,"").trim();return e.replace(RegExp(t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"ig"),"this").replace(RegExp(a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"ig"),"this").replace(/\s+/g," ").trim()}function g(e,t){let a=t.map(e=>e?.replace(/\s+/g," ").trim()).filter(e=>!!e);return a.length>=2?a.slice(0,4):[...a,e.pitfalls[0]?`What goes wrong if ${e.pitfalls[0].toLowerCase()}`:"Empty input, n=1 — what happens?"].slice(0,4)}function w(e,t,a){return{title:e,code:t.trim(),logs:a}}let y={tokens:w("count pieces, not words",`const text = "unbelievable password reset";
const pieces = text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
console.log("words", text.split(" ").length);
console.log("pieces (stand-in)", pieces.length, pieces);
console.log("real tokenizers split 'unbelievable' further");`,["words  3","pieces (stand-in)  3  [unbelievable, password, reset]","real tokenizers split 'unbelievable' further"]),"cosine-similarity":w("which list points the same way",`function cos(a, b) {
  const dot = a.reduce((s, x, i) => s + x * b[i], 0);
  const na = Math.hypot(...a);
  const nb = Math.hypot(...b);
  return dot / (na * nb);
}
const q = [1, 0];
console.log("reset-ish", cos(q, [0.9, 0.1]).toFixed(2));
console.log("pizza", cos(q, [0, 1]).toFixed(2));`,["reset-ish  0.99","pizza  0.00"]),"retrieve-then-read":w("find pages, then answer",`const chunks = [
  { id: 1, text: "Garage open 8 to 20." },
  { id: 2, text: "Refunds take 5 days." },
  { id: 3, text: "EV spots on floor 2." },
];
const q = "when is the garage open";
const hit = chunks.find((c) => c.text.toLowerCase().includes("garage"));
console.log("retrieved", hit.id, hit.text);
console.log("answer", "Open 8–20. [1]");
console.log("refunds question → UNKNOWN (no hit)");`,["retrieved  1  Garage open 8 to 20.","answer  Open 8–20. [1]","refunds question → UNKNOWN (no hit)"]),"golden-eval":w("ten rows, pass or fail",`const evals = [
  { q: "garage hours", got: "8-20 [1]", pass: true },
  { q: "refunds", got: "UNKNOWN", pass: true },
  { q: "refunds", got: "we refund in 3 days", pass: false },
];
for (const row of evals) console.log(row.q, row.got, row.pass ? "PASS" : "FAIL");`,["garage hours  8-20 [1]  PASS","refunds  UNKNOWN  PASS","refunds  we refund in 3 days  FAIL"]),"text-to-sql":w("english in, then check",`const sql = "SELECT game, SUM(revenue) FROM plays WHERE day = '2026-09-01' GROUP BY game";
const bad = "DROP TABLE plays";
function allow(s) {
  const u = s.trim().toUpperCase();
  return u.startsWith("SELECT") && u.includes("WHERE");
}
console.log("ok", allow(sql));
console.log("drop", allow(bad));`,["ok  true","drop  false"])},b={"two-pointers":w("pair sum in a sorted array",`const nums = [1, 2, 4, 7, 11];
const target = 11;
let L = 0, R = nums.length - 1;

while (L < R) {
  const sum = nums[L] + nums[R];
  console.log(\`\${nums[L]} + \${nums[R]} = \${sum}\`);
  if (sum === target) break;
  if (sum > target) R--;
  else L++;
}`,["1 + 11 = 12  → too big, R--","1 + 7 = 8   → too small, L++","2 + 7 = 9   → too small, L++","4 + 7 = 11  → hit. return [2, 3]"]),"binary-search":w("find 9 in a sorted array",`const nums = [1, 3, 5, 7, 9, 11, 13];
const target = 9;
let lo = 0, hi = nums.length - 1;

while (lo <= hi) {
  const mid = lo + Math.floor((hi - lo) / 2);
  console.log({ lo, mid, hi, v: nums[mid] });
  if (nums[mid] === target) break;
  if (nums[mid] < target) lo = mid + 1;
  else hi = mid - 1;
}`,["{ lo: 0, mid: 3, hi: 6, v: 7 }  7 < 9 → lo = 4","{ lo: 4, mid: 5, hi: 6, v: 11 } 11 > 9 → hi = 4","{ lo: 4, mid: 4, hi: 4, v: 9 }  found at index 4"]),bfs:w("shortest hops with a queue",`const graph = { A: ["B", "C"], B: ["D"], C: ["E"], D: [], E: [] };
const q = ["A"];
const seen = new Set(["A"]);

while (q.length) {
  const node = q.shift();
  console.log("visit", node, "queue", [...q]);
  for (const nxt of graph[node]) {
    if (!seen.has(nxt)) {
      seen.add(nxt);
      q.push(nxt);
    }
  }
}`,["visit A  queue []     enqueue B, C","visit B  queue [C]    enqueue D","visit C  queue [D]    enqueue E","visit D  queue [E]","visit E  queue []     done. order A B C D E"]),"prefix-hashmap":w("subarray sum = k with a Map",`const nums = [1, 2, 3, -2, 5];
const k = 3;
let prefix = 0;
const seen = new Map([[0, 1]]);
let hits = 0;

for (const x of nums) {
  prefix += x;
  hits += seen.get(prefix - k) ?? 0;
  seen.set(prefix, (seen.get(prefix) ?? 0) + 1);
  console.log({ x, prefix, hits });
}`,["{ x: 1, prefix: 1, hits: 0 }","{ x: 2, prefix: 3, hits: 1 }   [1,2] sums to 3","{ x: 3, prefix: 6, hits: 2 }   [3] sums to 3","{ x: -2, prefix: 4, hits: 2 }","{ x: 5, prefix: 9, hits: 3 }   [1,2,3,-2,5] wait — leftover 6 in Map"]),"two-sum":w("Map leftover → index",`const nums = [2, 7, 11, 15];
const target = 9;
const seen = new Map();

for (let i = 0; i < nums.length; i++) {
  const need = target - nums[i];
  if (seen.has(need)) {
    console.log("hit", [seen.get(need), i]);
    break;
  }
  seen.set(nums[i], i);
  console.log("store", nums[i], "→", i);
}`,["store 2 → 0","hit [0, 1]   because 9 - 7 = 2 already in the Map"]),"sliding-window-fixed":w("max sum of k=3",`const nums = [2, 1, 5, 1, 3, 2];
const k = 3;
let sum = nums[0] + nums[1] + nums[2];
let best = sum;
console.log(nums.slice(0, 3), sum);

for (let i = k; i < nums.length; i++) {
  sum += nums[i] - nums[i - k];
  best = Math.max(best, sum);
  console.log(nums.slice(i - k + 1, i + 1), sum);
}
console.log("best", best);`,["[2, 1, 5] 8","[1, 5, 1] 7","[5, 1, 3] 9","[1, 3, 2] 6","best 9"]),kadane:w("max subarray with one pass",`const nums = [-2, 1, -3, 4, -1, 2, 1];
let best = nums[0], streak = nums[0];

for (let i = 1; i < nums.length; i++) {
  streak = Math.max(nums[i], streak + nums[i]);
  best = Math.max(best, streak);
  console.log({ i, x: nums[i], streak, best });
}`,["{ i: 1, x: 1, streak: 1, best: 1 }   start over at 1","{ i: 2, x: -3, streak: -2, best: 1 }","{ i: 3, x: 4, streak: 4, best: 4 }    start over at 4","{ i: 4, x: -1, streak: 3, best: 4 }","{ i: 5, x: 2, streak: 5, best: 5 }","{ i: 6, x: 1, streak: 6, best: 6 }    [4,-1,2,1]"]),dfs:w("stack, not recursion",`const graph = { A: ["B", "C"], B: ["D"], C: [], D: [] };
const stack = ["A"];
const seen = new Set();

while (stack.length) {
  const node = stack.pop();
  if (seen.has(node)) continue;
  seen.add(node);
  console.log("visit", node);
  for (const nxt of [...graph[node]].reverse()) stack.push(nxt);
}`,["visit A   push C, then B (so B pops first)","visit B   push D","visit D","visit C   order A B D C — deep first"]),"lru-cache":w("Map keeps insertion order",`class LRU {
  constructor(cap) { this.cap = cap; this.map = new Map(); }
  get(k) {
    if (!this.map.has(k)) return -1;
    const v = this.map.get(k);
    this.map.delete(k); this.map.set(k, v);
    return v;
  }
  put(k, v) {
    if (this.map.has(k)) this.map.delete(k);
    this.map.set(k, v);
    if (this.map.size > this.cap) {
      const oldest = this.map.keys().next().value;
      this.map.delete(oldest);
      console.log("evict", oldest);
    }
  }
}
const lru = new LRU(2);
lru.put(1, "a"); lru.put(2, "b");
console.log("get 1", lru.get(1));
lru.put(3, "c");
console.log("get 2", lru.get(2));`,["get 1 a     (1 is now most recent)","evict 2","get 2 -1    2 was the oldest after we touched 1"])},k={"linear-search":w("scan until 7 shows up",`const nums = [4, 9, 1, 7, 3];
const target = 7;

for (let i = 0; i < nums.length; i++) {
  console.log("check", i, nums[i]);
  if (nums[i] === target) {
    console.log("found at", i);
    break;
  }
}`,["check 0 4","check 1 9","check 2 1","check 3 7","found at 3"]),"binary-search-bounds":w("first and last 2",`const nums = [1, 2, 2, 2, 5];
const t = 2;

function bound(wantLeft) {
  let lo = 0, hi = nums.length - 1, ans = -1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === t) {
      ans = mid;
      console.log(wantLeft ? "first" : "last", mid);
      if (wantLeft) hi = mid - 1;
      else lo = mid + 1;
    } else if (nums[mid] < t) lo = mid + 1;
    else hi = mid - 1;
  }
  return ans;
}

console.log({ first: bound(true), last: bound(false) });`,["first 2   mid hit, keep going left","first 1   tighter left edge","last 2    mid hit, keep going right","last 3    last = 3","{ first: 1, last: 3 }"]),"peak-finding":w("climb a bitonic array",`const nums = [1, 3, 8, 12, 4, 2];
let lo = 0, hi = nums.length - 1;

while (lo < hi) {
  const mid = Math.floor((lo + hi) / 2);
  console.log({ mid, v: nums[mid], next: nums[mid + 1] });
  if (nums[mid] < nums[mid + 1]) lo = mid + 1;
  else hi = mid;
}
console.log("peak", lo, nums[lo]);`,["{ mid: 2, v: 8, next: 12 }  still climbing → lo = 3","{ mid: 4, v: 4, next: 2 }   slope down → hi = 4","{ mid: 3, v: 12, next: 4 }  12 is bigger","peak 3 12"]),"search-rotated-array":w("find 0 after a rotate",`const nums = [4, 5, 6, 7, 0, 1, 2];
const t = 0;
let lo = 0, hi = nums.length - 1;

while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);
  console.log({ lo, mid, hi, v: nums[mid] });
  if (nums[mid] === t) break;
  if (nums[lo] <= nums[mid]) {
    if (t >= nums[lo] && t < nums[mid]) hi = mid - 1;
    else lo = mid + 1;
  } else {
    if (t > nums[mid] && t <= nums[hi]) lo = mid + 1;
    else hi = mid - 1;
  }
}`,["{ lo: 0, mid: 3, hi: 6, v: 7 }  left half sorted, 0 not in it → lo = 4","{ lo: 4, mid: 5, hi: 6, v: 1 }  0 lives in [0, 1] → hi = 4","{ lo: 4, mid: 4, hi: 4, v: 0 }  found"]),"binary-search-on-answer":w("min eat speed for 8 hours",`const piles = [3, 6, 7, 11];
const hours = 8;

function ok(speed) {
  let h = 0;
  for (const p of piles) h += Math.ceil(p / speed);
  return h <= hours;
}

let lo = 1, hi = 11, ans = 11;
while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);
  const good = ok(mid);
  console.log("speed", mid, good ? "fits" : "too slow");
  if (good) { ans = mid; hi = mid - 1; }
  else lo = mid + 1;
}
console.log("min speed", ans);`,["speed 6 fits      1+1+2+2 = 6h, try slower","speed 3 too slow  1+2+3+4 = 10h","speed 4 fits      1+2+2+3 = 8h on the nose","min speed 4"]),"ternary-search":w("max of a bitonic array",`const a = [1, 3, 8, 12, 9, 4, 2];
let lo = 0, hi = a.length - 1;

while (hi - lo > 2) {
  const t = Math.floor((hi - lo) / 3);
  const m1 = lo + t, m2 = hi - t;
  console.log({ m1, v1: a[m1], m2, v2: a[m2] });
  if (a[m1] < a[m2]) lo = m1;
  else hi = m2;
}
let p = lo;
for (let i = lo; i <= hi; i++) if (a[i] > a[p]) p = i;
console.log("peak", p, a[p]);`,["{ m1: 2, v1: 8, m2: 4, v2: 9 }   8 < 9 → climb, lo = 2","{ m1: 3, v1: 12, m2: 5, v2: 4 }  12 wins → hi = 5","{ m1: 3, v1: 12, m2: 4, v2: 9 }  still 12 → hi = 4","peak 3 12"]),"interpolation-search":w("probe where 18 should sit",`const nums = [10, 12, 16, 18, 22, 24, 33, 35, 42, 47];
const t = 18;
let lo = 0, hi = nums.length - 1;

while (lo <= hi && t >= nums[lo] && t <= nums[hi]) {
  const span = nums[hi] - nums[lo];
  const pos = lo + Math.floor(((t - nums[lo]) * (hi - lo)) / span);
  console.log({ lo, pos, hi, v: nums[pos] });
  if (nums[pos] === t) break;
  if (nums[pos] < t) lo = pos + 1;
  else hi = pos - 1;
}`,["{ lo: 0, pos: 1, hi: 9, v: 12 }  estimate short → lo = 2","{ lo: 2, pos: 2, hi: 9, v: 16 }  still short → lo = 3","{ lo: 3, pos: 3, hi: 9, v: 18 }  landed"]),"exponential-search":w("double the bound, then binary",`const nums = [1, 2, 3, 4, 8, 16, 32, 64];
const t = 16;
let bound = 1;

while (bound < nums.length && nums[bound] < t) {
  console.log("bound", bound, nums[bound]);
  bound *= 2;
}
let lo = Math.floor(bound / 2);
let hi = Math.min(bound, nums.length - 1);
console.log("window", lo, hi);

while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);
  console.log("mid", mid, nums[mid]);
  if (nums[mid] === t) break;
  if (nums[mid] < t) lo = mid + 1;
  else hi = mid - 1;
}`,["bound 1 2","bound 2 3","bound 4 8","window 4 7","mid 5 16  found"]),"sliding-window-variable":w("shortest subarray summing to ≥ 7",`const nums = [2, 3, 1, 2, 4, 3];
const need = 7;
let L = 0, sum = 0, best = Infinity;

for (let R = 0; R < nums.length; R++) {
  sum += nums[R];
  while (sum >= need) {
    best = Math.min(best, R - L + 1);
    console.log(nums.slice(L, R + 1), sum, "len", R - L + 1);
    sum -= nums[L++];
  }
}
console.log("best", best);`,["[2, 3, 1, 2] 8  len 4","[3, 1, 2, 4] 10 len 4","[1, 2, 4] 7     len 3","[2, 4, 3] 9     len 3","[4, 3] 7        len 2","best 2"]),"fast-slow-pointers":w("Floyd cycle in a next[] list",`const next = [1, 2, 3, 4, 2];
let slow = 0, fast = 0;

do {
  slow = next[slow];
  fast = next[next[fast]];
  console.log({ slow, fast });
} while (slow !== fast);

console.log("cycle meet at", slow);`,["{ slow: 1, fast: 2 }","{ slow: 2, fast: 4 }","{ slow: 3, fast: 3 }  meet","cycle meet at 3"]),"frequency-map":w("count as you walk",`const nums = [4, 1, 4, 2, 4];
const freq = new Map();

for (const n of nums) {
  freq.set(n, (freq.get(n) ?? 0) + 1);
  console.log(n, "→", freq.get(n));
}
console.log("4 appears", freq.get(4));`,["4 → 1","1 → 1","4 → 2","2 → 1","4 → 3","4 appears 3"]),"prefix-hashmap":w("how many subarrays sum to 3",`const nums = [1, 2, 3, -2, 5];
const k = 3;
const seen = new Map([[0, 1]]);
let pref = 0, hits = 0;

for (const n of nums) {
  pref += n;
  hits += seen.get(pref - k) ?? 0;
  seen.set(pref, (seen.get(pref) ?? 0) + 1);
  console.log({ n, pref, hits });
}`,["{ n: 1, pref: 1, hits: 0 }","{ n: 2, pref: 3, hits: 1 }  [1, 2]","{ n: 3, pref: 6, hits: 2 }  [3]","{ n: -2, pref: 4, hits: 3 } [2, 3, -2]","{ n: 5, pref: 9, hits: 4 }  [-2, 5]"]),"group-anagrams":w("sort letters as the Map key",`const words = ["eat", "tea", "tan", "ate"];
const groups = new Map();

for (const w of words) {
  const key = [...w].sort().join("");
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(w);
  console.log(key, groups.get(key));
}
console.log([...groups.values()]);`,["aet [ 'eat' ]","aet [ 'eat', 'tea' ]","ant [ 'tan' ]","aet [ 'eat', 'tea', 'ate' ]","[ [ 'eat', 'tea', 'ate' ], [ 'tan' ] ]"]),"longest-consecutive":w("only start a run at the left edge",`const nums = [100, 4, 200, 1, 3, 2];
const set = new Set(nums);
let best = 0;

for (const n of set) {
  if (set.has(n - 1)) continue;
  let len = 1;
  while (set.has(n + len)) len++;
  best = Math.max(best, len);
  console.log("start", n, "len", len);
}
console.log("best", best);`,["start 100 len 1","start 200 len 1","start 1 len 4     1-2-3-4","best 4"]),"design-hashmap":w("array of buckets, k % 4",`const buckets = [[], [], [], []];

function put(k, v) {
  const i = k % 4;
  const row = buckets[i].find((p) => p[0] === k);
  if (row) row[1] = v;
  else buckets[i].push([k, v]);
  console.log("bucket", i, buckets[i]);
}

put(1, "a");
put(5, "b");
put(2, "c");
console.log("get 5 →", buckets[5 % 4].find((p) => p[0] === 5)[1]);`,["bucket 1 [ [ 1, 'a' ] ]","bucket 1 [ [ 1, 'a' ], [ 5, 'b' ] ]  collision on 1 % 4","bucket 2 [ [ 2, 'c' ] ]","get 5 → b"]),"prefix-sum":w("build pref, then range queries",`const nums = [2, 1, 3, 4];
const pref = [0];
for (const n of nums) pref.push(pref[pref.length - 1] + n);
console.log("pref", pref);

function range(L, R) {
  const sum = pref[R + 1] - pref[L];
  console.log("[" + L + "," + R + "]", sum);
}
range(0, 2);
range(1, 3);
range(2, 2);`,["pref [ 0, 2, 3, 6, 10 ]","[0,2] 6   2+1+3","[1,3] 8   1+3+4","[2,2] 3"]),"difference-array":w("range += in O(1), rebuild after",`const n = 5;
const diff = Array(n + 1).fill(0);

function add(L, R, v) {
  diff[L] += v;
  diff[R + 1] -= v;
  console.log("add", L, R, "+" + v, diff.slice(0, n));
}
add(1, 3, 2);
add(0, 2, 1);

const nums = [];
let run = 0;
for (let i = 0; i < n; i++) {
  run += diff[i];
  nums.push(run);
}
console.log("nums", nums);`,["add 1 3 +2 [ 0, 2, 0, 0, -2 ]","add 0 2 +1 [ 1, 2, 0, -1, -2 ]","nums [ 1, 3, 3, 2, 0 ]"]),"prefix-2d":w("inclusion-exclusion on a 2×3",`const g = [
  [1, 2, 3],
  [4, 5, 6],
];
const p = Array.from({ length: 3 }, () => Array(4).fill(0));

for (let r = 0; r < 2; r++) {
  for (let c = 0; c < 3; c++) {
    p[r + 1][c + 1] = g[r][c] + p[r][c + 1] + p[r + 1][c] - p[r][c];
  }
}
console.log(p[1]);
console.log(p[2]);

function sum(r1, c1, r2, c2) {
  return p[r2 + 1][c2 + 1] - p[r1][c2 + 1] - p[r2 + 1][c1] + p[r1][c1];
}
console.log("box (0,1)-(1,2)", sum(0, 1, 1, 2));
console.log("box (0,0)-(0,1)", sum(0, 0, 0, 1));`,["[ 0, 1, 3, 6 ]","[ 0, 5, 12, 21 ]","box (0,1)-(1,2) 16   2+3+5+6","box (0,0)-(0,1) 3    1+2"]),"rotate-array":w("right-rotate 7 by 3 via reverses",`const nums = [1, 2, 3, 4, 5, 6, 7];
const k = 3;

function rev(a, i, j) {
  while (i < j) {
    [a[i], a[j]] = [a[j], a[i]];
    i++; j--;
  }
}

rev(nums, 0, nums.length - 1);
console.log("flip all", [...nums]);
rev(nums, 0, k - 1);
console.log("flip head", [...nums]);
rev(nums, k, nums.length - 1);
console.log("flip tail", [...nums]);`,["flip all [ 7, 6, 5, 4, 3, 2, 1 ]","flip head [ 5, 6, 7, 4, 3, 2, 1 ]","flip tail [ 5, 6, 7, 1, 2, 3, 4 ]"]),"spiral-matrix":w("peel a 3×3 layer by layer",`const g = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const out = [];
let top = 0, bot = 2, L = 0, R = 2;

for (let c = L; c <= R; c++) out.push(g[top][c]);
console.log("right", [...out]);
top++;
for (let r = top; r <= bot; r++) out.push(g[r][R]);
console.log("down", [...out]);
R--;
for (let c = R; c >= L; c--) out.push(g[bot][c]);
console.log("left", [...out]);
bot--;
for (let r = bot; r >= top; r--) out.push(g[r][L]);
console.log("up", [...out]);
out.push(g[1][1]);
console.log("center", [...out]);`,["right [ 1, 2, 3 ]","down [ 1, 2, 3, 6, 9 ]","left [ 1, 2, 3, 6, 9, 8, 7 ]","up [ 1, 2, 3, 6, 9, 8, 7, 4 ]","center [ 1, 2, 3, 6, 9, 8, 7, 4, 5 ]"]),"set-matrix-zeroes":w("mark the zero row and col",`const g = [[1, 2, 3], [4, 0, 6], [7, 8, 9]];
const zeroR = new Set(), zeroC = new Set();

for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 3; c++) {
    if (g[r][c] === 0) { zeroR.add(r); zeroC.add(c); }
  }
}
console.log("rows", [...zeroR], "cols", [...zeroC]);

for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 3; c++) {
    if (zeroR.has(r) || zeroC.has(c)) g[r][c] = 0;
  }
}
console.log(g[0]);
console.log(g[1]);
console.log(g[2]);`,["rows [ 1 ] cols [ 1 ]","[ 1, 0, 3 ]","[ 0, 0, 0 ]","[ 7, 0, 9 ]"]),"dutch-flag":w("3-way partition 0 / 1 / 2",`const a = [2, 0, 2, 1, 1, 0];
let lo = 0, mid = 0, hi = a.length - 1;

while (mid <= hi) {
  if (a[mid] === 0) {
    [a[lo], a[mid]] = [a[mid], a[lo]];
    lo++; mid++;
  } else if (a[mid] === 2) {
    [a[mid], a[hi]] = [a[hi], a[mid]];
    hi--;
  } else mid++;
  console.log([...a], { lo, mid, hi });
}`,["[ 0, 0, 2, 1, 1, 2 ] { lo: 0, mid: 0, hi: 4 }  swap 2 to the end","[ 0, 0, 2, 1, 1, 2 ] { lo: 1, mid: 1, hi: 4 }  0 stays, lo++","[ 0, 0, 2, 1, 1, 2 ] { lo: 2, mid: 2, hi: 4 }","[ 0, 0, 1, 1, 2, 2 ] { lo: 2, mid: 2, hi: 3 }  swap 2 right","[ 0, 0, 1, 1, 2, 2 ] { lo: 2, mid: 3, hi: 3 }  1, mid++","[ 0, 0, 1, 1, 2, 2 ] { lo: 2, mid: 4, hi: 3 }  done"]),"boyer-moore-majority":w("one candidate, running vote",`const nums = [3, 3, 4, 2, 3];
let cand = null, votes = 0;

for (const n of nums) {
  if (votes === 0) cand = n;
  votes += n === cand ? 1 : -1;
  console.log(n, "→ cand", cand, "votes", votes);
}
console.log("majority", cand);`,["3 → cand 3 votes 1","3 → cand 3 votes 2","4 → cand 3 votes 1","2 → cand 3 votes 0   cancelled","3 → cand 3 votes 1","majority 3"])},v={"bubble-sort":w("adjacent swaps, last i already home",`const a = [4, 2, 5, 1];
for (let end = a.length - 1; end > 0; end--) {
  let swapped = false;
  for (let i = 0; i < end; i++) {
    if (a[i] > a[i + 1]) {
      [a[i], a[i + 1]] = [a[i + 1], a[i]];
      swapped = true;
    }
  }
  console.log("pass", a.slice());
  if (!swapped) break;
}`,["pass [2, 4, 1, 5]   5 bubbled to the end","pass [2, 1, 4, 5]   4 is home","pass [1, 2, 4, 5]   sorted — next pass would swap nothing"]),"selection-sort":w("min of the suffix, swap into place",`const a = [4, 2, 5, 1];
for (let i = 0; i < a.length - 1; i++) {
  let min = i;
  for (let j = i + 1; j < a.length; j++) if (a[j] < a[min]) min = j;
  [a[i], a[min]] = [a[min], a[i]];
  console.log("put", a[i], "at", i, a.slice());
}`,["put 1 at 0  [1, 2, 5, 4]","put 2 at 1  [1, 2, 5, 4]  already there","put 4 at 2  [1, 2, 4, 5]  n-1 swaps, always n² compares"]),"insertion-sort":w("slide the hole left, drop the card in",`const a = [4, 2, 5, 1];
for (let i = 1; i < a.length; i++) {
  const x = a[i];
  let j = i - 1;
  while (j >= 0 && a[j] > x) { a[j + 1] = a[j]; j--; }
  a[j + 1] = x;
  console.log("insert", x, "→", a.slice());
}`,["insert 2 → [2, 4, 5, 1]","insert 5 → [2, 4, 5, 1]  already in order","insert 1 → [1, 2, 4, 5]  pays per inversion"]),"merge-sort":w("split in half, merge the sorted runs",`function merge(L, R) {
  const out = [];
  let i = 0, j = 0;
  while (i < L.length && j < R.length)
    out.push(L[i] <= R[j] ? L[i++] : R[j++]);
  return out.concat(L.slice(i), R.slice(j));
}
function sort(a) {
  if (a.length < 2) return a;
  const m = a.length >> 1;
  const out = merge(sort(a.slice(0, m)), sort(a.slice(m)));
  console.log("merge", out);
  return out;
}
sort([4, 2, 5, 1]);`,["merge [2, 4]     left half","merge [1, 5]     right half","merge [1, 2, 4, 5]  stable: take left on ties"]),"quick-sort":w("Lomuto partition, pivot sits at p",`const a = [3, 7, 1, 4, 2];
function partition(lo, hi) {
  const pivot = a[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (a[j] < pivot) { [a[i], a[j]] = [a[j], a[i]]; i++; }
  }
  [a[i], a[hi]] = [a[hi], a[i]];
  console.log("pivot", pivot, "at", i, a.slice());
  return i;
}
function qs(lo, hi) {
  if (lo >= hi) return;
  const p = partition(lo, hi);
  qs(lo, p - 1);
  qs(p + 1, hi);
}
qs(0, a.length - 1);`,["pivot 2 at 1  [1, 2, 3, 4, 7]  2 is finished","pivot 7 at 4  [1, 2, 3, 4, 7]","pivot 4 at 3  [1, 2, 3, 4, 7]","sorted. last-element pivot hates already-sorted input"]),"randomized-quicksort":w("swap a random index into the pivot slot",`const a = [1, 2, 3, 4, 5];
function partition(lo, hi) {
  const r = lo + ((hi - lo) >> 1); // stand-in for a random index in [lo, hi]
  [a[r], a[hi]] = [a[hi], a[r]];
  const pivot = a[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (a[j] < pivot) { [a[i], a[j]] = [a[j], a[i]]; i++; }
  }
  [a[i], a[hi]] = [a[hi], a[i]];
  console.log("rolled", r, "pivot", pivot, "at", i, a.slice());
  return i;
}
function qs(lo, hi) {
  if (lo >= hi) return;
  const p = partition(lo, hi);
  qs(lo, p - 1);
  qs(p + 1, hi);
}
qs(0, a.length - 1);`,["rolled 2  pivot 3 at 2  [1, 2, 3, 4, 5]  sorted input, mid pivot","left of 3 is already < 3 — tiny work","right of 3 same story","expected n log n on every input, including this one"]),"three-way-quicksort":w("Dutch flag: < p | == p | > p",`const a = [2, 1, 2, 0, 2, 1, 0];
function qsort(lo, hi) {
  if (lo >= hi) return;
  let lt = lo, i = lo, gt = hi;
  const p = a[lo];
  while (i <= gt) {
    if (a[i] < p) { [a[lt], a[i]] = [a[i], a[lt]]; lt++; i++; }
    else if (a[i] > p) { [a[i], a[gt]] = [a[gt], a[i]]; gt--; }
    else i++;
  }
  console.log("pivot", p, "eq", [lt, gt], a.slice());
  qsort(lo, lt - 1);
  qsort(gt + 1, hi);
}
qsort(0, a.length - 1);`,["pivot 2  eq [4, 6]  [1, 0, 1, 0, 2, 2, 2]  all 2s done","pivot 1  eq [2, 3]  [0, 0, 1, 1, 2, 2, 2]","pivot 0  eq [0, 1]  equals stay in the middle — never re-compared"]),"heap-sort":w("max-heap, then swap root to the end",`const a = [3, 9, 2, 1, 4];
function down(i, n) {
  for (;;) {
    let l = i * 2 + 1, r = l + 1, m = i;
    if (l < n && a[l] > a[m]) m = l;
    if (r < n && a[r] > a[m]) m = r;
    if (m === i) break;
    [a[i], a[m]] = [a[m], a[i]];
    i = m;
  }
}
for (let i = (a.length >> 1) - 1; i >= 0; i--) down(i, a.length);
console.log("heap", a.slice());
for (let n = a.length - 1; n > 0; n--) {
  [a[0], a[n]] = [a[n], a[0]];
  down(0, n);
  console.log("pop", a[n], a.slice(0, n));
}`,["heap [9, 4, 2, 1, 3]  build is O(n)","pop 9  [4, 3, 2, 1]","pop 4  [3, 1, 2]","pop 3  [2, 1]","pop 2  [1]   array is now [1, 2, 3, 4, 9]"]),"counting-sort":w("tally, then write values back in order",`const a = [2, 5, 3, 0, 2, 3];
const count = Array(6).fill(0);
for (const x of a) count[x]++;
console.log("count", count);
const out = [];
count.forEach((c, v) => { while (c--) out.push(v); });
console.log("out", out);`,["count [1, 0, 2, 2, 0, 1]  index = value","out [0, 2, 2, 3, 3, 5]","O(n + k) — only when keys are small ints","stable if you walk count backward into a dest array"]),"radix-sort":w("LSD: counting-sort each digit, 1s then 10s",`let a = [170, 45, 75, 90, 2];
for (let exp = 1; exp <= 100; exp *= 10) {
  const buckets = Array.from({ length: 10 }, () => []);
  for (const x of a) buckets[Math.floor(x / exp) % 10].push(x);
  a = buckets.flat();
  console.log("exp", exp, a);
}`,["exp 1    [170, 90, 2, 45, 75]   ones: 0,0,2,5,5","exp 10   [2, 170, 45, 75, 90]   tens","exp 100  [2, 45, 75, 90, 170]   hundreds — done","d passes of stable counting sort"]),"bucket-sort":w("scatter into n buckets, sort each, concat",`const a = [0.42, 0.32, 0.23, 0.52, 0.25];
const n = a.length;
const buckets = Array.from({ length: n }, () => []);
for (const x of a) buckets[Math.floor(x * n)].push(x);
console.log("scatter", buckets);
for (const b of buckets) b.sort((x, y) => x - y);
const out = buckets.flat();
console.log("out", out);`,["scatter  [[], [0.32, 0.23, 0.25], [0.42, 0.52], [], []]","sort buckets → [[], [0.23, 0.25, 0.32], [0.42, 0.52], [], []]","out [0.23, 0.25, 0.32, 0.42, 0.52]","uniform floats → ~O(n); insertion per bucket is the usual"]),"cycle-sort":w("write each value to its dest, chase the cycle",`const a = [4, 3, 2, 1];
let writes = 0;
for (let i = 0; i < a.length; ) {
  const dest = a[i] - 1;
  if (a[i] !== a[dest]) {
    [a[i], a[dest]] = [a[dest], a[i]];
    writes++;
    console.log("write", a[dest], "→", dest, a.slice());
  } else i++;
}
console.log("writes", writes);`,["write 4 → 3  [1, 3, 2, 4]  4 went home, 1 arrived at 0","write 3 → 2  [1, 2, 3, 4]","writes 2   each item written at most once — write-optimal"]),"next-greater-element":w("decreasing stack of indices; i pops losers",`const a = [2, 1, 2, 4, 3];
const ans = Array(a.length).fill(-1);
const st = [];
for (let i = 0; i < a.length; i++) {
  while (st.length && a[st[st.length - 1]] < a[i]) {
    const j = st.pop();
    ans[j] = a[i];
    console.log(a[j], "→", a[i]);
  }
  st.push(i);
}
console.log("ans", ans);`,["1 → 2    index 1 popped by the second 2","2 → 4    index 2 popped","2 → 4    index 0 popped — each index push+pop once","ans [4, 2, 4, -1, -1]"]),"valid-parentheses":w("push openers; closer must match the top",`const s = "([{}])";
const pair = { ")": "(", "]": "[", "}": "{" };
const st = [];
for (const ch of s) {
  if (!pair[ch]) { st.push(ch); console.log("push", ch, st.slice()); }
  else {
    const ok = st.pop() === pair[ch];
    console.log("pop for", ch, ok ? "match" : "fail", st.slice());
    if (!ok) break;
  }
}
console.log("valid", st.length === 0);`,["push (   ['(']","push [   ['(', '[']","push {   ['(', '[', '{']","pop for }  match  ['(', '[']","pop for ]  match  ['(']   then ) empties it","valid true"]),"min-stack":w("second array caches the min after every push",`const st = [], mins = [];
function push(x) {
  st.push(x);
  mins.push(mins.length ? Math.min(x, mins[mins.length - 1]) : x);
  console.log("push", x, "min", mins[mins.length - 1]);
}
function pop() {
  st.pop();
  mins.pop();
  console.log("pop  min", mins[mins.length - 1]);
}
push(3); push(1); push(2); pop(); pop();`,["push 3  min 3","push 1  min 1","push 2  min 1   2 is not smaller","pop  min 1","pop  min 3   old min 1 left with its push"]),"monotonic-stack":w("increasing stack → previous smaller on the left",`const a = [2, 5, 1, 4];
const st = [];
const prev = Array(a.length).fill(-1);
for (let i = 0; i < a.length; i++) {
  while (st.length && a[st[st.length - 1]] >= a[i]) st.pop();
  if (st.length) prev[i] = st[st.length - 1];
  st.push(i);
  console.log("i", i, "prev", prev[i], "stack", st.slice());
}`,["i 0  prev -1  stack [0]","i 1  prev 0   stack [0, 1]  2 is left-smaller of 5","i 2  prev -1  stack [2]      1 pops 5 and 2","i 3  prev 2   stack [2, 3]   1 is left-smaller of 4"]),"monotonic-queue":w("decreasing deque; front is the window max",`const a = [1, 3, -1, -3, 5];
const k = 3;
const dq = [];
for (let i = 0; i < a.length; i++) {
  while (dq.length && a[dq[dq.length - 1]] <= a[i]) dq.pop();
  dq.push(i);
  if (dq[0] <= i - k) dq.shift();
  if (i >= k - 1) console.log("window", a.slice(i - k + 1, i + 1), "max", a[dq[0]]);
}`,["window [1, 3, -1]  max 3","window [3, -1, -3] max 3   3 still in window","window [-1, -3, 5] max 5   3 aged out, 5 evicted the rest"]),"largest-rectangle-histogram":w("nearest shorter walls; width = R - L - 1",`const h = [2, 1, 5, 6, 2, 3];
const n = h.length;
const st = [-1];
let best = 0;
for (let i = 0; i <= n; i++) {
  const cur = i === n ? 0 : h[i];
  while (st.length > 1 && cur < h[st[st.length - 1]]) {
    const j = st.pop();
    const width = i - st[st.length - 1] - 1;
    const area = h[j] * width;
    best = Math.max(best, area);
    console.log("bar", h[j], "w", width, "area", area);
  }
  st.push(i);
}
console.log("best", best);`,["bar 2  w 1  area 2    first bar, right wall is 1","bar 6  w 1  area 6","bar 5  w 2  area 10   bars 5,6 as height 5","bar 3  w 1  area 3","bar 2  w 4  area 8    [5,6,2,3] capped at 2","best 10"]),"sliding-window-max":w("same decreasing deque, emit from i = k-1",`const a = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3, dq = [], out = [];
for (let i = 0; i < a.length; i++) {
  while (dq.length && a[dq[dq.length - 1]] <= a[i]) dq.pop();
  dq.push(i);
  if (dq[0] <= i - k) dq.shift();
  if (i >= k - 1) out.push(a[dq[0]]);
}
console.log(out);`,["[3, 3, 5, 5, 6, 7]","i=2 window [1,3,-1] → 3","i=4 window [-1,-3,5] → 5   3 left the window","i=7 window [3,6,7] → 7","n-k+1 answers, each index enters/leaves the deque once"]),"bfs-dfs-iterative":w("same graph: queue is BFS, stack is DFS",`const g = { A: ["B", "C"], B: ["D"], C: ["E"], D: [], E: [] };

const q = ["A"], seenQ = new Set(["A"]);
while (q.length) {
  const u = q.shift();
  for (const v of g[u]) if (!seenQ.has(v)) { seenQ.add(v); q.push(v); }
}
console.log("bfs", [...seenQ]);

const st = ["A"], seenS = new Set();
while (st.length) {
  const u = st.pop();
  if (seenS.has(u)) continue;
  seenS.add(u);
  for (const v of [...g[u]].reverse()) st.push(v);
}
console.log("dfs", [...seenS]);`,["bfs ['A', 'B', 'C', 'D', 'E']  level order — A then kids then grandkids","dfs ['A', 'B', 'D', 'C', 'E']  deep first — B's chain before C","queue = shortest hops; stack = explicit recursion","mark BFS on enqueue or the queue explodes"]),"circular-queue":w("head/tail modulo cap, size tells full vs empty",`const cap = 3, buf = Array(cap);
let head = 0, tail = 0, size = 0;
function enq(x) {
  if (size === cap) return console.log("full");
  buf[tail] = x;
  tail = (tail + 1) % cap;
  size++;
  console.log("enq", x, "buf", buf.slice(), { head, tail, size });
}
function deq() {
  const x = buf[head];
  head = (head + 1) % cap;
  size--;
  console.log("deq", x, { head, tail, size });
}
enq(1); enq(2); enq(3); deq(); enq(4);`,["enq 1  buf [1, empty, empty]  { head: 0, tail: 1, size: 1 }","enq 2  buf [1, 2, empty]      tail 2","enq 3  buf [1, 2, 3]          size 3 — full","deq 1  { head: 1, tail: 0, size: 2 }","enq 4  buf [4, 2, 3]          4 wrapped into slot 0"]),deque:w("push/pop both ends — JS array can fake it",`const dq = [];
dq.push(2);        // back
dq.unshift(1);     // front
dq.push(3);
console.log("dq", dq.slice());
console.log("popFront", dq.shift(), "left", dq.slice());
console.log("popBack", dq.pop(), "left", dq.slice());
console.log("0-1 BFS: weight 0 unshift, weight 1 push");`,["dq [1, 2, 3]","popFront 1  left [2, 3]","popBack 3   left [2]","0-1 BFS: weight 0 unshift, weight 1 push","shift/unshift are O(n) on a JS array — ring buffer in production"]),heapify:w("siftDown from the last parent — build is O(n)",`const a = [3, 9, 2, 1, 4, 5];
function down(i) {
  for (;;) {
    let l = i * 2 + 1, r = l + 1, m = i;
    if (l < a.length && a[l] > a[m]) m = l;
    if (r < a.length && a[r] > a[m]) m = r;
    if (m === i) break;
    [a[i], a[m]] = [a[m], a[i]];
    i = m;
  }
}
console.log("last parent", (a.length >> 1) - 1);
for (let i = (a.length >> 1) - 1; i >= 0; i--) {
  down(i);
  console.log("sift", i, a.slice());
}`,["last parent 2   kids of 2 are indices 5 and 6","sift 2  [3, 9, 5, 1, 4, 2]  2 swapped with 5","sift 1  [3, 9, 5, 1, 4, 2]  9 already bigger than 1,4","sift 0  [9, 4, 5, 1, 3, 2]  3 sank; heap property holds"]),"heap-insert-extract":w("push + siftUp; swap root with last + siftDown",`const h = [];
function up(i) {
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (h[p] <= h[i]) break;
    [h[p], h[i]] = [h[i], h[p]];
    i = p;
  }
}
function down(i) {
  for (;;) {
    let l = i * 2 + 1, r = l + 1, m = i;
    if (l < h.length && h[l] < h[m]) m = l;
    if (r < h.length && h[r] < h[m]) m = r;
    if (m === i) break;
    [h[i], h[m]] = [h[m], h[i]];
    i = m;
  }
}
function push(x) { h.push(x); up(h.length - 1); console.log("push", x, h.slice()); }
function pop() {
  const top = h[0];
  h[0] = h.pop();
  if (h.length) down(0);
  console.log("pop", top, h.slice());
  return top;
}
push(5); push(2); push(4); pop();`,["push 5  [5]","push 2  [2, 5]     2 sifted over 5","push 4  [2, 5, 4]","pop 2   [4, 5]     last leaf became root, then sank"]),"top-k":w("min-heap of size k — root is the kth largest",`const nums = [3, 1, 5, 12, 2, 11], k = 3;
const h = [];
function up(i) {
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (h[p] <= h[i]) break;
    [h[p], h[i]] = [h[i], h[p]];
    i = p;
  }
}
function down(i) {
  for (;;) {
    let l = i * 2 + 1, r = l + 1, m = i;
    if (l < h.length && h[l] < h[m]) m = l;
    if (r < h.length && h[r] < h[m]) m = r;
    if (m === i) break;
    [h[i], h[m]] = [h[m], h[i]];
    i = m;
  }
}
for (const x of nums) {
  h.push(x); up(h.length - 1);
  if (h.length > k) { h[0] = h.pop(); down(0); }
  console.log("see", x, "heap", h.slice());
}
console.log("kth", h[0]);`,["see 3   heap [3]","see 5   heap [1, 3, 5]   size hit k","see 12  heap [3, 12, 5]  1 evicted — weakest winner leaves","see 11  heap [5, 11, 12]","kth 5   the 3 largest are 5,11,12"]),"median-stream":w("max-heap low + min-heap high, sizes off by ≤ 1",`const low = [];  // max-heap of the lower half
const high = []; // min-heap of the upper half
const push = (h, x, max) => {
  h.push(x);
  h.sort(max ? (a, b) => b - a : (a, b) => a - b);
};
const pop = (h) => h.shift();
function add(x) {
  if (!low.length || x <= low[0]) push(low, x, true);
  else push(high, x, false);
  if (low.length > high.length + 1) push(high, pop(low), false);
  if (high.length > low.length) push(low, pop(high), true);
  const med = low.length > high.length ? low[0] : (low[0] + high[0]) / 2;
  console.log("add", x, "low", low.slice(), "high", high.slice(), "med", med);
}
add(1); add(2); add(3); add(0);`,["add 1  low [1] high []         med 1","add 2  low [1] high [2]        med 1.5","add 3  low [2, 1] high [3]     med 2   2 moved down","add 0  low [1, 0] high [2, 3]  med 1.5"]),"dijkstra-heap":w("min-heap of [node, dist]; skip stale pops",`const g = { A: [["B", 2], ["C", 5]], B: [["C", 1]], C: [] };
const dist = { A: 0, B: Infinity, C: Infinity };
const heap = [["A", 0]];
while (heap.length) {
  heap.sort((x, y) => x[1] - y[1]);
  const [u, d] = heap.shift();
  if (d !== dist[u]) { console.log("stale", u, d); continue; }
  console.log("settle", u, d);
  for (const [v, w] of g[u]) {
    if (dist[u] + w < dist[v]) {
      dist[v] = dist[u] + w;
      heap.push([v, dist[v]]);
      console.log("relax", v, dist[v]);
    }
  }
}`,["settle A 0","relax B 2","relax C 5","settle B 2","relax C 3    A→B→C beats A→C","settle C 3   first pop of C is final (no negatives)"]),huffman:w("min-heap of freqs; merge the two smallest",`const heap = [
  { ch: "a", f: 3 }, { ch: "b", f: 4 },
  { ch: "c", f: 5 }, { ch: "d", f: 6 },
];
const byF = (x, y) => x.f - y.f;
while (heap.length > 1) {
  heap.sort(byF);
  const x = heap.shift(), y = heap.shift();
  const p = { ch: x.ch + y.ch, f: x.f + y.f, L: x, R: y };
  heap.push(p);
  console.log("merge", x.ch, "+", y.ch, "=", p.f);
}
console.log("root", heap[0].f);`,["merge a + b = 7    rarest two become siblings","merge c + d = 11","merge ab + cd = 18","root 18  cost = sum freq * depth; same algo as merge-files"]),"reverse-linked-list":w("prev / curr / nxt — flip next, slide the window",`const n = (val, next = null) => ({ val, next });
let curr = n(1, n(2, n(3, n(4))));
let prev = null;
while (curr) {
  const nxt = curr.next;
  curr.next = prev;
  prev = curr;
  curr = nxt;
  console.log("head so far", prev.val, "rest", curr && curr.val);
}
const walk = [];
for (let p = prev; p; p = p.next) walk.push(p.val);
console.log("list", walk);`,["head so far 1  rest 2","head so far 2  rest 3   2 now points at 1","head so far 3  rest 4","head so far 4  rest null","list [4, 3, 2, 1]"]),"floyd-cycle":w("fast gains one per step; reset to find the entrance",`const n = (val) => ({ val, next: null });
const a = n(1), b = n(2), c = n(3), d = n(4);
a.next = b; b.next = c; c.next = d; d.next = b; // cycle at 2
let slow = a, fast = a;
do {
  slow = slow.next;
  fast = fast.next.next;
  console.log("step", slow.val, fast.val);
} while (slow !== fast);
let p = a;
while (p !== slow) {
  p = p.next;
  slow = slow.next;
}
console.log("entrance", p.val);`,["step 2 3","step 3 2","step 4 4   they meet inside the cycle","entrance 2  one pointer back at head, same speed"]),"merge-two-lists":w("dummy tail; always attach the smaller head",`const n = (val, next = null) => ({ val, next });
const vals = (h) => { const a = []; while (h) { a.push(h.val); h = h.next; } return a; };
let a = n(1, n(3, n(5)));
let b = n(2, n(4));
const dummy = n(0);
let tail = dummy;
while (a && b) {
  if (a.val <= b.val) { tail.next = a; a = a.next; }
  else { tail.next = b; b = b.next; }
  tail = tail.next;
  console.log("took", tail.val);
}
tail.next = a || b;
console.log("merged", vals(dummy.next));`,["took 1","took 2","took 3","took 4   then leftover [5] spliced on","merged [1, 2, 3, 4, 5]"]),"merge-k-lists":w("min-heap of current heads, then push the successor",`const n = (val, next = null) => ({ val, next });
const vals = (h) => { const a = []; while (h) { a.push(h.val); h = h.next; } return a; };
const lists = [n(1, n(4)), n(2, n(3)), n(5)];
const heap = lists.filter(Boolean);
const dummy = n(0);
let tail = dummy;
while (heap.length) {
  heap.sort((x, y) => x.val - y.val);
  const node = heap.shift();
  tail.next = node;
  tail = node;
  if (node.next) heap.push(node.next);
  console.log("pop", node.val, "heads", heap.map((h) => h.val));
}
console.log("merged", vals(dummy.next));`,["pop 1  heads [2, 5, 4]","pop 2  heads [5, 4, 3]","pop 3  heads [5, 4]","pop 4  heads [5]","pop 5  heads []","merged [1, 2, 3, 4, 5]   N log k, not Nk"]),"middle-of-list":w("fast walks 2x; when it ends, slow is mid",`const n = (val, next = null) => ({ val, next });
const head = n(1, n(2, n(3, n(4, n(5)))));
let slow = head, fast = head;
while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
  console.log("slow", slow.val, "fast", fast && fast.val);
}
console.log("middle", slow.val);`,["slow 2  fast 3","slow 3  fast 5   fast.next is null — stop","middle 3   odd length → exact center","even n: this loop lands on the second middle"]),"nth-from-end":w("lead walks n ahead; trail lands on the victim",`const n = (val, next = null) => ({ val, next });
const vals = (h) => { const a = []; while (h) { a.push(h.val); h = h.next; } return a; };
const dummy = n(0, n(1, n(2, n(3, n(4, n(5))))));
const k = 2;
let lead = dummy, trail = dummy;
for (let i = 0; i <= k; i++) lead = lead.next;
console.log("gap set, lead", lead.val);
while (lead) {
  lead = lead.next;
  trail = trail.next;
}
console.log("delete", trail.next.val);
trail.next = trail.next.next;
console.log("list", vals(dummy.next));`,["gap set, lead 3   dummy + n+1 steps so trail.next is the victim","delete 4          trail.next is 2nd from the end","list [1, 2, 3, 5]","dummy saves the 'delete the real head' case"]),"list-intersection":w("each pointer walks A then B; they meet on the shared node",`const n = (val, next = null) => ({ val, next });
const shared = n(8, n(9));
const A = n(1, n(2, shared));
const B = n(3, shared);
let p = A, q = B;
while (p !== q) {
  console.log(p ? p.val : "→B", q ? q.val : "→A");
  p = p ? p.next : B;
  q = q ? q.next : A;
}
console.log("intersect", p.val);`,["1  3","2  8","8  9","9  →A    q finished B, switches to A","3  2     p switched onto B — the two stems cancel","intersect 8   same reference, not the value"])},x={"tree-traversals":w("inorder: left, visit, right",`const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(2, n(1), n(3));
const out = [];

const walk = (node) => {
  if (!node) return;
  walk(node.left);
  out.push(node.val);
  console.log("visit", node.val);
  walk(node.right);
};

walk(root);
console.log("inorder", out);`,["visit 1   leftmost leaf first","visit 2","visit 3","inorder [1, 2, 3]  — BST keys come out sorted"]),"tree-height-diameter":w("one postorder, height and diameter",`const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(1, n(2, n(4), n(5)), n(3));
let diameter = 0;

const height = (node) => {
  if (!node) return -1;
  const L = height(node.left);
  const R = height(node.right);
  diameter = Math.max(diameter, L + R + 2);
  console.log(node.val, { L, R, diameter });
  return 1 + Math.max(L, R);
};

height(root);`,["4 { L: -1, R: -1, diameter: 0 }  leaf, edge-height 0","5 { L: -1, R: -1, diameter: 0 }","2 { L: 0, R: 0, diameter: 2 }   path 4-2-5","3 { L: -1, R: -1, diameter: 2 }","1 { L: 1, R: 0, diameter: 3 }   path 4-2-1-3, not through-root only"]),lca:w("BST walk until the keys split",`const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(6, n(2, n(0), n(4)), n(8));
const p = 0, q = 4;
let node = root;

while (node) {
  console.log("at", node.val);
  if (p < node.val && q < node.val) node = node.left;
  else if (p > node.val && q > node.val) node = node.right;
  else break;
}
console.log("lca", node.val);`,["at 6   both 0 and 4 < 6 → left","at 2   0 < 2 < 4 → split","lca 2  (2 is also an ancestor of both)"]),"validate-bst":w("thread (lo, hi), not just kids",`const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(10, n(5), n(15, n(6), n(20)));

const ok = (node, lo = -Infinity, hi = Infinity) => {
  if (!node) return true;
  console.log(node.val, "in", [lo, hi]);
  if (node.val <= lo || node.val >= hi) return false;
  return ok(node.left, lo, node.val) && ok(node.right, node.val, hi);
};

console.log("valid?", ok(root));`,["10 in [-Infinity, Infinity]","5 in [-Infinity, 10]","15 in [10, Infinity]","6 in [10, 15]   6 ≤ 10 → fail (6 sits under 15, left of 10)","valid? false"]),"kth-smallest-bst":w("inorder with a stack, stop at k",`const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(5, n(3, n(2), n(4)), n(7));
const k = 3;
const stack = [];
let node = root, seen = 0;

while (node || stack.length) {
  while (node) { stack.push(node); node = node.left; }
  node = stack.pop();
  seen++;
  console.log("visit", node.val, "count", seen);
  if (seen === k) break;
  node = node.right;
}`,["visit 2  count 1","visit 3  count 2","visit 4  count 3  → kth = 4  (inorder is sorted)"]),"serialize-tree":w("preorder + # for nulls",`const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(1, n(2), n(3, n(4), n(5)));
const out = [];

const dump = (node) => {
  if (!node) { out.push("#"); return; }
  out.push(node.val);
  console.log("write", node.val);
  dump(node.left);
  dump(node.right);
};

dump(root);
console.log("wire", out.join(","));`,["write 1","write 2   then #, # for its kids","write 3","write 4","write 5","wire 1,2,#,#,3,4,#,#,5,#,#"]),"path-sum":w("subtract as you walk, check a leaf",`const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(5, n(4, n(11, n(7), n(2))), n(8));
const target = 22;

const dfs = (node, remain) => {
  if (!node) return false;
  remain -= node.val;
  console.log("at", node.val, "remain", remain);
  if (!node.left && !node.right) return remain === 0;
  return dfs(node.left, remain) || dfs(node.right, remain);
};

console.log("hit?", dfs(root, target));`,["at 5 remain 17","at 4 remain 13","at 11 remain 2","at 7 remain -5   leaf miss","at 2 remain 0    leaf hit  5+4+11+2","hit? true"]),"max-path-sum":w("gain up, best through the node",`const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(-10, n(9), n(20, n(15), n(7)));
let best = -Infinity;

const gain = (node) => {
  if (!node) return 0;
  const L = Math.max(0, gain(node.left));
  const R = Math.max(0, gain(node.right));
  best = Math.max(best, node.val + L + R);
  console.log(node.val, { L, R, best });
  return node.val + Math.max(L, R);
};

gain(root);`,["9 { L: 0, R: 0, best: 9 }","15 { L: 0, R: 0, best: 15 }","7 { L: 0, R: 0, best: 15 }","20 { L: 15, R: 7, best: 42 }   15-20-7","-10 { L: 9, R: 35, best: 42 }  drop the negative root from the answer"]),"invert-tree":w("swap kids, recurse",`const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(4, n(2, n(1), n(3)), n(7));

const invert = (node) => {
  if (!node) return null;
  [node.left, node.right] = [node.right, node.left];
  console.log("swap around", node.val);
  invert(node.left);
  invert(node.right);
  return node;
};

invert(root);
console.log("root kids", root.left.val, root.right.val);`,["swap around 4   2 ↔ 7","swap around 7   (now the left child)","swap around 2   (now the right child; 1 ↔ 3)","root kids 7 2"]),"flatten-binary-tree":w("reverse preorder, stitch a right spine",`const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(1, n(2, n(3), n(4)), n(5));
let prev = null;

const flatten = (node) => {
  if (!node) return;
  flatten(node.right);
  flatten(node.left);
  node.right = prev;
  node.left = null;
  console.log("stitch", node.val, "→", prev?.val ?? null);
  prev = node;
};

flatten(root);`,["stitch 5 → null","stitch 4 → 5","stitch 3 → 4","stitch 2 → 3","stitch 1 → 2   left pointers cleared; list is 1-2-3-4-5"]),"morris-traversal":w("thread the predecessor, then unthread",`const n = (val, left = null, right = null) => ({ val, left, right });
const root = n(2, n(1), n(3));
const out = [];
let cur = root;

while (cur) {
  if (!cur.left) {
    out.push(cur.val);
    console.log("visit", cur.val);
    cur = cur.right;
    continue;
  }
  let pred = cur.left;
  while (pred.right && pred.right !== cur) pred = pred.right;
  if (!pred.right) {
    pred.right = cur;
    console.log("thread", pred.val, "→", cur.val);
    cur = cur.left;
  } else {
    pred.right = null;
    out.push(cur.val);
    console.log("unthread, visit", cur.val);
    cur = cur.right;
  }
}`,["thread 1 → 2   borrow 1.right as a return ticket","visit 1","unthread, visit 2   restore 1.right = null","visit 3   inorder [1, 2, 3], O(1) extra space"]),trie:w("nested objects, $ marks a word",`const root = {};

const insert = (word) => {
  let node = root;
  for (const ch of word) {
    node[ch] ??= {};
    node = node[ch];
  }
  node.$ = true;
  console.log("insert", word);
};

const has = (word) => {
  let node = root;
  for (const ch of word) {
    node = node[ch];
    if (!node) return false;
  }
  return !!node.$;
};

insert("app");
insert("apple");
console.log("app?", has("app"));
console.log("ap?", has("ap"));
console.log("apple?", has("apple"));`,["insert app","insert apple   shares the a-p-p spine","app? true","ap? false   prefix only, no $","apple? true"]),"cycle-undirected":w("DFS, skip parent, seen neighbor = cycle",`const g = { A: ["B", "C"], B: ["A", "C"], C: ["A", "B"] };
const seen = new Set();
let cycle = false;

const dfs = (u, parent) => {
  seen.add(u);
  for (const v of g[u]) {
    if (v === parent) continue;
    if (seen.has(v)) {
      cycle = true;
      console.log("back edge", u, "→", v);
      return;
    }
    console.log("walk", u, "→", v);
    dfs(v, u);
  }
};

dfs("A", null);
console.log("cycle?", cycle);`,["walk A → B","walk B → C","back edge C → A   C already saw A as a non-parent","cycle? true"]),"cycle-directed":w("gray = on the stack, back edge",`const g = { A: ["B"], B: ["C"], C: ["A"] };
const color = {};
let cycle = false;

const dfs = (u) => {
  color[u] = 1;
  console.log("enter", u, { ...color });
  for (const v of g[u]) {
    if (color[v] === 1) { cycle = true; console.log("back to gray", v); }
    else if (!color[v]) dfs(v);
  }
  color[u] = 2;
};

dfs("A");
console.log("cycle?", cycle);`,["enter A { A: 1 }","enter B { A: 1, B: 1 }","enter C { A: 1, B: 1, C: 1 }","back to gray A   C → A while A is still on the stack","cycle? true"]),"topo-sort-kahn":w("queue the indegree-0 nodes",`const g = { A: ["C"], B: ["C"], C: ["D"], D: [] };
const indeg = { A: 0, B: 0, C: 0, D: 0 };
for (const u of Object.keys(g)) for (const v of g[u]) indeg[v]++;

const q = Object.keys(indeg).filter((u) => indeg[u] === 0);
const order = [];

while (q.length) {
  const u = q.shift();
  order.push(u);
  console.log("take", u, "left", { ...indeg });
  for (const v of g[u]) if (--indeg[v] === 0) q.push(v);
}
console.log("order", order);`,["take A  left { A:0, B:0, C:2, D:1 }  C drops to 1","take B  C drops to 0, enqueue C","take C  D drops to 0, enqueue D","take D","order [A, B, C, D]"]),"topo-sort-dfs":w("push on finish, then reverse",`const g = { A: ["C"], B: ["C"], C: ["D"], D: [] };
const seen = new Set();
const order = [];

const dfs = (u) => {
  seen.add(u);
  for (const v of g[u]) if (!seen.has(v)) dfs(v);
  order.push(u);
  console.log("done", u);
};

for (const u of Object.keys(g)) if (!seen.has(u)) dfs(u);
console.log("order", [...order].reverse());`,["done D   sinks finish first","done C","done A","done B","order [B, A, C, D]  reverse of finish times"]),"bfs-shortest-path":w("unweighted hops from A",`const g = { A: ["B", "C"], B: ["D"], C: ["D"], D: [] };
const dist = { A: 0 };
const q = ["A"];

while (q.length) {
  const u = q.shift();
  console.log("pop", u, "d", dist[u]);
  for (const v of g[u]) {
    if (dist[v] === undefined) {
      dist[v] = dist[u] + 1;
      q.push(v);
    }
  }
}
console.log("dist", dist);`,["pop A d 0   enqueue B, C","pop B d 1   enqueue D","pop C d 1   D already settled","pop D d 2","dist { A: 0, B: 1, C: 1, D: 2 }"]),dijkstra:w("settle the nearest unsettled node",`const g = {
  A: [["B", 4], ["C", 1]],
  B: [["D", 1]],
  C: [["B", 2], ["D", 5]],
  D: [],
};
const dist = { A: 0, B: Infinity, C: Infinity, D: Infinity };
const seen = new Set();

while (seen.size < 4) {
  const u = Object.keys(dist).filter((k) => !seen.has(k))
    .sort((a, b) => dist[a] - dist[b])[0];
  seen.add(u);
  console.log("settle", u, dist[u]);
  for (const [v, w] of g[u]) {
    if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
  }
}`,["settle A 0   C = 1, B = 4","settle C 1   B = 3 via C, D = 6","settle B 3   D = 4 via B","settle D 4"]),"bellman-ford":w("relax every edge |V|-1 times",`const nodes = ["A", "B", "C"];
const edges = [["A", "B", 4], ["A", "C", 1], ["C", "B", -2]];
const dist = { A: 0, B: Infinity, C: Infinity };

for (let i = 0; i < nodes.length - 1; i++) {
  for (const [u, v, w] of edges) {
    if (dist[u] + w < dist[v]) {
      dist[v] = dist[u] + w;
      console.log("relax", u, "→", v, "=", dist[v]);
    }
  }
}
console.log("dist", dist);`,["relax A → B = 4","relax A → C = 1","relax C → B = -1   negative edge wins on the next hop","dist { A: 0, B: -1, C: 1 }"]),kruskal:w("sort edges, union if they do not meet",`const edges = [["A", "B", 1], ["B", "C", 2], ["A", "C", 4], ["C", "D", 1]];
edges.sort((a, b) => a[2] - b[2]);
const parent = { A: "A", B: "B", C: "C", D: "D" };
const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));

for (const [u, v, w] of edges) {
  const a = find(u), b = find(v);
  if (a === b) { console.log("skip", u, v); continue; }
  parent[a] = b;
  console.log("take", u, v, w);
}`,["take A B 1","take C D 1","take B C 2   now one tree A-B-C-D","skip A C   already connected (cycle)"]),prim:w("grow the cut from A",`const g = {
  A: [["B", 1], ["C", 4]],
  B: [["A", 1], ["C", 2], ["D", 5]],
  C: [["A", 4], ["B", 2], ["D", 1]],
  D: [["B", 5], ["C", 1]],
};
const inMST = new Set(["A"]);

while (inMST.size < 4) {
  let best = null;
  for (const u of inMST) {
    for (const [v, w] of g[u]) {
      if (inMST.has(v)) continue;
      if (!best || w < best[2]) best = [u, v, w];
    }
  }
  const [u, v, w] = best;
  inMST.add(v);
  console.log("grow", u, "→", v, w);
}`,["grow A → B 1   cheapest edge out of {A}","grow B → C 2   beats A → C 4","grow C → D 1"]),"union-find":w("parent object, path compression",`const parent = { A: "A", B: "B", C: "C", D: "D" };
const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));

const unite = (a, b) => {
  a = find(a); b = find(b);
  if (a === b) return;
  parent[a] = b;
  console.log("union", a, "→", b, { ...parent });
};

unite("A", "B");
unite("C", "D");
unite("B", "C");
console.log("same A D?", find("A") === find("D"));`,["union A → B  { A: B, B: B, C: C, D: D }","union C → D  { A: B, B: B, C: D, D: D }","union B → D  { A: B, B: D, C: D, D: D }","same A D? true   find(A) compresses A → D"]),bipartite:w("BFS 2-color, clash = odd cycle",`const g = { A: ["B", "C"], B: ["A", "D"], C: ["A"], D: ["B"] };
const color = { A: 0 };
const q = ["A"];
let ok = true;

while (q.length && ok) {
  const u = q.shift();
  for (const v of g[u]) {
    if (color[v] === undefined) {
      color[v] = color[u] ^ 1;
      q.push(v);
      console.log(u, "→", v, "color", color[v]);
    } else if (color[v] === color[u]) {
      ok = false;
      console.log("clash at", v);
    }
  }
}
console.log("bipartite?", ok);`,["A → B color 1","A → C color 1","B → D color 0","bipartite? true   parts {A, D} and {B, C}"]),"connected-components":w("DFS from each unseen node",`const g = { A: ["B"], B: ["A"], C: ["D"], D: ["C"], E: [] };
const seen = new Set();
let comps = 0;

const dfs = (u) => {
  seen.add(u);
  for (const v of g[u]) if (!seen.has(v)) dfs(v);
};

for (const u of Object.keys(g)) {
  if (seen.has(u)) continue;
  comps++;
  dfs(u);
  console.log("component", comps, "from", u);
}
console.log("count", comps);`,["component 1 from A   A-B","component 2 from C   C-D","component 3 from E   singleton","count 3"]),islands:w("flood-fill 1s to 0",`const grid = [
  [1, 1, 0],
  [1, 0, 0],
  [0, 0, 1],
];

const flood = (r, c) => {
  if (r < 0 || c < 0 || r > 2 || c > 2 || !grid[r][c]) return;
  grid[r][c] = 0;
  for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) flood(r + dr, c + dc);
};

let count = 0;
for (let r = 0; r < 3; r++) {
  for (let c = 0; c < 3; c++) {
    if (!grid[r][c]) continue;
    count++;
    flood(r, c);
    console.log("island", count, "seed", [r, c]);
  }
}
console.log("count", count);`,["island 1 seed [0, 0]   eats the 2×2-ish block of 1s","island 2 seed [2, 2]","count 2"]),"floyd-warshall":w("try every midpoint k",`const nodes = ["A", "B", "C"];
const d = {
  A: { A: 0, B: 3, C: 8 },
  B: { A: Infinity, B: 0, C: 2 },
  C: { A: 5, B: Infinity, C: 0 },
};

for (const k of nodes) {
  for (const i of nodes) {
    for (const j of nodes) {
      if (d[i][k] + d[k][j] < d[i][j]) {
        d[i][j] = d[i][k] + d[k][j];
        console.log("via", k, ":", i, "→", j, "=", d[i][j]);
      }
    }
  }
}
console.log("A→C", d.A.C, "B→A", d.B.A);`,["via A : C → B = 8   C-A-B","via B : A → C = 5   A-B-C beats the direct 8","via C : B → A = 7   B-C-A","A→C 5  B→A 7"]),"zero-one-bfs":w("deque: 0-weight to the front",`const g = {
  A: [["B", 1], ["C", 0]],
  B: [["D", 0]],
  C: [["D", 1]],
  D: [],
};
const dist = { A: 0 };
const q = ["A"];

while (q.length) {
  const u = q.shift();
  for (const [v, w] of g[u]) {
    const nd = dist[u] + w;
    if (dist[v] === undefined || nd < dist[v]) {
      dist[v] = nd;
      w === 0 ? q.unshift(v) : q.push(v);
      console.log(u, "→", v, "w", w, "d", nd, "deque", [...q]);
    }
  }
}
console.log("dist", dist);`,["A → B w 1 d 1 deque [B]     push back","A → C w 0 d 0 deque [C, B]  unshift","C → D w 1 d 1 deque [B, D]","dist { A: 0, B: 1, C: 0, D: 1 }"]),"bridges-articulation":w("bridge when low[child] > tin[u]",`const g = { A: ["B"], B: ["A", "C", "D"], C: ["B"], D: ["B"] };
let timer = 0;
const tin = {}, low = {}, bridges = [];

const dfs = (u, parent = null) => {
  tin[u] = low[u] = ++timer;
  for (const v of g[u]) {
    if (v === parent) continue;
    if (tin[v]) { low[u] = Math.min(low[u], tin[v]); continue; }
    dfs(v, u);
    low[u] = Math.min(low[u], low[v]);
    if (low[v] > tin[u]) bridges.push([u, v]);
    console.log(u, "kid", v, { lowV: low[v], tinU: tin[u] });
  }
};

dfs("A");
console.log("bridges", bridges);`,["B kid C { lowV: 3, tinU: 2 }  3 > 2 → bridge B-C","B kid D { lowV: 4, tinU: 2 }  bridge B-D","A kid B { lowV: 2, tinU: 1 }  bridge A-B","bridges [['B','C'], ['B','D'], ['A','B']]  B is the articulation"]),"scc-kosaraju":w("finish order, then DFS on the reverse",`const g = { A: ["B"], B: ["C"], C: ["A", "D"], D: ["E"], E: ["D"] };
const rev = { A: ["C"], B: ["A"], C: ["B"], D: ["C", "E"], E: ["D"] };
const seen = new Set();
const order = [];

const dfs1 = (u) => {
  seen.add(u);
  for (const v of g[u]) if (!seen.has(v)) dfs1(v);
  order.push(u);
};
for (const u of Object.keys(g)) if (!seen.has(u)) dfs1(u);
console.log("finish", order);

seen.clear();
const sccs = [];
const dfs2 = (u, bag) => {
  seen.add(u);
  bag.push(u);
  for (const v of rev[u]) if (!seen.has(v)) dfs2(v, bag);
};
for (const u of [...order].reverse()) {
  if (seen.has(u)) continue;
  const bag = [];
  dfs2(u, bag);
  sccs.push(bag);
  console.log("scc", bag);
}`,["finish [E, D, C, B, A]  sinks of the first DFS","scc [A, C, B]  second pass on the reverse, from A","scc [D, E]     the D↔E cycle"]),"scc-tarjan":w("pop a component when low equals tin",`const g = { A: ["B"], B: ["C"], C: ["D", "A"], D: ["E"], E: ["D"] };
let timer = 0;
const tin = {}, low = {}, on = new Set(), stack = [];

const dfs = (u) => {
  tin[u] = low[u] = ++timer;
  stack.push(u);
  on.add(u);
  for (const v of g[u]) {
    if (!tin[v]) {
      dfs(v);
      low[u] = Math.min(low[u], low[v]);
    } else if (on.has(v)) {
      low[u] = Math.min(low[u], tin[v]);
      console.log("back", u, "→", v, "low", low[u]);
    }
  }
  if (low[u] === tin[u]) {
    const bag = [];
    let x;
    do { x = stack.pop(); on.delete(x); bag.push(x); } while (x !== u);
    console.log("pop scc", bag);
  }
};

for (const u of Object.keys(g)) if (!tin[u]) dfs(u);`,["back E → D  low 4   D is still on the stack","pop scc [E, D]","back C → A  low 1   A is still on the stack","pop scc [C, B, A]"]),"euler-path":w("Hierholzer: eat unused outs, reverse finish",`const g = { A: ["B"], B: ["C"], C: ["A", "D"], D: [] };
const circuit = [];

const dfs = (u) => {
  const outs = g[u] ?? [];
  while (outs.length) {
    const v = outs.pop();
    console.log("take", u, "→", v);
    dfs(v);
  }
  circuit.push(u);
};

dfs("A");
console.log("path", circuit.reverse());`,["take A → B","take B → C","take C → D   pop D first from [A, D]","take C → A","path [A, B, C, A, D]"]),"a-star":w("expand lowest g+h",`const g = { S: ["A", "B"], A: ["GOAL"], B: ["GOAL"], GOAL: [] };
const h = { S: 2, A: 1, B: 4, GOAL: 0 };
const w = { "S|A": 1, "S|B": 1, "A|GOAL": 1, "B|GOAL": 5 };
const gScore = { S: 0 };
const open = ["S"];
const done = new Set();

while (open.length) {
  open.sort((a, b) => gScore[a] + h[a] - (gScore[b] + h[b]));
  const u = open.shift();
  if (done.has(u)) continue;
  done.add(u);
  console.log("expand", u, "g", gScore[u], "f", gScore[u] + h[u]);
  if (u === "GOAL") break;
  for (const v of g[u]) {
    const ng = gScore[u] + w[\`\${u}|\${v}\`];
    if (gScore[v] === undefined || ng < gScore[v]) {
      gScore[v] = ng;
      open.push(v);
    }
  }
}`,["expand S g 0 f 2   enqueue A (f=2) and B (f=5)","expand A g 1 f 2   better heuristic, GOAL g=2","expand GOAL g 2 f 2","B stays in open — never expanded"])},A={"recursion-memo":w("cache fib so overlapping calls skip work",`const memo = new Map([[0, 0], [1, 1]]);

function fib(n) {
  if (memo.has(n)) return memo.get(n);
  console.log("miss", n);
  const v = fib(n - 1) + fib(n - 2);
  memo.set(n, v);
  return v;
}

console.log("fib(6)", fib(6));
console.log("cached keys", [...memo.keys()]);`,["miss 6","miss 5","miss 4","miss 3","miss 2","fib(6) 8   cached keys [0, 1, 2, 3, 4, 5, 6]"]),subsets:w("include or skip each number",`const nums = [1, 2, 3];
const path = [];

function dfs(i) {
  if (i === nums.length) {
    console.log([...path]);
    return;
  }
  dfs(i + 1);
  path.push(nums[i]);
  dfs(i + 1);
  path.pop();
}

dfs(0);`,["[]","[3]","[2]","[2, 3]","[1]  then [1,3] [1,2] [1,2,3]  — 8 = 2^3"]),permutations:w("swap, recurse, swap back",`const a = ["A", "B", "C"];

function perm(i) {
  if (i === a.length) {
    console.log(a.join(""));
    return;
  }
  for (let j = i; j < a.length; j++) {
    [a[i], a[j]] = [a[j], a[i]];
    perm(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
}

perm(0);`,["ABC","ACB","BAC","BCA","CBA  CAB  — 6 = 3!"]),combinations:w("choose 2, only walk forward",`const n = 4, k = 2;
const path = [];

function dfs(start) {
  if (path.length === k) {
    console.log([...path]);
    return;
  }
  for (let x = start; x <= n; x++) {
    path.push(x);
    dfs(x + 1);
    path.pop();
  }
}

dfs(1);`,["[1, 2]","[1, 3]","[1, 4]","[2, 3]","[2, 4]  [3, 4]  — C(4,2) = 6"]),"n-queens":w("place 4 queens, one per row",`const n = 4;
const col = [], diag = [], anti = [];

function dfs(r) {
  if (r === n) {
    console.log("board", col.slice());
    return;
  }
  for (let c = 0; c < n; c++) {
    if (col.includes(c) || diag.includes(r - c) || anti.includes(r + c)) continue;
    col.push(c); diag.push(r - c); anti.push(r + c);
    console.log("try row", r, "col", c);
    dfs(r + 1);
    col.pop(); diag.pop(); anti.pop();
  }
}

dfs(0);`,["try row 0 col 0  … later clashes, backtrack","try row 0 col 1","try row 1 col 3","try row 2 col 0","try row 3 col 2","board [1, 3, 0, 2]   one of two solutions for n=4"]),"sudoku-solver":w("try a digit, undo on clash",`const box = [
  [5, 3, 0],
  [6, 0, 0],
  [0, 9, 8],
];

function ok(r, c, d) {
  for (let i = 0; i < 3; i++) {
    if (box[r][i] === d || box[i][c] === d) return false;
  }
  return true;
}

function solve() {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (box[r][c] !== 0) continue;
      for (const d of [1, 2, 4, 7]) {
        if (!ok(r, c, d)) {
          console.log("skip", d, "at", r, c);
          continue;
        }
        box[r][c] = d;
        console.log("place", d, "at", r, c);
        if (solve()) return true;
        box[r][c] = 0;
      }
      return false;
    }
  }
  return true;
}

solve();
console.log("done", box.flat());`,["skip 1 at 0 2   row already has 5,3 — try next","place 4 at 0 2","place 2 at 1 1","place 7 at 1 2","place 1 at 2 0","done [5, 3, 4, 6, 2, 7, 1, 9, 8]"]),"word-search":w("walk neighbors, mark the cell used",`const g = [
  ["A", "B"],
  ["C", "D"],
];
const word = "ABD";
const seen = new Set();

function dfs(r, c, i) {
  if (i === word.length) return true;
  const key = r + "," + c;
  if (r < 0 || r > 1 || c < 0 || c > 1 || seen.has(key) || g[r][c] !== word[i]) {
    return false;
  }
  seen.add(key);
  console.log("use", g[r][c], "at", r, c);
  const ok =
    dfs(r + 1, c, i + 1) ||
    dfs(r - 1, c, i + 1) ||
    dfs(r, c + 1, i + 1) ||
    dfs(r, c - 1, i + 1);
  if (!ok) {
    seen.delete(key);
    console.log("back", g[r][c]);
  }
  return ok;
}

console.log("found", dfs(0, 0, 0));`,["use A at 0 0","use B at 0 1","use D at 1 1","found true   A→B→D, C unused"]),"generate-parentheses":w("open if leftover, close if it stays valid",`function gen(open, close, s) {
  if (open === 0 && close === 0) {
    console.log(s);
    return;
  }
  if (open > 0) gen(open - 1, close, s + "(");
  if (close > open) gen(open, close - 1, s + ")");
}

gen(3, 3, "");`,["((()))","(()())","(())()","()(())","()()()   Catalan C_3 = 5"]),"divide-and-conquer":w("split the array, merge the halves",`function mergeSort(a) {
  if (a.length <= 1) return a;
  const mid = Math.floor(a.length / 2);
  console.log("split", a, "→", a.slice(0, mid), a.slice(mid));
  const L = mergeSort(a.slice(0, mid));
  const R = mergeSort(a.slice(mid));
  const out = [];
  let i = 0, j = 0;
  while (i < L.length && j < R.length) {
    out.push(L[i] <= R[j] ? L[i++] : R[j++]);
  }
  const merged = out.concat(L.slice(i), R.slice(j));
  console.log("merge", L, R, "→", merged);
  return merged;
}

mergeSort([4, 1, 3, 2]);`,["split [4, 1, 3, 2] → [4, 1] [3, 2]","split [4, 1] → [4] [1]","merge [4] [1] → [1, 4]","split [3, 2] → [3] [2]","merge [3] [2] → [2, 3]","merge [1, 4] [2, 3] → [1, 2, 3, 4]"]),"closest-pair":w("sort by x, check the midline strip",`const pts = [
  [0, 0], [1, 5], [2, 1], [3, 4], [4, 2],
];
const byX = [...pts].sort((a, b) => a[0] - b[0]);
const mid = byX[Math.floor(byX.length / 2)][0];

function dist(p, q) {
  return Math.hypot(p[0] - q[0], p[1] - q[1]);
}

let best = Infinity, pair = null;
for (let i = 0; i < byX.length; i++) {
  for (let j = i + 1; j < byX.length && byX[j][0] - byX[i][0] < best; j++) {
    const d = dist(byX[i], byX[j]);
    if (d < best) {
      best = d;
      pair = [byX[i], byX[j]];
      console.log("better", pair, d.toFixed(2));
    }
  }
}
console.log("mid x", mid, "best", pair, best.toFixed(2));`,["better [[0, 0], [1, 5]] 5.10","better [[0, 0], [2, 1]] 2.24","better [[2, 1], [4, 2]] 2.24  (tie, later pair)","mid x 2  best [[2, 1], [4, 2]] 2.24"]),"fibonacci-dp":w("two rolling variables, no table",`let a = 0, b = 1;
console.log("F0", a, "F1", b);

for (let i = 2; i <= 6; i++) {
  const c = a + b;
  console.log("F" + i, c);
  a = b;
  b = c;
}`,["F0 0  F1 1","F2 1","F3 2","F4 3","F5 5","F6 8"]),"climbing-stairs":w("last step is 1 or 2",`const n = 5;
let prev = 1, cur = 1;

for (let i = 2; i <= n; i++) {
  const next = prev + cur;
  console.log("step", i, "ways", next, "=", cur, "+", prev);
  prev = cur;
  cur = next;
}
console.log("top", cur);`,["step 2 ways 2 = 1 + 1","step 3 ways 3 = 2 + 1","step 4 ways 5 = 3 + 2","step 5 ways 8 = 5 + 3","top 8   Fibonacci in disguise"]),"house-robber":w("take this house or skip it",`const cash = [2, 7, 9, 3, 1];
let skip = 0, take = 0;

for (const x of cash) {
  const nextTake = skip + x;
  const nextSkip = Math.max(skip, take);
  console.log("house", x, "take", nextTake, "skip", nextSkip);
  take = nextTake;
  skip = nextSkip;
}
console.log("best", Math.max(take, skip));`,["house 2  take 2  skip 0","house 7  take 7  skip 2","house 9  take 11 skip 7","house 3  take 10 skip 11","house 1  take 12 skip 11","best 12   2+9+1"]),"decode-ways":w("one digit or a valid pair",`const s = "226";
const dp = Array(s.length + 1).fill(0);
dp[0] = 1;

for (let i = 1; i <= s.length; i++) {
  if (s[i - 1] !== "0") dp[i] += dp[i - 1];
  if (i >= 2) {
    const two = Number(s.slice(i - 2, i));
    if (two >= 10 && two <= 26) dp[i] += dp[i - 2];
  }
  console.log("prefix", s.slice(0, i), "ways", dp[i]);
}`,["prefix 2   ways 1     B","prefix 22  ways 2     BB or V","prefix 226 ways 3     BB F, V F, B Z"]),"knapsack-01":w("each item once: take or leave",`const w = [2, 3, 3], v = [3, 4, 5], cap = 6;
const dp = Array(cap + 1).fill(0);

for (let i = 0; i < w.length; i++) {
  for (let c = cap; c >= w[i]; c--) {
    dp[c] = Math.max(dp[c], dp[c - w[i]] + v[i]);
  }
  console.log("after item", i, "w" + w[i], "dp", [...dp]);
}
console.log("best", dp[cap]);`,["after item 0 w2  dp [0, 0, 3, 3, 3, 3, 3]","after item 1 w3  dp [0, 0, 3, 4, 4, 7, 7]","after item 2 w3  dp [0, 0, 3, 5, 5, 8, 9]","best 9   items 0+2 (2+3 weight, 3+5 value)"]),"unbounded-knapsack":w("reuse any item, walk capacity forward",`const w = [2, 3], v = [4, 5], cap = 7;
const dp = Array(cap + 1).fill(0);

for (let i = 0; i < w.length; i++) {
  for (let c = w[i]; c <= cap; c++) {
    dp[c] = Math.max(dp[c], dp[c - w[i]] + v[i]);
  }
  console.log("after w" + w[i], [...dp]);
}
console.log("best", dp[cap]);`,["after w2  [0, 0, 4, 4, 8, 8, 12, 12]","after w3  [0, 0, 4, 5, 8, 9, 12, 13]","best 13   three 2-weights leftover 1 unused, or 2+3+2"]),"coin-change":w("fewest coins for the amount",`const coins = [1, 2, 5], amount = 6;
const INF = 99;
const dp = Array(amount + 1).fill(INF);
dp[0] = 0;

for (const coin of coins) {
  for (let a = coin; a <= amount; a++) {
    dp[a] = Math.min(dp[a], dp[a - coin] + 1);
  }
  console.log("after", coin, dp.slice(0, 7));
}
console.log("coins for 6", dp[6]);`,["after 1  [0, 1, 2, 3, 4, 5, 6]","after 2  [0, 1, 1, 2, 2, 3, 3]","after 5  [0, 1, 1, 2, 2, 1, 2]","coins for 6  2    5+1"]),lis:w("tails: smallest end of each length",`const nums = [10, 9, 2, 5, 3, 7];
const tails = [];

for (const x of nums) {
  let lo = 0, hi = tails.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (tails[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  tails[lo] = x;
  console.log("place", x, "→", [...tails]);
}
console.log("LIS length", tails.length);`,["place 10 → [10]","place 9  → [9]","place 2  → [2]","place 5  → [2, 5]","place 3  → [2, 3]","place 7  → [2, 3, 7]   LIS length 3"]),lcs:w("match a letter or drop one side",`const A = "ace", B = "abcde";
const m = A.length, n = B.length;
const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

for (let i = 1; i <= m; i++) {
  for (let j = 1; j <= n; j++) {
    dp[i][j] =
      A[i - 1] === B[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
  }
  console.log("after", A[i - 1], dp[i]);
}
console.log("LCS", dp[m][n]);`,["after a  [0, 1, 1, 1, 1, 1]","after c  [0, 1, 1, 2, 2, 2]","after e  [0, 1, 1, 2, 2, 3]","LCS 3   ace"]),"edit-distance":w("insert, delete, or replace",`const A = "cat", B = "cut";
const m = A.length, n = B.length;
const dp = Array.from({ length: m + 1 }, (_, i) =>
  Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
);

for (let i = 1; i <= m; i++) {
  for (let j = 1; j <= n; j++) {
    if (A[i - 1] === B[j - 1]) dp[i][j] = dp[i - 1][j - 1];
    else {
      dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  console.log("row", A.slice(0, i), dp[i]);
}
console.log("edits", dp[m][n]);`,["row c  [1, 0, 1, 2]","row ca [2, 1, 1, 2]","row cat [3, 2, 2, 1]","edits 1   replace a→u"]),"palindrome-dp":w("every substring: ends match and inside is pal",`const s = "abba";
const n = s.length;
const pal = Array.from({ length: n }, () => Array(n).fill(false));

for (let i = 0; i < n; i++) pal[i][i] = true;
for (let len = 2; len <= n; len++) {
  for (let i = 0; i + len - 1 < n; i++) {
    const j = i + len - 1;
    pal[i][j] = s[i] === s[j] && (len === 2 || pal[i + 1][j - 1]);
    console.log(s.slice(i, j + 1), pal[i][j]);
  }
}`,["ab false","bb true","ba false","abb false","bba false","abba true   ends match and bb inside"]),"matrix-chain":w("try every last split of the chain",`const p = [10, 20, 30, 40];
const n = p.length - 1;
const dp = Array.from({ length: n }, () => Array(n).fill(0));

for (let len = 2; len <= n; len++) {
  for (let i = 0; i + len - 1 < n; i++) {
    const j = i + len - 1;
    dp[i][j] = Infinity;
    for (let k = i; k < j; k++) {
      const cost = dp[i][k] + dp[k + 1][j] + p[i] * p[k + 1] * p[j + 1];
      dp[i][j] = Math.min(dp[i][j], cost);
    }
    console.log("A" + i + "..A" + j, dp[i][j]);
  }
}`,["A0..A1 6000     10×20×30","A1..A2 24000    20×30×40","A0..A2 18000    (A0 A1)A2 cheaper than A0(A1 A2)"]),"burst-balloons":w("pick the last balloon in a range",`const nums = [3, 1, 5];
const a = [1, ...nums, 1];
const n = nums.length;
const dp = Array.from({ length: n }, () => Array(n).fill(0));

for (let len = 1; len <= n; len++) {
  for (let i = 0; i + len - 1 < n; i++) {
    const j = i + len - 1;
    for (let k = i; k <= j; k++) {
      const left = k > i ? dp[i][k - 1] : 0;
      const right = k < j ? dp[k + 1][j] : 0;
      const coins = a[i] * a[k + 1] * a[j + 2] + left + right;
      dp[i][j] = Math.max(dp[i][j], coins);
    }
    console.log("range", nums.slice(i, j + 1), "best", dp[i][j]);
  }
}`,["range [3] best 3      1*3*1","range [1] best 5      3*1*5 wait — neighbors are padded","range [5] best 5","range [3, 1] best 30","range [1, 5] best 30","range [3, 1, 5] best 45   burst 1 last between 3 and 5"]),"grid-dp":w("only right and down",`const grid = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1],
];
const h = grid.length, w = grid[0].length;
const dp = grid.map((row) => row.slice());

for (let r = 0; r < h; r++) {
  for (let c = 0; c < w; c++) {
    if (r === 0 && c === 0) continue;
    const up = r ? dp[r - 1][c] : Infinity;
    const left = c ? dp[r][c - 1] : Infinity;
    dp[r][c] += Math.min(up, left);
    console.log(r, c, "→", dp[r][c]);
  }
}`,["0 1 → 4     1+3","0 2 → 5     4+1","1 0 → 2     1+1","1 1 → 7     2+5","1 2 → 6     5+1","2 2 → 7     path 1-3-1-1-1"]),"interval-dp":w("min cuts so every piece is a palindrome",`const s = "aab";
const n = s.length;
const pal = (i, j) => s.slice(i, j + 1) === [...s.slice(i, j + 1)].reverse().join("");
const cuts = Array(n).fill(n);

for (let i = 0; i < n; i++) {
  if (pal(0, i)) {
    cuts[i] = 0;
  } else {
    for (let j = 0; j < i; j++) {
      if (pal(j + 1, i)) cuts[i] = Math.min(cuts[i], cuts[j] + 1);
    }
  }
  console.log("prefix", s.slice(0, i + 1), "cuts", cuts[i]);
}`,["prefix a   cuts 0    already a palindrome","prefix aa  cuts 0    aa","prefix aab cuts 1    aa | b"]),"bitmask-dp":w("TSP: visit each city once, 4 nodes",`const d = [
  [0, 10, 15, 20],
  [10, 0, 35, 25],
  [15, 35, 0, 30],
  [20, 25, 30, 0],
];
const n = 4, FULL = (1 << n) - 1;
const dp = Array.from({ length: 1 << n }, () => Array(n).fill(Infinity));
dp[1][0] = 0;

for (let mask = 1; mask <= FULL; mask++) {
  for (let u = 0; u < n; u++) {
    if (!(mask & (1 << u)) || dp[mask][u] === Infinity) continue;
    for (let v = 0; v < n; v++) {
      if (mask & (1 << v)) continue;
      const nxt = mask | (1 << v);
      dp[nxt][v] = Math.min(dp[nxt][v], dp[mask][u] + d[u][v]);
    }
  }
}

for (let u = 1; u < n; u++) {
  console.log("end at", u, "tour", dp[FULL][u] + d[u][0]);
}
console.log("best", Math.min(...dp[FULL].map((c, u) => c + d[u][0])));`,["end at 1 tour 80","end at 2 tour 75","end at 3 tour 80","best 75   0-1-3-2-0 = 10+25+30+15"]),"tree-dp":w("house-robber on a tree: take node or kids",`const tree = { val: 3, kids: [
  { val: 2, kids: [{ val: 3, kids: [] }] },
  { val: 3, kids: [{ val: 1, kids: [] }] },
]};

function rob(node) {
  if (!node.kids.length) {
    console.log("leaf", node.val, "take", node.val, "skip", 0);
    return [node.val, 0];
  }
  let take = node.val, skip = 0;
  for (const kid of node.kids) {
    const [t, s] = rob(kid);
    take += s;
    skip += Math.max(t, s);
  }
  console.log("node", node.val, "take", take, "skip", skip);
  return [take, skip];
}

const [t, s] = rob(tree);
console.log("best", Math.max(t, s));`,["leaf 3 take 3 skip 0","node 2 take 2 skip 3","leaf 1 take 1 skip 0","node 3 take 3 skip 1","node 3 take 7 skip 6","best 7   root + two leaves 3 and 1"]),"digit-dp":w("count numbers ≤ 23 with no digit 3",`const digits = [2, 3];

function dfs(i, tight, started) {
  if (i === digits.length) return started ? 1 : 1;
  const cap = tight ? digits[i] : 9;
  let ways = 0;
  for (let d = 0; d <= cap; d++) {
    if (d === 3) continue;
    ways += dfs(i + 1, tight && d === cap, started || d > 0);
  }
  console.log("pos", i, "tight", tight, "cap", cap, "ways from here", ways);
  return ways;
}

console.log("count", dfs(0, true, false));`,["pos 1 tight true  cap 3  ways from here 3   digits 0,1,2 (skip 3)","pos 1 tight false cap 9  ways from here 9","pos 0 tight true  cap 2  ways from here 21","count 21   0..23 minus 3,13,23"])},S={"interval-scheduling":w("always take the job that ends first",`const jobs = [[1, 4], [2, 3], [3, 5], [5, 7]];
jobs.sort((a, b) => a[1] - b[1]);
let end = -Infinity, taken = 0;

for (const [s, e] of jobs) {
  if (s >= end) {
    taken++;
    end = e;
    console.log("take", [s, e], "end", end);
  } else {
    console.log("skip", [s, e], "overlaps", end);
  }
}
console.log("count", taken);`,["take [2, 3]  end 3","skip [1, 4]  overlaps 3","skip [3, 5]  overlaps 3","take [5, 7]  end 7","count 2"]),"jump-game":w("farthest index reachable so far",`const A = [2, 3, 1, 1, 4];
let far = 0;

for (let i = 0; i < A.length; i++) {
  if (i > far) {
    console.log("stuck at", i);
    break;
  }
  far = Math.max(far, i + A[i]);
  console.log("i", i, "far", far);
  if (far >= A.length - 1) {
    console.log("can reach end");
    break;
  }
}`,["i 0 far 2","i 1 far 4","can reach end   1 + A[1]=3 lands on last index"]),"gas-station":w("if the tank goes negative, start after here",`const gas = [1, 2, 3, 4, 5];
const cost = [3, 4, 5, 1, 2];
let tank = 0, total = 0, start = 0;

for (let i = 0; i < gas.length; i++) {
  const d = gas[i] - cost[i];
  tank += d;
  total += d;
  console.log("i", i, "delta", d, "tank", tank);
  if (tank < 0) {
    start = i + 1;
    tank = 0;
    console.log("reset start", start);
  }
}
console.log("start", total >= 0 ? start : -1);`,["i 0 delta -2  tank -2","reset start 1","i 1 delta -2  tank -2","reset start 2","i 3 delta 3   tank 1   (after i=2 also reset)","start 3   only station 3 finishes a lap"]),"fractional-knapsack":w("value / weight, take a fraction of the last",`const items = [
  { w: 10, v: 60 },
  { w: 20, v: 100 },
  { w: 30, v: 120 },
];
items.sort((a, b) => b.v / b.w - a.v / a.w);
let cap = 50, worth = 0;

for (const { w, v } of items) {
  const take = Math.min(w, cap);
  worth += (v / w) * take;
  cap -= take;
  console.log("take", take, "/", w, "ratio", v / w, "left", cap);
}
console.log("worth", worth);`,["take 10 / 10  ratio 6  left 40","take 20 / 20  ratio 5  left 20","take 20 / 30  ratio 4  left 0    fraction of the last","worth 240"]),"meeting-rooms":w("sweep starts and ends, track rooms in use",`const meetings = [[0, 30], [5, 10], [15, 20]];
const start = meetings.map((m) => m[0]).sort((a, b) => a - b);
const end = meetings.map((m) => m[1]).sort((a, b) => a - b);
let i = 0, j = 0, used = 0, rooms = 0;

while (i < start.length) {
  if (start[i] < end[j]) {
    used++;
    rooms = Math.max(rooms, used);
    console.log("start", start[i], "used", used);
    i++;
  } else {
    used--;
    console.log("end", end[j], "used", used);
    j++;
  }
}
console.log("rooms", rooms);`,["start 0  used 1","start 5  used 2","end 10  used 1","start 15 used 2","rooms 2   two overlap at a time"]),candy:w("two slopes: left-to-right then right-to-left",`const r = [1, 0, 2];
const c = r.map(() => 1);

for (let i = 1; i < r.length; i++) {
  if (r[i] > r[i - 1]) c[i] = c[i - 1] + 1;
}
console.log("after L→R", [...c]);

for (let i = r.length - 2; i >= 0; i--) {
  if (r[i] > r[i + 1]) c[i] = Math.max(c[i], c[i + 1] + 1);
}
console.log("after R→L", [...c]);
console.log("total", c.reduce((a, b) => a + b));`,["after L→R [1, 1, 2]   2 > 0 so last gets 2","after R→L [2, 1, 2]   1 > 0 so first also 2","total 5"]),"assign-cookies":w("smallest cookie that satisfies the greediest leftover kid",`const kids = [1, 2, 3], cookies = [1, 1];
kids.sort((a, b) => a - b);
cookies.sort((a, b) => a - b);
let i = 0, fed = 0;

for (const cookie of cookies) {
  if (i < kids.length && cookie >= kids[i]) {
    console.log("give", cookie, "to kid", kids[i]);
    i++;
    fed++;
  } else {
    console.log("cookie", cookie, "too small or leftover");
  }
}
console.log("fed", fed);`,["give 1 to kid 1","cookie 1 too small or leftover   next kid wants 2","fed 1"]),"greedy-mst":w("sort edges, union if it does not cycle",`const edges = [
  [0, 1, 1], [0, 2, 4], [1, 2, 2], [1, 3, 6], [2, 3, 3],
];
edges.sort((a, b) => a[2] - b[2]);
const p = [0, 1, 2, 3];
const find = (x) => (p[x] === x ? x : (p[x] = find(p[x])));
let cost = 0;

for (const [u, v, w] of edges) {
  const a = find(u), b = find(v);
  if (a === b) {
    console.log("skip", u, v, "cycle");
    continue;
  }
  p[a] = b;
  cost += w;
  console.log("take", u, "-", v, "w", w);
}
console.log("MST", cost);`,["take 0 - 1  w 1","take 1 - 2  w 2","take 2 - 3  w 3","skip 0 2 cycle","skip 1 3 cycle","MST 6"]),kmp:w("prefix table, slide the pattern not the text",`const text = "ababcab", pat = "abc";
const lps = [0, 0, 0];
let i = 1, len = 0;
while (i < pat.length) {
  if (pat[i] === pat[len]) lps[i++] = ++len;
  else if (len) len = lps[len - 1];
  else lps[i++] = 0;
}
console.log("lps", lps);

let t = 0, p = 0;
while (t < text.length) {
  if (text[t] === pat[p]) {
    t++;
    p++;
    if (p === pat.length) {
      console.log("hit at", t - p);
      p = lps[p - 1];
    }
  } else if (p) {
    console.log("mismatch at", t, "fall to", lps[p - 1]);
    p = lps[p - 1];
  } else t++;
}`,["lps [0, 0, 0]","mismatch at 2  fall to 0   'aba' vs 'abc'","hit at 2   text[2..4] = abc"]),"rabin-karp":w("rolling hash of a window",`const text = "abracadabra", pat = "ada";
const BASE = 256, MOD = 101;
const n = pat.length;
let ph = 0, th = 0, pow = 1;

for (let i = 0; i < n; i++) {
  ph = (ph * BASE + pat.charCodeAt(i)) % MOD;
  th = (th * BASE + text.charCodeAt(i)) % MOD;
  if (i) pow = (pow * BASE) % MOD;
}
console.log("pattern hash", ph, "window0", th, text.slice(0, n));

for (let i = 0; i + n <= text.length; i++) {
  if (th === ph && text.slice(i, i + n) === pat) {
    console.log("hit", i, text.slice(i, i + n));
  }
  if (i + n < text.length) {
    th = (th - text.charCodeAt(i) * pow) % MOD;
    if (th < 0) th += MOD;
    th = (th * BASE + text.charCodeAt(i + n)) % MOD;
    console.log("roll to", text.slice(i + 1, i + 1 + n), th);
  }
}`,["pattern hash 4  window0 abr  17","roll to bra  53","roll to rac  86","hit 5 ada","roll to dab  …"]),"z-algorithm":w("Z[i] = longest prefix match starting at i",`const s = "aabcaab";
const z = Array(s.length).fill(0);
let L = 0, R = 0;

for (let i = 1; i < s.length; i++) {
  if (i < R) z[i] = Math.min(R - i, z[i - L]);
  while (i + z[i] < s.length && s[z[i]] === s[i + z[i]]) z[i]++;
  if (i + z[i] > R) {
    L = i;
    R = i + z[i];
  }
  console.log("i", i, "Z", z[i], "box", [L, R]);
}`,["i 1 Z 1  box [1, 2]    aa… matches a","i 2 Z 0  box [1, 2]","i 3 Z 0  box [1, 2]","i 4 Z 3  box [4, 7]    aab == prefix aab","i 5 Z 1  box [4, 7]","i 6 Z 0  box [4, 7]"]),manacher:w("odd palindromes: expand, then copy inside the box",`const s = "abaaba";
const p = Array(s.length).fill(0);
let c = 0, r = 0;

for (let i = 0; i < s.length; i++) {
  const mirror = 2 * c - i;
  if (i < r) p[i] = Math.min(r - i, p[mirror]);
  while (s[i - p[i] - 1] && s[i - p[i] - 1] === s[i + p[i] + 1]) p[i]++;
  if (i + p[i] > r) {
    c = i;
    r = i + p[i];
  }
  console.log("center", i, s[i], "rad", p[i], "box", [c, r]);
}`,["center 0 a rad 0  box [0, 0]","center 1 b rad 1  box [1, 2]   aba","center 2 a rad 0  box [1, 2]","center 3 a rad 2  box [3, 5]   baaba b — wait, abaaba from i=3","center 4 b rad 1  box [3, 5]","center 5 a rad 0  box [3, 5]"]),"trie-search":w("walk one child per letter",`const root = {};
for (const w of ["app", "apple", "bat"]) {
  let node = root;
  for (const ch of w) {
    node[ch] ??= {};
    node = node[ch];
  }
  node.$ = true;
}

function has(word) {
  let node = root;
  for (const ch of word) {
    if (!node[ch]) {
      console.log("miss", word, "at", ch);
      return false;
    }
    node = node[ch];
    console.log("step", ch, "end?", Boolean(node.$));
  }
  return Boolean(node.$);
}

console.log("apple", has("apple"));
console.log("apt", has("apt"));`,["step a end? false","step p end? false","step p end? true    'app' lives here","step l end? false","step e end? true","apple true   apt misses at t"]),"sliding-window-strings":w("shrink when a needed count goes extra",`const s = "ADOBECODEBANC", t = "ABC";
const need = { A: 1, B: 1, C: 1 };
let missing = 3, L = 0, best = "";

for (let R = 0; R < s.length; R++) {
  if (need[s[R]] !== undefined) {
    if (need[s[R]] > 0) missing--;
    need[s[R]]--;
  }
  while (missing === 0) {
    const win = s.slice(L, R + 1);
    if (!best || win.length < best.length) {
      best = win;
      console.log("best", best);
    }
    if (need[s[L]] !== undefined) {
      need[s[L]]++;
      if (need[s[L]] > 0) missing++;
    }
    L++;
  }
}
console.log("answer", best);`,["best ADOBEC","best CODEBA   shorter? no, same 6 — keep first","best BANC","answer BANC"]),"suffix-array":w("sort every suffix, then the string is searchable",`const s = "banana";
const sa = [...s.keys()].sort((i, j) => (s.slice(i) < s.slice(j) ? -1 : 1));

for (const i of sa) {
  console.log(i, s.slice(i));
}`,["5 a","3 ana","1 anana","0 banana","4 na","2 nana"]),"suffix-tree":w("compressed trie of suffixes — edges are slices",`const s = "banana$";
const tree = { children: {} };

function insert(i) {
  let node = tree;
  let k = i;
  while (k < s.length) {
    const ch = s[k];
    if (!node.children[ch]) {
      node.children[ch] = { edge: s.slice(k), children: {} };
      console.log("leaf", s.slice(i), "via", s.slice(k));
      return;
    }
    const edge = node.children[ch].edge;
    let m = 0;
    while (m < edge.length && s[k + m] === edge[m]) m++;
    k += m;
    node = node.children[ch];
  }
}

for (let i = 0; i < s.length; i++) insert(i);`,["leaf banana$ via banana$","leaf anana$  via anana$","leaf nana$   via nana$","leaf ana$    via ana$     shares 'a' then splits","leaf na$     via na$","leaf a$      via a$       and $ as its own leaf"]),"aho-corasick":w("trie plus failure links, emit every hit",`const words = ["he", "she", "his", "hers"];
const root = { next: {}, fail: null, out: [] };

for (const w of words) {
  let n = root;
  for (const ch of w) {
    n.next[ch] ??= { next: {}, fail: null, out: [] };
    n = n.next[ch];
  }
  n.out.push(w);
}

const q = [];
for (const ch of Object.keys(root.next)) {
  root.next[ch].fail = root;
  q.push(root.next[ch]);
}
while (q.length) {
  const cur = q.shift();
  for (const [ch, nxt] of Object.entries(cur.next)) {
    let f = cur.fail;
    while (f && !f.next[ch]) f = f.fail;
    nxt.fail = (f && f.next[ch]) || root;
    nxt.out = nxt.out.concat(nxt.fail.out);
    q.push(nxt);
  }
}

const text = "ushers";
let node = root;
console.log("scan", text);
for (let i = 0; i < text.length; i++) {
  while (node && !node.next[text[i]]) node = node.fail;
  node = (node && node.next[text[i]]) || root;
  if (node.out.length) console.log("at", i, node.out);
}`,["scan ushers","at 3 ['she', 'he']   …she","at 5 ['hers']        ushers"]),"bit-set-unset-toggle":w("OR sets, AND-NOT clears, XOR flips",`let n = 0b0101;
console.log("start", n.toString(2).padStart(4, "0"));

n |= 1 << 1;
console.log("set bit1", n.toString(2).padStart(4, "0"));

n &= ~(1 << 2);
console.log("clear bit2", n.toString(2).padStart(4, "0"));

n ^= 1 << 0;
console.log("toggle bit0", n.toString(2).padStart(4, "0"));`,["start 0101","set bit1  0111","clear bit2 0011","toggle bit0 0010"]),"count-bits":w("n & 1 then shift, or popcount table",`function bits(n) {
  let c = 0;
  const steps = [];
  while (n) {
    steps.push((n & 1) + " from " + n.toString(2));
    c += n & 1;
    n >>>= 1;
  }
  console.log(steps.join(" | "));
  return c;
}

console.log("pop 13", bits(13));
console.log("pop 7", bits(7));
console.log("pop 8", bits(8));`,["1 from 1101 | 0 from 110 | 1 from 11 | 1 from 1","pop 13 3","1 from 111 | 1 from 11 | 1 from 1","pop 7 3","0 from 1000 | 0 from 100 | 0 from 10 | 1 from 1","pop 8 1"]),"xor-tricks":w("pairs cancel, the loner remains",`const nums = [4, 1, 2, 1, 2];
let x = 0;

for (const n of nums) {
  x ^= n;
  console.log("xor", n, "→", x);
}
console.log("single", x);`,["xor 4 → 4","xor 1 → 5","xor 2 → 7","xor 1 → 6    1 cancelled","xor 2 → 4    2 cancelled","single 4"]),"bitmask-subsets":w("every mask from 0 to 2^n - 1",`const items = ["a", "b", "c"];
const n = items.length;

for (let mask = 0; mask < 1 << n; mask++) {
  const sub = items.filter((_, i) => mask & (1 << i));
  console.log(mask.toString(2).padStart(n, "0"), sub);
}`,["000 []","001 ['a']","010 ['b']","011 ['a', 'b']","100 ['c']  … 101 110 111"]),kernighan:w("n &= n - 1 drops the lowest set bit",`let n = 0b101100;
let steps = 0;

while (n) {
  console.log("n", n.toString(2), "lowest", (n & -n).toString(2));
  n &= n - 1;
  steps++;
}
console.log("set bits", steps);`,["n 101100  lowest 100","n 101000  lowest 1000","n 100000  lowest 100000","set bits 3"]),"euclid-gcd":w("gcd(a, b) = gcd(b, a % b)",`function gcd(a, b) {
  console.log("gcd", a, b);
  while (b) {
    const r = a % b;
    console.log(a, "%", b, "=", r);
    a = b;
    b = r;
  }
  return a;
}

console.log("result", gcd(48, 18), "lcm", (48 * 18) / 6);`,["gcd 48 18","48 % 18 = 12","18 % 12 = 6","12 % 6 = 0","result 6  lcm 144"]),sieve:w("mark multiples of each prime",`const n = 20;
const prime = Array(n + 1).fill(true);
prime[0] = prime[1] = false;

for (let p = 2; p * p <= n; p++) {
  if (!prime[p]) continue;
  console.log("strike multiples of", p);
  for (let x = p * p; x <= n; x += p) prime[x] = false;
}
console.log("primes", prime.map((ok, i) => (ok ? i : null)).filter(Boolean));`,["strike multiples of 2","strike multiples of 3","primes [2, 3, 5, 7, 11, 13, 17, 19]"]),"modular-arithmetic":w("(a + b) % m and a safe multiply",`const MOD = 7;
const a = 15, b = 20;

console.log("add", (a + b) % MOD);
console.log("sub", (((a - b) % MOD) + MOD) % MOD);
console.log("mul", (a * b) % MOD);

let x = 1;
for (let i = 0; i < 5; i++) x = (x * 3) % MOD;
console.log("3^5 % 7", x);`,["add 1     35 % 7","sub 2     -5 + 7","mul 6     300 % 7","3^5 % 7  5"]),"fast-exponentiation":w("square the base, multiply when the bit is on",`function pow(base, exp, mod) {
  let ans = 1;
  base %= mod;
  while (exp > 0) {
    if (exp & 1) {
      ans = (ans * base) % mod;
      console.log("odd, multiply", base, "ans", ans);
    }
    base = (base * base) % mod;
    exp >>= 1;
    console.log("square →", base, "exp", exp);
  }
  return ans;
}

console.log("3^13 % 100", pow(3, 13, 100));`,["odd, multiply 3  ans 3","square → 9  exp 6","square → 81 exp 3","odd, multiply 81 ans 43","square → 61 exp 1","3^13 % 100  23"]),factorization:w("trial divide up to sqrt, peel primes off",`let n = 84;
const factors = [];

for (let p = 2; p * p <= n; p++) {
  while (n % p === 0) {
    factors.push(p);
    n /= p;
    console.log("peel", p, "left", n);
  }
}
if (n > 1) {
  factors.push(n);
  console.log("last", n);
}
console.log("84 =", factors.join(" \xd7 "));`,["peel 2 left 42","peel 2 left 21","peel 3 left 7","last 7","84 = 2 × 2 × 3 × 7"]),"ncr-mod-inverse":w("n! * inv(k!) * inv((n-k)!) mod p",`const MOD = 13;

function modPow(a, e) {
  let r = 1;
  for (a %= MOD; e; e >>= 1, a = (a * a) % MOD) if (e & 1) r = (r * a) % MOD;
  return r;
}

const fact = [1];
for (let i = 1; i <= 8; i++) fact[i] = (fact[i - 1] * i) % MOD;
const inv = (x) => modPow(x, MOD - 2);

function nCr(n, k) {
  const v = (((fact[n] * inv(fact[k])) % MOD) * inv(fact[n - k])) % MOD;
  console.log("C(" + n + "," + k + ")", v);
  return v;
}

nCr(8, 3);
nCr(6, 2);
console.log("inv(2)", inv(2), "because 2*7=14≡1");`,["C(8,3) 4    56 % 13","C(6,2) 2    15 % 13","inv(2) 7  because 2*7=14≡1"]),catalan:w("C_n = sum C_i * C_{n-1-i}",`const C = [1];

for (let n = 1; n <= 5; n++) {
  C[n] = 0;
  for (let i = 0; i < n; i++) C[n] += C[i] * C[n - 1 - i];
  console.log("C" + n, C[n]);
}`,["C1 1","C2 2","C3 5    parentheses / BSTs / paths","C4 14","C5 42"]),"segment-tree":w("range sum, point update, 4n array",`const A = [1, 3, 5, 7];
const n = A.length;
const t = Array(4 * n).fill(0);

function build(i, l, r) {
  if (l === r) {
    t[i] = A[l];
    return;
  }
  const m = (l + r) >> 1;
  build(i * 2, l, m);
  build(i * 2 + 1, m + 1, r);
  t[i] = t[i * 2] + t[i * 2 + 1];
}

function query(i, l, r, ql, qr) {
  if (qr < l || r < ql) return 0;
  if (ql <= l && r <= qr) return t[i];
  const m = (l + r) >> 1;
  return query(i * 2, l, m, ql, qr) + query(i * 2 + 1, m + 1, r, ql, qr);
}

build(1, 0, n - 1);
console.log("sum[1..2]", query(1, 0, n - 1, 1, 2));
function upd(i, l, r, pos, val) {
  if (l === r) {
    t[i] = val;
    return;
  }
  const m = (l + r) >> 1;
  pos <= m ? upd(i * 2, l, m, pos, val) : upd(i * 2 + 1, m + 1, r, pos, val);
  t[i] = t[i * 2] + t[i * 2 + 1];
}
upd(1, 0, n - 1, 2, 10);
console.log("set A[2]=10");
console.log("sum[1..2]", query(1, 0, n - 1, 1, 2));
console.log("sum all", query(1, 0, n - 1, 0, 3));`,["sum[1..2] 8    3+5","set A[2]=10","sum[1..2] 13   3+10","sum all 21"]),fenwick:w("i += i & -i climbs; i -= i & -i sums",`const n = 5;
const bit = Array(n + 1).fill(0);

function add(i, v) {
  for (; i <= n; i += i & -i) bit[i] += v;
}

function prefix(i) {
  let s = 0;
  for (; i > 0; i -= i & -i) s += bit[i];
  return s;
}

add(1, 2);
add(2, 3);
add(4, 5);
console.log("bit", bit.slice(1));
console.log("sum 1..2", prefix(2));
console.log("sum 1..4", prefix(4));
console.log("range 3..4", prefix(4) - prefix(2));`,["bit [2, 5, 0, 10, 0]   chunks of length i&-i","sum 1..2  5","sum 1..4  10","range 3..4  5"]),"sparse-table":w("st[k][i] = min of 2^k starting at i",`const A = [4, 2, 3, 7, 1, 5];
const n = A.length;
const LOG = Math.floor(Math.log2(n));
const st = [A.slice()];

for (let k = 1; 1 << k <= n; k++) {
  st[k] = [];
  for (let i = 0; i + (1 << k) <= n; i++) {
    st[k][i] = Math.min(st[k - 1][i], st[k - 1][i + (1 << (k - 1))]);
  }
  console.log("len", 1 << k, st[k]);
}

function rmq(L, R) {
  const k = Math.floor(Math.log2(R - L + 1));
  return Math.min(st[k][L], st[k][R - (1 << k) + 1]);
}

console.log("min[1..4]", rmq(1, 4));
console.log("min[3..5]", rmq(3, 5));`,["len 2  [2, 2, 3, 1, 1]","len 4  [2, 1, 1]","min[1..4] 1","min[3..5] 1"]),"lazy-propagation":w("pending add sits on a node until you walk through it",`const n = 4;
const t = Array(8).fill(0);
const lazy = Array(8).fill(0);

function push(i, l, r) {
  if (!lazy[i]) return;
  t[i] += lazy[i] * (r - l + 1);
  if (l !== r) {
    lazy[i * 2] += lazy[i];
    lazy[i * 2 + 1] += lazy[i];
  }
  console.log("push node", i, "add", lazy[i], "span", r - l + 1);
  lazy[i] = 0;
}

function addRange(i, l, r, ql, qr, v) {
  push(i, l, r);
  if (qr < l || r < ql) return;
  if (ql <= l && r <= qr) {
    lazy[i] += v;
    push(i, l, r);
    return;
  }
  const m = (l + r) >> 1;
  addRange(i * 2, l, m, ql, qr, v);
  addRange(i * 2 + 1, m + 1, r, ql, qr, v);
  t[i] = t[i * 2] + t[i * 2 + 1];
}

addRange(1, 0, n - 1, 1, 3, 5);
console.log("sum all", t[1]);`,["push node 1 add 0 span 4   empty lazy","push node 2 … walk left, no cover","push node 3 add 5 span 2   right half [2,3] tagged","push node 5 add 5 span 1   leaf A[1]","sum all 15   three cells +5"]),"ordered-set":w("sorted unique values plus rank / kth",`class Ordered {
  constructor() { this.a = []; }
  add(x) {
    const i = this.rank(x);
    if (this.a[i] === x) return;
    this.a.splice(i, 0, x);
    console.log("add", x, this.a);
  }
  rank(x) {
    let lo = 0, hi = this.a.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.a[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }
  kth(k) { return this.a[k]; }
}

const s = new Ordered();
s.add(5); s.add(1); s.add(5); s.add(3);
console.log("rank 3", s.rank(3));
console.log("kth 1", s.kth(1));`,["add 5 [5]","add 1 [1, 5]","add 3 [1, 3, 5]   duplicate 5 ignored","rank 3  1   one value strictly smaller","kth 1  3"]),"persistent-segment-tree":w("update copies the O(log n) path, old roots stay",`function leaf(val) { return { val, L: null, R: null }; }
function node(L, R) { return { val: L.val + R.val, L, R }; }

function build(l, r) {
  if (l === r) return leaf(0);
  const m = (l + r) >> 1;
  return node(build(l, m), build(m + 1, r));
}

function upd(prev, l, r, pos, val) {
  if (l === r) return leaf(val);
  const m = (l + r) >> 1;
  if (pos <= m) return node(upd(prev.L, l, m, pos, val), prev.R);
  return node(prev.L, upd(prev.R, m + 1, r, pos, val));
}

function sum(o, l, r, ql, qr) {
  if (!o || qr < l || r < ql) return 0;
  if (ql <= l && r <= qr) return o.val;
  const m = (l + r) >> 1;
  return sum(o.L, l, m, ql, qr) + sum(o.R, m + 1, r, ql, qr);
}

const n = 4;
const v0 = build(0, n - 1);
const v1 = upd(v0, 0, n - 1, 1, 7);
const v2 = upd(v1, 0, n - 1, 3, 2);
console.log("v0 sum", sum(v0, 0, n - 1, 0, 3));
console.log("v1 sum", sum(v1, 0, n - 1, 0, 3), "A[1]=7");
console.log("v2 sum", sum(v2, 0, n - 1, 0, 3), "A[3]=2");
console.log("v1 still", sum(v1, 0, n - 1, 0, 3));`,["v0 sum 0","v1 sum 7  A[1]=7","v2 sum 9  A[3]=2","v1 still 7   old version untouched"])},T={...k,...v,...x,...A,...S,...y,...b};function C(e,t){let a=e.replace(/\s+/g," ").trim();return a.length<=t?a:`${a.slice(0,t-1)}…`}var D=e.i(53282);function q(e){let t=e.replace(/\s+/g," ").trim(),a=t.split(/(?<=[.!?])\s/)[0]??t;return a.length>160?`${a.slice(0,150).trim()}…`:a}function P(e){return{definition:(0,D.easyDefinition)(e),why:q(e.whyItMatters),approach:e.howItWorks.slice(0,3).map(e=>q(e))}}let L={"hld:url-shortener":{askedAs:['"Design bit.ly."','"We need short links for SMS. Whiteboard it."','"Don\'t worry about the UI. How does redirect work at 50k QPS?"'],theyWant:["Read-heavy path, unique codes, cache, not 12 microservices.","301 vs 302 and why stats break.","How you stop guessable codes and duplicate POSTs."],opening:"v1 is mint a unique code and 302 fast. Custom aliases, QR, and teams are v2. Redirects dwarf writes.",answerSteps:[{label:"Clarify",say:"Shorten, redirect, optional TTL and click count. No full analytics in v1."},{label:"Estimate",say:"Writes hundreds/s. Redirects 10k–100k/s. Rows are tiny — storage is not the boss."},{label:"API",say:"POST /urls → {code}. GET /{code} → 302. Idempotency-Key on POST."},{label:"Data",say:"urls(code PK, long_url, expires_at). Redis code→url. Counters async."},{label:"Sketch",say:"DNS → LB → stateless redirectors → Redis → SQL. Writes to primary only."},{label:"Dive",say:"IDs: Snowflake→base62. Collision retry. Viral codes: replicate the cache entry."},{label:"Wrap",say:"301 caches in the browser (cheap, bad stats). Shard by code hash at 10x."}],followUps:[{q:"Custom aliases?",a:"Unique index. That's a CP write. Rate-limit and auth it."},{q:"Someone scrapes sequential codes.",a:"Don't use incrementing IDs. Base62 of a wide snowflake. Bloom for 404s."},{q:"Can we put this only in Redis?",a:"No if links must survive a flush. Redis is the cache, SQL/KV is source of truth."}]},"hld:newsfeed":{askedAs:['"Design Twitter / Facebook home feed."','"I follow 200 people. How do I see new posts quickly?"'],theyWant:["Fan-out on write vs read.","Celebrity / hot-key problem.","Ranking is v2 — delivery is v1."],opening:"The hard part is fan-out, not the tweet table. I'd pick fan-out-on-write for normal users and fan-out-on-read for celebrities.",answerSteps:[{label:"Clarify",say:"Home timeline, post, follow. Not search, not DMs. Freshness vs ranking."},{label:"Estimate",say:"Reads >> writes. One post × 1k followers = 1k cache writes. Celebrities break that."},{label:"API",say:"POST /posts. GET /feed?cursor. POST /follow."},{label:"Data",say:"posts by id. follow graph. precomputed feed lists in Redis/Cassandra per user."},{label:"Sketch",say:"Write: API → post DB → fan-out workers → follower feed caches. Read: API → my feed cache."},{label:"Dive",say:"Hybrid: push to normal followers, pull celebrities at read time and merge."},{label:"Wrap",say:"If they ask ranking, add a lightweight score on merge — don't start with ML."}],followUps:[{q:"Someone has 50M followers.",a:"Do not write 50M feed entries. Pull at read. Cache their recent posts."},{q:"Feed looks empty after a follow.",a:"Backfill recent posts of the followee into my precomputed list, async."}]},"hld:chat":{askedAs:['"Design WhatsApp."','"1:1 and group chat, online, ticks. No video in v1."'],theyWant:["WebSocket vs poll.","Message durability vs fan-out to devices.","Group chat is not N² connections."],opening:"Connections are WebSockets to a gateway. Messages persist first, then push to online devices. Groups fan-out through the server, not peer-to-peer.",answerSteps:[{label:"Clarify",say:"1:1 + groups, delivery ticks, media later. Which consistency on ticks?"},{label:"Estimate",say:"Many idle sockets. Messages smaller than media. Groups of 256, not 50k, in v1."},{label:"API",say:"WS events: send, ack, presence. REST for history and media URLs."},{label:"Data",say:"messages by chat_id + seq. inbox per user-device. object store for media."},{label:"Sketch",say:"Client → WS gateway → chat service → Kafka → Cassandra / store. Presence in Redis."},{label:"Dive",say:"Persist then ack. Offline: store and push on connect. Don't await every device."},{label:"Wrap",say:"Gateways are sticky or the session map is in Redis so any gateway can find the socket."}],followUps:[{q:"How do ticks work?",a:"Sent = persisted. Delivered = device ack. Read = receipt event. They can be eventual."},{q:"Group of 10k?",a:"Don't open 10k sockets from the sender. Publish once, consumers fan-out."}]},"hld:uber":{askedAs:['"Design Uber matching."','"Rider opens the app. How do we pick a driver?"'],theyWant:["Location stream.","Geo index, not a table scan.","Matching is a race — locking / offer."],opening:"Two loops: drivers ping location, riders request a trip. Matching queries nearby supply and offers one driver at a time.",answerSteps:[{label:"Clarify",say:"Request ride, match, track. Pricing and multi-stop are v2 unless they insist."},{label:"Estimate",say:"Location updates are the QPS hog. Match QPS is much smaller."},{label:"API",say:"POST /trips. WS/SSE for driver location. POST /drivers/location."},{label:"Data",say:"trips. drivers. Redis GEO or S2 cells for nearby. Trip state machine."},{label:"Sketch",say:"Rider API → matching → geo index → offer to driver app. Location ingest separate."},{label:"Dive",say:"Offer with TTL. If ignored, next driver. Lock the trip so two drivers don't win."},{label:"Wrap",say:"Surge is a read of density, not a rewrite of matching."}],followUps:[{q:"Two riders grab the last driver.",a:"Conditional update on driver state. Loser re-queries."},{q:"How big is a geo cell?",a:"Start ~1km. Too empty: expand ring. Too full: rank by ETA, not all of downtown."}]},"hld:cap-theorem":{askedAs:['"SQL is down across the ocean. What does CAP say?"','"Why can\'t we have consistent and available chat receipts?"'],theyWant:["You pick during a partition.","You name the product pain.","PACELC if they go deeper."],opening:"If the network splits I must choose: stop taking writes (CP) or take writes that may conflict (AP). I pick from the requirement we wrote, not from a slogan.",answerSteps:[{label:"Define",say:"Partition happens. Then Consistency and Availability fight. You already have P."},{label:"CP example",say:"Unique short alias, seat hold, ledger append — refuse if we can't agree."},{label:"AP example",say:"Likes, typing indicators, read ticks — serve stale, repair later."},{label:"Say the pick",say:"Point at the write on the board: 'this one is CP, that one is AP.'"}],followUps:[{q:"We have no partition right now.",a:"PACELC: even then you trade latency vs consistency (sync replica vs async)."}]},"lld:parking-lot":{askedAs:['"Design a parking lot. Classes please."','"Cars, bikes, EV. Then I\'ll add weekend pricing."'],theyWant:["Lot as aggregate.","Spot occupy is the invariant.","FeePolicy is the variant seam."],opening:"v1 verbs: park and unpark. The lot owns floors and spots. A ticket records the stay. Fees are a policy, not a switch in unpark.",answerSteps:[{label:"Scope",say:"park(vehicle) → ticket. unpark(ticket) → fee. Multi-floor. Payment port optional."},{label:"Nouns",say:"ParkingLot, Floor, Spot, Vehicle, Ticket, FeePolicy, ParkingService."},{label:"Invariant",say:"A spot is FREE or has exactly one vehicle. occupy() enforces it."},{label:"Classes",say:"Lot.findSpot + occupy atomically. FeePolicy.quote(ticket, now)."},{label:"Sequence",say:"park → find → occupy → ticket. unpark → quote → pay → free."},{label:"Code",say:"Write occupy/free and the service. Fake the clock."},{label:"Variant",say:"EV spots = type + finder. Weekend rates = new FeePolicy. Do not touch park()."}],followUps:[{q:"Add EV charging.",a:"New spot type and a finder preference. Same park()."},{q:"Two cars, one last spot.",a:"Lock the lot or the floor around find+occupy. Idempotent park with a key."}]},"lld:elevator":{askedAs:['"Design an elevator system."','"Two shafts, ten floors. Then I\'ll add express cars."'],theyWant:["State machine per car.","Scheduler is a strategy.","Requests vs assignments."],opening:"Each car is a state machine (idle, moving, door). A scheduler picks a car for a hall call. I would not hard-code SCAN in the car.",answerSteps:[{label:"Scope",say:"Hall call, car call, open/close. Safety limits. No pretty UI."},{label:"Nouns",say:"ElevatorCar, FloorRequest, Scheduler, Door, ElevatorService."},{label:"Invariant",say:"A car has one direction or idle. Door open only when stopped."},{label:"Classes",say:"Scheduler.assign(request) → carId. Car.step(now) advances state."},{label:"Sequence",say:"Hall call → scheduler → car queue → step → arrive → door."},{label:"Code",say:"Code Car.step and one scheduler. Tick with a fake clock."},{label:"Variant",say:"Express / peak hours = new Scheduler. Don't edit Car."}],followUps:[{q:"Three cars, how do you pick?",a:"Closest idle, or SCAN that will pass the floor. Interface, two impls."},{q:"Someone spams every floor.",a:"Dedupe requests in the car queue. Don't grow unbounded."}]},"lld:splitwise":{askedAs:['"Design Splitwise."','"A pays for dinner. How do balances update?"'],theyWant:["Ledger, not a single balance cell.","Simplify is optional.","Group vs pairwise."],opening:"I'd store expenses and splits as a ledger. Balances are projections. Simplify is a separate algorithm on the graph of debts.",answerSteps:[{label:"Scope",say:"addExpense, balances, settle. Groups. Currency later."},{label:"Nouns",say:"User, Group, Expense, Split, LedgerService, SimplifyPolicy."},{label:"Invariant",say:"Splits on an expense sum to the total. No silent remainder."},{label:"Classes",say:"Ledger.apply(expense). BalanceBook is derived."},{label:"Sequence",say:"addExpense → validate splits → append → recompute balances."},{label:"Code",say:"Write apply + balance query. Tests on a 3-person dinner."},{label:"Variant",say:"Simplify debts = min-cash-flow on the graph, not a rewrite of apply."}],followUps:[{q:"Someone deletes an expense.",a:"Append a reversing entry. Don't mutate history if you can avoid it."},{q:"Unequal splits.",a:"Split strategy: equal, exact, percent. Same expense, different SplitPolicy."}]},"lld:strategy-pattern":{askedAs:['"Payment can be card or UPI. Don\'t use a switch."','"When do you use Strategy?"'],theyWant:["Problem first.","Interface + concretes + client.","OCP without a speech."],opening:"The algorithm varies, the caller shouldn't. Checkout calls payment.charge. Card and UPI are two classes.",answerSteps:[{label:"Problem",say:"A growing if/else on how we do one step."},{label:"Shape",say:"Policy interface, two impls, client holds the interface."},{label:"Use",say:"Fees, payment, ranking, elevator scheduling."},{label:"Don't",say:"One algorithm forever — a function is enough."}],followUps:[{q:"That's just an interface.",a:"Yes. Strategy is the name for 'swap the brain.' Don't overdraw it."}]}},B={"dsa:binary-search":{howQuestionsCome:['"Find a number in a sorted array faster than a scan."','"First index of target. Then the last."','"The array is rotated — still O(log n)?"','"Minimum k such that we can finish the job."'],howToAnswer:{firstMinute:"I'd confirm the array — or the predicate — is monotonic. Then binary search: lo, hi, mid = lo + (hi-lo)//2, throw away the half that cannot hold the answer. I say the invariant out loud: if the target exists it is still in [lo, hi].",deepDive:"Offer first/last occurrence (biased shrink), overflow-safe mid, and binary search on the answer if they switch to a feasibility check. Mention the infinite-loop when both bounds move to mid."}},"dsa:bfs":{howQuestionsCome:['"Shortest path in a maze / word ladder."','"Minimum moves to unlock this combination."','"Why not DFS?"','"What if there are several starts — rotting oranges?"'],howToAnswer:{firstMinute:"Unweighted shortest path is BFS. Queue, mark visited on enqueue so the frontier does not explode, store dist or parent. The first time I see the target is the hop-shortest path.",deepDive:"Offer multi-source BFS (several starts at dist 0), grid neighbors, and when I would switch to Dijkstra (weighted) or 0-1 BFS. Reconstruct the path from parent."}},"dsa:knapsack-01":{howQuestionsCome:['"Max value with a weight cap, each item once."','"Partition equal subset sum — can we split the array?"','"How is this different from coin change?"','"Can you roll it to 1-D?"'],howToAnswer:{firstMinute:"0/1 knapsack: each item at most once. dp[c] is best value with capacity c. For each item I walk capacity backward so I do not reuse it in the same pass. Answer is dp[W].",deepDive:"Say 'backward loop' so they know it is not unbounded. Partition equal subset is this table with boolean OR. If they allow repeats, that is unbounded / coin change — forward loop."}},"dsa:two-pointers":{howQuestionsCome:['"Two numbers that add to target in a sorted array."','"Do it in O(n) not O(n²)."','"Container with most water / three sum."'],howToAnswer:{firstMinute:"Sorted, so I can put a finger on each end. Too big — move right left. Too small — move left right. One pass, no nested pair loop.",deepDive:"Three sum is sort + this for each i. If they unsort the array I hash instead. Say the invariant: everything left of L is too small to try again."}},"hld:url-shortener":{howQuestionsCome:['"Design bit.ly."','"Short links for SMS. Whiteboard it."','"How does redirect work at 50k QPS?"','"301 or 302?"'],howToAnswer:{firstMinute:"v1 is mint a unique code and 302 fast. Redirects dwarf writes. POST /urls mints Snowflake→base62, writes SQL. GET /{code} hits Redis, then SQL, then 302. Analytics stay off the read path.",deepDive:"Offer 301 vs 302, custom aliases as a CP write, bloom for missing codes, and why the table is not only Redis if links must survive a flush."}},"hld:cap-theorem":{howQuestionsCome:['"SQL is down across the ocean. What does CAP say?"','"Why can\'t chat receipts be consistent and available?"','"Are we CA?"'],howToAnswer:{firstMinute:"When the network splits I must choose: refuse writes (CP) or take writes that may conflict (AP). I pick from the requirement, not a slogan. Unique alias is CP. Likes are AP.",deepDive:"Point at each write on the board. Offer PACELC when they say there is no partition — latency vs consistency. Quorum / Raft is how CP is implemented."}},"lld:parking-lot":{howQuestionsCome:['"Design a parking lot. Classes please."','"Cars, bikes, EV. Then weekend pricing."','"Two cars, one last spot."'],howToAnswer:{firstMinute:"v1 verbs: park and unpark. The lot owns floors and spots. A ticket records the stay. Fees are a FeePolicy, not a switch in unpark. occupy() enforces one vehicle per spot.",deepDive:"When they add EV, add a spot type and a finder preference. Weekend rates = new policy. Last-spot race: lock the lot or the floor around find+occupy."}},"lld:strategy-pattern":{howQuestionsCome:['"Payment can be card or UPI. Don\'t use a switch."','"When do you use Strategy?"','"Elevator — now add peak-hour dispatch."'],howToAnswer:{firstMinute:"The algorithm varies, the caller shouldn't. Checkout holds a Payment interface. Card and UPI are two classes. I would not name the pattern first — I name the varying step.",deepDive:"Show two concretes and the inject site. Adding Wallet is a new class. If there is only one algorithm forever, a function is enough — say that."}}};function j(e){var t;let a,s,o,n;return e.howQuestionsCome?.length&&e.howToAnswer?{howQuestionsCome:e.howQuestionsCome,howToAnswer:e.howToAnswer}:B[`${e.track}:${e.slug}`]??B[e.slug]??function(e){let t=L[`${e.track}:${e.slug}`]??L[e.slug];if(!t)return;let a=t.answerSteps.filter(e=>/dive|variant|data|code|wrap|sketch/i.test(e.label)).map(e=>e.say).join(" "),s=t.followUps[0]?` If they ask “${t.followUps[0].q}”: ${t.followUps[0].a}`:"";return{howQuestionsCome:t.askedAs.slice(0,4),howToAnswer:{firstMinute:t.opening,deepDive:(a||t.answerSteps.slice(-2).map(e=>e.say).join(" "))+s}}}(e)??(a=(t=e).title.replace(/^Design (a |an |the )?/i,"").replace(/\s+\(.*\)$/,"").trim(),s=t.interviewTips[0],o=t.pitfalls[0],n=t.tradeoffs?.[0]??t.whenNotToUse?.[0],"ai"===t.track?{howQuestionsCome:[t.practiceIdeas[0]??`Here is a messy product situation. ${a} is the tool, not the title.`,s?`${s}`:"How do you know a change did not make it worse?","Walk a tiny example. Do not start from the paper name.",o?`What goes wrong if ${o.toLowerCase()}`:"The docs changed yesterday. Now what?"].slice(0,4),howToAnswer:{firstMinute:`${t.summary} I'd state the problem first, then the check (eval, token budget, or SQL allow-list).`,deepDive:`Next notch: ${t.howItWorks[1]??t.howItWorks[0]}. ${n?`Tradeoff: ${n}`:""}`.trim()}}:"dsa"===t.track?{howQuestionsCome:[t.practiceIdeas[0]??"Here is an array / graph / string. Find the answer in better than brute force.",s?`${s}`:"Can you do better than checking every pair / every cell?","Walk a tiny example, then code. Do not start from the algorithm name.",o?`What goes wrong if ${o.toLowerCase()}`:"Empty input, n=1, already sorted — what happens?"].slice(0,4),howToAnswer:{firstMinute:`${t.summary} I'd dry-run a tiny case first, then say the invariant and the complexity${t.complexity?` (${t.complexity.time} time, ${t.complexity.space} space)`:""}.`,deepDive:`Offer the next notch: ${t.howItWorks[1]??t.howItWorks[0]}. ${n?`Tradeoff: ${n}`:""} ${s??""}`.trim()}}:"hld"===t.track?t.category.toLowerCase().includes("design")||t.slug.includes("method")?{howQuestionsCome:[`"Design ${a}."`,`"How would ${a} work for 10 million users?"`,'"Start from the user. I will interrupt."',o?`"What if ${o.toLowerCase()}"`:'"The primary is down — now what?"'],howToAnswer:{firstMinute:`I'd treat this as a 45-minute HLD. First I lock v1 of ${a}: who uses it, read vs write, latency, what is v2. ${t.summary}`,deepDive:`Then API, data, one write path and one read path. Deep dive: ${t.howItWorks[0]??s}. ${n??""}`.trim()}}:{howQuestionsCome:[`"Explain ${t.title} like I have to pick it today."`,'"We\'re seeing pain — would you introduce this?"','"What\'s the alternative, and when does it win?"',s?`"${s}"`:'"Draw it on this newsfeed diagram."'],howToAnswer:{firstMinute:`${t.summary} I'd only add it if a requirement we wrote down actually needs it. ${t.whenToUse[0]??""}`,deepDive:`Tradeoff: ${n??t.howItWorks[0]}. Failure mode: ${o??"name the hop that dies first."} ${s??""}`.trim()}}:"Designs"===t.category||t.slug.includes("method")||"add-a-variant"===t.slug?{howQuestionsCome:[`"Design ${a} in code. Classes, not Kubernetes."`,"\"When you're done I'm going to add a new type / fee / thread.\"",'"What\'s the invariant?"',s?`"${s}"`:'"Two threads call the same method."'],howToAnswer:{firstMinute:`I'd keep this in-process. v1 verbs for ${a}, then nouns, invariants, one sequence, then I code the heart. ${t.summary}`,deepDive:`Seam for the variant: ${t.howItWorks[t.howItWorks.length-1]??s}. ${n??""}`.trim()}}:{howQuestionsCome:[`"When would you use ${t.title}?"`,'"Our class is growing a switch — what do you do?"','"Draw it. Then tell me when you would not."',s?`"${s}"`:'"Isn\'t this overkill?"'],howToAnswer:{firstMinute:`I wouldn't name the pattern first. I'd say the problem ${t.title.toLowerCase()} solves, then the three types. ${t.summary}`,deepDive:`Shape: ${t.howItWorks[0]}. Don't: ${t.whenNotToUse?.[0]??"one algorithm forever — a function is enough."} ${s??""}`.trim()}})}function R(e){let t=m(e),a=P(e);return`You are a patient interview tutor. Topic: ${e.title} (${e.track}).
THE PROBLEM (they will say this, not the algorithm name):
Given: ${t.given}
Find: ${t.find}
Tiny example: ${t.example}
Definition: ${a.definition}
Why: ${a.why}
Approach: ${a.approach.join(" → ")}
They ask: ${t.askedAs.join(" | ")}
Answer first minute: ${j(e).howToAnswer.firstMinute}
Keep answers short. Start from the problem, then the JS idea (arrays, Map, Set).`}function M(e,t){let a=t.toLowerCase(),s=m(e),o=P(e),n=j(e),i=function(e){let t=T[e.slug]??T[`${e.track}:${e.slug}`];if(t)return t;let a=e.howItWorks.slice(0,5);return{title:`how ${e.title} runs in JS`,code:`// ${e.title}
${a.map((e,t)=>`console.log("step ${t+1}", ${JSON.stringify(C(e,70))});`).join("\n")}`,logs:a.map((e,t)=>`step ${t+1}  ${C(e,90)}`)}}(e);return I(a,["problem","given","what do they ask","statement","prompt","question","how would they"])?`They will not say “${e.title}.” They will say something like: ${s.askedAs[0]??s.find} Given: ${s.given} Find: ${s.find}`:I(a,["example","sample","input","tiny"])?`Tiny example. ${s.example}`:I(a,["why","need","exist","when"])?o.why:I(a,["approach","how do i","steps","walk"])?`Start from the problem, not the name. ${o.approach.map((e,t)=>`${t+1}. ${e}`).join(" ")}`:I(a,["javascript","js","code","console","run"])?`In JavaScript: ${i.title}. ${i.logs[0]??""} The console on this page walks the rest, one log at a time.`:I(a,["answer","say first","first minute","interview"])?n.howToAnswer.firstMinute:I(a,["whiteboard","ask this","phrasing"])?`Whiteboard prompts: ${s.askedAs.join(" Next: ")}`:I(a,["define","definition","what is","meaning"])?`The problem first: ${s.find} The tool people later call ${e.title}: ${o.definition}`:`The problem: ${s.given} Find: ${s.find} Example: ${s.example} If you want the tool name after that, it is ${e.title}.`}function I(e,t){return t.some(t=>e.includes(t))}let W=["What is the problem?","Give me the tiny example.","How do I approach it?","How would they ask this?","Show it in JavaScript."];async function N(e,t){let a=globalThis.LanguageModel;if(!a?.availability||!a.create)return null;try{let s=await a.availability();if("unavailable"===s)return null;let o=await a.create({initialPrompts:[{role:"system",content:R(e)}]}),n=await o.prompt(t);return"string"==typeof n?n:null}catch{return null}}e.s(["TalkPanel",0,function({topic:e}){let s,[o,n]=(0,a.useState)([{who:"tutor",text:(s=m(e),`They will not say “${e.title}.” The problem: ${s.given} Find: ${s.find} Example: ${s.example}`)}]),[i,r]=(0,a.useState)(""),[l,c]=(0,a.useState)(!1),[h,d]=(0,a.useState)(!0),[u,p]=(0,a.useState)(!1),[f,g]=(0,a.useState)(!1),w=(0,a.useRef)(!0),y=(0,a.useRef)(null);async function b(t){let a=t.trim();if(a){r(""),n(e=>[...e,{who:"you",text:a}]);try{let t=await Promise.race([N(e,a),new Promise(e=>window.setTimeout(()=>e(null),400))])??M(e,a);n(e=>[...e,{who:"tutor",text:t}]);if(w.current&&window.speechSynthesis)try{window.speechSynthesis.cancel();let e=new SpeechSynthesisUtterance(t);e.rate=1.02,window.speechSynthesis.speak(e)}catch{}}catch{let t=M(e,a);n(e=>[...e,{who:"tutor",text:t}])}}}async function k(t){let a=[...o].reverse().find(e=>"you"===e.who)?.text??"Explain the problem like I am new. Then quiz me with whiteboard prompts only — do not name the algorithm until I ask.",s=`${R(e)}

Student: ${a}
Tutor:`;await navigator.clipboard.writeText(s),p(!0),window.setTimeout(()=>p(!1),2e3),t&&window.open("https://gemini.google.com/app","_blank","noreferrer")}return(0,a.useEffect)(()=>{w.current=h},[h]),(0,a.useEffect)(()=>(g(!0),()=>{try{window.speechSynthesis?.cancel(),y.current?.stop()}catch{}}),[]),(0,t.jsxs)("div",{className:"sky-card border-accent/20 p-5",children:[(0,t.jsxs)("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("p",{className:"eyebrow",children:"Talk this through"}),(0,t.jsxs)("p",{className:"mt-1 text-sm text-slate",children:["Free. Tap a chip or the mic — I talk back. Or copy a prompt into Gemini.",f?" Ready.":""]})]}),(0,t.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,t.jsx)("button",{type:"button",onClick:()=>{let e=!h;d(e),w.current=e,e||window.speechSynthesis?.cancel()},className:"rounded-full border border-line px-3 py-1 text-xs",children:h?"Voice on":"Voice off"}),(0,t.jsx)("button",{type:"button",onClick:()=>void k(!1),className:"rounded-full border border-line px-3 py-1 text-xs",children:u?"Copied":"Copy prompt"}),(0,t.jsx)("button",{type:"button",onClick:()=>void k(!0),className:"rounded-full bg-ink px-3 py-1 text-xs text-white",children:"Ask Gemini"})]})]}),(0,t.jsx)("div",{role:"log","aria-live":"polite",className:"mt-4 max-h-72 space-y-2 overflow-y-auto rounded-xl bg-sky-wash/60 p-3",children:o.map((e,a)=>(0,t.jsxs)("p",{className:"you"===e.who?"text-sm text-accent-deep":"text-sm text-ink",children:[(0,t.jsx)("strong",{children:"you"===e.who?"You · ":"Tutor · "}),e.text]},`${e.who}-${a}`))}),(0,t.jsx)("div",{className:"mt-3 flex flex-wrap gap-2",children:W.map(e=>(0,t.jsx)("button",{type:"button",onClick:()=>void b(e),className:"rounded-full border border-line bg-white px-3 py-1 text-xs text-ink hover:border-accent",children:e},e))}),(0,t.jsxs)("form",{action:"#",className:"mt-3 flex flex-wrap gap-2",onSubmit:e=>{e.preventDefault(),b(i)},children:[(0,t.jsx)("input",{value:i,onChange:e=>r(e.target.value),placeholder:"Ask out loud or type: what is the problem?",className:"min-w-[200px] flex-1 rounded-full border border-line bg-white px-4 py-2 text-sm outline-none focus:border-accent"}),(0,t.jsx)("button",{type:"button",onClick:function(){if(l){y.current?.stop(),c(!1);return}let e=window,t=e.SpeechRecognition||e.webkitSpeechRecognition;if(!t)return void n(e=>[...e,{who:"tutor",text:"This browser has no mic API. Type below, or tap Ask Gemini and paste."}]);let a=new t;a.lang="en-US",a.interimResults=!1,a.onresult=e=>{let t=e.results[0]?.[0]?.transcript;t&&b(t)},a.onend=()=>c(!1),y.current=a,c(!0),a.start()},className:`rounded-full px-3 py-2 text-sm ${l?"bg-accent text-white":"border border-line"}`,children:l?"Stop":"Mic"}),(0,t.jsx)("button",{type:"button",onClick:()=>void b(i),className:"rounded-full bg-accent px-4 py-2 text-sm text-white",children:"Ask"})]}),(0,t.jsx)("p",{className:"mt-2 text-[11px] text-fog",children:"Answers stay on this page — no paid API. Ask Gemini copies the same problem context so you can keep talking there for free."})]})}],29480)},30901,e=>{"use strict";var t=e.i(43476);function a(e,t,a,s,o,n,i){return{kind:e,title:t,nodes:a.map(([e,t,a,s,o])=>({id:e,label:t,role:a,x:s,y:o})),edges:s.map(([e,t,a,s])=>({from:e,to:t,label:a,style:s??("partition"===a?"cut":"solid")})),caption:o,frames:n.map(([e,t,a])=>({highlight:e,note:t,tags:a})),...i}}let s={"dsa:linear-search":a("array","Scan left to right",[],[],"No halves. One finger walks the row until a hit or the end.",[[["0"],"Check 4 — not 9.",{0:"i"}],[["1"],"Check 1 — not 9.",{1:"i"}],[["2"],"Check 7 — not 9.",{2:"i"}],[["3"],"Check 9 — found. Stop.",{3:"hit"}]],{cells:[4,1,7,9,2,8].map((e,t)=>({id:String(t),value:String(e)}))}),"dsa:binary-search":a("array","Throw away half",[],[],"Find 9. Mid decides which sorted half can still hold it.",[[["0","1","2","3","4","5","6"],"mid=7 < 9. Drop left half.",{0:"lo",3:"mid",6:"hi"}],[["4","5","6"],"mid=11 > 9. Drop right half.",{4:"lo",5:"mid",6:"hi"}],[["4"],"lo=hi. 9 found.",{4:"hit"}]],{cells:[1,3,5,7,9,11,13].map((e,t)=>({id:String(t),value:String(e)}))}),"dsa:binary-search-bounds":a("array","First and last hit",[],[],"Same loop, biased shrink. Left-bias finds the first 7; right-bias finds the last.",[[["0","1","2","3","4","5"],"Target 7. Mid 7 — keep going left for first.",{2:"mid",0:"lo",5:"hi"}],[["0","1","2"],"Still 7 at mid. Shrink hi to mid.",{1:"mid",2:"first"}],[["2","3","4","5"],"Right-bias: keep going right for last 7.",{4:"last"}]],{cells:[1,3,7,7,7,12].map((e,t)=>({id:String(t),value:String(e)}))}),"dsa:peak-finding":a("array","Walk toward a peak",[],[],"Compare mid with mid+1. The uphill side still has a peak.",[[["0","1","2","3","4","5"],"mid=2 (4) vs 5. Slope goes right — drop left.",{2:"mid",3:"mid+1"}],[["3","4","5"],"mid=4 (8) vs 6. Slope goes left — drop right.",{4:"mid",5:"mid+1"}],[["3","4"],"8 ≥ neighbors. Peak.",{4:"peak"}]],{cells:[1,3,4,5,8,6].map((e,t)=>({id:String(t),value:String(e)}))}),"dsa:search-rotated-array":a("array","One sorted half",[],[],"Rotated 7|0. One side of mid is sorted — keep or drop that half.",[[["0","1","2","3","4","5","6"],"Left 4..7 is sorted. 0 is not there.",{0:"lo",3:"mid",6:"hi"}],[["4","5","6"],"Keep [0,1,2]. mid=1.",{4:"lo",5:"mid",6:"hi"}],[["4"],"0 found.",{4:"hit"}]],{cells:[4,5,6,7,0,1,2].map((e,t)=>({id:String(t),value:String(e)}))}),"dsa:binary-search-on-answer":a("array","Search the answer, not an index",[],[],"The row is possible k values. P(k)=can finish in k days. False prefix, true suffix.",[[["0","1","2","3","4","5"],"k=8. Feasible? No — go right.",{2:"no"}],[["3","4","5"],"k=12. Yes — try smaller.",{3:"yes"}],[["3"],"Least true k is 12.",{3:"ans"}]],{cells:["k=4","k=6","k=8","k=12","k=16","k=24"].map((e,t)=>({id:String(t),value:e}))}),"dsa:two-pointers":a("pointers","L and R fingers",[],[],"Need sum 11. Too big → R left. Too small → L right.",[[["0","4"],"1+11=12 too big → move R.",{0:"L",4:"R"}],[["0","3"],"1+7=8 too small → move L.",{0:"L",3:"R"}],[["1","3"],"2+7=9 too small → move L.",{1:"L",3:"R"}],[["2","3"],"4+7=11. Pair found.",{2:"L",3:"R"}]],{cells:[1,2,4,7,11].map((e,t)=>({id:String(t),value:String(e)}))}),"dsa:sliding-window-fixed":a("window","Box of width k",[],[],"k=3. The blue box slides one cell: drop L, add the new R.",[[["0","1","2"],"[2,1,5]=8.",{0:"L",2:"R"}],[["1","2","3"],"Drop 2, add 1 → 7.",{1:"L",3:"R"}],[["2","3","4"],"Drop 1, add 3 → 9. Best.",{2:"L",4:"R"}]],{cells:[2,1,5,1,3].map((e,t)=>({id:String(t),value:String(e)}))}),"dsa:sliding-window-variable":a("window","Grow and shrink",[],[],"Longest box with sum ≤ 7. Grow R; while too big, shrink L.",[[["0","1"],"Grow R. [2,1]=3. OK.",{0:"L",1:"R"}],[["0","1","2"],"Grow R. +5=8. Too big.",{0:"L",2:"R"}],[["1","2"],"Shrink L. [1,5]=6. OK.",{1:"L",2:"R"}],[["1","2","3"],"Grow R. +1=7. Best length 3.",{1:"L",3:"R"}]],{cells:[2,1,5,1,3].map((e,t)=>({id:String(t),value:String(e)}))}),"dsa:fast-slow-pointers":a("graph","Turtle and hare",[["a","3","cell",10,28],["b","1","cell",32,28],["c","4","cell",54,28],["d","1","cell",78,50],["e","5","cell",54,76]],[["a","b"],["b","c"],["c","d"],["d","e"],["e","c","cycle","dashed"]],"Slow +1, fast +2. They meet in the ring.",[[["a"],"Both start at 3."],[["b","c"],"S at 1, F at 4."],[["c","e"],"S at 4, F at 5."],[["d"],"Meet at 1. Cycle."]]),"dsa:bfs":a("graph","Layer by layer",[["A","A 0","actor",50,12],["B","B 1","cell",28,42],["C","C 1","cell",72,42],["D","D 2","cell",14,74],["E","E 2","cell",50,74],["F","F 2","cell",86,74]],[["A","B"],["A","C"],["B","D"],["B","E"],["C","F"]],"Queue holds the next layer. First visit is the hop-shortest path.",[[["A"],"Queue: A. Dist 0."],[["A","B","C"],"Pop A. Enqueue B, C — layer 1."],[["B","D","E"],"Pop B. Enqueue D, E — layer 2."],[["C","F"],"Pop C. Enqueue F. First visit = shortest hops."]]),"dsa:dfs":a("graph","Dive, then backtrack",[["A","A","actor",50,10],["B","B","cell",28,32],["D","D","cell",18,56],["E","E","cell",14,82],["C","C","cell",78,40]],[["A","B"],["B","D"],["D","E"],["A","C"]],"One deep path on the stack. Finish the branch, then the sibling.",[[["A"],"Start at A. Stack: A."],[["A","B"],"Dive A → B. Sibling C waits."],[["A","B","D"],"Deeper: B → D."],[["A","B","D","E"],"D → E. Dead end — pop back."],[["A","C"],"Back at A. Now take C."]]),"dsa:dijkstra":a("graph","Cheapest so far",[["S","S 0","actor",12,50],["A","A 3","cell",44,20],["B","B 2","cell",44,80],["T","T 4","store",86,50]],[["S","A","4"],["S","B","2"],["B","A","1"],["A","T","1"],["B","T","5"]],"Costs on nodes. Expand the cheapest known. First pop of T is final.",[[["S"],"dist S=0. Heap: S. Others ∞."],[["S","B"],"Pop S. B=2 via edge 2. A=4 via edge 4."],[["S","B","A"],"Pop B. Relax A: 2+1=3. T via B: 2+5=7."],[["S","B","A","T"],"Pop A. T via A: 3+1=4. Better. Done."]]),"dsa:union-find":a("union-find","Two groups, then one",[["1","1","actor",26,18],["2","2","cell",12,58],["3","3","cell",40,58],["4","4","actor",74,18],["5","5","cell",60,58],["6","6","cell",88,58]],[["2","1"],["3","1"],["5","4"],["6","4"],["1","4","union","dashed"]],"Two groups. Find walks to a root; union links the roots into one.",[[["2","3","5","6"],"Six singletons. Each node is its own parent."],[["1","2","3"],"union(1,2), union(1,3). Left root = 1."],[["4","5","6"],"union(4,5), union(4,6). Right root = 4."],[["1","4"],"union(1,4). Roots link. Now one set."]]),"dsa:knapsack-01":a("dp-table","Take or skip, once",[["h0","0","cell"],["h1","1","cell"],["h2","2","cell"],["h3","3","cell"],["h4","4","cell"],["h5","5","cell"],["i0-0","0","cell"],["i0-1","0","cell"],["i0-2","0","cell"],["i0-3","0","cell"],["i0-4","0","cell"],["i0-5","0","cell"],["i1-0","0","cell"],["i1-1","0","cell"],["i1-2","3","cell"],["i1-3","3","cell"],["i1-4","3","cell"],["i1-5","3","cell"],["i2-0","0","cell"],["i2-1","0","cell"],["i2-2","3","cell"],["i2-3","4","cell"],["i2-4","4","cell"],["i2-5","7","cell"]],[],"Items (2,3) then (3,4). Cap 5. Each item once.",[[["i0-0","i0-1","i0-2","i0-3","i0-4","i0-5"],"No items. Row of 0."],[["i1-2","i1-3","i1-4","i1-5"],"Take (2,3): cap≥2 becomes 3."],[["i2-3","i2-5"],"Take (3,4): 4 or 3+4=7."]],{layout:"grid",lanes:[{id:"head",label:"cap",nodes:["h0","h1","h2","h3","h4","h5"]},{id:"r0",label:"∅",nodes:["i0-0","i0-1","i0-2","i0-3","i0-4","i0-5"]},{id:"r1",label:"+2,3",nodes:["i1-0","i1-1","i1-2","i1-3","i1-4","i1-5"]},{id:"r2",label:"+3,4",nodes:["i2-0","i2-1","i2-2","i2-3","i2-4","i2-5"]}]}),"dsa:coin-change":a("dp-table","Fewest coins to make n",[["h0","0","cell"],["h1","1","cell"],["h2","2","cell"],["h3","3","cell"],["h4","4","cell"],["h5","5","cell"],["h6","6","cell"],["a0","0","cell"],["a1","1","cell"],["a2","2","cell"],["a3","3","cell"],["a4","4","cell"],["a5","5","cell"],["a6","6","cell"],["b0","0","cell"],["b1","1","cell"],["b2","2","cell"],["b3","1","cell"],["b4","2","cell"],["b5","3","cell"],["b6","2","cell"],["c0","0","cell"],["c1","1","cell"],["c2","2","cell"],["c3","1","cell"],["c4","1","cell"],["c5","2","cell"],["c6","2","cell"]],[],"Coins 1,3,4. Each cell = min coins for that amount.",[[["a0","a1","a2","a3","a4","a5","a6"],"Coin 1 fills 0..6."],[["b3","b6"],"Coin 3: 3→1, 6→2 (3+3)."],[["c4","c6"],"Coin 4: 4→1. 6 stays 2."]],{layout:"grid",lanes:[{id:"head",label:"amt",nodes:["h0","h1","h2","h3","h4","h5","h6"]},{id:"r1",label:"+1",nodes:["a0","a1","a2","a3","a4","a5","a6"]},{id:"r3",label:"+3",nodes:["b0","b1","b2","b3","b4","b5","b6"]},{id:"r4",label:"+4",nodes:["c0","c1","c2","c3","c4","c5","c6"]}]}),"dsa:lcs":a("dp-table","Two strings, one grid",[["h0","·","cell"],["hA","A","cell"],["hB","B","cell"],["hC","C","cell"],["z00","0","cell"],["z0A","0","cell"],["z0B","0","cell"],["z0C","0","cell"],["zA0","0","cell"],["11","1","cell"],["12","1","cell"],["13","1","cell"],["zC0","0","cell"],["21","1","cell"],["22","1","cell"],["23","2","cell"],["zE0","0","cell"],["31","1","cell"],["32","2","cell"],["33","2","cell"]],[],"ACE vs ABC. Match = diag+1. Else max(left, up).",[[["z00","z0A","z0B","z0C","zA0","zC0","zE0"],"Borders stay 0."],[["11"],"A=A. Diagonal 1."],[["23","33"],"C=C → 2. Corner is LCS length."]],{layout:"grid",lanes:[{id:"cols",label:"",nodes:["h0","hA","hB","hC"]},{id:"r0",label:"·",nodes:["z00","z0A","z0B","z0C"]},{id:"rA",label:"A",nodes:["zA0","11","12","13"]},{id:"rC",label:"C",nodes:["zC0","21","22","23"]},{id:"rE",label:"E",nodes:["zE0","31","32","33"]}]}),"dsa:lis":a("dp-table","LIS ending at i",[["h0","3","cell"],["h1","1","cell"],["h2","2","cell"],["h3","4","cell"],["d0","1","cell"],["d1","1","cell"],["d2","2","cell"],["d3","3","cell"],["b0","1","cell"],["b1","1","cell"],["b2","2","cell"],["b3","3","cell"]],[],"dp[i] = 1 + max dp[j] for j<i and a[j]<a[i].",[[["h0","d0","b0"],"3 starts at length 1."],[["h1","d1"],"1 cannot follow 3. Still 1."],[["h2","d2","b2"],"2 follows 1 → length 2."],[["h3","d3","b3"],"4 follows 2 → length 3."]],{layout:"grid",lanes:[{id:"val",label:"a",nodes:["h0","h1","h2","h3"]},{id:"dp",label:"dp",nodes:["d0","d1","d2","d3"]},{id:"best",label:"max",nodes:["b0","b1","b2","b3"]}]}),"dsa:fibonacci-dp":a("rec-tree","Tree vs memo row",[["f5","f(5)","actor"],["f4","f(4)","cell"],["f3a","f(3)","cell"],["f3b","f(3)","cell"],["f2","f(2)","cache"]],[["f5","f4"],["f5","f3a"],["f4","f3b"],["f4","f2"]],"Naive tree repeats f(3). Bottom-up row [1,1,2,3,5] computes each once.",[[["f5"],"Ask f(5)."],[["f5","f4","f3a"],"Two children. f(3) will be asked twice."],[["f2"],"Memo: store f(n) so the second call is O(1)."]]),"dsa:grid-dp":a("dp-table","Only right or down",[["a","1","cell"],["b","1","cell"],["c","1","cell"],["d","1","cell"],["e","1","cell"],["f","2","cell"],["g","3","cell"],["h","4","cell"],["i","1","cell"],["j","3","cell"],["k","6","cell"],["l","10","cell"]],[],"Paths on a 3×4. Cell = left + above.",[[["a","b","c","d","e","i"],"First row and col stay 1."],[["f","g","h"],"1+1=2, then 3, then 4."],[["j","k","l"],"3, 6, 10 paths to the corner."]],{layout:"grid",lanes:[{id:"r0",label:"r0",nodes:["a","b","c","d"]},{id:"r1",label:"r1",nodes:["e","f","g","h"]},{id:"r2",label:"r2",nodes:["i","j","k","l"]}]}),"dsa:two-sum":a("buckets","Need and seen",[["n0","2","cell"],["n1","7","cell"],["n2","11","cell"],["n3","15","cell"],["m7","need 7","cache"],["hit","7 @ i=1","store"]],[["n0","m7","9-2"],["n1","hit","found"]],"Walk once. Map value→index. If target-x is already in the map, return the pair.",[[["n0","m7"],"See 2. Store need 7."],[["n1","hit"],"See 7. Need is waiting. Pair (0,1)."]]),"dsa:kadane":a("dp-table","Best ending here",[["a0","2","cell"],["a1","−3","cell"],["a2","4","cell"],["a3","−1","cell"],["a4","5","cell"],["c0","2","cell"],["c1","−1","cell"],["c2","4","cell"],["c3","3","cell"],["c4","8","cell"],["b0","2","cell"],["b1","2","cell"],["b2","4","cell"],["b3","4","cell"],["b4","8","cell"]],[],"cur = max(a[i], cur+a[i]). Track the global max.",[[["a0","c0","b0"],"Start 2."],[["a1","c1","b1"],"2−3=−1. Keep −1. Best 2."],[["a2","c2","b2"],"Restart at 4. Best 4."],[["a4","c4","b4"],"3+5=8. Best 8."]],{layout:"grid",lanes:[{id:"a",label:"a",nodes:["a0","a1","a2","a3","a4"]},{id:"cur",label:"cur",nodes:["c0","c1","c2","c3","c4"]},{id:"best",label:"best",nodes:["b0","b1","b2","b3","b4"]}]}),"dsa:prefix-sum":a("array","Running totals",[],[],"pref[i] = a[0]+…+a[i]. Range [L,R] is pref[R]−pref[L−1].",[[["0"],"pref 2.",{0:"p"}],[["1"],"2+1=3.",{1:"p"}],[["3"],"Query [1,3] = 8−2 = 6.",{1:"L",3:"R"}]],{cells:["2","3","7","8","10"].map((e,t)=>({id:String(t),value:e}))}),"dsa:merge-sort":a("bars","Split, then zipper",[["a","4","cell"],["b","1","cell"],["c","3","cell"],["d","2","cell"]],[],"Halves until one element, then merge two sorted runs.",[[["a","b","c","d"],"Unsorted 4 1 3 2."],[["b","a","d","c"],"Sorted pairs: 1,4 and 2,3."],[["b","d","c","a"],"Zipper: 1,2,3,4."]],{cells:[4,1,3,2].map((e,t)=>({id:String(t),value:String(e)}))}),"dsa:quick-sort":a("bars","Pivot and partition",[["a","3","cell"],["b","1","cell"],["c","4","cell"],["d","2","cell"]],[],"Pick a pivot. < pivot left, > pivot right. Recurse both sides.",[[["c"],"Pivot 4."],[["a","b","d","c"],"Partition: 3,1,2 | 4."],[["b","d","a","c"],"Recurse left → 1,2,3,4."]],{cells:[3,1,4,2].map((e,t)=>({id:String(t),value:String(e)}))}),"dsa:heapify":a("heap","Sift down to a heap",[["r","2","actor",50,16],["l","8","cell",28,48],["ri","5","cell",72,48],["ll","3","cell",16,80],["lr","4","cell",40,80]],[["r","l"],["r","ri"],["l","ll"],["l","lr"]],"Parent must beat both children. Swap 2 with 8, then again if needed.",[[["r"],"2 is smaller than 8 and 5."],[["l","r"],"Swap with larger child 8."],[["l"],"Heap property restored at the root."]]),"dsa:top-k":a("heap","A heap of size k",[["h1","5","actor",50,18],["h2","7","cell",28,52],["h3","9","cell",72,52],["x","4","queue",50,86]],[["h1","h2"],["h1","h3"]],"Min-heap of the best k. Next item 4 < root 5 — ignore. 10 would pop 5 and push 10.",[[["h1","h2","h3"],"Heap holds 5,7,9. k=3."],[["x"],"See 4. Smaller than min — discard."]]),"dsa:trie":a("trie","Prefix tree",[["root","·","actor",50,10],["c","c","cell",30,32],["ca","a","cell",30,54],["cat","t*","store",16,78],["car","r*","store",44,78],["b","b","cell",74,32],["ba","a","cell",74,54],["bat","t*","store",74,78]],[["root","c"],["c","ca"],["ca","cat","cat"],["ca","car","car"],["root","b"],["b","ba"],["ba","bat","bat"]],"Shared prefixes share a path. A word ends on a marked leaf.",[[["root","c","ca","cat"],"Insert cat. Path c-a-t. Mark t."],[["c","ca","car"],"Insert car. Branch after ca."],[["b","ba","bat"],"Insert bat. New first letter."],[["c","ca"],"startsWith(ca)? Node a exists — yes."]]),"dsa:tree-traversals":a("tree","When you visit",[["A","A","actor",50,12],["B","B","cell",26,40],["C","C","cell",74,40],["D","D","cell",12,72],["E","E","cell",40,72],["F","F","cell",74,72]],[["A","B"],["A","C"],["B","D"],["B","E"],["C","F"]],"Same tree, three visit times: before kids, between, or after.",[[["A"],"Pre: visit A first, then kids."],[["A","B","D","E","C","F"],"Pre: A B D E C F."],[["D","B","E","A","C","F"],"In: D B E A C F (left, node, right)."],[["D","E","B","F","C","A"],"Post: D E B F C A (kids, then node)."]]),"dsa:lca":a("tree","Deepest shared ancestor",[["A","A","actor",50,10],["B","B","cell",30,34],["C","C","cell",76,34],["D","D","cell",30,58],["P","P","store",16,84],["Q","Q","store",44,84]],[["A","B"],["A","C"],["B","D"],["D","P"],["D","Q"]],"Walk up from both targets. The deepest node that covers both is the LCA.",[[["P","Q"],"Query: LCA of P and Q."],[["P"],"DFS left of D finds P."],[["Q"],"DFS right of D finds Q."],[["D"],"D sees both sides. LCA is D, not A."]]),"dsa:reverse-linked-list":a("list","Three pointers",[["a","1","cell"],["b","2","cell"],["c","3","cell"],["d","4","cell"]],[["a","b"],["b","c"],["c","d"]],"prev, cur, next. Flip cur.next = prev. Slide the triple.",[[["a"],"prev=null, cur=1."],[["a","b"],"1 → null. cur=2."],[["b","a"],"2 → 1 → null."],[["d","c","b","a"],"4 → 3 → 2 → 1."]]),"dsa:valid-parentheses":a("stack","Push open, pop match",[["s0","(","cell"],["s1","[","cell"],["s2","{","cell"]],[],"Opens go on the stack. A close must match the top or the string is invalid.",[[["s0"],"See (. Push."],[["s0","s1"],"See [. Push."],[["s0"],"See ]. Pop [. Match."]]),"dsa:next-greater-element":a("stack","Monotonic decreasing",[["a","2","cell"],["b","1","cell"],["c","5","cell"],["d","3","cell"]],[],"Walk left→right. Pop anything smaller than a[i] — a[i] is their next greater.",[[["a"],"Stack: 2."],[["a","b"],"1 < 2. Push 1."],[["c"],"5 pops 1 then 2. Next greater of both is 5."]]),"dsa:kmp":a("array","Prefix table, no restart",[],[],"Pattern aaba. lps[i] = longest prefix that is a suffix. Mismatch jumps to lps.",[[["0","1"],"aa — lps 0,1.",{1:"lps=1"}],[["2"],"aab — b breaks. lps=0.",{2:"lps=0"}],[["3"],"aaba — last a matches prefix. lps=1.",{3:"lps=1"}]],{cells:["a","a","b","a"].map((e,t)=>({id:String(t),value:e}))}),"dsa:topo-sort-kahn":a("graph","Peel indegree 0",[["A","A 0","actor",14,22],["B","B 1","cell",50,22],["C","C 1","cell",14,62],["D","D 2","store",82,42]],[["A","B"],["A","C"],["B","D"],["C","D"]],"Start at indegree 0. Pop a node and its outgoing edges vanish.",[[["A"],"Only A has indegree 0. Queue: A."],[["A","B","C"],"Pop A. Edges A→B, A→C gone. B,C now 0."],[["B","C","D"],"Pop B then C. Both edges into D vanish."],[["D"],"D falls to 0. Order: A, B, C, D."]]),"dsa:islands":a("dp-table","Flood each land blob",[["a","1","cell"],["b","1","cell"],["c","0","cell"],["d","0","cell"],["e","1","cell"],["f","1","cell"],["g","0","cell"],["h","0","cell"],["i","1","cell"],["j","1","cell"],["k","0","cell"],["l","0","cell"],["m","0","cell"],["n","1","cell"],["o","0","cell"],["p","0","cell"],["q","1","cell"],["r","0","cell"],["s","0","cell"],["t","0","cell"]],[],"Each unmarked 1 starts a flood. One flood = one island.",[[["a","b","f"],"Hit a 1. Flood island 1 (3 cells)."],[["e","i","j","n"],"Next unmarked 1. Flood island 2."],[["q"],"Last land. Island 3. Count = 3."]],{layout:"grid",lanes:[{id:"r0",label:"",nodes:["a","b","c","d","e"]},{id:"r1",label:"",nodes:["f","g","h","i","j"]},{id:"r2",label:"",nodes:["k","l","m","n","o"]},{id:"r3",label:"",nodes:["p","q","r","s","t"]}]}),"hld:url-shortener":a("split","Mint vs redirect",[["cw","Client","client"],["post","POST","service"],["id","ID→62","worker"],["dbw","SQL","store"],["cr","Client","client"],["get","GET /x","edge"],["redis","Redis","cache"],["dbr","SQL","store"],["go","302","edge"]],[["cw","post","mint"],["post","id"],["id","dbw"],["cr","get","read"],["get","redis"],["redis","dbr","miss"],["dbr","go"]],"Write mints a code. Read is Redis → SQL → 302. No analytics on this hop.",[[["cw","post","id","dbw"],"Mint: Snowflake → base62, insert, return."],[["cr","get","redis"],"Hit: 302 now."],[["get","dbr","go"],"Miss: SQL, fill Redis, 302."]],{lanes:[{id:"w",label:"POST mint",nodes:["cw","post","id","dbw"]},{id:"r",label:"GET redirect",nodes:["cr","get","redis","dbr","go"]}]}),"hld:newsfeed":a("compare","Write fan-out vs read pull",[["post","Post","client"],["f1","Inbox A","cache"],["f2","Inbox B","cache"],["f3","Inbox C","cache"],["celeb","Celeb TL","store"],["me","Merge","service"]],[["post","f1","push"],["post","f2"],["post","f3"],["celeb","me","pull"]],"Normal: push ids into follower inboxes. Celebrity: pull at read, then merge.",[[["post","f1","f2","f3"],"Fan-out on write."],[["celeb"],"Skip 50M inbox writes."],[["celeb","me"],"Read: inbox + celeb TL + hydrate."]],{lanes:[{id:"w",label:"Fan-out write",nodes:["post","f1","f2","f3"]},{id:"r",label:"Fan-out read",nodes:["celeb","me"]}]}),"hld:chat":a("flow","WS + presence, persist, push",[["phone","Phone","client"],["ws","WS + presence","edge"],["log","Persist","store"],["on","Online socket","service"],["off","Offline inbox","queue"]],[["phone","ws"],["ws","log","ack after write"],["log","on"],["log","off","if away"]],"Socket holds presence. Persist first. Online gets the event; offline waits in an inbox.",[[["phone","ws"],"WS up. Heartbeat = presence."],[["ws","log"],"Write log, then ack sent."],[["on"],"Online: pubsub to the other socket."],[["off"],"Away: per-user inbox + push."]]),"hld:uber":a("flow","Ping cells, offer, lock",[["drv","Driver ping","actor"],["geo","S2 cells","cache"],["match","Matcher","service"],["offer","Offer TTL","policy"],["lock","CAS trip","store"]],[["drv","geo","location"],["geo","match","nearby"],["match","offer"],["offer","lock"]],"Supply streams into cells. One offer at a time. CAS so two drivers cannot win.",[[["drv","geo"],"Pings land in live cells."],[["match","geo"],"Cover pickup, rank ETA."],[["offer"],"Offer one driver. Timeout → next."],[["lock"],"Accept: CAS busy, trip starts."]]),"hld:rate-limiting":a("buckets","Token bucket",[["req","Request","client"],["t3","●●●","cell"],["t2","●●","cell"],["t1","●","cell"],["no","429","cut"]],[["req","t3","spend"],["t3","t2"],["t2","t1"],["t1","no","empty"]],"Refill at rate r, burst b. Spend a token or 429 + Retry-After.",[[["t3"],"Full: burst of 3."],[["req","t2"],"Spend one. Two left."],[["t1"],"Last token."],[["no"],"Empty — 429."]]),"hld:notifications":a("fanout","One event, many channels",[["ev","Like event","client"],["pref","Prefs / quiet","policy"],["in","Inbox","store"],["push","APNs / FCM","queue"],["mail","Email digest","worker"]],[["ev","pref"],["pref","in"],["pref","push"],["pref","mail"]],"Filter prefs, write inbox, then channel workers. Never send from the like request.",[[["ev"],"Product outbox → bus."],[["pref"],"Quiet hours / mute / dedup."],[["in","push"],"Inbox + push now."],[["mail"],"Low priority: batch email."]]),"hld:autocomplete":a("flow","Prefix at keystroke QPS",[["q",'"an"',"client"],["cdn","Redis / CDN","cache"],["trie","Hot trie","service"],["tail","Tail index","store"],["k","Top K","edge"]],[["q","cdn"],["cdn","trie","miss"],["trie","tail","rare"],["tail","k"]],"Hot prefixes are a replicated memory trie. Tail falls to a completion index. Re-rank after fetch.",[[["q","cdn"],"Keystroke. Cache hit → done."],[["trie"],"Popular: in-memory prefix walk."],[["tail"],"Long tail: n-gram / ES."],[["k"],"Return K. Personalize only as rerank."]]),"hld:web-crawler":a("flow","Frontier, polite fetch",[["front","Frontier","queue"],["tok","Host bucket","policy"],["get","Fetch","worker"],["parse","Parse links","service"],["seen","Seen / bloom","store"]],[["front","tok"],["tok","get"],["get","parse"],["parse","seen"]],"Shard the frontier by host. A per-host bucket is politeness. Dedup before enqueue.",[[["front","tok"],"Host has a token? Else wait."],[["get"],"Fetch. Respect robots."],[["parse","seen"],"Canonicalize. New? Enqueue."],[["seen"],"Old hash → skip store."]]),"hld:maps-nearby":a("buckets","Cover the circle",[["pin","lat,lng,r","client"],["c1","Cell 12","cell"],["c2","Cell 13","cell"],["c3","Cell 21","cell"],["k","Top K","service"]],[["pin","c1","cover"],["pin","c2"],["pin","c3"],["c1","k","haversine"]],"Cells that cover the radius, then exact distance. Do not scan the world table.",[[["pin"],"Query: pin + radius."],[["c1","c2","c3"],"Covering S2 / geohash cells."],[["k"],"Exact km filter, rank, cap K."]]),"hld:youtube":a("flow","Upload → ladder → CDN",[["up","Master PUT","client"],["job","Transcode","worker"],["hls","HLS / DASH","store"],["cdn","CDN PoP","edge"],["play","ABR player","client"]],[["up","job"],["job","hls","ladder"],["hls","cdn"],["cdn","play"]],"One master. Many bitrates. Player fetches segments from the edge, not the API.",[[["up"],"Multipart master to object store."],[["job","hls"],"Probe, ladder, package."],[["cdn","play"],"Manifest + segments via CDN."],[["cdn"],"Viral: shield origin, more PoPs."]]),"hld:dropbox":a("split","Blocks vs metadata",[["file","File","client"],["hash","Chunk hash","worker"],["s3","Block store","store"],["tree","Tree / rev","store"],["cas","CAS commit","policy"],["note","Device notify","queue"]],[["file","hash"],["hash","s3","missing only"],["tree","cas"],["cas","note"]],"Bytes are content-addressed chunks. The tree is a CAS revision. Sync is the journal, not S3 listings.",[[["file","hash","s3"],"Hash chunks. Upload misses only."],[["tree","cas"],"Commit if parent rev still matches."],[["note"],"Other devices pull the new rev."],[["cas"],"Same parent twice → conflict copy."]],{lanes:[{id:"b",label:"Blocks",nodes:["file","hash","s3"]},{id:"m",label:"Metadata",nodes:["tree","cas","note"]}]}),"hld:unique-id-generator":a("split","Snowflake vs tickets",[["ts","41-bit ms","cell"],["wk","10-bit worker","policy"],["seq","12-bit seq","cell"],["sql","Ticket table","store"],["rng","[lo, hi)","cache"],["mint","Next id","service"]],[["ts","wk"],["wk","seq"],["sql","rng"],["rng","mint"]],"Snowflake: time + worker + seq, no hot path RPC. Tickets: cache a range from SQL.",[[["ts","wk","seq"],"64 bits. Clock + lease + seq."],[["wk"],"Worker id from lease. Fence pauses."],[["sql","rng","mint"],"Leaf: bump high-water, mint local."]],{lanes:[{id:"s",label:"Snowflake",nodes:["ts","wk","seq"]},{id:"t",label:"Ticket range",nodes:["sql","rng","mint"]}]}),"hld:cap-theorem":a("cut","Partition, then pick",[["a","Replica A","store"],["b","Replica B","store"],["cp","CP refuse","policy"],["ap","AP accept","policy"]],[["a","b","partition","cut"],["a","cp"],["b","ap"]],"Cable gone. Fail closed (CP) or take the write and repair (AP).",[[["a","b"],"Healthy: both talk."],[["a","b"],"P is forced. The link is gone."],[["cp"],"Money, alias, seat — error."],[["ap"],"Likes, ticks — accept, merge later."]]),"hld:consistent-hashing":a("ring","Walk the ring",[["s1","S1","store",50,12],["s2","S2","store",88,50],["s3","S3","store",50,88],["s4","S4","store",12,50],["k1","kA","cell",70,22],["k2","kB","cell",78,70]],[["k1","s2","clock"],["k2","s3","clock"]],"Hash nodes and keys onto a circle. Clockwise owner. Add a node — only the nearby arc moves.",[[["s1","s2","s3","s4"],"Nodes (and vnodes) on the ring."],[["k1","s2"],"kA walks clockwise → S2."],[["k2","s3"],"kB → S3."],[["s2"],"S2 dies. Its arc goes to the next node, not everyone."]]),"hld:load-balancers":a("compare","L4 packets vs L7 requests",[["c4","TCP flow","client"],["l4","L4 VIP","edge"],["a4","App","service"],["c7","HTTP","client"],["l7","L7 VIP","edge"],["a7","/video fleet","service"]],[["c4","l4","5-tuple"],["l4","a4"],["c7","l7","path"],["l7","a7"]],"L4 sprays connections. L7 reads host/path, canaries, health on a real URL.",[[["c4","l4","a4"],"L4: 5-tuple → backend. TLS can pass through."],[["c7","l7","a7"],"L7: route /video, drain, least-request."]],{lanes:[{id:"l4",label:"L4",nodes:["c4","l4","a4"]},{id:"l7",label:"L7",nodes:["c7","l7","a7"]}]}),"hld:cache-patterns":a("flow","Aside, then one miss",[["app","App","service"],["c","Cache","cache"],["db","DB","store"],["lock","Single-flight","policy"]],[["app","c","get"],["c","db","miss"],["db","c","fill"],["lock","db","one flyer"]],"Cache-aside: app get/fill. Delete on write. One lock so expiry is not a stampede.",[[["app","c"],"Hit — return."],[["app","db","c"],"Miss — DB, fill, TTL."],[["lock"],"Herd: one walk to DB."]]),"hld:sharding":a("buckets","Key → shard",[["k","user_id","client"],["h","hash % N","service"],["s0","Shard 0","store"],["s1","Shard 1","store"],["s2","Shard 2","store"]],[["k","h"],["h","s1","slot 1"]],"Range, hash, or directory. A hot key stays hot — it does not split itself.",[[["k","h"],"Pick the shard key."],[["s0","s1","s2"],"Each shard is its own primary."],[["s1"],"This user always hits shard 1."],[["s2"],"Celebrity / time-range: split or isolate the whale."]]),"hld:kafka-sqs-rabbit":a("compare","Log vs hide vs bind",[["kp","Produce","client"],["part","P0 P1 P2","queue"],["off","Offset","store"],["sq","SQS","queue"],["vis","Visibility","policy"],["dlq","DLQ","queue"],["ex","Exchange","service"],["rq","Bound q","queue"]],[["kp","part","key"],["part","off"],["sq","vis"],["vis","dlq"],["ex","rq","bind"]],"Kafka: partition log + offset, replay. SQS: hide, then DLQ. Rabbit: exchange → queue.",[[["kp","part","off"],"Kafka: one owner per partition. Rewind offset."],[["sq","vis","dlq"],"SQS: visibility timeout; crash → reappear."],[["ex","rq"],"Rabbit: route, then compete on the queue."]],{lanes:[{id:"k",label:"Kafka",nodes:["kp","part","off"]},{id:"s",label:"SQS",nodes:["sq","vis","dlq"]},{id:"r",label:"Rabbit",nodes:["ex","rq"]}]}),"hld:queues-pubsub-streams":a("compare","Three async shapes",[["q","Queue","queue"],["qw","One worker","worker"],["pub","Pub/sub","service"],["s1","Sub A","worker"],["s2","Sub B","worker"],["st","Stream","store"],["r","Replay","client"]],[["q","qw","compete"],["pub","s1","fan-out"],["pub","s2"],["st","r","offset"]],"Queue: one worker wins. Pub/sub: every sub fires. Stream: log + offset, rewind.",[[["q","qw"],"Queue — compete."],[["pub","s1","s2"],"Pub/sub — both fire."],[["st","r"],"Stream — read offset 42 again."]],{lanes:[{id:"a",label:"Queue",nodes:["q","qw"]},{id:"b",label:"Pub/sub",nodes:["pub","s1","s2"]},{id:"c",label:"Stream",nodes:["st","r"]}]}),"hld:replication":a("split","Primary, then replicas",[["w","Write","client"],["p","Primary","store"],["r1","Replica","store"],["r2","Replica","store"],["rd","Read","client"]],[["w","p"],["p","r1","sync or async"],["p","r2"],["rd","r1"]],"Writes land on a primary. Replicas follow. Sync = safer, slower. Async = faster, stale reads.",[[["w","p"],"Write on primary."],[["p","r1","r2"],"Ship the log."],[["rd","r1"],"Reads may be stale if async."]],{lanes:[{id:"wr",label:"Write",nodes:["w","p"]},{id:"rep",label:"Replicate",nodes:["r1","r2"]},{id:"rd",label:"Read",nodes:["rd"]}]}),"hld:sql-vs-nosql":a("compare","Access pattern picks the store",[["sql","SQL","store"],["rel","Joins, txns","service"],["no","NoSQL / KV","store"],["kv","Key + scan","cache"]],[["sql","rel"],["no","kv"]],"SQL when you need relations and transactions. KV when the key is the query.",[[["sql","rel"],"Checkout, ledger, unique alias — SQL."],[["no","kv"],"Session, cache, wide fan-out — KV."]],{lanes:[{id:"s",label:"SQL",nodes:["sql","rel"]},{id:"n",label:"NoSQL",nodes:["no","kv"]}]}),"hld:monolith-vs-microservices":a("compare","One deploy vs many",[["mono","Modular monolith","service"],["db","One DB","store"],["m1","Orders","service"],["m2","Billing","service"],["q","Events","queue"]],[["mono","db"],["m1","q"],["q","m2"]],"Start modular in one process. Split when a team or scale axis forces a network boundary.",[[["mono","db"],"One deploy, in-process calls."],[["m1","q","m2"],"Split: async events, separate fail."]]),"lld:parking-lot":a("tree","Lot owns floors owns spots",[["lot","ParkingLot","class",50,12],["f1","Floor 1","class",28,40],["f2","Floor 2","class",72,40],["s1","Spot A","cell",16,68],["s2","Spot B","cell",40,68],["s3","Spot C","cell",72,68],["t","Ticket","store",28,92],["fee","FeePolicy","iface",72,92]],[["lot","f1"],["lot","f2"],["f1","s1"],["f1","s2"],["f2","s3"],["s1","t","occupy"],["t","fee","quote"]],"Aggregate is the lot. occupy() is the invariant. Fees are a strategy, not a switch in unpark.",[[["lot","f1","f2"],"Lot → floors → spots."],[["s1","t"],"find + occupy atomically → ticket."],[["fee"],"Weekend rate = new FeePolicy. park() stays."]]),"lld:elevator":a("shaft","Car, floors, request queue",[["f5","5","cell"],["f4","4","cell"],["f3","3 car","actor"],["f2","2","cell"],["f1","1","cell"],["q","5↑  8  2↓","queue"],["idle","Idle","state"],["move","Moving","state"],["open","Door","state"]],[["idle","move"],["move","open"],["open","idle"]],"Each car is a state machine. A scheduler (strategy) assigns hall calls. SCAN is not hardcoded in the car.",[[["f3","q"],"Car at 3. Queue: 5↑, 8, 2↓."],[["move","f5"],"Moving up toward 5."],[["open"],"Arrive, door, clear stop, recompute direction."]]),"lld:strategy-pattern":a("classes","Swap the algorithm",[["ctx","Checkout","class"],["pol","Payment","iface"],["a","Card","policy"],["b","UPI","policy"]],[["ctx","pol","charge()"],["a","pol","implements"],["b","pol","implements"]],"Context holds an interface. Card and UPI are two classes. No switch in checkout.",[[["ctx","pol"],"Checkout calls payment.charge."],[["a"],"Card is one brain."],[["b"],"UPI is another. Add Wallet the same way."]]),"lld:observer-pattern":a("fanout","Subject notifies listeners",[["sub","Subject / ticker","class"],["ch","Chart","actor"],["al","Alert","actor"],["log","Log","actor"]],[["sub","ch","notify"],["sub","al","notify"],["sub","log","notify"]],"State changes once. Chart, Alert, Log each react. Subscribe/unsubscribe without editing Subject.",[[["sub"],"Price updates."],[["ch","al","log"],"Each observer gets the event."]]),"lld:singleton-pattern":a("decision","One instance — usually a smell",[["new","new Logger()","cut"],["get","Logger.get()","policy"],["one","Shared instance","store"]],[["new","one","many copies"],["get","one","one copy"]],"Hide the constructor. Everyone gets the same object. Hard to test — prefer DI unless it is a real process singleton.",[[["new"],"Three news → three loggers. Lost lines."],[["get","one"],"get() always returns the same."]]),"lld:factory-method":a("classes","Creator defers the class",[["c","Factory","iface"],["a","CarFactory","class"],["b","BikeFactory","class"],["p","Vehicle","iface"]],[["a","c"],["b","c"],["a","p","create()"]],"Caller asks a factory for a Vehicle. New vehicle type = new factory, not a growing switch.",[[["c","p"],"Interface in, product out."],[["a","b"],"Two creators. Add TruckFactory later."]]),"lld:decorator-pattern":a("layers","Wrap, do not subclass",[["core","Stream","iface"],["buf","Buffered","class"],["zip","Gzip","class"],["app","Caller","actor"]],[["app","zip"],["zip","buf"],["buf","core"]],"Same interface at every layer. Add behavior by wrapping, not by a subclass explosion.",[[["app","zip"],"Caller talks to GzipStream."],[["zip","buf","core"],"Each wrapper forwards."]]),"lld:state-pattern":a("states","The object changes kind",[["idle","Idle","state"],["move","Moving","state"],["open","Open","state"],["ctx","Car","class"]],[["idle","move","hall call"],["move","open","arrive"],["open","idle","close"],["ctx","idle","holds"]],"State objects implement the same events. The car delegates. Adding Maintenance is a new class.",[[["idle"],"Idle ignores car-calls except to start."],[["move"],"Moving queues stops."],[["open"],"Open starts a door timer."]]),"lld:splitwise":a("classes","Ledger, then balances",[["exp","Expense","class"],["sp","Split","class"],["led","Ledger","service"],["bal","Balances","store"],["sim","Simplify","policy"]],[["exp","sp","sums to total"],["led","exp","append"],["led","bal","project"],["sim","bal","optional"]],"Store expenses. Balances are a projection. Simplify is a graph algorithm, not a cell mutate.",[[["exp","sp"],"Splits must sum to the total."],[["led","bal"],"apply() then recompute."],[["sim"],"Min-cash-flow is a later policy."]]),"lld:producer-consumer":a("flow","Bounded buffer",[["p","Producer","actor"],["q","Blocking queue","queue"],["c","Consumer","worker"]],[["p","q","put"],["q","c","take"]],"Queue capacity is the backpressure. Full → producer waits. Empty → consumer waits.",[[["p","q"],"put blocks if full."],[["q","c"],"take blocks if empty."]]),"lld:hexagonal-architecture":a("layers","Domain in the middle",[["ui","HTTP / UI","edge"],["app","Use case","service"],["dom","Domain","class"],["db","SQL adapter","store"],["pay","Pay adapter","policy"]],[["ui","app"],["app","dom"],["app","db"],["app","pay"]],"Domain does not import SQL. Adapters implement ports. Tests fake the ports.",[[["dom"],"Invariants live here."],[["app","db","pay"],"Ports point out."]]),"lld:solid-ocp":a("classes","Closed to edits, open to types",[["svc","ParkService","class"],["fee","FeePolicy","iface"],["h","Hourly","policy"],["w","Weekend","policy"]],[["svc","fee"],["h","fee"],["w","fee"]],"Adding weekend rates must not rewrite unpark(). New class, same interface.",[[["svc","fee"],"Service already talks to a policy."],[["w"],"New variant = new class."]])};function o(e){let t=0x811c9dc5;for(let a=0;a<e.length;a++)t^=e.charCodeAt(a),t=Math.imul(t,0x1000193);return t>>>0}function n(e,t=22){let a=e.replace(/\s+/g," ").trim();return a.length<=t?a:`${a.slice(0,t-1).replace(/\s+\S*$/,"")}…`}function i(e,t){return t[o(e)%t.length]}let r=["flow","split","fanout","fanin","layers","compare","decision","cycle","buckets","mesh","timeline","cut"],l=["classes","sequence","states","tree","layers","compare","decision","fanout","cycle"];function c(e,t){let a=["client","service","cache","store","queue","worker","policy","edge"];return"classes"===e?["class","iface","policy","class"][t%4]:"states"===e?"state":"bits"===e?"bit":a[t%a.length]}function h(e){let t,s=(t=`${e.slug} ${e.title} ${e.category}`.toLowerCase(),/cap|partition|split-brain|pacelc/.test(t)?"cut":/hash|ring|consistent/.test(t)?"ring":/kafka|queue|pubsub|stream|fan-out|fanout|notif/.test(t)?"fanout":/load.balanc|gateway|anycast/.test(t)?"fanin":/shard|bucket|partition|index/.test(t)?"buckets":/vs |versus|sql|mono|acid|oltp/.test(t)?"compare":/circuit|limit|retry|hedg|fallback/.test(t)?"decision":/saga|outbox|cdc|deploy|canary/.test(t)?"cycle":/layer|mesh|cdn|encrypt|privilege/.test(t)?"layers":/repl|primary|multi-az|active/.test(t)?"split":/method|estimate|slo|percent/.test(t)?"timeline":i(e.slug,r)),o=(function(e,t=4){let a=e.howItWorks.map(e=>n(e,18));return a.length>=t?a.slice(0,t):[...a,...e.title.split(/[:/,—-]/).map(e=>n(e,16)).filter(Boolean),e.slug].slice(0,t)})(e,5).map((e,t)=>[String(t),e,c(s,t)]),l=o.slice(1).map((t,a)=>[String(a),String(a+1),n(e.howItWorks[a]??"",14)]),h=o.map((t,a)=>[[t[0]],e.howItWorks[a]??t[1]]);return a(s,e.title,o,l,n(e.summary,140),h.length?h:[[["0"],e.summary]])}var d=e.i(71645);function u(e,t=!1){return e?"border-accent bg-accent text-paper":t?"border-line bg-white text-fog opacity-40":"border-line bg-white text-ink"}function p(e){return"iface"===e||"cache"===e?"border-dashed":"state"===e?"rounded-full":"store"===e||"class"===e?"rounded-lg":"queue"===e?"rounded-full":"bit"===e||"cell"===e?"rounded-xl":"rounded-2xl"}function m({node:e,active:a,dim:s,tag:o}){return(0,t.jsxs)("div",{className:`min-w-14 px-3 py-2 text-center text-sm font-medium transition-all duration-500 ${p(e.role)} border ${u(a,s)}`,children:[e.label,o?(0,t.jsx)("div",{className:"text-[10px] font-normal opacity-80",children:o}):null]})}function f({title:e,playing:a,onToggle:s,children:o,note:n}){return(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"mb-4 flex items-center justify-between gap-3",children:[(0,t.jsx)("p",{className:"eyebrow",children:e}),(0,t.jsx)("button",{type:"button",onClick:s,className:"rounded-full bg-accent px-3 py-1 text-xs font-medium text-white",children:a?"Pause":"Play"})]}),o,(0,t.jsx)("p",{className:"mt-4 text-center text-sm leading-6 text-ink-soft",children:n})]})}function g({diagram:e,highlight:a,tags:s}){let o=(e.cells??e.nodes.filter(e=>"cell"===e.role||"bit"===e.role)).map(e=>({id:e.id,value:"value"in e?e.value:e.label})),n="window"===e.kind,i=o.map(e=>e.id),r=i.filter(e=>a.has(e)),l=r.length?Math.min(...r.map(e=>i.indexOf(e))):-1,c=r.length?Math.max(...r.map(e=>i.indexOf(e))):-1,h=Object.entries(s??{}).find(([,e])=>"L"===e)?.[0],d=Object.entries(s??{}).find(([,e])=>"R"===e)?.[0],m=o.find(e=>e.id===h)?.value,f=o.find(e=>e.id===d)?.value,w="pointers"===e.kind&&m&&f;return(0,t.jsxs)("div",{children:["pointers"===e.kind||n?(0,t.jsxs)("div",{className:"mb-4 flex flex-wrap justify-center gap-3 text-xs text-slate",children:[(0,t.jsx)("span",{className:"rounded-full bg-accent px-2 py-0.5 text-white",children:"Looking now"}),(0,t.jsx)("span",{className:"rounded-full border border-line px-2 py-0.5",children:"Ignored this step"}),"pointers"===e.kind?(0,t.jsx)("span",{children:"L = left finger · R = right finger"}):(0,t.jsx)("span",{children:"Blue bar = the window"})]}):null,(0,t.jsx)("div",{className:"flex flex-wrap items-end justify-center gap-2",children:o.map((o,i)=>{let r=n?i>=l&&i<=c&&l>=0:a.has(o.id),h=s?.[o.id]??"",d="bars"===e.kind?18+14*(Number(o.value)||i+1):void 0;return"bars"===e.kind?(0,t.jsxs)("div",{className:"flex flex-col items-center gap-2",children:[(0,t.jsx)("div",{className:`w-10 rounded-t-lg transition-all duration-500 ${r?"bg-accent":"bg-sky-mid"}`,style:{height:d}}),(0,t.jsx)("span",{className:"text-sm font-medium",children:o.value})]},o.id):(0,t.jsxs)("div",{className:"flex w-16 flex-col items-center gap-1",children:[h?(0,t.jsx)("span",{className:"rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold text-white",children:h}):(0,t.jsx)("span",{className:"h-5"}),(0,t.jsx)("div",{className:`flex h-16 w-16 flex-col items-center justify-center border text-lg font-semibold transition-all duration-500 ${p("cell")} ${u(r,(!!n||"pointers"===e.kind)&&!r)}`,children:o.value}),(0,t.jsx)("span",{className:"text-[10px] text-fog",children:i})]},o.id)})}),w?(0,t.jsxs)("p",{className:"mt-4 text-center font-serif text-xl text-ink",children:[m," + ",f," = ",Number(m)+Number(f)]}):null]})}function w({nodes:e,highlight:a,cut:s}){return(0,t.jsx)("div",{className:"flex flex-wrap items-center justify-center gap-2",children:e.map((o,n)=>(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(m,{node:o,active:a.has(o.id)}),n<e.length-1?(0,t.jsx)("span",{className:`text-sm ${s?"text-ink line-through":"text-fog"}`,children:s?"⟂":"→"}):null]},o.id))})}function y({diagram:e,highlight:a}){let s=e.nodes.map((t,a)=>{if(null!=t.x&&null!=t.y)return t;let s=a/Math.max(e.nodes.length,1)*Math.PI*2-Math.PI/2;return{...t,x:50+36*Math.cos(s),y:50+36*Math.sin(s)}}),o=new Map(s.map(e=>[e.id,e]));return(0,t.jsxs)("svg",{viewBox:"0 0 100 100",className:"mx-auto h-56 w-full max-w-md",children:["ring"===e.kind?(0,t.jsx)("circle",{cx:"50",cy:"50",r:"36",fill:"none",stroke:"#c8c4bc",strokeWidth:"1.2",strokeDasharray:"3 3"}):null,e.edges.map(e=>{let s=o.get(e.from),n=o.get(e.to);if(!s||!n||null==s.x||null==n.x||null==s.y||null==n.y)return null;let i="cut"===e.style,r=a.has(e.from)&&a.has(e.to);return(0,t.jsxs)("g",{children:[(0,t.jsx)("line",{x1:s.x,y1:s.y,x2:n.x,y2:n.y,stroke:i?"#1c1c1c":r?"#2a2a2a":"#d4d4d8",strokeWidth:i?2:1.4,strokeDasharray:i||"dashed"===e.style?"3 2":void 0}),e.label?(0,t.jsx)("text",{x:(s.x+n.x)/2,y:(s.y+n.y)/2-2,textAnchor:"middle",fontSize:"3.4",fill:"#1c1c1c",children:e.label}):null]},`${e.from}-${e.to}`)}),s.map(e=>{let s=a.has(e.id);return(0,t.jsxs)("g",{children:[(0,t.jsx)("circle",{cx:e.x,cy:e.y,r:s?8:6.4,fill:s?"#2a2a2a":"#f3f1eb",stroke:"#2a2a2a",strokeWidth:"1.2"}),(0,t.jsx)("text",{x:e.x,y:(e.y??0)+1.4,textAnchor:"middle",fontSize:"3.6",fill:s?"#fff":"#000",children:e.label})]},e.id)})]})}function b({diagram:e,highlight:a}){let s=new Map(e.nodes.map(e=>[e.id,e]));return(0,t.jsx)("div",{className:`grid gap-4 ${"compare"===e.kind||(e.lanes?.length??0)>1?"md:grid-cols-2":""}`,children:(e.lanes??[]).map(e=>(0,t.jsxs)("div",{className:"rounded-2xl border border-line bg-sky-wash/50 p-3",children:[(0,t.jsx)("p",{className:"mb-2 text-center text-[11px] font-medium uppercase tracking-wide text-accent-deep",children:e.label}),(0,t.jsx)("div",{className:"flex flex-wrap items-center justify-center gap-2",children:e.nodes.map((o,n)=>{let i=s.get(o);return i?(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(m,{node:i,active:a.has(o)}),n<e.nodes.length-1?(0,t.jsx)("span",{className:"text-fog",children:"→"}):null]},o):null})})]},e.id))})}function k({diagram:e,highlight:a}){let s=new Map(e.nodes.map(e=>[e.id,e]));return(0,t.jsx)("div",{className:"space-y-2",children:(e.lanes??[]).map(e=>(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[e.label?(0,t.jsx)("span",{className:"w-14 shrink-0 text-right text-[11px] text-slate",children:e.label}):null,(0,t.jsx)("div",{className:"flex flex-wrap gap-1.5",children:e.nodes.map(e=>{let o=s.get(e);return o?(0,t.jsx)("div",{className:`flex h-10 w-10 items-center justify-center rounded-lg border text-xs font-medium transition-all duration-500 ${u(a.has(e))}`,children:o.label},e):null})})]},e.id))})}function v({nodes:e,highlight:a}){return(0,t.jsx)("div",{className:"mx-auto flex w-36 flex-col-reverse gap-1.5",children:e.map(e=>(0,t.jsx)(m,{node:e,active:a.has(e.id)},e.id))})}function x({diagram:e,highlight:a}){return(0,t.jsx)("div",{className:"flex flex-wrap items-center justify-center gap-1",children:e.nodes.map((s,o)=>(0,t.jsxs)("div",{className:"flex items-center gap-1",children:[(0,t.jsx)(m,{node:s,active:a.has(s.id)}),o<e.nodes.length-1?(0,t.jsx)("span",{className:"text-accent-deep",children:"→"}):(0,t.jsx)("span",{className:"text-fog",children:"✕"})]},s.id))})}function A({diagram:e,highlight:a}){let s=e.nodes.filter(e=>"cell"===e.role||"actor"===e.role),o=e.nodes.filter(e=>"queue"===e.role||"state"===e.role);return(0,t.jsxs)("div",{className:"flex items-start justify-center gap-6",children:[(0,t.jsx)("div",{className:"flex flex-col gap-1",children:s.map(e=>(0,t.jsx)("div",{className:`flex h-10 w-28 items-center justify-center border text-sm font-medium ${u(a.has(e.id))} ${"actor"===e.role?"rounded-xl bg-sky-wash":"rounded-md"}`,children:e.label},e.id))}),(0,t.jsx)("div",{className:"flex flex-col gap-2",children:o.map(e=>(0,t.jsx)(m,{node:e,active:a.has(e.id)},e.id))})]})}function S({nodes:e,highlight:a}){return(0,t.jsx)("div",{className:"mx-auto flex max-w-sm flex-col gap-2",children:e.map(e=>(0,t.jsx)("div",{className:`px-4 py-3 text-center text-sm font-medium transition-all duration-500 rounded-2xl border ${u(a.has(e.id))}`,children:e.label},e.id))})}function T({diagram:e}){let a,s=e.frames.length?e.frames:[{highlight:e.nodes[0]?[e.nodes[0].id]:[],note:e.caption}],{index:o,playing:n,toggle:i}=function(e,t=1600){let[a,s]=(0,d.useState)(0),[o,n]=(0,d.useState)(!0);return(0,d.useEffect)(()=>{if(!o||e<=1)return;let a=window.setInterval(()=>{s(t=>(t+1)%e)},t);return()=>window.clearInterval(a)},[o,e,t]),{index:a,playing:o,setIndex:s,toggle:()=>n(e=>!e)}}(s.length,1700),r=s[o],l=new Set(r.highlight),c=e.kind;if("array"===c||"window"===c||"pointers"===c||"bars"===c)a=(0,t.jsx)(g,{diagram:e,highlight:l,tags:r.tags});else if("dp-table"===c)a=(0,t.jsx)(k,{diagram:e,highlight:l});else if("graph"===c||"ring"===c||"mesh"===c||"trie"===c||"heap"===c||"tree"===c||"rec-tree"===c||"union-find"===c)a=(0,t.jsx)(y,{diagram:e,highlight:l});else if("list"===c)a=(0,t.jsx)(x,{diagram:e,highlight:l});else if("stack"===c)a=(0,t.jsx)(v,{nodes:e.nodes,highlight:l});else if("queue"===c)a=(0,t.jsx)(w,{nodes:e.nodes,highlight:l});else if("shaft"===c)a=(0,t.jsx)(A,{diagram:e,highlight:l});else if("layers"===c)a=(0,t.jsx)(S,{nodes:e.nodes,highlight:l});else if("bits"===c)a=(0,t.jsx)("div",{className:"flex justify-center gap-1",children:e.nodes.map(e=>(0,t.jsx)("div",{className:`flex h-12 w-12 items-center justify-center rounded-lg border font-mono text-lg ${u(l.has(e.id))}`,children:e.label},e.id))});else if("cut"===c)a=(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsx)(w,{nodes:e.nodes.filter(e=>"store"===e.role||"client"===e.role),highlight:l,cut:!0}),(0,t.jsx)("div",{className:"text-center text-xs font-medium uppercase tracking-wide text-accent-deep",children:"partition"}),(0,t.jsx)("div",{className:"flex flex-wrap justify-center gap-3",children:e.nodes.filter(e=>"policy"===e.role).map(e=>(0,t.jsx)(m,{node:e,active:l.has(e.id)},e.id))})]});else if("split"===c||"compare"===c||e.lanes?.length)a=(0,t.jsx)(b,{diagram:e,highlight:l});else if("fanout"===c||"fanin"===c){let s=e.nodes[0],o=e.nodes.slice(1);a=(0,t.jsxs)("div",{className:"flex flex-col items-center gap-3",children:[s?(0,t.jsx)(m,{node:s,active:l.has(s.id)}):null,(0,t.jsx)("span",{className:"text-fog",children:"fanout"===c?"↓ fan-out":"↑ fan-in"}),(0,t.jsx)("div",{className:"flex flex-wrap justify-center gap-2",children:o.map(e=>(0,t.jsx)(m,{node:e,active:l.has(e.id)},e.id))})]})}else a="classes"===c||"sequence"===c||"states"===c||"decision"===c||"cycle"===c||"timeline"===c||"buckets"===c?(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsx)(w,{nodes:e.nodes,highlight:l}),e.edges[0]?.label?(0,t.jsx)("p",{className:"text-center text-xs text-slate",children:e.edges.map(e=>e.label).filter(Boolean).join(" · ")}):null]}):(0,t.jsx)(w,{nodes:e.nodes,highlight:l});return(0,t.jsx)(f,{title:e.title,playing:n,onToggle:i,note:r.note||e.caption,children:a})}e.s(["TopicVisual",0,function({topic:e}){let r=function(e){let t=s[`${e.track}:${e.slug}`]??s[e.slug];if(t)return t;if("dsa"===e.track)return function(e){let t,s=(t=`${e.slug} ${e.category}`.toLowerCase(),/union-find|kruskal/.test(t)?"union-find":/trie|suffix/.test(t)?"trie":/heap|huffman|top-k|median/.test(t)?"heap":/dijkstra|bellman|floyd|bfs|dfs|topo|graph|island|bipartite|scc|bridge|euler|a-star|prim/.test(t)?"graph":/knapsack|lcs|edit|grid-dp|matrix-chain|palindrome-dp|interval-dp|bitmask-dp|tree-dp|digit-dp|burst/.test(t)?"dp-table":/coin-change|fibonacci|climbing|house-robber|lis|kadane|prefix/.test(t)?"array":/window/.test(t)?"window":/pointer|two-sum/.test(t)?"pointers":/sort|dutch|rotate/.test(t)?"bars":/list|floyd-cycle|lru/.test(t)?"list":/stack|parenthes|histogram/.test(t)?"stack":/queue|deque/.test(t)?"queue":/bit|xor|kernighan|mask/.test(t)?"bits":/recur|subset|permut|combin|queen|sudoku|parenthes|divide/.test(t)?"rec-tree":/tree|lca|bst|serialize|invert|path-sum|segment|fenwick|sparse/.test(t)?"tree":/hash|anagram|consecutive|design-hash/.test(t)?"buckets":/search|sieve|gcd|mod|catalan|factor/.test(t)||/kmp|rabin|z-alg|manacher|string/.test(t)?"array":i(e.slug,["array","flow","decision","timeline"])),r=function(e,t=1){let a=o(e)||1,s=[],n=t+a%6;for(let e=0;e<6;e++)s.push(n),n+=1+(a=Math.imul(a,0x41c64e6d)+12345>>>0)%4;return s}(e.slug),l=e.howItWorks.slice(0,4).map((e,t)=>[[String(t%6),String((t+1)%6)],e,{[String(t%6)]:"i"}]);if("array"===s||"window"===s||"pointers"===s||"bars"===s)return a(s,e.title,[],[],n(e.summary,140),l,{cells:r.map((e,t)=>({id:String(t),value:String(e)}))});if("bits"===s){let t=r.map(e=>(e%2).toString()).map((e,t)=>[String(t),e,"bit"]);return a("bits",e.title,t,[],n(e.summary,140),l)}if("dp-table"===s){let t=[],s=[];for(let a=0;a<3;a++){let o=[];for(let e=0;e<4;e++){let s=`${a}-${e}`;o.push(s),t.push([s,String((r[e]+a)%9),"cell"])}s.push({id:`r${a}`,label:`${n(e.slug,8)} r${a}`,nodes:o})}return a("dp-table",e.title,t,[],n(e.summary,140),l,{layout:"grid",lanes:s})}if("graph"===s||"mesh"===s||"trie"===s||"heap"===s||"tree"===s||"rec-tree"===s||"union-find"===s){let t=["A","B","C","D","E"].map((e,t)=>`${e}${r[t]%10}`),o=[[50,14],[22,42],[78,42],[22,78],[78,78]],i=t.map((e,t)=>[String(t),e,0===t?"actor":"cell",o[t][0],o[t][1]]),c=[["0","1",n(e.howItWorks[0]??"",10)],["0","2"],["1","3"],["2","4"]];return a(s,e.title,i,c,n(e.summary,140),l)}if("list"===s){let t=r.slice(0,4).map((e,t)=>[String(t),String(e),"cell"]),s=t.slice(1).map((e,t)=>[String(t),String(t+1),"next"]);return a("list",e.title,t,s,n(e.summary,140),l)}if("stack"===s||"queue"===s){let t=r.slice(0,3).map((e,t)=>[String(t),String(e),"cell"]);return a(s,e.title,t,[],n(e.summary,140),l)}if("buckets"===s){let t=[["k",n(e.title,12),"client"],["h","hash","service"],...r.slice(0,3).map((e,t)=>[String(t),`b${e%5}`,"store"])];return a("buckets",e.title,t,[["k","h"],["h","0"]],n(e.summary,140),l)}return h(e)}(e);if("lld"===e.track){let t,s,o,r,h;return t=`${e.slug} ${e.title} ${e.category}`.toLowerCase(),s=/state|elevator|vending|traffic|atm/.test(t)?"states":/sequence|signatur|use-case/.test(t)?"sequence":/observer|pub.sub|event.bus|notif/.test(t)?"fanout":/strategy|factory|adapter|decorator|proxy|bridge|visitor|command/.test(t)?"classes":/hexagon|layer|clean|mvc|dip/.test(t)?"layers":/parking|hotel|library|composite|aggregate/.test(t)?"tree":/producer|queue|pool|buffer/.test(t)?"flow":/solid|dry|kiss|yagni|vs /.test(t)?"compare":/singleton|fail.fast|invariant/.test(t)?"decision":i(e.slug,l),r=(o=[...new Set([e.title,...e.howItWorks,...e.whenToUse].map(e=>n(e,16)))].slice(0,5).map((e,t)=>{let a="states"===s?"state":"classes"===s&&1===t?"iface":c(s,t);return[String(t),e,a]})).slice(1).map((t,a)=>{let o="classes"===s&&0===a?"dashed":void 0;return[String(0),String(a+1),n(e.howItWorks[a]??"uses",12),o]}),h=o.map((t,a)=>[[t[0]],e.howItWorks[a]??`${e.title}: ${t[1]}`]),a(s,e.title,o,r,n(e.summary,140),h)}return h(e)}(e);return(0,t.jsx)("div",{className:"sky-card p-6",children:(0,t.jsx)(T,{diagram:r})})}],30901)}]);