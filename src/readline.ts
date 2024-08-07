import * as readline from "node:readline";

type Operands = [number, number];

interface Problem {
    answer: number,
    submission: number | null,
    startTimeSeconds: number,
    finishTimeSeconds: number | null,
    operands: Operands,
    operation: string
};

interface Trial {
    operations: string[],
    maxDigitCount: number,
    timeLimitSeconds: number,
    currentTimeSeconds: number,
    hasCancelled: boolean,
    problems: Problem[],
    timerId: NodeJS.Timeout | undefined,
};

readline.emitKeypressEvents(process.stdin);
if (process.stdin.setRawMode != null) process.stdin.setRawMode(true)

let pointer = 0;

interface Operation {
    symbol: string,
    isSelected: boolean
};

const operations: Operation[] = [
    { symbol: "+", isSelected: false },
    { symbol: "-", isSelected: false },
    { symbol: "*", isSelected: false },
    { symbol: "/", isSelected: false }
];

const renderMenu = () => {
    console.log("Choose Operations:")

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
};

process.on('uncaughtException', function (err) {
    console.log(err);
});

renderMenu();
process.stdout.write('\x1b[?25l'); // Hide the cursor

// const trial: Trial = {
//     operations: [],
//     maxDigitCount: 0,
//     timeLimitSeconds: parseInt(await input(prompts.timeLimitSeconds)),
//     currentTimeSeconds: 0,
//     hasCancelled: false,
//     problems: [],
//     timerId: undefined,
// };

const keypressHandler = (_: any, key: any) => {
    console.log(key.name);

    if (key && key.ctrl && key.name == 'c') process.exit();

    if (key && key.name === "up") {
        pointer = pointer === 0 ? 3 : pointer - 1;
    };

    if (key && key.name === "down") {
        pointer = pointer === 3 ? 0 : pointer + 1;
    };

    if (key && key.name === "space") {
        console.log(operations[pointer].isSelected);
        operations[pointer].isSelected = !operations[pointer].isSelected;
    }

    if (key && key.name === "return") {
        // validate: must have at least one operation selected
        // insert the operations into the trial
        process.stdin.removeListener("keypress", keypressHandler);
        console.log("listener removed");
        process.stdin.setRawMode(false);
        process.stdout.write('\x1b[?25h'); // Show the cursor

        return;
    }

    console.clear();

    renderMenu();
}

process.stdin.addListener('keypress', keypressHandler);

const nextPrompt = () => {
    // add cursor back
    process.stdout.write('\x1b[?25h'); // Show the cursor

    // connect to stdin and as question/prompt
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    rl.question("Maximum Operand Size (number of digits)", (maxDigitCount) => {
        // validate string it must be a number
        // trial.maxDigitCount = parseInt(maxDigitCount);
    });

    // nextPrompt(); : "Time Limit (seconds)"
};


