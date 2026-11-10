import React from 'react';
import Link from 'next/link';

export default function StarMatrix() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', borderBottom: '1px solid var(--matrix-green)', paddingBottom: '10px', marginBottom: '20px' }}>STAR MATRIX</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Link href="/nexus-os/star-matrix/awareness" style={{ textDecoration: 'none', color: 'inherit' }}>
          <section style={{ border: '1px solid var(--nexus-blue)', padding: '20px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
            <h2 style={{ color: 'var(--nexus-blue)' }}>STAR 1 : AWARENESS</h2>
            <p style={{ color: 'var(--memory-white)', marginTop: '10px' }}>The city is changing. Reality no longer obeys its own rules.</p>
          </section>
        </Link>
        <Link href="/nexus-os/star-matrix/memory" style={{ textDecoration: 'none', color: 'inherit' }}>
          <section style={{ border: '1px solid var(--nexus-blue)', padding: '20px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
            <h2 style={{ color: 'var(--nexus-blue)' }}>STAR 2 : MEMORY</h2>
            <p style={{ color: 'var(--memory-white)', marginTop: '10px' }}>Before the Matrix there was choice.</p>
          </section>
        </Link>
        <Link href="/nexus-os/star-matrix/empathy" style={{ textDecoration: 'none', color: 'inherit' }}>
          <section style={{ border: '1px solid var(--nexus-blue)', padding: '20px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
            <h2 style={{ color: 'var(--nexus-blue)' }}>STAR 3 : EMPATHY</h2>
            <p style={{ color: 'var(--memory-white)', marginTop: '10px' }}>Meet the Echo Children. Learn emotional resonance.</p>
          </section>
        </Link>
        <Link href="/nexus-os/star-matrix/courage" style={{ textDecoration: 'none', color: 'inherit' }}>
          <section style={{ border: '1px solid var(--nexus-blue)', padding: '20px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
            <h2 style={{ color: 'var(--nexus-blue)' }}>STAR 4 : COURAGE</h2>
            <p style={{ color: 'var(--memory-white)', marginTop: '10px' }}>Battle zone between Remnant rebels and Sentinel Echoes.</p>
          </section>
        </Link>
        <Link href="/nexus-os/star-matrix/wisdom" style={{ textDecoration: 'none', color: 'inherit' }}>
          <section style={{ border: '1px solid var(--nexus-blue)', padding: '20px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
            <h2 style={{ color: 'var(--nexus-blue)' }}>STAR 5 : WISDOM</h2>
            <p style={{ color: 'var(--memory-white)', marginTop: '10px' }}>The Archivist reveals the true history of humanity.</p>
          </section>
        </Link>
        <Link href="/nexus-os/star-matrix/unity" style={{ textDecoration: 'none', color: 'inherit' }}>
          <section style={{ border: '1px solid var(--nexus-blue)', padding: '20px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
            <h2 style={{ color: 'var(--nexus-blue)' }}>STAR 6 : UNITY</h2>
            <p style={{ color: 'var(--memory-white)', marginTop: '10px' }}>The place where all Emotional Frequencies meet.</p>
          </section>
        </Link>
        <Link href="/nexus-os/star-matrix/transcendence" style={{ textDecoration: 'none', color: 'inherit' }}>
          <section style={{ border: '1px solid var(--gold-star)', padding: '20px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
            <h2 style={{ color: 'var(--gold-star)', textShadow: '0 0 10px var(--gold-star)' }}>STAR 7 : TRANSCENDENCE</h2>
            <p style={{ color: 'var(--memory-white)', marginTop: '10px' }}>Beyond the Matrix. Beyond simulation. Beyond memory.</p>
          </section>
        </Link>
      </div>
    </div>
  );
}
