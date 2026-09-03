import Link from "next/link";
import type { Topic } from "@/content/schema";
import { topicPath } from "@/content/catalog";
import { easyDefinition } from "@/lib/explain";
import { DepthBadge } from "./DepthBadge";

export function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link href={topicPath(topic)} className="sky-card group block p-5 transition">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-medium text-ink group-hover:text-accent-deep">{topic.title}</h3>
        <DepthBadge depth={topic.depth} />
      </div>
      <p className="mt-2 text-sm leading-6 text-slate">{easyDefinition(topic)}</p>
    </Link>
  );
}
