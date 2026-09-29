import {chromium} from '@playwright/test';import AxeBuilder from '@axe-core/playwright';
const browser=await chromium.launch();const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();
for(const route of ['/','/app','dark']){if(route==='dark')await page.locator('#theme-toggle').click();else await page.goto('http://127.0.0.1:4173'+route);await page.evaluate(()=>document.fonts.ready);const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();console.log(route,JSON.stringify(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))));}
await browser.close();
