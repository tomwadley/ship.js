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
 
 
function EntityFactory(template, avgNumPerSecond) {
    this.template = template;
    this.avgNumPerSecond = avgNumPerSecond;
    this.spawnFrom = EntityFactory.spawnFromEnum.TOP;
    this.initialAngle = 0;
}

EntityFactory.spawnFromEnum = {
    TOP: 0,
    BOTTOM: 1,
    LEFT: 2,
    RIGHT: 3
}

EntityFactory.prototype.tryGenerate = function(delta, zorder) {
    var probability = this.avgNumPerSecond * (delta / 1000);
    
    if (Math.random() < probability) {
        var entity = this.template.generate();
        if (entity.entityType == Enemy.prototype.entityType && globalData.game.levelDurationExceeded()) {
            // TODO: This is a bit of a hack
            return;
        }
        globalData.newEntities.push(entity);
        
        switch (this.spawnFrom) {
            case EntityFactory.spawnFromEnum.TOP:
                entity.x = EntityFactory.getRandomEntityPosition(globalData.left, globalData.right, entity.width());
                entity.y = globalData.top - (entity.height() / 2) + 1;
                break;
            case EntityFactory.spawnFromEnum.BOTTOM:
                entity.x = EntityFactory.getRandomEntityPosition(globalData.left, globalData.right, entity.width());
                entity.y = globalData.bottom + (entity.height() / 2) - 1;
                break;
            case EntityFactory.spawnFromEnum.LEFT:
                entity.x = globalData.left - (entity.width() / 2) + 1;
                entity.y = EntityFactory.getRandomEntityPosition(globalData.top, globalData.bottom, entity.height());
                break;
            case EntityFactory.spawnFromEnum.RIGHT:
                entity.x = globalData.right + (entity.width() / 2) - 1;
                entity.y = EntityFactory.getRandomEntityPosition(globalData.top, globalData.bottom, entity.height());
                break;
        }

        entity.angle = this.initialAngle;
        entity.movementAngle = this.initialAngle;
        entity.zorder = zorder;
    }
}

EntityFactory.getRandomEntityPosition = function(from, to, entitySize) {
    return Math.floor((Math.random() * (to - entitySize)) + (entitySize / 2) + from);
}

