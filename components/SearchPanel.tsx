"use client";

import { useMemo, useState } from "react";
import { allTopics, searchTopics } from "@/content/catalog";
import type { TrackId } from "@/content/schema";
import { TopicCard } from "./TopicCard";

const FILTERS: { id: TrackId | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "dsa", label: "DSA" },
  { id: "hld", label: "HLD" },
  { id: "lld", label: "LLD" },
];

export function SearchPanel() {
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState<TrackId | "all">("all");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchTopics(query, track === "all" ? undefined : track).slice(0, 40);
  }, [query, track]);

  return (
    <div className="mt-8">
      <input
        autoFocus
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={`Search ${allTopics.length} topics…`}
        className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-ink outline-none placeholder:text-fog focus:border-accent"
      />
      <div className="mt-4 flex flex-wrap gap-1.5">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setTrack(filter.id)}
            className={`rounded-full px-3.5 py-1.5 text-sm ${
              track === filter.id ? "bg-ink text-white" : "border border-line bg-white text-slate"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-slate">
        {query.trim() ? `${results.length} matches` : "Type to search"}
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {results.map((topic) => (
          <TopicCard key={`${topic.track}:${topic.slug}`} topic={topic} />
        ))}
      </div>
    </div>
  );
}
