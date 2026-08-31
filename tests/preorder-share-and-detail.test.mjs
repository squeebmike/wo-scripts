import assert from 'node:assert/strict';
import fs from 'node:fs';

const shop=fs.readFileSync(new URL('../shop-preorders.js',import.meta.url),'utf8');
const foc=fs.readFileSync(new URL('../preorders.js',import.meta.url),'utf8');

// Store report: sharing a comic preorder to Facebook always showed the
// generic /shop page preview (sitewide description, no item image), because
// there was no Share button anywhere -- the customer was sharing the whole
// page's own URL, not the item. Both the /shop detail modal and the
// /preorders page needed a real Share action pointed at a URL that actually
// carries this cover's own info to a link-preview scraper.

// ── /shop page: detail modal must offer Share, pointed at the server-
// rendered per-cover page (not this page's own client-rendered URL, which a
// non-JS scraper can never see item-specific content on) ──
assert.match(shop,/function shareUrlFor\(skuId\)\{return API\+'\/preorder\/'\+encodeURIComponent\(skuId\);\}/,'shop share must use the directly reachable Worker preview route instead of Webflow\'s 404 path');
assert.match(shop,/function shareSku\(family,sku,button\)\{/,'missing shareSku on the shop page');
assert.match(shop,/navigator\.share\(\{title:name\+' \| The Mana Pocket',text:'Preorder '\+name\+' at The Mana Pocket',url:url\}\)/,'shop share must use the native share sheet when available');
assert.match(shop,/navigator\.clipboard&&navigator\.clipboard\.writeText/,'shop share must fall back to copying the link on desktop');
assert.match(shop,/data-shop-preorder-share="'\+esc\(sku\.id\)\+'"/,'the detail modal must render a Share button');
assert.match(shop,/overlay\.querySelectorAll\('\[data-shop-preorder-share\]'\)\.forEach\(function\(button\)\{button\.addEventListener\('click',function\(\)\{shareSku\(family,sku,button\);\}\);\}\);/,'the Share button must actually be wired up');

console.log('Shop preorder share button contract checks passed');

// ── /preorders page: same server-rendered share URL, plus the old bare
// cover-image lightbox must be replaced by the same rich detail info (price,
// deadline, release date, publisher, creators, synopsis) the shop page's
// modal already has -- a plain enlarged image wasn't enough to decide
// whether to preorder without leaving to look the title up elsewhere ──
assert.match(foc,/function shareUrlFor\(skuId\)\{return API\+'\/preorder\/'\+encodeURIComponent\(skuId\);\}/,'FOC page share must use the directly reachable Worker preview route');
assert.match(foc,/function shareSku\(family,sku,button\)\{/,'missing shareSku on the FOC page');
assert.match(foc,/function skuDetailHtml\(family,sku,cycle\)\{/,'missing the rich detail-modal renderer');
assert.match(foc,/<b>Price<\/b>/,'FOC detail modal must show price');
assert.match(foc,/<b>Preorder deadline<\/b>/,'FOC detail modal must show the preorder deadline');
assert.match(foc,/<b>Release date<\/b>/,'FOC detail modal must show the release date');
assert.match(foc,/<b>Publisher<\/b>/,'FOC detail modal must show the publisher');
assert.match(foc,/Synopsis/,'FOC detail modal must show the synopsis');
assert.match(foc,/data-detail-share="'\+esc\(sku\.id\)\+'"/,'FOC detail modal must render a Share button');
assert.doesNotMatch(foc,/mp-foc-lightbox/,'the old bare-image lightbox must be fully replaced, not left dangling alongside the new modal');
assert.match(foc,/document\.querySelectorAll\('\[data-lightbox\]'\)\.forEach\(function\(button\)\{button\.addEventListener\('click',function\(\)\{openSkuDetail\(button\.dataset\.lightbox\);\}\);\}\);/,'clicking a cover must open the rich detail modal, not the old lightbox');

console.log('FOC page detail-modal and share button contract checks passed');

// ── A shared link (?sku=... with no add/request modifier) must land the
// visitor straight in the detail modal, not just scrolled to a filtered
// grid -- that was the whole point of making the modal richer ──
assert.match(foc,/else\{openSkuDetail\(skuId\);\}\}/,'a plain ?sku= deep link must open the detail modal by default');
assert.match(foc,/if\(params\.get\('add'\)==='1'&&match\.sku\.canPreorder\)\{addPreorderLine\(skuId,1\);\}else if\(params\.get\('request'\)==='1'\|\|match\.sku\.waitlistOnly\)\{requestWaitlist\(skuId,1\);\}else\{openSkuDetail\(skuId\);\}/,'existing add=1/request=1/waitlist-only deep-link behavior must be unchanged');

console.log('FOC page deep-link contract checks passed');
