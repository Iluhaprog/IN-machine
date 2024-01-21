import { createJMP } from "../helpers/jmpCreator.js";

export const MACHINE_CODE = 0b0000000010100100;

export const bin = createJMP(MACHINE_CODE);

export function hex(_, label) {
    throw new Error('Implement jmp_vc [hex] handler!');
}