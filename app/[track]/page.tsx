import { notFound } from "next/navigation";
import { isTrack, TRACKS } from "@/content/catalog";
import { ChapterIntro } from "@/components/ChapterIntro";

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
  return <ChapterIntro track={track} />;
}
