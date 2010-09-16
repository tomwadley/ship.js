
function initUserInput(canvas) {
    document.onkeydown = keyDownHandler;
    document.onkeyup = keyUpHandler;
    
    canvas.addEventListener("mousedown", mouseDownHandler, false);
    canvas.addEventListener("mouseup", mouseUpHandler, false);
    canvas.addEventListener("mousemove", mouseMoveHandler, false);
}

function keyDownHandler(event) {
    setInputVar(event.keyCode, true);
}

function keyUpHandler(event) {
    setInputVar(event.keyCode, false);
}

function mouseDownHandler(event) {
    globalData.inputGo = true;
    globalData.inputGoX = event.offsetX;
    globalData.inputGoY = event.offsetY;
}

function mouseUpHandler(event) {
    globalData.inputGo = false;
}

function mouseMoveHandler(event) {
    globalData.inputGoX = event.offsetX;
    globalData.inputGoY = event.offsetY;
}

function setInputVar (keyCode, state) {
    switch (keyCode) {
        case 37: // Left key
            globalData.inputLeft = state;
            break;
        case 38: // Up key
            globalData.inputUp = state;
            break;
        case 39: // Right key
            globalData.inputRight = state;
            break;
        case 40: // Down key
            globalData.inputDown = state;
            break;
        case 17: // Left Ctrl
            globalData.inputShoot = state;
            break;
        default:
            break;
    }
}

