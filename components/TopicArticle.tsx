import Link from "next/link";
import type { Topic } from "@/content/schema";
import { resolveRelated, topicPath } from "@/content/catalog";
import { DepthBadge } from "./DepthBadge";
import { ProgressToggle } from "./ProgressToggle";

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">{label}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-7 text-ink/90">{children}</div>
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

  return (
    <article>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        <Link href={`/${topic.track}`} className="amber-link">
          {topic.track}
        </Link>
        <span className="mx-2 text-line">/</span>
        {topic.category}
      </p>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <h1 className="max-w-3xl text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          {topic.title}
        </h1>
        <DepthBadge depth={topic.depth} />
      </div>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{topic.summary}</p>
      <div className="mt-6">
        <ProgressToggle track={topic.track} slug={topic.slug} />
      </div>

      {topic.complexity ? (
        <div className="crt-glow mt-8 grid gap-4 bg-panel p-4 sm:grid-cols-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-dim">
              Time
            </div>
            <div className="mt-1 font-mono text-sm text-mint">{topic.complexity.time}</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-dim">
              Space
            </div>
            <div className="mt-1 font-mono text-sm text-mint">{topic.complexity.space}</div>
          </div>
          {topic.complexity.notes ? (
            <div className="sm:col-span-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-dim">
                Notes
              </div>
              <div className="mt-1 text-sm text-muted">{topic.complexity.notes}</div>
            </div>
          ) : null}
        </div>
      ) : null}

      <Section label="Why it matters">
        <p>{topic.whyItMatters}</p>
      </Section>

      <Section label="Theory">
        {topic.theory.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </Section>

      <Section label="How it works">
        <ol className="list-decimal space-y-2 pl-5">
          {topic.howItWorks.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
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
                className="border border-line px-2 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted hover:border-amber hover:text-amber"
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
