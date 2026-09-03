import Link from "next/link";
import { topicsFor } from "@/content/catalog";
import { topicPath } from "@/content/catalog";

export default function HomePage() {
  const firstJava = topicsFor("java")[0];
  const firstDsa = topicsFor("dsa")[0];

  return (
    <div className="max-w-xl">
      <p className="eyebrow">Start here</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ink">
        One list. One topic.
      </h1>
      <p className="mt-4 text-base leading-7 text-ink-soft">
        Learn Java first if you need it, then DSA (NeetCode), HLD, LLD, and AI. The left side is the
        only list. Open one title. When that one is clear, open the next.
      </p>
      {firstJava ? (
        <p className="mt-8 text-sm leading-6 text-slate">
          New to Java?{" "}
          <Link href={topicPath(firstJava)} className="text-ink underline underline-offset-4">
            {firstJava.title}
          </Link>
          {" · "}
          Live compilers:{" "}
          <a
            href="https://onecompiler.com/java"
            target="_blank"
            rel="noreferrer"
            className="text-ink underline underline-offset-4"
          >
            OneCompiler
          </a>
        </p>
      ) : null}
      {firstDsa ? (
        <p className="mt-3 text-sm leading-6 text-slate">
          Ready for DSA:{" "}
          <Link href={topicPath(firstDsa)} className="text-ink underline underline-offset-4">
            {firstDsa.title}
          </Link>
        </p>
      ) : null}
    </div>
  );
}
