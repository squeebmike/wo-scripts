const {chromium,expect}=require(process.env.PLAYWRIGHT_MODULE || 'playwright/test');
const fs=require('node:fs');
const script=fs.readFileSync(require('node:path').join(__dirname,'../storefront-checkout.js'),'utf8');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const signedIn of [true,false]){
  const page=await browser.newPage({viewport:{width:390,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  let checkoutBody,checkoutAuth;
  await page.route('**/*',async route=>{
   const url=new URL(route.request().url());
   if(url.hostname==='checkout.test')return route.fulfill({contentType:'text/html',body:'<button id="wo-cart-checkout">Checkout</button>'});
   if(url.pathname==='/public/account/summary')return route.fulfill({json:{ok:true,linked:true,customer:{loyaltyPointsBalance:800}}});
   if(url.pathname==='/public/storefront/checkout'){checkoutBody=route.request().postDataJSON();checkoutAuth=route.request().headers().authorization;return route.fulfill({json:{ok:true,publishableKey:'pk',clientSecret:'cs',amountCents:1200,pointsRedeemed:800,shippingFeeCents:0,confirmationNumber:'T'}});}
   return route.abort();
  });
  await page.goto('https://checkout.test');
  await page.evaluate((signedIn)=>{
   localStorage.setItem('wo_cart_v1',JSON.stringify([{id:'11111111-2222-4333-8444-555555555555',name:'Booster box',price:20,qty:1}]));
   if(signedIn)localStorage.setItem('mp-foc-session-v1',JSON.stringify({access_token:'tok123',expires_at:Math.floor(Date.now()/1000)+3600}));
   window.WO={setCart:()=>{}};
   window.Stripe=()=>({elements:()=>({create:()=>({mount:s=>document.querySelector(s).innerHTML='<input>'})})});
  },signedIn);
  await page.addScriptTag({content:script});
  await page.evaluate(()=>window.MPSFC&&window.MPSFC.open?window.MPSFC.open():document.getElementById('wo-cart-checkout').click());
  await page.waitForTimeout(500);
  const summary=page.locator('[data-summary]');
  if(!signedIn){await expect(summary).not.toContainText('Use my points');console.log('guest: no points row');await page.close();continue;}
  await expect(summary).toContainText('Use my points');
  await expect(summary).toContainText('800 pts');
  await expect(summary.locator('.total')).toContainText('$20.00');
  await summary.locator('[data-use-points]').check();
  await expect(summary).toContainText('−$8.00');
  await expect(summary.locator('.total')).toContainText('$12.00');
  await page.locator('#mp-sfc-name').fill('Test Collector');
  await page.locator('#mp-sfc-phone').fill('2025550100');
  await page.locator('[data-continue]').click();
  await expect(page.locator('#mp-sfc-content')).toContainText('Points applied');
  if(checkoutBody.redeemPoints!==800)throw new Error('redeemPoints '+checkoutBody.redeemPoints);
  if(checkoutAuth!=='Bearer tok123')throw new Error('auth '+checkoutAuth);
  console.log('signed in: points applied, body+auth ok', await page.locator('#mp-sfc-content .mp-sfc-summary').innerText());
  if(errors.length)throw new Error(errors.join('\n'));
  await page.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
