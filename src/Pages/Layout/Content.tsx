
type ContentProps = {
    children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ( { children } ) => {
    return (
        <>
            {children}
        </>
    )
}

export default Content;