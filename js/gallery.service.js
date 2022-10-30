'use strict'
const STORAGE_KEY = 'Images'
const gGenre = ['funny', 'funny', 'funny']

var gKeywordSearchCountMap = { 'funny': 20, 'trump': 35, 'baby': 12,}

var gImgs = getImgs()

var gFilterBy = {
    txt: '',
}

function getImages() {
    var imgs = gImgs
    _saveMemeToStorage()

    if (gFilterBy.txt) {
        return imgs.filter(img => img.keywords.some(word => word.toLowerCase().includes(gFilterBy.txt.toLowerCase())))

    } else {
        return imgs
    }

}

//!-----------not in use now
function _createImages() {
    var Images = loadFromStorage(STORAGE_KEY)

    if (!Images || !Images.length) {
        Images = []
        for (let i = 0; i < 28; i++) {
            var genre = gGenre[i]
            var img = crateImages()[i]
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
//!-------------------------

function getImageById(imageId) {
    const image = gImgs.find(image => imageId === image.id)
    console.log(image);
    return image
}

//!-------------------------
function setFilterByTxt(txt) {
    gFilterBy.txt = txt
}

function updateSizeWord(key, size) {
    console.log('key, size',key, size);

    console.log( gKeywordSearchCountMap[key]);
    gKeywordSearchCountMap[key] += size
    console.log( gKeywordSearchCountMap);
}

function getKeywordSearchCount() {
    return gKeywordSearchCountMap
}

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gImgs)
}
