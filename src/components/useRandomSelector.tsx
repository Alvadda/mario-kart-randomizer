import { useCallback, useRef, useState } from 'react'

import { Item, ItemCategory, PlayerId, useItemStore } from '@/stores/itemStore'
import { shuffle, wait } from '@/utils'

import { Door } from './door'

export const useRandomSelector = (animationDurationS = 1, playerId: PlayerId) => {
    const doorsRef = useRef<Array<HTMLDivElement | null>>([])
    const [isSpinning, setIsSpinning] = useState(false)
    const [prevWinner, setPrevWinner] = useState<Item[]>([])
    const getSelectedItemsForPlayerByCategory = useItemStore(
        (state) => state.getSelectedItemsForPlayerByCategory
    )

    const spin = useCallback(async () => {
        const doors = doorsRef.current
        setIsSpinning(true)
        const winners: Item[] = []

        doors.forEach((door, index) => {
            if (!door) return

            const itemCategory = door.dataset.itemCategory as ItemCategory
            const doorImages = getSelectedItemsForPlayerByCategory(playerId, itemCategory)
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
    }, [animationDurationS, getSelectedItemsForPlayerByCategory, playerId, prevWinner])

    const RandomSelector = useCallback(
        () => (
            <div className="flex gap-2">
                <Door itemCategory="driver" setRef={(el) => (doorsRef.current[0] = el)} />
                <Door itemCategory="vehicle" setRef={(el) => (doorsRef.current[1] = el)} />
                <Door itemCategory="tires" setRef={(el) => (doorsRef.current[2] = el)} />
                <Door itemCategory="gliders" setRef={(el) => (doorsRef.current[3] = el)} />
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
