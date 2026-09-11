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
    ALGO_CATEGORIES.forEach((c) => c.problems.forEach((p) => ids.push(`algo:${p.id}`)));
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
    <div className="max-w-3xl">
      <p className="eyebrow">Mid-level · 3 years</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">
        DSA vocabulary. AI orchestration. Stay on track.
      </h1>
      <p className="mt-4 text-base leading-7 text-ink-soft">
        For your level: keep algorithmic pattern recognition sharp on the curated Algos list,
        and push system design, distributed systems, agentic AI, and AI-era security. DSA is the
        vocabulary; AI is the printing press — without vocabulary, the press prints nonsense.
      </p>

      <div className="mt-8 sky-card p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-sm text-slate">Overall progress</div>
            <div className="mt-1 font-serif text-2xl text-ink">
              {checkedCount} / {allIds.length} · {pct}%
            </div>
          </div>
          <div className="text-sm text-slate">
            Algos pack: {algoDone} / {ALGO_PROBLEM_COUNT}
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-wash">
          <div
            className="h-full rounded-full bg-ink transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={copyProgress}
            className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink hover:border-fog"
          >
            Copy progress
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-slate hover:border-fog hover:text-ink"
          >
            Reset
          </button>
        </div>
      </div>

      <nav className="mt-8 flex flex-wrap gap-2 text-sm">
        <a href="#habits" className="rounded-full border border-line px-3 py-1.5 text-ink hover:bg-paper">
          Habits
        </a>
        <a href="#roadmap" className="rounded-full border border-line px-3 py-1.5 text-ink hover:bg-paper">
          Mid-level roadmap
        </a>
        <a href="#algos" className="rounded-full border border-line px-3 py-1.5 text-ink hover:bg-paper">
          Algos list
        </a>
        <a href="#thesis" className="rounded-full border border-line px-3 py-1.5 text-ink hover:bg-paper">
          Why this
        </a>
      </nav>

      <section id="habits" className="mt-12 scroll-mt-8">
        <h2 className="font-serif text-2xl text-ink">Core habits</h2>
        <p className="mt-2 text-sm leading-6 text-slate">
          Superpower = catching when AI is wrong — not typing faster than the model.
        </p>
        <ul className="mt-4 space-y-0 divide-y divide-line rounded-[10px] border border-line bg-paper">
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
        <h2 className="font-serif text-2xl text-ink">Mid-level roadmap</h2>
        <p className="mt-2 text-sm leading-6 text-slate">
          Four domains from the 2026 DSA × AI talk. Check them as you get real reps, not video
          tourism.
        </p>
        <div className="mt-6 space-y-5">
          {MID_DOMAINS.map((domain) => (
            <div key={domain.id} className="sky-card overflow-hidden">
              <div className="border-b border-line px-4 py-3 sm:px-5">
                <h3 className="font-serif text-xl text-ink">{domain.title}</h3>
                <p className="mt-1 text-sm text-slate">{domain.blurb}</p>
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
        <h2 className="font-serif text-2xl text-ink">Algos problem pack</h2>
        <p className="mt-2 text-sm leading-6 text-slate">
          From your Algos.pdf — pattern coverage across arrays through bit manipulation. Goal is
          recognition and complexity intuition so you can audit AI, not grind volume forever.
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter problems…"
            className="w-full rounded-[10px] border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-fog focus:border-fog sm:max-w-xs"
          />
          <label className="flex items-center gap-2 text-sm text-slate">
            <input
              type="checkbox"
              checked={onlyOpen}
              onChange={(e) => setOnlyOpen(e.target.checked)}
              className="accent-ink"
            />
            Hide completed
          </label>
        </div>

        <div className="mt-6 space-y-5">
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
              <div key={cat.id} className="sky-card overflow-hidden">
                <div className="flex items-baseline justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
                  <h3 className="font-serif text-xl text-ink">{cat.title}</h3>
                  <span className="shrink-0 text-xs tracking-wide text-slate uppercase">
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
                          className="mt-1 accent-ink"
                        />
                        <div className="min-w-0 flex-1">
                          <label
                            htmlFor={key}
                            className={`cursor-pointer text-sm leading-6 ${
                              done[key] ? "text-fog line-through" : "text-ink"
                            }`}
                          >
                            {prob.title}
                          </label>
                          <div>
                            <a
                              href={leetcodeUrl(prob.slug)}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-slate underline underline-offset-2 hover:text-ink"
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

      <section id="thesis" className="mt-12 scroll-mt-8 pb-8">
        <h2 className="font-serif text-2xl text-ink">Why this track</h2>
        <div className="mt-4 space-y-3 text-sm leading-7 text-ink-soft">
          <p>
            Dropping DSA entirely as a junior is a trap. Skipping AI fluency as a mid-level
            engineer is the other trap. Market wants orchestrators who can architect undefined
            problems and validate AI output under load and security pressure.
          </p>
          <p>
            AI code is probabilistic. It hallucinates. Local demos pass; production edge cases
            melt infra if you cannot read complexity and concurrency. Interviews increasingly hand
            you messy multi-file / AI-generated code and ask you to debug live.
          </p>
          <p>
            Fundamentals (CS physics) do not change weekly — tools do. Do not abandon boring
            scratch-building; do not become a purist who ignores AI either.
          </p>
          <p className="text-slate">
            Source talk:{" "}
            <a
              href="https://www.youtube.com/watch?v=yzkKVFX4-bE"
              target="_blank"
              rel="noreferrer"
              className="text-ink underline underline-offset-4"
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
        className="mt-1 accent-ink"
      />
      <label
        htmlFor={id}
        className={`cursor-pointer text-sm leading-6 ${
          checked ? "text-fog line-through" : "text-ink"
        }`}
      >
        {label}
      </label>
    </li>
  );
}
