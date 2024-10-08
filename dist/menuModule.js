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
exports.resetAboter = exports.aborter = exports.rl = exports.trial = exports.resetTrial = void 0;
const readlinePromises = __importStar(require("node:readline/promises"));
const resetTrial = () => exports.trial = {
    operations: [],
    maxDigitCount: 0,
    timeLimitSeconds: 0,
    currentTimeSeconds: 0,
    hasCancelled: false,
    problems: [],
    timerId: undefined,
};
exports.resetTrial = resetTrial;
exports.trial = {
    operations: [],
    maxDigitCount: 0,
    timeLimitSeconds: 0,
    currentTimeSeconds: 0,
    hasCancelled: false,
    problems: [],
    timerId: undefined,
};
exports.rl = readlinePromises.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
exports.aborter = new AbortController();
const resetAboter = () => exports.aborter = new AbortController();
exports.resetAboter = resetAboter;
