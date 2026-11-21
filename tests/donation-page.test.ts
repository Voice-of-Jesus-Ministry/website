import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../app/donate/page.tsx", import.meta.url), "utf8");

test("donation page no longer routes donors to GoFundMe or Lemon Squeezy", () => {
  assert.doesNotMatch(source, /gofundme|gofund\.me|lemonsqueezy/i);
  assert.match(source, /verifiedStripeLink/);
  assert.match(source, /https:/);
  assert.match(source, /buy\.stripe\.com/);
  assert.match(source, /checkout\.stripe\.com/);
});

test("each approved tier is explicitly configured without invented checkout URLs", () => {
  for (const variable of [
    "STRIPE_DONATION_LINK_STUDENT_MONTHLY",
    "STRIPE_DONATION_LINK_STUDENT_ONETIME",
    "STRIPE_DONATION_LINK_CHROMEBOOK",
    "STRIPE_DONATION_LINK_FOUNDER_MONTHLY",
  ]) {
    assert.ok(source.includes(variable), `missing tier: ${variable}`);
  }
  assert.match(source, /href: verifiedStripeLink\(gift\.variable\)/);
  assert.match(source, /Stripe checkout link being finalized/);
  assert.match(source, /not currently representing contributions as tax-deductible/);
});
