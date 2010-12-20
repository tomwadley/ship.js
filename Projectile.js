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
    this.weapon = weapon;
    
    this.sprite = new Sprite(weapon.weaponTemplate.spriteTemplate);
    this.x = weapon.unit.x + weapon.offsetX;
    this.y = weapon.unit.y + weapon.offsetY;
    this.zorder = zorder;
    this.angle = weapon.unit.angle + weapon.offsetAngle;
    this.speed = weapon.weaponTemplate.speed;
    this.movementAngle = this.angle;
    
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
    this.sprite = new Sprite(this.weapon.weaponTemplate.spriteTemplateDead);
    this.sprite.loop = false;
    this.speed = 0;
}

