
var globalData = {
    // Drawing area dimensions
    left : 0,
    top : 0,
    right : 0,
    bottom : 0,
    
    // User input
    inputLeft : false,
    inputRight : false,
    inputUp : false,
    inputDown : false,
    inputShoot : false
}

function Game(canvasId) {
    // Setup output context
    var outputCanvas = document.getElementById(canvasId);
    var outputContext = outputCanvas.getContext('2d');
    
    // Setup internal canvas for double buffering
    var canvas = document.createElement('canvas');
    canvas.width = outputCanvas.width;
    canvas.height = outputCanvas.height;
    var context = canvas.getContext('2d');
    
    // Timekeeping vars
    var interval = null;
    var prevTime = 0;
    
    // Setup user input
    initUserInput();
    
    // Setup globalData
    globalData.left = 0;
    globalData.right = canvas.width;
    globalData.top = 0;
    globalData.bottom = canvas.height;
    globalData.context = context;
    
    // Temp vars
    
    var spriteTemplate = new SpriteTemplate();
    var image = new Image();
    image.src = "blue_player-1.png";
    spriteTemplate.images[0] = image;
    image = new Image();
    image.src = "blue_player-2.png";
    spriteTemplate.images[1] = image;
    var sprite = new Sprite(spriteTemplate);
    var entity = new Entity();
    entity.sprite = sprite;
    entity.x = 100;
    entity.y = 300;
    entity.angle = 1;
    entity.movementAngle = 1;
    entity.speed = 50;
    
    this.start = function() {
        if (!interval) {
            prevTime = (new Date()).getTime();
            interval = setInterval(gameLoop, 1000 / 25);
        }
    }

    this.pause = function() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    var gameLoop = function() {
        var currentTime = (new Date()).getTime();
        var delta = currentTime - prevTime;

        update(delta);
        render();
        
        prevTime = currentTime;
    }

    var update = function(delta) {
        if (delta == 0) return;
        
        entity.movementAngle = entity.angle;
        
        if (globalData.inputUp) {
            entity.speed = 200;
        } else if (globalData.inputDown) {
            entity.speed = -200;
        } else {
            entity.speed = 0;
        }
        
        if (globalData.inputLeft) {
            entity.turningSpeed = -3;
        } else if (globalData.inputRight) {
            entity.turningSpeed = 3;
        } else {
            entity.turningSpeed = 0;
        }
        
        
        entity.update(delta);
    }

    var render = function() {
        // Clear canvas
        context.fillStyle = "rgb(0,0,0)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        entity.render(context);
        
        // Write the internal canvas to the output canvas
        outputContext.drawImage(canvas, 0, 0);
    }
    
    return true;
}


