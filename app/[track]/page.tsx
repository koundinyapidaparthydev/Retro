import { notFound } from "next/navigation";
import {
  categoriesFor,
  categoryLabel,
  groupByCategory,
  isTrack,
  topicsFor,
  TRACKS,
  trackStats,
} from "@/content/catalog";
import { TopicCard } from "@/components/TopicCard";
import { TrackStats } from "@/components/TrackStats";
import { DepthBadge } from "@/components/DepthBadge";
import { AskHeatmap } from "@/components/AskHeatmap";
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
  const groups = groupByCategory(topics, track);
  const stats = trackStats(track);
  const cats = categoriesFor(track);

  return (
    <div>
      <p className="eyebrow">Track · {track}</p>
      <h1 className="mt-3 font-serif text-5xl leading-tight tracking-tight">{meta.full}</h1>
      <p className="mt-3 max-w-2xl text-lg leading-8 text-ink-soft">{meta.blurb}</p>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <TrackStats track={track} total={stats.total} />
        <div className="flex gap-2">
          {(["core", "next", "advanced"] as Depth[]).map((depth) => (
            <span key={depth} className="flex items-center gap-2 text-sm text-slate">
              <DepthBadge depth={depth} />
              <span>{stats[depth]}</span>
            </span>
          ))}
        </div>
      </div>

      <AskHeatmap track={track} />

      <div className="mt-6 flex flex-wrap gap-2">
        {cats.map((category) => (
          <a
            key={category}
            href={`#${slugify(category)}`}
            className="rounded-full border border-line bg-white px-3 py-1 text-xs text-slate hover:border-accent hover:text-accent-deep"
          >
            {categoryLabel(track, category)}
          </a>
        ))}
      </div>

      <div className="mt-10 space-y-12">
        {groups.map((group) => (
          <section key={group.category} id={slugify(group.category)}>
            <h2 className="font-serif text-2xl text-ink">
              {categoryLabel(track, group.category)}
              <span className="ml-2 text-base text-fog">{group.topics.length}</span>
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
