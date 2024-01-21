import * as config from "../config.js";
import * as Registers from "../registers.js";

import { getBinOfNegativeValue } from "../helpers/getBinOfNegativeValue.js";
import { fillWithZeros } from "../helpers/fillWithZeros.js";
import { getBinaryRepresentationOfMachineCode } from "../helpers/getBinaryRepresentationOfMachineCode.js";

import { InvalidRegisterError } from "../errors/InvalidRegisterError.js";
import { MaxValueError } from "../errors/MaxValueError.js";
import { MinValueError } from "../errors/MinValueError.js";

export const MACHINE_CODE = 0b0000000000000101;

export function bin(line, registerAlias, value) {
    if (!Registers.includes(registerAlias)) {
        throw new InvalidRegisterError(line, registerAlias);
    }

    let cmpValue = value;
    
    let binValue = fillWithZeros(
        parseInt(Math.abs(value)).toString(2),
        config.MEMORY_ROW_LENGTH,
    );

    if (value.includes('b')) {
        binValue = fillWithZeros(value.split('b')[1]);

        cmpValue = parseInt(binValue, 2);
    }

    if (cmpValue > 255) throw new MaxValueError(line, value);

    if (cmpValue < -127 ) throw new MinValueError(line, value);

    const binCommandAddress = getBinaryRepresentationOfMachineCode(MACHINE_CODE);
    
    const binRegister = fillWithZeros(
        Registers.getByAlias(registerAlias), 
        config.MEMORY_ROW_LENGTH
    );    

    if (value < 0) {
        binValue = getBinOfNegativeValue(binValue);
    }

    return [
        ...binCommandAddress,
        binRegister,
        binValue
    ];
}

export function hex(line, registerAlias, value) {
    throw new Error('Implement set [hex] handler!');
}