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
 

function playSound(soundTemplate) {
    if (!globalData.playSound) {
        return;
    }
    if (globalData.sounds == null) {
        globalData.sounds = new Array();
    }
    if (globalData.sounds[soundTemplate.filename] == null) {
        globalData.sounds[soundTemplate.filename] = new Array();
    }
    var audioList = globalData.sounds[soundTemplate.filename];

    var audio = null;
    for (var i = 0; i < audioList.length; i++) {
        if (audioList[i].ended) {
            audio = audioList[i];
        }
    }

    if (audio == null) {
        audio = new Audio(soundTemplate.filename);
        audioList[audioList.length] = audio;
        pos = audioList.length - 1;
        //debug("New sound slot created for: " + soundTemplate.filename);
    }
    
    audio.play();
}
 
function SoundTemplate() {
    this.filename = "";
}

SoundTemplate.prototype.clone = function() {
    var clone = new SoundTemplate();
    return clone;
}

