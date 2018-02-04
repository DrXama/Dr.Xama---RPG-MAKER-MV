//==================================================================================================
// DrXama_spriteDestination.js
//==================================================================================================
/*:
 * @plugindesc v1.00 - Alteração do sprite de destino
 *
 * @author Dr.Xamã
 * 
 * @param Tipo de sprite
 * @desc Escolha o tipo do sprite de destino
 * @type select
 * @default 1
 * @option Redondo
 * @value 1
 * @option Quadrado
 * @value 2
 * 
 * @param Cor do sprite
 * @desc Escolha a cor do sprite de destino
 * Escreva sua cor em CSS
 * @type combo
 * @default white
 * @option white
 * @option black
 * @option red
 * @option orange
 * @option blue
 * @option yellow
 * @option green
 * 
 * @param Velocidade da animação
 * @desc Qual a velocidade da animação do sprite de destino?
 * @type number
 * @default 0.75
 * @decimals 2
 * @min 0.30
 * @max 1
 * 
 * @param Tamanho do sprite de destino
 * @desc Qual o tamanho do sprite?
 * @type number
 * @default 1
 * @decimals 1
 * @min 0.1
 * @max 1
 * 
 * @help
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Possibilita a alteração do sprite de destino
 * ================================================================================
 *    Atualização
 * ================================================================================
 * Para atualizar esse plugin vá no github do Dr.Xamã
 * https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV
 */
(function () {
    "use strict";
    //-----------------------------------------------------------------------------
    // Parameters
    //
    const params = PluginManager.parameters('DrXama_spriteDestination');
    const sprite = {
        "type": Number(params['Tipo de sprite']) || 1,
        "color": String(params['Cor do sprite']).toLowerCase() || 'white',
        "velocity": Number(params['Velocidade da animação']) || 1,
        "size": Number(params['Tamanho do sprite de destino']) || 1
    };

    //-----------------------------------------------------------------------------
    // Spriteset_Map
    //    
    Spriteset_Map.prototype.createDestination = function () {
        this._destinationSprite = new Sprite_DestinationEx();
        this._destinationSprite.z = 9;
        this._tilemap.addChild(this._destinationSprite);
    };

    //-----------------------------------------------------------------------------
    // Sprite_DestinationEx
    //
    function Sprite_DestinationEx() {
        this.initialize.apply(this, arguments);
    }

    Sprite_DestinationEx.prototype = Object.create(Sprite.prototype);
    Sprite_DestinationEx.prototype.constructor = Sprite_DestinationEx;

    Sprite_DestinationEx.prototype.initialize = function () {
        Sprite.prototype.initialize.call(this);
        this.createBitmap();
        this._frameCount = 0;
    };

    Sprite_DestinationEx.prototype.update = function () {
        Sprite.prototype.update.call(this);
        if ($gameTemp.isDestinationValid()) {
            this.updatePosition();
            this.updateAnimation();
            this.visible = true;
        } else {
            this._frameCount = 0;
            this.visible = false;
        }
    };

    Sprite_DestinationEx.prototype.createBitmap = function () {
        var tileWidth = $gameMap.tileWidth();
        var tileHeight = $gameMap.tileHeight();
        var radius = tileWidth / 2;
        var x = tileWidth / 2;
        var y = tileHeight / 2;
        var color = sprite.color;
        this.bitmap = new Bitmap(tileWidth, tileHeight);
        if (sprite.type == 1) {
            this.bitmap.drawCircle(x, y, radius, color);
        } else if (sprite.type == 2) {
            this.bitmap.fillAll(color);
        }
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.blendMode = Graphics.BLEND_ADD;
    };

    Sprite_DestinationEx.prototype.updatePosition = function () {
        var tileWidth = $gameMap.tileWidth();
        var tileHeight = $gameMap.tileHeight();
        var x = $gameTemp.destinationX();
        var y = $gameTemp.destinationY();
        this.x = ($gameMap.adjustX(x) + 0.5) * tileWidth;
        this.y = ($gameMap.adjustY(y) + 0.5) * tileHeight;
    };

    Sprite_DestinationEx.prototype.updateAnimation = function () {
        this._frameCount += sprite.velocity;
        this._frameCount %= 20;
        this.opacity = (20 - this._frameCount) * 6;
        this.scale.x = sprite.size + this._frameCount / 20;
        this.scale.y = this.scale.x;
    };
})();