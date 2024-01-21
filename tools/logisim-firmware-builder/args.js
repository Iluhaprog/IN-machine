const yargs = require('yargs');

const args = yargs(process.argv)
    .option('docs', {
        alias: 'd',
        describe: 'Path to dir with docs for control unit firmware',
        demandOption: true
    })
    .option('output', {
        alias: 'o',
        describe: 'Path to output created firmware for logisim'
    })
    .option('open-in-logisim', {
        alias: 'oil',
        describe: 'Upload and open logisim',
    })
    .option('path-to-java', {
        alias: 'ptj',
        describe: 'Path to java for executing circuit with builded cu-firmware'
    })
    .option('path-to-logisim', {
        alias: 'ptl',
        describe: 'Path to logisim for executing circuit with builded cu-formware'
    })
    .option('source-circuit', {
        alias: 'sc',
        describe: 'Path to model to upload firmware'
    })
    .parse();

module.exports = {
    args,
};