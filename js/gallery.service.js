'use strict'
const STORAGE_KEY = 'Images'
const gGenre = ['funny', 'funny', 'funny']

var gImgs = []

_createImages()

function getImages() {
    return gImgs
}

function _createImages() {
    var Images = loadFromStorage(STORAGE_KEY)

    if (!Images || !Images.length) {
        Images = []
        for (let i = 0; i < 20; i++) {
            var genre = gGenre[i]
            var img = gImages[i]
            Images.push(_createImage(img))
        }
    }
    gImgs = Images
    _saveMemeToStorage()
}

function _createImage(img) {
    return {
        id: generateId(5),
        url: img,
        keywords: ['funny']
    }
}

function getImageById(imageId) {
    const image = gImgs.find(image => imageId === image.id)
    console.log(image);
    return image
}

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gImgs)
}
