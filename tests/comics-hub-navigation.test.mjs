import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui = fs.readFileSync('wo-ui.js', 'utf8');

// --- Sitewide nav: polishNavigation() rebuilds the Cool Stuff menu from
// COOL_LINKS on every page load (wiping whatever the Designer has), so a
// comics destination missing from this array is missing from the live nav.
const cool = ui.match(/var COOL_LINKS=\[[\s\S]*?\];/);
assert.ok(cool, 'COOL_LINKS must exist');
for (const href of ['/comic-new-releases-the-mana-pocket', '/preorders', '/books']) {
  assert.ok(cool[0].includes(`href:'${href}'`), `Cool Stuff nav must link to ${href}`);
}

// --- Shared comics sub-nav: all four comics destinations, on all four pages.
const hub = ui.match(/var COMICS_HUB_LINKS=\[[\s\S]*?\];/);
assert.ok(hub, 'COMICS_HUB_LINKS must exist');
for (const href of ['/comic-new-releases-the-mana-pocket', '/preorders', '/shop?cat=comics', '/books']) {
  assert.ok(hub[0].includes(`href:'${href}'`), `comics sub-nav must link to ${href}`);
}
const pages = ui.match(/var COMICS_HUB_PAGES=\{[\s\S]*?\n\};/);
assert.ok(pages, 'COMICS_HUB_PAGES must exist');
for (const [path, container] of [['/comic-new-releases-the-mana-pocket', '#mp-cnr-app'], ['/preorders', '#mp-foc-app'], ['/books', '#mp-backlist-app']]) {
  assert.ok(pages[0].includes(`'${path}'`), `sub-nav must mount on ${path}`);
  assert.ok(pages[0].includes(`${container} header`), `sub-nav on ${path} must target that page's real app header`);
}
// Container ids must match what each page's loader actually creates.
assert.match(fs.readFileSync('comic-new-releases-loader.js', 'utf8'), /app\.id='mp-cnr-app'/);
assert.match(fs.readFileSync('preorders-loader.js', 'utf8'), /app\.id='mp-foc-app'/);
assert.match(fs.readFileSync('backlist-loader.js', 'utf8'), /app\.id='mp-backlist-app'/);

assert.ok(pages[0].includes("'/shop':{key:'shop'}"), 'sub-nav must also appear on /shop');
assert.match(ui, /nav\.hidden=!\/\^comics\?\$\/\.test\(category\)/, 'on /shop the sub-nav must only show for the Comics category');
assert.match(ui, /aria-current="page"/, 'the current section must be marked for assistive tech');
assert.match(ui, /\nmountComicsHub\(\);/, 'mountComicsHub must actually be called');


// Styles must ship inside wo-ui.js: the site head pins an older
// site-polish.css, and loadSitePolish() won't load a newer one over it --
// that's exactly how the strip went live completely unstyled.
assert.match(ui, /var COMICS_HUB_CSS=\[/);
assert.match(ui, /style\.setAttribute\('data-mp-comics-hub-css',''\)/);
assert.match(ui, /@media\(max-width:767px\)\{\.mp-comics-hub/, 'sub-nav needs its own compact phone layout');
assert.doesNotMatch(fs.readFileSync('site-polish.css', 'utf8'), /mp-comics-hub/, 'hub styles must live in one place');
// BCW: restyle/relocate the footer's big button (same id) instead of adding a second one.
assert.match(ui, /document\.getElementById\('bcw-supplies-link'\)/);
assert.match(ui, /bcw\.hidden=!\(category==='all'\|\|category==='supplies'\)/, 'BCW link only on All / Supplies');
console.log('Comics sub-nav and Cool Stuff nav checks passed');

// --- /shop: the strip must never become the filter bar's next sibling.
// Matched live: shop-preorders.js took controls.nextElementSibling as the
// in-stock grid, so with the strip there it inserted comic preorders ABOVE
// in-stock comics and copied the grid's column layout from the strip (none),
// rendering every preorder cover full-width, one per row.
assert.match(ui, /controls\.insertAdjacentElement\('beforebegin',nav\)/, 'shop sub-nav must go above the filter bar, not after it');
assert.doesNotMatch(ui, /controls\.insertAdjacentElement\('afterend',nav\)/);
const shopPreorders = fs.readFileSync('shop-preorders.js', 'utf8');
assert.match(shopPreorders, /inventoryGrid=controls&&host\.querySelector\('\.wo-live-grid:not\(\.mp-shop-preorder-grid\)'\)/, 'shop-preorders must find the in-stock grid by class, not by position');
assert.doesNotMatch(shopPreorders, /inventoryGrid=controls&&controls\.nextElementSibling/);
console.log('Shop comics sub-nav placement checks passed');
