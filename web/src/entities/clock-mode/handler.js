import { createStore, createEvent, createEffect } from "effector";

const name = 'ClockMode';
const hooks = {};

const $clockMode = createStore(1);

const _setClockMode = createEvent();
let toggleModeEffect;

function init() {
    $clockMode.on(_setClockMode, (_, newClockMode) => newClockMode);

    toggleModeEffect = createEffect(() => {
        hooks.toggleMode();
    });
}

function inputs() {}

function outputs({ mode }) {
    _setClockMode(mode);
}

export {
    $clockMode,
    toggleModeEffect,
};

export default {
    name,
    hooks,
    init,
    inputs,
    outputs,
};

