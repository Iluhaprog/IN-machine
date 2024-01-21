const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');

const parseString = xml2js.parseString;
const builder = new xml2js.Builder();

const OUT_DIR = 'test_build';
const OUT_BUILD_NAME = 'PC_with_ROM_CU_test_build.circ';

const CU_SOURCE = '../../PC_with_ROM_CU.circ';
const CU_OUT = `../${OUT_DIR}/${OUT_BUILD_NAME}`;
const FIRMWARE_TO_UPLOAD = `../${OUT_DIR}`;

const cuSourceCode = fs.readFileSync(path.join(CU_SOURCE)).toString('utf-8');

parseString(cuSourceCode, (err, result) => {
    if (err) {
        console.log(err);
    }

    for (var i = 0; i < result.project.circuit.length; i += 1) {
        const item = result.project.circuit[i];

        if (item.$.name === 'CU') {
            break;
        }
    }

    for (let j = 0; j < result.project.circuit[i]?.comp.length; j += 1) {
        const item = result.project.circuit[i]?.comp[j];
        
        if (item.$.name === 'ROM') {
            const name = item.a[3].$.val; 
            const value = fs.readFileSync(path.join(FIRMWARE_TO_UPLOAD, name)).toString('utf-8');
            const header = item.a[2]._.split('\n')[0];
            item.a[2]._ = header + '\n' + value;
        }
    };

    const xml = builder.buildObject(result);
    fs.writeFileSync(CU_OUT, xml, { encoding: 'utf-8' });
    
})