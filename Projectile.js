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
 
 
Projectile.prototype = new Entity();
Projectile.prototype.constructor = Entity;
function Projectile(weapon, zorder) {
    this.weapon_ = weapon;

    if (weapon.weaponTemplate.fireSound != null) {
        playSound(weapon.weaponTemplate.fireSound);
    }
    
    this.sprite = new Sprite(weapon.weaponTemplate.spriteTemplate);
    this.zorder = zorder;
    this.angle = weapon.getUnit().angle - weapon.weaponTemplate.offsetAngle;
    this.speed = weapon.weaponTemplate.speed;
    this.movementAngle = this.angle;

    this.x = weapon.getUnit().x;
    this.y = weapon.getUnit().y;

    if (weapon.weaponTemplate.xPositionPrc != 0 || weapon.weaponTemplate.yPositionPrc != 0) {
        var unitsToOffsetX = (weapon.getUnit().width() / 2) * -weapon.weaponTemplate.xPositionPrc;
        var unitsToOffsetY = (weapon.getUnit().height() / 2) * weapon.weaponTemplate.yPositionPrc;

        var unitsToOffset = Math.sqrt((unitsToOffsetX * unitsToOffsetX) + (unitsToOffsetY * unitsToOffsetY));

        var angleToOffset;
        if (unitsToOffsetX == 0) {
            angleToOffset = Math.PI / 2;
            if (unitsToOffsetY < 0) {
                angleToOffset = -angleToOffset;
            }
        } else {
            angleToOffset = Math.atan(unitsToOffsetY / unitsToOffsetX);
        }

        if (unitsToOffsetX < 0) angleToOffset += Math.PI;
        angleToOffset += Math.PI / 2;

        var adjustedAngle = weapon.getUnit().angle + angleToOffset;

        var offsetX = -unitsToOffset * Math.sin(adjustedAngle);
        var offsetY = unitsToOffset * Math.cos(adjustedAngle);

        this.x += offsetX;
        this.y += offsetY;
    }
    
    this.dying = false;
}

Projectile.prototype.entityType = "Projectile";

Projectile.prototype.canCollide = function() {
    return !this.dying;
}

Projectile.prototype.isDead = function() {
    if (this.dying && this.sprite.animationEnded) {
        return true;
    }
    return Entity.prototype.isDead.call(this);
}

Projectile.prototype.update = function(delta) {
    Entity.prototype.update.call(this, delta);
}

Projectile.prototype.startDying = function() {
    this.dying = true;
    this.sprite = new Sprite(this.weapon_.weaponTemplate.spriteTemplateDead);
    this.sprite.loop = false;
    this.speed = 0;
}

Projectile.prototype.getFiringUnit = function() {
    return this.weapon_.getUnit();
}

Projectile.prototype.getDamage = function() {
    return this.weapon_.weaponTemplate.damage;
}

