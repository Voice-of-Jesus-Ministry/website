import Link from "next/link";

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
        <article className="home-editorial"><span className="tag">SCRIPTURE · ASTRONOMY · REFLECTION</span><h3><Link href="/bible-study/seven-stars">Learn, play, and follow the light</Link></h3><p>A guided lesson that connects the Seven Churches, the Pleiades, and thoughtful choices—then sends learners into an arcade challenge for bonus points.</p></article>
      </section>

      <section className="section" aria-labelledby="bible-study-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">READ. REFLECT. GROW.</p>
            <h2 id="bible-study-heading">Bible Study</h2>
          </div>
          <Link className="text-link" href="/bible-study">Explore the studies →</Link>
        </div>
        <article className="home-editorial">
          <span className="tag">GRACE & DISCIPLESHIP</span>
          <h3><Link href="/bible-study/peters-failure-and-restoration">From the Courtyard to the Shore: Peter’s Failure and Restoration</Link></h3>
          <p>Between two fires, Peter discovers the limits of his own strength and the restoring mercy of Jesus.</p>

        </article>
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
        <div className="home-resources">
          <article><h3><Link href="/arcade/bible-quiz">Bible Study Quiz</Link></h3><p>Ten questions, thoughtful feedback, and Scripture references to keep exploring.</p></article>
          <article><h3><Link href="/arcade/matrix-of-conscience">Matrix of Conscience</Link></h3><p>Seven gameplay levels with Bible questions between missions. Spend earned points on your next level.</p></article>
        </div>
      </section>
      <section className="home-community">
        <div>
          <p className="eyebrow">GROW TOGETHER</p>
          <h2>There’s a place for you here.</h2>
          <p>
            Join our online Bible study on Thursdays at 8 pm Eastern, or catch
            up with a teaching whenever you have a quiet moment.
          </p>
        </div>
        <div className="actions">
          <a className="text-link" href="https://m.me/j/AbbK3MZd144YgdvI/">
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
