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
 
 
function Sprite(spriteTemplate) {
    this.template = spriteTemplate;
    
    this.imageIndex = 0;
    this.timeUntilNextImage = this.template.timeBetweenImages;
    
    this.loop = true;
    this.animationEnded = false;
}

Sprite.prototype.getCurrentImage = function() {
    return this.template.images[this.imageIndex];
}

Sprite.prototype.width = function() {
    return this.getCurrentImage().width;
}

Sprite.prototype.height = function() {
    return this.getCurrentImage().height;
}

Sprite.prototype.update = function(delta) {
    this.timeUntilNextImage -= delta;

    while (this.timeUntilNextImage <= 0) {
        if (this.imageIndex + 1 == this.template.images.length) {
            if (this.loop) {
                this.imageIndex = 0;
            } else {
                this.animationEnded = true;
            }
        } else {
            this.imageIndex ++;
        }
        
        this.timeUntilNextImage += this.template.timeBetweenImages;
    }
}

function SpriteTemplate() {
    this.images = [];
}

SpriteTemplate.prototype.clone = function() {
    var clone = new SpriteTemplate();
    for (var i = 0; i < this.images.length; i++) {
        clone.images.push(this.images[i]);
    }
    return clone;
}

SpriteTemplate.prototype.timeBetweenImages = 100;

