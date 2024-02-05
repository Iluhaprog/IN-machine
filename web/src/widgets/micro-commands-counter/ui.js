import { ElementWrapper } from "@/shared/ui/ElementWrapper";
import { Delimiter } from "@/shared/ui/Delimiter";
import { Row } from "@/shared/ui/Row";
import { EMicroCommandsCounter } from "@/entities/micro-commands-counter/ui";

export function WMicroCommandsCounter() {
    return (
        <ElementWrapper>
            <p className="text-[12px] text-center text-[#404159] px-[2px]">Micro Commands Counter</p>
            <Delimiter />
            <div className="p-[4px]">
                <Row gap={4}>
                    <EMicroCommandsCounter />
                </Row>
            </div>
        </ElementWrapper>
    )
}