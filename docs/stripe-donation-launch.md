# Stripe donation checkout — Voice of Jesus Ministry

The donation page at `/donate` now offers the four agreed donation choices using
**Stripe-hosted Payment Links**, rather than the former third-party GoFundMe.
The repository **does not contain a verified Stripe checkout URL** yet. Until each
link is supplied, its card displays a non-clickable setup message; the page never
invents a payment destination or falls back to another charity's fundraiser.

## Publish the actual Stripe links

In the Voice of Jesus Ministry Stripe account, create or inspect Payment Links
and confirm the **legal recipient, price, payment mode, currency, billing cadence,
and cancellation flow** before copying the exact `https://buy.stripe.com/...` URL.

Configure these variables in the Vercel `website` project that deploys
`Voice-of-Jesus-Ministry/website`. Apply them to production and to only those
preview environments intentionally using live payment links.

| Variable | Stripe product / schedule |
| --- | --- |
| `STRIPE_DONATION_LINK_STUDENT_MONTHLY` | $25 monthly Bible Study Student |
| `STRIPE_DONATION_LINK_STUDENT_ONETIME` | $25 one-time Bible Study Student |
| `STRIPE_DONATION_LINK_CHROMEBOOK` | $500 one-time Chromebook Education Sponsor |
| `STRIPE_DONATION_LINK_FOUNDER_MONTHLY` | $1,000 monthly Community Founder |

Acceptable values are absolute HTTPS URLs on `buy.stripe.com` or
`checkout.stripe.com`. Other hosts are rejected. Do not put secret Stripe API
keys in client-side environment variables or source code.

Redeploy after setting or updating links. Check the public `/donate` page and
**complete a test checkout in Stripe test mode**, then explicitly verify the live
product, mode, recurrence, receipt, refunds and cancellation behavior before a
public launch. A one-time payment must never accidentally be a subscription.

## Nonprofit disclosures and readiness

As of the last confirmed ministry update, the IRS Form 1023 application was
pending; do not promise deductibility before confirmation. Ensure Stripe account
payout ownership belongs to the organization and review applicable fundraising
registration, benefit disclosures and donor receipt requirements.

This is a hosted-link integration, not embedded card handling. Stripe is
responsible for the sensitive payment form. No Stripe webhook, signing secret,
payment processor SDK, or Lemon Squeezy integration is required for this page.

## Verify before considering it live

- All four payment links actually exist in the intended Stripe account.
- Donation amounts and recurring terms exactly match the page.
- Stripe Customer Portal can manage and cancel subscriptions.
- Legal organization name and payment statement description are correct.
- Donor receipts and any goods/services acknowledgments are accurate.
- GoFundMe is no longer linked from `/donate`.
