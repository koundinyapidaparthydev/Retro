import { run, type CodeRun } from "./types";

/** Dry-runs for the Java fundamentals track. */
export const JAVA_FUND_RUNS: Record<string, CodeRun> = {
  "hello-java": run(
    "smallest program",
    `public class Hello {
  public static void main(String[] args) {
    System.out.println("Hello");
  }
}`,
    ["Hello"],
  ),

  "online-playgrounds": run(
    "same snippet anywhere",
    `System.out.println("paste me into OneCompiler / Programiz / JDoodle");
System.out.println("press Run");
System.out.println("read the green output panel");`,
    [
      "paste me into OneCompiler / Programiz / JDoodle",
      "press Run",
      "read the green output panel",
    ],
  ),

  "variables-types": run(
    "declare and print",
    `int n = 42;
long big = 1_000_000_000L;
boolean ok = true;
char c = 'A';
System.out.println("n=" + n);
System.out.println("big=" + big);
System.out.println("ok=" + ok + " c=" + c);`,
    ["n=42", "big=1000000000", "ok=true c=A"],
  ),

  "strings-basics": run(
    "length, charAt, equals",
    `String s = "code";
System.out.println("len=" + s.length());
System.out.println("first=" + s.charAt(0));
System.out.println("equals code? " + s.equals("code"));
System.out.println("== literal? " + (s == "code"));`,
    ["len=4", "first=c", "equals code? true", "== literal? true"],
  ),

  "operators-if": run(
    "pick the larger",
    `int a = 7, b = 11;
if (a > b) System.out.println("a");
else if (b > a) System.out.println("b");
else System.out.println("tie");
int m = a > b ? a : b;
System.out.println("max=" + m);`,
    ["b", "max=11"],
  ),

  loops: run(
    "index loop + for-each",
    `int n = 3;
for (int i = 0; i < n; i++) System.out.println("i=" + i);
int[] nums = {9, 8, 7};
int sum = 0;
for (int x : nums) sum += x;
System.out.println("sum=" + sum);`,
    ["i=0", "i=1", "i=2", "sum=24"],
  ),

  "arrays-fixed": run(
    "allocate, set, print",
    `import java.util.Arrays;
int[] a = new int[3];
a[0] = 1; a[1] = 2; a[2] = 3;
a[1] = 9;
System.out.println(Arrays.toString(a));
System.out.println("len=" + a.length);`,
    ["[1, 9, 3]", "len=3"],
  ),

  stringbuilder: run(
    "append in a loop",
    `StringBuilder sb = new StringBuilder();
for (char c : "hi".toCharArray()) sb.append(c).append('-');
System.out.println(sb.toString());
System.out.println(sb.reverse().toString());`,
    ["h-i-", "-i-h"],
  ),

  methods: run(
    "static max helper",
    `static int max(int a, int b) {
  return a > b ? a : b;
}
System.out.println(max(3, 8));
System.out.println(max(8, 3));`,
    ["8", "8"],
  ),

  "classes-objects": run(
    "tiny list node",
    `class ListNode {
  int val; ListNode next;
  ListNode(int v) { val = v; }
}
ListNode head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
for (ListNode cur = head; cur != null; cur = cur.next) {
  System.out.println(cur.val);
}`,
    ["1", "2", "3"],
  ),

  "null-refs": run(
    "guard before touch",
    `String s = null;
int len = (s == null) ? 0 : s.length();
System.out.println("len=" + len);
s = "ok";
System.out.println("len=" + s.length());`,
    ["len=0", "len=2"],
  ),

  arraylist: run(
    "growable list",
    `import java.util.*;
List<Integer> a = new ArrayList<>();
a.add(3); a.add(1); a.add(4);
System.out.println("size=" + a.size());
System.out.println("get0=" + a.get(0));
for (int v : a) System.out.println(v);`,
    ["size=3", "get0=3", "3", "1", "4"],
  ),

  hashmap: run(
    "Two Sum map sketch",
    `import java.util.*;
int[] nums = {2, 7, 11, 15};
int target = 9;
Map<Integer, Integer> seen = new HashMap<>();
for (int i = 0; i < nums.length; i++) {
  int need = target - nums[i];
  if (seen.containsKey(need)) {
    System.out.println(seen.get(need) + " " + i);
    break;
  }
  seen.put(nums[i], i);
  System.out.println("put " + nums[i]);
}`,
    ["put 2", "0 1"],
  ),

  "stack-queue": run(
    "Deque as stack",
    `import java.util.*;
Deque<Character> st = new ArrayDeque<>();
for (char c : "([])".toCharArray()) {
  if (c == '(' || c == '[') st.push(c);
  else {
    char open = st.pop();
    System.out.println("match " + open + c);
  }
}
System.out.println("empty? " + st.isEmpty());`,
    ["match []", "match ()", "empty? true"],
  ),

  "priority-queue": run(
    "min-heap polls",
    `import java.util.*;
PriorityQueue<Integer> pq = new PriorityQueue<>();
for (int x : new int[]{5, 1, 4}) pq.offer(x);
while (!pq.isEmpty()) System.out.println(pq.poll());`,
    ["1", "4", "5"],
  ),

  "sorting-java": run(
    "Arrays.sort",
    `import java.util.Arrays;
int[] nums = {5, 1, 4, 2};
Arrays.sort(nums);
System.out.println(Arrays.toString(nums));`,
    ["[1, 2, 4, 5]"],
  ),

  "recursion-java": run(
    "factorial call stack",
    `static int fac(int n) {
  if (n <= 1) return 1;
  return n * fac(n - 1);
}
System.out.println(fac(4));`,
    ["24"],
  ),

  "java-for-neetcode": run(
    "imports you will type",
    `import java.util.*;
// class Solution {
//   public boolean containsDuplicate(int[] nums) {
Set<Integer> seen = new HashSet<>();
for (int x : new int[]{1, 2, 3, 1}) {
  if (!seen.add(x)) { System.out.println("dup " + x); break; }
  System.out.println("add " + x);
}
//   }
// }`,
    ["add 1", "add 2", "add 3", "dup 1"],
  ),
};
