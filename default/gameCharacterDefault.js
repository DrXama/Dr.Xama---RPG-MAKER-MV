//-----------------------------------------------------------------------------
// Game_Pattern
//
// The object class of Game_Pattern.

function Game_Pattern() {
    this.initialize.apply(this, arguments);
}

Game_Pattern.prototype = Object.create(Game_Character.prototype);
Game_Pattern.prototype.constructor = Game_Pattern;

Game_Pattern.prototype.initialize = function(characterName, characterIndex, x, y, d) {
    Game_Character.prototype.initialize.call(this);
    this.setupDefaults(characterName, characterIndex, x, y, d);
};

Game_Pattern.prototype.setupDefaults = function(characterName, characterIndex, x, y, d) {
    this.setDirection(d);
    this.locate(x, y);
    this.setImage(characterName, characterIndex);
};
