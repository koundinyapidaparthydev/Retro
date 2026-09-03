import type { Topic } from "../schema";
import { topics as searching } from "./searching";
import { topics as sorting } from "./sorting";
import { topics as pointers } from "./pointers";
import { topics as recursion } from "./recursion";
import { topics as lists } from "./lists";
import { topics as stacks } from "./stacks";
import { topics as trees } from "./trees";
import { topics as heaps } from "./heaps";
import { topics as hashing } from "./hashing";
import { topics as graphs } from "./graphs";
import { topics as dp } from "./dp";
import { topics as greedy } from "./greedy";
import { topics as strings } from "./strings";
import { topics as bits } from "./bits";
import { topics as math } from "./math";
import { topics as arrays } from "./arrays";
import { topics as advanced } from "./advanced";

export const dsaTopics: Topic[] = [
  ...searching,
  ...sorting,
  ...pointers,
  ...recursion,
  ...lists,
  ...stacks,
  ...trees,
  ...heaps,
  ...hashing,
  ...graphs,
  ...dp,
  ...greedy,
  ...strings,
  ...bits,
  ...math,
  ...arrays,
  ...advanced,
];
