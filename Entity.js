
function Entity() {
    this.sprite = null;

    this.x = 0;
    this.y = 0;
    this.angle = 0;
    
    this.movementAngle = 0;
    this.speed = 0;
    this.turningSpeed = 0;
    
    // Buffer to store unused movement each update
    this.movementBuffer = 0;
}

Entity.prototype.width = function() {
    return this.sprite.width();
}

Entity.prototype.height = function() {
    return this.sprite.height();
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
    var numberOfRadians = this.turningSpeed * (delta / 1000);
    
    this.angle += numberOfRadians;
    
    // TODO: screenbound
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
