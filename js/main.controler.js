'use strict'

function onInit() {
    renderImgs()
}


function renderImgs() {
    var elMain = document.querySelector('.images-container')

    var images = getImages()
    console.log(images);

    var strHTML = '';
    images.forEach(image => {
        strHTML += `
        <img src="${image.url}" id="${image.id}" class="img-gallery" onclick="renderImg('${image.id}')" />
        `
    })
    elMain.innerHTML = strHTML
}


function renderImg(imageId) {
    var elMain = document.querySelector('.images-container')
    elMain.style.display = 'none'
    var elSettings = document.querySelector('.settings-container')
    elSettings.style.display = 'grid'

    var image = getBookById(imageId)
    console.log(image);

    var  strHTML = `
    <img src="${image.url}" id="${image.id}" class="img-gallery-settings" />
        `
   
    elSettings.innerHTML = strHTML
}