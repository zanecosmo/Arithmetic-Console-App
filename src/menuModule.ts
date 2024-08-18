import * as readlinePromises from "node:readline/promises";
import { Trial } from "./types";

export const resetTrial = () => trial = {
  operations: [],
  maxDigitCount: 0,
  timeLimitSeconds: 0,
  currentTimeSeconds: 0,
  hasCancelled: false,
  problems: [],
  timerId: undefined,
};

export let trial: Trial = {
  operations: [],
  maxDigitCount: 0,
  timeLimitSeconds: 0,
  currentTimeSeconds: 0,
  hasCancelled: false,
  problems: [],
  timerId: undefined,
}

export const rl = readlinePromises.createInterface({ input: process.stdin, output: process.stdout, terminal: false });

export let aborter = new AbortController();

export const resetAboter = () => aborter = new AbortController();