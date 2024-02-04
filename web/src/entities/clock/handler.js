import { createStore, createEvent, createEffect } from "effector";

const name = 'Clock';
const hooks = {};

const $clockState = createStore(0);

const _setClockState = createEvent();
let tickClockEffect;

function init() {
    $clockState.on(_setClockState, (_, newClockState) => newClockState);

    tickClockEffect = createEffect(() => {
        hooks.tickClock();
    });
}

function inputs() {
}

function outputs({ clock }) {
    _setClockState(clock);
}

export {
    $clockState, 
    tickClockEffect 
};

export default {
    name,
    hooks,
    init,
    inputs,
    outputs,
};

