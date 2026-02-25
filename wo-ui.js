(function(){
if(window.__WO_UI__)return;
window.__WO_UI__=true;
var WO=window.WO=window.WO||{};
var S={lg:'nfl',cw:'home',team:null};
var TABS=['mlb','nfl','nba','nhl','pokemon','mtg'];
var LBL={mlb:'MLB',nfl:'NFL',nba:'NBA',nhl:'NHL',pokemon:'Pokemon',mtg:'MTG'};

function imgUrl(lg,k){
  if(lg==='pokemon')return'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+k+'.png';
  if(lg==='mtg')return'https://svgs.scryfall.io/card-symbols/'+k+'.svg';
  return'https://a.espncdn.com/i/teamlogos/'+lg+'/500/'+k+'.png';
}

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
  var ttl=document.getElementById('wo-ttl');
  if(ttl)ttl.style.color=p.txt;
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
    var sp=tile.querySelector('span');
    if(sp)sp.style.color=on?p.acc:'rgba(255,255,255,0.4)';
  });
}

function buildUI(){
  if(OVL)return;
  OVL=document.createElement('div');
  OVL.id='wo-portal';
  setClosedStyle();
  OVL.addEventListener('click',function(e){if(e.target===OVL)closeModal();});

  BOX=document.createElement('div');
  BOX.style.cssText='width:100%;max-width:680px;max-height:88vh;display:flex;flex-direction:column;overflow:hidden;border-radius:20px 20px 0 0;box-shadow:0 -12px 60px rgba(0,0,0,0.95);box-sizing:border-box;background:#13161c;';

  var hdl=document.createElement('div');
  hdl.style.cssText='width:40px;height:5px;border-radius:3px;margin:12px auto 0;flex-shrink:0;background:rgba(255,255,255,0.2);cursor:pointer;';
  hdl.addEventListener('click',closeModal);

  var head=document.createElement('div');
  head.style.cssText='padding:12px 16px 6px;flex-shrink:0;';

  var topRow=document.createElement('div');
  topRow.style.cssText='display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;';
  var ttl=document.createElement('span');
  ttl.id='wo-ttl';ttl.textContent='Pick Your Theme';
  ttl.style.cssText='font-size:17px;font-weight:800;color:#fff;font-family:system-ui,sans-serif;';
  var done=document.createElement('button');
  done.id='wo-done';done.textContent='Done';
  done.style.cssText='all:unset;box-sizing:border-box;font-size:14px;font-weight:700;cursor:pointer;padding:7px 22px;border-radius:20px;background:#69BE28;color:#fff;min-height:36px;flex-shrink:0;font-family:system-ui,sans-serif;';
  done.addEventListener('click',closeModal);
  topRow.appendChild(ttl);topRow.appendChild(done);

  var cwRow=document.createElement('div');
  cwRow.style.cssText='display:flex;gap:6px;margin-bottom:10px;';
  ['home','away'].forEach(function(k){
    var b=document.createElement('button');
    b.dataset.cw=k;b.textContent=k==='home'?'Home':'Away';
    b.style.cssText='all:unset;box-sizing:border-box;flex:1;padding:8px;border:2px solid rgba(128,128,128,0.3);border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;background:transparent;color:rgba(255,255,255,0.45);min-height:40px;text-align:center;font-family:system-ui,sans-serif;';
    b.addEventListener('click',function(){
      S.cw=this.dataset.cw;
      if(S.team)WO.applyTheme&&WO.applyTheme(S.team,S.cw);
      updateBtns();paint();render();
    });
    cwRow.appendChild(b);
  });

  var tabWrap=document.createElement('div');
  tabWrap.style.cssText='overflow-x:auto;margin-bottom:8px;-webkit-overflow-scrolling:touch;';
  var tabInner=document.createElement('div');
  tabInner.style.cssText='display:flex;gap:2px;background:rgba(0,0,0,0.4);border-radius:10px;padding:4px;width:max-content;';
  TABS.forEach(function(lg){
    var b=document.createElement('button');
    b.dataset.tab=lg;b.textContent=LBL[lg];
    b.style.cssText='all:unset;box-sizing:border-box;padding:7px 14px;border-radius:7px;font-size:12px;font-weight:700;cursor:pointer;background:transparent;color:rgba(255,255,255,0.45);white-space:nowrap;min-height:36px;font-family:system-ui,sans-serif;';
    b.addEventListener('click',function(){S.lg=this.dataset.tab;render();paint();});
    tabInner.appendChild(b);
  });
  tabWrap.appendChild(tabInner);

  head.appendChild(topRow);head.appendChild(cwRow);head.appendChild(tabWrap);

  var body=document.createElement('div');
  body.style.cssText='overflow-y:auto;padding:4px 14px 40px;flex:1;min-height:0;';
  GRID=document.createElement('div');
  GRID.style.cssText='display:grid;grid-template-columns:repeat(auto-fill,minmax(82px,1fr));gap:8px;padding-top:4px;';
  body.appendChild(GRID);

  BOX.appendChild(hdl);BOX.appendChild(head);BOX.appendChild(body);
  OVL.appendChild(BOX);
  document.body.appendChild(OVL);
}

function setClosedStyle(){
  if(!OVL)return;
  OVL.style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-9999;opacity:0;pointer-events:none;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,0.88);font-family:system-ui,sans-serif;';
}
function setOpenStyle(){
  if(!OVL)return;
  OVL.style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:2147483647;opacity:1;pointer-events:auto;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,0.88);font-family:system-ui,sans-serif;';
}

function getTeams(){
  var map={mlb:'__WO_MLB__',nfl:'__WO_NFL__',nba:'__WO_NBA__',nhl:'__WO_NHL__'};
  if(map[S.lg])return(window[map[S.lg]]&&window[map[S.lg]].teams)||[];
  if(S.lg==='pokemon')return WO.__POKE__||[];
  if(S.lg==='mtg')return WO.__MTG__||[];
  return[];
}

function render(){
  if(!GRID)return;
  var teams=getTeams();
  var p=pal();
  GRID.innerHTML='';
  if(!teams.length){
    GRID.innerHTML='<p style="color:rgba(255,255,255,0.4);padding:30px;text-align:center;grid-column:1/-1;margin:0;font-family:system-ui">No data for '+S.lg+'</p>';
    return;
  }
  teams.forEach(function(t){
    var tile=document.createElement('div');
    tile.className='wo-tile';tile.dataset.k=t.k;tile.dataset.lg=S.lg;
    var on=!!(S.team&&t.k===S.team.k&&S.lg===S.team._lg);
    tile.style.cssText='display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 4px 8px;border:2px solid '+(on?p.acc:'rgba(255,255,255,0.07)')+';border-radius:10px;cursor:pointer;background:'+(on?p.acc+'33':'rgba(255,255,255,0.03)')+';box-sizing:border-box;';
    var img=document.createElement('img');
    img.src=imgUrl(S.lg,t.k);img.alt=t.n;
    img.style.cssText='width:44px;height:44px;object-fit:contain;display:block;pointer-events:none;';
    var lbl=document.createElement('span');
    lbl.textContent=t.n;
    lbl.style.cssText='font-size:9px;font-weight:700;color:'+(on?p.acc:'rgba(255,255,255,0.4)')+';text-align:center;line-height:1.3;display:block;pointer-events:none;word-break:break-word;font-family:system-ui,sans-serif;';
    tile.appendChild(img);tile.appendChild(lbl);
    tile.addEventListener('click',function(){
      t._lg=S.lg;S.team=t;
      WO.applyTheme&&WO.applyTheme(t,S.cw);
      WO.save&&WO.save(t,S.cw,S.lg);
      updateBtns();paint();render();
    });
    GRID.appendChild(tile);
  });
}

function openModal(){buildUI();render();paint();setOpenStyle();document.body.style.overflow='hidden';}
function closeModal(){if(!OVL)return;setClosedStyle();document.body.style.overflow='';}
WO.openModal=openModal;

function updateBtns(){
  if(!S.team)return;
  var home=S.cw!=='away';
  var bg=S.team[home?'hp':'ap']||'#002244';
  var tc=S.team[home?'ht':'at']||'#fff';
  document.querySelectorAll('.wo-btn').forEach(function(btn){
    btn.style.background=bg;btn.style.color=tc;
    var bi=btn.querySelector('.wo-bi');
    if(bi)bi.src=imgUrl(S.team._lg||S.lg,S.team.k);
    var bs=btn.querySelector('.wo-bs');
    if(bs)bs.textContent=S.team.n;
  });
}

function mkBtn(){
  var b=document.createElement('button');
  b.className='wo-btn';
  b.style.cssText='all:unset;box-sizing:border-box;display:inline-flex;align-items:center;gap:7px;background:#002244;color:#fff;border-radius:8px;padding:6px 14px 6px 8px;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap;min-height:40px;font-family:system-ui,sans-serif;flex-shrink:0;-webkit-tap-highlight-color:transparent;';
  var bi=document.createElement('img');
  bi.className='wo-bi';bi.src='https://a.espncdn.com/i/teamlogos/nfl/500/sea.png';
  bi.style.cssText='width:26px;height:26px;object-fit:contain;border-radius:50%;pointer-events:none;flex-shrink:0;';
  var bs=document.createElement('span');
  bs.className='wo-bs';bs.textContent='My Team';
  bs.style.cssText='pointer-events:none;color:inherit;font-weight:700;';
  b.appendChild(bi);b.appendChild(bs);
  b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();openModal();});
  return b;
}

// Desktop injection - into navbar6_menu-right
var _injected=false;
function inject(){
  if(_injected)return;
  var el=document.querySelector('.navbar6_menu-right');
  if(el&&!el.querySelector('.wo-btn')){el.appendChild(mkBtn());_injected=true;return;}
  var link=document.querySelector('.navbar6_link');
  if(link&&link.parentNode&&!link.parentNode.querySelector('.wo-btn')){link.parentNode.appendChild(mkBtn());_injected=true;}
}

// Mobile injection - watch for .w-nav-overlay height change (Webflow mobile drawer)
var _mobDone=false;
function tryMobile(){
  if(_mobDone)return;
  var ov=document.querySelector('.w-nav-overlay');
  if(!ov)return;
  var h=parseInt(ov.style.height)||0;
  if(h<10)return;
  if(ov.querySelector('.wo-mob-wrap'))return;
  _mobDone=true;
  var w=document.createElement('div');
  w.className='wo-mob-wrap';
  w.style.cssText='display:flex;justify-content:center;padding:16px 16px 8px;width:100%;box-sizing:border-box;';
  w.appendChild(mkBtn());
  ov.insertBefore(w,ov.firstChild);
  if(S.team)updateBtns();
}

// Also try injecting into .w-nav-menu which is what's visible inside overlay
function tryNavMenu(){
  if(_mobDone)return;
  var menu=document.querySelector('.w-nav-overlay .w-nav-menu');
  if(!menu)return;
  if(menu.querySelector('.wo-mob-wrap'))return;
  var style=window.getComputedStyle(menu);
  if(style.display==='none')return;
  _mobDone=true;
  var w=document.createElement('div');
  w.className='wo-mob-wrap';
  w.style.cssText='display:flex;justify-content:center;padding:16px 16px 8px;width:100%;box-sizing:border-box;';
  w.appendChild(mkBtn());
  menu.insertBefore(w,menu.firstChild);
  if(S.team)updateBtns();
}

new MutationObserver(function(){
  if(!_mobDone){tryMobile();tryNavMenu();}
  if(!_injected)inject();
}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['style','class']});

function restore(){
  var sv=WO.load&&WO.load();
  if(!sv||!sv.k)return;
  var map={mlb:'__WO_MLB__',nfl:'__WO_NFL__',nba:'__WO_NBA__',nhl:'__WO_NHL__'};
  var src=map[sv.lg]?window[map[sv.lg]]:null;
  var teams=(src&&src.teams)||[];
  var t=teams.find(function(x){return x.k===sv.k;});
  if(t){t._lg=sv.lg;S.team=t;S.cw=sv.cw||'home';S.lg=sv.lg;WO.applyTheme&&WO.applyTheme(t,S.cw);updateBtns();}
}

function boot(){
  inject();restore();
  setTimeout(function(){if(!_injected)inject();},800);
  setTimeout(function(){if(!_injected)inject();},2500);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
else boot();
}());

