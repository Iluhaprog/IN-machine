export class InvalidAddressError extends Error {
    constructor(line, address, minMemoryAddress = 0, maxMemoryAddress = 65536) {
        super(`[ERROR] Invalid address ${address} on line ${line}. \n\tMemory addresses range is [${minMemoryAddress}, ${maxMemoryAddress}].`);
    }
}