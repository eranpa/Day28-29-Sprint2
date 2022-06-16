'use strict'

var gMeme
function createGMeme() {
    gMeme = {
        selectedImgId: -1,
        selectedLineIdx: 0,
        lines: [{
            txt: 'Your text here',
            size: 30,
            align: 'left',
            color: '#ffffff',
            pos: { x: 50, y: 50 }
        },
        {
            txt: 'Your text here',
            size: 30,
            align: 'left',
            color: '#ffffff',
            pos: { x: 50, y: 400 }
        }
        ]
    }
}

var gImgs = [{ id: 1, url: './images/meme-images/1.jpg', keywords: ['trump', 'politics'] },
{ id: 2, url: './images/meme-images/2.jpg', keywords: ['trump', 'politics'] },
{ id: 3, url: './images/meme-images/3.jpg', keywords: ['trump', 'politics'] },
{ id: 4, url: './images/meme-images/4.jpg', keywords: ['trump', 'politics'] },
{ id: 5, url: './images/meme-images/5.jpg', keywords: ['trump', 'politics'] },
{ id: 6, url: './images/meme-images/6.jpg', keywords: ['trump', 'politics'] },
{ id: 7, url: './images/meme-images/7.jpg', keywords: ['trump', 'politics'] },
{ id: 8, url: './images/meme-images/8.jpg', keywords: ['trump', 'politics'] },
{ id: 9, url: './images/meme-images/9.jpg', keywords: ['trump', 'politics'] },
{ id: 10, url: './images/meme-images/10.jpg', keywords: ['trump', 'politics'] },
{ id: 11, url: './images/meme-images/11.jpg', keywords: ['trump', 'politics'] },
{ id: 12, url: './images/meme-images/12.jpg', keywords: ['trump', 'politics'] },
{ id: 13, url: './images/meme-images/13.jpg', keywords: ['trump', 'politics'] },
{ id: 14, url: './images/meme-images/14.jpg', keywords: ['trump', 'politics'] },
{ id: 15, url: './images/meme-images/15.jpg', keywords: ['trump', 'politics'] },
{ id: 16, url: './images/meme-images/16.jpg', keywords: ['trump', 'politics'] },
{ id: 17, url: './images/meme-images/17.jpg', keywords: ['trump', 'politics'] },
{ id: 18, url: './images/meme-images/18.jpg', keywords: ['trump', 'politics'] },]



function setImg(imgId) {
    gMeme.selectedImgId = imgId
    console.log('gMeme.selectedImgId', gMeme.selectedImgId)
}

function getMeme() {
    return gMeme
}

function getImgSrcById(imgId) {
    var img = gImgs.find(img => img.id === imgId)
    return img.url
}

function setLineText(text, lineNum) {
    gMeme.lines[lineNum].text = text
}

function setColor(color = '#ffffff') {
    gMeme.lines[gMeme.selectedLineIdx].color = color
    // console.log('picked color: ', gMeme.lines[gMeme.selectedLineIdx].color)
}

function changeFontSize(val) {
    gMeme.lines[gMeme.selectedLineIdx].size += val
    console.log('font size ', gMeme.lines[gMeme.selectedLineIdx].size)

}

function changeLine(val) {
    var i = gMeme.selectedLineIdx + val
    var n = gMeme.lines.length
    gMeme.selectedLineIdx = (i % n + n) % n
}

function updateLine(ev) { 
    var line =  gMeme.lines[gMeme.selectedLineIdx]
    var text = document.getElementById('item').value
    line.txt = text 
}

// function updateLineText(event) {
//     var line = gMeme.lines[gMeme.selectedLineIdx]
//     var text = document.getElementById('item').value
//     line.txt = text
// }

function changeLinePos(val) { 
    gMeme.lines[gMeme.selectedLineIdx].pos.y += val
  
    // console.log(lineHeight) 
}