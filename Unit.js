
Unit.prototype = new Entity();
Unit.prototype.constructor = Entity;
function Unit() {
    this.fireIfPossible = false;
    
    this.weapon = null;
    this.hitPoints = 0;
}

Unit.prototype.isDead = function() {
    return this.hitPoints <= 0 || Entity.prototype.isDead.call(this);
}

Unit.prototype.update = function(delta) {
    if (this.weapon != null) {
        this.weapon.update(delta);
        
        if (this.fireIfPossible && this.weapon.canWeaponFire()) {
            this.weapon.fireIfPossible();
        }
    }

    Entity.prototype.update.call(this, delta);
}

