import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bible Study | Voice of Jesus Ministry",
  description: "Free online Bible studies with Scripture readings, thoughtful discussion questions, prayer, and a Galatians study series. Join Voice of Jesus Ministry Thursdays at 8 pm Eastern.",
  alternates: { canonical: "/bible-study" },
};

export default function BibleStudy() {
  return (
    <div className="container page narrow">
      <p className="eyebrow">READ. REFLECT. GROW.</p>
      <h1>Bible Study</h1>
      <p className="lede">Free, Scripture-centered lessons for personal devotion or group discussion. Read the Bible passage, explore the context, reflect on practical questions, and close in prayer.</p>
      <p>Join our online Bible study on Thursdays at 8 pm Eastern. You can also study at your own pace; no account or payment is required.</p>

      <Link className="feature-card" href="/bible-study/responsibility">
        <span className="tag">NEW STUDY · CHRISTIAN LIVING · 15–20 MINUTES</span>
        <h2>Responsibility: Faithfulness in Action</h2>
        <p>Study stewardship, accountability, service and integrity with Pastor Lincoln. Includes a sermon, discussion, prayer and interactive quiz.</p>
        <span className="card-link">Start the study →</span>
      </Link>

      <p><Link href="/comics">Explore our ministry comics →</Link></p>
      <h2>Study Galatians: Grace, Faith &amp; Life in Christ</h2>
      <p>Follow Paul's letter in order, beginning with the gospel of grace in chapters 1–2 and continuing with God's promise and our shared belonging in chapter 3.</p>

      <Link className="feature-card" href="/bible-study/galatians-3">
        <span className="tag">NEW STUDY · GALATIANS 3 · 30–40 MINUTES</span>
        <h2>Saved by Faith, Living as God's Family</h2>
        <p>Why is faith central to God's promise? Explore Abraham, the purpose of the law, and our identity in Christ. Includes a five-day reading plan and small-group questions.</p>
        <span className="card-link">Study Galatians 3 →</span>
      </Link>

      <Link className="feature-card" href="/bible-study/galatians-1-2">
        <span className="tag">GALATIANS 1–2 · GRACE &amp; FAITH</span>
        <h2>Standing Firm in the True Gospel</h2>
        <p>Start the series with Paul's message of justification by faith, the unity of believers, and life in Christ.</p>
        <span className="card-link">Begin the series →</span>
      </Link>

      <h2>More Bible studies</h2>

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

      <Link className="feature-card" href="/bible-study/peters-failure-and-restoration">
        <span className="tag">GRACE & DISCIPLESHIP · 5 MIN READ</span>
        <h2>From the Courtyard to the Shore</h2>
        <h3>Peter’s Failure and Restoration</h3>
        <p>How Jesus meets our weakness with truth, mercy, and a renewed calling. Includes Scripture readings, reflection questions, and a closing prayer.</p>
        <span className="card-link">Read the study →</span>
      </Link>

      <Link className="feature-card" href="/bible-study/seven-stars">
        <span className="tag">REVELATION 1–2 · SCRIPTURE &amp; REFLECTION</span>
        <h2>The Mystery of the Seven Stars</h2>
        <p>Explore John's vision, faithful witness, and how the light of Christ shapes everyday choices.</p>
        <span className="card-link">Read the study →</span>
      </Link>
    </div>
  );
}
