//==================================================================================================
// DrXama_charactersShadow.js
//==================================================================================================
/*:
 * @plugindesc v1.13 - Adiciona sombras aos objetos.
 *
 * @author Dr.Xamã
 * 
 * @help
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Adição de sombras aos objetos, eventos, seguidores, personagem e etc
 * ================================================================================
 *    Comandos
 * ================================================================================
 * Comentario dos eventos: shadow_off - Desliga a sombra do evento
 * ================================================================================
 *    Atualização
 * ================================================================================
 * Para atualizar esse plugin vá no github do Dr.Xamã
 * https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV
 */
(function () {
    "use strict";
    //-----------------------------------------------------------------------------
    // Spriteset_Map
    //
    const spriteset_map_createCharacters = Spriteset_Map.prototype.createCharacters;
    Spriteset_Map.prototype.createCharacters = function () {
        spriteset_map_createCharacters.call(this);
        this.createCharactersShadows();
    };

    Spriteset_Map.prototype.createCharactersShadows = function () {
        this._charactersShadows = [];
        this._eventsShadowsLength = $gameMap.events().length;
        $gameMap.events().forEach(function (event) {
            if (event) this._charactersShadows.push(new Sprite_CharacterShadow(event));
        }, this);
        $gameMap.vehicles().forEach(function (vehicle) {
            this._charactersShadows.push(new Sprite_CharacterShadow(vehicle));
        }, this);
        $gamePlayer.followers().reverseEach(function (follower) {
            this._charactersShadows.push(new Sprite_CharacterShadow(follower));
        }, this);
        this._charactersShadows.push(new Sprite_CharacterShadow($gamePlayer));
        for (var i = 0; i < this._charactersShadows.length; i++) {
            this._tilemap.addChild(this._charactersShadows[i]);
        }
    };

    //-----------------------------------------------------------------------------
    // Game_Map
    //
    const game_map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function (sceneActive) {
        game_map_update.apply(this, arguments);
        var sceneSpriteset = SceneManager._scene._spriteset;
        var currentValue = $gameMap.events().length;
        if (sceneSpriteset._eventsShadowsLength != currentValue) {
            sceneSpriteset._eventsShadowsLength = currentValue;
            for (var i = 0; i < sceneSpriteset._charactersShadows.length; i++) {
                sceneSpriteset._tilemap.removeChild(sceneSpriteset._charactersShadows[i]);
            }
            sceneSpriteset.createCharactersShadows();
        }
    };

    //-----------------------------------------------------------------------------
    // Game_Followers
    //    
    Game_Followers.prototype.isSomeoneCollidedEx = function (followerBack, x, y) {
        return this.visibleFollowers().some(function (follower) {
            if (followerBack != follower)
                return follower.pos(x, y);
        }, this);
    };

    //-----------------------------------------------------------------------------
    // BattleManager
    //
    const __BattleManager_startBattle = BattleManager.setup;
    BattleManager.setup = function (troopId, canEscape, canLose) {
        __BattleManager_startBattle.apply(this, arguments);
        $gameTemp._inBattleProcess = true;
    };

    const __BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
    BattleManager.updateBattleEnd = function () {
        __BattleManager_updateBattleEnd.call(this);
        $gameTemp._inBattleProcess = null;
    };

    //-----------------------------------------------------------------------------
    // Game_Temp
    //
    Game_Temp.prototype.inBattleProcess = function () {
        return this._inBattleProcess;
    };

    //-----------------------------------------------------------------------------
    // Game_Player
    //       
    Game_Player.prototype.hideSpriteCharacter = function () {
        return this._hideSpriteCharacter;
    };

    //-----------------------------------------------------------------------------
    // Sprite_Character
    //
    const sprite_character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function () {
        sprite_character_update.call(this);
        this.updateOpacitySpriteCharacter();
    };

    Sprite_Character.prototype.updateOpacitySpriteCharacter = function () {
        if ($gameTemp.inBattleProcess()) {
            if (this._character instanceof Game_Player ||
                this._character instanceof Game_Follower) {
                this._character._hideSpriteCharacter = true;
                return;
            }
        }
        if (this.opacity <= 0) {
            if (!this._character._hideSpriteCharacter)
                this._character._hideSpriteCharacter = true;
        } else {
            if (this._character._hideSpriteCharacter)
                this._character._hideSpriteCharacter = false;
        }
    };

    //-----------------------------------------------------------------------------
    // Sprite_CharacterShadow
    //

    function Sprite_CharacterShadow() {
        this.initialize.apply(this, arguments);
    }

    Sprite_CharacterShadow.prototype = Object.create(Sprite_Base.prototype);
    Sprite_CharacterShadow.prototype.constructor = Sprite_CharacterShadow;

    Sprite_CharacterShadow.prototype.initialize = function (character) {
        Sprite_Base.prototype.initialize.call(this);
        this.initMembers(character);
        this.setBitmap(ImageManager.loadSystem('Shadow1'));
    };

    Sprite_CharacterShadow.prototype.initMembers = function (character) {
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this._character = character;
        this._characterHide = false;
    };

    Sprite_CharacterShadow.prototype.update = function () {
        Sprite_Base.prototype.update.call(this);
        this.updatePosition();
        this.updateTransparent();
        this.updateJumping();
        this.updateFollowers();
        this.updateEvents();
        this.updateMoving();
        this.updateVehicles();
    };

    Sprite_CharacterShadow.prototype.setBitmap = function (bitmap) {
        this.bitmap = bitmap;
    };

    Sprite_CharacterShadow.prototype.scrolledX = function () {
        return $gameMap.adjustX(this._character._realX);
    };

    Sprite_CharacterShadow.prototype.scrolledY = function () {
        return $gameMap.adjustY(this._character._realY);
    };

    Sprite_CharacterShadow.prototype.screenX = function () {
        var tw = $gameMap.tileWidth();
        return Math.round(this.scrolledX() * tw + tw / 2);
    };

    Sprite_CharacterShadow.prototype.screenY = function () {
        var th = $gameMap.tileHeight();
        return Math.round(this.scrolledY() * th + th);
    };

    Sprite_CharacterShadow.prototype.screenZ = function () {
        return 1;
    };

    Sprite_CharacterShadow.prototype.updatePosition = function () {
        this.x = this.screenX();
        this.y = this.screenY();
        this.z = this.screenZ();
    };

    Sprite_CharacterShadow.prototype.updateTransparent = function () {
        if (this._character instanceof Game_Character) {
            if (this._character.isTransparent() || this._character._hideSpriteCharacter ||
                this._character.characterName().length <= 0) {
                if (!this._characterHide) {
                    this._characterHide = true;
                    this.hide();
                }
            } else {
                if (this._characterHide) {
                    this._characterHide = false;
                    this.show();
                }
            }
        }
    };

    Sprite_CharacterShadow.prototype.updateJumping = function () {
        if (this._character instanceof Game_Character) {
            if (this._character.isJumping()) {
                if (this.scale.x > 0.5) this.scale.x -= 0.060;
                if (this.scale.y > 0.5) this.scale.y -= 0.060;
                if (this.scale.x <= 0.5 && this.scale.y <= 0.5) this.isJumping = true;
            }
            if (this.isJumping) {
                if (this.scale.x < 1) this.scale.x += 0.060;
                if (this.scale.y < 1) this.scale.y += 0.060;
                if (this.scale.x >= 1 && this.scale.y >= 1) this.isJumping = false;
            }
        }
    };

    Sprite_CharacterShadow.prototype.updateFollowers = function () {
        if (this._character instanceof Game_Follower) {
            if (!this._character.isVisible() || this._character.actor().characterName().length <= 0 ||
                this._character.characterName().length <= 0) {
                this.hide();
            } else {
                if ($gamePlayer._followers.isSomeoneCollidedEx(this._character, this._character._realX, this._character._realY)) {
                    switch ($gamePlayer._followers.visibleFollowers().length) {
                        case 2:
                            this.opacity = 155;
                            break;
                        default:
                            this.opacity = 125;
                            break;
                    }
                } else {
                    this.opacity = 255;
                }
                if (this._character.pos($gamePlayer._realX, $gamePlayer._realY) &&
                    !$gamePlayer.hideSpriteCharacter() || this._character.characterName().length <= 0) {
                    this.hide();
                } else {
                    if ($gamePlayer.isInVehicle()) {
                        this.hide();
                    } else {
                        if (!this._characterHide) {
                            this.show();
                        }
                    }
                }
            }
        }
    };

    Sprite_CharacterShadow.prototype.updateEvents = function () {
        if (this._character instanceof Game_Event) {
            if (this._character._erased || this._character._pageIndex == -1 ||
                this._character.characterName().length <= 0) {
                return this.hide();
            }
            if (this._eventHide) {
                return this.hide();
            }
            for (var i = 0; i < this._character.event().pages.length; i++) {
                var page = this._character.event().pages[i];
                var hide = false;
                page.list.forEach(function (line) {
                    if (line.code == 108 || line.code == 408) {
                        var text = line.parameters[0].toLowerCase().replace(/\s{1,}/g, '');
                        if (text === 'shadow_off') {
                            return hide = true;
                        }
                    }
                });
                break;
            }
            if (hide) {
                this._eventHide = true;
            }
        }
    };

    Sprite_CharacterShadow.prototype.updateMoving = function () {
        if (this._character instanceof Game_Character) {
            if (this._movingFrames == undefined) this._movingFrames = 5;
            if (this._movingFrames2 == undefined) this._movingFrames2 = 5;
            if (this._character.isJumping()) return;
            if (this._character.isMoving()) {
                this._isMoving = true;
                if (this._movingFrames > 0) {
                    this._movingFrames -= 0.060;
                    if (this.scale.x < 1.2) this.scale.x += 0.025;
                    else this._movingFrames = 0;
                } else {
                    if (this._movingFrames2 > 0) {
                        this._movingFrames2 -= 0.060;
                        if (this.scale.x > 1.0) this.scale.x -= 0.025;
                        else this._movingFrames2 = 0;
                    } else {
                        this._movingFrames = undefined;
                        this._movingFrames2 = undefined;
                    }
                }
            } else {
                if (this._isMoving) {
                    if (this.scale.x > 1.0) this.scale.x -= 0.025;
                    else this._isMoving = false;
                }
            }
        }
    };

    Sprite_CharacterShadow.prototype.updateVehicles = function () {
        if (this._character instanceof Game_Vehicle) {
            if (this._character._driving || this._character.isTransparent() || this._character.characterName().length <= 0 || this._character.pos($gamePlayer._realX, $gamePlayer._realY) ||
                $gamePlayer._followers.isSomeoneCollidedEx(this._character, this._character._realX, this._character._realY) || this._character.isAirship()) {
                this.hide();
            } else {
                if (!this._characterHide) {
                    this.show();
                }
            }
        }
        if (this._character instanceof Game_Player) {
            if (this._character.isInVehicle()) {
                this.hide();
            } else {
                if (!this._characterHide) {
                    this.show();
                }
            }
        }
    };
})();