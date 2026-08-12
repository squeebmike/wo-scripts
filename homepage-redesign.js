(function(){
'use strict';

var API_BASE='https://wo-checkout.swarnerauto.workers.dev';
var CONFIG=window.MANA_HOMEPAGE_CONFIG||{};
var scriptUrl=(document.currentScript&&document.currentScript.src)||'';

function isHomepage(){
  return window.location.pathname==='/'||window.location.pathname==='/index.html';
}

function addStyles(){
  if(document.querySelector('link[data-mp-home-css]'))return;
  var link=document.createElement('link');
  link.rel='stylesheet';
  link.setAttribute('data-mp-home-css','');
  link.href=scriptUrl.replace(/homepage-redesign\.js(?:\?.*)?$/,'homepage-redesign.css');
  document.head.appendChild(link);
}

function el(tag,className,text){
  var node=document.createElement(tag);
  if(className)node.className=className;
  if(text!==undefined)node.textContent=text;
  return node;
}

function link(text,href,className){
  var node=el('a',className,text);
  node.href=href;
  return node;
}

function validImage(item){
  return item&&typeof item.image==='string'&&/^https?:\/\//i.test(item.image);
}

function categorySlug(item){
  var category=String(item&&item.category||'').toLowerCase();
  if(/sport|baseball|basketball|football|hockey/.test(category))return'sports-cards';
  if(/comic/.test(category))return'comics';
  if(/collectible|figure|toy/.test(category))return'collectibles';
  if(/pokemon|pokémon|magic|mtg|tcg/.test(category))return'tcg';
  return'all';
}

function money(value){
  return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(value)||0);
}

function meta(item){
  return[item.set,item.year,item.variant,item.condition].filter(Boolean).join(' · ');
}

function sectionHead(kicker,title,copy,href,cta){
  var head=el('div','mp-section-head');
  var group=el('div');
  group.appendChild(el('span','mp-section-kicker',kicker));
  group.appendChild(el('h2','mp-section-title',title));
  if(copy)group.appendChild(el('p','mp-section-copy',copy));
  head.appendChild(group);
  if(href)head.appendChild(link(cta||'Shop all →',href,'mp-text-link'));
  return head;
}

function productCard(item){
  var card=el('article','mp-product-card');
  if(validImage(item)){
    var image=el('img','mp-product-image');
    image.src=item.image;
    image.alt=item.name||'Collectible';
    image.loading='lazy';
    image.decoding='async';
    card.appendChild(image);
  }else{
    var blank=el('div','mp-product-image');
    blank.setAttribute('aria-hidden','true');
    card.appendChild(blank);
  }
  var body=el('div','mp-product-body');
  body.appendChild(el('span','mp-card-kicker',item.category||'In the pocket'));
  body.appendChild(el('h3','mp-product-name',item.name||'Inventory item'));
  var details=meta(item);
  if(details)body.appendChild(el('p','mp-product-meta',details));
  body.appendChild(el('div','mp-product-price',money(item.price)));
  var add=el('button','mp-product-add','Add to cart');
  add.type='button';
  add.addEventListener('click',function(){
    if(window.WO&&typeof window.WO.addToCart==='function'){
      window.WO.addToCart({id:item.id,name:item.name,price:Number(item.price)||0,image:item.image||'',available:Math.max(1,parseInt(item.quantity,10)||1)});
    }else{
      window.location.href='/shop';
    }
  });
  body.appendChild(add);
  card.appendChild(body);
  return card;
}

function productRow(items){
  var row=el('div','mp-product-row');
  row.setAttribute('role','list');
  items.forEach(function(item){
    var card=productCard(item);
    card.setAttribute('role','listitem');
    row.appendChild(card);
  });
  return row;
}

function buildHero(mount){
  mount.innerHTML='';
  var shell=el('div','mp-shell mp-hero-grid');
  var copy=el('div','mp-hero-copy-wrap');
  copy.appendChild(el('span','mp-kicker','The Mana Pocket · Cards · Comics · Collectibles'));
  copy.appendChild(el('h1','mp-hero-title',CONFIG.heroTitle||'Built for the chase.'));
  copy.appendChild(el('p','mp-hero-copy',CONFIG.heroCopy||'Fresh cards, key books, strange finds, and the good stuff you never stopped looking for.'));
  var actions=el('div','mp-actions');
  actions.appendChild(link('Shop the pocket →',CONFIG.primaryHref||'/shop','mp-button'));
  actions.appendChild(link('Explore our comic worlds',CONFIG.secondaryHref||'/publishing','mp-button mp-button--ghost'));
  copy.appendChild(actions);
  var art=el('div','mp-hero-art');
  art.setAttribute('aria-label','Featured inventory');
  var main=el('div','mp-hero-card');
  main.setAttribute('data-mp-hero-main','');
  var miniOne=el('div','mp-hero-mini mp-hero-mini--one');
  miniOne.setAttribute('data-mp-hero-mini','');
  var miniTwo=el('div','mp-hero-mini mp-hero-mini--two');
  miniTwo.setAttribute('data-mp-hero-mini','');
  art.appendChild(main);art.appendChild(miniOne);art.appendChild(miniTwo);
  art.appendChild(el('span','mp-sticker','Collector owned'));
  shell.appendChild(copy);shell.appendChild(art);mount.appendChild(shell);
}

function fillHero(items){
  var heroImages=[];
  if(CONFIG.heroImage)heroImages.push({image:CONFIG.heroImage,name:CONFIG.heroImageAlt||'The Mana Pocket'});
  items.filter(validImage).forEach(function(item){if(heroImages.length<3)heroImages.push(item);});
  var slots=[document.querySelector('[data-mp-hero-main]')].concat(Array.prototype.slice.call(document.querySelectorAll('[data-mp-hero-mini]')));
  slots.forEach(function(slot,index){
    if(!slot||!heroImages[index])return;
    var image=el('img');
    image.src=heroImages[index].image;
    image.alt=heroImages[index].name||'Featured inventory';
    image.decoding='async';
    if(index===0)image.fetchPriority='high';else image.loading='lazy';
    slot.appendChild(image);
  });
}

var CATEGORY_CONFIG=[
  {slug:'tcg',label:'Pokémon + TCG',meta:'Singles · sealed · Magic',href:'/shop?cat=tcg'},
  {slug:'sports-cards',label:'Sports',meta:'Baseball · basketball · football',href:'/shop?cat=sports-cards'},
  {slug:'comics',label:'Comics',meta:'Keys · variants · signed books',href:'/shop?cat=comics'},
  {slug:'collectibles',label:'Collectibles',meta:'Slabs · figures · weird stuff',href:'/shop'}
];

function buildCategories(mount,items){
  mount.innerHTML='';
  var shell=el('div','mp-shell');
  shell.appendChild(sectionHead('Shop categories','Pick your aisle.','Big destinations, real inventory, zero dead-end routes.','/shop','Shop everything →'));
  var grid=el('div','mp-category-grid');
  CATEGORY_CONFIG.forEach(function(category){
    var card=link('',category.href,'mp-category');
    var media=el('span','mp-category-media');
    var match=items.find(function(item){return categorySlug(item)===category.slug&&validImage(item);});
    if(match){
      var image=el('img');image.src=match.image;image.alt='';image.loading='lazy';image.decoding='async';media.appendChild(image);
    }
    var copy=el('span','mp-category-copy');
    copy.appendChild(el('span','mp-category-label',category.label));
    copy.appendChild(el('span','mp-category-meta',category.meta+' →'));
    card.appendChild(media);card.appendChild(copy);grid.appendChild(card);
  });
  shell.appendChild(grid);mount.appendChild(shell);
}

function makeSection(className){
  var section=el('section','mp-section '+className);
  var shell=el('div','mp-shell');section.appendChild(shell);return{section:section,shell:shell};
}

function buildDynamicSections(categoryMount){
  var fresh=makeSection('mp-fresh');fresh.section.id='fresh-in-the-pocket';
  fresh.shell.appendChild(sectionHead('New arrivals','Fresh in the pocket','The stuff that just showed up.','/shop','Shop all new arrivals →'));
  fresh.shell.appendChild(el('div','mp-loading','Checking the latest inventory…'));

  var editorial=el('section','mp-editorial');
  var editorialShell=el('div','mp-shell');
  editorialShell.appendChild(el('span','mp-section-kicker','A collector support group, basically'));
  var title=el('h2','mp-editorial-title');
  title.appendChild(document.createTextNode("Your mom threw your collection away. We can't fix that. "));
  title.appendChild(el('span','', 'But we can help.'));
  editorialShell.appendChild(title);
  editorialShell.appendChild(link('Shop nostalgia →',CONFIG.nostalgiaHref||'/shop','mp-button mp-button--ghost'));
  editorial.appendChild(editorialShell);

  var pulled=makeSection('mp-pulled');pulled.section.id='pulled-at-the-pocket';
  pulled.shell.appendChild(sectionHead('From behind the counter','Pulled at the pocket','Pulls, collector stories, and the cards we cannot stop talking about.'));
  pulled.shell.appendChild(el('div','mp-loading','Setting up the feature wall…'));

  var caseSection=makeSection('mp-case');caseSection.section.id='shop-the-case';
  caseSection.shell.appendChild(sectionHead('Premium inventory','Shop the case','The locked-cabinet stuff, minus the awkward hovering.','/shop','Browse the full case →'));
  caseSection.shell.appendChild(el('div','mp-case-labels','Slabs · autos · keys · rares · weird stuff'));
  caseSection.shell.appendChild(el('div','mp-loading','Polishing the glass…'));

  var happening=makeSection('mp-happening');happening.section.id='happening-at-the-pocket';
  happening.shell.appendChild(sectionHead('Community board','Happening at the pocket','Live sales, incoming drops, and where to find us.'));
  var happeningGrid=el('div','mp-happening-grid');
  [
    {kicker:'Live now',title:'Rip with us.',copy:'Live sales, breaks, and the occasional monster pull.',href:'https://whatnot.com/invite/walkoffsportscards',cta:'Watch on Whatnot →'},
    {kicker:'This week',title:'New stuff landed.',copy:'See the latest cards, sealed product, comics, and collectibles.',href:'/shop',cta:'Shop the drop →'},
    {kicker:'At the shop',title:'Shows, events, and pop-ups.',copy:'Follow the build and see where The Mana Pocket is showing up next.',href:'/updates',cta:'See updates →'}
  ].forEach(function(item){
    var card=link('',item.href,'mp-happening-card');
    card.appendChild(el('span','mp-card-kicker',item.kicker));
    card.appendChild(el('h3','mp-happening-title',item.title));
    card.appendChild(el('p','mp-happening-copy',item.copy));
    card.appendChild(el('span','mp-text-link',item.cta));
    happeningGrid.appendChild(card);
  });
  happening.shell.appendChild(happeningGrid);

  categoryMount.after(fresh.section,editorial,pulled.section,caseSection.section,happening.section);
  return{fresh:fresh,pulled:pulled,caseSection:caseSection};
}

function renderFresh(section,items){
  var old=section.shell.querySelector('.mp-loading');if(old)old.remove();
  var fresh=items.slice().sort(function(a,b){return new Date(b.addedAt||b.updatedAt||0)-new Date(a.addedAt||a.updatedAt||0);}).filter(validImage).slice(0,8);
  section.shell.appendChild(fresh.length?productRow(fresh):el('div','mp-empty','Fresh inventory will appear here automatically.'));
}

function renderPulled(section,items){
  var old=section.shell.querySelector('.mp-loading');if(old)old.remove();
  var candidates=items.filter(function(item){return validImage(item)&&!item.isSealed;}).sort(function(a,b){return Number(b.price||0)-Number(a.price||0);}).slice(0,2);
  var grid=el('div','mp-pull-grid');
  candidates.forEach(function(item,index){
    var card=el('article','mp-feature');
    var image=el('img');image.src=item.image;image.alt=item.name||'Featured card';image.loading='lazy';card.appendChild(image);
    card.appendChild(el('span','mp-card-kicker',index===0?'Featured pull':'Related from the case'));
    card.appendChild(el('h3','mp-feature-title',item.name));
    card.appendChild(el('p','mp-feature-copy',[item.category,meta(item),money(item.price)].filter(Boolean).join(' · ')));
    card.appendChild(link('Find it in the shop →','/shop','mp-text-link'));
    grid.appendChild(card);
  });
  var social=link('','https://whatnot.com/invite/walkoffsportscards','mp-feature');
  social.appendChild(el('span','mp-card-kicker','Live pulls'));
  social.appendChild(el('h3','mp-feature-title','Watch the next one happen.'));
  social.appendChild(el('p','mp-feature-copy','Follow The Mana Pocket for live sales, breaks, and the hits worth yelling about.'));
  social.appendChild(el('span','mp-text-link','Watch on Whatnot →'));
  grid.appendChild(social);section.shell.appendChild(grid);
}

function isCaseItem(item){
  var words=[item.name,item.category,item.set,item.variant,item.gradingCompany,item.isSigned?'signed':''].join(' ').toLowerCase();
  return Number(item.price||0)>=45||/slab|graded|psa|cgc|bgs|sgc|auto|signed|key|rare|one.of.one/.test(words);
}

function renderCase(section,items){
  var old=section.shell.querySelector('.mp-loading');if(old)old.remove();
  var caseItems=items.filter(function(item){return validImage(item)&&isCaseItem(item);}).sort(function(a,b){return Number(b.price||0)-Number(a.price||0);}).slice(0,8);
  section.shell.appendChild(caseItems.length?productRow(caseItems):el('div','mp-empty','Premium inventory will appear here automatically.'));
}

function addNewsletter(){
  if(document.querySelector('.mp-newsletter'))return;
  var footer=document.querySelector('.footer-section,.Footer,.footer');
  if(!footer)return;
  var section=el('section','mp-newsletter');
  var shell=el('div','mp-shell mp-newsletter-grid');
  var copy=el('div');copy.appendChild(el('span','mp-section-kicker','The good kind of inbox problem'));
  copy.appendChild(el('h2','mp-section-title','Get pocketed.'));
  copy.appendChild(el('p','mp-section-copy','Drops, pulls, new books and other important shit.'));
  shell.appendChild(copy);shell.appendChild(link('Join the fan club →','/fan-club','mp-button'));
  section.appendChild(shell);footer.before(section);
}

function showInventoryError(sections){
  [sections.fresh,sections.pulled,sections.caseSection].forEach(function(section){
    var loading=section.shell.querySelector('.mp-loading');
    if(!loading)return;
    loading.className='mp-empty';loading.textContent='Live inventory is taking a minute. The full shop is still available.';
    loading.appendChild(document.createTextNode(' '));loading.appendChild(link('Open the shop →','/shop','mp-text-link'));
  });
}

function init(){
  if(!isHomepage()||document.body.classList.contains('mp-home-redesign'))return;
  addStyles();
  document.body.classList.add('mp-home-redesign');
  var hero=document.querySelector('.woh-hero');
  var categories=document.querySelector('.woh-cats');
  if(!hero||!categories)return;
  buildHero(hero);
  buildCategories(categories,[]);
  var sections=buildDynamicSections(categories);
  addNewsletter();
  fetch(API_BASE+'/api/inventory',{headers:{Accept:'application/json'}})
    .then(function(response){if(!response.ok)throw new Error('Inventory unavailable');return response.json();})
    .then(function(payload){
      var items=(payload&&Array.isArray(payload.items)?payload.items:[]).filter(function(item){return item&&item.id&&Number(item.quantity||0)>0;});
      fillHero(items);
      buildCategories(categories,items);
      renderFresh(sections.fresh,items);
      renderPulled(sections.pulled,items);
      renderCase(sections.caseSection,items);
    })
    .catch(function(){showInventoryError(sections);});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();
})();
