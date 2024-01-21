import { preProcess } from "./preProcess.js";
import { postProcessing } from "./postProcess.js";

const CompilerModes = {
    BIN: 'bin',
    HEX: 'hex'
};

export function translateSource(sourceCode, mode = CompilerModes.BIN) {
    if (!Object.values(CompilerModes).includes(mode)) {
        throw new Error(`Invalid mode ${mode}. Allowed are ${CompilerModes.BIN} and ${CompilerModes.HEX}`);
    }

    const { representation, labelsAddresses } = preProcess(sourceCode, mode);
    const resultCode = postProcessing(representation, labelsAddresses);

    return resultCode;
}