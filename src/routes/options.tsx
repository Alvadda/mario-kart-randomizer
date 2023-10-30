import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { TabBar } from '@/components/tabBar'
import { cn } from '@/libs/tw'
import { ItemCategory, useItemStore } from '@/stores/itemStore'

export const Options = () => {
    const [currentCategory, setCurrentCategory] = useState<ItemCategory>('driver')
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
        <div className="w-full flex gap-2 flex-col">
            <TabBar
                options={['driver', 'vehicle', 'tires', 'gliders']}
                active={currentCategory}
                onSelect={setCurrentCategory}
            />
            <div className="w-full grid grid-cols-5 gap-2 md:grid-cols-10">
                {allItemsByCategory[currentCategory].map((item) => {
                    const isDeselected = getIsItemDeselected(item.id)
                    return (
                        <div
                            key={item.id}
                            className="bg-white/60 aspect-square w-full rounded-sm flex justify-center items-center"
                            onClick={() => handleClick(item.id, isDeselected)}
                        >
                            <img
                                src={item.url}
                                className={cn(
                                    'object-cover',
                                    isDeselected && 'saturate-0 opacity-50'
                                )}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
