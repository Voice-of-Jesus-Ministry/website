import Link from "next/link";
import { PracticeSummary } from "../../components/PracticeSummary";
import Head from "next/head";
import type { NextPage } from "next";

export const Arcade: NextPage = () => {
  return (
    <>
      <Head>
        <title>Arcade – Voice of Jesus Ministry</title>
        <meta name="description" content="Play Bible quizzes, quick click challenges, and the Matrix of Conscience game to grow in Scripture knowledge." />
      </Head>
      <div className="container page" aria-label="Arcade home">
        <p className="eyebrow">THE ARCADE</p>
        <h1>Play with purpose.</h1>
        <p className="lede">
          Choose a Bible quiz or a quick focus challenge, or enter Matrix of Conscience: a story and defense campaign with Scripture questions between missions. XP from Bible Quiz and Quick Click is saved on this browser; Matrix progress is saved separately.
        </p>
        <PracticeSummary />
        <div className="card-grid two section">
          <Link className="feature-card" href="/arcade/bible-quiz" aria-label="Play Bible Study Quiz">
            <span className="card-icon" aria-hidden="true">Aa</span>
            <h2>Bible Study Quiz</h2>
            <p>Explore ten Scripture questions at your own pace. Review every answer with a reference.</p>
            <span className="card-link">Play Bible Quiz →</span>
          </Link>
          <Link className="feature-card" href="/arcade/quick-click" aria-label="Play Quick Click game">
            <span className="card-icon gold" aria-hidden="true">✦</span>
            <h2>Quick Click</h2>
            <p>Catch as many stars as you can in 20 seconds. Use touch, a mouse, or Tab and Enter.</p>
            <span className="card-link">Play Quick Click →</span>
          </Link>
          <Link className="feature-card" href="/arcade/matrix-of-conscience" aria-label="Enter Matrix of Conscience campaign">
            <span className="card-icon gold" aria-hidden="true" aria-label="star icon">✦</span>
            <h2>Matrix of Conscience</h2>
            <p>Follow one seven‑chapter story through defense, matching, space flight, and a maze. Answer Bible questions between levels and spend bonus points on the next mission.</p>
            <span className="card-link">Enter the campaign →</span>
          </Link>
        </div>
        <p className="notice">These are personal practice results, saved on this browser. Practice XP tracks your best scores and has no cash value.</p>
      </div>
    </>
  );
};

export default Arcade;
