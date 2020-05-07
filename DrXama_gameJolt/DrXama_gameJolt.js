//==================================================================================================
// DrXama_gameJolt.js
//==================================================================================================

/*:pt
 * @plugindesc v2.5.4 - Integração com a API do Game Jolt
 *
 * @author Dr.Xamã
 *
 * @param DevOPS
 * @desc Opções de desenvolvedor
 * 
 * @param DevOPS Debug
 * @parent DevOPS
 * @desc Ativar depuração do sistema.
 * @text Debug
 * @type boolean
 * @on Ativar
 * @off Desativar
 * @default false
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
 * @param Save Cloud
 * @desc Deseja ativar o save na nuvem?
 * @type boolean
 * @on Ativar
 * @off Desativar
 * @default true
 * 
 * @param Text Save Cloud
 * @parent Save Cloud
 * @desc Texto apresentado quando o jogo está armazenando na nuvem.
 * @type string
 * @default Salvando...
 * 
 * @param Text Loading Cloud
 * @parent Save Cloud
 * @desc Texto apresentado quando o jogo está carregando os arquivos da nuvem.
 * @type string
 * @default Carregando...
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
 * @param Text AddGuestPonts
 * @desc Texto apresentado quando o convidado marca uma pontuação.
 * @type string
 * @default %1 acaba de marcar %2 pontos na tabela!
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
 * @param Text Login Page
 * @desc Textos apresentados na tela de login.
 * @type string[]
 * @default ["Nome de usuario","Game Token","Não compartilhe seu Game Token com ninguém.","Usuário já está logado.","Game Token inválido.","Entrar","Carregando..."]
 *
 * @param Text Logout Page
 * @desc Textos apresentados na tela de logout.
 * @type string[]
 * @default ["Deseja desconectar?","Carregando..."]
 *
 * @help
 * ================================================================================
 *    CHANGELOG
 * ================================================================================
 * https://drxama.com/changelog/drxama_gamejolt-2/
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Esse plugin permite a integração do Game Jolt ao seu projeto, fornecendo suporte
 * completo da API do Game Jolt aos desenvolvedores.
 * ================================================================================
 *    Documentação
 * ================================================================================
 * Arquivo em PDF da documentação v2.5.0.
 * - https://bit.ly/DrXamaGameJolt_pt-br
 * ================================================================================
 *    Comandos de plugin
 * ================================================================================
 * - GameJoltAddUser Username GameToken
 * - GameJoltLoginUser Username
 * - GameJoltLogoutUser Username
 * - GameJoltScoresAddPoints Username TableID Score ScoreLimit
 * - GameJoltScoresAddGuestPoints Guestname TableID Score ScoreLimit
 * - GameJoltTrophiesAddUser Username TrophyID
 * - GameJoltTrophiesRemoveUser Username TrophyID
 * - GameJoltOpenWindowLogin
 * - GameJoltOpenWindowLogout
 * ================================================================================
 *    Comandos de script
 * ================================================================================
 * - $gameTemp.gameJoltAddUser(username, gametoken);
 * - $gameTemp.gameJoltLoginUser(username, callback);
 * - $gameTemp.gameJoltLogoutUser(username, callback);
 * - $gameTemp.gamejoltScoresUserTable(username, tableID, callback);
 * - $gameTemp.gamejoltScoresTables(callback);
 * - $gameTemp.gamejoltScoresAddPoints(username, tableID, score, sort, callback);
 * - $gameTemp.gamejoltScoresAddGuestPoints(guestname, tableID, score, sort, callback);
 * - $gameTemp.gamejoltScoresGetRankTables(tableID, sort, callback);
 * - $gameTemp.gamejoltTrophiesUser(username, trophyId, achieved, callback);
 * - $gameTemp.gamejoltTrophiesAddUser(username, trophyId, callback);
 * - $gameTemp.gamejoltTrophiesRemoveUser(username, trophyId, callback);
 * - $gameTemp.gameJoltOpenWindowLogin();
 * - $gameTemp.gameJoltOpenWindowLogout();
 * ================================================================================
 *    Atualização
 * ================================================================================
 * Para atualizar esse plugin acesse.
 * https://raw.githubusercontent.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/master/
 * plugins/DrXama_gameJolt.js
 */

/*:
 * @plugindesc v2.5.4 - Integration with Game Jolt API
 *
 * @author Dr.Xamã
 *
 * @param DevOPS
 * @desc Developer Options
 * 
 * @param DevOPS Debug
 * @parent DevOPS
 * @desc Activate system debugging.
 * @text Debug
 * @type boolean
 * @on Ativar
 * @off Desativar
 * @default false
 * 
 * @param Game ID
 * @desc ID of your game.
 * @type string
 * @default ???
 *
 * @param Private Key
 * @desc Private key to your game.
 * @type string
 * @default ???
 * 
 * @param Save Cloud
 * @desc Do you wish to activate cloud storage for saved games?
 * @type boolean
 * @on Ativar
 * @off Desativar
 * @default true
 * 
 * @param Text Save Cloud
 * @parent Save Cloud
 * @desc Text displayed when the game is storing in the cloud.
 * @type string
 * @default Saving...
 * 
 * @param Text Loading Cloud
 * @parent Save Cloud
 * @desc Text displayed when the game is loading the files from the cloud.
 * @type string
 * @default Loading...
 *
 * @param Text Connected
 * @desc Text presented when the user is connected.
 * @type string
 * @default %1 is connected!
 *
 * @param Text Disconnected
 * @desc Text displayed when the user is disconnected.
 * @type string
 * @default %1 is offline!
 *
 * @param Text AddPonts
 * @desc Text presented when the user marks a punctuation.
 * @type string
 * @default %1 has just marked %2 table points(%3)!
 * 
 * @param Text AddGuestPonts
 * @desc Text presented when the guest marks a punctuation.
 * @type string
 * @default %1 has just marked %2 table points!
 *
 * @param Text AddTrophies
 * @desc Text presented when the user receives a trophy.
 * @type string
 * @default %1 has just received a trophy(%2)!
 *
 * @param Text RemoveTrophies
 * @desc Text presented when the user loses a trophy.
 * @type string
 * @default %1 has just lost a trophy(%2)!
 *
 * @param Text Login Page
 * @desc Texts displayed on the login screen.
 * @type string[]
 * @default ["Username","Game Token","Do not share your Game Token with anyone.","User is already logged in.","Game Token invalid.","Join","Loading..."]
 *
 * @param Text Logout Page
 * @desc Texts displayed on the logout screen.
 * @type string[]
 * @default ["Do you wish to disconnect?","Loading..."]
 *
 * @help
 * ================================================================================
 *    CHANGELOG
 * ================================================================================
 * https://drxama.com/changelog/drxama_gamejolt-2/
 * ================================================================================
 *    Introduction
 * ================================================================================
 * This plugin allows you to integrate the Game Jolt into your project, providing 
 * full Game Jolt API support to developers.
 * ================================================================================
 *    Documentation
 * ================================================================================
 * PDF file of documentation v2.5.0.
 * - https://bit.ly/DrXamaGameJolt_en-us
 * ================================================================================
 *    Plugin commands
 * ================================================================================
 * - GameJoltAddUser Username GameToken
 * - GameJoltLoginUser Username
 * - GameJoltLogoutUser Username
 * - GameJoltScoresAddPoints Username TableID Score ScoreLimit
 * - GameJoltScoresAddGuestPoints Guestname TableID Score ScoreLimit
 * - GameJoltTrophiesAddUser Username TrophyID
 * - GameJoltTrophiesRemoveUser Username TrophyID
 * - GameJoltOpenWindowLogin
 * - GameJoltOpenWindowLogout
 * ================================================================================
 *    Script commands
 * ================================================================================
 * - $gameTemp.gameJoltAddUser(username, gametoken);
 * - $gameTemp.gameJoltLoginUser(username, callback);
 * - $gameTemp.gameJoltLogoutUser(username, callback);
 * - $gameTemp.gamejoltScoresUserTable(username, tableID, callback);
 * - $gameTemp.gamejoltScoresTables(callback);
 * - $gameTemp.gamejoltScoresAddPoints(username, tableID, score, sort, callback);
 * - $gameTemp.gamejoltScoresAddGuestPoints(guestname, tableID, score, sort, callback);
 * - $gameTemp.gamejoltScoresGetRankTables(tableID, sort, callback);
 * - $gameTemp.gamejoltTrophiesUser(username, trophyId, achieved, callback);
 * - $gameTemp.gamejoltTrophiesAddUser(username, trophyId, callback);
 * - $gameTemp.gamejoltTrophiesRemoveUser(username, trophyId, callback);
 * - $gameTemp.gameJoltOpenWindowLogin();
 * - $gameTemp.gameJoltOpenWindowLogout();
 * ================================================================================
 *    Update
 * ================================================================================
 * To update this plugin access.
 * https://raw.githubusercontent.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/master/
 * plugins/DrXama_gameJolt.js
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
            return Graphics.printError('Dr.Xamã', 'Atualmente seu RPG MAKER MV não suporta o seguinte plugin: DrXama_gameJolt'), SceneManager.stop();
        return console.warn(`DrXama_gameJolt está compatível com a versão atual do seu RPG MAKER MV`);
    }
};
DX.gameJolt = DX.gameJolt || {
    'update': function () { return require('nw.gui').Shell.openExternal('https://raw.githubusercontent.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/master/plugins/DrXama_gameJolt.js'); },
    'changelog': function () { return require('nw.gui').Shell.openExternal('https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/blob/master/changelog/DrXama_gameJolt.md'); },
    'version': function () { return console.log('v2.5.0') }
};

(function () {
    "use strict";
    //-----------------------------------------------------------------------------
    // Parametros
    //
    var params = PluginManager.parameters('DrXama_gameJolt'),
        devops_debug = JSON.parse(String(params['DevOPS Debug'] || "false")),
        saveCloud = JSON.parse(String(params['Save Cloud'] || 'true')),
        textSaveCloud = String(params['Text Save Cloud']) || 'Salvando...',
        textLoadingCloud = String(params['Text Loading Cloud']) || 'Carregando...',
        textConnected = String(params['Text Connected']) || '%1 está conectado!',
        textDisconnected = String(params['Text Disconnected']) || '%1 está desconectado!',
        textAddPoints = String(params['Text AddPonts']) || '%1 acaba de marcar %2 pontos na tabela(%3)!',
        textAddGuestPoints = String(params['Text AddGuestPonts']) || '%1 acaba de marcar %2 pontos!',
        textAddTrophies = String(params['Text AddTrophies']) || '%1 acaba de receber um troféu(%2)!',
        textRemoveTrophies = String(params['Text RemoveTrophies']) || '%1 acaba de perder um troféu(%2)!',
        textLoginPage = JSON.parse(params['Text Login Page'] || []),
        textLogoutPage = JSON.parse(params['Text Logout Page'] || []);

    //-----------------------------------------------------------------------------
    // Variables
    //
    const api = {
        gameId: String(params['Game ID']) || '',
        privateKey: String(params['Private Key']) || '',
        url: 'https://api.gamejolt.com/api/game/v1_2',
        https: {
            get: (url, callback) => {
                var data = null;

                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                xhr.addEventListener('readystatechange', function () {
                    if (this.status === 200 && this.readyState === this.DONE) {
                        callback.success(JSON.parse(this.responseText));
                    }
                });

                xhr.onerror = function (e) {
                    callback.error(e);
                };

                xhr.open('GET', url);
                xhr.setRequestHeader('Access-Control-Allow-Origin', "*");
                xhr.setRequestHeader('Access-Control-Allow-Headers', "*");

                xhr.send(data);
            },
            send: (url, data, callback) => {
                var data = JSON.stringify(data);

                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                xhr.addEventListener('readystatechange', function () {
                    if (this.status === 200 && this.readyState === this.DONE) {
                        callback.success(JSON.parse(this.responseText));
                    }
                });

                xhr.onerror = function (e) {
                    callback.error(e);
                };

                xhr.open('POST', url);
                xhr.setRequestHeader('Access-Control-Allow-Origin', "*");
                xhr.setRequestHeader('Access-Control-Allow-Headers', "*");
                xhr.setRequestHeader('content-type', 'application/json');

                xhr.send(JsonEx.stringify(data));
            }
        },
        users: [],
        win: require('nw.gui').Window.get(),
        server: null,
        loginWin: null,
        logoutWin: null
    };

    //-----------------------------------------------------------------------------
    // Events
    //
    api.win.on('close', function () {
        if (api.loginWin) api.loginWin.close();
        this.hide();
        this.closeDevTools();
        Game_Jolt_User.close();
    })

    window.addEventListener('beforeunload', function () {
        api.server.close();
    }, false);

    //-----------------------------------------------------------------------------
    // Functions
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

    HTTPS.dataStoreSet = function (username, user_token, key, data, callback) {
        let url = `${api.url}/data-store/set/?game_id=${api.gameId}&username=${username}&user_token=${user_token}\
        &key=${key}&data=${data}&format=json`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.send(url, data, callback);
    };

    HTTPS.dataStoreFetch = function (username, user_token, key, callback) {
        let url = `${api.url}/data-store/?game_id=${api.gameId}&username=${username}&user_token=${user_token}\
        &key=${key}&format=json`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.get(url, callback);
    };

    HTTPS.dataStoreGetKeys = function (username, user_token, callback) {
        let url = `${api.url}/data-store/get-keys/?game_id=${api.gameId}&username=${username}&user_token=${user_token}&format=json`.replace(/\s{1,}/g, ""),
            signature = this.signature(url + api.privateKey);
        url += `&signature=${signature}`;
        return api.https.get(url, callback);
    };

    HTTPS.dataStoreRemove = function (username, user_token, key, callback) {
        let url = `${api.url}/data-store/remove/?game_id=${api.gameId}&username=${username}&user_token=${user_token}\
        &key=${key}&format=json`.replace(/\s{1,}/g, ""),
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
        bitmap.fillRect(0, 8, width + 10, 60, '#211f1f');
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
    // Sprite_GameJolt_SaveCloud
    //
    function Sprite_GameJolt_SaveCloud() {
        this.initialize.apply(this, arguments);
    }

    Sprite_GameJolt_SaveCloud.prototype = Object.create(Sprite.prototype);
    Sprite_GameJolt_SaveCloud.prototype.constructor = Sprite_GameJolt_SaveCloud;

    Sprite_GameJolt_SaveCloud.prototype.initialize = function (url, text, scene) {
        Sprite.prototype.initialize.call(this);
        this.bitmap = ImageManager.gameJoltloadFile(url);
        this.scale = new Point(.5, .5);
        this.move(5, SceneManager._screenHeight - 33);
        this._stage = 0;
        this._scene = scene;
        this._text = text;
        this.opacity = 0;
    };

    Sprite_GameJolt_SaveCloud.prototype.draw = function (text) {
        if (this._drawSprite) return;
        if (typeof text != 'string') text = '???';
        let sprite = new Sprite(),
            bitmap = new Bitmap(0, 0),
            width = bitmap.measureTextWidth(text);
        bitmap.resize(width, 60);
        bitmap.fontSize = 14;
        bitmap.drawText(text, 8, 60 / 2, width + 10, 8, 'left');
        sprite.bitmap = bitmap;
        sprite.move(32, SceneManager._screenHeight - 53);
        this._drawSprite = sprite;
        this._drawSprite.opacity = 0;
        this._scene.addChild(sprite);
    };

    Sprite_GameJolt_SaveCloud.prototype.remove = function () {
        this._hiding = true;
    };

    Sprite_GameJolt_SaveCloud.prototype.update = function () {
        if (this._activated) {
            this.draw(this._text);
            if (this._stage === 0 && this.opacity < 255) {
                this.opacity += 4;
                this._drawSprite.opacity += 4;
            } else {
                if (this._stage === 0) this._stage = 1;
            }
            if (this._stage === 1 && this.opacity > 0) {
                this.opacity -= 4;
                this._drawSprite.opacity -= 4;
            } else {
                if (this._stage === 1) this._stage = 0;
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
        this.updateGameJoltNotifySaveCloud();
    };

    Scene_Base.prototype.gameJoltAddNotify = function (url, text) {
        if (!this._gameJoltNotify) this._gameJoltNotify = [];
        let notify = new Sprite_GameJolt_Notify(url, text, this);
        this._gameJoltNotify.push(notify);
    };

    Scene_Base.prototype.gameJoltAddNotifySaveCloud = function (url, text) {
        if (this._gameJoltNotifySaveCloud) return;
        this._gameJoltNotifySaveCloud = new Sprite_GameJolt_SaveCloud(url, text, this);
    };

    Scene_Base.prototype.gameJoltRemoveNotifySaveCloud = function () {
        if (this._gameJoltNotifySaveCloud) {
            this._gameJoltNotifySaveCloud.remove();
        }
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
                            this._gameJoltNotify.splice(0, 1);
                            this._gameJoltNotifyActivated = false;
                        }
                    }
                }
        }
    };

    Scene_Base.prototype.updateGameJoltNotifySaveCloud = function () {
        if (this._gameJoltNotifySaveCloud instanceof Sprite_GameJolt_SaveCloud) {
            if (!this._gameJoltNotifySaveCloudActivated) {
                this._gameJoltNotifySaveCloudActivated = true;
                this._gameJoltNotifySaveCloud._activated = true;
                this.addChild(this._gameJoltNotifySaveCloud);
            }
            this._gameJoltNotifySaveCloud.update();
            if (this._gameJoltNotifySaveCloud._hiding) {
                if (!this._gameJoltNotifySaveCloudDelay) this._gameJoltNotifySaveCloudDelay = 60;
                if (this._gameJoltNotifySaveCloudDelay > 0) {
                    this._gameJoltNotifySaveCloudDelay -= .60;
                } else {
                    this._gameJoltNotifySaveCloud._activated = false;
                    if (this._gameJoltNotifySaveCloud.opacity > 0) {
                        this._gameJoltNotifySaveCloud.opacity -= 8;
                        this._gameJoltNotifySaveCloud._drawSprite.opacity -= 8;
                    }
                    else {
                        this.removeChild(this._gameJoltNotifySaveCloud);
                        this.removeChild(this._gameJoltNotifySaveCloud._drawSprite);
                        this._gameJoltNotifySaveCloud = null;
                        this._gameJoltNotifySaveCloudDelay = null;
                        this._gameJoltNotifySaveCloudActivated = false;
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

    Game_Jolt_User.setSessionLogged = function (username, sessionLogged) {
        api.users.map(user => {
            if (user.username() === username) user._session_logged = sessionLogged;
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
        this._session_logged = null;
        this._loggedWithWindow = null;
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

    Game_Jolt_User.prototype.sessionLogged = function () {
        return this._session_logged;
    };

    Game_Jolt_User.prototype.loggedWithWindow = function () {
        return this._loggedWithWindow;
    };

    Game_Jolt_User.prototype.enableloggedWithWindow = function () {
        this._loggedWithWindow = true;
    };

    Game_Jolt_User.prototype.disableloggedWithWindow = function () {
        this._loggedWithWindow = false;
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

    Game_Jolt_User.prototype.setUserToken = function (token) {
        this._userToken = token;
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
                    if (devops_debug) return console.error(e);
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
                    if (devops_debug) return console.error(e);
                }
            });
        }
    };

    Game_Jolt_User.prototype.login = function (callback = function () { }) {
        let username = this.username(),
            userToken = this.userToken(),
            sessionsOpen = () => {
                HTTPS.sessionsOpen(username, userToken, {
                    success: (data) => {
                        if (eval(data.response.success)) {
                            Game_Jolt_User.sessionsConnected++;
                            Game_Jolt_User.setLoginPing(username, setInterval(() => {
                                HTTPS.sessionsPing(username, userToken, {
                                    success: () => {
                                        Game_Jolt_User.setSessionLogged(username, true);
                                    },
                                    error: (e) => {
                                        if (devops_debug) return console.error(e);
                                    }
                                });
                            }, 3600));
                            Game_Jolt_User.setLoginNotify(username, true);
                            callback(true);
                        } else {
                            callback(false);
                        }
                    },
                    error: (e) => {
                        callback(false);
                        if (devops_debug) return console.error(e);
                    }
                });
            },
            sessionsClose = () => {
                HTTPS.sessionsClose(username, userToken, {
                    success: (data) => {
                        if (eval(data.response.success))
                            return sessionsOpen();
                    },
                    error: (e) => {
                        if (devops_debug) return console.error(e);
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
                        if (devops_debug) return console.error(e);
                    }
                });
                HTTPS.sessionsCheck(username, userToken, {
                    success: (data) => {
                        if (!eval(data.response.success))
                            return sessionsOpen();
                        return sessionsClose();
                    },
                    error: (e) => {
                        if (devops_debug) return console.error(e);
                    }
                });
            },
            error: (e) => {
                if (devops_debug) return console.error(e);
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
                if (eval(data.response.success)) {
                    SceneManager._scene.gameJoltAddNotify(userAvatarURL, textDisconnected.format(`${username}(${usertype})`));
                    Game_Jolt_User.sessionsConnected--;
                    Game_Jolt_User.setSessionLogged(username, false);
                    $gameMap.finishSaveCloud();
                    this.disableloggedWithWindow();
                    clearInterval(this._login_ping);
                    callback(true);
                }
            },
            error: (e) => {
                callback(false);
                if (devops_debug) return console.error(e);
            }
        });
    };

    Game_Jolt_User.prototype.scores = function (tableID) {
        let username = this.username(),
            userToken = this.userToken();
        return new Promise((resolve, reject) => {
            HTTPS.sessionsCheck(username, userToken, {
                success: (data) => {
                    if (eval(data.response.success)) {
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

    Game_Jolt_User.prototype.scoresAddPoints = function (tableID, score, sort) {
        let username = this.username(),
            userToken = this.userToken();
        return new Promise((resolve, reject) => {
            HTTPS.sessionsCheck(username, userToken, {
                success: (data) => {
                    if (eval(data.response.success)) {
                        HTTPS.scoresAddPoints(username, userToken, tableID, score, sort, {
                            success: data => {
                                return resolve(eval(data.response.success));
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
                    if (eval(data.response.success)) {
                        HTTPS.trophiesFetch(username, userToken, trophyId, achieved, {
                            success: (data) => {
                                return resolve(eval(data.response.trophies));
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
                    if (eval(data.response.success)) {
                        HTTPS.trophiesAdd(username, userToken, trophyId, {
                            success: (data) => {
                                return resolve(eval(data.response.success));
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
                    if (eval(data.response.success)) {
                        HTTPS.trophiesRemove(username, userToken, trophyId, {
                            success: (data) => {
                                return resolve(eval(data.response.success));
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

    Game_Jolt_User.prototype.dataStoreSet = function (savekey, savedata) {
        let username = this.username(),
            userToken = this.userToken();
        return new Promise((resolve, reject) => {
            HTTPS.sessionsCheck(username, userToken, {
                success: (data) => {
                    if (devops_debug) console.log('SESSION CHECK FROM STORE ITEM', username, savekey, data);
                    if (eval(data.response.success)) {
                        if (devops_debug) console.log('SEND FROM SERVER TO STORE ITEM', username, savekey);
                        HTTPS.dataStoreSet(username, userToken, savekey, savedata, {
                            success: (data) => {
                                if (devops_debug) console.log('STORE ITEM CALLBACK', username, savekey, data);
                                return resolve(eval(data.response.success));
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

    Game_Jolt_User.prototype.dataStoreFetch = function (savekey) {
        let username = this.username(),
            userToken = this.userToken();
        return new Promise((resolve, reject) => {
            HTTPS.sessionsCheck(username, userToken, {
                success: (data) => {
                    if (devops_debug) console.log('STORE CHECK CONNECTION FROM', username, savekey, data);
                    if (eval(data.response.success)) {
                        HTTPS.dataStoreFetch(username, userToken, savekey, {
                            success: (data) => {
                                if (devops_debug) console.log('STORE ITEM CHECK RESPONSE FROM', username, savekey, data);
                                return resolve(data.response.data);
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

    Game_Jolt_User.prototype.dataStoreGetKeys = function () {
        let username = this.username(),
            userToken = this.userToken();
        return new Promise((resolve, reject) => {
            HTTPS.sessionsCheck(username, userToken, {
                success: (data) => {
                    if (eval(data.response.success)) {
                        HTTPS.dataStoreGetKeys(username, userToken, {
                            success: (data) => {
                                return resolve(data.response.keys);
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

    Game_Jolt_User.prototype.dataStoreRemove = function (savekey) {
        let username = this.username(),
            userToken = this.userToken();
        return new Promise((resolve, reject) => {
            HTTPS.sessionsCheck(username, userToken, {
                success: (data) => {
                    if (eval(data.response.success)) {
                        HTTPS.dataStoreRemove(username, userToken, savekey, {
                            success: (data) => {
                                return resolve(eval(data.response.success));
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
    // Class Save Cloud
    //
    class SaveCloud {
        constructor() {
            this._tick = 0;
            this._files = [];
            this._uploadFiles = 0;
            this._save = true;
            this._load = true;
            this._users = null;
        }

        static SECOND() {
            return 5 * 60;
        }

        tick() {
            return this._tick;
        }

        resetTick() {
            this._tick = 0;
        }

        againTick() {
            this._tick += .60;
        }

        files() {
            return this._files;
        }

        file(index) {
            return this._files[index];
        }

        resetFiles() {
            this._files = [];
        }

        addFile(data) {
            this._files.push(data);
        }

        filesUpload() {
            return this._uploadFiles;
        }

        addfileToUpload() {
            this._uploadFiles++;
        }

        removefileFromUpload() {
            this._uploadFiles--;
        }

        save() {
            return this._save;
        }

        disableSave() {
            this._save = false;
        }

        enableSave() {
            this._save = true;
        }

        load() {
            return this._load;
        }

        disableLoad() {
            this._load = false;
        }

        enableLoad() {
            this._load = true;
        }

        users() {
            return this._users;
        }

        user(index) {
            return this._users[index];
        }

        defineUsers() {
            this._users = api.users.filter(user => user.sessionLogged() && user.loggedWithWindow());
        }

        update() {
            if (this.save()) {
                if (this.tick() >= SaveCloud.SECOND()) {
                    this.resetTick();
                    this.updateSave();
                } else {
                    this.againTick();
                }
            } else {
                if (this.tick() > 0) this.resetTick();
            }
        }

        updateSave() {
            if (this.save()) {
                this.defineUsers();
                if (this.users().filter(user => user instanceof Game_Jolt_User).length > 0) {
                    this.disableSave();
                    this.copyFilesSave();
                }
            }

        }

        notifySaveCloud() {
            SceneManager._scene.gameJoltAddNotifySaveCloud('https://imgur.com/9D12Mlo.png', textSaveCloud);
        }

        notifySaveCloudLoad() {
            SceneManager._scene.gameJoltAddNotifySaveCloud('https://imgur.com/FhBiEBD.png', textLoadingCloud);
        }

        clearNotifySaveCloud() {
            SceneManager._scene.gameJoltRemoveNotifySaveCloud();
        }

        finishSaveCloud() {
            this.clearNotifySaveCloud();
            this.resetFiles();
            this.enableSave();
        }

        copyFilesSave() {
            const fs = require('fs');
            if (fs.existsSync(localPath('save'))) {
                let files = fs.readdirSync(localPath('save'));
                if (files.length > 0) {
                    files.map(file => {
                        let data = fs.readFileSync(localPath(`save\\${file}`), 'utf8');
                        if (devops_debug) console.log('DATA FROM FILE', file, data);
                        if (data.length > 0)
                            return this.addFile({ value: data, key: file });
                    })
                    this.uploadFilesSave();
                } else {
                    this.finishSaveCloud();
                }
            }
        }

        uploadFilesSave() {
            if (this.files().length > 0) {
                this.notifySaveCloud();
                this.files().map((data) => {
                    this.addfileToUpload();
                    this.uploadFile(data);
                })
            } else {
                this.finishSaveCloud();
            }
        }

        uploadFile(data) {
            this.users().map(user => {
                data = this.files().filter(file => file.key === data.key)[0];
                if (devops_debug) console.log('DATA VALUE STORE', user.username(), data.key, data.value);
                $gameTemp.gamejoltDataStoreSetUser(user.username(), `save_cloud_${data.key}`, data.value, response => {
                    if (devops_debug) console.log('RESPONSE FROM KEY', user.username(), data.key, response);
                    if (response) {
                        this.removefileFromUpload();
                        if (this.filesUpload() <= 0) this.finishSaveCloud();
                    }
                });
            }, this);
        }

        clearFilesSave() {
            this.users().map(user => {
                $gameTemp.gamejoltDataStoreGetKeyUser(user.username(), keys => {
                    if (keys instanceof Array)
                        keys.map(key => {
                            $gameTemp.gamejoltDataStoreRemoveUser(user.username(), key.key, () => { });
                        })
                })
            })
        }

        createFilesSave() {
            if (this.load()) {
                this.users().map(user => {
                    $gameTemp.gamejoltDataStoreGetKeyUser(user.username(), keys => {
                        $gameMap.disableLoadSaveCloud();
                        if (keys instanceof Array) {
                            $gameMap.notifySaveCloudLoad();
                            keys.map((key) => {
                                let fs = require('fs'),
                                    fileName = key.key.replace('save_cloud_', '');
                                if ($gameMap.saveCloudFilesFetch().filter(file => file === fileName).length <= 0) {
                                    $gameMap.saveCloudFilesFetchAdd(fileName);
                                    $gameTemp.gamejoltDataStoreFetchUser(user.username(), key.key, data => {
                                        if (devops_debug) console.log(`DATA KEYS GET`, user.username(), keys)
                                        if (devops_debug) console.log(`DATA VALUE GET(${$gameMap.savecloudFilesIndex()}/${keys.length - 1})`, user.username(), key.key, data);
                                        if (devops_debug) console.log(`TYPE OF DATA VALUE GET(${$gameMap.savecloudFilesIndex()}/${keys.length - 1})`, user.username(), key.key, typeof data);
                                        if (user.sessionLogged() && user.loggedWithWindow() && data) {
                                            if (devops_debug) console.log(`WRITE DATA VALUE GET(${$gameMap.savecloudFilesIndex()}/${keys.length - 1})`, user.username(), key.key, String(data).replace(/\s{1,}/g, '+'));
                                            fs.writeFileSync(localPath(`save/${fileName}`), String(data).replace(/\s{1,}/g, '+'), 'utf8');
                                        }
                                        if ($gameMap.savecloudFilesIndex() >= keys.length - 1) {
                                            $gameMap.clearNotifySaveCloud();
                                            $gameMap.clearSaveCloud();
                                            $gameMap.enableLoadSaveCloud();
                                            $gameMap.completeLoadSaveCloud();
                                        }
                                        $gameMap.savecloudFilesIndexAdd();
                                    });
                                }
                            })
                        } else {
                            $gameMap.enableLoadSaveCloud();
                            $gameMap.completeLoadSaveCloud();
                        }
                    });
                })
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Game_Map
    //
    let _savecloud = new SaveCloud();
    let _loadSaves = false,
        _savecloudFilesFetch = [],
        _savecloudFilesIndex = 0;

    Game_Map.prototype.createNewSaveCloud = function () {
        _savecloud = new SaveCloud();
        _loadSaves = false;
        _savecloudFilesFetch = [];
        _savecloudFilesIndex = 0;
    };

    const _game_map_update_alias_ = Game_Map.prototype.update;
    Game_Map.prototype.update = function (sceneActive) {
        _game_map_update_alias_.apply(this, arguments);
        if (sceneActive && saveCloud) {
            this.updateSaveCloud();
            this.updateLoadSavesCloud();
        }
    };

    Game_Map.prototype.updateSaveCloud = function () {
        if (_loadSaves) {
            _savecloud.update();
        }
    };

    Game_Map.prototype.updateLoadSavesCloud = function () {
        if (!_loadSaves && api.users.filter(user => {
            if (user.sessionLogged() && user.loggedWithWindow()) return true;
        }).length > 0) {
            _savecloud.defineUsers();
            _savecloud.createFilesSave();
        }
    };

    Game_Map.prototype.notifySaveCloudLoad = function () {
        _savecloud.notifySaveCloudLoad();
    };

    Game_Map.prototype.clearNotifySaveCloud = function () {
        _savecloud.clearNotifySaveCloud();
    };

    Game_Map.prototype.finishSaveCloud = function () {
        _savecloud.finishSaveCloud();
    };

    Game_Map.prototype.clearSaveCloud = function () {
        _savecloud.clearFilesSave();
    };

    Game_Map.prototype.loadSaveCloud = function () {
        return _loadSaves;
    };
    Game_Map.prototype.completeLoadSaveCloud = function () {
        _loadSaves = true;
    };

    Game_Map.prototype.enableLoadSaveCloud = function () {
        _savecloud.enableLoad();
    };

    Game_Map.prototype.disableLoadSaveCloud = function () {
        _savecloud.disableLoad();
    };

    Game_Map.prototype.saveCloudFilesFetch = function () {
        return _savecloudFilesFetch;
    };

    Game_Map.prototype.saveCloudFilesFetchAdd = function (file) {
        _savecloudFilesFetch.push(file);
    };

    Game_Map.prototype.savecloudFilesIndex = function () {
        return _savecloudFilesIndex;
    };

    Game_Map.prototype.savecloudFilesIndexAdd = function () {
        _savecloudFilesIndex++;
    };

    //-----------------------------------------------------------------------------
    // Game_Temp
    //
    Game_Temp.prototype.gameJoltOpenWindowLogin = function () {
        if (api.users.filter(user => {
            if (user.loggedWithWindow()) return true;
        }).length <= 0) {
            if (!api.loginWin)
                require('nw.gui').Window.open(localPath('gamejolt/login.html'), { resizable: false }, (newWin) => {
                    api.loginWin = newWin;
                    api.loginWin.on('closed', function () {
                        api.loginWin = null;
                    })
                });
        }
    };

    Game_Temp.prototype.gameJoltOpenWindowLogout = function () {
        if (api.users.filter(user => {
            if (user.sessionLogged() && user.loggedWithWindow()) return true;
        }).length > 0) {
            if (!api.logoutWin)
                require('nw.gui').Window.open(localPath('gamejolt/logout.html'), { resizable: false }, (newWin) => {
                    api.logoutWin = newWin;
                    api.logoutWin.on('closed', function () {
                        api.logoutWin = null;
                    })
                });
        }
    };

    Game_Temp.prototype.gameJoltAddUser = function (username, userToken) {
        if (api.users.filter(user => {
            if (user.username() === String(username)) {
                user.setUserToken(userToken);
                return true;
            }
        }).length <= 0) {
            let user = new Game_Jolt_User(String(username), String(userToken));
            api.users.push(user);
            return user;
        } else {
            return true;
        }
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

    Game_Temp.prototype.gamejoltScoresAddPoints = function (username, tableID, score, sort, callback) {
        return api.users.map(user => {
            if (user.username() === String(username)) return user.scoresAddPoints(
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

    Game_Temp.prototype.gamejoltDataStoreSetUser = function (username, savekey, savedata, callback) {
        return api.users.map(user => {
            if (user.username() === String(username)) return user.dataStoreSet(String(savekey), String(savedata)).then(response => {
                return callback(response);
            }, e => {
                return callback(e);
            });
        });
    };

    Game_Temp.prototype.gamejoltDataStoreFetchUser = function (username, savekey, callback) {
        return api.users.map(user => {
            if (user.username() === String(username)) return user.dataStoreFetch(String(savekey)).then(response => {
                return callback(response);
            }, e => {
                return callback(e);
            });
        });
    };

    Game_Temp.prototype.gamejoltDataStoreGetKeyUser = function (username, callback) {
        return api.users.map(user => {
            if (user.username() === String(username)) return user.dataStoreGetKeys().then(response => {
                return callback(response);
            }, e => {
                return callback(e);
            });
        });
    };

    Game_Temp.prototype.gamejoltDataStoreRemoveUser = function (username, savekey, callback) {
        return api.users.map(user => {
            if (user.username() === String(username)) return user.dataStoreRemove(String(savekey)).then(response => {
                return callback(response);
            }, e => {
                return callback(e);
            });
        });
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
            $gameTemp.gamejoltScoresAddPoints(String(args[0]), String(args[1]),
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
                String(args[2]), String(args[3]), (success) => {
                    if (eval(success)) {
                        SceneManager._scene.gameJoltAddNotify('https://imgur.com/mSuhmYN.png', textAddGuestPoints.format(String(args[0]), String(args[2])));
                    }
                });
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
        if (String(command).toLowerCase().replace(/\s{1,}/g, "") === 'gamejoltopenwindowlogin') {
            $gameTemp.gameJoltOpenWindowLogin();
        }
        if (String(command).toLowerCase().replace(/\s{1,}/g, "") === 'gamejoltopenwindowlogout') {
            $gameTemp.gameJoltOpenWindowLogin();
        }
    };


    //-----------------------------------------------------------------------------
    // Server
    //
    (function () {
        const http = require('http');
        const port = 8080;
        const ip = 'localhost';

        api.server = http.createServer((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');

            let params = {};
            if (req.url.indexOf('?') != -1) {
                let url = req.url.slice(req.url.indexOf('?'));
                req.url = req.url.replace(url, '');

                let i = 1, l = url.length,
                    str = '',
                    __set_name__ = true,
                    __param__name__,
                    __param__value__;

                for (; i < l; i++) {
                    let letter = url[i];

                    // NOME DO PARAMETRO
                    if (__set_name__) {
                        if (letter === '=') {
                            __param__name__ = str;
                            str = '';
                            __set_name__ = false;
                        } else {
                            str += letter;
                        }
                    }

                    // VALOR DO PARAMETRO
                    if (!__set_name__) {
                        if (letter != '=' && letter != '&') str += letter;
                        if (letter === '&' || !url[i + 1]) {
                            __param__value__ = str;
                            str = '';
                            __set_name__ = true;

                            // DEFINIÇÃO DO PARAMETRO
                            params[__param__name__] = __param__value__;
                        }
                    }
                }
            }

            /**
             * CHAMADAS DA PAGINA DE LOGIN
             */
            if (req.url == '/page/login/') {
                if (api.users.filter(user => {
                    if (user.username() === params['username'] && user.sessionLogged()) return true;
                }).length <= 0) {
                    if ($gameTemp.gameJoltAddUser(params['username'], params['gametoken'])) {
                        $gameTemp.gameJoltLoginUser(params['username'], (success) => {
                            if (success) {
                                api.users.map(user => {
                                    if (user.username() === params['username']) {
                                        if ($gameMap.loadSaveCloud()) $gameMap.createNewSaveCloud();
                                        user.enableloggedWithWindow();
                                    }
                                });
                                res.end(JSON.stringify({ success: 'success' }));
                            } else {
                                res.end(JSON.stringify({ success: false }));
                            }
                        });
                    }
                } else {
                    res.end(JSON.stringify({ success: 'logged' }));
                }
            } else if (req.url == '/page/login/success/') {
                api.users.map(user => {
                    if (user.loggedWithWindow()) {
                        Game_Jolt_User.setSessionLogged(user.username(), true);
                        api.loginWin.close();
                    }
                });
            } else if (req.url == '/page/login/translate/') {
                res.end(JSON.stringify(textLoginPage));
            }
            /**
             * CHAMADAS DA PAGINA DE LOGOUT
             */
            else if (req.url == '/page/logout/') {
                api.users.map(user => {
                    if (user.loggedWithWindow()) {
                        $gameTemp.gameJoltLogoutUser(user.username(), (success) => {
                            if (success) {
                                api.logoutWin.close();
                                res.end(JSON.stringify({}));
                            }
                        });
                    }
                });
            } else if (req.url == '/page/logout/translate/') {
                res.end(JSON.stringify(textLogoutPage));
            }
            else {
                res.end(JSON.stringify({}));
            }
        })

        api.server.listen(port, ip, () => {
            if (devops_debug) {
                console.log(`Server running on http://${ip}:${port}`)
                console.log('To take down the server: Just leave the game.');
                api.win.showDevTools();
            }
        })

    })();
})();