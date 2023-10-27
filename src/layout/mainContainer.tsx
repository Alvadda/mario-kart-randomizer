type MainContainerProps = {
    children: JSX.Element
}

export const MainContainer = ({ children }: MainContainerProps) => {
    return (
        <div className="px-4 py-6 h-screen bg-blue-400 w-screen flex justify-center items-center">
            <div className="lg:w-1/3 md:w-3/5 w-full h-full">{children}</div>
        </div>
    )
}
