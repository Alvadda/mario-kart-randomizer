import { Player } from '@/components/player'
import { removeElementAt } from '@/utils'
import { useRef } from 'react'

type SpinRegister = {
    id: string
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
        <div className="w-full h-full flex justify-between flex-col">
            <button onClick={() => spinAll()}>spin all</button>
            <div className="h-full w-full flex flex-col gap-5 justify-end">
                <Player name="player 1" registerSpin={registerSpinHandler} />
                <Player name="player 2" registerSpin={registerSpinHandler} />
                <Player name="player 3" registerSpin={registerSpinHandler} />
                <Player name="player 4" registerSpin={registerSpinHandler} />
            </div>
        </div>
    )
}
