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

var state={session:null,results:[],cart:[],q:'',offset:0,loading:false};

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
    + '<div id="mp-bl-cart-summary" class="mp-bl-cart-summary"></div>'
    + '<div id="mp-bl-results" class="mp-bl-results"></div>';
}

function resultCard(title){
  var sku=title.skus[0];
  var inCart=state.cart.some(function(l){return l.id==='backlist:'+sku.id;});
  return '<div class="mp-bl-card">'
    + (title.coverImageUrl?'<img class="mp-bl-cover" src="'+esc(title.coverImageUrl)+'" alt="" loading="lazy">':'<div class="mp-bl-cover mp-bl-cover-placeholder"></div>')
    + '<div class="mp-bl-card-body"><div class="mp-bl-card-title">'+esc(title.title)+'</div>'
    + (title.publisher?'<div class="mp-bl-card-sub">'+esc(title.publisher)+'</div>':'')
    + '<div class="mp-bl-card-price">'+money(sku.priceCents)+'</div>'
    + '<div class="mp-bl-card-delivery">'+esc(sku.delivery.headline)+'</div>'
    + '<button class="mp-bl-button'+(inCart?' is-added':'')+'" data-add data-sku-id="'+esc(sku.id)+'" data-title="'+esc(title.title)+'" data-price="'+sku.priceCents+'" data-cover="'+esc(title.coverImageUrl||'')+'">'+(inCart?'Added ✓':'Add to cart')+'</button>'
    + '</div></div>';
}

async function runSearch(){
  var host=document.getElementById('mp-bl-results');
  if(host)host.innerHTML='<div class="mp-bl-loading">Searching…</div>';
  try{
    var params=new URLSearchParams({store_id:STORE_ID,q:state.q,limit:'24',offset:'0'});
    var data=await api('/public/backlist/search?'+params.toString(),{auth:false});
    state.results=data.results||[];
    renderResults();
  }catch(error){
    if(host)host.innerHTML='<div class="mp-bl-error">'+esc(error.message)+'</div>';
  }
}

function renderResults(){
  var host=document.getElementById('mp-bl-results');
  if(!host)return;
  if(!state.results.length){host.innerHTML='<div class="mp-bl-empty">'+(state.q?'No titles match "'+esc(state.q)+'".':'Search PRH\'s full catalog above to get started.')+'</div>';return;}
  host.innerHTML=state.results.map(resultCard).join('');
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

function dialog(html){
  var overlay=document.createElement('div');
  overlay.className='mp-bl-overlay';
  overlay.innerHTML='<div class="mp-bl-modal">'+html+'<button class="mp-bl-close" data-close>&times;</button></div>';
  document.body.appendChild(overlay);
  overlay.addEventListener('click',function(e){if(e.target===overlay||e.target.hasAttribute('data-close'))overlay.remove();});
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
      setSession(session);overlay.remove();if(next)next();
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
    if(e.target.id==='mp-bl-search-btn'){state.q=document.getElementById('mp-bl-q').value.trim();runSearch();return;}
    if(e.target.id==='mp-bl-checkout-btn'){beginCheckout();return;}
  });
  host.addEventListener('keydown',function(e){if(e.target.id==='mp-bl-q'&&e.key==='Enter'){state.q=e.target.value.trim();runSearch();}});
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
  host.innerHTML=renderSearchBar();
  wireEvents();
  renderCart();
  renderResults();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
