import fs from 'node:fs';
const domains=['https://speakora.morashawiri.com','https://speakora-nu.vercel.app'];
const results=[];
for(const origin of domains)for(const path of ['/','/app','/manifest.webmanifest','/sw.js','/robots.txt','/sitemap.xml']){
 try{const r=await fetch(origin+path,{signal:AbortSignal.timeout(25000)});const body=await r.text();results.push({url:origin+path,status:r.status,finalUrl:r.url,bytes:body.length,title:body.match(/<title>(.*?)<\/title>/)?.[1],contentType:r.headers.get('content-type'),cacheControl:r.headers.get('cache-control'),csp:!!r.headers.get('content-security-policy')});}catch(e){results.push({url:origin+path,error:e.message});}
}
fs.writeFileSync('../05 Rapports/http-production.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
