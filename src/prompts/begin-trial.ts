import { trial, rl } from "../menuModule";
import { Trial } from "../types";
import { displayProblems } from "./problem";

const stopTimer = (trial: Trial) => {
  if (trial.timerId === undefined) return;
  clearInterval(trial.timerId);
  trial.timerId = undefined;
};

const startTimer = (trial: Trial): void => {
  trial.timerId = setInterval(() => {
    trial.currentTimeSeconds++;
    if (trial.currentTimeSeconds >= trial.timeLimitSeconds) {
      console.log("TIME LIMIT REACHED");
      stopTimer(trial);
    };
  }, 1000);
};

export const displayBeginTrialPrompt = async (): Promise<void> => {
  console.clear();

  console.log(trial.operations);
  console.log(trial.maxDigitCount);
  console.log(trial.timeLimitSeconds);

  await rl.question("Press ENTER to begin. Press CTRL + C to quit.");

  startTimer(trial);
  displayProblems();
};
