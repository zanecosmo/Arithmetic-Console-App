"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayPostTrialPrompt = void 0;
const chalk_1 = __importDefault(require("chalk"));
const menuModule_1 = require("../menuModule");
const operations_1 = require("./operations");
const displayPostTrialPrompt = () => __awaiter(void 0, void 0, void 0, function* () {
    let correctAnswers = 0;
    let totalTime = 0;
    menuModule_1.trial.problems.forEach((problem, index) => {
        if (problem.submission == null)
            return;
        if (problem.answer === problem.submission)
            correctAnswers++;
        if (problem.finishTimeSeconds === null) {
            if ((menuModule_1.trial.problems.length - 1) === index) {
                problem.finishTimeSeconds = menuModule_1.trial.timeLimitSeconds - problem.startTimeSeconds;
            }
            else
                return;
        }
        ;
        totalTime += (problem.finishTimeSeconds - problem.startTimeSeconds);
    });
    console.log("");
    console.log("Questions Answered: " + chalk_1.default.yellow(menuModule_1.trial.problems.length));
    console.log("Correct: " + chalk_1.default.green(correctAnswers));
    console.log("Incorrect: " + chalk_1.default.red((menuModule_1.trial.problems.length - correctAnswers)));
    console.log("Average Time per Problem: " + chalk_1.default.yellow((totalTime / menuModule_1.trial.problems.length) + " seconds"));
    console.log("Overall Accuracy: " + chalk_1.default.yellow(Math.floor((correctAnswers * 100) / menuModule_1.trial.problems.length) + "%"));
    console.log("");
    yield menuModule_1.rl.question("Press ENTER to start again. Press CTRL + C to quit.");
    (0, menuModule_1.resetTrial)();
    (0, operations_1.displayOperationsPrompt)();
});
exports.displayPostTrialPrompt = displayPostTrialPrompt;
