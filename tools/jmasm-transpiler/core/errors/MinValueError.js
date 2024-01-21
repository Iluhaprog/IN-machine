export class MinValueError extends Error {
    constructor(line, value, minValue = -127) {
        super(`[ERROR] Min value that register can store is ${minValue}, but your value is ${value} on ${line} line!`);
    }
}