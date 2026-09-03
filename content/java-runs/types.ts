export type CodeRun = {
  title: string;
  code: string;
  logs: string[];
};

/** @deprecated use CodeRun — kept so old imports compile while packs migrate */
export type JsRun = CodeRun;

export function run(title: string, code: string, logs: string[]): CodeRun {
  return { title, code: code.trim(), logs };
}
