import * as readline from "node:readline";

export type Operands = [number, number];

export interface Problem {
    answer: number,
    submission: number | null,
    startTimeSeconds: number,
    finishTimeSeconds: number | null,
    operands: Operands,
    operation: string
};

export interface Trial {
    operations: string[],
    maxDigitCount: number,
    timeLimitSeconds: number,
    currentTimeSeconds: number,
    hasCancelled: boolean,
    problems: Problem[],
    timerId: NodeJS.Timeout | undefined,
};

export interface Operation {
  symbol: string,
  isSelected: boolean
};

export interface Operations {
  [key: string]: (operands: Operands) => number
};

export interface MenuState {
  validationMessage: string | null,
  trial: Trial,
  rl: readline.Interface
};

export interface OperationMenuState {
  pointer: number,
  operations: Operation[],
};