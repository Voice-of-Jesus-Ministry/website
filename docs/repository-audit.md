# Voice of Jesus Ministry repository audit

Reviewed the Next.js site, arcade entry points, deployment configuration, and Sheets export on main at `aa063827e8a2d6e1a0794ff5e90da042ae6edb52`.

| Finding | Evidence and treatment |
| --- | --- |
| Credential in public source | GitHub code search found a private-key marker in `backend/service_account.json`. The current tree removes that file and the tracked local `.env`. The export workflow provisions the credential from a repository secret. If the key is genuine, revoke or rotate it and update integrations that used it. Older commits can retain both files. |
| Matrix blocked at startup | The published HTML used an incomplete Firebase Auth configuration and offered no route into the campaign after authentication. The restored entry opens the seven-chapter game directly using existing scripts and artwork. The Nexus Matrix URL redirects to the same game. |
| Arcade page metadata | The App Router page used `next/head` and a named page export. It now exports App Router metadata and a default page. |
| Sheets exporter cannot parse | Unresolved merge conflict delimiters broke Python syntax. The script now parses. The manual workflow still needs a Firestore log file and authorized access to the target spreadsheet for an end-to-end export. |
| Firebase fallback configuration | `firebase.json` contained literal escaped newlines outside JSON strings. The file is now valid JSON. Its configuration expects an `out` directory. The current Next.js production target uses Vercel, and a Firebase fallback build remains unverified. |
| Older commit history | The hosting stabilization merge repeats several CI commit subjects. Squash the current arcade and cleanup changes into one commit. A coordinated rewrite of published history would change commit IDs and require collaborator resynchronization. |

Game verification covers invalid swaps, intersecting matches, cascades, playable board refreshes, and all seven Matrix chapter mechanics. The existing Bible Quiz and Quick Click retain their shared browser progress. Star Match records points for the current round.
