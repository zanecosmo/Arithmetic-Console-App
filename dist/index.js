"use strict";
// import { input, checkbox } from "@inquirer/prompts";
// // import { CancelablePromise } from "@inquirer/type/dist/cjs/types/inquirer";
// import chalk from "chalk";
// import inquirer from "inquirer";
// // const rl = readline.createInterface({ input, output });
// type Operands = [number, number];
// interface Problem {
//     answer: number,
//     submission: number | null,
//     startTimeSeconds: number,
//     finishTimeSeconds: number | null,
//     operands: Operands,
//     operation: string
// };
// interface Trial {
//     operations: string[],
//     maxDigitCount: number,
//     timeLimitSeconds: number,
//     currentTimeSeconds: number,
//     hasCancelled: boolean,
//     problems: Problem[],
//     timerId: NodeJS.Timeout | undefined,
// };
// interface Operations {
//     [key: string]: (operands: Operands) => number,
// }
// const operations: Operations = {
//     ["+"]: (operands: Operands) => operands[0] + operands[1],
//     ["-"]: (operands: Operands) => operands[0] - operands[1],
//     ["*"]: (operands: Operands) => operands[0] * operands[1],
//     ["/"]: (operands: Operands) => operands[0] / operands[1],
// };
// const getRandomInt = (max: number): number => Math.floor(Math.random() * (max - 1)) + 1;
// const generateOperands = (maxDigitCount: number): Operands => {
//     const maxSize = (10 ** maxDigitCount) - 1
//     return [getRandomInt(maxSize), getRandomInt(maxSize)];
// };
// const executeOperation = (operands: Operands, operation: string): number => operations[operation](operands);
// const chooseOperation = (trial: Trial): string => trial.operations[getRandomInt(trial.operations.length) - 1];
// const digitCount = (num: number): number => Math.max(Math.floor(Math.log10(Math.abs(num))), 0) + 1;
// const generateProblem = (trial: Trial): Problem => {
//     const operands: Operands = generateOperands(trial.maxDigitCount);
//     const operation = chooseOperation(trial);
//     const answer = executeOperation(operands, operation);
//     return {
//         answer: answer,
//         submission: null,
//         startTimeSeconds: trial.currentTimeSeconds,
//         finishTimeSeconds: null,
//         operands: operands,
//         operation: operation,
//     };
// };
// const stopTimer = (trial: Trial) => {
//     if (trial.timerId === undefined) return;
//     clearInterval(trial.timerId);
//     trial.timerId = undefined;
// };
// const startTimer = (trial: Trial): void => {
//     trial.timerId = setInterval(() => {
//         trial.currentTimeSeconds++;
//         if (trial.currentTimeSeconds >= trial.timeLimitSeconds) {
//             console.log("TIME LIMIT REACHED");
//             stopTimer(trial);
//         };
//     }, 1000);
// };
// const renderProblem = (problem: Problem): void => {
//     const digits1 = digitCount(problem.operands[0]);
//     const digits2 = digitCount(problem.operands[1]);
//     const longerNumber = Math.max(digits1, digits2);
//     const shorterNumber = Math.min(digits1, digits2);
//     const largerNumber = Math.max(problem.operands[0], problem.operands[1]);
//     const smallerNumber = Math.min(problem.operands[0], problem.operands[1]);
//     const difference = longerNumber - shorterNumber;
//     console.log("")
//     console.log("    " + largerNumber);
//     let spacer = " ";
//     for (let i = 0; i < difference; i++) {
//         spacer += " ";
//     };
//     console.log("  " + problem.operation + spacer + smallerNumber);
//     let seperator = "  -";
//     for (let i = 0; i <= longerNumber; i++) {
//         seperator += "-";
//     };
//     console.log(seperator);
// };
// const prompts = {
//     chooseOperations: {
//         message: "Choose Operations:",
//         theme: {
//             prefix: ">",
//             style: { message: (msg: string) => chalk.white(msg) },
//             icon: {
//                 checked: " [x]",
//                 unchecked: " [ ]",
//                 cursor: ">"
//             }
//         },
//         choices: [
//             { name: "+", value: "+" },
//             { name: "-", value: "-" },
//             { name: "*", value: "*" },
//             { name: "/", value: "/" },
//         ]
//     },
//     maximumOperandSize: {
//         message: "Maximum Operand Size (number of digits)",
//         theme: {
//             prefix: ">",
//             style: { message: (msg: string) => chalk.white(msg) },
//         },
//         validate: (size: string) => Number.isNaN(parseInt(size)) ? "Must be a valid Number" : true,
//     },
//     timeLimitSeconds: {
//         message: "Time Limit (seconds)",
//         theme: {
//             prefix: ">",
//             style: { message: (msg: string) => chalk.white(msg) },
//         },
//         validate: (size: string) => Number.isNaN(parseInt(size)) ? "Must be a valid Number" : true
//     },
//     beginTrial: {
//         message: "Press ENTER to begin. Press CTRL + C to quit.",
//         theme: {
//             prefix: ">",
//             style: { message: (msg: string) => chalk.white(msg) },
//         }
//     },
//     submitAnswer: {
//         type: "input",
//         name: "submit",
//         message: "",
//         theme: {
//             prefix: ">"
//         }
//     }
// };
// const program = async (): Promise<void> => {
//     const trial: Trial = {
//         operations: await checkbox(prompts.chooseOperations),
//         maxDigitCount: parseInt(await input(prompts.maximumOperandSize)),
//         timeLimitSeconds: parseInt(await input(prompts.timeLimitSeconds)),
//         currentTimeSeconds: 0,
//         hasCancelled: false,
//         problems: [],
//         timerId: undefined,
//     };
//     await input(prompts.beginTrial);
//     startTimer(trial);
//     while (trial.timerId !== undefined) {
//         const problem = generateProblem(trial);
//         renderProblem(problem);
//         const submission = input(prompts.submitAnswer);
//         problem.submission = parseInt(await submission)
//         problem.finishTimeSeconds = trial.currentTimeSeconds;
//         trial.problems.push(problem);
//     };
// };
// program();
