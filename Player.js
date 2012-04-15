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
 
 
Player.prototype = new Unit();
Player.prototype.constructor = Unit;
function Player (playerTemplate) {
    this.template = playerTemplate;

    this.sprite = new Sprite(this.template.spriteTemplate);
    this.hitPoints = this.template.hitPoints;

    if (this.template.weaponTemplates != null) {
        for (var i = 0; i < this.template.weaponTemplates.length; i++) {
            this.addWeapon(new Weapon(this.template.weaponTemplates[i], this));
        }
    }
}

Player.prototype.entityType = "Player";

Player.prototype.update = function(delta) {
    this.movementAngle = this.angle;

    if (globalData.freeRangeMode) {
        this.moveFreeRangeMode();
    } else {
        this.turningSpeed = 0;
        this.targetAngle = null;
        if (this.angle != 0) {
            // Rotate back to facing forwards
            this.targetAngle = 0;
            var desiredAngle = this.getTargetAngle(this.x, this.y - 1);
            this.setTurningSpeed(desiredAngle);
        }
        this.moveNormal();
    }
    
    this.fireIfPossible = globalData.inputShoot;
    
    Unit.prototype.update.call(this, delta);
    
    this.moveInsideDrawingArea();
}

Player.prototype.moveNormal = function() {
    if (globalData.inputGo) {
        var desiredAngle = this.getTargetAngle(globalData.inputGoX, globalData.inputGoY);
        
        var distance = this.getDistance(globalData.inputGoX, globalData.inputGoY);

        if (distance < 10) { // TODO: setting this lower causes a strange bug
            this.speed = 0;
        } else if (distance < 15) {
            this.speed = this.template.speed / 2;
        } else {
            this.speed = this.template.speed;
        }

        this.movementAngle = desiredAngle;
    } else {
        this.movementAngle = 0;

        var moveX = 0;
        var moveY = 0;

        if (globalData.inputRight) moveX++;
        if (globalData.inputLeft) moveX--;
        if (globalData.inputDown) moveY++;
        if (globalData.inputUp) moveY--;

        if (moveX == 0) {
            if (moveY > 0) this.movementAngle = Math.PI;
        } else if (moveX < 0) {
            this.movementAngle = -Math.PI / 2;
            this.movementAngle -= moveY * (Math.PI / 4);
        } else {
            this.movementAngle = Math.PI / 2;
            this.movementAngle += moveY * (Math.PI / 4);
        }

        if (moveX != 0 || moveY != 0) {
            this.speed = this.template.speed;
        } else {
            this.speed = 0;
        }
    }
}

Player.prototype.moveFreeRangeMode = function() {
    if (globalData.inputUp) {
        this.speed = this.template.speed;
    } else if (globalData.inputDown) {
        this.speed = -this.template.speed;
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
        var desiredAngle = this.getTargetAngle(globalData.inputGoX, globalData.inputGoY);

        var angleDiff = desiredAngle - this.angle;
        
        if (Math.abs(angleDiff) < 0.1) {
            this.turningSpeed = 0;
            this.targetAngle = null;
        } else {
            this.setTurningSpeed(desiredAngle);
            this.targetAngle = desiredAngle;
        }

        var distance = this.getDistance(globalData.inputGoX, globalData.inputGoY);

        if (distance < 10) {
            this.speed = 0;
        } else if (distance < 20) {
            this.speed = this.template.speed / 2;
        } else {
            this.speed = this.template.speed;
        }
    } else {
        this.targetAngle = null;
    }
}

Player.prototype.getDistance = function(targetX, targetY) {
    var x = targetX - this.x;
    var y = targetY - this.y;

    return Math.sqrt((x * x) + (y * y));
}

// TODO: change the name of this
Player.prototype.getTargetAngle = function(targetX, targetY) {
    var x = targetX - this.x;
    var y = targetY - this.y;

    var distance = Math.sqrt((x * x) + (y * y));
    x = x / distance;
    y = y / distance;
    
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

    return desiredAngle;
}

Player.prototype.setTurningSpeed = function(desiredAngle) {
    var angleDiff = desiredAngle - this.angle;

    if ((angleDiff > 0 && angleDiff < Math.PI) ||
        (angleDiff < 0 && angleDiff < -Math.PI)) {
        this.turningSpeed = 8;
    } else {
        this.turningSpeed = -8;
    }
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
    this.spriteTemplateDead = null;
    this.weaponTemplates = null;
    this.speed = 0;
    this.hitPoints = 0;
    this.deadSound = null;
    this.collissionSound = null;
}

PlayerTemplate.prototype.generate = function() {
    return new Player(this);
}

PlayerTemplate.prototype.clone = function() {
    var clone = new PlayerTemplate();
    clone.spriteTemplate = this.spriteTemplate;
    clone.spriteTemplateDead = this.spriteTemplateDead;
    clone.weaponTemplates = this.weaponTemplates == null ? null : this.weaponTemplates.slice(0);
    clone.speed = this.Speed;
    clone.hitPoints = this.hitPoints;
    return clone;
}

