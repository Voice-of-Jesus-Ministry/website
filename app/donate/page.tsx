import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {title: "Support the ministry | Voice of Jesus Ministry",description: "Current mission needs and donation information for Voice of Jesus Ministry."};
export default function Donate() {
 return <article className="container page narrow prose">
  <p className="eyebrow">GIVE WITH UNDERSTANDING</p><h1>Support faith, fellowship, and practical care.</h1>
  <p className="lede">Thank you for helping sustain Bible teaching, nourishment, and community outreach.</p>
  <h2>Current mission fundraiser</h2><p>Pastor Allan's village operations fundraiser supports needs including safe water, classroom solar power, and a reliable boat motor.</p>
  <a className="text-link" href="https://gofund.me/6a70a3e0f" target="_blank" rel="noopener noreferrer">Visit Pastor Allan's fundraiser ↗</a>
  <p>Review the campaign’s organizer, beneficiary, use of funds, and donation terms on GoFundMe before giving.</p>
  <section className="notice" aria-labelledby="tax-heading"><h2 id="tax-heading">501(c)(3) application update</h2>
   <p>VOICE OF JESUS MINISTRY INC · EIN 43-2759368</p>
   <p>The ministry paid its Form 1023 application fee through Pay.gov in November 2026. The IRS determination on federal tax-exempt recognition is pending. We will update this page when a determination letter is issued.</p>
   <p>We are not representing gifts made through this website or the external fundraiser as tax-deductible donations to VOICE OF JESUS MINISTRY INC at this time. Please review the external fundraiser's terms and consult your tax adviser regarding any contribution.</p>
  </section>
  <p><Link className="text-link" href="/missions/2026">Read our Mission 2026 update →</Link></p><p><Link className="text-link" href="/about">About the ministry →</Link></p>
 </article>;
}
