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

