import { createJMP } from "../helpers/jmpCreator.js";

export const MACHINE_CODE = 0b0000000010010110;

export const bin = createJMP(MACHINE_CODE);

export function hex(_, label) {
    throw new Error('Implement jmp_pl [hex] handler!');
}