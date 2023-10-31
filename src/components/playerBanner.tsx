import { PlayerBannerFlag } from './playerBannerFlag'
import { StealthTextInput } from './stealthTextInput'

type PlayerBannerProps = {
    name: string
    children: JSX.Element
}

export const PlayerBanner = ({ name, children }: PlayerBannerProps) => {
    return (
        <div className="flex h-7 md:h-8 lg:h-9">
            <PlayerBannerFlag flip />
            <div className="h-full w-full bg-black/50 px-4 flex items-center justify-between capitalize">
                <StealthTextInput placeholder={name} className="placeholder-current" />
                <div className="flex gap-2">{children}</div>
            </div>
            <PlayerBannerFlag />
        </div>
    )
}
