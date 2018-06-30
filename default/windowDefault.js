//-----------------------------------------------------------------------------
// Window_Default
//
function Window_Default() {
    this.initialize.apply(this, arguments);
}

Window_Default.prototype = Object.create(Window_Base.prototype);
Window_Default.prototype.constructor = Window_Default;

Window_Default.prototype.initialize = function (x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_Default.prototype.windowWidth = function () {
    return 240;
};

Window_Default.prototype.windowHeight = function () {
    return this.fittingHeight(1);
};

Window_Default.prototype.refresh = function () {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
};
