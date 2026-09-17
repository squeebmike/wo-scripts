import assert from 'node:assert/strict';
import fs from 'node:fs';

// Store request: PRH and Lunar are two separate comics distributors this
// store gets weekly FOC files from (ArSca's dashboard already keeps their
// cycles apart on its own FOC Wall) -- the customer-facing /preorders page
// needed the same split instead of interleaving both distributors' weeks
// under one "latest cycle" view, or defaulting silently to only one.

const source = fs.readFileSync('preorders.js', 'utf8');
const loaderSource = fs.readFileSync('preorders-loader.js', 'utf8');

// Store report (live, after first deploy): the toggle never appeared on
// themanapocket.com/preorders at all -- no error, just silently absent.
// Root cause: preorders-loader.js is parser-blocking and ALWAYS builds the
// #mp-foc-app critical shell first (specifically to avoid layout shift
// before preorders.js and its CSS finish loading -- see its own comment).
// By the time preorders.js's mount() runs, #mp-foc-app already exists, so
// its own `if(!app){...}` branch (which is the only place the toggle
// markup was originally added) never executes -- renderDistributorTabs()
// then finds no [data-distributor-tabs] element in the DOM and silently
// no-ops. The toggle slot must exist in BOTH shells, or it only ever
// renders on some hypothetical code path that never actually runs in
// production.
assert.match(loaderSource, /data-distributor-tabs/, 'the loader\'s own critical shell (which always builds #mp-foc-app before preorders.js runs) must include the distributor-tabs slot, not just preorders.js\'s dead fallback path');

assert.match(source, /distributor:'PRH'/, 'PRH must stay the default distributor so a bookmarked/shared /preorders link with no distributor keeps showing exactly what it always has');
assert.match(source, /function renderDistributorTabs\(\)/, 'a distributor tab renderer must exist');
assert.match(source, /function switchDistributor\(distributor\)/, 'a distributor switch handler must exist');

// Both catalog fetches must actually pass the current distributor through,
// or the toggle would just relabel itself without changing what loads.
assert.match(source, /\/public\/preorders\/weeks\?summary=1&distributor='\+encodeURIComponent\(state\.distributor\)/, 'the weekly-catalog-index fetch must filter by the active distributor');
assert.match(source, /\/public\/preorders\?store_id='\+encodeURIComponent\(STORE_ID\)\+'&distributor='\+encodeURIComponent\(state\.distributor\)/, 'the single-cycle catalog fetch must filter by the active distributor');

// Switching distributors is a full reload under a different account, not a
// filter over already-loaded data -- stale weeks/lazy-load state/observer
// from the previous distributor must not bleed into the new one.
assert.match(source, /switchDistributor\(distributor\)\{[\s\S]{0,200}state\.cycles=null;state\.lazyReady=false/, 'switching distributors must clear the previous distributor\'s loaded cycles and lazy-load readiness');
assert.match(source, /switchDistributor\(distributor\)\{[\s\S]{0,400}state\.cycleObserver\.disconnect\(\)/, 'switching distributors must disconnect any in-flight lazy-load observer from the old distributor\'s DOM');

// A shared link to one exact cover doesn't say which distributor it came
// from -- the page must try the other distributor before treating the sku
// as not found.
assert.match(source, /async function ensureDeepLinkCatalog\(\)\{[\s\S]{0,900}state\.distributor==='Lunar'\?'PRH':'Lunar'/, 'a ?sku= deep link not found under the default distributor must fall back to checking the other one');

console.log('Preorders distributor-toggle contract checks passed');
