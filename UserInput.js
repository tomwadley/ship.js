/*
 * This file is part of Ship.
 * Copyright (C) 2010  Tom Wadley
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
        default:
            break;
    }
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

