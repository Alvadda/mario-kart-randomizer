import { z } from 'zod'

import imgsJson from './imgs.json'

const imgObjSchema = z.array(
    z.object({
        id: z.string(),
        url: z.string(),
    })
)

const imgsSchema = z.object({
    driver: imgObjSchema,
    tires: imgObjSchema,
    gliders: imgObjSchema,
    vehicle: z.object({
        cars: imgObjSchema,
        bikes: imgObjSchema,
    }),
})

export const images = imgsSchema.parse(imgsJson)
export type ImgObjArray = z.infer<typeof imgObjSchema>
export const getImagTypeToIndex = (idx: number) => {
    switch (idx) {
        case 0:
            return images.driver
        case 1:
            return [...images.vehicle.bikes, ...images.vehicle.cars]
        case 2:
            return images.tires
        case 3:
            return images.gliders
        default:
            return images.driver
    }
}