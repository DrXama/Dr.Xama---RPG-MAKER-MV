//==================================================================================================
// DrXama_charactersNames.js
//==================================================================================================
/*:
 * @plugindesc v1.14 - Adição de nome sobre o personagem, seguidores e eventos
 *
 * @author Dr.Xamã
 * 
 * @param Atores
 * @type struct<Atores>[]
 * @default []
 * @desc Lista dos atores para o plugin gerenciar
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
 *    Comandos
 * ================================================================================
 * Para evitar erros digite exatamente como está a baixo!
 * Comentario dos eventos:
 * - event_textOff - Desliga a exibição do nome do evento
 * - event_textOn - Força a exibição do nome do evento
 * - event_name: String - Nome a ser exibido
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
 * ================================================================================
 *    Atualização
 * ================================================================================
 * Para atualizar esse plugin vá no github do Dr.Xamã
 * https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV
 */
(function () {
    "use strict";
    //-----------------------------------------------------------------------------
    // PluginManager
    //
    var params = PluginManager.parameters('DrXama_charactersNames');
    params["Atores"] = params["Atores"].length <= 0 ? '[]' : params["Atores"];
    var parameters_actors = JSON.parse(params["Atores"]);

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
    };

    Sprite_CharacterName.prototype.update = function () {
        Sprite_Base.prototype.update.call(this);
        this.updatePosition();
        this.updateAnimationFade();
        this.updateAnimationScale();
        this.updateAnimationRotation();
        this.updateTransparent();
        this.updateEvents();
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
        if (bitmapTextShow) {
            this._bitmapText = bitmapText;
            this.bitmap.textColor = bitmapTextColor;
            this.bitmap.fontSize = bitmapTextSize;
            if (bitmapTextOutline) {
                this.bitmap.outlineWidth = 5;
            } else {
                this.bitmap.outlineWidth = 3;
            }
            this.bitmap.outlineColor = bitmapTextOutlineColor;
            this.bitmapTextDistance(bitmapTextDistance);
            this.bitmap.drawText(this._bitmapText, 0, 25, this.bitmap.width, 0, 'center');
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
        if (!this._animationFade) return;
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
