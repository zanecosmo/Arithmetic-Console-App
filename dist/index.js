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
const prompts_1 = require("@inquirer/prompts");
// import { CancelablePromise } from "@inquirer/type/dist/cjs/types/inquirer";
const chalk_1 = __importDefault(require("chalk"));
;
;
const operations = {
    ["+"]: (operands) => operands[0] + operands[1],
    ["-"]: (operands) => operands[0] - operands[1],
    ["*"]: (operands) => operands[0] * operands[1],
    ["/"]: (operands) => operands[0] / operands[1],
};
const getRandomInt = (max) => Math.floor(Math.random() * (max - 1)) + 1;
const generateOperands = (maxDigitCount) => {
    const maxSize = (10 ** maxDigitCount) - 1;
    return [getRandomInt(maxSize), getRandomInt(maxSize)];
};
const executeOperation = (operands, operation) => operations[operation](operands);
const chooseOperation = (trial) => trial.operations[getRandomInt(trial.operations.length) - 1];
const digitCount = (num) => Math.max(Math.floor(Math.log10(Math.abs(num))), 0) + 1;
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
const renderProblem = (problem) => {
    const digits1 = digitCount(problem.operands[0]);
    const digits2 = digitCount(problem.operands[1]);
    const longerNumber = Math.max(digits1, digits2);
    const shorterNumber = Math.min(digits1, digits2);
    const largerNumber = Math.max(problem.operands[0], problem.operands[1]);
    const smallerNumber = Math.min(problem.operands[0], problem.operands[1]);
    const difference = longerNumber - shorterNumber;
    console.log("");
    console.log("    " + largerNumber);
    let spacer = " ";
    for (let i = 0; i < difference; i++) {
        spacer += " ";
    }
    ;
    console.log("  " + problem.operation + spacer + smallerNumber);
    let seperator = "  -";
    for (let i = 0; i <= longerNumber; i++) {
        seperator += "-";
    }
    ;
    console.log(seperator);
};
const prompts = {
    chooseOperations: {
        message: "Choose Operations:",
        theme: {
            prefix: ">",
            style: { message: (msg) => chalk_1.default.white(msg) },
            icon: {
                checked: " [x]",
                unchecked: " [ ]",
                cursor: ">"
            }
        },
        choices: [
            { name: "+", value: "+" },
            { name: "-", value: "-" },
            { name: "*", value: "*" },
            { name: "/", value: "/" },
        ]
    },
    maximumOperandSize: {
        message: "Maximum Operand Size (number of digits)",
        theme: {
            prefix: ">",
            style: { message: (msg) => chalk_1.default.white(msg) },
        },
        validate: (size) => Number.isNaN(parseInt(size)) ? "Must be a valid Number" : true,
    },
    timeLimitSeconds: {
        message: "Time Limit (seconds)",
        theme: {
            prefix: ">",
            style: { message: (msg) => chalk_1.default.white(msg) },
        },
        validate: (size) => Number.isNaN(parseInt(size)) ? "Must be a valid Number" : true
    },
    beginTrial: {
        message: "Press ENTER to begin. Press CTRL + C to quit.",
        theme: {
            prefix: ">",
            style: { message: (msg) => chalk_1.default.white(msg) },
        }
    },
    submitAnswer: {
        type: "input",
        name: "submit",
        message: "",
        theme: {
            prefix: ">"
        }
    }
};
const program = () => __awaiter(void 0, void 0, void 0, function* () {
    const trial = {
        operations: yield (0, prompts_1.checkbox)(prompts.chooseOperations),
        maxDigitCount: parseInt(yield (0, prompts_1.input)(prompts.maximumOperandSize)),
        timeLimitSeconds: parseInt(yield (0, prompts_1.input)(prompts.timeLimitSeconds)),
        currentTimeSeconds: 0,
        hasCancelled: false,
        problems: [],
        timerId: undefined,
    };
    yield (0, prompts_1.input)(prompts.beginTrial);
    startTimer(trial);
    while (trial.timerId !== undefined) {
        const problem = generateProblem(trial);
        renderProblem(problem);
        const submission = (0, prompts_1.input)(prompts.submitAnswer);
        problem.submission = parseInt(yield submission);
        problem.finishTimeSeconds = trial.currentTimeSeconds;
        trial.problems.push(problem);
    }
    ;
});
program();
