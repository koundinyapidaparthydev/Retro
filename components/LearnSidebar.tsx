"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { TRACKS, type TrackId } from "@/content/schema";
import { topicPath } from "@/content/catalog";
import {
  chapterSlug,
  chapterTitle,
  chaptersFor,
  findChapter,
  neighborChapter,
  topicFromPath,
  trackFromPath,
} from "@/lib/learn";

const TRACK_IDS: TrackId[] = ["dsa", "hld", "lld"];

function LearnSidebarInner() {
  const pathname = usePathname();
  const search = useSearchParams();
  const topic = topicFromPath(pathname);
  const track = topic?.track ?? trackFromPath(pathname);
  const requested = search.get("c");
  const chapter = topic
    ? findChapter(track, topic.category)
    : findChapter(track, requested);
  const chapters = chaptersFor(track);
  const index = chapter ? chapters.findIndex((item) => item.category === chapter.category) : 0;
  const next = chapter ? neighborChapter(track, chapter.category, 1) : undefined;
  const prev = chapter ? neighborChapter(track, chapter.category, -1) : undefined;

  return (
    <aside className="flex w-full shrink-0 flex-col border-line bg-paper lg:w-64 lg:border-r lg:pr-5">
      <p className="text-[11px] uppercase tracking-[0.14em] text-slate">This path</p>
      <p className="mt-1 font-serif text-lg text-ink">{TRACKS[track].label}</p>
      <details className="mt-1 text-sm text-fog">
        <summary className="cursor-pointer hover:text-ink">Change path</summary>
        <div className="mt-2 flex flex-col gap-1">
          {TRACK_IDS.filter((id) => id !== track).map((id) => (
            <Link key={id} href={`/${id}`} className="hover:text-ink">
              {TRACKS[id].full}
            </Link>
          ))}
        </div>
      </details>

      {chapter ? (
        <>
          <p className="mt-6 text-[11px] uppercase tracking-[0.14em] text-slate">
            {index + 1} of {chapters.length}
          </p>
          <h2 className="mt-1 font-serif text-xl leading-tight text-ink">
            {chapterTitle(track, chapter.category)}
          </h2>
          <ol className="mt-4 space-y-1">
            {chapter.topics.map((item, i) => {
              const active = topic?.slug === item.slug;
              return (
                <li key={item.slug}>
                  <Link
                    href={topicPath(item)}
                    className={`block rounded-md px-2 py-1.5 text-sm leading-5 ${
                      active ? "bg-ink text-paper" : "text-ink-soft hover:bg-wash"
                    }`}
                  >
                    <span className={`mr-2 tabular-nums ${active ? "text-paper/70" : "text-fog"}`}>
                      {i + 1}.
                    </span>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className="mt-6 space-y-2 text-sm">
            {prev ? (
              <Link href={`/${track}?c=${chapterSlug(prev.category)}`} className="block text-slate hover:text-ink">
                Previous: {chapterTitle(track, prev.category)}
              </Link>
            ) : null}
            {next ? (
              <Link href={`/${track}?c=${chapterSlug(next.category)}`} className="block text-ink hover:underline">
                Next: {chapterTitle(track, next.category)}
              </Link>
            ) : (
              <p className="text-fog">End of this path.</p>
            )}
          </div>
        </>
      ) : null}

      <Link href="/search" className="mt-8 text-sm text-fog hover:text-ink">
        Search
      </Link>
    </aside>
  );
}

export function LearnSidebar() {
  return (
    <Suspense fallback={<aside className="hidden w-64 shrink-0 lg:block" />}>
      <LearnSidebarInner />
    </Suspense>
  );
}
