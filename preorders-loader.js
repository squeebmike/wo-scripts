(function(){
  'use strict';
  if((location.pathname.replace(/\/$/,'')||'/')!=='/preorders'||document.querySelector('script[data-mp-preorders]'))return;
  var current=document.currentScript&&document.currentScript.src||'';
  var base=current.replace(/preorders-loader\.js(?:\?.*)?$/,'');
  // Claim the page immediately, even when this loader runs in <head>. This
  // prevents a stale Webflow body embed from winning the race during rollout.
  var guard=document.createElement('script');
  guard.type='application/json';guard.setAttribute('data-mp-preorders','');document.head.appendChild(guard);
  // This loader is parser-blocking at the end of the Webflow body. Install a
  // tiny critical shell before the async app/CSS requests begin so the legacy
  // footer never paints at the top of the page and then jumps below the FOC
  // wall. The selector releases the footer in the same task that mount() adds
  // mp-page-preorders and inserts the min-height app in front of it.
  document.documentElement.classList.add('mp-foc-boot');
  var critical=document.createElement('style');
  critical.setAttribute('data-mp-preorders-critical','');
  critical.textContent='html.mp-foc-boot body{background:#10121a!important;color:#f5f5f2;min-height:100svh!important;padding-top:80px!important}html.mp-foc-boot body:not(.mp-page-preorders)>.footer,html.mp-foc-boot body:not(.mp-page-preorders)>.Footer,html.mp-foc-boot body:not(.mp-page-preorders)>.footer-section{visibility:hidden!important}html.mp-foc-boot #navbarID .wo-team-btn{box-sizing:border-box!important;height:40px!important;padding:0!important;width:40px!important}#mp-foc-app{background:#10121a;color:#f5f5f2;min-height:100vh}#mp-foc-app .mp-foc-shell{margin:auto;padding:18px 8px 92px;width:min(1500px,100%)}#mp-foc-app .mp-foc-eyebrow{color:#8f55bd;font:800 11px/1.2 ui-monospace,monospace;letter-spacing:.18em;text-transform:uppercase}#mp-foc-app .mp-foc-title{font:900 clamp(42px,8vw,104px)/.86 Impact,\'Arial Black\',sans-serif;letter-spacing:-.035em;margin:12px 0;max-width:1000px;text-transform:uppercase}#mp-foc-app .mp-foc-intro{font-size:clamp(16px,2vw,22px);line-height:1.5;max-width:760px;opacity:.78}';
  document.head.appendChild(critical);
  function boot(){
    if(document.getElementById('mp-foc-app'))return;
    var app=document.createElement('main');
    app.id='mp-foc-app';
    app.innerHTML='<div class="mp-foc-shell"><header><div class="mp-foc-eyebrow">The Mana Pocket · Comic preorders</div><h1 class="mp-foc-title">Preorder the cover you want.</h1><p class="mp-foc-intro">FOC means Final Order Cutoff—the weekly distributor deadline. Save comics to your account, curate your list, then pay for all or only the ones you choose before that week closes. Open weeks appear first; expired weeks stay at the bottom and cannot be ordered.</p></header><div data-foc-dynamic><div class="mp-foc-loading"><b>Opening the pull box…</b><span>Loading this week’s comic covers.</span></div></div></div>';
    var footer=document.querySelector('.footer-section,.Footer,.footer');
    if(footer)footer.parentNode.insertBefore(app,footer);else document.body.appendChild(app);
    var css=document.createElement('link');
    css.rel='stylesheet';css.href=base+'preorders.css';css.setAttribute('data-mp-preorders-css','');document.head.appendChild(css);
    var script=document.createElement('script');
    script.async=true;script.src=base+'preorders.js';script.setAttribute('data-mp-preorders','');document.head.appendChild(script);
  }
  if(document.body)boot();else document.addEventListener('DOMContentLoaded',boot,{once:true});
})();
