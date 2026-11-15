import Link from "next/link";
import { PracticeSummary } from "../../components/PracticeSummary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arcade | Voice of Jesus Ministry",
  description: "Play Bible quizzes, Star Match, Quick Click, and the Matrix of Conscience campaign.",
};

export default function Arcade() {
  return (
    <div className="container page" aria-label="Arcade home">
      <p className="eyebrow">THE ARCADE</p>
      <h1>Play with purpose.</h1>
      <p className="lede">
        Explore Scripture, solve a puzzle, or play the seven-chapter Matrix of Conscience campaign.
      </p>
      <PracticeSummary />
      <div className="card-grid two section">
        <Link className="feature-card" href="/assistant" aria-label="Play Nexus Bible learning missions"><span className="card-icon gold" aria-hidden="true">✦</span><h2>Role Quest: Bible Study Assistant</h2><p>Choose Scripture Detective, Mission Navigator, or Restoration Guide. Study Scripture and complete a themed mission.</p><span className="card-link">Choose your role →</span></Link>
        <Link className="feature-card" href="/arcade/bible-quiz" aria-label="Play Bible Study Quiz">
          <span className="card-icon" aria-hidden="true">Aa</span>
          <h2>Bible Study Quiz</h2>
          <p>Explore ten Scripture questions at your own pace. Review every answer with a reference.</p>
          <span className="card-link">Play Bible Quiz →</span>
        </Link>
        <Link className="feature-card" href="/arcade/star-match">
          <span className="card-icon gold" aria-hidden="true">★</span>
          <h2>Star Match</h2>
          <p>Line up matching shapes in a 12-move puzzle with cascading tiles and optional hints.</p>
          <span className="card-link">Play Star Match →</span>
        </Link>
        <Link className="feature-card" href="/arcade/quick-click" aria-label="Play Quick Click game">
          <span className="card-icon gold" aria-hidden="true">✦</span>
          <h2>Quick Click</h2>
          <p>Catch as many stars as you can in 20 seconds. Use touch, a mouse, or Tab and Enter.</p>
          <span className="card-link">Play Quick Click →</span>
        </Link>
        <Link className="feature-card" href="/arcade/matrix-of-conscience" aria-label="Enter Matrix of Conscience campaign">
          <span className="card-icon gold" aria-hidden="true">✦</span>
          <h2>Matrix of Conscience</h2>
          <p>Follow one seven‑chapter story through defense, matching, space flight, and a maze. Answer Bible questions between levels and spend bonus points on the next mission.</p>
          <span className="card-link">Enter the campaign →</span>
        </Link>
      </div>
    </div>
  );
}
