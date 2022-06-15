'use strict'

var gMeme = {}

var gImgs = [{ id: 1, url: '/images/meme-images/1.jpg', keywords: ['trump', 'politics'] },
{ id: 2, url: '/images/meme-images/2.jpg', keywords: ['trump', 'politics'] },
{ id: 3, url: '/images/meme-images/3.jpg', keywords: ['trump', 'politics'] },
{ id: 4, url: '/images/meme-images/4.jpg', keywords: ['trump', 'politics'] },
{ id: 5, url: '/images/meme-images/5.jpg', keywords: ['trump', 'politics'] },
{ id: 6, url: '/images/meme-images/6.jpg', keywords: ['trump', 'politics'] },
{ id: 7, url: '/images/meme-images/7.jpg', keywords: ['trump', 'politics'] },
{ id: 8, url: '/images/meme-images/8.jpg', keywords: ['trump', 'politics'] },
{ id: 9, url: '/images/meme-images/9.jpg', keywords: ['trump', 'politics'] },
{ id: 10, url: '/images/meme-images/10.jpg', keywords: ['trump', 'politics'] },
{ id: 11, url: '/images/meme-images/11.jpg', keywords: ['trump', 'politics'] },
{ id: 12, url: '/images/meme-images/12.jpg', keywords: ['trump', 'politics'] },
{ id: 13, url: '/images/meme-images/13.jpg', keywords: ['trump', 'politics'] },
{ id: 14, url: '/images/meme-images/14.jpg', keywords: ['trump', 'politics'] },
{ id: 15, url: '/images/meme-images/15.jpg', keywords: ['trump', 'politics'] },
{ id: 16, url: '/images/meme-images/16.jpg', keywords: ['trump', 'politics'] },
{ id: 17, url: '/images/meme-images/17.jpg', keywords: ['trump', 'politics'] },
{ id: 18, url: '/images/meme-images/18.jpg', keywords: ['trump', 'politics'] },]



function setImg(imgId){
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