import { PlayerBanner } from '@/components/playerBanner'
import { useRandomSelector } from '@/components/useRandomSelector'

type PlayerProps = {
    name: string
}

export const Player = ({ name }: PlayerProps) => {
    const { RandomSelector, isSpinning, spin } = useRandomSelector(2)

    return (
        <div className="w-full flex flex-col gap-2">
            <PlayerBanner name={name} spin={spin} isSpinning={isSpinning} />
            <RandomSelector />
        </div>
    )
}
