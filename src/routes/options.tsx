import { useShallow } from 'zustand/react/shallow'

import { cn } from '@/libs/tw'
import { useItemStore } from '@/stores/itemStore'

export const Options = () => {
    const { allItemsByCategory, deselectedItemIds, selectItem, deselectItem } = useItemStore(
        useShallow((state) => ({
            allItemsByCategory: state.allItemsByCategory,
            deselectedItemIds: state.deselectedItemIds,
            selectItem: state.selectItem,
            deselectItem: state.deselectItem,
        }))
    )

    const getIsItemDeselected = (id: string) => deselectedItemIds.includes(id)

    const handleClick = (id: string, isDeselected: boolean) => {
        return isDeselected ? selectItem(id) : deselectItem(id)
    }

    return (
        <div className="w-full flex gap-2 flex-wrap justify-center">
            {allItemsByCategory.driver.map((item) => {
                const isDeselected = getIsItemDeselected(item.id)
                return (
                    <div
                        key={item.id}
                        className="bg-white/60 aspect-square h-16 lg:h-28 rounded-sm"
                        onClick={() => handleClick(item.id, isDeselected)}
                    >
                        <img
                            src={item.url}
                            className={cn('object-cover', isDeselected && 'saturate-0 opacity-50')}
                        />
                    </div>
                )
            })}
        </div>
    )
}
