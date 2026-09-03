import type { Depth, Topic, TrackId } from "./schema";
import { TRACKS } from "./schema";
import { dsaTopics } from "./dsa";
import { hldTopics } from "./hld";
import { lldTopics } from "./lld";

export { TRACKS };
export type { Depth, Topic, TrackId };

export const allTopics: Topic[] = [...dsaTopics, ...hldTopics, ...lldTopics];

const byKey = new Map(allTopics.map((topic) => [`${topic.track}:${topic.slug}`, topic]));

export function isTrack(value: string): value is TrackId {
  return value === "dsa" || value === "hld" || value === "lld";
}

export function topicsFor(track: TrackId): Topic[] {
  return allTopics.filter((topic) => topic.track === track);
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
  const seen = new Set<string>();
  const order: string[] = [];
  for (const topic of topicsFor(track)) {
    if (!seen.has(topic.category)) {
      seen.add(topic.category);
      order.push(topic.category);
    }
  }
  return order;
}

export function groupByCategory(topics: Topic[]): { category: string; topics: Topic[] }[] {
  const groups = new Map<string, Topic[]>();
  for (const topic of topics) {
    const list = groups.get(topic.category) ?? [];
    list.push(topic);
    groups.set(topic.category, list);
  }
  return [...groups.entries()].map(([category, grouped]) => ({
    category,
    topics: grouped,
  }));
}

export function searchTopics(query: string, track?: TrackId): Topic[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const pool = track ? topicsFor(track) : allTopics;
  return pool.filter((topic) => {
    const hay = [
      topic.title,
      topic.summary,
      topic.category,
      topic.whyItMatters,
      ...topic.theory,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
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
