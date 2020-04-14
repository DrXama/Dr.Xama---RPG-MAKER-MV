//==================================================================================================
// DrXama_updateManager.js
//==================================================================================================
/*:
 * @plugindesc v3.04 - Gerenciador de atualizações
 *
 * @author Dr.Xamã
 * 
 * @param Skip Title
 * @desc Pular ou não a tela de titulo
 * @type Boolean
 * @on Pular
 * @off Manter
 * @default false
 * 
 * @param Bitmap de Loading
 * @desc Arquivo exibido enquanto os arquivos estão sendo baixados.
 * @default Loading
 * @require 1
 * @dir img/system/
 * @type file
 * 
 * @param Arquivo de atualizações
 * @desc Url para baixar o arquivo e verificar novas atualizações
 * - Recomendo o raw do github.
 * @type string
 * @default https://raw.githubusercontent.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/master/DrXama_updateManager/updateManager.json
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
 * Para atualizar esse plugin acesse:
 * https://drxama.com.br/plugins/drxama_updatemanager/
 */
var DX = DX || {
    'site': function () { return require('nw.gui').Shell.openExternal('https://drxama.com.br/'); },
    'terms': function () { return require('nw.gui').Shell.openExternal('https://drxama.com.br/termos-de-uso/'); },
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
            return Graphics.printError('Dr.Xamã', 'Atualmente seu RPG MAKER MV não suporta o seguinte plugin: DrXama_updateManager'), SceneManager.stop();
    }
};
DX.updateManager = DX.updateManager || {
    'page': function () { return require('nw.gui').Shell.openExternal('https://drxama.com/plugins/drxama_updatemanager/'); },
    'update': function () { return require('nw.gui').Shell.openExternal('https://www.dropbox.com/s/z7ga3ezn6fynnvf/DrXama_updateManager.js?dl=0'); },
    'changelog': function () { return require('nw.gui').Shell.openExternal('https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/blob/master/changelog/DrXama_updateManager.md'); },
    'version': function () { return console.log('v3.04') }
};

(function () {
    "use strict";
    //-----------------------------------------------------------------------------
    // Parâmetros
    //
    const params = PluginManager.parameters('DrXama_updateManager'),
        skipTitle = eval(String(params['Skip Title'])),
        bitmapLoading = String(params['Bitmap de Loading']),
        updateFile = String(params['Arquivo de atualizações']),
        fs = require('fs');

    //-----------------------------------------------------------------------------
    // Variaveis Globais
    //

    /**
     * @description Verifica se a scene foi reiniciada
     */
    var scene_system_reload = null;

    /**
     * @description Salva as funções para o progresso da janela
     */
    var windowProgress = (function () {
        return {
            files: 0,
            progress: false,
            add() {
                this.files++;
            },
            remove() {
                this.files--;
            },
            update() {
                if (!this.progress) {
                    this.progress = true;
                    require('nw.gui').Window.get().setProgressBar(1.5);
                } else {
                    if (this.files <= 0) {
                        this.progress = false;
                        require('nw.gui').Window.get().setProgressBar(0);
                    }
                }
            }
        }
    })();

    /**
     * @description Salva a janela do progresso de download
     */
    var windowDownloadProgress = (function () {
        return {
            fileName: null,
            progressText: null,
            progressMax: 0,
            progress: 0,
            progressBar: 0,
            resetProgress() {
                this.fileName = null;
                this.progressText = null;
                this.progress = 0;
                this.progressBar = 0;
            },
            setTextBar(text) {
                this.progressText = text;
            },
            getTextBar() {
                return this.progressText ? this.progressText : '0 KB / 0 KB';
            },
            setTextFile(text) {
                this.fileName = text;
            },
            getTextFile() {
                return this.fileName ? this.fileName : '???';
            },
            setProgressMax(max) {
                this.progressMax = Math.floor(max);
            },
            setProgress(value) {
                if (this.progress < Math.floor(value))
                    this.progress = Math.floor(value);
            },
            setProgressBar(value) {
                value = Math.floor(value * this.progressMax / 100);
                if (this.progressBar < value)
                    this.progressBar = value;
            },
            getProgress() {
                return this.progress > this.progressMax ? this.progressMax : this.progress;
            },
            getProgressBar() {
                return this.progressBar > this.progressMax ? this.progressMax : this.progressBar;
            }
        }
    })();

    //-----------------------------------------------------------------------------
    // Scene_Boot
    //
    const _scene_title_start = Scene_Title.prototype.start;
    Scene_Title.prototype.start = function () {
        if (!roster_downloadsComplete) {
            return SceneManager.goto(Scene_Update);
        } else {
            if (skipTitle) {
                if ($dataSystem.startMapId === 0) {
                    throw new Error('Player\'s starting position is not set');
                }
                DataManager.setupNewGame();
                return SceneManager.goto(Scene_Map);
            }
            _scene_title_start.call(this);
        }
    };

    const _scene_title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function () {
        _scene_title_create.call(this);
        if (!roster_downloadsComplete || skipTitle) {
            this.fillAllBlackout();
        }
    };

    Scene_Title.prototype.fillAllBlackout = function () {
        this._backSprite1 = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        this._backSprite1.bitmap.fillAll('black');
        this.addChild(this._backSprite1);
    };

    //-----------------------------------------------------------------------------
    // Scene_Update
    //

    function Scene_Update() {
        this.initialize.apply(this, arguments);
    }

    Scene_Update.prototype = Object.create(Scene_Base.prototype);
    Scene_Update.prototype.constructor = Scene_Update;

    Scene_Update.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);
    };

    Scene_Update.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createWindowLayer();
    };

    Scene_Update.prototype.createBackground = function () {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };

    Scene_Update.prototype.start = function () {
        Scene_Base.prototype.start.call(this);
        SceneManager.clearStack();
        this.startFadeIn(this.fadeSpeed(), false);
        this.drawLoadUpdate();
        isInternetStates({
            success: () => {
                initializeSystem();
            },
            failure: () => {
                roster_downloadsComplete = true;
                completeAllDownloads();
            }
        });
    };

    Scene_Update.prototype.drawLoadUpdate = function () {
        this._loadUpdateSprite = [
            new Sprite(),
            new Sprite(),
            new Sprite(),
            new Sprite(),
            new Sprite(),
            new Sprite()
        ];
        // Sprite 1
        this._loadUpdateSprite[0].bitmap = new Bitmap(Graphics.width, Graphics.height);
        this._loadUpdateSprite[0].bitmap.fillAll('black');
        // Sprite 2
        this._loadUpdateSprite[1].bitmap = ImageManager.loadSystem(bitmapLoading);
        this._loadUpdateSprite[1].x = Graphics.width / 2;
        this._loadUpdateSprite[1].y = Graphics.height / 2;
        this._loadUpdateSprite[1].anchor.x = 0.5;
        this._loadUpdateSprite[1].anchor.y = 0.5;
        // Sprite 3
        this._loadUpdateSprite[2].bitmap = new Bitmap(Graphics.width - 20, 20);
        this._loadUpdateSprite[2].bitmap.fillAll('#d9d9d9');
        this._loadUpdateSprite[2].x = Graphics.width / 2;
        this._loadUpdateSprite[2].y = Graphics.height - 20;
        this._loadUpdateSprite[2].anchor.x = 0.5;
        this._loadUpdateSprite[2].anchor.y = 0.5;
        // Sprite 4
        this._loadUpdateSprite[3].bitmap = new Bitmap(Graphics.width - 20, 20);
        this._loadUpdateSprite[3].bitmap.fillRect(0, 0, 800, 20, '#66ff33');
        this._loadUpdateSprite[3].x = Graphics.width / 2;
        this._loadUpdateSprite[3].y = Graphics.height - 20;
        this._loadUpdateSprite[3].anchor.x = 0.5;
        this._loadUpdateSprite[3].anchor.y = 0.5;
        windowDownloadProgress.setProgressMax(800);
        // Sprite 5
        this._loadUpdateSprite[4].bitmap = new Bitmap(Graphics.width - 20, 80);
        this._loadUpdateSprite[4].bitmap.fontSize = 24;
        this._loadUpdateSprite[4].bitmap.drawText(windowDownloadProgress.getTextFile(), 0, 20, Graphics.width - 20, 0, 'center');
        this._loadUpdateSprite[4].x = Graphics.width / 2;
        this._loadUpdateSprite[4].y = Graphics.height - 50;
        this._loadUpdateSprite[4].anchor.x = 0.5;
        this._loadUpdateSprite[4].anchor.y = 0.5;
        // Sprite 6
        this._loadUpdateSprite[5].bitmap = new Bitmap(Graphics.width - 20, 80);
        this._loadUpdateSprite[5].bitmap.fontSize = 18;
        this._loadUpdateSprite[5].bitmap.drawText(windowDownloadProgress.getTextBar(), 0, 20, Graphics.width - 20, 0, 'center');
        this._loadUpdateSprite[5].x = Graphics.width / 2;
        this._loadUpdateSprite[5].y = Graphics.height - 25;
        this._loadUpdateSprite[5].anchor.x = 0.5;
        this._loadUpdateSprite[5].anchor.y = 0.5;
        this.addChild(this._loadUpdateSprite[0]);
        this.addChild(this._loadUpdateSprite[1]);
        this.addChild(this._loadUpdateSprite[2]);
        this.addChild(this._loadUpdateSprite[3]);
        this.addChild(this._loadUpdateSprite[4]);
        this.addChild(this._loadUpdateSprite[5]);
    };

    Scene_Update.prototype.drawCompleteUpdate = function () {
        if (!this._completeUpdateStatusSprite) {
            this._completeUpdateStatusSprite = [
                new Sprite(new Bitmap(Graphics.width, Graphics.height)),
                new Sprite(new Bitmap(Graphics.width - 10, Graphics.height - 170)),
                new Sprite(new Bitmap(Graphics.width - 10, Graphics.height - 170)),
                new Sprite_Button(),
                new Sprite_Button(),
                new Sprite_Button()
            ];
            this._completeUpdateStatusSprite[0].bitmap.outlineWidth = 2;
            this._completeUpdateStatusSprite[0].bitmap.fontSize = 32;
            this._completeUpdateStatusSprite[0].bitmap.drawText(roster_downloadsCompleteData['nome'], 0, 45, Graphics.width - 20, 0, 'center');
            this._completeUpdateStatusSprite[0].bitmap.fontSize = 14;
            this._completeUpdateStatusSprite[0].bitmap.drawText(roster_downloadsCompleteData['descrição'], 0, 85, Graphics.width - 20, 0, 'center');
            this._completeUpdateStatusSprite[0].bitmap.fontSize = 12;
            this._completeUpdateStatusSprite[0].bitmap.drawText(`Versão: ${roster_downloadsCompleteData['versão']}`, 0, 110, Graphics.width - 20, 0, 'center');
            this._completeUpdateStatusSprite[0].bitmap.fontSize = 32;
            this._completeUpdateStatusSprite[0].bitmap.drawText(`Mudanças: ${roster_downloadsCompleteData['mudanças'].length}`, 0, 145, Graphics.width - 20, 0, 'center');
            this._completeUpdateStatusSprite[0].opacity = 0;
            this._completeUpdateStatusSprite[1].bitmap.fontSize = 18;
            this._completeUpdateStatusSprite[1].move(5, 165);
            this._completeUpdateStatusSprite[1].opacity = 0;
            this._completeUpdateStatusSprite[2].bitmap.fontSize = 16;
            this._completeUpdateStatusSprite[2].move(5, 165);
            this._completeUpdateStatusSprite[2].opacity = 0;
            this._completeUpdateStatusSprite[3].bitmap = new Bitmap(25, 25);
            this._completeUpdateStatusSprite[3].move((Graphics.width / 2) - 45, Graphics.height - 45);
            this._completeUpdateStatusSprite[3].bitmap.drawCircle(25 / 2, 25 / 2, 10, 'white');
            this._completeUpdateStatusSprite[3].setClickHandler(RETURN_PAGE.bind(this));
            this._completeUpdateStatusSprite[3].opacity = 0;
            this._completeUpdateStatusSprite[4].bitmap = new Bitmap(25, 25);
            this._completeUpdateStatusSprite[4].move((Graphics.width / 2) + 15, Graphics.height - 45);
            this._completeUpdateStatusSprite[4].bitmap.drawCircle(25 / 2, 25 / 2, 10, 'white');
            this._completeUpdateStatusSprite[4].setClickHandler(NEXT_PAGE.bind(this));
            this._completeUpdateStatusSprite[4].opacity = 0;
            this._completeUpdateStatusSprite[5].bitmap = new Bitmap(25, 25);
            this._completeUpdateStatusSprite[5].bitmap.fontSize = 18;
            this._completeUpdateStatusSprite[5].move(Graphics.width - 40, 15);
            this._completeUpdateStatusSprite[5].bitmap.drawText(`X`, 8, 13, Graphics.width - 20, 0, 'left');
            this._completeUpdateStatusSprite[5].setClickHandler(EXIST_STATUS.bind(this));
            this._completeUpdateStatusSprite[5].opacity = 0;
            var line = 1,
                pagesData = {},
                pages = 1,
                page = 1,
                pagesLimit = 12;
            function LIST(pageset) {
                roster_downloadsCompleteData['mudanças'].map(function (text) {
                    if (pageset) {
                        if (pagesData[pageset]) {
                            pagesData[pageset].map(function (element, i) {
                                let y = 25,
                                    add = 30,
                                    text = element['text'],
                                    width = element['width'],
                                    lineheight = element['lineheight'],
                                    align = element['align'];
                                if (i > 0)
                                    y += add * i;
                                this._completeUpdateStatusSprite[1].bitmap.drawText(text, 0, y, width, lineheight, align);
                            }, this);
                        }
                    } else {
                        if (!pagesData[page])
                            pagesData[page] = [];
                        if (pagesData[page].length < pagesLimit) {
                            pagesData[page].push({
                                text: `(${line++}) ${text}`,
                                width: Graphics.width - 20,
                                lineheight: 0,
                                align: 'center'
                            });
                        }
                        else {
                            pages++;
                            page++;
                        }
                    }
                }, this);
                if (!pageset)
                    page = 1;
            }
            function RETURN_PAGE() {
                if (page > 1) {
                    page--;
                    this._completeUpdateStatusSprite[1].bitmap.clear();
                    this._completeUpdateStatusSprite[1].bitmap.fillAll('black');
                    this._completeUpdateStatusSprite[2].bitmap.clear();
                    this._completeUpdateStatusSprite[2].bitmap.drawText(`${page}/${pages}`, 0, Graphics.height - 235, Graphics.width - 20, 0, 'center');
                    LIST.call(this, page);
                }
            }
            function NEXT_PAGE() {
                if (page < pages) {
                    page++;
                    this._completeUpdateStatusSprite[1].bitmap.clear();
                    this._completeUpdateStatusSprite[1].bitmap.fillAll('black');
                    this._completeUpdateStatusSprite[2].bitmap.clear();
                    this._completeUpdateStatusSprite[2].bitmap.drawText(`${page}/${pages}`, 0, Graphics.height - 235, Graphics.width - 20, 0, 'center');
                    LIST.call(this, page);
                }
            }
            function EXIST_STATUS() {
                if (!this._updateDownloadRestoreStatus) {
                    scene_system_reload = true;
                    SceneManager.goto(Scene_Title);
                } else {
                    this._updateDownloadCompleteStatus = false;
                }
            };
            LIST.call(this);
            LIST.call(this, 1);
            this._completeUpdateStatusSprite[2].bitmap.drawText(`${page}/${pages}`, 0, Graphics.height - 235, Graphics.width - 20, 0, 'center');
            this.addChild(this._completeUpdateStatusSprite[0]);
            this.addChild(this._completeUpdateStatusSprite[1]);
            this.addChild(this._completeUpdateStatusSprite[2]);
            this.addChild(this._completeUpdateStatusSprite[3]);
            this.addChild(this._completeUpdateStatusSprite[4]);
            this.addChild(this._completeUpdateStatusSprite[5]);
        }
    };

    Scene_Update.prototype.drawRestoreUpdate = function () {
        if (!this._restoreUpdateStatusSprite) {
            this._restoreUpdateStatusSprite = [
                new Sprite(new Bitmap(Graphics.width, Graphics.height)),
                new Sprite(new Bitmap(Graphics.width - 10, Graphics.height - 170)),
                new Sprite(new Bitmap(Graphics.width - 10, Graphics.height - 170)),
                new Sprite_Button(),
                new Sprite_Button(),
                new Sprite_Button()
            ];
            this._restoreUpdateStatusSprite[0].bitmap.outlineWidth = 2;
            this._restoreUpdateStatusSprite[0].bitmap.fontSize = 32;
            this._restoreUpdateStatusSprite[0].bitmap.drawText('Arquivos Restaurados', 0, 45, Graphics.width - 20, 0, 'center');
            this._restoreUpdateStatusSprite[0].bitmap.fontSize = 14;
            this._restoreUpdateStatusSprite[0].bitmap.drawText('Alguns arquivos estavam faltando e foram baixados novamente.', 0, 85, Graphics.width - 20, 0, 'center');
            this._restoreUpdateStatusSprite[0].bitmap.fontSize = 12;
            this._restoreUpdateStatusSprite[0].bitmap.drawText(`Versão atual: ${roster_downloadsCompleteData['versão']}`, 0, 110, Graphics.width - 20, 0, 'center');
            this._restoreUpdateStatusSprite[0].bitmap.fontSize = 32;
            this._restoreUpdateStatusSprite[0].bitmap.drawText(`Arquivos: ${roster_downloadsRestore.length}`, 0, 145, Graphics.width - 20, 0, 'center');
            this._restoreUpdateStatusSprite[0].opacity = 0;
            this._restoreUpdateStatusSprite[1].bitmap.fontSize = 18;
            this._restoreUpdateStatusSprite[1].move(5, 165);
            this._restoreUpdateStatusSprite[1].opacity = 0;
            this._restoreUpdateStatusSprite[2].bitmap.fontSize = 16;
            this._restoreUpdateStatusSprite[2].move(5, 165);
            this._restoreUpdateStatusSprite[2].opacity = 0;
            this._restoreUpdateStatusSprite[3].bitmap = new Bitmap(25, 25);
            this._restoreUpdateStatusSprite[3].move((Graphics.width / 2) - 45, Graphics.height - 45);
            this._restoreUpdateStatusSprite[3].bitmap.drawCircle(25 / 2, 25 / 2, 10, 'white');
            this._restoreUpdateStatusSprite[3].setClickHandler(RETURN_PAGE.bind(this));
            this._restoreUpdateStatusSprite[3].opacity = 0;
            this._restoreUpdateStatusSprite[4].bitmap = new Bitmap(25, 25);
            this._restoreUpdateStatusSprite[4].move((Graphics.width / 2) + 15, Graphics.height - 45);
            this._restoreUpdateStatusSprite[4].bitmap.drawCircle(25 / 2, 25 / 2, 10, 'white');
            this._restoreUpdateStatusSprite[4].setClickHandler(NEXT_PAGE.bind(this));
            this._restoreUpdateStatusSprite[4].opacity = 0;
            this._restoreUpdateStatusSprite[5].bitmap = new Bitmap(25, 25);
            this._restoreUpdateStatusSprite[5].bitmap.fontSize = 18;
            this._restoreUpdateStatusSprite[5].move(Graphics.width - 40, 15);
            this._restoreUpdateStatusSprite[5].bitmap.drawText(`X`, 8, 13, Graphics.width - 20, 0, 'left');
            this._restoreUpdateStatusSprite[5].setClickHandler(EXIST_STATUS.bind(this));
            this._restoreUpdateStatusSprite[5].opacity = 0;
            var line = 1,
                pagesData = {},
                pages = 1,
                page = 1,
                pagesLimit = 12;
            function LIST(pageset) {
                roster_downloadsRestore.map(function (text) {
                    if (pageset) {
                        if (pagesData[pageset]) {
                            pagesData[pageset].map(function (element, i) {
                                let y = 25,
                                    add = 30,
                                    text = element['text'],
                                    width = element['width'],
                                    lineheight = element['lineheight'],
                                    align = element['align'];
                                if (i > 0)
                                    y += add * i;
                                this._restoreUpdateStatusSprite[1].bitmap.drawText(text, 0, y, width, lineheight, align);
                            }, this);
                        }
                    } else {
                        if (!pagesData[page])
                            pagesData[page] = [];
                        if (pagesData[page].length < pagesLimit) {
                            pagesData[page].push({
                                text: `(${line++}) ${text}`,
                                width: Graphics.width - 20,
                                lineheight: 0,
                                align: 'center'
                            });
                        }
                        else {
                            pages++;
                            page++;
                        }
                    }
                }, this);
                if (!pageset)
                    page = 1;
            }
            function RETURN_PAGE() {
                if (page > 1) {
                    page--;
                    this._restoreUpdateStatusSprite[1].bitmap.clear();
                    this._restoreUpdateStatusSprite[1].bitmap.fillAll('black');
                    this._restoreUpdateStatusSprite[2].bitmap.clear();
                    this._restoreUpdateStatusSprite[2].bitmap.drawText(`${page}/${pages}`, 0, Graphics.height - 235, Graphics.width - 20, 0, 'center');
                    LIST.call(this, page);
                }
            }
            function NEXT_PAGE() {
                if (page < pages) {
                    page++;
                    this._restoreUpdateStatusSprite[1].bitmap.clear();
                    this._restoreUpdateStatusSprite[1].bitmap.fillAll('black');
                    this._restoreUpdateStatusSprite[2].bitmap.clear();
                    this._restoreUpdateStatusSprite[2].bitmap.drawText(`${page}/${pages}`, 0, Graphics.height - 235, Graphics.width - 20, 0, 'center');
                    LIST.call(this, page);
                }
            }
            function EXIST_STATUS() {
                scene_system_reload = true;
                SceneManager.goto(Scene_Title);
            };
            LIST.call(this);
            LIST.call(this, 1);
            this._restoreUpdateStatusSprite[2].bitmap.drawText(`${page}/${pages}`, 0, Graphics.height - 235, Graphics.width - 20, 0, 'center');
            this.addChild(this._restoreUpdateStatusSprite[0]);
            this.addChild(this._restoreUpdateStatusSprite[1]);
            this.addChild(this._restoreUpdateStatusSprite[2]);
            this.addChild(this._restoreUpdateStatusSprite[3]);
            this.addChild(this._restoreUpdateStatusSprite[4]);
            this.addChild(this._restoreUpdateStatusSprite[5]);
        }
    };

    Scene_Update.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
        if (!scene_system_reload) {
            this.updateProgressBar();
            this.updateLoadUpdate();
            this.updateCompleteUpdate();
            this.updateRestoreUpdate();
            updateDownloadToRoster();
        }
    };

    Scene_Update.prototype.updateDownloadComplete = function () {
        this._updateDownloadComplete = true;
    };

    Scene_Update.prototype.updateDownloadCompleteStatus = function () {
        this._updateDownloadCompleteStatus = true;
    };

    Scene_Update.prototype.updateDownloadRestoreStatus = function () {
        this._updateDownloadRestoreStatus = true;
    };

    Scene_Update.prototype.updateProgressBar = function () {
        this._loadUpdateSprite[3].bitmap.clear();
        this._loadUpdateSprite[4].bitmap.clear();
        this._loadUpdateSprite[5].bitmap.clear();
        this._loadUpdateSprite[3].bitmap.fillRect(0, 0, windowDownloadProgress.getProgressBar(), 20, '#66ff33');
        this._loadUpdateSprite[4].bitmap.drawText(windowDownloadProgress.getTextFile(), 0, 20, Graphics.width - 20, 0, 'center');
        this._loadUpdateSprite[5].bitmap.drawText(windowDownloadProgress.getTextBar(), 0, 20, Graphics.width - 20, 0, 'center');
    };

    Scene_Update.prototype.updateLoadUpdate = function () {
        if (this._updateDownloadComplete) {
            var fadeOut = false;
            this._loadUpdateSprite.map(function (sprite) {
                if (sprite.opacity > 0) {
                    fadeOut = false
                    sprite.opacity -= 4;
                }
                else
                    fadeOut = true;
            });
            if (fadeOut) {
                if (!this._updateDownloadCompleteStatus && !this._updateDownloadRestoreStatus) {
                    scene_system_reload = true;
                    SceneManager.goto(Scene_Title);
                }
                if (this._updateDownloadCompleteStatus) {
                    this._completeDownloadStatusSpriteOpacity = true;
                }
                if (this._updateDownloadRestoreStatus) {
                    this._restoreDownloadStatusSpriteOpacity = true;
                }
            }
            return;
        }
        if (this._loadUpdateSpriteFrames == undefined) {
            this._loadUpdateSpriteFrames = [30, 35];
        }
        if (this._loadUpdateSpriteFrames[0] > 0) {
            this._loadUpdateSpriteFrames[0] -= 0.60;
            if (this._loadUpdateSprite[1].opacity > 0) {
                this._loadUpdateSprite[1].opacity -= 4;
            }
        } else {
            if (this._loadUpdateSpriteFrames[1] > 0) {
                this._loadUpdateSpriteFrames[1] -= 0.60;
                if (this._loadUpdateSprite[1].opacity < 255) {
                    this._loadUpdateSprite[1].opacity += 4;
                }
            } else {
                this._loadUpdateSpriteFrames = undefined;
            }
        }
    };

    Scene_Update.prototype.updateCompleteUpdate = function () {
        if (this._updateDownloadCompleteStatus && this._completeDownloadStatusSpriteOpacity) {
            this.drawCompleteUpdate();
            if (this._completeUpdateStatusSprite[0].opacity < 255)
                this._completeUpdateStatusSprite[0].opacity += 4;
            if (this._completeUpdateStatusSprite[1].opacity < 255)
                this._completeUpdateStatusSprite[1].opacity += 4;
            if (this._completeUpdateStatusSprite[2].opacity < 255)
                this._completeUpdateStatusSprite[2].opacity += 4;
            if (this._completeUpdateStatusSprite[3].opacity < 255)
                this._completeUpdateStatusSprite[3].opacity += 4;
            if (this._completeUpdateStatusSprite[4].opacity < 255)
                this._completeUpdateStatusSprite[4].opacity += 4;
            if (this._completeUpdateStatusSprite[5].opacity < 255)
                this._completeUpdateStatusSprite[5].opacity += 4;
        }
    };

    Scene_Update.prototype.updateRestoreUpdate = function () {
        if (this._updateDownloadCompleteStatus) return;
        if (this._updateDownloadRestoreStatus && this._restoreDownloadStatusSpriteOpacity) {
            this.drawRestoreUpdate();
            if (this._restoreUpdateStatusSprite[0].opacity < 255)
                this._restoreUpdateStatusSprite[0].opacity += 4;
            if (this._restoreUpdateStatusSprite[1].opacity < 255)
                this._restoreUpdateStatusSprite[1].opacity += 4;
            if (this._restoreUpdateStatusSprite[2].opacity < 255)
                this._restoreUpdateStatusSprite[2].opacity += 4;
            if (this._restoreUpdateStatusSprite[3].opacity < 255)
                this._restoreUpdateStatusSprite[3].opacity += 4;
            if (this._restoreUpdateStatusSprite[4].opacity < 255)
                this._restoreUpdateStatusSprite[4].opacity += 4;
            if (this._restoreUpdateStatusSprite[5].opacity < 255)
                this._restoreUpdateStatusSprite[5].opacity += 4;
        }
    };

    //-----------------------------------------------------------------------------
    // Roster(Lista) de downloads
    // 
    var roster_data = (function () {
        var folderRoster = String('system/update/save'),
            fileRoster = `${folderRoster}\\downloadroster.drxamasave`,
            fileData = {};
        if (fs.existsSync(localPath(fileRoster)))
            fileData = JSON.parse(LZString.decompressFromBase64(fs.readFileSync(localPath(fileRoster), { encoding: 'utf8' })));
        return fileData;
    })(),
        roster_initialized = null,
        roster_updateData = null,
        roster_downloadsComplete = null,
        roster_downloadsCompleteData = null,
        roster_downloadsFiles = 0,
        roster_downloadsRestore = [];

    /**
     * @description Adiciona o arquivo a lista de downloads
     * @param {String} fileUrl Link do arquivo
     * @param {String} fileName Nome do arquivo
     * @param {String} fileType Tipo do arquivo
     * @param {String} fileVersion Versão do arquivo
     * @param {String} filePath Caminho do arquivo
     */
    function addDownloadToRoster(fileUrl, fileName, fileType, fileVersion, filePath) {
        if (!fileVersion) fileVersion = String('1.00');
        if (!filePath || typeof filePath === 'string' && filePath.length <= 0) filePath = String('system/update/download');
        var folderRoster = String('system/update/save'),
            fileRoster = `${folderRoster}\\downloadroster.drxamasave`,
            fileData = roster_data;
        if (!localPathExists(folderRoster))
            localPathCreate(folderRoster);
        if (fs.existsSync(localPath(fileRoster))) {
            if (!fileData[fileName])
                fileData[fileName] = {};
            fileData[fileName]['url'] = fileUrl;
            fileData[fileName]['name'] = fileName;
            fileData[fileName]['type'] = fileType;
            fileData[fileName]['version'] = fileVersion;
            fileData[fileName]['path'] = filePath;
            if (fileData[fileName]['size'] === undefined)
                fileData[fileName]['size'] = null;
            if (fileData[fileName]['restore'] === undefined)
                fileData[fileName]['restore'] = false;
            if (fileName === 'updateManager' || fileData[fileName]['download'] === undefined)
                fileData[fileName]['download'] = false;
        } else {
            fileData[fileName] = {
                url: fileUrl,
                name: fileName,
                type: fileType,
                version: fileVersion,
                path: filePath,
                size: null,
                restore: false,
                download: false
            };
        }
        fs.writeFileSync(localPath(fileRoster), LZString.compressToBase64(JSON.stringify(fileData)), { encoding: 'utf8' });
    };

    /**
     * @description Completa o download da lista de downloads
     * @param {String} fileName Nome do arquivo
     * @param {String} filePath Caminho do arquivo
     * @param {String} fileVersion Versão do arquivo
     * @param {String} fileSize Tamanho do arquivo
     * @param {Boolean} fileRestore Verifica se o arquivo está sendo restaurado
     */
    function completeDownloadToRoster(fileName, filePath, fileVersion, fileSize, fileRestore) {
        var folderRoster = String('system/update/save'),
            fileRoster = `${folderRoster}\\downloadroster.drxamasave`,
            fileData = roster_data;
        if (fs.existsSync(localPath(fileRoster))) {
            if (fileData[fileName]) {
                fileData[fileName]['version'] = fileVersion;
                fileData[fileName]['size'] = fileSize;
                fileData[fileName]['download'] = true;
                if (fileName != 'updateManager' && !fileRestore)
                    roster_downloadsFiles++;
                else if (fileName != 'updateManager' && fileRestore)
                    roster_downloadsRestore.push(`${fileData[fileName]['path']}/${fileData[fileName]['name']}.${fileData[fileName]['type']}`);
            }
            // Move o arquivo para a pasta destino
            if (typeof filePath == 'string' && filePath.length > 0) {
                var downloadFolder = String('system/update/download');
                if (fs.existsSync(localPath(downloadFolder))) {
                    if (!localPathExists(filePath))
                        localPathCreate(filePath);
                    var name = fileData[fileName]['name'],
                        type = fileData[fileName]['type'],
                        src = localPath(`${downloadFolder}\\${name}.${type}`),
                        dest = localPath(`${filePath}\\${name}.${type}`);
                    if (fs.existsSync(src) && src != dest) {
                        var file = fs.createReadStream(src).pipe(fs.createWriteStream(dest));
                        file.on('finish', function () {
                            file.close();
                            if (fs.existsSync(src))
                                fs.unlinkSync(src);
                        });
                    }
                }
            }
            fs.writeFileSync(localPath(fileRoster), LZString.compressToBase64(JSON.stringify(fileData)), { encoding: 'utf8' });
            roster_initialized = null;
        }
    };

    /**
     * @description Atualiza a lista de downloads
     */
    function updateDownloadToRoster() {
        var folderRoster = String('system/update/save'),
            fileRoster = `${folderRoster}\\downloadroster.drxamasave`,
            fileData = roster_data,
            fileUpdatePath = String('system/update/download'),
            fileUpdate = `${fileUpdatePath}\\updateManager.json`;
        if (fs.existsSync(localPath(fileRoster))) {
            if (!roster_initialized) {
                /** @description Deleta o arquivo de atualização */
                function deleteFileUpdate() {
                    if (fs.existsSync(localPath(fileUpdate))) fs.unlinkSync(localPath(fileUpdate));
                }
                // Arquivo de atualizações
                if (fs.existsSync(localPath(fileUpdate))) {
                    if (fileData['updateManager'] && fileData['updateManager']['download']) {
                        try {
                            roster_updateData = JSON.parse(fs.readFileSync(localPath(fileUpdate), { encoding: 'utf8' }));
                        } catch (error) {
                            return deleteFileUpdate();
                        }
                    }
                    else {
                        return deleteFileUpdate();
                    }
                    if (roster_updateData['Arquivos'] instanceof Array &&
                        roster_updateData['Arquivos'].length > 0) {
                        roster_updateData['Arquivos'].map(function (file) {
                            let url = file['link'],
                                nome = file['nome'],
                                type = file['tipo'],
                                path = file['pasta'],
                                version = file['versão'];
                            if (fileData[nome] === undefined) fileData[nome] = {};
                            if (!fileData[nome]['download'] || fileData[nome]['version'] != version || !fs.existsSync(localPath(`${path}\\${nome}.${type}`))) {
                                addDownloadToRoster(url, nome, type, version, path);
                                if (fileData[nome]['download']) {
                                    fileData[nome]['download'] = false;
                                    fileData[nome]['restore'] = true;
                                    fs.writeFileSync(localPath(fileRoster), LZString.compressToBase64(JSON.stringify(fileData)), { encoding: 'utf8' });
                                }
                            }
                        });
                    }
                    if (roster_updateData['Remover_Arquivos'] instanceof Array &&
                        roster_updateData['Remover_Arquivos'].length > 0) {
                        roster_updateData['Remover_Arquivos'].map(function (file) {
                            let nome = file['nome'],
                                type = file['tipo'],
                                path = file['pasta'];
                            if (localPathExists(path))
                                localPathRemoveFile(path, nome, type);
                        });
                    }
                    if (roster_updateData['Remover_Pastas'] instanceof Array &&
                        roster_updateData['Remover_Pastas'].length > 0) {
                        roster_updateData['Remover_Pastas'].map(function (folder) {
                            let nome = folder['nome'],
                                path = folder['pasta'];
                            if (localPathExists(path))
                                localPathRemoveEx(`${path}\\${nome}`);
                        });
                    }
                    if (roster_updateData['Status']) {
                        roster_downloadsCompleteData = Object.create(roster_updateData['Status']);
                    }
                    deleteFileUpdate();
                }
                roster_downloadsComplete = false;
                var keys = Object.keys(fileData),
                    i = 0,
                    length = keys.length;
                for (; i < length; i++) {
                    let key = keys[i];
                    if (fileData[key] && !fileData[key]['download']) {
                        let url = fileData[key]['url'],
                            name = fileData[key]['name'],
                            type = fileData[key]['type'],
                            version = fileData[key]['version'],
                            path = fileData[key]['path'],
                            restore = fileData[key]['restore'];
                        roster_initialized = true;
                        return downloadFile(url, name, type, version, path, restore);
                    } else {
                        if (key != 'updateManager') {
                            if (fileData[key] && fileData[key]['download']) {
                                roster_downloadsComplete = true;
                            } else {
                                roster_downloadsComplete = false;
                            }
                        }
                    }
                };
                if (roster_downloadsComplete)
                    completeAllDownloads();
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Funções
    //

    /**
     * @description Inicia o sistema
     */
    function initializeSystem() {
        downloadUpdateFile();
    };

    /**
     * @description Verifica se existe internet
     */
    function isInternetStates(callback) {
        if (typeof callback != 'object') return;
        callback.dns = [
            'google.com',
            'uol.com.br'
        ];
        callback.counter = callback.dns.length;
        callback.dns.map(dns => {
            require('dns').lookup(dns, function (err) {
                callback.counter--;
                if (callback.counter <= 0) {
                    if (err) {
                        if (err.code === "ENOTFOUND" || err.code == "SERVFAIL") {
                            if (typeof callback.failure === 'function')
                                callback.failure();
                        }
                    } else {
                        if (typeof callback.success === 'function')
                            callback.success();
                    }
                }
            });
        });
    };

    /**
     * @description Chamada quando todos os downloads estão completos
     */
    function completeAllDownloads() {
        if (SceneManager._scene instanceof Scene_Update) {
            if (roster_downloadsFiles > 0) {
                SceneManager._scene.updateDownloadCompleteStatus();
            } else if (roster_downloadsRestore instanceof Array &&
                roster_downloadsRestore.length > 0) {
                SceneManager._scene.updateDownloadRestoreStatus();
            }
            SceneManager._scene.updateDownloadComplete();
        }
    };

    /**
     * @description Baixa o arquivo de atualização
     */
    function downloadUpdateFile() {
        return addDownloadToRoster(updateFile, 'updateManager', 'json');
    };

    /**
     * @description Verifica se a string é igual a outra string
     */
    function stringIsString(string, string2) {
        // Deixa a string em minusculo e retira os espaços
        string = string.toLowerCase().replace(/\s{1,}/g, '');
        // Deixa a string em minusculo e retira os espaços
        string2 = string2.toLowerCase().replace(/\s{1,}/g, '');
        // Verifica se a string contem a outra string
        if (string.contains(string2)) {
            return true;
        }
        return false;
    };

    /**
     * @description Retorna o caminho local para o arquivo/pasta
     */
    function localPath(p) {
        // Retira uma parte da string
        if (p.substring(0, 1) === '/') p = p.substring(1);
        // Importa o modulo PATH do Node
        var path = require('path');
        // Cria a base para o caminho local
        var base = path.dirname(process.mainModule.filename);
        // Retorna a base do caminho associado ao caminho
        return path.join(base, p);
    };

    /**
     * @description Verifica se o caminho local existe
     */
    function localPathExists(p) {
        var fs = require('fs'),
            i = 0,
            length = p.length,
            path = false,
            paths = [],
            pathString = '';
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

    /**
     * @description Cria o caminho local
     */
    function localPathCreate(p) {
        var fs = require('fs'),
            i = 0,
            length = p.length,
            paths = [],
            pathString = '';
        for (; i < length; i++) {
            let letter = String(p[i]);
            if (letter != '/') {
                pathString += letter;
            }
            if (letter == '/' || i == length - 1) {
                paths.push(pathString);
                var pathsJoin = paths.join("/");
                if (!fs.existsSync(localPath(pathsJoin))) {
                    fs.mkdirSync(localPath(pathsJoin));
                }
                pathString = '';
            }
        }
    };

    /**
     * @description Deleta varias pastas/arquivos dentro de uma pasta e por fim a pasta
     */
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

    /**
     * @description Deleta o arquivo da pasta
     */
    function localPathRemoveFile(filePath, fileName, fileType) {
        if (!localPathExists(filePath)) return;
        var fs = require('fs');
        var folderPath = localPath(filePath);
        if (fs.lstatSync(folderPath).isDirectory()) {
            fs.readdirSync(folderPath).forEach(function (_fileName) {
                var _filePath = folderPath + "/" + _fileName,
                    _fileType = (function () {
                        var i = 0,
                            length = _filePath.length,
                            stringStart = false,
                            type = '';
                        for (; i < length; i++) {
                            let letter = _filePath[i];
                            if (letter === '.') {
                                stringStart = true;
                                continue;
                            }
                            if (stringStart)
                                type += letter;
                        }
                        return type.replace(/\s{1,}/g, '').toLowerCase();
                    })();
                if (fs.lstatSync(_filePath).isFile()) {
                    if (_fileName.replace(/\s{1,}/g, '').toLowerCase()
                        .includes(String(fileName).replace(/\s{1,}/g, '').toLowerCase(), 0) &&
                        _fileType === String(fileType).replace(/\s{1,}/g, '').toLowerCase()) {
                        fs.unlinkSync(_filePath);
                    }
                }
            });
        }
    };

    /**
     * @description Faz a formatação dos bytes
     */
    function formatBytes(bytes) {
        if (bytes == 0) return '0 Bytes';
        var k = 1024,
            dm = 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    /**
     * @description Retorna o valor mais a quantidade de 0 indicada
     */
    function padZero(value, length) {
        var s = String(value);
        while (s.length < Number(length)) {
            s += '0';
        }
        return Number(s);
    };

    /**
     * @description Faz o download do arquivo
     * @param {String} fileUrl Link do arquivo
     * @param {String} fileName Nome do arquivo
     * @param {String} fileType Tipo do arquivo
     * @param {String} fileVersion Versão do arquivo
     * @param {String} filePath Caminho do arquivo
     * @param {Boolean} fileRestore Verifica se o arquivo está sendo restaurado
     */
    function downloadFile(fileUrl, fileName, fileType, fileVersion, filePath, fileRestore) {
        var http = null,
            folderRoster = String('system/update/save'),
            fileRoster = `${folderRoster}\\downloadroster.drxamasave`,
            fileUrl = String(fileUrl),
            folderDest = String('system/update/download'),
            fileData = roster_data;
        if (!localPathExists(folderDest))
            localPathCreate(folderDest);
        folderDest = localPath(folderDest);
        var fileDest = `${folderDest}\\${String(fileName)}.${String(fileType).toLowerCase()}`;
        if (fileUrl.substring(0, 5).match(/https/)) {
            http = require('https');
        } else {
            http = require('http');
        }
        if (fs.existsSync(folderDest)) {
            if (!fs.existsSync(fileDest))
                fs.writeFileSync(fileDest, '', { encoding: 'utf8' });
            //--------------------------------------------------------------------------------
            // Verifica se o arquivo já existe na pasta de download e se ele está completo. 
            //--------------------------------------------------------------------------------
            var fileSize = formatBytes(0);
            if (fileName != 'updateManager' && fs.existsSync(localPath(fileRoster)) && fs.existsSync(fileDest)) {
                fileSize = formatBytes(fs.statSync(fileDest).size);
                if (fileSize == fileData[fileName]['size'] &&
                    fileData[fileName]['version'] === fileVersion) {
                    if (!fileData[fileName]['download']) {
                        fileData[fileName]['download'] = true;
                        fs.writeFileSync(localPath(fileRoster), LZString.compressToBase64(JSON.stringify(fileData)), { encoding: 'utf8' });
                    }
                    return roster_initialized = null;
                }
            }
            var file = fs.createWriteStream(fileDest),
                fileComplete = () => {
                    completeDownloadToRoster(fileName, filePath, fileVersion, fileSize, fileRestore);
                    windowProgress.remove();
                    windowProgress.update();
                    windowDownloadProgress.resetProgress();
                };
            http.get(fileUrl, function (res) {
                res.pipe(file);
                windowProgress.add();
                windowProgress.update();
                res.on('data', function (data) {
                    var menor = formatBytes(res.socket.bytesRead),
                        maior = formatBytes(res.headers['content-length']),
                        total = padZero(res.headers['content-length'], 2),
                        corrent = res.socket.bytesRead,
                        porcent = corrent / total * 100;
                    fileSize = maior;
                    windowDownloadProgress.setTextFile(`${fileName}(${windowDownloadProgress.getProgress()}%)`);
                    windowDownloadProgress.setTextBar(`${menor} / ${maior}`);
                    windowDownloadProgress.setProgress(porcent);
                    windowDownloadProgress.setProgressBar(porcent);
                }).on('end', function () {
                    fileComplete();
                });
            }).on('error', function (err) {
                fileComplete();
                fs.unlinkSync(fileDest);
            });
        }
    };
})();