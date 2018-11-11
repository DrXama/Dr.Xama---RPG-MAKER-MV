
//==================================================================================================
// DrXama_getEventId.js
//==================================================================================================
/*:
 * @plugindesc v2.00 - Pega o ID do evento pelo nome do mesmo em qualquer mapa.
 *
 * @author Dr.Xamã
 * 
 * @param Quantidade de mapas
 * @desc Quantos mapas terão as informações carregadas?
 * @type number
 * @default 999
 * @min 1
 * 
 * @help
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Você coloca o ID do mapa e o nome do evento para pegar o ID do mesmo.
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
    let params = PluginManager.parameters('DrXama_getEventId'),
        qmaps = Number(params['Quantidade de mapas']),
        dmaps = {};

    /**
     * Functions
     */
    function localPath(p) {
        if (p.substring(0, 1) === '/')
            p = p.substring(1);
        var path = require('path'),
            base = path.dirname(process.mainModule.filename);
        return path.join(base, p);
    };

    /**
     * DataManager
     */
    DataManager._drXama_loadMapData = function (mapId) {
        if (mapId > 0) {
            var filename = 'Map%1.json'.format(mapId.padZero(3));
            if (require('fs').existsSync(localPath(`data/${filename}`))) {
                this._mapLoader = ResourceHandler.createLoader('data/' + filename, this.loadDataFile.bind(this, '$dataMap', filename));
                this._drXama_loadDataFile(mapId, `$dataMap${mapId.padZero(3)}`, filename);
            }
        }
    };

    DataManager._drXama_loadDataFile = function (mapId, name, src) {
        var xhr = new XMLHttpRequest();
        var url = 'data/' + src;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
        xhr.onload = function () {
            if (xhr.status < 400) {
                dmaps[name] = JSON.parse(xhr.responseText);
                dmaps[name]['id'] = mapId;
                DataManager.onLoad(dmaps[name]);
            }
        };
        xhr.onerror = this._mapLoader || function () {
            DataManager._errorUrl = DataManager._errorUrl || url;
        };
        dmaps[name] = null;
        xhr.send();
    };

    /**
     * Game_Temp
     */
    Game_Temp.prototype.getEventId = function (mapId, eventName) {
        let eventsId = [];
        Object.keys(dmaps).map(key => {
            let map = dmaps[key];
            if (map.id === Number(mapId)) {
                map.events.map(event => {
                    if (event && event.name === String(eventName))
                        eventsId.push(event.id);
                })
            }
        });
        return eventsId;
    };

    /**
     * GET MAP DATA
     */
    (() => { let i = 0; while (i < qmaps) DataManager._drXama_loadMapData(i++); })();
})();