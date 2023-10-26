import { Player } from '@/components/player'

export const Randomizer = () => {
    return (
        <div className="h-full w-full flex flex-col gap-5 justify-end">
            <Player name="player 1" />
            <Player name="player 2" />
            <Player name="player 3" />
            <Player name="player 4" />
        </div>
    )
}
