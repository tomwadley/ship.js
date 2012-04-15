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


function Utils() { }

Utils.prototype.DrawProgressBar = function(context, x, y, width, height, prc) {
    var BAR_TO_BORDER_GAP = 3;
    var BAR_STYLE = '#009900';
    var BORDER_STYLE = '#009900';
    var BACKGROUND_STYLE = "#000000";

    context.fillStyle = BACKGROUND_STYLE;
    context.fillRect(x, y, width, height);

    context.strokeStyle = BORDER_STYLE;
    context.lineWidth = 1;
    context.strokeRect(x, y, width, height);

    if (prc > 0) {
        var totalProgressHeight = height - (2 * BAR_TO_BORDER_GAP);
        var progressHeight = totalProgressHeight * prc;

        var barX = x + BAR_TO_BORDER_GAP;
        var barY = (y + height) - BAR_TO_BORDER_GAP - progressHeight;
        var barWidth = width - (2 * BAR_TO_BORDER_GAP);
        var barHeight = progressHeight;

        context.fillStyle = BAR_STYLE;
        context.fillRect(barX, barY, barWidth, barHeight);
    }
}

Utils.prototype.DisplayMessage = function(context, message) {
    context.fillStyle = '#009900';
    context.font = '24px sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillText(message, globalData.game.totalCanvasWidth() / 2, globalData.game.totalCanvasHeight() / 3);
}

