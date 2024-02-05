import { ECommandsCounter } from "@/entities/commands-counter/ui";
import { ElementWrapper } from "@/shared/ui/ElementWrapper";
import { Delimiter } from "@/shared/ui/Delimiter";
import { Row } from "@/shared/ui/Row";

export function WCommandsCounter() {
    return (
        <ElementWrapper>
            <p className="text-[12px] text-center text-[#404159] px-[2px]">Commands Counter</p>
            <Delimiter />
            <div className="p-[4px]">
                <Row gap={4}>
                    <ECommandsCounter />
                </Row>
            </div>
        </ElementWrapper>
    )
}