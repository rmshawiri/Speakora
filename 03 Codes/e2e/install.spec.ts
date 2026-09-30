import {test,expect,devices} from '@playwright/test';

for(const mobile of [false,true]){
 test(`installation availability lifecycle: ${mobile?'Android Chromium emulation':'desktop'}`,async({browser,baseURL})=>{
  const context=await browser.newContext({...mobile?devices['Pixel 7']:{viewport:{width:1440,height:1000}},baseURL});
  const page=await context.newPage();
  // Hold the main module: reproduce an install event arriving before app startup.
  let release!:()=>void;const gate=new Promise<void>(resolve=>release=resolve);
  await page.route(/\/assets\/app-[^/]+\.js$/,async route=>{await gate;await route.continue();});
  const navigation=page.goto('/app');
  await page.waitForFunction(()=>!!(window as any).speakoraInstallation);
  const offer=()=>page.evaluate(()=>{
   const event=new Event('beforeinstallprompt',{cancelable:true});
   Object.assign(event,{prompt:async()=>{(window as any).promptCalls=((window as any).promptCalls||0)+1;},userChoice:Promise.resolve({outcome:'dismissed'})});
   window.dispatchEvent(event);
  });
  await offer();release();await navigation;
  const settings=()=>page.locator(mobile?'.bottom-nav [data-nav="settings"]':'.sidebar [data-nav="settings"]').click();
  await settings();const button=page.locator('[data-install]');await expect(button).toBeVisible();
  await button.click();await expect(button).toBeHidden();expect(await page.evaluate(()=>(window as any).promptCalls)).toBe(1);
  // A fresh browser event after rendering must make installation available again.
  await offer();await expect(button).toBeVisible();
  await page.evaluate(()=>window.dispatchEvent(new Event('appinstalled')));await expect(button).toBeHidden();
  await offer();await settings();await expect(button).toBeHidden();
  await context.close();
 });
 test(`no false installation button: ${mobile?'Android Chromium emulation':'desktop'}`,async({browser,baseURL})=>{
  const context=await browser.newContext({...mobile?devices['Pixel 7']:{viewport:{width:1440,height:1000}},baseURL});
  const page=await context.newPage();await page.goto('/app');
  await page.evaluate(()=>{(window as any).speakoraInstallation.event=null;});
  await page.locator(mobile?'.bottom-nav [data-nav="settings"]':'.sidebar [data-nav="settings"]').click();
  await expect(page.locator('[data-install]')).toBeHidden();
  await page.emulateMedia({media:'screen'});
  // Emulate the installed display-mode independently of appinstalled.
  await page.addInitScript(()=>{const original=window.matchMedia.bind(window);window.matchMedia=query=>query==='(display-mode: standalone)'?Object.defineProperty(original(query),'matches',{value:true}):original(query);});
  await page.reload();await page.evaluate(()=>{const event=new Event('beforeinstallprompt',{cancelable:true});window.dispatchEvent(event);});
  await page.locator(mobile?'.bottom-nav [data-nav="settings"]':'.sidebar [data-nav="settings"]').click();
  await expect(page.locator('[data-install]')).toBeHidden();await context.close();
 });
}
