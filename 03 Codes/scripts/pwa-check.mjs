import {chromium} from '@playwright/test';import fs from 'node:fs';
const browser=await chromium.launch();const context=await browser.newContext();const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
await page.goto('https://speakora.morashawiri.com/app');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
const cdp=await context.newCDPSession(page);const manifest=await cdp.send('Page.getAppManifest');const install=await cdp.send('Page.getInstallabilityErrors');
const report={url:page.url(),manifestErrors:manifest.errors,installabilityErrors:install.installabilityErrors,browserErrors:errors,offlineCache:await page.evaluate(async()=>({caches:await caches.keys(),resources:(await(await caches.open((await caches.keys()).find(k=>k.startsWith('speakora-')))).keys()).map(r=>r.url)}))};
fs.writeFileSync('../05 Rapports/pwa-installability.json',JSON.stringify(report,null,2));console.log(report);await browser.close();
