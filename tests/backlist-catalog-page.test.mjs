import assert from 'node:assert/strict';
import fs from 'node:fs';

// Store request: sell PRH's entire backlist catalog (comics AND regular
// books) on themanapocket.com, with a longer delivery estimate than either
// in-stock or FOC-preorder items since it rides the next weekly PRH order
// rather than shipping from shelf stock or a specific street date. Built
// as its own page (not folded into /preorders' PRH/Lunar distributor
// tabs, which are about FOC-week distributor accounts -- a different axis
// entirely from "browse the whole always-orderable catalog").

const loaderSource = fs.readFileSync('backlist-loader.js', 'utf8');
const source = fs.readFileSync('backlist.js', 'utf8');

// The loader must guard on the real page path, claim it exactly once, and
// build its own critical shell before backlist.js/backlist.css even load --
// same "avoid a layout jump" reasoning as preorders-loader.js, and the same
// bug class that toggle fix guarded against: the shell must carry the real
// mount point (data-bl-dynamic), not just backlist.js's own defensive
// fallback path, or a change to one and not the other silently breaks in
// production while looking fine in code review.
assert.match(loaderSource, /location\.pathname\.replace\(\/\\\/\$\/,''\)\|\|'\/'\)!=='\/books'/, 'the loader must only claim the /books page');
assert.match(loaderSource, /data-mp-backlist/, 'the loader must claim the page exactly once via a marker script tag');
assert.match(loaderSource, /data-bl-dynamic/, 'the loader\'s own critical shell must include the dynamic mount point backlist.js renders into');
assert.match(source, /function dynamicHost\(\)\{return document\.querySelector\('\[data-bl-dynamic\]'\);\}/, 'backlist.js must mount into the same slot the loader\'s shell provides');

// Same account system as the comic-preorders page -- a customer signed in
// on /preorders must be recognized on /books without signing in again, and
// vice versa, since it's one account for both.
assert.match(source, /SESSION_KEY='mp-foc-session-v1'/, 'must reuse the exact same localStorage session key preorders.js uses, or a signed-in customer is not recognized across pages');
assert.match(source, /SUPABASE_URL='https:\/\/vroknjrxubsqyexngwus\.supabase\.co'/, 'must point at the same Supabase project preorders.js uses');

// The cart here is deliberately its own (mp-backlist-cart-v1), separate
// from the shared regular/preorder cart (wo_cart_v1 via window.WO) -- this
// keeps the new checkout self-contained rather than threading a third mode
// through storefront-checkout.js's shared, already-live-money-handling
// modal, which this build did not attempt to modify.
assert.match(source, /CART_KEY='mp-backlist-cart-v1'/, 'backlist must keep its own cart key, not silently share wo_cart_v1');
assert.match(source, /function addToCart\(line\)\{/, 'missing addToCart');
assert.match(source, /function removeFromCart\(id\)\{/, 'missing removeFromCart');

// Checkout must hit the new backlist-specific endpoint, require sign-in
// first (requireSession), and actually mount a real Stripe Elements
// payment form using the clientSecret/publishableKey the checkout response
// returns -- not just show a fake "order placed" message.
assert.match(source, /function beginCheckout\(\)\{[\s\S]{0,80}requireSession\(openCheckoutModal\)/, 'checkout must require sign-in before opening the payment flow');
assert.match(source, /api\('\/public\/backlist\/checkout',\{method:'POST'/, 'must call the backlist checkout route, not the FOC preorder or regular storefront one');
assert.match(source, /client\.elements\(\{clientSecret:data\.clientSecret/, 'must mount real Stripe Elements from the checkout response, not fake a success screen');
assert.match(source, /client\.confirmPayment\(\{elements:elements,redirect:'if_required'\}\)/, 'must actually confirm the payment with Stripe, not just show a success message on submit');

// A real delivery estimate must be shown per result, not just a price --
// this is the core "don't misrepresent how long this takes" requirement.
assert.match(source, /sku\.delivery\.headline/, 'each result card must show the computed delivery estimate, not just price');

// Browse-by-default: the page used to only ever call the search endpoint
// once someone typed something, showing an empty "search to get started"
// wall otherwise -- backlistSearch already supported an empty q as a real
// "browse everything" request, only the frontend never asked. mount() must
// now call runSearch() unconditionally, and the empty-results copy must no
// longer claim nothing loads without typing first.
assert.match(source, /runSearch\(\);\s*\n\s*loadFacets\(\)\.then\(renderFilters\);/, 'mount() must call runSearch() unconditionally (browse mode) and load facets in parallel, not gate the search behind a typed query');
assert.doesNotMatch(source, /Search PRH's full catalog above to get started/, 'the old "type to see anything" empty-state copy must be gone now that browsing works without a query');

// Publisher/format filters -- populated from the new /public/backlist/facets
// route and re-rendered in place (not wiping results already on screen).
assert.match(source, /api\('\/public\/backlist\/facets\?store_id='/, 'must call the new facets route to populate the filter dropdowns');
assert.match(source, /id="mp-bl-filter-publisher"/, 'missing the publisher filter dropdown');
assert.match(source, /id="mp-bl-filter-format"/, 'missing the format/category filter dropdown');
assert.match(source, /if\(e\.target\.id==='mp-bl-filter-publisher'\)\{state\.publisher=e\.target\.value;runSearch\(\);return;\}/, 'changing the publisher filter must re-run the search with the new filter applied');
assert.match(source, /if\(e\.target\.id==='mp-bl-filter-format'\)\{state\.format=e\.target\.value;runSearch\(\);return;\}/, 'changing the format filter must re-run the search with the new filter applied');
assert.match(source, /if\(state\.publisher\)params\.set\('publisher',state\.publisher\);/, 'the publisher filter must actually be sent to the search request');
assert.match(source, /if\(state\.format\)params\.set\('format',state\.format\);/, 'the format filter must actually be sent to the search request');

// Each card should surface its category/format (what the user asked to
// "show categories" means in practice), not just title/publisher/price.
assert.match(source, /title\.formatName\?'<span class="mp-bl-card-format">'/, 'each result card must show its format/category badge');

// Pagination -- 22,987+ titles cannot be one unpaginated page, and it must
// be infinite-scroll (an IntersectionObserver-triggered auto-load, same
// pattern preorders.js's bindCycleLazyLoading already uses), not a manual
// "load more" button.
assert.doesNotMatch(source, /mp-bl-loadmore-btn/, 'must not use a manual load-more button');
assert.match(source, /state\.hasMore\?'<div class="mp-bl-scroll-sentinel" data-bl-sentinel><\/div>':''/, 'must render a scroll sentinel for the lazy-load observer when more results exist');
assert.match(source, /function bindScrollLazyLoading\(\)\{/, 'missing the infinite-scroll IntersectionObserver binder');
assert.match(source, /new IntersectionObserver\(function\(entries\)\{[\s\S]{0,200}runSearch\(true\)/, 'the scroll observer must auto-append the next page, not require a click');
assert.match(source, /state\.results=append\?state\.results\.concat\(results\):results;/, 'auto-load must append new results to the existing list, not replace it');

// Every card must open a real detail view (cover, synopsis, per-format
// price/delivery, share) -- as an in-page dialog via /public/backlist/title,
// not a navigation to /book/{id}. That SEO page is real (backlistBookDetailPage
// in backlist-catalog.mjs) but themanapocket.com/book/* currently 404s in
// production due to a Cloudflare routing/DNS issue outside this repo's
// control -- linking cards to it would leave the whole detail/share feature
// broken on the live site until that infra issue is fixed elsewhere.
// /public/backlist/title/:id hits the Worker's own subdomain the same way
// every other backlist API call already does, sidestepping that entirely,
// matching how preorders.js's own comic detail view is a dialog, not a
// navigation to /preorder/{id}.
assert.match(source, /data-open-detail="'\+esc\(title\.id\)\+'"/, 'each card must open the detail dialog (cover, title, and the "Details & share" line), not navigate to /book/{id}');
assert.doesNotMatch(source, /href="'\+detailHref/, 'cards must not link to /book/{id} -- that route currently 404s in production');
assert.match(source, /function backlistDetailHtml\(title,skus\)\{/, 'missing the detail dialog renderer');
assert.match(source, /async function openBacklistDetail\(titleId\)\{/, 'missing the detail dialog opener');
assert.match(source, /api\('\/public\/backlist\/title\/'\+encodeURIComponent\(titleId\)/, 'the detail dialog must fetch the real title record, not reuse the trimmed search-result data');
assert.match(source, /title\.description\?'<h4>Synopsis<\/h4><p>'/, 'the detail dialog must show the full synopsis');
assert.match(source, /detailBtn=e\.target\.closest\('\[data-open-detail\]'\)/, 'missing the click handler that opens the detail dialog');

// Share button inside the detail dialog -- same navigator.share / clipboard /
// prompt fallback chain preorders.js's shareSku() already established.
// Shares /books?q=<title> (a real, already-working page) rather than the
// canonical but currently-broken /book/{id} URL, so a shared link actually
// opens something instead of another 404.
assert.match(source, /function shareBacklistTitle\(title,button\)\{/, 'missing the share handler');
assert.match(source, /var url=location\.origin\+'\/books\?q='\+encodeURIComponent\(title\);/, 'share must point at a URL that actually works today');
assert.match(source, /navigator\.share/, 'share must use the real Web Share API');
assert.match(source, /navigator\.clipboard/, 'share must fall back to copying the link');
assert.match(source, /window\.prompt\('Copy this link:',url\)/, 'share must fall back to a prompt as a last resort, same as preorders.js');

console.log('Backlist catalog page (loader shell, shared session, self-contained cart/checkout, browse+filters+pagination, detail-page links) checks passed');
