"use client";
import { useEffect, useState } from "react";

export type RoleQuestion = { prompt: string; answers: [string,string,string,string]; correct: number; why: string; source: string };
export type RoleMission = { id: string; role: string; title: string; lesson: string; questions: RoleQuestion[] };

export default function RoleQuest({missions,storageId}: {missions: RoleMission[];storageId:string}) {
 const [id,setId]=useState(missions[0]?.id??"");
 const [step,setStep]=useState(0);
 const [choice,setChoice]=useState<number|null>(null);
 const [points,setPoints]=useState(0);
 const [finished,setFinished]=useState(false);
 const [bests,setBests]=useState<Record<string,number>>({});
 useEffect(()=>{try{const value=JSON.parse(localStorage.getItem(storageId)??"{}");if(value&&typeof value==="object"&&!Array.isArray(value))setBests(value);}catch{}},[storageId]);
 const mission=missions.find(m=>m.id===id)??missions[0];
 if(!mission)return <p>Lessons are being prepared.</p>;
 const question=mission.questions[step];
 function selectMission(next:string){setId(next);setStep(0);setChoice(null);setPoints(0);setFinished(false);}
 function advance(){
  const total=points+(choice===question.correct?1:0);
  setPoints(total);
  if(step===mission.questions.length-1){setFinished(true);const updated={...bests,[mission.id]:Math.max(total,bests[mission.id]??0)};setBests(updated);try{localStorage.setItem(storageId,JSON.stringify(updated));}catch{}}
  else{setStep(step+1);setChoice(null);}
 }
 return <section aria-label="Guided learning missions">
 <div className="card-grid two section">{missions.map(m=><button key={m.id} type="button" onClick={()=>selectMission(m.id)} aria-pressed={m.id===mission.id} style={{display:"block",textAlign:"left",padding:20,border:"1px solid currentColor",borderRadius:12,background:"transparent",color:"inherit",cursor:"pointer"}}>
 <strong>{m.role} — {m.title}</strong><p>{m.lesson}</p><small>Best score: {bests[m.id]??"Not attempted"} / {m.questions.length}</small></button>)}</div>
 <div className="feature-card" style={{marginTop:24,padding:24}}><p className="eyebrow">{mission.role} · {finished?"Mission completed":`Question ${step+1} / ${mission.questions.length}`}</p>
 {finished?<><h2>Mission complete: {points} / {mission.questions.length}</h2><p>Read the lesson again or try another role. Scores are saved on this browser, not to an account.</p><button type="button" onClick={()=>selectMission(mission.id)}>Try again</button></>:
 <><h2>{question.prompt}</h2><div style={{display:"grid",gap:12}}>{question.answers.map((answer,i)=><button key={i} type="button" disabled={choice!==null} onClick={()=>setChoice(i)} style={{padding:14,textAlign:"left",borderRadius:8,border:"1px solid #888",color:"inherit",background:"transparent"}}>{String.fromCharCode(65+i)}. {answer}</button>)}</div>
 {choice!==null&&<div role="status" style={{marginTop:20}}><p><strong>{choice===question.correct?"Correct.":"Review:"}</strong> {question.why}</p><p><strong>Reference:</strong> {question.source}</p><button type="button" onClick={advance}>{step+1===mission.questions.length?"Finish mission":"Next question →"}</button></div>}</>}
 </div></section>;
}
