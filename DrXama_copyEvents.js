//==================================================================================================
// DrXama_copyEvents.js
//==================================================================================================
/*:
 * @plugindesc v1.00 - Copie seus eventos de uma maneira simples
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
 * 
 * Exemplo: copyEvent 1 1 10 4
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
                SceneManager._scene._spriteset.drXama_copyEvent(eventMap);
            }
            try {
                DataManager.drXama_loadDataFile(src, callback);
            } catch (error) {
                console.warn(`Impossivel copiar o evento(${eventId}) do mapa(${mapId})`);
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