import { ArrowPathIcon, Cog6ToothIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

import { Modal } from '@/components/modal'
import { PlayerOptions } from '@/components/playerOptions'
import { cn } from '@/libs/tw'
import { PlayerId } from '@/stores/itemStore'

import { PlayerBannerFlag } from './playerBannerFlag'
import { StealthTextInput } from './stealthTextInput'

type PlayerBannerProps = {
    playerId: PlayerId
    name: string
    spin: () => void
    isSpinning: boolean
}

export const PlayerBanner = ({ name, playerId, spin, isSpinning }: PlayerBannerProps) => {
    const [isPlayerOptionsOpen, setIsPlayerOptionsOpen] = useState(false)

    return (
        <div className="flex h-7 md:h-8 lg:h-9">
            <Modal
                title="player"
                isOpen={isPlayerOptionsOpen}
                onClose={() => setIsPlayerOptionsOpen(false)}
            >
                <PlayerOptions playerId={playerId} />
            </Modal>
            <PlayerBannerFlag flip />
            <div className="h-full w-full bg-black/50 px-4 flex items-center justify-between capitalize">
                <StealthTextInput placeholder={name} className="placeholder-current" />
                <div className="flex gap-2">
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
                </div>
            </div>
            <PlayerBannerFlag />
        </div>
    )
}
