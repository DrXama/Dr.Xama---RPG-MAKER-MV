//==================================================================================================
// DrXama_updateManager.js
//==================================================================================================
/*:
 * @plugindesc v1.01 - Gerenciador de atualizações
 *
 * @author Dr.Xamã
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
 *    Suporte
 * ================================================================================
 * Algumas linha das funções do script estão detalhadas, dessa forma o suporte é 100%
 * Se você é um programador, fique a vontade para configurar como quiser, caso
 * não saiba programação, não altere nada, crie um topico de duvida na 4Tabern:
 * http://4tabern.com/ e no fórum Condado Braveheart
 * Perfil: http://www.condadobraveheart.com/forum/index.php?action=profile;u=1870
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

    //-----------------------------------------------------------------------------
    // Variaveis globais
    //
    // Armazena os arquivos que estão sendo baixados
    var _filesDownloadCache = [],
        _sceneUpdateAlrady = null;
    // Adiciona o arquivo ao cache de download
    const _filesDownloadCache_add = function (nome, downloadNome, pasta) {
        _filesDownloadCache.push({
            "nome": nome,
            "downloadNome": downloadNome,
            "pasta": pasta
        });
    };
    // Retira o arquivo do cache de download
    const _filesDownloadCache_remove = function (nome) {
        var index = 0;
        _filesDownloadCache.forEach(function (file) {
            if (file["nome"] == nome) {
                return index = _filesDownloadCache.indexOf(file);
            }
        });
        _filesDownloadCache.splice(index, 1);
    };
    // Move o arquivo para o caminho de destino
    const _filesDownloadCache_move = function (nome) {
        // Importa o metodo File System do Node
        var fs = require('fs');
        // Cria o caminho para a pasta de updates
        var folderDest = localPath('system/updates');
        // Cria o caminho para a pasta de download
        var folderDestDownload = `${folderDest}/download`;
        var index = 0;
        _filesDownloadCache.forEach(function (file) {
            if (file["nome"] == nome) {
                return index = _filesDownloadCache.indexOf(file);
            }
        });
        // Recupera o nome do arquivo na pasta de download
        var fileDownloadName = _filesDownloadCache[index]["downloadNome"];
        // Cria o caminho para o arquivo associado a pasta de downloads
        var fileDest = `${folderDestDownload}\\${fileDownloadName}`;
        var fileDestFolder = localPath(_filesDownloadCache[index]["pasta"])
        var fileDestNew = `${fileDestFolder}\\${fileDownloadName}`;
        // Verifica se o arquivo ainda está na pasta download
        if (fs.existsSync(fileDest)) {
            // Copia e cola o arquivo no caminho do arquivo
            var file = fs.createReadStream(fileDest).pipe(fs.createWriteStream(fileDestNew));
            file.on('finish', function () {
                file.close();
                // Remove o arquivo do cache de download
                _filesDownloadCache_remove(_filesDownloadCache[index]["nome"]);
                // Verifica se o caminho do arquivo existe
                if (localPathExists('system/updates/download')) {
                    // Remove o arquivo
                    localPathRemove('system/updates/download', fileDownloadName);
                }
            });
        } else {
            // Remove o arquivo do cache de download
            _filesDownloadCache_remove(_filesDownloadCache[index]["nome"]);
            // Configura o download do arquivo para não completo
            StorageManager.updateManager_setFileDownloadNotComplete(_filesDownloadCache[index]["nome"]);
        }
    };

    //-----------------------------------------------------------------------------
    // Funções
    //

    // Verifica se a string é igual a outra string
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

    // Retorna o caminho local para o arquivo/pasta
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

    // Cria o caminho local
    function localPathCreate(p) {
        var fs = require('fs');
        var i = 0;
        var length = p.length;
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
                if (!fs.existsSync(localPath(pathsJoin))) {
                    fs.mkdirSync(localPath(pathsJoin));
                }
                pathString = '';
            }
        }
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

    // Cria a pasta do sistema
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

    // Deleta a pasta dos downloads
    function deleteDownloadFolder() {
        var fs = require('fs');
        var path = require('path');
        var path_folderUpdatesDownload = localPath('system/updates/download');
        if (fs.existsSync(path_folderUpdatesDownload)) {
            fs.rmdirSync(path_folderUpdatesDownload);
        }
    };

    // Baixa o arquivo para verificar atualizações
    function downloadUpdateFile() {
        var fs = require('fs');
        var http = null;
        var fileUrl = updateFileURL;
        var folderDest = localPath('system/updates');
        var fileDest = `${folderDest}\\${updateFileName}.json`;
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
                    deleteUpdateFiles();
                    downloadUpdateFiles();
                    createUpdateChangeLog();
                });
            }).on('error', function (err) {
                fs.unlink(fileDest);
            });
        }
    };

    // Verifica a exclusão de arquivos/pastas
    function deleteUpdateFiles() {
        // Importa o metodo File System do Node
        var fs = require('fs');
        // Cria o caminho para a pasta de updates
        var folderDest = localPath('system/updates');
        // Cria o caminho para o arquivo de atualizações
        var fileDest = `${folderDest}\\${updateFileName}.json`;
        // Verifica se existe o arquivo de atualizações
        if (fs.existsSync(fileDest)) {
            // Carrega o arquivo de atualizações
            var fileUpdate = (function () {
                var data = fs.readFileSync(fileDest, { encoding: 'utf8' });
                var dataParse = JSON.parse(data) || {};
                return dataParse;
            })();
            // Verifica se existe o arquivo de save das atualizações
            if (StorageManager.updateManager_exists()) {
                // Carrega o arquivo de save das atualizações
                StorageManager.updateManager_load();
                let versao = fileUpdate["Status"]["versão"];
                let nome = fileUpdate["Status"]["nome"];
                // Verifica se o arquivo de save da atualização tem a mesma
                // versão da atualização atual
                if (StorageManager.updateManager_versionIsVersion(versao)) {
                    // Remove os arquivos armazenados
                    removeFilesSave();
                    // Remove as pastas armazenadas
                    removeFoldersSave();
                    return console.info(`A remoção dos arquivos/pastas da atualização: ${nome} já estão armazenados`);
                }
            }
            // Remove os arquivos
            removeFiles();
            // Remove as pastas
            removeFolders();
            // Remove os arquivos
            function removeFiles() {
                // Verifica se os Arquivos para remoção tem um valor valido
                if (fileUpdate["Remover"] && fileUpdate["Remover"] instanceof Array === true) {
                    // Verifica se a quantia de Arquivos para remoção é maior que 0
                    if (fileUpdate["Remover"].length > 0) {
                        fileUpdate["Remover"].forEach(function (file) {
                            // Armazena o caminho para o arquivo
                            var pathFolder = file["pasta"];
                            // Armazena o nome do arquivo
                            var pathFile = `${file["nome"]}.${file["tipo"]}`;
                            // Verifica se o caminho do arquivo existe
                            if (localPathExists(pathFolder)) {
                                // Remove o arquivo
                                localPathRemove(pathFolder, pathFile);
                                // Cria as variaveis de save do arquivo de remoção
                                var nome = file["nome"],
                                    tipo = file["tipo"],
                                    pasta = file["pasta"];
                                // Salva o arquivo de remoção
                                StorageManager.updateManager_setFileRemove(nome, tipo, pasta);
                            }
                        });
                    }
                }
            }
            // Remove os arquivos armazenados
            function removeFilesSave() {
                // Verifica se os Arquivos de save para remoção tem um valor valido
                if (StorageManager.updateManager_storage["Remover"] && StorageManager.updateManager_storage["Remover"] instanceof Array === true) {
                    // Verifica se a quantia de Arquivos de save para remoção é maior que 0
                    if (StorageManager.updateManager_storage["Remover"].length > 0) {
                        StorageManager.updateManager_storage["Remover"].forEach(function (file) {
                            // Armazena o caminho para o arquivo
                            var pathFolder = file["pasta"];
                            // Armazena o nome do arquivo
                            var pathFile = `${file["nome"]}.${file["tipo"]}`;
                            // Verifica se o caminho do arquivo existe
                            if (localPathExists(pathFolder)) {
                                // Remove o arquivo
                                localPathRemove(pathFolder, pathFile);
                            }
                        });
                    }
                }
            }
            // Remove as pastas
            function removeFolders() {
                // Verifica se os Pastas para remoção tem um valor valido
                if (fileUpdate["Remover_Pastas"] && fileUpdate["Remover_Pastas"] instanceof Array === true) {
                    // Verifica se as Pastas para remoção é maior que 0
                    if (fileUpdate["Remover_Pastas"].length > 0) {
                        fileUpdate["Remover_Pastas"].forEach(function (file) {
                            // Armazena o caminho para a pasta raiz
                            var pathFolder = file["pasta"];
                            // Armazena o caminho para a pasta associado a pasta raiz
                            var folderName = `${pathFolder}/${file["nome"]}`;
                            // Verifica se o caminho para a pasta raiz existe
                            if (localPathExists(pathFolder)) {
                                // Remove a pasta
                                localPathRemove(folderName);
                                // Variaveis de save da pasta
                                var nome = file["nome"],
                                    pasta = file["pasta"];
                                // Salva a pasta de remoção
                                StorageManager.updateManager_setFolderRemove(nome, pasta);
                            }
                        });
                    }
                }
            }
            // Remove as pastas armazenadas
            function removeFoldersSave() {
                // Verifica se os Pastas de save para remoção tem um valor valido
                if (StorageManager.updateManager_storage["Remover_Pastas"] && StorageManager.updateManager_storage["Remover_Pastas"] instanceof Array === true) {
                    // Verifica se as Pastas de save para remoção é maior que 0
                    if (StorageManager.updateManager_storage["Remover_Pastas"].length > 0) {
                        StorageManager.updateManager_storage["Remover_Pastas"].forEach(function (file) {
                            // Armazena o caminho para a pasta raiz
                            var pathFolder = file["pasta"];
                            // Armazena o caminho para a pasta associado a pasta raiz
                            var folderName = `${pathFolder}/${file["nome"]}`;
                            // Verifica se o caminho para a pasta raiz existe
                            if (localPathExists(pathFolder)) {
                                // Remove a pasta
                                localPathRemove(folderName);
                            }
                        });
                    }
                }
            }
        }
    };

    // Baixa os arquivos da atualização
    function downloadUpdateFiles() {
        // Importa o metodo File System do Node
        var fs = require('fs');
        // Cria o caminho para a pasta de updates
        var folderDest = localPath('system/updates');
        // Cria o caminho para a pasta de download
        var folderDestDownload = `${folderDest}/download`;
        // Cria o caminho para o arquivo de atualizações
        var fileDest = `${folderDest}\\${updateFileName}.json`;
        // Cria a variavel http do modulo http do Node
        var http = null;
        // Verifica se o arquivo de atualizações existe
        if (fs.existsSync(fileDest)) {
            // Carrega o arquivo de atualizações
            var fileUpdate = (function () {
                var data = fs.readFileSync(fileDest, { encoding: 'utf8' });
                var dataParse = JSON.parse(data) || {};
                return dataParse;
            })();
            // Verifica se existe o arquivo de save das atualizações
            if (StorageManager.updateManager_exists()) {
                // Carrega o arquivo de save das atualizações
                StorageManager.updateManager_load();
                let versao = fileUpdate["Status"]["versão"];
                let nome = fileUpdate["Status"]["nome"];
                // Verifica se o arquivo de save da atualização tem a mesma
                // versão da atualização atual para baixar
                if (!StorageManager.updateManager_versionIsVersion(versao)) {
                    // Configura a versão do arquivo de save da atualização
                    // para a versão atual da atualização
                    StorageManager.updateManager_setVersion(versao);
                }
                if (StorageManager.updateManager_storage["Arquivos"].length > 0) {
                    // Faz/Verifica os downloads
                    verifyDownloadFiles();
                    return console.info(`Os arquivos da atualização: ${nome} já estão armazenados`);
                }
            }
            // Verifica se a pasta de downloads existe
            if (!fs.existsSync(folderDestDownload)) {
                // Cria a pasta de downloads
                fs.mkdirSync(folderDestDownload);
            }
            // Faz os downloads
            downloadFiles();
            // Faz os downloads
            function downloadFiles() {
                // Verifica se os Arquivos da atualização tem um valor valido
                if (fileUpdate["Arquivos"] && fileUpdate["Arquivos"] instanceof Array === true) {
                    // Verifica se a quantia de arquivos da atualização é maior que 0
                    if (fileUpdate["Arquivos"].length > 0) {
                        fileUpdate["Arquivos"].forEach(function (file) {
                            // Cria o caminho para o arquivo
                            var pathFile = `${file["nome"]}.${file["tipo"]}`;
                            // Cria o caminho do arquivo associado a pasta downloads
                            var pathFileDest = `${folderDestDownload}\\${pathFile}`;
                            // Cria o link do arquivo
                            var fileUrl = file["link"];
                            // Verifica se o link do arquivo exige o metodo HTTPS ou HTTP do Node
                            if (fileUrl.substring(0, 5).match(/https/)) {
                                http = require('https');
                            } else {
                                http = require('http');
                            }
                            // Verifica se já existe o arquivo
                            if (fs.existsSync(pathFileDest)) {
                                // Remove o arquivo
                                fs.unlinkSync(pathFileDest)
                            }
                            // Cria o arquivo para baixar
                            fs.writeFileSync(pathFileDest, '');
                            // Define as variaveis de save do arquivo da atualização
                            var fileName = file["nome"],
                                fileVersao = file["versão"],
                                fileTipo = file["tipo"],
                                filePasta = file["pasta"],
                                fileLink = file["link"];
                            // Salva o arquivo da atualização
                            StorageManager.updateManager_setFile(fileName, fileVersao, fileTipo, filePasta, fileLink);
                            // Salva o download do arquivo no cache
                            var downloadNome = `${file["nome"]}.${file["tipo"]}`;
                            // Cria um arquivo que pode ter sua data alterada depois de sua criação
                            var file = fs.createWriteStream(pathFileDest);
                            _filesDownloadCache_add(fileName, downloadNome, filePasta);
                            // Cria o download do arquivo
                            var request = http.get(fileUrl, function (response) {
                                // Altera a data do arquivo
                                response.pipe(file);
                                // Verifica se o arquivo está completo
                                file.on('finish', function () {
                                    // Fecha o arquivo
                                    file.close();
                                    // Move o arquivo para o caminho de destino
                                    _filesDownloadCache_move(fileName);
                                    // Configura o download do arquivo para completo
                                    StorageManager.updateManager_setFileDownloadComplete(fileName);
                                    // Verifica se o arquivo deu erro
                                }).on('error', function (err) {
                                    // Fecha a conexão de download
                                    response.destroy();
                                });
                                // Verifica se a conexão deu erro
                            }).on('error', function (err) {
                                // Remove o arquivo
                                fs.unlinkSync(pathFileDest);
                            });
                        });
                    }
                }
            }
            // Faz/Verifica os downloads
            function verifyDownloadFiles() {
                // Verifica se os Arquivos de save da atualização tem um valor valido
                if (StorageManager.updateManager_storage["Arquivos"] && StorageManager.updateManager_storage["Arquivos"] instanceof Array === true) {
                    // Verifica se a quantia de arquivos de save da atualização é maior que 0
                    if (StorageManager.updateManager_storage["Arquivos"].length > 0) {
                        StorageManager.updateManager_storage["Arquivos"].forEach(function (file) {
                            // Variavel que armazena o status de download do arquivo
                            var fileDownload = file["download"];
                            // Verifica se o status de download não está completo
                            if (!fileDownload) {
                                // Cria o caminho do arquivo
                                var pathFile = `${file["nome"]}.${file["tipo"]}`;
                                // Cria o caminho do arquivo associado a pasta download
                                var pathFileDest = `${folderDestDownload}\\${pathFile}`;
                                // Cria o link do arquivo
                                var fileUrl = file["link"];
                                // Verifica se o link do arquivo exige o metodo HTTPS ou HTTP do Node
                                if (fileUrl.substring(0, 5).match(/https/)) {
                                    http = require('https');
                                } else {
                                    http = require('http');
                                }
                                // Verifica se já existe o arquivo
                                if (fs.existsSync(pathFileDest)) {
                                    // Remove o arquivo
                                    fs.unlinkSync(pathFileDest)
                                }
                                // Cria o arquivo para baixar
                                fs.writeFileSync(pathFileDest, '');
                                // Armazena o nome do arquivo
                                var fileName = file["nome"];
                                var filePasta = file["pasta"];
                                // Salva o download do arquivo no cache
                                var downloadNome = `${file["nome"]}.${file["tipo"]}`;
                                // Cria um arquivo que pode ter sua data alterada depois de sua criação
                                var file = fs.createWriteStream(pathFileDest);
                                _filesDownloadCache_add(fileName, downloadNome, filePasta);
                                // Cria o download do arquivo
                                var request = http.get(fileUrl, function (response) {
                                    // Altera a data do arquivo
                                    response.pipe(file);
                                    // Verifica se o arquivo está completo
                                    file.on('finish', function () {
                                        // Fecha o arquivo
                                        file.close();
                                        // Move o arquivo para o caminho de destino
                                        _filesDownloadCache_move(fileName);
                                        // Configura o download do arquivo para completo
                                        StorageManager.updateManager_setFileDownloadComplete(fileName);
                                        // Verifica se o arquivo deu erro
                                    }).on('error', function (err) {
                                        // Fecha a conexão de download
                                        response.destroy();
                                    });
                                    // Verifica se a conexão deu erro
                                }).on('error', function (err) {
                                    // Remove o arquivo
                                    fs.unlinkSync(pathFileDest);
                                });
                            }
                        });
                    }
                }
            }
        }
    };

    // Remove o arquivo da atualização
    function deleteDownloadUpdateFile() {
        // Importa o metodo File System do Node
        var fs = require('fs');
        // Cria o caminho para a pasta de updates
        var folderDest = localPath('system/updates');
        // Cria o caminho para a pasta de download
        var folderDestDownload = `${folderDest}/download`;
        // Cria o caminho para o arquivo de atualizações
        var fileDest = `${folderDest}\\${updateFileName}.json`;
        if (fs.existsSync(fileDest)) {
            fs.unlinkSync(fileDest);
        }
    };

    // Cria o arquivo de mudanças o famoso LOG
    function createUpdateChangeLog() {
        // Importa o metodo File System do Node
        var fs = require('fs');
        // Cria o caminho para a pasta de updates
        var folderDest = localPath('system/updates');
        // Cria o caminho para o arquivo de atualizações
        var fileDest = `${folderDest}\\${updateFileName}.json`;
        // Carrega o arquivo de atualizações
        var fileUpdate = (function () {
            var data = fs.readFileSync(fileDest, { encoding: 'utf8' });
            var dataParse = JSON.parse(data) || {};
            return dataParse;
        })();
        // Cria o caminho para o arquivo de atualizações
        var fileDest = `${folderDest}\\log_${fileUpdate["Status"]["versão"]}.txt`;
        var fileData = 'GERENCIADOR DE ATUALIZAÇÕES POR DR.XAMÃ\r\n';
        fileData += `\r\nLOG DE DESENVOLVIMENTO\r\n\r\nATUALIZAÇÂO: ${fileUpdate["Status"]["nome"]}\r\n\r\nVERSÂO: ${fileUpdate["Status"]["versão"]}\r\n\r\nDESCRIÇÂO: ${fileUpdate["Status"]["descrição"]}\r\n\r\nMUDANÇAS:`;
        fileUpdate["Status"]["mudanças"].forEach(function (string) {
            fileData += `\r\n- ${string}`;
        });
        var file = fs.writeFileSync(fileDest, fileData.trim());
    };

    //-----------------------------------------------------------------------------
    // StorageManager
    //
    StorageManager.updateManager_storage = {
        "Arquivos": Array(),
        "Remover": Array(),
        "Remover_Pastas": Array(),
        "Versão": String()
    };

    StorageManager.updateManager_setFolderRemove = function (nome, pasta) {
        StorageManager.updateManager_storage["Remover_Pastas"].push({
            "nome": nome,
            "pasta": pasta
        });
        this.updateManager_save();
    };

    StorageManager.updateManager_setFileRemove = function (nome, tipo, pasta) {
        StorageManager.updateManager_storage["Remover"].push({
            "nome": nome,
            "tipo": tipo,
            "pasta": pasta
        });
        this.updateManager_save();
    };

    StorageManager.updateManager_setVersion = function (versao) {
        StorageManager.updateManager_storage["Versão"] = versao;
    };

    StorageManager.updateManager_versionIsVersion = function (versao) {
        return StorageManager.updateManager_storage["Versão"] != versao;
    };

    StorageManager.updateManager_setFile = function (nome, versao, tipo, pasta, link) {
        StorageManager.updateManager_storage["Arquivos"].push({
            "nome": nome,
            "versão": versao,
            "tipo": tipo,
            "pasta": pasta,
            "link": link,
            "download": false
        });
        this.updateManager_save();
    };

    StorageManager.updateManager_setFileDownloadComplete = function (nome) {
        StorageManager.updateManager_storage["Arquivos"].forEach(function (file) {
            if (file["nome"] == nome) {
                file["download"] = true;
            }
        });
        this.updateManager_save();
    };

    StorageManager.updateManager_setFileDownloadNotComplete = function (nome) {
        StorageManager.updateManager_storage["Arquivos"].forEach(function (file) {
            if (file["nome"] == nome) {
                file["download"] = false;
            }
        });
        this.updateManager_save();
    };

    StorageManager.updateManager_save = function () {
        this.updateManager_saveToLocalFile();
    };

    StorageManager.updateManager_load = function () {
        this.updateManager_loadFromLocalFile();
    };

    StorageManager.updateManager_exists = function () {
        return this.updateManager_localFileExists();
    };

    StorageManager.updateManager_localFileExists = function () {
        var fs = require('fs');
        var dirPath = this.localFileDirectoryPath();
        var filePath = `${dirPath}updateManager.rpgsave`;
        return fs.existsSync(filePath);
    };

    StorageManager.updateManager_saveToLocalFile = function () {
        var data = LZString.compressToBase64(JSON.stringify(StorageManager.updateManager_storage));
        var fs = require('fs');
        var dirPath = this.localFileDirectoryPath();
        var filePath = `${dirPath}updateManager.rpgsave`;
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        fs.writeFileSync(filePath, data);
    };

    StorageManager.updateManager_loadFromLocalFile = function () {
        var data = null;
        var fs = require('fs');
        var dirPath = this.localFileDirectoryPath();
        var filePath = `${dirPath}updateManager.rpgsave`;
        if (fs.existsSync(filePath)) {
            data = fs.readFileSync(filePath, { encoding: 'utf8' });
        }
        if (!data) return;
        StorageManager.updateManager_storage = JSON.parse(LZString.decompressFromBase64(data));
    };

    //-----------------------------------------------------------------------------
    // Scene_Base
    //
    const Scene_Base_start = Scene_Base.prototype.start;
    Scene_Base.prototype.start = function () {
        Scene_Base_start.call(this);
        if (!_sceneUpdateAlrady) {
            createSystemFolders();
            downloadUpdateFile();
            this.drawLoadUpdate();
        }
    };

    Scene_Base.prototype.clearUpdateDownload = function () {
        deleteDownloadFolder();
        deleteDownloadUpdateFile();
    };

    const Scene_Base_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function () {
        Scene_Base_update.call(this);
        if (!_sceneUpdateAlrady) {
            this.updateLoadUpdate();
            this.updateFilesDownloadCache();
            this.updateSoundScene();
        }
    };

    Scene_Base.prototype.drawLoadUpdate = function () {
        this._loadUpdateSprite = [new Sprite(), new Sprite()];
        this._loadUpdateSprite[0].bitmap = new Bitmap(Graphics.width, Graphics.height);
        this._loadUpdateSprite[0].bitmap.fillAll('black');
        this._loadUpdateSprite[1].bitmap = ImageManager.loadSystem('Loading');
        this._loadUpdateSprite[1].x = Graphics.width / 2;
        this._loadUpdateSprite[1].y = Graphics.height / 2;
        this._loadUpdateSprite[1].anchor.x = 0.5;
        this._loadUpdateSprite[1].anchor.y = 0.5;
        this.addChild(this._loadUpdateSprite[0]);
        this.addChild(this._loadUpdateSprite[1]);
    };

    Scene_Base.prototype.updateLoadUpdate = function () {
        if (this._loadUpdateSpriteHideIsOn) {
            if (this._loadUpdateSprite[1].opacity > 0) {
                this._loadUpdateSprite[1].opacity -= 4;
            } else {
                if (this._loadUpdateSprite[0].opacity > 0) {
                    this._loadUpdateSprite[0].opacity -= 4;
                }
            }
            if (this._loadUpdateSprite[0].opacity <= 0 && this._loadUpdateSprite[1].opacity <= 0) {
                this.clearUpdateDownload();
                _sceneUpdateAlrady = true;
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

    Scene_Base.prototype.updateFilesDownloadCache = function () {
        if (this._filesDownloadCacheDelay === undefined) {
            this._filesDownloadCacheDelay = 120;
        }
        if (_filesDownloadCache.length <= 0) {
            if (this._filesDownloadCacheDelay > 0) {
                this._filesDownloadCacheDelay -= 0.60;
            } else {
                this._loadUpdateSpriteHideIsOn = true;
            }
        } else { this._filesDownloadCacheDelay = undefined; }
    };

    Scene_Base.prototype.updateSoundScene = function () {
        if (AudioManager._currentBgm) {
            this._currentReplayBGM = AudioManager.saveBgm();
            AudioManager.fadeOutBgm(1);
        }
        if (_sceneUpdateAlrady)
            AudioManager.replayBgm(this._currentReplayBGM);
    };
})();