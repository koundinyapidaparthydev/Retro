export type JsRun = {
  title: string;
  code: string;
  logs: string[];
};

export function run(title: string, code: string, logs: string[]): JsRun {
  return { title, code: code.trim(), logs };
}
