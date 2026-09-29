import {chromium} from '@playwright/test';
import fs from 'node:fs';
const origin=process.env.TEST_BASE_URL||'https://speakora.morashawiri.com';
const root='../04 Captures';for(const d of ['Sur PC','Sur Mobile','Affiches campagne'])fs.mkdirSync(`${root}/${d}`,{recursive:true});
const browser=await chromium.launch();
for(const [folder,width,height] of [['Sur PC',1440,1000],['Sur Mobile',390,844]]){
 const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'});const page=await context.newPage();
 await page.goto(origin);await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`${root}/${folder}/01-landing.png`,fullPage:true});
 await page.goto(origin+'/app');await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`${root}/${folder}/02-parcours.png`,fullPage:true});
 await page.screenshot({path:`${root}/${folder}/02b-parcours-ecran.png`});
 await page.locator('#continue').click();await page.screenshot({path:`${root}/${folder}/03-exercice.png`,fullPage:true});await page.screenshot({path:`${root}/${folder}/03b-exercice-ecran.png`});
 await page.locator('[data-answer="0"]').click();await page.locator('#check').click();await page.screenshot({path:`${root}/${folder}/04-correction.png`,fullPage:true});
 await page.locator('#theme-toggle').click();await page.screenshot({path:`${root}/${folder}/05-mode-sombre.png`,fullPage:true});
 await page.locator('#quit').click();await page.getByRole('button',{name:'Mettre en pause',exact:true}).click();await page.locator('#theme-toggle').click();
 await page.locator(width<700?'.bottom-nav [data-nav="settings"]':'.sidebar [data-nav="settings"]').click();await page.screenshot({path:`${root}/${folder}/06-parametres.png`,fullPage:true});
 await context.close();
}
await browser.close();console.log('12 real production screenshots saved.');
