import { cn } from '@/libs/tw'
import { Item } from '@/stores/itemStore'

type ItemSelectionProps = {
    items: Item[]
    checkIsItemDeselected: (id: string) => boolean
    onItemClick: (id: string, isDeselected: boolean) => void
}

export const ItemSelection = ({
    items,
    checkIsItemDeselected,
    onItemClick,
}: ItemSelectionProps) => {
    return (
        <div className="w-full grid grid-cols-5 gap-2 md:grid-cols-10">
            {items.map((item) => {
                const isDeselected = checkIsItemDeselected(item.id)
                return (
                    <div
                        key={item.id}
                        className="bg-white/60 aspect-square w-full rounded-sm flex, justify-center items-center transition-all duration-300 group cursor-pointer"
                        onClick={() => onItemClick(item.id, isDeselected)}
                        role="button"
                    >
                        <img
                            src={item.url}
                            className={cn(
                                'object-cover transition-all duration-300 h-full',
                                isDeselected ? 'saturate-0 opacity-50' : 'group-hover:md:scale-105'
                            )}
                        />
                    </div>
                )
            })}
        </div>
    )
}
