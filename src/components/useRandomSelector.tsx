import { shuffle, wait } from '@/utils'
import { Item, getItemsFromCategoryByIndex } from '@/utils/itemHelper'
import { useCallback, useRef, useState } from 'react'

export const useRandomSelector = (animationDurationS = 1) => {
    const doorsRef = useRef<Array<HTMLDivElement | null>>([])
    const [isSpinning, setIsSpinning] = useState(false)
    const [prevWinner, setPrevWinner] = useState<Item[]>([])

    const spin = useCallback(async () => {
        const doors = doorsRef.current
        setIsSpinning(true)
        const winners: Item[] = []

        doors.forEach((door, index) => {
            if (!door) return

            const doorImages = getItemsFromCategoryByIndex(index)
            const boxes = door.children[0]
            const newBoxes = document.createElement('div')
            const pool = [prevWinner[index] ?? doorImages[0], ...shuffle(doorImages)]
            winners.push(pool.at(-1)!)

            for (let i = pool.length - 1; i >= 0; i--) {
                const imgEl = document.createElement('img')
                imgEl.className = 'flex justify-center items-center object-contain'
                imgEl.style.width = door.clientWidth + 'px'
                imgEl.style.height = door.clientHeight + 'px'
                imgEl.src = pool[i].url

                newBoxes.appendChild(imgEl)
            }

            newBoxes.style.transitionDuration = `${animationDurationS}s`
            newBoxes.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`

            door.replaceChild(newBoxes, boxes)
        })

        doors.forEach(async (door) => {
            if (!door) return

            await wait(40)
            const boxes = door.children[0] as HTMLDivElement
            boxes.style.transform = 'translateY(0)'
        })

        setPrevWinner(winners)
        setTimeout(() => setIsSpinning(false), animationDurationS * 1000)
    }, [animationDurationS, prevWinner])

    const RandomSelector = useCallback(
        () => (
            <div className="flex gap-2">
                {Array.from(Array(4)).map((_, index) => (
                    <div
                        key={index}
                        ref={(el) => (doorsRef.current[index] = el)}
                        className="w-full bg-white/60 aspect-[5/7] overflow-hidden rounded-sm"
                    >
                        <div className="flex justify-center items-center w-full h-full">
                            <div className="flex justify-center items-center text-5xl">❓</div>
                        </div>
                    </div>
                ))}
            </div>
        ),
        []
    )

    return {
        isSpinning,
        spin,
        RandomSelector,
    }
}
