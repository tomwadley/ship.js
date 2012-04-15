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
        audio = soundTemplate.createAudioElement();
        audioList[audioList.length] = audio;
        pos = audioList.length - 1;
        //debug("New sound slot created for: " + soundTemplate.filename);
    }
    
    audio.play();
}
 
function SoundTemplate() {
    this.filename = "";
}

SoundTemplate.prototype.createAudioElement = function() {
    return new Audio(this.filename);
}

SoundTemplate.prototype.clone = function() {
    var clone = new SoundTemplate();
    clone.filename = this.filename;
    return clone;
}

