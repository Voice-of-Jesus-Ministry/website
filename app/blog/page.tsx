import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bible Teachings, Ministry Stories & Reflections | Voice of Jesus Ministry",
  description: "Read ministry stories, thoughtful Bible teaching, and Christian reflections. Explore the Galatians Bible study series, prayer resources, and outreach updates.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  return (
    <div className="container page narrow">
      <p className="eyebrow">WORDS FOR THE JOURNEY</p>
      <h1>Bible teachings &amp; ministry stories</h1>
      <p className="lede">
        Scripture-centered reflections, lessons for everyday discipleship, and stories of people
        serving their neighbors. Start with a study here, or browse our ministry blog.
      </p>

      <section className="section">
        <p className="eyebrow">FEATURED BIBLE STUDY</p>
        <h2><Link href="/bible-study/galatians-3">Galatians 3: Saved by Faith, Living as God's Family</Link></h2>
        <p>Follow Paul's teaching about Abraham's faith, the promise fulfilled in Christ, and belonging in God's family. Includes a group guide, reflection questions, prayer, and a five-day reading plan.</p>
        <Link className="text-link" href="/bible-study/galatians-3">Read the full Bible study →</Link>
      </section>

      <section className="section">
        <h2>Begin the Galatians series</h2>
        <p>New to Paul's letter? <Link href="/bible-study/galatians-1-2">Study Galatians 1–2</Link> first,
          then continue to <Link href="/bible-study/galatians-3">chapter 3</Link>.</p>
      </section>

      <section className="section">
        <h2><Link href="/missions/2026">Mission 2026: Living by Grace, Walking by Faith</Link></h2>
        <p>Explore our coastal outreach update and mission photo gallery.</p>
      </section>

      <section className="section">
        <h2>From our ministry blog</h2>
        <p>Read additional published reflections and ministry updates on our companion blog.</p>
        <a className="text-link" href="https://voiceofjesusnet.blogspot.com/">Visit the ministry blog ↗</a>
      </section>

      <section className="section">
        <h2>Read, reflect, and pray</h2>
        <p>Explore more <Link href="/bible-study">Bible studies</Link>, use our <Link href="/tools">study workspace</Link> to save notes, or visit the <Link href="/prayer">prayer page</Link>.</p>
        <a className="text-link" href="https://youtube.com/@voiceofjesusnetwork">Watch our teaching videos ↗</a>
      </section>
    </div>
  );
}
