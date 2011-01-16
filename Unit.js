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
 
 
Unit.prototype = new Entity();
Unit.prototype.constructor = Entity;
function Unit() {
    this.fireIfPossible = false;
    
    this.hitPoints = 0;

    this.weapons_ = null;
    this.dying_ = false;
}

Unit.prototype.canCollide = function() {
    return !this.dying_;
}

Unit.prototype.takeDamage = function(hitPoints) {
    this.hitPoints -= hitPoints;
    if (this.hitPoints <= 0) {
        this.startDying();
    }
}

Unit.prototype.startDying = function() {
    if (this.dying_) {
        return;
    }
    this.dying_ = true;
    this.sprite = new Sprite(this.template.spriteTemplateDead);
    this.sprite.loop = false;
    this.speed = 0;
}

Unit.prototype.isDead = function() {
    if (this.dying_) {
        return this.sprite.animationEnded;
    }
    return this.hitPoints <= 0 || Entity.prototype.isDead.call(this);
}

Unit.prototype.getSpriteTemplateDead = function() {}

Unit.prototype.addWeapon = function(weapon) {
    if (this.weapons_ == null) {
        this.weapons_ = [];
    }
    this.weapons_[this.weapons_.length] = weapon;
}

Unit.prototype.update = function(delta) {
    if (this.weapons_ != null) {
        for (var i = 0; i < this.weapons_.length; i++) {
            this.weapons_[i].update(delta);

            if (this.fireIfPossible && this.weapons_[i].canWeaponFire()) {
                this.weapons_[i].fireIfPossible();
            }
        }
    }

    Entity.prototype.update.call(this, delta);
}

