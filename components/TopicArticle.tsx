import Link from "next/link";
import type { Topic } from "@/content/schema";
import { resolveRelated, topicPath } from "@/content/catalog";
import { CompanyAsks } from "./CompanyAsks";
import { DepthBadge } from "./DepthBadge";
import { InterviewQa } from "./InterviewQa";
import { LessonStrip } from "./LessonStrip";
import { ProgressToggle } from "./ProgressToggle";
import { TopicVisual } from "./visuals/TopicVisual";

export function TopicArticle({ topic }: { topic: Topic }) {
  const related = topic.related
    .map((slug) => resolveRelated(topic, slug))
    .filter((item): item is Topic => Boolean(item));

  return (
    <article>
      <p className="text-sm text-slate">
        <Link href={`/${topic.track}`} className="text-accent-deep hover:underline">
          {topic.track.toUpperCase()}
        </Link>
        <span className="mx-2 text-fog">/</span>
        {topic.category}
      </p>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {topic.title}
        </h1>
        <DepthBadge depth={topic.depth} />
      </div>
      <CompanyAsks track={topic.track} slug={topic.slug} />
      <div className="mt-4">
        <ProgressToggle track={topic.track} slug={topic.slug} />
      </div>

      <LessonStrip topic={topic} />

      {topic.complexity ? (
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-sky-wash px-3 py-1 text-ink">
            Time <strong>{topic.complexity.time}</strong>
          </span>
          <span className="rounded-full bg-sky-wash px-3 py-1 text-ink">
            Space <strong>{topic.complexity.space}</strong>
          </span>
        </div>
      ) : null}

      <section className="mt-8">
        <h2 className="font-serif text-3xl text-ink">Watch this one</h2>
        <p className="mt-1 text-sm text-slate">This picture is only for {topic.title.toLowerCase()}.</p>
        <div className="mt-4">
          <TopicVisual topic={topic} />
        </div>
      </section>

      <section className="mt-8">
        <InterviewQa topic={topic} />
      </section>

      {related.length ? (
        <section className="mt-8">
          <p className="eyebrow">Related</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {related.map((item) => (
              <Link
                key={`${item.track}:${item.slug}`}
                href={topicPath(item)}
                className="rounded-full border border-line bg-white px-3 py-1 text-sm text-ink-soft hover:border-accent hover:text-accent-deep"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <details className="sky-card mt-10 p-5">
        <summary className="cursor-pointer font-medium text-ink">More notes if you want them</summary>
        <div className="mt-4 space-y-4 text-sm leading-6 text-ink-soft">
          <p>{topic.whyItMatters}</p>
          {topic.whenToUse[0] ? (
            <p>
              <strong className="text-ink">Use when: </strong>
              {topic.whenToUse[0]}
            </p>
          ) : null}
          {topic.whenNotToUse?.[0] ? (
            <p>
              <strong className="text-ink">Skip when: </strong>
              {topic.whenNotToUse[0]}
            </p>
          ) : null}
          {topic.pitfalls[0] ? (
            <p>
              <strong className="text-ink">Trap: </strong>
              {topic.pitfalls[0]}
            </p>
          ) : null}
        </div>
      </details>
    </article>
  );
}
