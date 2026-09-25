import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui = fs.readFileSync('wo-ui.js', 'utf8');
const css = fs.readFileSync('site-polish.css', 'utf8');

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
assert.match(ui, /nav\.hidden=!isComicCategory\(/, 'on /shop the sub-nav must only show for the Comics category');
assert.match(ui, /aria-current="page"/, 'the current section must be marked for assistive tech');
assert.match(ui, /\nmountComicsHub\(\);/, 'mountComicsHub must actually be called');

assert.match(css, /\.mp-comics-hub-links \{[^}]*grid-template-columns: repeat\(4/);
assert.match(css, /@media \(max-width: 767px\) \{\s*\.mp-comics-hub \{/, 'sub-nav needs its own phone layout');

console.log('Comics sub-nav and Cool Stuff nav checks passed');
