export const name = 'HEX_PLAIN_WORDS';

export function formatter(translatedSource) {
    let resultString = 'v3.0 hex words plain\n';

    for (const row of translatedSource) {
        resultString += `${row.map(toHEX).join(' ')}\n`;
    }

    return resultString;
}

function toHEX(value) {
    const bin = parseInt(value, 2);

    return bin.toString(16);
}