"use strict";
// import { Trial, OperationMenuState, MenuState, Operation } from "./types";
// import * as readline from "node:readline";
// import { menuState } from "./menuState";
// readline.emitKeypressEvents(process.stdin);
// if (process.stdin.setRawMode != null) process.stdin.setRawMode(true);
// let pointer = 0;
// const operations: Operation[] = [
//     { symbol: "+", isSelected: false },
//     { symbol: "-", isSelected: false },
//     { symbol: "*", isSelected: false },
//     { symbol: "/", isSelected: false }
// ];
// const renderMenu = (validationMessage: string | null) => {
//     console.log("Choose Operations:")
//     operations.forEach((operation, index) => {
//         let line = "";
//         // log the pointer or lack there of
//         line += pointer === index ? "> " : "  ";
//         // log the box and whether it is empty or not
//         line += operation.isSelected ? "[x] " : "[ ] ";
//         // log the option
//         line += operation.symbol;
//         console.log(line);
//     });
//     if (validationMessage !== null) console.log(validationMessage);
// };
// process.on('uncaughtException', function (err) {
//     console.log(err);
// });
// renderMenu(null);
// process.stdout.write('\x1b[?25l'); // Hide the cursor
// const trial: Trial = {
//     operations: [],
//     maxDigitCount: 0,
//     timeLimitSeconds: 0,
//     currentTimeSeconds: 0,
//     hasCancelled: false,
//     problems: [],
//     timerId: undefined,
// };
// const validateOperations = (operations: Operation[]): boolean => {
//     for (let operation in operations) {
//         if (operations[operation].isSelected === true) return true;
//     };
//     return false;
// };
// let rl: readline.Interface | null = null;
// rl = readline.createInterface({ input: process.stdin, output: process.stdout });
// let validationMessage: string | null = null;
// // validation message, trial?
// // v
// // process, pointer, operations --- rl
// // process, pointer, operations, key, validation message
// const keypressHandler = (_: any, key: any) => {
//     if (key && key.ctrl && key.name == 'c') process.exit();
//     if (key && key.name === "up") {
//         pointer = pointer === 0 ? 3 : pointer - 1;
//     };
//     if (key && key.name === "down") {
//         pointer = pointer === 3 ? 0 : pointer + 1;
//     };
//     if (key && key.name === "space") {
//         console.log(operations[pointer].isSelected);
//         operations[pointer].isSelected = !operations[pointer].isSelected;
//     }
//     if (key && key.name === "return") {
//         const operationSelected = validateOperations(operations);
//         if (!operationSelected) validationMessage = "Must have at least one operation selected";
//         else {
//             validationMessage = null;
//             process.stdin.removeListener("keypress", keypressHandler);
//             process.stdin.setRawMode(false);
//             process.stdout.write('\x1b[?25h'); // Show the cursor
//             // insert the operations into the trial?
//             for (let operation in operations) {
//                 if (operations[operation].isSelected) trial.operations.push(operations[operation].symbol);
//             }
//             // connect to stdin and as question/prompt
//             nextPrompt(validationMessage);
//             return;
//         };
//     };
//     console.clear();
//     renderMenu(validationMessage);
// };
// process.stdin.addListener('keypress', keypressHandler);
// // rl, validation message, trial
// const nextPrompt = (validationMessage: string | null): void => {
//     console.clear();
//     console.log(trial.operations);
//     process.stdout.write('\x1b[?25h'); // Show the cursor
//     console.log("----");
//     if (validationMessage !== null) console.log(validationMessage);
//     console.log("----");
//     if (rl === null) {
//         throw new Error("rl ain't workin'");
//     };
//     rl.question("Maximum Operand Size (number of digits): ", (maxDigitCount: string) => {
//         // validate string it must be a number
//         // if it's invalid,
//         // clear console, set validation message to whatever
//         // call next prompt again
//         // return
//         trial.maxDigitCount = parseInt(maxDigitCount);
//         validationMessage = null;
//         timeLimitPrompt(validationMessage);
//     });
// };
// // rl, validation message, trial, 
// const timeLimitPrompt = (validationMessage: string | null): void => {
//     console.clear();
//     console.log(trial.operations);
//     console.log(trial.maxDigitCount);
//     if (validationMessage !== null) console.log(validationMessage);
//     if (rl === null) {
//         throw new Error("rl ain't workin'");
//     };
//     rl.question("Time limit in seconds: ", (timeLimitSeconds: string) => {
//         // validate string it must be a number
//         // if it's invalid,
//         // clear console, set validation message to whatever
//         // start trial
//         // return
//         trial.timeLimitSeconds = parseInt(timeLimitSeconds);
//         validationMessage = null;
//     });
// };
// // prompt: menu is a special case which requires override of readline, and takes keybord inputs.
// // it has a state for it's menu
// // it's state overrides the overarching trial state upon "return"
// // return also exits out of this prompt and goes to the next one
// interface IPrompt {
//     validationMessage: string | null,
//     validateInput: () => string | null,
//     display: () => void
//   };
//   class DigitCountPrompt implements IPrompt {
//     validationMessage = "";
//     validateInput() {
//       return "";
//     }
//     display() {
//     }
//   }
