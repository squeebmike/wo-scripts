ChatGPT Plus





























Pasted text(5).txt
Document
i need the color pallets made better, its for a website, there has to be contrast between them, so we can see text against backgrounds, buttons stand out ect.  

Worked for 9m 28s
I rebuilt the palette engine from your uploaded code. 


What changed
Separated raw brand colors from functional website colors.

Buttons now use their own saturated color instead of sharing the link color.

Text and links maintain at least 4.5:1 contrast.

Buttons and form borders maintain at least 3:1 separation.

Navbar and footer hover colors are calculated independently.

Cards and alternate sections have stronger visual separation.

Button hover states remain readable and visibly different.

Added accessible focus outlines for links, buttons, and form fields.

Preserved the existing saved-theme key so visitors’ selections carry forward.

I tested 2,362 theme variants—all sports home/away themes, MTG themes, and every Pokémon normal/shiny palette—with zero threshold failures.

wo-theme-picker-v15-contrast-safe.js

wo-theme-picker-v15-contrast-safe.txt

wo-theme-picker-v15-contrast-audit.txt


Library
/
wo-theme-picker-v15-contrast-safe.txt


(function(){
'use strict';
var WO=window.WO={};window.__WO__=true;
var TEAMS={"nfl":[{"k":"ari","n":"Cardinals","hp":"#97233f","ap":"#000000"},{"k":"atl","n":"Falcons","hp":"#a71930","ap":"#000000"},{"k":"bal","n":"Ravens","hp":"#241773","ap":"#9e7c0c"},{"k":"buf","n":"Bills","hp":"#00338d","ap":"#c60c30"},{"k":"car","n":"Panthers","hp":"#0085ca","ap":"#000000"},{"k":"chi","n":"Bears","hp":"#0b162a","ap":"#c83803"},{"k":"cin","n":"Bengals","hp":"#fb4f14","ap":"#000000"},{"k":"cle","n":"Browns","hp":"#311d00","ap":"#ff3c00"},{"k":"dal","n":"Cowboys","hp":"#003594","ap":"#869397"},{"k":"den","n":"Broncos","hp":"#fb4f14","ap":"#002244"},{"k":"det","n":"Lions","hp":"#0076b6","ap":"#b0b7bc"},{"k":"gb","n":"Packers","hp":"#203731","ap":"#ffb612"},{"k":"hou","n":"Texans","hp":"#03202f","ap":"#a71930"},{"k":"ind","n":"Colts","hp":"#002c5f","ap":"#a2aaad"},{"k":"jax","n":"Jaguars","hp":"#006778","ap":"#d7a22a"},{"k":"kc","n":"Chiefs","hp":"#e31837","ap":"#ffb81c"},{"k":"lv","n":"Raiders","hp":"#000000","ap":"#a5acaf"},{"k":"lar","n":"Rams","hp":"#003594","ap":"#ffd100"},{"k":"lac","n":"Chargers","hp":"#0080c6","ap":"#ffc20e"},{"k":"mia","n":"Dolphins","hp":"#008e97","ap":"#fc4c02"},{"k":"min","n":"Vikings","hp":"#4f2683","ap":"#ffc62f"},{"k":"ne","n":"Patriots","hp":"#002244","ap":"#c60c30"},{"k":"no","n":"Saints","hp":"#101820","ap":"#d3bc8d"},{"k":"nyg","n":"Giants","hp":"#0b2265","ap":"#a71930"},{"k":"nyj","n":"Jets","hp":"#125740","ap":"#ffffff"},{"k":"phi","n":"Eagles","hp":"#004c54","ap":"#a5acaf"},{"k":"pit","n":"Steelers","hp":"#101820","ap":"#ffb612"},{"k":"sf","n":"49ers","hp":"#aa0000","ap":"#b3995d"},{"k":"sea","n":"Seahawks","hp":"#002244","ap":"#69be28"},{"k":"tb","n":"Buccaneers","hp":"#d50a0a","ap":"#ff7900"},{"k":"ten","n":"Titans","hp":"#0c2340","ap":"#4b92db"},{"k":"wsh","n":"Commanders","hp":"#5a1414","ap":"#ffb612"}],"mlb":[{"k":"ari","n":"D-backs","hp":"#a71930","ap":"#e3d4ad"},{"k":"atl","n":"Braves","hp":"#ce1141","ap":"#13274f"},{"k":"bal","n":"Orioles","hp":"#df4601","ap":"#000000"},{"k":"bos","n":"Red Sox","hp":"#bd3039","ap":"#0d2b56"},{"k":"chc","n":"Cubs","hp":"#0e3386","ap":"#cc3433"},{"k":"cws","n":"White Sox","hp":"#27251f","ap":"#c4ced4"},{"k":"cin","n":"Reds","hp":"#c6011f","ap":"#000000"},{"k":"cle","n":"Guardians","hp":"#00385d","ap":"#e31937"},{"k":"col","n":"Rockies","hp":"#33006f","ap":"#c4ced4"},{"k":"det","n":"Tigers","hp":"#0c2340","ap":"#fa4616"},{"k":"hou","n":"Astros","hp":"#002d62","ap":"#eb6e1f"},{"k":"kc","n":"Royals","hp":"#004687","ap":"#bd9b60"},{"k":"laa","n":"Angels","hp":"#ba0021","ap":"#003263"},{"k":"lad","n":"Dodgers","hp":"#005a9c","ap":"#ef3e42"},{"k":"mia","n":"Marlins","hp":"#00a3e0","ap":"#ef3340"},{"k":"mil","n":"Brewers","hp":"#12284b","ap":"#ffc52f"},{"k":"min","n":"Twins","hp":"#002b5c","ap":"#d31145"},{"k":"nym","n":"Mets","hp":"#002d72","ap":"#ff5910"},{"k":"nyy","n":"Yankees","hp":"#003087","ap":"#e4002c"},{"k":"oak","n":"Athletics","hp":"#003831","ap":"#efb21e"},{"k":"phi","n":"Phillies","hp":"#e81828","ap":"#002d72"},{"k":"pit","n":"Pirates","hp":"#27251f","ap":"#fdb827"},{"k":"sd","n":"Padres","hp":"#2f241d","ap":"#ffc425"},{"k":"sf","n":"Giants","hp":"#fd5a1e","ap":"#27251f"},{"k":"sea","n":"Mariners","hp":"#0c2c56","ap":"#005c5c"},{"k":"stl","n":"Cardinals","hp":"#c41e3a","ap":"#0c2340"},{"k":"tb","n":"Rays","hp":"#092c5c","ap":"#8fbce6"},{"k":"tex","n":"Rangers","hp":"#003278","ap":"#c0111f"},{"k":"tor","n":"Blue Jays","hp":"#134a8e","ap":"#1d2d5c"},{"k":"wsh","n":"Nationals","hp":"#ab0003","ap":"#14225a"}],"nba":[{"k":"hawks","n":"Hawks","hp":"#e03a3e","ap":"#c1d32f"},{"k":"celtics","n":"Celtics","hp":"#007a33","ap":"#ba9653"},{"k":"nets","n":"Nets","hp":"#000000","ap":"#ffffff"},{"k":"hornets","n":"Hornets","hp":"#1d1160","ap":"#00788c"},{"k":"bulls","n":"Bulls","hp":"#ce1141","ap":"#000000"},{"k":"cavaliers","n":"Cavaliers","hp":"#860038","ap":"#fdbb30"},{"k":"mavericks","n":"Mavericks","hp":"#00538c","ap":"#002b5e"},{"k":"nuggets","n":"Nuggets","hp":"#0e2240","ap":"#fec524"},{"k":"pistons","n":"Pistons","hp":"#c8102e","ap":"#006bb6"},{"k":"warriors","n":"Warriors","hp":"#1d428a","ap":"#ffc72c"},{"k":"rockets","n":"Rockets","hp":"#ce1141","ap":"#000000"},{"k":"pacers","n":"Pacers","hp":"#002d62","ap":"#fdbb30"},{"k":"clippers","n":"Clippers","hp":"#c8102e","ap":"#1d428a"},{"k":"lakers","n":"Lakers","hp":"#552583","ap":"#fdb927"},{"k":"grizzlies","n":"Grizzlies","hp":"#5d76a9","ap":"#12173f"},{"k":"heat","n":"Heat","hp":"#98002e","ap":"#f9a01b"},{"k":"bucks","n":"Bucks","hp":"#00471b","ap":"#eee1c6"},{"k":"timberwolves","n":"T-Wolves","hp":"#0c2340","ap":"#236192"},{"k":"pelicans","n":"Pelicans","hp":"#0c2340","ap":"#c8102e"},{"k":"knicks","n":"Knicks","hp":"#006bb6","ap":"#f58426"},{"k":"thunder","n":"Thunder","hp":"#007ac1","ap":"#ef3b24"},{"k":"magic","n":"Magic","hp":"#0077c0","ap":"#000000"},{"k":"sixers","n":"76ers","hp":"#006bb6","ap":"#ed174c"},{"k":"suns","n":"Suns","hp":"#1d1160","ap":"#e56020"},{"k":"blazers","n":"Blazers","hp":"#e03a3e","ap":"#000000"},{"k":"kings","n":"Kings","hp":"#5a2d81","ap":"#63727a"},{"k":"spurs","n":"Spurs","hp":"#c4ced4","ap":"#000000"},{"k":"raptors","n":"Raptors","hp":"#ce1141","ap":"#000000"},{"k":"jazz","n":"Jazz","hp":"#002b5c","ap":"#f9a01b"},{"k":"wizards","n":"Wizards","hp":"#002b5c","ap":"#e31837"}],"nhl":[{"k":"ana","n":"Ducks","hp":"#fc4c02","ap":"#85714d"},{"k":"bos","n":"Bruins","hp":"#fcb514","ap":"#000000"},{"k":"buf","n":"Sabres","hp":"#003087","ap":"#fcb514"},{"k":"cgy","n":"Flames","hp":"#c8102e","ap":"#f1be48"},{"k":"car","n":"Hurricanes","hp":"#cc0000","ap":"#000000"},{"k":"chi","n":"Blackhawks","hp":"#cf0a2c","ap":"#000000"},{"k":"col","n":"Avalanche","hp":"#6f263d","ap":"#236192"},{"k":"cbj","n":"Blue Jackets","hp":"#002654","ap":"#ce1126"},{"k":"dal","n":"Stars","hp":"#006847","ap":"#8f8f8c"},{"k":"det","n":"Red Wings","hp":"#ce1126","ap":"#ffffff"},{"k":"edm","n":"Oilers","hp":"#041e42","ap":"#fc4c02"},{"k":"fla","n":"Panthers","hp":"#041e42","ap":"#c8102e"},{"k":"la","n":"Kings","hp":"#111111","ap":"#a2aaad"},{"k":"min","n":"Wild","hp":"#154734","ap":"#ddcba4"},{"k":"mtl","n":"Canadiens","hp":"#af1e2d","ap":"#192168"},{"k":"nsh","n":"Predators","hp":"#041e42","ap":"#ffb81c"},{"k":"nj","n":"Devils","hp":"#ce1126","ap":"#000000"},{"k":"nyi","n":"Islanders","hp":"#00539b","ap":"#f47d30"},{"k":"nyr","n":"Rangers","hp":"#0038a8","ap":"#ce1126"},{"k":"ott","n":"Senators","hp":"#c2912c","ap":"#000000"},{"k":"phi","n":"Flyers","hp":"#f74902","ap":"#000000"},{"k":"pit","n":"Penguins","hp":"#fcb514","ap":"#000000"},{"k":"sjs","n":"Sharks","hp":"#006d75","ap":"#000000"},{"k":"sea","n":"Kraken","hp":"#001628","ap":"#99d9d9"},{"k":"stl","n":"Blues","hp":"#002f87","ap":"#fcb514"},{"k":"tb","n":"Lightning","hp":"#002868","ap":"#ffffff"},{"k":"tor","n":"Maple Leafs","hp":"#003e7e","ap":"#ffffff"},{"k":"van","n":"Canucks","hp":"#00205b","ap":"#00843d"},{"k":"vgk","n":"Golden Knights","hp":"#b4975a","ap":"#333f42"},{"k":"wsh","n":"Capitals","hp":"#041e42","ap":"#c8102e"},{"k":"wpg","n":"Jets","hp":"#041e42","ap":"#ac162c"},{"k":"uta","n":"Utah HC","hp":"#69b3e7","ap":"#000000"}],"mtg":[{"k":"C","n":"Colorless","hp":"#8A8F98","ap":"#D8D8D8","pal":{"p":"#8A8F98","s":"#D8D8D8","a":"#BFA76F","h":"#F0F0F0","b":"#0D0E10"},"alt":{"p":"#D8D8D8","s":"#F0F0F0","a":"#BFA76F","h":"#FFFFFF","b":"#101010"}},{"k":"W","n":"White","hp":"#F1E6C8","ap":"#BFA76F","pal":{"p":"#F1E6C8","s":"#BFA76F","a":"#FFFFFF","h":"#FFF7D8","b":"#11100A"},"alt":{"p":"#FFF4D8","s":"#D8C08A","a":"#7A6A48","h":"#FFFFFF","b":"#15130D"}},{"k":"U","n":"Blue","hp":"#1E6BAE","ap":"#8FD7F7","pal":{"p":"#1E6BAE","s":"#8FD7F7","a":"#C7EEFF","h":"#E0F8FF","b":"#06101E"},"alt":{"p":"#77BCE8","s":"#D8F2FF","a":"#1E6BAE","h":"#FFFFFF","b":"#07141E"}},{"k":"B","n":"Black","hp":"#15110F","ap":"#8A6E5A","pal":{"p":"#15110F","s":"#5A4A44","a":"#BFA76F","h":"#D8C1A3","b":"#030302"},"alt":{"p":"#2A2522","s":"#8A6E5A","a":"#E0C08A","h":"#F0D8B8","b":"#050404"}},{"k":"R","n":"Red","hp":"#C53028","ap":"#F97316","pal":{"p":"#C53028","s":"#F97316","a":"#FFC14A","h":"#FFD08A","b":"#160503"},"alt":{"p":"#E36A2E","s":"#F0B848","a":"#7A1F1F","h":"#FFE08A","b":"#170904"}},{"k":"G","n":"Green","hp":"#0B6B3A","ap":"#8BC36A","pal":{"p":"#0B6B3A","s":"#77A65A","a":"#B6D66A","h":"#D8F5A0","b":"#051108"},"alt":{"p":"#6FA95A","s":"#B8D87A","a":"#0B6B3A","h":"#E8FFB8","b":"#071407"}},{"k":"WU","n":"Azorius","hp":"#1E6BAE","ap":"#F1E6C8","pal":{"p":"#1E6BAE","s":"#F1E6C8","a":"#BFA76F","h":"#E0F8FF","b":"#06101E"},"alt":{"p":"#DDEBFF","s":"#6FAFE0","a":"#D8C08A","h":"#FFFFFF","b":"#0B1018"}},{"k":"WB","n":"Orzhov","hp":"#15110F","ap":"#F1E6C8","pal":{"p":"#15110F","s":"#F1E6C8","a":"#BFA76F","h":"#FFF0C8","b":"#030302"},"alt":{"p":"#F1E6C8","s":"#2A2522","a":"#BFA76F","h":"#FFFFFF","b":"#15130D"}},{"k":"UB","n":"Dimir","hp":"#111827","ap":"#1E6BAE","pal":{"p":"#111827","s":"#1E6BAE","a":"#7C3AED","h":"#B8D8FF","b":"#02040A"},"alt":{"p":"#1E2A3A","s":"#5FAFE8","a":"#BFA76F","h":"#D8F0FF","b":"#04070D"}},{"k":"UR","n":"Izzet","hp":"#1E6BAE","ap":"#C53028","pal":{"p":"#1E6BAE","s":"#C53028","a":"#FFC14A","h":"#9FE8FF","b":"#06101E"},"alt":{"p":"#C53028","s":"#1E6BAE","a":"#8FD7F7","h":"#FFD08A","b":"#160503"}},{"k":"BR","n":"Rakdos","hp":"#15110F","ap":"#C53028","pal":{"p":"#15110F","s":"#C53028","a":"#F97316","h":"#FF9A70","b":"#030302"},"alt":{"p":"#C53028","s":"#15110F","a":"#BFA76F","h":"#FFB08A","b":"#150303"}},{"k":"BG","n":"Golgari","hp":"#0B6B3A","ap":"#15110F","pal":{"p":"#0B6B3A","s":"#15110F","a":"#8A6E2F","h":"#B8D86A","b":"#030803"},"alt":{"p":"#2E4A2A","s":"#1A1714","a":"#BFA76F","h":"#D8E8A8","b":"#050704"}},{"k":"RG","n":"Gruul","hp":"#C53028","ap":"#0B6B3A","pal":{"p":"#C53028","s":"#0B6B3A","a":"#FFC14A","h":"#FFD08A","b":"#120503"},"alt":{"p":"#7A5A24","s":"#5FA05A","a":"#E0C05A","h":"#F0E08A","b":"#0D0A03"}},{"k":"RW","n":"Boros","hp":"#C53028","ap":"#F1E6C8","pal":{"p":"#C53028","s":"#F1E6C8","a":"#BFA76F","h":"#FFD8B8","b":"#160503"},"alt":{"p":"#F1E6C8","s":"#C53028","a":"#D8A948","h":"#FFFFFF","b":"#15130D"}},{"k":"GW","n":"Selesnya","hp":"#0B6B3A","ap":"#F1E6C8","pal":{"p":"#0B6B3A","s":"#F1E6C8","a":"#B6D66A","h":"#E8FFB8","b":"#051108"},"alt":{"p":"#E8F0D0","s":"#6FA95A","a":"#BFA76F","h":"#FFFFFF","b":"#10150A"}},{"k":"GU","n":"Simic","hp":"#0B8A7A","ap":"#1E6BAE","pal":{"p":"#0B8A7A","s":"#1E6BAE","a":"#8FD7F7","h":"#B8FFE8","b":"#03110F"},"alt":{"p":"#5FB8A8","s":"#77BCE8","a":"#D8C05A","h":"#D8FFF5","b":"#071614"}},{"k":"WUB","n":"Esper","hp":"#8A8F98","ap":"#1E6BAE","pal":{"p":"#8A8F98","s":"#1E6BAE","a":"#F1E6C8","h":"#E8F4FF","b":"#05070D"},"alt":{"p":"#D8DCE0","s":"#6FAFE0","a":"#BFA76F","h":"#FFFFFF","b":"#101014"}},{"k":"UBR","n":"Grixis","hp":"#111827","ap":"#C53028","pal":{"p":"#111827","s":"#C53028","a":"#1E6BAE","h":"#FF9A70","b":"#02040A"},"alt":{"p":"#2A2030","s":"#E36A2E","a":"#6FAFE0","h":"#D8C8FF","b":"#050408"}},{"k":"BRG","n":"Jund","hp":"#C53028","ap":"#0B6B3A","pal":{"p":"#C53028","s":"#0B6B3A","a":"#8A6E2F","h":"#FFD08A","b":"#120503"},"alt":{"p":"#6B3A24","s":"#5F8A4A","a":"#D8B64A","h":"#F0D08A","b":"#0B0703"}},{"k":"RGW","n":"Naya","hp":"#0B6B3A","ap":"#F1E6C8","pal":{"p":"#0B6B3A","s":"#C53028","a":"#F1E6C8","h":"#E8FFB8","b":"#051108"},"alt":{"p":"#E8D8A8","s":"#6FA95A","a":"#D84A32","h":"#FFF0C8","b":"#141105"}},{"k":"GWU","n":"Bant","hp":"#0B6B3A","ap":"#1E6BAE","pal":{"p":"#0B6B3A","s":"#1E6BAE","a":"#F1E6C8","h":"#D8F5FF","b":"#051108"},"alt":{"p":"#D8EBC8","s":"#77BCE8","a":"#BFA76F","h":"#FFFFFF","b":"#0F140A"}},{"k":"WBG","n":"Abzan","hp":"#7A5A24","ap":"#0B6B3A","pal":{"p":"#7A5A24","s":"#0B6B3A","a":"#F1E6C8","h":"#E8D8A8","b":"#0D0A03"},"alt":{"p":"#D8C8A0","s":"#6FA95A","a":"#15110F","h":"#FFF0C8","b":"#141105"}},{"k":"URW","n":"Jeskai","hp":"#1E6BAE","ap":"#C53028","pal":{"p":"#1E6BAE","s":"#C53028","a":"#F1E6C8","h":"#E0F8FF","b":"#06101E"},"alt":{"p":"#F1E6C8","s":"#77BCE8","a":"#C53028","h":"#FFFFFF","b":"#15130D"}},{"k":"BGR","n":"Sultai","hp":"#111827","ap":"#0B8A7A","pal":{"p":"#111827","s":"#0B8A7A","a":"#1E6BAE","h":"#B8FFE8","b":"#02040A"},"alt":{"p":"#1C2A24","s":"#5FB8A8","a":"#BFA76F","h":"#D8FFF0","b":"#040805"}},{"k":"RWB","n":"Mardu","hp":"#C53028","ap":"#15110F","pal":{"p":"#C53028","s":"#15110F","a":"#F1E6C8","h":"#FFD08A","b":"#120302"},"alt":{"p":"#2A2522","s":"#C53028","a":"#D8C08A","h":"#F0D8B8","b":"#050404"}},{"k":"GUR","n":"Temur","hp":"#0B6B3A","ap":"#1E6BAE","pal":{"p":"#0B6B3A","s":"#1E6BAE","a":"#F97316","h":"#B8F5FF","b":"#051108"},"alt":{"p":"#2E5A5A","s":"#77BCE8","a":"#D8B64A","h":"#D8FFF5","b":"#071210"}},{"k":"WUBR","n":"Artifice","hp":"#8A8F98","ap":"#1E6BAE","pal":{"p":"#8A8F98","s":"#1E6BAE","a":"#C53028","h":"#E8F4FF","b":"#05070D"},"alt":{"p":"#D8DCE0","s":"#6FAFE0","a":"#E36A2E","h":"#FFFFFF","b":"#101014"}},{"k":"UBRG","n":"Chaos","hp":"#111827","ap":"#0B6B3A","pal":{"p":"#111827","s":"#C53028","a":"#0B6B3A","h":"#FFD08A","b":"#02040A"},"alt":{"p":"#2A2030","s":"#5FA05A","a":"#D8B64A","h":"#D8C8FF","b":"#050408"}},{"k":"BRGW","n":"Aggression","hp":"#C53028","ap":"#0B6B3A","pal":{"p":"#C53028","s":"#0B6B3A","a":"#F1E6C8","h":"#FFD08A","b":"#120302"},"alt":{"p":"#6B3A24","s":"#D8C8A0","a":"#5FA05A","h":"#F0D08A","b":"#0B0703"}},{"k":"RGWU","n":"Altruism","hp":"#0B6B3A","ap":"#1E6BAE","pal":{"p":"#0B6B3A","s":"#1E6BAE","a":"#F1E6C8","h":"#D8F5FF","b":"#051108"},"alt":{"p":"#D8EBC8","s":"#77BCE8","a":"#E36A2E","h":"#FFFFFF","b":"#0F140A"}},{"k":"GWUB","n":"Growth","hp":"#0B8A7A","ap":"#15110F","pal":{"p":"#0B8A7A","s":"#15110F","a":"#F1E6C8","h":"#B8FFE8","b":"#03110F"},"alt":{"p":"#5FB8A8","s":"#2A2522","a":"#D8C08A","h":"#D8FFF5","b":"#071614"}},{"k":"WUBRG","n":"5-Color","hp":"#6B21A8","ap":"#FFD700","pal":{"p":"#6B21A8","s":"#1E6BAE","a":"#FFD700","h":"#FFED8A","b":"#08030F"},"alt":{"p":"#111827","s":"#C53028","a":"#FFD700","h":"#FFFFFF","b":"#02040A"}}]};
var PN='Bulbasaur|Ivysaur|Venusaur|Charmander|Charmeleon|Charizard|Squirtle|Wartortle|Blastoise|Caterpie|Metapod|Butterfree|Weedle|Kakuna|Beedrill|Pidgey|Pidgeotto|Pidgeot|Rattata|Raticate|Spearow|Fearow|Ekans|Arbok|Pikachu|Raichu|Sandshrew|Sandslash|Nidoran-f|Nidorina|Nidoqueen|Nidoran-m|Nidorino|Nidoking|Clefairy|Clefable|Vulpix|Ninetales|Jigglypuff|Wigglytuff|Zubat|Golbat|Oddish|Gloom|Vileplume|Paras|Parasect|Venonat|Venomoth|Diglett|Dugtrio|Meowth|Persian|Psyduck|Golduck|Mankey|Primeape|Growlithe|Arcanine|Poliwag|Poliwhirl|Poliwrath|Abra|Kadabra|Alakazam|Machop|Machoke|Machamp|Bellsprout|Weepinbell|Victreebel|Tentacool|Tentacruel|Geodude|Graveler|Golem|Ponyta|Rapidash|Slowpoke|Slowbro|Magnemite|Magneton|Farfetchd|Doduo|Dodrio|Seel|Dewgong|Grimer|Muk|Shellder|Cloyster|Gastly|Haunter|Gengar|Onix|Drowzee|Hypno|Krabby|Kingler|Voltorb|Electrode|Exeggcute|Exeggutor|Cubone|Marowak|Hitmonlee|Hitmonchan|Lickitung|Koffing|Weezing|Rhyhorn|Rhydon|Chansey|Tangela|Kangaskhan|Horsea|Seadra|Goldeen|Seaking|Staryu|Starmie|Mr-Mime|Scyther|Jynx|Electabuzz|Magmar|Pinsir|Tauros|Magikarp|Gyarados|Lapras|Ditto|Eevee|Vaporeon|Jolteon|Flareon|Porygon|Omanyte|Omastar|Kabuto|Kabutops|Aerodactyl|Snorlax|Articuno|Zapdos|Moltres|Dratini|Dragonair|Dragonite|Mewtwo|Mew|Chikorita|Bayleef|Meganium|Cyndaquil|Quilava|Typhlosion|Totodile|Croconaw|Feraligatr|Sentret|Furret|Hoothoot|Noctowl|Ledyba|Ledian|Spinarak|Ariados|Crobat|Chinchou|Lanturn|Pichu|Cleffa|Igglybuff|Togepi|Togetic|Natu|Xatu|Mareep|Flaaffy|Ampharos|Bellossom|Marill|Azumarill|Sudowoodo|Politoed|Hoppip|Skiploom|Jumpluff|Aipom|Sunkern|Sunflora|Yanma|Wooper|Quagsire|Espeon|Umbreon|Murkrow|Slowking|Misdreavus|Unown|Wobbuffet|Girafarig|Pineco|Forretress|Dunsparce|Gligar|Steelix|Snubbull|Granbull|Qwilfish|Scizor|Shuckle|Heracross|Sneasel|Teddiursa|Ursaring|Slugma|Magcargo|Swinub|Piloswine|Corsola|Remoraid|Octillery|Delibird|Mantine|Skarmory|Houndour|Houndoom|Kingdra|Phanpy|Donphan|Porygon2|Stantler|Smeargle|Tyrogue|Hitmontop|Smoochum|Elekid|Magby|Miltank|Blissey|Raikou|Entei|Suicune|Larvitar|Pupitar|Tyranitar|Lugia|Ho-Oh|Celebi|Treecko|Grovyle|Sceptile|Torchic|Combusken|Blaziken|Mudkip|Marshtomp|Swampert|Poochyena|Mightyena|Zigzagoon|Linoone|Wurmple|Silcoon|Beautifly|Cascoon|Dustox|Lotad|Lombre|Ludicolo|Seedot|Nuzleaf|Shiftry|Taillow|Swellow|Wingull|Pelipper|Ralts|Kirlia|Gardevoir|Surskit|Masquerain|Shroomish|Breloom|Slakoth|Vigoroth|Slaking|Nincada|Ninjask|Shedinja|Whismur|Loudred|Exploud|Makuhita|Hariyama|Azurill|Nosepass|Skitty|Delcatty|Sableye|Mawile|Aron|Lairon|Aggron|Meditite|Medicham|Electrike|Manectric|Plusle|Minun|Volbeat|Illumise|Roselia|Gulpin|Swalot|Carvanha|Sharpedo|Wailmer|Wailord|Numel|Camerupt|Torkoal|Spoink|Grumpig|Spinda|Trapinch|Vibrava|Flygon|Cacnea|Cacturne|Swablu|Altaria|Zangoose|Seviper|Lunatone|Solrock|Barboach|Whiscash|Corphish|Crawdaunt|Baltoy|Claydol|Lileep|Cradily|Anorith|Armaldo|Feebas|Milotic|Castform|Kecleon|Shuppet|Banette|Duskull|Dusclops|Tropius|Chimecho|Absol|Wynaut|Snorunt|Glalie|Spheal|Sealeo|Walrein|Clamperl|Huntail|Gorebyss|Relicanth|Luvdisc|Bagon|Shelgon|Salamence|Beldum|Metang|Metagross|Regirock|Regice|Registeel|Latias|Latios|Kyogre|Groudon|Rayquaza|Jirachi|Deoxys|Turtwig|Grotle|Torterra|Chimchar|Monferno|Infernape|Piplup|Prinplup|Empoleon|Starly|Staravia|Staraptor|Bidoof|Bibarel|Kricketot|Kricketune|Shinx|Luxio|Luxray|Budew|Roserade|Cranidos|Rampardos|Shieldon|Bastiodon|Burmy|Wormadam|Mothim|Combee|Vespiquen|Pachirisu|Buizel|Floatzel|Cherubi|Cherrim|Shellos|Gastrodon|Ambipom|Drifloon|Drifblim|Buneary|Lopunny|Mismagius|Honchkrow|Glameow|Purugly|Chingling|Stunky|Skuntank|Bronzor|Bronzong|Bonsly|Mime-Jr|Happiny|Chatot|Spiritomb|Gible|Gabite|Garchomp|Munchlax|Riolu|Lucario|Hippopotas|Hippowdon|Skorupi|Drapion|Croagunk|Toxicroak|Carnivine|Finneon|Lumineon|Mantyke|Snover|Abomasnow|Weavile|Magnezone|Lickilicky|Rhyperior|Tangrowth|Electivire|Magmortar|Togekiss|Yanmega|Leafeon|Glaceon|Gliscor|Mamoswine|Porygon-Z|Gallade|Probopass|Dusknoir|Froslass|Rotom|Uxie|Mesprit|Azelf|Dialga|Palkia|Heatran|Regigigas|Giratina|Cresselia|Phione|Manaphy|Darkrai|Shaymin|Arceus|Victini|Snivy|Servine|Serperior|Tepig|Pignite|Emboar|Oshawott|Dewott|Samurott|Patrat|Watchog|Lillipup|Herdier|Stoutland|Purrloin|Liepard|Pansage|Simisage|Pansear|Simisear|Panpour|Simipour|Munna|Musharna|Pidove|Tranquill|Unfezant|Blitzle|Zebstrika|Roggenrola|Boldore|Gigalith|Woobat|Swoobat|Drilbur|Excadrill|Audino|Timburr|Gurdurr|Conkeldurr|Tympole|Palpitoad|Seismitoad|Throh|Sawk|Sewaddle|Swadloon|Leavanny|Venipede|Whirlipede|Scolipede|Cottonee|Whimsicott|Petilil|Lilligant|Basculin|Sandile|Krokorok|Krookodile|Darumaka|Darmanitan|Maractus|Dwebble|Crustle|Scraggy|Scrafty|Sigilyph|Yamask|Cofagrigus|Tirtouga|Carracosta|Archen|Archeops|Trubbish|Garbodor|Zorua|Zoroark|Minccino|Cinccino|Gothita|Gothorita|Gothitelle|Solosis|Duosion|Reuniclus|Ducklett|Swanna|Vanillite|Vanillish|Vanilluxe|Deerling|Sawsbuck|Emolga|Karrablast|Escavalier|Foongus|Amoonguss|Frillish|Jellicent|Alomomola|Joltik|Galvantula|Ferroseed|Ferrothorn|Klink|Klang|Klinklang|Tynamo|Eelektrik|Eelektross|Elgyem|Beheeyem|Litwick|Lampent|Chandelure|Axew|Fraxure|Haxorus|Cubchoo|Beartic|Cryogonal|Shelmet|Accelgor|Stunfisk|Mienfoo|Mienshao|Druddigon|Golett|Golurk|Pawniard|Bisharp|Bouffalant|Rufflet|Braviary|Vullaby|Mandibuzz|Heatmor|Durant|Deino|Zweilous|Hydreigon|Larvesta|Volcarona|Cobalion|Terrakion|Virizion|Tornadus|Thundurus|Reshiram|Zekrom|Landorus|Kyurem|Keldeo|Meloetta|Genesect|Chespin|Quilladin|Chesnaught|Fennekin|Braixen|Delphox|Froakie|Frogadier|Greninja|Bunnelby|Diggersby|Fletchling|Fletchinder|Talonflame|Scatterbug|Spewpa|Vivillon|Litleo|Pyroar|Flabebe|Floette|Florges|Skiddo|Gogoat|Pancham|Pangoro|Furfrou|Espurr|Meowstic|Honedge|Doublade|Aegislash|Spritzee|Aromatisse|Swirlix|Slurpuff|Inkay|Malamar|Binacle|Barbaracle|Skrelp|Dragalge|Clauncher|Clawitzer|Helioptile|Heliolisk|Tyrunt|Tyrantrum|Amaura|Aurorus|Sylveon|Hawlucha|Dedenne|Carbink|Goomy|Sliggoo|Goodra|Klefki|Phantump|Trevenant|Pumpkaboo|Gourgeist|Bergmite|Avalugg|Noibat|Noivern|Xerneas|Yveltal|Zygarde|Diancie|Hoopa|Volcanion|Rowlet|Dartrix|Decidueye|Litten|Torracat|Incineroar|Popplio|Brionne|Primarina|Pikipek|Trumbeak|Toucannon|Yungoos|Gumshoos|Grubbin|Charjabug|Vikavolt|Crabrawler|Crabominable|Oricorio|Cutiefly|Ribombee|Rockruff|Lycanroc|Wishiwashi|Mareanie|Toxapex|Mudbray|Mudsdale|Dewpider|Araquanid|Fomantis|Lurantis|Morelull|Shiinotic|Salandit|Salazzle|Stufful|Bewear|Bounsweet|Steenee|Tsareena|Comfey|Oranguru|Passimian|Wimpod|Golisopod|Sandygast|Palossand|Pyukumuku|Type-Null|Silvally|Minior|Komala|Turtonator|Togedemaru|Mimikyu|Bruxish|Drampa|Dhelmise|Jangmo-o|Hakamo-o|Kommo-o|Tapu-Koko|Tapu-Lele|Tapu-Bulu|Tapu-Fini|Cosmog|Cosmoem|Solgaleo|Lunala|Nihilego|Buzzwole|Pheromosa|Xurkitree|Celesteela|Kartana|Guzzlord|Necrozma|Magearna|Marshadow|Poipole|Naganadel|Stakataka|Blacephalon|Zeraora|Meltan|Melmetal|Grookey|Thwackey|Rillaboom|Scorbunny|Raboot|Cinderace|Sobble|Drizzile|Inteleon|Skwovet|Greedent|Rookidee|Corvisquire|Corviknight|Blipbug|Dottler|Orbeetle|Nickit|Thievul|Gossifleur|Eldegoss|Wooloo|Dubwool|Chewtle|Drednaw|Yamper|Boltund|Rolycoly|Carkol|Coalossal|Applin|Flapple|Appletun|Silicobra|Sandaconda|Cramorant|Arrokuda|Barraskewda|Toxel|Toxtricity|Sizzlipede|Centiskorch|Clobbopus|Grapploct|Sinistea|Polteageist|Hatenna|Hattrem|Hatterene|Impidimp|Morgrem|Grimmsnarl|Obstagoon|Perrserker|Cursola|Sirfetchd|Mr-Rime|Runerigus|Milcery|Alcremie|Falinks|Pincurchin|Snom|Frosmoth|Stonjourner|Eiscue|Indeedee|Morpeko|Cufant|Copperajah|Dracozolt|Arctozolt|Dracovish|Arctovish|Duraludon|Dreepy|Drakloak|Dragapult|Zacian|Zamazenta|Eternatus|Kubfu|Urshifu|Zarude|Regieleki|Regidrago|Glastrier|Spectrier|Calyrex|Wyrdeer|Kleavor|Ursaluna|Basculegion|Sneasler|Overqwil|Enamorus|Sprigatito|Floragato|Meganium (Paldea)|Fuecoco|Crocalor|Skeledirge|Quaxly|Quaxwell|Quaquaval|Lechonk|Oinkologne|Tarountula|Spidops|Nymble|Lokix|Pawmi|Pawmo|Pawmot|Tandemaus|Maushold|Fidough|Dachsbun|Smoliv|Dolliv|Arboliva|Squawkabilly|Nacli|Naclstack|Garganacl|Charcadet|Armarouge|Ceruledge|Tadbulb|Bellibolt|Wattrel|Kilowattrel|Maschiff|Mabosstiff|Shroodle|Grafaiai|Bramblin|Brambleghast|Toedscool|Toedscruel|Klawf|Capsakid|Scovillain|Rellor|Rabsca|Flittle|Espathra|Tinkatink|Tinkatuff|Tinkaton|Wiglett|Wugtrio|Bombirdier|Finizen|Palafin|Varoom|Revavroom|Cyclizar|Orthworm|Glimmet|Glimmora|Greavard|Houndstone|Flamigo|Cetoddle|Cetitan|Veluza|Dondozo|Tatsugiri|Annihilape|Clodsire|Farigiraf|Dudunsparce|Kingambit|Great-Tusk|Scream-Tail|Brute-Bonnet|Flutter-Mane|Slither-Wing|Sandy-Shocks|Iron-Treads|Iron-Bundle|Iron-Hands|Iron-Jugulis|Iron-Moth|Iron-Thorns|Frigibax|Arctibax|Baxcalibur|Gimmighoul|Gholdengo|Wo-Chien|Chien-Pao|Ting-Lu|Chi-Yu|Roaring-Moon|Iron-Valiant|Koraidon|Miraidon|Walking-Wake|Iron-Leaves|Dipplin|Poltchageist|Sinistcha|Okidogi|Munkidori|Fezandipiti|Ogerpon|Archaludon|Hydrapple|Gouging-Fire|Raging-Bolt|Iron-Boulder|Iron-Crown|Terapagos|Pecharunt',PC='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';
(function(){var ns=PN.split('|'),bin=atob(PC);function hx(n){return(n<16?'0':'')+n.toString(16)}function col(i,j){var o=i*30+j*3;return '#'+hx(bin.charCodeAt(o))+hx(bin.charCodeAt(o+1))+hx(bin.charCodeAt(o+2))}TEAMS.pokemon=ns.map(function(n,i){var pal={p:col(i,0),s:col(i,1),a:col(i,2),h:col(i,3),b:col(i,4)},sh={p:col(i,5),s:col(i,6),a:col(i,7),h:col(i,8),b:col(i,9)};return{k:String(i+1),n:n,hp:pal.p,ap:pal.a,pal:pal,sh:sh}})})();
// COLOR MATH + SMART PALETTE ENGINE
// v15: brand colors are mapped into separate, contrast-tested UI roles for backgrounds, surfaces, text, links, buttons, navigation, and footer states.
// No canvas/image sampling: palettes are converted into contrast-safe UI roles for readable Webflow theming.
var LS='wo-v14-static-pokemon-contrast-palette'; // Keep the existing key so saved user selections carry forward into v15.
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
function onBg(h){return contrast('#000000',h)>=contrast('#ffffff',h)?'#000000':'#ffffff';}
function rgba(h,a){var r=hex2rgb(h);return'rgba('+r[0]+','+r[1]+','+r[2]+','+a+')';}
function mix(a,b,t){
  var x=hex2rgb(a),y=hex2rgb(b);
  return rgb2hex(x[0]+(y[0]-x[0])*t,x[1]+(y[1]-x[1])*t,x[2]+(y[2]-x[2])*t);
}
function adj(h,p){return mix(h,p>0?'#ffffff':'#000000',Math.abs(p));}
function rgbToHsl(h){
  var c=hex2rgb(h),r=c[0]/255,g=c[1]/255,b=c[2]/255;
  var max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min,H=0,S=0,L=(max+min)/2;
  if(d){
    S=L>.5?d/(2-max-min):d/(max+min);
    if(max===r)H=((g-b)/d+(g<b?6:0))/6;
    else if(max===g)H=((b-r)/d+2)/6;
    else H=((r-g)/d+4)/6;
  }
  return[H,S,L];
}
function hslToHex(H,S,L){
  function hue2rgb(p,q,t){if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p;}
  var r,g,b;
  if(S===0){r=g=b=L;}else{
    var q=L<.5?L*(1+S):L+S-L*S,p=2*L-q;
    r=hue2rgb(p,q,H+1/3);g=hue2rgb(p,q,H);b=hue2rgb(p,q,H-1/3);
  }
  return rgb2hex(r*255,g*255,b*255);
}
function withLightness(h,l){var x=rgbToHsl(h);return hslToHex(x[0],x[1],clamp(l,0,1));}
function minContrast(c,bgs){var m=99;for(var i=0;i<bgs.length;i++)m=Math.min(m,contrast(c,bgs[i]));return m;}
function allContrast(c,bgs,min){return minContrast(c,bgs)>=min;}
function accessibleVariant(c,bgs,min){
  c=c||'#ffffff';bgs=Array.isArray(bgs)?bgs:[bgs];min=min||4.5;
  if(allContrast(c,bgs,min))return c;
  var hsl=rgbToHsl(c),best=null,bestDelta=99;
  for(var i=1;i<=50;i++){
    var d=i/50,up=clamp(hsl[2]+d,0,1),dn=clamp(hsl[2]-d,0,1);
    var tries=[hslToHex(hsl[0],hsl[1],up),hslToHex(hsl[0],hsl[1],dn)];
    for(var j=0;j<tries.length;j++){
      if(allContrast(tries[j],bgs,min)&&d<bestDelta){best=tries[j];bestDelta=d;}
    }
    if(best)return best;
  }
  return minContrast('#ffffff',bgs)>=minContrast('#000000',bgs)?'#ffffff':'#000000';
}
function colorDist(a,b){var x=hex2rgb(a),y=hex2rgb(b);var dr=x[0]-y[0],dg=x[1]-y[1],db=x[2]-y[2];return Math.sqrt(dr*dr+dg*dg+db*db);}
function colorEnergy(c){var h=rgbToHsl(c);return h[1]*(.45+.55*(1-Math.abs(h[2]-.5)*2));}
function uniqueColors(arr){var out=[],seen={};for(var i=0;i<arr.length;i++){var c=(arr[i]||'').toLowerCase();if(c&&!seen[c]){seen[c]=1;out.push(arr[i]);}}return out;}
function pickAccessible(candidates,bgs,min,avoid){
  var list=uniqueColors(candidates),best=null,bestScore=-999;
  for(var i=0;i<list.length;i++){
    var raw=list[i],fit=accessibleVariant(raw,bgs,min),change=colorDist(raw,fit)/442;
    var score=colorEnergy(fit)*2.2-change*1.35+(allContrast(raw,bgs,min)?.55:0)+(list.length-i)*.035;
    if(avoid)score+=Math.min(colorDist(fit,avoid)/120,1)*.45;
    if(score>bestScore){bestScore=score;best=fit;}
  }
  return best||accessibleVariant('#ffffff',bgs,min);
}
function pickRole(preferred,fallbacks,bgs,min,avoid){
  var list=uniqueColors([preferred].concat(fallbacks||[])),best=null,bestScore=-999,maxRawEnergy=0;
  for(var e=0;e<list.length;e++)maxRawEnergy=Math.max(maxRawEnergy,colorEnergy(list[e]));
  var preferredFit=accessibleVariant(preferred,bgs,min),preferredChange=colorDist(preferred,preferredFit)/442;
  if((colorEnergy(preferred)>=.10||maxRawEnergy<.14)&&preferredChange<.48)return preferredFit;
  for(var i=0;i<list.length;i++){
    var raw=list[i],fit=accessibleVariant(raw,bgs,min),change=colorDist(raw,fit)/442,rawEnergy=colorEnergy(raw);
    var priority=i===0?.95:Math.max(.12,.48-i*.07);
    if(i===0&&rawEnergy<.08&&maxRawEnergy>.18)priority=.05;
    var score=priority+colorEnergy(fit)*.95-change*1.1+(allContrast(raw,bgs,min)?.22:0);
    if(avoid)score+=Math.min(colorDist(fit,avoid)/135,1)*.32;
    if(score>bestScore){bestScore=score;best=fit;}
  }
  return best||accessibleVariant(preferred||'#ffffff',bgs,min);
}
function surfaceFrom(bg,target){
  for(var i=5;i<=42;i++){var c=mix(bg,'#ffffff',i/100);if(contrast(c,bg)>=target)return c;}
  return mix(bg,'#ffffff',.42);
}
function capLuminance(c,maxLum){
  if(lum(c)<=maxLum)return c;
  var h=rgbToHsl(c);
  for(var i=1;i<=100;i++){var x=hslToHex(h[0],h[1],clamp(h[2]-i/100,0,1));if(lum(x)<=maxLum)return x;}
  return'#000000';
}
function floorLuminance(c,minLum,tint){
  if(lum(c)>=minLum)return c;
  var base=c,seed=tint||'#ffffff';
  for(var i=1;i<=50;i++){var x=mix(base,seed,i/100);if(lum(x)>=minLum)return x;}
  for(var j=1;j<=20;j++){var y=mix(base,'#ffffff',j/100);if(lum(y)>=minLum)return y;}
  return base;
}
function strongBorder(surface,target){
  for(var i=8;i<=65;i++){var c=mix(surface,'#ffffff',i/100);if(contrast(c,surface)>=target)return c;}
  return'#ffffff';
}
function readableGray(brightestBg,target){
  var c='#ffffff';
  for(var i=0;i<=55;i++){var x=mix('#ffffff',brightestBg,i/100);if(contrast(x,brightestBg)<target)return i?mix('#ffffff',brightestBg,(i-1)/100):'#ffffff';c=x;}
  return c;
}
function hoverColor(base,bgs,min){
  min=min||3;
  var h=rgbToHsl(base),darkText=onBg(base)==='#000000';
  var deltas=darkText?[-.08,.08,-.13,.13]:[.10,-.08,.15,-.13];
  for(var i=0;i<deltas.length;i++){
    var c=hslToHex(h[0],h[1],clamp(h[2]+deltas[i],0,1));
    if(allContrast(c,bgs,min)&&contrast(onBg(c),c)>=4.5&&colorDist(c,base)>=12)return c;
  }
  return base;
}
function safeAccent(acc,bg,min){return accessibleVariant(acc,[bg],min||4.5);}
function readableSurface(bg,amt){return surfaceFrom(bg,amt&&amt>.5?amt:1.35);}

function smartPalette(o){
  var rawPri=o.primary||'#0c2c56';
  var rawSec=o.secondary||o.accent||rawPri;
  var rawAcc=o.accent||rawSec;
  var rawHi=o.highlight||rawAcc;
  var isPokemon=o.kind==='pokemon';
  var seed=o.base||(isPokemon?mix('#05070f',rawPri,lum(rawPri)<.2?.34:.18):(lum(rawPri)<.16?mix('#05070f',rawPri,.34):mix('#060914',rawPri,.18)));
  var bg=capLuminance(seed,.045);
  bg=floorLuminance(bg,.003,rawPri);
  var surf=o.surface||surfaceFrom(bg,1.50);
  var surfAlt=o.surfaceAlt||surfaceFrom(bg,2.00);
  surf=capLuminance(surf,.13);surfAlt=capLuminance(surfAlt,.18);
  var txt=onBg(bg);
  var txtSub=readableGray(surfAlt,7);
  var txtMut=readableGray(surfAlt,4.5);
  var bdr=strongBorder(surf,1.75),bdrStr=strongBorder(surf,3.00);
  var acc=pickRole(rawAcc,[rawHi,rawSec,rawPri],[bg,surf,surfAlt],4.5);
  var btn=pickRole(rawAcc,[rawHi,rawSec,rawPri],[bg,surf,surfAlt],3);
  var pri=pickRole(rawPri,[rawSec,rawHi,rawAcc],[bg,surf],4.5,acc);
  var sec=pickRole(rawSec,[rawHi,rawAcc,rawPri],[bg,surf],4.5,pri);
  var hi=pickRole(rawHi,[rawSec,rawAcc,rawPri],[bg,surf,surfAlt],4.5,acc);
  var navBg=o.navBg||mix(bg,rawPri,.48);
  navBg=capLuminance(navBg,.075);
  if(contrast(navBg,bg)<1.28)navBg=mix(surfaceFrom(bg,1.38),rawPri,.16);
  navBg=capLuminance(navBg,.09);
  var onNav=onBg(navBg);
  var navHi=pickRole(rawHi,[rawAcc,rawSec,rawPri,hi,acc],[navBg],4.5,onNav);
  var heroBg=capLuminance(mix(bg,rawPri,.46),.075);
  if(contrast(heroBg,bg)<1.18)heroBg=capLuminance(mix(surfAlt,rawPri,.22),.085);
  var onHero=onBg(heroBg);
  var footBg=capLuminance(mix(bg,'#000000',.36),.032);
  var footTxt=onBg(footBg);
  var footHi=pickRole(rawHi,[rawAcc,rawSec,rawPri,hi,acc],[footBg],4.5,footTxt);
  var btnHov=hoverColor(btn,[bg,surf,surfAlt],3);
  var onAcc=onBg(acc),onBtn=onBg(btn),onBtnHov=onBg(btnHov);
  var chipBg=surfAlt,chipTxt=acc;
  var focus=pickAccessible([rawHi,rawAcc,rawSec,rawPri],[bg,surf,surfAlt,navBg],3);
  return{bg:bg,surf:surf,surfAlt:surfAlt,txt:txt,txtSub:txtSub,txtMut:txtMut,
    bdr:bdr,bdrStr:bdrStr,navBg:navBg,onNav:onNav,navHi:navHi,
    pri:pri,sec:sec,acc:acc,hi:hi,rawPri:rawPri,rawSec:rawSec,rawAcc:rawAcc,rawHi:rawHi,
    onAcc:onAcc,btn:btn,onBtn:onBtn,btnHov:btnHov,onBtnHov:onBtnHov,footBg:footBg,footTxt:footTxt,footHi:footHi,
    shadow:rgba(rawPri,.34),heroBg:heroBg,onHero:onHero,chipBg:chipBg,chipTxt:chipTxt,focus:focus};
}


// --- Pokémon palette normalization + optional extracted palette correction ---
// v15 direction:
// 1) Every Pokémon entry still has baked normal + shiny pal/sh data in this file.
// 2) When a Pokémon is selected, this can read pre-extracted normal/shiny palette JSON
//    from the public pokemonpalette project and cache it. This is NOT live canvas art sampling.
// 3) Whether the color comes from baked data or extracted JSON, it is mapped through
//    the same contrast-safe site roles so text/buttons/nav/footer stay readable.
var PKM_JSON_CACHE={};
var PKM_JSON_PENDING={};
var PKM_JSON_LS='wo-v14-pkm-json-cache:';
var PKM_JSON_BASE='https://raw.githubusercontent.com/yassenshopov/pokemonpalette/main/public/data/pokemon/';
var PKM_STATIC_FIXES={
  '6:normal':{p:'#D96A1F',s:'#2F91B8',a:'#F0B245',h:'#FFE08A',b:'#180B05'},
  '6:shiny':{p:'#171A21',s:'#8B2638',a:'#E57B34',h:'#FFD166',b:'#05060A'},
  '25:normal':{p:'#F5D21F',s:'#5A351A',a:'#D83A25',h:'#FFE981',b:'#1C1704'},
  '25:shiny':{p:'#E0A82E',s:'#6A3A1D',a:'#D43A2E',h:'#FFD77A',b:'#1D1404'},
  '94:normal':{p:'#403069',s:'#7D54B8',a:'#D06AD6',h:'#CDB7FF',b:'#07040E'},
  '94:shiny':{p:'#3B3748',s:'#827A9A',a:'#C8B4D8',h:'#E2D8FF',b:'#07070B'},
  '130:normal':{p:'#2F9ED8',s:'#0F6F96',a:'#D7BC77',h:'#BFEFFF',b:'#06131D'},
  '130:shiny':{p:'#B3262D',s:'#F2D6A2',a:'#7BD3FF',h:'#FFE2B8',b:'#140407'},
  '133:normal':{p:'#9A572E',s:'#E7C08F',a:'#6F4A35',h:'#FFD9A6',b:'#140B06'},
  '133:shiny':{p:'#CBB57A',s:'#F0D8B8',a:'#8A6B4A',h:'#FFF0C8',b:'#17140A'},
  '134:normal':{p:'#3F9AD1',s:'#83D5DC',a:'#E8DCA7',h:'#C7F4F4',b:'#07161E'},
  '134:shiny':{p:'#9E6ED8',s:'#D5B8E8',a:'#7DB4CF',h:'#F0D4FF',b:'#130A1B'},
  '135:normal':{p:'#E9BC2E',s:'#FFF0A8',a:'#5A4E35',h:'#FFF08A',b:'#1B1604'},
  '135:shiny':{p:'#A9D93A',s:'#E6F28B',a:'#587A32',h:'#F2FF9A',b:'#141B05'},
  '136:normal':{p:'#D96C2A',s:'#F1C979',a:'#B33A23',h:'#FFD08A',b:'#1A0B04'},
  '136:shiny':{p:'#D9A84A',s:'#F3D28D',a:'#9A6532',h:'#FFE39C',b:'#181204'},
  '150:normal':{p:'#B9A5D8',s:'#8067B8',a:'#7A45B8',h:'#E9D9FF',b:'#0F0918'},
  '150:shiny':{p:'#E4D7F2',s:'#67C878',a:'#8055CC',h:'#F4EEFF',b:'#100A18'},
  '151:normal':{p:'#F0AFC6',s:'#FFDDE9',a:'#6FA9E8',h:'#FFE8F2',b:'#1A0D13'},
  '151:shiny':{p:'#79CBEF',s:'#DCEFFF',a:'#6E91FF',h:'#EAF9FF',b:'#071722'},
  '196:normal':{p:'#C998E8',s:'#E8CCFF',a:'#D4417C',h:'#F3D8FF',b:'#13091B'},
  '196:shiny':{p:'#8ACF5A',s:'#C9EE9B',a:'#D33E74',h:'#E6FFC0',b:'#0D1807'},
  '197:normal':{p:'#101321',s:'#F1C94A',a:'#E8D982',h:'#FFE66D',b:'#05060A'},
  '197:shiny':{p:'#101321',s:'#2C9FDC',a:'#D7F7FF',h:'#66D9FF',b:'#05060A'},
  '248:normal':{p:'#4F7A28',s:'#9EB64B',a:'#6B4B2A',h:'#D5E878',b:'#0B1305'},
  '248:shiny':{p:'#9A9150',s:'#D0BF67',a:'#6E5B2C',h:'#F1E183',b:'#151307'},
  '249:normal':{p:'#D9E8F5',s:'#8CB9E8',a:'#3A62B8',h:'#FFFFFF',b:'#07111D'},
  '249:shiny':{p:'#F2C6D7',s:'#E08CAC',a:'#7D69B8',h:'#FFEAF2',b:'#190C12'},
  '250:normal':{p:'#C73027',s:'#F2C94C',a:'#3A9B59',h:'#FFE77A',b:'#160504'},
  '250:shiny':{p:'#D9B756',s:'#F4DC84',a:'#C65A45',h:'#FFF0A0',b:'#171205'},
  '384:normal':{p:'#0A6B3A',s:'#D6B447',a:'#C7252D',h:'#FFE06C',b:'#031008'},
  '384:shiny':{p:'#101816',s:'#D7B648',a:'#C9282D',h:'#FFE27A',b:'#030706'},
  '448:normal':{p:'#1F5AA8',s:'#D5B45A',a:'#C83A2F',h:'#96D7FF',b:'#07101B'},
  '448:shiny':{p:'#D5B85A',s:'#1F4D8A',a:'#B43A2F',h:'#FFE184',b:'#171307'},
  '658:normal':{p:'#1E5FAF',s:'#101827',a:'#D3434A',h:'#8EDBFF',b:'#050B15'},
  '658:shiny':{p:'#11141E',s:'#D73A4A',a:'#4BA3FF',h:'#C8EDFF',b:'#05060A'},
  '700:normal':{p:'#F4CFE2',s:'#7DB8E8',a:'#F08BB6',h:'#FFF1FA',b:'#17101A'},
  '700:shiny':{p:'#EED7F3',s:'#79B6E8',a:'#FF8FB8',h:'#FFF1FF',b:'#17101C'},
  '887:normal':{p:'#24335F',s:'#58A0D8',a:'#D64C64',h:'#A9E4FF',b:'#050913'},
  '887:shiny':{p:'#181B24',s:'#D95C78',a:'#7DFFB2',h:'#FFD1DE',b:'#05060A'}
};
function colorDist(a,b){var x=hex2rgb(a),y=hex2rgb(b);var dr=x[0]-y[0],dg=x[1]-y[1],db=x[2]-y[2];return Math.sqrt(dr*dr+dg*dg+db*db);}
function derivedBase(primary){
  var base=mix('#05070f',primary,lum(primary)<.22?.38:.20);
  return lum(base)>.18?mix(base,'#000000',.55):base;
}
function normalizePokemonPalette(p){
  if(!p)return null;
  var pri=p.p||p.primary||'#0c2c56';
  var sec=p.s||p.secondary||p.a||p.accent||pri;
  var acc=p.a||p.accent||sec;
  var hi=p.h||p.highlight||(p.highlights&&p.highlights[3])||mix(acc,'#ffffff',.38);
  var base=p.b||p.base||derivedBase(pri);
  if(colorDist(pri,sec)<28)sec=colorDist(pri,acc)>34?acc:adj(pri,lum(pri)<.45?.26:-.26);
  if(colorDist(acc,pri)<24&&colorDist(acc,sec)<24)acc=lum(pri)<.5?adj(pri,.45):adj(pri,-.42);
  if(colorDist(hi,acc)<18)hi=lum(acc)<.5?mix(acc,'#ffffff',.48):mix(acc,'#ffffff',.25);
  return{p:pri,s:sec,a:acc,h:hi,b:base};
}
function paletteFromExtractedJson(data,shiny){
  if(!data)return null;
  var src=shiny?data.shinyColorPalette:data.colorPalette;
  if(!src)return null;
  var h=Array.isArray(src.highlights)?src.highlights:[];
  return normalizePokemonPalette({
    p:src.primary||h[0],
    s:src.secondary||h[1]||h[0],
    a:src.accent||h[2]||h[1]||h[0],
    h:h[3]||h[4]||src.accent||src.secondary||src.primary,
    b:derivedBase(src.primary||h[0]||'#0c2c56')
  });
}
function pkmKey(team,colorway){return String(team.k)+':'+(((colorway||state.colorway)==='away')?'shiny':'normal');}
function getCachedPokemonPalette(team,colorway){
  if(state.league!=='pokemon'||!team)return null;
  var key=pkmKey(team,colorway);
  if(PKM_STATIC_FIXES[key])return normalizePokemonPalette(PKM_STATIC_FIXES[key]);
  if(PKM_JSON_CACHE[key])return PKM_JSON_CACHE[key];
  try{var raw=localStorage.getItem(PKM_JSON_LS+key);if(raw){var p=normalizePokemonPalette(JSON.parse(raw));if(p){PKM_JSON_CACHE[key]=p;return p;}}}catch(e){}
  return null;
}
function maybeLoadPokemonJsonPalette(team,colorway){
  if(state.league!=='pokemon'||!team||typeof fetch!=='function')return;
  var shiny=((colorway||state.colorway)==='away');
  var id=String(team.k),key=pkmKey(team,colorway);
  if(PKM_STATIC_FIXES[key]){PKM_JSON_CACHE[key]=normalizePokemonPalette(PKM_STATIC_FIXES[key]);return;}
  if(PKM_JSON_CACHE[key]||PKM_JSON_PENDING[key])return;
  PKM_JSON_PENDING[key]=true;
  fetch(PKM_JSON_BASE+encodeURIComponent(id)+'.json',{cache:'force-cache'})
    .then(function(r){return r&&r.ok?r.json():null;})
    .then(function(data){
      var pal=paletteFromExtractedJson(data,shiny);
      if(pal){
        PKM_JSON_CACHE[key]=pal;
        try{localStorage.setItem(PKM_JSON_LS+key,JSON.stringify(pal));}catch(e){}
        if(state.league==='pokemon'&&state.team&&String(state.team.k)===id&&pkmKey(state.team,state.colorway)===key){
          WO.applyTheme(state.team,state.colorway);
          refreshUI();
        }
      }
    })
    .catch(function(){})
    .finally(function(){PKM_JSON_PENDING[key]=false;});
}
function resolvePalette(team,colorway){
  var mode=colorway||state.colorway;
  var isPokemon=state.league==='pokemon';
  var isMtg=state.league==='mtg';
  if(isPokemon){
    var corrected=getCachedPokemonPalette(team,mode);
    if(corrected){return smartPalette({kind:'pokemon',primary:corrected.p,secondary:corrected.s,accent:corrected.a,highlight:corrected.h,base:corrected.b});}
    var shiny=mode==='away';
    var x=(shiny&&team.sh)?team.sh:(team.pal||null);
    var baked=normalizePokemonPalette(x);
    if(baked){return smartPalette({kind:'pokemon',primary:baked.p,secondary:baked.s,accent:baked.a,highlight:baked.h,base:baked.b});}
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
  ':root{--wo-brand-primary:'+p.rawPri+';--wo-brand-secondary:'+p.rawSec+';--wo-primary:'+p.pri+';--wo-secondary:'+p.sec+';--wo-accent:'+p.acc+';--wo-highlight:'+p.hi+';--wo-button:'+p.btn+';--wo-on-button:'+p.onBtn+';--wo-bg:'+p.bg+';--wo-surface:'+p.surf+';--wo-surface-alt:'+p.surfAlt+';--wo-text:'+p.txt+';--wo-text-sub:'+p.txtSub+';--wo-text-muted:'+p.txtMut+';--wo-border:'+p.bdr+';--wo-border-strong:'+p.bdrStr+';--wo-nav-bg:'+p.navBg+';--wo-focus:'+p.focus+';}'+
  'html,body{background-color:'+p.bg+' !important;color:'+p.txt+' !important;}'+
  '.page-wrapper-2,.page-content{background-color:'+p.bg+' !important;}'+
  '[id="page-content"],[class*="Page content"]{background-color:'+p.bg+' !important;}'+
  '.navbar6_component,.navbar6_container,.w-nav{background:'+p.navBg+' !important;}'+
  '.navbar6_link,.w-nav-link{color:'+p.onNav+' !important;}'+
  '.navbar6_link:hover,.navbar6_link.w--current{color:'+p.navHi+' !important;}'+
  '.navbar6_dropdown-list,.w-dropdown-list{background:'+p.surf+' !important;border-color:'+p.bdr+' !important;}'+
  '.navbar6_dropdown-link{color:'+p.txt+' !important;}'+
  '.navbar6_dropdown-link:hover{color:'+p.acc+' !important;background:'+p.surfAlt+' !important;}'+
  '.menu-icon_line-top,.menu-icon_line-middle,.menu-icon_line-middle-inner,.menu-icon_line-bottom{background-color:'+p.onNav+' !important;}'+
  '.w-nav-overlay,.w-nav-overlay .w-nav-menu{background:'+p.navBg+' !important;}'+
  '.wo-my-team-btn{background:'+p.btn+' !important;color:'+p.onBtn+' !important;border:1px solid '+p.btn+' !important;box-shadow:0 0 0 1px '+rgba(p.hi,.28)+' !important;}'+
  '.wo-my-team-btn:hover{background:'+p.btnHov+' !important;color:'+p.onBtnHov+' !important;border-color:'+p.btnHov+' !important;}'+
  '.promo-strip,.Promo-strip{background:'+p.btn+' !important;}'+
  '.rotating-promo-text,.promo-strip *{color:'+p.onBtn+' !important;}'+
  '.trust-strip{background:'+p.surfAlt+' !important;border-top-color:'+p.bdrStr+' !important;border-bottom-color:'+p.bdrStr+' !important;}'+
  '.trust-strip__item{color:'+p.txtSub+' !important;}'+
  '.section-hero,.Section-hero{background:radial-gradient(circle at 15% 10%,'+rgba(p.hi,.28)+',transparent 26%),linear-gradient(135deg,'+p.heroBg+','+p.bg+') !important;}'+
  '.slider-3,.Slider-3{background-color:'+p.heroBg+' !important;}'+
  '.overlay{background-color:'+rgba(p.rawPri,.58)+' !important;}'+
  '.w-slider-dot{background:'+rgba(p.onHero,.30)+' !important;}'+
  '.w-slider-dot.w-active{background:'+p.btn+' !important;}'+
  '.w-slider-arrow-left,.w-slider-arrow-right{color:'+p.onHero+' !important;}'+
  '.slide-intro,.Slide-intro,.slide-heading,.Slide-heading,.slide-content,.basic-slide-content{color:'+p.onHero+' !important;text-shadow:0 2px 22px rgba(0,0,0,.65) !important;}'+
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
  '.button-3,.Button-3{background:'+p.btn+' !important;color:'+p.onBtn+' !important;border-color:'+p.btn+' !important;}'+
  '.button-3:hover,.Button-3:hover{background:'+p.btnHov+' !important;color:'+p.onBtnHov+' !important;border-color:'+p.btnHov+' !important;}'+
  '.button-3.dark,.Button-3.Dark{background:'+p.navBg+' !important;color:'+p.onNav+' !important;}'+
  '.underline-link,.Underline-link{color:'+p.txtSub+' !important;border-bottom-color:'+p.bdr+' !important;}'+
  '.underline-link.light,.underline-link.Light{color:#fff !important;}'+
  '.underline-link:hover{color:'+p.acc+' !important;}'+
  '.collection-item-4{background:'+p.surf+' !important;border-color:'+p.bdr+' !important;}'+
  '.collection-item-4:hover{border-color:'+p.acc+' !important;box-shadow:0 10px 35px '+rgba(p.rawPri,.26)+' !important;}'+
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
  '.w-tab-link.w--current{color:'+p.acc+' !important;border-color:'+p.acc+' !important;background:'+p.surfAlt+' !important;}'+
  '.w-commerce-commerceaddtocartbutton,.w-commerce-commercecartcheckoutbutton,.w-commerce-commercebuynowbutton{background:'+p.btn+' !important;color:'+p.onBtn+' !important;border-color:'+p.btn+' !important;}'+
  '.w-commerce-commerceaddtocartbutton:hover,.w-commerce-commercecartcheckoutbutton:hover,.w-commerce-commercebuynowbutton:hover{background:'+p.btnHov+' !important;color:'+p.onBtnHov+' !important;border-color:'+p.btnHov+' !important;}'+
  '.w-commerce-commercecartcontainerwrapper{background:'+p.surf+' !important;}'+
  '.w-commerce-commercecartitem,.w-commerce-commercecartiteminfo{color:'+p.txt+' !important;}'+
  '.w-commerce-commercecartlineitem{border-color:'+p.bdr+' !important;}'+
  '.footer,.footer-section,.Footer,.SemiFooter{background:'+p.footBg+' !important;}'+
  '.footer *,.footer-section *,.Footer *,.SemiFooter *{color:'+p.footTxt+' !important;}'+
  '.footer a,.footer-link,.Footer a{color:'+rgba(p.footTxt,.62)+' !important;}'+
  '.footer a:hover,.footer-link:hover{color:'+p.footHi+' !important;}'+
  'hr,.footer hr,.Footer hr{border-color:'+rgba(p.footTxt,.12)+' !important;}'+
  '.w-richtext a{color:'+p.acc+' !important;}'+
  '.w-richtext blockquote{border-left-color:'+p.acc+' !important;}'+
  '.badge,.tag,.pill{background:'+p.chipBg+' !important;color:'+p.chipTxt+' !important;border-color:'+p.acc+' !important;}'+
  'input:focus,textarea:focus,select:focus,.w-input:focus,.w-select:focus{border-color:'+p.focus+' !important;box-shadow:0 0 0 3px '+rgba(p.focus,.22)+' !important;outline:none !important;}'+
  'a:focus-visible,button:focus-visible,[role=button]:focus-visible{outline:3px solid '+p.focus+' !important;outline-offset:3px !important;}';

  var el=document.getElementById('wo-theme-css');
  if(!el){el=document.createElement('style');el.id='wo-theme-css';document.head.appendChild(el);}
  el.textContent=css;
  updateNavBtn(team,colorway);
  maybeLoadPokemonJsonPalette(team,colorway);
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
    btn.style.cssText='all:unset;box-sizing:border-box;display:inline-flex;align-items:center;gap:7px;padding:5px 13px 5px 6px;border-radius:100px;background:'+p.btn+';color:'+p.onBtn+';font-size:13px;font-weight:900;cursor:pointer;line-height:1;transition:opacity .2s,transform .2s;white-space:nowrap;box-shadow:0 0 0 1px '+rgba(p.hi,.28)+';';
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
  if(!state.team)return{bg:'#13161c',acc:'#8bd450',btn:'#69be28',onBtn:'#000000',txt:'#fff',sub:'#c8cbd0',bdr:'#454950',hi:'#9cff5a'};
  var p=resolvePalette(state.team,state.colorway);
  return{bg:p.bg,acc:p.acc,btn:p.btn,onBtn:p.onBtn,txt:p.txt,sub:p.txtSub,bdr:p.bdr,hi:p.hi};
}
function refreshUI(){
  var m=mc();
  if(sheet){sheet.style.background='linear-gradient(180deg,'+m.bg+','+mix(m.bg,'#000000',.18)+')';sheet.style.borderTop='3px solid '+m.acc;}
  var t=document.getElementById('wo-ttl');if(t)t.style.color=m.txt;
  var s=document.getElementById('wo-sub');if(s)s.style.color=m.sub;
  var d=document.getElementById('wo-done');if(d){d.style.background=m.btn;d.style.color=m.onBtn;}
  document.querySelectorAll('[data-cw]').forEach(function(b){
    var on=b.dataset.cw===state.colorway;
    b.style.borderColor=on?m.acc:m.bdr;b.style.color=on?m.acc:m.sub;
    b.style.background=on?rgba(m.acc,.16):'transparent';
    b.style.boxShadow=on?'0 0 22px '+rgba(m.acc,.22):'none';
  });
  document.querySelectorAll('[data-lg]').forEach(function(b){
    var on=b.dataset.lg===state.league;
    b.style.background=on?m.btn:'transparent';b.style.color=on?m.onBtn:m.sub;
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
  var sub=document.createElement('div');sub.id='wo-sub';sub.textContent='Teams, MTG, Pokémon, and shiny themes now use separate contrast-safe roles for text, cards, links, buttons, navigation, and footer states.';
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
