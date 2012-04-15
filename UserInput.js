/*
 * Copyright (c) 2012 Tom Wadley, http://tomwadley.net/ship.js/
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
 
 
function initUserInput(canvas) {
    document.onkeydown = keyDownHandler;
    document.onkeyup = keyUpHandler;
    document.onkeypress = keyPressHandler;
    
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

function keyPressHandler(event) {
    var key = String.fromCharCode(event.charCode);
    switch (key) {
        case 'r': 
            globalData.freeRangeMode = !globalData.freeRangeMode;
            break;
        case 's': 
            globalData.playSound = !globalData.playSound;
            break;
        case 'p': 
            if (globalData.game.isPaused()) {
                globalData.game.start();
            } else {
                globalData.game.pause();
            }
            break;
        default:
            break;
    }
}

function mouseDownHandler(event) {
    globalData.inputGo = true;
    globalData.inputGoX = event.clientX - event.currentTarget.offsetLeft;
    globalData.inputGoY = event.clientY - event.currentTarget.offsetTop;
}

function mouseUpHandler(event) {
    globalData.inputGo = false;
}

function mouseMoveHandler(event) {
    globalData.inputGoX = event.clientX - event.currentTarget.offsetLeft;
    globalData.inputGoY = event.clientY - event.currentTarget.offsetTop;
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

