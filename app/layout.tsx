import { SiteAnalytics } from "../components/SiteAnalytics";
import type { Metadata } from "next";
import "./globals.css";

import Link from "next/link";
import { ProgressProvider } from "../components/ProgressProvider";

export const metadata: Metadata = {
  title: "Voice of Jesus Ministry",
  description:
    "Join Voice of Jesus Ministry for weekly Bible studies, biblical teaching, prayer, discipleship, and Christian resources.",
  keywords: [
    "Voice of Jesus Ministry",
    "Bible Study",
    "Christian Ministry",
    "Prayer",
    "Discipleship",
  ],
  icons: { icon: "/favicon.png", apple: "/icon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ProgressProvider>
          <header className="site-header">
            <div className="header-inner">
              <Link className="brand" href="/" aria-label="Voice of Jesus Ministry home">
                <img src="/favicon.png" width="72" height="72" alt="" />
                <span>
                  Voice of Jesus Ministry
                  <small>Hear His voice. Follow His Word.</small>
                </span>
              </Link>
              <nav aria-label="Main navigation">
                <Link href="/team"><span className="nav-wide">Our Team</span><span className="nav-short">Team</span></Link>
                <Link href="/bible-study"><span className="nav-wide">Bible Study</span><span className="nav-short">Study</span></Link>
                <Link href="/arcade">Arcade</Link>
                <Link href="/blog">Blog</Link>
              </nav>
              <Link href="/account" className="guest-badge">
                Progress
              </Link>
            </div>
          </header>
          <main id="main">{children}</main>
          <footer className="site-footer">
            <span>Voice of Jesus Ministry</span>
            <div>
              <Link href="/about">About</Link>
              <Link href="/prayer/god-is-my-refuge">Prayer</Link>
              <Link href="/donate">Support</Link>
              <Link href="/privacy">Privacy</Link>
              <a href="https://github.com/Voice-of-Jesus-Ministry/website">
                Source & credits
              </a>
              <a href="https://youtube.com/@voiceofjesusnetwork">YouTube ↗</a>
            </div>
          </footer>
        </ProgressProvider>
        <SiteAnalytics />
      </body>
    </html>
  );
}
