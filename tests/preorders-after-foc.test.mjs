import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

// Store request: covers the store ordered from PRH/Lunar stay buyable on
// /preorders after FOC, but only the copies coming that nobody has bought
// yet. The Worker marks the week (cycle.afterFocOpen) and each ordered
// cover (sku.afterFoc + sku.afterFocLeft); this page has to honor them.

const source = fs.readFileSync('preorders.js', 'utf8');
const css = fs.readFileSync('preorders.css', 'utf8');
const pick = name => source.match(new RegExp('function ' + name + '\\([^)]*\\)\\{[\\s\\S]*?\\n\\}|function ' + name + '\\([^)]*\\)\\{.*\\}'))[0];

// Week order: open, then closed weeks with copies left, then expired.
{
  const ctx = {};
  vm.runInNewContext([pick('cycleOpen'), pick('cycleRank'), pick('cycleSellMode'), pick('sortCycleEntries')].join('\n') + ';this.sort=sortCycleEntries;this.mode=cycleSellMode;', ctx);
  const past = new Date(Date.now() - 864e5).toISOString(), future = new Date(Date.now() + 864e5).toISOString();
  const sorted = ctx.sort([
    { cycle:{ id:'expired', status:'open', customer_cutoff_at:past } },
    { cycle:{ id:'after', status:'closed', customer_cutoff_at:past, afterFocOpen:true } },
    { cycle:{ id:'open', status:'open', customer_cutoff_at:future } },
  ]).map(e => e.cycle.id);
  assert.deepEqual(sorted, ['open', 'after', 'expired']);
  assert.equal(ctx.mode({ isOpen:true }), true);
  assert.equal(ctx.mode({ isOpen:false, afterFocOpen:true }), 'after');
  assert.equal(ctx.mode({ isOpen:false }), false);
}

// Covers: only ordered covers with copies left can be added; quantity capped.
assert.match(source, /if\(after\)cycleIsOpen=!!sku\.afterFoc&&afterLeft>0;/);
assert.match(source, /after&&sku\.afterFoc&&!afterLeft\?'Sold out'/);
assert.match(source, /afterLeft===1\?'Last copy left':afterLeft\+' copies left'/);
assert.match(source, /max="'\+\(after&&afterLeft\?Math\.min\(50,afterLeft\):50\)\+'"/);
assert.match(source, /var cap=match\.sku\.afterFoc\?Math\.max\(1,Number\(match\.sku\.afterFocLeft\|\|0\)\):50;/);
assert.match(source, /available:sku\.afterFoc\?Math\.max\(0,Number\(sku\.afterFocLeft\|\|0\)\):50/);
assert.match(source, /familyHtml\(families,cycleSellMode\(cycle\)\)/);
assert.match(source, /familyHtml\(families,cycleSellMode\(entry\.cycle\)\)/);
// Week header, nav and countdown say what's going on.
assert.match(source, /cycle\.afterFocOpen\?'FOC closed · limited copies left'/);
assert.match(source, /entry\.cycle\.afterFocOpen\?'Limited copies'/);
assert.match(source, /if\(!cycle\.isOpen&&cycle\.afterFocOpen\)return'<b>LIMITED<small>COPIES LEFT<\/small><\/b>';/);
// Detail view: copies left instead of a passed deadline, sold out disabled.
assert.match(source, /'<span><b>Copies left<\/b>'/);
assert.match(source, /var action=soldOut\?'<button class="mp-foc-button" type="button" disabled>Sold out<\/button>'/);
assert.match(css, /\.mp-foc-cover \.mp-foc-left\{/);

console.log('After-FOC limited copies checks passed');
