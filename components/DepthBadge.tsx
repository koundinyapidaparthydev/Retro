import { DEPTH_LABEL, type Depth } from "@/content/schema";

const STYLES: Record<Depth, string> = {
  core: "border-amber text-amber",
  next: "border-mint text-mint",
  advanced: "border-muted text-muted",
};

export function DepthBadge({ depth }: { depth: Depth }) {
  return (
    <span
      className={`inline-block border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] ${STYLES[depth]}`}
    >
      {DEPTH_LABEL[depth]}
    </span>
  );
}
