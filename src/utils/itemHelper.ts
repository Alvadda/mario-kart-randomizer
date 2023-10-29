import { z } from 'zod'

import imgsJson from './imgs.json'

const itemSchema = z.object({
    id: z.string(),
    url: z.string(),
})

const itemArraySchema = z.array(itemSchema)

const itemsByCategorySchema = z.object({
    driver: itemArraySchema,
    tires: itemArraySchema,
    gliders: itemArraySchema,
    vehicle: z.object({
        cars: itemArraySchema,
        bikes: itemArraySchema,
    }),
})

export const itemsByCategory = itemsByCategorySchema.parse(imgsJson)
export type Item = z.infer<typeof itemSchema>
export const getItemsFromCategoryByIndex = (idx: number) => {
    switch (idx) {
        case 0:
            return itemsByCategory.driver
        case 1:
            return [...itemsByCategory.vehicle.bikes, ...itemsByCategory.vehicle.cars]
        case 2:
            return itemsByCategory.tires
        case 3:
            return itemsByCategory.gliders
        default:
            return itemsByCategory.driver
    }
}
