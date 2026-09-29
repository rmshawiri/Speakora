import { lessons, levels, lessonById } from '../data';
export const PASS_SCORE = 60;
export const STORAGE_KEY = 'speakora.progress.v1';
export interface Progress { version: 1; theme: 'light' | 'dark'; sound: boolean; best: Record<string, number>; days: string[] }
export const emptyProgress = (): Progress => ({ version: 1, theme: 'light', sound: true, best: {}, days: [] });
export const dateKey = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
export const stars = (score: number) => score >= 90 ? 3 : score >= 75 ? 2 : score >= PASS_SCORE ? 1 : 0;
export const scoreOf = (p: Progress, id: string) => Math.round((p.best[id] || 0) / lessonById(id)!.exercises.length * 100);
export const passed = (p: Progress, id: string) => scoreOf(p,id) >= PASS_SCORE;
export function unlocked(p: Progress, id: string): boolean {
 const index = lessons.findIndex(l => l.id === id);
 return index >= 0 && lessons.slice(0,index).every(l => passed(p,l.id));
}
export const xpFor = (correct: number, total: number) => correct * 10 + (correct === total ? 20 : 0);
export const totalXP = (p: Progress) => lessons.reduce((sum,l)=>sum+xpFor(p.best[l.id]||0,l.exercises.length),0);
export function streak(p: Progress, now = new Date()): number {
 const dates = new Set(p.days); const cursor = new Date(now.getFullYear(),now.getMonth(),now.getDate(),12);
 if (!dates.has(dateKey(cursor))) cursor.setDate(cursor.getDate()-1);
 let count = 0;
 while(dates.has(dateKey(cursor))) { count++; cursor.setDate(cursor.getDate()-1); }
 return count;
}
export function finish(p: Progress, id: string, correct: number, now = new Date()) {
 const lesson = lessonById(id);
 if(!lesson || !unlocked(p,id) || !Number.isInteger(correct) || correct < 0 || correct > lesson.exercises.length) throw new Error('Résultat invalide.');
 const next: Progress = { ...p, best: {...p.best,[id]:Math.max(p.best[id]||0,correct)}, days:[...new Set([...p.days,dateKey(now)])].sort() };
 return { progress: next, earned: totalXP(next)-totalXP(p), score:Math.round(correct/lesson.exercises.length*100) };
}
export function validateProgress(value: unknown): Progress {
 if(!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Sauvegarde invalide.');
 const p = value as Record<string,unknown>;
 if(p.version!==1 || !['light','dark'].includes(p.theme as string) || typeof p.sound!=='boolean' || !p.best || typeof p.best!=='object' || Array.isArray(p.best) || !Array.isArray(p.days) || p.days.length>40000) throw new Error('Format de sauvegarde incompatible.');
 const best: Record<string,number>={};
 for(const [id,n] of Object.entries(p.best)) {
  const l=lessonById(id);
  if(!l || !Number.isInteger(n) || n<0 || n>l.exercises.length) throw new Error('Score de sauvegarde invalide.');
  best[id]=n;
 }
 const today = dateKey();
 for(const d of p.days){
  if(typeof d!=='string' || !/^\d{4}-\d{2}-\d{2}$/.test(d) || d>'9999-12-31' || d< '2020-01-01' || d>today || dateKey(new Date(d+'T12:00:00'))!==d) throw new Error('Date de sauvegarde invalide.');
 }
 const clean: Progress={version:1,theme:p.theme as Progress['theme'],sound:p.sound,best,days:[...new Set(p.days as string[])].sort()};
 if(Object.keys(best).some(id=>!unlocked(clean,id))) throw new Error('Progression incohérente : leçons précédentes non validées.');
 return clean;
}
export const currentLevel = (p:Progress) => levels.find(l=>l.lessons.some(x=>!passed(p,x.id))) || levels.at(-1)!;
export function loadProgress(storage: Pick<Storage,'getItem'>): { progress:Progress; error?:string } {
 try { const raw=storage.getItem(STORAGE_KEY);return {progress:raw?validateProgress(JSON.parse(raw)):emptyProgress()}; }
 catch { return {progress:emptyProgress(),error:'La sauvegarde locale est illisible ou inaccessible. Exportez vos données avant toute réinitialisation.'}; }
}
export function saveProgress(storage:Pick<Storage,'setItem'>,p:Progress) { storage.setItem(STORAGE_KEY,JSON.stringify(p)); }
