(function(){
'use strict';

var API='https://still-resonance-4f87.swarnerauto.workers.dev';
var STORE_ID='0f9dd4bc-42a7-487e-a972-2905d24513e9';
var SUPABASE_URL='https://vroknjrxubsqyexngwus.supabase.co';
var SUPABASE_KEY='sb_publishable_wbpX2nL8l-4NbXtZNG_bjA_nabSYaJ5';
var AUTH_REDIRECT_URL='https://themanapocket.com/account';
var RECOVERY_REDIRECT_URL='https://themanapocket.com/account-profile';
// Same key preorders.js uses -- signing in on either page signs in on both.
var SESSION_KEY='mp-foc-session-v1';
var state={session:readJson(SESSION_KEY,null),cache:{},authRedirectType:''};

// One shared script drives every /account* page (real distinct URLs, not a
// tabbed single page) -- which section renders is decided purely by
// location.pathname. Keeps one auth/session/api implementation instead of
// duplicating it across eight files, while still giving each area its own
// bookmarkable URL like the site spec calls for.
var SECTIONS=[
  {path:'/account',key:'overview',label:'Overview',protected:true},
  {path:'/account-orders',key:'orders',label:'Orders',protected:true},
  {path:'/account-preorders',key:'preorders',label:'Comic Preorders',protected:true},
  {path:'/account-consignments',key:'consignments',label:'Consignments',protected:true},
  {path:'/account-wishlist',key:'wishlist',label:'Wishlist',protected:true},
  {path:'/account-profile',key:'profile',label:'Account Settings',protected:true},
  {path:'/login',key:'login',label:'Sign In',protected:false},
  {path:'/signup',key:'signup',label:'Create Account',protected:false},
];
function currentPath(){return(location.pathname.replace(/\/$/,'')||'/');}
function currentSection(){return SECTIONS.find(function(s){return s.path===currentPath();})||null;}

function readJson(key,fallback){try{return JSON.parse(localStorage.getItem(key)||'null')||fallback;}catch(_){return fallback;}}
function saveJson(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(_){}}
function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(ch){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
function money(amount){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(amount||0));}
// Same fix as preorders.js's dateLabel: a bare YYYY-MM-DD has no real
// instant to convert to Pacific time, and doing so anyway rolls it back a
// calendar day.
function dateLabel(value,withTime){if(!value)return'';var dateOnly=/^\d{4}-\d{2}-\d{2}$/.test(value);var d=new Date(value);return new Intl.DateTimeFormat('en-US',{timeZone:dateOnly?'UTC':'America/Los_Angeles',month:'short',day:'numeric',year:'numeric',hour:withTime?'numeric':undefined,minute:withTime?'2-digit':undefined}).format(d);}
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
function consumeAuthRedirectSession(){
  if(!location.hash||location.hash.indexOf('access_token=')===-1)return;
  var params=new URLSearchParams(location.hash.slice(1));
  var accessToken=params.get('access_token');
  if(!accessToken)return;
  state.authRedirectType=params.get('type')||'';
  var expiresIn=Number(params.get('expires_in')||3600);
  setSession({
    access_token:accessToken,
    refresh_token:params.get('refresh_token')||'',
    token_type:params.get('token_type')||'bearer',
    expires_in:expiresIn,
    expires_at:Math.floor(Date.now()/1000)+expiresIn
  });
  // Remove credentials from the visible URL and browser history immediately.
  history.replaceState(null,document.title,location.pathname+location.search);
}
async function refreshSession(){
  if(!state.session||!state.session.refresh_token)return;
  try{setSession(await auth('token?grant_type=refresh_token',{refresh_token:state.session.refresh_token}));}catch(_){setSession(null);}
}

function mount(){
  if(document.getElementById('mp-acct-app'))return;
  var section=currentSection();if(!section)return;
  document.body.classList.add('mp-page-account');
  if(!document.getElementById('navbarID')){
    var nav=document.createElement('nav');nav.className='mp-acct-nav';nav.setAttribute('aria-label','Main navigation');
    nav.innerHTML='<a class="mp-acct-brand" href="/" aria-label="The Mana Pocket home"><img src="https://cdn.prod.website-files.com/65b15ee0228d06647ca7e4ce/6a7ce98ab3d4819b7565620e_the_mana_pocket_patch_1024x1024.png" alt="The Mana Pocket"></a><div><a href="/">Home</a><a href="/shop">Shop</a><a href="/preorders">Comic Preorders</a><button type="button" data-acct-theme>My Pocket</button></div>';
    document.body.prepend(nav);
    nav.querySelector('[data-acct-theme]').addEventListener('click',function(){if(window.WO&&typeof window.WO.openTheme==='function')window.WO.openTheme();});
  }
  var app=document.createElement('main');app.id='mp-acct-app';
  var footer=document.querySelector('.footer-section,.Footer,.footer');
  if(footer)footer.parentNode.insertBefore(app,footer);else document.body.appendChild(app);

  if(section.protected&&!token()){
    location.replace('/login?next='+encodeURIComponent(currentPath()));
    return;
  }
  if(!section.protected&&token()&&(section.key==='login'||section.key==='signup')){
    location.replace(nextParam()||'/account');
    return;
  }
  if(section.key==='login')renderAuthPage(app,'signin');
  else if(section.key==='signup')renderAuthPage(app,'signup');
  else renderAccountShell(app,section);
}

function nextParam(){
  var value=new URLSearchParams(location.search).get('next');
  return value&&value.charAt(0)==='/'?value:'';
}

function statusHtml(message,kind){return message?'<div class="mp-acct-status'+(kind?' '+kind:'')+'">'+esc(message)+'</div>':'';}
function renderResend(node,message,email,kind){
  node.innerHTML=statusHtml(message,kind||'success')+'<button class="mp-acct-button ghost" type="button" data-resend>Resend confirmation email</button>';
  var button=node.querySelector('[data-resend]');
  button.addEventListener('click',function(){
    button.disabled=true;button.textContent='Sending…';
    auth('resend?redirect_to='+encodeURIComponent(AUTH_REDIRECT_URL),{type:'signup',email:email}).then(function(){
      node.innerHTML=statusHtml('If an unconfirmed account exists for this email, a new confirmation message was requested. Check your inbox and spam folder.','success');
    }).catch(function(error){renderResend(node,error.message,email,'error');});
  });
}

// One shared sign-in/sign-up page for both /login and /signup -- the mode
// just decides which form is primary and which is the secondary "or" link,
// since collectors mixing up the two URLs is the actual failure mode this
// avoids (each still fully works for either action).
function renderAuthPage(app,mode){
  var isSignup=mode==='signup';
  app.innerHTML='<div class="mp-acct-shell mp-acct-shell-narrow">'+
    '<div class="mp-acct-eyebrow">The Mana Pocket</div><h1 class="mp-acct-title">'+(isSignup?'Create Account':'Sign In')+'</h1>'+
    '<p class="mp-acct-intro">One account covers comic preorders, shop orders, rewards, and your in-store history.</p>'+
    '<form class="mp-acct-auth" data-auth-form>'+
      (isSignup?'<input name="name" autocomplete="name" placeholder="Name">':'')+
      '<input name="email" type="email" autocomplete="email" required placeholder="Email">'+
      '<input name="password" type="password" autocomplete="'+(isSignup?'new-password':'current-password')+'" minlength="8" required placeholder="Password · 8+ characters">'+
      '<div data-auth-status></div>'+
      '<button class="mp-acct-button" type="submit">'+(isSignup?'Create account':'Sign in')+'</button>'+
    '</form>'+
    '<p class="mp-acct-switch">'+(isSignup?'Already have an account? <a href="/login">Sign in</a>':'New here? <a href="/signup">Create an account</a> · <button type="button" class="mp-acct-link-button" data-forgot-password>Forgot password?</button>')+'</p>'+
  '</div>';
  var form=app.querySelector('[data-auth-form]'),out=app.querySelector('[data-auth-status]');
  form.addEventListener('submit',async function(event){
    event.preventDefault();
    var data=new FormData(form),email=String(data.get('email')||'').trim(),password=String(data.get('password')||''),name=String(data.get('name')||'').trim();
    if(!email||password.length<8){out.innerHTML=statusHtml('Enter an email and a password with at least 8 characters.','error');return;}
    out.innerHTML=statusHtml('Working…');
    try{
      var session;
      if(isSignup){
        var result=await auth('signup?redirect_to='+encodeURIComponent(AUTH_REDIRECT_URL),{email:email,password:password,data:{full_name:name}});
        if(!result.access_token){renderResend(out,'If this email is new, check your inbox to confirm it. If you already have an account, sign in instead or reset your password.',email);return;}
        session=result;
      }else session=await auth('token?grant_type=password',{email:email,password:password});
      setSession(session);
      location.href=nextParam()||'/account';
    }catch(error){
      if(/confirm/i.test(error.message))renderResend(out,error.message,email,'error');
      else out.innerHTML=statusHtml(error.message,'error');
    }
  });
  var forgot=app.querySelector('[data-forgot-password]');
  if(forgot)forgot.addEventListener('click',function(){renderPasswordRecovery(app);});
}

function renderPasswordRecovery(app){
  app.innerHTML='<div class="mp-acct-shell mp-acct-shell-narrow"><div class="mp-acct-eyebrow">The Mana Pocket</div><h1 class="mp-acct-title">Reset Password</h1><p class="mp-acct-intro">Enter the email on your account. We will send a secure reset link.</p><form class="mp-acct-auth" data-recovery-form><input name="email" type="email" autocomplete="email" required placeholder="Email"><div data-recovery-status></div><button class="mp-acct-button" type="submit">Send reset link</button></form><p class="mp-acct-switch"><a href="/login">Back to sign in</a></p></div>';
  var form=app.querySelector('[data-recovery-form]'),out=app.querySelector('[data-recovery-status]');
  form.addEventListener('submit',async function(event){
    event.preventDefault();var email=String(new FormData(form).get('email')||'').trim();
    if(!email){out.innerHTML=statusHtml('Enter your account email.','error');return;}
    out.innerHTML=statusHtml('Sending…');
    try{await auth('recover?redirect_to='+encodeURIComponent(RECOVERY_REDIRECT_URL),{email:email});out.innerHTML=statusHtml('If an account exists for that email, the reset link is on its way. Check spam too.','success');}
    catch(error){out.innerHTML=statusHtml(error.message,'error');}
  });
}

function renderAccountShell(app,section){
  app.innerHTML='<div class="mp-acct-shell">'+
    '<div class="mp-acct-eyebrow">The Mana Pocket</div><h1 class="mp-acct-title">My Pocket</h1>'+
    '<nav class="mp-acct-tabs" role="navigation" aria-label="Account sections">'+SECTIONS.filter(function(s){return s.protected;}).map(function(s){return'<a href="'+s.path+'" class="'+(s.key===section.key?'active':'')+'">'+esc(s.label)+'</a>';}).join('')+'</nav>'+
    '<div id="mp-acct-panel" class="mp-acct-panel"><div class="mp-acct-loading">Loading…</div></div>'+
    '<div class="mp-acct-actions mp-acct-signout"><button class="mp-acct-button ghost" type="button" data-sign-out>Sign out</button></div>'+
  '</div>';
  app.querySelector('[data-sign-out]').addEventListener('click',function(){setSession(null);location.href='/login';});
  loadSection(section.key);
}

function panel(){return document.getElementById('mp-acct-panel');}

function loadSection(key){
  if(key==='overview')return loadOverview();
  if(key==='orders')return loadOrders();
  if(key==='preorders')return loadPreorders();
  if(key==='consignments')return loadConsignments();
  if(key==='wishlist')return loadWishlist();
  if(key==='profile')return renderProfile();
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
      '<div class="mp-acct-note">Linked to '+esc(c.phone||'')+' — rewards, consignments, want list, and in-store purchases on that phone number show up automatically.</div>'
      :'<div class="mp-acct-note warn">Your phone number is not linked yet, so in-store purchases, consignments, want list, and trade credit will not show here. <a class="mp-acct-button ghost" href="/account-profile">Link my phone</a></div>');
  }catch(error){host.innerHTML=statusHtml(error.message,'error');}
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
    (order.items&&order.items.length?'<div class="mp-acct-items">'+order.items.map(function(item){return'<div class="mp-acct-item-line">'+(item.image_url?'<img src="'+esc(item.image_url)+'" alt="">':'<span class="mp-acct-item-noimg"></span>')+'<div class="mp-acct-item-info"><span>'+esc(item.title)+' ×'+Number(item.quantity||1)+'</span><span>'+money(item.unit_price)+' each</span></div></div>';}).join('')+'</div>':'')+
  '</article>';
}

async function loadPreorders(){
  var host=panel();host.innerHTML='<div class="mp-acct-loading">Loading your comic preorders…</div>';
  try{
    var result=state.cache.preorders||await api('/public/preorders/my?store_id='+encodeURIComponent(STORE_ID));
    state.cache.preorders=result;
    var orders=result.orders||[],picks=(result.picks||[]).filter(function(list){return(list.items||[]).length;});
    var saved=picks.length?'<h2 class="mp-acct-subhead">Saved comic pulls</h2><p class="mp-acct-intro">These are saved, but not purchased yet. Add more or pay before the listed FOC deadline.</p>'+picks.map(pickListCardHtml).join(''):'';
    var purchased=orders.length?'<h2 class="mp-acct-subhead">Purchased preorders</h2>'+orders.map(preorderCardHtml).join(''):'<div class="mp-acct-empty">No paid comic preorders yet. <a class="mp-acct-link" href="/preorders">Browse this week’s FOC covers</a>.</div>';
    host.innerHTML=saved+purchased;
    host.addEventListener('click',handlePreorderAction);
  }catch(error){host.innerHTML=statusHtml(error.message,'error');}
}
function pickListCardHtml(list){
  var cycle=list.cycle||{},items=list.items||[],total=items.reduce(function(sum,item){return sum+Number(item.quantity||0)*Number(item.sku&&item.sku.customer_price_cents||0);},0);
  return '<article class="mp-acct-order mp-acct-saved-pulls"><header><div><h3>'+items.reduce(function(n,item){return n+Number(item.quantity||0);},0)+' saved pull'+(items.length===1?'':'s')+'</h3><span class="mp-acct-sub">FOC '+esc(dateLabel(cycle.foc_date))+' · '+(list.isOpen?'payment still needed':'deadline closed')+'</span></div><span class="mp-acct-status-pill">unpaid</span></header>'+items.map(function(item){var sku=item.sku||{};return'<div class="mp-acct-item-line">'+(sku.cover_image_url?'<img src="'+esc(sku.cover_image_url)+'" alt="">':'<span class="mp-acct-item-noimg"></span>')+'<div class="mp-acct-item-info"><span>'+esc(sku.title||'')+(sku.variant_label?' · '+esc(sku.variant_label):'')+' ×'+Number(item.quantity||1)+'</span><span>'+money(Number(sku.customer_price_cents||0)/100)+' each</span></div></div>';}).join('')+'<div class="mp-acct-row"><span>Current subtotal</span><strong>'+money(total/100)+'</strong></div><div class="mp-acct-actions"><a class="mp-acct-button" href="/preorders?cart=1#foc-week-'+esc(cycle.id||'')+'">'+(list.isOpen?'Edit, remove or pay':'View pulls')+'</a></div></article>';
}
function preorderCardHtml(order){
  var status=String(order.status||'');
  var payable=(status==='payment_pending'||status==='payment_failed')&&order.canCancel;
  var cancelLabel=(status==='payment_pending'||status==='payment_failed')?'Cancel order':'Cancel & refund';
  var actions=(payable?'<button class="mp-acct-button" type="button" data-preorder-pay="'+esc(order.id)+'">Pay now</button>':'')+(order.canCancel?'<button class="mp-acct-button ghost danger" type="button" data-preorder-cancel="'+esc(order.id)+'" data-cancel-label="'+esc(cancelLabel)+'">'+esc(cancelLabel)+'</button>':'');
  return '<article class="mp-acct-order"><header><div><h3>'+esc(order.order_number)+'</h3><span class="mp-acct-sub">ordered '+esc(dateLabel(order.created_at,true))+'</span></div><span class="mp-acct-status-pill">'+esc(String(order.status||'').replace(/_/g,' '))+'</span></header>'+
    '<div class="mp-acct-row"><span>Total</span><strong>'+money(Number(order.total_cents||0)/100)+'</strong></div>'+
    (order.items&&order.items.length?'<div class="mp-acct-items">'+order.items.map(function(item){var sku=item.sku||{};return'<div class="mp-acct-item-line">'+(sku.cover_image_url?'<img src="'+esc(sku.cover_image_url)+'" alt="">':'<span class="mp-acct-item-noimg"></span>')+'<div class="mp-acct-item-info"><span>'+esc(sku.title||'')+(sku.variant_label?' · '+esc(sku.variant_label):'')+' ×'+Number(item.quantity||1)+'</span><span>'+money(Number(item.unit_price_cents||0)/100)+' each</span></div></div>';}).join('')+'</div>':'')+
    (actions?'<div class="mp-acct-actions mp-acct-order-actions">'+actions+'<span class="mp-acct-action-status" aria-live="polite"></span></div>':'')+
  '</article>';
}

async function handlePreorderAction(event){
  var pay=event.target.closest('[data-preorder-pay]'),cancel=event.target.closest('[data-preorder-cancel]');
  if(!pay&&!cancel)return;
  var button=pay||cancel,card=button.closest('.mp-acct-order'),out=card.querySelector('.mp-acct-action-status'),orderId=button.getAttribute(pay?'data-preorder-pay':'data-preorder-cancel');
  if(cancel&&!window.confirm('Cancel this preorder'+(button.dataset.cancelLabel==='Cancel & refund'?' and refund its payment':'')+'? This cannot be undone.'))return;
  button.disabled=true;out.textContent=pay?'Opening secure payment…':'Cancelling…';out.classList.remove('error');
  try{
    if(pay){
      var payment=await api('/public/preorders/resume',{method:'POST',body:JSON.stringify({orderId:orderId})});
      if(!window.MPSFC||typeof window.MPSFC.openExistingPreorderPayment!=='function')throw new Error('The secure payment form is still loading. Please try again in a moment.');
      window.MPSFC.openExistingPreorderPayment(payment,function(){state.cache.preorders=null;loadPreorders();});
      out.textContent='';button.disabled=false;
    }else{
      var result=await api('/public/preorders/cancel',{method:'POST',body:JSON.stringify({orderId:orderId})});
      out.textContent=result.status==='refunded'?'Refund issued.':'Order cancelled.';state.cache.preorders=null;window.setTimeout(loadPreorders,700);
    }
  }catch(error){out.textContent=error.message;out.classList.add('error');button.disabled=false;}
}

async function loadConsignments(){
  var host=panel();host.innerHTML='<div class="mp-acct-loading">Loading your consignments…</div>';
  try{
    var result=state.cache.consignments||await api('/public/account/consignments?store_id='+encodeURIComponent(STORE_ID));
    state.cache.consignments=result;
    if(!result.linked){host.innerHTML='<div class="mp-acct-note warn">We could not match a consignor record to your account yet. If you consign items with us, <a href="/account-profile">link your phone number</a> or contact the store to confirm the email/phone on file matches your account.</div>';return;}
    var items=result.items||[];
    host.innerHTML=(result.consignor?'<div class="mp-acct-note">Consigning as '+esc(result.consignor.name)+' · store keeps '+Number(result.consignor.storeSplitPercent||0)+'% on sale.</div>':'')+
    (items.length?items.map(consignmentRowHtml).join(''):'<div class="mp-acct-empty">No consigned items on file yet.</div>');
  }catch(error){host.innerHTML=statusHtml(error.message,'error');}
}
function consignmentRowHtml(item){
  return '<article class="mp-acct-order"><header><div><h3>'+esc(item.item_name)+'</h3><span class="mp-acct-sub">'+esc(item.inventory_sku||'')+' · added '+esc(dateLabel(item.added_at))+'</span></div><span class="mp-acct-status-pill">'+esc(String(item.status||'').replace(/_/g,' '))+'</span></header>'+
    '<div class="mp-acct-row"><span>List price</span><strong>'+money(item.list_price)+'</strong></div>'+
    (item.status==='sold'?'<div class="mp-acct-row"><span>Sold for</span><strong>'+money(item.sale_price)+'</strong></div><div class="mp-acct-row"><span>Payout</span><strong>'+(item.paid_out?'Paid '+esc(dateLabel(item.paid_out_at)):'Pending')+'</strong></div>':'')+
  '</article>';
}

async function loadWishlist(){
  var host=panel();host.innerHTML='<div class="mp-acct-loading">Loading your want list…</div>';
  try{
    var result=state.cache.wishlist||await api('/public/account/wishlist?store_id='+encodeURIComponent(STORE_ID));
    state.cache.wishlist=result;
    var items=result.items||[];
    host.innerHTML=items.length?'<p class="mp-acct-intro">Items you have asked the store to keep an eye out for. Call or stop by to add more — self-service adding is coming soon.</p>'+items.map(wishlistRowHtml).join(''):'<div class="mp-acct-empty">Nothing on your want list yet. Ask the store to add a card, comic, or set you are hunting for.</div>';
  }catch(error){host.innerHTML=statusHtml(error.message,'error');}
}
function wishlistRowHtml(item){
  return '<article class="mp-acct-order"><header><div><h3>'+esc(item.item)+'</h3>'+(item.notes?'<span class="mp-acct-sub">'+esc(item.notes)+'</span>':'')+'</div><span class="mp-acct-status-pill">'+esc(item.status||'active')+'</span></header>'+
    (item.maxprice?'<div class="mp-acct-row"><span>Up to</span><strong>'+money(item.maxprice)+'</strong></div>':'')+
  '</article>';
}

function renderProfile(){
  var host=panel();
  var email=state.session&&state.session.user&&state.session.user.email||'';
  var linkedPhone=state.cache.summary&&state.cache.summary.customer&&state.cache.summary.customer.phone;
  host.innerHTML='<h3 class="mp-acct-subhead">Site theme</h3>'+
    '<p class="mp-acct-intro">Pick a team, Pokémon, or MTG theme for the whole site.</p>'+
    '<div class="mp-acct-actions"><button class="mp-acct-button ghost" type="button" data-open-theme>Change theme</button></div>'+
    '<h3 class="mp-acct-subhead">Change email</h3>'+
    '<form class="mp-acct-auth" data-email-form><input name="email" type="email" autocomplete="email" required placeholder="New email" value="'+esc(email)+'"><div class="mp-acct-actions"><button class="mp-acct-button" type="submit">Update email</button></div><div data-email-status></div></form>'+
    '<h3 class="mp-acct-subhead">Change password</h3>'+
    '<form class="mp-acct-auth" data-password-form><input name="password" type="password" autocomplete="new-password" minlength="8" required placeholder="New password · 8+ characters"><div class="mp-acct-actions"><button class="mp-acct-button" type="submit">Update password</button></div><div data-password-status></div></form>'+
    '<h3 class="mp-acct-subhead">Link my phone</h3>'+
    '<p class="mp-acct-intro">Connects the rewards and store credit a cashier attaches to your phone number at the register to this account, and unlocks your in-store history, consignments, and want list here.</p>'+
    (linkedPhone?'<div class="mp-acct-note">Currently linked to '+esc(linkedPhone)+'. Verifying a new number below moves the link to that number instead.</div>':'')+
    '<form class="mp-acct-auth" data-phone-form><input name="phone" type="tel" autocomplete="tel" required placeholder="Phone number"><p class="mp-acct-fineprint">By continuing, you agree to receive a one-time SMS/text message with your verification code from The Mana Pocket. Msg &amp; data rates may apply. Reply STOP to cancel, HELP for help. See our <a href="https://themanapocket.com/privacy-policy" target="_blank">Privacy Policy</a> and <a href="https://themanapocket.com/terms-and-conditions" target="_blank">Terms</a>.</p><div class="mp-acct-actions"><button class="mp-acct-button" type="submit">Send code</button></div><div data-phone-status></div></form>'+
    '<form class="mp-acct-auth" data-code-form hidden><input name="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" required placeholder="6-digit code"><div class="mp-acct-actions"><button class="mp-acct-button" type="submit">Confirm</button></div><div data-code-status></div></form>';

  var themeButton=host.querySelector('[data-open-theme]');
  if(themeButton)themeButton.addEventListener('click',function(){if(window.WO&&typeof window.WO.openTheme==='function')window.WO.openTheme();});

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
      state.cache={summary:summary};
      codeOut.innerHTML=statusHtml('Phone linked! Your rewards, in-store history, consignments, and want list are now connected.','success');
    }catch(error){codeOut.innerHTML=statusHtml(error.message,'error');}
  });
}

consumeAuthRedirectSession();
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
