
function Weapon(weaponTemplate, unit) {
    this.weaponTemplate = weaponTemplate;
    this.unit = unit;
    
    this.offsetX = 0;
    this.offsetY = 0;
    this.offsetAngle = 0;
    
    this.timeUntilNextFire = 0;
}

Weapon.prototype.update = function(delta) {
    this.timeUntilNextFire -= delta;
    if (this.timeUntilNextFire < 0) {
        this.timeUntilNextFire = 0;
    }
}

Weapon.prototype.canWeaponFire = function() {
    return this.timeUntilNextFire == 0;
}

Weapon.prototype.fireIfPossible = function() {
    if (this.timeUntilNextFire == 0) {
        var projectile = new Projectile(this);
        globalData.newEntities.push(projectile);
    
        this.timeUntilNextFire = this.weaponTemplate.reloadTime;
    }
}


function WeaponTemplate() {
    this.spriteTemplate = null;
    this.reloadTime = 0;
    this.speed = 0;
    this.damage = 0;
}
