export const escapeHTML = (value: string) => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export const $ = <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector)!;
export const icon = (name:string, size=22) => {
 const paths:Record<string,string>={
  book:'<path d="M12 7v14m0-14C8 4 5 4 2 5v14c3-1 6-1 10 2 4-3 7-3 10-2V5c-3-1-6-1-10 2Z"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',check:'<path d="m5 12 4 4L19 6"/>',
  spark:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/>',
  chart:'<path d="M5 20V12m7 8V4m7 16V8"/>',headphones:'<path d="M3 14v-3a9 9 0 0 1 18 0v3M3 13h4v8H3zm14 0h4v8h-4z"/>',
  lock:'<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"/>',
  moon:'<path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>',
  wifi:'<path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-11 4a6 6 0 0 1 8 0"/><circle cx="12" cy="20" r="1"/>',
  flame:'<path d="M13 2s1 6-3 8c0-3-2-4-2-4s-6 7-3 12c3 5 11 5 14-1 3-6-3-12-6-15Z"/>',
  bolt:'<path d="m13 2-9 12h7l-1 8 10-13h-8z"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="m9 3-1 3-3 1-2 5 2 5 3 1 1 3h6l1-3 3-1 2-5-2-5-3-1-1-3Z"/>',
  close:'<path d="m6 6 12 12M6 18 18 6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',volume:'<path d="m11 4-6 5H2v6h3l6 5Zm4 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  globe:'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  phone:'<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4"/>',
  trophy:'<path d="M7 3h10v6a5 5 0 0 1-10 0Zm5 11v7m-4 0h8M7 5H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4"/>'
 };
 return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.spark}</svg>`;
};
export function toast(message:string){let box=document.getElementById('toast');if(!box){box=document.createElement('div');box.id='toast';box.setAttribute('role','status');document.body.append(box);}box.textContent=message;box.classList.add('visible');setTimeout(()=>box?.classList.remove('visible'),5500);}
export function shuffle<T>(items:T[]):T[]{const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}
