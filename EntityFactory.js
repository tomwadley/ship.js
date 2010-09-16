
function EntityFactory(template, avgNumPerSecond) {
    this.template = template;
    this.avgNumPerSecond = avgNumPerSecond;
}

EntityFactory.prototype.tryGenerate = function(delta) {
    var probability = this.avgNumPerSecond * (delta / 1000);
    
    if (Math.random() < probability) {
        var entity = this.template.generate();
        globalData.newEntities.push(entity);
        
        entity.x = Math.floor(Math.random() * globalData.right + globalData.left);;
        entity.y = globalData.top;
        entity.speed = 200;
        entity.movementAngle = Math.PI;
    }
}

