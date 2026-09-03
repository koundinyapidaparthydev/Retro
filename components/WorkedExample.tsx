import type { WorkedExample as Example } from "@/content/examples";

export function WorkedExample({ example }: { example: Example }) {
  return (
    <div className="sky-card p-6">
      <p className="eyebrow">Tiny example</p>
      <p className="mt-3 text-[17px] leading-7 text-ink">{example.setup}</p>
      {example.input ? (
        <p className="mt-3 rounded-xl bg-sky-wash px-3 py-2 text-sm text-ink-soft">{example.input}</p>
      ) : null}
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] leading-7 text-ink-soft">
        {example.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p className="mt-4 border-t border-line pt-4 text-[15px] leading-7 text-ink">
        <span className="text-accent-deep">So: </span>
        {example.result}
      </p>
    </div>
  );
}
