import * as config from "../config.js";
import * as Registers from "../registers.js";

import { fillWithZeros } from "../helpers/fillWithZeros.js";
import { splitByLength } from "../helpers/splitByLength.js";
import { getBinaryRepresentationOfMachineCode } from "../helpers/getBinaryRepresentationOfMachineCode.js";

import { InvalidRegisterError } from "../errors/InvalidRegisterError.js";

export const MACHINE_CODE = 0b0000000000001011;

export function bin(line, registerAlias1, registerAlias2) {
    if (!Registers.includes(registerAlias1)) {
        throw new InvalidRegisterError(line, registerAlias1);
    }

    if (!Registers.includes(registerAlias2)) {
        throw new InvalidRegisterError(line, registerAlias2);
    }

    const binCommandAddress = getBinaryRepresentationOfMachineCode(MACHINE_CODE);
    
    const binRegister1 = fillWithZeros(
        Registers.getByAlias(registerAlias1), 
        config. MEMORY_ROW_LENGTH
    );

    const binRegister2 = fillWithZeros(
        Registers.getByAlias(registerAlias2), 
        config.MEMORY_ROW_LENGTH
    );

    return [
        ...binCommandAddress,
        binRegister1,
        binRegister2
    ];
}

export function hex(line, registerAlias1, registerAlias2) {
    throw new Error('Implement mov [hex] handler!');
}