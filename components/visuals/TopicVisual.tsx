"use client";

import type { Topic } from "@/content/schema";
import { flowSteps, visualKind } from "@/lib/explain";
import { ArraySearchVisual } from "./ArraySearchVisual";
import { FlowPlayer } from "./FlowPlayer";
import { GraphVisual } from "./GraphVisual";
import { MessageVisual } from "./MessageVisual";
import { PipelineVisual } from "./PipelineVisual";
import { PointerVisual } from "./PointerVisual";
import { SortVisual } from "./SortVisual";

export function TopicVisual({ topic }: { topic: Topic }) {
  const kind = visualKind(topic);
  const steps = flowSteps(topic);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="sky-card p-5">
        {kind === "binary-search" || kind === "linear-search" ? (
          <ArraySearchVisual mode={kind} />
        ) : kind === "two-pointers" || kind === "sliding-window" ? (
          <PointerVisual mode={kind} />
        ) : kind === "bfs" ? (
          <GraphVisual />
        ) : kind === "sort" ? (
          <SortVisual />
        ) : kind === "pipeline" ? (
          <PipelineVisual />
        ) : kind === "messages" ? (
          <MessageVisual />
        ) : (
          <p className="text-sm text-slate">Follow the steps on the right. Same idea, smaller picture.</p>
        )}
      </div>
      <div className="sky-card p-5">
        <FlowPlayer steps={steps} />
      </div>
    </div>
  );
}
