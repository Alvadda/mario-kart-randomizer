import { ArrowPathIcon } from '@heroicons/react/24/solid'
import { useRef } from 'react'

import { Button } from '@/components/button'
import { FlagWrapper } from '@/components/flagWrapper'
import { Player } from '@/components/player'
import { cn } from '@/libs/tw'
import { PlayerId } from '@/stores/itemStore'
import { removeElementAt } from '@/utils'

type SpinRegister = {
    id: PlayerId
    spinF: () => void
}

export const Randomizer = () => {
    const spinRegisterRef = useRef<Array<SpinRegister>>([])

    const registerSpinHandler = (register: SpinRegister) => {
        const current = spinRegisterRef.current
        const indexOfRegister = current.findIndex((r) => r.id === register.id)

        if (indexOfRegister === -1) {
            return (spinRegisterRef.current = [...current, register])
        }

        return (spinRegisterRef.current = [...removeElementAt(current, indexOfRegister), register])
    }

    const spinAll = () => spinRegisterRef.current?.forEach((sr) => sr.spinF())

    return (
        <div className="w-full h-full flex flex-col gap-5">
            <div className="w-full flex justify-center">
                <FlagWrapper>
                    <Button
                        aria-label="Randomize all player"
                        icon={
                            <ArrowPathIcon
                                className={cn('h-5 w-5 transition duration-300 hover:scale-125')}
                            />
                        }
                        onClick={() => spinAll()}
                        round={false}
                    />
                </FlagWrapper>
            </div>

            <div className="h-fit w-full flex flex-col gap-5 justify-end sm:grid-cols-2 sm:grid">
                <Player playerId={0} registerSpin={registerSpinHandler} />
                <Player playerId={1} registerSpin={registerSpinHandler} />
                <Player playerId={2} registerSpin={registerSpinHandler} />
                <Player playerId={3} registerSpin={registerSpinHandler} />
            </div>
        </div>
    )
}
