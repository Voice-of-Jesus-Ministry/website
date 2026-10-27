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
