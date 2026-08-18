(function(){
'use strict';

var API='https://still-resonance-4f87.swarnerauto.workers.dev';
var STORE_ID='0f9dd4bc-42a7-487e-a972-2905d24513e9';
var SUPABASE_URL='https://vroknjrxubsqyexngwus.supabase.co';
var SUPABASE_KEY='sb_publishable_wbpX2nL8l-4NbXtZNG_bjA_nabSYaJ5';
// Same key preorders.js uses -- signing in on either page signs in on both.
var SESSION_KEY='mp-foc-session-v1';
var state={session:readJson(SESSION_KEY,null),tab:'overview',cache:{}};

function readJson(key,fallback){try{return JSON.parse(localStorage.getItem(key)||'null')||fallback;}catch(_){return fallback;}}
function saveJson(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(_){}}
function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(ch){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
function money(amount){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(amount||0));}
function dateLabel(value,withTime){if(!value)return'';var d=new Date(value);return new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',month:'short',day:'numeric',year:'numeric',hour:withTime?'numeric':undefined,minute:withTime?'2-digit':undefined}).format(d);}
function token(){return state.session&&state.session.access_token||'';}

function api(path,options){
  options=options||{};
  var headers=Object.assign({'Content-Type':'application/json'},options.headers||{});
  if(token())headers.Authorization='Bearer '+token();
  return fetch(API+path,Object.assign({},options,{headers:headers})).then(async function(response){
    var data=await response.json().catch(function(){return{};});
    if(response.status===401&&state.session&&state.session.refresh_token&&!options.retried){
      await refreshSession();
      return api(path,Object.assign({},options,{retried:true}));
    }
    if(!response.ok)throw new Error(data.error||'The request could not be completed.');
    return data;
  });
}
function auth(path,body){
  return fetch(SUPABASE_URL+'/auth/v1/'+path,{method:'POST',headers:{apikey:SUPABASE_KEY,'Content-Type':'application/json'},body:JSON.stringify(body)}).then(async function(response){
    var data=await response.json().catch(function(){return{};});
    if(!response.ok)throw new Error(data.msg||data.message||data.error_description||'Account request failed.');
    return data;
  });
}
// PUT /auth/v1/user is how Supabase Auth changes an email or password on an
// existing session -- changing the email sends a confirmation link to the
// new address and the change does not take effect until it's clicked.
function updateUser(body){
  return fetch(SUPABASE_URL+'/auth/v1/user',{method:'PUT',headers:{apikey:SUPABASE_KEY,Authorization:'Bearer '+token(),'Content-Type':'application/json'},body:JSON.stringify(body)}).then(async function(response){
    var data=await response.json().catch(function(){return{};});
    if(!response.ok)throw new Error(data.msg||data.message||data.error_description||'Could not update your account.');
    return data;
  });
}
function setSession(session){
  state.session=session&&session.access_token?session:null;
  if(state.session)saveJson(SESSION_KEY,state.session);else{try{localStorage.removeItem(SESSION_KEY);}catch(_){}}
}
async function refreshSession(){
  if(!state.session||!state.session.refresh_token)return;
  try{setSession(await auth('token?grant_type=refresh_token',{refresh_token:state.session.refresh_token}));}catch(_){setSession(null);}
}

function mount(){
  if(document.getElementById('mp-acct-app'))return;
  document.body.classList.add('mp-page-account');
  if(!document.getElementById('navbarID')){
    var nav=document.createElement('nav');nav.className='mp-acct-nav';nav.setAttribute('aria-label','Main navigation');
    nav.innerHTML='<a class="mp-acct-brand" href="/" aria-label="The Mana Pocket home"><img src="https://cdn.prod.website-files.com/65b15ee0228d06647ca7e4ce/6a7ce98ab3d4819b7565620e_the_mana_pocket_patch_1024x1024.png" alt="The Mana Pocket"></a><div><a href="/">Home</a><a href="/shop">Shop</a><a href="/preorders">Comic Preorders</a><button type="button" data-acct-theme>Pick a theme</button></div>';
    document.body.prepend(nav);
    nav.querySelector('[data-acct-theme]').addEventListener('click',function(){if(window.WO&&typeof window.WO.openTheme==='function')window.WO.openTheme();});
  }
  var app=document.createElement('main');app.id='mp-acct-app';
  var footer=document.querySelector('.footer-section,.Footer,.footer');
  if(footer)footer.parentNode.insertBefore(app,footer);else document.body.appendChild(app);
  render();
}

function render(){
  var app=document.getElementById('mp-acct-app');
  if(!token()){renderSignedOut(app);return;}
  renderShell(app);
}

function statusHtml(message,kind){return message?'<div class="mp-acct-status'+(kind?' '+kind:'')+'">'+esc(message)+'</div>':'';}

function renderSignedOut(app){
  app.innerHTML='<div class="mp-acct-shell mp-acct-shell-narrow">'+
    '<div class="mp-acct-eyebrow">The Mana Pocket</div><h1 class="mp-acct-title">My Account</h1>'+
    '<p class="mp-acct-intro">Sign in with the same account you use for comic preorders to see your orders, rewards, and store history.</p>'+
    '<form class="mp-acct-auth" data-auth-form><input name="name" placeholder="Name (new collectors)"><input name="email" type="email" required placeholder="Email"><input name="password" type="password" minlength="8" required placeholder="Password · 8+ characters"><div data-auth-status></div><div class="mp-acct-actions"><button class="mp-acct-button ghost" type="button" data-sign-up>Create account</button><button class="mp-acct-button" type="submit">Sign in</button></div></form>'+
  '</div>';
  var form=app.querySelector('[data-auth-form]'),out=app.querySelector('[data-auth-status]');
  async function perform(kind){
    var data=new FormData(form),email=String(data.get('email')||'').trim(),password=String(data.get('password')||''),name=String(data.get('name')||'').trim();
    if(!email||password.length<8){out.innerHTML=statusHtml('Enter an email and a password with at least 8 characters.','error');return;}
    out.innerHTML=statusHtml('Working…');
    try{
      var session;
      if(kind==='signup'){
        var result=await auth('signup',{email:email,password:password,data:{full_name:name}});
        if(!result.access_token){renderResend(out,'Check your email to confirm the account, then sign in.',email);return;}
        session=result;
      }else session=await auth('token?grant_type=password',{email:email,password:password});
      setSession(session);render();
    }catch(error){
      if(/confirm/i.test(error.message))renderResend(out,error.message,email,'error');
      else out.innerHTML=statusHtml(error.message,'error');
    }
  }
  form.addEventListener('submit',function(event){event.preventDefault();perform('signin');});
  app.querySelector('[data-sign-up]').addEventListener('click',function(){perform('signup');});
}
function renderResend(node,message,email,kind){
  node.innerHTML=statusHtml(message,kind||'success')+'<button class="mp-acct-button ghost" type="button" data-resend>Resend confirmation email</button>';
  var button=node.querySelector('[data-resend]');
  button.addEventListener('click',function(){
    button.disabled=true;button.textContent='Sending…';
    auth('resend',{type:'signup',email:email}).then(function(){
      node.innerHTML=statusHtml('Confirmation email resent — check your inbox (and spam folder).','success');
    }).catch(function(error){renderResend(node,error.message,email,'error');});
  });
}

var TABS=[
  {id:'overview',label:'Overview'},
  {id:'orders',label:'Orders'},
  {id:'preorders',label:'Comic Preorders'},
  {id:'instore',label:'In-Store History'},
  {id:'phone',label:'Link Phone'},
  {id:'settings',label:'Account Settings'},
];

function renderShell(app){
  app.innerHTML='<div class="mp-acct-shell">'+
    '<div class="mp-acct-eyebrow">The Mana Pocket</div><h1 class="mp-acct-title">My Account</h1>'+
    '<nav class="mp-acct-tabs" role="tablist">'+TABS.map(function(t){return'<button type="button" role="tab" data-tab="'+t.id+'" class="'+(state.tab===t.id?'active':'')+'">'+esc(t.label)+'</button>';}).join('')+'</nav>'+
    '<div id="mp-acct-panel" class="mp-acct-panel"><div class="mp-acct-loading">Loading…</div></div>'+
    '<div class="mp-acct-actions mp-acct-signout"><button class="mp-acct-button ghost" type="button" data-sign-out>Sign out</button></div>'+
  '</div>';
  app.querySelectorAll('[data-tab]').forEach(function(button){
    button.addEventListener('click',function(){
      state.tab=button.dataset.tab;
      app.querySelectorAll('[data-tab]').forEach(function(b){b.classList.toggle('active',b===button);});
      loadTab(state.tab);
    });
  });
  app.querySelector('[data-sign-out]').addEventListener('click',function(){setSession(null);state.cache={};render();});
  loadTab(state.tab);
}

function panel(){return document.getElementById('mp-acct-panel');}

function loadTab(tab){
  if(tab==='overview')return loadOverview();
  if(tab==='orders')return loadOrders();
  if(tab==='preorders')return loadPreorders();
  if(tab==='instore')return loadInStore();
  if(tab==='phone')return renderPhoneTab();
  if(tab==='settings')return renderSettingsTab();
}

async function loadOverview(){
  var host=panel();host.innerHTML='<div class="mp-acct-loading">Loading your account…</div>';
  try{
    var summary=state.cache.summary||await api('/public/account/summary?store_id='+encodeURIComponent(STORE_ID));
    state.cache.summary=summary;
    var c=summary.customer;
    host.innerHTML='<div class="mp-acct-cards">'+
      '<div class="mp-acct-card"><span>Loyalty points</span><strong>'+(c?Number(c.loyaltyPointsBalance||0).toLocaleString():'0')+'</strong></div>'+
      '<div class="mp-acct-card"><span>Trade-in credit</span><strong>'+money(c?c.tradeCreditBalance:0)+'</strong></div>'+
      '<div class="mp-acct-card"><span>Gift cards</span><strong>'+money((summary.giftCards||[]).reduce(function(sum,g){return sum+Number(g.balance||0);},0))+'</strong></div>'+
    '</div>'+
    (summary.giftCards&&summary.giftCards.length?'<h3 class="mp-acct-subhead">Gift cards</h3><div class="mp-acct-list">'+summary.giftCards.map(function(g){return'<div class="mp-acct-row"><span>•••• '+esc(String(g.code).slice(-4))+'</span><strong>'+money(g.balance)+'</strong></div>';}).join('')+'</div>':'')+
    (summary.linked?
      '<div class="mp-acct-note">Linked to '+esc(c.phone||'')+' — rewards and in-store purchases on that phone number show up automatically.</div>'
      :'<div class="mp-acct-note warn">Your phone number is not linked yet, so in-store purchases and trade-in credit from register visits will not show here. <button class="mp-acct-button ghost" type="button" data-goto-phone>Link my phone</button></div>');
    var gotoPhone=host.querySelector('[data-goto-phone]');
    if(gotoPhone)gotoPhone.addEventListener('click',function(){selectTab('phone');});
  }catch(error){host.innerHTML=statusHtml(error.message,'error');}
}

function selectTab(tab){
  state.tab=tab;
  document.querySelectorAll('[data-tab]').forEach(function(b){b.classList.toggle('active',b.dataset.tab===tab);});
  loadTab(tab);
}

async function loadOrders(){
  var host=panel();host.innerHTML='<div class="mp-acct-loading">Loading your orders…</div>';
  try{
    var result=state.cache.orders||await api('/public/account/orders?store_id='+encodeURIComponent(STORE_ID));
    state.cache.orders=result;
    var orders=result.orders||[];
    host.innerHTML=orders.length?orders.map(orderCardHtml).join(''):'<div class="mp-acct-empty">No shop orders on this account yet.</div>';
  }catch(error){host.innerHTML=statusHtml(error.message,'error');}
}
function orderCardHtml(order){
  var methodLabel={pickup_fedway:'Pickup · Federal Way Commons',pickup_kitsap:'Local meetup · Kitsap County',shipping:'Shipping'}[order.fulfillment_method]||order.fulfillment_method;
  return '<article class="mp-acct-order"><header><div><h3>'+esc(order.confirmation_number)+'</h3><span class="mp-acct-sub">'+esc(methodLabel)+' · ordered '+esc(dateLabel(order.created_at,true))+'</span></div><span class="mp-acct-status-pill">'+esc(String(order.fulfillment_status||'').replace(/_/g,' '))+'</span></header>'+
    (order.total!=null?'<div class="mp-acct-row"><span>Total</span><strong>'+money(order.total)+'</strong></div>':'')+
    (order.items&&order.items.length?'<div class="mp-acct-items">'+order.items.map(function(item){return'<div class="mp-acct-item-line"><span>'+esc(item.title)+(item.quantity>1?' ×'+item.quantity:'')+'</span><span>'+money(item.unit_price)+'</span></div>';}).join('')+'</div>':'')+
  '</article>';
}

async function loadPreorders(){
  var host=panel();host.innerHTML='<div class="mp-acct-loading">Loading your comic preorders…</div>';
  try{
    var result=state.cache.preorders||await api('/public/preorders/my?store_id='+encodeURIComponent(STORE_ID));
    state.cache.preorders=result;
    var orders=result.orders||[];
    host.innerHTML=orders.length?orders.map(preorderCardHtml).join(''):'<div class="mp-acct-empty">No comic preorders yet. <a class="mp-acct-link" href="/preorders">Browse this week’s FOC covers</a>.</div>';
  }catch(error){host.innerHTML=statusHtml(error.message,'error');}
}
function preorderCardHtml(order){
  return '<article class="mp-acct-order"><header><div><h3>'+esc(order.order_number)+'</h3><span class="mp-acct-sub">ordered '+esc(dateLabel(order.created_at,true))+'</span></div><span class="mp-acct-status-pill">'+esc(String(order.status||'').replace(/_/g,' '))+'</span></header>'+
    '<div class="mp-acct-row"><span>Total</span><strong>'+money(Number(order.total_cents||0)/100)+'</strong></div>'+
    (order.items&&order.items.length?'<div class="mp-acct-items">'+order.items.map(function(item){var sku=item.sku||{};return'<div class="mp-acct-item-line"><span>'+esc(sku.title||'')+(sku.variant_label?' · '+esc(sku.variant_label):'')+'</span></div>';}).join('')+'</div>':'')+
  '</article>';
}

async function loadInStore(){
  var host=panel();host.innerHTML='<div class="mp-acct-loading">Loading your in-store history…</div>';
  try{
    var result=state.cache.instore||await api('/public/account/in-store?store_id='+encodeURIComponent(STORE_ID));
    state.cache.instore=result;
    if(!result.linked){host.innerHTML='<div class="mp-acct-note warn">Link your phone number to see purchases made at the register. <button class="mp-acct-button ghost" type="button" data-goto-phone>Link my phone</button></div>';host.querySelector('[data-goto-phone]').addEventListener('click',function(){selectTab('phone');});return;}
    var purchases=result.purchases||[];
    host.innerHTML=purchases.length?purchases.map(function(sale){return '<article class="mp-acct-order"><header><div><h3>'+money(sale.total)+'</h3><span class="mp-acct-sub">'+esc(dateLabel(sale.completed_at||sale.created_at,true))+'</span></div></header>'+
      (sale.items&&sale.items.length?'<div class="mp-acct-items">'+sale.items.map(function(item){return'<div class="mp-acct-item-line"><span>'+esc(item.title)+(item.quantity>1?' ×'+item.quantity:'')+'</span><span>'+money(item.unit_price)+'</span></div>';}).join('')+'</div>':'')+
    '</article>';}).join(''):'<div class="mp-acct-empty">No in-store purchases found on this phone number yet.</div>';
  }catch(error){host.innerHTML=statusHtml(error.message,'error');}
}

function renderPhoneTab(){
  var host=panel();
  var linkedPhone=state.cache.summary&&state.cache.summary.customer&&state.cache.summary.customer.phone;
  host.innerHTML='<p class="mp-acct-intro">Linking your phone number connects the rewards and store credit a cashier attaches to your phone number at the register to this account, and lets your in-store purchase history show up here.</p>'+
    (linkedPhone?'<div class="mp-acct-note">Currently linked to '+esc(linkedPhone)+'. Verifying a new number below will move the link to that number instead.</div>':'')+
    '<form class="mp-acct-auth" data-phone-form><input name="phone" type="tel" required placeholder="Phone number"><div class="mp-acct-actions"><button class="mp-acct-button" type="submit">Send code</button></div><div data-phone-status></div></form>'+
    '<form class="mp-acct-auth" data-code-form hidden><input name="code" inputmode="numeric" maxlength="6" required placeholder="6-digit code"><div class="mp-acct-actions"><button class="mp-acct-button" type="submit">Confirm</button></div><div data-code-status></div></form>';
  var phoneForm=host.querySelector('[data-phone-form]'),codeForm=host.querySelector('[data-code-form]'),phoneOut=host.querySelector('[data-phone-status]'),codeOut=host.querySelector('[data-code-status]');
  var phoneValue='';
  phoneForm.addEventListener('submit',async function(event){
    event.preventDefault();
    phoneValue=String(new FormData(phoneForm).get('phone')||'').trim();
    phoneOut.innerHTML=statusHtml('Sending your code…');
    try{
      await api('/public/account/phone/start-verify',{method:'POST',body:JSON.stringify({storeId:STORE_ID,phone:phoneValue})});
      phoneOut.innerHTML=statusHtml('Code sent — check your texts.','success');
      codeForm.hidden=false;
    }catch(error){phoneOut.innerHTML=statusHtml(error.message,'error');}
  });
  codeForm.addEventListener('submit',async function(event){
    event.preventDefault();
    var code=String(new FormData(codeForm).get('code')||'').trim();
    codeOut.innerHTML=statusHtml('Confirming…');
    try{
      var summary=await api('/public/account/phone/confirm-verify',{method:'POST',body:JSON.stringify({storeId:STORE_ID,phone:phoneValue,code:code})});
      state.cache.summary=summary;state.cache.instore=null;
      codeOut.innerHTML=statusHtml('Phone linked! Your rewards and in-store history are now connected.','success');
    }catch(error){codeOut.innerHTML=statusHtml(error.message,'error');}
  });
}

function renderSettingsTab(){
  var host=panel();
  var email=state.session&&state.session.user&&state.session.user.email||'';
  host.innerHTML='<h3 class="mp-acct-subhead">Change email</h3>'+
    '<form class="mp-acct-auth" data-email-form><input name="email" type="email" required placeholder="New email" value="'+esc(email)+'"><div class="mp-acct-actions"><button class="mp-acct-button" type="submit">Update email</button></div><div data-email-status></div></form>'+
    '<h3 class="mp-acct-subhead">Change password</h3>'+
    '<form class="mp-acct-auth" data-password-form><input name="password" type="password" minlength="8" required placeholder="New password · 8+ characters"><div class="mp-acct-actions"><button class="mp-acct-button" type="submit">Update password</button></div><div data-password-status></div></form>';
  var emailForm=host.querySelector('[data-email-form]'),emailOut=host.querySelector('[data-email-status]');
  emailForm.addEventListener('submit',async function(event){
    event.preventDefault();
    var newEmail=String(new FormData(emailForm).get('email')||'').trim();
    emailOut.innerHTML=statusHtml('Saving…');
    try{
      await updateUser({email:newEmail});
      emailOut.innerHTML=statusHtml('Check '+newEmail+' for a link to confirm the change. Your sign-in email stays the same until you click it.','success');
    }catch(error){emailOut.innerHTML=statusHtml(error.message,'error');}
  });
  var passwordForm=host.querySelector('[data-password-form]'),passwordOut=host.querySelector('[data-password-status]');
  passwordForm.addEventListener('submit',async function(event){
    event.preventDefault();
    var newPassword=String(new FormData(passwordForm).get('password')||'');
    passwordOut.innerHTML=statusHtml('Saving…');
    try{
      await updateUser({password:newPassword});
      passwordOut.innerHTML=statusHtml('Password updated.','success');
      passwordForm.reset();
    }catch(error){passwordOut.innerHTML=statusHtml(error.message,'error');}
  });
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
