import assert from 'node:assert/strict';
import fs from 'node:fs';

const checkout=fs.readFileSync(new URL('../storefront-checkout.js',import.meta.url),'utf8');

// Mobile back-button support -- opening the shared checkout panel (regular
// order, comic preorder, or backlist book) used to leave no trace in
// browser history, so hitting back mid-checkout exited the page entirely
// instead of closing the panel. Same pattern as backlist.js/preorders.js's
// own dialog(): push one history entry on open, close on a back-button
// press, and never call history.back() ourselves (avoids a race when one
// dialog immediately opens another).
assert.match(checkout,/history\.pushState\(\{mpModal:true\},''\);window\.addEventListener\('popstate',close\);/,'opening the checkout panel must push a history entry and close on a back-button press');
assert.match(checkout,/function close\(\)\{[\s\S]{0,400}window\.removeEventListener\('popstate',close\);[\s\S]{0,150}\}/,'closing any other way (X/overlay tap/Escape/payment success) must also remove the popstate listener, not leave it dangling');

console.log('Storefront checkout mobile back-button contract checks passed');
