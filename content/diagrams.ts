export type NodeRole =
  | "client"
  | "edge"
  | "service"
  | "cache"
  | "store"
  | "queue"
  | "worker"
  | "class"
  | "iface"
  | "state"
  | "actor"
  | "policy"
  | "cut"
  | "cell"
  | "bit";

export type DiagramKind =
  | "flow"
  | "split"
  | "ring"
  | "fanout"
  | "fanin"
  | "cut"
  | "layers"
  | "classes"
  | "sequence"
  | "states"
  | "tree"
  | "compare"
  | "cycle"
  | "buckets"
  | "mesh"
  | "decision"
  | "timeline"
  | "shaft"
  | "array"
  | "window"
  | "pointers"
  | "bars"
  | "heap"
  | "trie"
  | "graph"
  | "dp-table"
  | "union-find"
  | "list"
  | "stack"
  | "queue"
  | "bits"
  | "rec-tree";

export type DiagramNode = {
  id: string;
  label: string;
  role: NodeRole;
  note?: string;
  x?: number;
  y?: number;
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
  style?: "solid" | "dashed" | "cut";
};

export type DiagramFrame = {
  highlight: string[];
  note: string;
  tags?: Record<string, string>;
};

export type DiagramLane = {
  id: string;
  label: string;
  nodes: string[];
};

export type DiagramCell = {
  id: string;
  value: string;
};

export type TopicDiagram = {
  kind: DiagramKind;
  title: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  caption: string;
  frames: DiagramFrame[];
  lanes?: DiagramLane[];
  layout?: "row" | "wrap" | "stack" | "grid";
  cells?: DiagramCell[];
};

export function diagram(
  kind: DiagramKind,
  title: string,
  nodes: [id: string, label: string, role: NodeRole, x?: number, y?: number][],
  edges: [from: string, to: string, label?: string, style?: DiagramEdge["style"]][],
  caption: string,
  frames: [highlight: string[], note: string, tags?: Record<string, string>][],
  extra?: Partial<Pick<TopicDiagram, "lanes" | "layout" | "cells">>,
): TopicDiagram {
  return {
    kind,
    title,
    nodes: nodes.map(([id, label, role, x, y]) => ({ id, label, role, x, y })),
    edges: edges.map(([from, to, label, style]) => ({
      from,
      to,
      label,
      style: style ?? (label === "partition" ? "cut" : "solid"),
    })),
    caption,
    frames: frames.map(([highlight, note, tags]) => ({ highlight, note, tags })),
    ...extra,
  };
}
