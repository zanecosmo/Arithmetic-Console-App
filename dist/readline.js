"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("node:readline"));
readline.emitKeypressEvents(process.stdin);
if (process.stdin.setRawMode != null)
    process.stdin.setRawMode(true);
let pointer = 0;
const operations = [
    { symbol: "+", isSelected: false },
    { symbol: "-", isSelected: false },
    { symbol: "*", isSelected: false },
    { symbol: "/", isSelected: false }
];
const renderMenu = (validationMessage) => {
    console.log("Choose Operations:");
    operations.forEach((operation, index) => {
        let line = "";
        // log the pointer or lack there of
        line += pointer === index ? "> " : "  ";
        // log the box and whether it is empty or not
        line += operation.isSelected ? "[x] " : "[ ] ";
        // log the option
        line += operation.symbol;
        console.log(line);
    });
    if (validationMessage !== null)
        console.log(validationMessage);
};
process.on('uncaughtException', function (err) {
    console.log(err);
});
renderMenu(null);
process.stdout.write('\x1b[?25l'); // Hide the cursor
const trial = {
    operations: [],
    maxDigitCount: 0,
    timeLimitSeconds: 0,
    currentTimeSeconds: 0,
    hasCancelled: false,
    problems: [],
    timerId: undefined,
};
const validateOperations = (operations) => {
    for (let operation in operations) {
        if (operations[operation].isSelected === true)
            return true;
    }
    ;
    return false;
};
let rl = null;
rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let validationMessage = null;
// validation message, trial?
// v
// process, pointer, operations --- rl
// process, pointer, operations, key, validation message
const keypressHandler = (_, key) => {
    if (key && key.ctrl && key.name == 'c')
        process.exit();
    if (key && key.name === "up") {
        pointer = pointer === 0 ? 3 : pointer - 1;
    }
    ;
    if (key && key.name === "down") {
        pointer = pointer === 3 ? 0 : pointer + 1;
    }
    ;
    if (key && key.name === "space") {
        console.log(operations[pointer].isSelected);
        operations[pointer].isSelected = !operations[pointer].isSelected;
    }
    if (key && key.name === "return") {
        const operationSelected = validateOperations(operations);
        if (!operationSelected)
            validationMessage = "Must have at least one operation selected";
        else {
            validationMessage = null;
            process.stdin.removeListener("keypress", keypressHandler);
            process.stdin.setRawMode(false);
            process.stdout.write('\x1b[?25h'); // Show the cursor
            // insert the operations into the trial?
            for (let operation in operations) {
                if (operations[operation].isSelected)
                    trial.operations.push(operations[operation].symbol);
            }
            // connect to stdin and as question/prompt
            nextPrompt(validationMessage);
            return;
        }
        ;
    }
    ;
    console.clear();
    renderMenu(validationMessage);
};
process.stdin.addListener('keypress', keypressHandler);
// rl, validation message, trial
const nextPrompt = (validationMessage) => {
    console.clear();
    console.log(trial.operations);
    process.stdout.write('\x1b[?25h'); // Show the cursor
    console.log("----");
    if (validationMessage !== null)
        console.log(validationMessage);
    console.log("----");
    if (rl === null) {
        throw new Error("rl ain't workin'");
    }
    ;
    rl.question("Maximum Operand Size (number of digits): ", (maxDigitCount) => {
        // validate string it must be a number
        // if it's invalid,
        // clear console, set validation message to whatever
        // call next prompt again
        // return
        trial.maxDigitCount = parseInt(maxDigitCount);
        validationMessage = null;
        timeLimitPrompt(validationMessage);
    });
};
// rl, validation message, trial, 
const timeLimitPrompt = (validationMessage) => {
    console.clear();
    console.log(trial.operations);
    console.log(trial.maxDigitCount);
    if (validationMessage !== null)
        console.log(validationMessage);
    if (rl === null) {
        throw new Error("rl ain't workin'");
    }
    ;
    rl.question("Time limit in seconds: ", (timeLimitSeconds) => {
        // validate string it must be a number
        // if it's invalid,
        // clear console, set validation message to whatever
        // start trial
        // return
        trial.timeLimitSeconds = parseInt(timeLimitSeconds);
        validationMessage = null;
    });
};
;
class DigitCountPrompt {
    constructor() {
        this.validationMessage = "";
    }
    validateInput() {
        return "";
    }
    display() {
    }
}
