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
 
 
Player.prototype = new Unit();
Player.prototype.constructor = Unit;
function Player (playerTemplate) {
    this.template = playerTemplate;

    this.sprite = new Sprite(this.template.spriteTemplate);
    this.weapon = new Weapon(this.template.weaponTemplate, this);
    this.hitPoints = 10;    
}

Player.prototype.update = function(delta) {
    this.movementAngle = this.angle;
    
    if (globalData.inputUp) {
        this.speed = 200;
    } else if (globalData.inputDown) {
        this.speed = -200;
    } else {
        this.speed = 0;
    }
    
    if (globalData.inputLeft) {
        this.turningSpeed = -3;
    } else if (globalData.inputRight) {
        this.turningSpeed = 3;
    } else {
        this.turningSpeed = 0;
    }
    
    if (globalData.inputGo) {
        var x = globalData.inputGoX - this.x;
        var y = globalData.inputGoY - this.y;

        var distance = Math.sqrt((x * x) + (y * y));
        x = x / distance;
        y = y / distance;
        
        if (distance < 10) {
            this.speed = 0;
        } else if (distance < 20) {
            this.speed = 100;
        } else {
            this.speed = 200;
        }

        var desiredAngle = Math.acos(x);        
        if (y < 0) {
            desiredAngle = -desiredAngle; 
        }
        desiredAngle += Math.PI / 2;
        if (desiredAngle > Math.PI) {
            desiredAngle -= 2 * Math.PI;
        }
        if (desiredAngle <= -Math.PI) {
            desiredAngle += 2 * Math.PI;
        }
        
        var angleDiff = desiredAngle - this.angle;
        
        if (Math.abs(angleDiff) < 0.1) {
            this.turningSpeed = 0;
            this.targetAngle = null;
        } else {
            var clockwise = false;
            
            if ((angleDiff > 0 && angleDiff < Math.PI) ||
                (angleDiff < 0 && angleDiff < -Math.PI)) {
                clockwise = true;
            }
            
            if (clockwise) {
                this.turningSpeed = 8;
            } else {
                this.turningSpeed = -8;
            }
            
            this.targetAngle = desiredAngle;
        }
    } else {
        //this.speed = 0;
        this.targetAngle = null;
    }
    
    this.fireIfPossible = globalData.inputShoot;
    
    Unit.prototype.update.call(this, delta);
    
    this.moveInsideDrawingArea();
}

// Stops the player leaving the screen
Player.prototype.moveInsideDrawingArea = function() {
    if (this.x - (this.width() / 2) < globalData.left) {
        this.x = globalData.left + (this.width() / 2);
    } else if (this.x + (this.width() / 2) > globalData.right) {
        this.x = globalData.right - (this.width() / 2);
    }
    
    if (this.y - (this.height() / 2) < globalData.top) {
        this.y = globalData.top + (this.height() / 2);
    } else if (this.y + (this.height() / 2) > globalData.bottom) {
        this.y = globalData.bottom - (this.height() / 2);
    }
}

function PlayerTemplate() {
    this.spriteTemplate = null;
    this.weaponTemplate = null;
}

PlayerTemplate.prototype.generate = function() {
    return new Player(this);
}

PlayerTemplate.prototype.clone = function() {
    var clone = new PlayerTemplate();
    clone.spriteTemplate = this.spriteTemplate;
    clone.weaponTemplate = this.weaponTemplate;
    return clone;
}

