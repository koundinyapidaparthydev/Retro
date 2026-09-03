import { CRAFTED } from "@/content/crafted-diagrams";
import type { DiagramKind, NodeRole, TopicDiagram } from "@/content/diagrams";
import { diagram } from "@/content/diagrams";
import type { Topic } from "@/content/schema";

function hash(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function clip(text: string, max = 22): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

function seededValues(slug: string, n: number, start = 1): number[] {
  let h = hash(slug) || 1;
  const out: number[] = [];
  let v = start + (h % 6);
  for (let i = 0; i < n; i++) {
    out.push(v);
    h = (Math.imul(h, 1103515245) + 12345) >>> 0;
    v += 1 + (h % 4);
  }
  return out;
}

function cellsFrom(values: Array<string | number>) {
  return values.map((value, i) => ({ id: String(i), value: String(value) }));
}

function stepLabels(topic: Topic, n = 4): string[] {
  const fromHow = topic.howItWorks.map((step) => clip(step, 18));
  if (fromHow.length >= n) return fromHow.slice(0, n);
  const extra = topic.title.split(/[:/,—-]/).map((part) => clip(part, 16)).filter(Boolean);
  return [...fromHow, ...extra, topic.slug].slice(0, n);
}

function pick<T>(slug: string, options: T[]): T {
  return options[hash(slug) % options.length];
}

const HLD_KINDS: DiagramKind[] = [
  "flow",
  "split",
  "fanout",
  "fanin",
  "layers",
  "compare",
  "decision",
  "cycle",
  "buckets",
  "mesh",
  "timeline",
  "cut",
];

const LLD_KINDS: DiagramKind[] = [
  "classes",
  "sequence",
  "states",
  "tree",
  "layers",
  "compare",
  "decision",
  "fanout",
  "cycle",
];

function hldKind(topic: Topic): DiagramKind {
  const s = `${topic.slug} ${topic.title} ${topic.category}`.toLowerCase();
  if (/cap|partition|split-brain|pacelc/.test(s)) return "cut";
  if (/hash|ring|consistent/.test(s)) return "ring";
  if (/kafka|queue|pubsub|stream|fan-out|fanout|notif/.test(s)) return "fanout";
  if (/load.balanc|gateway|anycast/.test(s)) return "fanin";
  if (/shard|bucket|partition|index/.test(s)) return "buckets";
  if (/vs |versus|sql|mono|acid|oltp/.test(s)) return "compare";
  if (/circuit|limit|retry|hedg|fallback/.test(s)) return "decision";
  if (/saga|outbox|cdc|deploy|canary/.test(s)) return "cycle";
  if (/layer|mesh|cdn|encrypt|privilege/.test(s)) return "layers";
  if (/repl|primary|multi-az|active/.test(s)) return "split";
  if (/method|estimate|slo|percent/.test(s)) return "timeline";
  return pick(topic.slug, HLD_KINDS);
}

function lldKind(topic: Topic): DiagramKind {
  const s = `${topic.slug} ${topic.title} ${topic.category}`.toLowerCase();
  if (/state|elevator|vending|traffic|atm/.test(s)) return "states";
  if (/sequence|signatur|use-case/.test(s)) return "sequence";
  if (/observer|pub.sub|event.bus|notif/.test(s)) return "fanout";
  if (/strategy|factory|adapter|decorator|proxy|bridge|visitor|command/.test(s)) return "classes";
  if (/hexagon|layer|clean|mvc|dip/.test(s)) return "layers";
  if (/parking|hotel|library|composite|aggregate/.test(s)) return "tree";
  if (/producer|queue|pool|buffer/.test(s)) return "flow";
  if (/solid|dry|kiss|yagni|vs /.test(s)) return "compare";
  if (/singleton|fail.fast|invariant/.test(s)) return "decision";
  return pick(topic.slug, LLD_KINDS);
}

function dsaKind(topic: Topic): DiagramKind {
  const s = `${topic.slug} ${topic.category}`.toLowerCase();
  if (/union-find|kruskal/.test(s)) return "union-find";
  if (/trie|suffix/.test(s)) return "trie";
  if (/heap|huffman|top-k|median/.test(s)) return "heap";
  if (/dijkstra|bellman|floyd|bfs|dfs|topo|graph|island|bipartite|scc|bridge|euler|a-star|prim/.test(s)) {
    return "graph";
  }
  if (/knapsack|lcs|edit|grid-dp|matrix-chain|palindrome-dp|interval-dp|bitmask-dp|tree-dp|digit-dp|burst/.test(s)) {
    return "dp-table";
  }
  if (/coin-change|fibonacci|climbing|house-robber|lis|kadane|prefix/.test(s)) return "array";
  if (/window/.test(s)) return "window";
  if (/pointer|two-sum/.test(s)) return "pointers";
  if (/sort|dutch|rotate/.test(s)) return "bars";
  if (/list|floyd-cycle|lru/.test(s)) return "list";
  if (/stack|parenthes|histogram/.test(s)) return "stack";
  if (/queue|deque/.test(s)) return "queue";
  if (/bit|xor|kernighan|mask/.test(s)) return "bits";
  if (/recur|subset|permut|combin|queen|sudoku|parenthes|divide/.test(s)) return "rec-tree";
  if (/tree|lca|bst|serialize|invert|path-sum|segment|fenwick|sparse/.test(s)) return "tree";
  if (/hash|anagram|consecutive|design-hash/.test(s)) return "buckets";
  if (/search|sieve|gcd|mod|catalan|factor/.test(s)) return "array";
  if (/kmp|rabin|z-alg|manacher|string/.test(s)) return "array";
  return pick(topic.slug, ["array", "flow", "decision", "timeline"]);
}

function rolesFor(kind: DiagramKind, i: number): NodeRole {
  const ring: NodeRole[] = ["client", "service", "cache", "store", "queue", "worker", "policy", "edge"];
  if (kind === "classes") return (["class", "iface", "policy", "class"] as NodeRole[])[i % 4];
  if (kind === "states") return "state";
  if (kind === "bits") return "bit";
  return ring[i % ring.length];
}

function generateHld(topic: Topic): TopicDiagram {
  const kind = hldKind(topic);
  const labels = stepLabels(topic, 5);
  const nodes = labels.map((label, i) => [String(i), label, rolesFor(kind, i)] as [string, string, NodeRole]);
  const edges = nodes.slice(1).map((_, i) => [String(i), String(i + 1), clip(topic.howItWorks[i] ?? "", 14)] as [string, string, string]);
  const frames = nodes.map((node, i) => [[node[0]], topic.howItWorks[i] ?? node[1]] as [string[], string]);
  return diagram(kind, topic.title, nodes, edges, clip(topic.summary, 140), frames.length ? frames : [[["0"], topic.summary]]);
}

function generateLld(topic: Topic): TopicDiagram {
  const kind = lldKind(topic);
  const raw = [topic.title, ...topic.howItWorks, ...topic.whenToUse].map((line) => clip(line, 16));
  const labels = [...new Set(raw)].slice(0, 5);
  const nodes = labels.map((label, i) => {
    const role: NodeRole = kind === "states" ? "state" : kind === "classes" && i === 1 ? "iface" : rolesFor(kind, i);
    return [String(i), label, role] as [string, string, NodeRole];
  });
  const edges = nodes.slice(1).map((_, i) => {
    const style = kind === "classes" && i === 0 ? ("dashed" as const) : undefined;
    return [String(0), String(i + 1), clip(topic.howItWorks[i] ?? "uses", 12), style] as [string, string, string, typeof style];
  });
  const frames = nodes.map((node, i) => [[node[0]], topic.howItWorks[i] ?? `${topic.title}: ${node[1]}`] as [string[], string]);
  return diagram(kind, topic.title, nodes, edges, clip(topic.summary, 140), frames);
}

function generateDsa(topic: Topic): TopicDiagram {
  const kind = dsaKind(topic);
  const values = seededValues(topic.slug, 6);
  const frames = topic.howItWorks.slice(0, 4).map((note, i) => {
    const highlight = [String(i % 6), String((i + 1) % 6)];
    const tags: Record<string, string> = { [String(i % 6)]: "i" };
    return [highlight, note, tags] as [string[], string, Record<string, string>];
  });

  if (kind === "array" || kind === "window" || kind === "pointers" || kind === "bars") {
    return diagram(kind, topic.title, [], [], clip(topic.summary, 140), frames, { cells: cellsFrom(values) });
  }

  if (kind === "bits") {
    const bits = values.map((v) => (v % 2).toString());
    const nodes = bits.map((bit, i) => [String(i), bit, "bit"] as [string, string, NodeRole]);
    return diagram("bits", topic.title, nodes, [], clip(topic.summary, 140), frames);
  }

  if (kind === "dp-table") {
    const cols = 4;
    const rows = 3;
    const nodes: [string, string, NodeRole][] = [];
    const lanes = [];
    for (let r = 0; r < rows; r++) {
      const ids: string[] = [];
      for (let c = 0; c < cols; c++) {
        const id = `${r}-${c}`;
        ids.push(id);
        nodes.push([id, String((values[c] + r) % 9), "cell"]);
      }
      lanes.push({ id: `r${r}`, label: `${clip(topic.slug, 8)} r${r}`, nodes: ids });
    }
    return diagram("dp-table", topic.title, nodes, [], clip(topic.summary, 140), frames, { layout: "grid", lanes });
  }

  if (kind === "graph" || kind === "mesh" || kind === "trie" || kind === "heap" || kind === "tree" || kind === "rec-tree" || kind === "union-find") {
    const labels = ["A", "B", "C", "D", "E"].map((letter, i) => `${letter}${values[i] % 10}`);
    const pos = [
      [50, 14],
      [22, 42],
      [78, 42],
      [22, 78],
      [78, 78],
    ];
    const nodes = labels.map((label, i) => [String(i), label, i === 0 ? "actor" : "cell", pos[i][0], pos[i][1]] as [string, string, NodeRole, number, number]);
    const edges: [string, string, string?][] = [
      ["0", "1", clip(topic.howItWorks[0] ?? "", 10)],
      ["0", "2"],
      ["1", "3"],
      ["2", "4"],
    ];
    return diagram(kind, topic.title, nodes, edges, clip(topic.summary, 140), frames);
  }

  if (kind === "list") {
    const nodes = values.slice(0, 4).map((value, i) => [String(i), String(value), "cell"] as [string, string, NodeRole]);
    const edges = nodes.slice(1).map((_, i) => [String(i), String(i + 1), "next"] as [string, string, string]);
    return diagram("list", topic.title, nodes, edges, clip(topic.summary, 140), frames);
  }

  if (kind === "stack" || kind === "queue") {
    const nodes = values.slice(0, 3).map((value, i) => [String(i), String(value), "cell"] as [string, string, NodeRole]);
    return diagram(kind, topic.title, nodes, [], clip(topic.summary, 140), frames);
  }

  if (kind === "buckets") {
    const nodes = [
      ["k", clip(topic.title, 12), "client"],
      ["h", "hash", "service"],
      ...values.slice(0, 3).map((value, i) => [String(i), `b${value % 5}`, "store"] as [string, string, NodeRole]),
    ] as [string, string, NodeRole][];
    const edges: [string, string, string?][] = [
      ["k", "h"],
      ["h", "0"],
    ];
    return diagram("buckets", topic.title, nodes, edges, clip(topic.summary, 140), frames);
  }

  return generateHld(topic);
}

export function topicDiagram(topic: Topic): TopicDiagram {
  const crafted = CRAFTED[`${topic.track}:${topic.slug}`] ?? CRAFTED[topic.slug];
  if (crafted) return crafted;
  if (topic.track === "dsa") return generateDsa(topic);
  if (topic.track === "lld") return generateLld(topic);
  return generateHld(topic);
}

export function diagramFingerprint(diagrams: TopicDiagram): string {
  return [
    diagrams.kind,
    diagrams.title,
    ...diagrams.nodes.map((node) => node.label),
    ...(diagrams.cells ?? []).map((cell) => cell.value),
    ...diagrams.edges.map((edge) => `${edge.from}>${edge.to}:${edge.label ?? ""}`),
    diagrams.caption,
  ].join("|");
}
