//==================================================================================================
// DrXama_pluginName.js
//==================================================================================================
/*:
 * @plugindesc v1.00 - Altera o sprite dos personagens, seguidores, veiculos e eventos
 *
 * @author Dr.Xamã
 *
 * @help
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Permite uma alteração avançada nos personagens, seguidores, veiculos e eventos
 *
 * ================================================================================
 *    Comandos
 * ================================================================================
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
 * ================================================================================
 *    Atualização
 * ================================================================================
 * Para atualizar esse plugin vá no github do Dr.Xamã
 * https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV
 */
(function () {
    "use strict";
    //-----------------------------------------------------------------------------
    // Functions
    //
    function funcExe(args) {
        args.forEach(function(arg){
            var func = arg[0];
            var Arguments = arg.slice(1);
            func.apply($gameTemp, Arguments);
        });
    };

    //-----------------------------------------------------------------------------
    // Game_Interpreter
    //
    const _game_interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _game_interpreter_pluginCommand.apply(this, arguments);
        command = String(command).toLowerCase();
        // EVENT
        if (command == 'eventsprite') {
            var eventId = parseInt(args[0]) || 0;
            command = String(args[1]).toLowerCase();
            if (command == 'color') {
                var r = parseInt(args[2]) || 0,
                    g = parseInt(args[3]) || 0,
                    b = parseInt(args[4]) || 0,
                    gray = parseInt(args[5]) || 0;
                $gameTemp.characterSprite_addConfig([
                    {'isCallOk': false},
                    [$gameTemp.characterSprite_setId, 'event', eventId],
                    [$gameTemp.characterSprite_setColorTone, [r, g, b, gray]]
                ]);
            }
            if(command == 'scale') {
                var scale = [parseFloat(args[2]) || 0, parseFloat(args[3]) || 0];
                $gameTemp.characterSprite_addConfig([
                    {'isCallOk': false},
                    [$gameTemp.characterSprite_setId, 'event', eventId],
                    [$gameTemp.characterSprite_setScale, scale]
                ]);
            }
            if(command == 'opacity') {
                var opacity = parseInt(args[2]) || 0;
                $gameTemp.characterSprite_addConfig([
                    {'isCallOk': false},
                    [$gameTemp.characterSprite_setId, 'event', eventId],
                    [$gameTemp.characterSprite_setOpacity, opacity]
                ]);
            }
            if(command == 'blend') {
                var blend = parseInt(args[2]) || 0;
                $gameTemp.characterSprite_addConfig([
                    {'isCallOk': false},
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
                $gameTemp.characterSprite_addConfig([
                    {'isCallOk': false},
                    [$gameTemp.characterSprite_setId, 'player', playerId],
                    [$gameTemp.characterSprite_setColorTone, [r, g, b, gray]]
                ]);
            }
            if(command == 'scale') {
                var scale = [parseFloat(args[1]) || 0, parseFloat(args[2]) || 0];
                $gameTemp.characterSprite_addConfig([
                    {'isCallOk': false},
                    [$gameTemp.characterSprite_setId, 'player', playerId],
                    [$gameTemp.characterSprite_setScale, scale]
                ]);
            }
            if(command == 'opacity') {
                var opacity = parseInt(args[1]) || 0;
                $gameTemp.characterSprite_addConfig([
                    {'isCallOk': false},
                    [$gameTemp.characterSprite_setId, 'player', playerId],
                    [$gameTemp.characterSprite_setOpacity, opacity]
                ]);
            }
            if(command == 'blend') {
                var blend = parseInt(args[1]) || 0;
                $gameTemp.characterSprite_addConfig([
                    {'isCallOk': false},
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
                $gameTemp.characterSprite_addConfig([
                    {'isCallOk': false},
                    [$gameTemp.characterSprite_setId, 'follower', followerId],
                    [$gameTemp.characterSprite_setColorTone, [r, g, b, gray]]
                ]);
            }
            if(command == 'scale') {
                var scale = [parseFloat(args[2]) || 0, parseFloat(args[3]) || 0];
                $gameTemp.characterSprite_addConfig([
                    {'isCallOk': false},
                    [$gameTemp.characterSprite_setId, 'follower', followerId],
                    [$gameTemp.characterSprite_setScale, scale]
                ]);
            }
            if(command == 'opacity') {
                var opacity = parseInt(args[2]) || 0;
                $gameTemp.characterSprite_addConfig([
                    {'isCallOk': false},
                    [$gameTemp.characterSprite_setId, 'follower', followerId],
                    [$gameTemp.characterSprite_setOpacity, opacity]
                ]);
            }
            if(command == 'blend') {
                var blend = parseInt(args[2]) || 0;
                $gameTemp.characterSprite_addConfig([
                    {'isCallOk': false},
                    [$gameTemp.characterSprite_setId, 'follower', followerId],
                    [$gameTemp.characterSprite_setBlend, blend]
                ]);
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Game_Temp
    //
    const _game_temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _game_temp_initialize.call(this);
        this._characterSprite_config = [];
        this.characterSprite_reset();
    };

    Game_Temp.prototype.characterSprite_reset = function() {
        this._characterSprite_colorTone = null;
        this._characterSprite_scale = null;
        this._characterSprite_opacity = null;
        this._characterSprite_blend = null;
        this._characterSprite_id_to_player = null;
        this._characterSprite_id_to_events = null;
        this._characterSprite_id_to_followers = null;
    };

    Game_Temp.prototype.characterSprite_config = function() {
        return this._characterSprite_config.map(function(value) {
            return value;
        });
    };

    Game_Temp.prototype.characterSprite_addConfig = function(config) {
        this._characterSprite_config.push(config);
    };

    Game_Temp.prototype.characterSprite_RemoveConfig = function() {
          var config = this._characterSprite_config.reverse();
          var indexOf = config.length - 1;
          config.splice(indexOf, 1);
          config.reverse();
          this._characterSprite_config = config;
    };

    Game_Temp.prototype.characterSprite_setId = function(type, id) {
        if (type == 'player') {
            this._characterSprite_id_to_player = id;
        } else if (type == 'event') {
            this._characterSprite_id_to_events = id;
        } else if (type == 'follower') {
            this._characterSprite_id_to_followers = id;
        }
    };

    Game_Temp.prototype.characterSprite_id = function (type) {
        if (type == 'player') {
            return this._characterSprite_id_to_player;
        } else if (type == 'event') {
            return this._characterSprite_id_to_events;
        } else if (type == 'follower') {
            return this._characterSprite_id_to_followers;
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
    Game_Map.prototype.update = function(sceneActive) {
        _game_map_update.apply(this, arguments);
        if (sceneActive) {
            this.updateCharacterSpriteTemp();
        }
    };

    Game_Map.prototype.updateCharacterSpriteTemp = function () {
        if (!this._framesOnConfig) this._framesOnConfig = 5;
        if (this._framesOnConfig > 0) return this._framesOnConfig -= .60;
        var configs = $gameTemp.characterSprite_config();
        var i = 0;
        var length = configs.length;
        for(; i < length; i++) {
            var config = configs[i];
            var functions = config.slice(1);
            if (!config[0]['isCallOk']) {
                config[0]['isCallOk'] = true;
                this._framesOnConfig = 5;
                return funcExe(functions);
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Sprite_Character
    //
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
    };

    Sprite_Character.prototype.update = function () {
        Sprite_Base.prototype.update.call(this);
        this.updateBitmap();
        this.updateFrame();
        this.updatePosition();
        this.updateAnimation();
        this.updateBalloon();
        this.updateOther();
        this.updateCharacterSprite();
    };

    Sprite_Character.prototype.updateOther = function() {
        this._bushDepth = this._character.bushDepth();
    };

    Sprite_Character.prototype.updateCharacterSprite = function () {
        if (this.characterIsId()) {
            if ($gameTemp.characterSprite_colorTone()) {
                this.setColorTone($gameTemp.characterSprite_colorTone());
            }
            if ($gameTemp.characterSprite_scale()) {
                var x = $gameTemp.characterSprite_scale()[0];
                var y = $gameTemp.characterSprite_scale()[1];
                this.scale = new Point(x, y);
            }
            if ($gameTemp.characterSprite_opacity()) {
                this.opacity = $gameTemp.characterSprite_opacity();
            }
            if ($gameTemp.characterSprite_blend()) {
                this.blendMode = $gameTemp.characterSprite_blend();
            }
            $gameTemp.characterSprite_RemoveConfig();
            $gameTemp.characterSprite_reset();
        }
    };
})();
