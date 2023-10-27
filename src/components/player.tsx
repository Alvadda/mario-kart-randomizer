import { PlayerBanner } from '@/components/playerBanner'
import { useRandomSelector } from '@/components/useRandomSelector'
import { useEffect } from 'react'

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
