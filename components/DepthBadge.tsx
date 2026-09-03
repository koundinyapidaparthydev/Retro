import { DEPTH_LABEL, type Depth } from "@/content/schema";

const STYLES: Record<Depth, string> = {
  core: "bg-sky-wash text-accent-deep",
  next: "bg-white text-ink-soft border border-line",
  advanced: "bg-ink text-white",
};

export function DepthBadge({ depth }: { depth: Depth }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide ${STYLES[depth]}`}>
      {DEPTH_LABEL[depth]}
    </span>
  );
}
