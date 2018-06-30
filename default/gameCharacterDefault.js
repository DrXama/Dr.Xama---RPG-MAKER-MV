//-----------------------------------------------------------------------------
// Game_CharacterDefault
//
function Game_CharacterDefault() {
    this.initialize.apply(this, arguments);
}

Game_CharacterDefault.prototype = Object.create(Game_Character.prototype);
Game_CharacterDefault.prototype.constructor = Game_CharacterDefault;

Game_CharacterDefault.prototype.initialize = function (characterName, characterIndex, x, y, d) {
    Game_Character.prototype.initialize.call(this);
    this.setupDefaults(characterName, characterIndex, x, y, d);
};

Game_CharacterDefault.prototype.setupDefaults = function (characterName, characterIndex, x, y, d) {
    this.setDirection(d);
    this.locate(x, y);
    this.setImage(characterName, characterIndex);
};
