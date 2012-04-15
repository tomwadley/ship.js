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

