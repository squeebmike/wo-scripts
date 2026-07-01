(function(){
'use strict';

var WO=window.WO={};
window.__WO__=true;

var TEAMS={
  nfl:[
    {k:'ari',n:'Cardinals',hp:'#97233f',ap:'#000000'},
    {k:'atl',n:'Falcons',hp:'#a71930',ap:'#000000'},
    {k:'bal',n:'Ravens',hp:'#241773',ap:'#9e7c0c'},
    {k:'buf',n:'Bills',hp:'#00338d',ap:'#c60c30'},
    {k:'car',n:'Panthers',hp:'#0085ca',ap:'#000000'},
    {k:'chi',n:'Bears',hp:'#0b162a',ap:'#c83803'},
    {k:'cin',n:'Bengals',hp:'#fb4f14',ap:'#000000'},
    {k:'cle',n:'Browns',hp:'#311d00',ap:'#ff3c00'},
    {k:'dal',n:'Cowboys',hp:'#003594',ap:'#869397'},
    {k:'den',n:'Broncos',hp:'#fb4f14',ap:'#002244'},
    {k:'det',n:'Lions',hp:'#0076b6',ap:'#b0b7bc'},
    {k:'gb',n:'Packers',hp:'#203731',ap:'#ffb612'},
    {k:'hou',n:'Texans',hp:'#03202f',ap:'#a71930'},
    {k:'ind',n:'Colts',hp:'#002c5f',ap:'#a2aaad'},
    {k:'jax',n:'Jaguars',hp:'#006778',ap:'#d7a22a'},
    {k:'kc',n:'Chiefs',hp:'#e31837',ap:'#ffb81c'},
    {k:'lv',n:'Raiders',hp:'#000000',ap:'#a5acaf'},
    {k:'lar',n:'Rams',hp:'#003594',ap:'#ffd100'},
    {k:'lac',n:'Chargers',hp:'#0080c6',ap:'#ffc20e'},
    {k:'mia',n:'Dolphins',hp:'#008e97',ap:'#fc4c02'},
    {k:'min',n:'Vikings',hp:'#4f2683',ap:'#ffc62f'},
    {k:'ne',n:'Patriots',hp:'#002244',ap:'#c60c30'},
    {k:'no',n:'Saints',hp:'#101820',ap:'#d3bc8d'},
    {k:'nyg',n:'Giants',hp:'#0b2265',ap:'#a71930'},
    {k:'nyj',n:'Jets',hp:'#125740',ap:'#ffffff'},
    {k:'phi',n:'Eagles',hp:'#004c54',ap:'#a5acaf'},
    {k:'pit',n:'Steelers',hp:'#101820',ap:'#ffb612'},
    {k:'sf',n:'49ers',hp:'#aa0000',ap:'#b3995d'},
    {k:'sea',n:'Seahawks',hp:'#002244',ap:'#69be28'},
    {k:'tb',n:'Buccaneers',hp:'#d50a0a',ap:'#ff7900'},
    {k:'ten',n:'Titans',hp:'#0c2340',ap:'#4b92db'},
    {k:'wsh',n:'Commanders',hp:'#5a1414',ap:'#ffb612'}
  ],
  mlb:[
    {k:'ari',n:'D-backs',hp:'#a71930',ap:'#e3d4ad'},
    {k:'atl',n:'Braves',hp:'#ce1141',ap:'#13274f'},
    {k:'bal',n:'Orioles',hp:'#df4601',ap:'#000000'},
    {k:'bos',n:'Red Sox',hp:'#bd3039',ap:'#0d2b56'},
    {k:'chc',n:'Cubs',hp:'#0e3386',ap:'#cc3433'},
    {k:'cws',n:'White Sox',hp:'#27251f',ap:'#c4ced4'},
    {k:'cin',n:'Reds',hp:'#c6011f',ap:'#000000'},
    {k:'cle',n:'Guardians',hp:'#00385d',ap:'#e31937'},
    {k:'col',n:'Rockies',hp:'#33006f',ap:'#c4ced4'},
    {k:'det',n:'Tigers',hp:'#0c2340',ap:'#fa4616'},
    {k:'hou',n:'Astros',hp:'#002d62',ap:'#eb6e1f'},
    {k:'kc',n:'Royals',hp:'#004687',ap:'#bd9b60'},
    {k:'laa',n:'Angels',hp:'#ba0021',ap:'#003263'},
    {k:'lad',n:'Dodgers',hp:'#005a9c',ap:'#ef3e42'},
    {k:'mia',n:'Marlins',hp:'#00a3e0',ap:'#ef3340'},
    {k:'mil',n:'Brewers',hp:'#12284b',ap:'#ffc52f'},
    {k:'min',n:'Twins',hp:'#002b5c',ap:'#d31145'},
    {k:'nym',n:'Mets',hp:'#002d72',ap:'#ff5910'},
    {k:'nyy',n:'Yankees',hp:'#003087',ap:'#e4002c'},
    {k:'oak',n:'Athletics',hp:'#003831',ap:'#efb21e'},
    {k:'phi',n:'Phillies',hp:'#e81828',ap:'#002d72'},
    {k:'pit',n:'Pirates',hp:'#27251f',ap:'#fdb827'},
    {k:'sd',n:'Padres',hp:'#2f241d',ap:'#ffc425'},
    {k:'sf',n:'Giants',hp:'#fd5a1e',ap:'#27251f'},
    {k:'sea',n:'Mariners',hp:'#0c2c56',ap:'#005c5c'},
    {k:'stl',n:'Cardinals',hp:'#c41e3a',ap:'#0c2340'},
    {k:'tb',n:'Rays',hp:'#092c5c',ap:'#8fbce6'},
    {k:'tex',n:'Rangers',hp:'#003278',ap:'#c0111f'},
    {k:'tor',n:'Blue Jays',hp:'#134a8e',ap:'#1d2d5c'},
    {k:'wsh',n:'Nationals',hp:'#ab0003',ap:'#14225a'}
  ],
  nba:[
    {k:'hawks',n:'Hawks',hp:'#e03a3e',ap:'#c1d32f'},
    {k:'celtics',n:'Celtics',hp:'#007a33',ap:'#ba9653'},
    {k:'nets',n:'Nets',hp:'#000000',ap:'#ffffff'},
    {k:'hornets',n:'Hornets',hp:'#1d1160',ap:'#00788c'},
    {k:'bulls',n:'Bulls',hp:'#ce1141',ap:'#000000'},
    {k:'cavaliers',n:'Cavaliers',hp:'#860038',ap:'#fdbb30'},
    {k:'mavericks',n:'Mavericks',hp:'#00538c',ap:'#002b5e'},
    {k:'nuggets',n:'Nuggets',hp:'#0e2240',ap:'#fec524'},
    {k:'pistons',n:'Pistons',hp:'#c8102e',ap:'#006bb6'},
    {k:'warriors',n:'Warriors',hp:'#1d428a',ap:'#ffc72c'},
    {k:'rockets',n:'Rockets',hp:'#ce1141',ap:'#000000'},
    {k:'pacers',n:'Pacers',hp:'#002d62',ap:'#fdbb30'},
    {k:'clippers',n:'Clippers',hp:'#c8102e',ap:'#1d428a'},
    {k:'lakers',n:'Lakers',hp:'#552583',ap:'#fdb927'},
    {k:'grizzlies',n:'Grizzlies',hp:'#5d76a9',ap:'#12173f'},
    {k:'heat',n:'Heat',hp:'#98002e',ap:'#f9a01b'},
    {k:'bucks',n:'Bucks',hp:'#00471b',ap:'#eee1c6'},
    {k:'timberwolves',n:'T-Wolves',hp:'#0c2340',ap:'#236192'},
    {k:'pelicans',n:'Pelicans',hp:'#0c2340',ap:'#c8102e'},
    {k:'knicks',n:'Knicks',hp:'#006bb6',ap:'#f58426'},
    {k:'thunder',n:'Thunder',hp:'#007ac1',ap:'#ef3b24'},
    {k:'magic',n:'Magic',hp:'#0077c0',ap:'#000000'},
    {k:'sixers',n:'76ers',hp:'#006bb6',ap:'#ed174c'},
    {k:'suns',n:'Suns',hp:'#1d1160',ap:'#e56020'},
    {k:'blazers',n:'Blazers',hp:'#e03a3e',ap:'#000000'},
    {k:'kings',n:'Kings',hp:'#5a2d81',ap:'#63727a'},
    {k:'spurs',n:'Spurs',hp:'#c4ced4',ap:'#000000'},
    {k:'raptors',n:'Raptors',hp:'#ce1141',ap:'#000000'},
    {k:'jazz',n:'Jazz',hp:'#002b5c',ap:'#f9a01b'},
    {k:'wizards',n:'Wizards',hp:'#002b5c',ap:'#e31837'}
  ],
  nhl:[
    {k:'ana',n:'Ducks',hp:'#fc4c02',ap:'#85714d'},
    {k:'bos',n:'Bruins',hp:'#fcb514',ap:'#000000'},
    {k:'buf',n:'Sabres',hp:'#003087',ap:'#fcb514'},
    {k:'cgy',n:'Flames',hp:'#c8102e',ap:'#f1be48'},
    {k:'car',n:'Hurricanes',hp:'#cc0000',ap:'#000000'},
    {k:'chi',n:'Blackhawks',hp:'#cf0a2c',ap:'#000000'},
    {k:'col',n:'Avalanche',hp:'#6f263d',ap:'#236192'},
    {k:'cbj',n:'Blue Jackets',hp:'#002654',ap:'#ce1126'},
    {k:'dal',n:'Stars',hp:'#006847',ap:'#8f8f8c'},
    {k:'det',n:'Red Wings',hp:'#ce1126',ap:'#ffffff'},
    {k:'edm',n:'Oilers',hp:'#041e42',ap:'#fc4c02'},
    {k:'fla',n:'Panthers',hp:'#041e42',ap:'#c8102e'},
    {k:'la',n:'Kings',hp:'#111111',ap:'#a2aaad'},
    {k:'min',n:'Wild',hp:'#154734',ap:'#ddcba4'},
    {k:'mtl',n:'Canadiens',hp:'#af1e2d',ap:'#192168'},
    {k:'nsh',n:'Predators',hp:'#041e42',ap:'#ffb81c'},
    {k:'nj',n:'Devils',hp:'#ce1126',ap:'#000000'},
    {k:'nyi',n:'Islanders',hp:'#00539b',ap:'#f47d30'},
    {k:'nyr',n:'Rangers',hp:'#0038a8',ap:'#ce1126'},
    {k:'ott',n:'Senators',hp:'#c2912c',ap:'#000000'},
    {k:'phi',n:'Flyers',hp:'#f74902',ap:'#000000'},
    {k:'pit',n:'Penguins',hp:'#fcb514',ap:'#000000'},
    {k:'sjs',n:'Sharks',hp:'#006d75',ap:'#000000'},
    {k:'sea',n:'Kraken',hp:'#001628',ap:'#99d9d9'},
    {k:'stl',n:'Blues',hp:'#002f87',ap:'#fcb514'},
    {k:'tb',n:'Lightning',hp:'#002868',ap:'#ffffff'},
    {k:'tor',n:'Maple Leafs',hp:'#003e7e',ap:'#ffffff'},
    {k:'van',n:'Canucks',hp:'#00205b',ap:'#00843d'},
    {k:'vgk',n:'Golden Knights',hp:'#b4975a',ap:'#333f42'},
    {k:'wsh',n:'Capitals',hp:'#041e42',ap:'#c8102e'},
    {k:'wpg',n:'Jets',hp:'#041e42',ap:'#ac162c'},
    {k:'uta',n:'Utah HC',hp:'#69b3e7',ap:'#000000'}
  ],
  pokemon:[
    {k:'1',n:'Bulbasaur',hp:'#78C850',ap:'#A040A0',pal:{p:'#5CAC6E',s:'#78A067',a:'#CB62A4',h:'#F59CCF',b:'#09180F'},sh:{p:'#90C555',s:'#6DA19A',a:'#DA9A63',h:'#F2D78F',b:'#111C0A'}},
    {k:'2',n:'Ivysaur',hp:'#78C850',ap:'#A040A0',pal:{p:'#4E997F',s:'#7B9169',a:'#C455A4',h:'#E68FC4',b:'#081712'},sh:{p:'#A2BC58',s:'#6080B2',a:'#CDA160',h:'#F5DC94',b:'#141C0C'}},
    {k:'3',n:'Venusaur',hp:'#78C850',ap:'#A040A0',pal:{p:'#2E9056',s:'#679280',a:'#CE517C',h:'#F58EB2',b:'#07170D'},sh:{p:'#CCC959',s:'#79966E',a:'#D85CA7',h:'#F1A9C0',b:'#1C1C08'}},
    {k:'4',n:'Charmander',hp:'#F08030',ap:'#6890F0',pal:{p:'#EE7F34',s:'#E4BFB1',a:'#CA515F',h:'#EEC165',b:'#200F06'},sh:{p:'#F3C250',s:'#E2C39C',a:'#CC9355',h:'#EFDC8F',b:'#1F1809'}},
    {k:'5',n:'Charmeleon',hp:'#F08030',ap:'#6890F0',pal:{p:'#DC632E',s:'#DB9873',a:'#AC3F50',h:'#EF926C',b:'#1C0A08'},sh:{p:'#E1B53E',s:'#C66C56',a:'#6CBBD5',h:'#B7E6F9',b:'#1C1709'}},
    {k:'6',n:'Charizard',hp:'#F08030',ap:'#6890F0',pal:{p:'#D96921',s:'#3999BF',a:'#DBAA50',h:'#EFD97A',b:'#1D0D05'},sh:{p:'#1A1B22',s:'#843045',a:'#D57D5B',h:'#EFAF5F',b:'#06060A'}},
    {k:'7',n:'Squirtle',hp:'#6890F0',ap:'#A8B820',pal:{p:'#66ACDF',s:'#E6D587',a:'#947C37',h:'#BEE7E8',b:'#0A1720'},sh:{p:'#7BB7D9',s:'#E1D28B',a:'#8C77AB',h:'#C4F5DB',b:'#0B1D1B'}},
    {k:'8',n:'Wartortle',hp:'#6890F0',ap:'#A8B820',pal:{p:'#4E8AD0',s:'#CDD5CB',a:'#9D809B',h:'#C8D8E8',b:'#0A1421'},sh:{p:'#74BFE5',s:'#DED9CE',a:'#8478A3',h:'#C7D9E6',b:'#0B181F'}},
    {k:'9',n:'Blastoise',hp:'#6890F0',ap:'#A8B820',pal:{p:'#2A629C',s:'#B3A262',a:'#C4D2BB',h:'#94D5E6',b:'#07111D'},sh:{p:'#4980BB',s:'#82A1B4',a:'#BB99AF',h:'#CBBBE8',b:'#0A1320'}},
    {k:'10',n:'Caterpie',hp:'#A8B820',ap:'#705898',pal:{p:'#83A639',s:'#ACB56A',a:'#7E5DBC',h:'#D7DA97',b:'#141B08'},sh:{p:'#BDDB4B',s:'#BAC67F',a:'#C16696',h:'#E1EAA6',b:'#181D08'}},
    {k:'11',n:'Metapod',hp:'#A8B820',ap:'#705898',pal:{p:'#7E9433',s:'#918C6B',a:'#8D5DAA',h:'#D3CDAA',b:'#141A07'},sh:{p:'#B5C344',s:'#949B76',a:'#BA7C86',h:'#D9E2B8',b:'#181C08'}},
    {k:'12',n:'Butterfree',hp:'#A8A878',ap:'#A040A0',pal:{p:'#B8916A',s:'#BB90A7',a:'#787260',h:'#E7C8D3',b:'#17110B'},sh:{p:'#A9C662',s:'#B6B2AB',a:'#AA874B',h:'#E4DFCE',b:'#17120B'}},
    {k:'13',n:'Weedle',hp:'#A8B820',ap:'#A8A878',pal:{p:'#84A93D',s:'#C0CB63',a:'#846DA4',h:'#E2E890',b:'#141B08'},sh:{p:'#BFDE4D',s:'#D1DC77',a:'#C66F85',h:'#ECF69F',b:'#181E08'}},
    {k:'14',n:'Kakuna',hp:'#A8B820',ap:'#A8A878',pal:{p:'#7E9932',s:'#B4B862',a:'#7E6875',h:'#E4E499',b:'#141A07'},sh:{p:'#B4CA42',s:'#C5C870',a:'#AD6C6F',h:'#F0F4A7',b:'#181C08'}},
    {k:'15',n:'Beedrill',hp:'#F8D030',ap:'#705898',pal:{p:'#E0B838',s:'#AF9A8A',a:'#9E7A9A',h:'#DFCCAB',b:'#1D1806'},sh:{p:'#B7DF2E',s:'#A49272',a:'#9792A8',h:'#DED4AD',b:'#1C1706'}},
    {k:'16',n:'Pidgey',hp:'#A8A878',ap:'#F08030',pal:{p:'#8191AA',s:'#EABD8D',a:'#C64A35',h:'#E4DAD2',b:'#0F1419'},sh:{p:'#C9CAC6',s:'#EED7C0',a:'#C09446',h:'#FDEED7',b:'#151618'}},
    {k:'17',n:'Pidgeotto',hp:'#A8A878',ap:'#F08030',pal:{p:'#7F93AA',s:'#E5BB89',a:'#CA5938',h:'#E7DDD4',b:'#0F1419'},sh:{p:'#CACAC5',s:'#EAD3BB',a:'#C3A04A',h:'#FDEDD7',b:'#151618'}},
    {k:'18',n:'Pidgeot',hp:'#A8A878',ap:'#F08030',pal:{p:'#899DB3',s:'#E6B588',a:'#C66838',h:'#EBE1D9',b:'#0F1419'},sh:{p:'#C6C6C0',s:'#EAD2BB',a:'#C0914A',h:'#FCEBD5',b:'#151618'}},
    {k:'19',n:'Rattata',hp:'#A8A878',ap:'#705898',pal:{p:'#D4A554',s:'#C5AD8E',a:'#AF585D',h:'#ECD9A6',b:'#1C1408'},sh:{p:'#BBCC5C',s:'#C3B39A',a:'#9074AD',h:'#E8D8AF',b:'#191509'}},
    {k:'20',n:'Raticate',hp:'#A8A878',ap:'#705898',pal:{p:'#A17946',s:'#C4AD9E',a:'#B3795B',h:'#DEC9B4',b:'#160F08'},sh:{p:'#D0B667',s:'#CAB89E',a:'#7186A9',h:'#EBDEC9',b:'#1A150A'}},
    {k:'21',n:'Spearow',hp:'#A8A878',ap:'#C03028',pal:{p:'#8798B3',s:'#DEAB8A',a:'#AE4B33',h:'#E4D4D6',b:'#0F1419'},sh:{p:'#C4C5C0',s:'#E4C6BE',a:'#C27D48',h:'#F6E2D4',b:'#141618'}},
    {k:'22',n:'Fearow',hp:'#A8A878',ap:'#C03028',pal:{p:'#808CA8',s:'#DEA38B',a:'#B9665B',h:'#E2D2D4',b:'#0F1319'},sh:{p:'#C7C8C4',s:'#E4C5BE',a:'#B88740',h:'#F8E6D7',b:'#151618'}},
    {k:'23',n:'Ekans',hp:'#A040A0',ap:'#F8D030',pal:{p:'#61725F',s:'#DDB665',a:'#917972',h:'#DDDB9F',b:'#0C120C'},sh:{p:'#A9BC6A',s:'#E0DF78',a:'#92A1A9',h:'#F5F29B',b:'#161A0C'}},
    {k:'24',n:'Arbok',hp:'#A040A0',ap:'#F8D030',pal:{p:'#667965',s:'#DFB264',a:'#947772',h:'#DFDDA1',b:'#0D120D'},sh:{p:'#A2B668',s:'#E7E07D',a:'#91AFA7',h:'#EEED98',b:'#161A0C'}},
    {k:'25',n:'Pikachu',hp:'#F8D030',ap:'#C03028',pal:{p:'#FADD23',s:'#562F1A',a:'#D53B26',h:'#F8DA6B',b:'#1E1A05'},sh:{p:'#E1B434',s:'#6D3D1D',a:'#D7322D',h:'#F5CE76',b:'#1E1606'}},
    {k:'26',n:'Raichu',hp:'#F8D030',ap:'#C03028',pal:{p:'#D28B37',s:'#E4BB6F',a:'#B83933',h:'#F5D280',b:'#1C1406'},sh:{p:'#9DCC43',s:'#EBBE78',a:'#A978B9',h:'#F8D98E',b:'#1A1607'}},
    {k:'27',n:'Sandshrew',hp:'#E8C068',ap:'#A8A878',pal:{p:'#C9A255',s:'#CBAE68',a:'#977E68',h:'#EAD095',b:'#1B1408'},sh:{p:'#9CC743',s:'#C0B361',a:'#45803A',h:'#ECDE91',b:'#191607'}},
    {k:'28',n:'Sandslash',hp:'#E8C068',ap:'#A8A878',pal:{p:'#C68E52',s:'#C4A063',a:'#937C68',h:'#EAC992',b:'#1B1208'},sh:{p:'#A7C241',s:'#B6A45F',a:'#45773B',h:'#ECD890',b:'#191507'}},
    {k:'29',n:'Nidoran-f',hp:'#A040A0',ap:'#6890F0',pal:{p:'#784495',s:'#8674C6',a:'#A2BA86',h:'#C9BAF9',b:'#100815'},sh:{p:'#469B85',s:'#78C5CB',a:'#9E6FC2',h:'#C4F2F2',b:'#081712'}},
    {k:'30',n:'Nidorina',hp:'#A040A0',ap:'#6890F0',pal:{p:'#7F54A4',s:'#7C69BC',a:'#90B584',h:'#CABCFD',b:'#100916'},sh:{p:'#519E99',s:'#76C2CB',a:'#9167BF',h:'#C2EEF1',b:'#091713'}},
    {k:'31',n:'Nidoqueen',hp:'#A040A0',ap:'#6890F0',pal:{p:'#753D96',s:'#876CC4',a:'#90BE86',h:'#CBBBFD',b:'#100815'},sh:{p:'#3A9179',s:'#76C3D0',a:'#9E6FC6',h:'#C2F0EF',b:'#081712'}},
    {k:'32',n:'Nidoran-m',hp:'#6890F0',ap:'#A040A0',pal:{p:'#4988C4',s:'#9198C7',a:'#BAA772',h:'#CDCAF2',b:'#08151E'},sh:{p:'#65D0D9',s:'#A6BDCA',a:'#A65EB5',h:'#D1E7F0',b:'#0A1A1C'}},
    {k:'33',n:'Nidorino',hp:'#6890F0',ap:'#A040A0',pal:{p:'#3480B0',s:'#8785BC',a:'#B9A972',h:'#CDCCF3',b:'#07141D'},sh:{p:'#4A62CB',s:'#A2B8CB',a:'#BF5159',h:'#D1E7F3',b:'#09181B'}},
    {k:'34',n:'Nidoking',hp:'#6890F0',ap:'#A040A0',pal:{p:'#3881C1',s:'#8C8CC5',a:'#BDAF73',h:'#CECBF3',b:'#07141E'},sh:{p:'#55CFD7',s:'#A3B8CD',a:'#B160BD',h:'#D2E9F2',b:'#091A1C'}},
    {k:'35',n:'Clefairy',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#F7B9D5',s:'#E9CBD9',a:'#C0599B',h:'#F5CDE3',b:'#1F1118'},sh:{p:'#E8E3F1',s:'#EBDDEA',a:'#BC6761',h:'#E6E3F3',b:'#141A1D'}},
    {k:'36',n:'Clefable',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#F1B4BE',s:'#EED3CE',a:'#B45EC2',h:'#F4C8DD',b:'#201117'},sh:{p:'#FEE9E2',s:'#EED6D2',a:'#F281F4',h:'#CAD9F5',b:'#1C171C'}},
    {k:'37',n:'Vulpix',hp:'#F08030',ap:'#A8A878',pal:{p:'#D25D2B',s:'#E2C78C',a:'#70665A',h:'#F3C98A',b:'#1C0C05'},sh:{p:'#F2B04B',s:'#E4D39C',a:'#7C725E',h:'#F6E59C',b:'#1E1708'}},
    {k:'38',n:'Ninetales',hp:'#F08030',ap:'#A8A878',pal:{p:'#E8CC8A',s:'#EFE1BB',a:'#C87D41',h:'#F2E8A7',b:'#1D180A'},sh:{p:'#C8D9F0',s:'#E6E9E5',a:'#85A2BC',h:'#D9E9F0',b:'#10181F'}},
    {k:'39',n:'Jigglypuff',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#E9A9B9',s:'#EED1E4',a:'#B064B2',h:'#F1C9DD',b:'#1F1016'},sh:{p:'#DED7E6',s:'#E9DAEE',a:'#B568B2',h:'#F4E2EF',b:'#15181C'}},
    {k:'40',n:'Wigglytuff',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#F0B2CA',s:'#EDD0E6',a:'#AB62A7',h:'#F4CDE3',b:'#1F1017'},sh:{p:'#E3DEED',s:'#E5D6EA',a:'#AE66A4',h:'#F5E3F1',b:'#15181D'}},
    {k:'41',n:'Zubat',hp:'#A890F0',ap:'#A8A878',pal:{p:'#899CE7',s:'#C1BFB8',a:'#AA8A4D',h:'#DEE1E0',b:'#0D1420'},sh:{p:'#B5D0ED',s:'#CCC8B6',a:'#A4934F',h:'#F6F3E4',b:'#0F1820'}},
    {k:'42',n:'Golbat',hp:'#A890F0',ap:'#A8A878',pal:{p:'#7BA3E6',s:'#C3C1BB',a:'#B2A155',h:'#E3E6E5',b:'#0C1420'},sh:{p:'#A0A8E4',s:'#CECABA',a:'#69B651',h:'#F3F0E3',b:'#0E181F'}},
    {k:'43',n:'Oddish',hp:'#78C850',ap:'#A040A0',pal:{p:'#3F4896',s:'#85B466',a:'#C55A98',h:'#A8DD87',b:'#090C1C'},sh:{p:'#5069C3',s:'#ABBD6A',a:'#CC975A',h:'#F3E093',b:'#0A121F'}},
    {k:'44',n:'Gloom',hp:'#78C850',ap:'#A040A0',pal:{p:'#3E5296',s:'#7DB064',a:'#C85F9B',h:'#ADDD86',b:'#090D1C'},sh:{p:'#4E78C4',s:'#A2B967',a:'#CF9D60',h:'#F3DA92',b:'#0A121F'}},
    {k:'45',n:'Vileplume',hp:'#F85888',ap:'#78C850',pal:{p:'#848B5F',s:'#B6B695',a:'#CB9296',h:'#EFC8CA',b:'#10130B'},sh:{p:'#E3BA4F',s:'#C2D96C',a:'#A6948E',h:'#E3EF9E',b:'#1D1908'}},
    {k:'46',n:'Paras',hp:'#F08030',ap:'#A8B820',pal:{p:'#E67340',s:'#CAAE44',a:'#AC6A57',h:'#F1D97B',b:'#1D0B06'},sh:{p:'#E0B857',s:'#D4C655',a:'#85624E',h:'#F6F08C',b:'#1D1807'}},
    {k:'47',n:'Parasect',hp:'#F08030',ap:'#A8B820',pal:{p:'#CF4B23',s:'#C1B93E',a:'#B06959',h:'#EFD376',b:'#1C0905'},sh:{p:'#CA933B',s:'#C8CD4F',a:'#825E4E',h:'#F4EB87',b:'#1C1606'}},
    {k:'48',n:'Venonat',hp:'#A890F0',ap:'#A040A0',pal:{p:'#7FA06C',s:'#C2B389',a:'#8C6BA5',h:'#DDD6AE',b:'#11190F'},sh:{p:'#B9D37B',s:'#CCC898',a:'#C76196',h:'#EAEBB9',b:'#161B0F'}},
    {k:'49',n:'Venomoth',hp:'#A890F0',ap:'#A040A0',pal:{p:'#83A973',s:'#C7B689',a:'#8E66A2',h:'#DEDAB2',b:'#11190F'},sh:{p:'#7AD677',s:'#D2CD9C',a:'#CD8B55',h:'#E3E8B7',b:'#151B0F'}},
    {k:'50',n:'Diglett',hp:'#E8C068',ap:'#C03028',pal:{p:'#BC9A4A',s:'#DFA55E',a:'#986558',h:'#EABF86',b:'#1A1207'},sh:{p:'#8FBA40',s:'#D1B05C',a:'#85A758',h:'#ECD089',b:'#181607'}},
    {k:'51',n:'Dugtrio',hp:'#E8C068',ap:'#C03028',pal:{p:'#C09254',s:'#DC925D',a:'#96655A',h:'#EABB89',b:'#1A1208'},sh:{p:'#A3BD48',s:'#CF9F5C',a:'#86A55B',h:'#ECCC8B',b:'#181508'}},
    {k:'52',n:'Meowth',hp:'#A8A878',ap:'#F8D030',pal:{p:'#B1905E',s:'#EDCC92',a:'#D7AB2E',h:'#F6E3A5',b:'#171009'},sh:{p:'#D5BE6B',s:'#F1CF8D',a:'#7E98AA',h:'#F1EFCC',b:'#1A160A'}},
    {k:'53',n:'Persian',hp:'#A8A878',ap:'#F8D030',pal:{p:'#B4935C',s:'#EDD292',a:'#DCB82E',h:'#F7E5A5',b:'#181009'},sh:{p:'#ABD25D',s:'#F2D792',a:'#8081BD',h:'#EAE8C6',b:'#19150A'}},
    {k:'54',n:'Psyduck',hp:'#F8D030',ap:'#6890F0',pal:{p:'#F4CE32',s:'#DCCCA9',a:'#5989D6',h:'#EFE28F',b:'#1E1905'},sh:{p:'#81D1F0',s:'#D8CEA7',a:'#CECA63',h:'#C8ECFD',b:'#0B1A20'}},
    {k:'55',n:'Golduck',hp:'#6890F0',ap:'#F8D030',pal:{p:'#3984B2',s:'#E5D984',a:'#FCD141',h:'#C7E1E9',b:'#08141D'},sh:{p:'#5F54E2',s:'#F5E792',a:'#37FF29',h:'#D5EAE9',b:'#0A1620'}},
    {k:'56',n:'Mankey',hp:'#F4BDC9',ap:'#C03028',pal:{p:'#E6AEBD',s:'#E0979E',a:'#6E6973',h:'#F6C2BA',b:'#1D1016'},sh:{p:'#B6D5E4',s:'#D8BCAA',a:'#B5455C',h:'#E2E1CE',b:'#0E1A1E'}},
    {k:'57',n:'Primeape',hp:'#F4BDC9',ap:'#C03028',pal:{p:'#EAB2C2',s:'#DF989A',a:'#756F77',h:'#F5BFB8',b:'#1D1016'},sh:{p:'#BBD9E8',s:'#D7BDA9',a:'#BB4B65',h:'#E0DFCC',b:'#0E1A1E'}},
    {k:'58',n:'Growlithe',hp:'#F08030',ap:'#A8A878',pal:{p:'#A35832',s:'#D3BC88',a:'#A65D42',h:'#EECEA0',b:'#180C06'},sh:{p:'#837161',s:'#D3CFC1',a:'#AA8E56',h:'#F2ECD4',b:'#100E0F'}},
    {k:'59',n:'Arcanine',hp:'#F08030',ap:'#A8A878',pal:{p:'#A4502E',s:'#D2C087',a:'#AA6144',h:'#EECC9F',b:'#180C06'},sh:{p:'#847A61',s:'#DBD7C8',a:'#AD9050',h:'#F3EFD4',b:'#100F0F'}},
    {k:'60',n:'Poliwag',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#4689C4',s:'#BAD9E4',a:'#DF777B',h:'#D5E8F7',b:'#09151E'},sh:{p:'#40456A',s:'#D8D8E5',a:'#DC7F86',h:'#CDCEED',b:'#08080F'}},
    {k:'61',n:'Poliwhirl',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#4280CB',s:'#BBD5E7',a:'#E7877B',h:'#D5E8F9',b:'#09141E'},sh:{p:'#3C3D66',s:'#DBD8E7',a:'#E48195',h:'#C9C8E9',b:'#08080F'}},
    {k:'62',n:'Poliwrath',hp:'#6890F0',ap:'#C03028',pal:{p:'#A79F65',s:'#EDC395',a:'#CC3D2E',h:'#E8DAA5',b:'#16150D'},sh:{p:'#B3B980',s:'#EBC4A1',a:'#A77483',h:'#F3D7B4',b:'#17140F'}},
    {k:'63',n:'Abra',hp:'#F8D030',ap:'#A8A878',pal:{p:'#E5C43A',s:'#93773E',a:'#A06CAB',h:'#F6E38E',b:'#1C1706'},sh:{p:'#BC8F48',s:'#866D45',a:'#C387A4',h:'#F3D094',b:'#181109'}},
    {k:'64',n:'Kadabra',hp:'#F8D030',ap:'#A8A878',pal:{p:'#E0B244',s:'#90683F',a:'#946AA3',h:'#F3DD90',b:'#1C1606'},sh:{p:'#B8844E',s:'#846146',a:'#B984A3',h:'#F0CC96',b:'#181109'}},
    {k:'65',n:'Alakazam',hp:'#F8D030',ap:'#A8A878',pal:{p:'#E5A93D',s:'#8F713C',a:'#A06FA9',h:'#F6DC8F',b:'#1C1506'},sh:{p:'#9FC443',s:'#886B47',a:'#CAAE84',h:'#F3D595',b:'#181209'}},
    {k:'66',n:'Machop',hp:'#6890F0',ap:'#C03028',pal:{p:'#6F93AB',s:'#C02D29',a:'#D5AD9A',h:'#C4CAD9',b:'#0B141B'},sh:{p:'#589B5F',s:'#C73231',a:'#BEE588',h:'#C9D398',b:'#0E170A'}},
    {k:'67',n:'Machoke',hp:'#6890F0',ap:'#C03028',pal:{p:'#688CA4',s:'#C0442E',a:'#DEB2A2',h:'#BFC5D4',b:'#0B131B'},sh:{p:'#759B58',s:'#C7442C',a:'#E3B491',h:'#CBD798',b:'#0E170A'}},
    {k:'68',n:'Machamp',hp:'#6890F0',ap:'#C03028',pal:{p:'#6B87A7',s:'#C43C2D',a:'#DAB09E',h:'#C1C5D6',b:'#0B131B'},sh:{p:'#839D5B',s:'#C23929',a:'#E0B691',h:'#D2D99A',b:'#0F170A'}},
    {k:'69',n:'Bellsprout',hp:'#F8D030',ap:'#78C850',pal:{p:'#86AD4C',s:'#A6D067',a:'#B37F49',h:'#D9F8A1',b:'#101808'},sh:{p:'#B6E244',s:'#CFDE6A',a:'#6FB2BB',h:'#F1E98A',b:'#1C1A08'}},
    {k:'70',n:'Weepinbell',hp:'#F8D030',ap:'#78C850',pal:{p:'#E6AD3D',s:'#B6CA6F',a:'#86893F',h:'#E7EA8F',b:'#1D1706'},sh:{p:'#9BE534',s:'#CBC95E',a:'#6680B6',h:'#F0F690',b:'#1C1806'}},
    {k:'71',n:'Victreebel',hp:'#F8D030',ap:'#78C850',pal:{p:'#E5C04A',s:'#B7CE76',a:'#828139',h:'#E5ED8D',b:'#1D1807'},sh:{p:'#C1E543',s:'#C6C861',a:'#6485B1',h:'#EEED8F',b:'#1C1707'}},
    {k:'72',n:'Tentacool',hp:'#6890F0',ap:'#C03028',pal:{p:'#366CBD',s:'#A28A96',a:'#A77136',h:'#DBCECA',b:'#07131E'},sh:{p:'#54B8D1',s:'#CABBA6',a:'#9F4D7A',h:'#E3E6CF',b:'#09181B'}},
    {k:'73',n:'Tentacruel',hp:'#6890F0',ap:'#C03028',pal:{p:'#4388CD',s:'#A48D97',a:'#A5773A',h:'#DECFCC',b:'#08151E'},sh:{p:'#5BC8D3',s:'#CDBBA8',a:'#945179',h:'#DEDFCA',b:'#09191B'}},
    {k:'74',n:'Geodude',hp:'#B8A038',ap:'#A8A878',pal:{p:'#9E7A48',s:'#B7A15F',a:'#C6B25D',h:'#D8C385',b:'#161107'},sh:{p:'#75AF57',s:'#B1BA67',a:'#5BCC5B',h:'#EBED9A',b:'#141608'}},
    {k:'75',n:'Graveler',hp:'#B8A038',ap:'#A8A878',pal:{p:'#9D7D43',s:'#BBA65E',a:'#C8BF5D',h:'#DAC786',b:'#161107'},sh:{p:'#63A14C',s:'#B4BE6D',a:'#6ECE59',h:'#E3E896',b:'#131608'}},
    {k:'76',n:'Golem',hp:'#B8A038',ap:'#A8A878',pal:{p:'#9C8446',s:'#BDA663',a:'#C6B15A',h:'#D8C785',b:'#161107'},sh:{p:'#67AD55',s:'#BBC16C',a:'#57CC58',h:'#E7ED9A',b:'#141608'}},
    {k:'77',n:'Ponyta',hp:'#F08030',ap:'#F8D030',pal:{p:'#D7905D',s:'#F0C16F',a:'#F18131',h:'#FED998',b:'#1C1008'},sh:{p:'#8ED2E0',s:'#EDE6C0',a:'#A19CB3',h:'#F0F5E5',b:'#0C1A1E'}},
    {k:'78',n:'Rapidash',hp:'#F08030',ap:'#F8D030',pal:{p:'#D38B5B',s:'#EFC370',a:'#F27832',h:'#FDD898',b:'#1C1008'},sh:{p:'#97C5ED',s:'#F6F0C9',a:'#A992B3',h:'#F4F8E9',b:'#0D191F'}},
    {k:'79',n:'Slowpoke',hp:'#F4BDC9',ap:'#6890F0',pal:{p:'#EDA3B1',s:'#DACADC',a:'#896BC2',h:'#EFCFE2',b:'#1E1015'},sh:{p:'#DFB5AC',s:'#D9CCE1',a:'#BA65FB',h:'#ECD5E8',b:'#1C1217'}},
    {k:'80',n:'Slowbro',hp:'#F4BDC9',ap:'#6890F0',pal:{p:'#E79FA9',s:'#DCCDDF',a:'#836AC2',h:'#EECEE0',b:'#1E1015'},sh:{p:'#EAC1B4',s:'#DBCDE2',a:'#D364FC',h:'#EFD9EA',b:'#1D1317'}},
    {k:'81',n:'Magnemite',hp:'#B8B8D0',ap:'#F8D030',pal:{p:'#DDB368',s:'#D1C078',a:'#9A822C',h:'#FEEDA6',b:'#1B170D'},sh:{p:'#9AC85A',s:'#D0B668',a:'#808DCB',h:'#F2EAA2',b:'#19170C'}},
    {k:'82',n:'Magneton',hp:'#B8B8D0',ap:'#F8D030',pal:{p:'#D6CC62',s:'#D9CC80',a:'#9B7927',h:'#FAF1A3',b:'#1B190D'},sh:{p:'#A2D15B',s:'#CFBA64',a:'#8A82BD',h:'#F7EFA5',b:'#19170C'}},
    {k:'83',n:'Farfetchd',hp:'#A8A878',ap:'#78C850',pal:{p:'#AC9665',s:'#AFC689',a:'#918D3C',h:'#DFE8AF',b:'#16110B'},sh:{p:'#B7C765',s:'#C4CF84',a:'#409066',h:'#F0F3B6',b:'#17120B'}},
    {k:'84',n:'Doduo',hp:'#A8A878',ap:'#C03028',pal:{p:'#B7976D',s:'#D38D7B',a:'#8D6358',h:'#F0C4A3',b:'#17110C'},sh:{p:'#CFD46D',s:'#D8A87F',a:'#96B15E',h:'#F8DAAD',b:'#18120C'}},
    {k:'85',n:'Dodrio',hp:'#A8A878',ap:'#C03028',pal:{p:'#C49E7A',s:'#C7876F',a:'#8A6455',h:'#F4C4A4',b:'#18120C'},sh:{p:'#B9D173',s:'#D4AC7D',a:'#9CAF56',h:'#F6DDAA',b:'#18130C'}},
    {k:'86',n:'Seel',hp:'#6890F0',ap:'#A8A878',pal:{p:'#4080C5',s:'#9DBBB2',a:'#B3A352',h:'#D8E8E5',b:'#08141E'},sh:{p:'#507ED2',s:'#CACFBE',a:'#907474',h:'#DCEDE2',b:'#09191B'}},
    {k:'87',n:'Dewgong',hp:'#6890F0',ap:'#A8A878',pal:{p:'#497FD1',s:'#A3BFB6',a:'#B4A754',h:'#D9E8E6',b:'#08141E'},sh:{p:'#60BFD7',s:'#CFD4C2',a:'#8C768C',h:'#DDEDE3',b:'#09191C'}},
    {k:'88',n:'Grimer',hp:'#A040A0',ap:'#705898',pal:{p:'#3D294D',s:'#82529E',a:'#AB70AF',h:'#C3A4F2',b:'#08050C'},sh:{p:'#384356',s:'#7C8184',a:'#AACC7C',h:'#D6E3EB',b:'#070C0B'}},
    {k:'89',n:'Muk',hp:'#A040A0',ap:'#705898',pal:{p:'#75408A',s:'#A45AA9',a:'#749B74',h:'#C99AF3',b:'#120916'},sh:{p:'#418E6A',s:'#9BAC70',a:'#B95C9E',h:'#BFEED2',b:'#091610'}},
    {k:'90',n:'Shellder',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#4A88C7',s:'#D6D9E6',a:'#B095C0',h:'#DDECF7',b:'#08151E'},sh:{p:'#A97DE6',s:'#E9DCF3',a:'#DB98DB',h:'#EFE9F9',b:'#100F1D'}},
    {k:'91',n:'Cloyster',hp:'#6890F0',ap:'#B8B8D0',pal:{p:'#4384BE',s:'#C2D4E3',a:'#9C92BF',h:'#D4EBF7',b:'#08141E'},sh:{p:'#9E75DB',s:'#DED7EF',a:'#B888D6',h:'#EAE9FA',b:'#0F0F1C'}},
    {k:'92',n:'Gastly',hp:'#705898',ap:'#A890F0',pal:{p:'#3E2666',s:'#875ACB',a:'#CD73DF',h:'#C3A7FB',b:'#07040D'},sh:{p:'#372A3C',s:'#8373AC',a:'#EBB7B1',h:'#D5CEFD',b:'#07070B'}},
    {k:'93',n:'Haunter',hp:'#705898',ap:'#A890F0',pal:{p:'#392869',s:'#8355C7',a:'#CD77D2',h:'#C1A9FD',b:'#07040E'},sh:{p:'#3A283A',s:'#8777B0',a:'#F0ADAF',h:'#D4CAF9',b:'#07070A'}},
    {k:'94',n:'Gengar',hp:'#705898',ap:'#A890F0',pal:{p:'#3F2669',s:'#8D57CB',a:'#D275D6',h:'#C3A8FD',b:'#07040E'},sh:{p:'#2B2838',s:'#8875AC',a:'#E5B2EB',h:'#D1C9F9',b:'#07070A'}},
    {k:'95',n:'Onix',hp:'#B8A038',ap:'#A8A878',pal:{p:'#907F4D',s:'#BCAB6C',a:'#CDAD57',h:'#D6C88D',b:'#151209'},sh:{p:'#78AC71',s:'#BCC788',a:'#7ABE84',h:'#E3ECB1',b:'#13150D'}},
    {k:'96',n:'Drowzee',hp:'#F8D030',ap:'#F4BDC9',pal:{p:'#DA7B82',s:'#CD9ACF',a:'#CDAC7A',h:'#FCC8CF',b:'#1C0F11'},sh:{p:'#9BC764',s:'#DBDBBD',a:'#CC7BA8',h:'#E6F6CA',b:'#11190A'}},
    {k:'97',n:'Hypno',hp:'#F8D030',ap:'#F4BDC9',pal:{p:'#E07D7E',s:'#CF9BD1',a:'#CCB678',h:'#FECACF',b:'#1D0F11'},sh:{p:'#8DBC5B',s:'#E0DFC0',a:'#CC7BB1',h:'#E2F2C7',b:'#101909'}},
    {k:'98',n:'Krabby',hp:'#F08030',ap:'#F8D030',pal:{p:'#CA6235',s:'#F6BF5E',a:'#DD9E41',h:'#FAC481',b:'#1B0A06'},sh:{p:'#83A7AC',s:'#E5E4B5',a:'#BD7771',h:'#E6F2CB',b:'#101817'}},
    {k:'99',n:'Kingler',hp:'#F08030',ap:'#F8D030',pal:{p:'#C7332D',s:'#EABE55',a:'#E0AD4B',h:'#FDBA80',b:'#1B0705'},sh:{p:'#7EA3AC',s:'#E2E3B4',a:'#BE766B',h:'#E8F4CD',b:'#101817'}},
    {k:'100',n:'Voltorb',hp:'#F8D030',ap:'#C03028',pal:{p:'#EDB53E',s:'#E2AB6D',a:'#856453',h:'#F8D486',b:'#1D1806'},sh:{p:'#91DB32',s:'#E8AD60',a:'#9979A4',h:'#F6E086',b:'#1C1806'}},
    {k:'101',n:'Electrode',hp:'#F8D030',ap:'#C03028',pal:{p:'#EDB53F',s:'#E2AF6F',a:'#876556',h:'#F8D485',b:'#1D1806'},sh:{p:'#92DB33',s:'#E8B261',a:'#997BA6',h:'#F5DF85',b:'#1C1806'}},
    {k:'102',n:'Exeggcute',hp:'#F8D030',ap:'#78C850',pal:{p:'#D7C333',s:'#B0CB6E',a:'#868B38',h:'#E6F18E',b:'#1C1806'},sh:{p:'#9AD62A',s:'#C3CC57',a:'#667DB4',h:'#F1F58F',b:'#1C1706'}},
    {k:'103',n:'Exeggutor',hp:'#F8D030',ap:'#78C850',pal:{p:'#F0C940',s:'#BACD6E',a:'#86943D',h:'#ECF391',b:'#1E1806'},sh:{p:'#B4DE32',s:'#C5C65E',a:'#698CB7',h:'#ECEC8E',b:'#1C1706'}},
    {k:'104',n:'Cubone',hp:'#E8C068',ap:'#A8A878',pal:{p:'#C99660',s:'#CEB171',a:'#94816A',h:'#EACF9E',b:'#1B1209'},sh:{p:'#93C956',s:'#D1BC73',a:'#46803A',h:'#EEE5A3',b:'#191708'}},
    {k:'105',n:'Marowak',hp:'#E8C068',ap:'#A8A878',pal:{p:'#C1914D',s:'#CCB268',a:'#7A6740',h:'#EED4A0',b:'#1A1208'},sh:{p:'#96B13D',s:'#C5B86B',a:'#54853F',h:'#EBDA9F',b:'#181507'}},
    {k:'106',n:'Hitmonlee',hp:'#C03028',ap:'#A8A878',pal:{p:'#B34330',s:'#CFA262',a:'#857565',h:'#EFBE8E',b:'#190706'},sh:{p:'#C0A44A',s:'#D5C570',a:'#926147',h:'#F5EA9A',b:'#1A1607'}},
    {k:'107',n:'Hitmonchan',hp:'#C03028',ap:'#A8A878',pal:{p:'#C65E44',s:'#C69856',a:'#817660',h:'#F6C692',b:'#1A0906'},sh:{p:'#C3B157',s:'#CEBC6B',a:'#A57C6A',h:'#F4EB9A',b:'#1A1708'}},
    {k:'108',n:'Lickitung',hp:'#F4BDC9',ap:'#C03028',pal:{p:'#E6ACC7',s:'#D6908F',a:'#736B79',h:'#F8BFBA',b:'#1D1016'},sh:{p:'#B5CFE5',s:'#D7BFA9',a:'#BB4456',h:'#E3E4CF',b:'#0E1A1E'}},
    {k:'109',n:'Koffing',hp:'#A040A0',ap:'#705898',pal:{p:'#4F77B8',s:'#919CC8',a:'#B7AF6F',h:'#C8CBF4',b:'#0B111C'},sh:{p:'#4583BA',s:'#B6CBC7',a:'#CB6296',h:'#C6E7E4',b:'#081818'}},
    {k:'110',n:'Weezing',hp:'#A040A0',ap:'#705898',pal:{p:'#74408A',s:'#A45AAB',a:'#749974',h:'#C99AF2',b:'#120916'},sh:{p:'#428D68',s:'#9CAC70',a:'#B75C9F',h:'#BFEED2',b:'#091610'}},
    {k:'111',n:'Rhyhorn',hp:'#B8A038',ap:'#A8A878',pal:{p:'#9A7143',s:'#B69F60',a:'#AD9D57',h:'#DEC992',b:'#161007'},sh:{p:'#559F4C',s:'#BCBA71',a:'#68B64B',h:'#E1E69F',b:'#131608'}},
    {k:'112',n:'Rhydon',hp:'#B8A038',ap:'#A8A878',pal:{p:'#9F7F50',s:'#B99D68',a:'#AA9458',h:'#DAC892',b:'#161108'},sh:{p:'#7CB15F',s:'#B8AF6D',a:'#5EB456',h:'#ECEAA4',b:'#141609'}},
    {k:'113',n:'Chansey',hp:'#F4BDC9',ap:'#F8D030',pal:{p:'#EAACC4',s:'#F7E4BE',a:'#C98381',h:'#FEDDCF',b:'#1E1016'},sh:{p:'#CEE6EF',s:'#EBE9C5',a:'#D78281',h:'#FAFAE4',b:'#101B1E'}},
    {k:'114',n:'Tangela',hp:'#6890F0',ap:'#78C850',pal:{p:'#438DCA',s:'#7EC59F',a:'#C9CD54',h:'#CDF0D6',b:'#08151E'},sh:{p:'#61DBE0',s:'#BADEAD',a:'#7C918D',h:'#D9F9D8',b:'#091A1C'}},
    {k:'115',n:'Kangaskhan',hp:'#A8A878',ap:'#C03028',pal:{p:'#BBA374',s:'#D79381',a:'#885D53',h:'#EFC4A1',b:'#17120C'},sh:{p:'#C7D575',s:'#DBAF83',a:'#93AD58',h:'#F8DDAC',b:'#18120C'}},
    {k:'116',n:'Horsea',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#3870C3',s:'#A9CDE6',a:'#EEC37B',h:'#D4E6F8',b:'#07141E'},sh:{p:'#55BAD9',s:'#DCE9F5',a:'#AE7ED5',h:'#DCF2F9',b:'#09191C'}},
    {k:'117',n:'Seadra',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#3A96C6',s:'#A3C4DC',a:'#EFC885',h:'#D4ECF9',b:'#08151E'},sh:{p:'#4F6FE5',s:'#DBE9F5',a:'#E17A9E',h:'#DCF2F9',b:'#09191C'}},
    {k:'118',n:'Goldeen',hp:'#F08030',ap:'#F8D030',pal:{p:'#E05F42',s:'#E2B440',a:'#AB582D',h:'#FBD27B',b:'#1D0A06'},sh:{p:'#DBCA59',s:'#E6C051',a:'#697861',h:'#FDF287',b:'#1C1808'}},
    {k:'119',n:'Seaking',hp:'#F08030',ap:'#F8D030',pal:{p:'#5B90B7',s:'#AACCAA',a:'#E1C34B',h:'#D7EEE9',b:'#0B141B'},sh:{p:'#6987C7',s:'#E4EEC7',a:'#A47F89',h:'#DDF2E8',b:'#0C1818'}},
    {k:'120',n:'Staryu',hp:'#B8A038',ap:'#C03028',pal:{p:'#9D864D',s:'#C26F4C',a:'#9C6639',h:'#E0B47A',b:'#161108'},sh:{p:'#6CAE5C',s:'#BE9C58',a:'#77BE3A',h:'#EBDE8D',b:'#141609'}},
    {k:'121',n:'Starmie',hp:'#A040A0',ap:'#C03028',pal:{p:'#6D3789',s:'#B4476F',a:'#6D6A3D',h:'#E1A1CA',b:'#0F0715'},sh:{p:'#388F7A',s:'#9CA385',a:'#B84656',h:'#DAE9C4',b:'#071612'}},
    {k:'122',n:'Mr-Mime',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#EAAEBC',s:'#CB9BC9',a:'#80A6AF',h:'#EBC1E5',b:'#1D1016'},sh:{p:'#B7D6E8',s:'#B0BED1',a:'#CE5598',h:'#D3E8F3',b:'#0E1A1E'}},
    {k:'123',n:'Scyther',hp:'#78C850',ap:'#C03028',pal:{p:'#8AA946',s:'#C3A950',a:'#8F5A7F',h:'#E8DA88',b:'#121A08'},sh:{p:'#ABD952',s:'#E1C969',a:'#BB5466',h:'#EAE995',b:'#171D09'}},
    {k:'124',n:'Jynx',hp:'#F85888',ap:'#A040A0',pal:{p:'#C45388',s:'#9E5FC2',a:'#B5A46D',h:'#EAABDF',b:'#1B0915'},sh:{p:'#6EBA64',s:'#A0B4AE',a:'#C65297',h:'#D1EBD4',b:'#0B190A'}},
    {k:'125',n:'Electabuzz',hp:'#F8D030',ap:'#A8A878',pal:{p:'#E8C73C',s:'#E2CF84',a:'#867B64',h:'#F5E993',b:'#1D1806'},sh:{p:'#B6E732',s:'#DFC169',a:'#9574B8',h:'#F6E894',b:'#1D1706'}},
    {k:'126',n:'Magmar',hp:'#F08030',ap:'#C03028',pal:{p:'#E17437',s:'#DC9148',a:'#AE5753',h:'#F6BA74',b:'#1D0B06'},sh:{p:'#DCBA50',s:'#DCB55C',a:'#8E5E5A',h:'#F8DE84',b:'#1C1807'}},
    {k:'127',n:'Pinsir',hp:'#A8B820',ap:'#A8A878',pal:{p:'#77A033',s:'#B8CB64',a:'#7D6CA6',h:'#DDE58D',b:'#131A07'},sh:{p:'#AED343',s:'#CADC79',a:'#C96D90',h:'#E8F49D',b:'#171D08'}},
    {k:'128',n:'Tauros',hp:'#A8A878',ap:'#C03028',pal:{p:'#B79F6D',s:'#D78F7E',a:'#8D6157',h:'#EFC6A3',b:'#17120C'},sh:{p:'#C1D36D',s:'#DCAA81',a:'#97B15D',h:'#F8DEAD',b:'#18120C'}},
    {k:'129',n:'Magikarp',hp:'#F08030',ap:'#F8D030',pal:{p:'#ED8A45',s:'#EABB3B',a:'#AC6627',h:'#FEDF7C',b:'#1D0C06'},sh:{p:'#D7BF56',s:'#E4C352',a:'#6B7C61',h:'#FCED85',b:'#1C1807'}},
    {k:'130',n:'Gyarados',hp:'#1C5FA5',ap:'#C03028',pal:{p:'#3990BF',s:'#9E8691',a:'#A8713C',h:'#DBCCC9',b:'#08151E'},sh:{p:'#4F6EDC',s:'#CEBDA9',a:'#A57747',h:'#E2E5CF',b:'#09181C'}},
    {k:'131',n:'Lapras',hp:'#6890F0',ap:'#A040A0',pal:{p:'#539FC8',s:'#CFCBE1',a:'#8560B7',h:'#D1E1F3',b:'#09161E'},sh:{p:'#A76ECE',s:'#E3C2EE',a:'#6F8FCA',h:'#EFD0F5',b:'#150B1C'}},
    {k:'132',n:'Ditto',hp:'#A890F0',ap:'#F4BDC9',pal:{p:'#BA87E9',s:'#F6D2F5',a:'#FBADD7',h:'#EBCCF9',b:'#170E20'},sh:{p:'#7CCCEF',s:'#DBE5F4',a:'#C7D7F2',h:'#E8F4F9',b:'#0B1A20'}},
    {k:'133',n:'Eevee',hp:'#A8A878',ap:'#C03028',pal:{p:'#A04E2D',s:'#E4B587',a:'#815A4C',h:'#F8CDA2',b:'#160B08'},sh:{p:'#C4A867',s:'#EDCAAE',a:'#9E6C5A',h:'#F6DDBB',b:'#18150D'}},
    {k:'134',n:'Vaporeon',hp:'#6890F0',ap:'#A8A878',pal:{p:'#4796D1',s:'#93D5DB',a:'#DCD6A6',h:'#CEEEF1',b:'#08161E'},sh:{p:'#A372E0',s:'#D4C1DF',a:'#87B2C9',h:'#ECD4F1',b:'#140B1E'}},
    {k:'135',n:'Jolteon',hp:'#F8D030',ap:'#A8A878',pal:{p:'#EBBD39',s:'#E6D899',a:'#7E7762',h:'#F6E686',b:'#1D1806'},sh:{p:'#ACE237',s:'#E1CE7F',a:'#7F6DA1',h:'#F6EC8F',b:'#1C1807'}},
    {k:'136',n:'Flareon',hp:'#F08030',ap:'#A8A878',pal:{p:'#DB5B27',s:'#E5D09A',a:'#D7613D',h:'#F6CE94',b:'#1C0B06'},sh:{p:'#EA9F44',s:'#E4D8A5',a:'#AA5641',h:'#F2E198',b:'#1D1606'}},
    {k:'137',n:'Porygon',hp:'#F4BDC9',ap:'#A890F0',pal:{p:'#F8A0B5',s:'#7DABE0',a:'#B962CF',h:'#F6CFE2',b:'#1B0E16'},sh:{p:'#7CB8E3',s:'#E6B4E3',a:'#D5AC79',h:'#D3E8FB',b:'#0B181F'}},
    {k:'138',n:'Omanyte',hp:'#6890F0',ap:'#A040A0',pal:{p:'#767C77',s:'#AA8C8E',a:'#747697',h:'#D6C1BB',b:'#10110F'},sh:{p:'#6C97AF',s:'#C6C9DE',a:'#C1827F',h:'#E8E8F2',b:'#0E1518'}},
    {k:'139',n:'Omastar',hp:'#6890F0',ap:'#A040A0',pal:{p:'#747A76',s:'#AB9090',a:'#757E9A',h:'#D2BEB8',b:'#10110F'},sh:{p:'#71B4BA',s:'#BEC0D7',a:'#C49287',h:'#EBEBF4',b:'#0E1719'}},
    {k:'140',n:'Kabuto',hp:'#B8A038',ap:'#A8A878',pal:{p:'#917A56',s:'#B89C6E',a:'#6F8284',h:'#D6C598',b:'#141009'},sh:{p:'#87A295',s:'#C5CDB5',a:'#BFB15D',h:'#F4F3DB',b:'#121513'}},
    {k:'141',n:'Kabutops',hp:'#B8A038',ap:'#C03028',pal:{p:'#8C784E',s:'#C0845F',a:'#6F646F',h:'#D9B68A',b:'#141008'},sh:{p:'#809B8F',s:'#CEBCA7',a:'#C88E49',h:'#F5E6CD',b:'#111513'}},
    {k:'142',n:'Aerodactyl',hp:'#A890F0',ap:'#A8A878',pal:{p:'#878281',s:'#BDA989',a:'#738486',h:'#D8CDB1',b:'#121110'},sh:{p:'#8EB3C1',s:'#CDD6CD',a:'#C1B561',h:'#F6F5ED',b:'#10161A'}},
    {k:'143',n:'Snorlax',hp:'#708090',ap:'#F8D030',pal:{p:'#3E6471',s:'#EDD8A0',a:'#F2BC50',h:'#C6DDD4',b:'#081117'},sh:{p:'#506F8C',s:'#EEDCA9',a:'#DFC35E',h:'#D7E1E9',b:'#09121B'}},
    {k:'144',n:'Articuno',hp:'#6890F0',ap:'#A890F0',pal:{p:'#5BC1E8',s:'#D8E0F7',a:'#A2BEFB',h:'#D5EEFD',b:'#091920'},sh:{p:'#8F8FF8',s:'#E8E9FC',a:'#EBA7FF',h:'#E3EEFD',b:'#0C1920'}},
    {k:'145',n:'Zapdos',hp:'#F8D030',ap:'#A8A878',pal:{p:'#E6B13A',s:'#B3A36E',a:'#9F8166',h:'#F3E38B',b:'#1D1706'},sh:{p:'#A5E733',s:'#BA9B5D',a:'#91A4B2',h:'#F6E890',b:'#1D1706'}},
    {k:'146',n:'Moltres',hp:'#F08030',ap:'#F8D030',pal:{p:'#F69E32',s:'#F5CE44',a:'#DD6428',h:'#FEE676',b:'#1F1006'},sh:{p:'#DCF238',s:'#F6DB8A',a:'#AEE827',h:'#FBE698',b:'#1D1307'}},
    {k:'147',n:'Dratini',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#4279B7',s:'#A7C896',a:'#F0C28B',h:'#BACCF9',b:'#06101A'},sh:{p:'#7B8E7D',s:'#CED399',a:'#C88684',h:'#ECE9C1',b:'#0F130E'}},
    {k:'148',n:'Dragonair',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#447FBC',s:'#A5C795',a:'#F0CE8B',h:'#BACCF9',b:'#06101A'},sh:{p:'#758877',s:'#CED29B',a:'#C8818A',h:'#E7E4BD',b:'#0E130E'}},
    {k:'149',n:'Dragonite',hp:'#F08030',ap:'#6890F0',pal:{p:'#656B8A',s:'#70AF91',a:'#CFC07A',h:'#B5C1E6',b:'#0C0D13'},sh:{p:'#57966F',s:'#B2CC93',a:'#C5C15D',h:'#CCE4AC',b:'#0B170A'}},
    {k:'150',n:'Mewtwo',hp:'#9966CC',ap:'#C03028',pal:{p:'#DACAE9',s:'#9851AC',a:'#A86FAD',h:'#EBD0E9',b:'#17101D'},sh:{p:'#D5EFD6',s:'#77A564',a:'#AF6FAD',h:'#E3E9D4',b:'#101B10'}},
    {k:'151',n:'Mew',hp:'#F4BDC9',ap:'#6890F0',pal:{p:'#EFB4C9',s:'#DBD3E9',a:'#6DADE7',h:'#EDD4E8',b:'#1E1116'},sh:{p:'#8AD7E9',s:'#C7DDF7',a:'#D2B3E1',h:'#CCEFFD',b:'#0C1A20'}},
    {k:'152',n:'Chikorita',hp:'#78C850',ap:'#A040A0',pal:{p:'#6BB956',s:'#E3C6A6',a:'#D15398',h:'#CADB92',b:'#0C190A'},sh:{p:'#D7CA5C',s:'#879967',a:'#D460A1',h:'#F4DC94',b:'#1C1C09'}},
    {k:'153',n:'Bayleef',hp:'#78C850',ap:'#A040A0',pal:{p:'#7ABF55',s:'#DEC6A1',a:'#D65A91',h:'#D1DF92',b:'#0C190A'},sh:{p:'#D7DE5B',s:'#829D66',a:'#D85E93',h:'#F5E392',b:'#1C1D09'}},
    {k:'154',n:'Meganium',hp:'#78C850',ap:'#A040A0',pal:{p:'#79C054',s:'#DEC9A1',a:'#D85B90',h:'#D2DF91',b:'#0C1909'},sh:{p:'#D8DF5A',s:'#7E9D66',a:'#DB5E93',h:'#F5E391',b:'#1C1D09'}},
    {k:'155',n:'Cyndaquil',hp:'#F08030',ap:'#6890F0',pal:{p:'#1D2131',s:'#DCBB66',a:'#D28A56',h:'#EFD480',b:'#040509'},sh:{p:'#4B3B29',s:'#DCC87A',a:'#A670F6',h:'#ECE099',b:'#110708'}},
    {k:'156',n:'Quilava',hp:'#F08030',ap:'#6890F0',pal:{p:'#A53E2B',s:'#D5BB6A',a:'#C75C61',h:'#EDC786',b:'#150707'},sh:{p:'#AAB635',s:'#D4C97C',a:'#784C90',h:'#EFDF99',b:'#191207'}},
    {k:'157',n:'Typhlosion',hp:'#F08030',ap:'#6890F0',pal:{p:'#1E2731',s:'#D4A563',a:'#CC8E60',h:'#EFC984',b:'#040509'},sh:{p:'#4B3D28',s:'#DDD77B',a:'#A870FC',h:'#ECE297',b:'#110708'}},
    {k:'158',n:'Totodile',hp:'#6890F0',ap:'#C03028',pal:{p:'#3D93C7',s:'#EBC49F',a:'#D33530',h:'#CFDFE8',b:'#08171E'},sh:{p:'#61C1D5',s:'#E7C4A3',a:'#C7516B',h:'#D9E5E9',b:'#0A1A1C'}},
    {k:'159',n:'Croconaw',hp:'#6890F0',ap:'#C03028',pal:{p:'#3994C8',s:'#EAC79F',a:'#D83932',h:'#CFDFE9',b:'#08171E'},sh:{p:'#5DC3D5',s:'#E6C6A3',a:'#CB546C',h:'#D8E5E9',b:'#0A1A1C'}},
    {k:'160',n:'Feraligatr',hp:'#6890F0',ap:'#C03028',pal:{p:'#3A9DC1',s:'#E6C09D',a:'#D43742',h:'#CDDEE4',b:'#08171E'},sh:{p:'#5DC9CE',s:'#E2C0A1',a:'#C85579',h:'#D8E6E8',b:'#0A1A1C'}},
    {k:'161',n:'Sentret',hp:'#A8A878',ap:'#C03028',pal:{p:'#B3906A',s:'#D18D7C',a:'#8D6159',h:'#EDBFA0',b:'#17110B'},sh:{p:'#B0CE6B',s:'#E0AE85',a:'#9CB15B',h:'#F8DFAC',b:'#18130C'}},
    {k:'162',n:'Furret',hp:'#A8A878',ap:'#C03028',pal:{p:'#B9A376',s:'#CD8777',a:'#885B53',h:'#EEC4A1',b:'#17120C'},sh:{p:'#C6D478',s:'#D1A37A',a:'#96AD58',h:'#F8DDAC',b:'#18120C'}},
    {k:'163',n:'Hoothoot',hp:'#A8A878',ap:'#705898',pal:{p:'#8492B0',s:'#C9B2A5',a:'#AA5A5A',h:'#D9D9ED',b:'#0F1419'},sh:{p:'#C1C3BE',s:'#CCC8D6',a:'#B59363',h:'#E9E5E9',b:'#141618'}},
    {k:'164',n:'Noctowl',hp:'#A8A878',ap:'#705898',pal:{p:'#818DAC',s:'#CAB7A8',a:'#AE4D5D',h:'#D4D4E9',b:'#0F1319'},sh:{p:'#CBCDC7',s:'#CEC9D9',a:'#B9A665',h:'#EDE9EC',b:'#151618'}},
    {k:'165',n:'Ledyba',hp:'#C03028',ap:'#78C850',pal:{p:'#8D8932',s:'#AEC657',a:'#75778B',h:'#DEE384',b:'#151506'},sh:{p:'#B1C345',s:'#C1DE6B',a:'#AF7878',h:'#E6F893',b:'#181B08'}},
    {k:'166',n:'Ledian',hp:'#C03028',ap:'#78C850',pal:{p:'#B84934',s:'#AD9C4C',a:'#768133',h:'#EAD087',b:'#190706'},sh:{p:'#B79F49',s:'#C5C660',a:'#7B7A46',h:'#EAEF8D',b:'#191607'}},
    {k:'167',n:'Spinarak',hp:'#78C850',ap:'#F8D030',pal:{p:'#85AE4A',s:'#DAD451',a:'#A28081',h:'#EDF38D',b:'#111A08'},sh:{p:'#BECF51',s:'#E8E069',a:'#C38884',h:'#F3F795',b:'#181D09'}},
    {k:'168',n:'Ariados',hp:'#C03028',ap:'#F8D030',pal:{p:'#8E8E32',s:'#D7D24F',a:'#876A80',h:'#EFE480',b:'#151506'},sh:{p:'#AFC645',s:'#DCE064',a:'#CE7A7A',h:'#F4F890',b:'#181B08'}},
    {k:'169',n:'Crobat',hp:'#A040A0',ap:'#6890F0',pal:{p:'#7C4299',s:'#866FC7',a:'#95BB86',h:'#CDBCFD',b:'#100816'},sh:{p:'#449F8A',s:'#75C6CD',a:'#A36EBA',h:'#C6F3F3',b:'#081712'}},
    {k:'170',n:'Chinchou',hp:'#F8D030',ap:'#6890F0',pal:{p:'#EAD644',s:'#D0C9A5',a:'#827F7B',h:'#EDEAA5',b:'#1D1906'},sh:{p:'#ADE93C',s:'#CDBD8A',a:'#BC59E2',h:'#EFECA7',b:'#1D1806'}},
    {k:'171',n:'Lanturn',hp:'#F8D030',ap:'#6890F0',pal:{p:'#E2C636',s:'#CDCEA2',a:'#85807E',h:'#EBE8A2',b:'#1D1806'},sh:{p:'#A8E12D',s:'#CAC689',a:'#BE5EEA',h:'#EFE9A4',b:'#1C1806'}},
    {k:'172',n:'Pichu',hp:'#F8D030',ap:'#C03028',pal:{p:'#D6B83B',s:'#E7B776',a:'#C45F5D',h:'#F5D882',b:'#1C1706'},sh:{p:'#A4D448',s:'#E5C07C',a:'#A47FA9',h:'#F8DD91',b:'#1B1708'}},
    {k:'173',n:'Cleffa',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#EAADC0',s:'#E0BFD9',a:'#B86CAA',h:'#EFC6DF',b:'#1E1016'},sh:{p:'#CEE3EF',s:'#D1CCE1',a:'#CE56A2',h:'#E9E9F3',b:'#101B1E'}},
    {k:'174',n:'Igglybuff',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#F3B7D5',s:'#DDBAD9',a:'#AF6B9A',h:'#F5CDE8',b:'#1E1117'},sh:{p:'#C9D8E7',s:'#D9D7E7',a:'#C44EA1',h:'#E8E6F2',b:'#101A1E'}},
    {k:'175',n:'Togepi',hp:'#F8D030',ap:'#C03028',pal:{p:'#EBC344',s:'#DA9262',a:'#846155',h:'#F8CD84',b:'#1D1806'},sh:{p:'#C5EB3C',s:'#D8A154',a:'#907E69',h:'#F8D987',b:'#1D1706'}},
    {k:'176',n:'Togetic',hp:'#F8D030',ap:'#6890F0',pal:{p:'#D39F3B',s:'#A2AEA5',a:'#807D66',h:'#E5E4B9',b:'#1C1706'},sh:{p:'#88D025',s:'#A6BF9C',a:'#DE66EA',h:'#E8EEB8',b:'#1C1806'}},
    {k:'177',n:'Natu',hp:'#78C850',ap:'#C03028',pal:{p:'#4EA34C',s:'#BD9053',a:'#9D632E',h:'#DAD48B',b:'#091809'},sh:{p:'#9BC44B',s:'#D0B45F',a:'#896741',h:'#ECE691',b:'#161C09'}},
    {k:'178',n:'Xatu',hp:'#78C850',ap:'#C03028',pal:{p:'#67AD57',s:'#B99454',a:'#A26E38',h:'#E1D68B',b:'#0B180A'},sh:{p:'#BACF53',s:'#C7B260',a:'#8D6E49',h:'#F4E990',b:'#171D09'}},
    {k:'179',n:'Mareep',hp:'#F8D030',ap:'#6890F0',pal:{p:'#EAD346',s:'#E1E5E4',a:'#BF65BD',h:'#EBE599',b:'#1D1A07'},sh:{p:'#BAEA50',s:'#DEE0DB',a:'#AE71F7',h:'#EEE19A',b:'#1D1909'}},
    {k:'180',n:'Flaaffy',hp:'#F4BDC9',ap:'#F8D030',pal:{p:'#EFDD46',s:'#FCF2C2',a:'#E37487',h:'#FDF085',b:'#1E1A07'},sh:{p:'#B6EF50',s:'#F9EEB9',a:'#9DA2D1',h:'#FEE986',b:'#1D1A09'}},
    {k:'181',n:'Ampharos',hp:'#F8D030',ap:'#C03028',pal:{p:'#EEBC47',s:'#EACDB9',a:'#D45488',h:'#F6D785',b:'#1D1907'},sh:{p:'#A8EE52',s:'#F2D2BA',a:'#AE8BC4',h:'#F8DD86',b:'#1D1A09'}},
    {k:'182',n:'Bellossom',hp:'#78C850',ap:'#F8D030',pal:{p:'#5DAA55',s:'#E7C191',a:'#D5835C',h:'#FBE8C4',b:'#0A180A'},sh:{p:'#C5C650',s:'#EAE36C',a:'#C78985',h:'#F9ED88',b:'#1B1C09'}},
    {k:'183',n:'Marill',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#3F75C7',s:'#C0C8DE',a:'#CFCAA6',h:'#E0E4F4',b:'#08141E'},sh:{p:'#5CC3DD',s:'#D6E4F2',a:'#C67CC6',h:'#DDF2F9',b:'#09191C'}},
    {k:'184',n:'Azumarill',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#4F82D0',s:'#B7BFD5',a:'#C5C2A0',h:'#E1E6F5',b:'#08141E'},sh:{p:'#6BCCE4',s:'#CDDBE7',a:'#C676BE',h:'#DDF2F9',b:'#0A1A1C'}},
    {k:'185',n:'Sudowoodo',hp:'#B8A038',ap:'#78C850',pal:{p:'#927A3C',s:'#95AF57',a:'#CBC351',h:'#CED482',b:'#151107'},sh:{p:'#5CA24B',s:'#A1C75B',a:'#52C681',h:'#DFF292',b:'#131608'}},
    {k:'186',n:'Politoed',hp:'#78C850',ap:'#F8D030',pal:{p:'#4D98A8',s:'#AECFA0',a:'#CF7F39',h:'#DDF2D0',b:'#081618'},sh:{p:'#4C5B43',s:'#D4D3A5',a:'#C2754D',h:'#CED5BD',b:'#0A0D0A'}},
    {k:'187',n:'Hoppip',hp:'#78C850',ap:'#F4BDC9',pal:{p:'#4D9547',s:'#CEC294',a:'#C0BB96',h:'#E2ECB5',b:'#091709'},sh:{p:'#94B446',s:'#D3D6A1',a:'#AA8F87',h:'#EBF6BD',b:'#151C09'}},
    {k:'188',n:'Skiploom',hp:'#78C850',ap:'#F4BDC9',pal:{p:'#53A34C',s:'#D5CB97',a:'#C6C19A',h:'#E1ECB5',b:'#091809'},sh:{p:'#A1C44B',s:'#D8DDA5',a:'#AD938B',h:'#EBF6BD',b:'#161C09'}},
    {k:'189',n:'Jumpluff',hp:'#6890F0',ap:'#78C850',pal:{p:'#4D84CE',s:'#82C9A5',a:'#CCD055',h:'#CDF1D8',b:'#08141E'},sh:{p:'#5D82DA',s:'#BFE3B2',a:'#818EA5',h:'#D3F2D2',b:'#0A191B'}},
    {k:'190',n:'Aipom',hp:'#A040A0',ap:'#F4BDC9',pal:{p:'#733587',s:'#D085B9',a:'#92C5A1',h:'#E5B7F0',b:'#100715'},sh:{p:'#378D82',s:'#A8CFD2',a:'#E071AE',h:'#D1F5EF',b:'#071612'}},
    {k:'191',n:'Sunkern',hp:'#F8D030',ap:'#78C850',pal:{p:'#EBBC35',s:'#AECC6F',a:'#8A933F',h:'#E9F08D',b:'#1D1806'},sh:{p:'#B5D828',s:'#C3D360',a:'#6D95BD',h:'#E9E88A',b:'#1C1606'}},
    {k:'192',n:'Sunflora',hp:'#F8D030',ap:'#78C850',pal:{p:'#8DB056',s:'#CFBAA0',a:'#A97969',h:'#EDE1C2',b:'#101809'},sh:{p:'#DCC35B',s:'#D2D06E',a:'#A18382',h:'#F1EC8E',b:'#1C1B08'}},
    {k:'193',n:'Yanma',hp:'#78C850',ap:'#C03028',pal:{p:'#68A73B',s:'#BCB052',a:'#935883',h:'#DFDC85',b:'#101A08'},sh:{p:'#A7D646',s:'#CCC965',a:'#C25868',h:'#EAE991',b:'#171D08'}},
    {k:'194',n:'Wooper',hp:'#6890F0',ap:'#A040A0',pal:{p:'#4686D0',s:'#8D92C8',a:'#A8AA71',h:'#CFCCF5',b:'#08141E'},sh:{p:'#5DC7D6',s:'#A7BED0',a:'#A55EB8',h:'#D0E6EF',b:'#09191C'}},
    {k:'195',n:'Quagsire',hp:'#6890F0',ap:'#A040A0',pal:{p:'#5292CB',s:'#878ABD',a:'#B0A36C',h:'#CECCF3',b:'#09151E'},sh:{p:'#6DD9DF',s:'#9BB1C1',a:'#A759B1',h:'#D3E9F2',b:'#0A1A1C'}},
    {k:'196',n:'Espeon',hp:'#CC66FF',ap:'#F8D030',pal:{p:'#BD7DE5',s:'#F5D7D9',a:'#E36271',h:'#EDCBE8',b:'#170C1C'},sh:{p:'#7BC76B',s:'#DEE9B6',a:'#E36464',h:'#D3FAB5',b:'#0B190B'}},
    {k:'197',n:'Umbreon',hp:'#1A1A2E',ap:'#F8D030',pal:{p:'#111924',s:'#444636',a:'#EFBB39',h:'#FCE788',b:'#03040A'},sh:{p:'#191822',s:'#4B4536',a:'#8DBFBC',h:'#D1ECE9',b:'#040409'}},
    {k:'198',n:'Murkrow',hp:'#705898',ap:'#C03028',pal:{p:'#4B2F6C',s:'#95497D',a:'#AA6886',h:'#D7A1C8',b:'#08050D'},sh:{p:'#412964',s:'#8C7174',a:'#76B934',h:'#CEC5CE',b:'#05070C'}},
    {k:'199',n:'Slowking',hp:'#F4BDC9',ap:'#C03028',pal:{p:'#EAA4BF',s:'#E2B2B5',a:'#99558D',h:'#F8C5D0',b:'#1E1016'},sh:{p:'#EDC9B9',s:'#EBBCC2',a:'#C176B5',h:'#F8CFD6',b:'#1D1317'}},
    {k:'200',n:'Misdreavus',hp:'#705898',ap:'#C03028',pal:{p:'#633981',s:'#A258A3',a:'#C24A8E',h:'#DCABE0',b:'#0A060E'},sh:{p:'#AEAFBA',s:'#D1B2AD',a:'#A85A8F',h:'#EFE2E4',b:'#121212'}},
    {k:'201',n:'Unown',hp:'#A8A878',ap:'#705898',pal:{p:'#AE9465',s:'#A48F9E',a:'#8E5671',h:'#DECBD2',b:'#16110B'},sh:{p:'#B1BB5D',s:'#A09499',a:'#769B54',h:'#DED5D1',b:'#17110B'}},
    {k:'202',n:'Wobbuffet',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#4196CF',s:'#B8C4D8',a:'#C6C6A5',h:'#E4ECF9',b:'#08151E'},sh:{p:'#5295DE',s:'#D1DFEB',a:'#CC7E81',h:'#DCF3F8',b:'#091A1B'}},
    {k:'203',n:'Girafarig',hp:'#F8D030',ap:'#A8A878',pal:{p:'#E9DB4A',s:'#DBC985',a:'#897B63',h:'#F2E99B',b:'#1D1907'},sh:{p:'#A9E943',s:'#DCC171',a:'#7B798B',h:'#F6EC9D',b:'#1D1807'}},
    {k:'204',n:'Pineco',hp:'#B8A038',ap:'#78C850',pal:{p:'#8C673C',s:'#93A854',a:'#C6B756',h:'#CDCD81',b:'#151007'},sh:{p:'#529B4A',s:'#AAC95E',a:'#4EC175',h:'#D9EF92',b:'#121508'}},
    {k:'205',n:'Forretress',hp:'#B8A038',ap:'#705898',pal:{p:'#9D8748',s:'#967A72',a:'#C08C8C',h:'#CDB5A4',b:'#161207'},sh:{p:'#67AE56',s:'#8B9175',a:'#6CC667',h:'#D4DBB4',b:'#141608'}},
    {k:'206',n:'Dunsparce',hp:'#F8D030',ap:'#6890F0',pal:{p:'#E4D64B',s:'#A5B4AA',a:'#857562',h:'#E0E5B4',b:'#1D1907'},sh:{p:'#A7E544',s:'#A7BB9C',a:'#CB65E3',h:'#E5EAB7',b:'#1C1807'}},
    {k:'207',n:'Gligar',hp:'#A040A0',ap:'#F08030',pal:{p:'#6D3B93',s:'#C96275',a:'#B28E4C',h:'#E7B2CB',b:'#0F0815'},sh:{p:'#3D9995',s:'#B2C18A',a:'#A75256',h:'#DDF2C6',b:'#081713'}},
    {k:'208',n:'Steelix',hp:'#B8B8D0',ap:'#A8A878',pal:{p:'#A0A3A7',s:'#C5C2B3',a:'#859A99',h:'#E9E8E1',b:'#131416'},sh:{p:'#C5BECC',s:'#E1E1DD',a:'#7BC27C',h:'#EDF0EE',b:'#141619'}},
    {k:'209',n:'Snubbull',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#9B6A55',s:'#C9A2A0',a:'#B65A6F',h:'#E5BFB9',b:'#170D0A'},sh:{p:'#6F798C',s:'#C1B8D3',a:'#CD8A7E',h:'#E9E9F3',b:'#0C0F15'}},
    {k:'210',n:'Granbull',hp:'#A040A0',ap:'#F4BDC9',pal:{p:'#865254',s:'#D7A7A2',a:'#C78375',h:'#EFCAC5',b:'#130B0B'},sh:{p:'#55747B',s:'#C9D0D9',a:'#DDB487',h:'#F2F8F6',b:'#0A0F12'}},
    {k:'211',n:'Qwilfish',hp:'#6890F0',ap:'#F8D030',pal:{p:'#4199CA',s:'#A3CEBB',a:'#E7C551',h:'#D6EEE9',b:'#08161E'},sh:{p:'#5772E8',s:'#E1F2D4',a:'#B78687',h:'#DDF4E9',b:'#09191C'}},
    {k:'212',n:'Scizor',hp:'#C03028',ap:'#B8B8D0',pal:{p:'#B33A2D',s:'#44474F',a:'#CDCDD2',h:'#F59A8B',b:'#150505'},sh:{p:'#89A23D',s:'#494F48',a:'#D4D9C6',h:'#D6EC91',b:'#111607'}},
    {k:'213',n:'Shuckle',hp:'#F8D030',ap:'#C03028',pal:{p:'#E4C835',s:'#DD9D65',a:'#825C53',h:'#F6CE80',b:'#1D1806'},sh:{p:'#A9E32C',s:'#DBAE56',a:'#907E6C',h:'#F8DD85',b:'#1C1806'}},
    {k:'214',n:'Heracross',hp:'#6890F0',ap:'#C03028',pal:{p:'#30629D',s:'#3C2936',a:'#C83434',h:'#9EAFE8',b:'#060D17'},sh:{p:'#C06BCC',s:'#57294E',a:'#E67891',h:'#E9B4E9',b:'#17091A'}},
    {k:'215',n:'Sneasel',hp:'#708090',ap:'#C03028',pal:{p:'#282D41',s:'#8C488B',a:'#C32E33',h:'#C8C2D3',b:'#06080D'},sh:{p:'#C76AA2',s:'#EA9BB3',a:'#D24439',h:'#F8C2D4',b:'#1B0B17'}},
    {k:'216',n:'Teddiursa',hp:'#E8C068',ap:'#C03028',pal:{p:'#A26F41',s:'#D3956C',a:'#8A6351',h:'#F2C29A',b:'#170E07'},sh:{p:'#BCA477',s:'#DDB587',a:'#977578',h:'#F4D6B5',b:'#19150E'}},
    {k:'217',n:'Ursaring',hp:'#E8C068',ap:'#C03028',pal:{p:'#9E6F41',s:'#D1996D',a:'#895E50',h:'#EEBF97',b:'#170E07'},sh:{p:'#C5AE7E',s:'#DBB685',a:'#967476',h:'#F8DAB7',b:'#19160F'}},
    {k:'218',n:'Slugma',hp:'#F08030',ap:'#C03028',pal:{p:'#E66336',s:'#E2853F',a:'#BC422A',h:'#F8C07A',b:'#1D0A06'},sh:{p:'#CFA649',s:'#E2A25D',a:'#7B5A5B',h:'#F5D887',b:'#1C1707'}},
    {k:'219',n:'Magcargo',hp:'#F08030',ap:'#B8A038',pal:{p:'#E46B32',s:'#E2B048',a:'#D16535',h:'#F5D079',b:'#1D0A06'},sh:{p:'#DFBC4B',s:'#DFC25E',a:'#817C63',h:'#F8EB8A',b:'#1D1807'}},
    {k:'220',n:'Swinub',hp:'#A8A878',ap:'#6890F0',pal:{p:'#A79360',s:'#A0B1C3',a:'#928466',h:'#DDDFD8',b:'#16110B'},sh:{p:'#ABBF5F',s:'#AAC4C5',a:'#966880',h:'#E9EEDF',b:'#17120B'}},
    {k:'221',n:'Piloswine',hp:'#A8A878',ap:'#6890F0',pal:{p:'#B09D65',s:'#A9B8CA',a:'#967F69',h:'#D9DDD5',b:'#17120B'},sh:{p:'#B2CC65',s:'#B3CCCD',a:'#9C6B83',h:'#E7EBDC',b:'#18120B'}},
    {k:'222',n:'Corsola',hp:'#F4BDC9',ap:'#6890F0',pal:{p:'#F6BAC8',s:'#AFBAE6',a:'#A2C1C2',h:'#E7DDF1',b:'#1E1116'},sh:{p:'#B5D1E3',s:'#AFD6F4',a:'#A374CE',h:'#CBE9FA',b:'#0E1A1E'}},
    {k:'223',n:'Remoraid',hp:'#6890F0',ap:'#A8A878',pal:{p:'#3A89B7',s:'#98B3A9',a:'#B09755',h:'#D6E5E1',b:'#08151D'},sh:{p:'#516CD3',s:'#CAD1BD',a:'#937B72',h:'#E1F2E8',b:'#09181B'}},
    {k:'224',n:'Octillery',hp:'#C03028',ap:'#A8A878',pal:{p:'#B9383D',s:'#C8875A',a:'#817564',h:'#F3BE95',b:'#190706'},sh:{p:'#C5B547',s:'#D8C86D',a:'#926744',h:'#F6EE9A',b:'#1A1707'}},
    {k:'225',n:'Delibird',hp:'#C03028',ap:'#A8A878',pal:{p:'#837B9F',s:'#D7B78D',a:'#A05744',h:'#DFD8D4',b:'#101017'},sh:{p:'#CCCEC1',s:'#DCD7C0',a:'#B6A359',h:'#F6F1D8',b:'#161717'}},
    {k:'226',n:'Mantine',hp:'#6890F0',ap:'#78C850',pal:{p:'#3C87B9',s:'#7ABF9B',a:'#C9C054',h:'#C9EDD3',b:'#08151D'},sh:{p:'#59CDCB',s:'#B5D9A8',a:'#7A918B',h:'#D8F7D5',b:'#091A1B'}},
    {k:'227',n:'Skarmory',hp:'#B8B8D0',ap:'#C03028',pal:{p:'#ACB2BC',s:'#CE9793',a:'#8A8192',h:'#F1D3CB',b:'#121519'},sh:{p:'#CFCAD3',s:'#D8B8A2',a:'#92C83D',h:'#F5E3C9',b:'#16161A'}},
    {k:'228',n:'Houndour',hp:'#705898',ap:'#C03028',pal:{p:'#69472D',s:'#B58870',a:'#D04C33',h:'#F1B692',b:'#100A06'},sh:{p:'#554C5F',s:'#BDA3AD',a:'#84DB45',h:'#F5E1C8',b:'#09090F'}},
    {k:'229',n:'Houndoom',hp:'#705898',ap:'#C03028',pal:{p:'#66412C',s:'#B38870',a:'#D14135',h:'#EEB290',b:'#100906'},sh:{p:'#4D5060',s:'#BAA0AB',a:'#D1A552',h:'#F8E4CB',b:'#09090F'}},
    {k:'230',n:'Kingdra',hp:'#6890F0',ap:'#78C850',pal:{p:'#3F74B6',s:'#A3DBD1',a:'#BFBA53',h:'#CFEDEB',b:'#08141D'},sh:{p:'#6BAA5C',s:'#BCE5A7',a:'#BFC655',h:'#DAF9CC',b:'#0B180A'}},
    {k:'231',n:'Phanpy',hp:'#6890F0',ap:'#C03028',pal:{p:'#7C6B5F',s:'#C49783',a:'#BF3E34',h:'#E3C3AA',b:'#110F0D'},sh:{p:'#98B3AE',s:'#D4B6A5',a:'#BB454B',h:'#F1E7DF',b:'#121716'}},
    {k:'232',n:'Donphan',hp:'#A8A878',ap:'#C03028',pal:{p:'#A57F4A',s:'#D6A07E',a:'#B53C2F',h:'#EDC4A0',b:'#160F08'},sh:{p:'#BFB498',s:'#DBB89C',a:'#C04E33',h:'#F8E5D6',b:'#161511'}},
    {k:'233',n:'Porygon2',hp:'#F4BDC9',ap:'#6890F0',pal:{p:'#F3A3CB',s:'#6FA4D8',a:'#A26ACF',h:'#EECEE5',b:'#1A0E17'},sh:{p:'#81BFED',s:'#DBB2E3',a:'#C5C179',h:'#CFE9FD',b:'#0C1920'}},
    {k:'234',n:'Stantler',hp:'#A8A878',ap:'#E8C068',pal:{p:'#A5805D',s:'#D6BE89',a:'#8A633E',h:'#EED6AC',b:'#16100B'},sh:{p:'#A5BE5D',s:'#DDCA8A',a:'#529635',h:'#F9EBB3',b:'#17120B'}},
    {k:'235',n:'Smeargle',hp:'#A8A878',ap:'#F08030',pal:{p:'#B29A69',s:'#EAA580',a:'#AC4A30',h:'#F2D3A3',b:'#17120B'},sh:{p:'#BECE6A',s:'#E9BA82',a:'#7EA15D',h:'#FDE5AE',b:'#18120C'}},
    {k:'236',n:'Tyrogue',hp:'#C03028',ap:'#A8A878',pal:{p:'#BC4349',s:'#C99362',a:'#7F7161',h:'#F1BA92',b:'#190707'},sh:{p:'#C8B85B',s:'#D9B873',a:'#A17F68',h:'#F6ED9E',b:'#1A1708'}},
    {k:'237',n:'Hitmontop',hp:'#C03028',ap:'#A8A878',pal:{p:'#B2402D',s:'#CA9858',a:'#817661',h:'#F6C492',b:'#190705'},sh:{p:'#B09642',s:'#D1BD6D',a:'#A67B6C',h:'#F3E89A',b:'#191507'}},
    {k:'238',n:'Smoochum',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#F2B6D1',s:'#C396C2',a:'#87A9B5',h:'#EDC2E9',b:'#1E1117'},sh:{p:'#BEDAF0',s:'#B2C0D4',a:'#CF5594',h:'#D4E9F5',b:'#0F1A1E'}},
    {k:'239',n:'Elekid',hp:'#F8D030',ap:'#A8A878',pal:{p:'#F2C24B',s:'#CABF75',a:'#8C8167',h:'#F6E69B',b:'#1E1807'},sh:{p:'#C5E23F',s:'#CABA68',a:'#7E8294',h:'#F4E39A',b:'#1C1707'}},
    {k:'240',n:'Magby',hp:'#F08030',ap:'#C03028',pal:{p:'#D85826',s:'#D6883F',a:'#B35C56',h:'#F7B876',b:'#1C0A05'},sh:{p:'#D2A240',s:'#D7AC53',a:'#8E615B',h:'#F8D985',b:'#1C1706'}},
    {k:'241',n:'Miltank',hp:'#F4BDC9',ap:'#6890F0',pal:{p:'#ECB5CD',s:'#AABADF',a:'#9EB7BA',h:'#E2D9ED',b:'#1D1116'},sh:{p:'#BDD6EA',s:'#AFE2F7',a:'#A26DC3',h:'#CFEBFD',b:'#0F1A1E'}},
    {k:'242',n:'Blissey',hp:'#F4BDC9',ap:'#F8D030',pal:{p:'#EAAEBF',s:'#FAE4C1',a:'#C47E7B',h:'#FEDECF',b:'#1E1016'},sh:{p:'#CFE3EF',s:'#EFEDC8',a:'#D27C7B',h:'#FAFAE4',b:'#101B1E'}},
    {k:'243',n:'Raikou',hp:'#F8D030',ap:'#A8A878',pal:{p:'#E9C141',s:'#D6BA7C',a:'#8B8166',h:'#F6E89F',b:'#1D1806'},sh:{p:'#B4D734',s:'#D5B06D',a:'#7C8094',h:'#F3E49E',b:'#1C1706'}},
    {k:'244',n:'Entei',hp:'#C03028',ap:'#E8C068',pal:{p:'#B93D3C',s:'#DA9E58',a:'#937D65',h:'#F7B983',b:'#190706'},sh:{p:'#C69B55',s:'#D8BE63',a:'#9B6F47',h:'#FAE58F',b:'#1A1608'}},
    {k:'245',n:'Suicune',hp:'#6890F0',ap:'#A040A0',pal:{p:'#3D8BBE',s:'#8589BE',a:'#A5A670',h:'#CFCFF5',b:'#08151E'},sh:{p:'#4E65CC',s:'#A5BCCB',a:'#BC4F5F',h:'#CFE4EF',b:'#09181B'}},
    {k:'246',n:'Larvitar',hp:'#78C850',ap:'#B8A038',pal:{p:'#5AA44A',s:'#ACB45A',a:'#DAB14F',h:'#D4E28A',b:'#0A1809'},sh:{p:'#AFC647',s:'#B9C663',a:'#A7B157',h:'#EBF191',b:'#161C09'}},
    {k:'247',n:'Pupitar',hp:'#A8A878',ap:'#705898',pal:{p:'#C09C74',s:'#A894A2',a:'#8F5878',h:'#DCC9CF',b:'#17120C'},sh:{p:'#D9DA74',s:'#A4999C',a:'#669C57',h:'#E4DAD6',b:'#18120C'}},
    {k:'248',n:'Tyranitar',hp:'#336600',ap:'#CC9900',pal:{p:'#426A30',s:'#A2A94B',a:'#D8AA36',h:'#B8CB73',b:'#0A1207'},sh:{p:'#6C8C46',s:'#B8C164',a:'#D8BF44',h:'#D9E995',b:'#0E1408'}},
    {k:'249',n:'Lugia',hp:'#99CCFF',ap:'#CC9900',pal:{p:'#D6E3F8',s:'#697A8B',a:'#C5BDA3',h:'#EDEEE1',b:'#101820'},sh:{p:'#F1B8C8',s:'#D2676E',a:'#E1C7A9',h:'#FAD8D1',b:'#1E1116'}},
    {k:'250',n:'Ho-Oh',hp:'#C03028',ap:'#F8D030',pal:{p:'#C83E2D',s:'#F5BD3B',a:'#75AD4E',h:'#FEDD87',b:'#1C0705'},sh:{p:'#E2AE3C',s:'#F3D250',a:'#E57B3A',h:'#FEF087',b:'#1D1606'}},
    {k:'251',n:'Celebi',hp:'#78C850',ap:'#6890F0',pal:{p:'#7BCB68',s:'#C6E0C5',a:'#C99BD7',h:'#CBF0CD',b:'#0B1A0B'},sh:{p:'#F1B5C8',s:'#DECFE9',a:'#77BB8F',h:'#EFD7EA',b:'#1E1116'}},
    {k:'252',n:'Treecko',hp:'#78C850',ap:'#A8A878',pal:{p:'#4E9D4D',s:'#AACD67',a:'#C65247',h:'#C8F38F',b:'#081709'},sh:{p:'#67C59E',s:'#BCD978',a:'#C6B462',h:'#D5F5DC',b:'#0B1B16'}},
    {k:'253',n:'Grovyle',hp:'#78C850',ap:'#C03028',pal:{p:'#4B9C49',s:'#A4B758',a:'#D23737',h:'#C9E584',b:'#081709'},sh:{p:'#63C49C',s:'#B7C46A',a:'#D29A51',h:'#D7E9D3',b:'#0A1B16'}},
    {k:'254',n:'Sceptile',hp:'#78C850',ap:'#F8D030',pal:{p:'#51A34F',s:'#B6D457',a:'#DA6C35',h:'#D3FA8A',b:'#091809'},sh:{p:'#6BCCA4',s:'#C8E068',a:'#DACC51',h:'#DEFAD5',b:'#0B1B16'}},
    {k:'255',n:'Torchic',hp:'#F08030',ap:'#F8D030',pal:{p:'#EE7136',s:'#F2B642',a:'#DA672B',h:'#FED87C',b:'#1D0C06'},sh:{p:'#EBBC4E',s:'#EA6F32',a:'#97CDB7',h:'#FCE488',b:'#1D1807'}},
    {k:'256',n:'Combusken',hp:'#F08030',ap:'#F8D030',pal:{p:'#E65A35',s:'#EDB245',a:'#DA592F',h:'#FDD27C',b:'#1D0B06'},sh:{p:'#F3DE44',s:'#F08F2E',a:'#99C9C2',h:'#FEED85',b:'#1E1A06'}},
    {k:'257',n:'Blaziken',hp:'#C03028',ap:'#F08030',pal:{p:'#F0692D',s:'#F0B940',a:'#E05C2D',h:'#FDCE79',b:'#1E0B05'},sh:{p:'#EDB847',s:'#E87530',a:'#9ABEBE',h:'#FCDB85',b:'#1D1807'}},
    {k:'258',n:'Mudkip',hp:'#6890F0',ap:'#F08030',pal:{p:'#A7A07D',s:'#EBA951',a:'#A57A39',h:'#EDD6AA',b:'#15140F'},sh:{p:'#AEAD72',s:'#E0B760',a:'#59AD32',h:'#E9CFA6',b:'#16120D'}},
    {k:'259',n:'Marshtomp',hp:'#6890F0',ap:'#E8C068',pal:{p:'#4FB0D6',s:'#EA8A44',a:'#D9BB60',h:'#D4EFEE',b:'#08181F'},sh:{p:'#9B70DC',s:'#F2AC6A',a:'#D7CE59',h:'#DECEEF',b:'#120C1C'}},
    {k:'260',n:'Swampert',hp:'#6890F0',ap:'#B8A038',pal:{p:'#4F97DB',s:'#E88C3A',a:'#D0BD50',h:'#CFE9EA',b:'#08171F'},sh:{p:'#8868D0',s:'#E7AE65',a:'#D0B551',h:'#D4C7E6',b:'#110B1C'}},
    {k:'261',n:'Poochyena',hp:'#705898',ap:'#A8A878',pal:{p:'#794B4A',s:'#B8A38B',a:'#C46A67',h:'#E0C4B7',b:'#110A08'},sh:{p:'#685479',s:'#BEBCC0',a:'#61CF54',h:'#E9EBEE',b:'#090911'}},
    {k:'262',n:'Mightyena',hp:'#705898',ap:'#A8A878',pal:{p:'#734E47',s:'#C0A391',a:'#BF6261',h:'#E0C7B8',b:'#100A08'},sh:{p:'#5C4D71',s:'#BBBABF',a:'#63CA56',h:'#E9EBED',b:'#090910'}},
    {k:'263',n:'Zigzagoon',hp:'#A8A878',ap:'#E8C068',pal:{p:'#C0A172',s:'#DFC48F',a:'#8E7143',h:'#F5DEB1',b:'#17120C'},sh:{p:'#C4CD6A',s:'#DEC78F',a:'#609B3F',h:'#F7E4B1',b:'#18120C'}},
    {k:'264',n:'Linoone',hp:'#A8A878',ap:'#E8C068',pal:{p:'#AB8C65',s:'#D6B486',a:'#84693B',h:'#F5DEB4',b:'#16110B'},sh:{p:'#B4B75E',s:'#D4B786',a:'#579138',h:'#F7E4B4',b:'#17110B'}},
    {k:'265',n:'Wurmple',hp:'#C03028',ap:'#F4BDC9',pal:{p:'#AF3433',s:'#E69883',a:'#747983',h:'#FBBDA3',b:'#190606'},sh:{p:'#BC924C',s:'#DBC399',a:'#BA667B',h:'#F5EBB4',b:'#191508'}},
    {k:'266',n:'Silcoon',hp:'#E8C068',ap:'#A8A878',pal:{p:'#CE9C5A',s:'#CFBB6E',a:'#816C4A',h:'#EDD39F',b:'#1B1208'},sh:{p:'#A4BD4A',s:'#C9C071',a:'#618E48',h:'#E9D89D',b:'#181508'}},
    {k:'267',n:'Beautifly',hp:'#78C850',ap:'#F8D030',pal:{p:'#529849',s:'#D1CC54',a:'#B18F35',h:'#E3F390',b:'#091709'},sh:{p:'#9EB846',s:'#D8CB58',a:'#87AD75',h:'#F6F792',b:'#161C09'}},
    {k:'268',n:'Cascoon',hp:'#A040A0',ap:'#A8A878',pal:{p:'#6E4097',s:'#B27898',a:'#80975E',h:'#D8BAE1',b:'#0F0815'},sh:{p:'#429D97',s:'#A2C6A2',a:'#AD6A6A',h:'#D7F5DE',b:'#081713'}},
    {k:'269',n:'Dustox',hp:'#A040A0',ap:'#F8D030',pal:{p:'#7A4F9F',s:'#CF8F81',a:'#849443',h:'#E6C1CF',b:'#100816'},sh:{p:'#51A59F',s:'#BAD28B',a:'#B2898F',h:'#DDF9C6',b:'#091813'}},
    {k:'270',n:'Lotad',hp:'#78C850',ap:'#6890F0',pal:{p:'#519C4A',s:'#8AB29C',a:'#C4AF73',h:'#C9EEBE',b:'#091709'},sh:{p:'#9DBD48',s:'#A2CEA5',a:'#718CA4',h:'#DDF3C1',b:'#161C09'}},
    {k:'271',n:'Lombre',hp:'#78C850',ap:'#6890F0',pal:{p:'#5AA94E',s:'#87B69E',a:'#CEBB7C',h:'#CAEEBE',b:'#0A1809'},sh:{p:'#AFCB4A',s:'#9CCFA7',a:'#7A94AE',h:'#DFF3BF',b:'#161D09'}},
    {k:'272',n:'Ludicolo',hp:'#78C850',ap:'#F8D030',pal:{p:'#67B464',s:'#D1CB4F',a:'#AE9931',h:'#E4F894',b:'#0B180A'},sh:{p:'#67CF57',s:'#D8C95B',a:'#6AB19D',h:'#EEF290',b:'#161C0A'}},
    {k:'273',n:'Seedot',hp:'#B8A038',ap:'#78C850',pal:{p:'#789C51',s:'#A2C65D',a:'#C39952',h:'#D5F1A0',b:'#0E1609'},sh:{p:'#B2BB55',s:'#D0DF74',a:'#82B355',h:'#E9F08B',b:'#191A09'}},
    {k:'274',n:'Nuzleaf',hp:'#B8A038',ap:'#78C850',pal:{p:'#669A53',s:'#ABCE65',a:'#C3844B',h:'#CBED9E',b:'#0D1609'},sh:{p:'#C2C65B',s:'#CEDD72',a:'#78B358',h:'#EEF38E',b:'#1A1B09'}},
    {k:'275',n:'Shiftry',hp:'#705898',ap:'#78C850',pal:{p:'#402D6D',s:'#717F87',a:'#BF9C80',h:'#C4C3D4',b:'#08050D'},sh:{p:'#352765',s:'#779478',a:'#52C082',h:'#C4DAD7',b:'#05080C'}},
    {k:'276',n:'Taillow',hp:'#C03028',ap:'#A8A878',pal:{p:'#847CA0',s:'#D4AF87',a:'#A06744',h:'#E4DED9',b:'#101017'},sh:{p:'#C3C3B6',s:'#DBD3BE',a:'#B6985A',h:'#F4EED7',b:'#151717'}},
    {k:'277',n:'Swellow',hp:'#6890F0',ap:'#C03028',pal:{p:'#679FCE',s:'#CBA28F',a:'#B95C3A',h:'#DED9E3',b:'#0B151E'},sh:{p:'#A8C8DF',s:'#E6D1CE',a:'#BE7C56',h:'#EFE5DE',b:'#11181D'}},
    {k:'278',n:'Wingull',hp:'#A8A878',ap:'#6890F0',pal:{p:'#7F93A8',s:'#C0BAB7',a:'#A66669',h:'#D5E1F2',b:'#0F1419'},sh:{p:'#C8C8C4',s:'#C6D6E7',a:'#A7A486',h:'#EFF2F6',b:'#151618'}},
    {k:'279',n:'Pelipper',hp:'#F8D030',ap:'#6890F0',pal:{p:'#919F9C',s:'#C5BDB2',a:'#A06166',h:'#D7E3E8',b:'#101616'},sh:{p:'#D1CFB8',s:'#CBD7DE',a:'#A2A999',h:'#EFF2EB',b:'#171817'}},
    {k:'280',n:'Ralts',hp:'#78C850',ap:'#F4BDC9',pal:{p:'#75B361',s:'#D2C497',a:'#B6B796',h:'#EAF1BA',b:'#0B180A'},sh:{p:'#B9C559',s:'#D8D8A7',a:'#A78986',h:'#EBF1BA',b:'#171C0A'}},
    {k:'281',n:'Kirlia',hp:'#78C850',ap:'#F4BDC9',pal:{p:'#5E9C46',s:'#C6C190',a:'#C9C49F',h:'#E6ECB4',b:'#0A1709'},sh:{p:'#49C43D',s:'#D2DCA5',a:'#AAB98E',h:'#E9F6BB',b:'#151C09'}},
    {k:'282',n:'Gardevoir',hp:'#F4BDC9',ap:'#78C850',pal:{p:'#F7F8F0',s:'#5AAF5F',a:'#BC6F7E',h:'#E8F9E4',b:'#111A11'},sh:{p:'#F7F8F4',s:'#67B8C1',a:'#C0C560',h:'#E7F3EA',b:'#11181E'}},
    {k:'283',n:'Surskit',hp:'#6890F0',ap:'#F8D030',pal:{p:'#538DCC',s:'#B6C591',a:'#B4953A',h:'#E0ECCD',b:'#09151E'},sh:{p:'#6FD4E0',s:'#D7D39B',a:'#918CA6',h:'#E9F5D0',b:'#0A1A1C'}},
    {k:'284',n:'Masquerain',hp:'#6890F0',ap:'#F8D030',pal:{p:'#4094C5',s:'#B4C892',a:'#BAA740',h:'#E4F0D0',b:'#08151E'},sh:{p:'#516DD2',s:'#E2E0A8',a:'#AF97B5',h:'#E3F1CC',b:'#09181B'}},
    {k:'285',n:'Shroomish',hp:'#78C850',ap:'#A8A878',pal:{p:'#AF5F42',s:'#D4CFA3',a:'#8AA25C',h:'#EAC1A1',b:'#160C07'},sh:{p:'#B4D3B7',s:'#DBDFC1',a:'#B57986',h:'#F4F4DB',b:'#111A18'}},
    {k:'286',n:'Breloom',hp:'#78C850',ap:'#C03028',pal:{p:'#B66B3D',s:'#DBBA8E',a:'#798443',h:'#F6BA96',b:'#170D07'},sh:{p:'#ABCAB3',s:'#DECBB3',a:'#BF5876',h:'#F4E7CD',b:'#101A17'}},
    {k:'287',n:'Slakoth',hp:'#A8A878',ap:'#F4BDC9',pal:{p:'#B8A469',s:'#F2CDC2',a:'#928C92',h:'#F9E3CF',b:'#17120B'},sh:{p:'#ADC661',s:'#E4D9CB',a:'#C1B36D',h:'#F1EBD5',b:'#17120B'}},
    {k:'288',n:'Vigoroth',hp:'#C03028',ap:'#A8A878',pal:{p:'#BA383B',s:'#CAA160',a:'#887A69',h:'#F1B98F',b:'#190706'},sh:{p:'#C79652',s:'#CFC06D',a:'#936B4D',h:'#F6E39A',b:'#1A1508'}},
    {k:'289',n:'Slaking',hp:'#A8A878',ap:'#C03028',pal:{p:'#AD9967',s:'#D28678',a:'#896153',h:'#F3CAA6',b:'#16120B'},sh:{p:'#A6B95F',s:'#D7A47F',a:'#9BAD57',h:'#F5DBAB',b:'#17110B'}},
    {k:'290',n:'Nincada',hp:'#B8A038',ap:'#A8A878',pal:{p:'#8E973B',s:'#BEC162',a:'#8E7A98',h:'#DEDD8D',b:'#141808'},sh:{p:'#BBC94D',s:'#CAD374',a:'#C37C82',h:'#EDF39F',b:'#171B08'}},
    {k:'291',n:'Ninjask',hp:'#F8D030',ap:'#A8A878',pal:{p:'#AEB744',s:'#CAC867',a:'#80668D',h:'#ECEB95',b:'#171A07'},sh:{p:'#87D245',s:'#D5D077',a:'#B99975',h:'#EDEF9C',b:'#191B08'}},
    {k:'292',n:'Shedinja',hp:'#E8C068',ap:'#A8A878',pal:{p:'#889D41',s:'#C9C367',a:'#786590',h:'#E1E291',b:'#151808'},sh:{p:'#69CC45',s:'#D8D476',a:'#BBAE67',h:'#E8EF9F',b:'#171B08'}},
    {k:'293',n:'Whismur',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#F5BCCF',s:'#C599C7',a:'#7FA1B0',h:'#EEC5E9',b:'#1E1117'},sh:{p:'#B6D6E2',s:'#AFBDCB',a:'#C657AA',h:'#CFE4EE',b:'#0E1A1E'}},
    {k:'294',n:'Loudred',hp:'#A040A0',ap:'#F4BDC9',pal:{p:'#8553A1',s:'#C980BB',a:'#8EBBA2',h:'#E6BCF4',b:'#110916'},sh:{p:'#55A793',s:'#A1C8C4',a:'#D6709D',h:'#D6F8F0',b:'#091813'}},
    {k:'295',n:'Exploud',hp:'#A040A0',ap:'#F08030',pal:{p:'#753A93',s:'#CC6272',a:'#B4914B',h:'#E7B2CA',b:'#100815'},sh:{p:'#3B9983',s:'#AABB86',a:'#A95659',h:'#DFF2C6',b:'#081712'}},
    {k:'296',n:'Makuhita',hp:'#F8D030',ap:'#C03028',pal:{p:'#EDD84A',s:'#DE8D64',a:'#836053',h:'#F8D285',b:'#1D1907'},sh:{p:'#A4DB3D',s:'#DC9E5C',a:'#8C806C',h:'#F5DB86',b:'#1C1806'}},
    {k:'297',n:'Hariyama',hp:'#F08030',ap:'#A8A878',pal:{p:'#C65D28',s:'#CEA95D',a:'#A44E3E',h:'#EED08F',b:'#1C0A05'},sh:{p:'#C09C3F',s:'#D0B46A',a:'#847A68',h:'#F5E89D',b:'#1B1606'}},
    {k:'298',n:'Azurill',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#4182C0',s:'#BBC9DA',a:'#C9C19F',h:'#DFE4F2',b:'#08141E'},sh:{p:'#5DCCD5',s:'#D3E6EE',a:'#BA79BE',h:'#DEF4F9',b:'#091A1C'}},
    {k:'299',n:'Nosepass',hp:'#6890F0',ap:'#B8A038',pal:{p:'#85816E',s:'#B2A968',a:'#DACB56',h:'#D8CA93',b:'#11120E'},sh:{p:'#79B089',s:'#B6C277',a:'#7BD361',h:'#E1E89F',b:'#11170E'}},
    {k:'300',n:'Skitty',hp:'#F4BDC9',ap:'#F8D030',pal:{p:'#B77C63',s:'#E7CE89',a:'#C9B54E',h:'#F8DDAD',b:'#180E0B'},sh:{p:'#C6B985',s:'#EADA91',a:'#94ABAC',h:'#F5EBBF',b:'#17170F'}},
    {k:'301',n:'Delcatty',hp:'#A040A0',ap:'#F4BDC9',pal:{p:'#915D58',s:'#E0B1AD',a:'#C7AA72',h:'#EBCDC4',b:'#140B0B'},sh:{p:'#ABB575',s:'#DCD2B3',a:'#9B94C6',h:'#F1EFD6',b:'#15170C'}},
    {k:'302',n:'Sableye',hp:'#705898',ap:'#C03028',pal:{p:'#422C58',s:'#814994',a:'#CC3464',h:'#C89BE8',b:'#08050C'},sh:{p:'#CCB241',s:'#E2A150',a:'#A56BA0',h:'#F8E189',b:'#1C1706'}},
    {k:'303',n:'Mawile',hp:'#705898',ap:'#F8D030',pal:{p:'#4A2E74',s:'#B18A80',a:'#B4736E',h:'#DDC2CF',b:'#08050E'},sh:{p:'#3F286B',s:'#9F9472',a:'#78C687',h:'#D6D8D1',b:'#05070D'}},
    {k:'304',n:'Aron',hp:'#B8B8D0',ap:'#A8A878',pal:{p:'#A0A6B2',s:'#CFD2CF',a:'#616E73',h:'#E8ECF1',b:'#121518'},sh:{p:'#9696B3',s:'#CED0CD',a:'#9371CE',h:'#E3EDF1',b:'#101418'}},
    {k:'305',n:'Lairon',hp:'#B8B8D0',ap:'#A8A878',pal:{p:'#A5ACB8',s:'#CED1CE',a:'#616A73',h:'#E8ECF1',b:'#121518'},sh:{p:'#9191AD',s:'#CDCFCC',a:'#8072CC',h:'#E1ECEF',b:'#0F1418'}},
    {k:'306',n:'Aggron',hp:'#B8B8D0',ap:'#A8A878',pal:{p:'#9CA3AD',s:'#CDD0CC',a:'#616F70',h:'#E5E9EE',b:'#121418'},sh:{p:'#9496AF',s:'#CBCFCA',a:'#8672C8',h:'#E3EEF1',b:'#101418'}},
    {k:'307',n:'Meditite',hp:'#6890F0',ap:'#A040A0',pal:{p:'#448DC8',s:'#9090C6',a:'#BAAD76',h:'#CECCF4',b:'#08151E'},sh:{p:'#61D9DE',s:'#A4B9CD',a:'#B261BB',h:'#D3EAF2',b:'#091A1C'}},
    {k:'308',n:'Medicham',hp:'#A040A0',ap:'#6890F0',pal:{p:'#703787',s:'#886EC2',a:'#9CBB83',h:'#CBB9FB',b:'#100715'},sh:{p:'#388C7D',s:'#72C0D1',a:'#A36CC2',h:'#C4F3F4',b:'#071612'}},
    {k:'309',n:'Electrike',hp:'#F8D030',ap:'#78C850',pal:{p:'#E7CB34',s:'#D4E17B',a:'#676C32',h:'#EFF08A',b:'#1D1906'},sh:{p:'#ADE72A',s:'#D5D860',a:'#7867B9',h:'#F1EE8A',b:'#1D1806'}},
    {k:'310',n:'Manectric',hp:'#6890F0',ap:'#F8D030',pal:{p:'#487CD2',s:'#BFD29F',a:'#C1B042',h:'#E4F1D2',b:'#08141E'},sh:{p:'#5FBDD7',s:'#DFE2A9',a:'#9BA2B7',h:'#E4F2CC',b:'#09191C'}},
    {k:'311',n:'Plusle',hp:'#C03028',ap:'#F8D030',pal:{p:'#AA313A',s:'#DC983D',a:'#877650',h:'#FEC27F',b:'#190606'},sh:{p:'#B7A549',s:'#E4B94E',a:'#947E63',h:'#FEF289',b:'#191607'}},
    {k:'312',n:'Minun',hp:'#6890F0',ap:'#F8D030',pal:{p:'#3E72C4',s:'#BFD29C',a:'#BC993C',h:'#DFEBCD',b:'#08141E'},sh:{p:'#5CBFDA',s:'#E2E1A9',a:'#9593AF',h:'#E7F4CF',b:'#09191C'}},
    {k:'313',n:'Volbeat',hp:'#6890F0',ap:'#F8D030',pal:{p:'#4E93D3',s:'#BDCE9B',a:'#B6A53B',h:'#E4F1D1',b:'#08151E'},sh:{p:'#5E90E1',s:'#DDDDA5',a:'#AF99B2',h:'#E6F2CC',b:'#0A1A1C'}},
    {k:'314',n:'Illumise',hp:'#A040A0',ap:'#6890F0',pal:{p:'#6F3C91',s:'#866CC2',a:'#93BC86',h:'#CABBFD',b:'#0F0815'},sh:{p:'#398C73',s:'#75C0CD',a:'#996FC4',h:'#C1EEED',b:'#081611'}},
    {k:'315',n:'Roselia',hp:'#78C850',ap:'#C03028',pal:{p:'#5CA954',s:'#DB9D92',a:'#C65A61',h:'#F2D0BF',b:'#0A1809'},sh:{p:'#CFD355',s:'#DEC669',a:'#C05967',h:'#F8E28A',b:'#1B1C09'}},
    {k:'316',n:'Gulpin',hp:'#78C850',ap:'#A040A0',pal:{p:'#6BB35F',s:'#988B7C',a:'#AAA669',h:'#D4D8B7',b:'#0B180A'},sh:{p:'#BCD45B',s:'#95AB7D',a:'#9B7882',h:'#E0EBB3',b:'#171D0A'}},
    {k:'317',n:'Swalot',hp:'#A040A0',ap:'#F8D030',pal:{p:'#723D91',s:'#CD8A7F',a:'#869B45',h:'#E6C1CD',b:'#100815'},sh:{p:'#3E977F',s:'#B1C984',a:'#BB8F96',h:'#E0F9C5',b:'#081712'}},
    {k:'318',n:'Carvanha',hp:'#C03028',ap:'#F8D030',pal:{p:'#B94736',s:'#E9B347',a:'#8D7B56',h:'#FDC87B',b:'#190706'},sh:{p:'#C6A850',s:'#E8CE55',a:'#9D886E',h:'#FEEE85',b:'#1A1608'}},
    {k:'319',n:'Sharpedo',hp:'#6890F0',ap:'#F8D030',pal:{p:'#3873B2',s:'#B6C792',a:'#B7993B',h:'#E0ECCD',b:'#07141D'},sh:{p:'#52B9C5',s:'#D6D59D',a:'#948FAB',h:'#E8F5CF',b:'#09191B'}},
    {k:'320',n:'Wailmer',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#3F76C9',s:'#BDC8DE',a:'#C6C5A1',h:'#E3E8F8',b:'#08141E'},sh:{p:'#57B7CF',s:'#D8E7F2',a:'#B678C2',h:'#DBF0F7',b:'#09181B'}},
    {k:'321',n:'Wailord',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#4F80CB',s:'#C1CEDE',a:'#C6C3A2',h:'#E1E6F4',b:'#08141E'},sh:{p:'#6BC8E0',s:'#D6EAF2',a:'#C37BBF',h:'#DEF2F9',b:'#0A191C'}},
    {k:'322',n:'Numel',hp:'#E8C068',ap:'#F08030',pal:{p:'#D55E32',s:'#EAB048',a:'#D25232',h:'#FAC77A',b:'#1C0B06'},sh:{p:'#B8D639',s:'#E5C258',a:'#748C5F',h:'#FDDF88',b:'#1B1706'}},
    {k:'323',n:'Camerupt',hp:'#F08030',ap:'#B8A038',pal:{p:'#E25831',s:'#DFA948',a:'#CF6238',h:'#F4CB7A',b:'#1D0906'},sh:{p:'#DCAA49',s:'#DBBD5C',a:'#817B62',h:'#F8E78B',b:'#1C1707'}},
    {k:'324',n:'Torkoal',hp:'#F08030',ap:'#A8A878',pal:{p:'#EA5D35',s:'#DEB254',a:'#C06642',h:'#F6CF85',b:'#1D0906'},sh:{p:'#D3A348',s:'#DCC470',a:'#76736A',h:'#F3E391',b:'#1C1707'}},
    {k:'325',n:'Spoink',hp:'#A040A0',ap:'#F4BDC9',pal:{p:'#75368B',s:'#D285B9',a:'#93C5A3',h:'#E5B7F1',b:'#100715'},sh:{p:'#389084',s:'#A8D1D3',a:'#E372AE',h:'#D1F5EF',b:'#071712'}},
    {k:'326',n:'Grumpig',hp:'#A040A0',ap:'#F4BDC9',pal:{p:'#764495',s:'#D187C5',a:'#95BFA1',h:'#E2BAF1',b:'#100815'},sh:{p:'#469B83',s:'#A9D1CA',a:'#DA76AB',h:'#D4F5ED',b:'#081712'}},
    {k:'327',n:'Spinda',hp:'#F4BDC9',ap:'#C03028',pal:{p:'#F2BACB',s:'#D48D8B',a:'#6F6572',h:'#F8C2BA',b:'#1E1116'},sh:{p:'#C3E2F0',s:'#CBB29E',a:'#B74555',h:'#E3E4CF',b:'#0F1B1E'}},
    {k:'328',n:'Trapinch',hp:'#E8C068',ap:'#A8A878',pal:{p:'#BEA353',s:'#D3AA6E',a:'#958168',h:'#EAD7A0',b:'#1A1308'},sh:{p:'#8CBC47',s:'#CCAF6B',a:'#45813B',h:'#EFE4A4',b:'#181608'}},
    {k:'329',n:'Vibrava',hp:'#78C850',ap:'#F8D030',pal:{p:'#6CAF54',s:'#C3CE53',a:'#BBA741',h:'#ECF890',b:'#0B1809'},sh:{p:'#4ECB43',s:'#DADB63',a:'#76C1AD',h:'#EDF28D',b:'#151C09'}},
    {k:'330',n:'Flygon',hp:'#78C850',ap:'#C03028',pal:{p:'#4E9C49',s:'#B5884C',a:'#986B2C',h:'#E0D98E',b:'#091709'},sh:{p:'#4FB53D',s:'#C8AB5D',a:'#86A867',h:'#EAE38F',b:'#151B09'}},
    {k:'331',n:'Cacnea',hp:'#78C850',ap:'#F8D030',pal:{p:'#56A850',s:'#DAD254',a:'#B39C35',h:'#E5F893',b:'#0A1809'},sh:{p:'#A7CA4F',s:'#DFCE58',a:'#88AF7E',h:'#F7FA95',b:'#161C09'}},
    {k:'332',n:'Cacturne',hp:'#78C850',ap:'#705898',pal:{p:'#6EAD5C',s:'#92947A',a:'#BE8A89',h:'#CCD8B7',b:'#0B180A'},sh:{p:'#BFCE5B',s:'#9C9E7C',a:'#8D9B6F',h:'#DAE3B9',b:'#171D0A'}},
    {k:'333',n:'Swablu',hp:'#6890F0',ap:'#A8A878',pal:{p:'#377EB6',s:'#9AB3AC',a:'#B39854',h:'#D5E4E1',b:'#07141D'},sh:{p:'#53C8CA',s:'#C1CAB6',a:'#8F7489',h:'#E0F1E5',b:'#09191B'}},
    {k:'334',n:'Altaria',hp:'#6890F0',ap:'#A8A878',pal:{p:'#3B8BC9',s:'#9DB8B1',a:'#B7A158',h:'#D6E6E3',b:'#08151E'},sh:{p:'#5ADCDF',s:'#C7CFBC',a:'#96778E',h:'#E2F3E7',b:'#091A1C'}},
    {k:'335',n:'Zangoose',hp:'#A8A878',ap:'#C03028',pal:{p:'#C4A979',s:'#D6927D',a:'#886253',h:'#F4C9A5',b:'#18120C'},sh:{p:'#C2CF71',s:'#DAB185',a:'#9BAE59',h:'#F6DAAA',b:'#18120C'}},
    {k:'336',n:'Seviper',hp:'#705898',ap:'#C03028',pal:{p:'#556D53',s:'#BF8961',a:'#A56E99',h:'#D6C39C',b:'#0A110A'},sh:{p:'#A5935D',s:'#C8AA6F',a:'#8C828E',h:'#EDD29C',b:'#15150A'}},
    {k:'337',n:'Lunatone',hp:'#B8B8D0',ap:'#705898',pal:{p:'#B0B8BF',s:'#9F95B6',a:'#9886C7',h:'#D9D3F4',b:'#131519'},sh:{p:'#D3CDD6',s:'#A6A4C1',a:'#81CC66',h:'#DEDEF3',b:'#16161A'}},
    {k:'338',n:'Solrock',hp:'#F08030',ap:'#F8D030',pal:{p:'#A87941',s:'#D2B552',a:'#D49F46',h:'#E5C978',b:'#180F07'},sh:{p:'#7AAB4D',s:'#C8C65B',a:'#56CB4C',h:'#F2ED8A',b:'#161608'}},
    {k:'339',n:'Barboach',hp:'#6890F0',ap:'#E8C068',pal:{p:'#3973C4',s:'#AFC1AD',a:'#C7AC4E',h:'#DEE6D8',b:'#08141E'},sh:{p:'#50B4CA',s:'#D1D5B3',a:'#947C8A',h:'#DEEBD3',b:'#09181B'}},
    {k:'340',n:'Whiscash',hp:'#6890F0',ap:'#E8C068',pal:{p:'#418CC6',s:'#AFBEAB',a:'#C8A057',h:'#DBE2D3',b:'#08151E'},sh:{p:'#5ED9DC',s:'#CFD2B1',a:'#9E818B',h:'#E3EFD5',b:'#091A1C'}},
    {k:'341',n:'Corphish',hp:'#C03028',ap:'#F8D030',pal:{p:'#B74F33',s:'#F0B35B',a:'#C5993C',h:'#FABE82',b:'#1A0806'},sh:{p:'#769CAA',s:'#E2E0B3',a:'#C77670',h:'#E6F2CB',b:'#0E1618'}},
    {k:'342',n:'Crawdaunt',hp:'#C03028',ap:'#705898',pal:{p:'#BF3435',s:'#C68F6E',a:'#B38C6C',h:'#EAA696',b:'#1A0606'},sh:{p:'#7EA0AF',s:'#BFC5CB',a:'#B25B74',h:'#D6E4E2',b:'#0F1718'}},
    {k:'343',n:'Baltoy',hp:'#E8C068',ap:'#A8A878',pal:{p:'#C8AE60',s:'#D4AF74',a:'#7C6244',h:'#EAD69F',b:'#1B1309'},sh:{p:'#97C756',s:'#CFB371',a:'#4E8642',h:'#EEE4A4',b:'#191708'}},
    {k:'344',n:'Claydol',hp:'#E8C068',ap:'#705898',pal:{p:'#C09E4E',s:'#CCAB76',a:'#937377',h:'#DFC49D',b:'#1A1308'},sh:{p:'#91BD42',s:'#BCAF71',a:'#5B7B49',h:'#E0D49F',b:'#181607'}},
    {k:'345',n:'Lileep',hp:'#A040A0',ap:'#78C850',pal:{p:'#886769',s:'#AB9F76',a:'#639884',h:'#D2C8AA',b:'#120D0D'},sh:{p:'#639699',s:'#B6DCC0',a:'#B9A664',h:'#E2F5DE',b:'#0D1516'}},
    {k:'346',n:'Cradily',hp:'#78C850',ap:'#A040A0',pal:{p:'#818A56',s:'#B4977F',a:'#707797',h:'#D6C4A6',b:'#101209'},sh:{p:'#87AA9F',s:'#C2C3C8',a:'#AECB72',h:'#EAE7DE',b:'#111712'}},
    {k:'347',n:'Anorith',hp:'#F08030',ap:'#A8A878',pal:{p:'#9D6D48',s:'#C2A06F',a:'#6E757F',h:'#DAC696',b:'#160D07'},sh:{p:'#939D89',s:'#D0CFB6',a:'#AA9357',h:'#F5F1D8',b:'#141612'}},
    {k:'348',n:'Armaldo',hp:'#6890F0',ap:'#A8A878',pal:{p:'#797F7C',s:'#B2AA85',a:'#77868B',h:'#D8D1B3',b:'#10110F'},sh:{p:'#6DAEB5',s:'#CAD3CD',a:'#C0A373',h:'#EDF3EB',b:'#0E1618'}},
    {k:'349',n:'Feebas',hp:'#A8A878',ap:'#6890F0',pal:{p:'#C6AA80',s:'#9BADBE',a:'#8D8A68',h:'#E0E2DC',b:'#18120C'},sh:{p:'#CCD279',s:'#A5BEBF',a:'#986784',h:'#E4E7DB',b:'#18120C'}},
    {k:'350',n:'Milotic',hp:'#F4BDC9',ap:'#6890F0',pal:{p:'#F9E2EC',s:'#6EB0DC',a:'#BC689A',h:'#EFE7F7',b:'#1D1318'},sh:{p:'#EFF8C7',s:'#C1AA77',a:'#A06BE8',h:'#ECE6DA',b:'#1D1A0D'}},
    {k:'351',n:'Castform',hp:'#A8A878',ap:'#6890F0',pal:{p:'#BB9870',s:'#A2B2C5',a:'#988B72',h:'#DCDED8',b:'#17110C'},sh:{p:'#D5D670',s:'#ADC5C7',a:'#9E7089',h:'#E9EBDE',b:'#18120C'}},
    {k:'352',n:'Kecleon',hp:'#78C850',ap:'#C03028',pal:{p:'#4D9443',s:'#B48D4F',a:'#9B5E2F',h:'#DCD389',b:'#091709'},sh:{p:'#97B241',s:'#C2AC5B',a:'#896440',h:'#EEE58F',b:'#151B09'}},
    {k:'353',n:'Shuppet',hp:'#A040A0',ap:'#6890F0',pal:{p:'#583885',s:'#8A6AC9',a:'#B182BD',h:'#CAB9FD',b:'#0A0710'},sh:{p:'#ADC6C0',s:'#BDD7E0',a:'#9065D5',h:'#E3F3FB',b:'#121714'}},
    {k:'354',n:'Banette',hp:'#705898',ap:'#F8D030',pal:{p:'#523881',s:'#AC7C9F',a:'#D37A94',h:'#DDBFE2',b:'#09060E'},sh:{p:'#AEAFBA',s:'#DFD2AF',a:'#B189A0',h:'#F5F2E4',b:'#121212'}},
    {k:'355',n:'Duskull',hp:'#705898',ap:'#C03028',pal:{p:'#48306C',s:'#945595',a:'#C54D92',h:'#D5A9DD',b:'#07060C'},sh:{p:'#A5A5A9',s:'#C5A5A3',a:'#A45F8D',h:'#EDDFE1',b:'#121212'}},
    {k:'356',n:'Dusclops',hp:'#705898',ap:'#C03028',pal:{p:'#5C357B',s:'#9B59A1',a:'#BD4895',h:'#D9AADC',b:'#09060E'},sh:{p:'#A5A7B1',s:'#CFAFAB',a:'#9E588A',h:'#ECDEE0',b:'#111212'}},
    {k:'357',n:'Tropius',hp:'#78C850',ap:'#F8D030',pal:{p:'#62AE5A',s:'#D0D45B',a:'#B09133',h:'#E2F490',b:'#0A180A'},sh:{p:'#AECE57',s:'#DDD95F',a:'#86AD78',h:'#F5F891',b:'#161D0A'}},
    {k:'358',n:'Chimecho',hp:'#6890F0',ap:'#F8D030',pal:{p:'#3F78C3',s:'#B9CC96',a:'#B9A83B',h:'#E5F1D2',b:'#08141E'},sh:{p:'#5077D0',s:'#DDDBA4',a:'#B299B4',h:'#E5F2CD',b:'#09181B'}},
    {k:'359',n:'Absol',hp:'#A8A878',ap:'#C03028',pal:{p:'#EEEEEE',s:'#3A2630',a:'#D44B37',h:'#F8E9E9',b:'#121418'},sh:{p:'#ECCEEA',s:'#533E53',a:'#D5DE20',h:'#EAD4E6',b:'#17121D'}},
    {k:'360',n:'Wynaut',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#5486C9',s:'#B8C3D4',a:'#C3BB9B',h:'#DFE3F2',b:'#09141E'},sh:{p:'#6ECBDD',s:'#CDDFE6',a:'#B673B8',h:'#DEF3F9',b:'#0A1A1C'}},
    {k:'361',n:'Snorunt',hp:'#6890F0',ap:'#A8A878',pal:{p:'#427EC7',s:'#9EBCB2',a:'#B0A550',h:'#DAE8E6',b:'#08141E'},sh:{p:'#527CD4',s:'#CBD1BF',a:'#8F7473',h:'#DEEDE3',b:'#09191B'}},
    {k:'362',n:'Glalie',hp:'#6890F0',ap:'#A8A878',pal:{p:'#4A84D1',s:'#A2BEB5',a:'#B3A755',h:'#D9E8E6',b:'#08141E'},sh:{p:'#61C3D7',s:'#CED3C0',a:'#8C768C',h:'#DDEDE3',b:'#09191C'}},
    {k:'363',n:'Spheal',hp:'#6890F0',ap:'#C03028',pal:{p:'#3B8AB8',s:'#9B838B',a:'#9F7138',h:'#DECFCC',b:'#08151D'},sh:{p:'#4B65C5',s:'#CBB8A5',a:'#AE8D70',h:'#DEDFCA',b:'#09181A'}},
    {k:'364',n:'Sealeo',hp:'#6890F0',ap:'#C03028',pal:{p:'#4494C9',s:'#98B3BB',a:'#D29A4A',h:'#D1DEE9',b:'#08151E'},sh:{p:'#60DDDF',s:'#CECDCA',a:'#A05A9E',h:'#D9E7E9',b:'#091A1C'}},
    {k:'365',n:'Walrein',hp:'#6890F0',ap:'#C03028',pal:{p:'#4A84CC',s:'#A78F98',a:'#A6733C',h:'#DBCECA',b:'#08141E'},sh:{p:'#66CFE1',s:'#CFBDA9',a:'#9F5279',h:'#E4E6D0',b:'#0A1A1C'}},
    {k:'366',n:'Clamperl',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#4D7EC3',s:'#D5DDE7',a:'#A98EB8',h:'#DFECF8',b:'#08141E'},sh:{p:'#B37FE2',s:'#E7DEF4',a:'#D390CE',h:'#F0E9F9',b:'#100F1C'}},
    {k:'367',n:'Huntail',hp:'#6890F0',ap:'#F8D030',pal:{p:'#398FC5',s:'#B8CA99',a:'#C0A044',h:'#DFEBCB',b:'#08151E'},sh:{p:'#58B7DB',s:'#E1E3A9',a:'#9793B4',h:'#E7F5CF',b:'#09181C'}},
    {k:'368',n:'Gorebyss',hp:'#F4BDC9',ap:'#6890F0',pal:{p:'#F2BCCF',s:'#ACBBE2',a:'#95B1B2',h:'#E5DCF0',b:'#1E1117'},sh:{p:'#C4E6F1',s:'#A9D7EF',a:'#9D6AB8',h:'#CFEEFD',b:'#0F1B1E'}},
    {k:'369',n:'Relicanth',hp:'#6890F0',ap:'#B8A038',pal:{p:'#747975',s:'#B19F76',a:'#818B78',h:'#D6CBA6',b:'#10110F'},sh:{p:'#75B3B8',s:'#C8D3BD',a:'#C2B063',h:'#F0F5E4',b:'#0E1718'}},
    {k:'370',n:'Luvdisc',hp:'#F4BDC9',ap:'#C03028',pal:{p:'#E8B1C0',s:'#DF999E',a:'#716C74',h:'#F4C0B9',b:'#1D1016'},sh:{p:'#B9D8E6',s:'#D7BBA9',a:'#B64863',h:'#E0DFCC',b:'#0E1A1E'}},
    {k:'371',n:'Bagon',hp:'#6890F0',ap:'#A8A878',pal:{p:'#3B80B3',s:'#85B073',a:'#CCAE57',h:'#B2CBED',b:'#06101A'},sh:{p:'#5AA28D',s:'#C1D183',a:'#B46955',h:'#D8EEB9',b:'#0A1810'}},
    {k:'372',n:'Shelgon',hp:'#B8B8D0',ap:'#A8A878',pal:{p:'#5277AC',s:'#95B876',a:'#BDAB63',h:'#B8C9EE',b:'#090F18'},sh:{p:'#749F7D',s:'#BFCC7F',a:'#C0804D',h:'#E4EFB9',b:'#0E170F'}},
    {k:'373',n:'Salamence',hp:'#3366CC',ap:'#C03028',pal:{p:'#3171AD',s:'#988246',a:'#E2AF62',h:'#A4B2E9',b:'#060D18'},sh:{p:'#4C8C61',s:'#C59756',a:'#D55952',h:'#CAD99A',b:'#09160A'}},
    {k:'374',n:'Beldum',hp:'#B8B8D0',ap:'#C03028',pal:{p:'#2E5C8E',s:'#AFA2AF',a:'#D44D30',h:'#99C3E9',b:'#060F16'},sh:{p:'#A5A4AC',s:'#D7BDC1',a:'#D48B40',h:'#E9DAE6',b:'#141418'}},
    {k:'375',n:'Metang',hp:'#B8B8D0',ap:'#C03028',pal:{p:'#305C88',s:'#B0A5AE',a:'#CE3830',h:'#9AC4E7',b:'#060F16'},sh:{p:'#ABAAB2',s:'#D6BCC1',a:'#CE983E',h:'#EDDDE9',b:'#151518'}},
    {k:'376',n:'Metagross',hp:'#336699',ap:'#C03028',pal:{p:'#2F6D8D',s:'#AB9EAA',a:'#D15037',h:'#9ACAE9',b:'#061016'},sh:{p:'#A4A4AB',s:'#D0B6BC',a:'#D18A45',h:'#E8DAE5',b:'#141418'}},
    {k:'377',n:'Regirock',hp:'#E8C068',ap:'#B8A038',pal:{p:'#A87D45',s:'#C1A953',a:'#C6B14E',h:'#DEC37D',b:'#171107'},sh:{p:'#759F48',s:'#B4BA5F',a:'#64CB48',h:'#E4DF8A',b:'#151507'}},
    {k:'378',n:'Regice',hp:'#6890F0',ap:'#B8B8D0',pal:{p:'#76BBDF',s:'#DEE9F3',a:'#82B2CE',h:'#E2F5F8',b:'#0A191F'},sh:{p:'#B8E5EE',s:'#E8EDF5',a:'#93A0D2',h:'#F8F8FA',b:'#0E1B1E'}},
    {k:'379',n:'Registeel',hp:'#B8B8D0',ap:'#A8A878',pal:{p:'#B0B6C1',s:'#CDCDC3',a:'#7192AE',h:'#EDEFF1',b:'#131519'},sh:{p:'#D1CDD6',s:'#DDDBD1',a:'#69CA57',h:'#F4F3EB',b:'#16161A'}},
    {k:'380',n:'Latias',hp:'#C03028',ap:'#A8A878',pal:{p:'#A73B28',s:'#CA9F5F',a:'#816F61',h:'#EEBE8D',b:'#190705'},sh:{p:'#B29841',s:'#D1C16D',a:'#8F5A43',h:'#F5E99A',b:'#191507'}},
    {k:'381',n:'Latios',hp:'#6890F0',ap:'#A8A878',pal:{p:'#3F90C4',s:'#9EB8B0',a:'#B6965A',h:'#D3E3DE',b:'#08151E'},sh:{p:'#5570E2',s:'#CFD6C3',a:'#967C77',h:'#DEEFE5',b:'#09181C'}},
    {k:'382',n:'Kyogre',hp:'#6890F0',ap:'#C03028',pal:{p:'#1954B9',s:'#E0CCD8',a:'#D7402D',h:'#98B7E9',b:'#040C19'},sh:{p:'#C43790',s:'#EBBBC7',a:'#D7313A',h:'#F5AACF',b:'#1B0713'}},
    {k:'383',n:'Groudon',hp:'#C03028',ap:'#E8C068',pal:{p:'#BC222A',s:'#80472B',a:'#DFCA63',h:'#FD9076',b:'#170404'},sh:{p:'#C2C036',s:'#776731',a:'#DE503F',h:'#F9EE7D',b:'#191706'}},
    {k:'384',n:'Rayquaza',hp:'#006600',ap:'#F8D030',pal:{p:'#0E6F45',s:'#3E3B19',a:'#DCC83F',h:'#FEF189',b:'#020D06'},sh:{p:'#111111',s:'#CBA345',a:'#DC5A32',h:'#FDED88',b:'#020202'}},
    {k:'385',n:'Jirachi',hp:'#F8D030',ap:'#A8A878',pal:{p:'#F8FA91',s:'#DCE6E7',a:'#6B93BD',h:'#F6F1AF',b:'#1E1C0A'},sh:{p:'#EDDB5D',s:'#EDE6C3',a:'#C97586',h:'#F4EC8F',b:'#1D1908'}},
    {k:'386',n:'Deoxys',hp:'#A040A0',ap:'#78C850',pal:{p:'#DE483C',s:'#60B3BE',a:'#617365',h:'#F1A47F',b:'#1A0706'},sh:{p:'#E39E4D',s:'#75C1C9',a:'#7E8189',h:'#EED98A',b:'#1C1308'}},
    {k:'387',n:'Turtwig',hp:'#78C850',ap:'#E8C068',pal:{p:'#489555',s:'#9D8447',a:'#E2B55C',h:'#B9DB8E',b:'#09150A'},sh:{p:'#52BB78',s:'#AA904B',a:'#6CF453',h:'#D2EB9D',b:'#0D180A'}},
    {k:'388',n:'Grotle',hp:'#78C850',ap:'#E8C068',pal:{p:'#4C954A',s:'#997E45',a:'#E0B862',h:'#C0DB8F',b:'#091509'},sh:{p:'#7DB557',s:'#A58949',a:'#E6C863',h:'#D8EB9E',b:'#0E180A'}},
    {k:'389',n:'Torterra',hp:'#78C850',ap:'#B8A038',pal:{p:'#4D9D5B',s:'#957D3B',a:'#D6C450',h:'#B9DD8D',b:'#09160A'},sh:{p:'#50B776',s:'#A18B44',a:'#68E746',h:'#CAE596',b:'#0D1809'}},
    {k:'390',n:'Chimchar',hp:'#F08030',ap:'#C03028',pal:{p:'#D9462C',s:'#E3A93B',a:'#D13035',h:'#F4BB6A',b:'#1C0905'},sh:{p:'#D6C94B',s:'#ECBB60',a:'#D1382B',h:'#F8E286',b:'#1C1807'}},
    {k:'391',n:'Monferno',hp:'#F08030',ap:'#C03028',pal:{p:'#E06929',s:'#EBB838',a:'#D53226',h:'#F8C86A',b:'#1D0B05'},sh:{p:'#DDC149',s:'#E9C25B',a:'#D54E30',h:'#F8DE85',b:'#1D1807'}},
    {k:'392',n:'Infernape',hp:'#C03028',ap:'#F8D030',pal:{p:'#E94934',s:'#EDB832',a:'#DB7431',h:'#FECE6F',b:'#1D0906'},sh:{p:'#D5C34E',s:'#F5CF61',a:'#DA5C2E',h:'#FDF189',b:'#1C1807'}},
    {k:'393',n:'Piplup',hp:'#6890F0',ap:'#A8A878',pal:{p:'#2A69BB',s:'#E8E6D5',a:'#D3C663',h:'#BED9F1',b:'#060F1A'},sh:{p:'#4E3291',s:'#E6E4D4',a:'#A198DE',h:'#CAD2EE',b:'#080C16'}},
    {k:'394',n:'Prinplup',hp:'#6890F0',ap:'#A8A878',pal:{p:'#2F79BA',s:'#E4E1D1',a:'#CCBE63',h:'#C0DDF1',b:'#06101A'},sh:{p:'#4B399A',s:'#E2DFD0',a:'#B798D7',h:'#CED7F1',b:'#090C17'}},
    {k:'395',n:'Empoleon',hp:'#6890F0',ap:'#F8D030',pal:{p:'#2E75B7',s:'#F3E9C5',a:'#E0C352',h:'#C8E0E9',b:'#06101A'},sh:{p:'#4B3898',s:'#F1E7C3',a:'#AFB5CF',h:'#D7DBE9',b:'#080C17'}},
    {k:'396',n:'Starly',hp:'#A8A878',ap:'#F8D030',pal:{p:'#7B89A7',s:'#ECD78D',a:'#BF6433',h:'#E7E7D5',b:'#0F1319'},sh:{p:'#C5C6C2',s:'#EFE6BE',a:'#CBBD58',h:'#FEF6D6',b:'#141618'}},
    {k:'397',n:'Staravia',hp:'#A8A878',ap:'#C03028',pal:{p:'#8495AF',s:'#DEAC8A',a:'#AD4831',h:'#E4D4D6',b:'#0F1419'},sh:{p:'#C1C2BD',s:'#E4C6BD',a:'#C17B47',h:'#F5E2D3',b:'#141618'}},
    {k:'398',n:'Staraptor',hp:'#A8A878',ap:'#C03028',pal:{p:'#8092A8',s:'#DCA98C',a:'#BF6261',h:'#DECECF',b:'#0F1419'},sh:{p:'#C8C8C3',s:'#E2C4BC',a:'#C2834A',h:'#F8E4D5',b:'#151618'}},
    {k:'399',n:'Bidoof',hp:'#A8A878',ap:'#E8C068',pal:{p:'#A3905E',s:'#DDC28F',a:'#875E3A',h:'#EDDAAC',b:'#16110B'},sh:{p:'#A9BC5E',s:'#DCC58A',a:'#559535',h:'#F8E8B3',b:'#17120B'}},
    {k:'400',n:'Bibarel',hp:'#A8A878',ap:'#E8C068',pal:{p:'#B89C68',s:'#E0C890',a:'#8E6A40',h:'#F2DCAF',b:'#17120B'},sh:{p:'#C6D466',s:'#DFCB8B',a:'#529B3C',h:'#FDEBB5',b:'#18120B'}},
    {k:'401',n:'Kricketot',hp:'#C03028',ap:'#E8C068',pal:{p:'#96963C',s:'#D5C65D',a:'#856689',h:'#EDE38A',b:'#151507'},sh:{p:'#B7CE50',s:'#E3DE71',a:'#C56C70',h:'#F3F699',b:'#181B09'}},
    {k:'402',n:'Kricketune',hp:'#C03028',ap:'#A8A878',pal:{p:'#937C37',s:'#C1BC5B',a:'#7D668F',h:'#E8D98F',b:'#151407'},sh:{p:'#ADCB4B',s:'#D7D975',a:'#B9646E',h:'#EDF69F',b:'#181B08'}},
    {k:'403',n:'Shinx',hp:'#6890F0',ap:'#F8D030',pal:{p:'#223F8B',s:'#F6C83B',a:'#706F56',h:'#8EB6E6',b:'#040915'},sh:{p:'#D8C23B',s:'#61696D',a:'#797663',h:'#FDE97F',b:'#1A1706'}},
    {k:'404',n:'Luxio',hp:'#6890F0',ap:'#F8D030',pal:{p:'#274794',s:'#F6BC31',a:'#706B55',h:'#90BAE9',b:'#040915'},sh:{p:'#D6BE3E',s:'#626B6D',a:'#797662',h:'#FDE880',b:'#1A1606'}},
    {k:'405',n:'Luxray',hp:'#705898',ap:'#F8D030',pal:{p:'#1D538A',s:'#EED33A',a:'#726F57',h:'#8ABEE5',b:'#040915'},sh:{p:'#D79A34',s:'#5F6069',a:'#7A7765',h:'#FDDE7C',b:'#1A1506'}},
    {k:'406',n:'Budew',hp:'#78C850',ap:'#A040A0',pal:{p:'#5AA854',s:'#D29FB0',a:'#C56E8A',h:'#E9CFD3',b:'#0A1809'},sh:{p:'#CAD155',s:'#CBC586',a:'#C16193',h:'#F0E49D',b:'#1B1C09'}},
    {k:'407',n:'Roserade',hp:'#78C850',ap:'#6890F0',pal:{p:'#6BA95A',s:'#CD8EB3',a:'#9F6FAC',h:'#E1DCDB',b:'#0B180A'},sh:{p:'#70C95B',s:'#C9B6AD',a:'#C47A5A',h:'#DFE6A6',b:'#161A09'}},
    {k:'408',n:'Cranidos',hp:'#6890F0',ap:'#A8A878',pal:{p:'#707673',s:'#B7AE8C',a:'#738A89',h:'#D2CDAE',b:'#10110F'},sh:{p:'#6EA0B4',s:'#D0DCD5',a:'#BCA06D',h:'#EEF3ED',b:'#0E1618'}},
    {k:'409',n:'Rampardos',hp:'#6890F0',ap:'#C03028',pal:{p:'#747974',s:'#B98D77',a:'#716971',h:'#D5BCA0',b:'#10110F'},sh:{p:'#73A9B5',s:'#D1C3C0',a:'#BF7F5A',h:'#F1E7DF',b:'#0E1618'}},
    {k:'410',n:'Shieldon',hp:'#B8B8D0',ap:'#78C850',pal:{p:'#8C7C6A',s:'#ACB17A',a:'#639D92',h:'#D2D0A6',b:'#13100D'},sh:{p:'#8C9EAF',s:'#C8E3C9',a:'#B9BD55',h:'#EFF9E6',b:'#121517'}},
    {k:'411',n:'Bastiodon',hp:'#B8B8D0',ap:'#F8D030',pal:{p:'#908171',s:'#CEB074',a:'#718F82',h:'#E2D0A3',b:'#13100D'},sh:{p:'#92A3B4',s:'#E4E4C2',a:'#D0B958',h:'#FEFAE1',b:'#121518'}},
    {k:'412',n:'Burmy',hp:'#E8C068',ap:'#78C850',pal:{p:'#A6AB4A',s:'#BCCC57',a:'#837B87',h:'#E3E98F',b:'#161908'},sh:{p:'#86CE49',s:'#CCDC6D',a:'#A6AB7D',h:'#E7F296',b:'#181B09'}},
    {k:'413',n:'Wormadam',hp:'#78C850',ap:'#E8C068',pal:{p:'#82A240',s:'#CCC95E',a:'#9A7F90',h:'#E8EA8F',b:'#111A08'},sh:{p:'#53D945',s:'#E8E373',a:'#C3C977',h:'#EDF79B',b:'#171D08'}},
    {k:'414',n:'Mothim',hp:'#F08030',ap:'#E8C068',pal:{p:'#A6903B',s:'#D2C457',a:'#A46F8E',h:'#F1E38B',b:'#171607'},sh:{p:'#C8C24A',s:'#DFD671',a:'#BA6F81',h:'#F4F096',b:'#191B07'}},
    {k:'415',n:'Combee',hp:'#F8D030',ap:'#E8C068',pal:{p:'#AEB243',s:'#D2C661',a:'#8B6C89',h:'#EEE78E',b:'#171A07'},sh:{p:'#94DE49',s:'#DCD06A',a:'#C6C37B',h:'#FBF79A',b:'#1A1B08'}},
    {k:'416',n:'Vespiquen',hp:'#F8D030',ap:'#E8C068',pal:{p:'#9DA93B',s:'#D7CA66',a:'#846A89',h:'#EBE68C',b:'#171907'},sh:{p:'#7FD342',s:'#E1D26F',a:'#C6BA7B',h:'#F4F399',b:'#191B07'}},
    {k:'417',n:'Pachirisu',hp:'#6890F0',ap:'#F8D030',pal:{p:'#4374C4',s:'#C0D29F',a:'#BE9740',h:'#DDE9CB',b:'#08141E'},sh:{p:'#60BED9',s:'#E1E1A9',a:'#989AB1',h:'#E5F2CD',b:'#09191C'}},
    {k:'418',n:'Buizel',hp:'#F08030',ap:'#A8A878',pal:{p:'#CC4429',s:'#C9A558',a:'#A55E44',h:'#F2CD90',b:'#1C0905'},sh:{p:'#C6B241',s:'#D4B768',a:'#847B68',h:'#F6ED9D',b:'#1C1706'}},
    {k:'419',n:'Floatzel',hp:'#F08030',ap:'#F8D030',pal:{p:'#E36E31',s:'#F1BB40',a:'#B1672B',h:'#FEDD7D',b:'#1D0B06'},sh:{p:'#CEA945',s:'#EBC557',a:'#6D7F63',h:'#FBEA86',b:'#1C1706'}},
    {k:'420',n:'Cherubi',hp:'#F4BDC9',ap:'#78C850',pal:{p:'#8BB17E',s:'#D5C1B5',a:'#B38778',h:'#F1E1D5',b:'#10160E'},sh:{p:'#9FD583',s:'#D7E08D',a:'#BCB07A',h:'#E4EDA0',b:'#181B0F'}},
    {k:'421',n:'Cherrim',hp:'#F4BDC9',ap:'#F8D030',pal:{p:'#81A172',s:'#F3C4AA',a:'#C47E7D',h:'#FADBCB',b:'#10150D'},sh:{p:'#C7CB7F',s:'#EDDE80',a:'#D17C88',h:'#F7ED9C',b:'#181B0F'}},
    {k:'422',n:'Shellos',hp:'#F4BDC9',ap:'#6890F0',pal:{p:'#8396CE',s:'#C1D2F0',a:'#8E88CC',h:'#D9E9FD',b:'#0F141C'},sh:{p:'#CD88E2',s:'#CDD7FB',a:'#C570E3',h:'#DFE2FB',b:'#110F1D'}},
    {k:'423',n:'Gastrodon',hp:'#6890F0',ap:'#E8C068',pal:{p:'#4D8BCD',s:'#B3C2AB',a:'#BC9C4B',h:'#DEE4D6',b:'#08151E'},sh:{p:'#6AD4E2',s:'#D4D5B3',a:'#977780',h:'#E5F2D9',b:'#0A1A1C'}},
    {k:'424',n:'Ambipom',hp:'#A040A0',ap:'#F4BDC9',pal:{p:'#723A8E',s:'#CF82BC',a:'#93C2A8',h:'#E6BBF4',b:'#100815'},sh:{p:'#3C9480',s:'#A4CECC',a:'#DE73A0',h:'#D5F8F1',b:'#081712'}},
    {k:'425',n:'Drifloon',hp:'#A040A0',ap:'#F8D030',pal:{p:'#6F3E95',s:'#CE8E7A',a:'#92A14C',h:'#E2BECB',b:'#0F0815'},sh:{p:'#409B97',s:'#B4D28C',a:'#BA939D',h:'#D9F6C2',b:'#081713'}},
    {k:'426',n:'Drifblim',hp:'#705898',ap:'#F8D030',pal:{p:'#5D4587',s:'#AC887B',a:'#AD716A',h:'#DDC2CE',b:'#09060E'},sh:{p:'#534281',s:'#9B906E',a:'#76C184',h:'#D6D8D0',b:'#06090E'}},
    {k:'427',n:'Buneary',hp:'#E8C068',ap:'#F4BDC9',pal:{p:'#C38F50',s:'#E9BA90',a:'#908B8F',h:'#F9D4B3',b:'#1B1208'},sh:{p:'#9BB33E',s:'#CFC69A',a:'#B9B274',h:'#E9DDB4',b:'#181507'}},
    {k:'428',n:'Lopunny',hp:'#E8C068',ap:'#F4BDC9',pal:{p:'#CA9657',s:'#EAC195',a:'#979297',h:'#F7D2B0',b:'#1B1208'},sh:{p:'#B1C94B',s:'#CFC89B',a:'#BABE7C',h:'#EFE4B8',b:'#191608'}},
    {k:'429',n:'Mismagius',hp:'#705898',ap:'#A040A0',pal:{p:'#5A3579',s:'#8F5ABE',a:'#BB5BB2',h:'#D5ACF4',b:'#09060E'},sh:{p:'#A7A8B1',s:'#BEB2C4',a:'#A25DB0',h:'#E5E2F5',b:'#121212'}},
    {k:'430',n:'Honchkrow',hp:'#705898',ap:'#C03028',pal:{p:'#413077',s:'#99497C',a:'#9C466C',h:'#D4A1C9',b:'#08060E'},sh:{p:'#492A6E',s:'#93767B',a:'#77C436',h:'#CFC5CF',b:'#05070D'}},
    {k:'431',n:'Glameow',hp:'#A8A878',ap:'#F4BDC9',pal:{p:'#A7714B',s:'#E4C8AA',a:'#CCA572',h:'#F2D7B9',b:'#160E08'},sh:{p:'#D8AE6C',s:'#E9D4AE',a:'#9595BF',h:'#FEECCF',b:'#1A150A'}},
    {k:'432',n:'Purugly',hp:'#A8A878',ap:'#F4BDC9',pal:{p:'#A07347',s:'#E4C4AB',a:'#C79D6C',h:'#F1D8B9',b:'#160E08'},sh:{p:'#D0AF68',s:'#E9D2AE',a:'#9092B9',h:'#FCECCF',b:'#1A150A'}},
    {k:'433',n:'Chingling',hp:'#F8D030',ap:'#F4BDC9',pal:{p:'#E9C63F',s:'#F3C9A7',a:'#83848A',h:'#FEE7AE',b:'#1D1806'},sh:{p:'#BAE835',s:'#E0C89A',a:'#CA96A4',h:'#F8F0B6',b:'#1D1706'}},
    {k:'434',n:'Stunky',hp:'#A040A0',ap:'#F8D030',pal:{p:'#844E9B',s:'#D49489',a:'#84923F',h:'#E3C0CA',b:'#110816'},sh:{p:'#51A191',s:'#BACE89',a:'#AD898D',h:'#DDF6C4',b:'#091713'}},
    {k:'435',n:'Skuntank',hp:'#705898',ap:'#F8D030',pal:{p:'#4B3377',s:'#AF8984',a:'#AE7064',h:'#E0C5D1',b:'#08060E'},sh:{p:'#3A2966',s:'#9E9272',a:'#73BF7A',h:'#D2D3CC',b:'#05080D'}},
    {k:'436',n:'Bronzor',hp:'#B8B8D0',ap:'#78C850',pal:{p:'#ADB3BB',s:'#A6CA9E',a:'#8FB78A',h:'#E0F4D7',b:'#121519'},sh:{p:'#CDC9D2',s:'#C3D7A6',a:'#56C073',h:'#EAF5D2',b:'#161619'}},
    {k:'437',n:'Bronzong',hp:'#B8B8D0',ap:'#F8D030',pal:{p:'#B6BCC4',s:'#D6C989',a:'#7C8670',h:'#F8F2D0',b:'#131619'},sh:{p:'#D6D0D8',s:'#E2D298',a:'#73C17B',h:'#FCF6CB',b:'#16161A'}},
    {k:'438',n:'Bonsly',hp:'#B8A038',ap:'#78C850',pal:{p:'#967243',s:'#9CAA53',a:'#C1C752',h:'#D2D386',b:'#151007'},sh:{p:'#699B4C',s:'#ADC35D',a:'#53BC6E',h:'#DFEC91',b:'#131508'}},
    {k:'439',n:'Mime-Jr',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#4989CA',s:'#BEC8DB',a:'#C9C5A5',h:'#E0E6F4',b:'#08151E'},sh:{p:'#66D4E0',s:'#D4E4EE',a:'#C57CC1',h:'#DDF4F9',b:'#0A1A1C'}},
    {k:'440',n:'Happiny',hp:'#F4BDC9',ap:'#F8D030',pal:{p:'#EAAFCA',s:'#F4DDBB',a:'#C3817C',h:'#FEDED1',b:'#1E1016'},sh:{p:'#D0E0EF',s:'#F3F0CC',a:'#D07979',h:'#FAFAE4',b:'#101A1E'}},
    {k:'441',n:'Chatot',hp:'#6890F0',ap:'#F8D030',pal:{p:'#447BCA',s:'#BAD098',a:'#B9A73B',h:'#E4F0D2',b:'#08141E'},sh:{p:'#5BBBD0',s:'#E2E0A8',a:'#9499AB',h:'#E5F2CC',b:'#09191B'}},
    {k:'442',n:'Spiritomb',hp:'#705898',ap:'#78C850',pal:{p:'#543170',s:'#8C77A3',a:'#C47A9A',h:'#D0BEE5',b:'#08060D'},sh:{p:'#AAAAAE',s:'#BDC9B0',a:'#978B9E',h:'#E5F2E9',b:'#121212'}},
    {k:'443',n:'Gible',hp:'#6890F0',ap:'#C03028',pal:{p:'#3358AB',s:'#909B67',a:'#CD8439',h:'#B4B4DE',b:'#060E1A'},sh:{p:'#539A84',s:'#C5BB73',a:'#BD4340',h:'#DAE0AA',b:'#091710'}},
    {k:'444',n:'Gabite',hp:'#6890F0',ap:'#C03028',pal:{p:'#3161B3',s:'#8A9B66',a:'#D4933E',h:'#B4B5E0',b:'#060E1A'},sh:{p:'#53A285',s:'#BDBB73',a:'#C34E45',h:'#DDE2AB',b:'#091810'}},
    {k:'445',n:'Garchomp',hp:'#003399',ap:'#F8D030',pal:{p:'#3169A5',s:'#A59E47',a:'#EDD148',h:'#A8C0E9',b:'#050C17'},sh:{p:'#467062',s:'#CBB25A',a:'#DC7535',h:'#CDD9A7',b:'#08120D'}},
    {k:'446',n:'Munchlax',hp:'#6890F0',ap:'#F8D030',pal:{p:'#3C88BB',s:'#B5C792',a:'#B99C3F',h:'#E1ECCD',b:'#08151D'},sh:{p:'#59CFCD',s:'#D7D59E',a:'#9790AB',h:'#EBF6D0',b:'#091A1B'}},
    {k:'447',n:'Riolu',hp:'#6890F0',ap:'#C03028',pal:{p:'#3F83CD',s:'#A58C97',a:'#A97A3C',h:'#DECFCC',b:'#08141E'},sh:{p:'#56C5D3',s:'#CCBBA9',a:'#97527D',h:'#DEDFCA',b:'#09191B'}},
    {k:'448',n:'Lucario',hp:'#003399',ap:'#C03028',pal:{p:'#2056A7',s:'#382125',a:'#D19A4B',h:'#9AB2E8',b:'#040A16'},sh:{p:'#DDBF49',s:'#452B32',a:'#7580AC',h:'#F8DE87',b:'#1D1807'}},
    {k:'449',n:'Hippopotas',hp:'#E8C068',ap:'#B8A038',pal:{p:'#C48850',s:'#D4B25C',a:'#8A6B36',h:'#EAC88B',b:'#1B1208'},sh:{p:'#8DC145',s:'#CFC05F',a:'#358F2D',h:'#EDE28F',b:'#191607'}},
    {k:'450',n:'Hippowdon',hp:'#E8C068',ap:'#B8A038',pal:{p:'#CF9055',s:'#D5B459',a:'#8B753A',h:'#EFCB8D',b:'#1B1208'},sh:{p:'#8BBE44',s:'#D0C463',a:'#41912F',h:'#E9DE8B',b:'#181607'}},
    {k:'451',n:'Skorupi',hp:'#A040A0',ap:'#78C850',pal:{p:'#703885',s:'#918287',a:'#9CC255',h:'#CEC2D2',b:'#100714'},sh:{p:'#3A8A7D',s:'#8BCB8A',a:'#998A73',h:'#CCF8CA',b:'#081612'}},
    {k:'452',n:'Drapion',hp:'#A040A0',ap:'#6890F0',pal:{p:'#703991',s:'#8F70C5',a:'#A6C289',h:'#C7B8FA',b:'#100815'},sh:{p:'#3B977C',s:'#76C1D5',a:'#A972CB',h:'#C4F3F1',b:'#081712'}},
    {k:'453',n:'Croagunk',hp:'#6890F0',ap:'#A040A0',pal:{p:'#498BCF',s:'#90B2D5',a:'#C0705B',h:'#CED9F5',b:'#08151E'},sh:{p:'#385F6C',s:'#B8BFD7',a:'#BD4E77',h:'#BFC9E4',b:'#070C0F'}},
    {k:'454',n:'Toxicroak',hp:'#6890F0',ap:'#C03028',pal:{p:'#3A8CBF',s:'#99A3B2',a:'#C54A39',h:'#D1D6DD',b:'#08151E'},sh:{p:'#325268',s:'#CBBDBF',a:'#C04243',h:'#C8C6D4',b:'#060C0E'}},
    {k:'455',n:'Carnivine',hp:'#78C850',ap:'#F8D030',pal:{p:'#66AF51',s:'#CDCE50',a:'#B7A83C',h:'#ECFA93',b:'#0A1809'},sh:{p:'#B5C448',s:'#DAD35C',a:'#8DB378',h:'#F7F490',b:'#171C09'}},
    {k:'456',n:'Finneon',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#3E73C4',s:'#ABD2E6',a:'#E9B979',h:'#D3E6F6',b:'#08141E'},sh:{p:'#59BAD9',s:'#DDECF5',a:'#A67BD1',h:'#DDF3F9',b:'#09191C'}},
    {k:'457',n:'Lumineon',hp:'#6890F0',ap:'#F8D030',pal:{p:'#3B73B9',s:'#BACB96',a:'#BA973B',h:'#DFEBCC',b:'#08141D'},sh:{p:'#58BCCD',s:'#DCDBA2',a:'#9491AC',h:'#E8F4CF',b:'#09191B'}},
    {k:'458',n:'Mantyke',hp:'#6890F0',ap:'#78C850',pal:{p:'#449BCE',s:'#7BC2A2',a:'#CFD95B',h:'#CEF3D7',b:'#08161E'},sh:{p:'#5671DC',s:'#BFE6B4',a:'#808AA2',h:'#D4F3D4',b:'#09181C'}},
    {k:'459',n:'Snover',hp:'#78C850',ap:'#A8A878',pal:{p:'#6CAD61',s:'#B3B66A',a:'#A48748',h:'#D8ECA4',b:'#0B180A'},sh:{p:'#B8CE5F',s:'#C1B96F',a:'#798650',h:'#EEF3A9',b:'#171D0A'}},
    {k:'460',n:'Abomasnow',hp:'#6890F0',ap:'#78C850',pal:{p:'#73C7DA',s:'#C9E5D2',a:'#7FBDA9',h:'#D9F5E8',b:'#0A191F'},sh:{p:'#B4D9E9',s:'#DEF5DD',a:'#7AA7B4',h:'#F0F8EC',b:'#0E1A1E'}},
    {k:'461',n:'Weavile',hp:'#708090',ap:'#C03028',pal:{p:'#293341',s:'#834586',a:'#C03639',h:'#C8C4D3',b:'#06080D'},sh:{p:'#C76D9E',s:'#EB9CBA',a:'#CE4136',h:'#F8C3D4',b:'#1B0B17'}},
    {k:'462',n:'Magnezone',hp:'#B8B8D0',ap:'#F8D030',pal:{p:'#DCCA66',s:'#D7C77C',a:'#9A7F28',h:'#FDF2A5',b:'#1B180D'},sh:{p:'#B0D65F',s:'#CDB561',a:'#9885BB',h:'#FAF0A8',b:'#1A170D'}},
    {k:'463',n:'Lickilicky',hp:'#F4BDC9',ap:'#78C850',pal:{p:'#E9ACC5',s:'#B4CBA4',a:'#A0CA95',h:'#E7E3C5',b:'#1D1016'},sh:{p:'#B5DDE7',s:'#BCDFAC',a:'#A3937A',h:'#D8F6D5',b:'#0E1A1E'}},
    {k:'464',n:'Rhyperior',hp:'#F08030',ap:'#B8A038',pal:{p:'#EE803E',s:'#D2A547',a:'#D39644',h:'#F3D27B',b:'#1D0C06'},sh:{p:'#D7BA51',s:'#CEBD61',a:'#8A7B43',h:'#F1E889',b:'#1C1807'}},
    {k:'465',n:'Tangrowth',hp:'#6890F0',ap:'#78C850',pal:{p:'#397FBD',s:'#79BFA0',a:'#CCD653',h:'#CEF3D8',b:'#08141E'},sh:{p:'#4A7DCB',s:'#B3D9A9',a:'#7E879F',h:'#D4F3D2',b:'#09191B'}},
    {k:'466',n:'Electivire',hp:'#F8D030',ap:'#C03028',pal:{p:'#E5C438',s:'#E7B573',a:'#866153',h:'#F7D885',b:'#1D1806'},sh:{p:'#B2E42F',s:'#E3B05A',a:'#A77FA6',h:'#F8DB86',b:'#1C1706'}},
    {k:'467',n:'Magmortar',hp:'#F08030',ap:'#F8D030',pal:{p:'#E0713C',s:'#F1C84D',a:'#AB5629',h:'#FBD87A',b:'#1D0B06'},sh:{p:'#DBB554',s:'#EBCD58',a:'#6C7962',h:'#FEED86',b:'#1C1807'}},
    {k:'468',n:'Togekiss',hp:'#F8D030',ap:'#6890F0',pal:{p:'#F8F9F2',s:'#C65C68',a:'#609EE0',h:'#EFF3FD',b:'#17191B'},sh:{p:'#F8FFED',s:'#5D9EDD',a:'#C7C969',h:'#EFF3FD',b:'#191916'}},
    {k:'469',n:'Yanmega',hp:'#78C850',ap:'#C03028',pal:{p:'#89AA45',s:'#C3AA4F',a:'#92597F',h:'#E8DC89',b:'#121A08'},sh:{p:'#AADB51',s:'#E2CA67',a:'#BA5362',h:'#E9E995',b:'#171D09'}},
    {k:'470',n:'Leafeon',hp:'#78C850',ap:'#E8C068',pal:{p:'#5BAF5C',s:'#D2D87B',a:'#CC7849',h:'#D8F8AD',b:'#0A180A'},sh:{p:'#CFC658',s:'#F2E08F',a:'#94AD5B',h:'#F8EB91',b:'#1B1B08'}},
    {k:'471',n:'Glaceon',hp:'#6890F0',ap:'#A8A878',pal:{p:'#7ED5E8',s:'#D9E5E2',a:'#6FA0C2',h:'#DFF6F1',b:'#0B1A20'},sh:{p:'#C6E4F7',s:'#E8EDE7',a:'#7D91C2',h:'#F3F6F1',b:'#0F1B1F'}},
    {k:'472',n:'Gliscor',hp:'#A040A0',ap:'#F08030',pal:{p:'#83449D',s:'#D16777',a:'#B9924E',h:'#E7B1C9',b:'#110816'},sh:{p:'#46A393',s:'#AEBF8B',a:'#AA5A5E',h:'#DEF2C5',b:'#081813'}},
    {k:'473',n:'Mamoswine',hp:'#6890F0',ap:'#A8A878',pal:{p:'#866F64',s:'#BCB691',a:'#C6854F',h:'#E8D7BC',b:'#110F0D'},sh:{p:'#96B3A9',s:'#CCCAB3',a:'#BB6A66',h:'#EDF3EB',b:'#121715'}},
    {k:'474',n:'Porygon-Z',hp:'#6890F0',ap:'#F8D030',pal:{p:'#F1A1C9',s:'#88B0B6',a:'#C179A0',h:'#FDD3D0',b:'#1A0E17'},sh:{p:'#80BDEB',s:'#F5BFC0',a:'#E8CC4B',h:'#DEF0E9',b:'#0C1920'}},
    {k:'475',n:'Gallade',hp:'#78C850',ap:'#C03028',pal:{p:'#F3F4EC',s:'#71915A',a:'#CE4839',h:'#EEE9DC',b:'#111A11'},sh:{p:'#FFFFFB',s:'#6C94B5',a:'#CCD83B',h:'#F1E6E9',b:'#12191F'}},
    {k:'476',n:'Probopass',hp:'#B8A038',ap:'#C03028',pal:{p:'#958142',s:'#C1844F',a:'#C38A43',h:'#D9B878',b:'#151107'},sh:{p:'#60A551',s:'#C0AA5A',a:'#6AD13C',h:'#E7DF8D',b:'#131608'}},
    {k:'477',n:'Dusknoir',hp:'#705898',ap:'#C03028',pal:{p:'#453072',s:'#985294',a:'#CB5286',h:'#D8ACE3',b:'#07060D'},sh:{p:'#A1A0A4',s:'#CBADAA',a:'#A05F92',h:'#E9DCDE',b:'#121211'}},
    {k:'478',n:'Froslass',hp:'#6890F0',ap:'#A040A0',pal:{p:'#4A83CD',s:'#9390CA',a:'#ADA76C',h:'#CECBF5',b:'#08141E'},sh:{p:'#67CDE2',s:'#A7BCD0',a:'#AF58B5',h:'#D3EBF5',b:'#0A1A1C'}},
    {k:'479',n:'Rotom',hp:'#F8D030',ap:'#A8A878',pal:{p:'#F8AA32',s:'#D3E1DF',a:'#6C97BF',h:'#F6CE82',b:'#1E1106'},sh:{p:'#D5583B',s:'#E0E6E4',a:'#DDB651',h:'#F4A48F',b:'#1C0807'}},
    {k:'480',n:'Uxie',hp:'#F8D030',ap:'#A8A878',pal:{p:'#E37D7C',s:'#C296BC',a:'#C0AE56',h:'#F6C8C4',b:'#1D0F11'},sh:{p:'#8EBF59',s:'#D0D8A8',a:'#B67798',h:'#DDEFB9',b:'#101909'}},
    {k:'481',n:'Mesprit',hp:'#F4BDC9',ap:'#C03028',pal:{p:'#E174A9',s:'#C776B5',a:'#C5945A',h:'#F8B3C7',b:'#1D0C16'},sh:{p:'#8CD48F',s:'#CEC4AA',a:'#CD4F6B',h:'#DDE9C6',b:'#0C1A10'}},
    {k:'482',n:'Azelf',hp:'#6890F0',ap:'#C03028',pal:{p:'#AB65A4',s:'#B876B8',a:'#D59D46',h:'#F1B8CD',b:'#160D18'},sh:{p:'#65BF82',s:'#D0C8AF',a:'#C4518C',h:'#D6E4C0',b:'#0A1910'}},
    {k:'483',n:'Dialga',hp:'#B8B8D0',ap:'#6890F0',pal:{p:'#356AA9',s:'#A8BEDA',a:'#96CDEB',h:'#9CBBFD',b:'#070D18'},sh:{p:'#4F9376',s:'#B3C7D1',a:'#B8BD80',h:'#B7EAE4',b:'#091712'}},
    {k:'484',n:'Palkia',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#F0C9DF',s:'#9561BE',a:'#C8A06E',h:'#F5D2EA',b:'#1C1119'},sh:{p:'#F8CBEC',s:'#8282C4',a:'#7AD261',h:'#EACAF5',b:'#17121D'}},
    {k:'485',n:'Heatran',hp:'#F08030',ap:'#B8A038',pal:{p:'#DB5B2F',s:'#E3B04B',a:'#D04D34',h:'#F3CA77',b:'#1C0905'},sh:{p:'#D5A947',s:'#E0C260',a:'#7A7560',h:'#F7E588',b:'#1C1707'}},
    {k:'486',n:'Regigigas',hp:'#B8B8D0',ap:'#F8D030',pal:{p:'#AEB5BE',s:'#E2D694',a:'#849178',h:'#F6F1CF',b:'#121519'},sh:{p:'#D2D3DA',s:'#E4D59B',a:'#B8BF80',h:'#FEF6CE',b:'#17171A'}},
    {k:'487',n:'Giratina',hp:'#705898',ap:'#F8D030',pal:{p:'#A48F3A',s:'#F0D46E',a:'#E07133',h:'#FEF287',b:'#151207'},sh:{p:'#BEBC7D',s:'#EED77E',a:'#81B1AC',h:'#F5EFAF',b:'#18180E'}},
    {k:'488',n:'Cresselia',hp:'#6890F0',ap:'#F8D030',pal:{p:'#A264A5',s:'#C09EB6',a:'#E2B24E',h:'#F2C8CC',b:'#160D18'},sh:{p:'#6CC77F',s:'#DAE3AC',a:'#CA8391',h:'#E2F8C4',b:'#0B1910'}},
    {k:'489',n:'Phione',hp:'#6890F0',ap:'#A8A878',pal:{p:'#4E8FCF',s:'#A3BDB5',a:'#AC994F',h:'#D8E7E3',b:'#08151E'},sh:{p:'#5E8CDB',s:'#CCD2BF',a:'#8B7171',h:'#DAEBE0',b:'#0A191B'}},
    {k:'490',n:'Manaphy',hp:'#6890F0',ap:'#A040A0',pal:{p:'#3871B6',s:'#8E90C5',a:'#BDAA6E',h:'#CCC9F2',b:'#07141D'},sh:{p:'#55B9CA',s:'#A3BACC',a:'#A65AB8',h:'#D0E7F1',b:'#09191B'}},
    {k:'491',n:'Darkrai',hp:'#705898',ap:'#C03028',pal:{p:'#1E1F2E',s:'#7B3E7F',a:'#D5518D',h:'#BF9FE6',b:'#040407'},sh:{p:'#3E3344',s:'#856382',a:'#70DF40',h:'#E4D0E9',b:'#060609'}},
    {k:'492',n:'Shaymin',hp:'#78C850',ap:'#F4BDC9',pal:{p:'#F1F6E6',s:'#84BB70',a:'#E4729D',h:'#F7F7E5',b:'#161B11'},sh:{p:'#D9FFE4',s:'#95C779',a:'#EFD66D',h:'#EAF8DF',b:'#101B10'}},
    {k:'493',n:'Arceus',hp:'#F8D030',ap:'#A8A878',pal:{p:'#F0ECDF',s:'#CDAF5F',a:'#82827C',h:'#F5F5F0',b:'#181815'},sh:{p:'#EEDCF5',s:'#AB9DC3',a:'#5FD05E',h:'#E8E3F1',b:'#17141B'}},
    {k:'494',n:'Victini',hp:'#F08030',ap:'#F8D030',pal:{p:'#DF7737',s:'#F3C04A',a:'#B25C2E',h:'#FBDB7B',b:'#1D0B06'},sh:{p:'#DABB4F',s:'#EDC557',a:'#717F67',h:'#FEEF88',b:'#1C1807'}},
    {k:'495',n:'Snivy',hp:'#78C850',ap:'#F8D030',pal:{p:'#5C8B4A',s:'#DFC971',a:'#AD8678',h:'#DAE58F',b:'#0B1609'},sh:{p:'#A6C160',s:'#F4E886',a:'#82AFAE',h:'#F1F19B',b:'#161A09'}},
    {k:'496',n:'Servine',hp:'#78C850',ap:'#F8D030',pal:{p:'#61934D',s:'#DFCC6C',a:'#AF8773',h:'#E0EC92',b:'#0B1709'},sh:{p:'#A2BE5C',s:'#F4EC88',a:'#83B8B1',h:'#EEEF99',b:'#161A09'}},
    {k:'497',n:'Serperior',hp:'#78C850',ap:'#F8D030',pal:{p:'#608F4D',s:'#DFC56E',a:'#AB8574',h:'#DDE891',b:'#0B1609'},sh:{p:'#ABC664',s:'#F4E484',a:'#81A2AC',h:'#F3F49E',b:'#161B0A'}},
    {k:'498',n:'Tepig',hp:'#F08030',ap:'#C03028',pal:{p:'#E96628',s:'#EBB54F',a:'#76534C',h:'#F8C484',b:'#1D0A05'},sh:{p:'#D2AF3A',s:'#E9C161',a:'#76504C',h:'#F5DB82',b:'#1B1606'}},
    {k:'499',n:'Pignite',hp:'#F08030',ap:'#C03028',pal:{p:'#EC6D34',s:'#EA9E4E',a:'#75534B',h:'#F8C588',b:'#1D0B06'},sh:{p:'#D5B145',s:'#E8AD60',a:'#75504B',h:'#F7DC87',b:'#1C1706'}},
    {k:'500',n:'Emboar',hp:'#C03028',ap:'#F08030',pal:{p:'#E14F33',s:'#EDA953',a:'#7E5F4D',h:'#FCC688',b:'#1D0906'},sh:{p:'#DB9E47',s:'#EBB45C',a:'#7E614D',h:'#FDDF89',b:'#1C1607'}},
    {k:'501',n:'Oshawott',hp:'#6890F0',ap:'#A8A878',pal:{p:'#489BC3',s:'#E1E1D0',a:'#D3B668',h:'#CAE2EE',b:'#08151E'},sh:{p:'#7266C8',s:'#E6E8E5',a:'#D2BE60',h:'#D6D3F1',b:'#0D0B1C'}},
    {k:'502',n:'Dewott',hp:'#6890F0',ap:'#A8A878',pal:{p:'#4C82CB',s:'#EAEAD8',a:'#D2C360',h:'#CDE0F1',b:'#08141E'},sh:{p:'#A25EC9',s:'#E6E6E3',a:'#79DC5A',h:'#D2CFED',b:'#0D0B1B'}},
    {k:'503',n:'Samurott',hp:'#6890F0',ap:'#A8A878',pal:{p:'#519ECF',s:'#E4E2D1',a:'#CDC963',h:'#CEE3F1',b:'#09151E'},sh:{p:'#9163CD',s:'#DFE1DD',a:'#70D75F',h:'#D2D2EF',b:'#0D0C1B'}},
    {k:'504',n:'Patrat',hp:'#A8A878',ap:'#E8C068',pal:{p:'#D3AB4A',s:'#EAD684',a:'#C77643',h:'#FDEA97',b:'#1B1507'},sh:{p:'#ADCA54',s:'#E9DA93',a:'#8B91AA',h:'#FAE8A3',b:'#191509'}},
    {k:'505',n:'Watchog',hp:'#A8A878',ap:'#F8D030',pal:{p:'#BFAB75',s:'#F0CF81',a:'#846C2E',h:'#F9EBAB',b:'#17120C'},sh:{p:'#B6CC6D',s:'#EECD84',a:'#6A986B',h:'#FBEDAC',b:'#18120C'}},
    {k:'506',n:'Lillipup',hp:'#E8C068',ap:'#C03028',pal:{p:'#915E3B',s:'#CF926E',a:'#B03533',h:'#EABA96',b:'#160D07'},sh:{p:'#727665',s:'#D4B4A7',a:'#6FC137',h:'#F5E4CC',b:'#0F0E0F'}},
    {k:'507',n:'Herdier',hp:'#708090',ap:'#A8A878',pal:{p:'#673F2C',s:'#B3A47D',a:'#C6624D',h:'#DCC6AE',b:'#100906'},sh:{p:'#4C4F60',s:'#B6B2B1',a:'#C8BC63',h:'#F1EFEC',b:'#09090F'}},
    {k:'508',n:'Stoutland',hp:'#A8A878',ap:'#E8C068',pal:{p:'#9B6C48',s:'#DBBC89',a:'#C46F46',h:'#F3D4AA',b:'#160E08'},sh:{p:'#7D7770',s:'#D9CDBA',a:'#77D152',h:'#F8EED9',b:'#0E0D10'}},
    {k:'509',n:'Purrloin',hp:'#A040A0',ap:'#F8D030',pal:{p:'#8E5252',s:'#D9B581',a:'#C7A440',h:'#EBCEAD',b:'#130B0B'},sh:{p:'#A1B16F',s:'#E2D88C',a:'#8E9FAA',h:'#F2F0BE',b:'#14170C'}},
    {k:'510',n:'Liepard',hp:'#A040A0',ap:'#F8D030',pal:{p:'#99645A',s:'#E2BB85',a:'#C8B83A',h:'#F2D7B1',b:'#140C0B'},sh:{p:'#A2B170',s:'#E0D98D',a:'#92A9AD',h:'#F1EDBB',b:'#14170C'}},
    {k:'511',n:'Pansage',hp:'#78C850',ap:'#E8C068',pal:{p:'#67AF5C',s:'#C7C56A',a:'#B49245',h:'#E0EC97',b:'#0B180A'},sh:{p:'#B6CF59',s:'#D4CE6C',a:'#838F4D',h:'#F3F399',b:'#171D0A'}},
    {k:'512',n:'Simisage',hp:'#78C850',ap:'#C03028',pal:{p:'#50A14A',s:'#B88D4F',a:'#9C6B2E',h:'#DFD88C',b:'#091709'},sh:{p:'#9EC248',s:'#CBB25A',a:'#826740',h:'#F1E992',b:'#161C09'}},
    {k:'513',n:'Pansear',hp:'#C03028',ap:'#F8D030',pal:{p:'#577CB7',s:'#AED1B2',a:'#D2B943',h:'#D7ECE9',b:'#0A121B'},sh:{p:'#668DC7',s:'#E0EAC3',a:'#A58388',h:'#DCF3E7',b:'#0B1919'}},
    {k:'514',n:'Simisear',hp:'#C03028',ap:'#A8A878',pal:{p:'#517BBA',s:'#9BC0C2',a:'#C9B957',h:'#CDE7F1',b:'#0A121B'},sh:{p:'#65BCC2',s:'#CFE1D4',a:'#8D75AB',h:'#D3EFEE',b:'#0B1919'}},
    {k:'515',n:'Panpour',hp:'#6890F0',ap:'#F8D030',pal:{p:'#417AC4',s:'#BACE97',a:'#BAA53B',h:'#E3EFD1',b:'#08141E'},sh:{p:'#5177D2',s:'#DFDDA5',a:'#AE99B5',h:'#E4F0CB',b:'#09181B'}},
    {k:'516',n:'Simipour',hp:'#6890F0',ap:'#A8A878',pal:{p:'#477BC9',s:'#A5BFB6',a:'#B39954',h:'#D6E3E1',b:'#08141E'},sh:{p:'#64C6DF',s:'#CFD4C1',a:'#91758C',h:'#E1F2E8',b:'#0A191C'}},
    {k:'517',n:'Munna',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#D873AC',s:'#AF79D0',a:'#BCA17D',h:'#F3B6E1',b:'#1C0C16'},sh:{p:'#8CCB89',s:'#BEC3C1',a:'#C45590',h:'#D5EBD9',b:'#0C1A10'}},
    {k:'518',n:'Musharna',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#D96E60',s:'#DEBEC5',a:'#739778',h:'#F0B0B6',b:'#1C0A0B'},sh:{p:'#B7D7E7',s:'#D5D2E6',a:'#CC559F',h:'#EBEAF5',b:'#0E1A1E'}},
    {k:'519',n:'Pidove',hp:'#708090',ap:'#A8A878',pal:{p:'#5D709F',s:'#C3AE91',a:'#B56A44',h:'#D4DAE6',b:'#091017'},sh:{p:'#9AA4B3',s:'#CBCBC7',a:'#BFA45A',h:'#EDECE8',b:'#101217'}},
    {k:'520',n:'Tranquill',hp:'#708090',ap:'#A8A878',pal:{p:'#557398',s:'#BCAD8A',a:'#BA6D4A',h:'#D3DAE5',b:'#091017'},sh:{p:'#94A2AC',s:'#C4C4BF',a:'#C5A761',h:'#ECEAE7',b:'#101217'}},
    {k:'521',n:'Unfezant',hp:'#78C850',ap:'#A8A878',pal:{p:'#6692A4',s:'#D3CE92',a:'#C07249',h:'#D9E8DA',b:'#0B1518'},sh:{p:'#C1D9BD',s:'#DCE0C6',a:'#BABB60',h:'#F4F6DB',b:'#141918'}},
    {k:'522',n:'Blitzle',hp:'#F8D030',ap:'#A8A878',pal:{p:'#ECD742',s:'#E5D086',a:'#857B62',h:'#F6ED94',b:'#1D1906'},sh:{p:'#A0D935',s:'#E1C372',a:'#7C70B5',h:'#F2E791',b:'#1C1806'}},
    {k:'523',n:'Zebstrika',hp:'#F8D030',ap:'#A8A878',pal:{p:'#E4D034',s:'#E4D986',a:'#877C63',h:'#F5EC90',b:'#1D1906'},sh:{p:'#A0E32B',s:'#E1CF6A',a:'#9873BD',h:'#F6EB91',b:'#1C1806'}},
    {k:'524',n:'Roggenrola',hp:'#6890F0',ap:'#B8A038',pal:{p:'#817C6B',s:'#B0A268',a:'#D5BE56',h:'#D6C793',b:'#11120E'},sh:{p:'#81B99F',s:'#C2C878',a:'#5FCD58',h:'#E2EEA5',b:'#10170E'}},
    {k:'525',n:'Boldore',hp:'#6890F0',ap:'#F8D030',pal:{p:'#817B68',s:'#C0B764',a:'#DCB44F',h:'#DCCC8F',b:'#11120E'},sh:{p:'#79B597',s:'#C8D174',a:'#75D766',h:'#E5EF9F',b:'#10170E'}},
    {k:'526',n:'Gigalith',hp:'#6890F0',ap:'#C03028',pal:{p:'#817D6A',s:'#B59163',a:'#CC9E4B',h:'#DBBC90',b:'#11120E'},sh:{p:'#74AD85',s:'#B8AD73',a:'#9DCE59',h:'#E3DB9B',b:'#10170E'}},
    {k:'527',n:'Woobat',hp:'#6890F0',ap:'#A040A0',pal:{p:'#4495CC',s:'#8D8CC4',a:'#B5AF78',h:'#CECEF5',b:'#08151E'},sh:{p:'#62E2E0',s:'#A2B7CB',a:'#B964BC',h:'#D3EBF3',b:'#0A1B1C'}},
    {k:'528',n:'Swoobat',hp:'#6890F0',ap:'#A040A0',pal:{p:'#3A83B4',s:'#8789BD',a:'#AEA46F',h:'#CFCFF5',b:'#08141D'},sh:{p:'#55C7C5',s:'#9BB2C2',a:'#AC5BB3',h:'#D4EBF2',b:'#09191B'}},
    {k:'529',n:'Drilbur',hp:'#B8B8D0',ap:'#A8A878',pal:{p:'#AAAEBA',s:'#CBC6B1',a:'#75878D',h:'#EDECE5',b:'#121519'},sh:{p:'#CDC7D0',s:'#D6CFBA',a:'#68B94F',h:'#F3F1E2',b:'#161619'}},
    {k:'530',n:'Excadrill',hp:'#B8B8D0',ap:'#C03028',pal:{p:'#B2B7C2',s:'#CF9695',a:'#8A7E8F',h:'#F3D4CD',b:'#131519'},sh:{p:'#D4CFD7',s:'#D8B6A3',a:'#89C23D',h:'#F6E4CB',b:'#16161A'}},
    {k:'531',n:'Audino',hp:'#F4BDC9',ap:'#78C850',pal:{p:'#E7ACC7',s:'#D3DBC2',a:'#B48D8E',h:'#EDDDD4',b:'#1E1016'},sh:{p:'#CDDDEC',s:'#D8F0D4',a:'#B4777B',h:'#EAF9E8',b:'#101A1E'}},
    {k:'532',n:'Timburr',hp:'#6890F0',ap:'#C03028',pal:{p:'#4191CC',s:'#A28B94',a:'#A4743B',h:'#DDCFCB',b:'#08151E'},sh:{p:'#59D1D1',s:'#CBB7A5',a:'#AA7696',h:'#DEDFCA',b:'#091A1B'}},
    {k:'533',n:'Gurdurr',hp:'#6890F0',ap:'#C03028',pal:{p:'#4A8CD2',s:'#A98E98',a:'#A17436',h:'#DED0CD',b:'#08151E'},sh:{p:'#5B89E0',s:'#CCBBA9',a:'#B29373',h:'#DEE1CA',b:'#09191C'}},
    {k:'534',n:'Conkeldurr',hp:'#6890F0',ap:'#C03028',pal:{p:'#3D7CBC',s:'#A08993',a:'#A26D36',h:'#DBCDCA',b:'#08141D'},sh:{p:'#5AC6D0',s:'#CAB7A3',a:'#9A4B76',h:'#E4E6D0',b:'#09191B'}},
    {k:'535',n:'Tympole',hp:'#6890F0',ap:'#78C850',pal:{p:'#4280C6',s:'#89D2C3',a:'#C17F43',h:'#C9EBE5',b:'#08141E'},sh:{p:'#376070',s:'#BADAC4',a:'#AA7B56',h:'#C1D9D9',b:'#070C0F'}},
    {k:'536',n:'Palpitoad',hp:'#6890F0',ap:'#F8D030',pal:{p:'#4075C9',s:'#ABCEBB',a:'#D77435',h:'#D8EAE0',b:'#08141E'},sh:{p:'#395C71',s:'#D5D7BC',a:'#CC7652',h:'#CFD8D6',b:'#070C0F'}},
    {k:'537',n:'Seismitoad',hp:'#6890F0',ap:'#F8D030',pal:{p:'#367DC0',s:'#AAC9B9',a:'#DA6F3B',h:'#D5E9DE',b:'#07141E'},sh:{p:'#315D6B',s:'#D2D5BB',a:'#CF7B61',h:'#CDD8D3',b:'#060C0F'}},
    {k:'538',n:'Throh',hp:'#C03028',ap:'#A8A878',pal:{p:'#BD3E3B',s:'#CB965E',a:'#857A66',h:'#F3BE93',b:'#1A0706'},sh:{p:'#CA9F54',s:'#D2B76B',a:'#8F6D4A',h:'#F6E69D',b:'#1A1608'}},
    {k:'539',n:'Sawk',hp:'#6890F0',ap:'#A8A878',pal:{p:'#3768B2',s:'#9DB8AF',a:'#B0934E',h:'#D5E3E1',b:'#07131D'},sh:{p:'#52AFC5',s:'#C6CDBA',a:'#8C6F88',h:'#E0F1E7',b:'#09181B'}},
    {k:'540',n:'Sewaddle',hp:'#78C850',ap:'#F8D030',pal:{p:'#78A43F',s:'#D1D454',a:'#9E8283',h:'#E8ED88',b:'#111A08'},sh:{p:'#BDD34B',s:'#E2E165',a:'#C58981',h:'#F6FA95',b:'#181D08'}},
    {k:'541',n:'Swadloon',hp:'#78C850',ap:'#B8A038',pal:{p:'#81A745',s:'#C3C557',a:'#9C838A',h:'#E0E688',b:'#111A08'},sh:{p:'#C6D650',s:'#D3D769',a:'#C18176',h:'#EFF596',b:'#181D09'}},
    {k:'542',n:'Leavanny',hp:'#78C850',ap:'#F8D030',pal:{p:'#79A542',s:'#D7D451',a:'#9E7F80',h:'#EAF18B',b:'#111A08'},sh:{p:'#BBD54F',s:'#E8E262',a:'#C18676',h:'#F5FA96',b:'#181D08'}},
    {k:'543',n:'Venipede',hp:'#A040A0',ap:'#C03028',pal:{p:'#7E8855',s:'#C5A05F',a:'#845988',h:'#E3CD99',b:'#13150C'},sh:{p:'#95CA5D',s:'#C4C473',a:'#CE4E70',h:'#E5E9A1',b:'#131C0B'}},
    {k:'544',n:'Whirlipede',hp:'#A040A0',ap:'#B8B8D0',pal:{p:'#858B59',s:'#C0B788',a:'#8387BB',h:'#E0DCB3',b:'#13160C'},sh:{p:'#A4CA63',s:'#CCDC9C',a:'#CA7A9F',h:'#E7F8BD',b:'#141C0C'}},
    {k:'545',n:'Scolipede',hp:'#A040A0',ap:'#C03028',pal:{p:'#7C8854',s:'#C49C5D',a:'#825785',h:'#E4CE9A',b:'#12150C'},sh:{p:'#92C95D',s:'#C7C372',a:'#CC4C6C',h:'#E5E9A2',b:'#131C0B'}},
    {k:'546',n:'Cottonee',hp:'#78C850',ap:'#F4BDC9',pal:{p:'#5CA650',s:'#D1C998',a:'#CAC5A0',h:'#E2ECB4',b:'#0A1809'},sh:{p:'#AFC74D',s:'#D2DBA6',a:'#B2968F',h:'#EBF5BB',b:'#161C09'}},
    {k:'547',n:'Whimsicott',hp:'#78C850',ap:'#F4BDC9',pal:{p:'#6DB462',s:'#CAC190',a:'#BBBC98',h:'#E7F1B8',b:'#0B180A'},sh:{p:'#BCD560',s:'#CCD29D',a:'#AA9388',h:'#EFF8BE',b:'#171D0A'}},
    {k:'548',n:'Petilil',hp:'#78C850',ap:'#F8D030',pal:{p:'#54A14F',s:'#C1D55F',a:'#D77640',h:'#DBF69C',b:'#091709'},sh:{p:'#C7C350',s:'#E8E36A',a:'#8DB55E',h:'#FBEE89',b:'#1B1B09'}},
    {k:'549',n:'Lilligant',hp:'#78C850',ap:'#F8D030',pal:{p:'#5DAC55',s:'#BED65C',a:'#D98A43',h:'#DFFA9F',b:'#0A180A'},sh:{p:'#C3BE50',s:'#E5E46E',a:'#96B75F',h:'#F7EA85',b:'#1B1B09'}},
    {k:'550',n:'Basculin',hp:'#6890F0',ap:'#C03028',pal:{p:'#3996C9',s:'#959FB1',a:'#D5A74C',h:'#D6DDE4',b:'#08151E'},sh:{p:'#4A65D6',s:'#D4CDCD',a:'#A8545D',h:'#D9E3E0',b:'#09181B'}},
    {k:'551',n:'Sandile',hp:'#E8C068',ap:'#708090',pal:{p:'#C0864E',s:'#C4AE6E',a:'#947971',h:'#DDC198',b:'#1A1108'},sh:{p:'#86BD43',s:'#C0B971',a:'#4E7B46',h:'#E1DA9C',b:'#181607'}},
    {k:'552',n:'Krokorok',hp:'#E8C068',ap:'#705898',pal:{p:'#C78F52',s:'#C3A673',a:'#987A7E',h:'#E1BF9D',b:'#1B1208'},sh:{p:'#89C546',s:'#BCB175',a:'#58804B',h:'#E2D99F',b:'#191708'}},
    {k:'553',n:'Krookodile',hp:'#C03028',ap:'#705898',pal:{p:'#BE8C49',s:'#C7986F',a:'#8D7077',h:'#E4C39B',b:'#1A0F07'},sh:{p:'#91C246',s:'#BBA671',a:'#5C7E49',h:'#E5DBA0',b:'#191608'}},
    {k:'554',n:'Darumaka',hp:'#F08030',ap:'#F8D030',pal:{p:'#DD682E',s:'#F0BF48',a:'#B2582D',h:'#FBD87B',b:'#1D0B05'},sh:{p:'#D7AF47',s:'#EAC654',a:'#6F7D65',h:'#FDED87',b:'#1C1707'}},
    {k:'555',n:'Darmanitan',hp:'#F08030',ap:'#F8D030',pal:{p:'#E67F38',s:'#F4D34A',a:'#AE5F28',h:'#FEDF7A',b:'#1D0C06'},sh:{p:'#E1C652',s:'#EED957',a:'#6C7664',h:'#FEF085',b:'#1D1807'}},
    {k:'556',n:'Maractus',hp:'#78C850',ap:'#F8D030',pal:{p:'#4B9E48',s:'#CDD054',a:'#B59834',h:'#E1F590',b:'#091709'},sh:{p:'#97BE46',s:'#DAD659',a:'#87B17B',h:'#F4F891',b:'#151C09'}},
    {k:'557',n:'Dwebble',hp:'#F08030',ap:'#B8A038',pal:{p:'#EB7531',s:'#D1A945',a:'#D69241',h:'#F2CF7A',b:'#1D0B06'},sh:{p:'#D4B247',s:'#CDBE5F',a:'#897841',h:'#F0E788',b:'#1C1707'}},
    {k:'558',n:'Crustle',hp:'#F08030',ap:'#B8A038',pal:{p:'#E78840',s:'#CAA543',a:'#D07F3A',h:'#EECF77',b:'#1D0C06'},sh:{p:'#E2CB58',s:'#C5B956',a:'#847B3B',h:'#F6EF8B',b:'#1D1907'}},
    {k:'559',n:'Scraggy',hp:'#F8D030',ap:'#C03028',pal:{p:'#DEC533',s:'#DC9D61',a:'#815C50',h:'#F8CF80',b:'#1D1806'},sh:{p:'#A1DC2A',s:'#DAAE53',a:'#8D7769',h:'#F8DE85',b:'#1C1706'}},
    {k:'560',n:'Scrafty',hp:'#C03028',ap:'#F8D030',pal:{p:'#BE4D3F',s:'#E89F44',a:'#8C7C55',h:'#FECA7F',b:'#1A0806'},sh:{p:'#BDA052',s:'#E8BD5A',a:'#96846A',h:'#FBEA87',b:'#1A1608'}},
    {k:'561',n:'Sigilyph',hp:'#6890F0',ap:'#A040A0',pal:{p:'#AB66A8',s:'#A274D1',a:'#CDAD6C',h:'#ECBAE5',b:'#160D19'},sh:{p:'#68BC78',s:'#BEC5C3',a:'#BD57AD',h:'#D1E7D4',b:'#0B190F'}},
    {k:'562',n:'Yamask',hp:'#E8C068',ap:'#705898',pal:{p:'#C48D4F',s:'#A78875',a:'#915B7B',h:'#DCBBB1',b:'#1B1208'},sh:{p:'#ACC144',s:'#968D6F',a:'#609859',h:'#D9CEB4',b:'#191507'}},
    {k:'563',n:'Cofagrigus',hp:'#F8D030',ap:'#705898',pal:{p:'#EBC84C',s:'#B0978C',a:'#9F7B95',h:'#E4D1AF',b:'#1D1807'},sh:{p:'#C3EB44',s:'#A58D73',a:'#9B92AA',h:'#E4DAB2',b:'#1D1807'}},
    {k:'564',n:'Tirtouga',hp:'#6890F0',ap:'#E8C068',pal:{p:'#4585BE',s:'#CDD4C8',a:'#A88994',h:'#D9E8E4',b:'#08141E'},sh:{p:'#9E76DB',s:'#E3D5D3',a:'#9F8AB7',h:'#EFE8E8',b:'#0F0F1C'}},
    {k:'565',n:'Carracosta',hp:'#6890F0',ap:'#B8A038',pal:{p:'#4D8EC9',s:'#C2D0C0',a:'#A88B8A',h:'#D6E8E2',b:'#08151E'},sh:{p:'#A67FE8',s:'#D7D0CC',a:'#9989AA',h:'#EDE8E6',b:'#10101D'}},
    {k:'566',n:'Archen',hp:'#F08030',ap:'#A040A0',pal:{p:'#E15D44',s:'#BF7C75',a:'#9E625D',h:'#E9B5A4',b:'#1D0A06'},sh:{p:'#DBC650',s:'#B0AD83',a:'#9B688C',h:'#E5E2A9',b:'#1C1807'}},
    {k:'567',n:'Archeops',hp:'#78C850',ap:'#F08030',pal:{p:'#529D46',s:'#CAAE50',a:'#E5853B',h:'#E3E589',b:'#091709'},sh:{p:'#A3BE42',s:'#D0C45B',a:'#767742',h:'#F7EF90',b:'#161C09'}},
    {k:'568',n:'Trubbish',hp:'#78C850',ap:'#A040A0',pal:{p:'#5FB253',s:'#A09481',a:'#A5AD6F',h:'#D8DBBA',b:'#0A1809'},sh:{p:'#ABC649',s:'#A0B586',a:'#A17A88',h:'#DEE9B2',b:'#161C09'}},
    {k:'569',n:'Garbodor',hp:'#78C850',ap:'#A040A0',pal:{p:'#6DB767',s:'#9E8A7D',a:'#989C62',h:'#D6DABB',b:'#0B180B'},sh:{p:'#6ED25A',s:'#A6AD81',a:'#9A8B6D',h:'#DDE9B4',b:'#161C0A'}},
    {k:'570',n:'Zorua',hp:'#705898',ap:'#C03028',pal:{p:'#432D75',s:'#994978',a:'#9F456C',h:'#D6A1CA',b:'#08050E'},sh:{p:'#38286D',s:'#8E7075',a:'#78C83D',h:'#D0C8CF',b:'#05080D'}},
    {k:'571',n:'Zoroark',hp:'#705898',ap:'#C03028',pal:{p:'#694D2E',s:'#C0846F',a:'#D53C30',h:'#E6B3A0',b:'#100A06'},sh:{p:'#69526C',s:'#BEB2C4',a:'#7EE038',h:'#E7E3E9',b:'#0B0910'}},
    {k:'572',n:'Minccino',hp:'#A8A878',ap:'#F4BDC9',pal:{p:'#CAA74D',s:'#EECDA1',a:'#C5706A',h:'#FCEAA9',b:'#1B1508'},sh:{p:'#B1D05B',s:'#E9D4AE',a:'#C093BF',h:'#FEEEBA',b:'#191609'}},
    {k:'573',n:'Cinccino',hp:'#A8A878',ap:'#F4BDC9',pal:{p:'#C99850',s:'#ECC7A1',a:'#C36A6C',h:'#F9E3A8',b:'#1B1408'},sh:{p:'#A0CF5F',s:'#F2D6B4',a:'#B990BD',h:'#FCF1B9',b:'#19160A'}},
    {k:'574',n:'Gothita',hp:'#705898',ap:'#F4BDC9',pal:{p:'#5E3F81',s:'#B68BC9',a:'#BC9BD1',h:'#DEBCF4',b:'#09060E'},sh:{p:'#553B7A',s:'#9CA4C3',a:'#C8E88D',h:'#CBD4F9',b:'#06080E'}},
    {k:'575',n:'Gothorita',hp:'#705898',ap:'#F4BDC9',pal:{p:'#3E2B6F',s:'#B280BE',a:'#BF9CD4',h:'#D9B9F3',b:'#08050D'},sh:{p:'#342667',s:'#9292B8',a:'#CAEB8E',h:'#C9D7F9',b:'#05080D'}},
    {k:'576',n:'Gothitelle',hp:'#705898',ap:'#6890F0',pal:{p:'#4B347B',s:'#686FCA',a:'#C395AC',h:'#C3BCFD',b:'#08060E'},sh:{p:'#412E72',s:'#6390C0',a:'#B0A4A8',h:'#BCD3FD',b:'#06080D'}},
    {k:'577',n:'Solosis',hp:'#78C850',ap:'#F8D030',pal:{p:'#5FB35D',s:'#D3D659',a:'#AF9932',h:'#E2F891',b:'#0A180A'},sh:{p:'#AAD35A',s:'#E0DB5E',a:'#84AC7E',h:'#F5FA93',b:'#161D0A'}},
    {k:'578',n:'Duosion',hp:'#78C850',ap:'#F8D030',pal:{p:'#549B46',s:'#C8CC54',a:'#B79338',h:'#E3F38E',b:'#091709'},sh:{p:'#A5BB43',s:'#D4D158',a:'#8AB279',h:'#F7F690',b:'#161C09'}},
    {k:'579',n:'Reuniclus',hp:'#78C850',ap:'#F8D030',pal:{p:'#69A753',s:'#D2CD56',a:'#B4943C',h:'#E8F390',b:'#0B1809'},sh:{p:'#56D14B',s:'#E3D25F',a:'#78B9AB',h:'#F1F793',b:'#161C09'}},
    {k:'580',n:'Ducklett',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#4E88D0',s:'#B6BCD4',a:'#C6C4A1',h:'#E1E6F5',b:'#08151E'},sh:{p:'#6AD3E4',s:'#CCD8E6',a:'#C778C0',h:'#DCF3F9',b:'#0A1A1C'}},
    {k:'581',n:'Swanna',hp:'#A8A878',ap:'#F8D030',pal:{p:'#B19D68',s:'#EDCC80',a:'#816328',h:'#F7E8A9',b:'#17120B'},sh:{p:'#B5CC68',s:'#ECC97C',a:'#669565',h:'#FEEFAE',b:'#18120C'}},
    {k:'582',n:'Vanillite',hp:'#6890F0',ap:'#A8A878',pal:{p:'#74C3DF',s:'#CDDBD4',a:'#869FA1',h:'#DFF2ED',b:'#0A181F'},sh:{p:'#AEEEEF',s:'#DCE1D6',a:'#8A8DB0',h:'#F1F6EE',b:'#0E1B1E'}},
    {k:'583',n:'Vanillish',hp:'#6890F0',ap:'#A8A878',pal:{p:'#6DA9D6',s:'#D0DFD8',a:'#83A0A1',h:'#DEEFEC',b:'#0A171F'},sh:{p:'#A6D8E6',s:'#E0E6DA',a:'#878CB1',h:'#F1F6EE',b:'#0E1A1D'}},
    {k:'584',n:'Vanilluxe',hp:'#6890F0',ap:'#F8D030',pal:{p:'#72B1DF',s:'#E3EBC9',a:'#93A48D',h:'#E8F7E3',b:'#0A171F'},sh:{p:'#ACE2F0',s:'#F1F0CB',a:'#9795AE',h:'#F9FAE3',b:'#0E1B1E'}},
    {k:'585',n:'Deerling',hp:'#78C850',ap:'#F4BDC9',pal:{p:'#61B159',s:'#D2CC99',a:'#C4C7A1',h:'#E6F1B7',b:'#0A180A'},sh:{p:'#A4C450',s:'#D4DEAB',a:'#B69592',h:'#E7F1B9',b:'#161C09'}},
    {k:'586',n:'Sawsbuck',hp:'#78C850',ap:'#B8A038',pal:{p:'#5E9B49',s:'#A9AC53',a:'#D3B74D',h:'#D9E58D',b:'#0A1709'},sh:{p:'#48C23F',s:'#C0C760',a:'#47B266',h:'#E6F495',b:'#151C09'}},
    {k:'587',n:'Emolga',hp:'#A8A878',ap:'#F8D030',pal:{p:'#B59B69',s:'#EDD281',a:'#84652D',h:'#F5E4A6',b:'#17120B'},sh:{p:'#C0D167',s:'#EBCE7E',a:'#699869',h:'#FEEDAD',b:'#18120C'}},
    {k:'588',n:'Karrablast',hp:'#6890F0',ap:'#78C850',pal:{p:'#4B86D2',s:'#82C9AD',a:'#CBD64E',h:'#CEF3D9',b:'#08141E'},sh:{p:'#5B83E0',s:'#BAE3B2',a:'#7C859C',h:'#D4F3D4',b:'#09191C'}},
    {k:'589',n:'Escavalier',hp:'#B8B8D0',ap:'#C03028',pal:{p:'#9AA1A9',s:'#C6908D',a:'#67626F',h:'#EDCDC7',b:'#121418'},sh:{p:'#BDBEC5',s:'#CFAE99',a:'#BB7646',h:'#F8E4CD',b:'#161619'}},
    {k:'590',n:'Foongus',hp:'#A8A878',ap:'#C03028',pal:{p:'#CC5943',s:'#E2BA9D',a:'#797644',h:'#F4AD9A',b:'#1A0A07'},sh:{p:'#BFCCC4',s:'#E2C9BC',a:'#C5516B',h:'#F8E4D5',b:'#111818'}},
    {k:'591',n:'Amoonguss',hp:'#78C850',ap:'#C03028',pal:{p:'#AE5C3F',s:'#D0AA90',a:'#7E7A42',h:'#F5BA99',b:'#160A07'},sh:{p:'#9DB6B4',s:'#D5BFB4',a:'#C05A74',h:'#F3E6CD',b:'#0E1718'}},
    {k:'592',n:'Frillish',hp:'#A040A0',ap:'#6890F0',pal:{p:'#773D94',s:'#876EC5',a:'#93BD85',h:'#CCBBFD',b:'#100815'},sh:{p:'#3A8F7B',s:'#78C4D0',a:'#996DC5',h:'#C1EEEE',b:'#081612'}},
    {k:'593',n:'Jellicent',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#97CBE2',s:'#DDD0E7',a:'#718EC1',h:'#E1EAF4',b:'#0E181E'},sh:{p:'#CBEDF3',s:'#DDD5E7',a:'#9279BF',h:'#F5EBF5',b:'#0F1B1E'}},
    {k:'594',n:'Alomomola',hp:'#F4BDC9',ap:'#6890F0',pal:{p:'#D19EAF',s:'#A6B4DB',a:'#99B3B6',h:'#E1D8EC',b:'#1C1015'},sh:{p:'#A6C4D0',s:'#A4D1E9',a:'#9C6BC0',h:'#CFEDFD',b:'#0E191D'}},
    {k:'595',n:'Joltik',hp:'#F8D030',ap:'#6890F0',pal:{p:'#A8AF35',s:'#AAC485',a:'#7F72B6',h:'#E0E7A0',b:'#171A07'},sh:{p:'#84D938',s:'#B5D390',a:'#C87785',h:'#EAF3AD',b:'#1A1B07'}},
    {k:'596',n:'Galvantula',hp:'#F8D030',ap:'#6890F0',pal:{p:'#ADB43B',s:'#ABC485',a:'#8173B6',h:'#E2E8A1',b:'#171A07'},sh:{p:'#8DDE3E',s:'#B8D291',a:'#C37781',h:'#EBF3AE',b:'#1A1B07'}},
    {k:'597',n:'Ferroseed',hp:'#78C850',ap:'#B8B8D0',pal:{p:'#5EA755',s:'#B4CD80',a:'#C58C77',h:'#D9F8BA',b:'#0A180A'},sh:{p:'#C0B750',s:'#DCDA94',a:'#90AD76',h:'#F2E9A0',b:'#1A1B09'}},
    {k:'598',n:'Ferrothorn',hp:'#78C850',ap:'#B8A038',pal:{p:'#65A550',s:'#B4B259',a:'#D2AD4F',h:'#D7E38C',b:'#0A1809'},sh:{p:'#50CF48',s:'#CDCC66',a:'#49B461',h:'#E4F195',b:'#151C09'}},
    {k:'599',n:'Klink',hp:'#B8B8D0',ap:'#A8A878',pal:{p:'#ACB3BC',s:'#CBCBC2',a:'#749CB2',h:'#EBEDEE',b:'#121519'},sh:{p:'#CDC9D2',s:'#DCD9D0',a:'#77CE5B',h:'#F2F1E9',b:'#161619'}},
    {k:'600',n:'Klang',hp:'#B8B8D0',ap:'#A8A878',pal:{p:'#A3A9B3',s:'#CBCBC2',a:'#71A0AE',h:'#E8E9EB',b:'#121518'},sh:{p:'#C7C7CF',s:'#DBD8CF',a:'#C0B35F',h:'#F6F5ED',b:'#16161A'}},
    {k:'601',n:'Klinklang',hp:'#B8B8D0',ap:'#F8D030',pal:{p:'#A9AFB7',s:'#DFD7B3',a:'#81A59B',h:'#F2F0E0',b:'#121518'},sh:{p:'#CDCDD5',s:'#EEE3C1',a:'#D0C55C',h:'#FEF9E1',b:'#16161A'}},
    {k:'602',n:'Tynamo',hp:'#6890F0',ap:'#F8D030',pal:{p:'#5487D3',s:'#B7C892',a:'#B6A138',h:'#E3F0D1',b:'#09151E'},sh:{p:'#6485E0',s:'#D9D79F',a:'#AA96B0',h:'#E4F1CB',b:'#0A191C'}},
    {k:'603',n:'Eelektrik',hp:'#6890F0',ap:'#F8D030',pal:{p:'#4179C3',s:'#BACE96',a:'#B9A13A',h:'#E2EED0',b:'#08141E'},sh:{p:'#5177D0',s:'#E0DDA5',a:'#A898B2',h:'#E3EFCA',b:'#09181B'}},
    {k:'604',n:'Eelektross',hp:'#6890F0',ap:'#F8D030',pal:{p:'#4788CA',s:'#BDCF9A',a:'#BDA142',h:'#E1EDCE',b:'#08151E'},sh:{p:'#65D4E0',s:'#DEDDA4',a:'#9A92AF',h:'#EAF7D0',b:'#0A1A1C'}},
    {k:'605',n:'Elgyem',hp:'#6890F0',ap:'#78C850',pal:{p:'#A45F9C',s:'#A39AC0',a:'#D5C156',h:'#E3CACF',b:'#160C18'},sh:{p:'#68C381',s:'#BEE4B3',a:'#AF808B',h:'#D2F9CA',b:'#0B1910'}},
    {k:'606',n:'Beheeyem',hp:'#E8C068',ap:'#6890F0',pal:{p:'#CE6D82',s:'#A68CD2',a:'#BAA176',h:'#E8BFD5',b:'#1C0C12'},sh:{p:'#8DBD63',s:'#BBD4C4',a:'#A568A2',h:'#D4EECF',b:'#0F180A'}},
    {k:'607',n:'Litwick',hp:'#705898',ap:'#F8D030',pal:{p:'#554286',s:'#B38E85',a:'#B17869',h:'#DFC5D1',b:'#09060E'},sh:{p:'#453976',s:'#A39776',a:'#7CC483',h:'#D2D4CC',b:'#06080D'}},
    {k:'608',n:'Lampent',hp:'#705898',ap:'#F08030',pal:{p:'#403072',s:'#A95E7B',a:'#D9636A',h:'#DDB4CC',b:'#08060D'},sh:{p:'#442763',s:'#9F8678',a:'#5EAA34',h:'#D0C9CB',b:'#05070C'}},
    {k:'609',n:'Chandelure',hp:'#705898',ap:'#F08030',pal:{p:'#2C283E',s:'#9864BA',a:'#92D2C0',h:'#CCB3E6',b:'#06050B'},sh:{p:'#99485C',s:'#EE879F',a:'#F4B247',h:'#FDC9D6',b:'#16080B'}},
    {k:'610',n:'Axew',hp:'#78C850',ap:'#C03028',pal:{p:'#3B7F8F',s:'#899853',a:'#D28943',h:'#B4BACA',b:'#061013'},sh:{p:'#629F57',s:'#BABB61',a:'#C04E36',h:'#DBE095',b:'#0D180A'}},
    {k:'611',n:'Fraxure',hp:'#78C850',ap:'#C03028',pal:{p:'#396B88',s:'#959B53',a:'#CE7E3A',h:'#B4B7CA',b:'#060F13'},sh:{p:'#669854',s:'#C1B75D',a:'#BB4C38',h:'#DEDE96',b:'#0D1809'}},
    {k:'612',n:'Haxorus',hp:'#F8D030',ap:'#78C850',pal:{p:'#617D83',s:'#7FBD60',a:'#C2A84D',h:'#AFCACD',b:'#0C1012'},sh:{p:'#4C9C57',s:'#B0D767',a:'#82B551',h:'#D3ED96',b:'#0F1708'}},
    {k:'613',n:'Cubchoo',hp:'#6890F0',ap:'#A8A878',pal:{p:'#786761',s:'#BCB391',a:'#78623D',h:'#E3D3B9',b:'#110E0D'},sh:{p:'#A7BDA6',s:'#DDD7B1',a:'#776D79',h:'#F2EED9',b:'#151715'}},
    {k:'614',n:'Beartic',hp:'#6890F0',ap:'#A8A878',pal:{p:'#72645D',s:'#C1B896',a:'#7A633B',h:'#E3D4B9',b:'#100E0D'},sh:{p:'#A5B9A2',s:'#DAD3AF',a:'#796F7A',h:'#F2EDD9',b:'#141714'}},
    {k:'615',n:'Cryogonal',hp:'#6890F0',ap:'#A8A878',pal:{p:'#75B9E2',s:'#D0DED8',a:'#849DA2',h:'#E1F3EE',b:'#0A181F'},sh:{p:'#A4BAEA',s:'#E1E6DA',a:'#A98ABA',h:'#EBF0E9',b:'#0D1A1D'}},
    {k:'616',n:'Shelmet',hp:'#C03028',ap:'#78C850',pal:{p:'#A8372E',s:'#A49949',a:'#767E33',h:'#E9CB85',b:'#190705'},sh:{p:'#A78741',s:'#BBC15C',a:'#787746',h:'#E9EB8B',b:'#191507'}},
    {k:'617',n:'Accelgor',hp:'#C03028',ap:'#A8A878',pal:{p:'#B4322E',s:'#CA985A',a:'#827563',h:'#F3BE91',b:'#190605'},sh:{p:'#C19649',s:'#D1BB68',a:'#8E6846',h:'#F6E69C',b:'#1A1507'}},
    {k:'618',n:'Stunfisk',hp:'#E8C068',ap:'#78C850',pal:{p:'#D1A264',s:'#AEB560',a:'#949D46',h:'#E4DF96',b:'#1B1309'},sh:{p:'#AAC153',s:'#B8BD60',a:'#48966E',h:'#E3E293',b:'#191608'}},
    {k:'619',n:'Mienfoo',hp:'#A040A0',ap:'#F8D030',pal:{p:'#66388B',s:'#C88775',a:'#889C46',h:'#E6C1CE',b:'#0F0715'},sh:{p:'#3A908D',s:'#B0CC85',a:'#BA8D97',h:'#DCF9C5',b:'#081713'}},
    {k:'620',n:'Mienshao',hp:'#A040A0',ap:'#F4BDC9',pal:{p:'#713E93',s:'#D085C0',a:'#96C2A4',h:'#E1B9F1',b:'#100815'},sh:{p:'#40997E',s:'#A8D0CC',a:'#DE77AE',h:'#D3F5ED',b:'#081712'}},
    {k:'621',n:'Druddigon',hp:'#C03028',ap:'#6890F0',pal:{p:'#C04B45',s:'#A18C8F',a:'#75705E',h:'#E5C1AE',b:'#1A0706'},sh:{p:'#CCA75D',s:'#ADBEA1',a:'#7C5C8B',h:'#EAECBA',b:'#1A1608'}},
    {k:'622',n:'Golett',hp:'#78C850',ap:'#F8D030',pal:{p:'#53A24A',s:'#CCCE51',a:'#B5A136',h:'#E6F891',b:'#091809'},sh:{p:'#98B542',s:'#D9D35C',a:'#88B171',h:'#F1F28E',b:'#151C09'}},
    {k:'623',n:'Golurk',hp:'#78C850',ap:'#F8D030',pal:{p:'#6DAE55',s:'#D0CD52',a:'#B5A13D',h:'#EDF893',b:'#0B180A'},sh:{p:'#52CA47',s:'#E3D562',a:'#70BAA5',h:'#EDF290',b:'#151C09'}},
    {k:'624',n:'Pawniard',hp:'#B8B8D0',ap:'#C03028',pal:{p:'#A7ACB5',s:'#CDACAE',a:'#6F8195',h:'#E9D9DC',b:'#121518'},sh:{p:'#CACBD2',s:'#DEC0BC',a:'#C58C4A',h:'#F8E9E0',b:'#16161A'}},
    {k:'625',n:'Bisharp',hp:'#B8B8D0',ap:'#C03028',pal:{p:'#ABB2BB',s:'#CFAEB0',a:'#707195',h:'#F0DEE3',b:'#121519'},sh:{p:'#CCC9D1',s:'#DFC3BF',a:'#82CF42',h:'#F6E5DE',b:'#161619'}},
    {k:'626',n:'Bouffalant',hp:'#A8A878',ap:'#F8D030',pal:{p:'#B99571',s:'#E8C87F',a:'#846730',h:'#F5E1A8',b:'#17110C'},sh:{p:'#B9D472',s:'#F0CB82',a:'#6A9869',h:'#FEF1AF',b:'#18130C'}},
    {k:'627',n:'Rufflet',hp:'#A8A878',ap:'#6890F0',pal:{p:'#A28C5D',s:'#9FAFC2',a:'#937D68',h:'#D9DDD5',b:'#16110B'},sh:{p:'#AABB5C',s:'#A9C3C5',a:'#9A6983',h:'#E7EADC',b:'#17110B'}},
    {k:'628',n:'Braviary',hp:'#C03028',ap:'#6890F0',pal:{p:'#B03235',s:'#9D8688',a:'#786D62',h:'#E2BCAC',b:'#190606'},sh:{p:'#BD8E4B',s:'#AABA9C',a:'#816194',h:'#E7E6B8',b:'#1A1507'}},
    {k:'629',n:'Vullaby',hp:'#705898',ap:'#E8C068',pal:{p:'#5E3E82',s:'#AB8599',a:'#BA7881',h:'#DAB9D5',b:'#09060E'},sh:{p:'#553B7B',s:'#9B9488',a:'#55C34C',h:'#D1D2D8',b:'#06080E'}},
    {k:'630',n:'Mandibuzz',hp:'#705898',ap:'#E8C068',pal:{p:'#452C6C',s:'#A57E8F',a:'#B77386',h:'#D6B5D2',b:'#08050D'},sh:{p:'#3C2665',s:'#938B80',a:'#5FC048',h:'#CECFD4',b:'#05070C'}},
    {k:'631',n:'Heatmor',hp:'#C03028',ap:'#F8D030',pal:{p:'#E34430',s:'#ECB540',a:'#CC6F32',h:'#FECD78',b:'#1D0806'},sh:{p:'#CFBD46',s:'#F4D163',a:'#877E65',h:'#FBF085',b:'#1C1806'}},
    {k:'632',n:'Durant',hp:'#B8B8D0',ap:'#C03028',pal:{p:'#ABB1BA',s:'#CB9293',a:'#857F88',h:'#EDCEC8',b:'#121519'},sh:{p:'#D8D5DE',s:'#D3AF9D',a:'#78B838',h:'#F8E4CD',b:'#16161A'}},
    {k:'633',n:'Deino',hp:'#705898',ap:'#78C850',pal:{p:'#345699',s:'#71A867',a:'#CFBB5E',h:'#A9C1E7',b:'#060A15'},sh:{p:'#46745B',s:'#99C069',a:'#B8914A',h:'#D1E9B0',b:'#08120B'}},
    {k:'634',n:'Zweilous',hp:'#705898',ap:'#78C850',pal:{p:'#395496',s:'#7AAA6A',a:'#C9A65B',h:'#A7BEE2',b:'#060A15'},sh:{p:'#47725D',s:'#A4C26D',a:'#B27D48',h:'#CDE5AE',b:'#08120B'}},
    {k:'635',n:'Hydreigon',hp:'#705898',ap:'#6890F0',pal:{p:'#2F679B',s:'#5D8865',a:'#C59E70',h:'#97BBF9',b:'#050C16'},sh:{p:'#49745D',s:'#90A378',a:'#B76068',h:'#BBD5B6',b:'#08120A'}},
    {k:'636',n:'Larvesta',hp:'#F08030',ap:'#A8A878',pal:{p:'#D65024',s:'#D1B65C',a:'#AE5744',h:'#F0CE8D',b:'#1C0905'},sh:{p:'#D09B3E',s:'#D3C46A',a:'#867D6B',h:'#F6E59A',b:'#1C1606'}},
    {k:'637',n:'Volcarona',hp:'#F08030',ap:'#F8D030',pal:{p:'#E05633',s:'#EDC046',a:'#F1E1AC',h:'#FCD17B',b:'#1D0A06'},sh:{p:'#F4D951',s:'#EEE5BD',a:'#8EC0B6',h:'#FEF28A',b:'#1E1907'}},
    {k:'638',n:'Cobalion',hp:'#B8B8D0',ap:'#6890F0',pal:{p:'#969BA4',s:'#96B6D6',a:'#89A7AC',h:'#DAE8FC',b:'#111418'},sh:{p:'#C1BEC5',s:'#A3CCE1',a:'#A9999F',h:'#E6F3FD',b:'#151519'}},
    {k:'639',n:'Terrakion',hp:'#B8A038',ap:'#C03028',pal:{p:'#94733F',s:'#BD7847',a:'#A0673A',h:'#DFAE76',b:'#151007'},sh:{p:'#6AA44D',s:'#B6A054',a:'#80C43D',h:'#EDDC8A',b:'#141608'}},
    {k:'640',n:'Virizion',hp:'#78C850',ap:'#C03028',pal:{p:'#69B057',s:'#B99653',a:'#A37239',h:'#E3D88B',b:'#0B180A'},sh:{p:'#BFD153',s:'#C3B25E',a:'#8C6E4A',h:'#F6E990',b:'#171D09'}},
    {k:'641',n:'Tornadus',hp:'#78C850',ap:'#6890F0',pal:{p:'#53A14E',s:'#87B299',a:'#C2C771',h:'#CDF3C3',b:'#091709'},sh:{p:'#94B646',s:'#A4CCA5',a:'#708BA2',h:'#DAF1C0',b:'#151C09'}},
    {k:'642',n:'Thundurus',hp:'#6890F0',ap:'#F8D030',pal:{p:'#4275C7',s:'#BED29B',a:'#BA9C3B',h:'#E1ECCF',b:'#08141E'},sh:{p:'#60C2DD',s:'#E4E1A8',a:'#948DAC',h:'#E8F6D0',b:'#09191C'}},
    {k:'643',n:'Reshiram',hp:'#A8A878',ap:'#6890F0',pal:{p:'#EEEBE2',s:'#C7CED9',a:'#6EB7E9',h:'#ECF0FA',b:'#161617'},sh:{p:'#FEFFF6',s:'#CCC5C4',a:'#7FC57B',h:'#EFF3FD',b:'#191816'}},
    {k:'644',n:'Zekrom',hp:'#708090',ap:'#F8D030',pal:{p:'#11161E',s:'#4F4D3E',a:'#98DCC1',h:'#A9E7E5',b:'#030407'},sh:{p:'#241F2D',s:'#585544',a:'#5AEF42',h:'#FDF285',b:'#050507'}},
    {k:'645',n:'Landorus',hp:'#F08030',ap:'#78C850',pal:{p:'#E77234',s:'#B6B84F',a:'#C39442',h:'#E9E085',b:'#1D0B06'},sh:{p:'#E1BB4E',s:'#C8CA5B',a:'#517C46',h:'#F1F390',b:'#1D1807'}},
    {k:'646',n:'Kyurem',hp:'#6890F0',ap:'#B8B8D0',pal:{p:'#CAEEF3',s:'#6D8ABB',a:'#747987',h:'#E4F6FA',b:'#0F1B20'},sh:{p:'#A1C7D0',s:'#5F7594',a:'#D3B27B',h:'#D3E9F6',b:'#0D181D'}},
    {k:'647',n:'Keldeo',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#9F8265',s:'#E3C9B9',a:'#DF8865',h:'#F5DEC2',b:'#16100D'},sh:{p:'#85CAE7',s:'#E9EDF4',a:'#B179CA',h:'#F4F6F9',b:'#0C191D'}},
    {k:'648',n:'Meloetta',hp:'#A8A878',ap:'#6890F0',pal:{p:'#BCA76E',s:'#A8B7CB',a:'#9C8E6F',h:'#DDE0D8',b:'#17120C'},sh:{p:'#BFD76E',s:'#B3CCCF',a:'#A07187',h:'#E9EEDE',b:'#18130C'}},
    {k:'649',n:'Genesect',hp:'#B8B8D0',ap:'#C03028',pal:{p:'#969DA6',s:'#C38D89',a:'#88818E',h:'#EFCFC9',b:'#111418'},sh:{p:'#C2BFC8',s:'#CBAC96',a:'#76C13B',h:'#F8E4CC',b:'#151619'}},
    {k:'650',n:'Chespin',hp:'#78C850',ap:'#E8C068',pal:{p:'#78A456',s:'#D7C06A',a:'#8A633E',h:'#DDE8A4',b:'#0B180A'},sh:{p:'#67BF7C',s:'#E5D380',a:'#5D9C39',h:'#E7F0B4',b:'#0D180B'}},
    {k:'651',n:'Quilladin',hp:'#78C850',ap:'#E8C068',pal:{p:'#7AA85B',s:'#D8BB68',a:'#88663D',h:'#DEECA6',b:'#0B180A'},sh:{p:'#6CC584',s:'#E6CE7F',a:'#539A37',h:'#E9F3B6',b:'#0D190B'}},
    {k:'652',n:'Chesnaught',hp:'#78C850',ap:'#C03028',pal:{p:'#79AA58',s:'#D0AD5C',a:'#9E715E',h:'#DBDE9F',b:'#0B180A'},sh:{p:'#62B97A',s:'#DFC078',a:'#96AF5B',h:'#DEDDA9',b:'#0D180A'}},
    {k:'653',n:'Fennekin',hp:'#F08030',ap:'#F8D030',pal:{p:'#EDC74F',s:'#F06532',a:'#915E73',h:'#FDE489',b:'#1D1407'},sh:{p:'#A8E45A',s:'#F58837',a:'#9E7DA7',h:'#FEF28A',b:'#1C1908'}},
    {k:'654',n:'Braixen',hp:'#F08030',ap:'#F8D030',pal:{p:'#F3B84D',s:'#EC682E',a:'#9A6174',h:'#FEE188',b:'#1E1307'},sh:{p:'#AED853',s:'#F0923D',a:'#8D83A9',h:'#FAE885',b:'#1C1808'}},
    {k:'655',n:'Delphox',hp:'#C03028',ap:'#F8D030',pal:{p:'#F5C852',s:'#EE602D',a:'#9B5F73',h:'#FEE48A',b:'#1E1407'},sh:{p:'#A5DA56',s:'#F38B3C',a:'#8D7FA7',h:'#FBED87',b:'#1C1808'}},
    {k:'656',n:'Froakie',hp:'#6890F0',ap:'#A8A878',pal:{p:'#3A79BC',s:'#A6CED4',a:'#CC5C4D',h:'#C0DCF0',b:'#08121C'},sh:{p:'#242F3D',s:'#C1CED2',a:'#CC6B4E',h:'#BCCADF',b:'#050609'}},
    {k:'657',n:'Frogadier',hp:'#6890F0',ap:'#A8A878',pal:{p:'#3768C2',s:'#A8CBD9',a:'#D26949',h:'#C0D9F1',b:'#07121C'},sh:{p:'#21293A',s:'#C6D0D7',a:'#D25650',h:'#B7C3DB',b:'#050609'}},
    {k:'658',n:'Greninja',hp:'#708090',ap:'#F08030',pal:{p:'#2F59A3',s:'#DED0C8',a:'#DC5550',h:'#AAB9E6',b:'#060C18'},sh:{p:'#202634',s:'#CFC8C6',a:'#DC5746',h:'#C2C4D5',b:'#050609'}},
    {k:'659',n:'Bunnelby',hp:'#A8A878',ap:'#E8C068',pal:{p:'#BAA471',s:'#E2C293',a:'#8B6940',h:'#F1DEAF',b:'#17120C'},sh:{p:'#C1D571',s:'#E1C58E',a:'#51993C',h:'#FCECB6',b:'#18120C'}},
    {k:'660',n:'Diggersby',hp:'#A8A878',ap:'#E8C068',pal:{p:'#A8865E',s:'#D6BE87',a:'#89693D',h:'#F3DBAF',b:'#16110B'},sh:{p:'#B2B456',s:'#D4C386',a:'#5E963A',h:'#F5E1AF',b:'#16100B'}},
    {k:'661',n:'Fletchling',hp:'#F08030',ap:'#A8A878',pal:{p:'#8D8299',s:'#D9BD8B',a:'#B75D47',h:'#DFDED3',b:'#101116'},sh:{p:'#D0CDBB',s:'#DED7BF',a:'#ABA159',h:'#F6F1D8',b:'#171817'}},
    {k:'662',n:'Fletchinder',hp:'#F08030',ap:'#A8A878',pal:{p:'#90839B',s:'#DDCB90',a:'#C05947',h:'#DEDED2',b:'#101116'},sh:{p:'#CED0BC',s:'#E2DFC4',a:'#B3A55A',h:'#F6F2D7',b:'#161817'}},
    {k:'663',n:'Talonflame',hp:'#F08030',ap:'#F8D030',pal:{p:'#E9582B',s:'#EFC440',a:'#DC7531',h:'#FED176',b:'#1D0905'},sh:{p:'#D2A240',s:'#EDD45E',a:'#827E64',h:'#FCE885',b:'#1C1706'}},
    {k:'664',n:'Scatterbug',hp:'#A8A878',ap:'#78C850',pal:{p:'#869F46',s:'#BBD66C',a:'#7B7B8B',h:'#D8E893',b:'#141809'},sh:{p:'#B3C754',s:'#CFE57B',a:'#AA7A78',h:'#E4F6A0',b:'#171A09'}},
    {k:'665',n:'Spewpa',hp:'#A8A878',ap:'#78C850',pal:{p:'#92A04C',s:'#BDD26B',a:'#787A87',h:'#DAE793',b:'#141809'},sh:{p:'#C3C859',s:'#D0E17A',a:'#A67A78',h:'#E8F6A1',b:'#181A0A'}},
    {k:'666',n:'Vivillon',hp:'#A8A878',ap:'#78C850',pal:{p:'#99A446',s:'#AFCF64',a:'#867F8D',h:'#E2ED95',b:'#151809'},sh:{p:'#81C747',s:'#C3DE79',a:'#B5B381',h:'#E7F39D',b:'#181A09'}},
    {k:'667',n:'Litleo',hp:'#F08030',ap:'#E8C068',pal:{p:'#E36C2D',s:'#E6BD56',a:'#BD6440',h:'#F8D281',b:'#1D0B05'},sh:{p:'#DDB648',s:'#E0C861',a:'#918769',h:'#FCEA8F',b:'#1D1807'}},
    {k:'668',n:'Pyroar',hp:'#F08030',ap:'#E8C068',pal:{p:'#ED8A44',s:'#DEAE4D',a:'#B46938',h:'#FDD985',b:'#1D0C06'},sh:{p:'#D7BF55',s:'#D9BC61',a:'#8C7E65',h:'#F7E88D',b:'#1C1807'}},
    {k:'669',n:'Flabebe',hp:'#F4BDC9',ap:'#78C850',pal:{p:'#87AA75',s:'#D1BFAC',a:'#BA8F85',h:'#EEDED3',b:'#10150E'},sh:{p:'#D3D582',s:'#CAE185',a:'#BC7F7E',h:'#ECF2A1',b:'#181C0F'}},
    {k:'670',n:'Floette',hp:'#F4BDC9',ap:'#78C850',pal:{p:'#96B280',s:'#CEBCAF',a:'#B38C78',h:'#F1E1D7',b:'#11160E'},sh:{p:'#AFD884',s:'#D1DA87',a:'#BCB67F',h:'#E7EBA1',b:'#181B0F'}},
    {k:'671',n:'Florges',hp:'#F4BDC9',ap:'#78C850',pal:{p:'#82A773',s:'#D1BDAC',a:'#B88C81',h:'#EFDED3',b:'#10150D'},sh:{p:'#CED27F',s:'#CCE184',a:'#B97D7A',h:'#ECF3A2',b:'#181B0F'}},
    {k:'672',n:'Skiddo',hp:'#78C850',ap:'#E8C068',pal:{p:'#53AD51',s:'#C9C762',a:'#BBA945',h:'#E1F29B',b:'#091809'},sh:{p:'#98C149',s:'#D8D06B',a:'#8B954F',h:'#ECEF97',b:'#151C09'}},
    {k:'673',n:'Gogoat',hp:'#78C850',ap:'#E8C068',pal:{p:'#68B159',s:'#C0C267',a:'#C0A550',h:'#E3EE97',b:'#0B180A'},sh:{p:'#BBD255',s:'#CBCC6A',a:'#899A57',h:'#F7F59A',b:'#171D0A'}},
    {k:'674',n:'Pancham',hp:'#A8A878',ap:'#78C850',pal:{p:'#A5895E',s:'#A8C286',a:'#93893F',h:'#DDE4AC',b:'#16110B'},sh:{p:'#B7BE5E',s:'#BFCE82',a:'#419262',h:'#EEEEB3',b:'#17110B'}},
    {k:'675',n:'Pangoro',hp:'#708090',ap:'#78C850',pal:{p:'#67482E',s:'#A7AA76',a:'#776230',h:'#D4CDA8',b:'#100A06'},sh:{p:'#958971',s:'#BBC490',a:'#738A65',h:'#EAEBCE',b:'#14110E'}},
    {k:'676',n:'Furfrou',hp:'#A8A878',ap:'#F4BDC9',pal:{p:'#9C754A',s:'#E3BEA5',a:'#C47369',h:'#F5D7BA',b:'#160E08'},sh:{p:'#7D7872',s:'#DED4DA',a:'#A9D971',h:'#F7F1EB',b:'#0E0D10'}},
    {k:'677',n:'Espurr',hp:'#A040A0',ap:'#F4BDC9',pal:{p:'#C156A1',s:'#C081D6',a:'#CAC483',h:'#FBC0EA',b:'#190A17'},sh:{p:'#63B66A',s:'#CADDCA',a:'#DB73AB',h:'#D9F6D8',b:'#0A180C'}},
    {k:'678',n:'Meowstic',hp:'#A040A0',ap:'#6890F0',pal:{p:'#BA4E98',s:'#A77CDE',a:'#C4B983',h:'#E3B6E9',b:'#190916'},sh:{p:'#63BD6C',s:'#ABD6D6',a:'#B96EB7',h:'#CAF3DD',b:'#0A190C'}},
    {k:'679',n:'Honedge',hp:'#B8B8D0',ap:'#F8D030',pal:{p:'#B7BCC5',s:'#D9C889',a:'#7A836E',h:'#F8F3D1',b:'#131619'},sh:{p:'#D6D3D9',s:'#DBC892',a:'#73BE7B',h:'#FCF3CC',b:'#16161A'}},
    {k:'680',n:'Doublade',hp:'#B8B8D0',ap:'#F8D030',pal:{p:'#9FA6AF',s:'#DECC92',a:'#7C8D73',h:'#F3EECD',b:'#121518'},sh:{p:'#C3C4CB',s:'#E1CD98',a:'#B4B876',h:'#FEF5CF',b:'#16161A'}},
    {k:'681',n:'Aegislash',hp:'#B8B8D0',ap:'#F8D030',pal:{p:'#A8AFB8',s:'#E2D196',a:'#819274',h:'#F3EDCC',b:'#121518'},sh:{p:'#CCCDD4',s:'#E4D19B',a:'#B7BB7B',h:'#FEF6CF',b:'#16161A'}},
    {k:'682',n:'Spritzee',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#D59FB7',s:'#BD90BC',a:'#81A1A9',h:'#EAC0E7',b:'#1C1015'},sh:{p:'#A8BFD4',s:'#AAB9CB',a:'#C84F96',h:'#D2E6F3',b:'#0E191D'}},
    {k:'683',n:'Aromatisse',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#F2B7D1',s:'#C295C4',a:'#81A1B4',h:'#EFC5EC',b:'#1E1117'},sh:{p:'#B2CADF',s:'#B3C2D2',a:'#C84FA4',h:'#CFE2EF',b:'#0E191E'}},
    {k:'684',n:'Swirlix',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#EAB4C8',s:'#C49AC7',a:'#82A1A5',h:'#E8BFE3',b:'#1D1116'},sh:{p:'#BDDDE8',s:'#ADBCCA',a:'#C75AA3',h:'#D1E6F0',b:'#0F1A1E'}},
    {k:'685',n:'Slurpuff',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#D7A1AF',s:'#C496C2',a:'#7EA3A6',h:'#E8BFE3',b:'#1C1015'},sh:{p:'#A8C6D5',s:'#AAB9CB',a:'#CA529F',h:'#D1E6F1',b:'#0E191D'}},
    {k:'686',n:'Inkay',hp:'#6890F0',ap:'#F8D030',pal:{p:'#3D80C4',s:'#BBCE9A',a:'#BD9A3F',h:'#DEEACB',b:'#08141E'},sh:{p:'#5ACDD9',s:'#DEDDA5',a:'#9998B0',h:'#E8F4CF',b:'#091A1C'}},
    {k:'687',n:'Malamar',hp:'#705898',ap:'#F8D030',pal:{p:'#5E4187',s:'#B79284',a:'#AD6F65',h:'#DFC3CF',b:'#09060E'},sh:{p:'#4F3A77',s:'#A69C7A',a:'#76C17D',h:'#D0D2CA',b:'#06080D'}},
    {k:'688',n:'Binacle',hp:'#B8A038',ap:'#C03028',pal:{p:'#95733F',s:'#B97242',a:'#9D7138',h:'#E3B279',b:'#151007'},sh:{p:'#629948',s:'#B59C54',a:'#8BC33B',h:'#E9D988',b:'#131507'}},
    {k:'689',n:'Barbaracle',hp:'#B8A038',ap:'#C03028',pal:{p:'#A07548',s:'#BA7246',a:'#9F733E',h:'#E3AF7A',b:'#161107'},sh:{p:'#5CA451',s:'#C1A65B',a:'#89C239',h:'#E4DA89',b:'#131608'}},
    {k:'690',n:'Skrelp',hp:'#78C850',ap:'#A040A0',pal:{p:'#71B465',s:'#9C897B',a:'#A09D65',h:'#D6D9B9',b:'#0B180A'},sh:{p:'#B1C75C',s:'#A2AB81',a:'#946B7C',h:'#DEE7B3',b:'#171C0A'}},
    {k:'691',n:'Dragalge',hp:'#78C850',ap:'#A040A0',pal:{p:'#599D4C',s:'#A29180',a:'#B6A467',h:'#D1D3B5',b:'#0A1709'},sh:{p:'#A9BE4A',s:'#A8B182',a:'#97737F',h:'#E1EAB5',b:'#161C09'}},
    {k:'692',n:'Clauncher',hp:'#6890F0',ap:'#F8D030',pal:{p:'#458AD0',s:'#BCCF9B',a:'#C1AE44',h:'#E4F0D1',b:'#08151E'},sh:{p:'#5CCAD6',s:'#DBDDA5',a:'#9DA2B4',h:'#E5F2CB',b:'#09191C'}},
    {k:'693',n:'Clawitzer',hp:'#6890F0',ap:'#C03028',pal:{p:'#3980BA',s:'#9E848E',a:'#A17636',h:'#DED0CD',b:'#08141D'},sh:{p:'#497FC7',s:'#C4B29F',a:'#B29474',h:'#E0E1CB',b:'#08191A'}},
    {k:'694',n:'Helioptile',hp:'#F8D030',ap:'#A8A878',pal:{p:'#EACE38',s:'#D8C87D',a:'#8D8367',h:'#F6EB9D',b:'#1D1906'},sh:{p:'#A3D82B',s:'#D8C26E',a:'#7F8198',h:'#F3E79B',b:'#1C1706'}},
    {k:'695',n:'Heliolisk',hp:'#F8D030',ap:'#A8A878',pal:{p:'#EED249',s:'#D8C382',a:'#90856B',h:'#F5E99E',b:'#1D1907'},sh:{p:'#AEDC3D',s:'#D8BC73',a:'#828799',h:'#F3E69B',b:'#1C1706'}},
    {k:'696',n:'Tyrunt',hp:'#C03028',ap:'#E8C068',pal:{p:'#946147',s:'#CBA568',a:'#69767B',h:'#E4C492',b:'#150C07'},sh:{p:'#8E9C8D',s:'#D7D3B0',a:'#C9AC56',h:'#FDF3D2',b:'#131513'}},
    {k:'697',n:'Tyrantrum',hp:'#C03028',ap:'#F8D030',pal:{p:'#956A4B',s:'#D5A260',a:'#677969',h:'#E5C88C',b:'#150D07'},sh:{p:'#909D8D',s:'#E3DBA9',a:'#C5A954',h:'#FEF7CD',b:'#131513'}},
    {k:'698',n:'Amaura',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#7A807B',s:'#C8B39E',a:'#8592AE',h:'#E0D2BC',b:'#10110F'},sh:{p:'#6EA2B1',s:'#DCE1EB',a:'#D69F8C',h:'#F0F2F6',b:'#0E1618'}},
    {k:'699',n:'Aurorus',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#767C78',s:'#C8B29E',a:'#8690AD',h:'#E1D4BE',b:'#10110F'},sh:{p:'#6C9CAF',s:'#DCE2EB',a:'#D6A18B',h:'#F1F4F7',b:'#0E1618'}},
    {k:'700',n:'Sylveon',hp:'#F4BDC9',ap:'#6890F0',pal:{p:'#EEE2EA',s:'#D48FC0',a:'#73BFED',h:'#ECF0FA',b:'#1A1318'},sh:{p:'#F4E8F1',s:'#76B2EB',a:'#CC8CC5',h:'#EFF3FD',b:'#14181A'}},
    {k:'701',n:'Hawlucha',hp:'#78C850',ap:'#C03028',pal:{p:'#70B062',s:'#B0814B',a:'#95612E',h:'#E1D68D',b:'#0B180A'},sh:{p:'#BFD261',s:'#C2A357',a:'#9D8469',h:'#F4E993',b:'#171D0A'}},
    {k:'702',n:'Dedenne',hp:'#F08030',ap:'#F8D030',pal:{p:'#D49D3D',s:'#F2CD6C',a:'#D05B31',h:'#FCE884',b:'#1C1306'},sh:{p:'#A9D350',s:'#F0D27B',a:'#7E80A4',h:'#FEEE95',b:'#1B1708'}},
    {k:'703',n:'Carbink',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#7D7E68',s:'#C9B892',a:'#E1BE83',h:'#DBCDA6',b:'#11120E'},sh:{p:'#7BB496',s:'#C6D19F',a:'#B7E48C',h:'#E5EEB7',b:'#10170E'}},
    {k:'704',n:'Goomy',hp:'#A040A0',ap:'#78C850',pal:{p:'#3D4F9B',s:'#7AAA67',a:'#C3BA50',h:'#A9BCE3',b:'#080B16'},sh:{p:'#478A61',s:'#9DD170',a:'#B87551',h:'#CFF0AA',b:'#09160C'}},
    {k:'705',n:'Sliggoo',hp:'#A040A0',ap:'#78C850',pal:{p:'#434B9E',s:'#81AD6A',a:'#BFB74C',h:'#AABBE3',b:'#080B17'},sh:{p:'#4A8E6C',s:'#A7D573',a:'#B5714E',h:'#CEF0AA',b:'#09160C'}},
    {k:'706',n:'Goodra',hp:'#A040A0',ap:'#78C850',pal:{p:'#444DA2',s:'#7EAE6A',a:'#C6BE4F',h:'#AABAE4',b:'#080B17'},sh:{p:'#4C926E',s:'#A1D673',a:'#BA7950',h:'#CEF1AA',b:'#09170C'}},
    {k:'707',n:'Klefki',hp:'#B8B8D0',ap:'#F8D030',pal:{p:'#9B9FA9',s:'#DFCE92',a:'#7A8A71',h:'#F5F0CE',b:'#121418'},sh:{p:'#C8C4CC',s:'#E1CF97',a:'#74C182',h:'#FEF7CE',b:'#161619'}},
    {k:'708',n:'Phantump',hp:'#78C850',ap:'#705898',pal:{p:'#53436A',s:'#8467A8',a:'#BA5F9D',h:'#D2BFE3',b:'#09080C'},sh:{p:'#AFB29F',s:'#BDB5B8',a:'#816CA8',h:'#E4E5DE',b:'#131410'}},
    {k:'709',n:'Trevenant',hp:'#C03028',ap:'#705898',pal:{p:'#7B3F6C',s:'#9465A8',a:'#A34E98',h:'#DAB2DE',b:'#0E060C'},sh:{p:'#CCC4A9',s:'#C9BAB9',a:'#7F5BA1',h:'#E8E3DD',b:'#181711'}},
    {k:'710',n:'Pumpkaboo',hp:'#F08030',ap:'#78C850',pal:{p:'#D66E2A',s:'#B3B84C',a:'#C38A3B',h:'#E8E184',b:'#1C0B05'},sh:{p:'#D0B343',s:'#C5CB5A',a:'#4D7742',h:'#F1F590',b:'#1C1706'}},
    {k:'711',n:'Gourgeist',hp:'#F08030',ap:'#705898',pal:{p:'#E85635',s:'#AA7F65',a:'#BE5B7B',h:'#E5BBA4',b:'#1D0A06'},sh:{p:'#D1BF4A',s:'#A99479',a:'#93847B',h:'#DBD7AB',b:'#1C1807'}},
    {k:'712',n:'Bergmite',hp:'#6890F0',ap:'#A8A878',pal:{p:'#75C4E1',s:'#CAD8D2',a:'#849EA1',h:'#DFF2EE',b:'#0A181F'},sh:{p:'#B1EFF1',s:'#DADFD4',a:'#898BB0',h:'#F1F6EE',b:'#0E1B1E'}},
    {k:'713',n:'Avalugg',hp:'#6890F0',ap:'#B8B8D0',pal:{p:'#71AFE0',s:'#D2E4F1',a:'#86A7C6',h:'#E0F3FA',b:'#0A171F'},sh:{p:'#A2B4E8',s:'#E5ECF4',a:'#C596D5',h:'#EEF3F7',b:'#0D1A1D'}},
    {k:'714',n:'Noibat',hp:'#A890F0',ap:'#6890F0',pal:{p:'#4882C0',s:'#7AB196',a:'#CFC47C',h:'#ABC8FD',b:'#07101A'},sh:{p:'#679988',s:'#AFD2A8',a:'#B56076',h:'#D0E7C3',b:'#0B1611'}},
    {k:'715',n:'Noivern',hp:'#705898',ap:'#6890F0',pal:{p:'#3A559A',s:'#6C9C88',a:'#C5AE80',h:'#A8BAFD',b:'#060A15'},sh:{p:'#436D58',s:'#9AB794',a:'#AF6178',h:'#C7DEC3',b:'#08120A'}},
    {k:'716',n:'Xerneas',hp:'#003366',ap:'#78C850',pal:{p:'#193C76',s:'#76C4CD',a:'#C4B859',h:'#B2E9E9',b:'#040814'},sh:{p:'#C6E9EF',s:'#79A9B1',a:'#D0848E',h:'#DDF8EC',b:'#0F1B1B'}},
    {k:'717',n:'Yveltal',hp:'#C03028',ap:'#705898',pal:{p:'#1B1B20',s:'#A9363C',a:'#ABA3BF',h:'#F08A96',b:'#040404'},sh:{p:'#DBDBDB',s:'#BB535B',a:'#666273',h:'#EEEBF2',b:'#171717'}},
    {k:'718',n:'Zygarde',hp:'#78C850',ap:'#F8D030',pal:{p:'#4E9A48',s:'#CDCE53',a:'#B49534',h:'#E2F590',b:'#091709'},sh:{p:'#99BA44',s:'#DAD257',a:'#88B07A',h:'#F5F892',b:'#161C09'}},
    {k:'719',n:'Diancie',hp:'#F4BDC9',ap:'#B8B8D0',pal:{p:'#F3B8D0',s:'#D5C9D7',a:'#81AFD9',h:'#F6E2EE',b:'#1E1117'},sh:{p:'#B3D7E0',s:'#D4DEE6',a:'#CD909D',h:'#DDF0F6',b:'#0E1A1E'}},
    {k:'720',n:'Hoopa',hp:'#A040A0',ap:'#F8D030',pal:{p:'#7F4EA1',s:'#D1907F',a:'#819643',h:'#E8C2CF',b:'#100816'},sh:{p:'#50A78B',s:'#B1CB85',a:'#B88E92',h:'#E2FAC6',b:'#091813'}},
    {k:'721',n:'Volcanion',hp:'#C03028',ap:'#6890F0',pal:{p:'#B13B2E',s:'#9D8987',a:'#79765F',h:'#E7C3AE',b:'#190705'},sh:{p:'#AF9043',s:'#A6BA9E',a:'#835F9B',h:'#E3E6B4',b:'#191507'}},
    {k:'722',n:'Rowlet',hp:'#78C850',ap:'#E8C068',pal:{p:'#86BA69',s:'#EADA9D',a:'#657449',h:'#DBEEAD',b:'#0C190B'},sh:{p:'#5EA88D',s:'#DCCD86',a:'#8FA274',h:'#CAE8A9',b:'#0A180A'}},
    {k:'723',n:'Dartrix',hp:'#78C850',ap:'#A8A878',pal:{p:'#7EB465',s:'#E0D8A3',a:'#566F4A',h:'#D0E7AB',b:'#0C180A'},sh:{p:'#61B096',s:'#D1CB88',a:'#899675',h:'#C6EAAE',b:'#0A180B'}},
    {k:'724',n:'Decidueye',hp:'#78C850',ap:'#705898',pal:{p:'#95B86A',s:'#CDBDA2',a:'#707E7A',h:'#D2E1B2',b:'#0D180B'},sh:{p:'#67B39D',s:'#C9B68D',a:'#887F6F',h:'#C2E4B4',b:'#0B180B'}},
    {k:'725',n:'Litten',hp:'#C03028',ap:'#A8A878',pal:{p:'#A5522C',s:'#E1924F',a:'#CF6A43',h:'#F3C07F',b:'#150805'},sh:{p:'#88AB3C',s:'#E0C064',a:'#86956E',h:'#F6EB8F',b:'#161307'}},
    {k:'726',n:'Torracat',hp:'#C03028',ap:'#F8D030',pal:{p:'#754E32',s:'#E2AA6E',a:'#E9AF3D',h:'#F2C391',b:'#110A06'},sh:{p:'#A48D57',s:'#EBD475',a:'#A0978F',h:'#FEEBAA',b:'#141109'}},
    {k:'727',n:'Incineroar',hp:'#C03028',ap:'#F8D030',pal:{p:'#1A1B1F',s:'#DB5E32',a:'#F5BB48',h:'#FC926F',b:'#040404'},sh:{p:'#2B2730',s:'#E0C844',a:'#A2EE2F',h:'#FEE886',b:'#060608'}},
    {k:'728',n:'Popplio',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#4F7ED5',s:'#F8EBF4',a:'#DD6DAC',h:'#D5E1F8',b:'#08131F'},sh:{p:'#5C5BE4',s:'#FAE9F4',a:'#FBE4B3',h:'#DDEEF9',b:'#0A181F'}},
    {k:'729',n:'Brionne',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#529BD3',s:'#F0E4EB',a:'#D973B0',h:'#D4E5F7',b:'#09151E'},sh:{p:'#695EE2',s:'#FBEBF5',a:'#F7DDAE',h:'#DEEDF9',b:'#0A171F'}},
    {k:'730',n:'Primarina',hp:'#6890F0',ap:'#A040A0',pal:{p:'#4C7EDB',s:'#EAD4EC',a:'#CF519C',h:'#CCD5F5',b:'#08131F'},sh:{p:'#5252D8',s:'#EBD3EC',a:'#ECB197',h:'#D0DDF1',b:'#0A171E'}},
    {k:'731',n:'Pikipek',hp:'#C03028',ap:'#A8A878',pal:{p:'#887FA3',s:'#D8B88C',a:'#A05F42',h:'#E2DBD6',b:'#101017'},sh:{p:'#C1C4B7',s:'#DFD9C3',a:'#B69057',h:'#F3EDD4',b:'#151717'}},
    {k:'732',n:'Trumbeak',hp:'#C03028',ap:'#F08030',pal:{p:'#787295',s:'#E3AA79',a:'#BE4936',h:'#E5CFC4',b:'#0F1016'},sh:{p:'#C0C3B6',s:'#F1D7B6',a:'#C28E43',h:'#FDEECC',b:'#151717'}},
    {k:'733',n:'Toucannon',hp:'#F08030',ap:'#F8D030',pal:{p:'#95869D',s:'#F0C97B',a:'#C76B32',h:'#EBE6CA',b:'#111117'},sh:{p:'#C5C6B3',s:'#F1E4B3',a:'#BCA454',h:'#FAF2C9',b:'#161817'}},
    {k:'734',n:'Yungoos',hp:'#E8C068',ap:'#A8A878',pal:{p:'#CC9762',s:'#C3A967',a:'#95826B',h:'#EACE9E',b:'#1B1209'},sh:{p:'#98CB59',s:'#C6B368',a:'#44813A',h:'#EFE5A3',b:'#191709'}},
    {k:'735',n:'Gumshoos',hp:'#E8C068',ap:'#A8A878',pal:{p:'#B9994E',s:'#D1B170',a:'#967E68',h:'#E8D29D',b:'#1A1208'},sh:{p:'#8DB742',s:'#CAB56D',a:'#4E833D',h:'#ECE0A1',b:'#181607'}},
    {k:'736',n:'Grubbin',hp:'#E8C068',ap:'#A8A878',pal:{p:'#A1A440',s:'#BCC564',a:'#856D96',h:'#E4DF90',b:'#161808'},sh:{p:'#89D442',s:'#C6D272',a:'#C3BF71',h:'#F2F29E',b:'#191B08'}},
    {k:'737',n:'Charjabug',hp:'#F8D030',ap:'#78C850',pal:{p:'#A0AE3A',s:'#B7D15B',a:'#817A88',h:'#E4F18C',b:'#171A07'},sh:{p:'#76CC3A',s:'#C9DC6C',a:'#ADA389',h:'#E6F493',b:'#191B07'}},
    {k:'738',n:'Vikavolt',hp:'#6890F0',ap:'#F8D030',pal:{p:'#6E9E64',s:'#CED569',a:'#A28284',h:'#E7EE9C',b:'#10190E'},sh:{p:'#A1D878',s:'#E6E77B',a:'#C97F87',h:'#F0FAA7',b:'#131C0E'}},
    {k:'739',n:'Crabrawler',hp:'#6890F0',ap:'#C03028',pal:{p:'#A15A57',s:'#D8A472',a:'#D69746',h:'#EEB598',b:'#150B0D'},sh:{p:'#5EA9DD',s:'#D4CACE',a:'#C55070',h:'#DCE5E4',b:'#0A181E'}},
    {k:'740',n:'Crabominable',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#9A505E',s:'#DDBF95',a:'#EAC887',h:'#F3BFAF',b:'#150B0D'},sh:{p:'#58BFD5',s:'#D4DDEC',a:'#D979A7',h:'#DCF4F9',b:'#0A191E'}},
    {k:'741',n:'Oricorio',hp:'#F4BDC9',ap:'#C03028',pal:{p:'#EAADBF',s:'#DE9996',a:'#75717B',h:'#F5BFB8',b:'#1D1016'},sh:{p:'#B6D8E8',s:'#D4BCA8',a:'#BE4A65',h:'#E1E0CC',b:'#0E1A1E'}},
    {k:'742',n:'Cutiefly',hp:'#F8D030',ap:'#F4BDC9',pal:{p:'#9DB040',s:'#DDD182',a:'#8A74B3',h:'#EEE99C',b:'#171A07'},sh:{p:'#7BDA45',s:'#E7E08F',a:'#D6A676',h:'#F4F6AA',b:'#191B08'}},
    {k:'743',n:'Ribombee',hp:'#F8D030',ap:'#F4BDC9',pal:{p:'#AFAF39',s:'#D4CD7B',a:'#967AB6',h:'#F2E79D',b:'#171A07'},sh:{p:'#5DCB3A',s:'#E6E393',a:'#D99576',h:'#EAF1A6',b:'#181B07'}},
    {k:'744',n:'Rockruff',hp:'#E8C068',ap:'#A8A878',pal:{p:'#AD7F48',s:'#C0AC5F',a:'#BAB05B',h:'#DFC68A',b:'#171107'},sh:{p:'#7BA349',s:'#B5BC6D',a:'#69BF58',h:'#E4DF96',b:'#151508'}},
    {k:'745',n:'Lycanroc',hp:'#C03028',ap:'#E8C068',pal:{p:'#995238',s:'#D8AF76',a:'#BB5F40',h:'#F2C99B',b:'#160A07'},sh:{p:'#7D736C',s:'#D6C8AC',a:'#C7AD56',h:'#FDF3D3',b:'#100E0F'}},
    {k:'746',n:'Wishiwashi',hp:'#6890F0',ap:'#F8D030',pal:{p:'#3E79C2',s:'#ACD7BB',a:'#DFB147',h:'#D8E9DE',b:'#08141E'},sh:{p:'#5AC1D6',s:'#DEECC9',a:'#A086AD',h:'#E1F6E2',b:'#09191C'}},
    {k:'747',n:'Mareanie',hp:'#A040A0',ap:'#6890F0',pal:{p:'#88469A',s:'#8F77CC',a:'#9FBF86',h:'#CEBAFC',b:'#110816'},sh:{p:'#48A099',s:'#7BCAD7',a:'#A770C6',h:'#C5F3F6',b:'#081713'}},
    {k:'748',n:'Toxapex',hp:'#6890F0',ap:'#A040A0',pal:{p:'#3E71B8',s:'#8990C2',a:'#A3A269',h:'#D0CCF5',b:'#08141D'},sh:{p:'#4E6FC5',s:'#A2B8C6',a:'#B95163',h:'#CFE4EE',b:'#09181A'}},
    {k:'749',n:'Mudbray',hp:'#E8C068',ap:'#B8A038',pal:{p:'#C3A654',s:'#E0B463',a:'#846130',h:'#E9D08B',b:'#1B1308'},sh:{p:'#8FC048',s:'#D1B960',a:'#388B2B',h:'#EBE090',b:'#191608'}},
    {k:'750',n:'Mudsdale',hp:'#E8C068',ap:'#B8A038',pal:{p:'#CD9356',s:'#D8B35B',a:'#876F36',h:'#EECC8D',b:'#1B1208'},sh:{p:'#85BC45',s:'#D3C265',a:'#428D2D',h:'#E8DE8B',b:'#181607'}},
    {k:'751',n:'Dewpider',hp:'#6890F0',ap:'#78C850',pal:{p:'#67995E',s:'#A3D270',a:'#958F94',h:'#D4ED9E',b:'#10190E'},sh:{p:'#96D36F',s:'#BFE682',a:'#B07F89',h:'#DFF9AA',b:'#131C0E'}},
    {k:'752',n:'Araquanid',hp:'#6890F0',ap:'#78C850',pal:{p:'#4490C8',s:'#88D5C4',a:'#CCC556',h:'#C9EDED',b:'#08151E'},sh:{p:'#61D9DE',s:'#C1E9D1',a:'#8A85AA',h:'#D1F7ED',b:'#091A1C'}},
    {k:'753',n:'Fomantis',hp:'#78C850',ap:'#F4BDC9',pal:{p:'#75B461',s:'#D2C597',a:'#B6B897',h:'#EBF1BA',b:'#0B180A'},sh:{p:'#BAC658',s:'#D6D8A7',a:'#A98A87',h:'#EBF2BA',b:'#171C0A'}},
    {k:'754',n:'Lurantis',hp:'#F4BDC9',ap:'#78C850',pal:{p:'#E1A9C1',s:'#B2C7A0',a:'#99C28F',h:'#E7E3C7',b:'#1D1016'},sh:{p:'#B1C9DF',s:'#C4E4AF',a:'#9C8A6F',h:'#D9F7D9',b:'#0E191E'}},
    {k:'755',n:'Morelull',hp:'#A040A0',ap:'#F4BDC9',pal:{p:'#B74242',s:'#EDCDCB',a:'#89B87E',h:'#F4B3BA',b:'#18070A'},sh:{p:'#92C0CB',s:'#E1E9EE',a:'#E473AF',h:'#F0F6F6',b:'#0C191A'}},
    {k:'756',n:'Shiinotic',hp:'#A040A0',ap:'#F4BDC9',pal:{p:'#C2505A',s:'#E7C2C3',a:'#84AF82',h:'#F8B9C1',b:'#18080B'},sh:{p:'#A0D1D6',s:'#DBE5E7',a:'#D97098',h:'#F2F8F7',b:'#0D1A1B'}},
    {k:'757',n:'Salandit',hp:'#C03028',ap:'#A8A878',pal:{p:'#AF332B',s:'#CA9D5B',a:'#817361',h:'#F2BE8F',b:'#190605'},sh:{p:'#BB9544',s:'#D0BE69',a:'#8F6444',h:'#F6E79B',b:'#191507'}},
    {k:'758',n:'Salazzle',hp:'#C03028',ap:'#A040A0',pal:{p:'#B63533',s:'#B97473',a:'#69645A',h:'#E8A2A1',b:'#190706'},sh:{p:'#C3964C',s:'#A7A27E',a:'#B0507A',h:'#ECE2A9',b:'#1A1508'}},
    {k:'759',n:'Stufful',hp:'#F4BDC9',ap:'#78C850',pal:{p:'#A3735B',s:'#C1C08B',a:'#697545',h:'#E7D9AF',b:'#180D0B'},sh:{p:'#B2AE99',s:'#D1DBA6',a:'#707B6B',h:'#E4EBCB',b:'#151614'}},
    {k:'760',n:'Bewear',hp:'#F4BDC9',ap:'#C03028',pal:{p:'#A26A5A',s:'#D4A184',a:'#8C6A65',h:'#ECBDA5',b:'#180D0B'},sh:{p:'#BBB7A4',s:'#DEBF9E',a:'#A47685',h:'#F1DCC9',b:'#161714'}},
    {k:'761',n:'Bounsweet',hp:'#F4BDC9',ap:'#78C850',pal:{p:'#88AE79',s:'#AAD479',a:'#BB9162',h:'#D6F4B2',b:'#10160E'},sh:{p:'#D6D286',s:'#CCE186',a:'#7AAB65',h:'#ECF3A2',b:'#181B0F'}},
    {k:'762',n:'Steenee',hp:'#F4BDC9',ap:'#78C850',pal:{p:'#7DA874',s:'#ABD679',a:'#B98E5E',h:'#D4F4B3',b:'#10150E'},sh:{p:'#CCD181',s:'#CEE486',a:'#76A961',h:'#ECF5A3',b:'#181B0F'}},
    {k:'763',n:'Tsareena',hp:'#78C850',ap:'#F4BDC9',pal:{p:'#68A856',s:'#C7CC81',a:'#D5897B',h:'#E2F5B7',b:'#0B180A'},sh:{p:'#C1CE59',s:'#EDDE95',a:'#90A479',h:'#F9F4A5',b:'#1A1C09'}},
    {k:'764',n:'Comfey',hp:'#78C850',ap:'#F4BDC9',pal:{p:'#64AF5C',s:'#E9BCBA',a:'#D48793',h:'#FAE4DA',b:'#0A180A'},sh:{p:'#C9CA57',s:'#E8DF97',a:'#D07BA5',h:'#F5ECA0',b:'#1B1C09'}},
    {k:'765',n:'Oranguru',hp:'#A040A0',ap:'#A8A878',pal:{p:'#703B8B',s:'#B3789A',a:'#809459',h:'#D8B8DE',b:'#100815'},sh:{p:'#3C907D',s:'#9DBC9A',a:'#AB6A72',h:'#D4F2D9',b:'#081712'}},
    {k:'766',n:'Passimian',hp:'#78C850',ap:'#A8A878',pal:{p:'#6BAF55',s:'#B3BB6C',a:'#ADA052',h:'#E0F1A7',b:'#0B180A'},sh:{p:'#4ECB46',s:'#CFCE7B',a:'#539561',h:'#E5EFA5',b:'#151C09'}},
    {k:'767',n:'Wimpod',hp:'#78C850',ap:'#B8B8D0',pal:{p:'#77A849',s:'#C9CE7B',a:'#8A81B5',h:'#DEEDA3',b:'#111A08'},sh:{p:'#B7D755',s:'#DEDF8E',a:'#BC8195',h:'#ECF8AE',b:'#181D09'}},
    {k:'768',n:'Golisopod',hp:'#6890F0',ap:'#B8B8D0',pal:{p:'#6D975E',s:'#B8CC90',a:'#9088BE',h:'#DDE7B1',b:'#10180E'},sh:{p:'#A0CF71',s:'#D2E1A5',a:'#C67FB0',h:'#E9F6BE',b:'#131C0E'}},
    {k:'769',n:'Sandygast',hp:'#E8C068',ap:'#705898',pal:{p:'#CA9054',s:'#C6A371',a:'#937A7A',h:'#E4C2A0',b:'#1B1208'},sh:{p:'#84BA43',s:'#C1AF77',a:'#899A74',h:'#DCD29D',b:'#181607'}},
    {k:'770',n:'Palossand',hp:'#E8C068',ap:'#705898',pal:{p:'#C8A251',s:'#CCA871',a:'#937977',h:'#E5C8A0',b:'#1B1308'},sh:{p:'#90B840',s:'#BCAF74',a:'#879A74',h:'#DDD09D',b:'#181607'}},
    {k:'771',n:'Pyukumuku',hp:'#F4BDC9',ap:'#A8A878',pal:{p:'#EDB2CA',s:'#D7C1B1',a:'#809391',h:'#F3DAD5',b:'#1D1016'},sh:{p:'#BBE2EB',s:'#CFCFBB',a:'#AD6E6A',h:'#E3F1E8',b:'#0E1B1E'}},
    {k:'772',n:'Type-Null',hp:'#A8A878',ap:'#C03028',pal:{p:'#C09E75',s:'#D28E7B',a:'#8F685B',h:'#F3C5A5',b:'#17120C'},sh:{p:'#CACD6D',s:'#D7AC83',a:'#A4B563',h:'#F5D7AA',b:'#18120C'}},
    {k:'773',n:'Silvally',hp:'#A8A878',ap:'#C03028',pal:{p:'#A88A60',s:'#CE8D77',a:'#8B6154',h:'#F0C3A1',b:'#16110B'},sh:{p:'#BBC15F',s:'#D3A979',a:'#95B05B',h:'#F8DAAB',b:'#17110B'}},
    {k:'774',n:'Minior',hp:'#C03028',ap:'#6890F0',pal:{p:'#BB322E',s:'#9F8E89',a:'#7E7A65',h:'#E6C0AD',b:'#190605'},sh:{p:'#BA8F44',s:'#A6BCA0',a:'#8664A1',h:'#E3E4B3',b:'#191507'}},
    {k:'775',n:'Komala',hp:'#78C850',ap:'#E8C068',pal:{p:'#75B55D',s:'#BEC166',a:'#B7A14A',h:'#E8F098',b:'#0B180A'},sh:{p:'#57CF4D',s:'#D4D372',a:'#479855',h:'#E8EE95',b:'#161C09'}},
    {k:'776',n:'Turtonator',hp:'#F08030',ap:'#F8D030',pal:{p:'#DD5034',s:'#E7A93B',a:'#AE6E2E',h:'#FED57F',b:'#1D0906'},sh:{p:'#C7B23B',s:'#EBD655',a:'#6C7F65',h:'#FCF084',b:'#1C1706'}},
    {k:'777',n:'Togedemaru',hp:'#B8B8D0',ap:'#F8D030',pal:{p:'#ADB1BD',s:'#E8DC98',a:'#818F7A',h:'#F7F3CF',b:'#121519'},sh:{p:'#D1CAD4',s:'#EBDDA1',a:'#7ECC86',h:'#FBF4CA',b:'#16161A'}},
    {k:'778',n:'Mimikyu',hp:'#F8D030',ap:'#705898',pal:{p:'#D1BD68',s:'#43313C',a:'#BD4355',h:'#EDDC91',b:'#1A1708'},sh:{p:'#A3BE57',s:'#363140',a:'#B271DE',h:'#DCC993',b:'#16140B'}},
    {k:'779',n:'Bruxish',hp:'#F4BDC9',ap:'#F8D030',pal:{p:'#E1A8BA',s:'#F3D79B',a:'#899D7E',h:'#FCDFBE',b:'#1D1016'},sh:{p:'#B1D1E0',s:'#E4DDA3',a:'#BC9099',h:'#E8F2CE',b:'#0E1A1E'}},
    {k:'780',n:'Drampa',hp:'#A8A878',ap:'#78C850',pal:{p:'#BE9D73',s:'#AFC789',a:'#969A45',h:'#E2E8B0',b:'#17120C'},sh:{p:'#C6CB6A',s:'#C5CF89',a:'#489563',h:'#EAEAB1',b:'#18120C'}},
    {k:'781',n:'Dhelmise',hp:'#78C850',ap:'#705898',pal:{p:'#5C9C49',s:'#878C71',a:'#BC9184',h:'#CFDCB9',b:'#0A1709'},sh:{p:'#A1AF42',s:'#919676',a:'#93976A',h:'#D6DEB5',b:'#161B09'}},
    {k:'782',n:'Jangmo-o',hp:'#B8B8D0',ap:'#F8D030',pal:{p:'#5587B2',s:'#A1BF61',a:'#CEBF56',h:'#C3D4E5',b:'#091018'},sh:{p:'#70997F',s:'#D3DA76',a:'#D37A48',h:'#E4EEA9',b:'#0D160F'}},
    {k:'783',n:'Hakamo-o',hp:'#B8B8D0',ap:'#78C850',pal:{p:'#5282AC',s:'#7FBC6D',a:'#C1BD63',h:'#AFCFE4',b:'#091018'},sh:{p:'#76A084',s:'#B6DA7B',a:'#B78545',h:'#D8F2AF',b:'#0E170F'}},
    {k:'784',n:'Kommo-o',hp:'#B8B8D0',ap:'#78C850',pal:{p:'#516AAA',s:'#85C16E',a:'#BCC158',h:'#B2CDE8',b:'#090E18'},sh:{p:'#6B9377',s:'#B7D87B',a:'#B36D43',h:'#D4ECAB',b:'#0D160E'}},
    {k:'785',n:'Tapu-Koko',hp:'#F8D030',ap:'#000000',pal:{p:'#EDCC41',s:'#B99F68',a:'#6D6151',h:'#E4D892',b:'#1D1906'},sh:{p:'#ACDA33',s:'#B99759',a:'#817B93',h:'#E1D490',b:'#1C1706'}},
    {k:'786',n:'Tapu-Lele',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#F0B7CD',s:'#C599C2',a:'#80A2AA',h:'#EBC1E7',b:'#1E1116'},sh:{p:'#C0E5EF',s:'#ABB7CB',a:'#C85797',h:'#D3E9F3',b:'#0F1B1E'}},
    {k:'787',n:'Tapu-Bulu',hp:'#78C850',ap:'#C03028',pal:{p:'#50A14C',s:'#B88A4F',a:'#9A6A2D',h:'#DED88D',b:'#091709'},sh:{p:'#9DC24B',s:'#CCAE5A',a:'#816540',h:'#F1E994',b:'#161C09'}},
    {k:'788',n:'Tapu-Fini',hp:'#6890F0',ap:'#A8A878',pal:{p:'#3D76C3',s:'#99CBD1',a:'#D7AE5C',h:'#CBE3EE',b:'#08141E'},sh:{p:'#58BFD8',s:'#D0E7E2',a:'#9078B7',h:'#D5F1F1',b:'#09191C'}},
    {k:'789',n:'Cosmog',hp:'#6890F0',ap:'#A040A0',pal:{p:'#363670',s:'#715EB0',a:'#CC9A66',h:'#C2ADF3',b:'#070910'},sh:{p:'#AD6871',s:'#CBAB84',a:'#806291',h:'#EBC1CE',b:'#150D0D'}},
    {k:'790',n:'Cosmoem',hp:'#F8D030',ap:'#6890F0',pal:{p:'#5F4E44',s:'#7477B5',a:'#B7A071',h:'#C3BCE7',b:'#0C0A08'},sh:{p:'#CD6B48',s:'#C9B881',a:'#6B78A5',h:'#EECAC5',b:'#1B0C07'}},
    {k:'791',n:'Solgaleo',hp:'#F8D030',ap:'#A8A878',pal:{p:'#F3F0E9',s:'#D2A651',a:'#C7654C',h:'#F6F6F1',b:'#181815'},sh:{p:'#BF4634',s:'#E7BC5D',a:'#E3E3D8',h:'#F6B9A3',b:'#1B0706'}},
    {k:'792',n:'Lunala',hp:'#705898',ap:'#6890F0',pal:{p:'#2A1B49',s:'#5757B4',a:'#CAAE7C',h:'#B3AAFB',b:'#050409'},sh:{p:'#CA4059',s:'#CEA973',a:'#5E678A',h:'#EFBACB',b:'#1A0708'}},
    {k:'793',n:'Nihilego',hp:'#A8A878',ap:'#F4BDC9',pal:{p:'#57494A',s:'#A984CB',a:'#94BBC9',h:'#DBC7ED',b:'#0A0809'},sh:{p:'#D9CBC9',s:'#F0E0EB',a:'#D3B473',h:'#FEF7F2',b:'#181416'}},
    {k:'794',n:'Buzzwole',hp:'#C03028',ap:'#78C850',pal:{p:'#582E3A',s:'#8F7EA0',a:'#7AC09F',h:'#CEC0CD',b:'#0B0508'},sh:{p:'#D7C6BF',s:'#D3DCB8',a:'#B3BD58',h:'#F1F7D0',b:'#181516'}},
    {k:'795',n:'Pheromosa',hp:'#A8A878',ap:'#6890F0',pal:{p:'#524646',s:'#817CD8',a:'#76B0C2',h:'#CCC4F3',b:'#0A0809'},sh:{p:'#D4C5C5',s:'#CCD4EE',a:'#A6A481',h:'#EFF3F6',b:'#181416'}},
    {k:'796',n:'Xurkitree',hp:'#F8D030',ap:'#A8A878',pal:{p:'#EDCD37',s:'#E2D783',a:'#887E65',h:'#F6EA91',b:'#1D1906'},sh:{p:'#A6DA2A',s:'#DFCD6F',a:'#8675BD',h:'#F3E58F',b:'#1C1706'}},
    {k:'797',n:'Celesteela',hp:'#78C850',ap:'#B8B8D0',pal:{p:'#91AC96',s:'#C5CDC5',a:'#88B6C8',h:'#E5EEE5',b:'#101614'},sh:{p:'#BECBAC',s:'#E3E7DC',a:'#C6C174',h:'#F4F8E8',b:'#161815'}},
    {k:'798',n:'Kartana',hp:'#A8A878',ap:'#B8B8D0',pal:{p:'#504445',s:'#9688CE',a:'#7DBDC4',h:'#D1C5EC',b:'#0A0809'},sh:{p:'#CEC0C0',s:'#DFD8E4',a:'#BFAA6F',h:'#F7F4F0',b:'#171316'}},
    {k:'799',n:'Guzzlord',hp:'#705898',ap:'#F8D030',pal:{p:'#322A4E',s:'#9D78A6',a:'#9FBFA7',h:'#CFBEDF',b:'#06040A'},sh:{p:'#ACA5C5',s:'#DFD1C0',a:'#D6C55B',h:'#F2F0E2',b:'#121017'}},
    {k:'800',n:'Necrozma',hp:'#333333',ap:'#FFFFFF',pal:{p:'#17161F',s:'#2F2F39',a:'#F3B248',h:'#D5D5E5',b:'#030306'},sh:{p:'#302B34',s:'#53535E',a:'#60E652',h:'#F0F0FF',b:'#060608'}},
    {k:'801',n:'Magearna',hp:'#B8B8D0',ap:'#F4BDC9',pal:{p:'#A1A6B1',s:'#E1D6DC',a:'#84BBDA',h:'#EFEAF4',b:'#121518'},sh:{p:'#C6C6CE',s:'#EDE4EC',a:'#E3B87C',h:'#FBF7F9',b:'#16161A'}},
    {k:'802',n:'Marshadow',hp:'#708090',ap:'#78C850',pal:{p:'#222331',s:'#64627A',a:'#C17E83',h:'#BEBEDF',b:'#040407'},sh:{p:'#3E3344',s:'#73847A',a:'#4FC256',h:'#DCE4E1',b:'#060609'}},
    {k:'803',n:'Poipole',hp:'#A040A0',ap:'#6890F0',pal:{p:'#402E54',s:'#7564D3',a:'#7AC1CF',h:'#C4BAFD',b:'#09050C'},sh:{p:'#A4B9C3',s:'#B8CFEB',a:'#B29693',h:'#E0F0F7',b:'#121518'}},
    {k:'804',n:'Naganadel',hp:'#A040A0',ap:'#F8D030',pal:{p:'#452E56',s:'#A078A9',a:'#8DC395',h:'#D7BFE0',b:'#09050C'},sh:{p:'#AEC5CF',s:'#DDDCC0',a:'#D1B864',h:'#F5FADF',b:'#121518'}},
    {k:'805',n:'Stakataka',hp:'#B8A038',ap:'#6890F0',pal:{p:'#4E423E',s:'#8678CA',a:'#8BC7C9',h:'#C4BAE3',b:'#0A0808'},sh:{p:'#C5C4BF',s:'#C5D2E5',a:'#BAB18C',h:'#E9F1E9',b:'#161416'}},
    {k:'806',n:'Blacephalon',hp:'#A8A878',ap:'#F08030',pal:{p:'#524546',s:'#A776A9',a:'#969E8E',h:'#DDC0D4',b:'#0A0809'},sh:{p:'#D3C4C5',s:'#EECEC0',a:'#BD9A43',h:'#FDEED7',b:'#171416'}},
    {k:'807',n:'Zeraora',hp:'#F8D030',ap:'#6890F0',pal:{p:'#E9CE3F',s:'#CEC7A2',a:'#83817D',h:'#EDE9A5',b:'#1D1906'},sh:{p:'#B1E835',s:'#CCBC89',a:'#BF5DE5',h:'#EFEAA6',b:'#1D1806'}},
    {k:'808',n:'Meltan',hp:'#B8B8D0',ap:'#F08030',pal:{p:'#A5AAB4',s:'#E0C3B4',a:'#899699',h:'#EEE3DD',b:'#121518'},sh:{p:'#C8C8D0',s:'#EED6C4',a:'#C69B48',h:'#FDF0E1',b:'#16161A'}},
    {k:'809',n:'Melmetal',hp:'#B8B8D0',ap:'#A8A878',pal:{p:'#9FA3AF',s:'#CFCFC5',a:'#71ACB4',h:'#E5E7E9',b:'#121418'},sh:{p:'#C2C2CA',s:'#DFDDD3',a:'#C7AF5E',h:'#F5F4EC',b:'#161619'}},
    {k:'810',n:'Grookey',hp:'#78C850',ap:'#E8C068',pal:{p:'#52A854',s:'#9D6D39',a:'#E1B84B',h:'#CBECA0',b:'#091809'},sh:{p:'#59C580',s:'#AA793C',a:'#58EC51',h:'#DDEFAF',b:'#0C190A'}},
    {k:'811',n:'Thwackey',hp:'#78C850',ap:'#E8C068',pal:{p:'#5CAE54',s:'#9B6D36',a:'#E3CC50',h:'#D2F0A2',b:'#0A1809'},sh:{p:'#54BD6C',s:'#A77C3E',a:'#71EE57',h:'#DCEAAB',b:'#0C180A'}},
    {k:'812',n:'Rillaboom',hp:'#78C850',ap:'#E8C068',pal:{p:'#5BA450',s:'#9A6C3A',a:'#E1AD50',h:'#CDE89E',b:'#0A1809'},sh:{p:'#56BF6A',s:'#A6773D',a:'#6BEC57',h:'#DEECAD',b:'#0C180A'}},
    {k:'813',n:'Scorbunny',hp:'#F08030',ap:'#A8A878',pal:{p:'#EFF0E8',s:'#E86C3C',a:'#CDBA5D',h:'#F6F6F1',b:'#161613'},sh:{p:'#EBE6EF',s:'#D85B38',a:'#AD7BD8',h:'#EAE9F1',b:'#17171B'}},
    {k:'814',n:'Raboot',hp:'#F08030',ap:'#A8A878',pal:{p:'#EEEEE6',s:'#E35B3D',a:'#C7B35F',h:'#F5F5F0',b:'#161613'},sh:{p:'#E9E4ED',s:'#D44A38',a:'#A57BD2',h:'#E9EAF1',b:'#17171B'}},
    {k:'815',n:'Cinderace',hp:'#F08030',ap:'#A8A878',pal:{p:'#EEEFE7',s:'#E6633C',a:'#CAB65E',h:'#F5F5F0',b:'#161613'},sh:{p:'#EAE5EE',s:'#D75238',a:'#A87BD5',h:'#E9E9F1',b:'#17171B'}},
    {k:'816',n:'Sobble',hp:'#6890F0',ap:'#A8A878',pal:{p:'#5AA5D6',s:'#BCD8E7',a:'#D2BB63',h:'#D3EDF0',b:'#09181F'},sh:{p:'#8369DC',s:'#D1C6E5',a:'#D2C665',h:'#E2DAF1',b:'#110B1D'}},
    {k:'817',n:'Drizzile',hp:'#6890F0',ap:'#78C850',pal:{p:'#5D9ADB',s:'#B1DEE0',a:'#C6CA55',h:'#CFF0ED',b:'#09171F'},sh:{p:'#8B64D0',s:'#CBD0E0',a:'#C6B657',h:'#DADAE9',b:'#110B1D'}},
    {k:'818',n:'Inteleon',hp:'#6890F0',ap:'#78C850',pal:{p:'#629FDA',s:'#B1E5E0',a:'#BEC253',h:'#D0F1ED',b:'#0A171F'},sh:{p:'#9671E0',s:'#C3CDE0',a:'#BECE55',h:'#DEDEED',b:'#110C1E'}},
    {k:'819',n:'Skwovet',hp:'#E8C068',ap:'#78C850',pal:{p:'#C79B5E',s:'#B0BE64',a:'#90893E',h:'#DEDA90',b:'#1B1209'},sh:{p:'#ADC853',s:'#B8C861',a:'#40926E',h:'#E5E592',b:'#191608'}},
    {k:'820',n:'Greedent',hp:'#E8C068',ap:'#C03028',pal:{p:'#BF9F53',s:'#D4764D',a:'#896153',h:'#F3C08A',b:'#1A1308'},sh:{p:'#89AF43',s:'#CB9657',a:'#91A857',h:'#ECD18A',b:'#181507'}},
    {k:'821',n:'Rookidee',hp:'#6890F0',ap:'#A8A878',pal:{p:'#6399CB',s:'#C8C1A3',a:'#BB794F',h:'#D9E7EE',b:'#0A151E'},sh:{p:'#A3D5DC',s:'#D8DCD6',a:'#B89B70',h:'#EBF0E9',b:'#10181C'}},
    {k:'822',n:'Corvisquire',hp:'#6890F0',ap:'#A8A878',pal:{p:'#658FC6',s:'#C8C1A3',a:'#B7664A',h:'#D6E2EA',b:'#0A141E'},sh:{p:'#AED9E5',s:'#D8DDD6',a:'#B5A36B',h:'#F0F5EE',b:'#11191D'}},
    {k:'823',n:'Corviknight',hp:'#B8B8D0',ap:'#6890F0',pal:{p:'#333141',s:'#6F69AC',a:'#B271C5',h:'#C8C0FB',b:'#060609'},sh:{p:'#514958',s:'#7885A6',a:'#89BF85',h:'#E1E8FD',b:'#08080B'}},
    {k:'824',n:'Blipbug',hp:'#78C850',ap:'#6890F0',pal:{p:'#75A943',s:'#AFC783',a:'#8C7FB6',h:'#D4E9A5',b:'#111A08'},sh:{p:'#B6D950',s:'#C3DB96',a:'#A772A9',h:'#E0F3B0',b:'#181D09'}},
    {k:'825',n:'Dottler',hp:'#6890F0',ap:'#78C850',pal:{p:'#65985D',s:'#A8D370',a:'#908D91',h:'#D3EC9E',b:'#10180E'},sh:{p:'#92D06E',s:'#C5E884',a:'#AC7C88',h:'#DEF9AA',b:'#131C0E'}},
    {k:'826',n:'Orbeetle',hp:'#C03028',ap:'#6890F0',pal:{p:'#938939',s:'#B1B27C',a:'#7368AD',h:'#DEDBA0',b:'#151507'},sh:{p:'#BFC94F',s:'#C8D493',a:'#A863A1',h:'#E6F3AF',b:'#191B08'}},
    {k:'827',n:'Nickit',hp:'#C03028',ap:'#E8C068',pal:{p:'#974737',s:'#D7AD77',a:'#BB6145',h:'#F1C69B',b:'#160A07'},sh:{p:'#7C756A',s:'#DED0B3',a:'#C7AA52',h:'#FDF6D3',b:'#0F0E0F'}},
    {k:'828',n:'Thievul',hp:'#C03028',ap:'#E8C068',pal:{p:'#90432D',s:'#D7B577',a:'#BF5D43',h:'#F1C699',b:'#160A06'},sh:{p:'#756963',s:'#D5CAAA',a:'#CCAC5A',h:'#FDF3D2',b:'#0F0E0F'}},
    {k:'829',n:'Gossifleur',hp:'#78C850',ap:'#F4BDC9',pal:{p:'#5EA74B',s:'#CCC895',a:'#CAC6A1',h:'#E6EEB5',b:'#0A1809'},sh:{p:'#B7CA47',s:'#CDD9A2',a:'#B39990',h:'#EFF6BC',b:'#171C09'}},
    {k:'830',n:'Eldegoss',hp:'#78C850',ap:'#A8A878',pal:{p:'#60AF5E',s:'#BFC476',a:'#A28A45',h:'#D6EDA5',b:'#0A180A'},sh:{p:'#A8CF5C',s:'#CFC97A',a:'#76854E',h:'#ECF4AA',b:'#161D0A'}},
    {k:'831',n:'Wooloo',hp:'#A8A878',ap:'#F4BDC9',pal:{p:'#AB9062',s:'#E9C7BE',a:'#908C8F',h:'#F5DDCC',b:'#16110B'},sh:{p:'#B9C561',s:'#DDD2C4',a:'#BDBE6E',h:'#F6EED9',b:'#17110B'}},
    {k:'832',n:'Dubwool',hp:'#A8A878',ap:'#C03028',pal:{p:'#BA9B6C',s:'#D4927B',a:'#8F6559',h:'#F2C5A3',b:'#17120C'},sh:{p:'#CDD66A',s:'#D9AE7F',a:'#96B55F',h:'#F8DBAB',b:'#18120C'}},
    {k:'833',n:'Chewtle',hp:'#78C850',ap:'#F08030',pal:{p:'#5799A8',s:'#D7C5A7',a:'#B27684',h:'#DEE8CD',b:'#091618'},sh:{p:'#B48EBD',s:'#E6C7B2',a:'#868394',h:'#F7E5D1',b:'#131018'}},
    {k:'834',n:'Drednaw',hp:'#78C850',ap:'#F08030',pal:{p:'#5197A7',s:'#D7C8A8',a:'#B97B84',h:'#E2ECD0',b:'#091618'},sh:{p:'#A882AF',s:'#E9CDB3',a:'#848BA3',h:'#F2E1CD',b:'#131017'}},
    {k:'835',n:'Yamper',hp:'#F8D030',ap:'#E8C068',pal:{p:'#EEC73D',s:'#EED47E',a:'#938462',h:'#FDE98E',b:'#1D1806'},sh:{p:'#B3DC30',s:'#E8CA6A',a:'#8986B8',h:'#F9E68C',b:'#1C1706'}},
    {k:'836',n:'Boltund',hp:'#F8D030',ap:'#A8A878',pal:{p:'#E5B13C',s:'#DCC87F',a:'#857D64',h:'#F6E594',b:'#1D1706'},sh:{p:'#88D32F',s:'#E2C271',a:'#7B6CB6',h:'#F3EC92',b:'#1C1806'}},
    {k:'837',n:'Rolycoly',hp:'#B8A038',ap:'#F08030',pal:{p:'#966F3F',s:'#CF9346',a:'#E58D48',h:'#E5BC76',b:'#151007'},sh:{p:'#6FA64D',s:'#C1B252',a:'#5BB13F',h:'#F3E48A',b:'#141608'}},
    {k:'838',n:'Carkol',hp:'#B8A038',ap:'#F08030',pal:{p:'#9C894D',s:'#D88C50',a:'#DE7B42',h:'#E3C378',b:'#161208'},sh:{p:'#69AD5C',s:'#CEB25B',a:'#5EAD3C',h:'#EDE58C',b:'#141609'}},
    {k:'839',n:'Coalossal',hp:'#B8A038',ap:'#C03028',pal:{p:'#8D663C',s:'#B57143',a:'#9C6739',h:'#E0AC77',b:'#151007'},sh:{p:'#539C49',s:'#B9A153',a:'#72C033',h:'#E8DF8B',b:'#131508'}},
    {k:'840',n:'Applin',hp:'#78C850',ap:'#F08030',pal:{p:'#56A756',s:'#CEC25F',a:'#DC653D',h:'#DBED9F',b:'#0A180A'},sh:{p:'#C6CD58',s:'#EDCE6C',a:'#80914A',h:'#FDEC8C',b:'#1B1C09'}},
    {k:'841',n:'Flapple',hp:'#78C850',ap:'#C03028',pal:{p:'#68A755',s:'#B0A95C',a:'#C55142',h:'#DBE09B',b:'#0B180A'},sh:{p:'#C2CC56',s:'#E1C96E',a:'#828249',h:'#F6E488',b:'#1B1C09'}},
    {k:'842',n:'Appletun',hp:'#78C850',ap:'#E8C068',pal:{p:'#5DA956',s:'#C3CE66',a:'#D0854D',h:'#DFF8A8',b:'#0A180A'},sh:{p:'#C1BA53',s:'#E5D778',a:'#90A559',h:'#F5E88F',b:'#1A1B09'}},
    {k:'843',n:'Silicobra',hp:'#E8C068',ap:'#A8A878',pal:{p:'#C5A951',s:'#DEC071',a:'#7B6040',h:'#EAD396',b:'#1B1308'},sh:{p:'#8DC245',s:'#D0C56D',a:'#46833E',h:'#ECE299',b:'#191607'}},
    {k:'844',n:'Sandaconda',hp:'#E8C068',ap:'#A8A878',pal:{p:'#C59B56',s:'#D8B36D',a:'#958068',h:'#E9CF97',b:'#1B1208'},sh:{p:'#A1C24A',s:'#CBB86A',a:'#457E3D',h:'#ECDD9A',b:'#191608'}},
    {k:'845',n:'Cramorant',hp:'#6890F0',ap:'#78C850',pal:{p:'#3A6EBD',s:'#80C6A7',a:'#CFC34E',h:'#C9EDD4',b:'#08131E'},sh:{p:'#56B9D1',s:'#BAE2AF',a:'#7C9490',h:'#D7F7D7',b:'#09191B'}},
    {k:'846',n:'Arrokuda',hp:'#6890F0',ap:'#F08030',pal:{p:'#458BC8',s:'#B9A696',a:'#E88D48',h:'#DFDCC9',b:'#08151E'},sh:{p:'#63D6DE',s:'#DBCCA7',a:'#8C6079',h:'#E8EDCF',b:'#0A1A1C'}},
    {k:'847',n:'Barraskewda',hp:'#6890F0',ap:'#F8D030',pal:{p:'#3D79B5',s:'#B6C791',a:'#B4993B',h:'#E2EDCF',b:'#08141D'},sh:{p:'#58BEC8',s:'#D9D59C',a:'#9188A7',h:'#EBF7D1',b:'#09191B'}},
    {k:'848',n:'Toxel',hp:'#6890F0',ap:'#A040A0',pal:{p:'#3D85C6',s:'#8C8FC5',a:'#B2AC72',h:'#CFCDF5',b:'#08141E'},sh:{p:'#5AD4DB',s:'#A2BBCD',a:'#B55EBA',h:'#D3EBF3',b:'#091A1C'}},
    {k:'849',n:'Toxtricity',hp:'#A040A0',ap:'#F8D030',pal:{p:'#7C4699',s:'#D1927D',a:'#93A24D',h:'#E3BECA',b:'#100816'},sh:{p:'#489F8A',s:'#B1CC88',a:'#BD999E',h:'#DDF6C3',b:'#081712'}},
    {k:'850',n:'Sizzlipede',hp:'#F08030',ap:'#C03028',pal:{p:'#E35C32',s:'#E08D3F',a:'#BE422B',h:'#F8BF78',b:'#1D0906'},sh:{p:'#CD9F44',s:'#DFA95D',a:'#7B5B5C',h:'#F5D685',b:'#1C1706'}},
    {k:'851',n:'Centiskorch',hp:'#F08030',ap:'#F8D030',pal:{p:'#E95D29',s:'#F1CC42',a:'#D77030',h:'#FED577',b:'#1D0905'},sh:{p:'#D2A83E',s:'#EFDB5F',a:'#85856B',h:'#FBE883',b:'#1C1706'}},
    {k:'852',n:'Clobbopus',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#F1BBC6',s:'#CA9DCB',a:'#779AA3',h:'#ECC3E5',b:'#1E1116'},sh:{p:'#C4DDF0',s:'#B1C1D0',a:'#BF4D8B',h:'#D4E8F4',b:'#0F1A1E'}},
    {k:'853',n:'Grapploct',hp:'#6890F0',ap:'#A040A0',pal:{p:'#3E7FB8',s:'#8C93C2',a:'#B5A46D',h:'#CECBF3',b:'#08141D'},sh:{p:'#5AC6CC',s:'#A1B8C6',a:'#A55AB2',h:'#D3E9F0',b:'#09191B'}},
    {k:'854',n:'Sinistea',hp:'#A040A0',ap:'#E8C068',pal:{p:'#583582',s:'#B479A9',a:'#C884A3',h:'#D9B7E4',b:'#0A0710'},sh:{p:'#A9C3BE',s:'#DDDEBF',a:'#A672A9',h:'#F1F5E4',b:'#121714'}},
    {k:'855',n:'Polteageist',hp:'#A040A0',ap:'#E8C068',pal:{p:'#5F408B',s:'#A873A5',a:'#C07F93',h:'#DDBCE9',b:'#0B0710'},sh:{p:'#B6CDC8',s:'#DCD9BB',a:'#AD6EA1',h:'#F4F8E7',b:'#131715'}},
    {k:'856',n:'Hatenna',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#E8AFC8',s:'#C294C2',a:'#82A3B1',h:'#EDC3E9',b:'#1D1016'},sh:{p:'#B8D0E7',s:'#AFC1D0',a:'#C94F8E',h:'#D4E9F5',b:'#0E1A1E'}},
    {k:'857',n:'Hattrem',hp:'#F4BDC9',ap:'#78C850',pal:{p:'#F6BCD6',s:'#B5CAA2',a:'#9AC391',h:'#EAE6C9',b:'#1E1117'},sh:{p:'#B7CFE3',s:'#C9E7B4',a:'#9C8F7A',h:'#D4F1D4',b:'#0E1A1E'}},
    {k:'858',n:'Hatterene',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#DEA5B3',s:'#C294C2',a:'#7DA3B3',h:'#EFC4E8',b:'#1D1015'},sh:{p:'#A1BCCC',s:'#A9B5C8',a:'#CA53A8',h:'#CEE3EE',b:'#0D191D'}},
    {k:'859',n:'Impidimp',hp:'#705898',ap:'#F4BDC9',pal:{p:'#532F7A',s:'#BC85C8',a:'#C79CD8',h:'#E0BCF6',b:'#09050E'},sh:{p:'#422668',s:'#9B99C1',a:'#E0F28B',h:'#C6CEF5',b:'#05070D'}},
    {k:'860',n:'Morgrem',hp:'#A040A0',ap:'#F4BDC9',pal:{p:'#7E489A',s:'#D48AC0',a:'#99C6A9',h:'#E3B9F1',b:'#100816'},sh:{p:'#4AA08C',s:'#ACD2D2',a:'#E27AAF',h:'#D3F6EE',b:'#081713'}},
    {k:'861',n:'Grimmsnarl',hp:'#705898',ap:'#78C850',pal:{p:'#282138',s:'#696886',a:'#BE78A0',h:'#C3B9E3',b:'#040408'},sh:{p:'#3E324A',s:'#72857C',a:'#50C45F',h:'#D8E3E5',b:'#060609'}},
    {k:'862',n:'Obstagoon',hp:'#708090',ap:'#C03028',pal:{p:'#191A21',s:'#7D444A',a:'#AF5C5D',h:'#C09FA5',b:'#040406'},sh:{p:'#302B36',s:'#876358',a:'#83BE3C',h:'#E0CDC3',b:'#060608'}},
    {k:'863',n:'Perrserker',hp:'#B8B8D0',ap:'#F8D030',pal:{p:'#A58A65',s:'#E9CE8D',a:'#C1A745',h:'#F3E3B0',b:'#14100D'},sh:{p:'#DBD28F',s:'#F1D892',a:'#8DA09D',h:'#FEF2C1',b:'#1A170F'}},
    {k:'864',n:'Cursola',hp:'#A8A878',ap:'#A040A0',pal:{p:'#A88D5E',s:'#BC91A7',a:'#81725E',h:'#E1C2CC',b:'#16110B'},sh:{p:'#B6C15D',s:'#ACABA4',a:'#AC904F',h:'#E8E1CF',b:'#17110B'}},
    {k:'865',n:'Sirfetchd',hp:'#78C850',ap:'#A8A878',pal:{p:'#5BA751',s:'#B8BF71',a:'#AC8E4E',h:'#D7ECA4',b:'#0A1809'},sh:{p:'#ACC84F',s:'#CAC976',a:'#818E57',h:'#EDF2A7',b:'#161C09'}},
    {k:'866',n:'Mr-Rime',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#4C93C9',s:'#B4BAD0',a:'#CAC3A2',h:'#DEE4F2',b:'#08151E'},sh:{p:'#68DBDD',s:'#C9D5E2',a:'#BD7ABF',h:'#DCF5F9',b:'#0A1A1C'}},
    {k:'867',n:'Runerigus',hp:'#E8C068',ap:'#705898',pal:{p:'#C2A34E',s:'#AB8C76',a:'#915676',h:'#DDC0B2',b:'#1B1308'},sh:{p:'#85B33C',s:'#999274',a:'#6F9852',h:'#D3CCAE',b:'#181607'}},
    {k:'868',n:'Milcery',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#F6B9C8',s:'#E7C3DF',a:'#B56A9B',h:'#F5CDE4',b:'#1F1116'},sh:{p:'#CBDDEA',s:'#D7D4E7',a:'#CA54A6',h:'#E8E7F2',b:'#101A1E'}},
    {k:'869',n:'Alcremie',hp:'#F4BDC9',ap:'#C03028',pal:{p:'#ECB1CB',s:'#E7B7BB',a:'#B05676',h:'#F8C9CF',b:'#1E1016'},sh:{p:'#C3DAE0',s:'#DEC8C3',a:'#C54E81',h:'#EEE3DC',b:'#101A1E'}},
    {k:'870',n:'Falinks',hp:'#B8B8D0',ap:'#C03028',pal:{p:'#A8AEB8',s:'#CC9391',a:'#887E8F',h:'#F2D3CC',b:'#121518'},sh:{p:'#CBC6CF',s:'#D5B5A1',a:'#8CC43A',h:'#F5E3CA',b:'#161619'}},
    {k:'871',n:'Pincurchin',hp:'#F8D030',ap:'#705898',pal:{p:'#EBB447',s:'#AD9889',a:'#87597A',h:'#E4CEAF',b:'#1D1807'},sh:{p:'#A4EB3F',s:'#A99676',a:'#9B93AC',h:'#E4DEB1',b:'#1D1907'}},
    {k:'872',n:'Snom',hp:'#6890F0',ap:'#78C850',pal:{p:'#739D64',s:'#ACCF6C',a:'#928B8E',h:'#DAF0A2',b:'#10190E'},sh:{p:'#9CC96F',s:'#CAE384',a:'#A97D92',h:'#DEF5AA',b:'#131C0E'}},
    {k:'873',n:'Frosmoth',hp:'#6890F0',ap:'#A040A0',pal:{p:'#669C62',s:'#AFB387',a:'#9370AB',h:'#D8D8AD',b:'#10190E'},sh:{p:'#95D673',s:'#C2CD99',a:'#C557A6',h:'#E0EBB8',b:'#131C0E'}},
    {k:'874',n:'Stonjourner',hp:'#B8A038',ap:'#A8A878',pal:{p:'#A08047',s:'#BBA760',a:'#C6BA5C',h:'#D9C686',b:'#161107'},sh:{p:'#6BA451',s:'#B4BE6F',a:'#6ECC57',h:'#E3E796',b:'#141608'}},
    {k:'875',n:'Eiscue',hp:'#6890F0',ap:'#A8A878',pal:{p:'#6FBCD4',s:'#CBDAD3',a:'#83A19C',h:'#DCEEE9',b:'#0A181F'},sh:{p:'#A7D2E4',s:'#E4EADE',a:'#818DAC',h:'#EFF3ED',b:'#0E1A1D'}},
    {k:'876',n:'Indeedee',hp:'#A040A0',ap:'#F4BDC9',pal:{p:'#6F4095',s:'#CF86BC',a:'#9AC5A5',h:'#E0B8F0',b:'#0F0815'},sh:{p:'#429B96',s:'#AED8D6',a:'#DF72AE',h:'#D2F5F0',b:'#081713'}},
    {k:'877',n:'Morpeko',hp:'#F8D030',ap:'#705898',pal:{p:'#D8B844',s:'#CBB58C',a:'#AC4A60',h:'#E9DB99',b:'#1C1706'},sh:{p:'#ABD74F',s:'#C7B690',a:'#A16BC5',h:'#ECDFA7',b:'#1B1808'}},
    {k:'878',n:'Cufant',hp:'#E8C068',ap:'#A8A878',pal:{p:'#BE904F',s:'#CEAF6C',a:'#7A6040',h:'#EAD19F',b:'#1A1208'},sh:{p:'#A0BC43',s:'#C7B368',a:'#4A843F',h:'#EFDFA3',b:'#181507'}},
    {k:'879',n:'Copperajah',hp:'#E8C068',ap:'#C03028',pal:{p:'#CF9659',s:'#D1884F',a:'#8F695A',h:'#F4B987',b:'#1B1208'},sh:{p:'#87BF47',s:'#D3AD5C',a:'#97B05C',h:'#EED687',b:'#181708'}},
    {k:'880',n:'Dracozolt',hp:'#F8D030',ap:'#6890F0',pal:{p:'#607587',s:'#80B485',a:'#BAAA6B',h:'#B1C5EA',b:'#0C1012'},sh:{p:'#4A9250',s:'#AAC88D',a:'#AE8267',h:'#D0E4AD',b:'#0E1608'}},
    {k:'881',n:'Arctozolt',hp:'#6890F0',ap:'#F8D030',pal:{p:'#78CAE0',s:'#E6E9CD',a:'#92AE9B',h:'#E9F8E7',b:'#0A191F'},sh:{p:'#B9DEEF',s:'#F9F7D7',a:'#969EB1',h:'#FEFAE9',b:'#0E1A1E'}},
    {k:'882',n:'Dracovish',hp:'#6890F0',ap:'#C03028',pal:{p:'#3265B5',s:'#879B66',a:'#D89D40',h:'#B4B6E1',b:'#060E1A'},sh:{p:'#50997B',s:'#B9BB77',a:'#C74B59',h:'#D7DBA5',b:'#09170F'}},
    {k:'883',n:'Arctovish',hp:'#6890F0',ap:'#A8A878',pal:{p:'#7FBDE9',s:'#DCE8E2',a:'#7B96AC',h:'#E3F5F1',b:'#0B1920'},sh:{p:'#B8C3F0',s:'#E6EBE3',a:'#AF87BF',h:'#F4F4EF',b:'#0E1A1E'}},
    {k:'884',n:'Duraludon',hp:'#B8B8D0',ap:'#6890F0',pal:{p:'#AAB0BB',s:'#B9C8E4',a:'#70A5D6',h:'#E0E9FD',b:'#121519'},sh:{p:'#CEC9D2',s:'#CDDBF2',a:'#A2C38F',h:'#E9F0FA',b:'#161619'}},
    {k:'885',n:'Dreepy',hp:'#6890F0',ap:'#78C850',pal:{p:'#3B76B4',s:'#7ABD6E',a:'#CBC14E',h:'#ACCFE7',b:'#060F1A'},sh:{p:'#5BA37E',s:'#B4D677',a:'#A77F55',h:'#D8F3B1',b:'#0A1810'}},
    {k:'886',n:'Drakloak',hp:'#6890F0',ap:'#78C850',pal:{p:'#3671B3',s:'#76BC6C',a:'#CED14E',h:'#AED1E9',b:'#060F1A'},sh:{p:'#509674',s:'#B1D57A',a:'#A9745C',h:'#D2EDAD',b:'#09170F'}},
    {k:'887',n:'Dragapult',hp:'#6890F0',ap:'#705898',pal:{p:'#2B508C',s:'#70AE7E',a:'#CD935B',h:'#9DBFEE',b:'#040C14'},sh:{p:'#447151',s:'#B2BB71',a:'#C1465F',h:'#D5DD9B',b:'#09130A'}},
    {k:'888',n:'Zacian',hp:'#3399FF',ap:'#F8D030',pal:{p:'#BCA97A',s:'#E5C47B',a:'#9A8157',h:'#F5E6A8',b:'#17120C'},sh:{p:'#C5D77B',s:'#E4C078',a:'#629062',h:'#FEEFAF',b:'#18130C'}},
    {k:'889',n:'Zamazenta',hp:'#C03028',ap:'#3399FF',pal:{p:'#B33D2E',s:'#B69573',a:'#6B717A',h:'#E7C0A0',b:'#190705'},sh:{p:'#BE9F48',s:'#BDB781',a:'#716463',h:'#EAE8AA',b:'#1A1607'}},
    {k:'890',n:'Eternatus',hp:'#6600CC',ap:'#C03028',pal:{p:'#B69E6F',s:'#D68E7F',a:'#8D6158',h:'#EEC4A2',b:'#17120C'},sh:{p:'#C1D16F',s:'#DBA983',a:'#9AB25D',h:'#F8DDAD',b:'#18120C'}},
    {k:'891',n:'Kubfu',hp:'#A8A878',ap:'#C03028',pal:{p:'#937044',s:'#D4967B',a:'#885D4F',h:'#EEC5A2',b:'#150E08'},sh:{p:'#C2AE83',s:'#E2B493',a:'#967173',h:'#F8DEC0',b:'#181510'}},
    {k:'892',n:'Urshifu',hp:'#708090',ap:'#C03028',pal:{p:'#6C4F30',s:'#BD866B',a:'#946350',h:'#E4BFA5',b:'#100A06'},sh:{p:'#91896F',s:'#CDA78C',a:'#885A56',h:'#F0D8C4',b:'#14110E'}},
    {k:'893',n:'Zarude',hp:'#78C850',ap:'#E8C068',pal:{p:'#67AA59',s:'#CAC26A',a:'#BA934D',h:'#DFEA97',b:'#0B180A'},sh:{p:'#B5CA58',s:'#D4C96D',a:'#8D9555',h:'#F2F099',b:'#171C0A'}},
    {k:'894',n:'Regieleki',hp:'#F8D030',ap:'#B8B8D0',pal:{p:'#DDC43B',s:'#E3D09C',a:'#868480',h:'#F4EAA0',b:'#1D1806'},sh:{p:'#A6DC32',s:'#E1C283',a:'#A57DD0',h:'#F8ECA2',b:'#1C1706'}},
    {k:'895',n:'Regidrago',hp:'#C03028',ap:'#78C850',pal:{p:'#B84E37',s:'#AE9850',a:'#767B34',h:'#E8CE87',b:'#190806'},sh:{p:'#C5AE51',s:'#C6BF5C',a:'#7A8446',h:'#F1F692',b:'#1A1608'}},
    {k:'896',n:'Glastrier',hp:'#6890F0',ap:'#A8A878',pal:{p:'#75C3DD',s:'#CEDCD4',a:'#829E9E',h:'#DEF0EB',b:'#0A181F'},sh:{p:'#AEECED',s:'#DCE1D6',a:'#878DAD',h:'#F1F6EE',b:'#0E1B1D'}},
    {k:'897',n:'Spectrier',hp:'#705898',ap:'#6890F0',pal:{p:'#312548',s:'#6F5FB5',a:'#C172C9',h:'#C4B4FD',b:'#060409'},sh:{p:'#423354',s:'#6D7EA8',a:'#8CC18D',h:'#D4DDFD',b:'#06070A'}},
    {k:'898',n:'Calyrex',hp:'#6890F0',ap:'#A040A0',pal:{p:'#3D73CC',s:'#908DCB',a:'#B5B172',h:'#CECAF5',b:'#08141E'},sh:{p:'#55B6D1',s:'#AABCD2',a:'#A35FBF',h:'#CDE4EE',b:'#09181B'}},
    {k:'899',n:'Wyrdeer',hp:'#A8A878',ap:'#6890F0',pal:{p:'#C6AE7B',s:'#9DADC0',a:'#969169',h:'#E0E3DB',b:'#18120C'},sh:{p:'#C2D273',s:'#A7C1C5',a:'#9F6B88',h:'#E4E8DA',b:'#18120C'}},
    {k:'900',n:'Kleavor',hp:'#B8A038',ap:'#78C850',pal:{p:'#9C7B45',s:'#A9A655',a:'#C3CD55',h:'#D3CB80',b:'#161107'},sh:{p:'#68A14E',s:'#AFC664',a:'#53BE5E',h:'#DEEB90',b:'#141608'}},
    {k:'901',n:'Ursaluna',hp:'#E8C068',ap:'#B8A038',pal:{p:'#9C7341',s:'#D2AF75',a:'#957E59',h:'#E9CE9A',b:'#160E07'},sh:{p:'#C1AF7D',s:'#DAC88C',a:'#7E7558',h:'#F5E8BA',b:'#19160F'}},
    {k:'902',n:'Basculegion',hp:'#6890F0',ap:'#A8A878',pal:{p:'#3E87BC',s:'#96C8C6',a:'#CCA45D',h:'#CEE5E9',b:'#08151D'},sh:{p:'#59CCD0',s:'#C9DED4',a:'#8D77AC',h:'#D8F1EC',b:'#091A1B'}},
    {k:'903',n:'Sneasler',hp:'#708090',ap:'#F4BDC9',pal:{p:'#191920',s:'#957B8C',a:'#BD8A97',h:'#C7BAD0',b:'#040406'},sh:{p:'#302A35',s:'#8E8E9F',a:'#CBE789',h:'#DDDFF0',b:'#060608'}},
    {k:'904',n:'Overqwil',hp:'#705898',ap:'#F8D030',pal:{p:'#593B80',s:'#B79285',a:'#B77977',h:'#DCBFCC',b:'#09060E'},sh:{p:'#513779',s:'#A69C79',a:'#81CC8C',h:'#D4D6CF',b:'#06080E'}},
    {k:'905',n:'Enamorus',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#D69FAD',s:'#C497C2',a:'#7FA5A8',h:'#E8BFE2',b:'#1C1015'},sh:{p:'#A7C4D4',s:'#AAB7CB',a:'#CC53A3',h:'#D0E5F0',b:'#0E191D'}},
    {k:'906',n:'Sprigatito',hp:'#78C850',ap:'#F4BDC9',pal:{p:'#8A814B',s:'#D9CAA3',a:'#DD9973',h:'#EBE1BA',b:'#121008'},sh:{p:'#C6C66D',s:'#E8D4A6',a:'#928DD3',h:'#F9F0CE',b:'#17180A'}},
    {k:'907',n:'Floragato',hp:'#78C850',ap:'#F4BDC9',pal:{p:'#8D864C',s:'#DACDA3',a:'#DFA272',h:'#EDE3BB',b:'#121108'},sh:{p:'#B9BC67',s:'#E9D7AA',a:'#929FD4',h:'#F3EBC8',b:'#16170A'}},
    {k:'908',n:'Meganium (Paldea)',hp:'#78C850',ap:'#F4BDC9',pal:{p:'#499B48',s:'#D2C996',a:'#C6C199',h:'#E0ECB5',b:'#091709'},sh:{p:'#93BB46',s:'#D4DBA5',a:'#AD928A',h:'#E9F5BC',b:'#151C09'}},
    {k:'909',n:'Fuecoco',hp:'#C03028',ap:'#F8D030',pal:{p:'#DA4634',s:'#F3B744',a:'#EEDCA4',h:'#FEA981',b:'#1C0706'},sh:{p:'#F8C54D',s:'#DD5D2D',a:'#90ACB7',h:'#FEED8A',b:'#1E1807'}},
    {k:'910',n:'Crocalor',hp:'#C03028',ap:'#F8D030',pal:{p:'#DF3A36',s:'#F0B240',a:'#EDDEA4',h:'#FEA581',b:'#1D0706'},sh:{p:'#ECAD4A',s:'#DA6033',a:'#92C1B6',h:'#FCE889',b:'#1D1707'}},
    {k:'911',n:'Skeledirge',hp:'#C03028',ap:'#F8D030',pal:{p:'#D84132',s:'#F2BB45',a:'#F0DDA6',h:'#FEA780',b:'#1C0706'},sh:{p:'#F6C04A',s:'#DD622E',a:'#91B1B8',h:'#FEEC89',b:'#1E1807'}},
    {k:'912',n:'Quaxly',hp:'#6890F0',ap:'#A8A878',pal:{p:'#61A2D3',s:'#E8E7DC',a:'#6A89B0',h:'#D3EAEE',b:'#09181E'},sh:{p:'#7886F2',s:'#E8E2E0',a:'#C67068',h:'#DDF0F1',b:'#0B1920'}},
    {k:'913',n:'Quaxwell',hp:'#6890F0',ap:'#A8A878',pal:{p:'#5E9ED5',s:'#E9E9DD',a:'#6A88B4',h:'#D4EAEF',b:'#09171F'},sh:{p:'#7580F4',s:'#EAE4E2',a:'#D07768',h:'#DCF0F1',b:'#0B1920'}},
    {k:'914',n:'Quaquaval',hp:'#6890F0',ap:'#F08030',pal:{p:'#4387CD',s:'#BBCBCB',a:'#D2A96B',h:'#D7E3E9',b:'#08151E'},sh:{p:'#60C5E3',s:'#E5DFD9',a:'#BF6EB5',h:'#DDEDE9',b:'#09191D'}},
    {k:'915',n:'Lechonk',hp:'#A8A878',ap:'#F4BDC9',pal:{p:'#C09D73',s:'#EACABF',a:'#99939A',h:'#F9E0CF',b:'#17120C'},sh:{p:'#CACD6A',s:'#DFD5C7',a:'#C9BB79',h:'#F1E9D4',b:'#18110C'}},
    {k:'916',n:'Oinkologne',hp:'#A8A878',ap:'#F4BDC9',pal:{p:'#AD8762',s:'#E2C2B6',a:'#928C91',h:'#FAE0CF',b:'#16110B'},sh:{p:'#A2BA5B',s:'#E0D6C7',a:'#BFB26B',h:'#F2ECD5',b:'#17120B'}},
    {k:'917',n:'Tarountula',hp:'#E8C068',ap:'#A8A878',pal:{p:'#8A9E3F',s:'#CBCA68',a:'#796792',h:'#E0E18F',b:'#151808'},sh:{p:'#68CD43',s:'#D6D978',a:'#BEAD67',h:'#E7EE9E',b:'#171B08'}},
    {k:'918',n:'Spidops',hp:'#E8C068',ap:'#A8A878',pal:{p:'#9AAA44',s:'#C1C964',a:'#886994',h:'#E8E792',b:'#161908'},sh:{p:'#6FCE42',s:'#CCD779',a:'#C1AB6B',h:'#E8ED9A',b:'#181B08'}},
    {k:'919',n:'Nymble',hp:'#E8C068',ap:'#A8A878',pal:{p:'#959B3A',s:'#BCC465',a:'#7D6C96',h:'#E1DD8E',b:'#151808'},sh:{p:'#C1C244',s:'#C6D275',a:'#B97184',h:'#EDEE9B',b:'#181B08'}},
    {k:'920',n:'Lokix',hp:'#E8C068',ap:'#705898',pal:{p:'#92A346',s:'#B7AC6D',a:'#7A56A5',h:'#DBD89C',b:'#151808'},sh:{p:'#74D44B',s:'#C5C07B',a:'#B5985D',h:'#E1E7A8',b:'#181B09'}},
    {k:'921',n:'Pawmi',hp:'#F08030',ap:'#F8D030',pal:{p:'#E09547',s:'#ECC564',a:'#CD6F35',h:'#FEE585',b:'#1D1307'},sh:{p:'#BAD053',s:'#E8CC7A',a:'#8092B0',h:'#FBE693',b:'#1B1708'}},
    {k:'922',n:'Pawmo',hp:'#F08030',ap:'#F8D030',pal:{p:'#DB8E36',s:'#EFD767',a:'#D76F36',h:'#FEE681',b:'#1C1306'},sh:{p:'#BAD94B',s:'#ECDB76',a:'#8C85A5',h:'#FEEA92',b:'#1B1708'}},
    {k:'923',n:'Pawmot',hp:'#F08030',ap:'#F8D030',pal:{p:'#DE8A3F',s:'#EDCB68',a:'#D2703A',h:'#FEE384',b:'#1D1206'},sh:{p:'#D4CA5A',s:'#F5D97B',a:'#7B9499',h:'#FEF295',b:'#1C1808'}},
    {k:'924',n:'Tandemaus',hp:'#F4BDC9',ap:'#A8A878',pal:{p:'#E0C06C',s:'#E2C693',a:'#B07558',h:'#F6EAA6',b:'#1D160C'},sh:{p:'#A3C47F',s:'#E0D0A4',a:'#9780AC',h:'#EDEBB5',b:'#16180F'}},
    {k:'925',n:'Maushold',hp:'#F4BDC9',ap:'#C03028',pal:{p:'#E5C06D',s:'#E8B082',a:'#B55446',h:'#F8D996',b:'#1D160C'},sh:{p:'#A4C781',s:'#E5C196',a:'#9E7C88',h:'#F0DEA7',b:'#16180F'}},
    {k:'926',n:'Fidough',hp:'#E8C068',ap:'#A8A878',pal:{p:'#9D773D',s:'#D3BF84',a:'#B96146',h:'#EAD3A4',b:'#170E07'},sh:{p:'#7B7F6D',s:'#D0CCB7',a:'#56C454',h:'#F6F2DA',b:'#0F0E0F'}},
    {k:'927',n:'Dachsbun',hp:'#E8C068',ap:'#A8A878',pal:{p:'#97663A',s:'#CDB380',a:'#B46047',h:'#E9CEA4',b:'#160D07'},sh:{p:'#797968',s:'#CAC5B1',a:'#59BF55',h:'#F6F1DB',b:'#0F0E0F'}},
    {k:'928',n:'Smoliv',hp:'#78C850',ap:'#F8D030',pal:{p:'#56A456',s:'#D5D961',a:'#CE703B',h:'#DAF69F',b:'#0A180A'},sh:{p:'#C3C959',s:'#EED76D',a:'#88AD58',h:'#FBF28C',b:'#1B1C09'}},
    {k:'929',n:'Dolliv',hp:'#78C850',ap:'#F8D030',pal:{p:'#64AC5D',s:'#D1D65D',a:'#CC7F3D',h:'#E1FAA2',b:'#0A180A'},sh:{p:'#D2CB60',s:'#EBD669',a:'#88AC60',h:'#FEF18E',b:'#1B1C09'}},
    {k:'930',n:'Arboliva',hp:'#78C850',ap:'#E8C068',pal:{p:'#57AA5A',s:'#C7D167',a:'#D08549',h:'#DDF8A9',b:'#0A180A'},sh:{p:'#BCC354',s:'#E9D978',a:'#8CA557',h:'#F6EE90',b:'#1A1B09'}},
    {k:'931',n:'Squawkabilly',hp:'#78C850',ap:'#F8D030',pal:{p:'#6998A3',s:'#E2CB81',a:'#C77338',h:'#E2EBCE',b:'#0B1518'},sh:{p:'#C4D7BD',s:'#ECE5B2',a:'#C0BB5C',h:'#FDFAD0',b:'#141918'}},
    {k:'932',n:'Nacli',hp:'#B8A038',ap:'#A8A878',pal:{p:'#A0894B',s:'#BCA25F',a:'#C3B458',h:'#D8C986',b:'#161207'},sh:{p:'#62A452',s:'#B9BF6E',a:'#6FCA54',h:'#DFE696',b:'#131608'}},
    {k:'933',n:'Naclstack',hp:'#B8A038',ap:'#A8A878',pal:{p:'#978244',s:'#BDA062',a:'#C3AB58',h:'#D6C786',b:'#151107'},sh:{p:'#61A753',s:'#BFC16C',a:'#57C954',h:'#E4EC9B',b:'#131608'}},
    {k:'934',n:'Garganacl',hp:'#B8A038',ap:'#C03028',pal:{p:'#9C7745',s:'#C18952',a:'#C28449',h:'#D8AF76',b:'#161107'},sh:{p:'#77A851',s:'#BDA85B',a:'#76CF43',h:'#ECDE8B',b:'#141608'}},
    {k:'935',n:'Charcadet',hp:'#C03028',ap:'#F8D030',pal:{p:'#AA2D2E',s:'#DDA23B',a:'#877850',h:'#FEC37C',b:'#190605'},sh:{p:'#A87F40',s:'#DBBE51',a:'#938167',h:'#FBE585',b:'#191407'}},
    {k:'936',n:'Armarouge',hp:'#C03028',ap:'#F8D030',pal:{p:'#B44D34',s:'#ECA043',a:'#887650',h:'#FECE7F',b:'#190806'},sh:{p:'#C1AC4E',s:'#EABE52',a:'#958064',h:'#FEF289',b:'#1A1608'}},
    {k:'937',n:'Ceruledge',hp:'#6890F0',ap:'#C03028',pal:{p:'#4987C6',s:'#A78E97',a:'#A5693D',h:'#D9CAC7',b:'#08151E'},sh:{p:'#65CFDA',s:'#CEBBA8',a:'#9A5279',h:'#E2E3CD',b:'#0A1A1C'}},
    {k:'938',n:'Tadbulb',hp:'#F8D030',ap:'#6890F0',pal:{p:'#DFC838',s:'#CDCBA3',a:'#847E7D',h:'#EAE8A3',b:'#1D1806'},sh:{p:'#A5DF2F',s:'#CBC18A',a:'#B95CE7',h:'#EEEAA4',b:'#1C1806'}},
    {k:'939',n:'Bellibolt',hp:'#78C850',ap:'#F8D030',pal:{p:'#B7B33B',s:'#E8DF71',a:'#896C2C',h:'#F3EB87',b:'#171707'},sh:{p:'#98D032',s:'#E9D75F',a:'#8B9FC1',h:'#FBEC89',b:'#1B1807'}},
    {k:'940',n:'Wattrel',hp:'#F8D030',ap:'#A8A878',pal:{p:'#94A5A4',s:'#DAC696',a:'#A66546',h:'#E2E7D9',b:'#111617'},sh:{p:'#C9C8B3',s:'#DED9C1',a:'#B3A36E',h:'#F3EDD4',b:'#161817'}},
    {k:'941',n:'Kilowattrel',hp:'#F8D030',ap:'#6890F0',pal:{p:'#8B9A98',s:'#C4C0B2',a:'#A55E67',h:'#D5E1E6',b:'#101616'},sh:{p:'#CBCAB4',s:'#C9D5DD',a:'#A6AA9C',h:'#EEF0E9',b:'#161817'}},
    {k:'942',n:'Maschiff',hp:'#A8A878',ap:'#705898',pal:{p:'#977741',s:'#C1AC99',a:'#B74C5B',h:'#E0C8B4',b:'#150E08'},sh:{p:'#827F73',s:'#C0B8CA',a:'#6EC260',h:'#EDE9EC',b:'#0F0D10'}},
    {k:'943',n:'Mabosstiff',hp:'#705898',ap:'#C03028',pal:{p:'#7D544C',s:'#C2897B',a:'#C44343',h:'#E6B9AC',b:'#110A08'},sh:{p:'#66567C',s:'#BEA2AB',a:'#6AD742',h:'#EFE2E4',b:'#0A0A11'}},
    {k:'944',n:'Shroodle',hp:'#A040A0',ap:'#78C850',pal:{p:'#7F3A95',s:'#968387',a:'#93CD5A',h:'#D3C5D7',b:'#100815'},sh:{p:'#378F84',s:'#90D198',a:'#A3907F',h:'#C8F6C7',b:'#071612'}},
    {k:'945',n:'Grafaiai',hp:'#A040A0',ap:'#78C850',pal:{p:'#7C469D',s:'#968689',a:'#9ACB5F',h:'#D0C4D6',b:'#100816'},sh:{p:'#48A38B',s:'#8ECF91',a:'#A09477',h:'#CCF9C9',b:'#081813'}},
    {k:'946',n:'Bramblin',hp:'#B8A038',ap:'#A8A878',pal:{p:'#87613A',s:'#AF9B61',a:'#A78B54',h:'#D8C38F',b:'#151007'},sh:{p:'#539648',s:'#B6B36B',a:'#5DB249',h:'#E4E9A1',b:'#121507'}},
    {k:'947',n:'Brambleghast',hp:'#B8A038',ap:'#705898',pal:{p:'#6E9C53',s:'#A6AC71',a:'#BF6D6A',h:'#CFDEAF',b:'#0D1609'},sh:{p:'#BAB355',s:'#C0B981',a:'#8E996A',h:'#E3DA9A',b:'#191A09'}},
    {k:'948',n:'Toedscool',hp:'#78C850',ap:'#F4BDC9',pal:{p:'#A5994F',s:'#E2CB87',a:'#A0806D',h:'#ECD6A0',b:'#161408'},sh:{p:'#8CBB43',s:'#D5CE87',a:'#83A368',h:'#EFE2A4',b:'#181808'}},
    {k:'949',n:'Toedscruel',hp:'#78C850',ap:'#A040A0',pal:{p:'#9F974E',s:'#CA9D7A',a:'#855B52',h:'#DFC69F',b:'#161408'},sh:{p:'#84B444',s:'#C0AB78',a:'#A0A481',h:'#E5D7A0',b:'#171808'}},
    {k:'950',n:'Klawf',hp:'#F08030',ap:'#B8A038',pal:{p:'#D34A36',s:'#DEA756',a:'#DBB64E',h:'#F7B985',b:'#1B0806'},sh:{p:'#7FA6A3',s:'#CED4B2',a:'#B87070',h:'#DDE9CA',b:'#101817'}},
    {k:'951',n:'Capsakid',hp:'#78C850',ap:'#F08030',pal:{p:'#6DB15E',s:'#C5BD58',a:'#DB7E43',h:'#E5F2A1',b:'#0B180A'},sh:{p:'#C9B659',s:'#E5CA6C',a:'#86904C',h:'#F9E18A',b:'#1B1B09'}},
    {k:'952',n:'Scovillain',hp:'#C03028',ap:'#78C850',pal:{p:'#7C854B',s:'#A3C15B',a:'#AD7949',h:'#D9EA9E',b:'#0F1308'},sh:{p:'#D1CD54',s:'#D6E16F',a:'#6CA351',h:'#F1F38A',b:'#1B1B09'}},
    {k:'953',n:'Rellor',hp:'#E8C068',ap:'#A8A878',pal:{p:'#99AA48',s:'#CAC162',a:'#876790',h:'#E9E896',b:'#161908'},sh:{p:'#72CD47',s:'#D8D378',a:'#BAA969',h:'#E8ED9F',b:'#181B08'}},
    {k:'954',n:'Rabsca',hp:'#6890F0',ap:'#A040A0',pal:{p:'#74A264',s:'#AAAD81',a:'#956FAB',h:'#DCDAAF',b:'#11190E'},sh:{p:'#A7DC76',s:'#BAC793',a:'#C4589E',h:'#E3EBB8',b:'#141C0E'}},
    {k:'955',n:'Flittle',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#D97599',s:'#B67ED9',a:'#BC9D7A',h:'#F1B5DB',b:'#1C0C16'},sh:{p:'#8ACD96',s:'#C6CDC8',a:'#C54F92',h:'#D5EBDB',b:'#0C1A11'}},
    {k:'956',n:'Espathra',hp:'#F8D030',ap:'#A040A0',pal:{p:'#D77C79',s:'#B97FC9',a:'#BA8A63',h:'#EFB7C9',b:'#1C0F11'},sh:{p:'#8FC360',s:'#C9C6B4',a:'#BA5CA2',h:'#D9E9C4',b:'#101909'}},
    {k:'957',n:'Tinkatink',hp:'#F4BDC9',ap:'#B8B8D0',pal:{p:'#B5ABB8',s:'#CCCCD5',a:'#7AABD4',h:'#EEEBF7',b:'#151318'},sh:{p:'#CFCADF',s:'#E3E7EF',a:'#85D578',h:'#F1F6FA',b:'#14171B'}},
    {k:'958',n:'Tinkatuff',hp:'#F4BDC9',ap:'#B8B8D0',pal:{p:'#B7ACB9',s:'#D0CED7',a:'#7AB3D4',h:'#EBE9F4',b:'#151318'},sh:{p:'#CDCAE1',s:'#E7EAF2',a:'#91D579',h:'#F1F6FA',b:'#14171B'}},
    {k:'959',n:'Tinkaton',hp:'#F4BDC9',ap:'#B8B8D0',pal:{p:'#BEB2C0',s:'#D0CFD7',a:'#80B1DE',h:'#EEEBF7',b:'#161418'},sh:{p:'#D5D0E9',s:'#E6E8F2',a:'#8BE17D',h:'#F1F6FA',b:'#14171B'}},
    {k:'960',n:'Wiglett',hp:'#A8A878',ap:'#F4BDC9',pal:{p:'#6196AB',s:'#B2CAD3',a:'#D0B67F',h:'#E1EAEE',b:'#0C1419'},sh:{p:'#718CB8',s:'#E1E8E9',a:'#BE758D',h:'#E0EEEC',b:'#0D1617'}},
    {k:'961',n:'Wugtrio',hp:'#C03028',ap:'#F4BDC9',pal:{p:'#6775A0',s:'#B6C2C6',a:'#CBB679',h:'#E5E1E3',b:'#0D1117'},sh:{p:'#75A9BE',s:'#DBE1D9',a:'#C17786',h:'#E2F1E2',b:'#0E1815'}},
    {k:'962',n:'Bombirdier',hp:'#705898',ap:'#A8A878',pal:{p:'#657AB6',s:'#C8B59F',a:'#BD6A5B',h:'#D7D8EE',b:'#0A1019'},sh:{p:'#A3B6CD',s:'#C9CACA',a:'#C6C260',h:'#EDEFF1',b:'#10141A'}},
    {k:'963',n:'Finizen',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#3686BF',s:'#A6C5DF',a:'#EFBD82',h:'#D1E7F5',b:'#07141E'},sh:{p:'#52D0D4',s:'#D8E4F0',a:'#AA83D6',h:'#DBF4F9',b:'#091A1C'}},
    {k:'964',n:'Palafin',hp:'#6890F0',ap:'#A8A878',pal:{p:'#3E80CF',s:'#94C6D1',a:'#DACD5E',h:'#CDE7F1',b:'#08141E'},sh:{p:'#55C1D5',s:'#CFE5E1',a:'#8E7AB9',h:'#D3F0EF',b:'#09191C'}},
    {k:'965',n:'Varoom',hp:'#B8B8D0',ap:'#C03028',pal:{p:'#AEB5BD',s:'#CBAAAB',a:'#73779A',h:'#EEDDE1',b:'#121519'},sh:{p:'#D1CBD4',s:'#E6C9C5',a:'#83D33C',h:'#F5E5DD',b:'#16161A'}},
    {k:'966',n:'Revavroom',hp:'#B8B8D0',ap:'#C03028',pal:{p:'#A5ADB5',s:'#CCADAD',a:'#7684A0',h:'#ECDADF',b:'#121518'},sh:{p:'#CBCAD3',s:'#E7CCC6',a:'#CF9D49',h:'#F8E9E0',b:'#16161A'}},
    {k:'967',n:'Cyclizar',hp:'#78C850',ap:'#6890F0',pal:{p:'#5DAC53',s:'#88B69F',a:'#CEC17D',h:'#CAEFBE',b:'#0A1809'},sh:{p:'#B0CE4F',s:'#9ECFA9',a:'#7A92AE',h:'#DEF3BF',b:'#171D09'}},
    {k:'968',n:'Orthworm',hp:'#B8A038',ap:'#C03028',pal:{p:'#899737',s:'#BEA74D',a:'#925984',h:'#E3CF80',b:'#141807'},sh:{p:'#B5C748',s:'#C6BC61',a:'#CD5D69',h:'#F1E990',b:'#171B08'}},
    {k:'969',n:'Glimmet',hp:'#A040A0',ap:'#F4BDC9',pal:{p:'#8C6059',s:'#C89C86',a:'#CFBE87',h:'#DDBCA7',b:'#130E0B'},sh:{p:'#709D63',s:'#C0CD97',a:'#DDA581',h:'#E0EFB5',b:'#10170B'}},
    {k:'970',n:'Glimmora',hp:'#A040A0',ap:'#F4BDC9',pal:{p:'#8F6B5B',s:'#CDA48A',a:'#D2BF86',h:'#DDBFA6',b:'#130F0B'},sh:{p:'#63A66E',s:'#BBCA95',a:'#B9EC83',h:'#E4EFB5',b:'#10170B'}},
    {k:'971',n:'Greavard',hp:'#708090',ap:'#F8D030',pal:{p:'#412D61',s:'#9D798C',a:'#CD7281',h:'#D7BFD6',b:'#07050C'},sh:{p:'#A6A5A3',s:'#DAC9A3',a:'#A9859A',h:'#F9F4E1',b:'#121210'}},
    {k:'972',n:'Houndstone',hp:'#A8A878',ap:'#F8D030',pal:{p:'#745175',s:'#BC8F99',a:'#C77689',h:'#E2C8D4',b:'#0E090D'},sh:{p:'#D2CCAF',s:'#F3E2AD',a:'#9E7997',h:'#FEF7D7',b:'#171611'}},
    {k:'973',n:'Flamigo',hp:'#F4BDC9',ap:'#C03028',pal:{p:'#95A4C8',s:'#DBA48F',a:'#A84E48',h:'#E3D1DA',b:'#11141C'},sh:{p:'#CADAEE',s:'#E7CFCE',a:'#C5874D',h:'#F4E9E3',b:'#12191E'}},
    {k:'974',n:'Cetoddle',hp:'#6890F0',ap:'#A8A878',pal:{p:'#73BADF',s:'#CEDDD6',a:'#839A9E',h:'#E1F3EE',b:'#0A181F'},sh:{p:'#A3BCE7',s:'#DDE3D8',a:'#A88AB7',h:'#ECF1E9',b:'#0D1A1D'}},
    {k:'975',n:'Cetitan',hp:'#6890F0',ap:'#A8A878',pal:{p:'#74AFDB',s:'#D2E2DA',a:'#819D9D',h:'#DEEEEB',b:'#0A171F'},sh:{p:'#ACDFEB',s:'#E1E8DC',a:'#848BAC',h:'#F0F5EE',b:'#0E1A1D'}},
    {k:'976',n:'Veluza',hp:'#6890F0',ap:'#A8A878',pal:{p:'#4392C4',s:'#95C3C5',a:'#CFA65E',h:'#CDE5E9',b:'#08151E'},sh:{p:'#5DD8D7',s:'#C7DBD3',a:'#8E7AAE',h:'#D8F1EC',b:'#091A1C'}},
    {k:'977',n:'Dondozo',hp:'#6890F0',ap:'#A8A878',pal:{p:'#3B79CA',s:'#98C6CC',a:'#D6C25B',h:'#D2E8EF',b:'#08141E'},sh:{p:'#4B72D7',s:'#D0E2DC',a:'#BD78A4',h:'#D4EDE9',b:'#09181B'}},
    {k:'978',n:'Tatsugiri',hp:'#F08030',ap:'#6890F0',pal:{p:'#6B7A97',s:'#93BBCE',a:'#D19E7C',h:'#CCDCE1',b:'#0E1216'},sh:{p:'#7CBEA7',s:'#BCD9E1',a:'#7871CC',h:'#D4EDE7',b:'#0F1915'}},
    {k:'979',n:'Annihilape',hp:'#705898',ap:'#C03028',pal:{p:'#292A33',s:'#99528F',a:'#D8484E',h:'#D3B2E6',b:'#060608'},sh:{p:'#D9D2DA',s:'#795F69',a:'#D84E48',h:'#F8E9E9',b:'#17171A'}},
    {k:'980',n:'Clodsire',hp:'#A040A0',ap:'#E8C068',pal:{p:'#6D3B94',s:'#C17C87',a:'#92A25A',h:'#DFB7D4',b:'#0F0815'},sh:{p:'#3D9A96',s:'#AAC99C',a:'#BD726A',h:'#D9F3CF',b:'#081713'}},
    {k:'981',n:'Farigiraf',hp:'#F8D030',ap:'#A8A878',pal:{p:'#E1CA48',s:'#D8C186',a:'#8F7E6B',h:'#EEE49A',b:'#1D1807'},sh:{p:'#B0E141',s:'#D9B771',a:'#818695',h:'#F5E89E',b:'#1C1807'}},
    {k:'982',n:'Dudunsparce',hp:'#F8D030',ap:'#6890F0',pal:{p:'#D9BC30',s:'#A4B6A9',a:'#898566',h:'#E6E9B7',b:'#1C1806'},sh:{p:'#98C924',s:'#A6BC9D',a:'#C36AEA',h:'#E3E5B3',b:'#1B1705'}},
    {k:'983',n:'Kingambit',hp:'#B8B8D0',ap:'#C03028',pal:{p:'#7F848D',s:'#D39894',a:'#939092',h:'#DFD3DC',b:'#0E1013'},sh:{p:'#9E99A1',s:'#E0C2AA',a:'#A2E03E',h:'#F4E0C7',b:'#111114'}},
    {k:'984',n:'Great-Tusk',hp:'#E8C068',ap:'#78C850',pal:{p:'#A1633F',s:'#C4BD84',a:'#C37443',h:'#E6D1A3',b:'#160D07'},sh:{p:'#B0ACA3',s:'#C7D2AF',a:'#C3624A',h:'#EAF2E4',b:'#161614'}},
    {k:'985',n:'Scream-Tail',hp:'#F4BDC9',ap:'#C03028',pal:{p:'#F9B6D4',s:'#EFC6C8',a:'#D5506A',h:'#F8CCD6',b:'#1F1117'},sh:{p:'#D5E2E5',s:'#E5CDCC',a:'#D55584',h:'#F7E8E7',b:'#121A1B'}},
    {k:'986',n:'Brute-Bonnet',hp:'#78C850',ap:'#C03028',pal:{p:'#519C52',s:'#BEBB66',a:'#D53F3B',h:'#D3E3A0',b:'#091709'},sh:{p:'#CFC970',s:'#E3C881',a:'#987746',h:'#F6E09A',b:'#1A1A0D'}},
    {k:'987',n:'Flutter-Mane',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#6D3A8F',s:'#B570C6',a:'#CE6D9F',h:'#D9B3F5',b:'#0C0711'},sh:{p:'#D3D2CB',s:'#E1CBD4',a:'#945ACE',h:'#F3E9F3',b:'#171714'}},
    {k:'988',n:'Slither-Wing',hp:'#F08030',ap:'#78C850',pal:{p:'#9D9A37',s:'#C6D15C',a:'#758B91',h:'#E0E488',b:'#171607'},sh:{p:'#B9D36C',s:'#D0E486',a:'#C07D74',h:'#E7F9B1',b:'#171B0C'}},
    {k:'989',n:'Sandy-Shocks',hp:'#F8D030',ap:'#B8A038',pal:{p:'#BB8C4E',s:'#DAB65C',a:'#966034',h:'#EDCE8C',b:'#191208'},sh:{p:'#B1C667',s:'#CFBF72',a:'#509E2F',h:'#EFE0A2',b:'#18160B'}},
    {k:'990',n:'Iron-Treads',hp:'#B8B8D0',ap:'#F8D030',pal:{p:'#B2B7CC',s:'#464836',a:'#8ECCBB',h:'#EBF2E9',b:'#0C0F14'},sh:{p:'#D5D0D9',s:'#F4EDD4',a:'#62EA42',h:'#FBF7E6',b:'#16161A'}},
    {k:'991',n:'Iron-Bundle',hp:'#6890F0',ap:'#B8B8D0',pal:{p:'#B4BECF',s:'#3A4151',a:'#87C6E5',h:'#E4F2FA',b:'#0D0F14'},sh:{p:'#D6D2DC',s:'#E0E0E9',a:'#8DDE79',h:'#F6F6F8',b:'#16161A'}},
    {k:'992',n:'Iron-Hands',hp:'#6890F0',ap:'#F8D030',pal:{p:'#ACB4C5',s:'#464735',a:'#92DABB',h:'#E9F2E8',b:'#0C0F14'},sh:{p:'#DDD9E3',s:'#EFE8CF',a:'#52EA46',h:'#FEFAE9',b:'#17171A'}},
    {k:'993',n:'Iron-Jugulis',hp:'#6890F0',ap:'#A040A0',pal:{p:'#ACB1C6',s:'#372E4A',a:'#7AB7D7',h:'#E1E3F4',b:'#0C0F14'},sh:{p:'#D2D2DB',s:'#E3D2E7',a:'#CBA969',h:'#F5EBF5',b:'#17171A'}},
    {k:'994',n:'Iron-Moth',hp:'#C03028',ap:'#F8D030',pal:{p:'#B3BBCE',s:'#454635',a:'#94CDBE',h:'#EBF3E9',b:'#0C0F14'},sh:{p:'#D5D1DB',s:'#F0E9CF',a:'#62ED47',h:'#FCF8E7',b:'#16161A'}},
    {k:'995',n:'Iron-Thorns',hp:'#B8B8D0',ap:'#C03028',pal:{p:'#AEB4C8',s:'#3C2A34',a:'#84B1BC',h:'#E5E2E9',b:'#0C0F14'},sh:{p:'#E0DBE6',s:'#E8CDD1',a:'#68E044',h:'#F8E9E9',b:'#17171A'}},
    {k:'996',n:'Frigibax',hp:'#6890F0',ap:'#A8A878',pal:{p:'#7CCDE3',s:'#D5E1DB',a:'#7F9EAC',h:'#E3F6F0',b:'#0B1A1F'},sh:{p:'#BDF1F3',s:'#DFE5DB',a:'#8A8EB6',h:'#F6F6F1',b:'#0F1B1E'}},
    {k:'997',n:'Arctibax',hp:'#6890F0',ap:'#A8A878',pal:{p:'#7EB9E6',s:'#DDEAE4',a:'#7B9CAC',h:'#E3F5F1',b:'#0B1920'},sh:{p:'#B5C0ED',s:'#E8EEE4',a:'#A785BF',h:'#F2F2ED',b:'#0E1A1E'}},
    {k:'998',n:'Baxcalibur',hp:'#6890F0',ap:'#B8B8D0',pal:{p:'#4F87B9',s:'#99C597',a:'#E3A46B',h:'#B4CDF9',b:'#071119'},sh:{p:'#44724D',s:'#B6D29A',a:'#D67464',h:'#D2E3B9',b:'#08120B'}},
    {k:'999',n:'Gimmighoul',hp:'#E8C068',ap:'#705898',pal:{p:'#362F33',s:'#76598F',a:'#B755AD',h:'#C9AEDE',b:'#070507'},sh:{p:'#474344',s:'#777287',a:'#71C05F',h:'#DED9E0',b:'#090909'}},
    {k:'1000',n:'Gholdengo',hp:'#E8C068',ap:'#78C850',pal:{p:'#DDCF43',s:'#DFEAA1',a:'#71CC62',h:'#F1F289',b:'#1D1906'},sh:{p:'#D2BF40',s:'#E4EFB6',a:'#75D6C8',h:'#EEED87',b:'#1C1806'}},
    {k:'1001',n:'Wo-Chien',hp:'#78C850',ap:'#705898',pal:{p:'#58A953',s:'#9AB271',a:'#C47769',h:'#D0EBB5',b:'#0A1809'},sh:{p:'#C1BC4E',s:'#BDBE81',a:'#7E9A6A',h:'#E7DE9A',b:'#1A1B08'}},
    {k:'1002',n:'Chien-Pao',hp:'#6890F0',ap:'#708090',pal:{p:'#398DCA',s:'#698BA3',a:'#D0A762',h:'#C0D8EA',b:'#08151E'},sh:{p:'#52D0D0',s:'#95A6B2',a:'#A291A5',h:'#CDE4EE',b:'#091A1B'}},
    {k:'1003',n:'Ting-Lu',hp:'#B8A038',ap:'#705898',pal:{p:'#B79952',s:'#C39A76',a:'#845A5A',h:'#DBC19A',b:'#191208'},sh:{p:'#88B64F',s:'#B4A374',a:'#608850',h:'#DFD7A0',b:'#171608'}},
    {k:'1004',n:'Chi-Yu',hp:'#C03028',ap:'#F8D030',pal:{p:'#D25F33',s:'#F0AE44',a:'#B85B28',h:'#FED37B',b:'#1B0906'},sh:{p:'#D1B34A',s:'#EDC459',a:'#8D8268',h:'#FEEF89',b:'#1B1707'}},
    {k:'1005',n:'Roaring-Moon',hp:'#6890F0',ap:'#C03028',pal:{p:'#2C4B96',s:'#9C874C',a:'#C89142',h:'#A2A8DF',b:'#050B16'},sh:{p:'#77A180',s:'#CAC07C',a:'#D24133',h:'#E0E0B0',b:'#0E170D'}},
    {k:'1006',n:'Iron-Valiant',hp:'#A040A0',ap:'#6890F0',pal:{p:'#AEB6C7',s:'#2C3E57',a:'#6DC2E4',h:'#DCECFD',b:'#0C0F14'},sh:{p:'#DFDBE5',s:'#D5DDF2',a:'#7CC183',h:'#EFF3FD',b:'#17171A'}},
    {k:'1007',n:'Koraidon',hp:'#C03028',ap:'#F8D030',pal:{p:'#5C5587',s:'#A8C251',a:'#D5C665',h:'#C3BED3',b:'#0B0A13'},sh:{p:'#3A6341',s:'#C9B054',a:'#E57942',h:'#D0DCA1',b:'#081109'}},
    {k:'1008',n:'Miraidon',hp:'#6890F0',ap:'#F8D030',pal:{p:'#354BA7',s:'#8DC27E',a:'#F7BA48',h:'#B5BEE5',b:'#070B19'},sh:{p:'#759957',s:'#A9B272',a:'#CD8862',h:'#E7ED91',b:'#0F170A'}},
    {k:'1009',n:'Walking-Wake',hp:'#6890F0',ap:'#F4BDC9',pal:{p:'#395BB8',s:'#ABA574',a:'#EBC365',h:'#AEBDF9',b:'#060C18'},sh:{p:'#6C937D',s:'#D8DAA0',a:'#D9606E',h:'#E2EBBF',b:'#0D160F'}},
    {k:'1010',n:'Iron-Leaves',hp:'#78C850',ap:'#B8B8D0',pal:{p:'#AEB5C6',s:'#3B4552',a:'#81CEDC',h:'#E3F0F9',b:'#0C0F14'},sh:{p:'#DEDAE4',s:'#E3E3EC',a:'#77D473',h:'#F8F8FA',b:'#17171A'}},
    {k:'1011',n:'Dipplin',hp:'#78C850',ap:'#F08030',pal:{p:'#64A553',s:'#C0BC5D',a:'#E26648',h:'#DEEB9B',b:'#0A1809'},sh:{p:'#B9C955',s:'#EFD970',a:'#86944B',h:'#FAED8A',b:'#1A1C09'}},
    {k:'1012',n:'Poltchageist',hp:'#78C850',ap:'#A040A0',pal:{p:'#50A453',s:'#A9B379',a:'#C56B5F',h:'#D0E5B3',b:'#091809'},sh:{p:'#C0C951',s:'#C7C483',a:'#7E8A72',h:'#F1E89D',b:'#1A1C09'}},
    {k:'1013',n:'Sinistcha',hp:'#78C850',ap:'#A040A0',pal:{p:'#56AC59',s:'#AFB477',a:'#C4775E',h:'#D3E9B6',b:'#0A180A'},sh:{p:'#BCC551',s:'#CFC688',a:'#878972',h:'#EBE29A',b:'#1A1B09'}},
    {k:'1014',n:'Okidogi',hp:'#705898',ap:'#F4BDC9',pal:{p:'#775148',s:'#D3B0A8',a:'#D97689',h:'#E8C7C2',b:'#110A08'},sh:{p:'#615076',s:'#C9C2D9',a:'#A3EE7B',h:'#EEEDF9',b:'#090910'}},
    {k:'1015',n:'Munkidori',hp:'#A040A0',ap:'#F4BDC9',pal:{p:'#BA5189',s:'#C987DB',a:'#D3C580',h:'#F8BDE3',b:'#190915'},sh:{p:'#66BD7C',s:'#CEE3D0',a:'#DD6E97',h:'#DBF8DD',b:'#0A190D'}},
    {k:'1016',n:'Fezandipiti',hp:'#F4BDC9',ap:'#A040A0',pal:{p:'#939FC6',s:'#D3AAAF',a:'#AB616F',h:'#DCD2F0',b:'#10131C'},sh:{p:'#C7E1EC',s:'#D0CBE1',a:'#C8917E',h:'#EBEBF5',b:'#12191E'}},
    {k:'1017',n:'Ogerpon',hp:'#78C850',ap:'#F4BDC9',pal:{p:'#64AE5E',s:'#F1B1CC',a:'#D9C872',h:'#DEF8BF',b:'#0B180A'},sh:{p:'#2E814C',s:'#EFCBDD',a:'#ECB568',h:'#C2F6D0',b:'#07140A'}},
    {k:'1018',n:'Archaludon',hp:'#B8B8D0',ap:'#6890F0',pal:{p:'#A0A6AF',s:'#B6C5DF',a:'#70AED2',h:'#DDE7FA',b:'#121518'},sh:{p:'#C3C4CB',s:'#C8D7EE',a:'#B6AC8C',h:'#ECF3FD',b:'#16161A'}},
    {k:'1019',n:'Hydrapple',hp:'#78C850',ap:'#F08030',pal:{p:'#59A556',s:'#CCC25F',a:'#DC623F',h:'#DBEC9E',b:'#0A180A'},sh:{p:'#CBCB59',s:'#EBCC6D',a:'#83914B',h:'#FCE98C',b:'#1B1C09'}},
    {k:'1020',n:'Gouging-Fire',hp:'#F08030',ap:'#F8D030',pal:{p:'#DB592C',s:'#F2C24A',a:'#B95634',h:'#FAD07A',b:'#1C0905'},sh:{p:'#D1B367',s:'#EDD277',a:'#9E8060',h:'#FDEFA4',b:'#1A170B'}},
    {k:'1021',n:'Raging-Bolt',hp:'#F8D030',ap:'#C03028',pal:{p:'#6A7F8D',s:'#78946A',a:'#D9823B',h:'#BEBDCC',b:'#0C1013'},sh:{p:'#7AA896',s:'#CAB973',a:'#90D630',h:'#E6E4B5',b:'#0E170D'}},
    {k:'1022',n:'Iron-Boulder',hp:'#B8B8D0',ap:'#C03028',pal:{p:'#AAB5C4',s:'#3C2833',a:'#8CBDC0',h:'#E3E1E6',b:'#0C0F14'},sh:{p:'#DED6E2',s:'#EBD2D4',a:'#6FE341',h:'#F8E9E9',b:'#17171A'}},
    {k:'1023',n:'Iron-Crown',hp:'#B8B8D0',ap:'#6890F0',pal:{p:'#B3BCCD',s:'#2B3C57',a:'#70BBE7',h:'#DCEEFD',b:'#0C0F14'},sh:{p:'#D4D1DA',s:'#D3DBEF',a:'#8DC380',h:'#EDF1FB',b:'#16161A'}},
    {k:'1024',n:'Terapagos',hp:'#6890F0',ap:'#A8A878',pal:{p:'#79ABD3',s:'#D3E1DE',a:'#CBB05D',h:'#D3E9EE',b:'#0B171E'},sh:{p:'#5B77C9',s:'#E5DDC8',a:'#CBBA5F',h:'#D5DFF1',b:'#0A131E'}},
    {k:'1025',n:'Pecharunt',hp:'#A040A0',ap:'#F4BDC9',pal:{p:'#7F428B',s:'#F2B6D0',a:'#DCC973',h:'#EBC4F9',b:'#100815'},sh:{p:'#D3B8D4',s:'#8D5692',a:'#DCB675',h:'#EFD6EB',b:'#1A151C'}}
  ],
  mtg:[
    {k:'C',n:'Colorless',hp:'#8A8F98',ap:'#D8D8D8',pal:{p:'#8A8F98',s:'#D8D8D8',a:'#BFA76F',h:'#F0F0F0',b:'#0D0E10'},alt:{p:'#D8D8D8',s:'#F0F0F0',a:'#BFA76F',h:'#FFFFFF',b:'#101010'}},
    {k:'W',n:'White',hp:'#F1E6C8',ap:'#BFA76F',pal:{p:'#F1E6C8',s:'#BFA76F',a:'#FFFFFF',h:'#FFF7D8',b:'#11100A'},alt:{p:'#FFF4D8',s:'#D8C08A',a:'#7A6A48',h:'#FFFFFF',b:'#15130D'}},
    {k:'U',n:'Blue',hp:'#1E6BAE',ap:'#8FD7F7',pal:{p:'#1E6BAE',s:'#8FD7F7',a:'#C7EEFF',h:'#E0F8FF',b:'#06101E'},alt:{p:'#77BCE8',s:'#D8F2FF',a:'#1E6BAE',h:'#FFFFFF',b:'#07141E'}},
    {k:'B',n:'Black',hp:'#15110F',ap:'#8A6E5A',pal:{p:'#15110F',s:'#5A4A44',a:'#BFA76F',h:'#D8C1A3',b:'#030302'},alt:{p:'#2A2522',s:'#8A6E5A',a:'#E0C08A',h:'#F0D8B8',b:'#050404'}},
    {k:'R',n:'Red',hp:'#C53028',ap:'#F97316',pal:{p:'#C53028',s:'#F97316',a:'#FFC14A',h:'#FFD08A',b:'#160503'},alt:{p:'#E36A2E',s:'#F0B848',a:'#7A1F1F',h:'#FFE08A',b:'#170904'}},
    {k:'G',n:'Green',hp:'#0B6B3A',ap:'#8BC36A',pal:{p:'#0B6B3A',s:'#77A65A',a:'#B6D66A',h:'#D8F5A0',b:'#051108'},alt:{p:'#6FA95A',s:'#B8D87A',a:'#0B6B3A',h:'#E8FFB8',b:'#071407'}},
    {k:'WU',n:'Azorius',hp:'#1E6BAE',ap:'#F1E6C8',pal:{p:'#1E6BAE',s:'#F1E6C8',a:'#BFA76F',h:'#E0F8FF',b:'#06101E'},alt:{p:'#DDEBFF',s:'#6FAFE0',a:'#D8C08A',h:'#FFFFFF',b:'#0B1018'}},
    {k:'WB',n:'Orzhov',hp:'#15110F',ap:'#F1E6C8',pal:{p:'#15110F',s:'#F1E6C8',a:'#BFA76F',h:'#FFF0C8',b:'#030302'},alt:{p:'#F1E6C8',s:'#2A2522',a:'#BFA76F',h:'#FFFFFF',b:'#15130D'}},
    {k:'UB',n:'Dimir',hp:'#111827',ap:'#1E6BAE',pal:{p:'#111827',s:'#1E6BAE',a:'#7C3AED',h:'#B8D8FF',b:'#02040A'},alt:{p:'#1E2A3A',s:'#5FAFE8',a:'#BFA76F',h:'#D8F0FF',b:'#04070D'}},
    {k:'UR',n:'Izzet',hp:'#1E6BAE',ap:'#C53028',pal:{p:'#1E6BAE',s:'#C53028',a:'#FFC14A',h:'#9FE8FF',b:'#06101E'},alt:{p:'#C53028',s:'#1E6BAE',a:'#8FD7F7',h:'#FFD08A',b:'#160503'}},
    {k:'BR',n:'Rakdos',hp:'#15110F',ap:'#C53028',pal:{p:'#15110F',s:'#C53028',a:'#F97316',h:'#FF9A70',b:'#030302'},alt:{p:'#C53028',s:'#15110F',a:'#BFA76F',h:'#FFB08A',b:'#150303'}},
    {k:'BG',n:'Golgari',hp:'#0B6B3A',ap:'#15110F',pal:{p:'#0B6B3A',s:'#15110F',a:'#8A6E2F',h:'#B8D86A',b:'#030803'},alt:{p:'#2E4A2A',s:'#1A1714',a:'#BFA76F',h:'#D8E8A8',b:'#050704'}},
    {k:'RG',n:'Gruul',hp:'#C53028',ap:'#0B6B3A',pal:{p:'#C53028',s:'#0B6B3A',a:'#FFC14A',h:'#FFD08A',b:'#120503'},alt:{p:'#7A5A24',s:'#5FA05A',a:'#E0C05A',h:'#F0E08A',b:'#0D0A03'}},
    {k:'RW',n:'Boros',hp:'#C53028',ap:'#F1E6C8',pal:{p:'#C53028',s:'#F1E6C8',a:'#BFA76F',h:'#FFD8B8',b:'#160503'},alt:{p:'#F1E6C8',s:'#C53028',a:'#D8A948',h:'#FFFFFF',b:'#15130D'}},
    {k:'GW',n:'Selesnya',hp:'#0B6B3A',ap:'#F1E6C8',pal:{p:'#0B6B3A',s:'#F1E6C8',a:'#B6D66A',h:'#E8FFB8',b:'#051108'},alt:{p:'#E8F0D0',s:'#6FA95A',a:'#BFA76F',h:'#FFFFFF',b:'#10150A'}},
    {k:'GU',n:'Simic',hp:'#0B8A7A',ap:'#1E6BAE',pal:{p:'#0B8A7A',s:'#1E6BAE',a:'#8FD7F7',h:'#B8FFE8',b:'#03110F'},alt:{p:'#5FB8A8',s:'#77BCE8',a:'#D8C05A',h:'#D8FFF5',b:'#071614'}},
    {k:'WUB',n:'Esper',hp:'#8A8F98',ap:'#1E6BAE',pal:{p:'#8A8F98',s:'#1E6BAE',a:'#F1E6C8',h:'#E8F4FF',b:'#05070D'},alt:{p:'#D8DCE0',s:'#6FAFE0',a:'#BFA76F',h:'#FFFFFF',b:'#101014'}},
    {k:'UBR',n:'Grixis',hp:'#111827',ap:'#C53028',pal:{p:'#111827',s:'#C53028',a:'#1E6BAE',h:'#FF9A70',b:'#02040A'},alt:{p:'#2A2030',s:'#E36A2E',a:'#6FAFE0',h:'#D8C8FF',b:'#050408'}},
    {k:'BRG',n:'Jund',hp:'#C53028',ap:'#0B6B3A',pal:{p:'#C53028',s:'#0B6B3A',a:'#8A6E2F',h:'#FFD08A',b:'#120503'},alt:{p:'#6B3A24',s:'#5F8A4A',a:'#D8B64A',h:'#F0D08A',b:'#0B0703'}},
    {k:'RGW',n:'Naya',hp:'#0B6B3A',ap:'#F1E6C8',pal:{p:'#0B6B3A',s:'#C53028',a:'#F1E6C8',h:'#E8FFB8',b:'#051108'},alt:{p:'#E8D8A8',s:'#6FA95A',a:'#D84A32',h:'#FFF0C8',b:'#141105'}},
    {k:'GWU',n:'Bant',hp:'#0B6B3A',ap:'#1E6BAE',pal:{p:'#0B6B3A',s:'#1E6BAE',a:'#F1E6C8',h:'#D8F5FF',b:'#051108'},alt:{p:'#D8EBC8',s:'#77BCE8',a:'#BFA76F',h:'#FFFFFF',b:'#0F140A'}},
    {k:'WBG',n:'Abzan',hp:'#7A5A24',ap:'#0B6B3A',pal:{p:'#7A5A24',s:'#0B6B3A',a:'#F1E6C8',h:'#E8D8A8',b:'#0D0A03'},alt:{p:'#D8C8A0',s:'#6FA95A',a:'#15110F',h:'#FFF0C8',b:'#141105'}},
    {k:'URW',n:'Jeskai',hp:'#1E6BAE',ap:'#C53028',pal:{p:'#1E6BAE',s:'#C53028',a:'#F1E6C8',h:'#E0F8FF',b:'#06101E'},alt:{p:'#F1E6C8',s:'#77BCE8',a:'#C53028',h:'#FFFFFF',b:'#15130D'}},
    {k:'BGR',n:'Sultai',hp:'#111827',ap:'#0B8A7A',pal:{p:'#111827',s:'#0B8A7A',a:'#1E6BAE',h:'#B8FFE8',b:'#02040A'},alt:{p:'#1C2A24',s:'#5FB8A8',a:'#BFA76F',h:'#D8FFF0',b:'#040805'}},
    {k:'RWB',n:'Mardu',hp:'#C53028',ap:'#15110F',pal:{p:'#C53028',s:'#15110F',a:'#F1E6C8',h:'#FFD08A',b:'#120302'},alt:{p:'#2A2522',s:'#C53028',a:'#D8C08A',h:'#F0D8B8',b:'#050404'}},
    {k:'GUR',n:'Temur',hp:'#0B6B3A',ap:'#1E6BAE',pal:{p:'#0B6B3A',s:'#1E6BAE',a:'#F97316',h:'#B8F5FF',b:'#051108'},alt:{p:'#2E5A5A',s:'#77BCE8',a:'#D8B64A',h:'#D8FFF5',b:'#071210'}},
    {k:'WUBR',n:'Artifice',hp:'#8A8F98',ap:'#1E6BAE',pal:{p:'#8A8F98',s:'#1E6BAE',a:'#C53028',h:'#E8F4FF',b:'#05070D'},alt:{p:'#D8DCE0',s:'#6FAFE0',a:'#E36A2E',h:'#FFFFFF',b:'#101014'}},
    {k:'UBRG',n:'Chaos',hp:'#111827',ap:'#0B6B3A',pal:{p:'#111827',s:'#C53028',a:'#0B6B3A',h:'#FFD08A',b:'#02040A'},alt:{p:'#2A2030',s:'#5FA05A',a:'#D8B64A',h:'#D8C8FF',b:'#050408'}},
    {k:'BRGW',n:'Aggression',hp:'#C53028',ap:'#0B6B3A',pal:{p:'#C53028',s:'#0B6B3A',a:'#F1E6C8',h:'#FFD08A',b:'#120302'},alt:{p:'#6B3A24',s:'#D8C8A0',a:'#5FA05A',h:'#F0D08A',b:'#0B0703'}},
    {k:'RGWU',n:'Altruism',hp:'#0B6B3A',ap:'#1E6BAE',pal:{p:'#0B6B3A',s:'#1E6BAE',a:'#F1E6C8',h:'#D8F5FF',b:'#051108'},alt:{p:'#D8EBC8',s:'#77BCE8',a:'#E36A2E',h:'#FFFFFF',b:'#0F140A'}},
    {k:'GWUB',n:'Growth',hp:'#0B8A7A',ap:'#15110F',pal:{p:'#0B8A7A',s:'#15110F',a:'#F1E6C8',h:'#B8FFE8',b:'#03110F'},alt:{p:'#5FB8A8',s:'#2A2522',a:'#D8C08A',h:'#D8FFF5',b:'#071614'}},
    {k:'WUBRG',n:'5-Color',hp:'#6B21A8',ap:'#FFD700',pal:{p:'#6B21A8',s:'#1E6BAE',a:'#FFD700',h:'#FFED8A',b:'#08030F'},alt:{p:'#111827',s:'#C53028',a:'#FFD700',h:'#FFFFFF',b:'#02040A'}}
  ]
};


// COLOR MATH + SMART PALETTE ENGINE
// v12: every Pokémon entry has an explicit normal + shiny curated palette, with duplicate-family cleanup and contrast-safe theme roles.
var LS='wo-v12-palette';
var state={league:'nfl',colorway:'home',team:null};

function clamp(v,min,max){return Math.min(max,Math.max(min,v));}
function hex2rgb(h){
  var c=(h||'').replace('#','');
  if(c.length===3)c=c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  if(c.length!==6)return[0,0,20];
  return[parseInt(c.substr(0,2),16),parseInt(c.substr(2,2),16),parseInt(c.substr(4,2),16)];
}
function rgb2hex(r,g,b){
  var a=[r,g,b].map(function(x){x=clamp(Math.round(x),0,255);return(x<16?'0':'')+x.toString(16);});
  return'#'+a.join('');
}
function lum(h){
  var r=hex2rgb(h).map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);});
  return .2126*r[0]+.7152*r[1]+.0722*r[2];
}
function contrast(a,b){
  var A=lum(a),B=lum(b);
  return (Math.max(A,B)+.05)/(Math.min(A,B)+.05);
}
function onBg(h){return contrast('#111111',h)>=contrast('#ffffff',h)?'#111111':'#ffffff';}
function rgba(h,a){var r=hex2rgb(h);return'rgba('+r[0]+','+r[1]+','+r[2]+','+a+')';}
function mix(a,b,t){
  var x=hex2rgb(a),y=hex2rgb(b);
  return rgb2hex(x[0]+(y[0]-x[0])*t,x[1]+(y[1]-x[1])*t,x[2]+(y[2]-x[2])*t);
}
function adj(h,p){return mix(h,p>0?'#ffffff':'#000000',Math.abs(p));}
function safeAccent(acc,bg,min){
  min=min||3.6;
  var c=acc,tries=0,preferLight=lum(bg)<.35;
  while(contrast(c,bg)<min&&tries<8){c=preferLight?adj(c,.14):adj(c,-.12);tries++;}
  if(contrast(c,bg)<min)c=preferLight?'#ffffff':'#111111';
  return c;
}
function readableSurface(bg,amt){return lum(bg)<.35?mix(bg,'#ffffff',amt||.08):mix(bg,'#000000',amt||.05);}

function smartPalette(o){
  var pri=o.primary||'#0c2c56';
  var sec=o.secondary||o.accent||pri;
  var acc=o.accent||sec;
  var hi=o.highlight||acc;
  var isPokemon=o.kind==='pokemon';
  var bg=o.base||(isPokemon?mix('#05070f',pri,lum(pri)<.2?.34:.22):(lum(pri)<.16?mix('#05070f',pri,.42):mix('#060914',pri,.24)));
  var surf=o.surface||readableSurface(bg,.09);
  var surfAlt=o.surfaceAlt||readableSurface(bg,.15);
  var txt=onBg(bg);
  var txtSub=rgba(txt,.72),txtMut=rgba(txt,.44);
  var bdr=rgba(txt,.12),bdrStr=rgba(txt,.24);
  var da=safeAccent(acc,bg,3.7);
  var safeHi=safeAccent(hi,bg,2.8);
  var navBg=o.navBg||(isPokemon?mix(bg,pri,.38):pri);
  if(contrast(onBg(navBg),navBg)<4.5)navBg=bg;
  var heroBg=mix(bg,pri,.48);
  var footBg=mix(bg,'#000000',.22);
  return{bg:bg,surf:surf,surfAlt:surfAlt,txt:txt,txtSub:txtSub,txtMut:txtMut,
    bdr:bdr,bdrStr:bdrStr,navBg:navBg,onNav:onBg(navBg),pri:pri,sec:sec,acc:da,rawAcc:acc,hi:safeHi,
    onAcc:onBg(da),btnHov:lum(da)<.35?adj(da,.16):adj(da,-.12),footBg:footBg,
    footTxt:onBg(footBg),shadow:rgba(pri,.38),heroBg:heroBg};
}
function resolvePalette(team,colorway){
  var mode=colorway||state.colorway;
  var isPokemon=state.league==='pokemon';
  var isMtg=state.league==='mtg';
  if(isPokemon){
    var shiny=mode==='away';
    var x=(shiny&&team.sh)?team.sh:(team.pal||null);
    if(x){return smartPalette({kind:'pokemon',primary:x.p,secondary:x.s,accent:x.a,highlight:x.h,base:x.b});}
  }
  if(isMtg&&team.pal){
    var m=(mode==='away'&&team.alt)?team.alt:team.pal;
    return smartPalette({kind:'mtg',primary:m.p,secondary:m.s,accent:m.a,highlight:m.h,base:m.b});
  }
  var home=mode!=='away';
  var pri=team[home?'hp':'ap']||'#0c2c56';
  var acc=team[home?'ap':'hp']||'#69be28';
  return smartPalette({kind:state.league,primary:pri,secondary:acc,accent:acc,highlight:acc});
}

function findTeam(league,k){
  var list=TEAMS[league]||[];
  for(var i=0;i<list.length;i++){if(String(list[i].k)===String(k))return list[i];}
  return null;
}

WO.applyTheme=function(team,colorway){
  if(!team)return;
  var p=resolvePalette(team,colorway);
  var css=
  ':root{--wo-primary:'+p.pri+';--wo-secondary:'+p.sec+';--wo-accent:'+p.acc+';--wo-highlight:'+p.hi+';--wo-bg:'+p.bg+';--wo-surface:'+p.surf+';--wo-surface-alt:'+p.surfAlt+';--wo-text:'+p.txt+';--wo-text-sub:'+p.txtSub+';--wo-border:'+p.bdr+';}'+
  'html,body{background-color:'+p.bg+' !important;color:'+p.txt+' !important;}'+
  '.page-wrapper-2,.page-content{background-color:'+p.bg+' !important;}'+
  '[id="page-content"],[class*="Page content"]{background-color:'+p.bg+' !important;}'+
  '.navbar6_component,.navbar6_container,.w-nav{background:'+p.navBg+' !important;}'+
  '.navbar6_link,.w-nav-link{color:'+p.onNav+' !important;}'+
  '.navbar6_link:hover,.navbar6_link.w--current{color:'+p.hi+' !important;}'+
  '.navbar6_dropdown-list,.w-dropdown-list{background:'+p.surf+' !important;border-color:'+p.bdr+' !important;}'+
  '.navbar6_dropdown-link{color:'+p.txt+' !important;}'+
  '.navbar6_dropdown-link:hover{color:'+p.acc+' !important;background:'+p.surfAlt+' !important;}'+
  '.menu-icon_line-top,.menu-icon_line-middle,.menu-icon_line-middle-inner,.menu-icon_line-bottom{background-color:'+p.onNav+' !important;}'+
  '.w-nav-overlay,.w-nav-overlay .w-nav-menu{background:'+p.navBg+' !important;}'+
  '.wo-my-team-btn{background:'+p.acc+' !important;color:'+p.onAcc+' !important;border:none !important;box-shadow:0 0 0 1px '+rgba(p.hi,.25)+' !important;}'+
  '.promo-strip,.Promo-strip{background:'+p.acc+' !important;}'+
  '.rotating-promo-text,.promo-strip *{color:'+p.onAcc+' !important;}'+
  '.trust-strip{background:'+p.surfAlt+' !important;border-top-color:'+p.bdrStr+' !important;border-bottom-color:'+p.bdrStr+' !important;}'+
  '.trust-strip__item{color:'+p.txtSub+' !important;}'+
  '.section-hero,.Section-hero{background:radial-gradient(circle at 15% 10%,'+rgba(p.hi,.28)+',transparent 26%),linear-gradient(135deg,'+p.heroBg+','+p.bg+') !important;}'+
  '.slider-3,.Slider-3{background-color:'+p.heroBg+' !important;}'+
  '.overlay{background-color:'+rgba(p.pri,.52)+' !important;}'+
  '.w-slider-dot{background:'+rgba(p.onNav,.25)+' !important;}'+
  '.w-slider-dot.w-active{background:'+p.acc+' !important;}'+
  '.w-slider-arrow-left,.w-slider-arrow-right{color:'+p.onNav+' !important;}'+
  '.slide-intro,.Slide-intro,.slide-heading,.Slide-heading,.slide-content,.basic-slide-content{color:#ffffff !important;text-shadow:0 2px 22px rgba(0,0,0,.55) !important;}'+
  '.text-white,.Text-White{color:#ffffff !important;}'+
  '.basic-slider,.Basic-slider{background-color:'+p.bg+' !important;}'+
  '.basic-slide-wrapper{background:linear-gradient(135deg,'+p.heroBg+','+p.bg+') !important;}'+
  '.dark-slide-arrow{background-color:'+p.navBg+' !important;border-color:'+p.bdrStr+' !important;color:'+p.onNav+' !important;}'+
  '.section-3,.Section-3{background-color:'+p.bg+' !important;}'+
  'h1,h2,h3,h4,h5,h6{color:'+p.txt+' !important;}'+
  '.heading,.Heading{color:'+p.txt+' !important;}'+
  'p{color:'+p.txtSub+' !important;}'+
  '.body-display,.body-display-2{color:'+p.txtSub+' !important;}'+
  '.text-block-5,.text-block{color:'+p.txtSub+' !important;}'+
  '.stacked-intro,.story-content,.story-content *{color:'+p.txt+' !important;}'+
  '.width-large,.width-medium{color:'+p.txt+' !important;}'+
  '.button-3,.Button-3{background:'+p.acc+' !important;color:'+p.onAcc+' !important;border-color:'+p.acc+' !important;}'+
  '.button-3:hover{background:'+p.btnHov+' !important;}'+
  '.button-3.dark,.Button-3.Dark{background:'+p.navBg+' !important;color:'+p.onNav+' !important;}'+
  '.underline-link,.Underline-link{color:'+p.txtSub+' !important;border-bottom-color:'+p.bdr+' !important;}'+
  '.underline-link.light,.underline-link.Light{color:#fff !important;}'+
  '.underline-link:hover{color:'+p.acc+' !important;}'+
  '.collection-item-4{background:'+p.surf+' !important;border-color:'+p.bdr+' !important;}'+
  '.collection-item-4:hover{border-color:'+p.acc+' !important;box-shadow:0 10px 35px '+rgba(p.pri,.22)+' !important;}'+
  '.w-dyn-item{background:'+p.surf+' !important;}'+
  '.card,.break-card,.product-card{background:'+p.surf+' !important;border-color:'+p.bdr+' !important;}'+
  '.card:hover,.break-card:hover,.product-card:hover{border-color:'+p.acc+' !important;}'+
  '.card-title,.product-title{color:'+p.txt+' !important;}'+
  '.card-price,.price-tag{color:'+p.acc+' !important;}'+
  '.card-meta,.card-date{color:'+p.txtSub+' !important;}'+
  'input,textarea,select,.w-input,.w-select{background:'+p.surf+' !important;color:'+p.txt+' !important;border-color:'+p.bdrStr+' !important;}'+
  'input::placeholder,textarea::placeholder{color:'+p.txtMut+' !important;}'+
  '.w-form-label{color:'+p.txt+' !important;}'+
  '.w-tab-link{color:'+p.txtSub+' !important;border-color:'+p.bdr+' !important;}'+
  '.w-tab-link.w--current{color:'+p.acc+' !important;border-color:'+p.acc+' !important;background:'+rgba(p.acc,.12)+' !important;}'+
  '.w-commerce-commerceaddtocartbutton,.w-commerce-commercecartcheckoutbutton,.w-commerce-commercebuynowbutton{background:'+p.acc+' !important;color:'+p.onAcc+' !important;}'+
  '.w-commerce-commercecartcontainerwrapper{background:'+p.surf+' !important;}'+
  '.w-commerce-commercecartitem,.w-commerce-commercecartiteminfo{color:'+p.txt+' !important;}'+
  '.w-commerce-commercecartlineitem{border-color:'+p.bdr+' !important;}'+
  '.footer,.footer-section,.Footer,.SemiFooter{background:'+p.footBg+' !important;}'+
  '.footer *,.footer-section *,.Footer *,.SemiFooter *{color:'+p.footTxt+' !important;}'+
  '.footer a,.footer-link,.Footer a{color:'+rgba(p.footTxt,.62)+' !important;}'+
  '.footer a:hover,.footer-link:hover{color:'+p.hi+' !important;}'+
  'hr,.footer hr,.Footer hr{border-color:'+rgba(p.footTxt,.12)+' !important;}'+
  '.w-richtext a{color:'+p.acc+' !important;}'+
  '.w-richtext blockquote{border-left-color:'+p.acc+' !important;}'+
  '.badge,.tag,.pill{background:'+rgba(p.acc,.16)+' !important;color:'+p.acc+' !important;border-color:'+rgba(p.acc,.28)+' !important;}';

  var el=document.getElementById('wo-theme-css');
  if(!el){el=document.createElement('style');el.id='wo-theme-css';document.head.appendChild(el);}
  el.textContent=css;
  updateNavBtn(team,colorway);
};

// MODAL
var overlay,sheet,grid,cwRow;
var LABELS={nfl:'NFL',mlb:'MLB',nba:'NBA',nhl:'NHL',pokemon:'Pokémon',mtg:'MTG'};
function isPokemon(){return state.league==='pokemon';}
function logoUrl(league,k,colorway){
  if(league==='pokemon'){
    var shiny=(colorway||state.colorway)==='away';
    return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+(shiny?'shiny/':'')+k+'.png';
  }
  if(league==='mtg'){
    var kk=String(k).toUpperCase();
    return 'https://svgs.scryfall.io/card-symbols/'+(kk.length<=2?kk:kk.charAt(0))+'.svg';
  }
  return'https://a.espncdn.com/i/teamlogos/'+league+'/500/'+k+'.png';
}
function currentModeLabels(){
  if(isPokemon())return[{k:'home',l:'Pokémon'},{k:'away',l:'✨ Shiny'}];
  if(state.league==='mtg')return[{k:'home',l:'Mana Theme'},{k:'away',l:'Foil Alt'}];
  return[{k:'home',l:'🏠 Home Colors'},{k:'away',l:'✈️ Away Colors'}];
}
function updateModeButtons(){
  if(!cwRow)return;
  cwRow.innerHTML='';
  currentModeLabels().forEach(function(o){
    var b=document.createElement('button');b.dataset.cw=o.k;
    b.style.cssText='all:unset;box-sizing:border-box;padding:10px;text-align:center;border:2px solid rgba(255,255,255,.1);border-radius:10px;font-size:13px;font-weight:800;cursor:pointer;color:rgba(255,255,255,.55);transition:all .2s;';
    b.textContent=o.l;
    b.addEventListener('click',function(){
      state.colorway=o.k;
      if(state.team){WO.applyTheme(state.team,state.colorway);}renderGrid();refreshUI();
    });
    cwRow.appendChild(b);
  });
}
function updateNavBtn(team,colorway){
  if(!team)return;
  var p=resolvePalette(team,colorway);
  var src=logoUrl(state.league,team.k,colorway);
  var name=team.n.length>13?team.n.substring(0,12)+'…':team.n;
  if(isPokemon()&&(colorway||state.colorway)==='away')name='✨ '+name;
  document.querySelectorAll('[data-wo-theme],[data-theme-trigger],[data-wo-open]').forEach(function(btn){
    btn.style.cssText='all:unset;box-sizing:border-box;display:inline-flex;align-items:center;gap:7px;padding:5px 13px 5px 6px;border-radius:100px;background:'+p.acc+';color:'+p.onAcc+';font-size:13px;font-weight:900;cursor:pointer;line-height:1;transition:opacity .2s;white-space:nowrap;box-shadow:0 0 0 1px '+rgba(p.hi,.25)+';';
    btn.innerHTML='';
    var img=document.createElement('img');
    img.style.cssText='width:26px;height:26px;object-fit:contain;border-radius:50%;background:rgba(255,255,255,.18);flex-shrink:0;display:block;';
    img.src=src;img.alt=team.n;
    img.onerror=function(){this.style.display='none';};
    var lbl=document.createElement('span');lbl.textContent=name;
    btn.appendChild(img);btn.appendChild(lbl);
  });
}
function mc(){
  if(!state.team)return{bg:'#13161c',acc:'#69be28',txt:'#fff',sub:'rgba(255,255,255,.65)',bdr:'rgba(255,255,255,.12)',hi:'#9cff5a'};
  var p=resolvePalette(state.team,state.colorway);
  return{bg:p.bg,acc:p.acc,txt:p.txt,sub:p.txtSub,bdr:p.bdr,hi:p.hi};
}
function refreshUI(){
  var m=mc();
  if(sheet){sheet.style.background='linear-gradient(180deg,'+m.bg+','+mix(m.bg,'#000000',.18)+')';sheet.style.borderTop='3px solid '+m.acc;}
  var t=document.getElementById('wo-ttl');if(t)t.style.color=m.txt;
  var s=document.getElementById('wo-sub');if(s)s.style.color=m.sub;
  var d=document.getElementById('wo-done');if(d){d.style.background=m.acc;d.style.color=onBg(m.acc);}
  document.querySelectorAll('[data-cw]').forEach(function(b){
    var on=b.dataset.cw===state.colorway;
    b.style.borderColor=on?m.acc:m.bdr;b.style.color=on?m.acc:m.sub;
    b.style.background=on?rgba(m.acc,.16):'transparent';
    b.style.boxShadow=on?'0 0 22px '+rgba(m.acc,.22):'none';
  });
  document.querySelectorAll('[data-lg]').forEach(function(b){
    var on=b.dataset.lg===state.league;
    b.style.background=on?m.acc:'transparent';b.style.color=on?onBg(m.acc):m.sub;
  });
  document.querySelectorAll('.wo-tile').forEach(function(t){
    var sel=state.team&&t.dataset.k===String(state.team.k)&&t.dataset.lg===state.league;
    t.style.borderColor=sel?m.acc:m.bdr;
    t.style.background=sel?rgba(m.acc,.14):'rgba(255,255,255,.035)';
    t.style.boxShadow=sel?'0 0 0 1px '+m.acc+',0 4px 24px '+rgba(m.acc,.32):'none';
    var l=t.querySelector('.wo-lbl');if(l)l.style.color=sel?m.acc:m.sub;
  });
}
function renderGrid(){
  if(!grid)return;
  updateModeButtons();
  grid.innerHTML='';
  var m=mc();
  var teams=TEAMS[state.league]||[];
  teams.forEach(function(team){
    var t=document.createElement('div');
    t.className='wo-tile';t.dataset.k=String(team.k);t.dataset.lg=state.league;
    t.style.cssText='display:flex;flex-direction:column;align-items:center;gap:5px;padding:10px 4px 8px;border-radius:12px;cursor:pointer;border:1px solid '+m.bdr+';background:rgba(255,255,255,.035);transition:all .18s;';
    var img=document.createElement('img');
    img.src=logoUrl(state.league,team.k,state.colorway);
    img.style.cssText='width:44px;height:44px;object-fit:contain;filter:drop-shadow(0 5px 9px rgba(0,0,0,.35));';
    img.onerror=function(){this.style.display='none';};
    var lbl=document.createElement('div');
    lbl.className='wo-lbl';lbl.textContent=(isPokemon()&&state.colorway==='away'?'✨ ':'')+team.n;
    lbl.style.cssText='font-size:9px;text-align:center;line-height:1.3;font-weight:800;max-width:68px;word-break:break-word;color:'+m.sub+';';
    t.appendChild(img);t.appendChild(lbl);
    t.addEventListener('click',function(){
      state.team=team;WO.applyTheme(team,state.colorway);
      try{localStorage.setItem(LS,JSON.stringify({k:team.k,n:team.n,hp:team.hp,ap:team.ap,league:state.league,colorway:state.colorway}));}catch(e){}
      refreshUI();
    });
    grid.appendChild(t);
  });
  refreshUI();
}
function buildModal(){
  if(overlay)return;
  overlay=document.createElement('div');
  overlay.style.cssText='position:fixed;inset:0;z-index:2147483647;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,0);pointer-events:none;transition:background .3s;font-family:system-ui,-apple-system,sans-serif;';
  overlay.addEventListener('click',function(e){if(e.target===overlay)closeModal();});
  sheet=document.createElement('div');
  sheet.style.cssText='width:100%;max-width:720px;max-height:88vh;display:flex;flex-direction:column;overflow:hidden;border-radius:20px 20px 0 0;background:#13161c;box-shadow:0 -20px 80px rgba(0,0,0,.9);transform:translateY(105%);transition:transform .38s cubic-bezier(.32,.72,0,1);';
  var hdl=document.createElement('div');
  hdl.style.cssText='padding:12px 0 4px;display:flex;justify-content:center;cursor:pointer;flex-shrink:0;';
  var pip=document.createElement('div');pip.style.cssText='width:40px;height:4px;border-radius:2px;background:rgba(255,255,255,.18);';
  hdl.appendChild(pip);hdl.addEventListener('click',closeModal);
  var hdr=document.createElement('div');hdr.style.cssText='flex-shrink:0;padding:8px 20px 0;';
  var row1=document.createElement('div');row1.style.cssText='display:flex;justify-content:space-between;align-items:flex-start;gap:12px;';
  var tb=document.createElement('div');
  var ttl=document.createElement('div');ttl.id='wo-ttl';ttl.textContent='Choose Your Theme';
  ttl.style.cssText='font-size:20px;font-weight:950;color:#fff;letter-spacing:-.02em;';
  var sub=document.createElement('div');sub.id='wo-sub';sub.textContent='Teams, full Pokémon palettes, shiny Pokémon, and MTG mana palettes update site-wide.';
  sub.style.cssText='font-size:12px;color:rgba(255,255,255,.65);margin-top:2px;';
  tb.appendChild(ttl);tb.appendChild(sub);
  var done=document.createElement('button');done.id='wo-done';done.textContent='Done';
  done.style.cssText='all:unset;cursor:pointer;padding:9px 22px;border-radius:100px;font-size:13px;font-weight:900;background:#69be28;color:#fff;';
  done.addEventListener('click',closeModal);
  row1.appendChild(tb);row1.appendChild(done);
  cwRow=document.createElement('div');cwRow.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px;';
  var tabs=document.createElement('div');tabs.style.cssText='display:flex;gap:6px;overflow-x:auto;padding:12px 0 2px;scrollbar-width:none;';
  Object.keys(TEAMS).forEach(function(lg){
    var b=document.createElement('button');b.dataset.lg=lg;b.textContent=LABELS[lg]||lg;
    b.style.cssText='all:unset;padding:7px 16px;border-radius:100px;font-size:12px;font-weight:900;cursor:pointer;white-space:nowrap;color:rgba(255,255,255,.55);transition:all .2s;';
    b.addEventListener('click',function(){state.league=lg;renderGrid();});
    tabs.appendChild(b);
  });
  hdr.appendChild(row1);hdr.appendChild(cwRow);hdr.appendChild(tabs);
  grid=document.createElement('div');
  grid.style.cssText='flex:1;overflow-y:auto;padding:12px 20px 32px;display:grid;grid-template-columns:repeat(auto-fill,minmax(78px,1fr));gap:8px;';
  sheet.appendChild(hdl);sheet.appendChild(hdr);sheet.appendChild(grid);
  overlay.appendChild(sheet);document.body.appendChild(overlay);
  updateModeButtons();
}
function openModal(){buildModal();overlay.style.background='rgba(0,0,0,.76)';overlay.style.pointerEvents='auto';sheet.style.transform='translateY(0)';renderGrid();refreshUI();}
function closeModal(){if(!overlay)return;overlay.style.background='rgba(0,0,0,0)';overlay.style.pointerEvents='none';sheet.style.transform='translateY(105%)';}
WO.openTheme=openModal;WO.closeTheme=closeModal;

function init(){
  try{
    var d=localStorage.getItem(LS);
    if(d){
      var s=JSON.parse(d);
      state.league=s.league||'nfl';
      state.colorway=s.colorway||'home';
      state.team=findTeam(state.league,s.k)||{k:s.k,n:s.n,hp:s.hp,ap:s.ap};
      WO.applyTheme(state.team,state.colorway);
    }
  }catch(e){}
  document.querySelectorAll('[data-wo-theme],[data-theme-trigger],[data-wo-open]').forEach(function(el){
    el.addEventListener('click',openModal);
  });
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}
else{init();}

})();
