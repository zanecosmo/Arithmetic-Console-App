import chalk from "chalk";
import { rl, trial } from "../menuModule";
import { Operands, Operations, Problem, Trial } from "../types";

const operations: Operations = {
  ["+"]: (operands: Operands) => operands[0] + operands[1],
  ["-"]: (operands: Operands) => operands[0] - operands[1],
  ["*"]: (operands: Operands) => operands[0] * operands[1],
  ["/"]: (operands: Operands) => operands[0] / operands[1],
};

const digitCount = (num: number): number => Math.max(Math.floor(Math.log10(Math.abs(num))), 0) + 1;
const getRandomInt = (max: number): number => Math.floor(Math.random() * (max - 1)) + 1;
const chooseOperation = (trial: Trial): string => trial.operations[getRandomInt(trial.operations.length) - 1];
const executeOperation = (operands: Operands, operation: string): number => operations[operation](operands);
const generateOperands = (maxDigitCount: number): Operands => {
  const maxSize = (10 ** maxDigitCount) - 1
  return [getRandomInt(maxSize), getRandomInt(maxSize)];
};

const generateProblem = (trial: Trial): Problem => {
  const operands: Operands = generateOperands(trial.maxDigitCount);
  const operation = chooseOperation(trial);
  const answer = executeOperation(operands, operation);

  return {
    answer: answer,
    submission: null,
    startTimeSeconds: trial.currentTimeSeconds,
    finishTimeSeconds: null,
    operands: operands,
    operation: operation,
  };
};

const renderProblem = (problem: Problem): void => {
  if (validationMessage !== null) {
    console.log(chalk.red(validationMessage));
    validationMessage = null;
  };

  const digits1 = digitCount(problem.operands[0]);
  const digits2 = digitCount(problem.operands[1]);

  const longerNumber = Math.max(digits1, digits2);
  const shorterNumber = Math.min(digits1, digits2);

  const largerNumber = Math.max(problem.operands[0], problem.operands[1]);
  const smallerNumber = Math.min(problem.operands[0], problem.operands[1]);

  const difference = longerNumber - shorterNumber;

  console.log("")

  console.log("    " + largerNumber);

  let spacer = " ";

  for (let i = 0; i < difference; i++) {
    spacer += " ";
  };

  console.log("  " + problem.operation + spacer + smallerNumber);

  let seperator = "  -";

  for (let i = 0; i <= longerNumber; i++) {
    seperator += "-";
  };

  console.log(seperator);
};

let validationMessage: string | null = null;

const validate = (text: string): void => {
  if (Number.isNaN(Number(text))) validationMessage = "Invalid Answer";
};

export const displayProblems = async (): Promise<void> => {
  while (trial.timerId !== undefined) {

    const problem = generateProblem(trial);

    renderProblem(problem);

    const submission: string = await rl.question(">  ");

    validate(submission);

    if (validationMessage !== null) continue;

    problem.submission = Number(submission);
    problem.finishTimeSeconds = trial.currentTimeSeconds;
    trial.problems.push(problem);
  };
};