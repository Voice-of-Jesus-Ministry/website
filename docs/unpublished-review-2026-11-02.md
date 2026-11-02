# Unpublished changes reviewed — November 2, 2026

## Released in this update
- Galatians 1–2 study from the supplied draft, Scripture link, reflection questions and prayer; listed on the Bible Study page.
- Vercel page-view analytics for ministry, profile and housing, with query strings/fragments removed and privacy notices updated. Included Hobby plan; no custom events or upgrade.

## Held for integration
- Ministry `app/nexus-os`, `components/games`, `lib/games/matrix-of-conscience`, and root `arcade`: competing campaign implementations. Keep the published `/matrix/index.html` campaign canonical until these are consolidated and tested.
- High severity: `lib/games/matrix-of-conscience/BibleQuizOverlay.tsx` increments the index after the final correct answer, then accesses `currentQ.text` after `currentQ` becomes undefined. That unpublished campaign can crash when all answers are correct. Do not publish it as-is.
- Ministry gallery references the locally deleted `public/IMG_20241115_190011777 1.jpg`; that release would have a broken photo. Placeholder image descriptions also need meaningful alternatives.
- Ministry local replacement `public/logo.png` is a textless emblem, but navigation already uses the published textless `favicon.png`. Keep the replacement and duplicate root `logo.png` local pending deliberate asset consolidation.
- Personal root `index.html` and root `arcade` are outside Next.js public/app routing, so they do not replace the production profile. The standalone HTML also loads unpinned external CDN scripts. Integrate deliberately rather than changing the deployment root.
- Housing `TACTICAL_POWERUPS` and `TACTICAL_QUESTIONS` exports are not imported anywhere. The proposed powers and questions are currently inactive. CSS additions and replacement logo remain local; no unrelated game or asset changes are included.
- Personal PDF dependencies were installed during document-tool exploration; they do not implement a functioning PDF/signing app. No Drive/Gmail permissions or document uploads were enabled.
- Generated AGENTS files, screenshots, scoring-agent folders, LMS scripts, and personal certificate images remain outside this release.

Firebase sign-in, moderated uploads, and the personal document tool still require implementation/configuration; analytics does not activate them.
