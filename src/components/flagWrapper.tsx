import { Flag } from '@/components/flag'

type FlagWrapperProps = {
    children: JSX.Element
}

export const FlagWrapper = ({ children }: FlagWrapperProps) => {
    return (
        <div className="flex w-full justify-center">
            <Flag flip />
            {children}
            <Flag />
        </div>
    )
}
