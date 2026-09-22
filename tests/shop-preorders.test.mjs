import assert from 'node:assert/strict';
import fs from 'node:fs';

const shop=fs.readFileSync(new URL('../shop-preorders.js',import.meta.url),'utf8');
const ui=fs.readFileSync(new URL('../wo-ui.js',import.meta.url),'utf8');

assert.match(shop,/>Add preorder</,'ordinary preorder cards must use clear customer-facing copy');
assert.doesNotMatch(shop,/preorders\?sku=.*&add=1/,'adding an ordinary preorder must not redirect to the FOC wall');
assert.match(shop,/window\.WO\.addComicPreorder/,'the shop must save through the shared preorder helper');
assert.match(shop,/Synopsis/,'preorder details must expose the distributor synopsis');
assert.match(shop,/Preorder deadline/,'preorder details must explain the deadline');
assert.match(shop,/\?8:12/,'the shop must render a smaller bounded preorder batch on mobile');
assert.match(shop,/&limit='\+initialLimit\+'&offset=0/,'the initial request must download only the first visible preorder page');
assert.match(shop,/&cycle='\+encodeURIComponent\(source\.cycleId\)\+'&distributor='\+encodeURIComponent\(source\.distributor\|\|'PRH'\)\+'&limit='\+batchSize\+'&offset='\+source\.nextOffset/,'scroll loading must fetch the next page from the correct FOC cycle AND the correct distributor -- source.distributor must survive into the load-more request');
assert.match(shop,/public\/preorders\/weeks\?summary=1/,'the shop must discover every open FOC week instead of silently loading only the latest cycle');
assert.match(shop,/filter\(function\(cycle\)\{return cycle\.isOpen;\}\)/,'closed preorder weeks must stay off the normal Comic shop section');
assert.match(shop,/Promise\.all\(open\.map/,'the first bounded page from every open week must be loaded');
assert.match(shop,/prioritizeImage\?'eager':'lazy'/,'the first visible preorder cover must not be lazy loaded');
assert.match(shop,/fetchpriority="high"/,'the first visible preorder cover must receive high network priority');
assert.match(shop,/mp-shop-preorder-grid/,'preorders must live outside the inventory grid that resets during server filtering');
assert.doesNotMatch(shop,/select\.dispatchEvent\(new Event\('change'/,'mounting preorders must not trigger an inventory reset that erases them');
assert.match(shop,/host\.dataset\.woLoaded!=='true'/,'FOC loading must wait until the first inventory page has settled');
assert.match(shop,/mp-shop-preorder-lazy-trigger/,'customers need an explicit fallback to load the deferred FOC section');
assert.match(shop,/observer\.observe\(lazyTrigger\)/,'the initial FOC page must load only when its scroll boundary approaches');
assert.match(shop,/show=isComicCategory\(select&&select\.value\)/,'the preorder loader must only appear inside the Comic category');
assert.doesNotMatch(shop,/category==='all'\|\|category==='comics'/,'preorders must not appear below the unfiltered all-items catalog');
assert.match(shop,/preordersOnly=isComicCategory\(category\)&&subtype==='preorders'/,'the dedicated preorder filter must hide the ordinary inventory grid');
assert.match(shop,/inventoryGrid\.hidden=preordersOnly/,'the dedicated preorder view must contain preorder cards only');
assert.match(shop,/IntersectionObserver/,'additional preorder cards must load near the scroll boundary');
assert.match(shop,/Show more preorders/,'customers need an accessible manual fallback for incremental loading');
assert.match(shop,/ALL OPEN FOC WEEKS/,'the shop heading must explain that multiple active weeks are included');

// Store report: "this should have the lunar books mixed in here also" --
// /public/preorders and /public/preorders/weeks both default to
// distributor=PRH server-side when no distributor param is sent, so
// fetching them with no distributor at all (the original code) silently
// showed PRH comics only, with Lunar's FOC weeks completely invisible.
assert.match(shop,/var PREORDER_DISTRIBUTORS=\['PRH','Lunar'\];/,'both real distributors must be listed explicitly, not just PRH');
assert.match(shop,/Promise\.all\(PREORDER_DISTRIBUTORS\.map\(function\(distributor\)\{return fetch\(API\+'\/public\/preorders\/weeks\?summary=1&store_id='\+encodeURIComponent\(STORE_ID\)\+'&distributor='\+encodeURIComponent\(distributor\)/,
  'the weeks-summary lookup must be made once per distributor, each with its own explicit &distributor= param -- omitting it silently falls back to PRH-only server-side');
assert.match(shop,/\.catch\(function\(\)\{return\[\];\}\);\}\)\)\.then\(function\(openByDistributor\)\{var open=\[\]\.concat\.apply\(\[\],openByDistributor\);/,
  'a failure fetching one distributor\'s weeks must not sink the other -- each distributor\'s open-cycle list must be caught independently before merging');
assert.match(shop,/cycle='\+encodeURIComponent\(cycle\.id\)\+'&distributor='\+encodeURIComponent\(cycle\.distributor\)\+'&limit='\+initialLimit/,
  'the initial per-cycle catalog fetch must carry that exact cycle\'s own distributor, not a default');
assert.match(shop,/sources\.push\(\{cycleId:page\.cycle&&page\.cycle\.id,distributor:page\.cycle&&page\.cycle\.distributor\|\|'PRH',/,
  'each pagination source must remember its own distributor (read off the real cycle the server returned) so later load-more requests stay on the correct distributor');
assert.match(ui,/Sports cards/,'the main shop filter must include sports cards');
assert.match(ui,/Collectibles/,'the main shop filter must include collectibles');
assert.match(ui,/Graphic novels & manga/,'comic product-type filters must be restored');
assert.match(ui,/Sealed product/,'TCG product-type filters must be restored');
assert.match(ui,/api\/inventory\?limit=48&offset=0/,'navigation art must never download the entire inventory catalog');
assert.match(ui,/pointerenter',hydrateCounterInventory/,'navigation inventory art must wait for customer interaction');
assert.match(shop,/__MP_STOREFRONT_PREFETCH__/,'the small async head script must start the first inventory page before the deferred bundles finish loading');
assert.match(shop,/data-mp-first-product/,'the early response must preload the first product image before the renderer is ready');
assert.match(ui,/cart\.some\(function\(line\)\{return line&&line\.kind==='preorder';\}\)/,'preorder checkout helpers must stay off unrelated pages for visitors without preorder cart lines');

// Mobile back-button support -- opening a cover's detail overlay on /shop
// used to leave no trace in browser history, so hitting back while reading
// a comic's detail exited /shop entirely instead of closing it. Same
// pattern as backlist.js/preorders.js's own dialog().
assert.match(shop,/history\.pushState\(\{mpModal:true\},''\);window\.addEventListener\('popstate',closeDetails\);/,'opening the detail overlay must push a history entry and close on a back-button press');
assert.match(shop,/function closeDetails\(\)\{[\s\S]{0,150}window\.removeEventListener\('popstate',closeDetails\);[\s\S]{0,10}\}/,'closing any other way (X/overlay tap/Escape) must also remove the popstate listener, not leave it dangling');

console.log('Shop preorder details, direct add, and filter contracts passed.');
