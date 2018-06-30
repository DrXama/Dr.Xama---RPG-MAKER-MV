//-----------------------------------------------------------------------------
// Sprite_Default
//
function Sprite_Default() {
    this.initialize.apply(this, arguments);
}

Sprite_Default.prototype = Object.create(Sprite_Base.prototype);
Sprite_Default.prototype.constructor = Sprite_Default;

Sprite_Default.prototype.initialize = function (bitmap) {
    Sprite_Base.prototype.initialize.call(this);
    this.initMembers();
    this.setBitmap(bitmap);
};

Sprite_Default.prototype.initMembers = function () {
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this._realX = 66;
    this._realY = 10;
};

Sprite_Default.prototype.update = function () {
    Sprite_Base.prototype.update.call(this);
    this.updatePosition();
};

Sprite_Default.prototype.setBitmap = function (bitmap) {
    this.bitmap = bitmap;
};

Sprite_Default.prototype.scrolledX = function () {
    return $gameMap.adjustX(this._realX);
};

Sprite_Default.prototype.scrolledY = function () {
    return $gameMap.adjustY(this._realY);
};

Sprite_Default.prototype.screenX = function () {
    var tw = $gameMap.tileWidth();
    return Math.round(this.scrolledX() * tw + tw / 2);
};

Sprite_Default.prototype.screenY = function () {
    var th = $gameMap.tileHeight();
    return Math.round(this.scrolledY() * th + th);
};

Sprite_Default.prototype.screenZ = function () {
    return 1;
};

Sprite_Default.prototype.updatePosition = function () {
    this.x = this.screenX();
    this.y = this.screenY();
    this.z = this.screenZ();
};
