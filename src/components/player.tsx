import { useEffect } from 'react'

import { PlayerBanner } from './playerBanner'
import { useRandomSelector } from './useRandomSelector'

type PlayerProps = {
    name: string
    registerSpin: (register: { id: string; spinF: () => void }) => void
}

export const Player = ({ name, registerSpin }: PlayerProps) => {
    const { RandomSelector, isSpinning, spin } = useRandomSelector(2)

    useEffect(() => {
        registerSpin({
            id: name,
            spinF: spin,
        })
    }, [name, registerSpin, spin])

    return (
        <div className="w-full flex flex-col gap-2">
            <PlayerBanner name={name} spin={spin} isSpinning={isSpinning} />
            <RandomSelector />
        </div>
    )
}
