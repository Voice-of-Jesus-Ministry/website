import Link from "next/link";
export const metadata = { title: "Blog & teachings | Voice of Jesus Ministry" };
export default function Blog() {
  return <div className="container page narrow">
    <p className="eyebrow">WORDS FOR THE JOURNEY</p><h1>Blog & teachings</h1>
    <p className="lede">Scripture, reflection, and conversations that help us follow Jesus in everyday life.</p>
    <section className="section"><h2><Link href="/missions/2026">Mission 2026: Living by Grace, Walking by Faith</Link></h2><p>45 students reached. Over 100 meals served. Read our coastal outreach update and explore the mission photo gallery.</p></section>
    <section className="section"><h2><Link href="/tools">Your study workspace</Link></h2><p>Keep notes as you read, capture a reflection, and download your writing to keep.</p></section>
    <section className="section"><h2>From our ministry</h2><p>Read our published reflections and ministry updates on the Voice of Jesus blog.</p><a className="text-link" href="https://voiceofjesusnet.blogspot.com/">Read the ministry blog ↗</a></section>
    <section className="section"><h2>Study with us</h2><p>Explore Peter’s restoration, the Seven Stars, and questions to carry into prayer and conversation.</p><Link className="text-link" href="/bible-study">Explore Bible studies →</Link></section>
    <section className="section"><h2>Watch and reflect</h2><p>Visit our teaching library for recorded messages and Bible study conversations.</p><a className="text-link" href="https://youtube.com/@voiceofjesusnetwork">Watch our teachings ↗</a></section>
  </div>;
}
