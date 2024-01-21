export class InvalidLabelError extends Error {
    constructor(line, label) {
        super(`[ERROR] Invalid label ${label} on ${line} line!`)
    }
}