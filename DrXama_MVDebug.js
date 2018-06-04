//===============================================================================
// MVDebug
// By Dr.Xamã
// GS_MVDebug.js
// Version: 1.16
//===============================================================================
/*:
 * @plugindesc v1.16 - Grande biblioteca de utilitários que fornece uma grande 
 * depuração do sistema.
 *
 * @author Dr.Xamã
 *
 * @param GitHub url
 * @desc url para o github do projeto.
 * @default https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV
 * 
 * @param screenWidth
 * @desc Largura da janela do projeto
 * @type number
 * @min 816
 * @default 816
 * 
 * @param boxWidth
 * @desc Largura da janela do projeto
 * @type number
 * @min 816
 * @default 816
 * 
 * @param screenHeight
 * @desc Altura da janela do projeto
 * @type number
 * @min 624
 * @default 624
 * 
 * @param boxHeight
 * @desc Altura da janela do projeto
 * @type number
 * @min 624
 * @default 624
 * 
 * @param InputkeyMapper
 * @desc Defina as teclas do teclado
 * @type struct<InputKeyMapperStruct>[]
 * @default
 * 
 * @help
 * ==============================================================================
 *    Introdução
 * ==============================================================================
 * O plugin MVDebug(MVD) é um kit de desenvolvimento de software(SDK) destinado 
 * a um fabricante de plugins, fornecendo uma maneira padrão de fazer funções 
 * de depuração.
 * ==============================================================================
 *    O módulo MVDebug(Alias como MVD)
 * ==============================================================================
 * Acesse todas as funções e faça sua depuração avançada no sistema.
 * ==============================================================================
 *    Mantenha-se atualizado
 * ==============================================================================
 * Recomendo que você verifique regularmente se o MVD está atualizado.
 * As atualizações do plugin incluirão coisas como correções de bugs, otimização 
 * do código e novos recursos, por isso é altamente recomendável que você tenha 
 * a versão mais recente.
 *
 * Você pode obter a versão mais recente acessando qualquer um dos seguintes 
 * endereços da Web:
 * - https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV
 * - http://drxama.epizy.com/?page_id=299
 * - http://www.condadobraveheart.com/forum/index.php?topic=4061.0
 */
//===============================================================================
// IMPORT PLUGIN
//===============================================================================
var Imported = Imported || {};
Imported["GS_debuggEx"] = "1.16";

var GS = GS || {},
  MVDebug = {},
  MVD = MVDebug;

GS.MVDebug = MVDebug;
GS.MVD = MVD;

//===============================================================================
// MVDEBUG MODULE
//===============================================================================
(function (_) {
  "use strict";

  //-----------------------------------------------------------------------------
  // Parameters
  //
  var params = PluginManager.parameters('DrXama_MVDebug');
  var url_github = String(params['GitHub url']) || 'https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV';

  //-----------------------------------------------------------------------------
  // Global Variables
  //

  /**
   * @MVDebug {private}
   * @description Boolean para salvar se o sistema já foi iniciado
   * @type {boolean}
   */
  var initializeSystem = false;

  /** 
   * @MVDebug {public}
   * @description Array para salvar todos os códigos que estão sendo executados pelo plugin.
   * @type {array}
   */
  var scriptsRun = [];

  /** 
   * @MVDebug {public}
   * @description Array para salvar todos os códigos que estão sendo carregados pelo plugin.
   * @type {array}
   */
  var scriptsLoad = [];

  /** 
   * @MVDebug {public}
   * @description Largura da janela do projeto
   * @type {number}
   */
  const _screenWidth = Number(params["screenWidth"] || 816);
  const _boxWidth = Number(params["boxWidth"] || 816);

  /** 
   * @MVDebug {public}
   * @description Altura da janela do projeto
   * @type {number}
   */
  const _screenHeight = Number(params["screenHeight"] || 624);
  const _boxHeight = Number(params["boxHeight"] || 624);

  /**
   * @MVDebug {private}
   * @description As teclas definidas
   * @type {[]}
   */
  const _InputkeyMapper = JSON.parse(params["InputkeyMapper"] || []);

  //-----------------------------------------------------------------------------
  // Input.keyMapper
  //
  /**
   * A hash table to convert from a virtual key code to a mapped key name.
   *
   * @static
   * @property keyMapper
   * @type Object
   */
  _InputkeyMapper.push(
    {
      'Numero da tecla': 16,
      'Nome da tecla': 'shift'
    },
    {
      'Numero da tecla': 18,
      'Nome da tecla': 'alt'
    },
    {
      'Numero da tecla': 70,
      'Nome da tecla': 'f'
    });
  _InputkeyMapper.map(function (key) {
    if (Input.keyMapper && key) {
      var keyCode = Number(key['Numero da tecla']),
        keyValue = String(key['Nome da tecla']);
      Object.defineProperty(Input.keyMapper, keyCode, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: keyValue
      });
    }
  });

  //-----------------------------------------------------------------------------
  // PluginManager
  //
  /**
   * @description O caminho para a pasta dos plugins.
   */
  PluginManager._pathDebugEx = localPath(pathFileDebuggExCodePlugins());

  /**
   * @description Configure o novo plugin.
   * @param plugin {{}} O novo plugin.
   */
  PluginManager.setupDebugEx = function (plugin) {
    if (plugin.status && !this._scripts.contains(plugin.name)) {
      this.setParameters(plugin.name, plugin.parameters);
      this.loadScriptDebugEx(plugin.name);
      this._scripts.push(plugin.name);
    }
  };

  /**
   * @description Carregue o plugin.
   * @param name {string} Nome do plugin.
   */
  PluginManager.loadScriptDebugEx = function (name) {
    var url = this._pathDebugEx + '\\' + name + '.js';
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = false;
    script.onerror = this.onError.bind(this);
    script._url = url;
    document.body.appendChild(script);
  };

  //-------------------------------------------------------------------------------
  // SceneManager
  //
  SceneManager._screenWidth = Math.floor(_screenWidth);
  SceneManager._screenHeight = Math.floor(_screenHeight);
  SceneManager._boxWidth = Math.floor(_boxWidth);
  SceneManager._boxHeight = Math.floor(_boxHeight);

  const _SceneManager_initNwjs = SceneManager.initNwjs;
  SceneManager.initNwjs = function () {
    _SceneManager_initNwjs.apply(this, arguments);
    if (Utils.isNwjs()) {
      var windowWidth = SceneManager._screenWidth;
      var windowHeight = SceneManager._screenHeight;
      var dw = windowWidth - window.innerWidth;
      var dh = windowHeight - window.innerHeight;
      window.moveBy(-dw / 2, -dh / 2);
      window.resizeBy(dw, dh);
    }
    if (Utils.isNwjs() && Utils.isOptionValid('test')) {
      require('nw.gui').Window.get().showDevTools();
      Graphics.showFps();
    }
  };

  //-------------------------------------------------------------------------------
  // Scene_Map
  //
  Scene_Map._showStepsXy = {
    'sprite': new Sprite(new Bitmap(240, 100)),
    'keyAction': false,
    'keyDelay': [0, 5],
    'child': false,
    'stepsSprite': ['player', 0]
  };

  const __scene_map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    __scene_map_update.call(this);
    this.updateStepButton();
    this.updateStepXy();
  };

  Scene_Map.prototype.updateStepButton = function () {
    if (Scene_Map._showStepsXy.keyAction) {
      if (Scene_Map._showStepsXy.keyDelay[0] > 0)
        return Scene_Map._showStepsXy.keyDelay[0]--;
    }
    if (Input.isPressed('shift') && Input.isPressed('alt')) {
      if (Input.isTriggered('f')) {
        if (!Scene_Map._showStepsXy.keyAction) {
          Scene_Map._showStepsXy.keyAction = true;
          Scene_Map._showStepsXy.keyDelay[0] = Scene_Map._showStepsXy.keyDelay[1];
        } else
          Scene_Map._showStepsXy.keyAction = false;
      }
    }
  };

  Scene_Map.prototype.updateStepXy = function () {
    if (Scene_Map._showStepsXy.keyAction) {
      if (!Scene_Map._showStepsXy.child) {
        Scene_Map._showStepsXy.child = true;
        let sprite = Scene_Map._showStepsXy.sprite;
        let bitmap = sprite.bitmap;
        let x = SceneManager._screenWidth - (sprite.width + 5);
        sprite.move(x, 5);
        this.addChild(sprite);
      } else {
        let sprite = Scene_Map._showStepsXy.sprite;
        let bitmap = sprite.bitmap;
        bitmap.clear();
        bitmap.paintOpacity = 60;
        bitmap.fillAll('black');
        bitmap.paintOpacity = 255;
        bitmap.fontSize = 18;
        if (Scene_Map._showStepsXy.stepsSprite[0] == 'player') {
          var ty1 = bitmap.height - 15;
          var ty2 = 30;
          bitmap.drawText(`TileX: ${$gamePlayer._x}`, 0, ty2, bitmap.width, 0, 'center');
          bitmap.drawText(`TileY: ${$gamePlayer._y}`, 0, ty2 + 25, bitmap.width, 0, 'center');
          bitmap.fontSize = 12;
          bitmap.drawText('MVDebug - Movimento(Player)', 0, ty1, bitmap.width, 0, 'center');
        } else if (Scene_Map._showStepsXy.stepsSprite[0] == 'event') {
          var ty1 = bitmap.height - 15;
          var ty2 = 30;
          var eventId = Scene_Map._showStepsXy.stepsSprite[1];
          if (!$gameMap.event(eventId)) {
            ty2 += 20;
            bitmap.fontSize = 14;
            return bitmap.drawText(`Evento(${eventId}) não existe!`, 0, ty2, bitmap.width, 0, 'center');
          }
          bitmap.drawText(`TileX: ${$gameMap.event(eventId)._x}`, 0, ty2, bitmap.width, 0, 'center');
          bitmap.drawText(`TileY: ${$gameMap.event(eventId)._y}`, 0, ty2 + 25, bitmap.width, 0, 'center');
          bitmap.fontSize = 12;
          bitmap.drawText(`MVDebug - Movimento(Evento(${eventId}))`, 0, ty1, bitmap.width, 0, 'center');
        }
      }
    } else {
      if (Scene_Map._showStepsXy.child) {
        Scene_Map._showStepsXy.child = false;
        let sprite = Scene_Map._showStepsXy.sprite;
        let bitmap = sprite.bitmap;
        bitmap.clear();
        this.removeChild(sprite);
      }
    }
  };

  //-----------------------------------------------------------------------------
  // Console
  //
  console.fileScanType = function (fileName, filePath, readType, saveCache) {
    fileScanType.apply(this, arguments);
  };

  console.fileScanFL = function (fileName, filePath, FLText, FLTextEnd) {
    fileScanFL.apply(this, arguments);
  };

  console.runCode = function (fullYear, fileIndex) {
    runCode.apply(this, arguments);
  };

  console.showfileInFolder = function (fileName, filePath, fileExtension) {
    showfileInFolder.apply(this, arguments);
  };

  console.fileWriteDS = function (fileName, fileConfig) {
    fileWriteDS.apply(this, arguments);
  };

  console.computerUsername = function () {
    return computerUsername.call(this);
  };

  console.goGithub = function () {
    goGithub.call(this);
  };

  console.loadScript = function (fileName, filePath) {
    loadScript.apply(this, arguments);
  };

  console.loadScriptExist = function (filePath) {
    loadScriptExist.apply(this, arguments);
  };

  console.stopScriptExist = function (fileName, filePath) {
    stopScriptExist.apply(this, arguments);
  };

  console.setStepsSprite = function (sprite, index) {
    Scene_Map._showStepsXy.stepsSprite = [sprite || 'player', index || 0];
  };

  /**
   * @MVDebug {private}
   * @description Cria o nome da pasta para o cache, com base no ano atual.
   * @return {string} caminho para o cache da pasta.
   */
  function pathFileDebuggExCache() {
    var timer = new Date();
    return 'system/debuggEx/cache_' + timer.getFullYear();
  };

  /**
   * @MVDebug {private}
   * @description Cria o nome da pasta para o código de execução, com base no ano atual.
   * @return {string} caminho para o cache da pasta.
   */
  function pathFileDebuggExCodeRun() {
    var timer = new Date();
    return 'system/debuggEx/codeRun_' + timer.getFullYear();
  };

  /**
   * @MVDebug {private}
   * @description Cria o nome da pasta para os plugins.
   * @return {string} caminho para o cache da pasta.
   */
  function pathFileDebuggExCodePlugins() {
    var timer = new Date();
    return 'system/debuggEx/codePlugins';
  };

  /**
   * @description Deixe a primeira letra em maiúscula.
   * @return {string}
   */
  String.prototype.oneLettertoUpperCase = function () {
    return this[0].toUpperCase() + this.substr(1, this.length);
  };

  /**
   * @description Transforme em uma string com aspas duplas ou simples.
   * @param marks {number} {0-1} o número de aspas.
   * @return {string}
   */
  String.prototype.toStringMarks = function (marks) {
    if (marks == 0) {
      marks = '\"';
    } else if (marks == 1) {
      marks = '\'';
    } else {
      marks = '\"';
    }
    return marks + this + marks;
  };

  /**
   * Call the essentials functions.
   *
   * @description Scene_Boot.prototype.initialize
   */
  const sceneBoot_initialize = Scene_Boot.prototype.initialize;
  Scene_Boot.prototype.initialize = function () {
    sceneBoot_initialize.call(this);
    if (!initializeSystem) {
      initializeSystem = true;
      welcomeMessageSystem(Imported["GS_debuggEx"]);
      createFolderSystem();
      createFolderDebuggEx();
      createFolderDebuggExCodeRun();
      createFolderDebuggExFilesCache();
    }
  };

  /**
   * @MVDebug {private}
   * @description Mostrar mensagem de boas-vindas do sistema.
   * @param systemVersion {string} A versão do código.
   */
  function welcomeMessageSystem(systemVersion) {
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      var args = ['\n %c %c %c \u2730 MVDEBUG ' + systemVersion + ' \u2730 ' + ' %c  %c  \u2726 ' + url_github + ' \u2726  %c %c \u2605%c\u2605%c\u2605 \n\n',
        'background: #448eff; padding:5px 0;',
        'background: #ff4444; padding:5px 0;',
        'color: #fff; background: #ffae00; padding:5px 0;',
        'background: #ff4444; padding:5px 0;',
        'background: #448eff; color: #fff; padding:5px 0;',
        'background: #ff4444; padding:5px 0;',
        'color: #448eff; background: #fff; padding:5px 0;',
        'color: #ff4444; background: #fff; padding:5px 0;',
        'color: #ffae00; background: #fff; padding:5px 0;'
      ];
      console.log.apply(console, args);
    } else if (window.console) {
      console.log('MVDEBUG ' + systemVersion + ' - ' + url_github);
    }
  }


  /**
   * @MVDebug {private}
   * @description Dê um caminho para a pasta indicada.
   * @param p {string} O caminho para a conversão.
   * @return {string}
   */
  function localPath(p) {
    if (p.substring(0, 1) === '/') p = p.substring(1);
    var path = require('path');
    var base = path.dirname(process.mainModule.filename);
    return path.join(base, p);
  };

  /**
   * @MVDebug {private}
   * @description Crie um diretório para o sistema.
   * @return {null}
   */
  function createFolderSystem() {
    var fs = require('fs');
    var pathFolder = localPath('system');
    if (!fs.existsSync(pathFolder)) {
      fs.mkdirSync(pathFolder);
      var message = '%c ✰ Criado um diretório para o sistema ✰ ';
      console.info(message, 'background: #232323; font-size: 120%; color: #ffffff');
    }
  };

  /**
   * @MVDebug {private}
   * @description Crie um diretório para o sistema de depuração.
   * @return {null}
   */
  function createFolderDebuggEx() {
    var fs = require('fs');
    var pathFolder = localPath('system/debuggEx');
    if (!fs.existsSync(pathFolder)) {
      fs.mkdirSync(pathFolder);
      var message = '%c ✰ Criado um diretório para o sistema de depuração ✰ ';
      console.info(message, 'background: #232323; font-size: 120%; color: #ffffff');
    }
  };

  /**
   * @MVDebug {private}
   * @description Crie um diretório para executar os códigos.
   * @return {null}
   */
  function createFolderDebuggExCodeRun() {
    var fs = require('fs');
    var pathFolder = localPath('system/debuggEx');
    var pathFolderCodeRun = localPath(pathFileDebuggExCodeRun());
    if (fs.existsSync(pathFolder) && !fs.existsSync(pathFolderCodeRun)) {
      fs.mkdirSync(pathFolderCodeRun);
      var message = '%c ✰ Criado um diretório para executar os códigos ✰ ';
      console.info(message, 'background: #232323; font-size: 120%; color: #ffffff');
    }
  };

  /**
   * @MVDebug {private}
   * @description Crie um diretório para arquivos no cache após a verificação.
   * @return {null}
   */
  function createFolderDebuggExFilesCache() {
    var fs = require('fs');
    var pathFolder = localPath('system/debuggEx');
    var pathFolderFilesCache = localPath(pathFileDebuggExCache());
    if (fs.existsSync(pathFolder) && !fs.existsSync(pathFolderFilesCache)) {
      fs.mkdirSync(pathFolderFilesCache);
      var message = '%c ✰ Criado um diretório para arquivos no cache após a verificação ✰ ';
      console.info(message, 'background: #232323; font-size: 120%; color: #ffffff');
    }
  };

  /** 
   * @MVDebug {public}
   * @description Abre o github do script no seu navegador padrão.
   */
  function goGithub() {
    if (Utils.isNwjs()) {
      var gui = require('nw.gui');
      var url = MVDebug.github || '';
      var http = null;
      if (url.substring(0, 5).match(/https/) || url.substring(0, 5).match(/http/)) {
        http = true;
      }
      if (http) {
        gui.Shell.openExternal(MVDebug.github);
      }
    }
  };

  /** 
   * @MVDebug {public}
   * @description Retorna o nome de usuário do computador.
   * @return {string}
   */
  function computerUsername() {
    if (process && process.env) {
      return process.env['USERNAME'];
    }
  };

  /** 
   * @MVDebug {public}
   * @description Determina a quantidade de funções, variáveis, strings, loops e etc.
   * @param fileName {string} o nome do arquivo.
   * @param filePath {string} o caminho do arquivo.
   * @param readType {string} o tipo de varredura.
   * @param saveCache {boolean} salve no cache a varredura completa.
   */
  function fileScanType(fileName, filePath, readType, saveCache) {
    var fs = require('fs');
    var pluginPath = fileName;
    var filePath = localPath(filePath + '/') + pluginPath + '.js';
    var fileCountRead = 0;
    var linesSaveCache = [];
    var linesCout = 0;
    if (fs.existsSync(filePath)) {
      const readline = require('readline');
      const readStream = fs.createReadStream(filePath);
      const rl = readline.createInterface({
        input: readStream
      });
      rl.on('line', function (line) {
        linesCout++;
        var linesCoutString = linesCout.padZero(2);
        if (typeRead(readType, line)) {
          fileCountRead++;
          if (readType === 'function') {
            var stringLine = line.replace('{', '').trim();
            stringLine = stringLine.replace('}', '').trim();
            if (stringLine[stringLine.length - 1] === ';')
              stringLine = stringLine.substr(0, stringLine.length - 1).trim();
            linesSaveCache.push(
              'LINHA(' + linesCoutString + '): ' + stringLine
            );
          } else if (readType === 'string') {
            var stringLine = line;
            if (stringLine[stringLine.length - 1] === ';')
              stringLine = stringLine.substr(0, stringLine.length - 1).trim();
            linesSaveCache.push(
              'LINHA(' + linesCoutString + '): ' + stringLine
            );
          } else if (readType === 'number') {
            var stringLine = line;
            if (stringLine[stringLine.length - 1] === ';')
              stringLine = stringLine.substr(0, stringLine.length - 1).trim();
            linesSaveCache.push(
              'LINHA(' + linesCoutString + '): ' + stringLine
            );
          } else if (readType === 'array') {
            var stringLine = line;
            if (stringLine[stringLine.length - 1] === ';')
              stringLine = stringLine.substr(0, stringLine.length - 1).trim();
            linesSaveCache.push(
              'LINHA(' + linesCoutString + '): ' + stringLine
            );
          } else if (readType === 'for') {
            var stringLine = line.replace('{', '').trim();
            stringLine = stringLine.replace('}', '').trim();
            if (stringLine[stringLine.length - 1] === ';')
              stringLine = stringLine.substr(0, stringLine.length - 1).trim();
            linesSaveCache.push(
              'LINHA(' + linesCoutString + '): ' + stringLine
            );
          } else if (readType === 'boolean') {
            var stringLine = line;
            if (stringLine[stringLine.length - 1] === ';')
              stringLine = stringLine.substr(0, stringLine.length - 1).trim();
            linesSaveCache.push(
              'LINHA(' + linesCoutString + '): ' + stringLine
            );
          } else if (readType === 'forin') {
            var stringLine = line.replace('{', '').trim();
            stringLine = stringLine.replace('}', '').trim();
            if (stringLine[stringLine.length - 1] === ';')
              stringLine = stringLine.substr(0, stringLine.length - 1).trim();
            linesSaveCache.push(
              'LINHA(' + linesCoutString + '): ' + stringLine
            );
          } else if (readType === 'variable') {
            var stringLine = line.replace('{', '').trim();
            stringLine = stringLine.replace('}', '').trim();
            if (stringLine[stringLine.length - 1] === ';')
              stringLine = stringLine.substr(0, stringLine.length - 1).trim();
            linesSaveCache.push(
              'LINHA(' + linesCoutString + '): ' + stringLine
            );
          } else if (readType === 'require') {
            var stringLine = line.replace('{', '').trim();
            stringLine = stringLine.replace('}', '').trim();
            if (stringLine[stringLine.length - 1] === ';')
              stringLine = stringLine.substr(0, stringLine.length - 1).trim();
            linesSaveCache.push(
              'LINHA(' + linesCoutString + '): ' + stringLine
            );
          } else if (readType === 'forof') {
            var stringLine = line.replace('{', '').trim();
            stringLine = stringLine.replace('}', '').trim();
            if (stringLine[stringLine.length - 1] === ';')
              stringLine = stringLine.substr(0, stringLine.length - 1).trim();
            linesSaveCache.push(
              'LINHA(' + linesCoutString + '): ' + stringLine
            );
          }
        }
      }).on('close', function () {
        var groupName = '%c ✰ ' + readType.oneLettertoUpperCase() + ' Varredura para(' + '%c' + pluginPath + '.js' + '%c) está completa! ✰ ';
        showMessageComplete(groupName);
        if (saveCache) saveInCache(groupName);
      });
    }

    function showMessageComplete(groupName) {
      var message = '%c O arquivo(%c' + pluginPath + '.js' + '%c) tem um total de ' + '%c' + fileCountRead;
      if (fileCountRead > 1) {
        message += ' %c' + readType + 's' + ' declarado ';
      } else if (fileCountRead == 0) {
        message = '%c O arquivo(%c' + pluginPath + '.js' + '%c) não tem um ' + readType + '%c%c ';
      } else {
        message += ' %c' + readType + ' declarado ';
      }
      if (readType == 'function') {
        console.group(groupName,
          'background: #222; font-size: 120%; color: #80bfff',
          'background: #222; font-size: 130%; color: #ffffff',
          'background: #222; font-size: 120%; color: #80bfff'
        );
      } else if (readType == 'string') {
        console.group(groupName,
          'background: #222; font-size: 120%; color: #fffc75',
          'background: #222; font-size: 130%; color: #ffffff',
          'background: #222; font-size: 120%; color: #fffc75'
        );
      } else if (readType == 'number') {
        console.group(groupName,
          'background: #222; font-size: 120%; color: #0080ff',
          'background: #222; font-size: 130%; color: #ffffff',
          'background: #222; font-size: 120%; color: #0080ff'
        );
      } else if (readType == 'array') {
        console.group(groupName,
          'background: #222; font-size: 120%; color: #ff8888',
          'background: #222; font-size: 130%; color: #ffffff',
          'background: #222; font-size: 120%; color: #ff8888'
        );
      } else if (readType == 'for') {
        console.group(groupName,
          'background: #222; font-size: 120%; color: #ffa851',
          'background: #222; font-size: 130%; color: #ffffff',
          'background: #222; font-size: 120%; color: #ffa851'
        );
      } else if (readType == 'boolean') {
        console.group(groupName,
          'background: #222; font-size: 120%; color: #a2e01f',
          'background: #222; font-size: 130%; color: #ffffff',
          'background: #222; font-size: 120%; color: #a2e01f'
        );
      } else if (readType == 'forin') {
        console.group(groupName,
          'background: #222; font-size: 120%; color: #beea64',
          'background: #222; font-size: 130%; color: #ffffff',
          'background: #222; font-size: 120%; color: #beea64'
        );
      } else if (readType == 'variable') {
        console.group(groupName,
          'background: #222; font-size: 120%; color: #5155fd',
          'background: #222; font-size: 130%; color: #ffffff',
          'background: #222; font-size: 120%; color: #5155fd'
        );
      } else if (readType == 'require') {
        console.group(groupName,
          'background: #222; font-size: 120%; color: #ee6060',
          'background: #222; font-size: 130%; color: #ffffff',
          'background: #222; font-size: 120%; color: #ee6060'
        );
      } else if (readType == 'forof') {
        console.group(groupName,
          'background: #222; font-size: 120%; color: #beea64',
          'background: #222; font-size: 130%; color: #ffffff',
          'background: #222; font-size: 120%; color: #beea64'
        );
      }
      console.log(message,
        'background: #222; font-size: 120%; color: #00fff6',
        'background: #222; font-size: 130%; color: #ffffff;',
        'background: #222; font-size: 120%; color: #00fff6',
        'background: #222; font-size: 130%; color: #ffffff;',
        'background: #222; font-size: 120%; color: #00fff6'
      );
      if (!saveCache) console.groupEnd(groupName);
    };

    function typeRead(readType, line) {
      switch (readType) {
        case 'function':
          return readFunctions(line);
        case 'string':
          return readString(line);
        case 'number':
          return readNumber(line);
        case 'array':
          return readArray(line);
        case 'for':
          return readFor(line);
        case 'boolean':
          return readBoolean(line);
        case 'forin':
          return readForin(line);
        case 'variable':
          return readVariable(line);
        case 'require':
          return readRequire(line);
        case 'forof':
          return readForof(line);
      }
    }

    function saveInCache(groupName) {
      var fs = require('fs');
      var timer = new Date();
      var dayMonth = timer.getDate();
      var numberMonth = timer.getMonth();
      var fullYear = timer.getFullYear();
      var hours = timer.getHours();
      var minutes = timer.getMinutes();
      var seconds = timer.getSeconds();
      var completeDate = dayMonth.padZero(2) + '_' + numberMonth.padZero(2) + '_' + fullYear.padZero(2);
      var completeHour = hours.padZero(2) + '_' + minutes.padZero(2) + '_' + seconds.padZero(2);
      var data = JSON.stringify(linesSaveCache, null, 2);

      var pathDebuggExCache = localPath(pathFileDebuggExCache());
      if (fs.existsSync(pathDebuggExCache)) {

        var pathFolderFile = getfolderPath();
        if (!fs.existsSync(pathFolderFile)) {
          fs.mkdirSync(pathFolderFile);
        }

        var pathFile = pathFolderFile + '\\' + 'debug_type_' + readType + '_file_' + fileName + '_date_' + completeDate + '_time_' + completeHour + '.json';
        fs.writeFileSync(pathFile, data);

        var message = '%c Varredura adicionada(' + readType + ') no cache(' + pathFileDebuggExCache() + ') ';
        console.log(message, 'background: #222; font-size: 120%; color: #ffffff');
        console.groupEnd(groupName);

        function getfolderPath() {
          var allFolders = fs.readdirSync(pathDebuggExCache);
          var i = 0;
          var length = allFolders.length;
          var folderPathCount = null;
          for (; i < length; i++) {
            var folder = localPath(pathFileDebuggExCache()) + '\\' + allFolders[i];
            var folderBarIndex = folder.indexOf('(') - readType.length;
            if (folder.substr(folderBarIndex, readType.length) === readType) {
              var folderCountFiles = fs.readdirSync(folder).length + 1;
              folderPathCount = pathDebuggExCache + '\\' + 'cache_file_' + fileName + '_type_' + readType;
              folderPathCount += '(' + folderCountFiles + ')';
              fs.renameSync(folder, folderPathCount);
            }
          }
          if (folderPathCount) {
            return folderPathCount;
          } else {
            return pathDebuggExCache + '\\' + 'cache_file_' + fileName + '_type_' + readType + '(1)';
          }
        }

      }
    }

    function readFunctions(line) {
      var requisiteTypeIsValid = line.indexOf('function');
      var requisitesIsValid = [
        line.indexOf('('),
        line.indexOf(')'),
        line.indexOf('{')
      ];
      var requisites = function () {
        if (requisitesIsValid[0] > -1 &&
          requisitesIsValid[1] > -1 &&
          requisitesIsValid[2] > -1) return true;
      }
      if (requisiteTypeIsValid > -1 && requisites()) {
        return true;
      }
    };

    function readString(line) {
      var requisitesIsValid = [
        line.indexOf('\"'),
        line.indexOf('\''),
        line.indexOf('('),
        line.indexOf(')'),
        line.toLowerCase().indexOf('new'),
        line.toLowerCase().indexOf('string'),
      ];
      var requisites = function () {
        if (requisitesIsValid[0] > -1 || requisitesIsValid[1] > -1 ||
          requisitesIsValid[2] > -1 && requisitesIsValid[3] > -1 &&
          requisitesIsValid[4] > -1 && requisitesIsValid[5] > -1) return true;
      }
      if (requisites()) {
        return true;
      }
    };

    function readNumber(line) {
      var requisitesIsValid = [
        line.indexOf('('),
        line.indexOf(')'),
        line.toLowerCase().indexOf('new'),
        line.toLowerCase().indexOf('number')
      ];
      var requisites = function () {
        if (requisitesIsValid[0] > -1 && requisitesIsValid[1] > -1 &&
          requisitesIsValid[2] > -1 && requisitesIsValid[3] > -1) return true;
      }

      var numberIsValid = function () {
        var string = line;
        var equalIndex = string.indexOf('=');
        var stringLength = string.length;
        var stringValue = '';
        var i = equalIndex;
        for (; i < stringLength; i++) {
          var letter = string[i];
          if (letter != '=' && letter != ';') {
            stringValue += letter;
          }
        }

        function isNumber(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
        var stringReplace = stringValue.replace(/\s{1,}/g, '');
        var stringReplace = stringValue.replace(/[\\", \\']/g, '');
        var n = isNumber(stringReplace);
        if (n) return true;
      }
      if (numberIsValid() || requisites()) {
        return true;
      }
    };

    function readArray(line) {
      var requisitesIsValid = [
        line.indexOf('('),
        line.indexOf(')'),
        line.toLowerCase().indexOf('new'),
        line.toLowerCase().indexOf('array')
      ];
      var arrayIsValid = function () {
        var string = line;
        var equalIndex = string.indexOf('=');
        var stringLength = string.length;
        var stringValue = '';
        var i = equalIndex;
        for (; i < stringLength; i++) {
          var letter = string[i];
          if (letter != '=' && letter != ';') {
            stringValue += letter;
          }
        }
        var stringReplace = stringValue.replace(/\s{1,}/g, '');
        var stringReplace = stringValue.replace(/[\\", \\']/g, '');
        if (stringReplace.indexOf('[') > -1 || stringReplace.indexOf(']') > -1) {
          return true;
        }
      }
      var requisites = function () {
        if (requisitesIsValid[0] > -1 &&
          requisitesIsValid[1] > -1 &&
          requisitesIsValid[2] > -1 &&
          requisitesIsValid[3] > -1) return true;
      }
      if (arrayIsValid() || requisites()) {
        return true;
      }
    };

    function readFor(line) {
      var requisiteTypeIsValid = line.toLowerCase().indexOf('for');
      var requisitesIsValid = [
        line.toLowerCase().indexOf('in'),
        line.toLowerCase().indexOf('of'),
        line.indexOf('('),
        line.indexOf(')'),
        line.indexOf('{')
      ];
      var requisites = function () {
        if (requisitesIsValid[0] == -1 &&
          requisitesIsValid[1] == -1 &&
          requisitesIsValid[2] > -1 &&
          requisitesIsValid[3] > -1 &&
          requisitesIsValid[4] > -1) return true;
      }
      var forIsValid = function () {
        var string = line;
        var equalIndex = string.indexOf('=');
        var stringLength = string.length;
        var stringValue = '';
        var i = equalIndex;
        for (; i < stringLength; i++) {
          var letter = string[i];
          if (letter != '=' && letter != ';') {
            stringValue += letter;
          }
        }
        var stringReplace = stringValue.replace(/\s{1,}/g, '');
        var stringReplace = stringValue.replace(/[\\", \\']/g, '');
        var stringReplace = stringValue.replace('undefined', '');

        function forIsOther() {
          var forComum = true;
          if (stringReplace.toLowerCase().indexOf('in') > -1) forComum = false;
          if (stringReplace.toLowerCase().indexOf('of') > -1) forComum = false;
          return forComum;
        };
        if (stringReplace.toLowerCase().indexOf('for') > -1 && forIsOther() && stringReplace.indexOf('(') > -1 && stringReplace.indexOf(')') > -1) {
          return true;
        }
      }
      if (forIsValid() || requisiteTypeIsValid > -1 && requisites()) {
        return true;
      }
    };

    function readBoolean(line) {
      var requisitesIsValid = [
        line.indexOf('('),
        line.indexOf(')'),
        line.toLowerCase().indexOf('new'),
        line.toLowerCase().indexOf('boolean')
      ];
      var requisites = function () {
        if (requisitesIsValid[0] > -1 && requisitesIsValid[1] > -1 &&
          requisitesIsValid[2] > -1 && requisitesIsValid[3] > -1) return true;
      }

      var booleanIsValid = function () {
        var string = line;
        var equalIndex = string.indexOf('=');
        var stringLength = string.length;
        var stringValue = '';
        var i = equalIndex;
        for (; i < stringLength; i++) {
          var letter = string[i];
          if (letter != '=' && letter != ';') {
            stringValue += letter;
          }
        }
        var stringReplace = stringValue.replace(/\s{1,}/g, '');
        var stringReplace = stringValue.replace(/[\\", \\']/g, '');
        if (stringReplace === "false" || stringReplace === "true") {
          return true;
        }
      }
      if (booleanIsValid() || requisites()) {
        return true;
      }
    };

    function readForin(line) {
      var requisiteTypeIsValid = line.toLowerCase().indexOf('for');
      var requisitesIsValid = [
        line.toLowerCase().indexOf('in'),
        line.indexOf('('),
        line.indexOf(')'),
        line.indexOf('{')
      ];
      var requisites = function () {
        if (requisitesIsValid[0] > -1 &&
          requisitesIsValid[1] > -1 &&
          requisitesIsValid[2] > -1 &&
          requisitesIsValid[3] > -1) return true;
      }
      var forinIsValid = function () {
        var string = line;
        var equalIndex = string.indexOf('=');
        var stringLength = string.length;
        var stringValue = '';
        var i = equalIndex;
        for (; i < stringLength; i++) {
          var letter = string[i];
          if (letter != '=' && letter != ';') {
            stringValue += letter;
          }
        }
        var stringReplace = stringValue.replace(/\s{1,}/g, '');
        var stringReplace = stringValue.replace(/[\\", \\']/g, '');
        var stringReplace = stringValue.replace('undefined', '');
        if (stringReplace.toLowerCase().indexOf('for') > -1 && stringReplace.toLowerCase().indexOf('in') > -1 &&
          stringReplace.indexOf('(') > -1 &&
          stringReplace.indexOf(')') > -1) {
          return true;
        }
      }
      if (forinIsValid() || requisiteTypeIsValid > -1 && requisites()) {
        return true;
      }
    };

    function readVariable(line) {
      var varIsValid = function () {
        var string = line;
        var stringLength = string.length;
        var stringValue = '';
        var i = 0;
        for (; i < stringLength; i++) {
          var letter = string[i];
          if (letter != '=' && letter != ';') {
            stringValue += letter;
          }
        }
        var stringReplace = stringValue.replace(/[\\", \\']/g, '');
        if (stringReplace.toLowerCase().indexOf('var') > -1) return true;
      }
      if (varIsValid()) {
        return true;
      }
    };

    function readRequire(line) {
      var requisiteTypeIsValid = line.toLowerCase().indexOf('require');
      var requisitesIsValid = [
        line.indexOf('('),
        line.indexOf(')')
      ];
      var requisites = function () {
        if (requisitesIsValid[0] > -1 &&
          requisitesIsValid[1] > -1) return true;
      }
      var requireValid = function () {
        var string = line;
        var equalIndex = string.indexOf('=');
        var stringLength = string.length;
        var stringValue = '';
        var i = equalIndex;
        for (; i < stringLength; i++) {
          var letter = string[i];
          if (letter != '=' && letter != ';') {
            stringValue += letter;
          }
        }
        var stringReplace = stringValue.replace(/\s{1,}/g, '');
        var stringReplace = stringValue.replace(/[\\", \\']/g, '');
        var stringReplace = stringValue.replace('undefined', '');
        if (stringReplace.toLowerCase().indexOf('require') > -1 && stringReplace.indexOf('(') > -1 && stringReplace.indexOf(')') > -1) {
          return true;
        }
      }
      if (requireValid() || requisiteTypeIsValid > -1 && requisites()) {
        return true;
      }
    };

    function readForof(line) {
      var requisiteTypeIsValid = line.toLowerCase().indexOf('for');
      var requisitesIsValid = [
        line.toLowerCase().indexOf('of'),
        line.indexOf('('),
        line.indexOf(')'),
        line.indexOf('{')
      ];
      var requisites = function () {
        if (requisitesIsValid[0] > -1 &&
          requisitesIsValid[1] > -1 &&
          requisitesIsValid[2] > -1 &&
          requisitesIsValid[3] > -1) return true;
      }
      var forofIsValid = function () {
        var string = line;
        var equalIndex = string.indexOf('=');
        var stringLength = string.length;
        var stringValue = '';
        var i = equalIndex;
        for (; i < stringLength; i++) {
          var letter = string[i];
          if (letter != '=' && letter != ';') {
            stringValue += letter;
          }
        }
        var stringReplace = stringValue.replace(/\s{1,}/g, '');
        var stringReplace = stringValue.replace(/[\\", \\']/g, '');
        var stringReplace = stringValue.replace('undefined', '');
        if (stringReplace.toLowerCase().indexOf('for') > -1 && stringReplace.toLowerCase().indexOf('of') > -1 &&
          stringReplace.indexOf('(') > -1 &&
          stringReplace.indexOf(')') > -1) {
          return true;
        }
      }
      if (forofIsValid() || requisiteTypeIsValid > -1 && requisites()) {
        return true;
      }
    };
  };

  /** 
   * @MVDebug {public}
   * @description Cria um arquivo com base nas linhas de favoritos.
   * @param fileName {string} o nome do arquivo.
   * @param filePath {string} o caminho do arquivo.
   * @param FLText {string} o texto das linhas favoritas.
   * @param FLTextEnd {string} o texto final das linhas favoritas.
   */
  function fileScanFL(fileName, filePath, FLText, FLTextEnd) {
    var fs = require('fs');
    var pluginPath = fileName;
    var filePath = localPath(filePath + '/') + pluginPath + '.js';
    var fl_active = null;
    var fl_lines = [];
    var fl_text = FLText.replace(/\s{1,}/g, '').trim().toLowerCase();
    var fl_text_end = FLTextEnd.replace(/\s{1,}/g, '').trim().toLowerCase();
    if (fl_text === fl_text_end) {
      var message = '%c O parâmetro {FLText: ' + fl_text_end + '} é igual ao parâmetro {FLTextEnd: ' + fl_text_end + '} ';
      return console.log(message, 'background: #800000; font-size: 120%; color: #ffffff');
    }
    if (fs.existsSync(filePath)) {
      const readline = require('readline');
      const readStream = fs.createReadStream(filePath);
      const rl = readline.createInterface({
        input: readStream
      });
      rl.on('line', function (line) {
        isFavoriteLine(line);
        if (fl_active) {
          fl_lines.push(line);
        }
      }).on('close', function () {
        var groupName = '%c ✰ Depuração das linhas favoritas(FL) para (' + '%c' + pluginPath + '.js' + '%c) está completo! ✰ ';
        writeFileSync();
      });

      function writeFileSync() {
        deleteFLTag();
        var timer = new Date();
        var dayMonth = timer.getDate();
        var numberMonth = timer.getMonth();
        var fullYear = timer.getFullYear();
        var hours = timer.getHours();
        var minutes = timer.getMinutes();
        var seconds = timer.getSeconds();
        var completeDate = dayMonth.padZero(2) + '_' + numberMonth.padZero(2) + '_' + fullYear.padZero(2);
        var completeHour = hours.padZero(2) + '_' + minutes.padZero(2) + '_' + seconds.padZero(2);

        var fl_path = localPath(pathFileDebuggExCodeRun()) + '\\' + 'CodeRun_file_' + pluginPath + '_date_' + completeDate + '_time_' + completeHour + '.js';
        fs.writeFileSync(fl_path, fl_lines.join('\r\n'));
      }

      function isFavoriteLine(line) {
        var string_fl_index = line.indexOf(fl_text);
        var string_fl_end_index = line.indexOf(fl_text_end);
        var string_fl_line = line.replace(/\s{1,}/g, '');
        var string_fl_line = string_fl_line.replace(/[\/, \/]/g, '');
        var string_fl_line_end = line.replace(/\s{1,}/g, '');
        var string_fl_line_end = string_fl_line_end.replace(/[\/, \/]/g, '');
        if (string_fl_line.trim().toLowerCase() == fl_text) {
          fl_active = true;
        }
        if (string_fl_line_end.trim().toLowerCase() == fl_text_end) {
          fl_active = false;
        }
      }

      function deleteFLTag() {
        var i = 0;
        var length = fl_lines.length;
        var tagIndex = [];
        var tagReplace = false;
        for (; i < length; i++) {
          var string_fl_value = fl_lines[i];
          var string_fl_index = string_fl_value.indexOf(fl_text);
          var string_fl_line = string_fl_value.replace(/\s{1,}/g, '');
          var string_fl_line = string_fl_line.replace(/[\/, \/]/g, '');
          if (string_fl_line.trim().toLowerCase() == fl_text) {
            tagIndex.push(i);
          }
        }
        tagIndex.filter(function (tag) {
          var date = new Date();
          var h = date.getHours().padZero(2);
          var m = date.getMinutes().padZero(2);
          var s = date.getSeconds().padZero(2);
          var hms = h + ':' + m + ':' + s;
          var d = date.getDate().padZero(2);
          var nm = date.getMonth().padZero(2);
          var fy = date.getFullYear().padZero(2);
          var dnf = d + '/' + nm + '/' + fy;
          if (!tagReplace) {
            fl_lines[tag] = '/**\n' +
              ' * Dr.Xamã\n' +
              ' * MVDebug v' + Imported["GS_debuggEx"] + '\n' +
              ' * --- --- --- ---' + '\n' +
              ' * Date: ' + dnf + '\n' +
              ' * Time: ' + hms + '\n' +
              ' */';
            tagReplace = true;
          } else {
            fl_lines[tag] = '';
          }
        });
      }
    }
  };

  /** 
   * @MVDebug {public}
   * @description Executa os scripts guardados na pasta "codeRun"
   * @param fullYear {number | array} o ano da pasta.
   * @param fileIndex {number | array} o índice do arquivo.
   */
  function runCode(fullYear, fileIndex) {
    var fs = require('fs');
    var pathfullYear = getfolderPath();
    var pathFileIndex = getFileIndex();

    function getfolderPath() {
      var pathArray = [];
      if (fullYear instanceof Array) {
        pathArray = fullYear;
      } else if (typeof fullYear == 'number') {
        pathArray.push(fullYear);
      } else {
        return null;
      }
      return pathArray;
    }

    function getFileIndex() {
      var pathArray = [];
      if (fileIndex instanceof Array) {
        pathArray = fileIndex;
      } else if (typeof fileIndex == 'number') {
        pathArray.push(fileIndex);
      } else {
        return null;
      }
      return pathArray;
    }

    function runCode(filePath, fileName, fileIndex) {
      var name = fileName;
      var url = filePath;
      var script = document.createElement('script');
      script.id = filePath;
      script.type = 'text/javascript';
      script.src = url;
      script.async = false;
      script.onerror = runCodeError.bind(this);
      script._url = url;
      if (codeAlreadyRun(script.src)) {
        var message = '%c O script(' + name + ') já está rodando! ';
        console.log(message, 'background: #ec0000; font-size: 120%; color: #ffffff');
        // var scriptId = document.getElementById(filePath);
        // scriptId.parentElement.removeChild(scriptId);
      } else {
        var message = '%c O arquivo com o índice(' + fileIndex + ') está rodando... ';
        console.log(message, 'background: #009300; font-size: 120%; color: #ffffff');
        document.body.appendChild(script);
        scriptsRun.push(script.src);
      }
    }

    function runCodeError(e) {
      var url = e.target._url;
      throw new Error('Não foi possível executar o código:' + url);
    };

    function codeAlreadyRun(scriptSrc) {
      var scriptRun = false;
      scriptsRun.filter(function (src) {
        if (src == scriptSrc) scriptRun = true;
      });
      return scriptRun;
    };

    if (pathfullYear && pathFileIndex) {
      var i = 0;
      var length = pathfullYear.length;
      for (; i < length; i++) {
        var folderPath = localPath('system/debuggEx/codeRun_' + pathfullYear);
        if (fs.existsSync(folderPath)) {
          var folderFiles = fs.readdirSync(folderPath);
          pathFileIndex.filter(function (fileIndex) {
            var file = folderFiles[fileIndex - 1];
            if (file) {
              var filePath = folderPath + '\\' + file;
              runCode(filePath, file, fileIndex);
            } else {
              var message = '%c O arquivo com o índice(' + fileIndex + ') não existe! ';
              console.log(message, 'background: #ec0000; font-size: 120%; color: #ffffff');
            }
          });
        }
      }
    } else {
      var groupName = '%c Os parâmetros não são suportados, function(runCode) ';
      console.group(groupName,
        'background: #ec0000; font-size: 120%; color: #ffffff'
      );
      var message = '%c Os parâmetros suportados são: number e array ';
      console.log(message, 'background: #ec0000; font-size: 120%; color: #ffffff');
      console.groupEnd(groupName);
    }
  };

  /** 
   * @MVDebug {public}
   * @description Mostra o arquivo na pasta do projeto.
   * @param fileName {string} o nome do arquivo.
   * @param filePath {string} o caminho do arquivo.
   * @param fileExtension {string} a extensão do arquivo.
   */
  function showfileInFolder(fileName, filePath, fileExtension) {
    if (typeof fileName == 'number' || typeof filePath == 'number' ||
      typeof fileExtension == 'number' || typeof fileName == 'object' ||
      typeof filePath == 'object' || typeof fileExtension == 'object') {
      var groupName = '%c Os parâmetros não são suportados, function (showfileInFolder) ';
      console.group(groupName,
        'background: #ec0000; font-size: 120%; color: #ffffff'
      );
      var message = '%c O parâmetro(fileName) é suportado: string ';
      console.log(message, 'background: #ec0000; font-size: 120%; color: #ffffff');
      var message = '%c O parâmetro(filePath) são suportados: string or boolean ';
      console.log(message, 'background: #ec0000; font-size: 120%; color: #ffffff');
      var message = '%c O parâmetro(fileExtension) é suportado: string ';
      console.log(message, 'background: #ec0000; font-size: 120%; color: #ffffff');
      console.groupEnd(groupName);
      return;
    }
    var fs = require('fs');
    if (!filePath || filePath == '') {
      var pathFile = localPath(fileName + '.' + fileExtension);
    } else {
      var pathFile = localPath(filePath) + '\\' + fileName + '.' + fileExtension;
    }
    if (fs.existsSync(pathFile)) {
      if (Utils.isNwjs()) {
        var gui = require('nw.gui');
        gui.Shell.showItemInFolder(pathFile);
      }
    } else {
      var message = '%c O arquivo (' + fileName + '.' + fileExtension + ') não existe! ';
      console.log(message, 'background: #ec0000; font-size: 120%; color: #ffffff');
    }
  };

  /** 
   * @MVDebug {public}
   * @description Crie uma estrutura padrão para o novo plugin.
   * @param fileName {string} o nome do arquivo.
   * @param fileConfig {{}} a configuração do arquivo.
   */
  function fileWriteDS(fileName, fileConfig) {
    fileConfig = fileConfig || {};
    if (typeof fileName != 'string' || typeof fileConfig != 'object') {
      var groupName = '%c Os parâmetros não são suportados, function (fileWriteDS) ';
      console.group(groupName,
        'background: #ec0000; font-size: 120%; color: #ffffff'
      );
      var message = '%c O parâmetro(fileName) é suportado: string ';
      console.log(message, 'background: #ec0000; font-size: 120%; color: #ffffff');
      var message = '%c O parâmetro(fileConfig) é suportado: object ';
      console.log(message, 'background: #ec0000; font-size: 120%; color: #ffffff');
      console.groupEnd(groupName);
      return;
    }
    var fs = require('fs');
    var folderPath = localPath(pathFileDebuggExCodePlugins());
    if (fs.existsSync(folderPath)) {
      var pathFile = folderPath + '\\' + fileName + '.js';
      var pluginName = fileConfig["pluginName"] || 'pluginName';
      var pluginFileAuthor = fileConfig["fileAuthor"] || 'author';
      var pluginFileName = fileConfig["fileName"] || fileName;
      var pluginFileVersion = fileConfig["fileVersion"] || '1.00';
      var pluginDescription = fileConfig["pluginDescription"] || 'Plugin Description.';
      var pluginParameterName = fileConfig["pluginParameter"] || 'paramName';
      var pluginParameterDescription = fileConfig["pluginParameterDescription"] || 'paramDesc';
      var pluginParameterValueDefault = fileConfig["pluginParameterValue"] || 'paramDefault';
      var pluginHelpIntroduction = fileConfig["pluginHelpIntroduction"] || 'Plugin introduction.';
      var pluginVariableNameSpace = fileConfig["pluginVariableNameSpace"] || 'VSP';
      var pluginNameSpace = fileConfig["pluginNameSpace"] || 'nameSpace';
      var pluginCodePrefix = fileConfig["pluginCodePrefix"] || '$';
      var pluginImportedName = fileConfig["pluginImportedName"] || fileName;
      var useStrict = 'use strict';
      var dataFile = [
        '//===============================================================================' + '\n' +
        '// ' + pluginName + '\n' +
        '// By ' + pluginFileAuthor + '\n' +
        '// ' + pluginFileName + '.js' + '\n' +
        '// Version: ' + pluginFileVersion + '\n' +
        '//===============================================================================',
        '/*\:' + '\n' +
        ' * @plugindesc v' + pluginFileVersion + '- ' + pluginDescription + '\n' + ' *' + '\n' +
        ' * @author ' + pluginFileAuthor + '\n' + ' *' + '\n' +
        ' * @param ' + pluginParameterName + '\n' +
        ' * @desc ' + pluginParameterDescription + '\n' +
        ' * @default ' + pluginParameterValueDefault + '\n' + ' *' + '\n' +
        ' * @help' + '\n' +
        ' * ============================================================================== ' + '\n' +
        ' *    Introduction' + '\n' +
        ' * ==============================================================================' + '\n' +
        ' * ' + pluginHelpIntroduction + '\n' +
        ' * ==============================================================================' + '\n' +
        ' *    Changelog (1)' + '\n' +
        ' * ==============================================================================' + '\n' +
        ' *  Version 1.00:' + '\n' +
        ' * - Finished Plugin!' + '\n' +
        ' */',
        '//===============================================================================' + '\n' +
        '// IMPORT PLUGIN' + '\n' +
        '//===============================================================================' + '\n' +
        'var Imported = Imported || {};' + '\n' +
        'Imported[' + pluginImportedName.toStringMarks(0) + '] = ' + pluginFileVersion.toStringMarks(0) + ';' + '\n\n' +
        'var ' + pluginVariableNameSpace + ' = ' + pluginVariableNameSpace + ' || {};' + '\n' +
        pluginVariableNameSpace + '.' + pluginNameSpace + ' = ' + pluginVariableNameSpace + '.' +
        pluginNameSpace + ' || {};' + '\n',
        '//===============================================================================' + '\n' +
        '// ' + pluginName.toUpperCase() + ' MODULE' + '\n' +
        '//===============================================================================' + '\n' +
        '(function(' + pluginCodePrefix + ') {' + '\n' + useStrict.toStringMarks(0) + ';' + '\n\n' +
        ' //-----------------------------------------------------------------------------' + '\n' +
        ' // Parameters' + '\n' +
        ' //' + '\n' +
        ' var params = PluginManager.parameters(' + pluginFileName.toStringMarks(1) + ');' + '\n' +
        ' console.log(params)' + '\n' +
        '})(' + pluginVariableNameSpace + '.' + pluginNameSpace + ');',
        '//===============================================================================' + '\n' +
        '//           ✰ Dr.Xamã ✰ KADOKAWA ✰ Yoji Ojima ✰ Degica ✰' + '\n' +
        '//==============================================================================='
      ];
      fs.writeFileSync(pathFile, dataFile.join('\r\n'));
      var parameters = {};
      parameters[pluginParameterName] = pluginParameterValueDefault;
      var plugin = {
        "description": 'v' + pluginFileVersion + '- ' + pluginDescription,
        "name": pluginFileName,
        "parameters": parameters,
        "status": true
      }
      PluginManager.setupDebugEx(plugin);
    }
  };

  /** 
   * @MVDebug {private}
   * @description Imprima um erro se não conseguir carregar o arquivo.
   */
  function onError(e) {
    var url = e.target._url;
    throw new Error('Failed to load: ' + url);
  };

  /** 
   * @MVDebug {public}
   * @description Carregue o arquivo no script.
   * @param fileName {string} o nome do arquivo.
   * @param filePath {string} o caminho do arquivo.
   */
  function loadScript(fileName, filePath) {
    var fs = require('fs');
    var pathFile = localPath(filePath);
    if (fs.existsSync(pathFile)) {
      var url = pathFile + '\\' + fileName + '.js';
      if (fs.existsSync(url)) {
        if (!loadScriptExist(url)) {
          var script = document.createElement('script');
          script.id = url;
          script.type = 'text/javascript';
          script.src = url;
          script.async = false;
          script.onerror = onError.bind(this);
          script._url = url;
          document.body.appendChild(script);
          scriptsLoad.push(script);
        }
      }
    }
  };

  /** 
   * @MVDebug {public}
   * @description Verifica se o script já está sendo executado.
   * @param filePath {string} o caminho do arquivo.
   */
  function loadScriptExist(filePath) {
    var existsSyncScript = scriptsLoad.filter(function (script) {
      if (script === filePath) return true;
    });
    return existsSyncScript.length > 0;
  };

  /** 
   * @MVDebug {public}
   * @description Pare a execução do script.
   * @param fileName {string} o nome do arquivo.
   * @param filePath {string} o caminho do arquivo.
   */
  function stopScriptExist(fileName, filePath) {
    var fs = require('fs');
    var pathFile = localPath(filePath);
    if (fs.existsSync(pathFile)) {
      var url = pathFile + '\\' + fileName + '.js';
      if (fs.existsSync(url)) {
        var existsSyncScript = scriptsLoad.filter(function (script) {
          if (script.id === url) return true;
        });
        if (existsSyncScript.length > 0) {
          var scriptId = document.getElementById(url);
          scriptId.parentElement.removeChild(scriptId);
          var indexOf = scriptsLoad.indexOf(scriptId);
          scriptsLoad.splice(indexOf, 1);
        }
      }
    }
  };

  //-----------------------------------------------------------------------------
  // MVDebug - IMPORT CODE
  //
  MVDebug.latestVersion = Imported["GS_debuggEx"];
  MVDebug.releaseDate = '20/10/2017';
  MVDebug.updateDate = '04/06/2018';
  MVDebug.updateCode = '041018rc';
  MVDebug.scriptRun = scriptsRun;
  MVDebug.scriptsLoad = scriptsLoad;
  MVDebug.fileScanType = fileScanType;
  MVDebug.fileScanFL = fileScanFL;
  MVDebug.runCode = runCode;
  MVDebug.fileWriteDS = fileWriteDS;
  MVDebug.showfileInFolder = showfileInFolder;
  MVDebug.loadScript = loadScript;
  MVDebug.loadScriptExist = loadScriptExist;
  MVDebug.stopScriptExist = stopScriptExist;
  MVDebug.computerUsername = computerUsername;
  MVDebug.github = url_github;
  MVDebug.goGithub = goGithub;
  MVDebug.setStepsSprite = console.setStepsSprite;

})(MVDebug);
//===============================================================================
//           ✰ Dr.Xamã ✰ KADOKAWA ✰ Yoji Ojima ✰ Degica ✰
//===============================================================================
/*~struct~InputKeyMapperStruct:
 * @param Numero da tecla
 * @desc O codigo da tecla
 * @type select
 * @default 8
 * @option backspace
 * @value 8
 * @option tab
 * @value 9
 * @option enter
 * @value 13
 * @option shift
 * @value 16
 * @option ctrl
 * @value 17
 * @option alt
 * @value 18
 * @option pause/break
 * @value 19
 * @option caps lock
 * @value 20
 * @option escape
 * @value 27
 * @option page up
 * @value 33
 * @option page down
 * @value 34
 * @option end
 * @value 35
 * @option home
 * @value 36
 * @option left arrow
 * @value 37
 * @option up arrow
 * @value 38
 * @option right arrow
 * @value 39
 * @option down arrow
 * @value 40
 * @option insert
 * @value 45
 * @option delete
 * @value 46
 * @option 0
 * @value 48
 * @option 1
 * @value 49
 * @option 2
 * @value 50
 * @option 3
 * @value 51
 * @option 4
 * @value 52
 * @option 5
 * @value 53
 * @option 6
 * @value 54
 * @option 7
 * @value 55
 * @option 8
 * @value 56
 * @option 9
 * @value 57
 * @option a
 * @value 65
 * @option b
 * @value 66
 * @option c
 * @value 67
 * @option d
 * @value 68
 * @option e
 * @value 69
 * @option f
 * @value 70
 * @option g
 * @value 71
 * @option h
 * @value 72
 * @option i
 * @value 73
 * @option j
 * @value 74
 * @option k
 * @value 75
 * @option l
 * @value 76
 * @option m
 * @value 77
 * @option n
 * @value 78
 * @option o
 * @value 79
 * @option p
 * @value 80
 * @option q
 * @value 81
 * @option r
 * @value 82
 * @option s
 * @value 83
 * @option t
 * @value 84
 * @option u
 * @value 85
 * @option v
 * @value 86
 * @option w
 * @value 87
 * @option x
 * @value 88
 * @option y
 * @value 89
 * @option z
 * @value 90
 * @option left window key
 * @value 91
 * @option right window key
 * @value 92
 * @option select key
 * @value 93
 * @option numpad 0
 * @value 96
 * @option numpad 1
 * @value 97
 * @option numpad 2
 * @value 98
 * @option numpad 3
 * @value 99
 * @option numpad 4
 * @value 100
 * @option numpad 5
 * @value 101
 * @option numpad 6
 * @value 102
 * @option numpad 7
 * @value 103
 * @option numpad 8
 * @value 104
 * @option numpad 9
 * @value 105
 * @option multiply
 * @value 106
 * @option add
 * @value 107
 * @option subtract
 * @value 109
 * @option decimal point
 * @value 110
 * @option divide
 * @value 111
 * @option f1
 * @value 112
 * @option f2
 * @value 113
 * @option f3
 * @value 114
 * @option f4
 * @value 115
 * @option f5
 * @value 116
 * @option f6
 * @value 117
 * @option f7
 * @value 118
 * @option f8
 * @value 119
 * @option f9
 * @value 120
 * @option f10
 * @value 121
 * @option f11
 * @value 122
 * @option f12
 * @value 123
 *
 * @param Nome da tecla
 * @desc O identificador da tecla
 * @type string
 * @default
 */