
Player.prototype = new Unit();
Player.prototype.constructor = Unit;
function Player () {
    // Temp vars
    var spriteTemplate = new SpriteTemplate();
    var image = new Image();
    image.src = "blue_player-1.png";
    spriteTemplate.images[0] = image;
    image = new Image();
    image.src = "blue_player-2.png";
    spriteTemplate.images[1] = image;
    var sprite = new Sprite(spriteTemplate);
    
    this.sprite = sprite;
    this.x = 100;
    this.y = 300;
    this.angle = 1;
    
    spriteTemplate = new SpriteTemplate();
    image = new Image();
    image.src = "plasma-1.png";
    spriteTemplate.images[0] = image;
    image = new Image();
    image.src = "plasma-2.png";
    spriteTemplate.images[1] = image;
    
    var weaponTemplate = new WeaponTemplate();
    weaponTemplate.spriteTemplate = spriteTemplate;
    weaponTemplate.reloadTime = 100;
    weaponTemplate.speed = 400;
    weaponTemplate.damage = 10;
    this.weapon = new Weapon(weaponTemplate, this);
}

Player.prototype.update = function(delta) {
    this.movementAngle = this.angle;
    
    if (globalData.inputUp) {
        this.speed = 200;
    } else if (globalData.inputDown) {
        this.speed = -200;
    } else {
        this.speed = 0;
    }
    
    if (globalData.inputLeft) {
        this.turningSpeed = -3;
    } else if (globalData.inputRight) {
        this.turningSpeed = 3;
    } else {
        this.turningSpeed = 0;
    }
    
    this.fireIfPossible = globalData.inputShoot;
    
    Unit.prototype.update.call(this, delta);
    
    this.moveInsideDrawingArea();
}

// Stops the player leaving the screen
Player.prototype.moveInsideDrawingArea = function() {
    if (this.x - (this.width() / 2) < globalData.left) {
        this.x = globalData.left + (this.width() / 2);
    } else if (this.x + (this.width() / 2) > globalData.right) {
        this.x = globalData.right - (this.width() / 2);
    }
    
    if (this.y - (this.height() / 2) < globalData.top) {
        this.y = globalData.top + (this.height() / 2);
    } else if (this.y + (this.height() / 2) > globalData.bottom) {
        this.y = globalData.bottom - (this.height() / 2);
    }
}

