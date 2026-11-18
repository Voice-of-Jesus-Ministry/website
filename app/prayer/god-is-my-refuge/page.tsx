import type { Metadata } from "next";
import Link from "next/link";
import styles from "./prayer.module.css";

export const metadata: Metadata = {
  title: "God Is My Refuge | Today's Prayer | Voice of Jesus Ministry",
  description: "A prayer for courage, peace, and trust in God's promises. God is our refuge and strength.",
  openGraph: {
    title: "God Is My Refuge — Today's Prayer",
    description: "When I am afraid or overwhelmed, I will remember Your promises and run to You.",
    type: "article",
  },
};

const prayer = "God, all my hope is in You. Your Word tells me that You’ll never leave me, You’ll fight for me, and You’ll protect me. Even when I can't see it, You are at work in the details of my life. So when I’m afraid or overwhelmed, I will not lose heart. I will remember Your promises and run to You. You are my refuge and strength—the One in whom I trust. In Jesus’ name, Amen.";

export default function RefugePrayerPage() {
  return (
    <article className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.content}>
        <Link href="/" className={styles.back}>← Voice of Jesus Ministry</Link>
        <p className={styles.kicker}>A MOMENT IN HIS PRESENCE · NOVEMBER 16, 2026</p>
        <p className={styles.introduction}>I’d love to share today’s prayer with you!</p>
        <h1>God Is <em>My Refuge</em></h1>
        <div className={styles.rule} aria-hidden="true"><span>✦</span></div>
        <div className={styles.prayer} aria-label="God Is My Refuge prayer">
          <p>{prayer}</p>
        </div>
        <section className={styles.scripture} aria-labelledby="scripture-heading">
          <p id="scripture-heading" className={styles.label}>HOLD ON TO HIS WORD</p>
          <blockquote>“God is our refuge and strength, a very present help in trouble.”</blockquote>
          <cite>PSALM 46:1 · KJV</cite>
        </section>
        <div className={styles.actions}>
          <a href="https://wa.me/?text=God%20Is%20My%20Refuge%20%E2%80%94%20Today%27s%20Prayer%20https%3A%2F%2Fvoiceofjesusministry.net%2Fprayer%2Fgod-is-my-refuge" target="_blank" rel="noopener noreferrer">Share on WhatsApp ↗</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fvoiceofjesusministry.net%2Fprayer%2Fgod-is-my-refuge" target="_blank" rel="noopener noreferrer">Share on Facebook ↗</a>
        </div>
        <p className={styles.closing}>May God’s peace and strength be with you today.</p>
        <Link className={styles.home} href="/bible-study">Explore more Scripture and Bible studies →</Link>
      </div>
    </article>
  );
}
