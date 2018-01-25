//==================================================================================================
// DrXama_windowPauseSign.js
//==================================================================================================
/*:
 * @plugindesc v1.00 - Altera a seta de pause da janela de mensagens
 *
 * @author Dr.Xamã
 * 
 * @param Nome do arquivo
 * @desc Qual o nome do arquivo para a seta de pause?
 * @type string
 * @default WindowPauseSign
 * 
 * @help
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Uma forma muito rápida de alterar a seta de pause.
 * ================================================================================
 *    Comandos
 * ================================================================================
 * $gameSystem.setWindowPauseSign(x, y) - Define a seta de pause
 * - x: Posição(X) da seta na imagem
 * - y: Posição(Y) da seta na imagem
 * Exemplo: $gameSystem.setWindowPauseSign(1, 0);
 * ================================================================================
 *    Tamanho da imagem
 * ================================================================================
 * A imagem tem um tamanho de 48x48. Para aumentar a quantidade de setas é só
 * multiplicar 48 por o valor que você deseja adicionar.
 * exemplo: https://imgur.com/a/BW5oQ
 * 
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
    const params = PluginManager.parameters('DrXama_windowPauseSign');
    const fileName = params['Nome do arquivo'] || 'WindowPauseSign';

    //-----------------------------------------------------------------------------
    // Game_System
    //
    const game_system_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        game_system_initialize.call(this);
        this._windowPauseSign = [0, 0];
    };

    Game_System.prototype.setWindowPauseSign = function (x, y) {
        x = x || 0;
        y = y || 0;
        if (x > 0) x--;
        var arrowXy = [0, 0];
        while (x > 0 || y > 0) {
            if (x > 0) {
                arrowXy[0] += 25 * x;
            }
            if (y > 0) {
                arrowXy[1] += 25 * y;
            }
            x--;
            y--;
        }
        this._windowPauseSign = arrowXy;
    };

    Game_System.prototype.getWindowPauseSign = function () {
        return this._windowPauseSign;
    };

    /**
     * @method _refreshPauseSign
     * @private
     */
    Window.prototype._refreshPauseSign = function () {
        this._windowPauseSignSprite.bitmap = ImageManager.loadWindowPauseSign();
        this._windowPauseSignSprite.anchor.x = 0.5;
        this._windowPauseSignSprite.anchor.y = 1;
        this._windowPauseSignSprite.move(this._width / 2, this._height - 4);
        this._windowPauseSignSprite.setFrame(0, 0, 48, 48);
    };

    /**
     * @method _updatePauseSign
     * @private
     */
    Window.prototype._updatePauseSign = function () {
        var sprite = this._windowPauseSignSprite;
        var sx = $gameSystem.getWindowPauseSign()[0]; // 25
        var sy = $gameSystem.getWindowPauseSign()[1]; // 25
        var p = 25;
        if (!this.pause) {
            sprite.alpha = 0;
        } else if (sprite.alpha < 1) {
            sprite.alpha = Math.min(sprite.alpha + 0.1, 1);
        }
        sprite.setFrame(sx, sy, p, p);
        sprite.visible = this.isOpen();
        this._updatePauseSignAnimation();
    };

    /**
     * @method _updatePauseSignAnimation
     * @private
     */
    Window.prototype._updatePauseSignAnimation = function () {
        var sprite = this._windowPauseSignSprite;
        if (!this._windowAnimationFrames) {
            this._windowAnimationFrames = [10, 10];
        }
        if (this._windowAnimationFrames[0] > 0) {
            this._windowAnimationFrames[0] -= .60;
            sprite.y -= .25;
        } else {
            if (this._windowAnimationFrames[1] > 0) {
                this._windowAnimationFrames[1] -= .60;
                sprite.y += .25;
            } else {
                this._windowAnimationFrames = null;
            }
        }

    };

    //-----------------------------------------------------------------------------
    // ImageManager
    //
    ImageManager.loadWindowPauseSign = function (hue) {
        return this.loadBitmap('img/system/', fileName, hue, true);
    };
})();