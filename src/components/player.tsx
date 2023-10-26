import { PlayerBanner } from '@/components/playerBanner'
import { RandomSelector } from '@/components/randomSelector'

type PlayerProps = {
    name: string
}

export const Player = ({ name }: PlayerProps) => {
    return (
        <div className=" w-full flex flex-col gap-2">
            <PlayerBanner name={name} />
            <RandomSelector test="string" />
        </div>
    )
}
