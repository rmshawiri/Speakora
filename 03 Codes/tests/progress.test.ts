import { test } from 'node:test';
import assert from 'node:assert/strict';
import {emptyProgress,finish,totalXP,unlocked,stars,streak,dateKey,validateProgress,loadProgress,saveProgress} from '../src/core/progress';
import {lessons,levels} from '../src/data';
test('82 valid exercises, 15 lessons, five levels with unique IDs',()=>{
 assert.equal(levels.length,5);assert.equal(lessons.length,15);const exercises=lessons.flatMap(l=>l.exercises);assert.equal(exercises.length,82);assert.equal(new Set(exercises.map(e=>e.id)).size,82);
 for(const e of exercises){if(e.type==='order')assert.equal(e.words.join(' '),e.answer);else {assert.ok(e.answer>=0&&e.answer<e.options.length);assert.equal(new Set(e.options).size,e.options.length);}}
});
test('opening the app never credits a day',()=>assert.equal(streak(emptyProgress()),0));
test('XP capped per lesson, improvement awards difference, failure does not unlock',()=>{
 let p=emptyProgress();let r=finish(p,'a1-1',2);assert.equal(r.earned,20);assert.equal(unlocked(r.progress,'a1-2'),false);p=r.progress;
 r=finish(p,'a1-1',3);assert.equal(r.earned,10);assert.equal(unlocked(r.progress,'a1-2'),true);p=r.progress;
 r=finish(p,'a1-1',5);assert.equal(r.earned,40);p=r.progress;
 for(let i=0;i<50;i++)p=finish(p,'a1-1',5).progress;
 assert.equal(totalXP(p),70);assert.equal(p.days.length,1);assert.equal(finish(p,'a1-1',1).earned,0);
});
test('locked lessons and levels cannot be submitted',()=>{assert.throws(()=>finish(emptyProgress(),'a2-1',5));assert.equal(unlocked(emptyProgress(),'missing'),false);});
test('all levels progressively unlock after previous lessons',()=>{let p=emptyProgress();for(const l of lessons){assert.equal(unlocked(p,l.id),true);p=finish(p,l.id,l.exercises.length).progress;}assert.equal(totalXP(p),1120);});
test('star thresholds are exact',()=>{assert.deepEqual([0,59,60,74,75,89,90,100].map(stars),[0,0,1,1,2,2,3,3]);});
test('streak respects local calendar, yesterday, gaps, repeated same day and year boundary',()=>{
 let p=emptyProgress();p=finish(p,'a1-1',0,new Date(2025,11,31,23,58)).progress;p=finish(p,'a1-1',0,new Date(2026,0,1,0,5)).progress;
 assert.equal(streak(p,new Date(2026,0,1)),2);assert.equal(streak(p,new Date(2026,0,2)),2);assert.equal(streak(p,new Date(2026,0,3)),0);
 p=finish(p,'a1-1',0,new Date(2026,0,3)).progress;assert.equal(streak(p,new Date(2026,0,3)),1);assert.equal(dateKey(new Date(2026,0,1)),'2026-01-01');
});
test('import validates schema, scores, dates, prototype keys and sequence',()=>{
 const p=finish(emptyProgress(),'a1-1',5).progress;assert.deepEqual(validateProgress(JSON.parse(JSON.stringify(p))),p);
 for(const bad of [null,[],{...p,version:2},{...p,best:{'a1-1':100}},{...p,best:{'a1-1':-1}},{...p,best:{'a1-1':2.5}},{...p,best:{'unknown':1}},{...p,best:{'c1-3':5}},{...p,days:['2026-02-30']},{...p,days:['2099-01-01']},JSON.parse('{"version":1,"theme":"light","sound":true,"best":{"__proto__":2},"days":[]}')])assert.throws(()=>validateProgress(bad));
});
test('local storage roundtrip and explicit errors',()=>{let raw:string|null=null;const storage={getItem:()=>raw,setItem:(_k:string,v:string)=>{raw=v;}};const p=finish(emptyProgress(),'a1-1',5).progress;saveProgress(storage,p);assert.deepEqual(loadProgress(storage).progress,p);raw='{broken';assert.ok(loadProgress(storage).error);assert.throws(()=>saveProgress({setItem:()=>{throw new Error('quota');}},p));});
