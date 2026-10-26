# AmazingGrace → Voice of Jesus: audit and migration decision

## Decision

Use `Voice-of-Jesus-Ministry/website` as the application destination. Preserve AmazingGrace as the source of housing content and as a reference for later feature selection. Migrate a working vertical slice first; do not copy the entire source tree or attempt a wholesale rewrite of all games.

This is a structural and selected-source audit, not a full penetration test or a timed comparison of complete implementations. It is sufficient to identify concrete build blockers and boundaries that must not be carried into the new platform.

## Reviewed snapshots

- AmazingGrace: `c39e707f940225b1b76c555741abee217326a3c7`.
- Destination base: `8b150ca803773d7629b101ab123f2100ca2f345d`.
- Source: 612 tracked files; 148,508,424 bytes in the current tree (141.6 MiB; not Git history size).
- Destination base: 8 files. No homepage, package scripts, lockfile, TypeScript config, or CI workflow existed. README descriptions were aspirational, not evidence of working routes.
- `source-inventory.json` records each source path, size, and blob identity, plus duplicate groups. It contains metadata, not credentials or source file contents.

## Concrete findings

| Priority | Evidence | Consequence / treatment |
| --- | --- | --- |
| High | `storage.rules:4` grants every authenticated user read/write access to every storage path | Do not migrate. Future storage needs per-user authorization and upload restrictions. Rules in Git do not prove current live rules. |
| High | `firestore.rules:32–33` allows any authenticated user to write public artifacts; ministry metrics similarly allow shared writes | Do not reuse for competitive scores, entitlements, or account data. Build a server-owned score and rewards boundary. |
| High | `js/visionforge.js` uses `window.__GEMINI_API_KEY` and sends requests directly from the browser | Do not migrate. Provider credentials must use an appropriate secure server-side integration. No real key was required or inspected. |
| High | `src/economy/matrixEconomy.ts`, `credits.js`, and quiz code trust localStorage balances, unlocks, and usage counts | Useful for demos only. Guest XP in this branch has no monetary value or server authority. Never convert legacy balances into purchased credits. |
| Build blocker | `vite.config.ts` inputs reference `library/fixing-copilot-ruleset-bypass-errors/index.html`, `news/index.html`, `news/articles/zyko-learn.html`, and `news/articles/future-articles.html`, absent from the tracked tree | Full cleanup requires repairing the source build inputs and checking all legacy routes. This migration avoids those dependencies. The original build was not executed. |
| Correctness | Both `src/arcade/puzzle/StarMatchEngine.js` and `src/arcade/star-match/starMatchEngine.js` clear tiles while iterating intersecting row/column matches | An intersecting tile can be visited twice after becoming null. Deduplicate cells before scoring/clearing; add crossing-match regression coverage before migration. |
| Correctness | Match engines accept arbitrary swap coordinates without enforcing adjacency | Validate board bounds, adjacency, and legal move resolution before using for rewards or competitions. |
| Maintainability | Multiple `AuthorsMandate`, Matrix, match engine, wallet, and Firebase initialization implementations coexist | Choose one canonical implementation per feature. Similar names alone do not prove files unused. |
| Asset footprint | 26 groups of exact matching Git blobs contain 38,190,864 redundant bytes (36.4 MiB) | Candidates for reference-aware consolidation, not automatic deletion. Housing assets belong to the housing site. |
| Asset correctness | Destination `public/favicon.ico` is actually a 2048×2048 JPEG, 350,652 bytes | Explicit metadata selects the existing SVG. Remove the unused mislabeled file from the migration branch. |
| Deployment | Source CI deploys to Firebase; source also contains Vite, Cloudflare, Docker and other deployment configuration; destination README mentions Vercel but has no deployment configuration | Keep one destination build path. Hosting-account/project access must be verified before changing production. No live deployment is claimed. |

## Migration order

| Feature | Value / effort | Decision |
| --- | --- | --- |
| Bible Study Quiz | Useful standalone learning flow; small content dependency | Migrate now with references and accessible answer feedback. |
| Quick Click | Small gameplay core; usable on mobile and keyboard | Migrate now without the old client-written public leaderboard. |
| Study workspace | Immediate utility without an API bill | Add local notes and downloads. |
| Star Match / Seven Stars | Strong game candidate, but duplicate engines, shared lore, and scoring defects | Next game after canonical engine, legal moves, cascade fixes, and regression tests. |
| Stories / audio / ministry library | Potentially valuable; routes, ownership, and media sizes vary | Select content individually and validate links. Keep large media out of the application bundle. |
| Matrix / Trinity / tower defense | Larger subsystem dependency graphs; some modules are overlays/scaffolds | Evaluate independently after the first slice is stable. No claim these are all fully functional. |
| Coding assistant / image generator | Valuable but requires secure provider access and clear usage limits | Backend integration phase; no copied browser API-key handling or placeholder output presented as real AI. |
| Admin, key vault, payments, promotional credits | Not necessary to prove first-release value | Do not migrate. Payments remain deferred. |

## Implemented first slice

- Working Next.js app, exact Next version and lockfile, TypeScript, production build, responsive navigation, guest account status, and privacy disclosure.
- Bible Quiz and Quick Click share a progress provider. Each best result contributes at most 100 practice XP; lower scores and replays cannot farm lifetime XP.
- Practice XP is a personal benchmark. Keyboard mode has a longer target lifetime; scores are not suitable for shared competitions.
- Study notes stay local and can be downloaded. No secret-entry fields, payment flow, embedded third-party media, login impersonation, or fake connected-provider controls.
- Automated build/type/test and production dependency audit workflow, plus weekly dependency and workflow update proposals.
- Source license and provenance preserved. No deletion or deployment changes made to AmazingGrace.

## Follow-up architecture

1. Provision a real authentication service and server database. Keep guest practice usable; do not automatically trust guest XP as verified rewards.
2. Store users, game sessions, validated results, reward ledger entries, entitlements, and provider connections separately. Use server-side idempotency and transactional updates for rewards.
3. Start storage with a single provider and minimal, revocable OAuth access to selected files. Store tokens encrypted server-side. Support export and disconnect.
4. Start AI with one supported provider. Keep keys server-side, isolate each user's credentials, redact logs, allow only approved provider endpoints, and enforce request/rate limits. Meter coding and image workloads separately; user API costs remain their responsibility.
5. Add curated scripts only after a restricted runner is available. User-supplied code needs an isolated execution environment, network policy, time/memory limits, and explicit permissions.
6. Add earned spendable points and free tournaments only with verified server scoring and appropriate abuse controls. A game-specific adapter maps valid results to the common rewards ledger.
7. Consider a managed storage + AI bundle after measuring usage. Storage GB-months, AI requests/tokens/images, and tournament access need distinct metering even if sold in one package. Purchased credits and payment webhooks remain a later project.

## Deployment and rollback

See `deployment.md`. Build and review this branch before merging. Production hosting access is separate from GitHub access. Retain the current production version and restore that deployment if needed. Do not migrate DNS or change AmazingGrace's hosting as part of this branch.
