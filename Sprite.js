
function Sprite(spriteTemplate) {
    this.template = spriteTemplate;
    
    this.imageIndex = 0;
    this.timeUntilNextImage = this.template.timeBetweenImages;
    
    this.loop = true;
    this.animationEnded = false;
}

Sprite.prototype.getCurrentImage = function() {
    return this.template.images[this.imageIndex];
}

Sprite.prototype.width = function() {
    return this.getCurrentImage().width;
}

Sprite.prototype.height = function() {
    return this.getCurrentImage().height;
}

Sprite.prototype.update = function(delta) {
    this.timeUntilNextImage -= delta;

    while (this.timeUntilNextImage <= 0) {
        if (this.imageIndex + 1 == this.template.images.length) {
            if (this.loop) {
                this.imageIndex = 0;
            } else {
                this.animationEnded = true;
            }
        } else {
            this.imageIndex ++;
        }
        
        this.timeUntilNextImage += this.template.timeBetweenImages;
    }
}

function SpriteTemplate() {
    this.images = [];
}

SpriteTemplate.prototype.clone = function() {
    var clone = new SpriteTemplate();
    for (var i = 0; i < this.images.length; i++) {
        clone.images.push(this.images[i]);
    }
    return clone;
}

SpriteTemplate.prototype.timeBetweenImages = 100;

