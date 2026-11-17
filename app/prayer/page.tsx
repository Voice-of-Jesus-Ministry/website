import type { Metadata } from "next";
import Link from "next/link";
import { PrayerRequest } from "./PrayerRequest";
import styles from "./prayer.module.css";

export const metadata: Metadata = {
  title: "Daily Prayers & Prayer Requests | Voice of Jesus Ministry",
  description: "Find strength in today's prayer, God Is My Refuge, and connect with our prayer community.",
  openGraph: {
    title: "Daily Prayers & Prayer Requests",
    description: "God Is My Refuge — a prayer for hope, courage, and trust in God's promises.",
    type: "website",
  },
};

const prayer = "God, all my hope is in You. Your Word tells me that You’ll never leave me, You’ll fight for me, and You’ll protect me. Even when I can't see it, You are at work in the details of my life. So when I’m afraid or overwhelmed, I will not lose heart. I will remember Your promises and run to You. You are my refuge and strength—the One in whom I trust. In Jesus’ name, Amen.";

export default function PrayerHome() {
  return <div className={styles.page}>
    <div className={styles.container}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>VOICE OF JESUS MINISTRY · PRAYER & FELLOWSHIP</p>
        <h1>Daily Prayers <span>& Prayer Requests</span></h1>
        <p>Come as you are. Find a quiet moment with God, rest in His promises, and pray with our community.</p>
        <div className={styles.heroActions}>
          <a href="#todays-prayer" className={styles.primary}>Read today’s prayer ↓</a>
          <a href="#request" className={styles.secondary}>Request prayer ↓</a>
        </div>
      </div>
      <section id="todays-prayer" className={styles.card} aria-labelledby="featured-title">
        <span className={styles.number}>01 / FEATURED PRAYER · NOVEMBER 16, 2026</span>
        <p className={styles.preTitle}>I’d love to share today’s prayer with you!</p>
        <h2 id="featured-title">God Is My Refuge</h2>
        <p className={styles.prayerText}>{prayer}</p>
        <div className={styles.verse}>
          <span className={styles.number}>SCRIPTURE TO REMEMBER</span>
          <blockquote>“God is our refuge and strength, a very present help in trouble.”</blockquote>
          <p>Psalm 46:1 · KJV</p>
        </div>
        <div className={styles.share}>
          <a href="/prayer/god-is-my-refuge">Open the prayer by itself →</a>
          <a href="https://wa.me/?text=God%20Is%20My%20Refuge%20https%3A%2F%2Fvoiceofjesusministry.net%2Fprayer%2Fgod-is-my-refuge" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fvoiceofjesusministry.net%2Fprayer%2Fgod-is-my-refuge" target="_blank" rel="noopener noreferrer">Facebook ↗</a>
        </div>
      </section>
      <section className={styles.card} aria-labelledby="promise-title">
        <span className={styles.number}>02 / PRAYER & REFLECTION</span>
        <h2 id="promise-title">You are not alone in prayer.</h2>
        <p>When life feels uncertain, we can bring our fears, burdens, gratitude, and hopes before God. You can take a moment to pray quietly or invite others to pray with you.</p>
        <p className={styles.reference}>Read also: Psalm 91 · Isaiah 41:10 · Hebrews 13:5</p>
      </section>
      <section id="request" className={styles.card} aria-labelledby="request-title">
        <span className={styles.number}>03 / LET US PRAY WITH YOU</span>
        <h2 id="request-title">Share a prayer request</h2>
        <p>Write what’s on your heart. You can copy your message and share it through our community Messenger link. Your words are not uploaded or saved on this page.</p>
        <PrayerRequest />
      </section>
      <aside className={styles.closing}>
        <p>“Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.”</p>
        <span>PHILIPPIANS 4:6 · KJV</span>
        <div><Link href="/bible-study">Explore Bible studies →</Link></div>
      </aside>
    </div>
  </div>;
}
