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
    const {
        getAvailableItemsByCategory,
        deselectedPlayerItemsByCategory,
        selectPlayerItemByCategory,
        deselectPlayerItemByCategory,
    } = useItemStore(
        useShallow((state) => ({
            getAvailableItemsByCategory: state.getAvailableItemsByCategory,
            deselectedPlayerItemsByCategory: state.deselectedPlayerItemsByCategory[playerId],
            selectPlayerItemByCategory: state.selectPlayerItemByCategory,
            deselectPlayerItemByCategory: state.deselectPlayerItemByCategory,
        }))
    )

    const checkIsItemDeselected = (id: string) =>
        deselectedPlayerItemsByCategory[currentCategory].includes(id)

    const handleItemClick = (id: string, isDeselected: boolean) => {
        return isDeselected
            ? selectPlayerItemByCategory(currentCategory, playerId, id)
            : deselectPlayerItemByCategory(currentCategory, playerId, id)
    }

    return (
        <div className="w-full flex gap-2 flex-col">
            <TabBar
                options={['driver', 'vehicle', 'tires', 'gliders']}
                active={currentCategory}
                onSelect={setCurrentCategory}
            />
            <ItemSelection
                items={getAvailableItemsByCategory(currentCategory)}
                checkIsItemDeselected={checkIsItemDeselected}
                onItemClick={handleItemClick}
            />
        </div>
    )
}
