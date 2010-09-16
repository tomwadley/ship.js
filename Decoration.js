
Decoration.prototype = new Entity();
Decoration.prototype.constructor = Entity;
function Decoration(decorationTemplate) {
    this.template = decorationTemplate;
    
    this.sprite = new Sprite(this.template.spriteTemplate);
    this.turningSpeed = this.template.turningSpeed;
}

function DecorationTemplate() {
    this.spriteTemplate = null;
    this.turningSpeed = 0;
}

DecorationTemplate.prototype.generate = function() {
    return new Decoration(this);
}
