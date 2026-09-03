import { SearchPanel } from "@/components/SearchPanel";

export const metadata = {
  title: "Search",
};

export default function SearchPage() {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-dim">
        query · local index
      </p>
      <h1 className="mt-2 text-4xl font-medium tracking-tight">Search the archive</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Titles, summaries, and theory. Filter by track when you already know the lane.
      </p>
      <SearchPanel />
    </div>
  );
}
