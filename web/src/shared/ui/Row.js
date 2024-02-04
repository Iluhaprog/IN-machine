export function Row(props) {
    const { children, gap = 0, jc = 'start' } = props;

    return (
        <div className='flex' style={{ gap: gap + 'px', justifyContent: jc }}>
            {children}
        </div>
    )
}