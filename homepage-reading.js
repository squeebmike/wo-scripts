// Embedded in Webflow head code so these links do not depend on a new CDN fetch.
(function(){
'use strict';
if(location.pathname!=='/'&&location.pathname!=='/index.html')return;
var entries=[
  {kind:'Comic preview',title:'Absolute Batman #25: the twelve Lunar covers',copy:'The gatefold, the connecting set, the foils, and the artists behind them.',href:'/articles/absolute-batman-25-covers-presale'},
  {kind:'Comic preview',title:'Marvel’s Midnight Universe gets weird',copy:'Spider monsters, vampires, and a Fantastic Four experiment that goes to hell. Meet the three series.',href:'/articles/marvel-midnight-universe-series-covers-preorders'},
  {kind:'Collector guide',title:'Which comic bags and boards fit?',copy:'Current, Silver Age, and Golden Age sizes. Check the fit before you buy a stack.',href:'/comic-bags-boards-size-guide'},
  {kind:'Collector guide',title:'What size toploader do I need?',copy:'Standard cards, thick cards, patch cards. Find the size that fits your collection.',href:'/toploader-size-guide'}
];
function element(tag,className,text){var node=document.createElement(tag);node.className=className;if(text)node.textContent=text;return node;}
function mount(){
  if(document.getElementById('from-the-comic-rack'))return true;
  var fresh=document.getElementById('fresh-in-the-pocket');if(!fresh)return false;
  var style=document.createElement('style');
  style.textContent='.mp-reading-grid{display:grid;gap:18px;grid-template-columns:repeat(2,minmax(0,1fr))}.mp-reading-card{display:flex;flex-direction:column;gap:12px;padding:clamp(22px,3vw,36px);border:1px solid var(--mp-line);border-radius:18px;background:var(--mp-panel);color:var(--mp-copy)!important;text-decoration:none}.mp-reading-card:hover,.mp-reading-card:focus-visible{border-color:var(--mp-accent);outline:2px solid var(--mp-accent);outline-offset:3px}.mp-reading-title{color:var(--mp-copy)!important;font-size:clamp(26px,3vw,38px);line-height:1.08;margin:0}.mp-reading-card .mp-section-copy{margin:0 0 10px}.mp-reading-card .mp-text-link{margin-top:auto}@media(max-width:600px){.mp-reading-grid{grid-template-columns:1fr}}';
  document.head.appendChild(style);
  var section=element('section','mp-section mp-reading');section.id='from-the-comic-rack';section.setAttribute('aria-labelledby','mp-reading-heading');
  var shell=element('div','mp-shell'),head=element('div','mp-section-head'),intro=element('div','');
  intro.appendChild(element('span','mp-section-kicker','From the comic rack'));
  var heading=element('h2','mp-section-title','Worth a look.');heading.id='mp-reading-heading';intro.appendChild(heading);
  intro.appendChild(element('p','mp-section-copy','Cover lineups, comic previews, and help finding the right supplies.'));
  head.appendChild(intro);var all=element('a','mp-text-link','All comic articles →');all.href='/articles';head.appendChild(all);shell.appendChild(head);
  var grid=element('div','mp-reading-grid');
  entries.forEach(function(entry){var card=element('a','mp-reading-card');card.href=entry.href;card.appendChild(element('span','mp-section-kicker',entry.kind));card.appendChild(element('h3','mp-reading-title',entry.title));card.appendChild(element('p','mp-section-copy',entry.copy));card.appendChild(element('span','mp-text-link','Read it →'));grid.appendChild(card);});
  shell.appendChild(grid);section.appendChild(shell);fresh.after(section);return true;
}
function start(){if(mount())return;var observer=new MutationObserver(function(){if(mount())observer.disconnect();});observer.observe(document.body,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
