import type { Depth, Topic, TrackId } from "./schema";
import { TRACKS } from "./schema";
import { aiTopics } from "./ai";
import { dsaTopics } from "./dsa";
import { hldTopics } from "./hld";
import { lldTopics } from "./lld";
import { categoryLabel, depthRank, orderedCategories, sortTopicsForListing } from "./order";

export { TRACKS, categoryLabel };
export type { Depth, Topic, TrackId };

export const allTopics: Topic[] = [...dsaTopics, ...hldTopics, ...lldTopics, ...aiTopics];

const byKey = new Map(allTopics.map((topic) => [`${topic.track}:${topic.slug}`, topic]));

export function isTrack(value: string): value is TrackId {
  return value === "dsa" || value === "hld" || value === "lld" || value === "ai";
}

export function topicsFor(track: TrackId): Topic[] {
  return sortTopicsForListing(
    allTopics.filter((topic) => topic.track === track),
    track,
  );
}

export function getTopic(track: TrackId, slug: string): Topic | undefined {
  return byKey.get(`${track}:${slug}`);
}

export function topicPath(topic: Topic): string {
  return `/${topic.track}/${topic.slug}`;
}

export function resolveRelated(from: Topic, slug: string): Topic | undefined {
  return (
    allTopics.find((topic) => topic.slug === slug && topic.track === from.track) ??
    allTopics.find((topic) => topic.slug === slug)
  );
}

export function categoriesFor(track: TrackId): string[] {
  const found: string[] = [];
  const seen = new Set<string>();
  for (const topic of topicsFor(track)) {
    if (!seen.has(topic.category)) {
      seen.add(topic.category);
      found.push(topic.category);
    }
  }
  return orderedCategories(track, found);
}

export function groupByCategory(topics: Topic[], track?: TrackId): { category: string; topics: Topic[] }[] {
  const groups = new Map<string, Topic[]>();
  for (const topic of topics) {
    const list = groups.get(topic.category) ?? [];
    list.push(topic);
    groups.set(topic.category, list);
  }
  const inferred = track ?? topics[0]?.track;
  const order = inferred ? categoriesFor(inferred) : [...groups.keys()];
  return order
    .filter((category) => groups.has(category))
    .map((category) => ({
      category,
      topics: inferred ? sortTopicsForListing(groups.get(category) ?? [], inferred) : (groups.get(category) ?? []),
    }));
}

export function searchTopics(query: string, track?: TrackId): Topic[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const pool = track ? topicsFor(track) : allTopics;
  return pool
    .filter((topic) => {
      const hay = [
        topic.title,
        topic.summary,
        topic.category,
        topic.whyItMatters,
        ...topic.theory,
        ...topic.howItWorks,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    })
    .sort((a, b) => {
      const depth = depthRank(a.depth) - depthRank(b.depth);
      if (depth) return depth;
      if (a.track !== b.track) return a.track.localeCompare(b.track);
      return a.title.localeCompare(b.title);
    });
}

export function trackStats(track: TrackId) {
  const topics = topicsFor(track);
  return {
    total: topics.length,
    core: topics.filter((topic) => topic.depth === "core").length,
    next: topics.filter((topic) => topic.depth === "next").length,
    advanced: topics.filter((topic) => topic.depth === "advanced").length,
    categories: categoriesFor(track).length,
  };
}

export function featuredCoreTopics(): Topic[] {
  const slugs: [TrackId, string][] = [
    ["dsa", "binary-search"],
    ["dsa", "two-pointers"],
    ["dsa", "bfs"],
    ["dsa", "knapsack-01"],
    ["hld", "url-shortener"],
    ["lld", "parking-lot"],
    ["ai", "tokens"],
  ];
  return slugs.map(([track, slug]) => getTopic(track, slug)).filter((topic): topic is Topic => Boolean(topic));
}
