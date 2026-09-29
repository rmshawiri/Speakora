// One-time migration of the user-provided pedagogical reference, never its UI.
import fs from 'node:fs';
import vm from 'node:vm';
const html = fs.readFileSync('../01 Documentation/LinguaFlow.html', 'utf8');
const source = html.slice(html.indexOf('const LEVELS = ['), html.indexOf('/* ============ ÉTAT'));
const levels = vm.runInNewContext(source + '\nLEVELS', {}, { timeout: 1000 });
const tips = [
 ['Pour se présenter : « I am… ». Pour saluer : « Hello ». Pour remercier : « Thank you ».', 'Les couleurs se placent avant le nom : « green apples ». Les nombres ne prennent pas de pluriel.', 'Avec I, utilisez am ; avec he ou she, is ; avec you, we ou they, are.'],
 ['Au présent simple, ajoutez généralement -s au verbe avec he, she et it : « She works ».', '« I would like… » est une façon polie de commander. « Can I have…? » permet de demander quelque chose.', 'Le prétérit décrit une action passée terminée. Certains verbes sont irréguliers : go → went, see → saw.'],
 ['Le present perfect se forme avec have/has + participe passé. Since indique le point de départ ; for, la durée.', 'Un verbe à particule change souvent de sens : look for = chercher ; look after = s’occuper de.', 'Will peut exprimer une promesse ; be going to, une intention ou une prévision fondée sur un indice.'],
 ['If + prétérit, would + verbe : hypothèse. If + past perfect, would have + participe passé : regret passé.', 'La voix passive se forme avec be au temps voulu + participe passé : « was made », « is spoken ».', 'Une expression idiomatique ne se traduit pas mot à mot. « A piece of cake » désigne quelque chose de facile.'],
 ['Un registre soutenu permet de préciser sa pensée : lucid = clair ; meticulous = minutieux ; thorough = approfondi.', 'Après certaines expressions négatives en début de phrase, on inverse auxiliaire et sujet : « Rarely have I… ».', 'Les expressions imagées ajoutent des nuances : « over the moon » exprime une grande joie.']
];
fs.mkdirSync('src/data', { recursive: true });
for (const [i, level] of levels.entries()) {
 const data = { id: level.id, name: level.name.replace('Très Débutant','Très débutant').replace('Intermédiaire+','Intermédiaire avancé'), description: level.desc.replace('passé composé','prétérit'), lessons: level.lessons.map((lesson,j)=>({
  id: `${level.id.toLowerCase()}-${j+1}`, title: lesson.title, category: ['Vocabulaire et grammaire','Anglais du quotidien','Grammaire et expression','Structures et expressions','Nuances et registre'][i], tip: tips[i][j],
  exercises: lesson.ex.map((ex,k)=>({id:`${level.id.toLowerCase()}-${j+1}-${k+1}`,type:ex.t,prompt:ex.q||ex.s,...(ex.t==='order'?{words:ex.words,answer:ex.words.join(' ')}:{options:ex.opts,answer:ex.a}),explanation:tips[i][j]}))
 }))};
 // Remove an ambiguous sky-colour question and keep the future lesson at B1.
 if(i===0){data.lessons[1].exercises[2].prompt='Complétez avec « bleu » : The sky is ___.';}
 if(i===2){data.lessons[2].exercises[2]={id:'b1-3-3',type:'fill',prompt:'Look at those clouds! It ___ rain.',options:['is going to','going','will to','is go'],answer:0,explanation:'On utilise be going to pour une prévision appuyée par un indice visible.'};}
 fs.writeFileSync(`src/data/${level.id.toLowerCase()}.json`, JSON.stringify(data,null,2)+'\n');
}
console.log('Migrated',levels.length,'levels;',levels.flatMap(l=>l.lessons).length,'lessons;',levels.flatMap(l=>l.lessons).flatMap(l=>l.ex).length,'exercises.');
