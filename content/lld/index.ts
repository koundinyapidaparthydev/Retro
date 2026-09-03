import type { Topic } from "../schema";
import { topics as architecture } from "./architecture";
import { topics as classDesign } from "./class-design";
import { topics as concurrency } from "./concurrency";
import { topics as designs } from "./designs";
import { topics as method } from "./method";
import { topics as oop } from "./oop";
import { topics as patternCheatsheet } from "./pattern-cheatsheet";
import { topics as patternsBehavioral } from "./patterns-behavioral";
import { topics as patternsCreational } from "./patterns-creational";
import { topics as patternsStructural } from "./patterns-structural";
import { topics as principles } from "./principles";
import { topics as uml } from "./uml";

export const lldTopics: Topic[] = [
  ...oop,
  ...principles,
  ...uml,
  ...patternsCreational,
  ...patternsStructural,
  ...patternsBehavioral,
  ...concurrency,
  ...classDesign,
  ...architecture,
  ...designs,
  ...method,
  ...patternCheatsheet,
];
