'use strict'


function updateLine(ev) {
    var line = gMeme.lines[gMeme.selectedLineIdx]
    var text = document.getElementById('item').value
    line.txt = text
}


function changeLinePos(val) {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += val

}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function addLine(content = 'Your text here', position = { x: gCanvas.width / 10, y: gCanvas.height / 2 }) {

    var newLine = createLine(content, position)
    var NewLIneIdx = gMeme.lines.push(newLine) - 1
    setSelectedLineIdx(NewLIneIdx)
}

function createLine (content = 'Your text here', position = { x: gCanvas.width / 10, y: gCanvas.height / 2 }){
    return  {
        txt: content,
        size: 30,
        align: 'left',
        color: '#ffffff',
        pos: position
    }
}

function setSelectedLineIdx(idx) {
    gMeme.selectedLineIdx = idx
}

function getCurrLineIdx() {
    return gMeme.selectedLineIdx
}

function deleteLine() {
    var lineIdx = getCurrLineIdx()
    gMeme.lines.splice(lineIdx, 1)
    setSelectedLineIdx(gMeme.lines.length - 1)
}

function addSticker(sticker){
    addLine(sticker)
    renderMeme()
}