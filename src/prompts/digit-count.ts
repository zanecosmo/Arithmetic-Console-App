import { trial, rl } from "../menuModule";
import { displayTimeLimitPrompt } from "./time-limit";

let validationMessage: string | null = null;

export const displayDigitCountPrompt = async (): Promise<void> => {
  console.clear();

  console.log(trial.operations);

  if (validationMessage !== null) console.log(validationMessage);

  const maxDigitCount = await rl.question("Maximum Operand Size (number of digits): ");
  const digitCount: number = parseInt(maxDigitCount, 10);

  if (typeof digitCount !== "number") {
    validationMessage = "Must enter a valid digit count"
    displayDigitCountPrompt();
    return;
  };

  trial.maxDigitCount = digitCount;
  validationMessage = null;

  displayTimeLimitPrompt();
};