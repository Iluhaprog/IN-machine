import { createStore, createEvent } from "effector";

const name = 'MicroCommandsCounter';
const hooks = {};

const $microCommandsCounterOutputs = createStore({
    mc1: 0,
    mc2: 0,
    mc3: 0,
    mc4: 0,
    mc5: 0,
    mc6: 0,
    mc7: 0,
    mc8: 0,

    mc9: 0,
    mc10: 0,
    mc11: 0,
    mc12: 0,
    mc13: 0,
    mc14: 0,
    mc15: 0,
    mc16: 0,
});

const _setMicroCommandsCounterOutputs = createEvent();

function init() {
    $microCommandsCounterOutputs.on(_setMicroCommandsCounterOutputs, (_, newOutputs) => newOutputs);
}

function inputs() {}

function outputs(value) {
    _setMicroCommandsCounterOutputs({...value});
}

export {
    $microCommandsCounterOutputs,
};

export default {
    name,
    hooks,
    init,
    inputs,
    outputs,
};