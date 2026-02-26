/**
 * WO UI — Self-contained theme engine for walkoffsc.com
 * All team data, color logic, modal, and CSS injection in one file.
 * GitHub: squeebmike/wo-scripts → wo-ui.js
 */
(function(){
'use strict';
if(window.__WO__)return;
window.__WO__=true;

// ═══════════════════════════════════════════════════════
// TEAM DATA — all leagues embedded, no external dependency
// ═══════════════════════════════════════════════════════
var TEAMS={
  nfl:[
    {k:'ari',n:'Cardinals',hp:'#97233f',ap:'#000000'},
    {k:'atl',n:'Falcons',hp:'#a71930',ap:'#000000'},
    {k:'bal',n:'Ravens',hp:'#241773',ap:'#000000'},
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
    {k:'ari',n:'Coyotes',hp:'#8c2633',ap:'#e2d6b5'},
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
    {k:'wpg',n:'Jets',hp:'#041e42',ap:'#ac162c'}
  ],
  pokemon:[
    {k:'25',n:'Pikachu',hp:'#ffde00',ap:'#cc0000'},
    {k:'6',n:'Charizard',hp:'#ff6600',ap:'#3399ff'},
    {k:'9',n:'Blastoise',hp:'#3399ff',ap:'#cc6600'},
    {k:'3',n:'Venusaur',hp:'#33cc33',ap:'#cc33cc'},
    {k:'130',n:'Gyarados',hp:'#0066cc',ap:'#ffcc00'},
    {k:'149',n:'Dragonite',hp:'#ff9900',ap:'#6633cc'},
    {k:'150',n:'Mewtwo',hp:'#9966cc',ap:'#cc0000'},
    {k:'151',n:'Mew',hp:'#ff99cc',ap:'#6699ff'},
    {k:'248',n:'Tyranitar',hp:'#336600',ap:'#cc9900'},
    {k:'384',n:'Rayquaza',hp:'#006600',ap:'#ffff00'},
    {k:'445',n:'Garchomp',hp:'#003399',ap:'#ffcc00'},
    {k:'448',n:'Lucario',hp:'#003399',ap:'#cc0000'},
    {k:'249',n:'Lugia',hp:'#99ccff',ap:'#cc9900'},
    {k:'250',n:'Ho-Oh',hp:'#cc0000',ap:'#ffcc00'},
    {k:'716',n:'Xerneas',hp:'#003366',ap:'#99cc00'},
    {k:'717',n:'Yveltal',hp:'#cc0000',ap:'#333333'},
    {k:'785',n:'Tapu Koko',hp:'#ffcc00',ap:'#000000'},
    {k:'800',n:'Necrozma',hp:'#333333',ap:'#ffffff'},
    {k:'888',n:'Zacian',hp:'#3399ff',ap:'#ffcc00'},
    {k:'889',n:'Zamazenta',hp:'#cc0000',ap:'#3399ff'}
  ],
  mtg:[
    {k:'W',n:'White',hp:'#f9faf4',ap:'#c4b7a6'},
    {k:'U',n:'Blue',hp:'#0e68ab',ap:'#c4b7a6'},
    {k:'B',n:'Black',hp:'#150b00',ap:'#c4b7a6'},
    {k:'R',n:'Red',hp:'#d3202a',ap:'#c4b7a6'},
    {k:'G',n:'Green',hp:'#00733e',ap:'#c4b7a6'},
    {k:'WU',n:'Azorius',hp:'#0e68ab',ap:'#f9faf4'},
    {k:'WB',n:'Orzhov',hp:'#150b00',ap:'#f9faf4'},
    {k:'UB',n:'Dimir',hp:'#150b00',ap:'#0e68ab'},
    {k:'UR',n:'Izzet',hp:'#0e68ab',ap:'#d3202a'},
    {k:'BR',n:'Rakdos',hp:'#d3202a',ap:'#150b00'},
    {k:'BG',n:'Golgari',hp:'#00733e',ap:'#150b00'},
    {k:'RG',n:'Gruul',hp:'#d3202a',ap:'#00733e'},
    {k:'RW',n:'Boros',hp:'#d3202a',ap:'#f9faf4'},
    {k:'GW',n:'Selesnya',hp:'#00733e',ap:'#f9faf4'},
    {k:'GU',n:'Simic',hp:'#00733e',ap:'#0e68ab'},
    {k:'WUB',n:'Esper',hp:'#0e68ab',ap:'#150b00'},
    {k:'UBR',n:'Grixis',hp:'#150b00',ap:'#d3202a'},
    {k:'BRG',n:'Jund',hp:'#d3202a',ap:'#00733e'},
    {k:'RGW',n:'Naya',hp:'#d3202a',ap:'#f9faf4'},
    {k:'GWU',n:'Bant',hp:'#00733e',ap:'#0e68ab'}
  ]
};

// ═══════════════════════════════════════════════════════
// COLOR MATH
// ═══════════════════════════════════════════════════════
var WO=window.WO=window.WO||{};
var LS='wo-theme-v8';
var state={league:'nfl',colorway:'home',team:null};

function hex2rgb(h){
  var c=(h||'').replace('#','');
  if(c.length===3)c=c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  if(c.length!==6)return[0,0,20];
  return[parseInt(c.substr(0,2),16),parseInt(c.substr(2,2),16),parseInt(c.substr(4,2),16)];
}
function lum(h){
  var r=hex2rgb(h).map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);});
  return .2126*r[0]+.7152*r[1]+.0722*r[2];
}
function onBg(h){return lum(h)>.179?'#111111':'#ffffff';}
function rgba(h,a){var r=hex2rgb(h);return'rgba('+r[0]+','+r[1]+','+r[2]+','+a+')';}
function adj(h,p){
  var r=hex2rgb(h),v=Math.round(255*p);
  var c=r.map(function(x){return Math.min(255,Math.max(0,x+v));});
  return'#'+c.map(function(x){return(x<16?'0':'')+x.toString(16);}).join('');
}
function palette(pri,acc){
  var L=lum(pri);
  var dark=L<.08,mid=L>=.08&&L<.35;
  var bg=dark?adj(pri,-.55):(mid?'#080812':adj(pri,.5));
  var surf=dark?adj(pri,-.25):(mid?adj(pri,-.15):'#ffffff');
  var surfAlt=dark?adj(pri,-.12):(mid?adj(pri,-.08):'#f2f2f6');
  var txt=onBg(bg),txtSub=rgba(txt,.6),txtMut=rgba(txt,.35);
  var bdr=rgba(txt,.1),bdrStr=rgba(txt,.2);
  // ensure accent readable on bg
  var da=acc,aL=lum(acc),bgL=lum(bg);
  var cr=(Math.max(aL,bgL)+.05)/(Math.min(aL,bgL)+.05);
  if(cr<3){da=bgL<.3?adj(acc,.35):adj(acc,-.25);}
  var footBg=dark?adj(pri,-.45):adj(pri,-.08);
  return{
    bg,surf,surfAlt,txt,txtSub,txtMut,bdr,bdrStr,
    navBg:pri,onNav:onBg(pri),
    acc:da,onAcc:onBg(da),
    btnHov:adj(da,.15),
    footBg,footTxt:onBg(footBg),
    shadow:rgba(pri,.4)
  };
}

// ═══════════════════════════════════════════════════════
// CSS INJECTION
// ═══════════════════════════════════════════════════════
WO.applyTheme=function(team,colorway){
  var home=(colorway||'home')==='home';
  var pri=team[home?'hp':'ap']||'#001a72';
  var acc=team[home?'ap':'hp']||'#69be28';
  var p=palette(pri,acc);

  var css=
  ':root{'+
    '--wo-primary:'+pri+';'+
    '--wo-accent:'+p.acc+';'+
    '--wo-bg:'+p.bg+';'+
    '--wo-surface:'+p.surf+';'+
    '--wo-text:'+p.txt+';'+
    '--wo-text-sub:'+p.txtSub+';'+
    '--wo-border:'+p.bdr+';'+
    '--checklist---primary:'+pri+';'+
    '--checklist---accent:'+p.acc+';'+
    '--checklist---background:'+p.surf+';'+
    '--checklist---border:'+p.bdr+';'+
    '--checklist---text:'+p.onNav+';'+
  '}'+
  // transitions
  '*,*::before,*::after{transition:background-color .3s,color .2s,border-color .3s;}'+
  // page
  'html,body,.page-wrapper-2,.page-content,.content-wrapper{background-color:'+p.bg+' !important;color:'+p.txt+' !important;}'+
  // navbar
  '#navbarID,.navbar6_component,.navbar6_container{background:'+p.navBg+' !important;}'+
  '#navbarID.scrolled{background:'+rgba(pri,.2)+' !important;}'+
  '.navbar6_link,.w-nav-link{color:'+p.onNav+' !important;}'+
  '.navbar6_link:hover,.navbar6_link.w--current{color:'+p.acc+' !important;}'+
  '.navbar6_dropdown-list,.w-dropdown-list{background:'+p.surf+' !important;}'+
  '.navbar6_dropdown-link{color:'+p.txt+' !important;}'+
  '.navbar6_dropdown-link:hover{color:'+p.acc+' !important;}'+
  '.menu-icon_line-top,.menu-icon_line-middle,.menu-icon_line-middle-inner,.menu-icon_line-bottom{background-color:'+p.onNav+' !important;}'+
  '.w-nav-overlay .w-nav-menu{background:'+pri+' !important;}'+
  // promo strip
  '.promo-strip{background:'+p.acc+' !important;}'+
  '.rotating-promo-text,.promo-strip *{color:'+p.onAcc+' !important;}'+
  // trust strip
  '.trust-strip{background:'+p.surfAlt+' !important;border-top:1px solid '+p.bdr+' !important;border-bottom:1px solid '+p.bdr+' !important;}'+
  '.trust-strip__item{color:'+p.txtMut+' !important;}'+
  // hero/sliders — tint base color only, bg images stay
  '.section-hero,.slider-3,.basic-slider,.full-width-slider-wrapper,.slider-background,.slider-background-base{background-color:'+adj(pri,-.5)+' !important;}'+
  // text ON hero stays white (dark photo overlay)
  '.slide-intro,.slide-heading,.slide-content,.basic-slide-content,.stacked-intro,.text-white{color:#ffffff !important;}'+
  // content sections
  '.story-wrapper,.grid-wrapper,.section-3,.page-wrapper-2{background-color:'+p.bg+' !important;}'+
  '.story-background,.feature-background{background-color:'+p.surf+' !important;}'+
  // typography
  '.heading,h1,h2,h3,h4,h5,h6{color:'+p.txt+' !important;}'+
  '.body-display,.text-block-5,p{color:'+p.txtSub+' !important;}'+
  '.w-richtext h1,.w-richtext h2,.w-richtext h3{color:'+p.txt+' !important;}'+
  '.w-richtext p,.w-richtext li{color:'+p.txtSub+' !important;}'+
  '.w-richtext a{color:'+p.acc+' !important;}'+
  // buttons
  '.button-3{background:'+p.acc+' !important;color:'+p.onAcc+' !important;}'+
  '.button-3:hover{background:'+p.btnHov+' !important;}'+
  '.button-3.dark{background:'+pri+' !important;color:'+p.onNav+' !important;}'+
  '.underline-link{color:'+p.txtMut+' !important;}'+
  '.underline-link:hover{color:'+p.acc+' !important;}'+
  '.underline-link.light{color:rgba(255,255,255,.8) !important;}'+
  // slide arrows
  '.dark-slide-arrow,.slide-arrow{background:'+p.surf+' !important;border-color:'+p.bdrStr+' !important;}'+
  // footer
  '.footer,.footer-section{background:'+p.footBg+' !important;color:'+p.footTxt+' !important;}'+
  '.footer-link{color:'+rgba(p.footTxt,.6)+' !important;}'+
  '.footer-link:hover{color:'+p.acc+' !important;}'+
  '.footer-notice,.footer-notice-box{color:'+rgba(p.footTxt,.4)+' !important;}'+
  // social
  '.social-icon{color:'+rgba(p.footTxt,.5)+' !important;}'+
  '.social-icon:hover{color:'+p.acc+' !important;}'+
  // checklist
  '.checklist-header{background:'+pri+' !important;color:'+p.onNav+' !important;}'+
  '.checklist-section{background:'+p.surf+' !important;border-bottom-color:'+p.bdr+' !important;}'+
  '.checklist-section-title{color:'+p.acc+' !important;}'+
  '.checklist-section th{background:'+rgba(pri,.15)+' !important;}'+
  '.checklist-section td{color:'+p.txtSub+' !important;border-color:'+p.bdr+' !important;}'+
  '.checklist-section tr:hover td{background:'+rgba(p.acc,.07)+' !important;}'+
  // forms
  'input,textarea,select{background:'+p.surf+' !important;color:'+p.txt+' !important;border-color:'+p.bdrStr+' !important;}'+
  'input::placeholder,textarea::placeholder{color:'+p.txtMut+' !important;}'+
  'input:focus,textarea:focus,select:focus{border-color:'+p.acc+' !important;box-shadow:0 0 0 3px '+rgba(p.acc,.2)+' !important;}'+
  // ecommerce
  '.w-commerce-commerceaddtocartbutton,.w-commerce-commercecartcheckoutbutton{background:'+p.acc+' !important;color:'+p.onAcc+' !important;}'+
  '.w-commerce-commercecartcontainerinner{background:'+p.surf+' !important;}'+
  // cms cards
  '.collection-item-4{background:'+p.surf+' !important;border-color:'+p.bdr+' !important;}'+
  '.collection-item-4:hover{border-color:'+p.acc+' !important;box-shadow:0 8px 32px '+p.shadow+' !important;}'+
  '';

  var el=document.getElementById('wo-theme-css');
  if(!el){el=document.createElement('style');el.id='wo-theme-css';document.head.appendChild(el);}
  el.textContent=css;
};

// ═══════════════════════════════════════════════════════
// PERSIST
// ═══════════════════════════════════════════════════════
function save(){
  if(!state.team)return;
  try{localStorage.setItem(LS,JSON.stringify({
    k:state.team.k,n:state.team.n,hp:state.team.hp,ap:state.team.ap,
    league:state.league,colorway:state.colorway
  }));}catch(e){}
}
function load(){
  try{var d=localStorage.getItem(LS);return d?JSON.parse(d):null;}catch(e){return null;}
}

// ═══════════════════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════════════════
var overlay,sheet,grid;
var LABELS={nfl:'NFL',mlb:'MLB',nba:'NBA',nhl:'NHL',pokemon:'Pokémon',mtg:'MTG'};

function logoUrl(league,k){
  if(league==='pokemon')return'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+k+'.png';
  if(league==='mtg')return'https://svgs.scryfall.io/card-symbols/'+k+'.svg';
  return'https://a.espncdn.com/i/teamlogos/'+league+'/500/'+k+'.png';
}

function mc(){
  if(!state.team)return{bg:'#13161c',acc:'#69be28',txt:'#fff',sub:'rgba(255,255,255,.4)',bdr:'rgba(255,255,255,.08)'};
  var h=state.colorway==='home';
  var bg=state.team[h?'hp':'ap'],acc=state.team[h?'ap':'hp'];
  var txt=onBg(bg);
  return{bg,acc,txt,sub:rgba(txt,.4),bdr:rgba(txt,.1)};
}

function refreshUI(){
  var m=mc();
  if(sheet){sheet.style.background=m.bg;sheet.style.borderTop='3px solid '+m.acc;}
  var t=document.getElementById('wo-ttl');if(t)t.style.color=m.txt;
  var s=document.getElementById('wo-sub');if(s)s.style.color=m.sub;
  var d=document.getElementById('wo-done');
  if(d){d.style.background=m.acc;d.style.color=onBg(m.acc);}
  document.querySelectorAll('[data-cw]').forEach(function(b){
    var on=b.dataset.cw===state.colorway;
    b.style.borderColor=on?m.acc:m.bdr;b.style.color=on?m.acc:m.sub;
    b.style.background=on?rgba(m.acc,.15):'transparent';
  });
  document.querySelectorAll('[data-lg]').forEach(function(b){
    var on=b.dataset.lg===state.league;
    b.style.background=on?m.acc:'transparent';b.style.color=on?onBg(m.acc):m.sub;
  });
  document.querySelectorAll('.wo-tile').forEach(function(t){
    var sel=state.team&&t.dataset.k===state.team.k&&t.dataset.lg===state.league;
    t.style.borderColor=sel?m.acc:m.bdr;
    t.style.background=sel?rgba(m.acc,.12):'rgba(255,255,255,.03)';
    t.style.boxShadow=sel?'0 0 0 1px '+m.acc+',0 4px 20px '+rgba(m.acc,.3):'none';
    var l=t.querySelector('.wo-lbl');if(l)l.style.color=sel?m.acc:m.sub;
  });
}

function renderGrid(){
  if(!grid)return;
  grid.innerHTML='';
  var m=mc();
  var teams=TEAMS[state.league]||[];
  teams.forEach(function(team){
    var t=document.createElement('div');
    t.className='wo-tile';t.dataset.k=team.k;t.dataset.lg=state.league;
    t.style.cssText='display:flex;flex-direction:column;align-items:center;gap:5px;padding:10px 4px 8px;border-radius:12px;cursor:pointer;border:1px solid '+m.bdr+';background:rgba(255,255,255,.03);transition:all .18s;';
    var img=document.createElement('img');
    img.src=logoUrl(state.league,team.k);
    img.style.cssText='width:44px;height:44px;object-fit:contain;';
    img.onerror=function(){this.style.display='none';};
    var lbl=document.createElement('div');
    lbl.className='wo-lbl';lbl.textContent=team.n;
    lbl.style.cssText='font-size:9px;text-align:center;line-height:1.3;font-weight:700;max-width:68px;word-break:break-word;color:'+m.sub+';';
    t.appendChild(img);t.appendChild(lbl);
    t.addEventListener('click',function(){
      state.team=team;WO.applyTheme(team,state.colorway);save();refreshUI();
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
  sheet.style.cssText='width:100%;max-width:680px;max-height:88vh;display:flex;flex-direction:column;overflow:hidden;border-radius:20px 20px 0 0;background:#13161c;box-shadow:0 -20px 80px rgba(0,0,0,.9);transform:translateY(105%);transition:transform .38s cubic-bezier(.32,.72,0,1);';

  // Handle
  var hdl=document.createElement('div');
  hdl.style.cssText='padding:12px 0 4px;display:flex;justify-content:center;cursor:pointer;flex-shrink:0;';
  var pip=document.createElement('div');pip.style.cssText='width:40px;height:4px;border-radius:2px;background:rgba(255,255,255,.15);';
  hdl.appendChild(pip);hdl.addEventListener('click',closeModal);

  // Header
  var hdr=document.createElement('div');hdr.style.cssText='flex-shrink:0;padding:8px 20px 0;';
  var row1=document.createElement('div');row1.style.cssText='display:flex;justify-content:space-between;align-items:flex-start;';
  var tb=document.createElement('div');
  var ttl=document.createElement('div');ttl.id='wo-ttl';ttl.textContent='Choose Your Team';
  ttl.style.cssText='font-size:20px;font-weight:900;color:#fff;letter-spacing:-.02em;';
  var sub=document.createElement('div');sub.id='wo-sub';sub.textContent='Colors update site-wide instantly';
  sub.style.cssText='font-size:12px;color:rgba(255,255,255,.4);margin-top:2px;';
  tb.appendChild(ttl);tb.appendChild(sub);
  var done=document.createElement('button');done.id='wo-done';done.textContent='Done';
  done.style.cssText='all:unset;cursor:pointer;padding:9px 22px;border-radius:100px;font-size:13px;font-weight:800;background:#69be28;color:#fff;';
  done.addEventListener('click',closeModal);
  row1.appendChild(tb);row1.appendChild(done);

  // Home/Away
  var cwRow=document.createElement('div');cwRow.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px;';
  [{k:'home',i:'🏠',l:'Home Colors'},{k:'away',i:'✈️',l:'Away Colors'}].forEach(function(o){
    var b=document.createElement('button');b.dataset.cw=o.k;
    b.style.cssText='all:unset;box-sizing:border-box;padding:10px;text-align:center;border:2px solid rgba(255,255,255,.1);border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;color:rgba(255,255,255,.4);transition:all .2s;';
    b.innerHTML='<span>'+o.i+'</span>&nbsp;'+o.l;
    b.addEventListener('click',function(){
      state.colorway=o.k;if(state.team){WO.applyTheme(state.team,state.colorway);save();}refreshUI();
    });
    cwRow.appendChild(b);
  });

  // League tabs
  var tabs=document.createElement('div');tabs.style.cssText='display:flex;gap:6px;overflow-x:auto;padding:12px 0 2px;scrollbar-width:none;';
  Object.keys(TEAMS).forEach(function(lg){
    var b=document.createElement('button');b.dataset.lg=lg;b.textContent=LABELS[lg];
    b.style.cssText='all:unset;padding:7px 16px;border-radius:100px;font-size:12px;font-weight:800;cursor:pointer;white-space:nowrap;color:rgba(255,255,255,.4);transition:all .2s;';
    b.addEventListener('click',function(){state.league=lg;renderGrid();});
    tabs.appendChild(b);
  });

  hdr.appendChild(row1);hdr.appendChild(cwRow);hdr.appendChild(tabs);

  grid=document.createElement('div');
  grid.style.cssText='flex:1;overflow-y:auto;padding:12px 20px 32px;display:grid;grid-template-columns:repeat(auto-fill,minmax(78px,1fr));gap:8px;';

  sheet.appendChild(hdl);sheet.appendChild(hdr);sheet.appendChild(grid);
  overlay.appendChild(sheet);document.body.appendChild(overlay);
}

function openModal(){buildModal();overlay.style.background='rgba(0,0,0,.75)';overlay.style.pointerEvents='auto';sheet.style.transform='translateY(0)';renderGrid();refreshUI();}
function closeModal(){if(!overlay)return;overlay.style.background='rgba(0,0,0,0)';overlay.style.pointerEvents='none';sheet.style.transform='translateY(105%)';}

WO.openTheme=openModal;WO.closeTheme=closeModal;

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
function init(){
  var saved=load();
  if(saved){
    state.team={k:saved.k,n:saved.n,hp:saved.hp,ap:saved.ap};
    state.colorway=saved.colorway||'home';
    state.league=saved.league||'nfl';
    WO.applyTheme(state.team,state.colorway);
  }
  document.querySelectorAll('[data-wo-theme],[data-theme-trigger],[data-wo-open]').forEach(function(el){
    el.addEventListener('click',openModal);
  });
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}
else{init();}

})();
