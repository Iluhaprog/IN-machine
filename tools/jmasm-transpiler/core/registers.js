export const ALIASES = {
    R1: 0b00000000,
    R2: 0b00000001,
    R3: 0b00000010,
    R4: 0b00000011,
    R5: 0b00000100,
    R6: 0b00000101,
    R7: 0b00000110,
    R8: 0b00000111,
};

export function includes(register) {
    return Object.keys(ALIASES).includes(register)
}

export function getByAlias(key) {
    return ALIASES[key].toString(2);
}