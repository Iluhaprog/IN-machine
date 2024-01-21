import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

import * as Formatters from "./output-formatters/export.js"; 

export const args = yargs(hideBin(process.argv))
    .option('source', {
        alias: 's',
        describe: 'Path to source code',
        demandOption: true
    })
    .option('output', {
        alias: 'o',
        describe: 'Path to translated source code'
    })
    .option('format', {
        alias: 'f',
        describe: 'Output file format',
        choices: Object.values(Formatters).map(f => f.name),
        default: Formatters.BIN20.name
    }).parse();