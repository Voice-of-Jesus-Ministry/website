import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
 title: "About | Voice of Jesus Ministry",
 description: "Learn about Voice of Jesus Ministry, our Bible studies, coastal outreach, and legal organization: VOICE OF JESUS MINISTRY INC, EIN 43-2759368."
};
const board = [
 { name: "Nicholai Madias", role: "President & Director", image: "/media/people/nicholai-madias.png", art: false },
 { name: "Sheila Garcia", role: "Vice President & Director", image: "/media/people/sheila-garcia.png", art: false },
 { name: "Lea Asis", role: "Secretary & Director", image: "/media/people/lea-asis.png", art: false },
 { name: "Sharon Barber", role: "Treasurer & Director", image: "/media/people/sharon-barber.jpg", art: false },
 { name: "Pastor Allen Oprecina", role: "Director · Bible Study Leader", image: "/media/people/allen-oprecina-ministry.jpg", art: true },
];
export default function About() {
 return <article className="container page narrow prose">
  <p className="eyebrow">HEAR HIS VOICE. FOLLOW HIS WORD.</p><h1>Faith expressed through love and service.</h1>
  <p className="lede">Voice of Jesus Ministry brings together Bible study, prayer, fellowship, and practical community outreach.</p>
  <h2>Rooted in Scripture</h2><p>We help people explore the words of Jesus, reflect on Scripture, and grow in faith. Our lessons and educational games invite learners to read, think, and put what they learn into practice.</p>
  <h2>Walking alongside communities</h2><p>Mission 2026 supports Bible teaching, meals, and fellowship in a remote coastal community. We are grateful for the partners and volunteers who help sustain this work.</p>
  <Link className="text-link" href="/missions/2026">Meet the people of Mission 2026 →</Link>
  <section id="team" className="ministry-team" aria-labelledby="team-heading">
   <p className="eyebrow">OUR TEAM</p><h2 id="team-heading">United in faith. Committed to service.</h2>
   <p>Meet the board of directors of Voice of Jesus Ministry. Pastor Allen leads our weekly Bible study, connecting students and ministry family across the United States and the Philippines.</p>
   <div className="board-grid">{board.map(member => <article className="board-member" key={member.name}>
    <div className={`board-portrait${member.art ? " ministry-art" : ""}`}><img src={member.image} alt={member.art ? "Illustration of Pastor Allen teaching Bible study" : `Illustrated portrait of ${member.name}`} width="640" height="800" loading="lazy" /></div>
    <h3>{member.name}</h3><p>{member.role}</p>
   </article>)}</div>
  </section>
  <section className="ministry-purpose" aria-labelledby="purpose-heading"><h2 id="purpose-heading">Our purpose</h2>
   <p>Organized exclusively for religious, charitable and educational purposes under IRC Section 501(c)(3). Upon dissolution, assets shall be distributed solely for exempt purposes within the meaning of IRC Section 501(c)(3).</p>
  </section>
  <section id="supporters" className="ministry-supporters" aria-labelledby="supporters-heading"><p className="eyebrow">COMMUNITY &amp; SUPPORTERS</p><h2 id="supporters-heading">Many hands. A shared mission.</h2>
   <p>Our ministry is strengthened by volunteers who give their time, sponsors who help meet practical needs, and donors who support the work. We are grateful for every act of service and generosity.</p>
   <p>Explore the people and outreach behind <Link href="/missions/2026">Mission 2026</Link>, or learn <Link href="/donate">how to support current needs</Link>.</p>
  </section>
  <section className="notice" aria-labelledby="organization-heading"><h2 id="organization-heading">Our legal organization</h2>
   <dl><dt>Legal name</dt><dd>VOICE OF JESUS MINISTRY INC</dd><dt>Employer Identification Number (EIN)</dt><dd>43-2759368</dd></dl>
   <p>The IRS has assigned this EIN to our organization. An EIN identifies an organization; it does not by itself establish federal tax-exempt status or the deductibility of contributions.</p>
  </section>
  <h2>Support the work</h2><p>Learn about current mission needs and the available ways to support them.</p><Link className="text-link" href="/donate">Donation information →</Link>
 </article>;
}
