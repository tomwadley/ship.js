
Unit.prototype = new Entity();
Unit.prototype.constructor = Entity;
function Unit() {
    this.fireIfPossible = false;
    
    this.weapon = null;
}

Unit.prototype.update = function(delta) {
    this.weapon.update(delta);
    
    if (this.fireIfPossible && this.weapon.canWeaponFire()) {
        this.weapon.fireIfPossible();
    }

    Entity.prototype.update.call(this, delta);
}

