"use client";

import { usePlayback } from "./usePlayback";

const NODES = [
  { id: "A", x: 50, y: 18 },
  { id: "B", x: 22, y: 48 },
  { id: "C", x: 78, y: 48 },
  { id: "D", x: 22, y: 82 },
  { id: "E", x: 78, y: 82 },
];

const EDGES: [string, string][] = [
  ["A", "B"],
  ["A", "C"],
  ["B", "D"],
  ["C", "E"],
];

const ORDER = ["A", "B", "C", "D", "E"];

export function GraphVisual() {
  const { index, playing, toggle } = usePlayback(ORDER.length, 1400);
  const seen = new Set(ORDER.slice(0, index + 1));
  const current = ORDER[index];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="eyebrow">Visit closest first</p>
        <button type="button" onClick={toggle} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      <svg viewBox="0 0 100 100" className="mx-auto h-56 w-full max-w-md">
        {EDGES.map(([a, b]) => {
          const na = NODES.find((n) => n.id === a)!;
          const nb = NODES.find((n) => n.id === b)!;
          const lit = seen.has(a) && seen.has(b);
          return (
            <line
              key={a + b}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={lit ? "#4984fd" : "#d4d4d8"}
              strokeWidth="1.4"
            />
          );
        })}
        {NODES.map((node) => {
          const active = node.id === current;
          const visited = seen.has(node.id);
          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={active ? 8 : 6.5}
                fill={active ? "#4984fd" : visited ? "#9cc6ff" : "#fff"}
                stroke="#4984fd"
                strokeWidth="1.2"
              />
              <text
                x={node.x}
                y={node.y + 1.2}
                textAnchor="middle"
                fontSize="5"
                fill={active ? "#fff" : "#000"}
                fontFamily="inherit"
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-center text-sm text-ink-soft">
        Now visiting <span className="font-medium text-ink">{current}</span>
        {index === 0 ? " — the start." : ". Already seen: " + ORDER.slice(0, index).join(", ") + "."}
      </p>
    </div>
  );
}
