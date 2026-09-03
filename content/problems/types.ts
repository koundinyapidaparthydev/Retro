export type ProblemCard = {
  given: string;
  find: string;
  example: string;
  askedAs: string[];
};

export function problem(
  given: string,
  find: string,
  example: string,
  askedAs: string[],
): ProblemCard {
  return { given, find, example, askedAs };
}
