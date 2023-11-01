import { z } from 'zod'

import imgsJson from '@/utils/imgs.json'

export const itemSchema = z.object({
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

const itemFromJson = itemsJsonSchema.parse(imgsJson)

export const mapItemsFromJsonToItemsByCategory = () => ({
    driver: itemFromJson.driver,
    vehicle: [...itemFromJson.vehicle.bikes, ...itemFromJson.vehicle.cars],
    tires: itemFromJson.tires,
    gliders: itemFromJson.gliders,
})

const urls = [
    ...itemFromJson.driver.map((i) => i.url),
    ...itemFromJson.vehicle.bikes.map((i) => i.url),
    ...itemFromJson.vehicle.cars.map((i) => i.url),
    ...itemFromJson.tires.map((i) => i.url),
    ...itemFromJson.gliders.map((i) => i.url),
]

export const preloadImage = (urlList: string[]) => {
    const cache = document.createElement('CACHE')
    cache.setAttribute('style', 'position:absolute;z-index:-1000;opacity:0;width:100%;')

    document.body.appendChild(cache)
    urlList.forEach((url) => {
        const img = new Image()
        img.src = url
        img.setAttribute('style', 'position:absolute;width:50px;height:50px')
        cache.appendChild(img)
    })

    document.body.appendChild(cache)
}

preloadImage(urls)
