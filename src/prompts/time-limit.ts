import { trial, rl } from "../menuModule";
import { displayBeginTrialPrompt } from "./begin-trial";

let validationMessage: string | null = null;

export const displayTimeLimitPrompt = async (): Promise<void> => {
  console.clear();

  console.log(trial.operations);
  console.log(trial.maxDigitCount);

  if (validationMessage !== null) console.log(validationMessage);

  const timeLimitSeconds = await rl.question("Time limit in seconds: ");

  const timeLimit: number = parseInt(timeLimitSeconds, 10);

  if (typeof timeLimit !== "number") {
    validationMessage = "Must enter a valid time limit in seconds"
    displayTimeLimitPrompt();
    return;
  };

  trial.timeLimitSeconds = timeLimit;
  validationMessage = null;

  displayBeginTrialPrompt();
};