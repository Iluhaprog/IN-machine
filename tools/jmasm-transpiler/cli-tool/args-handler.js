import fs from "fs/promises"
import path from "path";
import chalk from "chalk";

import { translateSource } from "../core/processing/translate.js";
import * as Formatters from "./output-formatters/export.js";


export async function handleArgs(args) {
    const { source, output, format } = args;

    const sourceCode = await fs.readFile(source);

    try {
        const translatedSource = translateSource(sourceCode.toString());
        const formatter = Formatters[format].formatter;

        const config = {};

        if (Formatters[format]?.encoding) {
            config.encoding = Formatters[format].encoding;
        }

        const outputCode = formatter(translatedSource);

        if (!output) {
            await fs.writeFile(path.join(path.dirname(source), path.parse(source).name), outputCode, config);
            console.log(chalk.green('SUCCESS'));
            return;
        }

        await fs.writeFile(output, outputCode);
        console.log(chalk.green('SUCCESS'));   
    } catch (e) {
        console.log(chalk.red(e.message));
    }

}