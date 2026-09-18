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

console.log('Backlist catalog page (loader shell, shared session, self-contained cart/checkout) checks passed');
