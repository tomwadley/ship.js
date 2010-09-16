
function initUserInput() {
    document.onkeydown = keyDownHandler;
    document.onkeyup = keyUpHandler;
}

function keyDownHandler(event) {
    setInputVar(event.keyCode, true);
}

function keyUpHandler (event) {
    setInputVar(event.keyCode, false);
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

