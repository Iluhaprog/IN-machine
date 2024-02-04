export function Signal(props) {
    const { state = 0 } = props;

    return (
        <div className={`w-[12px] h-[12px] rounded-[4px] border-[1px] border-[#F3F3F3] ${state ? "bg-[#F86E6E]" : "bg-[#F8F8F8]"}`}></div>
    );
}