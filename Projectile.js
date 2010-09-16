
Projectile.prototype = new Entity();
Projectile.prototype.constructor = Entity;
function Projectile(weapon) {
    this.weapon = weapon;
    
    this.sprite = new Sprite(weapon.weaponTemplate.spriteTemplate);
    this.x = weapon.unit.x + weapon.offsetX;
    this.y = weapon.unit.y + weapon.offsetY;
    this.angle = weapon.unit.angle + weapon.offsetAngle;
    this.speed = weapon.weaponTemplate.speed;
    this.movementAngle = this.angle;
    //this.turningSpeed = 2;
}

Projectile.prototype.update = function(delta) {
    //this.movementAngle = this.angle;    
    
    Entity.prototype.update.call(this, delta);
}
