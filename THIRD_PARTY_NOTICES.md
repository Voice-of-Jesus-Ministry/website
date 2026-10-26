# AmazingGrace migration

Source: https://github.com/NicholaiMadias/AmazingGrace

Audited revision: `c39e707f940225b1b76c555741abee217326a3c7`.

AmazingGrace contains a GNU General Public License version 3 license. Its license is preserved in `LICENSE`. Application source in this migration is distributed under GPL-3.0. Ministry branding, logos, and separately authored ministry content retain their existing ownership; this notice does not grant trademark rights or relicense those assets.

| Destination | Source | Treatment |
| --- | --- | --- |
| `lib/games/quick-click.ts` | `src/arcade/quick-click/gameLogic.ts` | Preserved helper functions with provenance header |
| `lib/games/questions.ts` | `src/modules/bible-study/questions.json`, `arcade/bible-study/index.html` | Selected and adapted question data; references retained; feedback paraphrased |
| `components/QuickClick.tsx` | Quick Click concept | New React interface; no Firebase leaderboard or anonymous auth copied |
| `components/BibleQuiz.tsx` | Bible Study Quiz concept | New React interface; no browser-controlled credit wallet copied |

The source repository remains intact. Housing photos, ministry video files, API wrappers, demo administrator accounts, vault scripts, and generated caches are not part of this migration.
