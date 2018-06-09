//==================================================================================================
// DrXama_inventoryManager.js
//==================================================================================================
/*:
 * @plugindesc v1.00 - Gerenciamento do inventário
 *
 * @author Dr.Xamã
 * 
 * @param maxItems Default
 * @desc Valor padrão para o maximo de itens
 * @type number
 * @max 999
 * @min 1
 * @default 99
 * 
 * @help
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Tenha um gerenciamento completo do inventario, possibilitando a limitação de
 * itens por peso. Um sistema de criação de tags para os itens, com isso você 
 * pode filtrar melhor os itens que deseja, como por exemplo, os itens favoritos.
 * ================================================================================
 *    Notas do banco de dados
 * ================================================================================
 * Esse plugin usa um sistema de tags para o banco de dados, use os seguintes
 * comandos:
 *  - <itemLimit: x> - Limita a quantidade do item no inventário.
 *  - <weaponLimit: x> - Limita a quantidade da arma no inventário.
 *  - <armorLimit: x> - Limita a quantidade da armadura no inventário.
 *  - <limitActors: x, x> - Limita os membros do grupo. Isso faz com que os
 *                          os membros não possam ver o item/arma/armadura 
 *                          ou possuir.
 * 
 * Exemplos: 
 *  - <itemLimit: 60>
 *  - <weaponLimit: 100>
 *  - <armorLimit: 350>
 *  - <limitActors: 1, 2, 3>
 * ================================================================================
 *    Atualização
 * ================================================================================
 * Para atualizar esse plugin vá no site do Dr.Xamã!
 * http://drxama.epizy.com/?page_id=299
 */
(function () {
    "use strict";
    //================================================================================
    // Parameters
    //    
    var params = PluginManager.parameters('DrXama_inventoryManager'),
        params = {
            'maxItems Default': Number(params['maxItems Default']) || 99
        }

    //================================================================================
    // Game_Item
    // 
    const __Game__Item__setObject = Game_Item.prototype.setObject;
    Game_Item.prototype.setObject = function (item) {
        __Game__Item__setObject.apply(this, arguments);
        this._itemMeta = item ? item.meta : {};
    };

    Game_Item.prototype.isUsableMeta = function (meta) {
        return typeof this._itemMeta === 'object' &&
            this._itemMeta[meta] != undefined ? true : false;
    };

    Game_Item.prototype.getUsableMeta = function (meta, type) {
        switch (String(type).toLowerCase()) {
            case 'string':
                return this.isUsableMeta(meta) ? String(this._itemMeta[meta]) : null;
            case 'number':
                return this.isUsableMeta(meta) ? Number(this._itemMeta[meta]) : null;
            case 'array':
                var value = String(this._itemMeta[meta]).toLowerCase();
                value = value.replace(/\s{1,}/g, '');
                return this.isUsableMeta(meta) ? JSON.parse("[" + value + "]") : null;
            default:
                return this.isUsableMeta(meta) ? this._itemMeta[meta] : null;
        }
    };

    //================================================================================
    // Game_Temp
    //
    const __Game__Temp__initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function () {
        __Game__Temp__initialize.call(this);
        this._actorEquipWindow = null;
    };

    Game_Temp.prototype.setActorEquipWindow = function (actor) {
        if (this._actorEquipWindow !== actor) {
            this._actorEquipWindow = actor;
        }
    };

    Game_Temp.prototype.resetActorEquipWindow = function () {
        this._actorEquipWindow = null;
    };

    Game_Temp.prototype.getActorEquipWindow = function () {
        return this._actorEquipWindow;
    };

    //================================================================================
    // Game_Party
    //
    Game_Party.prototype.maxItems = function (item) {
        var classItem = new Game_Item(item);
        var max = params['maxItems Default'];
        if (item && classItem.isItem() && classItem.isUsableMeta('itemLimit'))
            max = classItem.getUsableMeta('itemLimit', 'number') || params['maxItems Default'];
        if (item && classItem.isWeapon() && classItem.isUsableMeta('weaponLimit'))
            max = classItem.getUsableMeta('weaponLimit', 'number') || params['maxItems Default'];
        if (item && classItem.isArmor() && classItem.isUsableMeta('armorLimit'))
            max = classItem.getUsableMeta('armorLimit', 'number') || params['maxItems Default'];
        return max;
    };

    //================================================================================
    // Scene_Equip
    // 
    Scene_Equip.prototype.popScene = function () {
        $gameTemp.resetActorEquipWindow();
        SceneManager.pop();
    };

    //================================================================================
    // Window_EquipItem
    // 
    Window_EquipItem.prototype.setActor = function (actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            $gameTemp.setActorEquipWindow(this._actor);
            this.refresh();
            this.resetScroll();
        }
    };

    //================================================================================
    // Window_ItemList
    //    
    Window_ItemList.prototype.makeItemList = function () {
        this._data = $gameParty.allItems().filter(function (item) {
            var classItem = new Game_Item(item);
            if (classItem.isUsableMeta('limitActors')) {
                var limitActors = classItem.getUsableMeta('limitActors', 'array'),
                    limitActorsId = $gameParty.leader().actorId();
                for (var id in limitActors) {
                    if ($gameTemp.getActorEquipWindow())
                        limitActorsId = $gameTemp.getActorEquipWindow();
                    if (limitActorsId === limitActors[id]) {
                        return this.includes(item);
                    }
                }
            } else {
                return this.includes(item);
            }
        }, this);
        if (this.includes(null)) {
            this._data.push(null);
        }
    };

    Window_ItemList.prototype.drawItemNumber = function (item, x, y, width) {
        if (this.needsNumber()) {
            var fontSize = this.contents.fontSize;
            this.contents.fontSize = 20;
            this.drawText(`x${$gameParty.numItems(item)}`, x, y, width, 'right');
            this.contents.fontSize = fontSize;
        }
    };

    //================================================================================
    // Game_Actor
    //    
    Game_Actor.prototype.initEquips = function (equips) {
        var slots = this.equipSlots();
        var maxSlots = slots.length;
        this._equips = [];
        for (var i = 0; i < maxSlots; i++) {
            this._equips[i] = new Game_Item();
        }
        for (var j = 0; j < equips.length; j++) {
            if (j < maxSlots) {
                if (slots[j] === 1) {
                    var item = new Game_Item($dataWeapons[equips[j]]);
                } else {
                    var item = new Game_Item($dataArmors[equips[j]]);
                }
                if (item && item.isUsableMeta('limitActors')) {
                    let limitActors = item.getUsableMeta('limitActors', 'array');
                    for (let id in limitActors) {
                        if (this.actorId() === limitActors[id]) {
                            this._equips[j].setEquip(slots[j] === 1, equips[j]);
                        }
                    }
                } else {
                    this._equips[j].setEquip(slots[j] === 1, equips[j]);
                }
            }
        }
        this.releaseUnequippableItems(true);
        this.refresh();
    };
})();