import { useEffect } from 'react'

import { PlayerId } from '@/stores/itemStore'

import { PlayerBanner } from './playerBanner'
import { useRandomSelector } from './useRandomSelector'

type PlayerProps = {
    playerId: PlayerId
    name: string
    registerSpin: (register: { id: string; spinF: () => void }) => void
}

export const Player = ({ name, playerId, registerSpin }: PlayerProps) => {
    const { RandomSelector, isSpinning, spin } = useRandomSelector(2, playerId)

    useEffect(() => {
        registerSpin({
            id: name,
            spinF: spin,
        })
    }, [name, registerSpin, spin])

    return (
        <div className="w-full flex flex-col gap-2">
            <PlayerBanner name={name} playerId={playerId} spin={spin} isSpinning={isSpinning} />
            <RandomSelector />
        </div>
    )
}
