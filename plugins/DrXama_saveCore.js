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
 *    Leia-Me!
 * ================================================================================
 * O plugin armazena de forma individual em um save exclusivo, dessa forma você
 * coleta informações em qualquer save do seu jogo, e isso deixa o jogo dinamico,
 * você pode armazenar informações de diferentes saves e usar em qualquer um deles.
 * ================================================================================
 *    Comandos de Plugin
 * ================================================================================
 * --------------------------------------------------------------------------------
 * Para armazenar o ouro na memoria.
 * --------------------------------------------------------------------------------
 * store gold identifier amount
 * 
 * - identifier : Um ID para separar a informação de forma organizada na data.
 *                Lembre-se que o sistema salva o identifier da forma como você
 *                escreveu ou seja, se você digitar: 'Inventario1' e for usar
 *                depois buscando por 'inventario1' não vai dar certo, escreva
 *                da mesma forma para funcionar.
 * 
 * - amount : A quantidade a ser armazenada. Caso a quantidade seja maior
 *            do que o jogador possui, ou seja, você coloca 50 na quantidade
 *            e o jogador tem 5, logo a formula do calculo vai fazer o 50
 *            virar 5, que é o maximo.
 * 
 * Exemplo:
 * store gold MyInventory 652
 * --------------------------------------------------------------------------------
 * Para recuperar o ouro armazenado.
 * --------------------------------------------------------------------------------
 * recover gold identifier amount loseAmount
 * 
 * - identifier : Um ID para separar a informação de forma organizada na data.
 *                Lembre-se que o sistema salva o identifier da forma como você
 *                escreveu ou seja, se você digitar: 'Inventario1' e for usar
 *                depois buscando por 'inventario1' não vai dar certo, escreva
 *                da mesma forma para funcionar.
 * 
 * - amount : A quantidade a ser recuperada. Caso a quantidade seja maior
 *            do que a armazenada, ou seja, você coloca 50 na quantidade
 *            e o valor armazenado é 5, logo a formula do calculo vai fazer o 50
 *            virar 5, que é o maximo.
 * 
 * - loseAmount : Coloque 'false' caso você não queira que o valor armazenado
 *                seja diminuido. Use 'true' para diminuir o valor armazenado.
 * --------------------------------------------------------------------------------
 * Para armazenar um item na memoria.
 * --------------------------------------------------------------------------------
 * store item identifier itemID amount
 * 
 * - identifier : Um ID para separar a informação de forma organizada na data.
 *                Lembre-se que o sistema salva o identifier da forma como você
 *                escreveu ou seja, se você digitar: 'Inventario1' e for usar
 *                depois buscando por 'inventario1' não vai dar certo, escreva
 *                da mesma forma para funcionar.
 * 
 * - itemID : ID do item, esse valor é o mesmo do banco de dados do sistema.
 * 
 * - amount : A quantidade a ser armazenada. Caso a quantidade seja maior
 *            do que o jogador possui, ou seja, você coloca 50 na quantidade
 *            e o jogador tem 5, logo a formula do calculo vai fazer o 50
 *            virar 5, que é o maximo.
 * 
 * Exemplo:
 * store item MyInventory 1 2 false
 * --------------------------------------------------------------------------------
 * Para recuperar o item armazenado.
 * --------------------------------------------------------------------------------
 * recover item identifier itemId amount loseAmount
 * 
 * - identifier : Um ID para separar a informação de forma organizada na data.
 *                Lembre-se que o sistema salva o identifier da forma como você
 *                escreveu ou seja, se você digitar: 'Inventario1' e for usar
 *                depois buscando por 'inventario1' não vai dar certo, escreva
 *                da mesma forma para funcionar.
 * 
 * - itemID : ID do item, esse valor é o mesmo que você usou para armazenar-lo.
 * 
 * - amount : A quantidade a ser recuperada. Caso a quantidade seja maior
 *            do que a armazenada, ou seja, você coloca 50 na quantidade
 *            e o valor armazenado é 5, logo a formula do calculo vai fazer o 50
 *            virar 5, que é o maximo.
 * 
 * - loseAmount : Coloque 'false' caso você não queira que o valor armazenado
 *                seja diminuido. Use 'true' para diminuir o valor armazenado.
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
        return obj === null || obj === undefined;
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
        if (typeofIsBad(this._saveCore[identifier])) this._saveCore[identifier] = {};
        if ($gameParty.gold() - gold < 0) gold = gold - (gold - $gameParty.gold());
        $gameParty.loseGold(gold);
        this._saveCore[identifier].gold = gold;
        this.storeSaveCore();
    };

    Game_Temp.prototype.recoverGold = function (identifier, gold, loseGold) {
        if (typeofIsBad(identifier) || typeofIsBad(gold)) return;
        if (typeofIsBad(this._saveCore[identifier])) return;
        if (this._saveCore[identifier].gold - gold < 0)
            gold = gold - (gold - this._saveCore[identifier].gold);
        $gameParty.gainGold(gold);
        if (loseGold) this._saveCore[identifier].gold -= gold;
        this.storeSaveCore();
    };

    Game_Temp.prototype.storeItem = function (identifier, itemId, amount) {
        if (typeofIsBad(identifier) || typeofIsBad(itemId) || typeofIsBad(amount)) return;
        if (typeofIsBad(this._saveCore[identifier])) this._saveCore[identifier] = {};
        if (typeofIsBad(this._saveCore[identifier].items)) this._saveCore[identifier].items = {};
        let item = $gameParty.items().find(item => { return item.id === itemId; });
        if (typeofIsBad(item)) return;
        if ($gameParty.numItems(item) <= 0) return;
        if ($gameParty.numItems(item) - amount < 0)
            amount = amount - (amount - $gameParty.numItems(item));
        this._saveCore[identifier].items[itemId] = amount;
        $gameParty.loseItem(item, amount);
        this.storeSaveCore();
    };

    Game_Temp.prototype.recoverItem = function (identifier, itemId, amount, loseAmount) {
        if (typeofIsBad(identifier) || typeofIsBad(itemId) || typeofIsBad(amount)) return;
        if (typeofIsBad(this._saveCore[identifier]) || typeofIsBad(this._saveCore[identifier].items)) return;
        let item = $dataItems.find(item => { if (!typeofIsBad(item)) return item.id === itemId; });
        if (typeofIsBad(item)) return;
        if (typeofIsBad(this._saveCore[identifier].items[itemId])) return;
        if (this._saveCore[identifier].items[itemId] <= 0) return;
        if (this._saveCore[identifier].items[itemId] - amount < 0)
            amount = amount - (amount - this._saveCore[identifier].items[itemId]);
        if (loseAmount) this._saveCore[identifier].items[itemId] -= amount;
        $gameParty.gainItem(item, amount);
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
            if (String(args[0]).toLocaleLowerCase() === 'item') {
                $gameTemp.storeItem(String(args[1]), Number(args[2]), Number(args[3]));
            }
        }
        if (command === 'recover') {
            if (String(args[0]).toLocaleLowerCase() === 'gold') {
                $gameTemp.recoverGold(String(args[1]), Number(args[2]), Boolean(args[3]));
            }
            if (String(args[0]).toLocaleLowerCase() === 'item') {
                $gameTemp.recoverItem(String(args[1]), Number(args[2]), Number(args[3]), Boolean(args[4]));
            }
        }
    };

})();
// =====================================================================================================================================
//					Dr.Xamã © 2018-2019, Todos os direitos reservados.
// =====================================================================================================================================