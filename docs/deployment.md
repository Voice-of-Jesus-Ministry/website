# Deploying the curated ministry application

This repository is a runnable Next.js application. GitHub is source control; it is not itself a production deployment. No payments, auth service, database, or external provider credentials are needed for the guest release.

## Local verification

Use Node 22.18 or newer (CI uses Node 22):

```sh
npm ci
npm run check
npm start
```

## Vercel deployment

The original project README identifies Vercel as its intended host. Verify the correct Vercel account/project first; an existing project may already manage the ministry domain.

1. Connect Vercel and select the project for `Voice-of-Jesus-Ministry/website`, or import this repository if no project exists.
2. Use the Next.js preset, root directory `.`, install command `npm ci`, build command `npm run build`, and Node 22.x. Leave the output directory at the framework default.
3. Deploy this branch as a preview. No environment variables or provider secrets are required.
4. Check the homepage, both games, progress after reload, workspace download, and mobile navigation.
5. Promote the reviewed version using the project's normal production flow. Preserve any existing domain configuration. Verify the production URL and status before announcing it live.

## Later integrations

OAuth callback URLs, encrypted server storage, session protections, request limits, and server-owned rewards are required before enabling accounts, BYO AI credentials, or storage connections. Do not use `NEXT_PUBLIC_*` variables for provider secrets. Do not add payment setup until the product has demonstrated value.

## Rollback

Restore the previous successful Vercel deployment or revert the migration merge. Guest data has its own versioned localStorage keys; it does not alter the source site's progress or housing assets.
