import { useUnit } from "effector-react";
import { $romData, uploadData } from "../handler";
import { Row } from "@/shared/ui/Row";
import { useRef } from "react";
import { Delimiter } from "@/shared/ui/Delimiter";
import { formatNumberToArrayOfBinValues } from "@/shared/libs/numberToArrayOfBinValues";

export function DataUploader({ address }) {
    const romData = useUnit($romData);

    const firmwareInputRef = useRef(null);

    function getFirmwareFile() {
        if (firmwareInputRef.current) {
            firmwareInputRef.current.click();
        }
    }

    function uploadDataFromFile(event) {
        const file = event.target.files[0];

        const reader = new FileReader();

        reader.addEventListener('load', (event) => {
            const value = new Uint8Array(event.target.result);
            const formattedFirmware = Array.from(value).map(formatNumberToArrayOfBinValues);

            uploadData(formattedFirmware);
        });

        reader.readAsArrayBuffer(file);
    }

    function scrollToElement(ref) {
        if (ref) {
            ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }


    return (
        <>
            <div className="p-[5px]">
                <div className="p-[5px] h-[200px] border-[1px] border-[#F3F3F3] bg-[#F8F8F8] rounded-[8px] overflow-y-scroll styled-scrollbar">
                    {
                        romData.map((row, index) => (
                            <div
                                key={`data-row-${index}`}
                                className={`
                                    px-[3px]
                                    border-[1px]
                                    rounded-[4px]
                                    ${index === address ? 'border-[#F86E6E]' : 'border-[#F86E6E00]'}
                                `}
                                ref={(ref) => index === address && scrollToElement(ref)}
                            >
                                <Row jc='space-between'>
                                    <p className="text-[12px] text-center text-[#404159] pr-[5px]">{index}.</p>
                                    {
                                        row.map((value, index) => <p className="text-[12px] text-center text-[#404159] px-[2px]" key={`col-${index}`}>{value}</p>)
                                    }
                                </Row>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Delimiter />
            <div className="p-[5px]">
                <button
                    onClick={getFirmwareFile}
                    className="text-[10px] p-[2px] w-[100%]  border-[1px] border-[#F3F3F3] bg-[#F8F8F8] rounded-[8px]"
                >
                    SELECT FIRMWARE  
                </button>       
                <input 
                    ref={firmwareInputRef} 
                    type='file' 
                    name='firmware' 
                    className="hidden"
                    accept=".bin"
                    onChange={uploadDataFromFile}
                />    
            </div>
        </>
    )
}