//==================================================================================================
// DrXama_updateManager.js
//==================================================================================================
/*:
 * @plugindesc v1.00 - Gerenciador de atualizações
 *
 * @author Dr.Xamã
 *
 * @param Pular tela de titulo
 * @desc Deseja pular a janela de titulo?
 * @type boolean
 * @default true
 * 
 * @param Arquivo de atualizações
 * 
 * @param Nome
 * @parent Arquivo de atualizações
 * @desc Nome do arquivo de atualizações
 * - Esse nome é usado para salvar o arquivo
 * @type string
 * @default updateManager
 * 
 * @param URL
 * @parent Arquivo de atualizações
 * @desc Link para o sistema baixar o arquivo e verificar novas atualizações
 * - Recomendo o raw do github.
 * @type string
 * @default https://raw.githubusercontent.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/master/updateManager.json
 * 
 * @help
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Tenha um gerenciamento de atualizações eficiente, agora você pode atualizar seu
 * jogo quando quiser.
 * ================================================================================
 *    Atualizar/Remover os Arquivos
 * ================================================================================
 * O nome dos arquivos são configurados para minúsculo, dessa maneira qualquer
 * arquivo com o mesmo nome, pode ser encontrado pelo sistema. Cuidado com
 * arquivos com o mesmo nome, pois o sistema não difere letras maiúsculas de
 * minúsculas, resolvi deixar assim para evitar problemas onde o jogador pode
 * renomear o arquivo para evitar a Atualização/Remoção do arquivo. O sistema
 * remove qualquer espaço entre as letras do nome do arquivo por segurança.
 * 
 * Exemplo:
 *          - Texto.txt é o mesmo que texto.txt
 *          - Actor_1.png é o mesmo que actor_1.png
 *          - Town1.ogg é o mesmo que town1.ogg
 *          - T E x T O.txt é o mesmo que texto.txt
 * ================================================================================
 *    Remover Pastas
 * ================================================================================
 * A remoção de pastas deve ser feita com muito cuidado, pois a pasta vai ser
 * removida por completo e todo seu conteudo junto. Não tenho responsabilidade por
 * qualquer perda na pasta, se deletar uma pasta, tenha certeza, pois não tem como
 * recuperar os arquivos perdidos, os mesmo não iram para a lixeira, mas são 
 * destruidos, por segurança.
 * 
 * Por exemplo, se temos uma pasta chamada "Textos" todo seu conteudo e a pasta
 * serão destruidos.
 * Exemplo:
 *          - Textos
 *              - Fontes
 *                  - gameFont.ttf
 *                  - gameFont2.ttf
 *              - Fontes2
 *                  - loadFont.ttf
 *                  - loadFont2.ttf
 * ================================================================================
 *    Atualização
 * ================================================================================
 * Para atualizar esse plugin vá no github do Dr.Xamã
 * https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV
 */
(function () {
    "use strict";
    //-----------------------------------------------------------------------------
    // Parâmetros
    //
    const params = PluginManager.parameters('DrXama_updateManager');
    const updateFileName = String(params['Nome']);
    const updateFileURL = String(params['URL']);
    const jumpToSceneMap = JSON.parse(params['Pular tela de titulo']);

    //-----------------------------------------------------------------------------
    // Funções
    //

    // Verifica se a string é igual a outra string
    function stringIsString(string, string2) {
        string = string.toLowerCase().replace(/\s{1,}/g, '');
        string2 = string2.toLowerCase().replace(/\s{1,}/g, '');
        if (string.contains(string2)) {
            return true;
        }
        return false;
    };

    // Retorna o caminho local para o arquivo/pasta
    function localPath(p) {
        if (p.substring(0, 1) === '/') p = p.substring(1);
        var path = require('path');
        var base = path.dirname(process.mainModule.filename);
        return path.join(base, p);
    };

    // Verifica se o caminho local existe
    function localPathExists(p) {
        var fs = require('fs');
        var i = 0;
        var length = p.length;
        var path = false;
        var paths = [];
        var pathString = '';
        for (; i < length; i++) {
            let letter = String(p[i]);
            if (letter != '/') {
                pathString += letter;
            }
            if (letter == '/' || i == length - 1) {
                paths.push(pathString);
                var pathsJoin = paths.join("/");
                if (fs.existsSync(localPath(pathsJoin))) {
                    path = true;
                } else {
                    path = false;
                }
                pathString = '';
            }
        }
        return path;
    };

    // Deleta varias pastas/arquivos dentro de uma pasta e por fim a pasta
    function localPathRemoveEx(path) {
        if (!localPathExists(path)) return;
        var fs = require('fs');
        var folderPath = localPath(path);
        if (fs.lstatSync(folderPath).isDirectory()) {
            fs.readdirSync(folderPath).forEach(function (dirOrFile) {
                var dirOrFilePath = folderPath + "/" + dirOrFile;
                if (fs.lstatSync(dirOrFilePath).isDirectory()) {
                    var dirPath = path + "/" + dirOrFile;
                    localPathRemoveEx(dirPath);
                } else {
                    fs.unlinkSync(dirOrFilePath);
                }
            });
            try {
                fs.rmdirSync(folderPath);
            } catch (error) {
                localPathRemoveEx(path);
            }
        }
    };

    // Deleta a pasta/arquivo
    function localPathRemove(folder, file) {
        if (!localPathExists(folder)) return;
        var fs = require('fs');
        var pathFolder = localPath(folder);
        var folderFiles = fs.readdirSync(pathFolder);
        if (folderFiles.length > 0 && typeof file === 'string') {
            folderFiles.forEach(function (fileDir) {
                if (stringIsString(fileDir, file)) {
                    var fileName = file.toLowerCase().replace(/\s{1,}/g, '');
                    var oldPath = `${pathFolder}\\${fileDir}`;
                    var newPath = `${pathFolder}\\${fileName}`;
                    fs.renameSync(oldPath, newPath);
                    fs.unlinkSync(newPath);
                }
            });
        } else {
            localPathRemoveEx(folder);
        }
    };

    // Cria as pastas do sistema
    function createSystemFolders() {
        var fs = require('fs');
        var path = require('path');
        var path_folderSystem = localPath('system');
        var path_folderUpdates = localPath('system/updates');
        if (!fs.existsSync(path_folderSystem)) {
            fs.mkdirSync(path_folderSystem);
        }
        if (!fs.existsSync(path_folderUpdates)) {
            fs.mkdirSync(path_folderUpdates);
        }
    };

    // Baixa o arquivo para verificar atualizações
    function downloadUpdateFile() {
        var fs = require('fs');
        var http = null;
        var fileUrl = updateFileURL;
        var folderDest = localPath('system/updates');
        var fileDest = `${folderDest}\\${updateFileName}.json`;
        var callback = SceneManager._scene.processUpdates;
        var callbackThis = SceneManager._scene;
        if (fileUrl.substring(0, 5).match(/https/)) {
            http = require('https');
        } else {
            http = require('http');
        }
        if (fs.existsSync(folderDest)) {
            if (!fs.existsSync(fileDest)) {
                fs.writeFileSync(fileDest, '', { encoding: 'utf8' });
            }
            var file = fs.createWriteStream(fileDest);
            var request = http.get(fileUrl, function (response) {
                response.pipe(file);
                file.on('finish', function () {
                    file.close();
                    callback.call(callbackThis);
                });
            }).on('error', function (err) {
                fs.unlink(fileDest);
            });
        }
    };

    // Verifica a exclusão de arquivos/pastas
    function deleteUpdateFiles() {
        var fs = require('fs');
        var folderDest = localPath('system/updates');
        var fileDest = `${folderDest}\\${updateFileName}.json`;
        if (fs.existsSync(fileDest)) {
            var fileUpdate = (function () {
                var data = fs.readFileSync(fileDest, { encoding: 'utf8' });
                var dataParse = JSON.parse(data) || {};
                return dataParse;
            })();
            if (fileUpdate["Remover"] && fileUpdate["Remover"] instanceof Array === true) {
                if (fileUpdate["Remover"].length > 0) {
                    fileUpdate["Remover"].forEach(function (file) {
                        var pathFolder = file["pasta"];
                        var pathFile = `${file["nome"]}.${file["tipo"]}`;
                        if (localPathExists(pathFolder)) {
                            localPathRemove(pathFolder, pathFile);
                        }
                    });
                }
            }
            if (fileUpdate["Remover_Pastas"] && fileUpdate["Remover_Pastas"] instanceof Array === true) {
                if (fileUpdate["Remover_Pastas"].length > 0) {
                    fileUpdate["Remover_Pastas"].forEach(function (file) {
                        var pathFolder = file["pasta"];
                        var folderName = `${pathFolder}/${file["nome"]}`;
                        if (localPathExists(pathFolder)) {
                            localPathRemove(folderName);
                        }
                    });
                }
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Boot
    //
    const sceneBoot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        createSystemFolders();
        downloadUpdateFile();
        this.drawLoadUpdate();
    };

    Scene_Boot.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
        this.updateLoadUpdate();
    };

    Scene_Boot.prototype.drawLoadUpdate = function () {
        this._loadUpdateSprite = new Sprite();
        this._loadUpdateSprite.bitmap = ImageManager.loadSystem('Loading');
        this._loadUpdateSprite.x = Graphics.width / 2;
        this._loadUpdateSprite.y = Graphics.height / 2;
        this._loadUpdateSprite.anchor.x = 0.5;
        this._loadUpdateSprite.anchor.y = 0.5;
        this.addChild(this._loadUpdateSprite);
    };

    Scene_Boot.prototype.updateLoadUpdate = function () {
        if (this._loadUpdateSpriteHideIsOn) {
            if (this._loadUpdateSprite.opacity > 0) {
                this._loadUpdateSprite.opacity -= 4;
            }
            return;
        }
        if (this._loadUpdateSpriteFrames == undefined) {
            this._loadUpdateSpriteFrames = [30, 35];
        }
        if (this._loadUpdateSpriteFrames[0] > 0) {
            this._loadUpdateSpriteFrames[0] -= 0.60;
            if (this._loadUpdateSprite.opacity > 0) {
                this._loadUpdateSprite.opacity -= 4;
            }
        } else {
            if (this._loadUpdateSpriteFrames[1] > 0) {
                this._loadUpdateSpriteFrames[1] -= 0.60;
                if (this._loadUpdateSprite.opacity < 255) {
                    this._loadUpdateSprite.opacity += 4;
                }
            } else {
                this._loadUpdateSpriteFrames = undefined;
            }
        }
    };

    Scene_Boot.prototype.processUpdates = function () {
        deleteUpdateFiles();
    };

    Scene_Boot.prototype.updateComplete = function () {
        SoundManager.preloadImportantSounds();
        if (DataManager.isBattleTest()) {
            DataManager.setupBattleTest();
            SceneManager.goto(Scene_Battle);
        } else if (DataManager.isEventTest()) {
            DataManager.setupEventTest();
            SceneManager.goto(Scene_Map);
        } else {
            this.checkPlayerLocation();
            DataManager.setupNewGame();
            if (jumpToSceneMap) {
                SceneManager.goto(Scene_Map);
            } else {
                SceneManager.goto(Scene_Title);
            }
            Window_TitleCommand.initCommandPosition();
        }
        this.updateDocumentTitle();
    };
})();