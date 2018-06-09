//-----------------------------------------------------------------------------
// Window_CommandDefault
//

function Window_CommandDefault() {
    this.initialize.apply(this, arguments);
}

Window_CommandDefault.prototype = Object.create(Window_Command.prototype);
Window_CommandDefault.prototype.constructor = Window_CommandDefault;

Window_CommandDefault.prototype.initialize = function (x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
};

Window_CommandDefault.prototype.windowWidth = function () {
    return 240;
};

Window_CommandDefault.prototype.numVisibleRows = function () {
    return this.maxItems();
};

Window_CommandDefault.prototype.makeCommandList = function () {
    this.addMainCommands();
};

Window_CommandDefault.prototype.addMainCommands = function () {
    this.addCommand('Teste', 'item');
};
