import { ArrowPathIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

import { Modal } from '@/components/modal'
import { PlayerOptions } from '@/components/playerOptions'
import { cn } from '@/libs/tw'
import { PlayerId } from '@/stores/itemStore'

import { PlayerBanner } from './playerBanner'
import { useRandomSelector } from './useRandomSelector'

type PlayerProps = {
    playerId: PlayerId
    name: string
    registerSpin: (register: { id: string; spinF: () => void }) => void
}

export const Player = ({ name, playerId, registerSpin }: PlayerProps) => {
    const [isPlayerOptionsOpen, setIsPlayerOptionsOpen] = useState(false)
    const { RandomSelector, isSpinning, spin } = useRandomSelector(2, playerId)

    useEffect(() => {
        registerSpin({
            id: name,
            spinF: spin,
        })
    }, [name, registerSpin, spin])

    return (
        <div className="w-full flex flex-col gap-2">
            <Modal
                title={name}
                isOpen={isPlayerOptionsOpen}
                onClose={() => setIsPlayerOptionsOpen(false)}
            >
                <PlayerOptions playerId={playerId} />
            </Modal>
            <PlayerBanner name={name}>
                <>
                    <button
                        aria-label="randomize"
                        className="px-2 py-2"
                        onClick={spin}
                        disabled={isSpinning}
                    >
                        <ArrowPathIcon
                            className={cn(
                                'h-5 w-5, transition duration-300',
                                isSpinning ? 'animate-spin opacity-50' : 'md:hover:scale-125'
                            )}
                        />
                    </button>
                    <button
                        aria-label="open player options"
                        className="px-2 py-2"
                        onClick={() => setIsPlayerOptionsOpen(true)}
                    >
                        <Cog6ToothIcon className="h-5 w-5 transition duration-300 hover:scale-125" />
                    </button>
                </>
            </PlayerBanner>
            <RandomSelector />
        </div>
    )
}
