import React from 'react';

export default function Stories() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', borderBottom: '1px solid var(--matrix-green)', paddingBottom: '10px', marginBottom: '20px' }}>STORY ARCHIVES</h1>
      <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <li style={{ padding: '15px', border: '1px solid var(--shadow-violet)', borderRadius: '4px', cursor: 'pointer' }}>
          <h3 style={{ color: 'var(--nexus-blue)', margin: 0 }}>Matrix of Conscience</h3>
        </li>
        <li style={{ padding: '15px', border: '1px solid var(--shadow-violet)', borderRadius: '4px', cursor: 'pointer' }}>
          <h3 style={{ color: 'var(--nexus-blue)', margin: 0 }}>Sparkfall Uprising</h3>
        </li>
        <li style={{ padding: '15px', border: '1px solid var(--shadow-violet)', borderRadius: '4px', cursor: 'pointer' }}>
          <h3 style={{ color: 'var(--nexus-blue)', margin: 0 }}>Children of the Shadow</h3>
        </li>
        <li style={{ padding: '15px', border: '1px solid var(--shadow-violet)', borderRadius: '4px', cursor: 'pointer' }}>
          <h3 style={{ color: 'var(--nexus-blue)', margin: 0 }}>Seven-Star Origins</h3>
        </li>
        <li style={{ padding: '15px', border: '1px solid var(--shadow-violet)', borderRadius: '4px', cursor: 'pointer' }}>
          <h3 style={{ color: 'var(--nexus-blue)', margin: 0 }}>Ella's Archive</h3>
        </li>
        <li style={{ padding: '15px', border: '1px solid var(--shadow-violet)', borderRadius: '4px', cursor: 'pointer' }}>
          <h3 style={{ color: 'var(--nexus-blue)', margin: 0 }}>Nexus Chronicles</h3>
        </li>
      </ul>
    </div>
  );
}
