export function ElementWrapper(props) {
    const { children } = props;
    
    return (
        <div className="bg-[#FEFEFE] border-[1px] border-[#F3F3F3] rounded-[8px] w-fit">
            {children}
        </div>
    )
}