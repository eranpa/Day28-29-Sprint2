'use strict'
var gCanvas
var gCtx
var elGalleryContainer
var gElEditor
var gElSaved
var elSavedContainer
var elGallery

function init() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    elGalleryContainer = document.querySelector('.gallery-container')
    elSavedContainer = document.querySelector('.saved-container')
    elGallery = document.querySelector('.gallery')
    gElEditor = document.querySelector('.editor')
    gElSaved = document.querySelector('.saved')
    loadSavedMemes() 
    renderGallery()
    SetGMeme()
    addMouseListeners()
    addTouchListeners()
}

function renderGallery() {
    clearGallery()
    var imgs = getImgs()
    imgs.forEach((image, index) => {
        const img = document.createElement('img')
        img.src = image.url
        img.classList.add('gallery-image')
        img.classList.add(`img${index}`)

        elGalleryContainer.appendChild(img)
        img.addEventListener('click', () => {
            onImgSelect(image.id)
        })
    })

}

function renderMeme(meme = getMeme()) {
 
    var img = new Image()
    img.src = getImgSrcById(meme.selectedImgId)
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        gMeme.lines.forEach((line, index) => {
            drawText(line, gCtx)
            if (gMeme.selectedLineIdx === index) drawLineFrame()
        })
    }
}

function onNewKey(ev) {
    updateLine(ev)
    renderMeme()
}

function drawLineFrame() {
    var line = getCurrLine()
    gCtx.beginPath()
    var textWidth = gCtx.measureText(line.txt).width
    gCtx.rect(line.pos.x - 5, line.pos.y - line.size, textWidth + 10, line.size + 10)
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
}


function drawText(line, ctx) {
    var strFont = `${line.size}px "impact"`
    var text = line.txt
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black'
    ctx.fillStyle = line.color
    ctx.font = strFont
    ctx.fillText(text, line.pos.x, line.pos.y)
    ctx.strokeText(text, line.pos.x, line.pos.y)
}

function onImgSelect(imgId) {
    elGallery.classList.add('hidden')
    gElEditor.classList.remove('hidden')
    setImg(imgId)
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

function onChangeLine(val) {
    changeLine(val)
    document.getElementById('item').value = ''
    renderMeme()
}


function onMoveLine(val) {
    changeLinePos(val)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onRemoveLine() {
    deleteLine()
    renderMeme()
}

function onNextPage() {
    nextPage()
    renderGallery()
}


function clearGallery() {
    while (elGalleryContainer.firstChild) {
        elGalleryContainer.removeChild(elGalleryContainer.firstChild)
    }
}
function clearSavedHtml() {
    while (elSavedContainer.firstChild) {
        elSavedContainer.removeChild(elSavedContainer.firstChild)
    }
}
function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}


function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    const line = getCurrLine()
    if (gMeme.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos

        renderMeme()
    }
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function onSaveMeme() {
    saveMeme()
}


function onSaved() {

    elGallery.classList.add('hidden')
    gElEditor.classList.add('hidden')
    gElSaved.classList.remove('hidden')
    renderSavedMemes()

}

function renderSavedMemes() {
    clearSavedHtml()
    var memes = getMemes()

    console.log('inside render', memes)
    memes.forEach((meme, index) => {
        const localCanvas = document.createElement('canvas')
        
        localCanvas.height = 500
        localCanvas.width = 500
        localCanvas.id = 'memeCanvas'
        var elMemeCanvas = document.querySelector('#memeCanvas')
        var elMemeCtx = localCanvas.getContext('2d')
        var img = new Image()
        img.src = getImgSrcById(meme.selectedImgId)
        img.onload = () => {
       
        elMemeCtx.drawImage(img, 0, 0, elMemeCanvas.width, elMemeCanvas.height)
       
        meme.lines.forEach((line) => {
            drawText(line, elMemeCtx)
        })
    }
        elSavedContainer.appendChild(localCanvas)

        localCanvas.addEventListener('click', () => {
            onMemeSelect(gMemes[index])
        })
    })

}


function onGallery(){
    SetGMeme()
    document.getElementById('item').value = ''
    elGallery.classList.remove('hidden')
    gElEditor.classList.add('hidden')
    gElSaved.classList.add('hidden')
   clearShareMsg()
}

function onClear(){
    console.log('clear')
    clearSaved()

}

function clearSaved(){ 
    localStorage.clear()
    gMemes = []
    renderSavedMemes()
}

function onMemeSelect(meme) { 
    
    elGallery.classList.add('hidden')
    gElSaved.classList.add('hidden')
    gElEditor.classList.remove('hidden')
    gMeme = meme
    renderMeme(meme)
    }

function clearShareMsg(){
    document.querySelector('.user-msg').innerText = ''
    
    document.querySelector('.share-container').innerHTML = ''
   
}