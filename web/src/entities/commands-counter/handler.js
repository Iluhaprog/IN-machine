import { createStore, createEvent } from "effector";

const name = 'CommandsCounter';
const hooks = {};

const $commandsCounterOutputs = createStore({
    cc1: 0,
    cc2: 0,
    cc3: 0,
    cc4: 0,
    cc5: 0,
    cc6: 0,
    cc7: 0,
    cc8: 0,

    cc9: 0,
    cc10: 0,
    cc11: 0,
    cc12: 0,
    cc13: 0,
    cc14: 0,
    cc15: 0,
    cc16: 0,
});
const $numericRepresentationOfCommandsCounterOutputs = createStore(0);

const _setCommandsCounterOutputs = createEvent();
const _setNumericRepresentationOfCommandCounterOutputs = createEvent();

$numericRepresentationOfCommandsCounterOutputs.on(_setNumericRepresentationOfCommandCounterOutputs, (_, payload) => payload);

$commandsCounterOutputs.watch(function (commandsCounterOutputs) {
     _setNumericRepresentationOfCommandCounterOutputs(parseCommandsCounterOutputsToNumber(commandsCounterOutputs));
});

function init() {
    $commandsCounterOutputs.on(_setCommandsCounterOutputs, (_, newOutputs) => newOutputs);
}

function inputs() {}

function outputs(value) {
    _setCommandsCounterOutputs({...value});
}

function parseCommandsCounterOutputsToNumber(value) {
    const {
        cc1,
        cc2,
        cc3,
        cc4,
        cc5,
        cc6,
        cc7,
        cc8,
    
        cc9,
        cc10,
        cc11,
        cc12,
        cc13,
        cc14,
        cc15,
        cc16,
    } = value;
    return parseInt(`${cc16}${cc15}${cc14}${cc13}${cc12}${cc11}${cc10}${cc9}${cc8}${cc7}${cc6}${cc5}${cc4}${cc3}${cc2}${cc1}`, 2);
}

export {
    $commandsCounterOutputs,
    $numericRepresentationOfCommandsCounterOutputs,
};

export default {
    name,
    hooks,
    init,
    inputs,
    outputs,
};