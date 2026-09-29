import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('official branding and short PWA name on desktop and mobile',async({page})=>{
 await page.goto('/app');await expect(page).toHaveTitle('Speakora');await expect(page.locator('.app-brand img')).toHaveAttribute('src','/brand/logo.webp');
 const manifest=await(await page.request.get('/manifest.webmanifest')).json();expect(manifest.name).toBe('Speakora');expect(manifest.short_name).toBe('Speakora');
 await page.setViewportSize({width:390,height:844});await expect(page.locator('.mobile-app-brand img')).toBeVisible();await expect(page.locator('.mobile-app-brand img')).toHaveAttribute('src','/brand/logo.webp');
 const ratio=await page.locator('.mobile-app-brand img').evaluate((el:HTMLImageElement)=>({display:el.width/el.height,native:el.naturalWidth/el.naturalHeight}));expect(Math.abs(ratio.display-ratio.native)).toBeLessThan(.05);
});
test('contact preserves text on error and offline, then confirms actual API success',async({page,context})=>{
 // Delivery is mocked deliberately: no unsolicited test message is sent.
 await context.route('**/api/contact',async route=>{if(route.request().method()==='GET')return route.fulfill({json:{token:'test-token'}});return route.fulfill({status:502,json:{message:'Service momentanément indisponible.'}});});
 await page.goto('/');await page.getByRole('textbox',{name:'Votre nom',exact:true}).fill('Test Visiteur');await page.getByRole('textbox',{name:'Votre e-mail'}).fill('test@example.com');await page.getByLabel('Le sujet').selectOption({label:'Une idée ou un retour'});await page.getByRole('textbox',{name:'Votre message'}).fill('Une suggestion complète pour améliorer mon parcours.');
 await page.getByRole('button',{name:'Envoyer mon message'}).click();await expect(page.locator('#contact-status')).toContainText('indisponible');await expect(page.getByRole('textbox',{name:'Votre message'})).not.toBeEmpty();
 await context.setOffline(true);await page.getByRole('button',{name:'Envoyer mon message'}).click();await expect(page.locator('#contact-status')).toContainText('connexion Internet');await context.setOffline(false);
 await context.unroute('**/api/contact');await context.route('**/api/contact',route=>route.fulfill({json:route.request().method()==='GET'?{token:'test-token'}:{message:'Message transmis.'}}));
 await page.getByRole('button',{name:'Envoyer mon message'}).click();await expect(page.locator('#contact-status')).toContainText('bien été transmis');await expect(page.getByRole('textbox',{name:'Votre message'})).toBeEmpty();
});
test('dark settings, navigation, correct and incorrect exercise states are accessible',async({page})=>{
 await page.goto('/app');await page.locator('#theme-toggle').click();
 const audit=async()=>{const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))).toEqual([]);};
 await page.locator('.sidebar [data-nav="settings"]').click();await audit();await page.locator('.sidebar [data-nav="stats"]').click();await audit();await page.locator('.sidebar [data-nav="home"]').click();await page.locator('#continue').click();await page.locator('[data-answer="1"]').click();await page.locator('#check').click();await audit();await page.locator('#check').click();await page.locator('[data-answer="1"]').click();await page.locator('#check').click();await audit();
});
