//==================================================================================================
// DrXama_regionTeleport.js
//==================================================================================================
/*:
 * @plugindesc v1.00 - Utiliza regiões para teleportar o jogador.
 *
 * @author Dr.Xamã
 * 
 * @help
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Você coloca a região no mapa e depois teleporta o jogador para ele, bem simples.
 * ================================================================================
 *    Comandos de Plugin e Script
 * ================================================================================
 * - teleportToRegion mapId regionId
 *   - Exemplo: teleportToRegion 1 10
 * 
 * - $gameTemp.teleportToRegion(mapId, regionId);
 *   - Exemplo: $gameTemp.teleportToRegion(1, 10);
 * ================================================================================
 *    Informações
 * ================================================================================
 * Esse plugin faz parte do projeto "RPG MAKER MV + Javascript" do Dr.Xamã.
 * - http://www.condadobraveheart.com/forum/index.php?topic=4717.msg37035
 */
(function () {
    "use strict";
    /**
     * DataManager
     */
    DataManager.createTeleportRegion = function (mapId, regionId) {
        let fs = require('fs'),
            path = require("path"),
            base = path.dirname(process.mainModule.filename),
            mapPath = path.join(base, 'data/Map%1.json'.format(mapId.padZero(3)));
        if (fs.existsSync(mapPath)) {
            let mapData = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
            mapData.mapId = mapId;
            return new TeleportRegion(mapData, regionId);
        }
    };

    /**
     * Class
     */
    class TeleportRegion {
        constructor(mapData, regionId) {
            this._dataMap = mapData;
            this._regionId = regionId;
            this._tileXy = [];
        }
        mapId() {
            return this._dataMap.mapId;
        }
        width() {
            return this._dataMap.width;
        }
        height() {
            return this._dataMap.height;
        }
        data() {
            return this._dataMap.data;
        }
        isValid(x, y) {
            return x >= 0 && x < this.width() && y >= 0 && y < this.height();
        }
        tileId(x, y, z) {
            var width = this.width();
            var height = this.height();
            return this.data()[(z * height + y) * width + x] || 0;
        }
        regionId(x, y) {
            return this.isValid(x, y) ? this.tileId(x, y, 5) : 0;
        };
        teleportToRegion() {
            if (this._tileXy.length <= 0) {
                let x = 0,
                    y = 0;
                while (y < this.height()) {
                    if (x < this.width()) {
                        if (this.regionId(x, y) === this._regionId)
                            this._tileXy = [x, y];
                    } else {
                        x = 0;
                        y++;
                    } x++;
                }
            }
            $gamePlayer.reserveTransfer(this.mapId(), this._tileXy[0], this._tileXy[1], $gamePlayer.direction(), 0);
        }
    }

    /**
     * Game_Temp
     */
    Game_Temp.prototype.addTeleportRegion = function (mapId, teleport) {
        if (!this._teleportRegion) this._teleportRegion = {};
        this._teleportRegion[mapId] = teleport;
    };

    Game_Temp.prototype.getTeleportRegion = function (mapId) {
        if (!this._teleportRegion) this._teleportRegion = {};
        return this._teleportRegion[mapId];
    };

    Game_Temp.prototype.teleportToRegion = function (mapId, regionId) {
        $gameMap._interpreter.pluginCommand('teleportToRegion', [String(mapId), String(regionId)]);
    };

    /**
     * Game_Interpreter
     */
    const _game_interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _game_interpreter_pluginCommand.apply(this, arguments);
        if (String(command).toLocaleLowerCase() === 'teleporttoregion') {
            let mapId = Number(args[0]),
                regionId = Number(args[1]);
            $gameTemp.addTeleportRegion(mapId, DataManager.createTeleportRegion(mapId, regionId));
            $gameTemp.getTeleportRegion(mapId).teleportToRegion();
        }
    };
})();