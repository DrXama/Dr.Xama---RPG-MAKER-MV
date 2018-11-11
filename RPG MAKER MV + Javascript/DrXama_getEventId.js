
//==================================================================================================
// DrXama_getEventId.js
//==================================================================================================
/*:
 * @plugindesc v1.00 - Pega o ID do evento pelo nome do mesmo em qualquer mapa.
 *
 * @author Dr.Xamã
 * 
 * @help
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Você coloca o ID do mapa e o nome do evento para pegar o ID do mesmo.
 * ================================================================================
 *    Comandos
 * ================================================================================
 * - Para pegar o id do evento
 * - $gameTemp.getEventId(mapId, eventName, callback);
 *   - mapId : ID do mapa
 *   - eventName : Nome do evento
 *   - callback : Função a ser executada após a verificação
 * 
 * Exemplos:
 * - $gameTemp.getEventId(1, 'Teste');
 * - $gameTemp.getEventId(1, 'Teste', eventId => { $gameVariables.setValue(1, eventId) });
 * 
 * - Para pegar o id do evento que está no cache
 * - $gameTemp.cacheEventId();
 * 
 * ================================================================================
 *    Informações
 * ================================================================================
 * Esse plugin faz parte do projeto "RPG MAKER MV + Javascript" do Dr.Xamã.
 * - http://www.condadobraveheart.com/forum/index.php?topic=4717.msg37035
 */
(function () {
    "use strict";
    /**
     * Global Variables
     */
    let _mapData = {},
        _eventName = '',
        _eventId,
        _callback;

    /**
     * DataManager
     */
    DataManager._DrXama_getEventId_loadMapData = function (mapId) {
        if (mapId > 0) {
            var filename = 'Map%1.json'.format(mapId.padZero(3));
            this._mapLoader = ResourceHandler.createLoader('data/' + filename, this.loadDataFile.bind(this, '$dataMap', filename));
            this._DrXama_getEventId_loadDataFile('$dataMap', filename);
        }
    };

    DataManager._DrXama_getEventId_loadDataFile = function (name, src) {
        var xhr = new XMLHttpRequest();
        var url = 'data/' + src;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = function () {
            if (xhr.status < 400) {
                _mapData[name] = JSON.parse(xhr.responseText);
                DataManager._DrXama_getEventId_onLoad(_mapData[name], () => {
                    $gameTemp.processEventId();
                });
            }
        };
        xhr.onerror = this._mapLoader || function () {
            DataManager._errorUrl = DataManager._errorUrl || url;
        };
        _mapData[name] = null;
        xhr.send();
    };

    DataManager._DrXama_getEventId_onLoad = function (object, callback) {
        var array;
        if (object === $dataMap) {
            this.extractMetadata(object);
            array = object.events;
        } else {
            array = object;
        }
        if (Array.isArray(array)) {
            for (var i = 0; i < array.length; i++) {
                var data = array[i];
                if (data && data.note !== undefined) {
                    this.extractMetadata(data);
                }
            }
        }
        if (object === $dataSystem) {
            Decrypter.hasEncryptedImages = !!object.hasEncryptedImages;
            Decrypter.hasEncryptedAudio = !!object.hasEncryptedAudio;
            Scene_Boot.loadSystemImages();
        }
        if (typeof callback === 'function') callback();
    };

    /**
     * Game_Temp
     */
    Game_Temp.prototype.getEventId = function (mapId, eventName, callback) {
        DataManager._DrXama_getEventId_loadMapData(mapId);
        _eventName = String(eventName);
        _callback = callback;
    };

    Game_Temp.prototype.processEventId = function () {
        _mapData['$dataMap'].events.map(event => {
            if (event)
                if (event.name === _eventName) {
                    if (typeof _callback === 'function') return _callback(event.id);
                    _eventId = event.id;
                }
        });
    };

    Game_Temp.prototype.cacheEventId = function () {
        return _eventId;
    }
})();