const name = 'ClockMode';
const priority = 1;

let inputs = {};
let outputs = { mode: 1 };

function action() {}

function hook___toggleMode() {
    outputs.mode = !outputs.mode ? 1 : 0;
}

export default {
    name,
    priority,
    action,
    inputs,
    outputs,
    hook___toggleMode,
};