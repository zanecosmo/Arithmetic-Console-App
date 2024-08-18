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
exports.display = void 0;
const readline = __importStar(require("node:readline"));
const menuModule_1 = require("../menuModule");
const digit_count_1 = require("./digit-count");
const operations = [
    { symbol: "+", isSelected: false },
    { symbol: "-", isSelected: false },
    { symbol: "*", isSelected: false },
    { symbol: "/", isSelected: false }
];
let validationMessage = null;
let pointer = 0;
const display = () => {
    initialize();
    renderPrompt();
};
exports.display = display;
const validateInput = () => {
    for (let operation in operations) {
        if (operations[operation].isSelected === true)
            return null;
    }
    ;
    return "Must have at least one operation selected";
};
const initialize = () => {
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.setRawMode != null)
        process.stdin.setRawMode(true);
    process.on('uncaughtException', (err) => console.log(err));
    process.stdout.write('\x1b[?25l'); // Hide the cursor
    process.stdin.addListener('keypress', keypressHandler);
};
const renderPrompt = () => {
    console.log("Choose Operations:");
    operations.forEach((operation, index) => {
        let line = "";
        line += pointer === index ? "> " : "  ";
        line += operation.isSelected ? "[x] " : "[ ] ";
        line += operation.symbol;
        console.log(line);
    });
    if (validationMessage !== null)
        console.log(validationMessage);
};
const deinitialize = () => {
    process.stdin.removeListener("keypress", keypressHandler);
    process.stdin.setRawMode(false);
    process.stdout.write('\x1b[?25h'); // Show the cursor
};
const updateMenuState = () => {
    for (let operation in operations) {
        if (operations[operation].isSelected) {
            menuModule_1.trial.operations.push(operations[operation].symbol);
        }
        ;
    }
    ;
};
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
        operations[pointer].isSelected = !operations[pointer].isSelected;
    }
    if (key && key.name === "return") {
        validationMessage = validateInput();
        if (validationMessage === null) {
            deinitialize();
            updateMenuState();
            (0, digit_count_1.displayDigitCountPrompt)();
            return;
        }
        ;
    }
    ;
    console.clear();
    renderPrompt();
};
