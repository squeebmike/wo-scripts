(function(){
'use strict';
var API='https://still-resonance-4f87.swarnerauto.workers.dev';
var STORE_ID='0f9dd4bc-42a7-487e-a972-2905d24513e9';

function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(ch){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}
function money(cents){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(cents||0)/100);}
function dynamicHost(){return document.querySelector('[data-cnr-dynamic]');}

var state={weekStart:null,weekEndExclusive:null,covers:[],loading:false,distributor:'PRH'};

// A visitor arriving from a shared link (?week=YYYY-MM-DD) sees that exact
// week on load; everyone else gets the current week, computed server-side
// so it's always correct Eastern-time NCBD regardless of the visitor's own
// clock/timezone.
function requestedWeek(){
  try{ var w=new URLSearchParams(location.search).get('week'); return /^\d{4}-\d{2}-\d{2}$/.test(w||'')?w:''; }catch(_){ return ''; }
}

function requestedDistributor(){
  try{ return new URLSearchParams(location.search).get('distributor')==='Lunar'?'Lunar':'PRH'; }catch(_){ return 'PRH'; }
}

function distributorLabel(distributor){return distributor==='Lunar'?'Lunar':'Penguin Random House';}

function weekRangeLabel(){
  if(!state.weekStart)return '';
  var end=new Date(state.weekEndExclusive+'T00:00:00Z');end.setUTCDate(end.getUTCDate()-1);
  var start=new Date(state.weekStart+'T00:00:00Z');
  var fmt=function(d){return d.toLocaleDateString('en-US',{timeZone:'UTC',month:'short',day:'numeric'});};
  return fmt(start)+' – '+fmt(end);
}

function shiftWeek(days){
  var d=new Date(state.weekStart+'T00:00:00Z');d.setUTCDate(d.getUTCDate()+days);
  loadWeek(d.toISOString().slice(0,10),state.distributor);
}

function switchDistributor(distributor){
  if(distributor===state.distributor)return;
  loadWeek(state.weekStart,distributor);
}

function linkLabel(cover){
  if(cover.linkType==='preorder')return 'Preorder this cover →';
  if(cover.linkType==='shop')return 'View in shop →';
  if(cover.linkType==='backlist')return 'Order from backlist →';
  return '';
}

function coverCard(cover){
  var badgeText=cover.isIncentive?(cover.ratioThreshold?'1:'+esc(cover.ratioThreshold):'Incentive'):'';
  if(cover.isFoil)badgeText=badgeText?badgeText+' · Foil':'Foil';
  var badge=badgeText?'<span class="mp-cnr-badge">'+badgeText+'</span>':'';
  var link=cover.linkHref?'<a class="mp-cnr-link" href="'+esc(cover.linkHref)+'">'+esc(linkLabel(cover))+'</a>':'<span class="mp-cnr-nolink">Not currently orderable</span>';
  return '<article class="mp-cnr-card">'
    + (cover.coverImageUrl?'<img class="mp-cnr-cover" src="'+esc(cover.coverImageUrl)+'" alt="" loading="lazy">':'<div class="mp-cnr-cover mp-cnr-cover-placeholder"></div>')
    + '<div class="mp-cnr-card-body">'
    + '<h3 class="mp-cnr-card-title">'+esc(cover.seriesName)+(cover.issueNumber?' #'+esc(cover.issueNumber):'')+'</h3>'
    + '<div class="mp-cnr-card-variant">'+esc(cover.variantLabel)+badge+'</div>'
    + (cover.coverArtist?'<div class="mp-cnr-card-artist">Cover by '+esc(cover.coverArtist)+'</div>':'')
    + (cover.writer?'<div class="mp-cnr-card-writer">Written by '+esc(cover.writer)+'</div>':'')
    + (cover.description?'<p class="mp-cnr-card-desc">'+esc(cover.description)+'</p>':'')
    + (cover.priceRequired?'':'<div class="mp-cnr-card-price">'+money(cover.priceCents)+'</div>')
    + link
    + '</div></article>';
}

function distributorToggle(){
  return '<div class="mp-cnr-distributor-toggle" role="group" aria-label="Distributor">'
    + ['PRH','Lunar'].map(function(distributor){
        var active=distributor===state.distributor;
        return '<button type="button" class="mp-cnr-button mp-cnr-distributor-btn'+(active?' is-active':'')+'" data-distributor="'+distributor+'" aria-pressed="'+active+'">'+esc(distributorLabel(distributor))+'</button>';
      }).join('')
    + '</div>';
}

function render(){
  var host=dynamicHost();
  if(!host)return;
  var nav='<div class="mp-cnr-weeknav">'
    + '<button type="button" class="mp-cnr-button ghost" id="mp-cnr-prev-week">← Previous week</button>'
    + '<div class="mp-cnr-week-label">'+esc(weekRangeLabel())+'</div>'
    + '<button type="button" class="mp-cnr-button ghost" id="mp-cnr-next-week">Next week →</button>'
    + '</div>'
    + distributorToggle();
  var body=state.covers.length
    ? '<div class="mp-cnr-grid">'+state.covers.map(coverCard).join('')+'</div>'
    : '<div class="mp-cnr-empty">No '+esc(distributorLabel(state.distributor))+' single-issue covers are scheduled to release this week.</div>';
  host.innerHTML=nav+body;
  var prev=document.getElementById('mp-cnr-prev-week'),next=document.getElementById('mp-cnr-next-week');
  if(prev)prev.addEventListener('click',function(){shiftWeek(-7);});
  if(next)next.addEventListener('click',function(){shiftWeek(7);});
  Array.prototype.forEach.call(host.querySelectorAll('.mp-cnr-distributor-btn'),function(btn){
    btn.addEventListener('click',function(){switchDistributor(btn.getAttribute('data-distributor'));});
  });
}

// Real title/meta/canonical/JSON-LD set here in JS (Google's indexing
// pipeline renders JS before indexing, same technique bcw-webflow.js and
// preorders.js already rely on for their own SEO) -- the page's true
// content only exists after this fetch resolves, so there's nothing
// meaningful to put in Webflow's own static SEO fields per week.
function updateSeo(){
  var title='Comic New Releases ('+weekRangeLabel()+') | The Mana Pocket';
  document.title=title;
  var description='Every '+distributorLabel(state.distributor)+' single-issue comic releasing '+weekRangeLabel()+': cover, artist, ratio, and synopsis for '+state.covers.length+' cover'+(state.covers.length===1?'':'s')+'.';
  // Canonical stays distributor-agnostic (no ?distributor= param) -- the
  // toggle is a view switch on one page, not a distinct page, so indexing
  // only ever sees the single default (PRH) URL per week.
  var canonicalUrl=location.origin+location.pathname;
  var canonical=document.querySelector('link[rel="canonical"]');
  if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical);}
  canonical.href=canonicalUrl;
  [['description',description],['og:title',title],['og:description',description],['og:url',canonicalUrl],['og:type','website']].forEach(function(pair){
    var name=pair[0],content=pair[1];
    var isOg=name.indexOf('og:')===0;
    var meta=document.querySelector('meta['+(isOg?'property':'name')+'="'+name+'"]');
    if(!meta){meta=document.createElement('meta');meta.setAttribute(isOg?'property':'name',name);document.head.appendChild(meta);}
    meta.content=content;
  });
  var existingLd=document.querySelector('script[data-mp-cnr-ld]');
  if(existingLd)existingLd.remove();
  if(state.covers.length){
    var ld=document.createElement('script');
    ld.type='application/ld+json';ld.setAttribute('data-mp-cnr-ld','');
    ld.textContent=JSON.stringify({
      '@context':'https://schema.org','@type':'ItemList',name:title,
      itemListElement:state.covers.slice(0,50).map(function(cover,index){
        return {'@type':'ListItem',position:index+1,name:cover.seriesName+(cover.issueNumber?' #'+cover.issueNumber:'')+' — '+cover.variantLabel,image:cover.coverImageUrl||undefined};
      }),
    });
    document.head.appendChild(ld);
  }
}

async function loadWeek(week,distributor){
  if(state.loading)return;
  state.loading=true;
  var host=dynamicHost();
  if(host)host.innerHTML='<div class="mp-cnr-loading"><b>Pulling this week’s covers…</b></div>';
  try{
    var params=new URLSearchParams({store_id:STORE_ID});
    if(week)params.set('week',week);
    if(distributor==='Lunar')params.set('distributor','Lunar');
    var response=await fetch(API+'/public/comics/new-releases?'+params.toString());
    var data=await response.json().catch(function(){return{};});
    if(!response.ok||!data.ok)throw new Error(data.error||'Could not load this week’s releases.');
    state.weekStart=data.weekStart;state.weekEndExclusive=data.weekEndExclusive;state.covers=data.covers||[];
    state.distributor=data.distributor==='Lunar'?'Lunar':'PRH';
    render();
    updateSeo();
    var url=new URL(location.href);
    url.searchParams.set('week',state.weekStart);
    if(state.distributor==='Lunar')url.searchParams.set('distributor','Lunar');else url.searchParams.delete('distributor');
    history.replaceState(null,'',url);
  }catch(error){
    if(host)host.innerHTML='<div class="mp-cnr-error">'+esc(error.message)+'</div>';
  }finally{
    state.loading=false;
  }
}

function mount(){
  // The loader's critical CSS (background/min-height + the squeezed nav
  // button size) only needs to hold until this real app takes over --
  // leaving it on permanently was exactly the bug just fixed on
  // /preorders (see preorders.js's own mount()), so it gets removed here
  // too rather than repeating that mistake on a second page.
  document.documentElement.classList.remove('mp-cnr-boot');
  loadWeek(requestedWeek(),requestedDistributor());
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
