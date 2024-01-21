import * as config from "../config.js";
import * as Registers from "../registers.js";

import { fillWithZeros } from "../helpers/fillWithZeros.js";
import { getBinaryRepresentationOfMachineCode } from "../helpers/getBinaryRepresentationOfMachineCode.js";

import { InvalidAddressError } from "../errors/InvalidAddressError.js";
import { InvalidRegisterError } from "../errors/InvalidRegisterError.js";

export const MACHINE_CODE = 0b0000000000010011;

export function bin(line, address, registerAlias) {
    if (address < 0 || address > config.MAX_ADDRESS) {
        throw new InvalidAddressError(line, address);
    }

    if (!Registers.includes(registerAlias)) {
        throw new InvalidRegisterError(line, registerAlias);
    }

    const binCommandAddress = getBinaryRepresentationOfMachineCode(MACHINE_CODE);
    
    const binAddress = getBinaryRepresentationOfMachineCode(
        parseInt(address)
    );

    const binRegister = fillWithZeros(
        Registers.getByAlias(registerAlias), 
        config.MEMORY_ROW_LENGTH
    );

    return [
        ...binCommandAddress,
        ...binAddress,
        binRegister,
    ];
}

export function hex(line, address, registerAlias) {
    throw new Error('Implement rd [hex] handler!');
}