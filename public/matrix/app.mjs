import {SAVE_KEY,CHAPTERS,QUIZZES,UPGRADES,freshCampaign,restoreCampaign,finishMission,answerQuestion,buyUpgrade,nextMission,missionBonuses,availableUpgrade} from './campaign.mjs';
import {Mission,WIDTH,HEIGHT,PATH,PADS,TOWERS,MAZE,DILEMMAS,matches} from './engine.mjs';
const $=id=>document.getElementById(id);let state=freshCampaign(),persistent=true;
try{state=restoreCampaign(localStorage.getItem(SAVE_KEY));}catch{persistent=false;}
let mission,active=false,paused=false,speed=1,last=performance.now(),lastRevision=-1,frame=0,quizFeedback=null,hints=0;
const canvas=$('canvas'),ctx=canvas.getContext('2d');
let towerType = null;
let buildSpot = null;
let selectedTower = null;
function save(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(state));}catch{persistent=false;}if(!persistent)$('save-note').textContent='Browser storage is unavailable. This session will not survive closing the page.';}
function button(text,action){const b=document.createElement('button');b.textContent=text;b.addEventListener('click',action);return b;}
function clear(node){node.replaceChildren();}
function info(text){$('status').textContent=text;}
function header(){
 const c=CHAPTERS[state.level];$('goal').textContent=c.mode==='match'?'Drag a tile onto a neighbor or tap two neighboring tiles. Match three or more in a line and clear 24 symbols.':c.goal;
 $('story-title').textContent='Chapter '+(state.level+1)+' story · '+c.title;
 $('story-text').textContent=c.text;
 clear($('chapters'));CHAPTERS.forEach((c,i)=>{const li=document.createElement('li');li.textContent=`${i+1}. ${c.title}`;li.className=i===state.level?'current':i<state.level?'done':'';$('chapters').append(li);});
}
function hud(){const c=CHAPTERS[state.level];$('mode').textContent=`${c.mode.toUpperCase()} · ${mission?.score??0} mission score`;$('integrity').textContent=`Integrity: ${Math.ceil(mission?.hp??100)}`;$('energy').textContent=c.mode==='defense'?`Energy: ${mission?.energy??180}`:c.mode==='match'?`Symbols: ${mission?.cleared??0} / 24`:'';$('wallet').textContent=`Quiz points: ${state.bank}`;if(mission?.mode==='defense')updatePlacement();}
function setup(){
 header();mission=new Mission(CHAPTERS[state.level].mode,missionBonuses(state),state.level===2);hints=state.upgrades.focus;active=false;paused=false;lastRevision=-1;$('hint').hidden=!hints;
 $('between').hidden=true;$('controls').hidden=false;$('stage').hidden=false;$('start').hidden=false;$('start').disabled=false;$('start').textContent=mission.mode==='defense'?'Start wave':'Begin chapter';$('pause').hidden=true;$('pause').textContent='Pause';$('speed').hidden=mission.mode!=='defense';
 $('ward-controls').hidden=mission.mode!=='defense';$('move-controls').hidden=!['shooter','boss','maze'].includes(mission.mode);$('fire').hidden=mission.mode==='maze';document.querySelectorAll('[data-move=up],[data-move=down]').forEach(b=>b.hidden=mission.mode!=='maze');
 canvas.hidden=['match','choice'].includes(mission.mode);$('match').hidden=mission.mode!=='match';$('choices').hidden=mission.mode!=='choice';
 clearPlacement();
 canvas.classList.toggle('defense-map', mission.mode === 'defense');
 info(state.phase==='briefing' && mission.mode==='defense'?'Choose a tower, pick a spot beside the route, then build.':'');hud();draw();
 if(state.phase!=='briefing')showBetween();
 else if(mission.mode==='match')begin();
 else renderInteractive();
 save();
}
function begin(){if(state.phase!=='briefing'||mission.result)return;mission.start();active=true;paused=false;lastRevision=-1;$('start').hidden=true;$('pause').hidden=false;info(CHAPTERS[state.level].goal);renderInteractive();if(!canvas.hidden)canvas.focus();}
$('start').addEventListener('click',begin);
$('pause').addEventListener('click',()=>{paused=!paused;mission.held.clear();$('pause').textContent=paused?'Resume':'Pause';info(paused?'Paused.':CHAPTERS[state.level].goal);lastRevision=-1;renderInteractive();});
$('speed').addEventListener('click',()=>{speed=speed===1?2:1;$('speed').textContent=`Speed: ${speed}×`;});
$('reset').addEventListener('click',()=>{if(confirm('Restart this campaign and clear its local quiz points?')){state=freshCampaign();quizFeedback=null;setup();}});
function clearPlacement() {
  towerType = null;
  buildSpot = null;
  selectedTower = null;
}

function updatePlacement() {
  const spec = TOWERS[towerType];
  const canBuild = state.phase === 'briefing' && !!spec && !!buildSpot
    && !mission.placementIssue(towerType, buildSpot.x, buildSpot.y);

  $('build').disabled = !canBuild;
  $('build').textContent = spec ? `Build ${spec.name} · ${spec.cost}` : 'Build tower';
  $('sell').hidden = !selectedTower || !!mission.result;
  if (selectedTower) $('sell').textContent = `Sell ${selectedTower.name} · +${Math.floor(selectedTower.cost / 2)}`;
  $('cancel-placement').hidden = !towerType && !buildSpot && !selectedTower;
  for (const option of $('tower-options').children) {
    option.setAttribute('aria-pressed', String(option.dataset.tower === towerType));
  }
}

function placementMessage() {
  if (selectedTower) return `${selectedTower.name} selected. Its attack range is highlighted.`;
  if (!towerType) return 'Choose a tower to see its cost and attack range.';
  if (!buildSpot) return `${TOWERS[towerType].name} selected. Choose a spot beside the route.`;
  return mission.placementIssue(towerType, buildSpot.x, buildSpot.y)
    || 'Attack range previewed. Press Build to place the tower.';
}

function selectBuildSpot(x, y) {
  if (state.phase !== 'briefing' || mission.result || mission.mode !== 'defense') return;
  selectedTower = mission.towers.find(tower => Math.hypot(tower.x - x, tower.y - y) <= 18) ?? null;
  buildSpot = selectedTower ? null : { x, y };
  if (selectedTower) towerType = null;
  info(placementMessage());
  updatePlacement();
  draw();
}

for (const [type, spec] of Object.entries(TOWERS)) {
  const option = button('', () => {
    if (mission.result) return;
    selectedTower = null;
    towerType = type;
    info(placementMessage());
    updatePlacement();
    draw();
  });
  option.dataset.tower = type;
  option.style.setProperty('--tower-color', spec.color);
  const name = document.createElement('span');
  name.className = 'tower-name';
  name.textContent = `${spec.name} · ${spec.cost}`;
  const role = document.createElement('span');
  role.className = 'tower-role';
  role.textContent = spec.role;
  option.append(name, role);
  $('tower-options').append(option);
}
PADS.forEach((spot, index) => $('pads').append(button(`Spot ${index + 1}`, () => selectBuildSpot(spot.x, spot.y))));
$('build').addEventListener('click', () => {
  if (!buildSpot || !towerType || state.phase !== 'briefing') return;
  if (mission.build(buildSpot.x, buildSpot.y, towerType)) buildSpot = null;
  info(mission.message);
  hud();
  draw();
});
$('sell').addEventListener('click', () => {
  if (!selectedTower || state.phase !== 'briefing' || !mission.sell(selectedTower)) return;
  selectedTower = null;
  info(mission.message);
  hud();
  draw();
});
$('cancel-placement').addEventListener('click', () => {
  clearPlacement();
  info('Selection cleared.');
  updatePlacement();
  draw();
});
document.querySelectorAll('[data-move]').forEach(b=>b.addEventListener('click',()=>{if(paused)return;mission.move(b.dataset.move);info(mission.message);draw();}));$('fire').addEventListener('click',()=>{if(!paused)mission.fire();});
canvas.addEventListener('pointerdown',e=>{if(state.phase!=='briefing'||mission.result)return;const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*WIDTH/r.width,y=(e.clientY-r.top)*HEIGHT/r.height;canvas.focus();if(mission.mode==='defense'){selectBuildSpot(x,y);return;}else if(['shooter','boss'].includes(mission.mode)){mission.player.x=Math.max(25,Math.min(815,x));mission.fire();}info(mission.message);hud();draw();});
const keyActions={ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right',ArrowUp:'up',w:'up',W:'up',ArrowDown:'down',s:'down',S:'down',' ':'fire'};
window.addEventListener('keydown',e=>{if(!active||paused||e.target.matches('input,textarea,button,a'))return;const k=keyActions[e.key];if(!k)return;e.preventDefault();if(['left','right','fire'].includes(k))mission.held.add(k);if(mission.mode==='maze'&&k!=='fire')mission.move(k);else if(k==='fire')mission.fire();});
window.addEventListener('keyup',e=>{const k=keyActions[e.key];if(k)mission.held.delete(k);});window.addEventListener('blur',()=>mission.held.clear());
document.addEventListener('visibilitychange',()=>{if(document.hidden&&active&&!paused){paused=true;mission.held.clear();$('pause').textContent='Resume';info('Paused while this page was hidden.');lastRevision=-1;renderInteractive();}});
const glyphs=['✦','●','▲','◆','♥'],colors=['#80d3a8','#8ed9ee','#edd07e','#d999d0','#e9a69f'];
$('hint').addEventListener('click',()=>{
 if(!active||paused||!hints)return;
 if(mission.mode==='choice'){info(`Guidance: ${DILEMMAS[mission.choiceIndex].options[DILEMMAS[mission.choiceIndex].answer]}`);}
 else if(mission.mode==='match'){let suggestion='';for(let r=0;r<7&&!suggestion;r++)for(let c=0;c<7&&!suggestion;c++)for(const [dr,dc] of [[1,0],[0,1]]){const y=r+dr,x=c+dc;if(y>=7||x>=7)continue;[mission.board[r][c],mission.board[y][x]]=[mission.board[y][x],mission.board[r][c]];const found=matches(mission.board).size>0;[mission.board[r][c],mission.board[y][x]]=[mission.board[y][x],mission.board[r][c]];if(found){suggestion=`Try row ${r+1}, column ${c+1} with row ${y+1}, column ${x+1}.`;break;}}info(suggestion||'Try another pair.');}
 else return;
 hints--;$('hint').hidden=hints===0;
});
function animateMatch(rounds){
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const cells=$('match').children;
 const lastClear=new Map();
 rounds.forEach((round,i)=>round.forEach(cell=>lastClear.set(cell,i)));
 for(const [cell,round] of lastClear){
   cells[cell]?.animate([
     {transform:'translateY(-7px) scale(.87)',backgroundColor:round?'#c47cf0':'#f0cd72',boxShadow:'0 0 16px currentColor'},
     {transform:'translateY(0) scale(1.06)',offset:.55},
     {transform:'none',boxShadow:'none'}
   ],{duration:270,delay:Math.min(round,4)*70,easing:'ease-out'});
 }
}
const matchGrid=$('match');
matchGrid.style.touchAction='none';
let tileDrag=null, suppressTileClick=false;

matchGrid.addEventListener('pointerdown',event=>{
 if(!event.isPrimary||event.button!==0)return;
 suppressTileClick=false;
 const tile=event.target.closest('button[data-cell]');
 if(!tile||tile.disabled)return;
 tileDrag={tile,id:event.pointerId,x:event.clientX,y:event.clientY};
 tile.setPointerCapture(event.pointerId);
});

matchGrid.addEventListener('pointerup',event=>{
 if(tileDrag?.id!==event.pointerId)return;
 const {tile,x,y}=tileDrag;
 tileDrag=null;
 if(Math.hypot(event.clientX-x,event.clientY-y)<8)return;
 suppressTileClick=true;
 if(paused||mission.mode!=='match'||!mission.running||mission.result)return;
 const target=document.elementFromPoint(event.clientX,event.clientY)?.closest('button[data-cell]');
 if(!target||target.parentElement!==matchGrid||target.disabled)return;
 const [r,c]=tile.dataset.cell.split('-').map(Number);
 const [toRow,toCol]=target.dataset.cell.split('-').map(Number);
 if(Math.abs(r-toRow)+Math.abs(c-toCol)!==1)return;
 mission.matchSelection=null;
 mission.selectCell(r,c);
 playMatchCell(toRow,toCol);
});

for(const type of ['pointercancel','lostpointercapture']){
 matchGrid.addEventListener(type,event=>{
   if(tileDrag?.id===event.pointerId)tileDrag=null;
 });
}
matchGrid.addEventListener('click',event=>{
 if(suppressTileClick&&event.detail>0){
   suppressTileClick=false;
   event.stopPropagation();
 }
},true);

function playMatchCell(r,c){
 if(paused)return;
 const rounds=mission.selectCell(r,c);
 info(mission.message);
 renderInteractive();
 if(rounds)animateMatch(rounds);
 hud();
}

function renderInteractive(){
 if(mission.mode==='match'&&lastRevision!==mission.revision){const focused=document.activeElement?.dataset.cell;clear($('match'));for(let r=0;r<7;r++)for(let c=0;c<7;c++){const v=mission.board[r][c],b=button(glyphs[v],()=>playMatchCell(r,c));b.dataset.cell=`${r}-${c}`;b.style.color=colors[v];b.style.cursor='grab';b.setAttribute('aria-label',`Row ${r+1}, column ${c+1}: ${['star','circle','triangle','diamond','heart'][v]}`);b.disabled=paused||!mission.running||!!mission.result;b.className=mission.matchSelection?.r===r&&mission.matchSelection?.c===c?'selected':'';$('match').append(b);}lastRevision=mission.revision;if(focused)$('match').querySelector(`[data-cell="${focused}"]`)?.focus();}
 if(mission.mode==='choice'&&lastRevision!==mission.revision){clear($('choices'));const d=DILEMMAS[mission.choiceIndex];if(d){const h=document.createElement('h3');h.textContent=d.question;$('choices').append(h);d.options.forEach((o,i)=>{const b=button(o,()=>{mission.choose(i);info(mission.message);renderInteractive();});b.disabled=!mission.running;$('choices').append(b);});}lastRevision=mission.revision;}
}
function showBetween(){
 active=false;mission.running=false;$('hint').hidden=true;$('controls').hidden=true;$('stage').hidden=true;$('between').hidden=false;const node=$('between');clear(node);hud();
 if(quizFeedback){const p=document.createElement('p');p.className='feedback';p.textContent=quizFeedback;node.append(p);node.append(button('Continue',()=>{quizFeedback=null;showBetween();}));return;}
 if(state.phase==='quiz'){const q=QUIZZES[state.level][state.answers.length],h=document.createElement('h2');h.textContent=`Bible bonus · Question ${state.answers.length+1} of 3`;node.append(h);const p=document.createElement('p');p.textContent=q.text;node.append(p);const answers=document.createElement('div');answers.className='answers';q.options.forEach((a,i)=>answers.append(button(a,()=>{const correct=i===q.answer;state=answerQuestion(state,i);quizFeedback=(correct?'Correct. +25 quiz points. ':'No points this time. ')+q.explanation+' '+q.reference;save();showBetween();})));node.append(answers);const note=document.createElement('p');note.textContent='Each question can earn points once. Every answer includes a Scripture reference.';note.className='note';node.append(note);}
 else if(state.phase==='shop'){const h=document.createElement('h2');h.textContent=`Prepare for chapter ${state.level+2}`;node.append(h);const p=document.createElement('p');p.textContent=`Spend your ${state.bank} quiz points on the next mission, or keep them for later. Upgrades last for that mission and its retries.`;node.append(p);const grid=document.createElement('div');grid.className='shop';Object.entries(UPGRADES).filter(([key])=>availableUpgrade(state.level,key)).forEach(([key,u])=>{const card=document.createElement('article'),title=document.createElement('h3'),desc=document.createElement('p'),owned=document.createElement('small');title.textContent=u.name;desc.textContent=u.detail;owned.textContent=`Selected: ${state.upgrades[key]} / ${u.max}`;const b=button(`Spend ${u.cost} points`,()=>{state=buyUpgrade(state,key);save();showBetween();});b.disabled=state.bank<u.cost||state.upgrades[key]>=u.max;card.append(title,desc,owned,b);grid.append(card);});node.append(grid,button(`Continue to ${CHAPTERS[state.level+1].title} →`,()=>{state=nextMission(state);setup();}));}
 else if(state.phase==='victory'){const h=document.createElement('h2');h.textContent='Campaign complete';const p=document.createElement('p');p.textContent=`You completed all seven chapters. You earned ${state.earned} quiz points and spent ${state.spent} on upgrades. Reflect on how love, mercy, and discernment shaped the journey.`;const a=document.createElement('a');a.href='/bible-study';a.textContent='Continue with a Bible study →';node.append(h,p,a);}
 node.querySelector('h2')?.setAttribute('tabindex','-1');node.querySelector('h2')?.focus();
}
function ship(x,y,color){ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(x,y-20);ctx.lineTo(x+17,y+13);ctx.lineTo(x,y+6);ctx.lineTo(x-17,y+13);ctx.closePath();ctx.fill();ctx.fillStyle='#f3d875';ctx.fillRect(x-5,y+12,10,8);}
function drawPlacement() {
  const spot = selectedTower ?? buildSpot;
  if (!spot) return;
  const spec = selectedTower ?? TOWERS[towerType];
  const invalid = !selectedTower && spec && mission.placementIssue(towerType, spot.x, spot.y);
  ctx.save();
  ctx.strokeStyle = invalid ? '#f58f88' : (spec?.color ?? '#e8d99f');
  ctx.lineWidth = 2;
  if (spec) {
    ctx.globalAlpha = .72;
    ctx.setLineDash([7, 5]);
    ctx.beginPath();
    ctx.arc(spot.x, spot.y, spec.range, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.arc(spot.x, spot.y, 19, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}
function draw(){
 if(!ctx)return;ctx.fillStyle='#061117';ctx.fillRect(0,0,WIDTH,HEIGHT);ctx.strokeStyle='#142a31';ctx.lineWidth=1;for(let x=0;x<840;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,480);ctx.stroke();}for(let y=0;y<480;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(840,y);ctx.stroke();}
 if(mission.mode==='defense'){ctx.strokeStyle='#254956';ctx.lineWidth=25;ctx.lineJoin='round';ctx.beginPath();PATH.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.stroke();ctx.fillStyle='#91c4c4';ctx.font='13px Arial';ctx.fillText('ENTRY →',12,105);ctx.fillText('PROTECT EXIT',720,150);PADS.forEach((p,i)=>{ctx.strokeStyle='#45665d';ctx.lineWidth=1;ctx.beginPath();ctx.arc(p.x,p.y,20,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#b3c8be';ctx.fillText(String(i+1),p.x-4,p.y+5);});drawPlacement();for(const t of mission.towers){ctx.fillStyle=t.color;ctx.beginPath();ctx.arc(t.x,t.y,15,0,Math.PI*2);ctx.fill();ctx.fillStyle='#082021';ctx.fillText(t.type==='archer'?'R':t.type[0].toUpperCase(),t.x-4,t.y+5);}for(const e of mission.enemies){ctx.fillStyle='#c98ebd';ctx.fillRect(e.x-10,e.y-10,20,20);ctx.fillStyle='#3c282e';ctx.fillRect(e.x-14,e.y-19,28,4);ctx.fillStyle='#94deb3';ctx.fillRect(e.x-14,e.y-19,28*e.hp/e.maxHp,4);}for(const s of mission.shots){ctx.strokeStyle='#f0d279';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.tx,s.ty);ctx.stroke();}ctx.fillStyle='#b6d4c6';ctx.fillText(`Packets: ${mission.spawned} / ${mission.total}`,15,460);}
 if(['shooter','boss'].includes(mission.mode)){ship(mission.player.x,mission.player.y,mission.invulnerability>0?'#edd18e':'#8ddbc4');for(const e of mission.invaders.filter(e=>e.hp>0)){ctx.fillStyle='#b694d1';ctx.fillRect(e.x-18,e.y-8,36,15);ctx.fillRect(e.x-24,e.y,8,15);ctx.fillRect(e.x+16,e.y,8,15);ctx.fillStyle='#07151b';ctx.fillRect(e.x-10,e.y-4,5,5);ctx.fillRect(e.x+5,e.y-4,5,5);}if(mission.mode==='boss'){const b=mission.boss;ctx.fillStyle='#d3a2b8';ctx.beginPath();ctx.moveTo(b.x,b.y+35);ctx.lineTo(b.x-65,b.y-25);ctx.lineTo(b.x+65,b.y-25);ctx.closePath();ctx.fill();ctx.fillStyle='#82def0';ctx.fillRect(b.x-14,b.y-12,28,28);ctx.fillStyle='#442e3a';ctx.fillRect(220,15,400,12);ctx.fillStyle='#ebce7a';ctx.fillRect(220,15,400*b.hp/b.maxHp,12);}ctx.fillStyle='#92e3e5';mission.bullets.forEach(b=>ctx.fillRect(b.x-2,b.y-10,4,15));ctx.fillStyle='#e5a08c';mission.hostile.forEach(b=>{ctx.beginPath();ctx.arc(b.x,b.y,6,0,Math.PI*2);ctx.fill();});}
 if(mission.mode==='maze'){const tile=48,ox=60,oy=24;for(let y=0;y<MAZE.length;y++)for(let x=0;x<15;x++)if(MAZE[y][x]==='#'){ctx.fillStyle='#25444d';ctx.fillRect(ox+x*tile,oy+y*tile,tile-2,tile-2);}for(const l of mission.mazeLights)if(!l.collected){ctx.fillStyle='#efd178';ctx.beginPath();ctx.arc(ox+l.x*tile+24,oy+l.y*tile+24,7,0,Math.PI*2);ctx.fill();}for(const s of mission.sentinels){ctx.fillStyle='#d7a0c1';ctx.fillRect(ox+s.x*tile+11,oy+s.y*tile+11,26,26);}const p=mission.mazePlayer;ctx.fillStyle='#8bdcb4';ctx.beginPath();ctx.arc(ox+p.x*tile+24,oy+p.y*tile+24,15,0,Math.PI*2);ctx.fill();ctx.fillStyle='#c6dfd5';ctx.font='14px Arial';ctx.fillText(`Lights: ${mission.mazeLights.filter(l=>l.collected).length} / 12`,60,472);}
}
function loop(now){const dt=Math.min((now-last)/1000,.05);last=now;if(active&&!paused){for(let i=0;i<speed;i++)mission.update(dt);if(mission.result==='victory'){state=finishMission(state);save();showBetween();}else if(mission.result==='defeat'){active=false;$('start').hidden=true;$('pause').hidden=true;info('Integrity exhausted. Retry this chapter; your purchased upgrades remain available.');$('between').hidden=false;clear($('between'));$('between').append(button('Retry chapter',()=>setup()));}renderInteractive();}if(++frame%6===0)hud();if(!canvas.hidden)draw();requestAnimationFrame(loop);}
setup();requestAnimationFrame(loop);
