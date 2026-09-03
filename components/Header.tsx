import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-line pb-4">
      <Link href="/" className="inline-block">
        <div className="text-[11px] font-medium tracking-[0.16em] text-slate uppercase">
          One topic at a time
        </div>
        <div className="font-serif text-2xl leading-none text-ink">Retro</div>
      </Link>
    </header>
  );
}
