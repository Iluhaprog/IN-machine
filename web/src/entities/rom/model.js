const name = 'ROM';
const priority = 3;

let inputs = {
    ROM_W_EN: 0,
    ROM_O_EN: 0,

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
};

let outputs = {
    db1: 0,
    db2: 0,
    db3: 0,
    db4: 0,
    db5: 0,
    db6: 0,
    db7: 0,
    db8: 0,
};

let innerStorage = {
    data: [],
};

function action() {
    if (!inputs.ROM_O_EN && !inputs.cc14 && !inputs.cc15 && !inputs.cc16) {
        const address = _getAddressByInputs();
        const dataRow = innerStorage.data[address] ?? [0, 0, 0, 0, 0, 0, 0, 0];

        outputs.db1 = dataRow[7];
        outputs.db2 = dataRow[6];
        outputs.db3 = dataRow[5];
        outputs.db4 = dataRow[4];
        outputs.db5 = dataRow[3];
        outputs.db6 = dataRow[2];
        outputs.db7 = dataRow[1];
        outputs.db8 = dataRow[0];
    }
}

function hook___uploadData(data) {
    innerStorage.data = data;
}

function _getAddressByInputs() {
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
    } = inputs;
    
    return parseInt(`${cc16}${cc15}${cc14}${cc13}${cc12}${cc11}${cc10}${cc9}${cc8}${cc7}${cc6}${cc5}${cc4}${cc3}${cc2}${cc1}`, 2)
}

export default {
    name,
    priority,
    inputs,
    outputs,
    action,
    hook___uploadData,
};