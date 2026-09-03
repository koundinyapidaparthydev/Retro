import Link from "next/link";
import type { Topic } from "@/content/schema";
import { topicPath } from "@/content/catalog";
import { neighborTopic } from "@/lib/learn";
import { DepthBadge } from "./DepthBadge";
import { InterviewQa } from "./InterviewQa";
import { LessonStrip } from "./LessonStrip";
import { ProgressToggle } from "./ProgressToggle";
import { jsRunFor } from "@/lib/jsRun";
import { JsPlayground } from "./JsPlayground";
import { TalkPanel } from "./TalkPanel";
import { TopicVisual } from "./visuals/TopicVisual";

export function TopicArticle({ topic }: { topic: Topic }) {
  const next = neighborTopic(topic, 1);
  const prev = neighborTopic(topic, -1);

  return (
    <article>
      <p className="text-sm text-slate">
        {topic.track.toUpperCase()}
        <span className="mx-2 text-fog">/</span>
        {topic.category}
      </p>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {topic.title}
        </h1>
        <DepthBadge depth={topic.depth} />
      </div>
      <div className="mt-4">
        <ProgressToggle track={topic.track} slug={topic.slug} />
      </div>

      <LessonStrip topic={topic} />

      <section className="mt-6">
        <TalkPanel key={topic.slug} topic={topic} />
      </section>

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

      {topic.track === "dsa" || topic.track === "ai" ? (
        <section className="mt-8">
          <h2 className="font-serif text-3xl text-ink">Run it in JavaScript</h2>
          <p className="mt-1 text-sm text-slate">
            Left is the snippet. Right is the console — one <code>console.log</code> at a time.
          </p>
          <div className="mt-4">
            <JsPlayground run={jsRunFor(topic)} />
          </div>
        </section>
      ) : null}

      <section className="mt-8">
        <InterviewQa topic={topic} />
      </section>

      <nav className="mt-10 flex flex-wrap justify-between gap-4 text-sm">
        {prev ? (
          <Link href={topicPath(prev)} className="text-slate hover:text-ink">
            Previous: {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={topicPath(next)} className="text-ink underline underline-offset-4">
            Next: {next.title}
          </Link>
        ) : (
          <span className="text-fog">Last in this chapter</span>
        )}
      </nav>

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
