import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-dim">
        404 · no signal
      </p>
      <h1 className="mt-2 text-3xl font-medium">This topic is not in the archive yet.</h1>
      <p className="mt-3 text-muted">
        Either the slug is wrong, or it is waiting for a later pass.
      </p>
      <Link href="/" className="amber-link mt-6 inline-block font-mono text-sm">
        Return to boot
      </Link>
    </div>
  );
}
