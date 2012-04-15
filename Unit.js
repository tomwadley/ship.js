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
 
 
Unit.prototype = new Entity();
Unit.prototype.constructor = Entity;
function Unit() {
    this.fireIfPossible = false;
    
    this.hitPoints = 0;

    this.weapons_ = null;
    this.dying_ = false;
}

Unit.prototype.canCollide = function() {
    return !this.dying_;
}

Unit.prototype.takeDamage = function(hitPoints) {
    this.hitPoints -= hitPoints;
    
    if (this.hitPoints <= 0) {
        this.startDying();
        return true;
    }
    return false;
}

Unit.prototype.playCollissionSound = function() {
    if (this.template.collissionSound != null) {
        playSound(this.template.collissionSound)
    }
}

Unit.prototype.startDying = function() {
    if (this.dying_) {
        return;
    }
    this.dying_ = true;

    this.sprite = new Sprite(this.template.spriteTemplateDead);
    this.sprite.loop = false;
    this.speed = 0;

    if (this.template.deadSound != null) {
        playSound(this.template.deadSound)
    }
}

Unit.prototype.isDead = function() {
    if (this.dying_) {
        return this.sprite.animationEnded;
    }
    return this.hitPoints <= 0 || Entity.prototype.isDead.call(this);
}

Unit.prototype.getSpriteTemplateDead = function() {}

Unit.prototype.addWeapon = function(weapon) {
    if (this.weapons_ == null) {
        this.weapons_ = [];
    }
    this.weapons_[this.weapons_.length] = weapon;
}

Unit.prototype.update = function(delta) {
    if (this.weapons_ != null) {
        for (var i = 0; i < this.weapons_.length; i++) {
            this.weapons_[i].update(delta);

            if (this.fireIfPossible && this.weapons_[i].canWeaponFire()) {
                this.weapons_[i].fireIfPossible();
            }
        }
    }

    Entity.prototype.update.call(this, delta);
}

