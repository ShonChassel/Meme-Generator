'use strict'

var gSavesUrl = []
const STORAGE_KEY_SAVE = 'savesMeme'

var gSaveCount = 0

function saveImgUrl(imgContent) {
    gSaveCount += 1
    var currMeme = getMeme()
    currMeme.imgSaveUrl = imgContent
    currMeme.selectedImgId = generateId(5)
    gSavesUrl.push(currMeme)
    console.log('currMeme',getMeme() )
    console.log('gSavesUrl',gSavesUrl )
    saveToStorage(STORAGE_KEY_SAVE, gSavesUrl)
    saveToStorage(currMeme.selectedImgId, currMeme)
}

function getSaveCount(){
    return gSaveCount
}