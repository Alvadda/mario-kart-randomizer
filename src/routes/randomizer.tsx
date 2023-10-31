import { useRef } from 'react'

import { Player } from '@/components/player'
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
        <div className="w-full h-full sm:justify-center gap-7 flex justify-between flex-col">
            <button onClick={() => spinAll()}>spin all</button>
            <div className="h-full sm:h-fit w-full flex flex-col gap-5 justify-end sm:grid-cols-2 sm:grid">
                <Player playerId={0} registerSpin={registerSpinHandler} />
                <Player playerId={1} registerSpin={registerSpinHandler} />
                <Player playerId={2} registerSpin={registerSpinHandler} />
                <Player playerId={3} registerSpin={registerSpinHandler} />
            </div>
        </div>
    )
}
