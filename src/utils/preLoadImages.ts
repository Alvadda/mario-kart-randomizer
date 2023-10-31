export function preloadImage(urlList: string[]) {
    urlList.forEach((url) => {
        const img = new Image()
        img.src = url
    })
}
