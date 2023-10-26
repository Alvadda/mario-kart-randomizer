import { Player } from '@/components/player'
import { useRef } from 'react'

const test = new Set<() => void>()
export const Randomizer = () => {
    const spinRef = useRef<Array<() => void>>()

    const registerSpinHandler = (spin: () => void) => {
        console.log('register')
        const current = spinRef.current
        spinRef.current = current ? [...current, spin] : [spin]
    }

    const spinAll = () => {
        console.log(spinRef.current)
        spinRef.current?.forEach((spin) => spin())
    }

    return (
        <>
            <button onClick={() => spinAll()}>spin all</button>
            <div className="h-full w-full flex flex-col gap-5 justify-end">
                <Player name="player 1" registerSpin={registerSpinHandler} />
                <Player name="player 2" registerSpin={registerSpinHandler} />
                <Player name="player 3" registerSpin={registerSpinHandler} />
                <Player name="player 4" registerSpin={registerSpinHandler} />
            </div>
        </>
    )
}
