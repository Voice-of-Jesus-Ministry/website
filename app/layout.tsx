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
  icons: { icon: "/favicon.svg", apple: "/icon.svg" },
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
              <Link className="brand" href="/">
                <img src="/icon.svg" width="42" height="42" alt="" />
                <span>
                  VOICE OF JESUS<small>Hear His voice. Follow His Word.</small>
                </span>
              </Link>
              <nav aria-label="Main navigation">
                <Link href="/bible-study">Bible Study</Link>
                <Link href="/arcade">Play & learn</Link>
                <Link href="/tools">Workspace</Link>
                <a href="https://voiceofjesusnet.blogspot.com/">Blog</a>
              </nav>
              <Link href="/account" className="guest-badge">
                Guest · this device
              </Link>
            </div>
          </header>
          <main id="main">{children}</main>
          <footer className="site-footer">
            <span>Voice of Jesus Ministry</span>
            <div>
              <Link href="/privacy">Privacy</Link>
              <a href="https://github.com/Voice-of-Jesus-Ministry/website">
                Source & credits
              </a>
              <a href="https://youtube.com/@voiceofjesusnetwork">YouTube ↗</a>
            </div>
          </footer>
        </ProgressProvider>
      </body>
    </html>
  );
}
