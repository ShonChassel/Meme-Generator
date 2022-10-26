'use strict'
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
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
            isDrag: false
        },
    ],
};
 function getMeme(){
    return gMeme
 }

function updateMeme() {
    drawText(gMeme.lines[0].txt, gMeme.lines[0].pos.x, gMeme.lines[0].pos.y, gMeme.lines[0].colorTxt, gMeme.lines[0].colorFill, gMeme.lines[0].size, gMeme.lines[0].font,gMeme.lines[0].align)

}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function setSelectedImage(imgId) {
    console.log(imgId);
    gMeme.selectedImgId = +imgId;
    console.log('gMeme', gMeme)
}
