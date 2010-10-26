
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
    inputShoot : false,
    
    inputGo : false,
    inputGoX : 0,
    inputGoY : 0,
    
    // Current entities - not to be modified outside this file
    entities : [],
    // Entities to add
    newEntities : []
}

function debug(str) {
    //var debugP = document.getElementById("debug");
    //debugP.innerHTML += str + "<br />";
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
    
    // Load Mod
    var mod = new Mod("testmod.xml");
    var level = new Level(mod.levelTemplates["test_level"]);
    var factories = level.template.entityFactories;
    
    // Setup user input
    initUserInput(outputCanvas);
    
    // Setup globalData
    globalData.left = 0;
    globalData.right = canvas.width;
    globalData.top = 0;
    globalData.bottom = canvas.height;
    globalData.context = context;
    
    // Player setup
    var player = new Player(mod.playerTemplate);
    player.x = 300;
    player.y = 400;
    player.angle = 2;
    globalData.entities.push(player);
    
    this.start = function() {
        if (!interval) {
            prevTime = (new Date()).getTime();
            interval = setInterval(gameLoop, 1000 / 30);
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
        
        var deadEntities = [];
        
        // Update each entity
        for (i = 0; i < globalData.entities.length; i++) {
            globalData.entities[i].update(delta);
            
            if (globalData.entities[i].isDead(globalData.entities)) {
                deadEntities.push(i); // Record the entity's index
            }
        }
        
        // Remove dead entities
        for (i = 0; i < deadEntities.length; i++) {
            globalData.entities.splice(deadEntities[i] - i, 1);
        }
        
        // Run factories
        for (i = 0; i < factories.length; i++) {
            factories[i].tryGenerate(delta);
        }
        
        // Add new entities
        globalData.entities = globalData.entities.concat(globalData.newEntities);
        globalData.newEntities = [];
    }

    var render = function() {
        // Clear canvas
        context.fillStyle = "rgb(0,0,0)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        if (globalData.inputGo) {
            context.fillStyle = "rgb(255,0,0)";
            context.fillRect(globalData.inputGoX - 5, globalData.inputGoY - 5, 10, 10);
        }
        
        // Render each entity
        for (i = 0; i < globalData.entities.length; i++) {
            globalData.entities[i].render(context);
        }
        
        // Write the internal canvas to the output canvas
        outputContext.drawImage(canvas, 0, 0);
    }
    
    return true;
}


