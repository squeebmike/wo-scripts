(function(){
'use strict';
var API='https://still-resonance-4f87.swarnerauto.workers.dev';
var STORE_ID='0f9dd4bc-42a7-487e-a972-2905d24513e9';
// Same Supabase project + localStorage session key preorders.js uses
// (mp-foc-session-v1) -- a customer already signed in on /preorders is
// recognized here too, and vice versa, without a second account system.
var SUPABASE_URL='https://vroknjrxubsqyexngwus.supabase.co';
var SUPABASE_KEY='sb_publishable_wbpX2nL8l-4NbXtZNG_bjA_nabSYaJ5';
var SESSION_KEY='mp-foc-session-v1';
var CART_KEY='mp-backlist-cart-v1';

var state={session:null,results:[],cart:[],q:'',publisher:'',format:'',offset:0,limit:24,hasMore:false,loading:false,facets:{publishers:[],formats:[]},scrollObserver:null,shelves:[],showShelves:true,picks:new Set()};

function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(ch){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
function money(cents){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(cents||0)/100);}
function loadJson(key,fallback){try{var raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback;}catch(_){return fallback;}}
function saveJson(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(_){}}

state.session=loadJson(SESSION_KEY,null);
state.cart=loadJson(CART_KEY,[]);

function token(){return state.session&&state.session.access_token||'';}
function setSession(session){state.session=session&&session.access_token?session:null;if(state.session)saveJson(SESSION_KEY,state.session);else{try{localStorage.removeItem(SESSION_KEY);}catch(_){}}}
function setCart(cart){state.cart=cart;saveJson(CART_KEY,cart);renderCart();}

function auth(path,body){return fetch(SUPABASE_URL+'/auth/v1/'+path,{method:'POST',headers:{apikey:SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify(body)}).then(async function(response){var data=await response.json().catch(function(){return{};});if(!response.ok)throw new Error(data.msg||data.message||data.error_description||'Account request failed.');return data;});}
function api(path,options){options=options||{};var headers=Object.assign({'Content-Type':'application/json'},options.headers||{});if(options.auth!==false&&token())headers.Authorization='Bearer '+token();return fetch(API+path,Object.assign({},options,{headers:headers})).then(async function(response){var data=await response.json().catch(function(){return{};});if(!response.ok)throw new Error(data.error||'The request could not be completed.');return data;});}

function dynamicHost(){return document.querySelector('[data-bl-dynamic]');}

function renderSearchBar(){
  return '<div class="mp-bl-searchbar"><input type="search" id="mp-bl-q" placeholder="Search by title, author, or series…" value="'+esc(state.q)+'"><button class="mp-bl-button" id="mp-bl-search-btn">Search</button></div>'
    + '<div class="mp-bl-filters" id="mp-bl-filters">'+filterOptionsHtml()+'</div>'
    + '<div id="mp-bl-cart-summary" class="mp-bl-cart-summary"></div>'
    + '<div id="mp-bl-shelves"></div>'
    + '<div id="mp-bl-results" class="mp-bl-results"></div>';
}

// Curated homepage shelves (New Arrivals / Under $10 / Staff Picks) --
// ~23,000 titles is not a "browse everything alphabetically" catalog, it's
// a search-or-drown one. Shown only in the default no-query/no-filter state;
// typing a search or picking a filter (see applySearch()) replaces this with
// the regular flat results grid, same as before.
async function loadShelves(){
  var host=document.getElementById('mp-bl-shelves');
  if(host)host.innerHTML='<div class="mp-bl-loading">Loading…</div>';
  try{
    var data=await api('/public/backlist/shelves?store_id='+encodeURIComponent(STORE_ID),{auth:false});
    state.shelves=(data.shelves||[]).filter(function(s){return s.titles&&s.titles.length;});
  }catch(_){ state.shelves=[]; }
  renderShelves();
}
function shelfRow(shelf){
  return '<div class="mp-bl-shelf"><h2 class="mp-bl-shelf-title">'+esc(shelf.label)+'</h2>'
    + '<div class="mp-bl-shelf-row">'+shelf.titles.map(resultCard).join('')+'</div></div>';
}
function renderShelves(){
  var host=document.getElementById('mp-bl-shelves');
  if(!host)return;
  if(!state.showShelves){host.innerHTML='';return;}
  host.innerHTML=state.shelves.map(shelfRow).join('')
    + '<div class="mp-bl-browse-all"><button class="mp-bl-button ghost" type="button" id="mp-bl-browse-all-btn">Browse the full catalog A&ndash;Z &rarr;</button></div>';
}
// Every path into a real search (typed query, a filter change, or the
// "browse full catalog" escape hatch) goes through here so shelves always
// get torn down the same way -- no separate "did I remember to hide the
// shelves" bug per entry point.
function applySearch(){
  state.showShelves=false;
  renderShelves();
  runSearch();
}

// Publisher/format dropdowns are populated from /public/backlist/facets,
// fetched in parallel with the first browse search rather than awaited
// before the page paints anything -- see mount(). Re-rendered in place via
// #mp-bl-filters once facets resolve, so it never wipes results already on
// screen.
function filterOptionsHtml(){
  var publisherOptions=state.facets.publishers.map(function(p){return '<option value="'+esc(p)+'"'+(state.publisher===p?' selected':'')+'>'+esc(p)+'</option>';}).join('');
  var formatOptions=state.facets.formats.map(function(f){return '<option value="'+esc(f)+'"'+(state.format===f?' selected':'')+'>'+esc(f)+'</option>';}).join('');
  return '<select id="mp-bl-filter-publisher"><option value="">All publishers</option>'+publisherOptions+'</select>'
    + '<select id="mp-bl-filter-format"><option value="">All categories</option>'+formatOptions+'</select>';
}

function resultCard(title){
  var sku=title.skus[0];
  var inCart=state.cart.some(function(l){return l.id==='backlist:'+sku.id;});
  var saved=state.picks.has(sku.id);
  return '<div class="mp-bl-card">'
    + '<div class="mp-bl-cover-wrap">'
    + '<button type="button" class="mp-bl-card-link" data-open-detail="'+esc(title.id)+'">'
    + (title.coverImageUrl?'<img class="mp-bl-cover" src="'+esc(title.coverImageUrl)+'" alt="" loading="lazy">':'<div class="mp-bl-cover mp-bl-cover-placeholder"></div>')
    + '</button>'
    + '<button type="button" class="mp-bl-save-btn'+(saved?' is-saved':'')+'" data-save data-sku-id="'+esc(sku.id)+'" data-title="'+esc(title.title)+'" data-cover="'+esc(title.coverImageUrl||'')+'" aria-label="'+(saved?'Remove from saved':'Save for later')+'">'+(saved?'★':'☆')+'</button>'
    + '</div>'
    + '<div class="mp-bl-card-body">'
    + (title.formatName?'<span class="mp-bl-card-format">'+esc(title.formatName)+'</span>':'')
    + '<button type="button" class="mp-bl-card-link" data-open-detail="'+esc(title.id)+'"><div class="mp-bl-card-title">'+esc(title.title)+'</div></button>'
    + (title.publisher?'<div class="mp-bl-card-sub">'+esc(title.publisher)+'</div>':'')
    + '<div class="mp-bl-card-price">'+money(sku.priceCents)+'</div>'
    + '<div class="mp-bl-card-delivery">'+esc(sku.delivery.headline)+'</div>'
    + '<button class="mp-bl-button'+(inCart?' is-added':'')+'" data-add data-sku-id="'+esc(sku.id)+'" data-title="'+esc(title.title)+'" data-price="'+sku.priceCents+'" data-cover="'+esc(title.coverImageUrl||'')+'">'+(inCart?'Added ✓':'Add to cart')+'</button>'
    + '<button type="button" class="mp-bl-card-details" data-open-detail="'+esc(title.id)+'">Details &amp; share →</button>'
    + '</div></div>';
}

// Full detail view for one title -- cover, publisher/writer, a synopsis, and
// per-format price+delivery, same information density preorders.js's own
// skuDetailHtml() gives comic collectors. Renders in place as a dialog
// rather than navigating to /book/{id}: that page is real (SEO-facing, for
// search engines and direct links) but themanapocket.com/book/* currently
// 404s in production due to a Cloudflare routing/DNS issue outside this
// repo's control -- calling /public/backlist/title/:id here hits the Worker
// directly (same as every other backlist API call already does) and sidesteps
// that entirely, so browsing isn't blocked on an infra fix landing first.
function backlistDetailHtml(title,skus){
  var byline=[title.writer,title.publisher].filter(Boolean).join(' · ');
  var rows=skus.map(function(s){
    var saved=state.picks.has(s.id);
    return '<div class="mp-bl-detail-row"><b>'+esc(s.formatName||'Edition')+'</b> — '+money(s.priceCents)
      +'<div class="mp-bl-card-delivery">'+esc(s.delivery.headline)+'</div>'
      +'<div style="display:flex;gap:8px;flex-wrap:wrap">'
      +'<button class="mp-bl-button" type="button" data-detail-add data-sku-id="'+esc(s.id)+'" data-title="'+esc(title.title)+'" data-price="'+s.priceCents+'" data-cover="'+esc(title.coverImageUrl||'')+'">Add to cart</button>'
      +'<button class="mp-bl-button ghost" type="button" data-detail-save data-sku-id="'+esc(s.id)+'" data-title="'+esc(title.title)+'" data-cover="'+esc(title.coverImageUrl||'')+'">'+(saved?'★ Saved':'☆ Save for later')+'</button>'
      +'</div></div>';
  }).join('');
  return '<div class="mp-bl-detail">'
    + (title.coverImageUrl?'<img class="mp-bl-detail-cover" src="'+esc(title.coverImageUrl)+'" alt="">':'')
    + '<h2>'+esc(title.title)+'</h2>'
    + (title.subtitle?'<div class="mp-bl-card-sub">'+esc(title.subtitle)+'</div>':'')
    + (byline?'<div class="mp-bl-card-sub">'+esc(byline)+'</div>':'')
    + (title.description?'<h4>Synopsis</h4><p>'+esc(title.description)+'</p>':'')
    + rows
    + '<div class="mp-bl-auth-actions" style="justify-content:flex-start"><button class="mp-bl-button ghost" type="button" data-detail-share="'+esc(title.id)+'" data-title="'+esc(title.title)+'">Share</button></div>'
    + '</div>';
}
async function openBacklistDetail(titleId){
  var overlay=dialog('<div class="mp-bl-loading">Loading…</div>');
  try{
    var data=await api('/public/backlist/title/'+encodeURIComponent(titleId)+'?store_id='+encodeURIComponent(STORE_ID),{auth:false});
    overlay.querySelector('.mp-bl-modal').innerHTML=backlistDetailHtml(data.title,data.skus||[])+'<button class="mp-bl-close" data-close>&times;</button>';
    overlay.querySelectorAll('[data-detail-add]').forEach(function(button){
      button.addEventListener('click',function(){
        addToCart({id:'backlist:'+button.dataset.skuId,kind:'backlist',skuId:button.dataset.skuId,name:button.dataset.title,image:button.dataset.cover,price:Number(button.dataset.price||0)/100,qty:1});
        button.textContent='Added ✓';
      });
    });
    overlay.querySelectorAll('[data-detail-save]').forEach(function(button){
      button.addEventListener('click',function(){
        toggleSavePick(button.dataset.skuId,button.dataset.title,button.dataset.cover,function(nowSaved){
          button.textContent=nowSaved?'★ Saved':'☆ Save for later';
        });
      });
    });
    var shareBtn=overlay.querySelector('[data-detail-share]');
    if(shareBtn)shareBtn.addEventListener('click',function(){shareBacklistTitle(shareBtn.dataset.title,shareBtn);});
  }catch(error){
    overlay.querySelector('.mp-bl-modal').innerHTML='<div class="mp-bl-error">'+esc(error.message)+'</div><button class="mp-bl-close" data-close>&times;</button>';
  }
}
// /books?q=<title> is a real, already-working page (browse mode plus the
// ?q= deep-link this page reads on load) -- shared here instead of the
// canonical but currently-broken /book/{id} URL so a shared link actually
// opens something for whoever receives it, not another 404.
function shareBacklistTitle(title,button){
  var url=location.origin+'/books?q='+encodeURIComponent(title);
  if(navigator.share){navigator.share({title:title+' | The Mana Pocket',text:'Check out '+title+' at The Mana Pocket',url:url}).catch(function(){});return;}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(url).then(function(){var original=button.textContent;button.textContent='Link copied ✓';setTimeout(function(){button.textContent=original;},1400);}).catch(function(){window.prompt('Copy this link:',url);});return;}
  window.prompt('Copy this link:',url);
}

// "Save for later" wishlist -- deliberately independent of the cart (see
// backlist-catalog.mjs's loadBacklistPicks comment): saving a book here
// never adds it to mp-backlist-cart-v1, and vice versa. Requires sign-in,
// same account system comics already use, since a wishlist has to persist
// across devices/visits to be worth anything.
async function loadPicks(){
  if(!token())return;
  try{
    var data=await api('/public/backlist/picks?store_id='+encodeURIComponent(STORE_ID));
    state.picks=new Set((data.picks||[]).map(function(p){return p.sku_id;}));
  }catch(_){ /* best-effort -- an empty picks response just means nothing shows as saved yet */ }
}
function toggleSavePick(skuId,title,cover,done){
  requireSession(async function(){
    var wasSaved=state.picks.has(skuId);
    try{
      if(wasSaved){
        await api('/public/backlist/picks',{method:'DELETE',body:JSON.stringify({storeId:STORE_ID,skuIds:[skuId]})});
        state.picks.delete(skuId);
      }else{
        await api('/public/backlist/picks',{method:'PATCH',body:JSON.stringify({storeId:STORE_ID,skuId:skuId,quantity:1})});
        state.picks.add(skuId);
      }
      renderResults();renderShelves();
      if(done)done(state.picks.has(skuId));
    }catch(error){ if(done)done(wasSaved); window.alert(error.message); }
  });
}

async function loadFacets(){
  try{
    var data=await api('/public/backlist/facets?store_id='+encodeURIComponent(STORE_ID),{auth:false});
    state.facets.publishers=data.publishers||[];
    state.facets.formats=data.formats||[];
  }catch(_){ /* best-effort -- an empty facets response just means the dropdowns stay unfiltered; browse/search still works */ }
}
function renderFilters(){
  var host=document.getElementById('mp-bl-filters');
  if(host)host.innerHTML=filterOptionsHtml();
}

// q, publisher, and format are all optional -- an empty q with no filters
// is a real "browse everything" request (backlistSearch in
// backlist-catalog.mjs), not an error state, so this always runs on load
// instead of only after someone types something.
async function runSearch(append){
  if(state.loading)return;
  state.loading=true;
  var host=document.getElementById('mp-bl-results');
  var offset=append?state.offset:0;
  if(append&&host){
    var sentinel=host.querySelector('[data-bl-sentinel]');
    if(sentinel)sentinel.outerHTML='<div class="mp-bl-loading" style="grid-column:1/-1;padding:24px"><b>Loading more…</b></div>';
  }else if(host){
    host.innerHTML='<div class="mp-bl-loading">Loading…</div>';
  }
  try{
    var params=new URLSearchParams({store_id:STORE_ID,q:state.q,limit:String(state.limit),offset:String(offset)});
    if(state.publisher)params.set('publisher',state.publisher);
    if(state.format)params.set('format',state.format);
    var data=await api('/public/backlist/search?'+params.toString(),{auth:false});
    var results=data.results||[];
    state.results=append?state.results.concat(results):results;
    state.offset=offset+results.length;
    state.hasMore=results.length>=state.limit;
    renderResults();
  }catch(error){
    if(host&&!append)host.innerHTML='<div class="mp-bl-error">'+esc(error.message)+'</div>';
  }finally{
    state.loading=false;
  }
}

function renderResults(){
  var host=document.getElementById('mp-bl-results');
  if(!host)return;
  if(!state.results.length){
    host.innerHTML='<div class="mp-bl-empty">'+(state.q||state.publisher||state.format?'No titles match this search.':'No titles are published yet -- check back soon.')+'</div>';
    return;
  }
  host.innerHTML=state.results.map(resultCard).join('')
    + (state.hasMore?'<div class="mp-bl-scroll-sentinel" data-bl-sentinel></div>':'');
  bindScrollLazyLoading();
}

// Auto-loads the next page as the sentinel div scrolls near the viewport,
// same IntersectionObserver approach preorders.js's bindCycleLazyLoading
// already uses for its own "load the next FOC week" trigger -- rootMargin
// fires the fetch ~900px before the sentinel is actually visible, so more
// results are usually already in by the time someone reaches the bottom.
// The sentinel gets removed/replaced by every renderResults() call, so a
// fresh observer per render is simpler and safer here than trying to reuse
// one across DOM replacements.
function bindScrollLazyLoading(){
  if(state.scrollObserver){state.scrollObserver.disconnect();state.scrollObserver=null;}
  if(!state.hasMore||!('IntersectionObserver' in window))return;
  state.scrollObserver=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting||state.loading)return;
      state.scrollObserver.unobserve(entry.target);
      runSearch(true);
    });
  },{rootMargin:'900px 0px 900px',threshold:0.01});
  var sentinel=document.querySelector('[data-bl-sentinel]');
  if(sentinel)state.scrollObserver.observe(sentinel);
}

function addToCart(line){
  var cart=state.cart.slice();
  var existing=cart.find(function(l){return l.id===line.id;});
  if(existing)existing.qty=Math.min(20,Number(existing.qty||1)+1);
  else cart.push(line);
  setCart(cart);
  renderResults();
}

function removeFromCart(id){setCart(state.cart.filter(function(l){return l.id!==id;}));renderResults();}

function renderCart(){
  var host=document.getElementById('mp-bl-cart-summary');
  if(!host)return;
  if(!state.cart.length){host.innerHTML='';return;}
  var total=state.cart.reduce(function(sum,l){return sum+Number(l.price||0)*Number(l.qty||1);},0);
  host.innerHTML='<div class="mp-bl-cart-inner"><b>'+state.cart.length+' item'+(state.cart.length===1?'':'s')+' in cart</b> · '+money(total*100)
    + '<div class="mp-bl-cart-lines">'+state.cart.map(function(l){return '<div class="mp-bl-cart-line">'+esc(l.name)+' x'+l.qty+' <button data-remove="'+esc(l.id)+'">remove</button></div>';}).join('')+'</div>'
    + '<button class="mp-bl-button" id="mp-bl-checkout-btn">Checkout</button></div>';
}

// Mobile back-button support: reading a book's detail dialog and hitting
// back used to leave /books entirely, since the browser had no idea a
// dialog was even open -- pushing a history entry on open means the phone's
// back button/gesture fires a popstate that closeDialog() below is already
// listening for, closing the dialog instead. Closing via the X/overlay tap
// removes that same listener without navigating, leaving one inert history
// entry a later real back press silently steps over (standard tradeoff for
// this pattern without a real client-side router).
function closeDialog(){
  var overlay=document.querySelector('.mp-bl-overlay');
  if(overlay)overlay.remove();
  window.removeEventListener('popstate',closeDialog);
}
function dialog(html){
  var overlay=document.createElement('div');
  overlay.className='mp-bl-overlay';
  overlay.innerHTML='<div class="mp-bl-modal">'+html+'<button class="mp-bl-close" data-close>&times;</button></div>';
  document.body.appendChild(overlay);
  overlay.addEventListener('click',function(e){if(e.target===overlay||e.target.hasAttribute('data-close'))closeDialog();});
  history.pushState({mpModal:true},'');
  window.addEventListener('popstate',closeDialog);
  return overlay;
}
function status(el,text,kind){if(!el)return;el.textContent=text;el.className='mp-bl-status'+(kind?' '+kind:'');}

function requireSession(next){if(token()){next();return;}openAuth(next);}

function openAuth(next){
  var overlay=dialog('<h2>Sign in</h2><p>One account for comic preorders and backlist book orders.</p><form data-auth-form><label>Name (new accounts)<input name="name"></label><label>Email<input name="email" type="email" required></label><label>Password<input name="password" type="password" minlength="8" required></label><div data-auth-status></div><div class="mp-bl-auth-actions"><button type="button" data-sign-up class="mp-bl-button ghost">Create account</button><button type="submit" class="mp-bl-button">Sign in</button></div></form>');
  var form=overlay.querySelector('[data-auth-form]'),out=overlay.querySelector('[data-auth-status]');
  function perform(kind){
    var data=new FormData(form),email=String(data.get('email')||'').trim(),password=String(data.get('password')||''),name=String(data.get('name')||'').trim();
    if(!email||password.length<8){status(out,'Enter an email and a password with at least 8 characters.','error');return;}
    status(out,'Signing in…');
    var request=kind==='signup'?auth('signup',{email:email,password:password,data:{full_name:name}}):auth('token?grant_type=password',{email:email,password:password});
    request.then(function(session){
      if(kind==='signup'&&!session.access_token){status(out,'Check your inbox to confirm this email, or sign in if you already have an account.');return;}
      setSession(session);closeDialog();if(next)next();
    }).catch(function(error){status(out,error.message,'error');});
  }
  form.addEventListener('submit',function(e){e.preventDefault();perform('signin');});
  overlay.querySelector('[data-sign-up]').addEventListener('click',function(){perform('signup');});
}

async function loadStripe(){
  if(window.Stripe)return window.Stripe;
  await new Promise(function(resolve,reject){
    var existing=document.querySelector('script[src="https://js.stripe.com/v3/"]');
    if(existing){existing.addEventListener('load',resolve,{once:true});existing.addEventListener('error',reject,{once:true});return;}
    var script=document.createElement('script');script.src='https://js.stripe.com/v3/';script.onload=resolve;script.onerror=reject;document.head.appendChild(script);
  });
  return window.Stripe;
}

function beginCheckout(){
  if(!state.cart.length)return;
  requireSession(openCheckoutModal);
}

function openCheckoutModal(){
  var overlay=dialog('<h2>Checkout</h2><div id="mp-bl-checkout-content"><form id="mp-bl-checkout-form"><label>Name<input name="name" required></label><label>Phone<input name="phone" required></label><label><input type="radio" name="method" value="pickup" checked> Pickup in store</label><label><input type="radio" name="method" value="shipping"> Ship to me</label><div id="mp-bl-shipping-fields" style="display:none"><label>Address line 1<input name="line1"></label><label>City<input name="city"></label><label>State<input name="state"></label><label>ZIP<input name="zip"></label></div><div data-checkout-status></div><button type="submit" class="mp-bl-button">Continue to payment</button></form></div>');
  var form=overlay.querySelector('#mp-bl-checkout-form'),out=overlay.querySelector('[data-checkout-status]');
  overlay.querySelectorAll('input[name="method"]').forEach(function(radio){radio.addEventListener('change',function(){overlay.querySelector('#mp-bl-shipping-fields').style.display=radio.checked&&radio.value==='shipping'?'block':'none';});});
  form.addEventListener('submit',async function(e){
    e.preventDefault();
    var data=new FormData(form);
    var method=String(data.get('method')||'pickup');
    var fulfillment={method:method,name:String(data.get('name')||''),phone:String(data.get('phone')||'')};
    if(method==='shipping')fulfillment.shippingAddress={line1:String(data.get('line1')||''),city:String(data.get('city')||''),state:String(data.get('state')||''),zip:String(data.get('zip')||'')};
    status(out,'Starting secure payment…');
    try{
      var items=state.cart.map(function(l){return {skuId:l.skuId,quantity:l.qty};});
      var checkoutData=await api('/public/backlist/checkout',{method:'POST',body:JSON.stringify({storeId:STORE_ID,items:items,fulfillment:fulfillment})});
      await mountPayment(overlay,checkoutData);
    }catch(error){status(out,error.message,'error');}
  });
}

async function mountPayment(overlay,data){
  var Stripe=await loadStripe();
  if(!Stripe)throw new Error('The secure payment form could not load.');
  var client=Stripe(data.publishableKey);
  var elements=client.elements({clientSecret:data.clientSecret,appearance:{theme:'night'}});
  var content=overlay.querySelector('#mp-bl-checkout-content');
  content.innerHTML='<div class="mp-bl-summary"><strong>Total: '+money(data.amountCents)+'</strong>'+(data.delivery?'<div>'+esc(data.delivery.headline)+'</div>':'')+'</div><div id="mp-bl-payment-el"></div><div data-pay-status class="mp-bl-status"></div><button class="mp-bl-button" data-pay>Pay '+money(data.amountCents)+'</button>';
  elements.create('payment',{layout:'tabs'}).mount('#mp-bl-payment-el');
  content.querySelector('[data-pay]').addEventListener('click',async function(){
    var button=content.querySelector('[data-pay]'),out=content.querySelector('[data-pay-status]');
    button.disabled=true;button.textContent='Processing payment…';
    try{
      var result=await client.confirmPayment({elements:elements,redirect:'if_required'});
      if(result.error)throw new Error(result.error.message);
      content.innerHTML='<div class="mp-bl-success"><h3>Order confirmed!</h3><p>Order '+esc(data.orderNumber)+'. A confirmation email is on its way.</p></div>';
      setCart([]);
    }catch(error){out.textContent=error.message;out.className='mp-bl-status error';button.disabled=false;button.textContent='Try again';}
  });
}

function wireEvents(){
  var host=dynamicHost();
  if(!host)return;
  host.addEventListener('click',function(e){
    var addBtn=e.target.closest('[data-add]');
    if(addBtn){
      addToCart({id:'backlist:'+addBtn.dataset.skuId,kind:'backlist',skuId:addBtn.dataset.skuId,name:addBtn.dataset.title,image:addBtn.dataset.cover,price:Number(addBtn.dataset.price||0)/100,qty:1});
      return;
    }
    var removeBtn=e.target.closest('[data-remove]');
    if(removeBtn){removeFromCart(removeBtn.getAttribute('data-remove'));return;}
    var saveBtn=e.target.closest('[data-save]');
    if(saveBtn){
      // toggleSavePick() re-renders the grid/shelves on success, which already
      // rebuilds this exact card with the star reflecting state.picks -- no
      // separate DOM patch needed here the way the detail dialog's own save
      // button (outside those renders) requires.
      toggleSavePick(saveBtn.dataset.skuId,saveBtn.dataset.title,saveBtn.dataset.cover);
      return;
    }
    var detailBtn=e.target.closest('[data-open-detail]');
    if(detailBtn){openBacklistDetail(detailBtn.dataset.openDetail);return;}
    if(e.target.id==='mp-bl-search-btn'){state.q=document.getElementById('mp-bl-q').value.trim();applySearch();return;}
    if(e.target.id==='mp-bl-browse-all-btn'){applySearch();return;}
    if(e.target.id==='mp-bl-checkout-btn'){beginCheckout();return;}
  });
  host.addEventListener('keydown',function(e){if(e.target.id==='mp-bl-q'&&e.key==='Enter'){state.q=e.target.value.trim();applySearch();}});
  host.addEventListener('change',function(e){
    if(e.target.id==='mp-bl-filter-publisher'){state.publisher=e.target.value;applySearch();return;}
    if(e.target.id==='mp-bl-filter-format'){state.format=e.target.value;applySearch();return;}
  });
}

function mount(){
  var host=dynamicHost();
  if(!host){
    // Defensive re-entry, same reasoning as preorders.js's own mount() --
    // if backlist-loader.js's shell somehow isn't there, rebuild it.
    var app=document.getElementById('mp-backlist-app');
    if(!app){app=document.createElement('main');app.id='mp-backlist-app';document.body.appendChild(app);}
    app.innerHTML='<div class="mp-bl-shell"><header><div class="mp-bl-eyebrow">The Mana Pocket · Full PRH catalog</div><h1 class="mp-bl-title">Order any book Penguin Random House still prints.</h1><p class="mp-bl-intro">Ships with our next weekly publisher order, not from shelf stock.</p></header><div data-bl-dynamic></div></div>';
    host=dynamicHost();
  }
  // A visitor arriving from a book's own /book/{id}/{slug} SEO page (see
  // backlistBookDetailPage in backlist-catalog.mjs) lands here via a
  // ?q=<title> link.
  try{ state.q=new URLSearchParams(location.search).get('q')||''; }catch(_){}
  host.innerHTML=renderSearchBar();
  wireEvents();
  renderCart();
  if(state.q){
    // A visitor arriving via a book's own SEO-page ?q= link wants that
    // search's results immediately, not the homepage shelves.
    state.showShelves=false;
    runSearch();
  }else{
    loadShelves();
  }
  loadFacets().then(renderFilters);
  // Runs in parallel with the shelves/search fetch above -- whichever
  // finishes first renders without saved-state, whichever finishes second
  // re-renders with it, so this never blocks first paint on a signed-in
  // customer's picks loading.
  loadPicks().then(function(){renderResults();renderShelves();});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
