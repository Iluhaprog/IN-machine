export function Tooltip(props) {
    const { children, text, position } = props;

    return (
        <div className="has-tooltip relative w-fit">
            <div className="tooltip bottom-[100%] bg-[#141B2D] text-[#FFFFFF] p-[3px] rounded-[4px] border-[1px] border-[#14133E] text-[8px]">{text}</div>
            <div className="cursor-pointer">
                {children}
            </div>
        </div>
    )
}