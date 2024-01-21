#! /usr/bin/env node

// ---------------------
// --- START [BUILD] ---
// ---------------------
const { args } = require('./args');

(function () {

    const { docs, output } = args;

    const fs = require('fs');
    const path = require('path');
    const asTable = require('as-table').configure({
        dash: '-',
        delimiter: ' | ',
        
    });

    const OUT_DIR = output;

    const INSTRUCTIONS_DESCRIPTION = 'rom-firmware';

    const SOURCE_FILES_DOCS_DIR = docs;
    const SOURCE_FILES = [
        'instruction_read',
        'set_instruction',
        'mov_instruction',
        'rd_instruction',
        'wt_instruction',
        'sum_instruction',
        'and_instruction',
        'or_instruction',
        'not_instruction',
        'xor_instruction',
        'shl_instruction',
        'shr_instruction',
        'jmp_instruction',
        'jmp_eq_instruction',
        'jmp_ne_instruction',
        'jmp_cs_instruction',
        'jmp_cc_instruction',
        'jmp_mi_instruction',
        'jmp_pl_instruction',
        'jmp_vs_instruction',
        'jmp_vc_instruction',
        'jmp_hi_instruction',
        'jmp_ls_instruction',
        'jmp_ge_instruction',
        'jmp_lt_instruction',
        'jmp_gt_instruction',
        'jmp_le_instruction',
    ];


    (function () {
        // READ CODES FROM DESCRIPTION FILES
        const binaryCodes = [];
        
        for (const instructionFile of SOURCE_FILES) {
            binaryCodes.push([
                instructionFile,
                fs.readFileSync(path.join(SOURCE_FILES_DOCS_DIR, instructionFile))
                .toString('utf-8')
                .split('\n')
                .filter(line => ['0', '1'].includes(line[0]))
                .map(code => code.split('#')[0])
            ]);
        }

        // CONVERT BINARY CODES INTO HEX CODES
        const sections = {
            ROM_1: [],
            ROM_2: [],
            ROM_3: [],
            ROM_4: [],
            ROM_5: [],
	        ROM_6: [],
        };

        const sectionsKeys = Object.keys(sections);

        const instructionsDescription = [];

        let instructionCodeNumber = 0;
        for (const instructionCode of binaryCodes) {
            const [name, binaryCodes] = instructionCode;
            
            instructionsDescription.push(
                [name, instructionCodeNumber]
            );

            for (const microcodeItem of binaryCodes) {
                const microcodeSections = microcodeItem.split('  ').map(code => code.trim());
                
                microcodeSections.forEach((sectionMicrocode, index) => {
                    const hexMicrocodeValue = sectionMicrocode.split(' ').join('');
                    sections[sectionsKeys[index]].push(parseInt(hexMicrocodeValue, 2).toString(16));
                });
            }

            instructionCodeNumber += binaryCodes.length;
            
        }
        
        if (!fs.existsSync(OUT_DIR)) {
            fs.mkdirSync(path.join(OUT_DIR));
        }

        const descriptions = instructionsDescription.map(([name, code]) => {
            let bin = code.toString(2);
            if (bin.length < 16) {
                bin = Array(16 - bin.length).fill('0').join('') + bin;
            }

            let tmp = '';
            for (let i = 0; i < bin.length; i += 1) {
                tmp += bin[i];
                if ((i + 1) % 4 === 0) {
                    tmp += ' ';
                }
                if ((i + 1) % 8 === 0) {
                    tmp += '  ';
                }
            }
            bin = tmp;
            
            let hex = code.toString(16);

            if (hex.length < 4) {
                hex = Array(4 - hex.length).fill('0').join('') + hex;
            }

            tmp = ''
            for (let i = 0; i < hex.length; i += 1) {
                tmp += hex[i];
                if ((i + 1) % 2 === 0) {
                    tmp += ' ';
                }
            }

            hex = tmp;

            return {
                Name: name,
                HEX: hex,
                BIN: bin
            }
        });

        fs.writeFileSync(path.join(OUT_DIR, INSTRUCTIONS_DESCRIPTION), asTable(descriptions));

        for (const sectionKey of sectionsKeys) {
            let data = '';
            let tmp = '';
            for (let i = 0; i < sections[sectionKey].length; i += 1) {
                data += sections[sectionKey][i] + ' ';

                if ((i + 1) % 6 === 0) {
                    data += '\r\n';
                }
            }

            fs.writeFileSync(path.join(OUT_DIR, sectionKey), data, { encoding: "utf-8"});
            
        }

        console.log('[INFO] BUILD DONE!');
    })();
})();
// -------------------
// --- END [BUILD] ---
// -------------------

(function (done) {
    const { output, oil = false, sc } = args;

    if (!oil) {
        return;
    }

    const xml2js = require('xml2js');
    const fs = require('fs');
    const path = require('path');

    const parseString = xml2js.parseString;
    const builder = new xml2js.Builder();

    const OUT_DIR = output;
    const OUT_BUILD_NAME = 'PC_with_ROM_CU___firmware_build.circ';

    const CU_SOURCE = sc;
    const CU_OUT = `${OUT_DIR}/${OUT_BUILD_NAME}`;
    const FIRMWARE_TO_UPLOAD = OUT_DIR;

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
        
        console.log('[INFO] UPLOAD DONE!');
        done(OUT_BUILD_NAME);
    })
})((outBuildName) => {
    const exec = require('child_process').exec;
    const path = require('path');

    const { oil = false, ptl, ptj, output } = args;

    if (!oil) {
        return;
    }

    const JAVA_PATH = ptj ?? 'D:\\Apps\\Java\\jdk-20\\bin\\java';
    const LOGISIM_PATH = ptl ?? 'D:\\Apps\\logisim-evolution\\app\\logisim-evolution-3.8.0-all.jar';
    const PATH_TO_CIRCUIT = path.join(output, outBuildName);

    exec(`${JAVA_PATH} -jar ${LOGISIM_PATH} -u ${PATH_TO_CIRCUIT}`, function (err) {
        if (err) {
            console.log(err);
            return;
        }

        console.log('[INFO] OPEN BUILD DONE!');

        process.exit(0);
    });


});
