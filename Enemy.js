/*
 * Copyright (c) 2012 Tom Wadley, http://tomwadley.net/ship.js/
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
 
 
Enemy.prototype = new Unit();
Enemy.prototype.constructor = Unit;
function Enemy(enemyTemplate) {
    this.template = enemyTemplate;
    
    this.sprite = new Sprite(this.template.spriteTemplate);
    this.speed = this.template.speed;
    this.hitPoints = this.template.hitPoints;

    if (this.template.weaponTemplates != null) {
        for (var i = 0; i < this.template.weaponTemplates.length; i++) {
            this.addWeapon(new Weapon(this.template.weaponTemplates[i], this));
        }
    }

    this.fireIfPossible = true;
}

Enemy.prototype.entityType = "Enemy";

Enemy.prototype.getSpriteTemplateDead = function() {
    return this.template.spriteTemplateDead;
}

function EnemyTemplate() {
    this.spriteTemplate = null;
    this.spriteTemplateDead = null;
    this.weaponTemplates = null;
    this.speed = 0;
    this.hitPoints = 0;
    this.cash = 0;
    this.deadSound = null;
    this.collissionSound = null;
}

EnemyTemplate.prototype.generate = function() {
    return new Enemy(this);
}

EnemyTemplate.prototype.clone = function() {
    var clone = new EnemyTemplate();
    clone.spriteTemplate = this.spriteTemplate;
    clone.spriteTemplateDead = this.spriteTemplateDead;
    clone.weaponTemplates = this.weaponTemplates == null ? null : this.weaponTemplates.slice(0);
    clone.speed = this.speed;
    clone.hitPoints = this.hitPoints;
    clone.cash = this.cash;
    clone.deadSound = this.deadSound;
    return clone;
}

