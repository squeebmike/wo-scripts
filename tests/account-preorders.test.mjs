import assert from 'node:assert/strict';
import fs from 'node:fs';

const account=fs.readFileSync(new URL('../account.js',import.meta.url),'utf8');
const preorders=fs.readFileSync(new URL('../preorders.js',import.meta.url),'utf8');

assert.match(account,/data-picks-add-all>Add all to cart</,'the account page must offer one-click bulk cart staging');
assert.match(account,/data-picks-pay-selected>Pay selected</,'the account page must support selective checkout without returning to the FOC wall');
assert.match(account,/data-pick-add=/,'each saved pull must be individually addable to the cart');
assert.match(account,/data-pick-pay=/,'each saved pull must be individually payable');
assert.match(account,/data-pick-remove=/,'each saved pull must have an explicit remove action');
assert.match(account,/method:'DELETE'.*skuIds:\[removeId\]/s,'removing a saved pull must use the item-level server operation');
assert.match(account,/window\.WO\.checkoutPreorderLines\(lines/,'account checkout must open in place instead of redirecting to the preorder catalog');
assert.doesNotMatch(account,/href="\/preorders\?cart=1/,'the old Open pulls & pay redirect must be removed');

assert.match(preorders,/method:'PATCH'.*skuId:skuId,quantity:quantity/s,'adding a cover must upsert the durable saved list explicitly');
assert.doesNotMatch(preorders,/method:'DELETE'.*skuIds:skuIds/s,'the browser must not erase saved pulls before the Worker confirms payment');
assert.match(preorders,/window\.WO\.addComicPreorder=addExternalPreorder/,'the shop must be able to add and save a preorder without redirecting');
assert.match(account,/reconcilePreorderCart\(result\)/,'My Pocket must reconcile signed-in cart preorders into the durable saved list');
assert.doesNotMatch(preorders,/watchCartForChanges/,'cart edits must not be mirrored back into the durable saved list');
assert.doesNotMatch(preorders,/reconcileSavedPicks/,'opening a page must not automatically force every saved pull into the cart');

console.log('Account preorder curation and selective-checkout contracts passed.');

// Saved books ("My Pocket" for backlist) -- lives on the existing
// /account-wishlist page alongside the staff-curated want list, since that's
// the one destination a customer already thinks of as "my wishlist" on this
// site, rather than a third, confusingly-similar page.
assert.match(account,/api\('\/public\/backlist\/picks\?store_id='\+encodeURIComponent\(STORE_ID\)\)/,'the wishlist page must load saved books from the new backlist picks route');
assert.match(account,/function savedBookRowHtml\(pick\)\{/,'missing the saved-book row renderer');
assert.match(account,/data-saved-book-add="'\+esc\(sku\.id\)\+'"/,'each saved book must be addable to the cart');
assert.match(account,/data-saved-book-remove="'\+esc\(sku\.id\)\+'"/,'each saved book must have an explicit remove action');
assert.match(account,/method:'DELETE',body:JSON\.stringify\(\{storeId:STORE_ID,skuIds:\[removeBtn\.dataset\.savedBookRemove\]\}\)/,'removing a saved book must call the backlist picks DELETE route');
assert.match(account,/function addBacklistLineToCart\(line\)\{/,'missing the backlist-cart writer');
assert.match(account,/key='mp-backlist-cart-v1'/,'must write to backlist.js\'s own cart key, not the shared window.WO cart -- the two carts are deliberately separate');
assert.match(account,/function handleSavedBookAction\(event\)\{[\s\S]{0,600}addBacklistLineToCart\(/,'adding a saved book to the cart must go through the dedicated backlist-cart writer, not window.WO');

console.log('Saved-books wishlist contract checks passed.');
