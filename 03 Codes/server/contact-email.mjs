const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export function emailDate(date){return new Intl.DateTimeFormat('fr-FR',{timeZone:'Indian/Comoro',dateStyle:'long',timeStyle:'short'}).format(date)+' · Comores (UTC+3)';}
export function renderContactEmail(contact,date=new Date()){
 const name=escape(contact.name),email=escape(contact.email),subject=escape(contact.subject),sent=escape(emailDate(date));
 const message=escape(contact.message).replace(/\r\n|\r|\n/g,'<br>');
 const row=(label,value)=>`<tr><td style="padding:0 0 7px;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;font-weight:bold;letter-spacing:1px;color:#6B7280;">${label}</td></tr><tr><td style="padding:0 0 21px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:24px;color:#111827;word-break:break-word;overflow-wrap:anywhere;">${value}</td></tr>`;
 return `<!doctype html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="x-apple-disable-message-reformatting"><title>Nouveau message Speakora</title></head>
<body style="margin:0;padding:0;width:100%;background-color:#F5F7FB;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<div style="display:none;font-size:1px;color:#F5F7FB;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${name} vous écrit : ${subject}.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#F5F7FB" style="width:100%;border-collapse:collapse;background-color:#F5F7FB;"><tr><td align="center" style="padding:28px 12px;">
<!--[if mso]><table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;border-collapse:separate;border-spacing:0;">
<tr><td bgcolor="#6D5CFF" style="padding:32px 28px;background-color:#6D5CFF;background-image:linear-gradient(120deg,#6D5CFF 0%,#A855F7 100%);border-radius:18px 18px 0 0;">
<p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:32px;line-height:38px;letter-spacing:-1px;font-weight:bold;color:#FFFFFF;">Speakora</p>
<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:21px;color:#FFFFFF;">Apprenez. Pratiquez. Progressez.</p></td></tr>
<tr><td bgcolor="#FFFFFF" style="padding:28px;background-color:#FFFFFF;border-left:1px solid #E7E5F0;border-right:1px solid #E7E5F0;border-bottom:1px solid #E7E5F0;border-radius:0 0 18px 18px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;table-layout:fixed;border-collapse:collapse;">
<tr><td style="padding:0 0 17px;"><table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td width="8" bgcolor="#10B981" style="width:8px;background-color:#10B981;border-radius:4px;"></td><td style="padding:2px 0 2px 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;letter-spacing:1px;font-weight:bold;color:#6B7280;">VOTRE FORMULAIRE DE CONTACT</td></tr></table></td></tr>
<tr><td><h1 style="margin:0 0 22px;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:32px;letter-spacing:-0.4px;font-weight:bold;color:#111827;">Nouveau message depuis le formulaire Speakora</h1></td></tr>
${row('NOM',name)}${row('E-MAIL',`<a href="mailto:${email}" style="color:#6D5CFF;text-decoration:underline;word-break:break-all;">${email}</a>`)}${row('SUJET',subject)}${row('DATE',sent)}
<tr><td style="padding:0 0 9px;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;font-weight:bold;letter-spacing:1px;color:#6B7280;">MESSAGE</td></tr>
<tr><td bgcolor="#F5F7FB" style="padding:20px;background-color:#F5F7FB;border-left:3px solid #6D5CFF;border-radius:0 10px 10px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:25px;color:#111827;word-break:break-word;overflow-wrap:anywhere;">${message}</td></tr>
<tr><td style="padding:23px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:20px;color:#6B7280;">Pour répondre à cette personne, utilisez simplement la fonction Répondre de votre messagerie.</td></tr>
</table></td></tr>
<tr><td align="center" style="padding:22px 16px 5px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:20px;color:#6B7280;">Message envoyé depuis le formulaire de contact Speakora.</td></tr>
<tr><td align="center" style="padding:0 16px 15px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:20px;color:#6B7280;">Speakora — Un produit MORA Shawiri</td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table></body></html>`;
}
