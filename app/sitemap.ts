import type { MetadataRoute } from "next";

const siteUrl = "https://www.voiceofjesusministry.net";

const pages = [
  "/",
  "/resources",
  "/about",
  "/team",
  "/prayer",
  "/blog",
  "/gallery",
  "/missions/2026",
  "/bible-study",
  "/bible-study/responsibility",
  "/comics",
  "/comics/faith-compassion-love",
  "/comics/responsibility-faithfulness-in-action",
  "/bible-study/galatians-1-2",
  "/bible-study/galatians-3",
  "/bible-study/peters-failure-and-restoration",
  "/bible-study/strength-for-the-weary",
  "/bible-study/the-heart-of-biblical-justice-and-mercy",
  "/bible-study/seven-stars",
  "/arcade",
  "/arcade/bible-quiz",
  "/tools",
  "/donate",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({
    url: new URL(path, siteUrl).toString(),
  }));
}
