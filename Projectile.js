
Projectile.prototype = new Entity();
Projectile.prototype.constructor = Entity;
function Projectile(weapon, zorder) {
    this.weapon = weapon;
    
    this.sprite = new Sprite(weapon.weaponTemplate.spriteTemplate);
    this.x = weapon.unit.x + weapon.offsetX;
    this.y = weapon.unit.y + weapon.offsetY;
    this.zorder = zorder;
    this.angle = weapon.unit.angle + weapon.offsetAngle;
    this.speed = weapon.weaponTemplate.speed;
    this.movementAngle = this.angle;
    
    this.dead = false;
}

Projectile.prototype.entityType = "Projectile";

Projectile.prototype.canCollide = function() {
    return true;   
}

Projectile.prototype.isDead = function() {
    return this.dead || Entity.prototype.isDead.call(this);
}

Projectile.prototype.update = function(delta) {
    Entity.prototype.update.call(this, delta);
}

