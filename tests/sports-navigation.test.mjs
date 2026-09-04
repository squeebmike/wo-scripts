import assert from 'node:assert/strict';
import fs from 'node:fs';

const home=fs.readFileSync(new URL('../homepage-redesign.js',import.meta.url),'utf8');
const ui=fs.readFileSync(new URL('../wo-ui.js',import.meta.url),'utf8');

const configStart=home.indexOf('var CATEGORY_CONFIG=[');
const configEnd=home.indexOf('];',configStart);
assert.ok(configStart>=0&&configEnd>configStart,'homepage category configuration must exist');
const config=home.slice(configStart,configEnd);
assert.equal((config.match(/slug:'sports-cards'/g)||[]).length,1,'the homepage must show Sports exactly once');
assert.match(config,/{slug:'supplies',label:'Supplies'/,'the sixth homepage aisle must remain Supplies');
assert.match(ui,/sports:NAV_ART\.sports|image:NAV_ART\.sports/,'the Shop navigation must use sports-card artwork instead of supplies artwork');
assert.match(ui,/if\(\/sport\|baseball\|basketball\|football\|hockey\|soccer\|topps\|panini\|bowman\//,'live Sports inventory must classify into the Sports navigation tile');

console.log('Homepage category and Sports navigation checks passed.');
