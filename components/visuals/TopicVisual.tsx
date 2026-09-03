"use client";

import type { Topic } from "@/content/schema";
import { topicDiagram } from "@/lib/diagrams";
import { DesignVisual } from "./DesignVisual";

export function TopicVisual({ topic }: { topic: Topic }) {
  const diagram = topicDiagram(topic);
  return (
    <div className="sky-card p-6">
      <DesignVisual diagram={diagram} />
    </div>
  );
}
