const fs = require('fs');
const path = require('path');
const asTable = require('as-table').configure({
    dash: '-',
    delimiter: ' | ',
    
});

const OUT_DIR = '../dist';

const INSTRUCTIONS_DESCRIPTION = 'instructions';

const SOURCE_FILES = [
    'instruction_read',
    'set_instruction',
    'mov_instruction',
    'rd_instruction',
    'wt_instruction',
];


(function () {
    // READ CODES FROM DESCRIPTION FILES
    const binaryCodes = [];
    
    for (const instructionFile of SOURCE_FILES) {
        binaryCodes.push([
            instructionFile,
            fs.readFileSync(path.join('../', instructionFile))
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
