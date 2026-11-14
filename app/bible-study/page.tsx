import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bible Study | Voice of Jesus Ministry",
  description: "Explore Scripture through Bible studies, thoughtful reflection, and prayer with Voice of Jesus Ministry.",
};

export default function BibleStudy() {
  return (
    <div className="container page narrow">
      <p className="eyebrow">READ. REFLECT. GROW.</p>
      <h1>Bible Study</h1>
      <p className="lede">Make room for Scripture. Explore the lives, questions, and encounters that draw us closer to Jesus.</p>
      
      <Link className="feature-card" href="/bible-study/strength-for-the-weary">
        <span className="tag">HOPE &amp; RENEWAL · ISAIAH 40:28–31</span>
        <h2>Strength for the Weary</h2>
        <p>Renewing your faith when spirit and energy run low. Discover the biblical meaning of waiting upon the Lord, with reflection questions and prayer.</p>
        <span className="card-link">Read the study →</span>
      </Link>

      <Link className="feature-card" href="/bible-study/the-heart-of-biblical-justice-and-mercy">
        <span className="tag">JUSTICE &amp; MERCY · EXODUS 22:21–25</span>
        <h2>The Heart of Biblical Justice and Mercy</h2>
        <p>A study on Exodus 22:21–25 exploring God’s heart for the stranger, the vulnerable, and the oppressed, with reflection questions, discussion prompts, and prayer.</p>
        <span className="card-link">Read the study →</span>
      </Link>

      <Link className="feature-card" href="/bible-study/galatians-1-2">
        <span className="tag">GRACE & FAITH · GALATIANS 1–2</span>
        <h2>Standing Firm in the True Gospel</h2>
        <p>Explore Paul’s message of grace, justification by faith, and life in Christ, with Scripture readings, reflection questions, and prayer.</p>
        <span className="card-link">Read the study →</span>
      </Link>

      <Link className="feature-card" href="/bible-study/peters-failure-and-restoration">
        <span className="tag">GRACE & DISCIPLESHIP · 5 MIN READ</span>
        <h2>From the Courtyard to the Shore</h2>
        <h3>Peter’s Failure and Restoration</h3>
        <p>How Jesus meets our weakness with truth, mercy, and a renewed calling. Includes Scripture readings, reflection questions, and a closing prayer.</p>
        <span className="card-link">Read the study →</span>
      </Link>
    </div>
  );
}
