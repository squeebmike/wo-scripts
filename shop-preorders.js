(function(){
'use strict';

// Start the first in-stock shop request from this small, async head script.
// wo-ui.js and the checkout renderer are substantially larger deferred
// bundles, so waiting for either of them makes the first product image a late
// LCP candidate on mobile. The renderer consumes this exact promise later.
if((location.pathname.replace(/\/$/,'')||'/')==='/shop'&&!window.__MP_STOREFRONT_PREFETCH__){
  var inventoryParams=new URLSearchParams({
    limit:String(window.matchMedia&&window.matchMedia('(max-width: 767px)').matches?12:36),
    offset:'0'
  });
  var shopParams=new URLSearchParams(location.search);
  var shopCategory=shopParams.get('cat');
  var shopType=shopParams.get('type')||shopParams.get('subcat');
  var shopQuery=shopParams.get('q')||shopParams.get('search');
  if(shopCategory&&shopCategory!=='all')inventoryParams.set('category',shopCategory);
  if(shopType&&shopType!=='all')inventoryParams.set('type',shopType);
  if(shopQuery)inventoryParams.set('q',shopQuery);
  var inventoryKey=inventoryParams.toString();
  var inventoryPromise=fetch('https://wo-checkout.swarnerauto.workers.dev/api/inventory?'+inventoryKey,{headers:{Accept:'application/json'}});
  inventoryPromise.then(function(response){
    if(!response.ok)return;
    response.clone().json().then(function(data){
      var first=data&&data.items&&data.items[0];
      if(!first||!first.image||document.querySelector('link[data-mp-first-product]'))return;
      var imagePreload=document.createElement('link');
      imagePreload.rel='preload';imagePreload.as='image';imagePreload.href=first.image;
      imagePreload.fetchPriority='high';imagePreload.setAttribute('data-mp-first-product','');
      document.head.appendChild(imagePreload);
    }).catch(function(){});
  }).catch(function(){});
  window.__MP_STOREFRONT_PREFETCH__={
    key:inventoryKey,
    promise:inventoryPromise
  };
}
if((location.pathname.replace(/\/$/,'')||'/')!=='/shop')return;
var API='https://still-resonance-4f87.swarnerauto.workers.dev',STORE_ID='0f9dd4bc-42a7-487e-a972-2905d24513e9',records={},lazyTrigger=null;
function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(ch){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
function money(cents){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(cents||0)/100);}
function dateOnly(value){if(!value)return'TBA';return new Intl.DateTimeFormat('en-US',{timeZone:'UTC',month:'short',day:'numeric',year:'numeric'}).format(new Date(value+'T12:00:00Z'));}
function isComicCategory(value){value=String(value||'').trim().toLowerCase();return value==='comic'||value==='comics';}
function titleFor(family){return(family.seriesName||family.title)+(family.issueNumber?' #'+family.issueNumber:'');}
function priceFor(sku){return sku.waitlistOnly?(sku.priceRequired?'Price confirmed if secured':money(sku.priceCents)+' if secured'):(sku.priceRequired?'Price coming soon':money(sku.priceCents));}
function cardHtml(family,sku,prioritizeImage){
  var name=titleFor(family),request=!!sku.waitlistOnly,pricePending=!request&&!sku.canPreorder;
  var badges='<span>PREORDER</span>'+(sku.isFoil?'<span>FOIL</span>':'')+(sku.isIncentive?'<span>'+esc(sku.orderRequirement||'INCENTIVE')+'</span>':'');
  return '<article class="wo-live-card mp-shop-preorder-card" data-category="comics" data-mp-subcategory="preorders" data-preorder-sku="'+esc(sku.id)+'"><button class="mp-shop-preorder-image" type="button" data-preorder-details="'+esc(sku.id)+'" aria-label="View details for '+esc(name+' '+sku.variantLabel)+'">'+(sku.coverImageUrl?'<img loading="'+(prioritizeImage?'eager':'lazy')+'"'+(prioritizeImage?' fetchpriority="high"':'')+' decoding="async" src="'+esc(sku.coverImageUrl)+'" alt="'+esc(name+' '+sku.variantLabel)+'">':'<span>Cover coming soon</span>')+'</button><div class="mp-shop-preorder-body"><div class="mp-shop-preorder-badges">'+badges+'</div><h3>'+esc(name)+'</h3><p class="mp-shop-preorder-variant">'+esc(sku.variantLabel||'Cover A')+'</p><p class="mp-shop-preorder-artist">'+esc(sku.coverArtist?'Cover by '+sku.coverArtist:family.publisher||'Comic preorder')+'</p><p class="mp-shop-preorder-release">Releases '+esc(dateOnly(sku.onSaleDate||family.onSaleDate))+'</p><strong class="mp-shop-preorder-price '+(request||pricePending?'request':'')+'">'+priceFor(sku)+'</strong>'+(request?'<button class="mp-shop-preorder-action secondary" type="button" data-preorder-details="'+esc(sku.id)+'">Request details</button>':pricePending?'<button class="mp-shop-preorder-action secondary" type="button" data-preorder-details="'+esc(sku.id)+'">View details</button>':'<button class="mp-shop-preorder-action" type="button" data-shop-preorder-add="'+esc(sku.id)+'">Add preorder</button>')+'</div></article>';
}
// Points at the Worker's server-rendered /preorder/{id} page, never at this
// page's own client-rendered URL -- /shop is 100% client-rendered, so a
// link-preview scraper (Facebook, iMessage, Discord...) that fetches this
// page's plain URL only ever sees one generic, sitewide meta description
// and no image, regardless of which cover was open when someone hit share.
// /preorder/{id} is real server-rendered HTML with this exact cover's own
// og:title/og:description/og:image already in the response.
function shareUrlFor(skuId){return'https://themanapocket.com/preorder/'+encodeURIComponent(skuId);}
function shareSku(family,sku,button){
  var name=titleFor(family)+' · '+(sku.variantLabel||'Cover A'),url=shareUrlFor(sku.id);
  if(navigator.share){navigator.share({title:name+' | The Mana Pocket',text:'Preorder '+name+' at The Mana Pocket',url:url}).catch(function(){});return;}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(url).then(function(){var original=button.textContent;button.textContent='Link copied ✓';setTimeout(function(){button.textContent=original;},1400);}).catch(function(){window.prompt('Copy this link:',url);});return;}
  window.prompt('Copy this link:',url);
}
function addPayload(record){var family=record.family,sku=record.sku,cycle=record.cycle;return{skuId:sku.id,cycleId:cycle.id,focDate:cycle.foc_date,name:titleFor(family)+' · '+(sku.variantLabel||'Cover A'),image:sku.coverImageUrl||'',upc:sku.upc||'',price:Number(sku.priceCents||0)/100,quantity:1};}
function addPreorder(skuId,button){var record=records[skuId];if(!record||!record.sku.canPreorder)return;if(!window.WO||typeof window.WO.addComicPreorder!=='function'){button.textContent='Still loading…';window.setTimeout(function(){button.textContent='Add preorder';},900);return;}button.disabled=true;button.textContent='Saving…';window.WO.addComicPreorder(addPayload(record),button,function(error){button.disabled=false;if(error){button.textContent='Try again';window.alert(error.message);return;}button.textContent='Added ✓';window.setTimeout(function(){button.textContent='Add preorder';},1200);});}
function closeDetails(){var node=document.querySelector('.mp-shop-preorder-overlay');if(node)node.remove();document.removeEventListener('keydown',escapeDetails);}
function escapeDetails(event){if(event.key==='Escape')closeDetails();}
function openDetails(skuId){
  var record=records[skuId];if(!record)return;var family=record.family,sku=record.sku,cycle=record.cycle;closeDetails();var overlay=document.createElement('div');overlay.className='mp-shop-preorder-overlay';var creators=[family.writer&&'Writer: '+family.writer,family.interiorArtist&&'Artist: '+family.interiorArtist,sku.coverArtist&&'Cover: '+sku.coverArtist].filter(Boolean),request=sku.waitlistOnly||!sku.canPreorder;
  overlay.innerHTML='<section class="mp-shop-preorder-dialog" role="dialog" aria-modal="true" aria-labelledby="mp-shop-preorder-title"><button class="mp-shop-preorder-close" type="button" aria-label="Close">×</button><div class="mp-shop-preorder-detail-media">'+(sku.coverImageUrl?'<img src="'+esc(sku.coverImageUrl)+'" alt="'+esc(titleFor(family)+' '+sku.variantLabel)+'">':'<span>Cover coming soon</span>')+'</div><div class="mp-shop-preorder-detail-copy"><p class="mp-shop-preorder-kicker">Comic preorder · specific cover shown</p><h2 id="mp-shop-preorder-title">'+esc(titleFor(family))+'</h2><h3>'+esc(sku.variantLabel||'Cover A')+'</h3><div class="mp-shop-preorder-detail-grid"><span><b>Price</b>'+esc(priceFor(sku))+'</span><span><b>Preorder deadline</b>'+esc(dateOnly(cycle.foc_date))+'</span><span><b>Release date</b>'+esc(dateOnly(sku.onSaleDate||family.onSaleDate))+'</span><span><b>Publisher</b>'+esc([family.publisher,family.imprint].filter(Boolean).join(' · ')||'TBA')+'</span></div><p class="mp-shop-preorder-creators">'+esc(creators.join(' · ')||'Creator details have not been supplied yet.')+'</p><h4>Synopsis</h4><p class="mp-shop-preorder-synopsis">'+esc(sku.description||family.description||'The distributor has not supplied a synopsis yet. Check back as release information is updated.')+'</p><p class="mp-shop-preorder-note">FOC means Final Order Cutoff—the distributor deadline. Adding this preorder saves the shown cover to My Pocket and also puts it in your cart; you are not charged until checkout.</p>'+(request?'<a class="mp-shop-preorder-action" href="/preorders?sku='+encodeURIComponent(sku.id)+'&request=1">Request this cover</a>':'<button class="mp-shop-preorder-action" type="button" data-shop-preorder-add="'+esc(sku.id)+'">Add preorder</button>')+'<button class="mp-shop-preorder-action secondary" type="button" data-shop-preorder-share="'+esc(sku.id)+'">Share</button></div></section>';
  document.body.appendChild(overlay);overlay.querySelector('.mp-shop-preorder-close').addEventListener('click',closeDetails);overlay.addEventListener('click',function(event){if(event.target===overlay)closeDetails();});overlay.querySelectorAll('[data-shop-preorder-add]').forEach(function(button){button.addEventListener('click',function(){addPreorder(button.dataset.shopPreorderAdd,button);});});overlay.querySelectorAll('[data-shop-preorder-share]').forEach(function(button){button.addEventListener('click',function(){shareSku(family,sku,button);});});document.addEventListener('keydown',escapeDetails);
}
function mount(catalog){
  var host=document.getElementById('wo-live-shop'),controls=host&&host.querySelector('.wo-store-controls'),inventoryGrid=controls&&controls.nextElementSibling,inventoryStatus=inventoryGrid&&inventoryGrid.nextElementSibling;if(!inventoryGrid)return false;if(host.querySelector('.mp-shop-preorder-grid'))return true;
  var grid=document.createElement('div');grid.className='wo-live-grid mp-shop-preorder-grid';grid.style.cssText=inventoryGrid.style.cssText;inventoryGrid.parentNode.insertBefore(grid,inventoryGrid.nextSibling);if(lazyTrigger)lazyTrigger.remove();
  var variants=[];function addPage(page){(page.families||[]).forEach(function(family){(family.variants||[]).forEach(function(sku){records[sku.id]={family:family,sku:sku,cycle:page.cycle};variants.push({family:family,sku:sku});});});}addPage(catalog);if(!variants.length)return true;
  var heading=document.createElement('section');heading.className='mp-shop-preorder-heading';heading.innerHTML='<div><span>ORDER AHEAD · THIS WEEK\'S FOC</span><h2>Comic preorders</h2><p>Pick the cover you want, save it to My Pocket, and pay before the preorder deadline. Ratio incentives stay request-only until secured.</p></div><a href="/preorders">Browse all FOC weeks →</a>';
  var batchSize=window.matchMedia&&window.matchMedia('(max-width: 767px)').matches?8:12,rendered=0,more=document.createElement('button'),observer=null,serverPaged=Number.isFinite(Number(catalog.totalVariants)),total=Number(catalog.totalVariants)||variants.length,hasMore=serverPaged?catalog.hasMore===true:false,nextOffset=Number(catalog.nextOffset)||variants.length,loading=false;
  more.type='button';more.className='mp-shop-preorder-more';more.textContent='Show more preorders';more.setAttribute('aria-label','Show more comic preorders');
  grid.appendChild(heading);grid.appendChild(more);
  function renderNext(){
    var next=variants.slice(rendered,rendered+batchSize);
    if(!next.length&&serverPaged&&hasMore&&!loading){loading=true;more.disabled=true;more.textContent='Loading more preorders…';fetch(API+'/public/preorders?store_id='+encodeURIComponent(STORE_ID)+'&limit='+batchSize+'&offset='+nextOffset,{headers:{Accept:'application/json'}}).then(function(response){if(!response.ok)throw new Error('Preorders unavailable');return response.json();}).then(function(page){addPage(page);total=Number(page.totalVariants)||total;hasMore=page.hasMore===true;nextOffset=Number(page.nextOffset)||nextOffset;loading=false;renderNext();}).catch(function(){loading=false;more.disabled=false;more.textContent='Try loading more preorders';});return;}
    if(!next.length)return;
    more.insertAdjacentHTML('beforebegin',next.map(function(entry,index){return cardHtml(entry.family,entry.sku,rendered===0&&index===0);}).join(''));rendered+=next.length;
    more.textContent=(rendered<variants.length||hasMore)?'Show more preorders ('+rendered+' of '+total+')':'All '+total+' preorders shown';more.disabled=rendered>=variants.length&&!hasMore;
    if(more.disabled&&observer)observer.disconnect();
  }
  renderNext();more.addEventListener('click',renderNext);
  if('IntersectionObserver' in window){observer=new IntersectionObserver(function(entries){if(entries[0]&&entries[0].isIntersecting&&!more.disabled)renderNext();},{rootMargin:(batchSize===8?'320px 0px':'700px 0px')});observer.observe(more);}
  grid.addEventListener('click',function(event){var detail=event.target.closest('[data-preorder-details]'),add=event.target.closest('[data-shop-preorder-add]');if(detail){openDetails(detail.dataset.preorderDetails);return;}if(add)addPreorder(add.dataset.shopPreorderAdd,add);});
  var select=controls.querySelector('.wo-store-control-field'),sub=controls.querySelector('.wo-store-type-field')||controls.querySelector('.mp-shop-subcategory'),search=controls.querySelector('input');function sync(){window.setTimeout(function(){var category=String(select&&select.value||'all').toLowerCase(),subtype=String(sub&&sub.value||'all'),query=String(search&&search.value||'').trim().toLowerCase(),showCategory=isComicCategory(category)&&(subtype==='all'||subtype==='preorders'),preordersOnly=isComicCategory(category)&&subtype==='preorders',any=false;Array.prototype.forEach.call(grid.querySelectorAll('[data-preorder-sku]'),function(card){var visible=showCategory&&(!query||card.textContent.toLowerCase().includes(query));card.hidden=!visible;if(visible)any=true;});grid.hidden=!showCategory||(!any&&rendered>0);inventoryGrid.hidden=preordersOnly;if(inventoryStatus)inventoryStatus.hidden=preordersOnly;},20);}if(select)select.addEventListener('change',sync);if(sub)sub.addEventListener('change',sync);if(search)search.addEventListener('input',sync);sync();return true;
}
var initialLimit=window.matchMedia&&window.matchMedia('(max-width: 767px)').matches?8:12;
function loadInitialPreorders(){if(loadInitialPreorders.started)return;loadInitialPreorders.started=true;if(lazyTrigger){lazyTrigger.disabled=true;lazyTrigger.textContent='Loading comic preorders…';}fetch(API+'/public/preorders?store_id='+encodeURIComponent(STORE_ID)+'&limit='+initialLimit+'&offset=0',{headers:{Accept:'application/json'}}).then(function(response){if(!response.ok)throw new Error('Preorders unavailable');return response.json();}).then(function(catalog){var tries=0;function tryMount(){if(mount(catalog))return;if(++tries<80)setTimeout(tryMount,125);}tryMount();}).catch(function(error){loadInitialPreorders.started=false;if(lazyTrigger){lazyTrigger.disabled=false;lazyTrigger.textContent='Try loading comic preorders';}console.warn('[Mana Pocket] Comic preorders could not be added to the shop:',error.message);});}
(function waitForInventory(){var host=document.getElementById('wo-live-shop'),inventoryGrid=host&&host.querySelector('.wo-live-grid');if(!host||!inventoryGrid||host.dataset.woLoaded!=='true'){setTimeout(waitForInventory,125);return;}var controls=host.querySelector('.wo-store-controls'),select=controls&&controls.querySelector('.wo-store-control-field'),sub=controls&&(controls.querySelector('.wo-store-type-field')||controls.querySelector('.mp-shop-subcategory'));lazyTrigger=document.createElement('button');lazyTrigger.type='button';lazyTrigger.className='mp-shop-preorder-more mp-shop-preorder-lazy-trigger';lazyTrigger.textContent='Load comic preorders';lazyTrigger.addEventListener('click',loadInitialPreorders);host.appendChild(lazyTrigger);function syncTrigger(){var show=isComicCategory(select&&select.value);lazyTrigger.hidden=!show;if(show&&String(sub&&sub.value||'all')==='preorders')loadInitialPreorders();}if(select)select.addEventListener('change',syncTrigger);if(sub)sub.addEventListener('change',syncTrigger);syncTrigger();if('IntersectionObserver' in window){var observer=new IntersectionObserver(function(entries){if(entries[0]&&entries[0].isIntersecting&&!lazyTrigger.hidden){observer.disconnect();loadInitialPreorders();}},{rootMargin:'900px 0px'});observer.observe(lazyTrigger);}})();
})();
