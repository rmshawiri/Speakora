import test from 'node:test';import assert from 'node:assert/strict';import nodemailer from 'nodemailer';
// @ts-expect-error Shared ESM server template.
import {renderContactEmail,emailDate} from '../server/contact-email.mjs';
// @ts-expect-error Shared ESM server module.
import {composeMessage} from '../server/contact.mjs';
const contact={name:'Visiteur & équipe',email:'contact@example.com',subject:'Une idée ou un retour',message:'Bonjour,\n\nVoici mon retour <script>alert(1)</script> & "merci".\nBonne journée.'};
const date=new Date('2026-09-29T14:30:00Z');
test('HTML escapes visitor content and preserves paragraph breaks',()=>{const html=renderContactEmail(contact,date);assert.ok(html.includes('Visiteur &amp; équipe'));assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));assert.ok(html.includes('Bonjour,<br><br>'));assert.ok(!html.includes('<script>'));assert.ok(!html.includes('<style'));assert.ok(!html.includes('<link'));assert.ok(!html.includes('javascript:'));assert.ok(html.includes('role="presentation"'));assert.ok(html.includes('<!--[if mso]>'));});
test('email includes brand colors, requested content and local Comoros date',()=>{const html=renderContactEmail(contact,date);for(const color of ['#6D5CFF','#A855F7','#10B981','#F5F7FB','#FFFFFF','#111827','#6B7280'])assert.ok(html.includes(color));for(const text of ['Nouveau message depuis le formulaire Speakora','Apprenez. Pratiquez. Progressez.','Message envoyé depuis le formulaire de contact Speakora.','Speakora — Un produit MORA Shawiri'])assert.ok(html.replace(/<br>/g,' ').includes(text));assert.ok(emailDate(date).includes('17:30'));assert.ok(html.includes('UTC+3'));});
test('email keeps subject, structured sender, Reply-To and multipart alternative',async()=>{
 const message=composeMessage(contact,{SMTP_FROM:'Ancien nom <sender@example.com>',CONTACT_RECIPIENT:'owner@example.com'},date);
 assert.equal(message.subject,'[Speakora] Une idée ou un retour');assert.deepEqual(message.from,{name:'Speakora — MORA Shawiri',address:'sender@example.com'});assert.equal(message.replyTo.address,contact.email);assert.ok(message.text.includes(contact.message));
 const mail=await nodemailer.createTransport({streamTransport:true,buffer:true,newline:'windows'}).sendMail(message);const mime=mail.message.toString();assert.ok(mime.includes('multipart/alternative'));assert.ok(mime.includes('text/plain'));assert.ok(mime.includes('text/html'));assert.ok(Buffer.byteLength(message.html)<30000);
});
