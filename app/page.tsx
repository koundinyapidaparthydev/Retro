import Link from "next/link";
import { allTopics, featuredCoreTopics, TRACKS, trackStats, type TrackId } from "@/content/catalog";
import { TrackStats } from "@/components/TrackStats";
import { TopicCard } from "@/components/TopicCard";
import { AskHeatmap } from "@/components/AskHeatmap";

const ORDER: TrackId[] = ["dsa", "hld", "lld"];

export default function HomePage() {
  return (
    <div>
      <p className="eyebrow">Knowledge, made easy</p>
      <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] tracking-tight text-ink sm:text-7xl">
        Interview theory you can <em className="italic">actually see.</em>
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft">
        Plain-English definitions, how the interview question shows up, how to
        answer it, and a picture that matches that topic — not a reused pipeline.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link href="/dsa" className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white">
          Start with DSA
        </Link>
        <Link href="/search" className="rounded-full border border-line bg-white px-5 py-2.5 text-sm text-ink">
          Search 402 topics
        </Link>
      </div>
      <div className="mt-4">
        <TrackStats total={allTopics.length} />
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {ORDER.map((id) => {
          const meta = TRACKS[id];
          const stats = trackStats(id);
          return (
            <Link key={id} href={`/${id}`} className="sky-card group p-6">
              <div className="eyebrow">{meta.label}</div>
              <h2 className="mt-2 font-serif text-2xl text-ink group-hover:text-accent-deep">
                {meta.full}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate">{meta.blurb}</p>
              <p className="mt-5 text-sm text-accent-deep">
                {stats.total} topics · {stats.core} core
              </p>
            </Link>
          );
        })}
      </div>

      <AskHeatmap track="dsa" />
      <AskHeatmap track="hld" />

      <section className="mt-12">
        <p className="eyebrow">Start here · CORE first</p>
        <h2 className="mt-2 font-serif text-3xl text-ink">The interviews ask these early</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate">
          DSA listings put must-haves on top. These six are the usual first stop.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {featuredCoreTopics().map((topic) => (
            <TopicCard key={`${topic.track}:${topic.slug}`} topic={topic} />
          ))}
        </div>
      </section>

      <section className="sky-card mt-10 p-6">
        <h2 className="font-serif text-2xl text-ink">How to read a topic</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-ink-soft">
          <li>Definition, why, approach — three short cards.</li>
          <li>Play the picture for that problem. Company chips say who asks it.</li>
          <li>They ask / you say. Extra notes stay collapsed.</li>
        </ol>
        <p className="mt-4 text-sm text-slate">
          On <Link href="/dsa" className="text-accent-deep hover:underline">/dsa</Link>, categories
          run Arrays → Hashing → two pointers → binary search → … → advanced, with CORE cards first.
        </p>
      </section>
    </div>
  );
}
