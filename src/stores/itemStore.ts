import { z } from 'zod'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { itemSchema, mapItemsFromJsonToItemsByCategory } from '@/utils/imagesHandler'

export type Item = z.infer<typeof itemSchema>
export type ItemCategory = keyof ItemsByCategory
export type ItemsByCategory = {
    driver: Item[]
    vehicle: Item[]
    tires: Item[]
    gliders: Item[]
}
export type PlayerId = keyof DeselectedPlayerItemsByCategory
export type DeselectedPlayerItemsByCategory = {
    0: ItemIdsByCategory
    1: ItemIdsByCategory
    2: ItemIdsByCategory
    3: ItemIdsByCategory
}

type ItemIdsByCategory = Record<ItemCategory, string[]>

interface ItemStoreState {
    allItemsByCategory: ItemsByCategory
    deselectedItems: ItemIdsByCategory
    deselectedPlayerItemsByCategory: DeselectedPlayerItemsByCategory
    deselectItemByCategory: (category: ItemCategory, id: string) => void
    deselectPlayerItemByCategory: (category: ItemCategory, playerId: PlayerId, id: string) => void
    selectItemByCategory: (category: ItemCategory, id: string) => void
    selectPlayerItemByCategory: (category: ItemCategory, playerId: PlayerId, id: string) => void
    deselectAllItemsByCategory: (category: ItemCategory) => void
    selectAllItemsByCategory: (category: ItemCategory) => void
    getAvailableItemsByCategory: (category: ItemCategory) => Item[]
    getSelectedItemsForPlayerByCategory: (playerId: PlayerId, category: ItemCategory) => Item[]
}

const defaultItemIdsByCategory = {
    driver: [],
    vehicle: [],
    tires: [],
    gliders: [],
}

export const useItemStore = create<ItemStoreState>()(
    persist(
        (set, get) => ({
            allItemsByCategory: mapItemsFromJsonToItemsByCategory(),
            deselectedItems: defaultItemIdsByCategory,
            deselectedPlayerItemsByCategory: {
                0: defaultItemIdsByCategory,
                1: defaultItemIdsByCategory,
                2: defaultItemIdsByCategory,
                3: defaultItemIdsByCategory,
            },
            deselectItemByCategory: (category: ItemCategory, id: string) =>
                set((state) => ({
                    ...state,
                    deselectedItems: {
                        ...state.deselectedItems,
                        [category]: [...state.deselectedItems[category], id],
                    },
                })),
            deselectPlayerItemByCategory: (
                category: ItemCategory,
                playerId: PlayerId,
                id: string
            ) =>
                set((state) => ({
                    ...state,
                    deselectedPlayerItemsByCategory: {
                        ...state.deselectedPlayerItemsByCategory,
                        [playerId]: {
                            ...state.deselectedPlayerItemsByCategory[playerId],
                            [category]: [
                                ...state.deselectedPlayerItemsByCategory[playerId][category],
                                id,
                            ],
                        },
                    },
                })),
            selectItemByCategory: (category: ItemCategory, id: string) =>
                set((state) => ({
                    ...state,
                    deselectedItems: {
                        ...state.deselectedItems,
                        [category]: [
                            ...state.deselectedItems[category].filter((dId) => dId !== id),
                        ],
                    },
                })),
            selectPlayerItemByCategory: (category: ItemCategory, playerId: PlayerId, id: string) =>
                set((state) => ({
                    ...state,
                    deselectedPlayerItemsByCategory: {
                        ...state.deselectedPlayerItemsByCategory,
                        [playerId]: {
                            ...state.deselectedPlayerItemsByCategory[playerId],
                            [category]: state.deselectedPlayerItemsByCategory[playerId][
                                category
                            ].filter((dId) => dId !== id),
                        },
                    },
                })),
            deselectAllItemsByCategory: (category: ItemCategory) =>
                set((state) => {
                    const itemsByCategory = get().allItemsByCategory[category]

                    return {
                        ...state,
                        deselectedItems: {
                            ...state.deselectedItems,
                            [category]: itemsByCategory.map((i) => i.id),
                        },
                    }
                }),
            selectAllItemsByCategory: (category: ItemCategory) =>
                set((state) => {
                    return {
                        ...state,
                        deselectedItems: {
                            ...state.deselectedItems,
                            [category]: [],
                        },
                    }
                }),
            getAvailableItemsByCategory: (category: ItemCategory) =>
                get().allItemsByCategory[category].filter(
                    (item) => !get().deselectedItems[category].includes(item.id)
                ),
            getSelectedItemsForPlayerByCategory: (playerId: PlayerId, category: ItemCategory) => {
                const availableItemsByCategory = get().getAvailableItemsByCategory(category)
                const deselectedPlayerItemsByCategory =
                    get().deselectedPlayerItemsByCategory[playerId]

                return availableItemsByCategory.filter(
                    (ai) => !deselectedPlayerItemsByCategory[category].includes(ai.id)
                )
            },
        }),
        {
            name: 'item-store',
        }
    )
)
