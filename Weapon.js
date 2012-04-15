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
 
 
function Weapon(weaponTemplate, unit) {
    this.weaponTemplate = weaponTemplate;
    this.unit_ = unit;
    
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
    this.xPositionPrc = 0;
    this.yPositionPrc = 0;
    this.offsetAngle = 0;
    this.fireSound = null;
}

WeaponTemplate.prototype.clone = function() {
    var clone = new WeaponTemplate();
    clone.spriteTemplate = this.spriteTemplate;
    clone.spriteTemplateDead = this.spriteTemplateDead;
    clone.reloadTime = this.reloadTime;
    clone.speed = this.speed;
    clone.damage = this.damage;
    clone.xPositionPrc = this.xPositionPrc;
    clone.yPositionPrc = this.yPositionPrc;
    clone.offsetAngle = this.offsetAngle;
    return clone;
}

