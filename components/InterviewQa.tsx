import type { Topic } from "@/content/schema";
import { topicQa } from "@/lib/qa";

export function InterviewQa({ topic }: { topic: Topic }) {
  const qa = topicQa(topic);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="sky-card p-6">
        <p className="eyebrow">How this question shows up</p>
        <p className="mt-3 font-serif text-xl leading-snug text-ink">They rarely say the topic name first.</p>
        <ul className="mt-4 space-y-3">
          {qa.howQuestionsCome.map((line) => (
            <li key={line} className="rounded-2xl bg-sky-wash px-4 py-3 text-[15px] leading-6 text-ink">
              {line}
            </li>
          ))}
        </ul>
      </div>

      <div className="sky-card p-6">
        <p className="eyebrow">How to answer</p>
        <p className="mt-3 text-xs font-medium uppercase tracking-wide text-accent-deep">First 30–60 seconds</p>
        <p className="mt-2 rounded-2xl border border-accent/30 bg-sky-wash px-4 py-3 text-[15px] leading-6 text-ink">
          {qa.howToAnswer.firstMinute}
        </p>
        <p className="mt-5 text-xs font-medium uppercase tracking-wide text-accent-deep">Then offer the deep dive</p>
        <p className="mt-2 text-[15px] leading-6 text-ink-soft">{qa.howToAnswer.deepDive}</p>
      </div>
    </div>
  );
}
