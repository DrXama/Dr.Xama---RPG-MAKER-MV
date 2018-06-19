//==================================================================================================
// DrXama_multiplayerLocal.js
//==================================================================================================
/*:
 * @plugindesc v1.00 - Esse plugin permite que possa ter dois jogadores controláveis
 *
 * @author Dr.Xamã
 * 
 * @help
 * ================================================================================
 *    Introdução
 * ================================================================================
 * O segundo jogador escolhe um membro do grupo para controlar e o coop começa!
 * ================================================================================
 *    Atualização
 * ================================================================================
 * Para atualizar esse plugin vá no site/github do Dr.Xamã!
 * - Site: http://drxama.epizy.com/?page_id=299
 * - Github: https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV
 */
(function () {
    "use strict";
    // ----------------------------------------------------------------------------
    // Base
    //
    function localPath(p) {
        // Retira uma parte da string
        if (p.substring(0, 1) === '/') p = p.substring(1);
        // Importa o modulo PATH do Node
        var path = require('path');
        // Cria a base para o caminho local
        var base = path.dirname(process.mainModule.filename);
        // Retorna a base do caminho associado ao caminho
        return path.join(base, p);
    };

    function localPathExists(p) {
        var fs = require('fs'),
            i = 0,
            length = p.length,
            path = false,
            paths = [],
            pathString = '';
        for (; i < length; i++) {
            let letter = String(p[i]);
            if (letter != '/') {
                pathString += letter;
            }
            if (letter == '/' || i == length - 1) {
                paths.push(pathString);
                var pathsJoin = paths.join("/");
                if (fs.existsSync(localPath(pathsJoin))) {
                    path = true;
                } else {
                    path = false;
                }
                pathString = '';
            }
        }
        return path;
    };

    function localPathCreate(p) {
        var fs = require('fs'),
            i = 0,
            length = p.length,
            paths = [],
            pathString = '';
        for (; i < length; i++) {
            let letter = String(p[i]);
            if (letter != '/') {
                pathString += letter;
            }
            if (letter == '/' || i == length - 1) {
                paths.push(pathString);
                var pathsJoin = paths.join("/");
                if (!fs.existsSync(localPath(pathsJoin))) {
                    fs.mkdirSync(localPath(pathsJoin));
                }
                pathString = '';
            }
        }
    };

    // ----------------------------------------------------------------------------
    // Input
    //
    const __input__initialize = Input.initialize;
    Input.initialize = function () {
        __input__initialize.call(this);
        this._fileSettings();
    };

    const __input__clear = Input.clear;
    Input.clear = function () {
        __input__clear.call(this);
        this._latestButtonInputId = null;
    };

    Input._fileSettings = function () {
        var fs = require('fs'),
            path = 'system/multiplayerLocal/save',
            file = localPath(`${path}\\settings.drxamasave`);
        if (!localPathExists(path))
            localPathCreate(path);
        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, JSON.stringify({
                'inputId': { // Indentificador de cada jogador no teclado
                    'player_1': null, // valor padrão é null
                    'player_2': 0,
                    'player_3': 1,
                    'player_4': 2
                },
                'inputOwner': 'player_1', // Defina quem controla o teclado
                'inputMenuCall': 112, // Defina a tecla que chama o menu, padrão é F1
                'gamepadOrder': { // Defina a ordem dos controles
                    0: 'player_1', // Controle 1
                    1: 'player_2', // Controle 2
                    2: 'player_3', // Controle 3
                    3: 'player_4' // Controle 4
                },
                'gamepadButtons': {
                    0: 'ok',        // Botão A
                    1: 'cancel',    // Botão B
                    2: 'tab',       // Botão X
                    3: 'escape',    // Botão Y
                    4: 'shift',     // Botão LB 1
                    5: 'control',   // Botão RB 1
                    6: 'pageup',    // Botão LB 2
                    7: 'pagedown',  // Botão RB 2
                    8: 'debug',     // Select
                    9: 'menu',      // Start
                    10: 'shift',    // Clique do analogico esquerdo
                    11: '',         // Clique do analogico direito
                    12: 'up',       // D-pad up
                    13: 'down',     // D-pad down
                    14: 'left',     // D-pad left
                    15: 'right',    // D-pad right
                }
            }, null, 2));
        }
        file = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }) || {});
        // DEFAULT VALUES
        if (file.inputId instanceof Object === false) {
            file.inputId = {
                'player_1': null,
                'player_2': 0,
                'player_3': 1,
                'player_4': 2
            }
        }
        if (file.inputOwner instanceof String === false) {
            file.inputOwner = 'player_1';
        }
        if (file.inputMenuCall instanceof Number === false) {
            file.inputMenuCall = 112;
        }
        if (file.gamepadOrder instanceof Object === false) {
            file.gamepadOrder = {
                0: 'player_1',
                1: 'player_2',
                2: 'player_3',
                3: 'player_4'
            }
        }
        if (file.gamepadButtons instanceof Object === false) {
            file.gamepadButtons = {
                0: 'ok',
                1: 'cancel',
                2: 'tab',
                3: 'escape',
                4: 'shift',
                5: 'control',
                6: 'pageup',
                7: 'pagedown',
                8: 'debug',
                9: 'menu',
                10: 'shift',
                11: '',
                12: 'up',
                13: 'down',
                14: 'left',
                15: 'right',
            }
        }
        // DEFINE VALUES
        this._inputId = file.inputId;
        this._inputOwner = file.inputOwner;
        Input.keyMapper[file.inputMenuCall] = 'menuMultiplayerLocal';
        this._gamepadOrder = file.gamepadOrder;
        Input.gamepadMapper = file.gamepadButtons;
    };

    Input._fileSettings_gamepadButtonsUpdate = function () {
        var fs = require('fs'),
            path = 'system/multiplayerLocal/save',
            file = localPath(`${path}\\settings.drxamasave`),
            data = null;
        if (!fs.existsSync(file)) return;
        data = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }) || {});
        data.gamepadButtons = Input.gamepadMapper;
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    };

    Input._onKeyDown = function (event) {
        if (this._shouldPreventDefault(event.keyCode)) {
            event.preventDefault();
        }
        if (event.keyCode === 144) {    // Numlock
            this.clear();
        }
        var buttonName = this.keyMapper[event.keyCode];
        if (ResourceHandler.exists() && buttonName === 'ok') {
            ResourceHandler.retry();
        } else if (buttonName) {
            this._currentState[buttonName] = true;
            this._latestButtonInputId = this._inputId[this._inputOwner];
        }
    };

    Input.isPressed = function (keyName, inputId) {
        if (!inputId) inputId = this._latestButtonInputId;
        if (this._isEscapeCompatible(keyName) && this.isPressed('escape', inputId)) {
            return true;
        } else {
            return !!this._currentState[keyName] && this._latestButtonInputId === inputId;
        }
    };

    Input.isTriggered = function (keyName, inputId) {
        if (!inputId) inputId = this._latestButtonInputId;
        if (this._isEscapeCompatible(keyName) && this.isTriggered('escape', inputId)) {
            return true;
        } else {
            return this._latestButton === keyName
                && this._latestButtonInputId === inputId
                && this._pressedTime === 0;
        }
    };

    Input.isRepeated = function (keyName, inputId) {
        if (!inputId) inputId = this._latestButtonInputId;
        if (this._isEscapeCompatible(keyName) && this.isRepeated('escape', inputId)) {
            return true;
        } else {
            return (this._latestButton === keyName
                && this._latestButtonInputId === inputId
                && (this._pressedTime === 0 ||
                    (this._pressedTime >= this.keyRepeatWait &&
                        this._pressedTime % this.keyRepeatInterval === 0)));
        }
    };

    Input.isLongPressed = function (keyName, inputId) {
        if (!inputId) inputId = this._latestButtonInputId;
        if (this._isEscapeCompatible(keyName) && this.isLongPressed('escape', inputId)) {
            return true;
        } else {
            return (this._latestButton === keyName
                && this._latestButtonInputId === inputId
                && this._pressedTime >= this.keyRepeatWait);
        }
    };

    Input._updateGamepadState = function (gamepad) {
        var lastState = this._gamepadStates[gamepad.index] || [];
        var newState = [];
        var buttons = gamepad.buttons;
        var axes = gamepad.axes;
        var threshold = 0.5;
        newState[12] = false;
        newState[13] = false;
        newState[14] = false;
        newState[15] = false;
        for (var i = 0; i < buttons.length; i++) {
            newState[i] = buttons[i].pressed;
        }
        if (axes[1] < -threshold) {
            newState[12] = true;    // up
        } else if (axes[1] > threshold) {
            newState[13] = true;    // down
        }
        if (axes[0] < -threshold) {
            newState[14] = true;    // left
        } else if (axes[0] > threshold) {
            newState[15] = true;    // right
        }
        for (var j = 0; j < newState.length; j++) {
            if (newState[j] !== lastState[j]) {
                var buttonName = this.gamepadMapper[j];
                if (buttonName) {
                    this._currentState[buttonName] = newState[j];
                    if (newState[j])
                        this._latestButtonInputId = this._inputId[this._gamepadOrder[gamepad.index]];
                }
            }

        }
        this._gamepadStates[gamepad.index] = newState;
    };

    //-----------------------------------------------------------------------------
    // Scene_Map
    //  
    const __scene__map__update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        __scene__map__update.call(this);
        if (Input.isPressed('menuMultiplayerLocal')) {
            SceneManager.push(Scene_menuMultiplayerLocal);
        }
    };

    //-----------------------------------------------------------------------------
    // ImageManager
    //    
    ImageManager.reserveMultiplayerLocalIMG = function (filename, hue, reservationId) {
        return this.reserveBitmap('system/multiplayerLocal/img/', filename, hue, true, reservationId);
    };

    ImageManager.loadMultiplayerLocalIMG = function (filename, hue) {
        return this.loadBitmap('system/multiplayerLocal/img/', filename, hue, true);
    };

    // ----------------------------------------------------------------------------
    // MENU GERAL
    // Esse menu é essencial para configurar o sistema
    //

    //-----------------------------------------------------------------------------
    // Scene_menuMultiplayerLocalMultiplayerLocal
    //
    function Scene_menuMultiplayerLocal() {
        this.initialize.apply(this, arguments);
    }

    Scene_menuMultiplayerLocal.prototype = Object.create(Scene_Base.prototype);
    Scene_menuMultiplayerLocal.prototype.constructor = Scene_menuMultiplayerLocal;

    Scene_menuMultiplayerLocal.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);
    };

    Scene_menuMultiplayerLocal.prototype.start = function () {
        Scene_Base.prototype.start.call(this);
        this._menuWindow.refresh();
        this._selectGamepadWindow.refresh();
    };

    Scene_menuMultiplayerLocal.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createWindowLayer();
        this.createMenuWindow();
        this.createSelectGamepadWindow();
    };

    Scene_menuMultiplayerLocal.prototype.createBackground = function () {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };

    Scene_menuMultiplayerLocal.prototype.createMenuWindow = function () {
        this._menuWindow = new Window_menuMultiplayerLocal();
        this._menuWindow.setHandler('gamepadConfig', this.showSelectGamepad.bind(this));
        this.addWindow(this._menuWindow);
    };

    Scene_menuMultiplayerLocal.prototype.createSelectGamepadWindow = function () {
        this._selectGamepadWindow = new Window_selectGamePadMultiplayerLocal();
        this.addWindow(this._selectGamepadWindow);
    };

    Scene_menuMultiplayerLocal.prototype.showSelectGamepad = function () {
        this._menuWindow.hide();
        this._selectGamepadWindow.refresh();
        this._selectGamepadWindow.show();
    };

    Scene_menuMultiplayerLocal.prototype.hideSelectGamepad = function () {
        this._selectGamepadWindow.hide();
        this._menuWindow.activate();
        this._menuWindow.show();
    };

    //-----------------------------------------------------------------------------
    // Window_menuMultiplayerLocal
    //
    function Window_menuMultiplayerLocal() {
        this.initialize.apply(this, arguments);
    }

    Window_menuMultiplayerLocal.prototype = Object.create(Window_Command.prototype);
    Window_menuMultiplayerLocal.prototype.constructor = Window_menuMultiplayerLocal;

    Window_menuMultiplayerLocal.prototype.initialize = function () {
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.loadImages();
    };

    Window_menuMultiplayerLocal.prototype.loadImages = function () {
        ImageManager.reserveMultiplayerLocalIMG('menu');
    };

    Window_menuMultiplayerLocal.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    };

    Window_menuMultiplayerLocal.prototype.windowHeight = function () {
        return Graphics.boxHeight;
    };

    Window_menuMultiplayerLocal.prototype.numVisibleRows = function () {
        return 4;
    };

    Window_menuMultiplayerLocal.prototype.itemHeight = function () {
        var clientHeight = this.windowHeight() - (this.standardPadding() - 12) * 2;
        return Math.floor(clientHeight / this.numVisibleRows());
    };

    Window_menuMultiplayerLocal.prototype.makeCommandList = function () {
        this.addMainCommands();
    };

    Window_menuMultiplayerLocal.prototype.addMainCommands = function () {
        this.addCommand('Configurar os controles', 'gamepadConfig');
        this.addCommand('Configurar o teclado', 'keyboardConfig');
    };

    Window_menuMultiplayerLocal.prototype.drawItem = function (index) {
        this.drawItemImage(index);
        this.drawItemText(index);
    };

    Window_menuMultiplayerLocal.prototype.drawItemImage = function (index) {
        var rect = this.itemRect(index);
        this.drawIMG('menu', index, rect.x + 12, rect.y + 5);
    };

    Window_menuMultiplayerLocal.prototype.drawItemText = function (index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x + 155, rect.y + 25, rect.width, align);
    };

    Window_menuMultiplayerLocal.prototype.drawIMG = function (file, index, x, y, width, height) {
        width = width || 144;
        height = height || 144;
        var bitmap = ImageManager.loadMultiplayerLocalIMG(file);
        var pw = 144;
        var ph = 144;
        var sw = Math.min(width, pw);
        var sh = Math.min(height, ph);
        var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        var sx = index % 4 * pw + (pw - sw) / 2;
        var sy = Math.floor(index / 4) * ph + (ph - sh) / 2;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
    };

    //-----------------------------------------------------------------------------
    // Window_selectGamePadMultiplayerLocal
    //
    function Window_selectGamePadMultiplayerLocal() {
        this.initialize.apply(this, arguments);
    }

    Window_selectGamePadMultiplayerLocal.prototype = Object.create(Window_Base.prototype);
    Window_selectGamePadMultiplayerLocal.prototype.constructor = Window_selectGamePadMultiplayerLocal;

    Window_selectGamePadMultiplayerLocal.prototype.initialize = function () {
        Window_Base.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
        this.hide();
        this.loadImages();
    };

    Window_selectGamePadMultiplayerLocal.prototype.loadImages = function () {
        ImageManager.reserveMultiplayerLocalIMG('selectGamepad');
    };

    Window_selectGamePadMultiplayerLocal.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    };

    Window_selectGamePadMultiplayerLocal.prototype.windowHeight = function () {
        return Graphics.boxHeight;
    };

    Window_selectGamePadMultiplayerLocal.prototype.refresh = function () {
        this.contents.clear();
        this.changeTextColor(this.systemColor());
        var fontSize = this.contents.fontSize;
        // CONTROLE 1
        this.drawIMG('selectGamepad', 0, 5, 5);
        this.contents.fontSize = 18;
        this.drawText('Controle', 39, 17, this.windowWidth(), 'left');
        this.contents.fontSize = fontSize;
        this.drawText('1', 70, 68, this.windowWidth(), 'left');
        this.drawText('Jogador 1', 162, 62, this.windowWidth(), 'left');
        // CONTROLE 2
        this.drawIMG('selectGamepad', 1, 5, 162);
        this.contents.fontSize = 18;
        this.drawText('Controle', 39, 174, this.windowWidth(), 'left');
        this.contents.fontSize = fontSize;
        this.drawText('2', 70, 225, this.windowWidth(), 'left');
        this.drawText('Jogador 2', 162, 222, this.windowWidth(), 'left');
        // CONTROLE 3
        this.drawIMG('selectGamepad', 2, this.windowWidth() - 192, 5);
        this.contents.fontSize = 18;
        this.drawText('Controle', -87, 17, this.windowWidth(), 'right');
        this.contents.fontSize = fontSize;
        this.drawText('3', -112, 68, this.windowWidth(), 'right');
        this.drawText('Jogador 3', -206, 62, this.windowWidth(), 'right');
        // CONTROLE 4
        this.drawIMG('selectGamepad', 3, this.windowWidth() - 192, 162);
        this.contents.fontSize = 18;
        this.drawText('Controle', -87, 174, this.windowWidth(), 'right');
        this.contents.fontSize = fontSize;
        this.drawText('4', -112, 225, this.windowWidth(), 'right');
        this.drawText('Jogador 4', -206, 222, this.windowWidth(), 'right');
        // Divisor Vertical
        this.changePaintOpacity(false);
        this.contents.fillRect(this.windowWidth() / 2 - this.standardPadding(), 5, 1, 312, 'white');
        this.changePaintOpacity(true);
        // Divisor Horizontal
        this.changePaintOpacity(false);
        this.contents.fillRect(5, 335, this.windowWidth() - (this.standardPadding() * 2 + this.textPadding() * 2), 1, 'white');
        this.changePaintOpacity(true);
        this.createWindowOptions();
    };

    Window_selectGamePadMultiplayerLocal.prototype.drawIMG = function (file, index, x, y, width, height) {
        width = width || 144;
        height = height || 144;
        var bitmap = ImageManager.loadMultiplayerLocalIMG(file);
        var pw = 144;
        var ph = 144;
        var sw = Math.min(width, pw);
        var sh = Math.min(height, ph);
        var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        var sx = index % 4 * pw + (pw - sw) / 2;
        var sy = Math.floor(index / 4) * ph + (ph - sh) / 2;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
    };

    Window_selectGamePadMultiplayerLocal.prototype.createWindowOptions = function () {
        if (!this._windowOptions) {
            this._windowOptions = new Window_selectGamePadMultiplayerLocal_Options();
            this._windowOptions.setHandler('cancel', SceneManager._scene.hideSelectGamepad.bind(SceneManager._scene));
            this.addChild(this._windowOptions);
        } else {
            this._windowOptions.activate();
        }
    };

    //-----------------------------------------------------------------------------
    // Window_selectGamePadMultiplayerLocal_Options
    //
    function Window_selectGamePadMultiplayerLocal_Options() {
        this.initialize.apply(this, arguments);
    }

    Window_selectGamePadMultiplayerLocal_Options.prototype = Object.create(Window_Command.prototype);
    Window_selectGamePadMultiplayerLocal_Options.prototype.constructor = Window_selectGamePadMultiplayerLocal_Options;

    Window_selectGamePadMultiplayerLocal_Options.prototype.initialize = function () {
        Window_Command.prototype.initialize.call(this, 25, 368);
        this.setBackgroundType(3);
        this.setHandlerMainCommands();
        this.createWindowButtonsChange();
    };

    Window_selectGamePadMultiplayerLocal_Options.prototype.windowWidth = function () {
        return Graphics.boxWidth - (this.standardPadding() * 2 + this.textPadding() * 2);
    };

    Window_selectGamePadMultiplayerLocal_Options.prototype.windowHeight = function () {
        return 242;
    };

    Window_selectGamePadMultiplayerLocal_Options.prototype.itemHeight = function () {
        var clientHeight = this.windowHeight() - this.standardPadding() * 2;
        return Math.floor(clientHeight / this.numVisibleRows());
    };

    Window_selectGamePadMultiplayerLocal_Options.prototype.numVisibleRows = function () {
        return this.maxItems() > 1 ? 2 : 1;
    };

    Window_selectGamePadMultiplayerLocal_Options.prototype.activate = function () {
        Window_Base.prototype.activate.call(this);
        this.select(0);
    };

    Window_selectGamePadMultiplayerLocal_Options.prototype.makeCommandList = function () {
        this.addMainCommands();
    };

    Window_selectGamePadMultiplayerLocal_Options.prototype.addMainCommands = function () {
        this.addCommand('Configuração de botões', 'buttonsChange');
        this.addCommand('Atribuir Controles', 'setGamepad');
    };

    Window_selectGamePadMultiplayerLocal_Options.prototype.drawItem = function (index) {
        this.drawItemText(index);
    };

    Window_selectGamePadMultiplayerLocal_Options.prototype.drawItemText = function (index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changeTextColor(this.systemColor());
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x + 1, rect.y + (rect.height / 2) - 20, rect.width, align);
    };

    Window_selectGamePadMultiplayerLocal_Options.prototype.setHandlerMainCommands = function () {
        this.setHandler('buttonsChange', this.showWindowButtonsChange.bind(this));
    };

    Window_selectGamePadMultiplayerLocal_Options.prototype.createWindowButtonsChange = function () {
        this._windowButtonsChange = new Window_selectGamePadMultiplayerLocal_Options_buttonsChange();
        this._windowButtonsChange.setHandler('cancel', this.hideWindowButtonsChange.bind(this));
        SceneManager._scene.addChild(this._windowButtonsChange);
    };

    Window_selectGamePadMultiplayerLocal_Options.prototype.showWindowButtonsChange = function () {
        this._windowButtonsChange.show();
        this._windowButtonsChange.refresh();
        this.parent.hide();
    };

    Window_selectGamePadMultiplayerLocal_Options.prototype.hideWindowButtonsChange = function () {
        this._windowButtonsChange.hide();
        this.parent.show();
        this.activate();
    };

    //-----------------------------------------------------------------------------
    // Window_selectGamePadMultiplayerLocal_Options_buttonsChange
    //
    function Window_selectGamePadMultiplayerLocal_Options_buttonsChange() {
        this.initialize.apply(this, arguments);
    }

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype = Object.create(Window_Command.prototype);
    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.constructor = Window_selectGamePadMultiplayerLocal_Options_buttonsChange;

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.initialize = function () {
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.deactivate();
        this.hide();
        this.loadImages();
        this.setHandlerMainCommands();
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.loadImages = function () {
        ImageManager.reserveMultiplayerLocalIMG('selectGamepadButtons');
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.refresh = function () {
        Window_Command.prototype.refresh.call(this, 0, 0);
        this.activate();
        this.drawHelpText();
        this.createWindowSetValue();
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.windowHeight = function () {
        return Graphics.boxHeight;
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.numVisibleRows = function () {
        return 4;
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.itemHeight = function () {
        var clientHeight = this.windowHeight() - (this.standardPadding() - 12) * 2;
        return Math.floor(clientHeight / this.numVisibleRows());
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.makeCommandList = function () {
        this.addMainCommands();
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.addMainCommands = function () {
        this.addCommand(`Botão A - VALOR(${String(Input.gamepadMapper[0]).toUpperCase()})`, 'button_A');
        this.addCommand(`Botão B - VALOR(${String(Input.gamepadMapper[1]).toUpperCase()})`, 'button_B');
        this.addCommand(`Botão X - VALOR(${String(Input.gamepadMapper[2]).toUpperCase()})`, 'button_X');
        this.addCommand(`Botão Y - VALOR(${String(Input.gamepadMapper[3]).toUpperCase()})`, 'button_Y');
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.drawItem = function (index) {
        var rect = this.itemRect(index);
        this.drawIMG('selectGamepadButtons', index, rect.x + 12, rect.y + 5);
        this.drawItemText(index);
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.drawIMG = function (file, index, x, y, width, height) {
        width = width || 144;
        height = height || 144;
        var bitmap = ImageManager.loadMultiplayerLocalIMG(file);
        var pw = 144;
        var ph = 144;
        var sw = Math.min(width, pw);
        var sh = Math.min(height, ph);
        var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
        var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
        var sx = index % 4 * pw + (pw - sw) / 2;
        var sy = Math.floor(index / 4) * ph + (ph - sh) / 2;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.drawItemText = function (index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changeTextColor(this.systemColor());
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x + 162, rect.y + (rect.height / 2) - 20, rect.width, align);
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.drawHelpText = function () {
        this.drawText('Escolha um botão e aperte(OK) para trocar seu valor,', 5,
            this.windowHeight() - 100 - (this.standardPadding() * 2 + this.textPadding() * 2), this.contentsWidth(), 'left');
        this.drawText('tome cuidado com botões com o mesmo valor.', 5,
            this.windowHeight() - 60 - (this.standardPadding() * 2 + this.textPadding() * 2), this.contentsWidth(), 'left');
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.createWindowSetValue = function () {
        if (!this._windowSetValue) {
            this._windowSetValue = new Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue();
        }
        this.addChild(this._windowSetValue);
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.setHandlerMainCommands = function () {
        this.setHandler('button_A', this.showWindowSetValue.bind(this, 0));
        this.setHandler('button_B', this.showWindowSetValue.bind(this, 1));
        this.setHandler('button_X', this.showWindowSetValue.bind(this, 2));
        this.setHandler('button_Y', this.showWindowSetValue.bind(this, 3));
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.showWindowSetValue = function (buttonId) {
        this._windowSetValue.show();
        this._windowSetValue.activate();
        this._windowSetValue._buttonId = buttonId;
        this._windowSetValue._winParent = this;
    };
    //-----------------------------------------------------------------------------
    // Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue
    //
    function Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue() {
        this.initialize.apply(this, arguments);
    }

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue.prototype = Object.create(Window_Command.prototype);
    Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue.prototype.constructor = Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue;

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue.prototype.initialize = function () {
        var x = Graphics.boxWidth / 4,
            y = Graphics.boxHeight / 4;
        Window_Command.prototype.initialize.call(this, x, y);
        this.deactivate();
        this.hide();
        this.setHandlerMainCommands();
        this._buttonId = null;
        this._winParent = null;
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue.prototype.windowWidth = function () {
        return 420;
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue.prototype.windowHeight = function () {
        return 280;
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue.prototype.standardBackOpacity = function () {
        return 100;
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue.prototype.numVisibleRows = function () {
        return 1;
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue.prototype.itemHeight = function () {
        return this.windowHeight() - this.standardPadding() * 2;
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue.prototype.makeCommandList = function () {
        this.addMainCommands();
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue.prototype.addMainCommands = function () {
        this.addCommand('OK', '_ok');
        this.addCommand('CANCEL', '_cancel');
        this.addCommand('TAB', '_tab');
        this.addCommand('SHIFT', '_shift');
        this.addCommand('CONTROL', '_control');
        this.addCommand('ESCAPE', '_escape');
        this.addCommand('PAGEUP', '_pageup');
        this.addCommand('PAGEDOWN', '_pagedown');
        this.addCommand('LEFT', '_left');
        this.addCommand('UP', '_up');
        this.addCommand('RIGHT', '_right');
        this.addCommand('DOWN', '_down');
        this.addCommand('DEBUG', '_debug');
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        var align = 'center';
        this.changeTextColor(this.systemColor());
        this.contents.fontSize = 132;
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x, (rect.height / 4) + (rect.y + this.standardPadding() * 2), rect.width, align);
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue.prototype.setHandlerMainCommands = function () {
        this.setHandler('_ok', this.setButtonValue.bind(this, 'ok'));
        this.setHandler('_cancel', this.setButtonValue.bind(this, 'cancel'));
        this.setHandler('_tab', this.setButtonValue.bind(this, 'tab'));
        this.setHandler('_shift', this.setButtonValue.bind(this, 'shift'));
        this.setHandler('_control', this.setButtonValue.bind(this, 'control'));
        this.setHandler('_escape', this.setButtonValue.bind(this, 'escape'));
        this.setHandler('_pageup', this.setButtonValue.bind(this, 'pageup'));
        this.setHandler('_pagedown', this.setButtonValue.bind(this, 'pagedown'));
        this.setHandler('_left', this.setButtonValue.bind(this, 'left'));
        this.setHandler('_up', this.setButtonValue.bind(this, 'up'));
        this.setHandler('_right', this.setButtonValue.bind(this, 'right'));
        this.setHandler('_down', this.setButtonValue.bind(this, 'down'));
        this.setHandler('_debug', this.setButtonValue.bind(this, 'debug'));
        this.setHandler('cancel', this.closeWin.bind(this));
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue.prototype.setButtonValue = function (value) {
        if (this._buttonId != null && this._winParent != null) {
            if (Input.gamepadMapper[this._buttonId] != 'ok')
                Input.gamepadMapper[this._buttonId] = value;
            var buttonOk = false;
            for (var i in Input.gamepadMapper) {
                if (this._buttonId != i && Input.gamepadMapper[i] == 'ok')
                    buttonOk = true;
            }
            if (!buttonOk) {
                SoundManager.playBuzzer();
                return this.activate();
            }
            Input._fileSettings_gamepadButtonsUpdate();
            this._winParent.refresh();
            this.hide();
        }
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue.prototype.closeWin = function () {
        if (this._winParent) this._winParent.refresh();
        this.hide();
    };
    // ----------------------------------------------------------------------------
    // - - - END PART CODE ☼ ☼ ☺ ☺ ☼ ☼ MENU GERAL ↑ ↑ ↑ ↑
    // ----------------------------------------------------------------------------    
})();