import Link from "next/link";
import type { Topic } from "@/content/schema";
import { topicPath } from "@/content/catalog";
import { DepthBadge } from "./DepthBadge";

export function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link
      href={topicPath(topic)}
      className="crt-glow group block bg-panel p-4 transition hover:border-amber"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-medium text-ink group-hover:text-amber">{topic.title}</h3>
        <DepthBadge depth={topic.depth} />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{topic.summary}</p>
    </Link>
  );
}
