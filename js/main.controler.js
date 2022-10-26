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
    setSelectedImage(imgId, imgUrl) //? update the gMeme selectedImgId
    renderImg(imgUrl)
    elEditor.style.display = 'flex'
    elGallery.style.display = 'none'
    elSearchBar.style.display = 'none'
}

//? ----------------CANVAS---------------------

function renderImg(imgUrl) {
    var memeImg = new Image(60, 45);
    memeImg.src = imgUrl;

    memeImg.onload = function () {  // Draw the img on the canvas
        gCanvas.width = this.naturalWidth;
        gCanvas.height = this.naturalHeight;
        var currMeme = getMeme()
        currMeme.lines[0].pos = { x: gCanvas.width / 2, y: 60 },
            currMeme.lines[1].pos = { x: gCanvas.width / 2, y: gCanvas.height - 60 },
            gCtx.drawImage(memeImg, 0, 0, gCanvas.width, gCanvas.height);
        drawMeme()
    };
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}



//? ----------------input-Text---------------------

function drawText(text, x, y, colorTxt, colorFill, size, font, align ,isEdit) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = colorTxt
    gCtx.fillStyle = colorFill
    if(isEdit) gCtx.strokeRect(size ,y - size, gCanvas.width - size * 2, size + 10);
    
    gCtx.textAlign = align
    gCtx.font = size + 'px' + ' ' + font
    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
    setInputText()
}

function inputText(txt) {
    document.getElementById('text').value = txt
}

function onChangeText(txt) {
    updateTextMeme(txt)
    renderImg(getMeme().selectedImgUrl) // render all the text
}

function onSizeTxt(val) {
    updateSizeText(val)
    renderImg(getMeme().selectedImgUrl) // render all the text
}

function onTxtAlign(align){
updateTxtAlign(align)
renderImg(getMeme().selectedImgUrl) // render all the text
}

function onSetFontText(font){
updateTxtFont(font)
renderImg(getMeme().selectedImgUrl) // render all the text
}

function onTxtColor(color){
    document.querySelector('.btn-paint-board').style.backgroundColor = color
updateTxtColor(color)
renderImg(getMeme().selectedImgUrl) // render all the text
}

function onSwitchLine(){
    updateSwitchLine()
    renderImg(getMeme().selectedImgUrl) // render all the text
}

function onAddLine(){
    addLine()
    renderImg(getMeme().selectedImgUrl) // render all the text
}

function onDeleteLine(){
    deleteLine()
    // drawMeme()
    // renderImg(getMeme().selectedImgUrl) // render all the text
}