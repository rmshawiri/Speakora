import {chromium} from '@playwright/test';import fs from 'node:fs';import path from 'node:path';
const origin=process.env.TEST_BASE_URL||'https://speakora.morashawiri.com';
const profile=path.resolve('../.local/offline-profile-'+Date.now());const result={origin,checks:[]};
let context=await chromium.launchPersistentContext(profile,{headless:true});let page=await context.newPage();
await page.goto(origin+'/app');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
result.checks.push('Initial online precache and controller active');await context.close();
context=await chromium.launchPersistentContext(profile,{headless:true,offline:true});page=await context.newPage();await page.goto(origin+'/app');await page.locator('#continue').waitFor();
result.checks.push('Browser process closed and restarted offline: application opens');await page.locator('#continue').click();
const data=JSON.parse(fs.readFileSync('src/data/a1.json','utf8')).lessons[0];
for(const ex of data.exercises){if(ex.type==='order'){for(const word of ex.words)await page.locator('#order-pool').getByRole('button',{name:word,exact:true}).first().click();}else await page.locator(`[data-answer="${ex.answer}"]`).click();await page.locator('#check').click();await page.locator('#check').click();}
if(!(await page.locator('.result-metrics').innerText()).includes('70'))throw new Error('XP not persisted');result.checks.push('First lesson completed offline with 70 XP');await context.close();
context=await chromium.launchPersistentContext(profile,{headless:true,offline:true});page=await context.newPage();await page.goto(origin+'/app');await page.locator('#continue').waitFor();if(!(await page.locator('.xp-pill').innerText()).includes('70'))throw new Error('Progress lost');result.checks.push('Second offline browser restart: 70 XP preserved');await context.close();
fs.writeFileSync('../05 Rapports/offline-restart.json',JSON.stringify(result,null,2));console.log(result);
