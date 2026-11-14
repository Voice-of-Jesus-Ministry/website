// Adapted from the supplied Multiverse Arcade: defense, matching, shooter, maze, and core fight.
// The lore edition contributes the seven-chapter sequence and connection choices.
export const WIDTH = 840, HEIGHT = 480;
export const PATH = [{x:0,y:130},{x:250,y:130},{x:250,y:335},{x:590,y:335},{x:590,y:180},{x:840,y:180}];
export const PADS = [{x:125,y:65},{x:180,y:225},{x:350,y:270},{x:530,y:250},{x:700,y:110},{x:420,y:410}];
export const TOWERS = { aegis: {cost:50,range:150,damage:22,rate:.5}, precision: {cost:90,range:210,damage:60,rate:1}, slow: {cost:70,range:150,damage:10,rate:.6} };
export const MAZE = ['###############','#...#.........#','#.#.#.###.###.#','#.#...#...#...#','#.###.#.#.#.#.#','#.....#.#...#.#','###.#.#.#####.#','#...#.........#','###############'];
export const DILEMMAS = [
  {question:'Someone on the bridge has been excluded. What reflects the Samaritan’s example?',options:['Stop and offer practical help','Walk past to protect your reputation','Wait for someone more important'],answer:0,feedback:'Mercy takes practical action. Read Luke 10:33–37.'},
  {question:'A neighbor speaks in frustration. What follows James 1:19?',options:['Answer before they finish','Listen patiently before speaking','Make the argument louder'],answer:1,feedback:'Be swift to hear and slow to speak.'},
  {question:'You discover an error you caused. What fits truth and kindness?',options:['Blame the newest team member','Hide the evidence','Acknowledge it and help repair the harm'],answer:2,feedback:'Speak truthfully and treat others with kindness. Read Ephesians 4:25,32.'},
];
const distance = (a,b) => Math.hypot(a.x-b.x,a.y-b.y);
const clamp = (n,a,b) => Math.max(a,Math.min(b,n));
function segmentDistance(p,a,b) {const dx=b.x-a.x,dy=b.y-a.y,t=clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy),0,1);return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy);}
export function matches(board) {
  const found=new Set();
  for(let r=0;r<7;r++)for(let c=0;c<7;c++){
    if(c<5&&board[r][c]===board[r][c+1]&&board[r][c]===board[r][c+2]) {let k=c;while(k<7&&board[r][k]===board[r][c])found.add(r*7+k++);}
    if(r<5&&board[r][c]===board[r+1][c]&&board[r][c]===board[r+2][c]) {let k=r;while(k<7&&board[k][c]===board[r][c])found.add(k++*7+c);}
  }return found;
}
export function hasMove(board){for(let r=0;r<7;r++)for(let c=0;c<7;c++)for(const [dr,dc] of [[0,1],[1,0]]){const y=r+dr,x=c+dc;if(y>=7||x>=7)continue;[board[r][c],board[y][x]]=[board[y][x],board[r][c]];const yes=matches(board).size>0;[board[r][c],board[y][x]]=[board[y][x],board[r][c]];if(yes)return true;}return false;}
export class Mission {
  constructor(mode,bonuses={hp:100,energy:180,damage:1},advanced=false,rng=Math.random){
    this.mode=mode;this.hp=bonuses.hp;this.maxHp=bonuses.hp;this.energy=bonuses.energy;this.damage=bonuses.damage;this.advanced=advanced;this.rng=rng;this.result=null;this.running=false;this.score=0;this.time=0;this.message='';this.revision=0;
    this.towers=[];this.enemies=[];this.shots=[];this.spawned=0;this.spawnClock=0;this.total=advanced?20:12;this.selected='aegis';
    this.player={x:420,y:430};this.bullets=[];this.hostile=[];this.invaders=[];this.direction=1;this.fireClock=0;this.attackClock=0;this.invulnerability=0;this.held=new Set();this.boss={x:420,y:85,hp:600,maxHp:600};
    this.cleared=0;this.board=[];this.matchSelection=null;this.moves=0;this.choiceIndex=0;
    this.mazePlayer={x:1,y:1};this.mazeLights=[];this.sentinels=[{x:13,y:7},{x:11,y:1}];this.mazeClock=0;
    if(mode==='match')this.newBoard();
    if(mode==='shooter')for(let r=0;r<3;r++)for(let c=0;c<6;c++)this.invaders.push({x:130+c*95,y:55+r*45,hp:1});
    if(mode==='maze'){const points=[[3,1],[7,1],[11,1],[1,3],[5,3],[9,3],[13,3],[3,5],[9,5],[1,7],[7,7],[11,7]];this.mazeLights=points.map(([x,y])=>({x,y,collected:false}));}
  }
  newBoard(){for(let n=0;n<100;n++){this.board=Array.from({length:7},()=>Array.from({length:7},()=>Math.floor(this.rng()*5)));for(let r=0;r<7;r++)for(let c=0;c<7;c++){while((c>1&&this.board[r][c]===this.board[r][c-1]&&this.board[r][c]===this.board[r][c-2])||(r>1&&this.board[r][c]===this.board[r-1][c]&&this.board[r][c]===this.board[r-2][c]))this.board[r][c]=(this.board[r][c]+1)%5;}if(hasMove(this.board))break;}this.revision++;}
  build(x,y){
    if(this.mode!=='defense'||this.result)return false;
    const spec=TOWERS[this.selected];if(!spec)return false;
    if(this.energy<spec.cost){this.message='Not enough energy for that ward.';return false;}
    if(x<20||y<20||x>820||y>460||PATH.slice(1).some((p,i)=>segmentDistance({x,y},PATH[i],p)<32)||this.towers.some(t=>Math.hypot(t.x-x,t.y-y)<34)){this.message='Build beside the route, with space between wards.';return false;}
    this.energy-=spec.cost;this.towers.push({x,y,type:this.selected,...spec,cooldown:0});this.message='Ward placed. Start the wave when ready.';return true;
  }
  start(){if(!this.result){this.running=true;this.message='Mission active.';}}
  hurt(amount){if(this.invulnerability>0)return;this.hp=Math.max(0,this.hp-amount);this.invulnerability=.65;if(this.hp===0){this.result='defeat';this.running=false;}}
  win(){if(!this.result){this.result='victory';this.running=false;}}
  update(dt){
    if(!this.running||this.result)return;dt=clamp(dt,0,.05);this.time+=dt;this.invulnerability=Math.max(0,this.invulnerability-dt);
    if(this.mode==='defense')this.defense(dt);
    if(this.mode==='shooter'||this.mode==='boss')this.shooter(dt);
    if(this.mode==='maze')this.maze(dt);
  }
  defense(dt){
    this.spawnClock+=dt;if(this.spawned<this.total&&this.spawnClock>=1.05){this.spawnClock=0;this.spawned++;const tank=this.advanced&&this.spawned%4===0;this.enemies.push({x:0,y:130,path:0,hp:tank?150:(this.advanced?85:50),maxHp:tank?150:(this.advanced?85:50),speed:tank?40:58,slow:0});}
    for(const e of [...this.enemies]){e.slow=Math.max(0,e.slow-dt);const dest=PATH[e.path+1];if(!dest){this.hp=Math.max(0,this.hp-12);this.enemies.splice(this.enemies.indexOf(e),1);if(this.hp===0){this.result='defeat';this.running=false;return;}continue;}const d=distance(e,dest),step=e.speed*(e.slow>0?.45:1)*dt;if(d<=step){e.x=dest.x;e.y=dest.y;e.path++;}else{e.x+=(dest.x-e.x)/d*step;e.y+=(dest.y-e.y)/d*step;}}
    for(const t of this.towers){t.cooldown-=dt;if(t.cooldown>0)continue;const target=this.enemies.find(e=>distance(t,e)<=t.range);if(target){t.cooldown=t.rate;target.hp-=t.damage*this.damage;if(t.type==='slow')target.slow=2;this.shots.push({x:t.x,y:t.y,tx:target.x,ty:target.y,life:.1});}}
    this.shots=this.shots.filter(s=>(s.life-=dt)>0);for(const e of [...this.enemies])if(e.hp<=0){this.enemies.splice(this.enemies.indexOf(e),1);this.energy+=15;this.score+=50;}
    if(this.spawned===this.total&&this.enemies.length===0)this.win();
  }
  selectCell(r,c){
    if(this.mode!=='match'||!this.running||this.result)return;
    if(!this.matchSelection){this.matchSelection={r,c};this.revision++;return;}
    const a=this.matchSelection;this.matchSelection=null;this.revision++;
    if(Math.abs(a.r-r)+Math.abs(a.c-c)!==1){this.message='Choose two adjacent symbols.';return;}
    [this.board[r][c],this.board[a.r][a.c]]=[this.board[a.r][a.c],this.board[r][c]];
    let set=matches(this.board);if(set.size===0){[this.board[r][c],this.board[a.r][a.c]]=[this.board[a.r][a.c],this.board[r][c]];this.message='No line of three: swap returned.';return;}
    this.moves++;let count=0;
    for(let cascade=0;set.size&&cascade<30;cascade++){
      count+=set.size;for(let col=0;col<7;col++){const kept=[];for(let row=6;row>=0;row--)if(!set.has(row*7+col))kept.push(this.board[row][col]);for(let row=6;row>=0;row--)this.board[row][col]=kept[6-row]??Math.floor(this.rng()*5);}set=matches(this.board);
    }
    this.cleared+=count;this.score+=count*10;this.message=`Cleared ${count} symbols. ${this.cleared} / 24.`;if(this.cleared>=24)this.win();else if(!hasMove(this.board)){this.newBoard();this.message+=' No moves remained, so the board was refreshed.';}
  }
  choose(index){if(this.mode!=='choice'||!this.running||this.result)return false;const d=DILEMMAS[this.choiceIndex];if(index!==d.answer){this.message=d.feedback+' Try again.';return false;}this.message=d.feedback;this.choiceIndex++;this.score+=100;this.revision++;if(this.choiceIndex===DILEMMAS.length)this.win();return true;}
  move(dir){
    if(!this.running||this.result)return;
    if(this.mode==='maze'){const d={left:[-1,0],right:[1,0],up:[0,-1],down:[0,1]}[dir];if(!d)return;const x=this.mazePlayer.x+d[0],y=this.mazePlayer.y+d[1];if(MAZE[y]?.[x]!=='.'){this.message='A wall blocks that way.';return;}this.mazePlayer={x,y};this.collect();}
    else if(this.mode==='shooter'||this.mode==='boss')this.player.x=clamp(this.player.x+(dir==='left'?-32:dir==='right'?32:0),25,815);
  }
  collect(){for(const l of this.mazeLights)if(!l.collected&&l.x===this.mazePlayer.x&&l.y===this.mazePlayer.y){l.collected=true;this.score+=50;}if(this.mazeLights.every(l=>l.collected))this.win();}
  maze(dt){this.mazeClock+=dt;if(this.mazeClock<.75)return;this.mazeClock=0;for(const s of this.sentinels){const choices=[[1,0],[-1,0],[0,1],[0,-1]].map(([dx,dy])=>({x:s.x+dx,y:s.y+dy})).filter(p=>MAZE[p.y]?.[p.x]==='.');if(choices.length){const next=choices[Math.floor(this.rng()*choices.length)];s.x=next.x;s.y=next.y;}if(s.x===this.mazePlayer.x&&s.y===this.mazePlayer.y){this.hurt(15);this.mazePlayer={x:1,y:1};}}}
  fire(){if(!this.running||this.result||this.fireClock>0||!['shooter','boss'].includes(this.mode))return;this.fireClock=.16;this.bullets.push({x:this.player.x,y:this.player.y-12});}
  shooter(dt){
    this.fireClock=Math.max(0,this.fireClock-dt);if(this.held.has('left'))this.player.x=clamp(this.player.x-320*dt,25,815);if(this.held.has('right'))this.player.x=clamp(this.player.x+320*dt,25,815);if(this.held.has('fire'))this.fire();
    if(this.mode==='shooter'){const live=this.invaders.filter(e=>e.hp>0);if(live.some(e=>e.x<32||e.x>808)){this.direction*=-1;for(const e of live){e.x=clamp(e.x,33,807);e.y+=16;}}for(const e of live)e.x+=this.direction*45*dt;if(live.some(e=>e.y>390)){this.result='defeat';this.running=false;return;}}
    else this.boss.x=420+Math.sin(this.time*.8)*270;
    this.attackClock+=dt;if(this.attackClock>(this.mode==='boss'?.75:1.4)){this.attackClock=0;const targets=this.mode==='boss'?[this.boss]:this.invaders.filter(e=>e.hp>0);if(targets.length){const e=targets[Math.floor(this.rng()*targets.length)];this.hostile.push({x:e.x,y:e.y+20,dx:clamp((this.player.x-e.x)*.25,-100,100)});}}
    for(const b of [...this.bullets]){b.y-=440*dt;let hit=false;if(this.mode==='boss'&&Math.abs(b.x-this.boss.x)<55&&Math.abs(b.y-this.boss.y)<35){this.boss.hp=Math.max(0,this.boss.hp-30*this.damage);this.score+=30;hit=true;}else if(this.mode==='shooter'){const e=this.invaders.find(e=>e.hp>0&&Math.abs(b.x-e.x)<22&&Math.abs(b.y-e.y)<16);if(e){e.hp=0;hit=true;this.score+=100;}}if(hit||b.y<0)this.bullets.splice(this.bullets.indexOf(b),1);}
    for(const b of [...this.hostile]){b.y+=180*dt;b.x+=b.dx*dt;if(Math.abs(b.x-this.player.x)<20&&Math.abs(b.y-this.player.y)<20){this.hurt(12);this.hostile.splice(this.hostile.indexOf(b),1);}else if(b.y>480)this.hostile.splice(this.hostile.indexOf(b),1);}
    if(!this.result&&((this.mode==='boss'&&this.boss.hp===0)||(this.mode==='shooter'&&this.invaders.every(e=>e.hp===0))))this.win();
  }
}
