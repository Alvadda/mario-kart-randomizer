import { ItemCategory } from '@/stores/itemStore'

type DoorProps = {
    itemCategory: ItemCategory
    setRef: (el: HTMLDivElement | null) => void
}

export const Door = ({ itemCategory, setRef }: DoorProps) => {
    return (
        <div
            ref={(el) => setRef(el)}
            data-item-category={itemCategory}
            className="w-full bg-white/50 aspect-[1/1] sm:aspect-[6/7] md:aspect-[5/7] overflow-hidden rounded-sm"
        >
            <div className="flex justify-center items-center w-full h-full">
                <div className="flex justify-center items-center text-5xl">❓</div>
            </div>
        </div>
    )
}
