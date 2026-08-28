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
assert.match(shop,/IntersectionObserver/,'additional preorder cards must load near the scroll boundary');
assert.match(shop,/Show more preorders/,'customers need an accessible manual fallback for incremental loading');
assert.match(ui,/Sports cards/,'the main shop filter must include sports cards');
assert.match(ui,/Collectibles/,'the main shop filter must include collectibles');
assert.match(ui,/Graphic novels & manga/,'comic product-type filters must be restored');
assert.match(ui,/Sealed product/,'TCG product-type filters must be restored');
assert.match(ui,/cart\.some\(function\(line\)\{return line&&line\.kind==='preorder';\}\)/,'preorder checkout helpers must stay off unrelated pages for visitors without preorder cart lines');

console.log('Shop preorder details, direct add, and filter contracts passed.');
