"use strict";
// import { OperationMenuState, MenuState, Operation } from "./types";
// import * as readline from "node:readline";
// import { menuState } from "./menuState";
// const operationMenuState: OperationMenuState = {
//   pointer: 0,
//   operations: [
//     { symbol: "+", isSelected: false },
//     { symbol: "-", isSelected: false },
//     { symbol: "*", isSelected: false },
//     { symbol: "/", isSelected: false }
//   ]
// };
// const validateOperations = (operations: Operation[]): boolean => {
//   for (let operation in operations) {
//       if (operations[operation].isSelected === true) return true;
//   };
//   return false;
// };
// const renderMenu = (validationMessage: string | null) => {
//   console.log("Choose Operations:")
//   operationMenuState.operations.forEach((operation, index) => {
//       let line = "";
//       line += operationMenuState.pointer === index ? "> " : "  ";
//       line += operation.isSelected ? "[x] " : "[ ] ";
//       line += operation.symbol;
//       console.log(line);
//   });
//   if (validationMessage !== null) console.log(validationMessage);
// };
// const keypressHandler = (_: any, key: any) => {
//   console.clear();
//   renderMenu(menuState.validationMessage);
//   if (key && key.ctrl && key.name == 'c') process.exit();
//   if (key && key.name === "up") {
//     operationMenuState.pointer = operationMenuState.pointer === 0 ? 3 : operationMenuState.pointer - 1;
//   };
//   if (key && key.name === "down") {
//     operationMenuState.pointer = operationMenuState.pointer === 3 ? 0 : operationMenuState.pointer + 1;
//   };
//   if (key && key.name === "space") {
//     console.log(operationMenuState.operations[operationMenuState.pointer].isSelected);
//     operationMenuState.operations[operationMenuState.pointer].isSelected = !operationMenuState.operations[operationMenuState.pointer].isSelected;
//   }
//   if (key && key.name === "return") {
//     const operationSelected = validateOperations(operationMenuState.operations);
//     if (!operationSelected) menuState.validationMessage = "Must have at least one operation selected";
//     else {
//       deinitialize();
//       insertChosenOperations(menuState, operationMenuState);
//       nextPrompt(menuState.validationMessage);
//     };
//   };
// };
// const initialize = () => {
//   readline.emitKeypressEvents(process.stdin);
//   if (process.stdin.setRawMode != null) process.stdin.setRawMode(true);
//   process.on('uncaughtException', (err) => console.log(err));
//   process.stdout.write('\x1b[?25l'); // Hide the cursor
//   process.stdin.addListener('keypress', keypressHandler);
// };
// const deinitialize = () => {
//   menuState.validationMessage = null;
//   process.stdin.removeListener("keypress", keypressHandler);
//   process.stdin.setRawMode(false);
//   process.stdout.write('\x1b[?25h'); // Show the cursor
// };
// const insertChosenOperations = (mainMenu: MenuState, opMenu: OperationMenuState) => {
//   for (let operation in opMenu.operations) {
//     if (opMenu.operations[operation].isSelected) {
//       mainMenu.trial.operations.push(opMenu.operations[operation].symbol);
//     };
//   };
// };
// const nextPrompt = (validationMessage: string | null): void => {
//   console.clear();
//   console.log(menuState.trial.operations);
//   if (validationMessage !== null) console.log(validationMessage);
//   menuState.rl.question("Maximum Operand Size (number of digits): ", (maxDigitCount: string) => {
//       // validate string it must be a number
//       // if it's invalid,
//       // clear console, set validation message to whatever
//       // call next prompt again
//       // return
//       menuState.trial.maxDigitCount = parseInt(maxDigitCount);
//       validationMessage = null;
//       timeLimitPrompt(validationMessage);
//   });
// };
// const timeLimitPrompt = (validationMessage: string | null): void => {
//   console.clear();
//   console.log(menuState.trial.operations);
//   console.log(menuState.trial.maxDigitCount);
//   if (validationMessage !== null) console.log(validationMessage);
//   if (menuState.rl === null) throw new Error("rl ain't workin'");
//   menuState.rl.question("Time limit in seconds: ", (timeLimitSeconds: string) => {
//       // validate string it must be a number
//       // if it's invalid,
//       // clear console, set validation message to whatever
//       // start trial
//       // return
//       menuState.trial.timeLimitSeconds = parseInt(timeLimitSeconds);
//       validationMessage = null;
//   });
// };
