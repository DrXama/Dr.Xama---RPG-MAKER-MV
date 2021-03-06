//==================================================================================================
// DrXama_copyEvents.js
//==================================================================================================
/*:pt
 * @plugindesc v1.2.14 - Copie seus eventos para qualquer mapa.
 *
 * @author Dr.Xamã
 *
 * @param Show on debug
 * @text Exibir no console
 * @desc Deseja exibir a depuração no console?
 * @type boolean
 * @default false
 * @on Sim
 * @off Não
 *
 * @help
 * ================================================================================
 *    CHANGELOG
 * ================================================================================
 * v1.2.13
 * - Resolvido o erro onde os selfSwitches estavam todos sendo ativados.
 * 
 * v1.2.12
 * - Agora não é necessário ter a quantia de vezes para copiar um evento para uma
 * região.
 * - Correção de erros.
 * 
 * v1.1.09:
 * - Foi adicionado uma nova funcionalidade que possibilita ao desenvolvedor
 * ativar/desativar as 'Switches Locais' dos eventos.
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Faça uma copia de qualquer evento que quiser para qualquer mapa do seu jogo.
 * ================================================================================
 *    Comandos de plugin
 * ================================================================================
 * copyEvent mapId eventId tileX tileY switchLocalA switchLocalB switchLocalC 
 * switchLocalD - Copia o evento no mapa atual
 * 
 * copyEventFrontPlayer mapId eventId switchLocalA switchLocalB switchLocalC 
 * switchLocalD - Copia o evento para a frente do jogador
 * 
 * copyEventBackPlayer mapId eventId switchLocalA switchLocalB switchLocalC 
 * switchLocalD - Copia o evento para trás do jogador
 * 
 * copyEventLeftPlayer mapId eventId switchLocalA switchLocalB switchLocalC 
 * switchLocalD - Copia o evento para a esquerda do jogador
 * 
 * copyEventRightPlayer mapId eventId switchLocalA switchLocalB switchLocalC 
 * switchLocalD - Copia o evento para a direita do jogador
 * 
 * copyEventRegion mapId eventId regionId quantity switchLocalA switchLocalB 
 * switchLocalC switchLocalD - Copia o evento para a região
 * 
 * copyEventName eventName mapId tileX tileY switchLocalA switchLocalB switchLocalC 
 * switchLocalD - Copia o evento para o mapa pelo nome do evento
 * 
 * Exemplo: copyEvent 1 1 10 4 - Copia o evento 1 do mapa 1 para a posição x e y
 * 
 * Exemplo: copyEventFrontPlayer 1 1 - Copia o evento 1 do mapa 1 para trás do
 *                                     jogador
 * 
 * Exemplo: copyEventRegion 1 1 1 8 - Copia o evento 1 do mapa 1 para a região 1
 *                                    8 vezes
 * 
 * Exemplo: copyEventRegion 1 1 1 0 - Copia o evento 1 do mapa 1 para a região 1
 *                                    por completo
 * 
 * Exemplo: copyEventName Teste 1 4 5 - Copia o evento 1 do mapa 1 para a posição
 *                                      x e y
 * 
 * 
 * CODES:
 * - copyEventName:
 *  - frontPlayer
 *  - backPlayer
 *  - leftPlayer
 *  - RightPlayer
 *  - Region
 * ================================================================================
 *    Comandos de script
 * ================================================================================
 * $gameMap.copyEvent(mapId, eventId, mapX, mapY, selfSwitches) 
 * - Copia o evento no mapa atual
 * 
 * $gameMap.copyEventFrontPlayer(mapId, eventId, selfSwitches) 
 * - Copia o evento 1 do mapa 1 para trás do jogador
 * 
 * $gameMap.copyEventBackPlayer(mapId, eventId, selfSwitches) 
 * - Copia o evento para trás do jogador
 * 
 * $gameMap.copyEventLeftPlayer(mapId, eventId, selfSwitches) 
 * - Copia o evento para a esquerda do jogador
 * 
 * $gameMap.copyEventRightPlayer(mapId, eventId, selfSwitches) 
 * - Copia o evento para a direita do jogador
 * 
 * $gameMap.copyEventRegion(mapId, eventId, regionId, quantity, selfSwitches) 
 * - Copia o evento para a região
 * 
 * $gameMap.copyEventName(eventName, mapId, tileX, tileY, quantity, selfSwitches)
 *  - Copia o evento para o mapa pelo nome do evento
 * 
 * Exemplo: 
 * - $gameMap.copyEvent(1, 2, 4, 8, [true])
 *   - Copia o evento 2 do mapa 1 para a posição 4(X) e 8(Y), definindo o switch 
 *     local A para true(ativado)
 * ================================================================================
 *    Update
 * ================================================================================
 * Para atualizar esse plugin acesse
 * - https://raw.githubusercontent.com/DrXama/Dr.Xama---RPG-MAKER-MV/master/plugins/
 *   DrXama_copyEvents.js
 */
/*:
 * @plugindesc v1.2.14 - Copy your events to any map.
 *
 * @author Dr.Xamã
 *
 * @param Show on debug
 * @desc Want to display debugging on the console?
 * @type boolean
 * @default false
 * @on Yes
 * @off No
 *
 * @help
 * ================================================================================
 *    CHANGELOG
 * ================================================================================
 * v1.2.13
 * - Fixed the error where the selfSwitches were all being activated.
 * 
 * v1.2.12
 * - Now it is not necessary to have the delay to copy an event to a region.
 * - Fixed bugs.
 * 
 * v1.1.09:
 * - A new feature has been added that enables the developer to activate/deactivate 
 * the selfSwitches of events.
 * ================================================================================
 *    Introduction
 * ================================================================================
 * Make a copy of any event you want to any map in your game.
 * ================================================================================
 *    Plugin commands
 * ================================================================================
 * copyEvent mapId eventId tileX tileY switchLocalA switchLocalB switchLocalC 
 * switchLocalD - Copy the event on the current map.
 * 
 * copyEventFrontPlayer mapId eventId switchLocalA switchLocalB switchLocalC 
 * switchLocalD - Copy the event in front of the player.
 * 
 * copyEventBackPlayer mapId eventId switchLocalA switchLocalB switchLocalC 
 * switchLocalD - Copy the event behind the player.
 * 
 * copyEventLeftPlayer mapId eventId switchLocalA switchLocalB switchLocalC 
 * switchLocalD - Copy the event to the left of the player.
 * 
 * copyEventRightPlayer mapId eventId switchLocalA switchLocalB switchLocalC 
 * switchLocalD - Copy the event to the player's right.
 * 
 * copyEventRegion mapId eventId regionId quantity switchLocalA switchLocalB 
 * switchLocalC switchLocalD - Copy the event to the region.
 * 
 * copyEventName eventName mapId tileX tileY switchLocalA switchLocalB switchLocalC 
 * switchLocalD - Copy the event to the map by the name of the event.
 * 
 * Exemplo: copyEvent 1 1 10 4 - Copy event 1 from map 1 to position x and y.
 * 
 * Exemplo: copyEventFrontPlayer 1 1 - Copy event 1 from map 1 behind the player.
 * 
 * Exemplo: copyEventRegion 1 1 1 8 - Copy event 1 from map 1 to region 1. 
 *                                    The event will be copied 8 times.
 * 
 * Exemplo: copyEventRegion 1 1 1 0 - Copy event 1 from map 1 to region 1.
 *                                    The region will be filled with the event.
 * 
 * Exemplo: copyEventName Teste 1 4 5 - Copy event 1 from map 1 to position x and y
 * 
 * CODES:
 * - copyEventName:
 *  - frontPlayer
 *  - backPlayer
 *  - leftPlayer
 *  - RightPlayer
 *  - Region
 * ================================================================================
 *    Comandos de script
 * ================================================================================
 * $gameMap.copyEvent(mapId, eventId, mapX, mapY, selfSwitches) 
 * - Copy the event on the current map.
 * 
 * $gameMap.copyEventFrontPlayer(mapId, eventId, selfSwitches) 
 * - copy the event in front of the player.
 * 
 * $gameMap.copyEventBackPlayer(mapId, eventId, selfSwitches) 
 * - Copy the event behind the player.
 * 
 * $gameMap.copyEventLeftPlayer(mapId, eventId, selfSwitches) 
 * - Copy the event to the left of the player.
 * 
 * $gameMap.copyEventRightPlayer(mapId, eventId, selfSwitches) 
 * - Copy the event to the player's right.
 * 
 * $gameMap.copyEventRegion(mapId, eventId, regionId, quantity, selfSwitches) 
 * - Copy the event to the region.
 * 
 * $gameMap.copyEventName(eventName, mapId, tileX, tileY, quantity, selfSwitches)
 *  - Copy the event to the map by the name of the event.
 * 
 * Exemplo: 
 * - $gameMap.copyEvent(1, 2, 4, 8, [true])
 *   - Copy event 2 from map 1 to position 4(X) and 8(Y), define the SelfSwitch A 
 *     to true(activate)
 * ================================================================================
 *    Update
 * ================================================================================
 * To update this plugin go to
 * - https://raw.githubusercontent.com/DrXama/Dr.Xama---RPG-MAKER-MV/master/plugins/
 *   DrXama_copyEvents.js
 */
var DX = DX || {
    'site': function () { return require('nw.gui').Shell.openExternal('https://drxama.com/'); },
    'terms': function () { return require('nw.gui').Shell.openExternal('https://drxama.com/termos-de-uso/'); },
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
            return Graphics.printError('Dr.Xamã', 'Currently your RPG MAKER MV does not support the following plugin: DrXama_copyEvents'), SceneManager.stop();
    }
};
DX.copyEvents = DX.copyEvents || {
    'page': function () { return require('nw.gui').Shell.openExternal('https://drxama.com/plugins/drxama_copyevents/'); },
    'update': function () { return require('nw.gui').Shell.openExternal('https://raw.githubusercontent.com/DrXama/Dr.Xama---RPG-MAKER-MV/master/plugins/DrXama_copyEvents.js'); },
    'changelog': function () { return require('nw.gui').Shell.openExternal('https://raw.githubusercontent.com/DrXama/Dr.Xama---RPG-MAKER-MV/master/changelog/DrXama_copyEvents_en-us.md'); },
    'version': function () { return console.log('v1.2.14') }
};
(function () {
    "use strict";
    //-----------------------------------------------------------------------------
    // SceneManager
    //
    const scenemanager_run = SceneManager.run;
    SceneManager.run = function (sceneClass) { scenemanager_run.apply(this, arguments); DX.compatibility(); };

    //-----------------------------------------------------------------------------
    // Parameters
    //
    const params = PluginManager.parameters('DrXama_copyEvents');
    const console_user = JSON.parse(params['Show on debug']);

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
            var selfSwitches = {
                A: Boolean(eval(args[4])) || null,
                B: Boolean(eval(args[5])) || null,
                C: Boolean(eval(args[6])) || null,
                D: Boolean(eval(args[7])) || null
            };
            var src = 'Map%1.json'.format(mapId.padZero(3));
            var callback = function (mapInfo) {
                if (!mapInfo) {
                    if (console_user) {
                        return console.warn(`Impossivel coletar as informações do mapa(${mapId})`);
                    }
                    return;
                }
                // Copia o evento
                var event = mapInfo.events[eventId];
                event.x = mapX;
                event.y = mapY;
                if ($gameMap.eventsXy(mapX, mapY).length <= 0) {
                    // Cria o evento na data
                    $dataMap.events.push(event);
                    // Pega o id do evento na data
                    var eventIndexOf = $dataMap.events.indexOf(event);
                    // Cria o evento no mapa
                    var eventMap = new Game_Event($gameMap._mapId, eventIndexOf);
                    // Configura o SelfSwitches
                    var keys = {
                        A: [eventMap._mapId, eventMap._eventId, "A"],
                        B: [eventMap._mapId, eventMap._eventId, "B"],
                        C: [eventMap._mapId, eventMap._eventId, "C"],
                        D: [eventMap._mapId, eventMap._eventId, "D"]
                    };
                    if (selfSwitches.A != null) $gameSelfSwitches.setValue(keys.A, selfSwitches.A);
                    if (selfSwitches.B != null) $gameSelfSwitches.setValue(keys.B, selfSwitches.B);
                    if (selfSwitches.C != null) $gameSelfSwitches.setValue(keys.C, selfSwitches.C);
                    if (selfSwitches.D != null) $gameSelfSwitches.setValue(keys.D, selfSwitches.D);
                    // ---------------------------------------------
                    $gameMap._events.push(eventMap);
                    $gameMap._eventsCopy.push(event);
                    SceneManager._scene._spriteset.drXama_copyEvent(eventMap);
                } else {
                    if (console_user) {
                        return console.warn(`Impossivel copiar o evento(${eventId}) para a posição(x:${mapX} e y:${mapY}) pois já tem um evento nesta posição`);
                    }
                    return;
                }
            }
            try {
                DataManager.drXama_loadDataFile(src, callback);
            } catch (error) {
                if (console_user) {
                    console.warn(`Impossivel copiar o evento(${eventId}) do mapa(${mapId})`);
                }
            }
        }
        if (typeof command === 'string' && command.toLowerCase() === 'copyeventfrontplayer') {
            var mapId = parseInt(args[0]) || 0;
            var eventId = parseInt(args[1]) || 0;
            var selfSwitches_A = Boolean(eval(args[2])) || null;
            var selfSwitches_B = Boolean(eval(args[3])) || null;
            var selfSwitches_C = Boolean(eval(args[4])) || null;
            var selfSwitches_D = Boolean(eval(args[5])) || null;
            $gameMap.copyEventFrontPlayer(mapId, eventId, [selfSwitches_A, selfSwitches_B, selfSwitches_C, selfSwitches_D]);
        }
        if (typeof command === 'string' && command.toLowerCase() === 'copyeventbackplayer') {
            var mapId = parseInt(args[0]) || 0;
            var eventId = parseInt(args[1]) || 0;
            var selfSwitches_A = Boolean(eval(args[2])) || null;
            var selfSwitches_B = Boolean(eval(args[3])) || null;
            var selfSwitches_C = Boolean(eval(args[4])) || null;
            var selfSwitches_D = Boolean(eval(args[5])) || null;
            $gameMap.copyEventBackPlayer(mapId, eventId, [selfSwitches_A, selfSwitches_B, selfSwitches_C, selfSwitches_D]);
        }
        if (typeof command === 'string' && command.toLowerCase() === 'copyeventleftplayer') {
            var mapId = parseInt(args[0]) || 0;
            var eventId = parseInt(args[1]) || 0;
            var selfSwitches_A = Boolean(eval(args[2])) || null;
            var selfSwitches_B = Boolean(eval(args[3])) || null;
            var selfSwitches_C = Boolean(eval(args[4])) || null;
            var selfSwitches_D = Boolean(eval(args[5])) || null;
            $gameMap.copyEventLeftPlayer(mapId, eventId, [selfSwitches_A, selfSwitches_B, selfSwitches_C, selfSwitches_D]);
        }
        if (typeof command === 'string' && command.toLowerCase() === 'copyeventrightplayer') {
            var mapId = parseInt(args[0]) || 0;
            var eventId = parseInt(args[1]) || 0;
            var selfSwitches_A = Boolean(eval(args[2])) || null;
            var selfSwitches_B = Boolean(eval(args[3])) || null;
            var selfSwitches_C = Boolean(eval(args[4])) || null;
            var selfSwitches_D = Boolean(eval(args[5])) || null;
            $gameMap.copyEventRightPlayer(mapId, eventId, [selfSwitches_A, selfSwitches_B, selfSwitches_C, selfSwitches_D]);
        }
        if (typeof command === 'string' && command.toLowerCase() === 'copyeventregion') {
            var mapId = parseInt(args[0]) || 0;
            var eventId = parseInt(args[1]) || 0;
            var regionId = parseInt(args[2]) || -1;
            var quantity = parseInt(args[3]) || 0;
            var selfSwitches_A = Boolean(eval(args[4])) || null;
            var selfSwitches_B = Boolean(eval(args[5])) || null;
            var selfSwitches_C = Boolean(eval(args[6])) || null;
            var selfSwitches_D = Boolean(eval(args[7])) || null;
            $gameMap.copyEventRegion(mapId, eventId, regionId, quantity, [selfSwitches_A, selfSwitches_B, selfSwitches_C, selfSwitches_D]);
        }
        if (typeof command === 'string' && command.toLowerCase() === 'copyeventname') {
            var eventName = String(args[0]) || '';
            var mapId = parseInt(args[1]) || 0;
            var tileX, tileY, quantity;
            if (!isNaN(args[2])) {
                tileX = parseInt(args[2]) || 0;
                tileY = parseInt(args[3]) || 0;
            } else {
                tileX = String(args[2]).toLowerCase();
                tileY = parseInt(args[3]) || 0;
                quantity = parseInt(args[4]) || 0;
            }
            var selfSwitches_A = Boolean(eval(args[5])) || null;
            var selfSwitches_B = Boolean(eval(args[6])) || null;
            var selfSwitches_C = Boolean(eval(args[7])) || null;
            var selfSwitches_D = Boolean(eval(args[8])) || null;
            $gameMap.copyEventName(eventName, mapId, tileX, tileY, quantity, [selfSwitches_A, selfSwitches_B, selfSwitches_C, selfSwitches_D]);
        }
    };
    //================================================================================
    // Game_Map
    //================================================================================
    // Copia o evento para a posição x e y
    Game_Map.prototype.copyEvent = function (mapId, eventId, mapX, mapY, selfSwitches) {
        this._interpreter.pluginCommand('copyevent', [`${mapId}`, `${eventId}`, `${mapX}`, `${mapY}`,
        `${selfSwitches[0]}`, `${selfSwitches[1]}`, `${selfSwitches[2]}`, `${selfSwitches[3]}`]);
    };

    // Copia o evento para a frente do jogador
    Game_Map.prototype.copyEventFrontPlayer = function (mapId, eventId, selfSwitches) {
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
        this._interpreter.pluginCommand('copyevent', [`${mapId}`, `${eventId}`, `${mapX}`, `${mapY}`,
        `${selfSwitches[0]}`, `${selfSwitches[1]}`, `${selfSwitches[2]}`, `${selfSwitches[3]}`]);
    };

    // Copia o evento para trás do jogador
    Game_Map.prototype.copyEventBackPlayer = function (mapId, eventId, selfSwitches) {
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
        this._interpreter.pluginCommand('copyevent', [`${mapId}`, `${eventId}`, `${mapX}`, `${mapY}`,
        `${selfSwitches[0]}`, `${selfSwitches[1]}`, `${selfSwitches[2]}`, `${selfSwitches[3]}`]);
    };

    // Copia o evento para a esquerda do jogador
    Game_Map.prototype.copyEventLeftPlayer = function (mapId, eventId, selfSwitches) {
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
        this._interpreter.pluginCommand('copyevent', [`${mapId}`, `${eventId}`, `${mapX}`, `${mapY}`,
        `${selfSwitches[0]}`, `${selfSwitches[1]}`, `${selfSwitches[2]}`, `${selfSwitches[3]}`]);
    };

    // Copia o evento para a direita do jogador
    Game_Map.prototype.copyEventRightPlayer = function (mapId, eventId, selfSwitches) {
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
        this._interpreter.pluginCommand('copyevent', [`${mapId}`, `${eventId}`, `${mapX}`, `${mapY}`,
        `${selfSwitches[0]}`, `${selfSwitches[1]}`, `${selfSwitches[2]}`, `${selfSwitches[3]}`]);
    };

    // Copia o evento aleatoriamente para a região
    Game_Map.prototype.copyEventRegion = function (mapId, eventId, regionId, quantity, selfSwitches) {
        var regionXy = (function () {
            var value = [];
            var x = 0;
            var y = 0;
            var process = $dataMap.width + $dataMap.height;
            while (process > 0) {
                if ($gameMap.regionId(x, y) === regionId) {
                    value.push([x, y]);
                }
                if (x < $dataMap.width) {
                    x++;
                } else {
                    x = 0;
                    y++;
                    process--;
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
        var randomMapXy = undefined;
        if (!quantity) {
            quantity = this.width() * 2 + this.height() * 2;
            quantity += regionXy.length * 2;
            randomMapXy = 0;
        }
        while (quantity > 0) {
            var mapXy = (function () {
                if (randomMapXy === undefined)
                    return regionXy[Math.randomInt(regionXy.length - 1)];
                else
                    return regionXy[randomMapXy++];
            })();
            if (mapXy && regionEventXyIsValid(mapXy[0], mapXy[1])) {
                if ($gameMap.eventsXy(mapXy[0], mapXy[1]).length <= 0) {
                    regionEventXy.push([mapXy[0], mapXy[1]]);
                    this._interpreter.pluginCommand('copyevent', [`${mapId}`, `${eventId}`, `${mapXy[0]}`, `${mapXy[1]}`,
                    `${selfSwitches[0]}`, `${selfSwitches[1]}`, `${selfSwitches[2]}`, `${selfSwitches[3]}`]);
                } else {
                    regionEventXy.push([-1, -1]);
                }
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

    // Copia o evento para o mapa pelo nome do evento
    Game_Map.prototype.copyEventName = function (eventName, mapId, tileX, tileY, quantity, selfSwitches) {
        var src = 'Map%1.json'.format(mapId.padZero(3));
        DataManager.drXama_loadDataFile(src, (mapInfo) => {
            let events = mapInfo.events;
            events.map(event => {
                if (event)
                    if (event.name.replace(/\s{1,}/g, '') === eventName)
                        if (tileX === 'frontplayer')
                            this._interpreter.pluginCommand('copyeventfrontplayer', [`${mapId}`, `${event.id}`,
                            `${selfSwitches[0]}`, `${selfSwitches[1]}`, `${selfSwitches[2]}`, `${selfSwitches[3]}`]);
                        else if (tileX === 'backplayer')
                            this._interpreter.pluginCommand('copyeventbackplayer', [`${mapId}`, `${event.id}`,
                            `${selfSwitches[0]}`, `${selfSwitches[1]}`, `${selfSwitches[2]}`, `${selfSwitches[3]}`]);
                        else if (tileX === 'leftplayer')
                            this._interpreter.pluginCommand('copyeventleftplayer', [`${mapId}`, `${event.id}`,
                            `${selfSwitches[0]}`, `${selfSwitches[1]}`, `${selfSwitches[2]}`, `${selfSwitches[3]}`]);
                        else if (tileX === 'rightplayer')
                            this._interpreter.pluginCommand('copyeventrightplayer', [`${mapId}`, `${event.id}`,
                            `${selfSwitches[0]}`, `${selfSwitches[1]}`, `${selfSwitches[2]}`, `${selfSwitches[3]}`]);
                        else if (tileX === 'region')
                            this._interpreter.pluginCommand('copyeventregion', [`${mapId}`, `${event.id}`, `${tileY}`, `${quantity}`,
                            `${selfSwitches[0]}`, `${selfSwitches[1]}`, `${selfSwitches[2]}`, `${selfSwitches[3]}`]);
                        else
                            this._interpreter.pluginCommand('copyevent', [`${mapId}`, `${event.id}`, `${tileX}`, `${tileY}`,
                            `${selfSwitches[0]}`, `${selfSwitches[1]}`, `${selfSwitches[2]}`, `${selfSwitches[3]}`]);
            });
        });
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
        // Carrega os eventos copiados para a data do mapa
        if (!$gameMap._eventsCopy) $gameMap._eventsCopy = [];
        if ($gameMap._eventsCopy.length > 0) {
            $gameMap._eventsCopy.forEach(function (event) {
                $dataMap.events.push(event);
            });
        }
        scene_map_createDisplayObjects.call(this);
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