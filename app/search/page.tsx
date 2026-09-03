import { SearchPanel } from "@/components/SearchPanel";

export const metadata = {
  title: "Search",
};

export default function SearchPage() {
  return (
    <div>
      <p className="eyebrow">Search</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight">Find one title</h1>
      <p className="mt-3 max-w-xl text-ink-soft">
        Search stays on DSA. Switch the path on the left if you want HLD or LLD later.
      </p>
      <SearchPanel />
    </div>
  );
}
