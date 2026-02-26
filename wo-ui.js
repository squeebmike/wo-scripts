/**
 * WO UI v8 — Full-site theme engine for walkoffsc.com
 * Deploy: commit to squeebmike/wo-scripts → wo-ui.js
 * Loaded via: <script src="https://cdn.jsdelivr.net/gh/squeebmike/wo-scripts@main/wo-ui.js">
 * 
 * Class names verified from live DOM audit of home page.
 */
(function(){
'use strict';
if(window.__WO_UI_V8__)return;
window.__WO_UI_V8__=true;

var WO=window.WO=window.WO||{};
var LS='wo-theme-v8';
var LEAGUES=['nfl','mlb','nba','nhl','pokemon','mtg'];
var LABELS={nfl:'NFL',mlb:'MLB',nba:'NBA',nhl:'NHL',pokemon:'Pokémon',mtg:'MTG'};
var state={league:'nfl',colorway:'home',team:null};

// ── PERSIST ──────────────────────────────────────────────────────────────────
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

// ── COLOR MATH ────────────────────────────────────────────────────────────────
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
function adj(h,pct){
  var r=hex2rgb(h),v=Math.round(255*pct);
  var c=r.map(function(x){return Math.min(255,Math.max(0,x+v));});
  return'#'+c.map(function(x){return(x<16?'0':'')+x.toString(16);}).join('');
}

// ── PALETTE ───────────────────────────────────────────────────────────────────
function palette(primary,accent){
  var L=lum(primary);
  var dark=L<.08, mid=L>=.08&&L<.35, light=L>=.35;

  // Page background — always very dark for dark/mid primaries
  var bg=dark?adj(primary,-.55):(mid?'#080812':adj(primary,.5));
  var surf=dark?adj(primary,-.25):(mid?adj(primary,-.15):'#ffffff');
  var surfAlt=dark?adj(primary,-.12):(mid?adj(primary,-.08):'#f2f2f6');

  var txt=onBg(bg);
  var txtSub=rgba(txt,.6);
  var txtMut=rgba(txt,.35);
  var bdr=rgba(txt,.1);
  var bdrStr=rgba(txt,.2);

  // Ensure accent is readable on bg (min 3:1 contrast)
  var dispAcc=accent;
  var aL=lum(accent),bgL=lum(bg);
  var cr=(Math.max(aL,bgL)+.05)/(Math.min(aL,bgL)+.05);
  if(cr<3){dispAcc=bgL<.3?adj(accent,.35):adj(accent,-.25);}

  var onPri=onBg(primary);
  var onAcc=onBg(dispAcc);
  var footerBg=dark?adj(primary,-.45):adj(primary,-.08);

  return{
    primary,accent:dispAcc,bg,surf,surfAlt,
    txt,txtSub,txtMut,bdr,bdrStr,
    onPri,onAcc,
    navBg:primary,
    footerBg,footerTxt:onBg(footerBg),
    promoBg:dispAcc,promoTxt:onAcc,
    btnBg:dispAcc,btnTxt:onAcc,btnHov:adj(dispAcc,.18),
    shadow:rgba(primary,.45)
  };
}

// ── CSS INJECTION ─────────────────────────────────────────────────────────────
WO.applyTheme=function(team,colorway){
  var home=(colorway||'home')==='home';
  var pri=team[home?'hp':'ap']||'#001a72';
  var acc=team[home?'ap':'hp']||'#69be28';
  var p=palette(pri,acc);

  var css=[
    // ── TOKENS ──
    ':root{',
    '  --wo-primary:'+p.primary+';',
    '  --wo-accent:'+p.accent+';',
    '  --wo-bg:'+p.bg+';',
    '  --wo-surface:'+p.surf+';',
    '  --wo-text:'+p.txt+';',
    '  --wo-text-sub:'+p.txtSub+';',
    '  --wo-border:'+p.bdr+';',
    '  --checklist---primary:'+p.primary+';',
    '  --checklist---accent:'+p.accent+';',
    '  --checklist---background:'+p.surf+';',
    '  --checklist---border:'+p.bdr+';',
    '  --checklist---text:'+p.onPri+';',
    '}',

    // ── SMOOTH TRANSITIONS (color only, no layout thrash) ──
    '*,*::before,*::after{',
    '  transition:background-color .3s ease,color .2s ease,border-color .3s ease,box-shadow .3s ease;',
    '}',

    // ── PAGE BASE ──
    'html,body,',
    '.page-wrapper-2,',
    '.page-content,',
    '.content-wrapper{',
    '  background-color:'+p.bg+' !important;',
    '  color:'+p.txt+' !important;',
    '}',

    // ── NAVBAR ──
    '#navbarID{background:'+p.navBg+' !important;}',
    '#navbarID.scrolled{',
    '  background:'+rgba(p.primary,.2)+' !important;',
    '}',
    '.navbar6_component,.navbar6_container{background-color:'+p.navBg+' !important;}',
    '.navbar6_link,.navbar6_link-text,.w-nav-link{color:'+p.onPri+' !important;}',
    '.navbar6_link:hover,.navbar6_link.w--current,.w-nav-link:hover{color:'+p.accent+' !important;}',
    '.navbar6_dropdown-list,.w-dropdown-list{background-color:'+p.surf+' !important;border-color:'+p.bdr+' !important;}',
    '.navbar6_dropdown-link,.navbar_dropdown-link-wrapper a{color:'+p.txt+' !important;}',
    '.navbar6_dropdown-link:hover{color:'+p.accent+' !important;}',
    '.menu-icon_line-top,.menu-icon_line-middle,.menu-icon_line-middle-inner,.menu-icon_line-bottom{',
    '  background-color:'+p.onPri+' !important;',
    '}',
    // Mobile overlay
    '.w-nav-overlay .w-nav-menu,.w-nav-overlay .navbar6_menu{background-color:'+p.primary+' !important;}',

    // ── PROMO STRIP ──
    '.promo-strip{background-color:'+p.promoBg+' !important;}',
    '.rotating-promo-text,.promo-strip *{color:'+p.promoTxt+' !important;}',

    // ── TRUST STRIP ──
    '.trust-strip{',
    '  background-color:'+p.surfAlt+' !important;',
    '  border-top:1px solid '+p.bdr+' !important;',
    '  border-bottom:1px solid '+p.bdr+' !important;',
    '}',
    '.trust-strip__inner{background-color:transparent !important;}',
    '.trust-strip__item{color:'+p.txtMut+' !important;}',

    // ── HERO / SLIDERS (has bg image — just tint the base) ──
    '.section-hero{background-color:'+adj(p.primary,-.5)+' !important;}',
    '.slider-3,.basic-slider,.full-width-slider-wrapper{background-color:'+adj(p.primary,-.45)+' !important;}',
    '.slider-background,.slider-background-base,.slider-background-wrapper{',
    '  background-color:'+adj(p.primary,-.5)+' !important;',
    '}',
    // Text ON the hero stays white — it's over a dark photo overlay
    '.slide-intro,.slide-heading,.slide-content,.basic-slide-content,.slide-2,.stacked-intro{',
    '  color:#ffffff !important;',
    '}',

    // ── STORY / FEATURE SECTIONS ──
    '.story-wrapper,.story-background-wrapper{background-color:'+p.bg+' !important;}',
    '.story-background{background-color:'+p.surfAlt+' !important;}',
    '.story-content,.story-image{color:'+p.txt+' !important;}',
    '.grid-wrapper{background-color:'+p.bg+' !important;}',
    '.feature-background{background-color:'+p.surf+' !important;border-color:'+p.bdr+' !important;}',
    '.section-3{background-color:'+p.bg+' !important;}',

    // ── TYPOGRAPHY ──
    '.heading{color:'+p.txt+' !important;}',
    '.body-display{color:'+p.txtSub+' !important;}',
    '.text-block-5{color:'+p.txtMut+' !important;}',
    'p,h1,h2,h3,h4,h5,h6{color:'+p.txt+' !important;}',
    '.w-richtext h1,.w-richtext h2,.w-richtext h3,.w-richtext h4{color:'+p.txt+' !important;}',
    '.w-richtext p,.w-richtext li{color:'+p.txtSub+' !important;}',
    '.w-richtext a{color:'+p.accent+' !important;}',
    // text-white stays white (used on dark sections by design)
    '.text-white,.slide-intro,.slide-heading{color:#ffffff !important;}',

    // ── BUTTONS ──
    '.button-3{',
    '  background-color:'+p.btnBg+' !important;',
    '  color:'+p.btnTxt+' !important;',
    '}',
    '.button-3:hover{background-color:'+p.btnHov+' !important;}',
    '.button-3.dark{background-color:'+p.primary+' !important;color:'+p.onPri+' !important;}',
    '.button-text,.button-text-wrapper{color:'+p.btnTxt+' !important;}',
    '.underline-link{color:'+p.txtMut+' !important;}',
    '.underline-link:hover{color:'+p.accent+' !important;}',
    '.underline-link.light{color:rgba(255,255,255,.8) !important;}',
    '.link-wrapper,.link-arrow-wrapper{color:'+p.txtSub+' !important;}',
    '.dual-button .button-3{background-color:'+p.btnBg+' !important;color:'+p.btnTxt+' !important;}',

    // ── SLIDE ARROWS ──
    '.dark-slide-arrow,.slide-arrow{',
    '  background-color:'+p.surf+' !important;',
    '  border-color:'+p.bdrStr+' !important;',
    '}',
    '.dark-slide-arrow svg,.slide-arrow svg{color:'+p.txt+' !important;}',
    '.slider-arrow-wrapper,.slider-arrow{color:'+p.txt+' !important;}',

    // ── INSTAGRAM / SOCIAL ──
    '.instagram-grid,.instagram-background{background-color:'+p.surfAlt+' !important;}',
    '.instagram-image-wrapper{border-color:'+p.bdr+' !important;}',

    // ── FOOTER ──
    '.footer,.footer-section{',
    '  background-color:'+p.footerBg+' !important;',
    '  color:'+p.footerTxt+' !important;',
    '}',
    '.footer-link{color:'+rgba(p.footerTxt,.6)+' !important;}',
    '.footer-link:hover{color:'+p.accent+' !important;}',
    '.footer-links{color:'+rgba(p.footerTxt,.5)+' !important;}',
    '.footer-brand img{filter: brightness('+((lum(p.footerBg)<.1)?'1':'0')+') !important;}',
    '.footer-notice,.footer-notice-box{',
    '  background-color:'+rgba(p.footerTxt,.05)+' !important;',
    '  color:'+rgba(p.footerTxt,.4)+' !important;',
    '}',

    // ── SOCIAL ICONS ──
    '.social-icon,.social-icons a{color:'+rgba(p.footerTxt,.6)+' !important;}',
    '.social-icon:hover,.social-icons a:hover{color:'+p.accent+' !important;}',
    '.facebook:hover{color:#1877f2 !important;}',
    '.instagram:hover{color:#e1306c !important;}',
    '.twitter:hover{color:#1da1f2 !important;}',

    // ── CHECKLIST INDEX ──
    // (classes come from the /checklists page — they follow same naming)
    '.checklist-header{background-color:'+p.primary+' !important;color:'+p.onPri+' !important;}',
    '.checklist-section{background-color:'+p.surf+' !important;border-bottom-color:'+p.bdr+' !important;}',
    '.checklist-section-title{color:'+p.accent+' !important;}',
    '.checklist-container{color:'+p.txt+' !important;}',
    '.checklist-section th{background-color:'+rgba(p.primary,.15)+' !important;color:'+p.txt+' !important;}',
    '.checklist-section td{color:'+p.txtSub+' !important;border-color:'+p.bdr+' !important;}',
    '.checklist-section tr:hover td{background-color:'+rgba(p.accent,.07)+' !important;}',

    // ── FORMS ──
    'input,textarea,select{',
    '  background-color:'+p.surf+' !important;',
    '  color:'+p.txt+' !important;',
    '  border-color:'+p.bdrStr+' !important;',
    '}',
    'input::placeholder,textarea::placeholder{color:'+p.txtMut+' !important;}',
    'input:focus,textarea:focus,select:focus{',
    '  border-color:'+p.accent+' !important;',
    '  box-shadow:0 0 0 3px '+rgba(p.accent,.2)+' !important;',
    '}',
    'label{color:'+p.txtSub+' !important;}',

    // ── ECOMMERCE ──
    '.w-commerce-commerceaddtocartbutton{background-color:'+p.btnBg+' !important;color:'+p.btnTxt+' !important;}',
    '.w-commerce-commercecartcheckoutbutton{background-color:'+p.btnBg+' !important;color:'+p.btnTxt+' !important;}',
    '.w-commerce-commercecartcontainerinner{background-color:'+p.surf+' !important;}',

    // ── COLLECTION LISTS (CMS) ──
    '.collection-item-4{background-color:'+p.surf+' !important;border-color:'+p.bdr+' !important;}',
    '.collection-item-4:hover{border-color:'+p.accent+' !important;box-shadow:0 8px 32px '+p.shadow+' !important;}',

    // ── WO-SPECIFIC ELEMENTS (from previous scripts) ──
    '.wo-btn{background-color:'+p.btnBg+' !important;color:'+p.btnTxt+' !important;}',
    '.wo-bs{background-color:'+p.surf+' !important;}',
  ].join('\n');

  var el=document.getElementById('wo-theme-css');
  if(!el){el=document.createElement('style');el.id='wo-theme-css';document.head.appendChild(el);}
  el.textContent=css;
};

// ── MODAL ─────────────────────────────────────────────────────────────────────
var overlay,sheet,grid;

function teamImgSrc(league,k){
  if(league==='pokemon')return'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+k+'.png';
  if(league==='mtg')return'https://svgs.scryfall.io/card-symbols/'+k+'.svg';
  return'https://a.espncdn.com/i/teamlogos/'+league+'/500/'+k+'.png';
}

function mc(){
  if(!state.team)return{bg:'#13161c',acc:'#69be28',txt:'#fff',sub:'rgba(255,255,255,.4)',bdr:'rgba(255,255,255,.08)'};
  var home=state.colorway==='home';
  var bg=state.team[home?'hp':'ap']||'#13161c';
  var acc=state.team[home?'ap':'hp']||'#69be28';
  var txt=onBg(bg);
  return{bg,acc,txt,sub:rgba(txt,.4),bdr:rgba(txt,.1)};
}

function refreshUI(){
  var m=mc();
  if(sheet){sheet.style.background=m.bg;sheet.style.borderTop='3px solid '+m.acc;}
  var ttl=document.getElementById('wo-ttl');if(ttl)ttl.style.color=m.txt;
  var sub=document.getElementById('wo-sub');if(sub)sub.style.color=m.sub;
  var done=document.getElementById('wo-done');
  if(done){done.style.background=m.acc;done.style.color=onBg(m.acc);}
  document.querySelectorAll('[data-wo-cw]').forEach(function(b){
    var on=b.dataset.woCw===state.colorway;
    b.style.borderColor=on?m.acc:m.bdr;b.style.color=on?m.acc:m.sub;
    b.style.background=on?rgba(m.acc,.15):'transparent';b.style.fontWeight=on?'800':'600';
  });
  document.querySelectorAll('[data-wo-lg]').forEach(function(b){
    var on=b.dataset.woLg===state.league;
    b.style.background=on?m.acc:'transparent';b.style.color=on?onBg(m.acc):m.sub;
  });
  document.querySelectorAll('.wo-tile').forEach(function(t){
    var sel=state.team&&t.dataset.k===state.team.k&&t.dataset.lg===state.league;
    t.style.borderColor=sel?m.acc:m.bdr;
    t.style.background=sel?rgba(m.acc,.12):'rgba(255,255,255,.03)';
    t.style.boxShadow=sel?'0 0 0 1px '+m.acc+',0 4px 20px '+rgba(m.acc,.3):'none';
    var lbl=t.querySelector('.wo-lbl');if(lbl)lbl.style.color=sel?m.acc:m.sub;
  });
}

function renderGrid(){
  if(!grid)return;
  grid.innerHTML='';
  var m=mc();
  var src=window['WO_'+state.league.toUpperCase()]||[];
  if(!src.length){
    var msg=document.createElement('p');
    msg.style.cssText='color:rgba(255,255,255,.3);font-size:13px;grid-column:1/-1;text-align:center;padding:40px 0;';
    msg.textContent='No '+LABELS[state.league]+' data — make sure wo_'+state.league+'_v9 script is loaded.';
    grid.appendChild(msg);return;
  }
  src.forEach(function(team){
    var t=document.createElement('div');
    t.className='wo-tile';t.dataset.k=team.k;t.dataset.lg=state.league;
    t.style.cssText='display:flex;flex-direction:column;align-items:center;gap:5px;padding:10px 4px 8px;border-radius:12px;cursor:pointer;border:1px solid '+m.bdr+';background:rgba(255,255,255,.03);transition:all .18s ease;';
    var img=document.createElement('img');
    img.src=teamImgSrc(state.league,team.k);
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

function build(){
  if(overlay)return;
  overlay=document.createElement('div');
  overlay.style.cssText='position:fixed;inset:0;z-index:2147483647;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,0);pointer-events:none;transition:background .3s;font-family:system-ui,-apple-system,sans-serif;';
  overlay.addEventListener('click',function(e){if(e.target===overlay)close();});

  sheet=document.createElement('div');
  sheet.style.cssText='width:100%;max-width:680px;max-height:88vh;display:flex;flex-direction:column;overflow:hidden;border-radius:20px 20px 0 0;background:#13161c;box-shadow:0 -20px 80px rgba(0,0,0,.9);transform:translateY(105%);transition:transform .38s cubic-bezier(.32,.72,0,1);';

  // Handle
  var hdl=document.createElement('div');
  hdl.style.cssText='padding:12px 0 4px;display:flex;justify-content:center;cursor:pointer;flex-shrink:0;';
  var pip=document.createElement('div');
  pip.style.cssText='width:40px;height:4px;border-radius:2px;background:rgba(255,255,255,.15);';
  hdl.appendChild(pip);hdl.addEventListener('click',close);

  // Header
  var hdr=document.createElement('div');
  hdr.style.cssText='flex-shrink:0;padding:8px 20px 0;';

  var row1=document.createElement('div');
  row1.style.cssText='display:flex;justify-content:space-between;align-items:flex-start;';
  var tb=document.createElement('div');
  var ttl=document.createElement('div');ttl.id='wo-ttl';
  ttl.style.cssText='font-size:20px;font-weight:900;color:#fff;letter-spacing:-.02em;';ttl.textContent='Choose Your Team';
  var sub=document.createElement('div');sub.id='wo-sub';
  sub.style.cssText='font-size:12px;color:rgba(255,255,255,.4);margin-top:2px;';sub.textContent='Colors update site-wide instantly';
  tb.appendChild(ttl);tb.appendChild(sub);
  var done=document.createElement('button');done.id='wo-done';
  done.style.cssText='all:unset;cursor:pointer;padding:9px 22px;border-radius:100px;font-size:13px;font-weight:800;background:#69be28;color:#fff;letter-spacing:.02em;flex-shrink:0;margin-top:2px;';
  done.textContent='Done';done.addEventListener('click',close);
  row1.appendChild(tb);row1.appendChild(done);

  // Home/Away
  var cwRow=document.createElement('div');
  cwRow.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px;';
  [{k:'home',i:'🏠',l:'Home Colors'},{k:'away',i:'✈️',l:'Away Colors'}].forEach(function(o){
    var b=document.createElement('button');b.dataset.woCw=o.k;
    b.style.cssText='all:unset;box-sizing:border-box;padding:10px 12px;text-align:center;border:2px solid rgba(255,255,255,.1);border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;color:rgba(255,255,255,.4);transition:all .2s;';
    b.innerHTML='<span style="font-size:15px">'+o.i+'</span>&nbsp;&nbsp;'+o.l;
    b.addEventListener('click',function(){
      state.colorway=o.k;if(state.team){WO.applyTheme(state.team,state.colorway);save();}refreshUI();
    });
    cwRow.appendChild(b);
  });

  // League tabs
  var tabs=document.createElement('div');
  tabs.style.cssText='display:flex;gap:6px;overflow-x:auto;padding:12px 0 2px;scrollbar-width:none;-webkit-overflow-scrolling:touch;';
  LEAGUES.forEach(function(lg){
    var b=document.createElement('button');b.dataset.woLg=lg;b.textContent=LABELS[lg];
    b.style.cssText='all:unset;padding:7px 16px;border-radius:100px;font-size:12px;font-weight:800;cursor:pointer;white-space:nowrap;color:rgba(255,255,255,.4);transition:all .2s;letter-spacing:.03em;';
    b.addEventListener('click',function(){state.league=lg;renderGrid();});
    tabs.appendChild(b);
  });

  hdr.appendChild(row1);hdr.appendChild(cwRow);hdr.appendChild(tabs);

  // Grid
  grid=document.createElement('div');
  grid.style.cssText='flex:1;overflow-y:auto;padding:12px 20px 32px;display:grid;grid-template-columns:repeat(auto-fill,minmax(78px,1fr));gap:8px;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.1) transparent;';

  sheet.appendChild(hdl);sheet.appendChild(hdr);sheet.appendChild(grid);
  overlay.appendChild(sheet);document.body.appendChild(overlay);
}

function open(){build();overlay.style.background='rgba(0,0,0,.75)';overlay.style.pointerEvents='auto';sheet.style.transform='translateY(0)';renderGrid();refreshUI();}
function close(){if(!overlay)return;overlay.style.background='rgba(0,0,0,0)';overlay.style.pointerEvents='none';sheet.style.transform='translateY(105%)';}

WO.openTheme=open;WO.closeTheme=close;

// ── INIT ──────────────────────────────────────────────────────────────────────
function init(){
  var saved=load();
  if(saved){
    state.team={k:saved.k,n:saved.n,hp:saved.hp,ap:saved.ap};
    state.colorway=saved.colorway||'home';
    state.league=saved.league||'nfl';
    WO.applyTheme(state.team,state.colorway);
  }
  document.querySelectorAll('[data-wo-theme],[data-theme-trigger],[data-wo-open]').forEach(function(el){
    el.addEventListener('click',open);
  });
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}
else{init();}

})();
