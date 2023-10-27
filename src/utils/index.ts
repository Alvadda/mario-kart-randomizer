export const shuffle = ([...arr]) => {
    let m = arr.length
    while (m) {
        const i = Math.floor(Math.random() * m--)
        ;[arr[m], arr[i]] = [arr[i], arr[m]]
    }
    return arr
}

export const getRandomNumberBetween = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min)

export const wait = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration))

export const removeElementAt = <T>(array: Array<T>, index: number) => {
    const newArray = [...array]

    newArray.splice(index, 1)
    return newArray
}
