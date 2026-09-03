import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "kadane",
    track: "dsa",
    category: "Arrays",
    title: "Kadane's Algorithm",
    summary:
      "Maximum subarray sum in one pass: at each index, either extend the previous run or start a new one at i. Track the global best. O(n), O(1) extra.",
    depth: "core",
    whyItMatters:
      "Maximum subarray is the first 'DP that looks like a loop' interview. Divide-and-conquer O(n log n) is the textbook alternative and a worse finish. Kadane is the expected linear solution. Follow-ups: return the indices, circular max (max of Kadane vs total-min-subarray), and max product (sign flips, two running values).",
    theory: [
      "Let bestEndingHere be the max sum of a subarray that ends at i. Then bestEndingHere = max(A[i], bestEndingHere+A[i]). The global answer is the max of those. You discard a negative prefix because it cannot help a future ending. All-negative arrays: the answer is the largest (least negative) element — the max(A[i], …) branch starts fresh.",
      "This is 1-D DP with O(1) roll. Divide-and-conquer (max of left, right, and crossing mid) is O(n log n) and useful only as a D&C exercise or when you also need other mid-crossing stats.",
      "Circular: the max is either a normal (non-wrapping) Kadane or wrapping = total - minSubarray. Handle the 'all negative' case so you do not return 0 from an empty wrap. Product: keep maxProd and minProd because a negative times a min can become the new max.",
    ],
    howItWorks: [
      "cur = ans = A[0]. for i=1..n-1: cur = max(A[i], cur+A[i]); ans = max(ans, cur).",
      "To recover indices: when you start fresh at i, set start=i; when you beat ans, record [start,i].",
      "Circular: if every A[i]<0 return max(A); else max(kadane, sum-minKadane).",
    ],
    whenToUse: [
      "Maximum (or minimum) contiguous sum; circular variant; warmup for max product.",
    ],
    whenNotToUse: [
      "Non-contiguous — house robber / subset. Empty subarray allowed as 0 — then floor cur at 0 (the other Kadane convention).",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1)",
    },
    interviewTips: [
      "Ask if an empty subarray is allowed (then ans starts at 0 and you can skip all-negative).",
      "If they want O(n log n), they want D&C; still mention Kadane.",
    ],
    pitfalls: [
      "Initializing ans to 0 and failing all-negative tests.",
      "Circular wrap returning 0 when the whole array is the min subarray.",
    ],
    practiceIdeas: [
      "Maximum Subarray; Maximum Sum Circular Subarray.",
      "Maximum Product Subarray.",
      "D&C max subarray and compare.",
    ],
    related: [
      "prefix-sum",
      "divide-and-conquer",
      "house-robber",
      "max-path-sum",
    ],
  },
  {
    slug: "prefix-sum",
    track: "dsa",
    category: "Arrays",
    title: "Prefix Sum",
    summary:
      "P[i] = A[0]+…+A[i-1]. Any range sum is P[r]-P[l] in O(1) after O(n) build. The first static range-query structure you should reach for.",
    depth: "core",
    whyItMatters:
      "Range-sum queries, equilibrium index, and 'subarray sum equals k' (with a map) all start with prefixes. If you re-sum a range in a loop per query you are O(nq). Interviewers use this as the gateway to 2-D prefixes, difference arrays (the inverse idea), and Fenwick/segment trees (the mutable upgrade).",
    theory: [
      "Define P[0]=0 so that every range [l,r) is P[r]-P[l] with no edge cases. Inclusive [l,r] is P[r+1]-P[l]. Off-by-one here is the entire bug class.",
      "Prefix XOR, prefix +1/−1 encodings, and prefix counts of a predicate are the same array with a different + . Weighted prefixes (i * A[i]) appear in 'sum of all subarray sums' identities.",
      "If A mutates, a static P is stale. Then you want a Fenwick or segment tree, or you rebuild if mutations are rare. Difference arrays are how you apply many range-adds then one prefix rebuild.",
    ],
    howItWorks: [
      "P = [0]; for x of A: P.push(P[P.length-1]+x).",
      "sum(l,r) exclusive-r: P[r]-P[l].",
      "For subarray-sum-k, walk P[j] and look up P[j]-k in a map of earlier prefixes.",
    ],
    whenToUse: [
      "Many range sums on a static array; identities that rewrite as prefix differences.",
    ],
    whenNotToUse: [
      "Frequent point updates — Fenwick / segment tree.",
      "Range min/max — prefixes do not invert min; use sparse table or a tree.",
    ],
    complexity: {
      time: "O(n) build, O(1) query",
      space: "O(n)",
    },
    interviewTips: [
      "Write P[0]=0 first. Then the formula cannot drift.",
      "Range Sum Query Immutable is this. Mutable is Fenwick.",
    ],
    pitfalls: [
      "P[r]-P[l-1] mixed with an exclusive convention.",
      "Overflow of sums; use a wider type.",
    ],
    practiceIdeas: [
      "Range Sum Query Immutable.",
      "Subarray Sum Equals K; Pivot Index.",
      "Sum of all subarray sums via prefixes.",
    ],
    related: [
      "prefix-hashmap",
      "prefix-2d",
      "difference-array",
      "fenwick",
    ],
  },
  {
    slug: "difference-array",
    track: "dsa",
    category: "Arrays",
    title: "Difference Array",
    summary:
      "The inverse of prefix sum. To add v on [l,r], do D[l]+=v and D[r+1]-=v. One prefix pass materializes the final array after many range updates.",
    depth: "next",
    whyItMatters:
      "When you have q range-adds and then need the whole array (or one prefix scan), a difference array is O(q+n) and beats q scans. Corporate-flight-bookings, car pooling, and 'apply range increments then query points' are the interviews. If you later need arbitrary range queries after mixed updates, step up to Fenwick.",
    theory: [
      "If A is the array, D[0]=A[0], D[i]=A[i]-A[i-1]. Then A is the prefix of D. A range add is two point updates on D. After all updates, prefix-scan D to recover A.",
      "This is exactly how you would lazily apply range updates if you only query at the end. It does not give you intermediate range sums efficiently unless you Fenwick the difference (which is a standard trick for range-add + point-query: Fenwick on D).",
      "2-D difference arrays exist (four corners ±v) and pair with 2-D prefixes. Rare in interviews, common in grid 'add on a rectangle' problems.",
    ],
    howItWorks: [
      "D = zeros(n+1). for each update [l,r,v]: D[l]+=v; D[r+1]-=v.",
      "cur=0; for i in 0..n-1: cur+=D[i]; A[i]+=cur (or A[i]=cur if you started from 0).",
      "Ignore D[n] after the last subtract.",
    ],
    whenToUse: [
      "Many range increments, then a single materialization or point reads after all updates.",
    ],
    whenNotToUse: [
      "Interleaved arbitrary range-sum queries — segment tree with lazy, or Fenwick on D plus extra for range sum.",
    ],
    complexity: {
      time: "O(n + q)",
      space: "O(n)",
    },
    interviewTips: [
      "Corporate Flight Bookings is this. Car Pooling is a sweep / difference on time.",
      "Say 'difference is inverse prefix' so they know you have the algebra.",
    ],
    pitfalls: [
      "D[r]-=v instead of D[r+1] (off-by-one on inclusive r).",
      "Array of size n not n+1, last decrement out of bounds.",
    ],
    practiceIdeas: [
      "Corporate Flight Bookings.",
      "Range addition then print the array.",
      "Car Pooling (capacity along a difference of trips).",
    ],
    related: [
      "prefix-sum",
      "prefix-2d",
      "fenwick",
      "meeting-rooms",
    ],
  },
  {
    slug: "prefix-2d",
    track: "dsa",
    category: "Arrays",
    title: "2-D Prefix Sums",
    summary:
      "P[r][c] = sum of the rectangle from (0,0) to (r,c) exclusive. Any submatrix sum is four corners: bottom-right − left − up + up-left.",
    depth: "next",
    whyItMatters:
      "Range Sum Query 2D (immutable) is the matrix version of prefix sums. Interviewers also hide it in 'number of submatrices that sum to target' (fix two rows, 1-D prefix-map on the compressed column sums). If you loop the four bounds you are O(n^4) or O(n^6). The inclusion-exclusion picture is the whole algorithm.",
    theory: [
      "Build: P[i][j] = A[i-1][j-1] + P[i-1][j] + P[i][j-1] - P[i-1][j-1]. The last term cancels the double-counted top-left. Query sum of [r1,c1]..[r2,c2] inclusive: P[r2+1][c2+1] - P[r1][c2+1] - P[r2+1][c1] + P[r1][c1].",
      "The same inclusion-exclusion works for XOR (where + and − are both XOR) and for counts of a predicate. Difference-2D (four-corner updates) is the inverse for rectangle adds.",
      "Mutable 2-D range sums need a 2-D Fenwick or a 2-D segment tree — heavier, rare unless they ask.",
    ],
    howItWorks: [
      "Allocate P (m+1)×(n+1) zeros. Fill with the recurrence above.",
      "Write a sum(r1,c1,r2,c2) helper using the four corners.",
      "For submatrices = target: for each pair of horizontal edges, collapse to 1-D and run prefix+map.",
    ],
    whenToUse: [
      "Many rectangle sums on a static matrix; submatrix-sum counting.",
    ],
    whenNotToUse: [
      "Single query — just loop the rectangle.",
      "Mutations — upgrade the structure.",
    ],
    complexity: {
      time: "O(mn) build, O(1) query",
      space: "O(mn)",
    },
    interviewTips: [
      "Draw a rectangle and shade the three regions you subtract/add. Then write the indices with +1 padding.",
    ],
    pitfalls: [
      "Forgetting the + top-left (double subtraction).",
      "Mixing inclusive cells with exclusive P without the +1 pad.",
    ],
    practiceIdeas: [
      "Range Sum Query 2D Immutable.",
      "Count Submatrices With Sum Target.",
      "Largest square of 1s can be DP, not this — contrast.",
    ],
    related: [
      "prefix-sum",
      "difference-array",
      "prefix-hashmap",
      "grid-dp",
    ],
  },
  {
    slug: "rotate-array",
    track: "dsa",
    category: "Arrays",
    title: "Rotate Array",
    summary:
      "Rotate right by k with three reversals: reverse all, reverse the first k, reverse the rest. O(n) time, O(1) extra. Know the extra-array version too.",
    depth: "core",
    whyItMatters:
      "Rotate is a favorite in-place array interview. The reversal trick is the one they want after you mention the extra buffer. Cycle-following (put A[i] into (i+k)%n, chase) is also O(1) extra and a bit more fiddly. Related: rotate image (layer swaps or transpose+reverse) and spiral are the 2-D cluster.",
    theory: [
      "Right rotate by k is k %= n. The three-reverse proof: reverse maps i to n-1-i; doing it on pieces moves the last k elements to the front in the right order. Left rotate is reverse(0,k-1), reverse(k,n-1), reverse all — or right rotate by n-k.",
      "The extra array B[(i+k)%n]=A[i] is obvious and O(n) space. Cycle method: gcd(k,n) cycles, each of length n/gcd. You save one temp per cycle.",
      "Do not rotate k times by one (O(nk)). Do not use splice in a loop in JS as your interview answer without mentioning cost.",
    ],
    howItWorks: [
      "k %= n. reverse(0,n-1); reverse(0,k-1); reverse(k,n-1).",
      "reverse(l,r): while l<r swap A[l++], A[r--].",
    ],
    whenToUse: [
      "In-place rotation of a 1-D array; building block for some in-place shuffles.",
    ],
    whenNotToUse: [
      "You may allocate — extra array is simpler and fine.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1) reversal or cycle; O(n) buffer",
    },
    interviewTips: [
      "Ask left vs right and whether k can exceed n (always k%=n, n=0 guard).",
      "Rotate Image: transpose then reverse each row (90° clockwise).",
    ],
    pitfalls: [
      "Forgetting k %= n.",
      "Reversing the wrong two pieces and rotating the opposite way.",
    ],
    practiceIdeas: [
      "Rotate Array; Rotate Image.",
      "Cycle-follow rotate and count gcd cycles.",
    ],
    related: [
      "spiral-matrix",
      "set-matrix-zeroes",
      "reverse-linked-list",
    ],
  },
  {
    slug: "spiral-matrix",
    track: "dsa",
    category: "Arrays",
    title: "Spiral Matrix",
    summary:
      "Walk right, down, left, up while shrinking the live rectangle, or simulate direction vectors and turn when the next cell is dead. Generate or read in spiral order.",
    depth: "core",
    whyItMatters:
      "Spiral Matrix I/II is a simulation interview: bounds, corners, and the last single row/column that should not be double-traversed. People who hard-code four loops drop the last row of an odd-sized matrix. A dirs array plus a 'turn when next is visited/out' is less error-prone once you have a seen matrix; the shrinking-box version uses O(1) extra.",
    theory: [
      "Shrinking box: top, bottom, left, right. Traverse top row left→right, top++. Right column top→bottom, right--. If top≤bottom, bottom row right→left, bottom--. If left≤right, left column bottom→top, left++. The ifs prevent revisiting the last midline.",
      "Direction simulation: start (0,0) facing right, dirs = [[0,1],[1,0],[0,-1],[-1,0]]. If the next cell is out of bounds or filled, d = (d+1)%4. Write n² values for generate (II).",
      "Layer index k owns the cycle at offset k. Useful when they ask for the k-th layer only.",
    ],
    howItWorks: [
      "Initialize the four bounds. While they are valid, do the four walks with the two if-guards.",
      "Or: fill/read n*m steps with direction turning.",
    ],
    whenToUse: [
      "Read or fill a matrix in spiral order.",
    ],
    whenNotToUse: [
      "Diagonal / zigzag (different direction sequence).",
    ],
    complexity: {
      time: "O(m n)",
      space: "O(1) extra besides the output",
    },
    interviewTips: [
      "Test 1×n, n×1, and 3×3 before you declare done.",
      "Spiral II is the same walk writing 1..n².",
    ],
    pitfalls: [
      "Double-counting the last row or column.",
      "Infinite loop if you forget to shrink a bound.",
    ],
    practiceIdeas: [
      "Spiral Matrix I and II.",
      "Spiral on a ragged list of lists (ask about shape).",
    ],
    related: [
      "rotate-array",
      "set-matrix-zeroes",
      "grid-dp",
    ],
  },
  {
    slug: "set-matrix-zeroes",
    track: "dsa",
    category: "Arrays",
    title: "Set Matrix Zeroes",
    summary:
      "If any cell is 0, its whole row and column become 0. Record the zeros first (sets, or the first row/column as markers) so you do not cascade.",
    depth: "core",
    whyItMatters:
      "This is the in-place matrix interview about extra memory. O(mn) copy is trivial. O(m+n) row/col boolean arrays is the clear solution. O(1) extra uses the first row and first column as the marker arrays, plus one flag for the first column (or row) because matrix[0][0] is in both. Interviewers want that flag explained.",
    theory: [
      "You cannot zero a row as soon as you see a 0: later cells in that row would look like original zeros and wipe more columns. First pass: mark which rows and cols need to die. Second pass: zero them.",
      "O(1) extra: on the first pass, if matrix[i][j]==0, set matrix[i][0]=0 and matrix[0][j]=0. Special-case column 0 with a boolean because matrix[i][0]=0 would also mean 'row i is marked' and you must not confuse 'col 0 must be zero' with those marks. Second pass zeros i,j from the markers, iterating inner cells first, then the first row/col.",
      "The same marker idea appears in 'game of life' in-place (encode old/new in extra bits).",
    ],
    howItWorks: [
      "col0 = false. for i,j: if matrix[i][j]==0: matrix[i][0]=0; if j===0 col0=true else matrix[0][j]=0.",
      "for i=1..: for j=1..: if matrix[i][0]==0 || matrix[0][j]==0: matrix[i][j]=0.",
      "Zero the first row if matrix[0][0]==0. Zero the first column if col0.",
    ],
    whenToUse: [
      "In-place row/col zeroing; similar marker-in-first-row problems.",
    ],
    whenNotToUse: [
      "You may use O(m+n) — use two arrays; it is clearer and the same time.",
    ],
    complexity: {
      time: "O(m n)",
      space: "O(1) extra with markers; O(m+n) with arrays",
    },
    interviewTips: [
      "State the cascade problem first. Then O(m+n). Then the first-row trick if they want O(1).",
    ],
    pitfalls: [
      "Zeroing while scanning and creating new zeros.",
      "Using matrix[0][0] for both first row and first column without a flag.",
      "Zeroing the first row before you have used it as a marker for the inner cells.",
    ],
    practiceIdeas: [
      "Set Matrix Zeroes (both memory versions).",
      "Game of Life in-place as a follow-up.",
    ],
    related: [
      "rotate-array",
      "spiral-matrix",
      "dutch-flag",
    ],
  },
  {
    slug: "dutch-flag",
    track: "dsa",
    category: "Arrays",
    title: "Dutch National Flag",
    summary:
      "Three-way partition in one pass: low / mid / high pointers. The 0/1/2 sort, and the partition behind 3-way quicksort.",
    depth: "core",
    whyItMatters:
      "Sort Colors is the interview. A counting sort (two passes) is correct and you should mention it. The one-pass invariant is what they want if they said 'one pass / constant space.' The same pointers appear in 3-way quicksort. If you swap carelessly and increment mid after a swap with high, you skip an unclassified value.",
    theory: [
      "Invariant: [0, lo) are 0s, [lo, mid) are 1s, [mid, hi] unknown, (hi, n-1] are 2s. A[mid]==0: swap with lo, lo++, mid++. A[mid]==1: mid++. A[mid]==2: swap with hi, hi-- (do not mid++). Stop when mid > hi.",
      "This is linear and in-place and not stable (swaps jump 1s around). Counting sort is stable if you write positions via prefix counts. Ask which they need.",
      "Generalization: 3-way partition around a pivot for quicksort when duplicates are common. The 'colors' are <, =, >.",
    ],
    howItWorks: [
      "lo=0, mid=0, hi=n-1.",
      "while mid<=hi: if A[mid]==0 swap(lo,mid), lo++, mid++. else if A[mid]==1 mid++. else swap(mid,hi), hi--.",
    ],
    whenToUse: [
      "Three categories to partition; Sort Colors; 3-way quicksort pivot.",
    ],
    whenNotToUse: [
      "Many distinct keys — ordinary sort.",
      "Need stability — counting sort.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1)",
    },
    interviewTips: [
      "Write the invariant as a comment. The mid/hi rule is the usual bug they wait for.",
      "If they allow two passes, counting is shorter — still mention one-pass.",
    ],
    pitfalls: [
      "mid++ after swapping in a 2.",
      "Using <hi instead of <= and leaving the last cell unclassified.",
    ],
    practiceIdeas: [
      "Sort Colors.",
      "3-way partition a random array around A[0].",
    ],
    related: [
      "three-way-quicksort",
      "two-pointers",
      "counting-sort",
    ],
  },
  {
    slug: "boyer-moore-majority",
    track: "dsa",
    category: "Arrays",
    title: "Boyer–Moore Majority Vote",
    summary:
      "If a value appears more than n/2 times, a cancel-pairs scan finds it: keep a candidate and a count, decrement on disagreement, switch when count hits 0. Verify in a second pass if the majority is not guaranteed.",
    depth: "next",
    whyItMatters:
      "Majority Element is often solved with a hashmap. Boyer–Moore is the O(1)-space follow-up. The algorithm is not obvious and interviewers like the 'pairs of different elements cancel, the majority survives' picture. Majority II (n/3) uses two candidates. Do not skip the verify pass unless the problem guarantees a majority exists.",
    theory: [
      "Think of the array as a bag. Repeatedly delete two distinct values. A true >n/2 majority cannot be eliminated: more copies remain than the number of deletions that can hit it. The algorithm simulates that with a running candidate. When count is 0, the prefix so far has no majority and you start over.",
      "If no majority exists, the leftover candidate is meaningless — it is just the last survivor of cancellations. Count it in a second pass. The problem 'Majority Element' on LeetCode guarantees one, so one pass is enough there; say that.",
      "For >n/3, at most two majorities. Keep two (candidate, count) pairs and cancel when the value matches neither. Verify both. This does not extend to n/k without k-1 candidates and more care.",
    ],
    howItWorks: [
      "cand=None, c=0. for x: if c==0 cand=x. c += (x==cand ? 1 : -1).",
      "Optional: count cand; if count>n/2 return cand else none.",
      "n/3: two pairs, decrement both on a third value, then verify.",
    ],
    whenToUse: [
      "> n/2 (or n/3) majority in linear time and O(1) extra memory.",
    ],
    whenNotToUse: [
      "You need exact frequencies of everyone — hashmap / sort.",
      "The threshold is n/10 with many candidates — different tools.",
    ],
    complexity: {
      time: "O(n)",
      space: "O(1)",
    },
    interviewTips: [
      "Ask if a majority is guaranteed. If not, verify.",
      "Hashmap is the warmup; this is the follow-up they want after 'can you do O(1) space?'",
    ],
    pitfalls: [
      "Returning the candidate without verify on a no-majority instance.",
      "Initializing count to 1 and skipping the first element incorrectly on empty arrays.",
    ],
    practiceIdeas: [
      "Majority Element I and II.",
      "Compare with sort (A[n/2]) and with a frequency map.",
    ],
    related: [
      "frequency-map",
      "divide-and-conquer",
      "top-k",
    ],
  },
];
