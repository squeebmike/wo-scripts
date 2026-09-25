import assert from 'node:assert/strict';
import fs from 'node:fs';

const loader = fs.readFileSync('comic-new-releases-loader.js', 'utf8');
const app = fs.readFileSync('comic-new-releases.js', 'utf8');

// --- Loader: only claims its own page, never leaks onto every page --------
assert.match(loader, /location\.pathname\.replace\(\/\\\/\$\/,''\)\|\|'\/'\)!==.\/comic-new-releases-the-mana-pocket./, 'loader must only mount on the real duplicated page path');
assert.match(loader, /document\.querySelector\('script\[data-mp-cnr\]'\)/, 'loader must guard against double-mounting');
assert.match(loader, /footer\.parentNode\.insertBefore\(app,footer\)/, 'app shell must mount before the footer, same as preorders.js/backlist.js');
assert.match(loader, /comic-new-releases\.css/);
assert.match(loader, /comic-new-releases\.js/);

// --- App: hits the real backend endpoint with the real store id -----------
assert.match(app, /still-resonance-4f87\.swarnerauto\.workers\.dev/, 'must call the real deployed Worker, not a placeholder');
assert.match(app, /STORE_ID='0f9dd4bc-42a7-487e-a972-2905d24513e9'/, 'must use The Mana Pocket\'s real store id');
assert.match(app, /\/public\/comics\/new-releases/, 'must call the real backend endpoint');

// --- App: the boot-class leak that broke /preorders must not recur here ---
// (see preorders.js's own mount() -- preorders-loader.js's html.mp-foc-boot
// class was never removed, leaving the My Pocket nav button stuck
// icon-only forever; comic-new-releases-loader.js adds the equivalent
// html.mp-cnr-boot class, so mount() here must clean it up.)
assert.match(loader, /classList\.add\('mp-cnr-boot'\)/);
assert.match(app, /classList\.remove\('mp-cnr-boot'\)/, 'mount() must remove the loader\'s temporary boot class, or it leaks permanently like the /preorders bug did');

// --- App: real week-based SEO, not a static/empty page -----------------
assert.match(app, /document\.title=title/);
assert.match(app, /rel="canonical"/);
assert.match(app, /application\/ld\+json/);
assert.match(app, /'@type':'ItemList'/);

// --- App: week-param deep link and prev/next navigation ----------------
assert.match(app, /new URLSearchParams\(location\.search\)\.get\('week'\)/, 'must support a ?week= deep link for sharing a specific week');
assert.match(app, /shiftWeek\(-7\)/);
assert.match(app, /shiftWeek\(7\)/);

// --- App: the three link-through states from the backend must be handled --
assert.match(app, /cover\.linkType==='preorder'/);
assert.match(app, /cover\.linkType==='shop'/);
assert.match(app, /cover\.linkType==='backlist'/);
assert.match(app, /Not currently orderable/, 'a cover with no linkType must show as informational, not a broken/dead link');

// --- App: Whatnot-show info fields render without needing a click ---------
assert.match(app, /cover\.coverArtist/);
assert.match(app, /cover\.description/);
assert.match(app, /mp-cnr-badge/, 'ratio/incentive/foil badge must be visible on the card itself');

// --- App: PRH/Lunar distributor toggle ------------------------------------
assert.match(app, /requestedDistributor/, 'must read ?distributor= for a shareable deep link');
assert.match(app, /distributor==='Lunar'\?'Lunar':'PRH'/, 'must validate the distributor param, same pattern as the backend');
assert.match(app, /switchDistributor/, 'must let a visitor switch between PRH and Lunar views');
assert.match(app, /params\.set\('distributor','Lunar'\)/, 'must pass the distributor through to the backend endpoint');
assert.match(app, /mp-cnr-distributor-toggle/);
assert.match(app, /mp-cnr-distributor-btn/);

// --- CSS: one card per row on phones, not a cramped two-up grid -----------
var css = fs.readFileSync('comic-new-releases.css', 'utf8');
var phoneBlock = css.match(/@media\(max-width:480px\)\{[\s\S]*?\n\}/);
assert.ok(phoneBlock, 'must have a phone breakpoint for the grid');
assert.match(phoneBlock[0], /\.mp-cnr-grid\{grid-template-columns:1fr/, 'phone width must show one comic per row, not a squeezed two-up grid');
// ...but nothing wider may force a single column: narrow/zoomed desktop
// windows land in the 481-640px range and showed one huge book per row.
for (const block of css.match(/@media\(max-width:(\d+)px\)\{[\s\S]*?\n\}/g)) {
  const width = Number(block.match(/max-width:(\d+)px/)[1]);
  if (width > 480) assert.doesNotMatch(block, /\.mp-cnr-grid\{grid-template-columns:1fr/, `a ${width}px breakpoint must not force one comic per row`);
}

console.log('Comic new-releases frontend structural checks passed');

// --- Sticky week picker follows the site nav's scroll-hide -----------------
assert.match(app, /nav\.classList\.contains\('is-hidden'\)/, 'must track the site nav\'s own is-hidden class');
assert.match(app, /classList\.toggle\('mp-cnr-nav-hidden'/);
const cssAll = fs.readFileSync('comic-new-releases.css', 'utf8');
assert.match(cssAll, /html\.mp-cnr-nav-hidden #mp-cnr-app \.mp-cnr-weeknav\{top:/, 'picker must move up when the nav hides');
assert.match(cssAll, /transition:top \.28s ease/, 'picker must slide on the same timing as the nav');
// Phone: one row, arrow-only buttons, full text still available to screen readers.
assert.match(cssAll, /\.mp-cnr-weeknav\{flex-wrap:nowrap/);
assert.match(cssAll, /\.mp-cnr-button-text\{display:none\}/);
assert.match(app, /aria-label="Previous week"/);
assert.match(app, /aria-label="Next week"/);
console.log('Comic new-releases sticky picker checks passed');
