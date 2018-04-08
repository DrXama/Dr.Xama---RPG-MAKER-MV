//==================================================================================================
// DrXama_languageManager.js
//==================================================================================================
/*:
 * @plugindesc v1.04 - Gerenciador de traduções
 *
 * @author Dr.Xamã
 *
 * @param Sistema
 *
 * @param Idioma
 * @parent Sistema
 * @desc Qual o idioma padrão?
 * @type combo
 * @default pt_br
 * @option pt_br
 * @option en_us
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
 * @default {"Texto Lv":"[\"{\\\"Valor\\\":\\\"Nv\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Lv\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto HP":"[\"{\\\"Valor\\\":\\\"HP\\\",\\\"Idioma\\\":\\\"qualquer\\\"}\"]","Texto MP":"[\"{\\\"Valor\\\":\\\"MP\\\",\\\"Idioma\\\":\\\"qualquer\\\"}\"]","Texto TP":"[\"{\\\"Valor\\\":\\\"TP\\\",\\\"Idioma\\\":\\\"qualquer\\\"}\"]","Texto EXP":"[\"{\\\"Valor\\\":\\\"EXP\\\",\\\"Idioma\\\":\\\"qualquer\\\"}\"]","Texto File":"[\"{\\\"Valor\\\":\\\"Arquivo\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"File\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Level":"[\"{\\\"Valor\\\":\\\"Nível\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Level\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]","Texto Cancel":"[\"{\\\"Valor\\\":\\\"Cancelar\\\",\\\"Idioma\\\":\\\"pt_br\\\"}\",\"{\\\"Valor\\\":\\\"Cancel\\\",\\\"Idioma\\\":\\\"en_us\\\"}\"]"}
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
 * @default ["{\"Texto Especial Id\":\"1\",\"Texto Especial Face\":\"true\",\"Texto Especial Face Name\":\"Actor1\",\"Texto Especial Face Index\":\"0\",\"Texto Especial Texto\":\"\\\"Testando o sistema!\\\"\",\"Texto Idioma\":\"pt_br\"}"]
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
 * - setLanguage tag - Define o idioma do jogo
 * - Exemplo:
 *   setLanguage en_us
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
 *    Suporte
 * ================================================================================
 * Algumas linha das funções do script estão detalhadas, dessa forma o suporte é 100%
 * Se você é um programador, fique a vontade para configurar como quiser, caso
 * não saiba programação, não altere nada, crie um tópico de duvida na 4Tabern:
 * http://4tabern.com/ e no fórum Condado Braveheart
 * Perfil: http://www.condadobraveheart.com/forum/index.php?action=profile;u=1870
 * ================================================================================
 *    Contribuição
 * ================================================================================
 * Para me ajudar você pode colocar: Dr.Xamã, nos créditos do seu projeto.
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
		var file = PluginManager.parameters('DrXama_languageManager');
		var language = String(file['Idioma']);
		var title = JsonParse(JSON.parse(file['Title']));
		var menu = JsonParse(JSON.parse(file['Menu']));
		var shop = JsonParse(JSON.parse(file['Shop']));
		var save = JsonParse(JSON.parse(file['Save']));
		var load = JsonParse(JSON.parse(file['Load']));
		var options = JsonParse(JSON.parse(file['Options']));
		var status = JsonParse(JSON.parse(file['Status']));
		var basic = JsonParse(JSON.parse(file['Basic']));
		var gameEnd = JsonParse(JSON.parse(file['GameEnd']));
		var battle = JsonParse(JSON.parse(file['Battle']));
		var elementTypes = JsonParse(JSON.parse(file['Elementos(Tipo)']));
		var skillTypes = JsonParse(JSON.parse(file['Habilidades(Tipo)']));
		var weaponsTypes = JsonParse(JSON.parse(file['Armas(Tipo)']));
		var armorTypes = JsonParse(JSON.parse(file['Armaduras(Tipo)']));
		var equipTypes = JsonParse(JSON.parse(file['Equipamentos(Tipo)']));
		var messages = JsonParse(JSON.parse(file['Geral']));
		var states = JsonParse(JSON.parse(file['Estados']));
		var skills = JsonParse(JSON.parse(file['Habilidades']));
		var actors = JsonParse(JSON.parse(file['Atores']));
		var classes = JsonParse(JSON.parse(file['Classes']));
		var items = JsonParse(JSON.parse(file['Itens']));
		var weapons = JsonParse(JSON.parse(file['Armas']));
		var armors = JsonParse(JSON.parse(file['Armadura']));
		var enemies = JsonParse(JSON.parse(file['Inimigos']));
		var texts = JsonParse(JSON.parse(file['Textos']));
		var specialsTexts = JsonParse(JSON.parse(file['Especiais']));
		return {
			'language': language,
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
			'specialsTexts': specialsTexts
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
		var path = require('path');
		// Cria a base para o caminho local
		var base = path.dirname(process.mainModule.filename);
		// Retorna a base do caminho associado ao caminho
		return path.join(base, p);
	};

	// Cria a pasta do sistema
	function createSystemFolders() {
		var fs = require('fs');
		var path = require('path');
		var path_folderSystem = localPath('system');
		var path_folderLanguage = localPath('system/language');
		if (!fs.existsSync(path_folderSystem)) {
			fs.mkdirSync(path_folderSystem);
		}
		if (!fs.existsSync(path_folderLanguage)) {
			fs.mkdirSync(path_folderLanguage);
		}
	};

	// Cria o arquivo de configuração do sistema
	function createFileSettingsLanguage(callback) {
		var fs = require('fs');
		var path = require('path');
		var path_folderSystem = localPath('system');
		var path_folderLanguage = localPath('system/language');
		var path_fileSettingsLanguage = path_folderLanguage + '\\' + 'settings.drxamasave';
		var data = LZString.compressToBase64(JSON.stringify({
			'language': params.language
		}, null, 2));
		if (fs.existsSync(path_folderLanguage) && fs.existsSync(path_folderLanguage)) {
			if (!fs.existsSync(path_fileSettingsLanguage) || Utils.isOptionValid('test')) {
				fs.writeFileSync(path_fileSettingsLanguage, data);
			}
		}
		if (callback)
			callback();
	};

	// Retorna a linguagem padrão do sistema
	function getterLanguageSystem() {
		var fs = require('fs');
		var path = require('path');
		var path_folderSystem = localPath('system');
		var path_folderLanguage = localPath('system/language');
		var path_fileSettingsLanguage = path_folderLanguage + '\\' + 'settings.drxamasave';
		var language = params.language;
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
			var language = getterLanguageSystem();
			var text = '???';
			object.forEach(function (key) {
				key = JSON.parse(key) || {};
				let idioma = key.Idioma || 'qualquer';
				let valor = key.Valor || '???';
				let elemento = null;
				if (key.Element)
					elemento = (function () {
						var id = key.Element[1];
						var stringCase = String(key.Element[0]).toLowerCase();
						switch (stringCase) {
							case 'equipamento':
								if (!translateObject[stringCase])
									translateObject[stringCase] = {};
								if (!translateObject[stringCase][id])
									translateObject[stringCase][id] = {};
								return translateObject[stringCase][id];
							case 'armadura':
								if (!translateObject[stringCase])
									translateObject[stringCase] = {};
								if (!translateObject[stringCase][id])
									translateObject[stringCase][id] = {};
								return translateObject[stringCase][id];
							case 'arma':
								if (!translateObject[stringCase])
									translateObject[stringCase] = {};
								if (!translateObject[stringCase][id])
									translateObject[stringCase][id] = {};
								return translateObject[stringCase][id];
							case 'habilidade':
								if (!translateObject[stringCase])
									translateObject[stringCase] = {};
								if (!translateObject[stringCase][id])
									translateObject[stringCase][id] = {};
								return translateObject[stringCase][id];
							case 'elemento':
								if (!translateObject[stringCase])
									translateObject[stringCase] = {};
								if (!translateObject[stringCase][id])
									translateObject[stringCase][id] = {};
								return translateObject[stringCase][id];
							case 'statesmessage':
								if (!translateObject[stringCase])
									translateObject[stringCase] = {};
								if (!translateObject[stringCase][id])
									translateObject[stringCase][id] = {};
								return translateObject[stringCase][id];
							case 'skills':
								if (!translateObject[stringCase])
									translateObject[stringCase] = {};
								if (!translateObject[stringCase][id])
									translateObject[stringCase][id] = {};
								return translateObject[stringCase][id];
							case 'skillsmessage':
								if (!translateObject[stringCase])
									translateObject[stringCase] = {};
								if (!translateObject[stringCase][id])
									translateObject[stringCase][id] = {};
								return translateObject[stringCase][id];
							case 'actors':
								if (!translateObject[stringCase])
									translateObject[stringCase] = {};
								if (!translateObject[stringCase][id])
									translateObject[stringCase][id] = {};
								return translateObject[stringCase][id];
							case 'classes':
								if (!translateObject[stringCase])
									translateObject[stringCase] = {};
								if (!translateObject[stringCase][id])
									translateObject[stringCase][id] = {};
								return translateObject[stringCase][id];
							case 'items':
								if (!translateObject[stringCase])
									translateObject[stringCase] = {};
								if (!translateObject[stringCase][id])
									translateObject[stringCase][id] = {};
								return translateObject[stringCase][id];
							case 'weapons':
								if (!translateObject[stringCase])
									translateObject[stringCase] = {};
								if (!translateObject[stringCase][id])
									translateObject[stringCase][id] = {};
								return translateObject[stringCase][id];
							case 'armors':
								if (!translateObject[stringCase])
									translateObject[stringCase] = {};
								if (!translateObject[stringCase][id])
									translateObject[stringCase][id] = {};
								return translateObject[stringCase][id];
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
				if (idioma == 'qualquer' || idioma == language) {
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
	function defineSystemTerms() {
		function setTextParameter(manager, value, object, index) {
			Object.keys(manager).forEach(function (key) {
				if (key.includesEx(String(value))) {
					object[index] = getterTextLanguage(manager[key])
				}
			});
		};

		function setTextParameter2(manager, stringIndex, object, index) {
			manager.forEach(function (key) {
				var id = Number(key['Texto ' + stringIndex + ' Id']);
				var text = String(key['Texto ' + stringIndex + ' Texto']);
				var language = String(key['Texto Idioma']);
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
			length = $dataSystem.terms.params.length,
			object = $dataSystem.terms.params;
		for (; i < length; i++) {
			setTextParameter(params.status, object[i], object, i);
		}
		i = 0,
			length = $dataSystem.terms.basic.length,
			object = $dataSystem.terms.basic;
		for (; i < length; i++) {
			setTextParameter(params.basic, object[i], object, i);
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

	// Retorna o texto para as mensagens
	function getTextForMessages(id) {
		var texto = '???';
		if (params.texts instanceof Array) {
			params.texts.forEach(function (text) {
				var _id = Number(text['Texto Id']),
					valor = String(text['Texto Valor']),
					language = String(text['Texto Idioma']);
				if (_id == id) {
					if (params.language == String(language).toLowerCase() || String(language).toLowerCase() == 'qualquer') {
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
			}
			.bind(this));
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
	};

	function setMessageBox(messageId) {
		var specialsTexts = params.specialsTexts;
		if (specialsTexts instanceof Array) {
			specialsTexts.forEach(function (specialText) {
				var language = getterLanguageSystem();
				var idioma = String(specialText['Texto Idioma']);
				var id = Number(specialText['Texto Especial Id']);
				var valor = String(specialText['Texto Especial Texto']).replace(/\"/g, '').split('\\n');
				var face = [
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

	//-----------------------------------------------------------------------------
	// Scene_Boot
	//
	const sceneBoot_start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function () {
		sceneBoot_start.call(this);
		createSystemFolders();
		createFileSettingsLanguage(defineAllTexts);
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
			}
			.bind(this));
		return text;
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//
	const __Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		__Game_Interpreter_pluginCommand.call(this, command, args);
		command = String(command).toLowerCase();
		if (command == 'setlanguage') {
			params.language = String(args[0]).toLowerCase();
			translateObject = {};
			$gameSystem.gameLanguageSetter(params.language);
			createFileSettingsLanguage(defineAllTexts);
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
 * @type combo
 * @default qualquer
 * @option qualquer
 * @option pt_br
 * @option en_us
 *
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
 * @type combo
 * @default qualquer
 * @option qualquer
 * @option pt_br
 * @option en_us
 *
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
 * @type combo
 * @default qualquer
 * @option qualquer
 * @option pt_br
 * @option en_us
 *
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
 * @type combo
 * @default qualquer
 * @option qualquer
 * @option pt_br
 * @option en_us
 *
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
 * @type combo
 * @default qualquer
 * @option qualquer
 * @option pt_br
 * @option en_us
 *
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
 *
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
 * @type combo
 * @default qualquer
 * @option qualquer
 * @option pt_br
 * @option en_us
 *
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
 * @type combo
 * @default qualquer
 * @option qualquer
 * @option pt_br
 * @option en_us
 *
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
 * @type combo
 * @default qualquer
 * @option qualquer
 * @option pt_br
 * @option en_us
 *
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
 * @type combo
 * @default qualquer
 * @option qualquer
 * @option pt_br
 * @option en_us
 *
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
 * @type combo
 * @default qualquer
 * @option qualquer
 * @option pt_br
 * @option en_us
 *
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
 * @type combo
 * @default qualquer
 * @option qualquer
 * @option pt_br
 * @option en_us
 *
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
 * @type combo
 * @default qualquer
 * @option qualquer
 * @option pt_br
 * @option en_us
 *
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
 * @type combo
 * @default qualquer
 * @option qualquer
 * @option pt_br
 * @option en_us
 *
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
 * @type combo
 * @default qualquer
 * @option qualquer
 * @option pt_br
 * @option en_us
 *
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
 * @type combo
 * @default qualquer
 * @option qualquer
 * @option pt_br
 * @option en_us
 *
 */
/*~struct~TextoMenu:
 * @param Valor
 * @desc O valor do texto
 * @type string
 * @default Texto...
 *
 * @param Idioma
 * @desc O idioma do texto
 * @type combo
 * @default qualquer
 * @option qualquer
 * @option pt_br
 * @option en_us
 */