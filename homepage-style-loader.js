// Webflow head embed: avoid fetching homepage-only CSS on every shop page.
(function(){
  if(location.pathname!=='/'&&location.pathname!=='/index.html')return;
  if(document.querySelector('link[data-mp-home-css]'))return;
  var link=document.createElement('link');
  link.rel='stylesheet';link.href='https://cdn.jsdelivr.net/gh/squeebmike/wo-scripts@2dbe142/homepage-redesign.css';
  link.setAttribute('data-mp-home-css','');document.head.appendChild(link);
})();
