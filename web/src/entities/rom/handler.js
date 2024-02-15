import { createEffect, createEvent, createStore } from "effector";

const name = 'ROM';
const hooks = {};

const $romOutputs = createStore({
    db1: 0,
    db2: 0,
    db3: 0,
    db4: 0,
    db5: 0,
    db6: 0,
    db7: 0,
    db8: 0,
});

const $romData = createStore([]);

const _uploadData = createEvent();
const _setOutputs = createEvent();
let uploadData;

function init() {
    $romData.on(_uploadData, (_, payload) => {
        return [...payload];
    });

    uploadData = createEffect((payload) => {
        hooks.uploadData(payload);

        _uploadData(payload);
    });

    $romOutputs.on(_setOutputs, (_, payload) => ({...payload}));
}

function inputs() {}

function outputs(value) {
    _setOutputs(value);
}

export {
    $romOutputs,
    $romData,
    uploadData
};

export default {
    name,
    hooks,
    init,
    inputs,
    outputs,
};