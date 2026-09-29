import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const source=fs.readFileSync('backlist.js','utf8');
const render=source.slice(source.indexOf('function renderResults(){'),source.indexOf('// The sentinel',source.indexOf('function renderResults(){')));
const load=source.slice(source.indexOf('async function loadShelves(){'),source.indexOf('function shelfRow('));

test('shelf mode never renders the empty search message',()=>{
  const host={innerHTML:'stale empty message'};
  const context={state:{showShelves:true,results:[]},document:{getElementById:()=>host}};
  vm.createContext(context);
  vm.runInContext(render,context);
  context.renderResults();
  assert.equal(host.innerHTML,'');
  context.state.showShelves=false;
  context.renderResults();
  assert.match(host.innerHTML,/No titles are published/);
  context.state.q='missing title';
  context.renderResults();
  assert.match(host.innerHTML,/No titles match this search/);
});

for(const failure of [false,true])test(`empty or failed shelves fall back to browsing: failure=${failure}`,async()=>{
  let searches=0;
  const context={state:{showShelves:true,shelves:[]},STORE_ID:'store',document:{getElementById:()=>({innerHTML:''})},api:async()=>{if(failure)throw Error('temporary outage');return {shelves:[]};},renderShelves(){},runSearch:async()=>{searches++;}};
  vm.createContext(context);vm.runInContext(load,context);
  await context.loadShelves();
  assert.equal(searches,1);assert.equal(context.state.showShelves,false);
});

test('late failed shelves do not replace a user search',async()=>{
  let searches=0;
  const context={state:{showShelves:false,shelves:[]},STORE_ID:'store',document:{getElementById:()=>({innerHTML:''})},api:async()=>{throw Error('temporary outage');},renderShelves(){},runSearch:async()=>{searches++;}};
  vm.createContext(context);vm.runInContext(load,context);
  await context.loadShelves();assert.equal(searches,0);
});
