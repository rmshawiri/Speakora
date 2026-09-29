import {chromium} from '@playwright/test';import fs from 'node:fs';
const origin='https://speakora.morashawiri.com';const report={date:new Date().toISOString(),origin,checks:[]};
const tokenResponse=await fetch(origin+'/api/contact');if(!tokenResponse.ok)throw new Error('Contact endpoint GET failed: '+tokenResponse.status);
const {token}=await tokenResponse.json();report.checks.push({name:'GET signed token',status:tokenResponse.status,cacheControl:tokenResponse.headers.get('cache-control')});
for(const [name,body,requestOrigin,expected] of [
 ['missing token',{name:'Test'},origin,403],['invalid fields',{token,name:'X'},origin,400],['honeypot',{token,website:'robot'},origin,400],['cross origin',{token},'https://example.com',403]
]){const res=await fetch(origin+'/api/contact',{method:'POST',headers:{'Content-Type':'application/json',Origin:requestOrigin},body:JSON.stringify(body)});if(res.status!==expected)throw new Error(name+': unexpected '+res.status);report.checks.push({name,status:res.status});}
if(process.argv.includes('--send-authorized-test')){
 // Exactly one explicitly authorized live email. Never run this flag in the suite.
 const browser=await chromium.launch();const context=await browser.newContext();const page=await context.newPage();
 try{await page.goto(origin+'/#contact');await page.getByRole('textbox',{name:'Votre nom',exact:true}).fill('Test technique Speakora V1.1');await page.getByRole('textbox',{name:'Votre e-mail'}).fill('contact@morashawiri.com');await page.getByLabel('Le sujet').selectOption({label:'Un autre sujet'});await page.getByRole('textbox',{name:'Votre message'}).fill(`TEST TECHNIQUE AUTORISÉ — SPEAKORA V1.1\n\nCe message unique vérifie le formulaire de contact en production, à votre demande. Il a été envoyé depuis https://speakora.morashawiri.com le ${report.date}.\n\nAucune réponse n’est nécessaire. Ce test confirme le parcours navigateur → fonction Vercel → serveur SMTP. Référence : SPEAKORA-V11-CONTACT-20260929.`);
 const sending=page.waitForResponse(r=>r.url()===origin+'/api/contact'&&r.request().method()==='POST');await page.getByRole('button',{name:'Envoyer mon message'}).click();const response=await sending;await page.locator('#contact-status:not([hidden])').waitFor();report.liveEmail={authorized:true,submissions:1,status:response.status(),feedback:await page.locator('#contact-status').innerText(),acceptedBySMTP:response.ok(),inboxReceiptIndependentlyVerified:false};if(!response.ok())throw new Error('Authorized email failed: '+response.status());
 }finally{await browser.close();}
}
fs.writeFileSync('../05 Rapports/contact-production-v11.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
