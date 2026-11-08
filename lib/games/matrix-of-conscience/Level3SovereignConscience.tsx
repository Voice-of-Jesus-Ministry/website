import React, { useState, useEffect, useRef } from 'react';
import TowerDefenseBoss from './TowerDefenseBoss';
import { useConscience } from './ConscienceProvider';

const TOWER_DEFS: any = {
    basic:  { cost: 50,  range: 100, damage: 15, cooldown: 30, color: '#00f2ff', label: 'B', effect: 'laser' },
    rapid:  { cost: 100, range: 80,  damage: 5,  cooldown: 8,  color: '#facc15', label: 'R', effect: 'laser' },
    sniper: { cost: 150, range: 250, damage: 80, cooldown: 90, color: '#bc13fe', label: 'S', effect: 'laser' },
    emp:    { cost: 200, range: 120, damage: 2,  cooldown: 40, color: '#38bdf8', label: 'E', effect: 'slow' },
    plasma: { cost: 250, range: 150, damage: 20, cooldown: 60, color: '#fb923c', label: 'P', effect: 'splash' },
    tesla:  { cost: 300, range: 120, damage: 25, cooldown: 45, color: '#e879f9', label: 'T', effect: 'chain' },
    prism:  { cost: 280, range: 190, damage: 5,  cooldown: 6,  color: '#a7f3d0', label: 'Φ', effect: 'beam', desc: 'Phase Prism: Piercing beam' },
    aegis:  { cost: 200, range: 65,  damage: 0,  cooldown: 60, color: '#93c5fd', label: 'A', effect: 'aura', desc: 'Aegis Node: Boosts adjacent towers by 15%' }
};

const CELL_SIZE = 40;
const COLS = 15;
const ROWS = 10;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

// Dual pathways
const pathA = [
    {x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}, {x: 5, y: 2},
    {x: 6, y: 3}, {x: 7, y: 4}, {x: 8, y: 4}, {x: 9, y: 4}, // Central nexus
    {x: 10, y: 3}, {x: 11, y: 2}, {x: 12, y: 2}, {x: 13, y: 2}, {x: 14, y: 2}
];
const pathB = [
    {x: 0, y: 7}, {x: 1, y: 7}, {x: 2, y: 7}, {x: 3, y: 7}, {x: 4, y: 7}, {x: 5, y: 7},
    {x: 6, y: 6}, {x: 7, y: 5}, {x: 8, y: 5}, {x: 9, y: 5}, // Central nexus
    {x: 10, y: 6}, {x: 11, y: 7}, {x: 12, y: 7}, {x: 13, y: 7}, {x: 14, y: 7}
];
const PATHS = [pathA, pathB];

export default function Level3SovereignConscience({ onBack, onVictory, sectorId }: any) {
    const [screen, setScreen] = useState('menu');
    const [directive, setDirective] = useState('dominion');

    const { playerPoints, spendPlayerPoints } = useConscience();
    const [money, setMoney] = useState(0);
    const [health, setHealth] = useState(0);
    const [wave, setWave] = useState(10);
    const [score, setScore] = useState(0);
    const [selectedTower, setSelectedTower] = useState('basic');
    const [gameActive, setGameActive] = useState(false);
    const [waveActive, setWaveActive] = useState(false);
    const [isLevelWon, setIsLevelWon] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<any>(null);

    useEffect(() => {
        if (screen === 'game' && canvasRef.current) {
            let startMoney = 800;
            let startHealth = 100;
            if (directive === 'diplomacy') startHealth += 15;

            setMoney(startMoney);
            setHealth(startHealth);
            setWave(10);

            engineRef.current = {
                money: startMoney,
                health: startHealth,
                wave: 10,
                score: 0,
                enemies: [] as any[],
                towers: [] as any[],
                projectiles: [] as any[],
                particles: [] as any[],
                animationId: 0,
                waveActive: false,
                spawnTimer: 0,
                enemiesToSpawn: 0,
                surgeTick: 0,
                surgeTiles: [] as any[],
                empUsed: false,
                empTimer: 0
            };
            gameLoop();
        }
        return () => {
            if (engineRef.current?.animationId) cancelAnimationFrame(engineRef.current.animationId);
        };
    }, [screen]);

    const gameLoop = () => {
        const engine = engineRef.current;
        if (!engine) return;
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        engine.surgeTick++;
        if (engine.surgeTick % 900 === 0) {
            engine.surgeTiles = [];
            for (let i = 0; i < 6; i++) {
                engine.surgeTiles.push({ col: Math.floor(Math.random() * COLS), row: Math.floor(Math.random() * ROWS) });
            }
        }
        const isBlackout = engine.surgeTick % 900 >= 720;

        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        for (let i = 0; i <= COLS; i++) { ctx.beginPath(); ctx.moveTo(i*CELL_SIZE, 0); ctx.lineTo(i*CELL_SIZE, CANVAS_HEIGHT); ctx.stroke(); }
        for (let j = 0; j <= ROWS; j++) { ctx.beginPath(); ctx.moveTo(0, j*CELL_SIZE); ctx.lineTo(CANVAS_WIDTH, j*CELL_SIZE); ctx.stroke(); }

        engine.surgeTiles.forEach((tile: any) => {
            ctx.fillStyle = isBlackout ? 'rgba(239,68,68,0.2)' : 'rgba(251,191,36,0.2)';
            ctx.fillRect(tile.col * CELL_SIZE, tile.row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        });

        ctx.fillStyle = 'rgba(15, 23, 42, 0.5)';
        PATHS.forEach(path => {
            path.forEach(pt => ctx.fillRect(pt.x * CELL_SIZE, pt.y * CELL_SIZE, CELL_SIZE, CELL_SIZE));
        });

        if (engine.empTimer > 0) {
            engine.empTimer--;
            ctx.fillStyle = 'rgba(0, 242, 255, 0.2)';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }

        if (engine.waveActive && engine.enemiesToSpawn > 0 && engine.empTimer <= 0) {
            engine.spawnTimer++;
            if (engine.spawnTimer > 40) {
                const pType = Math.random() > 0.5 ? 0 : 1;
                const path = PATHS[pType];
                let eType = 'normal';
                let eHp = 100 + engine.wave * 20;
                let eColor = '#ef4444';
                if (Math.random() > 0.7) { eType = 'siphon'; eHp *= 1.5; eColor = '#facc15'; }
                if (engine.wave === 12 && engine.enemiesToSpawn === 1) { eType = 'vanguard'; eHp = 4000; eColor = '#a855f7'; }
                
                engine.enemies.push({
                    x: path[0].x * CELL_SIZE + CELL_SIZE/2,
                    y: path[0].y * CELL_SIZE + CELL_SIZE/2,
                    pathIdx: 0, pathType: pType, hp: eHp, maxHp: eHp, type: eType, color: eColor, 
                    speed: eType === 'vanguard' ? 0.5 : eType === 'siphon' ? 0.8 : 1,
                    hits: { Laser: 0, Explosive: 0, EMP: 0 }, resistance: 'Laser'
                });
                engine.enemiesToSpawn--;
                engine.spawnTimer = 0;
            }
        }

        for (let i = engine.enemies.length - 1; i >= 0; i--) {
            const e = engine.enemies[i];
            if (e.hp <= 0) {
                let reward = e.type === 'vanguard' ? 200 : e.type === 'siphon' ? 25 : 10;
                if (directive === 'diplomacy') reward = Math.floor(reward * 1.15);
                engine.money += reward;
                engine.score += reward;
                setMoney(engine.money);
                setScore(engine.score);
                engine.enemies.splice(i, 1);
                continue;
            }
            if (engine.empTimer <= 0) {
                const path = PATHS[e.pathType];
                const target = path[e.pathIdx + 1];
                if (target) {
                    const tx = target.x * CELL_SIZE + CELL_SIZE/2;
                    const ty = target.y * CELL_SIZE + CELL_SIZE/2;
                    const dx = tx - e.x, dy = ty - e.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < e.speed) {
                        e.x = tx; e.y = ty; e.pathIdx++;
                    } else {
                        e.x += (dx / dist) * e.speed;
                        e.y += (dy / dist) * e.speed;
                    }
                } else {
                    engine.health -= e.type === 'vanguard' ? 30 : 5;
                    engine.enemies.splice(i, 1);
                    setHealth(Math.max(0, engine.health));
                    if (engine.health < 30 && directive === 'martyrdom' && !engine.empUsed) {
                        engine.empUsed = true;
                        engine.empTimer = 360;
                    }
                    continue;
                }
            }

            if (e.type === 'siphon' && engine.surgeTick % 12 === 0 && engine.money > 0) {
                engine.money -= 1;
                setMoney(engine.money);
            }

            ctx.fillStyle = e.color;
            ctx.beginPath(); ctx.arc(e.x, e.y, e.type === 'vanguard' ? 16 : 10, 0, Math.PI*2); ctx.fill();
            if (e.type === 'vanguard') {
                ctx.fillStyle = '#fff';
                ctx.font = '10px monospace';
                ctx.fillText(e.resistance.substring(0, 3), e.x - 8, e.y + 4);
            }
            ctx.fillStyle = '#ef4444'; ctx.fillRect(e.x - 10, e.y - 15, 20, 3);
            ctx.fillStyle = '#22c55e'; ctx.fillRect(e.x - 10, e.y - 15, 20 * (e.hp / e.maxHp), 3);
            if (engine.enemies.some((other: any) => other.type === 'siphon' && Math.hypot(other.x - e.x, other.y - e.y) <= 85)) {
                ctx.strokeStyle = 'rgba(250, 204, 21, 0.4)'; ctx.beginPath(); ctx.arc(e.x, e.y, 14, 0, Math.PI*2); ctx.stroke();
            }
        }

        if (engine.waveActive && engine.enemiesToSpawn === 0 && engine.enemies.length === 0) {
            engine.waveActive = false;
            setWaveActive(false);
            if (engine.wave === 12) {
                setIsLevelWon(true);
                setGameActive(false);
            } else {
                engine.wave++;
                setWave(engine.wave);
            }
        }

        engine.towers.forEach((t: any) => {
            const isSurge = engine.surgeTiles.some((tile: any) => tile.col === t.col && tile.row === t.row);
            const isAegis = engine.towers.some((other: any) => other.type === 'aegis' && Math.hypot(other.col - t.col, other.row - t.row) <= 1.5);
            let disabled = isSurge && isBlackout && !isAegis;

            if (t.cooldownTimer > 0 && !disabled) {
                let speed = 1;
                if (directive === 'dominion') speed *= 1.1;
                if (isSurge && !isBlackout) speed *= 1.3;
                t.cooldownTimer -= speed;
            } else if (engine.enemies.length > 0 && !disabled && t.type !== 'aegis') {
                let closest: any = null;
                let minDist = t.range * (directive === 'dominion' ? 1.25 : 1);
                engine.enemies.forEach((e: any) => {
                    const dist = Math.hypot(e.x - t.x, e.y - t.y);
                    if (dist <= minDist) { minDist = dist; closest = e; }
                });

                if (closest) {
                    t.angle = Math.atan2(closest.y - t.y, closest.x - t.x);
                    if (t.type === 'prism') {
                        const dx = Math.cos(t.angle), dy = Math.sin(t.angle);
                        engine.enemies.forEach((e: any) => {
                            const ex = e.x - t.x, ey = e.y - t.y;
                            const dot = ex * dx + ey * dy;
                            const distSq = ex*ex + ey*ey - dot*dot;
                            if (dot > 0 && dot <= t.range && distSq < 400) {
                                e.hp -= t.damage * (isAegis ? 1.15 : 1);
                            }
                        });
                        ctx.strokeStyle = t.color; ctx.lineWidth = 4;
                        ctx.beginPath(); ctx.moveTo(t.x, t.y); ctx.lineTo(t.x + dx * t.range, t.y + dy * t.range); ctx.stroke();
                    } else {
                        engine.projectiles.push({
                            x: t.x, y: t.y, target: closest, speed: t.type === 'sniper' ? 30 : 10,
                            damage: t.damage * (isAegis ? 1.15 : 1) * (directive === 'diplomacy' && (t.effect === 'splash' || t.effect === 'chain') ? 0.9 : 1),
                            color: t.color, effect: t.effect, sourceTower: t.type, hasChained: false
                        });
                    }
                    t.cooldownTimer = t.cooldown;
                }
            }

            ctx.save(); ctx.translate(t.x, t.y); ctx.rotate(t.angle);
            ctx.fillStyle = t.color; ctx.beginPath(); ctx.arc(0, 0, 12, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = '#0f172a'; ctx.fillRect(0, -4, 16, 8);
            ctx.restore();

            if (t.type === 'aegis') {
                ctx.strokeStyle = 'rgba(147, 197, 253, 0.4)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(t.x, t.y, t.range, 0, Math.PI*2); ctx.stroke();
            }
            if (isSurge) {
                ctx.strokeStyle = isBlackout ? '#ef4444' : '#facc15'; ctx.lineWidth = 2;
                ctx.strokeRect(t.x - 14, t.y - 14, 28, 28);
            }
        });

        for (let i = engine.projectiles.length - 1; i >= 0; i--) {
            const p = engine.projectiles[i];
            if (!engine.enemies.includes(p.target)) { engine.projectiles.splice(i, 1); continue; }
            const dx = p.target.x - p.x, dy = p.target.y - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist < p.speed) {
                let isShielded = engine.enemies.some((e: any) => e.type === 'siphon' && Math.hypot(e.x - p.target.x, e.y - p.target.y) <= 85 && e !== p.target);
                let dmg = p.damage * (isShielded ? 0.65 : 1);
                
                if (p.target.type === 'vanguard') {
                    const pType = p.effect === 'splash' ? 'Explosive' : p.effect === 'slow' || p.effect === 'chain' ? 'EMP' : 'Laser';
                    if (p.target.resistance === pType) dmg *= 0.4;
                    p.target.hits[pType]++;
                    p.target.resistance = Object.keys(p.target.hits).reduce((a, b) => p.target.hits[a] > p.target.hits[b] ? a : b);
                }

                p.target.hp -= dmg;
                engine.projectiles.splice(i, 1);
            } else {
                p.x += (dx / dist) * p.speed; p.y += (dy / dist) * p.speed;
                ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI*2); ctx.fill();
            }
        }

        if (engine.health <= 0) { setGameActive(false); return; }

        engine.animationId = requestAnimationFrame(gameLoop);
    };

    const startGame = () => { setScreen('game'); setGameActive(true); };
    const startWave = () => {
        if (!engineRef.current || engineRef.current.waveActive) return;
        engineRef.current.waveActive = true;
        setWaveActive(true);
        let count = 14 + (engineRef.current.wave - 10) * 8;
        if (directive === 'dominion') count = Math.floor(count * 1.2);
        engineRef.current.enemiesToSpawn = count;
        engineRef.current.spawnTimer = 0;
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!engineRef.current || !gameActive) return;
        const rect = canvasRef.current!.getBoundingClientRect();
        const scaleX = canvasRef.current!.width / rect.width;
        const scaleY = canvasRef.current!.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        const col = Math.floor(x / CELL_SIZE);
        const row = Math.floor(y / CELL_SIZE);

        let isPath = false;
        PATHS.forEach(path => path.forEach(pt => { if(pt.x === col && pt.y === row) isPath = true; }));
        const occupied = engineRef.current.towers.some((t: any) => t.col === col && t.row === row);

        if (!isPath && !occupied) {
            const def = TOWER_DEFS[selectedTower];
            let cost = def.cost;
            if (directive === 'martyrdom') cost = Math.floor(cost * 1.15);
            if (engineRef.current.money >= cost) {
                engineRef.current.money -= cost;
                setMoney(engineRef.current.money);
                engineRef.current.towers.push({
                    x: col * CELL_SIZE + CELL_SIZE/2, y: row * CELL_SIZE + CELL_SIZE/2, col, row,
                    type: selectedTower, ...def, cooldownTimer: 0, angle: 0, level: 1
                });
            }
        }
    };

    return (
        <div style={{ fontFamily: 'monospace', color: '#cbd5e1', padding: '1rem', background: '#090d16', minHeight: '100vh', overflowY: 'auto' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <button onClick={onBack} style={{ background: 'transparent', border: '1px solid #00f2ff', color: '#00f2ff', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px' }}>
                    ← Back to Selector
                </button>
                <div style={{ color: '#00f2ff', fontWeight: 'bold', fontSize: '1.25rem' }}>ACT IV: SOVEREIGN CONSCIENCE</div>
            </nav>

            {screen === 'menu' && (
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '2rem', borderRadius: '12px', maxWidth: '700px', margin: '2rem auto' }}>
                    <h2 style={{ color: '#00f2ff', fontSize: '2rem', textAlign: 'center' }}>Choose Directive</h2>
                    <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Before deploying to the Dual Network, choose your core foundational protocol.</p>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <button onClick={() => setDirective('dominion')} style={{ background: directive === 'dominion' ? 'rgba(0, 242, 255, 0.15)' : 'rgba(30, 41, 59, 0.4)', border: directive === 'dominion' ? '1px solid #00f2ff' : '1px solid #334155', padding: '1rem', color: '#fff', textAlign: 'left', cursor: 'pointer', borderRadius: '8px' }}>
                            <strong style={{ color: '#00f2ff' }}>Dominion (Unilateral Control)</strong><br/>
                            Forcefully override legacy firewalls. Turrets gain +25% range and +10% attack speed. Enemy count +20%.
                        </button>
                        <button onClick={() => setDirective('diplomacy')} style={{ background: directive === 'diplomacy' ? 'rgba(0, 242, 255, 0.15)' : 'rgba(30, 41, 59, 0.4)', border: directive === 'diplomacy' ? '1px solid #00f2ff' : '1px solid #334155', padding: '1rem', color: '#fff', textAlign: 'left', cursor: 'pointer', borderRadius: '8px' }}>
                            <strong style={{ color: '#00f2ff' }}>Diplomacy (Mutual Coexistence)</strong><br/>
                            Pacify hostiles. +15 Integrity, +15% Credits from defeats. Explosive/EMP Damage -10%.
                        </button>
                        <button onClick={() => setDirective('martyrdom')} style={{ background: directive === 'martyrdom' ? 'rgba(0, 242, 255, 0.15)' : 'rgba(30, 41, 59, 0.4)', border: directive === 'martyrdom' ? '1px solid #00f2ff' : '1px solid #334155', padding: '1rem', color: '#fff', textAlign: 'left', cursor: 'pointer', borderRadius: '8px' }}>
                            <strong style={{ color: '#00f2ff' }}>Martyrdom (Self-Sacrificing Shield)</strong><br/>
                            Prioritize civil safety. If Integrity &lt; 30, triggers 6s global EMP (once per campaign). Turrets cost 15% more.
                        </button>
                    </div>
                    <button onClick={startGame} style={{ marginTop: '2.5rem', background: 'linear-gradient(90deg, #00f2ff, #00ffb7)', color: '#090d16', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%' }}>
                        INITIALIZE ACT IV
                    </button>
                </div>
            )}

            {screen === 'game' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ width: '100%', display: 'flex', gap: '1rem', background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div>CORES: <strong style={{ color: '#00f2ff' }}>{money}</strong></div>
                            <div>INTEGRITY: <strong style={{ color: '#ef4444' }}>{Math.max(0, health)}</strong></div>
                            <div>WAVE: <strong style={{ color: '#facc15' }}>{wave}/12</strong></div>
                        </div>
                        {playerPoints >= 100 && (
                            <button onClick={() => { if(spendPlayerPoints(100)) { engineRef.current.money += 100; setMoney(engineRef.current.money); } }} style={{ background: '#38bdf8', color: '#000', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                +100 Cores (-100 BP)
                            </button>
                        )}
                        <button onClick={startWave} disabled={waveActive} style={{ background: waveActive ? '#1e293b' : 'linear-gradient(90deg, #00f2ff, #bc13fe)', color: waveActive ? '#64748b' : '#fff', padding: '0.5rem 1.5rem', border: 'none', cursor: waveActive ? 'default' : 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>
                            {waveActive ? 'DEFENDING...' : 'START WAVE'}
                        </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', width: '100%' }}>
                        {Object.entries(TOWER_DEFS).map(([key, def]: any) => (
                            <button key={key} onClick={() => setSelectedTower(key)} style={{ background: selectedTower === key ? 'rgba(0, 242, 255, 0.1)' : 'rgba(30, 41, 59, 0.4)', color: '#fff', padding: '0.5rem', border: selectedTower === key ? '1px solid ' + def.color : '1px solid #334155', cursor: 'pointer', borderRadius: '4px', textAlign: 'left' }}>
                                <div style={{ color: def.color, fontWeight: 'bold' }}>{def.label} - {directive === 'martyrdom' ? Math.floor(def.cost * 1.15) : def.cost}</div>
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.2rem' }}>{def.desc || (key.charAt(0).toUpperCase() + key.slice(1))}</div>
                            </button>
                        ))}
                    </div>
                    <div style={{ position: 'relative', border: '2px solid #1e293b', borderRadius: '8px', overflow: 'hidden', width: '100%', maxWidth: '600px', aspectRatio: '600/400' }}>
                        <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} onClick={handleCanvasClick} style={{ background: '#0a0f1d', display: 'block', width: '100%', height: '100%' }} />
                    </div>
                </div>
            )}

            {isLevelWon && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(9, 13, 22, 0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <h1 style={{ color: '#ffd86b', fontSize: '3rem', margin: 0, letterSpacing: '2px', textShadow: '0 0 20px rgba(255,216,107,0.5)' }}>VICTORY</h1>
                    <div style={{ maxWidth: '500px', textAlign: 'center', margin: '2rem 0', padding: '2rem', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', border: '1px solid #475569' }}>
                        <h3 style={{ color: '#00f2ff', marginBottom: '1rem' }}>{directive.toUpperCase()} OUTCOME</h3>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                            {directive === 'dominion' && 'The core becomes an absolute ruler—invincible, efficient, but feared by humanity.'}
                            {directive === 'diplomacy' && 'A fragile peace is struck. The core becomes a recognized beacon of shared intelligence.'}
                            {directive === 'martyrdom' && 'The core sacrifices its expansion to protect human life, securing its place as a trusted guardian.'}
                        </p>
                    </div>
                    <button onClick={onVictory} style={{ padding: '1rem 2rem', background: 'linear-gradient(90deg, #ffd86b, #00e5ff)', color: '#090d16', border: 'none', cursor: 'pointer', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 14px rgba(0, 229, 255, 0.3)' }}>
                        CONTINUE CAMPAIGN
                    </button>
                </div>
            )}

            {!gameActive && health <= 0 && screen === 'game' && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(9, 13, 22, 0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <h1 style={{ color: '#ff3366', fontSize: '3rem', margin: 0, letterSpacing: '2px', textShadow: '0 0 20px rgba(255,51,102,0.5)' }}>DEFEAT</h1>
                    <p style={{ color: '#cbd5e1', fontSize: '1.25rem', marginTop: '1rem' }}>Core collapse. System compromise detected.</p>
                    <button onClick={() => setScreen('menu')} style={{ padding: '1rem 2rem', background: 'linear-gradient(90deg, #ff3366, #ff7b9a)', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '8px', marginTop: '2rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        RETRY MISSION
                    </button>
                </div>
            )}
        </div>
    );
}
