import Link from "next/link";
import { notFound } from "next/navigation";
import { isTrack, topicPath, TRACKS } from "@/content/catalog";
import {
  chapterSlug,
  chapterTitle,
  findChapter,
  neighborChapter,
} from "@/lib/learn";

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
  searchParams,
}: {
  params: Promise<{ track: string }>;
  searchParams: Promise<{ c?: string }>;
}) {
  const { track } = await params;
  const { c } = await searchParams;
  if (!isTrack(track)) notFound();

  const chapter = findChapter(track, c);
  if (!chapter) notFound();
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
