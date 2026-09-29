export function speak(text:string,onError:()=>void) {
 if(!('speechSynthesis' in window)){onError();return;}
 speechSynthesis.cancel();
 const voice=speechSynthesis.getVoices().filter(v=>v.lang.startsWith('en')).sort((a,b)=>Number(b.localService)-Number(a.localService))[0];
 const utterance=new SpeechSynthesisUtterance(text);utterance.lang=voice?.lang||'en-GB';if(voice)utterance.voice=voice;utterance.rate=.85;
 utterance.onerror=onError;speechSynthesis.speak(utterance);
}
export function sound(success:boolean){try{const ctx=new AudioContext();const osc=ctx.createOscillator();const gain=ctx.createGain();osc.connect(gain);gain.connect(ctx.destination);osc.frequency.value=success?660:240;gain.gain.setValueAtTime(.035,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.18);osc.start();osc.stop(ctx.currentTime+.2);osc.onended=()=>void ctx.close();}catch{/* Optional sound never blocks learning. */}}
