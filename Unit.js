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
    
    this.weapon = null;
    this.hitPoints = 0;
}

Unit.prototype.isDead = function() {
    return this.hitPoints <= 0 || Entity.prototype.isDead.call(this);
}

Unit.prototype.update = function(delta) {
    if (this.weapon != null) {
        this.weapon.update(delta);
        
        if (this.fireIfPossible && this.weapon.canWeaponFire()) {
            this.weapon.fireIfPossible();
        }
    }

    Entity.prototype.update.call(this, delta);
}

