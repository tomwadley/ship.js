
function Level(levelTemplate) {
    this.template = levelTemplate
}

function LevelTemplate() {
    this.entityFactories = [];
}

LevelTemplate.prototype.clone = function() {
    var clone = new LevelTemplate();
    for (var i = 0; i < this.entityFactories.length; i++) {
        clone.entityFactories.push(this.entityFactories[i]);
    }
    return clone;
}

