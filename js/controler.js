'use strict'
var gCanvas
var gCtx
var gElGallery


function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    // renderMeme('no no no')
    gElGallery = document.querySelector('.gallery-container')
    renderGallery()
    createGMeme()
}

function renderGallery(){
    gImgs.forEach(image => { 
        const img = document.createElement('img')
        img.src = image.url
        img.classList.add('gallery-image')
        gElGallery.appendChild(img)
        img.addEventListener('click', () =>{
            onImgSelect(image.id)
            // console.log(image.id)
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
            
    }
}

function onNewKey(ev){
    updateLine(ev)
    // var line =  gMeme.lines[gMeme.selectedLineIdx]
    // var text = document.getElementById('item').value
    // line.txt = text 
    renderMeme()
    // drawText(gMeme.lines[0].txt)
}

function drawLineFrame() {
    gCtx.beginPath();
    gCtx.rect(47, 20, 400, 40);
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
}

function drawText(line) {
    var strFont = `${line.size}px impact`
    var text = line.txt
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.font = strFont 
    gCtx.fillText(text, line.pos.x, line.pos.y);//Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, line.pos.x, line.pos.y);//Draws (strokes) a given text at the given (x, y) position
}

function onImgSelect(imgId){
    gElGallery.classList.add('hidden')
    setImg(imgId)
    // renderEditor()
     renderMeme()
}

function OnChangeFontSize(val){
    changeFontSize(val)
    renderMeme()
}

function onSetColor(color) { 
    setColor(color)
    renderMeme()
}

function OnChangeLine (val){
    changeLine(val)
}