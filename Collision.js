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
 
 
function RunCollisionDetection() {
    for (var i = 0; i < globalData.entities.length; i++) {
        var entityA = globalData.entities[i];
        if (!entityA.canCollide() || entityA.isDead()) {
            continue;
        }
        
        for (var j = i + 1; j < globalData.entities.length; j++) {
            var entityB = globalData.entities[j];
            if (!entityB.canCollide() || entityB.isDead()) {
                continue;
            }
            
            if (IsColliding(entityA, entityB)) {
                CallCollisionFunction(entityA, entityB);
            }
        }
    }
}

function IsColliding(entityA, entityB) {
    if (entityA.x < entityB.x + entityB.width() &&
        entityA.x + entityA.width() > entityB.x &&
        entityA.y < entityB.y + entityB.height() &&
        entityA.y + entityA.height() > entityB.y) {
        return true;
    }
    return false;
}

function CallCollisionFunction(entityA, entityB) {
    for (var i = 0; i < collisionFunctions.length; i++) {
        var entry = collisionFunctions[i];
        if (entry.typeA == entityA.entityType && entry.typeB == entityB.entityType) {
            entry.func.call(null, entityA, entityB);
        } else if (entry.typeB == entityA.entityType && entry.typeA == entityB.entityType) {
            entry.func.call(null, entityB, entityA);
        }
    }
}

var collisionFunctions = [
    {typeA : Projectile.prototype.entityType, typeB : Enemy.prototype.entityType, func : 
    function(projectile, enemy) {
        enemy.hitPoints -= projectile.weapon.weaponTemplate.damage;
        projectile.startDying();
    }}
]

