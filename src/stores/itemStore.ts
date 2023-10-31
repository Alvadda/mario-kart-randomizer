import { z } from 'zod'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import imgsJson from '@/utils/imgs.json'

const itemSchema = z.object({
    id: z.string(),
    url: z.string(),
})

const itemArraySchema = z.array(itemSchema)

const itemsJsonSchema = z.object({
    driver: itemArraySchema,
    tires: itemArraySchema,
    gliders: itemArraySchema,
    vehicle: z.object({
        cars: itemArraySchema,
        bikes: itemArraySchema,
    }),
})

type ItemsJsonSchema = z.infer<typeof itemsJsonSchema>

const itemFromJson = itemsJsonSchema.parse(imgsJson)
const mapItemsFromJsonToItemsByCategory = (jsonItems: ItemsJsonSchema): ItemsByCategory => ({
    driver: jsonItems.driver,
    vehicle: [...jsonItems.vehicle.bikes, ...jsonItems.vehicle.cars],
    tires: jsonItems.tires,
    gliders: jsonItems.gliders,
})

export type Item = z.infer<typeof itemSchema>
export type ItemCategory = keyof ItemsByCategory
export type ItemsByCategory = {
    driver: Item[]
    vehicle: Item[]
    tires: Item[]
    gliders: Item[]
}
export type PlayerId = keyof DeselectedPlayerItemIds
export type DeselectedPlayerItemIds = {
    0: string[]
    1: string[]
    2: string[]
    3: string[]
}

interface ItemStoreState {
    allItemsByCategory: ItemsByCategory
    deselectedItemIds: string[]
    deselectedPlayerItemIds: DeselectedPlayerItemIds
    deselectItem: (id: string) => void
    deselectPlayerItem: (playerId: PlayerId, itemId: string) => void
    selectItem: (id: string) => void
    selectPlayerItem: (playerId: PlayerId, itemId: string) => void
    getAvailableItemsByCategory: (category: ItemCategory) => Item[]
    getSelectedItemsForPlayerByCategory: (playerId: PlayerId, category: ItemCategory) => Item[]
}

export const useItemStore = create<ItemStoreState>()(
    persist(
        (set, get) => ({
            allItemsByCategory: mapItemsFromJsonToItemsByCategory(itemFromJson),
            deselectedItemIds: [],
            deselectedPlayerItemIds: {
                0: [],
                1: [],
                2: [],
                3: [],
            },
            deselectItem: (id: string) =>
                set((state) => ({ ...state, deselectedItemIds: [...state.deselectedItemIds, id] })),
            deselectPlayerItem: (playerId: PlayerId, itemId: string) =>
                set((state) => ({
                    ...state,
                    deselectedPlayerItemIds: {
                        ...state.deselectedPlayerItemIds,
                        [playerId]: [...state.deselectedPlayerItemIds[playerId], itemId],
                    },
                })),
            selectItem: (id: string) =>
                set((state) => ({
                    ...state,
                    deselectedItemIds: [...state.deselectedItemIds.filter((dId) => dId !== id)],
                })),
            selectPlayerItem: (playerId: PlayerId, itemId: string) =>
                set((state) => ({
                    ...state,
                    deselectedPlayerItemIds: {
                        ...state.deselectedPlayerItemIds,
                        [playerId]: state.deselectedPlayerItemIds[playerId].filter(
                            (dId) => dId !== itemId
                        ),
                    },
                })),
            getAvailableItemsByCategory: (
                category: ItemCategory // rename to availableItemsByCategory
            ) =>
                get().allItemsByCategory[category].filter(
                    (item) => !get().deselectedItemIds.includes(item.id)
                ),
            getSelectedItemsForPlayerByCategory: (playerId: PlayerId, category: ItemCategory) => {
                const availableItemsByCategory = get().getAvailableItemsByCategory(category)
                const deselectedPlayerItemIds = get().deselectedPlayerItemIds[playerId]

                return availableItemsByCategory.filter(
                    (ai) => !deselectedPlayerItemIds.includes(ai.id)
                )
            },
        }),
        {
            name: 'item-store',
        }
    )
)
