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
    // var elSettings = document.querySelector('.canvas-container')
    // elSettings.style.display = 'block'

    const canvas = document.getElementById("meme-canvas");
    const ctx = canvas.getContext("2d");

    var image = getImageById(imageId)
    console.log(image);

    var strHTML = `
    <img src="${image.url}" id="${image.id}" class="img-gallery-settings" />
        `
    image.addEventListener("load", (e) => {
        ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
    });

    elSettings.innerHTML = strHTML
}