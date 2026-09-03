import Link from "next/link";
import { allTopics, TRACKS, trackStats, type TrackId } from "@/content/catalog";
import { TrackStats } from "@/components/TrackStats";

const ORDER: TrackId[] = ["dsa", "hld", "lld"];

export default function HomePage() {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-dim">
        boot · knowledge archive
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-tight text-ink sm:text-5xl">
        Interview theory you can reopen, not a pile of titles.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
        RETRO is a first cut of DSA, high-level design, and low-level design —
        with why it matters, how it works, when to use it, and how interviews
        actually poke at it. Built so we can deepen any topic in flight.
      </p>
      <div className="mt-4">
        <TrackStats total={allTopics.length} />
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {ORDER.map((id) => {
          const meta = TRACKS[id];
          const stats = trackStats(id);
          return (
            <Link
              key={id}
              href={`/${id}`}
              className="crt-glow group bg-panel p-5 transition hover:border-amber"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
                {meta.label}
              </div>
              <h2 className="mt-2 text-xl font-medium text-ink group-hover:text-amber">
                {meta.full}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">{meta.blurb}</p>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-mint">
                {stats.total} topics · {stats.core} core · {stats.categories} groups
              </p>
            </Link>
          );
        })}
      </div>

      <section className="crt-glow mt-10 bg-panel p-5">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
          How to use this v0.1
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-muted">
          <li>Start with CORE topics. Mark them Learning, then Known — progress stays in this browser.</li>
          <li>Read Theory + How it works before you grind problems. The practice line is a prompt, not a catalog.</li>
          <li>When a topic feels thin, we extend that file under <span className="font-mono text-ink">content/</span> without rewriting the app.</li>
        </ol>
      </section>
    </div>
  );
}
