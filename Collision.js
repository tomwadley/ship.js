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
    var widthA = entityA.width();
    var heightA = entityA.height();
    var widthB = entityB.width();
    var heightB = entityB.height();

    var leftA = entityA.x - (widthA / 2);
    var topA = entityA.y - (heightA / 2);
    var leftB = entityB.x - (widthB / 2);
    var topB = entityB.y - (heightB / 2);

    if (leftA < leftB + widthB &&
        leftA + widthA > leftB &&
        topA < topB + heightB &&
        topA + heightA > topB) {
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
        if (projectile.getFiringUnit() == enemy) return;
        projectile.startDying();
        var dead = enemy.takeDamage(projectile.getDamage());
        if (projectile.getFiringUnit().entityType == Player.prototype.entityType) {
            if (dead) {
                globalData.cash += enemy.template.cash;
            }
            enemy.playCollissionSound();
        }
    }},
    {typeA : Projectile.prototype.entityType, typeB : Player.prototype.entityType, func : 
    function(projectile, player) {
        if (projectile.getFiringUnit() == player) return;
        player.takeDamage(projectile.getDamage());
        projectile.startDying();
        player.playCollissionSound();
    }},
    {typeA : Player.prototype.entityType, typeB : Enemy.prototype.entityType, func : 
    function(player, enemy) {
        player.takeDamage(10);
        if (enemy.takeDamage(10)) {
            globalData.cash += enemy.template.cash;
        }
    }}
]

