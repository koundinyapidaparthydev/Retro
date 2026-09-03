import {
  categoryLabel,
  getTopic,
  groupByCategory,
  isTrack,
  topicsFor,
} from "@/content/catalog";
import type { Topic, TrackId } from "@/content/schema";

export function chapterSlug(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function chaptersFor(track: TrackId) {
  return groupByCategory(topicsFor(track), track);
}

export function findChapter(track: TrackId, categoryOrSlug?: string | null) {
  const chapters = chaptersFor(track);
  if (!chapters.length) return undefined;
  if (!categoryOrSlug) return chapters[0];
  return (
    chapters.find(
      (chapter) =>
        chapter.category === categoryOrSlug || chapterSlug(chapter.category) === categoryOrSlug,
    ) ?? chapters[0]
  );
}

export function chapterIndex(track: TrackId, category: string) {
  return chaptersFor(track).findIndex((chapter) => chapter.category === category);
}

export function neighborChapter(track: TrackId, category: string, step: -1 | 1) {
  const chapters = chaptersFor(track);
  const index = chapterIndex(track, category);
  if (index < 0) return undefined;
  return chapters[index + step];
}

export function topicFromPath(pathname: string): Topic | undefined {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length < 2 || !isTrack(parts[0])) return undefined;
  return getTopic(parts[0], parts[1]);
}

export function trackFromPath(pathname: string): TrackId {
  const first = pathname.split("/").filter(Boolean)[0];
  return isTrack(first) ? first : "dsa";
}

export function chapterTitle(track: TrackId, category: string) {
  return categoryLabel(track, category);
}

export function neighborTopic(topic: Topic, step: -1 | 1): Topic | undefined {
  const chapter = findChapter(topic.track, topic.category);
  if (!chapter) return undefined;
  const index = chapter.topics.findIndex((item) => item.slug === topic.slug);
  if (index < 0) return undefined;
  return chapter.topics[index + step];
}
