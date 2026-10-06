import assert from 'node:assert/strict';
import {test} from 'node:test';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../account.js',import.meta.url),'utf8');
const fn=source.slice(source.indexOf('async function loadBookAlerts(){'),source.indexOf('async function loadOverview(){'));
function element(){return {innerHTML:'',textContent:'',children:[],events:{},appendChild(c){this.children.push(c);},addEventListener(n,f){this.events[n]=f;},remove(){this.removed=true;}};}
async function mount(fail=false){
  const list=element(),out=element(),more=element(),host=element(),calls=[];
  host.querySelector=s=>({'[data-alert-list]':list,'[data-alert-status]':out,'[data-more-alerts]':more}[s]);
  const context={panel:()=>host,esc:String,dateLabel:()=> 'Oct 2',statusHtml:s=>s,
    document:{createElement(){const card=element(),cancel=element(),state=element();card.cancel=cancel;card.state=state;card.querySelector=s=>s==='[data-alert-state]'?state:card.innerHTML.includes('data-cancel-alert')?cancel:null;return card;}},
    api:async(path,options)=>{calls.push({path,options});if(options){if(fail)throw Error('Try again');return{ok:true};}return{alerts:[{id:'ours',book:'X-Men #1',event:'preorder_open',status:'active'},{id:'done',book:'Other #1',event:'in_stock',status:'sent',sent_at:'2026-10-02'}],nextOffset:null};}};
  vm.createContext(context);vm.runInContext(fn,context);await context.loadBookAlerts();return{list,out,more,calls};
}
test('renders owned alerts and cancels only the selected alert',async()=>{
  const f=await mount();assert.equal(f.list.children.length,2);assert.equal(f.more.hidden,true);
  await f.list.children[0].cancel.events.click();
  assert.deepEqual(JSON.parse(f.calls[1].options.body),{id:'ours'});assert.equal(f.calls[1].options.method,'PATCH');
  assert.equal(f.list.children[0].state.textContent,'Stopped');assert.equal(f.list.children[0].cancel.removed,true);
  assert.equal(f.list.children[1].cancel.events.click,undefined);
});
test('failed cancellation leaves the alert visible and allows retry',async()=>{
  const f=await mount(true);await f.list.children[0].cancel.events.click();
  assert.equal(f.list.children[0].cancel.disabled,false);assert.equal(f.list.children[0].cancel.removed,undefined);assert.equal(f.out.innerHTML,'Try again');
});
test('login preserves the alerts destination',()=>{
  assert.match(source,/encodeURIComponent\(currentPath\(\)\+location.search\)/);
  assert.match(source,/path:'\/account\?section=alerts',key:'alerts'/);
});
