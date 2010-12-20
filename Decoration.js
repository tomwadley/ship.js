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
 
 
Decoration.prototype = new Entity();
Decoration.prototype.constructor = Entity;
function Decoration(decorationTemplate) {
    this.template = decorationTemplate;
    
    this.sprite = new Sprite(this.template.spriteTemplate);
    this.speed = this.template.speed;
    this.turningSpeed = this.template.turningSpeed;
}

function DecorationTemplate() {
    this.spriteTemplate = null;
    this.speed = 200;
    this.turningSpeed = 0;
}

DecorationTemplate.prototype.generate = function() {
    return new Decoration(this);
}

DecorationTemplate.prototype.clone = function() {
    var clone = new DecorationTemplate();
    clone.spriteTemplate = this.spriteTemplate;
    clone.speed = this.speed;
    clone.turningSpeed = this.turningSpeed;
    return clone;
}

