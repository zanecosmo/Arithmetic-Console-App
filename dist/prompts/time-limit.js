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
exports.displayTimeLimitPrompt = void 0;
const menuModule_1 = require("../menuModule");
const begin_trial_1 = require("./begin-trial");
let validationMessage = null;
const displayTimeLimitPrompt = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log(menuModule_1.trial.operations);
    console.log(menuModule_1.trial.maxDigitCount);
    if (validationMessage !== null)
        console.log(validationMessage);
    const timeLimitSeconds = yield menuModule_1.rl.question("Time limit in seconds: ");
    const timeLimit = parseInt(timeLimitSeconds, 10);
    if (typeof timeLimit !== "number") {
        validationMessage = "Must enter a valid time limit in seconds";
        (0, exports.displayTimeLimitPrompt)();
        return;
    }
    ;
    menuModule_1.trial.timeLimitSeconds = timeLimit;
    validationMessage = null;
    (0, begin_trial_1.displayBeginTrialPrompt)();
});
exports.displayTimeLimitPrompt = displayTimeLimitPrompt;
