
function EntityFactory(template, avgNumPerSecond) {
    this.template = template;
    this.avgNumPerSecond = avgNumPerSecond;
    this.initialAngle = 0;
}

EntityFactory.prototype.tryGenerate = function(delta, zorder) {
    var probability = this.avgNumPerSecond * (delta / 1000);
    
    if (Math.random() < probability) {
        var entity = this.template.generate();
        globalData.newEntities.push(entity);
        
        entity.x = Math.floor(Math.random() * globalData.right + globalData.left);;
        entity.y = globalData.top;
        entity.angle = this.initialAngle;
        entity.movementAngle = this.initialAngle;
        entity.zorder = zorder;
    }
}

