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

const _setCommandsCounterOutputs = createEvent();

function init() {
    $commandsCounterOutputs.on(_setCommandsCounterOutputs, (_, newOutputs) => newOutputs);
}

function inputs() {}

function outputs(value) {
    _setCommandsCounterOutputs({...value});
}

export {
    $commandsCounterOutputs,
};

export default {
    name,
    hooks,
    init,
    inputs,
    outputs,
};