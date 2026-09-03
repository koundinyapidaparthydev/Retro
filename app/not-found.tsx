import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-serif text-4xl">This topic is not in the archive yet.</h1>
      <p className="mt-3 text-slate">The slug is wrong, or it is waiting for a later pass.</p>
      <Link href="/" className="mt-6 inline-block text-accent-deep hover:underline">
        Back home
      </Link>
    </div>
  );
}
