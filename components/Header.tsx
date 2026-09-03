"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TRACKS, type TrackId } from "@/content/schema";

const NAV: TrackId[] = ["dsa", "hld", "lld"];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="crt-glow flex flex-wrap items-end justify-between gap-4 bg-panel px-4 py-3 sm:px-5">
      <Link href="/" className="group block">
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-dim">
          kp archive
        </div>
        <div className="font-mono text-2xl font-semibold tracking-[0.14em] text-amber group-hover:text-[#f6d27a]">
          RETRO
        </div>
      </Link>
      <nav className="flex flex-wrap items-center gap-1 font-mono text-xs uppercase tracking-[0.16em]">
        {NAV.map((id) => {
          const active = pathname === `/${id}` || pathname.startsWith(`/${id}/`);
          return (
            <Link
              key={id}
              href={`/${id}`}
              className={`px-3 py-1.5 ${
                active
                  ? "bg-amber text-bg"
                  : "text-muted hover:bg-bg-elev hover:text-ink"
              }`}
            >
              {TRACKS[id].label}
            </Link>
          );
        })}
        <Link
          href="/search"
          className={`px-3 py-1.5 ${
            pathname === "/search"
              ? "bg-mint text-bg"
              : "text-muted hover:bg-bg-elev hover:text-ink"
          }`}
        >
          Search
        </Link>
      </nav>
    </header>
  );
}
