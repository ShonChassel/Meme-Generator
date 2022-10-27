'use strict'
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gSavesMemes 


var gMeme = {
    selectedImgId: 1,
    selectedImgUrl: '',
    lines: [
        {
            txt: 'Im always eat Falafel',
            size: 40,
            align: 'center',
            colorTxt: 'red',
            font: 'Arial',
            colorFill: 'black',
            pos: { x: 400 / 2, y: 60 },
            borderY: 10,
            isEdit: false,
            isDrag: false,
        },

        {
            txt: 'I love me',
            size: 40,
            align: 'center',
            colorTxt: 'red',
            font: 'Arial',
            colorFill: 'black',
            pos: { x: 400 / 2, y: 60 },
            borderY: 10,
            isEdit: true,
            isDrag: false
        },
    ]
};

function getMeme() {
    return gMeme
}

function getCurrLineIdx() {
    return gMeme.lines.findIndex((line) => { return line.isEdit })
}

function drawMeme() {

    gMeme.lines.forEach(line => {
        drawText(line.txt, line.pos.x, line.pos.y, line.colorTxt, line.colorFill, line.size, line.font, line.align, line.isEdit)

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

    gMeme.selectedImgId = +imgId;
    gMeme.selectedImgUrl = imgUrl;

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

function addLine() {
    var newLine = {
        txt: '',
        size: 40,
        align: 'center',
        colorTxt: 'blue',
        font: 'Arial',
        colorFill: 'black',
        pos: { x: gCanvas.width / 2, y: gCanvas.height / 2 },
        borderY: 10,
        isEdit: true,
        isDrag: false
    }
    var currLineIdx = getCurrLineIdx()
    if( gMeme.lines[currLineIdx]){
        gMeme.lines[currLineIdx].isEdit = false

    }
    gMeme.lines.push(newLine)
}

function deleteLine(){
    var currLineIdx = getCurrLineIdx()
    console.log('currLineIdx',currLineIdx )
    gMeme.lines.splice(currLineIdx,1)
    if(gMeme.lines[currLineIdx -1]){
        gMeme.lines[currLineIdx -1].isEdit = true

    }
}
