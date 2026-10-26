# Voice of Jesus Ministry

A free ministry and learning hub: Scripture practice, small games, and a local study workspace. Selected features are adapted from [AmazingGrace](https://github.com/NicholaiMadias/AmazingGrace); housing listings and the original deployment remain in that repository.

## Available in this branch

| Route | Function |
| --- | --- |
| `/` | Ministry introduction, games, and Bible study/recording links |
| `/arcade` | Shared guest practice dashboard |
| `/arcade/bible-quiz` | Ten questions with answer explanations and Scripture references |
| `/arcade/quick-click` | Twenty-second star-catching challenge with pointer and keyboard modes |
| `/tools` | Browser-saved study notes and text download |
| `/account` | Guest progress summary and reset |
| Blog navigation | Links directly to https://voiceofjesusnet.blogspot.com/ |
| `/privacy` | Storage, privacy, and external-link disclosure |

The best result in each game contributes up to 100 practice XP (200 total). These are browser-local practice benchmarks, not verified competitive scores, spendable points, purchased credits, or paid-service entitlements. Guest results are not synchronized across devices. Keyboard Quick Click offers a longer target lifetime.

## Run and verify

Requires Node 22.18 or newer. CI uses Node 22.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production verification:

```sh
npm run check
npm start
```

`check` runs TypeScript, gameplay/progress regression tests, and the production build. The GitHub quality workflow also runs `npm audit --omit=dev --audit-level=high`. Dependabot proposes weekly package and GitHub Actions updates.

## Deployment

See [deployment instructions](docs/deployment.md). This branch is ready for a Next.js hosting preview after the hosting account/project is connected. This README does not assert that the branch has been deployed or that a domain is configured.

No environment variables, paid API services, auth backend, or payment provider are needed for this guest release. Before enabling real integrations, add authenticated server endpoints, encrypted token storage, revocable authorization, provider allowlists, usage controls, and server-owned scores/rewards. Never collect provider keys in browser storage.

## Audit and next steps

- [Migration decision and source findings](docs/migration-audit.md)
- [Source file and exact-duplicate inventory](docs/source-inventory.json)
- [License and source attribution](THIRD_PARTY_NOTICES.md)

Next: a canonical, corrected Star Match engine; real accounts and verified rewards; one secure cloud-storage connection; one server-backed AI provider. Payments remain deferred.

## Ministry links

- Intended ministry domain: https://voiceofjesusministry.net
- Recordings: https://youtube.com/@voiceofjesusnetwork
- Bible study: Thursdays at 8 pm Eastern
- Community: https://m.me/j/AbbK3MZd144YgdvI/

Application source is GPL-3.0; see `LICENSE` and `THIRD_PARTY_NOTICES.md`. Ministry branding and separately authored content retain their existing ownership.
