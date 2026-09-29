import { defineConfig } from 'vite';
import { resolve } from 'node:path';
const appRoute = (server: {middlewares:{use:(handler:(req:{url?:string},res:unknown,next:()=>void)=>void)=>void}}) => { server.middlewares.use((req,_res,next)=>{if(req.url==='/app'||req.url?.startsWith('/app?'))req.url=req.url.replace('/app','/app/');next();}); };
export default defineConfig({ plugins:[{name:'speakora-app-route',configureServer:appRoute,configurePreviewServer:appRoute}], build: { rollupOptions: { input: { main: resolve(import.meta.dirname, 'index.html'), app: resolve(import.meta.dirname, 'app/index.html') } } } });
