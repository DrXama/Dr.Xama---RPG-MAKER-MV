//==================================================================================================
// DrXama_copyEvents.js
//==================================================================================================
/*:
 * @plugindesc v1.06 - Copie seus eventos de uma maneira simples
 *
 * @author Dr.Xamã
 * 
 * @help
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Faça uma copia de qualquer evento que quiser.
 * ================================================================================
 *    Comandos de plugin
 * ================================================================================
 * copyEvent mapId eventId tileX tileY - Copia o evento no mapa atual
 * copyEventFrontPlayer mapId eventId - Copia o evento para a frente do jogador
 * copyEventBackPlayer mapId eventId - Copia o evento para trás do jogador
 * copyEventLeftPlayer mapId eventId - Copia o evento para a esquerda do jogador
 * copyEventRightPlayer mapId eventId - Copia o evento para a direita do jogador
 * copyEventRegion mapId eventId regionId quantity - Copia o evento para a região
 * 
 * Exemplo: copyEvent 1 1 10 4 - Copia o evento 1 do mapa 1 para a posição x e y
 * Exemplo: copyEventFrontPlayer 1 1 - Copia o evento 1 do mapa 1 para trás do 
 *                                     jogador
 * Exemplo: copyEventRegion 1 1 1 8 - Copia o evento 1 do mapa 1 para a região 1
 *                                    8 vezes
 * ================================================================================
 *    Comandos de script
 * ================================================================================
 * $gameMap.copyEvent(mapId, eventId, mapX, mapY) - Copia o evento no mapa atual
 * $gameMap.copyEventFrontPlayer(mapId, eventId) - Copia o evento 1 do mapa 1 para 
 *                                                 trás do jogador
 * $gameMap.copyEventBackPlayer(mapId, eventId) - Copia o evento para trás do 
 *                                                jogador
 * $gameMap.copyEventLeftPlayer(mapId, eventId) - Copia o evento para a esquerda do 
 *                                                jogador
 * $gameMap.copyEventRightPlayer(mapId, eventId) - Copia o evento para a direita do 
 *                                                 jogador
 * $gameMap.copyEventRegion(mapId, eventId, regionId, quantity) - Copia o evento
 *                                                                para a região
 * ================================================================================
 *    Atualização
 * ================================================================================
 * Para atualizar esse plugin vá no github do Dr.Xamã
 * https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV
 */
(function () {
    "use strict";
    //================================================================================
    // Game_Interpreter
    //================================================================================
    const gameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        gameInterpreter_pluginCommand.apply(this, arguments);
        if (typeof command === 'string' && command.toLowerCase() === 'copyevent') {
            var mapId = parseInt(args[0]) || 0;
            var eventId = parseInt(args[1]) || 0;
            var mapX = parseInt(args[2]) || 0;
            var mapY = parseInt(args[3]) || 0;
            var src = 'Map%1.json'.format(mapId.padZero(3));
            var callback = function (mapInfo) {
                if (!mapInfo) return console.warn(`Impossivel coletar as informações do mapa(${mapId})`);
                // Copia o evento
                var event = mapInfo.events[eventId];
                event.x = mapX;
                event.y = mapY;
                // Cria o evento na data
                $dataMap.events.push(event);
                // Pega o id do evento na data
                var eventIndexOf = $dataMap.events.indexOf(event);
                // Cria o evento no mapa
                var eventMap = new Game_Event($gameMap._mapId, eventIndexOf);
                $gameMap._events.push(eventMap);
                $gameMap._eventsCopy.push(event);
                SceneManager._scene._spriteset.drXama_copyEvent(eventMap);
            }
            try {
                DataManager.drXama_loadDataFile(src, callback);
            } catch (error) {
                console.warn(`Impossivel copiar o evento(${eventId}) do mapa(${mapId})`);
            }
        }
        if (typeof command === 'string' && command.toLowerCase() === 'copyeventfrontplayer') {
            var mapId = parseInt(args[0]) || 0;
            var eventId = parseInt(args[1]) || 0;
            $gameMap.copyEventFrontPlayer(mapId, eventId);
        }
        if (typeof command === 'string' && command.toLowerCase() === 'copyeventbackplayer') {
            var mapId = parseInt(args[0]) || 0;
            var eventId = parseInt(args[1]) || 0;
            $gameMap.copyEventBackPlayer(mapId, eventId);
        }
        if (typeof command === 'string' && command.toLowerCase() === 'copyeventleftplayer') {
            var mapId = parseInt(args[0]) || 0;
            var eventId = parseInt(args[1]) || 0;
            $gameMap.copyEventLeftPlayer(mapId, eventId);
        }
        if (typeof command === 'string' && command.toLowerCase() === 'copyeventrightplayer') {
            var mapId = parseInt(args[0]) || 0;
            var eventId = parseInt(args[1]) || 0;
            $gameMap.copyEventRightPlayer(mapId, eventId);
        }
        if (typeof command === 'string' && command.toLowerCase() === 'copyeventregion') {
            var mapId = parseInt(args[0]) || 0;
            var eventId = parseInt(args[1]) || 0;
            var regionId = parseInt(args[2]) || -1;
            var quantity = parseInt(args[3]) || 0;
            $gameMap.copyEventRegion(mapId, eventId, regionId, quantity);
        }
    };
    //================================================================================
    // Game_Map
    //================================================================================
    // Copia o evento para a posição x e y
    Game_Map.prototype.copyEvent = function (mapId, eventId, mapX, mapY) {
        this._interpreter.pluginCommand('copyevent', [`${mapId}`, `${eventId}`, `${mapX}`, `${mapY}`]);
    };

    // Copia o evento para a frente do jogador
    Game_Map.prototype.copyEventFrontPlayer = function (mapId, eventId) {
        var mapX,
            mapY;
        switch ($gamePlayer.direction()) {
            case 2:
                mapX = $gamePlayer._x;
                mapY = $gamePlayer._y + 1;
                break;
            case 8:
                mapX = $gamePlayer._x;
                mapY = $gamePlayer._y - 1;
                break;
            case 4:
                mapX = $gamePlayer._x - 1;
                mapY = $gamePlayer._y;
                break;
            case 6:
                mapX = $gamePlayer._x + 1;
                mapY = $gamePlayer._y;
                break;
        }
        this._interpreter.pluginCommand('copyevent', [`${mapId}`, `${eventId}`, `${mapX}`, `${mapY}`]);
    };

    // Copia o evento para trás do jogador
    Game_Map.prototype.copyEventBackPlayer = function (mapId, eventId) {
        var mapX,
            mapY;
        switch ($gamePlayer.direction()) {
            case 2:
                mapX = $gamePlayer._x;
                mapY = $gamePlayer._y - 1;
                break;
            case 8:
                mapX = $gamePlayer._x;
                mapY = $gamePlayer._y + 1;
                break;
            case 4:
                mapX = $gamePlayer._x + 1;
                mapY = $gamePlayer._y;
                break;
            case 6:
                mapX = $gamePlayer._x - 1;
                mapY = $gamePlayer._y;
                break;
        }
        this._interpreter.pluginCommand('copyevent', [`${mapId}`, `${eventId}`, `${mapX}`, `${mapY}`]);
    };

    // Copia o evento para a esquerda do jogador
    Game_Map.prototype.copyEventLeftPlayer = function (mapId, eventId) {
        var mapX,
            mapY;
        switch ($gamePlayer.direction()) {
            case 2:
                mapX = $gamePlayer._x - 1;
                mapY = $gamePlayer._y;
                break;
            case 8:
                mapX = $gamePlayer._x - 1;
                mapY = $gamePlayer._y;
                break;
            case 4:
                mapX = $gamePlayer._x;
                mapY = $gamePlayer._y + 1;
                break;
            case 6:
                mapX = $gamePlayer._x;
                mapY = $gamePlayer._y - 1;
                break;
        }
        this._interpreter.pluginCommand('copyevent', [`${mapId}`, `${eventId}`, `${mapX}`, `${mapY}`]);
    };

    // Copia o evento para a direita do jogador
    Game_Map.prototype.copyEventRightPlayer = function (mapId, eventId) {
        var mapX,
            mapY;
        switch ($gamePlayer.direction()) {
            case 2:
                mapX = $gamePlayer._x + 1;
                mapY = $gamePlayer._y;
                break;
            case 8:
                mapX = $gamePlayer._x + 1;
                mapY = $gamePlayer._y;
                break;
            case 4:
                mapX = $gamePlayer._x;
                mapY = $gamePlayer._y - 1;
                break;
            case 6:
                mapX = $gamePlayer._x;
                mapY = $gamePlayer._y + 1;
                break;
        }
        this._interpreter.pluginCommand('copyevent', [`${mapId}`, `${eventId}`, `${mapX}`, `${mapY}`]);
    };

    // Copia o evento aleatoriamente para a região
    Game_Map.prototype.copyEventRegion = function (mapId, eventId, regionId, quantity) {
        var regionXy = (function () {
            var value = [];
            var x = 0;
            var y = 0;
            var process = $dataMap.width + $dataMap.height;
            while (process > 0) {
                if (x < $dataMap.width) {
                    x++;
                } else {
                    x = 0;
                    y++;
                    process--;
                }
                if ($gameMap.regionId(x, y) === regionId) {
                    value.push([x, y]);
                }
            }
            return value;
        })();
        if (regionXy.length <= 0) return;
        var regionEventXy = [];
        var regionEventXyIsValid = function (x, y) {
            var valid = true;
            if (regionEventXy.length > 0) {
                regionEventXy.forEach(function (eventXy) {
                    if (eventXy[0] == x && eventXy[1] == y) {
                        return valid = false;
                    }
                });
            }
            return valid;
        };
        while (quantity > 0) {
            var mapXy = (function () {
                return regionXy[Math.randomInt(regionXy.length - 1)];
            })();
            if (regionEventXyIsValid(mapXy[0], mapXy[1])) {
                regionEventXy.push([mapXy[0], mapXy[1]]);
                this._interpreter.pluginCommand('copyevent', [`${mapId}`, `${eventId}`, `${mapXy[0]}`, `${mapXy[1]}`]);
            }
            if (regionXy.length > quantity) {
                if (regionEventXy.length >= quantity) {
                    quantity = 0;
                }
            } else {
                quantity--;
            }
        }
    };

    //================================================================================
    // DataManager
    //================================================================================
    // Carrega o arquivo contendo as informações do mapa
    DataManager.drXama_loadDataFile = function (src, callback) {
        var xhr = new XMLHttpRequest();
        var url = 'data/' + src;
        var data;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = function () {
            if (xhr.status < 400) {
                data = JSON.parse(xhr.responseText);
                if (typeof callback === 'function') callback(data);
            }
        };
        xhr.onerror = function () {
            DataManager._errorUrl = url;
        };
        data = null;
        xhr.send();
    };

    //================================================================================
    // Scene_Map
    //================================================================================    
    const scene_map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function () {
        scene_map_createDisplayObjects.call(this);
        // Carrega os eventos copiados para a data do mapa
        if (!$gameMap._eventsCopy) $gameMap._eventsCopy = [];
        if ($gameMap._eventsCopy.length > 0) {
            $gameMap._eventsCopy.forEach(function (event) {
                $dataMap.events.push(event);
            });
        }
    };

    //================================================================================
    // Spriteset_Map
    //================================================================================
    Spriteset_Map.prototype.drXama_copyEvent = function (event) {
        if (!this._characterSprites) return;
        var spriteEvent = new Sprite_Character(event);
        this._characterSprites.push(spriteEvent);
        var spriteIndexOf = this._characterSprites.indexOf(spriteEvent);
        this._tilemap.addChild(this._characterSprites[spriteIndexOf]);
    };
})();