import { useUnit } from "effector-react";
import { $romOutputs } from "../handler";
import { Tooltip } from "@/shared/ui/Tooltip";
import { Signal } from "@/shared/ui/Signal";

export function Outputs() {
    const romOutputs = useUnit($romOutputs);
    const romOutputsNames = Object.keys(romOutputs);

    return (
        <>
            {
                romOutputsNames.map((outputName, index) => {
                        return (
                            <Tooltip text={`RO${index}`} key={outputName}>
                                <Signal state={romOutputs[outputName]}/>
                            </Tooltip>
                        );
                    }).reverse()
            }
        </>
    )
}