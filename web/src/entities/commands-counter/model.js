const name = 'CommandsCounter';
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

    C_n_Enable_Counter: 1,
    C_n_Clear: 1,
    C_n_Enable_Load: 1,

    UAR_n_EN1: 1,
    UAR_n_EN2: 1,
    UAR_n_EN_Out: 1,

    CAR_n_EN1: 1,
    CAR_n_EN2: 1,
    CAR_n_EN_Out: 1,
};

let outputs = {
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
}

let innerStorage = {
    currentAddress: {},
    userAddress: {},

    prevClockValue: 0,
};

function action() {
    count();
    saveCurrentAddress();
    saveUserAddress();

    uploadCurrentAddress();
    uploadUserAddress();
}

function count() {
    if (inputs.C_n_Enable_Counter && inputs.C_n_Clear && inputs.C_n_Enable_Load) {
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

function saveCurrentAddress() {
    if (!inputs.clock && !inputs.CAR_n_EN1 && !inputs.CAR_n_EN2) {
        innerStorage.currentAddress = { ...outputs };
    }
}

function saveUserAddress() {
    if (!inputs.UAR_n_EN1 && inputs.clock) {
        innerStorage.userAddress = {
            ...innerStorage.userAddress,
            cc1: inputs.db1,
            cc2: inputs.db2,
            cc3: inputs.db3,
            cc4: inputs.db4,
            cc5: inputs.db5,
            cc6: inputs.db6,
            cc7: inputs.db7,
            cc8: inputs.db8,
        }
    }

    if (!inputs.UAR_n_EN2 && inputs.clock) {
        innerStorage.userAddress = {
            ...innerStorage.userAddress,
            cc9: inputs.db1,
            cc10: inputs.db2,
            cc11: inputs.db3,
            cc12: inputs.db4,
            cc13: inputs.db5,
            cc14: inputs.db6,
            cc15: inputs.db7,
            cc16: inputs.db8,
        }
    }
}

function uploadCurrentAddress() {
    if (
        !inputs.CAR_n_EN_Out && 
        !inputs.C_n_Enable_Load && inputs.C_n_Enable_Counter && inputs.C_n_Clear &&
        inputs.clock
    ) {
        outputs = { ...innerStorage.currentAddress };
    }
}

function uploadUserAddress() {
    if (
        !inputs.UAR_n_EN_Out && 
        !inputs.C_n_Enable_Load && inputs.C_n_Enable_Counter && inputs.C_n_Clear &&
        inputs.clock
    ) {
        outputs = { ...innerStorage.userAddress };
    }
}

export default {
    name,
    priority,
    inputs,
    outputs,
    action,
};