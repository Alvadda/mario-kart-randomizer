import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { ActionBar } from '@/components/actionBar'
import { ItemSelection } from '@/components/itemSelection'
import { TabBar } from '@/components/tabBar'
import { ItemCategory, useItemStore } from '@/stores/itemStore'

export const Options = () => {
    const [currentCategory, setCurrentCategory] = useState<ItemCategory>('driver')
    const {
        allItemsByCategory,
        deselectedItems,
        selectItemByCategory,
        deselectItemByCategory,
        selectAllItemsByCategory,
        deselectAllItemsByCategory,
    } = useItemStore(
        useShallow((state) => ({
            allItemsByCategory: state.allItemsByCategory,
            deselectedItems: state.deselectedItems,
            selectItemByCategory: state.selectItemByCategory,
            deselectItemByCategory: state.deselectItemByCategory,
            selectAllItemsByCategory: state.selectAllItemsByCategory,
            deselectAllItemsByCategory: state.deselectAllItemsByCategory,
        }))
    )

    const checkIsItemDeselected = (id: string) => deselectedItems[currentCategory].includes(id)

    const handleItemClick = (id: string, isDeselected: boolean) => {
        return isDeselected
            ? selectItemByCategory(currentCategory, id)
            : deselectItemByCategory(currentCategory, id)
    }

    return (
        <div className="w-full flex gap-2 flex-col">
            <div className="w-full flex flex-col">
                <TabBar
                    options={['driver', 'vehicle', 'tires', 'gliders']}
                    active={currentCategory}
                    onSelect={setCurrentCategory}
                />
                <ActionBar
                    actions={[
                        {
                            name: 'Select all',
                            action: () => selectAllItemsByCategory(currentCategory),
                        },
                        {
                            name: 'Deselect all',
                            action: () => deselectAllItemsByCategory(currentCategory),
                        },
                    ]}
                />
            </div>
            <ItemSelection
                items={allItemsByCategory[currentCategory]}
                checkIsItemDeselected={checkIsItemDeselected}
                onItemClick={handleItemClick}
            />
        </div>
    )
}
