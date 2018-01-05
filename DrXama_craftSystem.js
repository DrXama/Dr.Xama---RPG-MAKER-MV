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
 * Crie suas receitas de craft e tenha a eficiente de um sistema de craft complexo.
 * Deixe o jogador sentir a emoção de criar uma receita!
 * ================================================================================
 *    Para os programadores
 * ================================================================================
 * Nome reservado da janela: Window_CraftSystem
 * Obter os items de craft: $gameSystem.craftSystem_items();
 * ================================================================================
 *    Texto de conclusão
 * ================================================================================
 * Você pode usar o comando ${nome} para retornar o nome da receita
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
 *  --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
 * - Propriedades dos inimigos:
 *   - Coloque o Id do inimigo.
 * HP do inimigo - inh: 1
 * MP do inimigo - inm: 1
 * Máximo de HP do inimigo - inmh: 1
 * Máximo de MP do inimigo - inmm: 1
 * Ataque do inimigo - ina: 1
 * Defesa do inimigo - ind: 1
 * Máximo de Ataque do inimigo - inma: 1
 * Máximo de Defesa do inimigo - inmd: 1
 * Agilidade do inimigo - inal: 1
 * Sorte do inimigo - ins: 1
 *  --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
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
 * ID do mapa: idmap
 * Membros do grupo: gmg
 * Dinheiro: gg
 * Passos: gp
 * Tempo de jogo: gtj
 * Tempo: gt
 * Total de saves: gts
 * Total de batalhas: gtb
 * Total de vitorias: gtv
 * Total de escapatórias: gte
 *  --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
 * Qualquer outro tipo de valor é configurado para string.
 * Caso você tenha alguma dúvida me envie uma mensagem no fórum Condado Braveheart
 * Perfil: http://www.condadobraveheart.com/forum/index.php?action=profile;u=1870
 * ================================================================================
 *    Atualização
 * ================================================================================
 * Para atualizar esse plugin vá no github do Dr.Xamã
 * https://github.com/GS-GAME-WORDS/Dr.Xama---RPG-MAKER-MV
 */
/*~struct~Lista:
 * @param Nome
 * @desc Qual o nome da sua receita?
 * @type string
 * @default Receita do DrXama
 * 
 * @param Tipo de classe
 * @desc Quais as classes que podem preparar sua receita?
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
 * @default 1
 * @max 999
 * 
 * @param Texto de conclusão
 * @desc Qual o texto que deve ser exibido quando o preparo acabar?
 * - ${Nome}: Retorna o nome da receita
 * @type string
 * @default O preparo da receita ${Nome} está completo!
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
 * @desc Você quer ativar um switch depois que o jogador terminar de preparar a receita?
 * - Deixe em 0(None) se não quiser ativar nem um switch!
 * @type switch
 * @default 0
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
 * @param Valor do switch local de conclusão
 * @parent Switch local de conclusão
 * @desc Qual o valor do switch local
 * @type select
 * @default A
 * @option A
 * @option B
 * @option C
 * @option D
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
(function () {
    "use strict";
    //-----------------------------------------------------------------------------
    // Game_System
    //
    Game_System.prototype.craftSystem_items = function () {
        return this._craftSystem_items || [];
    };

    //-----------------------------------------------------------------------------
    // Window_MenuCommand
    //
    const _Window_MenuCommand = Window_MenuCommand.prototype.addMainCommands;
    Window_MenuCommand.prototype.addMainCommands = function () {
        _Window_MenuCommand.call(this);
        var enabled = this.craftSystemEnabled();
        this.addCommand('Craft', 'craftSystem', enabled);
    };

    Window_MenuCommand.prototype.craftSystemEnabled = function () {
        return $gameSystem.craftSystem_items().length > 0;
    };
})();