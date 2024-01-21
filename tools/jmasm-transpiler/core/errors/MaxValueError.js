export class MaxValueError extends Error {
    constructor(line, value, maxValue = 255) {
        super(`[ERROR] Max value that register can store is ${maxValue}, but your value is ${value} on ${line} line!`);
    }
}