import test from 'node:test';
import assert from 'node:assert/strict';
// The same buildless modules run in browsers and Node.
import {freshCampaign,finishMission,answerQuestion,buyUpgrade,nextMission,missionBonuses,restoreCampaign,QUIZZES,availableUpgrade,UPGRADES} from '../public/matrix/campaign.mjs';
// Browser game engine has no build dependency.
import {Mission,PADS,PATH,MAZE,matches,hasMove,DILEMMAS} from '../public/matrix/engine.mjs';
test('seven chapters complete, quiz rewards cannot be collected twice, and spending carries to the next mission',()=>{
 let s=freshCampaign();for(let chapter=0;chapter<7;chapter++){
  s=finishMission(s);for(let i=0;i<3;i++)s=answerQuestion(s,QUIZZES[chapter][i].answer);
  assert.equal(s.earned,(chapter+1)*75);assert.equal(answerQuestion(s,0),s);
  if(chapter<6){const key=['power','focus','shield'].find(k=>availableUpgrade(chapter,k))!;s=buyUpgrade(s,key);assert.equal(s.upgrades[key],1);s=nextMission(s);assert.equal(s.level,chapter+1);assert.deepEqual(restoreCampaign(JSON.stringify(s)),s);}
 }assert.equal(s.phase,'victory');assert.equal(s.bank,s.earned-s.spent);assert.equal(s.earned,525);
});
test('store refuses overspending, invalid items, and more than two of an upgrade',()=>{
 let s={...freshCampaign(),level:1,phase:'shop',answers:[0,1,2],bank:75,earned:75};s=buyUpgrade(s,'shield');s=buyUpgrade(s,'shield');assert.equal(buyUpgrade(s,'shield'),s);assert.equal(buyUpgrade(s,'power'),s);assert.equal(buyUpgrade(s,'unknown'),s);assert.equal(s.bank,25);
});
test('shop sells only upgrades useful in the upcoming mission',()=>{const s={...freshCampaign(),phase:'shop',bank:75,earned:75,answers:[0,1,2]};assert.equal(buyUpgrade(s,'energy'),s);const upgraded=buyUpgrade(s,'focus');assert.equal(missionBonuses(nextMission(upgraded)).hints,1);assert.equal(upgraded.bank,50);assert.equal(UPGRADES.focus.cost,25);});
test('invalid saves reset without throwing; local progress never contains account entitlements',()=>{
 for(const raw of ['{','null',JSON.stringify({...freshCampaign(),level:100}),JSON.stringify({...freshCampaign(),bank:99}),JSON.stringify({...freshCampaign(),phase:'shop'})])assert.deepEqual(restoreCampaign(raw),freshCampaign());assert.equal('uploadAllowed' in freshCampaign(),false);
});
test('wrong answers advance with explanations available but award no points',()=>{let s=finishMission(freshCampaign());s=answerQuestion(s,2);assert.equal(s.bank,0);assert.equal(s.answers.length,1);assert.ok(QUIZZES[0][0].reference);assert.ok(QUIZZES[0][0].explanation);});
test('defense waits for Start, rejects route placement, can be won with three affordable wards',()=>{
 const m=new Mission('defense');assert.equal(m.build(PATH[1].x,PATH[1].y),false);for(const i of [0,1,3])assert.equal(m.build(PADS[i].x,PADS[i].y),true);for(let i=0;i<100;i++)m.update(.05);assert.equal(m.spawned,0);m.start();for(let i=0;i<3000&&!m.result;i++)m.update(.05);assert.equal(m.result,'victory');assert.ok(m.hp>0);
});
test('advanced defense implements slow effect and damage upgrades',()=>{const m=new Mission('defense',{hp:130,energy:300,damage:1.5},true);m.selected='slow';m.build(125,65);m.start();for(let i=0;i<60;i++)m.update(.05);assert.ok(m.enemies.some((e:any)=>e.slow>0));assert.equal(m.hp,130);});
test('match board begins without accidental free wins, has a move, and invalid swaps revert',()=>{
 const m=new Mission('match');assert.equal(matches(m.board).size,0);assert.equal(hasMove(m.board),true);m.start();let invalid=false;for(let r=0;r<7&&!invalid;r++)for(let c=0;c<6&&!invalid;c++){const before=JSON.stringify(m.board);m.selectCell(r,c);m.selectCell(r,c+1);if(m.moves===0){assert.equal(JSON.stringify(m.board),before);invalid=true;}}assert.equal(invalid,true);
});
test('match mode can finish through ordinary adjacent swaps with exact non-cumulative scoring',()=>{const m=new Mission('match');m.start();for(let turn=0;turn<100&&!m.result;turn++){let found=false;for(let r=0;r<7&&!found;r++)for(let c=0;c<7&&!found;c++)for(const [dr,dc] of [[1,0],[0,1]]){let y=r+dr,x=c+dc;if(y>=7||x>=7)continue;[m.board[r][c],m.board[y][x]]=[m.board[y][x],m.board[r][c]];const ok=matches(m.board).size>0;[m.board[r][c],m.board[y][x]]=[m.board[y][x],m.board[r][c]];if(ok){m.selectCell(r,c);m.selectCell(y,x);found=true;break;}}}assert.equal(m.result,'victory');assert.equal(m.score,m.cleared*10);});
test('connection chapter requires all three choices; incorrect answers do not win',()=>{const m=new Mission('choice');m.start();assert.equal(m.choose(2),false);assert.equal(m.choiceIndex,0);for(const d of DILEMMAS)m.choose(d.answer);assert.equal(m.result,'victory');});
test('maze walls block movement and all lights can be collected via legal paths',()=>{const m=new Mission('maze');m.start();m.move('left');assert.deepEqual(m.mazePlayer,{x:1,y:1});for(const light of m.mazeLights){const queue=[{...m.mazePlayer,path:[] as string[]}],seen=new Set<string>();let route:string[]|null=null;while(queue.length){const p=queue.shift()!;if(p.x===light.x&&p.y===light.y){route=p.path;break;}for(const [dir,dx,dy] of [['right',1,0],['left',-1,0],['up',0,-1],['down',0,1]] as const){const x=p.x+dx,y=p.y+dy,k=`${x},${y}`;if(MAZE[y]?.[x]==='.'&&!seen.has(k)){seen.add(k);queue.push({x,y,path:[...p.path,dir]});}}}assert.ok(route);for(const dir of route!)m.move(dir);}assert.equal(m.result,'victory');});
test('final guardian never auto-wins; real shots can defeat it',()=>{const m=new Mission('boss');m.start();for(let i=0;i<100;i++)m.update(.05);assert.equal(m.boss.hp,600);for(let i=0;i<5000&&!m.result;i++){m.player.x=m.boss.x;m.invulnerability=1;m.fire();m.update(.05);}assert.equal(m.result,'victory');assert.ok(m.score>0);});
test('shooter can be completed using movement and firing; bullets hit only one target',()=>{const m=new Mission('shooter');m.start();for(let i=0;i<20000&&!m.result;i++){const e=m.invaders.find((e:any)=>e.hp>0);if(e)m.player.x=e.x;m.invulnerability=1;m.fire();m.update(.05);}assert.equal(m.result,'victory');assert.equal(m.score,1800);});
