import { SearchPanel } from "@/components/SearchPanel";

export const metadata = {
  title: "Search",
};

export default function SearchPage() {
  return (
    <div>
      <p className="eyebrow">Find a topic</p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight">Search the archive</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Titles, easy definitions, and theory. Filter by track when you already know the lane.
      </p>
      <SearchPanel />
    </div>
  );
}
