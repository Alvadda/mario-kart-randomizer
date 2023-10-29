import { z } from 'zod'
import { create } from 'zustand'

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

interface ItemStoreState {
    allItemsByCategory: ItemsByCategory
    deselectedItemIds: string[]
    deselectItem: (id: string) => void
    selectItem: (id: string) => void
    getSelectedItemsByCategory: (category: keyof ItemsByCategory) => Item[]
}

export const useItemStore = create<ItemStoreState>((set, get) => ({
    allItemsByCategory: mapItemsFromJsonToItemsByCategory(itemFromJson),
    deselectedItemIds: [],
    deselectItem: (id: string) =>
        set((state) => ({ ...state, deselectedItemIds: [...state.deselectedItemIds, id] })),
    selectItem: (id: string) =>
        set((state) => ({
            ...state,
            deselectedItemIds: [...state.deselectedItemIds.filter((dId) => dId !== id)],
        })),
    getSelectedItemsByCategory: (category: ItemCategory) =>
        get().allItemsByCategory[category].filter(
            (item) => !get().deselectedItemIds.includes(item.id)
        ),
}))
