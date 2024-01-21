import { isLabel } from "../helpers/isLabel.js";

import { InvalidLabelError } from "../errors/InvalidLabelError.js";
import { getBinaryRepresentationOfMachineCode } from "../helpers/getBinaryRepresentationOfMachineCode.js";

export function postProcessing(representation, labelsAddresses) {
    const resultCode = [];

    for(let i = 0; i < representation.length; i++) {
        const row = representation[i];
        let completeRow = [...row];

        if (isContainLabel(completeRow)) {
            const rowLabel = completeRow[getLabelPosition(completeRow)];
            const address = labelsAddresses[rowLabel];

            if (address != null) {
                completeRow = [...completeRow.slice(0, 2), ...getBinaryRepresentationOfMachineCode(address)];
            } else {
                throw new InvalidLabelError(i, completeRow[getLabelPosition(completeRow)]);
            }
            
        }
        resultCode.push(completeRow);
    }

    return resultCode;
}

function isContainLabel(row) {
    for (const col of row) {
        if (isLabel(col)) {
            return true;
        }
    }

    return false;
}

function getLabelPosition(row) {
    for (let i = 0; i < row.length; i++) {
        const col = row[i];

        if (isLabel(col)) {
            return i;
        }
    }

    return -1;
}