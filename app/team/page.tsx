import type { Metadata } from "next";
import Link from "next/link";
import { ministryLeaders } from "../../lib/ministry-team";

export const metadata: Metadata = {
  title: "Our Team | Voice of Jesus Ministry",
  description:
    "Meet the board and ministry leaders of Voice of Jesus Ministry and discover how to take part in Bible study and community outreach.",
};

export default function TeamPage() {
  return (
    <article className="container page team-page">
      <header className="team-intro">
        <p className="eyebrow">OUR MINISTRY TEAM</p>
        <h1>Different gifts. One shared calling.</h1>
        <p className="lede">
          Meet the people serving Voice of Jesus Ministry through leadership,
          Scripture, prayer, and practical care for our communities.
        </p>
        <p className="team-scripture">One body, many members. — 1 Corinthians 12:12</p>
      </header>

      <section aria-labelledby="team-leadership">
        <div className="team-section-heading">
          <div>
            <p className="eyebrow">LEADERSHIP</p>
            <h2 id="team-leadership">Our board of directors</h2>
          </div>
          <p>Working together to support the ministry&apos;s religious, charitable, and educational mission.</p>
        </div>
        <div className="board-grid">
          {ministryLeaders.map((member) => (
            <article className="board-member" key={member.name}>
              <div className={`board-portrait${member.ministryArt ? " ministry-art" : ""}`}>
                <img
                  src={member.image}
                  alt={member.imageAlt}
                  width="640"
                  height="800"
                  loading="lazy"
                />
              </div>
              <div className="team-member-copy">
                <h3>{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
                <p className="team-member-detail">{member.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="team-service" aria-labelledby="team-service-heading">
        <p className="eyebrow">SERVING TOGETHER</p>
        <h2 id="team-service-heading">Faith made visible through service</h2>
        <div className="team-focus-grid">
          <div>
            <h3>Learn the Word</h3>
            <p>Join Bible study and explore Scripture with our community.</p>
            <Link className="text-link" href="/bible-study">Explore Bible study →</Link>
          </div>
          <div>
            <h3>Support outreach</h3>
            <p>Learn about practical needs and ongoing work with communities.</p>
            <Link className="text-link" href="/missions/2026">Explore Mission 2026 →</Link>
          </div>
          <div>
            <h3>Take part</h3>
            <p>Pray, share the mission, and discover ways to help others.</p>
            <Link className="text-link" href="/donate">Ways to support →</Link>
          </div>
        </div>
      </section>

      <footer className="team-page-footer">
        <p>We are grateful for volunteers, students, families, and supporters who serve alongside our leaders.</p>
        <Link className="text-link" href="/about">More about our ministry →</Link>
      </footer>
    </article>
  );
}
