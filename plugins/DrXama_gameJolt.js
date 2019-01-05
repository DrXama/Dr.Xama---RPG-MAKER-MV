//==================================================================================================
// DrXama_gameJolt.js
//==================================================================================================
/*:
 * @plugindesc v1.2.1 - Integração do Game Jolt
 *
 * @author Dr.Xamã
 * 
 * @param Game ID
 * @desc ID do seu jogo.
 * @type string
 * @default ???
 * 
 * @param Private Key
 * @desc Chave de acesso ao seu jogo.
 * @type string
 * @default ???
 * 
 * @param Text Connected
 * @desc Texto apresentado quando o usuário é conectado.
 * @type string
 * @default %1 está conectado!
 * 
 * @param Text Disconnected
 * @desc Texto apresentado quando o usuário é desconectado.
 * @type string
 * @default %1 está desconectado!
 * 
 * @param Text AddPonts
 * @desc Texto apresentado quando o usuário marca uma pontuação.
 * @type string
 * @default %1 acaba de marcar %2 pontos na tabela(%3)!
 * 
 * @param Text AddTrophies
 * @desc Texto apresentado quando o usuário recebe um troféu.
 * @type string
 * @default %1 acaba de receber um troféu(%2)!
 * 
 * @param Text RemoveTrophies
 * @desc Texto apresentado quando o usuário perde um troféu.
 * @type string
 * @default %1 acaba de perder um troféu(%2)!
 * 
 * @help
 * ================================================================================
 *    CHANGELOG
 * ================================================================================
 * v1.2.1
 * - Novo sistema de notificações.
 * - Agora a função 'update' da classe dos usuários é atualizada junto a 
 *   Scene_Base.
 * - Corrigido a falha na declaração de callbacks.
 * 
 * v1.0.0
 * - Plugin Lançado!
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Esse plugin permite a integração do Game Jolt ao seu projeto, fornecendo suporte
 * completo da API do Game Jolt aos desenvolvedores.
 * ================================================================================
 *    Documentação
 * ================================================================================
 * Leia a documentação completa para usar por completo o plugin.
 * - https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/wiki/DrXama_gameJolt
 * ================================================================================
 *    Comandos de plugin
 * ================================================================================
 * - GameJoltAddUser Username Game Token
 * - GameJoltLoginUser Username
 * - GameJoltLogoutUser Username
 * - GameJoltScoresAddPoints Username TableID Score ScoreLimit
 * - GameJoltScoresAddGuestPoints Guestname TableID Score ScoreLimit
 * - GameJoltTrophiesAddUser Username TrophyID
 * - GameJoltTrophiesRemoveUser Username TrophyID
 * ================================================================================
 *    Comandos de script
 * ================================================================================
 * - $gameTemp.gamejoltScoresUserTable(username, tableID, callback);
 * - $gameTemp.gamejoltScoresTables(callback);
 * - $gameTemp.gamejoltScoresAddPoint(username, tableID, score, sort, callback);
 * - $gameTemp.gamejoltScoresAddGuestPoints(guestname, tableID, score, sort, callback);
 * - $gameTemp.gamejoltScoresGetRankTables(tableID, sort, callback);
 * - $gameTemp.gamejoltTrophiesUser(username, trophyId, achieved, callback);
 * - $gameTemp.gamejoltTrophiesAddUser(username, trophyId, callback);
 * - $gameTemp.gamejoltTrophiesRemoveUser(username, trophyId, callback);
 * ================================================================================
 *    Atualização
 * ================================================================================
 * Para atualizar esse plugin vá no github do Dr.Xamã.
 * https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV
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
            return Graphics.printError('Dr.Xamã', 'Atualmente seu RPG MAKER MV não suporta o seguinte plugin: DrXama_gameJolt'), SceneManager.stop();
        return console.warn(`DrXama_gameJolt está compatível com a versão atual do seu RPG MAKER MV`);
    }
};
DX.gameJolt = DX.gameJolt || {
    'update': function () { return require('nw.gui').Shell.openExternal('https://raw.githubusercontent.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/master/plugins/DrXama_gameJolt.js'); },
    'changelog': function () { return require('nw.gui').Shell.openExternal('https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/blob/master/changelog/DrXama_gameJolt.md'); },
    'version': function () { return console.log('v1.2.1') }
};
(function () {
    "use strict";
    //-----------------------------------------------------------------------------
    // Parametros
    //
    var params = PluginManager.parameters('DrXama_gameJolt'),
        textConnected = String(params['Text Connected']) || '%1 está conectado!',
        textDisconnected = String(params['Text Disconnected']) || '%1 está desconectado!',
        textAddPoints = String(params['Text AddPonts']) || '%1 acaba de marcar %2 pontos na tabela(%3)!',
        textAddTrophies = String(params['Text AddTrophies']) || '%1 acaba de receber um troféu(%2)!',
        textRemoveTrophies = String(params['Text RemoveTrophies']) || '%1 acaba de perder um troféu(%2)!';

    //-----------------------------------------------------------------------------
    // Variables
    //
    const api = {
        gameId: String(params['Game ID']) || '',
        privateKey: String(params['Private Key']) || '',
        url: 'https://api.gamejolt.com/api/game/v1_2',
        https: {
            get: (url, callback) => {
                require('https').get(url, (res) => {
                    if (res.statusCode === 400)
                        return callback.error('Error 400');
                    res.on('data', (data) => {
                        callback.success(JSON.parse(data));
                    });
                }).on('error', (e) => {
                    callback.error(e);
                });
            }
        },
        users: [],
        win: require('nw.gui').Window.get()
    };


    //-----------------------------------------------------------------------------
    // Events
    //
    api.win.on('close', function () {
        this.hide();
        this.closeDevTools();
        Game_Jolt_User.close();
    });

    //-----------------------------------------------------------------------------
    // HTTPS
    //
    function HTTPS() {
        throw new Error('This is a static class');
    }

    HTTPS.signature = function (data) {
        let crypto = require('crypto');
        return crypto.createHash('md5').update(data).digest('hex');
    };

    HTTPS.userAuth = function (username, user_token, callback) {
        let url = `${api.url}/users/auth/?game_id=${api.gameId}&username=${username}&user_token=${user_token}`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.get(url, callback);
    };

    HTTPS.userFetch = function (username, callback) {
        let url = `${api.url}/users/?game_id=${api.gameId}&username=${username}`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.get(url, callback);
    };

    HTTPS.sessionsCheck = function (username, user_token, callback) {
        let url = `${api.url}/sessions/check/?game_id=${api.gameId}&username=${username}&user_token=${user_token}`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.get(url, callback);
    };

    HTTPS.sessionsPing = function (username, user_token, callback) {
        let url = `${api.url}/sessions/ping/?game_id=${api.gameId}&username=${username}&user_token=${user_token}&status=active`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.get(url, callback);
    };

    HTTPS.sessionsOpen = function (username, user_token, callback) {
        let url = `${api.url}/sessions/open/?game_id=${api.gameId}&username=${username}&user_token=${user_token}`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.get(url, callback);
    };

    HTTPS.sessionsClose = function (username, user_token, callback) {
        let url = `${api.url}/sessions/close/?game_id=${api.gameId}&username=${username}&user_token=${user_token}`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.get(url, callback);
    };

    HTTPS.scoresFetchTable = function (username, user_token, tableID, callback) {
        let url = `${api.url}/scores/?game_id=${api.gameId}&username=${username}&user_token=${user_token}&table_id=${tableID}`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.get(url, callback);
    };

    HTTPS.scoresFetchTables = function (callback) {
        let url = `${api.url}/scores/tables/?game_id=${api.gameId}`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.get(url, callback);
    };

    HTTPS.scoresAddPoints = function (username, user_token, tableID, score, sort, callback) {
        let url = `${api.url}/scores/add/?game_id=${api.gameId}&username=${username}&user_token=${user_token}&table_id=${tableID}\
        &score=${score}&sort=${sort}`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.get(url, callback);
    };

    HTTPS.scoresAddGuestPoints = function (guestname, tableID, score, sort, callback) {
        let url = `${api.url}/scores/add/?game_id=${api.gameId}&guest=${guestname}&table_id=${tableID}\
        &score=${score}&sort=${sort}`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.get(url, callback);
    };

    HTTPS.scoresGetRankTables = function (tableID, sort, callback) {
        let url = `${api.url}/scores/get-rank/?game_id=${api.gameId}&sort=${sort}&table_id=${tableID}`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.get(url, callback);
    };

    HTTPS.trophiesFetch = function (username, user_token, trophyId, achieved, callback) {
        if (trophyId === undefined) trophyId = '';
        if (achieved === undefined) achieved = '';
        let url = `${api.url}/trophies/?game_id=${api.gameId}&username=${username}&user_token=${user_token}\
        &trophy_id=${trophyId}&achieved=${achieved}`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.get(url, callback);
    };

    HTTPS.trophiesFetchAll = function (username, user_token, callback) {
        let url = `${api.url}/trophies/?game_id=${api.gameId}&username=${username}&user_token=${user_token}`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.get(url, callback);
    };

    HTTPS.trophiesAdd = function (username, user_token, trophyId, callback) {
        let url = `${api.url}/trophies/add-achieved/?game_id=${api.gameId}&username=${username}&user_token=${user_token}\
        &trophy_id=${trophyId}`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.get(url, callback);
    };

    HTTPS.trophiesRemove = function (username, user_token, trophyId, callback) {
        let url = `${api.url}/trophies/remove-achieved/?game_id=${api.gameId}&username=${username}&user_token=${user_token}\
        &trophy_id=${trophyId}`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.get(url, callback);
    };

    //-----------------------------------------------------------------------------
    // ImageManager
    //
    ImageManager.gameJoltloadFile = function (url, hue) {
        return this.gameJoltloadBitmap(url, hue, true);
    };

    ImageManager.gameJoltloadBitmap = function (url, hue, smooth) {
        if (url) {
            var path = encodeURIComponent(url);
            var bitmap = this.loadNormalBitmap(path, hue || 0);
            bitmap.smooth = smooth;
            return bitmap;
        } else {
            return this.loadEmptyBitmap();
        }
    };

    //-----------------------------------------------------------------------------
    // Sprite_GameJolt_Notify
    //
    function Sprite_GameJolt_Notify() {
        this.initialize.apply(this, arguments);
    }

    Sprite_GameJolt_Notify.prototype = Object.create(Sprite.prototype);
    Sprite_GameJolt_Notify.prototype.constructor = Sprite_GameJolt_Notify;

    Sprite_GameJolt_Notify.prototype.initialize = function (url, text, scene) {
        Sprite.prototype.initialize.call(this);
        this.bitmap = ImageManager.gameJoltloadFile(url);
        this.scale = new Point(1, 1);
        this.move(25, 25);
        this._frames = {
            stage1: {
                on: true,
                frames: 380
            },
            stage2: {
                on: true,
                frames: 380
            }
        };
        this._scene = scene;
        this._text = text;
        this.opacity = 0;
    };

    Sprite_GameJolt_Notify.prototype.draw = function (text) {
        if (this._drawSprite) return;
        if (typeof text != 'string') text = '???';
        let sprite = new Sprite(),
            bitmap = new Bitmap(0, 0),
            width = bitmap.measureTextWidth(text);
        bitmap.resize(width, 60);
        bitmap.fillRect(0, 0, width + 10, 8, '#2fe228');
        bitmap.fillRect(0, 8, width + 10, 50, '#211f1f');
        bitmap.fontSize = 14;
        bitmap.drawText(text, 8, 60 / 2, width + 10, 8, 'left');
        sprite.bitmap = bitmap;
        sprite.move(85, 25);
        this._drawSprite = sprite;
        this._drawSprite.opacity = 0;
        this._drawSprite.scale.x = 0;
        this._scene.addChild(sprite);
    };

    Sprite_GameJolt_Notify.prototype.remove = function () {
        this._hiding = true;
    };

    Sprite_GameJolt_Notify.prototype.update = function () {
        if (this._activated) {
            this.draw(this._text);
            if (this._frames.stage1.on) {
                if (this._frames.stage1.frames > 0) {
                    this._frames.stage1.frames -= .60;
                    if (this.opacity < 255)
                        this.opacity += 8;
                    if (this._drawSprite.opacity < 255)
                        this._drawSprite.opacity += 8;
                    if (this._drawSprite.scale.x < 1)
                        this._drawSprite.scale.x += .060;
                    if (this.opacity >= 255 && this._drawSprite.opacity >= 255 &&
                        this._drawSprite.scale.x >= 1)
                        this._frames.stage1.on = false;
                }
            } else if (this._frames.stage2.on) {
                if (this._frames.stage2.frames > 0) {
                    this._frames.stage2.frames -= .60;
                } else {
                    this._frames.stage2.on = false;
                    this.remove();
                }
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Base
    //
    const _scene_base_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function () {
        _scene_base_update.call(this);
        this.updateGameJoltUsers();
        this.updateGameJoltNotify();
    };

    Scene_Base.prototype.gameJoltAddNotify = function (url, text) {
        if (!this._gameJoltNotify) this._gameJoltNotify = [];
        let notify = new Sprite_GameJolt_Notify(url, text, this);
        this._gameJoltNotify.push(notify);
    };

    Scene_Base.prototype.updateGameJoltUsers = function () {
        if (api.users instanceof Array && api.users.length > 0) {
            api.users.map(user => { user.update(); });
        }
    };

    Scene_Base.prototype.updateGameJoltNotify = function () {
        if (this._gameJoltNotify instanceof Array && this._gameJoltNotify.length > 0) {
            if (!this._gameJoltNotifyActivated) {
                this._gameJoltNotifyActivated = true;
                this._gameJoltNotify[0]._activated = true;
                this.addChild(this._gameJoltNotify[0]);
            }
            this._gameJoltNotify[0].update();
            if (this._gameJoltNotify[0]._hiding)
                if (this._gameJoltNotify[0].opacity > 0) {
                    this._gameJoltNotify[0].opacity -= 8;
                    this._gameJoltNotify[0]._drawSprite.opacity -= 8;
                    if (this._gameJoltNotify[0]._drawSprite.scale.x > 0)
                        this._gameJoltNotify[0]._drawSprite.scale.x -= .030;
                }
                else {
                    if (this._gameJoltNotifyRefresh === undefined) {
                        this._gameJoltNotifyRefresh = 30;
                        this.removeChild(this._gameJoltNotify[0]);
                        this.removeChild(this._gameJoltNotify[0]._drawSprite);
                    } else {
                        if (this._gameJoltNotifyRefresh > 0) {
                            this._gameJoltNotifyRefresh -= .60;
                        } else {
                            this._gameJoltNotifyRefresh = undefined;
                            this._gameJoltNotifyList = false;
                            this._gameJoltNotify.splice(0, 1);
                            this._gameJoltNotifyActivated = false;
                        }
                    }
                }
        }
    };

    //-----------------------------------------------------------------------------
    // GAME JOLT - USER
    //
    function Game_Jolt_User() {
        this.initialize.apply(this, arguments);
    }

    Game_Jolt_User.sessionsConnected = 0;

    Game_Jolt_User.update = function (username, data) {
        api.users.map(user => {
            if (user.username() === username) {
                user._id = data.response.users[0].id;
                user._type = data.response.users[0].type;
                user._avatar_url = data.response.users[0].avatar_url;
                user._signed_up = data.response.users[0].signed_up;
                user._signed_up_timestamp = data.response.users[0].signed_up_timestamp;
                user._last_logged_in = data.response.users[0].last_logged_in;
                user._last_logged_in_timestamp = data.response.users[0].last_logged_in_timestamp;
                user._status = data.response.users[0].status;
                user._developer_name = data.response.users[0].developer_name;
                user._developer_website = data.response.users[0].developer_website;
                user._developer_description = data.response.users[0].developer_description;
            }
        });
    };

    Game_Jolt_User.close = function () {
        api.users.map(user => {
            user.close();
        });
        setInterval(() => {
            if (Game_Jolt_User.sessionsConnected <= 0) api.win.close(true);
        }, 60);
    };

    Game_Jolt_User.setLoginPing = function (username, loginPing) {
        api.users.map(user => {
            if (user.username() === username) user._login_ping = loginPing;
        });
    };

    Game_Jolt_User.setLoginNotify = function (username, loginNotify) {
        api.users.map(user => {
            if (user.username() === username) user._login_notify = loginNotify;
        });
    };

    Game_Jolt_User.prototype.initialize = function (username, userToken) {
        this._username = String(username) || '';
        this._userToken = String(userToken) || '';
        this._id = null;
        this._type = null;
        this._avatar_url = null;
        this._signed_up = null;
        this._signed_up_timestamp = null;
        this._last_logged_in = null;
        this._last_logged_in_timestamp = null;
        this._status = null;
        this._developer_name = null;
        this._developer_website = null;
        this._developer_description = null;
        this._login_ping = null;
        this._login_notify = null;
        this._tables = null;
        this._trophies = null;
        this._delay = {
            tables: 60,
            trophies: 60
        };
        this._tick = {
            tables: 0,
            trophies: 60
        };
    };

    Game_Jolt_User.prototype.username = function () {
        return this._username;
    };

    Game_Jolt_User.prototype.userToken = function () {
        return this._userToken;
    };

    Game_Jolt_User.prototype.id = function () {
        return this._id;
    };

    Game_Jolt_User.prototype.type = function () {
        return this._type;
    };

    Game_Jolt_User.prototype.avatarUrl = function () {
        return this._avatar_url;
    };

    Game_Jolt_User.prototype.signedUp = function () {
        return this._signed_up;
    };

    Game_Jolt_User.prototype.signedUpTimestamp = function () {
        return this._signed_up_timestamp;
    };

    Game_Jolt_User.prototype.lastLoggedIn = function () {
        return this._last_logged_in;
    };

    Game_Jolt_User.prototype.lastLoggedInTimestamp = function () {
        return this._last_logged_in_timestamp;
    };

    Game_Jolt_User.prototype.status = function () {
        return this._status;
    };

    Game_Jolt_User.prototype.developerName = function () {
        return this._developer_name;
    };

    Game_Jolt_User.prototype.developerWebsite = function () {
        return this._developer_website;
    };

    Game_Jolt_User.prototype.developerDescription = function () {
        return this._developer_description;
    };

    Game_Jolt_User.prototype.loginNotify = function () {
        return this._login_notify;
    };

    Game_Jolt_User.prototype.tables = function () {
        return this._tables;
    };

    Game_Jolt_User.prototype.trophiesData = function () {
        return this._trophies;
    };

    Game_Jolt_User.prototype.delay = function (content) {
        return this._delay[content];
    };

    Game_Jolt_User.prototype.tick = function (content) {
        return this._tick[content];
    };

    Game_Jolt_User.prototype.addTick = function (content) {
        this._tick[content]++;
    };

    Game_Jolt_User.prototype.setTick = function (content, tick) {
        this._tick[content] = tick;
    };

    Game_Jolt_User.prototype.update = function () {
        // Update Stage...
        this.updateLoginNotify();
        this.updateScoresTables();
        this.updateTrophies();
    };

    Game_Jolt_User.prototype.updateLoginNotify = function () {
        if (this.loginNotify()) {
            let username = this.username(),
                usertype = this.type(),
                userAvatarURL = this.avatarUrl();
            if (usertype && userAvatarURL) {
                SceneManager._scene.gameJoltAddNotify(userAvatarURL, textConnected.format(`${username}(${usertype})`));
                this._login_notify = false;
            }
        }
    };

    Game_Jolt_User.prototype.updateScoresTables = function () {
        if (this.tick('tables') < this.delay('tables')) {
            this.addTick('tables');
        } else {
            let username = this.username();
            HTTPS.scoresFetchTables({
                success: res => {
                    api.users.map(user => {
                        if (user.username() === username) {
                            user._tables = res.response.tables;
                            user.setTick('tables', 0);
                        }
                    });
                },
                error: e => {
                    return console.error(e);
                }
            });
        }
    };

    Game_Jolt_User.prototype.updateTrophies = function () {
        if (this.tick('trophies') < this.delay('trophies')) {
            this.addTick('trophies');
        } else {
            let username = this.username(),
                userToken = this.userToken();
            HTTPS.trophiesFetchAll(username, userToken, {
                success: res => {
                    api.users.map(user => {
                        if (user.username() === username) {
                            user._trophies = res.response.trophies;
                            user.setTick('trophies', 0);
                        }
                    });
                },
                error: e => {
                    return console.error(e);
                }
            });
        }
    };

    Game_Jolt_User.prototype.login = function (callback) {
        let username = this.username(),
            userToken = this.userToken(),
            sessionsOpen = () => {
                HTTPS.sessionsOpen(username, userToken, {
                    success: (data) => {
                        if (data.response.success) {
                            Game_Jolt_User.sessionsConnected++;
                            Game_Jolt_User.setLoginPing(username, setInterval(() => {
                                HTTPS.sessionsPing(username, userToken, {
                                    success: () => { },
                                    error: (e) => {
                                        return console.error(e);
                                    }
                                });
                            }, 3600));
                            Game_Jolt_User.setLoginNotify(username, true);
                            callback(true);
                        }
                    },
                    error: (e) => {
                        callback(false);
                        return console.error(e);
                    }
                });
            },
            sessionsClose = () => {
                HTTPS.sessionsClose(username, userToken, {
                    success: (data) => {
                        if (data.response.success)
                            return sessionsOpen();
                    },
                    error: (e) => {
                        return console.error(e);
                    }
                });
            };
        HTTPS.userAuth(username, userToken, {
            success: () => {
                HTTPS.userFetch(username, {
                    success: (data) => {
                        return Game_Jolt_User.update(username, data);
                    },
                    error: (e) => {
                        return console.error(e);
                    }
                });
                HTTPS.sessionsCheck(username, userToken, {
                    success: (data) => {
                        if (data.response.success === "false")
                            return sessionsOpen();
                        return sessionsClose();
                    },
                    error: (e) => {
                        return console.error(e);
                    }
                });
            },
            error: (e) => {
                return console.error(e);
            }
        });
    };

    Game_Jolt_User.prototype.close = function (callback) {
        let username = this.username(),
            userToken = this.userToken(),
            userAvatarURL = this._avatar_url,
            usertype = this.type();
        HTTPS.sessionsClose(username, userToken, {
            success: (data) => {
                if (data.response.success) {
                    SceneManager._scene.gameJoltAddNotify(userAvatarURL, textDisconnected.format(`${username}(${usertype})`));
                    Game_Jolt_User.sessionsConnected--;
                    clearInterval(this._login_ping);
                    callback(true);
                }
            },
            error: (e) => {
                callback(false);
                return console.error(e);
            }
        });
    };

    Game_Jolt_User.prototype.scores = function (tableID) {
        let username = this.username(),
            userToken = this.userToken();
        return new Promise((resolve, reject) => {
            HTTPS.sessionsCheck(username, userToken, {
                success: (data) => {
                    if (data.response.success === "true") {
                        HTTPS.scoresFetchTable(username, userToken, tableID, {
                            success: (data) => {
                                return resolve(data.response.scores);
                            },
                            error: (e) => {
                                return reject(e);
                            }
                        });
                    }
                },
                error: (e) => {
                    return reject(e);
                }
            });
        });
    };

    Game_Jolt_User.prototype.scoresAddPoint = function (tableID, score, sort) {
        let username = this.username(),
            userToken = this.userToken();
        return new Promise((resolve, reject) => {
            HTTPS.sessionsCheck(username, userToken, {
                success: (data) => {
                    if (data.response.success === "true") {
                        HTTPS.scoresAddPoints(username, userToken, tableID, score, sort, {
                            success: data => {
                                return resolve(data.response.success);
                            },
                            error: e => {
                                return reject(e);
                            }
                        });
                    }
                },
                error: (e) => {
                    return reject(e);
                }
            });
        });
    };

    Game_Jolt_User.prototype.trophies = function (trophyId, achieved) {
        let username = this.username(),
            userToken = this.userToken();
        return new Promise((resolve, reject) => {
            HTTPS.sessionsCheck(username, userToken, {
                success: (data) => {
                    if (data.response.success === "true") {
                        HTTPS.trophiesFetch(username, userToken, trophyId, achieved, {
                            success: (data) => {
                                return resolve(data.response.trophies);
                            },
                            error: (e) => {
                                return reject(e);
                            }
                        });
                    }
                },
                error: (e) => {
                    return reject(e);
                }
            });
        });
    };

    Game_Jolt_User.prototype.trophiesAdd = function (trophyId) {
        let username = this.username(),
            userToken = this.userToken();
        return new Promise((resolve, reject) => {
            HTTPS.sessionsCheck(username, userToken, {
                success: (data) => {
                    if (data.response.success === "true") {
                        HTTPS.trophiesAdd(username, userToken, trophyId, {
                            success: (data) => {
                                return resolve(data.response.success);
                            },
                            error: (e) => {
                                return reject(e);
                            }
                        });
                    }
                },
                error: (e) => {
                    return reject(e);
                }
            });
        });
    };

    Game_Jolt_User.prototype.trophiesRemove = function (trophyId) {
        let username = this.username(),
            userToken = this.userToken();
        return new Promise((resolve, reject) => {
            HTTPS.sessionsCheck(username, userToken, {
                success: (data) => {
                    if (data.response.success === "true") {
                        HTTPS.trophiesRemove(username, userToken, trophyId, {
                            success: (data) => {
                                return resolve(data.response.success);
                            },
                            error: (e) => {
                                return reject(e);
                            }
                        });
                    }
                },
                error: (e) => {
                    return reject(e);
                }
            });
        });
    };

    //-----------------------------------------------------------------------------
    // Game_Temp
    //
    Game_Temp.prototype.gameJoltAddUser = function (username, userToken) {
        if (api.users.filter(user => {
            if (user.username() === String(username)) return true;
        }).length <= 0) {
            let user = new Game_Jolt_User(String(username), String(userToken));
            api.users.push(user);
            return user;
        }
        return false;
    };

    Game_Temp.prototype.gameJoltLoginUser = function (username, callback) {
        api.users.map(user => {
            if (user.username() === String(username)) user.login(callback);
        });
    };

    Game_Temp.prototype.gameJoltLogoutUser = function (username, callback) {
        api.users.map(user => {
            if (user.username() === String(username)) user.close(callback);
        });
    };

    Game_Temp.prototype.gamejoltScoresUserTable = function (username, tableID, callback) {
        return api.users.map(user => {
            if (user.username() === String(username)) return user.scores(String(tableID)).then(response => {
                return callback(response);
            }, e => {
                return callback(e);
            });
        }).length > 0;
    };

    Game_Temp.prototype.gamejoltScoresTables = function (callback) {
        return HTTPS.scoresFetchTables({
            success: (data) => {
                return callback(data.response.tables);
            },
            error: (e) => {
                return callback(e);
            }
        })
    };

    Game_Temp.prototype.gamejoltScoresAddPoint = function (username, tableID, score, sort, callback) {
        return api.users.map(user => {
            if (user.username() === String(username)) return user.scoresAddPoint(
                String(tableID),
                String(score),
                String(sort)
            ).then(response => {
                return callback(response);
            }, e => {
                return callback(e);
            });
        }).length > 0;
    };

    Game_Temp.prototype.gamejoltScoresAddGuestPoints = function (guestname, tableID, score, sort, callback) {
        return HTTPS.scoresAddGuestPoints(guestname, tableID, score, sort, {
            success: (data) => {
                return callback(data.response.success);
            },
            error: (e) => {
                return callback(e);
            }
        })
    };

    Game_Temp.prototype.gamejoltScoresGetRankTables = function (tableID, sort, callback) {
        return HTTPS.scoresGetRankTables(tableID, sort, {
            success: (data) => {
                return callback(data.response.rank);
            },
            error: (e) => {
                return callback(e);
            }
        })
    };

    Game_Temp.prototype.gamejoltTrophiesUser = function (username, trophyId, achieved, callback) {
        return api.users.map(user => {
            if (user.username() === String(username)) return user.trophies(String(trophyId), String(achieved)).then(response => {
                return callback(response);
            }, e => {
                return callback(e);
            });
        }).length > 0;
    };

    Game_Temp.prototype.gamejoltTrophiesAddUser = function (username, trophyId, callback) {
        return api.users.map(user => {
            if (user.username() === String(username)) return user.trophiesAdd(String(trophyId)).then(response => {
                return callback(response);
            }, e => {
                return callback(e);
            });
        }).length > 0;
    };

    Game_Temp.prototype.gamejoltTrophiesRemoveUser = function (username, trophyId, callback) {
        return api.users.map(user => {
            if (user.username() === String(username)) return user.trophiesRemove(String(trophyId)).then(response => {
                return callback(response);
            }, e => {
                return callback(e);
            });
        }).length > 0;
    };

    //-----------------------------------------------------------------------------
    // Game_Interpreter
    //
    const _game_interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _game_interpreter_pluginCommand.apply(this, arguments);
        if (String(command).toLowerCase().replace(/\s{1,}/g, "") === 'gamejoltadduser') {
            $gameTemp.gameJoltAddUser(String(args[0]), String(args[1]));
        }
        if (String(command).toLowerCase().replace(/\s{1,}/g, "") === 'gamejoltloginuser') {
            $gameTemp.gameJoltLoginUser(String(args[0]));
        }
        if (String(command).toLowerCase().replace(/\s{1,}/g, "") === 'gamejoltlogoutuser') {
            $gameTemp.gameJoltLogoutUser(String(args[0]));
        }
        if (String(command).toLowerCase().replace(/\s{1,}/g, "") === 'gamejoltscoresaddpoints') {
            $gameTemp.gamejoltScoresAddPoint(String(args[0]), String(args[1]),
                String(args[2]), String(args[3]), response => {
                    if (response) {
                        return api.users.map(user => {
                            if (user.username() === String(args[0])) {
                                let tables = user.tables();
                                tables.map(table => {
                                    if (String(table.id) === String(args[1])) {
                                        SceneManager._scene.gameJoltAddNotify(user.avatarUrl(), textAddPoints.format(user.username(), String(args[2]), table.name));
                                    }
                                });
                            }
                        });
                    }
                });
        }
        if (String(command).toLowerCase().replace(/\s{1,}/g, "") === 'gamejoltscoresaddguestpoints') {
            $gameTemp.gamejoltScoresAddGuestPoints(String(args[0]), String(args[1]),
                String(args[2]), String(args[3]), () => { });
        }
        if (String(command).toLowerCase().replace(/\s{1,}/g, "") === 'gamejolttrophiesadduser') {
            $gameTemp.gamejoltTrophiesAddUser(String(args[0]), String(args[1]), response => {
                if (response) {
                    return api.users.map(user => {
                        if (user.username() === String(args[0])) {
                            let trophies = user.trophiesData();
                            trophies.map(trophy => {
                                if (String(trophy.id) === String(args[1])) {
                                    SceneManager._scene.gameJoltAddNotify(user.avatarUrl(), textAddTrophies.format(user.username(), trophy.title));
                                }
                            });
                        }
                    });
                }
            });
        }
        if (String(command).toLowerCase().replace(/\s{1,}/g, "") === 'gamejolttrophiesremoveuser') {
            $gameTemp.gamejoltTrophiesRemoveUser(String(args[0]), String(args[1]), response => {
                if (response) {
                    return api.users.map(user => {
                        if (user.username() === String(args[0])) {
                            let trophies = user.trophiesData();
                            trophies.map(trophy => {
                                if (String(trophy.id) === String(args[1])) {
                                    SceneManager._scene.gameJoltAddNotify(user.avatarUrl(), textRemoveTrophies.format(user.username(), trophy.title));
                                }
                            });
                        }
                    });
                }
            });
        }
    };
})();
