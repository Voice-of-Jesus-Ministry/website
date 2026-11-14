import React, { ReactNode } from 'react';
import Link from 'next/link';
import styles from './nexus.module.css';

export default function NexusLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.nexusRoot}>
      <header className={styles.topBar}>
        <div style={{ fontWeight: 'bold' }}>NEXUS OS</div>
        <div>ZONE: ZENITH CITY</div>
        <div>TIME: 04:12:18</div>
        <div>USER: GUEST</div>
      </header>
      <div className={styles.mainArea}>
        <nav className={styles.leftNav}>
          <Link href='/nexus-os'><span className={styles.navLabel}>HOME</span></Link>
          <Link href='/nexus-os/star-matrix'><span className={styles.navLabel}>STAR MATRIX</span></Link>
          <Link href='/nexus-os/matrix-of-conscience'><span className={styles.navLabel}>MATRIX OF CONSCIENCE</span></Link>
          <Link href='/nexus-os/stories'><span className={styles.navLabel}>STORIES</span></Link>
          <Link href='/'><span className={styles.navLabel}>EXIT NEXUS</span></Link>
        </nav>
        <main className={styles.viewport}>
          {children}
        </main>
      </div>
      <footer className={styles.statusBar}>
        <div className={styles.meterContainer}>CONSCIENCE: <span style={{ color: 'var(--matrix-green)' }}>[████████░░] 78%</span></div>
        <div className={styles.meterContainer}>MEMORY: <span style={{ color: 'var(--memory-white)' }}>[██████░░░░] 52%</span></div>
        <div className={styles.meterContainer}>EMPATHY: <span style={{ color: 'var(--matrix-green)' }}>91%</span></div>
        <div className={styles.meterContainer}>RESONANCE: <span style={{ color: 'var(--nexus-blue)' }}>ONLINE</span></div>
      </footer>
    </div>
  );
}
