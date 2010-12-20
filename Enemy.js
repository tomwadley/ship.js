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
}

function EnemyTemplate() {
    this.spriteTemplate = null;
    this.speed = 50;
    this.hitPoints = 20;
}

Enemy.prototype.entityType = "Enemy";

Enemy.prototype.canCollide = function() {
    return true;   
}

EnemyTemplate.prototype.generate = function() {
    return new Enemy(this);
}

EnemyTemplate.prototype.clone = function() {
    var clone = new EnemyTemplate();
    clone.spriteTemplate = this.spriteTemplate;
    clone.speed = this.speed;
    clone.hitPoints = this.hitPoints;
    return clone;
}

