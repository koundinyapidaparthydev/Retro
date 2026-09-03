import Link from "next/link";
import type { Topic } from "@/content/schema";
import { resolveRelated, topicPath } from "@/content/catalog";
import { easyDefinition, workedExample } from "@/lib/explain";
import { DepthBadge } from "./DepthBadge";
import { InterviewQa } from "./InterviewQa";
import { ProgressToggle } from "./ProgressToggle";
import { TopicVisual } from "./visuals/TopicVisual";
import { WorkedExample } from "./WorkedExample";

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="eyebrow">{label}</h2>
      <div className="mt-3 space-y-3 text-[16px] leading-7 text-ink-soft">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function TopicArticle({ topic }: { topic: Topic }) {
  const related = topic.related
    .map((slug) => resolveRelated(topic, slug))
    .filter((item): item is Topic => Boolean(item));
  const easy = easyDefinition(topic);
  const example = workedExample(topic);

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

      <div className="sky-card mt-6 bg-white/90 p-6">
        <p className="eyebrow">In plain English</p>
        <p className="mt-2 font-serif text-2xl leading-snug text-ink">{easy}</p>
      </div>

      <div className="mt-5">
        <ProgressToggle track={topic.track} slug={topic.slug} />
      </div>

      <section className="mt-10">
        <InterviewQa topic={topic} />
      </section>

      {topic.complexity ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="sky-card p-4">
            <div className="eyebrow">Time</div>
            <div className="mt-1 text-sm font-medium text-ink">{topic.complexity.time}</div>
          </div>
          <div className="sky-card p-4">
            <div className="eyebrow">Space</div>
            <div className="mt-1 text-sm font-medium text-ink">{topic.complexity.space}</div>
          </div>
          {topic.complexity.notes ? (
            <div className="sky-card p-4">
              <div className="eyebrow">Notes</div>
              <div className="mt-1 text-sm text-slate">{topic.complexity.notes}</div>
            </div>
          ) : null}
        </div>
      ) : null}

      <section className="mt-10">
        <h2 className="font-serif text-3xl text-ink">See it move</h2>
        <p className="mt-2 max-w-2xl text-slate">
          Watch a tiny version of the idea, then read the same steps in words.
        </p>
        <div className="mt-5">
          <TopicVisual topic={topic} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-3xl text-ink">A tiny example</h2>
        <p className="mt-2 max-w-2xl text-slate">Same idea, small numbers, no interview pressure.</p>
        <div className="mt-5">
          <WorkedExample example={example} />
        </div>
      </section>

      <Section label="Why it matters">
        <p>{topic.whyItMatters}</p>
      </Section>

      <Section label="A bit more theory">
        {topic.theory.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </Section>

      <Section label="When to use">
        <Bullets items={topic.whenToUse} />
      </Section>

      {topic.whenNotToUse?.length ? (
        <Section label="When not to use">
          <Bullets items={topic.whenNotToUse} />
        </Section>
      ) : null}

      {topic.tradeoffs?.length ? (
        <Section label="Tradeoffs">
          <Bullets items={topic.tradeoffs} />
        </Section>
      ) : null}

      <Section label="Interview tips">
        <Bullets items={topic.interviewTips} />
      </Section>

      <Section label="Pitfalls">
        <Bullets items={topic.pitfalls} />
      </Section>

      <Section label="Practice">
        <Bullets items={topic.practiceIdeas} />
      </Section>

      {related.length ? (
        <Section label="Related">
          <div className="flex flex-wrap gap-2">
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
        </Section>
      ) : null}
    </article>
  );
}
