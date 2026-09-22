import assert from 'node:assert/strict';
import fs from 'node:fs';

// Store report: "is there a way to have filters on this? theres posters,
// board and card games, boxes ect!" -- PRH's weekly FOC file (ArSca's
// foc-preorders.mjs normalizePrhRow) mixes real comic issues in with
// non-comic items under the same distributor family/SKU rows -- confirmed
// live: "Non-Book Item" posters (PREDATOR VS. PUNISHER #1 POSTER, MARVEL
// SPOTLIGHT #32 FACSIMILE EDITION POSTER) sat right alongside actual comic
// issues on the FOC Wall with nothing distinguishing them while browsing.
// The real data was already flowing through -- family.comicType comes
// straight from PRH's own ComicType column via loadCatalog -- but
// /preorders never surfaced or filtered on it at all, only publisher/
// cover-artist/cover-kind.

const source = fs.readFileSync('preorders.js', 'utf8');

assert.match(source, /filters:\{q:'',publisher:'all',artist:'all',kind:'all',type:'all'\}/,
  'a type filter state key must exist alongside the other filters, defaulting to "all" so nothing is hidden until a shopper actually picks one');

assert.match(source, /var types=unique\(state\.cycles\.flatMap\(function\(e\)\{return\(e\.families\|\|\[\]\)\.map\(function\(f\)\{return f\.comicType\|\|'Comic';\}\);\}\)\);/,
  'the type list must be built from the real comicType values already present in the loaded cycles (same unique() pattern publishers/artists already use), not a hardcoded guess at PRH\'s category names');

assert.match(source, /data-filter="type"/, 'a type filter control must exist in the controls markup');
assert.match(source, /types\.length>1\?/, 'the type dropdown must only render when there is more than one real type to choose between, so a pure-comics week does not show a meaningless single-option filter');

const filterFnStart = source.indexOf('function filteredFamiliesFor(entry){');
assert.ok(filterFnStart >= 0, 'filteredFamiliesFor must exist');
const filterFnEnd = source.indexOf('\n}', filterFnStart) + 2;
const filterFn = source.slice(filterFnStart, filterFnEnd);
assert.match(filterFn, /state\.filters\.type==='all'\|\|\(family\.comicType\|\|'Comic'\)===state\.filters\.type/,
  'filteredFamiliesFor must actually apply the type filter, matching the same comicType-or-"Comic" fallback the dropdown itself is built from');

console.log('Preorders item-type filter (posters/games/boxes vs. comics) checks passed');
