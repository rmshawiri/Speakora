import {chromium} from '@playwright/test';import fs from 'node:fs';import path from 'node:path';
const origin=process.env.TEST_BASE_URL||'https://speakora.morashawiri.com';const manifestId=origin+'/app';
const profile=path.resolve('../.local/pwa-v11-'+Date.now());
const context=await chromium.launchPersistentContext(profile,{headless:true,channel:'chromium',viewport:{width:1280,height:900}});
let installed=false;const page=context.pages()[0];const cdp=await context.newCDPSession(page);
const report={date:new Date().toISOString(),origin,profileIsolated:true};
try{
 await page.goto(manifestId);await page.evaluate(()=>navigator.serviceWorker.ready);await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
 const m=await cdp.send('Page.getAppManifest');const manifest=JSON.parse(m.data);report.manifestName=manifest.name;report.shortName=manifest.short_name;report.manifestErrors=m.errors;
 report.installability=await cdp.send('Page.getInstallabilityErrors');
 await cdp.send('PWA.install',{manifestId,installUrlOrBundleUrl:manifestId});installed=true;report.installed=true;
 report.osState=await cdp.send('PWA.getOsAppState',{manifestId});
 const launch=await cdp.send('PWA.launch',{manifestId});report.launch=launch;
 const app=context.pages().find(p=>p!==page&&p.url().startsWith(origin))||await context.waitForEvent('page',{timeout:10000});
 await app.waitForLoadState('domcontentloaded');await app.locator('.app-brand img').waitFor();
 report.app={title:await app.title(),url:app.url(),standalone:await app.evaluate(()=>matchMedia('(display-mode: standalone)').matches),logo:await app.locator('.app-brand img').getAttribute('src')};
 const internals=await context.newPage();await internals.goto('chrome://web-app-internals');report.internalText=await internals.locator('body').innerText();
 if(report.app.title!=='Speakora'||report.manifestName!=='Speakora'||report.shortName!=='Speakora'||!report.app.standalone)throw new Error('PWA verification mismatch');
 console.log(JSON.stringify({...report,internalText:undefined}));
}catch(e){report.error=e.message;console.log(JSON.stringify({...report,internalText:undefined}));process.exitCode=1;}
finally{if(installed)await cdp.send('PWA.uninstall',{manifestId}).catch(()=>{});await context.close();fs.writeFileSync('../05 Rapports/pwa-installed-v11.json',JSON.stringify(report,null,2));}
