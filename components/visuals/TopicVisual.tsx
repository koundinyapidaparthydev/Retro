"use client";

import type { Topic } from "@/content/schema";
import { flowSteps } from "@/lib/explain";
import { topicDiagram } from "@/lib/diagrams";
import { DesignVisual } from "./DesignVisual";
import { FlowPlayer } from "./FlowPlayer";

export function TopicVisual({ topic }: { topic: Topic }) {
  const steps = flowSteps(topic);
  const diagram = topicDiagram(topic);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="sky-card p-5">
        <DesignVisual diagram={diagram} />
      </div>
      <div className="sky-card p-5">
        <FlowPlayer steps={steps} />
      </div>
    </div>
  );
}
