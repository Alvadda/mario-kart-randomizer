import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { ItemSelection } from '@/components/itemSelection'
import { TabBar } from '@/components/tabBar'
import { ItemCategory, PlayerId, useItemStore } from '@/stores/itemStore'

type PlayerOptionsProps = {
    playerId: PlayerId
}

export const PlayerOptions = ({ playerId }: PlayerOptionsProps) => {
    const [currentCategory, setCurrentCategory] = useState<ItemCategory>('driver')
    const { getAvailableItemsByCategory, deselectedItemIds, selectPlayerItem, deselectPlayerItem } =
        useItemStore(
            useShallow((state) => ({
                getAvailableItemsByCategory: state.getAvailableItemsByCategory,
                deselectedItemIds: state.deselectedPlayerItemIds[playerId],
                selectPlayerItem: state.selectPlayerItem,
                deselectPlayerItem: state.deselectPlayerItem,
            }))
        )

    const checkIsItemDeselected = (id: string) => deselectedItemIds.includes(id)

    const handleItemClick = (id: string, isDeselected: boolean) => {
        return isDeselected ? selectPlayerItem(playerId, id) : deselectPlayerItem(playerId, id)
    }

    return (
        <div className="w-full flex gap-2 flex-col">
            <TabBar
                options={['driver', 'vehicle', 'tires', 'gliders']}
                active={currentCategory}
                onSelect={setCurrentCategory}
            />
            <div className="w-full flex justify-between items-center mb-4 px-2">
                <button
                    // onClick={selectAllItems}
                    className="flex-1 mr-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                    Select All
                </button>
                <button
                    // onClick={deselectAllItems}
                    className="flex-1 ml-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                    Deselect All
                </button>
            </div>
            <ItemSelection
                items={getAvailableItemsByCategory(currentCategory)}
                checkIsItemDeselected={checkIsItemDeselected}
                onItemClick={handleItemClick}
            />
        </div>
    )
}
