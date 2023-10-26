import { useCallback, useRef, useState } from 'react'

const items = ['🍭', '❌', '⛄️', '🦄', '🍌', '💩', '👻', '😻', '💵', '🤡', '🦖', '🍎', '😂', '🖕']

const shuffle = ([...arr]) => {
    let m = arr.length
    while (m) {
        const i = Math.floor(Math.random() * m--)
        ;[arr[m], arr[i]] = [arr[i], arr[m]]
    }
    return arr
}

export const createBox = () => {
    const newBox = document.createElement('div')
    newBox.className = 'transition-transform ease-in-out duration-1000'

    return newBox
}

export const useRandomSelector = () => {
    const doorsRef = useRef<Array<HTMLDivElement | null>>([])
    const [isSpinning, setIsSpinning] = useState(false)
    const [prevWinner, setPrevWinner] = useState<string[]>([])

    const spin = useCallback(async () => {
        const doors = doorsRef.current
        setIsSpinning(true)
        const winners: string[] = []

        doors.forEach((door, index) => {
            if (!door) return
            const boxes = door.children[0]
            const newBoxes = createBox()
            const pool = [prevWinner[index] ?? '❓']
            pool.push(...shuffle(items))
            winners.push(pool.at(-1)!)

            for (let i = pool.length - 1; i >= 0; i--) {
                const box = document.createElement('div')
                box.className = 'box flex justify-center items-center text-5xl'
                box.style.width = door.clientWidth + 'px'
                box.style.height = door.clientHeight + 'px'
                box.textContent = pool[i]
                newBoxes.appendChild(box)
            }
            newBoxes.style.transitionDuration = `1s`
            newBoxes.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`
            door.replaceChild(newBoxes, boxes)
        })

        for (const door of doors) {
            if (!door) continue

            const boxes = door.children[0] as HTMLDivElement
            const duration = 1
            boxes.style.transform = 'translateY(0)'
            await new Promise((resolve) => setTimeout(resolve, duration * 100))
        }
        setPrevWinner(winners)
        setTimeout(() => setIsSpinning(false), 2000)
    }, [prevWinner])

    const RandomSelector = useCallback(
        () => (
            <>
                <div className="flex gap-2">
                    {Array.from(Array(4)).map((_, index) => (
                        <div
                            key={index}
                            ref={(el) => (doorsRef.current[index] = el)}
                            className="w-full bg-white/60 aspect-[5/7] overflow-hidden"
                        >
                            <div className="flex justify-center items-center w-full h-full">
                                <div className="flex justify-center items-center text-5xl">❓</div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        ),
        []
    )

    return {
        isSpinning,
        spin,
        RandomSelector,
    }
}
