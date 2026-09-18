(function(){
  'use strict';
  if((location.pathname.replace(/\/$/,'')||'/')!=='/books'||document.querySelector('script[data-mp-backlist]'))return;
  var current=document.currentScript&&document.currentScript.src||'';
  var base=current.replace(/backlist-loader\.js(?:\?.*)?$/,'');
  var guard=document.createElement('script');
  guard.type='application/json';guard.setAttribute('data-mp-backlist','');document.head.appendChild(guard);
  // Same critical-shell pattern as preorders-loader.js -- builds the shell
  // synchronously before backlist.js/backlist.css even load, so the legacy
  // Webflow footer never paints above it and then jumps.
  document.documentElement.classList.add('mp-foc-boot');
  var critical=document.createElement('style');
  critical.setAttribute('data-mp-backlist-critical','');
  critical.textContent='html.mp-foc-boot body{background:#10121a!important;color:#f5f5f2;min-height:100svh!important;padding-top:80px!important}html.mp-foc-boot body:not(.mp-page-backlist)>.footer,html.mp-foc-boot body:not(.mp-page-backlist)>.Footer,html.mp-foc-boot body:not(.mp-page-backlist)>.footer-section{visibility:hidden!important}#mp-backlist-app{background:#10121a;color:#f5f5f2;min-height:100vh}#mp-backlist-app .mp-bl-shell{margin:auto;padding:18px 8px 92px;width:min(1500px,100%)}#mp-backlist-app .mp-bl-eyebrow{color:#8f55bd;font:800 11px/1.2 ui-monospace,monospace;letter-spacing:.18em;text-transform:uppercase}#mp-backlist-app .mp-bl-title{font:900 clamp(36px,7vw,84px)/.9 Impact,\'Arial Black\',sans-serif;letter-spacing:-.03em;margin:12px 0;max-width:1000px;text-transform:uppercase}#mp-backlist-app .mp-bl-intro{font-size:clamp(14px,1.6vw,18px);line-height:1.5;max-width:760px;opacity:.78}';
  document.head.appendChild(critical);
  function boot(){
    if(document.getElementById('mp-backlist-app'))return;
    var app=document.createElement('main');
    app.id='mp-backlist-app';
    app.innerHTML='<div class="mp-bl-shell"><header><div class="mp-bl-eyebrow">The Mana Pocket · Full PRH catalog</div><h1 class="mp-bl-title">Order any book Penguin Random House still prints.</h1><p class="mp-bl-intro">This is PRH\'s entire in-print catalog -- comics and regular books alike. It ships with our next weekly publisher order rather than from shelf stock, so delivery takes longer than an in-stock item -- each result shows a real estimate.</p></header><div data-bl-dynamic><div class="mp-bl-loading"><b>Loading the catalog…</b></div></div></div>';
    var footer=document.querySelector('.footer-section,.Footer,.footer');
    if(footer)footer.parentNode.insertBefore(app,footer);else document.body.appendChild(app);
    var css=document.createElement('link');
    css.rel='stylesheet';css.href=base+'backlist.css';css.setAttribute('data-mp-backlist-css','');document.head.appendChild(css);
    var script=document.createElement('script');
    script.async=true;script.src=base+'backlist.js';script.setAttribute('data-mp-backlist','');document.head.appendChild(script);
  }
  if(document.body)boot();else document.addEventListener('DOMContentLoaded',boot,{once:true});
})();
