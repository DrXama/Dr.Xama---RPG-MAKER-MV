//==================================================================================================
// DrXama_regionTeleport.js
//==================================================================================================
/*:
 * @plugindesc v1.02 - Utiliza regiões para teleportar o jogador.
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
 * - teleportToRegion mapId regionId direction fade
 *   - direction: 2, 4, 6, 8
 *   - fade: 0 ou 1
 *   - Exemplo: teleportToRegion 1 10 2 0
 *
 * - $gameTemp.teleportToRegion(mapId, regionId, direction);
 *   - direction: 2, 4, 6, 8
 *   - fade: 0 ou 1
 *   - Exemplo: $gameTemp.teleportToRegion(1, 10, 2, 0);
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
            this.defineRegionXy();
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
        }
        defineRegionXy() {
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
        getRegionXy(Xy) {
            if (String(Xy).toLowerCase().trim() === 'x')
                return this._tileXy[0];
            if (String(Xy).toLowerCase().trim() === 'y')
                return this._tileXy[1];
            return this._tileXy;
        }
        teleportToRegion(player) {
            if (player === undefined || typeof player != 'object')
                player = {
                    direction: $gamePlayer.direction(),
                    fade: 0
                }
            if (typeof player.direction != 'number') player.direction = $gamePlayer.direction();
            if (typeof player.fade != 'number') player.fade = 0;
            if (player.fade > 1) player.fade = 1;
            if (this.getRegionXy('x') & this.getRegionXy('y') != undefined)
                $gamePlayer.reserveTransfer(this.mapId(), this.getRegionXy('x'), this.getRegionXy('y'), player.direction, player.fade);
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

    Game_Temp.prototype.teleportToRegion = function (mapId, regionId, direction, fade) {
        $gameMap._interpreter.pluginCommand('teleportToRegion', [
            String(mapId),
            String(regionId),
            String(direction),
            String(fade)
        ]);
    };

    /**
     * Game_Interpreter
     */
    const _game_interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _game_interpreter_pluginCommand.apply(this, arguments);
        if (String(command).toLocaleLowerCase() === 'teleporttoregion') {
            let mapId = Number(args[0]),
                regionId = Number(args[1]),
                direction = Number(args[2]),
                fade = Number(args[3]);
            $gameTemp.addTeleportRegion(mapId, DataManager.createTeleportRegion(mapId, regionId));
            $gameTemp.getTeleportRegion(mapId).teleportToRegion({
                direction: direction,
                fade: fade
            });
        }
    };
})();