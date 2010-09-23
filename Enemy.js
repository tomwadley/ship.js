
Enemy.prototype = new Unit();
Enemy.prototype.constructor = Unit;
function Enemy(enemyTemplate) {
    this.template = enemyTemplate;
    
    this.sprite = new Sprite(this.template.spriteTemplate);
    this.speed = this.template.speed;
}

function EnemyTemplate() {
    this.spriteTemplate = null;
    this.speed = 50;
}

EnemyTemplate.prototype.generate = function() {
    return new Enemy(this);
}

