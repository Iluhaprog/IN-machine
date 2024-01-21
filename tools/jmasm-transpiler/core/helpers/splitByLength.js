export function splitByLength(value, distLength) {
    const symbols = value.split('');
    const result = [];

    for (let i = 0; i < symbols.length / distLength; i++) {
        let row = '';

        for (let j = i * distLength; j < (i + 1) * distLength; j++) {
            row += symbols[j];
        }

        result.push(row);
    }

    return result;
}