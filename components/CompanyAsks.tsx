import { topicAsks, type Likelihood } from "@/content/asks";

const TONE: Record<Likelihood, string> = {
  hot: "bg-accent text-white",
  often: "bg-sky-wash text-accent-deep",
  sometimes: "border border-line bg-white text-slate",
};

export function CompanyAsks({ track, slug }: { track: string; slug: string }) {
  const info = topicAsks(track, slug);
  if (!info) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {info.companies.map((row) => (
        <span
          key={row.company}
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${TONE[row.likelihood]}`}
        >
          {row.company}
          <span className="ml-1 opacity-80">{row.likelihood}</span>
        </span>
      ))}
      <span className="text-sm text-slate">{info.why}</span>
    </div>
  );
}
