//==================================================================================================
// DrXama_pluginName.js
//==================================================================================================
/*:
 * @plugindesc v1.0.0 - pluginDesc
 *
 * @author Dr.Xamã
 * 
 * @help
 * ================================================================================
 *    Introdução
 * ================================================================================
 * PluginDesc
 * ================================================================================
 *    Atualização
 * ================================================================================
 * Para atualizar esse plugin vá no Github do Dr.Xamã!
 * - https://gs-game-words.github.io/Dr.Xama---RPG-MAKER-MV/
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
			return Graphics.printError('Dr.Xamã', 'Atualmente seu RPG MAKER MV não suporta o seguinte plugin: DrXama_pluginName'), SceneManager.stop();
	}
};
DX.pluginName = DX.pluginName || {
	'update': function () { return require('nw.gui').Shell.openExternal('https://raw.githubusercontent.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/master/plugins/DrXama_pluginName.js'); },
	'changelog': function () { return require('nw.gui').Shell.openExternal('https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV/blob/master/changelog/DrXama_pluginName.md'); },
	'version': function () { return console.log('v1.0.0') }
};
(function () {
    "use strict";
})();
/* --------------------------------------------------------------------------------
 * ================================================================================
 *    Dr.Xamã © 2018-2019, Todos os direitos reservados.
 * ================================================================================
 */ -------------------------------------------------------------------------------
