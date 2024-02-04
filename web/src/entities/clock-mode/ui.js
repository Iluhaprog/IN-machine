import { useUnit } from "effector-react";
import { $clockMode, toggleModeEffect } from "./handler";
import { Signal } from "@/shared/ui/Signal";
import { Tooltip } from "@/shared/ui/Tooltip";

export function EClockMode () {
    const clockMode = useUnit($clockMode);

    return (
        <Tooltip text="Mode">
            <div onClick={() => toggleModeEffect()}>
                <Signal state={clockMode} />
            </div>
        </Tooltip>
    );
}