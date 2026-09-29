import {createHmac,randomBytes,timingSafeEqual} from 'node:crypto';
import addressparser from 'nodemailer/lib/addressparser';
import {renderContactEmail,emailDate} from './contact-email.mjs';
import {renderConfirmationEmail} from './confirmation-email.mjs';
export const subjects=['Une question sur Speakora','Un problème technique','Une idée ou un retour','Un autre sujet'];
export function validateContact(body){
 if(!body||typeof body!=='object'||Array.isArray(body))return null;
 const {name,email,subject,message}=body;
 if([name,email,subject,message].some(v=>typeof v!=='string'))return null;
 if(name.trim().length<2||name.length>100||/[\r\n\x00-\x1f]/.test(name))return null;
 if(email.length>254||! /^[^\s@<>(),;:"\\]+@[^\s@<>(),;:"\\]+\.[^\s@<>(),;:"\\]+$/.test(email))return null;
 if(!subjects.includes(subject)||message.trim().length<20||message.length>5000||message.includes('\0'))return null;
 return {name:name.trim(),email:email.trim(),subject,message:message.trim()};
}
const sign=(value,secret)=>createHmac('sha256',secret).update(value).digest('base64url');
export function createToken(secret,now=Date.now()){
 const value=`${now}.${randomBytes(18).toString('base64url')}`;return `${value}.${sign(value,secret)}`;
}
export function validToken(token,secret,now=Date.now()){
 if(typeof token!=='string'||token.length>150)return false;
 const parts=token.split('.');if(parts.length!==3)return false;
 const age=now-Number(parts[0]);if(!Number.isFinite(age)||age<0||age>3600000)return false;
 const expected=Buffer.from(sign(parts.slice(0,2).join('.'),secret));const actual=Buffer.from(parts[2]);
 return actual.length===expected.length&&timingSafeEqual(actual,expected);
}
// Best-effort instance-local throttle. Does not claim a distributed rate limit.
export function createLimiter(){
 const entries=new Map();
 return (key,now=Date.now())=>{
  for(const [id,item] of entries)if(item.until<=now)entries.delete(id);
  const item=entries.get(key)||{count:0,until:now+600000};
  if(item.count>=3||(!entries.has(key)&&entries.size>=5000))return false;
  item.count++;entries.set(key,item);return true;
 };
}
export function smtpOptions(env){return {host:env.SMTP_HOST,port:Number(env.SMTP_PORT),secure:env.SMTP_SECURE==='true',requireTLS:true,auth:{user:env.SMTP_USER,pass:env.SMTP_PASSWORD},connectionTimeout:10000,greetingTimeout:10000,socketTimeout:15000,disableFileAccess:true,disableUrlAccess:true};}
export function composeMessage(contact,env,date=new Date()){
 const address=addressparser(env.SMTP_FROM,{flatten:true})[0]?.address;if(!address)throw new Error('Invalid configured sender');
 return {from:{name:'Speakora — MORA Shawiri',address},to:env.CONTACT_RECIPIENT,replyTo:{name:contact.name,address:contact.email},subject:`[Speakora] ${contact.subject}`,text:`Speakora\nApprenez. Pratiquez. Progressez.\n\nNouveau message depuis le formulaire Speakora\n\nNom : ${contact.name}\nE-mail : ${contact.email}\nSujet : ${contact.subject}\nDate : ${emailDate(date)}\n\nMessage :\n${contact.message}\n\nMessage envoyé depuis le formulaire de contact Speakora.\nSpeakora — Un produit MORA Shawiri`,html:renderContactEmail(contact,date)};
}
export function createHandler({env,send,now=Date.now}){
 const limit=createLimiter();const used=new Map();
 return async(req,res)=>{
  res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json; charset=utf-8');
  const reply=(code,message)=>res.status(code).json({message});
  const required=['SMTP_HOST','SMTP_PORT','SMTP_SECURE','SMTP_USER','SMTP_PASSWORD','SMTP_FROM','CONTACT_RECIPIENT','CONTACT_FORM_SECRET'];
  if(required.some(key=>!env[key]))return reply(503,'Le formulaire est momentanément indisponible. Écrivez à contact@morashawiri.com.');
  if(req.method==='GET')return res.status(200).json({token:createToken(env.CONTACT_FORM_SECRET,now())});
  if(req.method!=='POST'){res.setHeader('Allow','GET, POST');return reply(405,'Méthode non autorisée.');}
  const origins=['https://speakora.morashawiri.com','https://speakora-nu.vercel.app',...(env.VERCEL_URL?[`https://${env.VERCEL_URL}`]:[])];
  if(!origins.includes(req.headers.origin))return reply(403,'Cette demande doit être envoyée depuis le formulaire Speakora.');
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return reply(415,'Format de message non accepté.');
  if(Number(req.headers['content-length']||0)>24000||JSON.stringify(req.body||{}).length>24000)return reply(413,'Votre message est trop long.');
  const body=req.body;
  if(!validToken(body?.token,env.CONTACT_FORM_SECRET,now()))return reply(403,'Le formulaire a expiré. Votre texte est conservé : cliquez à nouveau sur Envoyer.');
  if(typeof body?.website==='string'&&body.website.trim())return reply(400,'L’envoi n’a pas pu être validé. Contactez-nous par e-mail.');
  const contact=validateContact(body);if(!contact)return reply(400,'Vérifiez votre nom, votre e-mail, le sujet et votre message (20 à 5 000 caractères).');
  for(const [key,until] of used)if(until<=now())used.delete(key);
  if(used.has(body.token))return reply(409,'Ce message a déjà été traité. Rechargez la page avant un nouvel envoi.');
  const ip=String(req.headers['x-vercel-forwarded-for']||req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();
  if(!limit(ip,now())){res.setHeader('Retry-After','600');return reply(429,'Vous avez envoyé plusieurs messages. Patientez dix minutes ou contactez-nous par e-mail.');}
  if(used.size>=15000)return reply(503,'Le formulaire est momentanément occupé. Réessayez plus tard.');
  used.set(body.token,now()+3600000);
  const sentAt=new Date(now());
  try{const result=await send(composeMessage(contact,env,sentAt));if(!result?.accepted?.length)throw new Error('not accepted');}
  catch{used.delete(body.token);return reply(502,'Votre message n’a pas pu être transmis. Réessayez ou écrivez à contact@morashawiri.com.');}
  // The admin copy is already accepted. A confirmation failure must not invite a duplicate submission.
  let confirmationEmailSent=false;
  try{const result=await send(composeConfirmation(contact,env,sentAt));confirmationEmailSent=Boolean(result?.accepted?.length);}catch{/* Report partial success without exposing SMTP details. */}
  return res.status(200).json({message:'Message transmis.',sentAt:sentAt.toISOString(),confirmationEmailSent});
 };
}
export function composeConfirmation(contact,env,date=new Date()){
 const from=addressparser(env.SMTP_FROM,{flatten:true})[0]?.address;
 const replyTo=addressparser(env.CONTACT_RECIPIENT,{flatten:true})[0]?.address;
 if(!from||!replyTo)throw new Error('Invalid configured sender');
 return {from:{name:'Speakora — MORA Shawiri',address:from},to:contact.email,replyTo:{name:'Speakora — MORA Shawiri',address:replyTo},subject:'Nous avons bien reçu votre message — Speakora',text:`Speakora\nApprenez. Pratiquez. Progressez.\n\nMerci de nous avoir écrit.\n\nBonjour,\n\nNous avons bien reçu votre message envoyé depuis le formulaire de contact Speakora. L’équipe Speakora vous répondra dès que possible.\n\nSujet : ${contact.subject}\nDate : ${emailDate(date)}\n\nCet e-mail confirme l’envoi de votre demande. Vous n’avez pas besoin de remplir à nouveau le formulaire.\n\nÀ bientôt,\nL’équipe Speakora\n\nSpeakora — Un produit MORA Shawiri`,html:renderConfirmationEmail(contact,date)};
}
