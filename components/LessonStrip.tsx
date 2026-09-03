import type { Topic } from "@/content/schema";
import { lesson } from "@/lib/lesson";

export function LessonStrip({ topic }: { topic: Topic }) {
  const bits = lesson(topic);
  return (
    <div className="mt-6 grid gap-3 md:grid-cols-3">
      <div className="sky-card p-5">
        <p className="eyebrow">Definition</p>
        <p className="mt-2 text-[17px] font-medium leading-6 text-ink">{bits.definition}</p>
      </div>
      <div className="sky-card p-5">
        <p className="eyebrow">Why it exists</p>
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
  );
}
