import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const walk=(dir)=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const files=walk('dist').filter(f=>!f.endsWith('sw.js'));
const revision=crypto.createHash('sha256').update(fs.readFileSync(import.meta.filename));files.forEach(f=>revision.update(fs.readFileSync(f)));
const name='speakora-'+revision.digest('hex').slice(0,12);
const urls=files.map(f=>'/'+path.relative('dist',f).replaceAll('\\','/'));
fs.writeFileSync('dist/sw.js',`const CACHE=${JSON.stringify(name)};const ASSETS=${JSON.stringify(urls)};
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>Promise.all(ASSETS.map(async url=>{const response=await fetch(url,{cache:'reload'});if(!response.ok)throw new Error('Precache failed: '+url);const stable=new Response(await response.arrayBuffer(),{status:response.status,statusText:response.statusText,headers:response.headers});await cache.put(url,stable);})))));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('activate',event=>event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('speakora-')&&k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
if(event.request.mode==='navigate'){const key=url.pathname==='/app'||url.pathname.startsWith('/app/')?'/app/index.html':url.pathname==='/'||url.pathname==='/index.html'?'/index.html':null;if(key)event.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(key))||fetch(event.request)));return;}
if(ASSETS.includes(url.pathname))event.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(url.pathname))||fetch(event.request)));
});`);
console.log('Offline precache:',urls.length,'resources;',name);
