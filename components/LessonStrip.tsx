import type { Topic } from "@/content/schema";
import { lesson } from "@/lib/lesson";
import { problemFor } from "@/lib/problem";

export function LessonStrip({ topic }: { topic: Topic }) {
  const bits = lesson(topic);
  const problem = problemFor(topic);
  return (
    <div className="mt-6 space-y-3">
      <div className="sky-card border-accent/30 bg-sky-wash/50 p-5">
        <p className="eyebrow">The problem they give you</p>
        <p className="mt-2 text-sm font-medium text-accent-deep">They will not say “{topic.title}.” They describe this:</p>
        <p className="mt-3 text-[17px] leading-7 text-ink">
          <strong>Given: </strong>
          {problem.given}
        </p>
        <p className="mt-2 text-[17px] leading-7 text-ink">
          <strong>Find: </strong>
          {problem.find}
        </p>
        <p className="mt-3 rounded-xl bg-white px-4 py-3 text-[15px] leading-6 text-ink-soft">
          <strong className="text-ink">Tiny example: </strong>
          {problem.example}
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="sky-card p-5">
          <p className="eyebrow">Name of the tool</p>
          <p className="mt-2 text-[17px] font-medium leading-6 text-ink">{bits.definition}</p>
        </div>
        <div className="sky-card p-5">
          <p className="eyebrow">Why this tool</p>
          <p className="mt-2 text-[17px] leading-6 text-ink">{bits.why}</p>
        </div>
        <div className="sky-card p-5">
          <p className="eyebrow">Approach</p>
          <ol className="mt-2 list-decimal space-y-1 pl-4 text-[15px] leading-6 text-ink">
            {bits.approach.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
