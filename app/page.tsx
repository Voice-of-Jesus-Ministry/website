import Link from "next/link";
import { PracticeSummary } from "../components/PracticeSummary";

export default function Home() {
  return (
    <div className="container">
      <section className="hero">
        <div>
          <p className="eyebrow">THE VOICE OF JESUS MINISTRY</p>
          <h1>
            Rooted in Scripture.
            <br />Growing in grace.
          </h1>
          <p className="lede">
            Explore the words of Jesus through Bible study, prayer, and thoughtful play.
            Learn at your own pace, then share the journey with our community.
          </p>
          <div className="actions">
            <Link className="text-link" href="/bible-study">
              Explore Bible studies <span aria-hidden="true">→</span>
            </Link>
            <Link className="text-link" href="/arcade/bible-quiz">
              Try a Bible quiz <span aria-hidden="true">→</span>
            </Link>
            <a
              className="text-link"
              href="https://youtube.com/@voiceofjesusnetwork"
            >
              Watch our teachings ↗
            </a>
          </div>
          <p className="quiet">
            Free to explore. No payment or account required.
          </p>
        </div>
        <figure className="ministry-photo">
          <img src="/M23.jpg" alt="Children and families gathered at a community event" width="4032" height="3024" fetchPriority="high" />
        </figure>
      </section>
      <section className="section" aria-labelledby="seven-stars-heading">
        <div className="section-heading"><div><p className="eyebrow">NEW · MISSION-BASED LEARNING</p><h2 id="seven-stars-heading">The Mystery of the Seven Stars</h2></div><Link className="text-link" href="/bible-study/seven-stars">Open the lesson →</Link></div>
        <Link className="feature-card" href="/bible-study/seven-stars"><span className="tag">SCRIPTURE · ASTRONOMY · REFLECTION</span><h3>Learn, play, and follow the light</h3><p>A guided lesson that connects the Seven Churches, the Pleiades, and thoughtful choices—then sends learners into an arcade challenge for bonus points.</p><span className="card-link">Start the lesson →</span></Link>
      </section>
      <PracticeSummary />
      <section className="section" aria-labelledby="bible-study-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">READ. REFLECT. GROW.</p>
            <h2 id="bible-study-heading">Bible Study</h2>
          </div>
          <Link className="text-link" href="/bible-study">Explore the studies →</Link>
        </div>
        <Link className="feature-card" href="/bible-study/peters-failure-and-restoration">
          <span className="tag">GRACE & DISCIPLESHIP</span>
          <h3>From the Courtyard to the Shore: Peter’s Failure and Restoration</h3>
          <p>Between two fires, Peter discovers the limits of his own strength and the restoring mercy of Jesus.</p>
          <span className="card-link">Read the study →</span>
        </Link>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">START SOMETHING GOOD</p>
            <h2>Read. Reflect. Put faith into practice.</h2>
          </div>
          <Link className="text-link" href="/arcade">
            See all games →
          </Link>
        </div>
        <div className="card-grid">
          <Link href="/arcade/bible-quiz" className="feature-card">
            <span className="card-icon">Aa</span>
            <span className="tag">LEARN</span>
            <h3>Bible Study Quiz</h3>
            <p>
              Ten questions, thoughtful feedback, and Scripture references to
              keep exploring.
            </p>
            <span className="card-link">Begin a study round →</span>
          </Link>
          <Link href="/arcade/quick-click" className="feature-card">
            <span className="card-icon gold">✦</span>
            <span className="tag">PLAY</span>
            <h3>Quick Click</h3>
            <p>
              A twenty-second burst of focus. Find the stars and improve your
              personal best.
            </p>
            <span className="card-link">Take the challenge →</span>
          </Link>
          <Link href="/tools" className="feature-card">
            <span className="card-icon sage">✎</span>
            <span className="tag">CREATE</span>
            <h3>Your study workspace</h3>
            <p>
              Capture a reflection, collect ideas, and download your notes to
              keep.
            </p>
            <span className="card-link">Open your workspace →</span>
          </Link>
        </div>
      </section>
      <section className="community-panel">
        <div>
          <p className="eyebrow">GROW TOGETHER</p>
          <h2>There’s a place for you here.</h2>
          <p>
            Join our online Bible study on Thursdays at 8 pm Eastern, or catch
            up with a teaching whenever you have a quiet moment.
          </p>
        </div>
        <div className="actions">
          <a className="button" href="https://m.me/j/AbbK3MZd144YgdvI/">
            Join Bible study ↗
          </a>
          <a
            className="text-link"
            href="https://youtube.com/@voiceofjesusnetwork"
          >
            Watch recordings ↗
          </a>
        </div>
      </section>
    </div>
  );
}
