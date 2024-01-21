import * as config from "../config.js";
import * as CommandsHandlers from "../commands-handlers/export.js";

export function preProcess(sourceCode, mode) {
    const codeRows = removeComments(getRows(sourceCode));
    const representation = [];
    const labelsAddresses = {};
    let lastAddress = 0;

    for (let i = 0; i < codeRows.length; i++) {
        const codeRow = codeRows[i];

        if (isLabel(codeRow)) {
            labelsAddresses[codeRow] = lastAddress;
            continue;
        }

        const [operator, ...operands] = codeRow.split(' ');
        const commandHandler = CommandsHandlers[operator] ? CommandsHandlers[operator][mode] : null;
        if (typeof commandHandler === "function") {
            const operandsWithoutEmpties = operands.filter(o => o);
            const translatedCommand = commandHandler(i + 1, ...operandsWithoutEmpties);
            lastAddress += translatedCommand.length;

            representation.push(translatedCommand);
        }
    }

    return {
        representation,
        labelsAddresses
    };
}

function isLabel(row) {
    const regex = /^\.(\w+)(?:_\d+)?/;

    return regex.test(row);
}

function getRows(code) {
    return code.split(config.SEPARATOR_SYMBOL);
}

function removeComments(codeRows) {
    const result = [];

    for (const codeRow of codeRows) {
        if (codeRow.includes(config.COMMENT_SYMBOL)) {
            result.push(codeRow.split(config.COMMENT_SYMBOL)[0].trim());
        } else {
            result.push(codeRow.trim());
        }
    }

    return result.filter(row => row);
}