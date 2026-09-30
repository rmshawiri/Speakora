import { toast } from './core/ui';
type InstallPrompt = Event & {prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>};
declare global {interface Window {speakoraInstallation?:{event:InstallPrompt|null;installed:boolean}}}
const standalone=window.matchMedia('(display-mode: standalone)');
function isInstalled(){return !!window.speakoraInstallation?.installed || standalone.matches || !!(navigator as Navigator & {standalone?:boolean}).standalone;}
export function refreshInstallButtons(){document.querySelectorAll<HTMLElement>('[data-install]').forEach(b=>b.hidden=isInstalled()||!window.speakoraInstallation?.event);}
window.addEventListener('speakora:installationchange',refreshInstallButtons);
standalone.addEventListener('change',refreshInstallButtons);
document.addEventListener('click',async e=>{
 if(!(e.target instanceof Element)||!e.target.closest('[data-install]')||isInstalled())return;
 const state=window.speakoraInstallation;const prompt=state?.event;if(!state||!prompt)return;
 // Consume this one-shot event before awaiting to prevent duplicate prompts.
 state.event=null;refreshInstallButtons();
 try{await prompt.prompt();const choice=await prompt.userChoice;if(choice.outcome==='accepted')state.installed=true;}
 catch{/* A consumed or unavailable browser prompt must not leave a false install button. */}
 finally{refreshInstallButtons();}
});
export function networkStatus(){document.querySelectorAll('[data-network]').forEach(el=>{el.textContent=navigator.onLine?'En ligne':'Hors connexion';});}
window.addEventListener('online',networkStatus);window.addEventListener('offline',networkStatus);
if('serviceWorker' in navigator && import.meta.env.PROD){
 window.addEventListener('load',async()=>{try{
  const registration=await navigator.serviceWorker.register('/sw.js');
  const announce=()=>{
   if(!registration.waiting || !navigator.serviceWorker.controller)return;
   let banner=document.getElementById('update-banner');if(banner)return;
   banner=document.createElement('div');banner.id='update-banner';banner.className='update-banner';banner.setAttribute('role','status');
   banner.innerHTML='<span>Une nouvelle version est prête. Votre progression est conservée.</span><button class="btn small">Mettre à jour</button>';
   banner.querySelector('button')!.onclick=()=>{if(document.body.dataset.quiz==='active'){toast('Terminez ou quittez votre leçon avant la mise à jour.');return;}registration.waiting?.postMessage({type:'SKIP_WAITING'});};document.body.append(banner);
  };
  announce();registration.addEventListener('updatefound',()=>registration.installing?.addEventListener('statechange',announce));
  let reloading=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(registration.active&&document.getElementById('update-banner')&&!reloading){reloading=true;location.reload();}});
  await navigator.serviceWorker.ready;document.querySelectorAll('[data-cache]').forEach(el=>el.textContent='Ressources enregistrées pour le mode hors connexion');
 }catch{toast('Le mode hors connexion n’a pas pu être préparé. Réessayez avec une connexion.');}});
}
