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
            fs.writeFileSync(file, LZString.compressToBase64(JSON.stringify({
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
                    4: 'shift',     // Botão LB
                    5: 'pageup',    // Botão RB
                    6: 'control',   // Botão LT
                    7: 'pagedown',  // Botão RT
                    8: 'debug',     // Botão SELECT
                    9: 'menu',      // Botão START
                    10: 'shift',    // Botão do meio do analogico esquerdo
                    11: 'menuMultiplayerLocal', // Botão do meio do analogico direito
                    12: 'up',       // Botão D-pad(Seta) para cima
                    13: 'down',     // Botão D-pad(Seta) para baixo
                    14: 'left',     // Botão D-pad(Seta) para esquerda
                    15: 'right',    // Botão D-pad(Seta) para direita
                    16: 'up',       // Botão Analogico esquerdo para cima
                    17: 'down',     // Botão Analogico esquerdo para baixo
                    18: 'left',     // Botão Analogico esquerdo para esquerda
                    19: 'right',    // Botão Analogico esquerdo para direita
                    20: 'up',       // Botão Analogico direito para cima
                    21: 'down',     // Botão Analogico direito para baixo
                    22: 'left',     // Botão Analogico direito para esquerda
                    23: 'right',    // Botão Analogico direito para direita
                }
            })));
        }
        file = JSON.parse(LZString.decompressFromBase64(fs.readFileSync(file, { encoding: 'utf8' })) || {});
        // DEFAULT VALUES
        if (file.inputId instanceof Object === false) {
            file.inputId = {
                'player_1': null, // valor padrão é null
                'player_2': 0,
                'player_3': 1,
                'player_4': 2
            }
        }
        if (file.inputOwner instanceof String === false) {
            file.inputOwner = 'player_1'; // Defina quem controla o teclado
        }
        if (file.inputMenuCall instanceof Number === false) {
            file.inputMenuCall = 112; // Defina a tecla que chama o menu, padrão é F1
        }
        if (file.gamepadOrder instanceof Object === false) {
            file.gamepadOrder = {
                0: 'player_1', // Controle 1
                1: 'player_2', // Controle 2
                2: 'player_3', // Controle 3
                3: 'player_4' // Controle 4
            }
        }
        if (file.gamepadButtons instanceof Object === false) {
            file.gamepadButtons = {
                0: 'ok',        // Botão A
                1: 'cancel',    // Botão B
                2: 'tab',       // Botão X
                3: 'escape',    // Botão Y
                4: 'shift',     // Botão LB
                5: 'pageup',    // Botão RB
                6: 'control',   // Botão LT
                7: 'pagedown',  // Botão RT
                8: 'debug',     // Botão SELECT
                9: 'menu',      // Botão START
                10: 'shift',    // Botão do meio do analogico esquerdo
                11: 'menuMultiplayerLocal', // Botão do meio do analogico direito
                12: 'up',       // Botão D-pad(Seta) para cima
                13: 'down',     // Botão D-pad(Seta) para baixo
                14: 'left',     // Botão D-pad(Seta) para esquerda
                15: 'right',    // Botão D-pad(Seta) para direita
                16: 'up',       // Botão Analogico esquerdo para cima
                17: 'down',     // Botão Analogico esquerdo para baixo
                18: 'left',     // Botão Analogico esquerdo para esquerda
                19: 'right',    // Botão Analogico esquerdo para direita
                20: 'up',       // Botão Analogico direito para cima
                21: 'down',     // Botão Analogico direito para baixo
                22: 'left',     // Botão Analogico direito para esquerda
                23: 'right',    // Botão Analogico direito para direita
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
        data = JSON.parse(LZString.decompressFromBase64(fs.readFileSync(file, { encoding: 'utf8' })) || {});
        data.gamepadButtons = Input.gamepadMapper;
        fs.writeFileSync(file, LZString.compressToBase64(JSON.stringify(data)));
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
        // Analogico Esquerdo
        newState[16] = false;
        newState[17] = false;
        newState[18] = false;
        newState[19] = false;
        // Analogico Direito
        newState[20] = false;
        newState[21] = false;
        newState[22] = false;
        newState[23] = false;
        for (var i = 0; i < buttons.length; i++) {
            newState[i] = buttons[i].pressed;
        }
        if (axes[1] < -threshold) {
            newState[16] = true;    // Analogico Esquerdo (P. Cima)
        } else if (axes[1] > threshold) {
            newState[17] = true;    // Analogico Esquerdo (P. Baixo)
        }
        if (axes[0] < -threshold) {
            newState[18] = true;    // Analogico Esquerdo (P. Esquerda)
        } else if (axes[0] > threshold) {
            newState[19] = true;    // Analogico Esquerdo (P. Direita)
        }
        if (axes[3] < -threshold) {
            newState[20] = true;    // Analogico Direito (P. Cima)
        } else if (axes[3] > threshold) {
            newState[21] = true;    // Analogico Direito (P. Baixo)
        }
        if (axes[2] < -threshold) {
            newState[22] = true;    // Analogico Direito (P. Esquerda)
        } else if (axes[2] > threshold) {
            newState[23] = true;    // Analogico Direito (P. Direita)
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
        this.setHandler('setGamepad', this.showWindowButtonsChange.bind(this));
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

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.update = function () {
        Window_Command.prototype.update.call(this);
        this.updateHelpText();
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
        var textMenuSpecial = String(Input.gamepadMapper[11]).toLocaleLowerCase() === 'menumultiplayerlocal' ? 'MENU ESPECIAL' : String(Input.gamepadMapper[11]).toUpperCase();
        this.addCommand(`Botão A - VALOR(${String(Input.gamepadMapper[0]).toUpperCase()})`, 'button_A');
        this.addCommand(`Botão B - VALOR(${String(Input.gamepadMapper[1]).toUpperCase()})`, 'button_B');
        this.addCommand(`Botão X - VALOR(${String(Input.gamepadMapper[2]).toUpperCase()})`, 'button_X');
        this.addCommand(`Botão Y - VALOR(${String(Input.gamepadMapper[3]).toUpperCase()})`, 'button_Y');
        this.addCommand(`Botão LB - VALOR(${String(Input.gamepadMapper[4]).toUpperCase()})`, 'button_LB');
        this.addCommand(`Botão LT - VALOR(${String(Input.gamepadMapper[6]).toUpperCase()})`, 'button_LT');
        this.addCommand(`Botão RB - VALOR(${String(Input.gamepadMapper[5]).toUpperCase()})`, 'button_RB');
        this.addCommand(`Botão RT - VALOR(${String(Input.gamepadMapper[7]).toUpperCase()})`, 'button_RT');
        this.addCommand(`Botão SELECT - VALOR(${String(Input.gamepadMapper[8]).toUpperCase()})`, 'button_SELECT');
        this.addCommand(`Botão START - VALOR(${String(Input.gamepadMapper[9]).toUpperCase()})`, 'button_START');
        this.addCommand(`A. Esquerdo Clique - VALOR(${String(Input.gamepadMapper[10]).toUpperCase()})`, 'button_ANALOGICO_ESQUERDO_CLIQUE');
        this.addCommand(`A. Direito Clique - VALOR(${textMenuSpecial})`, 'button_ANALOGICO_DIREITO_CLIQUE');
        this.addCommand(`D-pad Cima - VALOR(${String(Input.gamepadMapper[12]).toUpperCase()})`, 'button_DPAD_CIMA');
        this.addCommand(`D-pad Baixo - VALOR(${String(Input.gamepadMapper[13]).toUpperCase()})`, 'button_DPAD_BAIXO');
        this.addCommand(`D-pad Esquerda - VALOR(${String(Input.gamepadMapper[14]).toUpperCase()})`, 'button_DPAD_ESQUERDA');
        this.addCommand(`D-pad Direita - VALOR(${String(Input.gamepadMapper[15]).toUpperCase()})`, 'button_DPAD_DIREITA');
        this.addCommand(`A. Esquerdo Cima - VALOR(${String(Input.gamepadMapper[16]).toUpperCase()})`, 'button_ANALOGICO_ESQUERDO_CIMA');
        this.addCommand(`A. Esquerdo Baixo - VALOR(${String(Input.gamepadMapper[17]).toUpperCase()})`, 'button_ANALOGICO_ESQUERDO_BAIXO');
        this.addCommand(`A. Esquerdo Esquerda - VALOR(${String(Input.gamepadMapper[18]).toUpperCase()})`, 'button_ANALOGICO_ESQUERDO_ESQUERDA');
        this.addCommand(`A. Esquerdo Direita - VALOR(${String(Input.gamepadMapper[19]).toUpperCase()})`, 'button_ANALOGICO_ESQUERDO_DIREITA');
        this.addCommand(`A. Direito Cima - VALOR(${String(Input.gamepadMapper[20]).toUpperCase()})`, 'button_ANALOGICO_DIREITO_CIMA');
        this.addCommand(`A. Direito Baixo - VALOR(${String(Input.gamepadMapper[21]).toUpperCase()})`, 'button_ANALOGICO_DIREITO_BAIXO');
        this.addCommand(`A. Direito Esquerda - VALOR(${String(Input.gamepadMapper[22]).toUpperCase()})`, 'button_ANALOGICO_DIREITO_ESQUERDA');
        this.addCommand(`A. Direito Direita - VALOR(${String(Input.gamepadMapper[23]).toUpperCase()})`, 'button_ANALOGICO_DIREITO_DIREITA');
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.setHandlerMainCommands = function () {
        this.setHandler('button_A', this.showWindowSetValue.bind(this, 0));
        this.setHandler('button_B', this.showWindowSetValue.bind(this, 1));
        this.setHandler('button_X', this.showWindowSetValue.bind(this, 2));
        this.setHandler('button_Y', this.showWindowSetValue.bind(this, 3));
        this.setHandler('button_LB', this.showWindowSetValue.bind(this, 4));
        this.setHandler('button_LT', this.showWindowSetValue.bind(this, 6));
        this.setHandler('button_RB', this.showWindowSetValue.bind(this, 5));
        this.setHandler('button_RT', this.showWindowSetValue.bind(this, 7));
        this.setHandler('button_SELECT', this.showWindowSetValue.bind(this, 8));
        this.setHandler('button_START', this.showWindowSetValue.bind(this, 9));
        this.setHandler('button_ANALOGICO_ESQUERDO_CLIQUE', this.showWindowSetValue.bind(this, 10));
        this.setHandler('button_ANALOGICO_DIREITO_CLIQUE', this.showWindowSetValue.bind(this, 11));
        this.setHandler('button_DPAD_CIMA', this.showWindowSetValue.bind(this, 12));
        this.setHandler('button_DPAD_BAIXO', this.showWindowSetValue.bind(this, 13));
        this.setHandler('button_DPAD_ESQUERDA', this.showWindowSetValue.bind(this, 14));
        this.setHandler('button_DPAD_DIREITA', this.showWindowSetValue.bind(this, 15));
        this.setHandler('button_ANALOGICO_ESQUERDO_CIMA', this.showWindowSetValue.bind(this, 16));
        this.setHandler('button_ANALOGICO_ESQUERDO_BAIXO', this.showWindowSetValue.bind(this, 17));
        this.setHandler('button_ANALOGICO_ESQUERDO_ESQUERDA', this.showWindowSetValue.bind(this, 18));
        this.setHandler('button_ANALOGICO_ESQUERDO_DIREITA', this.showWindowSetValue.bind(this, 19));
        this.setHandler('button_ANALOGICO_DIREITO_CIMA', this.showWindowSetValue.bind(this, 20));
        this.setHandler('button_ANALOGICO_DIREITO_BAIXO', this.showWindowSetValue.bind(this, 21));
        this.setHandler('button_ANALOGICO_DIREITO_ESQUERDA', this.showWindowSetValue.bind(this, 22));
        this.setHandler('button_ANALOGICO_DIREITO_DIREITA', this.showWindowSetValue.bind(this, 23));
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

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.drawHelpText = function (text_1, text_2) {
        if (text_1 === undefined) text_1 = 0;
        if (text_2 === undefined) text_2 = 1;
        if (!this._textsToHelp) {
            this._textsToHelp = [
                'Escolha um botão e aperte(OK) para trocar seu valor,',
                'tome cuidado com botões com o mesmo valor.',
                'Alguns botões não podem ter os valores retirados, para',
                'retirar o valor você precisa atribuir o valor a outro botão.'
            ]
        }
        var width = this.contentsWidth(),
            height = this.contentsHeight(),
            x = 5,
            y1 = this.windowHeight() - 100 - (this.standardPadding() * 2 + this.textPadding() * 2),
            y2 = this.windowHeight() - 60 - (this.standardPadding() * 2 + this.textPadding() * 2);
        this.contents.clearRect(x, y1, width, height);
        this.drawText(this._textsToHelp[text_1], x, y1, width, 'left');
        this.drawText(this._textsToHelp[text_2], x, y2, width, 'left');
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.updateHelpText = function () {
        if (!this._textHelp_times) {
            this._textHelp_times = [180, 180];
            this._textHelp_change = false;
        }
        if (this._textHelp_times[0] > 0) {
            this._textHelp_times[0] -= .60;
        } else {
            if (!this._textHelp_change) {
                this._textHelp_change = true;
                this.drawHelpText(2, 3);
            }
            if (this._textHelp_times[1] > 0) {
                this._textHelp_times[1] -= .60;
            } else {
                this.drawHelpText(0, 1);
                this._textHelp_times = null;
            }
        }
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype.createWindowSetValue = function () {
        if (!this._windowSetValue) {
            this._windowSetValue = new Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue();
        }
        this.addChild(this._windowSetValue);
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
        this.addCommand('MENU', '_menu');
        this.addCommand('M. ESPECIAL', '_menuEspecial');
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
        this.setHandler('_menu', this.setButtonValue.bind(this, 'menu'));
        this.setHandler('_menuEspecial', this.setButtonValue.bind(this, 'menuMultiplayerLocal'));
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
            var buttonsEssentials = ['ok', 'cancel', 'menu', 'menuMultiplayerLocal'];
            if (buttonsEssentials.filter(function (button) {
                return Input.gamepadMapper[this._buttonId] === button;
            }, this).length > 0 && !this.buttonAlradyExist(buttonsEssentials, [this._buttonId, Input.gamepadMapper[this._buttonId]])) {
                SoundManager.playBuzzer();
                this.activate();
                return;
            }
            Input.gamepadMapper[this._buttonId] = value;
            Input._fileSettings_gamepadButtonsUpdate();
            this._winParent.refresh();
            this.hide();
        }
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue.prototype.buttonAlradyExist = function (values, exclude) {
        var buttons = [];
        Object.keys(Input.gamepadMapper).filter(function (key) {
            if (exclude[0] != key)
                if (values.indexOf(Input.gamepadMapper[key]) != -1)
                    buttons.push(Input.gamepadMapper[key]);
        });
        return buttons.length >= 0 && buttons.indexOf(exclude[1]) != -1;
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange_setValue.prototype.closeWin = function () {
        if (this._winParent) this._winParent.refresh();
        this.hide();
    };
    // ----------------------------------------------------------------------------
    // - - - END PART CODE ☼ ☼ ☺ ☺ ☼ ☼ MENU GERAL ↑ ↑ ↑ ↑
    // ----------------------------------------------------------------------------    
})();