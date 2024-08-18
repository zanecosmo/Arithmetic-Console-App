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
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayBeginTrialPrompt = void 0;
const menuModule_1 = require("../menuModule");
const problem_1 = require("./problem");
const stopTimer = (trial) => {
    if (trial.timerId === undefined)
        return;
    clearInterval(trial.timerId);
    trial.timerId = undefined;
};
const startTimer = (trial) => {
    trial.timerId = setInterval(() => {
        trial.currentTimeSeconds++;
        if (trial.currentTimeSeconds >= trial.timeLimitSeconds) {
            console.log("TIME LIMIT REACHED");
            stopTimer(trial);
        }
        ;
    }, 1000);
};
const displayBeginTrialPrompt = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log(menuModule_1.trial.operations);
    console.log(menuModule_1.trial.maxDigitCount);
    console.log(menuModule_1.trial.timeLimitSeconds);
    yield menuModule_1.rl.question("Press ENTER to begin. Press CTRL + C to quit.");
    startTimer(menuModule_1.trial);
    (0, problem_1.displayProblems)();
});
exports.displayBeginTrialPrompt = displayBeginTrialPrompt;
