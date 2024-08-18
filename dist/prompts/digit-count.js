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
exports.displayDigitCountPrompt = void 0;
const menuModule_1 = require("../menuModule");
const time_limit_1 = require("./time-limit");
let validationMessage = null;
const displayDigitCountPrompt = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log(menuModule_1.trial.operations);
    if (validationMessage !== null)
        console.log(validationMessage);
    const maxDigitCount = yield menuModule_1.rl.question("Maximum Operand Size (number of digits): ");
    const digitCount = parseInt(maxDigitCount, 10);
    if (typeof digitCount !== "number") {
        validationMessage = "Must enter a valid digit count";
        (0, exports.displayDigitCountPrompt)();
        return;
    }
    ;
    menuModule_1.trial.maxDigitCount = digitCount;
    validationMessage = null;
    (0, time_limit_1.displayTimeLimitPrompt)();
});
exports.displayDigitCountPrompt = displayDigitCountPrompt;
