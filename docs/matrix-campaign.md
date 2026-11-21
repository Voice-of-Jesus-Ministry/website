# Ministry Matrix campaign

Repository: Voice-of-Jesus-Ministry/website
URL: https://voiceofjesusministry.net/arcade/matrix-of-conscience

One seven-chapter campaign adapts the supplied `Matrix of Conscience_ Multiverse Arcade.html` mechanics and `matrix-lore-expanded.html` chapter sequence/art. The ministry edition uses concise fictional story summaries and Scripture connections. It does not treat the original lore as biblical teaching.

Every completed chapter leads to three Bible questions with references and answer explanations. A correct answer awards 25 local quiz points once per question. Between missions, points buy only upgrades applicable to the upcoming game type: guidance for puzzles/reflection, shields for combat/maze, energy for defense, and damage for defense/flight. Upgrades survive retries and expire when the mission completes. Checkpoints and quiz answers persist in this browser. These client-side points never grant authentication or upload privileges.

Original placeholder cloud writes, AI tools, simulated PowerShell execution, and public-media unlock claims are excluded. Actual shared uploads need authenticated, server-verified permissions and moderation.

### Match-3 scoring and safety

Chapter 2 awards **10 base points for each cleared symbol**. The first match has no
cascade bonus; the second cascade adds 10 per symbol, the third adds 20,
and subsequent cascades add up to 30 per symbol. The mission score accumulates
the awards from successful swaps. The board starts with no pre-made matches and
a possible move; invalid swaps cannot score. A 30-stage safety cap refreshes
a pathological refill so unresolved matches cannot be scored again.
The game now shows the last-swap base/bonus breakdown and an optional scoring
guide. This information is part of the campaign, not Microsoft or Clerk auth.

Use `node --test tests/matrix.test.ts` to check seeded gameplay, scoring, and
constant-RNG refill protection. `npm run check` also verifies the site.

Verification: campaign/quiz/store invariants plus playable simulations of defense, matching, connection, maze, shooter, and guardian; browser defense completion, quiz rewards, purchase and next-level hint flow. A complete manual browser playthrough of all seven chapters remains a separate check.

Firebase project created for the ministry: `voice-of-jesus-ministry` (Spark plan). The existing `amazing-grace-hl` production project was not modified. Firebase registration and app integration are in progress; this release remains local guest play.
