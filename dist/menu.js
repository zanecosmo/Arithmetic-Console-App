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
const menuState_1 = require("./menuState");
const operationMenuState = {
    pointer: 0,
    operations: [
        { symbol: "+", isSelected: false },
        { symbol: "-", isSelected: false },
        { symbol: "*", isSelected: false },
        { symbol: "/", isSelected: false }
    ]
};
const validateOperations = (operations) => {
    for (let operation in operations) {
        if (operations[operation].isSelected === true)
            return true;
    }
    ;
    return false;
};
const renderMenu = (validationMessage) => {
    console.log("Choose Operations:");
    operationMenuState.operations.forEach((operation, index) => {
        let line = "";
        line += operationMenuState.pointer === index ? "> " : "  ";
        line += operation.isSelected ? "[x] " : "[ ] ";
        line += operation.symbol;
        console.log(line);
    });
    if (validationMessage !== null)
        console.log(validationMessage);
};
const keypressHandler = (_, key) => {
    console.clear();
    renderMenu(menuState_1.menuState.validationMessage);
    if (key && key.ctrl && key.name == 'c')
        process.exit();
    if (key && key.name === "up") {
        operationMenuState.pointer = operationMenuState.pointer === 0 ? 3 : operationMenuState.pointer - 1;
    }
    ;
    if (key && key.name === "down") {
        operationMenuState.pointer = operationMenuState.pointer === 3 ? 0 : operationMenuState.pointer + 1;
    }
    ;
    if (key && key.name === "space") {
        console.log(operationMenuState.operations[operationMenuState.pointer].isSelected);
        operationMenuState.operations[operationMenuState.pointer].isSelected = !operationMenuState.operations[operationMenuState.pointer].isSelected;
    }
    if (key && key.name === "return") {
        const operationSelected = validateOperations(operationMenuState.operations);
        if (!operationSelected)
            menuState_1.menuState.validationMessage = "Must have at least one operation selected";
        else {
            deinitialize();
            insertChosenOperations(menuState_1.menuState, operationMenuState);
            nextPrompt(menuState_1.menuState.validationMessage);
        }
        ;
    }
    ;
};
const initialize = () => {
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.setRawMode != null)
        process.stdin.setRawMode(true);
    process.on('uncaughtException', (err) => console.log(err));
    process.stdout.write('\x1b[?25l'); // Hide the cursor
    process.stdin.addListener('keypress', keypressHandler);
};
const deinitialize = () => {
    menuState_1.menuState.validationMessage = null;
    process.stdin.removeListener("keypress", keypressHandler);
    process.stdin.setRawMode(false);
    process.stdout.write('\x1b[?25h'); // Show the cursor
};
const insertChosenOperations = (mainMenu, opMenu) => {
    for (let operation in opMenu.operations) {
        if (opMenu.operations[operation].isSelected) {
            mainMenu.trial.operations.push(opMenu.operations[operation].symbol);
        }
        ;
    }
    ;
};
const nextPrompt = (validationMessage) => {
    console.clear();
    console.log(menuState_1.menuState.trial.operations);
    if (validationMessage !== null)
        console.log(validationMessage);
    menuState_1.menuState.rl.question("Maximum Operand Size (number of digits): ", (maxDigitCount) => {
        // validate string it must be a number
        // if it's invalid,
        // clear console, set validation message to whatever
        // call next prompt again
        // return
        menuState_1.menuState.trial.maxDigitCount = parseInt(maxDigitCount);
        validationMessage = null;
        timeLimitPrompt(validationMessage);
    });
};
const timeLimitPrompt = (validationMessage) => {
    console.clear();
    console.log(menuState_1.menuState.trial.operations);
    console.log(menuState_1.menuState.trial.maxDigitCount);
    if (validationMessage !== null)
        console.log(validationMessage);
    if (menuState_1.menuState.rl === null)
        throw new Error("rl ain't workin'");
    menuState_1.menuState.rl.question("Time limit in seconds: ", (timeLimitSeconds) => {
        // validate string it must be a number
        // if it's invalid,
        // clear console, set validation message to whatever
        // start trial
        // return
        menuState_1.menuState.trial.timeLimitSeconds = parseInt(timeLimitSeconds);
        validationMessage = null;
    });
};
