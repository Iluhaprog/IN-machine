import { Signal } from "@/shared/ui/Signal";
import { Tooltip } from "@/shared/ui/Tooltip";
import { Row } from "@/shared/ui/Row";
import { ElementWrapper } from "@/shared/ui/ElementWrapper";
import { Delimiter } from "@/shared/ui/Delimiter";
import { EClock } from "@/entities/clock/ui";
import { EClockMode } from "@/entities/clock-mode/ui";

export function FClock () {
    return (
        <ElementWrapper>
            <p className="text-[12px] text-center text-[#404159] px-[2px]">clock</p>
            <Delimiter />
            <div className="p-[4px]">
                <Row gap={4} jc="center">
                    <EClockMode />
                    <EClock />
                </Row>
            </div>
        </ElementWrapper>
    );
}