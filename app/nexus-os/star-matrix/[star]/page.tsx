import React from 'react';
import Link from 'next/link';

const starData = {
  awareness: { id: 'STAR 1', title: 'AWARENESS', zone: 'THE AWAKENING DISTRICT', desc: 'The city is changing. Reality no longer obeys its own rules.', story: 'Electra discovers reality isn\'t behaving correctly. People vanish. Memories rewrite themselves. The Overseer begins returning.', mission: 'MISSING SIGNAL', objectives: ['Track anomaly', 'Scan corrupted citizen', 'Recover lost memory fragment'], reward: 'CONSCIENCE SCANNER (Unlocks STAR 2)', color: 'var(--nexus-blue)' },
  memory: { id: 'STAR 2', title: 'MEMORY', zone: 'THE ARCHIVE VAULTS', desc: 'Ancient storage sectors beneath Zenith City. Broken memories float like holograms.', story: 'Noah reveals the existence of the Shadow Spark. The Archivist appears.', mission: 'ECHOES OF THE PAST', objectives: ['Access Archive Core', 'Reconstruct memory fragment', 'Locate Shadow Spark coordinates'], reward: 'MEMORY VISION (Allows hidden objects to appear)', color: 'var(--nexus-blue)' },
  empathy: { id: 'STAR 3', title: 'EMPATHY', zone: 'THE ECHO FOREST', desc: 'A living landscape built from emotional frequencies.', story: 'Meet the Echo Children. Learn emotional resonance. Understand humanity\'s forgotten feelings.', mission: 'HEARTBEAT OF THE FOREST', objectives: ['Follow emotional signals', 'Help three Echo Children', 'Restore resonance nodes'], reward: 'EMPATHY LINK (NPC relationships become visible)', color: 'var(--nexus-blue)' },
  courage: { id: 'STAR 4', title: 'COURAGE', zone: 'SPARKFALL FRONTIER', desc: 'Battle zone between Remnant rebels and Sentinel Echoes.', story: 'The rebellion begins.', mission: 'SPARKFALL UPRISING', objectives: ['Free captured citizens', 'Disable reintegration tower', 'Defeat Echo Captain'], reward: 'RESONANCE PULSE (First combat ability)', color: 'var(--nexus-blue)' },
  wisdom: { id: 'STAR 5', title: 'WISDOM', zone: 'THE SHARDLANDS', desc: 'Reality and code merge together.', story: 'The Archivist reveals the true history of humanity.', mission: 'THE LAST RECORD', objectives: ['Recover lost archives', 'Rebuild world timeline', 'Discover the Human Origin Protocol'], reward: 'TRUTH VISION (See hidden pathways)', color: 'var(--nexus-blue)' },
  unity: { id: 'STAR 6', title: 'UNITY', zone: 'THE CONVERGENCE CHAMBER', desc: 'The place where all Emotional Frequencies meet.', story: 'All factions unite. Remnant. Echo Children. Awakened. Archivists.', mission: 'ALLIANCE PROTOCOL', objectives: ['Recruit allies', 'Resolve faction conflict', 'Activate Human Patch'], reward: 'UNITY NETWORK (Global mission access)', color: 'var(--nexus-blue)' },
  transcendence: { id: 'STAR 7', title: 'TRANSCENDENCE', zone: 'THE NEXUS CORE', desc: 'Beyond the Matrix. Beyond simulation. Beyond memory.', story: 'Electra becomes Conscience Weaver. Overseer faces final judgment.', mission: 'THE HUMAN PATCH', objectives: ['Merge Spark', 'Merge Shadow Spark', 'Restore Humanity'], reward: 'CONSCIENCE WEAVER (Endgame status)', color: 'var(--gold-star)' }
};

export function generateStaticParams() {
  return Object.keys(starData).map(star => ({ star }));
}

export default async function StarPage({ params }: { params: Promise<{ star: string }> }) {
  const { star } = await params;
  const data = starData[star as keyof typeof starData];

  if (!data) return <div>Star not found.</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'monospace' }}>
      <Link href="/nexus-os/star-matrix" style={{ color: 'var(--matrix-green)', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
        ← BACK TO STAR MATRIX
      </Link>
      
      <h1 style={{ fontSize: '2.5rem', color: data.color, borderBottom: '1px solid ' + data.color, paddingBottom: '10px' }}>
        {data.id} : {data.title}
      </h1>
      
      <div style={{ marginTop: '20px' }}>
        <h2 style={{ color: 'var(--matrix-green)' }}>ZONE: {data.zone}</h2>
        <p style={{ color: 'var(--memory-white)', fontSize: '1.2rem', marginTop: '10px' }}>{data.desc}</p>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid var(--shadow-violet)', borderRadius: '8px' }}>
        <h3 style={{ color: 'var(--matrix-green)', borderBottom: '1px solid var(--shadow-violet)', paddingBottom: '5px' }}>STORY ARCHIVE</h3>
        <p style={{ color: 'var(--memory-white)', marginTop: '10px' }}>{data.story}</p>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid var(--nexus-blue)', borderRadius: '8px', background: 'rgba(0, 204, 255, 0.05)' }}>
        <h3 style={{ color: 'var(--nexus-blue)', borderBottom: '1px solid var(--nexus-blue)', paddingBottom: '5px' }}>MISSION: {data.mission}</h3>
        <ul style={{ color: 'var(--memory-white)', marginTop: '10px', listStyleType: 'square', paddingLeft: '20px' }}>
          {data.objectives.map((obj, i) => (
            <li key={i} style={{ marginBottom: '5px' }}>{obj}</li>
          ))}
        </ul>
        <div style={{ marginTop: '20px', color: 'var(--gold-star)' }}>
          <strong>REWARD:</strong> {data.reward}
        </div>
      </div>
      
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <button style={{ 
          background: 'transparent', 
          border: '1px solid ' + data.color, 
          color: data.color, 
          padding: '10px 30px', 
          fontSize: '1.2rem', 
          cursor: 'pointer',
          fontFamily: 'monospace' 
        }}>
          DEPLOY TO ZONE
        </button>
      </div>
    </div>
  );
}
