import Link from "next/link";
import { allTopics, TRACKS, trackStats, type TrackId } from "@/content/catalog";
import { TrackStats } from "@/components/TrackStats";

const ORDER: TrackId[] = ["dsa", "hld", "lld"];

export default function HomePage() {
  return (
    <div>
      <p className="eyebrow">Knowledge, made easy</p>
      <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] tracking-tight text-ink sm:text-7xl">
        Interview theory you can <em className="italic">actually see.</em>
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft">
        Plain-English definitions, a moving picture of the flow, and a tiny example
        for every DSA, HLD, and LLD topic. Then the deeper notes when you want them.
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

      <section className="sky-card mt-10 p-6">
        <h2 className="font-serif text-2xl text-ink">How to read a topic</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-ink-soft">
          <li>Read the one-line definition. If that clicks, you already have the idea.</li>
          <li>Hit Play on the flow. Pause any step.</li>
          <li>Walk the tiny example with small numbers.</li>
          <li>Only then read theory, tips, and practice.</li>
        </ol>
      </section>
    </div>
  );
}
