export const name = 'BIN_FILE';

export const encoding = 'binary';

export function formatter(translatedSource) {

    const result = [];

    for (const row of translatedSource) {
        const numbers = row.map(toNumber);
        for (const number of numbers) {
            result.push(number);
        }
    }

    return Buffer.from(result);
}

function toNumber(value) {
    return parseInt(value, 2);
}