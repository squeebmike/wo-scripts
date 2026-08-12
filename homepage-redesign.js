(function(){
'use strict';

var API_BASE='https://wo-checkout.swarnerauto.workers.dev';
var CONFIG=window.MANA_HOMEPAGE_CONFIG||{};
var scriptUrl=(document.currentScript&&document.currentScript.src)||'';
var SCHEDULE_URL=CONFIG.scheduleUrl||'https://raw.githubusercontent.com/squeebmike/wo-scripts/codex/homepage-merchandising-redesign/homepage-schedule.json';
var OFF_AIR_IMAGE='https://cdn.prod.website-files.com/65b15ee0228d06647ca7e4ce/6a7ceed727942e7f2a329aff_manapocketstorefront.avif';

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
  if(/pokemon|pokémon/.test(category))return'pokemon';
  if(/magic|mtg/.test(category))return'mtg';
  if(/supply|sleeve|binder|toploader|playmat/.test(category))return'supplies';
  return'all';
}

function productHref(item){
  return item&&item.id?'/shop?item='+encodeURIComponent(item.id):'/shop';
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
  var href=productHref(item);
  if(validImage(item)){
    var imageLink=link('',href,'mp-product-image-link');
    var image=el('img','mp-product-image');
    image.src=item.image;
    image.alt=item.name||'Collectible';
    image.loading='lazy';
    image.decoding='async';
    imageLink.appendChild(image);card.appendChild(imageLink);
  }else{
    var blank=el('div','mp-product-image');
    blank.setAttribute('aria-hidden','true');
    card.appendChild(blank);
  }
  var body=el('div','mp-product-body');
  body.appendChild(el('span','mp-card-kicker',item.category||'In the pocket'));
  var title=el('h3','mp-product-name');
  title.appendChild(link(item.name||'Inventory item',href,'mp-product-name-link'));
  body.appendChild(title);
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

function replacePromoMessage(){
  Array.prototype.forEach.call(document.querySelectorAll('.rotating-promo-text > div'),function(item){
    item.textContent='Fast shipping · Expert packing · Collector-grade care';
  });
}

function buildBroadcastStage(hero){
  var backdrop=document.querySelector('.image-8');
  if(!backdrop){
    backdrop=el('img','image-8');
    var pageContent=document.querySelector('.page-content');
    if(pageContent&&pageContent.parentNode)pageContent.parentNode.insertBefore(backdrop,pageContent);
  }
  backdrop.classList.add('mp-storefront-backdrop');
  backdrop.src=OFF_AIR_IMAGE;
  backdrop.removeAttribute('srcset');
  backdrop.removeAttribute('sizes');
  backdrop.alt='The Mana Pocket storefront after dark';
  backdrop.setAttribute('aria-hidden','true');
  var stage=el('section','mp-broadcast mp-broadcast--offair');stage.id='pocket-live';
  var media=el('div','mp-broadcast-media');
  var shade=el('div','mp-broadcast-shade');media.appendChild(shade);
  var shell=el('div','mp-shell mp-broadcast-shell');
  var copy=el('div','mp-broadcast-copy');
  copy.appendChild(el('span','mp-live-status','Off air · The lights are out'));
  copy.appendChild(el('h2','mp-broadcast-title','The shop is dark. For now.'));
  copy.appendChild(el('p','mp-broadcast-text','When The Mana Pocket goes live, the show takes over this spot. Until then, the good stuff is waiting below.'));
  var actions=el('div','mp-actions');actions.appendChild(link('See the schedule ↓','#pocket-calendar','mp-button'));actions.appendChild(link('Follow on Whatnot','https://www.whatnot.com/user/walkoffsportscards/shows','mp-button mp-button--ghost'));
  copy.appendChild(actions);shell.appendChild(copy);stage.appendChild(media);stage.appendChild(shell);hero.before(stage);
  return stage;
}

function renderBroadcast(stage,data){
  if(!stage)return;
  var live=Boolean(data&&data.live);
  stage.classList.toggle('mp-broadcast--live',live);stage.classList.toggle('mp-broadcast--offair',!live);
  var shell=stage.querySelector('.mp-broadcast-shell');if(!shell)return;
  shell.innerHTML='';
  if(live){
    var viewer=el('div','mp-live-viewer');
    if(data.embedUrl){
      var frame=document.createElement('iframe');frame.src=data.embedUrl;frame.title=data.liveTitle||'The Mana Pocket live show';frame.allow='autoplay; encrypted-media; picture-in-picture';frame.allowFullscreen=true;viewer.appendChild(frame);
    }else{
      viewer.appendChild(el('div','mp-live-viewer-placeholder','The live show is happening now. Open Whatnot to watch and shop.'));
    }
    var liveCopy=el('div','mp-broadcast-copy');liveCopy.appendChild(el('span','mp-live-status mp-live-status--on','Live now'));
    liveCopy.appendChild(el('h2','mp-broadcast-title',data.liveTitle||'We are live at The Mana Pocket.'));
    if(data.liveDescription)liveCopy.appendChild(el('p','mp-broadcast-text',data.liveDescription));
    liveCopy.appendChild(link('Watch and shop live →',data.liveUrl||'https://www.whatnot.com/user/walkoffsportscards','mp-button'));
    shell.appendChild(viewer);shell.appendChild(liveCopy);
  }else{
    var copy=el('div','mp-broadcast-copy');copy.appendChild(el('span','mp-live-status','Off air · The lights are out'));
    copy.appendChild(el('h2','mp-broadcast-title','The shop is dark. For now.'));
    var next=data&&data.nextLive;
    copy.appendChild(el('p','mp-broadcast-text',next&&next.when?'Next online show: '+next.when+'.':'No online show is scheduled yet. Follow us and we will let you know when the lights come back on.'));
    var actions=el('div','mp-actions');actions.appendChild(link('See the schedule ↓','#pocket-calendar','mp-button'));actions.appendChild(link('Follow on Whatnot',next&&next.url||'https://www.whatnot.com/user/walkoffsportscards/shows','mp-button mp-button--ghost'));copy.appendChild(actions);shell.appendChild(copy);
  }
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
  var candidates=items.filter(validImage);
  var featured=candidates.filter(function(item){
    return !/hat|cap|shirt|apparel|playmat|sleeve|binder|toploader|supply/i.test([item.name,item.category].join(' '));
  });
  featured.concat(candidates).forEach(function(item){
    if(heroImages.length>=3||heroImages.some(function(existing){return existing.image===item.image;}))return;
    heroImages.push(item);
  });
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
  {slug:'pokemon',label:'Pokémon',meta:'Singles · sealed · promos',href:'/shop?cat=pokemon'},
  {slug:'mtg',label:'Magic: The Gathering',meta:'Singles · sealed · decks',href:'/shop?cat=mtg'},
  {slug:'sports-cards',label:'Sports',meta:'Baseball · basketball · football',href:'/shop?cat=sports-cards'},
  {slug:'comics',label:'Comics',meta:'Keys · variants · signed books',href:'/shop?cat=comics'},
  {slug:'collectibles',label:'Collectibles',meta:'Figures · apparel · weird stuff',href:'/shop?cat=collectibles'},
  {slug:'supplies',label:'Supplies',meta:'Sleeves · binders · protection',href:'/shop?cat=supplies'}
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

  var happening=makeSection('mp-happening');happening.section.id='pocket-calendar';
  happening.shell.appendChild(sectionHead('Where we will be','The Pocket calendar','Online shows, weekend stops, events, and the next place to find us.'));
  var happeningGrid=el('div','mp-happening-grid');
  happeningGrid.setAttribute('data-mp-schedule-grid','');
  happeningGrid.appendChild(el('div','mp-loading','Checking the calendar…'));
  happening.shell.appendChild(happeningGrid);

  categoryMount.after(fresh.section,editorial,pulled.section,caseSection.section,happening.section);
  return{fresh:fresh,pulled:pulled,caseSection:caseSection,happening:happening};
}

function renderSchedule(section,data){
  var grid=section&&section.shell.querySelector('[data-mp-schedule-grid]');if(!grid)return;grid.innerHTML='';
  var dated=[];
  var undated=[];
  var entries=[];
  if(data&&data.nextLive)entries.push(data.nextLive);
  (data&&Array.isArray(data.appearances)?data.appearances:[]).forEach(function(item){entries.push(item);});
  (data&&Array.isArray(data.events)?data.events:[]).forEach(function(item){entries.push(item);});
  entries.forEach(function(item){
    if(item&&/^\d{4}-\d{2}-\d{2}$/.test(item.date||''))dated.push(item);else if(item)undated.push(item);
  });

  var calendar=el('div','mp-calendar');
  var calendarHead=el('div','mp-calendar-head');
  var monthTitle=el('h3','mp-calendar-month');
  var monthControls=el('div','mp-calendar-controls');
  var previous=el('button','mp-calendar-nav','‹');previous.type='button';previous.setAttribute('aria-label','Previous month');
  var next=el('button','mp-calendar-nav','›');next.type='button';next.setAttribute('aria-label','Next month');
  monthControls.appendChild(previous);monthControls.appendChild(next);calendarHead.appendChild(monthTitle);calendarHead.appendChild(monthControls);
  var weekdays=el('div','mp-calendar-weekdays');
  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(function(day){weekdays.appendChild(el('span','',day));});
  var days=el('div','mp-calendar-days');
  calendar.appendChild(calendarHead);calendar.appendChild(weekdays);calendar.appendChild(days);

  var agenda=el('aside','mp-calendar-agenda');
  var agendaLabel=el('span','mp-card-kicker','Selected day');
  var agendaTitle=el('h3','mp-calendar-agenda-title');
  var agendaItems=el('div','mp-calendar-agenda-items');
  agenda.appendChild(agendaLabel);agenda.appendChild(agendaTitle);agenda.appendChild(agendaItems);
  var layout=el('div','mp-calendar-layout');layout.appendChild(calendar);layout.appendChild(agenda);grid.appendChild(layout);

  var today=new Date();today.setHours(0,0,0,0);
  var cursor=new Date(today.getFullYear(),today.getMonth(),1);
  var selected=new Date(today);
  function keyFor(date){return date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');}
  function eventsFor(date){var key=keyFor(date);return dated.filter(function(item){return item.date===key;});}
  function renderAgenda(date){
    agendaTitle.textContent=new Intl.DateTimeFormat('en-US',{weekday:'long',month:'long',day:'numeric'}).format(date);
    agendaItems.innerHTML='';
    var events=eventsFor(date);
    if(!events.length){agendaItems.appendChild(el('p','mp-calendar-empty','Nothing is booked for this day yet. Confirmed appearances and live shows will appear here.'));return;}
    events.forEach(function(item){agendaItems.appendChild(scheduleCard(item,'mp-calendar-event'));});
  }
  function renderMonth(){
    monthTitle.textContent=new Intl.DateTimeFormat('en-US',{month:'long',year:'numeric'}).format(cursor);
    days.innerHTML='';
    var first=new Date(cursor.getFullYear(),cursor.getMonth(),1);
    var total=new Date(cursor.getFullYear(),cursor.getMonth()+1,0).getDate();
    for(var blank=0;blank<first.getDay();blank++)days.appendChild(el('span','mp-calendar-day mp-calendar-day--blank'));
    for(var day=1;day<=total;day++){
      (function(date){
        var button=el('button','mp-calendar-day');button.type='button';button.appendChild(el('span','mp-calendar-date',String(date.getDate())));
        var events=eventsFor(date);
        if(events.length){button.classList.add('mp-calendar-day--event');button.appendChild(el('span','mp-calendar-dot',events.length===1?events[0].title:events.length+' events'));}
        if(keyFor(date)===keyFor(today))button.classList.add('mp-calendar-day--today');
        if(keyFor(date)===keyFor(selected))button.classList.add('mp-calendar-day--selected');
        button.setAttribute('aria-label',new Intl.DateTimeFormat('en-US',{month:'long',day:'numeric',year:'numeric'}).format(date)+(events.length?' · '+events.length+' scheduled':' · nothing scheduled'));
        button.addEventListener('click',function(){selected=new Date(date);renderMonth();renderAgenda(selected);});days.appendChild(button);
      })(new Date(cursor.getFullYear(),cursor.getMonth(),day));
    }
  }
  previous.addEventListener('click',function(){cursor=new Date(cursor.getFullYear(),cursor.getMonth()-1,1);selected=new Date(cursor);renderMonth();renderAgenda(selected);});
  next.addEventListener('click',function(){cursor=new Date(cursor.getFullYear(),cursor.getMonth()+1,1);selected=new Date(cursor);renderMonth();renderAgenda(selected);});
  renderMonth();renderAgenda(selected);

  if(!undated.length)undated=[{kicker:'Calendar update',title:'New dates are coming.',when:'Schedule in progress',copy:'We are locking in the next online show and in-person stops now.',href:'/updates',cta:'Follow the updates →'}];
  var notices=el('div','mp-calendar-notices');
  notices.appendChild(el('h3','mp-calendar-notices-title','Upcoming & ongoing'));
  var noticeGrid=el('div','mp-calendar-notice-grid');
  undated.forEach(function(item){noticeGrid.appendChild(scheduleCard(item,'mp-happening-card'));});
  notices.appendChild(noticeGrid);grid.appendChild(notices);
}

function scheduleCard(item,className){
  var card=link('',item.href||'/updates',className||'mp-happening-card');
  card.appendChild(el('span','mp-card-kicker',item.kicker));
  card.appendChild(el('h3','mp-happening-title',item.title));
  if(item.when)card.appendChild(el('strong','mp-happening-when',item.when));
  if(item.location)card.appendChild(el('span','mp-happening-location',item.location));
  if(item.copy)card.appendChild(el('p','mp-happening-copy',item.copy));
  if(item.cta)card.appendChild(el('span','mp-text-link',item.cta));
  return card;
}

function loadSchedule(section,stage){
  fetch(SCHEDULE_URL+(SCHEDULE_URL.indexOf('?')===-1?'?':'&')+'v='+Math.floor(Date.now()/300000),{headers:{Accept:'application/json'}})
    .then(function(response){if(!response.ok)throw new Error('Schedule unavailable');return response.json();})
    .then(function(data){renderBroadcast(stage,data);renderSchedule(section,data);})
    .catch(function(){renderBroadcast(stage,{});renderSchedule(section,{});});
}

function renderFresh(section,items){
  var old=section.shell.querySelector('.mp-loading');if(old)old.remove();
  var fresh=items.slice().sort(function(a,b){return new Date(b.addedAt||b.updatedAt||0)-new Date(a.addedAt||a.updatedAt||0);}).filter(validImage).slice(0,8);
  section.shell.appendChild(fresh.length?productRow(fresh):el('div','mp-empty','Fresh inventory will appear here automatically.'));
}

function renderPulled(section,items){
  var old=section.shell.querySelector('.mp-loading');if(old)old.remove();
  function editorialScore(item){
    var words=[item.name,item.category,item.set,item.variant].join(' ').toLowerCase();
    var score=Number(item.price||0);
    if(/single|card|comic|original art|sketch|signed|graded|slab|rare|variant/.test(words))score+=160;
    if(/box|bundle|display|collection|deck|pack|sealed|case/.test(words))score-=220;
    if(item.isSealed===true||String(item.isSealed).toLowerCase()==='true')score-=260;
    return score;
  }
  var candidates=items.filter(validImage).sort(function(a,b){return editorialScore(b)-editorialScore(a);}).slice(0,2);
  var grid=el('div','mp-pull-grid');
  candidates.forEach(function(item,index){
    var card=el('article','mp-feature');
    var media=el('div','mp-feature-media');
    var image=el('img');image.src=item.image;image.alt=item.name||'Featured card';image.loading='lazy';media.appendChild(image);
    var body=el('div','mp-feature-body');
    body.appendChild(el('span','mp-card-kicker',index===0?'Featured pull':'Related from the case'));
    body.appendChild(el('h3','mp-feature-title',item.name));
    body.appendChild(el('p','mp-feature-copy',[item.category,meta(item),money(item.price)].filter(Boolean).join(' · ')));
    body.appendChild(link('Find it in the shop →',productHref(item),'mp-text-link'));
    card.appendChild(media);card.appendChild(body);
    grid.appendChild(card);
  });
  var social=link('','https://whatnot.com/invite/walkoffsportscards','mp-feature mp-feature--social');
  var socialBody=el('div','mp-feature-body');
  socialBody.appendChild(el('span','mp-card-kicker','Live pulls'));
  socialBody.appendChild(el('h3','mp-feature-title','Watch the next one happen.'));
  socialBody.appendChild(el('p','mp-feature-copy','Follow The Mana Pocket for live sales, breaks, and the hits worth yelling about.'));
  socialBody.appendChild(el('span','mp-text-link','Watch on Whatnot →'));
  social.appendChild(socialBody);
  grid.appendChild(social);section.shell.appendChild(grid);
}

function isArtItem(item){
  var words=[item.name,item.category,item.set,item.variant].join(' ').toLowerCase();
  return /original art|original drawing|art print|artist print|poster|sketch|commission/.test(words);
}

function renderOriginalArt(items){
  var section=document.querySelector('.art-section-bg');
  var inner=section&&section.querySelector('.art-section-inner');
  if(!section||!inner||inner.querySelector('.mp-art-showcase'))return;
  section.classList.add('mp-art-live');
  var showcase=el('div','mp-art-showcase');
  var artItems=items.filter(function(item){return validImage(item)&&isArtItem(item);}).slice(0,3);
  if(artItems.length){
    showcase.appendChild(el('span','mp-section-kicker','Available now'));
    var grid=el('div','mp-art-grid');
    artItems.forEach(function(item){grid.appendChild(productCard(item));});
    showcase.appendChild(grid);
  }else{
    showcase.classList.add('mp-art-showcase--fallback');
    showcase.appendChild(el('span','mp-section-kicker','From Shawn Warner'));
    showcase.appendChild(el('h3','mp-art-fallback-title','Originals, prints, and work in progress.'));
    showcase.appendChild(el('p','mp-section-copy','See current work and available releases in the art gallery.'));
    showcase.appendChild(link('Browse the gallery →','/shawnwarnerart','mp-text-link'));
  }
  inner.appendChild(showcase);
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

function addStorefrontReveal(){
  if(document.querySelector('.mp-storefront-reveal'))return;
  var newsletter=document.querySelector('.mp-newsletter');
  var footer=document.querySelector('.footer-section,.Footer,.footer');
  var anchor=newsletter||footer;if(!anchor)return;
  var section=el('section','mp-storefront-reveal');
  var shell=el('div','mp-shell mp-storefront-reveal-shell');
  var copy=el('div','mp-storefront-reveal-copy');
  copy.appendChild(el('span','mp-live-status','The lights will come back on'));
  copy.appendChild(el('h2','mp-storefront-reveal-title','See you at the next show.'));
  copy.appendChild(el('p','mp-broadcast-text','Until then, the storefront stays still while the schedule keeps moving.'));
  copy.appendChild(link('Check the Pocket calendar ↑','#pocket-calendar','mp-button mp-button--ghost'));
  shell.appendChild(copy);section.appendChild(shell);anchor.before(section);
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
  replacePromoMessage();
  var broadcast=buildBroadcastStage(hero);
  buildHero(hero);
  buildCategories(categories,[]);
  var sections=buildDynamicSections(categories);
  loadSchedule(sections.happening,broadcast);
  addNewsletter();
  addStorefrontReveal();
  fetch(API_BASE+'/api/inventory',{headers:{Accept:'application/json'}})
    .then(function(response){if(!response.ok)throw new Error('Inventory unavailable');return response.json();})
    .then(function(payload){
      var items=(payload&&Array.isArray(payload.items)?payload.items:[]).filter(function(item){return item&&item.id&&Number(item.quantity||0)>0;});
      fillHero(items);
      buildCategories(categories,items);
      renderFresh(sections.fresh,items);
      renderPulled(sections.pulled,items);
      renderCase(sections.caseSection,items);
      renderOriginalArt(items);
    })
    .catch(function(){showInventoryError(sections);});
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else init();
})();
