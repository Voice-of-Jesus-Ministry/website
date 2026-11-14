# Ministry member accounts

Repository: Voice-of-Jesus-Ministry/website
Production domain: https://voiceofjesusministry.net

Sign-in and registration use Clerk. Without both Clerk environment variables, the production site stays in guest mode; no fake registration is offered.

Activation:
1. Create/connect a ministry-owned Clerk application. Enable Google sign-in and email links; disable passwords if email links are the chosen flow.
2. Configure the production domain and provider redirect URLs in Clerk/Google. Complete provider terms and administrator verification as required.
3. Set CLERK_SECRET_KEY and NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in this ministry Vercel project only. Never put secrets in Git or the project spreadsheet.
4. Verify registration, Google sign-in, email links, sign-out, and session expiry with a test account before opening membership.

Photo/video unlock design: a server-owned points ledger and verified campaign completion can grant a submission entitlement. Local game XP is untrusted and must never grant upload permission. Require a database transaction for point spending, one-time redemption, upload quotas, private object storage, file type/size checks, and a moderator queue. Only approved submissions may appear publicly. Accounts and uploads do not bypass the existing security remediation gate. No upload endpoint or spendable store is exposed in this release.
