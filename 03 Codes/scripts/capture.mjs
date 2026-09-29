import {chromium} from '@playwright/test';import fs from 'node:fs';
import level from '../src/data/a1.json' with {type:'json'};
const origin=process.env.TEST_BASE_URL||'https://speakora.morashawiri.com';const root='../04 Captures';
for(const d of ['Sur PC','Sur Mobile','Affiches campagne'])fs.mkdirSync(`${root}/${d}`,{recursive:true});
const browser=await chromium.launch();
const desktop=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});const page=await desktop.newPage();
await page.goto(origin);await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`${root}/Sur PC/01-landing.png`});
await page.locator('#contact').screenshot({path:`${root}/Sur PC/03-contact.png`});
await page.goto(origin+'/app');await page.locator('#theme-toggle').click();await page.screenshot({path:`${root}/Sur PC/02-parcours-sombre.png`});await desktop.close();
const mobile=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,reducedMotion:'reduce'});const phone=await mobile.newPage();
await phone.goto(origin+'/app');await phone.evaluate(()=>document.fonts.ready);await phone.locator('#continue').click();await phone.mouse.move(0,0);await phone.screenshot({path:`${root}/Sur Mobile/01-lecon.png`});
const exercises=(Array.isArray(level)?level[0]:level.lessons[0]).exercises;
for(const ex of exercises){if(ex.type==='order'){for(const word of ex.words)await phone.locator('#order-pool').getByRole('button',{name:word,exact:true}).first().click();}else await phone.locator(`[data-answer="${ex.answer}"]`).click();await phone.locator('#check').click();await phone.locator('#check').click();}
await phone.screenshot({path:`${root}/Sur Mobile/02-resultat.png`});await mobile.close();await browser.close();
console.log('5 selected screenshots: desktop landing, dark dashboard, contact; mobile lesson and result.');
