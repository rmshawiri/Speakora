import {test,expect,type Page} from '@playwright/test';
import {lessons} from '../src/data';
import {emptyProgress,finish,STORAGE_KEY} from '../src/core/progress';
async function solve(page:Page,id='a1-1',wrong=false){
 const lesson=lessons.find(l=>l.id===id)!;
 for(const ex of lesson.exercises){
  if(ex.type==='order'){for(const word of (wrong?[...ex.words].reverse():ex.words)){await page.locator('#order-pool').getByRole('button',{name:word,exact:true}).first().click();}}
  else {const answer=wrong?(ex.answer+1)%ex.options.length:ex.answer;await page.locator(`[data-answer="${answer}"]`).click();}
  await page.getByRole('button',{name:'Vérifier ma réponse',exact:true}).click();
  await expect(page.locator('#feedback')).toBeVisible();
  await page.getByRole('button',{name:ex===lesson.exercises.at(-1)?'Voir mon résultat':'Continuer',exact:true}).click();
 }
}
test('landing SEO, exact CTA links, images, mobile menu and responsive',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
 await expect(page.locator('h1')).toHaveCount(1);await expect(page).toHaveTitle(/Speakora/);
 const ctas=page.locator('a').filter({hasText:/Commencer/});expect(await ctas.count()).toBe(3);for(const cta of await ctas.all())await expect(cta).toHaveAttribute('href','https://morashawiri.com/acceder-a-speakora/');
 expect(await page.locator('meta[name="description"]').getAttribute('content')).toBeTruthy();expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toMatch(/^https:\/\//);
 expect(await page.locator('script[type="application/ld+json"]').evaluate(el=>!!JSON.parse(el.textContent!))).toBe(true);
 for(const width of [320,360,390,768,1440]){await page.setViewportSize({width,height:900});await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Ouvrir le menu'}).click();await expect(page.locator('#navigation')).toHaveClass(/open/);await page.locator('#navigation').getByRole('link',{name:'FAQ',exact:true}).click();await expect(page.locator('#navigation')).not.toHaveClass(/open/);
 await page.locator('details').first().locator('summary').click();await expect(page.locator('details').first()).toHaveAttribute('open','');
 for(const img of await page.locator('img').all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0),{timeout:20000,message:await img.getAttribute('src')||'Image decoding'}).toBe(true);}
 const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!(i as HTMLImageElement).complete||!(i as HTMLImageElement).naturalWidth).length);expect(broken).toBe(0);expect(errors).toEqual([]);
});
test('lesson success, replay cap, theme, progress persistence and failure',async({page})=>{
 await page.goto('/app');await page.locator('#continue').click();await solve(page);await expect(page.locator('.result-card')).toContainText('100');await expect(page.locator('.result-metrics')).toContainText('+70 XP');
 await page.locator('#result-home').click();await expect(page.locator('[data-lesson="a1-2"]')).toBeEnabled();await expect(page.locator('[data-lesson="a1-3"]')).toBeDisabled();
 await page.locator('[data-lesson="a1-1"]').click();await solve(page);await expect(page.locator('.result-metrics')).toContainText('+0 XP');
 await page.getByRole('button',{name:'Activer le thème sombre'}).click();await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');await expect(page.locator('.xp-pill')).toContainText('70');
 await page.locator('[data-lesson="a1-2"]').click();await solve(page,'a1-2',true);await expect(page.locator('.result-card')).toContainText('On essaie encore');await expect(page.locator('.result-card')).toContainText('0');
});
test('all 15 lessons and all four exercise formats can be completed',async({page})=>{
 await page.goto('/app');
 for(const lesson of lessons){await page.locator(`[data-level="${lesson.id.split('-')[0].toUpperCase()}"]`).click();await page.locator(`[data-lesson="${lesson.id}"]`).click();await solve(page,lesson.id);await expect(page.locator('.result-card')).toContainText('100');await page.locator('#result-home').click();}
 await expect(page.locator('.xp-pill')).toContainText('1120');await expect(page.locator('.overall-card')).toContainText('100');
});
test('pause after checking an answer never counts it twice; reload resumes',async({page})=>{
 await page.goto('/app');await page.locator('#continue').click();await page.locator('[data-answer="0"]').click();await page.locator('#check').click();await page.locator('#quit').click();await page.getByRole('button',{name:'Mettre en pause',exact:true}).click();await page.reload();await page.locator('#continue').click();await solve(page);await expect(page.locator('.result-metrics')).toContainText('+70 XP');
});
test('audio fallback, validated import, export and reset confirmation',async({page})=>{
 await page.goto('/app');await page.locator('.sidebar [data-nav="settings"]').click();
 await page.locator('#import-file').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{"version":999}')});await expect(page.locator('#toast')).toContainText('incompatible');
 const backup=finish(emptyProgress(),'a1-1',5).progress;await page.locator('#import-file').setInputFiles({name:'progress.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});await page.getByRole('button',{name:'Restaurer',exact:true}).click();await expect(page.locator('.xp-pill')).toContainText('70');
 const downloadPromise=page.waitForEvent('download');await page.locator('#export').click();const download=await downloadPromise;expect(download.suggestedFilename()).toMatch(/^speakora-progression/);
 await page.locator('#reset').click();await page.getByRole('button',{name:'Annuler',exact:true}).click();await expect(page.locator('.xp-pill')).toContainText('70');await page.locator('#reset').click();await page.getByRole('button',{name:'Effacer ma progression',exact:true}).click();await expect(page.locator('.xp-pill')).toContainText('0');
 await page.locator('.sidebar [data-nav="home"]').click();await page.locator('#continue').click();for(const i of [0,1,0]){await page.locator(`[data-answer="${i}"]`).click();await page.locator('#check').click();await page.locator('#check').click();}await page.locator('#transcript-toggle').click();await expect(page.locator('#transcript')).toHaveText('Nice to meet you');
});
test('offline reload, new tab, lesson and persisted progress; manifest icons',async({page,context})=>{
 await page.goto('/app');await page.evaluate(async()=>{await navigator.serviceWorker.ready;});await expect.poll(()=>page.evaluate(()=>!!navigator.serviceWorker.controller)).toBe(true);
 const manifest=await (await page.request.get('/manifest.webmanifest')).json();expect(manifest.start_url).toBe('/app');expect(manifest.display).toBe('standalone');for(const i of manifest.icons)expect((await page.request.get(i.src)).ok()).toBe(true);
 await context.setOffline(true);await page.reload();await expect(page.locator('[data-network]')).toHaveText('Hors connexion');await page.locator('#continue').click();await solve(page);await expect(page.locator('.result-metrics')).toContainText('+70 XP');await page.close();
 const reopened=await context.newPage();await reopened.goto('/app');await expect(reopened.locator('.xp-pill')).toContainText('70');await reopened.locator('[data-lesson="a1-2"]').click();await expect(reopened.locator('.question-card')).toBeVisible();await reopened.goto('/');await expect(reopened.locator('h1')).toContainText('L’anglais ouvre');await context.setOffline(false);
});
test('mobile app screens have no horizontal overflow and keyboard controls work',async({page})=>{
 await page.goto('/app');for(const width of [320,360,390,768,1440]){await page.setViewportSize({width,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
 await page.setViewportSize({width:360,height:800});await page.locator('.bottom-nav [data-nav="stats"]').click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.locator('.bottom-nav [data-nav="settings"]').click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.locator('.bottom-nav [data-nav="home"]').click();await page.locator('#continue').click();await page.locator('[data-answer="0"]').focus();await page.keyboard.press('Enter');await expect(page.locator('#check')).toBeEnabled();await page.locator('#check').focus();await page.keyboard.press('Enter');await expect(page.locator('#feedback')).toContainText('Bien joué');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
