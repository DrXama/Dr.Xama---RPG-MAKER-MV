//==================================================================================================
// DrXama_languageManager.js
//==================================================================================================
/*:
 * @plugindesc v2.00 - Gerenciador de traduções
 *
 * @author Dr.Xamã
 *
 * @param Compilador
 * 
 * @param Janela do compilador
 * @parent Compilador
 * @desc Deseja mostrar a janela do compilador?
 * @type boolean
 * @on Mostrar
 * @off Ocultar
 * @default true
 * 
 * @param Idioma padrão do compilador
 * @parent Compilador
 * @desc Esse é o valor padrão do idioma do compilador.
 * @type string
 * @default qualquer
 *
 * @param Imagem dos botões do compilador
 * @parent Compilador
 * @desc A imagem para os botões do compilador
 * @type file
 * @require 1
 * @dir img/system/
 * @default ButtonSet_HelpSystemInfo
 * 
 * @param Sistema
 *
 * @param Idiomas
 * @parent Sistema
 * @desc Quais os Idiomas do sistema?
 * Essa é a lista de idiomas
 * @type string[]
 * @default ["pt_br","en_us"]
 * 
 * @param Idioma
 * @parent Sistema
 * @desc Qual o idioma do sistema?
 * A lista de idiomas começa em 0
 * @type number
 * @min 0
 * @default 0
 * 
 * @param Comando Idioma
 * @parent Sistema
 * @desc Comandos para o idioma da janela de opções
 * @type struct<ComandoIdiomaOptions>[]
 * @default ["{\"Texto\":\"Idioma\",\"Valor\":\"Português-BR\",\"Idioma\":\"pt_br\"}","{\"Texto\":\"Language\",\"Valor\":\"English\",\"Idioma\":\"en_us\"}"]
 * 
 * @param Janelas
 *
 * @param Title
 * @parent Janelas
 * @desc Tetos do título
 * @type struct<JanelaTitle>
 * @default {"Texto New Game":"[\"{\\\"Valor\\\":\\\"Novo Jogo\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"New Game\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Continue":"[\"{\\\"Valor\\\":\\\"Continuar\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Continue\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]"}
 *
 * @param Menu
 * @parent Janelas
 * @desc Textos do menu do jogador
 * @type struct<JanelaMenu>
 * @default {"Texto Item":"[\"{\\\"Valor\\\":\\\"Item\\\",\\\"Idioma\\\":\\\"qualquer\\\"}\"]","Texto Skill":"[\"{\\\"Valor\\\":\\\"Habilidade\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Skill\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Equip":"[\"{\\\"Valor\\\":\\\"Equipamento\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Equipment\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Status":"[\"{\\\"Valor\\\":\\\"Status\\\",\\\"Idioma\\\":\\\"qualquer\\\"}\"]","Texto Formation":"[\"{\\\"Valor\\\":\\\"Formação\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Formation\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Options":"[\"{\\\"Valor\\\":\\\"Opções\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Options\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Save":"[\"{\\\"Valor\\\":\\\"Salvar\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Save\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Game End":"[\"{\\\"Valor\\\":\\\"Sair do jogo\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Exit the game\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Weapon":"[\"{\\\"Valor\\\":\\\"Arma\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Weapon\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Armor":"[\"{\\\"Valor\\\":\\\"Armadura\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Armor\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Key Item":"[\"{\\\"Valor\\\":\\\"Item Chave\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Key Item\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Equip(2)":"[\"{\\\"Valor\\\":\\\"Equipar\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Equip\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Optimize":"[\"{\\\"Valor\\\":\\\"Otimizar\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Optimize\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Clear":"[\"{\\\"Valor\\\":\\\"Limpar\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Clear\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]"}
 *
 * @param Battle
 * @parent Janelas
 * @desc Textos da janela de batalha
 * @type struct<CommandTexts>
 * @default {"Texto Fight":"[\"{\\\"Valor\\\":\\\"Lutar\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Fight\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Escape":"[\"{\\\"Valor\\\":\\\"Escapar\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Escape\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Attack":"[\"{\\\"Valor\\\":\\\"Atacar\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Attack\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Guard":"[\"{\\\"Valor\\\":\\\"Defender\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Guard\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]"}
 *
 * @param Shop
 * @parent Janelas
 * @desc Textos da janela da loja
 * @type struct<JanelaShop>
 * @default {"Texto Buy":"[\"{\\\"Valor\\\":\\\"Comprar\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Buy\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Sell":"[\"{\\\"Valor\\\":\\\"Vender\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Sell\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Possession":"[\"{\\\"Valor\\\":\\\"Possui\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Possession\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]"}
 *
 * @param Save
 * @parent Janelas
 * @desc Textos da janela de save
 * @type struct<JanelaSave>
 * @default {"Texto Save Message":"[\"{\\\"Valor\\\":\\\"Deseja salvar em qual arquivo?\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Do you want to save in which file?\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]"}
 *
 * @param Load
 * @parent Janelas
 * @desc Textos da janela de load
 * @type struct<JanelaLoad>
 * @default {"Texto Load Message":"[\"{\\\"Valor\\\":\\\"Deseja carregar qual arquivo?\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Do you want to load that file?\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]"}
 *
 * @param Options
 * @parent Janelas
 * @desc Textos da janela de opções
 * @type struct<JanelaOptions>
 * @default {"Texto Always Dash":"[\"{\\\"Valor\\\":\\\"Sempre Correr\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Always Dash\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Command Remember":"[\"{\\\"Valor\\\":\\\"Relembrar Comando\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Command Remember\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto BGM Volume":"[\"{\\\"Valor\\\":\\\"Volume do BGM\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"BGM Volume\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto BGS Volume":"[\"{\\\"Valor\\\":\\\"Volume do BGS\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"BGS Volume\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto ME Volume":"[\"{\\\"Valor\\\":\\\"Volume do BGS\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"ME Volume\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto SE Volume":"[\"{\\\"Valor\\\":\\\"Volume do SE\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"SE Volume\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]"}
 *
 * @param Status
 * @parent Janelas
 * @desc Textos da janela de status
 * @type struct<JanelaStatus>
 * @default {"Texto Max HP":"[\"{\\\"Valor\\\":\\\"Max HP\\\",\\\"Idioma\\\":\\\"qualquer\\\"}\"]","Texto Max MP":"[\"{\\\"Valor\\\":\\\"Max MP\\\",\\\"Idioma\\\":\\\"qualquer\\\"}\"]","Texto Attack":"[\"{\\\"Valor\\\":\\\"Ataque\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Attack\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Defense":"[\"{\\\"Valor\\\":\\\"Defesa\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Defense\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto M.Attack":"[\"{\\\"Valor\\\":\\\"M.Ataque\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"M.Attack\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto M.Defense":"[\"{\\\"Valor\\\":\\\"M.Defesa\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"M.Defense\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Agility":"[\"{\\\"Valor\\\":\\\"Agilidade\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Agility\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Luck":"[\"{\\\"Valor\\\":\\\"Sorte\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Luck\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Hit":"[\"{\\\"Valor\\\":\\\"Dano\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Hit\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Evasion":"[\"{\\\"Valor\\\":\\\"Evasão\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Evasion\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Current":"[\"{\\\"Valor\\\":\\\"%1 Atual\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 Current\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Exp":"[\"{\\\"Valor\\\":\\\"Exp\\\",\\\"Idioma\\\":\\\"qualquer\\\"}\"]","Texto Exp Next":"[\"{\\\"Valor\\\":\\\"Para o Próximo %1\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 to next\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]"}
 *
 * @param GameEnd
 * @parent Janelas
 * @desc Textos da janela de sair do jogo
 * @type struct<JanelaGameEnd>
 * @default {"Texto To Title":"[\"{\\\"Valor\\\":\\\"Para o título\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Go to Title\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]"}
 *
 * @param Básico
 *
 * @param Basic
 * @parent Básico
 * @desc Textos básicos
 * @type struct<BasicTexts>
 * @default {"Texto Gold":"[\"{\\\"Valor\\\":\\\"R$\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"$\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Lv":"[\"{\\\"Valor\\\":\\\"Nv\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Lv\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto HP":"[\"{\\\"Valor\\\":\\\"HP\\\",\\\"Idioma\\\":\\\"qualquer\\\"}\"]","Texto MP":"[\"{\\\"Valor\\\":\\\"MP\\\",\\\"Idioma\\\":\\\"qualquer\\\"}\"]","Texto TP":"[\"{\\\"Valor\\\":\\\"TP\\\",\\\"Idioma\\\":\\\"qualquer\\\"}\"]","Texto EXP":"[\"{\\\"Valor\\\":\\\"EXP\\\",\\\"Idioma\\\":\\\"qualquer\\\"}\"]","Texto File":"[\"{\\\"Valor\\\":\\\"Arquivo\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"File\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Level":"[\"{\\\"Valor\\\":\\\"Nível\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Level\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Cancel":"[\"{\\\"Valor\\\":\\\"Cancelar\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Cancel\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]"}
 *
 * @param Tipos
 *
 * @param Elementos(Tipo)
 * @parent Tipos
 * @desc Textos dos tipos de elementos
 * @type struct<ElementsTypesTexts>[]
 * @default ["{\"Texto Elemento Id\":\"1\",\"Texto Elemento Texto\":\"Físico\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Elemento Id\":\"1\",\"Texto Elemento Texto\":\"Physical\",\"Texto Idioma\":\"en_us\"}","{\"Texto Elemento Id\":\"2\",\"Texto Elemento Texto\":\"Fogo\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Elemento Id\":\"2\",\"Texto Elemento Texto\":\"Fire\",\"Texto Idioma\":\"en_us\"}","{\"Texto Elemento Id\":\"3\",\"Texto Elemento Texto\":\"Gelo\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Elemento Id\":\"3\",\"Texto Elemento Texto\":\"Ice\",\"Texto Idioma\":\"en_us\"}","{\"Texto Elemento Id\":\"4\",\"Texto Elemento Texto\":\"Trovão\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Elemento Id\":\"4\",\"Texto Elemento Texto\":\"Thunder\",\"Texto Idioma\":\"en_us\"}","{\"Texto Elemento Id\":\"5\",\"Texto Elemento Texto\":\"Água\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Elemento Id\":\"5\",\"Texto Elemento Texto\":\"Water\",\"Texto Idioma\":\"en_us\"}","{\"Texto Elemento Id\":\"6\",\"Texto Elemento Texto\":\"Terra\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Elemento Id\":\"6\",\"Texto Elemento Texto\":\"Earth\",\"Texto Idioma\":\"en_us\"}","{\"Texto Elemento Id\":\"7\",\"Texto Elemento Texto\":\"Vento\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Elemento Id\":\"7\",\"Texto Elemento Texto\":\"Wind\",\"Texto Idioma\":\"en_us\"}","{\"Texto Elemento Id\":\"8\",\"Texto Elemento Texto\":\"Luz\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Elemento Id\":\"8\",\"Texto Elemento Texto\":\"Light\",\"Texto Idioma\":\"en_us\"}","{\"Texto Elemento Id\":\"9\",\"Texto Elemento Texto\":\"Trevas\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Elemento Id\":\"9\",\"Texto Elemento Texto\":\"Darkness\",\"Texto Idioma\":\"en_us\"}"]
 *
 * @param Habilidades(Tipo)
 * @parent Tipos
 * @desc Textos dos tipos de habilidade
 * @type struct<SkillsTypeTexts>[]
 * @default ["{\"Texto Habilidade Id\":\"1\",\"Texto Habilidade Texto\":\"Magias\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Habilidade Id\":\"1\",\"Texto Habilidade Texto\":\"Magic\",\"Texto Idioma\":\"en_us\"}","{\"Texto Habilidade Id\":\"2\",\"Texto Habilidade Texto\":\"Especiais\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Habilidade Id\":\"2\",\"Texto Habilidade Texto\":\"Special\",\"Texto Idioma\":\"en_us\"}"]
 *
 * @param Armas(Tipo)
 * @parent Tipos
 * @desc Textos dos tipos de armas
 * @type struct<WeaponTypesTexts>[]
 * @default ["{\"Texto Arma Id\":\"1\",\"Texto Arma Texto\":\"Punhal\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Arma Id\":\"1\",\"Texto Arma Texto\":\"Dagger\",\"Texto Idioma\":\"en_us\"}","{\"Texto Arma Id\":\"2\",\"Texto Arma Texto\":\"Espada\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Arma Id\":\"2\",\"Texto Arma Texto\":\"Sword\",\"Texto Idioma\":\"en_us\"}","{\"Texto Arma Id\":\"3\",\"Texto Arma Texto\":\"Flail\",\"Texto Idioma\":\"qualquer\"}","{\"Texto Arma Id\":\"4\",\"Texto Arma Texto\":\"Machado\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Arma Id\":\"4\",\"Texto Arma Texto\":\"Axe\",\"Texto Idioma\":\"en_us\"}","{\"Texto Arma Id\":\"5\",\"Texto Arma Texto\":\"Chicote\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Arma Id\":\"5\",\"Texto Arma Texto\":\"Whip\",\"Texto Idioma\":\"en_us\"}","{\"Texto Arma Id\":\"6\",\"Texto Arma Texto\":\"Bengala\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Arma Id\":\"6\",\"Texto Arma Texto\":\"Cane\",\"Texto Idioma\":\"en_us\"}","{\"Texto Arma Id\":\"7\",\"Texto Arma Texto\":\"Arco\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Arma Id\":\"7\",\"Texto Arma Texto\":\"Bow\",\"Texto Idioma\":\"en_us\"}","{\"Texto Arma Id\":\"8\",\"Texto Arma Texto\":\"Besta\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Arma Id\":\"8\",\"Texto Arma Texto\":\"Crossbow\",\"Texto Idioma\":\"en_us\"}","{\"Texto Arma Id\":\"9\",\"Texto Arma Texto\":\"Revolver\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Arma Id\":\"9\",\"Texto Arma Texto\":\"Gun\",\"Texto Idioma\":\"en_us\"}","{\"Texto Arma Id\":\"10\",\"Texto Arma Texto\":\"Garra\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Arma Id\":\"10\",\"Texto Arma Texto\":\"Claw\",\"Texto Idioma\":\"en_us\"}","{\"Texto Arma Id\":\"11\",\"Texto Arma Texto\":\"Luva\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Arma Id\":\"11\",\"Texto Arma Texto\":\"Glove\",\"Texto Idioma\":\"en_us\"}","{\"Texto Arma Id\":\"12\",\"Texto Arma Texto\":\"Lança\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Arma Id\":\"12\",\"Texto Arma Texto\":\"Spear\",\"Texto Idioma\":\"en_us\"}"]
 *
 * @param Armaduras(Tipo)
 * @parent Tipos
 * @desc Textos dos tipos de armas
 * @type struct<ArmorTypesTexts>[]
 * @default ["{\"Texto Armadura Id\":\"1\",\"Texto Armadura Texto\":\"Armadura Comum\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Armadura Id\":\"1\",\"Texto Armadura Texto\":\"General Armor\",\"Texto Idioma\":\"en_us\"}","{\"Texto Armadura Id\":\"2\",\"Texto Armadura Texto\":\"Armadura Mágica\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Armadura Id\":\"2\",\"Texto Armadura Texto\":\"Magic Armor\",\"Texto Idioma\":\"en_us\"}","{\"Texto Armadura Id\":\"3\",\"Texto Armadura Texto\":\"Armadura Leve\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Armadura Id\":\"3\",\"Texto Armadura Texto\":\"Light Armor\",\"Texto Idioma\":\"en_us\"}","{\"Texto Armadura Id\":\"4\",\"Texto Armadura Texto\":\"Armadura Pesada\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Armadura Id\":\"4\",\"Texto Armadura Texto\":\"Heavy Armor\",\"Texto Idioma\":\"en_us\"}","{\"Texto Armadura Id\":\"5\",\"Texto Armadura Texto\":\"Escudo Pequeno\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Armadura Id\":\"5\",\"Texto Armadura Texto\":\"Small Shield\",\"Texto Idioma\":\"en_us\"}","{\"Texto Armadura Id\":\"6\",\"Texto Armadura Texto\":\"Escudo Grande\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Armadura Id\":\"6\",\"Texto Armadura Texto\":\"Large Shield\",\"Texto Idioma\":\"en_us\"}"]
 *
 * @param Equipamentos(Tipo)
 * @parent Tipos
 * @desc Textos dos tipos de equipamentos
 * @type struct<EquipTypesTexts>[]
 * @default ["{\"Texto Equipamento Id\":\"1\",\"Texto Equipamento Texto\":\"Arma\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Equipamento Id\":\"1\",\"Texto Equipamento Texto\":\"Weapon\",\"Texto Idioma\":\"en_us\"}","{\"Texto Equipamento Id\":\"2\",\"Texto Equipamento Texto\":\"Escudo\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Equipamento Id\":\"2\",\"Texto Equipamento Texto\":\"Shield\",\"Texto Idioma\":\"en_us\"}","{\"Texto Equipamento Id\":\"3\",\"Texto Equipamento Texto\":\"Cabeça\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Equipamento Id\":\"3\",\"Texto Equipamento Texto\":\"Head\",\"Texto Idioma\":\"en_us\"}","{\"Texto Equipamento Id\":\"4\",\"Texto Equipamento Texto\":\"Corpo\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Equipamento Id\":\"4\",\"Texto Equipamento Texto\":\"Body\",\"Texto Idioma\":\"en_us\"}","{\"Texto Equipamento Id\":\"5\",\"Texto Equipamento Texto\":\"Acessório\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Equipamento Id\":\"5\",\"Texto Equipamento Texto\":\"Accessory\",\"Texto Idioma\":\"en_us\"}"]
 *
 * @param Mensagens
 *
 * @param Geral
 * @parent Mensagens
 * @desc Textos gerais
 * @type struct<geralTexts>
 * @default {"Texto Party Name":"[\"{\\\"Valor\\\":\\\"O Grupo %1!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1's Party\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Emerge":"[\"{\\\"Valor\\\":\\\"%1 Sugiu!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 emerged!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Preemptive":"[\"{\\\"Valor\\\":\\\"%1 foi o melhor!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 got the upper hand!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Surprise":"[\"{\\\"Valor\\\":\\\"%1 ficou surpreso!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 was surprised!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Escape Start":"[\"{\\\"Valor\\\":\\\"%1 começou a escapar!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 has started to escape!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Escape Failure":"[\"{\\\"Valor\\\":\\\"No entanto, não conseguiu escapar!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"However, it was unable to escape!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Victory":"[\"{\\\"Valor\\\":\\\"%1 saiu vitorioso!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 was victorious!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Defeat":"[\"{\\\"Valor\\\":\\\"%1 saiu derrotado.\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 was defeated.\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Obtain Exp":"[\"{\\\"Valor\\\":\\\"%1 de %2 recebido!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 %2 received!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Obtain Gold":"[\"{\\\"Valor\\\":\\\"%1\\\\\\\\G encontrado!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1\\\\\\\\G found!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Obtain Item":"[\"{\\\"Valor\\\":\\\"%1 encontrado\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 found!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto level Up":"[\"{\\\"Valor\\\":\\\"%1 subiu de nivel: %2 %3!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 is now %2 %3!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Obtain Skill":"[\"{\\\"Valor\\\":\\\"Acabou de aprender %1\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 learned!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Use Item":"[\"{\\\"Valor\\\":\\\"%1 usou %2!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 uses %2!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Critical To Enemy":"[\"{\\\"Valor\\\":\\\"Um excelente golpe!!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"An excellent hit!!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Critical To Actor":"[\"{\\\"Valor\\\":\\\"Um golpe doloroso!!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"A painful blow!!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Actor Damage":"[\"{\\\"Valor\\\":\\\"%1 tomou %2 de dano!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 took %2 damage!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Actor Recovery":"[\"{\\\"Valor\\\":\\\"%1 recuperou %2 de %3!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 recovered %2 %3!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Actor Gain":"[\"{\\\"Valor\\\":\\\"%1 ganhou %2 de %3!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 gained %2 %3!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Actor Loss":"[\"{\\\"Valor\\\":\\\"%1 perdeu %2 de %3!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 lost %2 %3!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Actor Drain":"[\"{\\\"Valor\\\":\\\"%1 foi drenado, e perdeu %2 de %3!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 was drained of %2 %3!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Actor No Damage":"[\"{\\\"Valor\\\":\\\"%1 não deu nenhum dano!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 took no damage!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Actor No Hit":"[\"{\\\"Valor\\\":\\\"Errou! %1 não deu nenhum dano!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Miss! %1 took no damage!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Enemy Damage":"[\"{\\\"Valor\\\":\\\"%1 tomou %2 de dano!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 took %2 damage!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Enemy Recovery":"[\"{\\\"Valor\\\":\\\"%1 recuperou %2 de %3!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 recovered %2 %3!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Enemy Gain":"[\"{\\\"Valor\\\":\\\"%1 ganhou %2 de %3!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 gained %2 %3!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Enemy Loss":"[\"{\\\"Valor\\\":\\\"%1 perdeu %2 de %3!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 lost %2 %3!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Enemy Drain":"[\"{\\\"Valor\\\":\\\"%1 foi drenado, e perdeu %2 de %3!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 was drained of %2 %3!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Enemy No Damage":"[\"{\\\"Valor\\\":\\\"%1 não deu nenhum dano!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 took no damage!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Enemy No Hit":"[\"{\\\"Valor\\\":\\\"Errou! %1 não deu nenhum dano!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Miss! %1 took no damage!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Evasion":"[\"{\\\"Valor\\\":\\\"%1 escapou do ataque!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 evaded the attack!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Magic Evasion":"[\"{\\\"Valor\\\":\\\"%1 escapou da magia!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 nullified the magic!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Magic Reflection":"[\"{\\\"Valor\\\":\\\"%1 refletiu a magia!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 reflected the magic!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Counter Attack":"[\"{\\\"Valor\\\":\\\"%1 contra-atacou!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 counterattacked!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Substitute":"[\"{\\\"Valor\\\":\\\"%1 protegido por %2!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1 protected %2!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Buff Add":"[\"{\\\"Valor\\\":\\\"%2 aumentou para %1\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1's %2 went up!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Debuff Add":"[\"{\\\"Valor\\\":\\\"%2 diminuiu para %1\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1's %2 went down!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Buff Remove":"[\"{\\\"Valor\\\":\\\"%2 voltou ao normal para %1\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"%1's %2 returned to normal!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Action Failure":"[\"{\\\"Valor\\\":\\\"Não houve efeito sobre %1!\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"There was no effect on %1!\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]"}
 *
 * @param Especiais
 * @parent Mensagens
 * @desc Textos gerais
 * @type struct<especiaisTexts>[]
 * @default ["{\"Texto Especial Id\":\"1\",\"Texto Especial Face\":\"true\",\"Texto Especial Face Name\":\"Actor1\",\"Texto Especial Face Index\":\"0\",\"Texto Especial Texto\":\"\\\"Testando o sistema!\\\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Especial Id\":\"1\",\"Texto Especial Face\":\"true\",\"Texto Especial Face Name\":\"Actor1\",\"Texto Especial Face Index\":\"0\",\"Texto Especial Texto\":\"\\\"Testing the system!\\\"\",\"Texto Idioma\":\"en_us\"}"]
 *
 * @param Estados
 * @parent Sistema
 * @desc Textos dos estados
 * @type struct<StatesTexts>[]
 * @default ["{\"Texto Estado Id\":\"1\",\"Texto Estado Nome\":\"Nocaute\",\"Texto Estado message 1\":\"caiu!\",\"Texto Estado message 2\":\"está morto!\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"revive!\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Estado Id\":\"1\",\"Texto Estado Nome\":\"Knockout\",\"Texto Estado message 1\":\"has fallen!\",\"Texto Estado message 2\":\"is slain!\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"revives!\",\"Texto Idioma\":\"en_us\"}","{\"Texto Estado Id\":\"2\",\"Texto Estado Nome\":\"Guarda\",\"Texto Estado message 1\":\"\",\"Texto Estado message 2\":\"\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Estado Id\":\"2\",\"Texto Estado Nome\":\"Guard\",\"Texto Estado message 1\":\"\",\"Texto Estado message 2\":\"\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Estado Id\":\"3\",\"Texto Estado Nome\":\"Imortal\",\"Texto Estado message 1\":\"\",\"Texto Estado message 2\":\"\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Estado Id\":\"3\",\"Texto Estado Nome\":\"Immortal\",\"Texto Estado message 1\":\"\",\"Texto Estado message 2\":\"\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Estado Id\":\"4\",\"Texto Estado Nome\":\"Poção\",\"Texto Estado message 1\":\"está envenenado!\",\"Texto Estado message 2\":\"está envenenado!\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"já não está envenenado!\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Estado Id\":\"4\",\"Texto Estado Nome\":\"Poison\",\"Texto Estado message 1\":\"is poisoned!\",\"Texto Estado message 2\":\"is poisoned!\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"is no longer poisoned!\",\"Texto Idioma\":\"en_us\"}","{\"Texto Estado Id\":\"5\",\"Texto Estado Nome\":\"Cego\",\"Texto Estado message 1\":\"está cego!\",\"Texto Estado message 2\":\"está cego!\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"já não está cego!\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Estado Id\":\"5\",\"Texto Estado Nome\":\"Blind\",\"Texto Estado message 1\":\"is blinded!\",\"Texto Estado message 2\":\"is blinded!\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"is no longer blinded!\",\"Texto Idioma\":\"en_us\"}","{\"Texto Estado Id\":\"6\",\"Texto Estado Nome\":\"Silêncio\",\"Texto Estado message 1\":\"Está silenciado!\",\"Texto Estado message 2\":\"Está silenciado!\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"Não está mais silenciado!\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Estado Id\":\"6\",\"Texto Estado Nome\":\"Silence\",\"Texto Estado message 1\":\"is silenced!\",\"Texto Estado message 2\":\"is silenced!\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"is no longer silenced!\",\"Texto Idioma\":\"en_us\"}","{\"Texto Estado Id\":\"7\",\"Texto Estado Nome\":\"Raiva\",\"Texto Estado message 1\":\"Está enfurecido!\",\"Texto Estado message 2\":\"Está enfurecido!\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"Já não está enfurecido!\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Estado Id\":\"7\",\"Texto Estado Nome\":\"Rage\",\"Texto Estado message 1\":\"is enraged!\",\"Texto Estado message 2\":\"is enraged!\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"is no longer enraged!\",\"Texto Idioma\":\"en_us\"}","{\"Texto Estado Id\":\"8\",\"Texto Estado Nome\":\"Confusão\",\"Texto Estado message 1\":\"Está confuso!\",\"Texto Estado message 2\":\"Está confuso!\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"Já não está confuso!\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Estado Id\":\"8\",\"Texto Estado Nome\":\"Confusion\",\"Texto Estado message 1\":\"is confused!\",\"Texto Estado message 2\":\"is confused!\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"is no longer confused!\",\"Texto Idioma\":\"en_us\"}","{\"Texto Estado Id\":\"9\",\"Texto Estado Nome\":\"Paixão\",\"Texto Estado message 1\":\"Está apaixonado(a)\",\"Texto Estado message 2\":\"Está apaixonado(a)\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"Já não está mais apaixonado(a)\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Estado Id\":\"9\",\"Texto Estado Nome\":\"Fascination\",\"Texto Estado message 1\":\"is fascinated!\",\"Texto Estado message 2\":\"is fascinated!\",\"Texto Estado message 3\":\"\",\"Texto Estado message 4\":\"is no longer fascinated!\",\"Texto Idioma\":\"en_us\"}","{\"Texto Estado Id\":\"10\",\"Texto Estado Nome\":\"Sono\",\"Texto Estado message 1\":\"Adormeceu!\",\"Texto Estado message 2\":\"Adormeceu!\",\"Texto Estado message 3\":\"Está dormindo...\",\"Texto Estado message 4\":\"Não está mais dormindo!\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Estado Id\":\"10\",\"Texto Estado Nome\":\"Sleep\",\"Texto Estado message 1\":\"falls asleep!\",\"Texto Estado message 2\":\"falls asleep!\",\"Texto Estado message 3\":\"is sleeping.\",\"Texto Estado message 4\":\"wakes up!\",\"Texto Idioma\":\"en_us\"}"]
 *
 * @param Habilidades
 * @parent Sistema
 * @desc Textos das habilidades
 * @type struct<SkillsTexts>[]
 * @default ["{\"Texto Habilidade Id\":\"1\",\"Texto Habilidade Nome\":\"Ataque\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"Atacou!\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Habilidade Id\":\"1\",\"Texto Habilidade Nome\":\"Attack\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"Attacks!\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Habilidade Id\":\"2\",\"Texto Habilidade Nome\":\"Defesa\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"Defendeu!\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Habilidade Id\":\"2\",\"Texto Habilidade Nome\":\"Guard\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"Guards.\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Habilidade Id\":\"3\",\"Texto Habilidade Nome\":\"Ataque Dual\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"Atacou!\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Habilidade Id\":\"3\",\"Texto Habilidade Nome\":\"Dual Attack\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"Attacks!\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Habilidade Id\":\"4\",\"Texto Habilidade Nome\":\"Ataque Duplo\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"Atacou x2!!\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Habilidade Id\":\"4\",\"Texto Habilidade Nome\":\"Double Attack\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"Attacks!\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Habilidade Id\":\"5\",\"Texto Habilidade Nome\":\"Ataque Triplo\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"Atacou x3!!!\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Habilidade Id\":\"5\",\"Texto Habilidade Nome\":\"Triple Attack\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"Attacks!\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Habilidade Id\":\"6\",\"Texto Habilidade Nome\":\"Escapar\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"Escapou!\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Habilidade Id\":\"6\",\"Texto Habilidade Nome\":\"Escape\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"Flees.\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Habilidade Id\":\"7\",\"Texto Habilidade Nome\":\"Esperar\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"Esperando...\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Habilidade Id\":\"7\",\"Texto Habilidade Nome\":\"Wait\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"Waits.\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Habilidade Id\":\"8\",\"Texto Habilidade Nome\":\"Curar\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"Usou %1\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Habilidade Id\":\"8\",\"Texto Habilidade Nome\":\"Heal\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"casts %1!\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Habilidade Id\":\"9\",\"Texto Habilidade Nome\":\"Fogo\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"Usou %1\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Habilidade Id\":\"9\",\"Texto Habilidade Nome\":\"Fire\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"casts %1!\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Habilidade Id\":\"10\",\"Texto Habilidade Nome\":\"Choque\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"Usou %1\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Habilidade Id\":\"10\",\"Texto Habilidade Nome\":\"Spark\",\"Texto Habilidade Descrição\":\"\\\"\\\"\",\"Texto Habilidade message 1\":\"casts %1!\",\"Texto Habilidade message 2\":\"\",\"Texto Idioma\":\"en_us\"}"]
 *
 * @param Atores
 * @parent Sistema
 * @desc Textos dos atores
 * @type struct<ActorsTexts>[]
 * @default ["{\"Texto Ator Id\":\"1\",\"Texto Ator Nome\":\"Harold\",\"Texto Ator Nickname\":\"\",\"Texto Ator Profile\":\"\\\"\\\"\",\"Texto Idioma\":\"qualquer\"}","{\"Texto Ator Id\":\"2\",\"Texto Ator Nome\":\"Teresa\",\"Texto Ator Nickname\":\"\",\"Texto Ator Profile\":\"\\\"\\\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Ator Id\":\"2\",\"Texto Ator Nome\":\"Therese\",\"Texto Ator Nickname\":\"\",\"Texto Ator Profile\":\"\\\"\\\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Ator Id\":\"3\",\"Texto Ator Nome\":\"Marisa\",\"Texto Ator Nickname\":\"\",\"Texto Ator Profile\":\"\\\"\\\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Ator Id\":\"3\",\"Texto Ator Nome\":\"Marsha\",\"Texto Ator Nickname\":\"\",\"Texto Ator Profile\":\"\\\"\\\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Ator Id\":\"4\",\"Texto Ator Nome\":\"Lucio\",\"Texto Ator Nickname\":\"\",\"Texto Ator Profile\":\"\\\"\\\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Ator Id\":\"4\",\"Texto Ator Nome\":\"Lucius\",\"Texto Ator Nickname\":\"\",\"Texto Ator Profile\":\"\\\"\\\"\",\"Texto Idioma\":\"en_us\"}"]
 *
 * @param Classes
 * @parent Sistema
 * @desc Textos das classes
 * @type struct<ClassesTexts>[]
 * @default ["{\"Texto Classe Id\":\"1\",\"Texto Classe Nome\":\"Herói\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Classe Id\":\"1\",\"Texto Classe Nome\":\"Hero\",\"Texto Idioma\":\"en_us\"}","{\"Texto Classe Id\":\"2\",\"Texto Classe Nome\":\"Guerreiro\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Classe Id\":\"2\",\"Texto Classe Nome\":\"Warrior\",\"Texto Idioma\":\"en_us\"}","{\"Texto Classe Id\":\"3\",\"Texto Classe Nome\":\"Mago\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Classe Id\":\"3\",\"Texto Classe Nome\":\"Mage\",\"Texto Idioma\":\"en_us\"}","{\"Texto Classe Id\":\"4\",\"Texto Classe Nome\":\"Padre\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Classe Id\":\"4\",\"Texto Classe Nome\":\"Priest\",\"Texto Idioma\":\"en_us\"}"]
 *
 * @param Itens
 * @parent Sistema
 * @desc Textos dos itens
 * @type struct<ItemsTexts>[]
 * @default ["{\"Texto Item Id\":\"1\",\"Texto Item Nome\":\"Poção\",\"Texto Item Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Item Id\":\"1\",\"Texto Item Nome\":\"Potion\",\"Texto Item Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Item Id\":\"2\",\"Texto Item Nome\":\"Água Mágica\",\"Texto Item Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Item Id\":\"2\",\"Texto Item Nome\":\"Magic Water\",\"Texto Item Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Item Id\":\"3\",\"Texto Item Nome\":\"Dissipar Erva\",\"Texto Item Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Item Id\":\"3\",\"Texto Item Nome\":\"Dispel Herb\",\"Texto Item Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Item Id\":\"4\",\"Texto Item Nome\":\"Estimulante\",\"Texto Item Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Item Id\":\"4\",\"Texto Item Nome\":\"Stimulant\",\"Texto Item Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"en_us\"}"]
 *
 * @param Armas
 * @parent Sistema
 * @desc Textos das armas
 * @type struct<WeaponsTexts>[]
 * @default ["{\"Texto Arma Id\":\"1\",\"Texto Arma Nome\":\"Espada\",\"Texto Arma Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Arma Id\":\"1\",\"Texto Arma Nome\":\"Sword\",\"Texto Arma Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Arma Id\":\"2\",\"Texto Arma Nome\":\"Machado\",\"Texto Arma Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Arma Id\":\"2\",\"Texto Arma Nome\":\"Axe\",\"Texto Arma Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Arma Id\":\"3\",\"Texto Arma Nome\":\"Bengala\",\"Texto Arma Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Arma Id\":\"3\",\"Texto Arma Nome\":\"Cane\",\"Texto Arma Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Arma Id\":\"4\",\"Texto Arma Nome\":\"Arco\",\"Texto Arma Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Arma Id\":\"4\",\"Texto Arma Nome\":\"Bow\",\"Texto Arma Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"en_us\"}"]
 *
 * @param Armadura
 * @parent Sistema
 * @desc Textos das armaduras
 * @type struct<ArmorsTexts>[]
 * @default ["{\"Texto Armadura Id\":\"1\",\"Texto Armadura Nome\":\"Escudo\",\"Texto Armadura Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Armadura Id\":\"1\",\"Texto Armadura Nome\":\"Shield\",\"Texto Armadura Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Armadura Id\":\"2\",\"Texto Armadura Nome\":\"Chápeu\",\"Texto Armadura Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Armadura Id\":\"2\",\"Texto Armadura Nome\":\"Hat\",\"Texto Armadura Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Armadura Id\":\"3\",\"Texto Armadura Nome\":\"Pano\",\"Texto Armadura Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Armadura Id\":\"3\",\"Texto Armadura Nome\":\"Cloth\",\"Texto Armadura Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"en_us\"}","{\"Texto Armadura Id\":\"4\",\"Texto Armadura Nome\":\"Anel\",\"Texto Armadura Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Armadura Id\":\"4\",\"Texto Armadura Nome\":\"Ring\",\"Texto Armadura Descrição\":\"\\\"\\\"\",\"Texto Idioma\":\"en_us\"}"]
 *
 * @param Inimigos
 * @parent Sistema
 * @desc Textos dos inimigos
 * @type struct<EnemiesTexts>[]
 * @default ["{\"Texto Inimigo Id\":\"1\",\"Texto Inimigo Nome\":\"Morcego\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Inimigo Id\":\"1\",\"Texto Inimigo Nome\":\"Bat\",\"Texto Idioma\":\"en_us\"}","{\"Texto Inimigo Id\":\"2\",\"Texto Inimigo Nome\":\"Slime\",\"Texto Idioma\":\"qualquer\"}","{\"Texto Inimigo Id\":\"3\",\"Texto Inimigo Nome\":\"Orc\",\"Texto Idioma\":\"qualquer\"}","{\"Texto Inimigo Id\":\"4\",\"Texto Inimigo Nome\":\"Minotauro\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Inimigo Id\":\"4\",\"Texto Inimigo Nome\":\"Minotaur\",\"Texto Idioma\":\"en_us\"}"]
 *
 * @param Textos
 * @parent Sistema
 * @desc Textos para as mensagens
 * @type struct<TextsMessagesTexts>[]
 * @default ["{\"Texto Id\":\"1\",\"Texto Valor\":\"Olá Mundo!!!\",\"Texto Idioma\":\"pt_br\"}","{\"Texto Id\":\"1\",\"Texto Valor\":\"Hello World!!!\",\"Texto Idioma\":\"en_us\"}"]
 *
 * @help
 * ================================================================================
 *    Introdução
 * ================================================================================
 * Tenha um gerenciamento de traduções eficiente, agora você pode traduzir seu
 * jogo quando quiser.
 * ================================================================================
 *    Comandos de Plugin
 * ================================================================================
 * A lista começa em 0
 * - setLanguage id - Define o idioma do jogo
 * - Exemplo:
 *   setLanguage 1
 *
 * - setMessageBox id - Exibe a janela de mensagem indicada
 * - Exemplo:
 *   setMessageBox 1
 * ================================================================================
 *    Comandos de Script
 * ================================================================================
 * - this.getterLanguageSystem() - Retorna o idioma do sistema
 * - this.getTextForMessages(id) - Retorna o texto para a mensagem
 *                               - id do texto
 * ================================================================================
 *    Janela de Mensagens
 * ================================================================================
 * - \tx[id] - Exibe o texto indicado
 * - Exemplo:
 *   \tx[1]
 * ================================================================================
 *    Sistema - Textos
 * ================================================================================
 * - Valor especial :
 * - \st[1] - Volta o nome do usuário na steam ou do computador
 * - \st[userName] - Volta o nome do usuário na steam ou do computador
 * ================================================================================
 *    Tag de idioma
 * ================================================================================
 * O sistema utiliza tags para indicar os idiomas como por exemplo: pt_br
 * Por padrão o sistema tem tradução para pt_br e en_us
 * ================================================================================
 *    Compilação de textos
 * ================================================================================
 * O compilador de textos, cria arquivos para tradução do seu projeto. Se você já
 * tem projetos bem desenvolvidos, use esse sistema para traduzir o projeto.
 * 
 * - Idioma padrão do compilador(Parâmetro)
 * O valor é usado quando você deixa em branco o nome da pasta de idioma.
 * - Padrão: qualquer
 * 
 * - Banco de dados:
 * O banco de dados conta com abas como: Atores, Classes e etc, os textos dessas
 * abas serão compilados e gerados no arquivo para tradução. Se por exemplo você
 * colocar um novo ator no banco de dados, o sistema reconhece esse novo campo
 * e inclui no arquivo de tradução do projeto, então não se esqueça de ir até o
 * arquivo de tradução do projeto, quando criar algo novo no banco de dados.
 * 
 * Comandos para compilar os textos do banco de dados:
 * - Para compilar todas as abas do banco de dados use o comando:
 * - BDD_ABAS ou 1
 * - Para compilar a aba: Atores do banco de dados use o comando:
 * - BDD_ATORES ou 11
 * - Para compilar a aba: Classes do banco de dados use o comando:
 * - BDD_CLASSES ou 12
 * - Para compilar a aba: Habilidades do banco de dados use o comando:
 * - BDD_SKILLS ou 13
 * - Para compilar a aba: Itens do banco de dados use o comando:
 * - BDD_ITEMS ou 14
 * - Para compilar a aba: Armas do banco de dados use o comando:
 * - BDD_WEAPONS ou 15
 * - Para compilar a aba: Armaduras do banco de dados use o comando:
 * - BDD_ARMORS ou 16
 * - Para compilar a aba: Inimigos do banco de dados use o comando:
 * - BDD_ENEMIES ou 17
 * - Para compilar a aba: Estados do banco de dados use o comando:
 * - BDD_STATES ou 18
 * - Para compilar a aba: Tipos de elementos do banco de dados use o comando:
 * - BDD_ELEMENTS ou 19
 * - Para compilar a aba: Tipos de habilidades do banco de dados use o comando:
 * - BDD_TYPESSKILLS ou 110
 * - Para compilar a aba: Tipos de armas do banco de dados use o comando:
 * - BDD_TYPESWEAPON ou 111
 * - Para compilar a aba: Tipos de armaduras do banco de dados use o comando:
 * - BDD_TYPESARMOR ou 112
 * - Para compilar a aba: Tipos de equipamentos do banco de dados use o comando:
 * - BDD_TYPESEQUIPMENT ou 113
 * ================================================================================
 *    Pasta de idioma
 * ================================================================================
 * As pastas de idioma são criadas para organizar os arquivos de atualização,
 * quando criada uma pasta, os arquivos dentro da pasta, tem o idioma definido
 * com o nome da pasta, por exemplo, se a pasta "pt_br" é criada os arquivos
 * tem o idioma padrão definido para "pt_br", isso ajuda quando você faz uma
 * compilação com mais de 100 itens ou até mesmo 1000 itens.
 * ================================================================================
 *    Suporte
 * ================================================================================
 * Caso você não consiga usar este plugin acesse os links ou e comente sua  dúvida 
 * no post.
 * 
 * - http://drxama.epizy.com/?p=1
 * - http://www.condadobraveheart.com/forum/index.php?topic=4093.0
 * ================================================================================
 *    Termos de Uso
 * ================================================================================
 * Acesse: http://drxama.epizy.com/?page_id=296
 * ================================================================================
 *    Atualizações e Mudanças
 * ================================================================================
 * Acesse: http://drxama.epizy.com/?page_id=299
 * ================================================================================
 *    Atualizar
 * ================================================================================
 * Para atualizar esse plugin acesse:
 * https://www.dropbox.com/s/mv6xcnbpyqvlus2/DrXama_languageManager.js?dl=0
 */
(function () {
	"use strict";
	//-----------------------------------------------------------------------------
	// Parâmetros
	//
	var params = (function () {
		function JsonParse(object) {
			object = object || {};
			Object.keys(object).forEach(function (key) {
				if (object[key].length > 0) {
					object[key] = JSON.parse(object[key]) || {};
				}
			});
			return object;
		}
		var file = PluginManager.parameters('DrXama_languageManager'),
			language = JSON.parse(file['Idiomas'] || []),
			languageId = (function () {
				var fs = require('fs'),
					path_folderSystem = localPath('system'),
					path_folderLanguage = localPath('system/language/save'),
					path_fileSettingsLanguage = path_folderLanguage + '\\' + 'settingsLanguageSystem.drxamasave',
					value = Number(file['Idioma'] || 0);
				if (fs.existsSync(path_folderLanguage)) {
					if (fs.existsSync(path_fileSettingsLanguage) && !Utils.isOptionValid('test')) {
						var datafile = JSON.parse(LZString.decompressFromBase64(fs.readFileSync(path_fileSettingsLanguage, { encoding: 'utf8' })));
						value = datafile.languageId;
					}
				}
				return value;
			})(),
			title = JsonParse(JSON.parse(file['Title'] || {})),
			menu = JsonParse(JSON.parse(file['Menu'] || {})),
			shop = JsonParse(JSON.parse(file['Shop'] || {})),
			save = JsonParse(JSON.parse(file['Save'] || {})),
			load = JsonParse(JSON.parse(file['Load'] || {})),
			options = JsonParse(JSON.parse(file['Options'] || {})),
			status = JsonParse(JSON.parse(file['Status'] || {})),
			basic = JsonParse(JSON.parse(file['Basic'] || {})),
			gameEnd = JsonParse(JSON.parse(file['GameEnd'] || {})),
			battle = JsonParse(JSON.parse(file['Battle'] || {})),
			elementTypes = JsonParse(JSON.parse(file['Elementos(Tipo)'] || [])),
			skillTypes = JsonParse(JSON.parse(file['Habilidades(Tipo)'] || [])),
			weaponsTypes = JsonParse(JSON.parse(file['Armas(Tipo)'] || [])),
			armorTypes = JsonParse(JSON.parse(file['Armaduras(Tipo)'] || [])),
			equipTypes = JsonParse(JSON.parse(file['Equipamentos(Tipo)'] || [])),
			messages = JsonParse(JSON.parse(file['Geral'] || {})),
			states = JsonParse(JSON.parse(file['Estados'] || [])),
			skills = JsonParse(JSON.parse(file['Habilidades'] || [])),
			actors = JsonParse(JSON.parse(file['Atores'] || [])),
			classes = JsonParse(JSON.parse(file['Classes'] || [])),
			items = JsonParse(JSON.parse(file['Itens'] || [])),
			weapons = JsonParse(JSON.parse(file['Armas'] || [])),
			armors = JsonParse(JSON.parse(file['Armadura'] || [])),
			enemies = JsonParse(JSON.parse(file['Inimigos'] || [])),
			texts = JsonParse(JSON.parse(file['Textos'] || [])),
			specialsTexts = JsonParse(JSON.parse(file['Especiais'] || [])),
			windowToCompilator = JSON.parse(file['Janela do compilador'] || false),
			defaultLanguageCompilator = String(file['Idioma padrão do compilador'] || 'qualquer'),
			imageButtonCompilator = String(file['Imagem dos botões do compilador'] || 'ButtonSet_HelpSystemInfo'),
			commandLanguageOptions = function () {
				var commands = JsonParse(JSON.parse(file['Comando Idioma'] || [])),
					commandValue = ['???', '???'];
				commands.map(function (command) {
					let valor = String(command['Texto']),
						valor2 = String(command['Valor']),
						idioma = String(command['Idioma']);
					if (idioma == getterLanguageSystem() || idioma == 'qualquer') {
						return commandValue = [valor, valor2];
					}
				});
				return commandValue;
			};
		return {
			'language': language,
			'languageId': languageId,
			'commandLanguageOptions': commandLanguageOptions,
			'title': title,
			'menu': menu,
			'shop': shop,
			'save': save,
			'load': load,
			'options': options,
			'status': status,
			'basic': basic,
			'gameEnd': gameEnd,
			'battle': battle,
			'elementTypes': elementTypes,
			'skillTypes': skillTypes,
			'weaponsTypes': weaponsTypes,
			'armorTypes': armorTypes,
			'equipTypes': equipTypes,
			'messages': messages,
			'states': states,
			'skills': skills,
			'actors': actors,
			'classes': classes,
			'items': items,
			'weapons': weapons,
			'armors': armors,
			'enemies': enemies,
			'texts': texts,
			'specialsTexts': specialsTexts,
			'windowToCompilator': windowToCompilator,
			'defaultLanguageCompilator': defaultLanguageCompilator,
			'imageButtonCompilator': imageButtonCompilator
		}
	})();

	//-----------------------------------------------------------------------------
	// Variaveis Globais
	//
	var translateObject = {};

	//-----------------------------------------------------------------------------
	// String
	//
	String.prototype.includesEx = function (string) {
		return this.toLowerCase().replace(/\s{1,}/g, '')
			.includes(string.toLowerCase().replace(/\s{1,}/g, ''));
	};

	//-----------------------------------------------------------------------------
	// Funções
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

	// Cria a pasta do sistema
	function createSystemFolders() {
		var fs = require('fs'),
			path_folderSystem = localPath('system'),
			path_folderLanguage = localPath('system/language'),
			path_folderLanguageSave = localPath('system/language/save');
		if (!fs.existsSync(path_folderSystem)) {
			fs.mkdirSync(path_folderSystem);
		}
		if (!fs.existsSync(path_folderLanguage)) {
			fs.mkdirSync(path_folderLanguage);
		}
		if (!fs.existsSync(path_folderLanguageSave)) {
			fs.mkdirSync(path_folderLanguageSave);
		}
	};

	// Cria o arquivo de configuração do sistema
	function createFileSettingsLanguage(callback, setLanguage) {
		var fs = require('fs'),
			path_folderSystem = localPath('system'),
			path_folderLanguage = localPath('system/language/save'),
			path_fileSettingsLanguage = path_folderLanguage + '\\' + 'settingsLanguageSystem.drxamasave',
			data = LZString.compressToBase64(JSON.stringify({
				'language': params.language[params.languageId],
				'languageId': params.languageId,
				'isCompleteGame': false
			}, null, 2));
		if (fs.existsSync(path_folderLanguage)) {
			if (!fs.existsSync(path_fileSettingsLanguage) || Utils.isOptionValid('test') || setLanguage) {
				fs.writeFileSync(path_fileSettingsLanguage, data);
			}
			if (fs.existsSync(path_fileSettingsLanguage) && !Utils.isOptionValid('test')) {
				var datafile = JSON.parse(LZString.decompressFromBase64(fs.readFileSync(path_fileSettingsLanguage, { encoding: 'utf8' })));
				if (!datafile.isCompleteGame) {
					datafile.language = params.language[params.languageId];
					datafile.languageId = params.languageId;
					datafile.isCompleteGame = true;
					fs.writeFileSync(path_fileSettingsLanguage,
						LZString.compressToBase64(JSON.stringify(datafile, null, 2)));
				}
			}
		}
		if (callback) callback();
	};

	// Retorna a linguagem padrão do sistema
	function getterLanguageSystem() {
		var fs = require('fs'),
			path_folderSystem = localPath('system'),
			path_folderLanguage = localPath('system/language/save'),
			path_fileSettingsLanguage = path_folderLanguage + '\\' + 'settingsLanguageSystem.drxamasave',
			language = params.language[params.languageId];
		if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_fileSettingsLanguage)) {
			var data = JSON.parse(LZString.decompressFromBase64(
				fs.readFileSync(path_fileSettingsLanguage, {
					'encoding': 'utf8'
				})));
			language = data.language;
		}
		return language;
	};

	// Retorna o texto para a linguagem padrão do sistema
	function getterTextLanguage(object) {
		if (object instanceof Array) {
			var language = getterLanguageSystem(),
				text = '???';
			object.forEach(function (key) {
				key = JSON.parse(key) || {};
				let idioma = key.Idioma || 'qualquer',
					valor = key.Valor || '???',
					elemento = null;
				if (key.Element)
					elemento = (function () {
						var id = key.Element[1],
							stringCase = String(key.Element[0]).toLowerCase();
						switch (stringCase) {
							case 'equipamento':
							case 'armadura':
							case 'arma':
							case 'habilidade':
							case 'elemento':
							case 'statesmessage':
							case 'skills':
							case 'skillsmessage':
							case 'actors':
							case 'classes':
							case 'items':
							case 'weapons':
							case 'armors':
							case 'enemies':
								if (!translateObject[stringCase])
									translateObject[stringCase] = {};
								if (!translateObject[stringCase][id])
									translateObject[stringCase][id] = {};
								return translateObject[stringCase][id];
							case 'states':
								return $dataStates[id];
							case 'item':
								return $dataItems[id];
						}
					})();
				if (idioma === language || idioma == 'qualquer') {
					if (elemento) {
						if (!elemento.translate) {
							elemento.translate = true;
						} else {
							return;
						}
					}
					return text = valor;
				}
			});
			return text;
		}
		return '???';
	};

	// Define os textos do TextManager
	function defineTextManager() {
		Object.defineProperties(TextManager, {
			newGame: {
				value: getterTextLanguage(params.title['Texto New Game'])
			},
			continue_: {
				value: getterTextLanguage(params.title['Texto Continue'])
			},
			item: {
				value: getterTextLanguage(params.menu['Texto Item']),
			},
			skill: {
				value: getterTextLanguage(params.menu['Texto Skill'])
			},
			equip: {
				value: getterTextLanguage(params.menu['Texto Equip'])
			},
			status: {
				value: getterTextLanguage(params.menu['Texto Status'])
			},
			formation: {
				value: getterTextLanguage(params.menu['Texto Formation'])
			},
			save: {
				value: getterTextLanguage(params.menu['Texto Save'])
			},
			gameEnd: {
				value: getterTextLanguage(params.menu['Texto Game End'])
			},
			options: {
				value: getterTextLanguage(params.menu['Texto Options'])
			},
			weapon: {
				value: getterTextLanguage(params.menu['Texto Weapon'])
			},
			armor: {
				value: getterTextLanguage(params.menu['Texto Armor'])
			},
			keyItem: {
				value: getterTextLanguage(params.menu['Texto Key Item'])
			},
			equip2: {
				value: getterTextLanguage(params.menu['Texto Equip(2)'])
			},
			optimize: {
				value: getterTextLanguage(params.menu['Texto Optimize'])
			},
			clear: {
				value: getterTextLanguage(params.menu['Texto Clear'])
			},
			buy: {
				value: getterTextLanguage(params.shop['Texto Buy'])
			},
			sell: {
				value: getterTextLanguage(params.shop['Texto Sell'])
			},
			cancel: {
				value: getterTextLanguage(params.basic['Texto Cancel'])
			},
			possession: {
				value: getterTextLanguage(params.shop['Texto Possession'])
			},
			saveMessage: {
				value: getterTextLanguage(params.save['Texto Save Message'])
			},
			loadMessage: {
				value: getterTextLanguage(params.load['Texto Load Message'])
			},
			file: {
				value: getterTextLanguage(params.basic['Texto File'])
			},
			alwaysDash: {
				value: getterTextLanguage(params.options['Texto Always Dash'])
			},
			commandRemember: {
				value: getterTextLanguage(params.options['Texto Command Remember'])
			},
			bgmVolume: {
				value: getterTextLanguage(params.options['Texto BGM Volume'])
			},
			bgsVolume: {
				value: getterTextLanguage(params.options['Texto BGS Volume'])
			},
			meVolume: {
				value: getterTextLanguage(params.options['Texto ME Volume'])
			},
			seVolume: {
				value: getterTextLanguage(params.options['Texto SE Volume'])
			},
			expTotal: {
				value: getterTextLanguage(params.status['Texto Current'])
			},
			exp: {
				value: getterTextLanguage(params.status['Texto Exp'])
			},
			expNext: {
				value: getterTextLanguage(params.status['Texto Exp Next'])
			},
			level: {
				value: getterTextLanguage(params.basic['Texto Level'])
			},
			toTitle: {
				value: getterTextLanguage(params.gameEnd['Texto To Title'])
			},
			fight: {
				value: getterTextLanguage(params.battle['Texto Fight'])
			},
			escape: {
				value: getterTextLanguage(params.battle['Texto Escape'])
			},
			attack: {
				value: getterTextLanguage(params.battle['Texto Attack'])
			},
			guard: {
				value: getterTextLanguage(params.battle['Texto Guard'])
			}
		});
	};

	// Define os textos dos termos
	var systemTerms = {
		'params': null,
		'basic': null
	};
	function defineSystemTerms() {
		if (systemTerms.params instanceof Array === false) systemTerms.params = $dataSystem.terms.params.slice(0);
		if (systemTerms.basic instanceof Array === false) systemTerms.basic = $dataSystem.terms.basic.slice(0);
		function setTextParameter(manager, value, object, object2, index) {
			Object.keys(manager).forEach(function (key) {
				if (key.includesEx(String(value))) {
					object2[index] = getterTextLanguage(manager[key]);
				}
				if (key.includesEx(String('gold'))) {
					$dataSystem.currencyUnit = getterTextLanguage(manager[key]);
				}
			});
		};

		function setTextParameter2(manager, stringIndex, object, index) {
			manager.forEach(function (key) {
				var id = Number(key['Texto ' + stringIndex + ' Id']),
					text = String(key['Texto ' + stringIndex + ' Texto']),
					language = String(key['Texto Idioma']);
				if (id == index) {
					var translateId = String(stringIndex).toLowerCase();
					if (!translateObject[translateId] || translateObject[translateId] && !translateObject[translateId][index] ||
						translateObject[translateId] && translateObject[translateId][index] && !translateObject[translateId][index].translate) {
						object[index] = getterTextLanguage([
							JSON.stringify({
								'Idioma': language,
								'Valor': text,
								'Element': [
									stringIndex,
									index
								]
							})
						])
					}
				}
			});
		};

		function setTextParameterMessage(manager, object) {
			Object.keys(manager).forEach(function (key) {
				Object.keys(object).forEach(function (key2) {
					if (key.includesEx(String(key2))) {
						object[key2] = getterTextLanguage(manager[key])
					}
				});
			});
		};
		setTextParameterMessage(params.messages, $dataSystem.terms.messages);
		var i = 0,
			length = systemTerms.params.length,
			object = systemTerms.params;
		for (; i < length; i++) {
			setTextParameter(params.status, object[i], object, $dataSystem.terms.params, i);
		}
		i = 0,
			length = systemTerms.basic.length,
			object = systemTerms.basic;
		for (; i < length; i++) {
			setTextParameter(params.basic, object[i], object, $dataSystem.terms.basic, i);
		}
		i = 0,
			length = $dataSystem.elements.length,
			object = $dataSystem.elements;
		for (; i < length; i++) {
			setTextParameter2(params.elementTypes, 'Elemento', object, i);
		}
		i = 0,
			length = $dataSystem.skillTypes.length,
			object = $dataSystem.skillTypes;
		for (; i < length; i++) {
			setTextParameter2(params.skillTypes, 'Habilidade', object, i);
		}
		i = 0,
			length = $dataSystem.weaponTypes.length,
			object = $dataSystem.weaponTypes;
		for (; i < length; i++) {
			setTextParameter2(params.weaponsTypes, 'Arma', object, i);
		}
		i = 0,
			length = $dataSystem.armorTypes.length,
			object = $dataSystem.armorTypes;
		for (; i < length; i++) {
			setTextParameter2(params.armorTypes, 'Armadura', object, i);
		}
		i = 0,
			length = $dataSystem.equipTypes.length,
			object = $dataSystem.equipTypes;
		for (; i < length; i++) {
			setTextParameter2(params.equipTypes, 'Equipamento', object, i);
		}
	};

	// Define os textos dos estados
	function defineSystemStates() {
		if (params.states instanceof Array) {
			params.states.forEach(function (state) {
				var id = Number(state['Texto Estado Id']),
					name = String(state['Texto Estado Nome']),
					messages = [
						String(state['Texto Estado message 1']),
						String(state['Texto Estado message 2']),
						String(state['Texto Estado message 3']),
						String(state['Texto Estado message 4'])
					],
					language = String(state['Texto Idioma']);
				if ($dataStates[id]) {
					if (name.length > 0) {
						if (!$dataStates[id].translate) {
							$dataStates[id].name = getterTextLanguage([
								JSON.stringify({
									'Idioma': language,
									'Valor': name,
									'Element': [
										'states',
										id
									]
								})
							]);
						}
					}
					messages.forEach(function (message, index) {
						var messageId = index + 1;
						if (message.length > 0) {
							if (!translateObject['statesmessage'] ||
								translateObject['statesmessage'] && !translateObject['statesmessage']['message' + messageId] ||
								translateObject['statesmessage'] && translateObject['statesmessage']['message' + messageId] &&
								!translateObject['statesmessage']['message' + messageId].translate) {
								$dataStates[id]['message' + messageId] = getterTextLanguage([
									JSON.stringify({
										'Idioma': language,
										'Valor': ' ' + message,
										'Element': [
											'statesMessage',
											'message' + messageId
										]
									})
								]);
							}
						}
					});
				}
			});
		}
	};

	// Define os textos das habilidades
	function defineSystemSkills() {
		if (params.skills instanceof Array) {
			params.skills.forEach(function (skill) {
				var id = Number(skill['Texto Habilidade Id']),
					name = String(skill['Texto Habilidade Nome']),
					description = JSON.parse(skill['Texto Habilidade Descrição']),
					messages = [
						String(skill['Texto Habilidade message 1']),
						String(skill['Texto Habilidade message 2'])
					],
					language = String(skill['Texto Idioma']);
				if ($dataSkills[id]) {
					if (name.length > 0) {
						if (!translateObject['skills'] ||
							translateObject['skills'] &&
							!translateObject['skills']['name' + id] ||
							translateObject['skills'] &&
							translateObject['skills']['name' + id] &&
							!translateObject['skills']['name' + id].translate) {
							$dataSkills[id].name = getterTextLanguage([
								JSON.stringify({
									'Idioma': language,
									'Valor': name,
									'Element': [
										'skills',
										'name' + id
									]
								})
							]);
						}
					}
					if (description.length > 0) {
						if (!translateObject['skills'] ||
							translateObject['skills'] &&
							!translateObject['skills']['description' + id] ||
							translateObject['skills'] &&
							translateObject['skills']['description' + id] &&
							!translateObject['skills']['description' + id].translate) {
							$dataSkills[id].description = getterTextLanguage([
								JSON.stringify({
									'Idioma': language,
									'Valor': description,
									'Element': [
										'skills',
										'description' + id
									]
								})
							]);
						}
					}
					messages.forEach(function (message, index) {
						var messageId = index + 1;
						if (message.length > 0) {
							if (!translateObject['skillsmessage'] ||
								translateObject['skillsmessage'] &&
								!translateObject['skillsmessage']['message' + messageId] ||
								translateObject['skillsmessage'] &&
								translateObject['skillsmessage']['message' + messageId] &&
								!translateObject['skillsmessage']['message' + messageId].translate) {
								$dataSkills[id]['message' + messageId] = getterTextLanguage([
									JSON.stringify({
										'Idioma': language,
										'Valor': ' ' + message,
										'Element': [
											'skillsMessage',
											'message' + messageId
										]
									})
								]);
							}
						}
					});
				}
			});
		}
	};

	// Define os textos dos atores
	function defineSystemActors() {
		if (params.actors instanceof Array) {
			params.actors.forEach(function (actor) {
				var id = Number(actor['Texto Ator Id']),
					name = String(actor['Texto Ator Nome']),
					nickname = String(actor['Texto Ator Nickname']),
					profile = JSON.parse(actor['Texto Ator Profile']),
					language = String(actor['Texto Idioma']);
				if ($dataActors[id]) {
					if (name.length > 0) {
						if (!translateObject['actors'] ||
							translateObject['actors'] &&
							!translateObject['actors']['name' + id] ||
							translateObject['actors'] &&
							translateObject['actors']['name' + id] &&
							!translateObject['actors']['name' + id].translate) {
							$dataActors[id].name = getterTextLanguage([
								JSON.stringify({
									'Idioma': language,
									'Valor': name,
									'Element': [
										'Actors',
										'name' + id
									]
								})
							]);
						}
					}
					if (nickname.length > 0) {
						if (!translateObject['actors'] ||
							translateObject['actors'] &&
							!translateObject['actors']['nickname' + id] ||
							translateObject['actors'] &&
							translateObject['actors']['nickname' + id] &&
							!translateObject['actors']['nickname' + id].translate) {
							$dataActors[id].nickname = getterTextLanguage([
								JSON.stringify({
									'Idioma': language,
									'Valor': nickname,
									'Element': [
										'Actors',
										'nickname' + id
									]
								})
							]);
						}
					}
					if (profile.length > 0) {
						if (!translateObject['actors'] ||
							translateObject['actors'] &&
							!translateObject['actors']['profile' + id] ||
							translateObject['actors'] &&
							translateObject['actors']['profile' + id] &&
							!translateObject['actors']['profile' + id].translate) {
							$dataActors[id].profile = getterTextLanguage([
								JSON.stringify({
									'Idioma': language,
									'Valor': profile,
									'Element': [
										'Actors',
										'profile' + id
									]
								})
							]);
						}
					}
				}
			});
		}
	};

	// Define os textos das classes
	function defineSystemClasses() {
		if (params.classes instanceof Array) {
			params.classes.forEach(function (classe) {
				var id = Number(classe['Texto Classe Id']),
					name = String(classe['Texto Classe Nome']),
					language = String(classe['Texto Idioma']);
				if ($dataClasses[id]) {
					if (name.length > 0) {
						if (!translateObject['classes'] ||
							translateObject['classes'] &&
							!translateObject['classes']['name' + id] ||
							translateObject['classes'] &&
							translateObject['classes']['name' + id] &&
							!translateObject['classes']['name' + id].translate) {
							$dataClasses[id].name = getterTextLanguage([
								JSON.stringify({
									'Idioma': language,
									'Valor': name,
									'Element': [
										'Classes',
										'name' + id
									]
								})
							]);
						}
					}
				}
			});
		}
	};

	// Define os textos das itens
	function defineSystemItems() {
		if (params.items instanceof Array) {
			params.items.forEach(function (item) {
				var id = Number(item['Texto Item Id']),
					name = String(item['Texto Item Nome']),
					description = JSON.parse(item['Texto Item Descrição']),
					language = String(item['Texto Idioma']);
				if ($dataItems[id]) {
					if (name.length > 0) {
						if (!translateObject['items'] ||
							translateObject['items'] &&
							!translateObject['items']['name' + id] ||
							translateObject['items'] &&
							translateObject['items']['name' + id] &&
							!translateObject['items']['name' + id].translate) {
							$dataItems[id].name = getterTextLanguage([
								JSON.stringify({
									'Idioma': language,
									'Valor': name,
									'Element': [
										'Items',
										'name' + id
									]
								})
							]);
						}
					}
					if (description.length > 0) {
						if (!translateObject['items'] ||
							translateObject['items'] &&
							!translateObject['items']['description' + id] ||
							translateObject['items'] &&
							translateObject['items']['description' + id] &&
							!translateObject['items']['description' + id].translate) {
							$dataItems[id].description = getterTextLanguage([
								JSON.stringify({
									'Idioma': language,
									'Valor': description,
									'Element': [
										'Items',
										'description' + id
									]
								})
							]);
						}
					}
				}
			});
		}
	};

	// Define os textos das armas
	function defineSystemWeapons() {
		if (params.weapons instanceof Array) {
			params.weapons.forEach(function (weapon) {
				var id = Number(weapon['Texto Arma Id']),
					name = String(weapon['Texto Arma Nome']),
					description = JSON.parse(weapon['Texto Arma Descrição']),
					language = String(weapon['Texto Idioma']);
				if ($dataWeapons[id]) {
					if (name.length > 0) {
						if (!translateObject['weapons'] ||
							translateObject['weapons'] &&
							!translateObject['weapons']['name' + id] ||
							translateObject['weapons'] &&
							translateObject['weapons']['name' + id] &&
							!translateObject['weapons']['name' + id].translate) {
							$dataWeapons[id].name = getterTextLanguage([
								JSON.stringify({
									'Idioma': language,
									'Valor': name,
									'Element': [
										'Weapons',
										'name' + id
									]
								})
							]);
						}
					}
					if (description.length > 0) {
						if (!translateObject['weapons'] ||
							translateObject['weapons'] &&
							!translateObject['weapons']['description' + id] ||
							translateObject['weapons'] &&
							translateObject['weapons']['description' + id] &&
							!translateObject['weapons']['description' + id].translate) {
							$dataWeapons[id].description = getterTextLanguage([
								JSON.stringify({
									'Idioma': language,
									'Valor': description,
									'Element': [
										'Weapons',
										'description' + id
									]
								})
							]);
						}
					}
				}
			});
		}
	};

	// Define os textos das armaduras
	function defineSystemArmors() {
		if (params.armors instanceof Array) {
			params.armors.forEach(function (armor) {
				var id = Number(armor['Texto Armadura Id']),
					name = String(armor['Texto Armadura Nome']),
					description = JSON.parse(armor['Texto Armadura Descrição']),
					language = String(armor['Texto Idioma']);
				if ($dataArmors[id]) {
					if (name.length > 0) {
						if (!translateObject['armors'] ||
							translateObject['armors'] &&
							!translateObject['armors']['name' + id] ||
							translateObject['armors'] &&
							translateObject['armors']['name' + id] &&
							!translateObject['armors']['name' + id].translate) {
							$dataArmors[id].name = getterTextLanguage([
								JSON.stringify({
									'Idioma': language,
									'Valor': name,
									'Element': [
										'Armors',
										'name' + id
									]
								})
							]);
						}
					}
					if (description.length > 0) {
						if (!translateObject['armors'] ||
							translateObject['armors'] &&
							!translateObject['armors']['description' + id] ||
							translateObject['armors'] &&
							translateObject['armors']['description' + id] &&
							!translateObject['armors']['description' + id].translate) {
							$dataArmors[id].description = getterTextLanguage([
								JSON.stringify({
									'Idioma': language,
									'Valor': description,
									'Element': [
										'Armors',
										'description' + id
									]
								})
							]);
						}
					}
				}
			});
		}
	};

	// Define os textos das inimigos
	function defineSystemEnemies() {
		if (params.enemies instanceof Array) {
			params.enemies.forEach(function (enemies) {
				var id = Number(enemies['Texto Inimigo Id']),
					name = String(enemies['Texto Inimigo Nome']),
					language = String(enemies['Texto Idioma']);
				if ($dataEnemies[id]) {
					if (name.length > 0) {
						if (!translateObject['enemies'] ||
							translateObject['enemies'] &&
							!translateObject['enemies']['name' + id] ||
							translateObject['enemies'] &&
							translateObject['enemies']['name' + id] &&
							!translateObject['enemies']['name' + id].translate) {
							$dataEnemies[id].name = getterTextLanguage([
								JSON.stringify({
									'Idioma': language,
									'Valor': name,
									'Element': [
										'Enemies',
										'name' + id
									]
								})
							]);
						}
					}
				}
			});
		}
	};

	// Define os nomes dos Game_Actors
	function defineGameActors() {
		if ($gameActors instanceof Game_Actors) {
			$gameActors._data.map(function (actor) {
				if (actor instanceof Game_Actor) {
					let data = $dataActors[actor.actorId()];
					actor.setName(data.name);
					actor.setNickname(data.nickname);
					actor.setProfile(data.profile);
				}
			});
		}
	};

	// Retorna o texto para as mensagens
	function getTextForMessages(id) {
		var texto = '???';
		if (params.texts instanceof Array) {
			params.texts.forEach(function (text) {
				var _id = Number(text['Texto Id']),
					valor = String(text['Texto Valor']),
					language = String(text['Texto Idioma']);
				if (_id == id) {
					if (params.language[params.languageId] == String(language).toLowerCase() || String(language).toLowerCase() == 'qualquer') {
						return texto = getterTextLanguage([
							JSON.stringify({
								'Idioma': language,
								'Valor': convertEscapeCharacters(valor)
							})
						]);
					}
				}
			});
		}
		return texto;
	};

	// Converte o texto
	function convertEscapeCharacters(text) {
		text = text.replace(/\\/g, '\x1b');
		text = text.replace(/\x1b\x1b/g, '\\');
		text = text.replace(/\x1bST\[(.*)\]/gi, function () {
			return specialTextValue(arguments[1]);
		}.bind(this));
		return text;
	};

	// Retorna o valor especial
	function specialTextValue(code) {
		switch (String(code).toLowerCase()) {
			case 'username':
			case '1':
				return process.env.SteamAppUser || process.env.USERNAME;
		}
	};

	// Define todos os textos
	function defineAllTexts() {
		defineTextManager();
		defineSystemTerms();
		defineSystemStates();
		defineSystemSkills();
		defineSystemActors();
		defineSystemClasses();
		defineSystemItems();
		defineSystemWeapons();
		defineSystemArmors();
		defineSystemEnemies();
		defineGameActors();
	};

	function setMessageBox(messageId) {
		var specialsTexts = params.specialsTexts;
		if (specialsTexts instanceof Array) {
			specialsTexts.forEach(function (specialText) {
				var language = getterLanguageSystem(),
					idioma = String(specialText['Texto Idioma']),
					id = Number(specialText['Texto Especial Id']),
					valor = String(specialText['Texto Especial Texto']).replace(/\"/g, '').split('\\n'),
					face = [
						Boolean(JSON.parse(specialText['Texto Especial Face'])),
						String(specialText['Texto Especial Face Name']),
						Number(specialText['Texto Especial Face Index'])
					];
				if (id == messageId) {
					if (language == idioma || idioma == 'qualquer') {
						if (face[0]) {
							$gameMessage.setFaceImage(face[1], face[2]);
						}
						valor.forEach(function (message) {
							$gameMessage.add(message);
						});
					}
				}
			});
		}
	};

	// Cria uma tela de ajuda para o usuario
	var winHelpSystemInfo;
	function helpWindowSystemInfo() {
		if (Utils.isOptionValid('test')) {
			if (!winHelpSystemInfo) {
				winHelpSystemInfo = true;
				SceneManager.push(Scene_HelpSystemInfo);
			}
		}
	};

	// Inicia o sistema
	function initializeSystem() {
		loadSystemTextsFolders();
		createSystemFolders();
		if (params.windowToCompilator) {
			if (!winHelpSystemInfo) {
				createFileSettingsLanguage();
			} else {
				createFileSettingsLanguage(defineAllTexts);
			}
			helpWindowSystemInfo();
		} else {
			createFileSettingsLanguage(defineAllTexts);
		}
	};

	// Carrega os textos personalizados nas pastas
	function loadSystemTextsFolders() {
		var fs = require('fs'),
			path_folderSystem = localPath('system'),
			path_folderLanguage = localPath('system/language'),
			path_folderLanguageTranslate = localPath(`system/language/translate`),
			folders = [],
			setValues = {
				'actors': false,
				'classes': false,
				'skills': false,
				'items': false,
				'weapons': false,
				'armors': false,
				'enemies': false,
				'states': false,
				'elements': false,
				'skillTypes': false,
				'weaponTypes': false,
				'armorTypes': false,
				'equipmentTypes': false
			};
		if (fs.existsSync(path_folderLanguage)) {
			if (fs.existsSync(path_folderLanguageTranslate)) {
				// Lista as pastas
				fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
					let folderPath = path_folderLanguageTranslate + '\\' + folder;
					if (fs.lstatSync(folderPath).isDirectory()) {
						folders.push(folderPath);
					}
				});
				// Lista os arquivos nas pastas
				folders.map(function (folder) {
					if (fs.existsSync(folder)) {
						fs.readdirSync(folder).forEach(function (file) {
							let filePath = folder + '\\' + file,
								fileType = null;
							if (fs.lstatSync(filePath).isFile()) {
								if (String(file).toLowerCase().includesEx('actors')) {
									fileType = 'actors';
									if (!setValues.actors) {
										setValues.actors = true;
										params.actors = [];
									}
								} else if (String(file).toLowerCase().includesEx('classes')) {
									fileType = 'classes';
									if (!setValues.classes) {
										setValues.classes = true;
										params.classes = [];
									}
								} else if (String(file).toLowerCase().includesEx('skills')) {
									fileType = 'skills';
									if (!setValues.skills) {
										setValues.skills = true;
										params.skills = [];
									}
								} else if (String(file).toLowerCase().includesEx('items')) {
									fileType = 'items';
									if (!setValues.items) {
										setValues.items = true;
										params.items = [];
									}
								} else if (String(file).toLowerCase().includesEx('weapons')) {
									fileType = 'weapons';
									if (!setValues.weapons) {
										setValues.weapons = true;
										params.weapons = [];
									}
								} else if (String(file).toLowerCase().includesEx('armors')) {
									fileType = 'armors';
									if (!setValues.armors) {
										setValues.armors = true;
										params.armors = [];
									}
								} else if (String(file).toLowerCase().includesEx('enemies')) {
									fileType = 'enemies';
									if (!setValues.enemies) {
										setValues.enemies = true;
										params.enemies = [];
									}
								} else if (String(file).toLowerCase().includesEx('states')) {
									fileType = 'states';
									if (!setValues.states) {
										setValues.states = true;
										params.states = [];
									}
								} else if (String(file).toLowerCase().includesEx('elements')) {
									fileType = 'elements';
									if (!setValues.elements) {
										setValues.elements = true;
										params.elementTypes = [];
									}
								} else if (String(file).toLowerCase().includesEx('skillTypes')) {
									fileType = 'skillTypes';
									if (!setValues.skillTypes) {
										setValues.skillTypes = true;
										params.skillTypes = [];
									}
								} else if (String(file).toLowerCase().includesEx('weaponTypes')) {
									fileType = 'weaponTypes';
									if (!setValues.weaponTypes) {
										setValues.weaponTypes = true;
										params.weaponsTypes = [];
									}
								} else if (String(file).toLowerCase().includesEx('armorTypes')) {
									fileType = 'armorTypes';
									if (!setValues.armorTypes) {
										setValues.armorTypes = true;
										params.armorTypes = [];
									}
								} else if (String(file).toLowerCase().includesEx('equipmentTypes')) {
									fileType = 'equipmentTypes';
									if (!setValues.equipmentTypes) {
										setValues.equipmentTypes = true;
										params.equipTypes = [];
									}
								}
								let datafile = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
								if (datafile instanceof Array) {
									if (fileType === 'actors') {
										if ($dataActors.length > datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.includeIncompileTextsActors(datafile);
										} else if ($dataActors.length < datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.removeIncompileTextsActors(datafile);
										}
									} else if (fileType === 'classes') {
										if ($dataClasses.length > datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.includeIncompileTextsClasses(datafile);
										} else if ($dataClasses.length < datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.removeIncompileTextsClasses(datafile);
										}
									} else if (fileType === 'skills') {
										if ($dataSkills.length > datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.includeIncompileTextsSkills(datafile);
										} else if ($dataSkills.length < datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.removeIncompileTextsSkills(datafile);
										}
									} else if (fileType === 'items') {
										if ($dataItems.length > datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.includeIncompileTextsItems(datafile);
										} else if ($dataItems.length < datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.removeIncompileTextsItems(datafile);
										}
									} else if (fileType === 'weapons') {
										if ($dataWeapons.length > datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.includeIncompileTextsWeapons(datafile);
										} else if ($dataWeapons.length < datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.removeIncompileTextsWeapons(datafile);
										}
									} else if (fileType === 'armors') {
										if ($dataWeapons.length > datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.includeIncompileTextsArmors(datafile);
										} else if ($dataWeapons.length < datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.removeIncompileTextsActors(datafile);
										}
									} else if (fileType === 'enemies') {
										if ($dataEnemies.length > datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.includeIncompileTextsEnemies(datafile);
										} else if ($dataEnemies.length < datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.removeIncompileTextsEnemies(datafile);
										}
									} else if (fileType === 'states') {
										if ($dataStates.length > datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.includeIncompileTextsStates(datafile);
										} else if ($dataStates.length < datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.removeIncompileTextsStates(datafile);
										}
									} else if (fileType === 'elements') {
										if ($dataSystem.elements.length > datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.includeIncompileTextsTypesElements(datafile);
										} else if ($dataSystem.elements.length < datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.removeIncompileTextsTypesElements(datafile);
										}
									} else if (fileType === 'skillTypes') {
										if ($dataSystem.skillTypes.length > datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.includeIncompileTextsTypesSkills(datafile);
										} else if ($dataSystem.skillTypes.length < datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.removeIncompileTextsTypesSkills(datafile);
										}
									} else if (fileType === 'weaponTypes') {
										if ($dataSystem.weaponTypes.length > datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.includeIncompileTextsTypesWeapon(datafile);
										} else if ($dataSystem.weaponTypes.length < datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.removeIncompileTextsTypesWeapon(datafile);
										}
									} else if (fileType === 'armorTypes') {
										if ($dataSystem.armorTypes.length > datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.includeIncompileTextsTypesArmor(datafile);
										} else if ($dataSystem.armorTypes.length < datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.removeIncompileTextsTypesArmor(datafile);
										}
									} else if (fileType === 'equipmentTypes') {
										if ($dataSystem.equipTypes.length > datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.includeIncompileTextsTypesEquipment(datafile);
										} else if ($dataSystem.equipTypes.length < datafile.length) {
											datafile = Scene_HelpSystemInfo.prototype.removeIncompileTextsTypesEquipment(datafile);
										}
									}
									datafile.map(function (content) {
										if (content) {
											if (fileType === 'actors') {
												params.actors.push(content);
											} else if (fileType === 'classes') {
												params.classes.push(content);
											} else if (fileType === 'skills') {
												params.skills.push(content);
											} else if (fileType === 'items') {
												params.items.push(content);
											} else if (fileType === 'weapons') {
												params.weapons.push(content);
											} else if (fileType === 'armors') {
												params.armors.push(content);
											} else if (fileType === 'enemies') {
												params.enemies.push(content);
											} else if (fileType === 'states') {
												params.states.push(content);
											} else if (fileType === 'elements') {
												params.elementTypes.push(content);
											} else if (fileType === 'skillTypes') {
												params.skillTypes.push(content);
											} else if (fileType === 'weaponTypes') {
												params.weaponsTypes.push(content);
											} else if (fileType === 'armorTypes') {
												params.armorTypes.push(content);
											} else if (fileType === 'equipmentTypes') {
												params.equipTypes.push(content);
											}
										}
									});
								}
							}
						});
					}
				});
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Scene_HelpSystemInfo
	//
	// The scene class of the title screen.

	function Scene_HelpSystemInfo() {
		this.initialize.apply(this, arguments);
	}

	Scene_HelpSystemInfo.prototype = Object.create(Scene_Base.prototype);
	Scene_HelpSystemInfo.prototype.constructor = Scene_HelpSystemInfo;

	Scene_HelpSystemInfo.prototype.initialize = function () {
		Scene_Base.prototype.initialize.call(this);
	};

	Scene_HelpSystemInfo.prototype.create = function () {
		Scene_Base.prototype.create.call(this);
		this.createBackground();
		this.createButtons();
	};

	Scene_HelpSystemInfo.prototype.start = function () {
		Scene_Base.prototype.start.call(this);
		this.startFadeIn(this.fadeSpeed(), false);
	};

	Scene_HelpSystemInfo.prototype.updateFade = function () {
		if (this._fadeDuration > 0) {
			var d = this._fadeDuration;
			if (this._fadeSign > 0) {
				this._fadeSprite.opacity -= this._fadeSprite.opacity / d;
			} else {
				this._fadeSprite.opacity += (255 - this._fadeSprite.opacity) / d;
			}
			this._fadeDuration--;
		}
		if (this._fadeDuration <= 0 && this._closeWin) {
			translateObject = {};
			SceneManager.pop();
		}
	};

	Scene_HelpSystemInfo.prototype.createBackground = function () {
		var texts = [
			['Escolha a melhor forma para traduzir o seu jogo!', 28],
			['Está janela só irá ser exibida no modo de teste do projeto!', 18],
			['Plugin: DrXama_languageManager.js', 14],
			['Compilar os Textos: Gera os arquivos para traduzir o jogo!', 14],
			['Ver pasta translate: Exibe a pasta no computador', 14]
		];
		this._backSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
		this._backSprite.bitmap.fillAll('#005bb7');
		texts.forEach(function (text, keyId) {
			var keyY = 92;
			if (keyId > 0) {
				keyY += 42 * keyId;
			}
			this._backSprite.bitmap.fontSize = text[1];
			this._backSprite.bitmap.drawText(text[0],
				0, keyY, Graphics.width, 0, 'center');
		}, this);
		this.addChild(this._backSprite);
	};

	Scene_HelpSystemInfo.prototype.createButtons = function () {
		this._buttons = [
			{
				'sprite': new Sprite_Button(),
				'y': Graphics.height / 2,
				'event': 'compilarTextos',
				'text': 'Compilar os textos'
			},
			{
				'sprite': new Sprite_Button(),
				'y': (Graphics.height / 2) + 70,
				'event': 'mostrarPastaTranslate',
				'text': 'Ver pasta translate'
			},
			{
				'sprite': new Sprite_Button(),
				'y': (Graphics.height / 2) + 140,
				'event': 'compilationExit',
				'text': 'Sair'
			}
		];
		this._buttons.map(function (data) {
			var button = data.sprite,
				positionY = data.y,
				buttonEvent = data.event,
				buttonText = data.text;
			button.bitmap = ImageManager.loadSystem(params.imageButtonCompilator);
			button.setColdFrame(0, 0, 180, 65);
			button.setHotFrame(0, 65, 180, 65);
			button.setClickHandler(this.buttonsEventCall.bind(this, buttonEvent));
			button.move((Graphics.width / 2) - (180 / 2), positionY);
			var text = new Sprite(new Bitmap(180, 65)),
				textColor = ['#ebebeb', '#ffffff'],
				textValue = buttonText,
				textFontSize = 16,
				textX = 0,
				textY = 65 / 2;
			text.bitmap.fontSize = textFontSize;
			text.bitmap.drawText(textValue, textX, textY, 180, 0, 'center');
			button.addChild(text);
			this.addChild(button);
			// Define o processo de updateFrame do botão 1
			var __updateFrame = button.updateFrame;
			button.updateFrame = function () {
				__updateFrame.call(this);
				if (button._touching && !button._textPress) {
					button._textPress = true;
					button.children[0].bitmap.clear();
					button.children[0].bitmap.textColor = textColor[0];
					button.children[0].bitmap.drawText(textValue, textX, textY, 180, 0, 'center');
				} else if (!button._touching && button._textPress) {
					button._textPress = false;
					button.children[0].bitmap.clear();
					button.children[0].bitmap.textColor = textColor[1];
					button.children[0].bitmap.drawText(textValue, textX, textY, 180, 0, 'center');
				}
			};
		}, this);
	};

	Scene_HelpSystemInfo.prototype.buttonsEventCall = function (event) {
		switch (String(event).toLowerCase()) {
			case 'compilartextos':
				this.compileTexts(window.prompt('Escreva um código de compilação valido'));
				break;
			case 'mostrarpastatranslate':
				var fs = require('fs'),
					path_folderLanguage = localPath('system/language'),
					path_folderLanguageTranslate = localPath(`system/language/translate`);
				if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
					if (Utils.isNwjs()) {
						require('nw.gui').Shell.showItemInFolder(path_folderLanguageTranslate);
					} else {
						window.alert('Não é possivel abrir a pasta translate');
					}
				} else {
					window.alert('Não é possivel abrir a pasta translate');
				}
				break;
			case 'compilationexit':
				this.startFadeOut(this.fadeSpeed(), false);
				this._closeWin = true;
				break;
			default:
				break;
		}
	};

	Scene_HelpSystemInfo.prototype.compileTexts = function (compileEvent) {
		var fs = require('fs'),
			path_folderLanguage = localPath('system/language'),
			path_folderLanguageTranslate = localPath(`system/language/translate`),
			system_prompt1 = 'Escreva o nome da pasta de idioma';
		if (typeof compileEvent != 'string') return;
		function compilationSuccess(desc) {
			if (!desc || desc && typeof desc === 'string'
				&& desc.length <= 0) desc = '???';
			window.alert(`A compilação para ${desc} está completa!`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				if (Utils.isNwjs() && window.confirm('Deseja abrir a pasta translate?')) {
					require('nw.gui').Shell.showItemInFolder(path_folderLanguageTranslate);
				}
			}
		}
		if (compileEvent.length > 0) {
			if (String(compileEvent).toLowerCase() === String('BDD_ABAS').toLowerCase() ||
				Number(compileEvent) == 1) {
				this.compileTextsCreateFolder('translate');
				var language = window.prompt(system_prompt1);
				if (language === null || language != null && language.length <= 0) {
					language = params.defaultLanguageCompilator;
				}
				this.compileTextsActors(language);
				this.compileTextsClasses(language);
				this.compileTextsSkills(language);
				this.compileTextsItems(language);
				this.compileTextsWeapons(language);
				this.compileTextsArmors(language);
				this.compileTextsEnemies(language);
				this.compileTextsStates(language);
				this.compileTextsTypesElements(language);
				this.compileTextsTypesSkills(language);
				this.compileTextsTypesWeapon(language);
				this.compileTextsTypesArmor(language);
				this.compileTextsTypesEquipment(language);
				compilationSuccess('o banco de dados');
			} else if (String(compileEvent).toLowerCase() === String('BDD_ATORES').toLowerCase() ||
				Number(compileEvent) == 11) {
				this.compileTextsCreateFolder('translate');
				var language = window.prompt(system_prompt1);
				if (language === null || language != null && language.length <= 0) {
					language = params.defaultLanguageCompilator;
				}
				this.compileTextsActors(language);
				compilationSuccess('a aba do banco de dados dos atores');
			} else if (String(compileEvent).toLowerCase() === String('BDD_CLASSES').toLowerCase() ||
				Number(compileEvent) == 12) {
				this.compileTextsCreateFolder('translate');
				var language = window.prompt(system_prompt1);
				if (language === null || language != null && language.length <= 0) {
					language = params.defaultLanguageCompilator;
				}
				this.compileTextsClasses(language);
				compilationSuccess('a aba do banco de dados das classes');
			} else if (String(compileEvent).toLowerCase() === String('BDD_SKILLS').toLowerCase() ||
				Number(compileEvent) == 13) {
				this.compileTextsCreateFolder('translate');
				var language = window.prompt(system_prompt1);
				if (language === null || language != null && language.length <= 0) {
					language = params.defaultLanguageCompilator;
				}
				this.compileTextsSkills(language);
				compilationSuccess('a aba do banco de dados das habilidades');
			} else if (String(compileEvent).toLowerCase() === String('BDD_ITEMS').toLowerCase() ||
				Number(compileEvent) == 14) {
				this.compileTextsCreateFolder('translate');
				var language = window.prompt(system_prompt1);
				if (language === null || language != null && language.length <= 0) {
					language = params.defaultLanguageCompilator;
				}
				this.compileTextsItems(language);
				compilationSuccess('a aba do banco de dados dos itens');
			} else if (String(compileEvent).toLowerCase() === String('BDD_WEAPONS').toLowerCase() ||
				Number(compileEvent) == 15) {
				this.compileTextsCreateFolder('translate');
				var language = window.prompt(system_prompt1);
				if (language === null || language != null && language.length <= 0) {
					language = params.defaultLanguageCompilator;
				}
				this.compileTextsWeapons(language);
				compilationSuccess('a aba do banco de dados das armas');
			} else if (String(compileEvent).toLowerCase() === String('BDD_ARMORS').toLowerCase() ||
				Number(compileEvent) == 16) {
				this.compileTextsCreateFolder('translate');
				var language = window.prompt(system_prompt1);
				if (language === null || language != null && language.length <= 0) {
					language = params.defaultLanguageCompilator;
				}
				this.compileTextsArmors(language);
				compilationSuccess('a aba do banco de dados das armaduras');
			} else if (String(compileEvent).toLowerCase() === String('BDD_ENEMIES').toLowerCase() ||
				Number(compileEvent) == 17) {
				this.compileTextsCreateFolder('translate');
				var language = window.prompt(system_prompt1);
				if (language === null || language != null && language.length <= 0) {
					language = params.defaultLanguageCompilator;
				}
				this.compileTextsEnemies(language);
				compilationSuccess('a aba do banco de dados dos inimigos');
			} else if (String(compileEvent).toLowerCase() === String('BDD_STATES').toLowerCase() ||
				Number(compileEvent) == 18) {
				this.compileTextsCreateFolder('translate');
				var language = window.prompt(system_prompt1);
				if (language === null || language != null && language.length <= 0) {
					language = params.defaultLanguageCompilator;
				}
				this.compileTextsStates(language);
				compilationSuccess('a aba do banco de dados dos estados');
			} else if (String(compileEvent).toLowerCase() === String('BDD_ELEMENTS').toLowerCase() ||
				Number(compileEvent) == 19) {
				this.compileTextsCreateFolder('translate');
				var language = window.prompt(system_prompt1);
				if (language === null || language != null && language.length <= 0) {
					language = params.defaultLanguageCompilator;
				}
				this.compileTextsTypesElements(language);
				compilationSuccess('a aba do banco de dados dos elementos');
			} else if (String(compileEvent).toLowerCase() === String('BDD_TYPESSKILLS').toLowerCase() ||
				Number(compileEvent) == 110) {
				this.compileTextsCreateFolder('translate');
				var language = window.prompt(system_prompt1);
				if (language === null || language != null && language.length <= 0) {
					language = params.defaultLanguageCompilator;
				}
				this.compileTextsTypesSkills(language);
				compilationSuccess('a aba do banco de dados dos tipos de habilidades');
			} else if (String(compileEvent).toLowerCase() === String('BDD_TYPESWEAPON').toLowerCase() ||
				Number(compileEvent) == 111) {
				this.compileTextsCreateFolder('translate');
				var language = window.prompt(system_prompt1);
				if (language === null || language != null && language.length <= 0) {
					language = params.defaultLanguageCompilator;
				}
				this.compileTextsTypesWeapon(language);
				compilationSuccess('a aba do banco de dados dos tipos de armas');
			} else if (String(compileEvent).toLowerCase() === String('BDD_TYPESARMOR').toLowerCase() ||
				Number(compileEvent) == 112) {
				this.compileTextsCreateFolder('translate');
				var language = window.prompt(system_prompt1);
				if (language === null || language != null && language.length <= 0) {
					language = params.defaultLanguageCompilator;
				}
				this.compileTextsTypesArmor(language);
				compilationSuccess('a aba do banco de dados dos tipos de armaduras');
			} else if (String(compileEvent).toLowerCase() === String('BDD_TYPESEQUIPMENT').toLowerCase() ||
				Number(compileEvent) == 113) {
				this.compileTextsCreateFolder('translate');
				var language = window.prompt(system_prompt1);
				if (language === null || language != null && language.length <= 0) {
					language = params.defaultLanguageCompilator;
				}
				this.compileTextsTypesEquipment(language);
				compilationSuccess('a aba do banco de dados dos tipos de equipamentos');
			}
		}
	};

	Scene_HelpSystemInfo.prototype.compileTextsCreateFolder = function (folderName) {
		var fs = require('fs'),
			path_folderSystem = localPath('system'),
			path_folderLanguage = localPath('system/language'),
			path_folderLanguageTranslate = localPath('system/language/translate');
		if (fs.existsSync(path_folderSystem) && fs.existsSync(path_folderLanguage)) {
			if (!fs.existsSync(path_folderLanguageTranslate)) {
				fs.mkdirSync(path_folderLanguageTranslate);
				console.warn(`A pasta \"system/language/translate\" foi criada!`);
			}
			if (String(folderName).toLowerCase() === 'translate') return;
			if (folderName === null || typeof folderName === 'string' && folderName.length > 0) {
				var path_folderLanguageFolder = localPath(`system/language/translate/${folderName}`);
				if (!fs.existsSync(path_folderLanguageFolder)) {
					fs.mkdirSync(path_folderLanguageFolder);
					console.warn(`A pasta \"system/language/translate/${folderName}\" foi criada!`);
				}
			}
		}
	};

	Scene_HelpSystemInfo.prototype.compileTextsCreateFile = function (fileData, folderFile, fileType) {
		var fs = require('fs'),
			path_folderSystem = localPath('system'),
			path_folderLanguage = localPath('system/language'),
			path_folderLanguageTranslate = localPath(`system/language/translate/${folderFile}`),
			data = JSON.stringify(fileData, null, 2);
		if (fs.existsSync(path_folderLanguage)) {
			if (fs.existsSync(path_folderLanguageTranslate)) {
				var pathFile = path_folderLanguageTranslate + '\\' + fileType + '.json';
				fs.writeFileSync(pathFile, data);
				console.warn(`O arquivo \"system/language/translate/${folderFile}/${fileType}.json\" foi criado!`);
			}
		}
	};

	Scene_HelpSystemInfo.prototype.compileTextsActors = function (language) {
		if ($dataActors instanceof Array) {
			var data = [null],
				language = String(language).toLowerCase();
			$dataActors.map(function (actor) {
				if (actor) {
					data.push({
						'Texto Ator Id': actor.id,
						'Texto Ator Nome': actor.name,
						'Texto Ator Nickname': actor.nickname,
						'Texto Ator Profile': JSON.stringify(actor.profile),
						'Texto Idioma': language
					});
				}
			}, this);
			this.compileTextsCreateFolder(language);
			this.compileTextsCreateFile(data, language, 'Actors');
		}
	};

	Scene_HelpSystemInfo.prototype.includeIncompileTextsActors = function (content) {
		if ($dataActors instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
					let folderPath = path_folderLanguageTranslate + '\\' + folder;
					if (fs.lstatSync(folderPath).isDirectory()) {
						var actorsIds = [];
						data.forEach(function (content) {
							if (content)
								actorsIds.push(content['Texto Ator Id']);
						});
						$dataActors.filter(function (actor) {
							if (actor && actor.id != null) {
								if (actorsIds.indexOf(actor.id) === -1)
									return true;
							}
						}).forEach(function (actor) {
							if (actor) {
								data.push({
									'Texto Ator Id': actor.id,
									'Texto Ator Nome': actor.name,
									'Texto Ator Nickname': actor.nickname,
									'Texto Ator Profile': JSON.stringify(actor.profile),
									'Texto Idioma': folder
								});
								save = true;
							}
						});
						if (save)
							this.compileTextsCreateFile(data, folder, 'Actors');
					}
				}, this);
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.removeIncompileTextsActors = function (content) {
		if ($dataActors instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				var actorsIds = [];
				$dataActors.forEach(function (actor) {
					if (actor && actor.id != null)
						actorsIds.push(actor.id);
				});
				data.filter(function (content) {
					if (content) {
						if (actorsIds.indexOf(content['Texto Ator Id']) === -1)
							return true;
					}
				}).forEach(function (content) {
					if (content) {
						data.splice(data.indexOf(content), 1);
						save = true;
					}
				});
				if (save) {
					fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
						let folderPath = path_folderLanguageTranslate + '\\' + folder;
						if (fs.lstatSync(folderPath).isDirectory()) {
							this.compileTextsCreateFile(data, folder, 'Actors');
						}
					}, this);
				}
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.compileTextsClasses = function (language) {
		if ($dataClasses instanceof Array) {
			var data = [null],
				language = String(language).toLowerCase();
			$dataClasses.map(function (Class) {
				if (Class) {
					data.push({
						'Texto Classe Id': Class.id,
						'Texto Classe Nome': Class.name,
						'Texto Idioma': language
					});
				}
			}, this);
			this.compileTextsCreateFolder(language);
			this.compileTextsCreateFile(data, language, 'Classes');
		}
	};

	Scene_HelpSystemInfo.prototype.includeIncompileTextsClasses = function (content) {
		if ($dataClasses instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
					let folderPath = path_folderLanguageTranslate + '\\' + folder;
					if (fs.lstatSync(folderPath).isDirectory()) {
						var classesIds = [];
						data.forEach(function (content) {
							if (content)
								classesIds.push(content['Texto Classe Id']);
						});
						$dataClasses.filter(function (Class) {
							if (Class && Class.id != null) {
								if (classesIds.indexOf(Class.id) === -1)
									return true;
							}
						}).forEach(function (Class) {
							if (Class) {
								data.push({
									'Texto Classe Id': Class.id,
									'Texto Classe Nome': Class.name,
									'Texto Idioma': folder
								});
								save = true;
							}
						});
						if (save)
							this.compileTextsCreateFile(data, folder, 'Classes');
					}
				}, this);
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.removeIncompileTextsClasses = function (content) {
		if ($dataClasses instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				var classesIds = [];
				$dataClasses.forEach(function (Class) {
					if (Class && Class.id != null)
						classesIds.push(Class.id);
				});
				data.filter(function (content) {
					if (content) {
						if (classesIds.indexOf(content['Texto Classe Id']) === -1)
							return true;
					}
				}).forEach(function (content) {
					if (content) {
						data.splice(data.indexOf(content), 1);
						save = true;
					}
				});
				if (save) {
					fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
						let folderPath = path_folderLanguageTranslate + '\\' + folder;
						if (fs.lstatSync(folderPath).isDirectory()) {
							this.compileTextsCreateFile(data, folder, 'Classes');
						}
					}, this);
				}
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.compileTextsSkills = function (language) {
		if ($dataSkills instanceof Array) {
			var data = [null],
				language = String(language).toLowerCase();
			$dataSkills.map(function (skill) {
				if (skill) {
					data.push({
						'Texto Habilidade Id': skill.id,
						'Texto Habilidade Nome': skill.name,
						'Texto Habilidade Descrição': JSON.stringify(skill.description),
						'Texto Habilidade message 1': skill.message1,
						'Texto Habilidade message 2': skill.message2,
						'Texto Idioma': language
					});
				}
			}, this);
			this.compileTextsCreateFolder(language);
			this.compileTextsCreateFile(data, language, 'Skills');
		}
	};

	Scene_HelpSystemInfo.prototype.includeIncompileTextsSkills = function (content) {
		if ($dataSkills instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
					let folderPath = path_folderLanguageTranslate + '\\' + folder;
					if (fs.lstatSync(folderPath).isDirectory()) {
						var skillsIds = [];
						data.forEach(function (content) {
							if (content)
								skillsIds.push(content['Texto Habilidade Id']);
						});
						$dataSkills.filter(function (skill) {
							if (skill && skill.id != null) {
								if (skillsIds.indexOf(skill.id) === -1)
									return true;
							}
						}).forEach(function (skill) {
							if (skill) {
								data.push({
									'Texto Habilidade Id': skill.id,
									'Texto Habilidade Nome': skill.name,
									'Texto Habilidade Descrição': JSON.stringify(skill.description),
									'Texto Habilidade message 1': skill.message1,
									'Texto Habilidade message 2': skill.message2,
									'Texto Idioma': folder
								});
								save = true;
							}
						});
						if (save)
							this.compileTextsCreateFile(data, folder, 'Skills');
					}
				}, this);
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.removeIncompileTextsSkills = function (content) {
		if ($dataSkills instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				var skillsIds = [];
				$dataSkills.forEach(function (skill) {
					if (skill && skill.id != null)
						skillsIds.push(skill.id);
				});
				data.filter(function (content) {
					if (content) {
						if (skillsIds.indexOf(content['Texto Habilidade Id']) === -1)
							return true;
					}
				}).forEach(function (content) {
					if (content) {
						data.splice(data.indexOf(content), 1);
						save = true;
					}
				});
				if (save) {
					fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
						let folderPath = path_folderLanguageTranslate + '\\' + folder;
						if (fs.lstatSync(folderPath).isDirectory()) {
							this.compileTextsCreateFile(data, folder, 'Skills');
						}
					}, this);
				}
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.compileTextsItems = function (language) {
		if ($dataItems instanceof Array) {
			var data = [null],
				language = String(language).toLowerCase();
			$dataItems.map(function (item) {
				if (item) {
					data.push({
						'Texto Item Id': item.id,
						'Texto Item Nome': item.name,
						'Texto Item Descrição': JSON.stringify(item.description),
						'Texto Idioma': language
					});
				}
			}, this);
			this.compileTextsCreateFolder(language);
			this.compileTextsCreateFile(data, language, 'Items');
		}
	};

	Scene_HelpSystemInfo.prototype.includeIncompileTextsItems = function (content) {
		if ($dataItems instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
					let folderPath = path_folderLanguageTranslate + '\\' + folder;
					if (fs.lstatSync(folderPath).isDirectory()) {
						var itemsIds = [];
						data.forEach(function (content) {
							if (content)
								itemsIds.push(content['Texto Item Id']);
						});
						$dataItems.filter(function (item) {
							if (item && item.id != null) {
								if (itemsIds.indexOf(item.id) === -1)
									return true;
							}
						}).forEach(function (item) {
							if (item) {
								data.push({
									'Texto Item Id': item.id,
									'Texto Item Nome': item.name,
									'Texto Item Descrição': JSON.stringify(item.description),
									'Texto Idioma': folder
								});
								save = true;
							}
						});
						if (save)
							this.compileTextsCreateFile(data, folder, 'Items');
					}
				}, this);
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.removeIncompileTextsItems = function (content) {
		if ($dataItems instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				var itemsIds = [];
				$dataItems.forEach(function (item) {
					if (item && item.id != null)
						itemsIds.push(item.id);
				});
				data.filter(function (content) {
					if (content) {
						if (itemsIds.indexOf(content['Texto Item Id']) === -1)
							return true;
					}
				}).forEach(function (content) {
					if (content) {
						data.splice(data.indexOf(content), 1);
						save = true;
					}
				});
				if (save) {
					fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
						let folderPath = path_folderLanguageTranslate + '\\' + folder;
						if (fs.lstatSync(folderPath).isDirectory()) {
							this.compileTextsCreateFile(data, folder, 'Items');
						}
					}, this);
				}
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.compileTextsWeapons = function (language) {
		if ($dataWeapons instanceof Array) {
			var data = [null],
				language = String(language).toLowerCase();
			$dataWeapons.map(function (weapon) {
				if (weapon) {
					data.push({
						'Texto Arma Id': weapon.id,
						'Texto Arma Nome': weapon.name,
						'Texto Arma Descrição': JSON.stringify(weapon.description),
						'Texto Idioma': language
					});
				}
			}, this);
			this.compileTextsCreateFolder(language);
			this.compileTextsCreateFile(data, language, 'Weapons');
		}
	};

	Scene_HelpSystemInfo.prototype.includeIncompileTextsWeapons = function (content) {
		if ($dataWeapons instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
					let folderPath = path_folderLanguageTranslate + '\\' + folder;
					if (fs.lstatSync(folderPath).isDirectory()) {
						var weaponsIds = [];
						data.forEach(function (content) {
							if (content)
								weaponsIds.push(content['Texto Arma Id']);
						});
						$dataWeapons.filter(function (weapon) {
							if (weapon && weapon.id != null) {
								if (weaponsIds.indexOf(weapon.id) === -1)
									return true;
							}
						}).forEach(function (weapon) {
							if (weapon) {
								data.push({
									'Texto Arma Id': weapon.id,
									'Texto Arma Nome': weapon.name,
									'Texto Arma Descrição': JSON.stringify(weapon.description),
									'Texto Idioma': folder
								});
								save = true;
							}
						});
						if (save)
							this.compileTextsCreateFile(data, folder, 'Weapons');
					}
				}, this);
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.removeIncompileTextsWeapons = function (content) {
		if ($dataWeapons instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				var weaponsIds = [];
				$dataWeapons.forEach(function (weapon) {
					if (weapon && weapon.id != null)
						weaponsIds.push(weapon.id);
				});
				data.filter(function (content) {
					if (content) {
						if (weaponsIds.indexOf(content['Texto Arma Id']) === -1)
							return true;
					}
				}).forEach(function (content) {
					if (content) {
						data.splice(data.indexOf(content), 1);
						save = true;
					}
				});
				if (save) {
					fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
						let folderPath = path_folderLanguageTranslate + '\\' + folder;
						if (fs.lstatSync(folderPath).isDirectory()) {
							this.compileTextsCreateFile(data, folder, 'Weapons');
						}
					}, this);
				}
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.compileTextsArmors = function (language) {
		if ($dataArmors instanceof Array) {
			var data = [null],
				language = String(language).toLowerCase();
			$dataArmors.map(function (armor) {
				if (armor) {
					data.push({
						'Texto Armadura Id': armor.id,
						'Texto Armadura Nome': armor.name,
						'Texto Armadura Descrição': JSON.stringify(armor.description),
						'Texto Idioma': language
					});
				}
			}, this);
			this.compileTextsCreateFolder(language);
			this.compileTextsCreateFile(data, language, 'Armors');
		}
	};

	Scene_HelpSystemInfo.prototype.includeIncompileTextsArmors = function (content) {
		if ($dataArmors instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
					let folderPath = path_folderLanguageTranslate + '\\' + folder;
					if (fs.lstatSync(folderPath).isDirectory()) {
						var armorsIds = [];
						data.forEach(function (content) {
							if (content)
								armorsIds.push(content['Texto Armadura Id']);
						});
						$dataArmors.filter(function (armor) {
							if (armor && armor.id != null) {
								if (armorsIds.indexOf(armor.id) === -1)
									return true;
							}
						}).forEach(function (armor) {
							if (armor) {
								data.push({
									'Texto Armadura Id': armor.id,
									'Texto Armadura Nome': armor.name,
									'Texto Armadura Descrição': JSON.stringify(armor.description),
									'Texto Idioma': folder
								});
								save = true;
							}
						});
						if (save)
							this.compileTextsCreateFile(data, folder, 'Armors');
					}
				}, this);
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.removeIncompileTextsArmors = function (content) {
		if ($dataArmors instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				var armorsIds = [];
				$dataArmors.forEach(function (armor) {
					if (armor && armor.id != null)
						armorsIds.push(armor.id);
				});
				data.filter(function (content) {
					if (content) {
						if (armorsIds.indexOf(content['Texto Armadura Id']) === -1)
							return true;
					}
				}).forEach(function (content) {
					if (content) {
						data.splice(data.indexOf(content), 1);
						save = true;
					}
				});
				if (save) {
					fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
						let folderPath = path_folderLanguageTranslate + '\\' + folder;
						if (fs.lstatSync(folderPath).isDirectory()) {
							this.compileTextsCreateFile(data, folder, 'Armors');
						}
					}, this);
				}
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.compileTextsEnemies = function (language) {
		if ($dataEnemies instanceof Array) {
			var data = [null],
				language = String(language).toLowerCase();
			$dataEnemies.map(function (enemy) {
				if (enemy) {
					data.push({
						'Texto Inimigo Id': enemy.id,
						'Texto Inimigo Nome': enemy.name,
						'Texto Idioma': language
					});
				}
			}, this);
			this.compileTextsCreateFolder(language);
			this.compileTextsCreateFile(data, language, 'Enemies');
		}
	};

	Scene_HelpSystemInfo.prototype.includeIncompileTextsEnemies = function (content) {
		if ($dataEnemies instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
					let folderPath = path_folderLanguageTranslate + '\\' + folder;
					if (fs.lstatSync(folderPath).isDirectory()) {
						var enemiesIds = [];
						data.forEach(function (content) {
							if (content)
								enemiesIds.push(content['Texto Inimigo Id']);
						});
						$dataEnemies.filter(function (enemy) {
							if (enemy && enemy.id != null) {
								if (enemiesIds.indexOf(enemy.id) === -1)
									return true;
							}
						}).forEach(function (enemy) {
							if (enemy) {
								data.push({
									'Texto Inimigo Id': enemy.id,
									'Texto Inimigo Nome': enemy.name,
									'Texto Idioma': folder
								});
								save = true;
							}
						});
						if (save)
							this.compileTextsCreateFile(data, folder, 'Enemies');
					}
				}, this);
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.removeIncompileTextsEnemies = function (content) {
		if ($dataEnemies instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				var enemiesIds = [];
				$dataEnemies.forEach(function (enemy) {
					if (enemy && enemy.id != null)
						enemiesIds.push(enemy.id);
				});
				data.filter(function (content) {
					if (content) {
						if (enemiesIds.indexOf(content['Texto Inimigo Id']) === -1)
							return true;
					}
				}).forEach(function (content) {
					if (content) {
						data.splice(data.indexOf(content), 1);
						save = true;
					}
				});
				if (save) {
					fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
						let folderPath = path_folderLanguageTranslate + '\\' + folder;
						if (fs.lstatSync(folderPath).isDirectory()) {
							this.compileTextsCreateFile(data, folder, 'Enemies');
						}
					}, this);
				}
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.compileTextsStates = function (language) {
		if ($dataStates instanceof Array) {
			var data = [null],
				language = String(language).toLowerCase();
			$dataStates.map(function (state) {
				if (state) {
					data.push({
						'Texto Estado Id': state.id,
						'Texto Estado Nome': state.name,
						'Texto Estado message 1': state.message1,
						'Texto Estado message 2': state.message2,
						'Texto Estado message 3': state.message3,
						'Texto Estado message 4': state.message4,
						'Texto Idioma': language
					});
				}
			}, this);
			this.compileTextsCreateFolder(language);
			this.compileTextsCreateFile(data, language, 'States');
		}
	};

	Scene_HelpSystemInfo.prototype.includeIncompileTextsStates = function (content) {
		if ($dataStates instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
					let folderPath = path_folderLanguageTranslate + '\\' + folder;
					if (fs.lstatSync(folderPath).isDirectory()) {
						var statesIds = [];
						data.forEach(function (content) {
							if (content)
								statesIds.push(content['Texto Estado Id']);
						});
						$dataStates.filter(function (state) {
							if (state && state.id != null) {
								if (statesIds.indexOf(state.id) === -1)
									return true;
							}
						}).forEach(function (state) {
							if (state) {
								data.push({
									'Texto Estado Id': state.id,
									'Texto Estado Nome': state.name,
									'Texto Estado message 1': state.message1,
									'Texto Estado message 2': state.message2,
									'Texto Estado message 3': state.message3,
									'Texto Estado message 4': state.message4,
									'Texto Idioma': folder
								});
								save = true;
							}
						});
						if (save)
							this.compileTextsCreateFile(data, folder, 'States');
					}
				}, this);
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.removeIncompileTextsStates = function (content) {
		if ($dataStates instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				var statesIds = [];
				$dataStates.forEach(function (state) {
					if (state && state.id != null)
						statesIds.push(state.id);
				});
				data.filter(function (content) {
					if (content) {
						if (statesIds.indexOf(content['Texto Estado Id']) === -1)
							return true;
					}
				}).forEach(function (content) {
					if (content) {
						data.splice(data.indexOf(content), 1);
						save = true;
					}
				});
				if (save) {
					fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
						let folderPath = path_folderLanguageTranslate + '\\' + folder;
						if (fs.lstatSync(folderPath).isDirectory()) {
							this.compileTextsCreateFile(data, folder, 'States');
						}
					}, this);
				}
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.compileTextsTypesElements = function (language) {
		if ($dataSystem && $dataSystem.elements instanceof Array) {
			var data = [null],
				language = String(language).toLowerCase();
			$dataSystem.elements.map(function (element, i) {
				if (element) {
					data.push({
						'Texto Elemento Id': i,
						'Texto Elemento Texto': element,
						'Texto Idioma': language
					});
				}
			}, this);
			this.compileTextsCreateFolder(language);
			this.compileTextsCreateFile(data, language, 'Elements');
		}
	};

	Scene_HelpSystemInfo.prototype.includeIncompileTextsTypesElements = function (content) {
		if ($dataSystem && $dataSystem.elements instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
					let folderPath = path_folderLanguageTranslate + '\\' + folder;
					if (fs.lstatSync(folderPath).isDirectory()) {
						var elementsIds = [];
						data.forEach(function (content) {
							if (content)
								elementsIds.push(content['Texto Elemento Id']);
						});
						$dataSystem.elements.filter(function (element, i) {
							if (elementsIds.indexOf(i) === -1)
								return true;
						}).map(function (element, i) {
							if (element) {
								data.push({
									'Texto Elemento Id': i,
									'Texto Elemento Texto': element,
									'Texto Idioma': folder
								});
								save = true;
							}
						});
						if (save)
							this.compileTextsCreateFile(data, folder, 'Elements');
					}
				}, this);
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.removeIncompileTextsTypesElements = function (content) {
		if ($dataSystem && $dataSystem.elements instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				var elementsIds = [];
				$dataSystem.elements.map(function (element, i) {
					if (element) {
						elementsIds.push(i);
					}
				});
				data.filter(function (content) {
					if (content) {
						if (elementsIds.indexOf(content['Texto Elemento Id']) === -1)
							return true;
					}
				}).forEach(function (content) {
					if (content) {
						data.splice(data.indexOf(content), 1);
						save = true;
					}
				});
				if (save) {
					fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
						let folderPath = path_folderLanguageTranslate + '\\' + folder;
						if (fs.lstatSync(folderPath).isDirectory()) {
							this.compileTextsCreateFile(data, folder, 'Elements');
						}
					}, this);
				}
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.compileTextsTypesSkills = function (language) {
		if ($dataSystem && $dataSystem.skillTypes instanceof Array) {
			var data = [null],
				language = String(language).toLowerCase();
			$dataSystem.skillTypes.map(function (skill, i) {
				if (skill) {
					data.push({
						'Texto Habilidade Id': i,
						'Texto Habilidade Texto': skill,
						'Texto Idioma': language
					});
				}
			}, this);
			this.compileTextsCreateFolder(language);
			this.compileTextsCreateFile(data, language, 'SkillTypes');
		}
	};

	Scene_HelpSystemInfo.prototype.includeIncompileTextsTypesSkills = function (content) {
		if ($dataSystem && $dataSystem.skillTypes instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
					let folderPath = path_folderLanguageTranslate + '\\' + folder;
					if (fs.lstatSync(folderPath).isDirectory()) {
						var skillTypesIds = [];
						data.forEach(function (content) {
							if (content)
								skillTypesIds.push(content['Texto Habilidade Id']);
						});
						$dataSystem.skillTypes.filter(function (skill, i) {
							if (skillTypesIds.indexOf(i) === -1)
								return true;
						}).map(function (skill, i) {
							if (skill) {
								data.push({
									'Texto Habilidade Id': i,
									'Texto Habilidade Texto': skill,
									'Texto Idioma': folder
								});
								save = true;
							}
						});
						if (save)
							this.compileTextsCreateFile(data, folder, 'SkillTypes');
					}
				}, this);
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.removeIncompileTextsTypesSkills = function (content) {
		if ($dataSystem && $dataSystem.skillTypes instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				var skillTypesIds = [];
				$dataSystem.skillTypes.map(function (skill, i) {
					if (skill) {
						skillTypesIds.push(i);
					}
				});
				data.filter(function (content) {
					if (content) {
						if (skillTypesIds.indexOf(content['Texto Habilidade Id']) === -1)
							return true;
					}
				}).forEach(function (content) {
					if (content) {
						data.splice(data.indexOf(content), 1);
						save = true;
					}
				});
				if (save) {
					fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
						let folderPath = path_folderLanguageTranslate + '\\' + folder;
						if (fs.lstatSync(folderPath).isDirectory()) {
							this.compileTextsCreateFile(data, folder, 'SkillTypes');
						}
					}, this);
				}
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.compileTextsTypesWeapon = function (language) {
		if ($dataSystem && $dataSystem.weaponTypes instanceof Array) {
			var data = [null],
				language = String(language).toLowerCase();
			$dataSystem.weaponTypes.map(function (weapon, i) {
				if (weapon) {
					data.push({
						'Texto Arma Id': i,
						'Texto Arma Texto': weapon,
						'Texto Idioma': language
					});
				}
			}, this);
			this.compileTextsCreateFolder(language);
			this.compileTextsCreateFile(data, language, 'WeaponTypes');
		}
	};

	Scene_HelpSystemInfo.prototype.includeIncompileTextsTypesWeapon = function (content) {
		if ($dataSystem && $dataSystem.weaponTypes instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
					let folderPath = path_folderLanguageTranslate + '\\' + folder;
					if (fs.lstatSync(folderPath).isDirectory()) {
						var weaponTypesIds = [];
						data.forEach(function (content) {
							if (content)
								weaponTypesIds.push(content['Texto Arma Id']);
						});
						$dataSystem.weaponTypes.filter(function (weapon, i) {
							if (weaponTypesIds.indexOf(i) === -1)
								return true;
						}).map(function (weapon, i) {
							if (weapon) {
								data.push({
									'Texto Arma Id': i,
									'Texto Arma Texto': weapon,
									'Texto Idioma': folder
								});
								save = true;
							}
						});
						if (save)
							this.compileTextsCreateFile(data, folder, 'WeaponTypes');
					}
				}, this);
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.removeIncompileTextsTypesWeapon = function (content) {
		if ($dataSystem && $dataSystem.weaponTypes instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				var weaponTypesIds = [];
				$dataSystem.weaponTypes.map(function (weapon, i) {
					if (weapon) {
						weaponTypesIds.push(i);
					}
				});
				data.filter(function (content) {
					if (content) {
						if (weaponTypesIds.indexOf(content['Texto Arma Id']) === -1)
							return true;
					}
				}).forEach(function (content) {
					if (content) {
						data.splice(data.indexOf(content), 1);
						save = true;
					}
				});
				if (save) {
					fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
						let folderPath = path_folderLanguageTranslate + '\\' + folder;
						if (fs.lstatSync(folderPath).isDirectory()) {
							this.compileTextsCreateFile(data, folder, 'WeaponTypes');
						}
					}, this);
				}
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.compileTextsTypesArmor = function (language) {
		if ($dataSystem && $dataSystem.armorTypes instanceof Array) {
			var data = [null],
				language = String(language).toLowerCase();
			$dataSystem.armorTypes.map(function (armor, i) {
				if (armor) {
					data.push({
						'Texto Armadura Id': i,
						'Texto Armadura Texto': armor,
						'Texto Idioma': language
					});
				}
			}, this);
			this.compileTextsCreateFolder(language);
			this.compileTextsCreateFile(data, language, 'ArmorTypes');
		}
	};

	Scene_HelpSystemInfo.prototype.includeIncompileTextsTypesArmor = function (content) {
		if ($dataSystem && $dataSystem.armorTypes instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
					let folderPath = path_folderLanguageTranslate + '\\' + folder;
					if (fs.lstatSync(folderPath).isDirectory()) {
						var armorTypesIds = [];
						data.forEach(function (content) {
							if (content)
								armorTypesIds.push(content['Texto Armadura Id']);
						});
						$dataSystem.armorTypes.filter(function (armor, i) {
							if (armorTypesIds.indexOf(i) === -1)
								return true;
						}).map(function (armor, i) {
							if (armor) {
								data.push({
									'Texto Armadura Id': i,
									'Texto Armadura Texto': armor,
									'Texto Idioma': folder
								});
								save = true;
							}
						});
						if (save)
							this.compileTextsCreateFile(data, folder, 'ArmorTypes');
					}
				}, this);
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.removeIncompileTextsTypesArmor = function (content) {
		if ($dataSystem && $dataSystem.armorTypes instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				var armorTypesIds = [];
				$dataSystem.armorTypes.map(function (armor, i) {
					if (armor) {
						armorTypesIds.push(i);
					}
				});
				data.filter(function (content) {
					if (content) {
						if (armorTypesIds.indexOf(content['Texto Armadura Id']) === -1)
							return true;
					}
				}).forEach(function (content) {
					if (content) {
						data.splice(data.indexOf(content), 1);
						save = true;
					}
				});
				if (save) {
					fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
						let folderPath = path_folderLanguageTranslate + '\\' + folder;
						if (fs.lstatSync(folderPath).isDirectory()) {
							this.compileTextsCreateFile(data, folder, 'ArmorTypes');
						}
					}, this);
				}
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.compileTextsTypesEquipment = function (language) {
		if ($dataSystem && $dataSystem.equipTypes instanceof Array) {
			var data = [null],
				language = String(language).toLowerCase();
			$dataSystem.equipTypes.map(function (equip, i) {
				if (equip) {
					data.push({
						'Texto Equipamento Id': i,
						'Texto Equipamento Texto': equip,
						'Texto Idioma': language
					});
				}
			}, this);
			this.compileTextsCreateFolder(language);
			this.compileTextsCreateFile(data, language, 'EquipmentTypes');
		}
	};

	Scene_HelpSystemInfo.prototype.includeIncompileTextsTypesEquipment = function (content) {
		if ($dataSystem && $dataSystem.equipTypes instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
					let folderPath = path_folderLanguageTranslate + '\\' + folder;
					if (fs.lstatSync(folderPath).isDirectory()) {
						var equipTypesIds = [];
						data.forEach(function (content) {
							if (content)
								equipTypesIds.push(content['Texto Equipamento Id']);
						});
						$dataSystem.equipTypes.filter(function (equip, i) {
							if (equipTypesIds.indexOf(i) === -1)
								return true;
						}).map(function (equip, i) {
							if (equip) {
								data.push({
									'Texto Equipamento Id': i,
									'Texto Equipamento Texto': equip,
									'Texto Idioma': folder
								});
								save = true;
							}
						});
						if (save)
							this.compileTextsCreateFile(data, folder, 'EquipmentTypes');
					}
				}, this);
			}
			return data;
		}
	};

	Scene_HelpSystemInfo.prototype.removeIncompileTextsTypesEquipment = function (content) {
		if ($dataSystem && $dataSystem.equipTypes instanceof Array) {
			var fs = require('fs'),
				data = content,
				save = false,
				path_folderLanguage = localPath('system/language'),
				path_folderLanguageTranslate = localPath(`system/language/translate`);
			if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguageTranslate)) {
				var equipTypesIds = [];
				$dataSystem.equipTypes.map(function (equip, i) {
					if (equip) {
						equipTypesIds.push(i);
					}
				});
				data.filter(function (content) {
					if (content) {
						if (equipTypesIds.indexOf(content['Texto Equipamento Id']) === -1)
							return true;
					}
				}).forEach(function (content) {
					if (content) {
						data.splice(data.indexOf(content), 1);
						save = true;
					}
				});
				if (save) {
					fs.readdirSync(path_folderLanguageTranslate).forEach(function (folder) {
						let folderPath = path_folderLanguageTranslate + '\\' + folder;
						if (fs.lstatSync(folderPath).isDirectory()) {
							this.compileTextsCreateFile(data, folder, 'EquipmentTypes');
						}
					}, this);
				}
			}
			return data;
		}
	};

	//-----------------------------------------------------------------------------
	// Scene_Boot
	//
	const __sceneBoot_start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function () {
		__sceneBoot_start.call(this);
		initializeSystem();
	};

	//-----------------------------------------------------------------------------
	// DataManager
	//	
	const __datamanager_setupBattleTest = DataManager.setupBattleTest;
	DataManager.setupBattleTest = function () {
		__datamanager_setupBattleTest.call(this);
		initializeSystem();
	};

	//-----------------------------------------------------------------------------
	// Window_Base
	//
	const window_base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
	Window_Base.prototype.convertEscapeCharacters = function (text) {
		window_base_convertEscapeCharacters.apply(this, arguments);
		text = text.replace(/\\/g, '\x1b');
		text = text.replace(/\x1b\x1b/g, '\\');
		text = text.replace(/\x1bTX\[(\d+)\]/gi, function () {
			return getTextForMessages(arguments[1]);
		}.bind(this));
		text = text.replace(/\x1bST\[(.*)\]/gi, function () {
			return specialTextValue(arguments[1]);
		}.bind(this));
		return text;
	};

	//-----------------------------------------------------------------------------
	// Window_Options
	//
	const __Window_Options__makeCommandList = Window_Options.prototype.makeCommandList;
	Window_Options.prototype.makeCommandList = function () {
		this.addLanguageOptions();
		__Window_Options__makeCommandList.call(this);
	};

	Window_Options.prototype.addLanguageOptions = function () {
		this.addCommand(params.commandLanguageOptions(params.language[params.languageId])[0], 'language');
	};

	const __Window_Options__statusText = Window_Options.prototype.statusText;
	Window_Options.prototype.statusText = function (index) {
		__Window_Options__statusText.apply(this, arguments);
		var symbol = this.commandSymbol(index);
		var value = this.getConfigValue(symbol);
		if (this.isVolumeSymbol(symbol)) {
			return this.volumeStatusText(value);
		} else if (this.isLanguageSymbol(symbol)) {
			return this.languageStatusText();
		} else {
			return this.booleanStatusText(value);
		}
	};

	Window_Options.prototype.isLanguageSymbol = function (symbol) {
		return symbol.contains('language');
	};

	Window_Options.prototype.languageStatusText = function () {
		return params.commandLanguageOptions(params.language[params.languageId])[1];
	};

	const __Window_Options__processOk = Window_Options.prototype.processOk;
	Window_Options.prototype.processOk = function () {
		__Window_Options__processOk.call(this);
		var index = this.index();
		var symbol = this.commandSymbol(index);
		var value = this.getConfigValue(symbol);
		if (this.isLanguageSymbol(symbol)) {
			if (params.languageId < params.language.length - 1) {
				params.languageId++;
			} else {
				params.languageId = 0;
			}
			SceneManager._scene.startFadeIn(SceneManager._scene.fadeSpeed(), false);
			Game_Interpreter.prototype.pluginCommand('setlanguage', [params.languageId]);
			this.refresh();
		}
	};

	const __Window_Options__cursorRight = Window_Options.prototype.cursorRight;
	Window_Options.prototype.cursorRight = function (wrap) {
		__Window_Options__cursorRight.apply(this, arguments);
		var index = this.index();
		var symbol = this.commandSymbol(index);
		if (this.isLanguageSymbol(symbol)) {
			if (params.languageId < params.language.length - 1) {
				params.languageId++;
				SceneManager._scene.startFadeIn(SceneManager._scene.fadeSpeed(), false);
				Game_Interpreter.prototype.pluginCommand('setlanguage', [params.languageId]);
				this.refresh();
			}
		}
	};

	const __Window_Options__cursorLeft = Window_Options.prototype.cursorLeft;
	Window_Options.prototype.cursorLeft = function (wrap) {
		__Window_Options__cursorLeft.apply(this, arguments);
		var index = this.index();
		var symbol = this.commandSymbol(index);
		if (this.isLanguageSymbol(symbol)) {
			if (params.languageId > 0) {
				params.languageId--;
				SceneManager._scene.startFadeIn(SceneManager._scene.fadeSpeed(), false);
				Game_Interpreter.prototype.pluginCommand('setlanguage', [params.languageId]);
				this.refresh();
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//
	const __Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		__Game_Interpreter_pluginCommand.call(this, command, args);
		command = String(command).toLowerCase();
		if (command == 'setlanguage') {
			translateObject = {};
			params.languageId = Number(args[0]);
			$gameSystem.setLanguage(params.languageId);
			createFileSettingsLanguage(defineAllTexts, true);
		}
		if (command == 'setmessagebox') {
			var messageId = Number(args[0]);
			setMessageBox(messageId);
		}
	};

	Game_Interpreter.prototype.getterLanguageSystem = function () {
		return getterLanguageSystem();
	};

	Game_Interpreter.prototype.getTextForMessages = function (id) {
		return getTextForMessages(id);
	};

	//-----------------------------------------------------------------------------
	// Game_System
	//
	const __game__system__initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function () {
		__game__system__initialize.call(this);
		this._languageGame = params.languageId;
	};

	const __game__system__onAfterLoad = Game_System.prototype.onAfterLoad;
	Game_System.prototype.onAfterLoad = function () {
		__game__system__onAfterLoad.call(this);
		Game_Interpreter.prototype.pluginCommand('setlanguage', [this._languageGame]);
	};

	Game_System.prototype.setLanguage = function (language) {
		this._languageGame = language;
	};

	Game_System.prototype.getterLanguageSystem = function () {
		return getterLanguageSystem();
	};

	Game_System.prototype.getTextForMessages = function (id) {
		return getTextForMessages(id);
	};
})();
//==================================================================================================
// Estruturas dos Parâmetros
//==================================================================================================
/*~struct~JanelaMenu:
 * @param Texto Item
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Skill
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Equip
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Status
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Formation
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Options
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Save
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Game End
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Weapon
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Armor
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Key Item
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Equip(2)
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Optimize
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Clear
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 */
/*~struct~JanelaShop:
 * @param Texto Buy
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Sell
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Possession
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 */
/*~struct~JanelaSave:
 * @param Texto Save Message
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 */
/*~struct~JanelaLoad:
 * @param Texto Load Message
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 */
/*~struct~JanelaOptions:
 * @param Texto Always Dash
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Command Remember
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto BGM Volume
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto BGS Volume
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto ME Volume
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto SE Volume
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 */
/*~struct~JanelaStatus:
 * @param Texto Max HP
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Max MP
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Attack
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Defense
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto M.Attack
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto M.Defense
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Agility
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Luck
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Hit
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Evasion
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Current
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Exp
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Exp Next
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 */
/*~struct~BasicTexts:
 * @param Texto Gold
 * @desc Os valores do texto
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 * 
 * @param Texto Lv
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto HP
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto MP
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto TP
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto EXP
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto File
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Level
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Cancel
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 */
/*~struct~JanelaTitle:
 * @param Texto New Game
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Continue
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 */
/*~struct~JanelaGameEnd:
 * @param Texto To Title
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 */
/*~struct~CommandTexts:
 * @param Texto Fight
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Escape
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Attack
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Guard
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 */
/*~struct~ElementsTypesTexts:
 * @param Texto Elemento Id
 * @desc O indicador do elemento
 * @type number
 * @default 1
 * @min 1
 *
 * @param Texto Elemento Texto
 * @desc O texto do elemento
 * @type string
 * @default Physical
 *
 * @param Texto Idioma
 * @desc Qual o idioma?
 * @type string
 * @default qualquer
 */
/*~struct~SkillsTypeTexts:
 * @param Texto Habilidade Id
 * @desc O indicador da habilidade
 * @type number
 * @default 1
 * @min 1
 *
 * @param Texto Habilidade Texto
 * @desc O texto da habilidade
 * @type string
 * @default Magic
 *
 * @param Texto Idioma
 * @desc Qual o idioma?
 * @type string
 * @default qualquer
 */
/*~struct~WeaponTypesTexts:
 * @param Texto Arma Id
 * @desc O indicador da arma
 * @type number
 * @default 1
 * @min 1
 *
 * @param Texto Arma Texto
 * @desc O texto da arma
 * @type string
 * @default Dagger
 *
 * @param Texto Idioma
 * @desc Qual o idioma?
 * @type string
 * @default qualquer
 */
/*~struct~ArmorTypesTexts:
 * @param Texto Armadura Id
 * @desc O indicador da armadura
 * @type number
 * @default 1
 * @min 1
 *
 * @param Texto Armadura Texto
 * @desc O texto da armadura
 * @type string
 * @default General Armor
 *
 * @param Texto Idioma
 * @desc Qual o idioma?
 * @type string
 * @default qualquer
 */
/*~struct~EquipTypesTexts:
 * @param Texto Equipamento Id
 * @desc O indicador do equipamento
 * @type number
 * @default 1
 * @min 1
 *
 * @param Texto Equipamento Texto
 * @desc O texto do equipamento
 * @type string
 * @default Weapon
 *
 * @param Texto Idioma
 * @desc Qual o idioma?
 * @type string
 * @default qualquer
 */
/*~struct~geralTexts:
 * @param Texto Party Name
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Emerge
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Preemptive
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Surprise
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Escape Start
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Escape Failure
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Victory
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Defeat
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Obtain Exp
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Obtain Gold
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Obtain Item
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto level Up
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Obtain Skill
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Use Item
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Critical To Enemy
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Critical To Actor
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Actor Damage
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Actor Recovery
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Actor Gain
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Actor Loss
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Actor Drain
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Actor No Damage
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Actor No Hit
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Enemy Damage
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Enemy Recovery
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Enemy Gain
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Enemy Loss
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Enemy Drain
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Enemy No Damage
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Enemy No Hit
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Evasion
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Magic Evasion
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Magic Reflection
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Counter Attack
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Substitute
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Buff Add
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Debuff Add
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Buff Remove
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 *
 * @param Texto Action Failure
 * @desc Os valores do texto
 * @type struct<TextoMenu>[]
 */
/*~struct~especiaisTexts:
 * @param Texto Especial Id
 * @desc O indicador do texto
 * @type number
 * @default 1
 * @min 1
 *
 * @param Texto Especial Face
 * @desc O texto deve ter a face?
 * @type boolean
 * @default false
 * @on Sim
 * @off Não
 *
 * @param Texto Especial Face Name
 * @parent Texto Especial Face
 * @desc O nome do arquivo da face
 * @type file
 * @dir img/faces/
 * @require 1
 *
 * @param Texto Especial Face Index
 * @parent Texto Especial Face
 * @desc O indicador da face do texto
 * @type number
 * @default 1
 * @min 0
 *
 * @param Texto Especial Texto
 * @desc O texto especial
 * @type note
 * @default ""
 *
 * @param Texto Idioma
 * @desc Qual o idioma?
 * @type string
 * @default qualquer
 */
/*~struct~StatesTexts:
 * @param Texto Estado Id
 * @desc O indicador do estado
 * @type number
 * @default 1
 * @min 1
 *
 * @param Texto Estado Nome
 * @desc O nome do estado
 * @type string
 * @default Knockout
 *
 * @param Texto Estado message 1
 * @desc A mensagem do estado
 * @type string
 * @default has fallen!
 *
 * @param Texto Estado message 2
 * @desc A mensagem do estado
 * @type string
 * @default is slain!
 *
 * @param Texto Estado message 3
 * @desc A mensagem do estado
 * @type string
 * @default
 *
 * @param Texto Estado message 4
 * @desc A mensagem do estado
 * @type string
 * @default revives!
 *
 * @param Texto Idioma
 * @desc Qual o idioma?
 * @type string
 * @default qualquer
 */
/*~struct~SkillsTexts:
 * @param Texto Habilidade Id
 * @desc O indicador da habilidade
 * @type number
 * @default 1
 * @min 1
 *
 * @param Texto Habilidade Nome
 * @desc O nome da habilidade
 * @type string
 * @default Attack
 *
 * @param Texto Habilidade Descrição
 * @desc A descrição da habilidade
 * @type note
 * @default ""
 *
 * @param Texto Habilidade message 1
 * @desc A mensagem da habilidade
 * @type string
 * @default Attacks!
 *
 * @param Texto Habilidade message 2
 * @desc A mensagem da habilidade
 * @type string
 * @default
 *
 * @param Texto Idioma
 * @desc Qual o idioma?
 * @type string
 * @default qualquer
 */
/*~struct~ActorsTexts:
 * @param Texto Ator Id
 * @desc O indicador do ator
 * @type number
 * @default 1
 * @min 1
 *
 * @param Texto Ator Nome
 * @desc O nome do ator
 * @type string
 * @default Harold
 *
 * @param Texto Ator Nickname
 * @desc O nickname do ator
 * @type string
 * @default
 *
 * @param Texto Ator Profile
 * @desc O perfil do ator
 * @type note
 * @default ""
 *
 * @param Texto Idioma
 * @desc Qual o idioma?
 * @type string
 * @default qualquer
 */
/*~struct~ClassesTexts:
 * @param Texto Classe Id
 * @desc O indicador da classe
 * @type number
 * @default 1
 * @min 1
 *
 * @param Texto Classe Nome
 * @desc O nome da classe
 * @type string
 * @default Hero
 *
 * @param Texto Idioma
 * @desc Qual o idioma?
 * @type string
 * @default qualquer
 */
/*~struct~ItemsTexts:
 * @param Texto Item Id
 * @desc O indicador do item
 * @type number
 * @default 1
 * @min 1
 *
 * @param Texto Item Nome
 * @desc O nome do item
 * @type string
 * @default Potion
 *
 * @param Texto Item Descrição
 * @desc A descrição do item
 * @type note
 * @default ""
 *
 * @param Texto Idioma
 * @desc Qual o idioma?
 * @type string
 * @default qualquer
 */
/*~struct~WeaponsTexts:
 * @param Texto Arma Id
 * @desc O indicador da arma
 * @type number
 * @default 1
 * @min 1
 *
 * @param Texto Arma Nome
 * @desc O nome da arma
 * @type string
 * @default Sword
 *
 * @param Texto Arma Descrição
 * @desc A descrição da arma
 * @type note
 * @default ""
 *
 * @param Texto Idioma
 * @desc Qual o idioma?
 * @type string
 * @default qualquer
 */
/*~struct~ArmorsTexts:
 * @param Texto Armadura Id
 * @desc O indicador da armadura
 * @type number
 * @default 1
 * @min 1
 *
 * @param Texto Armadura Nome
 * @desc O nome da armadura
 * @type string
 * @default Sword
 *
 * @param Texto Armadura Descrição
 * @desc A descrição da armadura
 * @type note
 * @default ""
 *
 * @param Texto Idioma
 * @desc Qual o idioma?
 * @type string
 * @default qualquer
 */
/*~struct~EnemiesTexts:
 * @param Texto Inimigo Id
 * @desc O indicador do inimigo
 * @type number
 * @default 1
 * @min 1
 *
 * @param Texto Inimigo Nome
 * @desc O nome do inimigo
 * @type string
 * @default Bat
 *
 * @param Texto Idioma
 * @desc Qual o idioma?
 * @type string
 * @default qualquer
 */
/*~struct~TextsMessagesTexts:
 * @param Texto Id
 * @desc O indicador do texto
 * @type number
 * @default 1
 * @min 1
 *
 * @param Texto Valor
 * @desc O valor do texto
 * @type string
 * @default Texto...
 *
 * @param Texto Idioma
 * @desc Qual o idioma?
 * @type string
 * @default qualquer
 */
/*~struct~TextoMenu:
 * @param Valor
 * @desc O valor do texto
 * @type string
 * @default Texto...
 *
 * @param Idioma
 * @desc O idioma do texto
 * @type string
 * @default qualquer
 */
/*~struct~ComandoIdiomaOptions:
 * @param Texto
 * @desc O valor do texto
 * @type string
 * @default Idioma
 * 
 * @param Valor
 * @desc O identificador do idioma
 * @type string
 * @default Português-BR
 *
 * @param Idioma
 * @desc O idioma do texto
 * @type string
 * @default qualquer
 */