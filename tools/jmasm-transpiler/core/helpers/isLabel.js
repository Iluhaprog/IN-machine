export function isLabel(row) {
    const regex = /^\.(\w+)(?:_\d+)?/;

    return regex.test(row);
}