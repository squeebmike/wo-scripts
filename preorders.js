(function(){
'use strict';

var API='https://still-resonance-4f87.swarnerauto.workers.dev';
var STORE_ID='0f9dd4bc-42a7-487e-a972-2905d24513e9';
var SUPABASE_URL='https://vroknjrxubsqyexngwus.supabase.co';
var SUPABASE_KEY='sb_publishable_wbpX2nL8l-4NbXtZNG_bjA_nabSYaJ5';
var SESSION_KEY='mp-foc-session-v1';
var state={cycles:null,session:readJson(SESSION_KEY,null),filters:{q:'',publisher:'all',artist:'all',kind:'all'},timer:null,deepLinkHandled:false,loadingCycles:new Set()};

function readJson(key,fallback){try{return JSON.parse(localStorage.getItem(key)||'null')||fallback;}catch(_){return fallback;}}
function saveJson(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(_){}}
function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(ch){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
function money(cents){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(cents||0)/100);}
// foc_date/onSaleDate come back as bare YYYY-MM-DD (no time) -- new Date()
// parses those as UTC midnight, and converting THAT to America/Los_Angeles
// rolls it back to the previous calendar day (e.g. Sep 14 renders as Sep
// 13). There's no real instant to convert for a date-only field, so those
// format in UTC (i.e. exactly the digits given); only real timestamps
// (customer_cutoff_at, which does carry a time) still convert to Pacific.
function dateLabel(value,withTime){if(!value)return'TBA';var dateOnly=/^\d{4}-\d{2}-\d{2}$/.test(value);var d=new Date(value);return new Intl.DateTimeFormat('en-US',{timeZone:dateOnly?'UTC':'America/Los_Angeles',weekday:'short',month:'short',day:'numeric',year:'numeric',hour:withTime?'numeric':undefined,minute:withTime?'2-digit':undefined,timeZoneName:withTime?'short':undefined}).format(d);}
function unique(values){return Array.from(new Set(values.filter(Boolean))).sort(function(a,b){return a.localeCompare(b);});}
function token(){return state.session&&state.session.access_token||'';}
function api(path,options){options=options||{};var headers=Object.assign({'Content-Type':'application/json'},options.headers||{});if(options.auth!==false&&token())headers.Authorization='Bearer '+token();return fetch(API+path,Object.assign({},options,{headers:headers})).then(async function(response){var data=await response.json().catch(function(){return{};});if(response.status===401&&state.session&&state.session.refresh_token&&!options.retried){await refreshSession();return api(path,Object.assign({},options,{retried:true}));}if(!response.ok)throw new Error(data.error||'The request could not be completed.');return data;});}
function auth(path,body){return fetch(SUPABASE_URL+'/auth/v1/'+path,{method:'POST',headers:{apikey:SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify(body)}).then(async function(response){var data=await response.json().catch(function(){return{};});if(!response.ok)throw new Error(data.msg||data.message||data.error_description||'Account request failed.');return data;});}
function setSession(session){state.session=session&&session.access_token?session:null;if(state.session)saveJson(SESSION_KEY,state.session);else{try{localStorage.removeItem(SESSION_KEY);}catch(_){}}}
async function refreshSession(){if(!state.session||!state.session.refresh_token)return;try{setSession(await auth('token?grant_type=refresh_token',{refresh_token:state.session.refresh_token}));}catch(_){setSession(null);}}
// The cart and My Pocket's saved pull list are deliberately separate. Adding
// an exact cover saves it to the account and also puts it in the cart, but
// removing it from the cart must never erase the collector's curated list.
function preorderCartLines(){return(window.WO&&typeof window.WO.getCart==='function'?window.WO.getCart():[]).filter(function(line){return line.kind==='preorder';});}
function preorderLineFor(match,qty){var family=match.family,sku=match.sku,cycle=match.cycle;return{id:'foc:'+sku.id,kind:'preorder',skuId:sku.id,cycleId:cycle.id,focDate:cycle.foc_date,name:(family.seriesName||family.title)+' · '+(sku.variantLabel||'Cover A'),image:sku.coverImageUrl||'',upc:sku.upc||'',price:Number(sku.priceCents||0)/100,available:50,qty:Math.max(1,Math.min(50,Number(qty||1)))};}
async function savePick(skuId,quantity){if(!token())return;try{await api('/public/preorders/picks',{method:'PATCH',body:JSON.stringify({storeId:STORE_ID,skuId:skuId,quantity:quantity})});}catch(error){console.warn('[Mana Pocket] Comic pull could not be saved:',error.message);}}
async function removeSavedPicks(skuIds){if(!token()||!skuIds.length)return;await api('/public/preorders/picks',{method:'DELETE',body:JSON.stringify({storeId:STORE_ID,skuIds:skuIds})});}

// Every helper below used to read the single state.catalog; now it reads
// across state.cycles (one entry per open/closed FOC week, newest first --
// see loadCatalog). A cart can hold picks from more than one week at once,
// so anything id-keyed (findSku) has to search every week, not just one.
function allSkus(){return(state.cycles||[]).flatMap(function(entry){return(entry.families||[]).flatMap(function(family){return family.variants.map(function(sku){return{family:family,sku:sku,cycle:entry.cycle};});});});}
function findSku(id){var match=allSkus().find(function(entry){return entry.sku.id===id;});return match||null;}
function cycleById(id){var entry=(state.cycles||[]).find(function(e){return e.cycle.id===id;});return entry?entry.cycle:null;}
function cycleOpen(cycle){return!!(cycle&&cycle.status==='open'&&new Date(cycle.customer_cutoff_at).getTime()>Date.now());}
function sortCycleEntries(entries){return entries.sort(function(a,b){var ao=cycleOpen(a.cycle),bo=cycleOpen(b.cycle);if(ao!==bo)return ao?-1:1;var at=new Date(a.cycle.customer_cutoff_at).getTime()||0,bt=new Date(b.cycle.customer_cutoff_at).getTime()||0;return ao?at-bt:bt-at;});}
function mount(){
  // This file now loads site-wide (wo-ui.js's loadPreorderCartHelpers) so
  // its cart/checkout functions are reachable from the shared cart drawer
  // everywhere, not just on /preorders -- but the actual FOC Wall page (nav,
  // catalog fetch, DOM mount) must still only ever render on /preorders
  // itself, or every other page on the site would grow a comic-covers
  // section nobody asked for.
  if((location.pathname.replace(/\/$/,'')||'/')!=='/preorders')return;
  document.body.classList.add('mp-page-preorders');
  if(!document.getElementById('navbarID')){
    var nav=document.createElement('nav');nav.className='mp-foc-nav';nav.setAttribute('aria-label','Main navigation');
    nav.innerHTML='<a class="mp-foc-brand" href="/" aria-label="The Mana Pocket home"><img src="https://cdn.prod.website-files.com/65b15ee0228d06647ca7e4ce/6a7ce98ab3d4819b7565620e_the_mana_pocket_patch_1024x1024.png" alt="The Mana Pocket"></a><div><a href="/">Home</a><a href="/shop">Shop</a><button type="button" data-foc-theme>My Pocket</button></div>';
    document.body.prepend(nav);nav.querySelector('[data-foc-theme]').addEventListener('click',function(){if(token())location.href='/account';else if(window.WO&&typeof window.WO.openTheme==='function')window.WO.openTheme();});
  }
  var app=document.getElementById('mp-foc-app');
  if(!app){app=document.createElement('main');app.id='mp-foc-app';app.innerHTML='<div class="mp-foc-shell"><header><div class="mp-foc-eyebrow">The Mana Pocket · Penguin Random House FOC</div><h1 class="mp-foc-title">Pick your exact covers.</h1><p class="mp-foc-intro">Prepay for the comics and covers you actually want. Active FOCs appear first; expired weeks stay at the bottom for reference. Covers load one FOC at a time so the wall opens quickly.</p></header><div data-foc-dynamic><div class="mp-foc-loading"><b>Opening the pull box…</b><span>Loading this week’s comic covers.</span></div></div></div>';var footer=document.querySelector('.footer-section,.Footer,.footer');if(footer)footer.parentNode.insertBefore(app,footer);else document.body.appendChild(app);}
  loadCatalog();
}

async function loadCatalog(){
  try{
    var data=await api('/public/preorders/weeks?summary=1&store_id='+encodeURIComponent(STORE_ID),{auth:false});state.cycles=sortCycleEntries((data.cycles||[]).map(function(cycle){return{cycle:cycle,families:null,error:''};}));render();
    var requested=new URLSearchParams(location.search).get('cycle');var first=(requested&&state.cycles.find(function(entry){return entry.cycle.id===requested||entry.cycle.foc_date===requested;}))||state.cycles[0];
    if(first)await loadCycleCatalog(first.cycle.id);
    await ensureDeepLinkCatalog();handleDeepLink();
    // "Open pulls & pay" on the account page's saved-pulls card links here
    // with ?cart=1 -- without this, that link only scrolled to the FOC week
    // and left the customer to find and click the floating cart button
    // themselves to actually reach payment, which read as "does nothing."
    if(new URLSearchParams(location.search).get('cart')==='1'&&window.WO&&typeof window.WO.openCart==='function')window.WO.openCart();
  }
  catch(error){document.querySelector('[data-foc-dynamic]').innerHTML='<div class="mp-foc-empty"><h2>Comic preorders are getting bagged and boarded.</h2><p>'+esc(error.message)+'</p><a class="mp-foc-button ghost" href="/">Back to the shop</a></div>';}
}

async function loadCycleCatalog(cycleId){
  var entry=(state.cycles||[]).find(function(item){return item.cycle.id===cycleId;});
  if(!entry||Array.isArray(entry.families)||state.loadingCycles.has(cycleId))return;
  state.loadingCycles.add(cycleId);entry.error='';render();
  try{var data=await api('/public/preorders?store_id='+encodeURIComponent(STORE_ID)+'&cycle='+encodeURIComponent(cycleId),{auth:false});entry.cycle=data.cycle;entry.families=data.families||[];}
  catch(error){entry.error=error.message||'This FOC could not be loaded.';}
  finally{state.loadingCycles.delete(cycleId);sortCycleEntries(state.cycles);render();}
}

async function ensureDeepLinkCatalog(){
  var skuId=new URLSearchParams(location.search).get('sku');if(!skuId||findSku(skuId))return;
  for(var i=0;i<(state.cycles||[]).length;i++){if(!Array.isArray(state.cycles[i].families))await loadCycleCatalog(state.cycles[i].cycle.id);if(findSku(skuId))return;}
}

function countdownHtml(cycle){
  var end=new Date(cycle.customer_cutoff_at).getTime();var delta=Math.max(0,end-Date.now());var parts=[['DAYS',Math.floor(delta/86400000)],['HRS',Math.floor(delta%86400000/3600000)],['MIN',Math.floor(delta%3600000/60000)],['SEC',Math.floor(delta%60000/1000)]];return parts.map(function(part){return'<b>'+String(part[1]).padStart(2,'0')+'<small>'+part[0]+'</small></b>';}).join('');
}
function filteredFamiliesFor(entry){
  var q=state.filters.q.toLowerCase();return entry.families.map(function(family){var variants=family.variants.filter(function(sku){var hay=[family.title,family.seriesName,family.writer,family.publisher,sku.variantLabel,sku.coverArtist,sku.description].join(' ').toLowerCase();return(!q||hay.indexOf(q)!==-1)&&(state.filters.publisher==='all'||family.publisher===state.filters.publisher)&&(state.filters.artist==='all'||sku.coverArtist===state.filters.artist)&&(state.filters.kind==='all'||(state.filters.kind==='first'&&family.isFirstIssue)||(state.filters.kind==='foil'&&sku.isFoil)||(state.filters.kind==='incentive'&&sku.isIncentive)||(state.filters.kind==='standard'&&!sku.isIncentive));});return Object.assign({},family,{variants:variants});}).filter(function(family){return family.variants.length;});
}
function render(){
  if(!state.cycles||!state.cycles.length){
    document.querySelector('[data-foc-dynamic]').innerHTML='<div class="mp-foc-empty"><h2>No FOC weeks are open right now.</h2><p>Check back once the next Monday order is imported.</p></div>';
    return;
  }
  var publishers=unique(state.cycles.flatMap(function(e){return(e.families||[]).map(function(f){return f.publisher;});}));
  var artists=unique(allSkus().map(function(e){return e.sku.coverArtist;}));
  document.querySelector('[data-foc-dynamic]').innerHTML=
    (state.cycles.length>1?'<nav class="mp-foc-week-nav" aria-label="Jump to an FOC week">'+state.cycles.map(function(entry,index){return'<a href="#foc-week-'+esc(entry.cycle.id)+'">'+(index===0&&entry.cycle.isOpen?'⏰ Closes soonest · ':'')+(entry.cycle.isOpen?'':'Expired · ')+'FOC '+esc(dateLabel(entry.cycle.foc_date,false))+'</a>';}).join('')+'</nav>':'')+
    '<section class="mp-foc-controls" aria-label="Filter comic preorders"><input data-filter="q" type="search" placeholder="Search title, creator, character…" value="'+esc(state.filters.q)+'"><select data-filter="publisher"><option value="all">All publishers</option>'+publishers.map(function(v){return'<option'+(state.filters.publisher===v?' selected':'')+'>'+esc(v)+'</option>';}).join('')+'</select><select data-filter="artist"><option value="all">All cover artists</option>'+artists.map(function(v){return'<option'+(state.filters.artist===v?' selected':'')+'>'+esc(v)+'</option>';}).join('')+'</select><select data-filter="kind"><option value="all">All covers</option><option value="standard"'+(state.filters.kind==='standard'?' selected':'')+'>Standard covers</option><option value="foil"'+(state.filters.kind==='foil'?' selected':'')+'>Foil covers</option><option value="first"'+(state.filters.kind==='first'?' selected':'')+'>#1 issues</option><option value="incentive"'+(state.filters.kind==='incentive'?' selected':'')+'>Incentives</option></select><button class="mp-foc-button ghost" data-account>'+(token()?'My preorders':'Sign in')+'</button></section>'+
    state.cycles.map(function(entry,index){return weekSectionHtml(entry,index>0,index);}).join('');
  bind();
  if(state.timer)clearInterval(state.timer);
  state.timer=setInterval(function(){
    document.querySelectorAll('[data-foc-countdown]').forEach(function(node){var cycle=cycleById(node.dataset.cycleId);if(cycle)node.innerHTML=countdownHtml(cycle);});
  },1000);
}
function weekSectionHtml(entry,withSeparator,index){
  var cycle=entry.cycle,loaded=Array.isArray(entry.families),families=loaded?filteredFamiliesFor(entry):[];
  var catalog=loaded?'<div class="mp-foc-result-line" data-result-line="'+esc(cycle.id)+'">'+resultLineText(families,cycle)+'</div><div data-foc-families="'+esc(cycle.id)+'">'+familyHtml(families,cycle.isOpen)+'</div>':'<div class="mp-foc-empty mp-foc-cycle-gate"><h2>'+(state.loadingCycles.has(cycle.id)?'Opening this FOC…':entry.error?'Could not open this FOC':'Covers are ready when you are.')+'</h2><p>'+esc(entry.error||'Load this week only; the other FOCs stay out of the initial download.')+'</p><button class="mp-foc-button ghost" type="button" data-load-cycle="'+esc(cycle.id)+'" '+(state.loadingCycles.has(cycle.id)?'disabled':'')+'>'+(state.loadingCycles.has(cycle.id)?'Loading…':entry.error?'Try again':'Show this FOC')+'</button></div>';
  return '<section id="foc-week-'+esc(cycle.id)+'" class="mp-foc-week'+(withSeparator?' mp-foc-week-sep':'')+'" data-foc-week="'+esc(cycle.id)+'" data-week-color="'+(index%4)+'">'+
    '<div class="mp-foc-deadline"><div><strong>'+(cycle.isOpen?'Orders close '+esc(dateLabel(cycle.customer_cutoff_at,true)):'This FOC is closed')+'</strong><span>FOC '+esc(dateLabel(cycle.foc_date,false))+' · we place the distributor order every Monday · quantities, finishes, and covers are exact</span></div><div class="mp-foc-countdown" data-foc-countdown data-cycle-id="'+esc(cycle.id)+'">'+countdownHtml(cycle)+'</div></div>'+
    catalog+
  '</section>';
}
function resultLineText(families,cycle){return'<span>'+families.length+' titles · '+families.reduce(function(n,f){return n+f.variants.length;},0)+' exact covers</span><span>FOC '+esc(dateLabel(cycle.foc_date,false))+'</span>';}
function familyHtml(families,cycleIsOpen){if(!families.length)return'<div class="mp-foc-empty"><h2>No covers match that search.</h2><p>Try clearing a filter.</p></div>';return families.map(function(family){var badges=(family.isFirstIssue?'<span class="mp-foc-badge hot">Issue #1</span>':'')+(family.isNewSeries?'<span class="mp-foc-badge">New series</span>':'')+(family.variants.some(function(v){return v.isFoil;})?'<span class="mp-foc-badge">Foil</span>':'')+(family.variants.some(function(v){return v.isIncentive;})?'<span class="mp-foc-badge ratio">Incentives</span>':'');return'<article class="mp-foc-family"><header class="mp-foc-family-head"><div><h2>'+esc(family.seriesName||family.title)+(family.issueNumber?' #'+esc(family.issueNumber):'')+'</h2><p>'+esc([family.writer&&'Written by '+family.writer,family.interiorArtist&&'Art by '+family.interiorArtist].filter(Boolean).join(' · '))+'</p><div class="mp-foc-badges">'+badges+'</div></div><div class="mp-foc-family-meta">'+esc(family.publisher)+'<br>On sale '+esc(dateLabel(family.onSaleDate,false))+'<br>'+family.variants.length+' cover'+(family.variants.length===1?'':'s')+'</div></header><div class="mp-foc-variants">'+family.variants.map(function(sku){return coverHtml(family,sku,cycleIsOpen);}).join('')+'</div></article>';}).join('');}
function coverHtml(family,sku,cycleIsOpen){var image=sku.coverImageUrl?'<img loading="lazy" decoding="async" src="'+esc(sku.coverImageUrl)+'" alt="'+esc((family.seriesName||family.title)+' '+sku.variantLabel)+'">':'<span>No cover image yet</span>';var ratio=sku.isIncentive?'<div class="mp-foc-ratio">'+esc(sku.orderRequirement||('1:'+sku.ratioThreshold+' incentive'))+'<div class="mp-foc-progress"><i style="width:'+Math.min(100,100*Number(sku.qualification&&sku.qualification.total||0)/Math.max(1,Number(sku.ratioThreshold||1)))+'%"></i></div>'+(sku.waitlistOnly?'Request list only · no charge':'Secured copies available')+'</div>':'';var action=sku.waitlistOnly?'Request one':(sku.canPreorder?'Add exact cover':'Price coming soon');var price=sku.waitlistOnly?(sku.priceRequired?'Price confirmed if secured':money(sku.priceCents)+' if secured'):(sku.priceRequired?'Price coming soon':money(sku.priceCents));var actionAttr=sku.waitlistOnly?'data-waitlist="'+esc(sku.id)+'"':(sku.canPreorder?'data-add="'+esc(sku.id)+'"':'');var disabled=!cycleIsOpen||(!sku.waitlistOnly&&!sku.canPreorder);return'<section class="mp-foc-cover" data-sku-card="'+esc(sku.id)+'"><button class="mp-foc-cover-image" data-lightbox="'+esc(sku.id)+'" aria-label="Enlarge cover">'+image+'</button><h3>'+esc(sku.variantLabel||'Cover A')+'</h3><div class="mp-foc-badges">'+(sku.isFoil?'<span class="mp-foc-badge">Foil</span>':'')+(sku.isIncentive?'<span class="mp-foc-badge ratio">'+esc(sku.orderRequirement||'Incentive')+'</span>':'')+'</div><div class="artist">'+esc(sku.coverArtist?'Cover by '+sku.coverArtist:'Cover artist not listed')+'</div><div class="price '+(sku.priceRequired||sku.waitlistOnly?'request':'')+'">'+price+'</div><div class="release">UPC '+esc(sku.upc)+'<br>On sale '+esc(dateLabel(sku.onSaleDate,false))+'</div>'+ratio+'<div class="actions"><button class="mp-foc-button" '+actionAttr+' '+(disabled?'disabled':'')+'>'+action+'</button><input class="mp-foc-qty" data-qty="'+esc(sku.id)+'" type="number" value="1" min="1" max="50" aria-label="Quantity" '+(!sku.waitlistOnly&&!sku.canPreorder?'disabled':'')+'></div></section>';}

function handleDeepLink(){if(state.deepLinkHandled)return;var params=new URLSearchParams(location.search),skuId=params.get('sku');if(!skuId)return;var match=findSku(skuId);if(!match)return;state.deepLinkHandled=true;state.filters.q=match.sku.upc||match.family.title;render();var card=document.querySelector('[data-sku-card="'+CSS.escape(skuId)+'"]');if(card)card.scrollIntoView({behavior:'smooth',block:'center'});if(params.get('add')==='1'&&match.sku.canPreorder){addPreorderLine(skuId,1);}else if(params.get('request')==='1'||match.sku.waitlistOnly){requestWaitlist(skuId,1);}}

function bind(){
  document.querySelectorAll('[data-filter]').forEach(function(control){control.addEventListener(control.tagName==='INPUT'?'input':'change',function(){
    state.filters[control.dataset.filter]=control.value;
    state.cycles.forEach(function(entry){
      if(!Array.isArray(entry.families))return;
      var families=filteredFamiliesFor(entry);
      var host=document.querySelector('[data-foc-families="'+entry.cycle.id+'"]');if(host)host.innerHTML=familyHtml(families,entry.cycle.isOpen);
      var line=document.querySelector('[data-result-line="'+entry.cycle.id+'"]');if(line)line.innerHTML=resultLineText(families,entry.cycle);
    });
    bindDynamic();
  });});
  bindDynamic();
  document.querySelector('[data-account]')?.addEventListener('click',function(){location.href=token()?'/account-preorders':'/login?next='+encodeURIComponent('/account-preorders');});
}
// Adds (or bumps) a preorder line directly in the shared window.WO cart --
// bypasses window.WO.addToCart because that helper only ever adds one unit
// at a time, and here the customer picked an exact quantity in the qty
// input next to the cover.
function addPreorderLine(skuId,qty,sourceEl){
  var match=findSku(skuId);if(!match)return;
  var cart=(window.WO&&typeof window.WO.getCart==='function'?window.WO.getCart():[]);
  var lineId='foc:'+skuId,existing=cart.find(function(l){return l.id===lineId;});
  var add=Math.max(1,Number(qty||1));
  if(existing)existing.qty=Math.min(50,Number(existing.qty||1)+add);
  else cart.push(preorderLineFor(match,add));
  if(window.WO&&typeof window.WO.setCart==='function')window.WO.setCart(cart);
  savePick(skuId,existing?existing.qty:line.qty);
  // Same flourish-toward-the-cart-icon as a regular add, not a forced-open
  // drawer -- someone picking exact covers is almost always about to add
  // another, and popping the drawer here would cut that off every time.
  if(window.WO&&typeof window.WO.playAddToCartFlourish==='function')window.WO.playAddToCartFlourish(sourceEl);
}
function bindDynamic(){
  document.querySelectorAll('[data-load-cycle]').forEach(function(button){button.addEventListener('click',function(){loadCycleCatalog(button.dataset.loadCycle);});});
  document.querySelectorAll('[data-add]').forEach(function(button){button.addEventListener('click',function(){var input=document.querySelector('[data-qty="'+button.dataset.add+'"]');addPreorderLine(button.dataset.add,Number(input&&input.value||1),button);button.textContent='Added ✓';setTimeout(function(){button.textContent='Add exact cover';},900);});});
  document.querySelectorAll('[data-waitlist]').forEach(function(button){button.addEventListener('click',function(){requestWaitlist(button.dataset.waitlist,Number(document.querySelector('[data-qty="'+button.dataset.waitlist+'"]')?.value||1));});});
  document.querySelectorAll('[data-lightbox]').forEach(function(button){button.addEventListener('click',function(){var match=findSku(button.dataset.lightbox);if(match)dialog('<div class="mp-foc-lightbox"><img src="'+esc(match.sku.coverImageUrl)+'" alt=""><p>'+esc((match.family.seriesName||match.family.title)+' · '+match.sku.variantLabel)+'</p></div>','wide');});});
}
function dialog(content,className){closeDialog();var overlay=document.createElement('div');overlay.className='mp-foc-overlay';overlay.innerHTML='<section class="mp-foc-dialog '+(className||'')+'" role="dialog" aria-modal="true"><button class="mp-foc-close" aria-label="Close">×</button>'+content+'</section>';document.body.appendChild(overlay);overlay.querySelector('.mp-foc-close').addEventListener('click',closeDialog);overlay.addEventListener('click',function(event){if(event.target===overlay)closeDialog();});document.addEventListener('keydown',escapeDialog);return overlay;}
function closeDialog(){document.querySelector('.mp-foc-overlay')?.remove();document.removeEventListener('keydown',escapeDialog);}
function escapeDialog(event){if(event.key==='Escape')closeDialog();}
function status(node,message,kind){node.innerHTML='<div class="mp-foc-status '+(kind||'')+'">'+esc(message)+'</div>';}
// Shows the same message as status(), plus a live "Resend confirmation
// email" button -- for the two moments a collector is stuck on an
// unconfirmed account: right after signing up, and when signing in fails
// because the account was never confirmed. Calls Supabase's own resend
// endpoint directly (same one the official client SDKs use), so it doesn't
// need a new Worker route.
function statusWithResend(node,message,email,kind){
  node.innerHTML='<div class="mp-foc-status '+(kind||'success')+'">'+esc(message)+'</div><button class="mp-foc-button ghost" type="button" data-resend-confirmation>Resend confirmation email</button>';
  var button=node.querySelector('[data-resend-confirmation]');
  button.addEventListener('click',function(){
    button.disabled=true;button.textContent='Sending…';
    auth('resend',{type:'signup',email:email}).then(function(){
      node.innerHTML='<div class="mp-foc-status success">If an unconfirmed account exists for this email, a new confirmation message was requested. Check your inbox and spam folder.</div>';
    }).catch(function(error){
      statusWithResend(node,error.message,email,'error');
    });
  });
}

function requireSession(next){if(token()){next();return;}openAuth(next);}
function openAuth(next){var overlay=dialog('<h2>Collector sign in</h2><p>Use one account to save your comic pulls, pay before FOC, and see purchased preorders.</p><form class="mp-foc-auth" data-auth-form><input name="name" placeholder="Name (new collectors)"><input name="email" type="email" required placeholder="Email"><input name="password" type="password" minlength="8" required placeholder="Password · 8+ characters"><div data-auth-status></div><div class="mp-foc-cart-actions"><button class="mp-foc-button ghost" type="button" data-sign-up>Create account</button><button class="mp-foc-button" type="submit">Sign in</button></div></form>');var form=overlay.querySelector('[data-auth-form]'),out=overlay.querySelector('[data-auth-status]');async function perform(kind){var data=new FormData(form),email=String(data.get('email')||'').trim(),password=String(data.get('password')||''),name=String(data.get('name')||'').trim();if(!email||password.length<8){status(out,'Enter an email and a password with at least 8 characters.','error');return;}status(out,'Opening your pull box…');try{var session;if(kind==='signup'){var result=await auth('signup',{email:email,password:password,data:{full_name:name}});if(!result.access_token){statusWithResend(out,'If this email is new, check your inbox to confirm it. If you already have an account, sign in instead or reset your password.',email);return;}session=result;}else session=await auth('token?grant_type=password',{email:email,password:password});setSession(session);closeDialog();render();if(next)next();}catch(error){if(/confirm/i.test(error.message))statusWithResend(out,error.message,email,'error');else status(out,error.message,'error');}}form.addEventListener('submit',function(event){event.preventDefault();perform('signin');});overlay.querySelector('[data-sign-up]').addEventListener('click',function(){perform('signup');});}

function requestWaitlist(skuId,quantity){requireSession(async function(){var match=findSku(skuId);var overlay=dialog('<h2>Request this incentive</h2><p>'+esc((match.family.seriesName||match.family.title)+' · '+match.sku.variantLabel)+'</p><p>This is a request, not a purchase. You will not be charged unless The Mana Pocket secures a copy and offers it to you.</p><div data-request-status></div><button class="mp-foc-button" data-confirm-request>Join request list</button>');var out=overlay.querySelector('[data-request-status]');overlay.querySelector('[data-confirm-request]').addEventListener('click',async function(){try{status(out,'Saving your request…');var result=await api('/public/preorders/waitlist',{method:'POST',body:JSON.stringify({storeId:STORE_ID,skuId:skuId,quantity:quantity})});status(out,result.message,'success');}catch(error){status(out,error.message,'error');}});});}

// The cart is shared with the regular shop cart (storefront-checkout.js,
// via window.WO / wo_cart_v1) -- these lines carry everything needed to
// check out (name/price/image/upc/skuId/cycleId/focDate) right on the
// line itself, precisely so this checkout never needs the /preorders
// catalog (state.cycles) to be loaded, since the customer could be
// finishing checkout from any page on the site.
//
// The checkout FORM itself (pickup/shipping picker, address, live rate,
// payment) is NOT built here -- it's storefront-checkout.js's own
// mp-sfc-panel modal, the exact same UI the regular shop cart uses, so a
// comic preorder never looks like a second, different-feeling checkout.
// This file only owns what's specific to comics: the FOC sign-in gate and
// walking a mixed-week cart through its checkouts one FOC cycle at a time.
//
// Checkout has to happen one FOC week at a time -- the Worker's checkout
// route validates every line against a single cycle_id, since each week is
// its own distributor order with its own cutoff. Grouping here is what lets
// someone add covers from two different weeks to one cart and still check
// out cleanly, as two real orders back to back.
function groupPreorderLinesByCycle(lines){
  var groups=[],byId={};
  lines.forEach(function(line){
    var key=line.cycleId;
    if(!byId[key]){byId[key]={cycleId:key,focDate:line.focDate,lines:[]};groups.push(byId[key]);}
    byId[key].lines.push(line);
  });
  return groups;
}
// Entry point called from storefront-checkout.js (window.WO.checkoutPreorderLines)
// once it's split kind:'preorder' lines out of the shared cart -- runs sign-in
// first, then each FOC week as its own back-to-back checkout/payment.
function checkoutPreorderLines(lines,onAllDone){requireSession(function(){preorderCheckoutQueue(groupPreorderLinesByCycle(lines),0,onAllDone);});}
function preorderCheckoutQueue(groups,index,onAllDone){
  if(index>=groups.length){if(typeof onAllDone==='function')onAllDone();return;}
  if(!window.MPSFC||typeof window.MPSFC.openPreorderCheckout!=='function'){alert('Checkout is still loading -- give it a second and try again.');return;}
  var group=groups[index];
  window.MPSFC.openPreorderCheckout(group,index,groups.length,function(){
    if(window.WO&&typeof window.WO.getCart==='function'&&typeof window.WO.setCart==='function'){
      var paidIds={};group.lines.forEach(function(line){paidIds[line.id]=true;});
      window.WO.setCart(window.WO.getCart().filter(function(i){return !paidIds[i.id];}));
    }
    removeSavedPicks(group.lines.map(function(line){return line.skuId;})).catch(function(error){console.warn('[Mana Pocket] Paid pulls could not be removed from the saved list:',error.message);}).finally(function(){preorderCheckoutQueue(groups,index+1,onAllDone);});
  });
}

function openAccount(){requireSession(async function(){var overlay=dialog('<h2>My preorders</h2><div data-account-status><div class="mp-foc-loading"><b>Checking the pull box…</b></div></div><div class="mp-foc-cart-actions"><button class="mp-foc-button ghost" data-sign-out>Sign out</button></div>','wide');overlay.querySelector('[data-sign-out]').addEventListener('click',function(){setSession(null);closeDialog();render();});var out=overlay.querySelector('[data-account-status]');try{var result=await api('/public/preorders/my?store_id='+encodeURIComponent(STORE_ID));out.innerHTML=result.orders.length?result.orders.map(orderHtml).join(''):'<p>You do not have any comic preorders yet.</p>';out.querySelectorAll('[data-cancel-order]').forEach(function(button){button.addEventListener('click',async function(){if(!confirm('Cancel and refund this preorder before FOC closes?'))return;button.disabled=true;try{await api('/public/preorders/cancel',{method:'POST',body:JSON.stringify({storeId:STORE_ID,orderId:button.dataset.cancelOrder})});openAccount();}catch(error){alert(error.message);button.disabled=false;}});});}catch(error){status(out,error.message,'error');}});}
function orderHtml(order){return'<article class="mp-foc-account-order"><header><h3>'+esc(order.order_number)+'</h3><span class="status">'+esc(order.status.replaceAll('_',' '))+'</span></header><p>'+money(order.total_cents)+' · '+esc(order.fulfillment_method)+' · ordered '+esc(dateLabel(order.created_at,true))+'</p><div class="mp-foc-account-items">'+(order.items||[]).map(function(item){return'<img src="'+esc(item.sku_snapshot&&item.sku_snapshot.coverImageUrl||'')+'" title="'+esc(item.sku_snapshot&&item.sku_snapshot.title||'')+'" alt="">';}).join('')+'</div>'+(order.canCancel?'<button class="mp-foc-button ghost" data-cancel-order="'+esc(order.id)+'">Cancel before cutoff</button>':'')+'</article>';}

// Entry point storefront-checkout.js calls once it splits kind:'preorder'
// lines out of the shared cart at checkout time -- exposed unconditionally
// (not gated to /preorders) since checkout can be started from any page.
window.WO=window.WO||{};
window.WO.checkoutPreorderLines=checkoutPreorderLines;
// preorders.js owns the FOC sign-in session (a separate Supabase Auth
// token from any regular-shop identity) -- storefront-checkout.js needs a
// Bearer header from it to call the authenticated /public/preorders/checkout
// route, without knowing anything about how that session is stored.
window.WO.preorderAuthHeader=function(){var t=token();return t?{Authorization:'Bearer '+t}:{};};

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
