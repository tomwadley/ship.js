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
 
 
function Level(levelTemplate) {
    this.template = levelTemplate
}

function LevelTemplate() {
    this.duration = 0;
    this.entityFactories = [];
}

LevelTemplate.prototype.clone = function() {
    var clone = new LevelTemplate();
    clone.duration = this.duration;
    for (var i = 0; i < this.entityFactories.length; i++) {
        clone.entityFactories.push(this.entityFactories[i]);
    }
    return clone;
}

