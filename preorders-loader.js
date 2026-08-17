(function(){
  'use strict';
  if((location.pathname.replace(/\/$/,'')||'/')!=='/preorders'||document.querySelector('script[data-mp-preorders]'))return;
  var current=document.currentScript&&document.currentScript.src||'';
  var base=current.replace(/preorders-loader\.js(?:\?.*)?$/,'');
  var css=document.createElement('link');
  css.rel='stylesheet';css.href=base+'preorders.css';css.setAttribute('data-mp-preorders-css','');document.head.appendChild(css);
  var script=document.createElement('script');
  script.async=true;script.src=base+'preorders.js';script.setAttribute('data-mp-preorders','');document.head.appendChild(script);
})();
