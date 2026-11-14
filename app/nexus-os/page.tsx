import React from 'react';

export default function NexusOSHome() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', borderBottom: '1px solid var(--matrix-green)', paddingBottom: '10px' }}>INITIALIZING NEXUS OS...</h1>
      <p style={{ marginTop: '20px' }}>LOADING STAR MATRIX... [OK]</p>
      <p>LOADING MEMORY ARCHIVE... [OK]</p>
      <p>LOADING CONSCIENCE PROTOCOLS... [OK]</p>
      <p style={{ color: 'var(--nexus-blue)', marginTop: '20px' }}>SPARK DETECTED</p>
      <p style={{ color: 'var(--warning-red)' }}>SHADOW DETECTED</p>
      <p style={{ marginTop: '20px' }}>FREE WILL ENABLED.</p>
      <h2 style={{ marginTop: '40px', color: 'var(--matrix-green)' }}>WELCOME BACK.</h2>
    </div>
  );
}
