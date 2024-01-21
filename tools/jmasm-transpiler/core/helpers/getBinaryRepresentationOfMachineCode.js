import * as config from "../config.js";
import { splitByLength } from "../helpers/splitByLength.js";
import { fillWithZeros } from "./fillWithZeros.js";

export function getBinaryRepresentationOfMachineCode(code) {
    return splitByLength(
        fillWithZeros(
            code.toString(2), 
            config.ADDRESS_BUS_LENGTH
        ),
        config.MEMORY_ROW_LENGTH
    );
}