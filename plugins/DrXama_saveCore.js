//==================================================================================================
// DrXama_saveCore.js
//==================================================================================================
/*:
 * @plugindesc v1.0.0 - Sistema para salvar dinheiro, itens, poções, membros do grupo e etc.
 *
 * @author Dr.Xamã
 * 
 * @help
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Sistema para salvar dinheiro, itens, poções, membros do grupo e etc.
 * Eficiente para armazenamento de informações.
 * ================================================================================
 *    Atualização
 * ================================================================================
 * Para atualizar esse plugin vá no Github do Dr.Xamã!
 * - https://gs-game-words.github.io/Dr.Xama---RPG-MAKER-MV/
 */
var DX = DX || {
    'site': function () { return require('nw.gui').Shell.openExternal('https://gs-game-words.github.io/Dr.Xama---RPG-MAKER-MV/'); },
    'terms': function () { return require('nw.gui').Shell.openExternal('https://gs-game-words.github.io/Dr.Xama---RPG-MAKER-MV/plugins-license.html'); },
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
            return Graphics.printError('Dr.Xamã', 'Atualmente seu RPG MAKER MV não suporta o seguinte plugin: DrXama_saveCore'), SceneManager.stop();
    }
};
DX.pluginName = DX.pluginName || {
    'update': function () { return require('nw.gui').Shell.openExternal('https://raw.githubusercontent.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/master/plugins/DrXama_saveCore.js'); },
    'changelog': function () { return require('nw.gui').Shell.openExternal('https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/blob/master/changelog/DrXama_saveCore.md'); },
    'version': function () { return console.log('v1.0.0') }
};
(function () {
    "use strict";
    //-----------------------------------------------------------------------------
    // SceneManager
    //
    const scenemanager_run = SceneManager.run;
    SceneManager.run = function (sceneClass) { scenemanager_run.apply(this, arguments); DX.compatibility(); };

    //-----------------------------------------------------------------------------
    // Parâmetros
    //
    var params = PluginManager.parameters('DrXama_saveCore');


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

    function createLocalPath(path) {
        const fs = require('fs');
        if (!fs.existsSync(localPath(path))) fs.mkdirSync(localPath(path));
    };

    function typeofIsBad(obj) {
        return typeof obj === null || typeof obj === undefined;
    };

    //-----------------------------------------------------------------------------
    // Game_Temp
    //
    const _game_temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function () {
        _game_temp_initialize.call(this);
        this._saveCore = {};
        this.recoverSaveCore();
    };

    Game_Temp.prototype.storeSaveCore = function () {
        createLocalPath('save');
        const fs = require('fs'),
            path = 'save/saveCore.drxamasave';
        fs.writeFileSync(localPath(path), LZString.compressToBase64(JsonEx.stringify(this._saveCore)), { encoding: 'utf8' });
    };

    Game_Temp.prototype.recoverSaveCore = function () {
        const fs = require('fs'),
            path = 'save/saveCore.drxamasave';
        if (fs.existsSync(localPath(path))) {
            this._saveCore = JsonEx.parse(LZString.decompressFromBase64(fs.readFileSync(localPath(path), { encoding: 'utf8' })));
        }
    };

    Game_Temp.prototype.storeGold = function (identifier, gold) {
        if (typeofIsBad(identifier) || typeofIsBad(gold)) return;
        if ($gameParty.gold() - gold < 0)
            gold = gold - (gold - $gameParty.gold());
        $gameParty.loseGold(gold);
        this._saveCore[identifier] = gold;
        this.storeSaveCore();
    };

    Game_Temp.prototype.recoverGold = function (identifier, gold) {
        if (typeofIsBad(identifier) || typeofIsBad(gold)) return;
        if (this._saveCore[identifier] - gold < 0)
            gold = gold - (gold - this._saveCore[identifier]);
        $gameParty.gainGold(gold);
        this._saveCore[identifier] -= gold;
        this.storeSaveCore();
    };

    //-----------------------------------------------------------------------------
    // Game_Interpreter
    //
    const _game_interpreter_plugincommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _game_interpreter_plugincommand.apply(this, arguments);
        command = String(command).toLocaleLowerCase();
        if (command === 'store') {
            if (String(args[0]).toLocaleLowerCase() === 'gold') {
                $gameTemp.storeGold(String(args[1]), Number(args[2]));
            }
        }
        if (command === 'recover') {
            if (String(args[0]).toLocaleLowerCase() === 'gold') {
                $gameTemp.recoverGold(String(args[1]), Number(args[2]));
            }
        }
    };

})();
// =====================================================================================================================================
//					Dr.Xamã © 2018-2019, Todos os direitos reservados.
// =====================================================================================================================================