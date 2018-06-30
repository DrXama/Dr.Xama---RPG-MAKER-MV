//-----------------------------------------------------------------------------
// Scene_Default
//
function Scene_Default() {
    this.initialize.apply(this, arguments);
}

Scene_Default.prototype = Object.create(Scene_Base.prototype);
Scene_Default.prototype.constructor = Scene_Default;

Scene_Default.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
};

Scene_Default.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createWindowLayer();
};

Scene_Default.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this.addChild(this._backgroundSprite);
};

Scene_Default.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    this.startFadeIn(this.fadeSpeed(), false);
};

Scene_Default.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
};