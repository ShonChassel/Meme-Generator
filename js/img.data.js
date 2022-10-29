'use strict'

function crateImages() {
    var gNewImg = []
    for (let i = 1; i < 29; i++) {
        let img = `css/img/${i}.jpg`
        gNewImg.push(img)
    }
    return gNewImg

}