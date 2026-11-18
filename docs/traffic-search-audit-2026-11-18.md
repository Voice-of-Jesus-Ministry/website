# Traffic and search visibility audit — 18 November 2026

Website: https://www.voiceofjesusministry.net
Repository: Voice-of-Jesus-Ministry/website
Deployment: Vercel team amazinggrace, project website

## Confirmed facts

- The production Vercel project was connected to this repository, and its most recent deployment was reported READY at the time of the audit. This is **not** independent proof of public URL availability.
- Vercel verified both voiceofjesusministry.net and www.voiceofjesusministry.net. The apex domain is configured to 308 redirect to www, making www the intended canonical host.
- Before this change, the current Next.js app branch had no app/sitemap.ts, app/robots.ts, public/sitemap.xml or public/robots.txt.
- Before this change, the Bible Study directory linked to four studies; an existing Seven Stars lesson was not represented in the directory, and Galatians 1–2 had no linked chapter 3 continuation.
- The homepage linked to Bible studies, but primarily featured the Peter study. The external Blogger site contains additional ministry writing.
- The website already installs Vercel Web Analytics through components/SiteAnalytics.tsx.
- The available browser analytics tab belongs to amazinggracehl.org, not the ministry domain, so these figures must not be used to measure ministry traffic.

## What remains unverified

- The size, start date, and cause of the claimed traffic decline.
- Whether the domain responds with 200 to anonymous visitors from different networks.
- Whether Google Search Console has indexed the site; a public search with no results does not prove lack of indexing.
- Whether the missing sitemap directly contributed to declining visits; Google can discover pages through links without a sitemap.
- Whether Cloudflare is counting bots, blocked requests, or visits differently from Vercel Web Analytics.

## Changes implemented in this branch

1. Added a generated robots.txt and sitemap.xml with the canonical www host.
2. Added canonical metadata for homepage, study directory, new Galatians 3 article, and teaching hub.
3. Published an in-depth Galatians 3 Bible study with an outline, reading plan, discussion questions, and prayer.
4. Surfaced both chapters of the Galatians series in the main study directory, homepage, and teaching hub.
5. Linked the previously unlisted Seven Stars lesson from the directory.

## Verification checklist after production deployment

1. Request https://www.voiceofjesusministry.net/ and /bible-study/galatians-3 from a signed-out browser. Confirm real content and HTTP 200.
2. Verify https://www.voiceofjesusministry.net/robots.txt includes the sitemap and https://www.voiceofjesusministry.net/sitemap.xml is valid XML with 200 responses.
3. Confirm https://voiceofjesusministry.net/ redirects once to the www hostname with an HTTP permanent redirect.
4. Use the URL Inspection tool in Google Search Console for the homepage, Bible Study directory, and Galatians 3 page. Record canonical chosen, index status and last crawl.
5. Submit the canonical /sitemap.xml in Google Search Console and review the Page indexing report.
6. Compare the ministry's Cloudflare **Web Analytics** or Vercel Web Analytics pageviews and visits for Nov 4–10 versus Nov 11–17, and repeat for the same days of the week on a rolling basis.
7. Segment by source/referrer, landing page, device, country, and any bot filters. Do not confuse Cloudflare request counts with human visits.
8. Check origin response codes, Security Events, and deployment logs for sudden increases in 4xx, 5xx, challenges, or downtime.
9. Track Google Search Console organic clicks, impressions, and indexed page count weekly, alongside repeat study visits.
10. Verify that the home page, directory, and blog links lead to the actual live study and that the study appears in the XML sitemap.

## Interpretation

A traffic decline can arise from broken DNS or deployment, blocked requests, reduced search visibility, loss of referring links, bot-traffic changes, or changes in audience demand. The repository fixes improve discovery and depth of content, but the true cause requires comparable historical analytics and Search Console data.

Use the Search Console indexing and sitemap guidance at:
https://support.google.com/webmasters/answer/7440203
https://support.google.com/webmasters/answer/7451001
