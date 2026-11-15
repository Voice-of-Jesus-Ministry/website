# Deploying the curated ministry application

This repository is a runnable Next.js application. GitHub is source control; it is not itself a production deployment. No payments, auth service, database, or external provider credentials are needed for the guest release.

## Local verification

Use Node 24.x (CI and Vercel must both use Node 24):

```sh
npm ci
npm run check
npm start
```

## Vercel deployment

The original project README identifies Vercel as its intended host. Verify the correct Vercel account/project first; an existing project may already manage the ministry domain.

1. Connect Vercel and select the project for `Voice-of-Jesus-Ministry/website`, or import this repository if no project exists.
2. Use the Next.js preset, root directory `.`, install command `npm ci`, build command `npm run build`, and Node 24.x. Leave the output directory at the framework default.
3. Deploy this branch as a preview. No environment variables or provider secrets are required.
4. Check the homepage, both games, progress after reload, workspace download, and mobile navigation.
5. Promote the reviewed version using the project's normal production flow. Preserve any existing domain configuration. Verify the production URL and status before announcing it live.

## Deployment and GitHub Actions

The ministry runs on Vercel. Its Next.js routes for sign-in and sign-up require a server runtime. Firebase Hosting needs a separate deployment design for those routes before it can serve as a fallback.

Store deployment secrets through the authorized vault or GitHub organization settings, scoped to the repositories that need them. GitHub's Actions API exposes secret metadata but cannot retrieve secret values for replication.

Use Agent Governance Review for pull requests. It tallies submitted GitHub reviews. The retired Guardian Vote prototype counted hard-coded approvals and never deployed the site.

## Deployment reliability and checks

- Keep the Vercel project linked to `Voice-of-Jesus-Ministry/website` on the `main` production branch. Preview deployments are created from pull request branches; do not mistake a failed preview for a failed production release.
- `package.json` pins the Node.js major version to `24.x`, matching GitHub Actions and the project setting. Avoid a `>=` Node range, which makes Vercel automatically select a newer major.
- Maintain both required status names: `CI / build` (build, lint, tests) and `Website quality / check` (typecheck and production dependency audit). Work is split to avoid duplicate builds; review branch protection before removing either workflow.
- The older repository history may contain a `website` gitlink without corresponding `.gitmodules`; investigate that separately before modifying historical source or deleting paths. GitHub Actions explicitly avoids submodule checkout. The Vercel checkout warning is non-fatal unless a required source file is missing.
- Production promotion requires a passing preview and review of the deployed routes. Revert the merge or roll back to the last READY deployment if smoke checks fail.

## Later integrations

OAuth callback URLs, encrypted server storage, session protections, request limits, and server-owned rewards are required before enabling accounts, BYO AI credentials, or storage connections. Do not use `NEXT_PUBLIC_*` variables for provider secrets. Do not add payment setup until the product has demonstrated value.

## Rollback

Restore the previous successful Vercel deployment or revert the migration merge. Guest data has its own versioned localStorage keys; it does not alter the source site's progress or housing assets.
