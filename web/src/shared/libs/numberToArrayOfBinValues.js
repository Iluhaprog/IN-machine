export function formatNumberToArrayOfBinValues(number) {
    const binValues = number.toString(2).split('').map((binValue) => binValue === '1' ? 1 : 0);

    if (binValues.length < 8) {
        const numberOfMissingDigits = 8 - binValues.length;

        return [
            ...Array(numberOfMissingDigits).fill(0), 
            ...binValues
        ];
    }

    return binValues;
}