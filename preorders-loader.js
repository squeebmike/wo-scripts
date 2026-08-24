(function(){
  'use strict';
  if((location.pathname.replace(/\/$/,'')||'/')!=='/preorders'||document.querySelector('script[data-mp-preorders]'))return;
  var current=document.currentScript&&document.currentScript.src||'';
  var base=current.replace(/preorders-loader\.js(?:\?.*)?$/,'');
  // This loader is parser-blocking at the end of the Webflow body. Install a
  // tiny critical shell before the async app/CSS requests begin so the legacy
  // footer never paints at the top of the page and then jumps below the FOC
  // wall. The selector releases the footer in the same task that mount() adds
  // mp-page-preorders and inserts the min-height app in front of it.
  document.documentElement.classList.add('mp-foc-boot');
  var critical=document.createElement('style');
  critical.setAttribute('data-mp-preorders-critical','');
  critical.textContent='html.mp-foc-boot body{background:#10121a!important;min-height:100svh!important;padding-top:80px!important}html.mp-foc-boot body:not(.mp-page-preorders)>.footer,html.mp-foc-boot body:not(.mp-page-preorders)>.Footer,html.mp-foc-boot body:not(.mp-page-preorders)>.footer-section{visibility:hidden!important}html.mp-foc-boot #navbarID .wo-team-btn{box-sizing:border-box!important;height:40px!important;padding:0!important;width:40px!important}';
  document.head.appendChild(critical);
  var css=document.createElement('link');
  css.rel='stylesheet';css.href=base+'preorders.css';css.setAttribute('data-mp-preorders-css','');document.head.appendChild(css);
  var script=document.createElement('script');
  script.async=true;script.src=base+'preorders.js';script.setAttribute('data-mp-preorders','');document.head.appendChild(script);
})();
