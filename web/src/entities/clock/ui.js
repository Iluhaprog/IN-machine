import { useUnit } from "effector-react";
import { $clockState, tickClockEffect } from "./handler";
import { Signal } from "@/shared/ui/Signal";
import { Tooltip } from "@/shared/ui/Tooltip";

export function EClock () {
    const clockState = useUnit($clockState);

    return (
        <Tooltip text="Clock">
            <div onClick={() => tickClockEffect()}>
                <Signal state={clockState} />
            </div>
        </Tooltip>
    );
}