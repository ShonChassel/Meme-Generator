'use strict'
const STORAGE_KEY = 'Images'
const gGenre = ['funny', 'funny', 'funny']

var gImgs = []


var gImg1 = `css/img/1.jpg`
var gImg2 = `css/img/2.jpg`
var gImg3 = `css/img/3.jpg`
var gImg4 = `css/img/4.jpg`
var gImg5 = `css/img/5.jpg`
var gImg6 = `css/img/6.jpg`
var gImg7 = `css/img/7.jpg`
var gImg8 = `css/img/8.jpg`
var gImg9 = `css/img/9.jpg`
var gImg10 = `css/img/10.jpg`
const gImages = [gImg1, gImg2, gImg3, gImg4, gImg5, gImg6, gImg7, gImg8, gImg9, gImg10]


_createImages()

function getImages() {
    return gImgs
}

function _createImages() {
    var Images = loadFromStorage(STORAGE_KEY)

    if (!Images || !Images.length) {
        Images = []
        for (let i = 0; i < 10; i++) {
            var genre = gGenre[i]
            var img = gImages[i]
            Images.push(_createImage(img))
        }
    }
    gImgs = Images
    console.log('gImages', gImgs)
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
