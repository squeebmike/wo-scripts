(function(){
  'use strict';
  if((location.pathname.replace(/\/$/,'')||'/')!=='/account'||document.querySelector('script[data-mp-account]'))return;
  var current=document.currentScript&&document.currentScript.src||'';
  var base=current.replace(/account-loader\.js(?:\?.*)?$/,'');
  var css=document.createElement('link');
  css.rel='stylesheet';css.href=base+'account.css';css.setAttribute('data-mp-account-css','');document.head.appendChild(css);
  var script=document.createElement('script');
  script.async=true;script.src=base+'account.js';script.setAttribute('data-mp-account','');document.head.appendChild(script);
})();
