
function Entity() {
    this.sprite = null;

    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.zorder = 0;
    
    this.movementAngle = 0;
    this.speed = 0;
    this.turningSpeed = 0;
    this.targetAngle = null;
    
    // Buffer to store unused movement each update
    this.movementBuffer = 0;
}

Entity.prototype.width = function() {
    return this.sprite.width();
}

Entity.prototype.height = function() {
    return this.sprite.height();
}

// Returns true if entity is completely off screen
Entity.prototype.isOutOfDrawingArea = function() {
    if ((this.x + (this.width() / 2) < globalData.left) ||
        (this.x - (this.width() / 2) > globalData.right) ||
        (this.y + (this.height() / 2) < globalData.top) ||
        (this.y - (this.height() / 2) > globalData.bottom)) {
        return true;
    }
    
    return false;
}

Entity.prototype.isDead = function() {
    return this.isOutOfDrawingArea();
}

Entity.prototype.update = function(delta) {
    // ** Update sprite **
    this.sprite.update(delta);
    
    // ** Update x,y **
    // Get number of units to move
    var unitsToMove = this.speed * (delta / 1000);
    
    // Add left over units from the movement buffer
    unitsToMove += this.movementBuffer; 
    
    // Convert to movement in the x and y axies
    var movementX = unitsToMove * Math.sin(this.movementAngle);
    var movementY = unitsToMove * Math.cos(this.movementAngle);
    
    // Convert to whole units
    var unitsX = movementX > 0 ? Math.floor(movementX) : Math.ceil(movementX);
	var unitsY = movementY > 0 ? Math.floor(movementY) : Math.ceil(movementY);
    
    // Apply
    this.x += unitsX;
    this.y -= unitsY; // The y-axis is inverted
    
    // Put unused movement back in the movement buffer for next time
    movementX -= unitsX;
    movementY -= unitsY;
    this.movementBuffer = Math.sqrt((movementX * movementX) + (movementY * movementY));
    
    // ** Update angle **
    // Get number of radians we can turn
    var numberOfRadians = this.turningSpeed * (delta / 1000);
    var gotoTarget = false;
    
    if (numberOfRadians == 0 || this.targetAngle == null) {
        gotoTarget = false
    } else if (numberOfRadians > 0) {
        var targetAngle = this.targetAngle;
        while (targetAngle < this.angle) {
            targetAngle += 2 * Math.PI;
        }
        if (this.targetAngle > this.angle &&
            this.targetAngle < this.angle + numberOfRadians) {
            gotoTarget = true;
        }
    } else if (numberOfRadians < 0) {
        var targetAngle = this.targetAngle;
        while (targetAngle > this.angle) {
            targetAngle -= 2 * Math.PI;
        }
        if (this.targetAngle < this.angle &&
            this.targetAngle > this.angle + numberOfRadians) {
            gotoTarget = true;
        }
    }
    
    if (gotoTarget) {
        this.angle = this.targetAngle;
    } else {
        this.angle += numberOfRadians;
    }
    
    // Keep -PI < angle <= PI
    if (this.angle > Math.PI) {
        this.angle -= 2 * Math.PI;
    }
    if (this.angle <= -Math.PI) {
        this.angle += 2 * Math.PI;
    }
}

Entity.prototype.render = function(context) {
    // Push matrix
    context.save();

    // Translate to the center of the entity's location
    context.translate(this.x, this.y);
                      
    // Apply translation around the center of the entity
    context.rotate(this.angle);
    
    // Translate to the top left corner to draw the image
    context.translate(-this.width() / 2, -this.height() / 2);
    
    // Draw the image
    context.drawImage(this.sprite.getCurrentImage(), 0, 0);
    
    // Pop matrix
    context.restore();
}

