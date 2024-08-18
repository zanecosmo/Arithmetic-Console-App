import * as readline from "node:readline";
import { Operation } from "../types";
import { trial } from "../menuModule";
import { displayDigitCountPrompt } from "./digit-count";

const operations: Operation[] = [
  { symbol: "+", isSelected: false },
  { symbol: "-", isSelected: false },
  { symbol: "*", isSelected: false },
  { symbol: "/", isSelected: false }
];

let validationMessage: string | null = null;

let pointer: number = 0;

export const display = () => {
  initialize();
  renderPrompt();
};

const validateInput = (): string | null => {
  for (let operation in operations) {
    if (operations[operation].isSelected === true) return null;
  };

  return "Must have at least one operation selected";
};

const initialize = () => {
  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.setRawMode != null) process.stdin.setRawMode(true);
  process.on('uncaughtException', (err) => console.log(err));
  process.stdout.write('\x1b[?25l'); // Hide the cursor
  process.stdin.addListener('keypress', keypressHandler);
}

const renderPrompt = () => {
  console.log("Choose Operations:")

  operations.forEach((operation, index) => {
    let line = "";
    line += pointer === index ? "> " : "  ";
    line += operation.isSelected ? "[x] " : "[ ] ";
    line += operation.symbol;
    console.log(line);
  });

  if (validationMessage !== null) console.log(validationMessage);
};

const deinitialize = () => {
  process.stdin.removeListener("keypress", keypressHandler);
  process.stdin.setRawMode(false);
  process.stdout.write('\x1b[?25h'); // Show the cursor
}

const updateMenuState = () => {
  for (let operation in operations) {
    if (operations[operation].isSelected) {
      trial.operations.push(operations[operation].symbol);
    };
  };
};

const keypressHandler = (_: any, key: any) => {
  if (key && key.ctrl && key.name == 'c') process.exit();

  if (key && key.name === "up") {
    pointer = pointer === 0 ? 3 : pointer - 1;
  };

  if (key && key.name === "down") {
    pointer = pointer === 3 ? 0 : pointer + 1;
  };

  if (key && key.name === "space") {
    operations[pointer].isSelected = !operations[pointer].isSelected;
  }

  if (key && key.name === "return") {
    validationMessage = validateInput();

    if (validationMessage === null) {
      deinitialize();
      updateMenuState();
      displayDigitCountPrompt();
      return;
    };
  };

  console.clear();
  renderPrompt();
};