import type { Topic } from "../schema";

export const topics: Topic[] = [
  {
    slug: "euclid-gcd",
    track: "dsa",
    category: "Math",
    title: "Euclid GCD and LCM",
    summary:
      "gcd(a,b) = gcd(b, a mod b), then 0. lcm(a,b) = a / gcd * b to avoid overflow. The extended algorithm also finds Bézout coefficients for modular inverses.",
    depth: "core",
    whyItMatters:
      "GCD is the number-theory primitive interviews actually use: reduce fractions, lcm of run lengths, cycle alignment, and 'greatest common divisor traversal' graph problems. If you write a factor loop to min(a,b) you will TLE. Euclid is logarithmic. Extended Euclid is how you invert a modulo m when gcd=1 — the other half of modular arithmetic interviews.",
    theory: [
      "Any common divisor of a and b divides a-b and a mod b. So the gcd is invariant under the Euclidean step. Worst-case pair is consecutive Fibonacci numbers, still O(log min(a,b)). For negatives take abs; gcd(a,0)=|a|.",
      "lcm(a,b)·gcd(a,b)=|a·b|. Compute a/gcd*b in that order so the division is exact and the multiply is smaller. For n numbers, fold lcm, watching overflow (use a wide type or reduce modulo if they asked lcm mod p — that is not well-defined if you need the true lcm).",
      "Extended Euclid finds x,y with ax+by=gcd. If gcd=1, x is the inverse of a mod b (after normalizing). If you only need gcd, do not write extended.",
    ],
    howItWorks: [
      "while b: [a,b] = [b, a%b]; return a.",
      "lcm = a / gcd(a,b) * b (abs, and zero-safe).",
      "Extended: recurse, then x = y1, y = x1 - q*y1 where q = floor(a/b).",
    ],
    whenToUse: [
      "Reduce ratios, align cycles, modular inverse when m is not prime, lattice steps.",
    ],
    whenNotToUse: [
      "You need all prime factors — factorize, do not only gcd.",
    ],
    complexity: {
      time: "O(log min(a,b))",
      space: "O(1) iterative; O(log) recursive extended",
    },
    interviewTips: [
      "Water-and-jugs: measurable iff target is a multiple of gcd(x,y) (and ≤ x+y).",
      "If they ask inverse mod prime, you may use Fermat (a^{p-2}) instead of extended.",
    ],
    pitfalls: [
      "lcm as a*b/gcd overflowing before the divide.",
      "Modulo of negatives in the language.",
      "gcd(0,0) — define it or reject.",
    ],
    practiceIdeas: [
      "Implement gcd/lcm and extended gcd.",
      "Water and Jug Problem; fraction addition.",
    ],
    related: [
      "modular-arithmetic",
      "fast-exponentiation",
      "ncr-mod-inverse",
      "factorization",
    ],
  },
  {
    slug: "sieve",
    track: "dsa",
    category: "Math",
    title: "Sieve of Eratosthenes",
    summary:
      "Mark multiples of each prime p starting at p². After one pass, unmarked numbers are prime. Linear and segmented sieves exist when N is large.",
    depth: "core",
    whyItMatters:
      "Count primes, smallest prime factor arrays, and 'prime-related DP' all start with a sieve. Trial division per query is too slow when you need all primes ≤ n (n=10^6 is the usual cap). Interviewers also use the SPF array (smallest prime factor) as the way to factor many numbers in O(log n) each after an O(n log log n) preprocess.",
    theory: [
      "boolean isPrime[0..n], set true from 2. For p=2..sqrt(n), if isPrime[p], mark p*p, p*p+p, … as composite. Starting at p² is correct because smaller multiples were already marked by smaller primes. Time is O(n log log n), essentially linear in practice.",
      "SPF sieve: store the smallest prime that divides i. When you hit an unmarked i it is prime (spf[i]=i). Mark multiples with min(existing, i). Then factor x by dividing out spf[x] repeatedly.",
      "Linear sieve (Euler): each composite is marked once by its smallest prime factor — O(n). Segmented sieve handles primes in [L,R] when R-L is ~10^6 and R is 10^12: sieve primes to sqrt(R), then mark that window.",
    ],
    howItWorks: [
      "is[0]=is[1]=false; rest true.",
      "for p=2; p*p<=n; p++: if is[p] for m=p*p; m<=n; m+=p: is[m]=false.",
      "Collect i where is[i]. Or fill spf[] in the same loops.",
    ],
    whenToUse: [
      "All primes ≤ n, many factorizations, prime checks for lots of queries ≤ n.",
    ],
    whenNotToUse: [
      "A single isPrime on a 64-bit number — Miller–Rabin / deterministic witnesses, not a 10^18 array.",
    ],
    complexity: {
      time: "O(n log log n) Eratosthenes; O(n) linear sieve",
      space: "O(n)",
    },
    interviewTips: [
      "Count Primes is this sieve. Do not trial-divide each k ≤ n.",
      "If they need factors of every number, build SPF, not n gcd loops.",
    ],
    pitfalls: [
      "Starting marks at 2p instead of p² (still correct, slower).",
      "p*p overflow when p is int and n is close to 2^31.",
      "Calling 1 a prime.",
    ],
    practiceIdeas: [
      "Count Primes; list primes to n.",
      "SPF factorize all numbers in 1..n.",
      "Segmented sieve for a [L,R] window.",
    ],
    related: [
      "factorization",
      "modular-arithmetic",
      "euclid-gcd",
    ],
  },
  {
    slug: "modular-arithmetic",
    track: "dsa",
    category: "Math",
    title: "Modular Arithmetic",
    summary:
      "Work in Z/mZ: add and multiply then reduce. Division is multiply by the modular inverse, which exists iff gcd(a,m)=1. Watch negative residues and overflow.",
    depth: "core",
    whyItMatters:
      "Almost every 'return the answer modulo 10^9+7' interview is modular arithmetic plus a DP or combinatorics. If you divide by 2 in the integers and then mod, you are wrong — you must multiply by the inverse of 2. If you subtract and get a negative, add MOD before reducing. These two bugs fail hidden tests constantly.",
    theory: [
      "(a+b) mod m = (a mod m + b mod m) mod m. Same for *. (a-b) mod m = (a mod m - b mod m + m) mod m. There is no a/b mod m in general; if gcd(b,m)=1, a * inv(b) works. When m is prime, Fermat: inv(b) = b^{m-2} mod m. When m is not prime, extended Euclid, or fail if gcd>1.",
      "10^9+7 and 998244353 are the usual primes (the latter is NTT-friendly). You can precompute factorials and inv factorials for nCr. Fast exponentiation computes a^e mod m in O(log e).",
      "Congruences do not let you compare sizes. Do not take min of two residues and expect it to match the min of the originals. Modular inverses of lcm/gcd expressions need extra care if they are not coprime to m.",
    ],
    howItWorks: [
      "Normalize: ((x % m) + m) % m.",
      "add(a,b)= (a+b)%m with a wide type; mul as 128-bit or careful JS number (use BigInt if n is large).",
      "div(a,b)= mul(a, modInverse(b,m)).",
    ],
    whenToUse: [
      "Huge counts, combinatorics, geometric series of ways, hash polynomials.",
    ],
    whenNotToUse: [
      "The problem wants the exact integer, not a residue.",
      "You need ordering / max of original values.",
    ],
    complexity: {
      time: "O(1) add/mul; O(log m) inverse",
      space: "O(1)",
    },
    interviewTips: [
      "If the recurrence has a division by 2, ask whether 2 has an inverse (MOD odd ⇒ yes).",
      "Precompute fact/invFact when you will call nCr many times.",
    ],
    pitfalls: [
      "Negative modulo.",
      "JS 53-bit precision: (a*b)%m is already wrong for 1e9+7 * 1e9+7. Use BigInt.",
      "Inverting a non-coprime value and shipping garbage.",
    ],
    practiceIdeas: [
      "Implement add/sub/mul/inv mod 1e9+7.",
      "Sum of 1+2+…+n mod m; geometric series.",
    ],
    related: [
      "fast-exponentiation",
      "ncr-mod-inverse",
      "euclid-gcd",
      "rabin-karp",
    ],
  },
  {
    slug: "fast-exponentiation",
    track: "dsa",
    category: "Math",
    title: "Fast Exponentiation",
    summary:
      "Compute a^e (mod m) by squaring: square the base, multiply into the answer on odd bits of e. O(log e) multiplications, not e.",
    depth: "core",
    whyItMatters:
      "Pow(x,n) is a common interview and the subroutine under Fermat inverses, matrix expo (Fib(n) in log n), and 'super pow' (exponent given as an array). A loop that multiplies n times fails when n is 10^9 or 10^18. Binary exponentiation is the expected algorithm; watch n < 0 (invert) and 0^0 conventions.",
    theory: [
      "a^e = (a^{e/2})^2 if e even, and a · a^{e-1} if odd. Iterative: ans=1, while e: if e odd ans*=a; a*=a; e>>=1. All multiplies mod m if required. This is the same idea as Russian-peasant multiplication.",
      "Matrix expo: replace * with matrix multiply. [[1,1],[1,0]]^n gives Fibonacci. Recurrences of fixed width k become k×k matrix expo in O(k³ log n).",
      "Euler/Fermat: a^e mod p = a^{e mod (p-1)} when p prime and p∤a. Super Pow uses Euler's theorem or stepwise powmod with φ(m). Only if they ask.",
    ],
    howItWorks: [
      "Handle n<0: a=1/a, n=-n (reals) or a=inv(a) (mod p).",
      "ans=1. while n>0: if n&1 ans*=a; a*=a; n>>=1.",
      "Return ans, with mods on every multiply if needed.",
    ],
    whenToUse: [
      "Large exponents, modular inverse via Fermat, linear recurrences via matrices.",
    ],
    whenNotToUse: [
      "e is tiny — a simple loop is fine.",
      "You need all a^1 … a^n — incremental multiply is O(n).",
    ],
    complexity: {
      time: "O(log e) multiplies (plus matrix cost if any)",
      space: "O(1)",
    },
    interviewTips: [
      "Write the iterative version. Recursive is fine if you mention stack.",
      "Pow(x,n) on leetcode: n is 32-bit signed, including MIN — negate carefully (use a 64-bit exponent).",
    ],
    pitfalls: [
      "Modding only at the end after overflow.",
      "Infinite recursion on n=-2^31 if you write n = -n in 32-bit.",
      "0^0 — ask the spec (often 1 in combinatorics).",
    ],
    practiceIdeas: [
      "Pow(x, n); Super Pow.",
      "nth Fibonacci via matrix expo.",
      "Modular inverse via Fermat vs extended Euclid.",
    ],
    related: [
      "modular-arithmetic",
      "ncr-mod-inverse",
      "fibonacci-dp",
      "euclid-gcd",
    ],
  },
  {
    slug: "factorization",
    track: "dsa",
    category: "Math",
    title: "Integer Factorization",
    summary:
      "Trial divide to sqrt(n) for a single n. After an SPF sieve, factor many n in O(log n). Pollard's Rho for 64-bit contest numbers. Unique factorization is why gcd works.",
    depth: "next",
    whyItMatters:
      "Count divisors, sum of divisors, Euler's φ, and 'ugly number' generalizations need the prime factorization. Interviews rarely want Rho; they do want you to not trial-divide to n, and to generate all divisors from the factor list in a DFS. Ugly Number II is DP, not factorization — know the difference.",
    theory: [
      "Trial division: for p=2, then odds, while p*p≤n, divide out all p. If n>1 at the end, n is prime. O(sqrt n) worst case (when n is prime). For n=10^12 that is 10^6 — acceptable once, not per query.",
      "Divisor count if n = p1^a1 … is (a1+1)(a2+1)…. Sum of divisors is Π (p^{a+1}-1)/(p-1). φ(n) = n * Π (1-1/p). All of these need the factorization once.",
      "Pollard's Rho + Miller–Rabin is the 64-bit toolkit. Mention it if n is 10^18 and they want factors. Do not implement Rho from scratch unless you have practiced it.",
    ],
    howItWorks: [
      "factors = []. for p=2..sqrt: while n%p==0: push p, n/=p. if n>1 push n.",
      "All divisors: DFS over exponents, or iterate i=1..sqrt and add i and n/i.",
      "Many queries ≤ N: sieve SPF, then peel.",
    ],
    whenToUse: [
      "Divisor functions, simplifying fractions further than gcd, prime-power checks.",
    ],
    whenNotToUse: [
      "Primality of one large n — Miller–Rabin, not full factor.",
      "Ugly numbers sequence — min-heap or DP pointers.",
    ],
    complexity: {
      time: "O(sqrt n) trial; O(n log log n + q log n) with SPF",
      space: "O(number of prime factors) or O(n) sieve",
    },
    interviewTips: [
      "Count primes is sieve; factor one n is trial; factor many is SPF.",
      "Perfect squares: check i*i===n carefully with overflow.",
    ],
    pitfalls: [
      "Looping p<=n and TLE.",
      "Forgetting the leftover prime after the loop.",
      "Integer overflow on p*p.",
    ],
    practiceIdeas: [
      "Factor n and list all divisors.",
      "Four Divisors; Super Ugly Number (DP, contrast).",
    ],
    related: [
      "sieve",
      "euclid-gcd",
      "modular-arithmetic",
    ],
  },
  {
    slug: "ncr-mod-inverse",
    track: "dsa",
    category: "Math",
    title: "nCr and Modular Inverse",
    summary:
      "nCr = n! / (r! (n-r)!). Mod a prime, divide by multiplying inv factorials. Precompute fact[i] and invFact[i] in O(N + log MOD).",
    depth: "next",
    whyItMatters:
      "Combinatorics interviews (unique paths, catalan, 'ways to choose k') become 'compute nCr mod p' the moment n is 10^6. If you multiply the formula naively you overflow and you cannot divide mod p with /. The factorial + inverse-factorial table is the standard package. When n is 10^18 and r is 10^6, use a multiplicative loop of r terms. When p is small, use Lucas.",
    theory: [
      "Precompute fact[0]=1, fact[i]=fact[i-1]*i % MOD. invFact[N] = inv(fact[N]), then invFact[i] = invFact[i+1]*(i+1) % MOD downward. nCr = fact[n]*invFact[r]*invFact[n-r] % MOD for 0≤r≤n, else 0.",
      "inv of one value: Fermat pow(a, MOD-2) if MOD prime, else extended Euclid. Do not invert 0.",
      "Lucas theorem: nCr mod p = Π n_i C r_i (base-p digits) when p is prime. Use it when n is huge and p is small (p ≤ 10^6 is already a table; p=13 is Lucas).",
    ],
    howItWorks: [
      "Build fact and invFact up to the max n you need.",
      "C(n,r) as above, with n<r → 0 and negative → 0.",
      "For one-off C(n,r) with r small: ans=1; for i=1..r: ans = ans * (n-r+i) / i (exact in integers, or * inv(i) mod p).",
    ],
    whenToUse: [
      "Many nCr queries, Catalan, paths on a grid, 'choose k positions.'",
    ],
    whenNotToUse: [
      "MOD is not prime and r! shares factors with MOD — Lucas / Chinese Remainder / no inverse. Say so.",
    ],
    complexity: {
      time: "O(N + log MOD) preprocess; O(1) per nCr",
      space: "O(N)",
    },
    interviewTips: [
      "Unique Paths is C(n+m-2, n-1). If they add obstacles, that is DP, not one nCr.",
      "Always specify 0-based / n<r handling.",
    ],
    pitfalls: [
      "Integer divide in the multiplicative formula without guaranteeing divisibility at each step (multiply then divide by i in order so it stays integral).",
      "invFact from inv(fact[i]) each i — extra log, still OK, but the downward method is O(N).",
    ],
    practiceIdeas: [
      "Unique Paths via nCr.",
      "Catalan numbers via nCr.",
      "nCr mod 1e9+7 for n=1e6, q=1e5.",
    ],
    related: [
      "catalan",
      "modular-arithmetic",
      "fast-exponentiation",
      "euclid-gcd",
    ],
  },
  {
    slug: "catalan",
    track: "dsa",
    category: "Math",
    title: "Catalan Numbers",
    summary:
      "C_0=1, C_{n+1} = Σ C_i C_{n-i}, and C_n = (1/(n+1)) * (2n choose n). They count valid parentheses, BSTs, monotonic paths, and triangulations.",
    depth: "next",
    whyItMatters:
      "When an interviewer asks 'how many valid parentheses strings / unique BSTs / full binary trees / mountain arrays,' the answer is Catalan. Generate Parentheses lists them; Unique BSTs counts them. If you only memorize the formula you will miss the DP split. If you only know the DP you will TLE on large n without nCr.",
    theory: [
      "The split recurrence: a valid string / a BST on n keys has a first-matching closer / a root, leaving i nodes on the left and n-1-i on the right. C_n = Σ_{i=0}^{n-1} C_i C_{n-1-i}. That is Unique Binary Search Trees (LeetCode 96).",
      "Closed form C_n = (2n choose n) - (2n choose n-1) = (1/(n+1))(2n choose n). Mod p, multiply C(2n,n) by inv(n+1). For n ≥ 20 the number overflows 64-bit; use BigInt or mod.",
      "Other Catalan objects: non-crossing handshakes, stack-sortable permutations, monotonic lattice paths not above the diagonal. Naming two of these in an interview is enough to show you know the class.",
    ],
    howItWorks: [
      "DP: dp[0]=1; for n=1..N: dp[n]=Σ dp[i]*dp[n-1-i].",
      "Formula: C(2n,n) * inv(n+1).",
      "Generate: the parentheses DFS, not the formula.",
    ],
    whenToUse: [
      "Count (not list, unless n is small) of the Catalan-structured objects above.",
    ],
    whenNotToUse: [
      "Listing for large n — output is huge.",
      "A similar-looking count that is actually 2^n or n! — prove the split before naming Catalan.",
    ],
    complexity: {
      time: "O(n²) DP; O(n) or better with nCr tables",
      space: "O(n)",
    },
    interviewTips: [
      "Unique BSTs: say Catalan, write the split DP, mention the formula.",
      "Generate Parentheses: do not compute Catalan unless they asked for the count.",
    ],
    pitfalls: [
      "Off-by-one on C_n vs C_{n+1} (n pairs vs n nodes).",
      "Integer overflow on the formula.",
      "Using C(2n, n) without dividing by n+1.",
    ],
    practiceIdeas: [
      "Unique Binary Search Trees.",
      "Count valid parentheses; compare to generate-parentheses length.",
      "Compute C_n for n=1..15 both ways and match.",
    ],
    related: [
      "generate-parentheses",
      "ncr-mod-inverse",
      "combinations",
      "recursion-memo",
    ],
  },
];
