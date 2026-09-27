import assert from 'node:assert/strict';
import fs from 'node:fs';

// The Pokémon and MTG set viewers share one script and stylesheet.
const js = fs.readFileSync('set-guide.js', 'utf8');
const css = fs.readFileSync('set-guide.css', 'utf8');
assert.ok(/^[\x00-\x7f]*$/.test(js), 'ASCII only, so no charset can garble the UI text');
assert.match(js, /\/public\/pokemon\/sets/, 'Pokémon sets come from the public cached worker route');
assert.match(js, /\/public\/pokemon\/set-cards\?set=/);
assert.doesNotMatch(js, /pricing\/pokemon|pokemontcg\.io|X-Api-Key/, 'no signed-in pricing proxy, no dead fallback, no key in the page');
assert.match(js, /api\.scryfall\.com\/sets/);
assert.match(js, /partner\.tcgplayer\.com\/k443Ov\?u=/, 'TCGplayer links keep the affiliate id');
assert.match(js, /querySelectorAll\('\[data-set-guide\]'\)/);
for (const view of ['grid', 'list']) assert.match(js, new RegExp(`\\['${view}',`), `${view} view`);
assert.match(js, /touchend/, 'swipe between cards in the viewer');
assert.match(css, /\.sg button,\.sg-viewer button\{[^}]*min-height:0/, 'site-wide button styles cannot stretch the controls');
assert.match(css, /\.sg-grid\{display:grid;gap:10px;grid-template-columns:repeat\(2,minmax\(0,1fr\)\)\}/, 'two cards across on a phone');
assert.match(css, /\.sg,\.sg-viewer\{--sg-bg/, 'the card viewer (outside .sg) gets the colors too');
console.log('Set guide checks passed');
