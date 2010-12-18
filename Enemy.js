
Enemy.prototype = new Unit();
Enemy.prototype.constructor = Unit;
function Enemy(enemyTemplate) {
    this.template = enemyTemplate;
    
    this.sprite = new Sprite(this.template.spriteTemplate);
    this.speed = this.template.speed;
    this.hitPoints = this.template.hitPoints;
}

function EnemyTemplate() {
    this.spriteTemplate = null;
    this.speed = 50;
    this.hitPoints = 20;
}

Enemy.prototype.entityType = "Enemy";

Enemy.prototype.canCollide = function() {
    return true;   
}

EnemyTemplate.prototype.generate = function() {
    return new Enemy(this);
}

EnemyTemplate.prototype.clone = function() {
    var clone = new EnemyTemplate();
    clone.spriteTemplate = this.spriteTemplate;
    clone.speed = this.speed;
    clone.hitPoints = this.hitPoints;
    return clone;
}

