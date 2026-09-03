export type ProgressState = "unread" | "learning" | "known";

const STORAGE_KEY = "retro-progress-v1";

function key(track: string, slug: string) {
  return `${track}:${slug}`;
}

function readMap(): Record<string, ProgressState> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, ProgressState>) : {};
  } catch {
    return {};
  }
}

function writeMap(map: Record<string, ProgressState>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function getProgress(track: string, slug: string): ProgressState {
  return readMap()[key(track, slug)] ?? "unread";
}

export function setProgress(track: string, slug: string, state: ProgressState) {
  const map = readMap();
  if (state === "unread") delete map[key(track, slug)];
  else map[key(track, slug)] = state;
  writeMap(map);
  window.dispatchEvent(new Event("retro-progress"));
}

export function countProgress(track?: string) {
  const map = readMap();
  let learning = 0;
  let known = 0;
  for (const [k, state] of Object.entries(map)) {
    if (track && !k.startsWith(`${track}:`)) continue;
    if (state === "learning") learning += 1;
    if (state === "known") known += 1;
  }
  return { learning, known };
}
