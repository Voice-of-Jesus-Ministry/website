import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {title: "Support the ministry | Voice of Jesus Ministry",description: "Current mission needs and donation information for Voice of Jesus Ministry."};
export default function Donate() {
 return <article className="container page narrow prose">
  <p className="eyebrow">GIVE WITH UNDERSTANDING</p><h1>Support faith, fellowship, and practical care.</h1>
  <p className="lede">Thank you for helping sustain Bible teaching, nourishment, and community outreach.</p>
  <h2>Current mission fundraiser</h2><p>Pastor Allen’s village operations fundraiser supports needs including safe water, classroom solar power, and a reliable boat motor.</p>
  <a className="text-link" href="https://gofund.me/6a70a3e0f" target="_blank" rel="noopener noreferrer">Visit Pastor Allen’s fundraiser ↗</a>
  <p>Review the campaign’s organizer, beneficiary, use of funds, and donation terms on GoFundMe before giving.</p>
  <section className="notice" aria-labelledby="tax-heading"><h2 id="tax-heading">Tax-deductible donations</h2>
   <p>VOICE OF JESUS MINISTRY INC · EIN 43-2759368</p>
   <p>We have not yet verified federal tax-exempt status for this organization. We are not currently representing contributions through this website as tax-deductible or issuing tax-deductible donation receipts.</p>
   <p>The external fundraiser linked above is not a verified tax-deductible donation checkout for VOICE OF JESUS MINISTRY INC. An EIN alone does not establish deductibility.</p>
  </section>
  <p><Link className="text-link" href="/missions/2026">Read our Mission 2026 update →</Link></p><p><Link className="text-link" href="/about">About the ministry →</Link></p>
 </article>;
}
