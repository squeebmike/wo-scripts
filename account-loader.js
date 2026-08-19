(function(){
  'use strict';
  var PATHS=['/account','/account-orders','/account-preorders','/account-consignments','/account-wishlist','/account-profile','/login','/signup'];
  var path=location.pathname.replace(/\/$/,'')||'/';
  if(PATHS.indexOf(path)===-1||document.querySelector('script[data-mp-account]'))return;
  var current=document.currentScript&&document.currentScript.src||'';
  var base=current.replace(/account-loader\.js(?:\?.*)?$/,'');
  var css=document.createElement('link');
  css.rel='stylesheet';css.href=base+'account.css';css.setAttribute('data-mp-account-css','');document.head.appendChild(css);
  var script=document.createElement('script');
  script.async=true;script.src=base+'account.js';script.setAttribute('data-mp-account','');document.head.appendChild(script);
})();
