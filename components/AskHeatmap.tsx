import Link from "next/link";
import { COMPANIES, heatmapRows, type Likelihood } from "@/content/asks";
import { getTopic, topicPath, type TrackId } from "@/content/catalog";

const CELL: Record<Likelihood | "none", string> = {
  hot: "bg-accent text-white",
  often: "bg-sky-mid/80 text-ink",
  sometimes: "bg-sky-wash text-slate",
  none: "bg-white text-fog",
};

export function AskHeatmap({ track }: { track: TrackId }) {
  const rows = heatmapRows(track).slice(0, 14);
  if (!rows.length) return null;

  return (
    <section className="sky-card mt-8 overflow-x-auto p-5">
      <p className="eyebrow">Who asks this · {track.toUpperCase()}</p>
      <p className="mt-1 text-sm text-slate">Hot = they run this loop a lot. Start at the top.</p>
      <table className="mt-4 w-full min-w-[640px] border-separate border-spacing-1 text-left text-xs">
        <thead>
          <tr>
            <th className="px-2 py-1 font-medium text-slate">Topic</th>
            {COMPANIES.map((company) => (
              <th key={company} className="px-1 py-1 text-center font-medium text-slate">
                {company}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const topic = getTopic(track, row.slug);
            if (!topic) return null;
            const byCo = new Map(row.info.companies.map((item) => [item.company, item.likelihood]));
            return (
              <tr key={row.key}>
                <td className="px-2 py-1">
                  <Link href={topicPath(topic)} className="font-medium text-ink hover:text-accent-deep">
                    {topic.title}
                  </Link>
                </td>
                {COMPANIES.map((company) => {
                  const level = byCo.get(company) ?? "none";
                  return (
                    <td key={company} className="px-1 py-1">
                      <div className={`rounded-md py-1.5 text-center ${CELL[level]}`}>
                        {level === "none" ? "·" : level === "hot" ? "●" : level === "often" ? "◐" : "○"}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
