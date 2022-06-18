'use strict'

function getEvPos(ev) {
    //Gets the offset pos , the default pos
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // Check if its a touch ev
    if (gTouchEvs.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}
function setLineDrag(isDrag) {
    gMeme.isDrag = isDrag
}

//Check if the click is inside the circle 
function isLineClicked(clickedPos) {
    const line = getCurrLine()
    const { pos } = line
    return (
        (clickedPos.x >= line.pos.x && clickedPos.x <= line.pos.x + gCtx.measureText(line.txt).width) &&
        (clickedPos.y <= line.pos.y && clickedPos.y >= line.pos.y - line.size)
    )
}

//Move the circle in a delta, diff from the pervious pos
function moveLine(dx, dy) {
    const line = getCurrLine()
    line.pos.x += dx
    line.pos.y += dy
}
