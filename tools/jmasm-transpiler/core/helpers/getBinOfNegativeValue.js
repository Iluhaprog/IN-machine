export function getBinOfNegativeValue(value) {
    const invertedValue = value.split('').map((bit) => bit === '1' ? '0' : '1').join('');
    return (parseInt(invertedValue, 2) + 1).toString(2);
}