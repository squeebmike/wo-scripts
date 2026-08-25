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
