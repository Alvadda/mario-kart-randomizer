import { PlayerBanner } from '@/components/playerBanner'
import { useRandomSelector } from '@/components/useRandomSelector'

type PlayerProps = {
    name: string
}

export const Player = ({ name }: PlayerProps) => {
    const { RandomSelector, isSpinning, spin } = useRandomSelector()

    return (
        <div className="w-full flex flex-col gap-2">
            <button
                className="bg-green-500 disabled:bg-red-700"
                onClick={spin}
                disabled={isSpinning}
            >
                spin
            </button>
            <PlayerBanner name={name} />
            <RandomSelector />
        </div>
    )
}
