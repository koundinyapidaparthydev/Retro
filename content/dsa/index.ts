import type { Topic } from "../schema";
import { topics as arrays } from "./arrays";
import { topics as hashing } from "./hashing";
import { topics as pointers } from "./pointers";
import { topics as searching } from "./searching";
import { topics as sorting } from "./sorting";
import { topics as stacks } from "./stacks";
import { topics as heaps } from "./heaps";
import { topics as lists } from "./lists";
import { topics as trees } from "./trees";
import { topics as graphs } from "./graphs";
import { topics as recursion } from "./recursion";
import { topics as dp } from "./dp";
import { topics as greedy } from "./greedy";
import { topics as strings } from "./strings";
import { topics as bits } from "./bits";
import { topics as math } from "./math";
import { topics as advanced } from "./advanced";
import { topics as neetcode75 } from "./neetcode-75";
import { topics as neetcode150 } from "./neetcode-150";

export const dsaTopics: Topic[] = [
  ...neetcode75,
  ...neetcode150,
  ...arrays,
  ...hashing,
  ...pointers,
  ...searching,
  ...sorting,
  ...stacks,
  ...heaps,
  ...lists,
  ...trees,
  ...graphs,
  ...recursion,
  ...dp,
  ...greedy,
  ...strings,
  ...bits,
  ...math,
  ...advanced,
];
