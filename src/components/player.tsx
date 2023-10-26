import { PlayerBanner } from '@/components/playerBanner'
import { Selector } from '@/components/selector'

type PlayerProps = {
    name: string
}

export const Player = ({ name }: PlayerProps) => {
    return (
        <div className=" w-full flex flex-col gap-2">
            <PlayerBanner name={name} />
            <div className="flex gap-2">
                <Selector />
                <Selector />
                <Selector />
                <Selector />
            </div>
        </div>
    )
}
