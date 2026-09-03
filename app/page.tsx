import Link from "next/link";
import { topicsFor } from "@/content/catalog";
import { topicPath } from "@/content/catalog";

export default function HomePage() {
  const first = topicsFor("dsa")[0];

  return (
    <div className="max-w-xl">
      <p className="eyebrow">Start here</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink">
        One list. One topic.
      </h1>
      <p className="mt-4 text-base leading-7 text-ink-soft">
        DSA, HLD, and LLD are not on at the same time. The left side is the only
        list. Open one title. When that one is clear, open the next.
      </p>
      {first ? (
        <p className="mt-8 text-sm leading-6 text-slate">
          First item:{" "}
          <Link href={topicPath(first)} className="text-ink underline underline-offset-4">
            {first.title}
          </Link>
        </p>
      ) : null}
    </div>
  );
}
