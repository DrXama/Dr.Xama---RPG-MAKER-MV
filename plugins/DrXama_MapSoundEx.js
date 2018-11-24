//==================================================================================================
// DrXama_MapSoundEx.js
//==================================================================================================
/*:
 * @plugindesc v1.0.2 - Esse plugin cria sons ambiente com virtualização 3D.
 *
 * @author Dr.Xamã
 * 
 * @param MapAudioExRestrict
 * @desc Restringe a criação de múltiplos áudios com o mesmo ID.
 * @type string[]
 * @default []
 * 
 * @help
 * ================================================================================
 *    CHANGELOG
 * ================================================================================
 * v1.0.2
 * - Resolvido o erro do áudio no máximo ao iniciar o mapa.
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Esse plugin cria sons ambiente com virtualização 3D. Lembrando que é só uma
 * virtualização então o efeito não é 100%.
 * ================================================================================
 *    Importante
 * ================================================================================
 * 1º) Os audios podem ter o mesmo id, para facilitar na hora de tocar varios 
 * audios.
 * 
 * 2º) Qualquer valor exceto 'URL' e 'ID', podem ser ou não especificados.
 * 
 * 3º) O RPG MAKER MV tem suporte para arquivos .OGG(ogg) e M4A(m4a), lembre-se
 * de sempre converter seus audios para os formatos suportados.
 * ================================================================================
 *    Comandos de plugin
 * ================================================================================
 * - 1º) createMapAudioEx id, url, tileX, tileY, loop, volume
 * -- ID: Tag para marcar o audio
 * -- URL: Caminho do audio, exemplo: audio/bgm/Theme6.ogg ou Theme6.m4a
 * -- TILE Y e X: Eixo Y e Y do mapa onde o audio se encontra
 * -- LOOP: O audio deve ser tocado sem parar?
 * -- VOLUME: Volume do audio
 * 
 * - EXEMPLO: 
 * -- 1º) createMapAudioEx sound_1 audio/bgm/Theme6.ogg 19 23 true
 * -- 2º) createMapAudioEx sound_1 audio/bgm/Theme2.ogg 19 23 true 50
 * -- 3º) createMapAudioEx sound_2 audio/bgm/Theme1.ogg 19 23 false
 * -- 4º) createMapAudioEx sound_3 audio/bgm/Town1.ogg
 * 
 * - 2º) playMapAudioEx id
 * -- ID: Tag para marcar o audio
 * 
 * - EXEMPLO: 
 * -- 1º) playMapAudioEx sound_1
 * 
 * - 3º) stopMapAudioEx id
 * -- ID: Tag para marcar o audio
 * 
 * - EXEMPLO: 
 * -- 1º) stopMapAudioEx sound_1
 * ================================================================================
 *    Comandos de script
 * ================================================================================
 * Os comandos de scripts seguem os mesmos padrões do 'Comandos de plugin'.
 * 
 * - ID - STRING : 'audio_1'
 * - URL - STRING : 'audio/bgm/Town1.ogg'
 * - TILE X - NUMBER : 0~256
 * - TILE Y - NUMBER : 0~256
 * - LOOP - BOOLEAN : TRUE/FALSE
 * - VOLUME - NUMBER : 0~100
 * 
 * 1º) $gameTemp.createMapAudioEx(id, url, tileX, tileY, loop, volume);
 * 
 * 2º) $gameTemp.playMapAudioEx(id);
 * 
 * 3º) $gameTemp.stopMapAudioEx(id);
 * ================================================================================
 *    Atualização
 * ================================================================================
 * Para atualizar esse plugin vá no site/github do Dr.Xamã!
 * - Site: http://drxama.epizy.com/?page_id=299
 * - Github: https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV
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
            return Graphics.printError('Dr.Xamã', 'Atualmente seu RPG MAKER MV não suporta o seguinte plugin: DrXama_MapSoundEx'), SceneManager.stop();
    }
};
DX.mapSoundEx = DX.mapSoundEx || {
    'page': function () { return require('nw.gui').Shell.openExternal('http://drxama.epizy.com/?p=482'); },
    'update': function () { return require('nw.gui').Shell.openExternal('https://www.dropbox.com/s/9hrxl1laqhl8rb9/DrXama_MapSoundEx.js?dl=0'); },
    'changelog': function () { return require('nw.gui').Shell.openExternal('https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/blob/master/changelog/DrXama_MapSoundEx.md'); },
    'version': function () { return console.log('v1.0.2') }
};
(function () {
    "use strict";
    //-----------------------------------------------------------------------------
    // Parameters
    //
    const params = PluginManager.parameters('DrXama_MapSoundEx');
    const param_mapAudioExRestrict = JSON.parse(params['MapAudioExRestrict']) || [];

    //-----------------------------------------------------------------------------
    // Variaveis Globais
    //
    const fs = require('fs');

    //-----------------------------------------------------------------------------
    // Funções
    //
    // Retorna o caminho local para o arquivo/pasta
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

    //-----------------------------------------------------------------------------
    // MapAudioEX
    //
    function MapAudioEX() {
        this.initialize.apply(this, arguments);
    }

    MapAudioEX.formatURL = function (url) {
        let path = '';
        if (fs.existsSync(localPath(url)))
            path = localPath(url);
        return path;
    };

    MapAudioEX.prototype = Object.create(WebAudio.prototype);
    MapAudioEX.prototype.constructor = MapAudioEX;

    MapAudioEX.prototype.initialize = function (id, mapId, url, tileX, tileY, loop, volume, offset, state, fadeOutIsOn) {
        WebAudio.prototype.initialize.call(this, MapAudioEX.formatURL(url));
        this._id = id;
        this._mapId = mapId;
        this._tileX = tileX || 0;
        this._tileY = tileY || 0;
        this._loop = loop || false;
        this._volumeEx = (() => {
            if (typeof volume != 'number' || isNaN(volume)) volume = 100;
            if (volume < 0 || volume >= 100) return 1;
            if (volume < 10) return Number(`.${volume}`);
            return volume;
        })();
        this._state = state || 'stop';
        this._fadeOutIsOn = fadeOutIsOn || null;
        this._offset = offset || 0;
        if (this._fadeOutIsOn && this._state === 'stop') this._offset = 0;
    };

    MapAudioEX.prototype.id = function () {
        return this._id;
    };

    MapAudioEX.prototype.mapId = function () {
        return this._mapId;
    };

    MapAudioEX.prototype.fadeOutIsOn = function () {
        return this._fadeOutIsOn;
    };

    MapAudioEX.prototype.play = function () {
        if (this.fadeOutIsOn()) {
            WebAudio.prototype.play.call(this, this._loop, 0);
            this.fadeIn();
        } else {
            WebAudio.prototype.play.call(this, this._loop, this._offset);
        }
        this._state = 'play';
    };

    MapAudioEX.prototype.stop = function () {
        WebAudio.prototype.stop.call(this);
        this._state = 'stop';
    };

    MapAudioEX.prototype.fadeIn = function () {
        WebAudio.prototype.fadeIn.call(this, 1);
        this._fadeOutIsOn = false;
        this._state = 'play';
    };

    MapAudioEX.prototype.fadeOut = function () {
        WebAudio.prototype.fadeOut.call(this, 1);
        this._fadeOutIsOn = true;
        this._state = 'fadeOut';
    };

    MapAudioEX.prototype.update = function () {
        this.updateMap();
        if (!this.fadeOutIsOn()) {
            this.updatePosition();
            this.updateVolume();
        }
    };

    MapAudioEX.prototype.updateMap = function () {
        if (this.mapId() != $gameMap.mapId()) {
            if (this._state === 'play') this.fadeOut(0.5);
        }
    };

    MapAudioEX.prototype.updateVolume = function () {
        let player = $gamePlayer,
            pTileX = player._x,
            pTileY = player._y,
            distance = parseInt(String(`${$gameMap.distance(this._tileX, this._tileY, pTileX, pTileY)}0`)),
            volume = this._volumeEx * (100 - distance) / 10000;
        if (!this._volumeFadeOptions) {
            this._volumeFadeOptions = {
                active: false,
                frames: 120,
                fadeOut: {
                    frames: 0,
                    active: false
                },
                fadeIn: {
                    frames: 0,
                    active: false
                }
            }
        }
        if (this._volumeFadeOptions.fadeOut.active) {
            if (this._volumeFadeOptions.fadeOut.frames < this._volumeFadeOptions.frames) {
                this._volumeFadeOptions.fadeOut.frames++;
                if (this.volume > 0) this.volume -= .01;
                else this._volumeFadeOptions.fadeOut.active = false;
            }
            return;
        } else if (this._volumeFadeOptions.fadeIn.active) {
            if (this._volumeFadeOptions.fadeOut.frames < this._volumeFadeOptions.frames) {
                this._volumeFadeOptions.fadeOut.frames++;
                if (this.volume < volume) this.volume += .01;
                else {
                    this._volumeFadeOptions.fadeIn.active = false;
                    this._volumeFadeOptions.active = false;
                }
            }
            return;
        }
        if (volume <= 0 && !this._volumeFadeOptions.active) {
            this._volumeFadeOptions.active = true;
            this._volumeFadeOptions.fadeOut.active = true;
            this._volumeFadeOptions.fadeOut.frames = 0;
            this._volumeFadeOptions.fadeIn.active = false;
        } else if (volume >= .1 && this._volumeFadeOptions.active) {
            this._volumeFadeOptions.fadeIn.active = true;
            this._volumeFadeOptions.fadeIn.frames = 0;
            this._volumeFadeOptions.fadeOut.active = false;
        }
        this.volume = volume > 0 ? volume : 0;
    };

    MapAudioEX.prototype.updatePosition = function () {
        let player = $gamePlayer,
            position = 10 * ((this._tileX - player._x)) / 100;
        this.pan = position;
    };

    //-----------------------------------------------------------------------------
    // Scene_Map
    //
    const _scene_map_callmenu = Scene_Map.prototype.callMenu,
        _scene_map_start = Scene_Map.prototype.start,
        _scene_map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.callMenu = function () {
        _scene_map_callmenu.call(this);
        $gameTemp.stopAllMapAudioEx();
        if ($gameTemp.mapAudioEX().length > 0) {
            $gameTemp.mapAudioEX().map(audio => {
                $gameSystem.setDataMapAudioEx(audio._id, audio.seek(), audio._state, audio._fadeOutIsOn);
            });
        }
    };

    Scene_Map.prototype.start = function () {
        _scene_map_start.call(this);
        $gameTemp.playAllMapAudioEx();
        if ($gameTemp.mapAudioEX().length <= 0) {
            $gameTemp._mapAudioEx = $gameSystem.loadMapAudioEx();
            $gameTemp.mapAudioEX().map(audio => {
                if (audio._state === 'play' || audio._state === 'fadeOut')
                    audio.play();
            });
        }
    };

    Scene_Map.prototype.update = function () {
        _scene_map_update.call(this);
        this.updateMapAudioEx();
    };

    Scene_Map.prototype.updateMapAudioEx = function () {
        $gameTemp.mapAudioEX().map(audio => {
            audio.update();
        });
    };

    //-----------------------------------------------------------------------------
    // Game_Temp
    //
    const _game_temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function () {
        _game_temp_initialize.call(this);
        this._mapAudioExRestrict = {};
        if (param_mapAudioExRestrict instanceof Array)
            param_mapAudioExRestrict.map(audio => { this._mapAudioExRestrict[audio] = null; }, this);
        this._mapAudioEx = [];
        this._mapAudioEx_cacheStop = [];
    };

    Game_Temp.prototype.mapAudioEX = function () {
        return this._mapAudioEx;
    };

    Game_Temp.prototype.createMapAudioEx = function (id, mapId, url, tileX, tileY, loop, volume) {
        if (this._mapAudioExRestrict[id] === null) this._mapAudioExRestrict[id] = true;
        else if (this._mapAudioExRestrict[id]) return;
        this.mapAudioEX().push(new MapAudioEX(id, mapId, url, tileX, tileY, loop, volume));
        $gameSystem.mapAudioEx().push({
            id: id,
            mapId: mapId,
            url: url,
            tileX: tileX,
            tileY: tileY,
            loop: loop,
            volume: volume,
            offset: 0,
            state: 'stop',
            fadeOutIsOn: null
        });
    };

    Game_Temp.prototype.playMapAudioEx = function (id) {
        let getAudio = this.mapAudioEX().filter(audio => {
            return audio.id() === id;
        });
        if (getAudio.length > 0) {
            getAudio.map(audio => {
                audio.play();
            });
        }
    };

    Game_Temp.prototype.stopMapAudioEx = function (id) {
        let getAudio = this.mapAudioEX().filter(audio => {
            return audio.id() === id;
        });
        if (getAudio.length > 0) {
            getAudio.map(audio => {
                audio.fadeOut(1);
                audio._state = 'stop';
            });
        }
    };

    Game_Temp.prototype.playAllMapAudioEx = function () {
        if (this._mapAudioEx_cacheStop.length > 0) {
            this._mapAudioEx_cacheStop.map(audio => {
                audio.fadeIn(0.5);
            });
            this._mapAudioEx_cacheStop = [];
        }
    };

    Game_Temp.prototype.stopAllMapAudioEx = function () {
        if (this.mapAudioEX().length > 0) {
            this.mapAudioEX().map(audio => {
                if (audio._state === 'play') {
                    audio.fadeOut(0.5);
                    this._mapAudioEx_cacheStop.push(audio);
                }
            });
        }
    };

    //-----------------------------------------------------------------------------
    // Game_System
    //
    const _game_system_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        _game_system_initialize.call(this);
        this._mapAudioEx = [];
        this._mapAudioEx_cacheStop = [];
    };

    Game_System.prototype.mapAudioEx = function () {
        return this._mapAudioEx;
    };

    Game_System.prototype.mapAudioEx_cacheStop = function () {
        return this._mapAudioEx_cacheStop;
    };

    Game_System.prototype.loadMapAudioEx = function () {
        if (this.mapAudioEx().length > 0)
            return this.mapAudioEx().map(data => {
                return new MapAudioEX(data.id, data.url, data.tileX, data.tileY,
                    data.loop, data.volume, data.offset, data.state, data.fadeOutIsOn);
            });
        return [];
    };

    Game_System.prototype.setDataMapAudioEx = function (id, offset, state, fadeOutIsOn) {
        this.mapAudioEx().map(data => {
            if (data.id === id) {
                data.offset = offset;
                data.state = state;
                data.fadeOutIsOn = fadeOutIsOn;
            }
        });
    };

    //-----------------------------------------------------------------------------
    // Game_Interpreter
    //
    const _game_interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _game_interpreter_pluginCommand.apply(this, arguments);
        if (String(command).toLowerCase() === 'createmapaudioex') {
            let id = String(args[0]),
                mapId = Number(args[1]),
                url = String(args[2]),
                tileX = Number(args[3]),
                tileY = Number(args[4]),
                loop = Boolean(args[5]),
                volume = Number(args[6]);
            $gameTemp.createMapAudioEx(id, mapId, url, tileX, tileY, loop, volume);
        }
        if (String(command).toLowerCase() === 'playmapaudioex') {
            let id = String(args[0]);
            $gameTemp.playMapAudioEx(id);
        }
        if (String(command).toLowerCase() === 'stopmapaudioex') {
            let id = String(args[0]);
            $gameTemp.stopMapAudioEx(id);
        }
    };
})();