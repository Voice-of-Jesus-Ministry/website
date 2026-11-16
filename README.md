# Voice of Jesus Ministry

A free ministry and learning hub: Scripture practice, small games, and a local study workspace.

## Site and arcade

| Route | Function |
| --- | --- |
| `/` | Ministry introduction, games, and Bible study/recording links |
| `/arcade` | Shared guest practice dashboard |
| `/arcade/bible-quiz` | Ten questions with answer explanations and Scripture references |
| `/arcade/quick-click` | Twenty-second star-catching challenge with pointer and keyboard modes |
| `/arcade/star-match` | Untimed 12-move match-three puzzle with hints and cascades |
| `/arcade/matrix-of-conscience` | Seven-chapter campaign with Scripture quizzes and mission upgrades |
| `/tools` | Browser-saved study notes and text download |
| `/account` | Guest progress summary and reset |
| Blog navigation | Links directly to https://voiceofjesusnet.blogspot.com/ |
| `/privacy` | Storage, privacy, and external-link disclosure |

Bible Quiz and Quick Click contribute up to 100 practice XP each (200 total). Matrix saves campaign progress separately in the browser. Star Match scores apply to the current round.

## Run and verify

Requires Node 24.x. CI and Vercel use Node 24.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production verification:

```sh
npm run check
npm start
```

`check` runs TypeScript, gameplay/progress regression tests, and the production build. The CI workflow runs build, lint and tests; the Website quality workflow runs typecheck and `npm audit --omit=dev --audit-level=high`. Dependabot proposes weekly package and GitHub Actions updates.

## Deployment

See [deployment instructions](docs/deployment.md). The repository is linked to the Vercel `website` project in the `amazinggrace` team. Pull requests produce preview deployments. Preview failures do not by themselves establish production downtime. Check production status and the domain separately before announcing a release.

No environment variables, paid API services, auth backend, or payment provider are needed for this guest release. Before enabling real integrations, add authenticated server endpoints, encrypted token storage, revocable authorization, provider allowlists, usage controls, and server-owned scores/rewards. Never collect provider keys in browser storage.

## Audit and next steps

- [Current repository audit](docs/repository-audit.md)
- [Migration decision and source findings](docs/migration-audit.md)
- [Source file and exact-duplicate inventory](docs/source-inventory.json)
- [License and source attribution](THIRD_PARTY_NOTICES.md)

The [Matrix campaign guide](docs/matrix-campaign.md) describes missions, quiz points, and local saves.

## Ministry links

- Intended ministry domain: https://voiceofjesusministry.net
- Recordings: https://youtube.com/@voiceofjesusnetwork
- Bible study: Thursdays at 8 pm Eastern
- Community: https://m.me/cm/AbYwya7_jv6a4Y_v/?send_source=cm%3Acopy_invite_link

Application source is GPL-3.0; see `LICENSE` and `THIRD_PARTY_NOTICES.md`. Ministry branding and separately authored content retain their existing ownership.
