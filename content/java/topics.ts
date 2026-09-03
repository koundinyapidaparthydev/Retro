import type { Topic } from "../schema";

function j(
  slug: string,
  category: string,
  title: string,
  fields: Omit<Topic, "slug" | "track" | "category" | "title" | "depth"> & { depth?: Topic["depth"] },
): Topic {
  return { slug, track: "java", category, title, depth: fields.depth ?? "core", ...fields };
}

/** Java basics → collections — enough to write NeetCode solutions in Java. */
export const javaTopics: Topic[] = [
  j("hello-java", "First programs", "Print one line", {
    summary: "Given a blank file, write the smallest Java program that prints Hello and exits.",
    whyItMatters:
      "Every DSA solution is a class with a method. If Hello World is fuzzy, Two Sum will feel harder than it is.",
    theory: [
      "Java runs inside a JVM. You write .java source, javac compiles to .class bytecode, java runs it.",
      "public class Name must match the file name Name.java. The entry point is public static void main(String[] args).",
      "System.out.println prints a line and a newline. System.out.print does not add the newline.",
    ],
    howItWorks: [
      "Create Hello.java with one public class Hello.",
      "Put public static void main(String[] args) { ... } inside.",
      "Call System.out.println(\"Hello\"); then run.",
    ],
    whenToUse: ["Any new machine or online compiler — prove the toolchain works first."],
    whenNotToUse: ["Do not start with Spring, Maven, or IDEs before this compiles."],
    interviewTips: ["Say: class + main + println. That is the whole bootstrap."],
    pitfalls: ["Class name ≠ file name. Missing static on main. Using print instead of println when you expect a line break."],
    practiceIdeas: [
      "Open OneCompiler and type Hello yourself: https://onecompiler.com/java",
      "Same in Programiz: https://www.programiz.com/java-programming/online-compiler/",
      "JDoodle: https://www.jdoodle.com/online-java-compiler/",
      "OnlineGDB: https://www.onlinegdb.com/online_java_compiler",
    ],
    related: ["variables-types", "online-playgrounds"],
  }),

  j("online-playgrounds", "First programs", "Where to type Java today", {
    summary: "You do not need an IDE yet. Use a browser compiler, paste, Run, read the output panel.",
    whyItMatters: "Friction kills practice. One click → type → Run is how you get reps before NeetCode.",
    theory: [
      "Online compilers give you a main-ready editor, a Run button, and stdout. Perfect for DSA snippets.",
      "Install JDK locally later (Temurin / Oracle) when you want an IDE. Not required for week 1.",
      "LeetCode’s Java editor is the same idea once you start problems.",
    ],
    howItWorks: [
      "Pick one site and bookmark it.",
      "Paste a full class with main, or just the body if the site wraps main for you.",
      "Read errors from the top — first error is usually the real one.",
    ],
    whenToUse: ["Every Java lesson on Retro — open a live tab beside the walkthrough."],
    whenNotToUse: ["Do not juggle five compilers. One is enough."],
    interviewTips: ["Practice in the same language you will type on the whiteboard / CoderPad."],
    pitfalls: ["Forgetting a class wrapper when the site expects a full program."],
    practiceIdeas: [
      "Primary: https://onecompiler.com/java",
      "Backup: https://www.programiz.com/java-programming/online-compiler/",
      "Also: https://www.jdoodle.com/online-java-compiler/",
      "Also: https://www.onlinegdb.com/online_java_compiler",
      "Also: https://www.tutorialspoint.com/compile_java_online.php",
      "Docs when stuck: https://docs.oracle.com/en/java/javase/21/docs/api/",
    ],
    related: ["hello-java", "variables-types"],
  }),

  j("variables-types", "Types & values", "Name a box, pick a type", {
    summary: "Given a value (42, 3.14, true, 'A'), declare the right Java variable and print it.",
    whyItMatters: "DSA code is full of int, long, boolean, and char. Wrong type = wrong answer or overflow.",
    theory: [
      "Primitives: byte, short, int, long, float, double, boolean, char. They hold the value itself.",
      "int is 32-bit signed. Prefer long when sums can blow past ~2e9 (classic interview trap).",
      "boolean is true/false. char is a single Unicode character in single quotes: 'A'.",
    ],
    howItWorks: [
      "int n = 42; long big = 1_000_000_000L; double x = 3.14; boolean ok = true; char c = 'A';",
      "Print with + concatenation: System.out.println(\"n=\" + n);",
      "final int CAP = 10; means CAP cannot be reassigned.",
    ],
    whenToUse: ["Counters, indices, flags, character scans."],
    whenNotToUse: ["Do not use float for money or for careful floating compares in interviews — prefer int math when you can."],
    interviewTips: ["Call out int vs long when the problem says 10^9 * n."],
    pitfalls: ["Integer division: 5/2 is 2. Missing L on long literals. Using == on Strings (see strings topic)."],
    practiceIdeas: [
      "In OneCompiler, declare each primitive and print: https://onecompiler.com/java",
      "Change int sum to long and print a large product.",
    ],
    related: ["strings-basics", "operators-if"],
  }),

  j("strings-basics", "Types & values", "Text is an object", {
    summary: "Given two strings, check equality, length, and a character at an index — without mutating them.",
    whyItMatters: "Half of NeetCode Easy is String. equals vs == and immutability show up in every interview.",
    theory: [
      "String is a reference type (object), not a primitive. It is immutable: operations return new strings.",
      "Use s.equals(t) for content. == compares references (same object), not letters.",
      "s.length(), s.charAt(i), s.substring(a, b), s.toCharArray() are the everyday tools.",
    ],
    howItWorks: [
      "String s = \"code\"; int n = s.length(); char c = s.charAt(0);",
      "if (s.equals(\"code\")) { ... }",
      "For counting letters: int[] cnt = new int[26]; cnt[s.charAt(i) - 'a']++;",
    ],
    whenToUse: ["Anagrams, palindromes, sliding window on characters."],
    whenNotToUse: ["Heavy in-place edits — use char[] or StringBuilder."],
    interviewTips: ["Say equals for content. Mention StringBuilder if you build in a loop."],
    pitfalls: ["s == t after new String(...). Off-by-one on substring end index (exclusive)."],
    practiceIdeas: [
      "Programiz: print length, charAt, equals for \"racecar\": https://www.programiz.com/java-programming/online-compiler/",
      "Build a 26-count array for \"anagram\".",
    ],
    related: ["arrays-fixed", "stringbuilder"],
  }),

  j("operators-if", "Control flow", "Decide with if", {
    summary: "Given two numbers, print which is larger using comparisons and if / else if / else.",
    whyItMatters: "Binary search, two pointers, and greedy all start as comparisons and branches.",
    theory: [
      "Comparisons: < > <= >= == !=. Logical: && || ! (short-circuit).",
      "if (cond) { ... } else if (cond2) { ... } else { ... }",
      "Ternary for tiny assigns: int m = a > b ? a : b;",
    ],
    howItWorks: [
      "Write the condition first in plain English, then translate.",
      "Prefer braces even for one line — fewer bugs under stress.",
      "Avoid nesting more than two levels; extract a boolean named for the idea.",
    ],
    whenToUse: ["Guards, early returns, picking left vs right pointer."],
    whenNotToUse: ["Do not nest five ifs — use early return or a helper."],
    interviewTips: ["Name the boolean: boolean inBounds = i >= 0 && i < n;"],
    pitfalls: ["= instead of ==. Forgetting braces. Relying on floating ==."],
    practiceIdeas: [
      "OneCompiler: clamp a number into [0, 100]: https://onecompiler.com/java",
      "Print Fizz / Buzz / FizzBuzz for 1..15.",
    ],
    related: ["loops", "variables-types"],
  }),

  j("loops", "Control flow", "Repeat until done", {
    summary: "Given n, print 0..n-1 with a for loop, then walk an array with for-each.",
    whyItMatters: "Almost every O(n) scan is a loop. Wrong bounds = wrong answer.",
    theory: [
      "for (int i = 0; i < n; i++) classic index loop.",
      "while (cond) when the stop condition is not a simple counter.",
      "for (int x : nums) for-each when you do not need the index.",
    ],
    howItWorks: [
      "Decide: do I need the index? If yes, classic for. If no, for-each.",
      "break exits the loop. continue skips to the next iteration.",
      "Nested loops: state the complexity out loud (n², n·m).",
    ],
    whenToUse: ["Scans, windows, nested pair checks."],
    whenNotToUse: ["Do not mutate a list you are for-eaching — use an index loop or iterator."],
    interviewTips: ["Say the loop invariant: what is true at the start of each i."],
    pitfalls: ["i <= n on 0-based arrays. Infinite while. Modifying the collection mid for-each."],
    practiceIdeas: [
      "JDoodle: sum 1..100, then find max in {3,1,4,1,5}: https://www.jdoodle.com/online-java-compiler/",
      "Print a multiplication table 1..5.",
    ],
    related: ["arrays-fixed", "methods"],
  }),

  j("arrays-fixed", "Arrays & strings", "Fixed slots in a row", {
    summary: "Given nums = {1,2,3}, create an int[], read index 0, write nums[1], print Arrays.toString.",
    whyItMatters: "LeetCode’s int[] is the default input. You must allocate, index, and copy without drama.",
    theory: [
      "int[] a = new int[n]; fills with zeros. int[] b = {1, 2, 3};",
      "Length is a.length (field, not method). Valid indices 0 .. length-1.",
      "Arrays.sort(a); Arrays.fill(a, -1); Arrays.copyOf(a, n); import java.util.Arrays;",
    ],
    howItWorks: [
      "Allocate with known size, or initialize with { }.",
      "Scan with for (int i = 0; i < a.length; i++).",
      "Never assume sorted unless the problem says so — or you sort first.",
    ],
    whenToUse: ["Most array / two-pointer / DP table problems."],
    whenNotToUse: ["Growing lists of unknown size — use ArrayList."],
    interviewTips: ["Say 0-based. Mention Arrays.sort is O(n log n)."],
    pitfalls: ["a[a.length]. Confusing length with length(). Forgetting import Arrays."],
    practiceIdeas: [
      "OnlineGDB: reverse an array in place: https://www.onlinegdb.com/online_java_compiler",
      "Sort {5,1,4,2} and print with Arrays.toString.",
    ],
    related: ["arraylist", "strings-basics"],
  }),

  j("stringbuilder", "Arrays & strings", "Build text without O(n²)", {
    summary: "Given parts to join in a loop, use StringBuilder so you do not rebuild a huge String each time.",
    whyItMatters: "Interviewers notice String + in a hot loop. StringBuilder is the Java fix.",
    theory: [
      "String + in a loop can copy growing prefixes → O(n²) characters copied.",
      "StringBuilder is a mutable buffer: append, then toString() once.",
      "sb.append(x); sb.setLength(0); sb.reverse(); are common.",
    ],
    howItWorks: [
      "StringBuilder sb = new StringBuilder();",
      "for (...) sb.append(piece);",
      "String out = sb.toString();",
    ],
    whenToUse: ["Building answers character by character, reconstructing paths."],
    whenNotToUse: ["One or two concatenations — plain + is fine."],
    interviewTips: ["I would use StringBuilder in the loop, then toString at the end."],
    pitfalls: ["Forgetting toString. Sharing one builder across recursive calls without reset."],
    practiceIdeas: [
      "OneCompiler: join words with commas using StringBuilder: https://onecompiler.com/java",
    ],
    related: ["strings-basics", "loops"],
    depth: "next",
  }),

  j("methods", "Methods & classes", "Name a verb, return a value", {
    summary: "Given two ints, write a static method max(a,b) that returns the larger one, call it from main.",
    whyItMatters: "Interview solutions are methods: int[] twoSum(...). You must know parameters, return, and void.",
    theory: [
      "static means “belongs to the class,” callable without new — fine for DSA helpers.",
      "Return type before the name: int max(...). void means no return value.",
      "Overloading: same name, different parameter lists.",
    ],
    howItWorks: [
      "Write the signature first: static int max(int a, int b).",
      "Implement with a clear return.",
      "Call from main and print the result.",
    ],
    whenToUse: ["Helpers, recursive functions, LeetCode method stubs."],
    whenNotToUse: ["Do not put all logic in main forever — extract."],
    interviewTips: ["Match the signature they give. Do not rename parameters needlessly."],
    pitfalls: ["Missing return on some path. Using void when you need a value."],
    practiceIdeas: [
      "Programiz: write abs, clamp, and isEven helpers: https://www.programiz.com/java-programming/online-compiler/",
    ],
    related: ["classes-objects", "recursion-java"],
  }),

  j("classes-objects", "Methods & classes", "A type you invent", {
    summary: "Given a Point with x and y, define a class, construct one with new, and read its fields.",
    whyItMatters: "Linked list nodes, TreeNode, and LLD all start here. DSA uses tiny classes constantly.",
    theory: [
      "class holds fields + methods. new ClassName(...) allocates an object on the heap.",
      "References point at objects. Two variables can point at the same node.",
      "null means “no object.” Calling a method on null → NullPointerException.",
    ],
    howItWorks: [
      "class ListNode { int val; ListNode next; ListNode(int v) { val = v; } }",
      "ListNode a = new ListNode(1); a.next = new ListNode(2);",
      "Walk: while (cur != null) { ... cur = cur.next; }",
    ],
    whenToUse: ["Nodes, graph adjacency wrappers, custom keys when needed."],
    whenNotToUse: ["Do not invent classes when int[] / HashMap already fit."],
    interviewTips: ["Draw boxes and arrows for references. Say where null ends the chain."],
    pitfalls: ["Forgetting new. Losing the head reference. NPE on .next without a null check."],
    practiceIdeas: [
      "JDoodle: build a 3-node list and print values: https://www.jdoodle.com/online-java-compiler/",
    ],
    related: ["null-refs", "methods"],
  }),

  j("null-refs", "Methods & classes", "null means no object", {
    summary: "Given a possibly-null String or node, check null before you touch a field or method.",
    whyItMatters: "NPE is the #1 runtime crash in Java interview code. Guards are part of the solution.",
    theory: [
      "Primitives cannot be null. Object references can.",
      "Check head == null before head.val. Check s != null before s.length().",
      "Optional exists, but interviews usually want plain null checks.",
    ],
    howItWorks: [
      "Write the empty / null base case first in recursion and list problems.",
      "if (node == null) return ...;",
      "Prefer early return over deep nesting.",
    ],
    whenToUse: ["Every linked list, tree, and string API edge."],
    whenNotToUse: ["Do not null-check primitives."],
    interviewTips: ["State empty input in the first sentence of your plan."],
    pitfalls: ["Checking node.next == null when node itself is null."],
    practiceIdeas: [
      "OneCompiler: safeLength(String s) returns 0 when null: https://onecompiler.com/java",
    ],
    related: ["classes-objects", "recursion-java"],
    depth: "next",
  }),

  j("arraylist", "Collections for DSA", "A growable list", {
    summary: "Given an unknown number of ints, store them in ArrayList, add, get by index, and iterate.",
    whyItMatters: "When size is unknown (BFS layers, collecting answers), ArrayList is the default Java list.",
    theory: [
      "List<Integer> list = new ArrayList<>(); — use the interface type on the left.",
      "add, get(i), set(i,v), size(), remove(i). Autoboxing: int ↔ Integer.",
      "Random access is O(1). Mid-list remove is O(n).",
    ],
    howItWorks: [
      "import java.util.*;",
      "List<Integer> a = new ArrayList<>(); a.add(3); int x = a.get(0);",
      "for (int v : a) { ... }",
    ],
    whenToUse: ["Result lists, adjacency lists, buffering."],
    whenNotToUse: ["Fixed size known up front and hot path — int[] can be simpler."],
    interviewTips: ["Say List on the left, ArrayList on the right."],
    pitfalls: ["Removing while for-eaching. Using == on Integer caches outside -128..127."],
    practiceIdeas: [
      "Programiz: read five numbers into ArrayList, print reversed: https://www.programiz.com/java-programming/online-compiler/",
      "Docs: https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayList.html",
    ],
    related: ["hashmap", "arrays-fixed"],
  }),

  j("hashmap", "Collections for DSA", "Key → value in average O(1)", {
    summary: "Given pairs (key, value), put them in a HashMap and look one up — the Two Sum weapon.",
    whyItMatters: "HashMap / HashSet unlock half of Easy/Medium array problems.",
    theory: [
      "Map<K,V> map = new HashMap<>(); put, get, containsKey, getOrDefault, remove.",
      "Set<T> set = new HashSet<>(); add, contains, remove — unique membership.",
      "Average O(1) ops if hash is decent. Keys need stable equals/hashCode.",
    ],
    howItWorks: [
      "map.put(2, 0); Integer i = map.get(7);",
      "if (map.containsKey(need)) return new int[]{map.get(need), j};",
      "for (var e : map.entrySet()) { e.getKey(); e.getValue(); }",
    ],
    whenToUse: ["Two Sum, frequency counts, graph visited sets, anagram maps."],
    whenNotToUse: ["Need sorted keys — TreeMap. Need insertion order — LinkedHashMap."],
    interviewTips: ["Draw the map as you dry-run. Say average O(1)."],
    pitfalls: ["get returns null for missing keys — NPE if unboxed. Mutating a key after insert."],
    practiceIdeas: [
      "OneCompiler: Two Sum dry-run with HashMap: https://onecompiler.com/java",
      "Count frequencies of characters in \"mississippi\".",
      "Docs: https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html",
    ],
    related: ["arraylist", "priority-queue"],
  }),

  j("stack-queue", "Collections for DSA", "Stack and queue with Deque", {
    summary: "Given a sequence of pushes and pops, use ArrayDeque as a stack; then as a queue.",
    whyItMatters: "Valid Parentheses, BFS, monotonic stacks — all need these ADTs in Java.",
    theory: [
      "Prefer Deque<Integer> st = new ArrayDeque<>(); over legacy Stack.",
      "Stack style: push = addLast / push, pop = removeLast / pop, peekLast.",
      "Queue style: offerLast, pollFirst (BFS).",
    ],
    howItWorks: [
      "Parentheses: push opens; on close, pop and match.",
      "BFS: queue.offer(start); while (!queue.isEmpty()) { ... offer neighbors }",
      "Never use Stack class in new code unless forced.",
    ],
    whenToUse: ["DFS iterative, BFS, next-greater-element patterns."],
    whenNotToUse: ["Random access — use list/array."],
    interviewTips: ["Say ArrayDeque. Name push/pop vs offer/poll."],
    pitfalls: ["pop on empty. Mixing stack and queue ends on the same deque by accident."],
    practiceIdeas: [
      "JDoodle: validate \"()[]{}\" with a Deque: https://www.jdoodle.com/online-java-compiler/",
      "BFS distances on a tiny 1-D line of rooms.",
    ],
    related: ["priority-queue", "hashmap"],
    depth: "next",
  }),

  j("priority-queue", "Collections for DSA", "Always get the smallest (or largest)", {
    summary: "Given numbers streaming in, use PriorityQueue to repeatedly poll the current minimum.",
    whyItMatters: "Top-K, merge K lists, Dijkstra-style patterns use heaps — PriorityQueue in Java.",
    theory: [
      "PriorityQueue<Integer> pq = new PriorityQueue<>(); // min-heap by default",
      "Max-heap: new PriorityQueue<>(Collections.reverseOrder()) or (a,b) -> b - a carefully for ints.",
      "offer / add, poll, peek. Not sorted for iteration — only the head is ordered.",
    ],
    howItWorks: [
      "offer each number. poll when you need the extreme.",
      "Top-K: keep a size-K heap; if size > K, poll.",
      "Custom objects: pass a Comparator.",
    ],
    whenToUse: ["Top-K frequent, scheduling, best-next edge."],
    whenNotToUse: ["Need full sort once — Arrays.sort is simpler."],
    interviewTips: ["Say min-heap default. State the comparator for max-heap."],
    pitfalls: ["Assuming for-each is sorted. Integer subtraction comparator overflow — use Integer.compare."],
    practiceIdeas: [
      "OnlineGDB: keep top 3 largest from a stream: https://www.onlinegdb.com/online_java_compiler",
      "Docs: https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/PriorityQueue.html",
    ],
    related: ["hashmap", "sorting-java"],
    depth: "next",
  }),

  j("sorting-java", "Collections for DSA", "Sort with the library", {
    summary: "Given an int[] and a List, sort them ascending, then sort indices by a custom rule.",
    whyItMatters: "Many Mediums become Easy after Arrays.sort. You must know the API cold.",
    theory: [
      "Arrays.sort(int[]) dual-pivot quicksort / timsort variants — O(n log n).",
      "Collections.sort(list) or list.sort(comparator).",
      "Comparator: (a, b) -> Integer.compare(a, b) or Comparator.comparingInt(...).",
    ],
    howItWorks: [
      "Arrays.sort(nums);",
      "Arrays.sort(arr, (x, y) -> Integer.compare(x[0], y[0])); for int[][]",
      "State that sort mutates in place.",
    ],
    whenToUse: ["Two pointers after sort, interval merge, greedy choice."],
    whenNotToUse: ["Need original order — copy first."],
    interviewTips: ["Mention O(n log n) and that it mutates."],
    pitfalls: ["Sorting Integer[] vs int[]. Unstable assumptions when equals."],
    practiceIdeas: [
      "OneCompiler: sort intervals by start: https://onecompiler.com/java",
    ],
    related: ["arrays-fixed", "priority-queue"],
    depth: "next",
  }),

  j("recursion-java", "Ready for DSA", "A method that calls itself", {
    summary: "Given n, write factorial(n) with a clear base case, then draw the call stack for n=4.",
    whyItMatters: "Trees, backtracking, and divide-and-conquer are recursion. Java needs an explicit base case.",
    theory: [
      "Base case returns without calling itself. Recursive case reduces toward the base.",
      "Each call has its own locals on the stack. Too deep → StackOverflowError.",
      "Prefer clear parameters (index, remaining) over mutating globals — except a shared answer list.",
    ],
    howItWorks: [
      "Write base case first.",
      "Assume the recursive call works for a smaller input; build your answer from it.",
      "For backtracking: choose → recurse → undo.",
    ],
    whenToUse: ["Trees, subsets, DFS on graphs, binary search recursive form."],
    whenNotToUse: ["Simple loops — iteration is clearer and safer on depth."],
    interviewTips: ["Say base case, then recursive relation, then complexity."],
    pitfalls: ["Missing base case. Not undoing mutations after recurse."],
    practiceIdeas: [
      "Programiz: factorial + fibonacci (memo optional): https://www.programiz.com/java-programming/online-compiler/",
      "Generate all subsets of {1,2,3} with choose/undo.",
    ],
    related: ["methods", "null-refs"],
    depth: "next",
  }),

  j("java-for-neetcode", "Ready for DSA", "Checklist before NeetCode 75", {
    summary: "Before Contains Duplicate, confirm you can write: arrays, HashMap, HashSet, ArrayList, Deque, and a clean method signature.",
    whyItMatters: "Language fog wastes interview minutes. This checklist means Java is no longer the blocker.",
    theory: [
      "Template: class Solution { public ReturnType method(Args) { ... } }",
      "Imports you will type often: java.util.*",
      "Debug with prints → then remove. Prefer a tiny dry-run array in comments.",
    ],
    howItWorks: [
      "Re-solve Hello, Two Sum sketch, Valid Parentheses sketch in a live compiler.",
      "Open Retro’s DSA path starting at Contains Duplicate.",
      "For every problem: Given → Find → Java types → dry-run → code.",
    ],
    whenToUse: ["When variables/loops/maps feel automatic."],
    whenNotToUse: ["If HashMap still feels alien — stay on Collections chapter one more day."],
    interviewTips: ["Language first sentence: I will use a HashMap from value to index."],
    pitfalls: ["Jumping to Hard before ArrayList/HashMap are fluent."],
    practiceIdeas: [
      "Live Java: https://onecompiler.com/java",
      "Then start Retro DSA: /dsa/nc-contains-duplicate/",
      "LeetCode Java editor on Contains Duplicate (217).",
      "API bookmark: https://docs.oracle.com/en/java/javase/21/docs/api/",
    ],
    related: ["hashmap", "arraylist", "stack-queue"],
    depth: "advanced",
  }),
];
