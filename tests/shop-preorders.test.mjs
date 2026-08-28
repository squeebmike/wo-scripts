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
assert.match(shop,/&limit='\+batchSize\+'&offset='\+nextOffset/,'scroll loading must fetch the next preorder page from the server');
assert.match(shop,/prioritizeImage\?'eager':'lazy'/,'the first visible preorder cover must not be lazy loaded');
assert.match(shop,/fetchpriority="high"/,'the first visible preorder cover must receive high network priority');
assert.match(shop,/mp-shop-preorder-grid/,'preorders must live outside the inventory grid that resets during server filtering');
assert.doesNotMatch(shop,/select\.dispatchEvent\(new Event\('change'/,'mounting preorders must not trigger an inventory reset that erases them');
assert.match(shop,/host\.dataset\.woLoaded!=='true'/,'FOC loading must wait until the first inventory page has settled');
assert.match(shop,/mp-shop-preorder-lazy-trigger/,'customers need an explicit fallback to load the deferred FOC section');
assert.match(shop,/observer\.observe\(lazyTrigger\)/,'the initial FOC page must load only when its scroll boundary approaches');
assert.match(shop,/IntersectionObserver/,'additional preorder cards must load near the scroll boundary');
assert.match(shop,/Show more preorders/,'customers need an accessible manual fallback for incremental loading');
assert.match(ui,/Sports cards/,'the main shop filter must include sports cards');
assert.match(ui,/Collectibles/,'the main shop filter must include collectibles');
assert.match(ui,/Graphic novels & manga/,'comic product-type filters must be restored');
assert.match(ui,/Sealed product/,'TCG product-type filters must be restored');
assert.match(ui,/api\/inventory\?limit=48&offset=0/,'navigation art must never download the entire inventory catalog');
assert.match(ui,/pointerenter',hydrateCounterInventory/,'navigation inventory art must wait for customer interaction');
assert.match(shop,/__MP_STOREFRONT_PREFETCH__/,'the small async head script must start the first inventory page before the deferred bundles finish loading');
assert.match(shop,/data-mp-first-product/,'the early response must preload the first product image before the renderer is ready');
assert.match(ui,/cart\.some\(function\(line\)\{return line&&line\.kind==='preorder';\}\)/,'preorder checkout helpers must stay off unrelated pages for visitors without preorder cart lines');

console.log('Shop preorder details, direct add, and filter contracts passed.');
