import chalk from "chalk";
import { trial, resetTrial, rl } from "../menuModule";
import { displayOperationsPrompt } from "./operations";

export const displayPostTrialPrompt = async (): Promise<void> => {
    let correctAnswers = 0;
    let totalTime = 0;

    trial.problems.forEach((problem, index) => {
        if (problem. submission == null) return;
        if (problem.answer === problem.submission) correctAnswers++;

        if (problem.finishTimeSeconds === null) {
            if ((trial.problems.length - 1) === index) {
                problem.finishTimeSeconds = trial.timeLimitSeconds - problem.startTimeSeconds;
            } else return;
        };

        totalTime += (problem.finishTimeSeconds - problem.startTimeSeconds);
    });

    console.log("");

    console.log("Questions Answered: " + chalk.yellow(trial.problems.length));

    console.log("Correct: " + chalk.green(correctAnswers));

    console.log("Incorrect: " + chalk.red((trial.problems.length - correctAnswers)));

    console.log("Average Time per Problem: " + chalk.yellow((totalTime / trial.problems.length) + " seconds"));

    console.log("Overall Accuracy: " + chalk.yellow(Math.floor((correctAnswers * 100) / trial.problems.length) + "%"));

    console.log("");
  
    await rl.question("Press ENTER to start again. Press CTRL + C to quit.");

    resetTrial();

    displayOperationsPrompt();
  };