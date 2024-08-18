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
exports.displayProblems = void 0;
const chalk_1 = __importDefault(require("chalk"));
const menuModule_1 = require("../menuModule");
const post_trial_1 = require("./post-trial");
const operations = {
    ["+"]: (operands) => operands[0] + operands[1],
    ["-"]: (operands) => operands[0] - operands[1],
    ["*"]: (operands) => operands[0] * operands[1],
    ["/"]: (operands) => operands[0] / operands[1],
};
const digitCount = (num) => Math.max(Math.floor(Math.log10(Math.abs(num))), 0) + 1;
const getRandomInt = (max) => Math.floor(Math.random() * (max)) + 1;
const chooseOperation = (trial) => trial.operations[getRandomInt(trial.operations.length) - 1];
const executeOperation = (operands, operation) => operations[operation](operands);
const generateOperands = (maxDigitCount) => {
    const maxSize = (10 ** maxDigitCount) - 1;
    const operand1 = getRandomInt(maxSize);
    const operand2 = getRandomInt(maxSize);
    const larger = Math.max(operand1, operand2);
    const smaller = Math.min(operand1, operand2);
    return [larger, smaller];
};
const generateProblem = (trial) => {
    const operands = generateOperands(trial.maxDigitCount);
    const operation = chooseOperation(trial);
    const answer = executeOperation(operands, operation);
    return {
        answer: answer,
        submission: null,
        startTimeSeconds: trial.currentTimeSeconds,
        finishTimeSeconds: null,
        operands: operands,
        operation: operation,
    };
};
const renderProblem = (problem) => {
    if (validationMessage !== null) {
        console.log(chalk_1.default.red(validationMessage));
        validationMessage = null;
    }
    ;
    const digits1 = digitCount(problem.operands[0]);
    const digits2 = digitCount(problem.operands[1]);
    const longerNumber = Math.max(digits1, digits2);
    const shorterNumber = Math.min(digits1, digits2);
    const difference = longerNumber - shorterNumber;
    console.log("");
    console.log("    " + problem.operands[0]);
    let spacer = " ";
    for (let i = 0; i < difference; i++) {
        spacer += " ";
    }
    ;
    console.log("  " + problem.operation + spacer + problem.operands[1]);
    let seperator = "  -";
    for (let i = 0; i <= longerNumber; i++) {
        seperator += "-";
    }
    ;
    console.log(seperator);
};
let validationMessage = null;
const validate = (text) => {
    if (Number.isNaN(Number(text)))
        validationMessage = "Invalid Answer";
};
const displayProblems = () => __awaiter(void 0, void 0, void 0, function* () {
    while (menuModule_1.trial.timerId !== undefined) {
        const problem = generateProblem(menuModule_1.trial);
        renderProblem(problem);
        try {
            const submission = yield menuModule_1.rl.question(">  ", { signal: menuModule_1.aborter.signal });
            validate(submission);
            if (validationMessage !== null)
                continue;
            problem.submission = Number(submission);
            console.log(problem.answer === problem.submission ? chalk_1.default.green("CORRECT") : chalk_1.default.red("INCORRECT"));
            console.log("Correct Answer: " + chalk_1.default.green(problem.answer));
            console.log("Your Answer: " + (problem.answer === problem.submission ? chalk_1.default.green(problem.submission) : chalk_1.default.red(problem.submission)));
            problem.finishTimeSeconds = menuModule_1.trial.currentTimeSeconds;
            menuModule_1.trial.problems.push(problem);
        }
        catch (error) {
            if (menuModule_1.aborter.signal.aborted) {
                console.log("");
                console.log("TIME LIMIT REACHED");
                console.log("------------------");
                (0, post_trial_1.displayPostTrialPrompt)();
            }
            ;
        }
        ;
    }
    ;
});
exports.displayProblems = displayProblems;
