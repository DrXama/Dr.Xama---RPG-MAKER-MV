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
    // CONFIGURAÇÃO DO TECLADO E CONTROLE
    // Esse menu é essencial para configurar o teclado e o controle
    //

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
                },
                'keyboardKeys': {
                    // Padrão do MV
                    9: 'tab', // TECLA TAB
                    13: 'ok', // TECLA ENTER
                    16: 'shift', // TECLA SHIFT OU Shift-Left/Shift-Right
                    17: 'control', // TECLA CTRL OU Control-Left/Control-Right
                    18: 'control', // TECLA ALT OU Alt-Left/Alt-Right
                    27: 'escape', // TECLA ESC OU Escape
                    32: 'ok', // TECLA ESPAÇO
                    33: 'pageup', // TECLA PAGE-UP
                    34: 'pagedown', // TECLA PAGE-DOWN
                    37: 'left', // TECLA SETA PARA ESQUERDA
                    38: 'up', // TECLA SETA PARA CIMA
                    39: 'right', // TECLA SETA PARA DIREITA
                    40: 'down', // TECLA SETA PARA BAIXO
                    45: 'escape', // TECLA INSERT
                    81: 'pageup', // TECLA Q
                    87: 'pagedown', // TECLA W
                    88: 'escape', // TECLA X
                    90: 'ok', // TECLA Z
                    96: 'escape', // TECLA NUMERICA 0
                    98: 'down', // TECLA NUMERICA 2
                    100: 'left', // TECLA NUMERICA 4
                    102: 'right', // TECLA NUMERICA 6
                    104: 'up', // TECLA NUMERICA 8
                    120: 'debug', // TECLA F9
                    // A B C D...
                    65: 'left', // TECLA A
                    66: 'b', // TECLA B
                    67: 'c', // TECLA C
                    68: 'right', // TECLA D
                    69: 'e', // TECLA E
                    70: 'f', // TECLA F
                    71: 'g', // TECLA G
                    72: 'h', // TECLA H
                    73: 'i', // TECLA I
                    74: 'j', // TECLA J
                    75: 'k', // TECLA K
                    76: 'l', // TECLA L
                    77: 'm', // TECLA M
                    78: 'n', // TECLA N
                    79: 'o', // TECLA O
                    80: 'p', // TECLA P
                    81: 'pageup', // TECLA Q
                    82: 'r', // TECLA R
                    83: 'down', // TECLA S
                    84: 't', // TECLA T
                    85: 'u', // TECLA U
                    86: 'v', // TECLA V
                    87: 'up', // TECLA W
                    88: 'escape', // TECLA X
                    89: 'y', // TECLA Y
                    90: 'ok', // TECLA Z
                    // ESPECIAL
                    9: 'tab', // TECLA TAB
                    13: 'ok', // TECLA ENTER
                    16: 'shift', // TECLA SHIFT OU Shift-Left/Shift-Right
                    17: 'control', // TECLA CTRL OU Control-Left/Control-Right
                    18: 'control', // TECLA ALT OU Alt-Left/Alt-Right
                    19: 'pause/break', // TECLA Pause/Break
                    20: 'caps-lock', // TECLA Caps Lock
                    27: 'escape', // TECLA ESC OU Escape
                    32: 'ok', // TECLA ESPAÇO
                    33: 'pageup', // TECLA PAGE-UP
                    34: 'pagedown', // TECLA PAGE-DOWN
                    35: 'end', // TECLA END
                    36: 'home', // TECLA HOME
                    37: 'left', // TECLA SETA PARA ESQUERDA
                    38: 'up', // TECLA SETA PARA CIMA
                    39: 'right', // TECLA SETA PARA DIREITA
                    40: 'down', // TECLA SETA PARA BAIXO
                    45: 'escape', // TECLA INSERT
                    46: 'delete', // TECLA DELETE
                    48: '0', // TECLA 0
                    49: '1', // TECLA 1
                    50: '2', // TECLA 2
                    51: '3', // TECLA 3
                    52: '4', // TECLA 4
                    53: '5', // TECLA 5
                    54: '6', // TECLA 6
                    55: '7', // TECLA 7
                    56: '8', // TECLA 8
                    57: '9', // TECLA 9
                    96: 'escape', // TECLA NUMERICA 0
                    97: 'numerico 1', // TECLA NUMERICA 1
                    98: 'down', // TECLA NUMERICA 2
                    99: 'numerico 3', // TECLA NUMERICA 3
                    100: 'left', // TECLA NUMERICA 4
                    101: 'numerico 5', // TECLA NUMERICA 5
                    102: 'right', // TECLA NUMERICA 6
                    103: 'numerico 7', // TECLA NUMERICA 7
                    104: 'up', // TECLA NUMERICA 8
                    105: 'numerico 9', // TECLA NUMERICA 9
                    106: '*', // TECLA * ou Multiplicação
                    107: '+', // TECLA + ou Adição
                    109: '-', // TECLA - ou Subtração
                    110: '.', // TECLA . ou Ponto Decimal
                    111: '/', // TECLA / ou Divisão
                    112: 'f1', // TECLA F1
                    113: 'f2', // TECLA F2
                    114: 'f3', // TECLA F3
                    115: 'f4', // TECLA F4
                    116: 'f5', // TECLA F5
                    117: 'f6', // TECLA F6
                    118: 'f7', // TECLA F7
                    119: 'f8', // TECLA F8
                    120: 'debug', // TECLA F9
                    121: 'f10', // TECLA F10
                    122: 'f11', // TECLA F11
                    123: 'f12', // TECLA F12
                    144: 'num-lock', // TECLA num lock
                    145: 'scroll-lock', // TECLA scroll lock
                    186: ';', // TECLA PONTO E VIRGURLA OU semi-colon
                    187: '=', // TECLA IGUAL(=) OU equal sign
                    188: ',', // TECLA VIRGULA OU comma
                    189: '--', // TECLA TRAÇO OU dash
                    190: '..', // TECLA PONTO OU period
                    191: '//', // TECLA BARRA(/) OU forward slash
                    192: '\`', // TECLA Acento Grave(`) OU grave accent
                    219: '[', // TECLA COLCHETES ABERTO([) OU open bracket
                    220: '\\', // TECLA BARRA(\) OU back slash
                    221: ']', // TECLA COLCHETES FECHADO(]) OU close braket
                    222: '\"', // TECLA ASPAS DO LADO DO 1 OU single quote
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
        if (file.keyboardKeys instanceof Object === false) {
            file.keyboardKeys = {
                // Padrão do MV
                9: 'tab', // TECLA TAB
                13: 'ok', // TECLA ENTER
                16: 'shift', // TECLA SHIFT OU Shift-Left/Shift-Right
                17: 'control', // TECLA CTRL OU Control-Left/Control-Right
                18: 'control', // TECLA ALT OU Alt-Left/Alt-Right
                27: 'escape', // TECLA ESC OU Escape
                32: 'ok', // TECLA ESPAÇO
                33: 'pageup', // TECLA PAGE-UP
                34: 'pagedown', // TECLA PAGE-DOWN
                37: 'left', // TECLA SETA PARA ESQUERDA
                38: 'up', // TECLA SETA PARA CIMA
                39: 'right', // TECLA SETA PARA DIREITA
                40: 'down', // TECLA SETA PARA BAIXO
                45: 'escape', // TECLA INSERT
                81: 'pageup', // TECLA Q
                87: 'pagedown', // TECLA W
                88: 'escape', // TECLA X
                90: 'ok', // TECLA Z
                96: 'escape', // TECLA NUMERICA 0
                98: 'down', // TECLA NUMERICA 2
                100: 'left', // TECLA NUMERICA 4
                102: 'right', // TECLA NUMERICA 6
                104: 'up', // TECLA NUMERICA 8
                120: 'debug', // TECLA F9
                // A B C D...
                65: 'left', // TECLA A
                66: 'b', // TECLA B
                67: 'c', // TECLA C
                68: 'right', // TECLA D
                69: 'e', // TECLA E
                70: 'f', // TECLA F
                71: 'g', // TECLA G
                72: 'h', // TECLA H
                73: 'i', // TECLA I
                74: 'j', // TECLA J
                75: 'k', // TECLA K
                76: 'l', // TECLA L
                77: 'm', // TECLA M
                78: 'n', // TECLA N
                79: 'o', // TECLA O
                80: 'p', // TECLA P
                81: 'pageup', // TECLA Q
                82: 'r', // TECLA R
                83: 'down', // TECLA S
                84: 't', // TECLA T
                85: 'u', // TECLA U
                86: 'v', // TECLA V
                87: 'up', // TECLA W
                88: 'escape', // TECLA X
                89: 'y', // TECLA Y
                90: 'ok', // TECLA Z
                // ESPECIAL
                9: 'tab', // TECLA TAB
                13: 'ok', // TECLA ENTER
                16: 'shift', // TECLA SHIFT OU Shift-Left/Shift-Right
                17: 'control', // TECLA CTRL OU Control-Left/Control-Right
                18: 'control', // TECLA ALT OU Alt-Left/Alt-Right
                19: 'pause/break', // TECLA Pause/Break
                20: 'caps-lock', // TECLA Caps Lock
                27: 'escape', // TECLA ESC OU Escape
                32: 'ok', // TECLA ESPAÇO
                33: 'pageup', // TECLA PAGE-UP
                34: 'pagedown', // TECLA PAGE-DOWN
                35: 'end', // TECLA END
                36: 'home', // TECLA HOME
                37: 'left', // TECLA SETA PARA ESQUERDA
                38: 'up', // TECLA SETA PARA CIMA
                39: 'right', // TECLA SETA PARA DIREITA
                40: 'down', // TECLA SETA PARA BAIXO
                45: 'escape', // TECLA INSERT
                46: 'delete', // TECLA DELETE
                48: '0', // TECLA 0
                49: '1', // TECLA 1
                50: '2', // TECLA 2
                51: '3', // TECLA 3
                52: '4', // TECLA 4
                53: '5', // TECLA 5
                54: '6', // TECLA 6
                55: '7', // TECLA 7
                56: '8', // TECLA 8
                57: '9', // TECLA 9
                96: 'escape', // TECLA NUMERICA 0
                97: 'numerico 1', // TECLA NUMERICA 1
                98: 'down', // TECLA NUMERICA 2
                99: 'numerico 3', // TECLA NUMERICA 3
                100: 'left', // TECLA NUMERICA 4
                101: 'numerico 5', // TECLA NUMERICA 5
                102: 'right', // TECLA NUMERICA 6
                103: 'numerico 7', // TECLA NUMERICA 7
                104: 'up', // TECLA NUMERICA 8
                105: 'numerico 9', // TECLA NUMERICA 9
                106: '*', // TECLA * ou Multiplicação
                107: '+', // TECLA + ou Adição
                109: '-', // TECLA - ou Subtração
                110: '.', // TECLA . ou Ponto Decimal
                111: '/', // TECLA / ou Divisão
                112: 'f1', // TECLA F1
                113: 'f2', // TECLA F2
                114: 'f3', // TECLA F3
                115: 'f4', // TECLA F4
                116: 'f5', // TECLA F5
                117: 'f6', // TECLA F6
                118: 'f7', // TECLA F7
                119: 'f8', // TECLA F8
                120: 'debug', // TECLA F9
                121: 'f10', // TECLA F10
                122: 'f11', // TECLA F11
                123: 'f12', // TECLA F12
                144: 'num-lock', // TECLA num lock
                145: 'scroll-lock', // TECLA scroll lock
                186: ';', // TECLA PONTO E VIRGURLA OU semi-colon
                187: '=', // TECLA IGUAL(=) OU equal sign
                188: ',', // TECLA VIRGULA OU comma
                189: '--', // TECLA TRAÇO OU dash
                190: '..', // TECLA PONTO OU period
                191: '//', // TECLA BARRA(/) OU forward slash
                192: '\`', // TECLA Acento Grave(`) OU grave accent
                219: '[', // TECLA COLCHETES ABERTO([) OU open bracket
                220: '\\', // TECLA BARRA(\) OU back slash
                221: ']', // TECLA COLCHETES FECHADO(]) OU close braket
                222: '\"', // TECLA ASPAS DO LADO DO 1 OU single quote
            }
        }
        // DEFINE VALUES
        this._inputId = file.inputId;
        this._inputOwner = file.inputOwner;
        this._gamepadOrder = file.gamepadOrder;
        Input.gamepadMapper = file.gamepadButtons;
        Input.keyMapper = file.keyboardKeys;
        Input.keyMapper[file.inputMenuCall] = 'menuMultiplayerLocal';
    };

    Input._fileSettingsUpdate = function () {
        var fs = require('fs'),
            path = 'system/multiplayerLocal/save',
            file = localPath(`${path}\\settings.drxamasave`),
            data = null;
        if (!fs.existsSync(file)) return;
        data = JSON.parse(LZString.decompressFromBase64(fs.readFileSync(file, { encoding: 'utf8' })) || {});
        // DEFINE VALUES
        data.inputId = Input._inputId;
        data.inputOwner = Input._inputOwner;
        data.gamepadOrder = Input._gamepadOrder;
        data.gamepadButtons = Input.gamepadMapper;
        data.keyboardKeys = Input.keyMapper;
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
    // ----------------------------------------------------------------------------
    // - - - END PART CODE ☼ ☼ ☺ ☺ ☼ ☼ CONFIGURAÇÃO DO TECLADO E CONTROLE ↑ ↑ ↑ ↑
    // ----------------------------------------------------------------------------

    // ----------------------------------------------------------------------------
    // MENU GERAL
    // Esse menu é essencial para configurar o sistema
    //

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
        return this.reserveBitmap('img/system/', filename, hue, true, reservationId);
    };

    ImageManager.loadMultiplayerLocalIMG = function (filename, hue) {
        return this.loadBitmap('img/system/', filename, hue, true);
    };

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
        this.createKeyboardSettingsWindow();
    };

    Scene_menuMultiplayerLocal.prototype.createBackground = function () {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };

    Scene_menuMultiplayerLocal.prototype.createMenuWindow = function () {
        this._menuWindow = new Window_menuMultiplayerLocal();
        this._menuWindow.setHandler('gamepadConfig', this.showSelectGamepad.bind(this));
        this._menuWindow.setHandler('keyboardConfig', this.showKeyboardSettings.bind(this));
        this.addWindow(this._menuWindow);
    };

    Scene_menuMultiplayerLocal.prototype.createSelectGamepadWindow = function () {
        this._selectGamepadWindow = new Window_selectGamePadMultiplayerLocal();
        this.addWindow(this._selectGamepadWindow);
    };

    Scene_menuMultiplayerLocal.prototype.createKeyboardSettingsWindow = function () {
        this._keyboardSettingsWindow = new Window_keyboardSettings(this._menuWindow.standardPadding() * 2, this._menuWindow.itemHeight() * 2 + this._menuWindow.standardPadding() * 4);
        this._menuWindow.addChild(this._keyboardSettingsWindow);
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

    Scene_menuMultiplayerLocal.prototype.showKeyboardSettings = function () {
        this._keyboardSettingsWindow.show();
        this._keyboardSettingsWindow.activate();
    };

    Scene_menuMultiplayerLocal.prototype.hideKeyboardSettings = function () {
        this._keyboardSettingsWindow.deactivate();
        this._keyboardSettingsWindow.hide();
        this._menuWindow.activate();
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
        this.deactivate();
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
        this.drawText(this.commandGamepad(Input._gamepadOrder[0]), 162, 62, this.windowWidth(), 'left');
        // CONTROLE 2
        this.drawIMG('selectGamepad', 1, 5, 162);
        this.contents.fontSize = 18;
        this.drawText('Controle', 39, 174, this.windowWidth(), 'left');
        this.contents.fontSize = fontSize;
        this.drawText('2', 70, 225, this.windowWidth(), 'left');
        this.drawText(this.commandGamepad(Input._gamepadOrder[1]), 162, 222, this.windowWidth(), 'left');
        // CONTROLE 3
        this.drawIMG('selectGamepad', 2, this.windowWidth() - 192, 5);
        this.contents.fontSize = 18;
        this.drawText('Controle', -87, 17, this.windowWidth(), 'right');
        this.contents.fontSize = fontSize;
        this.drawText('3', -112, 68, this.windowWidth(), 'right');
        this.drawText(this.commandGamepad(Input._gamepadOrder[2]), -206, 62, this.windowWidth(), 'right');
        // CONTROLE 4
        this.drawIMG('selectGamepad', 3, this.windowWidth() - 192, 162);
        this.contents.fontSize = 18;
        this.drawText('Controle', -87, 174, this.windowWidth(), 'right');
        this.contents.fontSize = fontSize;
        this.drawText('4', -112, 225, this.windowWidth(), 'right');
        this.drawText(this.commandGamepad(Input._gamepadOrder[3]), -206, 222, this.windowWidth(), 'right');
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

    Window_selectGamePadMultiplayerLocal.prototype.commandGamepad = function (gamepadIndex) {
        switch (String(gamepadIndex).toLowerCase()) {
            case 'player_1':
                return 'JOGADOR 1';
            case 'player_2':
                return 'JOGADOR 2';
            case 'player_3':
                return 'JOGADOR 3';
            case 'player_4':
                return 'JOGADOR 4';
        };
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
            this._windowOptions.show();
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
        this.deactivate();
        this.hide();
        this.setBackgroundType(3);
        this.setHandlerMainCommands();
        this.createWindowButtonsChange();
        this.createWindowSetGamepad();
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
        this.setHandler('setGamepad', this.showWindowSetGamepad.bind(this));
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
        this.parent.refresh();
        this.parent.show();
        this.activate();
    };

    Window_selectGamePadMultiplayerLocal_Options.prototype.createWindowSetGamepad = function () {
        this._windowSetGamepad = new Window_selectGamePadMultiplayerLocal_Options_setGamepad();
        this._windowSetGamepad.setHandler('cancel', this.hideWindowSetGamepad.bind(this));
        SceneManager._scene.addChild(this._windowSetGamepad);
    };

    Window_selectGamePadMultiplayerLocal_Options.prototype.showWindowSetGamepad = function () {
        this._windowSetGamepad.show();
        this._windowSetGamepad.refresh();
        this.parent.hide();
    };

    Window_selectGamePadMultiplayerLocal_Options.prototype.hideWindowSetGamepad = function () {
        this._windowSetGamepad.hide();
        this.parent.refresh();
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
        Window_Command.prototype.refresh.call(this);
        this.activate();
        this.drawHelpText();
        this.createWindowSetValue();
        this._cursorRectHide = null;
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
        this._cursorRectHide = true;
    };

    Window_selectGamePadMultiplayerLocal_Options_buttonsChange.prototype._updateCursor = function () {
        var blinkCount = this._animationCount % 40;
        var cursorOpacity = this.contentsOpacity;
        if (this.active) {
            if (blinkCount < 20) {
                cursorOpacity -= blinkCount * 8;
            } else {
                cursorOpacity -= (40 - blinkCount) * 8;
            }
        }
        this._windowCursorSprite.alpha = cursorOpacity / 255;
        this._windowCursorSprite.visible = this._cursorRectHide ? false : this.isOpen();
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
        Window_Command.prototype.initialize.call(this, Graphics.boxWidth / 4, Graphics.boxHeight / 4);
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
            Input._fileSettingsUpdate();
            this.closeWin();
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
        if (this._winParent) {
            this._winParent.refresh();
            this._winParent._cursorRectHide = false;
        }
        this.hide();
    };

    //-----------------------------------------------------------------------------
    // Window_selectGamePadMultiplayerLocal_Options_setGamepad
    //
    function Window_selectGamePadMultiplayerLocal_Options_setGamepad() {
        this.initialize.apply(this, arguments);
    }

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype = Object.create(Window_Command.prototype);
    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype.constructor = Window_selectGamePadMultiplayerLocal_Options_setGamepad;

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype.initialize = function (x, y) {
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.deactivate();
        this.hide();
        this.loadImages();
        this.setHandlerMainCommands();
        this._cursorRectHide = null;
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype.loadImages = function () {
        ImageManager.reserveMultiplayerLocalIMG('selectGamepad');
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype.refresh = function () {
        Window_Command.prototype.refresh.call(this);
        this.activate();
        this.createWindowSetValue();
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype.windowHeight = function () {
        return Graphics.boxHeight;
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype.itemHeight = function () {
        var clientHeight = this.windowHeight() - this.standardPadding() * 2;
        return Math.floor(clientHeight / 4);
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype.makeCommandList = function () {
        this.addMainCommands();
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype.addMainCommands = function () {
        this.addCommand('Controle 1', 'gamepad_1');
        this.addCommand('Controle 2', 'gamepad_2');
        this.addCommand('Controle 3', 'gamepad_3');
        this.addCommand('Controle 4', 'gamepad_4');
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype.setHandlerMainCommands = function () {
        this.setHandler('gamepad_1', this.showWindowSetGamepad.bind(this, 0));
        this.setHandler('gamepad_2', this.showWindowSetGamepad.bind(this, 1));
        this.setHandler('gamepad_3', this.showWindowSetGamepad.bind(this, 2));
        this.setHandler('gamepad_4', this.showWindowSetGamepad.bind(this, 3));
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype.drawItem = function (index) {
        this.drawItemImage(index);
        this.drawItemText(index);
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype.drawItemImage = function (index) {
        var rect = this.itemRect(index),
            fontSize = this.contents.fontSize;
        this.drawIMG('selectGamepad', index, rect.x + 12, rect.y + 5);
        this.changeTextColor(this.systemColor());
        this.contents.fontSize = 18;
        this.drawText('Controle', rect.x + 43, rect.y + 16, rect.width, 'left');
        this.contents.fontSize = fontSize;
        this.drawText(`${index + 1}`, rect.x + 74, rect.y + 66, rect.width, 'left');
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype.drawItemText = function (index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetFontSettings();
        this.changeTextColor(this.systemColor());
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.contents.fontSize = 26;
        this.drawText(`${this.commandGamepad(Input._gamepadOrder[index])} - Aperte('OK') para trocar o jogador`, rect.x + 160, rect.y + 60, rect.width, align);
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype.commandGamepad = function (gamepadIndex) {
        switch (String(gamepadIndex).toLowerCase()) {
            case 'player_1':
                return 'JOGADOR 1';
            case 'player_2':
                return 'JOGADOR 2';
            case 'player_3':
                return 'JOGADOR 3';
            case 'player_4':
                return 'JOGADOR 4';
        };
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype.drawIMG = function (file, index, x, y, width, height) {
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
        this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, 140, 140);
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype.createWindowSetValue = function () {
        if (!this._windowSetGamepad) {
            this._windowSetGamepad = new Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad();
        }
        this.addChild(this._windowSetGamepad);
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype.showWindowSetGamepad = function (gamepadId) {
        this._windowSetGamepad.show();
        this._windowSetGamepad.activate();
        this._windowSetGamepad._gamepadId = gamepadId;
        this._windowSetGamepad._winParent = this;
        this._cursorRectHide = true;
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad.prototype._updateCursor = function () {
        var blinkCount = this._animationCount % 40;
        var cursorOpacity = this.contentsOpacity;
        if (this.active) {
            if (blinkCount < 20) {
                cursorOpacity -= blinkCount * 8;
            } else {
                cursorOpacity -= (40 - blinkCount) * 8;
            }
        }
        this._windowCursorSprite.alpha = cursorOpacity / 255;
        this._windowCursorSprite.visible = this._cursorRectHide ? false : this.isOpen();
    };

    //-----------------------------------------------------------------------------
    // Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad
    //

    function Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad() {
        this.initialize.apply(this, arguments);
    }

    Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad.prototype = Object.create(Window_Command.prototype);
    Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad.prototype.constructor = Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad;

    Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad.prototype.initialize = function () {
        var x = Graphics.boxWidth / 4,
            y = Graphics.boxHeight / 4;
        Window_Command.prototype.initialize.call(this, x, y);
        this.deactivate();
        this.hide();
        this.setHandlerMainCommands();
        this._gamepadId = null;
        this._winParent = null;
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad.prototype.windowWidth = function () {
        return 420;
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad.prototype.windowHeight = function () {
        return 280;
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad.prototype.standardBackOpacity = function () {
        return 100;
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad.prototype.numVisibleRows = function () {
        return 1;
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad.prototype.itemHeight = function () {
        return this.windowHeight() - this.standardPadding() * 2;
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad.prototype.makeCommandList = function () {
        this.addMainCommands();
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad.prototype.addMainCommands = function () {
        this.addCommand('JOGADOR 1', 'player_1');
        this.addCommand('JOGADOR 2', 'player_2');
        this.addCommand('JOGADOR 3', 'player_3');
        this.addCommand('JOGADOR 4', 'player_4');
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        var align = 'center';
        this.changeTextColor(this.systemColor());
        this.contents.fontSize = 132;
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x, (rect.height / 4) + (rect.y + this.standardPadding() * 2), rect.width, align);
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad.prototype.setHandlerMainCommands = function () {
        this.setHandler('player_1', this.setGamepad.bind(this, 'player_1'));
        this.setHandler('player_2', this.setGamepad.bind(this, 'player_2'));
        this.setHandler('player_3', this.setGamepad.bind(this, 'player_3'));
        this.setHandler('player_4', this.setGamepad.bind(this, 'player_4'));
        this.setHandler('cancel', this.closeWin.bind(this));
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad.prototype.setGamepad = function (player) {
        if (this._gamepadId != null && this._winParent != null) {
            for (var i in Input._gamepadOrder) {
                if (Input._gamepadOrder[i] === player) {
                    Input._gamepadOrder[i] = Input._gamepadOrder[this._gamepadId];
                    break;
                }
            };
            Input._gamepadOrder[this._gamepadId] = player;
            Input._fileSettingsUpdate();
            this.closeWin();
        }
    };

    Window_selectGamePadMultiplayerLocal_Options_setGamepad_changePad.prototype.closeWin = function () {
        if (this._winParent) {
            this._winParent.refresh();
            this._winParent._cursorRectHide = false;
        }
        this.hide();
    };

    //-----------------------------------------------------------------------------
    // Window_keyboardSettings
    //
    function Window_keyboardSettings() {
        this.initialize.apply(this, arguments);
    }

    Window_keyboardSettings.prototype = Object.create(Window_Command.prototype);
    Window_keyboardSettings.prototype.constructor = Window_keyboardSettings;

    Window_keyboardSettings.prototype.initialize = function (x, y) {
        Window_Command.prototype.initialize.call(this, x, y);
        this.deactivate();
        this.hide();
        this.setHandlerMainCommands();
        this.createWindowSetKeyBoard();
    };

    Window_keyboardSettings.prototype.windowWidth = function () {
        return Graphics.boxWidth - this.standardPadding() * 4;
    };

    Window_keyboardSettings.prototype.windowHeight = function () {
        return 192;
    };

    Window_keyboardSettings.prototype.numVisibleRows = function () {
        return 1;
    };

    Window_keyboardSettings.prototype.standardBackOpacity = function () {
        return 100;
    };

    Window_keyboardSettings.prototype.itemHeight = function () {
        var clientHeight = this.windowHeight() - this.standardPadding() * 2;
        return Math.floor(clientHeight / this.numVisibleRows());
    };

    Window_keyboardSettings.prototype.makeCommandList = function () {
        this.addMainCommands();
    };

    Window_keyboardSettings.prototype.addMainCommands = function () {
        this.addCommand('Definir Teclas', 'setKeys');
        this.addCommand('Atribuir Teclado', 'setKeyboard');
    };

    Window_keyboardSettings.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        var align = 'center';
        this.changeTextColor(this.systemColor());
        this.contents.fontSize = 64;
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x, (rect.height / 4) + (rect.y + this.standardPadding()), rect.width, align);
    };

    Window_keyboardSettings.prototype.setHandlerMainCommands = function () {
        this.setHandler('setKeys', this.showWindowSetKeyBoard.bind(this));
        this.setHandler('cancel', SceneManager._scene.hideKeyboardSettings.bind(SceneManager._scene));
    };

    Window_keyboardSettings.prototype.createWindowSetKeyBoard = function () {
        this._windowSetKeyBoard = new Window_keyboardSettings_setKeyBoard();
        this._windowSetKeyBoard.setHandler('cancel', this.hideWindowSetKeyBoard.bind(this));
        SceneManager._scene.addChild(this._windowSetKeyBoard);
    };

    Window_keyboardSettings.prototype.showWindowSetKeyBoard = function () {
        SceneManager._scene._menuWindow.hide();
        this._windowSetKeyBoard.activate();
        this._windowSetKeyBoard.show();
    };

    Window_keyboardSettings.prototype.hideWindowSetKeyBoard = function () {
        this._windowSetKeyBoard.deactivate();
        this._windowSetKeyBoard.hide();
        SceneManager._scene._menuWindow.show();
        this.activate();
    };

    //-----------------------------------------------------------------------------
    // Window_keyboardSettings_setKeyBoard
    //
    function Window_keyboardSettings_setKeyBoard() {
        this.initialize.apply(this, arguments);
    }

    Window_keyboardSettings_setKeyBoard.prototype = Object.create(Window_Command.prototype);
    Window_keyboardSettings_setKeyBoard.prototype.constructor = Window_keyboardSettings_setKeyBoard;

    Window_keyboardSettings_setKeyBoard.prototype.initialize = function () {
        Window_Command.prototype.initialize.call(this, 0, 0);
        this.deactivate();
        this.hide();
        this.setHandlerMainCommands();
        this.createSetButtonWindow();
        this._cursorRectHide = null;
    };

    Window_keyboardSettings_setKeyBoard.prototype.refresh = function () {
        Window_Command.prototype.refresh.call(this);
        this.activate();
    };

    Window_keyboardSettings_setKeyBoard.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    };

    Window_keyboardSettings_setKeyBoard.prototype.windowHeight = function () {
        return Graphics.boxHeight;
    };

    Window_keyboardSettings_setKeyBoard.prototype.numVisibleRows = function () {
        return 4;
    };

    Window_keyboardSettings_setKeyBoard.prototype.itemHeight = function () {
        var clientHeight = this.windowHeight() - this.standardPadding() * 2;
        return Math.floor(clientHeight / this.numVisibleRows());
    };

    Window_keyboardSettings_setKeyBoard.prototype.makeCommandList = function () {
        this.addMainCommands();
    };

    Window_keyboardSettings_setKeyBoard.prototype.addMainCommands = function () {
        this.addCommand(`TECLA A VALOR(${this.textCommandConfigure(Input.keyMapper[65])})`, '_key_A');
        this.addCommand(`TECLA B VALOR(${this.textCommandConfigure(Input.keyMapper[66])})`, '_key_B');
        this.addCommand(`TECLA C VALOR(${this.textCommandConfigure(Input.keyMapper[67])})`, '_key_C');
        this.addCommand(`TECLA D VALOR(${this.textCommandConfigure(Input.keyMapper[68])})`, '_key_D');
        this.addCommand(`TECLA E VALOR(${this.textCommandConfigure(Input.keyMapper[69])})`, '_key_E');
        this.addCommand(`TECLA F VALOR(${this.textCommandConfigure(Input.keyMapper[70])})`, '_key_F');
        this.addCommand(`TECLA G VALOR(${this.textCommandConfigure(Input.keyMapper[71])})`, '_key_G');
        this.addCommand(`TECLA H VALOR(${this.textCommandConfigure(Input.keyMapper[72])})`, '_key_H');
        this.addCommand(`TECLA I VALOR(${this.textCommandConfigure(Input.keyMapper[73])})`, '_key_I');
        this.addCommand(`TECLA J VALOR(${this.textCommandConfigure(Input.keyMapper[74])})`, '_key_J');
        this.addCommand(`TECLA K VALOR(${this.textCommandConfigure(Input.keyMapper[75])})`, '_key_K');
        this.addCommand(`TECLA L VALOR(${this.textCommandConfigure(Input.keyMapper[76])})`, '_key_L');
        this.addCommand(`TECLA M VALOR(${this.textCommandConfigure(Input.keyMapper[77])})`, '_key_M');
        this.addCommand(`TECLA N VALOR(${this.textCommandConfigure(Input.keyMapper[78])})`, '_key_N');
        this.addCommand(`TECLA O VALOR(${this.textCommandConfigure(Input.keyMapper[79])})`, '_key_O');
        this.addCommand(`TECLA P VALOR(${this.textCommandConfigure(Input.keyMapper[80])})`, '_key_P');
        this.addCommand(`TECLA Q VALOR(${this.textCommandConfigure(Input.keyMapper[81])})`, '_key_Q');
        this.addCommand(`TECLA R VALOR(${this.textCommandConfigure(Input.keyMapper[82])})`, '_key_R');
        this.addCommand(`TECLA S VALOR(${this.textCommandConfigure(Input.keyMapper[83])})`, '_key_S');
        this.addCommand(`TECLA T VALOR(${this.textCommandConfigure(Input.keyMapper[84])})`, '_key_T');
        this.addCommand(`TECLA U VALOR(${this.textCommandConfigure(Input.keyMapper[85])})`, '_key_U');
        this.addCommand(`TECLA V VALOR(${this.textCommandConfigure(Input.keyMapper[86])})`, '_key_V');
        this.addCommand(`TECLA W VALOR(${this.textCommandConfigure(Input.keyMapper[87])})`, '_key_W');
        this.addCommand(`TECLA X VALOR(${this.textCommandConfigure(Input.keyMapper[88])})`, '_key_X');
        this.addCommand(`TECLA Y VALOR(${this.textCommandConfigure(Input.keyMapper[89])})`, '_key_Y');
        this.addCommand(`TECLA Z VALOR(${this.textCommandConfigure(Input.keyMapper[90])})`, '_key_Z');
        this.addCommand(`TECLA TAB VALOR(${this.textCommandConfigure(Input.keyMapper[9])})`, '_key_TAB');
        this.addCommand(`TECLA ENTER VALOR(${this.textCommandConfigure(Input.keyMapper[13])})`, '_key_ENTER');
        this.addCommand(`TECLA SHIFT(ESQUERDO/DIREITO) VALOR(${this.textCommandConfigure(Input.keyMapper[16])})`, '_key_SHIFT');
        this.addCommand(`TECLA CTRL(ESQUERDO/DIREITO) VALOR(${this.textCommandConfigure(Input.keyMapper[17])})`, '_key_CTRL');
        this.addCommand(`TECLA ALT(ESQUERDO/DIREITO) VALOR(${this.textCommandConfigure(Input.keyMapper[18])})`, '_key_ALT');
        this.addCommand(`TECLA PAUSE/BREAK VALOR(${this.textCommandConfigure(Input.keyMapper[19])})`, '_key_Pause_Break');
        this.addCommand(`TECLA CAPS-LOCK VALOR(${this.textCommandConfigure(Input.keyMapper[20])})`, '_key_Caps_Lock');
        this.addCommand(`TECLA ESC VALOR(${this.textCommandConfigure(Input.keyMapper[27])})`, '_key_ESC');
        this.addCommand(`TECLA ESPAÇO VALOR(${this.textCommandConfigure(Input.keyMapper[32])})`, '_key_ESPAÇO');
        this.addCommand(`TECLA PAGE-UP VALOR(${this.textCommandConfigure(Input.keyMapper[33])})`, '_key_PAGE_UP');
        this.addCommand(`TECLA PAGE-DOWN VALOR(${this.textCommandConfigure(Input.keyMapper[34])})`, '_key_PAGE_DOWN');
        this.addCommand(`TECLA END VALOR(${this.textCommandConfigure(Input.keyMapper[35])})`, '_key_END');
        this.addCommand(`TECLA HOME VALOR(${this.textCommandConfigure(Input.keyMapper[36])})`, '_key_HOME');
        this.addCommand(`TECLA SETA PARA ESQUERDA VALOR(${this.textCommandConfigure(Input.keyMapper[37])})`, '_key_SETA_PARA_ESQUERDA');
        this.addCommand(`TECLA SETA PARA CIMA VALOR(${this.textCommandConfigure(Input.keyMapper[38])})`, '_key_SETA_PARA_CIMA');
        this.addCommand(`TECLA SETA PARA DIREITA VALOR(${this.textCommandConfigure(Input.keyMapper[39])})`, '_key_SETA_PARA_DIREITA');
        this.addCommand(`TECLA SETA PARA BAIXO VALOR(${this.textCommandConfigure(Input.keyMapper[40])})`, '_key_SETA_PARA_BAIXO');
        this.addCommand(`TECLA INSERT VALOR(${this.textCommandConfigure(Input.keyMapper[45])})`, '_key_INSERT');
        this.addCommand(`TECLA DELETE VALOR(${this.textCommandConfigure(Input.keyMapper[46])})`, '_key_DELETE');
        this.addCommand(`TECLA 0 VALOR(${this.textCommandConfigure(Input.keyMapper[48])})`, '_key_0');
        this.addCommand(`TECLA 1 VALOR(${this.textCommandConfigure(Input.keyMapper[49])})`, '_key_1');
        this.addCommand(`TECLA 2 VALOR(${this.textCommandConfigure(Input.keyMapper[50])})`, '_key_2');
        this.addCommand(`TECLA 3 VALOR(${this.textCommandConfigure(Input.keyMapper[51])})`, '_key_3');
        this.addCommand(`TECLA 4 VALOR(${this.textCommandConfigure(Input.keyMapper[52])})`, '_key_4');
        this.addCommand(`TECLA 5 VALOR(${this.textCommandConfigure(Input.keyMapper[53])})`, '_key_5');
        this.addCommand(`TECLA 6 VALOR(${this.textCommandConfigure(Input.keyMapper[54])})`, '_key_6');
        this.addCommand(`TECLA 7 VALOR(${this.textCommandConfigure(Input.keyMapper[55])})`, '_key_7');
        this.addCommand(`TECLA 8 VALOR(${this.textCommandConfigure(Input.keyMapper[56])})`, '_key_8');
        this.addCommand(`TECLA 9 VALOR(${this.textCommandConfigure(Input.keyMapper[57])})`, '_key_9');
        this.addCommand(`TECLA NUMERICA 0 VALOR(${this.textCommandConfigure(Input.keyMapper[96])})`, '_key_NUM_0');
        this.addCommand(`TECLA NUMERICA 1 VALOR(${this.textCommandConfigure(Input.keyMapper[97])})`, '_key_NUM_1');
        this.addCommand(`TECLA NUMERICA 2 VALOR(${this.textCommandConfigure(Input.keyMapper[98])})`, '_key_NUM_2');
        this.addCommand(`TECLA NUMERICA 3 VALOR(${this.textCommandConfigure(Input.keyMapper[99])})`, '_key_NUM_3');
        this.addCommand(`TECLA NUMERICA 4 VALOR(${this.textCommandConfigure(Input.keyMapper[100])})`, '_key_NUM_4');
        this.addCommand(`TECLA NUMERICA 5 VALOR(${this.textCommandConfigure(Input.keyMapper[101])})`, '_key_NUM_5');
        this.addCommand(`TECLA NUMERICA 6 VALOR(${this.textCommandConfigure(Input.keyMapper[102])})`, '_key_NUM_6');
        this.addCommand(`TECLA NUMERICA 7 VALOR(${this.textCommandConfigure(Input.keyMapper[103])})`, '_key_NUM_7');
        this.addCommand(`TECLA NUMERICA 8 VALOR(${this.textCommandConfigure(Input.keyMapper[104])})`, '_key_NUM_8');
        this.addCommand(`TECLA NUMERICA 9 VALOR(${this.textCommandConfigure(Input.keyMapper[105])})`, '_key_NUM_9');
        this.addCommand(`TECLA MULTIPLICAÇÃO(*) VALOR(${this.textCommandConfigure(Input.keyMapper[106])})`, '_key_MULTIPLICAÇÃO');
        this.addCommand(`TECLA ADIÇÃO(+) VALOR(${this.textCommandConfigure(Input.keyMapper[107])})`, '_key_ADIÇÃO');
        this.addCommand(`TECLA SUBTRAÇÃO(-) VALOR(${this.textCommandConfigure(Input.keyMapper[109])})`, '_key_SUBTRAÇÃO');
        this.addCommand(`TECLA PONTO DECIMAL(.) VALOR(${this.textCommandConfigure(Input.keyMapper[110])})`, '_key_PONTO_DECIMAL');
        this.addCommand(`TECLA DIVISÃO(/) VALOR(${this.textCommandConfigure(Input.keyMapper[111])})`, '_key_DIVISÃO');
        this.addCommand(`TECLA F1 VALOR(${this.textCommandConfigure(Input.keyMapper[112])})`, '_key_F1');
        this.addCommand(`TECLA F2 VALOR(${this.textCommandConfigure(Input.keyMapper[113])})`, '_key_F2');
        this.addCommand(`TECLA F3 VALOR(${this.textCommandConfigure(Input.keyMapper[114])})`, '_key_F3');
        this.addCommand(`TECLA F4 VALOR(${this.textCommandConfigure(Input.keyMapper[115])})`, '_key_F4');
        this.addCommand(`TECLA F5 VALOR(${this.textCommandConfigure(Input.keyMapper[116])})`, '_key_F5');
        this.addCommand(`TECLA F6 VALOR(${this.textCommandConfigure(Input.keyMapper[117])})`, '_key_F6');
        this.addCommand(`TECLA F7 VALOR(${this.textCommandConfigure(Input.keyMapper[118])})`, '_key_F7');
        this.addCommand(`TECLA F8 VALOR(${this.textCommandConfigure(Input.keyMapper[119])})`, '_key_F8');
        this.addCommand(`TECLA F9 VALOR(${this.textCommandConfigure(Input.keyMapper[120])})`, '_key_F9');
        this.addCommand(`TECLA F10 VALOR(${this.textCommandConfigure(Input.keyMapper[121])})`, '_key_F10');
        this.addCommand(`TECLA F11 VALOR(${this.textCommandConfigure(Input.keyMapper[122])})`, '_key_F11');
        this.addCommand(`TECLA F12 VALOR(${this.textCommandConfigure(Input.keyMapper[123])})`, '_key_F12');
        this.addCommand(`TECLA NUM-LOCK VALOR(${this.textCommandConfigure(Input.keyMapper[144])})`, '_key_NUM_LOCK');
        this.addCommand(`TECLA SCROLL-LOCK VALOR(${this.textCommandConfigure(Input.keyMapper[145])})`, '_key_SCROLL_LOCK');
        this.addCommand(`TECLA VIRGULA(;) VALOR(${this.textCommandConfigure(Input.keyMapper[186])})`, '_key_PONTO_E_VIRGULA');
        this.addCommand(`TECLA IGUAL(=) VALOR(${this.textCommandConfigure(Input.keyMapper[187])})`, '_key_IGUAL');
        this.addCommand(`TECLA VIRGULA(,) VALOR(${this.textCommandConfigure(Input.keyMapper[188])})`, '_key_VIRGULA');
        this.addCommand(`TECLA TRAÇO(-) VALOR(${this.textCommandConfigure(Input.keyMapper[189])})`, '_key_TRAÇO');
        this.addCommand(`TECLA PONTO(.) VALOR(${this.textCommandConfigure(Input.keyMapper[190])})`, '_key_PONTO');
        this.addCommand(`TECLA BARRA(/) VALOR(${this.textCommandConfigure(Input.keyMapper[191])})`, '_key_BARRA_1');
        this.addCommand(`TECLA Acento Grave(\`) VALOR(${this.textCommandConfigure(Input.keyMapper[192])})`, '_key_ACENTO_GRAVE');
        this.addCommand(`TECLA COLCHETES([) VALOR(${this.textCommandConfigure(Input.keyMapper[219])})`, '_key_COLCHETES_ABERTO');
        this.addCommand(`TECLA BARRA(\\) VALOR(${this.textCommandConfigure(Input.keyMapper[220])})`, '_key_BARRA_2');
        this.addCommand(`TECLA COLCHETES(]) VALOR(${this.textCommandConfigure(Input.keyMapper[221])})`, '_key_COLCHETES_FECHADO');
        this.addCommand(`TECLA ASPAS(\'|\") VALOR(${this.textCommandConfigure(Input.keyMapper[222])})`, '_key_ASPAS');
    };

    Window_keyboardSettings_setKeyBoard.prototype.textCommandConfigure = function (command) {
        return String(command).toLocaleLowerCase() === 'menumultiplayerlocal' ? 'MENU ESPECIAL' : String(command).toUpperCase();
    };

    Window_keyboardSettings_setKeyBoard.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        var align = 'center';
        this.changeTextColor(this.systemColor());
        this.contents.fontSize = 42;
        this.drawText(this.commandName(index), rect.x, (rect.height / 4) + (rect.y + this.standardPadding()), rect.width, align);
    };

    Window_keyboardSettings_setKeyBoard.prototype.setHandlerMainCommands = function () {
        this.setHandler('_key_A', this.showSetButtonWindow.bind(this, 65));
        this.setHandler('_key_B', this.showSetButtonWindow.bind(this, 66));
        this.setHandler('_key_C', this.showSetButtonWindow.bind(this, 67));
        this.setHandler('_key_D', this.showSetButtonWindow.bind(this, 68));
        this.setHandler('_key_E', this.showSetButtonWindow.bind(this, 69));
        this.setHandler('_key_F', this.showSetButtonWindow.bind(this, 70));
        this.setHandler('_key_G', this.showSetButtonWindow.bind(this, 71));
        this.setHandler('_key_H', this.showSetButtonWindow.bind(this, 72));
        this.setHandler('_key_I', this.showSetButtonWindow.bind(this, 73));
        this.setHandler('_key_J', this.showSetButtonWindow.bind(this, 74));
        this.setHandler('_key_K', this.showSetButtonWindow.bind(this, 75));
        this.setHandler('_key_L', this.showSetButtonWindow.bind(this, 76));
        this.setHandler('_key_M', this.showSetButtonWindow.bind(this, 77));
        this.setHandler('_key_N', this.showSetButtonWindow.bind(this, 78));
        this.setHandler('_key_O', this.showSetButtonWindow.bind(this, 79));
        this.setHandler('_key_P', this.showSetButtonWindow.bind(this, 80));
        this.setHandler('_key_Q', this.showSetButtonWindow.bind(this, 81));
        this.setHandler('_key_R', this.showSetButtonWindow.bind(this, 82));
        this.setHandler('_key_S', this.showSetButtonWindow.bind(this, 83));
        this.setHandler('_key_T', this.showSetButtonWindow.bind(this, 84));
        this.setHandler('_key_U', this.showSetButtonWindow.bind(this, 85));
        this.setHandler('_key_V', this.showSetButtonWindow.bind(this, 86));
        this.setHandler('_key_W', this.showSetButtonWindow.bind(this, 87));
        this.setHandler('_key_X', this.showSetButtonWindow.bind(this, 88));
        this.setHandler('_key_Y', this.showSetButtonWindow.bind(this, 89));
        this.setHandler('_key_Z', this.showSetButtonWindow.bind(this, 90));
        this.setHandler('_key_TAB', this.showSetButtonWindow.bind(this, 9));
        this.setHandler('_key_ENTER', this.showSetButtonWindow.bind(this, 13));
        this.setHandler('_key_SHIFT', this.showSetButtonWindow.bind(this, 16));
        this.setHandler('_key_CTRL', this.showSetButtonWindow.bind(this, 17));
        this.setHandler('_key_ALT', this.showSetButtonWindow.bind(this, 18));
        this.setHandler('_key_Pause_Break', this.showSetButtonWindow.bind(this, 19));
        this.setHandler('_key_Caps_Lock', this.showSetButtonWindow.bind(this, 20));
        this.setHandler('_key_ESC', this.showSetButtonWindow.bind(this, 27));
        this.setHandler('_key_ESPAÇO', this.showSetButtonWindow.bind(this, 32));
        this.setHandler('_key_PAGE_UP', this.showSetButtonWindow.bind(this, 33));
        this.setHandler('_key_PAGE_DOWN', this.showSetButtonWindow.bind(this, 34));
        this.setHandler('_key_END', this.showSetButtonWindow.bind(this, 35));
        this.setHandler('_key_HOME', this.showSetButtonWindow.bind(this, 36));
        this.setHandler('_key_SETA_PARA_ESQUERDA', this.showSetButtonWindow.bind(this, 37));
        this.setHandler('_key_SETA_PARA_CIMA', this.showSetButtonWindow.bind(this, 38));
        this.setHandler('_key_SETA_PARA_DIREITA', this.showSetButtonWindow.bind(this, 39));
        this.setHandler('_key_SETA_PARA_BAIXO', this.showSetButtonWindow.bind(this, 40));
        this.setHandler('_key_INSERT', this.showSetButtonWindow.bind(this, 45));
        this.setHandler('_key_DELETE', this.showSetButtonWindow.bind(this, 46));
        this.setHandler('_key_0', this.showSetButtonWindow.bind(this, 48));
        this.setHandler('_key_1', this.showSetButtonWindow.bind(this, 49));
        this.setHandler('_key_2', this.showSetButtonWindow.bind(this, 50));
        this.setHandler('_key_3', this.showSetButtonWindow.bind(this, 51));
        this.setHandler('_key_4', this.showSetButtonWindow.bind(this, 52));
        this.setHandler('_key_5', this.showSetButtonWindow.bind(this, 53));
        this.setHandler('_key_6', this.showSetButtonWindow.bind(this, 54));
        this.setHandler('_key_7', this.showSetButtonWindow.bind(this, 55));
        this.setHandler('_key_8', this.showSetButtonWindow.bind(this, 56));
        this.setHandler('_key_9', this.showSetButtonWindow.bind(this, 57));
        this.setHandler('_key_NUM_0', this.showSetButtonWindow.bind(this, 96));
        this.setHandler('_key_NUM_1', this.showSetButtonWindow.bind(this, 97));
        this.setHandler('_key_NUM_2', this.showSetButtonWindow.bind(this, 98));
        this.setHandler('_key_NUM_3', this.showSetButtonWindow.bind(this, 99));
        this.setHandler('_key_NUM_4', this.showSetButtonWindow.bind(this, 100));
        this.setHandler('_key_NUM_5', this.showSetButtonWindow.bind(this, 101));
        this.setHandler('_key_NUM_6', this.showSetButtonWindow.bind(this, 102));
        this.setHandler('_key_NUM_7', this.showSetButtonWindow.bind(this, 103));
        this.setHandler('_key_NUM_8', this.showSetButtonWindow.bind(this, 104));
        this.setHandler('_key_NUM_9', this.showSetButtonWindow.bind(this, 105));
        this.setHandler('_key_MULTIPLICAÇÃO', this.showSetButtonWindow.bind(this, 106));
        this.setHandler('_key_ADIÇÃO', this.showSetButtonWindow.bind(this, 107));
        this.setHandler('_key_SUBTRAÇÃO', this.showSetButtonWindow.bind(this, 109));
        this.setHandler('_key_PONTO_DECIMAL', this.showSetButtonWindow.bind(this, 110));
        this.setHandler('_key_DIVISÃO', this.showSetButtonWindow.bind(this, 111));
        this.setHandler('_key_F1', this.showSetButtonWindow.bind(this, 112));
        this.setHandler('_key_F2', this.showSetButtonWindow.bind(this, 113));
        this.setHandler('_key_F3', this.showSetButtonWindow.bind(this, 114));
        this.setHandler('_key_F4', this.showSetButtonWindow.bind(this, 115));
        this.setHandler('_key_F5', this.showSetButtonWindow.bind(this, 116));
        this.setHandler('_key_F6', this.showSetButtonWindow.bind(this, 117));
        this.setHandler('_key_F7', this.showSetButtonWindow.bind(this, 118));
        this.setHandler('_key_F8', this.showSetButtonWindow.bind(this, 119));
        this.setHandler('_key_F9', this.showSetButtonWindow.bind(this, 120));
        this.setHandler('_key_F10', this.showSetButtonWindow.bind(this, 121));
        this.setHandler('_key_F11', this.showSetButtonWindow.bind(this, 122));
        this.setHandler('_key_F12', this.showSetButtonWindow.bind(this, 123));
        this.setHandler('_key_NUM_LOCK', this.showSetButtonWindow.bind(this, 144));
        this.setHandler('_key_SCROLL_LOCK', this.showSetButtonWindow.bind(this, 145));
        this.setHandler('_key_PONTO_E_VIRGULA', this.showSetButtonWindow.bind(this, 186));
        this.setHandler('_key_IGUAL', this.showSetButtonWindow.bind(this, 187));
        this.setHandler('_key_VIRGULA', this.showSetButtonWindow.bind(this, 188));
        this.setHandler('_key_TRAÇO', this.showSetButtonWindow.bind(this, 189));
        this.setHandler('_key_PONTO', this.showSetButtonWindow.bind(this, 190));
        this.setHandler('_key_BARRA_1', this.showSetButtonWindow.bind(this, 191));
        this.setHandler('_key_ACENTO_GRAVE', this.showSetButtonWindow.bind(this, 191));
        this.setHandler('_key_COLCHETES_ABERTO', this.showSetButtonWindow.bind(this, 219));
        this.setHandler('_key_BARRA_2', this.showSetButtonWindow.bind(this, 220));
        this.setHandler('_key_COLCHETES_FECHADO', this.showSetButtonWindow.bind(this, 221));
        this.setHandler('_key_ASPAS', this.showSetButtonWindow.bind(this, 222));
    };

    Window_keyboardSettings_setKeyBoard.prototype.createSetButtonWindow = function () {
        this._windowSetButtonValue = new Window_keyboardSettings_setButtonValue();
        this.addChild(this._windowSetButtonValue);
    };

    Window_keyboardSettings_setKeyBoard.prototype.showSetButtonWindow = function (buttonId) {
        this._windowSetButtonValue.activate();
        this._windowSetButtonValue.show();
        this._windowSetButtonValue._buttonId = buttonId;
        this._windowSetButtonValue._winParent = this;
        this._cursorRectHide = true;
    };

    Window_keyboardSettings_setKeyBoard.prototype._updateCursor = function () {
        var blinkCount = this._animationCount % 40;
        var cursorOpacity = this.contentsOpacity;
        if (this.active) {
            if (blinkCount < 20) {
                cursorOpacity -= blinkCount * 8;
            } else {
                cursorOpacity -= (40 - blinkCount) * 8;
            }
        }
        this._windowCursorSprite.alpha = cursorOpacity / 255;
        this._windowCursorSprite.visible = this._cursorRectHide ? false : this.isOpen();
    };

    //-----------------------------------------------------------------------------
    // Window_keyboardSettings_setButtonValue
    //
    function Window_keyboardSettings_setButtonValue() {
        this.initialize.apply(this, arguments);
    }

    Window_keyboardSettings_setButtonValue.prototype = Object.create(Window_Command.prototype);
    Window_keyboardSettings_setButtonValue.prototype.constructor = Window_keyboardSettings_setButtonValue;

    Window_keyboardSettings_setButtonValue.prototype.initialize = function () {
        Window_Command.prototype.initialize.call(this, 25, (Graphics.boxHeight / 8) - 15);
        this.deactivate();
        this.hide();
        this.setHandlerMainCommands();
        this._buttonId = null;
        this._winParent = null;
    };

    Window_keyboardSettings_setButtonValue.prototype.windowWidth = function () {
        return Graphics.boxWidth - 25 * 2;
    };

    Window_keyboardSettings_setButtonValue.prototype.windowHeight = function () {
        return 490;
    };

    Window_keyboardSettings_setButtonValue.prototype.standardBackOpacity = function () {
        return 100;
    };

    Window_keyboardSettings_setButtonValue.prototype.numVisibleRows = function () {
        return 4;
    };

    Window_keyboardSettings_setButtonValue.prototype.itemHeight = function () {
        var clientHeight = this.windowHeight() - this.standardPadding() * 2;
        return Math.floor(clientHeight / this.numVisibleRows());
    };

    Window_keyboardSettings_setButtonValue.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        var align = 'center';
        this.changeTextColor(this.systemColor());
        this.contents.fontSize = 62;
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x, (rect.height / 2) - this.standardPadding() + rect.y, rect.width, align);
    };

    Window_keyboardSettings_setButtonValue.prototype.makeCommandList = function () {
        this.addMainCommands();
    };

    Window_keyboardSettings_setButtonValue.prototype.addMainCommands = function () {
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
        this.addCommand('A', '_key_A');
        this.addCommand('B', '_key_B');
        this.addCommand('C', '_key_C');
        this.addCommand('D', '_key_D');
        this.addCommand('E', '_key_E');
        this.addCommand('F', '_key_F');
        this.addCommand('G', '_key_G');
        this.addCommand('H', '_key_H');
        this.addCommand('I', '_key_I');
        this.addCommand('J', '_key_J');
        this.addCommand('K', '_key_K');
        this.addCommand('L', '_key_L');
        this.addCommand('M', '_key_M');
        this.addCommand('N', '_key_N');
        this.addCommand('O', '_key_O');
        this.addCommand('P', '_key_P');
        this.addCommand('Q', '_key_Q');
        this.addCommand('R', '_key_R');
        this.addCommand('S', '_key_S');
        this.addCommand('T', '_key_T');
        this.addCommand('U', '_key_U');
        this.addCommand('V', '_key_V');
        this.addCommand('W', '_key_W');
        this.addCommand('X', '_key_X');
        this.addCommand('Y', '_key_Y');
        this.addCommand('Z', '_key_Z');
        this.addCommand('TAB', '_key_TAB');
        this.addCommand('ENTER', '_key_ENTER');
        this.addCommand('SHIFT', '_key_SHIFT');
        this.addCommand('CTRL', '_key_CTRL');
        this.addCommand('ALT', '_key_ALT');
        this.addCommand('PAUSE/BREAK', '_key_Pause_Break');
        this.addCommand('CAPS-LOCK', '_key_Caps_Lock');
        this.addCommand('ESC', '_key_ESC');
        this.addCommand('ESPAÇO', '_key_ESPAÇO');
        this.addCommand('PAGE-UP', '_key_PAGE_UP');
        this.addCommand('PAGE-DOWN', '_key_PAGE_DOWN');
        this.addCommand('END', '_key_END');
        this.addCommand('HOME', '_key_HOME');
        this.addCommand('SETA PARA ESQUERDA', '_key_SETA_PARA_ESQUERDA');
        this.addCommand('SETA PARA CIMA', '_key_SETA_PARA_CIMA');
        this.addCommand('SETA PARA DIREITA', '_key_SETA_PARA_DIREITA');
        this.addCommand('SETA PARA BAIXO', '_key_SETA_PARA_BAIXO');
        this.addCommand('INSERT', '_key_INSERT');
        this.addCommand('DELETE', '_key_DELETE');
        this.addCommand('TECLA 0', '_key_TECLA_0');
        this.addCommand('TECLA 1', '_key_TECLA_1');
        this.addCommand('TECLA 2', '_key_TECLA_2');
        this.addCommand('TECLA 3', '_key_TECLA_3');
        this.addCommand('TECLA 4', '_key_TECLA_4');
        this.addCommand('TECLA 5', '_key_TECLA_5');
        this.addCommand('TECLA 6', '_key_TECLA_6');
        this.addCommand('TECLA 7', '_key_TECLA_7');
        this.addCommand('TECLA 8', '_key_TECLA_8');
        this.addCommand('TECLA 9', '_key_TECLA_9');
        this.addCommand('TECLA NUMERICA 0', '_key_TECLA_NUMERICA_0');
        this.addCommand('TECLA NUMERICA 1', '_key_TECLA_NUMERICA_1');
        this.addCommand('TECLA NUMERICA 2', '_key_TECLA_NUMERICA_2');
        this.addCommand('TECLA NUMERICA 3', '_key_TECLA_NUMERICA_3');
        this.addCommand('TECLA NUMERICA 4', '_key_TECLA_NUMERICA_4');
        this.addCommand('TECLA NUMERICA 5', '_key_TECLA_NUMERICA_5');
        this.addCommand('TECLA NUMERICA 6', '_key_TECLA_NUMERICA_6');
        this.addCommand('TECLA NUMERICA 7', '_key_TECLA_NUMERICA_7');
        this.addCommand('TECLA NUMERICA 8', '_key_TECLA_NUMERICA_8');
        this.addCommand('TECLA NUMERICA 9', '_key_TECLA_NUMERICA_9');
        this.addCommand('MULTIPLICAÇÃO(*)', '_key_MULTIPLICAÇÃO');
        this.addCommand('ADIÇÃO(+)', '_key_ADIÇÃO');
        this.addCommand('SUBTRAÇÃO(-)', '_key_SUBTRAÇÃO');
        this.addCommand('PONTO DECIMAL(.)', '_key_PONTO_DECIMAL');
        this.addCommand('F1', '_key_F1');
        this.addCommand('F2', '_key_F2');
        this.addCommand('F3', '_key_F3');
        this.addCommand('F4', '_key_F4');
        this.addCommand('F5', '_key_F5');
        this.addCommand('F6', '_key_F6');
        this.addCommand('F7', '_key_F7');
        this.addCommand('F8', '_key_F8');
        this.addCommand('F9', '_key_F9');
        this.addCommand('F10', '_key_F10');
        this.addCommand('F11', '_key_F11');
        this.addCommand('F12', '_key_F12');
        this.addCommand('NUM-LOCK', '_key_Num_Lock');
        this.addCommand('VIRGURLA(;)', '_key_PONTO_E_VIRGURLA');
        this.addCommand('IGUAL(=)', '_key_IGUAL');
        this.addCommand('VIRGULA(,)', '_key_VIRGULA');
        this.addCommand('TRAÇO(-)', '_key_TRAÇO');
        this.addCommand('PONTO(.)', '_key_PONTO');
        this.addCommand('BARRA(/)', '_key_BARRA_1');
        this.addCommand('Acento Grave(`)', '_key_Acento_Grave');
        this.addCommand('COLCHETES([)', '_key_COLCHETES_ABERTO');
        this.addCommand('BARRA(\\)', '_key_BARRA_2');
        this.addCommand('COLCHETES([)', '_key_COLCHETES_FECHADO');
        this.addCommand('ASPAS(\'|\")', '_key_ASPAS');
    };

    Window_keyboardSettings_setButtonValue.prototype.setHandlerMainCommands = function () {
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
        this.setHandler('_key_A', this.setButtonValue.bind(this, 'a'));
        this.setHandler('_key_B', this.setButtonValue.bind(this, 'b'));
        this.setHandler('_key_C', this.setButtonValue.bind(this, 'c'));
        this.setHandler('_key_D', this.setButtonValue.bind(this, 'd'));
        this.setHandler('_key_E', this.setButtonValue.bind(this, 'e'));
        this.setHandler('_key_F', this.setButtonValue.bind(this, 'f'));
        this.setHandler('_key_G', this.setButtonValue.bind(this, 'g'));
        this.setHandler('_key_H', this.setButtonValue.bind(this, 'h'));
        this.setHandler('_key_I', this.setButtonValue.bind(this, 'i'));
        this.setHandler('_key_J', this.setButtonValue.bind(this, 'j'));
        this.setHandler('_key_K', this.setButtonValue.bind(this, 'k'));
        this.setHandler('_key_L', this.setButtonValue.bind(this, 'l'));
        this.setHandler('_key_M', this.setButtonValue.bind(this, 'm'));
        this.setHandler('_key_N', this.setButtonValue.bind(this, 'n'));
        this.setHandler('_key_O', this.setButtonValue.bind(this, 'o'));
        this.setHandler('_key_P', this.setButtonValue.bind(this, 'p'));
        this.setHandler('_key_Q', this.setButtonValue.bind(this, 'q'));
        this.setHandler('_key_R', this.setButtonValue.bind(this, 'r'));
        this.setHandler('_key_S', this.setButtonValue.bind(this, 's'));
        this.setHandler('_key_T', this.setButtonValue.bind(this, 't'));
        this.setHandler('_key_U', this.setButtonValue.bind(this, 'u'));
        this.setHandler('_key_V', this.setButtonValue.bind(this, 'v'));
        this.setHandler('_key_W', this.setButtonValue.bind(this, 'w'));
        this.setHandler('_key_X', this.setButtonValue.bind(this, 'x'));
        this.setHandler('_key_Y', this.setButtonValue.bind(this, 'y'));
        this.setHandler('_key_Z', this.setButtonValue.bind(this, 'z'));
        this.setHandler('_key_TAB', this.setButtonValue.bind(this, 'tab'));
        this.setHandler('_key_ENTER', this.setButtonValue.bind(this, 'enter'));
        this.setHandler('_key_SHIFT', this.setButtonValue.bind(this, 'shift'));
        this.setHandler('_key_CTRL', this.setButtonValue.bind(this, 'ctrl'));
        this.setHandler('_key_ALT', this.setButtonValue.bind(this, 'alt'));
        this.setHandler('_key_Pause_Break', this.setButtonValue.bind(this, 'pause/break'));
        this.setHandler('_key_Caps_Lock', this.setButtonValue.bind(this, 'caps-lock'));
        this.setHandler('_key_ESC', this.setButtonValue.bind(this, 'esc'));
        this.setHandler('_key_ESPAÇO', this.setButtonValue.bind(this, 'espaço'));
        this.setHandler('_key_PAGE_UP', this.setButtonValue.bind(this, 'page-up'));
        this.setHandler('_key_PAGE_DOWN', this.setButtonValue.bind(this, 'page-down'));
        this.setHandler('_key_END', this.setButtonValue.bind(this, 'end'));
        this.setHandler('_key_HOME', this.setButtonValue.bind(this, 'home'));
        this.setHandler('_key_SETA_PARA_ESQUERDA', this.setButtonValue.bind(this, 'seta para esquerda'));
        this.setHandler('_key_SETA_PARA_CIMA', this.setButtonValue.bind(this, 'seta para cima'));
        this.setHandler('_key_SETA_PARA_DIREITA', this.setButtonValue.bind(this, 'seta para direita'));
        this.setHandler('_key_SETA_PARA_BAIXO', this.setButtonValue.bind(this, 'seta para baixo'));
        this.setHandler('_key_INSERT', this.setButtonValue.bind(this, 'insert'));
        this.setHandler('_key_DELETE', this.setButtonValue.bind(this, 'delete'));
        this.setHandler('_key_TECLA_0', this.setButtonValue.bind(this, '0'));
        this.setHandler('_key_TECLA_1', this.setButtonValue.bind(this, '1'));
        this.setHandler('_key_TECLA_2', this.setButtonValue.bind(this, '2'));
        this.setHandler('_key_TECLA_3', this.setButtonValue.bind(this, '3'));
        this.setHandler('_key_TECLA_4', this.setButtonValue.bind(this, '4'));
        this.setHandler('_key_TECLA_5', this.setButtonValue.bind(this, '5'));
        this.setHandler('_key_TECLA_6', this.setButtonValue.bind(this, '6'));
        this.setHandler('_key_TECLA_7', this.setButtonValue.bind(this, '7'));
        this.setHandler('_key_TECLA_8', this.setButtonValue.bind(this, '8'));
        this.setHandler('_key_TECLA_9', this.setButtonValue.bind(this, '9'));
        this.setHandler('_key_TECLA_NUMERICA_0', this.setButtonValue.bind(this, 'numerico 0'));
        this.setHandler('_key_TECLA_NUMERICA_1', this.setButtonValue.bind(this, 'numerico 1'));
        this.setHandler('_key_TECLA_NUMERICA_2', this.setButtonValue.bind(this, 'numerico 2'));
        this.setHandler('_key_TECLA_NUMERICA_3', this.setButtonValue.bind(this, 'numerico 3'));
        this.setHandler('_key_TECLA_NUMERICA_4', this.setButtonValue.bind(this, 'numerico 4'));
        this.setHandler('_key_TECLA_NUMERICA_5', this.setButtonValue.bind(this, 'numerico 5'));
        this.setHandler('_key_TECLA_NUMERICA_6', this.setButtonValue.bind(this, 'numerico 6'));
        this.setHandler('_key_TECLA_NUMERICA_7', this.setButtonValue.bind(this, 'numerico 7'));
        this.setHandler('_key_TECLA_NUMERICA_8', this.setButtonValue.bind(this, 'numerico 8'));
        this.setHandler('_key_TECLA_NUMERICA_9', this.setButtonValue.bind(this, 'numerico 9'));
        this.setHandler('_key_MULTIPLICAÇÃO', this.setButtonValue.bind(this, '*'));
        this.setHandler('_key_ADIÇÃO', this.setButtonValue.bind(this, '+'));
        this.setHandler('_key_SUBTRAÇÃO', this.setButtonValue.bind(this, '-'));
        this.setHandler('_key_PONTO_DECIMAL', this.setButtonValue.bind(this, '.'));
        this.setHandler('_key_DIVISÃO', this.setButtonValue.bind(this, '/'));
        this.setHandler('_key_F1', this.setButtonValue.bind(this, 'f1'));
        this.setHandler('_key_F2', this.setButtonValue.bind(this, 'f2'));
        this.setHandler('_key_F3', this.setButtonValue.bind(this, 'f3'));
        this.setHandler('_key_F4', this.setButtonValue.bind(this, 'f4'));
        this.setHandler('_key_F5', this.setButtonValue.bind(this, 'f5'));
        this.setHandler('_key_F6', this.setButtonValue.bind(this, 'f6'));
        this.setHandler('_key_F7', this.setButtonValue.bind(this, 'f7'));
        this.setHandler('_key_F8', this.setButtonValue.bind(this, 'f8'));
        this.setHandler('_key_F9', this.setButtonValue.bind(this, 'f9'));
        this.setHandler('_key_F10', this.setButtonValue.bind(this, 'f10'));
        this.setHandler('_key_F11', this.setButtonValue.bind(this, 'f11'));
        this.setHandler('_key_F12', this.setButtonValue.bind(this, 'f12'));
        this.setHandler('_key_Num_Lock', this.setButtonValue.bind(this, 'num-lock'));
        this.setHandler('_key_Scroll_Lock', this.setButtonValue.bind(this, 'scroll-lock'));
        this.setHandler('_key_PONTO_E_VIRGURLA', this.setButtonValue.bind(this, ';'));
        this.setHandler('_key_IGUAL', this.setButtonValue.bind(this, '='));
        this.setHandler('_key_VIRGULA', this.setButtonValue.bind(this, ','));
        this.setHandler('_key_TRAÇO', this.setButtonValue.bind(this, '--'));
        this.setHandler('_key_PONTO', this.setButtonValue.bind(this, '..'));
        this.setHandler('_key_BARRA_1', this.setButtonValue.bind(this, '//'));
        this.setHandler('_key_Acento_Grave', this.setButtonValue.bind(this, '\`'));
        this.setHandler('_key_COLCHETES_ABERTO', this.setButtonValue.bind(this, '['));
        this.setHandler('_key_BARRA_2', this.setButtonValue.bind(this, '\\'));
        this.setHandler('_key_COLCHETES_FECHADO', this.setButtonValue.bind(this, ']'));
        this.setHandler('_key_ASPAS', this.setButtonValue.bind(this, '\"'));
        this.setHandler('cancel', this.closeWin.bind(this));
    };

    Window_keyboardSettings_setButtonValue.prototype.setButtonValue = function (value) {
        if (this._buttonId != null && this._winParent != null) {
            var buttonsEssentials = ['ok', 'cancel', 'menu', 'menuMultiplayerLocal'];
            if (buttonsEssentials.filter(function (button) {
                return Input.keyMapper[this._buttonId] === button;
            }, this).length > 0 && !this.buttonAlradyExist(buttonsEssentials, [this._buttonId, Input.keyMapper[this._buttonId]])) {
                SoundManager.playBuzzer();
                this.activate();
                return;
            }
            Input.keyMapper[this._buttonId] = value;
            Input._fileSettingsUpdate();
            this.closeWin();
        }
    };

    Window_keyboardSettings_setButtonValue.prototype.buttonAlradyExist = function (values, exclude) {
        var buttons = [];
        Object.keys(Input.keyMapper).filter(function (key) {
            if (exclude[0] != key)
                if (values.indexOf(Input.keyMapper[key]) != -1)
                    buttons.push(Input.keyMapper[key]);
        });
        return buttons.length >= 0 && buttons.indexOf(exclude[1]) != -1;
    };

    Window_keyboardSettings_setButtonValue.prototype.closeWin = function () {
        if (this._winParent) {
            this._winParent.refresh();
            this._winParent._cursorRectHide = false;
        }
        this.hide();
    };

    // ----------------------------------------------------------------------------
    // - - - END PART CODE ☼ ☼ ☺ ☺ ☼ ☼ MENU GERAL ↑ ↑ ↑ ↑
    // ----------------------------------------------------------------------------
})();