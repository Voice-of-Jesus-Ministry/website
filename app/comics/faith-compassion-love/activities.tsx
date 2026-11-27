"use client";
import {useEffect,useState} from "react";
const questions=[
{q:"How can we demonstrate God's love?",a:["Through words alone","Through compassionate actions","By seeking recognition"],c:1,e:"1 John 3:18 teaches love in deed and in truth."},
{q:"Who deserves our compassion?",a:["Everyone","Only our friends","Only people who agree with us"],c:0,e:"Luke 10:25–37 shows that neighborly mercy crosses social boundaries."},
{q:"Can small acts of kindness make a difference?",a:["Only with money","No","Yes"],c:2,e:"1 Peter 4:10 encourages us to use whatever gifts we have to serve others."},
{q:"Why should we serve others?",a:["To become famous","To reflect God's love","To receive rewards"],c:1,e:"Colossians 3:23 calls us to work heartily as unto the Lord."}
];
const tasks=["Pray for someone in need.","Encourage someone who is struggling.","Share something with another person.","Help someone without expecting a reward.","Read Scripture together as a family."];
const key="voj-love-in-action-mission-v1";
export default function Activities(){
const [answers,setAnswers]=useState<Record<number,number>>({});
const [done,setDone]=useState<number[]>([]);
const [ready,setReady]=useState(false);
useEffect(()=>{try{const saved:unknown=JSON.parse(localStorage.getItem(key)||"[]");if(Array.isArray(saved))setDone([...new Set(saved.filter((n):n is number=>Number.isInteger(n)&&n>=0&&n<tasks.length))]);}catch{}setReady(true)},[]);
useEffect(()=>{if(ready)try{localStorage.setItem(key,JSON.stringify(done))}catch{}},[done,ready]);
const score=questions.filter((q,i)=>answers[i]===q.c).length;
return <><section className="game-panel"><h2>Love in Action Challenge</h2><p>Choose an answer for each question. You can try again at any time.</p><progress aria-label="Quiz progress" max={questions.length} value={Object.keys(answers).length}/>{questions.map((q,i)=><fieldset key={q.q} style={{marginBlock:"1rem",padding:"1rem",minWidth:0}}><legend>{i+1}. {q.q}</legend>{q.a.map((a,j)=><label key={a} style={{display:"block",padding:"0.5rem"}}><input type="radio" name={"love-"+i} checked={answers[i]===j} onChange={()=>setAnswers(old=>({...old,[i]:j}))}/> {a}</label>)}{answers[i]!==undefined&&<p role="status">{answers[i]===q.c?"Correct! ":"Try again. "}{q.e}</p>}</fieldset>)}<p role="status">Score: {score} of {questions.length}</p><button type="button" className="button" onClick={()=>setAnswers({})}>Restart challenge</button></section><section className="game-panel"><h2>Five Acts of Love</h2><p>Try these activities with your family this week. Progress stays on this device.</p><progress aria-label="Family mission progress" max={tasks.length} value={done.length}/><p role="status">{done.length} of {tasks.length} completed</p>{tasks.map((task,i)=><label key={task} style={{display:"block",padding:"0.5rem"}}><input type="checkbox" disabled={!ready} checked={done.includes(i)} onChange={()=>setDone(old=>old.includes(i)?old.filter(n=>n!==i):[...old,i])}/> {task}</label>)}<button className="button" type="button" disabled={!ready} onClick={()=>setDone([])}>Reset family mission</button></section></>}
