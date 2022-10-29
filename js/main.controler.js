'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var elGallery = document.querySelector('.gallery-container')
var elEditor = document.querySelector('.main-container-editor')
var elSearchBar = document.querySelector('.search-bar')
var elMemsSave = document.querySelector('.meme-save')

// gCtx.measureText(txt).width // מחזיר את אורך השורה שהטקסט דורש

var gFocusSticker = false
var gCanvas
var gCtx
var gIsLocalImg = false


function onInit() {
    renderGallery()
    // elSearchBar.style.display = 'flex'
    elEditor.style.display = 'none'
    elMemsSave.style.display = 'none'
    elGallery.style.display = 'grid'
    gCanvas = document.getElementById('meme-canvas')
    gCtx = gCanvas.getContext('2d');
    // gCanvas.width = 500;
    // gCanvas.hight = 500;
}

//? ----------------renders---------------------

function renderGallery() {
    addClassActive('gallery')
    console.log('currMeme', getMeme())
    console.log('gSavesUrl', gSavesUrl)
    elSearchBar.style.display = 'block'
    elEditor.style.display = 'none'
    elMemsSave.style.display = 'none'
    elGallery.style.display = 'grid'

    var images = getImages()

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

    var meme = getNewMeme(imgId, imgUrl)

    clearCanvas()   //? clear the canvas
    // setSelectedImage(imgId, imgUrl) //? update the gMeme selectedImgId
    onRenderStickers()
    addListeners()
    renderCanvas(meme.selectedImgUrl)
    elEditor.style.display = 'flex'
    elGallery.style.display = 'none'
    elSearchBar.style.display = 'none'
    elMemsSave.style.display = 'none'

}

//? ----------------CANVAS---------------------

function renderCanvas(imgUrl) {

    var memeImg = new Image(60, 45);
    memeImg.src = imgUrl;
    memeImg.onload = function () {  // Draw the img on the canvas
        gCanvas.width = this.naturalWidth;
        gCanvas.height = this.naturalHeight;
        var currMeme = getMeme()
        if (!checkIsDrag()) {

            if (currMeme.lines[0]) {
                currMeme.lines[0].pos = { x: gCanvas.width / 2, y: 60 }
            }
            if (currMeme.lines[1]) {
                currMeme.lines[1].pos = { x: gCanvas.width / 2, y: gCanvas.height - 60 }
            }
        }

        gCtx.drawImage(memeImg, 0, 0, gCanvas.width, gCanvas.height);
        drawMeme()

    };
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

//? ----------------input-Text-btns--------------------

function drawText(text, x, y, colorTxt, colorFill, size, font, align, isEdit, isDownload) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = colorTxt
    gCtx.fillStyle = colorFill
    if (!isDownload) {
        if (isEdit) gCtx.strokeRect(size, y - size, gCanvas.width - size * 2, size + 10);
    }

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
    renderCanvas(getMeme().selectedImgUrl) // render all the text
}

function onSizeTxt(val) {
    updateSizeText(val)
    renderCanvas(getMeme().selectedImgUrl) // render all the text
}

function onTxtAlign(align) {
    updateTxtAlign(align)
    renderCanvas(getMeme().selectedImgUrl) // render all the text
}

function onSetFontText(font) {
    updateTxtFont(font)
    renderCanvas(getMeme().selectedImgUrl) // render all the text
}

function onTxtColor(color) {
    document.querySelector('.btn-paint-board').style.backgroundColor = color
    updateTxtColor(color)
    renderCanvas(getMeme().selectedImgUrl) // render all the text
}

function onSwitchLine() {
    updateSwitchLine()
    renderCanvas(getMeme().selectedImgUrl) // render all the text
}

function onAddLine(type, url, id) {
    console.log(type);
    addLine(type, url,id)
    renderCanvas(getMeme().selectedImgUrl) // render all the text
}

function onDeleteLine() {
    deleteLine()
    // drawMeme()
    renderCanvas(getMeme().selectedImgUrl) // render all the text
}

//? ----------------Download--btns--------------------


function onDownloadImg(elLink) {
    setDownloadImg(true, elLink, downloadImg)
    downloadImg(elLink)
}

function downloadImg(elLink) {
    const imgContent = gCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

//? ----------------UploadImg--btns--------------------

function onUploadImg(ev) {
    console.log('ev', ev)
    loadImageFromInput(ev, renderUploadImg)
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = function (event) {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = onImageReady.bind(null, img)
        // Can also do it this way:
        // img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

function renderUploadImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    drawMeme()
}

//? ----------------stickers--------------------


function onRenderStickers() {
    var stickers = getStickers()

    var strHtml = ''
    stickers.forEach(sticker => {
        strHtml += `<img src="${sticker.url}" class="sticker" id="sticker-num-${sticker.id}" onclick="onAddLine(\'${'sticker'}\',\'${sticker.url}\',\'${sticker.id}\')">`
    })
    document.querySelector('.stickers-div').innerHTML = strHtml

}

function drawSticker(url,id, positionX, positionY, size) {
    var elSticker = document.querySelector(`#sticker-num-${id}`)
    console.log(elSticker);
    gCtx.drawImage(elSticker, positionX, positionY,size,size)
}


//? ----------------Save--Meme--------------------
function onSaveMeme() {
    const imgContent = gCanvas.toDataURL('image/jpeg')
    saveImgUrl(imgContent)


    //!update the num on the heder
    var saveCount = getSaveCount()
    var elSaveCount = document.querySelector('.save-count')
    elSaveCount.innerText = saveCount
}

function renderSavesMeme() {
    addClassActive('save')
    elSearchBar.style.display = 'none'
    elEditor.style.display = 'none'
    elGallery.style.display = 'none'
    elMemsSave.style.display = 'grid'

    var memes = loadFromStorage(STORAGE_KEY_SAVE)
    console.log('memes', memes)

    var strHTML = '';
    memes.forEach(meme => {
        strHTML += `
        <img src="${meme.imgSaveUrl}" id="${meme.selectedImgId}" class="img-gallery" onclick="renderMeme('${meme.selectedImgId}','${meme.selectedImgUrl}')" />
        `

    })

    elMemsSave.innerHTML = strHTML
}


//? ----------------------------------------------

function addClassActive(val){
 var  elGallery = document.querySelector('.gallery')
 var elSave =  document.querySelector('.save')

    switch (val) {
        case 'gallery':
            elGallery.classList.add('active');
            elSave.classList.remove('active');
            break;
        case 'save':
            elSave.classList.add('active');
            elGallery.classList.remove('active');
            break;
    }
}

function onShareToWhatsapp(elLink){
    console.log(elLink);
    const imgContent = gCanvas.toDataURL('image/jpeg')
  

    const button = document.getElementById('waButton');
    button.setAttribute('href', 'whatsapp://send?text='+encodeURIComponent(imgContent));
}