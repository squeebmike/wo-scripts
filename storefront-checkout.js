(function(){
'use strict';
var API='https://still-resonance-4f87.swarnerauto.workers.dev';
var STORE_ID='0f9dd4bc-42a7-487e-a972-2905d24513e9';
var CART_KEY='wo_cart_v1';
var DRAFT_KEY='wo_checkout_draft_v1';
var quote={cents:null,loading:false,error:'',label:''};
var quoteTimer=0;
var paymentRuntime=null;
var mousedownTarget=null;
// 'regular' (the normal in-stock cart) or 'preorder' (one FOC cycle's
// comic lines) -- the exact same mp-sfc-panel modal renders either way,
// this just decides which fields/copy/backend route it uses. preorderCtx
// carries the one FOC-cycle group currently checking out, plus its own
// picked-rate state (comic preorders always require an explicit chosen
// carrier rate, unlike the regular cart's single auto-computed fee).
var mode='regular';
var preorderCtx=null;

function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(char){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char];});}
function money(cents){return'$'+(Number(cents||0)/100).toFixed(2);}
function cart(){try{var value=JSON.parse(localStorage.getItem(CART_KEY)||'[]');return Array.isArray(value)?value:[];}catch(error){return[];}}
// The cart is shared with the comic-preorder flow (preorders.js writes
// kind:'preorder' lines into this same wo_cart_v1 key via window.WO, so
// there's one cart instead of two) -- this checkout only ever concerns
// itself with regular in-stock lines. Preorder lines get their own
// dedicated checkout (different backend route, per-FOC-cycle Stripe
// charges, request-only pricing) via beginPreorderCheckout below.
function regularLines(){return cart().filter(function(line){return line.kind!=='preorder';});}
function preorderLines(){return cart().filter(function(line){return line.kind==='preorder';});}
function items(){return regularLines().map(function(line){return{itemId:String(line.id||''),quantity:Math.max(1,parseInt(line.qty,10)||1)};}).filter(function(line){return line.itemId;});}
function subtotal(){return regularLines().reduce(function(total,line){return total+Math.round(Number(line.price||0)*100)*Math.max(1,parseInt(line.qty,10)||1);},0);}
function addStyles(){
  if(document.getElementById('mp-storefront-checkout-css'))return;
  var style=document.createElement('style');style.id='mp-storefront-checkout-css';style.textContent='\
#mp-storefront-checkout{position:fixed;inset:0;z-index:2147483000;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(0,0,0,.72);backdrop-filter:blur(5px)}\
#mp-storefront-checkout.is-open{display:flex}.mp-sfc-panel{width:min(620px,100%);max-height:92dvh;overflow:auto;box-sizing:border-box;padding:clamp(20px,4vw,34px);border:2px solid var(--wo-border,var(--wo-accent,#8bd450));border-radius:22px;background:var(--wo-surface,#20152d);color:var(--wo-text,#fff);box-shadow:0 28px 90px rgba(0,0,0,.55)}\
.mp-sfc-head{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:18px}.mp-sfc-head h2{margin:0;font-size:clamp(26px,5vw,38px);line-height:1}.mp-sfc-kicker{margin:0 0 8px;color:var(--wo-accent,#8bd450);font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}.mp-sfc-close{width:48px;height:48px;flex:0 0 48px;border:1px solid currentColor;border-radius:50%;background:transparent;color:inherit;font-size:32px;line-height:1;cursor:pointer}\
.mp-sfc-options{display:grid;gap:10px;margin-bottom:18px}.mp-sfc-option{display:block;padding:14px 16px;border:2px solid rgba(255,255,255,.2);border-radius:13px;cursor:pointer}.mp-sfc-option.selected{border-color:var(--wo-accent,#8bd450);background:rgba(139,212,80,.11)}.mp-sfc-option input{margin-right:9px}.mp-sfc-option strong{font-size:16px}.mp-sfc-option span{display:block;margin:5px 0 0 26px;opacity:.76;font-size:13px;line-height:1.4}\
.mp-sfc-grid{display:grid;grid-template-columns:1fr 1fr;gap:11px}.mp-sfc-field{display:grid;gap:6px}.mp-sfc-field.full{grid-column:1/-1}.mp-sfc-field label{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.mp-sfc-field input{width:100%;box-sizing:border-box;padding:13px 14px;border:1px solid rgba(255,255,255,.25);border-radius:10px;background:var(--wo-surface-alt,#130d1c);color:var(--wo-text,#fff);font:inherit}.mp-sfc-field input:focus{outline:3px solid rgba(139,212,80,.35);border-color:var(--wo-accent,#8bd450)}\
.mp-sfc-summary{margin:17px 0;padding:14px;border:1px solid rgba(255,255,255,.2);border-radius:12px}.mp-sfc-row{display:flex;justify-content:space-between;gap:16px;margin:6px 0}.mp-sfc-row.total{padding-top:10px;border-top:1px dashed rgba(255,255,255,.28);font-size:18px;font-weight:900}.mp-sfc-status{min-height:22px;margin:10px 0;font-size:14px;line-height:1.45}.mp-sfc-status.error{color:#ff8da1}.mp-sfc-button{width:100%;padding:15px 18px;border:0;border-radius:999px;background:var(--wo-accent,#8bd450);color:var(--wo-button-text,#111);font:800 15px/1 inherit;cursor:pointer}.mp-sfc-button:disabled{cursor:wait;opacity:.58}.mp-sfc-note{margin:12px 0 0;text-align:center;font-size:12px;opacity:.7}.mp-sfc-success{text-align:center;padding:24px 0}.mp-sfc-success b{display:block;margin:12px 0;font-size:22px}.mp-sfc-confirm{font:900 18px/1.2 monospace;letter-spacing:.08em}\
@media(max-width:560px){#mp-storefront-checkout{padding:0;align-items:flex-end}.mp-sfc-panel{width:100%;max-height:94dvh;border-radius:22px 22px 0 0;padding:20px 16px 24px}.mp-sfc-grid{grid-template-columns:1fr}.mp-sfc-field.full{grid-column:auto}.mp-sfc-option{padding:12px}.mp-sfc-head{margin-bottom:12px}}';document.head.appendChild(style);
}
// Same panel for both a regular order and a comic preorder -- only the
// fulfillment options, the kicker/heading, and whether an email field
// makes sense differ. Everything else (fields, styling, summary, payment
// step) is one shared implementation so a preorder never feels like a
// second, worse checkout.
function panel(){
  var preorder=mode==='preorder';
  var kicker=preorder?'Comic preorder · secure checkout':'Secure checkout';
  var heading=preorder&&preorderCtx&&preorderCtx.total>1?'Pickup or shipping? · order '+(preorderCtx.index+1)+' of '+preorderCtx.total:'Pickup or shipping?';
  var options=preorder?[
    ['pickup','Pick up at The Mana Pocket','We will text or call once your covers are in.'],
    ['shipping','Ship it to me','Live carrier rate from your address. Expertly packed for safe arrival.'],
  ]:[
    ['pickup_fedway','Pickup at Federal Way Commons','We will text or call to arrange the pickup time.'],
    ['pickup_kitsap','Local meetup in Kitsap County','We will coordinate a convenient meeting place and time.'],
    ['shipping','Ship it to me','Live carrier rate from your address. Expertly packed for safe arrival.'],
  ];
  var optionsHtml=options.map(function(opt,i){return'<label class="mp-sfc-option'+(i===0?' selected':'')+'"><input type="radio" name="mp-fulfillment" value="'+opt[0]+'"'+(i===0?' checked':'')+'><strong>'+opt[1]+'</strong><span>'+opt[2]+'</span></label>';}).join('');
  return'<div class="mp-sfc-panel" role="dialog" aria-modal="true" aria-labelledby="mp-sfc-title"><div class="mp-sfc-head"><div><p class="mp-sfc-kicker">'+kicker+'</p><h2 id="mp-sfc-title">'+heading+'</h2></div><button class="mp-sfc-close" type="button" data-close aria-label="Close checkout">&times;</button></div><div id="mp-sfc-content"><form data-sfc-form autocomplete="on"><div class="mp-sfc-options" data-method-options>'+optionsHtml+'</div><div class="mp-sfc-grid"><div class="mp-sfc-field"><label for="mp-sfc-name">Full name</label><input id="mp-sfc-name" name="name" autocomplete="name"></div><div class="mp-sfc-field"><label for="mp-sfc-phone">Phone</label><input id="mp-sfc-phone" name="phone" type="tel" autocomplete="tel"></div>'+(preorder?'':'<div class="mp-sfc-field full"><label for="mp-sfc-email">Email (optional)</label><input id="mp-sfc-email" name="email" type="email" autocomplete="email"></div>')+'</div><label style="display:flex;align-items:flex-start;gap:8px;font-size:12px;opacity:.85;margin:2px 0 0;"><input id="mp-sfc-sms-consent" name="smsConsent" type="checkbox" style="margin-top:3px;"> Optional: I agree to receive order, pickup, shipping, and customer-care SMS/text messages from The Mana Pocket at the number provided. Message frequency varies based on order activity. Msg &amp; data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of purchase. See our <a href="https://themanapocket.com/privacy-policy" target="_blank" style="color:inherit;">Privacy Policy</a> and <a href="https://themanapocket.com/terms-and-conditions" target="_blank" style="color:inherit;">Terms</a>.</label><div id="mp-sfc-address" class="mp-sfc-grid" hidden style="margin-top:11px"><div class="mp-sfc-field full"><label for="mp-sfc-line1">Street address</label><input id="mp-sfc-line1" name="address-line1" autocomplete="shipping address-line1"></div><div class="mp-sfc-field full"><label for="mp-sfc-line2">Apartment / suite (optional)</label><input id="mp-sfc-line2" name="address-line2" autocomplete="shipping address-line2"></div><div class="mp-sfc-field"><label for="mp-sfc-city">City</label><input id="mp-sfc-city" name="address-level2" autocomplete="shipping address-level2"></div><div class="mp-sfc-field"><label for="mp-sfc-state">State</label><input id="mp-sfc-state" name="address-level1" maxlength="2" autocomplete="shipping address-level1" placeholder="WA"></div><div class="mp-sfc-field"><label for="mp-sfc-zip">ZIP</label><input id="mp-sfc-zip" name="postal-code" autocomplete="shipping postal-code" inputmode="numeric"></div>'+(preorder?'<div class="mp-sfc-field full" data-rates></div>':'')+'</div><div class="mp-sfc-summary" data-summary></div><div class="mp-sfc-status" data-status aria-live="polite"></div><button class="mp-sfc-button" type="submit" data-continue>Continue to secure payment</button><p class="mp-sfc-note">Pickup is always free. Shipping is charged only after a live carrier rate is returned.</p></form></div></div>';
}
function node(){var modal=document.getElementById('mp-storefront-checkout');if(!modal){modal=document.createElement('div');modal.id='mp-storefront-checkout';document.body.appendChild(modal);}return modal;}
function selectedMethod(){return document.querySelector('[name="mp-fulfillment"]:checked')?.value||'pickup_fedway';}
function value(id){return(document.getElementById(id)?.value||'').trim();}
function destination(){return{line1:value('mp-sfc-line1'),line2:value('mp-sfc-line2'),city:value('mp-sfc-city'),state:value('mp-sfc-state').toUpperCase(),zip:value('mp-sfc-zip')};}
function completeAddress(address){return address.line1&&address.city&&/^[A-Z]{2}$/.test(address.state)&&/^\d{5}(?:-\d{4})?$/.test(address.zip);}
var DRAFT_FIELDS=['mp-sfc-name','mp-sfc-phone','mp-sfc-email','mp-sfc-line1','mp-sfc-line2','mp-sfc-city','mp-sfc-state','mp-sfc-zip'];
function saveDraft(){
  // Comic preorders never save/restore a draft -- it's a one-off form
  // (preorders.js re-collects sign-in each time anyway), and persisting
  // it here would leak a preorder's address into the next regular-order
  // draft restore, or vice versa, since both would share DRAFT_KEY.
  if(mode==='preorder')return;
  var modal=node();if(!modal.classList.contains('is-open'))return;
  var draft={method:selectedMethod(),consent:!!document.getElementById('mp-sfc-sms-consent')?.checked};
  DRAFT_FIELDS.forEach(function(id){draft[id]=value(id);});
  try{localStorage.setItem(DRAFT_KEY,JSON.stringify(draft));}catch(error){}
}
function restoreDraft(){
  var raw;try{raw=JSON.parse(localStorage.getItem(DRAFT_KEY)||'null');}catch(error){raw=null;}
  if(!raw)return;
  DRAFT_FIELDS.forEach(function(id){var field=document.getElementById(id);if(field&&raw[id])field.value=raw[id];});
  if(raw.method){var radio=document.querySelector('[name="mp-fulfillment"][value="'+raw.method+'"]');if(radio)radio.checked=true;}
  var consentBox=document.getElementById('mp-sfc-sms-consent');if(consentBox)consentBox.checked=!!raw.consent;
}
function clearDraft(){try{localStorage.removeItem(DRAFT_KEY);}catch(error){}}
function setStatus(message,error){var out=node().querySelector('[data-status]');if(!out)return;out.textContent=message||'';out.classList.toggle('error',!!error);}
// A regular order always has exactly one shipping fee (auto-quoted from
// the address); a comic preorder shows a list of live carrier rates and
// needs one explicitly picked (the price is locked server-side against
// that exact rate ID, since the books may not ship for weeks). This is
// the one place those two facts get resolved into a single {cents,label,
// loading,known} shape so renderSummary/the continue button don't need
// to know which mode they're in.
function currentFee(){
  if(selectedMethod()!=='shipping')return{cents:0,label:'',loading:false,known:true,pickupFree:true};
  if(mode==='preorder'){
    var chosen=preorderCtx&&preorderCtx.rates.find(function(r){return r.rateId===preorderCtx.selectedRateId;});
    return{cents:chosen?chosen.amountCents:0,label:chosen?[chosen.carrier,chosen.service].filter(Boolean).join(' '):'',loading:!!(preorderCtx&&preorderCtx.ratesLoading),known:!!chosen,pickupFree:false};
  }
  return{cents:quote.cents||0,label:quote.label,loading:quote.loading,known:quote.cents!=null,pickupFree:false};
}
function renderSummary(){
  var preorder=mode==='preorder';
  var itemsSubtotal=preorder&&preorderCtx?preorderCtx.group.lines.reduce(function(s,l){return s+Math.round(Number(l.price||0)*100)*Math.max(1,Number(l.qty||1));},0):subtotal();
  var fee=currentFee();
  var summary=node().querySelector('[data-summary]');if(!summary)return;
  summary.innerHTML='<div class="mp-sfc-row"><span>'+(preorder?'Books subtotal':'Items subtotal')+'</span><strong>'+money(itemsSubtotal)+'</strong></div>'+
    (fee.pickupFree?'<div class="mp-sfc-row"><span>Local pickup</span><strong>FREE</strong></div>':
      '<div class="mp-sfc-row"><span>'+(fee.loading?'Checking live rate'+(preorder?'s':'')+'…':fee.known?'Shipping'+(fee.label?' ('+esc(fee.label)+')':''):preorder?'Choose a rate below':'Shipping after address')+'</span><strong>'+(fee.known?money(fee.cents):'—')+'</strong></div>')+
    '<div class="mp-sfc-row total"><span>'+(!fee.pickupFree&&!fee.known?'Subtotal':'Total')+'</span><strong>'+money(itemsSubtotal+(fee.known?fee.cents:0))+'</strong></div>';
  var button=node().querySelector('[data-continue]');
  if(button){
    button.disabled=!fee.pickupFree&&(fee.loading||!fee.known);
    button.textContent=fee.loading?'Getting live shipping rate'+(preorder?'s':'')+'…':(!fee.pickupFree&&!fee.known)?(preorder?'Choose a shipping rate below':'Enter address for live rate'):'Continue to secure payment';
  }
}
function renderRates(){
  var host=node().querySelector('[data-rates]');if(!host)return;
  if(!preorderCtx||(!preorderCtx.rates.length&&!preorderCtx.ratesLoading&&!preorderCtx.ratesError)){host.innerHTML='';return;}
  if(preorderCtx.ratesLoading){host.innerHTML='<p class="mp-sfc-note">Checking current carrier rates…</p>';return;}
  if(preorderCtx.ratesError){host.innerHTML='<p class="mp-sfc-status error">'+esc(preorderCtx.ratesError)+'</p>';return;}
  host.innerHTML='<div class="mp-sfc-options">'+preorderCtx.rates.map(function(rate){return'<label class="mp-sfc-option'+(rate.rateId===preorderCtx.selectedRateId?' selected':'')+'"><input type="radio" name="mp-preorder-rate" value="'+esc(rate.rateId)+'"'+(rate.rateId===preorderCtx.selectedRateId?' checked':'')+'><strong>'+esc(rate.carrier+' '+rate.service)+' · '+money(rate.amountCents)+'</strong>'+(rate.estimatedDays?'<span>About '+rate.estimatedDays+' days</span>':'')+'</label>';}).join('')+'</div>';
  host.querySelectorAll('[name="mp-preorder-rate"]').forEach(function(input){input.addEventListener('change',function(){preorderCtx.selectedRateId=input.value;renderRates();renderSummary();});});
}
function methodChanged(){
  node().querySelectorAll('[data-method-options] .mp-sfc-option').forEach(function(label){label.classList.toggle('selected',label.querySelector('input').checked);});
  var shipping=selectedMethod()==='shipping';
  document.getElementById('mp-sfc-address').hidden=!shipping;
  quote={cents:null,loading:false,error:'',label:''};
  if(preorderCtx){preorderCtx.rates=[];preorderCtx.selectedRateId=null;preorderCtx.ratesLoading=false;preorderCtx.ratesError='';}
  setStatus('');renderRates();renderSummary();
  if(shipping)scheduleQuote();
}
function scheduleQuote(){clearTimeout(quoteTimer);var address=destination();if(!completeAddress(address)){quote={cents:null,loading:false,error:'',label:''};if(preorderCtx){preorderCtx.rates=[];preorderCtx.selectedRateId=null;preorderCtx.ratesLoading=false;preorderCtx.ratesError='';renderRates();}renderSummary();return;}quoteTimer=setTimeout(mode==='preorder'?fetchPreorderRates:fetchQuote,550);}
async function api(path,options){var response=await fetch(API+path,options);var data=await response.json().catch(function(){return{};});if(!response.ok||!data.ok)throw new Error(data.error||'Checkout service is unavailable. Please try again.');return data;}
async function fetchQuote(){var address=destination();if(selectedMethod()!=='shipping'||!completeAddress(address))return;quote={cents:null,loading:true,error:'',label:''};renderSummary();setStatus('Checking current carrier rates…');try{var data=await api('/public/storefront/shipping-quote',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({storeId:STORE_ID,items:items(),destination:address})});quote={cents:data.shippingFeeCents,loading:false,error:'',label:[data.carrier,data.serviceName].filter(Boolean).join(' ')};setStatus(data.estimatedDays?'Estimated transit: about '+data.estimatedDays+' days.':'Live carrier rate confirmed.');}catch(error){quote={cents:null,loading:false,error:error.message,label:''};setStatus(error.message+' You can still choose either local pickup option.',true);}renderSummary();}
// Comics get a rate LIST (not one auto-picked fee) because the price has
// to be locked in against one specific carrier rate ID at checkout time --
// the order may not ship for weeks, so quoting one number now and hoping
// it still holds later isn't good enough the way it is for a same-day
// regular order.
async function fetchPreorderRates(){
  var address=destination();
  if(mode!=='preorder'||!preorderCtx||selectedMethod()!=='shipping'||!completeAddress(address))return;
  preorderCtx.ratesLoading=true;preorderCtx.ratesError='';renderRates();renderSummary();setStatus('Checking current carrier rates…');
  try{
    var data=await api('/public/shipping/quotes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({storeId:STORE_ID,quantity:preorderCtx.group.lines.reduce(function(n,l){return n+Number(l.qty||1);},0),address:{name:value('mp-sfc-name'),phone:value('mp-sfc-phone'),line1:address.line1,line2:address.line2,city:address.city,state:address.state,zip:address.zip}})});
    preorderCtx.rates=data.rates||[];
    preorderCtx.selectedRateId=preorderCtx.rates[0]?preorderCtx.rates[0].rateId:null;
    setStatus('');
  }catch(error){
    preorderCtx.rates=[];preorderCtx.selectedRateId=null;preorderCtx.ratesError=error.message;
    setStatus(error.message+' You can still choose pickup.',true);
  }
  preorderCtx.ratesLoading=false;
  renderRates();renderSummary();
}
function bind(modal){
  modal.addEventListener('mousedown',function(event){mousedownTarget=event.target;});
  modal.addEventListener('click',function(event){
    if(event.target.closest('[data-close]')){close();return;}
    // Only treat this as a click-outside-to-close if the drag *started* on
    // the backdrop too -- otherwise selecting/highlighting text inside the
    // form and dragging the mouse past the panel edge before releasing was
    // silently closing the modal and losing everything typed so far.
    if(event.target===modal&&mousedownTarget===modal)close();
  });
  modal.querySelectorAll('[name="mp-fulfillment"]').forEach(function(input){input.addEventListener('change',function(){methodChanged();saveDraft();});});
  ['mp-sfc-line1','mp-sfc-line2','mp-sfc-city','mp-sfc-state','mp-sfc-zip'].forEach(function(id){var field=modal.querySelector('#'+id);field.addEventListener('input',scheduleQuote);field.addEventListener('change',scheduleQuote);});
  DRAFT_FIELDS.concat(['mp-sfc-sms-consent']).forEach(function(id){var field=modal.querySelector('#'+id);if(field)field.addEventListener('input',saveDraft);});
  modal.querySelector('[data-sfc-form]').addEventListener('submit',function(event){event.preventDefault();checkout();});
}
// A comic-preorder-only cart skips straight to preorders.js's sign-in gate
// (beginPreorderCheckout), which then opens this same modal in preorder
// mode once signed in. A mixed cart opens this modal for its regular
// items first; the leftover preorder lines stay in the cart afterward for
// the customer to check out separately (a single chained payment flow
// risked surprising someone with a second unexpected charge screen right
// after they just paid for one).
function open(){
  var regular=regularLines(),preorder=preorderLines();
  if(!regular.length&&!preorder.length)return;
  if(!regular.length){beginPreorderCheckout(preorder);return;}
  mode='regular';preorderCtx=null;
  var modal=node();modal.innerHTML=panel();bind(modal);restoreDraft();quote={cents:null,loading:false,error:'',label:''};paymentRuntime=null;modal.classList.add('is-open');document.body.style.overflow='hidden';methodChanged();
}
function beginPreorderCheckout(lines){
  if(!window.WO||typeof window.WO.checkoutPreorderLines!=='function'){alert('Comic preorder checkout is still loading -- give it a second and try again.');return;}
  window.WO.checkoutPreorderLines(lines,function(){});
}
// Called by preorders.js (window.MPSFC.openPreorderCheckout) once a
// customer is signed in and it's grouped their cart into one FOC cycle at
// a time -- opens the exact same panel/CSS as the regular cart, just
// carrying that group's lines and this queue position instead of the
// shared cart. onDone fires once this cycle's payment succeeds; the
// caller advances to the next cycle or finishes the queue.
function openPreorderCheckout(group,index,total,onDone){
  mode='preorder';preorderCtx={group:group,index:index,total:total,onDone:onDone,rates:[],selectedRateId:null,ratesLoading:false,ratesError:''};
  var modal=node();modal.innerHTML=panel();bind(modal);quote={cents:null,loading:false,error:'',label:''};paymentRuntime=null;modal.classList.add('is-open');document.body.style.overflow='hidden';methodChanged();
}
function close(){node().classList.remove('is-open');document.body.style.overflow='';mode='regular';preorderCtx=null;}
async function loadStripe(){if(window.Stripe)return window.Stripe;await new Promise(function(resolve,reject){var existing=document.querySelector('script[src="https://js.stripe.com/v3/"]');if(existing){existing.addEventListener('load',resolve,{once:true});existing.addEventListener('error',reject,{once:true});return;}var script=document.createElement('script');script.src='https://js.stripe.com/v3/';script.onload=resolve;script.onerror=reject;document.head.appendChild(script);});return window.Stripe;}
async function checkout(){
  var name=value('mp-sfc-name'),phone=value('mp-sfc-phone'),email=value('mp-sfc-email'),method=selectedMethod(),address=method==='shipping'?destination():null;
  if(name.length<2){setStatus('Enter the collector’s full name.',true);return;}
  if(phone.replace(/\D/g,'').length<7){setStatus('Enter a valid phone number.',true);return;}
  if(method==='shipping'&&!completeAddress(address)){setStatus('Complete the shipping address first.',true);return;}
  var preorder=mode==='preorder';
  if(preorder){
    if(method==='shipping'&&(!preorderCtx.selectedRateId||preorderCtx.ratesLoading)){setStatus(preorderCtx.ratesError||'Wait for a live shipping rate before continuing.',true);return;}
  }else if(method==='shipping'&&quote.cents==null){setStatus(quote.error||'Wait for a live shipping rate before continuing.',true);return;}
  var button=node().querySelector('[data-continue]');button.disabled=true;button.textContent='Starting secure payment…';setStatus('Verifying inventory and final total…');
  try{
    var data;
    if(preorder){
      var fulfillment={method:method==='shipping'?'shipping':'pickup',name:name,phone:phone};
      if(method==='shipping'){fulfillment.shippingRateId=preorderCtx.selectedRateId;fulfillment.shippingAddress=address;}
      var headers=Object.assign({'Content-Type':'application/json'},window.WO&&typeof window.WO.preorderAuthHeader==='function'?window.WO.preorderAuthHeader():{});
      data=await api('/public/preorders/checkout',{method:'POST',headers:headers,body:JSON.stringify({storeId:STORE_ID,cycleId:preorderCtx.group.cycleId,items:preorderCtx.group.lines.map(function(l){return{skuId:l.skuId,quantity:l.qty};}),fulfillment:fulfillment})});
    }else{
      data=await api('/public/storefront/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({storeId:STORE_ID,items:items(),fulfillment:{method:method,name:name,phone:phone,email:email,shippingAddress:address}})});
    }
    await mountPayment(data);
  }catch(error){setStatus(error.message,true);button.disabled=false;button.textContent='Try secure checkout again';}
}
async function mountPayment(data){var Stripe=await loadStripe();if(!Stripe)throw new Error('The secure payment form could not load.');var client=Stripe(data.publishableKey);var elements=client.elements({clientSecret:data.clientSecret,appearance:{theme:'night',variables:{colorPrimary:getComputedStyle(document.documentElement).getPropertyValue('--wo-accent').trim()||'#8bd450',borderRadius:'10px'}}});var content=node().querySelector('#mp-sfc-content');var shippingCents=data.shippingFeeCents||data.shippingCents;content.innerHTML='<div class="mp-sfc-summary"><div class="mp-sfc-row total"><span>Final total</span><strong>'+money(data.amountCents)+'</strong></div>'+(shippingCents?'<div class="mp-sfc-row"><span>Live shipping</span><span>'+money(shippingCents)+'</span></div>':'<div class="mp-sfc-row"><span>Local pickup</span><span>FREE</span></div>')+'</div><div id="mp-sfc-payment"></div><div class="mp-sfc-status" data-pay-status aria-live="polite"></div><button class="mp-sfc-button" type="button" data-pay>Pay '+money(data.amountCents)+'</button><p class="mp-sfc-note">Secure payment powered by Stripe.</p>';elements.create('payment',{layout:'tabs'}).mount('#mp-sfc-payment');paymentRuntime={client:client,elements:elements,confirmation:data.confirmationNumber||data.orderNumber};content.querySelector('[data-pay]').addEventListener('click',confirmPayment);}
async function confirmPayment(){
  if(!paymentRuntime)return;
  var button=node().querySelector('[data-pay]'),out=node().querySelector('[data-pay-status]');
  button.disabled=true;button.textContent='Processing payment…';out.textContent='';
  try{
    var result=await paymentRuntime.client.confirmPayment({elements:paymentRuntime.elements,redirect:'if_required'});
    if(result.error)throw new Error(result.error.message);
    if(mode==='preorder'){
      // One FOC cycle just got paid -- there may be another cycle still
      // queued (a mixed-week cart), so this doesn't reload the page or
      // clear the shared cart itself; ctx.onDone (preorders.js) removes
      // just this cycle's lines and either reopens this same panel for
      // the next cycle or, on the last one, we're done and can close.
      var ctx=preorderCtx,isLast=!ctx||ctx.index+1>=ctx.total;
      node().querySelector('#mp-sfc-content').innerHTML='<div class="mp-sfc-success"><div style="font-size:48px">✓</div><b>Order confirmed</b><p class="mp-sfc-confirm">'+esc(paymentRuntime.confirmation)+'</p><p>Save this confirmation number. We will contact you about pickup or shipping.</p><button class="mp-sfc-button" type="button" data-done>'+(isLast?'Done':'Continue to next order')+'</button></div>';
      node().querySelector('[data-done]').addEventListener('click',function(){if(isLast)close();if(ctx&&ctx.onDone)ctx.onDone();});
    }else{
      // Clear only the just-paid regular items -- the cart is shared with comic
      // preorders now, and a blanket localStorage.removeItem(CART_KEY) here
      // would wipe out any unpaid preorder lines sitting in the same cart that
      // this checkout never touched.
      var remainingPreorders=preorderLines();
      if(window.WO&&typeof window.WO.setCart==='function')window.WO.setCart(remainingPreorders);else localStorage.removeItem(CART_KEY);
      clearDraft();node().querySelector('#mp-sfc-content').innerHTML='<div class="mp-sfc-success"><div style="font-size:48px">✓</div><b>Order confirmed</b><p class="mp-sfc-confirm">'+esc(paymentRuntime.confirmation)+'</p><p>Save this confirmation number. We will contact you about pickup or shipping.</p>'+(remainingPreorders.length?'<p class="mp-sfc-note">You still have '+remainingPreorders.length+' comic preorder item'+(remainingPreorders.length===1?'':'s')+' in your cart -- open your cart again to pay for '+(remainingPreorders.length===1?'it':'those')+' separately.</p>':'')+'<button class="mp-sfc-button" type="button" data-done>Done</button></div>';
      node().querySelector('[data-done]').addEventListener('click',function(){location.reload();});
    }
  }catch(error){out.textContent=error.message;out.classList.add('error');button.disabled=false;button.textContent='Try payment again';}
}
function install(){var button=document.getElementById('wo-cart-checkout');if(!button||button.dataset.mpStorefrontCheckout)return false;button.dataset.mpStorefrontCheckout='true';button.textContent='Secure checkout →';button.onclick=function(event){event.preventDefault();event.stopPropagation();open();};return true;}
window.MPSFC=window.MPSFC||{};
window.MPSFC.openPreorderCheckout=openPreorderCheckout;
function start(){addStyles();install();new MutationObserver(install).observe(document.body,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
