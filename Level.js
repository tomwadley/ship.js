
function Level(levelTemplate) {
    this.template = levelTemplate
}

function LevelTemplate() {
    this.entityFactories = [];
}

LevelTemplate.prototype.clone = function() {
    var newTemplate = Object.clone(this);
    newTemplate.entityFactories = Object.clone(this.entityFactories);
    return newTemplate;
}

