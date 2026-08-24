import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync('preorders.js', 'utf8');

assert.match(source, /cycleObserver:null,lazyReady:false,lastLazyScrollY:0/, 'FOC loader must stay disabled until the initial FOC finishes and the visitor scrolls');
assert.match(source, /new IntersectionObserver\(function\(entries\)/, 'unloaded FOCs must observe viewport proximity');
assert.match(source, /rootMargin:'900px 0px 900px'/, 'the next FOC should start before the user reaches the placeholder');
assert.match(source, /var nextGate=document\.querySelector\('\.mp-foc-cycle-gate'\)/, 'only the next unloaded FOC may be observed, preventing an eager request burst');
assert.match(source, /Math\.abs\(window\.scrollY-state\.lastLazyScrollY\)<160/, 'a render at the same scroll position must not cascade into loading every FOC');
assert.match(source, /loadCycleCatalog\(button\.dataset\.loadCycle\)/, 'viewport entry must load only that FOC catalog');
assert.match(source, /data-load-cycle/, 'manual loading must remain available when IntersectionObserver is unsupported');
assert.doesNotMatch(source, /loadAllCatalogs/, 'the browser must not eagerly download every FOC catalog');

console.log('FOC scroll-loading contract checks passed');
