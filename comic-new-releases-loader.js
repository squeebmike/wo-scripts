(function(){
'use strict';
if((location.pathname.replace(/\/$/,'')||'/')!=='/comic-new-releases-the-mana-pocket'||document.querySelector('script[data-mp-cnr]'))return;
var current=document.currentScript&&document.currentScript.src||'';
var base=current.replace(/comic-new-releases-loader\.js(?:\?.*)?$/,'');
// Claim the page immediately, even when this loader runs in <head> -- same
// reasoning as preorders-loader.js's own guard, prevents a stale Webflow
// body embed from winning the race during rollout.
var guard=document.createElement('script');
guard.type='application/json';guard.setAttribute('data-mp-cnr','');document.head.appendChild(guard);
// Same critical-shell trick preorders-loader.js uses: this loader is
// parser-blocking at the end of the Webflow body, so install a tiny
// critical style before the async app/CSS requests begin, rather than
// letting the page flash its default light Webflow background before the
// dark app shell paints.
document.documentElement.classList.add('mp-cnr-boot');
var critical=document.createElement('style');
critical.setAttribute('data-mp-cnr-critical','');
critical.textContent='html.mp-cnr-boot body{background:#10121a!important;color:#f5f5f2;min-height:100svh!important}#mp-cnr-app{background:#10121a;color:#f5f5f2;min-height:60vh}#mp-cnr-app .mp-cnr-shell{margin:auto;padding:18px 8px 92px;width:min(1500px,100%)}#mp-cnr-app .mp-cnr-eyebrow{color:#8f55bd;font:800 11px/1.2 ui-monospace,monospace;letter-spacing:.18em;text-transform:uppercase}#mp-cnr-app .mp-cnr-title{font:900 clamp(36px,7vw,88px)/.9 Impact,\'Arial Black\',sans-serif;letter-spacing:-.03em;margin:12px 0;max-width:1000px;text-transform:uppercase}';
document.head.appendChild(critical);
function boot(){
  if(document.getElementById('mp-cnr-app'))return;
  var app=document.createElement('main');
  app.id='mp-cnr-app';
  app.innerHTML='<div class="mp-cnr-shell"><header><div class="mp-cnr-eyebrow">The Mana Pocket · New comics this week</div><h1 class="mp-cnr-title">What’s hitting shelves.</h1><p class="mp-cnr-intro">Every PRH and Lunar single-issue cover releasing this week -- name, artist, ratio, and synopsis, no digging required. Not for sale on this page: tap a cover to preorder it, buy it in stock, or reorder it from backlist.</p></header><div data-cnr-dynamic><div class="mp-cnr-loading"><b>Pulling this week’s covers…</b></div></div></div>';
  var footer=document.querySelector('.footer-section,.Footer,.footer');
  if(footer)footer.parentNode.insertBefore(app,footer);else document.body.appendChild(app);
  var css=document.createElement('link');
  css.rel='stylesheet';css.href=base+'comic-new-releases.css';css.setAttribute('data-mp-cnr-css','');document.head.appendChild(css);
  var script=document.createElement('script');
  script.async=true;script.src=base+'comic-new-releases.js';script.setAttribute('data-mp-cnr','');document.head.appendChild(script);
}
if(document.body)boot();else document.addEventListener('DOMContentLoaded',boot,{once:true});
})();
