import { Header } from '@/layout/header'

type MainContainerProps = {
    children: JSX.Element
}

export const MainContainer = ({ children }: MainContainerProps) => {
    return (
        <div className="h-full bg-cover w-full grid grid-rows-[max-content_1fr] text-white font-poppins">
            <Header />
            <div className="px-4 py-6 sm:px-8 sm:py-10 w-full h-full overflow-auto">{children}</div>
        </div>
    )
}
