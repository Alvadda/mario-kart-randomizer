type MainContainerProps = {
    children: JSX.Element
}

export const MainContainer = ({ children }: MainContainerProps) => {
    return (
        <div className="px-4 py-6 h-screen bg-blue-400 lg:w-1/3 md:w-3/5 w-screen">{children}</div>
    )
}
