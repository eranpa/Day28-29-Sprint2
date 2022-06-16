'use strict'
var gCanvas
var gCtx
var gElGallery
var gElEditor


function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    // renderMeme('no no no')
    gElGallery = document.querySelector('.gallery-container')
    gElEditor = document.querySelector('.editor')
    renderGallery()
    createGMeme()
}

function renderGallery() {
    gImgs.forEach(image => {
        const img = document.createElement('img')
        img.src = image.url
        img.classList.add('gallery-image')
        gElGallery.appendChild(img)
        img.addEventListener('click', () => {
            onImgSelect(image.id)
        })
    })

}

function renderMeme() {
    var meme = getMeme()
    var img = new Image();//create a new html img element
    var srcStr =
        img.src = getImgSrcById(meme.selectedImgId)
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        gMeme.lines.forEach(line => {
            drawText(line)
        })
        drawLineFrame()
    }
}

function onNewKey(ev) {
    updateLine(ev)
    renderMeme()
}

function drawLineFrame() {
    var line = getCurrLine()
    gCtx.beginPath();
    gCtx.rect(line.pos.x - 5, line.pos.y - line.size, 400, line.size + 10);
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
}


function drawText(line) {
    var strFont = `${line.size}px "impact"`
    var text = line.txt
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.font = strFont
    gCtx.fillText(text, line.pos.x, line.pos.y);//Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, line.pos.x, line.pos.y);//Draws (strokes) a given text at the given (x, y) position
}

function onImgSelect(imgId) {
    gElGallery.classList.add('hidden')
    gElEditor.classList.remove('hidden')
    setImg(imgId)
    // renderEditor()

    renderMeme()

}

function OnChangeFontSize(val) {
    changeFontSize(val)
    renderMeme()
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function OnChangeLine(val) {
    changeLine(val)
    //  document.getElementById('item').value = gMeme.lines[gMeme.selectedLineIdx].txt
    document.getElementById('item').value = ''
    renderMeme()
}


function OnMoveLine(val) {
    changeLinePos(val)
    renderMeme()
}