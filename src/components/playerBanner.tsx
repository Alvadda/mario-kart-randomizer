import { FlagWrapper } from '@/components/flagWrapper'

type PlayerBannerProps = {
    playerInput: JSX.Element
    playerActions: JSX.Element
}

export const PlayerBanner = ({ playerInput, playerActions }: PlayerBannerProps) => {
    return (
        <div className="flex h-7 md:h-8 lg:h-9">
            <FlagWrapper>
                <div className="h-full w-full bg-black/50 px-4 flex items-center justify-between capitalize">
                    {playerInput}
                    <div className="flex gap-2">{playerActions}</div>
                </div>
            </FlagWrapper>
        </div>
    )
}
