//==================================================================================================
// DrXama_characterSprite.js
//==================================================================================================
/*:
 * @plugindesc v1.1.7 - Altera o sprite dos personagens, seguidores, veiculos e eventos
 *
 * @author Dr.Xamã
 *
 * @param Frames de alteração
 * @desc A velocidade em que a alteração é feita.
 * Padrão: 60 Frames = 1 Segundo
 * @type number
 * @default 1
 * @min 1
 * @max 1000
 * 
 * @help
 * ================================================================================
 *    CHANGELOG
 * ================================================================================
 * v1.1.7
 * - Agora você pode alterar todos os sprites de uma só vez
 * - Correção de erros
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Permite uma alteração avançada nos personagens, seguidores, veiculos e eventos.
 * ================================================================================
 *    Comandos de plugin
 * ================================================================================
 * ------- TODOS -------
 * - allsprite color r g b gray
 * - allsprite scale x y
 * - allsprite opacity opacity
 * - allsprite blend type(0~3)
 * ------- EVENT -------
 * - eventSprite eventId color r g b gray
 * - eventSprite eventId scale x y
 * - eventSprite eventId opacity opacity
 * - eventSprite eventId blend type(0~3)
 * ------- PLAYER -------
 * - playerSprite color r g b gray
 * - playerSprite scale x y
 * - playerSprite opacity opacity
 * - playerSprite blend type(0~3)
 * ------- FOLLOWER -------
 * - followerSprite followerId color r g b gray
 * - followerSprite followerId scale x y
 * - followerSprite followerId opacity opacity
 * - followerSprite followerId blend type(0~3)
 * ------- VEHICLE -------
 * - vehicleSprite vehicleId(Boat | Ship | Airship) color r g b gray
 * - vehicleSprite vehicleId(Boat | Ship | Airship) scale x y
 * - vehicleSprite vehicleId(Boat | Ship | Airship) opacity opacity
 * - vehicleSprite vehicleId(Boat | Ship | Airship) blend type(0~3)
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
            return Graphics.printError('Dr.Xamã', 'Atualmente seu RPG MAKER MV não suporta o seguinte plugin: DrXama_characterSprite'), SceneManager.stop();
    }
};
DX.characterSprite = DX.characterSprite || {
    'page': function () { return require('nw.gui').Shell.openExternal('http://drxama.epizy.com/?p=283'); },
    'update': function () { return require('nw.gui').Shell.openExternal('https://www.dropbox.com/s/ud8tgdi9fmegn8u/DrXama_characterSprite.js?dl=0'); },
    'changelog': function () { return require('nw.gui').Shell.openExternal('https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/blob/master/changelog/DrXama_characterSprite.md'); },
    'version': function () { return console.log('v1.1.7') }
};
(function () {
    "use strict";
    //-----------------------------------------------------------------------------
    // Parameters
    //    
    var params = PluginManager.parameters('DrXama_characterSprite');
    var framesChange = Number(params["Frames de alteração"]) || 0;

    //-----------------------------------------------------------------------------
    // Functions
    //
    function funcExe(args) {
        args.forEach(function (arg) {
            var func = arg[0];
            var Arguments = arg.slice(1);
            func.apply($gameTemp, Arguments);
        });
    };

    function localPath(p) {
        if (p.substring(0, 1) === '/') p = p.substring(1);
        var path = require('path');
        var base = path.dirname(process.mainModule.filename);
        return path.join(base, p);
    };

    //-----------------------------------------------------------------------------
    // Game_Interpreter
    //
    const _game_interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _game_interpreter_pluginCommand.apply(this, arguments);
        command = String(command).toLowerCase();
        // ALL
        if (command === 'allsprite') {
            command = String(args[0]).toLowerCase();
            if (command === 'scale') {
                var scaleX = parseFloat(args[1]),
                    scaleY = parseFloat(args[2]);
                this.pluginCommand('playerSprite', ['scale', scaleX, scaleY]);
                var i = 0,
                    l = $gamePlayer.followers()._data.length;
                for (; i <= l; i++) {
                    this.pluginCommand('followerSprite', [i, 'scale', scaleX, scaleY]);
                }
                $gameMap.vehicles().map(vehicle => {
                    this.pluginCommand('vehicleSprite', [vehicle._type, 'scale', scaleX, scaleY]);
                });
                $dataMap.events.map(event => {
                    let eventChange = true, eventId;
                    if (event) {
                        eventId = event.id;
                        for (var i = 0; i < event.pages.length; i++) {
                            var page = event.pages[i];
                            page.list.forEach(function (line) {
                                if (line.code == 108 || line.code == 408) {
                                    var text = line.parameters[0].toLowerCase().replace(/\s{1,}/g, '');
                                    if (text === 'spritechange_off') {
                                        return eventChange = false;
                                    }
                                }
                            });
                            break;
                        }
                        if (eventChange) {
                            this.pluginCommand('eventSprite', [eventId, 'scale', scaleX, scaleY]);
                        }
                    }
                });
            }
            if (command === 'color') {
                var r = parseInt(args[1]) || 0,
                    g = parseInt(args[2]) || 0,
                    b = parseInt(args[3]) || 0,
                    gray = parseInt(args[4]) || 0;
                this.pluginCommand('playerSprite', ['color', r, g, b, gray]);
                var i = 0,
                    l = $gamePlayer.followers()._data.length;
                for (; i <= l; i++) {
                    this.pluginCommand('followerSprite', [i, 'color', r, g, b, gray]);
                }
                $gameMap.vehicles().map(vehicle => {
                    this.pluginCommand('vehicleSprite', [vehicle._type, 'color', r, g, b, gray]);
                });
                $dataMap.events.map(event => {
                    let eventChange = true, eventId;
                    if (event) {
                        eventId = event.id;
                        for (var i = 0; i < event.pages.length; i++) {
                            var page = event.pages[i];
                            page.list.forEach(function (line) {
                                if (line.code == 108 || line.code == 408) {
                                    var text = line.parameters[0].toLowerCase().replace(/\s{1,}/g, '');
                                    if (text === 'spritechange_off') {
                                        return eventChange = false;
                                    }
                                }
                            });
                            break;
                        }
                        if (eventChange) {
                            this.pluginCommand('eventSprite', [eventId, 'color', r, g, b, gray]);
                        }
                    }
                });
            }
            if (command == 'opacity') {
                var opacity = parseInt(args[1])
                this.pluginCommand('playerSprite', ['opacity', opacity]);
                var i = 0,
                    l = $gamePlayer.followers()._data.length;
                for (; i <= l; i++) {
                    this.pluginCommand('followerSprite', [i, 'opacity', opacity]);
                }
                $gameMap.vehicles().map(vehicle => {
                    this.pluginCommand('vehicleSprite', [vehicle._type, 'opacity', opacity]);
                });
                $dataMap.events.map(event => {
                    let eventChange = true, eventId;
                    if (event) {
                        eventId = event.id;
                        for (var i = 0; i < event.pages.length; i++) {
                            var page = event.pages[i];
                            page.list.forEach(function (line) {
                                if (line.code == 108 || line.code == 408) {
                                    var text = line.parameters[0].toLowerCase().replace(/\s{1,}/g, '');
                                    if (text === 'spritechange_off') {
                                        return eventChange = false;
                                    }
                                }
                            });
                            break;
                        }
                        if (eventChange) {
                            this.pluginCommand('eventSprite', [eventId, 'opacity', opacity]);
                        }
                    }
                });
            }
            if (command == 'blend') {
                var blend = parseInt(args[1])
                this.pluginCommand('playerSprite', ['blend', blend]);
                var i = 0,
                    l = $gamePlayer.followers()._data.length;
                for (; i <= l; i++) {
                    this.pluginCommand('followerSprite', [i, 'blend', blend]);
                }
                $gameMap.vehicles().map(vehicle => {
                    this.pluginCommand('vehicleSprite', [vehicle._type, 'blend', blend]);
                });
                $dataMap.events.map(event => {
                    let eventChange = true, eventId;
                    if (event) {
                        eventId = event.id;
                        for (var i = 0; i < event.pages.length; i++) {
                            var page = event.pages[i];
                            page.list.forEach(function (line) {
                                if (line.code == 108 || line.code == 408) {
                                    var text = line.parameters[0].toLowerCase().replace(/\s{1,}/g, '');
                                    if (text === 'spritechange_off') {
                                        return eventChange = false;
                                    }
                                }
                            });
                            break;
                        }
                        if (eventChange) {
                            this.pluginCommand('eventSprite', [eventId, 'blend', blend]);
                        }
                    }
                });
            }
        }
        // EVENT
        if (command == 'eventsprite') {
            var eventId = parseInt(args[0]) || 0;
            command = String(args[1]).toLowerCase();
            if (command == 'color') {
                var r = parseInt(args[2]) || 0,
                    g = parseInt(args[3]) || 0,
                    b = parseInt(args[4]) || 0,
                    gray = parseInt(args[5]) || 0;
                $gameTemp.characterSprite_addConfig([{
                    'isCallOk': false
                },
                [$gameTemp.characterSprite_setId, 'event', eventId],
                [$gameTemp.characterSprite_setColorTone, [r, g, b, gray]]
                ]);
            }
            if (command == 'scale') {
                var scale = [parseFloat(args[2]) || 0, parseFloat(args[3]) || 0];
                $gameTemp.characterSprite_addConfig([{
                    'isCallOk': false
                },
                [$gameTemp.characterSprite_setId, 'event', eventId],
                [$gameTemp.characterSprite_setScale, scale]
                ]);
            }
            if (command == 'opacity') {
                var opacity = parseInt(args[2]) || 0;
                $gameTemp.characterSprite_addConfig([{
                    'isCallOk': false
                },
                [$gameTemp.characterSprite_setId, 'event', eventId],
                [$gameTemp.characterSprite_setOpacity, opacity]
                ]);
            }
            if (command == 'blend') {
                var blend = parseInt(args[2]) || 0;
                $gameTemp.characterSprite_addConfig([{
                    'isCallOk': false
                },
                [$gameTemp.characterSprite_setId, 'event', eventId],
                [$gameTemp.characterSprite_setBlend, blend]
                ]);
            }
        }
        // PLAYER
        if (command == 'playersprite') {
            var playerId = 'player';
            command = String(args[0]).toLowerCase();
            if (command == 'color') {
                var r = parseInt(args[1]) || 0,
                    g = parseInt(args[2]) || 0,
                    b = parseInt(args[3]) || 0,
                    gray = parseInt(args[4]) || 0;
                $gameTemp.characterSprite_addConfig([{
                    'isCallOk': false
                },
                [$gameTemp.characterSprite_setId, 'player', playerId],
                [$gameTemp.characterSprite_setColorTone, [r, g, b, gray]]
                ]);
            }
            if (command == 'scale') {
                var scale = [parseFloat(args[1]) || 0, parseFloat(args[2]) || 0];
                $gameTemp.characterSprite_addConfig([{
                    'isCallOk': false
                },
                [$gameTemp.characterSprite_setId, 'player', playerId],
                [$gameTemp.characterSprite_setScale, scale]
                ]);
            }
            if (command == 'opacity') {
                var opacity = parseInt(args[1]) || 0;
                $gameTemp.characterSprite_addConfig([{
                    'isCallOk': false
                },
                [$gameTemp.characterSprite_setId, 'player', playerId],
                [$gameTemp.characterSprite_setOpacity, opacity]
                ]);
            }
            if (command == 'blend') {
                var blend = parseInt(args[1]) || 0;
                $gameTemp.characterSprite_addConfig([{
                    'isCallOk': false
                },
                [$gameTemp.characterSprite_setId, 'player', playerId],
                [$gameTemp.characterSprite_setBlend, blend]
                ]);
            }
        }
        // FOLLOWER
        if (command == 'followersprite') {
            var followerId = parseInt(args[0]) || 0;
            command = String(args[1]).toLowerCase();
            if (command == 'color') {
                var r = parseInt(args[2]) || 0,
                    g = parseInt(args[3]) || 0,
                    b = parseInt(args[4]) || 0,
                    gray = parseInt(args[5]) || 0;
                $gameTemp.characterSprite_addConfig([{
                    'isCallOk': false
                },
                [$gameTemp.characterSprite_setId, 'follower', followerId],
                [$gameTemp.characterSprite_setColorTone, [r, g, b, gray]]
                ]);
            }
            if (command == 'scale') {
                var scale = [parseFloat(args[2]) || 0, parseFloat(args[3]) || 0];
                $gameTemp.characterSprite_addConfig([{
                    'isCallOk': false
                },
                [$gameTemp.characterSprite_setId, 'follower', followerId],
                [$gameTemp.characterSprite_setScale, scale]
                ]);
            }
            if (command == 'opacity') {
                var opacity = parseInt(args[2]) || 0;
                $gameTemp.characterSprite_addConfig([{
                    'isCallOk': false
                },
                [$gameTemp.characterSprite_setId, 'follower', followerId],
                [$gameTemp.characterSprite_setOpacity, opacity]
                ]);
            }
            if (command == 'blend') {
                var blend = parseInt(args[2]) || 0;
                $gameTemp.characterSprite_addConfig([{
                    'isCallOk': false
                },
                [$gameTemp.characterSprite_setId, 'follower', followerId],
                [$gameTemp.characterSprite_setBlend, blend]
                ]);
            }
        }
        // VEHICLE
        if (command == 'vehiclesprite') {
            var vehicleId = String(args[0]).toLowerCase();
            command = String(args[1]).toLowerCase();
            if (command == 'color') {
                var r = parseInt(args[2]) || 0,
                    g = parseInt(args[3]) || 0,
                    b = parseInt(args[4]) || 0,
                    gray = parseInt(args[5]) || 0;
                $gameTemp.characterSprite_addConfig([{
                    'isCallOk': false
                },
                [$gameTemp.characterSprite_setId, 'vehicle', vehicleId],
                [$gameTemp.characterSprite_setColorTone, [r, g, b, gray]]
                ]);
            }
            if (command == 'scale') {
                var scale = [parseFloat(args[2]) || 0, parseFloat(args[3]) || 0];
                $gameTemp.characterSprite_addConfig([{
                    'isCallOk': false
                },
                [$gameTemp.characterSprite_setId, 'vehicle', vehicleId],
                [$gameTemp.characterSprite_setScale, scale]
                ]);
            }
            if (command == 'opacity') {
                var opacity = parseInt(args[2]) || 0;
                $gameTemp.characterSprite_addConfig([{
                    'isCallOk': false
                },
                [$gameTemp.characterSprite_setId, 'vehicle', vehicleId],
                [$gameTemp.characterSprite_setOpacity, opacity]
                ]);
            }
            if (command == 'blend') {
                var blend = parseInt(args[2]) || 0;
                $gameTemp.characterSprite_addConfig([{
                    'isCallOk': false
                },
                [$gameTemp.characterSprite_setId, 'vehicle', vehicleId],
                [$gameTemp.characterSprite_setBlend, blend]
                ]);
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Game_Temp
    //
    const _game_temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function () {
        _game_temp_initialize.call(this);
        this._characterSprite_config = [];
        this.characterSprite_reset();
    };

    Game_Temp.prototype.characterSprite_reset = function () {
        this._characterSprite_colorTone = null;
        this._characterSprite_scale = null;
        this._characterSprite_opacity = null;
        this._characterSprite_blend = null;
        this._characterSprite_id_to_player = null;
        this._characterSprite_id_to_events = null;
        this._characterSprite_id_to_followers = null;
        this._characterSprite_id_to_vehicle = null;
    };

    Game_Temp.prototype.characterSprite_config = function () {
        return this._characterSprite_config.map(function (value) {
            return value;
        });
    };

    Game_Temp.prototype.characterSprite_addConfig = function (config) {
        this._characterSprite_config.push(config);
    };

    Game_Temp.prototype.characterSprite_RemoveConfig = function () {
        var config = this._characterSprite_config.reverse();
        var indexOf = config.length - 1;
        config.splice(indexOf, 1);
        config.reverse();
        this._characterSprite_config = config;
    };

    Game_Temp.prototype.characterSprite_setId = function (type, id) {
        if (type == 'player') {
            this._characterSprite_id_to_player = id;
        } else if (type == 'event') {
            this._characterSprite_id_to_events = id;
        } else if (type == 'follower') {
            this._characterSprite_id_to_followers = id;
        } else if (type == 'vehicle') {
            this._characterSprite_id_to_vehicle = id;
        }
    };

    Game_Temp.prototype.characterSprite_id = function (type) {
        if (type == 'player') {
            return this._characterSprite_id_to_player;
        } else if (type == 'event') {
            return this._characterSprite_id_to_events;
        } else if (type == 'follower') {
            return this._characterSprite_id_to_followers;
        } else if (type == 'vehicle') {
            return this._characterSprite_id_to_vehicle;
        }
    };

    Game_Temp.prototype.characterSprite_setColorTone = function (tone) {
        this._characterSprite_colorTone = tone;
    };

    Game_Temp.prototype.characterSprite_colorTone = function () {
        return this._characterSprite_colorTone;
    };

    Game_Temp.prototype.characterSprite_setScale = function (scale) {
        this._characterSprite_scale = scale;
    };

    Game_Temp.prototype.characterSprite_scale = function () {
        return this._characterSprite_scale;
    };

    Game_Temp.prototype.characterSprite_setOpacity = function (opacity) {
        this._characterSprite_opacity = opacity;
    };

    Game_Temp.prototype.characterSprite_opacity = function () {
        return this._characterSprite_opacity;
    };

    Game_Temp.prototype.characterSprite_setBlend = function (blend) {
        this._characterSprite_blend = blend;
    };

    Game_Temp.prototype.characterSprite_blend = function () {
        return this._characterSprite_blend;
    };

    //-----------------------------------------------------------------------------
    // Game_Map
    //
    const _game_map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function (sceneActive) {
        _game_map_update.apply(this, arguments);
        if (sceneActive) {
            this.updateCharacterSpriteTemp();
        }
    };

    Game_Map.prototype.updateCharacterSpriteTemp = function () {
        if (!this._framesOnConfig) this._framesOnConfig = framesChange;
        if (this._framesOnConfig > 0) return this._framesOnConfig -= .60;
        var configs = $gameTemp.characterSprite_config();
        var i = 0;
        var length = configs.length;
        for (; i < length; i++) {
            var config = configs[i];
            var functions = config.slice(1);
            if (!config[0]['isCallOk']) {
                config[0]['isCallOk'] = true;
                this._framesOnConfig = framesChange;
                return funcExe(functions);
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Sprite_Character
    //
    const sprite_character_initialize = Sprite_Character.prototype.initialize;
    Sprite_Character.prototype.initialize = function (character) {
        sprite_character_initialize.apply(this, arguments);
        this._dataCharacterSprite = {
            "id": this.characterId(),
            "color": [0, 0, 0, 0],
            "scale": [1, 1],
            "opacity": 255,
            "blend": 0
        }
        this.loadCharacterSprite();
    };

    Sprite_Character.prototype.characterId = function () {
        if (this._character instanceof Game_Player) {
            return 'player';
        }
        if (this._character instanceof Game_Event) {
            return 'event_' + this._character.eventId();
        }
        if (this._character instanceof Game_Follower) {
            return 'follower_' + this._character._memberIndex;
        }
        if (this._character instanceof Game_Vehicle) {
            return 'vehicle_' + this._character._type;
        }
    };

    Sprite_Character.prototype.saveCharacterSprite = function () {
        var fs = require('fs');
        var pathData = localPath('save');
        var pathFile = `${pathData}\\CharacterSprite.drxamasave`;
        var characterSpriteOn = false;
        if (!fs.existsSync(pathData)) {
            fs.mkdirSync(pathData);
        }
        if (fs.existsSync(pathFile)) {
            var data = JsonEx.parse(LZString.decompressFromBase64(fs.readFileSync(pathFile, {
                encoding: 'utf8'
            }))) || [];
            data.map(function (character) {
                var id = this._dataCharacterSprite.id;
                var color = this._dataCharacterSprite.color;
                var scale = this._dataCharacterSprite.scale;
                var opacity = this._dataCharacterSprite.opacity;
                var blend = this._dataCharacterSprite.blend;
                if (character.id == id) {
                    characterSpriteOn = true;
                    character.color = color;
                    character.scale = scale;
                    character.opacity = opacity;
                    character.blend = blend;
                }
            }, this)
            if (!characterSpriteOn) {
                data.push(this._dataCharacterSprite);
            }
        } else {
            var data = [this._dataCharacterSprite];
        }
        fs.writeFileSync(pathFile, LZString.compressToBase64(JsonEx.stringify(data)));
    };

    Sprite_Character.prototype.loadCharacterSprite = function () {
        var fs = require('fs');
        var pathData = localPath('save');
        var pathFile = `${pathData}\\CharacterSprite.drxamasave`;
        if (fs.existsSync(pathData) && fs.existsSync(pathFile)) {
            var data = JsonEx.parse(LZString.decompressFromBase64(fs.readFileSync(pathFile, {
                encoding: 'utf8'
            }))) || [];
            data.map(function (character) {
                var id = this._dataCharacterSprite.id;
                if (character.id == id) {
                    this._dataCharacterSprite = character;
                }
            }, this)
        }
        this.characterSpriteLoad();
    };

    Sprite_Character.prototype.characterIsId = function () {
        if (this._character instanceof Game_Player) {
            return $gameTemp.characterSprite_id('player') == 'player';
        }
        if (this._character instanceof Game_Event) {
            return this._character.eventId() == $gameTemp.characterSprite_id('event');
        }
        if (this._character instanceof Game_Follower) {
            return this._character._memberIndex == $gameTemp.characterSprite_id('follower');
        }
        if (this._character instanceof Game_Vehicle) {
            return this._character._type == $gameTemp.characterSprite_id('vehicle');
        }
    };

    const sprite_character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function () {
        sprite_character_update.call(this);
        this.updateCharacterSprite();
        this.updateBushDepth();
    };

    Sprite_Character.prototype.updateBushDepth = function () {
        this._bushDepth = this._character.bushDepth();
    };

    Sprite_Character.prototype.updateCharacterSprite = function () {
        if (this.characterIsId()) {
            if ($gameTemp.characterSprite_colorTone() instanceof Array) {
                this.setColorTone($gameTemp.characterSprite_colorTone());
                this._dataCharacterSprite.color = $gameTemp.characterSprite_colorTone();
            }
            if ($gameTemp.characterSprite_scale() instanceof Array) {
                var x = $gameTemp.characterSprite_scale()[0];
                var y = $gameTemp.characterSprite_scale()[1];
                this.scale = new Point(x, y);
                this._dataCharacterSprite.scale = [x, y];
            }
            if (typeof $gameTemp.characterSprite_opacity() == 'number') {
                this.opacity = $gameTemp.characterSprite_opacity();
                this._dataCharacterSprite.opacity = this.opacity;
            }
            if (typeof $gameTemp.characterSprite_blend() == 'number') {
                this.blendMode = $gameTemp.characterSprite_blend();
                this._dataCharacterSprite.blend = this.blendMode;
            }
            $gameTemp.characterSprite_RemoveConfig();
            $gameTemp.characterSprite_reset();
            this.saveCharacterSprite();
        }
    };

    Sprite_Character.prototype.characterSpriteLoad = function () {
        var tone = this._dataCharacterSprite.color;
        var scale = this._dataCharacterSprite.scale;
        var opacity = this._dataCharacterSprite.opacity;
        var blend = this._dataCharacterSprite.blend;
        this.setColorTone(tone);
        this.scale = new Point(scale[0], scale[1]);
        this.opacity = opacity;
        this.blendMode = blend;
    };

    Sprite_Character.prototype.updateOther = function () {
        this.opacity = this._dataCharacterSprite.opacity;
        this.blendMode = this._dataCharacterSprite.blend;
        this._bushDepth = this._character.bushDepth();
    };
})();

//-----------------------------------------------------------------------------
// Set Movement Route
//
const __Game_Interpreter_command205 = Game_Interpreter.prototype.command205;
Game_Interpreter.prototype.command205 = function () {
    __Game_Interpreter_command205.call(this);
    var routeId = this._params[0];
    var routeList = this._params[1].list;
    if (routeId == -1) { // Player
        routeList[0].routeSprite = 'playersprite';
        routeList[0].routeId = ['player'];
        this.characterSpriteProcessCommand(routeList[0]);
    } else if (routeId == 0) { // This Event
        routeList[0].routeSprite = 'eventsprite';
        routeList[0].routeId = ['event', this._eventId];
        this.characterSpriteProcessCommand(routeList[0]);
    } else if (routeId > 0) { // Event
        routeList[0].routeSprite = 'eventsprite';
        routeList[0].routeId = ['event', routeId];
        this.characterSpriteProcessCommand(routeList[0]);
    }
    return true;
};

Game_Interpreter.prototype.characterSpriteProcessCommand = function (command) {
    var gc = Game_Character;
    var params = command.parameters;
    switch (command.code) {
        case gc.ROUTE_CHANGE_OPACITY:
            if (command.routeId[0] == 'player') {
                this.pluginCommand.call(this, command.routeSprite, ['opacity', params[0]]);
                $gamePlayer._followers._data.map(function (follower) {
                    var followerId = follower._memberIndex;
                    this.pluginCommand.call(this, 'followersprite', [followerId, 'opacity', params[0]]);
                }, this);
            } else if (command.routeId[0] == 'event') {
                this.pluginCommand.call(this, command.routeSprite, [command.routeId[1], 'opacity', params[0]]);
            }
            break;
        case gc.ROUTE_CHANGE_BLEND_MODE:
            if (command.routeId[0] == 'player') {
                this.pluginCommand.call(this, command.routeSprite, ['blend', params[0]]);
                $gamePlayer._followers._data.map(function (follower) {
                    var followerId = follower._memberIndex;
                    this.pluginCommand.call(this, 'followersprite', [followerId, 'blend', params[0]]);
                }, this);
            } else if (command.routeId[0] == 'event') {
                this.pluginCommand.call(this, command.routeSprite, [command.routeId[1], 'blend', params[0]]);
            }
            break;
    }
};