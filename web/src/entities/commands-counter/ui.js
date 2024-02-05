import { useUnit } from "effector-react";
import { Signal } from "@/shared/ui/Signal";
import { $commandsCounterOutputs } from "./handler";
import { Tooltip } from "@/shared/ui/Tooltip";

export function ECommandsCounter() {
    const commandsCounterOutputs = useUnit($commandsCounterOutputs);
    const outputsNames = Object.keys(commandsCounterOutputs);

    return (
        <>
            {
                outputsNames.map((outputName, index) => {
                        return (
                            <Tooltip text={`CC${index}`} key={outputName}>
                                <Signal state={commandsCounterOutputs[outputName]}/>
                            </Tooltip>
                        );
                    }).reverse()
            }
        </>
    );
}