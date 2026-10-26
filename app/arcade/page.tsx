import Link from "next/link";
import { PracticeSummary } from "../../components/PracticeSummary";
export default function Arcade() {
  return (
    <div className="container page">
      <p className="eyebrow">THE ARCADE</p>
      <h1>Play with purpose.</h1>
      <p className="lede">
        Two small challenges. One shared journey. Your best result in each game
        contributes up to 100 practice XP.
      </p>
      <PracticeSummary />
      <div className="card-grid two section">
        <Link className="feature-card" href="/arcade/bible-quiz">
          <span className="card-icon">Aa</span>
          <h2>Bible Study Quiz</h2>
          <p>
            Explore ten Scripture questions at your own pace. Review every
            answer with a reference.
          </p>
          <span className="card-link">Play Bible Quiz →</span>
        </Link>
        <Link className="feature-card" href="/arcade/quick-click">
          <span className="card-icon gold">✦</span>
          <h2>Quick Click</h2>
          <p>
            Catch as many stars as you can in 20 seconds. Use touch, a mouse, or
            Tab and Enter.
          </p>
          <span className="card-link">Play Quick Click →</span>
        </Link>
      </div>
      <p className="notice">
        These are personal practice results, saved on this browser. Practice XP
        tracks your best scores and has no cash value.
      </p>
    </div>
  );
}
