const name = 'Clock';
const priority = 1;

let inputs = { mode: 1 };
let outputs = { clock: 0 };

function action() {
    if (!inputs.mode) {
        hook___tickClock();
    }
}

function hook___tickClock() {
    outputs.clock = !outputs.clock ? 1 : 0;
}

export default {
    name,
    priority,
    action,
    inputs,
    outputs,
    hook___tickClock,
};