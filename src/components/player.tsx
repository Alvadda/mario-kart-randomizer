import { ArrowPathIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

import { Modal } from '@/components/modal'
import { PlayerOptions } from '@/components/playerOptions'
import { StealthTextInput } from '@/components/stealthTextInput'
import { cn } from '@/libs/tw'
import { PlayerId } from '@/stores/itemStore'

import { PlayerBanner } from './playerBanner'
import { useRandomSelector } from './useRandomSelector'

type PlayerProps = {
    playerId: PlayerId
    registerSpin: (register: { id: PlayerId; spinF: () => void }) => void
}

export const Player = ({ playerId, registerSpin }: PlayerProps) => {
    const [playerName, setPlayerName] = useState<string>('')
    const [isPlayerOptionsOpen, setIsPlayerOptionsOpen] = useState(false)
    const { RandomSelector, isSpinning, spin } = useRandomSelector(2, playerId)

    const playerPlaceholderName = 'Player ' + (playerId + 1)

    useEffect(() => {
        registerSpin({
            id: playerId,
            spinF: spin,
        })
    }, [playerId, registerSpin, spin])

    return (
        <div className="w-full flex flex-col gap-2">
            <Modal
                title={playerName === '' ? playerPlaceholderName : playerName}
                isOpen={isPlayerOptionsOpen}
                onClose={() => setIsPlayerOptionsOpen(false)}
            >
                <PlayerOptions playerId={playerId} />
            </Modal>
            <PlayerBanner
                playerInput={
                    <StealthTextInput
                        placeholder={playerPlaceholderName}
                        value={playerName}
                        onChange={(e) => setPlayerName(e.currentTarget.value)}
                        className="placeholder-current"
                    />
                }
                playerActions={
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
                }
            ></PlayerBanner>
            <RandomSelector />
        </div>
    )
}
