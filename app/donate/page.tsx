import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support the ministry | Voice of Jesus Ministry",
  description: "Support Bible study, student education, and community outreach through secure Stripe donation links.",
};

type GiftOption = {
  title: string;
  amount: string;
  cadence: string;
  description: string;
  variable: string;
};

const gifts: GiftOption[] = [
  {
    title: "Bible Study Student — Monthly",
    amount: "$25",
    cadence: "per month",
    description: "A recurring gift supporting Bible study lessons and essential student supplies. Renews monthly until canceled.",
    variable: "STRIPE_DONATION_LINK_STUDENT_MONTHLY",
  },
  {
    title: "Bible Study Student — One-Time",
    amount: "$25",
    cadence: "one-time",
    description: "A single gift for student Bible study materials and educational supplies.",
    variable: "STRIPE_DONATION_LINK_STUDENT_ONETIME",
  },
  {
    title: "Chromebook Education Sponsor",
    amount: "$500",
    cadence: "one-time",
    description: "Sponsor a student education package, including a refurbished Chromebook and support for shipping, connectivity, learning activities, and initial technical assistance.",
    variable: "STRIPE_DONATION_LINK_CHROMEBOOK",
  },
  {
    title: "Community Founder",
    amount: "$1,000",
    cadence: "per month",
    description: "A recurring monthly gift supporting education and community outreach. Includes recognition, ministry updates, and invitations to missions when available. Travel is not included. Renews monthly until canceled.",
    variable: "STRIPE_DONATION_LINK_FOUNDER_MONTHLY",
  },
];

function verifiedStripeLink(variable: string): string | null {
  // Payment Links are intentionally supplied at build time rather than guessed.
  const value = process.env[variable]?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" ||
        !["buy.stripe.com", "checkout.stripe.com"].includes(url.hostname) ||
        url.username || url.password) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export default function Donate() {
  const options = gifts.map((gift) => ({ ...gift, href: verifiedStripeLink(gift.variable) }));
  const anyCheckoutReady = options.some((gift) => Boolean(gift.href));

  return (
    <article className="container page narrow prose">
      <p className="eyebrow">GIVE WITH UNDERSTANDING</p>
      <h1>Support faith, education, and practical care.</h1>
      <p className="lede">
        Help Voice of Jesus Ministry provide Bible study, educational supplies,
        and practical assistance to communities we serve.
      </p>

      <h2>Choose a way to give</h2>
      <p>
        Secure checkout is hosted by Stripe. The amount and whether your gift
        repeats are shown before you confirm payment.
      </p>
      <div className="card-grid two" aria-label="Donation options">
        {options.map((gift) => (
          <section className="feature-card" key={gift.variable} aria-label={gift.title}>
            <h3>{gift.title}</h3>
            <p><strong>{gift.amount}</strong> {gift.cadence}</p>
            <p>{gift.description}</p>
            {gift.href ? (
              <a
                className="text-link"
                href={gift.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Continue to secure Stripe checkout ↗
              </a>
            ) : (
              <p className="quiet" role="status">Stripe checkout link being finalized.</p>
            )}
          </section>
        ))}
      </div>
      {!anyCheckoutReady && (
        <p className="notice">
          Online donation checkout is being finalized. No payment will be requested on this page.
        </p>
      )}
      <p>
        For recurring gifts, cancellation and payment-method management are
        available through the Stripe customer portal once your subscription is active.
      </p>
      <section className="notice" aria-labelledby="tax-heading">
        <h2 id="tax-heading">Tax-exemption status</h2>
        <p>VOICE OF JESUS MINISTRY INC</p>
        <p>
          The organization submitted its Form 1023 application fee in November 2026.
          Federal tax-exempt recognition remains pending confirmation of an IRS determination.
        </p>
        <p>
          We are not currently representing contributions as tax-deductible.
          Please consult your tax adviser about your circumstances. Any promised
          goods, services, or participant benefits may affect deductibility.
        </p>
      </section>
      <p><Link className="text-link" href="/missions/2026">Read our Mission 2026 update →</Link></p>
      <p><Link className="text-link" href="/about">About the ministry →</Link></p>
    </article>
  );
}
