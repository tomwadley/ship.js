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

function DrawProgressBar(context, x, y, width, height, prc) {
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

