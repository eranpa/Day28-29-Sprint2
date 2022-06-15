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
        drawLineFrame()
        
        // drawText(meme.lines[0].text)
        drawText()
    }
}


function drawLineFrame() {
    gCtx.beginPath();
    gCtx.rect(47, 20, 400, 40);
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
}

function drawText(text = 'this is some default text') {
    
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.font = '40px impact';
    gCtx.fillText(text, 50, 50);//Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, 50, 50);//Draws (strokes) a given text at the given (x, y) position
}

function onImgSelect(imgId){
    gElGallery.classList.add('hidden')
    setImg(imgId)
    // renderEditor()
     renderMeme()


}