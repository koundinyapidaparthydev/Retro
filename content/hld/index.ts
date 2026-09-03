import type { Topic } from "../schema";
import { topics as architecture } from "./architecture";
import { topics as asyncTopics } from "./async";
import { topics as attributes } from "./attributes";
import { topics as data } from "./data";
import { topics as designs } from "./designs";
import { topics as estimates } from "./estimates";
import { topics as method } from "./method";
import { topics as models } from "./models";
import { topics as realtimeFiles } from "./realtime-files";
import { topics as reliability } from "./reliability";
import { topics as securityOps } from "./security-ops";
import { topics as traffic } from "./traffic";

export const hldTopics: Topic[] = [
  ...attributes,
  ...models,
  ...estimates,
  ...traffic,
  ...architecture,
  ...data,
  ...asyncTopics,
  ...reliability,
  ...realtimeFiles,
  ...securityOps,
  ...designs,
  ...method,
];
