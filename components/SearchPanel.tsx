"use client";

import { useMemo, useState } from "react";
import { searchTopics } from "@/content/catalog";
import { TopicCard } from "./TopicCard";

export function SearchPanel() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchTopics(query, "dsa").slice(0, 12);
  }, [query]);

  return (
    <div className="mt-8">
      <input
        autoFocus
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search this DSA list…"
        className="w-full rounded-md border border-line bg-paper px-4 py-3 text-ink outline-none placeholder:text-fog"
      />
      <p className="mt-4 text-sm text-slate">
        {query.trim() ? `${results.length} matches` : "Type a word. Only DSA for now."}
      </p>
      <div className="mt-4 grid gap-3">
        {results.map((topic) => (
          <TopicCard key={`${topic.track}:${topic.slug}`} topic={topic} />
        ))}
      </div>
    </div>
  );
}
