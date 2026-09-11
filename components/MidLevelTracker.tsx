"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ALGO_CATEGORIES,
  ALGO_PROBLEM_COUNT,
  leetcodeUrl,
} from "@/content/algos";
import { CORE_HABITS, MID_DOMAINS } from "@/content/mid-roadmap";

const STORAGE_KEY = "retro-mid-level-track-v1";

type ProgressMap = Record<string, boolean>;

function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressMap;
  } catch {
    return {};
  }
}

export function MidLevelTracker() {
  const [done, setDone] = useState<ProgressMap>({});
  const [hydrated, setHydrated] = useState(false);
  const [filter, setFilter] = useState("");
  const [onlyOpen, setOnlyOpen] = useState(false);

  useEffect(() => {
    setDone(loadProgress());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
  }, [done, hydrated]);

  const allIds = useMemo(() => {
    const ids: string[] = [];
    CORE_HABITS.forEach((h) => ids.push(h.id));
    MID_DOMAINS.forEach((d) => d.items.forEach((i) => ids.push(i.id)));
    ALGO_CATEGORIES.forEach((c) =>
      c.problems.forEach((p) => ids.push(`algo:${p.id}`)),
    );
    return ids;
  }, []);

  const checkedCount = allIds.filter((id) => done[id]).length;
  const pct = allIds.length ? Math.round((checkedCount / allIds.length) * 100) : 0;

  const algoDone = ALGO_CATEGORIES.reduce(
    (n, c) => n + c.problems.filter((p) => done[`algo:${p.id}`]).length,
    0,
  );

  function toggle(id: string) {
    setDone((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function resetAll() {
    if (!confirm("Clear all progress on this device?")) return;
    setDone({});
    localStorage.removeItem(STORAGE_KEY);
  }

  async function copyProgress() {
    const text = JSON.stringify(done, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      alert("Progress JSON copied.");
    } catch {
      prompt("Copy this progress JSON:", text);
    }
  }

  const q = filter.trim().toLowerCase();

  return (
    <div className="rise">
      <div className="panel p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="font-mono text-[0.78rem] text-muted">Overall progress</div>
            <div className="mt-1 font-display text-2xl font-bold tracking-[-0.02em] text-text">
              {checkedCount} / {allIds.length} · {pct}%
            </div>
          </div>
          <div className="font-mono text-[0.78rem] text-muted">
            Algos pack:{" "}
            <span className="text-teal">
              {algoDone} / {ALGO_PROBLEM_COUNT}
            </span>
          </div>
        </div>
        <div className="progress-track mt-4">
          <i className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={copyProgress}
            className="cursor-pointer rounded-full border border-line bg-bg-elev px-3.5 py-1.5 text-sm font-semibold text-text transition-colors hover:border-[rgba(232,220,196,0.28)] hover:bg-bg-soft"
          >
            Copy progress
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="cursor-pointer rounded-full border border-line bg-bg-elev px-3.5 py-1.5 text-sm font-semibold text-muted transition-colors hover:border-danger/50 hover:text-danger"
          >
            Reset
          </button>
        </div>
      </div>

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Sections">
        <a href="#habits" className="toc-chip">
          Habits
        </a>
        <a href="#roadmap" className="toc-chip">
          Mid-level roadmap
        </a>
        <a href="#algos" className="toc-chip">
          Algos list
        </a>
        <a href="#thesis" className="toc-chip">
          Why this
        </a>
      </nav>

      <section id="habits" className="mt-12 scroll-mt-8">
        <h2 className="font-display text-[clamp(1.35rem,3vw,1.75rem)] font-bold tracking-[-0.02em] text-text">
          Core habits
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Superpower = catching when AI is wrong — not typing faster than the model.
        </p>
        <ul className="panel mt-4 divide-y divide-line overflow-hidden">
          {CORE_HABITS.map((item) => (
            <CheckRow
              key={item.id}
              id={item.id}
              label={item.label}
              checked={!!done[item.id]}
              onToggle={toggle}
            />
          ))}
        </ul>
      </section>

      <section id="roadmap" className="mt-12 scroll-mt-8">
        <h2 className="font-display text-[clamp(1.35rem,3vw,1.75rem)] font-bold tracking-[-0.02em] text-text">
          Mid-level roadmap
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Four domains for 3+ YOE. Check them as you get real reps, not video tourism.
        </p>
        <div className="mt-6 space-y-4">
          {MID_DOMAINS.map((domain) => (
            <div key={domain.id} className="panel overflow-hidden">
              <div className="border-b border-line px-4 py-3 sm:px-5">
                <h3 className="font-display text-lg font-bold text-text">{domain.title}</h3>
                <p className="mt-1 text-sm text-muted">{domain.blurb}</p>
              </div>
              <ul className="divide-y divide-line">
                {domain.items.map((item) => (
                  <CheckRow
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    checked={!!done[item.id]}
                    onToggle={toggle}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="algos" className="mt-12 scroll-mt-8">
        <h2 className="font-display text-[clamp(1.35rem,3vw,1.75rem)] font-bold tracking-[-0.02em] text-text">
          Algos problem pack
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          From your Algos.pdf — pattern coverage so you can audit AI, not grind volume forever.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter problems…"
            className="w-full rounded-[10px] border border-line bg-bg-elev px-3 py-2 text-sm text-text outline-none placeholder:text-fog focus:border-teal/40 sm:max-w-xs"
          />
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={onlyOpen}
              onChange={(e) => setOnlyOpen(e.target.checked)}
              className="accent-teal"
            />
            Hide completed
          </label>
        </div>

        <div className="mt-6 space-y-4">
          {ALGO_CATEGORIES.map((cat) => {
            const problems = cat.problems.filter((prob) => {
              const key = `algo:${prob.id}`;
              if (onlyOpen && done[key]) return false;
              if (!q) return true;
              return (
                prob.title.toLowerCase().includes(q) ||
                cat.title.toLowerCase().includes(q)
              );
            });
            if (problems.length === 0) return null;
            const catDone = cat.problems.filter((prob) => done[`algo:${prob.id}`]).length;

            return (
              <div key={cat.id} className="panel overflow-hidden">
                <div className="flex items-baseline justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
                  <h3 className="font-display text-lg font-bold text-text">{cat.title}</h3>
                  <span className="shrink-0 font-mono text-[0.7rem] tracking-wide text-muted uppercase">
                    {catDone}/{cat.problems.length}
                  </span>
                </div>
                <ul className="divide-y divide-line">
                  {problems.map((prob) => {
                    const key = `algo:${prob.id}`;
                    return (
                      <li key={prob.id} className="flex items-start gap-3 px-4 py-3 sm:px-5">
                        <input
                          id={key}
                          type="checkbox"
                          checked={!!done[key]}
                          onChange={() => toggle(key)}
                          className="mt-1 accent-teal"
                        />
                        <div className="min-w-0 flex-1">
                          <label
                            htmlFor={key}
                            className={`cursor-pointer text-[0.95rem] leading-6 ${
                              done[key]
                                ? "text-muted line-through decoration-muted/55"
                                : "text-text"
                            }`}
                          >
                            {prob.title}
                          </label>
                          <div>
                            <a
                              href={leetcodeUrl(prob.slug)}
                              target="_blank"
                              rel="noreferrer"
                              className="font-mono text-[0.72rem] text-teal no-underline border-b border-teal/35 hover:border-teal"
                            >
                              Open on LeetCode
                            </a>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section id="thesis" className="mt-12 scroll-mt-8 pb-4">
        <h2 className="font-display text-[clamp(1.35rem,3vw,1.75rem)] font-bold tracking-[-0.02em] text-text">
          Why this track
        </h2>
        <div className="panel mt-4 space-y-3 p-4 text-sm leading-7 text-muted sm:p-5">
          <p className="font-display text-[clamp(1.15rem,2.5vw,1.4rem)] leading-snug tracking-[-0.02em] text-text">
            <span className="text-amber">DSA</span> is your vocabulary.{" "}
            <span className="text-teal">AI</span> is the printing press.
          </p>
          <p>
            Dropping DSA entirely as a junior is a trap. Skipping AI fluency as a mid-level
            engineer is the other trap. Market wants orchestrators who can architect undefined
            problems and validate AI output under load and security pressure.
          </p>
          <p>
            AI code is probabilistic. It hallucinates. Local demos pass; production edge cases melt
            infra if you cannot read complexity and concurrency.
          </p>
          <p>
            Fundamentals (CS physics) do not change weekly — tools do. Do not abandon boring
            scratch-building; do not become a purist who ignores AI either.
          </p>
          <p>
            Source talk:{" "}
            <a
              href="https://www.youtube.com/watch?v=yzkKVFX4-bE"
              target="_blank"
              rel="noreferrer"
              className="text-teal no-underline border-b border-teal/35 hover:border-teal"
            >
              DSA vs AI — What to Learn in 2026?
            </a>
            . Problem list from Algos.pdf.
          </p>
        </div>
      </section>
    </div>
  );
}

function CheckRow({
  id,
  label,
  checked,
  onToggle,
}: {
  id: string;
  label: string;
  checked: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <li className="flex items-start gap-3 px-4 py-3 sm:px-5">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(id)}
        className="mt-1 accent-teal"
      />
      <label
        htmlFor={id}
        className={`cursor-pointer text-[0.95rem] leading-6 ${
          checked ? "text-muted line-through decoration-muted/55" : "text-text"
        }`}
      >
        {label}
      </label>
    </li>
  );
}
