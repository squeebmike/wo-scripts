// WO UI v5 — checklist pages fully theme-aware
(function(){
if(window.__WO_UI__)return;
window.__WO_UI__=true;
var WO=window.WO=window.WO||{};
var S={lg:'nfl',cw:'home',team:null};
var TABS=['mlb','nfl','nba','nhl','pokemon','mtg'];
var LBL={mlb:'MLB',nfl:'NFL',nba:'NBA',nhl:'NHL',pokemon:'Pokemon',mtg:'MTG'};
var LS_KEY='wo-team-v1';

// ─── SAVE / LOAD ────────────────────────────────────────────────────────────
WO.save=function(t,cw,lg){
  try{localStorage.setItem(LS_KEY,JSON.stringify({k:t.k,n:t.n,hp:t.hp,ap:t.ap,ht:t.ht,at:t.at,cw:cw,lg:lg}));}catch(e){}
};
WO.load=function(){
  try{var d=localStorage.getItem(LS_KEY);return d?JSON.parse(d):null;}catch(e){return null;}
};

// ─── COLOR UTILITIES ─────────────────────────────────────────────────────────
function lum(hex){
  try{
    var c=hex.replace('#','');
    if(c.length===3)c=c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    var r=parseInt(c.substr(0,2),16)/255,g=parseInt(c.substr(2,2),16)/255,b=parseInt(c.substr(4,2),16)/255;
    r=r<=0.03928?r/12.92:Math.pow((r+0.055)/1.055,2.4);
    g=g<=0.03928?g/12.92:Math.pow((g+0.055)/1.055,2.4);
    b=b<=0.03928?b/12.92:Math.pow((b+0.055)/1.055,2.4);
    return 0.2126*r+0.7152*g+0.0722*b;
  }catch(e){return 0.1;}
}
function textOn(hex){return lum(hex)>0.25?'#111111':'#ffffff';}
function alpha(h,a){
  var c=h.replace('#','');
  if(c.length===3)c=c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  if(c.length!==6)return h;
  var r=parseInt(c.substr(0,2),16),g=parseInt(c.substr(2,2),16),b=parseInt(c.substr(4,2),16);
  return'rgba('+r+','+g+','+b+','+a+')';
}
// slightly lighter/darker shade of a hex color
function shade(hex,pct){
  var c=hex.replace('#','');
  if(c.length===3)c=c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  if(c.length!==6)return hex;
  var r=Math.min(255,Math.max(0,Math.round(parseInt(c.substr(0,2),16)*(1+pct))));
  var g=Math.min(255,Math.max(0,Math.round(parseInt(c.substr(2,2),16)*(1+pct))));
  var b=Math.min(255,Math.max(0,Math.round(parseInt(c.substr(4,2),16)*(1+pct))));
  return'#'+(r<16?'0':'')+r.toString(16)+(g<16?'0':'')+g.toString(16)+(b<16?'0':'')+b.toString(16);
}
// card bg: slightly lighter than primary for dark teams, slightly darker for light teams
function cardBg(primary){
  return lum(primary)>0.25 ? shade(primary,-0.08) : shade(primary,0.5);
}
// border color: subtle version of primary
function borderCol(primary){
  return lum(primary)>0.25 ? shade(primary,-0.2) : alpha(primary.replace(/hsla?\([^)]+\)/,primary),1);
}
// muted text: readable on both dark and light backgrounds
function mutedText(primary){
  return lum(primary)>0.25 ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.55)';
}

// ─── APPLY THEME ─────────────────────────────────────────────────────────────
WO.applyTheme=function(t,cw){
  var home=cw!=='away';
  var primary=t[home?'hp':'ap']||'#002244';
  var accent=t[home?'ap':'hp']||'#69BE28';
  var onPrimary=textOn(primary);
  var onAccent=textOn(accent);
  var card=cardBg(primary);
  var border=lum(primary)>0.25 ? shade(primary,-0.2) : alpha('#ffffff',0.12);
  var muted=mutedText(primary);
  // section bg: darker version of primary for hero/section backgrounds
  var sectionBg=lum(primary)>0.25 ? shade(primary,-0.15) : shade(primary,-0.3);
  // Make sure sectionBg stays dark enough for contrast when primary is dark
  if(sectionBg==='#000000'||sectionBg.replace('#','').length!==6)sectionBg='#0a0a14';

  var css=[
    // ─── CSS VARIABLES ───
    ':root{',
    '  --team-primary:'+primary+';',
    '  --team-accent:'+accent+';',
    '  --team-on-primary:'+onPrimary+';',
    '  --team-on-accent:'+onAccent+';',
    // Webflow design variable overrides (these are rendered as CSS custom props)
    '  --variable-2c6f7a2f-e752-e91f-7527-eec138769da7:'+primary+';',  // Checklist - Primary
    '  --variable-d137a89d-2f0f-6b3a-d991-2dcc5eea5a95:'+accent+';',  // Checklist - Accent
    '  --variable-86ea6156-3dd7-5204-2aaf-8e852a79c163:'+card+';',    // Checklist - Background
    '  --variable-bc16dca7-b842-e4b1-0f46-17130e36b1e6:'+border+';',  // Checklist - Border
    '  --variable-0c01d148-ff6d-fc73-aae6-8bf857367757:'+onPrimary+';', // Checklist - Text
    '}',

    // ─── NAVBAR ───
    '#navbarID{background:'+primary+' !important;}',
    '#navbarID.scrolled{background:'+alpha(primary,0.2)+' !important;backdrop-filter:blur(12px) !important;}',
    '.navbar6_component{background-color:'+primary+' !important;}',
    '.navbar6_link{color:'+onPrimary+' !important;}',
    '.navbar6_link:hover{color:'+accent+' !important;}',
    '.navbar6_dropdown-link{color:'+primary+' !important;}',
    '.menu-icon_line-top,.menu-icon_line-middle,.menu-icon_line-middle-inner,.menu-icon_line-bottom{background-color:'+onPrimary+' !important;}',

    // ─── BUTTONS ───
    '.btn--primary{background-color:'+accent+' !important;border-color:'+accent+' !important;color:'+onAccent+' !important;}',
    '.btn--secondary{border-color:'+accent+' !important;color:'+accent+' !important;}',
    '.btn--ghost{border-color:'+alpha(accent,0.5)+' !important;color:'+onPrimary+' !important;}',
    '.btn--ghost:hover{border-color:'+accent+' !important;color:'+accent+' !important;}',
    '.Button{background-color:'+accent+' !important;border-color:'+accent+' !important;color:'+onAccent+' !important;}',
    '.Add-to-Cart,.Add-to-Cart-Button,.add-to-cart{background-color:'+accent+' !important;border-color:'+accent+' !important;color:'+onAccent+' !important;}',
    '.Checkout-Button,.Checkout-Button-2{background-color:'+accent+' !important;}',

    // ─── LINKS & ACCENTS ───
    '.section-header__eyebrow{color:'+accent+' !important;}',
    '.Mini-Title,.Mini-Title-White{color:'+accent+' !important;}',
    '.Price,.PriceColor,.product-card__price{color:'+accent+' !important;}',

    // ─── HERO / SECTION BACKGROUNDS ───
    '.Action-section,.Section-hero,.Feature-background{background-color:'+primary+' !important;}',
    '.Shop-Hero-Section,.Shop Hero Section{background-color:'+sectionBg+' !important;}',

    // ─── FOOTER ───
    '.Footer,.Footer-2,.Footer-3,.Footer-Section{background-color:'+primary+' !important;}',
    '.Footer-Link,.Footer-Notice-Text,.Footer-Notice,.Legal-text,.Legal-link{color:'+alpha(onPrimary,0.7)+' !important;}',
    '.Footer-Link:hover{color:'+accent+' !important;}',

    // ─── PROMO / BADGES ───
    '.Promo-strip{background-color:'+accent+' !important;color:'+onAccent+' !important;}',
    '.Promo-strip *{color:'+onAccent+' !important;}',
    '.badge--in-stock,.is-green{background-color:'+accent+' !important;color:'+onAccent+' !important;}',

    // ─── MOBILE NAV ───
    '.w-nav-overlay .navbar6_menu{background-color:'+primary+' !important;}',
    '.w-nav-overlay .navbar6_link{color:'+onPrimary+' !important;}',
    '.w-nav-overlay .navbar6_link:hover{color:'+accent+' !important;}',

    // ─── CHECKLIST INDEX PAGE ───
    // Hero section background
    '.shop-hero-section,[class*="Shop Hero Section"]{background-color:'+sectionBg+' !important;}',
    // Filter bar buttons (btn--ghost)
    '.filter-bar .btn,.Filter-bar .btn{border-color:'+alpha(accent,0.4)+' !important;color:'+onPrimary+' !important;}',
    // Cards
    '.checklist-card{background-color:'+card+' !important;border-color:'+border+' !important;}',
    '.checklist-card:hover{border-color:'+accent+' !important;box-shadow:0 4px 24px '+alpha(primary,0.4)+' !important;}',
    '.checklist-card__title{color:'+onPrimary+' !important;}',
    '.checklist-card__meta,.checklist-count{color:'+muted+' !important;}',
    '.checklist-card__footer{border-top-color:'+border+' !important;}',
    '.checklist-sport-badge{background-color:'+primary+' !important;color:'+onPrimary+' !important;border:1px solid '+accent+' !important;}',
    '.checklist-view-btn{background-color:'+accent+' !important;color:'+onAccent+' !important;}',

    // ─── CHECKLIST DETAIL (CMS TEMPLATE) PAGE ───
    // The header/title area
    '.checklist-header{background-color:'+primary+' !important;color:'+onPrimary+' !important;}',
    '.checklist-title{color:'+onPrimary+' !important;}',
    '.checklist-subtitle{color:'+muted+' !important;}',
    // Section headers (Base Checklist, Parallels, Inserts, etc.)
    '.checklist-section{background-color:'+card+' !important;border-bottom-color:'+border+' !important;}',
    '.checklist-section-title{color:'+accent+' !important;}',
    // Overall page background
    '.checklist-container,.checklist-page{background-color:'+sectionBg+' !important;}',
    // Sport badge on detail page
    '.checklist-card__sport{color:'+accent+' !important;}',
  ].join('\n');

  var el=document.getElementById('wo-theme');
  if(!el){el=document.createElement('style');el.id='wo-theme';document.head.appendChild(el);}
  el.textContent=css;
};

// ─── IMAGE URL ────────────────────────────────────────────────────────────────
function imgUrl(lg,k){
  if(lg==='pokemon')return'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+k+'.png';
  if(lg==='mtg')return'https://svgs.scryfall.io/card-symbols/'+k+'.svg';
  return'https://a.espncdn.com/i/teamlogos/'+lg+'/500/'+k+'.png';
}

// ─── MODAL COLOR STATE ────────────────────────────────────────────────────────
function pal(){
  var t=S.team;
  if(!t)return{bg:'#13161c',acc:'#69BE28',txt:'#fff',mut:'rgba(255,255,255,0.45)'};
  var home=S.cw!=='away';
  var bg=t[home?'hp':'ap']||'#13161c';
  var sec=t[home?'ap':'hp']||'#69BE28';
  var L=lum(bg);
  return{bg:bg,acc:sec,txt:L>0.25?'#111':'#fff',mut:L>0.25?'rgba(0,0,0,0.45)':'rgba(255,255,255,0.45)'};
}

var OVL=null,BOX=null,GRID=null;

function paint(){
  var p=pal();
  if(BOX)BOX.style.background=p.bg;
  var ttl=document.getElementById('wo-ttl');if(ttl)ttl.style.color=p.txt;
  var done=document.getElementById('wo-done');
  if(done){done.style.background=p.acc;done.style.color=lum(p.acc)>0.25?'#111':'#fff';}
  document.querySelectorAll('[data-cw]').forEach(function(b){
    var on=b.dataset.cw===S.cw;
    b.style.borderColor=on?p.acc:'rgba(128,128,128,0.3)';
    b.style.color=on?p.acc:p.mut;
    b.style.background=on?p.acc+'33':'transparent';
  });
  document.querySelectorAll('[data-tab]').forEach(function(b){
    var on=b.dataset.tab===S.lg;
    b.style.background=on?p.acc:'transparent';
    b.style.color=on?(lum(p.acc)>0.25?'#111':'#fff'):p.mut;
  });
  document.querySelectorAll('.wo-tile').forEach(function(tile){
    var on=S.team&&tile.dataset.k===S.team.k&&tile.dataset.lg===S.lg;
    tile.style.borderColor=on?p.acc:'rgba(255,255,255,0.07)';
    tile.style.background=on?p.acc+'33':'rgba(255,255,255,0.03)';
    var sp=tile.querySelector('span');if(sp)sp.style.color=on?p.acc:'rgba(255,255,255,0.4)';
  });
}

// ─── MODAL BUILD ─────────────────────────────────────────────────────────────
function buildUI(){
  if(OVL)return;
  OVL=document.createElement('div');OVL.id='wo-portal';
  setClosedStyle();
  OVL.addEventListener('click',function(e){if(e.target===OVL)closeModal();});

  BOX=document.createElement('div');
  BOX.style.cssText='width:100%;max-width:680px;max-height:88vh;display:flex;flex-direction:column;overflow:hidden;border-radius:20px 20px 0 0;box-shadow:0 -12px 60px rgba(0,0,0,0.95);box-sizing:border-box;background:#13161c;';

  var hdl=document.createElement('div');
  hdl.style.cssText='width:40px;height:5px;border-radius:3px;margin:12px auto 0;flex-shrink:0;background:rgba(255,255,255,0.2);cursor:pointer;';
  hdl.addEventListener('click',closeModal);

  var head=document.createElement('div');head.style.cssText='padding:12px 16px 6px;flex-shrink:0;';
  var topRow=document.createElement('div');topRow.style.cssText='display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;';
  var ttl=document.createElement('span');ttl.id='wo-ttl';ttl.textContent='Pick Your Theme';
  ttl.style.cssText='font-size:17px;font-weight:800;color:#fff;font-family:system-ui,sans-serif;';
  var done=document.createElement('button');done.id='wo-done';done.textContent='Done';
  done.style.cssText='all:unset;box-sizing:border-box;font-size:14px;font-weight:700;cursor:pointer;padding:7px 22px;border-radius:20px;background:#69BE28;color:#fff;min-height:36px;flex-shrink:0;font-family:system-ui,sans-serif;';
  done.addEventListener('click',closeModal);
  topRow.appendChild(ttl);topRow.appendChild(done);

  var cwRow=document.createElement('div');cwRow.style.cssText='display:flex;gap:6px;margin-bottom:10px;';
  ['home','away'].forEach(function(k){
    var b=document.createElement('button');b.dataset.cw=k;b.textContent=k==='home'?'Home':'Away';
    b.style.cssText='all:unset;box-sizing:border-box;flex:1;padding:8px;border:2px solid rgba(128,128,128,0.3);border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;background:transparent;color:rgba(255,255,255,0.45);min-height:40px;text-align:center;font-family:system-ui,sans-serif;';
    b.addEventListener('click',function(){
      S.cw=this.dataset.cw;
      if(S.team){WO.applyTheme(S.team,S.cw);WO.save(S.team,S.cw,S.lg);}
      updateBtns();paint();render();
    });
    cwRow.appendChild(b);
  });

  var tabs=document.createElement('div');tabs.style.cssText='display:flex;gap:4px;overflow-x:auto;padding-bottom:6px;margin-bottom:2px;scrollbar-width:none;';
  TABS.forEach(function(lg){
    var b=document.createElement('button');b.dataset.tab=lg;b.textContent=LBL[lg];
    b.style.cssText='all:unset;box-sizing:border-box;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;font-family:system-ui,sans-serif;background:transparent;color:rgba(255,255,255,0.45);min-height:32px;';
    b.addEventListener('click',function(){S.lg=this.dataset.tab;render();paint();});
    tabs.appendChild(b);
  });

  head.appendChild(topRow);head.appendChild(cwRow);head.appendChild(tabs);

  GRID=document.createElement('div');
  GRID.style.cssText='flex:1;overflow-y:auto;padding:10px 16px 20px;display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:8px;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,0.15) transparent;';

  BOX.appendChild(hdl);BOX.appendChild(head);BOX.appendChild(GRID);
  OVL.appendChild(BOX);
  document.body.appendChild(OVL);
}

function setClosedStyle(){
  OVL.style.cssText='position:fixed;inset:0;z-index:99999;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,0);pointer-events:none;transition:background 0.3s;';
}

function render(){
  if(!GRID)return;
  GRID.innerHTML='';
  var src=window['WO_'+S.lg.toUpperCase()];
  if(!src||!src.length){
    var msg=document.createElement('p');
    msg.style.cssText='color:rgba(255,255,255,0.4);font-size:13px;grid-column:1/-1;text-align:center;padding:20px 0;font-family:system-ui,sans-serif;';
    msg.textContent='No teams loaded for '+LBL[S.lg]+'.';
    GRID.appendChild(msg);
    return;
  }
  src.forEach(function(team){
    var tile=document.createElement('div');
    tile.className='wo-tile';
    tile.dataset.k=team.k;
    tile.dataset.lg=S.lg;
    tile.style.cssText='display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 6px;border-radius:10px;border:1px solid rgba(255,255,255,0.07);cursor:pointer;transition:all 0.15s;background:rgba(255,255,255,0.03);';
    var img=document.createElement('img');
    img.src=imgUrl(S.lg,team.k);
    img.style.cssText='width:48px;height:48px;object-fit:contain;';
    img.onerror=function(){this.style.display='none';};
    var sp=document.createElement('span');
    sp.textContent=team.n;
    sp.style.cssText='font-size:10px;text-align:center;color:rgba(255,255,255,0.4);line-height:1.2;font-family:system-ui,sans-serif;';
    tile.appendChild(img);tile.appendChild(sp);
    tile.addEventListener('click',function(){
      S.team=team;
      WO.applyTheme(team,S.cw);
      WO.save(team,S.cw,S.lg);
      paint();
    });
    GRID.appendChild(tile);
  });
  paint();
}

function updateBtns(){
  document.querySelectorAll('[data-cw]').forEach(function(b){
    var p=pal();
    var on=b.dataset.cw===S.cw;
    b.style.borderColor=on?p.acc:'rgba(128,128,128,0.3)';
    b.style.color=on?p.acc:p.mut;
    b.style.background=on?p.acc+'33':'transparent';
  });
}

function openModal(){
  if(!OVL)buildUI();
  OVL.style.background='rgba(0,0,0,0.7)';
  OVL.style.pointerEvents='auto';
  BOX.style.transform='translateY(0)';
  BOX.style.transition='transform 0.35s cubic-bezier(0.32,0.72,0,1)';
  render();paint();
}

function closeModal(){
  OVL.style.background='rgba(0,0,0,0)';
  OVL.style.pointerEvents='none';
  BOX.style.transform='translateY(100%)';
}

// ─── TRIGGER BUTTON ──────────────────────────────────────────────────────────
WO.openTheme=function(){openModal();};

document.addEventListener('DOMContentLoaded',function(){
  // restore saved theme
  var saved=WO.load();
  if(saved){
    S.team={k:saved.k,n:saved.n,hp:saved.hp,ap:saved.ap,ht:saved.ht,at:saved.at};
    S.cw=saved.cw||'home';
    S.lg=saved.lg||'nfl';
    WO.applyTheme(S.team,S.cw);
  }
  // wire up any [data-wo-theme] buttons on the page
  document.querySelectorAll('[data-wo-theme]').forEach(function(el){
    el.addEventListener('click',openModal);
  });
});

})();
