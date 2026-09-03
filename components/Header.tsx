"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TRACKS, type TrackId } from "@/content/schema";

const NAV: TrackId[] = ["dsa", "hld", "lld"];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-white/70 bg-white/70 px-4 py-2.5 shadow-[0_8px_30px_rgba(15,40,80,0.06)] backdrop-blur">
      <Link href="/" className="pl-1">
        <div className="text-[11px] font-medium tracking-[0.16em] text-accent-deep uppercase">
          KP archive
        </div>
        <div className="font-serif text-2xl leading-none text-ink">Retro</div>
      </Link>
      <nav className="flex flex-wrap items-center gap-1 text-sm">
        {NAV.map((id) => {
          const active = pathname === `/${id}` || pathname.startsWith(`/${id}/`);
          return (
            <Link
              key={id}
              href={`/${id}`}
              className={`rounded-full px-3.5 py-1.5 ${
                active ? "bg-ink text-white" : "text-ink-soft hover:bg-sky-wash"
              }`}
            >
              {TRACKS[id].label}
            </Link>
          );
        })}
        <Link
          href="/search"
          className={`rounded-full px-3.5 py-1.5 ${
            pathname === "/search" ? "bg-accent text-white" : "text-ink-soft hover:bg-sky-wash"
          }`}
        >
          Search
        </Link>
      </nav>
    </header>
  );
}
