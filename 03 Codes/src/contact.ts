export {};
const form=document.querySelector<HTMLFormElement>('#contact-form')!;
const status=document.querySelector<HTMLParagraphElement>('#contact-status')!;
const submit=form.querySelector<HTMLButtonElement>('[type="submit"]')!;
let token:string|undefined;
const prepare=async()=>{const res=await fetch('/api/contact',{cache:'no-store'});if(!res.ok)throw new Error('Le formulaire est momentanément indisponible. Écrivez à contact@morashawiri.com.');const data=await res.json() as {token:string};token=data.token;};
let preparing:Promise<void>|undefined;
form.addEventListener('focusin',()=>{if(!preparing)preparing=prepare().catch(()=>{preparing=undefined;});},{once:false});
form.addEventListener('submit',async event=>{
 event.preventDefault();if(submit.disabled)return;
 status.hidden=true;submit.disabled=true;submit.textContent='Envoi en cours…';
 try{
  if(!navigator.onLine)throw new Error('Une connexion Internet est nécessaire pour envoyer votre message. Votre texte est conservé ici.');
  if(preparing)await preparing;if(!token)await prepare();
  const values=Object.fromEntries(new FormData(form));
  const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...values,token})});
  const result=await response.json() as {message?:string};
  if(!response.ok){if(response.status===403){token=undefined;preparing=undefined;}throw new Error(result.message||'L’envoi a échoué. Réessayez ou contactez-nous par e-mail.');}
  status.dataset.error='false';status.textContent='Votre message a bien été transmis à MORA Shawiri. Merci pour votre retour !';form.reset();token=undefined;preparing=undefined;
 }catch(error){status.dataset.error='true';status.textContent=error instanceof Error?error.message:'L’envoi a échoué. Votre message reste dans le formulaire.';}
 finally{submit.disabled=false;submit.textContent='Envoyer mon message →';status.hidden=false;status.focus({preventScroll:true});status.scrollIntoView({behavior:'smooth',block:'nearest'});}
});
