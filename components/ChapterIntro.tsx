"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { topicPath, TRACKS, type TrackId } from "@/content/catalog";
import {
  chapterSlug,
  chapterTitle,
  findChapter,
  neighborChapter,
} from "@/lib/learn";

function ChapterIntroInner({ track }: { track: TrackId }) {
  const search = useSearchParams();
  const chapter = findChapter(track, search.get("c"));
  if (!chapter) return null;
  const next = neighborChapter(track, chapter.category, 1);
  const first = chapter.topics[0];

  return (
    <div className="max-w-xl">
      <p className="eyebrow">{TRACKS[track].label}</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink">
        {chapterTitle(track, chapter.category)}
      </h1>
      <p className="mt-3 text-base leading-7 text-ink-soft">
        {chapter.topics.length} items on the left. Open the first one. Stay here
        until it feels ordinary.
      </p>
      {first ? (
        <p className="mt-8 text-sm text-slate">
          Begin with{" "}
          <Link href={topicPath(first)} className="text-ink underline underline-offset-4">
            {first.title}
          </Link>
        </p>
      ) : null}
      {next ? (
        <p className="mt-6 text-sm text-fog">
          After this chapter:{" "}
          <Link href={`/${track}?c=${chapterSlug(next.category)}`} className="hover:text-ink">
            {chapterTitle(track, next.category)}
          </Link>
        </p>
      ) : null}
    </div>
  );
}

export function ChapterIntro({ track }: { track: TrackId }) {
  return (
    <Suspense fallback={<p className="text-slate">Loading this chapter…</p>}>
      <ChapterIntroInner track={track} />
    </Suspense>
  );
}
