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

export const imgs = imgsSchema.parse(imgsJson)
export type ImgObj = z.infer<typeof imgObjSchema>
