import { getBinaryRepresentationOfMachineCode } from "./getBinaryRepresentationOfMachineCode.js";

export function createJMP(machineCode){
    return function (_, label) {
        const binCommandAddress = getBinaryRepresentationOfMachineCode(machineCode);

        return [
            ...binCommandAddress,
            label, // первый байт адреса, на этапе препроцессинга ссылка на метку
            '' // второй байт пустая строка необходима, т.к. label - это ссылка на адрес, который имеет 16 разрядов и записываетя как 2 байта
        ];
    };
}