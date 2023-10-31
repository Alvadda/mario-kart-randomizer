import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { ItemSelection } from '@/components/itemSelection'
import { TabBar } from '@/components/tabBar'
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

    const checkIsItemDeselected = (id: string) => deselectedItemIds.includes(id)

    const handleItemClick = (id: string, isDeselected: boolean) => {
        return isDeselected ? selectItem(id) : deselectItem(id)
    }

    return (
        <div className="w-full flex gap-2 flex-col">
            <TabBar
                options={['driver', 'vehicle', 'tires', 'gliders']}
                active={currentCategory}
                onSelect={setCurrentCategory}
            />
            <ItemSelection
                items={allItemsByCategory[currentCategory]}
                checkIsItemDeselected={checkIsItemDeselected}
                onItemClick={handleItemClick}
            />
        </div>
    )
}
