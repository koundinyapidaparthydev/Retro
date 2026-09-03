"use client";

import type { ReactNode } from "react";
import type { DiagramNode, TopicDiagram } from "@/content/diagrams";
import { usePlayback } from "./usePlayback";

function boxClass(active: boolean, dim = false) {
  if (active) return "border-accent bg-accent text-paper";
  if (dim) return "border-line bg-white text-fog opacity-40";
  return "border-line bg-white text-ink";
}

function roleShape(role: DiagramNode["role"]) {
  if (role === "iface" || role === "cache") return "border-dashed";
  if (role === "state") return "rounded-full";
  if (role === "store" || role === "class") return "rounded-lg";
  if (role === "queue") return "rounded-full";
  if (role === "bit" || role === "cell") return "rounded-xl";
  return "rounded-2xl";
}

function NodeBox({
  node,
  active,
  dim,
  tag,
}: {
  node: DiagramNode;
  active: boolean;
  dim?: boolean;
  tag?: string;
}) {
  return (
    <div
      className={`min-w-14 px-3 py-2 text-center text-sm font-medium transition-all duration-500 ${roleShape(node.role)} border ${boxClass(active, dim)}`}
    >
      {node.label}
      {tag ? <div className="text-[10px] font-normal opacity-80">{tag}</div> : null}
    </div>
  );
}

function Chrome({
  title,
  playing,
  onToggle,
  children,
  note,
}: {
  title: string;
  playing: boolean;
  onToggle: () => void;
  children: ReactNode;
  note: string;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="eyebrow">{title}</p>
        <button type="button" onClick={onToggle} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      {children}
      <p className="mt-4 text-center text-sm leading-6 text-ink-soft">{note}</p>
    </div>
  );
}

function Cells({
  diagram,
  highlight,
  tags,
}: {
  diagram: TopicDiagram;
  highlight: Set<string>;
  tags?: Record<string, string>;
}) {
  const cells = (diagram.cells ?? diagram.nodes.filter((node) => node.role === "cell" || node.role === "bit")).map(
    (cell) => ({
      id: cell.id,
      value: "value" in cell ? cell.value : cell.label,
    }),
  );
  const windowed = diagram.kind === "window";
  const ids = cells.map((cell) => cell.id);
  const hi = ids.filter((id) => highlight.has(id));
  const min = hi.length ? Math.min(...hi.map((id) => ids.indexOf(id))) : -1;
  const max = hi.length ? Math.max(...hi.map((id) => ids.indexOf(id))) : -1;

  const leftId = Object.entries(tags ?? {}).find(([, tag]) => tag === "L")?.[0];
  const rightId = Object.entries(tags ?? {}).find(([, tag]) => tag === "R")?.[0];
  const leftVal = cells.find((cell) => cell.id === leftId)?.value;
  const rightVal = cells.find((cell) => cell.id === rightId)?.value;
  const showSum = diagram.kind === "pointers" && leftVal && rightVal;

  return (
    <div>
      {diagram.kind === "pointers" || windowed ? (
        <div className="mb-4 flex flex-wrap justify-center gap-3 text-xs text-slate">
          <span className="rounded-full bg-accent px-2 py-0.5 text-white">Looking now</span>
          <span className="rounded-full border border-line px-2 py-0.5">Ignored this step</span>
          {diagram.kind === "pointers" ? <span>L = left finger · R = right finger</span> : <span>Blue bar = the window</span>}
        </div>
      ) : null}
      <div className="flex flex-wrap items-end justify-center gap-2">
        {cells.map((cell, i) => {
          const active = windowed ? i >= min && i <= max && min >= 0 : highlight.has(cell.id);
          const tag = tags?.[cell.id] ?? "";
          const height = diagram.kind === "bars" ? 18 + (Number(cell.value) || i + 1) * 14 : undefined;
          if (diagram.kind === "bars") {
            return (
              <div key={cell.id} className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 rounded-t-lg transition-all duration-500 ${active ? "bg-accent" : "bg-sky-mid"}`}
                  style={{ height }}
                />
                <span className="text-sm font-medium">{cell.value}</span>
              </div>
            );
          }
          return (
            <div key={cell.id} className="flex w-16 flex-col items-center gap-1">
              {tag ? (
                <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold text-white">{tag}</span>
              ) : (
                <span className="h-5" />
              )}
              <div
                className={`flex h-16 w-16 flex-col items-center justify-center border text-lg font-semibold transition-all duration-500 ${roleShape("cell")} ${boxClass(active, windowed || diagram.kind === "pointers" ? !active : false)}`}
              >
                {cell.value}
              </div>
              <span className="text-[10px] text-fog">{i}</span>
            </div>
          );
        })}
      </div>
      {showSum ? (
        <p className="mt-4 text-center font-serif text-xl text-ink">
          {leftVal} + {rightVal} = {Number(leftVal) + Number(rightVal)}
        </p>
      ) : null}
    </div>
  );
}

function FlowRow({
  nodes,
  highlight,
  cut,
}: {
  nodes: DiagramNode[];
  highlight: Set<string>;
  cut?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {nodes.map((node, i) => (
        <div key={node.id} className="flex items-center gap-2">
          <NodeBox node={node} active={highlight.has(node.id)} />
          {i < nodes.length - 1 ? (
            <span className={`text-sm ${cut ? "text-ink line-through" : "text-fog"}`}>{cut ? "⟂" : "→"}</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function GraphSvg({ diagram, highlight }: { diagram: TopicDiagram; highlight: Set<string> }) {
  const placed = diagram.nodes.map((node, i) => {
    if (node.x != null && node.y != null) return node;
    const angle = (i / Math.max(diagram.nodes.length, 1)) * Math.PI * 2 - Math.PI / 2;
    return { ...node, x: 50 + 36 * Math.cos(angle), y: 50 + 36 * Math.sin(angle) };
  });
  const byId = new Map(placed.map((node) => [node.id, node]));

  return (
    <svg viewBox="0 0 100 100" className="mx-auto h-56 w-full max-w-md">
      {diagram.kind === "ring" ? (
        <circle cx="50" cy="50" r="36" fill="none" stroke="#c8c4bc" strokeWidth="1.2" strokeDasharray="3 3" />
      ) : null}
      {diagram.edges.map((edge) => {
        const a = byId.get(edge.from);
        const b = byId.get(edge.to);
        if (!a || !b || a.x == null || b.x == null || a.y == null || b.y == null) return null;
        const cut = edge.style === "cut";
        const lit = highlight.has(edge.from) && highlight.has(edge.to);
        return (
          <g key={`${edge.from}-${edge.to}`}>
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={cut ? "#1c1c1c" : lit ? "#2a2a2a" : "#d4d4d8"}
              strokeWidth={cut ? 2 : 1.4}
              strokeDasharray={cut || edge.style === "dashed" ? "3 2" : undefined}
            />
            {edge.label ? (
              <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 2} textAnchor="middle" fontSize="3.4" fill="#1c1c1c">
                {edge.label}
              </text>
            ) : null}
          </g>
        );
      })}
      {placed.map((node) => {
        const active = highlight.has(node.id);
        return (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={active ? 8 : 6.4}
              fill={active ? "#2a2a2a" : "#f3f1eb"}
              stroke="#2a2a2a"
              strokeWidth="1.2"
            />
            <text
              x={node.x}
              y={(node.y ?? 0) + 1.4}
              textAnchor="middle"
              fontSize="3.6"
              fill={active ? "#fff" : "#000"}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Lanes({
  diagram,
  highlight,
}: {
  diagram: TopicDiagram;
  highlight: Set<string>;
}) {
  const byId = new Map(diagram.nodes.map((node) => [node.id, node]));
  return (
    <div className={`grid gap-4 ${diagram.kind === "compare" || (diagram.lanes?.length ?? 0) > 1 ? "md:grid-cols-2" : ""}`}>
      {(diagram.lanes ?? []).map((lane) => (
        <div key={lane.id} className="rounded-2xl border border-line bg-sky-wash/50 p-3">
          <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-wide text-accent-deep">{lane.label}</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {lane.nodes.map((id, i) => {
              const node = byId.get(id);
              if (!node) return null;
              return (
                <div key={id} className="flex items-center gap-2">
                  <NodeBox node={node} active={highlight.has(id)} />
                  {i < lane.nodes.length - 1 ? <span className="text-fog">→</span> : null}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function GridTable({ diagram, highlight }: { diagram: TopicDiagram; highlight: Set<string> }) {
  const byId = new Map(diagram.nodes.map((node) => [node.id, node]));
  return (
    <div className="space-y-2">
      {(diagram.lanes ?? []).map((lane) => (
        <div key={lane.id} className="flex items-center gap-2">
          {lane.label ? <span className="w-14 shrink-0 text-right text-[11px] text-slate">{lane.label}</span> : null}
          <div className="flex flex-wrap gap-1.5">
            {lane.nodes.map((id) => {
              const node = byId.get(id);
              if (!node) return null;
              return (
                <div
                  key={id}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border text-xs font-medium transition-all duration-500 ${boxClass(highlight.has(id))}`}
                >
                  {node.label}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function StackCol({ nodes, highlight }: { nodes: DiagramNode[]; highlight: Set<string> }) {
  return (
    <div className="mx-auto flex w-36 flex-col-reverse gap-1.5">
      {nodes.map((node) => (
        <NodeBox key={node.id} node={node} active={highlight.has(node.id)} />
      ))}
    </div>
  );
}

function ListRow({ diagram, highlight }: { diagram: TopicDiagram; highlight: Set<string> }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      {diagram.nodes.map((node, i) => (
        <div key={node.id} className="flex items-center gap-1">
          <NodeBox node={node} active={highlight.has(node.id)} />
          {i < diagram.nodes.length - 1 ? <span className="text-accent-deep">→</span> : <span className="text-fog">✕</span>}
        </div>
      ))}
    </div>
  );
}

function Shaft({ diagram, highlight }: { diagram: TopicDiagram; highlight: Set<string> }) {
  const floors = diagram.nodes.filter((node) => node.role === "cell" || node.role === "actor");
  const rest = diagram.nodes.filter((node) => node.role === "queue" || node.role === "state");
  return (
    <div className="flex items-start justify-center gap-6">
      <div className="flex flex-col gap-1">
        {floors.map((node) => (
          <div
            key={node.id}
            className={`flex h-10 w-28 items-center justify-center border text-sm font-medium ${boxClass(highlight.has(node.id))} ${node.role === "actor" ? "rounded-xl bg-sky-wash" : "rounded-md"}`}
          >
            {node.label}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {rest.map((node) => (
          <NodeBox key={node.id} node={node} active={highlight.has(node.id)} />
        ))}
      </div>
    </div>
  );
}

function Layers({ nodes, highlight }: { nodes: DiagramNode[]; highlight: Set<string> }) {
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-2">
      {nodes.map((node) => (
        <div
          key={node.id}
          className={`px-4 py-3 text-center text-sm font-medium transition-all duration-500 rounded-2xl border ${boxClass(highlight.has(node.id))}`}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}

export function DesignVisual({ diagram }: { diagram: TopicDiagram }) {
  const frames = diagram.frames.length ? diagram.frames : [{ highlight: diagram.nodes[0] ? [diagram.nodes[0].id] : [], note: diagram.caption }];
  const { index, playing, toggle } = usePlayback(frames.length, 1700);
  const frame = frames[index];
  const highlight = new Set(frame.highlight);
  const kind = diagram.kind;

  let body: ReactNode;
  if (kind === "array" || kind === "window" || kind === "pointers" || kind === "bars") {
    body = <Cells diagram={diagram} highlight={highlight} tags={frame.tags} />;
  } else if (kind === "dp-table") {
    body = <GridTable diagram={diagram} highlight={highlight} />;
  } else if (kind === "graph" || kind === "ring" || kind === "mesh" || kind === "trie" || kind === "heap" || kind === "tree" || kind === "rec-tree" || kind === "union-find") {
    body = <GraphSvg diagram={diagram} highlight={highlight} />;
  } else if (kind === "list") {
    body = <ListRow diagram={diagram} highlight={highlight} />;
  } else if (kind === "stack") {
    body = <StackCol nodes={diagram.nodes} highlight={highlight} />;
  } else if (kind === "queue") {
    body = <FlowRow nodes={diagram.nodes} highlight={highlight} />;
  } else if (kind === "shaft") {
    body = <Shaft diagram={diagram} highlight={highlight} />;
  } else if (kind === "layers") {
    body = <Layers nodes={diagram.nodes} highlight={highlight} />;
  } else if (kind === "bits") {
    body = (
      <div className="flex justify-center gap-1">
        {diagram.nodes.map((node) => (
          <div
            key={node.id}
            className={`flex h-12 w-12 items-center justify-center rounded-lg border font-mono text-lg ${boxClass(highlight.has(node.id))}`}
          >
            {node.label}
          </div>
        ))}
      </div>
    );
  } else if (kind === "cut") {
    body = (
      <div className="space-y-4">
        <FlowRow nodes={diagram.nodes.filter((node) => node.role === "store" || node.role === "client")} highlight={highlight} cut />
        <div className="text-center text-xs font-medium uppercase tracking-wide text-accent-deep">partition</div>
        <div className="flex flex-wrap justify-center gap-3">
          {diagram.nodes
            .filter((node) => node.role === "policy")
            .map((node) => (
              <NodeBox key={node.id} node={node} active={highlight.has(node.id)} />
            ))}
        </div>
      </div>
    );
  } else if (kind === "split" || kind === "compare" || diagram.lanes?.length) {
    body = <Lanes diagram={diagram} highlight={highlight} />;
  } else if (kind === "fanout" || kind === "fanin") {
    const src = diagram.nodes[0];
    const rest = diagram.nodes.slice(1);
    body = (
      <div className="flex flex-col items-center gap-3">
        {src ? <NodeBox node={src} active={highlight.has(src.id)} /> : null}
        <span className="text-fog">{kind === "fanout" ? "↓ fan-out" : "↑ fan-in"}</span>
        <div className="flex flex-wrap justify-center gap-2">
          {rest.map((node) => (
            <NodeBox key={node.id} node={node} active={highlight.has(node.id)} />
          ))}
        </div>
      </div>
    );
  } else if (kind === "classes" || kind === "sequence" || kind === "states" || kind === "decision" || kind === "cycle" || kind === "timeline" || kind === "buckets") {
    body = (
      <div className="space-y-3">
        <FlowRow nodes={diagram.nodes} highlight={highlight} />
        {diagram.edges[0]?.label ? (
          <p className="text-center text-xs text-slate">
            {diagram.edges.map((edge) => edge.label).filter(Boolean).join(" · ")}
          </p>
        ) : null}
      </div>
    );
  } else {
    body = <FlowRow nodes={diagram.nodes} highlight={highlight} />;
  }

  return (
    <Chrome title={diagram.title} playing={playing} onToggle={toggle} note={frame.note || diagram.caption}>
      {body}
    </Chrome>
  );
}
