let _changeableValues      = {}, 
    _changeableValuesNames = ['inputs', 'outputs'];

let _elements              = [];
let _handlers              = {};
let _tickInterval          = 1000;

export function create(config = {}) {
    const { 
        elements = [],
        handlers = [],
        tick,
    } = config;

    if (tick) _tickInterval = tick;

    _changeableValues = getChangeableValuesOfElements(elements);
    _elements         = wrapElementsWithPrevValues(elements);
                        sortByPriority(_elements);

    _handlers = spreadOutHandlersByNames(handlers);

    initHandlers();
}

export function setTick(value) {
    _tickInterval = value;
}

export function run() {
    return setInterval(() => {
        tick();
    }, _tickInterval);
}

function initHandlers() {
    for (const element of _elements) {
        const handler = _handlers[element.element.name];

        const hookNames = getElementHooks(element.element);

        for (const hookName of hookNames) {
            const [_, name] = hookName.split('___');

            handler.hooks[name] = function (...args) {
                element.element[hookName](...args);

                _handlers[element.element.name].inputs(element.element.outputs);
                _handlers[element.element.name].outputs(element.element.outputs);

                tick();
            };
        }        

        handler.init && handler.init();
    }
}

function tick() {
    for (const element of _elements) {
        element[`perv_outputs`] = {...element.element.outputs};

        element.element.action();

        element[`next_outputs`] = {...element.element.outputs};

        _changeableValues = {
            ..._changeableValues,
            ...element.element.outputs,
        };

        setInputsExcludeOneElement(element);
    }

    runHandlers();
}

function setInputsExcludeOneElement(element) {
    for (const elementToChange of _elements) {
        if (elementToChange === element || !elementToChange.element.inputs) continue;

        elementToChange[`perv_inputs`] = {...elementToChange.element.inputs};

        const changeableValuesNames = Object.keys(elementToChange.element.inputs);
    
        for (const name of changeableValuesNames) {
            elementToChange.element.inputs[name] = _changeableValues[name];
        }

        elementToChange[`next_inputs`] = {...elementToChange.element.inputs};
    }
}

function runHandlers() {
    for (const element of _elements) {
        
        const inputs  = Object.keys(element.perv_inputs ?? {});
        const outputs = Object.keys(element.perv_outputs ?? {});

        let inputsIsChanged  = false;
        let outputsIsChanged = false;

        for (const inputName of inputs) {
            if (element.perv_inputs[inputName] !== element.next_inputs[inputName]) inputsIsChanged = true;
        }

        for (const outputName of outputs) {
            if (element.perv_outputs[outputName] !== element.next_outputs[outputName]) outputsIsChanged = true;
        }

        if (inputsIsChanged) {
            _handlers[element.element.name].inputs(element.element.inputs);
        }

        if (outputsIsChanged) {
            _handlers[element.element.name].outputs(element.element.outputs);
        }
    }
}

function getElementHooks(element) {
    return Object.keys(element).filter((field) => field.includes('hook__'));
}

/**
 * Spread out handlers by names
 * @param {Array<{ name: String }>} handlers 
 * @returns {Object}
 */
function spreadOutHandlersByNames(handlers = []) {
    let result = {};

    for (const handler of handlers) {
        result = {
            ...result,
            [handler.name]: handler
        };
    }

    return result;
}

/**
 * Wrap element with additional fields and return wrapped elements.
 * @param {Array<{ name: String, priority: Number, inputs: Object, outputs: Object, action: Function }>} elements 
 * @returns {Array<{ prev_inputs: Object, next_inputs: Object, prev_outputs: Object, next_outputs: Object, element: Object }>}
 */
function wrapElementsWithPrevValues(elements) {
    const result = [];

    for (const element of elements) {
        const wrappedElement = { element };

        for (const changeableValueName of _changeableValuesNames) {
            if (!element[changeableValueName]) continue;

            wrappedElement[`perv_${changeableValueName}`] = element[changeableValueName];
            wrappedElement[`next_${changeableValueName}`] = element[changeableValueName];
        }
        
        result.push(wrappedElement);
    }

    return result;
}

/**
 * Get changeable values from elements. Changeable values are configured in **_changeableValuesNames**.
 * @param {Array<{ name: String, priority: Number, inputs: Object, outputs: Object, action: Function }>} elements 
 * @returns {Object}
 */
function getChangeableValuesOfElements(elements) {
    let changeableValues = {};

    for (const element of elements) {
        for (const changeableValueName of _changeableValuesNames) {
            if (!element[changeableValueName]) continue;

            changeableValues = {
                ...changeableValues,
                ...element[changeableValueName],
            };  
        }
    }

    return changeableValues;
}

/**
 * Sort elements by priority field. The lower the **element.priority** value, the higher it is.
 * @param {Array<{ name: String, priority: Number, inputs: Object, outputs: Object, action: Function }>} elements 
 */
function sortByPriority(elements) {
    elements.sort((el1, el2) => el1.element.priority < el2.element.priority ? -1 : 1);
}
