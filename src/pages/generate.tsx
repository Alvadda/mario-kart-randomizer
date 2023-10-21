import { PlayerBanner } from '@/components/playerBanner'

export const Generate = () => {
    return (
        <div className="h-screen bg-blue-400 lg:w-1/3 sm:w-screen p-2">
            <PlayerBanner name="Player 1" />
            <PlayerBanner name="Player 2" />
        </div>
    )
}
