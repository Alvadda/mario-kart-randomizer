import { Header } from '@/layout/header'

type MainContainerProps = {
    children: JSX.Element
}

export const MainContainer = ({ children }: MainContainerProps) => {
    return (
        <div className="min-h-screen bg-blue-600 bg-cover w-screen grid grid-rows-[max-content_1fr] text-white">
            <Header />
            <div className="px-4 py-6 w-full h-full">{children}</div>
        </div>
    )
}
