import Link from "next/link";

export function Header() {
  return (
    <header className="rise border-b border-line pb-7">
      <Link href="/" className="inline-block no-underline">
        <div className="eyebrow">Mid-level · 3 YOE · progress persists</div>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-text">
          <span className="text-amber">DSA</span>
          {" × "}
          <span className="text-teal">AI</span>
          {" Roadmap"}
        </h1>
      </Link>
      <p className="lede mt-3 max-w-[40rem] text-[1.05rem] text-muted">
        Foundations stay; tools shift. You become an AI orchestrator who can still reason about
        algorithms — not a code typist and not a blind LeetCode grinder.
      </p>
      <div className="meta mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.78rem] text-muted">
        <span>Algos.pdf + 2026 mid-level path</span>
        <a
          href="https://www.youtube.com/watch?v=yzkKVFX4-bE"
          target="_blank"
          rel="noreferrer"
          className="text-teal no-underline border-b border-teal/35 hover:border-teal"
        >
          Watch source talk
        </a>
      </div>
    </header>
  );
}
