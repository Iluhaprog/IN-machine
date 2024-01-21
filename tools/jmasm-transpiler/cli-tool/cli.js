import { args } from "./args.js";
import { handleArgs } from "./args-handler.js";

export const cli = () => handleArgs(args);