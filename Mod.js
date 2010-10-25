
function Mod(modURI) {
    
    this.modURI = modURI;
    
    this.loaded = false;
    
    this.spriteTemplates = [];
    this.decorationTemplates = [];
    this.enemyTemplates = [];
    this.weaponTemplates = [];
    this.levelTemplates = [];
    
    this.load();
}

Mod.prototype.load = function() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", this.modURI, false);
    xmlhttp.send();
    
    var xmlDoc = xmlhttp.responseXML;
    
    // TODO: version checks etc
    
    // Parse the xml until it's loaded
    var rootNode = xmlDoc.documentElement;
    while (!this.loaded) {
        this.loaded = true;
        this.parseRootNode(rootNode);       
    }
}

Mod.prototype.parseRootNode = function(rootNode) {
    for (var i = 0; i < rootNode.childNodes.length; i++) {
        var childNode = rootNode.childNodes[i];
        switch (rootNode.childNodes[i].nodeName) {
            case "spriteTemplates":
                this.parseTemplateCollectionNode(childNode, "spriteTemplate");
                break;
            case "decorationTemplates":
                this.parseTemplateCollectionNode(childNode, "decorationTemplate");
                break;
            case "enemyTemplates":
                this.parseTemplateCollectionNode(childNode, "enemyTemplate");
                break;
            case "weaponTemplates":
                this.parseTemplateCollectionNode(childNode, "weaponTemplate");
                break;
            case "levelTemplates":
                this.parseTemplateCollectionNode(childNode, "levelTemplate");
                break;
            case "player":
                // TODO: do something here
                break;
            default:
                break;
        }
    }
}

Mod.prototype.parseTemplateCollectionNode = function(node, childrenNodeName) {
    for (var i = 0; i < node.childNodes.length; i++) {
        this.parseTemplateNode(node.childNodes[i], childrenNodeName);
    }
}

Mod.prototype.parseTemplateNode = function(node, nodeName) {
    if (node.nodeName != nodeName) {
        return;
    }
    
    var templateType;
    var templateList;
    var parseFunc;
    
    switch (nodeName) {
        case "spriteTemplate":
            templateType = SpriteTemplate;
            templateList = this.spriteTemplates;
            parseFunc = this.parseSpriteTemplateNode;
            break;
        case "decorationTemplate":
            templateType = DecorationTemplate;
            templateList = this.decorationTemplates;
            parseFunc = this.parseDecorationTemplateNode;
            return;
            break;
        case "enemyTemplate":
            templateType = EnemyTemplate;
            templateList = this.enemyTemplates;
            parseFunc = this.parseEnemyTemplateNode;
            return;
            break;
        case "weaponTemplate":
            templateType = WeaponTemplate;
            templateList = this.weaponTemplates;
            parseFunc = this.parseWeaponTemplateNode;
            return;
            break;
        case "levelTemplate":
            templateType = LevelTemplate;
            templateList = this.levelTemplates;
            parseFunc = this.parseLevelTemplateNode;
            return;
            break;
        default:
            return;
    }
    
    var entitySrcName = node.getAttribute('src');
    var entityName = node.getAttribute('name');
    
    var entity = null;
    var entitySrc = null;
    
    // If this entity has already been loaded, return it
    entity = templateList[entityName];
    if (entity != null) {
        return entity;
    }
    
    // If there is a src attribute, fetch the source entity
    if (entitySrcName != null) {
        entitySrc = templateList[entitySrcName];
        // If the source hasn't been loaded yet, we'll need another pass
        if (entitySrc == null) {
            this.loaded = false;
            return;
        }
    }

    // If this node has no children, we don't need to create a new entity
    if (node.childNodes.length == 0) {
        return entitySrc;
    }
    
    // Create a new entity or create a copy of the source entity
    if (entitySrc == null) {
        entity = new templateType();
    } else {
        // TODO: entity = entitySrc.clone();   
    }
    
    // Call template specific function to parse node data into entity
    parseFunc.call(this, node, entity);
    
    // If this entity has a name, store this entity in the list
    if (entityName != null) {
        templateList[entityName] = entity;
    }
}

Mod.prototype.parseSpriteTemplateNode = function(node, entity) {
    for (var i = 0; i < node.childNodes.length; i++) {
        var childNode = node.childNodes[i];
        
        switch (childNode.nodeName) {
            case "images":
                var imageNodes = childNode.getElementsByTagName("image");
                for (var j = 0; j < imageNodes.length; j++) {
                    var image = new Image();
                    image.src = imageNodes[j].childNodes[0].nodeValue;
                    entity.images.push(image);
                }
                break;
            default:    
                break;
        }
    }
}

Mod.prototype.parseDecorationTemplateNode = function(node, entity) {
    for (var i = 0; i < node.childNodes.length; i++) {
        var childNode = node.childNodes[i];
        
        switch (childNode.nodeName) {
            case "spriteTemplate":
                entity.spriteTemplate = parseTemplateNode(childNode, 'spriteTemplate');
                break;
            case "speed":
                entity.speed = childNode.childNodes[0].nodeValue;
                break;
            case "turningSpeed":
                entity.turningSpeed = childNode.childNodes[0].nodeValue;
                break;
            default:    
                break;
        }
    }
}

Mod.prototype.parseEnemyTemplateNode = function(node, entity) {
    for (var i = 0; i < node.childNodes.length; i++) {
        var childNode = node.childNodes[i];
        
        switch (childNode.nodeName) {
            case "spriteTemplate":
                entity.spriteTemplate = parseTemplateNode(childNode, 'spriteTemplate');
                break;
            case "speed":
                entity.speed = childNode.childNodes[0].nodeValue;
                break;
            default:    
                break;
        }
    }
}

Mod.prototype.parseWeaponTemplateNode = function(node, entity) {
    for (var i = 0; i < node.childNodes.length; i++) {
        var childNode = node.childNodes[i];
        
        switch (childNode.nodeName) {
            case "spriteTemplate":
                entity.spriteTemplate = parseTemplateNode(childNode, 'spriteTemplate');
                break;
            case "reloadTime":
                entity.reloadTime = childNode.childNodes[0].nodeValue;
                break;
            case "speed":
                entity.speed = childNode.childNodes[0].nodeValue;
                break;
            case "damage":
                entity.damage = childNode.childNodes[0].nodeValue;
                break;
            default:    
                break;
        }
    }
}

Mod.prototype.parseLevelTemplateNode = function(node, entity) {
    for (var i = 0; i < node.childNodes.length; i++) {
        var childNode = node.childNodes[i];
        
        switch (childNode.nodeName) {
            case "entityFactory":
                var template;
                var avgNumPerSecond;
                var initialAngle;
                
                for (var j = 0; j < childNode.childNodes.length; j++) {
                    var efChildNode = childNode.childNodes[j];
                    switch (efChildNode.nodeName) {
                        case "avgNumPerSecond":
                            avgNumPerSecond = efChildNode.childNodes[0].nodeValue;
                            break;
                        case "initialAngle":
                            initialAngle = efChildNode.childNodes[0].nodeValue;
                            break;
                            
                        case "decorationTemplate":
                        case "enemyTemplate":
                            template = parseTemplateNode(efChildNode, efChildNode.nodeName);
                            break;
                        default:
                            break;
                    }
                }
                
                var entityFactory = new EntityFactory(template, avgNumPerSecond);
                entityFactory.initialAngle = initialAngle;
                entity.entityFactories.push(entityFactory);
                break;
            default:    
                break;
        }
    }
}

