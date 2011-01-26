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
 
 
Enemy.prototype = new Unit();
Enemy.prototype.constructor = Unit;
function Enemy(enemyTemplate) {
    this.template = enemyTemplate;
    
    this.sprite = new Sprite(this.template.spriteTemplate);
    this.speed = this.template.speed;
    this.hitPoints = this.template.hitPoints;

    if (this.template.weaponTemplates != null) {
        for (var i = 0; i < this.template.weaponTemplates.length; i++) {
            this.addWeapon(new Weapon(this.template.weaponTemplates[i], this));
        }
    }

    this.fireIfPossible = true;
}

Enemy.prototype.entityType = "Enemy";

Enemy.prototype.getSpriteTemplateDead = function() {
    return this.template.spriteTemplateDead;
}

function EnemyTemplate() {
    this.spriteTemplate = null;
    this.spriteTemplateDead = null;
    this.weaponTemplates = null;
    this.speed = 0;
    this.hitPoints = 0;
    this.cash = 0;
    this.deadSound = null;
}

EnemyTemplate.prototype.generate = function() {
    return new Enemy(this);
}

EnemyTemplate.prototype.clone = function() {
    var clone = new EnemyTemplate();
    clone.spriteTemplate = this.spriteTemplate;
    clone.spriteTemplateDead = this.spriteTemplateDead;
    clone.weaponTemplates = this.weaponTemplates == null ? null : this.weaponTemplates.slice(0);
    clone.speed = this.speed;
    clone.hitPoints = this.hitPoints;
    clone.cash = this.cash;
    clone.deadSound = this.deadSound;
    return clone;
}

