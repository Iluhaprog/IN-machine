import * as config from "../config.js";

export function fillWithZeros(value, length = config.MEMORY_ROW_LENGTH) {
    const zerosLength = Math.abs(value.length - length);
    return Array(zerosLength).fill('0').join('') + value;
}