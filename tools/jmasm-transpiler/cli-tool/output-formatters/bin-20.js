export const name = 'BIN20';

export function formatter(translatedSource) {
    let resultString = 'v2.0 raw\n';

    for (const row of translatedSource) {
        resultString += `${row.join(' ')}\n`;
    }

    return resultString;
}