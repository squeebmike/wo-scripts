// Embedded in Webflow footer code alongside the existing shopping loaders.
(function(){
'use strict';
var guide='/articles/comic-preorders-foc-variant-cover-guide';
var path=location.pathname.replace(/\/$/,'')||'/';
var pages={
  '/preorders':{target:'#mp-foc-app header',title:'First time preordering comics?',links:[[guide,'FOC deadlines, exact covers & checkout explained →']]},
  '/books':{target:'#mp-backlist-app header',title:'Looking for a comic?',links:[['/preorders','Upcoming comic preorders'],[guide,'How FOC works']]},
  '/comic-new-releases-the-mana-pocket':{target:'#mp-cnr-app header',title:'Planning your next pickup?',links:[[guide,'How comic preorders work'],['/articles','Comic previews & cover guides']]},
  '/shop':{target:'[data-mp-comics-hub]',shop:true,title:'Before you pick a cover',links:[[guide,'FOC & variant cover guide'],['/comic-bags-boards-size-guide','Find bags & boards that fit']]},
  '/bcw':{target:'h1',after:true,title:'Check the fit before you buy',links:[['/comic-bags-boards-size-guide','Comic bags & boards size guide'],['/toploader-size-guide','Toploader & card thickness guide']]}
};
var page=pages[path];if(!page)return;
function mount(){
  if(document.getElementById('mp-shopping-guides'))return true;
  var target=document.querySelector(page.target);if(!target)return false;
  var aside=document.createElement('aside');aside.id='mp-shopping-guides';aside.setAttribute('aria-label','Shopping guides');
  var title=document.createElement('strong');title.textContent=page.title;aside.appendChild(title);
  page.links.forEach(function(entry){var link=document.createElement('a');link.href=entry[0];link.textContent=entry[1];aside.appendChild(link);});
  if(page.shop||page.after)target.after(aside);else target.appendChild(aside);
  if(page.shop){function sync(){aside.hidden=target.hidden;}sync();new MutationObserver(sync).observe(target,{attributes:true,attributeFilter:['hidden']});}
  var style=document.createElement('style');style.textContent='#mp-shopping-guides{display:flex;align-items:baseline;flex-wrap:wrap;gap:6px 18px;margin:12px 0 18px;padding:12px 14px;border-left:3px solid #8cd63f;background:rgba(140,214,63,.07);color:inherit;font:500 14px/1.5 system-ui,sans-serif}#mp-shopping-guides[hidden]{display:none!important}#mp-shopping-guides strong{font-weight:750}#mp-shopping-guides a{color:inherit!important;text-decoration:underline!important;text-underline-offset:3px}#mp-shopping-guides a:focus-visible{outline:2px solid #8cd63f;outline-offset:4px}@media(max-width:600px){#mp-shopping-guides{font-size:13px;gap:6px 14px}#mp-shopping-guides strong{flex-basis:100%}}';document.head.appendChild(style);
  return true;
}
function start(){if(mount())return;var observer=new MutationObserver(function(){if(mount())observer.disconnect();});observer.observe(document.body,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
