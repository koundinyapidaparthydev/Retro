import { notFound } from "next/navigation";
import { allTopics, getTopic, isTrack } from "@/content/catalog";
import { TopicArticle } from "@/components/TopicArticle";

export function generateStaticParams() {
  return allTopics.map((topic) => ({ track: topic.track, slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string; slug: string }>;
}) {
  const { track, slug } = await params;
  if (!isTrack(track)) return {};
  const topic = getTopic(track, slug);
  return topic ? { title: topic.title, description: topic.summary } : {};
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ track: string; slug: string }>;
}) {
  const { track, slug } = await params;
  if (!isTrack(track)) notFound();
  const topic = getTopic(track, slug);
  if (!topic) notFound();
  return <TopicArticle topic={topic} />;
}
