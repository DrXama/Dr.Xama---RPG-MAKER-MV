//==================================================================================================
// DrXama_gameJolt.js
//==================================================================================================
/*:
 * @plugindesc v1.0.0 - Integração do Game Jolt
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
 * @help
 * ================================================================================
 *    CHANGELOG
 * ================================================================================
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
    'version': function () { return console.log('v1.0.0') }
};
(function () {
    "use strict";
    //-----------------------------------------------------------------------------
    // Parametros
    //
    var params = PluginManager.parameters('DrXama_gameJolt');

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
                user.update();
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
            userToken = this.userToken();
        HTTPS.sessionsClose(username, userToken, {
            success: (data) => {
                if (data.response.success) {
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
                String(args[2]), String(args[3]), { success: () => { }, error: () => { } });
        }
        if (String(command).toLowerCase().replace(/\s{1,}/g, "") === 'gamejoltscoresaddguestpoints') {
            $gameTemp.gamejoltScoresAddGuestPoints(String(args[0]), String(args[1]),
                String(args[2]), String(args[3]), { success: () => { }, error: () => { } });
        }
        if (String(command).toLowerCase().replace(/\s{1,}/g, "") === 'gamejolttrophiesadduser') {
            $gameTemp.gamejoltTrophiesAddUser(String(args[0]), String(args[1]), { success: () => { }, error: () => { } });
        }
        if (String(command).toLowerCase().replace(/\s{1,}/g, "") === 'gamejolttrophiesremoveuser') {
            $gameTemp.gamejoltTrophiesRemoveUser(String(args[0]), String(args[1]), { success: () => { }, error: () => { } });
        }
    };
})();
