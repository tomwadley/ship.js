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

