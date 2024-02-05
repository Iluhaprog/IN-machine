import { useUnit } from "effector-react";
import { Signal } from "@/shared/ui/Signal";
import { $microCommandsCounterOutputs } from "./handler";
import { Tooltip } from "@/shared/ui/Tooltip";

export function EMicroCommandsCounter() {
    const microCommandsCounterOutputs = useUnit($microCommandsCounterOutputs);
    const outputsNames = Object.keys(microCommandsCounterOutputs);

    return (
        <>
            {
                outputsNames.map((outputName, index) => {
                        return (
                            <Tooltip text={`MC${index}`} key={outputName}>
                                <Signal state={microCommandsCounterOutputs[outputName]}/>
                            </Tooltip>
                        );
                    }).reverse()
            }
        </>
    );
}