export class InvalidRegisterError extends Error {
    constructor(line, register) {
        super(`[ERROR] Invalid register ${register} on ${line} line!`)
    }
}