(function(){
'use strict';

if((location.pathname.replace(/\/$/,'')||'/')!=='/shop')return;
var API='https://still-resonance-4f87.swarnerauto.workers.dev';
var STORE_ID='0f9dd4bc-42a7-487e-a972-2905d24513e9';

function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(ch){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
function money(cents){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(cents||0)/100);}
function dateLabel(value){if(!value)return'Release date TBA';return'Releases '+new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',month:'short',day:'numeric',year:'numeric'}).format(new Date(value+'T12:00:00-07:00'));}

function cardHtml(family,sku){
  var name=(family.seriesName||family.title)+(family.issueNumber?' #'+family.issueNumber:'');
  var request=!!sku.waitlistOnly;
  var url='/preorders?sku='+encodeURIComponent(sku.id)+(request?'&request=1':'&add=1');
  var price=request?(sku.priceCents?money(sku.priceCents)+' if secured':'Price confirmed if secured'):money(sku.priceCents);
  var badges='<span>PREORDER</span>'+(sku.isFoil?'<span>FOIL</span>':'')+(sku.isIncentive?'<span>'+esc(sku.orderRequirement||'INCENTIVE')+'</span>':'');
  return '<article class="wo-live-card mp-shop-preorder-card" data-category="comics" data-preorder-sku="'+esc(sku.id)+'">'+
    '<a class="mp-shop-preorder-image" href="'+url+'">'+(sku.coverImageUrl?'<img loading="lazy" decoding="async" src="'+esc(sku.coverImageUrl)+'" alt="'+esc(name+' '+sku.variantLabel)+'">':'<span>Cover coming soon</span>')+'</a>'+
    '<div class="mp-shop-preorder-body"><div class="mp-shop-preorder-badges">'+badges+'</div><h3>'+esc(name)+'</h3><p class="mp-shop-preorder-variant">'+esc(sku.variantLabel||'Cover A')+'</p><p class="mp-shop-preorder-artist">'+esc(sku.coverArtist?'Cover by '+sku.coverArtist:family.publisher||'Comic preorder')+'</p><p class="mp-shop-preorder-release">'+esc(dateLabel(sku.onSaleDate||family.onSaleDate))+'</p><strong class="mp-shop-preorder-price '+(request?'request':'')+'">'+price+'</strong><a class="mp-shop-preorder-action" href="'+url+'">'+(request?'Request this cover':'Preorder exact cover')+'</a></div></article>';
}

function mount(catalog){
  var host=document.getElementById('wo-live-shop');
  var controls=host&&host.querySelector('.wo-store-controls');
  var grid=controls&&controls.nextElementSibling;
  if(!grid)return false;
  if(grid.querySelector('[data-preorder-sku]'))return true;
  var variants=[];
  (catalog.families||[]).forEach(function(family){(family.variants||[]).forEach(function(sku){variants.push({family:family,sku:sku});});});
  if(!variants.length)return true;
  var heading=document.createElement('section');heading.className='mp-shop-preorder-heading';heading.innerHTML='<div><span>ORDER AHEAD · THIS WEEK\'S FOC</span><h2>Comic preorders</h2><p>Choose the exact cover now. Foils are priced separately; ratio incentives remain request-only until secured.</p></div><a href="/preorders">See all preorder tools →</a>';
  grid.appendChild(heading);
  grid.insertAdjacentHTML('beforeend',variants.map(function(entry){return cardHtml(entry.family,entry.sku);}).join(''));
  var select=controls.querySelector('select'),search=controls.querySelector('input');
  function sync(){window.setTimeout(function(){var category=String(select&&select.value||'all');var showCategory=category==='all'||category==='comics';var any=Array.prototype.some.call(grid.querySelectorAll('[data-preorder-sku]'),function(card){return card.style.display!=='none';});heading.hidden=!showCategory||!any;},20);}
  if(select){select.addEventListener('change',sync);select.dispatchEvent(new Event('change',{bubbles:true}));}
  if(search)search.addEventListener('input',sync);
  sync();
  return true;
}

fetch(API+'/public/preorders?store_id='+encodeURIComponent(STORE_ID),{headers:{Accept:'application/json'}}).then(function(response){if(!response.ok)throw new Error('Preorders unavailable');return response.json();}).then(function(catalog){var tries=0;function tryMount(){if(mount(catalog))return;if(++tries<80)setTimeout(tryMount,125);}tryMount();}).catch(function(error){console.warn('[Mana Pocket] Comic preorders could not be added to the shop:',error.message);});
})();
