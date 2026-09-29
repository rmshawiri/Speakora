import {chromium} from '@playwright/test';
const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:320,height:900}});
for(const route of ['/','/app']){
 await page.goto('http://127.0.0.1:4173'+route);await page.waitForLoadState('networkidle');
 console.log(route,JSON.stringify(await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.width&& (r.right>innerWidth+1||r.left< -1);}).map(el=>({tag:el.tagName,class:el.className,right:el.getBoundingClientRect().right,left:el.getBoundingClientRect().left})).slice(0,30)}))));
}
await browser.close();
