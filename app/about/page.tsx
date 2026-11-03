import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
 title: "About | Voice of Jesus Ministry",
 description: "Learn about Voice of Jesus Ministry, our Bible studies, coastal outreach, and legal organization: VOICE OF JESUS MINISTRY INC, EIN 43-2759368."
};
export default function About() {
 return <article className="container page narrow prose">
  <p className="eyebrow">HEAR HIS VOICE. FOLLOW HIS WORD.</p><h1>Faith expressed through love and service.</h1>
  <p className="lede">Voice of Jesus Ministry brings together Bible study, prayer, fellowship, and practical community outreach.</p>
  <h2>Rooted in Scripture</h2><p>We help people explore the words of Jesus, reflect on Scripture, and grow in faith. Our lessons and educational games invite learners to read, think, and put what they learn into practice.</p>
  <h2>Walking alongside communities</h2><p>Mission 2026 supports Bible teaching, meals, and fellowship in a remote coastal community. We are grateful for the partners and volunteers who help sustain this work.</p>
  <Link className="text-link" href="/missions/2026">Meet the people of Mission 2026 →</Link>
  <section className="notice" aria-labelledby="organization-heading"><h2 id="organization-heading">Our legal organization</h2>
   <dl><dt>Legal name</dt><dd>VOICE OF JESUS MINISTRY INC</dd><dt>Employer Identification Number (EIN)</dt><dd>43-2759368</dd></dl>
   <p>The IRS has assigned this EIN to our organization. An EIN identifies an organization; it does not by itself establish federal tax-exempt status or the deductibility of contributions.</p>
  </section>
  <h2>Support the work</h2><p>Learn about current mission needs and the available ways to support them.</p><Link className="text-link" href="/donate">Donation information →</Link>
 </article>;
}
