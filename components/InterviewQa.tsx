import type { Topic } from "@/content/schema";
import { problemFor } from "@/lib/problem";
import { topicQa } from "@/lib/qa";

export function InterviewQa({ topic }: { topic: Topic }) {
  const problem = problemFor(topic);
  const qa = topicQa(topic);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="sky-card p-5">
        <p className="eyebrow">Whiteboard prompts</p>
        <p className="mt-2 text-sm text-slate">These are problem statements. The algorithm name is your answer, not the title of the question.</p>
        <ul className="mt-3 space-y-2">
          {problem.askedAs.map((line) => (
            <li key={line} className="rounded-xl bg-sky-wash px-3 py-2 text-sm leading-6 text-ink">
              {line}
            </li>
          ))}
        </ul>
      </div>
      <div className="sky-card p-5">
        <p className="eyebrow">You say this first</p>
        <p className="mt-3 text-[15px] leading-6 text-ink">{qa.howToAnswer.firstMinute}</p>
        <p className="mt-3 text-sm leading-6 text-slate">{qa.howToAnswer.deepDive}</p>
      </div>
    </div>
  );
}
