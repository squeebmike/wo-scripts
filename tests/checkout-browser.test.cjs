const {chromium,expect}=require(process.env.PLAYWRIGHT_MODULE || 'playwright/test');
const fs=require('node:fs');
const path=require('node:path');
const script=fs.readFileSync(path.join(__dirname,'../storefront-checkout.js'),'utf8');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try {
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  let checkoutBody;
  await page.route('**/*',async route=>{
   const url=new URL(route.request().url());
   if(url.hostname==='checkout.test')return route.fulfill({contentType:'text/html',body:'<button id="wo-cart-checkout">Checkout</button>'});
   if(url.pathname==='/public/storefront/shipping-quote')return route.fulfill({json:{ok:true,shippingFeeCents:700,carrier:'Test carrier',serviceName:'Ground'}});
   if(url.pathname==='/public/storefront/checkout'){checkoutBody=route.request().postDataJSON();return route.fulfill({json:{ok:true,publishableKey:'pk_test_mock',clientSecret:'mock',amountCents:1200,shippingFeeCents:700,confirmationNumber:'TEST-ONLY'}});}
   return route.abort();
  });
  await page.goto('https://checkout.test');
  await page.evaluate(()=>{
   localStorage.setItem('wo_cart_v1',JSON.stringify([{id:'test-item',name:'Test item',price:5,qty:1},{id:'preorder-item',kind:'preorder',price:4,qty:1}]));
   window.WO={setCart:lines=>localStorage.setItem('wo_cart_v1',JSON.stringify(lines))};
   window.Stripe=()=>({elements:()=>({create:()=>({mount:selector=>document.querySelector(selector).innerHTML='<input aria-label="Mock card">'})}),confirmPayment:async()=>({paymentIntent:{status:'succeeded'}})});
  });
  await page.addScriptTag({content:script});
  const trigger=page.locator('#wo-cart-checkout'),close=page.getByRole('button',{name:'Close checkout'});
  await trigger.click();await expect(close).toBeFocused();
  await expect(page.locator('#mp-sfc-address')).toBeHidden();
  await expect(page.locator('[data-summary]')).toContainText('FREE');
  await close.press('Shift+Tab');await expect(page.locator('[data-continue]')).toBeFocused();
  await page.keyboard.press('Tab');await expect(close).toBeFocused();
  await page.keyboard.press('Escape');await expect(trigger).toBeFocused();
  await expect(page.locator('#mp-storefront-checkout')).not.toHaveClass(/is-open/);
  await trigger.click();await expect(close).toBeFocused();
  await page.getByRole('radio',{name:/Ship it to me/}).check();
  await expect(page.locator('#mp-sfc-address')).toBeVisible();
  await expect(page.locator('[data-continue]')).toBeDisabled();
  await page.locator('#mp-sfc-name').fill('Test Collector');
  await page.locator('#mp-sfc-phone').fill('2025550100');
  await page.locator('#mp-sfc-line1').fill('123 Test Street');
  await page.locator('#mp-sfc-city').fill('Seattle');
  await page.locator('#mp-sfc-state').fill('WA');
  await page.locator('#mp-sfc-zip').fill('98101');
  await expect(page.locator('[data-summary]')).toContainText('$12.00');
  await page.locator('[data-continue]').click();
  await expect(page.locator('[data-pay]')).toHaveText('Pay $12.00');
  await expect(close).toBeFocused();
  if(checkoutBody.items.length!==1||checkoutBody.fulfillment.method!=='shipping')throw new Error('Incorrect checkout request');
  await page.locator('[data-pay]').click();
  await expect(page.locator('.mp-sfc-success')).toContainText('TEST-ONLY');
  if(!await page.locator('#mp-storefront-checkout').evaluate(el=>el.contains(document.activeElement)))throw new Error('Confirmation lost keyboard focus');
  const remaining=await page.evaluate(()=>JSON.parse(localStorage.getItem('wo_cart_v1')));
  if(remaining.length!==1||remaining[0].kind!=='preorder')throw new Error('Unpaid preorder removed');
  await close.click();
  await page.evaluate(()=>window.MPSFC.openPreorderCheckout({cycleId:'test',lines:[{skuId:'book',price:4,qty:1}]},0,1,()=>{}));
  await expect(close).toBeFocused();await expect(page.locator('#mp-sfc-address')).toBeHidden();
  await close.press('Escape');
  if(errors.length)throw new Error(errors.join('\n'));
  console.log(width+'px: pickup/shipping visibility, keyboard wrap, Escape, focus return, reopening, mocked payment confirmation and unpaid preorder preservation passed');
  await page.close();
 }
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

