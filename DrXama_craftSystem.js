//==================================================================================================
// DrXama_craftSystem.js
//==================================================================================================
/*:
 * @plugindesc v1.00 - Sistema de craft do Dr.Xamã
 *
 * @author Dr.Xamã
 * 
 * @param Lista de receitas
 * @desc Lista de receitas do sistema
 * @type struct<Lista>[]
 * @default []
 * 
 * @help
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Crie suas receitas de craft e tenha a eficiente de um sistema de craft ;)
 * Deixe o jogador sentir a emoção de criar uma receita!!!
 * 
 * Um sistema complexo e objetivo, com textos intuitivos para facilitar a criação
 * de novas receitas.
 * ================================================================================
 *    Texto de conclusão
 * ================================================================================
 * Você pode usar o comando ${nome} para retornar o nome da receita
 * ================================================================================
 *    Tipo de classe
 * ================================================================================
 * Você pode deixar a lista vazia para possibilitar todas as classes de preparar a 
 * receita, caso você deixe algum item na lista com o Id 0(None) o sistema assume
 * o valor 1
 * ================================================================================
 *    Valor da variável de conclusão
 * ================================================================================
 * Formato válido de valores:
 * Valores primitivos:
 * string - meu texto...
 * number - 1234...
 * array - ["elemento_1", "elemento_2", "elemento_3"]...
 * boolean - true/false
 *  --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
 * Valores do MV:
 * Variável - v: 1
 * Aleatório - al: ??? a ??? (- ou +)
 * Quantidade do item no inventario - it: 1
 * Quantidade da arma no inventario - ar: 1
 * Quantidade da armadura no inventario - arm: 1
 *  --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
 * - Propriedades dos atores:
 *   - Coloque o Id do ator.
 * Level do ator - atl: 1
 * EXP do ator - atp: 1
 * HP do ator - ath: 1
 * MP do ator - atm: 1
 * Máximo de HP do ator - atmh: 1
 * Máximo de MP do ator - atmm: 1
 * Ataque do ator - ata: 1
 * Defesa do ator - atd: 1
 * Máximo de Ataque do ator - atma: 1
 * Máximo de Defesa do ator - atmd: 1
 * Agilidade do ator - atal: 1
 * Sorte do ator - ats: 1
 * - --- --- --- --- --- --- --- --- --- --- --- --- ---
 * - Propriedades do Personagem(Deve está no mesmo mapa que o jogador):
 *   - Coloque o Id do evento ou escreva Player para pegar o id do jogador.
 * Mapa X do personagem - psmx: Player
 * Mapa Y do personagem - psmy: Player
 * Direção do personagem - psd: Player
 * Tela X do personagem - pstx: Player
 * Tela Y do personagem - psty: Player
 *  --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
 * - Propriedades do Grupo:
 *   - Limite de membros no grupo são 8
 * ID do membro 1(Líder) - gid: 1 
 * ID do membro 2 - gid: 2
 * ID do membro 3 - gid: 3
 * ID do membro 4 - gid: 4
 * ID do membro 5 - gid: 5
 * ID do membro 6 - gid: 6
 * ID do membro 7 - gid: 7
 * ID do membro 8 - gid: 8
 *  --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
 * - Outras Propriedades:
 * ID do mapa: :idmap:
 * Total de membros no grupo: :gmg:
 * Dinheiro do grupo: :gg:
 * Passos do grupo: :gp:
 * Tempo de jogo: :gtj:
 * Temporizador: :gt:
 * Total de saves: :gts:
 * Total de batalhas: :gtb:
 * Total de vitorias: :gtv:
 * Total de escapatórias: :gte:
 *  --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
 * Qualquer outro tipo de valor é configurado para string.
 * Caso você tenha alguma dúvida me envie uma mensagem no fórum Condado Braveheart
 * Perfil: http://www.condadobraveheart.com/forum/index.php?action=profile;u=1870
 * ================================================================================
 *    Atualização
 * ================================================================================
 * Para atualizar esse plugin vá no github do Dr.Xamã
 * https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV
 * ================================================================================
 *    Suporte
 * ================================================================================
 * Os comandos a seguir devem ser usados enquanto a receita está sendo preparada!
 * - Retorna a receita em preparo:
 * $gameSystem.craftSystem_recipeCraftActive();
 *
 * - Retorna se o preparo foi finalizado:
 * $gameSystem.craftSystem_recipeCraftIsComplete();
 *
 * - Retorna os itens obtidos pela receita:
 * $gameSystem.craftSystem_recipeCraftItemsObtidos(); 
 *
 * - Retorna os ingredientes retirados pela receita:
 * $gameSystem.craftSystem_recipeCraftItemsRetirados();
 */
/*~struct~Lista:
 * @param Nome
 * @desc Qual o nome da sua receita?
 * @type string
 * @default Receita do DrXama
 * 
 * @param Descrição 
 * @desc Qual a descrição da sua receita?
 * - O sistema reconhece 2 linhas
 * @type note
 * @default "Receita para testar o sistema\nFeita por mim e pelo Dr.Xamã"
 * 
 * @param Tipo de classe
 * @desc Quais as classes que podem preparar sua receita?
 * - O lider do grupo deve ter a classe indicada
 * @type class[]
 * @default ["1", "2"]
 * 
 * @param Obtem
 * @desc O que sua receita devolve para o jogador?
 * @type struct<ObtemLista>[]
 * @default []
 * 
 * @param Lista de ingredientes
 * @desc Quais os ingredientes da sua receita?
 * @type struct<IngredientesLista>[]
 * @default []
 * 
 * @param Tempo de preparo
 * @desc Quanto tempo leva para preparar sua receita?
 * - 60(frames) = 1(segundo), 0(frames) = 0(instantâneo)
 * @type number
 * @min 0
 * @default 60
 * 
 * @param Texto de conclusão
 * @desc Qual o texto que deve ser exibido quando o preparo acabar?
 * - ${nome}: Retorna o nome da receita
 * @type string
 * @default O preparo da receita ${nome} está completa!
 * 
 * @param Animação de conclusão
 * @desc Qual a animação que deve ser exibida quando o preparo acabar?
 * @type animation
 * @default 0
 * @require 1
 * 
 * @param Bloquear movimento
 * @desc Você vai bloquear o movimento do jogador enquanto ele estiver preparando a receita?
 * @type select
 * @default Sim
 * @option Não, deixe ele andar livremente
 * @value Não
 * @option Sim, deixe ele ficar parado
 * @value Sim
 * 
 * @param Ocultar janela
 * @desc Você vai querer ocultar a janela de craft enquanto o jogador estiver preparando a receita?
 * @type boolean
 * @default false
 * @on Ocultar
 * @off Exibir
 * 
 * @param Tocar musica
 * @desc Você vai querer tocar uma musiquinha enquanto o jogador prepara a receita?
 * @type file
 * @dir audio/bgm/
 * @require 1
 * 
 * @param Opções avançadas
 * @default Para makers avançados!
 * 
 * @param Switch de conclusão
 * @parent Opções avançadas
 * @desc Escolha um switch para alterar depois que o jogador terminar de preparar a receita
 * - Deixe em 0(None) se não quiser alterar nem um switch!
 * @type switch
 * @default 0
 * 
 * @param Switch de conclusão valor
 * @parent Switch de conclusão
 * @desc Deseja ativar ou desativar o switch de conclusão?
 * @type boolean
 * @default true
 * @on Ativar
 * @off Desativar
 * 
 * @param Switch local de conclusão
 * @parent Opções avançadas
 * @desc Você quer ativar um switch local depois que o jogador terminar de preparar a receita?
 * @type boolean
 * @default false
 * @on Ativar
 * 
 * @param Evento do switch local de conclusão
 * @parent Switch local de conclusão
 * @desc Qual o Id do evento do switch local
 * @type number
 * @default 1
 * @min 1
 * @max 999
 * 
 * @param Letra do switch local de conclusão
 * @parent Switch local de conclusão
 * @desc Qual a letra do switch local?
 * @type select
 * @default A
 * @option A
 * @option B
 * @option C
 * @option D
 * 
 * @param Valor do switch local de conclusão
 * @parent Switch local de conclusão
 * @desc Deseja desativar ou ativar o switch local?
 * @type boolean
 * @default true
 * @off Ativar
 * @on Desativar
 * 
 * @param Variável de conclusão
 * @parent Opções avançadas
 * @desc Deseja mudar o valor da variavel quando terminar o preparo?
 * - Deixe em 0(None) se não quiser mudar nem uma variável
 * @type variable
 * @default 0
 * 
 * @param Valor da variável de conclusão
 * @parent Variável de conclusão
 * @desc Qual o valor que a variável vai receber?
 * - Coloque o formato válido de valores
 * @type string
 * @default 0
 */
/*~struct~ObtemLista:
 * @param Retorno
 * @desc O tipo de retorno
 * @type select
 * @default Item
 * @option Item
 * @option Arma
 * @option Armadura
 * @option Habilidade
 * 
 * @param Quantia
 * @desc Quantia de retorno
 * - Você só pode retornar de 1 a 999
 * @type number
 * @default 1
 * @min 1
 * @max 999
 * 
 * @param ID de Item
 * @desc Informe o id caso for um item aqui!
 * - Caso o valor seja 0(None) o sistema assume o valor 1
 * @type item
 * @default 0
 * 
 * @param ID de Arma
 * @desc Informe o id caso for uma arma aqui!
 * - Caso o valor seja 0(None) o sistema assume o valor 1
 * @type weapon
 * @default 0
 * 
 * @param ID de Armadura
 * @desc Informe o id caso for uma armadura aqui!
 * - Caso o valor seja 0(None) o sistema assume o valor 1
 * @type armor
 * @default 0
 * 
 * @param ID de Habilidade
 * @desc Informe o id caso for uma habilidade aqui!
 * - Caso o valor seja 0(None) o sistema assume o valor 1
 * @type skill
 * @default 0
 */
/*~struct~IngredientesLista:
 * @param Tipo de ingrediente
 * @desc Escolha o tipo do ingrediente
 * @type select
 * @default Item
 * @option Item
 * @option Arma
 * @option Armadura
 * 
 * @param Quantia do ingrediente
 * @desc Qual a quantia necessária deste ingrediente?
 * - Se o valor for 0, basta o jogador ter o ingrediente!
 * @type number
 * @default 1
 * @min 0
 * @max 999
 * 
 * @param ID de Item
 * @desc Informe o id do ingrediente caso for um item aqui!
 * - Caso o valor seja 0(None) o sistema assume o valor 1
 * @type item
 * @default 0
 * 
 * @param ID de Arma
 * @desc Informe o id do ingrediente caso for uma arma aqui!
 * - Caso o valor seja 0(None) o sistema assume o valor 1
 * @type weapon
 * @default 0
 * 
 * @param ID de Armadura
 * @desc Informe o id do ingrediente caso for uma armadura aqui!
 * - Caso o valor seja 0(None) o sistema assume o valor 1
 * @type armor
 * @default 0
 */
(function() {
    "use strict";
    //-----------------------------------------------------------------------------
    // Parameters
    //
    const params = PluginManager.parameters('DrXama_craftSystem');
    const craftSystem_items = JSON.parse(params['Lista de receitas']);

    //-----------------------------------------------------------------------------
    // Functions
    //    
    function fomatterToValidValue(value) {
        // Faz uma verificação e conversão do valor
        if (typeof value != 'string') {
            try {
                value = value.toString();
            } catch (error) {
                value = 'undefined';
            }
        }
        // Valores do MV
        var identificadorDeVariavel = value.toLowerCase().trim().contains('v:');
        var identificadorDeValorAleatorio = value.toLowerCase().trim().contains('al:');
        var identificadorDeQuantidadeDeItem = value.toLowerCase().trim().contains('it:');
        var identificadorDeQuantidadeDeArma = value.toLowerCase().trim().contains('ar:');
        var identificadorDeQuantidadeDeArmadura = value.toLowerCase().trim().contains('arm:');
        // Retorna o valor da variavel
        if (identificadorDeVariavel) {
            var variableId = value.toLowerCase().trim().replace('v:', '');
            if (isNaN(parseInt(variableId, 10))) {
                variableId = 1;
            }
            return $gameVariables.value(variableId);
        }
        // Retorna o valor aleatorio
        if (identificadorDeValorAleatorio) {
            var valueRandom = value.toLowerCase().trim().replace('al:', '');
            var i = 0;
            var length = valueRandom.length;
            var valueRandomNumber1 = '';
            var valueRandomNumber2 = '';
            var valueRandomNegative = false;
            var valueRandomNegative2 = false;
            var valueRandomActiveNumber2 = false;
            for (; i < length; i++) {
                let letter = valueRandom[i].toLowerCase();
                if (letter == '-') {
                    if (!valueRandomActiveNumber2) {
                        valueRandomNegative = true;
                    } else {
                        valueRandomNegative2 = true;
                    }
                } else if (letter == '+') {
                    if (!valueRandomActiveNumber2) {
                        valueRandomNegative = false;
                    } else {
                        valueRandomNegative2 = false;
                    }
                }
                if (letter == 'a') {
                    valueRandomActiveNumber2 = true;
                }
                if (!isNaN(parseInt(letter, 10))) {
                    if (!valueRandomActiveNumber2) {
                        valueRandomNumber1 += letter;
                    } else {
                        valueRandomNumber2 += letter;
                    }
                }
            }
            if (valueRandomNegative) {
                var value1 = -parseInt(valueRandomNumber1);
            } else {
                var value1 = parseInt(valueRandomNumber1);
            }
            if (valueRandomNegative2) {
                var value2 = -parseInt(valueRandomNumber2);
            } else {
                var value2 = parseInt(valueRandomNumber2);
            }
            return Math.floor((Math.random() * value2) + value1);
        }
        // Retorna a quantia do item no inventario
        if (identificadorDeQuantidadeDeItem) {
            var itemId = value.toLowerCase().trim().replace('it:', '');
            if (!isNaN(parseInt(itemId, 10))) {
                var item = $dataItems[parseInt(itemId)];
            } else {
                var item = $dataItems[1];
            }
            return $gameParty.numItems(item);
        }
        // Retorna a quantia da arma no inventario
        if (identificadorDeQuantidadeDeArma) {
            var weaponId = value.toLowerCase().trim().replace('ar:', '');
            if (!isNaN(parseInt(weaponId, 10))) {
                var weapon = $dataWeapons[parseInt(weaponId)];
            } else {
                var weapon = $dataWeapons[1];
            }
            return $gameParty.numItems(weapon);
        }
        // Retorna a quantia da armadura no inventario
        if (identificadorDeQuantidadeDeArmadura) {
            var armorId = value.toLowerCase().trim().replace('arm:', '');
            if (!isNaN(parseInt(armorId, 10))) {
                var armor = $dataArmors[parseInt(armorId)];
            } else {
                var armor = $dataArmors[1];
            }
            return $gameParty.numItems(armor);
        }
        // Propriedades dos atores
        var identificadorDeLevelDoAtor = value.toLowerCase().trim().contains('atl:');
        var identificadorDeExpDoAtor = value.toLowerCase().trim().contains('atp:');
        var identificadorDeHpDoAtor = value.toLowerCase().trim().contains('ath:');
        var identificadorDeMpDoAtor = value.toLowerCase().trim().contains('atm:');
        var identificadorDeHpMaximoDoAtor = value.toLowerCase().trim().contains('atmh:');
        var identificadorDeMpMaximoDoAtor = value.toLowerCase().trim().contains('atmm:');
        var identificadorDeAtaqueDoAtor = value.toLowerCase().trim().contains('ata:');
        var identificadorDeDefesaDoAtor = value.toLowerCase().trim().contains('atd:');
        var identificadorDeAtaqueMaximoDoAtor = value.toLowerCase().trim().contains('atma:');
        var identificadorDeDefesaMaximoDoAtor = value.toLowerCase().trim().contains('atmd:');
        var identificadorDeAgilidadeDoAtor = value.toLowerCase().trim().contains('atal:');
        var identificadorDeSorteDoAtor = value.toLowerCase().trim().contains('ats:');
        // Retorna o level do ator
        if (identificadorDeLevelDoAtor) {
            var actorId = value.toLowerCase().trim().replace('atl:', '');
            if (isNaN(parseInt(actorId, 10))) {
                actorId = 1;
            }
            return $gameActors.actor(parseInt(actorId)).level;
        }
        // Retorna a Exp do ator
        if (identificadorDeExpDoAtor) {
            var actorId = value.toLowerCase().trim().replace('atp:', '');
            if (isNaN(parseInt(actorId, 10))) {
                actorId = 1;
            }
            return $gameActors.actor(parseInt(actorId)).currentExp();
        }
        // Retorna o HP do ator
        if (identificadorDeHpDoAtor) {
            var actorId = value.toLowerCase().trim().replace('ath:', '');
            if (isNaN(parseInt(actorId, 10))) {
                actorId = 1;
            }
            return $gameActors.actor(parseInt(actorId)).hp;
        }
        // Retorna o MP do ator
        if (identificadorDeMpDoAtor) {
            var actorId = value.toLowerCase().trim().replace('atm:', '');
            if (isNaN(parseInt(actorId, 10))) {
                actorId = 1;
            }
            return $gameActors.actor(parseInt(actorId)).mp;
        }
        // Retorna o HP Maximo do ator
        if (identificadorDeHpMaximoDoAtor) {
            var actorId = value.toLowerCase().trim().replace('atmh:', '');
            if (isNaN(parseInt(actorId, 10))) {
                actorId = 1;
            }
            return $gameActors.actor(parseInt(actorId)).mhp;
        }
        // Retorna o MP Maximo do ator
        if (identificadorDeMpMaximoDoAtor) {
            var actorId = value.toLowerCase().trim().replace('atmm:', '');
            if (isNaN(parseInt(actorId, 10))) {
                actorId = 1;
            }
            return $gameActors.actor(parseInt(actorId)).mmp;
        }
        // Retorna o Ataque do ator
        if (identificadorDeAtaqueDoAtor) {
            var actorId = value.toLowerCase().trim().replace('ata:', '');
            if (isNaN(parseInt(actorId, 10))) {
                actorId = 1;
            }
            return $gameActors.actor(parseInt(actorId)).atk;
        }
        // Retorna a Defesa do ator
        if (identificadorDeDefesaDoAtor) {
            var actorId = value.toLowerCase().trim().replace('atd:', '');
            if (isNaN(parseInt(actorId, 10))) {
                actorId = 1;
            }
            return $gameActors.actor(parseInt(actorId)).def;
        }
        // Retorna o Ataque Maximo do ator
        if (identificadorDeAtaqueMaximoDoAtor) {
            var actorId = value.toLowerCase().trim().replace('atma:', '');
            if (isNaN(parseInt(actorId, 10))) {
                actorId = 1;
            }
            return $gameActors.actor(parseInt(actorId)).mat;
        }
        // Retorna a Defesa Maxima do ator
        if (identificadorDeDefesaMaximoDoAtor) {
            var actorId = value.toLowerCase().trim().replace('atmd:', '');
            if (isNaN(parseInt(actorId, 10))) {
                actorId = 1;
            }
            return $gameActors.actor(parseInt(actorId)).mdf;
        }
        // Retorna a Agilidade do ator
        if (identificadorDeAgilidadeDoAtor) {
            var actorId = value.toLowerCase().trim().replace('atal:', '');
            if (isNaN(parseInt(actorId, 10))) {
                actorId = 1;
            }
            return $gameActors.actor(parseInt(actorId)).agi;
        }
        // Retorna a Sorte do ator
        if (identificadorDeSorteDoAtor) {
            var actorId = value.toLowerCase().trim().replace('ats:', '');
            if (isNaN(parseInt(actorId, 10))) {
                actorId = 1;
            }
            return $gameActors.actor(parseInt(actorId)).luk;
        }
        // Propriedades do Personagem
        var identificadorDeMapaXDoPersonagem = value.toLowerCase().trim().contains('psmx:');
        var identificadorDeMapaYDoPersonagem = value.toLowerCase().trim().contains('psmy:');
        var identificadorDeDirecaoDoPersonagem = value.toLowerCase().trim().contains('psd:');
        var identificadorDeTelaXDoPersonagem = value.toLowerCase().trim().contains('pstx:');
        var identificadorDeTelaYDoPersonagem = value.toLowerCase().trim().contains('psty:');
        // Retorna o Mapa X do personagem
        if (identificadorDeMapaXDoPersonagem) {
            var characterId = value.toLowerCase().trim().replace('psmx:', '');
            characterId = characterId.replace(/\s{1,}/g, '');
            var character;
            if (characterId == 'player') {
                character = $gamePlayer;
            } else {
                if (isNaN(parseInt(characterId, 10))) {
                    characterId = 1;
                }
                character = $gameMap.event(characterId) || {};
            }
            return character.x;
        }
        // Retorna o Mapa Y do personagem
        if (identificadorDeMapaYDoPersonagem) {
            var characterId = value.toLowerCase().trim().replace('psmy:', '');
            characterId = characterId.replace(/\s{1,}/g, '');
            var character;
            if (characterId == 'player') {
                character = $gamePlayer;
            } else {
                if (isNaN(parseInt(characterId, 10))) {
                    characterId = 1;
                }
                character = $gameMap.event(characterId) || {};
            }
            return character.y;
        }
        // Retorna o Direção do personagem
        if (identificadorDeDirecaoDoPersonagem) {
            var characterId = value.toLowerCase().trim().replace('psd:', '');
            characterId = characterId.replace(/\s{1,}/g, '');
            var character;
            if (characterId == 'player') {
                character = $gamePlayer;
            } else {
                if (isNaN(parseInt(characterId, 10))) {
                    characterId = 1;
                }
                character = $gameMap.event(characterId) || {};
            }
            return character.direction();
        }
        // Retorna o Tela X do personagem
        if (identificadorDeTelaXDoPersonagem) {
            var characterId = value.toLowerCase().trim().replace('pstx:', '');
            characterId = characterId.replace(/\s{1,}/g, '');
            var character;
            if (characterId == 'player') {
                character = $gamePlayer;
            } else {
                if (isNaN(parseInt(characterId, 10))) {
                    characterId = 1;
                }
                character = $gameMap.event(characterId) || {};
            }
            return character.screenX();
        }
        // Retorna o Tela Y do personagem
        if (identificadorDeTelaYDoPersonagem) {
            var characterId = value.toLowerCase().trim().replace('psty:', '');
            characterId = characterId.replace(/\s{1,}/g, '');
            var character;
            if (characterId == 'player') {
                character = $gamePlayer;
            } else {
                if (isNaN(parseInt(characterId, 10))) {
                    characterId = 1;
                }
                character = $gameMap.event(characterId) || {};
            }
            return character.screenY();
        }
        // Propriedades do Grupo
        var identificadorDeIdDoMembroDoGrupo = value.toLowerCase().trim().contains('gid:');
        // Retorna o Id do Membro do grupo
        if (identificadorDeIdDoMembroDoGrupo) {
            var partyMemberId = value.toLowerCase().trim().replace('gid:', '');
            if (isNaN(parseInt(partyMemberId, 10))) {
                partyMemberId = 1;
            }
            var memberId = parseInt(partyMemberId) - 1;
            return $gameParty.members()[memberId].actorId();
        }
        // Outras Propriedades
        var identificadorDeIdDoMapa = value.toLowerCase().trim().contains(':idmap:');
        var identificadorDeMembrosDoGrupo = value.toLowerCase().trim().contains(':gmg:');
        var identificadorDeDinheiroDoGrupo = value.toLowerCase().trim().contains(':gg:');
        var identificadorDePassosDoGrupo = value.toLowerCase().trim().contains(':gp:');
        var identificadorDeTempoDeJogo = value.toLowerCase().trim().contains(':gtj:');
        var identificadorDeTemporizador = value.toLowerCase().trim().contains(':gt:');
        var identificadorDeTotalDeSaves = value.toLowerCase().trim().contains(':gts:');
        var identificadorDeTotalDeBatalhas = value.toLowerCase().trim().contains(':gtb:');
        var identificadorDeTotalDeVitorias = value.toLowerCase().trim().contains(':gtv:');
        var identificadorDeTotalDeEscapatorias = value.toLowerCase().trim().contains(':gte:');
        // Retorna o Id do Mapa
        if (identificadorDeIdDoMapa) {
            return $gameMap.mapId();
        }
        // Retorna o Tamanho do grupo
        if (identificadorDeMembrosDoGrupo) {
            return $gameParty.size();
        }
        // Retorna o Dinheiro do grupo
        if (identificadorDeDinheiroDoGrupo) {
            return $gameParty.gold();
        }
        // Retorna o Total de Passos do grupo
        if (identificadorDePassosDoGrupo) {
            return $gameParty.steps();
        }
        // Retorna o Tempo de jogo
        if (identificadorDeTempoDeJogo) {
            return $gameSystem.playtime();
        }
        // Retorna o Temporizador
        if (identificadorDeTemporizador) {
            return $gameTimer.seconds();
        }
        // Retorna o Total de Saves
        if (identificadorDeTotalDeSaves) {
            return $gameSystem.saveCount();
        }
        // Retorna o Total de Batalhas
        if (identificadorDeTotalDeBatalhas) {
            return $gameSystem.battleCount();
        }
        // Retorna o Total de Vitorias
        if (identificadorDeTotalDeVitorias) {
            return $gameSystem.winCount();
        }
        // Retorna o Total de Escapatorias
        if (identificadorDeTotalDeEscapatorias) {
            return $gameSystem.escapeCount();
        }
        // Valores Primitivos
        // Verifica se o valor é Number
        if (!isNaN(parseInt(value, 10))) {
            return parseInt(value);
        }
        // Verifica se o valor é Bolean
        try { return eval(value) } catch (error) {};
        // Verifica se o valor é Array
        try {
            var array = eval(value);
            if (array instanceof Array === true) {
                return array;
            }
        } catch (error) {};
        // Retorna a string
        return value;
    };

    //-----------------------------------------------------------------------------
    // Game_Temp
    //
    Game_Temp.prototype.stopMapPlayerMovement = function() {
        this._stopMapPlayer = true;
    };

    Game_Temp.prototype.allowMapPlayerMovement = function() {
        this._stopMapPlayer = false;
    };

    Game_Temp.prototype.isStopMapPlayerMovement = function() {
        return this._stopMapPlayer;
    };

    //-----------------------------------------------------------------------------
    // Game_Player
    //
    const _Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function() {
        if ($gameTemp.isStopMapPlayerMovement()) return false;
        return _Game_Player_canMove.call(this);
    };

    //-----------------------------------------------------------------------------
    // Game_System
    //
    const gameSystem_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        gameSystem_initialize.call(this);
        this._craftSystem_recipes = [];
        this.craftSystem_addRecipes();
    };

    //-----------------------------------------------------------------------------
    // Game_System
    //
    Game_System.prototype.craftSystem_recipes = function() {
        return this._craftSystem_recipes || [];
    };

    Game_System.prototype.craftSystem_addRecipes = function() {
        if (craftSystem_items.length > 0) {
            craftSystem_items.forEach(function(recipe) {
                recipe = JSON.parse(recipe) || {};
                let nome = String(recipe["Nome"]);
                let descricao = JSON.parse(recipe["Descrição"]).split("\n", 2);
                let classe = JSON.parse(recipe["Tipo de classe"]);
                let obtem = JSON.parse(recipe["Obtem"]);
                let ingredientes = JSON.parse(recipe["Lista de ingredientes"]);
                let tempoDePreparo = Number(recipe["Tempo de preparo"]);
                let textDeConclusao = (function() {
                    var string = String(recipe["Texto de conclusão"]);
                    if (string.includes('${nome}')) {
                        string = string.replace(/\${nome}/gi, `"${nome}"`);
                    }
                    return string;
                })();
                let animacaoDeConclusao = Number(recipe["Animação de conclusão"]);
                let bloquearMovimento = (function() {
                    var value = String(recipe["Bloquear movimento"]);
                    switch (value) {
                        case "Sim":
                            value = true;
                            break;
                        case "Não":
                            value = false;
                            break;
                        default:
                            value = false;
                            break;
                    }
                    return value;
                })();
                let ocultarJanela = eval(String(recipe["Ocultar janela"]));
                let tocarMusica = String(recipe["Tocar musica"]);
                let switchDeConclusao = Number(recipe["Switch de conclusão"]);
                let switchDeConclusaoValor = eval(String(recipe["Switch de conclusão valor"]));
                let switchLocalDeConclusao = eval(String(recipe["Switch local de conclusão"]));
                let eventoDoSwitchLocalDeConclusao = Number(recipe["Evento do switch local de conclusão"]);
                let letraDoSwitchLocalDeConclusao = String(recipe["Letra do switch local de conclusão"]);
                let valorDoSwitchLocalDeConclusao = eval(String(recipe["Valor do switch local de conclusão"]));
                let variavelDeConclusao = eval(String(recipe["Variável de conclusão"]));
                let valorDaVariavelDeConclusao = Number(recipe["Valor da variável de conclusão"]);
                let newRecipe = {
                    "nome": nome,
                    "descricao": descricao,
                    "classe": classe,
                    "obtem": obtem,
                    "ingredientes": ingredientes,
                    "tempoDePreparo": tempoDePreparo,
                    "textDeConclusao": textDeConclusao,
                    "animacaoDeConclusao": animacaoDeConclusao,
                    "bloquearMovimento": bloquearMovimento,
                    "ocultarJanela": ocultarJanela,
                    "tocarMusica": tocarMusica,
                    "opcoesAvancadas": {
                        "switchDeConclusao": switchDeConclusao,
                        "switchDeConclusaoValor": switchDeConclusaoValor,
                        "switchLocalDeConclusao": switchLocalDeConclusao,
                        "eventoDoSwitchLocalDeConclusao": eventoDoSwitchLocalDeConclusao,
                        "letraDoSwitchLocalDeConclusao": letraDoSwitchLocalDeConclusao,
                        "valorDoSwitchLocalDeConclusao": valorDoSwitchLocalDeConclusao,
                        "variavelDeConclusao": variavelDeConclusao,
                        "valorDaVariavelDeConclusao": valorDaVariavelDeConclusao
                    }
                }
                this._craftSystem_recipes.push(newRecipe);
            }, this);
        }
    };

    Game_System.prototype.craftSystem_recipeSetCraftActive = function(index) {
        this._craftSystem_recipesCraftActive = this._craftSystem_recipes[index] || [];
    };

    Game_System.prototype.craftSystem_recipeCraftActive = function() {
        return this._craftSystem_recipesCraftActive;
    };

    Game_System.prototype.craftSystem_recipeCraftActiveClear = function() {
        this._craftSystem_recipesCraftActive = null;
        this._craftSystem_recipesCraftStatus = null;
    };

    Game_System.prototype.craftSystem_recipeCraftComplete = function() {
        if (!this._craftSystem_recipesCraftActive) return;
        if (!this._craftSystem_recipesCraftStatus) this._craftSystem_recipesCraftStatus = {};
        this._craftSystem_recipesCraftStatus["preparoFinalizado"] = true;
    };

    Game_System.prototype.craftSystem_recipeCraftIsComplete = function() {
        if (!this._craftSystem_recipesCraftActive) return;
        if (!this._craftSystem_recipesCraftStatus) return;
        return this._craftSystem_recipesCraftStatus["preparoFinalizado"];
    };

    Game_System.prototype.craftSystem_recipeCraftSetItemsObtidos = function(itemObtidos) {
        if (!this._craftSystem_recipesCraftActive) return;
        if (!this._craftSystem_recipesCraftStatus) this._craftSystem_recipesCraftStatus = {};
        this._craftSystem_recipesCraftStatus["itemsObtidos"] = itemObtidos;
    };

    Game_System.prototype.craftSystem_recipeCraftItemsObtidos = function() {
        if (!this._craftSystem_recipesCraftActive) return;
        if (!this._craftSystem_recipesCraftStatus) return;
        return this._craftSystem_recipesCraftStatus["itemsObtidos"];
    };

    Game_System.prototype.craftSystem_recipeCraftSetItemsRetirados = function(itemsRetirados) {
        if (!this._craftSystem_recipesCraftActive) return;
        if (!this._craftSystem_recipesCraftStatus) this._craftSystem_recipesCraftStatus = {};
        this._craftSystem_recipesCraftStatus["itemsRetirados"] = itemsRetirados;
    };

    Game_System.prototype.craftSystem_recipeCraftItemsRetirados = function() {
        if (!this._craftSystem_recipesCraftActive) return;
        if (!this._craftSystem_recipesCraftStatus) return;
        return this._craftSystem_recipesCraftStatus["itemsRetirados"];
    };

    //-----------------------------------------------------------------------------
    // Scene_Map
    //
    const _Scene_Map_Start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_Start.call(this);
        this.drawTextDeConclusao();
    };

    Scene_Map.prototype.drawTextDeConclusao = function() {
        this._spriteTextdeConclusao = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        this._spriteTextdeConclusao.opacity = 0;
        this._spriteTextdeConclusao.bitmap.fontSize = 18;
        this.addChild(this._spriteTextdeConclusao);
    };

    const _Scene_Map_Update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_Update.call(this);
        this.updateCraftIsComplete();
        this.updateTextDeConclusao();
        this.updateCraftRecipeTimer();
        this.updateCraftIconTimer();
    };

    Scene_Map.prototype.updateCraftIsComplete = function() {
        if ($gameSystem.craftSystem_recipeCraftIsComplete()) {
            var animationId = $gameSystem.craftSystem_recipeCraftActive()["animacaoDeConclusao"];
            if (!isNaN(parseInt(animationId, 10))) {
                $gamePlayer.requestAnimation(animationId);
            }
            var textDeConclusao = $gameSystem.craftSystem_recipeCraftActive()["textDeConclusao"];
            this._spriteTextdeConclusao.bitmap.clear();
            this._spriteTextdeConclusao.bitmap.drawText(textDeConclusao, 20, 25, Graphics.width - 20 * 2, 48, 'center');
            this._spriteTextdeConclusao.textDeConclusao = true;
            $gameTemp.allowMapPlayerMovement();
            $gameSystem.craftSystem_recipeCraftItemsObtidos().forEach(function(item) {
                if (item.type == 'Item' || item.type == 'Arma' || item.type == 'Armadura') {
                    $gameParty.gainItem(item.item, item.amount, true);
                } else if (item.type == "Habilidade") {
                    $gameParty.leader().learnSkill(item);
                }
            });
            $gameSystem.craftSystem_recipeCraftItemsRetirados().forEach(function(item) {
                if (item.type == 'Item' || item.type == 'Arma' || item.type == 'Armadura') {
                    $gameParty.loseItem(item.item, item.amount, true);
                }
            });
            var opcoesAvancadas = $gameSystem.craftSystem_recipeCraftActive()["opcoesAvancadas"];
            var switchDeConclusao = opcoesAvancadas["switchDeConclusao"];
            var switchDeConclusaoValue = opcoesAvancadas["switchDeConclusaoValor"];
            if (switchDeConclusao > 0) {
                $gameSwitches.setValue(switchDeConclusao, switchDeConclusaoValue);
            }
            var switchLocalDeConclusaoValue = opcoesAvancadas["switchLocalDeConclusao"];
            var eventoDoSwitchLocalDeConclusao = opcoesAvancadas["eventoDoSwitchLocalDeConclusao"];
            var letraDoSwitchLocalDeConclusao = opcoesAvancadas["letraDoSwitchLocalDeConclusao"];
            var valorDoSwitchLocalDeConclusao = opcoesAvancadas["valorDoSwitchLocalDeConclusao"];
            if (switchLocalDeConclusaoValue) {
                var key = [$gameMap.mapId(), eventoDoSwitchLocalDeConclusao, letraDoSwitchLocalDeConclusao];
                $gameSelfSwitches.setValue(key, valorDoSwitchLocalDeConclusao);
            }
            var variavelDeConclusao = opcoesAvancadas["variavelDeConclusao"];
            var valorDaVariavelDeConclusao = opcoesAvancadas["valorDaVariavelDeConclusao"];
            if (variavelDeConclusao > 0) {
                $gameVariables.setValue(variavelDeConclusao, fomatterToValidValue(valorDaVariavelDeConclusao));
            }
            $gameSystem.craftSystem_recipeCraftActiveClear();
        }
    };

    Scene_Map.prototype.updateTextDeConclusao = function() {
        if (this._spriteTextdeConclusaoFrames === undefined) {
            this._spriteTextdeConclusaoFrames = 120;
        }
        if (this._spriteTextdeConclusao.textDeConclusao) {
            if (this._spriteTextdeConclusao.opacity < 255) {
                this._spriteTextdeConclusao.opacity += 4;
            } else {
                if (this._spriteTextdeConclusaoFrames > 0) {
                    this._spriteTextdeConclusaoFrames -= 0.60;
                } else {
                    this._spriteTextdeConclusao.textDeConclusao = false;
                }
            }
        } else {
            if (this._spriteTextdeConclusao.opacity > 0) {
                this._spriteTextdeConclusao.opacity -= 4;
            } else {
                this._spriteTextdeConclusaoFrames = undefined;
            }
        }
    };

    Scene_Map.prototype.updateCraftRecipeTimer = function() {
        if ($gameSystem.craftSystem_recipeCraftActive()) {
            if (this._craftRecipeTimer == undefined) {
                this._craftRecipeTimer = $gameSystem.craftSystem_recipeCraftActive()["tempoDePreparo"];
            }
            if (this._craftRecipeTimer > 0) {
                this._craftRecipeTimer -= 0.60;
            } else {
                this.startFadeIn(this.fadeSpeed(), false);
                this._craftRecipeTimer = undefined;
                AudioManager.stopBgm();
                $gameSystem.craftSystem_recipeCraftComplete();
            }
        }
    };

    Scene_Map.prototype.updateCraftIconTimer = function() {
        if ($gameSystem.craftSystem_recipeCraftActive()) {
            if (!this._bitmapCraftIcon) {
                this._bitmapCraftIcon = new Sprite(new Bitmap(Graphics.width, Graphics.height));
                var bitmap = ImageManager.loadSystem('IconSet');
                var iconIndex = 193;
                var pw = Window_Base._iconWidth;
                var ph = Window_Base._iconHeight;
                var sx = iconIndex % 16 * pw;
                var sy = Math.floor(iconIndex / 16) * ph;
                this._bitmapCraftIcon.bitmap = bitmap;
                this._bitmapCraftIcon.setFrame(sx, sy, pw, ph);
                this._bitmapCraftIcon.move(5, 5);
                this.addChild(this._bitmapCraftIcon);
            }
            if (!this._bitmapCraftIconText) {
                this._bitmapCraftIconText = new Sprite(new Bitmap(Graphics.width, Graphics.height));
                var bitmap = this._bitmapCraftIconText.bitmap;
                var recipeName = $gameSystem.craftSystem_recipeCraftActive()["nome"];
                bitmap.fontSize = 16;
                bitmap.drawText(`Preparando a receita: ${recipeName}`, 40, 20, Graphics.width, 0, 'left');
                this.addChild(this._bitmapCraftIconText);
            }
            if (this._bitmapCraftIcon && this._bitmapCraftIconText) {
                if (this._bitmapCraftIconFrames == undefined) {
                    this._bitmapCraftIconFrames = [30, 60];
                }
                if (this._bitmapCraftIconFrames[0] > 0) {
                    this._bitmapCraftIconFrames[0] -= 0.60;
                    if (this._bitmapCraftIcon.opacity > 0) {
                        this._bitmapCraftIcon.opacity -= 4;
                    }
                    if (this._bitmapCraftIconText.opacity > 0) {
                        this._bitmapCraftIconText.opacity -= 4;
                    }
                } else {
                    if (this._bitmapCraftIconFrames[1] > 0) {
                        this._bitmapCraftIconFrames[1] -= 0.60;
                        if (this._bitmapCraftIcon.opacity < 255) {
                            this._bitmapCraftIcon.opacity += 4;
                        }
                        if (this._bitmapCraftIconText.opacity < 255) {
                            this._bitmapCraftIconText.opacity += 4;
                        }
                    } else {
                        this._bitmapCraftIconFrames = undefined;
                    }
                }
            }
        } else {
            if (this._bitmapCraftIcon && this._bitmapCraftIconText) {
                if (this._bitmapCraftIcon.opacity & this._bitmapCraftIconText.opacity > 0) {
                    this._bitmapCraftIcon.opacity -= 4;
                    this._bitmapCraftIconText.opacity -= 4;
                } else {
                    this.removeChild(this._bitmapCraftIcon);
                    this.removeChild(this._bitmapCraftIconText);
                    this._bitmapCraftIcon = null;
                    this._bitmapCraftIconText = null;
                }
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Window_MenuCommand
    //
    const _Window_MenuCommand = Window_MenuCommand.prototype.addMainCommands;
    Window_MenuCommand.prototype.addMainCommands = function() {
        _Window_MenuCommand.call(this);
        var enabled = this.craftSystemEnabled();
        this.addCommand('Craft', 'craftSystem', enabled);
    };

    Window_MenuCommand.prototype.craftSystemEnabled = function() {
        return $gameSystem.craftSystem_recipes().length > 0;
    };

    //-----------------------------------------------------------------------------
    // Scene_Menu
    //
    const sceneMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        sceneMenu_createCommandWindow.call(this);
        this._commandWindow.setHandler('craftSystem', this.commandCraftSystem.bind(this));
    };
    Scene_Menu.prototype.commandCraftSystem = function() {
        SceneManager.push(Scene_CraftSystem);
    };

    //-----------------------------------------------------------------------------
    // Scene_CraftSystem
    //
    function Scene_CraftSystem() {
        this.initialize.apply(this, arguments);
    }

    Scene_CraftSystem.prototype = Object.create(Scene_Base.prototype);
    Scene_CraftSystem.prototype.constructor = Scene_CraftSystem;

    Scene_CraftSystem.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
    };

    Scene_CraftSystem.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createWindowLayer();
        this.createHelpWindow();
        if (!$gameSystem.craftSystem_recipeCraftActive()) {
            this.createRecipesListWindow();
            this.createRecipesInformationWindow();
        } else {
            this._updateTriggeredCancel = true;
            this._helpWindow.drawTextEx('Você está preparando uma receita...', this._helpWindow.textPadding(), 0);
            this._helpWindow.drawTextEx('Volte quando acabar xD', this._helpWindow.textPadding(), 40);
        }
    };

    Scene_CraftSystem.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
        this.addChild(this._backgroundSprite);
    };

    Scene_CraftSystem.prototype.createHelpWindow = function() {
        this._helpWindow = new Window_Help();
        this.addWindow(this._helpWindow);
    };

    Scene_CraftSystem.prototype.createRecipesListWindow = function() {
        this._recipesWindow = new Window_RecipesList();
        this._recipesWindow.y = this._helpWindow.height;
        this._recipesWindow.setHandler('cancel', this.popScene.bind(this));
        $gameSystem.craftSystem_recipes().forEach(function(recipe) {
            var command = recipe["nome"];
            this._recipesWindow.setHandler(command, this.commandRecipesWindow.bind(this));
        }, this);
        this.addWindow(this._recipesWindow);
    };

    Scene_CraftSystem.prototype.createRecipesInformationWindow = function() {
        this._recipesInformationWindow = new Window_RecipeInformation();
        this._recipesInformationWindow.y = this._helpWindow.height + this._recipesWindow.height;
        this._recipesInformationWindow.height -= this._recipesInformationWindow.y;
        this.addWindow(this._recipesInformationWindow);
    };

    Scene_CraftSystem.prototype.update = function() {
        Scene_Base.prototype.update.call(this);
        this.updateRecipeHelpWindow();
        this.updateTriggeredCancel();
    };

    Scene_CraftSystem.prototype.updateRecipeHelpWindow = function() {
        if (!this._recipesWindow) return;
        if (this._recipeHelpWindowIndex != this._recipesWindow.index()) {
            this._recipeHelpWindowIndex = this._recipesWindow.index();
            var index = this._recipeHelpWindowIndex;
            var text = this._recipesWindow.commandDescription(index)[0];
            var text2 = this._recipesWindow.commandDescription(index)[1];
            this._helpWindow.contents.clear();
            this._helpWindow.drawTextEx(text, this._helpWindow.textPadding(), 0);
            this._helpWindow.drawTextEx(text2, this._helpWindow.textPadding(), 36);
            this._recipesInformationWindow.setRecipe(this._recipesWindow.commandRecipe(index));
            this._recipesInformationWindow.resetItemsAgainAndLose();
            this._recipesInformationWindow.refresh();
        }
    };

    Scene_CraftSystem.prototype.commandRecipesWindow = function() {
        if (this._recipesInformationWindow.recipeIsValidToCraft()) {
            var index = this._recipesWindow.index();
            $gameSystem.craftSystem_recipeSetCraftActive(this._recipesWindow.commandRecipeIndex(index));
            $gameSystem.craftSystem_recipeCraftSetItemsObtidos(this._recipesInformationWindow.itemsObtidos());
            $gameSystem.craftSystem_recipeCraftSetItemsRetirados(this._recipesInformationWindow.itemsRetirados());
            var recipeCraftActive = $gameSystem.craftSystem_recipeCraftActive();
            var musicaDePreparo = recipeCraftActive["tocarMusica"];
            var bloquearMovimento = recipeCraftActive["bloquearMovimento"];
            if (musicaDePreparo.length > 0) {
                AudioManager.playBgm({
                    name: musicaDePreparo,
                    volume: 90,
                    pitch: 100,
                    pan: 0
                }, 0);
            }
            if (bloquearMovimento) {
                $gameTemp.stopMapPlayerMovement();
            }
            if (recipeCraftActive["ocultarJanela"]) {
                SceneManager.goto(Scene_Map);
            } else {
                SceneManager.goto(Scene_CraftActive);
            }
        } else {
            SoundManager.playBuzzer();
            this._recipesWindow.activate();
        }
    };

    Scene_CraftSystem.prototype.updateTriggeredCancel = function() {
        if (this._updateTriggeredCancel) {
            if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
                SoundManager.playCancel();
                this.popScene();
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Window_RecipesList
    //

    function Window_RecipesList() {
        this.initialize.apply(this, arguments);
    }

    Window_RecipesList.prototype = Object.create(Window_HorzCommand.prototype);
    Window_RecipesList.prototype.constructor = Window_RecipesList;

    Window_RecipesList.prototype.initialize = function() {
        Window_HorzCommand.prototype.initialize.call(this, 0, 0);
    };

    Window_RecipesList.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_RecipesList.prototype.maxCols = function() {
        return 1;
    };

    Window_RecipesList.prototype.update = function() {
        Window_HorzCommand.prototype.update.call(this);
    };

    Window_RecipesList.prototype.makeCommandList = function() {
        $gameSystem.craftSystem_recipes().forEach(function(recipe, recipeIndex) {
            var command = recipe["nome"];
            var description = recipe["descricao"];
            var classe = recipe["classe"];
            this.addCommand(command, description, classe, recipeIndex);
        }, this);
    };

    Window_RecipesList.prototype.addCommand = function(name, description, classe, recipeIndex) {
        var classIsValid = (function() {
            var isValid = false;
            if (classe.length > 0) {
                classe.forEach(function(classId) {
                    if ($gameParty.leader().currentClass() == $dataClasses[classId]) {
                        isValid = true;
                    }
                });
            } else {
                isValid = true;
            }
            return isValid;
        })();
        this._list.push({
            name: name,
            description: description,
            recipeIndex: recipeIndex,
            symbol: name,
            enabled: classIsValid,
            ext: null
        });
    };

    Window_RecipesList.prototype.commandDescription = function(index) {
        return this._list[index].description;
    };

    Window_RecipesList.prototype.commandRecipe = function(index) {
        var recipeIndex = this._list[index].recipeIndex;
        return $gameSystem.craftSystem_recipes()[recipeIndex];
    };

    Window_RecipesList.prototype.commandRecipeIndex = function(index) {
        return this._list[index].recipeIndex;
    };


    Window_RecipesList.prototype.scrollDown = function() {
        if (this.topRow() + 1 < this.maxRows()) {
            var lastIndex = this.index();
            this.setTopRow(this.topRow() + 1);
            this.cursorDown(Input.isTriggered('down'));
            if (this.index() !== lastIndex) {
                SoundManager.playCursor();
            }
        }
    };

    Window_RecipesList.prototype.scrollUp = function() {
        if (this.topRow() > 0) {
            var lastIndex = this.index();
            this.setTopRow(this.topRow() - 1);
            this.cursorUp(Input.isTriggered('up'));
            if (this.index() !== lastIndex) {
                SoundManager.playCursor();
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Window_RecipeInformation
    //

    function Window_RecipeInformation() {
        this.initialize.apply(this, arguments);
    }

    Window_RecipeInformation.prototype = Object.create(Window_Base.prototype);
    Window_RecipeInformation.prototype.constructor = Window_RecipeInformation;

    Window_RecipeInformation.prototype.initialize = function() {
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    };

    Window_RecipeInformation.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_RecipeInformation.prototype.windowHeight = function() {
        return Graphics.boxHeight;
    };

    Window_RecipeInformation.prototype.setRecipe = function(recipe) {
        this._recipe = recipe;
    };

    Window_RecipeInformation.prototype.recipe = function() {
        return this._recipe;
    };

    Window_RecipeInformation.prototype.resetItemsAgainAndLose = function() {
        this._ItemsObtidos = [];
        this._ItemsRetirados = [];
    };

    Window_RecipeInformation.prototype.itemsObtidos = function() {
        return this._ItemsObtidos;
    };

    Window_RecipeInformation.prototype.itemsRetirados = function() {
        return this._ItemsRetirados;
    };

    Window_RecipeInformation.prototype.recipeIsValidToCraft = function() {
        var ingredientes = this.recipe()["ingredientes"].length;
        this.recipe()["ingredientes"].forEach(function(ingrediente) {
            var ingredienteParse = JSON.parse(ingrediente);
            switch (ingredienteParse["Tipo de ingrediente"]) {
                case 'Item':
                    var itemId = Number(ingredienteParse["ID de Item"]) || 1;
                    var item = $dataItems[itemId];
                    var itemQuant = Number(ingredienteParse["Quantia do ingrediente"]);
                    if ($gameParty.numItems(item) >= itemQuant) {
                        ingredientes--;
                    }
                    break;
                case 'Arma':
                    var itemId = Number(ingredienteParse["ID de Arma"]) || 1;
                    var item = $dataWeapons[itemId];
                    var itemQuant = Number(ingredienteParse["Quantia do ingrediente"]);
                    if ($gameParty.numItems(item) >= itemQuant) {
                        ingredientes--;
                    }
                    break;
                case 'Armadura':
                    var itemId = Number(ingredienteParse["ID de Armadura"]) || 1;
                    var item = $dataArmors[itemId];
                    var itemQuant = Number(ingredienteParse["Quantia do ingrediente"]);
                    if ($gameParty.numItems(item) >= itemQuant) {
                        ingredientes--;
                    }
                    break;
            }
        }, this);
        return ingredientes <= 0;
    };

    Window_RecipeInformation.prototype.refresh = function() {
        var x = this.textPadding();
        var width = this.contents.width - this.textPadding() * 2;
        var widthHorzLine = 365;
        this.contents.clear();
        this.drawTextEx('Ingredientes:', this.textPadding(), 0);
        this.drawIngredientes();
        this.drawTextEx('Obtém:', this.textPadding(), this._ingredienteslineY + 45);
        this.drawItemsObtidos();
        var centerX = width / 2;
        this.drawVerzLine(centerX);
        this.drawTextEx('Tempo de preparo:', centerX + this.textPadding() * 4, 0);
        this.drawTempoDePreparo(centerX + this.textPadding() * 4, 40);
        this.drawHorzLine(60, widthHorzLine, centerX + this.textPadding() * 4);
        this.drawTextEx('Música de preparo:', centerX + this.textPadding() * 4, 80);
        this.drawMusicaDePreparo(centerX + this.textPadding() * 4, 120);
        this.drawHorzLine(140, widthHorzLine, centerX + this.textPadding() * 4);
        this.drawTextEx('Classe de preparo:', centerX + this.textPadding() * 4, 160);
        this.drawTipoDeClasse(centerX + this.textPadding() * 4, 195);
    };

    Window_RecipeInformation.prototype.drawIngredientes = function() {
        this._ingredienteslineY = 0;
        this.recipe()["ingredientes"].forEach(function(ingrediente, index) {
            var ingredienteParse = JSON.parse(ingrediente);
            switch (ingredienteParse["Tipo de ingrediente"]) {
                case 'Item':
                    var itemId = Number(ingredienteParse["ID de Item"]) || 1;
                    var item = $dataItems[itemId];
                    var itemQuant = Number(ingredienteParse["Quantia do ingrediente"]);
                    var x = this.textPadding();
                    var width = this.textWidth(item.name) < 100 ? (this.textWidth(item.name) * 2) - this.textPadding() * 4 : this.textWidth(item.name) + this.textPadding() * 4;
                    this._ingredienteslineY += 40;
                    this.drawItemName(item, x, this._ingredienteslineY, width);
                    this.drawItemNumber(item, itemQuant, 140, this._ingredienteslineY, 192);
                    this.drawHorzLine(this._ingredienteslineY + 20);
                    this._ItemsRetirados.push({
                        "item": item,
                        "amount": itemQuant,
                        "type": "Item"
                    });
                    break;
                case 'Arma':
                    var itemId = Number(ingredienteParse["ID de Arma"]) || 1;
                    var item = $dataWeapons[itemId];
                    var itemQuant = Number(ingredienteParse["Quantia do ingrediente"]);
                    var x = this.textPadding();
                    var width = this.textWidth(item.name) < 100 ? (this.textWidth(item.name) * 2) - this.textPadding() * 4 : this.textWidth(item.name) + this.textPadding() * 4;
                    this._ingredienteslineY += 40;
                    this.drawItemName(item, x, this._ingredienteslineY, width);
                    this.drawItemNumber(item, itemQuant, 140, this._ingredienteslineY, 192);
                    this.drawHorzLine(this._ingredienteslineY + 20);
                    this._ItemsRetirados.push({
                        "item": item,
                        "amount": itemQuant,
                        "type": "Arma"
                    });
                    break;
                case 'Armadura':
                    var itemId = Number(ingredienteParse["ID de Armadura"]) || 1;
                    var item = $dataArmors[itemId];
                    var itemQuant = Number(ingredienteParse["Quantia do ingrediente"]);
                    var x = this.textPadding();
                    var width = this.textWidth(item.name) < 100 ? (this.textWidth(item.name) * 2) - this.textPadding() * 4 : this.textWidth(item.name) + this.textPadding() * 4;
                    this._ingredienteslineY += 40;
                    this.drawItemName(item, x, this._ingredienteslineY, width);
                    this.drawItemNumber(item, itemQuant, 140, this._ingredienteslineY, 192);
                    this.drawHorzLine(this._ingredienteslineY + 20);
                    this._ItemsRetirados.push({
                        "item": item,
                        "amount": itemQuant,
                        "type": "Armadura"
                    });
                    break;
            }
        }, this);
    };

    Window_RecipeInformation.prototype.drawItemsObtidos = function() {
        this._itemObtidoslineY = this._ingredienteslineY + 40;
        this.recipe()["obtem"].forEach(function(itemObtido, index) {
            var itemObtidoParse = JSON.parse(itemObtido);
            switch (itemObtidoParse["Retorno"]) {
                case 'Item':
                    var itemId = Number(itemObtidoParse["ID de Item"]) || 1;
                    var item = $dataItems[itemId];
                    var itemQuant = Number(itemObtidoParse["Quantia"]);
                    var x = this.textPadding();
                    var width = this.textWidth(item.name) < 100 ? (this.textWidth(item.name) * 2) - this.textPadding() * 4 : this.textWidth(item.name) + this.textPadding() * 4;
                    this._itemObtidoslineY += 40;
                    this.drawItemName(item, x, this._itemObtidoslineY, width);
                    this.drawText(`${itemQuant}`, 360, this._itemObtidoslineY, width, 'left');
                    this.drawHorzLine(this._itemObtidoslineY + 20);
                    this._ItemsObtidos.push({
                        "item": item,
                        "amount": itemQuant,
                        "type": "Item"
                    });
                    break;
                case 'Arma':
                    var itemId = Number(itemObtidoParse["ID de Arma"]) || 1;
                    var item = $dataWeapons[itemId];
                    var itemQuant = Number(itemObtidoParse["Quantia"]);
                    var x = this.textPadding();
                    var width = this.textWidth(item.name) < 100 ? (this.textWidth(item.name) * 2) - this.textPadding() * 4 : this.textWidth(item.name) + this.textPadding() * 4;
                    this._itemObtidoslineY += 40;
                    this.drawItemName(item, x, this._itemObtidoslineY, width);
                    this.drawText(`${itemQuant}`, 360, this._itemObtidoslineY, width, 'left');
                    this.drawHorzLine(this._itemObtidoslineY + 20);
                    this._ItemsObtidos.push({
                        "item": item,
                        "amount": itemQuant,
                        "type": "Arma"
                    });
                    break;
                case 'Armadura':
                    var itemId = Number(itemObtidoParse["ID de Armadura"]) || 1;
                    var item = $dataArmors[itemId];
                    var itemQuant = Number(itemObtidoParse["Quantia"]);
                    var x = this.textPadding();
                    var width = this.textWidth(item.name) < 100 ? (this.textWidth(item.name) * 2) - this.textPadding() * 4 : this.textWidth(item.name) + this.textPadding() * 4;
                    this._itemObtidoslineY += 40;
                    this.drawItemName(item, x, this._itemObtidoslineY, width);
                    this.drawText(`${itemQuant}`, 360, this._itemObtidoslineY, width, 'left');
                    this.drawHorzLine(this._itemObtidoslineY + 20);
                    this._ItemsObtidos.push({
                        "item": item,
                        "amount": itemQuant,
                        "type": "Armadura"
                    });
                    break;
                case 'Habilidade':
                    var itemId = Number(itemObtidoParse["ID de Habilidade"]) || 1;
                    var item = $dataSkills[itemId];
                    var itemQuant = Number(itemObtidoParse["Quantia"]);
                    var x = this.textPadding();
                    var width = this.textWidth(item.name) < 100 ? (this.textWidth(item.name) * 2) - this.textPadding() * 4 : this.textWidth(item.name) + this.textPadding() * 4;
                    this._itemObtidoslineY += 40;
                    this.drawItemName(item, x, this._itemObtidoslineY, width);
                    this.drawText(`${itemQuant}`, 360, this._itemObtidoslineY, width, 'left');
                    this.drawHorzLine(this._itemObtidoslineY + 20);
                    this._ItemsObtidos.push({
                        "item": item,
                        "amount": itemQuant,
                        "type": "Habilidade"
                    });
                    break;
            }
        }, this);
    };

    Window_RecipeInformation.prototype.drawItemNumber = function(item, itemQuant, x, y, width) {
        this.changePaintOpacity($gameParty.numItems(item) >= itemQuant);
        this.drawText(`${$gameParty.numItems(item)}/${itemQuant}`, width + x, y, width, 'left');
        this.changePaintOpacity(true);
    };

    Window_RecipeInformation.prototype.drawHorzLine = function(y, width, x) {
        var lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 155;
        this.contents.fillRect(x || this.textPadding(), lineY, width || 365, 2, this.lineColor());
        this.contents.paintOpacity = 255;
    };

    Window_RecipeInformation.prototype.drawVerzLine = function(x) {
        var lineX = x + this.textPadding();
        this.contents.paintOpacity = 155;
        this.contents.fillRect(lineX, 0, 2, this.contentsHeight(), this.lineColor());
        this.contents.paintOpacity = 255;
    };

    Window_RecipeInformation.prototype.lineColor = function() {
        return this.normalColor();
    };

    Window_RecipeInformation.prototype.drawTempoDePreparo = function(x, y) {
        var tempoDePreparo = this.recipe()["tempoDePreparo"];
        this.drawIcon(220, x, y);
        x = x + 38;
        if (tempoDePreparo > 0) {
            this.drawText(tempoDePreparo, x, y, 192, 'left');
            x += this.textWidth(tempoDePreparo) + 4;
            this.makeFontSmaller();
            this.drawText('(frames 1/60 seg)', x, y, 192, 'left');
            this.makeFontBigger();
        } else {
            this.drawText('Instantâneo', x, y, 192, 'left');
        }
    };

    Window_RecipeInformation.prototype.drawMusicaDePreparo = function(x, y) {
        var musicaDePreparo = this.recipe()["tocarMusica"];
        this.drawIcon(206, x, y);
        x = x + 38;
        if (musicaDePreparo.length > 0) {
            this.drawText(musicaDePreparo, x, y, 192, 'left');
            x += this.textWidth(musicaDePreparo) + 4;
            this.makeFontSmaller();
            this.drawText('(audio/bgm)', x, y, 192, 'left');
            this.makeFontBigger();
        } else {
            this.drawText('Nenhuma', x, y, 192, 'left');
        }
    };


    Window_RecipeInformation.prototype.drawItemName = function(item, x, y, width) {
        width = width || 312;
        if (item) {
            var iconBoxWidth = Window_Base._iconWidth + 4;
            this.resetTextColor();
            this.drawIcon(item.iconIndex, x + 2, y + 2);
            this.drawText(item.name, x + iconBoxWidth + 4, y, width - iconBoxWidth);
        }
    };

    Window_RecipeInformation.prototype.drawTipoDeClasse = function(x, y) {
        if (this.recipe()["classe"].length > 0) {
            this._tipoDeClasselineY = y;
            var widthHorzLine = 365;
            this.recipe()["classe"].forEach(function(classId, index) {
                if (classId <= 0) {
                    classId = 1;
                }
                var className = $dataClasses[classId].name;
                var width = this.textWidth(className);
                var iconBoxWidth = Window_Base._iconWidth + 4;
                this.drawIcon(205, x + 2, this._tipoDeClasselineY + 2);
                this.drawText(className, x + iconBoxWidth + 4, this._tipoDeClasselineY, width);
                this.drawHorzLine(this._tipoDeClasselineY + 20, widthHorzLine, x + 2);
                this._tipoDeClasselineY += 40;
            }, this);
        } else {
            var widthHorzLine = 365;
            var width = this.textWidth('Todas as classes');
            var iconBoxWidth = Window_Base._iconWidth + 4;
            this.drawIcon(205, x + 2, y + 2);
            this.drawText('Todas as classes', x + iconBoxWidth + 4, y, width);
            this.drawHorzLine(y + 20, widthHorzLine, x + 2);
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_CraftActive
    //
    function Scene_CraftActive() {
        this.initialize.apply(this, arguments);
    }

    Scene_CraftActive.prototype = Object.create(Scene_Base.prototype);
    Scene_CraftActive.prototype.constructor = Scene_CraftActive;

    Scene_CraftActive.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
    };

    Scene_CraftActive.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        SceneManager.clearStack();
        this.startFadeIn(this.fadeSpeed(), false);
        this._craftRecipeTimer = $gameSystem.craftSystem_recipeCraftActive()["tempoDePreparo"];
    };

    Scene_CraftActive.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createBackgroundSprite();
        this.drawCraftLoad();
    };

    Scene_CraftActive.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadTitle1('Plain');
        this.addChild(this._backgroundSprite);
    };

    Scene_CraftActive.prototype.createBackgroundSprite = function() {
        this._backgroundSprite2 = new Sprite();
        this._backgroundSprite2.scale = new Point(1.5, 1.5);
        this._backgroundSprite2.anchor = new Point(0.5, 0.5);
        var x = Graphics.width / 2;
        var y = Graphics.height - 276;
        this._backgroundSprite2.move(x, y);
        this._backgroundSprite2.bitmap = ImageManager.loadEnemy('Fairy');
        this.addChild(this._backgroundSprite2);
    };

    Scene_CraftActive.prototype.drawCraftLoad = function() {
        var x = 20;
        var y = 35;
        var maxWidth = Graphics.width - x * 2;
        var recipeName = $gameSystem.craftSystem_recipeCraftActive()["nome"];
        this._craftLoadSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        this._craftLoadSprite.bitmap.textColor = 'White';
        this._craftLoadSprite.bitmap.outlineColor = 'Green';
        this._craftLoadSprite.bitmap.outlineWidth = 8;
        this._craftLoadSprite.bitmap.fontSize = 42;
        this._craftLoadSprite.bitmap.drawText('Preparando a receita:', x, y, maxWidth, 48, 'center');
        this._craftLoadSprite.bitmap.fontSize = 32;
        this._craftLoadSprite.bitmap.drawText(recipeName, x, y, maxWidth, 142, 'center');
        this.addChild(this._craftLoadSprite);
    };

    Scene_CraftActive.prototype.update = function() {
        Scene_Base.prototype.update.call(this);
        this.updateOpacityCraftLoadSprite();
        this.updateBackgroundSprite();
        this.updateCraftRecipeTimer();
        this.updateCraftComplete();
    };

    Scene_CraftActive.prototype.updateOpacityCraftLoadSprite = function() {
        if (!this._craftLoadSprite) return;
        if (this._craftLoadSpriteFrames === undefined) {
            this._craftLoadSpriteFrames = [60, 120];
        }
        if (this._craftLoadSpriteFrames[0] > 0) {
            this._craftLoadSpriteFrames[0] -= 0.60;
            if (this._craftLoadSprite.opacity > 0) {
                this._craftLoadSprite.opacity -= 2;
            }
        } else {
            if (this._craftLoadSpriteFrames[1] > 0) {
                this._craftLoadSpriteFrames[1] -= 0.60;
                if (this._craftLoadSprite.opacity < 255) {
                    this._craftLoadSprite.opacity += 4;
                }
            } else {
                this._craftLoadSpriteFrames = undefined;
            }
        }
    };

    Scene_CraftActive.prototype.updateBackgroundSprite = function() {
        if (this._backgroundSpriteFrames === undefined) {
            this._backgroundSpriteFrames = [60, 60];
        }
        if (this._backgroundSpriteFrames[0] > 0) {
            this._backgroundSpriteFrames[0] -= 0.60;
            if (this._backgroundSprite2.scale.x < 5) {
                this._backgroundSprite2.scale.x += 0.0025;
            }
            if (this._backgroundSprite2.scale.y < 5) {
                this._backgroundSprite2.scale.y += 0.0025;
            }
        } else {
            if (this._backgroundSpriteFrames[1] > 0) {
                this._backgroundSpriteFrames[1] -= 0.60;
                if (this._backgroundSprite2.scale.x > 1.5) {
                    this._backgroundSprite2.scale.x -= 0.0025;
                }
                if (this._backgroundSprite2.scale.y > 1.5) {
                    this._backgroundSprite2.scale.y -= 0.0025;
                }
            } else {
                this._backgroundSpriteFrames = undefined;
            }
        }
    };

    Scene_CraftActive.prototype.updateCraftRecipeTimer = function() {
        console.log(this._craftRecipeTimer);
        if (this._craftRecipeTimer > 0) {
            this._craftRecipeTimer -= 0.60;
        } else {
            $gameSystem.craftSystem_recipeCraftComplete();
        }
    };

    Scene_CraftActive.prototype.terminate = function() {
        Scene_Base.prototype.terminate.call(this);
        AudioManager.stopBgm();
    };

    Scene_CraftActive.prototype.updateCraftComplete = function() {
        if ($gameSystem.craftSystem_recipeCraftIsComplete()) {
            SceneManager.goto(Scene_Map);
        }
    };
})();