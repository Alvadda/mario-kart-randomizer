import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { ActionBar } from '@/components/actionBar'
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
                            action: () => {},
                        },
                        {
                            name: 'Deselect all',
                            action: () => {},
                        },
                    ]}
                />
            </div>
            <ItemSelection
                items={getAvailableItemsByCategory(currentCategory)}
                checkIsItemDeselected={checkIsItemDeselected}
                onItemClick={handleItemClick}
            />
        </div>
    )
}
