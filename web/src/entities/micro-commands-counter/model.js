const name = 'MicroCommandsCounter';
const priority = 2;

let inputs = {
    clock: 0,

    db1: 0,
    db2: 0,
    db3: 0,
    db4: 0,
    db5: 0,
    db6: 0,
    db7: 0,
    db8: 0,

    MC_n_Enable_Counter: 1,
    MC_n_Clear: 1,
    MC_n_Enable_Load: 1,

    OR_n_EN1: 1,
    OR_n_EN2: 1,
    OR_n_EN_Out: 1,
};

let outputs = {
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
};


let innerStorage = {
    opcode: {},

    prevClockValue: 0,
};


function action() {
    count();

    saveOpcodeEN1();
    saveOpcodeEN2();
}

function count() {
    if (inputs.MC_n_Enable_Counter && inputs.MC_n_Clear && inputs.MC_n_Enable_Load) {
        if (inputs.clock && inputs.clock !== innerStorage.prevClockValue) {
            for (const pin of Object.keys(outputs)) {
                if (outputs[pin] ^ 1 === 1) {
                    outputs[pin] = 1;
                    break;
                } 

                outputs[pin] = 0;
            }
        }
    }

    innerStorage.prevClockValue = inputs.clock;
}

function saveOpcodeEN1() {
    if (inputs.clock && !inputs.C_n_EN1) {
        innerStorage.opcode = { 
            mc1: inputs.db1,
            mc2: inputs.db2,
            mc3: inputs.db3,
            mc4: inputs.db4,
            mc5: inputs.db5,
            mc6: inputs.db6,
            mc7: inputs.db7,
            mc8: inputs.db8,
        };
    }
}

function saveOpcodeEN2() {
    if (inputs.clock && !inputs.C_n_EN2) {
        innerStorage.opcode = { 
            mc9: inputs.db1,
            mc10: inputs.db2,
            mc11: inputs.db3,
            mc12: inputs.db4,
            mc13: inputs.db5,
            mc14: inputs.db6,
            mc15: inputs.db7,
            mc16: inputs.db8,
        };
    }
}

function uploadOpcode() {
    if (
        !inputs.OR_n_EN_Out && 
        !inputs.MC_n_Enable_Load && inputs.MC_n_Enable_Counter && inputs.MC_n_Clear &&
        inputs.clock
    ) {
        outputs = { ...innerStorage.opcode };
    }
}

export default {
    name,
    priority,
    inputs,
    outputs,
    action,
};