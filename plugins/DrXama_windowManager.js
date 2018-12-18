//==================================================================================================
// DrXama_windowManager.js
//==================================================================================================
/*:
 * @plugindesc v1.3.1 - Gerenciador de janelas
 *
 * @author Dr.Xamã
 * 
 * @param Fontes
 * @desc Todas as fontes para os textos
 * @type struct<FontGame>[]
 * @default ["{\"Fonte Nome\":\"GameFont\",\"Fonte Url\":\"mplus-1m-regular.ttf\"}"]
 * 
 * @help
 * ================================================================================
 *    CHANGELOG
 * ================================================================================
 * v1.3.1
 * - Agora é possível definir frames para o desaparecimento das janelas.
 * - Novo efeito de fade-in quando a janela é criada.
 * 
 * v1.1.1
 * - Agora é possível fixar as janelas no mapa.
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Gerencia as janelas personalizadas. Exiba variaveis, textos, valores e etc, 
 * na tela do seu jogo.
 * ================================================================================
 *    Fontes
 * ================================================================================
 * Você pode carregar suas fontes para os textos. Coloque a fonte na pasta 
 * "fonts" e depois acrescente a fonte a lista -> "Fontes"
 * ================================================================================
 *    Comandos de script
 * ================================================================================
 * - this.createHudWindow(tag, x, y, width, height, opacity, padding, margin, 
 * zIndex, colorTone, tileXy);
 *                    - tag : Id da janela
 *                    - x : eixo x da janela
 *                    - y : eixo y da janela
 *                    - width : largura da janela
 *                    - height : altura da janela
 *                    - opacity : opacidade da janela
 *                    - padding : O tamanho do preenchimento entre o quadro 
 *                                e o conteúdo.
 *                    - margin : O tamanho da margem para o fundo da janela.
 *                    - zIndex : O valor da camada em que a janela se aplica
 *                    - colorTone : A cor da janela em [r, g, b]
 *                    - tileXy : Se o eixo x e y são posições em tiles.
 * 
 * - this.windowHudDrawText(tag, text, x, y, opacity, fontFace, fontSize, 
 * fontItalic, textColor, outlineWidth, outlineColor, textAlign);
 *                    - tag : Id da janela
 *                    - text : valor do texto
 *                    - x : eixo x do texto
 *                    - y : eixo y do texto
 *                    - opacity : opacidade do texto
 *                    - fontFace : fonte do texto
 *                    - fontSize : tamanho da fonte
 *                    - fontItalic : define se a fonte é em itálico.
 *                    - textColor : cor do texto
 *                    - outlineWidth : A largura do contorno do texto.
 *                    - outlineColor : A cor do contorno do texto no formato 
 *                                     CSS.
 *                    - textAlign : O alinhamento do texto
 *                                  - left, right e center
 * 
 * - this.windowHudDrawPicture(tag, pictureName, opacity, x, y, scale);
 *                    - tag : Id da janela
 *                    - pictureName : Nome da imagem
 *                    - opacity : Opacidade da imagem
 *                    - x : eixo x da imagem
 *                    - y : eixo y da imagem
 *                    - scale : tamanho da imagem
 * 
 * - this.windowHudDrawInfo(tag, target, infoId, targetId, 
 * messageValue, textSettings);
 *                    - tag : Id da janela
 *                    - target : O alvo para coletar a informação
 *                    - infoId : Id da informação
 *                    - targetId : Id do alvo(caso for um evento por exemplo)
 *                    - messageValue : Mensagem a ser exibida(Caso for preciso)
 *                    - textSettings : Configuração do texto da mensagem
 * 
 * - this.windowHudSetFramesHide(tag, frames);
 *                    - tag : Id da janela
 *                    - frames : Tempo que a janela ficará visível(60 = 1 Segundo)
 * 
 * - this.removeHudWindow(tag);
 *                    - tag : Id da janela
 * ================================================================================
 *    DrawInfo
 * ================================================================================
 * - Valor especial para a mensagem: %1
 *         - %1 : Exibe a informação
 * - Exemplo: this.windowHudDrawInfo(tag, 'Actor', 'Name', null, 'Olá %1, Obrigado por usar o plugin!');
 * 
 * - Target 
 *         - InfoId
 * - Actor:
 *         - Name : Retorna o nome do jogador
 *         - Nickname : Retorna o nickname do jogador
 *         - Profile : Retorna o profile do jogador
 *         - CurrentExp : Retorna o exp atual do jogador
 *         - NextRequiredExp : Retorna o exp exigido para o proximo nivel
 *         - MaxLevel : Retorna o level maximo do jogador
 * 
 * - Follower
 *         - Name : Retorna o nome do seguidor
 *         - Nickname : Retorna o nickname do seguidor
 *         - Profile : Retorna o profile do seguidor
 *         - CurrentExp : Retorna o exp atual do seguidor
 *         - NextRequiredExp : Retorna o exp exigido para o proximo nivel
 *         - MaxLevel : Retorna o level maximo do seguidor
 * 
 * - Event
 *         - Name : Retorna o nome do evento
 *         - Note : Retorna a nota do evento
 * ================================================================================
 *    Atualização
 * ================================================================================
 * Para atualizar esse plugin vá no github do Dr.Xamã
 * https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV
 */
/*~struct~FontGame:
 *
 * @param Fonte Nome
 * @desc O nome da fonte
 * @type string
 * @default GameFont
 * 
 * @param Fonte Url
 * @desc O nome do arquivo da fonte
 * @type string
 * @default mplus-1m-regular.ttf
 * 
 */
var DX = DX || {
    'site': function () { return require('nw.gui').Shell.openExternal('http://drxama.epizy.com/?i=1'); },
    'terms': function () { return require('nw.gui').Shell.openExternal('http://drxama.epizy.com/?page_id=296'); },
    'compatibility': function () {
        if (Utils.RPGMAKER_VERSION == '1.4.1' ||
            Utils.RPGMAKER_VERSION == '1.4.0' ||
            Utils.RPGMAKER_VERSION == '1.3.5' ||
            Utils.RPGMAKER_VERSION == '1.3.4' ||
            Utils.RPGMAKER_VERSION == '1.3.3' ||
            Utils.RPGMAKER_VERSION == '1.3.2' ||
            Utils.RPGMAKER_VERSION == '1.3.1' ||
            Utils.RPGMAKER_VERSION == '1.3.0' ||
            Utils.RPGMAKER_VERSION == '1.2.0' ||
            Utils.RPGMAKER_VERSION == '1.1.0' ||
            Utils.RPGMAKER_VERSION == '1.0.1' ||
            Utils.RPGMAKER_NAME != 'MV')
            return Graphics.printError('Dr.Xamã', 'Atualmente seu RPG MAKER MV não suporta o seguinte plugin: DrXama_windowManager'), SceneManager.stop();
    }
};
DX.windowManager = DX.windowManager || {
    'font': function () { return require('nw.gui').Shell.openExternal('https://www.dropbox.com/s/z3nj4rbigv6u9jp/fonts.rar?dl=0'); },
    'page': function () { return require('nw.gui').Shell.openExternal('http://drxama.epizy.com/?p=257'); },
    'update': function () { return require('nw.gui').Shell.openExternal('https://www.dropbox.com/s/vtjqe6mvgh2osh2/DrXama_windowManager.js?dl=0'); },
    'changelog': function () { return require('nw.gui').Shell.openExternal('https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/blob/master/changelog/DrXama_windowManager.md'); },
    'version': function () { return console.log('v1.3.1') }
};
(function () {
    "use strict";
    //-----------------------------------------------------------------------------
    // Parametros
    //
    var params = PluginManager.parameters('DrXama_windowManager'),
        fonts = JSON.parse(params['Fontes']);

    //-----------------------------------------------------------------------------
    // Variaveis
    //
    var window_huds = [];

    //-----------------------------------------------------------------------------
    // Scene_Boot
    //
    const __Scene_Boot__prototype__start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        __Scene_Boot__prototype__start.call(this);
        loadFonts();
    };

    //-----------------------------------------------------------------------------
    // Funções
    //
    // Carrega as fontes
    function loadFonts() {
        if (fonts instanceof Array) {
            fonts.forEach(function (font) {
                font = JSON.parse(font) || {};
                var fontName = String(font['Fonte Nome']),
                    fontUrl = String(font['Fonte Url']),
                    fontPath = '/fonts/' + fontUrl;
                if (!Graphics.isFontLoaded(fontName)) {
                    Graphics.loadFont(fontName, fontPath);
                }
            });
        }
    };

    //-----------------------------------------------------------------------------
    // Game_Interpreter
    //
    Game_Interpreter.prototype.createHudWindow = function (tag, x, y, width, height, opacity, padding, margin, zIndex, colorTone, tileXy) {
        var scene = SceneManager._scene;
        scene.createHudWindow.apply(scene, arguments);
    };

    Game_Interpreter.prototype.windowHudDrawText = function (tag, text, x, y, opacity, fontFace, fontSize, fontItalic, textColor, outlineWidth, outlineColor, textAlign) {
        var scene = SceneManager._scene;
        scene.windowHudDrawText.apply(scene, arguments);
    };

    Game_Interpreter.prototype.windowHudDrawPicture = function (tag, pictureName, opacity, x, y, scale) {
        var scene = SceneManager._scene;
        scene.windowHudDrawPicture.apply(scene, arguments);
    };

    Game_Interpreter.prototype.windowHudDrawInfo = function (tag, target, infoId, targetId, messageValue, textSettings) {
        var scene = SceneManager._scene;
        scene.windowHudDrawInfo.apply(scene, arguments);
    };

    Game_Interpreter.prototype.windowHudSetFramesHide = function (tag, frames) {
        var scene = SceneManager._scene;
        scene.windowHudSetFramesHide.apply(scene, arguments);
    };

    Game_Interpreter.prototype.removeHudWindow = function (tag) {
        var scene = SceneManager._scene;
        scene.removeHudWindow.apply(scene, arguments);
    };

    //-----------------------------------------------------------------------------
    // Scene_Base
    //
    Scene_Base.prototype.createHudWindow = function (tag, x, y, width, height, opacity, padding, margin, zIndex, colorTone, tileXy) {
        var win = new Window_Hud(x, y, width, height, tileXy),
            tag = tag || Math.floor(window_huds.length + 1),
            zIndex = zIndex || Math.floor(window_huds.length + 1),
            colorTone = colorTone || [
                Math.floor(Math.random() * 255) + 1,
                Math.floor(Math.random() * 255) + 1,
                Math.floor(Math.random() * 255) + 1
            ];
        if (zIndex <= 0) zIndex++;
        if (colorTone instanceof Array === false) {
            colorTone = [
                Math.floor(Math.random() * 255) + 1,
                Math.floor(Math.random() * 255) + 1,
                Math.floor(Math.random() * 255) + 1
            ];
        }
        win.tag = tag;
        win.saveOpacity = opacity || 0;
        win.padding = padding || 18;
        win.margin = margin || 4;
        win.setTone(colorTone[0], colorTone[1], colorTone[2]);
        window_huds.push(win);
        this.addChildAt(win, zIndex);
    };

    Scene_Base.prototype.windowHudDrawText = function (tag, text, x, y, opacity, fontFace, fontSize, fontItalic,
        textColor, outlineWidth, outlineColor, textAlign) {
        text = text || '???',
            x = x || 6,
            y = y || 6,
            opacity = opacity || 255,
            fontFace = fontFace || 'GameFont',
            fontSize = fontSize || 28,
            fontItalic = fontItalic || false,
            textColor = '#ffffff',
            outlineWidth = outlineWidth || 4,
            outlineColor = outlineColor || 'rgba(0, 0, 0, 0.5)',
            textAlign = textAlign || 'left',
            textAlign = String(textAlign).toLowerCase();
        var win = window_huds.map(function (windowHud) {
            if (windowHud.tag == tag)
                return windowHud;
        });
        win.forEach(function (windowHud) {
            if (windowHud instanceof Window_Hud)
                windowHud.drawTextMaster(text, x, y, opacity, fontFace, fontSize, fontItalic,
                    textColor, outlineWidth, outlineColor, textAlign);
        });
    };

    Scene_Base.prototype.windowHudDrawPicture = function (tag, pictureName, opacity, x, y, scale) {
        pictureName = pictureName || '',
            opacity = opacity || 255,
            x = x || 0,
            y = y || 0,
            scale = scale || [1, 1];
        if (scale instanceof Array === false) {
            scale = [1, 1];
        }
        var win = window_huds.map(function (windowHud) {
            if (windowHud.tag == tag)
                return windowHud;
        });
        win.forEach(function (windowHud) {
            if (windowHud instanceof Window_Hud)
                windowHud.drawPictureMaster(pictureName, x, y, scale);
        });
    };

    Scene_Base.prototype.windowHudDrawInfo = function (tag, target, infoId, targetId,
        messageValue, textSettings) {
        target = target || 'actor',
            infoId = infoId || 'name',
            target = String(target).toLowerCase(),
            infoId = String(infoId).toLowerCase();
        if (target == 'follower') {
            targetId = targetId || 0;
            if (targetId > Math.floor($gamePlayer.followers()._data.length - 1)) {
                targetId = Math.floor($gamePlayer.followers()._data.length - 1);
            }
        } else if (target == 'event') {
            targetId = targetId || 1;
            if (targetId > $gameMap.events().length) {
                targetId = $gameMap.events().length;
            }
        } else {
            targetId = targetId || 0;
        }
        if (textSettings instanceof Array == false) {
            textSettings = [
                0, 0, 255, 'GameFont', 28,
                false, 'White', 4, 'black', 'left'
            ]
        }
        var win = window_huds.map(function (windowHud) {
            if (windowHud.tag == tag)
                return windowHud;
        });
        win.forEach(function (windowHud) {
            if (windowHud instanceof Window_Hud)
                windowHud.drawInfoMaster(target, infoId, targetId, messageValue, textSettings);
        });
    };

    Scene_Base.prototype.windowHudSetFramesHide = function (tag, frames) {
        var win = window_huds.map(function (windowHud) {
            if (windowHud.tag == tag)
                return windowHud;
        });
        win.forEach(function (windowHud) {
            if (windowHud instanceof Window_Hud)
                windowHud.setFramesHide(frames);
        });
    };

    Scene_Base.prototype.removeHudWindow = function (tag) {
        var win = window_huds.map(function (windowHud) {
            if (windowHud.tag == tag)
                return windowHud;
        });
        win.forEach(function (windowHud) {
            if (windowHud instanceof Window_Hud) {
                var indexOf = window_huds.indexOf(windowHud);
                if (indexOf != -1) window_huds.splice(indexOf, 1);
                this.removeChild(windowHud);
            }
        }, this);
    };

    //-----------------------------------------------------------------------------
    // Window_Hud
    //
    function Window_Hud() {
        this.initialize.apply(this, arguments);
    }

    Window_Hud.prototype = Object.create(Window_Base.prototype);
    Window_Hud.prototype.constructor = Window_Hud;

    Window_Hud.prototype.initialize = function (x, y, width, height, tileXy) {
        width = width || this.windowWidth();
        height = height || this.windowHeight();
        x = x || 0;
        y = y || 0;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._width = width;
        this._height = height;
        this._pictures = [];
        this._tileXy = tileXy;
        this._tileX = x;
        this._tileY = y;
        this.opacity = 0;
        this.contentsOpacity = 0;
        this._isStarted = false;
    };

    Window_Hud.prototype.windowWidth = function () {
        return this._width || SceneManager._screenWidth;
    };

    Window_Hud.prototype.windowHeight = function () {
        return this._height || SceneManager._screenHeight;
    };

    Window_Hud.prototype.updateTone = function () { };

    Window_Hud.prototype.drawTextMaster = function (text, x, y, opacity, fontFace, fontSize,
        fontItalic, textColor, outlineWidth, outlineColor, textAlign) {
        x += this.textPadding();
        var width = this.contents.width - this.textPadding() * 2;
        this.contents.fontFace = fontFace;
        this.contents.fontItalic = fontItalic;
        this.contents.fontSize = fontSize;
        this.contents.paintOpacity = opacity;
        this.contents.textColor = textColor;
        this.contents.outlineWidth = outlineWidth;
        this.contents.outlineColor = outlineColor;
        this.drawText(text, x, y, width, 0, textAlign);
    };

    Window_Hud.prototype.drawPictureMaster = function (pictureName, x, y, scale) {
        var picture = new Sprite(ImageManager.loadPicture(pictureName));
        picture.move(x, y);
        picture.scale = new Point(scale[0], scale[1]);
        this._pictures.push(picture);
        this.addChild(picture);
    };

    Window_Hud.prototype.drawInfoMaster = function (target, infoId, targetId,
        messageValue, textSettings) {
        var value = '???';
        switch (target) {
            case 'actor':
                switch (infoId) {
                    case 'name':
                        value = $gameParty.leader().name();
                        break;
                    case 'nickname':
                        value = $gameParty.leader().nickname();
                        break;
                    case 'profile':
                        value = $gameParty.leader().profile();
                        break;
                    case 'currentexp':
                        value = $gameParty.leader().currentExp();
                        break;
                    case 'nextrequiredexp':
                        value = $gameParty.leader().nextRequiredExp();
                        break;
                    case 'maxlevel':
                        value = $gameParty.leader().maxLevel();
                        break;
                }
                break;
            case 'follower':
                switch (infoId) {
                    case 'name':
                        value = $gamePlayer.followers()._data[targetId].actor().name();
                        break;
                    case 'nickname':
                        value = $gamePlayer.followers()._data[targetId].actor().nickname();
                        break;
                    case 'profile':
                        value = $gamePlayer.followers()._data[targetId].actor().profile();
                        break;
                    case 'currentexp':
                        value = $gamePlayer.followers()._data[targetId].actor().currentExp();
                        break;
                    case 'nextrequiredexp':
                        value = $gamePlayer.followers()._data[targetId].actor().nextRequiredExp();
                        break;
                    case 'maxlevel':
                        value = $gamePlayer.followers()._data[targetId].actor().maxLevel();
                        break;
                }
                break;
            case 'event':
                switch (infoId) {
                    case 'name':
                        value = $dataMap.events[targetId].name;
                        break;
                    case 'note':
                        value = $dataMap.events[targetId].note;
                        break;
                }
                break;
        }
        if (typeof messageValue == 'string') {
            value = messageValue.format(value);
        }
        this.drawTextMaster(value, textSettings[0], textSettings[1], textSettings[2],
            textSettings[3], textSettings[4], textSettings[5], textSettings[6],
            textSettings[7], textSettings[8], textSettings[9]);
    };

    Window_Hud.prototype.setFramesHide = function (frames) {
        this._framesHide = parseInt(frames);
    };

    Window_Hud.prototype.scrolledX = function () {
        return $gameMap.adjustX(this._tileX);
    };

    Window_Hud.prototype.scrolledY = function () {
        return $gameMap.adjustY(this._tileY);
    };

    Window_Hud.prototype.screenX = function () {
        var tw = $gameMap.tileWidth();
        return Math.round(this.scrolledX() * tw + tw / 2);
    };

    Window_Hud.prototype.screenY = function () {
        var th = $gameMap.tileHeight();
        return Math.round(this.scrolledY() * th + th);
    };

    Window_Hud.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        this.updateStarted();
        this.updatePosition();
        this.updateFramesHide();
    };

    Window_Hud.prototype.updateStarted = function () {
        if (!this._isStarted) {
            if (this.opacity < this.saveOpacity) this.opacity += 4;
            if (this.contentsOpacity < 255) this.contentsOpacity += 4;
            if (this.opacity >= this.saveOpacity && this.contentsOpacity >= 255) this._isStarted = true;
        }
    };

    Window_Hud.prototype.updatePosition = function () {
        if (this._tileXy) {
            this.x = this.screenX();
            this.y = this.screenY();
        }
    };

    Window_Hud.prototype.updateFramesHide = function () {
        if (!this._isStarted) return;
        if (typeof this._framesHide === 'number') {
            if (this._framesHide > 0) return this._framesHide -= .60;
            if (this.opacity > 0) this.opacity -= 4, this.contentsOpacity -= 4;
            else SceneManager._scene.removeHudWindow.call(SceneManager._scene, this.tag);
        }
    };
})();
