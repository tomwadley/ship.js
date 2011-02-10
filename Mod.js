/*
 * This file is part of Ship.
 * Copyright (C) 2010  Tom Wadley
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 
 
function Mod(modURI) {
    
    this.modURI = modURI;
    
    this.parsed = false;
    
    this.spriteTemplates = new Object();
    this.soundTemplates = new Object();
    this.decorationTemplates = new Object();
    this.enemyTemplates = new Object();
    this.weaponTemplates = new Object();
    this.levelTemplates = new Object();
    this.playerTemplate = null;

    this.onLoad = null;
    this.onError = null;

    this.imagesLoaded = [];
    this.audiosLoaded = [];
    this.loaded = false;
}

Mod.prototype.load = function() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", this.modURI, false);
    xmlhttp.send();
    
    var xmlDoc = xmlhttp.responseXML;
    
    // TODO: version checks etc
    
    // Parse the xml until it's loaded
    var rootNode = xmlDoc.documentElement;
    while (!this.parsed) {
        this.parsed = true;
        this.parseRootNode(rootNode);
    }
}

Mod.prototype.isLoaded = function() {
    if (this.loaded) {
        return true;
    }

    if (this.loadPrc() == 1) {
        return true;
    }
}

Mod.prototype.loadPrc = function() {
    var loadedCount = 0;
    var total = this.imagesLoaded.length + this.audiosLoaded.length;
    var i;

    for (i = 0; i < this.imagesLoaded.length; i++) {
        if (this.imagesLoaded[i]) {
            loadedCount++;
        }
    }

    for (i = 0; i < this.audiosLoaded.length; i++) {
        if (this.audiosLoaded[i].readyState > 2) {
            loadedCount++;
        }
    }

    if (loadedCount == total) {
        this.loaded = true;
        this.imagesLoaded = [];
        this.audiosLoaded = [];
        return 1;
    }
    return loadedCount / total;
}

Mod.prototype.watchImageAsset = function(image) {
    var nextIndex = this.imagesLoaded.length;
    var imagesLoaded = this.imagesLoaded;

    imagesLoaded[nextIndex] = false;
    
    image.onload = function() {
        imagesLoaded[nextIndex] = true;
    };
}

Mod.prototype.watchAudioAsset = function(audio) {
    var nextIndex = this.audiosLoaded.length;
    var audiosLoaded = this.audiosLoaded;

    audiosLoaded[nextIndex] = audio;
}

Mod.prototype.parseRootNode = function(rootNode) {
    for (var i = 0; i < rootNode.childNodes.length; i++) {
        var childNode = rootNode.childNodes[i];
        switch (rootNode.childNodes[i].nodeName) {
            case "spriteTemplates":
                this.parseTemplateCollectionNode(childNode, "spriteTemplate");
                break;
            case "soundTemplates":
                this.parseTemplateCollectionNode(childNode, "soundTemplate");
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
            case "playerTemplate":
                if (!this.parsePlayerTemplateNode(childNode)) {
                    this.parsed = false;
                }    
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
    if (node.nodeType != Node.ELEMENT_NODE) {
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
        case "soundTemplate":
            templateType = SoundTemplate;
            templateList = this.soundTemplates;
            parseFunc = this.parseSoundTemplateNode;
            break;
        case "decorationTemplate":
            templateType = DecorationTemplate;
            templateList = this.decorationTemplates;
            parseFunc = this.parseDecorationTemplateNode;
            break;
        case "enemyTemplate":
            templateType = EnemyTemplate;
            templateList = this.enemyTemplates;
            parseFunc = this.parseEnemyTemplateNode;
            break;
        case "weaponTemplate":
            templateType = WeaponTemplate;
            templateList = this.weaponTemplates;
            parseFunc = this.parseWeaponTemplateNode;
            break;
        case "levelTemplate":
            templateType = LevelTemplate;
            templateList = this.levelTemplates;
            parseFunc = this.parseLevelTemplateNode;
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
            this.parsed = false;
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
        entity = entitySrc.clone();
    }
    
    // Call template specific function to parse node data into entity
    if (!parseFunc.call(this, node, entity)) {
        // A referenced entity isn't loaded yet, we'll need another pass
        this.parsed = false;
        return;
    }
    
    // If this entity has a name, store this entity in the list
    if (entityName != null) {
        templateList[entityName] = entity;
    }
    
    return entity;
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
                    this.watchImageAsset(image);
                    entity.images.push(image);
                }
                break;
            default:    
                break;
        }
    }
    
    return true;
}

Mod.prototype.parseSoundTemplateNode = function(node, entity) {
    entity.filename = node.childNodes[0].nodeValue;
    
    var audio = entity.createAudioElement();
    // TODO: Uncomment this when FF4 is released. FF3.6 hangs at the loading screen with this.
    //this.watchAudioAsset(audio);

    return true;
}

Mod.prototype.parseDecorationTemplateNode = function(node, entity) {
    for (var i = 0; i < node.childNodes.length; i++) {
        var childNode = node.childNodes[i];
        
        switch (childNode.nodeName) {
            case "spriteTemplate":
                entity.spriteTemplate = this.parseTemplateNode(childNode, 'spriteTemplate');
                break;
            case "speed":
                entity.speed = parseFloat(childNode.childNodes[0].nodeValue);
                break;
            case "turningSpeed":
                entity.turningSpeed = parseFloat(childNode.childNodes[0].nodeValue);
                break;
            default:    
                break;
        }
    }
    
    if (entity.spriteTemplate == null) {
        return false;
    }
    return true;
}

Mod.prototype.parseEnemyTemplateNode = function(node, entity) {
    var weaponTemplatesLoaded = true;
    for (var i = 0; i < node.childNodes.length; i++) {
        var childNode = node.childNodes[i];
        
        switch (childNode.nodeName) {
            case "spriteTemplate":
                entity.spriteTemplate = this.parseTemplateNode(childNode, 'spriteTemplate');
                break;
            case "spriteTemplateDead":
                entity.spriteTemplateDead = this.parseTemplateNode(childNode, 'spriteTemplate');
                break;
            case "weaponTemplate":
                weaponTemplatesLoaded = false;
                var weaponTemplate = this.parseTemplateNode(childNode, 'weaponTemplate');
                if (weaponTemplate != null) {
                    if (entity.weaponTemplates == null) {
                        entity.weaponTemplates = [];
                    }
                    entity.weaponTemplates[entity.weaponTemplates.length] = weaponTemplate;
                    weaponTemplatesLoaded = true;
                }
                break;
            case "speed":
                entity.speed = parseFloat(childNode.childNodes[0].nodeValue);
                break;
            case "hitPoints":
                entity.hitPoints = parseInt(childNode.childNodes[0].nodeValue);
                break;
            case "cash":
                entity.cash = parseInt(childNode.childNodes[0].nodeValue);
                break;
            case "deadSound":
                entity.deadSound = this.parseTemplateNode(childNode, 'soundTemplate');
                break;
            case "collissionSound":
                entity.collissionSound = this.parseTemplateNode(childNode, 'soundTemplate');
                break;
            default:    
                break;
        }
    }
    
    if (entity.spriteTemplate == null || entity.spriteTemplateDead == null || !weaponTemplatesLoaded) {
        return false;
    }
    return true;
}

Mod.prototype.parseWeaponTemplateNode = function(node, entity) {
    for (var i = 0; i < node.childNodes.length; i++) {
        var childNode = node.childNodes[i];
        
        switch (childNode.nodeName) {
            case "spriteTemplate":
                entity.spriteTemplate = this.parseTemplateNode(childNode, 'spriteTemplate');
                break;
            case "spriteTemplateDead":
                entity.spriteTemplateDead = this.parseTemplateNode(childNode, 'spriteTemplate');
                break;
            case "reloadTime":
                entity.reloadTime = parseFloat(childNode.childNodes[0].nodeValue);
                break;
            case "speed":
                entity.speed = parseFloat(childNode.childNodes[0].nodeValue);
                break;
            case "damage":
                entity.damage = parseInt(childNode.childNodes[0].nodeValue);
                break;
            case "xPositionPrc":
                entity.xPositionPrc = parseFloat(childNode.childNodes[0].nodeValue);
                break;
            case "yPositionPrc":
                entity.yPositionPrc = parseFloat(childNode.childNodes[0].nodeValue);
                break;
            case "offsetAngle":
                entity.offsetAngle = parseFloat(childNode.childNodes[0].nodeValue);
                break;
            case "fireSound":
                entity.fireSound = this.parseTemplateNode(childNode, 'soundTemplate');
                break;
            default:    
                break;
        }
    }
    
    if (entity.spriteTemplate == null || entity.spriteTemplateDead == null) {
        return false;
    }
    return true;
}

Mod.prototype.parseLevelTemplateNode = function(node, entity) {
    var loaded = true;
    
    for (var i = 0; i < node.childNodes.length; i++) {
        var childNode = node.childNodes[i];
        
        switch (childNode.nodeName) {
            case "entityFactory":
                var template;
                var avgNumPerSecond;
                var spawnFrom;
                var initialAngle;
                
                for (var j = 0; j < childNode.childNodes.length; j++) {
                    var efChildNode = childNode.childNodes[j];
                    
                    switch (efChildNode.nodeName) {
                        case "avgNumPerSecond":
                            avgNumPerSecond = parseFloat(efChildNode.childNodes[0].nodeValue);
                            break;
                        case "spawnFrom":
                            spawnFrom = efChildNode.childNodes[0].nodeValue;
                            break;
                        case "initialAngle":
                            initialAngle = parseFloat(efChildNode.childNodes[0].nodeValue);
                            break;
                            
                        case "decorationTemplate":
                        case "enemyTemplate":
                            template = this.parseTemplateNode(efChildNode, efChildNode.nodeName);
                            break;
                        default:
                            break;
                    }
                }
                
                var entityFactory = new EntityFactory(template, avgNumPerSecond);
                entityFactory.spawnFrom = EntityFactory.spawnFromEnum[spawnFrom.toUpperCase()];
                entityFactory.initialAngle = initialAngle;
                entity.entityFactories.push(entityFactory);
                if (entityFactory.template == null) {
                    loaded = false;
                }
                break;
            default:    
                break;
        }
    }
    
    return loaded;
}

Mod.prototype.parsePlayerTemplateNode = function(node) {
    var entity = new PlayerTemplate();
    var weaponTemplatesLoaded = true;
    
    for (var i = 0; i < node.childNodes.length; i++) {
        var childNode = node.childNodes[i];
        
        switch (childNode.nodeName) {
            case "spriteTemplate":
                entity.spriteTemplate = this.parseTemplateNode(childNode, 'spriteTemplate');
                break;
            case "spriteTemplateDead":
                entity.spriteTemplateDead = this.parseTemplateNode(childNode, 'spriteTemplate');
                break;
            case "weaponTemplate":
                weaponTemplatesLoaded = false;
                var weaponTemplate = this.parseTemplateNode(childNode, 'weaponTemplate');
                if (weaponTemplate != null) {
                    if (entity.weaponTemplates == null) {
                        entity.weaponTemplates = [];
                    }
                    entity.weaponTemplates[entity.weaponTemplates.length] = weaponTemplate;
                    weaponTemplatesLoaded = true;
                }
                break;
            case "speed":
                entity.speed = parseFloat(childNode.childNodes[0].nodeValue);
                break;
            case "hitPoints":
                entity.hitPoints = parseInt(childNode.childNodes[0].nodeValue);
                break;
            case "deadSound":
                entity.deadSound = this.parseTemplateNode(childNode, 'soundTemplate');
                break;
            case "collissionSound":
                entity.collissionSound = this.parseTemplateNode(childNode, 'soundTemplate');
                break;
            default:    
                break;
        }
    }
    
    this.playerTemplate = entity;
    
    if (entity.spriteTemplate == null || entity.spriteTemplateDead == null || !weaponTemplatesLoaded) {
        return false;
    }
    return true;
}

