import { ElementWrapper } from "@/shared/ui/ElementWrapper";
import { Delimiter } from "@/shared/ui/Delimiter";
import { EROM } from "@/entities/rom/ui";
import { Row } from "@/shared/ui/Row";
import { $numericRepresentationOfCommandsCounterOutputs } from "@/entities/commands-counter/handler";
import { useUnit } from "effector-react";

export function WROM() {
    const address = useUnit($numericRepresentationOfCommandsCounterOutputs);

    return (
        <ElementWrapper>
            <p className="text-[12px] text-center text-[#404159] px-[2px]">ROM</p>
            <Delimiter />
            <EROM.DataUploader address={address}/>
            <Delimiter />
            <div className="p-[5px]">
                <Row gap={5}>
                    <EROM.Outputs />
                </Row>
            </div>
        </ElementWrapper>
    );
}