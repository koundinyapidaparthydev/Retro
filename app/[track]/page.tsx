import { notFound } from "next/navigation";
import {
  categoriesFor,
  groupByCategory,
  isTrack,
  topicsFor,
  TRACKS,
  trackStats,
} from "@/content/catalog";
import { TopicCard } from "@/components/TopicCard";
import { TrackStats } from "@/components/TrackStats";
import { DepthBadge } from "@/components/DepthBadge";
import type { Depth } from "@/content/schema";

export function generateStaticParams() {
  return [{ track: "dsa" }, { track: "hld" }, { track: "lld" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track } = await params;
  if (!isTrack(track)) return {};
  return { title: TRACKS[track].label };
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track } = await params;
  if (!isTrack(track)) notFound();

  const meta = TRACKS[track];
  const topics = topicsFor(track);
  const groups = groupByCategory(topics);
  const stats = trackStats(track);
  const cats = categoriesFor(track);

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-dim">
        track · {track}
      </p>
      <h1 className="mt-2 text-4xl font-medium tracking-tight">{meta.full}</h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-muted">{meta.blurb}</p>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <TrackStats track={track} total={stats.total} />
        <div className="flex gap-2">
          {(["core", "next", "advanced"] as Depth[]).map((depth) => (
            <span key={depth} className="flex items-center gap-2 text-xs text-muted">
              <DepthBadge depth={depth} />
              <span className="font-mono">{stats[depth]}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {cats.map((category) => (
          <a
            key={category}
            href={`#${slugify(category)}`}
            className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted hover:border-amber hover:text-amber"
          >
            {category}
          </a>
        ))}
      </div>

      <div className="mt-10 space-y-12">
        {groups.map((group) => (
          <section key={group.category} id={slugify(group.category)}>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
              {group.category}
              <span className="ml-3 text-muted">{group.topics.length}</span>
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {group.topics.map((topic) => (
                <TopicCard key={topic.slug} topic={topic} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
