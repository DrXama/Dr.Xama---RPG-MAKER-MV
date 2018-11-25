//==================================================================================================
// DrXama_charactersNames.js
//==================================================================================================
/*:
 * @plugindesc v1.3.2 - Adição de nome sobre o personagem, seguidores e eventos
 *
 * @author Dr.Xamã
 * 
 * @param Atores
 * @type struct<Atores>[]
 * @default []
 * @desc Lista dos atores para o plugin gerenciar
 * 
 * @param Nomes dos eventos
 * @type struct<NomeEventos>[]
 * @default []
 * @desc Lista com os nomes para os eventos
 * 
 * @help
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Adição de nome sobre o personagem, seguidores e eventos
 * ================================================================================
 *    Detalhes
 * ================================================================================
 * - O sistema por padrão exibe o nome do evento
 * - Você precisa adicionar os atores a lista para exibir os nomes
 * - Se você não usar o comando "event_name", então o script pega o nome do evento
 * - Se você não digitar um nome para o ator e deixar em branco o script pega o
 *   nome do ator na data
 * - O script está preparado para dar valores padrões a campos não especificados
 * ================================================================================
 *    Nomes para os eventos
 * ================================================================================
 * Para usar os nomes personalizados para os eventos, você precisa usar o plugin
 * "DrXama_languageManager".
 * 
 * Você pode definir o nome de um evento como 'getById ID' para pegar um nome
 * especificado pelos parâmetros. Exemplo: getById 1
 * ================================================================================
 *    Comandos
 * ================================================================================
 * Para evitar erros digite exatamente como está a baixo!
 * Comentario dos eventos:
 * - event_textOff - Desliga a exibição do nome do evento
 * - event_textOn - Força a exibição do nome do evento
 * - event_name: String - Nome a ser exibido
 * - event_textIcon: Number - Index do icone
 * - event_textIconId: String - O identificador do icone
 * - event_textBitmapWidth: Number - A largura do bitmap do icone
 * - event_textBitmapHeight: Number - A altura do bitmap do icone
 * - event_textColor: Number(0-31) - Numero da cor do texto
 * - event_textFontSize: Number(10-72) - Tamanho do texto
 * - event_textDistance: Number(0-100) - Distancia do texto ao evento
 * - event_textAdjustX: Number(0-???) - Ajuste do eixo X do texto
 * - event_textOutline: Boolean(true-false) - Exibe\Ocultar o esboço do texto
 * - event_textOutlineColor: Number(0-31) - Numero da cor do esboço
 * - event_textAnimationFade: Boolean(true-false) - Ativar/Desativar a 
 *   animação(Fade)
 * - event_textAnimationScale: Boolean(true-false) - Ativar/Desativar a 
 *   animação(Scale)
 * - event_textAnimationRotation: Boolean(true-false) - Ativar/Desativar a 
 *   animação(Rotation)
 * - event_textAnimationFadeFrames: Number(1-???) - Frames da animação(Fade)
 * - event_textAnimationScaleFrames: Number(1-???) - Frames da animação(Scale)
 * - event_textAnimationRotationFrames: Number(1-???) - Frames da animação(Rotation)
 * - $gameSystem.showEventTextIcon(id) - Exibe o icone do evento
 * - $gameSystem.hideEventTextIcon(id) - Oculta o icone do evento
 * ================================================================================
 *    Atualização
 * ================================================================================
 * Para atualizar esse plugin vá no github do Dr.Xamã
 * https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV
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
            return Graphics.printError('Dr.Xamã', 'Atualmente seu RPG MAKER MV não suporta o seguinte plugin: DrXama_charactersNames'), SceneManager.stop();
    }
};
DX.charactersNames = DX.charactersNames || {
    'page': function () { return require('nw.gui').Shell.openExternal('http://drxama.epizy.com/?p=275'); },
    'update': function () { return require('nw.gui').Shell.openExternal('https://www.dropbox.com/s/qrepex5oprlwmbr/DrXama_charactersNames.js?dl=0'); },
    'changelog': function () { return require('nw.gui').Shell.openExternal('https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/blob/master/changelog/DrXama_charactersNames.md'); },
    'version': function () { return console.log('v1.3.2') }
};
(function () {
    "use strict";
    //-----------------------------------------------------------------------------
    // PluginManager
    //
    var params = PluginManager.parameters('DrXama_charactersNames');
    params["Atores"] = params["Atores"].length <= 0 ? '[]' : params["Atores"];
    params["Nomes dos eventos"] = params["Nomes dos eventos"].length <= 0 ? '[]' : params["Nomes dos eventos"];
    var parameters_actors = JSON.parse(params["Atores"]),
        parameters_eventsNames = JSON.parse(params["Nomes dos eventos"]),
        bitmapIconsHide = [];

    function actorParameter(actorId) {
        var i = 0;
        var length = parameters_actors.length;
        for (; i < length; i++) {
            let actor = JSON.parse(parameters_actors[i]) || {};
            if (actor.Id == actorId) {
                return actor;
            }
        }
        return false;
    };

    function getBitmapColor(n) {
        if (!n) n = 0;
        var px = 96 + (n % 8) * 12 + 6;
        var py = 144 + Math.floor(n / 8) * 12 + 6;
        var windowskin = ImageManager.loadSystem('Window');
        return windowskin.getPixel(px, py);
    };

    function languageManagerIsOn() {
        return typeof $gameSystem.getterLanguageSystem === 'function' ? true : false;
    };

    function eventName(id) {
        let name = '???';
        parameters_eventsNames.map(data => {
            data = JSON.parse(data) || {};
            if (Number(data["Id"]) === id &&
                String(data["Language"]) === $gameSystem.getterLanguageSystem())
                return name = String(data["Nome"]);
        });
        return name;
    };

    function localPath(p) {
        // Retira uma parte da string
        if (p.substring(0, 1) === '/')
            p = p.substring(1);
        // Importa o modulo PATH do Node
        var path = require('path'),
            // Cria a base para o caminho local
            base = path.dirname(process.mainModule.filename);
        // Retorna a base do caminho associado ao caminho
        return path.join(base, p);
    };

    function saveData() {
        let fs = require('fs');
        if (fs.existsSync(localPath('save'))) {
            fs.writeFileSync(localPath('save/data_7.data'), LZString.compressToBase64(JsonEx.stringify(bitmapIconsHide)), 'utf8');
        }
    };

    function initializeData() {
        let fs = require('fs');
        if (fs.existsSync(localPath('save/data_7.data'))) {
            bitmapIconsHide = JsonEx.parse(LZString.decompressFromBase64(fs.readFileSync(localPath('save/data_7.data'), 'utf8')));
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Map
    //
    const _scene_map_start = Scene_Map.prototype.start,
        _scene_map_update = Scene_Map.prototype.update;
    let _framesIconsHide = null;

    Scene_Map.prototype.start = function () {
        _scene_map_start.call(this);
        _framesIconsHide = {
            initialize: true,
            frames: 60
        };
    };

    Scene_Map.prototype.update = function () {
        _scene_map_update.call(this);
        if (!_framesIconsHide) return;
        if (_framesIconsHide.frames > 0) {
            _framesIconsHide.frames -= .60;
        } else {
            _framesIconsHide = null;
            $gameSystem.updateHideIcons();
        }
    };

    //-----------------------------------------------------------------------------
    // Spriteset_Map
    //
    const spriteset_map_createCharacters = Spriteset_Map.prototype.createCharacters;
    Spriteset_Map.prototype.createCharacters = function () {
        spriteset_map_createCharacters.call(this);
        this.createCharactersNames();
    };

    Spriteset_Map.prototype.createCharactersNames = function () {
        this._charactersNames = [];
        this._eventsNamesLength = $gameMap.events().length;
        $gameMap.events().forEach(function (event) {
            if (event) {
                this._charactersNames.push(new Sprite_CharacterName(event));
            }
        }, this);
        $gamePlayer.followers().reverseEach(function (follower) {
            this._charactersNames.push(new Sprite_CharacterName(follower));
        }, this);
        this._charactersNames.push(new Sprite_CharacterName($gamePlayer));
        for (var i = 0; i < this._charactersNames.length; i++) {
            this._tilemap.addChild(this._charactersNames[i]);
        }
    };

    //-----------------------------------------------------------------------------
    // Game_Map
    //
    const game_map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function (sceneActive) {
        game_map_update.apply(this, arguments);
        var sceneSpriteset = SceneManager._scene._spriteset;
        var currentValue = $gameMap.events().length;
        if (sceneSpriteset._eventsNamesLength != currentValue) {
            sceneSpriteset._eventsNamesLength = currentValue;
            for (var i = 0; i < sceneSpriteset._charactersNames.length; i++) {
                sceneSpriteset._tilemap.removeChild(sceneSpriteset._charactersNames[i]);
            }
            sceneSpriteset.createCharactersNames();
        }
    };

    //-----------------------------------------------------------------------------
    // BattleManager
    //
    const __BattleManager_startBattle = BattleManager.setup;
    BattleManager.setup = function (troopId, canEscape, canLose) {
        __BattleManager_startBattle.apply(this, arguments);
        $gameTemp._inBattleProcess = true;
    };

    const __BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
    BattleManager.updateBattleEnd = function () {
        __BattleManager_updateBattleEnd.call(this);
        $gameTemp._inBattleProcess = null;
    };

    //-----------------------------------------------------------------------------
    // Game_Temp
    //
    Game_Temp.prototype.inBattleProcess = function () {
        return this._inBattleProcess;
    };

    //-----------------------------------------------------------------------------
    // Game_Player
    //       
    Game_Player.prototype.hideSpriteCharacter = function () {
        return this._hideSpriteCharacter;
    };

    //-----------------------------------------------------------------------------
    // Game_System
    //
    const _game_system_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        _game_system_initialize.call(this);
        initializeData();
    };

    Game_System.prototype.showEventTextIcon = function (id) {
        let scene = SceneManager._scene;
        id = id === undefined ? '_default' : String(id).replace(/\s{1,}/g, '');
        if (scene instanceof Scene_Map) {
            let sceneSpriteset = scene._spriteset;
            if (sceneSpriteset && sceneSpriteset._charactersNames && sceneSpriteset._charactersNames.length > 0) {
                sceneSpriteset._charactersNames.map(character => {
                    if (character._bitmapIcon.id === id) {
                        character._bitmapIcon.show = true;
                        character.setBitmap();
                        this.removeCacheHideIcon(id);
                    }
                }, this);
            }
        }
    };

    Game_System.prototype.hideEventTextIcon = function (id) {
        let scene = SceneManager._scene;
        id = id === undefined ? '_default' : String(id).replace(/\s{1,}/g, '');
        if (scene instanceof Scene_Map) {
            let sceneSpriteset = scene._spriteset;
            if (sceneSpriteset && sceneSpriteset._charactersNames && sceneSpriteset._charactersNames.length > 0) {
                sceneSpriteset._charactersNames.map(character => {
                    if (character._bitmapIcon.id === id) {
                        character._bitmapIcon.show = false;
                        character.setFrame(0, 0, 48, 48);
                        character.setBitmap();
                        this.addCacheHideIcon(id);
                    }
                }, this);
            }
        }
    };

    Game_System.prototype.addCacheHideIcon = function (id) {
        if (bitmapIconsHide.filter(_id => { return _id === id }).length <= 0)
            bitmapIconsHide.push(id);
        saveData();
    };

    Game_System.prototype.removeCacheHideIcon = function (id) {
        if (bitmapIconsHide.filter(_id => { return _id === id }).length > 0)
            bitmapIconsHide.splice(bitmapIconsHide.indexOf(id), 1);
        saveData();
    };

    Game_System.prototype.updateHideIcons = function () {
        bitmapIconsHide.map(id => {
            this.hideEventTextIcon(id);
        }, this);
    };

    //-----------------------------------------------------------------------------
    // Sprite_Character
    //
    const sprite_character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function () {
        sprite_character_update.call(this);
        this.updateOpacitySpriteCharacter();
    };

    Sprite_Character.prototype.updateOpacitySpriteCharacter = function () {
        if ($gameTemp.inBattleProcess()) {
            if (this._character instanceof Game_Player ||
                this._character instanceof Game_Follower) {
                this._character._hideSpriteCharacter = true;
                return;
            }
        }
        if (this.opacity <= 0) {
            if (!this._character._hideSpriteCharacter)
                this._character._hideSpriteCharacter = true;
        } else {
            if (this._character._hideSpriteCharacter)
                this._character._hideSpriteCharacter = false;
        }
    };

    //-----------------------------------------------------------------------------
    // Sprite_CharacterName
    //
    function Sprite_CharacterName() {
        this.initialize.apply(this, arguments);
    }

    Sprite_CharacterName.prototype = Object.create(Sprite_Base.prototype);
    Sprite_CharacterName.prototype.constructor = Sprite_CharacterName;

    Sprite_CharacterName.prototype.initialize = function (character) {
        Sprite_Base.prototype.initialize.call(this);
        this.initMembers(character);
        this.setBitmap();
    };

    Sprite_CharacterName.prototype.initMembers = function (character) {
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this._character = character;
        this._animationFade = false;
        this._animationScale = false;
        this._animationRotation = false;
        this._animationFadeFrames = 20;
        this._animationScaleFrames = 20;
        this._animationRotationFrames = 20;
        this._bitmapIcon = false;
    };

    Sprite_CharacterName.prototype.update = function () {
        Sprite_Base.prototype.update.call(this);
        this.updatePosition();
        this.updateAnimationFade();
        this.updateAnimationScale();
        this.updateAnimationRotation();
        this.updateTransparent();
        this.updateEvents();
        this.updateTouch();
        if (languageManagerIsOn()) this.drawContent();
    };

    Sprite_CharacterName.prototype.setBitmap = function () {
        this.bitmap = new Bitmap(48, 48);
        this._bitmapTextDistance = 36;
        this._bitmapTextAdjustX = 0;
        this._bitmapTextHide = false;
        this.updateBitmapText();
    };

    Sprite_CharacterName.prototype.bitmapTextDistance = function (distance) {
        this._bitmapTextDistance += distance;
    }

    Sprite_CharacterName.prototype.updateBitmapText = function () {
        var bitmapText = '';
        var bitmapTextShow = false;
        var bitmapTextColor = getBitmapColor();
        var bitmapTextSize = 14;
        var bitmapTextDistance = 0;
        var bitmapTextOutline = true;
        var bitmapTextOutlineColor = 'rgba(0, 0, 0, 0.8)';
        var bitmapTextAdjustX = 0;
        var bitmapAnimationFade = false;
        var bitmapAnimationFadeFramesChange = false;
        var bitmapAnimationFadeFrames = this._animationFadeFrames;
        var bitmapAnimationScale = false;
        var bitmapAnimationScaleFramesChange = false;
        var bitmapAnimationScaleFrames = this._animationScaleFrames;
        var bitmapAnimationRotation = false;
        var bitmapAnimationRotationFramesChange = false;
        var bitmapAnimationRotationFrames = this._animationRotationFrames;
        var bitmapIcon = { index: null, id: '_default', show: true, distance: 0 };
        var bitmapResize = { resize: null, width: this.bitmap.width, height: this.bitmap.height };
        if (this._character instanceof Game_Event) {
            bitmapText = $dataMap.events[this._character.eventId()].name;
            bitmapTextShow = true;
            for (var i = 0; i < this._character.event().pages.length; i++) {
                var page = this._character.event().pages[i];
                var hide = false;
                var adjustX = false;
                var forceShow = false;
                page.list.forEach(function (line) {
                    if (line.code == 108 || line.code == 408) {
                        var text = line.parameters[0].trim();
                        if (text.contains('event_name')) {
                            bitmapText = text.replace('event_name:', '');
                        } else if (text.contains('event_textOff')) {
                            hide = true;
                        } else if (text.contains('event_textOn')) {
                            forceShow = true;
                        } else if (text.contains('event_textColor')) {
                            let colorId = parseInt(text.replace('event_textColor:', '')) || 0;
                            if (colorId < 0) colorId = 0;
                            if (colorId > 31) colorId = 31;
                            bitmapTextColor = getBitmapColor(colorId);
                        } else if (text.contains('event_textFontSize')) {
                            let fontSize = parseInt(text.replace('event_textFontSize:', '')) || 14;
                            if (fontSize < 10) fontSize = 10;
                            if (fontSize > 72) fontSize = 72;
                            bitmapTextSize = fontSize;
                        } else if (text.contains('event_textDistance')) {
                            let distance = parseInt(text.replace('event_textDistance:', '')) || 0;
                            if (distance < 0) distance = 0;
                            if (distance > 100) distance = 100;
                            bitmapTextDistance = distance;
                        } else if (text.contains('event_textAdjustX')) {
                            let _adjustX = parseInt(text.replace('event_textAdjustX:', '')) || 0;
                            if (_adjustX < 0) _adjustX = 0;
                            bitmapTextAdjustX = _adjustX;
                            adjustX = true;
                        } else if (text.contains('event_textOutline') && !text.contains('Color')) {
                            let outline = eval(text.replace('event_textOutline:', ''));
                            bitmapTextOutline = outline;
                        } else if (text.contains('event_textOutlineColor')) {
                            let outlineColor = parseInt(text.replace('event_textOutlineColor:', '')) || 0;
                            if (outlineColor < 0) outlineColor = 0;
                            if (outlineColor > 31) outlineColor = 31;
                            bitmapTextOutlineColor = getBitmapColor(outlineColor);
                        } else if (text.contains('event_textIcon') && !text.contains('Id') && !text.contains('Distance')) {
                            bitmapIcon.index = parseInt(text.replace('event_textIcon:', '')) || 0;
                        } else if (text.contains('event_textIconId')) {
                            bitmapIcon.id = String(text.replace('event_textIconId:', '').replace(/\s{1,}/g, ''));
                        } else if (text.contains('event_textIconDistance')) {
                            bitmapIcon.distance = parseInt(text.replace('event_textIconDistance:', '')) || 0;
                        } else if (text.contains('event_textAnimationFade') && !text.contains('Frames') && !text.contains('Scale') && !text.contains('Rotation')) {
                            bitmapAnimationFade = eval(text.replace('event_textAnimationFade:', '')) || false;
                        } else if (text.contains('event_textAnimationFadeFrames')) {
                            bitmapAnimationFadeFrames = parseInt(text.replace('event_textAnimationFadeFrames:', '')) || 20;
                            if (bitmapAnimationFadeFrames < 1) bitmapAnimationFadeFrames = 1;
                            bitmapAnimationFadeFramesChange = true;
                        } else if (text.contains('event_textAnimationScale') && !text.contains('Frames') && !text.contains('Fade') && !text.contains('Rotation')) {
                            bitmapAnimationScale = eval(text.replace('event_textAnimationScale:', '')) || false;
                        } else if (text.contains('event_textAnimationScaleFrames')) {
                            bitmapAnimationScaleFrames = parseInt(text.replace('event_textAnimationScaleFrames:', '')) || 20;
                            if (bitmapAnimationScaleFrames < 1) bitmapAnimationScaleFrames = 1;
                            bitmapAnimationScaleFramesChange = true;
                        } else if (text.contains('event_textAnimationRotation') && !text.contains('Frames') && !text.contains('Fade') && !text.contains('Scale')) {
                            bitmapAnimationRotation = eval(text.replace('event_textAnimationRotation:', '')) || false;
                        } else if (text.contains('event_textAnimationRotationFrames')) {
                            bitmapAnimationRotationFrames = parseInt(text.replace('event_textAnimationRotationFrames:', '')) || 20;
                            if (bitmapAnimationRotationFrames < 1) bitmapAnimationRotationFrames = 1;
                            bitmapAnimationRotationFramesChange = true;
                        } else if (text.contains('event_textBitmapWidth')) {
                            bitmapResize.width = parseInt(text.replace('event_textBitmapWidth:', '')) || bitmapData.width;
                            bitmapResize.resize = true;
                        } else if (text.contains('event_textBitmapHeight')) {
                            bitmapResize.height = parseInt(text.replace('event_textBitmapHeight:', '')) || bitmapData.height;
                            bitmapResize.resize = true;
                        }
                    }
                });
                if (hide && !forceShow) {
                    bitmapTextShow = false;
                    this._bitmapTextHide = true;
                    this.hide();
                }
                if (forceShow) {
                    this._bitmapTextForceShow = true;
                }
                if (adjustX) {
                    this._bitmapTextAdjustX = bitmapTextAdjustX;
                }
                if (bitmapAnimationFade) {
                    this._animationFade = true;
                }
                if (bitmapAnimationFadeFramesChange) {
                    this._animationFadeFrames = bitmapAnimationFadeFrames;
                }
                if (bitmapAnimationScale) {
                    this._animationScale = true;
                }
                if (bitmapAnimationScaleFramesChange) {
                    this._animationScaleFrames = bitmapAnimationScaleFrames;
                }
                if (bitmapAnimationRotation) {
                    this._animationRotation = true;
                }
                if (bitmapAnimationRotationFramesChange) {
                    this._animationRotationFrames = bitmapAnimationRotationFrames;
                }
                if (bitmapResize.resize) {
                    this.bitmap = new Bitmap(bitmapResize.width, bitmapResize.height);
                    bitmapResize.resize = null;
                }
            }
        }
        if (this._character instanceof Game_Follower || this._character instanceof Game_Player) {
            if (this._character.actor) {
                if (this._character.actor() != undefined) {
                    var actorId = this._character.actor().actorId();
                    var actor = $dataActors[actorId];
                }
            } else {
                var actorId = $gameParty.leader().actorId();
                var actor = $dataActors[actorId];
            }
            if (!actor) return;
            bitmapText = actor.name;
            var actorNameShow = eval(actorParameter(actorId)["Exibir nome"]) || false;
            var actorName = actorParameter(actorId)["Nome"];
            var actorTextColor = parseInt(actorParameter(actorId)["Cor do texto"]) || 0;
            var actorTextSize = parseInt(actorParameter(actorId)["Tamanho do texto"]) || 14;
            var actorTextDistance = parseInt(actorParameter(actorId)["Distancia do texto"]) || 0;
            var actorTextOutline = eval(actorParameter(actorId)["Esboço do texto"]);
            var actorTextOutlineColor = parseInt(actorParameter(actorId)["Cor do esboço"]) || 0;
            var actorTextAnimation = actorParameter(actorId)["Animação do texto"] || "None";
            var actorTextAnimationFadeFrames = parseInt(actorParameter(actorId)["Animação(Fade) frames"]) || 20;
            var actorTextAnimationScaleFrames = parseInt(actorParameter(actorId)["Animação(Scale) frames"]) || 20;
            var actorTextAnimationRotationFrames = parseInt(actorParameter(actorId)["Animação(Rotation) frames"]) || 20;
            if (actorNameShow) {
                if (actorName.length > 0 || bitmapText.length > 0) {
                    bitmapTextShow = true;
                }
                if (actorName.length > 0) {
                    bitmapText = actorName;
                }
                bitmapTextColor = getBitmapColor(actorTextColor);
                bitmapTextSize = actorTextSize;
                bitmapTextDistance = actorTextDistance;
                bitmapTextOutline = actorTextOutline;
                bitmapTextOutlineColor = getBitmapColor(actorTextOutlineColor);
                switch (actorTextAnimation) {
                    case "None":
                        this._animationRotation = false;
                        this._animationScale = false;
                        this._animationRotation = false;
                        break;
                    case "Fade":
                        this._animationFade = true;
                        break;
                    case "Scale":
                        this._animationScale = true;
                        break;
                    case "Rotation":
                        this._animationRotation = true;
                        break;
                    case "Fade, Scale, Rotation":
                        this._animationRotation = true;
                        this._animationScale = true;
                        this._animationRotation = true;
                        break;
                    case "Fade, Scale":
                        this._animationRotation = true;
                        this._animationScale = true;
                        break;
                    case "Fade, Rotation":
                        this._animationRotation = true;
                        this._animationRotation = true;
                        break;
                    case "Scale, Rotation":
                        this._animationScale = true;
                        this._animationRotation = true;
                        break;
                    default:
                        this._animationRotation = false;
                        this._animationScale = false;
                        this._animationRotation = false;
                        break;
                }
                this._animationFadeFrames = actorTextAnimationFadeFrames;
                this._animationScaleFrames = actorTextAnimationScaleFrames;
                this._animationRotationFrames = actorTextAnimationRotationFrames;
            }
        }
        this.drawContent(bitmapTextShow, bitmapText, bitmapTextColor, bitmapTextSize, bitmapTextOutline, bitmapTextOutlineColor, bitmapTextDistance);
        this.drawIcon(bitmapIcon);
    };

    Sprite_CharacterName.prototype.drawContent = function (bitmapTextShow, bitmapText, bitmapTextColor, bitmapTextSize, bitmapTextOutline, bitmapTextOutlineColor, bitmapTextDistance) {
        if (this._bitmapIcon.show && typeof this._bitmapIcon.index === 'number') return;
        this.bitmap.clear();
        let bitmapTextDistanceAlrady = false;
        if (bitmapTextShow || this._cacheBitmapValues && this._cacheBitmapValues.bitmapTextShow) {
            if (!this._cacheBitmapValues) {
                this._cacheBitmapValues = {
                    bitmapTextShow: bitmapTextShow,
                    bitmapText: bitmapText,
                    bitmapTextColor: bitmapTextColor,
                    bitmapTextSize: bitmapTextSize,
                    bitmapTextOutline: bitmapTextOutline,
                    bitmapTextOutlineColor: bitmapTextOutlineColor,
                    bitmapTextDistance: bitmapTextDistance,
                    bitmapTextDistanceAlrady: bitmapTextDistanceAlrady
                }
            } else {
                bitmapTextShow = this._cacheBitmapValues.bitmapTextShow;
                bitmapText = this._cacheBitmapValues.bitmapText;
                bitmapTextColor = this._cacheBitmapValues.bitmapTextColor;
                bitmapTextSize = this._cacheBitmapValues.bitmapTextSize;
                bitmapTextOutline = this._cacheBitmapValues.bitmapTextOutline;
                bitmapTextOutlineColor = this._cacheBitmapValues.bitmapTextOutlineColor;
                bitmapTextDistance = this._cacheBitmapValues.bitmapTextDistance;
                bitmapTextDistanceAlrady = this._cacheBitmapValues.bitmapTextDistanceAlrady;
            }
            this._bitmapText = bitmapText;
            this.bitmap.textColor = bitmapTextColor;
            this.bitmap.fontSize = bitmapTextSize;
            if (bitmapTextOutline) {
                this.bitmap.outlineWidth = 5;
            } else {
                this.bitmap.outlineWidth = 3;
            }
            this.bitmap.outlineColor = bitmapTextOutlineColor;
            if (!bitmapTextDistanceAlrady) {
                this.bitmapTextDistance(bitmapTextDistance);
                this._cacheBitmapValues.bitmapTextDistanceAlrady = true;
            }
            if (languageManagerIsOn()) {
                if (this._bitmapText.toLowerCase().includes('getbyid'))
                    this._bitmapText = eventName(Number(this._bitmapText.match(/\d+/g)[0]));
            }
            this.bitmap.drawText(this._bitmapText, 0, this.bitmap.height / 2, this.bitmap.width, 5, 'center');
        }
    };

    Sprite_CharacterName.prototype.drawIcon = function (icon) {
        if (!this._bitmapIcon) this._bitmapIcon = icon;
        if (this._bitmapIcon.show && typeof this._bitmapIcon.index === 'number') {
            var bitmap = ImageManager.loadSystem('IconSet');
            var pw = Window_Base._iconWidth;
            var ph = Window_Base._iconHeight;
            var sx = this._bitmapIcon.index % 16 * pw;
            var sy = Math.floor(this._bitmapIcon.index / 16) * ph;
            this.bitmap.clear();
            this.bitmap = bitmap;
            this.setFrame(sx, sy, pw, ph);
        }
    };

    Sprite_CharacterName.prototype.scrolledX = function () {
        return $gameMap.adjustX(this._character._realX);
    };

    Sprite_CharacterName.prototype.scrolledY = function () {
        return $gameMap.adjustY(this._character._realY);
    };

    Sprite_CharacterName.prototype.screenX = function () {
        var tw = $gameMap.tileWidth();
        var tx = this._bitmapTextAdjustX;
        return Math.round(this.scrolledX() * tw + tw / 2) - tx;
    };

    Sprite_CharacterName.prototype.screenY = function () {
        var th = $gameMap.tileHeight();
        var ty = this._bitmapTextDistance;
        if (this._bitmapIcon.show && typeof this._bitmapIcon.index === 'number') ty += this._bitmapIcon.distance;
        return Math.round(this.scrolledY() * th + th) - ty;
    };

    Sprite_CharacterName.prototype.screenZ = function () {
        return 6;
    };

    Sprite_CharacterName.prototype.updatePosition = function () {
        this.x = this.screenX();
        this.y = this.screenY();
        this.z = this.screenZ();
    };

    Sprite_CharacterName.prototype.updateAnimationFade = function () {
        if (!this._animationFade || this._cacheOpacity != undefined) return;
        if (this._animationframesFade === undefined) {
            this._animationframesFade = [0, this._animationFadeFrames, 0, this._animationFadeFrames];
        }
        if (this._animationframesFade[0] < this._animationframesFade[1]) {
            this._animationframesFade[0] += 0.60;
            if (this.opacity > 0) this.opacity -= 12;
        } else {
            if (this._animationframesFade[2] < this._animationframesFade[3]) {
                this._animationframesFade[2] += 0.60;
                if (this.opacity < 255) this.opacity += 12;
            } else {
                this._animationframesFade = undefined;
            }
        }
    };

    Sprite_CharacterName.prototype.updateAnimationScale = function () {
        if (!this._animationScale) return;
        if (this._animationframesScale === undefined) {
            this._animationframesScale = [0, this._animationScaleFrames, 0, this._animationScaleFrames];
        }
        if (this._animationframesScale[0] < this._animationframesScale[1]) {
            this._animationframesScale[0] += 0.60;
            if (this.scale.x > 0.5) this.scale.x -= 0.025;
            if (this.scale.y > 0.5) this.scale.y -= 0.025;
        } else {
            if (this._animationframesScale[2] < this._animationframesScale[3]) {
                this._animationframesScale[2] += 0.60;
                if (this.scale.x < 1) this.scale.x += 0.025;
                if (this.scale.y < 1) this.scale.y += 0.025;
            } else {
                this._animationframesScale = undefined;
            }
        }
    };

    Sprite_CharacterName.prototype.updateAnimationRotation = function () {
        if (!this._animationRotation) return;
        if (this._animationframesRotation === undefined) {
            this._animationframesRotation = [0, this._animationRotationFrames, 0,
                this._animationRotationFrames, 0, this._animationRotationFrames,
                0, this._animationRotationFrames
            ];
        }
        if (this._animationframesRotation[0] < this._animationframesRotation[1]) {
            this._animationframesRotation[0] += 0.60;
            this.rotation -= 0.025;
        } else {
            if (this._animationframesRotation[2] < this._animationframesRotation[3]) {
                this._animationframesRotation[2] += 0.60;
                this.rotation += 0.025;
            } else {
                if (this._animationframesRotation[4] < this._animationframesRotation[5]) {
                    this._animationframesRotation[4] += 0.60;
                    this.rotation += 0.025;
                } else {
                    if (this._animationframesRotation[6] < this._animationframesRotation[7]) {
                        this._animationframesRotation[6] += 0.60;
                        this.rotation -= 0.025;
                    } else {
                        this._animationframesRotation = undefined;
                    }
                }
            }
        }
    };

    Sprite_CharacterName.prototype.updateTransparent = function () {
        if (this._character instanceof Game_Character) {
            if (this._character.isTransparent() || this._character.characterName().length <= 0 ||
                this._character._hideSpriteCharacter) {
                this.hide();
            } else {
                if (!this._bitmapTextHide) {
                    this.show();
                }
            }
            if (this._bitmapTextForceShow) this.show();
        }
    };

    Sprite_CharacterName.prototype.updateEvents = function () {
        if (this._character instanceof Game_Event) {
            if (this._character._erased || this._character._pageIndex == -1 ||
                this._character.characterName().length <= 0) {
                this.hide();
            }
            if (this._bitmapTextForceShow) this.show();
        }
    };

    Sprite_CharacterName.prototype.updateTouch = function () {
        if (this._character instanceof Game_Event || this._character instanceof Game_Character) {
            var realX = this._character._realX != this._character._x ? this._character._x : this._character._realX,
                realY = this._character._realY != this._character._y ? this._character._y : this._character._realY,
                x = Math.floor($gameMap._mouseTileX), y = Math.floor($gameMap._mouseTileY),
                x2 = Math.floor(realX), y2 = Math.floor(realY);
            if (x === x2 && y === y2) {
                if (!this._bitmapTextHide) {
                    if (this._cacheOpacity === undefined) this._cacheOpacity = this.opacity;
                    if (this.opacity < 255) this.opacity += 12;
                }
            } else {
                if (this._cacheOpacity != undefined) {
                    if (this.opacity > this._cacheOpacity) this.opacity -= 12;
                    else this._cacheOpacity = undefined;
                }
            }
        }
    };
})();
/*~struct~Atores:
 * @param Id
 * @desc Id do ator
 * @type number
 * @min 1
 * @default 1
 * @max 1000
 * 
 * @param Nome
 * @desc Nome do ator
 * @type string
 * @default Harold
 * 
 * @param Exibir nome
 * @desc Deseja exibir o nome do ator?
 * @type boolean
 * @default true
 * @on Exibir
 * @off Ocultar
 * 
 * @param Cor do texto
 * @desc Numero da cor do texto
 * @type select
 * @default 0
 * @option 0
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @option 5
 * @option 6
 * @option 7
 * @option 8
 * @option 9
 * @option 10
 * @option 11
 * @option 12
 * @option 14
 * @option 15
 * @option 16
 * @option 17
 * @option 18
 * @option 19
 * @option 20
 * @option 21
 * @option 22
 * @option 23
 * @option 24
 * @option 25
 * @option 26
 * @option 27
 * @option 28
 * @option 29
 * @option 30
 * @option 31
 * 
 * @param Tamanho do texto
 * @desc Qual o tamanho do texto?
 * @type number
 * @min 10
 * @default 14
 * @max 72
 * 
 * @param Distancia do texto
 * @desc Defina a distancia do texto ao objeto
 * @type number
 * @min 0
 * @default 4
 * @max 100
 * 
 * @param Esboço do texto
 * @desc Deseja exibir o esboço do texto?
 * @type boolean
 * @default true
 * @on Exibir
 * @off Ocultar
 * 
 * @param Cor do esboço
 * @desc Numero da cor do esboço
 * @type select
 * @default 15
 * @option 0
 * @option 1
 * @option 2
 * @option 3
 * @option 4
 * @option 5
 * @option 6
 * @option 7
 * @option 8
 * @option 9
 * @option 10
 * @option 11
 * @option 12
 * @option 14
 * @option 15
 * @option 16
 * @option 17
 * @option 18
 * @option 19
 * @option 20
 * @option 21
 * @option 22
 * @option 23
 * @option 24
 * @option 25
 * @option 26
 * @option 27
 * @option 28
 * @option 29
 * @option 30
 * @option 31
 * 
 * @param Animação do texto
 * @desc Escolha a animação do texto
 * @type select
 * @default None
 * @option None
 * @option Fade
 * @option Scale
 * @option Rotation
 * @option Fade, Scale, Rotation
 * @option Fade, Scale
 * @option Fade, Rotation
 * @option Scale, Rotation
 * 
 * @param Animação(Fade) frames
 * @parent Animação do texto
 * @desc total de frames da animação(Fade)
 * @type number
 * @min 1
 * @default 20
 * 
 * @param Animação(Scale) frames
 * @parent Animação do texto
 * @desc total de frames da animação(Scale)
 * @type number
 * @min 1
 * @default 20
 * 
 * @param Animação(Rotation) frames
 * @parent Animação do texto
 * @desc total de frames da animação(Rotation)
 * @type number
 * @min 1
 * @default 20
 * 
 */
/*~struct~NomeEventos:
 * @param Nome
 * @desc O nome do evento
 * @type string
 * @default
 * 
 * @param Id
 * @desc O indicador para o nome do evento
 * @type number
 * @default 1
 * @min 1
 * 
 * @param Language
 * @desc O idioma no qual o nome é exibido!
 * @type string
 * @default
 * 
 */