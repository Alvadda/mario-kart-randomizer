type MainContainerProps = {
    children: JSX.Element
}

export const MainContainer = ({ children }: MainContainerProps) => {
    return (
        <div className="px-4 py-6 h-screen bg-main bg-cover w-screen flex justify-center items-center">
            <div className=" lg:w-4/5 md:w-2/5 w-full h-full">{children}</div>
        </div>
    )
}
