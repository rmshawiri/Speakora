import fs from 'node:fs';
import sharp from 'sharp';
fs.mkdirSync('public/brand',{recursive:true});
const source='../02 Logo & Icône/';
fs.copyFileSync(source+'Speakora - Logo Horizontal.webp','public/brand/logo.webp');
fs.copyFileSync(source+'Speakora - Logo Carré.webp','public/brand/social.webp');
fs.copyFileSync(source+'Logo Officiel - MORA Shawiri.png','public/brand/mora.png');
for(const size of [48,192,512])await sharp(source+'Speakora - Favicon.webp').resize(size,size).png().toFile(`public/brand/icon-${size}.png`);
