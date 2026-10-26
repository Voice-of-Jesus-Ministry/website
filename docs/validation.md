# First migration validation

Validated locally against a production build of this branch:

- TypeScript check and production build: passed.
- Seven unit/regression tests: passed. Covers shared normalization, best-score-only progression, repeated completion, invalid scores, corrupt persisted data, bounded history, migrated hit geometry/timing helpers, and valid quiz answers.
- Production dependency audit: no known vulnerabilities reported at validation time. This is not a guarantee against all vulnerabilities.
- Browser checks with Chromium: all eight application routes returned 200 and the expected security header; a complete quiz submitted correct answers and saved 100 quiz XP; Quick Click saved five unique hits as 25 XP; the shared total was 125 and persisted after navigation/reload.
- Study workspace: notes persisted after reload and a text download was initiated with the expected filename.
- Resetting guest game progress left workspace notes intact.
- Denied-browser-storage fallback displayed the session-only message.
- Mobile homepage at 390px: no horizontal overflow. Desktop and mobile screenshots were inspected.
- No browser runtime errors were observed during those checks.

These checks do not validate third-party accounts, competitive anti-cheat, server rewards, real AI, storage OAuth, payment handling, or a public production deployment; those are not implemented in this branch. Simultaneous guest writes from multiple tabs are best-effort browser storage, not a transactional wallet.
