const path = require('path')
const fs = require('fs')
const nanoid = require('nanoid')

const BIKE_FOLDER = __dirname + '/../public/img/bikes'
const CARS_FOLDER = __dirname + '/../public/img/cars'
const DRIVER_FOLDER = __dirname + '/../public/img/drivers'
const GLIDERS_FOLDER = __dirname + '/../public/img/gliders'
const TIRES_FOLDER = __dirname + '/../public/img//tires'

const IMG_TARGET_PATH = __dirname + '/../src/utils/imgs.json'
const ABSOLUTE_IMG_PATH = __dirname + '/../public'

const addImgs = (directory) => {
    return fs.readdirSync(directory).map((img) => ({
        id: nanoid.nanoid(),
        url: '/' + path.relative(ABSOLUTE_IMG_PATH, path.join(directory, img)),
    }))
}
const imgs = {
    driver: addImgs(DRIVER_FOLDER),
    tires: addImgs(TIRES_FOLDER),
    gliders: addImgs(GLIDERS_FOLDER),
    vehicle: {
        cars: addImgs(CARS_FOLDER),
        bikes: addImgs(BIKE_FOLDER),
    },
}

fs.writeFileSync(IMG_TARGET_PATH, JSON.stringify(imgs))

console.log('Successfully generated img paths 🎉')
