'use strict'

var elGallery = document.querySelector('.gallery-container')
var elEditor = document.querySelector('.main-container-editor')
var elSearchBar = document.querySelector('.search-bar')

// gCtx.measureText(txt).width // מחזיר את אורך השורה שהטקסט דורש


var gCanvas
var gCtx
var gIsLocalImg = false


function onInit() {
    renderGallery()
    elEditor.style.display = 'none'
    elGallery.style.display = 'grid'
    gCanvas = document.getElementById('meme-canvas')
    gCtx = gCanvas.getContext('2d');
    // gCanvas.width = 500;
    // gCanvas.hight = 500;
    console.log(gMeme);
}



function renderGallery() {



    var images = getImages()
    console.log(images);

    var strHTML = '';
    images.forEach(img => {
        strHTML += `
        <img src="${img.url}" id="${img.id}" class="img-gallery" onclick="renderMeme('${img.id}','${img.url}')" />
        `
    })
    elGallery.innerHTML = strHTML
}

function renderMeme(imgId, imgUrl) {
    document.querySelector('.canvas-container').style.display = 'block'
    clearCanvas()   //? clear the canvas
    setSelectedImage(imgId) //? update the gMeme selectedImgId
    renderImg(imgUrl)
    elEditor.style.display = 'flex'
    elGallery.style.display = 'none'
    elSearchBar.style.display = 'none'
}

//? ----------------CANVAS---------------------

function renderImg(imgUrl) {
    var memeImg = new Image(60, 45);
    console.log(memeImg);
    memeImg.src = imgUrl;
    // Draw the img on the canvas
    memeImg.onload = function () {
        gCanvas.width = this.naturalWidth;
        gCanvas.height = this.naturalHeight;
        // gCtx.drawImage(this, 0, 0)
       var currMeme = getMeme()
       currMeme.lines[0].pos =   { x:  gCanvas.width / 2, y:  60 },
        gCtx.drawImage(memeImg, 0, 0, gCanvas.width, gCanvas.height);
        updateMeme()
        
    };
}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function drawText(text, x, y, colorTxt, colorFill,size,font, align) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = colorTxt
    gCtx.fillStyle = colorFill
gCtx.textAlign  = align
    gCtx.font = size+'px' +' '+ font
    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}