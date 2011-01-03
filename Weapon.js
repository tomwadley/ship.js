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
 
 
function Weapon(weaponTemplate, unit) {
    this.weaponTemplate = weaponTemplate;
    this.unit_ = unit;
    
    this.offsetX = 0;
    this.offsetY = 0;
    this.offsetAngle = 0;
    
    this.timeUntilNextFire = 0;
}

Weapon.prototype.update = function(delta) {
    this.timeUntilNextFire -= delta;
    if (this.timeUntilNextFire < 0) {
        this.timeUntilNextFire = 0;
    }
}

Weapon.prototype.canWeaponFire = function() {
    return this.timeUntilNextFire == 0;
}

Weapon.prototype.fireIfPossible = function() {
    if (this.timeUntilNextFire == 0) {
        var projectile = new Projectile(this, this.unit_.zorder - 0.5);
        globalData.newEntities.push(projectile);
    
        this.timeUntilNextFire = this.weaponTemplate.reloadTime;
    }
}

Weapon.prototype.getUnit = function() {
    return this.unit_;
}


function WeaponTemplate() {
    this.spriteTemplate = null;
    this.spriteTemplateDead = null;
    this.reloadTime = 0;
    this.speed = 0;
    this.damage = 0;
}

WeaponTemplate.prototype.clone = function() {
    var clone = new WeaponTemplate();
    clone.spriteTemplate = this.spriteTemplate;
    clone.spriteTemplateDead = this.spriteTemplateDead;
    clone.reloadTime = this.reloadTime;
    clone.speed = this.speed;
    clone.damage = this.damage;
    return clone;
}

