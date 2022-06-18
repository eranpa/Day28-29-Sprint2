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
    renderGallery()
    createGMeme()
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

function renderMeme() {
    var meme = getMeme()
    var img = new Image()

    img.src = getImgSrcById(meme.selectedImgId)
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        gMeme.lines.forEach((line, index) => {
            drawText(line)
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


function drawText(line) {
    var strFont = `${line.size}px "impact"`
    var text = line.txt
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.font = strFont
    gCtx.fillText(text, line.pos.x, line.pos.y)
    gCtx.strokeText(text, line.pos.x, line.pos.y)
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

    var memes = getMemes()
    console.log(memes)
    memes.forEach((meme, index) => {
        const localCanvas = document.createElement('canvas')
        localCanvas.id = 'memeCanvas'
        localCanvas.height = 200
        localCanvas.width = 200
        localCanvas.classList.add('meme-canvas')
        localCanvas.classList.add(`meme${index}`)
        var elMemeCanvas = document.querySelector('meme-canvas')
        var elMemeCtx =  localCanvas.getContext('2d')
        
        var img = new Image()
        img.src = getImgSrcById(meme.selectedImgId)
        img.onload = () => {
        elMemeCtx.drawImage(img, 0, 0, elMemeCanvas.width, elMemeCanvas.height)
        meme.lines.forEach((line, index) => {
            drawText(line)
            // if (meme.selectedLineIdx === index) drawLineFrame()
        })
    }
        elSavedContainer.appendChild(canvas)

        img.addEventListener('click', () => {
            onMemeSelect(canvas.id)
        })
    })

}


function onGallery(){
    elGallery.classList.remove('hidden')
    gElEditor.classList.add('hidden')
    gElSaved.classList.add('hidden')
}