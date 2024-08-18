import chalk from "chalk";
import { aborter, rl, trial } from "../menuModule";
import { Operands, Operations, Problem, Trial } from "../types";
import { displayPostTrialPrompt } from "./post-trial";

const operations: Operations = {
  ["+"]: (operands: Operands) => operands[0] + operands[1],
  ["-"]: (operands: Operands) => operands[0] - operands[1],
  ["*"]: (operands: Operands) => operands[0] * operands[1],
  ["/"]: (operands: Operands) => operands[0] / operands[1],
};

const digitCount = (num: number): number => Math.max(Math.floor(Math.log10(Math.abs(num))), 0) + 1;
const getRandomInt = (max: number): number => Math.floor(Math.random() * (max)) + 1;

const chooseOperation = (trial: Trial): string => trial.operations[getRandomInt(trial.operations.length) - 1];
const executeOperation = (operands: Operands, operation: string): number => operations[operation](operands);

const generateOperands = (maxDigitCount: number): Operands => {
  const maxSize = (10 ** maxDigitCount) - 1;

  const operand1 = getRandomInt(maxSize);
  const operand2 = getRandomInt(maxSize);

  const larger = Math.max(operand1, operand2);
  const smaller = Math.min(operand1, operand2);

  return [larger, smaller];
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

  const difference = longerNumber - shorterNumber;

  console.log("")

  console.log("    " + problem.operands[0]);

  let spacer = " ";

  for (let i = 0; i < difference; i++) {
    spacer += " ";
  };

  console.log("  " + problem.operation + spacer + problem.operands[1]);

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

    try {
      const submission: string = await rl.question(">  ", { signal: aborter.signal });
    
      validate(submission);
  
      if (validationMessage !== null) continue;
  
      problem.submission = Number(submission);

      console.log(problem.answer === problem.submission ? chalk.green("CORRECT") : chalk.red("INCORRECT"));
      console.log("Correct Answer: " + chalk.green(problem.answer));
      console.log("Your Answer: " + (problem.answer === problem.submission ? chalk.green(problem.submission) : chalk.red(problem.submission)));
  
      problem.finishTimeSeconds = trial.currentTimeSeconds;
      trial.problems.push(problem);
    }

    catch (error) {
      if (aborter.signal.aborted) {
        console.log("");
        console.log("TIME LIMIT REACHED");
        console.log("------------------");

        displayPostTrialPrompt();
      };
    };
  };
};