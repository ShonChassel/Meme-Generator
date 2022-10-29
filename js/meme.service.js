'use strict'
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gSavesMemes


var gMeme

var gStickers = [{
    id:'1',
    url: 'css/imugi/1.png',
    isDragging: false,
    height: 85,
    width: 85,
    type: 'sticker',
    txt: '',
    size: 40,
    align: 'center',
    colorTxt: '',
    font: '',
    colorFill: '',
    pos: { x: 100, y: 100 },
    borderY: 10,
    isEdit: false,
    isDrag: false,
    isDownload: false
},
{
    id:'2',
    url: 'css/imugi/2.png',
    isDragging: false,
    height: 85,
    width: 85,
    type: 'sticker',
    txt: '',
    size: 40,
    align: 'center',
    colorTxt: '',
    font: '',
    colorFill: '',
    pos: { x: 100, y: 100 },
    borderY: 10,
    isEdit: false,
    isDrag: false,
    isDownload: false
},
{
    id:'3',
    url: 'css/imugi/3.png',
    isDragging: false,
    height: 85,
    width: 85,
    type: 'sticker',
    txt: '',
    size: 40,
    align: 'center',
    colorTxt: '',
    font: '',
    colorFill: '',
    pos: { x: 100, y: 100 },
    borderY: 10,
    isEdit: false,
    isDrag: false,
    isDownload: false
},
{
    id:'4',
    url: 'css/imugi/4.png',
    isDragging: false,
    height: 85,
    width: 85,
    type: 'sticker',
    txt: '',
    size: 40,
    align: 'center',
    colorTxt: '',
    font: '',
    colorFill: '',
    pos: { x: 100, y: 100 },
    borderY: 10,
    isEdit: false,
    isDrag: false,
    isDownload: false
},

]

function getStickers() {
    return gStickers
}

function getMeme() {
    return gMeme

}

function getNewMeme(imgId, imgUrl) {
    var meme = loadFromStorage(imgId)

    if (!meme || !meme.length) {
        var newMeme = createMeme(imgId, imgUrl)
        saveToStorage(imgId, newMeme)
        gMeme = newMeme
        console.log(gMeme);
        return newMeme
    } else {
        gMeme = meme
        console.log(gMeme);
        return meme
    }
}

function createMeme(imgId, imgUrl) {
    return {
        selectedImgId: imgId,
        selectedImgUrl: imgUrl,
        selectedStickerIdx: 0,
        imgSaveUrl: '',
        lines: [
            {
                type: 'txt',
                txt: 'Im always eat Falafel',
                size: 40,
                align: 'center',
                colorTxt: '#4b2a85e0',
                font: 'Arial',
                colorFill: 'white',
                pos: { x: 361, y: 68 },
                borderY: 10,
                isEdit: false,
                isDrag: false,
                isDownload: false,
                url: ''
            },

            {
                type: 'txt',
                txt: 'I love me',
                size: 40,
                align: 'center',
                colorTxt: '#4b2a85e0',
                font: 'Arial',
                colorFill: 'white',
                pos: { x: 335, y: 393 },
                borderY: 10,
                isEdit: true,
                isDrag: false,
                isDownload: false,
                url: ''
            },
        ]
    };

}

function getCurrLineIdx() {
    return gMeme.lines.findIndex((line) => { return line.isEdit })
}

function drawMeme() {
    
    gMeme.lines.forEach(line => {
        if (line.type === 'txt') {
            drawText(line.txt, line.pos.x, line.pos.y, line.colorTxt, line.colorFill, line.size, line.font, line.align, line.isEdit, line.isDownload)
            return
        } else if (line.type === 'sticker') {
            drawSticker(line.url,line.id, line.pos.x, line.pos.y, line.size)
            return
        }

    })
}

function setInputText() {
    let txt = gMeme.lines[getCurrLineIdx()].txt
    inputText(txt)
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function setSelectedImage(imgId, imgUrl) {
    console.log(gMeme);
    gMeme.selectedImgId = +imgId;
    gMeme.selectedImgUrl = imgUrl;
    console.log(gMeme);

}

function updateTextMeme(txt) {
    console.log('txt', txt)
    var currLineIdx = getCurrLineIdx()
    console.log('currLineIdx', currLineIdx)
    gMeme.lines[currLineIdx].txt = txt
    inputText(txt)


}

function updateSizeText(val) {
    var currLineIdx = getCurrLineIdx()
    if (val === '+') {
        gMeme.lines[currLineIdx].size += 10
    } else {
        gMeme.lines[currLineIdx].size -= 10
    }
}

function updateTxtAlign(align) {
    var currLineIdx = getCurrLineIdx()
    gMeme.lines[currLineIdx].align = align
}

function updateTxtColor(color) {
    var currLineIdx = getCurrLineIdx()
    gMeme.lines[currLineIdx].colorTxt = color
}

function updateTxtFont(font) {
    var currLineIdx = getCurrLineIdx()
    gMeme.lines[currLineIdx].font = font
}

function updateSwitchLine() {
    var currLineIdx = getCurrLineIdx()
    gMeme.lines[currLineIdx].isEdit = false
    var nextIdx = !gMeme.lines[currLineIdx + 1] ? 0 : currLineIdx + 1
    gMeme.lines[nextIdx].isEdit = true
}

function addLine(type, url, id) {
    var newLine = {
        type: type,
        txt: '',
        url: url,
        id:id,
        size: 85,
        align: 'center',
        colorTxt: '#4b2a85e0',
        font: 'Arial',
        colorFill: 'white',
        pos: { x: gCanvas.width / 2, y: gCanvas.height / 2 },
        borderY: 10,
        isEdit: true,
        isDrag: false
    }


    var currLineIdx = getCurrLineIdx()
    if (gMeme.lines[currLineIdx]) {
        gMeme.lines[currLineIdx].isEdit = false

    }
    gMeme.lines.push(newLine)
}

function deleteLine() {
    var currLineIdx = getCurrLineIdx()
    console.log('currLineIdx', currLineIdx)
    gMeme.lines.splice(currLineIdx, 1)
    if (gMeme.lines[currLineIdx - 1]) {
        gMeme.lines[currLineIdx - 1].isEdit = true

    }
}

// ?--------------------------for drag and drop--------------------

function setMemeDrag(isDrag) {
    var currLineIdx = getCurrLineIdx()
    gMeme.lines[currLineIdx].isDrag = isDrag
}

function isMemeClicked(clickedPos) {
    var currLineIdx = getCurrLineIdx()
    console.log(currLineIdx);
    var memePos = gMeme.lines[currLineIdx].pos
    console.log(memePos);
    // Calc the distance between two dots
    const distance = Math.sqrt((memePos.x - clickedPos.x) ** 2 + (memePos.y - clickedPos.y) ** 2)
    console.log(distance);
    console.log(distance <= gMeme.lines[currLineIdx].size);
    //If its smaller then the radius of the circle we are inside
    return true
    return distance <= gMeme.lines[currLineIdx].size
}

function moveMeneLine(dx, dy) {
    var currLineIdx = getCurrLineIdx()
    console.log(gMeme.lines[currLineIdx].pos);
    gMeme.lines[currLineIdx].pos.x += dx
    gMeme.lines[currLineIdx].pos.y += dy
    console.log(gMeme.lines[currLineIdx].pos);
}

function checkIsDrag() {
    return gMeme.lines.filter(line => {
        if (line.isDrag) return true
    })
}


//? ---------------------------imugy-------------------------------------

function createNewLine(img) {
    var newline = {
        src: img,
        size: 40,
        pos: { x: 335, y: 393 },
        isEdit: true,
        isDrag: false
    }
    gMeme.lines.push(newline)
    console.log(gMeme.lines);
}

//? ---------------------------download img-------------------------------------

function setDownloadImg() {
    var currLineIdx = getCurrLineIdx()
    gMeme.lines[currLineIdx].isDownload = true
    renderCanvas(getMeme().selectedImgUrl) // render all the text


}

//? ---------------------------Stickers-------------------------------------

function switchStickers(id) {
    var focusSticker = gMeme.stickers.findIndex(sticker => sticker.id === id)
    gMeme.selectedStickerIdx = focusSticker
}

function switchStickersDragDrop(idx) {
    gMeme.selectedStickerIdx = idx
}

// function addSticker(sticker) {
//     gMeme.stickers.push(sticker)
//     gMeme.selectedStickerIdx = gMeme.stickers.length - 1
// }

